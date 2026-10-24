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
    ],
};
