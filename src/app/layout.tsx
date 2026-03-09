import type { Metadata } from "next";
import { Space_Grotesk, Sora, M_PLUS_Rounded_1c, Zen_Kaku_Gothic_New, Noto_Sans_JP } from 'next/font/google'
import "./globals.css";
import { Toaster } from '@/components/ui/sonner'

// モバイル最適化: 必要最小限のフォントのみpreload
const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  variable: '--font-zen-kaku',
  weight: ['400', '700'], // 使用頻度の高いウェイトのみ
  display: 'swap',
  preload: true
})
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['400', '700'], // 使用頻度の高いウェイトのみ
  display: 'swap',
  preload: true
})

// 以下は遅延読み込み（preload: false）
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['400', '700'], display: 'swap', preload: false })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', weight: ['400', '700'], display: 'swap', preload: false })
const mPlusRounded = M_PLUS_Rounded_1c({ subsets: ['latin'], variable: '--font-mplus-rounded', weight: ['400', '700'], display: 'swap', preload: false })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://iwasaki-naisou.com'),
  title: 'イワサキ内装 | 東京都の内装工事・クロス張替え・床施工専門店',
  description: '東京都を中心に30年以上の実績。住宅・店舗・オフィスの内装工事、クロス張替え、床材施工、バリアフリー改修を手掛ける信頼の内装専門業者です。',
  keywords: ['内装工事', 'クロス張替え', '床施工', 'リフォーム', 'バリアフリー', '東京都', 'イワサキ内装'],
  authors: [{ name: 'イワサキ内装' }],
  icons: {
    icon: '/iwasaki.png',
    shortcut: '/iwasaki.png',
    apple: '/iwasaki.png',
  },
  openGraph: {
    title: 'イワサキ内装 | 東京都の内装工事・クロス張替え・床施工専門店',
    description: '東京都を中心に30年以上の実績。住宅・店舗・オフィスの内装工事、クロス張替え、床材施工を手掛ける信頼の内装専門業者です。',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iwasaki-naisou.com',
    siteName: 'イワサキ内装',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/iwasaki.png',
        width: 512,
        height: 512,
        alt: 'イワサキ内装ロゴ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'イワサキ内装 | 東京都の内装工事専門店',
    description: '東京都を中心に30年以上の実績。住宅・店舗・オフィスの内装工事、クロス張替え、床材施工を手掛ける信頼の内装専門業者です。',
    images: ['/iwasaki.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import JsonLd from '@/components/website/JsonLd'
import CinematicOverlay from '@/components/ui/CinematicOverlay'
// [n8n停止中] 一時的に非表示
// import { CorkGrandpaFeed } from '@/components/website/CorkGrandpaFeed'
// import EcosystemChat from '@/components/website/EcosystemChat'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${spaceGrotesk.variable} ${sora.variable} ${mPlusRounded.variable} ${zenKaku.variable} ${notoSansJP.variable}`}>
      <body className={`${zenKaku.className} antialiased`}>
        <JsonLd />
        <CinematicOverlay />
        {children}
        {/* [n8n停止中] 一時的に非表示
        <CorkGrandpaFeed />
        <EcosystemChat />
        */}
        <Toaster />
      </body>
    </html>
  );
}
