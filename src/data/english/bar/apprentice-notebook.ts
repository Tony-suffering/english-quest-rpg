/**
 * Apprentice Notebook — 15 handwritten pages kept behind the counter.
 * Each page records a small insight earned over many nights of service.
 * Pages unlock progressively based on the apprentice's night count.
 * Knowledge spans craft-mechanics, people-reading, and self-discipline.
 */

export interface NotebookEntry {
    id: string;
    pageTitle: string;
    contentLines: string[];
    unlockAfterNights: number;
}

export const NOTEBOOK_ENTRIES: NotebookEntry[] = [
    {
        id: 'note-water-temperature',
        pageTitle: '水の温度の覚え方',
        contentLines: [
            '冷水は指で底に触る',
            '温水は手の甲で確かめる',
            '湯気が立つ前に消える',
            '氷より先に手を引け',
        ],
        unlockAfterNights: 3,
    },
    {
        id: 'note-knife-angle',
        pageTitle: '包丁の角度',
        contentLines: [
            '刃は十五度',
            '押すな、滑らせろ',
            '指の関節で止める',
            '音が軽くなったら研ぎ時',
        ],
        unlockAfterNights: 5,
    },
    {
        id: 'note-reading-exit',
        pageTitle: '客の帰り時を読む',
        contentLines: [
            '腕時計を見ない',
            '肘をカウンターから離す',
            '二杯目の四分の三が残っている',
            '財布を確認しない',
        ],
        unlockAfterNights: 10,
    },
    {
        id: 'note-glass-polish',
        pageTitle: 'グラスの磨き方',
        contentLines: [
            '布は二枚使う',
            '持つのは脚、触るのは縁',
            '光に透かして曇りを探す',
            '息はかけない',
        ],
        unlockAfterNights: 15,
    },
    {
        id: 'note-silent-customer',
        pageTitle: '黙っている客の扱い',
        contentLines: [
            '話しかけるな',
            'おしぼりだけ替える',
            '視線の先を追わない',
            '二杯目は頼まれてから',
        ],
        unlockAfterNights: 20,
    },
    {
        id: 'note-own-breath',
        pageTitle: '自分の呼吸',
        contentLines: [
            '忙しい時ほど深く吸う',
            '息を止めて注ぐな',
            '肩が上がったら一度置け',
            '口で吸って鼻で吐く',
        ],
        unlockAfterNights: 30,
    },
    {
        id: 'note-ice-sound',
        pageTitle: '氷の音で測る',
        contentLines: [
            '澄んだ音は良い氷',
            '濁った音は割れている',
            'グラスの中で二度鳴らせば足りる',
            '溶ける前に出す',
        ],
        unlockAfterNights: 45,
    },
    {
        id: 'note-first-word',
        pageTitle: '客の第一声',
        contentLines: [
            '声の高さを覚える',
            '低ければ疲れている',
            '早口は急いでいる',
            '二言目で本題が出る',
        ],
        unlockAfterNights: 60,
    },
    {
        id: 'note-own-tired',
        pageTitle: '疲れの見つけ方',
        contentLines: [
            '指先が冷たくなる',
            '同じ皿を二度拭く',
            '返事が半拍遅れる',
            '一度水を飲んで座れ',
        ],
        unlockAfterNights: 80,
    },
    {
        id: 'note-pouring-angle',
        pageTitle: '注ぐ角度',
        contentLines: [
            '瓶は四十五度から始める',
            '注ぎ終わりに手首を返す',
            '最後の一滴は布で受ける',
            '音を立てずに置く',
        ],
        unlockAfterNights: 100,
    },
    {
        id: 'note-two-customers',
        pageTitle: '二人客の距離',
        contentLines: [
            '肩の角度を見る',
            '向き合うなら口を挟むな',
            '並ぶなら酒を勧めろ',
            '沈黙は邪魔するな',
        ],
        unlockAfterNights: 150,
    },
    {
        id: 'note-anger-hold',
        pageTitle: '怒りを抱える',
        contentLines: [
            '厨房の壁に置いてくる',
            'カウンターには持ち込まない',
            '帰り道で拾えばいい',
            'たいてい翌朝には消えている',
        ],
        unlockAfterNights: 200,
    },
    {
        id: 'note-regular-change',
        pageTitle: '常連の変化',
        contentLines: [
            '座る席がずれる',
            '頼む順番が入れ替わる',
            '話題から家族が消える',
            '聞かずに覚えておく',
        ],
        unlockAfterNights: 300,
    },
    {
        id: 'note-closing-rhythm',
        pageTitle: '閉店間際の間合い',
        contentLines: [
            '照明を半分落とす',
            '音楽の音量は上げない',
            '皿を洗う音を響かせる',
            '最後の一杯は黙って出す',
        ],
        unlockAfterNights: 500,
    },
    {
        id: 'note-becoming-counter',
        pageTitle: 'カウンターになる',
        contentLines: [
            '自分の名前を忘れる時間',
            '客の名前だけ覚えている',
            '手が先に動いている',
            'それでいい',
        ],
        unlockAfterNights: 700,
    },
];

export function getFilledNotebookPages(totalNights: number): NotebookEntry[] {
    return NOTEBOOK_ENTRIES.filter(
        (entry) => totalNights >= entry.unlockAfterNights,
    );
}
