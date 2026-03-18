'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  type Element,
  ELEMENT_COLORS,
  calcBstTotal,
  calcBstStats,
  getBstTier,
} from '@/data/english/elements';
import { ElementBadge } from '@/components/english/ElementIcon';
import { getFlavorText } from '@/data/english/flavor-text';
import {
  playSpinStart, playSpinTick, playReelStop, playReachAlert,
  playKakuhenEntry, playFeverEntrySound, playFeverExitSound,
  playGpCoin, playStreakBreak, playFeverChainHit,
  playCardRankSound, playImpactHit, playGachaSound,
  startFeverBGM, stopFeverBGM, getAudioCtx,
} from '@/lib/training-sounds';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface VocabDeckItem {
  word: string;
  meaning: string;
  example?: string;
  partOfSpeech?: string;
  sourceEpisode: string;
  sourceEpisodeTitle: string;
  masteryLevel: 0 | 1 | 2 | 3;
  lastReviewedAt: string | null;
  reviewCount: number;
  correctStreak: number;
}

interface PhraseData {
  id: string;
  english: string;
  japanese: string;
  phrase?: string;
  type?: string;
  meaning?: string;
  category: string;
  mastery_level?: number;
  created_at: string;
}

interface CardData {
  id: string;
  phrase: string;
  meaning: string;
  element: Element;
  mastery: number;
  cardPoints: number;
  rank: CardRank;
  stats: number[];
  bstTotal: number;
  trait: TraitInfo;
  flavorText: { en: string; ja: string };
}

type CardRank = 'LEGENDARY' | 'HOLOGRAPHIC' | 'GOLD' | 'SILVER' | 'BRONZE' | 'NORMAL';
type SlotState = 'NORMAL' | 'CZ' | 'RUSH' | 'SPECIAL' | 'FEVER';
type GodSymbol = 'GOD' | 'RED7' | 'YELLOW7' | 'BLUE7' | 'V_SYMBOL' | 'BLANK';

interface TraitInfo {
  name: string;
  nameJa: string;
  category: string;
  description: string;
}

interface SpinResult {
  card: CardData;
  gpEarned: number;
  stateAfter: SlotState;
  transitionType: TransitionType | null;
}

type TransitionType =
  | 'NORMAL_TO_CZ'
  | 'CZ_TO_RUSH'
  | 'RUSH_TO_SPECIAL'
  | 'SPECIAL_TO_FEVER'
  | 'FALL_TO_NORMAL';

interface SessionStats {
  totalGP: number;
  totalSpins: number;
  combo: number;
  bestCombo: number;
  czCount: number;
  rushCount: number;
  specialCount: number;
  feverCount: number;
  peakState: SlotState;
  stateHistory: SlotState[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const RANK_THRESHOLDS: { rank: CardRank; min: number }[] = [
  { rank: 'LEGENDARY', min: 250 },
  { rank: 'HOLOGRAPHIC', min: 100 },
  { rank: 'GOLD', min: 50 },
  { rank: 'SILVER', min: 20 },
  { rank: 'BRONZE', min: 5 },
  { rank: 'NORMAL', min: 0 },
];

const RANK_LABELS: Record<CardRank, string> = {
  LEGENDARY: 'LEGENDARY',
  HOLOGRAPHIC: 'HOLO',
  GOLD: 'GOLD',
  SILVER: 'SILVER',
  BRONZE: 'BRONZE',
  NORMAL: 'NORMAL',
};

const STATE_ORDER: SlotState[] = ['NORMAL', 'CZ', 'RUSH', 'SPECIAL', 'FEVER'];

const STATE_CONFIG: Record<
  SlotState,
  { label: string; labelJa: string; color: string; bgColor: string; borderColor: string }
> = {
  NORMAL: { label: '通常', labelJa: '通常', color: '#78716C', bgColor: '#F5F5F4', borderColor: '#D6D3D1' },
  CZ: { label: 'G-STOP', labelJa: 'G-STOP', color: '#0EA5E9', bgColor: '#E0F2FE', borderColor: '#7DD3FC' },
  RUSH: { label: 'GOD GAME', labelJa: 'GG', color: '#EF4444', bgColor: '#FEF2F2', borderColor: '#FCA5A5' },
  SPECIAL: { label: 'SGG', labelJa: 'SGG', color: '#A855F7', bgColor: '#FAF5FF', borderColor: '#C084FC' },
  FEVER: { label: 'PGG', labelJa: 'PGG', color: '#D4AF37', bgColor: '#FFFBEB', borderColor: '#FDE68A' },
};

const SYMBOL_COLORS: Record<GodSymbol, string> = {
  GOD: '#D4AF37', RED7: '#EF4444', YELLOW7: '#F59E0B',
  BLUE7: '#3B82F6', V_SYMBOL: '#10B981', BLANK: '#57534E',
};
const SYMBOL_LABELS: Record<GodSymbol, string> = {
  GOD: 'GOD', RED7: '赤7', YELLOW7: '黄7', BLUE7: '青7', V_SYMBOL: 'V', BLANK: '-',
};

const STAT_NAMES = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'] as const;
const STAT_COLORS = ['#10B981', '#EF4444', '#3B82F6', '#A855F7', '#F59E0B', '#EC4899'];

const CHAKRA: { name: string; ja: string; color: string }[] = [
  { name: 'SEED', ja: '種', color: '#B91C1C' },
  { name: 'SPARK', ja: '芽', color: '#C2410C' },
  { name: 'FORGE', ja: '鍛', color: '#A16207' },
  { name: 'OWN', ja: '得', color: '#166534' },
  { name: 'VOICE', ja: '声', color: '#1E40AF' },
  { name: 'VISION', ja: '研', color: '#3730A3' },
  { name: 'CROWN', ja: '極', color: '#6B21A8' },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TRAIT SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface TraitDef { name: string; nameJa: string; }

const TRAIT_DEFS: Record<string, TraitDef[]> = {
  ATK: [
    { name: 'Glass Cannon', nameJa: 'グラスキャノン' },
    { name: 'Berserker', nameJa: 'バーサーカー' },
    { name: 'Finisher', nameJa: 'フィニッシャー' },
  ],
  DEF: [
    { name: 'Iron Wall', nameJa: '鉄壁' },
    { name: 'Last Stand', nameJa: 'ラストスタンド' },
    { name: 'Counter', nameJa: 'カウンター' },
  ],
  SPA: [
    { name: 'Lucky Star', nameJa: 'ラッキースター' },
    { name: 'Oracle', nameJa: '予言者' },
    { name: 'Catalyst', nameJa: '触媒' },
  ],
  SPD: [
    { name: 'Tenacity', nameJa: '粘り' },
    { name: 'Momentum', nameJa: '勢い' },
    { name: 'Zen', nameJa: '禅' },
  ],
  SPE: [
    { name: 'Double Tap', nameJa: '連打' },
    { name: 'Lightning', nameJa: '稲妻' },
    { name: 'Quick Start', nameJa: 'クイックスタート' },
  ],
  HP: [
    { name: 'Marathon', nameJa: 'マラソン' },
    { name: 'Second Wind', nameJa: '復活' },
    { name: 'Regenerator', nameJa: '再生' },
  ],
  BALANCED: [
    { name: 'Allrounder', nameJa: '万能' },
    { name: 'Chameleon', nameJa: 'カメレオン' },
    { name: 'Harmonizer', nameJa: '調和' },
  ],
};

const TRAIT_DESCRIPTIONS: Record<string, string> = {
  'Glass Cannon': 'GP x1.5 / DEF効果無効',
  Berserker: 'コンボ毎にGP +5%',
  Finisher: 'コンボ10超でGP x2',
  'Iron Wall': '転落耐性+30% / GP x0.8',
  'Last Stand': 'セッション初回の転落を自動回避',
  Counter: '転落回避時、次スピンGP x3',
  'Lucky Star': 'CZ突入率 x2',
  Oracle: '天井 -20',
  Catalyst: 'CZスピン数 10->7',
  Tenacity: 'RUSH転落率 半減',
  Momentum: 'コンボ15超で転落率 0',
  Zen: 'RUSH保証スピン +5',
  'Double Tap': '25%で2回スピン',
  Lightning: '特化ゾーン突入率 x3',
  'Quick Start': '各モード最初の5スピン GP x2',
  Marathon: '最大スタミナ +50%',
  'Second Wind': 'スタミナ30%以下で全ステ+20%',
  Regenerator: '10スピン毎にスタミナ +5',
  Allrounder: '全効果 +15%',
  Chameleon: '前カードの特性を引き継ぐ',
  Harmonizer: '次カードの特性効果 x2',
};

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function getCardTrait(stats: number[], cardId: string): TraitInfo {
  const min = Math.min(...stats);
  const max = Math.max(...stats);
  const isBalanced = max - min <= 20;

  let category: string;
  if (isBalanced) {
    category = 'BALANCED';
  } else {
    const maxIdx = stats.indexOf(max);
    category = STAT_NAMES[maxIdx];
  }

  const traitIdx = hashString(cardId) % 3;
  const def = TRAIT_DEFS[category][traitIdx];

  return {
    name: def.name,
    nameJa: def.nameJa,
    category,
    description: TRAIT_DESCRIPTIONS[def.name] || '',
  };
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD VISUAL HELPERS (from card-preview)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function getCardFrame(rank: CardRank): { border: string; borderRadius: string; background: string; backgroundColor: string } {
  const br = '8px';
  switch (rank) {
    case 'NORMAL': return { border: '8px solid #E7E5E4', borderRadius: br, background: '', backgroundColor: '#FAFAF9' };
    case 'BRONZE': return {
      border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent',
      background: 'linear-gradient(#FFFBF5, #FFFBF5) padding-box, linear-gradient(135deg, #CD7F32 0%, #E8B87A 30%, #CD7F32 60%, #A0622E 100%) border-box',
    };
    case 'SILVER': return {
      border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent',
      background: 'linear-gradient(#F8FAFB, #F8FAFB) padding-box, linear-gradient(135deg, #e2e8f0 0%, #ffffff 40%, #cbd5e1 60%, #94a3b8 100%) border-box',
    };
    case 'GOLD': return {
      border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent',
      background: 'linear-gradient(180deg, #FFFEF5 0%, #FFFBEB 100%) padding-box, linear-gradient(135deg, #D4AF37 0%, #FFF2A8 25%, #F6C85F 50%, #D4AF37 75%, #B8941E 100%) border-box',
    };
    case 'HOLOGRAPHIC': return {
      border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent',
      background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #E0E7FF 100%) padding-box, linear-gradient(135deg, #E879F9 0%, #A855F7 25%, #6366F1 50%, #3B82F6 75%, #06B6D4 100%) border-box',
    };
    case 'LEGENDARY': return {
      border: '8px solid transparent', borderRadius: br, backgroundColor: 'transparent',
      background: 'linear-gradient(135deg, #1C1917 0%, #2D2438 50%, #1c1813 100%) padding-box, linear-gradient(135deg, #18181B 0%, #A855F7 40%, #D4AF37 60%, #18181B 100%) border-box',
    };
  }
}

function getCardShadow(rank: CardRank): string {
  switch (rank) {
    case 'NORMAL': return '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)';
    case 'BRONZE': return '0 6px 16px rgba(205,127,50,0.15), 0 2px 6px rgba(205,127,50,0.1)';
    case 'SILVER': return '0 6px 20px rgba(148,163,184,0.25), 0 2px 8px rgba(148,163,184,0.15)';
    case 'GOLD': return '0 8px 24px rgba(212,175,55,0.35), 0 4px 12px rgba(246,200,95,0.25)';
    case 'HOLOGRAPHIC': return '0 8px 30px rgba(168,85,247,0.3), 0 4px 16px rgba(99,102,241,0.25)';
    case 'LEGENDARY': return '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4), 0 0 30px rgba(168,85,247,0.3)';
  }
}

function getCardWindowBg(rank: CardRank): string {
  switch (rank) {
    case 'NORMAL': return '#F5F5F4';
    case 'BRONZE': return 'linear-gradient(180deg, #FDF8F0, #FAF0E4)';
    case 'SILVER': return 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)';
    case 'GOLD': return 'radial-gradient(ellipse at top, #FFFBEB, #FFF3CC 100%)';
    case 'HOLOGRAPHIC': return 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,232,255,0.8))';
    case 'LEGENDARY': return 'radial-gradient(circle at center, #2D2438 0%, #181A1B 100%)';
  }
}

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

function getRankBorderColor(rank: CardRank): string {
  switch (rank) {
    case 'LEGENDARY': return '#D4AF37';
    case 'HOLOGRAPHIC': return '#A855F7';
    case 'GOLD': return '#F6C85F';
    case 'SILVER': return '#94A3B8';
    case 'BRONZE': return '#CD7F32';
    case 'NORMAL': return '#D6D3D1';
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function getCardRank(points: number): CardRank {
  for (const { rank, min } of RANK_THRESHOLDS) {
    if (points >= min) return rank;
  }
  return 'NORMAL';
}

function buildCard(
  p: PhraseData,
  masteryMap: Record<string, number>,
  pointsMap: Record<string, number>
): CardData {
  const stats = calcBstStats(p.id);
  const bstTotal = calcBstTotal(p.id);
  const points = pointsMap[p.id] || 0;
  const rank = getCardRank(points);
  const trait = getCardTrait(stats, p.id);
  const flavorText = getFlavorText(p.id);
  const element = (p.category || 'flame') as Element;

  return {
    id: p.id,
    phrase: p.english || p.phrase || '',
    meaning: p.japanese || p.meaning || '',
    element,
    mastery: masteryMap[p.id] ?? p.mastery_level ?? 0,
    cardPoints: points,
    rank,
    stats,
    bstTotal,
    trait,
    flavorText,
  };
}

function generateDemoCards(count: number): CardData[] {
  const demoWords = [
    { phrase: 'ubiquitous', meaning: '至る所にある' },
    { phrase: 'serendipity', meaning: '偶然の幸運' },
    { phrase: 'ephemeral', meaning: 'はかない' },
    { phrase: 'conundrum', meaning: '難問' },
    { phrase: 'paradigm', meaning: '模範' },
    { phrase: 'anomaly', meaning: '異常' },
    { phrase: 'catalyst', meaning: '触媒' },
    { phrase: 'dichotomy', meaning: '二分法' },
    { phrase: 'eloquent', meaning: '雄弁な' },
    { phrase: 'facetious', meaning: 'ふざけた' },
    { phrase: 'gregarious', meaning: '社交的な' },
    { phrase: 'hypothesis', meaning: '仮説' },
    { phrase: 'inevitable', meaning: '避けられない' },
    { phrase: 'juxtapose', meaning: '並置する' },
    { phrase: 'kaleidoscope', meaning: '万華鏡' },
    { phrase: 'labyrinth', meaning: '迷路' },
    { phrase: 'meticulous', meaning: '几帳面な' },
    { phrase: 'nostalgia', meaning: '郷愁' },
    { phrase: 'quintessential', meaning: '典型的な' },
    { phrase: 'resilient', meaning: '回復力がある' },
  ];
  const elements: Element[] = ['flame', 'aqua', 'wind', 'earth', 'thunder'];

  return demoWords.slice(0, count).map((w, i) => {
    const fakeId = `demo${String(i).padStart(4, '0')}xz`;
    const stats = calcBstStats(fakeId);
    const bstTotal = stats.reduce((a, b) => a + b, 0);
    const points = Math.floor(Math.random() * 80);
    const rank = getCardRank(points);
    const trait = getCardTrait(stats, fakeId);
    const flavorText = getFlavorText(fakeId);

    return {
      id: fakeId,
      phrase: w.phrase,
      meaning: w.meaning,
      element: elements[i % 5],
      mastery: Math.floor(Math.random() * 4),
      cardPoints: points,
      rank,
      stats,
      bstTotal,
      trait,
      flavorText,
    };
  });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LOCALSTORAGE HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function loadFromLocalStorage(): { phrases: PhraseData[], masteryMap: Record<string, number>, pointsMap: Record<string, number> } {
  const raw = localStorage.getItem('izakaya_toeic_vocab_deck');
  const items: VocabDeckItem[] = raw ? JSON.parse(raw) : [];

  // Also load card points from localStorage
  const pointsRaw = localStorage.getItem('izakaya_card_points');
  const savedPoints: Record<string, number> = pointsRaw ? JSON.parse(pointsRaw) : {};

  const phrases: PhraseData[] = items.map((item, i) => ({
    id: `vocab-${item.word.replace(/\s+/g, '-').toLowerCase()}`,
    english: item.word,
    japanese: item.meaning,
    phrase: item.word,
    type: item.partOfSpeech || 'word',
    meaning: item.meaning,
    category: ['flame', 'aqua', 'wind', 'earth', 'thunder'][i % 5],
    mastery_level: item.masteryLevel,
    created_at: item.lastReviewedAt || new Date().toISOString(),
  }));

  const masteryMap: Record<string, number> = {};
  const pointsMap: Record<string, number> = {};
  phrases.forEach(p => {
    masteryMap[p.id] = p.mastery_level || 0;
    pointsMap[p.id] = savedPoints[p.id] || 0;
  });

  return { phrases, masteryMap, pointsMap };
}

function saveCardPoints(pointsMap: Record<string, number>) {
  localStorage.setItem('izakaya_card_points', JSON.stringify(pointsMap));
}

function updateLocalMastery(cardId: string, newMastery: number) {
  const raw = localStorage.getItem('izakaya_toeic_vocab_deck');
  const items: VocabDeckItem[] = raw ? JSON.parse(raw) : [];
  // cardId is "vocab-word-here", extract the word
  const word = cardId.replace('vocab-', '').replace(/-/g, ' ');
  const item = items.find((i) => i.word.toLowerCase().replace(/\s+/g, ' ') === word);
  if (item) {
    item.masteryLevel = Math.min(3, newMastery) as 0 | 1 | 2 | 3;
    item.lastReviewedAt = new Date().toISOString();
    item.reviewCount = (item.reviewCount || 0) + 1;
    localStorage.setItem('izakaya_toeic_vocab_deck', JSON.stringify(items));
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLOT ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function calcGP(
  card: CardData,
  state: SlotState,
  combo: number,
  spinInState: number,
  prevTrait: TraitInfo | null,
  nextTraitDoubled: boolean
): number {
  const [, atk] = card.stats;
  const base = 10 + atk * 0.3;
  const stateMultiplier: Record<SlotState, number> = {
    NORMAL: 1, CZ: 1.5, RUSH: 2 + combo * 0.15, SPECIAL: 5, FEVER: 10,
  };
  let gp = base * stateMultiplier[state];

  let traitMult = 1;
  const trait = card.trait;
  const effectiveTrait = trait.name === 'Chameleon' && prevTrait ? prevTrait : trait;

  switch (effectiveTrait.name) {
    case 'Glass Cannon': traitMult = 1.5; break;
    case 'Berserker': traitMult = 1 + combo * 0.05; break;
    case 'Finisher': if (combo > 10) traitMult = 2; break;
    case 'Iron Wall': traitMult = 0.8; break;
    case 'Quick Start': if (spinInState < 5) traitMult = 2; break;
    case 'Allrounder': traitMult = 1.15; break;
  }

  gp *= traitMult;
  if (nextTraitDoubled) gp *= 2;
  return Math.round(gp);
}

function calcCeiling(avgSPA: number, card: CardData | null): number {
  let ceiling = Math.max(30, 80 - Math.floor(avgSPA / 5));
  if (card?.trait.name === 'Oracle') ceiling = Math.max(20, ceiling - 20);
  return ceiling;
}

function rollCZTrigger(card: CardData): boolean {
  const [, , , spa] = card.stats;
  let rate = 0.03 + spa * 0.0005;
  if (card.trait.name === 'Lucky Star') rate *= 2;
  if (card.trait.name === 'Allrounder') rate *= 1.15;
  return Math.random() < rate;
}

function rollRushPromotion(card: CardData): boolean {
  const [, atk] = card.stats;
  let rate = 0.15 + atk * 0.0015;
  if (card.trait.name === 'Allrounder') rate *= 1.15;
  return Math.random() < rate;
}

function rollRushFall(card: CardData, combo: number): boolean {
  const [, , , , spd] = card.stats;
  let fallRate = Math.max(0.05, 0.18 - spd * 0.0008);
  if (card.trait.name === 'Tenacity') fallRate /= 2;
  if (card.trait.name === 'Momentum' && combo > 15) fallRate = 0;
  if (card.trait.name === 'Allrounder') fallRate *= 0.85;
  return Math.random() < fallRate;
}

function rollFallSurvival(card: CardData, lastStandUsed: boolean): boolean {
  const [, , def] = card.stats;
  if (card.trait.name === 'Last Stand' && !lastStandUsed) return true;
  let rate = def * 0.003;
  if (card.trait.name === 'Iron Wall') rate += 0.3;
  if (card.trait.name === 'Glass Cannon') rate = 0;
  if (card.trait.name === 'Allrounder') rate *= 1.15;
  return Math.random() < rate;
}

function rollSpecialTrigger(card: CardData): boolean {
  const [, , , , , spe] = card.stats;
  let rate = spe * 0.00008;
  if (card.trait.name === 'Lightning') rate *= 3;
  if (card.trait.name === 'Allrounder') rate *= 1.15;
  return Math.random() < rate;
}

function rollFeverTrigger(): boolean {
  return Math.random() < 0.03;
}

function rollDoubleSpin(card: CardData): boolean {
  const [, , , , , spe] = card.stats;
  let rate = 0.05 + spe * 0.0005;
  if (card.trait.name === 'Double Tap') rate = 0.25;
  return Math.random() < rate;
}

// Roll all 3 reels at once. Triple alignment is determined by a SINGLE roll
// (not 3 independent rolls cubed), so probabilities are sane.
// GOD揃い: 1/100, 赤7揃い: 1/20, as specified by user.
function rollReelSymbols(state: SlotState): { symbols: GodSymbol[]; triple: GodSymbol | null } {
  const r = Math.random();

  // --- Triple alignment roll (single probability check) ---
  if (state === 'CZ') {
    // G-STOP: higher V揃い chance
    if (r < 0.01) return { symbols: ['GOD', 'GOD', 'GOD'], triple: 'GOD' };           // 1/100
    if (r < 0.06) return { symbols: ['RED7', 'RED7', 'RED7'], triple: 'RED7' };        // 1/20
    if (r < 0.10) return { symbols: ['YELLOW7', 'YELLOW7', 'YELLOW7'], triple: 'YELLOW7' }; // 4%
    if (r < 0.15) return { symbols: ['BLUE7', 'BLUE7', 'BLUE7'], triple: 'BLUE7' };   // 5%
    if (r < 0.30) return { symbols: ['V_SYMBOL', 'V_SYMBOL', 'V_SYMBOL'], triple: 'V_SYMBOL' }; // 15%
  } else if (state === 'RUSH' || state === 'SPECIAL' || state === 'FEVER') {
    // GG/SGG/PGG中: GODと赤7が少し出やすい
    if (r < 0.015) return { symbols: ['GOD', 'GOD', 'GOD'], triple: 'GOD' };          // 1.5%
    if (r < 0.065) return { symbols: ['RED7', 'RED7', 'RED7'], triple: 'RED7' };       // 5%
    if (r < 0.105) return { symbols: ['YELLOW7', 'YELLOW7', 'YELLOW7'], triple: 'YELLOW7' }; // 4%
    if (r < 0.155) return { symbols: ['BLUE7', 'BLUE7', 'BLUE7'], triple: 'BLUE7' };  // 5%
  } else {
    // NORMAL: base rates
    if (r < 0.01) return { symbols: ['GOD', 'GOD', 'GOD'], triple: 'GOD' };           // 1/100
    if (r < 0.06) return { symbols: ['RED7', 'RED7', 'RED7'], triple: 'RED7' };        // 1/20
    if (r < 0.09) return { symbols: ['YELLOW7', 'YELLOW7', 'YELLOW7'], triple: 'YELLOW7' }; // 3%
    if (r < 0.13) return { symbols: ['BLUE7', 'BLUE7', 'BLUE7'], triple: 'BLUE7' };   // 4%
  }

  // --- No triple: generate individual scatter symbols for visual variety ---
  const scatterRoll = (): GodSymbol => {
    const s = Math.random();
    if (s < 0.02) return 'GOD';
    if (s < 0.08) return 'RED7';
    if (s < 0.18) return 'YELLOW7';
    if (s < 0.35) return 'BLUE7';
    if (state === 'CZ' && s < 0.50) return 'V_SYMBOL';
    return 'BLANK';
  };
  const symbols: GodSymbol[] = [scatterRoll(), scatterRoll(), scatterRoll()];
  // Prevent accidental triples in scatter
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2] && symbols[0] !== 'BLANK') {
    symbols[2] = 'BLANK';
  }
  return { symbols, triple: null };
}

function assignLoopRate(trigger: 'ceiling' | 'blue7' | 'yellow7' | 'red7' | 'god' | 'v_symbol'): number {
  switch (trigger) {
    case 'god': return 89;
    case 'red7': return 80;
    case 'yellow7': return 67;
    case 'v_symbol': return 67;
    case 'blue7': return 50;
    case 'ceiling': return 50;
    default: return 50;
  }
}

function drawCard(deck: CardData[]): CardData {
  const weights = deck.map((c) => Math.max(1, 4 - c.mastery));
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * totalWeight;
  for (let i = 0; i < deck.length; i++) {
    roll -= weights[i];
    if (roll <= 0) return deck[i];
  }
  return deck[deck.length - 1];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function CardSlotPage() {
  // ── Phase: rules vs gameplay ──
  const [showRules, setShowRules] = useState(true);

  // ── Data Loading ──
  const [deck, setDeck] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ── Slot State ──
  const [slotState, setSlotState] = useState<SlotState>('NORMAL');
  const [currentCard, setCurrentCard] = useState<CardData | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [ceilingCounter, setCeilingCounter] = useState(0);
  const [czSpinsLeft, setCzSpinsLeft] = useState(0);
  const [rushSpins, setRushSpins] = useState(0);
  const [rushMinSpins, setRushMinSpins] = useState(8);
  const [specialSpinsLeft, setSpecialSpinsLeft] = useState(0);
  const [feverSpinsLeft, setFeverSpinsLeft] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [spinInState, setSpinInState] = useState(0);

  // ── GOD Symbol System ──
  const [loopRate, setLoopRate] = useState(0);
  const [ggSetSpinsLeft, setGgSetSpinsLeft] = useState(0);
  const [ggSetsRemaining, setGgSetsRemaining] = useState(0);
  const [reelSymbols, setReelSymbols] = useState<GodSymbol[]>(['BLANK', 'BLANK', 'BLANK']);
  const [symbolFlicker, setSymbolFlicker] = useState<GodSymbol[]>(['BLANK', 'BLANK', 'BLANK']);

  // ── 3-Reel System ──
  const [reels, setReels] = useState<(CardData | null)[]>([null, null, null]);
  const [reelSpinning, setReelSpinning] = useState<boolean[]>([false, false, false]);
  const [reelFlicker, setReelFlicker] = useState<(CardData | null)[]>([null, null, null]);
  const [reelStopped, setReelStopped] = useState<boolean[]>([false, false, false]);
  const [matchBonus, setMatchBonus] = useState<string | null>(null);

  // ── Session ──
  const [stats, setStats] = useState<SessionStats>({
    totalGP: 0, totalSpins: 0, combo: 0, bestCombo: 0,
    czCount: 0, rushCount: 0, specialCount: 0, feverCount: 0,
    peakState: 'NORMAL', stateHistory: [],
  });

  // ── Credit System ──
  const [credits, setCredits] = useState(3000);
  const [totalBet, setTotalBet] = useState(0);
  const [totalWin, setTotalWin] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // ── DEV Panel ──
  const [showDev, setShowDev] = useState(false);

  // ── Animation ──
  const [displayedGP, setDisplayedGP] = useState(0);
  const [gpDelta, setGpDelta] = useState(0);
  const [showGpDelta, setShowGpDelta] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState<TransitionType | null>(null);
  const [cardAnimState, setCardAnimState] = useState<'idle' | 'exit' | 'enter'>('idle');
  const [comboShake, setComboShake] = useState(false);
  const [lastSpins, setLastSpins] = useState<SpinResult[]>([]);
  const [doubleSpin, setDoubleSpin] = useState(false);

  // ── Refs ──
  const gpAnimRef = useRef<number>(0);
  const feverBGMRef = useRef<HTMLAudioElement | null>(null);
  const feverBGMTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reelFlickerRefs = useRef<(ReturnType<typeof setInterval> | null)[]>([null, null, null]);
  const lastStandUsedRef = useRef(false);
  const prevTraitRef = useRef<TraitInfo | null>(null);
  const nextTraitDoubledRef = useRef(false);
  const counterTraitStoreRef = useRef(false);
  const spinInStateRef = useRef(0);
  const forcedSymbolsRef = useRef<GodSymbol[] | null>(null);
  const cardPointsMapRef = useRef<Record<string, number>>({});

  // ── Responsive ──
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Initialize audio context on first interaction & cleanup fever BGM
  useEffect(() => {
    const initAudio = () => {
      try { const ctx = getAudioCtx(); if (ctx.state === 'suspended') ctx.resume(); } catch {}
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => {
      window.removeEventListener('click', initAudio);
      if (feverBGMTimerRef.current) { clearTimeout(feverBGMTimerRef.current); feverBGMTimerRef.current = null; }
      if (feverBGMRef.current) { stopFeverBGM(feverBGMRef.current); feverBGMRef.current = null; }
      reelFlickerRefs.current.forEach(r => { if (r) clearInterval(r); });
    };
  }, []);

  // ── Data Load from localStorage ──
  useEffect(() => {
    try {
      const { phrases, masteryMap, pointsMap } = loadFromLocalStorage();
      cardPointsMapRef.current = pointsMap;
      if (phrases.length === 0) {
        const demoCards = generateDemoCards(20);
        setDeck(demoCards);
        setError('デッキが空です。エピソードで単語を保存してください。');
      } else {
        const cards = phrases.map((p) => buildCard(p, masteryMap, pointsMap));
        setDeck(cards);
      }
      setLoading(false);
    } catch {
      const demoCards = generateDemoCards(20);
      setDeck(demoCards);
      setError('Demo mode');
      setLoading(false);
    }
  }, []);

  // ── GP Counter Animation ──
  useEffect(() => {
    if (displayedGP === stats.totalGP) return;
    const target = stats.totalGP;
    const start = displayedGP;
    const diff = target - start;
    const duration = Math.min(400, Math.max(150, diff * 3));
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedGP(Math.round(start + diff * eased));
      if (progress < 1) gpAnimRef.current = requestAnimationFrame(animate);
    }
    gpAnimRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(gpAnimRef.current);
  }, [stats.totalGP, displayedGP]);

  // ── Average SPA for ceiling ──
  const avgSPA = useMemo(() => {
    if (deck.length === 0) return 50;
    return deck.reduce((sum, c) => sum + c.stats[3], 0) / deck.length;
  }, [deck]);

  const ceiling = useMemo(() => calcCeiling(avgSPA, currentCard), [avgSPA, currentCard]);
  const stateIndex = (s: SlotState) => STATE_ORDER.indexOf(s);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SPIN LOGIC
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // Stop timing per reel (ms from spin start)
  const REEL_STOP_DELAYS = [800, 1400, 2000];

  const doSpin = useCallback(() => {
    const freeSpin = slotState === 'RUSH' || slotState === 'SPECIAL' || slotState === 'FEVER';
    if (spinning || deck.length === 0 || gameOver || showRules) return;
    if (credits <= 0 && !freeSpin) return;

    // Deduct bet cost for non-free spins
    if (!freeSpin) {
      setCredits(prev => prev - 20);
      setTotalBet(prev => prev + 20);
    }

    setSpinning(true);
    playSpinStart();
    setMatchBonus(null);

    // Draw 3 cards upfront
    const drawnCards = [drawCard(deck), drawCard(deck), drawCard(deck)];

    // Start all 3 reels spinning (flicker)
    setReelSpinning([true, true, true]);
    setReelStopped([false, false, false]);
    setReels([null, null, null]);

    // Pre-draw symbols (single roll determines triple alignment)
    const reelRoll = forcedSymbolsRef.current
      ? { symbols: forcedSymbolsRef.current, triple: (forcedSymbolsRef.current[0] === forcedSymbolsRef.current[1] && forcedSymbolsRef.current[1] === forcedSymbolsRef.current[2] && forcedSymbolsRef.current[0] !== 'BLANK' ? forcedSymbolsRef.current[0] : null) as GodSymbol | null }
      : rollReelSymbols(slotState);
    forcedSymbolsRef.current = null;
    const drawnSymbols = reelRoll.symbols;

    for (let r = 0; r < 3; r++) {
      reelFlickerRefs.current[r] = setInterval(() => {
        setReelFlicker(prev => {
          const next = [...prev];
          next[r] = deck[Math.floor(Math.random() * deck.length)];
          return next;
        });
        // Symbol flickering during spin
        setSymbolFlicker(prev => {
          const next = [...prev];
          const allSymbols: GodSymbol[] = ['GOD', 'RED7', 'YELLOW7', 'BLUE7', 'V_SYMBOL', 'BLANK'];
          next[r] = allSymbols[Math.floor(Math.random() * allSymbols.length)];
          return next;
        });
        playSpinTick();
      }, 90 + r * 15);
    }

    // Stop each reel sequentially
    for (let r = 0; r < 3; r++) {
      setTimeout(() => {
        if (reelFlickerRefs.current[r]) clearInterval(reelFlickerRefs.current[r]!);
        playReelStop(r);

        setReelSpinning(prev => { const n = [...prev]; n[r] = false; return n; });
        setReelStopped(prev => { const n = [...prev]; n[r] = true; return n; });
        setReels(prev => { const n = [...prev]; n[r] = drawnCards[r]; return n; });
        setReelFlicker(prev => { const n = [...prev]; n[r] = null; return n; });
        // Set symbol for this reel on stop
        setReelSymbols(prev => { const n = [...prev]; n[r] = drawnSymbols[r]; return n; });
        setSymbolFlicker(prev => { const n = [...prev]; n[r] = 'BLANK'; return n; });
      }, REEL_STOP_DELAYS[r]);
    }

    // After all reels stop: evaluate result
    setTimeout(() => {
      // 3リールで1つの出目。3枚のカードの平均ステータスで1回分のGPを算出
      const avgStats = drawnCards[0].stats.map((_, i) =>
        Math.round((drawnCards[0].stats[i] + drawnCards[1].stats[i] + drawnCards[2].stats[i]) / 3)
      );
      const card = drawnCards[1]; // Center = trait/display card
      const combinedCard: CardData = { ...card, stats: avgStats };
      const prevTrait = prevTraitRef.current;
      const traitDoubled = nextTraitDoubledRef.current;
      const curSpinInState = spinInStateRef.current;
      let gp = calcGP(combinedCard, slotState, stats.combo, curSpinInState, prevTrait, traitDoubled);

      // === PAYOUT SYSTEM ===
      const symbolTriple = reelRoll.triple;
      const nonBlankSymbols = drawnSymbols.filter(s => s !== 'BLANK');
      const baseGP = gp;

      if (symbolTriple === 'GOD') {
        gp = Math.round(baseGP * 10);
        setMatchBonus('GOD揃い! x10');
        playGachaSound('LEGENDARY');
      } else if (symbolTriple === 'RED7') {
        gp = Math.round(baseGP * 5);
        setMatchBonus('赤7揃い! x5');
        playGachaSound('SUPER');
      } else if (symbolTriple === 'YELLOW7') {
        gp = Math.round(baseGP * 3);
        setMatchBonus('黄7揃い! x3');
      } else if (symbolTriple === 'BLUE7') {
        gp = Math.round(baseGP * 2);
        setMatchBonus('青7揃い! x2');
      } else if (symbolTriple === 'V_SYMBOL') {
        gp = Math.round(baseGP * 3);
        setMatchBonus('V揃い! x3');
      } else {
        // --- NO TRIPLE: ペアか単発か、完全ハズレか ---
        const symbolCounts: Record<string, number> = {};
        drawnSymbols.forEach(s => { symbolCounts[s] = (symbolCounts[s] || 0) + 1; });
        const pairs = Object.entries(symbolCounts).filter(([k, v]) => v === 2 && k !== 'BLANK');

        if (pairs.length > 0) {
          const [pairSymbol] = pairs[0];
          if (pairSymbol === 'GOD') {
            gp = Math.round(baseGP * 1.5);
            setMatchBonus('GOD x2!');
          } else if (pairSymbol === 'RED7') {
            gp = Math.round(baseGP * 0.8);
            setMatchBonus('赤7 x2');
          } else {
            gp = Math.round(baseGP * 0.5);
            setMatchBonus(`${SYMBOL_LABELS[pairSymbol as GodSymbol]} x2`);
          }
        } else if (nonBlankSymbols.length >= 2) {
          gp = Math.round(baseGP * 0.3);
        } else if (nonBlankSymbols.length === 1) {
          gp = Math.round(baseGP * 0.1);
        } else {
          gp = 0;
        }
      }

      let newState = slotState;
      let transition: TransitionType | null = null;
      let newCombo = stats.combo;
      let newCzLeft = czSpinsLeft;
      const newRushSpins = rushSpins;
      let newSpecialLeft = specialSpinsLeft;
      let newFeverLeft = feverSpinsLeft;
      let newCeiling = ceilingCounter;
      let newSpinInState = curSpinInState + 1;

      const counterActive = counterTraitStoreRef.current;
      counterTraitStoreRef.current = false;

      switch (slotState) {
        case 'NORMAL': {
          newCeiling = ceilingCounter + 1;
          const czLimit = calcCeiling(avgSPA, card);

          if (symbolTriple === 'GOD') {
            newState = 'FEVER';
            transition = 'SPECIAL_TO_FEVER';
            setLoopRate(89);
            setGgSetsRemaining(5);
            setGgSetSpinsLeft(15);
            newFeverLeft = 5;
            newCeiling = 0;
            newSpinInState = 0;
          } else if (symbolTriple === 'RED7') {
            newState = 'SPECIAL';
            transition = 'RUSH_TO_SPECIAL';
            newSpecialLeft = 5;
            setLoopRate(80);
            setGgSetsRemaining(1);
            newCeiling = 0;
            newSpinInState = 0;
          } else if (symbolTriple === 'YELLOW7' || symbolTriple === 'BLUE7') {
            newState = 'RUSH';
            transition = 'CZ_TO_RUSH';
            const lr = assignLoopRate(symbolTriple === 'YELLOW7' ? 'yellow7' : 'blue7');
            setLoopRate(lr);
            setGgSetSpinsLeft(15);
            setGgSetsRemaining(0);
            newCeiling = 0;
            newSpinInState = 0;
            newCombo = 0;
          } else if (newCeiling >= czLimit || rollCZTrigger(card)) {
            newState = 'CZ';
            transition = 'NORMAL_TO_CZ';
            newCzLeft = 5;
            newCeiling = 0;
            newSpinInState = 0;
          }
          break;
        }
        case 'CZ': {
          newCzLeft = czSpinsLeft - 1;

          if (symbolTriple === 'GOD') {
            newState = 'FEVER';
            transition = 'SPECIAL_TO_FEVER';
            setLoopRate(89);
            setGgSetsRemaining(5);
            setGgSetSpinsLeft(15);
            newFeverLeft = 5;
            newSpinInState = 0;
          } else if (symbolTriple === 'RED7') {
            newState = 'SPECIAL';
            transition = 'RUSH_TO_SPECIAL';
            newSpecialLeft = 5;
            setLoopRate(80);
            setGgSetsRemaining(1);
            newSpinInState = 0;
          } else if (symbolTriple === 'V_SYMBOL' || symbolTriple === 'YELLOW7' || symbolTriple === 'BLUE7') {
            newState = 'RUSH';
            transition = 'CZ_TO_RUSH';
            const trigger = symbolTriple === 'V_SYMBOL' ? 'v_symbol' : symbolTriple === 'YELLOW7' ? 'yellow7' : 'blue7';
            setLoopRate(assignLoopRate(trigger));
            setGgSetSpinsLeft(15);
            setGgSetsRemaining(0);
            newCombo = 0;
            newSpinInState = 0;
          } else if (drawnSymbols.includes('V_SYMBOL')) {
            newState = 'RUSH';
            transition = 'CZ_TO_RUSH';
            setLoopRate(assignLoopRate('v_symbol'));
            setGgSetSpinsLeft(15);
            setGgSetsRemaining(0);
            newCombo = 0;
            newSpinInState = 0;
          } else if (rollRushPromotion(card)) {
            newState = 'RUSH';
            transition = 'CZ_TO_RUSH';
            setLoopRate(50);
            setGgSetSpinsLeft(15);
            setGgSetsRemaining(0);
            newCombo = 0;
            newSpinInState = 0;
          } else if (newCzLeft <= 0) {
            newState = 'NORMAL';
            transition = 'FALL_TO_NORMAL';
            newCeiling = 0;
            newSpinInState = 0;
          }
          break;
        }
        case 'RUSH': {
          newCombo = stats.combo + 1;
          const newSetSpins = ggSetSpinsLeft - 1;

          if (symbolTriple === 'GOD') {
            newState = 'FEVER';
            transition = 'SPECIAL_TO_FEVER';
            setLoopRate(89);
            setGgSetsRemaining(prev => prev + 5);
            setGgSetSpinsLeft(15);
            newFeverLeft = 5;
            newSpinInState = 0;
          } else if (symbolTriple === 'RED7') {
            newState = 'SPECIAL';
            transition = 'RUSH_TO_SPECIAL';
            newSpecialLeft = 5;
            newSpinInState = 0;
          } else if (newSetSpins <= 0) {
            if (ggSetsRemaining > 0) {
              setGgSetsRemaining(prev => prev - 1);
              setGgSetSpinsLeft(15);
              setMatchBonus(`継続! 残り${ggSetsRemaining - 1}セット`);
            } else if (Math.random() * 100 < loopRate) {
              setGgSetSpinsLeft(15);
              setMatchBonus(`${loopRate}%ループ継続!`);
              playFeverChainHit(newCombo);
            } else {
              newState = 'NORMAL';
              transition = 'FALL_TO_NORMAL';
              newCeiling = 0;
              newSpinInState = 0;
            }
          } else {
            setGgSetSpinsLeft(newSetSpins);
            if (symbolTriple === 'YELLOW7') {
              const newLoop = Math.min(89, loopRate + 10);
              setLoopRate(newLoop);
              setMatchBonus(`ループ率UP! ${newLoop}%`);
            }
          }
          break;
        }
        case 'SPECIAL': {
          newSpecialLeft = specialSpinsLeft - 1;
          newCombo = stats.combo + 1;

          if (symbolTriple === 'GOD') {
            newState = 'FEVER';
            transition = 'SPECIAL_TO_FEVER';
            setLoopRate(89);
            setGgSetsRemaining(prev => prev + 5);
            setGgSetSpinsLeft(15);
            newFeverLeft = 5;
            newSpinInState = 0;
          } else if (newSpecialLeft <= 0) {
            newState = 'RUSH';
            setGgSetSpinsLeft(15);
            newSpinInState = 0;
          }
          break;
        }
        case 'FEVER': {
          newFeverLeft = feverSpinsLeft - 1;
          newCombo = stats.combo + 1;

          if (newFeverLeft <= 0) {
            newState = 'RUSH';
            setGgSetSpinsLeft(15);
            setLoopRate(89);
            newSpinInState = 0;
          }
          break;
        }
      }

      let finalGP = Math.round(gp);
      if (counterActive) finalGP *= 3;

      prevTraitRef.current = card.trait;
      nextTraitDoubledRef.current = card.trait.name === 'Harmonizer';
      spinInStateRef.current = newSpinInState;

      const isDouble = rollDoubleSpin(card);
      const peakIdx = Math.max(stateIndex(stats.peakState), stateIndex(newState));
      const peakState = STATE_ORDER[peakIdx];

      // Add GP as credit winnings
      setCredits(prev => prev + finalGP);
      setTotalWin(prev => prev + finalGP);

      // Persist card points to localStorage
      if (finalGP > 0 && card.id) {
        cardPointsMapRef.current[card.id] = (cardPointsMapRef.current[card.id] || 0) + finalGP;
        saveCardPoints(cardPointsMapRef.current);
      }

      // Update mastery in localStorage on each spin (review count bump)
      if (card.id && !card.id.startsWith('demo')) {
        updateLocalMastery(card.id, card.mastery);
      }

      const spinResult: SpinResult = { card, gpEarned: finalGP, stateAfter: newState, transitionType: transition };

      // Sound effects (at evaluation time, after all reels stopped)
      playCardRankSound(card.rank);
      setTimeout(() => playGpCoin(), 150);

      if (newCombo > 0 && newCombo % 5 === 0) playFeverChainHit(newCombo);

      if (transition === 'NORMAL_TO_CZ') {
        playKakuhenEntry();
      } else if (transition === 'CZ_TO_RUSH') {
        playFeverEntrySound();
      } else if (transition === 'RUSH_TO_SPECIAL') {
        playFeverEntrySound();
        playImpactHit(0.8);
      } else if (transition === 'SPECIAL_TO_FEVER') {
        playFeverEntrySound();
        playImpactHit(1.0);
        if (feverBGMTimerRef.current) { clearTimeout(feverBGMTimerRef.current); feverBGMTimerRef.current = null; }
        feverBGMTimerRef.current = setTimeout(() => {
          feverBGMTimerRef.current = null;
          feverBGMRef.current = startFeverBGM();
        }, 800);
      } else if (transition === 'FALL_TO_NORMAL') {
        playStreakBreak();
        playFeverExitSound();
        if (feverBGMTimerRef.current) { clearTimeout(feverBGMTimerRef.current); feverBGMTimerRef.current = null; }
        if (feverBGMRef.current) { stopFeverBGM(feverBGMRef.current); feverBGMRef.current = null; }
      }

      const czLimit = calcCeiling(avgSPA, card);
      if (slotState === 'NORMAL' && newCeiling >= czLimit * 0.8 && !transition) {
        playReachAlert();
      }

      setCardAnimState('enter');
      setCurrentCard(card);
      setSlotState(newState);
      setCeilingCounter(newCeiling);
      setCzSpinsLeft(newCzLeft);
      setRushSpins(newRushSpins);
      setSpecialSpinsLeft(newSpecialLeft);
      setFeverSpinsLeft(newFeverLeft);
      setSpinInState(newSpinInState);

      setGpDelta(finalGP);
      setShowGpDelta(true);
      setTimeout(() => setShowGpDelta(false), 1000);
      setTimeout(() => setMatchBonus(null), 2000);

      setStats((prev) => ({
        totalGP: prev.totalGP + finalGP,
        totalSpins: prev.totalSpins + 1,
        combo: newState === 'NORMAL' ? 0 : newCombo,
        bestCombo: Math.max(prev.bestCombo, newCombo),
        czCount: prev.czCount + (transition === 'NORMAL_TO_CZ' ? 1 : 0),
        rushCount: prev.rushCount + (transition === 'CZ_TO_RUSH' ? 1 : 0),
        specialCount: prev.specialCount + (transition === 'RUSH_TO_SPECIAL' ? 1 : 0),
        feverCount: prev.feverCount + (transition === 'SPECIAL_TO_FEVER' ? 1 : 0),
        peakState,
        stateHistory: [...prev.stateHistory.slice(-19), newState],
      }));

      if (newCombo > 0 && newCombo % 5 === 0) {
        setComboShake(true);
        setTimeout(() => setComboShake(false), 400);
      }

      setLastSpins((prev) => [...prev.slice(-(isMobile ? 2 : 4)), spinResult]);

      if (transition) {
        setTransitionEffect(transition);
        setTimeout(() => setTransitionEffect(null), 1200);
      }

      setDoubleSpin(isDouble);

      // Check for game over after spin
      const newIsFreeSpin = newState === 'RUSH' || newState === 'SPECIAL' || newState === 'FEVER';
      setCredits(prevCredits => {
        if (prevCredits <= 0 && !newIsFreeSpin) {
          setGameOver(true);
        }
        return prevCredits;
      });

      setTimeout(() => {
        setCardAnimState('idle');
        setSpinning(false);
        if (isDouble && !gameOver) setDoubleSpin(false);
      }, 300);
    }, REEL_STOP_DELAYS[2] + 300); // After all 3 reels stop + settle time
  }, [
    spinning, deck, credits, gameOver, showRules,
    slotState, stats, czSpinsLeft, rushSpins, rushMinSpins, specialSpinsLeft,
    feverSpinsLeft, ceilingCounter, avgSPA, isMobile,
    loopRate, ggSetSpinsLeft, ggSetsRemaining,
  ]);

  // ── Keyboard: Space to spin ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        if (showRules) {
          setShowRules(false);
        } else {
          doSpin();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [doSpin, showRules]);

  const resetSession = () => {
    setSlotState('NORMAL');
    setCurrentCard(null);
    setCeilingCounter(0);
    setCzSpinsLeft(0);
    setRushSpins(0);
    setSpecialSpinsLeft(0);
    setFeverSpinsLeft(0);
    setSpinInState(0);
    spinInStateRef.current = 0;
    setStats({
      totalGP: 0, totalSpins: 0, combo: 0, bestCombo: 0,
      czCount: 0, rushCount: 0, specialCount: 0, feverCount: 0,
      peakState: 'NORMAL', stateHistory: [],
    });
    setDisplayedGP(0);
    setCredits(3000);
    setTotalBet(0);
    setTotalWin(0);
    setGameOver(false);
    setLastSpins([]);
    setReels([null, null, null]);
    setReelSpinning([false, false, false]);
    setReelStopped([false, false, false]);
    setReelFlicker([null, null, null]);
    setMatchBonus(null);
    setLoopRate(0);
    setGgSetSpinsLeft(0);
    setGgSetsRemaining(0);
    setReelSymbols(['BLANK', 'BLANK', 'BLANK']);
    setSymbolFlicker(['BLANK', 'BLANK', 'BLANK']);
    lastStandUsedRef.current = false;
    prevTraitRef.current = null;
    nextTraitDoubledRef.current = false;
    counterTraitStoreRef.current = false;
    forcedSymbolsRef.current = null;
  };

  // ── DEV Panel: force trigger helpers ──
  const forceSymbols = (sym: GodSymbol) => {
    forcedSymbolsRef.current = [sym, sym, sym];
  };

  const forceState = (state: SlotState, lr?: number) => {
    setSlotState(state);
    if (lr !== undefined) setLoopRate(lr);
    if (state === 'RUSH') { setGgSetSpinsLeft(15); setGgSetsRemaining(0); }
    if (state === 'SPECIAL') { setSpecialSpinsLeft(5); }
    if (state === 'FEVER') { setFeverSpinsLeft(5); setGgSetsRemaining(5); setLoopRate(89); }
    if (state === 'CZ') { setCzSpinsLeft(5); }
  };

  const forceLoopSuccess = () => {
    if (slotState === 'RUSH') {
      setGgSetSpinsLeft(15);
      setMatchBonus('DEV: ループ強制継続');
    }
  };

  const forceLoopFail = () => {
    if (slotState === 'RUSH') {
      setSlotState('NORMAL');
      setCeilingCounter(0);
    }
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RULES SCREEN
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderRules = () => {
    const bstRows = [
      { stat: 'HP', ja: '体力', desc: 'セッションのスタミナ(長く遊べる)', color: STAT_COLORS[0] },
      { stat: 'ATK', ja: '攻撃', desc: 'GPの基本倍率が上がる', color: STAT_COLORS[1] },
      { stat: 'DEF', ja: '防御', desc: '転落からの生還率が上がる', color: STAT_COLORS[2] },
      { stat: 'SPA', ja: '知力', desc: 'G-STOP突入しやすくなる', color: STAT_COLORS[3] },
      { stat: 'SPD', ja: '精神', desc: 'GOD GAMEが長く続きやすい', color: STAT_COLORS[4] },
      { stat: 'SPE', ja: '速度', desc: 'SGGに入りやすい', color: STAT_COLORS[5] },
    ];

    const sectionStyle: React.CSSProperties = {
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16,
      padding: isMobile ? '20px 16px' : '24px 28px',
      marginBottom: 16,
      backdropFilter: 'blur(8px)',
    };

    const sectionTitle = (text: string) => (
      <div style={{
        fontSize: 11, fontWeight: 800, color: '#D4AF37',
        letterSpacing: '0.2em', marginBottom: 16,
        paddingBottom: 8, borderBottom: '1px solid rgba(212,175,55,0.15)',
      }}>
        {text}
      </div>
    );

    const divider = () => (
      <div style={{
        height: 1, margin: '8px 0',
        background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 30%, rgba(168,85,247,0.1) 70%, transparent 100%)',
      }} />
    );

    const symbolRows: { symbol: GodSymbol; label: string; mult: string; effect: string }[] = [
      { symbol: 'GOD', label: 'GOD', mult: 'x10', effect: '通常/G-STOP --> PGG直行 / GG中 --> PGG昇格' },
      { symbol: 'RED7', label: '赤7', mult: 'x5', effect: '通常/G-STOP --> SGG / GG中 --> SGG昇格' },
      { symbol: 'YELLOW7', label: '黄7', mult: 'x3', effect: '通常/G-STOP --> GG(67%) / GG中 --> ループ率UP' },
      { symbol: 'BLUE7', label: '青7', mult: 'x2', effect: '通常/G-STOP --> GG(50%)' },
      { symbol: 'V_SYMBOL', label: 'V', mult: 'x3', effect: 'G-STOP中 --> GG(67%) / 単体Vでも発動' },
    ];

    const stateCards: { state: SlotState; ja: string; spins: string; enter: string; during: string; exit: string }[] = [
      {
        state: 'NORMAL', ja: '通常',
        spins: '無制限',
        enter: 'ゲーム開始時 / GGループ失敗後',
        during: '毎スピンで天井カウンタ加算。天井到達でG-STOP。シンボル揃いで直接上位モードへ。',
        exit: '天井 or SPA抽選 --> G-STOP / 7揃い --> GG / GOD揃い --> PGG',
      },
      {
        state: 'CZ', ja: 'G-STOP',
        spins: '5G',
        enter: '通常天井 / SPA抽選当選',
        during: '5G以内にGOD GAMEを掴め。V出現で即GG確定。シンボル揃いで上位モード直行。',
        exit: '成功 --> GG / 失敗(5G消化) --> 通常',
      },
      {
        state: 'RUSH', ja: 'GOD GAME (GG)',
        spins: '1セット15G',
        enter: 'G-STOP成功 / 7揃い',
        during: 'セット制。15G消化後にループ率で継続判定。コンボが続くほどGP倍増。赤7揃いでSGG、GOD揃いでPGGに昇格。',
        exit: 'ループ失敗 --> 通常 / 赤7揃い --> SGG / GOD揃い --> PGG',
      },
      {
        state: 'SPECIAL', ja: 'SGG',
        spins: '5G',
        enter: 'GG中に赤7揃い / 通常から赤7揃い',
        during: 'GP x5 の高倍率5G。GOD揃いでPGGチャンス。終了後GGに戻る。',
        exit: '5G消化 --> GG / GOD揃い --> PGG',
      },
      {
        state: 'FEVER', ja: 'PGG',
        spins: '5G',
        enter: 'GOD揃い',
        during: 'GP x10 の最強モード。終了後89%ループのGGに戻る。',
        exit: '5G消化 --> GG(89%ループ)',
      },
    ];

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0A0908 0%, #1C1917 30%, #0A0908 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        padding: isMobile ? '24px 16px' : '40px 24px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 20%, rgba(212,175,55,0.05) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(168,85,247,0.03) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 640, width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Back */}
          <Link href="/english/training" style={{
            fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
            fontWeight: 600, letterSpacing: '0.05em', display: 'inline-block', marginBottom: 24,
          }}>
            {'<'} トレーニングに戻る
          </Link>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: isMobile ? 24 : 32 }}>
            <div style={{
              fontSize: isMobile ? 32 : 48, fontWeight: 900, letterSpacing: '0.15em',
              background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 40%, #D4AF37 70%, #B8941E 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              lineHeight: 1.1,
              filter: 'drop-shadow(0 2px 4px rgba(212,175,55,0.3))',
            }}>
              CARD SLOT
            </div>
            <div style={{
              fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.4em',
              marginTop: 6, fontWeight: 600,
            }}>
              MILLION GOD x VOCABULARY
            </div>
          </div>

          {/* Section 1: CONCEPT */}
          <div style={sectionStyle}>
            {sectionTitle('CONCEPT -- 概要')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'ミリオンゴッド凱旋のシンボル揃い x ボキャブラリーカードのGP',
                '各リールにはシンボル(GOD/赤7/黄7/青7/V)とカードが出現',
                'シンボル3揃いでモード移行。カードのステータスでGP計算',
                'GOD GAMEはセット制 -- ループ率で継続が決まる',
              ].map((text, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                }}>
                  <div style={{
                    width: 4, height: 4, borderRadius: '50%', backgroundColor: '#D4AF37',
                    marginTop: 6, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, color: '#E7E5E4', fontWeight: 500, lineHeight: 1.5 }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: HOW TO PLAY */}
          <div style={sectionStyle}>
            {sectionTitle('HOW TO PLAY -- 遊び方')}
            {[
              { step: '01', text: 'SPIN を押す (SPACEキーでもOK)' },
              { step: '02', text: '3リール同時回転。各リールにシンボルとカードが出る' },
              { step: '03', text: 'シンボル3揃いでGPボーナス + モード移行' },
              { step: '04', text: 'GOD GAMEに入ったら15Gx1セット。ループ率で継続判定' },
              { step: '05', text: 'ループが続く限りGPを稼ぎ続けろ' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 4 ? 12 : 0,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'linear-gradient(135deg, #D4AF3720, #D4AF3710)',
                  border: '1px solid #D4AF3730',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 900, color: '#D4AF37', fontFamily: 'monospace',
                  flexShrink: 0,
                }}>
                  {item.step}
                </div>
                <span style={{ fontSize: 14, color: '#E7E5E4', fontWeight: 500, lineHeight: 1.4 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {divider()}

          {/* Section 3: SYMBOL SYSTEM */}
          <div style={{
            ...sectionStyle,
            border: '1px solid rgba(212,175,55,0.2)',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.04), rgba(255,255,255,0.02))',
          }}>
            {sectionTitle('SYMBOL SYSTEM -- シンボル揃い')}
            <div style={{
              fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 20,
            }}>
              各リールにシンボルが出現。3つ揃うとGPボーナス倍率 + 状態遷移が発動する。
            </div>

            {symbolRows.map((row) => (
              <div key={row.symbol} style={{
                padding: '14px 16px', borderRadius: 12, marginBottom: 10,
                backgroundColor: `${SYMBOL_COLORS[row.symbol]}08`,
                border: `1px solid ${SYMBOL_COLORS[row.symbol]}25`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      padding: '4px 12px', borderRadius: 6,
                      backgroundColor: `${SYMBOL_COLORS[row.symbol]}CC`,
                      color: 'white', fontSize: 13, fontWeight: 900, letterSpacing: '0.1em',
                    }}>
                      {row.label}
                    </div>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>3揃い</span>
                  </div>
                  <span style={{
                    fontSize: 18, fontWeight: 900, color: SYMBOL_COLORS[row.symbol], fontFamily: 'monospace',
                  }}>
                    {row.mult}
                  </span>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                  {row.effect}
                </div>
              </div>
            ))}
          </div>

          {divider()}

          {/* Section 4: LOOP RATE SYSTEM */}
          <div style={{
            ...sectionStyle,
            border: '1px solid rgba(239,68,68,0.2)',
            background: 'linear-gradient(135deg, rgba(239,68,68,0.04), rgba(255,255,255,0.02))',
          }}>
            {sectionTitle('LOOP RATE -- ループ率システム')}
            <div style={{
              fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, marginBottom: 16,
            }}>
              GOD GAMEはセット制(1セット=15G)。セット完了後、ループ率に基づいて継続判定。
              突入契機が強いほどループ率が高い。
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { trigger: 'GOD揃い', rate: '89%', color: '#D4AF37' },
                { trigger: '赤7揃い', rate: '80%', color: '#EF4444' },
                { trigger: '黄7揃い / V揃い', rate: '67%', color: '#F59E0B' },
                { trigger: '青7揃い / 天井', rate: '50%', color: '#3B82F6' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 14px', borderRadius: 8,
                  backgroundColor: `${item.color}08`, border: `1px solid ${item.color}15`,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.trigger}</span>
                  <span style={{
                    fontSize: 16, fontWeight: 900, color: item.color, fontFamily: 'monospace',
                  }}>
                    {item.rate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {divider()}

          {/* Section 5: STATE MACHINE */}
          <div style={sectionStyle}>
            {sectionTitle('STATE MACHINE -- 状態遷移')}
            <div style={{
              fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 20,
            }}>
              ミリオンゴッド凱旋型の状態遷移。SGG/PGGはGGに戻る(通常には落ちない)。
            </div>

            {/* Flow diagram */}
            <div style={{
              padding: '16px', borderRadius: 12, marginBottom: 20,
              backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)',
              fontFamily: 'monospace', fontSize: isMobile ? 9 : 11, lineHeight: 1.8,
              color: 'rgba(255,255,255,0.5)', whiteSpace: 'pre-wrap', overflowX: 'auto',
            }}>
              <span style={{ color: '#78716C', fontWeight: 800 }}>通常</span>{'\n'}
              {'  |-- 天井/SPA抽選 --> G-STOP\n'}
              {'  |-- 7揃い --> GOD GAME\n'}
              {'  |-- GOD揃い --> PGG\n'}
              {'      |\n'}
              <span style={{ color: '#0EA5E9', fontWeight: 800 }}>G-STOP</span>{' (5G)\n'}
              {'  |-- V出現/7揃い --> GOD GAME\n'}
              {'  |-- GOD揃い --> PGG\n'}
              {'  |-- 失敗 --> 通常に転落\n'}
              {'      |\n'}
              <span style={{ color: '#EF4444', fontWeight: 800 }}>GOD GAME</span>{' (15G x セット)\n'}
              {'  |-- セット完了 --> ループ率で継続判定\n'}
              {'  |-- 赤7揃い --> SGG\n'}
              {'  |-- GOD揃い --> PGG\n'}
              {'  |-- ループ失敗 --> 通常に戻る\n'}
              {'      |\n'}
              <span style={{ color: '#A855F7', fontWeight: 800 }}>SGG</span>{' (5G)\n'}
              {'  |-- 5G消化 --> GOD GAMEに戻る\n'}
              {'  |-- GOD揃い --> PGG\n'}
              {'      |\n'}
              <span style={{ color: '#D4AF37', fontWeight: 800 }}>PGG</span>{' (5G)\n'}
              {'  |-- 5G消化 --> GOD GAME(89%)に戻る'}
            </div>

            {/* Individual state cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {stateCards.map((sc, i) => {
                const cfg = STATE_CONFIG[sc.state];
                return (
                  <div key={sc.state}>
                    <div style={{
                      padding: '16px', borderRadius: 12,
                      backgroundColor: `${cfg.color}08`,
                      border: `1px solid ${cfg.color}25`,
                    }}>
                      {/* Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{
                            width: 8, height: 8, borderRadius: '50%', backgroundColor: cfg.color,
                            boxShadow: `0 0 8px ${cfg.color}60`,
                          }} />
                          <span style={{ fontSize: 15, fontWeight: 900, color: cfg.color, letterSpacing: '0.05em' }}>
                            {cfg.label}
                          </span>
                          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                            {sc.ja}
                          </span>
                        </div>
                        <span style={{
                          fontSize: 10, fontWeight: 700, color: cfg.color,
                          padding: '2px 8px', borderRadius: 4,
                          backgroundColor: `${cfg.color}15`,
                          fontFamily: 'monospace',
                        }}>
                          {sc.spins}
                        </span>
                      </div>

                      {/* Details */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ fontSize: 11 }}>
                          <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>突入: </span>
                          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{sc.enter}</span>
                        </div>
                        <div style={{ fontSize: 11 }}>
                          <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>内容: </span>
                          <span style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{sc.during}</span>
                        </div>
                        <div style={{ fontSize: 11 }}>
                          <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 700 }}>終了: </span>
                          <span style={{ color: 'rgba(255,255,255,0.55)' }}>{sc.exit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow connector */}
                    {i < stateCards.length - 1 && (
                      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
                        <div style={{
                          width: 0, height: 0,
                          borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                          borderTop: `8px solid ${STATE_CONFIG[stateCards[i + 1].state].color}30`,
                        }} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {divider()}

          {/* Section 6: CARD STATS */}
          <div style={sectionStyle}>
            {sectionTitle('CARD STATS -- カードステータス')}
            <div style={{
              fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 16,
            }}>
              各カードはIDから生成された6つのステータスを持つ。BST(Base Stat Total)= 全ステの合計値でティアが決まる。
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {bstRows.map((row) => (
                <div key={row.stat} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px', borderRadius: 8,
                  backgroundColor: `${row.color}08`,
                  border: `1px solid ${row.color}12`,
                }}>
                  <span style={{
                    fontSize: 14, fontWeight: 900, color: row.color,
                    fontFamily: 'monospace', width: 36, flexShrink: 0, textAlign: 'center',
                  }}>
                    {row.stat}
                  </span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', width: 24, flexShrink: 0 }}>
                    {row.ja}
                  </span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 500, flex: 1 }}>
                    {row.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7: CREDIT SYSTEM */}
          <div style={{
            ...sectionStyle,
            border: '1px solid rgba(212,175,55,0.2)',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.04), rgba(255,255,255,0.02))',
          }}>
            {sectionTitle('CREDIT SYSTEM -- メダルシステム')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: '初期クレジット', value: '3,000枚', color: '#D4AF37' },
                { label: '1スピンのコスト', value: '20枚 (通常/G-STOP)', color: '#EF4444' },
                { label: 'GG/SGG/PGG中', value: 'フリースピン (消費なし)', color: '#10B981' },
                { label: 'GP獲得', value: 'そのままメダルとして加算', color: '#D4AF37' },
                { label: 'GAME OVER', value: 'クレジット0枚で終了', color: '#EF4444' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '8px 14px', borderRadius: 8,
                  backgroundColor: `${item.color}08`, border: `1px solid ${item.color}15`,
                }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{item.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {divider()}

          {/* Section 8: TIPS */}
          <div style={sectionStyle}>
            {sectionTitle('TIPS -- 攻略のコツ')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { tip: '天井を意識して通常を耐えろ', detail: '通常は辛いが、天井でG-STOP確定。7揃いを祈りつつ回せ。' },
                { tip: 'G-STOPは5Gしかない', detail: '5G以内にV出現 or 7揃いでGG。一瞬が勝負。' },
                { tip: 'GOD GAMEはループ率が命', detail: 'GOD揃いで入れば89%ループ。青7の50%でも粘れる。' },
                { tip: 'SGG/PGGはGGに戻る', detail: '上位モードに入っても通常には落ちない。GGからの再スタート。' },
                { tip: 'GG中はフリースピン', detail: 'クレジット消費なしで回せる。ここで稼いで差枚をプラスにしろ。' },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '10px 14px', borderRadius: 10,
                  backgroundColor: 'rgba(212,175,55,0.04)',
                  border: '1px solid rgba(212,175,55,0.1)',
                }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#D4AF37', marginBottom: 4 }}>
                    {item.tip}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5 }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <button
              onClick={() => setShowRules(false)}
              style={{
                padding: isMobile ? '20px 60px' : '22px 88px',
                fontSize: isMobile ? 22 : 28,
                fontWeight: 900, letterSpacing: '0.3em',
                color: '#0A0908',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 40%, #D4AF37 70%, #B8941E 100%)',
                border: 'none', borderRadius: 16, cursor: 'pointer',
                boxShadow: '0 0 60px rgba(212,175,55,0.5), 0 0 120px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
                transition: 'all 200ms',
                animation: 'card-gold-pulse 2s ease-in-out infinite',
              }}
            >
              ゲーム開始
            </button>
            <div style={{
              fontSize: 10, color: 'rgba(255,255,255,0.15)', marginTop: 12, letterSpacing: '0.15em',
            }}>
              SPACE / CLICK TO START
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // CARD RENDERER (premium quality from card-preview)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderPremiumCard = (card: CardData) => {
    const rank = card.rank;
    const isHolo = rank === 'HOLOGRAPHIC' || rank === 'LEGENDARY';
    const isLegendary = rank === 'LEGENDARY';
    const isTextLight = rank === 'LEGENDARY';
    const w = isMobile ? 260 : 280;
    const h = isMobile ? 400 : 430;
    const frame = getCardFrame(rank);
    const shadow = getCardShadow(rank);
    const accent = getFrameAccent(rank);
    const borderColor = getRankBorderColor(rank);
    const bstTotal = card.bstTotal;
    const bstTier = getBstTier(bstTotal);
    const ci = CHAKRA[Math.min(card.mastery, 6)] || CHAKRA[0];

    // Static holo angle (no tilt in slot mode)
    const holoAngle = 135;
    const holoGradient = isLegendary
      ? `linear-gradient(${holoAngle}deg, rgba(212,175,55,0.15) 0%, rgba(168,85,247,0.2) 25%, rgba(212,175,55,0.15) 50%, rgba(168,85,247,0.2) 75%, rgba(212,175,55,0.15) 100%)`
      : `linear-gradient(${holoAngle}deg, rgba(232,121,249,0.15) 0%, rgba(99,102,241,0.15) 20%, rgba(59,130,246,0.15) 40%, rgba(16,185,129,0.15) 60%, rgba(245,158,11,0.15) 80%, rgba(232,121,249,0.15) 100%)`;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: `${w}px`,
            height: `${h}px`,
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            ...frame,
            boxShadow: shadow,
            padding: '8px',
            willChange: 'transform',
            ...(isLegendary ? { animation: 'card-legendary-aura 4s ease-in-out infinite' } : {}),
            ...(rank === 'GOLD' ? { animation: 'card-gold-pulse 5s ease-in-out infinite' } : {}),
            ...(cardAnimState === 'enter' ? { animation: 'cardEnter 300ms ease-out' } : {}),
            ...(cardAnimState === 'exit' ? { animation: 'cardExit 200ms ease-out forwards' } : {}),
          }}
        >
          {/* Holographic overlay */}
          {isHolo && (
            <div style={{
              position: 'absolute', inset: 0,
              background: holoGradient,
              backgroundSize: '200% 200%',
              animation: 'card-holo-shimmer 3s linear infinite',
              borderRadius: '4px',
              pointerEvents: 'none',
              zIndex: 4,
              opacity: 0.15,
              mixBlendMode: 'overlay' as const,
            }} />
          )}

          {/* Legendary particles */}
          {isLegendary && Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${3 + (i % 3)}px`,
              height: `${3 + (i % 3)}px`,
              borderRadius: '50%',
              background: i % 2 === 0 ? '#D4AF37' : '#A855F7',
              left: `${10 + (i * 7) % 80}%`,
              top: `${5 + (i * 13) % 85}%`,
              animation: `card-particle-float ${2 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              opacity: 0.7,
              zIndex: 6,
              pointerEvents: 'none' as const,
              filter: 'blur(0.5px)',
            }} />
          ))}

          {/* Top Name Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '6px 10px',
            backgroundColor: isTextLight ? 'rgba(255,255,255,0.06)' : `${accent}12`,
            borderRadius: '8px 8px 0 0',
            borderBottom: `1px solid ${isTextLight ? 'rgba(255,255,255,0.1)' : accent + '30'}`,
            position: 'relative',
            zIndex: 7,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ElementBadge element={card.element} size={12} />
              <span style={{
                fontSize: '9px',
                fontWeight: '800',
                color: borderColor,
                letterSpacing: '1.5px',
                textShadow: isHolo ? `0 0 8px ${borderColor}60` : 'none',
              }}>
                {rank !== 'NORMAL' ? RANK_LABELS[rank] : ''}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
              <span style={{
                fontSize: '14px', fontWeight: '900',
                color: rank !== 'NORMAL' ? borderColor : '#A8A29E',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {card.cardPoints}
              </span>
              <span style={{
                fontSize: '8px', fontWeight: '700',
                color: isTextLight ? 'rgba(255,255,255,0.4)' : '#A8A29E',
              }}>
                SP
              </span>
            </div>
          </div>

          {/* Illustration Window */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: getCardWindowBg(rank),
            borderRadius: '8px',
            border: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '25'}`,
            margin: '6px 0',
            padding: '16px 14px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 7,
            overflow: 'hidden',
          }}>
            {/* Rank-specific background patterns */}
            {rank === 'BRONZE' && (
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.04,
                background: 'repeating-linear-gradient(45deg, #CD7F32, #CD7F32 1px, transparent 1px, transparent 12px)',
                pointerEvents: 'none',
              }} />
            )}
            {rank === 'SILVER' && (
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.05,
                background: 'repeating-linear-gradient(-45deg, #94A3B8, #94A3B8 1px, transparent 1px, transparent 14px)',
                pointerEvents: 'none',
              }} />
            )}
            {rank === 'GOLD' && (
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.03,
                background: 'radial-gradient(circle at 30% 40%, #D4AF37 0.5px, transparent 0.5px)',
                backgroundSize: '16px 16px',
                pointerEvents: 'none',
              }} />
            )}
            {isHolo && (
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.06,
                background: `repeating-conic-gradient(from ${holoAngle}deg, rgba(168,85,247,0.1) 0deg, rgba(59,130,246,0.1) 60deg, rgba(232,121,249,0.1) 120deg, rgba(16,185,129,0.1) 180deg, rgba(245,158,11,0.1) 240deg, rgba(168,85,247,0.1) 360deg)`,
                pointerEvents: 'none',
              }} />
            )}

            {/* English phrase */}
            <div style={{
              fontSize: '22px',
              fontWeight: '800',
              color: isTextLight ? '#FAFAF9' : '#1C1917',
              lineHeight: 1.3,
              marginBottom: '8px',
              letterSpacing: '-0.3px',
              position: 'relative',
              textShadow: isTextLight ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
            }}>
              {card.phrase}
            </div>
            {/* Japanese meaning */}
            <div style={{
              fontSize: '13px',
              color: isTextLight ? 'rgba(255,255,255,0.5)' : '#78716C',
              lineHeight: 1.4,
              position: 'relative',
            }}>
              {card.meaning}
            </div>

            {/* Flavor Text */}
            <div style={{
              marginTop: '12px',
              paddingTop: '10px',
              borderTop: `1px solid ${isTextLight ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
              position: 'relative',
            }}>
              <div style={{
                fontSize: '10px',
                fontStyle: 'italic',
                color: isTextLight ? 'rgba(255,255,255,0.35)' : '#A8A29E',
                lineHeight: 1.4,
                letterSpacing: '0.2px',
              }}>
                &ldquo;{card.flavorText.en}&rdquo;
              </div>
              <div style={{
                fontSize: '8px',
                color: isTextLight ? 'rgba(255,255,255,0.2)' : '#C4B5A4',
                lineHeight: 1.3,
                marginTop: '2px',
              }}>
                {card.flavorText.ja}
              </div>
            </div>

            {/* Trait badge (between flavor text and bottom bar) */}
            <div style={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '3px 10px',
                borderRadius: 6,
                backgroundColor: isTextLight ? 'rgba(212,175,55,0.12)' : '#D4AF3712',
                border: `1px solid ${isTextLight ? 'rgba(212,175,55,0.25)' : '#D4AF3720'}`,
              }}>
                <span style={{
                  fontSize: 10, fontWeight: 800, color: '#D4AF37', letterSpacing: '0.05em',
                }}>
                  {card.trait.nameJa}
                </span>
                <span style={{
                  fontSize: 9, fontWeight: 600,
                  color: isTextLight ? 'rgba(255,255,255,0.4)' : '#78716C',
                }}>
                  {card.trait.name}
                </span>
              </div>
              <span style={{
                fontSize: 8,
                color: isTextLight ? 'rgba(255,255,255,0.25)' : '#A8A29E',
              }}>
                {card.trait.description}
              </span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 10px',
            backgroundColor: isTextLight ? 'rgba(255,255,255,0.04)' : `${accent}08`,
            borderRadius: '0 0 8px 8px',
            borderTop: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '20'}`,
            position: 'relative',
            zIndex: 7,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontSize: '8px', fontWeight: '700',
                color: isTextLight ? 'rgba(255,255,255,0.35)' : '#A8A29E',
                letterSpacing: '1px',
              }}>
                {RANK_LABELS[rank]}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '2px',
                padding: '1px 5px', borderRadius: '4px',
                backgroundColor: ci.color + (isTextLight ? '30' : '12'),
                border: `1px solid ${ci.color}${isTextLight ? '50' : '25'}`,
              }}>
                <span style={{
                  fontSize: '10px', fontWeight: '900', color: ci.color, lineHeight: 1,
                }}>
                  {ci.ja}
                </span>
                <span style={{
                  fontSize: '6px', fontWeight: '700', color: ci.color, opacity: 0.7, letterSpacing: '0.3px',
                }}>
                  {ci.name}
                </span>
              </span>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{
                fontSize: '7px', fontWeight: '800', color: bstTier.color, letterSpacing: '0.5px',
              }}>
                {bstTier.tier} {bstTotal}
              </span>
              <span style={{
                fontSize: '7px', fontWeight: '600',
                color: isTextLight ? 'rgba(255,255,255,0.3)' : '#A8A29E',
                fontFamily: 'monospace',
              }}>
                {card.id.slice(0, 6)}
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // REEL CARD (compact for 3-reel display)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderReelCard = (card: CardData, reelIdx: number) => {
    const rank = card.rank;
    const isHolo = rank === 'HOLOGRAPHIC' || rank === 'LEGENDARY';
    const isLegendary = rank === 'LEGENDARY';
    const isTextLight = rank === 'LEGENDARY';
    const w = isMobile ? 100 : 140;
    const h = isMobile ? 160 : 210;
    const frame = getCardFrame(rank);
    const shadow = getCardShadow(rank);
    const accent = getFrameAccent(rank);
    const borderColor = getRankBorderColor(rank);
    const bstTier = getBstTier(card.bstTotal);
    const isStopping = reelStopped[reelIdx] && cardAnimState === 'enter';

    return (
      <div style={{
        width: w, height: h,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...frame,
        border: frame.border.replace('8px', isMobile ? '4px' : '6px'),
        boxShadow: shadow,
        padding: isMobile ? '3px' : '5px',
        ...(isLegendary ? { animation: 'card-legendary-aura 4s ease-in-out infinite' } : {}),
        ...(rank === 'GOLD' ? { animation: 'card-gold-pulse 5s ease-in-out infinite' } : {}),
        ...(isStopping ? { animation: 'reelSlam 300ms ease-out' } : {}),
      }}>
        {/* Holo overlay */}
        {isHolo && (
          <div style={{
            position: 'absolute', inset: 0,
            background: isLegendary
              ? 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(168,85,247,0.2) 50%, rgba(212,175,55,0.15) 100%)'
              : 'linear-gradient(135deg, rgba(232,121,249,0.15) 0%, rgba(59,130,246,0.15) 50%, rgba(232,121,249,0.15) 100%)',
            backgroundSize: '200% 200%',
            animation: 'card-holo-shimmer 3s linear infinite',
            borderRadius: '2px', pointerEvents: 'none', zIndex: 4, opacity: 0.15,
            mixBlendMode: 'overlay' as const,
          }} />
        )}

        {/* Legendary particles (fewer) */}
        {isLegendary && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${2 + (i % 2)}px`, height: `${2 + (i % 2)}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#D4AF37' : '#A855F7',
            left: `${10 + (i * 14) % 80}%`,
            top: `${5 + (i * 17) % 85}%`,
            animation: `card-particle-float ${2 + (i % 2)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            opacity: 0.7, zIndex: 6, pointerEvents: 'none' as const,
          }} />
        ))}

        {/* Top bar: element + rank */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: isMobile ? '2px 4px' : '3px 6px',
          backgroundColor: isTextLight ? 'rgba(255,255,255,0.06)' : `${accent}12`,
          borderRadius: '4px 4px 0 0',
          borderBottom: `1px solid ${isTextLight ? 'rgba(255,255,255,0.1)' : accent + '30'}`,
          position: 'relative', zIndex: 7,
        }}>
          <ElementBadge element={card.element} size={isMobile ? 8 : 10} />
          <span style={{
            fontSize: isMobile ? '6px' : '7px', fontWeight: 800,
            color: borderColor, letterSpacing: '0.5px',
          }}>
            {rank !== 'NORMAL' ? RANK_LABELS[rank] : ''}
          </span>
        </div>

        {/* Center: phrase */}
        <div style={{
          flex: 1,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          background: getCardWindowBg(rank),
          borderRadius: '4px',
          border: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '25'}`,
          margin: isMobile ? '2px 0' : '3px 0',
          padding: isMobile ? '6px 4px' : '8px 6px',
          textAlign: 'center', position: 'relative', zIndex: 7, overflow: 'hidden',
        }}>
          {/* Rank bg patterns */}
          {rank === 'GOLD' && (
            <div style={{
              position: 'absolute', inset: 0, opacity: 0.03,
              background: 'radial-gradient(circle at 30% 40%, #D4AF37 0.5px, transparent 0.5px)',
              backgroundSize: '12px 12px', pointerEvents: 'none',
            }} />
          )}

          <div style={{
            fontSize: isMobile ? '13px' : '16px', fontWeight: 900,
            color: isTextLight ? '#FAFAF9' : '#1C1917',
            lineHeight: 1.2, marginBottom: '3px',
            letterSpacing: '-0.3px', position: 'relative',
            textShadow: isTextLight ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
            overflow: 'hidden', textOverflow: 'ellipsis',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' as const,
          }}>
            {card.phrase}
          </div>
          <div style={{
            fontSize: isMobile ? '7px' : '8px',
            color: isTextLight ? 'rgba(255,255,255,0.35)' : '#A8A29E',
            lineHeight: 1.3, position: 'relative',
          }}>
            {card.meaning}
          </div>

          {/* Element name */}
          <div style={{
            marginTop: isMobile ? 3 : 4,
          }}>
            <span style={{
              fontSize: isMobile ? '6px' : '7px', fontWeight: 700,
              color: ELEMENT_COLORS[card.element] || '#78716C',
              letterSpacing: '0.05em',
              textTransform: 'uppercase' as const,
            }}>
              {card.element}
            </span>
          </div>
        </div>

        {/* Bottom: BST tier */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: isMobile ? '2px 4px' : '3px 6px',
          backgroundColor: isTextLight ? 'rgba(255,255,255,0.04)' : `${accent}08`,
          borderRadius: '0 0 4px 4px',
          borderTop: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '20'}`,
          position: 'relative', zIndex: 7,
        }}>
          <span style={{
            fontSize: isMobile ? '6px' : '7px', fontWeight: 800,
            color: bstTier.color,
          }}>
            {bstTier.tier} {card.bstTotal}
          </span>
          <span style={{
            fontSize: isMobile ? '5px' : '6px', fontWeight: 600,
            color: isTextLight ? 'rgba(255,255,255,0.3)' : '#A8A29E',
            fontFamily: 'monospace',
          }}>
            {card.id.slice(0, 4)}
          </span>
        </div>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3-REEL DISPLAY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderReelMachine = () => {
    const w = isMobile ? 100 : 150;
    const h = isMobile ? 160 : 220;
    const hasAnyCard = reels.some(r => r !== null);

    // Check for symbol triple match
    const allStopped = reelStopped[0] && reelStopped[1] && reelStopped[2];
    const symbolTripleMatch = allStopped && reelSymbols[0] === reelSymbols[1] && reelSymbols[1] === reelSymbols[2] && reelSymbols[0] !== 'BLANK' ? reelSymbols[0] : null;
    const hasMatch = symbolTripleMatch !== null;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        {/* Slot machine outer frame - metallic gradient */}
        <div style={{
          background: 'linear-gradient(180deg, #3A3632 0%, #1C1917 8%, #1C1917 92%, #3A3632 100%)',
          borderRadius: 20,
          padding: '3px',
          boxShadow: `0 0 40px ${stateConfig.color}20, 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)`,
          position: 'relative',
        }}>
          {/* Inner frame */}
          <div style={{
            display: 'flex', gap: isMobile ? 3 : 6,
            padding: isMobile ? '16px 10px 12px' : '24px 16px 16px',
            backgroundColor: '#0A0908',
            borderRadius: 18,
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Background ambient glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(ellipse at 50% 50%, ${stateConfig.color}08 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* State label at top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
            }}>
              <div style={{
                padding: '3px 20px',
                borderRadius: '0 0 8px 8px',
                background: `linear-gradient(180deg, ${stateConfig.color} 0%, ${stateConfig.color}CC 100%)`,
                fontSize: isMobile ? 9 : 11, fontWeight: 900, color: 'white',
                letterSpacing: '0.2em',
                boxShadow: `0 4px 12px ${stateConfig.color}40`,
              }}>
                {stateConfig.labelJa}
              </div>
            </div>

            {/* 3 Reel windows */}
            {[0, 1, 2].map(reelIdx => {
              const isCenter = reelIdx === 1;
              const stopped = reelStopped[reelIdx];
              return (
                <div key={reelIdx} style={{
                  width: w, height: h,
                  borderRadius: 10,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 300ms ease',
                  border: stopped ? `2px solid ${stateConfig.color}80` : '2px solid #333',
                  boxShadow: stopped
                    ? `0 0 15px ${stateConfig.color}30, inset 0 0 20px rgba(0,0,0,0.5)`
                    : 'inset 0 0 20px rgba(0,0,0,0.5)',
                }}>
                  {/* Reel window background */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: stopped
                      ? `linear-gradient(180deg, #1A1816 0%, #151311 50%, #1A1816 100%)`
                      : 'linear-gradient(180deg, #111 0%, #0A0A0A 50%, #111 100%)',
                    zIndex: 0,
                  }} />

                  {/* Glass reflection overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.15) 100%)',
                    pointerEvents: 'none', zIndex: 10, borderRadius: 8,
                  }} />

                  {/* Center reel highlight stripe */}
                  {isCenter && !spinning && (
                    <div style={{
                      position: 'absolute', left: -2, right: -2, top: '50%',
                      transform: 'translateY(-50%)',
                      height: 2, backgroundColor: `${stateConfig.color}40`,
                      boxShadow: `0 0 8px ${stateConfig.color}30`,
                      zIndex: 12, pointerEvents: 'none',
                    }} />
                  )}

                  {/* Symbol display */}
                  <div style={{
                    position: 'absolute', top: isMobile ? 2 : 4, left: '50%', transform: 'translateX(-50%)',
                    zIndex: 15, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {reelSpinning[reelIdx] && symbolFlicker[reelIdx] !== 'BLANK' ? (
                      <div style={{
                        padding: isMobile ? '1px 4px' : '2px 6px',
                        borderRadius: 3,
                        backgroundColor: `${SYMBOL_COLORS[symbolFlicker[reelIdx]]}80`,
                        color: 'white',
                        fontSize: isMobile ? 8 : 10,
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        opacity: 0.5,
                      }}>
                        {SYMBOL_LABELS[symbolFlicker[reelIdx]]}
                      </div>
                    ) : stopped && reelSymbols[reelIdx] !== 'BLANK' ? (
                      <div style={{
                        padding: isMobile ? '2px 6px' : '3px 10px',
                        borderRadius: 4,
                        backgroundColor: `${SYMBOL_COLORS[reelSymbols[reelIdx]]}CC`,
                        color: 'white',
                        fontSize: isMobile ? 10 : 13,
                        fontWeight: 900,
                        letterSpacing: '0.1em',
                        boxShadow: `0 0 12px ${SYMBOL_COLORS[reelSymbols[reelIdx]]}80`,
                        animation: 'matchBonusPop 400ms ease-out',
                      }}>
                        {SYMBOL_LABELS[reelSymbols[reelIdx]]}
                      </div>
                    ) : null}
                  </div>

                  {/* Content */}
                  <div style={{
                    position: 'relative', zIndex: 5,
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {reelSpinning[reelIdx] && reelFlicker[reelIdx] ? (
                      <div style={{ animation: 'reelSpin 80ms linear infinite', opacity: 0.6 }}>
                        {renderReelCard(reelFlicker[reelIdx]!, reelIdx)}
                      </div>
                    ) : reels[reelIdx] ? (
                      renderReelCard(reels[reelIdx]!, reelIdx)
                    ) : (
                      <div style={{
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 6,
                      }}>
                        <div style={{
                          width: isMobile ? 32 : 44, height: isMobile ? 32 : 44,
                          borderRadius: '50%',
                          border: '2px dashed #333',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <span style={{
                            fontSize: isMobile ? 16 : 20, fontWeight: 900, color: '#333',
                          }}>
                            {reelIdx + 1}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Stop impact flash */}
                  {stopped && cardAnimState === 'enter' && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `radial-gradient(circle, ${stateConfig.color}40 0%, transparent 70%)`,
                      animation: 'stopFlash 300ms ease-out forwards',
                      pointerEvents: 'none', zIndex: 11, borderRadius: 8,
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom chrome strip */}
          <div style={{
            position: 'absolute', bottom: 0, left: 12, right: 12, height: 3,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
            borderRadius: '0 0 18px 18px',
          }} />
        </div>

        {/* Match line indicator (below machine) */}
        {hasMatch && symbolTripleMatch && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 8,
            background: `linear-gradient(90deg, transparent, ${SYMBOL_COLORS[symbolTripleMatch]}20, transparent)`,
            border: `1px solid ${SYMBOL_COLORS[symbolTripleMatch]}40`,
            animation: 'matchBonusPop 500ms ease-out',
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              backgroundColor: SYMBOL_COLORS[symbolTripleMatch],
              animation: 'pulse 1s ease-in-out infinite',
            }} />
            <span style={{
              fontSize: 13, fontWeight: 800,
              color: SYMBOL_COLORS[symbolTripleMatch],
              letterSpacing: '0.05em',
            }}>
              {matchBonus}
            </span>
          </div>
        )}

        {/* Match bonus text (when no visual match indicator) */}
        {matchBonus && !hasMatch && (
          <div style={{
            fontSize: isMobile ? 14 : 18, fontWeight: 900,
            color: '#D4AF37', letterSpacing: '0.05em',
            animation: 'matchBonusPop 500ms ease-out',
            textShadow: '0 0 15px rgba(212,175,55,0.5)',
          }}>
            {matchBonus}
          </div>
        )}

        {/* Deck info (before first spin) */}
        {!hasAnyCard && !spinning && (
          <div style={{
            fontSize: 12, color: '#78716C', fontWeight: 500,
            textAlign: 'center', lineHeight: 1.6,
          }}>
            <div>デッキ {deck.length} 枚</div>
            <div style={{ fontSize: 10, color: '#57534E' }}>SPIN で3枚のリールが回る</div>
          </div>
        )}
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STATE BAR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const stateConfig = STATE_CONFIG[slotState];

  const renderStateBar = () => {
    const ceilingMax = ceiling;
    const ceilingPct = ceilingMax > 0 ? (ceilingCounter / ceilingMax) * 100 : 0;

    return (
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: isMobile ? 6 : 12,
        alignItems: 'center',
        padding: isMobile ? '8px 12px' : '10px 16px',
        backgroundColor: '#0A0908', borderRadius: 12,
        border: `2px solid ${stateConfig.color}40`,
        boxShadow: `0 0 25px ${stateConfig.color}15, 0 4px 16px rgba(0,0,0,0.4)`,
      }}>
        {/* State indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            backgroundColor: stateConfig.color,
            animation: slotState !== 'NORMAL' ? 'pulse 1.5s ease-in-out infinite' : undefined,
          }} />
          <span style={{
            fontWeight: 800, fontSize: isMobile ? 12 : 14,
            color: stateConfig.color, letterSpacing: '0.1em',
          }}>
            {stateConfig.label}
          </span>
          {slotState === 'CZ' && (
            <span style={{ fontSize: 11, fontWeight: 700, color: '#0EA5E9', fontFamily: 'monospace' }}>
              [{czSpinsLeft}G]
            </span>
          )}
          {slotState === 'RUSH' && (
            <span style={{ fontSize: 11, fontWeight: 700, color: '#EF4444', fontFamily: 'monospace' }}>
              [{ggSetSpinsLeft}G] LOOP {loopRate}%
            </span>
          )}
          {ggSetsRemaining > 0 && (slotState === 'RUSH') && (
            <span style={{ fontSize: 10, fontWeight: 700, color: '#D4AF37' }}>
              +{ggSetsRemaining}SET
            </span>
          )}
          {slotState === 'SPECIAL' && (
            <span style={{ fontSize: 11, fontWeight: 700, color: '#A855F7', fontFamily: 'monospace' }}>
              [{specialSpinsLeft}G]
            </span>
          )}
          {slotState === 'FEVER' && (
            <span style={{ fontSize: 11, fontWeight: 700, color: '#D4AF37', fontFamily: 'monospace' }}>
              [{feverSpinsLeft}G]
            </span>
          )}
        </div>

        <div style={{ width: 1, height: 20, backgroundColor: '#333' }} />

        {/* GP */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 10, color: '#A8A29E', fontWeight: 600 }}>GP</span>
          <span style={{
            fontSize: isMobile ? 16 : 20, fontWeight: 900,
            color: '#D4AF37', fontFamily: 'monospace',
          }}>
            {displayedGP.toLocaleString()}
          </span>
        </div>

        <div style={{ width: 1, height: 20, backgroundColor: '#333' }} />

        {/* Ceiling counter (NORMAL only) */}
        {slotState === 'NORMAL' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 10, color: '#A8A29E', fontWeight: 600 }}>
              {isMobile ? '天井' : '天井'}
            </span>
            <div style={{
              width: isMobile ? 40 : 60, height: 6,
              backgroundColor: '#333', borderRadius: 3, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${Math.min(100, ceilingPct)}%`,
                backgroundColor: ceilingPct > 80 ? '#EF4444' : ceilingPct > 50 ? '#F59E0B' : '#10B981',
                borderRadius: 3, transition: 'width 200ms',
              }} />
            </div>
            <span style={{
              fontSize: 10, fontFamily: 'monospace', fontWeight: 700,
              color: ceilingPct > 80 ? '#EF4444' : '#78716C',
            }}>
              {ceilingCounter}/{ceilingMax}
            </span>
          </div>
        )}

        {/* Combo (RUSH/SPECIAL/FEVER) */}
        {(slotState === 'RUSH' || slotState === 'SPECIAL' || slotState === 'FEVER') && (
          <div style={{
            display: 'flex', alignItems: 'baseline', gap: 4,
            animation: comboShake ? 'comboShake 400ms ease' : undefined,
          }}>
            <span style={{ fontSize: 10, color: '#A8A29E', fontWeight: 600 }}>COMBO</span>
            <span style={{
              fontSize: isMobile ? 18 : 24, fontWeight: 900,
              color: '#EF4444', fontFamily: 'monospace',
            }}>
              {stats.combo}
            </span>
          </div>
        )}

        {/* Credits */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 10, color: '#A8A29E', fontWeight: 600 }}>CREDIT</span>
          <span style={{
            fontSize: isMobile ? 16 : 20, fontWeight: 900,
            color: credits > 500 ? '#D4AF37' : credits > 100 ? '#F59E0B' : '#EF4444',
            fontFamily: 'monospace',
          }}>
            {credits.toLocaleString()}
          </span>
        </div>

        {/* Free spin indicator during GG */}
        {(slotState === 'RUSH' || slotState === 'SPECIAL' || slotState === 'FEVER') && (
          <span style={{ fontSize: 9, fontWeight: 700, color: '#10B981', letterSpacing: '0.1em' }}>
            FREE
          </span>
        )}

        {/* Net result */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'baseline', gap: 4 }}>
          <span style={{ fontSize: 10, color: '#78716C', fontWeight: 600 }}>差枚</span>
          <span style={{
            fontSize: 12, fontWeight: 800, fontFamily: 'monospace',
            color: (totalWin - totalBet) >= 0 ? '#10B981' : '#EF4444',
          }}>
            {(totalWin - totalBet) >= 0 ? '+' : ''}{totalWin - totalBet}
          </span>
        </div>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SPIN BUTTON
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderSpinButton = () => {
    const freeSpin = slotState === 'RUSH' || slotState === 'SPECIAL' || slotState === 'FEVER';
    const disabled = spinning || (credits <= 0 && !freeSpin) || gameOver || showRules;
    const lowCredits = credits < 100 && credits > 0 && !freeSpin;

    const buttonColor = disabled ? '#E7E5E4'
      : slotState === 'FEVER' ? '#D4AF37'
      : slotState === 'SPECIAL' ? '#A855F7'
      : slotState === 'RUSH' ? '#EF4444'
      : slotState === 'CZ' ? '#0EA5E9'
      : '#1C1917';

    const gpDeltaSize = gpDelta > 100 ? (isMobile ? 28 : 36) : gpDelta > 30 ? (isMobile ? 22 : 28) : (isMobile ? 18 : 24);
    const gpDeltaColor = gpDelta > 100 ? '#F6E27A' : '#D4AF37';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}>
        {/* GP Delta popup */}
        {showGpDelta && (
          <div style={{
            fontSize: gpDeltaSize, fontWeight: 900,
            color: gpDeltaColor, fontFamily: 'monospace',
            animation: gpDelta > 100 ? 'gpCountBig 1000ms ease-out forwards' : 'gpCount 800ms ease-out forwards',
            position: 'absolute', top: -36,
            textShadow: gpDelta > 100 ? '0 0 20px rgba(246,226,122,0.6)' : 'none',
          }}>
            +{gpDelta} GP
          </div>
        )}

        <div style={{
          padding: '3px', borderRadius: 18,
          background: disabled ? 'transparent'
            : slotState === 'FEVER'
              ? 'linear-gradient(135deg, #EF4444, #D4AF37, #10B981, #3B82F6, #A855F7, #EF4444)'
              : `linear-gradient(135deg, ${stateConfig.color}60, ${stateConfig.color}20, ${stateConfig.color}60)`,
          boxShadow: disabled ? 'none' : `0 0 30px ${stateConfig.color}30`,
          ...(slotState === 'FEVER' && !disabled ? { backgroundSize: '300% 300%', animation: 'feverRainbow 2s linear infinite' } : {}),
          ...(lowCredits ? { animation: 'lowCreditPulse 1s ease-in-out infinite' } : {}),
        }}>
          <button onClick={doSpin} disabled={disabled} style={{
            padding: isMobile ? '16px 48px' : '20px 72px',
            fontSize: isMobile ? 20 : 26, fontWeight: 900,
            letterSpacing: '0.25em',
            color: disabled ? '#A8A29E' : 'white',
            background: disabled ? '#1C1917'
              : `linear-gradient(180deg, ${buttonColor} 0%, ${buttonColor}CC 50%, ${buttonColor} 100%)`,
            border: 'none', borderRadius: 15,
            cursor: disabled ? 'default' : 'pointer',
            transition: 'all 200ms',
            boxShadow: disabled ? 'none'
              : `0 4px 20px ${stateConfig.color}40, inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.2)`,
            transform: spinning ? 'scale(0.95)' : 'scale(1)',
            textShadow: disabled ? 'none' : '0 1px 2px rgba(0,0,0,0.3)',
          }}>
            <span>SPIN</span>
            <span style={{
              fontSize: isMobile ? 10 : 12, fontWeight: 700,
              marginLeft: 8, opacity: 0.7, letterSpacing: '0.05em',
            }}>
              {freeSpin ? 'FREE' : '-20'}
            </span>
          </button>
        </div>

        {doubleSpin && (
          <div style={{
            fontSize: 11, fontWeight: 700, color: '#A855F7', letterSpacing: '0.1em',
          }}>
            DOUBLE SPIN!
          </div>
        )}

        <div style={{ fontSize: 10, color: '#A8A29E', letterSpacing: '0.05em' }}>
          {isMobile ? 'TAP' : 'SPACE / CLICK'}
        </div>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LAST SPINS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderLastSpins = () => {
    if (lastSpins.length === 0) return null;
    const count = isMobile ? 3 : 5;
    const shown = lastSpins.slice(-count);

    return (
      <div style={{
        display: 'flex', gap: 8, justifyContent: 'center',
        padding: '8px 12px', backgroundColor: '#0A0908',
        borderRadius: 10, border: '1px solid #333',
      }}>
        {shown.map((s, i) => {
          const elColor = ELEMENT_COLORS[s.card.element] || '#78716C';
          const stColor = STATE_CONFIG[s.stateAfter].color;
          return (
            <div key={i} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
              padding: '4px 8px', borderRadius: 6,
              backgroundColor: `${stColor}15`,
              border: `1px solid ${stColor}30`,
              minWidth: isMobile ? 50 : 64,
            }}>
              <div style={{
                fontSize: isMobile ? 9 : 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)',
                maxWidth: isMobile ? 50 : 64, overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {s.card.phrase}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%', backgroundColor: elColor,
                }} />
                <span style={{
                  fontSize: 10, fontWeight: 800, color: '#D4AF37', fontFamily: 'monospace',
                }}>
                  +{s.gpEarned}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SESSION STATS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderStatBars = (card: CardData, compact?: boolean) => {
    const maxStat = 115;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 2 : 4 }}>
        {card.stats.map((val, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 6, fontSize: compact ? 10 : 12,
          }}>
            <span style={{
              width: compact ? 24 : 32, fontWeight: 700, color: STAT_COLORS[i],
              fontFamily: 'monospace', textAlign: 'right',
            }}>
              {STAT_NAMES[i]}
            </span>
            <div style={{
              flex: 1, height: compact ? 6 : 10,
              backgroundColor: '#333', borderRadius: 3, overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', width: `${(val / maxStat) * 100}%`,
                backgroundColor: STAT_COLORS[i], borderRadius: 3,
                transition: 'width 300ms ease',
              }} />
            </div>
            <span style={{
              width: compact ? 20 : 28, textAlign: 'right', fontFamily: 'monospace',
              fontWeight: 600, color: '#57534E', fontSize: compact ? 9 : 11,
            }}>
              {val}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderSessionStats = () => {
    const netResult = totalWin - totalBet;
    const rows: { label: string; value: string | number; color?: string }[] = [
      { label: '投資', value: totalBet.toLocaleString(), color: '#EF4444' },
      { label: '回収', value: totalWin.toLocaleString(), color: '#10B981' },
      { label: '差枚数', value: `${netResult >= 0 ? '+' : ''}${netResult}`, color: netResult >= 0 ? '#10B981' : '#EF4444' },
      { label: 'スピン数', value: stats.totalSpins },
      { label: '最高コンボ', value: stats.bestCombo, color: '#EF4444' },
      { label: 'G-STOP突入', value: stats.czCount, color: '#0EA5E9' },
      { label: 'GG突入回数', value: stats.rushCount, color: '#EF4444' },
      { label: 'SGG', value: stats.specialCount, color: '#A855F7' },
      { label: 'PGG', value: stats.feverCount, color: '#D4AF37' },
      { label: '最高到達', value: STATE_CONFIG[stats.peakState].labelJa, color: STATE_CONFIG[stats.peakState].color },
    ];

    return (
      <div style={{
        backgroundColor: '#0A0908', borderRadius: 12, padding: 16, border: '1px solid #333',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: '#A8A29E',
          letterSpacing: '0.15em', marginBottom: 12,
        }}>
          SESSION
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rows.map((r) => (
            <div key={r.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: 12, color: '#78716C' }}>{r.label}</span>
              <span style={{
                fontSize: 14, fontWeight: 800, fontFamily: 'monospace',
                color: r.color || '#1C1917',
              }}>
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* Current card BST */}
        {currentCard && (
          <div style={{ marginTop: 16, borderTop: '1px solid #333', paddingTop: 12 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#A8A29E',
              letterSpacing: '0.15em', marginBottom: 8,
            }}>
              現在のカード
            </div>
            {renderStatBars(currentCard)}
          </div>
        )}

        {/* State history */}
        {stats.stateHistory.length > 0 && (
          <div style={{ marginTop: 12, borderTop: '1px solid #333', paddingTop: 10 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, color: '#A8A29E',
              letterSpacing: '0.1em', marginBottom: 6,
            }}>
              履歴
            </div>
            <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              {stats.stateHistory.slice(-20).map((s, i) => (
                <div key={i} style={{
                  width: 8, height: 8, borderRadius: 2,
                  backgroundColor: STATE_CONFIG[s].color,
                }} title={STATE_CONFIG[s].label} />
              ))}
            </div>
          </div>
        )}

      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // GAME OVER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderGameOver = () => (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
    }}>
      <div style={{
        backgroundColor: '#1C1917', borderRadius: 20,
        padding: isMobile ? 24 : 40, maxWidth: 420, width: '90%',
        border: '2px solid #EF444440',
        boxShadow: '0 0 60px rgba(239,68,68,0.2)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#EF4444', letterSpacing: '0.3em', fontWeight: 800, marginBottom: 8 }}>
            GAME OVER
          </div>
          <div style={{ fontSize: 48, fontWeight: 900, color: '#EF4444', fontFamily: 'monospace' }}>
            0
          </div>
          <div style={{ fontSize: 12, color: '#78716C', marginBottom: 24 }}>CREDIT</div>

          {/* Results */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            <div style={{ padding: 12, backgroundColor: '#0A0908', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#78716C' }}>投資</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#EF4444', fontFamily: 'monospace' }}>{totalBet.toLocaleString()}</div>
            </div>
            <div style={{ padding: 12, backgroundColor: '#0A0908', borderRadius: 8 }}>
              <div style={{ fontSize: 10, color: '#78716C' }}>回収</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#10B981', fontFamily: 'monospace' }}>{totalWin.toLocaleString()}</div>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: '#78716C' }}>差枚数</div>
            <div style={{
              fontSize: 32, fontWeight: 900, fontFamily: 'monospace',
              color: totalWin - totalBet >= 0 ? '#10B981' : '#EF4444',
            }}>
              {totalWin - totalBet >= 0 ? '+' : ''}{(totalWin - totalBet).toLocaleString()}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {/* Stats row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, fontSize: 11, color: '#57534E' }}>
              <span>SPIN: {stats.totalSpins}</span>
              <span>COMBO: {stats.bestCombo}</span>
              <span>PEAK: {STATE_CONFIG[stats.peakState].label}</span>
            </div>

            <button onClick={() => { setCredits(3000); setGameOver(false); }} style={{
              padding: '14px 0', fontSize: 16, fontWeight: 900, letterSpacing: '0.15em',
              color: '#0A0908',
              background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 40%, #D4AF37 70%, #B8941E 100%)',
              border: 'none', borderRadius: 12, cursor: 'pointer',
            }}>
              もう3000枚 (Continue)
            </button>
            <button onClick={resetSession} style={{
              padding: '10px 0', fontSize: 12, fontWeight: 700,
              color: '#78716C', backgroundColor: 'transparent',
              border: '1px solid #333', borderRadius: 8, cursor: 'pointer',
            }}>
              最初からやり直す (New Game)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // DEV PANEL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderDevPanel = () => {
    if (!showDev) return null;

    const devBtnStyle: React.CSSProperties = {
      fontSize: 9, fontWeight: 700, color: '#EF4444',
      backgroundColor: 'rgba(239,68,68,0.08)',
      padding: '4px 8px', borderRadius: 4,
      border: '1px solid rgba(239,68,68,0.2)',
      cursor: 'pointer', transition: 'all 150ms',
      whiteSpace: 'nowrap',
    };

    const devLabelStyle: React.CSSProperties = {
      fontSize: 9, color: '#57534E', fontFamily: 'monospace',
    };

    const devValueStyle: React.CSSProperties = {
      fontSize: 10, color: '#A8A29E', fontFamily: 'monospace', fontWeight: 700,
    };

    return (
      <div style={{
        backgroundColor: '#0A0908', borderRadius: 10,
        border: '1px solid rgba(239,68,68,0.25)',
        padding: isMobile ? '8px 10px' : '12px 16px',
        marginTop: 6,
      }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: '#EF4444', letterSpacing: '0.15em', marginBottom: 8 }}>
          DEV PANEL
        </div>

        {/* Internal Flags */}
        <div style={{
          display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: 4,
          marginBottom: 8,
        }}>
          <div>
            <span style={devLabelStyle}>State: </span>
            <span style={{ ...devValueStyle, color: stateConfig.color }}>{slotState}</span>
          </div>
          <div>
            <span style={devLabelStyle}>Symbols: </span>
            <span style={devValueStyle}>[{reelSymbols.map(s => SYMBOL_LABELS[s]).join('][')}]</span>
          </div>
          <div>
            <span style={devLabelStyle}>Triple: </span>
            <span style={devValueStyle}>{(reelSymbols[0] === reelSymbols[1] && reelSymbols[1] === reelSymbols[2] && reelSymbols[0] !== 'BLANK') ? SYMBOL_LABELS[reelSymbols[0]] : 'NONE'}</span>
          </div>
          <div>
            <span style={devLabelStyle}>Loop: </span>
            <span style={devValueStyle}>{loopRate}%</span>
          </div>
          <div>
            <span style={devLabelStyle}>GG Set: </span>
            <span style={devValueStyle}>{ggSetSpinsLeft}/15</span>
          </div>
          <div>
            <span style={devLabelStyle}>Sets: </span>
            <span style={devValueStyle}>{ggSetsRemaining}</span>
          </div>
          <div>
            <span style={devLabelStyle}>Ceiling: </span>
            <span style={devValueStyle}>{ceilingCounter}/{ceiling}</span>
          </div>
          <div>
            <span style={devLabelStyle}>Credit: </span>
            <span style={devValueStyle}>{credits}</span>
          </div>
          <div>
            <span style={devLabelStyle}>Net: </span>
            <span style={{ ...devValueStyle, color: (totalWin - totalBet) >= 0 ? '#10B981' : '#EF4444' }}>
              {totalWin - totalBet}
            </span>
          </div>
        </div>

        {/* Force Trigger Buttons */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 4,
        }}>
          <button style={devBtnStyle} onClick={() => forceSymbols('GOD')}>GOD揃い</button>
          <button style={devBtnStyle} onClick={() => forceSymbols('RED7')}>赤7揃い</button>
          <button style={devBtnStyle} onClick={() => forceSymbols('YELLOW7')}>黄7揃い</button>
          <button style={devBtnStyle} onClick={() => forceSymbols('V_SYMBOL')}>V揃い</button>
          <button style={devBtnStyle} onClick={() => forceState('CZ')}>G-STOP突入</button>
          <button style={devBtnStyle} onClick={() => forceState('RUSH', 50)}>GG突入 50%</button>
          <button style={devBtnStyle} onClick={() => forceState('RUSH', 89)}>GG突入 89%</button>
          <button style={devBtnStyle} onClick={() => forceState('SPECIAL')}>SGG突入</button>
          <button style={devBtnStyle} onClick={() => forceState('FEVER')}>PGG突入</button>
          <button style={devBtnStyle} onClick={forceLoopSuccess}>ループ成功</button>
          <button style={devBtnStyle} onClick={forceLoopFail}>ループ失敗</button>
          <button style={{ ...devBtnStyle, color: '#10B981', borderColor: 'rgba(16,185,129,0.3)', backgroundColor: 'rgba(16,185,129,0.08)' }} onClick={() => setCredits(prev => prev + 3000)}>クレジット+3000</button>
        </div>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // TRANSITION OVERLAY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderTransitionOverlay = () => {
    if (!transitionEffect) return null;
    const overlayConfig: Record<TransitionType, { text: string; sub: string; color: string; bg: string }> = {
      NORMAL_TO_CZ: { text: 'G-STOP', sub: '5G以内にGOD GAMEを掴め!', color: '#0EA5E9', bg: 'rgba(14, 165, 233, 0.2)' },
      CZ_TO_RUSH: { text: 'GOD GAME!!!', sub: `ループ率${loopRate}%! セット継続を祈れ!`, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.2)' },
      RUSH_TO_SPECIAL: { text: 'SGG!!!', sub: 'スペシャルGOD GAME! GP x5!', color: '#A855F7', bg: 'rgba(168, 85, 247, 0.2)' },
      SPECIAL_TO_FEVER: { text: 'PGG!!!', sub: 'プレミアムGOD GAME! GP x10!!!', color: '#D4AF37', bg: 'rgba(212, 175, 55, 0.3)' },
      FALL_TO_NORMAL: { text: '転落...', sub: 'GOD GAMEのループに失敗...', color: '#78716C', bg: 'rgba(120, 113, 108, 0.15)' },
    };
    const cfg = overlayConfig[transitionEffect];
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        backgroundColor: cfg.bg,
        backdropFilter: 'blur(4px)',
        animation: 'transitionFlash 1200ms ease-out forwards',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontSize: isMobile ? '2.5rem' : '4rem', fontWeight: 900,
          color: cfg.color,
          textShadow: `0 0 40px ${cfg.color}60, 0 0 80px ${cfg.color}30`,
          letterSpacing: '0.2em',
          animation: 'transitionZoom 600ms ease-out',
        }}>
          {cfg.text}
        </div>
        <div style={{
          fontSize: isMobile ? 14 : 18, fontWeight: 700,
          color: cfg.color, opacity: 0.7,
          marginTop: 12, letterSpacing: '0.05em',
        }}>
          {cfg.sub}
        </div>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // IDLE CARD
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderIdleCard = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{
        width: isMobile ? 260 : 280,
        height: isMobile ? 400 : 430,
        borderRadius: 8,
        border: '2px dashed rgba(212,175,55,0.25)',
        backgroundColor: '#0A0908',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          fontSize: 22, fontWeight: 800, letterSpacing: '0.1em',
          background: 'linear-gradient(135deg, #D4AF37, #F6E27A, #D4AF37)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          CARD SLOT
        </div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
          SPIN を押して最初の1枚を引こう
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>
          デッキ {deck.length} 枚
        </div>
      </div>
    </div>
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // PAGE BACKGROUND
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const getPageBg = (): React.CSSProperties => {
    switch (slotState) {
      case 'CZ': return { background: 'linear-gradient(180deg, #0C1929 0%, #0F2744 50%, #0C1929 100%)' };
      case 'RUSH': return { background: 'linear-gradient(180deg, #1A0A0A 0%, #2D1010 50%, #1A0A0A 100%)' };
      case 'SPECIAL': return { background: 'linear-gradient(180deg, #150A20 0%, #1F1030 50%, #150A20 100%)' };
      case 'FEVER': return { background: 'linear-gradient(180deg, #1A1400 0%, #2D2200 30%, #1A0A1A 60%, #0A1A2A 100%)' };
      default: return { background: 'linear-gradient(180deg, #1C1917 0%, #292524 50%, #1C1917 100%)' };
    }
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // LOADING STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg, #0A0908 0%, #1C1917 50%, #0A0908 100%)', gap: 16,
      }}>
        <div style={{
          width: 40, height: 40,
          border: '3px solid #333', borderTopColor: '#D4AF37',
          borderRadius: '50%', animation: 'spin 1s linear infinite',
        }} />
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em' }}>
          デッキ読み込み中...
        </div>
      </div>
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MAIN LAYOUT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  if (showRules) {
    return (
      <>
        <style>{KEYFRAME_CSS}</style>
        {renderRules()}
      </>
    );
  }

  return (
    <>
      <style>{KEYFRAME_CSS}</style>

      <div style={{
        minHeight: '100vh',
        ...getPageBg(),
        transition: 'background 500ms ease',
        position: 'relative',
      }}>
        {renderTransitionOverlay()}
        {gameOver && renderGameOver()}

        <div style={{
          maxWidth: 1000, margin: '0 auto',
          padding: isMobile ? '12px 10px' : '16px 20px',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 12,
          }}>
            <Link href="/english/training" style={{
              fontSize: 11, color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              fontWeight: 600, letterSpacing: '0.05em',
            }}>
              {'<'} トレーニングに戻る
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontSize: isMobile ? 14 : 18, fontWeight: 900,
                letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F6E27A 50%, #D4AF37 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                CARD SLOT
              </span>
              <button
                onClick={() => setShowRules(true)}
                style={{
                  fontSize: 10, fontWeight: 700, color: '#D4AF37',
                  backgroundColor: 'rgba(212,175,55,0.1)', padding: '3px 8px',
                  borderRadius: 4, letterSpacing: '0.05em',
                  border: '1px solid rgba(212,175,55,0.25)',
                  cursor: 'pointer', transition: 'all 200ms',
                }}
              >
                RULES
              </button>
              <button
                onClick={() => setShowDev(prev => !prev)}
                style={{
                  fontSize: 10, fontWeight: 700, color: '#EF4444',
                  backgroundColor: showDev ? 'rgba(239,68,68,0.2)' : 'rgba(239,68,68,0.05)',
                  padding: '3px 8px', borderRadius: 4, letterSpacing: '0.05em',
                  border: '1px solid rgba(239,68,68,0.3)',
                  cursor: 'pointer', transition: 'all 200ms',
                }}
              >
                DEV
              </button>
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div style={{
              fontSize: 11, color: '#F59E0B', backgroundColor: 'rgba(245,158,11,0.08)',
              padding: '6px 12px', borderRadius: 6, marginBottom: 8,
              border: '1px solid rgba(245,158,11,0.25)',
            }}>
              {error}
            </div>
          )}

          {/* State bar */}
          {renderStateBar()}

          {/* DEV panel */}
          {renderDevPanel()}

          {/* Main content */}
          {isMobile ? (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Card area with state glow */}
              <div style={{
                animation: slotState === 'CZ' ? 'czPulse 2s ease-in-out infinite'
                  : slotState === 'RUSH' ? 'rushGlow 1.5s ease-in-out infinite'
                  : slotState === 'SPECIAL' ? 'specialAura 2s ease-in-out infinite'
                  : slotState === 'FEVER' ? 'feverRainbow 3s linear infinite'
                  : undefined,
                borderRadius: 16,
              }}>
                {renderReelMachine()}
              </div>

              <div style={{ position: 'relative', textAlign: 'center' }}>
                {renderSpinButton()}
              </div>

              {renderLastSpins()}

              {/* Collapsible stats (mobile) */}
              <details style={{
                backgroundColor: '#0A0908', borderRadius: 12, border: '1px solid #333',
              }}>
                <summary style={{
                  padding: '10px 16px', fontSize: 11, fontWeight: 700,
                  color: '#A8A29E', letterSpacing: '0.15em', cursor: 'pointer',
                  listStyle: 'none', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>SESSION</span>
                  <span style={{ fontSize: 9, color: '#D6D3D1' }}>tap</span>
                </summary>
                <div style={{ padding: '0 16px 12px' }}>
                  {renderSessionStats()}
                </div>
              </details>
            </div>
          ) : (
            <div style={{
              marginTop: 12, display: 'grid',
              gridTemplateColumns: '1fr 260px', gap: 16,
            }}>
              {/* Left: Card + Spin */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{
                  animation: slotState === 'CZ' ? 'czPulse 2s ease-in-out infinite'
                    : slotState === 'RUSH' ? 'rushGlow 1.5s ease-in-out infinite'
                    : slotState === 'SPECIAL' ? 'specialAura 2s ease-in-out infinite'
                    : slotState === 'FEVER' ? 'feverRainbow 3s linear infinite'
                    : undefined,
                  borderRadius: 16,
                }}>
                  {renderReelMachine()}
                </div>

                <div style={{ position: 'relative', textAlign: 'center' }}>
                  {renderSpinButton()}
                </div>

                {renderLastSpins()}
              </div>

              {/* Right: Stats panel */}
              <div>{renderSessionStats()}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KEYFRAME ANIMATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const KEYFRAME_CSS = `
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.85; }
}
@keyframes czPulse {
  0%, 100% { box-shadow: 0 0 10px rgba(14, 165, 233, 0.2); }
  50% { box-shadow: 0 0 30px rgba(14, 165, 233, 0.5); }
}
@keyframes rushGlow {
  0%, 100% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.3), 0 0 30px rgba(212, 175, 55, 0.1); }
  50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.5), 0 0 50px rgba(212, 175, 55, 0.3); }
}
@keyframes specialAura {
  0% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
  33% { box-shadow: 0 0 35px rgba(168, 85, 247, 0.5); }
  66% { box-shadow: 0 0 25px rgba(212, 175, 55, 0.3); }
  100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.3); }
}
@keyframes feverRainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}
@keyframes gpCount {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-30px); }
}
@keyframes gpCountBig {
  0% { opacity: 1; transform: translateY(0) scale(1); }
  30% { opacity: 1; transform: translateY(-10px) scale(1.3); }
  100% { opacity: 0; transform: translateY(-50px) scale(0.9); }
}
@keyframes lowCreditPulse {
  0%, 100% { box-shadow: 0 0 10px rgba(239,68,68,0.2); }
  50% { box-shadow: 0 0 25px rgba(239,68,68,0.5); }
}
@keyframes cardEnter {
  0% { opacity: 0; transform: translateY(40px) scale(0.9); }
  60% { opacity: 1; transform: translateY(-6px) scale(1.02); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes cardExit {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.9); }
}
@keyframes transitionFlash {
  0% { opacity: 0; }
  15% { opacity: 1; }
  75% { opacity: 1; }
  100% { opacity: 0; }
}
@keyframes transitionZoom {
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes reelFlicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
@keyframes reelSpin {
  0% { transform: translateY(-100%); opacity: 0.4; }
  50% { transform: translateY(0); opacity: 0.8; }
  100% { transform: translateY(100%); opacity: 0.4; }
}
@keyframes reelSlam {
  0% { transform: translateY(-20px); opacity: 0.5; }
  60% { transform: translateY(4px); opacity: 1; }
  80% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
}
@keyframes stopFlash {
  0% { opacity: 0.4; }
  100% { opacity: 0; }
}
@keyframes matchBonusPop {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes comboShake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-3px); }
  40% { transform: translateX(3px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes card-holo-shimmer {
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
@keyframes card-legendary-aura {
  0%, 100% { box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4), 0 0 30px rgba(168,85,247,0.3); }
  50% { box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.6), 0 0 50px rgba(168,85,247,0.4); }
}
@keyframes card-gold-pulse {
  0%, 100% { box-shadow: 0 8px 24px rgba(212,175,55,0.35), 0 4px 12px rgba(246,200,95,0.25); }
  50% { box-shadow: 0 8px 28px rgba(212,175,55,0.45), 0 4px 16px rgba(246,200,95,0.35); }
}
@keyframes card-particle-float {
  0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
  50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
}
`;
