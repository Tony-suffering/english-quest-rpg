// GRIND 365 -- daily study video log
// Add entries here. Date format: YYYY-MM-DD.
// Latest entry goes at the TOP of the array.

export interface GrindEntry {
    id: string;
    date: string;          // YYYY-MM-DD
    youtube_id: string;    // 11-char YouTube ID
    title: string;
    title_ja: string;
    note: string;
    tags: string;          // comma-separated
    duration: number;      // seconds (optional, 0 if unknown)
}

export const grindEntries: GrindEntry[] = [
    {
        id: 'log-2026-04-14-01',
        date: '2026-04-14',
        youtube_id: 'NBZv0_MImIY',
        title: "Y'all mind if I complain for 15 minutes?",
        title_ja: 'ジェイデンの愚痴15分ぶっ通し耐久リスニング',
        note: `記念すべき初日。JaidenAnimationsが15分間ひたすら愚痴り続ける動画を流した。

教科書にはない「感情の乗った英語」ってこういうのだと思う。棒読みの音声教材100時間聞くより、本気で苛立ってる人の15分のほうが耳には残る。

特に拾えたやつ:
- "Y'all mind if..." -- 完全にスラング入り口。教本では絶対出てこない
- 文末を引きずる癖 (thing...なんとか...みたいな間)
- 息継ぎのタイミングで思考が切り替わる瞬間

日常のグチを英語で聞けるレベルまで行けば、たぶんネイティブの独り言ラジオ全部ついていける。ここ目指す。`,
        tags: 'listening,casual,rant,slang',
        duration: 900,
    },
];
