/**
 * 2026年4月のジャーナルエントリ
 */

import { JournalEntry } from '../types';
import { aiGotItWrongEntry } from './ai-got-it-wrong-entry';
import { clientProfilePageEntry } from './client-profile-page-entry';
import { contestArticleMetaEntry } from './contest-article-meta-entry';
import { harvestRewriteEntry } from './harvest-rewrite-entry';
import { harvestEvolutionEntry } from './harvest-evolution-entry';
import { toniolabHomepageEntry } from './toniolab-homepage-entry';
import { timeAttackSidebarEntry } from './time-attack-sidebar-entry';

export const april2026Entries: JournalEntry[] = [
    clientProfilePageEntry,
    aiGotItWrongEntry,
    contestArticleMetaEntry,
    harvestRewriteEntry,
    harvestEvolutionEntry,
    toniolabHomepageEntry,
    timeAttackSidebarEntry,
];
