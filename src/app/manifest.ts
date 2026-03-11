import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'English Quest RPG',
    short_name: 'English',
    description: 'Daily English phrases learning app with Spotify-style player',
    start_url: '/english',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#D4AF37',
    orientation: 'portrait',
    icons: [
      {
        src: '/english-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/english-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/english-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
