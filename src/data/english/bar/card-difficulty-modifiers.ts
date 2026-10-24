/**
 * Silent Bartender -- card difficulty modifiers.
 *
 * Small descriptors that explain WHY a card is difficult, shown in
 * accessibility-extended or educational modes. Used only for
 * content inspection, not in the main gameplay flow.
 */

export type DifficultyFactor =
    | 'literal-trap'          // one card matches literal words but wrong mood
    | 'inverse-trap'          // correct answer is the opposite of what customer seems to ask
    | 'gesture-only'          // correct card is a physical gesture, not words
    | 'silence-required'      // correct card is NOT pouring
    | 'memory-required'       // correct card relies on returning-customer memory
    | 'subtext'               // correct card responds to unstated mood, not literal line
    | 'character-test'        // correct card requires knowing a specific character
    | 'cultural-knowledge'    // correct card requires cultural/seasonal knowledge
    | 'boundary'              // correct card enforces a boundary (e.g. refusing loud drunk)
    | 'empathy';              // correct card reads emotional state correctly

export interface DifficultyProfile {
    factor: DifficultyFactor;
    explanation: string;   // JP, 1-2 lines for content reviewers
}

export const DIFFICULTY_PROFILES: DifficultyProfile[] = [
    { factor: 'literal-trap', explanation: '表面の言葉に一致するカードが罠として入っている。' },
    { factor: 'inverse-trap', explanation: '客の要求の「逆」が正解。' },
    { factor: 'gesture-only', explanation: '正解は言葉ではなく物理的な所作（ブラケット記法）。' },
    { factor: 'silence-required', explanation: '酒を注がない、ことが正解。' },
    { factor: 'memory-required', explanation: '過去に同じ客を捌いた記憶が前提。' },
    { factor: 'subtext', explanation: '客は本音を言っていない。読み取る必要がある。' },
    { factor: 'character-test', explanation: '特定キャラクター（権藤・師匠・常連）との関係性が鍵。' },
    { factor: 'cultural-knowledge', explanation: '季節・儀礼・日本文化への理解が必要。' },
    { factor: 'boundary', explanation: '客の要求を丁寧に却下することが正解。' },
    { factor: 'empathy', explanation: '感情の微細な読みが必要。' },
];

export function explainFactor(f: DifficultyFactor): string {
    return DIFFICULTY_PROFILES.find(p => p.factor === f)?.explanation ?? '';
}
