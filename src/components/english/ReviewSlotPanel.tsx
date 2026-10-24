'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  type Element,
  ELEMENT_COLORS,
  calcBstTotal,
  calcBstStats,
  getBstTier,
  BST_STAT_NAMES_JA,
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
import {
  type CardData,
  type CardRank,
  type SlotState,
  type GodSymbol,
  type TraitInfo,
  type TransitionType,
  RANK_LABELS,
  STATE_ORDER,
  STATE_CONFIG,
  SYMBOL_COLORS,
  SYMBOL_LABELS,
  ALL_SYMBOLS,
  STAT_NAMES,
  REEL_STOP_DELAYS,
  getCardRank,
  getCardTrait,
  getCardFrame,
  getCardShadow,
  getCardWindowBg,
  getFrameAccent,
  getRankBorderColor,
  calcGP,
  calcCeiling,
  rollCZTrigger,
  rollRushPromotion,
  rollRushFall,
  rollFallSurvival,
  rollReelSymbols,
  assignLoopRate,
} from '@/lib/slot-engine';

// Re-export types for external consumers
export type { CardData, CardRank, SlotState, GodSymbol, TraitInfo, TransitionType };

export interface CardPoolEntry {
  phraseId: string;
  english: string;
  japanese: string;
  element: string;
  rank: string;
  points: number;
  bstTotal: number;
}

export interface ReviewSlotPanelProps {
  dropCard: {
    phraseId: string;
    english: string;
    japanese: string;
    element: string;
    rank: string;
    points: number;
    bstTotal: number;
    key: number;
  } | null;
  cardPool?: CardPoolEntry[];
  specialMode?: boolean;
  onSpecialSpinDone?: (gpEarned: number) => void;
  onSpinComplete?: (result: { tier: string; gpEarned: number; card: CardData }) => void;
  onBigWin?: (type: 'triple' | 'reach' | 'miss' | 'pair', symbol?: string) => void;
  gridInfo?: { filled: number; total: number };
  gridCompleteGrade?: string | null;
  onBonusSlotPress?: () => void;
  onReset?: () => void;
  sessionGP?: number;
  isMobile: boolean;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// COMPONENT-LOCAL CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_BG: Record<SlotState, string> = {
  NORMAL: 'linear-gradient(180deg, #1C1917 0%, #292524 50%, #1C1917 100%)',
  CZ: 'linear-gradient(180deg, #0C1929 0%, #0F2744 50%, #0C1929 100%)',
  RUSH: 'linear-gradient(180deg, #2D0A0A 0%, #3D1515 50%, #2D0A0A 100%)',
  SPECIAL: 'linear-gradient(180deg, #1A0A2A 0%, #2A1540 50%, #1A0A2A 100%)',
  FEVER: 'linear-gradient(180deg, #2D2200 0%, #3D3000 30%, #2A1530 60%, #152030 100%)',
};

const LS_KEY = 'review-slot-state';

// Bonus slot odds by grid grade — NOT guaranteed
function rollBonusSlot(grade: string): { symbols: GodSymbol[]; triple: GodSymbol | null } {
  const roll = Math.random() * 100;
  // S: 70% GOD, 20% RED7, 10% pair
  // A: 40% RED7, 30% YELLOW7, 20% pair, 10% miss
  // B: 20% YELLOW7, 30% BLUE7, 30% pair, 20% miss
  // C: 10% BLUE7, 25% pair, 35% single, 30% miss
  // D: 5% BLUE7, 15% pair, 30% single, 50% miss
  type Outcome = { triple: GodSymbol } | { pair: GodSymbol } | 'single' | 'miss';
  let outcome: Outcome;
  switch (grade) {
    case 'S':
      outcome = roll < 70 ? { triple: 'GOD' } : roll < 90 ? { triple: 'RED7' } : { pair: 'GOD' };
      break;
    case 'A':
      outcome = roll < 40 ? { triple: 'RED7' } : roll < 70 ? { triple: 'YELLOW7' } : roll < 90 ? { pair: 'RED7' } : 'miss';
      break;
    case 'B':
      outcome = roll < 20 ? { triple: 'YELLOW7' } : roll < 50 ? { triple: 'BLUE7' } : roll < 80 ? { pair: 'YELLOW7' } : 'miss';
      break;
    case 'C':
      outcome = roll < 10 ? { triple: 'BLUE7' } : roll < 35 ? { pair: 'BLUE7' } : roll < 70 ? 'single' : 'miss';
      break;
    default: // D
      outcome = roll < 5 ? { triple: 'BLUE7' } : roll < 20 ? { pair: 'BLUE7' } : roll < 50 ? 'single' : 'miss';
      break;
  }
  if (typeof outcome === 'object' && 'triple' in outcome) {
    const s = outcome.triple;
    return { symbols: [s, s, s] as GodSymbol[], triple: s };
  }
  if (typeof outcome === 'object' && 'pair' in outcome) {
    const s = outcome.pair;
    const others: GodSymbol[] = ALL_SYMBOLS.filter(x => x !== s && x !== 'BLANK');
    const third = others[Math.floor(Math.random() * others.length)];
    return { symbols: [s, s, third] as GodSymbol[], triple: null };
  }
  if (outcome === 'single') {
    const syms: GodSymbol[] = ['RED7', 'YELLOW7', 'BLUE7', 'V_SYMBOL'];
    const s = syms[Math.floor(Math.random() * syms.length)];
    return { symbols: [s, 'BLANK', 'BLANK'] as GodSymbol[], triple: null };
  }
  // miss
  return { symbols: ['BLANK', 'BLANK', 'BLANK'] as GodSymbol[], triple: null };
}


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CARD BUILDER (from dropCard prop)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function buildCardFromDrop(drop: NonNullable<ReviewSlotPanelProps['dropCard']>): CardData {
  const stats = calcBstStats(drop.phraseId);
  const bstTotal = calcBstTotal(drop.phraseId);
  const rank = getCardRank(drop.points);
  const trait = getCardTrait(stats, drop.phraseId);
  const flavorText = getFlavorText(drop.phraseId);
  return {
    id: drop.phraseId,
    phrase: drop.english,
    meaning: drop.japanese,
    element: drop.element as Element,
    mastery: 0,
    cardPoints: drop.points,
    rank,
    stats,
    bstTotal,
    trait,
    flavorText,
  };
}




// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PERSISTED STATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface PersistedSlotState {
  slotState: SlotState;
  ceilingCounter: number;
  combo: number;
  totalGP: number;
  totalSpins: number;
  loopRate: number;
  ggSetSpinsLeft: number;
  ggSetsRemaining: number;
  czSpinsLeft: number;
  specialSpinsLeft: number;
  feverSpinsLeft: number;
  // Stage Chase persistence
  stage: number;
  shields: number | null;
  maxShields: number;
  jackpotPool: number;
  bestCombo: number;
  czCount: number;
  rushCount: number;
  specialCount: number;
  feverCount: number;
  peakState: SlotState;
}

function loadPersisted(): PersistedSlotState | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePersisted(s: PersistedSlotState) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(s));
  } catch { /* ignore */ }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KEYFRAMES (injected once)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const KEYFRAMES = `
@keyframes rsp-pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.85; } }
@keyframes rsp-reelSpin { 0% { transform: translateY(-100%); opacity: 0.4; } 50% { transform: translateY(0); opacity: 0.8; } 100% { transform: translateY(100%); opacity: 0.4; } }
@keyframes rsp-reelSlam { 0% { transform: translateY(-20px); opacity: 0.5; } 60% { transform: translateY(4px); opacity: 1; } 80% { transform: translateY(-2px); } 100% { transform: translateY(0); } }
@keyframes rsp-stopFlash { 0% { opacity: 0.4; } 100% { opacity: 0; } }
@keyframes rsp-matchBonusPop { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
@keyframes rsp-cardEnter { 0% { opacity: 0; transform: translateY(40px) scale(0.9); } 60% { opacity: 1; transform: translateY(-6px) scale(1.02); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes rsp-gpCount { 0% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-30px); } }
@keyframes rsp-gpCountBig { 0% { opacity: 1; transform: translateY(0) scale(1); } 30% { opacity: 1; transform: translateY(-10px) scale(1.3); } 100% { opacity: 0; transform: translateY(-50px) scale(0.9); } }
@keyframes rsp-transitionFlash { 0% { opacity: 0; } 15% { opacity: 1; } 75% { opacity: 1; } 100% { opacity: 0; } }
@keyframes rsp-transitionZoom { 0% { transform: scale(0.3); opacity: 0; } 50% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
@keyframes rsp-comboShake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-3px); } 40% { transform: translateX(3px); } 60% { transform: translateX(-2px); } 80% { transform: translateX(2px); } }
@keyframes rsp-feverRainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
@keyframes rsp-legendary-aura { 0%,100% { box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4), 0 0 30px rgba(168,85,247,0.3); } 50% { box-shadow: 0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.6), 0 0 50px rgba(168,85,247,0.4); } }
@keyframes rsp-gold-pulse { 0%,100% { box-shadow: 0 8px 24px rgba(212,175,55,0.35), 0 4px 12px rgba(246,200,95,0.25); } 50% { box-shadow: 0 8px 28px rgba(212,175,55,0.45), 0 4px 16px rgba(246,200,95,0.35); } }
@keyframes rsp-particle-float { 0%,100% { transform: translateY(0) scale(1); opacity: 0.7; } 50% { transform: translateY(-8px) scale(1.2); opacity: 1; } }
@keyframes rsp-holo-shimmer { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
@keyframes rsp-idlePulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
@keyframes rsp-ambientGlow { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.05); } }
@keyframes rsp-enemyHit { 0% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } 100% { transform: translateX(0); } }
@keyframes rsp-playerHit { 0% { opacity: 1; } 25% { opacity: 0.3; } 50% { opacity: 1; } 75% { opacity: 0.3; } 100% { opacity: 1; } }
@keyframes rsp-dmgFloat { 0% { opacity: 1; transform: translateY(0) scale(1); } 100% { opacity: 0; transform: translateY(-24px) scale(0.8); } }
@keyframes rsp-reachPulse { 0%,100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
@keyframes rsp-reachFlash { 0% { opacity: 0; } 20% { opacity: 0.6; } 100% { opacity: 0; } }
@keyframes rsp-bigWinFlash { 0% { opacity: 0; transform: scale(0.5); } 20% { opacity: 1; transform: scale(1.1); } 50% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0.95); } }
@keyframes rsp-screenShake { 0%,100% { transform: translate(0,0); } 10% { transform: translate(-4px,-2px); } 20% { transform: translate(4px,2px); } 30% { transform: translate(-3px,3px); } 40% { transform: translate(3px,-3px); } 50% { transform: translate(-2px,2px); } 60% { transform: translate(2px,-1px); } 70% { transform: translate(-1px,1px); } }
@keyframes rsp-tripleExplode { 0% { transform: scale(0.3) rotate(-10deg); opacity: 0; } 40% { transform: scale(1.3) rotate(3deg); opacity: 1; } 70% { transform: scale(0.95) rotate(-1deg); opacity: 1; } 100% { transform: scale(1) rotate(0deg); opacity: 1; } }
@keyframes rsp-reachReel3Glow { 0%,100% { box-shadow: inset 0 0 20px rgba(0,0,0,0.5); } 50% { box-shadow: inset 0 0 20px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.6); } }
@keyframes rsp-transitionBanner { 0% { transform: scaleX(0); opacity: 0; } 20% { transform: scaleX(1.1); opacity: 1; } 40% { transform: scaleX(1); } 80% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(0.95); opacity: 0; } }
@keyframes rsp-dangerPulse { 0%,100% { opacity: 0; } 50% { opacity: 0.15; } }
@keyframes rsp-shieldCrack { 0% { transform: scale(1); opacity: 1; } 30% { transform: scale(1.4); opacity: 1; } 60% { transform: scale(0.8); opacity: 0.6; } 100% { transform: scale(0); opacity: 0; } }
@keyframes rsp-gameOverCrack { 0% { clip-path: inset(0 50% 0 50%); opacity: 0; } 30% { clip-path: inset(0 20% 0 20%); opacity: 1; } 100% { clip-path: inset(0 0 0 0); opacity: 1; } }
@keyframes rsp-gameOverShake { 0%,100% { transform: translate(0,0); } 5% { transform: translate(-8px,-4px); } 10% { transform: translate(8px,4px); } 15% { transform: translate(-6px,6px); } 20% { transform: translate(6px,-6px); } 25% { transform: translate(-4px,4px); } 30% { transform: translate(0,0); } }
`;

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN COMPONENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function ReviewSlotPanel({
  dropCard,
  cardPool,
  specialMode,
  onSpecialSpinDone,
  onSpinComplete,
  onBigWin,
  gridInfo,
  gridCompleteGrade,
  onBonusSlotPress,
  onReset,
  sessionGP,
  isMobile,
}: ReviewSlotPanelProps) {
  // ── Slot State ──
  const [slotState, setSlotState] = useState<SlotState>('NORMAL');
  const [spinning, setSpinning] = useState(false);
  const [ceilingCounter, setCeilingCounter] = useState(0);
  const [czSpinsLeft, setCzSpinsLeft] = useState(0);
  const [specialSpinsLeft, setSpecialSpinsLeft] = useState(0);
  const [feverSpinsLeft, setFeverSpinsLeft] = useState(0);
  const [combo, setCombo] = useState(0);
  const [totalGP, setTotalGP] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);
  const [loopRate, setLoopRate] = useState(0);
  const [ggSetSpinsLeft, setGgSetSpinsLeft] = useState(0);
  const [ggSetsRemaining, setGgSetsRemaining] = useState(0);

  // ── Session Stats ──
  const [bestCombo, setBestCombo] = useState(0);
  const [czCount, setCzCount] = useState(0);
  const [rushCount, setRushCount] = useState(0);
  const [specialCount, setSpecialCount] = useState(0);
  const [feverCount, setFeverCount] = useState(0);
  const [peakState, setPeakState] = useState<SlotState>('NORMAL');
  const [stateHistory, setStateHistory] = useState<SlotState[]>([]);

  // ── GOD Symbols ──
  const [reelSymbols, setReelSymbols] = useState<GodSymbol[]>(['BLANK', 'BLANK', 'BLANK']);
  const [symbolFlicker, setSymbolFlicker] = useState<GodSymbol[]>(['BLANK', 'BLANK', 'BLANK']);

  // ── 3-Reel System ──
  const [reels, setReels] = useState<(CardData | null)[]>([null, null, null]);
  const [reelSpinning, setReelSpinning] = useState<boolean[]>([false, false, false]);
  const [reelFlicker, setReelFlicker] = useState<(CardData | null)[]>([null, null, null]);
  const [reelStopped, setReelStopped] = useState<boolean[]>([false, false, false]);
  const [matchBonus, setMatchBonus] = useState<string | null>(null);

  // ── Animation ──
  const [displayedGP, setDisplayedGP] = useState(0);
  const [gpDelta, setGpDelta] = useState(0);
  const [showGpDelta, setShowGpDelta] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState<TransitionType | null>(null);
  const [cardAnimState, setCardAnimState] = useState<'idle' | 'enter'>('idle');
  const [comboShake, setComboShake] = useState(false);
  const [lastCard, setLastCard] = useState<CardData | null>(null);

  // ── Reach演出 State ──
  const [reachActive, setReachActive] = useState(false);
  const [reachSymbol, setReachSymbol] = useState<GodSymbol | null>(null);
  const [bigWinType, setBigWinType] = useState<GodSymbol | null>(null);
  const [transitionBanner, setTransitionBanner] = useState<string | null>(null);

  // ── Stage Chase + Jackpot System ──
  const STAGE_TARGETS = [1000, 2500, 5000, 10000, 25000, 50000, 100000];
  const [stage, setStage] = useState(() => {
    try { return parseInt(localStorage.getItem('gg-stage') || '1', 10); } catch { return 1; }
  });
  const [shields, setShields] = useState<number | null>(null); // null = not initialized
  const [maxShields, setMaxShields] = useState(3);
  const [shieldBreak, setShieldBreak] = useState(false);
  const [shieldBreakText, setShieldBreakText] = useState(false);
  const [jackpotPool, setJackpotPool] = useState(0); // kept for persistence compat
  const [stageClear, setStageClear] = useState(false);
  const [bestStage, setBestStage] = useState(() => {
    try { return parseInt(localStorage.getItem('gg-best-stage') || '1', 10); } catch { return 1; }
  });
  const [jackpotWin, setJackpotWin] = useState<{ amount: number; symbol: string } | null>(null); // legacy
  const [lastStatEffect, setLastStatEffect] = useState<string | null>(null);
  const targetGP = STAGE_TARGETS[Math.min(stage - 1, STAGE_TARGETS.length - 1)];

  // ── Refs ──
  const gpAnimRef = useRef<number>(0);
  const feverBGMRef = useRef<HTMLAudioElement | null>(null);
  const feverBGMTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reelFlickerRefs = useRef<(ReturnType<typeof setInterval> | null)[]>([null, null, null]);
  const lastStandUsedRef = useRef(false);
  const prevTraitRef = useRef<TraitInfo | null>(null);
  const nextTraitDoubledRef = useRef(false);
  const spinInStateRef = useRef(0);
  const lastDropKeyRef = useRef<number | null>(null);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stylesInjectedRef = useRef(false);
  const specialModeRef = useRef(false);
  const specialGradeRef = useRef<string | null>(null);

  // ── Build pool cards from cardPool prop ──
  const poolCards = useMemo(() => {
    if (!cardPool?.length) return [];
    return cardPool.map(p => buildCardFromDrop({ ...p, key: 0 }));
  }, [cardPool]);

  // Pick N random cards from pool, excluding a specific card
  const pickPoolCards = useCallback((count: number, excludeId?: string): CardData[] => {
    const available = poolCards.filter(c => c.id !== excludeId);
    if (available.length === 0) return [];
    const result: CardData[] = [];
    const used = new Set<number>();
    for (let i = 0; i < count; i++) {
      let idx: number;
      let attempts = 0;
      do {
        idx = Math.floor(Math.random() * available.length);
        attempts++;
      } while (used.has(idx) && attempts < 20);
      used.add(idx);
      result.push(available[idx]);
    }
    return result;
  }, [poolCards]);

  // Track specialMode prop + grade
  useEffect(() => {
    specialModeRef.current = !!specialMode;
    if (specialMode && gridCompleteGrade) specialGradeRef.current = gridCompleteGrade;
  }, [specialMode, gridCompleteGrade]);

  // ── Inject keyframes ──
  useEffect(() => {
    if (stylesInjectedRef.current) return;
    stylesInjectedRef.current = true;
    const style = document.createElement('style');
    style.textContent = KEYFRAMES;
    document.head.appendChild(style);
    return () => { style.remove(); stylesInjectedRef.current = false; };
  }, []);

  // ── Load persisted state + restart BGM if needed ──
  useEffect(() => {
    const saved = loadPersisted();
    if (saved) {
      setSlotState(saved.slotState);
      setCeilingCounter(saved.ceilingCounter);
      setCombo(saved.combo);
      setTotalGP(saved.totalGP);
      setDisplayedGP(saved.totalGP);
      setTotalSpins(saved.totalSpins);
      setLoopRate(saved.loopRate);
      setGgSetSpinsLeft(saved.ggSetSpinsLeft);
      setGgSetsRemaining(saved.ggSetsRemaining);
      setCzSpinsLeft(saved.czSpinsLeft);
      setSpecialSpinsLeft(saved.specialSpinsLeft);
      setFeverSpinsLeft(saved.feverSpinsLeft);
      // Stage Chase state
      if (saved.stage !== undefined) setStage(saved.stage);
      if (saved.shields !== undefined) setShields(saved.shields);
      if (saved.maxShields !== undefined) setMaxShields(saved.maxShields);
      if (saved.jackpotPool !== undefined) setJackpotPool(saved.jackpotPool);
      if (saved.bestCombo !== undefined) setBestCombo(saved.bestCombo);
      if (saved.czCount !== undefined) setCzCount(saved.czCount);
      if (saved.rushCount !== undefined) setRushCount(saved.rushCount);
      if (saved.specialCount !== undefined) setSpecialCount(saved.specialCount);
      if (saved.feverCount !== undefined) setFeverCount(saved.feverCount);
      if (saved.peakState !== undefined) setPeakState(saved.peakState);

      // Restart fever BGM if state was FEVER before reload
      if (saved.slotState === 'FEVER' && !feverBGMRef.current) {
        feverBGMRef.current = startFeverBGM();
      }
    }
  }, []);

  // ── Persist on change ──
  useEffect(() => {
    if (spinning) return;
    savePersisted({
      slotState, ceilingCounter, combo, totalGP, totalSpins,
      loopRate, ggSetSpinsLeft, ggSetsRemaining,
      czSpinsLeft, specialSpinsLeft, feverSpinsLeft,
      stage, shields, maxShields, jackpotPool,
      bestCombo, czCount, rushCount, specialCount, feverCount, peakState,
    });
  }, [slotState, ceilingCounter, combo, totalGP, totalSpins, loopRate, ggSetSpinsLeft, ggSetsRemaining, czSpinsLeft, specialSpinsLeft, feverSpinsLeft, spinning,
    stage, shields, maxShields, jackpotPool, bestCombo, czCount, rushCount, specialCount, feverCount, peakState]);

  // ── Audio init + cleanup ──
  useEffect(() => {
    const initAudio = () => {
      try { const ctx = getAudioCtx(); if (ctx.state === 'suspended') ctx.resume(); } catch { /* */ }
    };
    window.addEventListener('click', initAudio, { once: true });
    return () => {
      window.removeEventListener('click', initAudio);
      // Clear pending fever BGM timer to prevent zombie audio after unmount
      if (feverBGMTimerRef.current) { clearTimeout(feverBGMTimerRef.current); feverBGMTimerRef.current = null; }
      if (feverBGMRef.current) { stopFeverBGM(feverBGMRef.current); feverBGMRef.current = null; }
      reelFlickerRefs.current.forEach(r => { if (r) clearInterval(r); });
      timerRefs.current.forEach(t => clearTimeout(t));
    };
  }, []);

  // GP Counter Animation: read displayedGP via ref so it stays out of deps —
  // including it caused per-frame effect re-runs and stale-closure races between
  // queued RAFs, which surfaced as wild number jumps when offscreen on mobile.
  const displayedGPRef = useRef(0);
  useEffect(() => { displayedGPRef.current = displayedGP; }, [displayedGP]);

  useEffect(() => {
    const start = displayedGPRef.current;
    const target = totalGP;
    if (start === target) return;
    // Hidden tab: RAF is throttled, so skip animation and snap to target.
    if (typeof document !== 'undefined' && document.hidden) {
      setDisplayedGP(target);
      displayedGPRef.current = target;
      return;
    }
    const diff = target - start;
    const duration = Math.min(400, Math.max(150, diff * 3));
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(start + diff * eased);
      setDisplayedGP(next);
      displayedGPRef.current = next;
      if (progress < 1) gpAnimRef.current = requestAnimationFrame(animate);
    }
    gpAnimRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(gpAnimRef.current);
  }, [totalGP]);

  // Auto-advance to next stage after brief celebration (1.8s)
  useEffect(() => {
    if (!stageClear) return;
    const t = setTimeout(() => {
      const newStage = stage + 1;
      setStage(newStage);
      setStageClear(false);
      setTotalGP(0);
      setDisplayedGP(0);
      setJackpotPool(0);
      try { localStorage.setItem('gg-stage', String(newStage)); } catch { /* */ }
      if (newStage > bestStage) {
        setBestStage(newStage);
        try { localStorage.setItem('gg-best-stage', String(newStage)); } catch { /* */ }
      }
    }, 1800);
    return () => clearTimeout(t);
  }, [stageClear, stage, bestStage]);

  const stateConfig = STATE_CONFIG[slotState];
  const stateColor = stateConfig.color;
  const ceiling = useMemo(() => calcCeiling(lastCard), [lastCard]);

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SPIN LOGIC
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const doSpin = useCallback((card: CardData) => {
    if (spinning) return;

    // Clear any leaked timers from previous spins
    timerRefs.current.forEach(t => clearTimeout(t));
    timerRefs.current = [];
    reelFlickerRefs.current.forEach(r => { if (r) clearInterval(r); });
    reelFlickerRefs.current = [null, null, null];

    setSpinning(true);
    playSpinStart();
    setMatchBonus(null);

    // Pre-roll symbols FIRST to determine if triple (win = same card 3x)
    const isSpecial = specialModeRef.current;
    const reelRoll = isSpecial
      ? rollBonusSlot(specialGradeRef.current || 'C')
      : rollReelSymbols(slotState);
    const drawnSymbols = reelRoll.symbols;
    const isTriple = reelRoll.triple !== null;

    // Build 3 reel cards: triple = same card 3x, otherwise different cards
    let cards: CardData[];
    if (isTriple) {
      // WIN: all 3 reels show the same card
      cards = [card, card, card];
    } else if (poolCards.length >= 2) {
      // MISS: show 3 different cards from pool
      const others = pickPoolCards(2, card.id);
      cards = [others[0] || card, card, others[1] || card];
    } else {
      // Fallback: stat-varied copies (no pool available)
      cards = [0, 1, 2].map(i => {
        if (i === 1) return card;
        const variantId = card.id + String(i);
        const stats = calcBstStats(variantId);
        const bstTotal = stats.reduce((a, b) => a + b, 0);
        return { ...card, stats, bstTotal, id: variantId };
      });
    }

    // Start all 3 reels spinning
    setReelSpinning([true, true, true]);
    setReelStopped([false, false, false]);
    setReels([null, null, null]);

    // Start flicker intervals — use pool cards for variety
    for (let r = 0; r < 3; r++) {
      reelFlickerRefs.current[r] = setInterval(() => {
        setReelFlicker(prev => {
          const next = [...prev];
          if (poolCards.length > 0) {
            // Use random pool cards for realistic slot flicker
            next[r] = poolCards[Math.floor(Math.random() * poolCards.length)];
          } else {
            const flickId = card.id + String(Math.floor(Math.random() * 100));
            const flickStats = calcBstStats(flickId);
            const flickBst = flickStats.reduce((a, b) => a + b, 0);
            const flickRank = getCardRank(Math.floor(Math.random() * 80));
            next[r] = { ...card, id: flickId, stats: flickStats, bstTotal: flickBst, rank: flickRank };
          }
          return next;
        });
        setSymbolFlicker(prev => {
          const next = [...prev];
          next[r] = ALL_SYMBOLS[Math.floor(Math.random() * ALL_SYMBOLS.length)];
          return next;
        });
        playSpinTick();
      }, 90 + r * 15);
    }

    // ── REACH演出: detect if first 2 symbols match (non-BLANK) ──
    const isReach = drawnSymbols[0] !== 'BLANK' && drawnSymbols[0] === drawnSymbols[1];
    const reachDelay = isReach ? 2500 : 0; // Extra delay for 3rd reel on reach
    const reel3Delay = REEL_STOP_DELAYS[2] + reachDelay;

    // Stop each reel sequentially
    const timers: ReturnType<typeof setTimeout>[] = [];
    const stopReel = (r: number) => {
      if (reelFlickerRefs.current[r]) clearInterval(reelFlickerRefs.current[r]!);
      playReelStop(r);
      setReelSpinning(prev => { const n = [...prev]; n[r] = false; return n; });
      setReelStopped(prev => { const n = [...prev]; n[r] = true; return n; });
      setReels(prev => { const n = [...prev]; n[r] = cards[r]; return n; });
      setReelFlicker(prev => { const n = [...prev]; n[r] = null; return n; });
      setReelSymbols(prev => { const n = [...prev]; n[r] = drawnSymbols[r]; return n; });
      setSymbolFlicker(prev => { const n = [...prev]; n[r] = 'BLANK'; return n; });
    };

    // Reel 1 stop
    timers.push(setTimeout(() => stopReel(0), REEL_STOP_DELAYS[0]));

    // Reel 2 stop + reach detection
    timers.push(setTimeout(() => {
      stopReel(1);
      if (isReach) {
        // Activate reach tension mode
        setReachActive(true);
        setReachSymbol(drawnSymbols[0]);
        playReachAlert();
      }
    }, REEL_STOP_DELAYS[1]));

    // Reel 3 stop (delayed if reach)
    timers.push(setTimeout(() => {
      stopReel(2);
      if (isReach) {
        setReachActive(false);
        setReachSymbol(null);
        // If triple, trigger big win celebration
        if (isTriple) {
          setBigWinType(drawnSymbols[0]);
          playImpactHit(1.0);
          const clearBigWin = setTimeout(() => setBigWinType(null), 3000);
          timers.push(clearBigWin);
        }
      }
    }, reel3Delay));

    // After all reels stop: evaluate result
    const evalTimer = setTimeout(() => {
      // Average stats from the 3 reels
      const avgStats = cards[0].stats.map((_, i) =>
        Math.round((cards[0].stats[i] + cards[1].stats[i] + cards[2].stats[i]) / 3)
      );
      const combinedCard: CardData = { ...card, stats: avgStats };
      const prevTrait = prevTraitRef.current;
      const traitDoubled = nextTraitDoubledRef.current;
      const curSpinInState = spinInStateRef.current;
      let gp = calcGP(combinedCard, slotState, combo, curSpinInState, prevTrait, traitDoubled);

      // === PAYOUT SYSTEM ===
      const symbolTriple = reelRoll.triple;
      const nonBlankSymbols = drawnSymbols.filter(s => s !== 'BLANK');
      const baseGP = gp;

      if (symbolTriple === 'GOD') {
        gp = Math.round(baseGP * 10);
        setMatchBonus('GOD TRIPLE! x10');
        playGachaSound('LEGENDARY');
      } else if (symbolTriple === 'RED7') {
        gp = Math.round(baseGP * 5);
        setMatchBonus('BLAZE TRIPLE! x5');
        playGachaSound('SUPER');
      } else if (symbolTriple === 'YELLOW7') {
        gp = Math.round(baseGP * 3);
        setMatchBonus('BOLT TRIPLE! x3');
      } else if (symbolTriple === 'BLUE7') {
        gp = Math.round(baseGP * 2);
        setMatchBonus('FROST TRIPLE! x2');
      } else if (symbolTriple === 'V_SYMBOL') {
        gp = Math.round(baseGP * 3);
        setMatchBonus('WILD TRIPLE! x3');
      } else {
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
            setMatchBonus('BLAZE x2');
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

      // ── Notify parent of spin result type (for upper screen effects) ──
      if (onBigWin) {
        if (symbolTriple) {
          onBigWin('triple', symbolTriple);
        } else {
          const symbolCounts: Record<string, number> = {};
          drawnSymbols.forEach(s => { symbolCounts[s] = (symbolCounts[s] || 0) + 1; });
          const hasPair = Object.entries(symbolCounts).some(([k, v]) => v === 2 && k !== 'BLANK');
          if (hasPair) {
            onBigWin('reach');
          } else {
            onBigWin('miss');
          }
        }
      }

      // ── State Machine ──
      let newState = slotState;
      let transition: TransitionType | null = null;
      let newCombo = combo;
      let newCzLeft = czSpinsLeft;
      let newSpecialLeft = specialSpinsLeft;
      let newFeverLeft = feverSpinsLeft;
      let newCeiling = ceilingCounter;
      let newSpinInState = curSpinInState + 1;

      switch (slotState) {
        case 'NORMAL': {
          newCeiling = ceilingCounter + 1;
          const czLimit = calcCeiling(card);

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
          newCombo = combo + 1;
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
              setMatchBonus(`\u7D99\u7D9A! \u6B8B\u308A${ggSetsRemaining - 1}\u30BB\u30C3\u30C8`);
            } else if (Math.random() * 100 < loopRate) {
              setGgSetSpinsLeft(15);
              setMatchBonus(`${loopRate}%\u30EB\u30FC\u30D7\u7D99\u7D9A!`);
              playFeverChainHit(newCombo);
            } else {
              // Fall survival check
              if (rollFallSurvival(card, lastStandUsedRef.current)) {
                if (card.trait.name === 'Last Stand') lastStandUsedRef.current = true;
                setGgSetSpinsLeft(15);
                setMatchBonus('\u8EE2\u843D\u56DE\u907F!');
              } else {
                newState = 'NORMAL';
                transition = 'FALL_TO_NORMAL';
                newCeiling = 0;
                newSpinInState = 0;
              }
            }
          } else {
            setGgSetSpinsLeft(newSetSpins);
            if (symbolTriple === 'YELLOW7') {
              const newLoop = Math.min(89, loopRate + 10);
              setLoopRate(newLoop);
              setMatchBonus(`\u30EB\u30FC\u30D7\u7387UP! ${newLoop}%`);
            }
          }
          break;
        }
        case 'SPECIAL': {
          newSpecialLeft = specialSpinsLeft - 1;
          newCombo = combo + 1;

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
          newCombo = combo + 1;

          if (newFeverLeft <= 0) {
            newState = 'RUSH';
            setGgSetSpinsLeft(15);
            setLoopRate(89);
            newSpinInState = 0;
          }
          break;
        }
      }

      const finalGP = Math.round(gp);

      // ═══ STAGE CHASE SYSTEM ═══
      const stats = card.stats; // [HP, ATK, DEF, SPA, SPD, SPE]

      // Initialize shields on first spin (HP → shield count)
      if (shields === null) {
        const initShields = Math.max(1, Math.min(5, Math.floor(stats[0] / 20)));
        setShields(initShields);
        setMaxShields(initShields);
      }

      // ═══ BAD LUCK = LIFE LOSS ═══
      // All blanks = potential CURSE. ~15% of all-blanks actually trigger LIFE loss.
      // DEF stat reduces curse chance (high DEF = luckier).
      const allBlank = drawnSymbols.every(s => s === 'BLANK');
      const defStat = stats[2] || 0;
      const curseRate = Math.max(0.05, 0.15 - defStat * 0.001); // 5-15%
      const isCursed = allBlank && Math.random() < curseRate && shields !== null && shields > 0;

      if (isCursed) {
        // Shield loss is purely visual/dramatic — never terminal.
        // When shields hit 0 we refill to max so the danger loop continues.
        const next = shields! - 1;
        const newShields = next <= 0 ? maxShields : next;
        setShields(newShields);
        setShieldBreak(true);
        setShieldBreakText(true);
        playImpactHit(0.8);
        const sbTimer = setTimeout(() => setShieldBreak(false), 1200);
        timers.push(sbTimer);
        const sbtTimer = setTimeout(() => setShieldBreakText(false), 2000);
        timers.push(sbtTimer);
      }

      // STAGE CLEAR check
      const newTotalGPCheck = totalGP + Math.round(gp);
      if (newTotalGPCheck >= targetGP && !stageClear) {
        setStageClear(true);
        playGachaSound('LEGENDARY');
        playFeverEntrySound();
      }

      prevTraitRef.current = card.trait;
      nextTraitDoubledRef.current = card.trait.name === 'Harmonizer';
      spinInStateRef.current = newSpinInState;

      // Sound effects
      playCardRankSound(card.rank);
      const gpSoundTimer = setTimeout(() => playGpCoin(), 150);
      timers.push(gpSoundTimer);

      if (newCombo > 0 && newCombo % 5 === 0) playFeverChainHit(newCombo);

      if (transition === 'NORMAL_TO_CZ') {
        playKakuhenEntry();
        setCzCount(c => c + 1);
        setTransitionBanner('G-STOP');
      } else if (transition === 'CZ_TO_RUSH') {
        playFeverEntrySound();
        setRushCount(c => c + 1);
        setTransitionBanner('GOD GAME');
      } else if (transition === 'RUSH_TO_SPECIAL') {
        playFeverEntrySound();
        playImpactHit(0.8);
        setSpecialCount(c => c + 1);
        setTransitionBanner('SUPER GOD GAME');
      } else if (transition === 'SPECIAL_TO_FEVER') {
        playFeverEntrySound();
        playImpactHit(1.0);
        setFeverCount(c => c + 1);
        setTransitionBanner('PREMIUM GOD GAME');
        // Cancel any pending BGM start to prevent double-play
        if (feverBGMTimerRef.current) { clearTimeout(feverBGMTimerRef.current); feverBGMTimerRef.current = null; }
        feverBGMTimerRef.current = setTimeout(() => {
          feverBGMTimerRef.current = null;
          feverBGMRef.current = startFeverBGM();
        }, 800);
        timers.push(feverBGMTimerRef.current);
      } else if (transition === 'FALL_TO_NORMAL') {
        playStreakBreak();
        playFeverExitSound();
        // Cancel pending BGM start + stop playing BGM
        if (feverBGMTimerRef.current) { clearTimeout(feverBGMTimerRef.current); feverBGMTimerRef.current = null; }
        if (feverBGMRef.current) { stopFeverBGM(feverBGMRef.current); feverBGMRef.current = null; }
      }

      // Track session stats
      if (newCombo > bestCombo) setBestCombo(newCombo);
      const stateIdx = STATE_ORDER.indexOf(newState);
      const peakIdx = STATE_ORDER.indexOf(peakState);
      if (stateIdx > peakIdx) setPeakState(newState);
      if (transition) setStateHistory(h => [...h.slice(-19), newState]);

      // Reach alert
      const czLimit = calcCeiling(card);
      if (slotState === 'NORMAL' && newCeiling >= czLimit * 0.8 && !transition) {
        playReachAlert();
      }

      setCardAnimState('enter');
      setLastCard(card);
      setSlotState(newState);
      setCeilingCounter(newCeiling);
      setCzSpinsLeft(newCzLeft);
      setSpecialSpinsLeft(newSpecialLeft);
      setFeverSpinsLeft(newFeverLeft);

      setGpDelta(finalGP);
      setShowGpDelta(true);
      const gpHideTimer = setTimeout(() => setShowGpDelta(false), 1000);
      timers.push(gpHideTimer);
      const matchHideTimer = setTimeout(() => setMatchBonus(null), 2000);
      timers.push(matchHideTimer);

      const newTotalGP = totalGP + finalGP;
      setTotalGP(newTotalGP);
      setTotalSpins(prev => prev + 1);
      setCombo(newState === 'NORMAL' ? 0 : newCombo);

      if (newCombo > 0 && newCombo % 5 === 0) {
        setComboShake(true);
        const shakeTimer = setTimeout(() => setComboShake(false), 400);
        timers.push(shakeTimer);
      }

      if (transition) {
        setTransitionEffect(transition);
        const transTimer = setTimeout(() => setTransitionEffect(null), 1200);
        timers.push(transTimer);
      }
      if (transition && transition !== 'FALL_TO_NORMAL') {
        const bannerTimer = setTimeout(() => setTransitionBanner(null), 2500);
        timers.push(bannerTimer);
      }

      // Fire callbacks
      if (onSpinComplete) {
        onSpinComplete({
          tier: newState,
          gpEarned: finalGP,
          card,
        });
      }
      if (isSpecial && onSpecialSpinDone) {
        onSpecialSpinDone(finalGP);
      }

      // Settle
      const settleTimer = setTimeout(() => {
        setCardAnimState('idle');
        setSpinning(false);
      }, 1500);
      timers.push(settleTimer);

    }, reel3Delay + 300);
    timers.push(evalTimer);

    timerRefs.current = timers;
  }, [
    spinning, slotState, combo, czSpinsLeft, specialSpinsLeft,
    feverSpinsLeft, ceilingCounter, totalGP, totalSpins,
    loopRate, ggSetSpinsLeft, ggSetsRemaining, onSpinComplete,
    onBigWin, onSpecialSpinDone, poolCards, pickPoolCards, shields, maxShields, jackpotPool, stage, targetGP, stageClear, bestStage,
  ]);

  // Keep doSpin in a ref so the auto-trigger effect doesn't re-fire on doSpin identity changes
  const doSpinRef = useRef(doSpin);
  doSpinRef.current = doSpin;

  // ── Auto-trigger spin when dropCard changes ──
  useEffect(() => {
    if (!dropCard || dropCard.key === lastDropKeyRef.current) return;
    lastDropKeyRef.current = dropCard.key;
    const card = buildCardFromDrop(dropCard);
    // Small delay for visual feedback
    const triggerTimer = setTimeout(() => doSpinRef.current(card), 200);
    return () => clearTimeout(triggerTimer);
  }, [dropCard]); // eslint-disable-line react-hooks/exhaustive-deps

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // RENDER HELPERS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderReelCard = (card: CardData, reelIdx: number) => {
    const rank = card.rank;
    const isHolo = rank === 'HOLOGRAPHIC' || rank === 'LEGENDARY';
    const isLegendary = rank === 'LEGENDARY';
    const isTextLight = rank === 'LEGENDARY';
    const w = isMobile ? 100 : 140;
    const h = isMobile ? 160 : 200;
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
        ...(isLegendary ? { animation: 'rsp-legendary-aura 4s ease-in-out infinite' } : {}),
        ...(rank === 'GOLD' ? { animation: 'rsp-gold-pulse 5s ease-in-out infinite' } : {}),
        ...(isStopping ? { animation: 'rsp-reelSlam 300ms ease-out' } : {}),
      }}>
        {/* Holo overlay */}
        {isHolo && (
          <div style={{
            position: 'absolute', inset: 0,
            background: isLegendary
              ? 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(168,85,247,0.2) 50%, rgba(212,175,55,0.15) 100%)'
              : 'linear-gradient(135deg, rgba(232,121,249,0.15) 0%, rgba(59,130,246,0.15) 50%, rgba(232,121,249,0.15) 100%)',
            backgroundSize: '200% 200%',
            animation: 'rsp-holo-shimmer 3s linear infinite',
            borderRadius: '2px', pointerEvents: 'none', zIndex: 4, opacity: 0.15,
            mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
          }} />
        )}

        {/* Legendary particles */}
        {isLegendary && Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${2 + (i % 2)}px`, height: `${2 + (i % 2)}px`,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#D4AF37' : '#A855F7',
            left: `${10 + (i * 14) % 80}%`,
            top: `${5 + (i * 17) % 85}%`,
            animation: `rsp-particle-float ${2 + (i % 2)}s ease-in-out infinite`,
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
          <div style={{ marginTop: isMobile ? 3 : 4 }}>
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
  // REEL MACHINE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderReelMachine = () => {
    const w = isMobile ? 100 : 180;
    const h = isMobile ? 160 : 260;
    const isGolden = specialMode;
    const frameColor = isGolden ? '#D4AF37' : stateColor;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, position: 'relative' }}>
        {/* Golden mode particle overlay */}
        {isGolden && (
          <div style={{ position: 'absolute', inset: -20, pointerEvents: 'none', zIndex: 20, overflow: 'hidden' }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                width: `${3 + (i % 3)}px`, height: `${3 + (i % 3)}px`,
                borderRadius: '50%',
                background: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#FFF2A8' : '#F6C85F',
                left: `${(i * 8.3) % 100}%`,
                top: `${(i * 7.7) % 100}%`,
                animation: `rsp-particle-float ${1.5 + (i % 3) * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                opacity: 0.9,
              }} />
            ))}
          </div>
        )}
        {/* Slot machine outer frame - metallic gradient */}
        <div style={{
          background: isGolden
            ? 'linear-gradient(180deg, #D4AF37 0%, #B8941E 8%, #2D2200 50%, #B8941E 92%, #D4AF37 100%)'
            : 'linear-gradient(180deg, #D4AF37 0%, #44403C 8%, #292524 50%, #44403C 92%, #D4AF37 100%)',
          borderRadius: 20,
          padding: isGolden ? '4px' : '3px',
          boxShadow: isGolden
            ? '0 0 60px rgba(212,175,55,0.5), 0 0 120px rgba(212,175,55,0.2), 0 8px 32px rgba(0,0,0,0.5)'
            : `0 0 30px rgba(212,175,55,0.15), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.2)`,
          position: 'relative',
          ...(isGolden ? { animation: 'rsp-gold-pulse 2s ease-in-out infinite' } : {}),
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
              background: isGolden
                ? 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)'
                : `radial-gradient(ellipse at 50% 50%, ${frameColor}08 0%, transparent 70%)`,
              pointerEvents: 'none',
            }} />

            {/* State label at top */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
            }}>
              <div style={{
                padding: isGolden ? '4px 24px' : '3px 20px',
                borderRadius: '0 0 8px 8px',
                background: isGolden
                  ? 'linear-gradient(180deg, #D4AF37 0%, #B8941E 100%)'
                  : `linear-gradient(180deg, ${stateColor} 0%, ${stateColor}CC 100%)`,
                fontSize: isMobile ? 9 : 11, fontWeight: 900, color: 'white',
                letterSpacing: '0.2em',
                boxShadow: isGolden
                  ? '0 4px 16px rgba(212,175,55,0.6)'
                  : `0 4px 12px ${stateColor}40`,
                textShadow: isGolden ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
              }}>
                {isGolden ? 'SPECIAL SLOT' : stateConfig.label}
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
                  border: stopped ? `2px solid ${stateColor}80`
                    : reachActive && reelIdx === 2 ? `2px solid ${reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37'}80`
                    : '2px solid #44403C',
                  boxShadow: stopped
                    ? `0 0 15px ${stateColor}30, inset 0 0 20px rgba(0,0,0,0.5)`
                    : reachActive && reelIdx === 2
                    ? `0 0 30px ${reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37'}60, inset 0 0 20px rgba(0,0,0,0.5)`
                    : 'inset 0 0 20px rgba(0,0,0,0.5)',
                  ...(reachActive && reelIdx === 2 ? { animation: 'rsp-reachReel3Glow 600ms ease-in-out infinite' } : {}),
                }}>
                  {/* Reel window background */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: stopped
                      ? 'linear-gradient(180deg, #1A1816 0%, #151311 50%, #1A1816 100%)'
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
                      height: 2, backgroundColor: `${stateColor}40`,
                      boxShadow: `0 0 8px ${stateColor}30`,
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
                        animation: 'rsp-matchBonusPop 400ms ease-out',
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
                      <div style={{ animation: 'rsp-reelSpin 80ms linear infinite', opacity: 0.6 }}>
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
                      background: `radial-gradient(circle, ${stateColor}40 0%, transparent 70%)`,
                      animation: 'rsp-stopFlash 300ms ease-out forwards',
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

        {/* Match bonus text */}
        {matchBonus && (
          <div style={{
            fontSize: isMobile ? 14 : 18, fontWeight: 900,
            color: '#D4AF37',
            textShadow: '0 0 10px rgba(212,175,55,0.6)',
            animation: 'rsp-matchBonusPop 500ms ease-out',
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}>
            {matchBonus}
          </div>
        )}
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STATE BAR
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderStateBar = () => {
    const isActive = slotState !== 'NORMAL';
    const gridRemaining = gridInfo ? gridInfo.total - gridInfo.filled : 0;
    const gridTotal = gridInfo ? gridInfo.total : 0;

    return (
      <div style={{
        background: '#0A0908',
        border: `2px solid ${stateColor}40`,
        borderRadius: 12,
        padding: isMobile ? '8px 12px' : '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, flexWrap: 'wrap',
      }}>
        {/* Left: state indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: stateColor,
            boxShadow: `0 0 8px ${stateColor}60`,
            ...(isActive ? { animation: 'rsp-pulse 1.5s ease-in-out infinite' } : {}),
          }} />
          <span style={{
            fontSize: isMobile ? 11 : 13, fontWeight: 800,
            color: stateColor, letterSpacing: '0.15em',
          }}>
            {stateConfig.label}
          </span>
          {slotState === 'CZ' && (
            <span style={{ fontSize: 10, color: '#78716C', fontFamily: 'monospace' }}>
              {czSpinsLeft} left
            </span>
          )}
          {slotState === 'RUSH' && (
            <span style={{ fontSize: 10, color: '#78716C', fontFamily: 'monospace' }}>
              {ggSetSpinsLeft}sp / {loopRate}%
            </span>
          )}
          {slotState === 'SPECIAL' && (
            <span style={{ fontSize: 10, color: '#78716C', fontFamily: 'monospace' }}>
              {specialSpinsLeft} left
            </span>
          )}
          {slotState === 'FEVER' && (
            <span style={{ fontSize: 10, color: '#78716C', fontFamily: 'monospace' }}>
              {feverSpinsLeft} left / {loopRate}%
            </span>
          )}
        </div>

        {/* Center: GP counter */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span style={{
            fontSize: isMobile ? 10 : 11, fontWeight: 600,
            color: '#78716C', letterSpacing: '0.05em',
          }}>
            GP
          </span>
          <span style={{
            fontSize: isMobile ? 16 : 20, fontWeight: 900,
            color: '#D4AF37', fontFamily: 'monospace',
            letterSpacing: '-0.02em',
            textShadow: '0 0 8px rgba(212,175,55,0.3)',
          }}>
            {displayedGP.toLocaleString()}
          </span>
        </div>

        {/* Right: combo or ceiling */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {slotState === 'NORMAL' ? (
            // Ceiling progress bar
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 9, color: '#57534E', fontWeight: 600 }}>
                {'\u5929\u4E95'}
              </span>
              <div style={{
                width: isMobile ? 50 : 80, height: 6, borderRadius: 3,
                backgroundColor: '#1C1917', overflow: 'hidden',
                border: '1px solid #292524',
              }}>
                <div style={{
                  height: '100%', borderRadius: 3,
                  backgroundColor: ceilingCounter >= ceiling * 0.8 ? '#EF4444' : stateColor,
                  width: `${Math.min(100, (ceilingCounter / ceiling) * 100)}%`,
                  transition: 'width 300ms ease',
                  boxShadow: ceilingCounter >= ceiling * 0.8 ? '0 0 6px rgba(239,68,68,0.5)' : 'none',
                }} />
              </div>
              <span style={{ fontSize: 9, color: '#57534E', fontFamily: 'monospace' }}>
                {ceilingCounter}/{ceiling}
              </span>
            </div>
          ) : (
            // Combo counter
            <div style={{
              display: 'flex', alignItems: 'center', gap: 4,
              ...(comboShake ? { animation: 'rsp-comboShake 400ms ease' } : {}),
            }}>
              <span style={{ fontSize: 9, color: '#57534E', fontWeight: 600 }}>
                COMBO
              </span>
              <span style={{
                fontSize: isMobile ? 14 : 18, fontWeight: 900,
                color: combo >= 10 ? '#D4AF37' : combo >= 5 ? '#EF4444' : '#F59E0B',
                fontFamily: 'monospace',
                textShadow: combo >= 10 ? '0 0 8px rgba(212,175,55,0.4)' : 'none',
              }}>
                {combo}
              </span>
            </div>
          )}

          {/* Grid fill countdown */}
          {gridInfo && gridRemaining > 0 && (
            <div style={{
              fontSize: 9, color: '#57534E',
              display: 'flex', alignItems: 'center', gap: 3,
            }}>
              <span style={{ fontWeight: 700 }}>GRID</span>
              <span style={{ fontFamily: 'monospace', color: '#78716C' }}>
                {gridRemaining}/{gridTotal}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // IDLE STATE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const renderIdleState = () => {
    if (lastCard) {
      // Show the last spun card as a premium display
      const rank = lastCard.rank;
      const isLegendary = rank === 'LEGENDARY';
      const frame = getCardFrame(rank);
      const shadow = getCardShadow(rank);
      const accent = getFrameAccent(rank);
      const isTextLight = rank === 'LEGENDARY';
      const borderColor = getRankBorderColor(rank);
      const bstTier = getBstTier(lastCard.bstTotal);
      const isHolo = rank === 'HOLOGRAPHIC' || rank === 'LEGENDARY';
      const cardW = isMobile ? 160 : 260;
      const cardH = isMobile ? 220 : 380;

      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', gap: 12, padding: '20px 0',
        }}>
          {/* Ambient glow behind card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: cardW * 1.5, height: cardH * 1.2,
              borderRadius: '50%',
              background: `radial-gradient(ellipse, ${stateColor}15 0%, transparent 70%)`,
              animation: 'rsp-ambientGlow 4s ease-in-out infinite',
              pointerEvents: 'none',
            }} />

            {/* Card display */}
            <div style={{
              width: cardW, height: cardH,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              ...frame,
              border: frame.border.replace('8px', isMobile ? '6px' : '8px'),
              boxShadow: shadow,
              padding: isMobile ? '5px' : '8px',
              ...(isLegendary ? { animation: 'rsp-legendary-aura 4s ease-in-out infinite' } : {}),
              ...(rank === 'GOLD' ? { animation: 'rsp-gold-pulse 5s ease-in-out infinite' } : {}),
            }}>
              {isHolo && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: isLegendary
                    ? 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(168,85,247,0.2) 50%, rgba(212,175,55,0.15) 100%)'
                    : 'linear-gradient(135deg, rgba(232,121,249,0.15) 0%, rgba(59,130,246,0.15) 50%, rgba(232,121,249,0.15) 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'rsp-holo-shimmer 3s linear infinite',
                  borderRadius: '2px', pointerEvents: 'none', zIndex: 4, opacity: 0.15,
                  mixBlendMode: 'overlay' as React.CSSProperties['mixBlendMode'],
                }} />
              )}

              {isLegendary && Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: `${2 + (i % 3)}px`, height: `${2 + (i % 3)}px`,
                  borderRadius: '50%',
                  background: i % 2 === 0 ? '#D4AF37' : '#A855F7',
                  left: `${8 + (i * 11) % 84}%`,
                  top: `${5 + (i * 13) % 88}%`,
                  animation: `rsp-particle-float ${2 + (i % 2)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`,
                  opacity: 0.7, zIndex: 6, pointerEvents: 'none' as const,
                }} />
              ))}

              {/* Top bar */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: isMobile ? '3px 6px' : '4px 8px',
                backgroundColor: isTextLight ? 'rgba(255,255,255,0.06)' : `${accent}12`,
                borderRadius: '4px 4px 0 0',
                borderBottom: `1px solid ${isTextLight ? 'rgba(255,255,255,0.1)' : accent + '30'}`,
                position: 'relative', zIndex: 7,
              }}>
                <ElementBadge element={lastCard.element} size={isMobile ? 10 : 12} />
                <span style={{
                  fontSize: isMobile ? '8px' : '9px', fontWeight: 800,
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
                margin: isMobile ? '3px 0' : '4px 0',
                padding: isMobile ? '10px 8px' : '14px 10px',
                textAlign: 'center', position: 'relative', zIndex: 7, overflow: 'hidden',
              }}>
                {rank === 'GOLD' && (
                  <div style={{
                    position: 'absolute', inset: 0, opacity: 0.03,
                    background: 'radial-gradient(circle at 30% 40%, #D4AF37 0.5px, transparent 0.5px)',
                    backgroundSize: '12px 12px', pointerEvents: 'none',
                  }} />
                )}

                <div style={{
                  fontSize: isMobile ? '18px' : '22px', fontWeight: 900,
                  color: isTextLight ? '#FAFAF9' : '#1C1917',
                  lineHeight: 1.2, marginBottom: '6px',
                  letterSpacing: '-0.3px', position: 'relative',
                  textShadow: isTextLight ? '0 1px 4px rgba(0,0,0,0.5)' : 'none',
                }}>
                  {lastCard.phrase}
                </div>
                <div style={{
                  fontSize: isMobile ? '10px' : '12px',
                  color: isTextLight ? 'rgba(255,255,255,0.45)' : '#A8A29E',
                  lineHeight: 1.3, position: 'relative', marginBottom: 8,
                }}>
                  {lastCard.meaning}
                </div>

                <div>
                  <span style={{
                    fontSize: isMobile ? '8px' : '9px', fontWeight: 700,
                    color: ELEMENT_COLORS[lastCard.element] || '#78716C',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase' as const,
                  }}>
                    {lastCard.element}
                  </span>
                </div>
              </div>

              {/* Bottom: BST tier */}
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: isMobile ? '3px 6px' : '4px 8px',
                backgroundColor: isTextLight ? 'rgba(255,255,255,0.04)' : `${accent}08`,
                borderRadius: '0 0 4px 4px',
                borderTop: `1px solid ${isTextLight ? 'rgba(255,255,255,0.08)' : accent + '20'}`,
                position: 'relative', zIndex: 7,
              }}>
                <span style={{
                  fontSize: isMobile ? '8px' : '9px', fontWeight: 800,
                  color: bstTier.color,
                }}>
                  {bstTier.tier} {lastCard.bstTotal}
                </span>
                <span style={{
                  fontSize: isMobile ? '7px' : '8px', fontWeight: 600,
                  color: isTextLight ? 'rgba(255,255,255,0.3)' : '#A8A29E',
                }}>
                  {lastCard.trait.nameJa}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // No last card - show waiting state
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 16, padding: '40px 0',
        minHeight: 200,
      }}>
        {/* Ambient glow */}
        <div style={{
          width: 120, height: 120, borderRadius: '50%',
          background: `radial-gradient(ellipse, ${stateColor}10 0%, transparent 70%)`,
          animation: 'rsp-ambientGlow 4s ease-in-out infinite',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%',
            border: `2px dashed ${stateColor}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 4, height: 4, borderRadius: '50%',
              backgroundColor: stateColor,
              animation: 'rsp-pulse 2s ease-in-out infinite',
            }} />
          </div>
        </div>
        <span style={{
          fontSize: isMobile ? 11 : 13, fontWeight: 600,
          color: '#57534E', letterSpacing: '0.2em',
          animation: 'rsp-idlePulse 3s ease-in-out infinite',
        }}>
          NEXT REVIEW...
        </span>
      </div>
    );
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // MAIN RENDER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const isSpinActive = spinning || reelSpinning.some(Boolean) || reelStopped.some(Boolean);

  return (
    <div style={{
      position: 'relative',
      background: STATE_BG[slotState],
      borderRadius: 16,
      overflow: 'hidden',
      transition: 'background 600ms ease',
    }}>
      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        padding: isMobile ? '12px 8px' : '16px 12px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 12,
      }}>
        {/* ═══ STAGE PROGRESS + SHIELDS ═══ */}
        {shields !== null && (
          <div style={{
            width: '100%', marginBottom: 6,
            background: 'linear-gradient(180deg, rgba(28,25,23,0.6) 0%, rgba(41,37,36,0.4) 100%)',
            borderRadius: 12, padding: isMobile ? '10px 12px' : '14px 16px',
            border: totalGP >= targetGP * 0.8
              ? '1px solid rgba(212,175,55,0.3)'
              : '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Glow when close to target */}
            {totalGP >= targetGP * 0.8 && (
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 12, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%)',
                animation: 'rsp-dangerPulse 2s ease-in-out infinite',
              }} />
            )}

            {/* Top row: STAGE badge + LIFE hearts */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              marginBottom: 10,
            }}>
              {/* STAGE badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  background: 'linear-gradient(135deg, #D4AF37, #B8941E)',
                  borderRadius: 6, padding: '3px 10px',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <span style={{
                    fontSize: 9, fontWeight: 900, letterSpacing: '0.15em',
                    color: '#1C1917',
                  }}>STAGE</span>
                  <span style={{
                    fontSize: 16, fontWeight: 900, color: '#1C1917',
                    fontFamily: 'monospace',
                  }}>{stage}</span>
                </div>
                {bestStage > 1 && (
                  <span style={{ fontSize: 9, fontWeight: 700, color: '#57534E' }}>
                    BEST {bestStage}
                  </span>
                )}
              </div>

              {/* LIFE hearts -- compact row */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 3,
                ...(shields <= 1 && shields > 0 ? { animation: 'rsp-dangerPulse 0.8s ease-in-out infinite' } : {}),
              }}>
                {Array.from({ length: maxShields }).map((_, i) => {
                  const alive = i < shields;
                  const breaking = shieldBreak && i === shields;
                  const danger = shields <= 1 && alive;
                  const size = isMobile ? 18 : 20;
                  return (
                    <div key={i} style={{
                      width: size, height: size, position: 'relative',
                      ...(breaking ? { animation: 'rsp-shieldCrack 600ms ease-out forwards' } : {}),
                      ...(danger ? { animation: 'rsp-pulse 0.6s ease-in-out infinite' } : {}),
                    }}>
                      <svg width={size} height={size} viewBox="0 0 24 24"
                        fill={alive ? '#EF4444' : '#292524'}
                        stroke="none"
                        style={{
                          filter: alive
                            ? (danger ? 'drop-shadow(0 0 6px rgba(239,68,68,0.7))' : 'drop-shadow(0 0 3px rgba(239,68,68,0.3))')
                            : 'none',
                          opacity: alive ? 1 : 0.2,
                        }}
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      {!alive && !breaking && (
                        <svg width={size} height={size} viewBox="0 0 24 24"
                          style={{ position: 'absolute', inset: 0, opacity: 0.4 }}
                          fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round"
                        >
                          <line x1="9" y1="9" x2="15" y2="15" />
                          <line x1="15" y1="9" x2="9" y2="15" />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ═══ HERO: GP Progress ═══ */}
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              {/* Big GP number */}
              <div style={{
                fontSize: isMobile ? 32 : 42, fontWeight: 900,
                fontFamily: 'monospace',
                color: totalGP >= targetGP * 0.8 ? '#FDE68A' : '#D4AF37',
                lineHeight: 1,
                textShadow: totalGP >= targetGP * 0.8
                  ? '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.3)'
                  : '0 0 8px rgba(212,175,55,0.3)',
                letterSpacing: '-1px',
              }}>
                {displayedGP.toLocaleString()}
              </div>
              {/* "/ TARGET" subtitle */}
              <div style={{
                fontSize: 11, fontWeight: 700, color: '#78716C',
                marginTop: 2, letterSpacing: '0.05em',
              }}>
                / {targetGP.toLocaleString()} GP
              </div>
            </div>

            {/* Progress bar -- thick and prominent */}
            <div style={{
              width: '100%', height: 14, borderRadius: 7,
              backgroundColor: '#1C1917', overflow: 'hidden',
              border: '1px solid #292524',
              position: 'relative',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
            }}>
              <div style={{
                height: '100%', borderRadius: 7,
                width: `${Math.min(100, (totalGP / targetGP) * 100)}%`,
                background: totalGP >= targetGP * 0.8
                  ? 'linear-gradient(90deg, #D4AF37 0%, #FDE68A 60%, #D4AF37 100%)'
                  : totalGP >= targetGP * 0.5
                  ? 'linear-gradient(90deg, #059669 0%, #10B981 60%, #34D399 100%)'
                  : 'linear-gradient(90deg, #0284C7 0%, #38BDF8 60%, #7DD3FC 100%)',
                transition: 'width 400ms ease, background 400ms ease',
                boxShadow: totalGP >= targetGP * 0.8
                  ? '0 0 12px rgba(212,175,55,0.6), inset 0 1px 0 rgba(255,255,255,0.3)'
                  : '0 0 6px rgba(16,185,129,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
              }} />
            </div>

            {/* Remaining GP */}
            <div style={{
              textAlign: 'center', marginTop: 6,
              fontSize: 12, fontWeight: 800, fontFamily: 'monospace',
              color: totalGP >= targetGP ? '#10B981' : '#A8A29E',
              letterSpacing: '0.05em',
            }}>
              {totalGP >= targetGP
                ? 'CLEAR!'
                : `${Math.max(0, targetGP - totalGP).toLocaleString()} to go`
              }
            </div>

            {/* Stat effect feedback */}
            {lastStatEffect && (
              <div style={{
                fontSize: 9, fontWeight: 700, color: '#A8A29E',
                marginTop: 2, textAlign: 'center',
                animation: 'rsp-gpCount 1500ms ease-out forwards',
              }}>
                {lastStatEffect}
              </div>
            )}
          </div>
        )}

        {/* Jackpot removed — Stage Chase is the core */}

        {/* GP Delta popup */}
        {showGpDelta && gpDelta > 0 && (
          <div style={{
            position: 'absolute', top: isMobile ? 4 : 8, left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
            fontSize: gpDelta > 100 ? (isMobile ? 28 : 36) : (isMobile ? 18 : 24),
            fontWeight: 900,
            color: gpDelta > 100 ? '#F6E27A' : '#D4AF37',
            fontFamily: 'monospace',
            textShadow: gpDelta > 100
              ? '0 0 20px rgba(246,226,122,0.8), 0 0 40px rgba(212,175,55,0.5)'
              : '0 0 10px rgba(212,175,55,0.5)',
            animation: gpDelta > 100
              ? 'rsp-gpCountBig 1000ms ease-out forwards'
              : 'rsp-gpCount 1000ms ease-out forwards',
            pointerEvents: 'none',
          }}>
            +{gpDelta}
          </div>
        )}

        {/* BONUS SLOT button — above the reels, appears once when grid completes */}
        {gridCompleteGrade && onBonusSlotPress && !specialMode && (() => {
          const gradeInfo: Record<string, { stars: number; label: string; color: string; bg: string; border: string; starColor: string }> = {
            S: { stars: 5, label: '大当たり確定', color: '#FDE68A', bg: 'linear-gradient(180deg, #D4AF37 0%, #B8941E 50%, #92710C 100%)', border: '#FDE68A', starColor: '#FDE68A' },
            A: { stars: 4, label: '期待大', color: '#fff', bg: 'linear-gradient(180deg, #DC2626 0%, #B91C1C 50%, #991B1B 100%)', border: '#FCA5A5', starColor: '#FCA5A5' },
            B: { stars: 3, label: 'いい感じ', color: '#fff', bg: 'linear-gradient(180deg, #2563EB 0%, #1D4ED8 50%, #1E40AF 100%)', border: '#93C5FD', starColor: '#93C5FD' },
            C: { stars: 2, label: 'ワンチャン', color: '#fff', bg: 'linear-gradient(180deg, #059669 0%, #047857 50%, #065F46 100%)', border: '#6EE7B7', starColor: '#6EE7B7' },
            D: { stars: 1, label: '祈れ', color: '#D6D3D1', bg: 'linear-gradient(180deg, #57534E 0%, #44403C 50%, #292524 100%)', border: '#78716C', starColor: '#78716C' },
          };
          const gi = gradeInfo[gridCompleteGrade] || gradeInfo.D;
          return (
            <button
              onClick={onBonusSlotPress}
              style={{
                width: '100%', padding: '14px 0', marginBottom: 8,
                background: gi.bg,
                border: `2px solid ${gi.border}`,
                borderRadius: 10,
                color: gi.color, fontSize: 14, fontWeight: 900,
                letterSpacing: '0.15em',
                cursor: 'pointer',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                boxShadow: gridCompleteGrade === 'S'
                  ? '0 0 20px rgba(212,175,55,0.5), 0 4px 12px rgba(0,0,0,0.3)'
                  : gridCompleteGrade === 'A'
                  ? '0 0 16px rgba(239,68,68,0.4), 0 4px 12px rgba(0,0,0,0.3)'
                  : '0 4px 12px rgba(0,0,0,0.2)',
                animation: gridCompleteGrade === 'S' || gridCompleteGrade === 'A'
                  ? 'golden-button-pulse 1.5s ease-in-out infinite' : 'none',
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: '0.3em', opacity: 0.7, marginBottom: 4 }}>GRID COMPLETE</div>
              {/* Stars row */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 2, marginBottom: 4 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} style={{
                    fontSize: 14,
                    color: i < gi.stars ? gi.starColor : 'rgba(255,255,255,0.15)',
                    textShadow: i < gi.stars ? `0 0 6px ${gi.starColor}80` : 'none',
                  }}>&#9733;</span>
                ))}
              </div>
              <div style={{ fontSize: 16, letterSpacing: '0.2em' }}>BONUS SLOT</div>
              <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2, letterSpacing: '0.1em' }}>{gi.label}</div>
            </button>
          );
        })()}

        {/* Reel machine or idle display */}
        {isSpinActive ? renderReelMachine() : renderIdleState()}

        {/* State bar */}
        {renderStateBar()}

        {/* ═══ LIVE COMMENTARY ═══ */}
        {shields !== null && (
          <div style={{
            width: '100%', padding: '6px 12px',
            backgroundColor: '#0A0908', borderRadius: 8,
            border: '1px solid #1C191740',
            textAlign: 'center',
          }}>
            <span style={{
              fontSize: 10, fontWeight: 700, color: '#78716C',
              letterSpacing: '0.05em',
            }}>
              {stageClear ? `STAGE ${stage} CLEAR -- 次のステージへ`
                : shieldBreakText ? `空振り! LIFE ${shields}/${maxShields}`
                : slotState === 'NORMAL' && ceilingCounter === 0 ? `STAGE ${stage} -- ${targetGP.toLocaleString()} GPを目指せ`
                : slotState === 'NORMAL' ? `G-STOPまであと${Math.max(0, ceiling - ceilingCounter)}回`
                : slotState === 'CZ' ? `G-STOP -- 残り${czSpinsLeft}回でGOD GAMEを引け`
                : slotState === 'RUSH' ? `GOD GAME -- GPを稼げ! ループ率${loopRate}%`
                : slotState === 'SPECIAL' ? `SUPER GOD GAME -- GP 1.5倍! 残り${specialSpinsLeft}回`
                : slotState === 'FEVER' ? `PREMIUM GOD GAME -- GP 3倍! 残り${feverSpinsLeft}回`
                : `STAGE ${stage} -- ${targetGP.toLocaleString()} GPを目指せ`
              }
            </span>
          </div>
        )}

        {/* Current Card BST Panel — above SESSION */}
        {lastCard && (() => {
          const bstTier = getBstTier(lastCard.bstTotal);
          const statColors = ['#10B981', '#EF4444', '#3B82F6', '#A855F7', '#F59E0B', '#EC4899'];
          const maxStat = Math.max(...lastCard.stats);
          const minStat = Math.min(...lastCard.stats);
          const maxIdx = lastCard.stats.indexOf(maxStat);
          const minIdx = lastCard.stats.lastIndexOf(minStat);
          const STAT_MAX = 120;
          const STAT_MIN_VISUAL = 0.08;
          const rcx = 75, rcy = 75, rR = 52;
          const getRadarPt = (i: number, val: number) => {
            const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
            const pct = Math.max(val / STAT_MAX, STAT_MIN_VISUAL);
            return { x: rcx + rR * pct * Math.cos(angle), y: rcy + rR * pct * Math.sin(angle) };
          };
          const radarPts = lastCard.stats.map((v, i) => getRadarPt(i, v));
          const radarPolygon = radarPts.map(p => `${p.x},${p.y}`).join(' ');

          return (
            <div style={{
              width: '100%', marginTop: 8,
              backgroundColor: '#0A0908', borderRadius: 12, padding: isMobile ? '10px 8px' : '14px 16px',
              border: `1px solid ${bstTier.color}50`,
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Ambient glow */}
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 12, pointerEvents: 'none',
                background: `radial-gradient(ellipse at 50% 30%, ${bstTier.color}12 0%, transparent 70%)`,
              }} />

              {/* Header: BST + Tier */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6,
                position: 'relative',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: '#A8A29E',
                  }}>BST</span>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4,
                    backgroundColor: `${bstTier.color}20`, color: bstTier.color,
                  }}>{bstTier.ja || bstTier.tier}</span>
                </div>
                <span style={{
                  fontSize: 18, fontWeight: 900, fontFamily: 'monospace',
                  color: bstTier.color,
                  textShadow: `0 0 10px ${bstTier.color}80, 0 0 20px ${bstTier.color}40`,
                }}>{lastCard.bstTotal}</span>
              </div>

              {/* Radar Chart */}
              <svg viewBox="0 0 150 155" style={{ width: '100%', maxWidth: isMobile ? '160px' : '190px', display: 'block', margin: '0 auto' }}>
                {/* Grid rings */}
                {[0.25, 0.5, 0.75, 1.0].map(level => {
                  const pts = Array.from({ length: 6 }, (_, i) => {
                    const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                    return `${rcx + rR * level * Math.cos(angle)},${rcy + rR * level * Math.sin(angle)}`;
                  }).join(' ');
                  return <polygon key={level} points={pts} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />;
                })}
                {/* Axis lines */}
                {Array.from({ length: 6 }, (_, i) => {
                  const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                  return <line key={i} x1={rcx} y1={rcy} x2={rcx + rR * Math.cos(angle)} y2={rcy + rR * Math.sin(angle)} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />;
                })}
                {/* Stat polygon with glow */}
                <defs>
                  <filter id="bst-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                <polygon points={radarPolygon} fill={`${bstTier.color}18`} stroke={bstTier.color} strokeWidth="1.5" filter="url(#bst-glow)" />
                {/* Stat dots */}
                {radarPts.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y}
                    r={i === maxIdx ? '4' : i === minIdx ? '2' : '3'}
                    fill={statColors[i]}
                    stroke={i === maxIdx ? '#fff' : 'rgba(0,0,0,0.3)'}
                    strokeWidth={i === maxIdx ? '1' : '0.5'}
                  />
                ))}
                {/* Labels + values */}
                {BST_STAT_NAMES_JA.map((name, i) => {
                  const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                  const lx = rcx + (rR + 16) * Math.cos(angle);
                  const ly = rcy + (rR + 16) * Math.sin(angle);
                  return (
                    <g key={i}>
                      <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
                        style={{ fontSize: '7px', fontWeight: i === maxIdx ? 900 : 700, fill: i === maxIdx ? statColors[i] : 'rgba(255,255,255,0.5)' }}>
                        {name}
                      </text>
                      <text x={lx} y={ly + 9} textAnchor="middle" dominantBaseline="middle"
                        style={{ fontSize: '7px', fontWeight: 700, fill: statColors[i], fontFamily: 'monospace' }}>
                        {lastCard.stats[i]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Stat bars below radar */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 6, position: 'relative' }}>
                {lastCard.stats.map((val, i) => {
                  const c = statColors[i];
                  const pct = (val / STAT_MAX) * 100;
                  const isMax = i === maxIdx;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10 }}>
                      <span style={{
                        width: 22, fontWeight: isMax ? 900 : 700, color: c, fontFamily: 'monospace', textAlign: 'right',
                        fontSize: 9, textShadow: isMax ? `0 0 6px ${c}80` : 'none',
                      }}>
                        {STAT_NAMES[i]}
                      </span>
                      <div style={{
                        flex: 1, height: 7, backgroundColor: '#1C1917', borderRadius: 4, overflow: 'hidden',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
                      }}>
                        <div style={{
                          height: '100%', width: `${pct}%`, borderRadius: 4,
                          background: `linear-gradient(90deg, ${c}CC 0%, ${c} 60%, ${c}DD 100%)`,
                          boxShadow: isMax ? `0 0 10px ${c}80, 0 0 20px ${c}40` : `0 0 6px ${c}40`,
                          transition: 'width 300ms ease',
                        }} />
                      </div>
                      <span style={{
                        width: 22, textAlign: 'right', fontFamily: 'monospace', fontWeight: 700,
                        color: isMax ? bstTier.color : val >= 70 ? '#E7E5E4' : '#78716C',
                        fontSize: 9,
                        textShadow: isMax ? `0 0 4px ${bstTier.color}60` : 'none',
                      }}>{val}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* SESSION stats panel */}
        <div style={{
          width: '100%', marginTop: 8,
          backgroundColor: '#0A0908', borderRadius: 12, padding: isMobile ? '10px 8px' : '14px 16px',
          border: '1px solid #292524',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.15em', marginBottom: 10 }}>
            SESSION
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {([
              { label: 'スピン数', value: totalSpins },
              { label: '最高コンボ', value: bestCombo, color: '#EF4444' },
              { label: 'G-STOP突入', value: czCount, color: '#0EA5E9' },
              { label: 'GG突入回数', value: rushCount, color: '#EF4444' },
              { label: 'SGG', value: specialCount, color: '#A855F7' },
              { label: 'PGG', value: feverCount, color: '#D4AF37' },
              { label: '最高到達', value: STATE_CONFIG[peakState].label, color: STATE_CONFIG[peakState].color },
            ] as { label: string; value: string | number; color?: string }[]).map(r => (
              <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: '#78716C' }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, fontFamily: 'monospace', color: r.color || '#E7E5E4' }}>
                  {r.value}
                </span>
              </div>
            ))}
          </div>

          {/* State history dots */}
          {stateHistory.length > 0 && (
            <div style={{ marginTop: 10, borderTop: '1px solid #292524', paddingTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#A8A29E', letterSpacing: '0.1em', marginBottom: 4 }}>履歴</div>
              <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                {stateHistory.map((s, i) => (
                  <div key={i} style={{ width: 8, height: 8, borderRadius: 2, backgroundColor: STATE_CONFIG[s].color }} />
                ))}
              </div>
            </div>
          )}
        </div>


        {/* Rules / How to play */}
        <details style={{ marginTop: 10 }}>
          <summary style={{
            fontSize: 10, fontWeight: 700, color: '#78716C', letterSpacing: '0.1em',
            cursor: 'pointer', userSelect: 'none', listStyle: 'none',
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 12 }}>?</span> RULES
          </summary>
          <div style={{
            marginTop: 6, padding: '10px 12px',
            backgroundColor: '#151311', borderRadius: 8,
            fontSize: 11, color: '#D6D3D1', lineHeight: 1.7,
          }}>
            {/* 1. ゴール */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: '#D4AF37', fontWeight: 800, fontSize: 12, marginBottom: 4, letterSpacing: '0.05em' }}>1. ゴール</div>
              <div>目標の <span style={{ color: '#D4AF37', fontWeight: 700 }}>GP</span> を貯めたら自動で次のステージへ。どこまで行けるか挑戦するゲームです。</div>
            </div>

            {/* 2. GPの貯め方 */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: '#D4AF37', fontWeight: 800, fontSize: 12, marginBottom: 4, letterSpacing: '0.05em' }}>2. GPの貯め方</div>
              <div style={{ marginBottom: 3 }}>単語カードを復習するとスロットが回り、揃った図柄に応じてGPが入ります。</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 10px', marginTop: 4 }}>
                <span><span style={{ color: '#D4AF37' }}>GOD</span> x10</span>
                <span><span style={{ color: '#EF4444' }}>BLAZE</span> x5</span>
                <span><span style={{ color: '#EAB308' }}>BOLT</span> x3</span>
                <span><span style={{ color: '#A855F7' }}>WILD</span> x3</span>
                <span><span style={{ color: '#3B82F6' }}>FROST</span> x2</span>
              </div>
            </div>

            {/* 3. モードの流れ */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: '#D4AF37', fontWeight: 800, fontSize: 12, marginBottom: 4, letterSpacing: '0.05em' }}>3. モードの流れ</div>
              <div style={{ marginBottom: 3 }}>
                <span style={{ color: '#78716C' }}>NORMAL</span>
                {' → '}
                <span style={{ color: '#0EA5E9', fontWeight: 700 }}>G-STOP</span>
                {' → '}
                <span style={{ color: '#EF4444', fontWeight: 700 }}>GOD GAME</span>
              </div>
              <div style={{ marginBottom: 3 }}><span style={{ color: '#0EA5E9', fontWeight: 700 }}>G-STOP</span> はチャンスゾーン。ここでGOD GAMEを引ければ大当たり。</div>
              <div><span style={{ color: '#EF4444', fontWeight: 700 }}>GOD GAME</span> は連チャンモード。GPがガンガン増えます。ループ率で継続。</div>
            </div>

            {/* 4. LIFE */}
            <div style={{ marginBottom: 10 }}>
              <div style={{ color: '#D4AF37', fontWeight: 800, fontSize: 12, marginBottom: 4, letterSpacing: '0.05em' }}>4. LIFE について</div>
              <div>全ハズレ(空振り)が続くと <span style={{ color: '#EF4444', fontWeight: 700 }}>LIFE</span> が減りますが、ゼロになっても全回復するだけで終わりません。安心してどんどん回してOK。</div>
            </div>

            {/* 5. カードのステータス */}
            <div>
              <div style={{ color: '#10B981', fontWeight: 800, fontSize: 12, marginBottom: 4, letterSpacing: '0.05em' }}>5. カードのステータス (BST)</div>
              <div style={{ marginBottom: 3 }}>HP = LIFE初期数 / ATK = GP倍率 / DEF = 空振り回避</div>
              <div>SPA = G-STOP突入率 / SPD = 天井短縮 / SPE = 2連スピン率</div>
            </div>
          </div>
        </details>

        {/* RESET button */}
        <div style={{ marginTop: 8, display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button
            onClick={() => {
              if (!confirm('記録をリセットしますか？\nベストステージ記録も消えます。')) return;
              setStageClear(false);
              setShields(null);
              setMaxShields(3);
              setJackpotPool(0);
              setStage(1);
              setBestStage(1);
              setTotalGP(0);
              setDisplayedGP(0);
              setTotalSpins(0);
              setCombo(0);
              setBestCombo(0);
              setCzCount(0);
              setRushCount(0);
              setSpecialCount(0);
              setFeverCount(0);
              setPeakState('NORMAL');
              setStateHistory([]);
              setSlotState('NORMAL');
              setCeilingCounter(0);
              setLoopRate(0);
              setGgSetSpinsLeft(0);
              setGgSetsRemaining(0);
              setCzSpinsLeft(0);
              setSpecialSpinsLeft(0);
              setFeverSpinsLeft(0);
              setLastCard(null);
              if (feverBGMRef.current) { stopFeverBGM(feverBGMRef.current); feverBGMRef.current = null; }
              try {
                localStorage.removeItem(LS_KEY);
                localStorage.removeItem('gg-stage');
                localStorage.removeItem('gg-best-stage');
                localStorage.removeItem('training-chain-state');
              } catch { /* */ }
              onReset?.();
            }}
            style={{
              padding: '6px 16px',
              background: 'transparent',
              border: '1px solid #44403C',
              borderRadius: 6,
              color: '#78716C', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.1em',
              cursor: 'pointer',
            }}
          >
            RESET ALL
          </button>
        </div>
      </div>

      {/* State transition overlay */}
      {transitionEffect && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'rsp-transitionFlash 1200ms ease-out forwards',
          pointerEvents: 'none',
          background: transitionEffect === 'FALL_TO_NORMAL'
            ? 'radial-gradient(ellipse at center, rgba(120,113,108,0.4) 0%, transparent 70%)'
            : `radial-gradient(ellipse at center, ${STATE_CONFIG[
                transitionEffect === 'NORMAL_TO_CZ' ? 'CZ'
                : transitionEffect === 'CZ_TO_RUSH' ? 'RUSH'
                : transitionEffect === 'RUSH_TO_SPECIAL' ? 'SPECIAL'
                : 'FEVER'
              ].color}50 0%, transparent 70%)`,
        }}>
          <div style={{
            fontSize: isMobile ? 28 : 40, fontWeight: 900,
            letterSpacing: '12px',
            color: 'white',
            textShadow: (() => {
              const tc = transitionEffect === 'FALL_TO_NORMAL' ? '#78716C'
                : STATE_CONFIG[
                    transitionEffect === 'NORMAL_TO_CZ' ? 'CZ'
                    : transitionEffect === 'CZ_TO_RUSH' ? 'RUSH'
                    : transitionEffect === 'RUSH_TO_SPECIAL' ? 'SPECIAL'
                    : 'FEVER'
                  ].color;
              return `0 0 30px ${tc}, 0 0 60px ${tc}80, 0 2px 10px rgba(0,0,0,0.5)`;
            })(),
            animation: 'rsp-transitionZoom 1200ms ease-out forwards',
          }}>
            {transitionEffect === 'NORMAL_TO_CZ' ? 'G-STOP'
              : transitionEffect === 'CZ_TO_RUSH' ? 'GOD GAME'
              : transitionEffect === 'RUSH_TO_SPECIAL' ? 'SGG'
              : transitionEffect === 'SPECIAL_TO_FEVER' ? 'PGG'
              : '\u901A\u5E38'}
          </div>
        </div>
      )}

      {/* REACH演出 overlay — pulsing tension when first 2 reels match */}
      {reachActive && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 25,
          pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Pulsing border glow */}
          <div style={{
            position: 'absolute', inset: 0,
            border: `3px solid ${reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37'}`,
            borderRadius: 16,
            animation: 'rsp-reachPulse 600ms ease-in-out infinite',
            boxShadow: `inset 0 0 40px ${reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37'}30`,
          }} />
          {/* REACH text */}
          <div style={{
            fontSize: isMobile ? 36 : 52,
            fontWeight: 900,
            color: reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37',
            letterSpacing: '0.3em',
            textShadow: `0 0 30px ${reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37'}, 0 0 60px ${reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37'}80`,
            animation: 'rsp-reachPulse 600ms ease-in-out infinite',
          }}>
            REACH
          </div>
          {/* Symbol indicator */}
          {reachSymbol && (
            <div style={{
              fontSize: isMobile ? 14 : 18,
              fontWeight: 800,
              color: SYMBOL_COLORS[reachSymbol],
              letterSpacing: '0.2em',
              marginTop: 8,
              opacity: 0.8,
            }}>
              {SYMBOL_LABELS[reachSymbol]} x 2
            </div>
          )}
          {/* Scanning line effect */}
          <div style={{
            position: 'absolute', left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37'}, transparent)`,
            animation: 'rsp-reachFlash 800ms ease-in-out infinite',
            top: '30%',
          }} />
          <div style={{
            position: 'absolute', left: 0, right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${reachSymbol ? SYMBOL_COLORS[reachSymbol] : '#D4AF37'}, transparent)`,
            animation: 'rsp-reachFlash 800ms ease-in-out infinite',
            animationDelay: '400ms',
            top: '70%',
          }} />
        </div>
      )}

      {/* Big Win celebration — full panel takeover */}
      {bigWinType && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 30,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: `radial-gradient(ellipse at center, ${SYMBOL_COLORS[bigWinType]}40 0%, rgba(0,0,0,0.9) 70%)`,
          pointerEvents: 'none',
          animation: 'rsp-screenShake 500ms ease-out',
        }}>
          {/* Flash burst */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at center, ${SYMBOL_COLORS[bigWinType]}60 0%, transparent 50%)`,
            animation: 'rsp-reachFlash 400ms ease-out',
          }} />
          {/* Symbol name */}
          <div style={{
            fontSize: isMobile ? 48 : 72,
            fontWeight: 900,
            color: SYMBOL_COLORS[bigWinType],
            letterSpacing: '0.2em',
            textShadow: `0 0 40px ${SYMBOL_COLORS[bigWinType]}, 0 0 80px ${SYMBOL_COLORS[bigWinType]}80, 0 4px 20px rgba(0,0,0,0.8)`,
            animation: 'rsp-tripleExplode 800ms ease-out',
            position: 'relative',
          }}>
            {SYMBOL_LABELS[bigWinType]}
          </div>
          <div style={{
            fontSize: isMobile ? 20 : 28,
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '0.5em',
            textShadow: `0 0 20px ${SYMBOL_COLORS[bigWinType]}`,
            marginTop: 8,
            animation: 'rsp-tripleExplode 800ms ease-out',
            animationDelay: '200ms',
            animationFillMode: 'backwards',
          }}>
            TRIPLE
          </div>
          {/* Radial particle lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 2,
              height: isMobile ? 60 : 100,
              background: `linear-gradient(180deg, ${SYMBOL_COLORS[bigWinType]} 0%, transparent 100%)`,
              top: '50%', left: '50%',
              transformOrigin: 'top center',
              transform: `rotate(${i * 45}deg)`,
              opacity: 0.4,
              animation: 'rsp-reachFlash 600ms ease-out',
              animationDelay: `${i * 50}ms`,
            }} />
          ))}
        </div>
      )}

      {/* State transition banner -- dramatic full-width announcement */}
      {transitionBanner && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 28,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '120%',
            padding: isMobile ? '16px 0' : '24px 0',
            background: (() => {
              const color = transitionBanner === 'G-STOP' ? '#0EA5E9'
                : transitionBanner === 'GOD GAME' ? '#EF4444'
                : transitionBanner === 'SUPER GOD GAME' ? '#A855F7'
                : '#D4AF37';
              return `linear-gradient(90deg, transparent 0%, ${color}CC 15%, ${color} 50%, ${color}CC 85%, transparent 100%)`;
            })(),
            textAlign: 'center',
            animation: 'rsp-transitionBanner 2500ms ease-out forwards',
            boxShadow: (() => {
              const color = transitionBanner === 'G-STOP' ? '#0EA5E9'
                : transitionBanner === 'GOD GAME' ? '#EF4444'
                : transitionBanner === 'SUPER GOD GAME' ? '#A855F7'
                : '#D4AF37';
              return `0 0 40px ${color}80, 0 0 80px ${color}40`;
            })(),
          }}>
            <div style={{
              fontSize: isMobile ? 22 : 32,
              fontWeight: 900,
              color: '#fff',
              letterSpacing: '0.3em',
              textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(255,255,255,0.3)',
            }}>
              {transitionBanner}
            </div>
            {transitionBanner !== 'G-STOP' && (
              <div style={{
                fontSize: isMobile ? 10 : 12,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.5em',
                marginTop: 4,
              }}>
                {transitionBanner === 'GOD GAME' ? '確変突入'
                  : transitionBanner === 'SUPER GOD GAME' ? '超確変突入'
                  : 'PREMIUM確変突入'}
              </div>
            )}
          </div>
        </div>
      )}

      {/* FEVER rainbow overlay */}
      {slotState === 'FEVER' && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(168,85,247,0.05) 33%, rgba(59,130,246,0.05) 66%, rgba(212,175,55,0.05) 100%)',
          backgroundSize: '300% 300%',
          animation: 'rsp-feverRainbow 6s linear infinite',
          pointerEvents: 'none',
        }} />
      )}

      {/* ═══ SHIELD BREAK OVERLAY ═══ */}
      {shieldBreak && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 40,
          pointerEvents: 'none',
        }}>
          {/* Red flash */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.5) 0%, rgba(239,68,68,0.2) 50%, transparent 80%)',
            animation: 'rsp-bigWinFlash 1200ms ease-out forwards',
          }} />
          {/* Screen shake container */}
          <div style={{
            position: 'absolute', inset: 0,
            animation: 'rsp-screenShake 600ms ease-out',
          }} />
        </div>
      )}

      {/* ═══ SHIELD BREAK TEXT ═══ */}
      {shieldBreakText && (
        <div style={{
          position: 'absolute', top: '35%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 45, textAlign: 'center', pointerEvents: 'none',
        }}>
          <div style={{
            fontSize: isMobile ? 24 : 34, fontWeight: 900,
            color: '#EF4444', letterSpacing: '0.15em',
            textShadow: '0 0 30px rgba(239,68,68,0.8), 0 0 60px rgba(239,68,68,0.4), 0 2px 4px rgba(0,0,0,0.8)',
            animation: 'rsp-tripleExplode 600ms ease-out',
          }}>
            LIFE LOST
          </div>
          {shields !== null && (
            <div style={{
              fontSize: isMobile ? 14 : 18, fontWeight: 900,
              color: 'rgba(239,68,68,0.9)', marginTop: 8,
              animation: 'rsp-tripleExplode 600ms ease-out',
              animationDelay: '150ms', animationFillMode: 'backwards',
              letterSpacing: '0.1em',
            }}>
              {shields > 0 ? `LIFE ${shields}/${maxShields}` : 'LAST LIFE GONE'}
            </div>
          )}
        </div>
      )}

      {/* ═══ STAGE CLEAR SCREEN ═══ */}
      {stageClear && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 50,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, rgba(28,25,23,0.92) 0%, rgba(10,9,8,0.98) 70%)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{
              fontSize: isMobile ? 28 : 40, fontWeight: 900,
              color: '#D4AF37', letterSpacing: '0.2em',
              textShadow: '0 0 30px rgba(212,175,55,0.6), 0 0 60px rgba(212,175,55,0.3)',
              marginBottom: 8,
              animation: 'rsp-tripleExplode 600ms ease-out',
            }}>
              STAGE CLEAR
            </div>
            <div style={{
              fontSize: isMobile ? 48 : 64, fontWeight: 900, fontFamily: 'monospace',
              color: '#FDE68A',
              textShadow: '0 0 40px rgba(212,175,55,0.8)',
              marginBottom: 16,
              animation: 'rsp-tripleExplode 600ms ease-out',
              animationDelay: '200ms', animationFillMode: 'backwards',
            }}>
              {stage}
            </div>
            <div style={{
              fontSize: 14, fontWeight: 700, color: '#A8A29E', marginBottom: 24,
            }}>
              {totalGP.toLocaleString()} GP
            </div>
            <div style={{
              fontSize: 11, fontWeight: 700, color: '#78716C', letterSpacing: '0.2em',
              marginTop: 8,
            }}>
              次のステージへ...
            </div>
          </div>
        </div>
      )}

      {/* ═══ DANGER BORDER — constant when shields = 1 ═══ */}
      {shields === 1 && !stageClear && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          border: '2px solid rgba(239,68,68,0.3)',
          borderRadius: 16,
          animation: 'rsp-dangerPulse 1.5s ease-in-out infinite',
        }} />
      )}

    </div>
  );
}
