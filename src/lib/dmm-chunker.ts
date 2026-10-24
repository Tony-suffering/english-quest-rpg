// Split English text into sentences, then group into chunks of ~N sentences.
// Used by /english/training/dmm/[id] to make long monologues practice-sized.

export function splitSentences(text: string): string[] {
    if (!text || !text.trim()) return [];
    // Capture each run of non-terminator chars followed by terminator(s) (or end).
    // Treats consecutive .!? as a single terminator group (so "..." stays attached
    // to the preceding sentence rather than creating empty fragments).
    const matches = text.match(/[^.!?]+(?:[.!?]+|$)/g) || [];
    return matches.map(s => s.trim()).filter(Boolean);
}

export function chunkSentences(text: string, sentencesPerChunk: number = 3): string[] {
    const sentences = splitSentences(text);
    if (sentences.length === 0) return [];
    const chunks: string[] = [];
    for (let i = 0; i < sentences.length; i += sentencesPerChunk) {
        chunks.push(sentences.slice(i, i + sentencesPerChunk).join(' '));
    }
    return chunks;
}
