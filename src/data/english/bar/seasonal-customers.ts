/**
 * Silent Bartender -- seasonal customers.
 *
 * These customers only appear during specific Japanese seasonal
 * windows. Each is tied to a concrete cultural moment (hanami,
 * tsuyu, matsuri, tsukimi, hatsuyuki, nenmatsu).
 *
 * Wire: `getSeasonalCustomers()` returns the pool whose monthRange
 * includes today's JST month. Callers may merge with the main roster.
 */

import type { Customer } from './types';

export type Season =
    | 'sakura'
    | 'tsuyu'
    | 'summer'
    | 'autumn'
    | 'first-snow'
    | 'new-year';

export interface SeasonalCustomer extends Customer {
    season: Season;
    /** Month range (1-12) inclusive. Use [3, 4] for late-March to early-April. */
    monthRange: [number, number];
}

export const SEASONAL_CUSTOMERS: SeasonalCustomer[] = [
    // ─── 桜 / SAKURA (late March - early April) ───
    {
        id: 'season-sakura-first-petal',
        name: 'THE PETAL CATCHER',
        mood: 'romantic',
        tag: '桜を見てきたばかり',
        line: "I caught one on my palm on the way here. I do not want to close my hand.",
        cards: [
            "Then keep it open. A small cup of cold sake, next to it.",
            "Our strongest cocktail, in a big glass",
            "A hot coffee to warm both hands",
            "The bathroom is to the left",
        ],
        reaction: {
            success: "Yes. That is the kind of drink you have with a petal.",
            failure: "...you made me close my hand.",
        },
        season: 'sakura',
        monthRange: [3, 4],
        phase: 'early',
        difficulty: 3,
        beat: '左手を軽く開いたまま、右手でコートを脱いだ。',
    },
    {
        id: 'season-sakura-last-hanami-grandma',
        name: 'THE GRANDMOTHER',
        mood: 'existential',
        tag: '最後の花見になるかもしれない',
        line: "The doctor says maybe not next year. So I went alone today. It was enough.",
        cards: [
            "Warm sake. Nothing to say. I will sit nearby if you want.",
            "Our celebratory champagne flight",
            "A strong cocktail to forget",
            "Tonight's tempura special",
        ],
        reaction: {
            success: "...thank you for not asking questions.",
            failure: "...I did not come here to celebrate.",
        },
        season: 'sakura',
        monthRange: [3, 4],
        phase: 'late',
        difficulty: 4,
        beat: '小さな写真を一枚、カウンターに置いた。',
    },
    {
        id: 'season-sakura-missed-stop',
        name: 'THE COMMUTER',
        mood: 'tired',
        tag: '窓の外の桜に見とれて降り損ねた',
        line: "I missed my stop looking at the trees. I do not even know what station this is.",
        cards: [
            "You are two stops past home. Sit. Water first, then a light beer.",
            "A double whiskey, you have earned it",
            "A shot of tequila to reset",
            "A coffee to go, the exit is there",
        ],
        reaction: {
            success: "...yeah. Let me just breathe for a minute.",
            failure: "...I should just get back on the train.",
        },
        season: 'sakura',
        monthRange: [3, 4],
        phase: 'early',
        difficulty: 2,
    },
    {
        id: 'season-sakura-ensoku-kid',
        name: 'THE FIELD TRIP KID',
        mood: 'curious',
        tag: '遠足帰り、親を待っている',
        line: "My mom said wait here. She is parking. Do you have juice? I saw a thousand trees today.",
        cards: [
            "Apple juice, in a real glass. Tell me about the trees.",
            "Our house highball",
            "A strong shochu",
            "The bathroom is to the left",
        ],
        reaction: {
            success: "There were pink ones AND white ones. Did you know that?",
            failure: "...I will just wait outside.",
        },
        season: 'sakura',
        monthRange: [3, 4],
        phase: 'early',
        difficulty: 2,
        beat: 'リュックに桜の葉が一枚はさまっている。',
    },
    {
        id: 'season-sakura-photographer',
        name: 'THE PHOTOGRAPHER',
        mood: 'tired',
        tag: '一人で朝から撮り続けた',
        line: "I shot four hundred frames today. I cannot look at another pink thing.",
        cards: [
            "Then something dark. A smoky whiskey, neat, in low light.",
            "Our rose champagne",
            "A pink cocktail, house special",
            "A strawberry daiquiri",
        ],
        reaction: {
            success: "Yes. Thank you. No more pink.",
            failure: "...did you even hear me?",
        },
        season: 'sakura',
        monthRange: [3, 4],
        phase: 'peak',
        difficulty: 3,
    },
    {
        id: 'season-sakura-hanami-returner',
        name: 'THE PARTY RETURNER',
        mood: 'drunk',
        tag: '会社の花見から一人離脱',
        line: "I left the group. They are still under the tree. I could not hear myself think.",
        cards: [
            "Quiet seat, hot tea, then a small beer when you are ready.",
            "Another round to catch up with them",
            "Our loudest house music playlist",
            "A karaoke mic, we have one",
        ],
        reaction: {
            success: "Yes. This is what I needed. Quiet.",
            failure: "...I should have stayed at the park.",
        },
        season: 'sakura',
        monthRange: [3, 4],
        phase: 'peak',
        difficulty: 2,
        beat: '髪に花びらが二枚ついたまま。',
    },

    // ─── 梅雨 / TSUYU (June) ───
    {
        id: 'season-tsuyu-drenched',
        name: 'THE DRENCHED ONE',
        mood: 'tired',
        tag: '傘が裏返った、全身びしょ濡れ',
        line: "My umbrella turned inside out three blocks ago. Please just give me something hot.",
        cards: [
            "Hot sake and a dry towel. Sit. Breathe.",
            "An iced highball, very cold",
            "A frozen daiquiri",
            "Our coldest beer",
        ],
        reaction: {
            success: "...thank you. I am a human again.",
            failure: "...I am already cold, do not make it worse.",
        },
        season: 'tsuyu',
        monthRange: [6, 6],
        phase: 'early',
        difficulty: 2,
    },
    {
        id: 'season-tsuyu-florist',
        name: 'THE FLORIST',
        mood: 'tired',
        tag: 'あじさい搬入で一日中濡れた',
        line: "I carried hydrangeas all day. My hands smell like rain and green stems.",
        cards: [
            "A gin and tonic. Cold, herbal, clean. It will match your hands.",
            "A sweet plum wine, very syrupy",
            "A creamy whiskey cocktail",
            "Our smoky mezcal",
        ],
        reaction: {
            success: "Oh. Yes. That is the right kind of green.",
            failure: "...that does not go with today at all.",
        },
        season: 'tsuyu',
        monthRange: [6, 6],
        phase: 'peak',
        difficulty: 3,
    },
    {
        id: 'season-tsuyu-rain-hater',
        name: 'THE RAIN HATER',
        mood: 'angry',
        tag: '梅雨が本当に嫌いな人',
        line: "Three weeks. Three weeks of this. I want to drink something that does not feel wet.",
        cards: [
            "Whiskey, neat, no ice, no water. Dry as a desert.",
            "Our rain-season special cocktail",
            "A tall glass of ice water first",
            "Iced green tea on the house",
        ],
        reaction: {
            success: "...good. Finally something dry.",
            failure: "...everything in this country is damp.",
        },
        season: 'tsuyu',
        monthRange: [6, 6],
        phase: 'peak',
        difficulty: 3,
    },
    {
        id: 'season-tsuyu-dashi-maker',
        name: 'THE DASHI MAKER',
        mood: 'regular',
        tag: '鰹節屋、今日もスープの試作',
        line: "Tasted eleven batches of broth today. I need something that is not umami.",
        cards: [
            "A dry sparkling wine. Bright, clean, not savory at all.",
            "Our miso-infused cocktail",
            "A bowl of soup, on the house",
            "Our richest stout",
        ],
        reaction: {
            success: "Yes. I need my tongue back. Thank you.",
            failure: "...that is the opposite of what I asked.",
        },
        season: 'tsuyu',
        monthRange: [6, 6],
        phase: 'early',
        difficulty: 4,
        beat: 'エプロンをたたんでカウンター下に置いた。',
    },
    {
        id: 'season-tsuyu-mold-accountant',
        name: 'THE ACCOUNTANT',
        mood: 'existential',
        tag: '家のどこかにカビの気配',
        line: "Something in my apartment smells like mushrooms and I cannot find it.",
        cards: [
            "Then drink something that smells of anything else. Smoky whiskey?",
            "Our blue cheese pairing flight",
            "A damp house special",
            "The bathroom is to the left",
        ],
        reaction: {
            success: "Yes. I need a new smell in my head.",
            failure: "...that is not helping.",
        },
        season: 'tsuyu',
        monthRange: [6, 6],
        phase: 'late',
        difficulty: 3,
    },

    // ─── 盛夏 / SUMMER (July - August) ───
    {
        id: 'season-summer-post-matsuri',
        name: 'THE POST-MATSURI',
        mood: 'tired',
        tag: '法被を脱いだばかり、汗だく',
        line: "We carried the mikoshi for four hours. My shoulders are done. Give me something cold.",
        cards: [
            "Iced beer, tall, frosted glass. Towel on the counter.",
            "Hot sake, for the sore shoulders",
            "A warm whiskey to relax",
            "Our heartiest ramen special",
        ],
        reaction: {
            success: "...that is the best thing I have ever had.",
            failure: "...I am already sweating, do not make it worse.",
        },
        season: 'summer',
        monthRange: [7, 8],
        phase: 'peak',
        difficulty: 2,
        beat: '手ぬぐいを首にかけたまま座った。',
    },
    {
        id: 'season-summer-cicada-listener',
        name: 'THE CICADA LISTENER',
        mood: 'curious',
        tag: '一日中セミを録音していた',
        line: "I recorded cicadas for eight hours today. I need something that does not buzz.",
        cards: [
            "Still water first, then a smooth cold sake. Nothing fizzy.",
            "Our loudest sparkling wine",
            "A shaken cocktail, very vigorous",
            "Our pop rocks dessert",
        ],
        reaction: {
            success: "Yes. Finally, quiet in my ears.",
            failure: "...that is buzzing again.",
        },
        season: 'summer',
        monthRange: [7, 8],
        phase: 'peak',
        difficulty: 4,
    },
    {
        id: 'season-summer-taxi-driver',
        name: 'THE TAXI DRIVER',
        mood: 'tired',
        tag: '空調ベストで辛うじて生きている',
        line: "My cooling vest ran out of battery an hour ago. I am a puddle in a uniform.",
        cards: [
            "Iced barley tea first, then a small cold beer when you cool down.",
            "A hot toddy to warm the core",
            "Our spiciest cocktail",
            "A double espresso, neat",
        ],
        reaction: {
            success: "...okay. I can feel my face again.",
            failure: "...I will just go back to the car.",
        },
        season: 'summer',
        monthRange: [7, 8],
        phase: 'early',
        difficulty: 2,
    },
    {
        id: 'season-summer-popsicle',
        name: 'THE POPSICLE',
        mood: 'curious',
        tag: 'ガリガリ君を食べながら入ってきた',
        line: "I still have half a popsicle. Is that okay? I will finish it first. Then a drink.",
        cards: [
            "Finish it. Water on the counter. Tell me when you are ready.",
            "Our fastest cocktail, right now",
            "A hot drink to melt it faster",
            "The exit is to the left",
        ],
        reaction: {
            success: "Thank you for letting me finish it properly.",
            failure: "...I will just eat it outside.",
        },
        season: 'summer',
        monthRange: [7, 8],
        phase: 'early',
        difficulty: 2,
    },
    {
        id: 'season-summer-obon-visitor',
        name: 'THE OBON VISITOR',
        mood: 'homesick',
        tag: 'お盆で実家に戻ってきた',
        line: "I only come back once a year for obon. My mother's drink cabinet has not changed.",
        cards: [
            "Then try something your mother would never stock. A peaty whiskey?",
            "Whatever your mother drinks, we match it",
            "A childhood juice, apple",
            "The local tourist special",
        ],
        reaction: {
            success: "Yes. I am not a kid in that kitchen tonight.",
            failure: "...that is the cabinet, basically.",
        },
        season: 'summer',
        monthRange: [7, 8],
        phase: 'late',
        difficulty: 3,
        beat: '実家の匂いがまだシャツに残っている。',
    },

    // ─── 秋 / AUTUMN (September - October) ───
    {
        id: 'season-autumn-tsukimi',
        name: 'THE MOON WATCHER',
        mood: 'romantic',
        tag: '中秋の名月を見てきた',
        line: "The moon was so bright tonight I could read by it. I do not want anything loud.",
        cards: [
            "Cold sake, small cup, by the window seat. The moon is still there.",
            "Our brightest neon cocktail",
            "A loud house special",
            "Our celebratory champagne",
        ],
        reaction: {
            success: "Yes. Thank you for leaving it quiet.",
            failure: "...you ruined the mood.",
        },
        season: 'autumn',
        monthRange: [9, 10],
        phase: 'late',
        difficulty: 3,
        beat: '月見団子をひとつ、紙に包んで持っている。',
    },
    {
        id: 'season-autumn-chestnut-vendor',
        name: 'THE CHESTNUT VENDOR',
        mood: 'tired',
        tag: '天津甘栗の屋台を畳んだばかり',
        line: "I roasted chestnuts for ten hours. My hands smell sweet and my back is broken.",
        cards: [
            "Warm shochu with hot water. Easy on the hands, easy on the back.",
            "Our coldest beer, in a frosted mug",
            "A sweet dessert wine",
            "A bag of chestnuts, on the house",
        ],
        reaction: {
            success: "...yes. That is exactly the temperature.",
            failure: "...I am already cold from packing up.",
        },
        season: 'autumn',
        monthRange: [9, 10],
        phase: 'peak',
        difficulty: 3,
    },
    {
        id: 'season-autumn-nobel-nerd',
        name: 'THE NOBEL NERD',
        mood: 'smug',
        tag: 'ノーベル賞発表週で興奮しきり',
        line: "A Japanese researcher just won. I predicted it. I need to celebrate this correctly.",
        cards: [
            "Then something precise. A single-origin whiskey, one ice cube, neat pour.",
            "Our loudest party cocktail",
            "A random shot, dealer's choice",
            "Our cheapest house wine",
        ],
        reaction: {
            success: "Yes. A drink worthy of the result.",
            failure: "...you do not understand what today means.",
        },
        season: 'autumn',
        monthRange: [9, 10],
        phase: 'peak',
        difficulty: 4,
        beat: '新聞の切り抜きをカウンターに広げた。',
    },
    {
        id: 'season-autumn-koyo-guide',
        name: 'THE MOUNTAIN GUIDE',
        mood: 'tired',
        tag: '紅葉シーズン最終日、ガイド業終了',
        line: "Last tour of the season. The leaves are done. I do not have to smile at anyone tomorrow.",
        cards: [
            "Then stop smiling. A quiet whiskey, hot water on the side.",
            "Our most social group cocktail",
            "Karaoke mic, we have one",
            "A group tasting flight for six",
        ],
        reaction: {
            success: "...yes. No more tour voice. Thank you.",
            failure: "...I cannot do performance tonight.",
        },
        season: 'autumn',
        monthRange: [9, 10],
        phase: 'late',
        difficulty: 3,
        beat: 'ガイド用の小旗を丸めてリュックに突っ込んだ。',
    },
    {
        id: 'season-autumn-sweater-weather',
        name: 'THE FIRST SWEATER',
        mood: 'curious',
        tag: '今年初めてセーターを出した',
        line: "I pulled my sweater out of the closet today. It still smells like last winter.",
        cards: [
            "Then drink something that smells like this year. A fresh pear liqueur.",
            "Our mothball-themed cocktail",
            "A musty cellar wine",
            "An old bottle from the back",
        ],
        reaction: {
            success: "Yes. New season, new smell. Good.",
            failure: "...that is the closet again.",
        },
        season: 'autumn',
        monthRange: [9, 10],
        phase: 'early',
        difficulty: 3,
    },

    // ─── 初雪 / FIRST SNOW (December - January) ───
    {
        id: 'season-first-snow-watcher',
        name: 'THE FIRST-SNOW WATCHER',
        mood: 'romantic',
        tag: '今年初めての雪を見た',
        line: "It started snowing ten minutes ago. I ran here from the station. Do you know yet?",
        cards: [
            "Yes. Hot sake. Window seat is free. Watch it with me.",
            "Our iced cocktail, very cold",
            "A frozen margarita",
            "Our coldest beer",
        ],
        reaction: {
            success: "...yes. Thank you for the seat.",
            failure: "...I will watch it from outside, then.",
        },
        season: 'first-snow',
        monthRange: [12, 1],
        phase: 'late',
        difficulty: 3,
        beat: 'コートの肩に雪が三つ、まだ溶けずに残っている。',
    },
    {
        id: 'season-first-snow-nye-crasher',
        name: 'THE NYE CRASHER',
        mood: 'drunk',
        tag: '大晦日、行く場所がなくなった',
        line: "The countdown bar kicked me out. I have forty minutes. Somewhere has to take me.",
        cards: [
            "Sit. Water first. Small beer at the countdown. You are safe here.",
            "Strong shots, catch up fast",
            "Our midnight champagne tower",
            "The exit is to the left",
        ],
        reaction: {
            success: "...thank you. I did not want to be alone at zero.",
            failure: "...I will find somewhere else.",
        },
        season: 'first-snow',
        monthRange: [12, 1],
        phase: 'closing',
        difficulty: 4,
    },
    {
        id: 'season-first-snow-toshikoshi-soba',
        name: 'THE SOBA EATER',
        mood: 'regular',
        tag: '年越しそばを食べてから来た',
        line: "I just finished my toshikoshi soba. The year is long and thin. I am ready.",
        cards: [
            "Then a small warm sake. Thin, warm, ends cleanly. Like the noodle.",
            "Our biggest beer mug",
            "A heavy cream cocktail",
            "A full bottle of wine, yours",
        ],
        reaction: {
            success: "Yes. That is the right shape for tonight.",
            failure: "...that is too much for a soba night.",
        },
        season: 'first-snow',
        monthRange: [12, 1],
        phase: 'late',
        difficulty: 4,
    },
    {
        id: 'season-first-snow-missed-hatsuhinode',
        name: 'THE MISSED SUNRISE',
        mood: 'heartbroken',
        tag: '初日の出を寝過ごした',
        line: "I set three alarms. I slept through all of them. The year started without me.",
        cards: [
            "Then start it here. A warm drink at noon counts. Hot sake, slow pour.",
            "A strong cocktail to forget the morning",
            "Espresso, double, to wake up",
            "A shot to reset",
        ],
        reaction: {
            success: "...okay. A slow start is still a start.",
            failure: "...I already missed the good part.",
        },
        season: 'first-snow',
        monthRange: [12, 1],
        phase: 'early',
        difficulty: 3,
        beat: 'スマホに未読の家族LINEが溜まっている。',
    },
    {
        id: 'season-first-snow-kotatsu-escapee',
        name: 'THE KOTATSU ESCAPEE',
        mood: 'tired',
        tag: 'こたつから奇跡的に出てきた',
        line: "I left the kotatsu. I walked here in the snow. Please make it worth it.",
        cards: [
            "Then something you cannot have at home. A rare aged whiskey, one sip.",
            "Instant coffee, like at home",
            "A microwave sake",
            "A basic house beer",
        ],
        reaction: {
            success: "Yes. This was worth leaving the blanket.",
            failure: "...I could have had this on the couch.",
        },
        season: 'first-snow',
        monthRange: [12, 1],
        phase: 'peak',
        difficulty: 3,
    },

    // ─── 年末年始 / NEW YEAR (late Dec - early Jan) ───
    {
        id: 'season-new-year-bonenkai-survivor',
        name: 'THE BONENKAI SURVIVOR',
        mood: 'tired',
        tag: '三次会まで付き合って解放された',
        line: "That was my fourth bonenkai this week. I do not remember what I was celebrating.",
        cards: [
            "Water. Then a small hot tea. Nothing to celebrate tonight.",
            "Another round to finish the year strong",
            "Our strongest shot special",
            "A triple whiskey, neat",
        ],
        reaction: {
            success: "...yes. Thank you. No more toasts.",
            failure: "...I cannot drink another thing.",
        },
        season: 'new-year',
        monthRange: [12, 12],
        phase: 'late',
        difficulty: 2,
        beat: 'ネクタイが首からぶら下がっているだけ。',
    },
    {
        id: 'season-new-year-end-office',
        name: 'THE LAST ONE OUT',
        mood: 'tired',
        tag: '仕事納めで最後に電気を消した',
        line: "I turned the office lights off. Nobody else is left in the building. The year is done.",
        cards: [
            "Then sit. A small whiskey, slowly. The building is closed, you are not.",
            "A celebratory champagne magnum",
            "A round of shots for the empty office",
            "Our loudest cocktail",
        ],
        reaction: {
            success: "...yes. That is the right size for this.",
            failure: "...I do not have energy for that.",
        },
        season: 'new-year',
        monthRange: [12, 12],
        phase: 'late',
        difficulty: 3,
    },
    {
        id: 'season-new-year-incense-shop',
        name: 'THE INCENSE MAKER',
        mood: 'regular',
        tag: '除夜の鐘の前に線香を納めた',
        line: "I delivered the last incense for the temple today. My hands smell like sandalwood again.",
        cards: [
            "Then something that respects the smell. A clear cold sake, small cup.",
            "Our smokiest peated whiskey",
            "A heavy vanilla liqueur",
            "Our strongest perfumed cocktail",
        ],
        reaction: {
            success: "Yes. You did not fight the sandalwood.",
            failure: "...that is too loud next to my hands.",
        },
        season: 'new-year',
        monthRange: [12, 12],
        phase: 'late',
        difficulty: 4,
    },
    {
        id: 'season-new-year-shigotohajime',
        name: 'THE FIRST DAY BACK',
        mood: 'nervous',
        tag: '仕事始め、スーツの折り目が固い',
        line: "First day back. The suit feels wrong. I forgot how to walk to my own desk.",
        cards: [
            "Then a small drink to remember the rhythm. One beer, half size.",
            "A triple whiskey, to really relax",
            "A round of shots for the new year",
            "Our loudest party cocktail",
        ],
        reaction: {
            success: "...yes. Half a beer is the right amount of back.",
            failure: "...I have work tomorrow, I cannot do that.",
        },
        season: 'new-year',
        monthRange: [1, 1],
        phase: 'early',
        difficulty: 3,
        beat: '新しい手帳のカバーにまだ値札のシールが残っている。',
    },
];

/**
 * Returns seasonal customers whose monthRange includes today's JST month.
 * Handles wrap-around ranges like [12, 1] (December through January).
 * Out of season returns an empty array.
 */
export function getSeasonalCustomers(date?: Date): Customer[] {
    const base = date ?? new Date();
    const jst = new Date(base.getTime() + 9 * 60 * 60 * 1000);
    const month = jst.getUTCMonth() + 1; // 1-12

    return SEASONAL_CUSTOMERS.filter(c => {
        const [start, end] = c.monthRange;
        if (start <= end) {
            return month >= start && month <= end;
        }
        // Wrap-around (e.g. [12, 1])
        return month >= start || month <= end;
    });
}
