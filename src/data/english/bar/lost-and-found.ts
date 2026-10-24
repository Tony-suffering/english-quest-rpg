/**
 * Lost & Found catalog for the Silent Bartender izakaya sim.
 * Twenty small objects left behind on or under the counter, kept by
 * Gondo in a wooden box. Each entry pairs the apprentice's quiet guess
 * at the owner with Gondo's restrained decision. No item is ever claimed;
 * they simply sit, accumulating seasons.
 */

export interface LostItem {
    id: string;
    item: string;
    foundOn: string;
    guessedOwner: string;
    gondosJudgment: string;
    unlockAfterNights: number;
}

export const LOST_ITEMS: LostItem[] = [
    {
        id: 'lost-paperback',
        item: '古い文庫本',
        foundOn: '三番目の席の下で、閉店前の掃除中に',
        guessedOwner: '二百十四頁の角を折っていた、物静かな常連',
        gondosJudgment: '折り目はそのままに、箱の奥へ立てておく',
        unlockAfterNights: 5,
    },
    {
        id: 'lost-glove',
        item: '片方だけの手袋',
        foundOn: '十一月の夜、戸口の傘立ての脇に',
        guessedOwner: 'ひどく冷えた手で盃を抱えていた女',
        gondosJudgment: 'もう一方が現れるまで、たたんで箱にしまう',
        unlockAfterNights: 10,
    },
    {
        id: 'lost-foreign-coin',
        item: '異国の硬貨',
        foundOn: '勘定皿の端に、釣り銭と混ざって',
        guessedOwner: '遠い旅の話を一度もしなかった老人',
        gondosJudgment: '年号を確かめてから、小さな布包みに納める',
        unlockAfterNights: 15,
    },
    {
        id: 'lost-lighter',
        item: '安物のライター',
        foundOn: '灰皿の下、半ば忘れられた形で',
        guessedOwner: 'かすれたイニシャルを指でなぞっていた男',
        gondosJudgment: 'もう火は点かぬと知りながら、箱に並べておく',
        unlockAfterNights: 20,
    },
    {
        id: 'lost-photo',
        item: '名のない写真',
        foundOn: '土曜の雨の夜、カウンターの隅に',
        guessedOwner: '裏書きを書き損じたまま残した誰か',
        gondosJudgment: '端が反らぬよう、本に挟んで保管する',
        unlockAfterNights: 25,
    },
    {
        id: 'lost-napkin-recipe',
        item: '紙ナプキンに書かれた手書きの献立',
        foundOn: '席を立った後の膝の上から、床へ落ちて',
        guessedOwner: '母の味を思い出そうとしていた娘',
        gondosJudgment: 'しわを伸ばし、献立帳の間に挟んでおく',
        unlockAfterNights: 30,
    },
    {
        id: 'lost-pill-bottle',
        item: '空の処方薬の瓶',
        foundOn: '手洗いの棚の上に、蓋も閉めぬまま',
        guessedOwner: '長く咳をしていた、痩せた客',
        gondosJudgment: '名を伏せるため、ラベルを剥がして仕舞う',
        unlockAfterNights: 40,
    },
    {
        id: 'lost-cinema-stub',
        item: '閉館した映画館の半券',
        foundOn: '上着掛けに残された内ポケットから',
        guessedOwner: '誰かと観るはずだった、一人で来た男',
        gondosJudgment: '日付を確かめ、写真の隣に並べておく',
        unlockAfterNights: 50,
    },
    {
        id: 'lost-keychain',
        item: '何にも合わぬ鍵の付いた革の輪',
        foundOn: '勘定を終えた席の、椅子の背に',
        guessedOwner: '家を一つ、畳んだばかりの人',
        gondosJudgment: '鍵は残し、輪だけ磨き直して戻しておく',
        unlockAfterNights: 70,
    },
    {
        id: 'lost-matchbook',
        item: '実在せぬ酒場のマッチ箱',
        foundOn: '外套の袖口から滑り出て、床へ',
        guessedOwner: 'その店の話を語らずに帰った男',
        gondosJudgment: '一本も欠けぬまま、棚の奥へ立てる',
        unlockAfterNights: 90,
    },
    {
        id: 'lost-subway-pass',
        item: '八十年代の地下鉄定期',
        foundOn: '札入れごと置き忘れ、中に残っていた',
        guessedOwner: '通勤の道をとうに失った老人',
        gondosJudgment: '札入れは返し、定期だけ箱に移す',
        unlockAfterNights: 120,
    },
    {
        id: 'lost-uniform-button',
        item: '学生服の釦',
        foundOn: '卓の継ぎ目に落ち、布巾に引っかかって',
        guessedOwner: '卒業の翌日に訪れた若い客',
        gondosJudgment: '糸の切れ目を見て、小皿に載せておく',
        unlockAfterNights: 150,
    },
    {
        id: 'lost-unsent-letter',
        item: '畳まれたまま出されなかった手紙',
        foundOn: '壁際の座の、肘掛けの内側に',
        guessedOwner: '宛名に迷い、書き直しを重ねた女',
        gondosJudgment: '封は切らず、名前の位置で向きを揃えて仕舞う',
        unlockAfterNights: 180,
    },
    {
        id: 'lost-charm',
        item: '小さな守り袋',
        foundOn: '大雨の晩、戸口の床板の上に',
        guessedOwner: '胸元の紐を絶えず確かめていた若者',
        gondosJudgment: '湿り気を拭き取り、清めてから箱へ納める',
        unlockAfterNights: 220,
    },
    {
        id: 'lost-pressed-flower',
        item: '頁の間に挟まれた押し花',
        foundOn: '客の残した本を検めていた折に',
        guessedOwner: 'ある年の春を記憶に留めた誰か',
        gondosJudgment: '色が褪せぬよう、別の厚い紙へ移しておく',
        unlockAfterNights: 260,
    },
    {
        id: 'lost-baby-shoe',
        item: '赤子の片方の靴',
        foundOn: '冬の夜、外套掛けの下に転がって',
        guessedOwner: '長く子の話をせずにいた客',
        gondosJudgment: '埃を払い、柔らかな布に包んで仕舞う',
        unlockAfterNights: 320,
    },
    {
        id: 'lost-crossed-card',
        item: '名の上に線の引かれた名刺',
        foundOn: '勘定書きの皿の下から',
        guessedOwner: '肩書きを一つ、昨夜棄てた男',
        gondosJudgment: '線はそのままに、端をそろえて束ねておく',
        unlockAfterNights: 400,
    },
    {
        id: 'lost-broken-watch',
        item: '壊れた小さな腕時計',
        foundOn: '落とし物入れの底で、もう一度見つかった',
        guessedOwner: 'ある刻限に縛られていた人',
        gondosJudgment: '針を動かさず、止まった時刻のまま仕舞う',
        unlockAfterNights: 500,
    },
    {
        id: 'lost-guitar-pick',
        item: '擦り減った弦弾き',
        foundOn: '譜面立てもない壁際の、椅子の下に',
        guessedOwner: 'もう舞台には立たぬと決めた若者',
        gondosJudgment: '角の欠けを指で確かめ、一つだけ残して棚へ',
        unlockAfterNights: 700,
    },
    {
        id: 'lost-collar-tag',
        item: '名のない犬の首輪の鑑札',
        foundOn: '閉店後、格子戸の桟に掛かっていた',
        guessedOwner: '先に送った一匹を抱えて暮らす人',
        gondosJudgment: '裏を拭き、箱のいちばん上に置いておく',
        unlockAfterNights: 1000,
    },
];

export function getFoundItems(totalNights: number): LostItem[] {
    return LOST_ITEMS.filter((entry) => entry.unlockAfterNights <= totalNights);
}
