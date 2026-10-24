/**
 * Silent Bartender -- Tokyo neighborhoods.
 *
 * A light geographic overlay: each customer (when they mention it)
 * is from somewhere in the wider Tokyo ecosystem. Exposed as a
 * lookup + a sampler for ambient mentions in flavor text.
 */

export interface Neighborhood {
    id: string;
    name: string;
    kanji: string;
    flavor: string;  // one-line description (JP)
    vibe: 'office' | 'residential' | 'artsy' | 'old-tokyo' | 'foreign' | 'edge';
}

export const NEIGHBORHOODS: Neighborhood[] = [
    { id: 'shimokitazawa', name: 'Shimokitazawa', kanji: '下北沢', flavor: '古着と古書、小さな劇場、終電後もどこか賑やかな夜', vibe: 'artsy' },
    { id: 'shinjuku', name: 'Shinjuku', kanji: '新宿', flavor: 'ネオンとサラリーマンと終電と、全ての世代の混ざり合い', vibe: 'office' },
    { id: 'ginza', name: 'Ginza', kanji: '銀座', flavor: 'ガラス張りと、閉店後の重厚な照明の影', vibe: 'office' },
    { id: 'asakusa', name: 'Asakusa', kanji: '浅草', flavor: '観光客、線香、提灯、古い夜の匂い', vibe: 'old-tokyo' },
    { id: 'roppongi', name: 'Roppongi', kanji: '六本木', flavor: '外交官と海外駐在員、夜中にも通じる英語', vibe: 'foreign' },
    { id: 'kichijoji', name: 'Kichijoji', kanji: '吉祥寺', flavor: '井の頭公園、古着屋、若い家族と年配の常連', vibe: 'residential' },
    { id: 'shibuya', name: 'Shibuya', kanji: '渋谷', flavor: '人と音と、忘れられる夜', vibe: 'edge' },
    { id: 'nakano', name: 'Nakano', kanji: '中野', flavor: 'サブカルチャーと深夜営業の小さな店', vibe: 'artsy' },
    { id: 'koenji', name: 'Koenji', kanji: '高円寺', flavor: 'バンドマン、古着、立ち飲み屋、金曜の夜は特に騒がしい', vibe: 'artsy' },
    { id: 'ebisu', name: 'Ebisu', kanji: '恵比寿', flavor: 'ワインバーと落ち着いた食事、広告代理店帰りの客', vibe: 'office' },
    { id: 'jiyugaoka', name: 'Jiyugaoka', kanji: '自由が丘', flavor: '静かな住宅街、焼き菓子の店とカフェの匂い', vibe: 'residential' },
    { id: 'yoyogi', name: 'Yoyogi', kanji: '代々木', flavor: '公園と予備校と、朝方のランニング', vibe: 'residential' },
    { id: 'nihonbashi', name: 'Nihonbashi', kanji: '日本橋', flavor: '老舗と金融、古い橋の下の夜', vibe: 'old-tokyo' },
    { id: 'akasaka', name: 'Akasaka', kanji: '赤坂', flavor: '政治家の秘書と、高級料亭の暖簾', vibe: 'office' },
    { id: 'harajuku', name: 'Harajuku', kanji: '原宿', flavor: '若者の街、観光客、表参道の並木', vibe: 'artsy' },
    { id: 'setagaya', name: 'Setagaya', kanji: '世田谷', flavor: '静かな住宅街、公園、家族連れ、夜は早い', vibe: 'residential' },
    { id: 'adachi', name: 'Adachi', kanji: '足立', flavor: '昔からの下町、銭湯、駄菓子屋', vibe: 'old-tokyo' },
    { id: 'suginami', name: 'Suginami', kanji: '杉並', flavor: '古本屋と住宅街、作家が住んでいそうな通り', vibe: 'residential' },
    { id: 'meguro', name: 'Meguro', kanji: '目黒', flavor: '川沿いの桜、落ち着いた夜', vibe: 'residential' },
    { id: 'koto', name: 'Koto', kanji: '江東', flavor: '倉庫街、運河、深夜の配送トラック', vibe: 'edge' },
];

export function getNeighborhood(id: string): Neighborhood | undefined {
    return NEIGHBORHOODS.find(n => n.id === id);
}

export function pickRandomNeighborhood(vibe?: Neighborhood['vibe']): Neighborhood {
    const pool = vibe ? NEIGHBORHOODS.filter(n => n.vibe === vibe) : NEIGHBORHOODS;
    return pool[Math.floor(Math.random() * pool.length)];
}
