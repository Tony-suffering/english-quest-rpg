'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import VoiceRecorder from '@/components/VoiceRecorder';
import { getSettings } from '@/lib/settings';
import {
    getAudioCtx, playLevelSound, playSpinTick, playReelStop, playReachAlert,
    playSpinStart, playGachaSound, playFeverEntrySound, playFeverExitSound,
    startFeverBGM, stopFeverBGM, playCardRankSound, playRankUpSound, playFeverChainHit,
    playImpactHit, playKakuhenEntry, playGpCoin, playStreakBreak,
} from '@/lib/training-sounds';
import PuzzleBoard, { type GridMilestoneData } from '@/components/english/PuzzleBoard';
import ReviewSlotPanel from '@/components/english/ReviewSlotPanel';
import { TOEIC_30DAY } from '@/data/izakaya-toeic/toeic-30day-content';
import './training-animations.css';

// 公開RPG: localhost:3004 or toniolab.com。DBなし、TOEIC 30日コンテンツで動く
const IS_PUBLIC = typeof window !== 'undefined' && (window.location.port === '3004' || window.location.hostname.includes('toniolab'));

interface VoiceRecording {
    id: number;
    phrase_id: string;
    url: string;
    created_at: string;
}

declare global {
    interface Window {
        YG?: {
            Widget: new (id: string, options: {
                width: number;
                components: number;
                events: {
                    onFetchDone?: (event: { totalResult: number }) => void;
                    onVideoChange?: (event: any) => void;
                    onCaptionChange?: (event: { caption: string }) => void;
                };
            }) => {
                fetch: (phrase: string, lang: string) => void;
            };
        };
    }
}

interface Phrase {
    id: string;
    english: string;
    japanese: string;
    category: string;
    date: string;
}

interface PhraseLink {
    phrase_id: string;
    text: string;
    created_at: string;
}

type BaseMastery = 0 | 1 | 2 | 3 | 6;
type ChakraLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// 7 Evolution Stages — mid-tone gradients, display Lv.1-7
// EGG(0) = untouched, no XP. 1 phrase EGG→MASTER = 100 XP total.
// XP per step: 0, 5, 10, 15, 20, 20, 30 = 100
const CHAKRA_CONFIG: Record<ChakraLevel, { name: string; ja: string; label: string; lv: number; color: string; bg: string; border: string; gradFrom: string; gradTo: string }> = {
    0: { name: 'EGG', ja: 'タマゴ', label: 'Lv.1 タマゴ', lv: 0, color: '#B91C1C', bg: '#FEF2F2', border: '#F87171', gradFrom: '#F87171', gradTo: '#FECACA' },
    1: { name: 'HATCH', ja: '孵化', label: 'Lv.2 孵化', lv: 5, color: '#C2410C', bg: '#FFF7ED', border: '#FB923C', gradFrom: '#FB923C', gradTo: '#FED7AA' },
    2: { name: 'ROOKIE', ja: 'ルーキー', label: 'Lv.3 ルーキー', lv: 10, color: '#A16207', bg: '#FEFCE8', border: '#FACC15', gradFrom: '#FACC15', gradTo: '#FEF08A' },
    3: { name: 'FIGHTER', ja: 'ファイター', label: 'Lv.4 ファイター', lv: 15, color: '#166534', bg: '#F0FDF4', border: '#4ADE80', gradFrom: '#4ADE80', gradTo: '#BBF7D0' },
    4: { name: 'CHAMPION', ja: 'チャンピオン', label: 'Lv.5 チャンピオン', lv: 20, color: '#1E40AF', bg: '#EFF6FF', border: '#60A5FA', gradFrom: '#60A5FA', gradTo: '#BFDBFE' },
    5: { name: 'ELITE', ja: 'エリート', label: 'Lv.6 エリート', lv: 20, color: '#3730A3', bg: '#EEF2FF', border: '#818CF8', gradFrom: '#818CF8', gradTo: '#C7D2FE' },
    6: { name: 'MASTER', ja: 'マスター', label: 'Lv.7 マスター', lv: 30, color: '#6B21A8', bg: '#FAF5FF', border: '#A855F7', gradFrom: '#A855F7', gradTo: '#DDD6FE' },
};

function getChakraLevel(baseMastery: number, hasRecording: boolean, hasLink: boolean): ChakraLevel {
    if (baseMastery === 6) return 6;  // CROWN (DB stored)
    if (baseMastery >= 3 && hasRecording && hasLink) return 5;  // VISION
    if (baseMastery >= 3 && hasRecording) return 4;  // VOICE
    return Math.min(baseMastery, 3) as ChakraLevel;
}

function getChakraInfo(baseMastery: number, hasRecording: boolean, hasLink: boolean) {
    const level = getChakraLevel(baseMastery, hasRecording, hasLink);
    return { ...CHAKRA_CONFIG[level], level };
}

// Card Rank system — gacha GP accumulate per phrase, visual rank upgrades
type CardRank = 'NORMAL' | 'BRONZE' | 'SILVER' | 'GOLD' | 'HOLOGRAPHIC' | 'LEGENDARY';
const CARD_RANKS: { rank: CardRank; threshold: number; borderColor: string; glow: string; label: string }[] = [
    { rank: 'LEGENDARY', threshold: 250, borderColor: '#D4AF37', glow: '0 0 30px #D4AF3780, 0 0 60px #D4AF3740', label: '伝説' },
    { rank: 'HOLOGRAPHIC', threshold: 100, borderColor: '#A855F7', glow: '0 0 25px #A855F760, 0 0 45px #A855F730', label: '虹' },
    { rank: 'GOLD', threshold: 50, borderColor: '#F6C85F', glow: '0 0 16px #F6C85F50', label: '金' },
    { rank: 'SILVER', threshold: 20, borderColor: '#94A3B8', glow: '0 0 10px #94A3B840', label: '銀' },
    { rank: 'BRONZE', threshold: 5, borderColor: '#CD7F32', glow: '0 0 4px rgba(205,127,50,0.2)', label: '銅' },
    { rank: 'NORMAL', threshold: 0, borderColor: 'transparent', glow: 'none', label: '' },
];

function getCardRank(points: number): typeof CARD_RANKS[0] {
    for (const r of CARD_RANKS) {
        if (points >= r.threshold) return r;
    }
    return CARD_RANKS[CARD_RANKS.length - 1];
}

// Pokemon TCG-style card frame system — shared by review cards, calendar cards, card-preview
function getCardFrame(rank: CardRank): { border: string; borderImage?: string; backgroundColor: string; background?: string } {
    switch (rank) {
        case 'NORMAL': return {
            border: '8px solid #E7E5E4',
            backgroundColor: '#FAFAF9',
        };
        case 'BRONZE': return {
            border: '8px solid transparent',
            borderImage: 'linear-gradient(135deg, #CD7F32 0%, #E8B87A 30%, #CD7F32 60%, #A0622E 100%) 1',
            backgroundColor: '#FFFBF5',
        };
        case 'SILVER': return {
            border: '8px solid transparent',
            borderImage: 'linear-gradient(135deg, #e2e8f0 0%, #ffffff 40%, #cbd5e1 60%, #94a3b8 100%) 1',
            backgroundColor: '#F8FAFB',
        };
        case 'GOLD': return {
            border: '8px solid transparent',
            borderImage: 'linear-gradient(135deg, #D4AF37 0%, #FFF2A8 25%, #F6C85F 50%, #D4AF37 75%, #B8941E 100%) 1',
            background: 'linear-gradient(180deg, #FFFEF5 0%, #FFFBEB 100%)',
            backgroundColor: '#FFFEF5',
        };
        case 'HOLOGRAPHIC': return {
            border: '8px solid transparent',
            borderImage: 'linear-gradient(135deg, #E879F9 0%, #A855F7 25%, #6366F1 50%, #3B82F6 75%, #06B6D4 100%) 1',
            background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #E0E7FF 100%)',
            backgroundColor: '#FAF5FF',
        };
        case 'LEGENDARY': return {
            border: '8px solid transparent',
            borderImage: 'linear-gradient(135deg, #18181B 0%, #A855F7 40%, #D4AF37 60%, #18181B 100%) 1',
            background: 'linear-gradient(135deg, #1C1917 0%, #2D2438 50%, #1c1813 100%)',
            backgroundColor: '#1C1917',
        };
    }
}

function getCardShadow(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)';
        case 'BRONZE': return '0 6px 16px rgba(205,127,50,0.15), 0 2px 6px rgba(205,127,50,0.1)';
        case 'SILVER': return '0 6px 20px rgba(148,163,184,0.25), 0 2px 8px rgba(148,163,184,0.15), inset 0 0 10px rgba(255,255,255,0.8)';
        case 'GOLD': return '0 8px 24px rgba(212,175,55,0.35), 0 4px 12px rgba(246,200,95,0.25), inset 0 0 15px rgba(255,242,168,0.5)';
        case 'HOLOGRAPHIC': return '0 8px 30px rgba(168,85,247,0.3), 0 4px 16px rgba(99,102,241,0.25), inset 0 0 20px rgba(232,121,249,0.3)';
        case 'LEGENDARY': return '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4), 0 0 30px rgba(168,85,247,0.3), inset 0 0 30px rgba(0,0,0,0.6)';
    }
}

function getCardWindowBg(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return '#F5F5F4';
        case 'BRONZE': return 'linear-gradient(180deg, #FDF8F0, #FAF0E4)';
        case 'SILVER': return 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)';
        case 'GOLD': return 'radial-gradient(ellipse at top, #FFFBEB, #FFF3CC 100%)';
        case 'HOLOGRAPHIC': return 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,232,255,0.8)), repeating-linear-gradient(45deg, rgba(232,121,249,0.05) 0px, rgba(168,85,247,0.05) 10px, transparent 10px, transparent 20px)';
        case 'LEGENDARY': return 'radial-gradient(circle at center, #2D2438 0%, #181A1B 100%)';
    }
}

// Frame accent color for separators, name bar bg, etc.
function getFrameAccent(rank: CardRank): string {
    switch (rank) {
        case 'NORMAL': return '#E7E5E4';
        case 'BRONZE': return '#CD7F32';
        case 'SILVER': return '#94A3B8';
        case 'GOLD': return '#D4AF37';
        case 'HOLOGRAPHIC': return '#A855F7';
        case 'LEGENDARY': return '#D4AF37';
    }
}

// Sound functions extracted to @/lib/training-sounds
// Gacha tier config
const GACHA_TIER_CONFIG: Record<string, {
    color: string; particles: number; duration: number;
    fontSize: number; mobileFontSize: number;
}> = {
    MISS: { color: '#78716C', particles: 0, duration: 1500, fontSize: 28, mobileFontSize: 22 },
    BONUS: { color: '#D4AF37', particles: 8, duration: 2200, fontSize: 48, mobileFontSize: 36 },
    GREAT: { color: '#F59E0B', particles: 16, duration: 3200, fontSize: 64, mobileFontSize: 48 },
    SUPER: { color: '#EF4444', particles: 24, duration: 4200, fontSize: 80, mobileFontSize: 56 },
    MEGA: { color: '#8B5CF6', particles: 40, duration: 6000, fontSize: 100, mobileFontSize: 68 },
    LEGENDARY: { color: '#D4AF37', particles: 60, duration: 8500, fontSize: 130, mobileFontSize: 84 },
    MYTHIC: { color: '#EC4899', particles: 80, duration: 10000, fontSize: 140, mobileFontSize: 90 },
    SHINY: { color: '#06B6D4', particles: 120, duration: 13000, fontSize: 150, mobileFontSize: 96 },
    PHANTOM: { color: '#FFFFFF', particles: 150, duration: 15000, fontSize: 160, mobileFontSize: 100 },
};

// 3-Reel Slot Machine symbols
type SlotSymbolId = 'seven-gold' | 'seven-red' | 'bar' | 'bell' | 'grape' | 'cherry' | 'blank' | 'god' | 'rainbow' | 'ghost';
const SLOT_SYMBOLS: { id: SlotSymbolId; label: string; color: string; glow: string; scale: number; stroke?: string; ultra?: boolean }[] = [
    { id: 'seven-gold', label: '7', color: '#D4AF37', glow: '#D4AF3790', scale: 1.3, stroke: '#8B6914' },
    { id: 'seven-red', label: '7', color: '#DC2626', glow: '#DC262690', scale: 1.3, stroke: '#991B1B' },
    { id: 'bar', label: 'BAR', color: '#1C1917', glow: '#78716C60', scale: 0.55, stroke: '#44403C' },
    { id: 'bell', label: '鈴', color: '#D97706', glow: '#D9770660', scale: 0.75, stroke: '#92400E' },
    { id: 'grape', label: '星', color: '#7C3AED', glow: '#7C3AED60', scale: 0.75, stroke: '#5B21B6' },
    { id: 'cherry', label: '桜', color: '#E11D48', glow: '#E11D4860', scale: 0.75, stroke: '#9F1239' },
    { id: 'blank', label: '×', color: '#A8A29E', glow: 'transparent', scale: 0.8 },
    // Ultra-rare only — never in normal spin pool
    { id: 'god', label: '神', color: '#EC4899', glow: '#EC489990', scale: 0.85, stroke: '#BE185D', ultra: true },
    { id: 'rainbow', label: '虹', color: '#06B6D4', glow: '#06B6D490', scale: 0.85, stroke: '#0E7490', ultra: true },
    { id: 'ghost', label: '幻', color: '#E2E8F0', glow: '#FFFFFF90', scale: 0.85, stroke: '#94A3B8', ultra: true },
];
const SLOT_SYMBOL_MAP = Object.fromEntries(SLOT_SYMBOLS.map(s => [s.id, s])) as Record<SlotSymbolId, typeof SLOT_SYMBOLS[0]>;

// Spinnable pool (no blanks or ultra-rares during spin)
const SPIN_POOL: SlotSymbolId[] = SLOT_SYMBOLS.filter(s => s.id !== 'blank' && !s.ultra).map(s => s.id);

// Map backend tier -> which 3 symbols to show on the payline
const TIER_TO_COMBO: Record<string, SlotSymbolId[]> = {
    PHANTOM:   ['ghost', 'ghost', 'ghost'],       // 幻幻幻 — white flickering
    SHINY:     ['rainbow', 'rainbow', 'rainbow'],  // 虹虹虹 — prismatic
    MYTHIC:    ['god', 'god', 'god'],              // 神神神 — pink flash
    LEGENDARY: ['seven-gold', 'seven-gold', 'seven-gold'],
    MEGA:      ['seven-red', 'seven-red', 'seven-red'],
    SUPER:     ['bar', 'bar', 'bar'],
    GREAT:     ['bell', 'bell', 'bell'],
    BONUS:     ['grape', 'grape', 'grape'],
    MISS:      ['cherry', 'bar', 'blank'],
};

// Generate a random non-matching combo for MISS (no ultra-rares)
function generateMissCombo(): [SlotSymbolId, SlotSymbolId, SlotSymbolId] {
    const pool: SlotSymbolId[] = ['seven-red', 'bar', 'bell', 'grape', 'cherry', 'blank'];
    let a: SlotSymbolId, b: SlotSymbolId, c: SlotSymbolId;
    do {
        a = pool[Math.floor(Math.random() * pool.length)];
        b = pool[Math.floor(Math.random() * pool.length)];
        c = pool[Math.floor(Math.random() * pool.length)];
    } while (a === b && b === c);
    return [a, b, c];
}

// Pick a random symbol different from the given one (for above/below filler)
function randomOtherSymbol(exclude: SlotSymbolId): SlotSymbolId {
    const candidates = SLOT_SYMBOLS.filter(s => s.id !== exclude && s.id !== 'blank' && !s.ultra);
    return candidates[Math.floor(Math.random() * candidates.length)].id;
}

// Tier name mapping: internal English key → display Japanese
const TIER_JA: Record<string, string> = {
    BONUS: '光', GREAT: '輝', SUPER: '煌', MEGA: '極', LEGENDARY: '伝説',
    MYTHIC: '神話', SHINY: '色違い', PHANTOM: '幻', MISS: '凡',
};

// 連荘 Chain system types and config (outside component to avoid bundler issues)
type ChainMode = 'normal' | 'kakuhen' | 'gekiatsu' | 'god';

function getChainMode(count: number): ChainMode {
    if (count >= 10) return 'god';
    if (count >= 5) return 'gekiatsu';
    if (count >= 3) return 'kakuhen';
    return 'normal';
}

function getChainTier(count: number): 0 | 1 | 2 | 3 {
    if (count >= 10) return 3;
    if (count >= 5) return 2;
    if (count >= 3) return 1;
    return 0;
}

const CHAIN_MODE_CONFIG: Record<ChainMode, { label: string; labelJa: string; color: string; gradient: string; spMultiplier: string }> = {
    normal: { label: 'NORMAL', labelJa: '通常', color: '#78716C', gradient: 'linear-gradient(135deg, #78716C, #A8A29E)', spMultiplier: 'x1' },
    kakuhen: { label: 'KAKUHEN', labelJa: '確変', color: '#D4AF37', gradient: 'linear-gradient(135deg, #D4AF37, #F59E0B)', spMultiplier: 'x1.5' },
    gekiatsu: { label: 'GEKIATSU', labelJa: '激熱', color: '#DC2626', gradient: 'linear-gradient(135deg, #DC2626, #F97316)', spMultiplier: 'x2' },
    god: { label: 'GOD MODE', labelJa: '神', color: '#7C3AED', gradient: 'linear-gradient(135deg, #7C3AED, #EC4899, #D4AF37)', spMultiplier: 'x3' },
};

// Puzzle background image (beautiful landscape for motivation)
const PUZZLE_IMAGE = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop';

// Fisher-Yates shuffle — pure, returns new array
function fisherYates<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Player Level System — floor(13 * Lv^2.3)
function xpForLevel(lv: number): number {
    if (lv <= 1) return 0;
    return Math.floor(13 * Math.pow(lv, 2.3));
}

function levelFromXP(totalXP: number): number {
    let lv = 1;
    while (xpForLevel(lv + 1) <= totalXP) lv++;
    return Math.min(lv, 100);
}

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

// Element colors imported from shared constants
import { ELEMENT_CATEGORY_COLORS, randomElement, calcBstTotal, getBstTier } from '@/data/english/elements';
import { ElementBadge } from '@/components/english/ElementIcon';
import { getFlavorText } from '@/data/english/flavor-text';
const CATEGORY_COLORS = ELEMENT_CATEGORY_COLORS;

// ── Mini Runner: Mario-style XP-driven side-scroll ──
// Milestones as ratios of the user's daily goal (default 1310 XP)
// Ratios derived from original power curve: floor(4*(lv-1)^1.8) at key levels
const DEFAULT_GOAL_XP = 1310;
const MILESTONE_RATIOS = [
    { ratio: 4 / 1310, title: '起動', color: '#78716C' },
    { ratio: 28 / 1310, title: '準備OK', color: '#2563EB' },
    { ratio: 72 / 1310, title: 'エンジン全開', color: '#16A34A' },
    { ratio: 167 / 1310, title: 'ゾーン', color: '#CA8A04' },
    { ratio: 351 / 1310, title: '無双', color: '#EA580C' },
    { ratio: 588 / 1310, title: '覚醒', color: '#DC2626' },
    { ratio: 873 / 1310, title: '鬼神', color: '#7C3AED' },
    { ratio: 1, title: '本日の神', color: '#D4AF37' },
];
function getRunnerMilestones(goalXP: number) {
    return MILESTONE_RATIOS.map(m => ({
        xp: Math.round(m.ratio * goalXP),
        title: m.title,
        color: m.color,
    }));
}

// Gacha-style random reaction: visual animation decoupled from XP amount
// Normal 55% | Rare 25% | Super 12% | Epic 6% | Legend 2%
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

function getTrainingV6Sky(ratio: number, isGod: boolean) {
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// UPPER SCREEN EFFECT (pachinko-style always-on)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function UpperScreenEffect({ effect, slotState }: {
    effect: { type: 'triple' | 'reach' | 'miss' | 'pair' | 'idle'; symbol?: string; key: number };
    slotState?: string;
}) {
    const [visible, setVisible] = useState(false);
    const [phase, setPhase] = useState<'flash' | 'text' | 'fade'>('flash');
    const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        if (effect.type === 'idle') return;
        timerRef.current.forEach(t => clearTimeout(t));
        timerRef.current = [];
        setVisible(true);
        setPhase('flash');
        timerRef.current.push(setTimeout(() => setPhase('text'), 200));
        const dur = effect.type === 'triple' ? 2500 : effect.type === 'reach' ? 1800 : 1000;
        timerRef.current.push(setTimeout(() => setPhase('fade'), dur - 300));
        timerRef.current.push(setTimeout(() => setVisible(false), dur));
        return () => { timerRef.current.forEach(t => clearTimeout(t)); };
    }, [effect.key, effect.type]);

    const isRush = slotState === 'RUSH' || slotState === 'SPECIAL' || slotState === 'FEVER';
    const isFever = slotState === 'FEVER';
    const isSpecial = slotState === 'SPECIAL';

    // GARO makai BURST color palette
    const rushColor = isFever ? '#D4AF37' : isSpecial ? '#A855F7' : '#EF4444';
    const rushColor2 = isFever ? '#FFF2A8' : isSpecial ? '#C084FC' : '#FCA5A5';
    const rushColor3 = isFever ? '#92400E' : isSpecial ? '#7C3AED' : '#B91C1C';

    // =======================================================================
    // NORMAL MODE — Makai idle: smoldering embers, pulsing glow, sweeps
    // Not subtle. Not empty. The screen breathes with dark energy.
    // =======================================================================
    const normalAmbient = !isRush && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Base atmosphere — dark gradient overlay */}
            <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.06) 0%, rgba(0,0,0,0.04) 60%, transparent 100%)',
                animation: 'upper-glow-pulse 3s ease-in-out infinite',
            }} />

            {/* Ember field — 18 particles, varying size/speed/color */}
            {Array.from({ length: 18 }).map((_, i) => {
                const hue = 15 + (i * 9) % 35;
                const size = 1.5 + (i % 4) * 0.8;
                return (
                    <div key={`e${i}`} style={{
                        position: 'absolute',
                        width: `${size}px`, height: `${size}px`,
                        borderRadius: '50%',
                        background: `hsl(${hue}, 85%, ${50 + (i % 3) * 12}%)`,
                        left: `${(i * 5.5) % 100}%`,
                        bottom: '-4px',
                        animation: `upper-ember-drift ${2.5 + (i % 5) * 0.6}s ease-out infinite`,
                        animationDelay: `${i * 0.3}s`,
                        filter: `blur(${size > 2.5 ? 1 : 0.5}px)`,
                    }} />
                );
            })}

            {/* Dual sweeping light bars — crossing */}
            <div style={{
                position: 'absolute', top: 0, left: '-25%',
                width: '20%', height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.07), rgba(239,68,68,0.05), transparent)',
                animation: 'upper-scan-bar 6s linear infinite',
            }} />
            <div style={{
                position: 'absolute', top: 0, right: '-25%',
                width: '15%', height: '100%',
                background: 'linear-gradient(270deg, transparent, rgba(168,85,247,0.04), transparent)',
                animation: 'upper-scan-bar 9s linear infinite reverse',
            }} />

            {/* Bottom fire horizon glow — pulsing */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(to top, rgba(220,38,38,0.06), rgba(212,175,55,0.03), transparent)',
                animation: 'upper-glow-pulse 3s ease-in-out infinite',
            }} />

            {/* Furimono streaks — 3 vertical light lines falling */}
            {[25, 55, 80].map((left, i) => (
                <div key={`fn${i}`} style={{
                    position: 'absolute', left: `${left}%`, top: '-20%',
                    width: '1px', height: '15%',
                    background: `linear-gradient(to bottom, transparent, rgba(212,175,55,${0.1 + i * 0.05}), transparent)`,
                    animation: `upper-furimono ${5 + i * 2}s linear infinite`,
                    animationDelay: `${i * 1.5}s`,
                }} />
            ))}

            {/* Side edge whisper glow */}
            <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px',
                background: 'linear-gradient(to bottom, transparent 20%, rgba(212,175,55,0.12) 50%, transparent 80%)',
                animation: 'upper-glow-pulse 4s ease-in-out infinite',
            }} />
            <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '2px',
                background: 'linear-gradient(to bottom, transparent 20%, rgba(212,175,55,0.12) 50%, transparent 80%)',
                animation: 'upper-glow-pulse 4s ease-in-out infinite',
                animationDelay: '2s',
            }} />
        </div>
    );

    // =======================================================================
    // RUSH MODE — GARO Makai BURST: full power. Dense fire, frame LED,
    // crossing sweeps, furimono rain, pulsing background, everything x5.
    // Reference: e牙狼11 魔戒BURST — purple/gold/red constant energy
    // =======================================================================
    const rushCount = isFever ? 30 : isSpecial ? 24 : 18;

    const rushAmbient = isRush && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {/* Intense background glow — color fills the whole bar */}
            <div style={{
                position: 'absolute', inset: 0,
                background: isFever
                    ? 'radial-gradient(ellipse at 50% 100%, rgba(212,175,55,0.25) 0%, rgba(146,64,14,0.10) 50%, transparent 100%)'
                    : isSpecial
                    ? 'radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.20) 0%, rgba(124,58,237,0.08) 50%, transparent 100%)'
                    : 'radial-gradient(ellipse at 50% 100%, rgba(239,68,68,0.20) 0%, rgba(185,28,28,0.08) 50%, transparent 100%)',
                animation: 'upper-rush-pulse 1.5s ease-in-out infinite',
            }} />

            {/* Dense flame particles — fast, big, colored */}
            {Array.from({ length: rushCount }).map((_, i) => {
                const size = 2 + (i % 4);
                return (
                    <div key={`r${i}`} style={{
                        position: 'absolute',
                        width: `${size}px`, height: `${size}px`,
                        borderRadius: '50%',
                        background: i % 4 === 0 ? rushColor2 : i % 4 === 1 ? rushColor3 : rushColor,
                        left: `${(i * (100 / rushCount))}%`,
                        bottom: '-4px',
                        animation: `upper-ember-drift ${1.0 + (i % 4) * 0.3}s ease-out infinite`,
                        animationDelay: `${i * 0.08}s`,
                        filter: `blur(${size > 4 ? 1.5 : 0.5}px)`,
                    }} />
                );
            })}

            {/* Frame LED glow — ALL 4 edges throb intensely */}
            {/* Left */}
            <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '6px',
                background: `linear-gradient(to bottom, ${rushColor}33 0%, ${rushColor}88 30%, ${rushColor2}AA 50%, ${rushColor}88 70%, ${rushColor}33 100%)`,
                animation: 'upper-rush-pulse 1.2s ease-in-out infinite',
                filter: `blur(2px)`,
            }} />
            {/* Right */}
            <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '6px',
                background: `linear-gradient(to bottom, ${rushColor}33 0%, ${rushColor}88 30%, ${rushColor2}AA 50%, ${rushColor}88 70%, ${rushColor}33 100%)`,
                animation: 'upper-rush-pulse 1.2s ease-in-out infinite',
                animationDelay: '0.6s',
                filter: `blur(2px)`,
            }} />
            {/* Top */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '5px',
                background: `linear-gradient(to right, ${rushColor}33 0%, ${rushColor}88 30%, ${rushColor2}AA 50%, ${rushColor}88 70%, ${rushColor}33 100%)`,
                animation: 'upper-rush-pulse 1.5s ease-in-out infinite',
                animationDelay: '0.3s',
                filter: `blur(2px)`,
            }} />
            {/* Bottom */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '5px',
                background: `linear-gradient(to right, ${rushColor}33 0%, ${rushColor2}88 50%, ${rushColor}33 100%)`,
                animation: 'upper-rush-pulse 1.8s ease-in-out infinite',
                filter: `blur(2px)`,
            }} />

            {/* Crossing light sweeps — two directions */}
            <div style={{
                position: 'absolute', top: 0, left: '-30%',
                width: '25%', height: '100%',
                background: `linear-gradient(90deg, transparent, ${rushColor}22, ${rushColor2}18, transparent)`,
                animation: `upper-scan-bar ${isFever ? 1.5 : 2.5}s linear infinite`,
            }} />
            <div style={{
                position: 'absolute', top: 0, right: '-30%',
                width: '20%', height: '100%',
                background: `linear-gradient(270deg, transparent, ${rushColor3}15, transparent)`,
                animation: `upper-scan-bar ${isFever ? 2 : 3}s linear infinite reverse`,
                animationDelay: '0.5s',
            }} />

            {/* Furimono rain — vertical light streaks from top */}
            {Array.from({ length: isFever ? 8 : isSpecial ? 6 : 4 }).map((_, i) => (
                <div key={`f${i}`} style={{
                    position: 'absolute',
                    left: `${8 + i * (isFever ? 11 : isSpecial ? 15 : 22)}%`,
                    top: '-25%',
                    width: '2px', height: '18%',
                    background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? rushColor : rushColor2}44, transparent)`,
                    animation: `upper-furimono ${1.8 + i * 0.4}s linear infinite`,
                    animationDelay: `${i * 0.5}s`,
                    filter: 'blur(0.5px)',
                }} />
            ))}

            {/* FEVER: extra intense bottom fire glow */}
            {isFever && (
                <>
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                        background: 'linear-gradient(to top, rgba(212,175,55,0.15), rgba(146,64,14,0.06), transparent)',
                        animation: 'upper-rush-pulse 1.2s ease-in-out infinite',
                    }} />
                    {/* Extra gold sparkles in FEVER */}
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={`gs${i}`} style={{
                            position: 'absolute',
                            width: '3px', height: '3px',
                            borderRadius: '50%',
                            background: '#FFF2A8',
                            left: `${15 + i * 14}%`,
                            top: `${20 + (i % 3) * 25}%`,
                            animation: `upper-glow-pulse ${1 + i * 0.3}s ease-in-out infinite`,
                            animationDelay: `${i * 0.2}s`,
                            filter: 'blur(1px)',
                        }} />
                    ))}
                </>
            )}
        </div>
    );

    // Spin result flash configs
    const config = {
        triple: {
            bg: isRush
                ? `radial-gradient(circle, ${rushColor}77 0%, ${rushColor}33 40%, transparent 80%)`
                : 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.10) 50%, transparent 80%)',
            flashBg: isRush ? `${rushColor}99` : 'rgba(255,255,200,0.6)',
            text: effect.symbol === 'GOD' ? 'GOD!!' : effect.symbol === 'RED7' ? 'BIG WIN!' : 'WIN!',
            textColor: isRush ? rushColor : '#D4AF37',
            textShadow: `0 0 25px ${isRush ? rushColor : 'rgba(212,175,55,0.9)'}, 0 0 50px ${isRush ? rushColor + '77' : 'rgba(212,175,55,0.5)'}`,
            fontSize: isRush ? 44 : 34,
        },
        reach: {
            bg: isRush
                ? `radial-gradient(circle, ${rushColor}55 0%, transparent 70%)`
                : 'radial-gradient(circle, rgba(239,68,68,0.25) 0%, transparent 70%)',
            flashBg: isRush ? `${rushColor}66` : 'rgba(255,100,100,0.35)',
            text: 'REACH!',
            textColor: isRush ? rushColor : '#EF4444',
            textShadow: `0 0 18px ${isRush ? rushColor + 'AA' : 'rgba(239,68,68,0.7)'}`,
            fontSize: isRush ? 34 : 26,
        },
        pair: {
            bg: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            flashBg: 'rgba(100,150,255,0.2)',
            text: '', textColor: '#3B82F6', textShadow: 'none', fontSize: 20,
        },
        miss: {
            bg: 'radial-gradient(circle, rgba(120,113,108,0.08) 0%, transparent 60%)',
            flashBg: 'rgba(120,113,108,0.12)',
            text: '', textColor: '#78716C', textShadow: 'none', fontSize: 16,
        },
        idle: { bg: 'transparent', flashBg: 'transparent', text: '', textColor: '#78716C', textShadow: 'none', fontSize: 16 },
    };
    const c = config[effect.type] || config.idle;

    return (
        <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15,
            overflow: 'hidden', borderRadius: 12,
        }}>
            {normalAmbient}
            {rushAmbient}

            {visible && (
                <>
                    {phase === 'flash' && (
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: c.flashBg,
                            animation: 'upper-flash-hit 300ms ease-out forwards',
                        }} />
                    )}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: c.bg,
                        opacity: phase === 'fade' ? 0 : 1,
                        transition: 'opacity 300ms ease-out',
                    }} />
                    {c.text && phase === 'text' && (
                        <div style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <div style={{
                                fontSize: c.fontSize,
                                fontWeight: 900,
                                color: c.textColor,
                                textShadow: c.textShadow,
                                letterSpacing: '0.15em',
                                animation: 'upper-text-pop 400ms ease-out',
                            }}>
                                {c.text}
                            </div>
                        </div>
                    )}
                    {effect.type === 'triple' && phase === 'text' && (
                        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                            {Array.from({ length: isRush ? 28 : 16 }).map((_, i) => (
                                <div key={i} style={{
                                    position: 'absolute',
                                    width: `${3 + (i % 4)}px`, height: `${3 + (i % 4)}px`,
                                    borderRadius: '50%',
                                    background: i % 3 === 0 ? (isRush ? rushColor2 : '#FFF2A8') : i % 3 === 1 ? (isRush ? rushColor3 : '#B45309') : (isRush ? rushColor : '#D4AF37'),
                                    left: '50%', top: '50%',
                                    animation: `upper-burst ${0.7 + (i % 4) * 0.15}s ease-out forwards`,
                                    animationDelay: `${i * 20}ms`,
                                    transform: `rotate(${i * (360 / (isRush ? 28 : 16))}deg) translateX(0)`,
                                }} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export function MiniRunner({ todayXP, goalXP, onGoalChange, lastReviewedWord, dropCard, gridInfo, sessionGP, slotMode = 'full', gridCompleteGrade, onSpecialSlotTrigger }: {
    todayXP: number;
    goalXP: number;
    onGoalChange: (xp: number) => void;
    lastReviewedWord?: { text: string; key: number } | null;
    dropCard?: { phraseId: string; english: string; japanese: string; element: string; rank: string; points: number; bstTotal: number; key: number } | null;
    gridInfo?: { filled: number; total: number };
    sessionGP?: number;
    slotMode?: 'full' | 'minimal' | 'effects';
    gridCompleteGrade?: 'S' | 'A' | 'B' | 'C' | 'D' | null;
    onSpecialSlotTrigger?: (grade: string) => void;
}) {
    const prevXpRef = useRef(todayXP);
    const prevGodRef = useRef(todayXP >= goalXP);

    // === PER-CARD SLOT ATTACK (fires on every review) ===
    const [cardSlotPhase, setCardSlotPhase] = useState<'idle' | 'spin' | 'stop1' | 'stop2' | 'reach' | 'stop3' | 'result' | 'attack' | 'impact'>('idle');
    const [cardSlotReels, setCardSlotReels] = useState<[string, string, string]>(['blank', 'blank', 'blank']);
    const [cardSlotTier, setCardSlotTier] = useState('');
    const [cardSlotCard, setCardSlotCard] = useState<{ english: string; element: string; bstTotal: number; rank: string } | null>(null);
    const [cardSlotDmg, setCardSlotDmg] = useState<number | null>(null);
    const cardSlotTimerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const prevDropRef = useRef<number>(dropCard?.key ?? 0);
    const cardSlotPendingRef = useRef<{ tier: string; combo: [string, string, string]; dmg: number } | null>(null);

    // Tap-to-skip: only works for GREAT and below (tierPow <= 2), skips to result
    const skipCardSlot = useCallback(() => {
        const pending = cardSlotPendingRef.current;
        if (!pending) return;
        const tp = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[pending.tier] || 0;
        if (tp >= 3) return; // SUPER+ cannot be skipped
        // Clear all pending timers
        cardSlotTimerRef.current.forEach(t => clearTimeout(t));
        cardSlotTimerRef.current = [];
        // Jump to result
        setCardSlotReels(pending.combo);
        setCardSlotPhase('result');
        setCardSlotTier(pending.tier);
        if (pending.tier !== 'MISS') playGachaSound(pending.tier);
        setTimeout(() => {
            setCardSlotPhase('impact');
            setCardSlotDmg(pending.dmg);
            playImpactHit(tp);
        }, 200);
        setTimeout(() => {
            setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier('');
            cardSlotPendingRef.current = null;
        }, 1000);
    }, []);

    const ELEM_COLOR_MAP: Record<string, string> = { flame: '#EF4444', aqua: '#3B82F6', wind: '#10B981', earth: '#D97706', thunder: '#8B5CF6' };
    const ELEM_JA_MAP: Record<string, string> = { flame: '火', aqua: '水', wind: '風', earth: '地', thunder: '雷' };

    const [kakuhenBoost, setKakuhenBoost] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('training-kakuhen-boost');
            if (saved) return Math.max(0, parseInt(saved) || 0);
        }
        return 0;
    }); // remaining boosted spins after boss defeat
    useEffect(() => { localStorage.setItem('training-kakuhen-boost', String(kakuhenBoost)); }, [kakuhenBoost]);
    const [cardSlotKakuhenFlash, setCardSlotKakuhenFlash] = useState(false);
    const [cardSlotPremium, setCardSlotPremium] = useState(false); // 1% ultra-rare premium演出

    // === GRID COMPLETE SPECIAL GACHA (button-triggered) ===
    const [gridCompletePhase, setGridCompletePhase] = useState<'idle' | 'ready' | 'flash' | 'grade' | 'reward'>('idle');
    const [gridCompleteReward, setGridCompleteReward] = useState(0);
    const [pendingGachaGrade, setPendingGachaGrade] = useState<string | null>(null);
    const prevGridGradeRef = useRef<string | null>(null);

    // When grid completes, show the GACHA button (ready state) instead of auto-firing
    useEffect(() => {
        if (!gridCompleteGrade || gridCompleteGrade === prevGridGradeRef.current) return;
        prevGridGradeRef.current = gridCompleteGrade;
        setPendingGachaGrade(gridCompleteGrade);
        setGridCompletePhase('ready');
    }, [gridCompleteGrade]);

    // Gacha fire function — triggers special golden slot on parent
    const fireSpecialGacha = useCallback(() => {
        if (!pendingGachaGrade) return;
        if (onSpecialSlotTrigger) {
            // Delegate to parent: triggers golden special slot on ReviewSlotPanel
            onSpecialSlotTrigger(pendingGachaGrade);
            setGridCompletePhase('idle');
            prevGridGradeRef.current = null;
            setPendingGachaGrade(null);
        } else {
            // Fallback: old animation
            const gradeMultiplier: Record<string, number> = { S: 500, A: 300, B: 150, C: 80, D: 30 };
            const reward = gradeMultiplier[pendingGachaGrade] || 50;
            setGridCompleteReward(reward);
            setGridCompletePhase('flash');
            playImpactHit(1.0);
            setTimeout(() => { setGridCompletePhase('grade'); playGachaSound('LEGENDARY'); }, 1200);
            setTimeout(() => { setGridCompletePhase('reward'); playImpactHit(0.5); }, 3000);
            setTimeout(() => {
                setGridCompletePhase('idle');
                prevGridGradeRef.current = null;
                setPendingGachaGrade(null);
            }, 5500);
        }
    }, [pendingGachaGrade, onSpecialSlotTrigger]);

    useEffect(() => {
        if (!dropCard || dropCard.key === prevDropRef.current) return;
        // In minimal mode, skip all effects — ReviewSlotPanel handles everything
        // Also skip when slot animation is globally disabled (sounds were leaking in background)
        if (slotMode === 'minimal' || !getSettings().slotEnabled) {
            prevDropRef.current = dropCard.key;
            return;
        }
        prevDropRef.current = dropCard.key;
        cardSlotTimerRef.current.forEach(t => clearTimeout(t));
        cardSlotTimerRef.current = [];
        const T: ReturnType<typeof setTimeout>[] = [];
        const push = (fn: () => void, ms: number) => { T.push(setTimeout(fn, ms)); };

        // Calculate slot tier based on card stats + state bonus — generous odds, MISS is rare
        const bstBonus = dropCard.bstTotal >= 500 ? 15 : dropCard.bstTotal >= 400 ? 8 : dropCard.bstTotal >= 300 ? 3 : 0;
        const rankMap: Record<string, number> = { LEGENDARY: 20, HOLOGRAPHIC: 12, GOLD: 6, SILVER: 3, BRONZE: 1, NORMAL: 0 };
        const rankBonus = rankMap[dropCard.rank] || 0;
        const kBoost = kakuhenBoost > 0 ? 20 : 0; // 確変中は大幅ブースト
        const stateBonus = SLOT_STATE_CONFIG[slotState].tierBonus; // RUSH +20, FEVER +40
        const bonus = bstBonus + rankBonus + kBoost + stateBonus;
        if (kakuhenBoost > 0) setKakuhenBoost(prev => prev - 1);
        const roll = Math.random() * 100;
        // Boosted odds: MISS only ~15%, 確変中はMISS ~5%
        const tier = roll < 1 + bonus * 0.05 ? 'MYTHIC'
            : roll < 4 + bonus * 0.1 ? 'LEGENDARY'
            : roll < 12 + bonus * 0.15 ? 'MEGA'
            : roll < 28 + bonus * 0.25 ? 'SUPER'
            : roll < 50 + bonus * 0.3 ? 'GREAT'
            : roll < 85 + bonus * 0.2 ? 'BONUS' : 'MISS';
        // Near-miss: MISS can fake a REACH (first 2 match, 3rd doesn't) ~30% of the time
        let combo: [string, string, string];
        let isReach: boolean;
        let isFakeReach = false;
        if (tier === 'MISS' && Math.random() < 0.3) {
            // ハズレREACH: show matching first 2 reels, then different 3rd
            const fakeSymbol: SlotSymbolId = (['seven-red', 'bar', 'bell', 'grape'] as SlotSymbolId[])[Math.floor(Math.random() * 4)];
            const thirdSymbol = randomOtherSymbol(fakeSymbol);
            combo = [fakeSymbol, fakeSymbol, thirdSymbol];
            isReach = true;
            isFakeReach = true;
        } else {
            combo = (TIER_TO_COMBO[tier] || generateMissCombo()) as [string, string, string];
            isReach = tier !== 'MISS' && combo[0] === combo[1];
        }
        const tierPower = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[tier] || 0;

        setCardSlotCard({ english: dropCard.english, element: dropCard.element, bstTotal: dropCard.bstTotal, rank: dropCard.rank });
        setCardSlotDmg(null);
        setCardSlotKakuhenFlash(false);
        const dmgMultiplier = { MYTHIC: 4.0, LEGENDARY: 3.0, MEGA: 2.2, SUPER: 1.6, GREAT: 1.3, BONUS: 1.0, MISS: 0.5 }[tier] || 1;

        cardSlotPendingRef.current = { tier, combo: combo as [string, string, string], dmg: Math.round(dropCard.bstTotal * dmgMultiplier) };

        // 確変中: brief red flash at spin start
        if (kakuhenBoost > 0 && tier !== 'MISS') {
            setCardSlotKakuhenFlash(true);
            push(() => setCardSlotKakuhenFlash(false), 300);
        }

        // Premium演出: 1% chance, independent of tier (can happen on BONUS too)
        const isPremium = tier !== 'MISS' && Math.random() < 0.01;
        if (isPremium) setCardSlotPremium(true);

        // === COMPLETELY DIFFERENT SEQUENCE PER TIER ===

        if (tier === 'MISS' && isFakeReach) {
            // ハズレREACH: reels spin, first 2 match, REACH fires... then 3rd fails
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); playSpinStart(); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); playReelStop(0); }, 500);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase('reach'); playReelStop(1); playReachAlert(); }, 900);
            // Dramatic REACH pause... then FAIL
            push(() => { setCardSlotReels(combo as [string, string, string]); setCardSlotPhase('stop3'); playReelStop(2); }, 2000);
            push(() => { setCardSlotPhase('result'); setCardSlotTier('MISS'); playImpactHit(0); }, 2200);
            push(() => { setCardSlotDmg(Math.round(dropCard.bstTotal * 0.5)); setCardSlotPhase('impact'); }, 2400);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 3200);

        } else if (tier === 'MISS') {
            // MISS: No reels. Tiny "x" flash at bottom, gone in 0.5s
            push(() => { setCardSlotPhase('result'); setCardSlotTier('MISS'); playImpactHit(0); }, 0);
            push(() => { setCardSlotDmg(Math.round(dropCard.bstTotal * 0.5)); setCardSlotPhase('impact'); }, 200);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 600);

        } else if (tier === 'BONUS') {
            // BONUS: Small reels, quick spin, small flash
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); playSpinStart(); }, 0);
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); playReelStop(2); }, 400);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); playGachaSound('BONUS'); }, 550);
            push(() => { setCardSlotPhase('attack'); }, 800);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); playImpactHit(1); }, 1000);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 2000);

        } else if (tier === 'GREAT') {
            // GREAT: Normal reels, element tint, decent effect
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); playSpinStart(); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); playReelStop(0); }, 450);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase(isReach ? 'reach' : 'stop2'); playReelStop(1); if (isReach) playReachAlert(); }, 800);
            const r3g = isReach ? 1400 : 1050;
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); playReelStop(2); }, r3g);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); playGachaSound('GREAT'); }, r3g + 200);
            push(() => { setCardSlotPhase('attack'); }, r3g + 500);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); playImpactHit(2); }, r3g + 750);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, r3g + 2000);

        } else if (tier === 'SUPER') {
            // SUPER: Bigger reels, screen border glow, dramatic pause
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); playSpinStart(); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); playReelStop(0); }, 500);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase(isReach ? 'reach' : 'stop2'); playReelStop(1); if (isReach) playReachAlert(); }, 900);
            const r3s = isReach ? 1800 : 1200;
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); playReelStop(2); }, r3s);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); playGachaSound('SUPER'); }, r3s + 250);
            push(() => { setCardSlotPhase('attack'); }, r3s + 600);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); playImpactHit(3); }, r3s + 900);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, r3s + 2500);

        } else if (tier === 'MEGA') {
            // MEGA: Full screen takeover, long REACH, screen crack, explosion
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); playSpinStart(); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); playReelStop(0); }, 600);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase('reach'); playReelStop(1); playReachAlert(); }, 1000);
            // Long dramatic REACH pause
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); playReelStop(2); }, 2400);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); playGachaSound('MEGA'); }, 2600);
            push(() => { setCardSlotPhase('attack'); }, 3000);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); playImpactHit(4); }, 3300);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 5500);

        } else if (tier === 'LEGENDARY') {
            // LEGENDARY: Screen goes GOLD, everything transforms, massive payoff
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); playSpinStart(); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); playReelStop(0); }, 600);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase('reach'); playReelStop(1); playReachAlert(); }, 1100);
            // Extra long dramatic REACH
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); playReelStop(2); }, 3000);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); playGachaSound('LEGENDARY'); }, 3300);
            push(() => { setCardSlotPhase('attack'); }, 3800);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); playImpactHit(5); }, 4200);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 6500);

        } else {
            // MYTHIC: Complete scene transformation, god-mode
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); playSpinStart(); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); playReelStop(0); }, 700);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase('reach'); playReelStop(1); playReachAlert(); }, 1200);
            // Maximum suspense REACH
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); playReelStop(2); }, 3500);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); playGachaSound('MYTHIC'); }, 3800);
            push(() => { setCardSlotPhase('attack'); }, 4500);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); playImpactHit(6); }, 5000);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 7500);
        }

        cardSlotTimerRef.current = T;

        // === 3-STATE TRANSITIONS ===
        // Increment ceiling in NORMAL, decrement spins in RUSH/FEVER
        if (slotState === 'normal') {
            const newCeiling = ceiling + 1;
            setCeiling(newCeiling);
            // Ceiling hit OR MEGA+ → transition to RUSH
            const tierPowerForState = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[tier] || 0;
            if (newCeiling >= SLOT_STATE_CONFIG.normal.ceilingMax || tierPowerForState >= 4) {
                const finalMs = { MYTHIC: 7500, LEGENDARY: 6500, MEGA: 5500, SUPER: 2500, GREAT: 2000, BONUS: 2000, MISS: 600 }[tier] || 2000;
                push(() => transitionSlotState('rush'), finalMs + 200);
            }
        } else if (slotState === 'rush') {
            const left = stateSpinsLeft - 1;
            setStateSpinsLeft(left);
            const tierPowerForState = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[tier] || 0;
            // LEGENDARY/MYTHIC during RUSH → FEVER
            if (tierPowerForState >= 5) {
                const finalMs = { MYTHIC: 7500, LEGENDARY: 6500 }[tier] || 6500;
                push(() => transitionSlotState('fever'), finalMs + 200);
            } else if (left <= 0) {
                // RUSH exhausted → fall to NORMAL
                const finalMs = { MYTHIC: 7500, LEGENDARY: 6500, MEGA: 5500, SUPER: 2500, GREAT: 2000, BONUS: 2000, MISS: 600 }[tier] || 2000;
                push(() => transitionSlotState('normal'), finalMs + 200);
            }
        } else if (slotState === 'fever') {
            const left = stateSpinsLeft - 1;
            setStateSpinsLeft(left);
            if (left <= 0) {
                // FEVER exhausted → loop check
                const finalMs = { MYTHIC: 7500, LEGENDARY: 6500, MEGA: 5500, SUPER: 2500, GREAT: 2000, BONUS: 2000, MISS: 600 }[tier] || 2000;
                if (Math.random() < SLOT_STATE_CONFIG.fever.loopRate) {
                    // Loop → back to RUSH
                    push(() => transitionSlotState('rush'), finalMs + 200);
                } else {
                    // Fall → NORMAL
                    push(() => transitionSlotState('normal'), finalMs + 200);
                }
            }
        }

        return () => { T.forEach(t => clearTimeout(t)); cardSlotPendingRef.current = null; setCardSlotPremium(false); };
    }, [dropCard]);
    const [reaction, setReaction] = useState<(RunnerReaction & { points: number; key: number }) | null>(null);
    const [godCelebration, setGodCelebration] = useState(false);
    const [showGoalSetting, setShowGoalSetting] = useState(false);
    const [goalInput, setGoalInput] = useState(String(goalXP));
    useEffect(() => { setGoalInput(String(goalXP)); }, [goalXP]);

    // === WEB AUDIO SFX ===
    const audioCtxRef = useRef<AudioContext | null>(null);
    const getAudio = () => {
        if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
        return audioCtxRef.current;
    };
    const sfxTone = (freq: number, dur: number, type: OscillatorType = 'square', vol = 0.12) => {
        try {
            const ctx = getAudio();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = type; osc.frequency.value = freq;
            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(); osc.stop(ctx.currentTime + dur);
        } catch {}
    };
    const sfxNoise = (dur: number, vol = 0.08) => {
        try {
            const ctx = getAudio();
            const buf = ctx.createBuffer(1, ctx.sampleRate * dur, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
            const src = ctx.createBufferSource();
            const gain = ctx.createGain();
            src.buffer = buf;
            gain.gain.setValueAtTime(vol, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
            src.connect(gain); gain.connect(ctx.destination);
            src.start();
        } catch {}
    };
    const sfxBattleStart = () => { sfxTone(220, 0.15, 'square'); setTimeout(() => sfxTone(330, 0.15, 'square'), 100); setTimeout(() => sfxTone(440, 0.3, 'square'), 200); };

    const sfxSlash = () => { sfxNoise(0.12, 0.15); sfxTone(800, 0.08, 'square', 0.1); };
    const sfxCritical = () => { sfxNoise(0.2, 0.2); sfxTone(1200, 0.1, 'square', 0.15); setTimeout(() => sfxTone(1600, 0.15, 'square', 0.12), 80); };
    const sfxSpell: Record<string, () => void> = {
        flame: () => { sfxNoise(0.3, 0.12); sfxTone(300, 0.3, 'sawtooth', 0.08); },
        aqua: () => { sfxTone(600, 0.2, 'sine', 0.1); setTimeout(() => sfxTone(800, 0.2, 'sine', 0.08), 100); },
        thunder: () => { sfxNoise(0.15, 0.2); sfxTone(100, 0.4, 'square', 0.1); },
        wind: () => { sfxNoise(0.25, 0.06); sfxTone(500, 0.2, 'triangle', 0.08); },
        earth: () => { sfxTone(80, 0.3, 'square', 0.12); sfxNoise(0.2, 0.1); },
    };
    const sfxDamageHit = () => { sfxTone(200, 0.1, 'square', 0.1); sfxNoise(0.08, 0.1); };
    const sfxSynergy = () => { sfxTone(440, 0.1, 'square', 0.08); setTimeout(() => sfxTone(660, 0.15, 'square', 0.1), 80); };
    const sfxVictory = () => {
        [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => sfxTone(f, 0.25, 'square', 0.1), i * 120));
    };
    const sfxDefeat = () => { sfxTone(300, 0.2, 'sawtooth', 0.1); setTimeout(() => sfxTone(200, 0.3, 'sawtooth', 0.1), 150); setTimeout(() => sfxTone(120, 0.5, 'sawtooth', 0.08), 350); };
    const sfxGrade = (g: string) => {
        if (g === 'S') { [880, 1108, 1320, 1760].forEach((f, i) => setTimeout(() => sfxTone(f, 0.2, 'square', 0.12), i * 80)); }
        else if (g === 'A') { sfxTone(660, 0.2, 'square', 0.1); setTimeout(() => sfxTone(880, 0.25, 'square', 0.1), 100); }
        else { sfxTone(440, 0.2, 'triangle', 0.08); }
    };

    // Slot tier for each card — better cards = better odds
    const getSlotTierForCard = (card: { bstTotal: number; rank: string; elementAdvantage: string }): string => {
        const bstBonus = card.bstTotal >= 500 ? 15 : card.bstTotal >= 400 ? 8 : card.bstTotal >= 300 ? 3 : 0;
        const rankMap: Record<string, number> = { LEGENDARY: 20, HOLOGRAPHIC: 12, GOLD: 6, SILVER: 3, BRONZE: 1, NORMAL: 0 };
        const rankBonus = rankMap[card.rank] || 0;
        const advBonus = card.elementAdvantage === 'super' ? 10 : 0;
        const bonus = bstBonus + rankBonus + advBonus;
        const roll = Math.random() * 100;
        if (roll < 0.5 + bonus * 0.02) return 'MYTHIC';
        if (roll < 2 + bonus * 0.05) return 'LEGENDARY';
        if (roll < 6 + bonus * 0.1) return 'MEGA';
        if (roll < 15 + bonus * 0.2) return 'SUPER';
        if (roll < 30 + bonus * 0.3) return 'GREAT';
        if (roll < 55 + bonus * 0.3) return 'BONUS';
        return 'MISS';
    };
    const sfxSlotSpin = () => { sfxTone(200, 0.06, 'square', 0.06); };
    const sfxSlotStop = () => { sfxTone(440, 0.04, 'sine', 0.08); };
    const sfxSlotReach = () => { sfxTone(880, 0.15, 'square', 0.12); setTimeout(() => sfxTone(880, 0.15, 'square', 0.1), 120); };
    const sfxSlotHit = (tier: string) => {
        if (tier === 'MYTHIC' || tier === 'LEGENDARY') { [880, 1100, 1320, 1760].forEach((f, i) => setTimeout(() => sfxTone(f, 0.2, 'square', 0.14), i * 60)); }
        else if (tier === 'MEGA') { sfxTone(660, 0.15, 'square', 0.12); setTimeout(() => sfxTone(990, 0.2, 'square', 0.12), 80); }
        else if (tier === 'SUPER') { sfxTone(550, 0.12, 'square', 0.1); setTimeout(() => sfxTone(770, 0.15, 'square', 0.1), 80); }
        else if (tier === 'GREAT') { sfxTone(440, 0.1, 'sine', 0.1); }
    };


    // === 3-STATE SLOT MACHINE SYSTEM (NORMAL → RUSH → FEVER) ===
    type SlotMachineState = 'normal' | 'rush' | 'fever';
    const SLOT_STATE_CONFIG = {
        normal: { label: '通常', color: '#78716C', bg: 'linear-gradient(180deg, #0C0C10 0%, #1A1A22 40%, #12121A 100%)', tierBonus: 0, ceilingMax: 12 },
        rush: { label: 'RUSH', color: '#DC2626', bg: 'linear-gradient(180deg, #1A0808 0%, #2A0C0C 30%, #1A0808 100%)', tierBonus: 20, duration: 8 },
        fever: { label: 'FEVER', color: '#D4AF37', bg: 'linear-gradient(180deg, #14081A 0%, #1A1008 30%, #14081A 100%)', tierBonus: 40, duration: 5, loopRate: 0.80 },
    };
    const [slotState, setSlotState] = useState<SlotMachineState>(() => {
        if (typeof window !== 'undefined') {
            try { const s = JSON.parse(localStorage.getItem('inline-slot-state') || '{}'); return s.state || 'normal'; } catch { return 'normal'; }
        }
        return 'normal';
    });
    const [ceiling, setCeiling] = useState(() => {
        if (typeof window !== 'undefined') {
            try { return JSON.parse(localStorage.getItem('inline-slot-state') || '{}').ceiling || 0; } catch { return 0; }
        }
        return 0;
    });
    const [stateSpinsLeft, setStateSpinsLeft] = useState(() => {
        if (typeof window !== 'undefined') {
            try { return JSON.parse(localStorage.getItem('inline-slot-state') || '{}').spinsLeft || 0; } catch { return 0; }
        }
        return 0;
    });
    const [stateTransition, setStateTransition] = useState<{ from: SlotMachineState; to: SlotMachineState; key: number } | null>(null);
    const [reelSpinSymbols, setReelSpinSymbols] = useState<[string, string, string]>(['blank', 'blank', 'blank']);
    const spinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Persist slot state
    useEffect(() => {
        localStorage.setItem('inline-slot-state', JSON.stringify({ state: slotState, ceiling, spinsLeft: stateSpinsLeft, kakuhenBoost }));
    }, [slotState, ceiling, stateSpinsLeft, kakuhenBoost]);

    // State transition handler
    const transitionSlotState = useCallback((to: SlotMachineState) => {
        setStateTransition({ from: slotState, to, key: Date.now() });
        setSlotState(to);
        if (to === 'rush') { setStateSpinsLeft(SLOT_STATE_CONFIG.rush.duration); setCeiling(0); }
        else if (to === 'fever') { setStateSpinsLeft(SLOT_STATE_CONFIG.fever.duration); }
        else { setCeiling(0); setStateSpinsLeft(0); }
        setTimeout(() => setStateTransition(null), 1500);
    }, [slotState]);

    // Spinning reel animation (random symbols during spin phase)
    useEffect(() => {
        if (cardSlotPhase === 'spin') {
            const pool = SPIN_POOL;
            spinIntervalRef.current = setInterval(() => {
                setReelSpinSymbols([
                    pool[Math.floor(Math.random() * pool.length)],
                    pool[Math.floor(Math.random() * pool.length)],
                    pool[Math.floor(Math.random() * pool.length)],
                ]);
            }, 60);
        } else {
            if (spinIntervalRef.current) { clearInterval(spinIntervalRef.current); spinIntervalRef.current = null; }
        }
        return () => { if (spinIntervalRef.current) clearInterval(spinIntervalRef.current); };
    }, [cardSlotPhase]);

    // XP progress (simplified from runner)
    const progress = Math.min(todayXP / Math.round(goalXP * 1.07), 1);

    // State-derived visuals
    const sc = SLOT_STATE_CONFIG[slotState];
    const ceilingRatio = slotState === 'normal' ? ceiling / sc.ceilingMax : 0;

    // Reel constants for the idle display
    const REEL_W = 72;
    const REEL_H = 120;
    const REEL_GAP = 8;

    return (
        <div style={{ height: slotMode === 'effects' ? '120px' : '220px', position: 'relative', overflow: 'hidden', background: sc.bg, transition: 'background 0.8s ease, height 0.3s ease', borderBottom: '2px solid #111', flexShrink: 0 }}>

            {/* === AMBIENT LIGHTING — state-specific atmospheric effects === */}
            {/* NORMAL: subtle gold + emerald ambient from logo colors */}
            {slotState === 'normal' && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 50% 80%, rgba(212,175,55,0.04) 0%, transparent 60%), radial-gradient(ellipse at 30% 30%, rgba(16,185,129,0.03) 0%, transparent 50%)',
                }} />
            )}
            {/* RUSH: pulsing red center glow + edge heat */}
            {slotState === 'rush' && (<>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 50% 55%, rgba(220,38,38,0.18) 0%, rgba(220,38,38,0.04) 40%, transparent 70%)',
                    animation: 'dq-aura-pulse 1.2s ease-in-out infinite',
                }} />
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    boxShadow: 'inset 0 0 60px rgba(220,38,38,0.08), inset 0 -20px 40px rgba(220,38,38,0.06)',
                }} />
            </>)}
            {/* FEVER: rainbow particles + gold/purple dual glow */}
            {slotState === 'fever' && (<>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse at 40% 40%, rgba(212,175,55,0.12) 0%, transparent 50%), radial-gradient(ellipse at 60% 60%, rgba(168,85,247,0.10) 0%, transparent 50%)',
                    animation: 'dq-aura-pulse 2s ease-in-out infinite',
                }} />
                {Array.from({ length: 20 }, (_, i) => {
                    const colors = ['#D4AF37', '#A855F7', '#EC4899', '#10B981', '#3B82F6', '#FDE68A', '#EF4444', '#F59E0B'];
                    const c = colors[i % colors.length];
                    return (<div key={`fp-${i}`} style={{
                        position: 'absolute', zIndex: 2, pointerEvents: 'none',
                        top: `${8 + (i * 17) % 84}%`, left: `${3 + (i * 19) % 94}%`,
                        width: `${2 + i % 3}px`, height: `${2 + i % 3}px`,
                        background: c, borderRadius: '50%', opacity: 0.6,
                        boxShadow: `0 0 6px ${c}, 0 0 12px ${c}60`,
                        animation: `reach-particle ${0.8 + (i % 5) * 0.4}s ease-in-out ${i * 0.08}s infinite`,
                    }} />);
                })}
            </>)}

            {/* === METALLIC TEXTURE — brushed steel scanlines === */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.03,
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)',
            }} />
            {/* Top chrome edge highlight */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 95%)',
            }} />

            {/* === STATE TRANSITION FLASH === */}
            {stateTransition && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 70, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                    background: stateTransition.to === 'fever' ? 'radial-gradient(circle, rgba(212,175,55,0.7) 0%, rgba(168,85,247,0.5) 30%, rgba(0,0,0,0.95) 70%)'
                        : stateTransition.to === 'rush' ? 'radial-gradient(circle, rgba(220,38,38,0.6) 0%, rgba(212,175,55,0.3) 35%, rgba(0,0,0,0.95) 70%)'
                        : 'radial-gradient(circle, rgba(120,113,108,0.4) 0%, rgba(0,0,0,0.9) 60%)',
                    animation: 'dq-spell-burst 1.5s ease-out forwards',
                }}>
                    <div style={{
                        fontSize: stateTransition.to === 'normal' ? '24px' : '40px',
                        fontWeight: '900', letterSpacing: stateTransition.to === 'normal' ? '6px' : '12px',
                        color: stateTransition.to === 'fever' ? '#FDE68A' : stateTransition.to === 'rush' ? '#EF4444' : '#78716C',
                        textShadow: `0 0 40px ${SLOT_STATE_CONFIG[stateTransition.to].color}, 0 0 80px ${SLOT_STATE_CONFIG[stateTransition.to].color}80, 0 2px 4px rgba(0,0,0,0.8)`,
                        animation: 'dq-text-appear 400ms ease-out',
                    }}>
                        {stateTransition.to === 'fever' ? 'FEVER!!' : stateTransition.to === 'rush' ? 'RUSH!' : '転落...'}
                    </div>
                    {stateTransition.to !== 'normal' && (
                        <div style={{ fontSize: '12px', fontWeight: '700', color: '#A8A29E', marginTop: '6px', letterSpacing: '3px',
                            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                        }}>
                            {stateTransition.to === 'fever' ? `${SLOT_STATE_CONFIG.fever.duration} SPINS` : `${SLOT_STATE_CONFIG.rush.duration} SPINS`}
                        </div>
                    )}
                </div>
            )}

            {/* === STATE BAR (top 32px) — card-slot style with glow border === */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '32px', zIndex: 10,
                display: 'flex', alignItems: 'center', padding: '0 10px', gap: '8px',
                background: 'linear-gradient(180deg, rgba(10,9,8,0.9) 0%, rgba(10,9,8,0.6) 100%)',
                borderBottom: `1px solid ${sc.color}30`,
                boxShadow: slotState !== 'normal' ? `0 2px 12px ${sc.color}15` : 'none',
            }}>
                {/* State indicator dot + label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{
                        width: '6px', height: '6px', borderRadius: '50%', background: sc.color,
                        boxShadow: `0 0 6px ${sc.color}80`,
                        animation: slotState !== 'normal' ? 'dq-aura-pulse 1s ease-in-out infinite' : undefined,
                    }} />
                    <div style={{
                        fontSize: '10px', fontWeight: '900', letterSpacing: '1.5px',
                        color: sc.color,
                        textShadow: slotState !== 'normal' ? `0 0 8px ${sc.color}60` : 'none',
                    }}>
                        {sc.label}
                    </div>
                </div>
                {/* Ceiling meter (NORMAL) or Spins left (RUSH/FEVER) */}
                {slotState === 'normal' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{ fontSize: '8px', fontWeight: '600', color: '#57534E', letterSpacing: '0.5px' }}>CEIL</div>
                        <div style={{ width: '48px', height: '5px', background: '#1A1A22', borderRadius: '3px', border: '1px solid #333', overflow: 'hidden', position: 'relative' }}>
                            <div style={{
                                position: 'absolute', top: 0, left: 0, height: '100%',
                                width: `${ceilingRatio * 100}%`, borderRadius: '3px',
                                background: ceilingRatio > 0.8 ? 'linear-gradient(90deg, #EF4444, #D4AF37)' : ceilingRatio > 0.5 ? 'linear-gradient(90deg, #F59E0B, #D4AF37)' : 'linear-gradient(90deg, #555, #777)',
                                transition: 'width 0.4s ease',
                                animation: ceilingRatio > 0.8 ? 'dq-aura-pulse 0.6s ease-in-out infinite' : undefined,
                            }} />
                        </div>
                        <div style={{ fontSize: '9px', fontWeight: '700', color: ceilingRatio > 0.8 ? '#D4AF37' : '#57534E', fontFamily: 'monospace' }}>
                            {ceiling}/{(sc as any).ceilingMax}
                        </div>
                    </div>
                ) : stateSpinsLeft > 0 ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <div style={{ fontSize: '8px', fontWeight: '600', color: '#57534E' }}>SPINS</div>
                        <div style={{
                            fontSize: '14px', fontWeight: '900', color: sc.color, fontFamily: 'monospace',
                            textShadow: `0 0 8px ${sc.color}60`,
                        }}>
                            {stateSpinsLeft}
                        </div>
                    </div>
                ) : null}
                {/* 確変 badge */}
                {kakuhenBoost > 0 && (
                    <div style={{
                        fontSize: '9px', fontWeight: '900', color: '#D4AF37', letterSpacing: '1px',
                        background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                        border: '1px solid rgba(212,175,55,0.3)', borderRadius: '4px', padding: '1px 8px',
                        position: 'relative', overflow: 'hidden',
                        animation: 'dq-aura-pulse 1.5s ease-in-out infinite',
                    }}>
                        <span style={{ position: 'relative', zIndex: 1 }}>確変 x{kakuhenBoost}</span>
                        <div style={{
                            position: 'absolute', top: 0, left: '-100%', width: '200%', height: '100%',
                            background: 'linear-gradient(90deg, transparent 30%, rgba(212,175,55,0.2) 50%, transparent 70%)',
                            animation: 'chain-hud-accent-shimmer 2s ease-in-out infinite',
                        }} />
                    </div>
                )}
                <div style={{ flex: 1 }} />
                {/* XP counter */}
                <div style={{
                    fontSize: '11px', fontWeight: '700', color: '#E7E5E4', fontFamily: 'monospace',
                    background: 'rgba(0,0,0,0.5)', padding: '2px 10px', borderRadius: '4px',
                    border: '1px solid #333',
                }}>
                    {todayXP}<span style={{ color: '#57534E', margin: '0 2px' }}>/</span>{goalXP}
                </div>
                {/* GP counter */}
                {(sessionGP || 0) > 0 && (
                    <div style={{
                        fontSize: '10px', fontWeight: '800', color: '#D4AF37', fontFamily: 'monospace',
                        background: 'rgba(0,0,0,0.5)', padding: '2px 8px', borderRadius: '4px',
                        border: '1px solid #D4AF3730',
                    }}>
                        {(sessionGP || 0).toLocaleString()} <span style={{ fontSize: '8px', fontWeight: '600', opacity: 0.7 }}>GP</span>
                    </div>
                )}
                {/* Settings gear */}
                <button onClick={() => setShowGoalSetting(!showGoalSetting)} style={{
                    width: '20px', height: '20px', borderRadius: '50%', border: '1px solid #333',
                    background: 'rgba(255,255,255,0.05)', color: '#57534E', fontSize: '10px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                </button>
            </div>

            {/* === EFFECT STAGE — hit/miss effects render here, no slot reels === */}
            {/* Per-card slot result effects */}
            {cardSlotPhase === 'result' && cardSlotTier && cardSlotTier !== 'MISS' && (
                <div style={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 20, textAlign: 'center',
                    animation: 'dq-aura-pulse 0.4s ease-in-out',
                }}>
                    <div style={{
                        fontSize: cardSlotTier === 'MYTHIC' ? '48px' : cardSlotTier === 'LEGENDARY' ? '42px' : '32px',
                        fontWeight: '900', letterSpacing: '4px',
                        color: cardSlotTier === 'MYTHIC' ? '#D4AF37' : cardSlotTier === 'LEGENDARY' ? '#A855F7' : '#fff',
                        textShadow: `0 0 20px ${sc.color}, 0 0 40px ${sc.color}80, 0 2px 4px rgba(0,0,0,0.8)`,
                    }}>
                        {cardSlotTier}
                    </div>
                </div>
            )}
            {cardSlotPhase === 'impact' && cardSlotDmg !== null && (
                <div style={{
                    position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
                    zIndex: 20, textAlign: 'center',
                }}>
                    <div style={{
                        fontSize: '28px', fontWeight: '900', fontFamily: 'monospace',
                        color: '#fff',
                        textShadow: `0 0 16px ${sc.color}, 0 0 32px ${sc.color}60`,
                    }}>
                        +{cardSlotDmg}
                    </div>
                </div>
            )}

            {/* === INFO BAR (bottom 36px) — grid countdown + last word === */}
            {cardSlotPhase === 'idle' && (
                <div style={{
                    position: 'absolute', bottom: '8px', left: '10px', right: '10px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                    {/* Grid fill countdown */}
                    {gridInfo && gridInfo.filled < gridInfo.total && (() => {
                        const remaining = gridInfo.total - gridInfo.filled;
                        const isClose = remaining <= 2;
                        return (
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '4px',
                                background: isClose ? 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(212,175,55,0.04))' : 'rgba(255,255,255,0.03)',
                                border: `1px solid ${isClose ? '#D4AF3740' : '#2A2A2A'}`,
                                borderRadius: '6px', padding: '3px 10px',
                                animation: isClose ? 'dq-aura-pulse 1.2s ease-in-out infinite' : undefined,
                            }}>
                                <div style={{ fontSize: '8px', fontWeight: '600', color: '#57534E', letterSpacing: '0.5px' }}>GRID</div>
                                <div style={{
                                    fontSize: '14px', fontWeight: '900', fontFamily: 'monospace',
                                    color: isClose ? '#D4AF37' : '#78716C',
                                    textShadow: isClose ? '0 0 8px rgba(212,175,55,0.5)' : 'none',
                                }}>
                                    {remaining}
                                </div>
                            </div>
                        );
                    })()}
                    <div style={{ flex: 1 }} />
                    {/* Last reviewed word */}
                    {lastReviewedWord && (
                        <div style={{
                            fontSize: '9px', fontWeight: '600', color: '#444',
                            maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>
                            {lastReviewedWord.text}
                        </div>
                    )}
                </div>
            )}

            {/* === XP PROGRESS LINE (bottom edge) === */}
            <div style={{
                position: 'absolute', bottom: 0, left: 0, height: '3px', zIndex: 14, pointerEvents: 'none',
                width: `${progress * 100}%`,
                background: slotState === 'fever' ? 'linear-gradient(90deg, #A855F7, #D4AF37, #EC4899, #3B82F6)'
                    : slotState === 'rush' ? 'linear-gradient(90deg, #DC262660, #DC2626, #D4AF37)'
                    : 'linear-gradient(90deg, #3A3632, #57534E)',
                transition: 'width 0.8s ease',
                boxShadow: slotState !== 'normal' ? `0 0 8px ${sc.color}50` : 'none',
            }} />

            {/* === 確変 EDGE GLOW === */}
            {kakuhenBoost > 0 && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                    boxShadow: 'inset 0 0 30px rgba(220,38,38,0.12), inset 0 0 60px rgba(212,175,55,0.06)',
                    animation: 'dq-aura-pulse 1.5s ease-in-out infinite',
                }} />
            )}

            {/* === PER-CARD SLOT EFFECTS — CARD-BASED (contained, not full-screen) === */}
            {cardSlotPhase !== 'idle' && cardSlotCard && (() => {
                const ec = ELEM_COLOR_MAP[cardSlotCard.element] || '#78716C';
                const tierColor: Record<string, string> = { MYTHIC: '#EC4899', LEGENDARY: '#D4AF37', MEGA: '#EF4444', SUPER: '#3B82F6', GREAT: '#FBBF24', BONUS: '#7C3AED', MISS: '#78716C' };
                const tc = tierColor[cardSlotTier] || '#78716C';
                const tierPow = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[cardSlotTier] || 0;
                const isSpinning = cardSlotPhase === 'spin';
                const isReaching = cardSlotPhase === 'reach';
                const isResult = cardSlotPhase === 'result';
                const isAttack = cardSlotPhase === 'attack';
                const isImpact = cardSlotPhase === 'impact';
                const isEffectsMode = slotMode === 'effects';

                // === MISS: minimal — tiny x at bottom ===
                if (cardSlotTier === 'MISS' && (isResult || isImpact)) {
                    return (<div style={{
                        position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)',
                        zIndex: 30, pointerEvents: 'none',
                        fontSize: '12px', fontWeight: '700', color: '#78716C80',
                        animation: 'dq-text-appear 150ms ease-out',
                    }}>
                        {isImpact && cardSlotDmg ? cardSlotDmg.toLocaleString() : 'x'}
                    </div>);
                }

                // === EFFECTS MODE: PACHINKO-GRADE STAGE PRODUCTION ===
                // Full light show — rotating beams, shockwaves, particle storms, sweeps, flashes
                // NO dark overlay. All additive light on top of the runner scene.
                if (isEffectsMode) {
                    const beamCount = tierPow >= 5 ? 16 : tierPow >= 4 ? 12 : tierPow >= 3 ? 8 : tierPow >= 2 ? 5 : 0;
                    const particleCount = tierPow >= 5 ? 24 : tierPow >= 4 ? 16 : tierPow >= 3 ? 10 : tierPow >= 2 ? 6 : 3;
                    const beamColor = tierPow >= 5 ? tc : tierPow >= 4 ? '#EF4444' : '#D4AF37';
                    return (<>
                        {/* ── LAYER 1: ROTATING BEAM WHEEL (like pachinko 大当たり light show) ── */}
                        {(isReaching || isAttack || isResult) && tierPow >= 2 && (
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%', zIndex: 30, pointerEvents: 'none',
                                width: '400%', height: '400%',
                                transform: 'translate(-50%, -50%)',
                                animation: `pachi-beam-rotate ${tierPow >= 5 ? '0.8' : tierPow >= 4 ? '1.2' : '2'}s linear infinite`,
                            }}>
                                {Array.from({ length: beamCount }, (_, i) => (
                                    <div key={`bw-${i}`} style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        width: tierPow >= 4 ? '4px' : '2px', height: '50%',
                                        background: `linear-gradient(180deg, ${beamColor}${tierPow >= 5 ? 'CC' : '80'} 0%, ${beamColor}40 40%, transparent 100%)`,
                                        transformOrigin: '50% 0%',
                                        transform: `rotate(${i * (360 / beamCount)}deg)`,
                                    }} />
                                ))}
                            </div>
                        )}

                        {/* ── LAYER 2: SHOCKWAVE RINGS expanding from center ── */}
                        {(isReaching || isResult || isAttack) && tierPow >= 3 && Array.from({ length: tierPow >= 5 ? 3 : 2 }, (_, i) => (
                            <div key={`sw-${i}`} style={{
                                position: 'absolute', top: '50%', left: '50%', zIndex: 31, pointerEvents: 'none',
                                width: '80px', height: '80px', borderRadius: '50%',
                                border: `${tierPow >= 5 ? '3px' : '2px'} solid ${beamColor}${tierPow >= 5 ? 'AA' : '60'}`,
                                boxShadow: `0 0 ${tierPow * 4}px ${beamColor}40, inset 0 0 ${tierPow * 3}px ${beamColor}30`,
                                animation: `pachi-ring-expand ${tierPow >= 5 ? '0.8' : '1.2'}s ease-out ${i * 0.3}s infinite`,
                            }} />
                        ))}

                        {/* ── LAYER 3: HORIZONTAL LIGHT SWEEP (pachislot roller wipe) ── */}
                        {(isReaching || isAttack) && tierPow >= 3 && (
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: 32, pointerEvents: 'none',
                                overflow: 'hidden',
                            }}>
                                <div style={{
                                    position: 'absolute', top: 0, bottom: 0,
                                    width: tierPow >= 5 ? '30%' : '20%',
                                    background: `linear-gradient(90deg, transparent 0%, ${beamColor}${tierPow >= 5 ? '50' : '30'} 40%, ${beamColor}${tierPow >= 5 ? '80' : '50'} 50%, ${beamColor}${tierPow >= 5 ? '50' : '30'} 60%, transparent 100%)`,
                                    animation: `pachi-sweep ${tierPow >= 5 ? '0.4' : '0.6'}s ease-in-out infinite`,
                                }} />
                            </div>
                        )}

                        {/* ── LAYER 4: PARTICLE FOUNTAIN (rising from bottom like pachinko balls) ── */}
                        {tierPow >= 1 && Array.from({ length: particleCount }, (_, i) => {
                            const colors5 = ['#D4AF37', '#FDE68A', '#EC4899', '#A855F7', '#fff', '#EF4444'];
                            const colors3 = ['#D4AF37', '#FDE68A', '#EF4444'];
                            const pColor = tierPow >= 5 ? colors5[i % 6] : tierPow >= 4 ? colors3[i % 3] : '#D4AF37';
                            const sz = tierPow >= 5 ? 4 + (i % 4) : tierPow >= 4 ? 3 + (i % 3) : 2 + (i % 2);
                            return (
                                <div key={`pf-${i}`} style={{
                                    position: 'absolute', zIndex: 33, pointerEvents: 'none',
                                    bottom: `${-5 + (i * 7) % 20}%`,
                                    left: `${5 + (i * 13 + 3) % 90}%`,
                                    width: `${sz}px`, height: `${sz}px`,
                                    borderRadius: '50%',
                                    background: pColor,
                                    boxShadow: `0 0 ${sz * 2}px ${pColor}, 0 0 ${sz * 4}px ${pColor}80`,
                                    animation: `pachi-fountain ${0.8 + (i % 5) * 0.3}s ease-out ${i * 0.05}s infinite`,
                                }} />
                            );
                        })}

                        {/* ── LAYER 5: ORBITING BOKEH LIGHTS ── */}
                        {tierPow >= 3 && Array.from({ length: tierPow >= 5 ? 6 : 3 }, (_, i) => (
                            <div key={`orb-${i}`} style={{
                                position: 'absolute', top: '50%', left: '50%', zIndex: 31, pointerEvents: 'none',
                                width: `${tierPow >= 5 ? 10 : 6}px`, height: `${tierPow >= 5 ? 10 : 6}px`,
                                borderRadius: '50%',
                                background: tierPow >= 5 ? ['#D4AF37', '#EC4899', '#A855F7', '#fff', '#FDE68A', '#3B82F6'][i] : beamColor,
                                boxShadow: `0 0 12px ${tierPow >= 5 ? ['#D4AF37', '#EC4899', '#A855F7'][i % 3] : beamColor}`,
                                '--orbit-r': `${30 + i * 15}px`,
                                animation: `pachi-orbit ${1.5 + i * 0.3}s linear ${i * 0.2}s infinite`,
                            } as React.CSSProperties} />
                        ))}

                        {/* ── LAYER 6: EDGE GLOW (pulsing border light) ── */}
                        {tierPow >= 2 && (
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none',
                                border: `${tierPow >= 5 ? '4px' : tierPow >= 4 ? '3px' : '2px'} solid ${beamColor}`,
                                boxShadow: `inset 0 0 ${tierPow * 10}px ${beamColor}${tierPow >= 5 ? '50' : '30'}, 0 0 ${tierPow * 8}px ${beamColor}${tierPow >= 5 ? '40' : '20'}`,
                                animation: `dq-aura-pulse ${tierPow >= 5 ? '0.15' : tierPow >= 4 ? '0.25' : '0.5'}s ease-in-out infinite`,
                            }} />
                        )}

                        {/* ── LAYER 7: FLASH BANG on phase transitions ── */}
                        {(isResult || isAttack) && tierPow >= 3 && (
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: 35, pointerEvents: 'none',
                                background: tierPow >= 5
                                    ? `radial-gradient(circle at 50% 50%, ${tc}DD 0%, ${tc}60 30%, transparent 60%)`
                                    : tierPow >= 4
                                    ? `radial-gradient(circle at 50% 50%, ${ec}AA 0%, ${ec}40 35%, transparent 60%)`
                                    : `radial-gradient(circle at 50% 50%, ${beamColor}60 0%, transparent 50%)`,
                                animation: `pachi-flash ${tierPow >= 5 ? '0.5' : '0.4'}s ease-out forwards`,
                            }} />
                        )}

                        {/* ── LAYER 8: REACH text with strobe ── */}
                        {isReaching && tierPow >= 2 && (<>
                            <div style={{
                                position: 'absolute', top: '35%', left: '50%',
                                transform: 'translate(-50%, -50%)', zIndex: 36, pointerEvents: 'none',
                                fontSize: tierPow >= 5 ? '42px' : tierPow >= 4 ? '32px' : tierPow >= 3 ? '24px' : '18px',
                                fontWeight: '900',
                                color: tierPow >= 4 ? '#EF4444' : '#D4AF37',
                                textShadow: `0 0 20px ${beamColor}, 0 0 40px ${beamColor}, 0 0 80px ${beamColor}80, 0 4px 12px rgba(0,0,0,0.9)`,
                                letterSpacing: tierPow >= 4 ? '14px' : '8px',
                                animation: `dq-aura-pulse ${tierPow >= 4 ? '0.15' : '0.3'}s ease-in-out infinite`,
                            }}>
                                {tierPow >= 6 ? 'MIRACLE!?' : tierPow >= 5 ? 'SUPER CHANCE' : tierPow >= 4 ? 'CHANCE!!' : 'REACH'}
                            </div>
                            {/* Strobe flash behind text for MEGA+ */}
                            {tierPow >= 4 && (
                                <div style={{
                                    position: 'absolute', inset: 0, zIndex: 34, pointerEvents: 'none',
                                    background: `radial-gradient(ellipse at 50% 35%, ${beamColor}30 0%, transparent 50%)`,
                                    animation: `pachi-strobe ${tierPow >= 5 ? '0.3' : '0.5'}s ease-in-out infinite`,
                                }} />
                            )}
                        </>)}

                        {/* ── LAYER 9: TIER RESULT with zoom lines ── */}
                        {isResult && cardSlotTier && cardSlotTier !== 'MISS' && (<>
                            <div style={{
                                position: 'absolute', top: '30%', left: '50%',
                                transform: 'translate(-50%, -50%)', zIndex: 36, pointerEvents: 'none',
                                fontSize: tierPow >= 5 ? '36px' : tierPow >= 4 ? '28px' : tierPow >= 3 ? '22px' : '16px',
                                fontWeight: '900', color: tc,
                                textShadow: `0 0 ${tierPow * 8}px ${tc}, 0 0 ${tierPow * 16}px ${tc}80, 0 4px 12px rgba(0,0,0,0.9)`,
                                letterSpacing: tierPow >= 4 ? '10px' : '5px',
                                animation: 'pachi-slam 500ms ease-out',
                            }}>
                                {TIER_JA[cardSlotTier] || cardSlotTier}{tierPow >= 5 ? ' !!!' : tierPow >= 4 ? ' !!' : ' !'}
                            </div>
                            {/* Radial zoom lines behind result */}
                            {tierPow >= 3 && (
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 34, pointerEvents: 'none' }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                    {Array.from({ length: tierPow >= 5 ? 16 : 10 }, (_, i) => {
                                        const a = (i / (tierPow >= 5 ? 16 : 10)) * Math.PI * 2;
                                        return <line key={i} x1="100" y1="60" x2={100 + Math.cos(a) * 150} y2={60 + Math.sin(a) * 100}
                                            stroke={tc} strokeWidth={tierPow >= 5 ? '2.5' : '1.5'} opacity="0.5">
                                            <animate attributeName="opacity" from="0.8" to="0" dur="0.6s" fill="freeze" />
                                        </line>;
                                    })}
                                </svg>
                            )}
                        </>)}

                        {/* ── LAYER 10: ATTACK EXPLOSION — element burst + lightning ── */}
                        {isAttack && (<>
                            {/* Central explosion */}
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: 35, pointerEvents: 'none',
                                background: tierPow >= 5
                                    ? `radial-gradient(circle at 50% 50%, #ffffffCC 0%, ${tc}AA 15%, ${tc}50 35%, transparent 55%)`
                                    : tierPow >= 4
                                    ? `radial-gradient(circle at 50% 50%, ${ec}BB 0%, ${ec}50 25%, transparent 50%)`
                                    : tierPow >= 3
                                    ? `radial-gradient(circle at 50% 50%, ${ec}80 0%, transparent 45%)`
                                    : `radial-gradient(circle at 50% 50%, ${ec}50 0%, transparent 35%)`,
                                animation: `dq-spell-burst ${tierPow >= 5 ? '800' : '500'}ms ease-out forwards`,
                            }} />
                            {/* Lightning forks for MEGA+ */}
                            {tierPow >= 4 && (
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 36, pointerEvents: 'none' }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                    <path d="M100,0 L95,25 L110,35 L90,55 L105,65 L85,90 L95,120" stroke={tierPow >= 5 ? '#fff' : ec} strokeWidth="3" fill="none">
                                        <animate attributeName="opacity" values="0;1;0.2;0.9;0" dur="0.3s" fill="freeze" />
                                    </path>
                                    <path d="M60,0 L70,30 L55,50 L75,70 L60,120" stroke={beamColor} strokeWidth="2" fill="none">
                                        <animate attributeName="opacity" values="0;0.8;0;0.6;0" dur="0.4s" begin="0.1s" fill="freeze" />
                                    </path>
                                    {tierPow >= 5 && (
                                        <path d="M140,0 L130,25 L150,45 L125,65 L145,85 L135,120" stroke="#FDE68A" strokeWidth="2.5" fill="none">
                                            <animate attributeName="opacity" values="0;0.7;0.1;0.8;0" dur="0.35s" begin="0.05s" fill="freeze" />
                                        </path>
                                    )}
                                </svg>
                            )}
                            {/* X-slash for SUPER+ */}
                            {tierPow >= 3 && tierPow < 4 && (
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 35, pointerEvents: 'none' }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                    <line x1="20" y1="0" x2="180" y2="120" stroke={ec} strokeWidth="3" opacity="0.8">
                                        <animate attributeName="opacity" from="1" to="0" dur="0.4s" fill="freeze" />
                                    </line>
                                    <line x1="180" y1="0" x2="20" y2="120" stroke={ec} strokeWidth="3" opacity="0.8">
                                        <animate attributeName="opacity" from="1" to="0" dur="0.4s" begin="0.05s" fill="freeze" />
                                    </line>
                                </svg>
                            )}
                        </>)}

                        {/* ── LAYER 11: IMPACT — screen slam + damage + cracks ── */}
                        {isImpact && (
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: 37, pointerEvents: 'none',
                                animation: tierPow >= 3 ? `pachi-slam ${tierPow >= 5 ? '600' : '400'}ms ease-out` : undefined,
                            }}>
                                {/* White/gold flash */}
                                {tierPow >= 3 && (
                                    <div style={{
                                        position: 'absolute', inset: 0,
                                        background: tierPow >= 5 ? `${tc}60` : `${beamColor}30`,
                                        animation: 'pachi-flash 400ms ease-out forwards',
                                    }} />
                                )}
                                {/* Damage number */}
                                {cardSlotDmg !== null && (
                                    <div style={{
                                        position: 'absolute', top: tierPow >= 5 ? '28%' : '36%', left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontSize: tierPow >= 6 ? '56px' : tierPow >= 5 ? '46px' : tierPow >= 4 ? '36px' : tierPow >= 3 ? '28px' : tierPow >= 2 ? '20px' : '14px',
                                        fontWeight: '900',
                                        color: tierPow >= 5 ? '#fff' : tc,
                                        textShadow: tierPow >= 5
                                            ? `0 0 24px ${tc}, 0 0 48px ${tc}, 0 0 72px ${tc}80, 0 4px 16px rgba(0,0,0,0.9)`
                                            : tierPow >= 3
                                            ? `0 0 16px ${tc}, 0 0 32px ${tc}80, 0 3px 10px rgba(0,0,0,0.9)`
                                            : `0 0 8px ${tc}80, 0 2px 6px rgba(0,0,0,0.7)`,
                                        animation: 'dq-combo-bounce 300ms ease-out',
                                        fontFamily: tierPow >= 4 ? 'serif' : undefined,
                                        letterSpacing: tierPow >= 4 ? '6px' : '2px',
                                        WebkitTextStroke: tierPow >= 5 ? `1px ${tc}` : undefined,
                                    }}>
                                        {cardSlotDmg.toLocaleString()}
                                    </div>
                                )}
                                {/* Tier label under damage */}
                                {tierPow >= 3 && (
                                    <div style={{
                                        position: 'absolute', top: tierPow >= 5 ? '55%' : '58%', left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontSize: tierPow >= 5 ? '18px' : tierPow >= 4 ? '14px' : '11px',
                                        fontWeight: '900', color: tc, letterSpacing: '4px',
                                        textShadow: `0 0 16px ${tc}, 0 2px 6px rgba(0,0,0,0.9)`,
                                    }}>
                                        {TIER_JA[cardSlotTier] || ''}{tierPow >= 5 ? ' !!!' : tierPow >= 4 ? ' !!' : ' !'}
                                    </div>
                                )}
                                {/* Screen cracks */}
                                {tierPow >= 4 && (
                                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 38 }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                        <path d="M100,0 L97,18 L82,36 L76,52 L84,70 L70,90 L58,120" stroke="#fff" strokeWidth="2.5" fill="none">
                                            <animate attributeName="opacity" from="1" to="0.1" dur="1.5s" fill="freeze" />
                                        </path>
                                        <path d="M100,0 L104,16 L118,32 L128,52 L116,74 L132,96 L142,120" stroke="#fff" strokeWidth="2" fill="none">
                                            <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" fill="freeze" />
                                        </path>
                                        {tierPow >= 5 && <>
                                            <path d="M0,60 L28,54 L52,46 L76,52 L100,58" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.5" />
                                            <path d="M200,60 L172,66 L148,74 L124,52 L100,58" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.5" />
                                        </>}
                                    </svg>
                                )}
                            </div>
                        )}

                        {/* 確変 badge */}
                        {kakuhenBoost > 0 && (
                            <div style={{
                                position: 'absolute', top: '3px', right: '8px', zIndex: 40, pointerEvents: 'none',
                                fontSize: '8px', fontWeight: '800', color: '#D4AF37',
                                background: 'rgba(8,8,12,0.8)', backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(212,175,55,0.3)',
                                borderRadius: '4px', padding: '1px 6px', letterSpacing: '1px',
                                boxShadow: '0 0 12px rgba(212,175,55,0.2)',
                                animation: 'chain-hud-accent-shimmer 2s ease-in-out infinite',
                            }}>確変 x{kakuhenBoost}</div>
                        )}
                        {cardSlotKakuhenFlash && (
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: 39, pointerEvents: 'none',
                                background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(220,38,38,0.1) 50%, transparent 70%)',
                                animation: 'kakuhen-flash 300ms ease-out forwards',
                            }} />
                        )}
                    </>);
                }

                // === FULL MODE: original full-screen overlay effects ===
                const reelSize = tierPow >= 5 ? 72 : tierPow >= 4 ? 64 : tierPow >= 3 ? 56 : tierPow >= 2 ? 48 : 40;
                const reelFont = tierPow >= 5 ? 44 : tierPow >= 4 ? 38 : tierPow >= 3 ? 32 : tierPow >= 2 ? 26 : 22;
                const overlayOpacity = tierPow >= 5 ? 0.75 : tierPow >= 4 ? 0.65 : tierPow >= 3 ? 0.5 : tierPow >= 2 ? 0.4 : 0.25;
                const overlayBg = tierPow >= 5
                    ? `radial-gradient(circle at 50% 50%, ${tc}40 0%, rgba(0,0,0,${overlayOpacity}) 70%)`
                    : tierPow >= 4
                    ? `radial-gradient(circle at 50% 50%, ${ec}30 0%, rgba(0,0,0,${overlayOpacity}) 70%)`
                    : `rgba(0,0,0,${overlayOpacity})`;

                const canSkip = tierPow <= 2 && (isSpinning || cardSlotPhase === 'stop1' || cardSlotPhase === 'stop2' || isReaching);
                return (<>
                    {/* Overlay */}
                    <div onClick={canSkip ? skipCardSlot : undefined} style={{
                        position: 'absolute', inset: 0, zIndex: 30, pointerEvents: canSkip ? 'auto' : 'none',
                        cursor: canSkip ? 'pointer' : undefined,
                        background: (isAttack || isImpact) && tierPow >= 4
                            ? `radial-gradient(circle at 50% 50%, ${tc}60 0%, rgba(0,0,0,0.8) 60%)`
                            : isReaching ? `rgba(0,0,0,${overlayOpacity + 0.15})`
                            : overlayBg,
                        transition: 'background 0.2s ease',
                    }} />

                    {/* REACH */}
                    {isReaching && (<>
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none',
                            background: tierPow >= 5
                                ? `radial-gradient(circle at 50% 50%, ${tc}50 0%, ${tc}25 40%, rgba(0,0,0,0.85) 80%)`
                                : tierPow >= 4
                                ? `radial-gradient(circle at 50% 40%, rgba(239,68,68,0.4) 0%, rgba(0,0,0,0.8) 70%)`
                                : `radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, rgba(0,0,0,0.7) 80%)`,
                            animation: tierPow >= 4 ? 'reach-bg-throb 0.4s ease-in-out infinite' : 'reach-bg-throb 0.8s ease-in-out infinite',
                        }} />
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 31, pointerEvents: 'none',
                            border: `${tierPow >= 5 ? '5px' : tierPow >= 4 ? '4px' : '2px'} solid ${tierPow >= 5 ? tc : tierPow >= 4 ? '#EF4444' : '#D4AF37'}`,
                            boxShadow: tierPow >= 5
                                ? `inset 0 0 60px ${tc}60, 0 0 40px ${tc}50`
                                : tierPow >= 4
                                ? 'inset 0 0 40px rgba(239,68,68,0.5), 0 0 30px rgba(239,68,68,0.4)'
                                : 'inset 0 0 15px rgba(212,175,55,0.2)',
                            animation: `dq-aura-pulse ${tierPow >= 5 ? '0.15' : tierPow >= 4 ? '0.25' : '0.5'}s ease-in-out infinite`,
                        }} />
                        {tierPow >= 3 && Array.from({ length: tierPow >= 5 ? 16 : tierPow >= 4 ? 10 : 5 }, (_, i) => (
                            <div key={`rp-${i}`} style={{
                                position: 'absolute', zIndex: 31, pointerEvents: 'none',
                                top: `${10 + (i * 17 + 7) % 80}%`, left: `${5 + (i * 23 + 11) % 90}%`,
                                width: `${3 + i % 3}px`, height: `${3 + i % 3}px`,
                                background: tierPow >= 5 ? tc : tierPow >= 4 ? '#EF4444' : '#D4AF37',
                                borderRadius: '50%',
                                boxShadow: `0 0 ${4 + tierPow}px ${tierPow >= 5 ? tc : tierPow >= 4 ? '#EF4444' : '#D4AF37'}`,
                                animation: `reach-particle ${0.6 + (i % 4) * 0.3}s ease-in-out ${i * 0.08}s infinite`,
                                opacity: 0.7,
                            }} />
                        ))}
                        {tierPow >= 3 && (
                            <div style={{
                                position: 'absolute', bottom: tierPow >= 4 ? '28%' : '20%', left: '50%',
                                transform: 'translateX(-50%)', zIndex: 32, pointerEvents: 'none',
                                fontSize: tierPow >= 5 ? '20px' : tierPow >= 4 ? '16px' : '12px',
                                fontWeight: '900', letterSpacing: tierPow >= 4 ? '6px' : '3px',
                                color: tierPow >= 5 ? tc : tierPow >= 4 ? '#EF4444' : '#FCD34D',
                                textShadow: tierPow >= 4
                                    ? `0 0 16px ${tierPow >= 5 ? tc : '#EF4444'}, 0 0 32px ${tierPow >= 5 ? tc + '80' : '#EF444480'}`
                                    : '0 0 8px rgba(252,211,77,0.6)',
                                animation: `reach-text-flash ${tierPow >= 4 ? '0.3' : '0.6'}s ease-in-out infinite`,
                            }}>
                                {tierPow >= 6 ? 'MIRACLE!?' : tierPow >= 5 ? 'SUPER CHANCE' : tierPow >= 4 ? 'CHANCE!!' : 'CHANCE'}
                            </div>
                        )}
                    </>)}

                    {/* 確変 badge */}
                    {kakuhenBoost > 0 && (
                        <div style={{
                            position: 'absolute', top: '3px', right: '8px', zIndex: 33, pointerEvents: 'none',
                            fontSize: '8px', fontWeight: '800', color: '#D4AF37',
                            background: 'rgba(8,8,12,0.7)', backdropFilter: 'blur(8px)',
                            border: '1px solid rgba(212,175,55,0.25)',
                            borderRadius: '4px', padding: '1px 6px',
                            letterSpacing: '1px',
                            boxShadow: '0 0 8px rgba(212,175,55,0.15)',
                            animation: 'chain-hud-accent-shimmer 2s ease-in-out infinite',
                        }}>確変 x{kakuhenBoost}</div>
                    )}
                    {cardSlotKakuhenFlash && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 35, pointerEvents: 'none',
                            background: 'radial-gradient(circle, rgba(220,38,38,0.4) 0%, rgba(220,38,38,0.1) 60%, transparent 80%)',
                            animation: 'kakuhen-flash 300ms ease-out forwards',
                        }} />
                    )}
                    {cardSlotPremium && (<>
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 36, pointerEvents: 'none',
                            border: '3px solid transparent',
                            borderImage: 'linear-gradient(135deg, #EF4444, #F59E0B, #10B981, #3B82F6, #8B5CF6, #EC4899, #EF4444) 1',
                            animation: 'premium-border-rotate 1s linear infinite',
                        }} />
                        <div style={{
                            position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)',
                            zIndex: 37, pointerEvents: 'none',
                            fontSize: '10px', fontWeight: '900', letterSpacing: '3px',
                            background: 'linear-gradient(90deg, #EF4444, #F59E0B, #10B981, #3B82F6, #8B5CF6)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                            animation: 'premium-text-shimmer 1.5s linear infinite',
                            backgroundSize: '200% 100%',
                        }}>PREMIUM</div>
                    </>)}

                    {/* Card name */}
                    {tierPow >= 2 && (
                        <div style={{
                            position: 'absolute', top: '5px', left: '50%', transform: 'translateX(-50%)',
                            zIndex: 32, pointerEvents: 'none', textAlign: 'center',
                        }}>
                            <div style={{
                                fontSize: tierPow >= 4 ? '15px' : '12px', fontWeight: '900', color: '#fff',
                                textShadow: `0 0 12px ${ec}, 0 2px 4px rgba(0,0,0,0.9)`,
                                letterSpacing: tierPow >= 4 ? '3px' : '1px',
                            }}>
                                {cardSlotCard.english}
                            </div>
                            {tierPow >= 3 && (
                                <div style={{ fontSize: '9px', color: ec, fontWeight: '700', letterSpacing: '2px' }}>
                                    {ELEM_JA_MAP[cardSlotCard.element] || '?'}属性 BST {cardSlotCard.bstTotal}
                                </div>
                            )}
                        </div>
                    )}

                    {/* SLOT REELS — full mode only */}
                    {slotMode === 'full' && (isSpinning || cardSlotPhase === 'stop1' || cardSlotPhase === 'stop2' || isReaching || cardSlotPhase === 'stop3' || isResult) && (
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: `translate(-50%, -50%)${isReaching ? ` scale(${tierPow >= 4 ? 1.15 : 1.05})` : ''}`,
                            zIndex: 33, display: 'flex', gap: tierPow >= 4 ? '12px' : '8px', pointerEvents: 'none',
                            transition: 'transform 0.3s ease',
                        }}>
                            {cardSlotReels.map((symbolId, ri) => {
                                const sym = SLOT_SYMBOL_MAP[symbolId as SlotSymbolId] || SLOT_SYMBOL_MAP.blank;
                                const stopped = cardSlotPhase === 'stop1' ? ri === 0
                                    : cardSlotPhase === 'stop2' ? ri <= 1
                                    : isReaching ? ri <= 1
                                    : cardSlotPhase === 'stop3' || isResult ? true : false;
                                const reelGlow = isResult && cardSlotTier !== 'MISS';
                                const reachPulse = isReaching && ri === 2;
                                const borderColor = reelGlow ? tc
                                    : reachPulse && tierPow >= 4 ? '#EF4444'
                                    : reachPulse ? '#D4AF37'
                                    : '#D4AF3740';
                                return (
                                    <div key={`csr-${ri}`} style={{
                                        width: `${reelSize}px`, height: `${reelSize * 1.15}px`,
                                        background: reelGlow
                                            ? tierPow >= 5 ? `linear-gradient(180deg, ${tc}70, ${tc}30)` : `linear-gradient(180deg, ${tc}40, ${tc}15)`
                                            : 'rgba(0,0,20,0.95)',
                                        border: `${tierPow >= 4 ? '3px' : '2px'} solid ${borderColor}`,
                                        borderRadius: tierPow >= 4 ? '12px' : '8px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: reelGlow
                                            ? `0 0 ${tierPow * 6}px ${tc}90, 0 0 ${tierPow * 12}px ${tc}40, inset 0 0 ${tierPow * 4}px ${tc}50`
                                            : reachPulse ? `0 0 ${tierPow * 5}px ${borderColor}80` : '0 0 6px rgba(0,0,0,0.5)',
                                        transition: 'all 0.15s ease',
                                        animation: reachPulse ? `dq-aura-pulse ${tierPow >= 4 ? '0.2' : '0.3'}s ease-in-out infinite` : undefined,
                                    }}>
                                        {!stopped ? (
                                            <div style={{
                                                fontSize: `${reelFont * 0.85}px`, fontWeight: '900', color: '#D4AF3780',
                                                animation: 'slot-symbol-flash 0.06s steps(1) infinite',
                                            }}>?</div>
                                        ) : (
                                            <div style={{
                                                fontSize: `${(sym.scale || 0.75) * reelFont}px`,
                                                fontWeight: '900', color: sym.color,
                                                textShadow: `0 0 ${tierPow * 4}px ${sym.glow}, 0 0 ${tierPow * 8}px ${sym.glow}`,
                                                animation: 'dq-combo-bounce 250ms ease-out',
                                            }}>
                                                {sym.label}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            {isReaching && (
                                <div style={{
                                    position: 'absolute', top: `${-reelSize * 0.5}px`, left: '50%', transform: 'translateX(-50%)',
                                    fontSize: tierPow >= 4 ? '26px' : tierPow >= 3 ? '18px' : '14px',
                                    fontWeight: '900',
                                    color: tierPow >= 4 ? '#EF4444' : '#D4AF37',
                                    textShadow: tierPow >= 4
                                        ? '0 0 24px rgba(239,68,68,1), 0 0 48px rgba(239,68,68,0.7)'
                                        : '0 0 12px rgba(212,175,55,0.8)',
                                    letterSpacing: tierPow >= 4 ? '10px' : '4px',
                                    animation: `dq-aura-pulse ${tierPow >= 4 ? '0.2' : '0.4'}s ease-in-out infinite`,
                                }}>{tierPow >= 4 ? 'REACH!!' : 'REACH'}</div>
                            )}
                            {isResult && cardSlotTier && cardSlotTier !== 'MISS' && (
                                <div style={{
                                    position: 'absolute', top: `${-reelSize * 0.55}px`, left: '50%', transform: 'translateX(-50%)',
                                    fontSize: tierPow >= 5 ? '30px' : tierPow >= 4 ? '24px' : tierPow >= 3 ? '18px' : '14px',
                                    fontWeight: '900', color: tc,
                                    textShadow: `0 0 ${tierPow * 5}px ${tc}, 0 0 ${tierPow * 10}px ${tc}80`,
                                    letterSpacing: tierPow >= 4 ? '6px' : '3px', whiteSpace: 'nowrap',
                                    animation: 'dq-text-appear 200ms ease-out',
                                }}>
                                    {TIER_JA[cardSlotTier] || cardSlotTier}
                                    {tierPow >= 5 ? ' !!!' : tierPow >= 4 ? ' !!' : tierPow >= 3 ? ' !' : ''}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ATTACK + IMPACT */}
                    {(isAttack || isImpact) && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 34, pointerEvents: 'none',
                            overflow: 'hidden',
                            animation: isImpact && tierPow >= 3 ? `dq-screen-shake ${tierPow >= 5 ? '500' : '300'}ms ease-out` : undefined,
                        }}>
                            {isAttack && tierPow <= 1 && (
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: `radial-gradient(circle at 50% 60%, ${ec}30 0%, transparent 50%)`,
                                    animation: 'dq-spell-burst 300ms ease-out forwards',
                                }} />
                            )}
                            {isAttack && tierPow === 2 && (
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: `linear-gradient(180deg, transparent 20%, ${ec}25 50%, transparent 80%)`,
                                    animation: 'dq-spell-burst 400ms ease-out forwards',
                                }} />
                            )}
                            {isAttack && tierPow === 3 && (<>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: `radial-gradient(circle at 50% 50%, ${ec}50 0%, ${ec}20 40%, transparent 70%)`,
                                    animation: 'dq-spell-burst 500ms ease-out forwards',
                                }} />
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                    <line x1="20" y1="0" x2="180" y2="120" stroke={ec} strokeWidth="2.5" opacity="0.8">
                                        <animate attributeName="opacity" from="1" to="0" dur="0.4s" fill="freeze" />
                                    </line>
                                    <line x1="180" y1="0" x2="20" y2="120" stroke={ec} strokeWidth="2.5" opacity="0.8">
                                        <animate attributeName="opacity" from="1" to="0" dur="0.4s" begin="0.05s" fill="freeze" />
                                    </line>
                                </svg>
                            </>)}
                            {isAttack && tierPow === 4 && (<>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: `radial-gradient(circle at 50% 50%, ${ec}80 0%, ${ec}40 30%, transparent 70%)`,
                                    animation: 'dq-spell-burst 600ms ease-out forwards',
                                }} />
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                    {[[20,0,180,120],[180,0,20,120],[100,0,100,120],[0,60,200,60]].map(([x1,y1,x2,y2], i) => (
                                        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i < 2 ? ec : '#fff'} strokeWidth={i < 2 ? '3' : '2'} opacity="0.8">
                                            <animate attributeName="opacity" from="1" to="0" dur="0.5s" begin={`${i*0.04}s`} fill="freeze" />
                                        </line>
                                    ))}
                                </svg>
                            </>)}
                            {isAttack && tierPow === 5 && (<>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'radial-gradient(circle at 50% 50%, #D4AF37CC 0%, #D4AF3760 40%, #8B691430 70%, transparent 90%)',
                                    animation: 'dq-spell-burst 700ms ease-out forwards',
                                }} />
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                    {Array.from({length: 8}, (_, i) => {
                                        const a = (i / 8) * Math.PI * 2;
                                        return <line key={i} x1="100" y1="60" x2={100 + Math.cos(a) * 120} y2={60 + Math.sin(a) * 80}
                                            stroke="#D4AF37" strokeWidth="2" opacity="0.6">
                                            <animate attributeName="opacity" from="0.8" to="0" dur="0.6s" begin={`${i*0.03}s`} fill="freeze" />
                                        </line>;
                                    })}
                                </svg>
                            </>)}
                            {isAttack && tierPow >= 6 && (<>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'radial-gradient(circle at 50% 50%, #EC4899EE 0%, #EC489980 30%, #EC489940 60%, transparent 90%)',
                                    animation: 'dq-spell-burst 800ms ease-out forwards',
                                }} />
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: '#fff', animation: 'dq-whiteout 200ms ease-out forwards',
                                }} />
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                    {Array.from({length: 12}, (_, i) => {
                                        const a = (i / 12) * Math.PI * 2;
                                        return <line key={i} x1="100" y1="60" x2={100 + Math.cos(a) * 140} y2={60 + Math.sin(a) * 100}
                                            stroke="#EC4899" strokeWidth="2.5" opacity="0.7">
                                            <animate attributeName="opacity" from="1" to="0" dur="0.8s" begin={`${i*0.02}s`} fill="freeze" />
                                        </line>;
                                    })}
                                </svg>
                            </>)}

                            {isImpact && cardSlotDmg !== null && (
                                <div style={{
                                    position: 'absolute', top: tierPow >= 5 ? '28%' : '35%', left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: tierPow >= 6 ? '52px' : tierPow >= 5 ? '44px' : tierPow >= 4 ? '36px' : tierPow >= 3 ? '26px' : tierPow >= 2 ? '20px' : '14px',
                                    fontWeight: '900',
                                    color: tierPow >= 5 ? '#fff' : tierPow >= 4 ? tc : tierPow >= 2 ? tc : '#A8A29E',
                                    textShadow: tierPow >= 5
                                        ? `0 0 24px ${tc}, 0 0 48px ${tc}, 0 0 72px ${tc}80, 0 4px 16px rgba(0,0,0,0.9)`
                                        : tierPow >= 4
                                        ? `0 0 16px ${tc}, 0 0 32px ${tc}80, 0 3px 10px rgba(0,0,0,0.9)`
                                        : tierPow >= 2
                                        ? `0 0 8px ${tc}80, 0 2px 6px rgba(0,0,0,0.8)`
                                        : '0 1px 3px rgba(0,0,0,0.5)',
                                    animation: 'dq-text-appear 300ms ease-out',
                                    fontFamily: tierPow >= 4 ? 'serif' : undefined,
                                    letterSpacing: tierPow >= 4 ? '4px' : '1px',
                                    WebkitTextStroke: tierPow >= 5 ? `1px ${tc}` : undefined,
                                }}>
                                    {cardSlotDmg.toLocaleString()}
                                </div>
                            )}
                            {isImpact && tierPow >= 3 && (
                                <div style={{
                                    position: 'absolute', top: tierPow >= 5 ? '55%' : '55%', left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: tierPow >= 5 ? '18px' : tierPow >= 4 ? '14px' : '11px',
                                    fontWeight: '900', color: tc, letterSpacing: '4px', whiteSpace: 'nowrap',
                                    textShadow: `0 0 12px ${tc}90`,
                                }}>
                                    {TIER_JA[cardSlotTier] || ''}{tierPow >= 5 ? ' !!!' : tierPow >= 4 ? ' !!' : ' !'}
                                </div>
                            )}
                            {isImpact && tierPow >= 4 && (
                                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 36 }} viewBox="0 0 200 120" preserveAspectRatio="none">
                                    <path d="M100,0 L97,20 L85,38 L78,55 L83,72 L72,90 L60,120" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.8">
                                        <animate attributeName="opacity" from="1" to="0.2" dur="1.5s" fill="freeze" />
                                    </path>
                                    <path d="M100,0 L103,18 L115,35 L125,55 L118,75 L130,95 L140,120" stroke="#fff" strokeWidth="2" fill="none" opacity="0.6">
                                        <animate attributeName="opacity" from="0.8" to="0.1" dur="1.5s" fill="freeze" />
                                    </path>
                                    {tierPow >= 5 && <>
                                        <path d="M0,60 L30,55 L55,48 L78,55 L100,60" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
                                        <path d="M200,60 L170,65 L145,72 L122,55 L100,60" stroke="#fff" strokeWidth="2" fill="none" opacity="0.5" />
                                        <path d="M0,30 L40,25 L70,35 L100,28" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.3" />
                                        <path d="M200,90 L160,95 L130,85 L100,92" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.3" />
                                    </>}
                                </svg>
                            )}
                            {isImpact && tierPow === 5 && (
                                <div style={{
                                    position: 'absolute', inset: 0, background: '#D4AF37',
                                    animation: 'dq-whiteout 500ms ease-out forwards',
                                }} />
                            )}
                            {isImpact && tierPow >= 6 && (<>
                                <div style={{
                                    position: 'absolute', inset: 0, background: '#EC4899',
                                    animation: 'dq-whiteout 300ms ease-out forwards',
                                }} />
                                <div style={{
                                    position: 'absolute', inset: 0, background: '#fff',
                                    animation: 'dq-whiteout 600ms ease-out forwards',
                                    animationDelay: '150ms',
                                }} />
                            </>)}
                        </div>
                    )}
                </>);
            })()}

            {/* Old PROGRESS/SCORE/BADGE removed — replaced by slot machine STATUS BAR and INFO BAR above */}

            {/* Goal setting popover */}
            {/* === GRID COMPLETE SPECIAL GACHA — BUTTON-TRIGGERED, ULTRA-LUXURIOUS === */}
            {gridCompletePhase !== 'idle' && (() => {
                const gc = pendingGachaGrade || 'D';
                const gcColor: Record<string, string> = { S: '#D4AF37', A: '#EF4444', B: '#3B82F6', C: '#10B981', D: '#78716C' };
                const gCol = gcColor[gc] || '#78716C';
                const isS = gc === 'S';
                const isAPlus = gc === 'S' || gc === 'A';
                return (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 50,
                    pointerEvents: gridCompletePhase === 'ready' ? 'auto' : 'none',
                    overflow: 'hidden',
                }}>
                    {/* Phase 0: READY — waiting for button press */}
                    {gridCompletePhase === 'ready' && (<>
                        {/* Subtle pulsing background */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `radial-gradient(circle at 50% 50%, ${gCol}25 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 100%)`,
                            animation: 'dq-aura-pulse 1.5s ease-in-out infinite',
                        }} />
                        {/* Gold border shimmer */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            border: `3px solid ${gCol}60`,
                            boxShadow: `inset 0 0 40px ${gCol}15, 0 0 20px ${gCol}10`,
                            animation: 'dq-aura-pulse 2s ease-in-out infinite',
                        }} />
                        {/* GRID COMPLETE label */}
                        <div style={{
                            position: 'absolute', top: '20%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '14px', fontWeight: '900', letterSpacing: '6px',
                            color: '#FDE68A',
                            textShadow: `0 0 20px ${gCol}, 0 0 40px ${gCol}60`,
                            animation: 'dq-text-appear 500ms ease-out',
                        }}>
                            GRID COMPLETE
                        </div>
                        {/* Grade preview */}
                        <div style={{
                            position: 'absolute', top: '38%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '48px', fontWeight: '900', lineHeight: 1,
                            color: gCol,
                            textShadow: `0 0 30px ${gCol}, 0 0 60px ${gCol}60`,
                            opacity: 0.6,
                        }}>
                            {gc}
                        </div>
                        {/* GACHA BUTTON — only show if NOT delegating to slot panel */}
                        {!onSpecialSlotTrigger && (
                        <button
                            onClick={fireSpecialGacha}
                            style={{
                                position: 'absolute', top: '65%', left: '50%',
                                transform: 'translate(-50%, -50%)',
                                background: isS
                                    ? 'linear-gradient(180deg, #D4AF37 0%, #B8960A 40%, #8B6914 70%, #D4AF37 100%)'
                                    : isAPlus
                                    ? `linear-gradient(180deg, ${gCol} 0%, ${gCol}CC 50%, ${gCol} 100%)`
                                    : `linear-gradient(180deg, ${gCol}CC 0%, ${gCol}99 50%, ${gCol}CC 100%)`,
                                border: isS ? '3px solid #FDE68A' : `2px solid ${gCol}`,
                                borderRadius: '16px',
                                padding: isS ? '16px 48px' : '12px 36px',
                                cursor: 'pointer',
                                fontSize: isS ? '18px' : '14px',
                                fontWeight: '900',
                                color: '#fff',
                                letterSpacing: isS ? '6px' : '4px',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                                boxShadow: isS
                                    ? '0 0 30px #D4AF37, 0 0 60px #D4AF3760, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 #FDE68A80'
                                    : `0 0 20px ${gCol}60, 0 4px 16px rgba(0,0,0,0.4)`,
                                animation: isS ? 'dq-aura-pulse 0.8s ease-in-out infinite' : 'dq-aura-pulse 1.2s ease-in-out infinite',
                                transition: 'transform 0.15s ease',
                                zIndex: 55,
                            }}
                            onMouseDown={(e) => { (e.target as HTMLElement).style.transform = 'translate(-50%, -50%) scale(0.95)'; }}
                            onMouseUp={(e) => { (e.target as HTMLElement).style.transform = 'translate(-50%, -50%) scale(1)'; }}
                        >
                            {isS ? 'SPECIAL GACHA' : isAPlus ? 'BONUS GACHA' : 'GACHA'}
                        </button>
                        )}
                        {/* Floating particles for S grade */}
                        {isS && Array.from({ length: 8 }, (_, i) => (
                            <div key={`rdy-${i}`} style={{
                                position: 'absolute',
                                top: `${20 + (i * 19) % 60}%`, left: `${10 + (i * 23) % 80}%`,
                                width: '3px', height: '3px', borderRadius: '50%',
                                background: ['#D4AF37', '#FDE68A', '#A855F7', '#EC4899'][i % 4],
                                boxShadow: `0 0 6px ${['#D4AF37', '#FDE68A', '#A855F7', '#EC4899'][i % 4]}`,
                                animation: `reach-particle ${1 + (i % 3) * 0.4}s ease-in-out ${i * 0.15}s infinite`,
                                opacity: 0.5,
                            }} />
                        ))}
                    </>)}

                    {/* Phase 1: FLASH — white→gold explosion + radiating beams */}
                    {gridCompletePhase === 'flash' && (<>
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.98) 0%, ${gCol}CC 20%, ${gCol}60 45%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.9) 100%)`,
                            animation: 'dq-spell-burst 1200ms ease-out forwards',
                        }} />
                        {/* Radiating light beams — thick, cinematic */}
                        {Array.from({ length: isS ? 24 : 16 }, (_, i) => (
                            <div key={`beam-${i}`} style={{
                                position: 'absolute', top: '50%', left: '50%',
                                width: isS ? '4px' : '2px', height: '300%',
                                background: `linear-gradient(180deg, transparent 0%, ${i % 3 === 0 ? '#fff' : i % 3 === 1 ? gCol : '#FDE68A'} 25%, ${gCol} 50%, ${i % 3 === 0 ? '#fff' : gCol} 75%, transparent 100%)`,
                                transformOrigin: '50% 0%',
                                transform: `rotate(${i * (360 / (isS ? 24 : 16))}deg)`,
                                opacity: isS ? 0.8 : 0.5,
                                animation: `dq-aura-pulse ${isS ? '0.1' : '0.2'}s ease-in-out infinite`,
                                animationDelay: `${i * 0.015}s`,
                            }} />
                        ))}
                        {/* Explosion particles — more and bigger for high grades */}
                        {Array.from({ length: isS ? 36 : isAPlus ? 24 : 16 }, (_, i) => {
                            const angle = (i / (isS ? 36 : isAPlus ? 24 : 16)) * Math.PI * 2;
                            const dist = 20 + (i % 6) * 12;
                            const colors = isS
                                ? ['#D4AF37', '#FDE68A', '#fff', '#A855F7', '#EC4899', '#EF4444']
                                : ['#D4AF37', '#FDE68A', gCol, '#fff'];
                            return (
                                <div key={`exp-${i}`} style={{
                                    position: 'absolute',
                                    top: `calc(50% + ${Math.sin(angle) * dist}px)`,
                                    left: `calc(50% + ${Math.cos(angle) * dist}px)`,
                                    width: `${isS ? 5 + i % 4 : 3 + i % 3}px`, height: `${isS ? 5 + i % 4 : 3 + i % 3}px`,
                                    borderRadius: '50%',
                                    background: colors[i % colors.length],
                                    boxShadow: `0 0 ${isS ? 10 : 6}px ${colors[i % colors.length]}`,
                                    animation: `reach-particle ${0.4 + (i % 4) * 0.2}s ease-out ${i * 0.02}s forwards`,
                                }} />
                            );
                        })}
                        {/* SPECIAL GACHA text — metallic gold */}
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: isS ? '24px' : '20px', fontWeight: '900', letterSpacing: isS ? '10px' : '6px',
                            color: '#fff',
                            textShadow: `0 0 30px ${gCol}, 0 0 60px ${gCol}, 0 0 90px ${gCol}80, 0 4px 8px rgba(0,0,0,0.9)`,
                            animation: 'dq-combo-bounce 500ms ease-out',
                        }}>
                            {isS ? 'SPECIAL GACHA' : isAPlus ? 'BONUS GACHA' : 'GACHA'}
                        </div>
                    </>)}

                    {/* Phase 2: GRADE — dramatic reveal with cascading effects */}
                    {gridCompletePhase === 'grade' && (<>
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `radial-gradient(circle at 50% 50%, ${gCol}70 0%, ${gCol}30 35%, rgba(0,0,0,0.9) 75%)`,
                        }} />
                        {/* Multi-layer pulsing border */}
                        <div style={{
                            position: 'absolute', inset: 0,
                            border: `${isS ? '6px' : '4px'} solid ${gCol}`,
                            boxShadow: `inset 0 0 ${isS ? 80 : 40}px ${gCol}50, 0 0 ${isS ? 60 : 30}px ${gCol}40`,
                            animation: `dq-aura-pulse ${isS ? '0.15' : '0.25'}s ease-in-out infinite`,
                        }} />
                        {isS && (
                            <div style={{
                                position: 'absolute', inset: '6px',
                                border: '2px solid #FDE68A60',
                                boxShadow: 'inset 0 0 30px #FDE68A20',
                                animation: 'dq-aura-pulse 0.2s ease-in-out infinite',
                                animationDelay: '0.1s',
                            }} />
                        )}
                        {/* Particles — gold rain for S, scattered for others */}
                        {Array.from({ length: isS ? 30 : isAPlus ? 16 : 8 }, (_, i) => (
                            <div key={`sg-${i}`} style={{
                                position: 'absolute',
                                top: `${3 + (i * 13) % 94}%`, left: `${2 + (i * 17) % 96}%`,
                                width: `${isS ? 4 + i % 3 : 3 + i % 2}px`,
                                height: `${isS ? 4 + i % 3 : 3 + i % 2}px`,
                                borderRadius: '50%',
                                background: isS
                                    ? ['#D4AF37', '#FDE68A', '#A855F7', '#EC4899', '#fff'][i % 5]
                                    : [gCol, '#FDE68A', '#fff'][i % 3],
                                boxShadow: `0 0 ${isS ? 10 : 6}px ${isS ? ['#D4AF37', '#FDE68A', '#A855F7', '#EC4899', '#fff'][i % 5] : gCol}`,
                                animation: `reach-particle ${0.6 + (i % 5) * 0.3}s ease-in-out ${i * 0.06}s infinite`,
                            }} />
                        ))}
                        {/* Grade letter — massive, metallic */}
                        <div style={{
                            position: 'absolute', top: '35%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: isS ? '100px' : '80px', fontWeight: '900', lineHeight: 1,
                            color: gCol,
                            textShadow: isS
                                ? `0 0 40px ${gCol}, 0 0 80px ${gCol}, 0 0 120px ${gCol}60, 0 6px 16px rgba(0,0,0,0.9)`
                                : `0 0 30px ${gCol}, 0 0 60px ${gCol}80, 0 4px 12px rgba(0,0,0,0.9)`,
                            WebkitTextStroke: isS ? `2px ${gCol}` : undefined,
                            animation: 'dq-combo-bounce 600ms ease-out',
                        }}>
                            {gc}
                        </div>
                        {/* Label */}
                        <div style={{
                            position: 'absolute', top: '70%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: isS ? '18px' : '14px', fontWeight: '800', letterSpacing: isS ? '8px' : '5px',
                            color: '#fff',
                            textShadow: `0 0 16px ${gCol}80, 0 2px 4px rgba(0,0,0,0.8)`,
                        }}>
                            {isS ? 'GOD GRADE' : isAPlus ? 'GREAT GRADE' : 'GRADE'}
                        </div>
                    </>)}

                    {/* Phase 3: REWARD — GP earned, cinematic */}
                    {gridCompletePhase === 'reward' && (<>
                        <div style={{
                            position: 'absolute', inset: 0,
                            background: `radial-gradient(circle, ${gCol}40 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.9) 100%)`,
                        }} />
                        {/* Falling gold particles */}
                        {Array.from({ length: 12 }, (_, i) => (
                            <div key={`rw-${i}`} style={{
                                position: 'absolute',
                                top: `${(i * 17) % 80}%`, left: `${5 + (i * 23) % 90}%`,
                                width: '3px', height: '3px', borderRadius: '50%',
                                background: '#D4AF37',
                                boxShadow: '0 0 6px #D4AF37',
                                animation: `reach-particle ${0.8 + (i % 3) * 0.3}s ease-in-out ${i * 0.1}s infinite`,
                                opacity: 0.6,
                            }} />
                        ))}
                        <div style={{
                            position: 'absolute', top: '35%', left: '50%',
                            transform: 'translate(-50%, -50%)', textAlign: 'center',
                        }}>
                            <div style={{
                                fontSize: isS ? '64px' : '48px', fontWeight: '900', fontFamily: 'serif',
                                color: '#D4AF37',
                                textShadow: '0 0 30px #D4AF37, 0 0 60px #D4AF3780, 0 0 90px #D4AF3740, 0 4px 8px rgba(0,0,0,0.8)',
                                animation: 'dq-combo-bounce 400ms ease-out',
                                letterSpacing: '4px',
                            }}>
                                +{gridCompleteReward}
                            </div>
                            <div style={{
                                fontSize: isS ? '16px' : '13px', fontWeight: '700', color: '#FDE68A',
                                letterSpacing: isS ? '6px' : '4px', marginTop: '8px',
                                textShadow: '0 0 12px #D4AF3780',
                            }}>
                                BONUS GP
                            </div>
                        </div>
                    </>)}
                </div>
                );
            })()}

            {showGoalSetting && (
                <div style={{
                    position: 'absolute', top: '30px', right: '10px', zIndex: 50,
                    background: '#fff', borderRadius: '8px', padding: '10px 12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)', border: '1px solid #E5E5E5',
                    display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '160px',
                }}>
                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#57534E', letterSpacing: '0.5px' }}>
                        DAILY GOAL (XP)
                    </div>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <input
                            type="number" min={100} max={5000} step={50}
                            value={goalInput}
                            onChange={e => setGoalInput(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    const v = Math.max(100, Math.min(5000, parseInt(goalInput) || DEFAULT_GOAL_XP));
                                    onGoalChange(v);
                                    setShowGoalSetting(false);
                                }
                            }}
                            style={{
                                width: '70px', fontSize: '12px', fontWeight: '700',
                                padding: '4px 6px', borderRadius: '4px',
                                border: '1px solid #D6D3D1', textAlign: 'center',
                            }}
                        />
                        <button
                            onClick={() => {
                                const v = Math.max(100, Math.min(5000, parseInt(goalInput) || DEFAULT_GOAL_XP));
                                onGoalChange(v);
                                setShowGoalSetting(false);
                            }}
                            style={{
                                fontSize: '10px', fontWeight: '700', padding: '4px 8px',
                                borderRadius: '4px', border: 'none',
                                background: '#D4AF37', color: '#fff', cursor: 'pointer',
                            }}
                        >
                            SET
                        </button>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {[300, 500, 800, 1310, 2000].map(v => (
                            <button
                                key={v}
                                onClick={() => { onGoalChange(v); setShowGoalSetting(false); }}
                                style={{
                                    fontSize: '9px', fontWeight: '600', padding: '2px 6px',
                                    borderRadius: '3px', border: '1px solid #E5E5E5',
                                    background: goalXP === v ? '#D4AF37' : '#F5F5F4',
                                    color: goalXP === v ? '#fff' : '#57534E',
                                    cursor: 'pointer',
                                }}
                            >
                                {v}
                            </button>
                        ))}
                    </div>
                </div>
            )}


        </div>
    );
}


export interface TrainingInitialData {
    phrases?: Phrase[];
    mastery?: Record<string, number>;
    lastLeveled?: Record<string, string>;
    cardPoints?: Record<string, number>;
    recordings?: Record<string, any>;
    links?: Record<string, PhraseLink[]>;
}

export default function PhrasesPage({ initialData, onHelpClick }: { initialData?: TrainingInitialData; onHelpClick?: () => void }) {
    // Data mode: phrases (default) or words
    const [dataMode, setDataMode] = useState<'phrases' | 'words'>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('training-data-mode') as 'phrases' | 'words') || 'phrases';
        }
        return 'phrases';
    });
    const [phrases, setPhrases] = useState<Phrase[]>(initialData?.phrases || []);
    const [loading, setLoading] = useState(!initialData?.phrases);
    const [phraseMastery, setPhraseMastery] = useState<Record<string, number>>(initialData?.mastery || {});
    const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [clientToday, setClientToday] = useState('');
    useEffect(() => {
        const now = new Date();
        setClientToday(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`);
        setCurrentMonth(now);
    }, []);
    const [isMobile, setIsMobile] = useState(false);
    const [goalXP, setGoalXP] = useState(DEFAULT_GOAL_XP);
    useEffect(() => {
        const saved = localStorage.getItem('runner-goal-xp');
        if (saved) setGoalXP(Math.max(100, Math.min(5000, parseInt(saved) || DEFAULT_GOAL_XP)));
    }, []);
    const handleGoalChange = (xp: number) => {
        setGoalXP(xp);
        localStorage.setItem('runner-goal-xp', String(xp));
    };
    const [viewMode, setViewMode] = useState<'calendar' | 'list' | 'review'>('calendar');
    const [copiedId, setCopiedId] = useState('');

    // Puzzle board — tab inside calendar view, card drop triggered after each review COMPLETE
    const [calendarTab, setCalendarTab] = useState<'calendar' | 'puzzle'>('calendar');
    const [puzzleDropCard, setPuzzleDropCard] = useState<{ phraseId: string; english: string; japanese: string; element: string; rank: string; points: number; bstTotal: number; key: number } | null>(null);
    const [milestoneData, setMilestoneData] = useState<GridMilestoneData | null>(null);

    const [gridInfo, setGridInfo] = useState<{ filled: number; total: number }>({ filled: 0, total: 9 });

    const [lastReviewedWord, setLastReviewedWord] = useState<{ text: string; key: number } | null>(null);
    const [showRunner, setShowRunner] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('training-show-runner');
            return saved !== 'false';
        }
        return true;
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightPhraseId, setHighlightPhraseId] = useState<string | null>(null);
    const [playingPhraseId, setPlayingPhraseId] = useState<string | null>(null);
    const [recordAutoPlayId, setRecordAutoPlayId] = useState<string | null>(null);
    const [recordingStateForCard, setRecordingStateForCard] = useState<'idle' | 'recording' | 'uploading'>('idle');
    const inlineMediaRecorderRef = useRef<MediaRecorder | null>(null);
    const inlinePlaybackAudioRef = useRef<HTMLAudioElement | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [reviewFilter, setReviewFilter] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 'all' | 'random' | 'recorded' | 'linked'>('random');
    const [reviewIndex, setReviewIndex] = useState(0);
    const [reviewHistory, setReviewHistory] = useState<Phrase[]>([]);
    const [historyOffset, setHistoryOffset] = useState(0);
    const [shuffleKey, setShuffleKey] = useState(0);
    const [shuffledToday, setShuffledToday] = useState(false);
    const [pointEffect, setPointEffect] = useState<{
        points: number; color: string; gradFrom: string; gradTo: string;
        levelName: string; key: number;
    } | null>(null);
    const [calendarPulse, setCalendarPulse] = useState<{
        dateKey: string; points: number; gradFrom: string; color: string; level: ChakraLevel; key: number;
    } | null>(null);
    const [voiceRecordings, setVoiceRecordings] = useState<Record<string, VoiceRecording[]>>(initialData?.recordings || {});
    const [phraseLinks, setPhraseLinks] = useState<Record<string, PhraseLink[]>>(initialData?.links || {});
    const [phraseLastLeveled, setPhraseLastLeveled] = useState<Record<string, string>>(initialData?.lastLeveled || {});
    const [cardPoints, setCardPoints] = useState<Record<string, number>>(initialData?.cardPoints || {});

    // Card pool for slot reels (different cards on non-triple)
    const slotCardPool = useMemo(() => {
        if (!phrases.length) return [];
        const shuffled = fisherYates(phrases).slice(0, 30);
        return shuffled.map(p => ({
            phraseId: p.id,
            english: p.english || p.phrase || '',
            japanese: p.japanese || p.meaning || '',
            element: p.category || 'flame',
            rank: 'NORMAL' as const,
            points: cardPoints[p.id] || 0,
            bstTotal: calcBstTotal(p.id),
        }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [phrases]);

    // Special golden slot mode (triggered by grid completion)
    const [specialSlotMode, setSpecialSlotMode] = useState(false);
    const [specialSlotPending, setSpecialSlotPending] = useState(false);

    // Upper screen effect state (pachinko-style always-on effects)
    const [upperEffect, setUpperEffect] = useState<{
        type: 'triple' | 'reach' | 'miss' | 'pair' | 'idle';
        symbol?: string;
        key: number;
    }>({ type: 'idle', key: 0 });
    const [slotPanelState, setSlotPanelState] = useState<string>('NORMAL');

    const handleSlotResult = useCallback((type: 'triple' | 'reach' | 'miss' | 'pair', symbol?: string) => {
        setUpperEffect({ type, symbol, key: Date.now() });
    }, []);

    const handleSlotSpinComplete = useCallback((result: { tier: string; gpEarned: number; card: any }) => {
        setSlotPanelState(result.tier);
    }, []);

    // When BONUS SLOT button is pressed, trigger golden mode on ReviewSlotPanel
    const handleSpecialSlotTrigger = useCallback((grade: string) => {
        setSpecialSlotMode(true);
        setSpecialSlotPending(true);
        setMilestoneData(null); // Clear so button disappears after pressing
        if (phrases.length > 0) {
            const p = phrases[Math.floor(Math.random() * phrases.length)];
            const pts = cardPoints[p.id] || 0;
            setPuzzleDropCard({
                phraseId: p.id,
                english: p.english || p.phrase || '',
                japanese: p.japanese || p.meaning || '',
                element: p.category || 'flame',
                rank: pts >= 250 ? 'LEGENDARY' : pts >= 100 ? 'HOLOGRAPHIC' : pts >= 50 ? 'GOLD' : 'NORMAL',
                points: pts,
                bstTotal: calcBstTotal(p.id),
                key: Date.now(),
            });
        }
    }, [phrases, cardPoints]);

    const handleSpecialSpinDone = useCallback((gpEarned: number) => {
        setSpecialSlotMode(false);
        setSpecialSlotPending(false);
        setPlayerSparks(prev => prev + gpEarned);
    }, []);

    // Cumulative review touches per phrase-date (dateKey → total count from D1)
    const [dateTouchMap, setDateTouchMap] = useState<Record<string, number>>({});

    // Player level state — initialized from Server Component data when available
    const [playerTotalXP, setPlayerTotalXP] = useState(() => initialData?.playerStats?.total_xp || 0);
    const [playerLevel, setPlayerLevel] = useState(() => levelFromXP(initialData?.playerStats?.total_xp || 0));
    const [levelUpEffect, setLevelUpEffect] = useState<{ level: number; title: string; color: string; key: number } | null>(null);

    // Daily level-up effect
    const [dailyLevelUpEffect, setDailyLevelUpEffect] = useState<{ level: number; title: string; color: string; key: number } | null>(null);
    const prevDailyLevelRef = useRef(-1);

    // Gacha bonus system state
    const [playerSparks, setPlayerSparks] = useState(() => initialData?.playerStats?.sparks || 0);
    const [gachaEffect, setGachaEffect] = useState<{
        phase: 'reel' | 'reveal';
        tier: string;
        sparksWon: number;
        phraseId: string | null;
        cardPointsEarned: number;
        cardTotalPoints: number;
        key: number;
    } | null>(null);
    // 3-reel slot machine state
    const [slotReels, setSlotReels] = useState<{
        // Current center symbol for each reel (what's displayed)
        symbols: [SlotSymbolId, SlotSymbolId, SlotSymbolId];
        // Which reels have stopped
        stopped: [boolean, boolean, boolean];
        // Target combo (what the reels should land on)
        target: [SlotSymbolId, SlotSymbolId, SlotSymbolId];
        // Reach mode (2 matching reels)
        reach: boolean;
        // Symbols above/below center for each reel
        above: [SlotSymbolId, SlotSymbolId, SlotSymbolId];
        below: [SlotSymbolId, SlotSymbolId, SlotSymbolId];
    } | null>(null);
    const slotSpinTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
    const pendingGachaRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Deferred score updates — queued during slot animation, flushed after reveal clears
    const deferredScoreUpdates = useRef<Array<() => void>>([]);

    // Quiet points toast (shown when slot animation is OFF)
    const [quietToast, setQuietToast] = useState<{ sparks: number; cardPts: number; tier: string; key: number } | null>(null);
    useEffect(() => {
        if (!quietToast) return;
        const timer = setTimeout(() => setQuietToast(null), 2000);
        return () => clearTimeout(timer);
    }, [quietToast]);

    // 連荘 Chain system state
    const [chainState, setChainState] = useState<{ count: number; mode: ChainMode; key: number }>(() => {
        if (typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem('training-chain-state');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed && typeof parsed.count === 'number' && typeof parsed.mode === 'string') {
                        return { count: parsed.count, mode: parsed.mode as ChainMode, key: 0 };
                    }
                }
            } catch { /* ignore parse errors */ }
        }
        return { count: 0, mode: 'normal', key: 0 };
    });
    useEffect(() => {
        localStorage.setItem('training-chain-state', JSON.stringify({ count: chainState.count, mode: chainState.mode }));
    }, [chainState.count, chainState.mode]);
    const [chainTransition, setChainTransition] = useState<{ from: ChainMode; to: ChainMode; key: number } | null>(null);
    // Keep backward-compat aliases for FEVER visuals
    const feverMode = { active: chainState.mode !== 'normal', streak: chainState.count, key: chainState.key };
    const [feverFlash, setFeverFlash] = useState<'enter' | 'exit' | null>(null);
    const [feverExitEffect, setFeverExitEffect] = useState<{ streak: number } | null>(null);
    const feverDroneRef = useRef<HTMLAudioElement | null>(null);
    const feverRef = useRef({ active: false, streak: 0 });
    // Luck multiplier display
    const [luckMultiplier, setLuckMultiplier] = useState(1.0);
    const [cardRankUpEffect, setCardRankUpEffect] = useState<{ oldRank: string; newRank: string; newRankColor: string; newRankKey: CardRank; oldRankKey: CardRank; snapshotPoints: number; key: number } | null>(null);

    // Card level-up celebration: hold the card on screen before advancing
    const [cardCelebration, setCardCelebration] = useState<{
        phrase: Phrase;
        key: number;
    } | null>(null);

    // Auto-clear fever flash
    useEffect(() => {
        if (!feverFlash) return;
        const timer = setTimeout(() => setFeverFlash(null), feverFlash === 'enter' ? 800 : 1200);
        return () => clearTimeout(timer);
    }, [feverFlash]);

    // Auto-clear fever exit text
    useEffect(() => {
        if (!feverExitEffect) return;
        const timer = setTimeout(() => setFeverExitEffect(null), 1500);
        return () => clearTimeout(timer);
    }, [feverExitEffect]);

    // Rank-up overlay is dismissed by tap (no auto-clear)

    // Card celebration: 1s flash for level-up, rank-up stays until tap
    useEffect(() => {
        if (!cardCelebration) return;
        // If rank-up is active, don't auto-dismiss (user taps to continue)
        if (cardRankUpEffect) return;
        const timer = setTimeout(() => {
            setReviewHistory(prev => [...prev, cardCelebration.phrase]);
            setHistoryOffset(0);
            setCardCelebration(null);
        }, 1000);
        return () => clearTimeout(timer);
    }, [cardCelebration, cardRankUpEffect]);

    // Auto-play TTS ref (effect placed after displayedCard is defined)
    const prevAutoPlayIdRef = useRef<string | null>(null);

    // Keep feverRef in sync (for race-condition-safe callbacks)
    useEffect(() => {
        feverRef.current = { active: chainState.mode !== 'normal', streak: chainState.count };
    }, [chainState.mode, chainState.count]);

    // Stop FEVER BGM when chain ends
    useEffect(() => {
        if (chainState.mode === 'normal') {
            if (feverDroneRef.current) {
                stopFeverBGM(feverDroneRef.current);
                feverDroneRef.current = null;
            }
        }
    }, [chainState.mode]);

    // Auto-clear chain transition effect (dual timer for reliability)
    useEffect(() => {
        if (!chainTransition) return;
        const t1 = setTimeout(() => setChainTransition(null), 1500);
        // Safety fallback in case React batching delays the first timer
        const t2 = setTimeout(() => setChainTransition(null), 2500);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, [chainTransition]);


    // Main BGM is managed by layout.tsx (app-wide). No duplicate here.
    // Clean up fever BGM on unmount only.
    useEffect(() => {
        return () => {
            if (feverDroneRef.current) {
                stopFeverBGM(feverDroneRef.current);
                feverDroneRef.current = null;
            }
        };
    }, []);

    // Auto-clear level-up effect
    useEffect(() => {
        if (!levelUpEffect) return;
        const timer = setTimeout(() => setLevelUpEffect(null), 3000);
        return () => clearTimeout(timer);
    }, [levelUpEffect]);

    // Auto-clear daily level-up effect
    useEffect(() => {
        if (!dailyLevelUpEffect) return;
        const timer = setTimeout(() => setDailyLevelUpEffect(null), 2000);
        return () => clearTimeout(timer);
    }, [dailyLevelUpEffect]);

    // 3-Reel Slot Machine — spin all 3, stop sequentially
    useEffect(() => {
        if (!gachaEffect || gachaEffect.phase !== 'reel') return;

        const tier = gachaEffect.tier;
        const combo = tier === 'MISS' ? generateMissCombo() : (TIER_TO_COMBO[tier] || TIER_TO_COMBO.MISS) as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
        const isReach = tier !== 'MISS' && combo[0] === combo[1]; // 2 matching = reach
        const isUltraRare = tier === 'MYTHIC' || tier === 'SHINY' || tier === 'PHANTOM';
        const isEpicTier = tier === 'MEGA' || tier === 'LEGENDARY' || isUltraRare;

        // Initialize slot state
        const initSym: [SlotSymbolId, SlotSymbolId, SlotSymbolId] = [
            SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)],
            SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)],
            SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)],
        ];
        setSlotReels({
            symbols: initSym,
            stopped: [false, false, false],
            target: combo,
            reach: false,
            above: [randomOtherSymbol(initSym[0]), randomOtherSymbol(initSym[1]), randomOtherSymbol(initSym[2])],
            below: [randomOtherSymbol(initSym[0]), randomOtherSymbol(initSym[1]), randomOtherSymbol(initSym[2])],
        });

        playSpinStart();

        const timers: ReturnType<typeof setTimeout>[] = [];
        const intervals: ReturnType<typeof setInterval>[] = [];

        // Spin all 3 reels — rapid symbol cycling
        const spinInterval = 60; // ms between symbol changes
        const spinTimer = setInterval(() => {
            setSlotReels(prev => {
                if (!prev) return prev;
                const newSyms = [...prev.symbols] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                const newAbove = [...prev.above] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                const newBelow = [...prev.below] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                for (let r = 0; r < 3; r++) {
                    if (!prev.stopped[r]) {
                        const sym = SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)];
                        newSyms[r] = sym;
                        newAbove[r] = randomOtherSymbol(sym);
                        newBelow[r] = randomOtherSymbol(sym);
                        playSpinTick();
                    }
                }
                return { ...prev, symbols: newSyms, above: newAbove, below: newBelow };
            });
        }, spinInterval);
        intervals.push(spinTimer);

        // Stop reel 1 at 800ms
        timers.push(setTimeout(() => {
            playReelStop(0);
            setSlotReels(prev => {
                if (!prev) return prev;
                const syms = [...prev.symbols] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                const ab = [...prev.above] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                const bl = [...prev.below] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                syms[0] = combo[0];
                ab[0] = randomOtherSymbol(combo[0]);
                bl[0] = randomOtherSymbol(combo[0]);
                return { ...prev, symbols: syms, above: ab, below: bl, stopped: [true, false, false] };
            });
        }, 800));

        // Stop reel 2 at 1400ms
        timers.push(setTimeout(() => {
            playReelStop(1);
            setSlotReels(prev => {
                if (!prev) return prev;
                const syms = [...prev.symbols] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                const ab = [...prev.above] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                const bl = [...prev.below] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                syms[1] = combo[1];
                ab[1] = randomOtherSymbol(combo[1]);
                bl[1] = randomOtherSymbol(combo[1]);
                const nowReach = isReach;
                if (nowReach) playReachAlert();
                return { ...prev, symbols: syms, above: ab, below: bl, stopped: [true, true, false], reach: nowReach };
            });
        }, 1400));

        // Slow down reel 3 for reach / epic tiers
        const reel3Delay = isReach ? (isUltraRare ? 5000 : isEpicTier ? 3200 : 2600) : 2000;

        // If reach, slow the spin interval for reel 3
        if (isReach) {
            timers.push(setTimeout(() => {
                // Replace fast spin with slow crawl for reel 3 only
                clearInterval(spinTimer);
                // For ultra-rare, tease the target symbol in the crawl
                const ultraTarget = combo[2];
                let crawlCount = 0;
                const slowInterval = setInterval(() => {
                    crawlCount++;
                    setSlotReels(prev => {
                        if (!prev || prev.stopped[2]) return prev;
                        const newSyms = [...prev.symbols] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                        const newAbove = [...prev.above] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                        const newBelow = [...prev.below] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                        // Ultra-rare: flash the target symbol briefly ~20% of the time for teasing
                        const teaseUltra = isUltraRare && Math.random() < 0.2;
                        const sym = teaseUltra ? ultraTarget : SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)];
                        newSyms[2] = sym;
                        newAbove[2] = randomOtherSymbol(SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)]);
                        newBelow[2] = randomOtherSymbol(SPIN_POOL[Math.floor(Math.random() * SPIN_POOL.length)]);
                        playSpinTick();
                        return { ...prev, symbols: newSyms, above: newAbove, below: newBelow };
                    });
                }, isUltraRare ? 400 : isEpicTier ? 280 : 180);
                intervals.push(slowInterval);
            }, 1500));
        }

        // Stop reel 3
        timers.push(setTimeout(() => {
            playReelStop(2);
            setSlotReels(prev => {
                if (!prev) return prev;
                const syms = [...prev.symbols] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                const ab = [...prev.above] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                const bl = [...prev.below] as [SlotSymbolId, SlotSymbolId, SlotSymbolId];
                syms[2] = combo[2];
                ab[2] = randomOtherSymbol(combo[2]);
                bl[2] = randomOtherSymbol(combo[2]);
                return { ...prev, symbols: syms, above: ab, below: bl, stopped: [true, true, true] };
            });
            // Clear all spin intervals
            intervals.forEach(clearInterval);
        }, reel3Delay));

        // Transition to reveal after all reels stopped + brief pause
        timers.push(setTimeout(() => {
            playGachaSound(gachaEffect.tier);
            setSlotReels(null);
            setGachaEffect(prev => prev ? { ...prev, phase: 'reveal' } : null);
            if (gachaEffect.phraseId && gachaEffect.cardTotalPoints > 0) {
                setTimeout(() => {
                    const rank = getCardRank(gachaEffect.cardTotalPoints);
                    playCardRankSound(rank.rank);
                }, 200);
            }
        }, reel3Delay + 800));

        slotSpinTimers.current = timers;

        return () => {
            timers.forEach(clearTimeout);
            intervals.forEach(clearInterval);
        };
    }, [gachaEffect?.phase, gachaEffect?.key]);

    // Gacha reveal phase: auto-clear after tier-specific duration
    useEffect(() => {
        if (!gachaEffect || gachaEffect.phase !== 'reveal') return;
        const cfg = GACHA_TIER_CONFIG[gachaEffect.tier];
        const timer = setTimeout(() => {
            setGachaEffect(null);
        }, (cfg?.duration || 2000));
        return () => clearTimeout(timer);
    }, [gachaEffect?.phase, gachaEffect?.key]);

    // Flush deferred score updates after gacha animation fully clears (no spoilers)
    useEffect(() => {
        if (gachaEffect === null && deferredScoreUpdates.current.length > 0) {
            const updates = deferredScoreUpdates.current.splice(0);
            for (const fn of updates) fn();
        }
    }, [gachaEffect]);

    // Add phrase form state
    const [showAddForm, setShowAddForm] = useState(false);
    const [newPhrase, setNewPhrase] = useState(() => ({ english: '', japanese: '', category: randomElement() }));
    const [formDate, setFormDate] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Quick-add in review mode
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    const [quickAddEnglish, setQuickAddEnglish] = useState('');
    const [quickAddSubmitting, setQuickAddSubmitting] = useState(false);
    const [quickAddedCount, setQuickAddedCount] = useState(0);

    // Flavor text registration
    const [savedFlavorTexts, setSavedFlavorTexts] = useState<Set<string>>(new Set());
    const [savingFlavorText, setSavingFlavorText] = useState(false);

    // Daily review counts per month (date -> { count, xp })
    const [monthlyReviewCounts, setMonthlyReviewCounts] = useState<Record<string, { count: number; xp: number; sparks?: number }>>({});

    // YouGlish state
    const [youglishPhrase, setYouglishPhrase] = useState<Phrase | null>(null);
    const [youglishQuery, setYouglishQuery] = useState('');
    const [youglishSearched, setYouglishSearched] = useState(false);
    const youglishLoaded = useRef(false);
    const widgetRef = useRef<ReturnType<typeof window.YG.Widget> | null>(null);
    const currentVideoRef = useRef({ videoId: '', timestamp: 0 });
    const [captionHistory, setCaptionHistory] = useState<{ text: string; selected: boolean }[]>([]);
    const [savingPhrase, setSavingPhrase] = useState(false);
    const [youglishSaveDate, setYouglishSaveDate] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    });
    const [playerPosition, setPlayerPosition] = useState({ x: 20, y: 20 });
    const [playerSize, setPlayerSize] = useState({ width: 420, height: 500 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [playerMinimized, setPlayerMinimized] = useState(false);
    const [playerFullscreen, setPlayerFullscreen] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    // Edit phrase state
    const [editingPhrase, setEditingPhrase] = useState<{ id: string; english: string; japanese: string } | null>(null);
    const [editSaving, setEditSaving] = useState(false);

    // Right sidebar expanded state
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    // Chakra filter for calendar day sidebar (null = show all)
    const [selectedChakraFilter, setSelectedChakraFilter] = useState<ChakraLevel | null>(null);

    // Vocabulary modal state
    const [showVocabModal, setShowVocabModal] = useState(false);
    const [vocabExample, setVocabExample] = useState('');
    const [vocabWord, setVocabWord] = useState('');
    const [vocabMeaning, setVocabMeaning] = useState('');
    const [vocabType, setVocabType] = useState('word');
    const [vocabSaving, setVocabSaving] = useState(false);
    const [vocabDate, setVocabDate] = useState(() => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    });

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Check if already shuffled today
        const todayStr = new Date().toISOString().split('T')[0];
        const lastShuffle = localStorage.getItem('training_last_shuffle');
        if (lastShuffle === todayStr) setShuffledToday(true);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fetch player stats on mount (3001 only)
    useEffect(() => {
        if (IS_PUBLIC) return;
        fetch('/api/player-stats')
            .then(r => r.json())
            .then(d => {
                if (d.success) {
                    setPlayerTotalXP(d.total_xp || 0);
                    setPlayerLevel(levelFromXP(d.total_xp || 0));
                    setPlayerSparks(d.sparks || 0);
                }
            })
            .catch(() => { });
    }, []);

    // Fetch monthly review counts + date touches when month changes (3001 only)
    useEffect(() => {
        if (IS_PUBLIC) return;
        if (!currentMonth) return;
        const ym = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
        fetch(`/api/review-count?month=${ym}`)
            .then(r => r.json())
            .then(d => { if (d.success) setMonthlyReviewCounts(prev => ({ ...prev, ...(d.counts || {}) })); })
            .catch(() => { });
        fetch(`/api/date-touches?month=${ym}`)
            .then(r => r.json())
            .then(d => { if (d.success) setDateTouchMap(prev => ({ ...prev, ...(d.touches || {}) })); })
            .catch(() => { });
    }, [currentMonth]);

    // Helper: post XP to review-count + update player level + chain transitions
    const postXP = useCallback((todayKey: string, xpGained: number, slamActive = false, phraseId?: string) => {
        if (IS_PUBLIC) {
            // 公開RPG: DBなしでローカルガチャシミュレーション
            const currentChain = feverRef.current;
            const roll = Math.random() * 100;
            const tier = roll < 1 ? 'MYTHIC'
                : roll < 4 ? 'LEGENDARY'
                : roll < 12 ? 'MEGA'
                : roll < 28 ? 'SUPER'
                : roll < 50 ? 'GREAT'
                : roll < 85 ? 'BONUS' : 'MISS';

            // XP + sparks
            const sparksWon = tier === 'MYTHIC' ? 50 : tier === 'LEGENDARY' ? 25 : tier === 'MEGA' ? 12 : tier === 'SUPER' ? 6 : tier === 'GREAT' ? 3 : tier === 'BONUS' ? 1 : 0;
            setPlayerSparks(prev => prev + sparksWon);
            setPlayerTotalXP(prev => {
                const newXP = prev + xpGained;
                const newLevel = levelFromXP(newXP);
                if (newLevel > playerLevel) {
                    setPlayerLevel(newLevel);
                    const info = getTitleForLevel(newLevel);
                    setLevelUpEffect({ level: newLevel, title: info.title, color: info.color, key: Date.now() });
                } else {
                    setPlayerLevel(newLevel);
                }
                return newXP;
            });

            // Card points
            const cardPtsEarned = tier === 'MYTHIC' ? 100 : tier === 'LEGENDARY' ? 50 : tier === 'MEGA' ? 25 : tier === 'SUPER' ? 12 : tier === 'GREAT' ? 6 : tier === 'BONUS' ? 2 : 0;
            if (phraseId) {
                setCardPoints(prev => {
                    const newPts = (prev[phraseId] || 0) + cardPtsEarned;
                    return { ...prev, [phraseId]: newPts };
                });
            }

            // Fever chain logic
            if (getSettings().feverEnabled) {
                const isWin = tier !== 'MISS';
                if (!isWin) {
                    if (currentChain.active) {
                        const exitStreak = currentChain.streak;
                        stopFeverBGM(feverDroneRef.current);
                        feverDroneRef.current = null;
                        setChainState({ count: 0, mode: 'normal', key: Date.now() });
                        feverRef.current = { active: false, streak: 0 };
                        setFeverFlash('exit');
                        setFeverExitEffect({ streak: exitStreak });
                        playFeverExitSound();
                    }
                } else {
                    const newCount = currentChain.streak + 1;
                    const oldMode = getChainMode(currentChain.streak);
                    const newMode = getChainMode(newCount);
                    const wasActive = currentChain.active;
                    setChainState({ count: newCount, mode: newMode, key: Date.now() });
                    feverRef.current = { active: newMode !== 'normal', streak: newCount };
                    if (newMode !== oldMode && newMode !== 'normal') {
                        setChainTransition({ from: oldMode, to: newMode, key: Date.now() });
                        if (!wasActive) {
                            setFeverFlash('enter');
                            playFeverEntrySound();
                            // Stop existing before starting new (prevents double-play)
                            if (feverDroneRef.current) { stopFeverBGM(feverDroneRef.current); }
                            feverDroneRef.current = startFeverBGM();
                        } else {
                            playFeverEntrySound();
                        }
                    } else if (wasActive) {
                        playFeverChainHit(newCount);
                    }
                }
            }

            // Trigger gacha overlay or quiet toast
            const slotOn = getSettings().slotEnabled;
            if (slotOn) {
                if (pendingGachaRef.current) clearTimeout(pendingGachaRef.current);
                const delay = slamActive ? 1200 : 0;
                pendingGachaRef.current = setTimeout(() => {
                    setGachaEffect({
                        phase: 'reel',
                        tier,
                        sparksWon,
                        phraseId: phraseId || null,
                        cardPointsEarned: cardPtsEarned,
                        cardTotalPoints: phraseId ? (cardPoints[phraseId] || 0) + cardPtsEarned : 0,
                        key: Date.now(),
                    });
                    pendingGachaRef.current = null;
                }, delay);
            } else {
                setQuietToast({
                    sparks: sparksWon,
                    cardPts: cardPtsEarned,
                    tier,
                    key: Date.now(),
                });
            }
            return;
        }
        const currentChain = feverRef.current;
        const chainTierNum = currentChain.active ? getChainTier(currentChain.streak) : 0;
        fetch('/api/review-count', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: todayKey, xp: xpGained, phrase_id: phraseId, fever: currentChain.active, chain_tier: chainTierNum })
        })
            .then(r => r.json())
            .then(d => {
                if (d.success) {
                    // Update count + xp immediately (non-spoiler), defer sparks until after slot
                    setMonthlyReviewCounts(prev => ({ ...prev, [todayKey]: { count: d.count, xp: d.xp, sparks: prev[todayKey]?.sparks || 0 } }));
                    if (d.total_xp !== undefined) {
                        const oldLevel = playerLevel;
                        const newTotalXP = d.total_xp;
                        const newLevel = levelFromXP(newTotalXP);
                        setPlayerTotalXP(newTotalXP);
                        if (newLevel > oldLevel) {
                            setPlayerLevel(newLevel);
                            const info = getTitleForLevel(newLevel);
                            setLevelUpEffect({ level: newLevel, title: info.title, color: info.color, key: Date.now() });
                        } else {
                            setPlayerLevel(newLevel);
                        }
                    }
                    // Gacha result + card points + FEVER logic
                    if (d.gacha) {
                        const tier = d.gacha.tier as string;
                        const slotOn = getSettings().slotEnabled;

                        // Score updates that would spoil slot result — defer when slot is ON
                        const scoreUpdates = () => {
                            setPlayerSparks(d.gacha.total_sparks);
                            setMonthlyReviewCounts(prev => ({ ...prev, [todayKey]: { ...prev[todayKey], sparks: d.sparks || d.gacha.total_sparks } }));
                            if (phraseId && d.gacha.card_total_points !== undefined) {
                                setCardPoints(prev => ({ ...prev, [phraseId]: d.gacha.card_total_points }));
                                // In word mode, sync card points to user_words table
                                if (dataMode === 'words' && d.gacha.card_points_earned > 0) {
                                    fetch(`/api/user-words/${phraseId}`, {
                                        method: 'PATCH',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ card_points: d.gacha.card_points_earned })
                                    }).catch(() => {});
                                }
                            }
                            if (d.gacha.luck_multiplier !== undefined) {
                                setLuckMultiplier(d.gacha.luck_multiplier);
                            }
                            // Card rank-up detection — delay until AFTER gacha animation finishes
                            if (phraseId && d.gacha.card_total_points !== undefined) {
                                const prevPoints = cardPoints[phraseId] || 0;
                                const prevRank = getCardRank(prevPoints);
                                const newRank = getCardRank(d.gacha.card_total_points);
                                if (prevRank.rank !== newRank.rank && newRank.rank !== 'NORMAL') {
                                    const slotOn = getSettings().slotEnabled;
                                    const gachaDuration = slotOn ? (GACHA_TIER_CONFIG[tier]?.duration || 2000) + 500 : 500;
                                    setTimeout(() => {
                                        playRankUpSound(newRank.rank);
                                        setCardRankUpEffect({
                                            oldRank: prevRank.label || 'NORMAL',
                                            newRank: newRank.label,
                                            newRankColor: newRank.borderColor,
                                            newRankKey: newRank.rank,
                                            oldRankKey: prevRank.rank,
                                            snapshotPoints: d.gacha.card_total_points,
                                            key: Date.now(),
                                        });
                                    }, gachaDuration);
                                }
                            }
                        };

                        // 連荘 Chain state transitions — graduated escalation (always immediate)
                        if (getSettings().feverEnabled) {
                        const currentFever = feverRef.current;
                        const isWin = tier !== 'MISS';
                        const isMiss = tier === 'MISS';
                        if (isMiss) {
                            // Chain breaks — reset to 0
                            if (currentFever.active) {
                                const exitStreak = currentFever.streak;
                                stopFeverBGM(feverDroneRef.current);
                                feverDroneRef.current = null;
                                setChainState({ count: 0, mode: 'normal', key: Date.now() });
                                feverRef.current = { active: false, streak: 0 };
                                setFeverFlash('exit');
                                setFeverExitEffect({ streak: exitStreak });
                                playFeverExitSound();
                            }
                        } else if (isWin) {
                            const newCount = currentFever.streak + 1;
                            const oldMode = getChainMode(currentFever.streak);
                            const newMode = getChainMode(newCount);
                            const wasActive = currentFever.active;

                            setChainState({ count: newCount, mode: newMode, key: Date.now() });
                            feverRef.current = { active: newMode !== 'normal', streak: newCount };

                            // Mode escalation effects
                            if (newMode !== oldMode && newMode !== 'normal') {
                                setChainTransition({ from: oldMode, to: newMode, key: Date.now() });
                                if (!wasActive) {
                                    // First entry into chain mode (normal → kakuhen at 3)
                                    setFeverFlash('enter');
                                    playFeverEntrySound();
                                    // Stop existing before starting new (prevents double-play)
                                    if (feverDroneRef.current) { stopFeverBGM(feverDroneRef.current); }
                                    feverDroneRef.current = startFeverBGM();
                                } else {
                                    // Escalation (kakuhen → gekiatsu, gekiatsu → god)
                                    playFeverEntrySound();
                                }
                            } else if (wasActive) {
                                playFeverChainHit(newCount);
                            }
                        }
                        }

                        if (slotOn) {
                        // Queue score updates to flush after slot reveal clears (no spoilers)
                        deferredScoreUpdates.current.push(scoreUpdates);
                        if (pendingGachaRef.current) clearTimeout(pendingGachaRef.current);
                        const delay = slamActive ? 1200 : 0;
                        pendingGachaRef.current = setTimeout(() => {
                            setGachaEffect({
                                phase: 'reel',
                                tier,
                                sparksWon: d.gacha.sparks_won,
                                phraseId: phraseId || null,
                                cardPointsEarned: d.gacha.card_points_earned || 0,
                                cardTotalPoints: d.gacha.card_total_points || 0,
                                key: Date.now(),
                            });
                            pendingGachaRef.current = null;
                        }, delay);
                        } else {
                            // Slot OFF — apply scores immediately + show quiet toast
                            scoreUpdates();
                            setQuietToast({
                                sparks: d.gacha.sparks_won,
                                cardPts: d.gacha.card_points_earned || 0,
                                tier,
                                key: Date.now(),
                            });
                        }
                    }
                }
            })
            .catch(() => { });
    }, [playerLevel, cardPoints]);

    useEffect(() => {
        // Retry-capable fetch with AbortController timeout for cold-start API compilation
        const fetchWithRetry = async (url: string, retries = 5, delay = 3000): Promise<Response> => {
            for (let i = 0; i < retries; i++) {
                try {
                    const controller = new AbortController();
                    const timeout = setTimeout(() => controller.abort(), 30000);
                    const res = await fetch(url, { signal: controller.signal });
                    clearTimeout(timeout);
                    if (res.ok) return res;
                } catch { /* network error or timeout */ }
                if (i < retries - 1) await new Promise(r => setTimeout(r, delay));
            }
            return fetch(url); // final attempt, let it throw
        };

        // Skip fetch if server already provided data via initialData
        if (initialData?.phrases && dataMode === 'phrases') {
            setLoading(false);
            return () => {};
        }

        // Delay API calls to let dev server finish page compilation first
        const startDelay = setTimeout(() => { fetchData(); }, 500);

        const fetchData = async () => {
            try {
                if (IS_PUBLIC) {
                    // 公開RPG (3004): TOEIC 30日コンテンツ + エピソードから追加した単語
                    // カレンダーの各日に20個: Day 1→1日, Day 2→2日, ...
                    const now = new Date();
                    const y = now.getFullYear();
                    const m = now.getMonth();
                    const daysInMonth = new Date(y, m + 1, 0).getDate();
                    const makeDayDate = (dayNum: number) => {
                        const d = new Date(y, m, dayNum, 12, 0, 0);
                        return d.toISOString();
                    };

                    const allPhrases: Phrase[] = [];
                    let idx = 0;

                    // その月の日数分だけコンテンツを配布（28-31日）
                    for (const day of TOEIC_30DAY) {
                        if (day.day > daysInMonth) break;
                        const dateStr = makeDayDate(day.day);
                        for (const item of day.items) {
                            allPhrases.push({
                                id: `toeic30_${idx}`,
                                english: item.english,
                                japanese: item.japanese,
                                category: `Day ${day.day}: ${day.themeJa}`,
                                date: dateStr,
                            });
                            idx++;
                        }
                    }

                    // Append TOEIC酒場 vocab deck (saved from episodes)
                    try {
                        const vocabRaw = localStorage.getItem('izakaya_toeic_vocab_deck');
                        if (vocabRaw) {
                            const vocabDeck = JSON.parse(vocabRaw);
                            const masteryFromDeck: Record<string, number> = {};
                            for (const v of vocabDeck) {
                                const id = `ep_${idx}`;
                                const addedDate = v.addedAt || new Date().toISOString();
                                allPhrases.push({
                                    id,
                                    english: v.word || '',
                                    japanese: v.meaning || '',
                                    category: v.sourceEpisodeTitle || v.sourceEpisode || 'TOEIC酒場',
                                    date: addedDate,
                                });
                                if (v.masteryLevel) masteryFromDeck[id] = v.masteryLevel;
                                idx++;
                            }
                            if (Object.keys(masteryFromDeck).length > 0) {
                                try {
                                    const existing = localStorage.getItem('quest-mastery');
                                    const merged = existing ? { ...JSON.parse(existing), ...masteryFromDeck } : masteryFromDeck;
                                    localStorage.setItem('quest-mastery', JSON.stringify(merged));
                                } catch { /* */ }
                            }
                        }
                    } catch { /* */ }

                    setPhrases(allPhrases);
                    try {
                        const saved = localStorage.getItem('quest-mastery');
                        if (saved) setPhraseMastery(JSON.parse(saved));
                    } catch { /* */ }
                    setVoiceRecordings({});
                    setPhraseLinks({});
                } else if (dataMode === 'words') {
                    // Word mode: load from user-words API (with retry for cold-start compile)
                    const [wordsRes, masteryRes] = await Promise.all([
                        fetchWithRetry('/api/user-words'),
                        fetchWithRetry('/api/user-words?mastery=true'),
                    ]);
                    const wordsData = await wordsRes.json();
                    const masteryData = await masteryRes.json();
                    if (wordsData.success) {
                        // Map words to Phrase interface for UI compatibility
                        const mapped: Phrase[] = (wordsData.words || []).map((w: { id: string; english: string; japanese: string; pronunciation?: string; category?: string; created_at: string }) => ({
                            id: w.id,
                            english: w.english,
                            japanese: w.japanese + (w.pronunciation ? ` (${w.pronunciation})` : ''),
                            category: w.category || 'word',
                            date: w.created_at,
                        }));
                        setPhrases(mapped);
                    }
                    if (masteryData.success) {
                        setPhraseMastery(masteryData.mastery || {});
                        if (masteryData.lastLeveled) setPhraseLastLeveled(masteryData.lastLeveled);
                        if (masteryData.cardPoints) setCardPoints(masteryData.cardPoints);
                    }
                    setVoiceRecordings({});
                    setPhraseLinks({});
                } else {
                    // Single consolidated API call (prevents dev server compile deadlock)
                    const initRes = await fetchWithRetry('/api/training-init');
                    const initData = await initRes.json();
                    if (initData.success) {
                        if (initData.phrases) setPhrases(initData.phrases);
                        setPhraseMastery(initData.mastery || {});
                        if (initData.lastLeveled) setPhraseLastLeveled(initData.lastLeveled);
                        if (initData.cardPoints) setCardPoints(initData.cardPoints);
                        setVoiceRecordings(initData.recordings || {});
                        setPhraseLinks(initData.links || {});
                    }
                }
            } finally {
                setLoading(false);
            }
        };
        setLoading(true);
        // fetchData() is called via startDelay above

        // Load voices for speech synthesis
        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            const enVoices = allVoices.filter(v => v.lang.startsWith('en'));
            setVoices(enVoices);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => { clearTimeout(startDelay); window.speechSynthesis.cancel(); };
    }, [dataMode]);

    // Load YouGlish script
    useEffect(() => {
        if (youglishLoaded.current) return;
        const script = document.createElement('script');
        script.src = 'https://youglish.com/public/emb/widget.js';
        script.async = true;
        document.body.appendChild(script);
        youglishLoaded.current = true;
    }, []);

    // YouGlish drag handlers
    const handleDragStart = (e: React.MouseEvent) => {
        if (playerFullscreen) return;
        setIsDragging(true);
        dragOffset.current = {
            x: e.clientX - playerPosition.x,
            y: e.clientY - playerPosition.y
        };
    };

    const handleResizeStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (playerFullscreen) return;
        setIsResizing(true);
        dragOffset.current = {
            x: e.clientX,
            y: e.clientY
        };
    };

    const toggleFullscreen = () => {
        setPlayerFullscreen(!playerFullscreen);
        setPlayerMinimized(false);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPlayerPosition({
                    x: e.clientX - dragOffset.current.x,
                    y: e.clientY - dragOffset.current.y
                });
            }
            if (isResizing) {
                const deltaX = e.clientX - dragOffset.current.x;
                const deltaY = e.clientY - dragOffset.current.y;
                setPlayerSize(prev => ({
                    width: Math.max(300, prev.width + deltaX),
                    height: Math.max(300, prev.height + deltaY)
                }));
                dragOffset.current = { x: e.clientX, y: e.clientY };
            }
        };
        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing]);

    const playYouGlish = (phrase: Phrase) => {
        setYouglishPhrase(phrase);
        setYouglishQuery('');
        setYouglishSearched(false);
        setCaptionHistory([]);
        currentVideoRef.current = { videoId: '', timestamp: 0 };
        setPlayerPosition({
            x: Math.max(20, window.innerWidth - 460),
            y: Math.max(20, window.innerHeight / 2 - 200)
        });
    };

    const searchYouGlish = () => {
        if (!youglishQuery.trim()) return;
        if (!window.YG) {
            alert('YouGlish is still loading. Please wait a moment and try again.');
            return;
        }

        setYouglishSearched(true);
        setCaptionHistory([]);
        currentVideoRef.current = { videoId: '', timestamp: 0 };

        // Wait for React to render the empty container
        setTimeout(() => {
            const container = document.getElementById('yg-widget-phrases');
            if (container) container.innerHTML = '';

            widgetRef.current = new window.YG.Widget('yg-widget-phrases', {
                width: 400,
                components: 255,
                events: {
                    onFetchDone: (event: { totalResult: number }) => {
                        console.log('YouGlish fetch done:', event.totalResult);
                    },
                    onVideoChange: (event: any) => {
                        const videoId = event.video || event.videoId || '';
                        const start = event.start || 0;
                        if (videoId) {
                            currentVideoRef.current = { videoId, timestamp: start };
                            setCaptionHistory([]);
                        }
                    },
                    onCaptionChange: (event: { caption: string }) => {
                        let caption = event.caption;
                        try { caption = decodeURIComponent(caption); } catch { }
                        caption = caption.replace(/\[\[\[/g, '').replace(/\]\]\]/g, '');

                        setCaptionHistory(prev => {
                            if (prev.length === 0 || prev[prev.length - 1].text !== caption) {
                                return [...prev, { text: caption, selected: true }];
                            }
                            return prev;
                        });
                    }
                }
            });
            widgetRef.current.fetch(youglishQuery.trim(), 'english');
        }, 50);
    };

    const saveSelectedCaptions = async () => {
        if (savingPhrase) return;
        const selectedCaptions = captionHistory.filter(c => c.selected);
        if (selectedCaptions.length === 0) {
            alert('No captions selected');
            return;
        }
        setSavingPhrase(true);
        try {
            const fullText = selectedCaptions.map(c => c.text).join(' ');
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: fullText,
                    japanese: `(${youglishPhrase?.english.slice(0, 30) || 'YouGlish'})`,
                    category: 'YouGlish',
                    date: youglishSaveDate
                })
            });
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.phrase && !data.duplicate) {
                    setPhrases(prev => [...prev, data.phrase]);
                }
                alert('Saved!');
                setCaptionHistory([]);
            } else {
                alert('Failed to save');
            }
        } catch (err) {
            console.error(err);
            alert('Error saving');
        } finally {
            setSavingPhrase(false);
        }
    };

    // Group by date
    const phrasesByDate = useMemo(() => {
        const map: Record<string, Phrase[]> = {};
        phrases.forEach(phrase => {
            const dateKey = phrase.date.split('T')[0];
            if (!map[dateKey]) map[dateKey] = [];
            map[dateKey].push(phrase);
        });
        return map;
    }, [phrases]);

    // Phrase ID → YYYY-MM-DD date lookup
    const phraseDateMap = useMemo(() => {
        const map: Record<string, string> = {};
        for (const p of phrases) map[p.id] = p.date.split('T')[0];
        return map;
    }, [phrases]);

    // Deep link support: ?date=YYYY-MM-DD and/or ?phrase=PHRASE_ID
    useEffect(() => {
        if (!phrases.length || !currentMonth) return;
        const params = new URLSearchParams(window.location.search);
        const dateParam = params.get('date');
        const phraseParam = params.get('phrase');
        if (!dateParam && !phraseParam) return;

        let targetDate: string | null = null;

        if (phraseParam && phraseDateMap[phraseParam]) {
            targetDate = phraseDateMap[phraseParam];
            setHighlightPhraseId(phraseParam);
            // Clear highlight after animation
            setTimeout(() => setHighlightPhraseId(null), 3000);
            // Scroll to phrase card after render
            requestAnimationFrame(() => {
                setTimeout(() => {
                    const el = document.querySelector(`[data-phrase-id="${phraseParam}"]`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            });
        } else if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
            targetDate = dateParam;
        }

        if (targetDate) {
            // Navigate to correct month if needed
            const [y, m] = targetDate.split('-').map(Number);
            if (currentMonth.getFullYear() !== y || currentMonth.getMonth() + 1 !== m) {
                setCurrentMonth(new Date(y, m - 1, 1));
            }
            setSelectedDate(targetDate);
        }

        // Clean URL without reload
        window.history.replaceState({}, '', window.location.pathname);
    }, [phrases, currentMonth, phraseDateMap]);

    // Filtered items for search
    const filteredPhrases = useMemo(() => {
        if (!searchQuery.trim()) return phrases;
        const q = searchQuery.toLowerCase();
        return phrases.filter(p =>
            p.english.toLowerCase().includes(q) ||
            p.japanese.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    }, [phrases, searchQuery]);

    // This month's phrases for review, grouped by mastery level
    // Each level is independently shuffled on every reload / tab switch / shuffleKey change
    const thisMonthReviewPhrases = useMemo(() => {
        void shuffleKey; // dependency trigger — forces full re-shuffle
        if (!currentMonth) return { level0: [], level1: [], level2: [], level3: [], level4: [], level5: [], level6: [], all: [], total: [] };
        // Use string comparison to avoid UTC vs local timezone mismatch
        const y = currentMonth.getFullYear();
        const m = String(currentMonth.getMonth() + 1).padStart(2, '0');
        const monthPrefix = `${y}-${m}`;

        const monthPhrases = phrases.filter(p => {
            const dateStr = p.date.split('T')[0];
            return dateStr.startsWith(monthPrefix);
        });

        const withChakra = monthPhrases.map(p => {
            const m = Number(phraseMastery[p.id] || 0);
            const hasRec = (voiceRecordings[p.id] || []).length > 0;
            const hasLink = (phraseLinks[p.id] || []).length > 0;
            return { phrase: p, chakra: getChakraLevel(m, hasRec, hasLink) };
        });

        return {
            level0: fisherYates(withChakra.filter(x => x.chakra === 0).map(x => x.phrase)),
            level1: fisherYates(withChakra.filter(x => x.chakra === 1).map(x => x.phrase)),
            level2: fisherYates(withChakra.filter(x => x.chakra === 2).map(x => x.phrase)),
            level3: fisherYates(withChakra.filter(x => x.chakra === 3).map(x => x.phrase)),
            level4: fisherYates(withChakra.filter(x => x.chakra === 4).map(x => x.phrase)),
            level5: fisherYates(withChakra.filter(x => x.chakra === 5).map(x => x.phrase)),
            level6: fisherYates(withChakra.filter(x => x.chakra === 6).map(x => x.phrase)),
            all: fisherYates(withChakra.filter(x => x.chakra < 3).map(x => x.phrase)),
            total: fisherYates(monthPhrases),
        };
    }, [phrases, currentMonth, shuffleKey, phraseMastery, voiceRecordings, phraseLinks]);

    // Remaining clicks to get all phrases to FIGHTER (mastery 3 / Lv.4)
    // Lv.1(EGG/0)=3clicks, Lv.2(HATCH/1)=2, Lv.3(ROOKIE/2)=1, Lv.4+(FIGHTER/3+)=0
    const remainingClicks = useMemo(() => {
        return thisMonthReviewPhrases.total.reduce((sum, p) => {
            const level = Math.min(Number(phraseMastery[p.id] || 0), 3);
            return sum + (3 - level);
        }, 0);
    }, [thisMonthReviewPhrases.total, phraseMastery]);

    // Shuffle handler with once-per-day limit
    const handleShuffle = useCallback(() => {
        if (shuffledToday) return;
        const todayStr = new Date().toISOString().split('T')[0];
        localStorage.setItem('training_last_shuffle', todayStr);
        setShuffledToday(true);
        setShuffleKey(k => k + 1);
        setReviewIndex(0);
    }, [shuffledToday]);

    // Analytics computation for dashboard
    const chakraAnalytics = useMemo(() => {
        const allPhrases = phrases;
        const monthPhrases = thisMonthReviewPhrases.total;

        // Points: each phrase contributes (chakraLevel + 1) points
        let totalPoints = 0;
        let monthPoints = 0;
        const levelCounts = [0, 0, 0, 0, 0, 0, 0];

        allPhrases.forEach(p => {
            const m = Number(phraseMastery[p.id] || 0);
            const hasRec = (voiceRecordings[p.id] || []).length > 0;
            const hasLink = (phraseLinks[p.id] || []).length > 0;
            const lv = getChakraLevel(m, hasRec, hasLink);
            totalPoints += (lv + 1);
            levelCounts[lv]++;
        });

        monthPhrases.forEach(p => {
            const m = Number(phraseMastery[p.id] || 0);
            const hasRec = (voiceRecordings[p.id] || []).length > 0;
            const hasLink = (phraseLinks[p.id] || []).length > 0;
            const lv = getChakraLevel(m, hasRec, hasLink);
            monthPoints += (lv + 1);
        });

        // Today's review count (touches)
        const todayTouches = clientToday ? (monthlyReviewCounts[clientToday]?.count || 0) : 0;

        // Average chakra level
        const avgLevel = allPhrases.length > 0
            ? allPhrases.reduce((sum, p) => {
                const m = Number(phraseMastery[p.id] || 0);
                const hasRec = (voiceRecordings[p.id] || []).length > 0;
                const hasLink = (phraseLinks[p.id] || []).length > 0;
                return sum + getChakraLevel(m, hasRec, hasLink);
            }, 0) / allPhrases.length
            : 0;

        // Daily activity data (bar chart for current month)
        const dailyData: { day: number; touches: number }[] = [];
        let daysInMonth = 30;
        if (currentMonth) {
            daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
            for (let d = 1; d <= daysInMonth; d++) {
                const dk = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                dailyData.push({ day: d, touches: monthlyReviewCounts[dk]?.count || 0 });
            }
        }

        // Active days this month
        const activeDays = dailyData.filter(d => d.touches > 0).length;

        // Streak (consecutive days from today backwards)
        let streak = 0;
        if (clientToday) {
            const [y, m2, d2] = clientToday.split('-').map(Number);
            const startDate = new Date(y, m2 - 1, d2);
            for (let i = 0; i < 365; i++) {
                const d = new Date(startDate);
                d.setDate(d.getDate() - i);
                const dk = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                if ((monthlyReviewCounts[dk]?.count || 0) > 0) streak++;
                else break;
            }
        }

        return { totalPoints, monthPoints, todayTouches, avgLevel, levelCounts, dailyData, activeDays, streak, daysInMonth };
    }, [phrases, thisMonthReviewPhrases, phraseMastery, voiceRecordings, phraseLinks, monthlyReviewCounts, currentMonth, clientToday]);

    // Separate memo for recorded filter — voiceRecordings changes must NOT reshuffle the list
    const recordedReviewPhrases = useMemo(() => {
        return thisMonthReviewPhrases.total.filter(p => (voiceRecordings[p.id] || []).length > 0);
    }, [thisMonthReviewPhrases.total, voiceRecordings]);

    // Phrases that have linked notes
    const linkedReviewPhrases = useMemo(() => {
        return thisMonthReviewPhrases.total.filter(p => (phraseLinks[p.id] || []).length > 0);
    }, [thisMonthReviewPhrases.total, phraseLinks]);

    // Live computed list (recomputes on every recording/mastery change — used for tab counts)
    const computedReviewList = useMemo(() => {
        if (reviewFilter === 'all') return thisMonthReviewPhrases.total;
        if (reviewFilter === 'random') return thisMonthReviewPhrases.all;
        if (reviewFilter === 'recorded') return recordedReviewPhrases;
        if (reviewFilter === 'linked') return linkedReviewPhrases;
        return thisMonthReviewPhrases[`level${reviewFilter}` as keyof typeof thisMonthReviewPhrases] as Phrase[];
    }, [thisMonthReviewPhrases, reviewFilter, recordedReviewPhrases, linkedReviewPhrases]);

    // Stable review list — only updates on filter/shuffle/phrase changes, NOT on recording/mastery
    // This prevents "jump to next" when recording promotes a phrase to a higher chakra level
    const reviewListCacheRef = useRef<{ filter: string; shuffleKey: number; listRef: Phrase[]; list: Phrase[] }>(
        { filter: '', shuffleKey: -1, listRef: [], list: [] }
    );
    const cacheKey = reviewListCacheRef.current;
    if (cacheKey.filter !== String(reviewFilter) || cacheKey.shuffleKey !== shuffleKey || cacheKey.listRef !== computedReviewList) {
        reviewListCacheRef.current = { filter: String(reviewFilter), shuffleKey, listRef: computedReviewList, list: computedReviewList };
    }
    // Hide phrases touched today — once you press mastery, it won't reappear until tomorrow
    const reviewListRaw = reviewListCacheRef.current.list;
    const reviewList = clientToday
        ? reviewListRaw.filter(p => phraseLastLeveled[p.id] !== clientToday)
        : reviewListRaw;

    // History-aware displayed card: celebration > history > queue
    const displayedCard = cardCelebration
        ? cardCelebration.phrase
        : historyOffset > 0 && reviewHistory.length >= historyOffset
            ? reviewHistory[reviewHistory.length - historyOffset]
            : (reviewList[reviewIndex] || null);

    // Clamp reviewIndex when list shrinks (e.g. after deletion)
    useEffect(() => {
        if (reviewList.length > 0 && reviewIndex >= reviewList.length) {
            setReviewIndex(reviewList.length - 1);
        }
    }, [reviewList.length, reviewIndex]);

    // Reset inline recording state when card changes
    useEffect(() => {
        setRecordingStateForCard('idle');
        if (inlineMediaRecorderRef.current?.state === 'recording') {
            inlineMediaRecorderRef.current.stop();
        }
        inlineMediaRecorderRef.current = null;
    }, [reviewIndex, historyOffset]);

    // Exit review mode on Escape + dev shortcuts (localhost only)
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && viewMode === 'review') setViewMode('calendar');
            // Dev shortcuts: Shift+1/2/3/4 = chain modes, Shift+0 = reset, Shift+K = kakuhen
            if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && e.shiftKey) {
                const k = e.key;
                if (k === '!') { // Shift+1 = kakuhen x3
                    setChainState({ count: 3, mode: 'kakuhen', key: Date.now() });
                } else if (k === '@' || k === '"') { // Shift+2 = gekiatsu x5 (@ on US, " on JP keyboard)
                    setChainState({ count: 5, mode: 'gekiatsu', key: Date.now() });
                } else if (k === '#') { // Shift+3 = god x10
                    setChainState({ count: 10, mode: 'god', key: Date.now() });
                } else if (k === ')') { // Shift+0 = reset chain
                    setChainState({ count: 0, mode: 'normal', key: Date.now() });
                } else if (k === 'K') { // Shift+K = kakuhen boost 10
                    setKakuhenBoost(prev => prev > 0 ? 0 : 10);
                }
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [viewMode]);

    // Today's XP + sparks — from DB via monthlyReviewCounts
    const todayKey = clientToday || new Date().toISOString().split('T')[0];
    const todayXP = monthlyReviewCounts[todayKey]?.xp || 0;
    const todaySparks = monthlyReviewCounts[todayKey]?.sparks || 0;

    // Daily milestone — derived from today's XP vs goal, resets each day
    const scaledMilestones = getRunnerMilestones(goalXP);
    const currentMilestoneIndex = (() => {
        let idx = -1;
        for (let i = scaledMilestones.length - 1; i >= 0; i--) {
            if (todayXP >= scaledMilestones[i].xp) { idx = i; break; }
        }
        return idx;
    })();
    const dailyTitle = currentMilestoneIndex >= 0
        ? { title: scaledMilestones[currentMilestoneIndex].title, color: scaledMilestones[currentMilestoneIndex].color }
        : { title: '寝起き', color: '#78716C' };

    // Detect daily milestone-up
    useEffect(() => {
        if (currentMilestoneIndex > prevDailyLevelRef.current && prevDailyLevelRef.current > -2) {
            if (currentMilestoneIndex >= 0) {
                const m = scaledMilestones[currentMilestoneIndex];
                setDailyLevelUpEffect({ level: currentMilestoneIndex + 1, title: m.title, color: m.color, key: Date.now() });
            }
        }
        prevDailyLevelRef.current = currentMilestoneIndex;
    }, [currentMilestoneIndex]);

    // Floating "+N XP" popups (RPG-style)
    const [xpFloats, setXpFloats] = useState<Array<{ id: number; value: number; color: string }>>([]);
    // Touch float
    const [touchFloats, setTouchFloats] = useState<Array<{ id: number }>>([]);

    // Spawn XP float when pointEffect fires
    useEffect(() => {
        if (!pointEffect) return;
        const fid = Date.now();
        setXpFloats(prev => [...prev, { id: fid, value: pointEffect.points, color: pointEffect.color }]);
        setTimeout(() => setXpFloats(prev => prev.filter(f => f.id !== fid)), 1200);
    }, [pointEffect]);

    // Spawn touch float when monthlyReviewCounts for today changes
    const prevTouchRef = useRef(0);
    useEffect(() => {
        const current = monthlyReviewCounts[todayKey]?.count || 0;
        if (current > prevTouchRef.current && prevTouchRef.current > 0) {
            const fid = Date.now();
            setTouchFloats(prev => [...prev, { id: fid }]);
            setTimeout(() => setTouchFloats(prev => prev.filter(f => f.id !== fid)), 1200);
        }
        prevTouchRef.current = current;
    }, [monthlyReviewCounts, todayKey]);

    // Auto-clear point effect
    useEffect(() => {
        if (!pointEffect) return;
        const timer = setTimeout(() => setPointEffect(null), 2000);
        return () => clearTimeout(timer);
    }, [pointEffect]);

    // Auto-clear calendar pulse (particle burst + floating number)
    useEffect(() => {
        if (!calendarPulse) return;
        const timer = setTimeout(() => setCalendarPulse(null), 4500);
        return () => clearTimeout(timer);
    }, [calendarPulse]);

    const saveFlavorText = async (flavorEn: string, flavorJa: string) => {
        if (savingFlavorText || savedFlavorTexts.has(flavorEn)) return;
        setSavingFlavorText(true);
        try {
            const res = await fetch('/api/phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: flavorEn,
                    japanese: flavorJa,
                    category: 'Flavor',
                    date: clientToday,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setSavedFlavorTexts(prev => new Set(prev).add(flavorEn));
                if (data.phrase && !data.duplicate) {
                    setPhrases(prev => [...prev, data.phrase]);
                }
            } else {
                alert(data.error || 'Failed to save');
            }
        } catch (err) {
            console.error('Failed to save flavor text:', err);
        } finally {
            setSavingFlavorText(false);
        }
    };

    // Review content: large version for PC fullscreen, compact for mobile inline
    const isFullReview = viewMode === 'review' && !isMobile;

    const renderReviewContent = () => {
        const currentPhrase = displayedCard;
        const currentCardPts = currentPhrase ? (cardPoints[currentPhrase.id] || 0) : 0;
        const currentCardRank = getCardRank(currentCardPts);
        const isHolo = currentCardRank.rank === 'HOLOGRAPHIC' || currentCardRank.rank === 'LEGENDARY';

        return (
            <>
                {/* Review Card */}
                {(reviewList.length > 0 || historyOffset > 0 || cardCelebration) ? (
                    <div style={{
                        borderRadius: '16px',
                        ...getCardFrame(currentCardRank.rank),
                        boxShadow: cardCelebration
                            ? `${getCardShadow(currentCardRank.rank)}, 0 0 30px ${CHAKRA_CONFIG[getChakraLevel(Number(phraseMastery[displayedCard?.id || ''] || 0), (voiceRecordings[displayedCard?.id || ''] || []).length > 0, (phraseLinks[displayedCard?.id || ''] || []).length > 0)].gradFrom}60`
                            : getCardShadow(currentCardRank.rank),
                        padding: '8px',
                        position: 'relative',
                        zIndex: 51,
                        transition: cardCelebration ? 'none' : 'transform 0.3s ease',
                        ...(cardCelebration ? {
                            animation: 'card-levelup-celebrate 2.5s ease-out forwards',
                        } : isHolo ? {
                            animation: 'card-holo-shimmer 3s ease-in-out infinite',
                        } : {}),
                    }}>
                        {/* Holographic overlay for HOLO+ cards */}
                        {isHolo && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: currentCardRank.rank === 'LEGENDARY'
                                    ? 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(168,85,247,0.06) 25%, rgba(59,130,246,0.06) 50%, rgba(212,175,55,0.08) 75%, rgba(168,85,247,0.06) 100%)'
                                    : 'linear-gradient(135deg, rgba(168,85,247,0.05) 0%, rgba(59,130,246,0.04) 50%, rgba(168,85,247,0.05) 100%)',
                                backgroundSize: '200% 200%',
                                animation: 'card-holo-shimmer 3s ease-in-out infinite',
                                borderRadius: '10px',
                                pointerEvents: 'none',
                                zIndex: 0,
                            }} />
                        )}
                        {/* Legendary particle aura */}
                        {currentCardRank.rank === 'LEGENDARY' && (
                            <>
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} style={{
                                        position: 'absolute',
                                        width: '3px', height: '3px',
                                        borderRadius: '50%',
                                        background: i % 2 === 0 ? '#D4AF37' : '#A855F7',
                                        left: `${10 + (i * 11) % 80}%`,
                                        top: `${5 + (i * 13) % 85}%`,
                                        animation: `card-particle-float ${2 + (i % 3)}s ease-in-out infinite`,
                                        animationDelay: `${i * 0.3}s`,
                                        opacity: 0.5,
                                        zIndex: 2,
                                        pointerEvents: 'none',
                                    }} />
                                ))}
                            </>
                        )}

                        {/* Level-up celebration overlay */}
                        {cardCelebration && displayedCard && (() => {
                            const cbm = Number(phraseMastery[displayedCard.id] || 0);
                            const chr = (voiceRecordings[displayedCard.id] || []).length > 0;
                            const chl = (phraseLinks[displayedCard.id] || []).length > 0;
                            const celebChakra = getChakraInfo(cbm, chr, chl);
                            return (
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    zIndex: 10, pointerEvents: 'none',
                                    borderRadius: '12px',
                                    background: `radial-gradient(circle, ${celebChakra.gradFrom}20 0%, transparent 70%)`,
                                }}>
                                    <div style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                                        animation: 'celebrate-badge 2s ease-out forwards',
                                    }}>
                                        <div style={{
                                            fontSize: isFullReview ? '18px' : '14px',
                                            fontWeight: '900',
                                            letterSpacing: '6px',
                                            color: celebChakra.color,
                                            textShadow: `0 0 24px ${celebChakra.gradFrom}90, 0 0 48px ${celebChakra.gradFrom}40, 0 2px 8px rgba(0,0,0,0.2)`,
                                        }}>
                                            レベルアップ
                                        </div>
                                        <div style={{
                                            fontSize: isFullReview ? '36px' : '26px',
                                            fontWeight: '900',
                                            letterSpacing: '3px',
                                            background: `linear-gradient(135deg, ${celebChakra.gradFrom}, ${celebChakra.gradTo})`,
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            filter: `drop-shadow(0 0 16px ${celebChakra.gradFrom}70)`,
                                        }}>
                                            {celebChakra.ja}
                                        </div>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Top Name Bar — Pokemon style [Category] [Rank] ... [GP pts] */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: isFullReview ? '8px 12px' : '6px 8px',
                            backgroundColor: `${getFrameAccent(currentCardRank.rank)}12`,
                            borderRadius: '8px 8px 0 0',
                            borderBottom: `1px solid ${getFrameAccent(currentCardRank.rank)}30`,
                            position: 'relative',
                            zIndex: 3,
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {/* Element icon */}
                                {currentPhrase && (
                                    <ElementBadge element={currentPhrase.category} size={12} />
                                )}
                                {/* Rank label */}
                                {currentCardRank.rank !== 'NORMAL' && (
                                    <span style={{
                                        fontSize: isFullReview ? '10px' : '8px',
                                        fontWeight: '800',
                                        color: currentCardRank.borderColor,
                                        letterSpacing: '1.5px',
                                    }}>
                                        {currentCardRank.label}
                                    </span>
                                )}
                            </div>
                            {/* GP points — like HP in Pokemon */}
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                                <span style={{
                                    fontSize: isFullReview ? '16px' : '12px',
                                    fontWeight: '900',
                                    color: currentCardRank.rank !== 'NORMAL' ? currentCardRank.borderColor : '#A8A29E',
                                    fontVariantNumeric: 'tabular-nums',
                                }}>
                                    {currentCardPts}
                                </span>
                                <span style={{
                                    fontSize: isFullReview ? '9px' : '7px',
                                    fontWeight: '700',
                                    color: '#A8A29E',
                                    letterSpacing: '0.5px',
                                }}>
                                    GP
                                </span>
                            </div>
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                                fontSize: isFullReview ? '10px' : '8px',
                                fontWeight: '600',
                                color: '#A8A29E',
                                marginTop: '2px',
                                width: '100%',
                            }}>
                                {currentPhrase?.date.split('T')[0]}
                            </div>
                        </div>
                        {/* Illustration Window — the "artwork" area */}
                        <div
                            onClick={() => {
                                if (!getSettings().tapToLevel) return;
                                if (cardCelebration) {
                                    setReviewHistory(prev => [...prev, cardCelebration.phrase]);
                                    setHistoryOffset(0);
                                    setCardCelebration(null);
                                    return;
                                }
                                if (!currentPhrase) return;
                                const current = Number(phraseMastery[currentPhrase.id] || 0);
                                const hasRec = (voiceRecordings[currentPhrase.id] || []).length > 0;
                                const hasLink = (phraseLinks[currentPhrase.id] || []).length > 0;
                                const isLockedToday = current === 3 || (current !== 6 && current < 3 && phraseLastLeveled[currentPhrase.id] === clientToday);
                                if (isLockedToday || current === 6) {
                                    // Locked or MASTER: just advance to next card
                                    if (historyOffset > 0) setHistoryOffset(h => h - 1);
                                    else if (reviewList.length > 0) setReviewIndex(i => (i + 1) % reviewList.length);
                                    return;
                                }
                                const next = current + 1;
                                const isLevelUp = next > current;
                                if (isLevelUp) {
                                    const nl = getChakraLevel(next, hasRec, hasLink);
                                    const nc = CHAKRA_CONFIG[nl];
                                    const k = Date.now();
                                    playLevelSound(nl);
                                    setPointEffect({ points: nc.lv, color: nc.color, gradFrom: nc.gradFrom, gradTo: nc.gradTo, levelName: nc.name, key: k });
                                    setCalendarPulse({ dateKey: currentPhrase.date.split('T')[0], points: nc.lv, gradFrom: nc.gradFrom, color: nc.color, level: nl, key: k });
                                    setCardCelebration({ phrase: currentPhrase, key: k });
                                }
                                cycleMastery(currentPhrase.id, isLevelUp);
                            }}
                            style={{
                            background: getCardWindowBg(currentCardRank.rank),
                            borderRadius: '12px',
                            border: `1px solid ${getFrameAccent(currentCardRank.rank)}30`,
                            margin: '0',
                            padding: isFullReview ? '16px' : '10px',
                            position: 'relative',
                            zIndex: 3,
                            cursor: getSettings().tapToLevel ? 'pointer' : undefined,
                        }}>
                            {/* Stats Bar: XP + Progress + Touches */}
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: isFullReview ? '32px' : '20px',
                                marginBottom: isFullReview ? '20px' : '10px',
                                padding: isFullReview ? '10px 0' : '6px 0',
                                borderBottom: `1px solid ${getFrameAccent(currentCardRank.rank)}20`,
                            }}>
                                {/* XP */}
                                <div style={{ position: 'relative', textAlign: 'center', minWidth: isFullReview ? '80px' : '50px' }}>
                                    <div style={{
                                        fontSize: isFullReview ? '36px' : '22px',
                                        fontWeight: '900',
                                        color: '#D4AF37',
                                        fontVariantNumeric: 'tabular-nums',
                                        letterSpacing: '-1px',
                                        lineHeight: 1,
                                    }}>
                                        {todayXP}
                                    </div>
                                    <div style={{
                                        fontSize: isFullReview ? '10px' : '8px',
                                        fontWeight: '700',
                                        color: '#B8860B',
                                        letterSpacing: '2px',
                                        marginTop: '4px',
                                    }}>
                                        経験値
                                    </div>
                                    {/* Floating +N XP */}
                                    {xpFloats.map(f => (
                                        <div key={f.id} style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: isFullReview ? '-8px' : '-4px',
                                            transform: 'translateX(-50%)',
                                            fontSize: isFullReview ? '18px' : '14px',
                                            fontWeight: '900',
                                            color: f.color,
                                            pointerEvents: 'none',
                                            animation: 'xp-float 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                                            textShadow: `0 0 12px ${f.color}60`,
                                            whiteSpace: 'nowrap',
                                        }}>
                                            +{f.value}
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div style={{ width: '1px', height: isFullReview ? '36px' : '24px', backgroundColor: '#e5e5e5' }} />

                                {/* Progress */}
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{
                                        fontSize: isFullReview ? '20px' : '14px',
                                        fontWeight: '700',
                                        color: '#333',
                                        fontVariantNumeric: 'tabular-nums',
                                        lineHeight: 1,
                                    }}>
                                        {reviewIndex + 1}<span style={{ color: '#ccc', fontWeight: '400' }}>/{reviewList.length}</span>
                                    </div>
                                    <div style={{
                                        fontSize: isFullReview ? '10px' : '8px',
                                        fontWeight: '600',
                                        color: '#aaa',
                                        letterSpacing: '1px',
                                        marginTop: '4px',
                                    }}>
                                        カード
                                    </div>
                                </div>

                                {/* Divider */}
                                <div style={{ width: '1px', height: isFullReview ? '36px' : '24px', backgroundColor: '#e5e5e5' }} />

                                {/* Touches */}
                                <div style={{ position: 'relative', textAlign: 'center', minWidth: isFullReview ? '80px' : '50px' }}>
                                    <div style={{
                                        fontSize: isFullReview ? '36px' : '22px',
                                        fontWeight: '900',
                                        color: '#10B981',
                                        fontVariantNumeric: 'tabular-nums',
                                        letterSpacing: '-1px',
                                        lineHeight: 1,
                                    }}>
                                        {monthlyReviewCounts[todayKey]?.count || 0}
                                    </div>
                                    <div style={{
                                        fontSize: isFullReview ? '10px' : '8px',
                                        fontWeight: '700',
                                        color: '#047857',
                                        letterSpacing: '2px',
                                        marginTop: '4px',
                                    }}>
                                        回数
                                    </div>
                                    {/* Floating +1 */}
                                    {touchFloats.map(f => (
                                        <div key={f.id} style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: isFullReview ? '-8px' : '-4px',
                                            transform: 'translateX(-50%)',
                                            fontSize: isFullReview ? '16px' : '12px',
                                            fontWeight: '800',
                                            color: '#10B981',
                                            pointerEvents: 'none',
                                            animation: 'xp-float 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                                            textShadow: '0 0 10px rgba(16, 185, 129, 0.4)',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            +1
                                        </div>
                                    ))}
                                </div>

                                {/* Divider */}
                                <div style={{ width: '1px', height: isFullReview ? '36px' : '24px', backgroundColor: '#e5e5e5' }} />

                                {/* GP — big, flashy */}
                                <div style={{
                                    textAlign: 'center',
                                    minWidth: isFullReview ? '90px' : '54px',
                                    position: 'relative',
                                }}>
                                    <div style={{
                                        fontSize: isFullReview ? '40px' : '24px',
                                        fontWeight: '900',
                                        fontVariantNumeric: 'tabular-nums',
                                        letterSpacing: '-2px',
                                        lineHeight: 1,
                                        background: 'linear-gradient(180deg, #F6C85F 0%, #D4AF37 50%, #B8860B 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        filter: 'drop-shadow(0 1px 3px rgba(212,175,55,0.3))',
                                    }}>
                                        {todaySparks.toLocaleString()}
                                    </div>
                                    <div style={{
                                        fontSize: isFullReview ? '9px' : '7px',
                                        fontWeight: '800',
                                        color: '#D4AF37',
                                        letterSpacing: '3px',
                                        marginTop: '3px',
                                    }}>
                                        スロット
                                    </div>
                                </div>
                            </div>

                            {/* English */}
                            <div style={{
                                fontSize: isFullReview ? '32px' : '16px',
                                fontWeight: '600',
                                color: '#1a1a1a',
                                marginBottom: isFullReview ? '16px' : '10px',
                                lineHeight: 1.5,
                                textAlign: 'center',
                            }}>
                                {(() => {
                                    const pid = displayedCard?.id || '';
                                    const bm = Number(phraseMastery[pid] || 0);
                                    const hr = (voiceRecordings[pid] || []).length > 0;
                                    const hl = (phraseLinks[pid] || []).length > 0;
                                    const chakra = getChakraLevel(bm, hr, hl);
                                    const text = displayedCard?.english || '';
                                    // Tap to Level: plain text, no links (whole card is tap target)
                                    if (getSettings().tapToLevel) {
                                        return <span style={{ color: '#1a1a1a' }}>{text}</span>;
                                    }
                                    if (chakra === 4) {
                                        // Lv.5 CHAMPION: copy to clipboard for research
                                        return (
                                            <span
                                                onClick={() => {
                                                    navigator.clipboard.writeText(text);
                                                    setCopiedId(displayedCard?.id || '');
                                                    setTimeout(() => setCopiedId(''), 1500);
                                                }}
                                                style={{
                                                    color: '#1a1a1a',
                                                    borderBottom: '1px dashed #3730A3',
                                                    cursor: 'copy',
                                                }}
                                                title="Click to copy (research mode)"
                                            >
                                                {text}
                                                {copiedId === displayedCard?.id && (
                                                    <span style={{
                                                        fontSize: '12px',
                                                        color: '#3730A3',
                                                        marginLeft: '8px',
                                                        fontWeight: '400',
                                                    }}>Copied!</span>
                                                )}
                                            </span>
                                        );
                                    }
                                    // All other levels: Google search
                                    const q = dataMode === 'words'
                                        ? `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(text)}`
                                        : `https://www.google.com/search?q=${encodeURIComponent(text)}`;
                                    return (
                                        <a
                                            href={q}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#1a1a1a',
                                                textDecoration: 'none',
                                                borderBottom: `1px dashed ${dataMode === 'words' ? '#D4AF37' : '#10B981'}`,
                                                cursor: 'pointer',
                                            }}
                                            title={dataMode === 'words' ? 'Google Images で検索' : 'Google で検索'}
                                        >
                                            {text}
                                        </a>
                                    );
                                })()}
                            </div>

                            {/* Japanese */}
                            <div style={{
                                fontSize: isFullReview ? '20px' : '13px',
                                color: '#666',
                                marginBottom: displayedCard?.source_id ? (isFullReview ? '16px' : '8px') : (isFullReview ? '40px' : '16px'),
                                textAlign: 'center',
                            }}>
                                {displayedCard?.japanese}
                            </div>

                            {/* Flavor Text — register to user phrases (hidden in tapToLevel mode) */}
                            {displayedCard && !getSettings().tapToLevel && (() => {
                                const flavor = getFlavorText(displayedCard.id);
                                const isSaved = savedFlavorTexts.has(flavor.en);
                                return (
                                    <div style={{
                                        padding: isFullReview ? '12px 16px' : '8px 10px',
                                        backgroundColor: isSaved ? '#F0FDF4' : '#FAFAF9',
                                        borderRadius: '10px',
                                        border: `1px solid ${isSaved ? '#BBF7D0' : '#E7E5E4'}`,
                                        marginBottom: isFullReview ? '16px' : '8px',
                                        transition: 'all 0.2s',
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            justifyContent: 'space-between',
                                            gap: '8px',
                                        }}>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{
                                                    fontSize: isFullReview ? '13px' : '11px',
                                                    fontStyle: 'italic',
                                                    color: '#78716C',
                                                    lineHeight: 1.5,
                                                }}>
                                                    &ldquo;{flavor.en}&rdquo;
                                                </div>
                                                <div style={{
                                                    fontSize: isFullReview ? '11px' : '9px',
                                                    color: '#A8A29E',
                                                    marginTop: '2px',
                                                }}>
                                                    {flavor.ja}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => saveFlavorText(flavor.en, flavor.ja)}
                                                disabled={isSaved || savingFlavorText}
                                                style={{
                                                    padding: isFullReview ? '6px 12px' : '4px 8px',
                                                    borderRadius: '6px',
                                                    border: isSaved ? '1px solid #86EFAC' : '1px solid #D4AF37',
                                                    backgroundColor: isSaved ? '#DCFCE7' : 'transparent',
                                                    color: isSaved ? '#16A34A' : '#D4AF37',
                                                    fontSize: isFullReview ? '10px' : '8px',
                                                    fontWeight: '700',
                                                    cursor: isSaved ? 'default' : savingFlavorText ? 'wait' : 'pointer',
                                                    flexShrink: 0,
                                                    transition: 'all 0.15s',
                                                    letterSpacing: '0.5px',
                                                }}
                                            >
                                                {isSaved ? 'Saved' : savingFlavorText ? '...' : 'Add'}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Linked notes on this card (hidden in tapToLevel mode) */}
                            {displayedCard && !getSettings().tapToLevel && (phraseLinks[displayedCard.id] || []).length > 0 && (
                                <div style={{
                                    padding: isFullReview ? '16px' : '10px',
                                    backgroundColor: '#F5F3FF',
                                    borderRadius: '10px',
                                    border: '1px solid #E9E5FF',
                                    marginBottom: isFullReview ? '24px' : '12px',
                                }}>
                                    <div style={{ fontSize: '10px', fontWeight: '600', color: '#8B5CF6', marginBottom: '8px', letterSpacing: '0.5px' }}>
                                        ADD ({phraseLinks[displayedCard.id].length})
                                    </div>
                                    {phraseLinks[displayedCard.id].map((link, i) => (
                                        <div key={i} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '6px 0',
                                            borderBottom: '1px solid #EDE9FE',
                                            fontSize: isFullReview ? '14px' : '12px',
                                            color: '#5B21B6',
                                        }}>
                                            <span>{link.text}</span>
                                            <button
                                                onClick={() => {
                                                    window.speechSynthesis.cancel();
                                                    const u = new SpeechSynthesisUtterance(link.text);
                                                    u.lang = 'en-US';
                                                    u.rate = 0.9;
                                                    const v = voices.find(v => v.name.includes('Google US English')) || voices[0];
                                                    if (v) u.voice = v;
                                                    window.speechSynthesis.speak(u);
                                                }}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: '4px',
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#8B5CF6">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Level Up button — full width, prominent (hidden in tapToLevel mode) */}
                            {displayedCard && !getSettings().tapToLevel && (() => {
                                const baseMastery = Number(phraseMastery[displayedCard.id] || 0);
                                const hasRec = (voiceRecordings[displayedCard.id] || []).length > 0;
                                const hasLink = (phraseLinks[displayedCard.id] || []).length > 0;
                                const chakra = getChakraInfo(baseMastery, hasRec, hasLink);
                                const isLockedToday = baseMastery === 3 || (baseMastery !== 6 && baseMastery < 3 && phraseLastLeveled[displayedCard.id] === clientToday);
                                const isCrownReady = chakra.level === 5;
                                const isMaxed = baseMastery === 3 || baseMastery === 6;
                                return (
                                    <div style={{ marginTop: isFullReview ? '8px' : '4px' }}>
                                        {isCrownReady ? (
                                            <button
                                                onClick={() => {
                                                    if (cardCelebration) return;
                                                    if (displayedCard) {
                                                        setCardCelebration({ phrase: displayedCard, key: Date.now() });
                                                    }
                                                    declareCrown(displayedCard.id);
                                                }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                                    width: '100%',
                                                    padding: isFullReview ? '18px 0' : '14px 0',
                                                    borderRadius: '14px',
                                                    border: 'none',
                                                    background: 'linear-gradient(135deg, #7E22CE, #A855F7)',
                                                    color: '#fff',
                                                    fontSize: isFullReview ? '17px' : '15px',
                                                    fontWeight: '800',
                                                    cursor: 'pointer',
                                                    letterSpacing: '2px',
                                                    boxShadow: '0 4px 16px #A855F740',
                                                    transition: 'transform 0.12s, box-shadow 0.12s',
                                                }}
                                                onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                                                onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                                CROWN
                                            </button>
                                        ) : isMaxed && !hasRec ? (
                                            /* Lv.4 needs recording: Big REC + small NEXT */
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                                                {(() => {
                                                    const recState = recordingStateForCard;
                                                    return (
                                                        <button
                                                            onClick={() => {
                                                                if (recState === 'uploading') return;
                                                                if (recState === 'recording') {
                                                                    if (inlineMediaRecorderRef.current) { inlineMediaRecorderRef.current.stop(); setRecordingStateForCard('uploading'); }
                                                                } else {
                                                                    (async () => {
                                                                        try {
                                                                            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                                                                            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
                                                                            const mr = new MediaRecorder(stream, { mimeType });
                                                                            const chunks: Blob[] = [];
                                                                            mr.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
                                                                            mr.onstop = async () => {
                                                                                stream.getTracks().forEach(t => t.stop());
                                                                                const blob = new Blob(chunks, { type: mimeType });
                                                                                const pid = displayedCard.id;
                                                                                const fd = new FormData();
                                                                                fd.append('audio', blob, 'recording.webm');
                                                                                fd.append('phraseId', pid);
                                                                                try {
                                                                                    const res = await fetch('/api/voice-recordings', { method: 'POST', body: fd });
                                                                                    const data = await res.json();
                                                                                    if (data.success && data.recording) {
                                                                                        const prevRecs = voiceRecordings[pid] || [];
                                                                                        const wasFirst = prevRecs.length === 0;
                                                                                        setVoiceRecordings(prev => ({ ...prev, [pid]: [data.recording, ...(prev[pid] || [])] }));
                                                                                        const bm = Number(phraseMastery[pid] || 0);
                                                                                        const hl = (phraseLinks[pid] || []).length > 0;
                                                                                        const lvB = getChakraLevel(bm, !wasFirst, hl);
                                                                                        const lvA = getChakraLevel(bm, true, hl);
                                                                                        const xp = lvA > lvB ? CHAKRA_CONFIG[lvA].lv : 0;
                                                                                        if (xp > 0) {
                                                                                            postXP(new Date().toISOString().split('T')[0], xp, false, pid);
                                                                                            // Full level-up effects (same as normal level-up)
                                                                                            const nc = CHAKRA_CONFIG[lvA];
                                                                                            const k = Date.now();
                                                                                            playLevelSound(lvA);
                                                                                            setPointEffect({ points: nc.lv, color: nc.color, gradFrom: nc.gradFrom, gradTo: nc.gradTo, levelName: nc.name, key: k });
                                                                                            setCalendarPulse({ dateKey: displayedCard.date.split('T')[0], points: nc.lv, gradFrom: nc.gradFrom, color: nc.color, level: lvA, key: k });
                                                                                            setCardCelebration({ phrase: displayedCard, key: k });
                                                                                            // Register card to GOD GRID
                                                                                            const pts = cardPoints[pid] || 0;
                                                                                            const rank = pts >= 250 ? 'LEGENDARY' : pts >= 100 ? 'HOLOGRAPHIC' : pts >= 50 ? 'GOLD' : pts >= 20 ? 'SILVER' : pts >= 5 ? 'BRONZE' : 'NORMAL';
                                                                                            setPuzzleDropCard({ phraseId: pid, english: displayedCard.english, japanese: displayedCard.japanese, element: displayedCard.category, rank, points: pts, bstTotal: calcBstTotal(pid), key: k });
                                                                                        }
                                                                                        if (data.recording.url) {
                                                                                            setRecordAutoPlayId(null);
                                                                                        }
                                                                                    }
                                                                                } catch (err) { console.error('Upload failed:', err); }
                                                                                setRecordingStateForCard('idle');
                                                                            };
                                                                            inlineMediaRecorderRef.current = mr; mr.start(); setRecordingStateForCard('recording');
                                                                        } catch (err) { console.error('Mic denied:', err); alert('マイクへのアクセスが許可されていません'); }
                                                                    })();
                                                                }
                                                            }}
                                                            style={{
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                                flex: 1, padding: isFullReview ? '14px 0' : '11px 0', borderRadius: '14px',
                                                                border: recState === 'recording' ? '2px solid #dc2626' : 'none',
                                                                background: recState === 'recording' ? '#fef2f2' : recState === 'uploading' ? '#E7E5E4' : 'linear-gradient(135deg, #fbbf24, #d97706)',
                                                                color: recState === 'recording' ? '#dc2626' : recState === 'uploading' ? '#A8A29E' : '#fff',
                                                                fontSize: isFullReview ? '15px' : '13px', fontWeight: '800',
                                                                cursor: recState === 'uploading' ? 'not-allowed' : 'pointer', letterSpacing: '2px',
                                                                boxShadow: recState === 'recording' ? '0 0 0 4px rgba(220,38,38,0.15)' : recState === 'uploading' ? 'none' : '0 4px 16px #d9770640',
                                                                transition: 'transform 0.12s, box-shadow 0.12s',
                                                            }}
                                                            className={recState === 'recording' ? 'recording-pulse' : undefined}
                                                            onMouseDown={e => { if (recState !== 'uploading') e.currentTarget.style.transform = 'scale(0.97)'; }}
                                                            onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                                        >
                                                            {recState === 'recording' ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="#dc2626"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>STOP</>)
                                                            : recState === 'uploading' ? (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>...</>)
                                                            : (<><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>REC</>)}
                                                        </button>
                                                    );
                                                })()}
                                                <button onClick={() => { if (cardCelebration) { setReviewHistory(prev => [...prev, cardCelebration.phrase]); setHistoryOffset(0); setCardCelebration(null); return; } if (historyOffset > 0) setHistoryOffset(h => h - 1); else if (reviewList.length > 0) setReviewIndex(i => (i + 1) % reviewList.length); }}
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isFullReview ? '52px' : '44px', padding: isFullReview ? '14px 0' : '11px 0', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg, #D4AF37, #B8941E)', color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px #D4AF3730', transition: 'transform 0.12s', flexShrink: 0 }}
                                                    onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)'; }} onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} title="次のカード"
                                                ><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></button>
                                            </div>
                                        ) : isMaxed && hasRec && !hasLink ? (
                                            /* Lv.5 has recording, needs link: Big 研究 + small NEXT */
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                                                <button
                                                    onClick={() => setShowQuickAdd(!showQuickAdd)}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                                        flex: 1, padding: isFullReview ? '14px 0' : '11px 0', borderRadius: '14px', border: 'none',
                                                        background: showQuickAdd ? 'linear-gradient(135deg, #92400E, #78350F)' : 'linear-gradient(135deg, #D4AF37, #B8941E)',
                                                        color: '#fff', fontSize: isFullReview ? '15px' : '13px', fontWeight: '800',
                                                        cursor: 'pointer', letterSpacing: '2px',
                                                        boxShadow: '0 4px 16px #D4AF3740', transition: 'transform 0.12s, box-shadow 0.12s',
                                                    }}
                                                    onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.97)'; }}
                                                    onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                                                    {showQuickAdd ? 'CLOSE' : '研究'}
                                                </button>
                                                <button onClick={() => { if (cardCelebration) { setReviewHistory(prev => [...prev, cardCelebration.phrase]); setHistoryOffset(0); setCardCelebration(null); return; } if (historyOffset > 0) setHistoryOffset(h => h - 1); else if (reviewList.length > 0) setReviewIndex(i => (i + 1) % reviewList.length); }}
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: isFullReview ? '52px' : '44px', padding: isFullReview ? '14px 0' : '11px 0', borderRadius: '14px', border: 'none', background: 'linear-gradient(135deg, #D4AF37, #B8941E)', color: '#fff', cursor: 'pointer', boxShadow: '0 2px 8px #D4AF3730', transition: 'transform 0.12s', flexShrink: 0 }}
                                                    onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)'; }} onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }} title="次のカード"
                                                ><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg></button>
                                            </div>
                                        ) : isMaxed ? (
                                            /* Lv.7 MASTER — fully complete */
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: '100%', padding: isFullReview ? '12px 0' : '10px 0', borderRadius: '14px', backgroundColor: '#F5F5F4', color: '#A8A29E', fontSize: isFullReview ? '13px' : '11px', fontWeight: '700', letterSpacing: '2px' }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A8A29E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                COMPLETE
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'stretch' }}>
                                                <button
                                                    onClick={() => {
                                                        if (isLockedToday || cardCelebration) return;
                                                        const currentPhrase = displayedCard;
                                                        if (!currentPhrase) return;
                                                        const current = Number(phraseMastery[currentPhrase.id] || 0);
                                                        if (current === 3) return;
                                                        const next = current === 6 ? 0 : (current + 1);
                                                        const isLevelUp = next > 0 && next > current;

                                                        if (isLevelUp) {
                                                            const nl = getChakraLevel(next, hasRec, hasLink);
                                                            const nc = CHAKRA_CONFIG[nl];
                                                            const k = Date.now();
                                                            playLevelSound(nl);
                                                            setPointEffect({
                                                                points: nc.lv,
                                                                color: nc.color,
                                                                gradFrom: nc.gradFrom,
                                                                gradTo: nc.gradTo,
                                                                levelName: nc.name,
                                                                key: k,
                                                            });
                                                            setCalendarPulse({
                                                                dateKey: currentPhrase.date.split('T')[0],
                                                                points: nc.lv,
                                                                gradFrom: nc.gradFrom,
                                                                color: nc.color,
                                                                level: nl,
                                                                key: k,
                                                            });
                                                        }

                                                        if (isLevelUp) {
                                                            setCardCelebration({ phrase: currentPhrase, key: Date.now() });
                                                        }
                                                        cycleMastery(currentPhrase.id, isLevelUp);
                                                    }}
                                                    style={{
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                                        flex: 1,
                                                        padding: isFullReview ? '14px 0' : '11px 0',
                                                        borderRadius: '14px',
                                                        border: 'none',
                                                        background: isLockedToday
                                                            ? '#E7E5E4'
                                                            : `linear-gradient(135deg, ${chakra.gradFrom}, ${chakra.color})`,
                                                        color: isLockedToday ? '#A8A29E' : '#fff',
                                                        fontSize: isFullReview ? '17px' : '15px',
                                                        fontWeight: '800',
                                                        cursor: isLockedToday ? 'not-allowed' : 'pointer',
                                                        letterSpacing: '2px',
                                                        boxShadow: isLockedToday ? 'none' : `0 4px 16px ${chakra.color}40`,
                                                        transition: 'transform 0.12s, box-shadow 0.12s',
                                                    }}
                                                    onMouseDown={e => { if (!isLockedToday) e.currentTarget.style.transform = 'scale(0.97)'; }}
                                                    onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                                                >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="18 15 12 9 6 15" />
                                                    </svg>
                                                    Lv.{chakra.level + 1} {chakra.ja} {chakra.name}
                                                </button>
                                                {(() => {
                                                    const isPlaying = playingPhraseId === displayedCard.id;
                                                    return (
                                                        <button
                                                            onClick={() => {
                                                                if (isPlaying) {
                                                                    window.speechSynthesis.cancel();
                                                                    setPlayingPhraseId(null);
                                                                } else {
                                                                    playPhrase(displayedCard);
                                                                }
                                                            }}
                                                            style={{
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                width: isFullReview ? '44px' : '38px',
                                                                height: isFullReview ? '44px' : '38px',
                                                                borderRadius: '50%',
                                                                border: isPlaying ? '2px solid #D4AF37' : '1px solid #E7E5E4',
                                                                background: isPlaying ? '#FFFBEB' : '#FAFAF9',
                                                                color: isPlaying ? '#B8941E' : '#A8A29E',
                                                                cursor: 'pointer',
                                                                transition: 'all 0.15s',
                                                                flexShrink: 0,
                                                                padding: 0,
                                                            }}
                                                            onMouseEnter={e => {
                                                                if (!isPlaying) {
                                                                    e.currentTarget.style.borderColor = '#D4AF37';
                                                                    e.currentTarget.style.background = '#FFFBEB';
                                                                    e.currentTarget.style.color = '#92400E';
                                                                }
                                                            }}
                                                            onMouseLeave={e => {
                                                                if (!isPlaying) {
                                                                    e.currentTarget.style.borderColor = '#E7E5E4';
                                                                    e.currentTarget.style.background = '#FAFAF9';
                                                                    e.currentTarget.style.color = '#A8A29E';
                                                                }
                                                            }}
                                                        >
                                                            {isPlaying ? (
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                                    <rect x="6" y="4" width="4" height="16" rx="1" />
                                                                    <rect x="14" y="4" width="4" height="16" rx="1" />
                                                                </svg>
                                                            ) : (
                                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                                                    <path d="M8 5v14l11-7z" />
                                                                </svg>
                                                            )}
                                                        </button>
                                                    );
                                                })()}
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}
                        </div>{/* End Illustration Window */}

                        {/* XP Bars Section — between window and attacks */}
                        <div style={{
                            padding: isFullReview ? '12px 8px 8px' : '8px 4px 4px',
                            position: 'relative',
                            zIndex: 3,
                        }}>
                            {/* Daily Milestone XP Bar */}
                            {(() => {
                                const dCurrentXP = currentMilestoneIndex >= 0 ? scaledMilestones[currentMilestoneIndex].xp : 0;
                                const dNextXP = currentMilestoneIndex < scaledMilestones.length - 1
                                    ? scaledMilestones[currentMilestoneIndex + 1].xp : goalXP;
                                const dXpInto = todayXP - dCurrentXP;
                                const dXpNeeded = dNextXP - dCurrentXP;
                                const dProgress = dXpNeeded > 0 ? Math.min(dXpInto / dXpNeeded, 1) : 1;
                                const dAlmost = dProgress >= 0.9 && dProgress < 1;
                                return (
                                    <div style={{
                                        marginBottom: isFullReview ? '8px' : '4px',
                                        position: 'relative',
                                    }}>
                                        <div style={{
                                            display: 'flex', alignItems: 'baseline', gap: '6px',
                                            marginBottom: isFullReview ? '6px' : '3px',
                                        }}>
                                            <span style={{
                                                fontSize: isFullReview ? '9px' : '7px',
                                                fontWeight: '700',
                                                color: '#bbb',
                                                letterSpacing: '1.5px',
                                            }}>本日</span>
                                            <span style={{
                                                fontSize: isFullReview ? '16px' : '12px',
                                                fontWeight: '900',
                                                color: dailyTitle.color,
                                                letterSpacing: '-0.5px',
                                            }}>
                                                Lv.{currentMilestoneIndex + 2}
                                            </span>
                                            <span style={{
                                                fontSize: isFullReview ? '12px' : '9px',
                                                fontWeight: '700',
                                                color: dailyTitle.color,
                                            }}>
                                                {dailyTitle.title}
                                            </span>
                                            <span style={{
                                                fontSize: isFullReview ? '10px' : '7px',
                                                fontWeight: '600',
                                                color: '#ccc',
                                                fontVariantNumeric: 'tabular-nums',
                                                marginLeft: 'auto',
                                            }}>
                                                {todayXP.toLocaleString()}<span style={{ color: '#e5e5e5' }}>/{dNextXP.toLocaleString()}</span>
                                            </span>
                                        </div>
                                        <div style={{
                                            height: isFullReview ? '10px' : '6px',
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: '999px',
                                            overflow: 'hidden',
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${Math.max(dProgress * 100, 2)}%`,
                                                background: `linear-gradient(90deg, ${dailyTitle.color}55, ${dailyTitle.color})`,
                                                borderRadius: '999px',
                                                transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                                                ...(dAlmost ? { animation: 'xp-bar-pulse 1.5s ease-in-out infinite' } : {}),
                                            }} />
                                        </div>
                                        {dailyLevelUpEffect && (
                                            <div style={{
                                                position: 'absolute',
                                                right: isFullReview ? '16px' : '10px',
                                                top: '0',
                                                fontSize: isFullReview ? '14px' : '10px',
                                                fontWeight: '900',
                                                color: dailyLevelUpEffect.color,
                                                textShadow: `0 0 20px ${dailyLevelUpEffect.color}80`,
                                                animation: 'xp-float 1.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                                                pointerEvents: 'none',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                レベルアップ!
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}

                            {/* Overall Level */}
                            {(() => {
                                const titleInfo = getTitleForLevel(playerLevel);
                                const currentLevelXP = xpForLevel(playerLevel);
                                const nextLevelXP = xpForLevel(playerLevel + 1);
                                const xpIntoLevel = playerTotalXP - currentLevelXP;
                                const xpNeeded = nextLevelXP - currentLevelXP;
                                const progress = xpNeeded > 0 ? Math.min(xpIntoLevel / xpNeeded, 1) : 1;
                                return (
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: isFullReview ? '8px' : '6px',
                                        opacity: 0.5,
                                    }}>
                                        <div style={{
                                            flexShrink: 0,
                                            fontSize: isFullReview ? '9px' : '7px',
                                            fontWeight: '700',
                                            color: titleInfo.color,
                                            whiteSpace: 'nowrap',
                                        }}>
                                            Lv.{playerLevel} {titleInfo.title}
                                        </div>
                                        <div style={{
                                            flex: 1, height: isFullReview ? '3px' : '2px',
                                            backgroundColor: '#f0f0f0',
                                            borderRadius: '999px',
                                            overflow: 'hidden',
                                        }}>
                                            <div style={{
                                                height: '100%',
                                                width: `${Math.max(progress * 100, 2)}%`,
                                                background: titleInfo.color,
                                                borderRadius: '999px',
                                                transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                                            }} />
                                        </div>
                                        <div style={{
                                            flexShrink: 0,
                                            fontSize: isFullReview ? '8px' : '6px',
                                            fontWeight: '600',
                                            color: '#bbb',
                                            fontVariantNumeric: 'tabular-nums',
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {playerTotalXP.toLocaleString()}/{nextLevelXP.toLocaleString()}
                                        </div>
                                    </div>
                                );
                            })()}

                            {/* Luck + GP indicator */}
                            {luckMultiplier > 1 && (
                                <div style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                    marginTop: '2px', opacity: 0.4,
                                }}>
                                    <span style={{
                                        fontSize: isFullReview ? '8px' : '6px',
                                        fontWeight: '700',
                                        color: '#D4AF37',
                                        letterSpacing: '0.5px',
                                    }}>
                                        LUCK x{luckMultiplier.toFixed(2)}
                                    </span>
                                    <span style={{
                                        fontSize: isFullReview ? '8px' : '6px',
                                        fontWeight: '600',
                                        color: '#A8A29E',
                                    }}>
                                        {playerSparks.toLocaleString()} GP
                                    </span>
                                </div>
                            )}

                            {/* Separator */}
                            <div style={{
                                height: '1px',
                                backgroundColor: `${getFrameAccent(currentCardRank.rank)}25`,
                                margin: isFullReview ? '10px 0' : '6px 0',
                            }} />
                        </div>{/* End XP Bars Section */}

                        {/* Writing Practice Panel */}
                        {showQuickAdd && displayedCard && (() => {
                            const targetText = displayedCard.english || '';
                            const inputVal = quickAddEnglish;
                            const useExactMatch = dataMode === 'words' || getSettings().typingMatch;
                            const isMatch = useExactMatch
                                ? inputVal.trim().toLowerCase() === targetText.trim().toLowerCase()
                                : false;
                            const hasFreeText = !useExactMatch && inputVal.trim().length > 0;
                            let hasError = false;
                            if (useExactMatch && inputVal.length > 0) {
                                const inputLower = inputVal.toLowerCase();
                                const targetLower = targetText.toLowerCase();
                                for (let i = 0; i < inputLower.length && i < targetLower.length; i++) {
                                    if (inputLower[i] !== targetLower[i]) { hasError = true; break; }
                                }
                                if (inputLower.length > targetLower.length) hasError = true;
                            }
                            const borderColor = isMatch ? '#10B981' : hasError ? '#EF4444' : hasFreeText ? '#10B981' : '#D4AF37';
                            const bgColor = isMatch ? '#F0FDF4' : hasError ? '#FEF2F2' : hasFreeText ? '#F0FDF4' : '#FFFBEB';
                            return (
                                <div style={{
                                    borderRadius: '14px',
                                    border: `2px solid ${borderColor}`,
                                    backgroundColor: bgColor,
                                    padding: isFullReview ? '20px' : '14px',
                                    margin: isFullReview ? '8px 8px 4px' : '6px 4px 2px',
                                    transition: 'all 0.2s',
                                    position: 'relative',
                                    zIndex: 3,
                                }}>
                                    {/* Header */}
                                    <div style={{
                                        fontSize: isFullReview ? '10px' : '9px',
                                        fontWeight: '700',
                                        color: '#A8A29E',
                                        letterSpacing: '1.5px',
                                        marginBottom: '8px',
                                    }}>
                                        {useExactMatch ? 'TYPING' : 'WRITING'}
                                    </div>
                                    {/* Target phrase: char-by-char highlight for exact match, plain for free */}
                                    {useExactMatch ? (
                                        <div style={{
                                            fontSize: isFullReview ? '22px' : '16px',
                                            fontWeight: '600',
                                            color: '#1C1917',
                                            lineHeight: 1.5,
                                            marginBottom: isFullReview ? '16px' : '12px',
                                            letterSpacing: '0.3px',
                                            userSelect: 'none',
                                        }}>
                                            {targetText.split('').map((ch, i) => (
                                                <span key={i} style={{
                                                    color: i < inputVal.length
                                                        ? (inputVal[i]?.toLowerCase() === ch.toLowerCase() ? '#10B981' : '#EF4444')
                                                        : '#D6D3D1',
                                                    transition: 'color 0.1s',
                                                }}>{ch}</span>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{
                                            fontSize: isFullReview ? '18px' : '14px',
                                            fontWeight: '600',
                                            color: '#57534E',
                                            lineHeight: 1.5,
                                            marginBottom: isFullReview ? '12px' : '8px',
                                        }}>
                                            {targetText}
                                        </div>
                                    )}
                                    {/* Typing input */}
                                    <textarea
                                        value={quickAddEnglish}
                                        onChange={e => setQuickAddEnglish(e.target.value.replace(/\n/g, ''))}
                                        placeholder={useExactMatch ? 'Type the phrase above...' : 'Write your own sentence using this phrase...'}
                                        autoFocus
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                if (useExactMatch ? isMatch : hasFreeText) handleQuickAdd();
                                            }
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: isFullReview ? '16px' : '12px',
                                            borderRadius: '10px',
                                            border: (isMatch || hasFreeText) ? '2px solid #10B981' : hasError ? '2px solid #FCA5A5' : '1px solid #E7E5E4',
                                            fontSize: isFullReview ? '20px' : '15px',
                                            fontWeight: '500',
                                            outline: 'none',
                                            backgroundColor: '#fff',
                                            color: '#1C1917',
                                            resize: 'none',
                                            minHeight: isFullReview ? '60px' : '48px',
                                            boxSizing: 'border-box',
                                            fontFamily: 'inherit',
                                            transition: 'border-color 0.2s',
                                        }}
                                    />
                                    {/* Status + Save */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: isFullReview ? '12px' : '8px',
                                    }}>
                                        <div style={{
                                            fontSize: isFullReview ? '12px' : '10px',
                                            fontWeight: '600',
                                            color: (isMatch || hasFreeText) ? '#10B981' : hasError ? '#EF4444' : '#A8A29E',
                                        }}>
                                            {useExactMatch
                                                ? (isMatch ? 'Perfect match!' : hasError ? 'Typo detected' : `${inputVal.length} / ${targetText.length}`)
                                                : (hasFreeText ? `${inputVal.trim().length} chars` : 'Write anything...')
                                            }
                                        </div>
                                        <button
                                            onClick={handleQuickAdd}
                                            disabled={quickAddSubmitting || (useExactMatch ? !isMatch : !hasFreeText)}
                                            style={{
                                                padding: isFullReview ? '10px 24px' : '8px 18px',
                                                borderRadius: '10px',
                                                border: 'none',
                                                backgroundColor: (isMatch || hasFreeText) ? '#10B981' : '#E7E5E4',
                                                color: (isMatch || hasFreeText) ? '#fff' : '#A8A29E',
                                                fontSize: isFullReview ? '14px' : '12px',
                                                fontWeight: '700',
                                                cursor: (isMatch || hasFreeText) ? 'pointer' : 'not-allowed',
                                                letterSpacing: '1px',
                                                transition: 'all 0.2s',
                                                boxShadow: (isMatch || hasFreeText) ? '0 4px 12px rgba(16,185,129,0.3)' : 'none',
                                            }}
                                        >
                                            {quickAddSubmitting ? '...' : (isMatch || hasFreeText) ? 'LEVEL UP' : 'SAVE'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })()}

                        {/* Actions row: 削除 / 編集 / 研究 / 録音 (hidden in tapToLevel mode) */}
                        {displayedCard && !getSettings().tapToLevel && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: isFullReview ? '6px' : '4px',
                                padding: isFullReview ? '2px 12px 10px' : '2px 8px 6px',
                                position: 'relative',
                                zIndex: 3,
                            }}>
                                <button
                                    onClick={() => handleDeletePhrase(displayedCard.id)}
                                    style={{
                                        background: '#FEF2F2',
                                        border: '1px solid #FECACA',
                                        color: '#EF4444',
                                        fontSize: isFullReview ? '11px' : '10px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        padding: isFullReview ? '6px 14px' : '5px 10px',
                                        borderRadius: '5px',
                                        transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#FEE2E2'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#FEF2F2'; }}
                                >
                                    削除
                                </button>
                                <button
                                    onClick={() => {
                                        const p = displayedCard;
                                        setEditingPhrase({ id: p.id, english: p.english, japanese: p.japanese });
                                    }}
                                    style={{
                                        background: '#EFF6FF',
                                        border: '1px solid #BFDBFE',
                                        color: '#3B82F6',
                                        fontSize: isFullReview ? '11px' : '10px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        padding: isFullReview ? '6px 14px' : '5px 10px',
                                        borderRadius: '5px',
                                        transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#DBEAFE'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#EFF6FF'; }}
                                >
                                    編集
                                </button>
                                <button
                                    onClick={() => setShowQuickAdd(!showQuickAdd)}
                                    style={{
                                        padding: isFullReview ? '6px 14px' : '5px 10px',
                                        borderRadius: '5px',
                                        border: showQuickAdd ? '2px solid #D4AF37' : '1px solid #ddd',
                                        backgroundColor: showQuickAdd ? '#FFFBEB' : 'transparent',
                                        color: showQuickAdd ? '#D4AF37' : '#888',
                                        fontSize: isFullReview ? '11px' : '10px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {showQuickAdd ? 'Close' : '研究'}
                                </button>
                                {/* TTS auto-voice button */}
                                {displayedCard && (() => {
                                    const isTTSPlaying = playingPhraseId === displayedCard.id;
                                    return (
                                        <button
                                            onClick={() => {
                                                if (isTTSPlaying) { window.speechSynthesis.cancel(); setPlayingPhraseId(null); }
                                                else { playPhrase(displayedCard); }
                                            }}
                                            style={{
                                                padding: isFullReview ? '6px 14px' : '5px 10px', borderRadius: '5px',
                                                border: isTTSPlaying ? '2px solid #3B82F6' : '1px solid #ddd',
                                                backgroundColor: isTTSPlaying ? '#DBEAFE' : 'transparent',
                                                color: isTTSPlaying ? '#2563EB' : '#888',
                                                fontSize: isFullReview ? '11px' : '10px', fontWeight: '600', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.15s',
                                            }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor"/>
                                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                                            </svg>
                                            {isTTSPlaying ? '停止' : '自動'}
                                        </button>
                                    );
                                })()}
                                {/* Play recorded voice + delete button */}
                                {displayedCard && (voiceRecordings[displayedCard.id] || []).length > 0 && (() => {
                                    const latestRec = (voiceRecordings[displayedCard.id] || [])[0];
                                    const isAutoPlaying = recordAutoPlayId === displayedCard.id;
                                    return (
                                        <>
                                            <button
                                                onClick={() => {
                                                    if (isAutoPlaying) {
                                                        if (inlinePlaybackAudioRef.current) { inlinePlaybackAudioRef.current.pause(); inlinePlaybackAudioRef.current = null; }
                                                        setRecordAutoPlayId(null);
                                                    } else {
                                                        if (inlinePlaybackAudioRef.current) inlinePlaybackAudioRef.current.pause();
                                                        const audio = new Audio(latestRec.url);
                                                        inlinePlaybackAudioRef.current = audio;
                                                        setRecordAutoPlayId(displayedCard.id);
                                                        audio.onended = () => { setRecordAutoPlayId(null); inlinePlaybackAudioRef.current = null; };
                                                        audio.play().catch(() => setRecordAutoPlayId(null));
                                                    }
                                                }}
                                                style={{
                                                    padding: isFullReview ? '6px 14px' : '5px 10px', borderRadius: '5px',
                                                    border: isAutoPlaying ? '2px solid #10B981' : '1px solid #ddd',
                                                    backgroundColor: isAutoPlaying ? '#D1FAE5' : 'transparent',
                                                    color: isAutoPlaying ? '#059669' : '#888',
                                                    fontSize: isFullReview ? '11px' : '10px', fontWeight: '600', cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.15s',
                                                }}
                                            >
                                                {isAutoPlaying ? (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                                                ) : (
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>
                                                )}
                                                {isAutoPlaying ? '停止' : '録音'}
                                            </button>
                                            <button
                                                onClick={async () => {
                                                    if (!confirm('この録音を削除しますか？')) return;
                                                    try {
                                                        const res = await fetch(`/api/voice-recordings?id=${latestRec.id}&url=${encodeURIComponent(latestRec.url)}`, { method: 'DELETE' });
                                                        const data = await res.json();
                                                        if (data.success) {
                                                            setVoiceRecordings(prev => ({
                                                                ...prev,
                                                                [displayedCard.id]: (prev[displayedCard.id] || []).filter(r => r.id !== latestRec.id),
                                                            }));
                                                        }
                                                    } catch (err) { console.error('Delete failed:', err); }
                                                }}
                                                title="録音を削除"
                                                style={{
                                                    width: '24px', height: '24px', borderRadius: '50%', border: 'none',
                                                    background: 'transparent', color: '#ccc', cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ccc'; }}
                                            >
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                                            </button>
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                        {/* Bottom Bar — Pokemon weakness/resistance style */}
                        {(() => {
                            const titleInfo = getTitleForLevel(playerLevel);
                            const _bm = displayedCard ? Number(phraseMastery[displayedCard.id] || 0) : 0;
                            const _hr = displayedCard ? (voiceRecordings[displayedCard.id] || []).length > 0 : false;
                            const _hl = displayedCard ? (phraseLinks[displayedCard.id] || []).length > 0 : false;
                            const _chakra = getChakraInfo(_bm, _hr, _hl);
                            return (
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: isFullReview ? '8px 12px' : '6px 8px',
                                    backgroundColor: `${getFrameAccent(currentCardRank.rank)}08`,
                                    borderRadius: '0 0 8px 8px',
                                    borderTop: `1px solid ${getFrameAccent(currentCardRank.rank)}20`,
                                    position: 'relative',
                                    zIndex: 3,
                                }}>
                                    {/* Left: Chakra level badge + dots */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '6px',
                                        minWidth: isFullReview ? '70px' : '50px',
                                    }}>
                                        <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                                            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                                                <div key={i} style={{
                                                    width: isFullReview ? '5px' : '4px',
                                                    height: isFullReview ? '5px' : '4px',
                                                    borderRadius: '50%',
                                                    backgroundColor: i <= _chakra.level ? _chakra.color : '#D6D3D1',
                                                    transition: 'background-color 0.3s',
                                                }} />
                                            ))}
                                        </div>
                                        <span style={{
                                            fontSize: isFullReview ? '9px' : '7px',
                                            fontWeight: '700',
                                            color: _chakra.color,
                                            whiteSpace: 'nowrap',
                                        }}>
                                            {_chakra.ja}
                                        </span>
                                    </div>
                                    {/* Center: CARD counter + BST */}
                                    <div style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                    }}>
                                        <span style={{
                                            fontSize: isFullReview ? '11px' : '9px',
                                            fontWeight: '600',
                                            color: historyOffset > 0 ? '#D4AF37' : '#A8A29E',
                                            fontVariantNumeric: 'tabular-nums',
                                        }}>
                                            {historyOffset > 0 ? `戻り ${historyOffset}` : `カード ${reviewIndex + 1}/${reviewList.length}`}
                                        </span>
                                        {currentPhrase && (() => {
                                            const bst = calcBstTotal(currentPhrase.id);
                                            const bt = getBstTier(bst);
                                            return (
                                                <span style={{
                                                    fontSize: isFullReview ? '10px' : '8px',
                                                    fontWeight: '800',
                                                    color: bt.color,
                                                    padding: '1px 5px',
                                                    borderRadius: '4px',
                                                    backgroundColor: bt.color + '15',
                                                }}>
                                                    {bt.tier}{bst}
                                                </span>
                                            );
                                        })()}
                                    </div>
                                    {/* Right: Prev / Next */}
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button
                                            onClick={() => {
                                                if (cardCelebration) {
                                                    // Skip celebration: advance immediately
                                                    setReviewHistory(prev => [...prev, cardCelebration.phrase]);
                                                    setHistoryOffset(0);
                                                    setCardCelebration(null);
                                                    return;
                                                }
                                                if (historyOffset < reviewHistory.length) {
                                                    setHistoryOffset(h => h + 1);
                                                } else if (reviewList.length > 0) {
                                                    setReviewIndex(i => (i - 1 + reviewList.length) % reviewList.length);
                                                }
                                            }}
                                            style={{
                                                padding: isFullReview ? '6px 14px' : '4px 10px',
                                                borderRadius: '5px',
                                                border: `1px solid ${historyOffset < reviewHistory.length ? '#D4AF37' : getFrameAccent(currentCardRank.rank)}30`,
                                                backgroundColor: historyOffset < reviewHistory.length ? '#FFFBEB' : 'transparent',
                                                fontSize: isFullReview ? '11px' : '9px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                color: historyOffset < reviewHistory.length ? '#D4AF37' : '#78716C',
                                            }}
                                        >
                                            前{reviewHistory.length > 0 ? ` (${reviewHistory.length})` : ''}
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (cardCelebration) {
                                                    // Skip celebration: advance immediately
                                                    setReviewHistory(prev => [...prev, cardCelebration.phrase]);
                                                    setHistoryOffset(0);
                                                    setCardCelebration(null);
                                                    return;
                                                }
                                                if (historyOffset > 0) {
                                                    setHistoryOffset(h => h - 1);
                                                } else if (reviewList.length > 0) {
                                                    setReviewIndex(i => (i + 1) % reviewList.length);
                                                }
                                            }}
                                            style={{
                                                padding: isFullReview ? '6px 14px' : '4px 10px',
                                                borderRadius: '5px',
                                                border: 'none',
                                                backgroundColor: getFrameAccent(currentCardRank.rank),
                                                color: '#fff',
                                                fontSize: isFullReview ? '11px' : '9px',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            次
                                        </button>
                                    </div>
                                </div>
                            );
                        })()}
                    </div>
                ) : (
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        padding: '30px',
                        textAlign: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    }}>
                        <div style={{ fontSize: '14px', color: '#888' }}>
                            復習するフレーズがありません
                        </div>
                    </div>
                )}

                {/* Filter Tabs */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '6px',
                }}>
                    {[
                        { key: 'all' as const, label: 'ALL', count: thisMonthReviewPhrases.total.length, color: '#78716C', accent: '#78716C' },
                        { key: 'random' as const, label: 'SHUFFLE', count: thisMonthReviewPhrases.all.length, color: '#D4AF37', accent: '#D4AF37' },
                        ...([0, 1, 2, 3, 4, 5, 6] as const).map(k => ({
                            key: k,
                            label: `${CHAKRA_CONFIG[k].ja} ${CHAKRA_CONFIG[k].name}`,
                            count: thisMonthReviewPhrases[`level${k}` as keyof typeof thisMonthReviewPhrases].length,
                            color: CHAKRA_CONFIG[k].color,
                            accent: CHAKRA_CONFIG[k].color,
                        })),
                    ].map(tab => {
                        const isActive = reviewFilter === tab.key;
                        return (
                            <button
                                key={tab.key}
                                onClick={() => {
                                    if (tab.key === 'random') {
                                        setReviewFilter('random');
                                        if (!shuffledToday) handleShuffle();
                                        else { setReviewIndex(0); setReviewHistory([]); setHistoryOffset(0); }
                                    } else {
                                        setReviewFilter(tab.key); setReviewIndex(0); setReviewHistory([]); setHistoryOffset(0);
                                    }
                                }}
                                style={{
                                    padding: isFullReview ? '10px 8px' : '8px 6px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    backgroundColor: isActive ? '#1C1917' : '#F5F5F4',
                                    cursor: tab.key === 'random' && shuffledToday && isActive ? 'default' : 'pointer',
                                    opacity: tab.key === 'random' && shuffledToday && isActive ? 0.7 : 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '2px',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <span style={{
                                    fontSize: isFullReview ? '18px' : '15px',
                                    fontWeight: '800',
                                    color: isActive ? '#fff' : tab.color,
                                    lineHeight: 1,
                                    fontVariantNumeric: 'tabular-nums',
                                    display: 'flex',
                                    alignItems: 'baseline',
                                    justifyContent: 'center',
                                    gap: '3px',
                                }}>
                                    {tab.count}
                                    {tab.key === 'random' && remainingClicks > 0 && (
                                        <span style={{
                                            fontSize: isFullReview ? '11px' : '10px',
                                            fontWeight: '700',
                                            color: isActive ? '#FBBF24' : '#92400E',
                                        }}>
                                            -{remainingClicks}
                                        </span>
                                    )}
                                </span>
                                <span style={{
                                    fontSize: '9px',
                                    fontWeight: '600',
                                    color: isActive ? '#A8A29E' : '#A8A29E',
                                    letterSpacing: '0.5px',
                                    lineHeight: 1,
                                }}>
                                    {tab.key === 'random' ? (shuffledToday ? 'SHUFFLED' : 'SHUFFLE') : tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </>
        );
    };

    // Cycle mastery level: 0 -> 1 -> 2 -> 3 (OWN stops), CROWN(6) -> 0 with confirm
    // Date gate: each level-up requires a different calendar day
    const cycleMastery = useCallback(async (phraseId: string, slamActive = false): Promise<boolean> => {
        const current = Number(phraseMastery[phraseId] || 0);
        if (current === 3) return false;  // OWN = terminal, no cycle back
        const next = current === 6 ? 0 : (current + 1);

        // Same-day gate: block level-ups (not resets) if already leveled today
        if (next > 0 && phraseLastLeveled[phraseId] === clientToday) return false;

        // CROWN reset requires confirmation
        if (current === 6) {
            if (!confirm('CROWN をリセットしますか?')) return false;
        }

        setPhraseMastery(prev => ({ ...prev, [phraseId]: next }));
        // Optimistic update of last-leveled date + date touch map
        if (next > 0) {
            setPhraseLastLeveled(prev => ({ ...prev, [phraseId]: clientToday }));
            const pDate = phraseDateMap[phraseId];
            if (pDate) {
                setDateTouchMap(prev => ({ ...prev, [pDate]: (prev[pDate] || 0) + 1 }));
                fetch('/api/date-touches', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phrase_date: pDate })
                }).catch(() => { });
            }
        }

        // Count level-ups (0->1, 1->2, 2->3) but not resets (3->0, 6->0)
        if (next > 0) {
            const todayKey = clientToday;
            const hasRec = (voiceRecordings[phraseId] || []).length > 0;
            const hasLink = (phraseLinks[phraseId] || []).length > 0;
            const nextLevel = getChakraLevel(next, hasRec, hasLink);
            const xpGained = CHAKRA_CONFIG[nextLevel].lv;
            postXP(todayKey, xpGained, slamActive, phraseId);

            // Send reviewed word to runner word stream
            const reviewedPhrase = phrases.find(p => p.id === phraseId);
            if (reviewedPhrase) {
                setLastReviewedWord({ text: reviewedPhrase.english, key: Date.now() });
            }

            // Trigger puzzle board card drop
            const phrase = phrases.find(p => p.id === phraseId);
            if (phrase) {
                const pts = cardPoints[phraseId] || 0;
                const rank = pts >= 250 ? 'LEGENDARY' : pts >= 100 ? 'HOLOGRAPHIC' : pts >= 50 ? 'GOLD' : pts >= 20 ? 'SILVER' : pts >= 5 ? 'BRONZE' : 'NORMAL';
                setPuzzleDropCard({
                    phraseId: phrase.id,
                    english: phrase.english,
                    japanese: phrase.japanese,
                    element: phrase.category,
                    rank,
                    points: pts,
                    bstTotal: calcBstTotal(phraseId),
                    key: Date.now(),
                });
            }
        }

        try {
            if (IS_PUBLIC) {
                // 3004: localStorageに保存
                const updated = { ...phraseMastery, [phraseId]: next };
                localStorage.setItem('quest-mastery', JSON.stringify(updated));
                // Sync back to TOEIC酒場 vocab deck if this is a toeic_ phrase
                if (phraseId.startsWith('toeic_')) {
                    try {
                        const vocabRaw = localStorage.getItem('izakaya_toeic_vocab_deck');
                        if (vocabRaw) {
                            const deck = JSON.parse(vocabRaw);
                            const phrase = phrases.find(p => p.id === phraseId);
                            if (phrase) {
                                const deckItem = deck.find((v: any) => v.word === phrase.english);
                                if (deckItem) {
                                    deckItem.masteryLevel = Math.min(next, 3);
                                    deckItem.lastReviewedAt = new Date().toISOString();
                                    deckItem.reviewCount = (deckItem.reviewCount || 0) + 1;
                                    localStorage.setItem('izakaya_toeic_vocab_deck', JSON.stringify(deck));
                                }
                            }
                        }
                    } catch { /* */ }
                }
            } else if (dataMode === 'words') {
                await fetch(`/api/user-words/${phraseId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mastery_level: next })
                });
            } else {
                const res = await fetch('/api/phrases/mastery', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phraseId, level: next, today: clientToday })
                });
                // Rollback on 409 (server rejected same-day level-up)
                if (res.status === 409) {
                    setPhraseMastery(prev => ({ ...prev, [phraseId]: current }));
                    return false;
                }
            }
        } catch (err) {
            console.error('Failed to save mastery:', err);
        }

        return true;
    }, [phraseMastery, voiceRecordings, phraseLinks, phraseLastLeveled, clientToday, phraseDateMap, dataMode]);

    // Declare CROWN: VISION(5) -> CROWN(6) in DB
    const declareCrown = useCallback(async (phraseId: string) => {
        // Same-day gate
        if (phraseLastLeveled[phraseId] === clientToday) return;

        if (!confirm('CROWN を宣言しますか? この言葉はもう自分の一部です。')) return;

        setPhraseMastery(prev => ({ ...prev, [phraseId]: 6 }));
        setPhraseLastLeveled(prev => ({ ...prev, [phraseId]: clientToday }));
        const pDate = phraseDateMap[phraseId];
        if (pDate) {
            setDateTouchMap(prev => ({ ...prev, [pDate]: (prev[pDate] || 0) + 1 }));
            fetch('/api/date-touches', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phrase_date: pDate })
            }).catch(() => { });
        }
        playLevelSound(6);

        try {
            const res = dataMode === 'words'
                ? await fetch(`/api/user-words/${phraseId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ mastery_level: 6 })
                })
                : await fetch('/api/phrases/mastery', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phraseId, level: 6, today: clientToday })
                });
            if (res.status === 409) {
                setPhraseMastery(prev => ({ ...prev, [phraseId]: 5 }));
                return;
            }
            // CROWN = lv 7 XP
            postXP(clientToday, CHAKRA_CONFIG[6].lv, false, phraseId);
        } catch (err) {
            console.error('Failed to declare CROWN:', err);
        }
    }, [phraseLastLeveled, clientToday, phraseDateMap]);

    // Play phrase audio (must be synchronous to preserve user gesture for Chrome)
    const playPhrase = useCallback((phrase: Phrase) => {
        window.speechSynthesis.cancel();
        setPlayingPhraseId(phrase.id);

        const utterance = new SpeechSynthesisUtterance(phrase.english);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;

        const enVoice = voices.find(v => v.name.includes('Google US English')) || voices[0];
        if (enVoice) utterance.voice = enVoice;

        utterance.onend = () => setPlayingPhraseId(null);
        utterance.onerror = () => setPlayingPhraseId(null);

        window.speechSynthesis.speak(utterance);
    }, [voices]);

    // Auto-play TTS when displayed card changes
    useEffect(() => {
        if (!displayedCard || cardCelebration) return;
        if (displayedCard.id === prevAutoPlayIdRef.current) return;
        prevAutoPlayIdRef.current = displayedCard.id;
        playPhrase(displayedCard);
    }, [displayedCard, cardCelebration, playPhrase]);

    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

    const selectedPhrasesAll = selectedDate ? (phrasesByDate[selectedDate] || []) : [];
    const selectedPhrases = selectedChakraFilter !== null
        ? selectedPhrasesAll.filter(p => {
            const m = Number(phraseMastery[p.id] || 0);
            const hasRec = (voiceRecordings[p.id] || []).length > 0;
            const hasLink = (phraseLinks[p.id] || []).length > 0;
            return getChakraLevel(m, hasRec, hasLink) === selectedChakraFilter;
        })
        : selectedPhrasesAll;




    // Calculate puzzle stats (all phrases cleared = puzzle piece complete)
    const puzzleStats = useMemo(() => {
        const daysWithPhrases = Object.keys(phrasesByDate).length;
        const masteredDays = Object.entries(phrasesByDate).filter(([_, phrases]) =>
            phrases.every(p => Number(phraseMastery[p.id] || 0) >= 3)
        ).length;
        return { total: daysWithPhrases, mastered: masteredDays };
    }, [phrasesByDate, phraseMastery]);

    // Active review card's date key + chakra level for calendar highlight
    const activeReviewDateKey = displayedCard
        ? displayedCard.date.split('T')[0]
        : null;
    const activeReviewLevel: ChakraLevel | null = displayedCard
        ? getChakraLevel(
            Number(phraseMastery[displayedCard.id] || 0),
            (voiceRecordings[displayedCard.id] || []).length > 0,
            (phraseLinks[displayedCard.id] || []).length > 0
        )
        : null;

    // --- All hooks declared above this line ---
    // Early return for SSR safety (currentMonth is null until client useEffect)
    if (!currentMonth) return null;

    // Calendar
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const calendarDays: (number | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

    const rows = Math.ceil(calendarDays.length / 7);

    const prevMonth = () => { setCurrentMonth(new Date(year, month - 1, 1)); setSelectedDate(null); };
    const nextMonth = () => { setCurrentMonth(new Date(year, month + 1, 1)); setSelectedDate(null); };

    const formatDateKey = (day: number) => {
        const m = String(month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${year}-${m}-${d}`;
    };

    const today = new Date();
    const isToday = (day: number) => day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    // Stats
    const activeCount = phrases.filter(p => {
        const level = Number(phraseMastery[p.id] || 0);
        return level >= 1 && level < 3;
    }).length;
    const ownPlusCount = phrases.filter(p => Number(phraseMastery[p.id] || 0) >= 3).length;

    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekAgoStr = `${weekAgo.getFullYear()}-${String(weekAgo.getMonth() + 1).padStart(2, '0')}-${String(weekAgo.getDate()).padStart(2, '0')}`;
    const thisWeekPhrases = phrases.filter(p => {
        const dateStr = p.date.split('T')[0];
        return dateStr >= weekAgoStr && dateStr <= todayStr;
    });

    const openVocabModal = (english: string) => {
        setVocabExample(english);
        setVocabWord('');
        setVocabMeaning('');
        setVocabType('word');
        setShowVocabModal(true);
    };

    const saveToVocabulary = async () => {
        if (!vocabWord.trim() || !vocabMeaning.trim()) return;
        setVocabSaving(true);
        try {
            const res = await fetch('/api/user-phrases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phrase: vocabWord.trim(),
                    type: vocabType,
                    meaning: vocabMeaning.trim(),
                    example: vocabExample,
                    source: 'Phrases',
                    date: vocabDate,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setShowVocabModal(false);
                setVocabWord('');
                setVocabMeaning('');
                setVocabExample('');
                alert('Saved!');
            } else {
                alert(data.error || 'Failed to save');
            }
        } catch (err) {
            console.error('Failed to save vocabulary:', err);
            alert('Error saving vocabulary');
        } finally {
            setVocabSaving(false);
        }
    };

    const handleEditPhrase = async () => {
        if (!editingPhrase || !editingPhrase.english.trim()) return;
        setEditSaving(true);
        try {
            const endpoint = dataMode === 'words'
                ? `/api/user-words/${editingPhrase.id}`
                : `/api/phrases/${editingPhrase.id}`;
            const res = await fetch(endpoint, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    english: editingPhrase.english.trim(),
                    japanese: editingPhrase.japanese.trim(),
                }),
            });
            const data = await res.json();
            if (data.success) {
                const updatedEnglish = editingPhrase.english.trim();
                const updatedJapanese = editingPhrase.japanese.trim();
                setPhrases(prev => prev.map(p =>
                    p.id === editingPhrase.id
                        ? { ...p, english: updatedEnglish, japanese: updatedJapanese }
                        : p
                ));
                // Also update cached review list so review card reflects the edit
                if (reviewListCacheRef.current.list) {
                    reviewListCacheRef.current.list = reviewListCacheRef.current.list.map(p =>
                        p.id === editingPhrase.id
                            ? { ...p, english: updatedEnglish, japanese: updatedJapanese }
                            : p
                    );
                }
                setEditingPhrase(null);
            } else {
                alert(data.error || 'Failed to update');
            }
        } catch (error) {
            console.error('Error updating phrase:', error);
            alert('Error updating phrase');
        } finally {
            setEditSaving(false);
        }
    };

    const handleDeletePhrase = async (id: string) => {
        if (!confirm(dataMode === 'words' ? 'Delete this word?' : 'Delete this phrase?')) return;
        try {
            const endpoint = dataMode === 'words' ? `/api/user-words/${id}` : `/api/phrases/${id}`;
            const res = await fetch(endpoint, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                setPhrases(prev => prev.filter(p => p.id !== id));
            }
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const handleAddPhrase = async () => {
        if (isSubmitting) return;
        if (!newPhrase.english.trim() || !newPhrase.japanese.trim()) return;
        setIsSubmitting(true);
        try {
            if (dataMode === 'words') {
                const res = await fetch('/api/user-words', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        english: newPhrase.english.trim(),
                        japanese: newPhrase.japanese.trim(),
                        category: newPhrase.category,
                    }),
                });
                const data = await res.json();
                if (data.success) {
                    const w = data.word;
                    setPhrases(prev => [...prev, {
                        id: w.id,
                        english: w.english,
                        japanese: w.japanese + (w.pronunciation ? ` (${w.pronunciation})` : ''),
                        category: w.category || 'word',
                        date: w.created_at,
                    }]);
                    setNewPhrase({ english: '', japanese: '', category: randomElement() });
                    setShowAddForm(false);
                }
            } else {
                const res = await fetch('/api/phrases', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        english: newPhrase.english.trim(),
                        japanese: newPhrase.japanese.trim(),
                        category: newPhrase.category,
                        date: formDate,
                    }),
                });
                const data = await res.json();
                if (data.success) {
                    if (!data.duplicate) {
                        setPhrases(prev => [...prev, data.phrase]);
                    }
                    setNewPhrase({ english: '', japanese: '', category: randomElement() });
                    setShowAddForm(false);
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleQuickAdd = async () => {
        const phraseId = displayedCard?.id;
        if (!quickAddEnglish.trim() || !phraseId) return;
        setQuickAddSubmitting(true);
        try {
            const prevLinks = phraseLinks[phraseId] || [];
            const wasFirst = prevLinks.length === 0;
            const res = await fetch('/api/phrases/links', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phrase_id: phraseId, text: quickAddEnglish.trim() }),
            });
            const data = await res.json();
            if (data.success) {
                setPhraseLinks(prev => ({
                    ...prev,
                    [phraseId]: [...(prev[phraseId] || []), data.link],
                }));
                setQuickAddEnglish('');
                setQuickAddedCount(c => c + 1);
                // XP: first link = VISION level-up
                if (wasFirst) {
                    const baseMastery = Number(phraseMastery[phraseId] || 0);
                    const hasRec = (voiceRecordings[phraseId] || []).length > 0;
                    const levelBefore = getChakraLevel(baseMastery, hasRec, false);
                    const levelAfter = getChakraLevel(baseMastery, hasRec, true);
                    if (levelAfter > levelBefore) {
                        postXP(new Date().toISOString().split('T')[0], CHAKRA_CONFIG[levelAfter].lv, false, phraseId);
                        // Full level-up effects
                        const nc = CHAKRA_CONFIG[levelAfter];
                        const k = Date.now();
                        playLevelSound(levelAfter);
                        setPointEffect({ points: nc.lv, color: nc.color, gradFrom: nc.gradFrom, gradTo: nc.gradTo, levelName: nc.name, key: k });
                        if (displayedCard) {
                            setCalendarPulse({ dateKey: displayedCard.date.split('T')[0], points: nc.lv, gradFrom: nc.gradFrom, color: nc.color, level: levelAfter, key: k });
                            setCardCelebration({ phrase: displayedCard, key: k });
                            // Register card to GOD GRID
                            const pts = cardPoints[phraseId] || 0;
                            const rank = pts >= 250 ? 'LEGENDARY' : pts >= 100 ? 'HOLOGRAPHIC' : pts >= 50 ? 'GOLD' : pts >= 20 ? 'SILVER' : pts >= 5 ? 'BRONZE' : 'NORMAL';
                            setPuzzleDropCard({ phraseId, english: displayedCard.english, japanese: displayedCard.japanese, element: displayedCard.category, rank, points: pts, bstTotal: calcBstTotal(phraseId), key: k });
                        }
                    }
                }
            }
        } finally {
            setQuickAddSubmitting(false);
        }
    };

    // Don't block render on loading — show page immediately, data fills in when ready

    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Keyframes loaded from training-animations.css */}


            {/* === CHAIN MODE VISUALS -- PACHINKO RUSH v5 (GPU-optimized, mobile-aware) === */}
            {feverMode.active && (() => {
                const G = chainState.mode === 'god';
                const K = chainState.mode === 'gekiatsu';
                const M = isMobile;
                const c = G ? ['#7C3AED','#EC4899','#D4AF37','#06B6D4','#A855F7','#F43F5E','#FDE68A','#34D399']
                    : K ? ['#DC2626','#F97316','#FBBF24','#EF4444','#FF6B6B','#B91C1C','#FCD34D','#EA580C']
                    : ['#D4AF37','#F59E0B','#FDE68A','#B8860B','#EAB308','#92400E','#FFFBEB','#CA8A04'];
                const gpu = {willChange:'transform' as const,backfaceVisibility:'hidden' as const,transform:'translateZ(0)'};
                const base = {position:'absolute' as const,inset:0,pointerEvents:'none' as const,...gpu};
                return (
                    <div style={{position:'fixed',inset:0,zIndex:50,pointerEvents:'none',overflow:'hidden',contain:'strict',
                    }}>
                        {/* L1: Dark tint */}
                        <div style={{...base,
                            background: G ? 'rgba(10,0,20,0.25)' : K ? 'rgba(20,0,0,0.18)' : 'rgba(15,10,0,0.12)',
                        }} />
                        {/* L2: Metallic grain (desktop only -- repeating-linear-gradient is heavy on mobile) */}
                        {!M && <div style={{...base,opacity:G?0.2:K?0.22:0.18,
                            background: [
                                `repeating-linear-gradient(${G?'67':K?'72':'80'}deg,${c[0]}15 0px,transparent 1px,transparent 3px)`,
                                `repeating-linear-gradient(${G?'157':K?'142':'170'}deg,${c[1]}12 0px,transparent 1px,transparent 4px)`,
                            ].join(','),
                            animation: `rush-grain-shift ${G?'1.2':K?'2':'3.5'}s linear infinite`,
                        }} />}
                        {/* L3: Primary conic swirl */}
                        <div style={{...base,inset:M?'-10%':'-25%',opacity:G?0.18:K?0.2:0.15,
                            background: G
                                ? `conic-gradient(from 0deg at 42% 58%, ${c[0]},${c[1]},${c[2]},${c[3]},${c[4]},${c[5]},${c[0]})`
                                : K ? `conic-gradient(from 0deg at 48% 62%, ${c[0]},${c[1]},${c[2]},${c[3]},${c[0]})`
                                : `conic-gradient(from 0deg at 50% 65%, ${c[0]},${c[1]},${c[2]},${c[0]})`,
                            animation: `rush-color-rotate ${G?'4':K?'7':'11'}s linear infinite`,
                        }} />
                        {/* L4: Secondary conic -- desktop only */}
                        {!M && <div style={{...base,inset:'-20%',opacity:G?0.12:K?0.15:0.1,
                            background: G
                                ? `conic-gradient(from 180deg at 58% 38%, ${c[3]},${c[4]},${c[5]},${c[6]},${c[3]})`
                                : K ? `conic-gradient(from 90deg at 45% 38%, ${c[4]},${c[5]},${c[6]},${c[4]})`
                                : `conic-gradient(from 120deg at 55% 38%, ${c[4]},${c[5]},${c[4]})`,
                            animation: `rush-color-rotate ${G?'3':K?'4.5':'8'}s linear infinite reverse`,
                        }} />}
                        {/* L5: Beam fan -- desktop only (repeating-conic-gradient is expensive) */}
                        {!M && <div style={{...base,inset:'-30%',opacity:G?0.14:K?0.16:0.1,
                            background: G
                                ? `repeating-conic-gradient(from 0deg at 50% 50%,${c[0]} 0deg,transparent 3deg,${c[1]} 6deg,transparent 9deg,${c[2]} 12deg,transparent 15deg)`
                                : K ? `repeating-conic-gradient(from 0deg at 50% 50%,${c[0]} 0deg,transparent 4deg,${c[1]} 8deg,transparent 12deg)`
                                : `repeating-conic-gradient(from 0deg at 50% 50%,${c[0]} 0deg,transparent 5deg,${c[1]} 10deg,transparent 15deg)`,
                            animation: `rush-beams-rotate ${G?'6':K?'10':'16'}s linear infinite`,
                        }} />}
                        {/* L6: Plasma */}
                        <div style={{...base,opacity:G?0.15:K?0.18:0.12,
                            background: [
                                `radial-gradient(ellipse 60% 50% at 30% 40%, ${c[0]}AA 0%, transparent 70%)`,
                                `radial-gradient(ellipse 50% 60% at 70% 60%, ${c[2]}88 0%, transparent 70%)`,
                                ...(M ? [] : [`radial-gradient(ellipse 55% 45% at 50% 80%, ${c[4]}77 0%, transparent 65%)`]),
                            ].join(','),
                            animation: `rush-plasma-drift ${G?'3':K?'5':'8'}s ease-in-out infinite`,
                        }} />
                        {/* L7: Center hotspot */}
                        <div style={{...base,opacity:G?0.2:K?0.25:0.18,
                            background: `radial-gradient(circle at 50% 50%, ${c[2]}BB 0%, ${c[0]}55 15%, transparent 45%)`,
                            animation: `rush-center-pulse ${G?'0.6':K?'1':'1.8'}s ease-in-out infinite`,
                        }} />
                        {/* L8: Edge glow (single element, 4 gradients combined) */}
                        <div style={{...base,opacity:G?0.5:K?0.4:0.3,
                            background: [
                                `linear-gradient(to right,${c[0]}99 0%,transparent ${G?'30%':K?'22%':'15%'})`,
                                `linear-gradient(to left,${c[1]}99 0%,transparent ${G?'30%':K?'22%':'15%'})`,
                                `linear-gradient(to bottom,${c[2]}88 0%,transparent ${G?'25%':K?'18%':'12%'})`,
                                `linear-gradient(to top,${c[3]}88 0%,transparent ${G?'25%':K?'18%':'12%'})`,
                            ].join(','),
                            animation: `rush-edge-breathe 0.8s ease-in-out infinite alternate`,
                        }} />
                        {/* L9: Corner glows (single element) */}
                        <div style={{...base,opacity:G?0.3:K?0.35:0.2,
                            background: [
                                `radial-gradient(circle at 0% 0%,${c[0]}88 0%,transparent 35%)`,
                                `radial-gradient(circle at 100% 0%,${c[1]}88 0%,transparent 35%)`,
                                `radial-gradient(circle at 0% 100%,${c[2]}88 0%,transparent 35%)`,
                                `radial-gradient(circle at 100% 100%,${c[3]}88 0%,transparent 35%)`,
                            ].join(','),
                            animation:`rush-corner-flare 1.2s ease-in-out infinite`,
                        }}/>
                        {/* L10: Bokeh orbs -- desktop only */}
                        {!M && [0,1,2].map(i => {
                            const cl = c[i*2%c.length];
                            const sz = G ? 100+i*30 : K ? 70+i*25 : 50+i*20;
                            const x = [20,65,42][i]; const y = [25,70,50][i];
                            return <div key={`bk${i}`} style={{
                                position:'absolute',left:`${x}%`,top:`${y}%`,...gpu,
                                width:sz,height:sz,borderRadius:'50%',pointerEvents:'none',
                                background:`radial-gradient(circle,${cl}55 0%,${cl}22 40%,transparent 70%)`,
                                animation:`rush-bokeh-float ${3+i*1.2}s ease-in-out infinite`,
                                animationDelay:`${i*0.7}s`,
                            }}/>;
                        })}
                        {/* L11: Expanding rings -- desktop only */}
                        {!M && [0,1].map(i => (
                            <div key={`ring${i}`} style={{
                                ...base,
                                background:`radial-gradient(circle at 50% 50%, transparent ${25+i*15}%, ${c[i%c.length]}33 ${27+i*15}%, transparent ${30+i*15}%)`,
                                animation:`rush-ring-expand ${2+i*0.6}s ease-out infinite`,
                                animationDelay:`${i*0.6}s`,
                            }}/>
                        ))}
                        {/* L12: Lightning streaks -- desktop god/gekiatsu only */}
                        {!M && (G||K) && [0,1].map(i => {
                            const angle = [18,-35][i]; const cl = c[i%c.length];
                            return <div key={`lt${i}`} style={{
                                position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden',...gpu,
                            }}>
                                <div style={{
                                    position:'absolute',width:'150%',height:G?'2px':'1px',
                                    top:i===0?'10%':'90%',left:'-25%',
                                    transform:`rotate(${angle}deg)`,transformOrigin:'center',...gpu,
                                    background:`linear-gradient(90deg,transparent 0%,${cl}55 20%,${cl}BB 45%,#ffffffAA 50%,${cl}BB 55%,${cl}55 80%,transparent 100%)`,
                                    boxShadow:`0 0 6px ${cl}`,
                                    animation:`rush-lightning-strike ${1.5+i*0.4}s ease-out infinite`,
                                    animationDelay:`${i*0.6}s`,
                                }}/>
                            </div>;
                        })}
                        {/* L13: Vignette */}
                        <div style={{...base,
                            background: `radial-gradient(ellipse 85% 75% at 50% 50%,transparent 30%,${G?'rgba(8,0,20,0.35)':K?'rgba(12,0,0,0.28)':'rgba(8,5,0,0.2)'} 100%)`,
                            animation:`rush-vignette-breathe ${G?'0.7':K?'1':'1.5'}s ease-in-out infinite`,
                        }}/>
                        {/* L14: Sweeping light bands */}
                        {[0, ...(M ? [] : [1])].map(i => (
                            <div key={`sw${i}`} style={{
                                position:'absolute',left:0,right:0,pointerEvents:'none',...gpu,
                                top:`${20+i*40}%`,
                                height: G?'3px':K?'2px':'1px',
                                background:`linear-gradient(90deg,transparent 0%,${c[i*2%c.length]}66 20%,${c[(i*2+2)%c.length]}AA 50%,${c[i*2%c.length]}66 80%,transparent 100%)`,
                                boxShadow:`0 0 ${G?15:K?10:6}px ${c[i*2%c.length]}80`,
                                animation:`rush-wipe-sweep ${2.2+i*0.5}s ease-in-out infinite`,
                                animationDelay:`${i*0.8}s`,
                            }}/>
                        ))}
                    </div>
                );
            })()}

            {/* RUSH test panel -- compact pill toggle, bottom-left to avoid card overlap */}
            <div style={{
                position: 'fixed',
                bottom: isMobile ? '8px' : '12px',
                left: isMobile ? '8px' : '12px',
                zIndex: 9999,
                display: 'flex',
                gap: '3px',
                opacity: 0.5,
                transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.5')}
            >
                {(['kakuhen', 'gekiatsu', 'god'] as const).map((mode, i) => {
                    const labels = ['R', 'F', 'G'];
                    const colors = ['#D4AF37', '#DC2626', '#7C3AED'];
                    const counts = [3, 5, 10];
                    const active = chainState.mode === mode;
                    return (
                        <button key={mode} onClick={() => {
                            if (active) {
                                setChainState({ count: 0, mode: 'normal', key: Date.now() });
                            } else {
                                setChainState({ count: counts[i], mode, key: Date.now() });
                            }
                        }} style={{
                            background: active ? colors[i] : 'rgba(0,0,0,0.7)',
                            color: active ? '#fff' : colors[i],
                            border: `1.5px solid ${active ? colors[i] : colors[i] + '60'}`,
                            borderRadius: '50%',
                            width: isMobile ? '28px' : '24px',
                            height: isMobile ? '28px' : '24px',
                            padding: 0,
                            fontSize: '9px',
                            fontWeight: 900,
                            cursor: 'pointer',
                            fontFamily: 'monospace',
                            lineHeight: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: active ? `0 0 12px ${colors[i]}80` : 'none',
                            transition: 'all 0.15s ease',
                        }}>
                            {labels[i]}
                        </button>
                    );
                })}
            </div>

            {/* Chain mode HUD -- pachinko RUSH counter (fixed bottom-right) */}
            {feverMode.active && (
                <div style={{
                    position: 'fixed',
                    bottom: isMobile ? '60px' : '20px',
                    right: isMobile ? '8px' : '16px',
                    zIndex: 9998,
                    pointerEvents: 'none',
                    animation: chainState.mode === 'god' ? 'fever-badge-pulse 0.6s ease-in-out infinite' : chainState.mode === 'gekiatsu' ? 'fever-badge-pulse 1s ease-in-out infinite' : 'fever-badge-pulse 1.5s ease-in-out infinite',
                }}>
                    {/* Glassmorphism container with outer glow */}
                    <div style={{
                        background: chainState.mode === 'god'
                            ? 'rgba(20,5,40,0.92)'
                            : chainState.mode === 'gekiatsu'
                            ? 'rgba(30,5,5,0.92)'
                            : 'rgba(8,8,12,0.88)',
                        backdropFilter: 'blur(24px)',
                        WebkitBackdropFilter: 'blur(24px)',
                        borderRadius: isMobile ? '12px' : '14px',
                        padding: isMobile ? '10px 16px 12px' : '12px 24px 14px',
                        border: chainState.mode === 'god'
                            ? '2px solid rgba(192,132,252,0.4)'
                            : chainState.mode === 'gekiatsu'
                            ? '2px solid rgba(239,68,68,0.4)'
                            : '2px solid rgba(212,175,55,0.35)',
                        position: 'relative',
                        overflow: 'hidden',
                        minWidth: isMobile ? '80px' : '100px',
                        textAlign: 'center',
                        boxShadow: chainState.mode === 'god'
                            ? '0 4px 30px rgba(124,58,237,0.5), 0 0 60px rgba(192,132,252,0.2)'
                            : chainState.mode === 'gekiatsu'
                            ? '0 4px 30px rgba(220,38,38,0.5), 0 0 60px rgba(239,68,68,0.2)'
                            : '0 4px 30px rgba(212,175,55,0.4), 0 0 60px rgba(212,175,55,0.15)',
                    }}>
                        {/* Top accent line -- thicker, mode-specific */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: chainState.mode === 'god' ? '3px' : '2.5px',
                            background: chainState.mode === 'god'
                                ? 'linear-gradient(90deg, #7C3AED, #EC4899, #D4AF37, #06B6D4, #10B981, #7C3AED)'
                                : chainState.mode === 'gekiatsu'
                                ? 'linear-gradient(90deg, #DC2626, #F97316, #FBBF24, #DC2626)'
                                : 'linear-gradient(90deg, #D4AF37, #FDE68A, #F59E0B, #D4AF37)',
                            backgroundSize: chainState.mode === 'god' ? '200% 100%' : '150% 100%',
                            animation: chainState.mode === 'god'
                                ? 'chain-hud-accent-rainbow 1.5s linear infinite'
                                : chainState.mode === 'gekiatsu'
                                ? 'chain-hud-accent-pulse-red 0.8s ease-in-out infinite'
                                : 'chain-hud-accent-shimmer 2s ease-in-out infinite',
                        }} />
                        {/* Bottom accent line (mirror) */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: chainState.mode === 'god' ? '3px' : '2.5px',
                            background: chainState.mode === 'god'
                                ? 'linear-gradient(90deg, #06B6D4, #D4AF37, #EC4899, #7C3AED, #06B6D4)'
                                : chainState.mode === 'gekiatsu'
                                ? 'linear-gradient(90deg, #F97316, #DC2626, #F97316)'
                                : 'linear-gradient(90deg, #F59E0B, #D4AF37, #F59E0B)',
                            backgroundSize: chainState.mode === 'god' ? '200% 100%' : '150% 100%',
                            animation: chainState.mode === 'god'
                                ? 'chain-hud-accent-rainbow 1.5s linear infinite reverse'
                                : chainState.mode === 'gekiatsu'
                                ? 'chain-hud-accent-pulse-red 0.8s ease-in-out infinite reverse'
                                : 'chain-hud-accent-shimmer 2s ease-in-out infinite reverse',
                        }} />
                        {/* RUSH label */}
                        <div style={{
                            fontSize: isMobile ? '7px' : '8px',
                            fontWeight: '900',
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            color: chainState.mode === 'god' ? '#06B6D4' : chainState.mode === 'gekiatsu' ? '#F97316' : '#FDE68A',
                            animation: 'rush-label-flash 1s ease-in-out infinite',
                            marginBottom: '0px',
                        }}>
                            RUSH
                        </div>
                        {/* Mode label */}
                        <div style={{
                            fontSize: isMobile ? '9px' : '10px',
                            fontWeight: '700',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: chainState.mode === 'god' ? '#C084FC' : chainState.mode === 'gekiatsu' ? '#F87171' : '#D4AF37',
                            opacity: 0.95,
                            marginBottom: '2px',
                        }}>
                            {CHAIN_MODE_CONFIG[chainState.mode].labelJa}
                        </div>
                        {/* Chain count -- larger number with intense glow */}
                        {chainState.count > 0 && (
                            <div key={chainState.key} style={{
                                fontSize: isMobile ? '36px' : '48px',
                                fontWeight: '900',
                                lineHeight: 1,
                                color: '#fff',
                                // @ts-ignore
                                '--glow-color': chainState.mode === 'god' ? '#C084FC' : chainState.mode === 'gekiatsu' ? '#DC2626' : '#D4AF37',
                                textShadow: chainState.mode === 'god'
                                    ? '0 0 20px #C084FC, 0 0 40px #EC4899, 0 0 60px #7C3AED80, 0 0 80px #06B6D440'
                                    : chainState.mode === 'gekiatsu'
                                    ? '0 0 20px #DC2626, 0 0 40px #F97316, 0 0 60px #DC262680, 0 0 80px #F9731640'
                                    : '0 0 16px #D4AF37, 0 0 32px #F59E0B80, 0 0 48px #D4AF3740',
                                animation: `fever-chain-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)${chainState.count >= 5 ? ', chain-number-glow-pulse 0.8s ease-in-out infinite' : ''}${chainState.count >= 8 ? ', chain-counter-shake 0.2s ease-in-out infinite' : ''}`,
                                letterSpacing: '-2px',
                            } as React.CSSProperties}>
                                {chainState.count}
                            </div>
                        )}
                        {/* Bottom row: CHAIN label + GP multiplier */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: isMobile ? '6px' : '8px',
                            marginTop: '2px',
                        }}>
                            <span style={{
                                fontSize: isMobile ? '8px' : '10px',
                                fontWeight: '800',
                                letterSpacing: '3px',
                                color: 'rgba(255,255,255,0.6)',
                            }}>CHAIN</span>
                            <span style={{
                                fontSize: isMobile ? '9px' : '10px',
                                fontWeight: '700',
                                color: chainState.mode === 'god' ? '#C084FC' : chainState.mode === 'gekiatsu' ? '#F87171' : '#D4AF37',
                                letterSpacing: '0.5px',
                                textShadow: `0 0 8px ${chainState.mode === 'god' ? '#C084FC' : chainState.mode === 'gekiatsu' ? '#DC2626' : '#D4AF37'}60`,
                            }}>GP{CHAIN_MODE_CONFIG[chainState.mode].spMultiplier}</span>
                        </div>
                        {/* Ambient glow overlay for all modes */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 'inherit',
                            background: chainState.mode === 'god'
                                ? 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(236,72,153,0.12), rgba(6,182,212,0.1), rgba(212,175,55,0.08))'
                                : chainState.mode === 'gekiatsu'
                                ? 'linear-gradient(135deg, rgba(220,38,38,0.1), rgba(249,115,22,0.08))'
                                : 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(245,158,11,0.06))',
                            animation: 'chain-hud-god-glow 2s ease-in-out infinite',
                            pointerEvents: 'none',
                        }} />
                    </div>
                </div>
            )}

            {/* Chain mode transition banner (確変突入! 激熱突入! 神降臨!) */}
            {chainTransition && (
                <div key={chainTransition.key} style={{
                    position: 'fixed', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10001, pointerEvents: 'none',
                }}>
                    <div
                        onAnimationEnd={() => setChainTransition(null)}
                        style={{
                        background: CHAIN_MODE_CONFIG[chainTransition.to].gradient,
                        color: '#fff',
                        padding: isMobile ? '16px 40px' : '24px 64px',
                        borderRadius: '16px',
                        fontWeight: '900',
                        fontSize: isMobile ? '32px' : '48px',
                        letterSpacing: '8px',
                        textShadow: '0 0 20px rgba(255,255,255,0.8)',
                        boxShadow: `0 0 60px ${CHAIN_MODE_CONFIG[chainTransition.to].color}AA`,
                        animation: 'fever-entry-slam 1s cubic-bezier(0.34,1.56,0.64,1) forwards',
                    }}>
                        {chainTransition.to === 'kakuhen' ? '確変突入!' : chainTransition.to === 'gekiatsu' ? '激熱突入!' : '神 降 臨 !'}
                    </div>
                </div>
            )}


            {/* FEVER flash (enter = red, exit = blue) */}
            {feverFlash && (
                <div key={feverFlash} style={{
                    position: 'fixed', inset: 0,
                    background: feverFlash === 'enter'
                        ? 'radial-gradient(circle, rgba(249,115,22,0.6) 0%, rgba(220,38,38,0.4) 50%, transparent 100%)'
                        : 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(30,58,138,0.3) 50%, transparent 100%)',
                    pointerEvents: 'none', zIndex: 10000,
                    animation: feverFlash === 'enter'
                        ? 'fever-flash-enter 0.8s ease-out forwards'
                        : 'fever-flash-exit 1.2s ease-out forwards',
                }} />
            )}


            {/* FEVER exit — "確変終了" + chain count */}
            {feverExitEffect && (
                <div style={{
                    position: 'fixed', inset: 0,
                    pointerEvents: 'none', zIndex: 10001,
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%', left: '50%',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                        animation: 'fever-exit-text 1.5s ease-out forwards',
                    }}>
                        <div style={{
                            fontSize: isMobile ? '36px' : '54px',
                            fontWeight: '900',
                            letterSpacing: '6px',
                            background: 'linear-gradient(180deg, #DC2626 0%, #3B82F6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 20px rgba(59,130,246,0.4), 0 4px 12px rgba(0,0,0,0.4)',
                            whiteSpace: 'nowrap',
                        }}>
                            確変終了
                        </div>
                        {feverExitEffect.streak > 0 && (
                            <div style={{
                                fontSize: isMobile ? '18px' : '24px',
                                fontWeight: '800',
                                color: '#94A3B8',
                                letterSpacing: '2px',
                                textShadow: '0 0 10px rgba(148,163,184,0.3)',
                            }}>
                                x{feverExitEffect.streak} 連鎖
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Old rank-up banner removed -- replaced by full-screen celebration below */}

            {/* Point Effect Overlay */}
            {pointEffect && (
                <div key={pointEffect.key} style={{
                    position: 'fixed', inset: 0,
                    pointerEvents: 'none', zIndex: 9999,
                    animation: 'pe-shake 0.8s ease-out forwards',
                }}>
                    {/* Impact ring */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: isMobile ? '160px' : '240px', height: isMobile ? '160px' : '240px',
                        marginLeft: isMobile ? '-80px' : '-120px', marginTop: isMobile ? '-80px' : '-120px',
                        borderRadius: '50%',
                        border: `2px solid ${pointEffect.gradFrom}`,
                        animation: 'pe-impact 1s ease-out forwards',
                    }} />

                    {/* Crack lines */}
                    {[
                        { x: '50%', right: false, rotate: -12, w: isMobile ? '38vw' : '22vw', delay: 0 },
                        { x: '50%', right: false, rotate: 20, w: isMobile ? '30vw' : '18vw', delay: 30 },
                        { x: '50%', right: true, rotate: 8, w: isMobile ? '32vw' : '20vw', delay: 50 },
                    ].map((c, i) => (
                        <div key={i} style={{
                            position: 'absolute', top: '50%',
                            ...(c.right ? { right: c.x } : { left: c.x }),
                            width: c.w, height: '1px',
                            background: `linear-gradient(${c.right ? 270 : 90}deg, ${i === 1 ? pointEffect.gradTo : pointEffect.gradFrom}80, transparent)`,
                            transformOrigin: c.right ? '100% 50%' : '0 50%',
                            transform: `rotate(${c.rotate}deg) scaleX(0)`,
                            animation: `pe-crack 1.3s ease-out ${c.delay}ms forwards`,
                        }} />
                    ))}

                    {/* Number + label */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexDirection: 'column',
                    }}>
                        <div style={{
                            fontSize: isMobile ? '80px' : '110px',
                            fontWeight: '900',
                            lineHeight: 1,
                            letterSpacing: '-5px',
                            color: pointEffect.color,
                            textShadow: `0 2px 24px ${pointEffect.gradFrom}50, 0 0 60px ${pointEffect.gradFrom}20`,
                            animation: 'pe-slam 1.6s cubic-bezier(0.22, 0.8, 0.36, 1) forwards',
                        }}>
                            +{pointEffect.points}
                        </div>
                        <div style={{
                            fontSize: isMobile ? '10px' : '13px',
                            fontWeight: '700',
                            color: pointEffect.color,
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginTop: '6px',
                            animation: 'pe-name 1.6s ease-out 0.25s both',
                        }}>
                            {pointEffect.levelName}
                        </div>
                    </div>
                </div>
            )}

            {/* Level-Up Overlay */}
            {levelUpEffect && (
                <div key={levelUpEffect.key} style={{
                    position: 'fixed', inset: 0,
                    pointerEvents: 'none', zIndex: 10000,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {/* Dark backdrop */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        backdropFilter: 'blur(6px)',
                        animation: 'lvup-shine 3s ease-out forwards',
                    }} />
                    {/* Background radial */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: `radial-gradient(circle, ${levelUpEffect.color}25, transparent 60%)`,
                        animation: 'lvup-shine 3s ease-out forwards',
                    }} />
                    {/* Expanding rings x3 */}
                    {[0, 0.2, 0.4].map((d, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: isMobile ? '120px' : '180px',
                            height: isMobile ? '120px' : '180px',
                            borderRadius: '50%',
                            border: `${3 - i}px solid ${levelUpEffect.color}${i === 0 ? '60' : '30'}`,
                            animation: `lvup-ring 1.5s ${d}s ease-out forwards`,
                        }} />
                    ))}
                    {/* Sparkle particles */}
                    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                        {Array.from({ length: 20 }).map((_, i) => {
                            const angle = (i / 20) * 360;
                            const dist = 60 + (i % 4) * 30;
                            return (
                                <div key={i} style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    width: '4px', height: '4px', borderRadius: '50%',
                                    backgroundColor: levelUpEffect.color,
                                    boxShadow: `0 0 8px ${levelUpEffect.color}, 0 0 16px ${levelUpEffect.color}80`,
                                    animation: `gacha-sparkle-burst 1.8s ${i * 0.05}s ease-out forwards`,
                                    // @ts-ignore
                                    '--sparkle-x': `${Math.cos(angle * Math.PI / 180) * dist}px`,
                                    '--sparkle-y': `${Math.sin(angle * Math.PI / 180) * dist}px`,
                                } as React.CSSProperties} />
                            );
                        })}
                    </div>
                    {/* Level text */}
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        animation: 'lvup-burst 2.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                    }}>
                        <div style={{
                            fontSize: isMobile ? '12px' : '15px',
                            fontWeight: '700',
                            color: levelUpEffect.color,
                            letterSpacing: '6px',
                            textTransform: 'uppercase',
                            marginBottom: '4px',
                            textShadow: `0 0 20px ${levelUpEffect.color}80`,
                        }}>
                            LEVEL UP
                        </div>
                        <div style={{
                            fontSize: isMobile ? '72px' : '100px',
                            fontWeight: '900',
                            lineHeight: 1,
                            letterSpacing: '-3px',
                            background: `linear-gradient(180deg, #fff 0%, ${levelUpEffect.color} 60%, ${levelUpEffect.color}80 100%)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: `drop-shadow(0 0 40px ${levelUpEffect.color}80) drop-shadow(0 4px 20px ${levelUpEffect.color}40)`,
                        }}>
                            {levelUpEffect.level}
                        </div>
                        <div style={{
                            fontSize: isMobile ? '16px' : '22px',
                            fontWeight: '700',
                            color: '#fff',
                            marginTop: '10px',
                            letterSpacing: '4px',
                            textShadow: `0 0 20px ${levelUpEffect.color}80, 0 2px 8px rgba(0,0,0,0.5)`,
                        }}>
                            {levelUpEffect.title}
                        </div>
                    </div>
                </div>
            )}

            {/* Gacha Overlay — Nintendo-level (hidden in GOD GRID — ReviewSlotPanel handles it) */}
            {gachaEffect && calendarTab !== 'puzzle' && (() => {
                const cfg = GACHA_TIER_CONFIG[gachaEffect.tier] || GACHA_TIER_CONFIG.MISS;
                const isReveal = gachaEffect.phase === 'reveal';
                const tier = gachaEffect.tier;
                const particleCount = isMobile ? Math.ceil(cfg.particles * 0.6) : cfg.particles;
                const fs = isMobile ? cfg.mobileFontSize : cfg.fontSize;
                const isUltraRare = tier === 'MYTHIC' || tier === 'SHINY' || tier === 'PHANTOM';
                const isBig = tier === 'SUPER' || tier === 'MEGA' || tier === 'LEGENDARY' || isUltraRare;
                const isEpic = tier === 'MEGA' || tier === 'LEGENDARY' || isUltraRare;

                return (
                    <div key={gachaEffect.key} style={{
                        position: 'fixed', inset: 0,
                        pointerEvents: 'none', zIndex: 9998,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        ...(isReveal && (tier === 'GREAT' || tier === 'SUPER')
                            ? { animation: 'gacha-shake 0.6s ease-out' } : {}),
                        ...(isReveal && isEpic
                            ? { animation: 'gacha-shake 0.8s ease-out' } : {}),
                    }}>
                        {/* Screen darken + blur for BONUS+ */}
                        {isReveal && tier !== 'MISS' && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                backgroundColor: tier === 'PHANTOM' ? '#fff' : '#000',
                                opacity: tier === 'PHANTOM' ? 0.8 : isUltraRare ? 0.7 : tier === 'LEGENDARY' ? 0.6 : tier === 'MEGA' ? 0.5 : tier === 'SUPER' ? 0.35 : 0.2,
                                backdropFilter: isBig ? 'blur(8px)' : tier !== 'BONUS' ? 'blur(4px)' : 'none',
                                transition: 'opacity 0.3s',
                            }} />
                        )}

                        {/* GREAT+: sparkle burst particles */}
                        {isReveal && isBig && (
                            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
                                {Array.from({ length: isEpic ? 40 : 24 }).map((_, i) => {
                                    const angle = (i / (isEpic ? 40 : 24)) * 360;
                                    const dist = 80 + (i % 5) * 40;
                                    const sparkSize = isEpic ? 3 + (i % 3) * 2 : 2 + (i % 2) * 2;
                                    return (
                                        <div key={`sp-${i}`} style={{
                                            position: 'absolute',
                                            top: '50%', left: '50%',
                                            width: `${sparkSize}px`, height: `${sparkSize}px`,
                                            borderRadius: '50%',
                                            backgroundColor: cfg.color,
                                            boxShadow: `0 0 ${sparkSize * 3}px ${cfg.color}, 0 0 ${sparkSize * 6}px ${cfg.color}60`,
                                            animation: `gacha-sparkle-burst 1.5s ${i * 0.02}s ease-out forwards`,
                                            // @ts-ignore
                                            '--sparkle-x': `${Math.cos(angle * Math.PI / 180) * dist}px`,
                                            '--sparkle-y': `${Math.sin(angle * Math.PI / 180) * dist}px`,
                                        } as React.CSSProperties} />
                                    );
                                })}
                            </div>
                        )}

                        {/* LEGENDARY+: white flash x2 */}
                        {isReveal && (tier === 'LEGENDARY' || tier === 'MYTHIC') && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                backgroundColor: tier === 'MYTHIC' ? '#EC489940' : '#fffbe6',
                                animation: 'gacha-legendary-flash 2s ease-out forwards',
                            }} />
                        )}

                        {/* MYTHIC: pink hearts rain */}
                        {isReveal && tier === 'MYTHIC' && (
                            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div key={i} style={{
                                        position: 'absolute',
                                        left: `${5 + (i * 4.7) % 90}%`,
                                        bottom: '-20px',
                                        fontSize: `${14 + (i % 5) * 4}px`,
                                        color: ['#EC4899', '#F472B6', '#FB7185', '#FDA4AF'][i % 4],
                                        animation: `gacha-mythic-hearts ${2 + (i % 3) * 0.5}s ease-out infinite`,
                                        animationDelay: `${(i * 0.3) % 2}s`,
                                        textShadow: '0 0 8px #EC489960',
                                    }}>*</div>
                                ))}
                            </div>
                        )}

                        {/* SHINY: prismatic color-shifting screen */}
                        {isReveal && tier === 'SHINY' && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(135deg, #ff000020, #ff880020, #ffff0020, #00ff0020, #0088ff20, #8800ff20, #ff00ff20)',
                                animation: 'gacha-shiny-prismatic 2s linear infinite',
                            }} />
                        )}

                        {/* PHANTOM: whiteout + reverse colors effect */}
                        {isReveal && tier === 'PHANTOM' && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                backgroundColor: '#fff',
                                animation: 'gacha-phantom-whiteout 3s ease-out forwards',
                            }} />
                        )}

                        {/* BONUS/GREAT: subtle radial light rays */}
                        {isReveal && !isEpic && tier !== 'MISS' && (
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                width: isMobile ? '200px' : '320px',
                                height: isMobile ? '200px' : '320px',
                                background: `conic-gradient(from 0deg, ${cfg.color}00, ${cfg.color}15, ${cfg.color}00, ${cfg.color}15, ${cfg.color}00, ${cfg.color}15, ${cfg.color}00, ${cfg.color}15, ${cfg.color}00)`,
                                borderRadius: '50%',
                                animation: 'gacha-rays 8s linear infinite',
                                opacity: 0.6,
                            }} />
                        )}

                        {/* EPIC: radial light rays */}
                        {isReveal && isEpic && (
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                width: isMobile ? '300px' : '500px',
                                height: isMobile ? '300px' : '500px',
                                background: `conic-gradient(from 0deg, ${cfg.color}00, ${cfg.color}30, ${cfg.color}00, ${cfg.color}30, ${cfg.color}00, ${cfg.color}30, ${cfg.color}00, ${cfg.color}30, ${cfg.color}00, ${cfg.color}30, ${cfg.color}00, ${cfg.color}30, ${cfg.color}00)`,
                                borderRadius: '50%',
                                animation: `gacha-rays ${tier === 'LEGENDARY' ? '4' : '6'}s linear infinite`,
                            }} />
                        )}

                        {/* MEGA/LEGENDARY: color wash background */}
                        {isReveal && isEpic && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: tier === 'LEGENDARY'
                                    ? 'radial-gradient(ellipse at center, #D4AF3730 0%, #B8860B15 40%, transparent 70%)'
                                    : 'radial-gradient(ellipse at center, #8B5CF630 0%, #6D28D915 40%, transparent 70%)',
                                animation: 'gacha-rainbow 3s linear infinite',
                            }} />
                        )}

                        {/* Explosion rings — multiple, staggered */}
                        {isReveal && isBig && (
                            <>
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    width: isMobile ? '80px' : '120px',
                                    height: isMobile ? '80px' : '120px',
                                    marginLeft: isMobile ? '-40px' : '-60px',
                                    marginTop: isMobile ? '-40px' : '-60px',
                                    borderRadius: '50%',
                                    border: `3px solid ${cfg.color}80`,
                                    animation: 'gacha-explosion 1.2s ease-out forwards',
                                }} />
                                <div style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    width: isMobile ? '80px' : '120px',
                                    height: isMobile ? '80px' : '120px',
                                    marginLeft: isMobile ? '-40px' : '-60px',
                                    marginTop: isMobile ? '-40px' : '-60px',
                                    borderRadius: '50%',
                                    border: `2px solid ${cfg.color}50`,
                                    animation: 'gacha-explosion-2 1.8s 0.15s ease-out forwards',
                                }} />
                                {isEpic && (
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        width: isMobile ? '60px' : '90px',
                                        height: isMobile ? '60px' : '90px',
                                        marginLeft: isMobile ? '-30px' : '-45px',
                                        marginTop: isMobile ? '-30px' : '-45px',
                                        borderRadius: '50%',
                                        border: `4px solid ${cfg.color}90`,
                                        animation: 'gacha-explosion 2s 0.3s ease-out forwards',
                                    }} />
                                )}
                            </>
                        )}

                        {/* BONUS+: pulse ring behind text */}
                        {isReveal && tier !== 'MISS' && (
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%',
                                transform: 'translate(-50%,-50%)',
                                width: isMobile ? '120px' : '180px',
                                height: isMobile ? '120px' : '180px',
                                borderRadius: '50%',
                                border: `2px solid ${cfg.color}40`,
                                animation: 'gacha-pulse-ring 1.5s ease-in-out infinite',
                            }} />
                        )}

                        {/* Reel phase: 3-reel slot machine */}
                        {!isReveal && slotReels && (() => {
                            const cellW = isMobile ? 68 : 130;
                            const cellH = isMobile ? 60 : 110;
                            const reelGap = isMobile ? 4 : 8;
                            const allStopped = slotReels.stopped[0] && slotReels.stopped[1] && slotReels.stopped[2];
                            const matchColor = allStopped && tier !== 'MISS' ? cfg.color : '#D4AF37';
                            const isUltraTier = tier === 'MYTHIC' || tier === 'SHINY' || tier === 'PHANTOM';
                            // Ultra-rare frame color override when stopped
                            const frameGlow = allStopped && isUltraTier
                                ? tier === 'PHANTOM' ? '#E2E8F0' : tier === 'SHINY' ? '#06B6D4' : '#EC4899'
                                : matchColor;

                            const renderSymbol = (symId: SlotSymbolId, row: 'above' | 'center' | 'below', reelIdx: number) => {
                                const sym = SLOT_SYMBOL_MAP[symId];
                                if (!sym) return null;
                                const isCenter = row === 'center';
                                const isStopped = slotReels.stopped[reelIdx];
                                const is7 = sym.label === '7';
                                const isKanji = ['鈴', '星', '桜', '神', '虹', '幻'].includes(sym.label);
                                const isUltraSym = !!sym.ultra;
                                return (
                                    <div style={{
                                        width: cellW,
                                        height: cellH,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: `${cellH * sym.scale * (isCenter ? 0.7 : 0.48)}px`,
                                        fontWeight: '900',
                                        fontStyle: is7 ? 'italic' : 'normal',
                                        color: !isCenter ? `${sym.color}40` : sym.color,
                                        textShadow: isCenter && isStopped
                                            ? isUltraSym
                                                ? `0 0 20px ${sym.glow}, 0 0 40px ${sym.glow}, 0 0 60px ${sym.glow}, 0 2px 0 ${sym.stroke || sym.color}`
                                                : is7
                                                    ? `0 2px 0 ${sym.stroke || sym.color}, 0 0 20px ${sym.glow}, 0 0 40px ${sym.glow}`
                                                    : `0 1px 0 ${sym.stroke || sym.color}, 0 0 12px ${sym.glow}`
                                            : !isCenter ? 'none' : `0 1px 0 ${(sym.stroke || sym.color)}40`,
                                        letterSpacing: sym.label === 'BAR' ? '3px' : is7 ? '-2px' : '0',
                                        transition: isStopped ? 'all 0.15s ease-out' : 'none',
                                        animation: isCenter && isStopped
                                            ? isUltraSym
                                                ? 'reel-symbol-flash 0.2s ease-out, ultra-symbol-pulse 1s ease-in-out infinite 0.2s'
                                                : 'reel-symbol-flash 0.2s ease-out'
                                            : undefined,
                                        fontFamily: is7 ? 'Georgia, "Times New Roman", serif'
                                            : isKanji ? '"Hiragino Kaku Gothic Pro", "Yu Gothic", "Meiryo", sans-serif'
                                            : '"Arial Black", "Helvetica Neue", sans-serif',
                                        userSelect: 'none' as const,
                                        WebkitTextStroke: isCenter && is7 ? `1px ${sym.stroke || sym.color}` : undefined,
                                    }}>
                                        {sym.label}
                                    </div>
                                );
                            };

                            return (
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    gap: '10px',
                                    animation: 'slot-machine-enter 0.3s ease-out forwards',
                                }}>
                                    {/* Light vignette — no dark overlay */}
                                    <div style={{
                                        position: 'fixed', inset: 0,
                                        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)',
                                        pointerEvents: 'none',
                                    }} />

                                    {/* SLOT label */}
                                    <div style={{
                                        position: 'relative', zIndex: 2,
                                        fontSize: isMobile ? '12px' : '18px',
                                        fontWeight: '900',
                                        background: 'linear-gradient(180deg, #FFF2A8 0%, #D4AF37 50%, #B8941E 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        letterSpacing: '8px',
                                        marginBottom: '-2px',
                                        textShadow: 'none',
                                        filter: 'drop-shadow(0 1px 2px rgba(184,148,30,0.5))',
                                    }}>
                                        SLOT
                                    </div>

                                    {/* Slot machine body — pachinko gold frame */}
                                    <div style={{
                                        position: 'relative',
                                        background: 'linear-gradient(160deg, #F6E27A 0%, #D4AF37 20%, #B8941E 40%, #D4AF37 60%, #F6E27A 80%, #D4AF37 100%)',
                                        borderRadius: isMobile ? '18px' : '24px',
                                        border: slotReels.reach
                                            ? '3px solid #EF4444'
                                            : '2px solid #8B6914',
                                        boxShadow: slotReels.reach
                                            ? '0 0 40px #EF444450, 0 0 80px #EF444425, inset 0 2px 4px rgba(255,255,255,0.4)'
                                            : allStopped && isUltraTier
                                                ? `0 8px 32px rgba(0,0,0,0.3), 0 0 50px ${frameGlow}60, 0 0 100px ${frameGlow}30, inset 0 2px 4px rgba(255,242,168,0.6)`
                                                : `0 8px 32px rgba(0,0,0,0.3), 0 0 40px ${matchColor}30, inset 0 2px 4px rgba(255,242,168,0.6)`,
                                        padding: isMobile ? '14px 12px' : '24px 22px',
                                        animation: slotReels.reach ? 'reach-border-pulse 0.6s ease-in-out infinite' : undefined,
                                        overflow: 'hidden',
                                    }}>
                                        {/* Metallic sheen overlay */}
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            background: 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)',
                                            pointerEvents: 'none',
                                            borderRadius: 'inherit',
                                        }} />

                                        {/* Reel window — inner recessed panel */}
                                        <div style={{
                                            background: 'linear-gradient(180deg, #8B6914 0%, #A07A1E 2%, #F5EDD6 4%, #FFFEF8 10%, #FFFEF8 90%, #F5EDD6 96%, #A07A1E 98%, #8B6914 100%)',
                                            borderRadius: isMobile ? '10px' : '14px',
                                            padding: isMobile ? '4px' : '6px',
                                            boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.15), inset 0 -2px 6px rgba(0,0,0,0.1)',
                                            position: 'relative',
                                            zIndex: 1,
                                        }}>
                                        {/* 3 reels side by side */}
                                        <div style={{
                                            display: 'flex',
                                            gap: `${reelGap}px`,
                                            position: 'relative',
                                        }}>
                                            {[0, 1, 2].map(reelIdx => {
                                                const isStopped = slotReels.stopped[reelIdx];
                                                return (
                                                    <div key={reelIdx} style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        background: 'linear-gradient(180deg, #FFFEF5 0%, #FFFFFF 20%, #FFFFFF 80%, #F5F0E0 100%)',
                                                        borderRadius: isMobile ? '8px' : '10px',
                                                        overflow: 'hidden',
                                                        border: '1px solid #C9A93E',
                                                        boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.08), inset 0 -2px 8px rgba(0,0,0,0.05)',
                                                        animation: isStopped ? 'reel-bounce 0.25s ease-out' : undefined,
                                                    }}>
                                                        {/* Above row */}
                                                        <div style={{ borderBottom: '1px solid #E8DFC0', opacity: 0.5 }}>
                                                            {renderSymbol(slotReels.above[reelIdx], 'above', reelIdx)}
                                                        </div>
                                                        {/* Center row (payline) */}
                                                        <div style={{
                                                            background: isStopped
                                                                ? 'linear-gradient(180deg, transparent, #FFF8E108, transparent)'
                                                                : 'transparent',
                                                        }}>
                                                            {renderSymbol(slotReels.symbols[reelIdx], 'center', reelIdx)}
                                                        </div>
                                                        {/* Below row */}
                                                        <div style={{ borderTop: '1px solid #E8DFC0', opacity: 0.5 }}>
                                                            {renderSymbol(slotReels.below[reelIdx], 'below', reelIdx)}
                                                        </div>
                                                    </div>
                                                );
                                            })}

                                            {/* Payline indicator — left/right arrows + horizontal line */}
                                            <div style={{
                                                position: 'absolute',
                                                top: `${cellH + cellH / 2 - 1}px`,
                                                left: '-6px',
                                                right: '-6px',
                                                height: '3px',
                                                background: allStopped && tier !== 'MISS'
                                                    ? `linear-gradient(90deg, ${matchColor}, ${matchColor}CC, ${matchColor})`
                                                    : slotReels.reach
                                                        ? 'linear-gradient(90deg, #EF4444, #EF444480, #EF4444)'
                                                        : 'linear-gradient(90deg, #D4AF37, #D4AF3750, #D4AF37)',
                                                borderRadius: '2px',
                                                pointerEvents: 'none',
                                                boxShadow: allStopped && tier !== 'MISS'
                                                    ? `0 0 8px ${matchColor}80`
                                                    : slotReels.reach ? '0 0 8px #EF444460' : '0 0 4px #D4AF3740',
                                                animation: allStopped && tier !== 'MISS' ? 'payline-flash 0.8s ease-in-out infinite' : undefined,
                                            }} />
                                            {/* Left payline arrow */}
                                            <div style={{
                                                position: 'absolute',
                                                top: `${cellH + cellH / 2 - 6}px`,
                                                left: '-10px',
                                                width: 0, height: 0,
                                                borderTop: '6px solid transparent',
                                                borderBottom: '6px solid transparent',
                                                borderLeft: `8px solid ${slotReels.reach ? '#EF4444' : '#D4AF37'}`,
                                                pointerEvents: 'none',
                                            }} />
                                            {/* Right payline arrow */}
                                            <div style={{
                                                position: 'absolute',
                                                top: `${cellH + cellH / 2 - 6}px`,
                                                right: '-10px',
                                                width: 0, height: 0,
                                                borderTop: '6px solid transparent',
                                                borderBottom: '6px solid transparent',
                                                borderRight: `8px solid ${slotReels.reach ? '#EF4444' : '#D4AF37'}`,
                                                pointerEvents: 'none',
                                            }} />
                                        </div>
                                        </div>{/* close reel window */}
                                    </div>

                                    {/* REACH label */}
                                    {slotReels.reach && !allStopped && (
                                        <div style={{
                                            position: 'relative', zIndex: 2,
                                            fontSize: isMobile ? '22px' : '30px',
                                            fontWeight: '900',
                                            color: '#FFFFFF',
                                            letterSpacing: '10px',
                                            textShadow: '0 0 20px #EF4444, 0 0 40px #EF4444, 0 0 80px #EF444480, 0 2px 0 #DC2626',
                                            animation: 'reach-text-flash 0.5s ease-out forwards',
                                            fontFamily: '"Arial Black", sans-serif',
                                        }}>
                                            REACH
                                        </div>
                                    )}

                                    {/* Bottom glow bar */}
                                    <div style={{
                                        position: 'relative', zIndex: 2,
                                        width: isMobile ? '140px' : '200px',
                                        height: '4px',
                                        borderRadius: '999px',
                                        background: slotReels.reach
                                            ? 'linear-gradient(90deg, transparent, #EF4444, #FF6B6B, #EF4444, transparent)'
                                            : `linear-gradient(90deg, transparent, #F6E27A, ${matchColor}, #F6E27A, transparent)`,
                                        boxShadow: slotReels.reach
                                            ? '0 0 12px #EF444460'
                                            : `0 0 12px ${matchColor}40`,
                                        animation: 'xp-bar-pulse 0.5s ease-in-out infinite',
                                    }} />
                                </div>
                            );
                        })()}

                        {/* Reveal phase: tier result */}
                        {isReveal && (
                            <div style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                animation: `gacha-reveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards, gacha-fade-out ${cfg.duration / 1000}s ease-out forwards`,
                            }}>
                                {/* GP number */}
                                <div style={{
                                    fontSize: `${fs * (tier === 'LEGENDARY' ? 1.4 : tier === 'MEGA' ? 1.2 : 1)}px`,
                                    fontWeight: '900',
                                    lineHeight: 1,
                                    letterSpacing: tier === 'LEGENDARY' ? '-6px' : '-3px',
                                    ...(isEpic ? {
                                        background: tier === 'LEGENDARY'
                                            ? 'linear-gradient(180deg, #FFFDE0 0%, #F6C85F 25%, #D4AF37 55%, #B8860B 85%, #8B6914 100%)'
                                            : 'linear-gradient(180deg, #E0D4FF 0%, #A78BFA 25%, #8B5CF6 55%, #6D28D9 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        filter: `drop-shadow(0 0 50px ${cfg.color}) drop-shadow(0 4px 20px ${cfg.color}80)`,
                                    } : {
                                        color: cfg.color,
                                        textShadow: `0 0 40px ${cfg.color}80, 0 4px 20px ${cfg.color}40`,
                                    }),
                                }}>
                                    +{gachaEffect.sparksWon}
                                    <span style={{
                                        fontSize: `${Math.max(fs * 0.28, 12)}px`,
                                        fontWeight: '800',
                                        marginLeft: '6px',
                                        letterSpacing: '3px',
                                    }}>pt</span>
                                </div>
                                {/* Tier name */}
                                {tier !== 'MISS' && (
                                    <div style={{
                                        fontSize: isUltraRare ? (isMobile ? '36px' : '52px') : tier === 'LEGENDARY' ? (isMobile ? '28px' : '42px') : tier === 'MEGA' ? (isMobile ? '20px' : '30px') : (isMobile ? '14px' : '18px'),
                                        fontWeight: '900',
                                        letterSpacing: isUltraRare ? '20px' : tier === 'LEGENDARY' ? '16px' : tier === 'MEGA' ? '10px' : '4px',
                                        color: tier === 'PHANTOM' ? '#fff' : cfg.color,
                                        marginTop: isUltraRare ? '20px' : tier === 'LEGENDARY' ? '16px' : '10px',
                                        textShadow: tier === 'PHANTOM'
                                            ? '0 0 40px #ffffffCC, 0 0 80px #ffffff80, 0 0 120px #ffffff40'
                                            : tier === 'SHINY'
                                            ? `0 0 40px #06B6D4CC, 0 0 80px #EC4899CC, 0 0 120px #D4AF37CC`
                                            : isEpic ? `0 0 40px ${cfg.color}90, 0 0 80px ${cfg.color}40` : `0 0 20px ${cfg.color}60`,
                                        ...(tier === 'SHINY' ? { animation: 'gacha-shiny-prismatic 2s linear infinite' } : {}),
                                        ...(tier === 'PHANTOM' ? { animation: 'gacha-phantom-pulse 1.5s ease-in-out infinite' } : {}),
                                    }}>
                                        {TIER_JA[tier] || tier}
                                        <span style={{
                                            display: 'block',
                                            fontSize: isUltraRare ? (isMobile ? '11px' : '14px') : tier === 'LEGENDARY' ? (isMobile ? '10px' : '13px') : tier === 'MEGA' ? (isMobile ? '9px' : '11px') : (isMobile ? '8px' : '10px'),
                                            fontWeight: '600',
                                            letterSpacing: isUltraRare ? '6px' : '3px',
                                            opacity: 0.7,
                                            marginTop: '4px',
                                            fontFamily: 'system-ui, -apple-system, sans-serif',
                                        }}>
                                            {tier}
                                        </span>
                                    </div>
                                )}
                                {tier === 'MISS' && (
                                    <div style={{
                                        fontSize: isMobile ? '16px' : '20px',
                                        fontWeight: '800',
                                        color: '#A8A29E',
                                        marginTop: '6px',
                                        letterSpacing: '6px',
                                    }}>
                                        凡
                                        <span style={{
                                            display: 'block',
                                            fontSize: isMobile ? '8px' : '9px',
                                            fontWeight: '600',
                                            letterSpacing: '3px',
                                            opacity: 0.6,
                                            marginTop: '2px',
                                            fontFamily: 'system-ui, -apple-system, sans-serif',
                                        }}>
                                            MISS
                                        </span>
                                    </div>
                                )}
                                {/* Card points earned + rank badge */}
                                {gachaEffect.phraseId && gachaEffect.cardPointsEarned > 0 && (() => {
                                    const currentRank = getCardRank(gachaEffect.cardTotalPoints);
                                    return (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', marginTop: '12px' }}>
                                            <div style={{
                                                fontSize: isMobile ? '11px' : '13px',
                                                fontWeight: '700',
                                                color: '#D4AF37',
                                                letterSpacing: '1px',
                                                opacity: 0.9,
                                                animation: 'xp-float 2s ease-out forwards',
                                            }}>
                                                +{gachaEffect.cardPointsEarned} pts
                                            </div>
                                            {currentRank.rank !== 'NORMAL' && (
                                                <div style={{
                                                    fontSize: isMobile ? '10px' : '12px',
                                                    fontWeight: '800',
                                                    letterSpacing: '2px',
                                                    color: currentRank.borderColor,
                                                    padding: '2px 10px',
                                                    borderRadius: '8px',
                                                    border: `1px solid ${currentRank.borderColor}40`,
                                                    backgroundColor: `${currentRank.borderColor}15`,
                                                    boxShadow: `0 0 8px ${currentRank.borderColor}30`,
                                                }}>
                                                    {currentRank.label}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        )}

                        {/* Particles — varied sizes, staggered bursts */}
                        {isReveal && particleCount > 0 && Array.from({ length: particleCount }).map((_, i) => {
                            const size = 2 + (i % 4) * 3 + (isEpic ? 2 : 0);
                            const angle = (i / particleCount) * 360;
                            const dist = 20 + ((i * 31) % 35);
                            const x = 50 + Math.cos(angle * Math.PI / 180) * dist;
                            const y = 50 + Math.sin(angle * Math.PI / 180) * dist;
                            return (
                                <div key={i} style={{
                                    position: 'absolute',
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    borderRadius: i % 3 === 0 ? '2px' : '50%',
                                    backgroundColor: i % 5 === 0 ? '#fff' : cfg.color,
                                    top: `${y}%`,
                                    left: `${x}%`,
                                    animation: `gacha-sparkle ${0.8 + (i % 6) * 0.25}s ease-out forwards`,
                                    animationDelay: `${(i % 8) * 0.08}s`,
                                    boxShadow: isEpic ? `0 0 ${size * 2}px ${cfg.color}80` : 'none',
                                }} />
                            );
                        })}
                    </div>
                );
            })()}

            {/* Quiet points toast (slot OFF) */}
            {quietToast && (
                <div key={quietToast.key} style={{
                    position: 'fixed',
                    top: '72px',
                    right: '16px',
                    zIndex: 9999,
                    pointerEvents: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 18px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(28,25,23,0.88)',
                    backdropFilter: 'blur(8px)',
                    animation: 'quiet-toast 2s ease-out forwards',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}>
                    <span style={{
                        fontSize: '18px',
                        fontWeight: '800',
                        color: quietToast.tier === 'MISS' ? '#A8A29E' : '#F6C85F',
                        letterSpacing: '-0.5px',
                    }}>
                        +{quietToast.sparks} pt
                    </span>
                    {quietToast.cardPts > 0 && (
                        <span style={{
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#D4AF37',
                            opacity: 0.8,
                        }}>
                            +{quietToast.cardPts} pts
                        </span>
                    )}
                    {quietToast.tier !== 'MISS' && quietToast.tier !== 'BONUS' && (
                        <span style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            color: quietToast.tier === 'LEGENDARY' ? '#D4AF37'
                                : quietToast.tier === 'MEGA' ? '#8B5CF6'
                                : quietToast.tier === 'SUPER' ? '#EF4444'
                                : '#F59E0B',
                            letterSpacing: '1px',
                        }}>
                            {TIER_JA[quietToast.tier] || quietToast.tier}
                            <span style={{ opacity: 0.6, marginLeft: '4px', fontSize: '9px' }}>{quietToast.tier}</span>
                        </span>
                    )}
                </div>
            )}

            {/* Header */}
            <div style={{
                padding: '8px 12px',
                backgroundColor: '#fff',
                borderBottom: '1px solid #f0f0f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
                // Raise above fever overlay (z-50)
                position: 'relative',
                zIndex: feverMode.active ? 51 : undefined,
            }}>
                {viewMode === 'calendar' ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                            onClick={prevMonth}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: '14px', color: '#A8A29E', padding: '4px',
                            }}
                        >
                            &#8249;
                        </button>
                        <span
                            onClick={() => { setCurrentMonth(new Date()); setSelectedDate(null); }}
                            style={{
                                fontSize: '14px', fontWeight: '700', color: '#1C1917',
                                cursor: 'pointer', letterSpacing: '-0.3px',
                            }}
                        >
                            {year}.{String(month + 1).padStart(2, '0')}
                        </span>
                        <button
                            onClick={nextMonth}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: '14px', color: '#A8A29E', padding: '4px',
                            }}
                        >
                            &#8250;
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setViewMode('calendar')}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: '12px', color: '#78716C',
                            display: 'flex', alignItems: 'center', gap: '2px',
                        }}
                    >
                        ← Calendar
                    </button>
                )}

                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                    {/* Data Mode Toggle */}
                    <div style={{ display: 'flex', marginRight: '4px' }}>
                        <button
                            onClick={() => {
                                setDataMode('phrases');
                                localStorage.setItem('training-data-mode', 'phrases');
                                setViewMode('calendar');
                            }}
                            style={{
                                padding: '4px 10px',
                                borderRadius: '4px 0 0 4px',
                                border: dataMode === 'phrases' ? '1.5px solid #D4AF37' : '1px solid #E7E5E4',
                                backgroundColor: dataMode === 'phrases' ? '#FFFBEB' : '#fff',
                                color: dataMode === 'phrases' ? '#92400E' : '#A8A29E',
                                fontSize: '10px',
                                fontWeight: dataMode === 'phrases' ? '700' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                            }}
                        >
                            Phrases
                        </button>
                        <button
                            onClick={() => {
                                setDataMode('words');
                                localStorage.setItem('training-data-mode', 'words');
                                setViewMode('calendar');
                            }}
                            style={{
                                padding: '4px 10px',
                                borderRadius: '0 4px 4px 0',
                                border: dataMode === 'words' ? '1.5px solid #8B5CF6' : '1px solid #E7E5E4',
                                backgroundColor: dataMode === 'words' ? '#F5F3FF' : '#fff',
                                color: dataMode === 'words' ? '#6D28D9' : '#A8A29E',
                                fontSize: '10px',
                                fontWeight: dataMode === 'words' ? '700' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                            }}
                        >
                            Words
                        </button>
                    </div>
                    {viewMode === 'calendar' && (
                        <>
                            <button
                                onClick={() => {
                                    const target = selectedDate || (() => {
                                        const d = new Date();
                                        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                                    })();
                                    window.location.href = `/english/training/${target}?settings`;
                                }}
                                style={{
                                    background: 'none', border: '1.5px solid #3B82F6',
                                    borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
                                    fontSize: '11px', fontWeight: '600', color: '#3B82F6',
                                }}
                            >
                                Listen
                            </button>
                            {!isMobile && (
                                <button
                                    onClick={() => { setViewMode('review'); if (!shuffledToday) handleShuffle(); }}
                                    style={{
                                        background: 'none', border: '1.5px solid #D4AF37',
                                        borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
                                        fontSize: '11px', fontWeight: '600', color: '#D4AF37',
                                    }}
                                >
                                    復習
                                </button>
                            )}
                            <button
                                onClick={() => setViewMode('list')}
                                style={{
                                    background: 'none', border: '1px solid #E7E5E4',
                                    borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
                                    fontSize: '11px', fontWeight: '500', color: '#78716C',
                                }}
                            >
                                List
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => setShowAddForm(true)}
                        style={{
                            background: '#1C1917', border: 'none',
                            borderRadius: '6px', padding: '4px 10px', cursor: 'pointer',
                            fontSize: '11px', fontWeight: '600', color: '#fff',
                        }}
                    >
                        +
                    </button>
                    <button
                        onClick={onHelpClick}
                        style={{
                            background: 'none', border: '1.5px solid #D4AF37',
                            borderRadius: '50%', width: '26px', height: '26px',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', fontSize: '13px', fontWeight: '800', color: '#D4AF37',
                            padding: 0, flexShrink: 0,
                        }}
                    >
                        ?
                    </button>
                </div>
            </div>

            {/* Mini Runner - PC only, hidden in calendar tab (only GOD GRID) */}
            {viewMode === 'calendar' && !isMobile && calendarTab === 'puzzle' && (
                <div style={{ position: 'relative' }}>
                    {showRunner && <UpperScreenEffect effect={upperEffect} slotState={slotPanelState} />}
                    {showRunner && (
                        <MiniRunner
                            todayXP={todayXP}
                            goalXP={goalXP}
                            onGoalChange={handleGoalChange}
                            lastReviewedWord={lastReviewedWord}
                            dropCard={puzzleDropCard as any}
                            gridInfo={gridInfo}
                            sessionGP={playerSparks}
                            slotMode="effects"
                            gridCompleteGrade={milestoneData?.grade || null}
                            onSpecialSlotTrigger={handleSpecialSlotTrigger}
                        />
                    )}
                    <button
                        onClick={() => {
                            setShowRunner(prev => {
                                const next = !prev;
                                localStorage.setItem('training-show-runner', String(next));
                                return next;
                            });
                        }}
                        style={{
                            position: showRunner ? 'absolute' : 'relative',
                            right: showRunner ? '8px' : undefined,
                            bottom: showRunner ? '4px' : undefined,
                            marginLeft: showRunner ? undefined : 'auto',
                            display: 'block',
                            background: 'rgba(255,255,255,0.7)',
                            border: '1px solid #E7E5E4',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            fontSize: '10px',
                            fontWeight: '600',
                            color: '#A8A29E',
                            cursor: 'pointer',
                            zIndex: 40,
                            letterSpacing: '0.5px',
                            backdropFilter: 'blur(4px)',
                        }}
                    >
                        {showRunner ? 'HIDE' : 'SHOW RUNNER'}
                    </button>
                </div>
            )}

            {/* Main Content */}
            {viewMode === 'review' ? (
                /* Review View with Slot Machine */
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '0' : '0',
                    // Raise above fever overlay (z-50) so content stays readable
                    position: 'relative',
                    zIndex: feverMode.active ? 51 : undefined,
                }}>
                    {/* Left: Review content */}
                    <div style={{
                        flex: 1,
                        overflow: 'auto',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        padding: isMobile ? '16px' : '48px 24px',
                        order: isMobile ? 2 : 1,
                    }}>
                        <div style={{
                            width: '100%',
                            maxWidth: '780px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                        }}>
                            {renderReviewContent()}
                        </div>
                    </div>
                    {/* Right (desktop) / Top (mobile): Slot Machine */}
                    <div style={{
                        width: isMobile ? '100%' : '420px',
                        flexShrink: 0,
                        order: isMobile ? 1 : 2,
                        borderLeft: isMobile ? 'none' : '1px solid #222',
                        borderBottom: isMobile ? '1px solid #222' : 'none',
                        overflow: isMobile ? 'visible' : 'auto',
                        maxHeight: isMobile ? '380px' : '100%',
                    }}>
                        <ReviewSlotPanel
                            dropCard={puzzleDropCard}
                            cardPool={slotCardPool}
                            specialMode={specialSlotMode}
                            onSpecialSpinDone={handleSpecialSpinDone}
                            onSpinComplete={handleSlotSpinComplete}
                            onBigWin={handleSlotResult}
                            gridInfo={gridInfo}
                            gridCompleteGrade={milestoneData?.grade || null}
                            onBonusSlotPress={() => handleSpecialSlotTrigger(milestoneData?.grade || 'B')}
                            sessionGP={playerSparks}
                            isMobile={isMobile}
                        />
                    </div>
                </div>
            ) : viewMode === 'list' ? (
                /* List View */
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Search */}
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e5e5', backgroundColor: '#fff' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            style={{
                                width: '100%',
                                padding: '10px 14px',
                                borderRadius: '8px',
                                border: '1px solid #e5e5e5',
                                fontSize: '14px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Header */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        borderBottom: '1px solid #e5e5e5',
                        backgroundColor: '#fafafa'
                    }}>
                        <div style={{ fontSize: '16px', fontWeight: '600', color: '#333' }}>
                            All Phrases ({filteredPhrases.length})
                        </div>
                        <div style={{ fontSize: '12px', color: '#888' }}>
                            Active: {activeCount} | OWN+: {ownPlusCount}
                        </div>
                    </div>

                    {/* Table Header */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 80px 2fr 80px 60px 30px 32px 40px',
                        padding: '10px 16px',
                        borderBottom: '1px solid #e5e5e5',
                        backgroundColor: '#fafafa',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#888'
                    }}>
                        <div>English</div>
                        <div>Category</div>
                        <div>Japanese</div>
                        <div>Status</div>
                        <div style={{ textAlign: 'right' }}>Date</div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>

                    {/* List */}
                    <div style={{ flex: 1, overflowY: 'auto' }}>
                        {filteredPhrases.map(phrase => {
                            const baseMastery = Number(phraseMastery[phrase.id] || 0);
                            const hasRec = (voiceRecordings[phrase.id] || []).length > 0;
                            const hasLink = (phraseLinks[phrase.id] || []).length > 0;
                            const masteryInfo = getChakraInfo(baseMastery, hasRec, hasLink);
                            const isLockedToday = baseMastery === 3 || (baseMastery !== 6 && baseMastery < 3 && phraseLastLeveled[phrase.id] === clientToday);
                            return (
                                <div
                                    key={phrase.id}
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 80px 2fr 80px 60px 30px 32px 40px',
                                        padding: '12px 16px',
                                        borderBottom: '1px solid #f0f0f0',
                                        alignItems: 'center'
                                    }}
                                >
                                    <div
                                        onClick={() => setSelectedDate(phrase.date.split('T')[0])}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div style={{ fontSize: '14px', fontWeight: '500', color: CATEGORY_COLORS[phrase.category]?.text || '#333' }}>
                                            {phrase.english}
                                        </div>
                                        <div style={{ fontSize: '8.5px', fontStyle: 'italic', color: '#B5A99A', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                            &ldquo;{getFlavorText(phrase.id).en}&rdquo;
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#888' }}>
                                        {phrase.category}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#666', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {phrase.japanese}
                                    </div>
                                    <button
                                        onClick={() => { if (!isLockedToday) cycleMastery(phrase.id); }}
                                        style={{
                                            fontSize: '10px',
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            border: 'none',
                                            backgroundColor: masteryInfo.bg,
                                            color: masteryInfo.color,
                                            fontWeight: '600',
                                            cursor: isLockedToday ? 'not-allowed' : 'pointer',
                                            opacity: isLockedToday ? 0.5 : 1,
                                        }}
                                    >
                                        {masteryInfo.label}
                                    </button>
                                    <div style={{ fontSize: '11px', color: '#888', textAlign: 'right' }}>
                                        {phrase.date.split('T')[0].slice(5)}
                                    </div>
                                    <button
                                        onClick={() => playYouGlish(phrase)}
                                        style={{
                                            background: '#f0f0f0',
                                            border: 'none',
                                            color: '#666',
                                            fontSize: '9px',
                                            cursor: 'pointer',
                                            padding: '4px 6px',
                                            borderRadius: '4px'
                                        }}
                                    >
                                        YG
                                    </button>
                                    <button
                                        onClick={() => setEditingPhrase({ id: phrase.id, english: phrase.english, japanese: phrase.japanese })}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#ccc',
                                            fontSize: '11px',
                                            cursor: 'pointer',
                                            padding: '4px',
                                            borderRadius: '4px',
                                            textAlign: 'center'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.backgroundColor = '#EFF6FF'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = '#ccc'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeletePhrase(phrase.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#ccc',
                                            fontSize: '11px',
                                            cursor: 'pointer',
                                            padding: '4px',
                                            borderRadius: '4px',
                                            textAlign: 'center'
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.backgroundColor = '#fef2f2'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.color = '#ccc'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                                    >
                                        削除
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                /* Calendar View */
                <div style={{
                    flex: 1,
                    overflow: isMobile ? 'auto' : 'hidden',
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    // Raise above fever overlay (z-50) so content stays readable
                    position: 'relative',
                    zIndex: feverMode.active ? 51 : undefined,
                }}>
                    {/* Calendar Section */}
                    <div style={{
                        flex: isMobile ? 'none' : (calendarTab === 'puzzle' ? '0 0 auto' : '1 1 0%'),
                        minWidth: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: isMobile ? 'visible' : 'hidden',
                        backgroundColor: '#fff',
                        zIndex: isMobile ? 10 : 'auto',
                        order: isMobile ? 2 : 0,
                    }}>
                        {/* Calendar / Puzzle Tab Switcher */}
                        <div style={{
                            display: 'flex',
                            borderBottom: '1px solid #E7E5E4',
                            flexShrink: 0,
                            backgroundColor: '#fff',
                        }}>
                            <button
                                onClick={() => setCalendarTab('calendar')}
                                style={{
                                    flex: 1, padding: '7px 0', border: 'none', cursor: 'pointer',
                                    fontSize: '10px', fontWeight: calendarTab === 'calendar' ? '800' : '500',
                                    letterSpacing: '1.5px', color: calendarTab === 'calendar' ? '#1C1917' : '#A8A29E',
                                    background: '#fff',
                                    borderBottom: calendarTab === 'calendar' ? '2px solid #1C1917' : '2px solid transparent',
                                }}
                            >
                                CALENDAR
                            </button>
                            <button
                                onClick={() => setCalendarTab('puzzle')}
                                style={{
                                    flex: 1, padding: '7px 0', border: 'none', cursor: 'pointer',
                                    fontSize: '10px', fontWeight: calendarTab === 'puzzle' ? '800' : '500',
                                    letterSpacing: '1.5px', color: calendarTab === 'puzzle' ? '#D4AF37' : '#A8A29E',
                                    background: '#fff',
                                    borderBottom: calendarTab === 'puzzle' ? '2px solid #D4AF37' : '2px solid transparent',
                                }}
                            >
                                GOD GRID
                            </button>
                        </div>

                        {/* Tab Content: Calendar */}
                        {calendarTab === 'calendar' && (<>
                        {/* Mobile: Today's Activity Calendar (31-day grid showing today's review touches) */}
                        {isMobile && (
                            <>
                                {/* Mobile Day Headers */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    borderBottom: '1px solid #eee',
                                    flexShrink: 0,
                                }}>
                                    {dayNames.map((dn, idx) => (
                                        <div key={dn} style={{
                                            textAlign: 'center',
                                            fontSize: '10px',
                                            color: idx === 0 ? '#ef4444' : idx === 6 ? '#3b82f6' : '#666',
                                            fontWeight: '600',
                                            padding: '6px 0',
                                        }}>
                                            {dn}
                                        </div>
                                    ))}
                                </div>
                                {/* Mobile Activity Grid */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(7, 1fr)',
                                    gap: '2px',
                                    padding: '4px',
                                }}>
                                    {calendarDays.map((day, index) => {
                                        if (day === null) return <div key={`empty-${index}`} style={{ backgroundColor: '#fafafa', borderRadius: '4px', minHeight: '52px' }} />;

                                        const dateKey = formatDateKey(day);
                                        const allDayPhrases = phrasesByDate[dateKey] || [];
                                        const hasPhrases = allDayPhrases.length > 0;
                                        const isTodayDate = isToday(day);
                                        const isPulsing = calendarPulse?.dateKey === dateKey;
                                        const isActiveReview = activeReviewDateKey === dateKey;

                                        // Chakra computation (same as PC)
                                        const total = allDayPhrases.length;
                                        const mChakraCounts: Record<ChakraLevel, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
                                        for (const p of allDayPhrases) {
                                            const m = Number(phraseMastery[p.id] || 0);
                                            const hasRec = (voiceRecordings[p.id] || []).length > 0;
                                            const hasLink = (phraseLinks[p.id] || []).length > 0;
                                            mChakraCounts[getChakraLevel(m, hasRec, hasLink)]++;
                                        }
                                        const dailyPts = Object.entries(mChakraCounts).reduce((s, [lv, cnt]) => s + (Number(lv) > 0 ? CHAKRA_CONFIG[Number(lv) as ChakraLevel].lv * cnt : 0), 0);
                                        const mCum: Record<ChakraLevel, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
                                        let mSum = 0;
                                        for (let lv = 6; lv >= 1; lv--) { mSum += mChakraCounts[lv as ChakraLevel]; mCum[lv as ChakraLevel] = mSum; }

                                        return (
                                            <div
                                                key={day}
                                                onClick={() => { if (hasPhrases) { setSelectedDate(dateKey); setSelectedChakraFilter(null); } }}
                                                style={{
                                                    borderRadius: '4px',
                                                    padding: '3px',
                                                    minHeight: '52px',
                                                    cursor: hasPhrases ? 'pointer' : 'default',
                                                    backgroundColor: !hasPhrases ? '#fafafa'
                                                        : dailyPts === 0 ? '#fafafa'
                                                            : dailyPts < total * 2 ? '#FFFDF5'
                                                                : dailyPts < total * 3 ? '#FFF9E6'
                                                                    : dailyPts < total * 5 ? '#FFF3CC'
                                                                        : '#FFECAD',
                                                    border: isActiveReview
                                                        ? '3px solid #D4AF37'
                                                        : isTodayDate
                                                            ? '2px solid #D4AF37'
                                                            : hasPhrases ? '1px solid #e5e5e5' : '1px solid #f0f0f0',
                                                    position: 'relative',
                                                    overflow: 'visible',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    transition: isPulsing ? 'none' : 'background-color 0.4s, border 0.3s',
                                                    zIndex: isPulsing ? 30 : isActiveReview ? 10 : 'auto',
                                                    ...(isActiveReview && !isPulsing ? {
                                                        animation: 'review-active-cell 1.5s ease-in-out infinite',
                                                        transform: 'scale(1.08)',
                                                        backgroundColor: '#FFF8E1',
                                                    } : {}),
                                                    ...(isPulsing ? {
                                                        animation: `cell-boom 2s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                                                        '--boom-color': calendarPulse.gradFrom,
                                                    } as React.CSSProperties : {}),
                                                }}
                                            >
                                                {/* White flash overlay */}
                                                {isPulsing && (
                                                    <div key={`mob-wflash-${calendarPulse!.key}`} style={{
                                                        position: 'absolute', inset: 0, borderRadius: '4px',
                                                        backgroundColor: calendarPulse!.gradFrom,
                                                        pointerEvents: 'none', zIndex: 5,
                                                        animation: 'cell-white-flash 1.5s ease-out forwards',
                                                    }} />
                                                )}
                                                {/* Expanding ring */}
                                                {isPulsing && (
                                                    <div key={`mob-ring-${calendarPulse!.key}`} style={{
                                                        position: 'absolute', top: '50%', left: '50%',
                                                        width: '100%', height: '100%',
                                                        marginLeft: '-50%', marginTop: '-50%',
                                                        borderRadius: '8px',
                                                        border: `3px solid ${calendarPulse!.gradFrom}`,
                                                        pointerEvents: 'none', zIndex: 25,
                                                        animation: 'cell-ring 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                                                    }} />
                                                )}
                                                {/* Particle burst (delayed to Phase 2) */}
                                                {isPulsing && (() => {
                                                    const particles = Array.from({ length: 12 }, (_, i) => {
                                                        const angle = (i / 12) * 360 + (Math.random() - 0.5) * 30;
                                                        const dist = 20 + Math.random() * 25;
                                                        const rad = angle * Math.PI / 180;
                                                        return { tx: Math.cos(rad) * dist, ty: Math.sin(rad) * dist, size: 3 + Math.random() * 3, delay: Math.random() * 0.1, dur: 0.5 + Math.random() * 0.4, i };
                                                    });
                                                    return (
                                                        <div key={`mob-${calendarPulse!.key}`} style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, pointerEvents: 'none', zIndex: 20 }}>
                                                            {particles.map(p => (
                                                                <div key={p.i} style={{
                                                                    position: 'absolute', width: `${p.size}px`, height: `${p.size}px`,
                                                                    borderRadius: p.i % 3 === 0 ? '0' : '50%',
                                                                    backgroundColor: calendarPulse!.gradFrom,
                                                                    boxShadow: `0 0 4px ${calendarPulse!.gradFrom}`,
                                                                    animation: `cal-burst ${p.dur}s ${p.delay + 0.8}s cubic-bezier(0.25,1,0.5,1) forwards`,
                                                                    '--tx': `${p.tx}px`, '--ty': `${p.ty}px`,
                                                                } as React.CSSProperties} />
                                                            ))}
                                                        </div>
                                                    );
                                                })()}
                                                {/* Floating +N (delayed to Phase 2) */}
                                                {isPulsing && (
                                                    <div key={calendarPulse!.key} style={{
                                                        position: 'absolute', top: '-6px', left: 0, right: 0,
                                                        display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 10,
                                                    }}>
                                                        <span style={{
                                                            fontSize: '13px', fontWeight: '900',
                                                            color: calendarPulse!.gradFrom,
                                                            textShadow: `0 1px 2px ${calendarPulse!.color}80`,
                                                            animation: 'cal-pop 1s 0.1s cubic-bezier(0.22,1,0.36,1) both',
                                                        }}>
                                                            +{calendarPulse!.points}
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Day number + daily points (same as PC) */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{
                                                        fontSize: '10px',
                                                        fontWeight: isTodayDate ? '800' : '600',
                                                        color: isTodayDate ? '#D4AF37' : !hasPhrases ? '#ccc' : '#78716C',
                                                        lineHeight: 1,
                                                    }}>
                                                        {day}
                                                    </span>
                                                    {dailyPts > 0 && (
                                                        <span style={{
                                                            fontSize: '9px',
                                                            fontWeight: '900',
                                                            color: dailyPts >= total * 5 ? '#B8860B' : '#D4AF37',
                                                            lineHeight: 1,
                                                        }}>
                                                            {dailyPts}
                                                        </span>
                                                    )}
                                                </div>
                                                {/* Chakra bars (same structure as PC) */}
                                                {hasPhrases && (
                                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1px', marginTop: '2px', position: 'relative' }}>
                                                        {/* Total count + review count overlay */}
                                                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 2 }}>
                                                            <span style={{ fontSize: '16px', fontWeight: '900', color: 'rgba(0,0,0,0.07)', lineHeight: 1 }}>{total}</span>
                                                            {(monthlyReviewCounts[dateKey]?.count || 0) > 0 && (
                                                                <span style={{ fontSize: '8px', fontWeight: '800', color: '#D4AF37', lineHeight: 1, marginTop: '1px', opacity: 0.85 }}>
                                                                    +{monthlyReviewCounts[dateKey]?.count}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {([6, 5, 4, 3, 2, 1] as ChakraLevel[]).map(lv => {
                                                            const pct = total > 0 ? (mCum[lv] / total) * 100 : 0;
                                                            const isFlashLv = isPulsing && calendarPulse!.level === lv;
                                                            const isActiveBar = isActiveReview && activeReviewLevel === lv && !isPulsing;
                                                            return (
                                                                <div key={lv} style={{
                                                                    flex: isActiveBar ? 2.5 : 1,
                                                                    borderRadius: '1px',
                                                                    backgroundColor: isActiveBar ? `${CHAKRA_CONFIG[lv].gradFrom}25` : '#F0EFEC',
                                                                    overflow: 'hidden',
                                                                    position: 'relative',
                                                                    zIndex: isActiveBar ? 3 : 1,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    transition: 'flex 0.3s ease, background-color 0.3s ease',
                                                                    ...(isActiveBar ? {
                                                                        animation: 'review-active-bar 1.5s ease-in-out infinite',
                                                                        '--bar-glow-color': `${CHAKRA_CONFIG[lv].gradFrom}90`,
                                                                    } as React.CSSProperties : {}),
                                                                }}>
                                                                    <div
                                                                        key={isFlashLv ? `mf-${calendarPulse!.key}` : `mb-${lv}`}
                                                                        style={{
                                                                            width: `${pct}%`,
                                                                            height: '100%',
                                                                            background: `linear-gradient(90deg, ${CHAKRA_CONFIG[lv].gradFrom}, ${CHAKRA_CONFIG[lv].gradTo})`,
                                                                            transition: isFlashLv ? 'none' : 'width 0.6s ease',
                                                                            minWidth: mCum[lv] > 0 ? '2px' : '0px',
                                                                            ...(isFlashLv ? {
                                                                                animation: `bar-flash 1.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both, bar-glow 2s 0.1s ease-out both`,
                                                                                '--bar-target': `${pct}%`,
                                                                                '--bar-before': `${Math.max(0, pct - (100 / total))}%`,
                                                                                '--glow-color': `${CHAKRA_CONFIG[lv].gradFrom}80`,
                                                                            } as React.CSSProperties : {}),
                                                                        }}
                                                                    />
                                                                    {/* Count label (right) */}
                                                                    <span style={{
                                                                        position: 'absolute',
                                                                        right: '1px',
                                                                        fontSize: '6px',
                                                                        fontWeight: '800',
                                                                        color: mCum[lv] > 0 ? CHAKRA_CONFIG[lv].color : '#ccc',
                                                                        lineHeight: 1,
                                                                    }}>
                                                                        {mCum[lv] > 0 ? mCum[lv] : ''}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                {/* Today summary line */}
                            </>
                        )}

                        {/* PC: Day Headers */}
                        {!isMobile && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)',
                                borderBottom: '1px solid #eee',
                                flexShrink: 0
                            }}>
                                {dayNames.map((day, index) => (
                                    <div
                                        key={day}
                                        style={{
                                            textAlign: 'center',
                                            fontSize: '11px',
                                            color: index === 0 ? '#ef4444' : index === 6 ? '#3b82f6' : '#666',
                                            fontWeight: '600',
                                            padding: '8px 0'
                                        }}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Calendar Grid (PC only) */}
                        {!isMobile && (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(7, 1fr)',
                                gridTemplateRows: `repeat(${rows}, 1fr)`,
                                gap: '0px',
                                padding: '0px',
                                flex: 1,
                                minHeight: 0
                            }}>
                                {calendarDays.map((day, index) => {
                                    if (day === null) {
                                        return <div key={`empty-${index}`} style={{ backgroundColor: '#fafafa', borderRadius: '6px' }} />;
                                    }

                                    const dateKey = formatDateKey(day);
                                    const allDayPhrases = phrasesByDate[dateKey] || [];
                                    const hasAnyPhrases = allDayPhrases.length > 0;
                                    const isTodayDate = isToday(day);
                                    const dayOfWeek = (startDayOfWeek + day - 1) % 7;

                                    // Count phrases at each chakra level for this day
                                    const total = allDayPhrases.length;
                                    const chakraCounts: Record<ChakraLevel, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
                                    for (const p of allDayPhrases) {
                                        const m = Number(phraseMastery[p.id] || 0);
                                        const hasRec = (voiceRecordings[p.id] || []).length > 0;
                                        const hasLink = (phraseLinks[p.id] || []).length > 0;
                                        chakraCounts[getChakraLevel(m, hasRec, hasLink)]++;
                                    }
                                    const allCleared = total > 0 && chakraCounts[0] === 0;
                                    const dailyPts = Object.entries(chakraCounts).reduce((s, [lv, cnt]) => s + (Number(lv) > 0 ? CHAKRA_CONFIG[Number(lv) as ChakraLevel].lv * cnt : 0), 0);
                                    const isPulsing = calendarPulse?.dateKey === dateKey;
                                    const isActiveReview = activeReviewDateKey === dateKey;

                                    // Cumulative: each level = "phrases that reached at least this level"
                                    // EGG(0) = untouched, always 0%. Bars start from HATCH(1).
                                    const cumulative: Record<ChakraLevel, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
                                    let runningSum = 0;
                                    for (let lv = 6; lv >= 1; lv--) {
                                        runningSum += chakraCounts[lv as ChakraLevel];
                                        cumulative[lv as ChakraLevel] = runningSum;
                                    }
                                    // SEED stays 0 — never fills the bar
                                    const barSegments = ([0, 1, 2, 3, 4, 5, 6] as ChakraLevel[]).map(lv => ({
                                        reached: cumulative[lv],
                                        pct: total > 0 ? (cumulative[lv] / total) * 100 : 0,
                                        exactCount: chakraCounts[lv],
                                        color: CHAKRA_CONFIG[lv].border,
                                        label: CHAKRA_CONFIG[lv].label,
                                    }));

                                    return (
                                        <div
                                            key={day}
                                            onClick={() => { if (hasAnyPhrases) { setSelectedDate(dateKey); setSelectedChakraFilter(null); } }}
                                            onMouseEnter={(e) => {
                                                if (hasAnyPhrases) {
                                                    e.currentTarget.style.transform = 'scale(1.02)';
                                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                            style={{
                                                borderRadius: '4px',
                                                cursor: hasAnyPhrases ? 'pointer' : 'default',
                                                overflow: 'visible',
                                                padding: '4px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                backgroundColor: !hasAnyPhrases ? '#fafafa'
                                                    : dailyPts === 0 ? '#fafafa'
                                                        : dailyPts < total * 2 ? '#FFFDF5'
                                                            : dailyPts < total * 3 ? '#FFF9E6'
                                                                : dailyPts < total * 5 ? '#FFF3CC'
                                                                    : '#FFECAD',
                                                border: isActiveReview
                                                    ? '3px solid #D4AF37'
                                                    : isTodayDate
                                                        ? '2px solid #D4AF37'
                                                        : hasAnyPhrases ? '1px solid #e5e5e5' : '1px solid #f0f0f0',
                                                transition: isPulsing ? 'none' : 'transform 0.15s, box-shadow 0.15s, background-color 0.4s, border 0.3s',
                                                position: 'relative',
                                                overflow: 'visible',
                                                zIndex: isPulsing ? 30 : isActiveReview ? 10 : 'auto',
                                                ...(isActiveReview && !isPulsing ? {
                                                    animation: 'review-active-cell 1.5s ease-in-out infinite',
                                                    transform: 'scale(1.06)',
                                                    backgroundColor: '#FFF8E1',
                                                } : {}),
                                                ...(isPulsing ? {
                                                    animation: `cell-boom 2s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                                                    '--boom-color': calendarPulse.gradFrom,
                                                } as React.CSSProperties : {}),
                                            }}
                                        >
                                            {/* White flash overlay on level-up */}
                                            {isPulsing && (
                                                <div key={`wflash-${calendarPulse.key}`} style={{
                                                    position: 'absolute',
                                                    inset: 0,
                                                    borderRadius: '4px',
                                                    backgroundColor: calendarPulse.gradFrom,
                                                    pointerEvents: 'none',
                                                    zIndex: 5,
                                                    animation: 'cell-white-flash 1.5s ease-out forwards',
                                                }} />
                                            )}
                                            {/* Expanding ring on level-up */}
                                            {isPulsing && (
                                                <div key={`ring-${calendarPulse.key}`} style={{
                                                    position: 'absolute',
                                                    top: '50%', left: '50%',
                                                    width: '100%', height: '100%',
                                                    marginLeft: '-50%', marginTop: '-50%',
                                                    borderRadius: '8px',
                                                    border: `4px solid ${calendarPulse.gradFrom}`,
                                                    pointerEvents: 'none',
                                                    zIndex: 25,
                                                    animation: 'cell-ring 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                                                }} />
                                            )}
                                            {/* Floating +N on level-up */}
                                            {isPulsing && (
                                                <div key={calendarPulse.key} style={{
                                                    position: 'absolute',
                                                    top: '-6px', left: 0, right: 0,
                                                    display: 'flex', justifyContent: 'center',
                                                    pointerEvents: 'none', zIndex: 10,
                                                }}>
                                                    <span style={{
                                                        fontSize: isMobile ? '13px' : '16px',
                                                        fontWeight: '900',
                                                        color: calendarPulse.gradFrom,
                                                        textShadow: `0 1px 2px ${calendarPulse.color}80, 0 0 8px ${calendarPulse.gradFrom}40`,
                                                        animation: 'cal-pop 1s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both',
                                                    }}>
                                                        +{calendarPulse.points}
                                                    </span>
                                                </div>
                                            )}
                                            {/* Particle burst on level-up */}
                                            {isPulsing && (() => {
                                                const particles = Array.from({ length: 12 }, (_, i) => {
                                                    const angle = (i / 12) * 360 + (Math.random() - 0.5) * 30;
                                                    const dist = 20 + Math.random() * 25;
                                                    const rad = angle * Math.PI / 180;
                                                    const tx = Math.cos(rad) * dist;
                                                    const ty = Math.sin(rad) * dist;
                                                    const size = 3 + Math.random() * 3;
                                                    const delay = Math.random() * 0.1;
                                                    const dur = 0.5 + Math.random() * 0.4;
                                                    return { tx, ty, size, delay, dur, i };
                                                });
                                                return (
                                                    <div key={`burst-${calendarPulse.key}`} style={{
                                                        position: 'absolute',
                                                        top: '50%', left: '50%',
                                                        width: 0, height: 0,
                                                        pointerEvents: 'none', zIndex: 20,
                                                    }}>
                                                        {particles.map(p => (
                                                            <div key={p.i} style={{
                                                                position: 'absolute',
                                                                width: `${p.size}px`,
                                                                height: `${p.size}px`,
                                                                borderRadius: p.i % 3 === 0 ? '0' : '50%',
                                                                backgroundColor: calendarPulse.gradFrom,
                                                                boxShadow: `0 0 4px ${calendarPulse.gradFrom}`,
                                                                animation: `cal-burst ${p.dur}s ${p.delay + 0.8}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
                                                                transform: 'translate(0,0) scale(1)',
                                                                '--tx': `${p.tx}px`,
                                                                '--ty': `${p.ty}px`,
                                                            } as React.CSSProperties} />
                                                        ))}
                                                    </div>
                                                );
                                            })()}

                                            {/* Day number + daily points */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{
                                                    fontSize: '10px',
                                                    fontWeight: '600',
                                                    color: dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : '#aaa',
                                                    lineHeight: 1
                                                }}>
                                                    {day}
                                                </span>
                                                {dailyPts > 0 && (
                                                    <span style={{
                                                        fontSize: isMobile ? '9px' : '12px',
                                                        fontWeight: '900',
                                                        color: dailyPts >= total * 5 ? '#B8860B' : '#D4AF37',
                                                        lineHeight: 1,
                                                    }}>
                                                        {dailyPts}
                                                    </span>
                                                )}
                                            </div>

                                            {/* 7-row evolution bars (MASTER top → EGG bottom) - cumulative */}
                                            {hasAnyPhrases && (
                                                <div style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    marginTop: '2px',
                                                    gap: '1px',
                                                    position: 'relative',
                                                }}>
                                                    {/* Background: total count + review count */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        inset: 0,
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        pointerEvents: 'none',
                                                        zIndex: 2,
                                                    }}>
                                                        <span style={{
                                                            fontSize: isMobile ? '24px' : '50px',
                                                            fontWeight: '900',
                                                            color: 'rgba(0,0,0,0.08)',
                                                            lineHeight: 1,
                                                        }}>
                                                            {total}
                                                        </span>
                                                        {(monthlyReviewCounts[dateKey]?.count || 0) > 0 && (
                                                            <span style={{
                                                                fontSize: isMobile ? '11px' : '15px',
                                                                fontWeight: '800',
                                                                color: '#D4AF37',
                                                                lineHeight: 1,
                                                                marginTop: isMobile ? '1px' : '3px',
                                                                opacity: 0.85,
                                                            }}>
                                                                +{monthlyReviewCounts[dateKey]?.count}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {([6, 5, 4, 3, 2, 1] as ChakraLevel[]).map(lv => {
                                                        const seg = barSegments[lv];
                                                        const isFlashingLevel = isPulsing && calendarPulse.level === lv;
                                                        const isActiveBar = isActiveReview && activeReviewLevel === lv && !isPulsing;
                                                        return (
                                                            <div
                                                                key={lv}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (seg.exactCount > 0) {
                                                                        setSelectedDate(dateKey);
                                                                        setSelectedChakraFilter(prev => prev === lv ? null : lv);
                                                                    }
                                                                }}
                                                                style={{
                                                                    flex: isActiveBar ? 2.5 : 1,
                                                                    borderRadius: '1px',
                                                                    backgroundColor: isActiveBar ? `${CHAKRA_CONFIG[lv].gradFrom}25` : '#F0EFEC',
                                                                    overflow: 'hidden',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    cursor: seg.exactCount > 0 ? 'pointer' : 'default',
                                                                    position: 'relative',
                                                                    zIndex: isActiveBar ? 3 : 1,
                                                                    transition: 'flex 0.3s ease, background-color 0.3s ease',
                                                                    ...(isActiveBar ? {
                                                                        animation: 'review-active-bar 1.5s ease-in-out infinite',
                                                                        '--bar-glow-color': `${CHAKRA_CONFIG[lv].gradFrom}90`,
                                                                    } as React.CSSProperties : {}),
                                                                }}
                                                            >
                                                                <div
                                                                    key={isFlashingLevel ? `flash-${calendarPulse.key}` : `bar-${lv}`}
                                                                    style={{
                                                                        width: `${seg.pct}%`,
                                                                        height: '100%',
                                                                        background: `linear-gradient(90deg, ${CHAKRA_CONFIG[lv].gradFrom}, ${CHAKRA_CONFIG[lv].gradTo})`,
                                                                        transition: isFlashingLevel ? 'none' : 'width 0.6s cubic-bezier(0.33, 0, 0.2, 1)',
                                                                        minWidth: seg.reached > 0 ? '2px' : '0px',
                                                                        opacity: selectedDate === dateKey && selectedChakraFilter !== null && selectedChakraFilter !== lv ? 0.25 : 1,
                                                                        ...(isFlashingLevel ? {
                                                                            animation: `bar-flash 1.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both, bar-glow 2s 0.1s ease-out both`,
                                                                            '--bar-target': `${seg.pct}%`,
                                                                            '--bar-before': `${Math.max(0, seg.pct - (100 / total))}%`,
                                                                            '--glow-color': `${CHAKRA_CONFIG[lv].gradFrom}80`,
                                                                        } as React.CSSProperties : {}),
                                                                    }}>
                                                                </div>
                                                                {/* Percentage (left) */}
                                                                <span style={{
                                                                    position: 'absolute',
                                                                    left: '2px',
                                                                    fontSize: '7px',
                                                                    fontWeight: '600',
                                                                    color: seg.reached > 0 ? CHAKRA_CONFIG[lv].color : '#ccc',
                                                                    lineHeight: 1,
                                                                    opacity: 0.7,
                                                                }}>
                                                                    {Math.round(seg.pct)}%
                                                                </span>
                                                                {/* Count (right) */}
                                                                <span style={{
                                                                    position: 'absolute',
                                                                    right: '2px',
                                                                    fontSize: '9px',
                                                                    fontWeight: '800',
                                                                    color: seg.reached > 0 ? CHAKRA_CONFIG[lv].color : '#ccc',
                                                                    lineHeight: 1,
                                                                }}>
                                                                    {seg.reached}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}

                                            {/* Empty cell: Just + button */}
                                            {!hasAnyPhrases && (
                                                <div style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setFormDate(dateKey);
                                                            setShowAddForm(true);
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = '#D4AF37';
                                                            e.currentTarget.style.color = '#fff';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = 'rgba(212,175,55,0.2)';
                                                            e.currentTarget.style.color = '#B8960C';
                                                        }}
                                                        style={{
                                                            width: '22px',
                                                            height: '22px',
                                                            borderRadius: '50%',
                                                            background: 'rgba(212,175,55,0.2)',
                                                            border: 'none',
                                                            fontSize: '14px',
                                                            fontWeight: '400',
                                                            color: '#B8960C',
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            )}

                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        </>)}

                        {/* Tab Content: GOD GRID + Slot Machine — side by side on PC */}
                        {calendarTab === 'puzzle' && (
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: isMobile ? 'column' : 'row',
                                backgroundColor: '#FAFAF9',
                                overflow: 'hidden',
                                // Raise above fever overlay (z-50) so content stays readable
                                position: 'relative',
                                zIndex: feverMode.active ? 51 : undefined,
                            }}>
                                {/* Left: GOD GRID */}
                                <div style={{
                                    flex: '0 0 auto',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    padding: isMobile ? '4px 2px' : '8px',
                                    overflowY: 'auto',
                                }}>
                                    <PuzzleBoard
                                        dropCard={puzzleDropCard as any}
                                        chainMode={chainState.mode}
                                        isMobile={isMobile}
                                        cardPoints={cardPoints}
                                        mastery={phraseMastery}
                                        hideSidePanel={!isMobile}
                                        onChainResult={(result) => {
                                            if (result.gpEarned > 0) {
                                                setPlayerSparks(prev => prev + result.gpEarned);
                                            }
                                        }}
                                        onGridMilestone={(data) => setMilestoneData(data)}
                                        onGridUpdate={setGridInfo}
                                        onCardClick={(phraseId) => {
                                            const phrase = phrases.find(p => p.id === phraseId);
                                            if (phrase) {
                                                const dateKey = phrase.date.split('T')[0];
                                                setSelectedDate(dateKey);
                                            }
                                        }}
                                    />
                                </div>
                                {/* Center: Card Slot Machine */}
                                <div style={{
                                    flex: isMobile ? undefined : 1,
                                    minWidth: isMobile ? undefined : '420px',
                                    borderLeft: isMobile ? 'none' : '1px solid #292524',
                                    borderTop: isMobile ? '1px solid #292524' : 'none',
                                    backgroundColor: '#0A0A0A',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    padding: isMobile ? '8px 0' : '16px 0',
                                    overflowY: 'auto',
                                }}>
                                    <ReviewSlotPanel
                                        dropCard={puzzleDropCard}
                                        cardPool={slotCardPool}
                                        specialMode={specialSlotMode}
                                        onSpecialSpinDone={handleSpecialSpinDone}
                                        onSpinComplete={handleSlotSpinComplete}
                                        onBigWin={handleSlotResult}
                                        gridInfo={gridInfo}
                                        gridCompleteGrade={milestoneData?.grade || null}
                                        onBonusSlotPress={() => handleSpecialSlotTrigger(milestoneData?.grade || 'B')}
                                        sessionGP={playerSparks}
                                        isMobile={isMobile}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mini Runner - Mobile only, hidden in calendar tab */}
                    {isMobile && calendarTab === 'puzzle' && (
                        <div style={{ position: 'relative' }}>
                            {showRunner && (
                                <MiniRunner
                                    todayXP={todayXP}
                                    goalXP={goalXP}
                                    onGoalChange={handleGoalChange}
                                    lastReviewedWord={lastReviewedWord}
                                    dropCard={puzzleDropCard as any}
                                    gridInfo={gridInfo}
                                    sessionGP={playerSparks}
                                    slotMode="minimal"
                                />
                            )}
                            <button
                                onClick={() => {
                                    setShowRunner(prev => {
                                        const next = !prev;
                                        localStorage.setItem('training-show-runner', String(next));
                                        return next;
                                    });
                                }}
                                style={{
                                    position: showRunner ? 'absolute' : 'relative',
                                    right: showRunner ? '6px' : undefined,
                                    bottom: showRunner ? '4px' : undefined,
                                    marginLeft: showRunner ? undefined : 'auto',
                                    display: 'block',
                                    background: 'rgba(255,255,255,0.7)',
                                    border: '1px solid #E7E5E4',
                                    borderRadius: '4px',
                                    padding: '2px 6px',
                                    fontSize: '9px',
                                    fontWeight: '600',
                                    color: '#A8A29E',
                                    cursor: 'pointer',
                                    zIndex: 40,
                                    backdropFilter: 'blur(4px)',
                                }}
                            >
                                {showRunner ? 'HIDE' : 'SHOW RUNNER'}
                            </button>
                        </div>
                    )}

                    {/* Right Panel - Stats OR Selected Date Phrases */}
                    <div style={{
                        flex: isMobile ? 'none' : (sidebarExpanded ? '1 1 0%' : '0.8 1 0%'),
                        minWidth: isMobile ? undefined : '320px',
                        width: isMobile ? '100%' : undefined,
                        flexShrink: 0,
                        backgroundColor: '#fafafa',
                        borderLeft: isMobile ? 'none' : '1px solid #e5e5e5',
                        borderBottom: isMobile ? '1px solid #e5e5e5' : 'none',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        overflowY: isMobile ? 'visible' : 'auto',
                        order: isMobile ? 1 : 0,
                    }}>
                        {/* Show phrases when date is selected, otherwise show stats */}
                        {selectedDate && selectedPhrasesAll.length > 0 ? (
                            <>
                                {/* Selected Date Header */}
                                <div style={{
                                    backgroundColor: '#fff',
                                    borderRadius: '12px',
                                    padding: '14px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#333' }}>
                                                {new Date(selectedDate).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' })}
                                            </span>
                                            {(() => {
                                                const dayPhrases = phrasesByDate[selectedDate] || [];
                                                const pts = dayPhrases.reduce((sum, p) => {
                                                    const m = Number(phraseMastery[p.id] || 0);
                                                    const hasRec = (voiceRecordings[p.id] || []).length > 0;
                                                    const hasLink = (phraseLinks[p.id] || []).length > 0;
                                                    const lv = getChakraLevel(m, hasRec, hasLink);
                                                    return sum + (lv > 0 ? CHAKRA_CONFIG[lv].lv : 0);
                                                }, 0);
                                                const maxPts = dayPhrases.length * 7;
                                                return pts > 0 ? (
                                                    <span style={{
                                                        fontSize: '18px',
                                                        fontWeight: '900',
                                                        color: '#D4AF37',
                                                        letterSpacing: '-0.5px',
                                                    }}>
                                                        {pts}<span style={{ fontSize: '10px', fontWeight: '700', color: '#B8860B' }}>/{maxPts}</span>
                                                    </span>
                                                ) : null;
                                            })()}
                                        </div>
                                        <div style={{ fontSize: '11px', color: '#888' }}>
                                            {selectedPhrases.length} / {selectedPhrasesAll.length} phrases
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                        {!isMobile && (
                                            <button
                                                onClick={() => setSidebarExpanded(prev => !prev)}
                                                title={sidebarExpanded ? 'Collapse' : 'Expand'}
                                                style={{
                                                    background: sidebarExpanded ? '#D4AF37' : '#f0f0f0',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    padding: '6px 10px',
                                                    fontSize: '12px',
                                                    cursor: 'pointer',
                                                    color: sidebarExpanded ? '#fff' : '#666',
                                                    fontWeight: '500',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sidebarExpanded ? '#fff' : '#666'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.25s', transform: sidebarExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                                    <polyline points="15 18 9 12 15 6" />
                                                </svg>
                                                {sidebarExpanded ? 'Narrow' : 'Wide'}
                                            </button>
                                        )}
                                        <Link
                                            href={`/english/phrases/${selectedDate}`}
                                            style={{
                                                background: '#D4AF37',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '6px 12px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                color: '#000',
                                                textDecoration: 'none',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Listen
                                        </Link>
                                        <button
                                            onClick={() => setSelectedDate(null)}
                                            style={{
                                                background: '#f0f0f0',
                                                border: 'none',
                                                borderRadius: '6px',
                                                padding: '6px 12px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                                color: '#666'
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>

                                {/* Chakra filter pills */}
                                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                    <button
                                        onClick={() => setSelectedChakraFilter(null)}
                                        style={{
                                            padding: '3px 8px',
                                            borderRadius: '4px',
                                            border: selectedChakraFilter === null ? '2px solid #D4AF37' : '1px solid #ddd',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            cursor: 'pointer',
                                            backgroundColor: selectedChakraFilter === null ? '#FFFBEB' : '#fff',
                                            color: '#666',
                                        }}
                                    >
                                        ALL {selectedPhrasesAll.length}
                                    </button>
                                    {([0, 1, 2, 3, 4, 5, 6] as ChakraLevel[]).map(lv => {
                                        const cfg = CHAKRA_CONFIG[lv];
                                        const count = selectedPhrasesAll.filter(p => {
                                            const m = Number(phraseMastery[p.id] || 0);
                                            const hasRec = (voiceRecordings[p.id] || []).length > 0;
                                            const hasLink = (phraseLinks[p.id] || []).length > 0;
                                            return getChakraLevel(m, hasRec, hasLink) === lv;
                                        }).length;
                                        return (
                                            <button
                                                key={lv}
                                                onClick={() => setSelectedChakraFilter(prev => prev === lv ? null : lv)}
                                                style={{
                                                    padding: '3px 8px',
                                                    borderRadius: '4px',
                                                    border: selectedChakraFilter === lv ? `2px solid ${cfg.border}` : '1px solid #ddd',
                                                    fontSize: '10px',
                                                    fontWeight: '600',
                                                    cursor: count > 0 ? 'pointer' : 'default',
                                                    backgroundColor: selectedChakraFilter === lv ? cfg.bg : '#fff',
                                                    color: count > 0 ? cfg.color : '#ccc',
                                                    opacity: count > 0 ? 1 : 0.5,
                                                }}
                                            >
                                                {cfg.ja} {cfg.name} {count}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Phrase List */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {selectedPhrases.map(phrase => {
                                        const baseMastery = Number(phraseMastery[phrase.id] || 0);
                                        const hasRec = (voiceRecordings[phrase.id] || []).length > 0;
                                        const hasLink = (phraseLinks[phrase.id] || []).length > 0;
                                        const masteryInfo = getChakraInfo(baseMastery, hasRec, hasLink);
                                        const isPlaying = playingPhraseId === phrase.id;
                                        const isLockedToday = baseMastery === 3 || (baseMastery !== 6 && baseMastery < 3 && phraseLastLeveled[phrase.id] === clientToday);
                                        const cPts = cardPoints[phrase.id] || 0;
                                        const cRank = getCardRank(cPts);
                                        const cFrame = getCardFrame(cRank.rank);
                                        const cAccent = getFrameAccent(cRank.rank);
                                        return (
                                            <div
                                                key={phrase.id}
                                                data-phrase-id={phrase.id}
                                                className={highlightPhraseId === phrase.id ? 'deep-link-highlight' : undefined}
                                                style={{
                                                    borderRadius: '12px',
                                                    ...cFrame,
                                                    border: cFrame.border.replace('6px', '4px'),
                                                    boxShadow: getCardShadow(cRank.rank),
                                                    padding: '4px',
                                                    overflow: 'hidden',
                                                }}
                                            >
                                                {/* Mini Name Bar */}
                                                <div style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    padding: '4px 8px',
                                                    backgroundColor: `${cAccent}10`,
                                                    borderRadius: '8px 8px 0 0',
                                                    borderBottom: `1px solid ${cAccent}20`,
                                                }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                        <button
                                                            onClick={() => playPhrase(phrase)}
                                                            style={{
                                                                width: '24px', height: '24px',
                                                                borderRadius: '50%',
                                                                backgroundColor: isPlaying ? '#D4AF37' : '#fff',
                                                                border: `1px solid ${cAccent}30`,
                                                                cursor: 'pointer',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                                flexShrink: 0, padding: 0,
                                                            }}
                                                        >
                                                            <svg width="10" height="10" viewBox="0 0 24 24" fill={isPlaying ? '#fff' : '#666'}>
                                                                <path d="M8 5v14l11-7z" />
                                                            </svg>
                                                        </button>
                                                        <ElementBadge element={phrase.category} size={10} />
                                                        {(() => {
                                                            const bst = calcBstTotal(phrase.id);
                                                            const bt = getBstTier(bst);
                                                            return (
                                                                <span style={{
                                                                    fontSize: '8px', fontWeight: '800',
                                                                    color: bt.color, letterSpacing: '0.5px',
                                                                }}>
                                                                    {bt.tier}{bst}
                                                                </span>
                                                            );
                                                        })()}
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                                                        <span style={{
                                                            fontSize: '11px', fontWeight: '800',
                                                            color: cRank.rank !== 'NORMAL' ? cRank.borderColor : '#A8A29E',
                                                            fontVariantNumeric: 'tabular-nums',
                                                        }}>
                                                            {cPts}
                                                        </span>
                                                        <span style={{ fontSize: '7px', fontWeight: '700', color: '#A8A29E' }}>pt</span>
                                                        {cRank.rank !== 'NORMAL' && (
                                                            <span style={{
                                                                fontSize: '7px', fontWeight: '800',
                                                                color: cRank.borderColor,
                                                                letterSpacing: '0.5px', marginLeft: '2px',
                                                            }}>
                                                                {cRank.label}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div style={{ fontSize: '9px', fontWeight: '600', color: '#A8A29E', marginLeft: '6px' }}>
                                                        {phrase.date.split('T')[0]}
                                                    </div>
                                                </div>

                                                {/* Content Window */}
                                                <div style={{
                                                    background: getCardWindowBg(cRank.rank),
                                                    borderRadius: '8px',
                                                    border: `1px solid ${cAccent}20`,
                                                    margin: '4px',
                                                    padding: '10px 12px',
                                                }}>
                                                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}>
                                                        {phrase.english}
                                                    </div>
                                                    <div style={{ fontSize: '12px', color: '#666' }}>
                                                        {phrase.japanese}
                                                    </div>
                                                    {(() => {
                                                        const flavor = getFlavorText(phrase.id);
                                                        const flavorSaved = savedFlavorTexts.has(flavor.en);
                                                        return (
                                                            <div style={{
                                                                marginTop: '8px',
                                                                paddingTop: '6px',
                                                                borderTop: '1px solid rgba(0,0,0,0.05)',
                                                                display: 'flex',
                                                                alignItems: 'flex-start',
                                                                justifyContent: 'space-between',
                                                                gap: '6px',
                                                            }}>
                                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                                    <div style={{
                                                                        fontSize: '9px',
                                                                        fontStyle: 'italic',
                                                                        color: '#A8A29E',
                                                                        lineHeight: 1.4,
                                                                    }}>
                                                                        &ldquo;{flavor.en}&rdquo;
                                                                    </div>
                                                                    <div style={{
                                                                        fontSize: '7.5px',
                                                                        color: '#C4B5A4',
                                                                        marginTop: '1px',
                                                                    }}>
                                                                        {flavor.ja}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        saveFlavorText(flavor.en, flavor.ja);
                                                                    }}
                                                                    disabled={flavorSaved || savingFlavorText}
                                                                    style={{
                                                                        padding: '2px 6px',
                                                                        borderRadius: '4px',
                                                                        border: flavorSaved ? '1px solid #86EFAC' : '1px solid #D4AF3780',
                                                                        backgroundColor: flavorSaved ? '#DCFCE7' : 'transparent',
                                                                        color: flavorSaved ? '#16A34A' : '#D4AF37',
                                                                        fontSize: '7px',
                                                                        fontWeight: '700',
                                                                        cursor: flavorSaved ? 'default' : 'pointer',
                                                                        flexShrink: 0,
                                                                        marginTop: '2px',
                                                                    }}
                                                                >
                                                                    {flavorSaved ? 'Saved' : '+'}
                                                                </button>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>

                                                {/* Bottom: Mastery + CROWN + Voice + Tools */}
                                                <div style={{ padding: '4px 8px 6px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                                                        <button
                                                            onClick={() => {
                                                                if (isLockedToday) return;
                                                                const cur = baseMastery;
                                                                if (cur === 3) return;
                                                                const nxt = cur === 6 ? 0 : (cur + 1);
                                                                if (nxt > 0 && nxt > cur) {
                                                                    const nl = getChakraLevel(nxt, hasRec, hasLink);
                                                                    const nc = CHAKRA_CONFIG[nl];
                                                                    playLevelSound(nl);
                                                                    setCalendarPulse({
                                                                        dateKey: phrase.date.split('T')[0],
                                                                        points: nc.lv,
                                                                        gradFrom: nc.gradFrom,
                                                                        color: nc.color,
                                                                        level: nl,
                                                                        key: Date.now(),
                                                                    });
                                                                }
                                                                cycleMastery(phrase.id);
                                                            }}
                                                            style={{
                                                                padding: '4px 10px',
                                                                borderRadius: '4px',
                                                                border: `1px solid ${masteryInfo.border}`,
                                                                backgroundColor: masteryInfo.bg,
                                                                color: masteryInfo.color,
                                                                fontSize: '10px',
                                                                fontWeight: '700',
                                                                cursor: isLockedToday ? 'not-allowed' : 'pointer',
                                                                opacity: isLockedToday ? 0.5 : 1,
                                                                transition: 'transform 0.15s',
                                                            }}
                                                        >
                                                            {masteryInfo.label}
                                                        </button>
                                                        {masteryInfo.level === 5 && (
                                                            <button
                                                                onClick={() => declareCrown(phrase.id)}
                                                                style={{
                                                                    padding: '3px 8px', borderRadius: '4px',
                                                                    border: '1px solid #A855F7',
                                                                    backgroundColor: '#FAF5FF', color: '#7E22CE',
                                                                    fontSize: '9px', fontWeight: '700',
                                                                    cursor: isLockedToday ? 'not-allowed' : 'pointer',
                                                                    opacity: isLockedToday ? 0.5 : 1,
                                                                }}
                                                            >
                                                                CROWN
                                                            </button>
                                                        )}
                                                        <VoiceRecorder
                                                            phraseId={phrase.id}
                                                            recordings={voiceRecordings[phrase.id] || []}
                                                            onRecordingComplete={(recording) => {
                                                                const pid = phrase.id;
                                                                const prevRecs = voiceRecordings[pid] || [];
                                                                const wasFirst = prevRecs.length === 0;
                                                                setVoiceRecordings(prev => ({
                                                                    ...prev,
                                                                    [pid]: [recording, ...(prev[pid] || [])]
                                                                }));
                                                                const bm = Number(phraseMastery[pid] || 0);
                                                                const hl = (phraseLinks[pid] || []).length > 0;
                                                                const levelBefore = getChakraLevel(bm, !wasFirst, hl);
                                                                const levelAfter = getChakraLevel(bm, true, hl);
                                                                const xpGained = levelAfter > levelBefore ? CHAKRA_CONFIG[levelAfter].lv : 0;
                                                                if (xpGained > 0) {
                                                                    postXP(new Date().toISOString().split('T')[0], xpGained, false, pid);
                                                                    const nc = CHAKRA_CONFIG[levelAfter];
                                                                    const k = Date.now();
                                                                    playLevelSound(levelAfter);
                                                                    setPointEffect({ points: nc.lv, color: nc.color, gradFrom: nc.gradFrom, gradTo: nc.gradTo, levelName: nc.name, key: k });
                                                                    setCalendarPulse({ dateKey: phrase.date.split('T')[0], points: nc.lv, gradFrom: nc.gradFrom, color: nc.color, level: levelAfter, key: k });
                                                                    // Register card to GOD GRID
                                                                    const pts = cardPoints[pid] || 0;
                                                                    const rank = pts >= 250 ? 'LEGENDARY' : pts >= 100 ? 'HOLOGRAPHIC' : pts >= 50 ? 'GOLD' : pts >= 20 ? 'SILVER' : pts >= 5 ? 'BRONZE' : 'NORMAL';
                                                                    setPuzzleDropCard({ phraseId: pid, english: phrase.english, japanese: phrase.japanese, element: phrase.category, rank, points: pts, bstTotal: calcBstTotal(pid), key: k });
                                                                }
                                                            }}
                                                            onRecordingDelete={(id) => {
                                                                setVoiceRecordings(prev => ({
                                                                    ...prev,
                                                                    [phrase.id]: (prev[phrase.id] || []).filter(r => r.id !== id)
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                    {/* Tools row */}
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        paddingTop: '4px',
                                                        borderTop: `1px solid ${cAccent}15`,
                                                    }}>
                                                        <div style={{ display: 'flex', gap: '4px' }}>
                                                            <button
                                                                onClick={() => playYouGlish(phrase)}
                                                                style={{
                                                                    background: '#f0f0f0', border: 'none',
                                                                    color: '#666', fontSize: '9px',
                                                                    cursor: 'pointer', padding: '3px 6px',
                                                                    borderRadius: '3px',
                                                                }}
                                                            >
                                                                YG
                                                            </button>
                                                            <button
                                                                onClick={() => openVocabModal(phrase.english)}
                                                                style={{
                                                                    background: 'none', border: '1px solid #10B981',
                                                                    borderRadius: '3px', cursor: 'pointer',
                                                                    padding: '3px 6px', fontSize: '9px',
                                                                    color: '#10B981', fontWeight: '600',
                                                                }}
                                                            >
                                                                +Vocab
                                                            </button>
                                                        </div>
                                                        <div style={{ display: 'flex', gap: '3px' }}>
                                                            <button
                                                                onClick={() => setEditingPhrase({ id: phrase.id, english: phrase.english, japanese: phrase.japanese })}
                                                                style={{
                                                                    background: '#EFF6FF', border: '1px solid #BFDBFE',
                                                                    color: '#3B82F6', fontSize: '9px', fontWeight: '600',
                                                                    cursor: 'pointer', padding: '3px 8px', borderRadius: '3px',
                                                                }}
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeletePhrase(phrase.id)}
                                                                style={{
                                                                    background: '#FEF2F2', border: '1px solid #FECACA',
                                                                    color: '#EF4444', fontSize: '9px', fontWeight: '600',
                                                                    cursor: 'pointer', padding: '3px 8px', borderRadius: '3px',
                                                                }}
                                                            >
                                                                削除
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            /* No date selected: summary + review */
                            isMobile ? (
                                <>{renderReviewContent()}</>
                            ) : (
                                <>
                                    {/* Review Cards (top) */}
                                    {renderReviewContent()}
                                    {/* Analytics Dashboard (bottom) */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                                        {/* Daily Activity Sparkline */}
                                        <div style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                        }}>
                                            <div style={{ fontSize: '10px', fontWeight: '700', color: '#666', letterSpacing: '0.5px', marginBottom: '8px' }}>
                                                {year}年{monthNames[month]} ACTIVITY
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1px', height: '40px' }}>
                                                {chakraAnalytics.dailyData.map((d) => {
                                                    const maxTouches = Math.max(...chakraAnalytics.dailyData.map(x => x.touches), 1);
                                                    const h = d.touches > 0 ? Math.max((d.touches / maxTouches) * 36, 3) : 2;
                                                    return (
                                                        <div
                                                            key={d.day}
                                                            title={`${d.day}日: ${d.touches} touches`}
                                                            style={{
                                                                flex: 1,
                                                                height: `${h}px`,
                                                                borderRadius: '2px',
                                                                backgroundColor: d.touches > 0 ? '#D4AF37' : '#EBEBEB',
                                                                transition: 'height 0.3s ease-out',
                                                            }}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Month Stats Row */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-around',
                                            backgroundColor: '#fff',
                                            borderRadius: '12px',
                                            padding: '10px 8px',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                        }}>
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#D4AF37' }}>{chakraAnalytics.monthPoints}</div>
                                                <div style={{ fontSize: '8px', color: '#999', fontWeight: '600' }}>MONTH PTS</div>
                                            </div>
                                            <div style={{ width: '1px', backgroundColor: '#eee' }} />
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#333' }}>{chakraAnalytics.activeDays}<span style={{ fontSize: '10px', color: '#999' }}>/{chakraAnalytics.daysInMonth}</span></div>
                                                <div style={{ fontSize: '8px', color: '#999', fontWeight: '600' }}>ACTIVE DAYS</div>
                                            </div>
                                            <div style={{ width: '1px', backgroundColor: '#eee' }} />
                                            <div style={{ textAlign: 'center' }}>
                                                <div style={{ fontSize: '16px', fontWeight: '700', color: '#333' }}>Lv.{(chakraAnalytics.avgLevel + 1).toFixed(1)}</div>
                                                <div style={{ fontSize: '8px', color: '#999', fontWeight: '600' }}>AVG LEVEL</div>
                                            </div>
                                        </div>

                                        {/* Level Distribution (existing cumulative bars) */}
                                        <div style={{
                                            backgroundColor: '#fff',
                                            borderRadius: '12px',
                                            padding: '12px',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                                        }}>
                                            <div style={{ fontSize: '10px', fontWeight: '700', color: '#666', letterSpacing: '0.5px', marginBottom: '8px' }}>LEVEL DISTRIBUTION</div>
                                            {thisMonthReviewPhrases.total.length > 0 && (() => {
                                                const t = thisMonthReviewPhrases.total.length;
                                                const exactCounts = [0, 1, 2, 3, 4, 5, 6].map(lv =>
                                                    (thisMonthReviewPhrases[`level${lv}` as keyof typeof thisMonthReviewPhrases] as Phrase[]).length
                                                );
                                                const monthCumulative: number[] = [0, 0, 0, 0, 0, 0, 0];
                                                let sum = 0;
                                                for (let lv = 6; lv >= 0; lv--) {
                                                    sum += exactCounts[lv];
                                                    monthCumulative[lv] = sum;
                                                }
                                                return (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                                        {([6, 5, 4, 3, 2, 1] as ChakraLevel[]).map(lv => {
                                                            const cfg = CHAKRA_CONFIG[lv];
                                                            const reached = monthCumulative[lv];
                                                            const pct = (reached / t) * 100;
                                                            return (
                                                                <div key={lv} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                                    <span style={{ fontSize: '9px', fontWeight: '700', color: cfg.color, width: '42px', textAlign: 'right' }}>
                                                                        {cfg.name}
                                                                    </span>
                                                                    <div style={{
                                                                        flex: 1,
                                                                        height: '8px',
                                                                        borderRadius: '4px',
                                                                        backgroundColor: '#f0f0f0',
                                                                        overflow: 'hidden',
                                                                    }}>
                                                                        <div style={{
                                                                            width: `${pct}%`,
                                                                            height: '100%',
                                                                            background: `linear-gradient(90deg, ${cfg.gradFrom}, ${cfg.gradTo})`,
                                                                            borderRadius: '4px',
                                                                            transition: 'width 0.3s ease-out',
                                                                        }} />
                                                                    </div>
                                                                    <span style={{ fontSize: '9px', fontWeight: '600', color: cfg.color, width: '28px' }}>
                                                                        {reached}/{t}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            })()}
                                        </div>

                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>
            )}

            {/* Level Up Flash (1s, no interaction) — card-preview quality */}
            {cardCelebration && !cardRankUpEffect && displayedCard && (() => {
                const cId = displayedCard.id;
                const cBm = Number(phraseMastery[cId] || 0);
                const cHr = (voiceRecordings[cId] || []).length > 0;
                const cHl = (phraseLinks[cId] || []).length > 0;
                const cChakra = getChakraInfo(cBm, cHr, cHl);
                const cPts = cardPoints[cId] || 0;
                const cRank = getCardRank(cPts);
                const cFrame = getCardFrame(cRank.rank);
                const cShadow = getCardShadow(cRank.rank);
                const cAccent = getFrameAccent(cRank.rank);
                const isLight = cRank.rank === 'LEGENDARY';
                return (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 10004,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        pointerEvents: 'none',
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(8px)',
                        animation: 'levelup-flash 1s ease-out forwards',
                    }}>
                        {/* Radial glow */}
                        <div style={{
                            position: 'absolute', width: '360px', height: '360px', borderRadius: '50%',
                            background: `radial-gradient(circle, ${cChakra.gradFrom}50 0%, transparent 70%)`,
                            animation: 'levelup-glow-pulse 0.8s ease-in-out',
                        }} />
                        <div style={{
                            position: 'absolute', width: '220px', height: '220px', borderRadius: '50%',
                            border: `3px solid ${cChakra.gradFrom}60`,
                            animation: 'levelup-ring-expand 0.8s ease-out forwards',
                        }} />
                        {/* Level badge */}
                        <div style={{
                            textAlign: 'center', marginBottom: '16px', zIndex: 2,
                            animation: 'levelup-title-slide 0.3s ease-out forwards',
                        }}>
                            <div style={{ fontSize: isMobile ? '11px' : '14px', fontWeight: '800', letterSpacing: '6px', color: '#fff', opacity: 0.6, marginBottom: '4px' }}>LEVEL UP</div>
                            <div style={{
                                fontSize: isMobile ? '40px' : '56px', fontWeight: '900', letterSpacing: '4px',
                                color: '#fff',
                                textShadow: `0 0 30px ${cChakra.gradFrom}, 0 0 60px ${cChakra.gradFrom}80`,
                                lineHeight: 1.1,
                            }}>
                                {cChakra.ja}
                            </div>
                            <div style={{ fontSize: isMobile ? '12px' : '16px', fontWeight: '700', letterSpacing: '2px', color: cChakra.gradFrom, marginTop: '4px' }}>
                                Lv.{cChakra.level + 1} {cChakra.name}
                            </div>
                        </div>
                        {/* Card — card-preview quality */}
                        <div style={{
                            animation: 'levelup-card-slam 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                            zIndex: 2, width: '85%', maxWidth: isMobile ? '280px' : '420px',
                        }}>
                            <div style={{
                                ...cFrame, borderRadius: '12px', overflow: 'hidden',
                                boxShadow: `${cShadow}, 0 0 40px ${cChakra.gradFrom}40`,
                                padding: '6px',
                                display: 'flex', flexDirection: 'column',
                            }}>
                                {/* Top bar */}
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '4px 8px',
                                    backgroundColor: isLight ? 'rgba(255,255,255,0.06)' : `${cAccent}12`,
                                    borderRadius: '6px 6px 0 0',
                                    borderBottom: `1px solid ${isLight ? 'rgba(255,255,255,0.1)' : cAccent + '30'}`,
                                }}>
                                    <span style={{ fontSize: '8px', fontWeight: '800', color: cRank.borderColor, letterSpacing: '1.5px',
                                        textShadow: (cRank.rank === 'HOLOGRAPHIC' || cRank.rank === 'LEGENDARY') ? `0 0 8px ${cRank.borderColor}60` : 'none',
                                    }}>{cRank.rank !== 'NORMAL' ? cRank.label : ''}</span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                                        <span style={{ fontSize: '11px', fontWeight: '900', color: cRank.rank !== 'NORMAL' ? cRank.borderColor : '#A8A29E' }}>{cPts}</span>
                                        <span style={{ fontSize: '7px', fontWeight: '700', color: isLight ? 'rgba(255,255,255,0.4)' : '#A8A29E' }}>SP</span>
                                    </div>
                                </div>
                                {/* Illustration window */}
                                <div style={{
                                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                    background: getCardWindowBg(cRank.rank),
                                    borderRadius: '6px', margin: '4px 0', padding: '16px 12px',
                                    border: `1px solid ${isLight ? 'rgba(255,255,255,0.08)' : cAccent + '25'}`,
                                    position: 'relative', overflow: 'hidden', textAlign: 'center',
                                }}>
                                    {/* Rank-specific patterns */}
                                    {cRank.rank === 'BRONZE' && <div style={{ position: 'absolute', inset: 0, opacity: 0.04, background: 'repeating-linear-gradient(45deg, #CD7F32, #CD7F32 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />}
                                    {cRank.rank === 'SILVER' && <div style={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'repeating-linear-gradient(-45deg, #94A3B8, #94A3B8 1px, transparent 1px, transparent 14px)', pointerEvents: 'none' }} />}
                                    {cRank.rank === 'GOLD' && <div style={{ position: 'absolute', inset: 0, opacity: 0.03, background: 'radial-gradient(circle at 30% 40%, #D4AF37 0.5px, transparent 0.5px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />}
                                    <div style={{
                                        fontSize: isMobile ? '18px' : '24px', fontWeight: '800', color: isLight ? '#FAFAF9' : '#1C1917',
                                        lineHeight: 1.3, marginBottom: '6px', position: 'relative',
                                        textShadow: isLight ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                                    }}>{displayedCard.english}</div>
                                    <div style={{
                                        fontSize: isMobile ? '12px' : '16px', color: isLight ? 'rgba(255,255,255,0.5)' : '#78716C',
                                        position: 'relative',
                                    }}>{displayedCard.japanese}</div>
                                </div>
                                {/* Bottom bar */}
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '4px 8px',
                                    backgroundColor: isLight ? 'rgba(255,255,255,0.04)' : `${cAccent}08`,
                                    borderRadius: '0 0 6px 6px',
                                    borderTop: `1px solid ${isLight ? 'rgba(255,255,255,0.08)' : cAccent + '20'}`,
                                }}>
                                    <span style={{ fontSize: '8px', fontWeight: '700', color: isLight ? 'rgba(255,255,255,0.35)' : '#A8A29E', letterSpacing: '1px' }}>
                                        {cRank.label || 'NORMAL'}
                                    </span>
                                    <div style={{ display: 'flex', gap: '3px' }}>
                                        {[0, 1, 2, 3, 4, 5, 6].map(i => (
                                            <div key={i} style={{
                                                width: '6px', height: '6px', borderRadius: '50%',
                                                backgroundColor: i <= cChakra.level ? cChakra.color : '#D6D3D1',
                                                boxShadow: i <= cChakra.level ? `0 0 4px ${cChakra.gradFrom}60` : 'none',
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Rank Up Full-Screen Celebration (tap to dismiss) — card-preview quality */}
            {cardRankUpEffect && cardCelebration && displayedCard && (() => {
                const cId = displayedCard.id;
                const cBm = Number(phraseMastery[cId] || 0);
                const cHr = (voiceRecordings[cId] || []).length > 0;
                const cHl = (phraseLinks[cId] || []).length > 0;
                const cChakra = getChakraInfo(cBm, cHr, cHl);
                // Use snapshot rank/points from when rank-up was detected (not current state which may have advanced further)
                const cPts = cardRankUpEffect.snapshotPoints;
                const displayRank = cardRankUpEffect.newRankKey;
                const cFrame = getCardFrame(displayRank);
                const cShadow = getCardShadow(displayRank);
                const cAccent = getFrameAccent(displayRank);
                const isLight = displayRank === 'LEGENDARY';
                const rankColor = cardRankUpEffect.newRankColor;
                const RANK_JA: Record<string, string> = {
                    LEGENDARY: '伝説', HOLOGRAPHIC: '虹色', HOLO: '虹色', GOLD: '金', SILVER: '銀', BRONZE: '銅', NORMAL: '普通',
                };
                const rankJa = RANK_JA[cardRankUpEffect.newRank] || cardRankUpEffect.newRank;
                const sparkles = Array.from({ length: 30 }, (_, i) => ({
                    id: i,
                    sx: `${(Math.random() - 0.5) * 300}px`,
                    sy: `${(Math.random() - 0.5) * 300}px`,
                    delay: Math.random() * 1.2,
                    size: 3 + Math.random() * 6,
                    color: i % 4 === 0 ? rankColor : i % 4 === 1 ? '#FDE68A' : i % 4 === 2 ? '#fff' : cChakra.gradFrom,
                }));
                return (
                    <div
                        onClick={() => {
                            setCardRankUpEffect(null);
                            setReviewHistory(prev => [...prev, cardCelebration.phrase]);
                            setHistoryOffset(0);
                            setCardCelebration(null);
                        }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 10003,
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0,0,0,0.75)',
                            cursor: 'pointer',
                            animation: 'levelup-overlay-in 0.5s ease-out forwards',
                            backdropFilter: 'blur(16px)',
                        }}
                    >
                        {/* Expanding rings */}
                        {[0, 0.2, 0.4, 0.6].map((delay, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                width: '240px', height: '240px', borderRadius: '50%',
                                border: `2px solid ${rankColor}`,
                                animation: `levelup-ring-expand 2s ease-out ${delay}s infinite`,
                            }} />
                        ))}
                        {/* Sparkles */}
                        {sparkles.map(s => (
                            <div key={s.id} style={{
                                position: 'absolute',
                                width: `${s.size}px`, height: `${s.size}px`,
                                borderRadius: '50%', backgroundColor: s.color,
                                '--sx': s.sx, '--sy': s.sy,
                                animation: `levelup-sparkle 1.5s ease-out ${s.delay}s infinite`,
                                boxShadow: `0 0 8px ${s.color}`,
                            } as React.CSSProperties} />
                        ))}
                        {/* Glow */}
                        <div style={{
                            position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
                            background: `radial-gradient(circle, ${rankColor}50 0%, transparent 60%)`,
                            animation: 'levelup-glow-pulse 1.5s ease-in-out infinite',
                        }} />
                        {/* Rank title */}
                        <div style={{
                            animation: 'levelup-title-slide 0.6s ease-out forwards',
                            textAlign: 'center', marginBottom: '20px', zIndex: 2,
                        }}>
                            <div style={{ fontSize: isMobile ? '12px' : '16px', fontWeight: '800', letterSpacing: '6px', color: '#fff', opacity: 0.6, marginBottom: '6px' }}>RANK UP</div>
                            <div style={{
                                fontSize: isMobile ? '56px' : '72px', fontWeight: '900', letterSpacing: '6px',
                                color: rankColor,
                                textShadow: `0 0 40px ${rankColor}80, 0 0 80px ${rankColor}40, 0 4px 20px rgba(0,0,0,0.5)`,
                                lineHeight: 1.1,
                            }}>{rankJa}</div>
                            <div style={{
                                fontSize: '22px', fontWeight: '800', letterSpacing: '4px',
                                color: rankColor, marginTop: '8px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            }}>
                                <span style={{ opacity: 0.4, color: '#fff', fontSize: '16px' }}>{cardRankUpEffect.oldRank}</span>
                                <span style={{ color: '#F97316' }}>→</span>
                                <span>{cardRankUpEffect.newRank}</span>
                            </div>
                        </div>
                        {/* Card slam — card-preview quality */}
                        <div style={{
                            animation: 'levelup-card-slam 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                            zIndex: 2, width: '90%', maxWidth: isMobile ? '320px' : '460px',
                        }}>
                            <div style={{
                                ...cFrame, borderRadius: '12px', overflow: 'hidden',
                                boxShadow: `${cShadow}, 0 0 60px ${rankColor}40, 0 0 120px ${rankColor}20`,
                                padding: '6px',
                                display: 'flex', flexDirection: 'column',
                            }}>
                                {/* Top bar */}
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '5px 10px',
                                    backgroundColor: isLight ? 'rgba(255,255,255,0.06)' : `${cAccent}12`,
                                    borderRadius: '8px 8px 0 0',
                                    borderBottom: `1px solid ${isLight ? 'rgba(255,255,255,0.1)' : cAccent + '30'}`,
                                }}>
                                    <span style={{ fontSize: '9px', fontWeight: '800', color: rankColor, letterSpacing: '1.5px',
                                        textShadow: `0 0 8px ${rankColor}60`,
                                    }}>{cardRankUpEffect.newRank}</span>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: '900', color: rankColor }}>{cPts}</span>
                                        <span style={{ fontSize: '8px', fontWeight: '700', color: isLight ? 'rgba(255,255,255,0.4)' : '#A8A29E' }}>SP</span>
                                    </div>
                                </div>
                                {/* Illustration window */}
                                <div style={{
                                    flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                    background: getCardWindowBg(displayRank),
                                    borderRadius: '8px', margin: '6px 0', padding: '24px 16px',
                                    border: `1px solid ${isLight ? 'rgba(255,255,255,0.08)' : cAccent + '25'}`,
                                    position: 'relative', overflow: 'hidden', textAlign: 'center',
                                }}>
                                    {displayRank === 'BRONZE' && <div style={{ position: 'absolute', inset: 0, opacity: 0.04, background: 'repeating-linear-gradient(45deg, #CD7F32, #CD7F32 1px, transparent 1px, transparent 12px)', pointerEvents: 'none' }} />}
                                    {displayRank === 'SILVER' && <div style={{ position: 'absolute', inset: 0, opacity: 0.05, background: 'repeating-linear-gradient(-45deg, #94A3B8, #94A3B8 1px, transparent 1px, transparent 14px)', pointerEvents: 'none' }} />}
                                    {displayRank === 'GOLD' && <div style={{ position: 'absolute', inset: 0, opacity: 0.03, background: 'radial-gradient(circle at 30% 40%, #D4AF37 0.5px, transparent 0.5px)', backgroundSize: '16px 16px', pointerEvents: 'none' }} />}
                                    {(displayRank === 'HOLOGRAPHIC' || displayRank === 'LEGENDARY') && <div style={{ position: 'absolute', inset: 0, opacity: 0.06, background: 'repeating-conic-gradient(from 0deg, rgba(168,85,247,0.1) 0deg, rgba(59,130,246,0.1) 60deg, rgba(232,121,249,0.1) 120deg, rgba(16,185,129,0.1) 180deg, rgba(245,158,11,0.1) 240deg, rgba(168,85,247,0.1) 360deg)', pointerEvents: 'none' }} />}
                                    <div style={{
                                        fontSize: isMobile ? '24px' : '30px', fontWeight: '800', color: isLight ? '#FAFAF9' : '#1C1917',
                                        lineHeight: 1.3, marginBottom: '8px', position: 'relative',
                                        textShadow: isLight ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                                    }}>{displayedCard.english}</div>
                                    <div style={{
                                        fontSize: isMobile ? '14px' : '18px', color: isLight ? 'rgba(255,255,255,0.5)' : '#78716C',
                                        position: 'relative',
                                    }}>{displayedCard.japanese}</div>
                                </div>
                                {/* Bottom bar */}
                                <div style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '5px 10px',
                                    backgroundColor: isLight ? 'rgba(255,255,255,0.04)' : `${cAccent}08`,
                                    borderRadius: '0 0 8px 8px',
                                    borderTop: `1px solid ${isLight ? 'rgba(255,255,255,0.08)' : cAccent + '20'}`,
                                }}>
                                    <span style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '2px',
                                        padding: '1px 5px', borderRadius: '4px',
                                        backgroundColor: cChakra.color + (isLight ? '30' : '12'),
                                        border: `1px solid ${cChakra.color}${isLight ? '50' : '25'}`,
                                    }}>
                                        <span style={{ fontSize: '10px', fontWeight: '900', color: cChakra.color, lineHeight: 1 }}>{cChakra.ja}</span>
                                        <span style={{ fontSize: '6px', fontWeight: '700', color: cChakra.color, opacity: 0.7, letterSpacing: '0.3px' }}>{cChakra.name}</span>
                                    </span>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {[0, 1, 2, 3, 4, 5, 6].map(i => (
                                            <div key={i} style={{
                                                width: '7px', height: '7px', borderRadius: '50%',
                                                backgroundColor: i <= cChakra.level ? cChakra.color : '#D6D3D1',
                                                boxShadow: i <= cChakra.level ? `0 0 5px ${cChakra.gradFrom}60` : 'none',
                                            }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Tap instruction */}
                        <div style={{
                            marginTop: '28px', fontSize: '12px', color: '#ffffff60',
                            letterSpacing: '3px', fontWeight: '600', zIndex: 2,
                            animation: 'levelup-glow-pulse 2s ease-in-out infinite',
                        }}>TAP TO CONTINUE</div>
                    </div>
                );
            })()}

            {/* Add Phrase Modal */}
            {showAddForm && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px'
                    }}
                    onClick={() => setShowAddForm(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '16px',
                            padding: '24px',
                            width: '100%',
                            maxWidth: '400px'
                        }}
                    >
                        <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1a1a1a' }}>
                            Add New Phrase
                        </h2>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                                Date
                            </label>
                            <input
                                type="date"
                                value={formDate}
                                onChange={(e) => setFormDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                                English
                            </label>
                            <input
                                type="text"
                                value={newPhrase.english}
                                onChange={(e) => setNewPhrase(prev => ({ ...prev, english: e.target.value }))}
                                placeholder="Enter English phrase"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                                Japanese
                            </label>
                            <input
                                type="text"
                                value={newPhrase.japanese}
                                onChange={(e) => setNewPhrase(prev => ({ ...prev, japanese: e.target.value }))}
                                placeholder="日本語訳を入力"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: '1px solid #e5e5e5',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ fontSize: '12px', color: '#888', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                                Element
                            </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {Object.keys(CATEGORY_COLORS).map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setNewPhrase(prev => ({ ...prev, category: cat }))}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                                            padding: '8px 14px',
                                            borderRadius: '8px',
                                            border: newPhrase.category === cat ? `2px solid ${CATEGORY_COLORS[cat].text}` : `1px solid ${CATEGORY_COLORS[cat].border}`,
                                            backgroundColor: CATEGORY_COLORS[cat].bg,
                                            cursor: 'pointer',
                                            opacity: newPhrase.category === cat ? 1 : 0.6,
                                            transition: 'opacity 0.15s',
                                        }}
                                    >
                                        <ElementBadge element={cat} size={14} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setShowAddForm(false)}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: '1px solid #e5e5e5',
                                    backgroundColor: '#fff',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddPhrase}
                                disabled={isSubmitting || !newPhrase.english.trim() || !newPhrase.japanese.trim()}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    backgroundColor: isSubmitting || !newPhrase.english.trim() || !newPhrase.japanese.trim() ? '#e5e5e5' : '#D4AF37',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: isSubmitting || !newPhrase.english.trim() || !newPhrase.japanese.trim() ? '#888' : '#000',
                                    cursor: isSubmitting || !newPhrase.english.trim() || !newPhrase.japanese.trim() ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isSubmitting ? 'Adding...' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* YouGlish Player */}
            {youglishPhrase && (
                <div style={{
                    position: 'fixed',
                    left: playerFullscreen ? 0 : playerPosition.x,
                    top: playerFullscreen ? 0 : playerPosition.y,
                    width: playerFullscreen ? '100vw' : playerMinimized ? '200px' : playerSize.width,
                    height: playerFullscreen ? '100vh' : playerMinimized ? 'auto' : playerSize.height,
                    backgroundColor: '#fff',
                    borderRadius: playerFullscreen ? 0 : '12px',
                    boxShadow: playerFullscreen ? 'none' : '0 4px 20px rgba(0,0,0,0.25)',
                    zIndex: 1001,
                    overflow: 'hidden',
                    userSelect: (isDragging || isResizing) ? 'none' : 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    {/* Header */}
                    <div
                        onMouseDown={handleDragStart}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 12px',
                            borderBottom: '1px solid #333',
                            backgroundColor: '#1a1a1a',
                            cursor: playerFullscreen ? 'default' : isDragging ? 'grabbing' : 'grab',
                            flexShrink: 0
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {!playerFullscreen && <span style={{ color: '#666', fontSize: '10px' }}>:::::</span>}
                            <span style={{ fontWeight: '600', fontSize: '12px', color: '#fff', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {youglishPhrase.english.slice(0, 30)}
                            </span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {/* Minimize */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setPlayerMinimized(!playerMinimized); setPlayerFullscreen(false); }}
                                style={{
                                    background: '#444',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: '#fff',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                }}
                                title="Minimize"
                            >
                                _
                            </button>
                            {/* Fullscreen */}
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                                style={{
                                    background: playerFullscreen ? '#10B981' : '#444',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: '#fff',
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                }}
                                title={playerFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                            >
                                {playerFullscreen ? '[]' : '[ ]'}
                            </button>
                            {/* Close */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setYouglishPhrase(null); setCaptionHistory([]); setPlayerFullscreen(false); }}
                                style={{
                                    background: '#dc2626',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '12px',
                                    color: '#fff',
                                    padding: '4px 8px',
                                    borderRadius: '4px'
                                }}
                                title="Close"
                            >
                                X
                            </button>
                        </div>
                    </div>

                    {!playerMinimized && (
                        <div style={{ padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                            {/* Search Input */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input
                                    type="text"
                                    value={youglishQuery}
                                    onChange={(e) => setYouglishQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && searchYouGlish()}
                                    placeholder="Search word (e.g. believe, amazing)"
                                    style={{
                                        flex: 1,
                                        padding: '10px 12px',
                                        borderRadius: '8px',
                                        border: '1px solid #e5e5e5',
                                        fontSize: '14px',
                                        outline: 'none'
                                    }}
                                />
                                <button
                                    onClick={searchYouGlish}
                                    disabled={!youglishQuery.trim()}
                                    style={{
                                        padding: '10px 16px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backgroundColor: youglishQuery.trim() ? '#D4AF37' : '#e5e5e5',
                                        color: youglishQuery.trim() ? '#000' : '#999',
                                        fontSize: '13px',
                                        fontWeight: '600',
                                        cursor: youglishQuery.trim() ? 'pointer' : 'not-allowed'
                                    }}
                                >
                                    Search
                                </button>
                            </div>

                            {/* Original phrase reference */}
                            <div style={{ fontSize: '11px', color: '#888', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                                <strong>Original:</strong> {youglishPhrase.english}
                            </div>

                            {/* YouGlish Widget */}
                            <div id="yg-widget-phrases" style={{
                                minHeight: '200px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                display: youglishSearched ? 'block' : 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                {!youglishSearched && (
                                    <span style={{ color: '#888', fontSize: '13px' }}>Enter a keyword to search</span>
                                )}
                            </div>

                            {/* Caption History */}
                            {captionHistory.length > 0 && (
                                <div style={{
                                    padding: '10px',
                                    backgroundColor: '#f0fdf4',
                                    borderRadius: '8px',
                                    border: '1px solid #bbf7d0'
                                }}>
                                    <div style={{
                                        fontSize: '11px',
                                        color: '#666',
                                        marginBottom: '6px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span>Captions ({captionHistory.filter(c => c.selected).length}/{captionHistory.length}):</span>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            <button onClick={() => setCaptionHistory(prev => prev.map(c => ({ ...c, selected: true })))} style={{ background: 'none', border: 'none', color: '#10B981', fontSize: '10px', cursor: 'pointer' }}>All</button>
                                            <button onClick={() => setCaptionHistory(prev => prev.map(c => ({ ...c, selected: false })))} style={{ background: 'none', border: 'none', color: '#999', fontSize: '10px', cursor: 'pointer' }}>None</button>
                                            <button onClick={() => setCaptionHistory([])} style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '10px', cursor: 'pointer' }}>Clear</button>
                                        </div>
                                    </div>
                                    <div style={{
                                        fontSize: '11px',
                                        maxHeight: '100px',
                                        overflowY: 'auto',
                                        padding: '6px',
                                        backgroundColor: '#fff',
                                        borderRadius: '6px',
                                        border: '1px solid #e5e5e5',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '3px'
                                    }}>
                                        {captionHistory.map((caption, idx) => (
                                            <span
                                                key={idx}
                                                onClick={() => setCaptionHistory(prev => prev.map((c, i) => i === idx ? { ...c, selected: !c.selected } : c))}
                                                style={{
                                                    padding: '3px 6px',
                                                    borderRadius: '3px',
                                                    backgroundColor: caption.selected ? '#dcfce7' : '#f5f5f5',
                                                    color: caption.selected ? '#166534' : '#999',
                                                    cursor: 'pointer',
                                                    border: caption.selected ? '1px solid #86efac' : '1px solid #e5e5e5',
                                                    textDecoration: caption.selected ? 'none' : 'line-through'
                                                }}
                                            >
                                                {caption.text}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', alignItems: 'center' }}>
                                        <input
                                            type="date"
                                            value={youglishSaveDate}
                                            onChange={(e) => setYouglishSaveDate(e.target.value)}
                                            style={{
                                                flex: '0 0 auto',
                                                padding: '8px',
                                                borderRadius: '6px',
                                                border: '1px solid #e5e5e5',
                                                fontSize: '12px'
                                            }}
                                        />
                                        <button
                                            onClick={saveSelectedCaptions}
                                            disabled={savingPhrase || captionHistory.filter(c => c.selected).length === 0}
                                            style={{
                                                flex: 1,
                                                padding: '8px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                backgroundColor: captionHistory.filter(c => c.selected).length === 0 ? '#e5e5e5' : '#D4AF37',
                                                color: captionHistory.filter(c => c.selected).length === 0 ? '#999' : '#000',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                cursor: savingPhrase || captionHistory.filter(c => c.selected).length === 0 ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            {savingPhrase ? 'Saving...' : 'Add to phrases'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Resize Handle */}
                    {!playerFullscreen && !playerMinimized && (
                        <div
                            onMouseDown={handleResizeStart}
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '20px',
                                height: '20px',
                                cursor: 'se-resize',
                                background: 'linear-gradient(135deg, transparent 50%, #ccc 50%)',
                                borderRadius: '0 0 12px 0',
                            }}
                        />
                    )}
                </div>
            )}

            {/* Edit Phrase Modal */}
            {editingPhrase && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}
                    onClick={() => setEditingPhrase(null)}
                >
                    <div
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '20px',
                            padding: '32px',
                            maxWidth: '600px',
                            width: '100%',
                            boxShadow: '0 24px 80px rgba(0,0,0,0.2)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ fontSize: '22px', fontWeight: '800', marginBottom: '24px', color: '#1a1a1a' }}>
                            Edit Phrase
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#555', marginBottom: '8px' }}>English</label>
                            <textarea
                                value={editingPhrase.english}
                                onChange={(e) => setEditingPhrase({ ...editingPhrase, english: e.target.value })}
                                rows={5}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    border: '2px solid #e5e5e5',
                                    borderRadius: '12px',
                                    fontSize: '17px',
                                    lineHeight: '1.6',
                                    boxSizing: 'border-box',
                                    resize: 'vertical',
                                    fontFamily: 'inherit',
                                    transition: 'border-color 0.2s',
                                    outline: 'none',
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                            />
                        </div>
                        <div style={{ marginBottom: '28px' }}>
                            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#555', marginBottom: '8px' }}>Japanese</label>
                            <textarea
                                value={editingPhrase.japanese}
                                onChange={(e) => setEditingPhrase({ ...editingPhrase, japanese: e.target.value })}
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    border: '2px solid #e5e5e5',
                                    borderRadius: '12px',
                                    fontSize: '17px',
                                    lineHeight: '1.6',
                                    boxSizing: 'border-box',
                                    resize: 'vertical',
                                    fontFamily: 'inherit',
                                    transition: 'border-color 0.2s',
                                    outline: 'none',
                                }}
                                onFocus={(e) => e.currentTarget.style.borderColor = '#3B82F6'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#e5e5e5'}
                            />
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setEditingPhrase(null)}
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    backgroundColor: '#f5f5f5',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    color: '#666',
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditPhrase}
                                disabled={editSaving || !editingPhrase.english.trim()}
                                style={{
                                    flex: 1,
                                    padding: '16px',
                                    backgroundColor: !editingPhrase.english.trim() ? '#ccc' : '#3B82F6',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    cursor: !editingPhrase.english.trim() ? 'not-allowed' : 'pointer',
                                    color: '#fff',
                                    fontWeight: '700',
                                    boxShadow: !editingPhrase.english.trim() ? 'none' : '0 4px 16px rgba(59,130,246,0.3)',
                                }}
                            >
                                {editSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Vocabulary Save Modal */}
            {showVocabModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1002,
                    padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        padding: '24px',
                        maxWidth: '400px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Save to Vocabulary</h3>
                            <button
                                onClick={() => setShowVocabModal(false)}
                                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#888' }}
                            >
                                x
                            </button>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Example Sentence</label>
                            <div style={{
                                padding: '12px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                fontSize: '14px',
                                color: '#666',
                                lineHeight: '1.5'
                            }}>
                                {vocabExample}
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Date</label>
                            <input
                                type="date"
                                value={vocabDate}
                                onChange={(e) => setVocabDate(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Word / Phrase to Learn *</label>
                            <input
                                type="text"
                                value={vocabWord}
                                onChange={(e) => setVocabWord(e.target.value)}
                                placeholder="e.g., rabbit hole, get the hang of"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Type</label>
                            <select
                                value={vocabType}
                                onChange={(e) => setVocabType(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <option value="word">Word</option>
                                <option value="idiom">Idiom</option>
                                <option value="phrasal verb">Phrasal Verb</option>
                                <option value="slang">Slang</option>
                                <option value="expression">Expression</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '6px' }}>Meaning (Japanese) *</label>
                            <input
                                type="text"
                                value={vocabMeaning}
                                onChange={(e) => setVocabMeaning(e.target.value)}
                                placeholder="e.g., 深みにはまる、コツをつかむ"
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    border: '1px solid #e5e5e5',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={() => setShowVocabModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    backgroundColor: '#f5f5f5',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveToVocabulary}
                                disabled={vocabSaving || !vocabWord.trim() || !vocabMeaning.trim()}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    backgroundColor: (!vocabWord.trim() || !vocabMeaning.trim()) ? '#ccc' : '#10B981',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    cursor: (!vocabWord.trim() || !vocabMeaning.trim()) ? 'not-allowed' : 'pointer',
                                    color: '#fff',
                                    fontWeight: '600'
                                }}
                            >
                                {vocabSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
