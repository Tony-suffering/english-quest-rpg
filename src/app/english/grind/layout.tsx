import type { Metadata } from 'next';

const TITLE = 'GRIND 365 -- 毎日やってる英語勉強ログ | とにおラボ';
const DESCRIPTION = 'TOEIC900点なのに喋れない男が、1日1本サボらず勉強動画をアップしてる記録。毎日の過程を全部見せる。';
const URL = '/english/grind';
const IMAGE = '/english-icon.png';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
        canonical: URL,
    },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: URL,
        siteName: 'とにおラボ',
        locale: 'ja_JP',
        type: 'website',
        images: [
            {
                url: IMAGE,
                width: 1200,
                height: 630,
                alt: 'GRIND 365 -- 毎日英語勉強ログ',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: TITLE,
        description: DESCRIPTION,
        images: [IMAGE],
    },
};

export default function GrindLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
