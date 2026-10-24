/**
 * Otoshi catalogue for the Silent Bartender izakaya.
 * Tracks 24 seasonal starter dishes rotated by Gondo throughout the year.
 * Each entry records the vessel, Gondo's terse reasoning, and the apprentice's
 * quiet observation. Use pickOtoshiForSeason to select a plausible dish for
 * a given season (including year-round staples).
 */

export interface OtoshiEntry {
    id: string;
    dishName: string;
    season: 'spring' | 'summer' | 'autumn' | 'winter' | 'year-round';
    servedIn: string;
    gondosReason: string;
    apprenticesCommentary: string;
}

export const OTOSHI_CATALOGUE: OtoshiEntry[] = [
    {
        id: 'otoshi-nanohana-karashiae',
        dishName: '菜の花の辛子和え',
        season: 'spring',
        servedIn: '浅い織部の小鉢',
        gondosReason: '春は、苦みが、舌を起こす',
        apprenticesCommentary: '師匠は辛子を、指先で量っていた',
    },
    {
        id: 'otoshi-takenoko-tosani',
        dishName: '筍の土佐煮',
        season: 'spring',
        servedIn: '藍染付の豆皿',
        gondosReason: '春は、木の芽の香が、最初の一杯を決める',
        apprenticesCommentary: '鰹節を最後に足すのが、師匠の癖だった',
    },
    {
        id: 'otoshi-sakuraebi-kakiage',
        dishName: '桜海老のかき揚げ',
        season: 'spring',
        servedIn: '白磁の豆皿',
        gondosReason: '春の海の赤は、それだけで肴になる',
        apprenticesCommentary: '揚げ温度を、油の音だけで見ていた',
    },
    {
        id: 'otoshi-hotaruika-sumisoae',
        dishName: '蛍烏賊の酢味噌和え',
        season: 'spring',
        servedIn: '黒釉の小鉢',
        gondosReason: '春の酢味噌は、甘さを抑える',
        apprenticesCommentary: '味噌を裏漉しする手が、妙に静かだった',
    },
    {
        id: 'otoshi-soramame-shioyude',
        dishName: '空豆の塩茹で',
        season: 'spring',
        servedIn: '籐編みの小皿',
        gondosReason: '春の豆は、皮ごと出す',
        apprenticesCommentary: '茹で上がりを、指で弾いて確かめていた',
    },
    {
        id: 'otoshi-nasu-nibitashi',
        dishName: '茄子の煮浸し',
        season: 'summer',
        servedIn: '冷やした白磁の小鉢',
        gondosReason: '夏は、冷やした出汁が、酒を静かにする',
        apprenticesCommentary: '皮目に細かく包丁を入れていた',
    },
    {
        id: 'otoshi-myoga-amazuzuke',
        dishName: '茗荷の甘酢漬け',
        season: 'summer',
        servedIn: '切子の小鉢',
        gondosReason: '夏は、酢の効いたものが、酒を静かにする',
        apprenticesCommentary: '漬け時間を、水差しの露で計っていた',
    },
    {
        id: 'otoshi-edamame-dashibitashi',
        dishName: '枝豆の出汁浸し',
        season: 'summer',
        servedIn: '竹籠の小皿',
        gondosReason: '塩茹では誰でもやる。だから、浸す',
        apprenticesCommentary: '出汁は昆布だけ、鰹は使わなかった',
    },
    {
        id: 'otoshi-tokoroten',
        dishName: 'ところてん',
        season: 'summer',
        servedIn: '硝子の猪口',
        gondosReason: '喉を通す音まで、肴になる',
        apprenticesCommentary: '天突きの角度を、毎回直していた',
    },
    {
        id: 'otoshi-tomato-obitashi',
        dishName: '湯剥きトマトのお浸し',
        season: 'summer',
        servedIn: '染付の豆鉢',
        gondosReason: '洋のものも、出汁で和になる',
        apprenticesCommentary: '湯に入れる秒数だけは、頑なだった',
    },
    {
        id: 'otoshi-gobo-irini',
        dishName: 'ごぼうの炒り煮',
        season: 'autumn',
        servedIn: '飴釉の小鉢',
        gondosReason: '秋は、土の匂いが、酒の芯を作る',
        apprenticesCommentary: 'ささがきの厚みを、指で揃えていた',
    },
    {
        id: 'otoshi-shimeji-oroshiae',
        dishName: 'しめじのおろし和え',
        season: 'autumn',
        servedIn: '粉引の小鉢',
        gondosReason: '秋の茸は、大根で静める',
        apprenticesCommentary: '大根おろしの水は、切りすぎなかった',
    },
    {
        id: 'otoshi-sanma-mirinboshi',
        dishName: '秋刀魚のみりん干し',
        season: 'autumn',
        servedIn: '黒漆の豆皿',
        gondosReason: '骨の近くだけを、小さく出す',
        apprenticesCommentary: '火加減の合図は、煙の色だった',
    },
    {
        id: 'otoshi-kaki-shiraae',
        dishName: '柿の白和え',
        season: 'autumn',
        servedIn: '白磁の小鉢',
        gondosReason: '甘いものは、酒の前に置く',
        apprenticesCommentary: '豆腐の水切りに、半刻かけていた',
    },
    {
        id: 'otoshi-ginnan-shioiri',
        dishName: '銀杏の塩煎り',
        season: 'autumn',
        servedIn: '鉄錆釉の豆皿',
        gondosReason: '五つまで。六つは、身体が覚える',
        apprenticesCommentary: '殻を割る音を、客の話の切れ目に合わせていた',
    },
    {
        id: 'otoshi-daikon-yuzumiso',
        dishName: '大根の柚子味噌',
        season: 'winter',
        servedIn: '信楽の小鉢',
        gondosReason: '冬は、湯気が先に酒を呼ぶ',
        apprenticesCommentary: '柚子は、客が箸を取る直前に削っていた',
    },
    {
        id: 'otoshi-hakusai-torinikomi',
        dishName: '白菜と鶏の煮込み',
        season: 'winter',
        servedIn: '飴釉の小椀',
        gondosReason: '冬は、椀で出すと、話が長くなる',
        apprenticesCommentary: '鶏は皮目を、軽く焼いてから入れていた',
    },
    {
        id: 'otoshi-tarako-uchiro',
        dishName: '鱈子のうちろ煮',
        season: 'winter',
        servedIn: '染付の豆皿',
        gondosReason: '冬の塩気は、舌の奥を温める',
        apprenticesCommentary: '薄皮を、箸先で丁寧に外していた',
    },
    {
        id: 'otoshi-kabu-asazuke',
        dishName: '蕪の浅漬け',
        season: 'winter',
        servedIn: '青磁の小鉢',
        gondosReason: '冬は、軽い漬けが、鍋の口開けになる',
        apprenticesCommentary: '塩を振る高さが、夏より低かった',
    },
    {
        id: 'otoshi-ankimo-ponzu',
        dishName: '鮟肝のポン酢',
        season: 'winter',
        servedIn: '切子の豆鉢',
        gondosReason: '濃いものは、冷やして少しだけ',
        apprenticesCommentary: '蒸し時間は、線香の長さで量っていた',
    },
    {
        id: 'otoshi-hiyayakko-shoga',
        dishName: '冷奴の生姜のせ',
        season: 'year-round',
        servedIn: '白磁の小鉢',
        gondosReason: '迷った日は、豆腐に戻る',
        apprenticesCommentary: '豆腐の角を、毎回同じ向きに置いていた',
    },
    {
        id: 'otoshi-tamagoyaki',
        dishName: '出汁巻き玉子',
        season: 'year-round',
        servedIn: '黒漆の豆皿',
        gondosReason: '一切れで、その日の火加減がわかる',
        apprenticesCommentary: '巻き終わりの合わせ目は、いつも手前だった',
    },
    {
        id: 'otoshi-shiokara',
        dishName: '烏賊の塩辛',
        season: 'year-round',
        servedIn: '小さな片口',
        gondosReason: '少量で、酒を長く保たせる',
        apprenticesCommentary: '仕込みの日付を、木札で管理していた',
    },
    {
        id: 'otoshi-konnyaku-tosani',
        dishName: 'こんにゃくの土佐煮',
        season: 'year-round',
        servedIn: '鉄錆釉の小鉢',
        gondosReason: '安いものほど、切り方で決まる',
        apprenticesCommentary: '手綱の捻りを、毎回同じ向きに揃えていた',
    },
];

export function pickOtoshiForSeason(season: OtoshiEntry['season']): OtoshiEntry {
    const candidates = OTOSHI_CATALOGUE.filter(
        (entry) => entry.season === season || entry.season === 'year-round',
    );
    const pool = candidates.length > 0 ? candidates : OTOSHI_CATALOGUE;
    const index = Math.floor(Math.random() * pool.length);
    return pool[index]!;
}
