/**
 * Silent Bartender -- player-facing error messages.
 *
 * When something breaks (mic denied, storage full, etc), show
 * friendly in-universe messaging instead of raw errors.
 */

export const ERROR_MESSAGES = {
    micDenied: {
        title: 'マイクが使えない',
        body: 'マイクの許可がなくても、ゲームは遊べる。\nただし、権藤の幽霊は出てこない。\n静かに遊ぶのも、また一つの夜。',
    },
    storageDenied: {
        title: 'データが保存できない',
        body: 'ブラウザの設定でデータ保存が制限されている。\n今夜の記録は、朝を待たずに消える。\nそれでも、夜は夜だ。',
    },
    audioDenied: {
        title: '音が出ない',
        body: 'ブラウザの音声再生がブロックされているかも。\n無音の店でも、客は来る。',
    },
    offline: {
        title: '接続が途切れた',
        body: '外のネットワークが不安定なようだ。\nカウンターの向こう側には、それでも客がいる。\nゲームは続けられる。',
    },
    dataCorrupt: {
        title: 'データが壊れた',
        body: '店の古い記録が、少し読めなくなっている。\n新しく始めてみよう。昨日の夜も、いつかは戻る。',
    },
    unknownError: {
        title: '何かがずれている',
        body: '店の中で、何かが普段と違う気がする。\nページを再読み込みして、もう一度試してみよう。',
    },
} as const;

export type ErrorKey = keyof typeof ERROR_MESSAGES;

export function getError(key: ErrorKey): { title: string; body: string } {
    return ERROR_MESSAGES[key];
}
