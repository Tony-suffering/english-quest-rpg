/**
 * Silent Bartender -- customer farewells.
 *
 * The way customers leave. One-line phrases they might say as they
 * go, to which the bartender (by rule) does not respond. Grouped
 * by emotional register.
 */

export interface Farewell {
    id: string;
    text: string;
    tone: 'warm' | 'neutral' | 'cold' | 'grateful' | 'silent';
}

export const FAREWELLS: Farewell[] = [
    // Warm
    { id: 'fw-warm-01', text: 'また来るよ。', tone: 'warm' },
    { id: 'fw-warm-02', text: '今夜はありがとう。', tone: 'warm' },
    { id: 'fw-warm-03', text: 'じゃ、お疲れさま。', tone: 'warm' },
    { id: 'fw-warm-04', text: '気をつけて帰ります。', tone: 'warm' },
    { id: 'fw-warm-05', text: 'お先にどうぞ、ってお前が先か。', tone: 'warm' },

    // Neutral
    { id: 'fw-neutral-01', text: 'お勘定お願いします。', tone: 'neutral' },
    { id: 'fw-neutral-02', text: 'ごちそうさま。', tone: 'neutral' },
    { id: 'fw-neutral-03', text: 'また。', tone: 'neutral' },
    { id: 'fw-neutral-04', text: '失礼します。', tone: 'neutral' },

    // Cold
    { id: 'fw-cold-01', text: '...じゃ。', tone: 'cold' },
    { id: 'fw-cold-02', text: '次は別の店にするよ。', tone: 'cold' },
    { id: 'fw-cold-03', text: '...(無言で席を立つ)', tone: 'cold' },

    // Grateful
    { id: 'fw-grateful-01', text: '助かった。本当に。', tone: 'grateful' },
    { id: 'fw-grateful-02', text: '今日一日、これが一番良かった。', tone: 'grateful' },
    { id: 'fw-grateful-03', text: 'お前に聞いてもらえて良かった。', tone: 'grateful' },

    // Silent
    { id: 'fw-silent-01', text: '(小さく頷いて、暖簾をくぐる)', tone: 'silent' },
    { id: 'fw-silent-02', text: '(カウンターに小さな硬貨を一枚残して、無言で退店)', tone: 'silent' },
    { id: 'fw-silent-03', text: '(深く一礼してから、扉を開ける)', tone: 'silent' },
];

export function pickFarewell(tone?: Farewell['tone']): Farewell {
    const pool = tone ? FAREWELLS.filter(f => f.tone === tone) : FAREWELLS;
    return pool[Math.floor(Math.random() * pool.length)];
}
