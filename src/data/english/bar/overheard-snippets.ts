/**
 * Overheard Snippets -- Silent Bartender.
 *
 * Fragmentary conversation drift heard by the apprentice behind the counter
 * when two or more regulars share a phase. Unfinished, mid-sentence, quiet.
 * Shown rarely as subtitle-style flavor; no resolution, no names.
 */

export interface OverheardSnippet {
    id: string;
    body: string;
    topic: 'work' | 'family' | 'weather' | 'gossip' | 'regret' | 'memory' | 'plans' | 'silence';
    speakers: 1 | 2;
}

export const OVERHEARD_SNIPPETS: OverheardSnippet[] = [
    {
        id: 'snip-1',
        body: '客A「だからさ、うちの娘が去年から…」  客B「ああ、そうか」',
        topic: 'family',
        speakers: 2,
    },
    {
        id: 'snip-2',
        body: '男「…まあ、あの頃はみんな若かったんだよ」',
        topic: 'memory',
        speakers: 1,
    },
    {
        id: 'snip-3',
        body: '客A「課長がさ、今度また転勤だって」  客B「へえ、またか…」',
        topic: 'work',
        speakers: 2,
    },
    {
        id: 'snip-4',
        body: '老人「この雨、明日までらしいぞ」  男「らしいな…」',
        topic: 'weather',
        speakers: 2,
    },
    {
        id: 'snip-5',
        body: '女「結局あの人、店たたんだらしいのよ」  客A「…そうか」',
        topic: 'gossip',
        speakers: 2,
    },
    {
        id: 'snip-6',
        body: '男「あの時ああしとけば、って思うことが…」',
        topic: 'regret',
        speakers: 1,
    },
    {
        id: 'snip-7',
        body: '客A「来月また温泉でも行くかね」  客B「ああ、行こう行こう。…まあ、行けたらだが」',
        topic: 'plans',
        speakers: 2,
    },
    {
        id: 'snip-8',
        body: '向かい合って、二人とも何も言わない。三分ほど続いた。',
        topic: 'silence',
        speakers: 2,
    },
    {
        id: 'snip-9',
        body: '男「…なんだったかな、あの店の名前」',
        topic: 'memory',
        speakers: 1,
    },
    {
        id: 'snip-10',
        body: '客A「息子がね、今度結婚するって言い出して」  客B「おめでとう。…でも、なんだ、複雑かい」',
        topic: 'family',
        speakers: 2,
    },
    {
        id: 'snip-11',
        body: '客A「あの現場、もう取り壊し始まってるってよ」  客B「早いな、ついこないだまで…」',
        topic: 'work',
        speakers: 2,
    },
    {
        id: 'snip-12',
        body: '老人「雪、降るかな今年は」',
        topic: 'weather',
        speakers: 1,
    },
    {
        id: 'snip-13',
        body: '女「あの奥さんがさ、最近見ないと思ったら…」  客A「ああ、俺も聞いた」',
        topic: 'gossip',
        speakers: 2,
    },
    {
        id: 'snip-14',
        body: '男「謝る機会、もう無いんだよな、あれは…」',
        topic: 'regret',
        speakers: 1,
    },
    {
        id: 'snip-15',
        body: '客A「昔さ、この通りに映画館あったの、覚えてる?」  客B「あったあった。確か二階が…」',
        topic: 'memory',
        speakers: 2,
    },
    {
        id: 'snip-16',
        body: '客A「来年は孫と海でも行こうかと」  客B「いいねえ。…元気なうちにな」',
        topic: 'plans',
        speakers: 2,
    },
    {
        id: 'snip-17',
        body: '二人、グラスを見つめたまま黙っている。時計の音だけが聞こえる。',
        topic: 'silence',
        speakers: 2,
    },
    {
        id: 'snip-18',
        body: '男「家のやつがさ、最近口きいてくれなくて…」  客A「まあ、そういう時期もあるよ」',
        topic: 'family',
        speakers: 2,
    },
    {
        id: 'snip-19',
        body: '客A「辞めるのか、あの若いの」  客B「ああ、来月でって…」',
        topic: 'work',
        speakers: 2,
    },
    {
        id: 'snip-20',
        body: '女「蒸すねえ、今日は…」',
        topic: 'weather',
        speakers: 1,
    },
    {
        id: 'snip-21',
        body: '客A「あいつさ、またやらかしたらしいぞ」  客B「…もう何度目だ」',
        topic: 'gossip',
        speakers: 2,
    },
    {
        id: 'snip-22',
        body: '老人「あの時、止めときゃよかったんだよ、本当は…」',
        topic: 'regret',
        speakers: 1,
    },
    {
        id: 'snip-23',
        body: '客A「高校のさ、同窓会の知らせ来てたろ」  客B「ああ、来てた。…行くか、迷ってる」',
        topic: 'memory',
        speakers: 2,
    },
    {
        id: 'snip-24',
        body: '男「退職したら、まず何するって?」  客A「うーん、決めてない。…決めたくないのかもな」',
        topic: 'plans',
        speakers: 2,
    },
    {
        id: 'snip-25',
        body: '片方が何か言いかけて、やめた。もう片方は気づかないふりをした。',
        topic: 'silence',
        speakers: 2,
    },
];

export function pickSnippet(topic?: OverheardSnippet['topic']): OverheardSnippet {
    const pool = topic
        ? OVERHEARD_SNIPPETS.filter((s) => s.topic === topic)
        : OVERHEARD_SNIPPETS;
    const source = pool.length > 0 ? pool : OVERHEARD_SNIPPETS;
    const index = Math.floor(Math.random() * source.length);
    return source[index];
}
