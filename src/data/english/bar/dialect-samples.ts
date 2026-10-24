/**
 * Dialect samples overheard at the counter of the Silent Bartender.
 * Each entry captures a regional Japanese phrase as the apprentice
 * heard it, alongside its standard form and a small literary
 * impression. The snippets are meant to colour the nights when
 * travellers drift in from the countryside.
 */

export interface DialectSample {
    id: string;
    phrase: string;
    region: string;
    standardJapanese: string;
    speakerContext: string;
    apprenticesImpression: string;
}

export const DIALECT_SAMPLES: DialectSample[] = [
    {
        id: 'dialect-kansai-honmaka',
        phrase: 'ほんまかいな、それ',
        region: '関西',
        standardJapanese: '本当なの、それ',
        speakerContext: '大阪から出張で来た営業マンが、同僚の土産話に笑いながら返した一言。',
        apprenticesImpression: '語尾が跳ねて、居酒屋の空気ごと少し明るくなった気がした。',
    },
    {
        id: 'dialect-tohoku-ndana',
        phrase: 'んだな、寒びぃもんな',
        region: '東北',
        standardJapanese: 'そうだね、寒いもんね',
        speakerContext: '仙台から来た年配の客が、外の冷え込みを話しながら燗酒を受け取った瞬間。',
        apprenticesImpression: '雪の日の縁側で祖父が呟く声と、同じ温度に聞こえた。',
    },
    {
        id: 'dialect-okinawa-deeji',
        phrase: 'でーじ美味さーやっさ',
        region: '沖縄',
        standardJapanese: 'すごく美味しいね',
        speakerContext: '那覇から移住してきた女性が、初めて出した豆腐の小鉢を口に運んだあと。',
        apprenticesImpression: '潮の匂いがしない夜なのに、海の方角を思い出させる響きだった。',
    },
    {
        id: 'dialect-hokkaido-namara',
        phrase: 'なまら冷えるっしょ今夜',
        region: '北海道',
        standardJapanese: 'すごく冷えるよね今夜',
        speakerContext: '札幌から帰省中の青年が、外套を畳みながらカウンターに座った時。',
        apprenticesImpression: '言葉の中に白い息が混じっていて、窓の外を確かめたくなった。',
    },
    {
        id: 'dialect-hiroshima-jaken',
        phrase: 'そうじゃけん、しゃあないわ',
        region: '広島',
        standardJapanese: 'そうだから、仕方ないよ',
        speakerContext: '広島から来た常連の友人が、失恋話を聞いてやや乱暴に慰めていた席。',
        apprenticesImpression: '諦めと優しさが同じ語尾に同居しているのが、不器用で良かった。',
    },
    {
        id: 'dialect-kyushu-batten',
        phrase: '美味かばってん、高かねえ',
        region: '九州',
        standardJapanese: '美味しいけど、高いね',
        speakerContext: '福岡からの出張帰りの男性が、メニューを指でなぞりながら笑った時。',
        apprenticesImpression: '逆接が柔らかくて、苦情のはずなのに褒められた気がした。',
    },
    {
        id: 'dialect-hokuriku-kinodokuna',
        phrase: 'きのどくな、ほんまに',
        region: '北陸',
        standardJapanese: 'ありがとう、本当に',
        speakerContext: '金沢から孫の顔を見に上京してきた老婦人が、席を譲られた時に返した礼。',
        apprenticesImpression: '「気の毒」が感謝に化ける土地の作法に、少し胸がすいた。',
    },
    {
        id: 'dialect-shinshu-zuku',
        phrase: 'ずくがねえでなあ、今日は',
        region: '信州',
        standardJapanese: 'やる気が出ないね、今日は',
        speakerContext: '松本から来た画家志望の青年が、梅雨の湿気にぼやきながら言った独り言。',
        apprenticesImpression: '「ずく」という音の丸さが、怠けることを許してくれるようだった。',
    },
    {
        id: 'dialect-shikoku-ikusa',
        phrase: 'ほなけん、行っきょるよ',
        region: '四国',
        standardJapanese: 'だから、行っているよ',
        speakerContext: '徳島から阿波踊りの稽古帰りに立ち寄った女性が、電話越しに母に答えた声。',
        apprenticesImpression: '語尾に拍子が残っていて、どこかで太鼓が鳴っているみたいだった。',
    },
    {
        id: 'dialect-niigata-shoshi',
        phrase: 'しょうしいてば、そんげ褒めんで',
        region: '新潟',
        standardJapanese: '恥ずかしいってば、そんなに褒めないで',
        speakerContext: '新潟から来た板前見習いが、先輩に包丁さばきを褒められて俯いた瞬間。',
        apprenticesImpression: '雪国の人が照れる時の音は、湯気のように立ち消える。',
    },
    {
        id: 'dialect-aomori-mega',
        phrase: 'めがっこ、うまがったじゃ',
        region: '青森',
        standardJapanese: '少し、美味しかったよ',
        speakerContext: '弘前から上京してきた老爺が、最後のひと口を惜しむように置いた時。',
        apprenticesImpression: '「めがっこ」という控えめな量詞に、生涯の遠慮が含まれていた。',
    },
    {
        id: 'dialect-yamagata-mokke',
        phrase: 'もっけだの、助かったちゃ',
        region: '山形',
        standardJapanese: 'ありがたいね、助かったよ',
        speakerContext: '山形から来た林業の男性が、雨宿りを兼ねて入ってきて燗を頼んだ時。',
        apprenticesImpression: '「もっけ」という響きが、仏前に供える小声に似ていた。',
    },
    {
        id: 'dialect-kansai-meccha',
        phrase: 'めっちゃ沁みるわあ、これ',
        region: '関西',
        standardJapanese: 'とても沁みるねえ、これ',
        speakerContext: '京都から転勤で来た女性が、熱燗を一口含んで目を閉じた瞬間。',
        apprenticesImpression: '伸びる語尾に、疲労そのものが湯気となって逃げていく気配があった',
    },
    {
        id: 'dialect-kyushu-suitoyo',
        phrase: 'あんた、好いとーよ、ほんま',
        region: '九州',
        standardJapanese: 'あなたのこと、好きだよ、本当に',
        speakerContext: '博多から来たカップルの女性が、別れ際に相手の袖を掴んで小さく言った声。',
        apprenticesImpression: '告白なのに湿っていなくて、からりと晴れた日の洗濯物みたいだった。',
    },
    {
        id: 'dialect-okinawa-nankurunaisa',
        phrase: 'なんくるないさ、飲んどけ',
        region: '沖縄',
        standardJapanese: '何とかなるよ、飲んでおきなよ',
        speakerContext: '石垣島から観光で来た漁師風の男が、落ち込む連れに杯を押しつけた時。',
        apprenticesImpression: '慰めの言葉なのに命令形で、それがかえって救いになる響きだった。',
    },
];

export function pickDialectSample(): DialectSample {
    const index = Math.floor(Math.random() * DIALECT_SAMPLES.length);
    return DIALECT_SAMPLES[index];
}
