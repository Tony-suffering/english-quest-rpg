/**
 * Silent Bartender -- memorable moments.
 *
 * Small callouts generated after a night that highlight specific
 * narrative beats the player triggered, without spoiling. Shown in
 * the result summary if relevant.
 *
 * Each moment has a `condition` that is evaluated post-night against
 * the night's customer ids + outcomes.
 */

import type { NightResult } from '@/lib/english/bar/storage';

export interface NightMoment {
    id: string;
    /** short JP line shown in the result summary if condition matches */
    text: string;
    condition: (night: NightMomentContext) => boolean;
}

export interface NightMomentContext {
    servedIds: string[];   // customer ids successfully served this night
    failedIds: string[];   // customer ids failed or timed out this night
    allIds: string[];      // every customer seen this night (in order)
    result: NightResult;
}

const has = (arr: string[], id: string) => arr.includes(id);

export const NIGHT_MOMENTS: NightMoment[] = [
    {
        id: 'dog-returned',
        text: '犬は静かに水を飲んで、帰っていった。',
        condition: (c) => has(c.servedIds, 'the-dog'),
    },
    {
        id: 'ghost-served',
        text: '幽霊の常連は、黙って暖簾をくぐって出て行った。',
        condition: (c) => has(c.servedIds, 'ghost') || has(c.servedIds, 'nobody-visible'),
    },
    {
        id: 'widow-tuesday',
        text: '火曜日の客は、帰り際に小さく頷いた。',
        condition: (c) => has(c.servedIds, 'ghosts-widow'),
    },
    {
        id: 'heartbroken-thread',
        text: '彼は一杯だけで帰った。妻は誰にも告げず、後から来た。',
        condition: (c) => has(c.servedIds, 'heartbroken') && has(c.servedIds, 'the-wife'),
    },
    {
        id: 'dog-owner-reunion',
        text: '犬の飼い主は、犬の水皿を見つけてしばらく動かなかった。',
        condition: (c) => has(c.servedIds, 'the-dog') && has(c.servedIds, 'dogs-owner'),
    },
    {
        id: 'mirror-glimpse',
        text: '一瞬、自分と同じ顔の客が、窓の外を通った。',
        condition: (c) => has(c.servedIds, 'former-self') || has(c.servedIds, 'egg-mirror-customer'),
    },
    {
        id: 'edo-respect',
        text: 'その侍は、ゆっくりと湯呑みを置き、深く一度頭を下げた。',
        condition: (c) => has(c.servedIds, 'edo-timer'),
    },
    {
        id: 'alien-transmission',
        text: '宇宙人は、帰り際に手のひらを天井に向けて、何かを伝達した。',
        condition: (c) => has(c.servedIds, 'alien'),
    },
    {
        id: 'daughters-wait',
        text: 'あの娘は、父親のメモをそっと残して帰った。',
        condition: (c) => has(c.servedIds, 'boss-returning-daughter') || has(c.servedIds, 'gondos-daughter'),
    },
    {
        id: 'critic-pen',
        text: '評論家はペンを動かさず、ただ一口だけ飲んで出て行った。',
        condition: (c) => has(c.servedIds, 'boss-the-critic') || has(c.servedIds, 'critics-assistant'),
    },
    {
        id: 'the-poet',
        text: '詩人は、席を立つ前に一行書いた。それは読めなかった。',
        condition: (c) => has(c.servedIds, 'boss-off-duty-poet'),
    },
    {
        id: 'shutout-night',
        text: '一滴の「ありがとう」も聞こえない夜だった。',
        condition: (c) => c.result.success === 0 && !c.result.busted,
    },
    {
        id: 'perfect-veteran',
        text: '完璧な夜だ。マスターが「認めてやる」と言うわけだ。',
        condition: (c) => c.result.success >= 7 && c.result.failed === 0 && !c.result.busted,
    },
    {
        id: 'dog-plus-owner',
        text: '犬とその飼い主、一夜のうちに両方が暖簾をくぐった。偶然ではない気がする。',
        condition: (c) => has(c.servedIds, 'the-dog') && has(c.servedIds, 'dogs-owner'),
    },
    {
        id: 'sisters-reunion',
        text: '姉は、今夜兄と会えたのだろうか。それは誰にも分からない。',
        condition: (c) => has(c.servedIds, 'boss-sister-after-twenty-years'),
    },
    {
        id: 'baker-departure',
        text: 'パン職人は、小麦粉の匂いを残して出て行った。朝の仕事は間に合うだろう。',
        condition: (c) => has(c.servedIds, 'boss-baker-at-midnight'),
    },
    {
        id: 'defector-first-sip',
        text: '新しい名前で飲んだ最初の水。それを見届ける夜だった。',
        condition: (c) => has(c.servedIds, 'boss-defector'),
    },
    {
        id: 'three-moods-in-one-night',
        text: '三つの気分の客が一夜で並んだ。カウンターは、ひとつの世界の標本になっていた。',
        condition: (c) => {
            const moods = new Set<string>();
            // Derived from servedIds mapping to mood is too costly; proxy with reaching 3 successes
            return c.result.success >= 3 && !c.result.busted;
        },
    },
    {
        id: 'mother-answered',
        text: '常連の母は、息子が元気だと確認して、杖の音と共に帰って行った。',
        condition: (c) => has(c.servedIds, 'boss-mother-of-regular'),
    },
    {
        id: 'photographer-shutter',
        text: '写真家はシャッターを一度も押さなかった。この店も、彼女の記憶に残る。',
        condition: (c) => has(c.servedIds, 'boss-the-photographer'),
    },
    {
        id: 'poet-second-line',
        text: '詩人は二行目を書いた、という確信がある。原稿は置いていかなかったけれど。',
        condition: (c) => has(c.servedIds, 'boss-off-duty-poet'),
    },
    {
        id: 'translator-word-found',
        text: '翻訳者は、最後の一文を置いて行った。朝九時の締め切りには間に合うだろう。',
        condition: (c) => has(c.servedIds, 'boss-translators-deadline'),
    },
    {
        id: 'first-light-regular',
        text: '明け方の最初の客が、今日も来た。日課ができたようだ。',
        condition: (c) => has(c.servedIds, 'boss-first-light'),
    },
];

export function collectMoments(ctx: NightMomentContext): NightMoment[] {
    return NIGHT_MOMENTS.filter(m => m.condition(ctx));
}
