/**
 * Nightly inventory for Gondo's izakaya closing routine.
 * Twenty practical items the master counts before locking up,
 * teaching the apprentice the rhythm of closing care.
 * Sixteen items are checked every night; four are weekly or monthly.
 */

export interface InventoryItem {
    id: string;
    itemName: string;
    whereItLives: string;
    howChecked: string;
    commonMistake: string;
    checkedEveryNight: boolean;
}

export const INVENTORY_ITEMS: InventoryItem[] = [
    {
        id: 'inv-ice',
        itemName: '氷',
        whereItLives: '製氷機と、カウンター下の氷ストッカー',
        howChecked: '製氷機の貯氷量を蓋を開けて目視。ストッカーの残量と合わせて明日の昼までもつかを判断する。',
        commonMistake: '製氷機が満タンに見えても、下半分は古い氷が固まっているのに気付かない。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-water',
        itemName: '仕込み水',
        whereItLives: '厨房奥の浄水タンクと、カウンター裏の冷水ポット',
        howChecked: '浄水タンクの残量を指で目盛に当て、冷水ポットは明朝用に満タンにして冷蔵庫へ戻す。',
        commonMistake: 'ポットの蓋を半開きのまま冷蔵庫に入れて、朝に匂い移りさせる。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-sake',
        itemName: '清酒各種',
        whereItLives: 'カウンター裏の冷蔵ショーケース、下段の常温棚',
        howChecked: '四合瓶の残量を瓶ごとに指差し確認し、開栓日を瓶底のシールで照合する。開栓四日目は翌日で使い切る段へ移す。',
        commonMistake: '開栓日シールを貼り忘れて、先週の酒を新しい瓶と勘違いする。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-shochu',
        itemName: '焼酎',
        whereItLives: '壁際の焼酎棚（芋・麦・米で段を分けてある）',
        howChecked: '一升瓶を軽く持ち上げ重さで残量を測り、残り二割を切った瓶はカウンター側へ前出しする。',
        commonMistake: '見た目で判断して持ち上げず、翌日のピークに切らす。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-beer',
        itemName: '生ビール樽と瓶ビール',
        whereItLives: 'カウンター下のビールサーバー、勝手口横のケース',
        howChecked: 'サーバーの樽残量ゲージを見て、翌日分の予備が勝手口に一本あるかを確認。瓶は中瓶と小瓶の本数を紙に書き出す。',
        commonMistake: '樽のガス圧だけ見て、実残量と取り違える。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-shoyu',
        itemName: 'しょうゆ',
        whereItLives: '厨房コンロ脇の小瓶、ストック棚の一升瓶',
        howChecked: '小瓶を明朝用に満タンへ詰め替え、一升瓶の残量を棚札に鉛筆で更新する。',
        commonMistake: '詰め替え漏斗を洗わずに戻して、翌週カビ臭くする。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-salt',
        itemName: '塩',
        whereItLives: 'コンロ脇の塩壺、焼き台横の振り塩用小皿',
        howChecked: '壺の塩を指でほぐし、湿っていたら乾いた塩に入れ替え。振り塩皿は空にして伏せておく。',
        commonMistake: '湿った塩の上から新しい塩を足して、底が固まるまで気付かない。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-oil',
        itemName: '揚げ油',
        whereItLives: '厨房奥のフライヤーと、予備のポリ缶',
        howChecked: '油の色を白紙にひと垂らしして確認し、濁っていれば翌日交換と札を下げる。ポリ缶の残量も見る。',
        commonMistake: '匂いだけで判断して、色の変化を見落とす。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-dried',
        itemName: '乾物（鰹節・昆布・煮干し）',
        whereItLives: '厨房上段の密閉缶',
        howChecked: '缶を振って音で残量を確かめ、湿気の強い夜は乾燥剤を一枚追加する。',
        commonMistake: '缶の蓋を軽く閉めただけで戻し、翌朝しけらせる。',
        checkedEveryNight: false,
    },
    {
        id: 'inv-chopsticks',
        itemName: '割り箸と塗り箸',
        whereItLives: 'カウンター下の箸箱、厨房の塗り箸立て',
        howChecked: '割り箸の袋残数を数え、塗り箸は欠けや先の割れがないか一本ずつ指で撫でて確認する。',
        commonMistake: '塗り箸の先端の割れを見落としたまま翌日使わせる。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-toothpicks',
        itemName: '楊枝',
        whereItLives: 'カウンター各席の楊枝入れ、予備はレジ下',
        howChecked: '楊枝入れを一つずつ覗き、残り半分を切っているものは補充。入れ物の底の粉も拭く。',
        commonMistake: '上から足すだけで、底の古い楊枝が永遠に残る。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-toilet-paper',
        itemName: 'トイレットペーパー',
        whereItLives: 'トイレの棚、勝手口のストック箱',
        howChecked: '個室内の予備が二ロールあるかを目視し、ストック箱の残数をメモに残す。',
        commonMistake: '個室の予備だけ見て、ストック箱が空なのを翌朝まで知らない。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-detergent',
        itemName: '洗剤と漂白剤',
        whereItLives: 'シンク下の扉内',
        howChecked: '中性洗剤のボトル残量と、まな板用漂白剤の希釈ボトルを確認し、明朝分の希釈を作り直す。',
        commonMistake: '古い希釈液を捨てずに継ぎ足して、濃度を狂わせる。',
        checkedEveryNight: false,
    },
    {
        id: 'inv-towel',
        itemName: 'タオル',
        whereItLives: '勝手口のリネンかご、手洗い場のタオル掛け',
        howChecked: '使用済みを洗濯かごへ分け、明日用の乾いたタオルを三枚たたんで勝手口に積む。',
        commonMistake: '湿り気の残ったタオルを乾いたと勘違いして積む。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-fukin',
        itemName: '布巾',
        whereItLives: '厨房の布巾掛け、カウンター下の専用バット',
        howChecked: '用途別（グラス用・カウンター用・皿用）に分けて洗い、熱湯で湯通ししてから掛け直す。',
        commonMistake: '用途を混ぜて洗って、翌日グラスに生臭さを移す。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-register-change',
        itemName: 'レジ釣り銭',
        whereItLives: 'レジ内のトレイと、金庫の予備両替袋',
        howChecked: '千円札と小銭を種別ごとに帯枚数で数え、明朝に必要な釣り銭構成を金庫から補充する。',
        commonMistake: '枚数だけ数えて、種別の不足（特に五百円玉）を見落とす。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-ledger',
        itemName: '帳簿とツケ帳',
        whereItLives: 'レジ下の引き出し',
        howChecked: 'その日の売上票を綴じ、ツケ帳は名前ごとに残高を鉛筆で更新してから引き出しへ戻す。',
        commonMistake: 'ツケの回収分を書き込む前に帳簿を閉じてしまう。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-bizen',
        itemName: '備前焼の小鉢',
        whereItLives: 'カウンター奥の器棚、上から二段目',
        howChecked: '総数を数え、欠けやヒビを一つずつ灯りにかざして確認する。足りなければ記録に残す。',
        commonMistake: '数だけ合わせて、縁の欠けを見落とす。',
        checkedEveryNight: false,
    },
    {
        id: 'inv-noren',
        itemName: '暖簾',
        whereItLives: '入口の鴨居、洗い替えは勝手口の棚',
        howChecked: '外して畳み、匂いや染みがないか確認してから畳んで鴨居下に置く。月一で洗い替えと交換する。',
        commonMistake: '雨の日に濡れたまま畳んで、翌朝カビ臭くする。',
        checkedEveryNight: true,
    },
    {
        id: 'inv-gas-fan',
        itemName: 'ガス元栓と換気扇',
        whereItLives: '厨房壁際のガス元栓、天井の換気扇スイッチ',
        howChecked: 'ガス元栓を手で回して確実に閉じ、換気扇を止めて、フィルターの油汚れ度合いを見上げて確認する。',
        commonMistake: '元栓を締めたつもりで触れただけで帰り、朝に気付いて冷や汗をかく。',
        checkedEveryNight: false,
    },
];

export function getDailyItems(): InventoryItem[] {
    return INVENTORY_ITEMS.filter((item) => item.checkedEveryNight);
}
