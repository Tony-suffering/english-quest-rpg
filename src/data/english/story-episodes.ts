// v7 物語没入チャット — narrative immersion (LINE/chat style)
// 物語をチャットスレッド風に読み進める。地の文(日本語)+セリフ(英語)で文脈ごと覚える。
// データはワークフロー(story-v7)が生成。下記は見本兼フォールバック。

export interface StoryLine {
    kind: 'narration' | 'dialogue';
    speaker?: string;     // dialogue時の話者
    en?: string;          // セリフ(英語)
    ja: string;           // 地の文 or セリフ和訳
    note?: string;        // とにおの一言
}

export interface StoryEpisode {
    id: string;
    title: string;
    premise: string;     // 状況(日本語)
    lines: StoryLine[];
}

export const STORY_EPISODES: StoryEpisode[] = [
    {
        id: 's-001',
        title: '隣の席のうるさい客',
        premise: "海外のカフェ。隣のテーブルの電話の声がデカい。意を決して声をかける。",
        lines: [
            { kind: 'narration', ja: "コーヒーを片手に集中したいのに、隣の男の通話がうるさい。深呼吸して、声をかけた。" },
            { kind: 'dialogue', speaker: 'あなた', en: "Excuse me, would you mind keeping it down a little?", ja: "すみません、もう少し声を抑えてもらえます？", note: "would you mind -ing? は丁寧に頼む鉄板。keep it down=声を抑える。" },
            { kind: 'dialogue', speaker: '男', en: "Oh — sorry, didn't realize I was being loud. My bad.", ja: "あ、ごめん、うるさいって気づかなかった。悪いね。", note: "My bad=ごめん(軽い)。didn't realize=気づかなかった。" },
            { kind: 'narration', ja: "拍子抜けするほど素直に謝られた。身構えてたのが馬鹿みたいだった。" },
            { kind: 'dialogue', speaker: 'あなた', en: "No worries, thanks.", ja: "いえ、ありがとう。", note: "No worries=気にしないで。揉めずに終わらせる魔法の一言。" },
        ],
    },
];
