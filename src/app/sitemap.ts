import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_URL
    const now = new Date()
    const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly') => ({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
    })

    return [
        page('/', 1, 'weekly'),
        // 英語魂(iwasaki-naisou-website の英語アプリをそのまま)
        page('/english/training', 0.95, 'daily'),
        page('/english/newspaper', 0.7, 'daily'),
        page('/english/nihongo', 0.6),
        page('/english/goroku', 0.6),
        page('/english/grown', 0.6),
        page('/english/writepass', 0.6),
        page('/english/write', 0.6),
        page('/english/toeic', 0.6),
        page('/english/speaking-guide', 0.5, 'monthly'),
        // とにおラボ側の既存の入口
        page('/english/course', 0.7),
        page('/english/izakaya-toeic/kaiwa', 0.7),
        page('/english/ear', 0.5, 'monthly'),
        page('/install', 0.3, 'monthly'),
    ]
}
