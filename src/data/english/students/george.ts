import type { Student } from './types';

/**
 * ジョージ(georgef19)
 *
 * レッスンの表現を日付ごとに足していく。日本語はカードの裏(手がかり)。
 * 英語は本人が実際に練習した文をそのまま。
 */
export const GEORGE: Student = {
    slug: 'george',
    name: 'ジョージ',
    coach: 'とにお',
    // 合言葉はコーチが Discord で本人にだけ渡す。ここはそのハッシュ
    accessHash: '5222a32a5043a1897626e872f5a3d1d9014cce54974bbcafffcc624ef04b0643',
    intro: 'レッスンで練習した英語をカードにしてあります。日本語を見て英語を言ってみて、言えたらカードを押してレベルを上げてください。',
    lessons: [
        {
            date: '2026-10-24',
            title: '季節の変わり目の雑談',
            phrases: [
                { english: 'Did you sleep well last night?', japanese: '昨日の夜はよく眠れた？' },
                { english: 'Lately, I wake up in the middle of the night because of the changing seasons.', japanese: '最近、季節の変わり目で夜中に目が覚めるんだ。' },
                { english: "Isn't it cold at night lately?", japanese: '最近、夜は寒くない？' },
                { english: 'How are things going with your Japanese girlfriend lately?', japanese: '最近、日本人の彼女とはどう？' },
                { english: "Sounds like I'd get yelled at if I just said that out of nowhere!", japanese: 'それ、いきなり言ったら怒られそうだね！' },
            ],
        },
        {
            date: '2026-10-28',
            title: '週末・中間選挙・給食',
            phrases: [
                { english: 'How did you spend your weekend?', japanese: '週末どう過ごした？' },
                { english: 'What do you think about the US midterm elections?', japanese: 'アメリカの中間選挙はどう思ってますか？' },
                { english: 'Are you voting by mail again this time?', japanese: '今回も郵送して投票するの？' },
                { english: 'What points are you focusing on in this election?', japanese: '今回の選挙で注目する点を教えてください。' },
                { english: 'I went out to eat with my high school friends this weekend.', japanese: '週末は高校時代の友達とご飯を食べに行きました。' },
                { english: "You've looked sleepy lately. Are you feeling okay?", japanese: '最近眠そうにしてるけど、体調大丈夫？' },
                { english: 'The magatama we made the other day is an ancient Japanese ornament from around the 3rd to 5th century.', japanese: 'この前作った勾玉は、日本の3世紀から5世紀あたりの古代の装飾品です。' },
                { english: 'Do you eat school lunch every day?', japanese: '給食は毎日食べてますか？' },
                { english: "Do you bring your own lunch when you don't like it?", japanese: '苦手な時は弁当を持ってきてますか？' },
            ],
        },
    ],
};
