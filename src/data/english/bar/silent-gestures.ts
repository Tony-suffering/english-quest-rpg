/**
 * Silent Bartender -- silent gestures.
 *
 * Small non-verbal "actions" the bartender performs silently between
 * customers. Can be shown briefly in the ambient strip to add texture,
 * or used as a menu in a future "gestures" mode where the player
 * chooses how to pour, how to set down a glass, etc.
 */

export type GestureKind =
    | 'wipe'        // wipe the counter
    | 'polish'      // polish a glass
    | 'ice-crush'   // crush ice
    | 'nod'         // small head nod
    | 'adjust'      // adjust an object
    | 'check'       // check something discretely
    | 'wait';       // pause, do nothing, breathe

export interface SilentGesture {
    id: string;
    kind: GestureKind;
    text: string;    // brief JP description
    cost: number;    // "energy" units — used in potential future modes
}

export const SILENT_GESTURES: SilentGesture[] = [
    { id: 'wipe-counter', kind: 'wipe', text: 'カウンターを一度、右から左へ拭いた。', cost: 1 },
    { id: 'polish-glass', kind: 'polish', text: 'グラスを一度だけ持ち上げて、布で丁寧に磨いた。', cost: 1 },
    { id: 'ice-crush', kind: 'ice-crush', text: '氷をひとつ、音を立てずに砕いた。', cost: 2 },
    { id: 'nod-to-ghost', kind: 'nod', text: '空いた席に向けて、一度だけ頷いた。', cost: 1 },
    { id: 'adjust-noren', kind: 'adjust', text: '暖簾を少しだけまっすぐに戻した。', cost: 1 },
    { id: 'check-clock', kind: 'check', text: '時計を一度見て、すぐに目を戻した。', cost: 0 },
    { id: 'breath', kind: 'wait', text: '一度、深く息を吸って、吐いた。', cost: 0 },
    { id: 'wipe-corner', kind: 'wipe', text: 'カウンターの右端の傷を、布で一度撫でた。', cost: 1 },
    { id: 'straighten-cups', kind: 'adjust', text: 'お猪口の並びを、一つだけ直した。', cost: 1 },
    { id: 'listen-to-door', kind: 'check', text: '扉の方を、一瞬だけ見た。', cost: 0 },
    { id: 'bow-slight', kind: 'nod', text: '次の客が座る前に、ほんの少しだけ頭を下げた。', cost: 1 },
    { id: 'wait-for-customer', kind: 'wait', text: '何もせずに、ただそこに立っていた。', cost: 0 },
    { id: 'polish-tray', kind: 'polish', text: '盆の縁を、指で軽くなぞった。', cost: 1 },
];

export function pickGesture(kind?: GestureKind): SilentGesture {
    const pool = kind ? SILENT_GESTURES.filter(g => g.kind === kind) : SILENT_GESTURES;
    return pool[Math.floor(Math.random() * pool.length)];
}
