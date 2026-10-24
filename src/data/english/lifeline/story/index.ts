/**
 * THE STORY — 集約
 *
 * 学習者が読むのはここだけ。台帳(patterns / bank)は検算用の仕様書。
 * 章が増えるたびに scripts/story-coverage.mjs を回して、まだ物語に出ていない型を洗う。
 */

import type { Chapter } from './types';
import { chapterWordCount, chapterText } from './types';
import { CH01 } from './ch01-first-week';

export type { Chapter };
export { chapterWordCount, chapterText };

export const CHAPTERS: Chapter[] = [CH01];

/** 目標語数。ハリーポッター1巻(約7.7万語)を単位にすると分かりやすい */
export const WORD_GOAL = 300_000;

export interface StoryProgress {
    chapters: number;
    words: number;
    goal: number;
    pct: number;
    /** 物語が触れた窓口 */
    stationsCovered: string[];
}

export function storyProgress(): StoryProgress {
    const words = CHAPTERS.reduce((n, c) => n + chapterWordCount(c), 0);
    return {
        chapters: CHAPTERS.length,
        words,
        goal: WORD_GOAL,
        pct: Math.round((words / WORD_GOAL) * 1000) / 10,
        stationsCovered: [...new Set(CHAPTERS.map(c => c.station))],
    };
}

/** 全章の英語を1本に。被覆検査機が食うのはこれ */
export function allStoryText(): string {
    return CHAPTERS.map(chapterText).join('\n');
}
