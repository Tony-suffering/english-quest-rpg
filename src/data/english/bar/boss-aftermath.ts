/**
 * Silent Bartender -- boss aftermath / follow-up customers.
 *
 * When a player serves (or fails) a boss customer, a related NPC
 * quietly circles back a few nights later: a friend checking in, an
 * editor noticing, a publisher hunting a missing poet. The aftermath
 * is how a single boss encounter echoes through the rest of the run.
 *
 * Each entry attaches to one existing boss id and defines:
 *  - a window in nights (min/max) after the boss was encountered
 *  - the follow-up Customer to spawn if the boss was FAILED
 *  - an optional follow-up Customer if the boss was SUCCESSFULLY served
 *
 * Triggering / one-shot bookkeeping lives in
 * src/lib/english/bar/aftermath-integration.ts. This file is data only.
 */

import type { Customer } from './types';

export interface BossAftermath {
    id: string;
    /** Boss customer id this aftermath trails. */
    afterBossId: string;
    /** Earliest night after the boss night when the follow-up can spawn. */
    minNightsLater: number;
    /** Latest night after the boss night when the follow-up can spawn. */
    maxNightsLater: number;
    /** Customer who arrives when the boss was failed/timed out. */
    onFailure: Customer;
    /** Customer who arrives when the boss was served successfully. */
    onSuccess?: Customer;
}

// ═══════════════════════════════════════════════════════════
// Aftermath catalog
// ═══════════════════════════════════════════════════════════

export const BOSS_AFTERMATHS: BossAftermath[] = [
    // 1. Returning daughter -- failed: her friend checks in.
    //    succeeded: her brother drops by to thank you.
    {
        id: 'aftermath-returning-daughter',
        afterBossId: 'boss-returning-daughter',
        minNightsLater: 2,
        maxNightsLater: 5,
        onFailure: {
            id: 'aftermath-daughters-friend',
            name: "THE DAUGHTER'S FRIEND",
            mood: 'nervous',
            tag: '娘を探しにきた友人',
            line: "A friend of mine came by here last week. Did she ever make it inside?",
            cards: [
                "She stood at the door. She left without sitting. I am sorry.",
                "We were closed that night",
                "Our signature highball is popular",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...thank you for telling me. I will find her.",
                failure: "...you do not remember anyone, do you.",
            },
            phase: 'late',
            difficulty: 4,
            beat: '傘を持ったまま立っている。座る気はない。',
        },
        onSuccess: {
            id: 'aftermath-daughters-brother',
            name: "THE DAUGHTER'S BROTHER",
            mood: 'regular',
            tag: '姉から聞いて来た弟',
            line: "My sister came in here last week. She would not stop talking about it. I owe you one.",
            cards: [
                "She found what she came for. That is all we did. Sit, on the house.",
                "We do not remember her",
                "Our signature highball is popular",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...then I will not say anything else. Just one drink and I leave.",
                failure: "...forget it. Wrong shop, maybe.",
            },
            phase: 'late',
            difficulty: 3,
            beat: 'コートの袖を気にしている。姉と同じ仕草。',
        },
    },

    // 2. Estranged father -- failed: the bride herself walks in the next week.
    {
        id: 'aftermath-estranged-father',
        afterBossId: 'boss-estranged-father',
        minNightsLater: 5,
        maxNightsLater: 5,
        onFailure: {
            id: 'aftermath-bride-alone',
            name: 'THE BRIDE',
            mood: 'existential',
            tag: '結婚式の翌週、一人で来た',
            line: "I heard my father came here the night before my wedding. Did he say anything about me?",
            cards: [
                "He sat where you are sitting. He did not say your name. He did not have to.",
                "We do not remember him",
                "Our signature cocktail is popular",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...then I will finish what he could not say. Thank you.",
                failure: "...I do not know why I came.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: '結婚指輪に慣れていない。左手を右手で隠している。',
        },
    },

    // 3. War veteran -- failed: an old squadmate comes looking.
    {
        id: 'aftermath-war-veteran',
        afterBossId: 'boss-war-veteran',
        minNightsLater: 3,
        maxNightsLater: 5,
        onFailure: {
            id: 'aftermath-veteran-squadmate',
            name: 'THE SQUADMATE',
            mood: 'existential',
            tag: '同じ部隊にいた男',
            line: "A friend of mine said he came here. I have not heard from him since. Did he drink?",
            cards: [
                "He asked for what Gondo used to pour him. We could not pour it. He left.",
                "He had three whiskeys and a round of sake",
                "Our house sake is famous",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...then I know where to go next. Thank you.",
                failure: "...forget I asked.",
            },
            phase: 'late',
            difficulty: 4,
            beat: '同じ型のリュックを足元に置いた。片手だけテーブルに載せる。',
        },
    },

    // 4. Translator on deadline -- success: her editor stops by, impressed.
    {
        id: 'aftermath-translator-deadline',
        afterBossId: 'boss-translators-deadline',
        minNightsLater: 2,
        maxNightsLater: 2,
        onFailure: {
            id: 'aftermath-translator-editor-late',
            name: 'THE EDITOR',
            mood: 'tired',
            tag: '締め切りを逃した担当編集',
            line: "My translator missed her deadline. She said she sat in your bar for three hours. Did you pour her anything?",
            cards: [
                "Nothing. She asked me not to. I think she needed the silence more than the drink.",
                "I poured her three strong whiskeys",
                "We do not remember her",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...then it was not the bar's fault. Good to know.",
                failure: "...I will bill you the day rate.",
            },
            phase: 'late',
            difficulty: 4,
            beat: 'スマートフォンの画面が赤い。未読メッセージが並んでいる。',
        },
        onSuccess: {
            id: 'aftermath-translator-editor',
            name: 'THE EDITOR',
            mood: 'curious',
            tag: '翻訳者の担当編集',
            line: "My translator turned in the best page of her career this week. She said you did not pour her a drink. Is that true?",
            cards: [
                "She did not need one. She needed a wall to look at.",
                "I poured her our strongest whiskey",
                "We do not talk about customers",
                "Our signature highball is popular",
            ],
            reaction: {
                success: "...then I am sending my next writer to you. Quietly.",
                failure: "...strange place.",
            },
            phase: 'late',
            difficulty: 4,
            beat: 'ゲラをカバンから少しだけ覗かせた。',
        },
    },

    // 5. Photographer -- failed: a tourist walks in with one of her old photos.
    {
        id: 'aftermath-photographer',
        afterBossId: 'boss-the-photographer',
        minNightsLater: 3,
        maxNightsLater: 5,
        onFailure: {
            id: 'aftermath-photo-tourist',
            name: 'THE TOURIST',
            mood: 'curious',
            tag: '古い写真集を持った観光客',
            line: "I bought this photo book at the airport. This bar is on page forty. Is it still the same place?",
            cards: [
                "The photographer came by last week. We could not answer her. That is why the page looks like that.",
                "We are a different bar now",
                "Our signature highball is popular",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...then I am glad I came before page forty-one.",
                failure: "...tourist trap, maybe.",
            },
            phase: 'late',
            difficulty: 3,
            beat: '写真集の四十頁に指を挟んでいる。',
        },
    },

    // 6. Off-duty poet -- failed: his publisher comes in trying to find him.
    {
        id: 'aftermath-off-duty-poet',
        afterBossId: 'boss-off-duty-poet',
        minNightsLater: 4,
        maxNightsLater: 5,
        onFailure: {
            id: 'aftermath-poet-publisher',
            name: 'THE PUBLISHER',
            mood: 'suspicious',
            tag: '詩人の担当を探している',
            line: "My poet has not turned in a line in ten days. He told me this was his bar. Have you seen him?",
            cards: [
                "He came here. I poured him the wrong drink. He has not written since. I am sorry.",
                "We do not know any poets",
                "Our strongest whiskey is popular",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...thank you for being honest. I will find him.",
                failure: "...then he is on his own.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: '薄い原稿の束。表紙に赤いペンが挟まっている。',
        },
    },

    // 7. Mother of a regular -- success: the son himself notices, says nothing.
    {
        id: 'aftermath-mother-of-regular',
        afterBossId: 'boss-mother-of-regular',
        minNightsLater: 3,
        maxNightsLater: 5,
        onSuccess: {
            id: 'aftermath-regular-son',
            name: 'THE SON',
            mood: 'regular',
            tag: '母が来たことを知らない息子',
            line: "Usual. And... did my name end up in the guest book recently? My mother asked a weird question yesterday.",
            cards: [
                "[Slide the book across without speaking. His name is there, dated, twice over.]",
                "Your mother was never here",
                "We do not keep a guest book",
                "Our signature highball is popular",
            ],
            reaction: {
                success: "...ah. ...thank you. That is the answer I wanted.",
                failure: "...never mind. Just the usual, then.",
            },
            phase: 'late',
            difficulty: 4,
            beat: '杖をついている母と、同じ手つきでグラスを置く。',
        },
        onFailure: {
            id: 'aftermath-regular-son-cold',
            name: 'THE SON',
            mood: 'suspicious',
            tag: '母から何か聞いた息子',
            line: "My mother came here last week. She will not tell me what you said. So you tell me.",
            cards: [
                "She asked if you were alright. I said yes. That is all. She believed me.",
                "She asked for her money back",
                "We do not remember her",
                "Our signature highball is popular",
            ],
            reaction: {
                success: "...then I owe her a call. Not you.",
                failure: "...I will find a new bar.",
            },
            phase: 'late',
            difficulty: 5,
            beat: '普段の席には座らない。一度だけカウンターを叩く。',
        },
    },

    // 8. First light -- success: the same customer returns at morning
    //    for several consecutive nights. (Representative one-shot entry;
    //    the "several nights" flavor lives in the line itself.)
    {
        id: 'aftermath-first-light',
        afterBossId: 'boss-first-light',
        minNightsLater: 2,
        maxNightsLater: 4,
        onSuccess: {
            id: 'aftermath-first-light-regular',
            name: 'THE FIRST LIGHT',
            mood: 'regular',
            tag: '毎朝五時、同じ席',
            line: "Same tea. Same seat. I have been here every morning this week. You noticed?",
            cards: [
                "Hot tea. Same cup. I noticed on day one. I just did not say anything.",
                "A strong whiskey to start the day",
                "A full breakfast special",
                "Our most expensive bottle",
            ],
            reaction: {
                success: "...then we have a standing order. Good.",
                failure: "...I will find breakfast elsewhere again.",
            },
            phase: 'closing',
            difficulty: 3,
            beat: '外はもう明るい。同じコート、同じ座り方。',
        },
    },

    // 9. Missing brother -- failed: the brother himself walks in months later.
    {
        id: 'aftermath-missing-brother',
        afterBossId: 'boss-lost-brother',
        minNightsLater: 4,
        maxNightsLater: 5,
        onFailure: {
            id: 'aftermath-lost-brother-himself',
            name: 'THE BROTHER',
            mood: 'existential',
            tag: '姉が探していた本人',
            line: "Someone told me my sister came here looking for me. Did she leave anything?",
            cards: [
                "A photograph. Face down on the counter. She did not take it back. It is still here.",
                "We do not know your sister",
                "Our signature cocktail is popular",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...then I will sit where she sat. Thank you.",
                failure: "...then there is nothing here for me.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: '姉と同じ癖で、ポケットを二度叩いた。',
        },
    },

    // 10. Returning daughter repeat branch -- kept for symmetry with other
    //     long-arc bosses: if failed, the mother drops in much later.
    {
        id: 'aftermath-returning-daughter-mother',
        afterBossId: 'boss-returning-daughter',
        minNightsLater: 5,
        maxNightsLater: 5,
        onFailure: {
            id: 'aftermath-daughters-mother',
            name: "THE DAUGHTER'S MOTHER",
            mood: 'nervous',
            tag: '娘を心配する母',
            line: "My daughter said she stood outside your door and could not walk in. Was it you she asked about?",
            cards: [
                "She asked about her father. He was not here. I did not know what to say. I am sorry.",
                "We do not know your daughter",
                "Our signature highball is popular",
                "The bathroom is on the left",
            ],
            reaction: {
                success: "...thank you for saying it plainly. I will tell her.",
                failure: "...then she was right not to come in.",
            },
            phase: 'closing',
            difficulty: 5,
            beat: '手提げに娘の写真。指輪は結婚指輪一つだけ。',
        },
    },
];
