/**
 * CorkJijiiTV Live Data API
 *
 * リアルタイムデータを取得するAPI
 * - 天気（Open-Meteo API - 無料、APIキー不要）
 * - 建設業ニュース（RSSフィード - NHK, Yahoo）
 * - ジャーナルから最新インサイト
 */

import { NextResponse } from 'next/server'
import { journalEntries } from '@/data/journal'

// 東京の座標
const TOKYO_LAT = 35.6762
const TOKYO_LON = 139.6503

// RSSフィードURL
const RSS_FEEDS = [
    { name: 'NHK', url: 'https://www3.nhk.or.jp/rss/news/cat0.xml' },
    { name: 'Yahoo経済', url: 'https://news.yahoo.co.jp/rss/categories/business.xml' },
]

// 建設業界関連キーワード
const CONSTRUCTION_KEYWORDS = [
    '建設', '建築', '工事', '施工', '住宅', 'リフォーム', '不動産',
    '土木', 'インフラ', '再開発', 'マンション', 'ビル', '職人',
    '資材', '木造', '耐震', '断熱', '省エネ', '環境', 'BIM',
    '人手不足', '働き方', '賃金', '労働', '技能', '外国人',
    '国交省', '国土交通', '法改正', '規制', '補助金', '助成',
]

// RSSをパースしてニュースを取得
async function fetchRSSNews(): Promise<{ title: string; source: string; link: string }[]> {
    const allNews: { title: string; source: string; link: string }[] = []

    for (const feed of RSS_FEEDS) {
        try {
            const res = await fetch(feed.url, {
                next: { revalidate: 1800 }, // 30分キャッシュ
                headers: { 'User-Agent': 'CorkJijiiTV/1.0' }
            })

            if (!res.ok) continue

            const text = await res.text()

            // シンプルなXMLパース（<item>タグを抽出）
            const itemMatches = text.match(/<item>([\s\S]*?)<\/item>/g) || []

            for (const item of itemMatches.slice(0, 10)) {
                const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/)
                const linkMatch = item.match(/<link>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/link>/)

                if (titleMatch && titleMatch[1]) {
                    allNews.push({
                        title: titleMatch[1].trim(),
                        source: feed.name,
                        link: linkMatch ? linkMatch[1].trim() : ''
                    })
                }
            }
        } catch {
            // フィード取得失敗は無視
        }
    }

    return allNews
}

// 建設業界関連ニュースをフィルタリング
function filterConstructionNews(news: { title: string; source: string; link: string }[]) {
    const constructionNews = news.filter(item =>
        CONSTRUCTION_KEYWORDS.some(keyword => item.title.includes(keyword))
    )

    // 建設業界ニュースがなければ経済ニュースを返す
    if (constructionNews.length === 0) {
        return news.slice(0, 5) // 上位5件
    }

    return constructionNews
}

// 天気コードの日本語マッピング
const WEATHER_DESCRIPTIONS: Record<number, string> = {
    0: '快晴',
    1: '晴れ',
    2: '曇りがち',
    3: '曇り',
    45: '霧',
    48: '霧氷',
    51: '小雨',
    53: '雨',
    55: '強い雨',
    61: '小雨',
    63: '雨',
    65: '強い雨',
    71: '小雪',
    73: '雪',
    75: '大雪',
    80: 'にわか雨',
    81: 'にわか雨',
    82: '激しいにわか雨',
    85: 'にわか雪',
    86: '激しいにわか雪',
    95: '雷雨',
    96: '雹を伴う雷雨',
    99: '激しい雷雨',
}

// 天気に対するじじいのコメント
const WEATHER_COMMENTS: Record<string, string[]> = {
    晴れ系: [
        'ええ天気じゃのう。こういう日はクロスの糊がよく乾く。',
        '天気がいいと現場の足運びも軽くなるわい。',
        '日差しが強いと、壁紙の色の確認がしやすいのう。',
    ],
    曇り系: [
        '曇っとるのう。でもクロス貼りには丁度ええわ。直射日光で糊が乾きすぎんからな。',
        '曇り空じゃ。照明当てて壁紙の色を確認せにゃならんのう。',
    ],
    雨系: [
        '雨か...湿度が高いと糊の乾きが遅いのう。じゃが、急ぐ仕事にろくなもんはない。',
        '雨の日は現場への材料搬入が大変じゃ。コルクは水に弱いからのう。',
        '雨降りじゃのう。こういう日は見積もり作業に集中するのもええ。',
    ],
    雪系: [
        'むう、雪か。若い頃、雪に埋もれたコルクを救ったことを思い出すわい。',
        '雪の日は現場に行けんこともある。でも、その分じっくり計画を練れるのう。',
    ],
    雷雨系: [
        '雷雨じゃと！？電動工具は使えんな。安全第一じゃ。',
        '激しい雷雨じゃのう。こういう時は無理せず現場を閉めるんじゃ。',
    ],
    霧系: [
        '霧が出とるのう。こういう日は湿度が高い。塗装には向かんが、クロス貼りにはまあまあじゃ。',
    ],
}

function getWeatherCategory(description: string): string {
    if (description.includes('雷')) return '雷雨系'
    if (description.includes('雪')) return '雪系'
    if (description.includes('雨')) return '雨系'
    if (description.includes('霧')) return '霧系'
    if (description.includes('曇')) return '曇り系'
    return '晴れ系'
}

// フォールバック用の固定トピック（RSS取得失敗時）
const FALLBACK_TOPICS = [
    { title: '国土交通省、建設業の働き方改革を推進', source: '建設通信', link: '' },
    { title: '木造建築の新基準、来年施行へ', source: '日経建設', link: '' },
    { title: '建設資材価格、高止まり続く', source: '建設通信', link: '' },
    { title: '人手不足対策、外国人技能実習生の受け入れ拡大', source: '日経建設', link: '' },
    { title: 'BIM活用、中小建設業でも進む', source: '建設通信', link: '' },
    { title: 'リフォーム市場、2024年も堅調推移の見込み', source: '日刊建設', link: '' },
]

// ニュースに対するじじいのコメントパターン
const NEWS_COMMENT_PATTERNS: { keywords: string[]; comments: string[] }[] = [
    {
        keywords: ['働き方', '労働', '残業', '休日'],
        comments: [
            'わしらの時代は日が暮れても現場におったがのう。今は違う。それでええんじゃ。',
            '若いもんにはちゃんと休んでもらわんとな。疲れた職人に良い仕事はできん。',
        ]
    },
    {
        keywords: ['木造', '建築', '住宅', 'マンション'],
        comments: [
            '木造か。わしはコルクじゃが、木の温もりは分かるぞ。自然素材は正義じゃ。',
            '住まいは人生の器じゃ。どんな建物でも、住む人の幸せを願って作るんじゃ。',
        ]
    },
    {
        keywords: ['価格', '資材', 'コスト', '値上げ', '高騰'],
        comments: [
            '材料費が上がっとるのう。でもな、安い材料でええもんは作れん。',
            'コストが上がっても品質は落とせん。それが職人の意地じゃ。',
        ]
    },
    {
        keywords: ['人手', '人材', '採用', '若者', '技能'],
        comments: [
            '若いもんが来んのは、業界のイメージの問題じゃ。カッコええ仕事だと見せにゃならん。',
            '技術の継承は待ったなしじゃ。わしらの技を次の世代に渡さにゃならん。',
        ]
    },
    {
        keywords: ['BIM', 'デジタル', 'AI', 'DX', 'IT'],
        comments: [
            'BIMか...タクミに任せとる。わしはアナログで十分じゃ。冗談じゃ、興味はあるぞ。',
            'デジタルも大事じゃが、最後は人の手で仕上げるんじゃ。そこは変わらん。',
        ]
    },
    {
        keywords: ['リフォーム', '改修', 'リノベ', '耐震'],
        comments: [
            'リフォームはええぞ。既存の建物に命を吹き込む。新築よりやりがいがあることもある。',
            '古い建物を活かすのも職人の腕の見せどころじゃ。',
        ]
    },
    {
        keywords: ['不動産', '地価', '再開発', 'エリア'],
        comments: [
            '街が変わっていくのう。でも、ええ建物は残り続ける。そこにわしらの仕事がある。',
            '開発も結構じゃが、歴史ある建物は大切にしてほしいのう。',
        ]
    },
    {
        keywords: ['環境', '省エネ', '断熱', 'カーボン', 'SDGs'],
        comments: [
            '環境のことを考えんとな。コルクは自然素材じゃから、その点は安心じゃ。',
            '断熱は大事じゃぞ。快適さと省エネ、両方叶えるのがこれからの建築じゃ。',
        ]
    },
    {
        keywords: ['国交省', '国土交通', '法改正', '規制', '許可'],
        comments: [
            'お上の決めることは守らにゃならん。でも現場の声も聞いてほしいのう。',
            '法律が変わると対応が大変じゃ。でも、安全のためなら仕方ない。',
        ]
    },
    {
        keywords: ['補助金', '助成', '支援', '給付'],
        comments: [
            '補助金はありがたいのう。使えるもんは使って、ええ仕事をするんじゃ。',
            '支援制度は調べんと損じゃ。タクミ、ちゃんと調べとるか？',
        ]
    },
]

// ニュースに対するじじいのコメント生成
function generateNewsComment(title: string): string {
    for (const pattern of NEWS_COMMENT_PATTERNS) {
        if (pattern.keywords.some(keyword => title.includes(keyword))) {
            return pattern.comments[Math.floor(Math.random() * pattern.comments.length)]
        }
    }
    // マッチしなかった場合の汎用コメント
    const generalComments = [
        'ふむ...業界も変わっていくのう。でも、職人の技は変わらん。',
        'ニュースを見とると世の中の動きがわかるのう。',
        'こういう話は知っておくとええぞ。現場だけ見とったらあかん。',
        'へえ、そうなんか。タクミ、これどう思う？',
    ]
    return generalComments[Math.floor(Math.random() * generalComments.length)]
}

export async function GET() {
    try {
        // 1. 天気データを取得（Open-Meteo API - 無料）
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${TOKYO_LAT}&longitude=${TOKYO_LON}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=Asia/Tokyo`,
            { next: { revalidate: 1800 } } // 30分キャッシュ
        )

        let weather = null
        let weatherComment = null

        if (weatherRes.ok) {
            const weatherData = await weatherRes.json()
            const current = weatherData.current
            const description = WEATHER_DESCRIPTIONS[current.weather_code] || '不明'
            const category = getWeatherCategory(description)
            const comments = WEATHER_COMMENTS[category] || WEATHER_COMMENTS['晴れ系']

            weather = {
                temperature: Math.round(current.temperature_2m),
                humidity: current.relative_humidity_2m,
                description,
                code: current.weather_code,
            }

            weatherComment = {
                speaker: 'jijii' as const,
                text: `【天気】${description}、${weather.temperature}℃、湿度${weather.humidity}%じゃ。${comments[Math.floor(Math.random() * comments.length)]}`,
                type: 'weather',
            }
        }

        // 2. 建設業ニュース（RSSから取得）
        let newsItems: { title: string; source: string; link: string }[] = []
        try {
            const rssNews = await fetchRSSNews()
            newsItems = filterConstructionNews(rssNews)
        } catch {
            // RSS取得失敗時はフォールバック
        }

        // RSSが空ならフォールバック
        if (newsItems.length === 0) {
            newsItems = FALLBACK_TOPICS
        }

        // 複数のニュースを返す（最大5件）
        const newsHighlights = newsItems.slice(0, 5).map(item => ({
            title: item.title,
            source: item.source,
            link: item.link,
            comment: generateNewsComment(item.title),
        }))

        // ランダムに1つ選んでメインコメント
        const randomNews = newsItems[Math.floor(Math.random() * Math.min(newsItems.length, 5))]
        const newsComment = {
            speaker: 'jijii' as const,
            text: `【ニュース】${randomNews.title}（${randomNews.source}）...${generateNewsComment(randomNews.title)}`,
            type: 'news',
            link: randomNews.link,
        }

        // 3. ジャーナルからインサイト（複数記事）
        const recentEntries = journalEntries.slice(0, 5)

        // 複数の記事ハイライト
        const journalHighlights = recentEntries.map(entry => {
            const firstParagraph = entry.conversation
                .split('\n')
                .filter(line => line.trim() && !line.startsWith('#') && !line.startsWith('>') && !line.startsWith('|'))
                .slice(0, 2)
                .join(' ')
                .substring(0, 120)

            return {
                id: entry.id,
                title: entry.title,
                summary: entry.summary,
                excerpt: firstParagraph,
                heroImage: entry.heroImage,
                date: entry.date,
                readTime: entry.readTime,
                tags: entry.businessTags.slice(0, 3),
            }
        })

        // ランダムに1つ選んでじじいが紹介
        const randomEntry = recentEntries[Math.floor(Math.random() * recentEntries.length)]
        const journalInsight = {
            speaker: 'jijii' as const,
            text: `【今日のジャーナル】「${randomEntry.title}」...${randomEntry.summary}...続きはサイトで読んでくれい。`,
            type: 'journal',
            entryId: randomEntry.id,
            heroImage: randomEntry.heroImage,
        }

        // 4. 経営力向上支援・工業会証明書などの豆知識
        const BUSINESS_TIPS = [
            {
                speaker: 'jijii' as const,
                text: '【豆知識】経営力向上計画って知っとるか？中小企業が設備投資する時、税制優遇が受けられるんじゃ。うちも使っとる。',
                type: 'business_tip',
            },
            {
                speaker: 'takumi' as const,
                text: '【豆知識】工業会証明書があると、設備投資の税額控除が受けられるっすよ。詳しくは税理士さんに相談が吉っす！',
                type: 'business_tip',
            },
            {
                speaker: 'jijii' as const,
                text: '【豆知識】建設業許可の更新は5年ごとじゃ。忘れると大変なことになるぞ。わしは3ヶ月前から準備しとる。',
                type: 'business_tip',
            },
            {
                speaker: 'takumi' as const,
                text: '【豆知識】インボイス制度、もう対応済みっすか？免税事業者との取引は要注意っすよ。',
                type: 'business_tip',
            },
            {
                speaker: 'anya' as const,
                text: '【豆知識】クロス張りって、天井から貼るんだって。重力で糊が垂れないように...へえー。',
                type: 'business_tip',
            },
        ]

        const randomTip = BUSINESS_TIPS[Math.floor(Math.random() * BUSINESS_TIPS.length)]

        // 現在時刻に基づく挨拶
        const hour = new Date().getHours()
        let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
        if (hour >= 5 && hour < 12) timeOfDay = 'morning'
        else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon'
        else if (hour >= 17 && hour < 21) timeOfDay = 'evening'
        else timeOfDay = 'night'

        return NextResponse.json({
            success: true,
            timestamp: new Date().toISOString(),
            timeOfDay,
            weather,
            journalHighlights,
            newsHighlights, // RSSから取得したニュース一覧
            content: {
                weatherComment,
                newsComment,
                journalInsight,
                businessTip: randomTip,
            },
        })
    } catch {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch TV data' },
            { status: 500 }
        )
    }
}
