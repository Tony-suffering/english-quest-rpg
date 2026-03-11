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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://english-quest-rpg.vercel.app'),
  title: 'English Quest RPG',
  description: 'RPG-style English learning app. Master natural English through quests, conversations, and daily practice.',
  keywords: ['English learning', 'RPG', 'English quest', 'conversation practice'],
  authors: [{ name: 'tonio' }],
  icons: {
    icon: '/english-icon.png',
    shortcut: '/english-icon.png',
    apple: '/english-icon.png',
  },
  openGraph: {
    title: 'English Quest RPG',
    description: 'RPG-style English learning app. Master natural English through quests, conversations, and daily practice.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://english-quest-rpg.vercel.app',
    siteName: 'English Quest RPG',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/english-icon.png',
        width: 512,
        height: 512,
        alt: 'English Quest RPG',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'English Quest RPG',
    description: 'RPG-style English learning app. Master natural English through quests, conversations, and daily practice.',
    images: ['/english-icon.png'],
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

import CinematicOverlay from '@/components/ui/CinematicOverlay'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className={`${spaceGrotesk.variable} ${sora.variable} ${mPlusRounded.variable} ${zenKaku.variable} ${notoSansJP.variable}`}>
      <body className={`${zenKaku.className} antialiased`}>
        <CinematicOverlay />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
