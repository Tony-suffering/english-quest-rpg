/**
 * Silent Bartender -- fragments of the BAR itself.
 *
 * Different from gondo-fragments.ts (about Gondo). These are about
 * the PLACE. The wood, the lights, the way the shop changes over
 * time. Unlocked by different kinds of play.
 */

import type { PlayerStats } from '@/lib/english/bar/storage';

export interface BarFragment {
    id: string;
    title: string;
    body: string;
    unlock: (stats: PlayerStats) => boolean;
}

export const BAR_FRAGMENTS: BarFragment[] = [
    {
        id: 'bar-frag-the-wood',
        title: 'カウンターの木',
        body:
            'カウンターの木は、欅(けやき)の一枚板だ。\n' +
            '権藤の師匠が、ある古民家から譲り受けたもの。\n' +
            '油と手垢が染み込んで、今の色になるまでに、30年かかった。',
        unlock: (s) => s.totalNights >= 5,
    },
    {
        id: 'bar-frag-the-lights',
        title: '天井の電球',
        body:
            '天井の電球は3つ。\n' +
            '一番奥のものが、他の2つより少し暖色寄り。\n' +
            '権藤が「あの席の客のため」と言って、わざわざ違う色を選んだ。',
        unlock: (s) => s.totalNights >= 8,
    },
    {
        id: 'bar-frag-the-door',
        title: '扉と暖簾',
        body:
            '扉は引き戸。木と曇りガラスの組み合わせ。\n' +
            '暖簾は紺色で、屋号は染め抜かれていない。\n' +
            '「名前は客がつける」と権藤は言ったが、つけた客はいない。',
        unlock: (s) => s.totalNights >= 12,
    },
    {
        id: 'bar-frag-the-counter-scratch',
        title: 'カウンターの傷',
        body:
            'カウンターの右端に、小さな十字の傷がある。\n' +
            '誰がつけたかは誰も知らない。\n' +
            '権藤も「気づいたらあった」としか言わない。',
        unlock: (s) => s.totalNights >= 20,
    },
    {
        id: 'bar-frag-the-chair',
        title: '奥のスツール',
        body:
            '奥のスツールは、他より少しだけ座面が低い。\n' +
            '権藤の師匠の友人が毎週日曜に座っていた席だ。\n' +
            '亡くなった後も、誰も高さを直そうとしない。',
        unlock: (s) => s.totalNights >= 25,
    },
    {
        id: 'bar-frag-the-mirror',
        title: '奥の鏡',
        body:
            'カウンターの奥の鏡は、斜めに掛けられている。\n' +
            '権藤が自分の顔が映らない角度にわざと調整した、という話もあれば、\n' +
            '揺れた時にそうなったまま、とも言う。両方本当かもしれない。',
        unlock: (s) => s.totalNights >= 35,
    },
    {
        id: 'bar-frag-the-air',
        title: '店の空気',
        body:
            '冬、扉を開けた瞬間、外の冷気が一気に入ってくるが、\n' +
            '3秒で店の空気に馴染む。\n' +
            'その3秒の境目に、客は一人一人、表情を変える。',
        unlock: (s) => s.totalNights >= 45,
    },
    {
        id: 'bar-frag-the-smell',
        title: '店の匂い',
        body:
            '店の匂いは、醤油と炭と古い木の匂い。\n' +
            '客が服についたまま帰り、次の夜に別の服で来ても、少し残っている。\n' +
            '「あの店の匂い」と常連は呼ぶ。',
        unlock: (s) => s.totalNights >= 60,
    },
    {
        id: 'bar-frag-the-silence',
        title: '店の静けさ',
        body:
            '営業中でも、この店には独特の静けさがある。\n' +
            '人はいるのに、声は控えめ。それは権藤の空気。\n' +
            'お前がその空気を引き継ぐかは、この一年で決まる。',
        unlock: (s) => s.totalNights >= 90,
    },
];

export function getUnlockedBarFragments(stats: PlayerStats): BarFragment[] {
    return BAR_FRAGMENTS.filter(f => f.unlock(stats));
}
