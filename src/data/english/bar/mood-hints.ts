/**
 * Silent Bartender -- subtle mood hints.
 *
 * Very brief physical descriptions that can be shown alongside a
 * customer's `tag` to hint at their mood, for players who need a
 * little help reading. Opt-in via a "hints on" setting.
 *
 * Key = Mood, value = short JP description (one hand-gesture-sized
 * clue).
 */

import type { Mood } from './types';

export const MOOD_HINTS: Partial<Record<Mood, string[]>> = {
    tired: [
        '肩がいつもより一段下がっている',
        '目の下にうっすら隈が残っている',
        'コートを脱ぐ動作が二拍遅い',
    ],
    'first-time': [
        '入口で暖簾の裏側を一度見ている',
        '財布を開ける前に、財布を探している',
        'メニューの文字を指でなぞっている',
    ],
    homesick: [
        'スマホに映る写真を2秒だけ見てから消した',
        '席に座る前に、一度遠くを見た',
        '手袋を外すのが早い、中の体温を早く感じたい顔',
    ],
    drunk: [
        '椅子に座るのに、カウンターに手をついた',
        '声量の調整が崩れている',
        '笑い声が一テンポ大きい',
    ],
    heartbroken: [
        '手が何度も、見えないものを探している',
        '目が一点を、少し長く見つめすぎる',
        '財布の位置を確認する癖、今夜は二回',
    ],
    alien: [
        '右の靴と左の靴が、微妙に違う',
        '肩の上から、何かを払いたがっている',
        '瞬きの速さが、人のリズムじゃない',
    ],
    ghost: [
        '椅子を引く音がしない',
        '影が壁と少しズレて見える',
        '息の白さが周りより薄い',
    ],
    edo: [
        '鞘に手をかけるような動きを一度する',
        '背筋が、今の人より真っ直ぐ立っている',
        '湯呑みを両手で包む持ち方が、現代的じゃない',
    ],
    dog: [
        '尻尾の位置が、感情の指標',
        '首を傾げる角度が一定じゃない',
        '鼻が、カウンターの縁を一度だけ擦る',
    ],
    regular: [
        '迷わず特定の席に向かう',
        '挨拶より先に、自分のコートを掛ける場所を見ている',
        '「いつもの」を言う前の、一拍の沈黙',
    ],
    celebrating: [
        '笑顔より先に、誰かを探す目つきをしている',
        '乾杯の相手を探している、いないのに',
        'コートの中に、贈り物らしき包み',
    ],
    suspicious: [
        '入ってから、出口の位置を二回確認している',
        '鞄の持ち方が、左手に集中している',
        '椅子の向きを、斜めに直している',
    ],
    nervous: [
        '手のひらをズボンで二度拭いた',
        '財布を出す順番を間違えそうになった',
        '声をかける前に、言葉を頭の中で練習している気配',
    ],
    existential: [
        '席に座る時、空を見上げる',
        '自分の手を、他人のもののように見ている',
        'カウンターの木目を、長く指でなぞっている',
    ],
    'late-night': [
        '時計を見てから、時計を忘れた顔をする',
        '椅子に座る動作が、体重を預ける速度',
        '誰も待っていない家のことを、目が思い出している',
    ],
    curious: [
        '隣の席の料理を横目で見ている',
        'メニューを最後まで読もうとしている',
        '店内の装飾を、入ってきた時に全部見回した',
    ],
    smug: [
        '座る前に、カウンターに指を走らせてから座る',
        '他の客を一度ゆっくり見渡した',
        'コートを脱ぐ動作に、少し見せる要素がある',
    ],
    angry: [
        'ドアを閉める時の力が、必要より少し強い',
        '財布をカウンターに置くのではなく、置く寸前で止める',
        '呼吸の長さが不均一',
    ],
    romantic: [
        '誰かを待っている姿勢。席を二つ見ている',
        'コートのボタンを、座る前に外し終わっていた',
        '手の動きが、相手のための空間を作っている',
    ],
};

/** Pick a hint for a mood, or null if none defined. */
export function pickMoodHint(mood: Mood): string | null {
    const pool = MOOD_HINTS[mood];
    if (!pool || pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}
