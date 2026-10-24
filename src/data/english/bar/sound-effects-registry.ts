/**
 * Silent Bartender -- SFX registry.
 *
 * Reference table of every synthesized sound in the game, with
 * human-readable character notes. Not used at runtime — kept as
 * content index for creators adding new sounds.
 */

export interface SfxEntry {
    fn: string;         // function name in ambient-audio.ts
    label: string;
    character: string;
    triggerNote: string;
}

export const SFX_REGISTRY: SfxEntry[] = [
    {
        fn: 'playClink',
        label: 'クリンク',
        character: '細い高音のグラス鳴り。2つのトライアングル波の重ね合わせ。',
        triggerNote: '正解カードを選んだ直後。',
    },
    {
        fn: 'playSoftChime',
        label: 'ソフトチャイム',
        character: '一音の柔らかいサイン波。約500ms。',
        triggerNote: '客の入店時。',
    },
    {
        fn: 'playStingDown',
        label: 'スティング・ダウン',
        character: 'ピッチが下がる短い不協和音。約350ms。',
        triggerNote: '不正解カードを選んだ時。',
    },
    {
        fn: 'playFootsteps',
        label: '足音',
        character: '低音のサイン波+ノイズクリック、4拍で加減速。',
        triggerNote: '客の入店/退店。direction 引数で速度が変わる。',
    },
    {
        fn: 'playNorenFlap',
        label: '暖簾の揺れ',
        character: 'ピンクノイズをバンドパスで整形、布が落ち着く感触。',
        triggerNote: '客の入店時、チャイムの直前。',
    },
    {
        fn: 'playIceDrop',
        label: '氷の落下',
        character: '3kHzの鋭いクリック+フィードバックディレイの余韻。',
        triggerNote: 'ナイト開始時 + ランダム雰囲気イベント時。',
    },
    {
        fn: 'playPaperCrumple',
        label: '紙の擦れ',
        character: '4段エンベロープのピンクノイズ、バンドパスが漂う。',
        triggerNote: '不正解時、stingDown と並行。',
    },
    {
        fn: 'playGlassSet',
        label: 'グラス置き',
        character: '低音サインの thud + 2.1kHzのトライアングル tick (10ms遅れ)。',
        triggerNote: '正解時、clinkの約220ms後。',
    },
    {
        fn: 'playGondoCough',
        label: '権藤の咳',
        character: 'ホワイトノイズを500/1200Hzのフォルマントバンドパスで整形。',
        triggerNote: 'GondoBust の表示時。',
    },
];

export function getSfxEntry(fn: string): SfxEntry | undefined {
    return SFX_REGISTRY.find(e => e.fn === fn);
}
