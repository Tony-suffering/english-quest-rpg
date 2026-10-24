/**
 * Silent Bartender -- narrative thread registry.
 *
 * Human-readable mapping of which customer IDs form a narrative
 * thread with which others. For content authors.
 */

export interface NarrativeThread {
    id: string;
    title: string;       // JP
    description: string; // JP, 1 line
    memberIds: string[]; // customer ids
}

export const THREADS: NarrativeThread[] = [
    {
        id: 'thread-heartbroken',
        title: '失恋の三部作',
        description: '失恋客とその妻、そして元恋人のそれから',
        memberIds: ['heartbroken', 'the-wife', 'heartbrokens-ex'],
    },
    {
        id: 'thread-ghost',
        title: '見えない常連と未亡人',
        description: '亡くなった常連の幽霊と、毎週火曜の未亡人',
        memberIds: ['ghost', 'ghost-apology', 'ghosts-widow', 'nobody-visible'],
    },
    {
        id: 'thread-dog',
        title: '犬と飼い主とタクシー',
        description: '犬の客、飼い主、そして犬を拾ったタクシー運転手',
        memberIds: ['the-dog', 'dogs-owner', 'taxi-saw-dog'],
    },
    {
        id: 'thread-wedding',
        title: '花嫁の三幕',
        description: 'ウェディングドレス姿の客、目撃者、そして一年後',
        memberIds: ['wedding-dress', 'window-washer', 'bride-returns', 'heartbrokens-ex'],
    },
    {
        id: 'thread-translator',
        title: '翻訳者と編集者',
        description: '締め切り前の翻訳者と、やってくる編集者',
        memberIds: ['translator-stuck', 'translator-deadline', 'boss-translators-deadline'],
    },
    {
        id: 'thread-sommelier',
        title: '世界最悪のソムリエの復讐',
        description: '自信満々のソムリエと、彼の過去の弟子',
        memberIds: ['worlds-worst-sommelier', 'sommelier-revenge'],
    },
    {
        id: 'thread-fisherman',
        title: '漁師とその息子',
        description: '夜明け前の漁師と、息子が継いだ日',
        memberIds: ['fisherman-dawn', 'fishermans-son'],
    },
    {
        id: 'thread-alien',
        title: '宇宙人の再訪',
        description: '一度目と二度目、客は変わったか',
        memberIds: ['alien', 'alien-return'],
    },
    {
        id: 'thread-edo',
        title: '江戸からの使者',
        description: '時代を超えた客と、もう一人の時代移動者',
        memberIds: ['edo-timer', 'time-slip'],
    },
    {
        id: 'thread-gondo-family',
        title: '権藤の家族たち',
        description: 'マスターの娘、弟、そして母の話',
        memberIds: ['gondos-daughter', 'boss-masters-friend', 'kenjis-brother', 'boss-mother-of-regular'],
    },
    {
        id: 'thread-philosopher',
        title: '実存の連鎖',
        description: '哲学者、元の自分、そして夢の訪問者',
        memberIds: ['existential-philosopher', 'former-self', 'dream-visitor'],
    },
    {
        id: 'thread-critic',
        title: '評論家とアシスタント',
        description: 'アシスタントが先に偵察、本物が後でくる',
        memberIds: ['critics-assistant', 'boss-the-critic'],
    },
    {
        id: 'thread-cryptid',
        title: '河童ハンターと獲物',
        description: 'ハンターと、ハンターが探している対象',
        memberIds: ['cryptid-hunter', 'hunters-subject'],
    },
    {
        id: 'thread-returning-daughter',
        title: '二十年ぶりの姉',
        description: '十年ぶりの娘と、彼女の兄',
        memberIds: ['boss-returning-daughter', 'regulars-daughter'],
    },
];

export function getThread(id: string): NarrativeThread | undefined {
    return THREADS.find(t => t.id === id);
}

export function threadsContaining(customerId: string): NarrativeThread[] {
    return THREADS.filter(t => t.memberIds.includes(customerId));
}
