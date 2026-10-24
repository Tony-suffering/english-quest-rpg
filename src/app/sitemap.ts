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
        // 公開版の3画面と案内
        page('/english/home', 0.95, 'daily'),
        page('/english/materials', 0.9),
        page('/english/info', 0.6, 'monthly'),
        page('/english/about', 0.6, 'monthly'),
        // 会話の教材
        page('/english/course', 0.8),
        page('/english/izakaya-toeic/kaiwa', 0.8),
        page('/english/izakaya-toeic/kaiwa/lp', 0.6, 'monthly'),
        page('/english/nihongo', 0.6),
        page('/english/goroku', 0.6),
        // 試験対策・読む聞く
        page('/english/toeic', 0.7),
        page('/english/writepass', 0.6),
        page('/english/write', 0.6),
        page('/english/newspaper', 0.6, 'daily'),
        page('/english/ear', 0.5, 'monthly'),
        page('/install', 0.3, 'monthly'),
    ]
}
