/**
 * Signature orders — 20 recurring customer archetypes whose drink and food
 * patterns never change. The apprentice memorizes them like scripture so
 * that the rare night a regular breaks their pattern tells him everything.
 * Distinct from signature-drinks.ts (those are Gondo's inventions).
 * Tokyo working-class izakaya realism; Japanese only.
 */

export interface SignatureOrder {
    id: string;
    customerDescriptor: string;
    usualOrder: string;
    tell: string;
    variantOrder?: string;
    apprenticesNote: string;
}

export const SIGNATURE_ORDERS: SignatureOrder[] = [
    {
        id: 'sig-old-journalist',
        customerDescriptor: '新聞記者くずれの男',
        usualOrder: '生ビール一杯、そのあと燗酒を二合、お通しと冷奴',
        tell: '今夜はノートを開いたまま飲んでいる',
        variantOrder: '燗酒をいきなり頼み、冷奴の代わりに鰯の丸干を添える',
        apprenticesNote: '書きかけの記事を抱えている夜は、ビールを飛ばす',
    },
    {
        id: 'sig-knitting-widow',
        customerDescriptor: '編み物をする老女',
        usualOrder: '梅酒ソーダ一杯、煮卵と漬物盛り',
        tell: '今夜は編み針を鞄にしまったまま席についた',
        variantOrder: '焼酎のお湯割りに切り替え、もつ煮を頼む',
        apprenticesNote: '手元が空いている日は、誰かの話を聞きに来ている',
    },
    {
        id: 'sig-retired-taxi-driver',
        customerDescriptor: '引退したタクシー運転手',
        usualOrder: 'ホッピー白をセットで二回、お通しと肉豆腐',
        tell: '今夜はコートを椅子の背にかけている',
        variantOrder: 'ホッピー黒に変え、焼き魚を追加する',
        apprenticesNote: '膝にコートを乗せない夜は、長居するつもりだ',
    },
    {
        id: 'sig-fishmongers-son',
        customerDescriptor: '魚河岸の倅',
        usualOrder: '瓶ビール大瓶一本、鰯の丸干と納豆巻',
        tell: '今夜は右手を使わずに箸を持っている',
        variantOrder: 'ハイボールに替え、焼き魚を塩で頼む',
        apprenticesNote: '包丁を握る手を庇う夜は、親父と揉めた日だ',
    },
    {
        id: 'sig-night-shift-nurse',
        customerDescriptor: '夜勤明けの看護師',
        usualOrder: 'ウーロンハイ一杯、お通しと煮卵',
        tell: '今夜は白衣の匂いがしない',
        variantOrder: '冷酒に切り替え、もつ煮をゆっくり食べる',
        apprenticesNote: '消毒の匂いを落としてきた日は、患者を見送った日だ',
    },
    {
        id: 'sig-young-architect',
        customerDescriptor: '若い建築士',
        usualOrder: '生ビール、続けてハイボール二杯、冷奴と漬物盛り',
        tell: '今夜は図面の筒を持たずに入ってきた',
        variantOrder: '燗酒を一合だけ頼み、肉豆腐を選ぶ',
        apprenticesNote: '筒を預けない夜は、案が通らなかった日',
    },
    {
        id: 'sig-old-calligrapher',
        customerDescriptor: '老書家',
        usualOrder: '燗酒二合、お通しと焼き魚',
        tell: '今夜は右手を膝の上に置いたままだ',
        variantOrder: '冷酒にして、鰯の丸干を添える',
        apprenticesNote: '筆を持つ手を休ませる夜は、納得いかない字を書いた日',
    },
    {
        id: 'sig-kindergarten-teacher',
        customerDescriptor: '幼稚園の先生',
        usualOrder: '梅酒ソーダ、お通しと納豆巻',
        tell: '今夜は鞄から折り紙がはみ出している',
        variantOrder: 'ハイボールに替え、煮卵と漬物盛りを頼む',
        apprenticesNote: '折り紙を持ち帰った日は、泣いた子の顔が抜けない夜',
    },
    {
        id: 'sig-failed-singer',
        customerDescriptor: '芽の出なかった歌い手',
        usualOrder: 'ハイボール三杯、お通しと肉豆腐',
        tell: '今夜は喉に手を当てたまま黙っている',
        variantOrder: 'ウーロンハイに替え、冷奴だけで粘る',
        apprenticesNote: '喉を触る夜は、オーディションの前か後',
    },
    {
        id: 'sig-morning-kitchen-hand',
        customerDescriptor: '朝の仕込みの下働き',
        usualOrder: '瓶ビール中瓶、お通しともつ煮',
        tell: '今夜は前掛けを畳まずに丸めて置いている',
        variantOrder: '焼酎お湯割りに切り替え、焼き魚を頼む',
        apprenticesNote: '前掛けの畳み方が崩れる夜は、板場で怒鳴られた日',
    },
    {
        id: 'sig-third-shift-foreman',
        customerDescriptor: '三交代の工場長',
        usualOrder: 'ホッピー黒をセットで三回、お通しと鰯の丸干',
        tell: '今夜は作業帽を被ったまま席につく',
        variantOrder: '燗酒に替え、もつ煮と冷奴を添える',
        apprenticesNote: '帽子を脱がない夜は、翌朝また現場に戻るつもりだ',
    },
    {
        id: 'sig-widowed-clockmaker',
        customerDescriptor: '妻を亡くした時計屋',
        usualOrder: '冷酒一合、お通しと煮卵',
        tell: '今夜は腕時計を外してカウンターに置いた',
        variantOrder: '燗酒二合に替え、納豆巻を頼む',
        apprenticesNote: '時計を外す夜は、命日の近い日',
    },
    {
        id: 'sig-bookshop-owner',
        customerDescriptor: '古本屋の主人',
        usualOrder: '燗酒一合、瓶ビール小瓶、漬物盛りと焼き魚',
        tell: '今夜は文庫本を広げていない',
        variantOrder: 'ハイボールに替え、肉豆腐を頼む',
        apprenticesNote: '本を開かない夜は、売れ残りの棚を見て帰ってきた日',
    },
    {
        id: 'sig-off-duty-cop',
        customerDescriptor: '非番の巡査',
        usualOrder: '生ビール、続けて焼酎お湯割り二杯、お通しともつ煮',
        tell: '今夜は上着の内側に手を入れない',
        variantOrder: 'ウーロンハイ一杯で切り上げ、冷奴だけ頼む',
        apprenticesNote: '内ポケットを確かめない夜は、手帳を置いてきた日',
    },
    {
        id: 'sig-young-mother-off-duty',
        customerDescriptor: '子を預けてきた若い母親',
        usualOrder: '梅酒ソーダ二杯、お通しと納豆巻',
        tell: '今夜は携帯を裏返しに置いた',
        variantOrder: 'ハイボールに替え、煮卵を追加する',
        apprenticesNote: '画面を伏せる夜は、一時間だけ自分に戻る夜だ',
    },
    {
        id: 'sig-retired-schoolmaster',
        customerDescriptor: '定年退職した校長',
        usualOrder: '燗酒二合、お通しと肉豆腐',
        tell: '今夜はネクタイを締めたままだ',
        variantOrder: '冷酒に切り替え、漬物盛りと鰯の丸干を頼む',
        apprenticesNote: 'ネクタイを外さない夜は、教え子の訃報を聞いた日',
    },
    {
        id: 'sig-long-haul-trucker',
        customerDescriptor: '長距離トラックの運転手',
        usualOrder: 'ウーロンハイ二杯、お通しと焼き魚',
        tell: '今夜は鍵を卓の上に出したままだ',
        variantOrder: '生ビール一杯だけ頼み、もつ煮を添える',
        apprenticesNote: '鍵を仕舞わない夜は、明日の便が朝早い日',
    },
    {
        id: 'sig-amateur-go-player',
        customerDescriptor: '下町の囲碁打ち',
        usualOrder: '燗酒一合、ハイボール一杯、お通しと冷奴',
        tell: '今夜は碁盤の話を一言もしない',
        variantOrder: '焼酎お湯割りに替え、煮卵と漬物盛りを頼む',
        apprenticesNote: '碁を語らない夜は、長年の相手に負けた日',
    },
    {
        id: 'sig-apprentice-sushi-chef',
        customerDescriptor: '寿司屋の見習い',
        usualOrder: '生ビール二杯、お通しと鰯の丸干',
        tell: '今夜は指先の絆創膏を剥がしたままだ',
        variantOrder: 'ホッピー白に替え、納豆巻と漬物盛りを頼む',
        apprenticesNote: '絆創膏を隠さない夜は、親方に褒められた日',
    },
    {
        id: 'sig-old-seamstress',
        customerDescriptor: '仕立て屋の婆さん',
        usualOrder: '梅酒ソーダ一杯、燗酒一合、お通しと漬物盛り',
        tell: '今夜は指抜きを外さずにカウンターに座った',
        variantOrder: '冷酒に切り替え、煮卵と肉豆腐を頼む',
        apprenticesNote: '指抜きを付けたままの夜は、納期に追われている日',
    },
];

export function pickSignatureOrder(): SignatureOrder {
    const index = Math.floor(Math.random() * SIGNATURE_ORDERS.length);
    return SIGNATURE_ORDERS[index];
}
