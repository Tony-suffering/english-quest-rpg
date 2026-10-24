/**
 * Daily observation prompts for the Silent Bartender intro screen.
 * Each entry is a concrete, specific thing to notice in the real world today.
 * Shown once per day as a quiet side quest — not an exercise, just a nudge.
 * Pick is deterministic per JST date so the same prompt stays all day.
 */

export interface DailyObservation {
    id: string;
    prompt: string;
    category: 'people' | 'space' | 'weather' | 'sound' | 'time' | 'hands' | 'self';
}

export const DAILY_OBSERVATIONS: DailyObservation[] = [
    { id: 'obs-1', prompt: '今日、最初に話しかけられた人の声の高さを覚えておく', category: 'people' },
    { id: 'obs-2', prompt: '今日、笑顔を見せなかった人を一人見つける', category: 'people' },
    { id: 'obs-3', prompt: 'すれ違った人の中で、一番ゆっくり歩いていた人を思い出す', category: 'people' },
    { id: 'obs-4', prompt: '誰かが「ありがとう」と言った瞬間を一つ覚えておく', category: 'people' },
    { id: 'obs-5', prompt: '今日、目が合ってすぐに逸らされた回数を数える', category: 'people' },
    { id: 'obs-6', prompt: '普段通る道の、使われていない扉を一つ探す', category: 'space' },
    { id: 'obs-7', prompt: '帰り道で、店の灯りが消えている家を一つだけ覚える', category: 'space' },
    { id: 'obs-8', prompt: '今日通った階段の段数を、一つだけ数えてみる', category: 'space' },
    { id: 'obs-9', prompt: '部屋の中で、今日一度も触らなかった物を一つ見つける', category: 'space' },
    { id: 'obs-10', prompt: '歩いた道で、最も天井の低かった場所を思い出す', category: 'space' },
    { id: 'obs-11', prompt: '空気の匂いが、朝と夜でどう違うか確かめる', category: 'weather' },
    { id: 'obs-12', prompt: '今日の風が、どの方向から吹いていたか一度だけ確かめる', category: 'weather' },
    { id: 'obs-13', prompt: '空を見上げた時の雲の形を、一つだけ覚えておく', category: 'weather' },
    { id: 'obs-14', prompt: '外に出た瞬間、肌が最初に感じた温度を覚えておく', category: 'weather' },
    { id: 'obs-15', prompt: '一日で一番静かだった瞬間がいつだったか思い出す', category: 'sound' },
    { id: 'obs-16', prompt: '今日、最初に耳に入った音が何だったか覚えておく', category: 'sound' },
    { id: 'obs-17', prompt: '遠くから聞こえた音のうち、正体が分からなかったものを一つ覚える', category: 'sound' },
    { id: 'obs-18', prompt: '冷蔵庫や機械の低い音が止まった瞬間に気づけるか試す', category: 'sound' },
    { id: 'obs-19', prompt: '今日、時計を見た回数を数える', category: 'time' },
    { id: 'obs-20', prompt: '何もしていなかった時間が、今日どのくらいあったか思い出す', category: 'time' },
    { id: 'obs-21', prompt: '一番長く感じた一分間が、今日のいつだったか覚えておく', category: 'time' },
    { id: 'obs-22', prompt: '夜、眠る直前に時計を見る時刻を覚えておく', category: 'time' },
    { id: 'obs-23', prompt: '自分の手が、どの道具を一番長く持っていたか覚えておく', category: 'hands' },
    { id: 'obs-24', prompt: '今日、指先が最初に触れた冷たい物を思い出す', category: 'hands' },
    { id: 'obs-25', prompt: '両手を同時に使った作業が、今日どれだけあったか覚えておく', category: 'hands' },
    { id: 'obs-26', prompt: '利き手でない方の手で、今日何かを一つだけ持ってみる', category: 'hands' },
    { id: 'obs-27', prompt: '今日、自分がいちばん軽くため息をついた瞬間を思い出す', category: 'self' },
    { id: 'obs-28', prompt: '鏡を見た時、最初に目が行った場所を覚えておく', category: 'self' },
    { id: 'obs-29', prompt: '今日、無意識に口ずさんでいた旋律があったか確かめる', category: 'self' },
    { id: 'obs-30', prompt: '一日の終わりに、肩の力が抜けた瞬間がいつだったか思い出す', category: 'self' },
];

function jstYyyymmdd(): number {
    const now = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const jst = new Date(utcMs + 9 * 60 * 60 * 1000);
    const y = jst.getUTCFullYear();
    const m = jst.getUTCMonth() + 1;
    const d = jst.getUTCDate();
    return y * 10000 + m * 100 + d;
}

export function todaysObservation(seed?: number): DailyObservation {
    const key = typeof seed === 'number' && Number.isFinite(seed) ? Math.floor(Math.abs(seed)) : jstYyyymmdd();
    const index = key % DAILY_OBSERVATIONS.length;
    return DAILY_OBSERVATIONS[index];
}
