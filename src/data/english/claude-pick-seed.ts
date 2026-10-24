/**
 * Claude's Pick -- Claude が自分の判断で選ぶ「今日のネイティブ英語」
 * /english/podcast (Podcast Harvest) と同じ型。違いは "誰が選ぶか"。
 * ここは Claude が編集者として、覚える価値のある native 表現を毎日キュレーションする。
 * 1 テーマ / 日 -- 10 表現 (before/after の文脈つき)。
 */

export interface PodcastSource {
    date: string;
    show: string;
    title: string;
    youtubeId: string;
    url: string;
    tagline: string;
}

export interface PodcastEntry {
    daySlot: number;
    expression: string;
    contextBefore: string;
    target: string;
    contextAfter: string;
    note: string;
    rank: 'S' | 'A' | 'B' | 'C';
    month?: string;
}

// ─── 2026-05-20 : 働く一日をネイティブはこう話す ───
const SOURCE_05_20: PodcastSource = {
    date: '2026-05-20',
    show: "Claude's Pick",
    title: '働く一日を、ネイティブはこう話す',
    youtubeId: '',
    url: '',
    tagline: 'DMMで「grinding day」「finishing job」で詰まったとにお向けに、Claude が選んだ初日。仕事・疲れ・しんどい一日を自然に話す native の言い回し10連発。教科書の "I am tired" を捨てる日。',
};

export const CLAUDE_PICK_SOURCE_BY_DATE: Record<string, PodcastSource> = {
    '2026-05-20': SOURCE_05_20,
};

export const CLAUDE_PICK_SEEDS: PodcastEntry[] = [
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'S',
        expression: 'running on fumes',
        contextBefore: `Friend: You look exhausted. Long day?`,
        target: `Honestly, I'm running on fumes. I've been going since 6 a.m.`,
        contextAfter: `Friend: Go home. Seriously.`,
        note: `ガス欠寸前。気力も体力も残ってない状態。"I'm tired" の何倍も伝わる、仕事終わりの定番。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'S',
        expression: 'it was a grind',
        contextBefore: `Coworker: How'd the job go today?`,
        target: `It was a grind, man. Nothing went wrong -- it was just long.`,
        contextAfter: `Coworker: Those are the worst kind.`,
        note: `「しんどい一日だった」。事件はないけど、ただただ長くて削られる日。DMMで言った "grinding day" より会話で自然なのはこっち。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'A',
        expression: "I'm the last guy in",
        contextBefore: `Client: So what part of the build do you handle?`,
        target: `I'm the last guy in -- the finishing work. Wallpaper, floors, the stuff you actually see.`,
        contextAfter: `Client: Ah, so you're the one who makes it look good.`,
        note: `自分の役割を一言で立てる言い方。"finishing job" を説明するより、これ一発で職種が伝わってプロっぽい。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'A',
        expression: 'sweating buckets',
        contextBefore: `Friend: How hot was it out there?`,
        target: `Brutal. I was sweating buckets by 9 a.m.`,
        contextAfter: `Friend: And you were working in that?`,
        note: `大量に汗をかく。"sweating a lot" の口語版。暑さの話で必ず効く。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'S',
        expression: 'call it a day',
        contextBefore: `Coworker: It's almost six. You want to keep going?`,
        target: `Nah, let's call it a day. We'll pick it up tomorrow.`,
        contextAfter: `Coworker: Works for me.`,
        note: `「今日はここまでにしよう」。仕事を切り上げる超定番。現場でも会議でも使える。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'A',
        expression: 'my back is killing me',
        contextBefore: `Friend: You're walking funny.`,
        target: `My back is killing me. I was bent over tiling all day.`,
        contextAfter: `Friend: You need a hot bath.`,
        note: `体の部位 + "is killing me" で「〜が痛くてたまらない」。肉体労働の友。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'A',
        expression: "I'll take the win",
        contextBefore: `Coworker: We only finished one room today.`,
        target: `One room, done right. I'll take the win.`,
        contextAfter: `Coworker: Fair enough.`,
        note: `小さな成果でも「よし、それで十分」と前向きに回収する言い方。自虐の逆ギア。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'B',
        expression: "it's a marathon, not a sprint",
        contextBefore: `Friend: You're not burning out doing all this?`,
        target: `I try not to. It's a marathon, not a sprint.`,
        contextAfter: `Friend: Smart. Pace yourself.`,
        note: `「短距離じゃなく長距離」。無理せず長く続ける、を一言で。英語学習そのものにも刺さる。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'S',
        expression: "I'm wiped",
        contextBefore: `Friend: Want to grab a drink?`,
        target: `Can't tonight -- I'm wiped. Rain check?`,
        contextAfter: `Friend: No worries. Next time.`,
        note: `「もうクタクタ」。"I'm wiped" / "I'm wiped out"。誘いを断る時に角が立たない。"rain check" は「また今度」。`,
    },
    {
        daySlot: 20,
        month: '2026-05',
        rank: 'B',
        expression: 'same grind, different day',
        contextBefore: `Coworker: How's it going?`,
        target: `Eh -- same grind, different day. You know how it is.`,
        contextAfter: `Coworker: Don't I know it.`,
        note: `「いつも通りの日々」を、ちょっと自嘲気味に。"same old, same old" の働く人バージョン。`,
    },
];
