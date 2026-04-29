import Link from 'next/link';

interface Props {
    variant?: 'card' | 'inline';
    label?: string;
    note?: string;
}

export default function LineFriendAddCTA({
    variant = 'card',
    label = 'LINEで毎朝1フレーズ',
    note = '7:00に「今日のひと言」が届く。1日10秒。',
}: Props) {
    const href = process.env.NEXT_PUBLIC_LINE_FRIEND_URL || 'https://lin.ee/';

    if (variant === 'inline') {
        return (
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#06C755] text-white text-sm font-medium hover:bg-[#05A648] transition-all"
            >
                <span className="text-base font-bold">LINE</span>
                <span>{label}</span>
            </Link>
        );
    }

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl border border-stone-200 p-5 hover:border-[#06C755] hover:shadow-lg transition-all"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#06C755] text-white flex items-center justify-center font-bold text-sm">
                    LINE
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-stone-800 tracking-wider">{label}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{note}</div>
                </div>
                <div className="text-stone-400 text-sm">→</div>
            </div>
        </Link>
    );
}
