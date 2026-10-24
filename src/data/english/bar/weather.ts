/**
 * Silent Bartender -- tonight's weather.
 *
 * Small atmospheric layer. Each night gets a weather that:
 *  - shows as one line at the top (optional)
 *  - subtly biases the customer pool (e.g. rain -> more courier/
 *    rain-man/umbrella-less customers; cold -> more homesick)
 *
 * Pure; no DOM; no React.
 */

import type { Customer } from './types';

export type Weather = 'clear' | 'rain' | 'cold' | 'humid' | 'snow' | 'windy';

export interface WeatherBeat {
    id: Weather;
    label: string;
    beat: string;
    /** Customer id hints that this weather nudges more likely. */
    favor?: string[];
}

export const WEATHER_POOL: WeatherBeat[] = [
    {
        id: 'clear',
        label: '晴れた夜',
        beat: '月が出ている。空気が乾いて、暖簾がよく揺れる。',
    },
    {
        id: 'rain',
        label: '雨の夜',
        beat: '外は雨。通りの水たまりにネオンが滲んで見える。',
        favor: ['bike-courier-rain', 'rain-man', 'moving-guy', 'delivery-last-stop'],
    },
    {
        id: 'cold',
        label: '冷える夜',
        beat: '冷え込む夜。客はみんな温かいものを探している。',
        favor: ['homesick', 'fisherman-dawn', 'night-nurse'],
    },
    {
        id: 'humid',
        label: '蒸す夜',
        beat: '湿度が高い。汗ばんだ客が氷の音を欲しがっている。',
    },
    {
        id: 'snow',
        label: '雪の夜',
        beat: '雪が降り始めた。店内の灯が、外の白に反射している。',
        favor: ['edo-timer', 'homesick'],
    },
    {
        id: 'windy',
        label: '風の強い夜',
        beat: '暖簾が絶えず揺れている。風の音がグラスに混じる。',
    },
    {
        id: 'clear',
        label: '満月の夜',
        beat: '月が大きい。外の人影がくっきりと見える夜。',
    },
    {
        id: 'rain',
        label: '土砂降り',
        beat: '叩きつけるような雨。客は黙って店の中を見回している。',
        favor: ['bike-courier-rain', 'rain-man'],
    },
    {
        id: 'cold',
        label: '底冷えの夜',
        beat: '足元から冷えてくる。暖簾をくぐる客の背中が、少し丸まっている。',
        favor: ['homesick', 'fisherman-dawn'],
    },
    {
        id: 'humid',
        label: '熱帯夜',
        beat: '窓が曇っている。氷の消費量だけが早い。',
    },
    {
        id: 'snow',
        label: '積雪',
        beat: '傘を置く場所がない。誰も傘を持ってきていない。',
        favor: ['edo-timer'],
    },
    {
        id: 'clear',
        label: '星の夜',
        beat: '東京で珍しく、星が見える。カウンターの照明を少し落とす客もいる。',
    },
];

/** Pick a weather for tonight. Deterministic by JST date if seed is omitted. */
export function pickTonightWeather(seed?: number): WeatherBeat {
    const s = seed ?? (() => {
        const d = new Date();
        const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
        return Number(jst.toISOString().slice(0, 10).replace(/-/g, ''));
    })();
    return WEATHER_POOL[s % WEATHER_POOL.length];
}

/** Light boost for customers whose id matches weather.favor. */
export function applyWeatherBias(pool: Customer[], weather: WeatherBeat): Customer[] {
    const favor = new Set(weather.favor ?? []);
    if (favor.size === 0) return pool;
    const favored: Customer[] = [];
    const others: Customer[] = [];
    for (const c of pool) {
        if (favor.has(c.id)) favored.push(c);
        else others.push(c);
    }
    // Repeat favored once more in the front (low-intensity boost)
    return [...favored, ...favored, ...others];
}
