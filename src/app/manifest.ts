import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'とにおラボ | TONIO LAB',
    short_name: 'とにおラボ',
    description: '知っている英語を会話で出るようにする、1日5分の練習。無料・登録不要、記録は端末内に保存。',
    start_url: '/english/home',
    display: 'standalone',
    background_color: '#FAFAF9',
    theme_color: '#D4AF37',
    orientation: 'portrait',
    icons: [
      {
        src: '/english-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/english-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['education'],
    lang: 'ja',
    dir: 'ltr',
  }
}
