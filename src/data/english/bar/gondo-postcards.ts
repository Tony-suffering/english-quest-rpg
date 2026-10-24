/**
 * Silent Bartender -- Gondo's postcards.
 *
 * On specific milestone nights, a physical postcard appears on the
 * counter at the start of the shift. Gondo doesn't explain how. The
 * player can view the postcard later in the journal.
 */

export interface Postcard {
    id: string;
    unlockNight: number;
    sender: string;
    postmark: string;        // JP, where it came from
    body: string;            // JP, Gondo's voice, short
}

export const POSTCARDS: Postcard[] = [
    {
        id: 'postcard-night-77',
        unlockNight: 77,
        sender: '権藤',
        postmark: '地方の温泉町',
        body:
            '七十七夜。よくやった。\n' +
            'だが俺の席はまだ空けておけ。戻る日は決めていない。\n' +
            '温泉の湯は、案外あっさりしている。',
    },
    {
        id: 'postcard-night-150',
        unlockNight: 150,
        sender: '権藤',
        postmark: '小さな漁港',
        body:
            '百五十夜目。\n' +
            '今日、魚を獲る船に乗った。海の上では、静けさの意味が変わる。\n' +
            '店の奥の写真、あれは海じゃなくて、湖の方だ。訂正しておけ。',
    },
    {
        id: 'postcard-night-250',
        unlockNight: 250,
        sender: '権藤',
        postmark: '北の町',
        body:
            '二百五十夜。北は雪が早い。\n' +
            'お前の夜、客はどうだ。俺が知っている常連は、何人残っている。\n' +
            '返事はいい。お前の返事は、暖簾を毎日開けることだ。',
    },
    {
        id: 'postcard-night-400',
        unlockNight: 400,
        sender: '権藤',
        postmark: '南の島',
        body:
            '四百夜。南では、夜が短い。\n' +
            '店はどうだ、と聞きたくなったが、聞かない。\n' +
            'カウンターの右端の傷、あれは俺がつけた。消さずに置いておけ。',
    },
    {
        id: 'postcard-night-500',
        unlockNight: 500,
        sender: '権藤',
        postmark: '元の町の近く',
        body:
            '五百夜。お前の店と呼んでいいころだ。\n' +
            '暖簾は、俺が引き継いだ時と同じ布じゃない、と気づいているか。\n' +
            '二代目の布は、もう三十年使った。お前が次の布を選べ。',
    },
    {
        id: 'postcard-night-700',
        unlockNight: 700,
        sender: '権藤',
        postmark: '海外のどこか',
        body:
            '七百夜。俺は今、海外にいる。どこかは書かない。\n' +
            '夜の店の照明は、世界中どこもほぼ同じ温度だ。\n' +
            'お前の店、まだそこにある。俺には分かる。',
    },
    {
        id: 'postcard-night-900',
        unlockNight: 900,
        sender: '権藤',
        postmark: '帰路',
        body:
            '九百夜。そろそろ戻るかもしれない。\n' +
            '戻ったら、客として一度だけ暖簾をくぐる。\n' +
            'お前は、俺を普通の客として扱え。それが、師弟の最後の作法だ。',
    },
];

export function getAvailablePostcards(totalNights: number): Postcard[] {
    return POSTCARDS.filter(p => p.unlockNight <= totalNights);
}

export function getPostcardForTonight(totalNights: number): Postcard | null {
    return POSTCARDS.find(p => p.unlockNight === totalNights) ?? null;
}
