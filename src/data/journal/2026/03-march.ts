/**
 * 2026年3月のジャーナルエントリ
 */

import { JournalEntry } from '../types';
import { gameManualEntry } from './game-manual-entry';
import { vercelSurrenderEntry } from './vercel-surrender-entry';
import { convenienceStorePanicEntry } from './convenience-store-panic-entry';
import { ikasamaBlackjackEntry } from './ikasama-blackjack-entry';
import { philosophyEnglishEntry } from './philosophy-english-entry';
import { siteExorcismEntry } from './site-exorcism-entry';

export const march2026Entries: JournalEntry[] = [
    siteExorcismEntry,
    philosophyEnglishEntry,
    ikasamaBlackjackEntry,
    gameManualEntry,
    vercelSurrenderEntry,
    convenienceStorePanicEntry,
];
