/**
 * 英語の読み上げ(ブラウザの音声合成)
 *
 * 音声ファイルは持たない。端末の speechSynthesis を使う。
 * 対応していない端末では supported() が false を返すので、ボタンを無効にして理由を出す。
 */

export function ttsSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

let cachedVoice: SpeechSynthesisVoice | null | undefined;

function pickVoice(): SpeechSynthesisVoice | null {
    if (cachedVoice !== undefined) return cachedVoice;
    if (!ttsSupported()) return (cachedVoice = null);
    const voices = window.speechSynthesis.getVoices();
    if (!voices.length) return null; // まだ読み込まれていない。次回また探す
    const en = voices.filter(v => /^en[-_]/i.test(v.lang));
    const prefer = [
        /Google US English/i, /Samantha/i, /Microsoft (Aria|Jenny|Guy)/i, /en[-_]US/i, /en[-_]GB/i,
    ];
    for (const re of prefer) {
        const hit = en.find(v => re.test(v.name) || re.test(v.lang));
        if (hit) return (cachedVoice = hit);
    }
    return (cachedVoice = en[0] ?? null);
}

export function warmVoices(): void {
    if (!ttsSupported()) return;
    try {
        window.speechSynthesis.getVoices();
        window.speechSynthesis.addEventListener?.('voiceschanged', () => { cachedVoice = undefined; }, { once: true });
    } catch { /* noop */ }
}

export function stopSpeech(): void {
    if (!ttsSupported()) return;
    try { window.speechSynthesis.cancel(); } catch { /* noop */ }
}

export function speak(text: string, opts: { rate?: number; onStart?: () => void; onEnd?: () => void; onError?: () => void } = {}): boolean {
    if (!ttsSupported() || !text.trim()) return false;
    try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        const v = pickVoice();
        if (v) u.voice = v;
        u.lang = v?.lang ?? 'en-US';
        u.rate = opts.rate ?? 0.95;
        u.pitch = 1;
        u.onstart = () => opts.onStart?.();
        u.onend = () => opts.onEnd?.();
        u.onerror = () => { opts.onError?.(); opts.onEnd?.(); };
        window.speechSynthesis.speak(u);
        return true;
    } catch {
        opts.onError?.();
        return false;
    }
}
