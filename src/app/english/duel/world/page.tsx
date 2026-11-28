'use client';

/**
 * WORD DUEL の導入に使う中庭(3D)。声をたよりに、最初の言葉を3つ取り戻す。
 * 中身は DuelWorld.tsx。単語パックを渡し、3つで先へ進む。
 */

import DuelWorld from './DuelWorld';
import PACK from '@/data/english/duel-words-toeic.json';
import type { WordPack } from '@/lib/duel';

export default function WordDuelWorldPage() {
    return <DuelWorld pack={PACK as unknown as WordPack} goal={3} exitHref="/english/duel" />;
}
