/**
 * 話し言葉の単語帳 — 型と読み方
 *
 * 市販の単語帳との差は、載っている語ではなく **載っている数字** にある。
 * 語のリスト自体に価値はない(単語に著作権が無いのと同じ理由で、誰でも作れる)。
 * 価値があるのは「その語に一生で何回会うか」「どの塊で来るか」「どこで話されているか」で、
 * これは1億語の実測コーパスが無いと出せない。
 */

/** [表現, 一生の遭遇, 語域] */
export type ChunkRef = [string, number, number];

/** [動画ID, 秒, その場面の本文] */
export type ClipRef = [string, number, string];

/** [順位, 語, 100万語あたり, 一生の遭遇, 集中度%, 塊, 実音] */
export type WordEntry = [number, string, number, number, number, ChunkRef[], ClipRef | null];

export const W = {
    rank: 0, word: 1, perM: 2, life: 3, conc: 4, chunks: 5, clip: 6,
} as const;

/**
 * 語域。YouTube = 演出されていない生の会話、字幕/映画 = 脚本。
 * "i was like" が YouTube 615.8 / 字幕0 / 映画0 だったように、
 * 脚本に出ない表現こそが「実際に話されている英語」の正体になる。
 */
export const REGISTER = [
    { label: '不明', note: 'サンプルが足りない' },
    { label: '生の会話', note: 'YouTubeに濃く、脚本には薄い。教材に載らない層' },
    { label: '脚本', note: '映画・ドラマに濃い。演出で使われる言い回し' },
    { label: 'どこでも', note: '会話にも脚本にも出る。まず押さえる層' },
] as const;

/**
 * 集中度の読み方。
 * その語の遭遇のうち、最も多い塊1つが占める割合。
 * excuse なら 88%(excuse me)。**単体で覚えても、その形でしか来ない語がある。**
 */
export const concLabel = (c: number): { label: string; note: string } => {
    if (c >= 70) return { label: 'ほぼ一択', note: 'この語はほぼこの形でしか来ない。単体で覚えるだけ無駄になる' };
    if (c >= 40) return { label: '偏っている', note: '半分近くがこの形。まずこの塊ごと入れる' };
    if (c >= 15) return { label: '主役の形あり', note: '代表的な形がある。そこから広げる' };
    return { label: '広く使う', note: '特定の形に偏らない。語そのものを覚える価値がある' };
};

/**
 * 帯。試験の語彙帯とのだいたいの対応。
 * 厳密な換算表は公表されていないので、断定しない書き方にしてある。
 */
export const BANDS = [
    { from: 1, to: 300, name: '骨', note: '会話の骨組み。ここが抜けていると何も聞こえない' },
    { from: 301, to: 600, name: '肉', note: '日常のほぼ全部。中学の教科書と重なる帯' },
    { from: 601, to: 1000, name: '皮', note: '高校基礎。試験の土台になる帯' },
    { from: 1001, to: 99999, name: '外', note: 'ここから先は話題によって当たり外れが出る' },
] as const;

export const bandOf = (rank: number) => BANDS.find(b => rank >= b.from && rank <= b.to) ?? BANDS[BANDS.length - 1];
