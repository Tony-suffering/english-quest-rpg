/**
 * Gondo's original recipes — ten dishes he developed over decades behind his
 * small Tokyo counter. Not formal recipe cards; narrative entries focused on
 * the specific gesture or timing he insisted on, and the note the apprentice
 * carried away from watching. Unlock progression follows nights served, so
 * later entries arrive only after the apprentice has earned them.
 */

export interface GondoRecipe {
    id: string;
    dishName: string;
    approxSeason: 'spring' | 'summer' | 'autumn' | 'winter' | 'year-round';
    description: string;
    gondosRitual: string;
    apprenticesNote: string;
    unlockAfterNights: number;
}

export const GONDO_RECIPES: GondoRecipe[] = [
    {
        id: 'recipe-yoru-no-hiyayakko',
        dishName: '夜の冷奴',
        approxSeason: 'summer',
        description:
            '絹ごしを一丁、生姜と刻み茗荷、醤油は別添え。店に着いた客が最初の一杯で頼むことを前提にした、無口な一皿。',
        gondosRitual:
            '豆腐を切る前に、必ず手のひらで水をぬぐう。包丁は寝かせず、刃の背を斜め下に落として六切りにする。醤油は客が手に取るまで皿に落とさない。',
        apprenticesNote: '手の水を拭く一拍が、先に身体に入った。',
        unlockAfterNights: 10,
    },
    {
        id: 'recipe-shio-saba-no-osoi-no',
        dishName: '塩鯖の遅いの',
        approxSeason: 'autumn',
        description:
            '締めに近い時間帯にだけ出す塩鯖の焼き物。脂が落ちる頃合いを逆算して、客が頼んでから火に乗せる。',
        gondosRitual:
            '皮目を上にして七分、返して二分。煙が一度太くなり、細く落ち着いた瞬間に網から外す。大根おろしは絞らず、汁ごと皿の端に置く。',
        apprenticesNote: '煙の太さで時間を測ることを、言葉にしては教えられなかった。',
        unlockAfterNights: 20,
    },
    {
        id: 'recipe-gondo-no-nattojiru',
        dishName: '権藤の納豆汁',
        approxSeason: 'winter',
        description:
            '挽き割り納豆を叩き潰して味噌に混ぜ込む、権藤が北の親戚から引いてきた汁。寒い晩、最後の客の前に火を入れる。',
        gondosRitual:
            '出汁は一度沸かしてから火を落とし、泡が完全に止まってから納豆味噌を入れる。再び火にかけるときは、木べらで鍋底を二周だけ。三周目は味が濁ると言う。',
        apprenticesNote: '泡が止まるのを待つ時間の長さを、最初は持て余した。',
        unlockAfterNights: 35,
    },
    {
        id: 'recipe-haru-no-karashi-ae',
        dishName: '春の辛子和え',
        approxSeason: 'spring',
        description:
            '菜の花と油揚げの辛子和え。苦味を立てず、辛子は香りだけを残す。三月から四月の二週間だけ出す。',
        gondosRitual:
            '菜の花を茹でたら氷水に落とさない。笊に上げ、布巾で押さえて粗熱を取る。辛子は練ってから十五分置き、角が落ちた頃に和える。',
        apprenticesNote: '氷水を使わない理由は、教わらないまま覚えた。',
        unlockAfterNights: 50,
    },
    {
        id: 'recipe-dashi-no-tamagoyaki',
        dishName: '出汁の卵焼き',
        approxSeason: 'year-round',
        description:
            '出汁を多めに含ませた関東風の卵焼き。昼に仕込み、夜に温め直さずそのまま切って出す。',
        gondosRitual:
            '出汁は八十度で止める。指を近づけて熱を測り、湯気が縦に立ったら火から外す。卵液に混ぜる前に、鍋肌の温度が下がるのを必ず待つ。',
        apprenticesNote: '湯気の向きを見る癖が、先に手に染みついた。',
        unlockAfterNights: 75,
    },
    {
        id: 'recipe-ika-no-shiokara-jitate',
        dishName: '烏賊の塩辛仕立て',
        approxSeason: 'winter',
        description:
            '権藤が自分で漬ける塩辛を、新鮮な烏賊の刺身に薄く和える一品。市販の塩辛は使わない。',
        gondosRitual:
            '塩辛は必ず前日の分を使う。当日漬けたものは角が立ちすぎる、と言って冷蔵庫の奥に仕舞う。和える前に、器を冷水でさっと濡らして拭く。',
        apprenticesNote: '一日寝かせるという言葉を、権藤が使うのを聞いたことはない。',
        unlockAfterNights: 100,
    },
    {
        id: 'recipe-aki-no-kinoko-gohan',
        dishName: '秋のきのこ飯',
        approxSeason: 'autumn',
        description:
            '舞茸と占地を薄揚げと炊き込む、秋の終わりの一膳。客が帰り際に頼むことを想定して、少量ずつ土鍋で炊く。',
        gondosRitual:
            '米は研いでから三十分、笊に上げて水気を切る。きのこは包丁を使わず、手で裂く。炊き上がりは蓋を開ける前に土鍋を台に二度、軽く打ちつける。',
        apprenticesNote: '台を叩く二度の音が、炊き上がりの合図だった。',
        unlockAfterNights: 150,
    },
    {
        id: 'recipe-fuyu-no-kamo-nanban',
        dishName: '冬の鴨南蛮',
        approxSeason: 'winter',
        description:
            '冷え込みが厳しい晩にだけ出す、鴨と白葱の温かい蕎麦。麺は細め、汁は濃く、葱は太く切る。',
        gondosRitual:
            '鴨は汁で煮ない。網で軽く炙り、脂を落としてから丼の上に並べる。汁は丼ではなく別の小鍋で温め、客の前に置く直前に回しかける。',
        apprenticesNote: '汁をかける瞬間の角度まで、権藤は同じだった。',
        unlockAfterNights: 220,
    },
    {
        id: 'recipe-natsu-no-reishuu-todai',
        dishName: '夏の冷やし灯台',
        approxSeason: 'summer',
        description:
            '冬瓜と海老を薄い出汁で冷やした、権藤が名前だけ自分でつけた小鉢。常連の誰かに灯台みたいだと言われてから、そう呼ばれるようになった。',
        gondosRitual:
            '出汁は一度沸かし、冷ましてから冷蔵庫へ。冷やすのは四時間きっかり。それ以上置くと味が痩せると言って、必ず時計を見る。盛り付けは器の縁に触らない。',
        apprenticesNote: '四時間という数字だけは、珍しく口に出して教わった。',
        unlockAfterNights: 350,
    },
    {
        id: 'recipe-shimekukuri-no-ochazuke',
        dishName: '締めくくりの茶漬け',
        approxSeason: 'year-round',
        description:
            '最後の客にだけ、頼まれなくても出すことがある一杯。焼いた塩鮭、刻み海苔、山葵、そして熱い番茶。メニューには載せていない。',
        gondosRitual:
            '番茶は沸騰させない。湯気が細く真上に立つ温度で止め、茶葉は一度だけ振って湯を注ぐ。出す前に、丼を台に二度、控えめに打ちつける。',
        apprenticesNote: 'この手順は、書き留めてもいけないと言われた。',
        unlockAfterNights: 500,
    },
];

export function getLearnedRecipes(totalNights: number): GondoRecipe[] {
    return GONDO_RECIPES.filter((recipe) => recipe.unlockAfterNights <= totalNights);
}
