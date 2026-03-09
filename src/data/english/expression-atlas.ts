/**
 * Expression Atlas -- unified categorized expression database
 * Imports from all scenario expression files + category mappings
 * No data duplication: original files are source of truth
 * Categories by conversational FUNCTION, intensity 1-3
 */

import { PARTY_EXPRESSIONS } from './party-expressions';
import { MONSTER_EXPRESSIONS } from './monster-expressions';
import { MARINERS_EXPRESSIONS } from './mariners-trade-expressions';
import { MOVIE_EXPRESSIONS } from './movie-expressions';
import { GAME_NIGHT_EXPRESSIONS } from './game-night-expressions';
import { ANTIQUES_EXPRESSIONS } from './antiques-expressions';
import { CATEGORY_MAP_1 } from './expression-categories-1';
import { CATEGORY_MAP_2 } from './expression-categories-2';

export type ExpressionCategory =
    | 'react'
    | 'agree'
    | 'pushback'
    | 'hedge'
    | 'emotion'
    | 'social'
    | 'shade'
    | 'hype'
    | 'practical'
    | 'filler';

export const CATEGORY_META: Record<ExpressionCategory, { label: string; labelEn: string; desc: string; color: string }> = {
    react:     { label: 'リアクション', labelEn: 'React',     desc: '驚き・衝撃・信じられない', color: '#EF4444' },
    agree:     { label: '同意',         labelEn: 'Agree',     desc: '賛成・共感・応援',         color: '#10B981' },
    pushback:  { label: '反論',         labelEn: 'Push Back', desc: '反対・否定・突っ込み',     color: '#F59E0B' },
    hedge:     { label: '前置き',       labelEn: 'Hedge',     desc: '意見の前のクッション',     color: '#8B5CF6' },
    emotion:   { label: '感情',         labelEn: 'Emotion',   desc: '気持ち・本音・弱さ',       color: '#EC4899' },
    social:    { label: '社交',         labelEn: 'Social',    desc: '会話の交通整理',           color: '#06B6D4' },
    shade:     { label: '皮肉',         labelEn: 'Shade',     desc: 'イジり・毒・ドライユーモア', color: '#78716C' },
    hype:      { label: '盛り上げ',     labelEn: 'Hype',      desc: 'テンション上げ・称賛',     color: '#F97316' },
    practical: { label: '実用',         labelEn: 'Practical', desc: '仕切り・段取り・実務',     color: '#2563EB' },
    filler:    { label: 'つなぎ',       labelEn: 'Filler',    desc: '間つなぎ・接続・時間稼ぎ', color: '#A3A3A3' },
};

export interface AtlasExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    example: string;
    speaker: string;
    scenario: string;
    scenarioLabel: string;
    day: number;
    category: ExpressionCategory;
    intensity: 1 | 2 | 3;
}

const CATEGORY_MAP: Record<string, { cat: string; int: 1 | 2 | 3 }> = {
    ...CATEGORY_MAP_1,
    ...CATEGORY_MAP_2,
};

interface RawExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    example: string;
    speaker: string;
    day: number;
}

const SCENARIO_SOURCES: { key: string; label: string; expressions: RawExpression[] }[] = [
    { key: 'party',    label: 'College Party',              expressions: PARTY_EXPRESSIONS as RawExpression[] },
    { key: 'monster',  label: 'Monster Under the Bed',      expressions: MONSTER_EXPRESSIONS as RawExpression[] },
    { key: 'mariners', label: 'Mariners Trade Talk',         expressions: MARINERS_EXPRESSIONS as RawExpression[] },
    { key: 'movie',    label: 'First Movie Without Parents', expressions: MOVIE_EXPRESSIONS as RawExpression[] },
    { key: 'gamenight', label: 'Game Night Gone Wrong',     expressions: GAME_NIGHT_EXPRESSIONS as RawExpression[] },
    { key: 'antiques', label: 'Antiques House Call',         expressions: ANTIQUES_EXPRESSIONS as RawExpression[] },
];

function buildAtlas(): AtlasExpression[] {
    const result: AtlasExpression[] = [];
    for (const src of SCENARIO_SOURCES) {
        for (const expr of src.expressions) {
            const mapping = CATEGORY_MAP[expr.expression];
            const cat = (mapping?.cat || 'filler') as ExpressionCategory;
            const intensity = mapping?.int || 1;
            result.push({
                expression: expr.expression,
                meaning: expr.meaning,
                meaningEn: expr.meaningEn,
                example: expr.example,
                speaker: expr.speaker,
                scenario: src.key,
                scenarioLabel: src.label,
                day: expr.day,
                category: cat,
                intensity,
            });
        }
    }
    result.sort((a, b) => {
        const catOrder = Object.keys(CATEGORY_META);
        const catDiff = catOrder.indexOf(a.category) - catOrder.indexOf(b.category);
        if (catDiff !== 0) return catDiff;
        const intDiff = a.intensity - b.intensity;
        if (intDiff !== 0) return intDiff;
        return a.expression.localeCompare(b.expression);
    });
    return result;
}

export const ATLAS_EXPRESSIONS = buildAtlas();

export function getByCategory(cat: ExpressionCategory): AtlasExpression[] {
    return ATLAS_EXPRESSIONS.filter(e => e.category === cat);
}

export function expressionExists(expr: string): boolean {
    return ATLAS_EXPRESSIONS.some(e => e.expression.toLowerCase() === expr.toLowerCase());
}

export function getCategoryStats(): Record<ExpressionCategory, number> {
    const stats = {} as Record<ExpressionCategory, number>;
    for (const cat of Object.keys(CATEGORY_META) as ExpressionCategory[]) {
        stats[cat] = ATLAS_EXPRESSIONS.filter(e => e.category === cat).length;
    }
    return stats;
}
