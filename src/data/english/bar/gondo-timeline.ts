/**
 * Silent Bartender -- Gondo's timeline.
 *
 * A consistent backstory for Master Gondo, used as the canonical
 * source for fragments, letters, aftermath, and any future content.
 * Keep content authors on the same story beat.
 */

export interface TimelineEvent {
    era: string;
    year: number;         // approximate
    description: string;  // 1-2 lines
}

export const GONDO_TIMELINE: TimelineEvent[] = [
    { era: '生誕', year: 1968, description: '東京郊外、下町の古い商店街に生まれる。家族は醤油問屋を営んでいた。' },
    { era: '学生時代', year: 1986, description: '高校卒業と同時に家を出て、東京のバーでバイトを始める。翻訳の専門書を独学で読むのが趣味。' },
    { era: 'NY渡航', year: 1990, description: '師匠の紹介でニューヨークに渡る。マンハッタンの日本人街で5年間、バーテンダーを務めた。' },
    { era: 'NY時代', year: 1993, description: '当時の恋人とセントラルパークで撮った写真が、今も棚の奥に眠っている。' },
    { era: '帰国', year: 1995, description: '師匠の体調不良を機に帰国。引き継ぐ形で店を開いた。' },
    { era: '開店', year: 1996, description: '東京の下北沢に「居酒屋の無言給仕」(表向きの屋号は決めなかった) 開店。名前は客がつけた。' },
    { era: '火災', year: 2001, description: '隣の店の火災で一週間休業。元の木目のカウンターが少し焦げたが、磨き直して使い続けている。' },
    { era: '地震', year: 2011, description: '3月11日、店は無事だったが、常連の一人が翌週から来なくなった。理由は誰も知らない。' },
    { era: 'コロナ期', year: 2020, description: '一時休業。オンラインでの通信販売はしなかった。再開後、常連の多くは戻ってきた。' },
    { era: '師匠逝去', year: 2023, description: '師匠が亡くなる。葬儀の翌日、権藤は普通に店を開けた。客は誰も聞かなかった。' },
    { era: '現在', year: 2026, description: '権藤、58歳。倒れる前夜、珍しく早く店を閉めた。' },
];

/** Find the event closest to a given year. */
export function eventsNear(year: number, window = 3): TimelineEvent[] {
    return GONDO_TIMELINE.filter(e => Math.abs(e.year - year) <= window);
}
