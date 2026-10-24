/**
 * Tab Ledger (ツケ帳) — the bar's unwritten credit arrangements.
 * Gondo keeps no paper ledger; the terms live in his head alone.
 * Each regular honors their tab in their own way: money, barter, time, or labor.
 * The apprentice slowly learns that credit, in this bar, is not a number.
 * Entries unlock as the apprentice becomes aware of each arrangement.
 */

export interface TabEntry {
    id: string;
    descriptor: string;
    standingArrangement: string;
    howTheyPay: string;
    apprenticesNote: string;
    unlockAfterNights: number;
}

export const TAB_LEDGER: TabEntry[] = [
    {
        id: 'tab-printer-oldman',
        descriptor: '印刷屋の老人',
        standingArrangement: '決して現金では払わない。代わりに店の品書きや葉書を刷ってくれる。権藤もそれを当たり前のように受け取る。',
        howTheyPay: '季節ごとに新しい品書きを一枚、黙ってカウンターに置いて帰る。活字の匂いがまだ残っている。',
        apprenticesNote: '金の代わりになるものが、この街にはまだあるらしい。',
        unlockAfterNights: 10,
    },
    {
        id: 'tab-night-nurse',
        descriptor: '夜勤明けの看護師',
        standingArrangement: '月末にまとめて払う。権藤は金額を口にしない。彼女が封筒を置けば、それで済む。',
        howTheyPay: '毎月最終金曜、白い封筒をそっとおしぼりの下に差し込む。中身を確かめる音はしない。',
        apprenticesNote: '数えない信用の方が、数える信用より重いこともある。',
        unlockAfterNights: 15,
    },
    {
        id: 'tab-fishmonger',
        descriptor: '築地あがりの魚屋',
        standingArrangement: '鯛や鰆の差し入れで酒代の代わりになる。権藤はその日のうちに捌いて、常連に出す。',
        howTheyPay: '月に二度、発泡スチロールの箱を裏口に置いていく。氷の音が挨拶代わり。',
        apprenticesNote: '物々交換は、昔の話じゃなくて、まだここに残っている話だった。',
        unlockAfterNights: 20,
    },
    {
        id: 'tab-retired-teacher',
        descriptor: '退職した中学教師',
        standingArrangement: '年金支給日の翌日に、きっかり二ヶ月分をまとめて払う。一度も遅れたことがない。',
        howTheyPay: '偶数月の十六日、開店と同時に来て、会釈一つで旧札を揃えて置く。',
        apprenticesNote: '律儀さというのは、練習じゃなくて性分なんだと思う。',
        unlockAfterNights: 30,
    },
    {
        id: 'tab-widow-dressmaker',
        descriptor: '仕立て屋のおかみ',
        standingArrangement: '金では払わず、権藤の割烹着や暖簾の繕いを引き受ける。破れる前に気づいて持って帰る。',
        howTheyPay: '帰り際、カウンターの隅の布を黙って鞄に入れていく。翌週には縫い目が消えている。',
        apprenticesNote: 'この店の布地は、ほとんど彼女の手を通っていると気づいた。',
        unlockAfterNights: 40,
    },
    {
        id: 'tab-taxi-driver',
        descriptor: '個人タクシーの運転手',
        standingArrangement: '現金では払えるが、払わない夜が多い。代わりに閉店後、権藤を家まで黙って送る。',
        howTheyPay: '雨の夜、看板の灯りが消える頃に車を横付けする。メーターは倒さない。',
        apprenticesNote: '権藤が夜道を歩かないのは、疲れたからじゃなかった。',
        unlockAfterNights: 50,
    },
    {
        id: 'tab-newspaper-man',
        descriptor: '新聞販売所の主',
        standingArrangement: '飲み代の代わりに、店の前の路面を毎朝水で流していく。権藤は一度も頼んでいない。',
        howTheyPay: '夜明け前、配達の折り返しに箒と柄杓で石畳を濡らす。誰にも見られたくない仕事のように。',
        apprenticesNote: '開店前の濡れた石の匂いに、あの人の名前がついていた。',
        unlockAfterNights: 70,
    },
    {
        id: 'tab-unemployed-writer',
        descriptor: '仕事のない物書き',
        standingArrangement: '本が出た月にだけ、たまっていた分を一度で払う。出ない年は、黙って出ない。',
        howTheyPay: '見本刷りを一冊、カウンターに置いて「これで足りますか」と訊く。権藤は足りると答える。',
        apprenticesNote: '信用って、金額の話じゃないと気づいた。',
        unlockAfterNights: 100,
    },
    {
        id: 'tab-sento-owner',
        descriptor: '銭湯のご主人',
        standingArrangement: '酒代は払わない。代わりに権藤と弟子に、いつでも最後の湯を残しておいてくれる。',
        howTheyPay: '閉店後の暖簾を仕舞わずに、番台の鍵をカウンターに置いていく夜がある。',
        apprenticesNote: '湯の温さも、ツケの形をしていることがあるらしい。',
        unlockAfterNights: 130,
    },
    {
        id: 'tab-retired-detective',
        descriptor: '元刑事の老人',
        standingArrangement: '払うときは払う、払わないときは払わない。権藤はその区別を訊かない。',
        howTheyPay: '年に数度、厚い封筒を無言で出す。中には本人の分以外も混ざっている気がする。',
        apprenticesNote: '誰かの分を肩代わりする人の顔は、誰にも似ていなかった。',
        unlockAfterNights: 170,
    },
    {
        id: 'tab-kimono-shop-daughter',
        descriptor: '呉服屋の娘',
        standingArrangement: '父親の名代で来る。払いは一度もしたことがないが、正月の挨拶だけは欠かさない。',
        howTheyPay: '元日の昼、菓子折りと共に年賀の手紙を置く。金額は書かれていない。',
        apprenticesNote: 'この娘のツケは、父親の代から続いていて、終わる日のことは誰も考えていない。',
        unlockAfterNights: 220,
    },
    {
        id: 'tab-night-watchman',
        descriptor: '倉庫街の夜警',
        standingArrangement: '金では払えない月が多い。代わりに路地の見回りのついでに、店の裏を一度覗いていく。',
        howTheyPay: '火の始末を確かめて、裏木戸を静かに閉めて去る。権藤はその音で眠れるらしい。',
        apprenticesNote: '守ってもらっていると気づかせない守り方を、あの人はしている。',
        unlockAfterNights: 300,
    },
    {
        id: 'tab-referring-doctor',
        descriptor: '町医者の先生',
        standingArrangement: '自分は一円も払わないが、弱った常連を黙ってここへ送り込む。権藤はそれを報酬と呼ぶ。',
        howTheyPay: '紹介状の代わりに、酒を覚えていない顔の新顔をカウンターの隅に座らせる。',
        apprenticesNote: '客の紹介も、ツケの払い方の一つなのだと、ようやく分かった。',
        unlockAfterNights: 500,
    },
    {
        id: 'tab-gondo-himself',
        descriptor: '名前のない最後の一人',
        standingArrangement: 'このノートには載らない。権藤自身が誰かの分を立て替えていることを、誰も知らない。',
        howTheyPay: '閉店後、帳面にも出てこない分が、権藤の引き出しの中で静かに合わされている。',
        apprenticesNote: 'このノートは、ずっと権藤の頭の中にある。そして最後の頁には、権藤の名前だけが残る。',
        unlockAfterNights: 700,
    },
];

export function getVisibleTabEntries(totalNights: number): TabEntry[] {
    return TAB_LEDGER.filter((entry) => entry.unlockAfterNights <= totalNights);
}
