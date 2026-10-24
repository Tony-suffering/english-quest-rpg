// App settings — localStorage single-key store
// No React dependency. Safe to call from module-level functions.

export interface AppSettings {
    soundEnabled: boolean;     // All sounds ON/OFF
    slotEnabled: boolean;      // Gacha slot animation ON/OFF
    feverEnabled: boolean;     // FEVER mode ON/OFF
    volume: number;            // Master volume 0-100
    feverBgmVolume: number;    // FEVER BGM volume 0-100
    bgmEnabled: boolean;       // Background music ON/OFF
    bgmVolume: number;         // BGM volume 0-100
    beginnerMode: boolean;     // Progressive unlock gating ON/OFF
    tapToLevel: boolean;       // Tap card body = level up + next card
    typingMatch: boolean;      // Exact-match typing for phrases mode too (words always on)
}

const STORAGE_KEY = 'eigodamashii-settings';

const DEFAULTS: AppSettings = {
    soundEnabled: true,
    slotEnabled: true,
    feverEnabled: true,
    volume: 100,
    feverBgmVolume: 35,
    bgmEnabled: false,
    bgmVolume: 30,
    beginnerMode: true,
    tapToLevel: false,
    typingMatch: false,
};

export function getSettings(): AppSettings {
    if (typeof window === 'undefined') return { ...DEFAULTS };
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            // Existing users (have quest-mastery) are not beginners
            const isExisting = !!localStorage.getItem('quest-mastery');
            return { ...DEFAULTS, beginnerMode: isExisting ? false : true };
        }
        const parsed = JSON.parse(raw);
        // If beginnerMode was never explicitly set, infer from existing data
        if (parsed.beginnerMode === undefined) {
            const isExisting = !!localStorage.getItem('quest-mastery');
            parsed.beginnerMode = isExisting ? false : true;
        }
        return { ...DEFAULTS, ...parsed };
    } catch {
        return { ...DEFAULTS };
    }
}

export function setSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]): void {
    if (typeof window === 'undefined') return;
    const current = getSettings();
    current[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function setSettings(partial: Partial<AppSettings>): void {
    if (typeof window === 'undefined') return;
    const current = getSettings();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }));
}
