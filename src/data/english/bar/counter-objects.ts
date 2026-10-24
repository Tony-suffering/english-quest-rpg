/**
 * Silent Bartender -- what's actually on the counter.
 *
 * Every physical object the apprentice might notice during a night.
 * Use in flavor text or the counter-ambience SVG.
 */

export interface CounterObject {
    id: string;
    name: string;     // JP
    detail: string;   // small observation
    age: 'new' | 'worn' | 'old' | 'very-old';
}

export const COUNTER_OBJECTS: CounterObject[] = [
    { id: 'ladle', name: 'お玉', detail: '柄が少し曲がっている。20年前に買ったもの。', age: 'very-old' },
    { id: 'apron', name: '前掛け', detail: '権藤の師匠から受け継いだ。糊の跡が3代分ついている。', age: 'very-old' },
    { id: 'guest-book', name: '客名帳', detail: 'カウンターの奥に置いてある。権藤は絶対に開かない。', age: 'very-old' },
    { id: 'sake-cups', name: 'お猪口', detail: '12個揃っているはずが、今夜は11個。1つは行方不明。', age: 'old' },
    { id: 'ice-pick', name: 'アイスピック', detail: '柄が桜の木。誰も使い方を間違えない。', age: 'old' },
    { id: 'towel', name: 'ふきん', detail: '毎夜洗うが、角が少しだけほつれている。', age: 'worn' },
    { id: 'menu-board', name: 'お品書き', detail: 'チョークで書いてある。「本日のおすすめ」は消された跡がまだ残っている。', age: 'worn' },
    { id: 'ashtray', name: '灰皿', detail: '昔はもっと使われた。今はデザインのためだけに置かれている。', age: 'old' },
    { id: 'cash-box', name: 'レジ', detail: 'アナログ。数字の「6」のキーだけ色が違う。', age: 'old' },
    { id: 'shelf-top', name: '棚の最上段', detail: '手が届く客はいない。30年前のウイスキーが置かれている。', age: 'very-old' },
    { id: 'calendar', name: 'カレンダー', detail: '毎年同じ酒造メーカーから送られてくる。今年のは新品。', age: 'new' },
    { id: 'cat-dish', name: '皿', detail: '浅く、端が欠けている。犬用ではないが、犬用にも使われる。', age: 'old' },
    { id: 'noren', name: '暖簾', detail: '紺色、屋号は染め抜かれていない。風でよく揺れる。', age: 'worn' },
    { id: 'photograph', name: '写真', detail: '棚の奥、額に入った古い写真。権藤の若い頃らしいが、誰も本人確認はしない。', age: 'very-old' },
    { id: 'radio', name: 'ラジオ', detail: '使っていない。電源は入るが、誰もつけない。', age: 'old' },
    { id: 'scissors', name: 'ハサミ', detail: '包装紙を切るため。年に二回しか使わない。', age: 'worn' },
    { id: 'salt-dish', name: '塩入れ', detail: '商売繁盛の盛り塩。毎朝作り直す。', age: 'new' },
    { id: 'letter-box', name: '手紙入れ', detail: 'カウンターの奥、客が残していった手紙が入っている。権藤は全部読んだ、たぶん。', age: 'old' },
];

export function pickCounterObject(seed?: number): CounterObject {
    const s = seed ?? Date.now();
    return COUNTER_OBJECTS[s % COUNTER_OBJECTS.length];
}
