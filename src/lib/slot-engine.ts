// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SLOT ENGINE -- shared types, constants, and functions
// Extracted from ReviewSlotPanel.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import type { Element } from '@/data/english/elements';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TYPES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface CardData {
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

export type CardRank = 'LEGENDARY' | 'HOLOGRAPHIC' | 'GOLD' | 'SILVER' | 'BRONZE' | 'NORMAL';
export type SlotState = 'NORMAL' | 'CZ' | 'RUSH' | 'SPECIAL' | 'FEVER';
export type GodSymbol = 'GOD' | 'RED7' | 'YELLOW7' | 'BLUE7' | 'V_SYMBOL' | 'BLANK';

export interface TraitInfo {
  name: string;
  nameJa: string;
  category: string;
  description: string;
}

export type TransitionType =
  | 'NORMAL_TO_CZ'
  | 'CZ_TO_RUSH'
  | 'RUSH_TO_SPECIAL'
  | 'SPECIAL_TO_FEVER'
  | 'FALL_TO_NORMAL';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONSTANTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const RANK_THRESHOLDS: { rank: CardRank; min: number }[] = [
  { rank: 'LEGENDARY', min: 250 },
  { rank: 'HOLOGRAPHIC', min: 100 },
  { rank: 'GOLD', min: 50 },
  { rank: 'SILVER', min: 20 },
  { rank: 'BRONZE', min: 5 },
  { rank: 'NORMAL', min: 0 },
];

export const RANK_LABELS: Record<CardRank, string> = {
  LEGENDARY: 'LEGENDARY',
  HOLOGRAPHIC: 'HOLO',
  GOLD: 'GOLD',
  SILVER: 'SILVER',
  BRONZE: 'BRONZE',
  NORMAL: 'NORMAL',
};

export const STATE_ORDER: SlotState[] = ['NORMAL', 'CZ', 'RUSH', 'SPECIAL', 'FEVER'];

export const STATE_CONFIG: Record<
  SlotState,
  { label: string; color: string }
> = {
  NORMAL: { label: '\u901A\u5E38', color: '#78716C' },
  CZ: { label: 'G-STOP', color: '#0EA5E9' },
  RUSH: { label: 'GOD GAME', color: '#EF4444' },
  SPECIAL: { label: 'SGG', color: '#A855F7' },
  FEVER: { label: 'PGG', color: '#D4AF37' },
};

export const SYMBOL_COLORS: Record<GodSymbol, string> = {
  GOD: '#D4AF37', RED7: '#EF4444', YELLOW7: '#F59E0B',
  BLUE7: '#3B82F6', V_SYMBOL: '#10B981', BLANK: '#57534E',
};

export const SYMBOL_LABELS: Record<GodSymbol, string> = {
  GOD: 'GOD', RED7: '\u8D647', YELLOW7: '\u9EC47', BLUE7: '\u97527', V_SYMBOL: 'V', BLANK: '-',
};

export const ALL_SYMBOLS: GodSymbol[] = ['GOD', 'RED7', 'YELLOW7', 'BLUE7', 'V_SYMBOL', 'BLANK'];

export const STAT_NAMES = ['HP', 'ATK', 'DEF', 'SPA', 'SPD', 'SPE'] as const;

export const REEL_STOP_DELAYS = [800, 1400, 2000];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// TRAIT SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface TraitDef { name: string; nameJa: string; }

export const TRAIT_DEFS: Record<string, TraitDef[]> = {
  ATK: [
    { name: 'Glass Cannon', nameJa: '\u30B0\u30E9\u30B9\u30AD\u30E3\u30CE\u30F3' },
    { name: 'Berserker', nameJa: '\u30D0\u30FC\u30B5\u30FC\u30AB\u30FC' },
    { name: 'Finisher', nameJa: '\u30D5\u30A3\u30CB\u30C3\u30B7\u30E3\u30FC' },
  ],
  DEF: [
    { name: 'Iron Wall', nameJa: '\u9244\u58C1' },
    { name: 'Last Stand', nameJa: '\u30E9\u30B9\u30C8\u30B9\u30BF\u30F3\u30C9' },
    { name: 'Counter', nameJa: '\u30AB\u30A6\u30F3\u30BF\u30FC' },
  ],
  SPA: [
    { name: 'Lucky Star', nameJa: '\u30E9\u30C3\u30AD\u30FC\u30B9\u30BF\u30FC' },
    { name: 'Oracle', nameJa: '\u4E88\u8A00\u8005' },
    { name: 'Catalyst', nameJa: '\u89E6\u5A92' },
  ],
  SPD: [
    { name: 'Tenacity', nameJa: '\u7C98\u308A' },
    { name: 'Momentum', nameJa: '\u52E2\u3044' },
    { name: 'Zen', nameJa: '\u7985' },
  ],
  SPE: [
    { name: 'Double Tap', nameJa: '\u9023\u6253' },
    { name: 'Lightning', nameJa: '\u7A32\u59BB' },
    { name: 'Quick Start', nameJa: '\u30AF\u30A4\u30C3\u30AF\u30B9\u30BF\u30FC\u30C8' },
  ],
  HP: [
    { name: 'Marathon', nameJa: '\u30DE\u30E9\u30BD\u30F3' },
    { name: 'Second Wind', nameJa: '\u5FA9\u6D3B' },
    { name: 'Regenerator', nameJa: '\u518D\u751F' },
  ],
  BALANCED: [
    { name: 'Allrounder', nameJa: '\u4E07\u80FD' },
    { name: 'Chameleon', nameJa: '\u30AB\u30E1\u30EC\u30AA\u30F3' },
    { name: 'Harmonizer', nameJa: '\u8ABF\u548C' },
  ],
};

export const TRAIT_DESCRIPTIONS: Record<string, string> = {
  'Glass Cannon': 'GP x1.5 / DEF\u52B9\u679C\u7121\u52B9',
  Berserker: '\u30B3\u30F3\u30DC\u6BCE\u306BGP +5%',
  Finisher: '\u30B3\u30F3\u30DC10\u8D85\u3067GP x2',
  'Iron Wall': '\u8EE2\u843D\u8010\u6027+30% / GP x0.8',
  'Last Stand': '\u30BB\u30C3\u30B7\u30E7\u30F3\u521D\u56DE\u306E\u8EE2\u843D\u3092\u81EA\u52D5\u56DE\u907F',
  Counter: '\u8EE2\u843D\u56DE\u907F\u6642\u3001\u6B21\u30B9\u30D4\u30F3GP x3',
  'Lucky Star': 'CZ\u7A81\u5165\u7387 x2',
  Oracle: '\u5929\u4E95 -20',
  Catalyst: 'CZ\u30B9\u30D4\u30F3\u6570 10->7',
  Tenacity: 'RUSH\u8EE2\u843D\u7387 \u534A\u6E1B',
  Momentum: '\u30B3\u30F3\u30DC15\u8D85\u3067\u8EE2\u843D\u7387 0',
  Zen: 'RUSH\u4FDD\u8A3C\u30B9\u30D4\u30F3 +5',
  'Double Tap': '25%\u30672\u56DE\u30B9\u30D4\u30F3',
  Lightning: '\u7279\u5316\u30BE\u30FC\u30F3\u7A81\u5165\u7387 x3',
  'Quick Start': '\u5404\u30E2\u30FC\u30C9\u6700\u521D\u306E5\u30B9\u30D4\u30F3 GP x2',
  Marathon: '\u6700\u5927\u30B9\u30BF\u30DF\u30CA +50%',
  'Second Wind': '\u30B9\u30BF\u30DF\u30CA30%\u4EE5\u4E0B\u3067\u5168\u30B9\u30C6+20%',
  Regenerator: '10\u30B9\u30D4\u30F3\u6BCE\u306B\u30B9\u30BF\u30DF\u30CA +5',
  Allrounder: '\u5168\u52B9\u679C +15%',
  Chameleon: '\u524D\u30AB\u30FC\u30C9\u306E\u7279\u6027\u3092\u5F15\u304D\u7D99\u3050',
  Harmonizer: '\u6B21\u30AB\u30FC\u30C9\u306E\u7279\u6027\u52B9\u679C x2',
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getCardRank(points: number): CardRank {
  for (const { rank, min } of RANK_THRESHOLDS) {
    if (points >= min) return rank;
  }
  return 'NORMAL';
}

export function getCardTrait(stats: number[], cardId: string): TraitInfo {
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
// CARD VISUAL HELPERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function getCardFrame(rank: CardRank): { border: string; borderRadius: string; background: string; backgroundColor: string } {
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

export function getCardShadow(rank: CardRank): string {
  switch (rank) {
    case 'NORMAL': return '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)';
    case 'BRONZE': return '0 6px 16px rgba(205,127,50,0.15), 0 2px 6px rgba(205,127,50,0.1)';
    case 'SILVER': return '0 6px 20px rgba(148,163,184,0.25), 0 2px 8px rgba(148,163,184,0.15)';
    case 'GOLD': return '0 8px 24px rgba(212,175,55,0.35), 0 4px 12px rgba(246,200,95,0.25)';
    case 'HOLOGRAPHIC': return '0 8px 30px rgba(168,85,247,0.3), 0 4px 16px rgba(99,102,241,0.25)';
    case 'LEGENDARY': return '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4), 0 0 30px rgba(168,85,247,0.3)';
  }
}

export function getCardWindowBg(rank: CardRank): string {
  switch (rank) {
    case 'NORMAL': return '#F5F5F4';
    case 'BRONZE': return 'linear-gradient(180deg, #FDF8F0, #FAF0E4)';
    case 'SILVER': return 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)';
    case 'GOLD': return 'radial-gradient(ellipse at top, #FFFBEB, #FFF3CC 100%)';
    case 'HOLOGRAPHIC': return 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,232,255,0.8))';
    case 'LEGENDARY': return 'radial-gradient(circle at center, #2D2438 0%, #181A1B 100%)';
  }
}

export function getFrameAccent(rank: CardRank): string {
  switch (rank) {
    case 'NORMAL': return '#E7E5E4';
    case 'BRONZE': return '#CD7F32';
    case 'SILVER': return '#94A3B8';
    case 'GOLD': return '#D4AF37';
    case 'HOLOGRAPHIC': return '#A855F7';
    case 'LEGENDARY': return '#D4AF37';
  }
}

export function getRankBorderColor(rank: CardRank): string {
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
// SLOT ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function calcGP(
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

export function calcCeiling(card: CardData | null): number {
  let ceiling = 50;
  if (card) {
    const [, , , spa] = card.stats;
    ceiling = Math.max(30, 80 - Math.floor(spa / 5));
    if (card.trait.name === 'Oracle') ceiling = Math.max(20, ceiling - 20);
  }
  return ceiling;
}

export function rollCZTrigger(card: CardData): boolean {
  const [, , , spa] = card.stats;
  let rate = 0.03 + spa * 0.0005;
  if (card.trait.name === 'Lucky Star') rate *= 2;
  if (card.trait.name === 'Allrounder') rate *= 1.15;
  return Math.random() < rate;
}

export function rollRushPromotion(card: CardData): boolean {
  const [, atk] = card.stats;
  let rate = 0.15 + atk * 0.0015;
  if (card.trait.name === 'Allrounder') rate *= 1.15;
  return Math.random() < rate;
}

export function rollRushFall(card: CardData, combo: number): boolean {
  const [, , , , spd] = card.stats;
  let fallRate = Math.max(0.05, 0.18 - spd * 0.0008);
  if (card.trait.name === 'Tenacity') fallRate /= 2;
  if (card.trait.name === 'Momentum' && combo > 15) fallRate = 0;
  if (card.trait.name === 'Allrounder') fallRate *= 0.85;
  return Math.random() < fallRate;
}

export function rollFallSurvival(card: CardData, lastStandUsed: boolean): boolean {
  const [, , def] = card.stats;
  if (card.trait.name === 'Last Stand' && !lastStandUsed) return true;
  let rate = def * 0.003;
  if (card.trait.name === 'Iron Wall') rate += 0.3;
  if (card.trait.name === 'Glass Cannon') rate = 0;
  if (card.trait.name === 'Allrounder') rate *= 1.15;
  return Math.random() < rate;
}

export function rollReelSymbols(state: SlotState): { symbols: GodSymbol[]; triple: GodSymbol | null } {
  const r = Math.random();

  if (state === 'CZ') {
    if (r < 0.01) return { symbols: ['GOD', 'GOD', 'GOD'], triple: 'GOD' };
    if (r < 0.06) return { symbols: ['RED7', 'RED7', 'RED7'], triple: 'RED7' };
    if (r < 0.10) return { symbols: ['YELLOW7', 'YELLOW7', 'YELLOW7'], triple: 'YELLOW7' };
    if (r < 0.15) return { symbols: ['BLUE7', 'BLUE7', 'BLUE7'], triple: 'BLUE7' };
    if (r < 0.30) return { symbols: ['V_SYMBOL', 'V_SYMBOL', 'V_SYMBOL'], triple: 'V_SYMBOL' };
  } else if (state === 'RUSH' || state === 'SPECIAL' || state === 'FEVER') {
    if (r < 0.015) return { symbols: ['GOD', 'GOD', 'GOD'], triple: 'GOD' };
    if (r < 0.065) return { symbols: ['RED7', 'RED7', 'RED7'], triple: 'RED7' };
    if (r < 0.105) return { symbols: ['YELLOW7', 'YELLOW7', 'YELLOW7'], triple: 'YELLOW7' };
    if (r < 0.155) return { symbols: ['BLUE7', 'BLUE7', 'BLUE7'], triple: 'BLUE7' };
  } else {
    if (r < 0.01) return { symbols: ['GOD', 'GOD', 'GOD'], triple: 'GOD' };
    if (r < 0.06) return { symbols: ['RED7', 'RED7', 'RED7'], triple: 'RED7' };
    if (r < 0.09) return { symbols: ['YELLOW7', 'YELLOW7', 'YELLOW7'], triple: 'YELLOW7' };
    if (r < 0.13) return { symbols: ['BLUE7', 'BLUE7', 'BLUE7'], triple: 'BLUE7' };
  }

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
  if (symbols[0] === symbols[1] && symbols[1] === symbols[2] && symbols[0] !== 'BLANK') {
    symbols[2] = 'BLANK';
  }
  return { symbols, triple: null };
}

export function assignLoopRate(trigger: 'ceiling' | 'blue7' | 'yellow7' | 'red7' | 'god' | 'v_symbol'): number {
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
