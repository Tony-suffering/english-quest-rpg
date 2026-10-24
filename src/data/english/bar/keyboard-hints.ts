/**
 * Silent Bartender -- keyboard hints.
 *
 * Additional keyboard shortcuts beyond what's currently used.
 * A reserve of future key bindings with proposed behavior, so
 * accessibility and power-user features can be added consistently.
 */

export interface KeyboardHint {
    key: string;
    label: string;   // JP, what it does
    scope: 'global' | 'decide' | 'journal' | 'stats' | 'intro';
    implemented: boolean;
}

export const KEYBOARD_HINTS: KeyboardHint[] = [
    { key: '1-5', label: 'カードを選ぶ', scope: 'decide', implemented: true },
    { key: 'Tab', label: 'カードをフォーカス移動', scope: 'decide', implemented: true },
    { key: 'Arrow', label: 'フォーカス移動', scope: 'decide', implemented: true },
    { key: 'Enter', label: 'フォーカス中のカードを確定', scope: 'decide', implemented: true },
    { key: 'Escape', label: 'フォーカス解除', scope: 'decide', implemented: true },
    { key: 'M', label: '音を切る / 出す', scope: 'global', implemented: true },
    { key: '?', label: 'ヘルプを開く / 閉じる', scope: 'global', implemented: true },
    { key: 'S', label: '統計を開く', scope: 'intro', implemented: false },
    { key: 'J', label: '権藤の手帳を開く', scope: 'intro', implemented: false },
    { key: 'Space', label: '次のビートへ進める', scope: 'global', implemented: false },
    { key: 'R', label: '夜をリスタート', scope: 'global', implemented: false },
    { key: 'C', label: 'キャラクター切替 (Lisa可能時)', scope: 'intro', implemented: false },
];

export function getImplementedKeys(): KeyboardHint[] {
    return KEYBOARD_HINTS.filter(k => k.implemented);
}

export function getPlannedKeys(): KeyboardHint[] {
    return KEYBOARD_HINTS.filter(k => !k.implemented);
}
