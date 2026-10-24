/**
 * Silent Bartender -- the house menu.
 *
 * The drinks and food actually served at Gondo's counter. Referenced
 * by the chalkboard component, by ambient flavor, and optionally by
 * future "order the specific drink" modes.
 *
 * Organized by category. English on the rail, Japanese in the back.
 */

export interface MenuItem {
    en: string;
    ja: string;
    category: 'sake' | 'beer' | 'whiskey' | 'cocktail' | 'non-alcoholic' | 'food';
    price: number; // JPY
    note?: string; // one-line flavor
}

export const HOUSE_MENU: MenuItem[] = [
    // Sake
    { en: 'House Sake (hot)', ja: '熱燗', category: 'sake', price: 600 },
    { en: 'House Sake (cold)', ja: '冷酒', category: 'sake', price: 650 },
    { en: 'Premium Sake Flight', ja: '利き酒セット', category: 'sake', price: 1800, note: 'Three cups, three temperatures.' },
    { en: 'Umeshu on Ice', ja: '梅酒ロック', category: 'sake', price: 700 },

    // Beer
    { en: 'Draft Beer', ja: '生ビール', category: 'beer', price: 600 },
    { en: 'Light Beer', ja: 'ライトビール', category: 'beer', price: 550 },
    { en: 'Import of the Night', ja: '本日の輸入ビール', category: 'beer', price: 800, note: 'Ask. Changes every day.' },

    // Whiskey
    { en: 'Whiskey Neat', ja: 'ウイスキー ストレート', category: 'whiskey', price: 900 },
    { en: 'Whiskey on the Rocks', ja: 'ウイスキー ロック', category: 'whiskey', price: 900 },
    { en: 'Signature Highball', ja: 'ハイボール', category: 'whiskey', price: 600, note: 'House specialty. Gondo pours it himself.' },
    { en: 'Single Malt Flight', ja: 'シングルモルト飲み比べ', category: 'whiskey', price: 2200 },

    // Cocktails
    { en: 'Gin and Tonic', ja: 'ジントニック', category: 'cocktail', price: 700 },
    { en: 'Espresso Martini', ja: 'エスプレッソマティーニ', category: 'cocktail', price: 900 },
    { en: 'Plum Spritz', ja: '梅のスプリッツ', category: 'cocktail', price: 800, note: 'Seasonal.' },

    // Non-alcoholic
    { en: 'Water', ja: '水', category: 'non-alcoholic', price: 0, note: 'Always free. Always first, if Gondo decides.' },
    { en: 'Oolong Tea', ja: '烏龍茶', category: 'non-alcoholic', price: 400 },
    { en: 'Sparkling Lemon', ja: '炭酸レモン', category: 'non-alcoholic', price: 500 },
    { en: 'Cold Green Tea', ja: '冷茶', category: 'non-alcoholic', price: 400 },

    // Food
    { en: 'Edamame', ja: '枝豆', category: 'food', price: 400 },
    { en: 'Grilled Salt-Fish', ja: '焼き魚塩', category: 'food', price: 900 },
    { en: "Chef's Pick", ja: 'お任せ一品', category: 'food', price: 1200, note: "Whatever is best tonight." },
    { en: 'Pickles Plate', ja: 'お新香盛り', category: 'food', price: 500 },
    { en: 'Rice Bowl with Dashi', ja: 'だし茶漬け', category: 'food', price: 600, note: 'The close-out staple.' },
];

/** Pick N random items from the menu for the chalkboard display. */
export function pickChalkboardItems(n: number, seed?: number): MenuItem[] {
    const src = [...HOUSE_MENU];
    // Lightweight shuffle (not cryptographically seeded)
    for (let i = src.length - 1; i > 0; i--) {
        const j = Math.floor((seed !== undefined ? ((seed * 9301 + 49297) % 233280) / 233280 : Math.random()) * (i + 1));
        [src[i], src[j]] = [src[j], src[i]];
    }
    return src.slice(0, n);
}
