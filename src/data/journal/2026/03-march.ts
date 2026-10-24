/**
 * 2026年3月のジャーナルエントリ
 */

import { JournalEntry } from '../types';
import { gameManualEntry } from './game-manual-entry';
import { vercelSurrenderEntry } from './vercel-surrender-entry';
import { convenienceStorePanicEntry } from './convenience-store-panic-entry';
import { ikasamaBlackjackEntry } from './ikasama-blackjack-entry';
import { philosophyEnglishEntry } from './philosophy-english-entry';
import { wbcJapanEntry } from './wbc-japan-entry';
import { wbcChibiCodingEntry } from './wbc-chibi-coding-entry';
import { siteExorcismEntry } from './site-exorcism-entry';
import { standfmKaraokeEntry } from './standfm-karaoke-entry';
import { sumasloCardSlotEntry } from './sumaslo-card-slot-entry';
import { wbcHeartbreakEntry } from './wbc-heartbreak-entry';

export const march2026Entries: JournalEntry[] = [
    wbcHeartbreakEntry,
    sumasloCardSlotEntry,
    standfmKaraokeEntry,
    siteExorcismEntry,
    wbcChibiCodingEntry,
    wbcJapanEntry,
    philosophyEnglishEntry,
    ikasamaBlackjackEntry,
    gameManualEntry,
    vercelSurrenderEntry,
    convenienceStorePanicEntry,
];
