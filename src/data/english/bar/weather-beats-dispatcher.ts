/**
 * Silent Bartender -- weather beats dispatcher.
 *
 * Single entry point for getting a weather-specific atmospheric
 * beat. Keeps weather logic in one place.
 */

import { pickRainBeat } from './rain-special';
import { pickSnowBeat } from './snow-special';
import { pickWindSpecialBeat } from './wind-special';
import { pickColdBeat } from './cold-special';
import { pickHumidBeat } from './humid-special';
import { pickTsukimiBeat } from './tsukimi-special';

export type WeatherCode = 'clear' | 'rain' | 'cold' | 'humid' | 'snow' | 'windy';

/** Pick an atmospheric beat appropriate to the weather. */
export function pickWeatherBeat(weather: WeatherCode): string | null {
    // Tsukimi overlay (mid-September only) — wins if in season
    const tsukimi = pickTsukimiBeat();
    if (tsukimi) return tsukimi;

    switch (weather) {
        case 'rain': return pickRainBeat();
        case 'snow': return pickSnowBeat();
        case 'windy': return pickWindSpecialBeat();
        case 'cold': return pickColdBeat();
        case 'humid': return pickHumidBeat();
        case 'clear': return null;
        default: return null;
    }
}
