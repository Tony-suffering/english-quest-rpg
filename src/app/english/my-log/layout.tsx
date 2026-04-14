import type { Metadata } from 'next';

const TITLE = '俺の勉強記録 -- TOEIC900点なのに喋れない男の毎日 | とにおラボ';
const DESCRIPTION = 'TOEIC900点なのに喋れない男の、自分の英語勉強動画だけを積み上げていく記録。誰も真似しない方がいい方法も全部見せる。';
const URL = '/english/my-log';
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
                alt: '俺の勉強記録 -- TOEIC900点なのに喋れない男の毎日',
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

export default function MyLogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
