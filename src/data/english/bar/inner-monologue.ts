/**
 * Silent Bartender -- inner monologue.
 *
 * Rare, brief thoughts the apprentice has during the night.
 * Not words they say — words they think. Shown as italic amber-dim
 * text in the status strip very occasionally.
 */

export interface InnerThought {
    id: string;
    text: string;   // JP, very brief
    after?: 'served' | 'failed' | 'bust' | 'any';
}

export const INNER_MONOLOGUE: InnerThought[] = [
    // After serving
    { id: 'monologue-served-01', text: '...うまくいった。声は出さなかった。', after: 'served' },
    { id: 'monologue-served-02', text: '...権藤なら何か言うかもしれない。俺は何も言わない。', after: 'served' },
    { id: 'monologue-served-03', text: '...この一杯で、誰かが少し楽になった。', after: 'served' },
    { id: 'monologue-served-04', text: '...暖簾の向こうの街に、今の一杯が混ざっていく。', after: 'served' },

    // After failing
    { id: 'monologue-failed-01', text: '...違った。次は違うことを試そう。', after: 'failed' },
    { id: 'monologue-failed-02', text: '...読めたはずなのに。悔しい。', after: 'failed' },
    { id: 'monologue-failed-03', text: '...客は黙って帰った。その背中を覚えておく。', after: 'failed' },

    // After bust
    { id: 'monologue-bust-01', text: '...声を出してしまった。権藤の幽霊が見える気がする。', after: 'bust' },
    { id: 'monologue-bust-02', text: '...一言が、夜を壊した。', after: 'bust' },

    // Any moment
    { id: 'monologue-any-01', text: '...カウンターの向こうは、世界だ。', after: 'any' },
    { id: 'monologue-any-02', text: '...権藤は、この沈黙を20年守ったのか。', after: 'any' },
    { id: 'monologue-any-03', text: '...あの暖簾、次に触るのは誰だろう。', after: 'any' },
    { id: 'monologue-any-04', text: '...夜は、昼より正直だ。', after: 'any' },
];

export function pickThought(after: 'served' | 'failed' | 'bust' | 'any' = 'any'): InnerThought {
    const pool = INNER_MONOLOGUE.filter(t => !t.after || t.after === after || t.after === 'any');
    return pool[Math.floor(Math.random() * pool.length)];
}
