/**
 * Silent Bartender -- Gondo's signature drinks.
 *
 * The drinks that Gondo invented or defined. Referenced obliquely
 * by regulars ("the house sake the way Gondo makes it"), inferred
 * by the attentive player. Each has a small origin story.
 */

export interface SignatureDrink {
    id: string;
    name: string;          // English / paper label
    japanese: string;      // how locals call it
    origin: string;        // 1-2 lines (JP)
    hint: string;          // for the chalkboard
    recipe: string;        // brief, not mechanical
}

export const SIGNATURE_DRINKS: SignatureDrink[] = [
    {
        id: 'signature-noren-highball',
        name: 'Noren Highball',
        japanese: '暖簾ハイボール',
        origin: '権藤がニューヨーク時代、店を開いた最初の夜に客に出した一杯。店の名前はまだ決まっていなかった。',
        hint: 'まだ何かに決まる前の味',
        recipe: 'ウイスキーと炭酸水、レモンの皮を一度だけひねって。氷はひとつ。',
    },
    {
        id: 'signature-sunday-broken',
        name: 'Sunday Broken',
        japanese: '壊れた日曜',
        origin: '何年か前、日曜の常連が亡くなった後、権藤が黙って作り始めたカクテル。名前を付けたのは別の常連。',
        hint: '前に向かうための甘さ',
        recipe: 'プラム酒、少しの炭酸、グラスの縁に塩をひとつまみ。',
    },
    {
        id: 'signature-ice-letter',
        name: 'Ice Letter',
        japanese: '氷の手紙',
        origin: '権藤の師匠から教わった最初のカクテル。氷が溶ける時間分、飲み手が考えるように設計されている。',
        hint: '時間を飲み物として受け取る',
        recipe: '清酒を大きな氷の球で冷やし、ゆっくり溶けるのを待ちながら飲む。',
    },
    {
        id: 'signature-empty-seat',
        name: 'The Empty Seat',
        japanese: '空席',
        origin: '誰かを待つ客が注文すると、権藤は二杯出す ── 一杯を目の前、もう一杯を隣の空いた椅子の前に。',
        hint: '来ない人のために',
        recipe: '熱燗。徳利ひとつ、お猪口二つ。',
    },
    {
        id: 'signature-dog-water',
        name: "Dog's Water",
        japanese: '犬水',
        origin: '小さな皿の水。昔、ある常連の犬に出したのが始まり。飼い主が亡くなった後も、犬は時々来る。',
        hint: '何も変わっていないふりをする',
        recipe: '浅い皿に、きれいな水。',
    },
    {
        id: 'signature-first-light',
        name: 'First Light',
        japanese: '初明かり',
        origin: '朝5時に来る客のために権藤が考案。アルコールは入れない。一日の始まりを大事にする客のため。',
        hint: '眠らない夜の終わりに',
        recipe: 'ぬるま湯、生姜を一片、蜂蜜を少量。',
    },
    {
        id: 'signature-translators-last',
        name: "Translator's Last Word",
        japanese: '最後の一語',
        origin: '締め切り前の翻訳者が常連になり、権藤が「言葉を待つための酒」として作った。',
        hint: '思いつかない時に',
        recipe: 'ウイスキーとほんの少しの水。何も足さない、何も引かない。',
    },
];

export function getSignatureDrink(id: string): SignatureDrink | undefined {
    return SIGNATURE_DRINKS.find(d => d.id === id);
}

export function pickTonightSignature(seed?: number): SignatureDrink {
    const s = seed ?? Date.now();
    return SIGNATURE_DRINKS[s % SIGNATURE_DRINKS.length];
}
