'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import VoiceRecorder from '@/components/VoiceRecorder';
import { getSettings } from '@/lib/settings';
import {
    getAudioCtx, playLevelSound, playSpinTick, playReelStop, playReachAlert,
    playSpinStart, playGachaSound, playFeverEntrySound, playFeverExitSound,
    startFeverBGM, stopFeverBGM, playCardRankSound, playRankUpSound, playFeverChainHit,
} from '@/lib/training-sounds';
import PuzzleBoard, { type BattleSyncData } from '@/components/english/PuzzleBoard';
import { QUEST_WORDS } from '@/data/english/quest-words';
import { DAILY_LESSONS } from '@/data/english/five-min-data';
import { ALL_WORDS as TOEIC_WORDS, ALL_PHRASES as TOEIC_PHRASES, CATEGORIES as TOEIC_CATEGORIES } from '@/data/tonio-words';
import { LEVELS as TOEIC_LEVELS } from '@/data/tonio-words/types';
import './training-animations.css';

// All API calls are intercepted by local-api.ts -- no port restriction needed
const IS_PUBLIC = true;

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

export function MiniRunner({ todayXP, goalXP, onGoalChange, battleData, onBattleStart, onBattleEnd, lastReviewedWord, dropCard }: {
    todayXP: number;
    goalXP: number;
    onGoalChange: (xp: number) => void;
    battleData?: { cards: { english: string; element: string; rank: string; bstTotal: number; modifiedBst: number; elementAdvantage: 'super' | 'weak' | 'neutral' }[]; synergies: { name: string; multiplier: number; color: string; icon: string }[]; bossHp: number; bossName: string; bossElement: string; finalDamage: number; bossDefeated: boolean; grade: string } | null;
    onBattleStart?: () => void;
    onBattleEnd?: () => void;
    lastReviewedWord?: { text: string; key: number } | null;
    dropCard?: { phraseId: string; english: string; japanese: string; element: string; rank: string; points: number; bstTotal: number; key: number } | null;
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

    const ELEM_COLOR_MAP: Record<string, string> = { flame: '#EF4444', aqua: '#3B82F6', wind: '#10B981', earth: '#D97706', thunder: '#8B5CF6' };
    const ELEM_JA_MAP: Record<string, string> = { flame: '火', aqua: '水', wind: '風', earth: '地', thunder: '雷' };

    // Hoisted before the per-card slot useEffect that depends on it
    const [battleActive, setBattleActive] = useState(false);
    const [kakuhenBoost, setKakuhenBoost] = useState(0); // remaining boosted spins after boss defeat

    useEffect(() => {
        if (!dropCard || dropCard.key === prevDropRef.current || battleActive) return;
        prevDropRef.current = dropCard.key;
        cardSlotTimerRef.current.forEach(t => clearTimeout(t));
        cardSlotTimerRef.current = [];
        const T: ReturnType<typeof setTimeout>[] = [];
        const push = (fn: () => void, ms: number) => { T.push(setTimeout(fn, ms)); };

        // Calculate slot tier based on card stats — generous odds, MISS is rare
        const bstBonus = dropCard.bstTotal >= 500 ? 15 : dropCard.bstTotal >= 400 ? 8 : dropCard.bstTotal >= 300 ? 3 : 0;
        const rankMap: Record<string, number> = { LEGENDARY: 20, HOLOGRAPHIC: 12, GOLD: 6, SILVER: 3, BRONZE: 1, NORMAL: 0 };
        const rankBonus = rankMap[dropCard.rank] || 0;
        const kBoost = kakuhenBoost > 0 ? 20 : 0; // 確変中は大幅ブースト
        const bonus = bstBonus + rankBonus + kBoost;
        if (kakuhenBoost > 0) setKakuhenBoost(prev => prev - 1);
        const roll = Math.random() * 100;
        // Boosted odds: MISS only ~15%, 確変中はMISS ~5%
        const tier = roll < 1 + bonus * 0.05 ? 'MYTHIC'
            : roll < 4 + bonus * 0.1 ? 'LEGENDARY'
            : roll < 12 + bonus * 0.15 ? 'MEGA'
            : roll < 28 + bonus * 0.25 ? 'SUPER'
            : roll < 50 + bonus * 0.3 ? 'GREAT'
            : roll < 85 + bonus * 0.2 ? 'BONUS' : 'MISS';
        const combo = (TIER_TO_COMBO[tier] || generateMissCombo()) as [string, string, string];
        const isReach = tier !== 'MISS' && combo[0] === combo[1];
        const tierPower = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[tier] || 0;

        setCardSlotCard({ english: dropCard.english, element: dropCard.element, bstTotal: dropCard.bstTotal, rank: dropCard.rank });
        setCardSlotDmg(null);
        const dmgMultiplier = { MYTHIC: 4.0, LEGENDARY: 3.0, MEGA: 2.2, SUPER: 1.6, GREAT: 1.3, BONUS: 1.0, MISS: 0.5 }[tier] || 1;

        // === COMPLETELY DIFFERENT SEQUENCE PER TIER ===

        if (tier === 'MISS') {
            // MISS: No reels. Tiny "x" flash at bottom, gone in 0.5s
            push(() => { setCardSlotPhase('result'); setCardSlotTier('MISS'); }, 0);
            push(() => { setCardSlotDmg(Math.round(dropCard.bstTotal * 0.5)); setCardSlotPhase('impact'); }, 200);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 600);

        } else if (tier === 'BONUS') {
            // BONUS: Small reels, quick spin, small flash
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); }, 0);
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); }, 400);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); }, 550);
            push(() => { setCardSlotPhase('attack'); }, 800);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); }, 1000);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 2000);

        } else if (tier === 'GREAT') {
            // GREAT: Normal reels, element tint, decent effect
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); }, 450);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase(isReach ? 'reach' : 'stop2'); }, 800);
            const r3g = isReach ? 1400 : 1050;
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); }, r3g);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); }, r3g + 200);
            push(() => { setCardSlotPhase('attack'); }, r3g + 500);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); }, r3g + 750);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, r3g + 2000);

        } else if (tier === 'SUPER') {
            // SUPER: Bigger reels, screen border glow, dramatic pause
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); }, 500);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase(isReach ? 'reach' : 'stop2'); }, 900);
            const r3s = isReach ? 1800 : 1200;
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); }, r3s);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); }, r3s + 250);
            push(() => { setCardSlotPhase('attack'); }, r3s + 600);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); }, r3s + 900);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, r3s + 2500);

        } else if (tier === 'MEGA') {
            // MEGA: Full screen takeover, long REACH, screen crack, explosion
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); }, 600);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase('reach'); }, 1000);
            // Long dramatic REACH pause
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); }, 2400);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); }, 2600);
            push(() => { setCardSlotPhase('attack'); }, 3000);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); }, 3300);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 5500);

        } else if (tier === 'LEGENDARY') {
            // LEGENDARY: Screen goes GOLD, everything transforms, massive payoff
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); }, 600);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase('reach'); }, 1100);
            // Extra long dramatic REACH
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); }, 3000);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); }, 3300);
            push(() => { setCardSlotPhase('attack'); }, 3800);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); }, 4200);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 6500);

        } else {
            // MYTHIC: Complete scene transformation, god-mode
            push(() => { setCardSlotPhase('spin'); setCardSlotTier(''); setCardSlotReels(['blank', 'blank', 'blank']); }, 0);
            push(() => { setCardSlotReels([combo[0], 'blank', 'blank']); setCardSlotPhase('stop1'); }, 700);
            push(() => { setCardSlotReels([combo[0], combo[1], 'blank']); setCardSlotPhase('reach'); }, 1200);
            // Maximum suspense REACH
            push(() => { setCardSlotReels(combo); setCardSlotPhase('stop3'); }, 3500);
            push(() => { setCardSlotPhase('result'); setCardSlotTier(tier); }, 3800);
            push(() => { setCardSlotPhase('attack'); }, 4500);
            push(() => { setCardSlotPhase('impact'); setCardSlotDmg(Math.round(dropCard.bstTotal * dmgMultiplier)); }, 5000);
            push(() => { setCardSlotPhase('idle'); setCardSlotCard(null); setCardSlotDmg(null); setCardSlotTier(''); }, 7500);
        }

        cardSlotTimerRef.current = T;
        return () => { T.forEach(t => clearTimeout(t)); };
    }, [dropCard, battleActive]);
    const [reaction, setReaction] = useState<(RunnerReaction & { points: number; key: number }) | null>(null);
    const [godCelebration, setGodCelebration] = useState(false);
    const [showGoalSetting, setShowGoalSetting] = useState(false);
    const [goalInput, setGoalInput] = useState(String(goalXP));
    useEffect(() => { setGoalInput(String(goalXP)); }, [goalXP]);

    // === BATTLE SYNC STATE (DQ-style ULTIMATE) ===
    // battleActive is hoisted above (before per-card slot useEffect)
    const [battleGpRain, setBattleGpRain] = useState(false);
    const [battleGpRainCoins, setBattleGpRainCoins] = useState<{ x: number; delay: number; size: number; key: number }[]>([]);
    const [battleKakuhenFlash, setBattleKakuhenFlash] = useState(false);
    const [battleBossExplode, setBattleBossExplode] = useState(false);
    const [battleCardIdx, setBattleCardIdx] = useState(-1);
    const [battleBossHpLeft, setBattleBossHpLeft] = useState(0);
    const [battlePhase, setBattlePhase] = useState<'idle' | 'wipe' | 'intro' | 'cards' | 'synergy' | 'result' | 'victory'>('idle');
    const [battleMsg, setBattleMsg] = useState('');
    const [battleMsg2, setBattleMsg2] = useState('');
    const [battleSlash, setBattleSlash] = useState(false);
    const [battleShake, setBattleShake] = useState(false);
    const [battleSpellEffect, setBattleSpellEffect] = useState<string | null>(null);
    const [battleGrade, setBattleGrade] = useState<string | null>(null);
    const [battleDefeated, setBattleDefeated] = useState(false);
    const [battleBossHit, setBattleBossHit] = useState(false);
    const [battleCritical, setBattleCritical] = useState(false);
    const [battleDmgNum, setBattleDmgNum] = useState<{ val: number; key: number } | null>(null);
    const [battleCombo, setBattleCombo] = useState(0);
    const [battleTotalDmg, setBattleTotalDmg] = useState(0);
    const [battleHeroAtk, setBattleHeroAtk] = useState(false);
    const [battleSynergyName, setBattleSynergyName] = useState<string | null>(null);
    const [battleVictoryStats, setBattleVictoryStats] = useState<{ totalDmg: number; cards: number; synergies: number; gp: number } | null>(null);
    const [battleWipeIn, setBattleWipeIn] = useState(false);
    const [battleWipeOut, setBattleWipeOut] = useState(false);
    const [battleBossIntro, setBattleBossIntro] = useState(false);
    const [battlePhraseAtk, setBattlePhraseAtk] = useState<string | null>(null);
    const [battleBossCounter, setBattleBossCounter] = useState(false);
    const [battleBossTaunt, setBattleBossTaunt] = useState<string | null>(null);
    const [battleWordBuild, setBattleWordBuild] = useState<string[]>([]);
    const [battleWordIdx, setBattleWordIdx] = useState(-1);
    const [battleFinisher, setBattleFinisher] = useState(false);
    const [battleRankFx, setBattleRankFx] = useState<string | null>(null);
    const [battlePhraseFlash, setBattlePhraseFlash] = useState<string[]>([]);
    const [battlePhraseFlashIdx, setBattlePhraseFlashIdx] = useState(-1);
    const [battleRush, setBattleRush] = useState(false);
    const [battleRushCombo, setBattleRushCombo] = useState<string | null>(null);
    const [battleZoom, setBattleZoom] = useState(false);
    const [battleCrack, setBattleCrack] = useState(false);
    const [battleWhiteout, setBattleWhiteout] = useState(false);
    const [battleInvert, setBattleInvert] = useState(false);
    // Slot integration — spins before each card attack, determines演出 tier
    const [battleSlotReels, setBattleSlotReels] = useState<[string, string, string]>(['blank', 'blank', 'blank']);
    const [battleSlotPhase, setBattleSlotPhase] = useState<'idle' | 'spin' | 'stop1' | 'stop2' | 'stop3' | 'reach' | 'result'>('idle');
    const [battleSlotTier, setBattleSlotTier] = useState<string>('MISS');
    const battleTimerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    // Initialize with current battleData so remount doesn't replay the battle
    const prevBattleRef = useRef<typeof battleData>(battleData ?? null);

    const ELEM_JA: Record<string, string> = { flame: '火', aqua: '水', wind: '風', earth: '地', thunder: '雷' };
    const ELEM_COLOR: Record<string, string> = { flame: '#EF4444', aqua: '#3B82F6', wind: '#10B981', earth: '#D97706', thunder: '#8B5CF6' };

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
    const sfxBossAppear = () => { sfxTone(120, 0.3, 'sawtooth', 0.15); setTimeout(() => sfxTone(80, 0.5, 'sawtooth', 0.12), 200); };
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

    useEffect(() => {
        if (!battleData || battleData === prevBattleRef.current) return;
        prevBattleRef.current = battleData;
        battleTimerRef.current.forEach(t => clearTimeout(t));
        battleTimerRef.current = [];

        const T: ReturnType<typeof setTimeout>[] = [];
        const push = (fn: () => void, ms: number) => { T.push(setTimeout(fn, ms)); };

        // Boss taunts pool
        const BOSS_TAUNTS = ['その程度か?', 'ぬるいぞ!', 'まだまだだな!', '効いてないぞ!', 'くだらん...', 'つまらん攻撃だ!'];
        const BOSS_HURT = ['ぐっ...!', 'なかなかやるな...', 'く...!', 'やるではないか!', 'き、貴様...!'];
        const BOSS_DESPERATE = ['ば、バカな...!', 'こ、こんなはずは...!', 'ありえん...!'];
        const RANK_TIER = (r: string) => { const v: Record<string,number> = { S:4, A:3, B:2, C:1, D:0 }; return v[r] ?? 1; };

        // Reset all
        setBattleActive(true);
        onBattleStart?.();
        setBattleBossHpLeft(battleData.bossHp);
        setBattlePhase('wipe');
        setBattleCardIdx(-1);
        setBattleMsg(''); setBattleMsg2('');
        setBattleSlash(false); setBattleShake(false);
        setBattleSpellEffect(null); setBattleGrade(null);
        setBattleDefeated(false); setBattleBossHit(false);
        setBattleCritical(false); setBattleDmgNum(null);
        setBattleCombo(0); setBattleTotalDmg(0);
        setBattleHeroAtk(false); setBattleSynergyName(null);
        setBattleVictoryStats(null);
        setBattleWipeIn(true); setBattleWipeOut(false);
        setBattleBossIntro(false);
        setBattlePhraseAtk(null);
        setBattleBossCounter(false); setBattleBossTaunt(null);
        setBattleWordBuild([]); setBattleWordIdx(-1);
        setBattleFinisher(false); setBattleRankFx(null);
        setBattlePhraseFlash([]); setBattlePhraseFlashIdx(-1);
        setBattleRush(false); setBattleRushCombo(null);
        setBattleZoom(false); setBattleCrack(false); setBattleWhiteout(false); setBattleInvert(false);
        setBattleSlotPhase('idle'); setBattleSlotReels(['blank', 'blank', 'blank']); setBattleSlotTier('MISS');

        // Phase 1: Screen wipe (faster)
        push(() => { setBattleWipeIn(false); setBattlePhase('intro'); sfxBattleStart(); }, 400);

        // Phase 2: Boss entrance (compressed)
        push(() => { setBattleBossIntro(true); sfxBossAppear(); setBattleMsg(`${battleData!.bossName} があらわれた!`); setBattleMsg2(`[${ELEM_JA[battleData!.bossElement]}属性] HP: ${battleData!.bossHp.toLocaleString()}`); }, 500);
        push(() => { setBattleBossIntro(false); setBattlePhase('cards'); }, 1400);

        // Phase 3: Card attacks — 3-ACT STRUCTURE
        let cumulativeDmg = 0;
        let cursor = 1600;
        const N_CARDS = battleData.cards.length;
        const FULL_LIMIT = Math.min(2, N_CARDS - 1); // first 2 get full treatment
        const synMult = battleData.synergies.reduce((m, s) => m * s.multiplier, 1);

        const doFullCard = (card: typeof battleData.cards[0], i: number) => {
            const isCrit = card.bstTotal >= 500;
            const isSuper = card.elementAdvantage === 'super';
            const isWeak = card.elementAdvantage === 'weak';
            const slotTier = getSlotTierForCard(card);
            const slotCombo = (TIER_TO_COMBO[slotTier] || generateMissCombo()) as [string, string, string];
            const isReach = slotTier !== 'MISS' && slotCombo[0] === slotCombo[1];
            const tierPower = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[slotTier] || 0;

            // Phase 1: Slot spin
            push(() => {
                setBattleCardIdx(i); setBattleCombo(i + 1);
                setBattleBossTaunt(null); setBattleBossCounter(false); setBattleRush(false);
                setBattleSlotPhase('spin'); setBattleSlotTier('');
                setBattleMsg(`[${i + 1}/${N_CARDS}] ${card.english}`);
                setBattleMsg2(`${ELEM_JA[card.element]}属性 / BST ${card.bstTotal}`);
                sfxSlotSpin();
            }, cursor);

            // Reel 1 stops
            push(() => {
                setBattleSlotReels([slotCombo[0], 'blank', 'blank']);
                setBattleSlotPhase('stop1'); sfxSlotStop();
            }, cursor + 500);

            // Reel 2 stops
            push(() => {
                setBattleSlotReels([slotCombo[0], slotCombo[1], 'blank']);
                setBattleSlotPhase('stop2'); sfxSlotStop();
                if (isReach) { setBattleSlotPhase('reach'); sfxSlotReach(); }
            }, cursor + 800);

            // Reel 3 stops (slower if reach = more anticipation)
            const reel3At = isReach ? cursor + 1400 : cursor + 1050;
            push(() => {
                setBattleSlotReels(slotCombo);
                setBattleSlotPhase('stop3'); sfxSlotStop();
            }, reel3At);

            // Slot result flash
            const resultAt = reel3At + 200;
            push(() => {
                setBattleSlotPhase('result'); setBattleSlotTier(slotTier);
                if (tierPower >= 2) sfxSlotHit(slotTier);
                setBattleMsg2(tierPower >= 4 ? `-- ${TIER_JA[slotTier] || slotTier} --` : tierPower >= 2 ? TIER_JA[slotTier] || '' : '');
            }, resultAt);

            // Phase 2: Attack — scaled by slot tier
            const atkAt = resultAt + 300;
            push(() => {
                setBattleSlotPhase('idle');
                setBattlePhraseAtk(card.english); setBattleHeroAtk(true);
                setBattleRankFx(tierPower >= 3 ? card.rank : null);
                sfxTone(660, 0.06, 'square', 0.1);
            }, atkAt);

            push(() => {
                setBattlePhraseAtk(null); setBattleHeroAtk(false);
                setBattleSlash(true); setBattleBossHit(true);
                // Tier-scaled effects
                if (tierPower >= 4) { setBattleShake(true); setBattleZoom(true); setTimeout(() => setBattleZoom(false), 200); }
                if (tierPower >= 5 || isCrit) { setBattleCritical(true); sfxCritical(); setBattleCrack(true); }
                else { sfxSlash(); }
                if (tierPower >= 3) { setBattleShake(true); }
                if (tierPower >= 2 || isSuper) { setBattleSpellEffect(card.element); sfxSpell[card.element]?.(); }
                if (tierPower >= 6) { setBattleWhiteout(true); setTimeout(() => setBattleWhiteout(false), 300); setBattleInvert(true); setTimeout(() => setBattleInvert(false), 150); }
                if (i === N_CARDS - 1 && N_CARDS > 1) { setBattleWhiteout(true); setTimeout(() => setBattleWhiteout(false), 300); }
            }, atkAt + 200);

            // Damage — slot tier multiplies visual impact
            const dmgAt = atkAt + 450;
            push(() => {
                setBattleSlash(false); setBattleShake(false); setBattleBossHit(false);
                setBattleCritical(false); setBattleSpellEffect(null); setBattleRankFx(null);
                cumulativeDmg += card.modifiedBst;
                setBattleTotalDmg(cumulativeDmg);
                setBattleBossHpLeft(Math.max(0, battleData!.bossHp - Math.round(cumulativeDmg * synMult)));
                setBattleDmgNum({ val: card.modifiedBst, key: effectKey() + i });
                sfxDamageHit();
                const dmgMsg = tierPower >= 4
                    ? `「${card.english}」 ${TIER_JA[slotTier]}!! ${card.modifiedBst.toLocaleString()} ダメージ!!`
                    : isCrit ? `「${card.english}」 会心!! ${card.modifiedBst.toLocaleString()} ダメージ!!`
                    : isSuper ? `「${card.english}」 弱点! ${card.modifiedBst.toLocaleString()} ダメージ!`
                    : isWeak ? `「${card.english}」... ${card.modifiedBst.toLocaleString()} 効きが悪い...`
                    : `「${card.english}」 ${card.modifiedBst.toLocaleString()} ダメージ`;
                setBattleMsg(dmgMsg);
                setBattleMsg2(isCrit ? '-- CRITICAL --' : isSuper ? '弱点を突いた!' : tierPower >= 2 ? `${TIER_JA[slotTier] || ''} x${(1 + tierPower * 0.1).toFixed(1)}` : '');
            }, dmgAt);

            push(() => setBattleDmgNum(null), dmgAt + 350);
            cursor = dmgAt + 450;
        };

        // === ACT 1: First cards — full word-by-word ===
        for (let i = 0; i < Math.min(FULL_LIMIT, N_CARDS); i++) {
            doFullCard(battleData.cards[i], i);

            // Boss taunt after first card (short)
            if (i === 0 && N_CARDS > 2) {
                push(() => {
                    setBattleBossCounter(true); setBattleShake(true);
                    sfxTone(150, 0.1, 'sawtooth', 0.08);
                    setBattleBossTaunt(BOSS_TAUNTS[0]);
                    setBattleMsg(`${battleData!.bossName}「${BOSS_TAUNTS[0]}」`); setBattleMsg2('');
                }, cursor);
                push(() => { setBattleBossCounter(false); setBattleShake(false); setBattleBossTaunt(null); }, cursor + 300);
                cursor += 400;
            }
        }

        // === ACT 2: Middle cards — RUSH MODE (rapid-fire) ===
        const rushCards = battleData.cards.slice(FULL_LIMIT, N_CARDS - 1);
        if (rushCards.length > 0) {
            // Rush intro
            push(() => {
                setBattleRush(true);
                setBattleMsg('--- RUSH ---');
                setBattleMsg2(`${rushCards.length} HIT COMBO!`);
                sfxTone(440, 0.08, 'square', 0.1);
                setTimeout(() => sfxTone(660, 0.08, 'square', 0.1), 60);
            }, cursor);
            cursor += 250;

            const RUSH_DELAY = 400; // fast but with mini-slot flash
            rushCards.forEach((card, ri) => {
                const i = FULL_LIMIT + ri;
                const rushTier = getSlotTierForCard(card);
                const rushCombo = (TIER_TO_COMBO[rushTier] || generateMissCombo()) as [string, string, string];
                const rushPower = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[rushTier] || 0;

                // Quick slot flash (no individual reel stops)
                push(() => {
                    setBattleCardIdx(i); setBattleCombo(i + 1);
                    setBattleSlotReels(rushCombo); setBattleSlotPhase('result'); setBattleSlotTier(rushTier);
                    setBattlePhraseAtk(card.english);
                    setBattleSlash(true); setBattleBossHit(true);
                    if (rushPower >= 3) { setBattleShake(true); setBattleZoom(true); setTimeout(() => setBattleZoom(false), 100); }
                    if (rushPower >= 4) { setBattleCritical(true); setBattleCrack(true); sfxCritical(); }
                    else { sfxSlash(); }
                    if (rushPower >= 2) { setBattleSpellEffect(card.element); }
                    sfxTone(400 + ri * 40, 0.04, 'square', 0.06);
                    if (rushPower >= 2) sfxSlotHit(rushTier);

                    cumulativeDmg += card.modifiedBst;
                    setBattleTotalDmg(cumulativeDmg);
                    setBattleBossHpLeft(Math.max(0, battleData!.bossHp - Math.round(cumulativeDmg * synMult)));
                    setBattleDmgNum({ val: card.modifiedBst, key: effectKey() + i });
                    setBattleMsg(`「${card.english}」 ${card.modifiedBst.toLocaleString()}!`);
                    setBattleMsg2(rushPower >= 2 ? `${TIER_JA[rushTier] || ''} -- ${i + 1} HIT!` : `${i + 1} HIT!`);
                }, cursor + ri * RUSH_DELAY);

                push(() => {
                    setBattlePhraseAtk(null); setBattleSlash(false); setBattleShake(false);
                    setBattleBossHit(false); setBattleCritical(false); setBattleSpellEffect(null);
                    setBattleDmgNum(null); setBattleSlotPhase('idle');
                }, cursor + ri * RUSH_DELAY + 250);
            });

            cursor += rushCards.length * RUSH_DELAY + 200;

            // Rush end — boss reaction (short)
            const hpPct = Math.max(0, battleData!.bossHp - Math.round(cumulativeDmg * synMult)) / battleData!.bossHp;
            push(() => {
                setBattleRush(false);
                setBattleBossCounter(true); setBattleShake(true);
                sfxTone(120, 0.15, 'sawtooth', 0.1);
                const taunt = hpPct < 0.3 ? BOSS_DESPERATE[0] : BOSS_HURT[1];
                setBattleBossTaunt(taunt);
                setBattleMsg(`${battleData!.bossName}「${taunt}」`);
                setBattleMsg2(hpPct < 0.3 ? 'ボスが追い詰められている!' : '');
            }, cursor);
            push(() => { setBattleBossCounter(false); setBattleShake(false); setBattleBossTaunt(null); }, cursor + 300);
            cursor += 400;
        }

        // === ACT 3: Last card — FINAL STRIKE ===
        if (N_CARDS > 1) {
            push(() => {
                setBattleFinisher(true);
                setBattleMsg('--- とどめの一撃 ---'); setBattleMsg2('');
                sfxTone(220, 0.3, 'sawtooth', 0.1);
            }, cursor);
            cursor += 600;
            push(() => setBattleFinisher(false), cursor);
            cursor += 100;
        }
        doFullCard(battleData.cards[N_CARDS - 1], N_CARDS - 1);

        cursor += 300;

        // Phase 4: Synergies (compressed)
        if (battleData.synergies.length > 0) {
            push(() => { setBattleMsg('--- シナジー発動 ---'); setBattleMsg2(''); }, cursor);
            battleData.synergies.forEach((syn, si) => {
                push(() => {
                    setBattlePhase('synergy');
                    setBattleSynergyName(`${syn.icon} ${syn.name}`);
                    sfxSynergy();
                    setBattleMsg(`${syn.icon} ${syn.name} 発動!`);
                    setBattleMsg2(`ダメージ x${syn.multiplier.toFixed(1)}倍!`);
                    setBattleShake(true); setBattleSpellEffect('thunder');
                    setTimeout(() => { setBattleShake(false); setBattleSpellEffect(null); setBattleSynergyName(null); }, 350);
                }, cursor + 250 + si * 550);
            });
            cursor += 250 + battleData.synergies.length * 550;
        }

        cursor += 200;

        // Final damage + Result + Grade (merged for speed)
        push(() => {
            const finalHp = Math.max(0, battleData!.bossHp - battleData!.finalDamage);
            setBattleBossHpLeft(finalHp);
            setBattleTotalDmg(battleData!.finalDamage);
            setBattlePhase('result');
            setBattleGrade(battleData!.grade);
            sfxGrade(battleData!.grade);
            if (battleData!.bossDefeated) {
                // Boss EXPLOSION effect
                setBattleBossExplode(true);
                setBattleShake(true);
                setBattleInvert(true); setTimeout(() => setBattleInvert(false), 200);
                setBattleWhiteout(true); setTimeout(() => setBattleWhiteout(false), 400);
                setBattleZoom(true); setTimeout(() => setBattleZoom(false), 400);
                setTimeout(() => { setBattleShake(false); setBattleBossExplode(false); }, 600);
                setBattleMsg(`${battleData!.bossName} を撃破!!`);
                setBattleMsg2('');
            } else {
                setBattleMsg(`${battleData!.bossName} は倒せなかった...`);
                setBattleMsg2(`総ダメージ: ${battleData!.finalDamage.toLocaleString()} / 残HP ${Math.max(0, battleData!.bossHp - battleData!.finalDamage).toLocaleString()}`);
                sfxDefeat();
            }
        }, cursor);

        cursor += 800;

        // === GP RAIN + 確変突入 (boss defeated only) ===
        if (battleData.bossDefeated) {
            // GP coin rain — 20 coins falling with staggered delays
            push(() => {
                const coins = Array.from({ length: 20 }, (_, i) => ({
                    x: Math.random() * 90 + 5, // 5-95% horizontal
                    delay: Math.random() * 0.6,
                    size: 8 + Math.random() * 8,
                    key: effectKey() + i,
                }));
                setBattleGpRain(true);
                setBattleGpRainCoins(coins);
                sfxTone(880, 0.06, 'square', 0.05);
                setTimeout(() => sfxTone(1100, 0.06, 'square', 0.05), 80);
                setTimeout(() => sfxTone(1320, 0.06, 'square', 0.05), 160);
                setBattleMsg('GP BONUS!!');
                const gpEarned = Math.round(battleData!.finalDamage / 10) * 2;
                setBattleMsg2(`+${gpEarned.toLocaleString()} GP`);
            }, cursor);
            cursor += 1200;

            // 確変突入 flash
            push(() => {
                setBattleGpRain(false); setBattleGpRainCoins([]);
                setBattleKakuhenFlash(true);
                setBattleInvert(true); setTimeout(() => setBattleInvert(false), 150);
                sfxTone(440, 0.15, 'square', 0.08);
                setTimeout(() => sfxTone(660, 0.12, 'square', 0.08), 100);
                setTimeout(() => sfxTone(880, 0.1, 'square', 0.08), 200);
                setKakuhenBoost(10); // 次の10回のスロットが確変
                setBattleMsg('確変突入!!');
                setBattleMsg2('次の10回スロット確率UP!');
            }, cursor);
            cursor += 1500;

            push(() => { setBattleKakuhenFlash(false); }, cursor);
        }

        cursor += 400;

        // Victory: rapid phrase flashback
        const allPhrases = battleData.cards.map(c => c.english);
        const FLASH_DELAY = Math.min(200, 800 / allPhrases.length);
        push(() => {
            setBattlePhase('victory');
            setBattlePhraseFlash(allPhrases); setBattlePhraseFlashIdx(0);
        }, cursor);
        allPhrases.forEach((_, fi) => {
            push(() => { setBattlePhraseFlashIdx(fi); sfxTone(440 + fi * 60, 0.03, 'square', 0.05); }, cursor + fi * FLASH_DELAY);
        });
        cursor += allPhrases.length * FLASH_DELAY + 300;

        push(() => {
            setBattlePhraseFlash([]); setBattlePhraseFlashIdx(-1);
            setBattleVictoryStats({
                totalDmg: battleData!.finalDamage,
                cards: battleData!.cards.length,
                synergies: battleData!.synergies.length,
                gp: Math.round(battleData!.finalDamage / 10) * (battleData!.bossDefeated ? 2 : 1),
            });
            setBattleMsg(battleData!.bossDefeated ? 'VICTORY!' : 'BATTLE END');
            setBattleMsg2('');
            if (battleData!.bossDefeated) sfxVictory();
        }, cursor);

        cursor += 1200;

        // Screen wipe out + cleanup
        push(() => { setBattleWipeOut(true); }, cursor);
        push(() => {
            setBattleActive(false); setBattlePhase('idle');
            setBattleCardIdx(-1); setBattleGrade(null);
            setBattleDefeated(false); setBattleMsg(''); setBattleMsg2('');
            setBattleDmgNum(null); setBattleCombo(0); setBattleTotalDmg(0);
            setBattleVictoryStats(null); setBattleWipeIn(false); setBattleWipeOut(false);
            setBattlePhraseAtk(null); setBattleBossCounter(false); setBattleBossTaunt(null);
            setBattleWordBuild([]); setBattleWordIdx(-1);
            setBattleFinisher(false); setBattleRankFx(null);
            setBattlePhraseFlash([]); setBattlePhraseFlashIdx(-1);
            setBattleRush(false); setBattleRushCombo(null);
            setBattleZoom(false); setBattleCrack(false); setBattleWhiteout(false); setBattleInvert(false);
            setBattleSlotPhase('idle'); setBattleSlotReels(['blank', 'blank', 'blank']); setBattleSlotTier('MISS');
            setBattleGpRain(false); setBattleGpRainCoins([]); setBattleKakuhenFlash(false); setBattleBossExplode(false);
            onBattleEnd?.();
        }, cursor + 600);

        battleTimerRef.current = T;
        return () => { T.forEach(t => clearTimeout(t)); };
    }, [battleData]);

    const milestones = getRunnerMilestones(goalXP);
    const maxXP = Math.round(goalXP * 1.07);
    const progress = Math.min(todayXP / maxXP, 1);
    const isGod = todayXP >= goalXP;
    const wr = todayXP / goalXP;
    const ws = wr >= 0.666 ? 0.18 : wr >= 0.268 ? 0.26 : wr >= 0.055 ? 0.38 : 0.55;
    const sky = getTrainingV6Sky(wr, isGod);
    const isRunning = wr > 0.003;

    const dailyTitle = (() => {
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (todayXP >= milestones[i].xp) return { title: milestones[i].title, color: milestones[i].color };
        }
        return { title: '寝起き', color: '#78716C' };
    })();
    const cc = dailyTitle.color;

    useEffect(() => {
        if (battleActive) return; // Skip normal XP reactions during battle
        const diff = todayXP - prevXpRef.current;
        if (diff > 0) {
            const r = getRunnerReaction();
            setReaction({ ...r, points: diff, key: effectKey() });
            const t = setTimeout(() => setReaction(null), r.dur + 200);
            const nowGod = todayXP >= goalXP;
            if (nowGod && !prevGodRef.current) { setGodCelebration(true); setTimeout(() => setGodCelebration(false), 3500); }
            prevXpRef.current = todayXP; prevGodRef.current = nowGod;
            return () => clearTimeout(t);
        }
        prevXpRef.current = todayXP; prevGodRef.current = todayXP >= goalXP;
    }, [todayXP, goalXP, battleActive]);

    const sunAngle = Math.min(wr, 1) * 150 + 15;
    const sunX = 50 - Math.cos(sunAngle * Math.PI / 180) * 44;
    const sunY = 46 - Math.sin(sunAngle * Math.PI / 180) * 38;
    const GH = 34; // ground height
    const SH = 160; // stage height
    const charLeft = isGod ? 50 : 5 + Math.min(progress * 86, 86);

    // === ENEMY LOGIC ===
    const currentMilestoneIdx = (() => {
        for (let i = milestones.length - 1; i >= 0; i--) {
            if (todayXP >= milestones[i].xp) return i;
        }
        return -1;
    })();
    const nextMilestoneIdx = currentMilestoneIdx + 1;
    const hasEnemy = nextMilestoneIdx < milestones.length && !isGod;
    const enemyMilestone = hasEnemy ? milestones[nextMilestoneIdx] : null;
    const prevMilestoneXP = currentMilestoneIdx >= 0 ? milestones[currentMilestoneIdx].xp : 0;
    const enemyMaxHP = enemyMilestone ? enemyMilestone.xp - prevMilestoneXP : 1;
    const enemyCurrentHP = enemyMilestone ? Math.max(0, enemyMilestone.xp - todayXP) : 0;
    const enemyHPRatio = enemyMaxHP > 0 ? enemyCurrentHP / enemyMaxHP : 0;
    // Use evenly-spaced position matching milestone flags (8% to 88%)
    const enemyEvenX = hasEnemy ? 8 + (nextMilestoneIdx / (milestones.length - 1)) * 80 : 85;
    // Enemy type based on milestone tier
    const enemyTier: 'slime' | 'wolf' | 'dragon' | 'demon' = (() => {
        if (nextMilestoneIdx <= 1) return 'slime';
        if (nextMilestoneIdx <= 3) return 'wolf';
        if (nextMilestoneIdx <= 5) return 'dragon';
        return 'demon';
    })();
    const enemyColor = (() => {
        switch (enemyTier) {
            case 'slime': return { body: '#4ADE80', dark: '#16A34A', eye: '#065F46' };
            case 'wolf': return { body: '#60A5FA', dark: '#2563EB', eye: '#1E3A5F' };
            case 'dragon': return { body: '#F87171', dark: '#DC2626', eye: '#7F1D1D' };
            case 'demon': return { body: '#A78BFA', dark: '#7C3AED', eye: '#3B0764' };
        }
    })();
    const isAttacking = !!reaction;
    const enemyJustHit = isAttacking;
    // Position enemy slightly LEFT of the milestone flag
    const enemyLeftAdjusted = hasEnemy ? enemyEvenX - 4 : 82;

    return (
        <div style={{ height: '160px', position: 'relative', overflow: 'hidden', background: sky.bg, transition: 'background 3s ease', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>

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
                    <defs><linearGradient id="v6mf-t" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={sky.hFar} stopOpacity="0.55" /><stop offset="100%" stopColor={sky.hFar} stopOpacity="0.15" /></linearGradient></defs>
                    <path d="M0,45 L8,30 L25,36 L50,20 L75,32 L95,12 L120,24 L148,6 L175,22 L198,15 L222,30 L248,10 L278,24 L305,18 L330,32 L355,12 L378,26 L400,20 L425,30 L450,20 L478,36 L500,18 L528,30 L550,10 L578,24 L600,6 L628,22 L650,15 L678,30 L700,10 L728,24 L748,18 L775,32 L795,14 L800,22 L800,45 Z" fill="url(#v6mf-t)" />
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

            {/* Word stream removed — heavy animation */}

            {/* === OBSTACLES (endless runner) === */}
            {isRunning && !isGod && (
                <div style={{
                    position: 'absolute', bottom: `${GH}px`, left: 0,
                    width: '200%', height: '18px', zIndex: 11,
                    animation: `v6-obstacles ${Math.max(ws * 14, 5)}s linear infinite`,
                }}>
                    {[
                        { x: 6, w: 8, h: 7, r: '2px 2px 1px 1px', bg: '#8B7355' },
                        { x: 18, w: 5, h: 10, r: '1px', bg: '#78716C', clip: 'polygon(50% 0%, 100% 100%, 0% 100%)' },
                        { x: 31, w: 10, h: 5, r: '2px', bg: '#6B5B3A' },
                        { x: 44, w: 6, h: 9, r: '1px', bg: '#78716C', clip: 'polygon(50% 0%, 100% 100%, 0% 100%)' },
                        { x: 56, w: 9, h: 6, r: '3px 3px 1px 1px', bg: '#8B7355' },
                        { x: 69, w: 5, h: 11, r: '1px', bg: '#A8A29E', clip: 'polygon(50% 0%, 100% 100%, 0% 100%)' },
                        { x: 81, w: 11, h: 5, r: '2px', bg: '#6B5B3A' },
                        { x: 94, w: 7, h: 8, r: '3px 3px 1px 1px', bg: '#78716C' },
                    ].map((o, i) => (
                        <div key={`obs-${i}`} style={{
                            position: 'absolute', bottom: 0, left: `${o.x}%`,
                            width: `${o.w}px`, height: `${o.h}px`,
                            background: o.bg, borderRadius: o.r,
                            clipPath: (o as { clip?: string }).clip || undefined,
                            opacity: 0.6,
                            boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
                        }} />
                    ))}
                </div>
            )}

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

            {/* === MILESTONE FLAGS — evenly spaced, staggered heights === */}
            {milestones.map((m, i) => {
                // Evenly space flags across 8%–88% of the runner width (not bunched at start)
                const evenX = 8 + (i / (milestones.length - 1)) * 80;
                const cleared = todayXP >= m.xp;
                const isNext = !cleared && (i === 0 || todayXP >= milestones[i - 1].xp);
                // Alternate tall/short to avoid overlap
                const isOdd = i % 2 === 1;
                const poleH = cleared ? (isOdd ? 40 : 28) : (isOdd ? 30 : 20);
                // Cute milestone icons
                const msIcons = ['⚡', '✦', '☆', '♦', '★', '♥', '◆', '♛'];
                return (
                    <div key={`ms-${i}`} style={{ position: 'absolute', bottom: `${GH}px`, left: `${evenX}%`, zIndex: 12, transform: 'translateX(-50%)' }}>
                        {/* Flag pole with gradient */}
                        <div style={{
                            width: cleared ? '3px' : '2px', height: `${poleH}px`,
                            background: cleared ? `linear-gradient(180deg, ${m.color}, ${m.color}60)` : '#C4B5A0',
                            borderRadius: '1.5px', transition: 'all 0.6s ease',
                            margin: '0 auto',
                        }} />
                        {/* Flag pennant — bigger, more colorful */}
                        <div style={{
                            position: 'absolute', top: 0, left: '3px',
                            width: cleared ? '24px' : '16px', height: cleared ? '16px' : '10px',
                            background: cleared ? `linear-gradient(135deg, ${m.color}, ${m.color}CC)` : '#D6D3D1',
                            clipPath: 'polygon(0 0, 100% 15%, 75% 50%, 100% 85%, 0 100%)',
                            opacity: cleared ? 1 : 0.4,
                            animation: cleared ? 'v6-flag 2.5s ease-in-out infinite' : undefined,
                            transformOrigin: 'left center',
                            transition: 'all 0.4s ease',
                        }}>
                            <div style={{ fontSize: cleared ? '8px' : '6px', fontWeight: '900', color: '#fff', paddingTop: cleared ? '2px' : '1px', paddingLeft: '3px', textShadow: '0 1px 2px rgba(0,0,0,0.4)', lineHeight: 1 }}>
                                {msIcons[i] || '✦'}
                            </div>
                        </div>
                        {/* Small tier number */}
                        <div style={{
                            position: 'absolute', top: `${-10 - (isOdd ? 4 : 0)}px`, left: '50%', transform: 'translateX(-50%)',
                            fontSize: '7px', fontWeight: '900', whiteSpace: 'nowrap',
                            color: cleared ? '#fff' : isNext ? m.color : '#A8A29E80',
                            background: cleared ? m.color : 'transparent',
                            width: '14px', height: '14px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: cleared ? `0 0 8px ${m.color}60` : 'none',
                            border: isNext ? `1.5px solid ${m.color}` : 'none',
                            animation: isNext ? 'enemy-bob 2s ease-in-out infinite' : undefined,
                            transition: 'all 0.4s ease',
                        }}>
                            {i + 1}
                        </div>
                        {/* Cleared glow ring */}
                        {cleared && (
                            <div style={{
                                position: 'absolute', top: '-4px', left: '50%', transform: 'translateX(-50%)',
                                width: '10px', height: '10px', borderRadius: '50%',
                                background: `radial-gradient(circle, ${m.color}80, transparent 70%)`,
                                animation: 'v6-beacon 2s ease-in-out infinite',
                            }} />
                        )}
                        {/* Next target pulse */}
                        {isNext && (
                            <div style={{
                                position: 'absolute', top: '-6px', left: '50%', transform: 'translateX(-50%)',
                                width: '14px', height: '14px', borderRadius: '50%',
                                border: `1.5px solid ${m.color}`,
                                animation: 'milestone-pulse 1.5s ease-in-out infinite',
                            }} />
                        )}
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

            {/* ═══════ ENEMY — animated with name & provocation ═══════ */}
            {hasEnemy && enemyMilestone && !battleActive && (
                <div style={{
                    position: 'absolute', bottom: `${GH}px`,
                    left: `${enemyLeftAdjusted}%`, transform: 'translateX(-50%)',
                    zIndex: 18,
                    animation: enemyJustHit ? `enemy-hit-flash 400ms ease-out` : `enemy-bob 2s ease-in-out infinite`,
                }}>
                    {/* Enemy level badge */}
                    <div style={{
                        position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)',
                        fontSize: '7px', fontWeight: '900', color: '#fff',
                        whiteSpace: 'nowrap', zIndex: 19,
                        background: enemyColor.body, padding: '2px 5px', borderRadius: '8px',
                        boxShadow: `0 1px 4px ${enemyColor.dark}40`,
                    }}>
                        Lv.{nextMilestoneIdx + 1}
                    </div>
                    {/* HP Bar */}
                    <div style={{ position: 'absolute', top: '-16px', left: '50%', transform: 'translateX(-50%)', width: '32px', zIndex: 19 }}>
                        <div style={{ width: '100%', height: '4px', background: '#1c191740', borderRadius: '2px', overflow: 'hidden', border: `0.5px solid ${enemyColor.dark}30` }}>
                            <div style={{
                                width: `${enemyHPRatio * 100}%`, height: '100%',
                                background: enemyHPRatio > 0.5 ? '#10B981' : enemyHPRatio > 0.2 ? '#F59E0B' : '#EF4444',
                                borderRadius: '2px',
                                transition: 'width 0.5s ease',
                                animation: enemyJustHit ? 'hp-bar-damage 300ms ease-out' : undefined,
                            }} />
                        </div>
                    </div>
                    {/* Provocation aura — enemy pulses menacingly */}
                    <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        width: '36px', height: '36px', borderRadius: '50%',
                        border: `1.5px solid ${enemyColor.body}30`,
                        transform: 'translate(-50%, -50%)',
                        animation: 'enemy-aura-pulse 2s ease-in-out infinite',
                        pointerEvents: 'none',
                    }} />

                    {/* Damage popup */}
                    {reaction && (
                        <div key={`dmg-${reaction.key}`} style={{
                            position: 'absolute', top: '-28px', left: '50%',
                            fontSize: reaction.points >= 15 ? '14px' : '11px',
                            fontWeight: '900', color: enemyColor.body,
                            whiteSpace: 'nowrap',
                            animation: `enemy-damage-number ${reaction.dur * 0.6}ms ease-out forwards`,
                            textShadow: `0 0 8px ${enemyColor.body}80, 0 1px 3px rgba(0,0,0,0.6)`,
                            zIndex: 25, pointerEvents: 'none',
                        }}>-{reaction.points}</div>
                    )}

                    {/* Enemy body — cute chibi creatures */}
                    <svg width="32" height="32" viewBox="0 0 24 24" style={{
                        display: 'block',
                        filter: `drop-shadow(0 2px 4px ${enemyColor.dark}30)`,
                        animation: enemyJustHit ? undefined : 'enemy-idle-sway 2.5s ease-in-out infinite',
                    }}>
                        {enemyTier === 'slime' && <>
                            {/* Cute round slime with sparkly eyes and blush */}
                            <ellipse cx="12" cy="22" rx="8" ry="1.5" fill="rgba(0,0,0,0.06)" />
                            <ellipse cx="12" cy="15" rx="9" ry="8" fill={enemyColor.body} />
                            <ellipse cx="12" cy="16" rx="7" ry="5" fill={`${enemyColor.body}80`} />
                            {/* Big sparkly eyes */}
                            <ellipse cx="9" cy="13" rx="2.5" ry="2.8" fill="#fff" />
                            <circle cx="9.5" cy="13" r="1.5" fill={enemyColor.eye} />
                            <circle cx="10" cy="12.3" r="0.6" fill="#fff" />
                            <ellipse cx="15" cy="13" rx="2.5" ry="2.8" fill="#fff" />
                            <circle cx="15.5" cy="13" r="1.5" fill={enemyColor.eye} />
                            <circle cx="16" cy="12.3" r="0.6" fill="#fff" />
                            {/* Blush cheeks */}
                            <ellipse cx="6.5" cy="15.5" rx="1.5" ry="1" fill="#FDA4AF" opacity="0.5" />
                            <ellipse cx="17.5" cy="15.5" rx="1.5" ry="1" fill="#FDA4AF" opacity="0.5" />
                            {/* Happy mouth */}
                            <path d="M10 17 Q12 19 14 17" fill="none" stroke={enemyColor.eye} strokeWidth="0.7" strokeLinecap="round" />
                            {/* Tiny crown */}
                            <path d="M8,8 L9,5 L10.5,7.5 L12,4 L13.5,7.5 L15,5 L16,8Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="0.3" />
                        </>}
                        {enemyTier === 'wolf' && <>
                            {/* Cute puppy with floppy ears */}
                            <ellipse cx="12" cy="22.5" rx="6" ry="1" fill="rgba(0,0,0,0.06)" />
                            {/* Floppy ears */}
                            <ellipse cx="5" cy="10" rx="3" ry="5" fill={enemyColor.body} transform="rotate(-20 5 10)" />
                            <ellipse cx="5.5" cy="10" rx="2" ry="3.5" fill={`${enemyColor.body}80`} transform="rotate(-20 5.5 10)" />
                            <ellipse cx="19" cy="10" rx="3" ry="5" fill={enemyColor.body} transform="rotate(20 19 10)" />
                            <ellipse cx="18.5" cy="10" rx="2" ry="3.5" fill={`${enemyColor.body}80`} transform="rotate(20 18.5 10)" />
                            {/* Round head */}
                            <circle cx="12" cy="12" r="8" fill={enemyColor.body} />
                            {/* Big eyes */}
                            <ellipse cx="9" cy="11" rx="2.5" ry="2.8" fill="#fff" />
                            <circle cx="9.5" cy="11.5" r="1.4" fill={enemyColor.eye} />
                            <circle cx="10" cy="10.8" r="0.5" fill="#fff" />
                            <ellipse cx="15" cy="11" rx="2.5" ry="2.8" fill="#fff" />
                            <circle cx="15.5" cy="11.5" r="1.4" fill={enemyColor.eye} />
                            <circle cx="16" cy="10.8" r="0.5" fill="#fff" />
                            {/* Nose and mouth */}
                            <ellipse cx="12" cy="14.5" rx="1.2" ry="0.9" fill="#1a1a2e" />
                            <path d="M12 15.4 L10.5 17" fill="none" stroke="#1a1a2e" strokeWidth="0.5" strokeLinecap="round" />
                            <path d="M12 15.4 L13.5 17" fill="none" stroke="#1a1a2e" strokeWidth="0.5" strokeLinecap="round" />
                            {/* Blush */}
                            <ellipse cx="6.5" cy="14" rx="1.5" ry="1" fill="#FDA4AF" opacity="0.4" />
                            <ellipse cx="17.5" cy="14" rx="1.5" ry="1" fill="#FDA4AF" opacity="0.4" />
                            {/* Round body */}
                            <ellipse cx="12" cy="20" rx="5" ry="3" fill={enemyColor.body} />
                            {/* Tiny paws */}
                            <circle cx="8.5" cy="22" r="1.5" fill={enemyColor.body} />
                            <circle cx="15.5" cy="22" r="1.5" fill={enemyColor.body} />
                        </>}
                        {enemyTier === 'dragon' && <>
                            {/* Baby dragon — round, chubby, tiny wings */}
                            <ellipse cx="12" cy="22.5" rx="6" ry="1" fill="rgba(0,0,0,0.06)" />
                            {/* Tiny wings */}
                            <path d="M4,11 Q1,6 5,8 Q3,5 7,9" fill="#FDE68A" stroke="#F59E0B" strokeWidth="0.3" />
                            <path d="M20,11 Q23,6 19,8 Q21,5 17,9" fill="#FDE68A" stroke="#F59E0B" strokeWidth="0.3" />
                            {/* Small horns */}
                            <circle cx="8" cy="5" r="1.5" fill="#FBBF24" />
                            <circle cx="16" cy="5" r="1.5" fill="#FBBF24" />
                            {/* Round head */}
                            <circle cx="12" cy="11" r="7.5" fill={enemyColor.body} />
                            {/* Big sparkly eyes */}
                            <ellipse cx="9" cy="10" rx="2.5" ry="3" fill="#fff" />
                            <circle cx="9.5" cy="10.5" r="1.5" fill={enemyColor.eye} />
                            <circle cx="10" cy="9.8" r="0.6" fill="#fff" />
                            <ellipse cx="15" cy="10" rx="2.5" ry="3" fill="#fff" />
                            <circle cx="15.5" cy="10.5" r="1.5" fill={enemyColor.eye} />
                            <circle cx="16" cy="9.8" r="0.6" fill="#fff" />
                            {/* Blush */}
                            <ellipse cx="6" cy="13" rx="1.5" ry="1" fill="#FDA4AF" opacity="0.5" />
                            <ellipse cx="18" cy="13" rx="1.5" ry="1" fill="#FDA4AF" opacity="0.5" />
                            {/* Toothy grin */}
                            <path d="M9 14 Q12 17 15 14" fill="#fff" stroke={enemyColor.eye} strokeWidth="0.5" />
                            <path d="M10.5 14.5 L10.5 15.5" stroke={enemyColor.eye} strokeWidth="0.3" />
                            <path d="M13.5 14.5 L13.5 15.5" stroke={enemyColor.eye} strokeWidth="0.3" />
                            {/* Chubby body */}
                            <ellipse cx="12" cy="19.5" rx="5.5" ry="3.5" fill={enemyColor.body} />
                            {/* Belly patch */}
                            <ellipse cx="12" cy="19.5" rx="3.5" ry="2.5" fill={`${enemyColor.body}60`} />
                            {/* Tiny tail */}
                            <path d="M17.5 19 Q20 17 21 19 Q20 20 19 19" fill={enemyColor.body} stroke={enemyColor.dark} strokeWidth="0.3" />
                        </>}
                        {enemyTier === 'demon' && <>
                            {/* Cute demon cat — round with horns and tail */}
                            <ellipse cx="12" cy="22.5" rx="6" ry="1" fill="rgba(0,0,0,0.06)" />
                            {/* Cat ears */}
                            <polygon points="5,7 7,1 10,6" fill={enemyColor.body} />
                            <polygon points="6,7 7.5,3 9,6" fill="#FDA4AF" opacity="0.5" />
                            <polygon points="19,7 17,1 14,6" fill={enemyColor.body} />
                            <polygon points="18,7 16.5,3 15,6" fill="#FDA4AF" opacity="0.5" />
                            {/* Tiny demon horns on ears */}
                            <circle cx="7" cy="2" r="1" fill="#DC2626" />
                            <circle cx="17" cy="2" r="1" fill="#DC2626" />
                            {/* Round head */}
                            <circle cx="12" cy="11" r="7.5" fill={enemyColor.body} />
                            {/* Big mischievous eyes */}
                            <ellipse cx="9" cy="10" rx="2.5" ry="2.5" fill="#fff" />
                            <circle cx="9.8" cy="10.5" r="1.5" fill={enemyColor.eye} />
                            <circle cx="10.2" cy="9.8" r="0.5" fill="#fff" />
                            <ellipse cx="15" cy="10" rx="2.5" ry="2.5" fill="#fff" />
                            <circle cx="15.8" cy="10.5" r="1.5" fill={enemyColor.eye} />
                            <circle cx="16.2" cy="9.8" r="0.5" fill="#fff" />
                            {/* Cheeky grin */}
                            <path d="M9 14 Q12 16.5 15 14" fill="none" stroke={enemyColor.eye} strokeWidth="0.7" strokeLinecap="round" />
                            {/* Blush */}
                            <ellipse cx="6" cy="13" rx="1.5" ry="1" fill="#FDA4AF" opacity="0.5" />
                            <ellipse cx="18" cy="13" rx="1.5" ry="1" fill="#FDA4AF" opacity="0.5" />
                            {/* Chubby body */}
                            <ellipse cx="12" cy="19.5" rx="5" ry="3.5" fill={enemyColor.body} />
                            {/* Belly */}
                            <ellipse cx="12" cy="19.5" rx="3" ry="2" fill={`${enemyColor.body}50`} />
                            {/* Devil tail */}
                            <path d="M17 19 Q21 15 22 17 Q21 19 20 17.5" fill="none" stroke={enemyColor.body} strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M22 17 L23 15.5 L21.5 16.5Z" fill="#DC2626" />
                            {/* Tiny paws */}
                            <circle cx="8.5" cy="22" r="1.5" fill={enemyColor.body} />
                            <circle cx="15.5" cy="22" r="1.5" fill={enemyColor.body} />
                        </>}
                    </svg>
                </div>
            )}

            {/* ═══════ THE CHARACTER — SVG RPG Hero ═══════ */}
            <div style={{
                position: 'absolute', bottom: `${GH}px`,
                left: `${charLeft}%`, transform: isGod ? 'translateX(-50%)' : undefined,
                transition: 'left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                zIndex: 20,
                filter: isGod ? 'drop-shadow(0 0 14px #D4AF3780)' : `drop-shadow(1px 2px 4px rgba(0,0,0,0.3))`,
                animation: godCelebration ? 'v6-god-ascend 3.5s ease-out'
                    : reaction ? `${reaction.anim} ${reaction.dur}ms ease-out`
                    : isGod ? 'v6-god-float 4s ease-in-out infinite'
                    : isRunning ? `v6-run-jump ${Math.max(ws * 10, 3)}s ease-in-out infinite`
                    : 'v5-idle 3s ease-in-out infinite',
            }}>
                {/* Shadow */}
                <div style={{ position: 'absolute', bottom: '-4px', left: '50%', width: isGod ? '36px' : '24px', height: '6px', background: isGod ? 'radial-gradient(ellipse, #D4AF3725, transparent)' : 'radial-gradient(ellipse, rgba(0,0,0,0.15), transparent)', borderRadius: '50%', animation: isRunning && !reaction ? `v6-shadow-jump ${Math.max(ws * 10, 3)}s ease-in-out infinite` : undefined, transform: 'translateX(-50%)' }} />

                {/* Speed lines — subtle */}
                {wr >= 0.4 && isRunning && !reaction && [0, 1, 2].map(i => (
                    <div key={`sp-${i}`} style={{ position: 'absolute', top: `${12 + i * 12}px`, left: '-10px', width: `${8 + (2 - i) * 3}px`, height: '1px', background: `linear-gradient(90deg, transparent, ${cc}20)`, animation: `v6-speed ${0.3 + i * 0.06}s ease-out ${i * 0.04}s infinite` }} />
                ))}

                {/* God wings */}
                {isGod && !godCelebration && <>
                    <div style={{ position: 'absolute', top: '12px', left: '-20px', width: '20px', height: '28px', background: 'linear-gradient(135deg, #D4AF3788, #FDE68A60, #D4AF3740, #FDE68A20)', clipPath: 'polygon(100% 15%, 85% 0%, 45% 5%, 15% 25%, 0% 50%, 8% 75%, 30% 90%, 60% 95%, 100% 80%)', transformOrigin: 'right center', animation: 'v6-wing-l 1.6s ease-in-out infinite', zIndex: -1 }} />
                    <div style={{ position: 'absolute', top: '12px', right: '-20px', width: '20px', height: '28px', background: 'linear-gradient(-135deg, #D4AF3788, #FDE68A60, #D4AF3740, #FDE68A20)', clipPath: 'polygon(0% 15%, 15% 0%, 55% 5%, 85% 25%, 100% 50%, 92% 75%, 70% 90%, 40% 95%, 0% 80%)', transformOrigin: 'left center', animation: 'v6-wing-r 1.6s ease-in-out infinite', zIndex: -1 }} />
                </>}

                {/* God halo */}
                {isGod && !godCelebration && <div style={{ position: 'absolute', top: '-6px', left: '50%', width: '24px', height: '8px', borderRadius: '50%', border: '2px solid #FDE68A70', boxShadow: '0 0 10px #D4AF3750', animation: 'v6-halo 4.5s linear infinite', zIndex: 22, transform: 'translateX(-50%)' }} />}

                {/* God aura */}
                {isGod && !reaction && <>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '58px', height: '58px', borderRadius: '50%', border: '2px solid #D4AF3730', animation: 'runner-god-aura 2s ease-in-out infinite', pointerEvents: 'none', zIndex: -1 }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #D4AF3718', animation: 'runner-god-aura 3s ease-in-out 0.7s infinite', pointerEvents: 'none', zIndex: -1 }} />
                </>}
                {isGod && [0, 1, 2, 3, 4].map(i => <div key={`orb-${i}`} style={{ position: 'absolute', top: '50%', left: '50%', width: '5px', height: '5px', background: ['#FDE68A', '#A78BFA', '#10B981', '#FDE68A', '#F472B6'][i], borderRadius: i % 2 === 0 ? '1px' : '50%', transform: 'rotate(45deg)', animation: `runner-god-orbit ${1.5 + i * 0.3}s linear infinite`, animationDelay: `${i * 0.35}s`, zIndex: 21 }} />)}

                {/* +XP */}
                {reaction && <div key={reaction.key} style={{ position: 'absolute', top: '-52px', left: '50%', fontSize: reaction.points >= 15 ? '20px' : reaction.points >= 9 ? '17px' : '14px', fontWeight: '900', color: reaction.ringColor, whiteSpace: 'nowrap', animation: `v6-xp ${reaction.dur}ms ease-out forwards`, textShadow: `0 0 16px ${reaction.ringColor}80, 0 2px 6px rgba(0,0,0,0.6)`, zIndex: 24, pointerEvents: 'none' }}>+{reaction.points}{reaction.label && <span style={{ fontSize: '10px', marginLeft: '3px', letterSpacing: '1px', opacity: 0.9 }}>{reaction.label}</span>}</div>}
                {reaction && reaction.energy > 0 && Array.from({ length: reaction.energy }).map((_, i) => { const a = (i / reaction.energy) * 360; const d = 28 + (i % 3) * 14; const sx = Math.cos(a * Math.PI / 180) * d; const sy = Math.sin(a * Math.PI / 180) * d; return <div key={`${reaction.key}-e${i}`} style={{ position: 'absolute', top: `calc(50% + ${sy}px)`, left: `calc(50% + ${sx}px)`, width: reaction.points >= 10 ? '6px' : '4px', height: reaction.points >= 10 ? '6px' : '4px', borderRadius: '50%', background: `radial-gradient(circle, #fff, ${reaction.ringColor})`, boxShadow: `0 0 6px ${reaction.ringColor}`, '--ex': `${-sx}px`, '--ey': `${-sy}px`, animation: `runner-energy-in ${reaction.dur * 0.6}ms ease-in forwards`, animationDelay: `${i * 20 + 60}ms`, pointerEvents: 'none', zIndex: 21 } as React.CSSProperties} />; })}
                {reaction && reaction.rings > 0 && Array.from({ length: reaction.rings }).map((_, ri) => <div key={`${reaction.key}-r${ri}`} style={{ position: 'absolute', top: '50%', left: '50%', width: `${28 - ri * 5}px`, height: `${28 - ri * 5}px`, borderRadius: '50%', border: `${2.5 - ri * 0.5}px solid ${reaction.ringColor}${ri === 0 ? '' : '80'}`, animation: `runner-aura-ring ${reaction.dur * 0.5}ms ease-out forwards`, animationDelay: `${reaction.dur * (0.25 + ri * 0.1)}ms`, pointerEvents: 'none', zIndex: 19 }} />)}

                {/* Dust — minimal */}
                {isRunning && !isGod && !reaction && wr >= 0.15 && [0, 1].map(i => <div key={`dk-${i}`} style={{ position: 'absolute', bottom: `${i * 3}px`, left: `${-4 - i * 4}px`, width: '2.5px', height: '2.5px', borderRadius: '50%', background: '#A8A29E', opacity: 0.18, '--ddx': `${-6 - i * 3}px`, '--ddy': `${-2 - i * 2}px`, animation: `v6-dust ${0.35 + i * 0.08}s ease-out infinite`, animationDelay: `${i * 0.08}s` } as React.CSSProperties} />)}

                {/* SVG Cute Chibi Character */}
                <svg width="40" height="48" viewBox="0 0 40 48" style={{ display: 'block', overflow: 'visible' }}>
                    {/* Tail (behind body) */}
                    <path d={isRunning ? "M8,34 Q-2,28 2,22 Q4,20 6,22" : "M8,34 Q0,30 4,24 Q5,22 7,24"} fill="none" stroke={isGod ? '#D4AF37' : '#F5C77E'} strokeWidth="3" strokeLinecap="round" style={{ transformOrigin: '8px 34px', animation: isRunning ? `chibi-tail-wag 0.4s ease-in-out infinite` : 'chibi-tail-idle 2s ease-in-out infinite' }} />

                    {/* Body — round, soft */}
                    <ellipse cx="20" cy="36" rx="10" ry="8" fill={isGod ? '#FDE68A' : '#FFE4B5'} stroke={isGod ? '#D4AF37' : '#E8C890'} strokeWidth="0.8" />
                    {/* Belly patch */}
                    <ellipse cx="20" cy="38" rx="6" ry="5" fill={isGod ? '#FFF8DC' : '#FFF5E6'} />

                    {/* Legs — tiny stubs */}
                    <g style={{ transformOrigin: '14px 42px', animation: isRunning && !reaction ? `chibi-leg-l ${ws}s ease-in-out infinite` : 'none' }}>
                        <ellipse cx="14" cy="44" rx="4" ry="3" fill={isGod ? '#D4AF37' : '#F5C77E'} />
                    </g>
                    <g style={{ transformOrigin: '26px 42px', animation: isRunning && !reaction ? `chibi-leg-r ${ws}s ease-in-out infinite` : 'none' }}>
                        <ellipse cx="26" cy="44" rx="4" ry="3" fill={isGod ? '#D4AF37' : '#F5C77E'} />
                    </g>

                    {/* Head — BIG round */}
                    <circle cx="20" cy="18" r="15" fill={isGod ? '#FDE68A' : '#FFE4B5'} stroke={isGod ? '#D4AF37' : '#E8C890'} strokeWidth="0.8" />
                    {/* Inner ear color */}
                    <ellipse cx="9" cy="5" rx="3" ry="2.5" fill="#FFB5B5" opacity="0.5" transform="rotate(-15 9 5)" />
                    <ellipse cx="31" cy="5" rx="3" ry="2.5" fill="#FFB5B5" opacity="0.5" transform="rotate(15 31 5)" />
                    {/* Ears — pointy cat ears */}
                    <path d="M5,12 L3,0 L14,8Z" fill={isGod ? '#FDE68A' : '#FFE4B5'} stroke={isGod ? '#D4AF37' : '#E8C890'} strokeWidth="0.8" strokeLinejoin="round" />
                    <path d="M35,12 L37,0 L26,8Z" fill={isGod ? '#FDE68A' : '#FFE4B5'} stroke={isGod ? '#D4AF37' : '#E8C890'} strokeWidth="0.8" strokeLinejoin="round" />

                    {/* Face */}
                    {/* Eyes — big sparkly */}
                    {reaction && reaction.points >= 6 ? (<>
                        {/* Happy squint eyes */}
                        <path d="M10,17 Q14,13 18,17" fill="none" stroke="#3B2F1A" strokeWidth="2" strokeLinecap="round" />
                        <path d="M22,17 Q26,13 30,17" fill="none" stroke="#3B2F1A" strokeWidth="2" strokeLinecap="round" />
                    </>) : (<>
                        {/* Normal big cute eyes */}
                        <ellipse cx="13" cy="18" rx="4" ry="4.5" fill="#fff" stroke="#C4A882" strokeWidth="0.4" />
                        <ellipse cx="14" cy="19" rx="2.5" ry="3" fill={isGod ? '#D4AF37' : '#5B3E1A'} />
                        <circle cx="12" cy="16.5" r="1.5" fill="#fff" opacity="0.9" />
                        <circle cx="15" cy="18" r="0.7" fill="#fff" opacity="0.6" />
                        <ellipse cx="27" cy="18" rx="4" ry="4.5" fill="#fff" stroke="#C4A882" strokeWidth="0.4" />
                        <ellipse cx="28" cy="19" rx="2.5" ry="3" fill={isGod ? '#D4AF37' : '#5B3E1A'} />
                        <circle cx="26" cy="16.5" r="1.5" fill="#fff" opacity="0.9" />
                        <circle cx="29" cy="18" r="0.7" fill="#fff" opacity="0.6" />
                    </>)}

                    {/* Blush — always visible, cute */}
                    <ellipse cx="9" cy="22" rx="3" ry="1.5" fill="#FFB5B5" opacity={reaction ? 0.6 : 0.35} />
                    <ellipse cx="31" cy="22" rx="3" ry="1.5" fill="#FFB5B5" opacity={reaction ? 0.6 : 0.35} />

                    {/* Nose — tiny pink triangle */}
                    <ellipse cx="20" cy="22" rx="1.2" ry="0.8" fill="#FFB0A0" />

                    {/* Mouth */}
                    {(isGod || (reaction && reaction.points >= 3))
                        ? <path d="M16,25 Q20,29 24,25" fill="none" stroke="#C07060" strokeWidth="1.2" strokeLinecap="round" />
                        : <>
                            <path d="M17,25 Q20,27 23,25" fill="none" stroke="#C08070" strokeWidth="0.8" strokeLinecap="round" />
                        </>
                    }

                    {/* Whiskers */}
                    <line x1="1" y1="20" x2="8" y2="21" stroke="#D4C4A0" strokeWidth="0.5" opacity="0.4" />
                    <line x1="1" y1="23" x2="8" y2="23" stroke="#D4C4A0" strokeWidth="0.5" opacity="0.4" />
                    <line x1="32" y1="21" x2="39" y2="20" stroke="#D4C4A0" strokeWidth="0.5" opacity="0.4" />
                    <line x1="32" y1="23" x2="39" y2="23" stroke="#D4C4A0" strokeWidth="0.5" opacity="0.4" />

                    {/* Scarf / accessory */}
                    <path d="M10,28 Q20,32 30,28 Q32,30 28,31 Q20,34 12,31 Q8,30 10,28Z" fill={isGod ? '#D4AF37' : cc} opacity="0.85" />
                </svg>
            </div>

            {/* === AMBIENT CREATURES — butterflies, bird, bunny === */}
            {!battleActive && <>
                {/* Butterflies */}
                {[
                    { x: 15, y: 25, c1: '#F472B6', c2: '#FBCFE8', d: 6, s: 4 },
                    { x: 55, y: 35, c1: '#A78BFA', c2: '#DDD6FE', d: 8, s: 5 },
                    { x: 80, y: 20, c1: '#FBBF24', c2: '#FDE68A', d: 7, s: 6 },
                ].map((b, i) => (
                    <div key={`bf-${i}`} style={{
                        position: 'absolute', top: `${b.y}%`, left: `${b.x}%`,
                        zIndex: 16, pointerEvents: 'none',
                        animation: `butterfly-float ${b.d}s ease-in-out ${i * 1.5}s infinite alternate`,
                    }}>
                        {/* Left wing */}
                        <div style={{
                            position: 'absolute', left: '-4px', top: '0',
                            width: `${b.s}px`, height: `${b.s + 1}px`, borderRadius: '50% 50% 30% 50%',
                            background: b.c1, boxShadow: `0 0 4px ${b.c1}60`,
                            transformOrigin: 'right center',
                            animation: `butterfly-wing 0.3s ease-in-out ${i * 0.1}s infinite`,
                        }} />
                        {/* Right wing */}
                        <div style={{
                            position: 'absolute', left: '2px', top: '0',
                            width: `${b.s}px`, height: `${b.s + 1}px`, borderRadius: '50% 50% 50% 30%',
                            background: b.c2, boxShadow: `0 0 4px ${b.c2}60`,
                            transformOrigin: 'left center',
                            animation: `butterfly-wing 0.3s ease-in-out ${i * 0.1 + 0.15}s infinite`,
                        }} />
                        {/* Body */}
                        <div style={{ position: 'absolute', left: '1px', top: '1px', width: '1.5px', height: `${b.s - 1}px`, background: '#6B5B3A', borderRadius: '1px' }} />
                    </div>
                ))}

                {/* Bird flying across */}
                <svg width="16" height="10" viewBox="0 0 16 10" style={{
                    position: 'absolute', top: '12%', right: '-20px',
                    zIndex: 16, pointerEvents: 'none',
                    animation: 'bird-fly 18s linear infinite',
                }}>
                    <path d="M0,5 Q4,0 8,5 Q12,0 16,5" fill="none" stroke="#57534E" strokeWidth="1.2" strokeLinecap="round" style={{ animation: 'bird-wing 0.5s ease-in-out infinite' }} />
                </svg>
                <svg width="12" height="8" viewBox="0 0 16 10" style={{
                    position: 'absolute', top: '18%', right: '-60px',
                    zIndex: 16, pointerEvents: 'none', opacity: 0.6,
                    animation: 'bird-fly 22s linear 3s infinite',
                }}>
                    <path d="M0,5 Q4,0 8,5 Q12,0 16,5" fill="none" stroke="#78716C" strokeWidth="1.2" strokeLinecap="round" style={{ animation: 'bird-wing 0.4s ease-in-out infinite' }} />
                </svg>

                {/* Little bunny on the ground */}
                <div style={{
                    position: 'absolute', bottom: `${GH}px`, left: '72%',
                    zIndex: 12, pointerEvents: 'none',
                    animation: 'bunny-hop 2s ease-in-out infinite',
                }}>
                    <svg width="12" height="16" viewBox="0 0 12 16">
                        {/* Ears */}
                        <ellipse cx="4" cy="3" rx="1.5" ry="4" fill="#E8D8C8" stroke="#D4C4B0" strokeWidth="0.3" />
                        <ellipse cx="4" cy="3" rx="0.8" ry="2.5" fill="#FFD0D0" opacity="0.5" />
                        <ellipse cx="8" cy="3" rx="1.5" ry="4" fill="#E8D8C8" stroke="#D4C4B0" strokeWidth="0.3" />
                        <ellipse cx="8" cy="3" rx="0.8" ry="2.5" fill="#FFD0D0" opacity="0.5" />
                        {/* Head */}
                        <circle cx="6" cy="8" r="4" fill="#F5F0E8" stroke="#D4C4B0" strokeWidth="0.3" />
                        {/* Eyes */}
                        <circle cx="4.5" cy="7.5" r="0.8" fill="#3B2F1A" />
                        <circle cx="4.2" cy="7.2" r="0.3" fill="#fff" />
                        <circle cx="7.5" cy="7.5" r="0.8" fill="#3B2F1A" />
                        <circle cx="7.2" cy="7.2" r="0.3" fill="#fff" />
                        {/* Nose */}
                        <ellipse cx="6" cy="9" rx="0.6" ry="0.4" fill="#FFB0A0" />
                        {/* Body */}
                        <ellipse cx="6" cy="13" rx="3.5" ry="3" fill="#F5F0E8" stroke="#D4C4B0" strokeWidth="0.3" />
                        {/* Tail */}
                        <circle cx="9" cy="13" r="1.5" fill="#fff" />
                    </svg>
                </div>
            </>}

            {/* === PER-CARD SLOT OVERLAY — TIER-DIFFERENTIATED === */}
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
                // Reel size scales with tier
                const reelSize = tierPow >= 5 ? 72 : tierPow >= 4 ? 64 : tierPow >= 3 ? 56 : tierPow >= 2 ? 48 : 40;
                const reelFont = tierPow >= 5 ? 44 : tierPow >= 4 ? 38 : tierPow >= 3 ? 32 : tierPow >= 2 ? 26 : 22;
                // === MISS: minimal — tiny x at bottom, no overlay, no reels ===
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

                // === BONUS+: overlay background darkness scales with tier ===
                const overlayOpacity = tierPow >= 5 ? 0.75 : tierPow >= 4 ? 0.65 : tierPow >= 3 ? 0.5 : tierPow >= 2 ? 0.4 : 0.25;
                // LEGENDARY+ = gold tint, MEGA = element tint, others = neutral dark
                const overlayBg = tierPow >= 5
                    ? `radial-gradient(circle at 50% 50%, ${tc}40 0%, rgba(0,0,0,${overlayOpacity}) 70%)`
                    : tierPow >= 4
                    ? `radial-gradient(circle at 50% 50%, ${ec}30 0%, rgba(0,0,0,${overlayOpacity}) 70%)`
                    : `rgba(0,0,0,${overlayOpacity})`;

                return (<>
                    {/* Overlay — tier-scaled darkness + color */}
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none',
                        background: (isAttack || isImpact) && tierPow >= 4
                            ? `radial-gradient(circle at 50% 50%, ${tc}60 0%, rgba(0,0,0,0.8) 60%)`
                            : isReaching ? `rgba(0,0,0,${overlayOpacity + 0.15})`
                            : overlayBg,
                        transition: 'background 0.2s ease',
                    }} />

                    {/* REACH — border pulse. MEGA+: thick red + screen flash. Others: subtle */}
                    {isReaching && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 31, pointerEvents: 'none',
                            border: `${tierPow >= 4 ? '4px' : '2px'} solid ${tierPow >= 4 ? '#EF4444' : '#D4AF37'}`,
                            boxShadow: tierPow >= 4
                                ? 'inset 0 0 40px rgba(239,68,68,0.5), 0 0 30px rgba(239,68,68,0.4)'
                                : 'inset 0 0 15px rgba(212,175,55,0.2)',
                            animation: `dq-aura-pulse ${tierPow >= 4 ? '0.25' : '0.5'}s ease-in-out infinite`,
                        }} />
                    )}

                    {/* 確変 badge */}
                    {kakuhenBoost > 0 && (
                        <div style={{
                            position: 'absolute', top: '3px', right: '8px', zIndex: 33, pointerEvents: 'none',
                            fontSize: '9px', fontWeight: '900', color: '#DC2626',
                            background: 'rgba(220,38,38,0.15)', border: '1px solid #DC262660',
                            borderRadius: '4px', padding: '1px 6px',
                            textShadow: '0 0 6px rgba(220,38,38,0.6)',
                            animation: 'dq-aura-pulse 0.5s ease-in-out infinite',
                        }}>確変 x{kakuhenBoost}</div>
                    )}

                    {/* Card name — shown for GREAT+ only (BONUS too fast to need it) */}
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

                    {/* SLOT REELS — size scales dramatically with tier */}
                    {(isSpinning || cardSlotPhase === 'stop1' || cardSlotPhase === 'stop2' || isReaching || cardSlotPhase === 'stop3' || isResult) && (
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
                                // LEGENDARY+: gold border. MEGA: red border on reach. Others: default
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
                            {/* REACH text — size/style varies by tier */}
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
                            {/* Tier result label */}
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

                    {/* ATTACK + IMPACT — completely different per tier */}
                    {(isAttack || isImpact) && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 34, pointerEvents: 'none',
                            overflow: 'hidden',
                            animation: isImpact && tierPow >= 3 ? `dq-screen-shake ${tierPow >= 5 ? '500' : '300'}ms ease-out` : undefined,
                        }}>
                            {/* BONUS: small element flash */}
                            {isAttack && tierPow <= 1 && (
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: `radial-gradient(circle at 50% 60%, ${ec}30 0%, transparent 50%)`,
                                    animation: 'dq-spell-burst 300ms ease-out forwards',
                                }} />
                            )}
                            {/* GREAT: element tint across runner */}
                            {isAttack && tierPow === 2 && (
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: `linear-gradient(180deg, transparent 20%, ${ec}25 50%, transparent 80%)`,
                                    animation: 'dq-spell-burst 400ms ease-out forwards',
                                }} />
                            )}
                            {/* SUPER: full element burst + X slash */}
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
                            {/* MEGA: full screen element explosion + 4-way slash + screen crack */}
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
                            {/* LEGENDARY: GOLD EXPLOSION — entire screen goes gold */}
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
                            {/* MYTHIC: WHITE VOID → PINK GOD ENERGY */}
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

                            {/* Damage number — size is RADICALLY different per tier */}
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
                            {/* Tier kanji under damage — only SUPER+ */}
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
                            {/* Screen crack — MEGA+ */}
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
                            {/* LEGENDARY: gold flash */}
                            {isImpact && tierPow === 5 && (
                                <div style={{
                                    position: 'absolute', inset: 0, background: '#D4AF37',
                                    animation: 'dq-whiteout 500ms ease-out forwards',
                                }} />
                            )}
                            {/* MYTHIC: pink → white → fade */}
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

            {/* === PROGRESS === */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: `${progress * 100}%`, height: '3px', background: isGod ? 'linear-gradient(90deg, #4A3A08, #8B6914, #D4AF37, #FDE68A, #D4AF37)' : `linear-gradient(90deg, ${cc}22, ${cc}55, ${cc}99, ${cc})`, transition: 'width 0.8s ease', zIndex: 14, boxShadow: progress > 0.3 ? `0 0 10px ${cc}28` : 'none' }} />

            {/* === 確変 PERSISTENT BADGE === */}
            {kakuhenBoost > 0 && cardSlotPhase === 'idle' && !battleActive && (
                <div style={{
                    position: 'absolute', top: '6px', left: '10px', zIndex: 24,
                    fontSize: '10px', fontWeight: '900', color: '#DC2626',
                    background: 'rgba(220,38,38,0.1)', border: '1px solid #DC262650',
                    borderRadius: '6px', padding: '2px 8px',
                    boxShadow: '0 0 12px rgba(220,38,38,0.2)',
                    animation: 'dq-aura-pulse 1s ease-in-out infinite',
                }}>
                    確変中 残{kakuhenBoost}回
                </div>
            )}

            {/* === SCORE === */}
            <div style={{ position: 'absolute', top: '6px', right: '10px', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 24 }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: dailyTitle.color, background: isGod ? 'rgba(6,16,32,0.92)' : 'rgba(255,255,255,0.94)', padding: '3px 10px', borderRadius: '7px', border: `1px solid ${dailyTitle.color}25`, backdropFilter: 'blur(12px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>{dailyTitle.title}</div>
                <div style={{ fontSize: '11px', fontWeight: '700', color: isGod ? '#FDE68A' : '#1C1917', background: isGod ? 'rgba(6,16,32,0.92)' : 'rgba(255,255,255,0.94)', padding: '3px 10px', borderRadius: '7px', backdropFilter: 'blur(12px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>{todayXP} / {goalXP}</div>
                <button
                    onClick={() => setShowGoalSetting(!showGoalSetting)}
                    style={{
                        width: '20px', height: '20px', borderRadius: '50%', border: 'none',
                        background: isGod ? 'rgba(6,16,32,0.92)' : 'rgba(255,255,255,0.94)',
                        color: isGod ? '#FDE68A' : '#78716C',
                        fontSize: '10px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(12px)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    title="Daily goal setting"
                >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                </button>
            </div>

            {/* Goal setting popover */}
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

            {/* ═══════ ULTIMATE DQ BATTLE SCREEN ═══════ */}
            {/* Screen wipe IN */}
            {battleWipeIn && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none', overflow: 'hidden' }}>
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={`wipe-in-${i}`} style={{
                            position: 'absolute', left: 0, width: '100%',
                            top: `${i * 12.5}%`, height: '12.5%',
                            background: '#000',
                            transformOrigin: i % 2 === 0 ? 'left' : 'right',
                            animation: `dq-wipe-in 400ms ease-in-out ${i * 50}ms forwards`,
                        }} />
                    ))}
                </div>
            )}
            {/* Screen wipe OUT */}
            {battleWipeOut && (
                <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none', overflow: 'hidden' }}>
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={`wipe-out-${i}`} style={{
                            position: 'absolute', left: 0, width: '100%',
                            top: `${i * 12.5}%`, height: '12.5%',
                            background: '#000',
                            transformOrigin: i % 2 === 0 ? 'right' : 'left',
                            animation: `dq-wipe-out 400ms ease-in-out ${i * 50}ms forwards`,
                        }} />
                    ))}
                </div>
            )}

            {battleActive && battleData && (() => {
                const ec = ELEM_COLOR[battleData.bossElement] || '#78716C';
                const hpRatio = battleBossHpLeft / battleData.bossHp;
                return (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 50,
                    background: `linear-gradient(180deg, #0a0a1a 0%, ${ec}${battleCombo > 5 ? '30' : '15'} 20%, #0c1628 50%, ${hpRatio < 0.3 ? '#2a0a0a' : '#1a2a1a'} 80%, #2a3a2a 100%)`,
                    animation: battleShake ? 'dq-screen-shake 200ms ease-out' : undefined,
                    overflow: 'hidden',
                    boxShadow: battleCombo > 3
                        ? `inset 0 0 ${8 + battleCombo * 3}px ${ec}${Math.min(80, 20 + battleCombo * 8).toString(16)}`
                        : undefined,
                    transition: 'background 0.5s ease, box-shadow 0.3s ease, transform 0.1s ease-out, filter 0.1s ease',
                    transform: battleZoom ? 'scale(1.06)' : 'scale(1)',
                    filter: battleInvert ? 'invert(1)' : undefined,
                }}>
                    {/* Screen edge glow — intensifies with combo */}
                    {battleCombo > 2 && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 49, pointerEvents: 'none',
                            border: `2px solid ${ec}${Math.min(60, battleCombo * 8).toString(16).padStart(2, '0')}`,
                            borderRadius: '2px',
                            boxShadow: `inset 0 0 ${battleCombo * 4}px ${ec}30`,
                            transition: 'all 0.3s ease',
                        }} />
                    )}

                    {/* Whiteout flash — finisher impact */}
                    {battleWhiteout && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 99, pointerEvents: 'none',
                            background: '#fff',
                            animation: 'dq-whiteout 300ms ease-out forwards',
                        }} />
                    )}

                    {/* Screen cracks — accumulate on crits */}
                    {battleCrack && (
                        <svg style={{ position: 'absolute', inset: 0, zIndex: 98, pointerEvents: 'none', width: '100%', height: '100%' }}
                            viewBox="0 0 200 200" preserveAspectRatio="none">
                            <path d="M100,0 L95,40 L80,55 L60,80 L65,120 L50,160 L55,200" stroke="#fff" strokeWidth="1.5" fill="none" opacity="0.6" />
                            <path d="M100,0 L105,35 L120,60 L140,75 L130,110 L145,145 L150,200" stroke="#fff" strokeWidth="1" fill="none" opacity="0.4" />
                            <path d="M0,100 L35,95 L55,80 L80,85 L95,40" stroke="#fff" strokeWidth="1" fill="none" opacity="0.5" />
                            <path d="M200,100 L170,105 L145,90 L120,60" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.3" />
                            <path d="M80,55 L50,50 L20,65" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.35" />
                            <path d="M140,75 L160,55 L185,40" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.3" />
                        </svg>
                    )}

                    {/* Atmospheric particles */}
                    {Array.from({ length: 30 }, (_, i) => (
                        <div key={`atm-${i}`} style={{
                            position: 'absolute',
                            top: `${(i * 13 + 5) % 90}%`, left: `${(i * 19 + 3) % 95}%`,
                            width: `${1 + i % 3}px`, height: `${1 + i % 3}px`,
                            background: i % 4 === 0 ? ec : '#fff',
                            borderRadius: '50%',
                            opacity: 0.08 + (i % 6) * 0.04,
                            animation: `v6-star ${1.5 + (i % 5) * 0.7}s ease-in-out ${i * 0.15}s infinite`,
                        }} />
                    ))}

                    {/* ═══ BATTLE POWER GAUGE — arc meter (NOT slot reels) ═══ */}
                    {battleSlotPhase !== 'idle' && (() => {
                        const tierColor: Record<string, string> = { MYTHIC: '#EC4899', LEGENDARY: '#D4AF37', MEGA: '#EF4444', SUPER: '#3B82F6', GREAT: '#FBBF24', BONUS: '#7C3AED', MISS: '#78716C' };
                        const isResult = battleSlotPhase === 'result';
                        const isReaching = battleSlotPhase === 'reach';
                        const tierC = tierColor[battleSlotTier] || '#78716C';
                        const tierPow = { MYTHIC: 6, LEGENDARY: 5, MEGA: 4, SUPER: 3, GREAT: 2, BONUS: 1, MISS: 0 }[battleSlotTier] || 0;
                        // Power gauge fills based on tier — arc from 0 to 180 degrees
                        const gaugeAngle = isResult ? tierPow * 30 : 0; // 0-180
                        const spinning = battleSlotPhase === 'spin' || battleSlotPhase === 'stop1' || battleSlotPhase === 'stop2';
                        // Arc path for SVG
                        const r = 28; const cx = 35; const cy = 35;
                        const startAngle = -180; const endAngle = startAngle + (spinning ? 0 : gaugeAngle);
                        const rad = (a: number) => (a * Math.PI) / 180;
                        const x1 = cx + r * Math.cos(rad(startAngle)); const y1 = cy + r * Math.sin(rad(startAngle));
                        const x2 = cx + r * Math.cos(rad(endAngle)); const y2 = cy + r * Math.sin(rad(endAngle));
                        const largeArc = gaugeAngle > 180 ? 1 : 0;
                        return (
                            <div style={{
                                position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
                                zIndex: 57, pointerEvents: 'none', width: '70px', height: '50px',
                            }}>
                                {/* Spinning indicator */}
                                {spinning && (
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                        width: '56px', height: '56px', borderRadius: '50%',
                                        border: '3px solid transparent', borderTopColor: '#D4AF37', borderRightColor: '#D4AF3760',
                                        animation: 'dq-spin-fast 0.4s linear infinite',
                                    }} />
                                )}
                                {/* Arc gauge on result */}
                                {isResult && gaugeAngle > 0 && (
                                    <svg width="70" height="50" viewBox="0 0 70 50" style={{ position: 'absolute', top: 0, left: 0 }}>
                                        {/* Background arc */}
                                        <path d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                                            fill="none" stroke="#78716C30" strokeWidth="5" strokeLinecap="round" />
                                        {/* Filled arc */}
                                        <path d={`M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`}
                                            fill="none" stroke={tierC} strokeWidth="5" strokeLinecap="round"
                                            style={{ filter: `drop-shadow(0 0 8px ${tierC})` }}>
                                            <animate attributeName="stroke-dasharray" from="0 200" to="200 200" dur="0.3s" fill="freeze" />
                                        </path>
                                    </svg>
                                )}
                                {/* Center text — tier kanji */}
                                {isResult && battleSlotTier !== 'MISS' && (
                                    <div style={{
                                        position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
                                        fontSize: tierPow >= 4 ? '20px' : '15px',
                                        fontWeight: '900', color: tierC,
                                        textShadow: `0 0 12px ${tierC}, 0 0 24px ${tierC}80`,
                                        animation: 'dq-text-appear 200ms ease-out',
                                    }}>
                                        {TIER_JA[battleSlotTier] || ''}
                                    </div>
                                )}
                                {/* REACH — pulsing ring */}
                                {isReaching && (
                                    <>
                                        <div style={{
                                            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                            width: '60px', height: '60px', borderRadius: '50%',
                                            border: '3px solid #EF4444',
                                            boxShadow: '0 0 16px rgba(239,68,68,0.7), inset 0 0 12px rgba(239,68,68,0.3)',
                                            animation: 'dq-aura-pulse 0.3s ease-in-out infinite',
                                        }} />
                                        <div style={{
                                            position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)',
                                            fontSize: '11px', fontWeight: '900', color: '#EF4444',
                                            textShadow: '0 0 8px rgba(239,68,68,0.8)',
                                            letterSpacing: '3px',
                                            animation: 'dq-aura-pulse 0.3s ease-in-out infinite',
                                        }}>CHARGE</div>
                                    </>
                                )}
                            </div>
                        );
                    })()}

                    {/* Ground plane with grid lines */}
                    <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '25%',
                        background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.4))',
                        overflow: 'hidden',
                    }}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <div key={`grid-${i}`} style={{
                                position: 'absolute', bottom: `${i * 20}%`, left: 0, right: 0,
                                height: '1px', background: `${ec}20`,
                            }} />
                        ))}
                    </div>

                    {/* Boss sprite — massive, centered */}
                    <div style={{
                        position: 'absolute', top: '12%', left: '50%',
                        animation: battleBossHit ? 'dq-boss-hit 300ms ease-out'
                            : battleDefeated ? 'dq-boss-death 1.5s ease-out forwards'
                            : battleBossIntro ? 'dq-boss-entrance 800ms ease-out forwards'
                            : 'dq-boss-breathe 3s ease-in-out infinite',
                    }}>
                        {/* Aura glow behind boss */}
                        <div style={{
                            position: 'absolute', top: '50%', left: '50%',
                            width: '120px', height: '120px',
                            transform: 'translate(-50%, -50%)',
                            background: `radial-gradient(circle, ${ec}40 0%, ${ec}10 40%, transparent 70%)`,
                            animation: 'dq-aura-pulse 2s ease-in-out infinite',
                            pointerEvents: 'none',
                        }} />

                        {/* Orbiting element particles */}
                        {Array.from({ length: 6 }, (_, i) => (
                            <div key={`orb-${i}`} style={{
                                position: 'absolute', top: '50%', left: '50%',
                                width: '4px', height: '4px', borderRadius: '50%',
                                background: ec, opacity: 0.6,
                                '--orb-r': `${38 + i * 4}px`,
                                animation: `dq-orb-orbit ${3 + i * 0.5}s linear ${i * 0.5}s infinite`,
                                pointerEvents: 'none',
                            } as React.CSSProperties} />
                        ))}

                        <svg width="86" height="86" viewBox="0 0 28 28" style={{
                            display: 'block',
                            filter: `drop-shadow(0 4px 20px ${hpRatio < 0.3 ? '#EF444460' : ec + '60'}) ${battleBossHit ? 'brightness(2.5) saturate(0.3)' : ''}`,
                            transition: 'filter 0.3s ease',
                        }}>
                            {/* Shadow */}
                            <ellipse cx="14" cy="27" rx="10" ry="1.5" fill="rgba(0,0,0,0.3)" />
                            {/* Tiny bat wings — flutter when angry */}
                            <path d={hpRatio < 0.5 ? 'M3,10 Q-2,4 1,2 Q3,4 4,6 Q2,5 1,7Z' : 'M4,11 Q0,6 2,4 Q4,5 5,8Z'} fill={ec} opacity="0.6" />
                            <path d={hpRatio < 0.5 ? 'M25,10 Q30,4 27,2 Q25,4 24,6 Q26,5 27,7Z' : 'M24,11 Q28,6 26,4 Q24,5 23,8Z'} fill={ec} opacity="0.6" />
                            {/* Round cat ears */}
                            <ellipse cx="7" cy="5" rx="3.5" ry="4" fill={ec} />
                            <ellipse cx="7" cy="5" rx="2" ry="2.5" fill="#FDA4AF" opacity="0.4" />
                            <ellipse cx="21" cy="5" rx="3.5" ry="4" fill={ec} />
                            <ellipse cx="21" cy="5" rx="2" ry="2.5" fill="#FDA4AF" opacity="0.4" />
                            {/* Tiny crown between ears */}
                            <path d="M10,3 L11,0 L12.5,2.5 L14,0 L15.5,2.5 L17,0 L18,3Z" fill="#FBBF24" stroke="#F59E0B" strokeWidth="0.2" />
                            {/* Big round head */}
                            <circle cx="14" cy="13" r="9" fill={ec} />
                            {/* Lighter face area */}
                            <ellipse cx="14" cy="14.5" rx="6.5" ry="5.5" fill={`${ec}40`} />
                            {/* Big sparkly eyes — change expression with HP */}
                            <ellipse cx="10" cy="12" rx="3" ry={hpRatio < 0.3 ? 2.5 : 3.2} fill="#fff" />
                            <circle cx={hpRatio < 0.3 ? 10.5 : 10.3} cy={hpRatio < 0.3 ? 12.5 : 12.2} r={hpRatio < 0.3 ? 2 : 1.8} fill={hpRatio < 0.3 ? '#EF4444' : '#1a1a2e'} />
                            <circle cx="10.8" cy="11.2" r={hpRatio < 0.3 ? 0.3 : 0.7} fill="#fff" />
                            <circle cx="10" cy="11.8" r={hpRatio < 0.3 ? 0 : 0.35} fill="#fff" />
                            <ellipse cx="18" cy="12" rx="3" ry={hpRatio < 0.3 ? 2.5 : 3.2} fill="#fff" />
                            <circle cx={hpRatio < 0.3 ? 18.5 : 18.3} cy={hpRatio < 0.3 ? 12.5 : 12.2} r={hpRatio < 0.3 ? 2 : 1.8} fill={hpRatio < 0.3 ? '#EF4444' : '#1a1a2e'} />
                            <circle cx="18.8" cy="11.2" r={hpRatio < 0.3 ? 0.3 : 0.7} fill="#fff" />
                            <circle cx="18" cy="11.8" r={hpRatio < 0.3 ? 0 : 0.35} fill="#fff" />
                            {/* Blush cheeks — fade when angry */}
                            <ellipse cx="6.5" cy="14.5" rx="2" ry="1.2" fill="#FDA4AF" opacity={hpRatio < 0.3 ? 0.2 : 0.5} />
                            <ellipse cx="21.5" cy="14.5" rx="2" ry="1.2" fill="#FDA4AF" opacity={hpRatio < 0.3 ? 0.2 : 0.5} />
                            {/* Nose */}
                            <ellipse cx="14" cy="15" rx="1" ry="0.7" fill={hpRatio < 0.3 ? '#DC2626' : '#1a1a2e'} />
                            {/* Mouth — changes with HP */}
                            {hpRatio >= 0.3 ? (
                                <path d="M11 17 Q14 19.5 17 17" fill="none" stroke="#1a1a2e" strokeWidth="0.7" strokeLinecap="round" />
                            ) : (
                                <>
                                    <path d="M10.5 17 Q14 15 17.5 17" fill="none" stroke="#1a1a2e" strokeWidth="0.8" strokeLinecap="round" />
                                    <path d="M11.5 17.5 L11.5 18.5" stroke="#1a1a2e" strokeWidth="0.4" />
                                    <path d="M16.5 17.5 L16.5 18.5" stroke="#1a1a2e" strokeWidth="0.4" />
                                </>
                            )}
                            {/* Whiskers */}
                            <line x1="4" y1="14" x2="8" y2="15" stroke={ec} strokeWidth="0.4" opacity="0.5" />
                            <line x1="4" y1="16" x2="8" y2="15.5" stroke={ec} strokeWidth="0.4" opacity="0.5" />
                            <line x1="24" y1="14" x2="20" y2="15" stroke={ec} strokeWidth="0.4" opacity="0.5" />
                            <line x1="24" y1="16" x2="20" y2="15.5" stroke={ec} strokeWidth="0.4" opacity="0.5" />
                            {/* Chubby body */}
                            <ellipse cx="14" cy="23" rx="7" ry="4.5" fill={ec} />
                            <ellipse cx="14" cy="23.5" rx="4.5" ry="3" fill={`${ec}50`} />
                            {/* Chest gem */}
                            <circle cx="14" cy="22" r="1.5" fill={hpRatio < 0.3 ? '#EF4444' : '#FBBF24'}>
                                {hpRatio < 0.3 && <animate attributeName="opacity" values="1;0.4;1" dur="0.6s" repeatCount="indefinite" />}
                            </circle>
                            {/* Tiny paws */}
                            <ellipse cx="9" cy="26.5" rx="2.5" ry="1.5" fill={ec} />
                            <ellipse cx="19" cy="26.5" rx="2.5" ry="1.5" fill={ec} />
                            {/* Devil tail */}
                            <path d="M21 22 Q25 18 26 20 Q25 22 24 20" fill="none" stroke={ec} strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M26 20 L27.5 18 L25.5 19Z" fill="#DC2626" />
                        </svg>

                        {/* Damage number popup */}
                        {battleDmgNum && (
                            <div key={`bdmg-${battleDmgNum.key}`} style={{
                                position: 'absolute', top: '-8px', left: '50%',
                                fontSize: battleDmgNum.val >= 400 ? '26px' : battleDmgNum.val >= 200 ? '20px' : '16px',
                                fontWeight: '900', color: battleCritical ? '#FDE68A' : '#fff',
                                whiteSpace: 'nowrap', fontFamily: 'serif',
                                animation: 'dq-damage-pop 800ms ease-out forwards',
                                textShadow: battleCritical
                                    ? '0 0 20px #D4AF37, 0 0 40px #FDE68A, 0 2px 6px rgba(0,0,0,0.9)'
                                    : '0 0 10px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.8)',
                                zIndex: 55, pointerEvents: 'none',
                            }}>{battleDmgNum.val}</div>
                        )}
                    </div>

                    {/* Multi-slash effects */}
                    {battleSlash && (
                        <>
                            {Array.from({ length: 3 }, (_, i) => (
                                <div key={`mslash-${i}`} style={{
                                    position: 'absolute', top: '8%', left: '20%', width: '60%', height: '60%',
                                    zIndex: 52, pointerEvents: 'none',
                                    '--slash-angle': `${-60 + i * 30}deg`,
                                    animation: `dq-multi-slash 250ms ease-out ${i * 80}ms forwards`,
                                } as React.CSSProperties}>
                                    <div style={{
                                        width: '100%', height: '3px',
                                        background: `linear-gradient(90deg, transparent, ${battleCritical ? '#FDE68A' : '#fff'}, transparent)`,
                                        position: 'absolute', top: '50%',
                                    }} />
                                </div>
                            ))}
                            {/* Impact sparks */}
                            {Array.from({ length: battleCritical ? 16 : 8 }, (_, i) => {
                                const sa = (i / (battleCritical ? 16 : 8)) * 360;
                                return <div key={`spark-${i}`} style={{
                                    position: 'absolute', top: '30%', left: '50%',
                                    width: '3px', height: '3px', borderRadius: '50%',
                                    background: battleCritical ? '#FDE68A' : '#fff',
                                    '--sx': `${Math.cos(sa * Math.PI / 180) * 25}px`,
                                    '--sy': `${Math.sin(sa * Math.PI / 180) * 25}px`,
                                    animation: `dq-spark 400ms ease-out ${i * 20}ms forwards`,
                                    zIndex: 52, pointerEvents: 'none',
                                } as React.CSSProperties} />;
                            })}
                            {/* Screen flash */}
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: 51, pointerEvents: 'none',
                                background: battleCritical ? '#FDE68A' : '#fff',
                                animation: 'dq-hit-flash 200ms ease-out forwards',
                            }} />
                        </>
                    )}

                    {/* Hero charge animation */}
                    {battleHeroAtk && (
                        <div style={{
                            position: 'absolute', bottom: '28%', left: '20%',
                            zIndex: 52, pointerEvents: 'none',
                            animation: 'dq-hero-charge 400ms ease-out forwards',
                        }}>
                            <svg width="28" height="32" viewBox="0 0 28 32">
                                {/* Mini chibi hero — matches the runner character */}
                                <ellipse cx="14" cy="10" rx="8" ry="7" fill="#FFE4B5" />
                                <ellipse cx="11" cy="9" rx="2" ry="2.2" fill="#fff" />
                                <circle cx="11.5" cy="9.5" r="1" fill="#1a1a2e" />
                                <circle cx="12" cy="8.8" r="0.4" fill="#fff" />
                                <ellipse cx="17" cy="9" rx="2" ry="2.2" fill="#fff" />
                                <circle cx="17.5" cy="9.5" r="1" fill="#1a1a2e" />
                                <circle cx="18" cy="8.8" r="0.4" fill="#fff" />
                                <path d="M13 12.5 Q14 13.5 15 12.5" fill="none" stroke="#1a1a2e" strokeWidth="0.5" strokeLinecap="round" />
                                <polygon points="8,5 9,1 12,4" fill="#F5C77E" />
                                <polygon points="20,5 19,1 16,4" fill="#F5C77E" />
                                <ellipse cx="14" cy="22" rx="7" ry="6" fill="#FFE4B5" />
                                <ellipse cx="14" cy="23" rx="4.5" ry="4" fill="#FFF5E6" />
                                <path d="M8,20 Q4,16 6,14" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    )}

                    {/* Word-by-word buildup — words appear one at a time */}
                    {battleWordBuild.length > 0 && (
                        <div style={{
                            position: 'absolute', bottom: '32%', left: '5%', right: '5%',
                            zIndex: 55, pointerEvents: 'none', textAlign: 'center',
                        }}>
                            {battleWordBuild.map((word, wi) => (
                                <span key={`wb-${wi}`} style={{
                                    display: 'inline-block',
                                    fontSize: wi === battleWordBuild.length - 1 && wi === battleWordIdx ? '18px' : '14px',
                                    fontWeight: '900',
                                    color: wi <= battleWordIdx ? '#FDE68A' : '#FDE68A20',
                                    fontFamily: 'serif',
                                    letterSpacing: '0.5px',
                                    margin: '0 3px',
                                    textShadow: wi <= battleWordIdx
                                        ? '0 0 10px #D4AF37, 0 0 20px #FDE68A60, 0 2px 4px rgba(0,0,0,0.9)'
                                        : 'none',
                                    transform: wi === battleWordIdx ? 'scale(1.2)' : 'scale(1)',
                                    transition: 'all 0.15s ease-out',
                                }}>
                                    {word}
                                </span>
                            ))}
                            {/* Energy buildup bar under words */}
                            <div style={{
                                marginTop: '6px', height: '3px', background: '#1a1a2e',
                                borderRadius: '2px', overflow: 'hidden',
                            }}>
                                <div style={{
                                    width: `${((battleWordIdx + 1) / battleWordBuild.length) * 100}%`,
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #D4AF37, #FDE68A)',
                                    transition: 'width 0.15s ease-out',
                                    boxShadow: '0 0 8px #D4AF37',
                                }} />
                            </div>
                        </div>
                    )}

                    {/* Phrase attack — full phrase launches at boss */}
                    {battlePhraseAtk && (
                        <div key={`patk-${battlePhraseAtk}`} style={{
                            position: 'absolute', bottom: '30%', left: '5%', right: '5%',
                            zIndex: 55, pointerEvents: 'none',
                            textAlign: 'center',
                            animation: 'dq-phrase-attack 400ms ease-in forwards',
                        }}>
                            <span style={{
                                fontSize: '18px', fontWeight: '900', color: '#FDE68A',
                                fontFamily: 'serif', letterSpacing: '1px',
                                textShadow: '0 0 16px #D4AF37, 0 0 32px #FDE68A80, 0 2px 8px rgba(0,0,0,0.9)',
                                display: 'inline-block', padding: '3px 10px',
                                background: 'rgba(0,0,0,0.4)', borderRadius: '4px',
                                border: '1px solid #D4AF3740',
                            }}>
                                {battlePhraseAtk}
                            </span>
                        </div>
                    )}

                    {/* Rank-based screen glow */}
                    {battleRankFx && (() => {
                        const rt: Record<string,string> = { S: '#D4AF37', A: '#A855F7', B: '#3B82F6' };
                        const c = rt[battleRankFx];
                        return c ? <div style={{
                            position: 'absolute', inset: 0, zIndex: 51, pointerEvents: 'none',
                            background: `radial-gradient(circle at 50% 50%, ${c}30 0%, transparent 70%)`,
                            animation: 'dq-aura-pulse 0.5s ease-out',
                        }} /> : null;
                    })()}

                    {/* RUSH mode — speed lines + pulsing indicator */}
                    {battleRush && (
                        <>
                            {/* Speed lines */}
                            {Array.from({ length: 12 }, (_, i) => (
                                <div key={`rush-${i}`} style={{
                                    position: 'absolute',
                                    top: `${5 + (i * 7.5)}%`,
                                    left: 0, right: 0, height: '1px',
                                    background: `linear-gradient(90deg, transparent 10%, #FDE68A${20 + i * 5 > 99 ? '' : '0'}${20 + i * 5} 50%, transparent 90%)`,
                                    animation: `dq-wind-slash ${0.2 + (i % 3) * 0.1}s ease-out ${i * 30}ms infinite`,
                                    pointerEvents: 'none', zIndex: 51,
                                }} />
                            ))}
                            {/* RUSH badge */}
                            <div style={{
                                position: 'absolute', top: '42%', left: '50%',
                                transform: 'translateX(-50%)', zIndex: 56, pointerEvents: 'none',
                                fontSize: '24px', fontWeight: '900', color: '#FDE68A',
                                fontFamily: 'serif', letterSpacing: '8px',
                                textShadow: '0 0 20px #D4AF37, 0 0 40px #FDE68A60',
                                opacity: 0.3,
                                animation: 'dq-aura-pulse 0.4s ease-in-out infinite',
                            }}>
                                RUSH
                            </div>
                        </>
                    )}

                    {/* Finisher dramatic overlay */}
                    {battleFinisher && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 56, pointerEvents: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: 'rgba(0,0,0,0.5)',
                            animation: 'dq-text-appear 400ms ease-out',
                        }}>
                            <div style={{
                                fontSize: '20px', fontWeight: '900', color: '#FDE68A',
                                fontFamily: 'serif', letterSpacing: '4px',
                                textShadow: '0 0 20px #D4AF37, 0 0 40px #FDE68A60',
                                animation: 'dq-aura-pulse 1s ease-in-out infinite',
                            }}>
                                FINAL STRIKE
                            </div>
                        </div>
                    )}

                    {/* Boss counter flash */}
                    {battleBossCounter && (
                        <div style={{
                            position: 'absolute', inset: 0, zIndex: 51, pointerEvents: 'none',
                            background: 'radial-gradient(circle at 50% 30%, rgba(239,68,68,0.35), transparent 60%)',
                            animation: 'dq-hit-flash 300ms ease-out forwards',
                        }} />
                    )}

                    {/* Boss taunt bubble */}
                    {battleBossTaunt && (
                        <div style={{
                            position: 'absolute', top: '10%', right: '6%', zIndex: 56,
                            background: 'rgba(0,0,0,0.9)', border: '1px solid #EF4444',
                            borderRadius: '8px 8px 8px 0',
                            padding: '4px 10px',
                            animation: 'dq-text-appear 150ms ease-out',
                            maxWidth: '45%',
                        }}>
                            <span style={{
                                fontSize: '10px', fontWeight: '700', color: '#EF4444',
                                fontFamily: 'serif',
                            }}>
                                {battleBossTaunt}
                            </span>
                        </div>
                    )}

                    {/* Phrase flashback on victory */}
                    {battlePhraseFlash.length > 0 && battlePhraseFlashIdx >= 0 && (
                        <div style={{
                            position: 'absolute', top: '35%', left: '50%',
                            transform: 'translateX(-50%)', zIndex: 56, pointerEvents: 'none',
                            textAlign: 'center',
                        }}>
                            <div key={`pf-${battlePhraseFlashIdx}`} style={{
                                fontSize: '15px', fontWeight: '900', color: '#FDE68A',
                                fontFamily: 'serif', whiteSpace: 'nowrap',
                                textShadow: '0 0 12px #D4AF37, 0 2px 6px rgba(0,0,0,0.9)',
                                animation: 'dq-phrase-flash 300ms ease-out',
                            }}>
                                {battlePhraseFlash[battlePhraseFlashIdx]}
                            </div>
                            <div style={{
                                fontSize: '8px', fontWeight: '700', color: '#D4AF3780',
                                marginTop: '4px', letterSpacing: '2px',
                            }}>
                                {battlePhraseFlashIdx + 1} / {battlePhraseFlash.length}
                            </div>
                        </div>
                    )}

                    {/* Element spell effect — enhanced */}
                    {battleSpellEffect && (
                        <div style={{
                            position: 'absolute', top: '3%', left: '25%', width: '50%', height: '65%',
                            zIndex: 53, pointerEvents: 'none',
                            animation: 'dq-spell-burst 500ms ease-out forwards',
                        }}>
                            {battleSpellEffect === 'flame' && Array.from({ length: 12 }, (_, i) => (
                                <div key={`fire-${i}`} style={{
                                    position: 'absolute', bottom: `${5 + i * 7}%`, left: `${10 + (i % 4) * 22}%`,
                                    width: `${8 + i % 3 * 5}px`, height: `${14 + i * 2}px`,
                                    background: `linear-gradient(180deg, #FDE68A, #F59E0B, #EF4444${i > 6 ? '80' : ''})`,
                                    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                                    animation: `dq-fire-col 400ms ease-out ${i * 30}ms forwards`,
                                }} />
                            ))}
                            {battleSpellEffect === 'aqua' && Array.from({ length: 10 }, (_, i) => (
                                <div key={`ice-${i}`} style={{
                                    position: 'absolute', top: `${10 + (i % 5) * 16}%`, left: `${5 + (i * 9) % 80}%`,
                                    width: '14px', height: '14px',
                                    background: 'radial-gradient(circle, #93C5FD, #3B82F6, #1E40AF)',
                                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
                                    animation: `dq-ice-shard 400ms ease-out ${i * 45}ms forwards`,
                                }} />
                            ))}
                            {battleSpellEffect === 'thunder' && Array.from({ length: 5 }, (_, i) => (
                                <div key={`bolt-${i}`} style={{
                                    position: 'absolute', top: 0, left: `${12 + i * 17}%`,
                                    width: '4px', height: '100%',
                                    background: `linear-gradient(180deg, #FDE68A, #8B5CF6, transparent)`,
                                    animation: `dq-lightning 300ms ease-out ${i * 40}ms forwards`,
                                    clipPath: `polygon(0 0, 100% 0, 60% 30%, 100% 30%, 40% 60%, 80% 60%, 50% 100%, 0 100%, 40% 60%, 0 60%, 60% 30%, 20% 30%)`,
                                }} />
                            ))}
                            {battleSpellEffect === 'wind' && Array.from({ length: 8 }, (_, i) => (
                                <div key={`wind-${i}`} style={{
                                    position: 'absolute', top: `${10 + i * 10}%`, left: '5%',
                                    width: '90%', height: '2px',
                                    background: `linear-gradient(90deg, transparent, #10B981, #34D399, #6EE7B7, transparent)`,
                                    borderRadius: '2px',
                                    animation: `dq-wind-slash 300ms ease-out ${i * 40}ms forwards`,
                                }} />
                            ))}
                            {battleSpellEffect === 'earth' && Array.from({ length: 10 }, (_, i) => (
                                <div key={`rock-${i}`} style={{
                                    position: 'absolute', bottom: `${3 + i * 8}%`, left: `${8 + (i * 11) % 70}%`,
                                    width: `${6 + i % 4 * 4}px`, height: `${6 + i % 4 * 4}px`,
                                    background: `linear-gradient(135deg, #FCD34D, #D97706, #92400E)`,
                                    borderRadius: '2px', transform: `rotate(${i * 25}deg)`,
                                    animation: `dq-rock-burst 400ms ease-out ${i * 35}ms forwards`,
                                }} />
                            ))}
                        </div>
                    )}

                    {/* Boss HP bar — DQ style top-right */}
                    <div style={{
                        position: 'absolute', top: '6px', right: '6px', zIndex: 54,
                        background: 'rgba(0,0,20,0.9)', border: '2px solid #D4AF37', borderRadius: '4px',
                        padding: '5px 10px', minWidth: '110px',
                        boxShadow: 'inset 0 0 8px rgba(212,175,55,0.15)',
                    }}>
                        <div style={{ fontSize: '8px', fontWeight: '900', color: '#D4AF37', letterSpacing: '1px', marginBottom: '3px' }}>
                            {battleData.bossName} [{ELEM_JA[battleData.bossElement] || '?'}]
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '7px', fontWeight: '700', color: '#F59E0B' }}>HP</span>
                            <div style={{ flex: 1, height: '7px', background: '#1a1a2e', borderRadius: '3px', overflow: 'hidden', border: '1px solid #444' }}>
                                <div style={{
                                    width: `${hpRatio * 100}%`,
                                    height: '100%', borderRadius: '2px',
                                    background: hpRatio > 0.5
                                        ? 'linear-gradient(180deg, #10B981, #059669)'
                                        : hpRatio > 0.2
                                        ? 'linear-gradient(180deg, #F59E0B, #D97706)'
                                        : 'linear-gradient(180deg, #EF4444, #DC2626)',
                                    transition: 'width 0.4s ease',
                                    boxShadow: hpRatio <= 0.2 ? '0 0 6px rgba(239,68,68,0.5)' : undefined,
                                }} />
                            </div>
                            <span style={{ fontSize: '7px', fontWeight: '700', color: '#fff', minWidth: '32px', textAlign: 'right' }}>
                                {battleBossHpLeft.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Combo + Total Damage counter — top-left */}
                    {battleCombo > 0 && (
                        <div style={{
                            position: 'absolute', top: '6px', left: '6px', zIndex: 54,
                            background: battleCombo > 5 ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,20,0.8)',
                            border: `${battleCombo > 5 ? 2 : 1}px solid ${battleCombo > 5 ? '#D4AF37' : '#D4AF3780'}`,
                            borderRadius: '4px', padding: '4px 8px',
                            boxShadow: battleCombo > 5 ? `0 0 12px #D4AF3740` : undefined,
                            transition: 'all 0.3s ease',
                        }}>
                            <div key={`cb-${battleCombo}`} style={{
                                fontSize: battleCombo > 5 ? '14px' : '10px', fontWeight: '900',
                                color: battleCombo > 7 ? '#fff' : '#FDE68A',
                                animation: 'dq-combo-bounce 200ms ease-out',
                                textShadow: battleCombo > 5 ? '0 0 8px #D4AF37' : undefined,
                            }}>
                                {battleCombo} HIT{battleCombo > 1 ? 'S' : ''}
                            </div>
                            <div style={{
                                fontSize: battleCombo > 5 ? '9px' : '7px', fontWeight: '700',
                                color: battleCombo > 7 ? '#FDE68A' : '#D4AF37', marginTop: '1px',
                            }}>
                                DMG {battleTotalDmg.toLocaleString()}
                            </div>
                        </div>
                    )}

                    {/* Synergy name flash — center */}
                    {battleSynergyName && (
                        <div style={{
                            position: 'absolute', top: '45%', left: '50%', zIndex: 56,
                            animation: 'dq-synergy-stamp 600ms ease-out forwards',
                            fontSize: '14px', fontWeight: '900', color: '#FDE68A',
                            textShadow: '0 0 20px #D4AF37, 0 0 40px #FDE68A80, 0 2px 8px rgba(0,0,0,0.9)',
                            whiteSpace: 'nowrap', fontFamily: 'serif', pointerEvents: 'none',
                        }}>
                            {battleSynergyName}
                        </div>
                    )}

                    {/* Grade reveal — huge, center */}
                    {battleGrade && (
                        <div style={{
                            position: 'absolute', top: '20%', left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 56, pointerEvents: 'none',
                            textAlign: 'center',
                        }}>
                            <div style={{
                                fontSize: '56px', fontWeight: '900', fontFamily: 'serif',
                                color: battleGrade === 'S' ? '#D4AF37' : battleGrade === 'A' ? '#A855F7' : battleGrade === 'B' ? '#3B82F6' : '#78716C',
                                textShadow: `0 0 40px ${battleGrade === 'S' ? '#D4AF37' : '#A855F7'}80, 0 0 80px ${battleGrade === 'S' ? '#D4AF37' : '#A855F7'}40, 0 4px 12px rgba(0,0,0,0.8)`,
                                animation: 'battle-grade-appear 800ms ease-out forwards',
                                lineHeight: 1,
                            }}>
                                {battleGrade}
                            </div>
                            <div style={{
                                fontSize: '9px', fontWeight: '700', color: '#D4AF37', letterSpacing: '3px',
                                marginTop: '4px', opacity: 0.8,
                            }}>
                                RANK
                            </div>
                        </div>
                    )}

                    {/* Boss defeated — explosion particles (32) */}
                    {battleDefeated && Array.from({ length: 32 }).map((_, i) => {
                        const a = (i / 32) * 360;
                        const d = 35 + (i % 4) * 12;
                        return <div key={`dexp-${i}`} style={{
                            position: 'absolute', top: '30%', left: '50%',
                            width: `${3 + i % 4 * 2}px`, height: `${3 + i % 4 * 2}px`,
                            borderRadius: i % 3 === 0 ? '50%' : '1px',
                            background: ['#FDE68A', '#EF4444', '#F59E0B', '#D4AF37', '#A855F7', '#fff', ec, '#FF6B6B'][i % 8],
                            '--bx': `${Math.cos(a * Math.PI / 180) * d}px`,
                            '--by': `${Math.sin(a * Math.PI / 180) * d}px`,
                            animation: `runner-god-burst 1.4s ease-out ${i * 20}ms forwards`,
                            zIndex: 57, pointerEvents: 'none',
                        } as React.CSSProperties} />;
                    })}

                    {/* Boss explosion effect */}
                    {battleBossExplode && (
                        <div style={{
                            position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
                            zIndex: 59, pointerEvents: 'none', width: '80px', height: '80px',
                        }}>
                            {/* Explosion rings */}
                            {[0, 1, 2].map(i => (
                                <div key={`exp-${i}`} style={{
                                    position: 'absolute', top: '50%', left: '50%',
                                    width: `${40 + i * 25}px`, height: `${40 + i * 25}px`,
                                    borderRadius: '50%',
                                    border: `2px solid ${i === 0 ? '#fff' : i === 1 ? '#FDE68A' : '#EF4444'}`,
                                    transform: 'translate(-50%, -50%)',
                                    animation: `boss-explode ${0.6 + i * 0.15}s ease-out forwards`,
                                    animationDelay: `${i * 0.1}s`,
                                }} />
                            ))}
                        </div>
                    )}

                    {/* GP RAIN — coins falling from top */}
                    {battleGpRain && battleGpRainCoins.length > 0 && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 59, pointerEvents: 'none', overflow: 'hidden' }}>
                            {battleGpRainCoins.map(coin => (
                                <div key={coin.key} style={{
                                    position: 'absolute', top: '-10px',
                                    left: `${coin.x}%`,
                                    width: `${coin.size}px`, height: `${coin.size}px`,
                                    borderRadius: '50%',
                                    background: 'radial-gradient(circle at 30% 30%, #FDE68A, #D4AF37, #8B6914)',
                                    border: '1px solid #D4AF3780',
                                    boxShadow: '0 0 6px #D4AF3760, inset 0 -2px 4px rgba(0,0,0,0.3)',
                                    animation: `gp-rain-fall 1.2s ease-in forwards`,
                                    animationDelay: `${coin.delay}s`,
                                }}>
                                    <div style={{
                                        position: 'absolute', top: '50%', left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        fontSize: `${coin.size * 0.5}px`, fontWeight: '900',
                                        color: '#8B6914', lineHeight: 1,
                                    }}>G</div>
                                </div>
                            ))}
                            {/* Big GP text */}
                            <div style={{
                                position: 'absolute', top: '35%', left: '50%', transform: 'translateX(-50%)',
                                fontSize: '28px', fontWeight: '900', color: '#D4AF37',
                                textShadow: '0 0 20px #D4AF37, 0 0 40px #D4AF3780, 0 2px 8px rgba(0,0,0,0.9)',
                                letterSpacing: '4px', whiteSpace: 'nowrap',
                                animation: 'dq-text-appear 300ms ease-out',
                            }}>GP BONUS</div>
                        </div>
                    )}

                    {/* 確変突入 flash */}
                    {battleKakuhenFlash && (
                        <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
                            {/* Red/gold gradient flash */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                background: 'linear-gradient(180deg, #DC262640, #D4AF3730, #DC262640)',
                                animation: 'dq-aura-pulse 0.3s ease-in-out infinite',
                            }} />
                            {/* Red border pulse */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                border: '4px solid #DC2626',
                                boxShadow: 'inset 0 0 40px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.4)',
                                animation: 'dq-aura-pulse 0.25s ease-in-out infinite',
                            }} />
                            {/* Big text */}
                            <div style={{
                                position: 'absolute', top: '30%', left: '50%',
                                fontSize: '24px', fontWeight: '900', color: '#DC2626',
                                textShadow: '0 0 20px rgba(220,38,38,0.9), 0 0 40px rgba(220,38,38,0.5), 0 2px 8px rgba(0,0,0,0.9)',
                                letterSpacing: '6px', whiteSpace: 'nowrap',
                                animation: 'kakuhen-flash 0.5s ease-out forwards',
                            }}>確変突入</div>
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)',
                                fontSize: '10px', fontWeight: '700', color: '#FDE68A',
                                textShadow: '0 0 8px #D4AF37',
                                letterSpacing: '2px', whiteSpace: 'nowrap',
                            }}>SLOT ODDS BOOSTED</div>
                        </div>
                    )}

                    {/* Victory stats panel */}
                    {battleVictoryStats && (
                        <div style={{
                            position: 'absolute', top: '40%', left: '50%', transform: 'translateX(-50%)',
                            zIndex: 57, pointerEvents: 'none',
                            animation: 'dq-victory-panel 500ms ease-out forwards',
                            background: 'rgba(0,0,20,0.92)', border: '2px solid #D4AF37', borderRadius: '6px',
                            padding: '8px 14px', minWidth: '130px',
                            boxShadow: 'inset 0 0 12px rgba(212,175,55,0.1)',
                        }}>
                            {[
                                ['TOTAL DMG', battleVictoryStats.totalDmg.toLocaleString()],
                                ['CARDS', String(battleVictoryStats.cards)],
                                ['SYNERGIES', String(battleVictoryStats.synergies)],
                            ].map(([label, val], i) => (
                                <div key={label} style={{
                                    display: 'flex', justifyContent: 'space-between', gap: '12px',
                                    fontSize: '8px', fontWeight: '700', padding: '2px 0',
                                    borderBottom: i < 2 ? '1px solid #D4AF3730' : undefined,
                                }}>
                                    <span style={{ color: '#D4AF37', letterSpacing: '0.5px' }}>{label}</span>
                                    <span style={{ color: '#fff' }}>{val}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* DQ-style message window — bottom */}
                    <div style={{
                        position: 'absolute', bottom: '5px', left: '5px', right: '5px',
                        zIndex: 58,
                        background: 'rgba(0,0,20,0.94)',
                        border: '2px solid #D4AF37',
                        borderRadius: '6px',
                        padding: '8px 12px',
                        minHeight: '36px',
                        display: 'flex', flexDirection: 'column', justifyContent: 'center',
                        boxShadow: 'inset 0 0 12px rgba(212,175,55,0.1), 0 0 20px rgba(0,0,0,0.5)',
                    }}>
                        {/* Inner border decoration */}
                        <div style={{
                            position: 'absolute', inset: '3px', border: '1px solid #D4AF3720',
                            borderRadius: '4px', pointerEvents: 'none',
                        }} />
                        <div style={{
                            fontSize: '11px', fontWeight: '700', color: '#fff',
                            fontFamily: 'serif', letterSpacing: '0.5px', lineHeight: 1.4,
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                            animation: battleMsg ? 'dq-text-appear 300ms ease-out' : undefined,
                        }}>
                            {battleMsg}
                        </div>
                        {battleMsg2 && (
                            <div style={{
                                fontSize: '10px', fontWeight: '600', color: '#D4AF37',
                                fontFamily: 'serif', letterSpacing: '0.3px', marginTop: '2px',
                                animation: 'dq-text-appear 300ms ease-out 150ms both',
                            }}>
                                {battleMsg2}
                            </div>
                        )}
                        {/* Blinking cursor */}
                        <div style={{
                            position: 'absolute', bottom: '8px', right: '10px',
                            width: 0, height: 0,
                            borderLeft: '4px solid transparent', borderRight: '4px solid transparent',
                            borderTop: '5px solid #D4AF37',
                            animation: 'dq-cursor-blink 800ms step-end infinite',
                        }} />
                    </div>
                </div>
                );
            })()}
        </div>
    );
}


// Monotonic counter for unique React keys (avoids Date.now() collisions)
let _effectKeyCounter = 0;
function effectKey() { return ++_effectKeyCounter; }

export default function PhrasesPage() {
    const router = useRouter();
    // Data mode: phrases (default) or words
    const [dataMode, setDataMode] = useState<'phrases' | 'words' | 'toeic'>(() => {
        if (typeof window !== 'undefined') {
            if (IS_PUBLIC) return (localStorage.getItem('training-data-mode') as 'phrases' | 'words' | 'toeic') || 'phrases';
            return (localStorage.getItem('training-data-mode') as 'phrases' | 'words' | 'toeic') || 'phrases';
        }
        return 'phrases';
    });
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [loading, setLoading] = useState(true);
    const [toeicTargetLevel, setToeicTargetLevel] = useState<1 | 2 | 3 | null>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('toeic-target-level');
            if (saved) return parseInt(saved) as 1 | 2 | 3;
        }
        return null;
    });
    const [showToeicLevelPicker, setShowToeicLevelPicker] = useState(false);
    const [phraseMastery, setPhraseMastery] = useState<Record<string, number>>({});
    const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [clientToday, setClientToday] = useState('');
    useEffect(() => {
        const now = new Date();
        setClientToday(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`);
        setCurrentMonth(now);
    }, []);
    const [isMobile, setIsMobile] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [onboardingStep, setOnboardingStep] = useState(0);
    useEffect(() => {
        if (typeof window !== 'undefined' && !localStorage.getItem('training-onboarding-done')) {
            setShowOnboarding(true);
            // Mark immediately so reload won't re-trigger
            localStorage.setItem('training-onboarding-done', 'true');
        }
    }, []);
    const dismissOnboarding = () => {
        setShowOnboarding(false);
        localStorage.setItem('training-onboarding-done', 'true');
    };
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
    const [puzzleDropCard, setPuzzleDropCard] = useState<{ element: string; rank: string; bstTotal: number; key: number } | null>(null);
    const [battleSyncData, setBattleSyncData] = useState<BattleSyncData | null>(null);
    const [miniRunnerBattleActive, setMiniRunnerBattleActive] = useState(false);
    const [lastReviewedWord, setLastReviewedWord] = useState<{ text: string; key: number } | null>(null);

    // === PROGRESSIVE UNLOCK SYSTEM ===
    const [daysActive, setDaysActive] = useState<string[]>([]);
    const [unlockNotif, setUnlockNotif] = useState<string | null>(null);
    // First-run demo: guarantee chain progression to GOD mode on very first session
    const [isFirstRun, setIsFirstRun] = useState(false);
    const isFirstRunRef = useRef(false);
    // First-run complete overlay: shows after god+MYTHIC+LEGENDARY rank-up sequence
    const [firstRunComplete, setFirstRunComplete] = useState(false);
    const [firstRunPhase, setFirstRunPhase] = useState<'legendary' | 'realmode' | 'guide'>('legendary');
    const firstRunGodDismissed = useRef(false);
    const firstRunGodDismissedAt = useRef(0);
    useEffect(() => {
        try {
            const raw = localStorage.getItem('quest-days-active');
            if (raw) {
                const parsed = JSON.parse(raw);
                setDaysActive(parsed);
            }
            // First run = no existing data AND haven't completed first-run
            const hasData = raw ? JSON.parse(raw).length > 0 : false;
            const hasMastery = !!localStorage.getItem('quest-mastery');
            const hasDone = !!localStorage.getItem('quest-first-run-done');
            if (!hasDone && !hasData && !hasMastery) {
                setIsFirstRun(true);
                isFirstRunRef.current = true;
                // Mark immediately so reload won't re-trigger first-run
                localStorage.setItem('quest-first-run-done', '1');
            }
        } catch { /* */ }
    }, []);
    const trackActiveDay = useCallback(() => {
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        setDaysActive(prev => {
            if (prev.includes(today)) return prev;
            const next = [...prev, today];
            localStorage.setItem('quest-days-active', JSON.stringify(next));
            // Check for new unlocks
            const oldLen = prev.length;
            const newLen = next.length;
            if (oldLen < 3 && newLen >= 3) setUnlockNotif('スロット解禁!');
            else if (oldLen < 6 && newLen >= 6) setUnlockNotif('確変モード解禁!');
            else if (oldLen < 10 && newLen >= 10) setUnlockNotif('バトル解禁!');
            return next;
        });
    }, []);
    useEffect(() => {
        if (!unlockNotif) return;
        const timer = setTimeout(() => setUnlockNotif(null), 3000);
        return () => clearTimeout(timer);
    }, [unlockNotif]);
    const beginnerMode = getSettings().beginnerMode;
    const unlockLevel = beginnerMode ? daysActive.length : Infinity;
    // First-run overrides all progressive locks
    const SLOT_UNLOCKED = isFirstRun || unlockLevel >= 3;
    const CHAIN_UNLOCKED = isFirstRun || unlockLevel >= 6;
    const BATTLE_UNLOCKED = isFirstRun || unlockLevel >= 10;
    // Refs for stable access inside useCallback closures (postXP, etc.)
    const slotUnlockedRef = useRef(SLOT_UNLOCKED);
    const chainUnlockedRef = useRef(CHAIN_UNLOCKED);
    useEffect(() => { slotUnlockedRef.current = SLOT_UNLOCKED; }, [SLOT_UNLOCKED]);
    useEffect(() => { chainUnlockedRef.current = CHAIN_UNLOCKED; }, [CHAIN_UNLOCKED]);
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
    const [voiceRecordings, setVoiceRecordings] = useState<Record<string, VoiceRecording[]>>({});
    const [phraseLinks, setPhraseLinks] = useState<Record<string, PhraseLink[]>>({});
    const [phraseLastLeveled, setPhraseLastLeveled] = useState<Record<string, string>>({});
    const [cardPoints, setCardPoints] = useState<Record<string, number>>({});
    // Cumulative review touches per phrase-date (dateKey → total count from D1)
    const [dateTouchMap, setDateTouchMap] = useState<Record<string, number>>({});

    // Player level state
    const [playerTotalXP, setPlayerTotalXP] = useState(0);
    const [playerLevel, setPlayerLevel] = useState(1);
    const [levelUpEffect, setLevelUpEffect] = useState<{ level: number; title: string; color: string; key: number } | null>(null);

    // Daily level-up effect
    const [dailyLevelUpEffect, setDailyLevelUpEffect] = useState<{ level: number; title: string; color: string; key: number } | null>(null);
    const prevDailyLevelRef = useRef(-1);

    // Gacha bonus system state
    const [playerSparks, setPlayerSparks] = useState(0);
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
    const [chainState, setChainState] = useState<{ count: number; mode: ChainMode; key: number }>({ count: 0, mode: 'normal', key: 0 });
    const [chainTransition, setChainTransition] = useState<{ from: ChainMode; to: ChainMode; key: number } | null>(null);
    const chainTransitionRef = useRef<{ from: ChainMode; to: ChainMode; key: number } | null>(null);
    // Guarded setter: prevent double-fire while a transition is already showing
    const fireChainTransition = useCallback((t: { from: ChainMode; to: ChainMode; key: number } | null) => {
        if (t && chainTransitionRef.current) return; // already showing, skip
        chainTransitionRef.current = t;
        setChainTransition(t);
    }, []);
    // Keep backward-compat aliases for FEVER visuals
    const feverMode = { active: chainState.mode !== 'normal', streak: chainState.count, key: chainState.key };
    const [feverFlash, setFeverFlash] = useState<'enter' | 'exit' | null>(null);
    const [feverExitEffect, setFeverExitEffect] = useState<{ streak: number } | null>(null);
    const feverDroneRef = useRef<HTMLAudioElement | null>(null);
    const feverRef = useRef({ active: false, streak: 0 });
    // Luck multiplier display
    const [luckMultiplier, setLuckMultiplier] = useState(1.0);
    const [cardRankUpEffect, setCardRankUpEffect] = useState<{ oldRank: string; newRank: string; newRankKey: CardRank; newRankColor: string; snapshotPoints: number; snapshotPhrase: { english: string; japanese: string; category: string } | null; key: number } | null>(null);

    // Card level-up celebration: hold the card on screen before advancing
    const [cardCelebration, setCardCelebration] = useState<{
        phrase: Phrase;
        key: number;
    } | null>(null);

    // ── Progressive Tip System (v2: queued, multi-layered) ──
    type TipId =
        // Core mechanics (show once)
        | 'welcome-back' | 'first-review' | 'mastery-tap' | 'first-gacha' | 'first-chain'
        | 'first-rankup' | 'slot-explain' | 'data-switch' | 'chakra-explain' | 'calendar-hint'
        // Interaction guidance (show once per feature)
        | 'review-swipe' | 'tts-hint' | 'recording-hint' | 'link-hint' | 'filter-hint'
        | 'list-view-hint' | 'add-phrase-hint' | 'listen-mode-hint'
        // Encouragement (show once per milestone)
        | 'streak-3' | 'streak-10' | 'cards-10' | 'cards-50' | 'day-complete'
        | 'consecutive-days-3' | 'consecutive-days-7'
        // Next-step nudges
        | 'after-first-review' | 'try-toeic' | 'try-review-mode' | 'check-collection';

    const [activeTip, setActiveTip] = useState<TipId | null>(null);
    const tipQueueRef = useRef<TipId[]>([]);
    const shownTipsRef = useRef<Set<string>>(new Set());
    const tipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem('rpg-tips-shown');
            if (saved) shownTipsRef.current = new Set(JSON.parse(saved));
        } catch { /* */ }
    }, []);

    const showTip = useCallback((tipId: TipId, delay?: number) => {
        if (isFirstRun || firstRunComplete) return;
        if (shownTipsRef.current.has(tipId)) return;
        shownTipsRef.current.add(tipId);
        try { localStorage.setItem('rpg-tips-shown', JSON.stringify([...shownTipsRef.current])); } catch { /* */ }
        const doShow = () => {
            if (activeTip) {
                // Queue it if another tip is showing
                tipQueueRef.current.push(tipId);
            } else {
                setActiveTip(tipId);
            }
        };
        if (delay) {
            setTimeout(doShow, delay);
        } else {
            doShow();
        }
    }, [isFirstRun, firstRunComplete, activeTip]);

    const dismissTip = useCallback(() => {
        setActiveTip(null);
        if (tipTimerRef.current) { clearTimeout(tipTimerRef.current); tipTimerRef.current = null; }
        // Show next queued tip after brief pause
        setTimeout(() => {
            if (tipQueueRef.current.length > 0) {
                const next = tipQueueRef.current.shift()!;
                setActiveTip(next);
            }
        }, 500);
    }, []);

    // Auto-dismiss tips (longer for important ones, shorter for encouragement)
    useEffect(() => {
        if (!activeTip) return;
        const isLong = ['mastery-tap', 'first-review', 'review-swipe', 'slot-explain', 'calendar-hint'].includes(activeTip);
        const duration = isLong ? 12000 : 7000;
        tipTimerRef.current = setTimeout(() => {
            setActiveTip(null);
            // Dequeue next
            setTimeout(() => {
                if (tipQueueRef.current.length > 0) {
                    const next = tipQueueRef.current.shift()!;
                    setActiveTip(next);
                }
            }, 500);
        }, duration);
        return () => { if (tipTimerRef.current) clearTimeout(tipTimerRef.current); };
    }, [activeTip]);

    const TIP_CONTENT: Record<string, { title: string; body: string; color: string; action?: string }> = {
        // ── Core Mechanics ──
        'welcome-back': {
            title: 'おかえり!',
            body: 'まずはカレンダーから今日の日付をタップして、今日のカードを確認しよう。',
            color: '#D4AF37', action: '日付をタップ →',
        },
        'first-review': {
            title: 'カードレビューの基本',
            body: '英語を見て意味がわかったら「知ってる」、わからなければ「まだ」をタップ。\n正解するとスロットが回ってポイントがもらえるぞ!',
            color: '#10B981', action: 'カードをタップ →',
        },
        'mastery-tap': {
            title: 'レベルの上げ方',
            body: 'カード左上のレベルボタンをタップすると習熟度が上がる。\nEGG(0) → HATCH(1) → ROOKIE(2) → FIGHTER(3) → CHAMPION(4)\n4回タップで「体に染み込んだ」状態!',
            color: '#10B981',
        },
        'first-gacha': {
            title: 'ガチャ結果!',
            body: '正解するたびにカードポイント(CP)がもらえる。CPが貯まるとカードのランクが上がるぞ!\nMISS→BONUS→GREAT→SUPER→MEGA→LEGENDARY',
            color: '#D4AF37',
        },
        'first-chain': {
            title: '確変モード突入!',
            body: '連続正解でチェーンが発動! 確変(x1.5)→激熱(x2)→神(x3)とポイント倍率がアップ。パチンコのアレだ!\n画面の色が変わったら確変中!',
            color: '#EF4444',
        },
        'first-rankup': {
            title: 'ランクアップ!',
            body: 'カードのランクが上がった!\nNORMAL → BRONZE → SILVER → GOLD → HOLOGRAPHIC → LEGENDARY\nレアカードを集めよう!',
            color: '#8B5CF6',
        },
        'slot-explain': {
            title: 'スロット解禁!',
            body: '3日連続で来てくれたご褒美! 正解するとスロットが自動で回る。揃えばボーナスCP!\nリーチ演出もあるから見逃すな!',
            color: '#F59E0B',
        },
        'data-switch': {
            title: 'データ切替',
            body: 'Phrases(英会話フレーズ)、Words(単語)、TOEIC(試験対策)の3つのモードがある。\n目的に合わせて切り替えよう!',
            color: '#10B981',
        },
        'chakra-explain': {
            title: 'チャクラ進化!',
            body: 'カードが進化した! 習熟度を上げると:\nEGG→HATCH→ROOKIE→FIGHTER→CHAMPION→ELITE→MASTER\n録音・リンク追加でさらにレベルアップ!',
            color: '#6366F1',
        },
        'calendar-hint': {
            title: 'カレンダーの見方',
            body: '各日付のバーは習熟度を表してる。バーが伸びるほど覚えてるということ。\n色付きの日 = データがある日。灰色 = まだ。',
            color: '#3B82F6',
        },
        // ── Interaction Guidance ──
        'review-swipe': {
            title: '操作ヒント',
            body: 'キーボードの←→でカード切替、スペースで正解/不正解。\nマウスなら画面下のボタンでもOK。',
            color: '#78716C',
        },
        'tts-hint': {
            title: '音声で聞こう',
            body: 'カード横のスピーカーボタンで英語の発音が聞ける。\n何度も聞いて耳に馴染ませよう!',
            color: '#3B82F6', action: 'スピーカーをタップ →',
        },
        'recording-hint': {
            title: '自分の声を録音しよう',
            body: 'マイクボタンで自分の発音を録音できる。\n録音するとチャクラレベルがアップ! ネイティブと比べてみよう。',
            color: '#EF4444', action: 'マイクをタップ →',
        },
        'link-hint': {
            title: '研究メモを残そう',
            body: '「研究」ボタンで関連フレーズやメモを追加できる。\nリンクを追加するとチャクラがさらにレベルアップ!',
            color: '#8B5CF6',
        },
        'filter-hint': {
            title: 'フィルターを使おう',
            body: '復習モードではレベル別にカードを絞り込める。\n「random」で全部シャッフル、レベル0だけ集中復習もできる。',
            color: '#F59E0B',
        },
        'list-view-hint': {
            title: 'リストビュー',
            body: '右上の「List」ボタンで全カードをリスト表示。\n検索もできるから、特定のフレーズを探すときに便利!',
            color: '#78716C',
        },
        'add-phrase-hint': {
            title: 'フレーズ追加',
            body: '右上の「+」ボタンで新しいフレーズを追加できる。\n日常で見つけた使える英語をどんどん登録しよう!',
            color: '#1C1917',
        },
        'listen-mode-hint': {
            title: 'リスニングモード',
            body: '「Listen」ボタンでその日のカードを連続再生。\n通勤中、家事中にBGM感覚でリスニング練習!',
            color: '#3B82F6',
        },
        // ── Encouragement ──
        'streak-3': {
            title: '3連続正解!',
            body: 'いい調子! この感覚を覚えておこう。\n続けると確変モードが近づいてくるぞ!',
            color: '#F97316',
        },
        'streak-10': {
            title: '10連続正解!',
            body: 'すごい集中力! もう確変マスターだな。\nこの調子で神モードを目指せ!',
            color: '#EF4444',
        },
        'cards-10': {
            title: '10枚クリア!',
            body: '今日はもう10枚レビューした。立派!\n毎日10枚が理想的なペースだぞ。',
            color: '#10B981',
        },
        'cards-50': {
            title: '50枚突破!',
            body: 'マジで? 50枚もレビューしたの?\nその根性、英語力に変わってるから安心しろ。',
            color: '#D4AF37',
        },
        'day-complete': {
            title: '今日のノルマ達成!',
            body: '今日のカードを全部レビューした!\nカードコレクションで成果を確認してみよう。',
            color: '#10B981', action: 'カードコレクション →',
        },
        'consecutive-days-3': {
            title: '3日連続!',
            body: '3日連続でトレーニング! この習慣が一番大事。\n3日坊主じゃなかった。自分を褒めろ!',
            color: '#D4AF37',
        },
        'consecutive-days-7': {
            title: '7日連続!',
            body: '1週間毎日来てる。もう習慣になってるな。\nこの調子なら英語力は確実に伸びてる!',
            color: '#EF4444',
        },
        // ── Next-Step Nudges ──
        'after-first-review': {
            title: '最初のレビュー完了!',
            body: '1枚目のレビューお疲れ様! カレンダーに戻って他の日付も見てみよう。\n毎日少しずつ、これが最強の英語学習法。',
            color: '#10B981', action: 'カレンダーに戻る →',
        },
        'try-toeic': {
            title: 'TOEICモードもあるよ',
            body: '右上の「TOEIC」タブで試験対策用の単語が練習できる。\n400点→500点→600点→730点のレベル別!',
            color: '#F59E0B', action: 'TOEICタブ →',
        },
        'try-review-mode': {
            title: '復習モードを試そう',
            body: '「復習」ボタンでカードをシャッフルしてランダムにレビューできる。\nスロットもここで回るぞ!',
            color: '#D4AF37', action: '復習ボタン →',
        },
        'check-collection': {
            title: 'カードコレクション',
            body: '集めたカードはカードコレクションで一覧できる。\nランク別、レベル別に確認してみよう!',
            color: '#8B5CF6', action: 'サイドバー → カードコレクション',
        },
    };

    // ── Tip triggers ──
    // Welcome back (first visit after first-run, show calendar tip)
    const welcomeTipFired = useRef(false);
    useEffect(() => {
        if (welcomeTipFired.current || isFirstRun || loading) return;
        welcomeTipFired.current = true;
        // Delay so page renders first
        const timer = setTimeout(() => {
            showTip('welcome-back');
        }, 1500);
        return () => clearTimeout(timer);
    }, [isFirstRun, loading, showTip]);

    // First time entering review mode
    const prevViewModeRef = useRef(viewMode);
    useEffect(() => {
        if (viewMode === 'review' && prevViewModeRef.current !== 'review') {
            showTip('first-review', 800);
            // Queue interaction hints
            setTimeout(() => showTip('review-swipe'), 15000);
            setTimeout(() => showTip('tts-hint'), 25000);
            setTimeout(() => showTip('recording-hint'), 40000);
        }
        if (viewMode === 'list' && prevViewModeRef.current !== 'list') {
            showTip('list-view-hint');
        }
        prevViewModeRef.current = viewMode;
    }, [viewMode, showTip]);

    // First gacha result
    useEffect(() => {
        if (gachaEffect?.phase === 'reveal' && !isFirstRun) {
            showTip('first-gacha');
        }
    }, [gachaEffect?.phase, isFirstRun, showTip]);
    // First chain mode entry
    useEffect(() => {
        if (chainTransition && chainTransition.to === 'kakuhen' && !isFirstRun) {
            showTip('first-chain');
        }
    }, [chainTransition, isFirstRun, showTip]);
    // First card rank-up
    useEffect(() => {
        if (cardRankUpEffect && !isFirstRun) {
            showTip('first-rankup');
        }
    }, [cardRankUpEffect, isFirstRun, showTip]);
    // Chakra level-up
    useEffect(() => {
        if (pointEffect && !isFirstRun) {
            showTip('chakra-explain');
        }
    }, [pointEffect, isFirstRun, showTip]);
    // Slot unlock (day 3)
    useEffect(() => {
        if (SLOT_UNLOCKED && !isFirstRun && daysActive.length >= 3) {
            showTip('slot-explain');
        }
    }, [SLOT_UNLOCKED, isFirstRun, daysActive.length, showTip]);
    // Streak milestones
    useEffect(() => {
        if (isFirstRun) return;
        if (chainState.count === 3) showTip('streak-3');
        if (chainState.count === 10) showTip('streak-10');
    }, [chainState.count, isFirstRun, showTip]);
    // Data mode switch
    const prevDataModeRef = useRef(dataMode);
    useEffect(() => {
        if (dataMode !== prevDataModeRef.current) {
            prevDataModeRef.current = dataMode;
            showTip('data-switch');
        }
    }, [dataMode, showTip]);
    // Consecutive days milestones
    useEffect(() => {
        if (isFirstRun) return;
        const len = daysActive.length;
        if (len === 3) showTip('consecutive-days-3', 2000);
        if (len === 7) showTip('consecutive-days-7', 2000);
    }, [daysActive.length, isFirstRun, showTip]);
    // After some time on calendar, nudge to try review mode
    useEffect(() => {
        if (viewMode !== 'calendar' || isFirstRun || loading) return;
        const timer = setTimeout(() => {
            showTip('try-review-mode');
        }, 60000); // after 1 min on calendar
        return () => clearTimeout(timer);
    }, [viewMode, isFirstRun, loading, showTip]);
    // After 5 days, suggest TOEIC
    useEffect(() => {
        if (daysActive.length >= 5 && !isFirstRun) {
            showTip('try-toeic', 3000);
        }
    }, [daysActive.length, isFirstRun, showTip]);
    // Review count tracking for card milestones
    const reviewCountSession = useRef(0);
    const trackReviewCount = useCallback(() => {
        reviewCountSession.current++;
        if (reviewCountSession.current === 10) showTip('cards-10');
        if (reviewCountSession.current === 50) showTip('cards-50');
        if (reviewCountSession.current === 1) {
            // First review of session: queue after-first-review nudge
            setTimeout(() => showTip('after-first-review'), 5000);
        }
    }, [showTip]);

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

    // Auto-clear rank-up banner (skip auto-clear during first-run: user must tap to dismiss)
    useEffect(() => {
        if (!cardRankUpEffect) return;
        if (isFirstRunRef.current) return; // first-run: tap to dismiss
        const timer = setTimeout(() => setCardRankUpEffect(null), 3000);
        return () => clearTimeout(timer);
    }, [cardRankUpEffect]);

    // Card celebration: hold the leveled card, then advance
    // When a card rank-up is detected mid-celebration, restart timer with longer hold
    useEffect(() => {
        if (!cardCelebration) return;
        const holdTime = cardRankUpEffect ? 4500 : 2500;
        const timer = setTimeout(() => {
            setReviewHistory(prev => [...prev, cardCelebration.phrase]);
            setHistoryOffset(0);
            setCardCelebration(null);
        }, holdTime);
        return () => clearTimeout(timer);
    }, [cardCelebration, cardRankUpEffect]);

    // Auto-play TTS ref (effect placed after displayedCard is defined)
    const prevAutoPlayIdRef = useRef<string | null>(null);

    // Keep feverRef in sync (for race-condition-safe callbacks)
    useEffect(() => {
        feverRef.current = { active: chainState.mode !== 'normal', streak: chainState.count };
    }, [chainState.mode, chainState.count]);

    // Stop FEVER BGM when chain ends + duck/restore main BGM
    useEffect(() => {
        if (chainState.mode !== 'normal') {
            // Mute main BGM during chain mode
            if (mainBgmRef.current) mainBgmRef.current.volume = 0;
        } else {
            // Restore main BGM volume
            if (mainBgmRef.current) {
                const st = getSettings();
                mainBgmRef.current.volume = (st.bgmVolume / 100) * (st.volume / 100);
            }
            if (feverDroneRef.current) {
                stopFeverBGM(feverDroneRef.current);
                feverDroneRef.current = null;
            }
        }
    }, [chainState.mode]);

    // First-run complete: after god dismissed → short delay → show congrats
    // Everything is already force-cleared in the god dismiss handler above.
    useEffect(() => {
        if (!firstRunGodDismissed.current) return;
        // Wait 800ms for any remaining rank-up setTimeout(500) to fire and be visible briefly
        const timer = setTimeout(() => {
            // Force-clear any late-firing effects
            setGachaEffect(null);
            setCardRankUpEffect(null);
            setSlotReels(null);
            firstRunGodDismissed.current = false;
            firstRunGodDismissedAt.current = 0;
            setFirstRunComplete(true);
        }, 800);
        return () => clearTimeout(timer);
    }, [gachaEffect, cardRankUpEffect, chainTransition]);

    // Auto-clear chain transition effect (skip during first-run: user must tap to dismiss)
    useEffect(() => {
        if (!chainTransition) return;
        if (isFirstRunRef.current) return;
        const timer = setTimeout(() => fireChainTransition(null), 1500);
        return () => clearTimeout(timer);
    }, [chainTransition]);


    // ── Main BGM (always-on loop, independent of FEVER) ──
    const mainBgmRef = useRef<HTMLAudioElement | null>(null);
    useEffect(() => {
        const st = getSettings();
        if (!st.bgmEnabled || !st.soundEnabled) {
            // stop if playing
            if (mainBgmRef.current) {
                mainBgmRef.current.pause();
                mainBgmRef.current = null;
            }
            return;
        }
        // already playing
        if (mainBgmRef.current) {
            mainBgmRef.current.volume = (st.bgmVolume / 100) * (st.volume / 100);
            return;
        }
        const audio = new Audio('/audio/bgm-main.mp3');
        audio.loop = true;
        audio.volume = (st.bgmVolume / 100) * (st.volume / 100);
        audio.play().catch(() => { /* autoplay blocked — will start on first user interaction */ });
        mainBgmRef.current = audio;
        return () => {
            audio.pause();
            mainBgmRef.current = null;
        };
    }, []);

    // Listen for settings changes to update main BGM volume / toggle
    useEffect(() => {
        const onStorage = (e: StorageEvent) => {
            if (e.key !== 'eigodamashii-settings') return;
            const st = getSettings();
            if (!st.bgmEnabled || !st.soundEnabled) {
                if (mainBgmRef.current) { mainBgmRef.current.pause(); mainBgmRef.current = null; }
            } else if (!mainBgmRef.current) {
                const audio = new Audio('/audio/bgm-main.mp3');
                audio.loop = true;
                audio.volume = (st.bgmVolume / 100) * (st.volume / 100);
                audio.play().catch(() => {});
                mainBgmRef.current = audio;
            } else {
                mainBgmRef.current.volume = (st.bgmVolume / 100) * (st.volume / 100);
            }
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
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

    // Gacha reveal phase: auto-clear after tier-specific duration (+2s if rank-up)
    useEffect(() => {
        if (!gachaEffect || gachaEffect.phase !== 'reveal') return;
        const cfg = GACHA_TIER_CONFIG[gachaEffect.tier];
        const extraTime = cardRankUpEffect ? 2000 : 0;
        const timer = setTimeout(() => {
            setGachaEffect(null);
        }, (cfg?.duration || 2000) + extraTime);
        return () => clearTimeout(timer);
    }, [gachaEffect?.phase, gachaEffect?.key, cardRankUpEffect]);

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
        // Block if god mode dismissed (waiting for congrats overlay)
        if (firstRunGodDismissed.current) return;
        if (IS_PUBLIC) {
            // 3004: ローカルガチャシミュレーション（DB不要、演出は維持）
            const currentChain = feverRef.current;
            const roll = Math.random() * 100;
            // First-run: guarantee no MISS so chain always progresses to GOD
            // At god transition (streak 10): force MYTHIC + 250 card points → instant LEGENDARY rank
            const firstRun = isFirstRunRef.current;
            const firstRunGodHit = firstRun && currentChain.streak === 9; // about to become 10
            const tier = firstRunGodHit
                ? 'MYTHIC'
                : firstRun
                ? (roll < 2 ? 'MYTHIC' : roll < 8 ? 'LEGENDARY' : roll < 20 ? 'MEGA' : roll < 40 ? 'SUPER' : roll < 65 ? 'GREAT' : 'BONUS')
                : (roll < 1 ? 'MYTHIC'
                : roll < 4 ? 'LEGENDARY'
                : roll < 12 ? 'MEGA'
                : roll < 28 ? 'SUPER'
                : roll < 50 ? 'GREAT'
                : roll < 85 ? 'BONUS' : 'MISS');

            // Simulate sparks + card points
            const sparksMap: Record<string, number> = { MYTHIC: 50, LEGENDARY: 30, MEGA: 15, SUPER: 8, GREAT: 4, BONUS: 2, MISS: 0 };
            const cpMap: Record<string, number> = { MYTHIC: 25, LEGENDARY: 15, MEGA: 8, SUPER: 4, GREAT: 2, BONUS: 1, MISS: 0 };
            const sparksWon = sparksMap[tier] || 0;
            const cardPointsEarned = firstRunGodHit ? 250 : (cpMap[tier] || 0);

            // Update local XP + sparks
            setPlayerTotalXP(prev => {
                const next = prev + xpGained;
                const newLevel = levelFromXP(next);
                if (newLevel > playerLevel) {
                    setPlayerLevel(newLevel);
                    const info = getTitleForLevel(newLevel);
                    setLevelUpEffect({ level: newLevel, title: info.title, color: info.color, key: effectKey() });
                } else {
                    setPlayerLevel(newLevel);
                }
                return next;
            });
            setPlayerSparks(prev => prev + sparksWon);
            if (phraseId) {
                setCardPoints(prev => {
                    const newTotal = (prev[phraseId] || 0) + cardPointsEarned;
                    // Persist to localStorage for IS_PUBLIC mode
                    const updated = { ...prev, [phraseId]: newTotal };
                    try { localStorage.setItem('rpg_card_points', JSON.stringify(updated)); } catch {}
                    // Card rank-up detection
                    const prevRank = getCardRank(prev[phraseId] || 0);
                    const newRank = getCardRank(newTotal);
                    if (prevRank.rank !== newRank.rank && newRank.rank !== 'NORMAL') {
                        // Snapshot the current card BEFORE the timeout fires (card may advance)
                        const snapCard = displayedCardRef.current;
                        setTimeout(() => {
                            window.speechSynthesis.cancel();
                            playRankUpSound(newRank.rank);
                            setCardRankUpEffect({
                                oldRank: prevRank.label || 'NORMAL',
                                newRank: newRank.label,
                                newRankKey: newRank.rank,
                                newRankColor: newRank.borderColor,
                                snapshotPoints: newTotal,
                                snapshotPhrase: snapCard ? { english: snapCard.english, japanese: snapCard.japanese, category: snapCard.category } : null,
                                key: effectKey(),
                            });
                        }, 500);
                    }
                    return { ...prev, [phraseId]: newTotal };
                });
            }
            setMonthlyReviewCounts(prev => ({
                ...prev,
                [todayKey]: {
                    count: (prev[todayKey]?.count || 0) + 1,
                    xp: (prev[todayKey]?.xp || 0) + xpGained,
                    sparks: (prev[todayKey]?.sparks || 0) + sparksWon,
                }
            }));

            // 連荘 Chain state transitions
            // Normal mode: 1/16 random chance to trigger 確変突入 (matching iwasaki-naisou)
            // First-run: guaranteed progression (old streak-based behavior)
            const slotOn = getSettings().slotEnabled;
            if (chainUnlockedRef.current && getSettings().feverEnabled) {
                const isWin = tier !== 'MISS';
                const isMiss = tier === 'MISS';
                if (isMiss) {
                    if (currentChain.active) {
                        const exitStreak = currentChain.streak;
                        stopFeverBGM(feverDroneRef.current);
                        feverDroneRef.current = null;
                        setChainState({ count: 0, mode: 'normal', key: effectKey() });
                        feverRef.current = { active: false, streak: 0 };
                        setFeverFlash('exit');
                        setFeverExitEffect({ streak: exitStreak });
                        playFeverExitSound();
                    }
                } else if (isWin) {
                    const firstRun = isFirstRunRef.current;
                    if (firstRun) {
                        // First-run: guaranteed chain progression (streak-based)
                        // Cap at 10 (god mode entry) — don't increment further
                        if (currentChain.streak >= 10) return; // already in god, wait for user to dismiss
                        const newCount = currentChain.streak + 1;
                        const oldMode = getChainMode(currentChain.streak);
                        const newMode = getChainMode(newCount);
                        const wasActive = currentChain.active;
                        setChainState({ count: newCount, mode: newMode, key: effectKey() });
                        feverRef.current = { active: newMode !== 'normal', streak: newCount };
                        if (newMode !== oldMode && newMode !== 'normal') {
                            fireChainTransition({ from: oldMode, to: newMode, key: effectKey() });
                            if (!wasActive) {
                                setFeverFlash('enter');
                                playFeverEntrySound();
                                // Stop any existing BGM before starting new one
                                if (feverDroneRef.current) { stopFeverBGM(feverDroneRef.current); }
                                feverDroneRef.current = startFeverBGM();
                            } else {
                                playFeverEntrySound();
                            }
                        } else if (wasActive) {
                            playFeverChainHit(newCount);
                        }
                    } else if (currentChain.active) {
                        // Already in chain: increment streak normally
                        const newCount = currentChain.streak + 1;
                        const oldMode = getChainMode(currentChain.streak);
                        const newMode = getChainMode(newCount);
                        setChainState({ count: newCount, mode: newMode, key: effectKey() });
                        feverRef.current = { active: newMode !== 'normal', streak: newCount };
                        if (newMode !== oldMode && newMode !== 'normal') {
                            fireChainTransition({ from: oldMode, to: newMode, key: effectKey() });
                            playFeverEntrySound();
                        } else {
                            playFeverChainHit(newCount);
                        }
                    } else {
                        // Normal mode: 1/16 確変 roll
                        const kakuhenRoll = Math.random() < (1 / 16);
                        if (kakuhenRoll) {
                            // 確変突入! Jump to streak 3 (kakuhen entry point)
                            const newCount = 3;
                            const newMode: ChainMode = 'kakuhen';
                            setChainState({ count: newCount, mode: newMode, key: effectKey() });
                            feverRef.current = { active: true, streak: newCount };
                            fireChainTransition({ from: 'normal', to: 'kakuhen', key: effectKey() });
                            setFeverFlash('enter');
                            playFeverEntrySound();
                            if (feverDroneRef.current) { stopFeverBGM(feverDroneRef.current); }
                            feverDroneRef.current = startFeverBGM();
                        }
                        // else: no chain entry, stay normal
                    }
                }
            }

            // Trigger gacha overlay
            if (slotUnlockedRef.current && slotOn) {
                deferredScoreUpdates.current.push(() => {}); // no deferred DB updates needed
                if (pendingGachaRef.current) clearTimeout(pendingGachaRef.current);
                const delay = slamActive ? 1200 : 0;
                pendingGachaRef.current = setTimeout(() => {
                    setGachaEffect({
                        phase: 'reel',
                        tier,
                        sparksWon,
                        phraseId: phraseId || null,
                        cardPointsEarned,
                        cardTotalPoints: phraseId ? (cardPoints[phraseId] || 0) + cardPointsEarned : 0,
                        key: effectKey(),
                    });
                    pendingGachaRef.current = null;
                }, delay);
            } else {
                setQuietToast({
                    sparks: sparksWon,
                    cardPts: cardPointsEarned,
                    tier,
                    key: effectKey(),
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
                            setLevelUpEffect({ level: newLevel, title: info.title, color: info.color, key: effectKey() });
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
                            // Card rank-up detection
                            if (phraseId && d.gacha.card_total_points !== undefined) {
                                const prevPoints = cardPoints[phraseId] || 0;
                                const prevRank = getCardRank(prevPoints);
                                const newRank = getCardRank(d.gacha.card_total_points);
                                if (prevRank.rank !== newRank.rank && newRank.rank !== 'NORMAL') {
                                    const snapCard = displayedCardRef.current;
                                    setTimeout(() => {
                                        window.speechSynthesis.cancel();
                                        playRankUpSound(newRank.rank);
                                        setCardRankUpEffect({
                                            oldRank: prevRank.label || 'NORMAL',
                                            newRank: newRank.label,
                                            newRankKey: newRank.rank,
                                            newRankColor: newRank.borderColor,
                                            snapshotPoints: d.gacha.card_total_points,
                                            snapshotPhrase: snapCard ? { english: snapCard.english, japanese: snapCard.japanese, category: snapCard.category } : null,
                                            key: effectKey(),
                                        });
                                    }, 500);
                                }
                            }
                        };

                        // 連荘 Chain state transitions — 1/16 random kakuhen entry
                        if (chainUnlockedRef.current && getSettings().feverEnabled) {
                        const currentFever = feverRef.current;
                        const isWin = tier !== 'MISS';
                        const isMiss = tier === 'MISS';
                        if (isMiss) {
                            if (currentFever.active) {
                                const exitStreak = currentFever.streak;
                                stopFeverBGM(feverDroneRef.current);
                                feverDroneRef.current = null;
                                setChainState({ count: 0, mode: 'normal', key: effectKey() });
                                feverRef.current = { active: false, streak: 0 };
                                setFeverFlash('exit');
                                setFeverExitEffect({ streak: exitStreak });
                                playFeverExitSound();
                            }
                        } else if (isWin) {
                            if (currentFever.active) {
                                // Already in chain: increment streak normally
                                const newCount = currentFever.streak + 1;
                                const oldMode = getChainMode(currentFever.streak);
                                const newMode = getChainMode(newCount);
                                setChainState({ count: newCount, mode: newMode, key: effectKey() });
                                feverRef.current = { active: newMode !== 'normal', streak: newCount };
                                if (newMode !== oldMode && newMode !== 'normal') {
                                    fireChainTransition({ from: oldMode, to: newMode, key: effectKey() });
                                    playFeverEntrySound();
                                } else {
                                    playFeverChainHit(newCount);
                                }
                            } else {
                                // Normal mode: 1/16 確変 roll
                                const kakuhenRoll = Math.random() < (1 / 16);
                                if (kakuhenRoll) {
                                    const newCount = 3;
                                    const newMode: ChainMode = 'kakuhen';
                                    setChainState({ count: newCount, mode: newMode, key: effectKey() });
                                    feverRef.current = { active: true, streak: newCount };
                                    fireChainTransition({ from: 'normal', to: 'kakuhen', key: effectKey() });
                                    setFeverFlash('enter');
                                    playFeverEntrySound();
                                    if (feverDroneRef.current) { stopFeverBGM(feverDroneRef.current); }
                                    feverDroneRef.current = startFeverBGM();
                                }
                            }
                        }
                        }

                        if (slotUnlockedRef.current && slotOn) {
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
                                key: effectKey(),
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
                                key: effectKey(),
                            });
                        }
                    }
                }
            })
            .catch(() => { });
    }, [playerLevel, cardPoints]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (IS_PUBLIC) {
                    // 公開RPG (3004): ローカルデータ。DB不要
                    // 毎日10個ずつ、月全体に分散
                    const now = new Date();
                    const y = now.getFullYear();
                    const m = now.getMonth();
                    const daysInMonth = new Date(y, m + 1, 0).getDate();
                    const makeDateStr = (day: number) =>
                        `${y}-${String(m + 1).padStart(2, '0')}-${String(Math.min(day, daysInMonth)).padStart(2, '0')}T00:00:00.000Z`;

                    if (dataMode === 'phrases') {
                        // フレーズモード: 5minの150フレーズを10個/日で分散
                        const allPhrases: Phrase[] = [];
                        let idx = 0;
                        for (const lesson of DAILY_LESSONS) {
                            for (const p of lesson.phrases) {
                                const day = Math.floor(idx / 10) + 1;
                                allPhrases.push({
                                    id: `phrase_${idx}`,
                                    english: p.english,
                                    japanese: p.japanese,
                                    category: lesson.label || 'phrase',
                                    date: makeDateStr(day),
                                });
                                idx++;
                            }
                        }
                        // 5minから追加登録されたフレーズも読み込む
                        try {
                            const fiveMinRaw = localStorage.getItem('5min-training-phrases');
                            if (fiveMinRaw) {
                                const fiveMinPhrases: { english: string; japanese: string; category: string; date: string }[] = JSON.parse(fiveMinRaw);
                                fiveMinPhrases.forEach((p, i) => {
                                    const day = Math.floor((idx + i) / 10) + 1;
                                    allPhrases.push({
                                        id: `5min_${i}`,
                                        english: p.english,
                                        japanese: p.japanese,
                                        category: p.category || '5min',
                                        date: p.date || makeDateStr(day),
                                    });
                                });
                            }
                        } catch { /* ignore */ }
                        setPhrases(allPhrases);
                    } else if (dataMode === 'toeic') {
                        // TOEICモード: tonio-words 498語をレベル別に10個/日で分散
                        // レベルごとに連続配置 (L1: day1-15, L2: day16-33, L3: day34-51)
                        const toeicLevel = (() => {
                            try {
                                const saved = localStorage.getItem('toeic-target-level');
                                if (saved) return parseInt(saved) as 1 | 2 | 3;
                            } catch { /* */ }
                            return null;
                        })();
                        const wordsToUse = toeicLevel
                            ? TOEIC_WORDS.filter(w => w.level === toeicLevel)
                            : TOEIC_WORDS;
                        const mapped: Phrase[] = wordsToUse.map((w, i) => ({
                            id: `toeic_${w.level}_${w.lesson}_${i}`,
                            english: w.en,
                            japanese: w.ja + ` (${w.pron})`,
                            category: TOEIC_CATEGORIES[w.cat]?.label || w.cat,
                            date: makeDateStr(Math.floor(i / 10) + 1),
                        }));
                        setPhrases(mapped);
                    } else {
                        // 単語モード: QUEST_WORDSの125個を10個/日で分散
                        const mapped: Phrase[] = QUEST_WORDS.map((w, i) => ({
                            id: `quest_${i}`,
                            english: w.en,
                            japanese: w.ja + ` (${w.pron})`,
                            category: w.cat,
                            date: makeDateStr(Math.floor(i / 10) + 1),
                        }));
                        setPhrases(mapped);
                    }
                    try {
                        const saved = localStorage.getItem('quest-mastery');
                        if (saved) setPhraseMastery(JSON.parse(saved));
                    } catch { /* */ }
                    try {
                        const savedCP = localStorage.getItem('rpg_card_points');
                        if (savedCP) setCardPoints(JSON.parse(savedCP));
                    } catch { /* */ }
                    setVoiceRecordings({});
                    setPhraseLinks({});
                } else if (dataMode === 'words') {
                    // Word mode: load from user-words API
                    const [wordsRes, masteryRes] = await Promise.all([
                        fetch('/api/user-words'),
                        fetch('/api/user-words?mastery=true'),
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
                    // Phrase mode: original loading
                    const [phrasesRes, masteryRes, recordingsRes, linksRes] = await Promise.all([
                        fetch('/api/phrases'),
                        fetch('/api/phrases/mastery'),
                        fetch('/api/voice-recordings'),
                        fetch('/api/phrases/links'),
                    ]);
                    const phrasesData = await phrasesRes.json();
                    const masteryData = await masteryRes.json();
                    const recordingsData = await recordingsRes.json();
                    const linksData = await linksRes.json();
                    if (phrasesData.success) setPhrases(phrasesData.phrases);
                    if (masteryData.success) {
                        setPhraseMastery(masteryData.mastery || {});
                        if (masteryData.lastLeveled) setPhraseLastLeveled(masteryData.lastLeveled);
                        if (masteryData.cardPoints) setCardPoints(masteryData.cardPoints);
                    }
                    if (recordingsData.success) setVoiceRecordings(recordingsData.recordings || {});
                    if (linksData.success) {
                        const map: Record<string, PhraseLink[]> = {};
                        for (const l of (linksData.links || [])) {
                            if (!map[l.phrase_id]) map[l.phrase_id] = [];
                            map[l.phrase_id].push(l);
                        }
                        setPhraseLinks(map);
                    }
                }
            } finally {
                setLoading(false);
            }
        };
        setLoading(true);
        fetchData();

        // Load voices for speech synthesis
        const loadVoices = () => {
            const allVoices = window.speechSynthesis.getVoices();
            const enVoices = allVoices.filter(v => v.lang.startsWith('en'));
            setVoices(enVoices);
        };
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => window.speechSynthesis.cancel();
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
            setTimeout(() => setHighlightPhraseId(null), 3000);
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
            const [y, m] = targetDate.split('-').map(Number);
            if (currentMonth.getFullYear() !== y || currentMonth.getMonth() + 1 !== m) {
                setCurrentMonth(new Date(y, m - 1, 1));
            }
            setSelectedDate(targetDate);
        }

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
    const displayedCardRef = useRef(displayedCard);
    useEffect(() => { displayedCardRef.current = displayedCard; }, [displayedCard]);

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

    // Exit review mode on Escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && viewMode === 'review') setViewMode('calendar');
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
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
                setDailyLevelUpEffect({ level: currentMilestoneIndex + 1, title: m.title, color: m.color, key: effectKey() });
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
                        <div style={{
                            background: getCardWindowBg(currentCardRank.rank),
                            borderRadius: '12px',
                            border: `1px solid ${getFrameAccent(currentCardRank.rank)}30`,
                            margin: '0',
                            padding: isFullReview ? '16px' : '10px',
                            position: 'relative',
                            zIndex: 3,
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

                            {/* Flavor Text — register to user phrases */}
                            {displayedCard && (() => {
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

                            {/* Linked notes on this card */}
                            {displayedCard && (phraseLinks[displayedCard.id] || []).length > 0 && (
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

                            {/* Level Up button — full width, prominent */}
                            {displayedCard && (() => {
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
                                                        setCardCelebration({ phrase: displayedCard, key: effectKey() });
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
                                                                                            const k = effectKey();
                                                                                            playLevelSound(lvA);
                                                                                            setPointEffect({ points: nc.lv, color: nc.color, gradFrom: nc.gradFrom, gradTo: nc.gradTo, levelName: nc.name, key: k });
                                                                                            setCalendarPulse({ dateKey: displayedCard.date.split('T')[0], points: nc.lv, gradFrom: nc.gradFrom, color: nc.color, level: lvA, key: k });
                                                                                            setCardCelebration({ phrase: displayedCard, key: k });
                                                                                            // Register card to 布陣バトル
                                                                                            const pts = cardPoints[pid] || 0;
                                                                                            const rank = pts >= 250 ? 'LEGENDARY' : pts >= 100 ? 'HOLOGRAPHIC' : pts >= 50 ? 'GOLD' : pts >= 20 ? 'SILVER' : pts >= 5 ? 'BRONZE' : 'NORMAL';
                                                                                            setPuzzleDropCard({ phraseId: pid, english: displayedCard.english, japanese: displayedCard.japanese, element: displayedCard.category, rank, points: pts, bstTotal: calcBstTotal(pid), key: k });
                                                                                        }
                                                                                        if (data.recording.url) {
                                                                                            setRecordAutoPlayId(pid);
                                                                                            const a = new Audio(data.recording.url);
                                                                                            a.onended = () => setRecordAutoPlayId(null);
                                                                                            a.play().catch(() => setRecordAutoPlayId(null));
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
                                            <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'stretch', position: 'relative' }}>
                                                {/* First-time hint: big flashy arrow + label */}
                                                {todayXP === 0 && !isLockedToday && !cardCelebration && (<>
                                                    {/* Spotlight overlay dimming everything else */}
                                                    <div style={{
                                                        position: 'fixed', inset: 0,
                                                        background: 'radial-gradient(ellipse 400px 200px at 50% 85%, transparent 30%, rgba(0,0,0,0.45) 100%)',
                                                        zIndex: 99, pointerEvents: 'none',
                                                    }} />
                                                    {/* Floating hint banner */}
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '-58px', left: '50%', transform: 'translateX(-50%)',
                                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                                                        animation: 'onboard-hint 1.2s ease-in-out infinite',
                                                        pointerEvents: 'none',
                                                        zIndex: 100,
                                                    }}>
                                                        <div style={{
                                                            background: 'linear-gradient(135deg, #D4AF37, #F59E0B)',
                                                            color: '#fff',
                                                            padding: '6px 20px',
                                                            borderRadius: '20px',
                                                            fontSize: '15px', fontWeight: '900',
                                                            letterSpacing: '2px',
                                                            whiteSpace: 'nowrap',
                                                            boxShadow: '0 4px 20px rgba(212,175,55,0.5), 0 0 40px rgba(212,175,55,0.25)',
                                                            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                                                        }}>
                                                            TAP HERE!
                                                        </div>
                                                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" style={{ filter: 'drop-shadow(0 2px 4px rgba(212,175,55,0.5))' }}>
                                                            <path d="M12 16L2 4h20L12 16z" fill="#D4AF37"/>
                                                        </svg>
                                                    </div>
                                                </>)}
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
                                                            const k = effectKey();
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
                                                            setCardCelebration({ phrase: currentPhrase, key: effectKey() });
                                                        }
                                                        cycleMastery(currentPhrase.id, isLevelUp);
                                                    }}
                                                    className={todayXP === 0 && !isLockedToday ? 'onboard-btn-pulse' : undefined}
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

                        {/* Actions row: 削除 / 編集 / 研究 / 録音 */}
                        {displayedCard && (
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
                        {showQuickAdd && displayedCard && (
                            <div style={{
                                display: 'flex',
                                gap: '8px',
                                maxWidth: isFullReview ? '400px' : 'none',
                                margin: '0 auto',
                                width: '100%',
                                marginBottom: isFullReview ? '24px' : '12px',
                            }}>
                                <input
                                    type="text"
                                    value={quickAddEnglish}
                                    onChange={e => setQuickAddEnglish(e.target.value)}
                                    placeholder="new phrase..."
                                    autoFocus
                                    onKeyDown={e => { if (e.key === 'Enter') handleQuickAdd(); }}
                                    style={{
                                        flex: 1,
                                        padding: isFullReview ? '10px 14px' : '8px 10px',
                                        borderRadius: '8px',
                                        border: '1px solid #ddd',
                                        fontSize: isFullReview ? '14px' : '13px',
                                        outline: 'none',
                                    }}
                                />
                                <button
                                    onClick={handleQuickAdd}
                                    disabled={quickAddSubmitting || !quickAddEnglish.trim()}
                                    style={{
                                        padding: isFullReview ? '10px 20px' : '8px 14px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        backgroundColor: quickAddSubmitting || !quickAddEnglish.trim() ? '#ddd' : '#D4AF37',
                                        color: quickAddSubmitting || !quickAddEnglish.trim() ? '#999' : '#000',
                                        fontSize: isFullReview ? '13px' : '12px',
                                        fontWeight: '600',
                                        cursor: quickAddSubmitting || !quickAddEnglish.trim() ? 'not-allowed' : 'pointer',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {quickAddSubmitting ? '...' : 'Save'}
                                </button>
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
        // Block interaction after god mode dismissed (waiting for congrats overlay)
        if (firstRunGodDismissed.current || firstRunComplete) return false;
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
            trackActiveDay();

            // Send reviewed word to runner word stream
            const reviewedPhrase = phrases.find(p => p.id === phraseId);
            if (reviewedPhrase) {
                setLastReviewedWord({ text: reviewedPhrase.english, key: effectKey() });
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
                    key: effectKey(),
                });
            }
        }

        try {
            if (IS_PUBLIC) {
                // 3004: localStorageに保存
                const updated = { ...phraseMastery, [phraseId]: next };
                localStorage.setItem('quest-mastery', JSON.stringify(updated));
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

        trackReviewCount();
        return true;
    }, [phraseMastery, voiceRecordings, phraseLinks, phraseLastLeveled, clientToday, phraseDateMap, dataMode, trackReviewCount]);

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
        if (!displayedCard || cardCelebration || cardRankUpEffect || firstRunComplete) return;
        if (displayedCard.id === prevAutoPlayIdRef.current) return;
        prevAutoPlayIdRef.current = displayedCard.id;
        playPhrase(displayedCard);
    }, [displayedCard, cardCelebration, cardRankUpEffect, firstRunComplete, playPhrase]);

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
                        const k = effectKey();
                        playLevelSound(levelAfter);
                        setPointEffect({ points: nc.lv, color: nc.color, gradFrom: nc.gradFrom, gradTo: nc.gradTo, levelName: nc.name, key: k });
                        if (displayedCard) {
                            setCalendarPulse({ dateKey: displayedCard.date.split('T')[0], points: nc.lv, gradFrom: nc.gradFrom, color: nc.color, level: levelAfter, key: k });
                            setCardCelebration({ phrase: displayedCard, key: k });
                            // Register card to 布陣バトル
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

    if (loading) {
        return (
            <div style={{ height: '100%', backgroundColor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
                Loading...
            </div>
        );
    }

    return (
        <div style={{
            backgroundColor: '#f5f5f5',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* ── TOEIC Level Picker Overlay ── */}
            {showToeicLevelPicker && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 10000,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 20,
                }} onClick={(e) => { if (e.target === e.currentTarget) setShowToeicLevelPicker(false); }}>
                    <div style={{
                        backgroundColor: '#fff', borderRadius: 20, padding: '32px 24px',
                        maxWidth: 400, width: '100%',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    }}>
                        <div style={{
                            fontSize: 20, fontWeight: 800, color: '#1C1917',
                            textAlign: 'center', marginBottom: 8,
                        }}>
                            TOEIC何点を目指す？
                        </div>
                        <div style={{
                            fontSize: 12, color: '#78716C', textAlign: 'center', marginBottom: 24,
                        }}>
                            レベルに合った単語が出題されます
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {TOEIC_LEVELS.map(lv => (
                                <button
                                    key={lv.level}
                                    onClick={() => {
                                        setToeicTargetLevel(lv.level as 1 | 2 | 3);
                                        localStorage.setItem('toeic-target-level', String(lv.level));
                                        setShowToeicLevelPicker(false);
                                        setDataMode('toeic');
                                        localStorage.setItem('training-data-mode', 'toeic');
                                        setViewMode('calendar');
                                    }}
                                    style={{
                                        padding: '16px 20px', borderRadius: 14,
                                        border: `2px solid ${lv.color}`,
                                        backgroundColor: lv.bg,
                                        cursor: 'pointer', textAlign: 'left',
                                        transition: 'all 0.15s',
                                        display: 'flex', alignItems: 'center', gap: 16,
                                    }}
                                >
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                                        background: `linear-gradient(135deg, ${lv.color}, ${lv.color}CC)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 18, fontWeight: 900, color: '#fff',
                                        boxShadow: `0 4px 12px ${lv.color}40`,
                                    }}>
                                        L{lv.level}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: '#1C1917' }}>
                                            {lv.target}
                                        </div>
                                        <div style={{ fontSize: 12, color: '#78716C', marginTop: 2 }}>
                                            {lv.name} -- {lv.words}語
                                        </div>
                                    </div>
                                </button>
                            ))}
                            <button
                                onClick={() => {
                                    setToeicTargetLevel(null);
                                    localStorage.removeItem('toeic-target-level');
                                    setShowToeicLevelPicker(false);
                                    setDataMode('toeic');
                                    localStorage.setItem('training-data-mode', 'toeic');
                                    setViewMode('calendar');
                                }}
                                style={{
                                    padding: '12px 20px', borderRadius: 14,
                                    border: '1px solid #E7E5E4', backgroundColor: '#fff',
                                    cursor: 'pointer', textAlign: 'center',
                                    fontSize: 13, color: '#78716C', fontWeight: 600,
                                }}
                            >
                                全レベルまとめて（498語）
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Onboarding Tutorial Overlay ── */}
            {showOnboarding && (() => {
                const steps = [
                    {
                        title: 'トレーニングへようこそ',
                        body: 'ここはこのアプリの核です。\n\n5min英会話やQuestで出会ったフレーズを、ここで繰り返しレビューして「自分の言葉」にしていきます。\n\n覚えるんじゃなくて、体に染み込ませる。それがトレーニングです。',
                        color: '#D4AF37',
                    },
                    {
                        title: 'カードを育てる',
                        body: '登録したフレーズは「カード」になります。\n\nカードにはチャクラレベル（Lv.1〜7）があり、タップするとレベルが上がります。\n\nLv.1 種 → Lv.2 芽 → Lv.3 鍛 → Lv.4 得\n\nLv.4「得」まで来たら、もう考えなくても英語が出てくる状態。それが目標です。',
                        color: '#10B981',
                    },
                    {
                        title: 'スロットマシン',
                        body: 'レビューに正解するとスロットが回ります。\n\nMISS → BONUS → GREAT → SUPER → MEGA → LEGENDARY\n\n連続正解するとチェーンが繋がって、ボーナス倍率がどんどん上がります。ゲーム感覚で続けられる仕組みです。',
                        color: '#F59E0B',
                    },
                    {
                        title: 'カレンダーで毎日確認',
                        body: 'フレーズは日付ごとに割り振られています。\n\n今日の日付をタップすると、今日レビューすべきカードが表示されます。\n\n各日の色付きバーは、その日のフレーズの習熟度を表しています。バーが上に伸びるほど、よく覚えているということです。',
                        color: '#3B82F6',
                    },
                    {
                        title: 'まずは1枚から',
                        body: 'フレーズがまだない場合は、まず「5min英会話」でレッスンを1つやってみてください。完了画面で「+登録」を押すとここに追加されます。\n\n焦らなくて大丈夫。\n1日10分。それだけで変わります。',
                        color: '#8B5CF6',
                    },
                ];
                const step = steps[onboardingStep];
                return (
                    <div style={{
                        position: 'fixed', inset: 0, zIndex: 10000,
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: 20,
                    }} onClick={(e) => { if (e.target === e.currentTarget) dismissOnboarding(); }}>
                        <div style={{
                            backgroundColor: '#fff', borderRadius: 20, padding: '32px 28px',
                            maxWidth: 420, width: '100%',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                            position: 'relative',
                        }}>
                            {/* Step indicator */}
                            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 24 }}>
                                {steps.map((_, i) => (
                                    <div key={i} style={{
                                        width: i === onboardingStep ? 24 : 8, height: 8, borderRadius: 4,
                                        backgroundColor: i <= onboardingStep ? step.color : '#E7E5E4',
                                        transition: 'all 0.3s ease',
                                    }} />
                                ))}
                            </div>

                            {/* Step number */}
                            <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                width: 40, height: 40, borderRadius: '50%',
                                backgroundColor: step.color, color: '#fff',
                                fontSize: 16, fontWeight: 700, margin: '0 auto 16px',
                            }}>
                                {onboardingStep + 1}
                            </div>

                            {/* Title */}
                            <h2 style={{
                                fontSize: 20, fontWeight: 700, color: '#292524',
                                textAlign: 'center', margin: '0 0 16px',
                            }}>
                                {step.title}
                            </h2>

                            {/* Body */}
                            <p style={{
                                fontSize: 13, color: '#57534E', lineHeight: 2,
                                textAlign: 'center', margin: '0 0 28px',
                                whiteSpace: 'pre-line',
                            }}>
                                {step.body}
                            </p>

                            {/* Buttons */}
                            <div style={{ display: 'flex', gap: 10 }}>
                                {onboardingStep > 0 && (
                                    <button
                                        onClick={() => setOnboardingStep(onboardingStep - 1)}
                                        style={{
                                            flex: 1, padding: '12px 0', borderRadius: 12,
                                            border: '1px solid #E7E5E4', backgroundColor: 'transparent',
                                            color: '#78716C', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                                        }}
                                    >
                                        戻る
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        if (onboardingStep < steps.length - 1) {
                                            setOnboardingStep(onboardingStep + 1);
                                        } else {
                                            dismissOnboarding();
                                        }
                                    }}
                                    style={{
                                        flex: 1, padding: '12px 0', borderRadius: 12,
                                        border: 'none', backgroundColor: step.color,
                                        color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                        boxShadow: `0 4px 16px ${step.color}40`,
                                    }}
                                >
                                    {onboardingStep < steps.length - 1 ? '次へ' : '始める'}
                                </button>
                            </div>

                            {/* Skip */}
                            <button
                                onClick={dismissOnboarding}
                                style={{
                                    display: 'block', margin: '12px auto 0',
                                    background: 'none', border: 'none',
                                    color: '#A8A29E', fontSize: 11, cursor: 'pointer',
                                }}
                            >
                                スキップ
                            </button>
                        </div>
                    </div>
                );
            })()}

            {/* Keyframes loaded from training-animations.css */}


            {/* Chain mode pulsing background overlay */}
            {feverMode.active && viewMode === 'review' && (
                <div style={{
                    position: 'fixed', inset: 0,
                    background: chainState.mode === 'god'
                        ? 'linear-gradient(135deg, #7C3AED 0%, #EC4899 33%, #D4AF37 66%, #7C3AED 100%)'
                        : chainState.mode === 'gekiatsu'
                        ? 'linear-gradient(135deg, #DC2626 0%, #F97316 50%, #DC2626 100%)'
                        : 'linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #D4AF37 100%)',
                    backgroundSize: '200% 200%',
                    animation: `fever-pulse ${chainState.mode === 'god' ? '0.8' : chainState.mode === 'gekiatsu' ? '1.2' : '1.5'}s ease-in-out infinite, card-holo-shimmer 3s ease-in-out infinite`,
                    pointerEvents: 'none', zIndex: 50,
                }} />
            )}

            {/* FEVER edge glow — pulsing inset shadow on all four edges */}
            {feverMode.active && viewMode === 'review' && (
                <div style={{
                    position: 'fixed', inset: 0,
                    animation: 'fever-border-glow 1.5s ease-in-out infinite',
                    pointerEvents: 'none', zIndex: 51,
                    borderRadius: 0,
                }} />
            )}

            {/* Chain mode floating particles */}
            {feverMode.active && viewMode === 'review' && (
                <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 52, overflow: 'hidden' }}>
                    {Array.from({ length: chainState.mode === 'god' ? 30 : chainState.mode === 'gekiatsu' ? 24 : 18 }).map((_, i) => {
                        const colors = chainState.mode === 'god'
                            ? ['#7C3AED', '#EC4899', '#D4AF37', '#06B6D4', '#A855F7']
                            : chainState.mode === 'gekiatsu'
                            ? ['#DC2626', '#F97316', '#FBBF24', '#EF4444', '#F59E0B']
                            : ['#D4AF37', '#F59E0B', '#FBBF24', '#EAB308', '#D4AF37'];
                        const size = 3 + (i % 4) * 2;
                        const left = 5 + (i * 5.3) % 90;
                        const dur = 3 + (i % 5) * 0.5;
                        const delay = (i * 0.4) % 3;
                        const drift = (i % 2 === 0 ? 1 : -1) * (10 + (i % 6) * 5);
                        return (
                            <div key={i} style={{
                                position: 'absolute',
                                bottom: '-10px',
                                left: `${left}%`,
                                width: `${size}px`,
                                height: `${size}px`,
                                borderRadius: '50%',
                                backgroundColor: colors[i % colors.length],
                                boxShadow: `0 0 ${size * 2}px ${colors[i % colors.length]}80`,
                                // @ts-ignore
                                '--px-drift': `${drift}px`,
                                animation: `fever-particle-rise ${dur}s ease-out infinite`,
                                animationDelay: `${delay}s`,
                                willChange: 'transform',
                            } as React.CSSProperties} />
                        );
                    })}
                </div>
            )}

            {/* Chain mode badge + counter (fixed top-center) */}
            {feverMode.active && viewMode === 'review' && (
                <div style={{
                    position: 'fixed',
                    top: isMobile ? '8px' : '16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    zIndex: 9998,
                    pointerEvents: 'none',
                    animation: chainState.mode === 'god' ? 'fever-badge-pulse 0.8s ease-in-out infinite' : 'fever-badge-pulse 1.5s ease-in-out infinite',
                }}>
                    <div style={{
                        background: CHAIN_MODE_CONFIG[chainState.mode].gradient,
                        color: '#fff',
                        padding: isMobile ? '8px 20px' : '10px 32px',
                        borderRadius: '24px',
                        fontWeight: '900',
                        fontSize: isMobile ? '18px' : '24px',
                        letterSpacing: '4px',
                        boxShadow: chainState.mode === 'god'
                            ? '0 0 30px rgba(124,58,237,0.6), 0 0 60px rgba(236,72,153,0.3), 0 0 90px rgba(212,175,55,0.2)'
                            : `0 0 30px ${CHAIN_MODE_CONFIG[chainState.mode].color}99, 0 0 60px ${CHAIN_MODE_CONFIG[chainState.mode].color}44`,
                        textShadow: '0 0 10px rgba(255,255,255,0.6)',
                    }}>
                        {CHAIN_MODE_CONFIG[chainState.mode].labelJa}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {chainState.count > 0 && (
                            <div key={chainState.key} style={{
                                background: 'rgba(0,0,0,0.8)',
                                color: chainState.mode === 'god' ? '#C084FC' : chainState.mode === 'gekiatsu' ? '#FCD34D' : '#F97316',
                                padding: isMobile ? '5px 12px' : '7px 16px',
                                borderRadius: '14px',
                                fontWeight: '900',
                                fontSize: isMobile ? '15px' : '20px',
                                letterSpacing: '1px',
                                animation: `fever-chain-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)${chainState.count >= 8 ? ', chain-counter-shake 0.3s ease-in-out infinite' : ''}`,
                                textShadow: chainState.mode === 'god' ? '0 0 8px #C084FC80' : chainState.count >= 5 ? '0 0 8px #FCD34D80' : 'none',
                            }}>
                                x{chainState.count} CHAIN
                            </div>
                        )}
                        <div style={{
                            background: 'rgba(0,0,0,0.6)',
                            color: '#FCD34D',
                            padding: isMobile ? '4px 8px' : '5px 10px',
                            borderRadius: '8px',
                            fontWeight: '700',
                            fontSize: isMobile ? '10px' : '12px',
                            letterSpacing: '0.5px',
                        }}>
                            GP {CHAIN_MODE_CONFIG[chainState.mode].spMultiplier}
                        </div>
                    </div>
                </div>
            )}

            {/* Chain mode transition banner (確変突入! 激熱突入! 神降臨!) */}
            {chainTransition && (() => {
                const isGodTransition = chainTransition.to === 'god';
                const showExplain = isFirstRun;
                const explainText = chainTransition.to === 'kakuhen'
                    ? '3連鎖達成! スロット確率UP + GP1.5倍!'
                    : chainTransition.to === 'gekiatsu'
                    ? '5連鎖! さらに確率UP! GP2倍!'
                    : '10連鎖で神降臨! GP3倍! 最強モード!';
                return (
                <div key={chainTransition.key} style={{
                    position: 'fixed', inset: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
                    zIndex: 10001, pointerEvents: showExplain ? 'auto' : 'none',
                    background: showExplain ? 'rgba(0,0,0,0.5)' : 'transparent',
                    cursor: showExplain ? 'pointer' : 'default',
                }}
                    onClick={showExplain ? () => {
                        fireChainTransition(null);
                        if (isGodTransition) {
                            // IMMEDIATELY freeze everything: stop BGM, cancel all pending effects
                            firstRunGodDismissed.current = true;
                            firstRunGodDismissedAt.current = Date.now();
                            // Kill BGM right now (don't fade)
                            if (feverDroneRef.current) {
                                try { feverDroneRef.current.pause(); feverDroneRef.current.currentTime = 0; } catch {}
                                feverDroneRef.current = null;
                            }
                            // Cancel any pending gacha/slot
                            if (pendingGachaRef.current) { clearTimeout(pendingGachaRef.current); pendingGachaRef.current = null; }
                            slotSpinTimers.current.forEach(clearTimeout);
                            slotSpinTimers.current = [];
                            // Force clear all visual effects
                            setGachaEffect(null);
                            setSlotReels(null);
                            setChainState({ count: 0, mode: 'normal', key: effectKey() });
                            feverRef.current = { active: false, streak: 0 };
                            setFeverFlash(null);
                            setFeverExitEffect(null);
                            window.speechSynthesis.cancel();
                        }
                    } : undefined}
                >
                    <div
                        onAnimationEnd={() => { if (!showExplain) fireChainTransition(null); }}
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
                        animation: showExplain ? 'fever-entry-slam-hold 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards' : 'fever-entry-slam 1s cubic-bezier(0.34,1.56,0.64,1) forwards',
                    }}>
                        {chainTransition.to === 'kakuhen' ? '確変突入!' : chainTransition.to === 'gekiatsu' ? '激熱突入!' : '神 降 臨 !'}
                    </div>
                    {showExplain && (
                        <div style={{
                            animation: 'fever-entry-slam-hold 0.8s cubic-bezier(0.34,1.56,0.64,1) 0.3s both',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                        }}>
                            <div style={{
                                color: '#fff',
                                fontSize: isMobile ? '15px' : '18px',
                                fontWeight: '700',
                                textAlign: 'center',
                                lineHeight: 1.8,
                                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                maxWidth: '400px',
                            }}>
                                {explainText}
                            </div>
                            <div style={{
                                color: 'rgba(255,255,255,0.6)',
                                fontSize: '13px',
                                fontWeight: '600',
                                animation: 'onboard-hint 1.5s ease-in-out infinite',
                            }}>
                                tap to continue
                            </div>
                        </div>
                    )}
                </div>
                );
            })()}


            {/* First-run complete: multi-phase congratulations + transition to real mode */}
            {firstRunComplete && (
                <div style={{
                    position: 'fixed', inset: 0, zIndex: 10002,
                    background: firstRunPhase === 'realmode'
                        ? 'rgba(0,0,0,0.95)'
                        : 'rgba(0,0,0,0.88)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '24px', cursor: 'pointer',
                    animation: 'fever-entry-slam-hold 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards',
                    transition: 'background 0.5s ease',
                }}
                    onClick={() => {
                        if (firstRunPhase === 'legendary') {
                            setFirstRunPhase('realmode');
                        } else if (firstRunPhase === 'realmode') {
                            setFirstRunPhase('guide');
                        } else {
                            // Final phase: dismiss and navigate to card collection
                            localStorage.setItem('quest-first-run-done', '1');
                            setIsFirstRun(false);
                            isFirstRunRef.current = false;
                            setFirstRunComplete(false);
                            setFirstRunPhase('legendary');
                            // Navigate to card collection so user sees their LEGENDARY card
                            router.push('/english/training/card-preview');
                        }
                    }}
                >
                    <div style={{
                        maxWidth: 420, width: '100%', textAlign: 'center',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
                    }}>
                        {/* Phase 1: LEGENDARY card celebration */}
                        {firstRunPhase === 'legendary' && (<>
                            <div style={{
                                width: 100, height: 130, borderRadius: 14,
                                background: 'linear-gradient(135deg, #1C1917, #292524, #1C1917)',
                                border: '3px solid #D4AF37',
                                boxShadow: '0 0 40px rgba(212,175,55,0.6), 0 0 80px rgba(212,175,55,0.3), inset 0 0 30px rgba(212,175,55,0.1)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                                animation: 'onboard-pulse 2s ease-in-out infinite',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(135deg, transparent 30%, rgba(212,175,55,0.15) 50%, transparent 70%)',
                                    animation: 'card-holo-shimmer 3s ease-in-out infinite',
                                }} />
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em', zIndex: 1 }}>
                                    LEGENDARY
                                </div>
                                <div style={{ fontSize: 24, fontWeight: 900, color: '#F6E27A', textShadow: '0 0 12px rgba(212,175,55,0.8)', zIndex: 1 }}>
                                    L
                                </div>
                                <div style={{ fontSize: 8, fontWeight: 600, color: '#A8A29E', letterSpacing: '0.1em', zIndex: 1 }}>
                                    BST 600
                                </div>
                            </div>

                            <div style={{
                                fontSize: 24, fontWeight: 900, color: '#D4AF37',
                                letterSpacing: '0.15em',
                                textShadow: '0 0 30px rgba(212,175,55,0.6)',
                            }}>
                                LEGENDARY
                            </div>

                            <div style={{
                                fontSize: 15, color: '#A8A29E', lineHeight: 2, fontWeight: 400,
                            }}>
                                最高ランクのカードが誕生しました。
                            </div>

                            <div style={{
                                marginTop: 12, padding: '14px 48px', borderRadius: 14,
                                background: 'linear-gradient(135deg, #D4AF37, #B8960C)',
                                color: '#000', fontSize: 16, fontWeight: 800,
                                letterSpacing: '0.1em',
                                boxShadow: '0 4px 24px rgba(212,175,55,0.5)',
                            }}>
                                次へ
                            </div>
                        </>)}

                        {/* Phase 2: Reality check — normal mode explanation */}
                        {firstRunPhase === 'realmode' && (<>
                            <div style={{
                                display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center',
                                marginBottom: 8,
                            }}>
                                {/* Demo mode icon */}
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                                    opacity: 0.4,
                                }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12,
                                        background: 'linear-gradient(135deg, #D4AF37, #F6E27A)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 20, fontWeight: 900, color: '#fff',
                                    }}>D</div>
                                    <div style={{ fontSize: 10, color: '#78716C' }}>DEMO</div>
                                </div>
                                {/* Arrow */}
                                <div style={{
                                    fontSize: 24, color: '#D4AF37', fontWeight: 900,
                                    animation: 'onboard-hint 1.5s ease-in-out infinite',
                                }}>
                                    &rarr;
                                </div>
                                {/* Real mode icon */}
                                <div style={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                                }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12,
                                        background: 'linear-gradient(135deg, #DC2626, #F97316)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 20, fontWeight: 900, color: '#fff',
                                        boxShadow: '0 0 20px rgba(220,38,38,0.4)',
                                    }}>R</div>
                                    <div style={{ fontSize: 10, color: '#fff', fontWeight: 700 }}>REAL</div>
                                </div>
                            </div>

                            <div style={{
                                fontSize: 20, fontWeight: 800, color: '#fff',
                                letterSpacing: '0.1em',
                            }}>
                                ここからが本番
                            </div>

                            <div style={{
                                fontSize: 14, color: '#A8A29E', lineHeight: 2.2, fontWeight: 400,
                                maxWidth: 340,
                            }}>
                                <span style={{ color: '#EF4444', fontWeight: 700 }}>MISS</span>が出ます。連荘が途切れます。<br />
                                確変は<span style={{ color: '#D4AF37', fontWeight: 600 }}>1/16</span>のランダム抽選。<br />
                                さっきみたいに簡単にはいきません。<br /><br />
                                <span style={{ color: '#fff', fontWeight: 600 }}>
                                    だから面白い。
                                </span>
                            </div>

                            <div style={{
                                marginTop: 12, padding: '14px 48px', borderRadius: 14,
                                background: 'linear-gradient(135deg, #DC2626, #B91C1C)',
                                color: '#fff', fontSize: 16, fontWeight: 800,
                                letterSpacing: '0.1em',
                                boxShadow: '0 4px 24px rgba(220,38,38,0.4)',
                            }}>
                                次へ
                            </div>
                        </>)}

                        {/* Phase 3: What to do next */}
                        {firstRunPhase === 'guide' && (<>
                            <div style={{
                                fontSize: 20, fontWeight: 800, color: '#10B981',
                                letterSpacing: '0.1em',
                            }}>
                                次にやること
                            </div>

                            <div style={{
                                display: 'flex', flexDirection: 'column', gap: 16,
                                width: '100%', maxWidth: 340,
                            }}>
                                {[
                                    { num: '1', text: 'カレンダーから今日のカードをレビュー', sub: 'タップでチャクラレベルUP', color: '#3B82F6' },
                                    { num: '2', text: 'スロットで当たりを狙う', sub: '正解するたびスロットが回る', color: '#F59E0B' },
                                    { num: '3', text: '全カードLEGENDARYを目指す', sub: 'これが最終目標', color: '#D4AF37' },
                                ].map(item => (
                                    <div key={item.num} style={{
                                        display: 'flex', gap: 14, alignItems: 'flex-start',
                                    }}>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                                            background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 14, fontWeight: 800, color: '#fff',
                                        }}>{item.num}</div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.5 }}>
                                                {item.text}
                                            </div>
                                            <div style={{ fontSize: 12, color: '#78716C', lineHeight: 1.5, marginTop: 2 }}>
                                                {item.sub}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={{
                                marginTop: 16, padding: '14px 48px', borderRadius: 14,
                                background: 'linear-gradient(135deg, #10B981, #059669)',
                                color: '#fff', fontSize: 16, fontWeight: 800,
                                letterSpacing: '0.1em',
                                boxShadow: '0 4px 24px rgba(16,185,129,0.4)',
                            }}>
                                始める
                            </div>
                        </>)}

                        <div style={{
                            color: 'rgba(255,255,255,0.3)', fontSize: 11, marginTop: 4,
                        }}>
                            {firstRunPhase === 'legendary' ? '1 / 3' : firstRunPhase === 'realmode' ? '2 / 3' : '3 / 3'}
                        </div>
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

            {/* Card Rank-Up Banner */}
            {/* Rank Up Full-Screen Celebration — card-preview quality */}
            {cardRankUpEffect && (() => {
                const rankColor = cardRankUpEffect.newRankColor;
                const displayRank = cardRankUpEffect.newRankKey;
                const cFrame = getCardFrame(displayRank);
                const cShadow = getCardShadow(displayRank);
                const cAccent = getFrameAccent(displayRank);
                const isLight = displayRank === 'LEGENDARY';
                const RANK_JA: Record<string, string> = {
                    LEGENDARY: '伝説', HOLOGRAPHIC: '虹色', HOLO: '虹色', GOLD: '金', SILVER: '銀', BRONZE: '銅', NORMAL: '普通',
                };
                const rankJa = RANK_JA[cardRankUpEffect.newRank] || cardRankUpEffect.newRank;
                const cPts = cardRankUpEffect.snapshotPoints;
                const sparkles = Array.from({ length: 30 }, (_, i) => ({
                    id: i,
                    sx: `${(Math.random() - 0.5) * 300}px`,
                    sy: `${(Math.random() - 0.5) * 300}px`,
                    delay: Math.random() * 1.2,
                    size: 3 + Math.random() * 6,
                    color: i % 4 === 0 ? rankColor : i % 4 === 1 ? '#FDE68A' : i % 4 === 2 ? '#fff' : '#10B981',
                }));
                // Get displayed card info for the card visual
                const cardPhrase = cardRankUpEffect.snapshotPhrase || (displayedCard ? { english: displayedCard.english, japanese: displayedCard.japanese, category: displayedCard.category } : null);
                return (
                    <div
                        key={cardRankUpEffect.key}
                        onClick={() => setCardRankUpEffect(null)}
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
                                <span style={{ color: '#F97316' }}>&#8594;</span>
                                <span>{cardRankUpEffect.newRank}</span>
                            </div>
                        </div>
                        {/* Card slam */}
                        {cardPhrase && (
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
                                    {/* Card content */}
                                    <div style={{
                                        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                                        background: getCardWindowBg(displayRank),
                                        borderRadius: '8px', margin: '6px 0', padding: '24px 16px',
                                        border: `1px solid ${isLight ? 'rgba(255,255,255,0.08)' : cAccent + '25'}`,
                                        position: 'relative', overflow: 'hidden', textAlign: 'center',
                                    }}>
                                        {(displayRank === 'HOLOGRAPHIC' || displayRank === 'LEGENDARY') && <div style={{ position: 'absolute', inset: 0, opacity: 0.06, background: 'repeating-conic-gradient(from 0deg, rgba(168,85,247,0.1) 0deg, rgba(59,130,246,0.1) 60deg, rgba(232,121,249,0.1) 120deg, rgba(16,185,129,0.1) 180deg, rgba(245,158,11,0.1) 240deg, rgba(168,85,247,0.1) 360deg)', pointerEvents: 'none' }} />}
                                        <div style={{
                                            fontSize: isMobile ? '24px' : '30px', fontWeight: '800', color: isLight ? '#FAFAF9' : '#1C1917',
                                            lineHeight: 1.3, marginBottom: '8px', position: 'relative',
                                            textShadow: isLight ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                                        }}>{cardPhrase.english}</div>
                                        <div style={{
                                            fontSize: isMobile ? '14px' : '18px', color: isLight ? 'rgba(255,255,255,0.5)' : '#78716C',
                                            position: 'relative',
                                        }}>{cardPhrase.japanese}</div>
                                    </div>
                                    {/* Bottom bar */}
                                    <div style={{
                                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                        padding: '5px 10px',
                                        backgroundColor: isLight ? 'rgba(255,255,255,0.04)' : `${cAccent}08`,
                                        borderRadius: '0 0 8px 8px',
                                        borderTop: `1px solid ${isLight ? 'rgba(255,255,255,0.08)' : cAccent + '20'}`,
                                    }}>
                                        <span style={{ fontSize: '9px', fontWeight: '700', color: isLight ? 'rgba(255,255,255,0.5)' : '#A8A29E' }}>
                                            {cardPhrase.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Tap instruction */}
                        <div style={{
                            marginTop: '28px', fontSize: '12px', color: '#ffffff60',
                            letterSpacing: '3px', fontWeight: '600', zIndex: 2,
                            animation: 'levelup-glow-pulse 2s ease-in-out infinite',
                        }}>TAP TO CONTINUE</div>
                    </div>
                );
            })()}

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
                    {/* Background flash */}
                    <div style={{
                        position: 'absolute', inset: 0,
                        background: `radial-gradient(circle, ${levelUpEffect.color}18, transparent 70%)`,
                        animation: 'lvup-shine 3s ease-out forwards',
                    }} />
                    {/* Expanding ring */}
                    <div style={{
                        position: 'absolute',
                        width: isMobile ? '120px' : '180px',
                        height: isMobile ? '120px' : '180px',
                        borderRadius: '50%',
                        border: `2px solid ${levelUpEffect.color}60`,
                        animation: 'lvup-ring 1.5s ease-out forwards',
                    }} />
                    {/* Level text */}
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        animation: 'lvup-burst 2.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
                    }}>
                        <div style={{
                            fontSize: isMobile ? '12px' : '15px',
                            fontWeight: '700',
                            color: levelUpEffect.color,
                            letterSpacing: '4px',
                            textTransform: 'uppercase',
                            marginBottom: '4px',
                        }}>
                            レベルアップ
                        </div>
                        <div style={{
                            fontSize: isMobile ? '56px' : '80px',
                            fontWeight: '900',
                            lineHeight: 1,
                            letterSpacing: '-3px',
                            color: levelUpEffect.color,
                            textShadow: `0 2px 30px ${levelUpEffect.color}40`,
                        }}>
                            {levelUpEffect.level}
                        </div>
                        <div style={{
                            fontSize: isMobile ? '16px' : '20px',
                            fontWeight: '700',
                            color: levelUpEffect.color,
                            marginTop: '8px',
                            letterSpacing: '2px',
                        }}>
                            {levelUpEffect.title}
                        </div>
                    </div>
                </div>
            )}

            {/* Gacha Overlay — Nintendo-level */}
            {gachaEffect && (() => {
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
                        {/* Screen darken for BONUS+ */}
                        {isReveal && tier !== 'MISS' && (
                            <div style={{
                                position: 'absolute', inset: 0,
                                backgroundColor: tier === 'PHANTOM' ? '#fff' : '#000',
                                opacity: tier === 'PHANTOM' ? 0.8 : isUltraRare ? 0.7 : tier === 'LEGENDARY' ? 0.6 : tier === 'MEGA' ? 0.5 : tier === 'SUPER' ? 0.35 : 0.2,
                                transition: 'opacity 0.3s',
                            }} />
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
                            const cellW = isMobile ? 68 : 96;
                            const cellH = isMobile ? 60 : 82;
                            const reelGap = isMobile ? 4 : 6;
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
                                        fontSize: isMobile ? '12px' : '14px',
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
                                        padding: isMobile ? '14px 12px' : '18px 16px',
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

            {/* Unlock notification */}
            {unlockNotif && (
                <div key={unlockNotif} style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10001,
                    pointerEvents: 'none',
                    padding: '24px 48px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(28,25,23,0.92)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 0 40px rgba(212,175,55,0.4), 0 8px 32px rgba(0,0,0,0.3)',
                    border: '2px solid rgba(212,175,55,0.6)',
                    animation: 'unlock-notif 3s ease-out forwards',
                    textAlign: 'center',
                }}>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: '#D4AF37', letterSpacing: '0.05em' }}>
                        {unlockNotif}
                    </div>
                    <div style={{ fontSize: '12px', color: '#a8a29e', marginTop: '8px', fontWeight: 500 }}>
                        {daysActive.length} days active
                    </div>
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
                                borderRadius: '0',
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
                        <button
                            onClick={() => {
                                if (!toeicTargetLevel) {
                                    setShowToeicLevelPicker(true);
                                    return;
                                }
                                setDataMode('toeic');
                                localStorage.setItem('training-data-mode', 'toeic');
                                setViewMode('calendar');
                            }}
                            style={{
                                padding: '4px 10px',
                                borderRadius: '0 4px 4px 0',
                                border: dataMode === 'toeic' ? '1.5px solid #F59E0B' : '1px solid #E7E5E4',
                                backgroundColor: dataMode === 'toeic' ? '#FFFBEB' : '#fff',
                                color: dataMode === 'toeic' ? '#B45309' : '#A8A29E',
                                fontSize: '10px',
                                fontWeight: dataMode === 'toeic' ? '700' : '500',
                                cursor: 'pointer',
                                transition: 'all 0.15s',
                            }}
                        >
                            TOEIC
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
                        onClick={() => {
                            // Context-sensitive help based on current view
                            const helpTips: Record<string, string> = {
                                calendar: viewMode === 'calendar'
                                    ? '【カレンダー】日付タップでその日のカード表示。バーは習熟度。\n右上: Phrases/Words/TOEIC切替、Listen=連続再生、復習=シャッフルレビュー、List=一覧、+=追加'
                                    : '',
                                review: viewMode === 'review'
                                    ? '【復習モード】\n- カード左上: レベルボタン(タップで習熟度UP)\n- スピーカー: 発音再生\n- マイク: 録音(チャクラUP)\n- 研究: メモ追加(チャクラUP)\n- ←→キーでカード切替\n- 正解でスロット回転→CP獲得→ランクUP'
                                    : '',
                                list: viewMode === 'list'
                                    ? '【リスト】全カード一覧。検索バーでフレーズ検索。\nステータス列で習熟度確認。カテゴリでフィルタ可能。'
                                    : '',
                            };
                            const msg = helpTips[viewMode] || helpTips.calendar;
                            // Show as a temporary inline tip
                            setActiveTip(null); // clear any existing
                            tipQueueRef.current = []; // clear queue
                            // Use a special approach: temporarily show help
                            const helpKey = `help-${viewMode}` as TipId;
                            if (!TIP_CONTENT[helpKey]) {
                                // Add dynamic help content
                                (TIP_CONTENT as Record<string, { title: string; body: string; color: string }>)[helpKey] = {
                                    title: 'ヘルプ',
                                    body: msg,
                                    color: '#78716C',
                                };
                            }
                            shownTipsRef.current.delete(helpKey); // always allow re-show
                            setActiveTip(helpKey);
                        }}
                        style={{
                            background: 'none', border: '1px solid #E7E5E4',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', fontSize: '11px', color: '#A8A29E',
                            borderRadius: '50%', width: 24, height: 24,
                            fontWeight: 700, padding: 0,
                        }}
                    >
                        ?
                    </button>
                </div>
            </div>

            {/* Mini Runner - PC only (mobile is below calendar) */}
            {viewMode === 'calendar' && !isMobile && (
                <div style={{ position: 'relative' }}>
                    {showRunner && (
                        <MiniRunner
                            todayXP={todayXP}
                            goalXP={goalXP}
                            onGoalChange={handleGoalChange}
                            battleData={battleSyncData}
                            onBattleStart={() => setMiniRunnerBattleActive(true)}
                            onBattleEnd={() => setMiniRunnerBattleActive(false)}
                            lastReviewedWord={lastReviewedWord}
                            dropCard={puzzleDropCard as any}
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
                /* Full-screen Review View */
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: isMobile ? '16px' : '48px 24px',
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
                                布陣バトル
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

                        {/* Tab Content: 布陣バトル */}
                        {calendarTab === 'puzzle' && (
                            <div style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                padding: isMobile ? '4px 2px' : '8px',
                                backgroundColor: '#FAFAF9',
                                overflowY: 'auto',
                            }}>
                                <PuzzleBoard
                                    dropCard={puzzleDropCard as any}
                                    chainMode={chainState.mode}
                                    isMobile={isMobile}
                                    cardPoints={cardPoints}
                                    mastery={phraseMastery}
                                    onChainResult={(result) => {
                                        if (result.gpEarned > 0) {
                                            setPlayerSparks(prev => prev + result.gpEarned);
                                        }
                                    }}
                                    onBattleSync={(data) => { if (BATTLE_UNLOCKED) setBattleSyncData(data); }}
                                    externalBattleActive={miniRunnerBattleActive}
                                    onCardClick={(phraseId) => {
                                        // Select the phrase in sidebar (same as calendar date click)
                                        const phrase = phrases.find(p => p.id === phraseId);
                                        if (phrase) {
                                            const dateKey = phrase.date.split('T')[0];
                                            setSelectedDate(dateKey);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Mini Runner - Mobile only (between calendar and cards) */}
                    {isMobile && (
                        <div style={{ position: 'relative' }}>
                            {showRunner && (
                                <MiniRunner
                                    todayXP={todayXP}
                                    goalXP={goalXP}
                                    onGoalChange={handleGoalChange}
                                    battleData={battleSyncData}
                                    lastReviewedWord={lastReviewedWord}
                                    dropCard={puzzleDropCard as any}
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
                        borderTop: isMobile ? '1px solid #e5e5e5' : 'none',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        overflowY: isMobile ? 'visible' : 'auto',
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
                                                                        key: effectKey(),
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
                                                                    const k = effectKey();
                                                                    playLevelSound(levelAfter);
                                                                    setPointEffect({ points: nc.lv, color: nc.color, gradFrom: nc.gradFrom, gradTo: nc.gradTo, levelName: nc.name, key: k });
                                                                    setCalendarPulse({ dateKey: phrase.date.split('T')[0], points: nc.lv, gradFrom: nc.gradFrom, color: nc.color, level: levelAfter, key: k });
                                                                    // Register card to 布陣バトル
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
                                    {/* Review Cards first */}
                                    {renderReviewContent()}

                                    {/* Analytics Dashboard — below review cards */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>


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

            {/* ── Progressive Tip Coach Mark ── */}
            {activeTip && TIP_CONTENT[activeTip] && (() => {
                const tip = TIP_CONTENT[activeTip];
                return (
                    <div
                        onClick={dismissTip}
                        style={{
                            position: 'fixed',
                            bottom: 24, left: '50%', transform: 'translateX(-50%)',
                            zIndex: 9500,
                            maxWidth: 380, width: 'calc(100% - 32px)',
                            backgroundColor: '#1a1a1a',
                            borderRadius: 16,
                            padding: '16px 20px',
                            boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 2px ${tip.color}40`,
                            cursor: 'pointer',
                            animation: 'tip-slide-up 0.3s ease-out',
                        }}
                    >
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8,
                        }}>
                            <div style={{
                                width: 8, height: 8, borderRadius: '50%',
                                backgroundColor: tip.color,
                                boxShadow: `0 0 8px ${tip.color}`,
                                animation: 'tip-dot-pulse 2s ease-in-out infinite',
                                flexShrink: 0,
                            }} />
                            <div style={{
                                fontSize: 14, fontWeight: 800, color: tip.color,
                                letterSpacing: '0.02em',
                            }}>
                                {tip.title}
                            </div>
                        </div>
                        <div style={{
                            fontSize: 13, color: '#ccc', lineHeight: 1.7,
                            fontWeight: 400, whiteSpace: 'pre-line',
                        }}>
                            {tip.body}
                        </div>
                        {tip.action && (
                            <div style={{
                                marginTop: 10, padding: '6px 12px',
                                backgroundColor: `${tip.color}20`,
                                borderRadius: 8, display: 'inline-block',
                                fontSize: 12, fontWeight: 700, color: tip.color,
                                letterSpacing: '0.02em',
                            }}>
                                {tip.action}
                            </div>
                        )}
                        <div style={{
                            fontSize: 10, color: '#555', textAlign: 'right', marginTop: 6,
                        }}>
                            tap to close
                        </div>
                    </div>
                );
            })()}
        </div>
    );
}
