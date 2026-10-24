/**
 * 英語魂 TrainingClient の「語録310商品」「Life」モード用アダプターの空実装。
 *
 * 生徒ページでは /product/ や /english/life/training のモードは使わないので、
 * 元の goroku-phrase-adapter / life-phrase-adapter(作者のデータに依存)は持ち込まず、
 * 同じ名前の関数だけを用意して何もしない。
 */

type AnyPhrase = { id: string; english: string; japanese: string; category: string; date: string };

export const GOROKU_CATEGORIES: Record<string, { label: string; color: string; bg: string }> = {};
export const LIFE_CATEGORIES: Record<string, { label: string; color: string; bg: string }> = {};

export function gorokuToTrainingPhrases(): AnyPhrase[] { return []; }
export function loadProductMasteryAsTraining(): Record<string, number> { return {}; }
export function syncTrainingToProduct(_mastery: Record<string, number>): void { /* noop */ }

export function lifeToTrainingPhrases(): AnyPhrase[] { return []; }
export function loadLifeMasteryAsTraining(): Record<string, number> { return {}; }
export function saveLifeTrainingMastery(_mastery: Record<string, number>): void { /* noop */ }
export function syncLifeTrainingToLifePage(_mastery: Record<string, number>): void { /* noop */ }
