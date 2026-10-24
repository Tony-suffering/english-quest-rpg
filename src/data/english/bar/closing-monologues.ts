/**
 * Closing monologues spoken by Gondo at the end of select nights.
 * Not directed at the apprentice, but overheard while wiping the counter.
 * Curt, literary, working-class Tokyo register. Never preachy, never romantic.
 * Unlock cadence widens with nights logged; picker returns null if none unlocked.
 */

export interface ClosingMonologue {
    id: string;
    body: string;
    mood: 'reflective' | 'tired' | 'amused' | 'bitter' | 'grateful' | 'cryptic';
    unlockAfterNights: number;
}

export const CLOSING_MONOLOGUES: ClosingMonologue[] = [
    {
        id: 'close-quiet-night',
        body: '静かな夜だった。\nそれ以上のことを、俺は言わない。',
        mood: 'reflective',
        unlockAfterNights: 5,
    },
    {
        id: 'close-hands-moving',
        body: 'お前、今日は一度も手を止めなかったな。\n明日も来い。',
        mood: 'grateful',
        unlockAfterNights: 10,
    },
    {
        id: 'close-customer-defined',
        body: '客ってのは、来るから客じゃない。\n帰るまでが客だ。',
        mood: 'reflective',
        unlockAfterNights: 15,
    },
    {
        id: 'close-glass-cold',
        body: 'グラスが冷えてる。\n今日はそれでいい。',
        mood: 'tired',
        unlockAfterNights: 20,
    },
    {
        id: 'close-rain-left',
        body: '雨が、客より先に帰りやがった。\n傘だけ忘れていった。',
        mood: 'amused',
        unlockAfterNights: 30,
    },
    {
        id: 'close-counter-wiped',
        body: 'カウンターは、拭けば拭くほど正直になる。\n人間は逆だがな。',
        mood: 'bitter',
        unlockAfterNights: 50,
    },
    {
        id: 'close-lights-off',
        body: '灯りを落とす前の店は、誰の店でもない。\nそういう時間が、一日に一度はいる。',
        mood: 'reflective',
        unlockAfterNights: 70,
    },
    {
        id: 'close-hundred-nights',
        body: '百夜。\n数えてる奴が、いちばん先に壊れる。',
        mood: 'bitter',
        unlockAfterNights: 100,
    },
    {
        id: 'close-bottles-line',
        body: '瓶は並べておけ。\n明日の客は、今日の俺より目が利く。',
        mood: 'tired',
        unlockAfterNights: 150,
    },
    {
        id: 'close-name-forgotten',
        body: '名前は忘れた。\n頼んだ酒は、まだ覚えてる。',
        mood: 'cryptic',
        unlockAfterNights: 200,
    },
    {
        id: 'close-still-here',
        body: 'お前、まだここにいるのか。\n……まあ、悪かない。',
        mood: 'grateful',
        unlockAfterNights: 300,
    },
    {
        id: 'close-last-light',
        body: '最後に消す灯りは、いつも同じ場所にある。\nそれだけのことだ。',
        mood: 'cryptic',
        unlockAfterNights: 500,
    },
];

export function pickClosingMonologue(totalNights: number): ClosingMonologue | null {
    const unlocked = CLOSING_MONOLOGUES.filter((m) => m.unlockAfterNights <= totalNights);
    if (unlocked.length === 0) {
        return null;
    }
    const index = Math.floor(Math.random() * unlocked.length);
    return unlocked[index];
}
