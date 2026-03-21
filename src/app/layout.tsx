import type { Metadata } from "next";
import { Space_Grotesk, Sora, Zen_Kaku_Gothic_New, Noto_Sans_JP } from 'next/font/google'
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.toniolab.com'),
  title: 'とにおラボ | TONIO LAB',
  description: 'TOEIC900点なのに喋れない男が、自分で英語アプリを作ってる。英語フレーズをポケモンみたいに捕まえて、育てて、戦わせる。',
  keywords: ['とにおラボ', 'TONIO LAB', 'TOEIC', '英語学習', '居酒屋TOEIC', '英語アプリ'],
  authors: [{ name: 'tonio' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/english-icon.png',
    shortcut: '/english-icon.png',
    apple: '/english-icon.png',
  },
  openGraph: {
    title: 'とにおラボ | TONIO LAB',
    description: 'TOEIC900点なのに喋れない男が、自分で英語アプリを作ってる。',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.toniolab.com',
    siteName: 'とにおラボ',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/english-icon.png',
        width: 512,
        height: 512,
        alt: 'とにおラボ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'とにおラボ | TONIO LAB',
    description: 'TOEIC900点なのに喋れない男が、自分で英語アプリを作ってる。',
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
    <html lang="ja" suppressHydrationWarning className={`${spaceGrotesk.variable} ${sora.variable} ${zenKaku.variable} ${notoSansJP.variable}`}>
      <body className={`${zenKaku.className} antialiased`}>
        <CinematicOverlay />
        {children}
        <Toaster />
        <script dangerouslySetInnerHTML={{ __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});}` }} />
      </body>
    </html>
  );
}
