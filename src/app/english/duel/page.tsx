'use client';

/**
 * WORD DUEL: 1枚が1語のカード対戦(試作の20語)。
 * 中身は src/data/english/duel-words-toeic.json に同梱。通信しない(/api を呼ばない)ので、端末だけで動く。
 * 絵と声は public/duel。作るのは scripts/duel-word-generate.mjs(鍵と sharp が要る)。
 */

import DuelGame from './DuelGame';
import PACK from '@/data/english/duel-words-toeic.json';
import type { WordPack } from '@/lib/duel';

export default function WordDuelPage() {
    return <DuelGame pack={PACK as unknown as WordPack} />;
}
