import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = SITE_URL

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // 運営用・作者個人の記録は検索に出さない
            disallow: ['/private/', '/dev', '/voice-lab', '/membership/life/admin', '/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
