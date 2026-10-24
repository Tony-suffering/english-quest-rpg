/**
 * Silent Conflicts at the Counter.
 * Six scenes in which two customers share an unspoken grudge,
 * and Gondo intervenes without a single word — a glass moved,
 * a kettle lit, a radio nudged. The apprentice watches the
 * choreography and learns to name the small craft in themselves.
 */

export interface SilentConflict {
    id: string;
    participants: string;
    tension: string;
    gondosAct: string;
    outcome: string;
    apprenticesTakeaway: string;
}

export const SILENT_CONFLICTS: SilentConflict[] = [
    {
        id: 'conflict-carpenter-apprentice',
        participants: '老いた大工と、二十年前に店を出た元弟子',
        tension: '二人はカウンターの端と端に座り、一度も目を合わせない。\n元弟子の肩が、老人の咳払いのたびにわずかに上がる。\n沈黙は湿っていて、空気の密度が変わったのが分かる。',
        gondosAct: '権藤は元弟子の前の猪口をそっと一つ右へずらし、\n老大工の手元にあった徳利を黙って下げ、\n冷や酒を一合だけ、二人の中間の位置に置き直した。',
        outcome: '元弟子が先に徳利へ手を伸ばし、老大工の猪口に注いだ。\n礼も謝罪もない。だが肩の線が、同じ高さに戻っていた。',
        apprenticesTakeaway: '「間合いは、物の位置で描ける」と俺は胸の内でつぶやいた。',
    },
    {
        id: 'conflict-sisters-inheritance',
        participants: '遺産で揉めた姉妹。半年ぶりに同じ店で鉢合わせ',
        tension: '姉はメニューをずっと読み続け、妹は窓の雨だけを見ている。\n距離は三席分。どちらも相手の側の空気を吸うまいとしている。\n誰かが口を開けば、針が落ちる音さえ刺さるだろう。',
        gondosAct: '権藤は季節の小鉢――菜の花のおひたしを一皿、\n姉と妹のちょうど真ん中の席の前に、静かに置いた。\n二人のあいだに、小さな山が生まれた。',
        outcome: '視線が菜の花で遮られ、互いの横顔が見えなくなる。\n姉は箸を取り、妹は猪口を置き、呼吸の間隔だけが少し伸びた。',
        apprenticesTakeaway: '「遮るための皿がある」と、俺は棚の小鉢を見直した。',
    },
    {
        id: 'conflict-landlord-tenant',
        participants: '立ち退きを迫った大家と、去年追い出された元店子',
        tension: '元店子はコートも脱がず、徳利を握りしめたまま動かない。\n大家は煙草を取り出し、ライターを三度空打ちしている。\n火をつけた瞬間、何かが始まってしまう気配がある。',
        gondosAct: '権藤は、まだ半分しか吸われていない大家の灰皿を、\nわざと早めに新しいものへ取り替え、\n灰皿の縁を指でこつ、と一度だけ鳴らした。',
        outcome: '大家の手が止まり、煙草は箱に戻された。\n元店子の指がゆるみ、徳利の首が少しだけ傾いた。',
        apprenticesTakeaway: '「動作を一つ挟むと、言葉は引っ込む」と俺は覚えた。',
    },
    {
        id: 'conflict-old-bandmates',
        participants: '解散したバンドの元リーダーと、抜けたベース',
        tension: 'リーダーはしきりに指でカウンターを叩き、\nベースはそのリズムに絶対に乗るまいと、わざとずらして呼吸する。\n二十年前の四拍子が、まだ二人の間で鳴り止んでいない。',
        gondosAct: '権藤はラジオのつまみを、ほんの一目盛りだけ右へ回した。\n低く流れていた演歌が、カウンターの叩く音を覆う音量になり、\n指のリズムは、ラジオの中に吸い込まれていった。',
        outcome: 'リーダーの指が止まり、ベースの肩からも力が抜ける。\n二人は同じ曲のサビで、ほぼ同時に猪口を口へ運んだ。',
        apprenticesTakeaway: '「音は、音で消すしかない時がある」と俺は耳を澄ませた。',
    },
    {
        id: 'conflict-widower-mistress',
        participants: '去年妻を亡くした男と、その妻のかつての親友',
        tension: '男は妻の写真が入った財布を、開いたまま伏せてある。\n親友は彼の隣に座ったきり、注文の声が喉で止まっている。\n二人の間には、生者には触れられない名前が一つ、置かれている。',
        gondosAct: '権藤は二人が頼んでいない、亡き妻が好んだという\n古い銘柄の純米を、ぬる燗でひと口分だけ、\n席の中央に一つの猪口で置いた。誰の前でもない場所に。',
        outcome: '男がそれを先に取り、一口だけ含んで親友の前に戻した。\n親友は同じ猪口で、同じだけ飲み、黙って息を吐いた。',
        apprenticesTakeaway: '「注文されない酒を出す勇気」を、俺は棚に書き留めた。',
    },
    {
        id: 'conflict-rival-shopkeepers',
        participants: '商店街で客を奪い合ってきた、向かいの店主同士',
        tension: '二人は背中を預けるようにして、別々の壁を向いて座っている。\n暖簾の外の話題が出かかるたび、どちらかが咳で打ち消す。\n帳簿の数字が、湯気の向こうに透けて見える気さえする。',
        gondosAct: '権藤は奥の小窓の障子を、音を立てずに静かに閉め、\n外の商店街の灯りを遮り、\nそれから鉄瓶を、わざと少し大きな音で火にかけた。',
        outcome: '外の景色が消え、湯が沸く音だけが店を満たす。\n二人の背中は、同じ湯気の下で、初めて同じ方向へ傾いた。',
        apprenticesTakeaway: '「景色を一枚抜くだけで、話題は変わる」と俺は障子を見た',
    },
];

export function pickSilentConflict(): SilentConflict {
    const index = Math.floor(Math.random() * SILENT_CONFLICTS.length);
    return SILENT_CONFLICTS[index]!;
}
