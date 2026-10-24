// CINEPASS: 映画理解教材のチャンクデータ集約
// Stage A (Day 1-10) = 会話の骨格 / Stage B (Day 11-20) = 動詞チャンク / Stage C (Day 21-30) = 場面別
import { CINEPASS_CHUNKS_1 } from './cinepass-chunks-1';
import { CINEPASS_CHUNKS_2 } from './cinepass-chunks-2';
import { CINEPASS_CHUNKS_3 } from './cinepass-chunks-3';

export interface CinepassChunk {
    id: string;
    day: number; // 1-30
    en: string;
    jp: string;
    ex: string;   // 自作の映画風例文
    exJp: string;
    note?: string;
}

export interface CinepassStage {
    key: 'A' | 'B' | 'C';
    title: string;
    subtitle: string;
    days: [number, number];
    description: string;
}

export const CINEPASS_STAGES: CinepassStage[] = [
    {
        key: 'A',
        title: '会話の骨格',
        subtitle: 'Discourse Chunks',
        days: [1, 10],
        description: '話し言葉の約6割は定型表現でできている。まず「切り出し・リアクション・つなぎ」という会話の骨組みを塊で入れる。ここが聞こえると、セリフの構造が見え始める。',
    },
    {
        key: 'B',
        title: '動詞チャンク',
        subtitle: 'Verb Chunks',
        days: [11, 20],
        description: '映画の動きは figure out / end up / make it のような動詞の塊で語られる。単語でなく塊で処理できると、返しの速度が変わる。',
    },
    {
        key: 'C',
        title: '場面別チャンク',
        subtitle: 'Scene Chunks',
        days: [21, 30],
        description: '口論、慰め、恋愛、緊急事態、交渉。映画の典型シーンには専用の言い回しがある。シーンごとに塊で入れて、物語の山場を字幕なしで取る。',
    },
];

export const CINEPASS_DAY_THEMES: Record<number, string> = {
    1: '切り出し・話題転換',
    2: 'リアクション・驚き',
    3: '同意・共感',
    4: '反対・疑い',
    5: 'ぼかし・ためらい',
    6: '質問の型',
    7: '頻度・時間',
    8: '量・程度',
    9: 'つなぎ・論理',
    10: '会話の終わらせ方',
    11: '超頻出句動詞 I',
    12: '超頻出句動詞 II',
    13: 'get のチャンク',
    14: 'make / take のチャンク',
    15: '移動・行動開始',
    16: '依頼・提案',
    17: '約束・意志',
    18: '中止・回避・失敗',
    19: '状態変化・成り行き',
    20: 'keep / hold / let',
    21: '口論・威嚇',
    22: '慰め・励まし',
    23: '謝罪・和解',
    24: '恋愛・好意',
    25: '別れ・去り際',
    26: '緊急事態・アクション',
    27: '皮肉・軽口',
    28: '交渉・取引',
    29: '秘密・嘘・信頼',
    30: '決意・覚悟',
};

export const CINEPASS_CHUNKS: CinepassChunk[] = [
    ...CINEPASS_CHUNKS_1,
    ...CINEPASS_CHUNKS_2,
    ...CINEPASS_CHUNKS_3,
];

export function chunksForDay(day: number): CinepassChunk[] {
    return CINEPASS_CHUNKS.filter(c => c.day === day);
}

export function stageForDay(day: number): CinepassStage {
    return CINEPASS_STAGES.find(s => day >= s.days[0] && day <= s.days[1]) ?? CINEPASS_STAGES[0];
}
