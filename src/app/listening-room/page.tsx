'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

// ナビゲーション構造
const NAV_STRUCTURE = [
    {
        category: "入門",
        emoji: "📚",
        items: [
            { id: "intro", label: "はじめに" },
            { id: "why-3hours", label: "なぜ3時間聞くのか" },
            { id: "anti-biohacker", label: "アンチ・バイオハッカー宣言" },
            { id: "first-100h", label: "最初の100時間" },
        ]
    },
    {
        category: "実践",
        emoji: "⚡",
        items: [
            { id: "episodes", label: "おすすめエピソード" },
            { id: "ranking", label: "神回ランキング" },
            { id: "tried-it", label: "実践してみた結果" },
            { id: "daily-routine", label: "内装屋の1日" },
            { id: "equipment", label: "俺の装備" },
        ]
    },
    {
        category: "深掘り",
        emoji: "🔬",
        items: [
            { id: "1000h-journey", label: "1000時間の旅" },
            { id: "glossary", label: "用語集" },
            { id: "next-channels", label: "次に聞くチャンネル" },
            { id: "hikakin", label: "ヒカキン=ヒューバーマン説" },
        ]
    },
    {
        category: "おまけ",
        emoji: "🎁",
        items: [
            { id: "faq", label: "よくある質問" },
            { id: "failures", label: "失敗談" },
            { id: "aruaru", label: "あるある" },
            { id: "doubt-learning", label: "常識を疑え" },
            { id: "already-using", label: "すでに英語使ってる説" },
        ]
    },
    {
        category: "卒業",
        emoji: "🎓",
        items: [
            { id: "confession", label: "卒業者の告白" },
            { id: "lastly", label: "最後に" },
        ]
    }
]

// Hubermanの名言データ（YouTube タイムスタンプ付き）
const HUBERMAN_QUOTES = [
    {
        en: "Get sunlight in your eyes within 30-60 minutes of waking.",
        ja: "起きてから30〜60分以内に目に太陽光を入れろ。",
        tsukkomi: "朝5時に現場行く内装屋、太陽まだ寝てるんだが。",
        videoId: "WDv4AWk0J3U",
        timestamp: "0:45"
    },
    {
        en: "Dopamine is not about reward. It's about the pursuit of reward.",
        ja: "ドーパミンは報酬じゃない。報酬を追い求めることだ。",
        tsukkomi: "つまりパチンコで当たる前が一番脳汁出てるってこと？",
        videoId: "QmOF0crdyRU",
        timestamp: "1:23"
    },
    {
        en: "Deliberate cold exposure increases dopamine by 250%.",
        ja: "意図的な冷水浴でドーパミンが250%上昇する。",
        tsukkomi: "冬の現場で足場組んでると勝手に250%出てる説。",
        videoId: "pq6WHJzOkno",
        timestamp: "0:30"
    },
    {
        en: "Non-sleep deep rest is as effective as sleep for recovery.",
        ja: "ノンスリープ・ディープ・レストは睡眠と同等の回復効果。",
        tsukkomi: "昼休みにトラックで目つぶってるのも科学だったのか。",
        videoId: "AKGrmY8OSHM",
        timestamp: "2:10"
    },
    {
        en: "Your attention follows your visual field.",
        ja: "注意は視野に従う。",
        tsukkomi: "だからクロス貼ってるとき余計なこと考えないのか。",
        videoId: "hFL6qRIJZ_Y",
        timestamp: "5:00"
    }
]

// おすすめエピソード
const RECOMMENDED_EPISODES = [
    {
        title: "How to Focus to Change Your Brain",
        titleJa: "脳を変える集中法",
        duration: "2:32:14",
        videoId: "LG53Vxum0as",
        why: "内装の現場作業がなぜ「瞑想」になるのか、この動画を見れば科学的にわかる。90分の集中ブロックの話。",
        difficulty: "入門"
    },
    {
        title: "Master Your Sleep & Be More Alert When Awake",
        titleJa: "睡眠をマスターし、起きてる時間をもっと覚醒させる",
        duration: "2:04:18",
        videoId: "nm1TxQj9IsQ",
        why: "朝日を浴びろ、夜はブルーライトを避けろ。シンプルだけど、なぜそうなのかを2時間かけて説明してくれる。",
        difficulty: "入門"
    },
    {
        title: "Controlling Your Dopamine For Motivation, Focus & Satisfaction",
        titleJa: "モチベーション・集中・満足のためのドーパミンコントロール",
        duration: "2:32:23",
        videoId: "QmOF0crdyRU",
        why: "パチンコ、SNS、仕事...全部ドーパミンで説明できる。この動画を見てから、報酬への考え方が変わった。",
        difficulty: "必聴"
    },
    {
        title: "Using Deliberate Cold Exposure for Health and Performance",
        titleJa: "健康とパフォーマンスのための意図的冷水浴",
        duration: "1:59:24",
        videoId: "pq6WHJzOkno",
        why: "冷水シャワーの科学。冬の現場作業員は意図せずバイオハッカーだった説。",
        difficulty: "実践向け"
    }
]

// タイピングエフェクト用フック
function useTypewriter(text: string, speed: number = 30, startDelay: number = 0) {
    const [displayedText, setDisplayedText] = useState('')
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        setDisplayedText('')
        setIsComplete(false)

        const startTimeout = setTimeout(() => {
            let i = 0
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayedText(text.slice(0, i + 1))
                    i++
                } else {
                    setIsComplete(true)
                    clearInterval(interval)
                }
            }, speed)

            return () => clearInterval(interval)
        }, startDelay)

        return () => clearTimeout(startTimeout)
    }, [text, speed, startDelay])

    return { displayedText, isComplete }
}

// 音声波形コンポーネント
function AudioWaveform({ isActive }: { isActive: boolean }) {
    return (
        <div className="flex items-end gap-1 h-8">
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className={`w-1 bg-amber-500 rounded-full transition-all duration-150 ${isActive ? 'animate-pulse' : ''
                        }`}
                    style={{
                        height: isActive ? `${20 + Math.random() * 80}%` : '20%',
                        animationDelay: `${i * 0.05}s`
                    }}
                />
            ))}
        </div>
    )
}

// YouTube埋め込みコンポーネント
function YouTubeEmbed({ videoId, title }: { videoId: string, title: string }) {
    const [isLoaded, setIsLoaded] = useState(false)

    return (
        <div className="relative aspect-video bg-stone-100 rounded-xl overflow-hidden">
            {!isLoaded && (
                <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                    onClick={() => setIsLoaded(true)}
                >
                    <img
                        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                    <span className="absolute bottom-4 left-4 text-white text-sm font-bold bg-black/50 px-2 py-1 rounded">
                        クリックで再生
                    </span>
                </div>
            )}
            {isLoaded && (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                />
            )}
        </div>
    )
}

export default function HubermanPage() {
    const [currentQuote, setCurrentQuote] = useState(0)
    const [showTsukkomi, setShowTsukkomi] = useState(false)
    const [listeningTime, setListeningTime] = useState(0)
    const [showVideo, setShowVideo] = useState(false)
    const [revealedSections, setRevealedSections] = useState<Set<number>>(new Set())
    const [navOpen, setNavOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('intro')
    const sectionRefs = useRef<(HTMLElement | null)[]>([])

    // スクロール位置からアクティブセクションを検出
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('[data-section-id]')
            let current = 'intro'
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect()
                if (rect.top <= 150) {
                    current = section.getAttribute('data-section-id') || 'intro'
                }
            })
            setActiveSection(current)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // 「聞いた時間」カウンター
    useEffect(() => {
        const saved = localStorage.getItem('huberman-listening-time')
        if (saved) setListeningTime(parseInt(saved))

        const interval = setInterval(() => {
            setListeningTime(prev => {
                const newTime = prev + 1
                localStorage.setItem('huberman-listening-time', String(newTime))
                return newTime
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    // スクロールでセクション表示
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionRefs.current.indexOf(entry.target as HTMLElement)
                        if (index !== -1) {
                            setRevealedSections(prev => new Set([...prev, index]))
                        }
                    }
                })
            },
            { threshold: 0.15 }
        )

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref)
        })

        return () => observer.disconnect()
    }, [])

    // 名言切り替え
    const nextQuote = () => {
        setShowTsukkomi(false)
        setShowVideo(false)
        setCurrentQuote((prev) => (prev + 1) % HUBERMAN_QUOTES.length)
    }

    const quote = HUBERMAN_QUOTES[currentQuote]
    const { displayedText: typedEn, isComplete: enComplete } = useTypewriter(quote.en, 25)
    const { displayedText: typedJa, isComplete: jaComplete } = useTypewriter(quote.ja, 40, enComplete ? 0 : 9999)

    useEffect(() => {
        if (jaComplete && !showTsukkomi) {
            const timer = setTimeout(() => setShowTsukkomi(true), 500)
            return () => clearTimeout(timer)
        }
    }, [jaComplete, showTsukkomi])

    // 時間フォーマット
    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        if (hrs > 0) return `${hrs}時間${mins}分`
        if (mins > 0) return `${mins}分${secs}秒`
        return `${secs}秒`
    }

    // 目標時間（1000時間 = 3,600,000秒）
    const goalSeconds = 3600000
    const progress = Math.min((listeningTime / goalSeconds) * 100, 100)

    return (
        <main className="min-h-screen bg-white text-[#252423]">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setNavOpen(!navOpen)}
                            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                            aria-label="Toggle navigation"
                        >
                            <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {navOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                        <Link href="/" className="text-stone-500 hover:text-[#252423] text-sm transition-colors hidden md:block">
                            ← イワサキ内装
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="hidden md:block text-xs text-stone-400">
                            住んだ時間: <span className="text-amber-600 font-bold">{formatTime(listeningTime)}</span>
                        </div>
                        {/* Progress bar to 1000 hours */}
                        <div className="w-20 md:w-32 h-2 bg-stone-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-[10px] text-stone-400">/ 1000h</span>
                    </div>
                </div>
            </header>

            {/* Side Navigation */}
            <nav
                className={`fixed left-0 top-14 bottom-0 w-64 bg-white/95 backdrop-blur-md border-r border-stone-200 z-40 overflow-y-auto transition-transform duration-300 ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4">
                    <div className="mb-6">
                        <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">目次</h2>
                        <div className="text-xs text-amber-600">
                            {NAV_STRUCTURE.reduce((acc, cat) => acc + cat.items.length, 0)}セクション
                        </div>
                    </div>

                    {NAV_STRUCTURE.map((category) => (
                        <div key={category.category} className="mb-6">
                            <h3 className="text-xs font-bold text-stone-500 flex items-center gap-2 mb-2">
                                <span>{category.emoji}</span>
                                {category.category}
                            </h3>
                            <ul className="space-y-1">
                                {category.items.map((item) => (
                                    <li key={item.id}>
                                        <a
                                            href={`#${item.id}`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                const el = document.getElementById(item.id)
                                                if (el) {
                                                    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                                    setNavOpen(false)
                                                }
                                            }}
                                            className={`block px-3 py-1.5 text-sm rounded-lg transition-colors ${activeSection === item.id
                                                ? 'bg-amber-100 text-amber-700 font-medium'
                                                : 'text-stone-600 hover:bg-stone-100'
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="pt-4 border-t border-stone-200 space-y-2">
                        <Link
                            href="/english"
                            className="block text-sm text-amber-600 hover:text-amber-700 font-bold transition-colors"
                        >
                            🎯 English Practice →
                        </Link>
                        <Link
                            href="/"
                            className="block text-sm text-stone-500 hover:text-amber-600 transition-colors"
                        >
                            ← イワサキ内装に戻る
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Overlay for mobile */}
            {navOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={() => setNavOpen(false)}
                />
            )}

            {/* Hero - Quote Machine */}
            <section id="intro" data-section-id="intro" className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 md:px-6 bg-gradient-to-b from-stone-50 to-white">
                <div className="max-w-5xl w-full">
                    {/* Title */}
                    <div className="text-center mb-12 md:mb-16">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-amber-600 font-bold">
                            THE ANTI-BIOHACKER GUIDE
                        </span>
                        <h1 className="text-2xl md:text-5xl font-bold mt-4 leading-tight">
                            <span className="text-stone-400">英語を</span><br />
                            <span className="text-[#252423]">1000時間</span><span className="text-amber-500">聴いた</span><br />
                            <span className="text-stone-400 text-xl md:text-4xl">内装屋の記録</span>
                        </h1>
                        <p className="mt-6 text-stone-500 text-sm md:text-base max-w-xl mx-auto">
                            「効果」も「科学的根拠」も売らない。<br />
                            ただ、英語に「住む」という体験を。
                        </p>
                    </div>

                    {/* Quote Card */}
                    <div className="relative bg-white border border-stone-200 rounded-2xl p-6 md:p-10 shadow-lg">
                        <div className="absolute top-4 right-4">
                            <AudioWaveform isActive={!enComplete || !jaComplete} />
                        </div>

                        <div className="absolute -top-4 left-6 md:left-8 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                            {currentQuote + 1} / {HUBERMAN_QUOTES.length}
                        </div>

                        {/* English Quote */}
                        <p className="text-base md:text-2xl font-serif text-[#252423] mb-4 min-h-[2.5em] md:min-h-[3em] leading-relaxed pr-16">
                            "{typedEn}"
                            {!enComplete && <span className="animate-pulse text-amber-500">|</span>}
                        </p>

                        {/* Japanese Translation */}
                        <p className="text-sm md:text-lg text-stone-600 mb-6 md:mb-8 min-h-[1.5em] md:min-h-[2em]">
                            {typedJa}
                            {enComplete && !jaComplete && <span className="animate-pulse text-amber-500">|</span>}
                        </p>

                        {/* Tsukkomi */}
                        <div
                            className={`transform transition-all duration-500 ease-out ${showTsukkomi ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                        >
                            <div className="flex items-start gap-3 md:gap-4 p-3 md:p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-amber-400">
                                    <img
                                        src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/32c616ad-8c26-4945-1e8e-35040d65a100/public"
                                        alt="内装屋"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="text-[10px] md:text-xs text-amber-600 font-bold">内装屋のツッコミ</span>
                                    <p className="text-sm md:text-base text-[#252423] mt-1">{quote.tsukkomi}</p>
                                </div>
                            </div>
                        </div>

                        {/* Watch Original Button */}
                        {showTsukkomi && !showVideo && (
                            <button
                                onClick={() => setShowVideo(true)}
                                className="mt-4 text-sm text-amber-600 hover:text-amber-700 underline underline-offset-4 transition-colors"
                            >
                                ▶ 元動画を見る（{quote.timestamp}〜）
                            </button>
                        )}

                        {/* Embedded Video */}
                        {showVideo && (
                            <div className="mt-6 animate-in slide-in-from-bottom duration-500">
                                <YouTubeEmbed videoId={quote.videoId} title={quote.en} />
                            </div>
                        )}

                        {/* Next Button */}
                        <button
                            onClick={nextQuote}
                            className="mt-6 md:mt-8 w-full py-3 md:py-4 bg-[#252423] text-white rounded-xl hover:bg-amber-600 transition-all duration-300 font-bold tracking-wide group"
                        >
                            次の名言
                            <span className="inline-block ml-2 group-hover:translate-x-2 transition-transform">→</span>
                        </button>
                    </div>

                    {/* Scroll Hint */}
                    <div className="text-center mt-8 md:mt-12 animate-bounce">
                        <span className="text-stone-400 text-sm">↓ スクロールして詳しく</span>
                    </div>
                </div>
            </section>

            {/* Section: Anti-Biohacker Declaration */}
            <section
                id="anti-biohacker" data-section-id="anti-biohacker"
                ref={el => { sectionRefs.current[0] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-stone-900 text-white transition-all duration-1000 ${revealedSections.has(0) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
                        アンチ・バイオハッカー宣言
                    </h2>

                    <div className="space-y-6 text-base md:text-lg">
                        <div className="flex items-start gap-4">
                            <span className="text-red-500 text-2xl">✗</span>
                            <p className="text-stone-300">「最強の朝ルーティン」とか言わない</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-red-500 text-2xl">✗</span>
                            <p className="text-stone-300">「生産性3倍」とか嘘つかない</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-red-500 text-2xl">✗</span>
                            <p className="text-stone-300">アフィリンク貼ってサプリ売らない</p>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-red-500 text-2xl">✗</span>
                            <p className="text-stone-300">SEO記事量産しない</p>
                        </div>

                        <div className="border-t border-stone-700 my-8 pt-8">
                            <div className="flex items-start gap-4">
                                <span className="text-green-500 text-2xl">✓</span>
                                <p className="text-white font-bold">正直に「もう飽きた」と言う</p>
                            </div>
                            <div className="flex items-start gap-4 mt-4">
                                <span className="text-green-500 text-2xl">✓</span>
                                <p className="text-white font-bold">内装屋という異質な視点で語る</p>
                            </div>
                            <div className="flex items-start gap-4 mt-4">
                                <span className="text-green-500 text-2xl">✓</span>
                                <p className="text-white font-bold">英語に「住む」体験だけを提供する</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Why 3 Hours */}
            <section
                id="why-3hours" data-section-id="why-3hours"
                ref={el => { sectionRefs.current[1] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 transition-all duration-1000 delay-200 ${revealedSections.has(1) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
                        なぜ3時間のポッドキャストを聞くのか
                    </h2>

                    <div className="space-y-4 md:space-y-6 text-base md:text-lg leading-relaxed">
                        <p>アンドリュー・ヒューバーマン。スタンフォード大学の神経科学者。</p>
                        <p className="text-stone-500">週に1回、3時間のポッドキャストを配信している。</p>
                        <p className="text-stone-500">3時間。</p>
                        <p className="text-xl md:text-2xl font-bold text-[#252423]">誰が聞くんだよ。</p>
                        <p className="text-3xl md:text-5xl font-bold text-amber-500 text-center py-6 md:py-8">俺。</p>
                        <p className="text-sm text-stone-400 text-center">（笑ってくれ）</p>
                    </div>

                    {/* The Real Point */}
                    <div className="mt-12 md:mt-16 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 md:p-8 text-center">
                        <p className="text-lg md:text-2xl font-bold text-[#252423] leading-relaxed">
                            内容はどうでもいい。<br />
                            <span className="text-stone-500 text-base md:text-xl font-normal">いや、嘘。内容も面白い。</span><br /><br />
                            でも、それより大事なことがある。<br /><br />
                            <span className="text-amber-600">英語で3時間、一人の人間が真剣に喋っている。</span><br />
                            <span className="text-amber-600">それを聞き続けると、英語に「住む」ことになる。</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Section: Recommended Episodes */}
            <section
                id="episodes" data-section-id="episodes"
                ref={el => { sectionRefs.current[2] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-stone-50 transition-all duration-1000 delay-300 ${revealedSections.has(2) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        内装屋が厳選したエピソード
                    </h2>
                    <p className="text-center text-stone-500 mb-8 md:mb-12 text-sm md:text-base">
                        3年間で100本以上聞いた中から、本当に面白いものだけ。
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        {RECOMMENDED_EPISODES.map((ep, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-stone-200"
                            >
                                <YouTubeEmbed videoId={ep.videoId} title={ep.titleJa} />
                                <div className="p-4 md:p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${ep.difficulty === '必聴' ? 'bg-red-100 text-red-600' :
                                            ep.difficulty === '実践向け' ? 'bg-blue-100 text-blue-600' :
                                                'bg-stone-100 text-stone-600'
                                            }`}>
                                            {ep.difficulty}
                                        </span>
                                        <span className="text-xs text-stone-400">{ep.duration}</span>
                                    </div>
                                    <h3 className="font-bold text-[#252423] mb-1">{ep.titleJa}</h3>
                                    <p className="text-xs text-stone-400 mb-3">{ep.title}</p>
                                    <p className="text-sm text-stone-600 leading-relaxed">{ep.why}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section: Hikakin Comparison */}
            <section
                id="hikakin" data-section-id="hikakin"
                ref={el => { sectionRefs.current[3] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 transition-all duration-1000 delay-400 ${revealedSections.has(3) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
                        ヒューバーマン ＝ ヒカキン説
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8 text-center hover:scale-105 transition-transform cursor-default">
                            <div className="text-4xl md:text-5xl mb-4">🎮</div>
                            <h3 className="text-lg md:text-xl font-bold text-red-600 mb-4">ヒカキン</h3>
                            <ul className="text-left space-y-2 text-sm md:text-base text-stone-600">
                                <li>• ビートボックス</li>
                                <li>• ゲーム実況</li>
                                <li>• 商品レビュー</li>
                            </ul>
                            <p className="mt-6 text-sm font-bold text-red-500">熱量がヤバい 🔥</p>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 md:p-8 text-center hover:scale-105 transition-transform cursor-default">
                            <div className="text-4xl md:text-5xl mb-4">🧠</div>
                            <h3 className="text-lg md:text-xl font-bold text-blue-600 mb-4">ヒューバーマン</h3>
                            <ul className="text-left space-y-2 text-sm md:text-base text-stone-600">
                                <li>• 睡眠科学</li>
                                <li>• ドーパミン解説</li>
                                <li>• 神経可塑性</li>
                            </ul>
                            <p className="mt-6 text-sm font-bold text-blue-500">熱量がヤバい 🔥</p>
                        </div>
                    </div>

                    <div className="text-center mt-8 md:mt-12">
                        <p className="text-lg md:text-xl text-stone-500 mb-4">内容は全然違う。</p>
                        <p className="text-xl md:text-2xl font-bold text-[#252423]">
                            でも、両方とも<span className="text-amber-500">「本気で面白がってる」</span>。
                        </p>
                        <p className="text-base md:text-lg text-stone-500 mt-4">
                            それが伝わるから、見ちゃう。聞いちゃう。<br />
                            <span className="text-sm">中田敦彦も同じ。</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Section: CTA */}
            <section
                ref={el => { sectionRefs.current[4] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-stone-900 to-black text-white transition-all duration-1000 delay-500 ${revealedSections.has(4) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12">
                        俺がやりたいこと
                    </h2>

                    <div className="space-y-4 md:space-y-6 text-base md:text-lg text-stone-300">
                        <p>英語のポッドキャストは、ハードルが高い。</p>
                        <p>3時間とか、普通の人は聞かない。</p>
                        <p>でも、そこに面白いものがある。</p>
                        <p className="text-white font-bold text-lg md:text-xl">それを、橋渡ししたい。</p>
                    </div>

                    <div className="mt-10 md:mt-12">
                        <p className="text-4xl md:text-7xl font-black text-amber-500 tracking-tight">
                            バイブスで。
                        </p>
                    </div>

                    {/* Progress Stats */}
                    <div className="mt-12 md:mt-16 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-2xl md:text-4xl font-bold text-amber-400">{formatTime(listeningTime)}</p>
                            <p className="text-xs md:text-sm text-stone-400 mt-1">あなたの住んだ時間</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-2xl md:text-4xl font-bold text-white">1000h</p>
                            <p className="text-xs md:text-sm text-stone-400 mt-1">目標</p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-4">
                            <p className="text-2xl md:text-4xl font-bold text-stone-500">{(progress).toFixed(2)}%</p>
                            <p className="text-xs md:text-sm text-stone-400 mt-1">達成率</p>
                        </div>
                    </div>

                    <p className="mt-10 md:mt-12 text-xs md:text-sm text-stone-600">
                        ※このページは実験です。<br />
                        音声コンテンツは近日公開予定 = まだ録ってない。
                    </p>
                </div>
            </section>

            {/* Section: 内装屋が実践してみた結果 */}
            <section
                id="tried-it" data-section-id="tried-it"
                ref={el => { sectionRefs.current[5] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-white transition-all duration-1000 delay-100 ${revealedSections.has(5) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        内装屋が実践してみた結果
                    </h2>
                    <p className="text-center text-stone-500 mb-8 md:mb-12 text-sm">
                        ヒューバーマンのプロトコルを本当にやってみた。
                    </p>

                    <div className="space-y-6">
                        {/* 朝日 */}
                        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">🌅</span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-2">朝日を浴びる（10分以内）</h3>
                                    <p className="text-stone-600 text-sm mb-3">
                                        <span className="font-bold">ヒューバーマン曰く：</span>起床後10分以内に太陽光を網膜に入れろ。サングラスNG、窓越しNG。
                                    </p>
                                    <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r">
                                        <p className="text-sm font-bold text-amber-700">内装屋の結果：</p>
                                        <p className="text-sm text-stone-600 mt-1">
                                            冬は無理。朝5時に起きて現場行くと、太陽が昇るのは8時頃。
                                            でも夏は最高。現場に向かう車の中で浴びてる。確かに目が覚める。
                                        </p>
                                        <p className="text-xs text-stone-400 mt-2">結論：季節による。夏は◎、冬は諦める。</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 冷水シャワー */}
                        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">🚿</span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-2">冷水シャワー（2分間）</h3>
                                    <p className="text-stone-600 text-sm mb-3">
                                        <span className="font-bold">ヒューバーマン曰く：</span>朝に2分間、できるだけ冷たい水を浴びろ。ドーパミン250%上昇。
                                    </p>
                                    <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r">
                                        <p className="text-sm font-bold text-blue-700">内装屋の結果：</p>
                                        <p className="text-sm text-stone-600 mt-1">
                                            やってみた。最初の2週間は地獄。でも慣れると「まあ、いけるな」になる。
                                            問題は、冬の現場で十分冷えてるのに、家でもやる必要あるのか？という疑問。
                                            夏は最高に気持ちいい。冬は…うーん。
                                        </p>
                                        <p className="text-xs text-stone-400 mt-2">結論：夏は毎日。冬は週2。</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 90分集中 */}
                        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">🧘</span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-2">90分フォーカスブロック</h3>
                                    <p className="text-stone-600 text-sm mb-3">
                                        <span className="font-bold">ヒューバーマン曰く：</span>90分の集中ブロックを作れ。途中でスマホを見るな。
                                    </p>
                                    <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-r">
                                        <p className="text-sm font-bold text-green-700">内装屋の結果：</p>
                                        <p className="text-sm text-stone-600 mt-1">
                                            気づいた。クロス貼ってる間は勝手に90分集中してる。
                                            スマホ見る余裕がない。というか、見たら失敗する。
                                            つまり、<span className="font-bold">内装屋は意図せず毎日フォーカスブロックをやってた</span>。
                                        </p>
                                        <p className="text-xs text-stone-400 mt-2">結論：肉体労働最強説。</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* NSDR */}
                        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">😴</span>
                                <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-2">NSDR（ノンスリープ・ディープ・レスト）</h3>
                                    <p className="text-stone-600 text-sm mb-3">
                                        <span className="font-bold">ヒューバーマン曰く：</span>10-20分のNSDRで睡眠負債を返済できる。
                                    </p>
                                    <div className="bg-purple-50 border-l-4 border-purple-400 p-3 rounded-r">
                                        <p className="text-sm font-bold text-purple-700">内装屋の結果：</p>
                                        <p className="text-sm text-stone-600 mt-1">
                                            昼休みにトラックの中で「目を閉じてるだけ」をずっとやってた。
                                            それがNSDRだったらしい。寝落ちしなければ、確かに午後のパフォーマンスが違う。
                                            YouTubeでNSDR動画も出してる。意外と効く。
                                        </p>
                                        <p className="text-xs text-stone-400 mt-2">結論：昼寝じゃなくてNSDR。名前がカッコいい。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: FAQ（皮肉まじり） */}
            <section
                id="faq" data-section-id="faq"
                ref={el => { sectionRefs.current[6] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-stone-50 transition-all duration-1000 delay-200 ${revealedSections.has(6) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
                        よくある質問
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                            <h3 className="font-bold text-[#252423] mb-2">Q. これで本当に英語力は上がるの？</h3>
                            <p className="text-stone-600">
                                わからない。でも、英語が「外国語」じゃなくなる。
                                TOEICのスコアが上がる保証はない。でも、Lex Fridmanが何言ってるかわかるようになる。
                                どっちが欲しい？
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                            <h3 className="font-bold text-[#252423] mb-2">Q. 効率悪くない？3時間とか…</h3>
                            <p className="text-stone-600">
                                効率を求めるなら、他に行け。真剣に。
                                Duolingoやれ。プログリット入れ。オンライン英会話やれ。
                                ここは「効率」を売ってない。「体験」を売ってる。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                            <h3 className="font-bold text-[#252423] mb-2">Q. サプリは何を飲めばいい？</h3>
                            <p className="text-stone-600">
                                知らん。<br />
                                ヒューバーマンはアシュワガンダとかマグネシウムとか色々言ってるけど、
                                俺は飲んでない。ビール飲んで寝てる。<br />
                                <span className="text-sm text-stone-400">（これはマジで良くないらしいけど）</span>
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                            <h3 className="font-bold text-[#252423] mb-2">Q. どのくらいで効果が出る？</h3>
                            <p className="text-stone-600">
                                「効果」という考え方をやめた時。<br />
                                いつの間にか「わかる」ようになってる。それが答え。
                                3ヶ月、6ヶ月、1年…人による。でも確実に言えるのは、
                                <span className="font-bold">1000時間聞いたら、確実に変わる</span>。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-stone-200">
                            <h3 className="font-bold text-[#252423] mb-2">Q. なんで内装屋がこれやってるの？</h3>
                            <p className="text-stone-600">
                                いい質問。俺もわからん。<br />
                                現場でクロス貼りながらポッドキャスト聞いてたら、気づいたらこうなってた。
                                本業は内装。これは趣味。でも本気の趣味。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 他のおすすめチャンネル */}
            <section
                id="next-channels" data-section-id="next-channels"
                ref={el => { sectionRefs.current[7] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-white transition-all duration-1000 delay-300 ${revealedSections.has(7) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        ヒューバーマンの次に聞くべきチャンネル
                    </h2>
                    <p className="text-center text-stone-500 mb-8 md:mb-12 text-sm">
                        3年間で見つけた、本当に面白い英語ポッドキャスト
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Lex Fridman */}
                        <div className="bg-stone-900 text-white rounded-2xl p-6 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-stone-700 rounded-full flex items-center justify-center text-2xl">🎙️</div>
                                <div>
                                    <h3 className="font-bold">Lex Fridman Podcast</h3>
                                    <p className="text-sm text-stone-400">AI研究者 / MIT</p>
                                </div>
                            </div>
                            <p className="text-sm text-stone-300 mb-4">
                                Elon Musk, Sam Altman, Mark Zuckerberg...テック界の巨人と4時間対談する男。
                                静かで哲学的。ヒューバーマンより落ち着いてる。
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-stone-700 px-2 py-1 rounded">難易度：中</span>
                                <span className="text-xs bg-stone-700 px-2 py-1 rounded">2-4時間/回</span>
                            </div>
                        </div>

                        {/* Sean Carroll */}
                        <div className="bg-indigo-900 text-white rounded-2xl p-6 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-indigo-700 rounded-full flex items-center justify-center text-2xl">🌌</div>
                                <div>
                                    <h3 className="font-bold">Mindscape</h3>
                                    <p className="text-sm text-indigo-300">物理学者 / Caltech</p>
                                </div>
                            </div>
                            <p className="text-sm text-indigo-200 mb-4">
                                理論物理学者が哲学者、生物学者、歴史家と対談。
                                「宇宙はなぜ存在するのか」みたいな話。難しいけど面白い。
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-indigo-700 px-2 py-1 rounded">難易度：高</span>
                                <span className="text-xs bg-indigo-700 px-2 py-1 rounded">1-2時間/回</span>
                            </div>
                        </div>

                        {/* Curt Jaimungal */}
                        <div className="bg-emerald-900 text-white rounded-2xl p-6 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-emerald-700 rounded-full flex items-center justify-center text-2xl">🧬</div>
                                <div>
                                    <h3 className="font-bold">Theories of Everything</h3>
                                    <p className="text-sm text-emerald-300">Curt Jaimungal</p>
                                </div>
                            </div>
                            <p className="text-sm text-emerald-200 mb-4">
                                意識、物理学、数学の最前線。Donald Hoffman、Bernardo Kastrumなど。
                                「意識のハード・プロブレム」に興味あるならここ。
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-emerald-700 px-2 py-1 rounded">難易度：激高</span>
                                <span className="text-xs bg-emerald-700 px-2 py-1 rounded">2-4時間/回</span>
                            </div>
                        </div>

                        {/* Tim Ferriss */}
                        <div className="bg-orange-900 text-white rounded-2xl p-6 hover:scale-105 transition-transform">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-orange-700 rounded-full flex items-center justify-center text-2xl">⚡</div>
                                <div>
                                    <h3 className="font-bold">The Tim Ferriss Show</h3>
                                    <p className="text-sm text-orange-300">著者 / 投資家</p>
                                </div>
                            </div>
                            <p className="text-sm text-orange-200 mb-4">
                                「週4時間だけ働く」の著者。成功者のルーティンを深掘り。
                                ビジネス寄りだけど、思ったより哲学的。
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs bg-orange-700 px-2 py-1 rounded">難易度：中</span>
                                <span className="text-xs bg-orange-700 px-2 py-1 rounded">1-2時間/回</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 1000時間の旅 */}
            <section
                id="1000h-journey" data-section-id="1000h-journey"
                ref={el => { sectionRefs.current[8] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-amber-50 to-white transition-all duration-1000 delay-400 ${revealedSections.has(8) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12 text-center">
                        1000時間の旅：マイルストーン
                    </h2>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-amber-200 transform md:-translate-x-1/2" />

                        {/* Milestones */}
                        <div className="space-y-8">
                            <div className="relative flex items-start gap-8 md:gap-0">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 flex-shrink-0">1</div>
                                <div className="md:w-1/2 md:ml-auto md:pl-8 bg-white p-4 rounded-xl shadow-sm border border-amber-100">
                                    <h3 className="font-bold text-amber-600">0-100時間</h3>
                                    <p className="text-sm text-stone-600 mt-2">
                                        「何言ってるかわからん」期。でも聞き続ける。
                                        たまに聞き取れる単語があると嬉しい。
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex items-start gap-8 md:gap-0">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 flex-shrink-0">2</div>
                                <div className="md:w-1/2 md:mr-auto md:pr-8 md:text-right bg-white p-4 rounded-xl shadow-sm border border-amber-100">
                                    <h3 className="font-bold text-amber-600">100-300時間</h3>
                                    <p className="text-sm text-stone-600 mt-2">
                                        「なんとなくトピックはわかる」期。
                                        ヒューバーマンの声に慣れてくる。
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex items-start gap-8 md:gap-0">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 flex-shrink-0">3</div>
                                <div className="md:w-1/2 md:ml-auto md:pl-8 bg-white p-4 rounded-xl shadow-sm border border-amber-100">
                                    <h3 className="font-bold text-amber-600">300-500時間</h3>
                                    <p className="text-sm text-stone-600 mt-2">
                                        「ああ、この話か」期。同じ話が何度も出てくることに気づく。
                                        繰り返しで理解が深まる。
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex items-start gap-8 md:gap-0">
                                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 flex-shrink-0">4</div>
                                <div className="md:w-1/2 md:mr-auto md:pr-8 md:text-right bg-white p-4 rounded-xl shadow-sm border border-amber-100">
                                    <h3 className="font-bold text-amber-600">500-800時間</h3>
                                    <p className="text-sm text-stone-600 mt-2">
                                        「普通に聞ける」期。英語を「外国語」と意識しなくなる。
                                        ただの「情報源」になる。
                                    </p>
                                </div>
                            </div>

                            <div className="relative flex items-start gap-8 md:gap-0">
                                <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 flex-shrink-0">5</div>
                                <div className="md:w-1/2 md:ml-auto md:pl-8 bg-amber-100 p-4 rounded-xl shadow-sm border border-amber-200">
                                    <h3 className="font-bold text-amber-700">800-1000時間</h3>
                                    <p className="text-sm text-stone-700 mt-2">
                                        「卒業」期。もう興味がなくなる。
                                        でも、英語が体に染み込んでる。それだけが残る。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 卒業者の告白 */}
            <section
                id="confession" data-section-id="confession"
                ref={el => { sectionRefs.current[9] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-stone-900 text-white transition-all duration-1000 delay-500 ${revealedSections.has(9) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-xl md:text-3xl font-bold mb-8 md:mb-12">
                        卒業者の告白
                    </h2>

                    <div className="bg-stone-800 rounded-2xl p-8 md:p-12 text-left">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400">
                                <img
                                    src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/32c616ad-8c26-4945-1e8e-35040d65a100/public"
                                    alt="内装屋"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-amber-400">内装屋</p>
                                <p className="text-sm text-stone-400">推定1200時間以上リスニング</p>
                            </div>
                        </div>

                        <div className="space-y-4 text-stone-300 leading-relaxed">
                            <p>
                                正直に言う。
                            </p>
                            <p>
                                今、ヒューバーマンにはほとんど興味がない。
                            </p>
                            <p>
                                Lex Fridmanも、Sean Carrollも、もういい。
                            </p>
                            <p className="text-white font-bold">
                                でも、それでいい。
                            </p>
                            <p>
                                興味がなくなるまで聞いた。それが「卒業」だ。
                            </p>
                            <p>
                                今でも英語は毎日使う。ドキュメントを読む、海外の動画を見る、
                                たまに外国人の職人と話す。
                            </p>
                            <p>
                                そのとき、「英語を話してる」という感覚がない。
                            </p>
                            <p className="text-amber-400 font-bold text-lg">
                                ただ、話してる。それだけ。
                            </p>
                            <p className="text-stone-500 text-sm mt-6">
                                これが、1000時間の先にあるもの。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 英語学習の常識を疑え */}
            <section
                id="doubt-learning" data-section-id="doubt-learning"
                ref={el => { sectionRefs.current[10] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-white transition-all duration-1000 delay-100 ${revealedSections.has(10) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        英語学習の常識を疑え
                    </h2>
                    <p className="text-center text-stone-500 mb-8 md:mb-12 text-sm">
                        プログリットでは教えてくれないこと
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <p className="text-red-600 font-bold mb-2">❌ 常識</p>
                            <p className="text-stone-700 font-bold mb-4">「毎日30分の学習が大事」</p>
                            <p className="text-sm text-stone-600">
                                30分じゃ何も変わらない。3時間のポッドキャストを週に3本聞け。
                                量が質に変わる瞬間がある。
                            </p>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <p className="text-red-600 font-bold mb-2">❌ 常識</p>
                            <p className="text-stone-700 font-bold mb-4">「わからない単語は調べろ」</p>
                            <p className="text-sm text-stone-600">
                                調べない。流す。文脈で覚える。
                                辞書を引く時間があったら、もう1本聞け。
                            </p>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <p className="text-red-600 font-bold mb-2">❌ 常識</p>
                            <p className="text-stone-700 font-bold mb-4">「発音を矯正しろ」</p>
                            <p className="text-sm text-stone-600">
                                日本語訛りでいい。伝わればいい。
                                ネイティブっぽく話そうとするのはエゴだ。
                            </p>
                        </div>

                        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                            <p className="text-red-600 font-bold mb-2">❌ 常識</p>
                            <p className="text-stone-700 font-bold mb-4">「TOEICで目標を決めろ」</p>
                            <p className="text-sm text-stone-600">
                                TOEICは英語力じゃない。テスト力だ。
                                Lex Fridmanが何言ってるかわかる方が100倍大事。
                            </p>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-xl p-6 md:col-span-2">
                            <p className="text-green-600 font-bold mb-2">✓ 真実</p>
                            <p className="text-stone-700 font-bold mb-4">「1000時間聞けば、誰でも変わる」</p>
                            <p className="text-sm text-stone-600">
                                これだけは本当。才能とか関係ない。ただの時間の問題。
                                毎日3時間で1年。毎日1時間で3年。どっちでもいい。
                                ただ、やるかやらないか。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 神回ランキング */}
            <section
                id="ranking" data-section-id="ranking"
                ref={el => { sectionRefs.current[11] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-stone-900 to-stone-800 text-white transition-all duration-1000 ${revealedSections.has(11) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        🏆 神回ランキング TOP5
                    </h2>
                    <p className="text-center text-stone-400 mb-8 md:mb-12 text-sm">
                        100本以上聞いた俺が選ぶ、ガチで面白かった回
                    </p>

                    <div className="space-y-4">
                        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-xl p-4 md:p-6 flex items-center gap-4">
                            <span className="text-3xl md:text-4xl">🥇</span>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">Dr. Paul Conti: Therapy, Treating Trauma</h3>
                                <p className="text-sm text-stone-400 mt-1">精神科医との対談。トラウマの話。ヒューバーマンが泣く。俺も泣いた。</p>
                            </div>
                            <span className="text-stone-500 text-sm">4時間</span>
                        </div>

                        <div className="bg-gradient-to-r from-gray-400/20 to-gray-500/10 border border-gray-400/30 rounded-xl p-4 md:p-6 flex items-center gap-4">
                            <span className="text-3xl md:text-4xl">🥈</span>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">Controlling Your Dopamine</h3>
                                <p className="text-sm text-stone-400 mt-1">ドーパミンの全て。パチンコ、SNS、仕事…全部これで説明できる。</p>
                            </div>
                            <span className="text-stone-500 text-sm">2.5時間</span>
                        </div>

                        <div className="bg-gradient-to-r from-amber-600/20 to-amber-700/10 border border-amber-600/30 rounded-xl p-4 md:p-6 flex items-center gap-4">
                            <span className="text-3xl md:text-4xl">🥉</span>
                            <div className="flex-1">
                                <h3 className="font-bold text-lg">Dr. Alia Crum: Science of Mindset</h3>
                                <p className="text-sm text-stone-400 mt-1">「ストレスは体に悪い」と思うとマジで体に悪い。マインドセットの科学。</p>
                            </div>
                            <span className="text-stone-500 text-sm">2時間</span>
                        </div>

                        <div className="bg-stone-700/30 border border-stone-600/30 rounded-xl p-4 md:p-6 flex items-center gap-4">
                            <span className="text-2xl md:text-3xl text-stone-400">4</span>
                            <div className="flex-1">
                                <h3 className="font-bold">Dr. Anna Lembke: Dopamine & Addiction</h3>
                                <p className="text-sm text-stone-400 mt-1">快楽と痛みのバランス。なぜ幸せの追求が不幸を生むか。</p>
                            </div>
                        </div>

                        <div className="bg-stone-700/30 border border-stone-600/30 rounded-xl p-4 md:p-6 flex items-center gap-4">
                            <span className="text-2xl md:text-3xl text-stone-400">5</span>
                            <div className="flex-1">
                                <h3 className="font-bold">Rick Rubin: Creativity</h3>
                                <p className="text-sm text-stone-400 mt-1">伝説の音楽プロデューサー。創造性について。ゆっくりした声が心地いい。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 内装屋の1日 */}
            <section
                id="daily-routine" data-section-id="daily-routine"
                ref={el => { sectionRefs.current[12] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-white transition-all duration-1000 ${revealedSections.has(12) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        🕐 内装屋の1日（ポッドキャスト版）
                    </h2>
                    <p className="text-center text-stone-500 mb-8 md:mb-12 text-sm">
                        いつ聞いてるのか、という話
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
                            <span className="text-amber-600 font-bold text-lg">5:00</span>
                            <div>
                                <p className="font-bold">起床</p>
                                <p className="text-sm text-stone-600">まだ聞かない。目が覚めてない。</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                            <span className="text-stone-600 font-bold text-lg">5:30</span>
                            <div>
                                <p className="font-bold">現場へ移動</p>
                                <p className="text-sm text-stone-600">車の中でポッドキャスト開始。眠いけど聞く。<span className="text-amber-600">（1時間）</span></p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                            <span className="text-stone-600 font-bold text-lg">6:30</span>
                            <div>
                                <p className="font-bold">現場作業</p>
                                <p className="text-sm text-stone-600">クロス貼り、床施工。AirPods Pro装着。<span className="text-amber-600">（4時間）</span></p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <span className="text-blue-600 font-bold text-lg">12:00</span>
                            <div>
                                <p className="font-bold">昼休み</p>
                                <p className="text-sm text-stone-600">トラックでNSDR。聞かない。静寂。</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                            <span className="text-stone-600 font-bold text-lg">13:00</span>
                            <div>
                                <p className="font-bold">午後作業</p>
                                <p className="text-sm text-stone-600">続き。再生速度1.5倍に上げがち。<span className="text-amber-600">（3時間）</span></p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                            <span className="text-stone-600 font-bold text-lg">17:00</span>
                            <div>
                                <p className="font-bold">帰宅移動</p>
                                <p className="text-sm text-stone-600">疲れてるけど聞く。<span className="text-amber-600">（1時間）</span></p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <span className="text-purple-600 font-bold text-lg">21:00</span>
                            <div>
                                <p className="font-bold">就寝前</p>
                                <p className="text-sm text-stone-600">ビール飲みながら。眠くなったら消す。</p>
                            </div>
                        </div>

                        <div className="bg-amber-100 rounded-xl p-4 text-center mt-8">
                            <p className="font-bold text-amber-800">1日の合計：約9時間</p>
                            <p className="text-sm text-amber-600 mt-1">週5日で45時間。月180時間。5.5ヶ月で1000時間。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: ヒューバーマン用語集 */}
            <section
                id="glossary" data-section-id="glossary"
                ref={el => { sectionRefs.current[13] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-stone-50 transition-all duration-1000 ${revealedSections.has(13) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        📖 ヒューバーマン用語集
                    </h2>
                    <p className="text-center text-stone-500 mb-8 md:mb-12 text-sm">
                        最初は何言ってるかわからない。でも100時間聞くと覚える。
                    </p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-stone-200">
                            <h3 className="font-bold text-amber-600">Dopamine</h3>
                            <p className="text-sm text-stone-600 mt-1">ドーパミン。やる気の物質。報酬を「追い求める」ときに出る。</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-stone-200">
                            <h3 className="font-bold text-amber-600">Neuroplasticity</h3>
                            <p className="text-sm text-stone-600 mt-1">神経可塑性。脳が変わる能力。何歳でも変われる理由。</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-stone-200">
                            <h3 className="font-bold text-amber-600">NSDR</h3>
                            <p className="text-sm text-stone-600 mt-1">Non-Sleep Deep Rest。寝てないけど深く休む。昼寝じゃない。</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-stone-200">
                            <h3 className="font-bold text-amber-600">Circadian Rhythm</h3>
                            <p className="text-sm text-stone-600 mt-1">概日リズム。体内時計。朝日を浴びろの理由。</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-stone-200">
                            <h3 className="font-bold text-amber-600">Adenosine</h3>
                            <p className="text-sm text-stone-600 mt-1">アデノシン。眠気の物質。カフェインがブロックする。</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-stone-200">
                            <h3 className="font-bold text-amber-600">Cortisol</h3>
                            <p className="text-sm text-stone-600 mt-1">コルチゾール。ストレスホルモン。朝は高くていい。</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-stone-200">
                            <h3 className="font-bold text-amber-600">Autonomic Nervous System</h3>
                            <p className="text-sm text-stone-600 mt-1">自律神経系。交感神経と副交感神経。呼吸でコントロールできる。</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-stone-200">
                            <h3 className="font-bold text-amber-600">Protocols</h3>
                            <p className="text-sm text-stone-600 mt-1">プロトコル。やり方。ヒューバーマンの好きな言葉。</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 失敗談 */}
            <section
                id="failures" data-section-id="failures"
                ref={el => { sectionRefs.current[14] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-red-50 transition-all duration-1000 ${revealedSections.has(14) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center text-red-700">
                        💀 失敗談（これは効かなかった）
                    </h2>
                    <p className="text-center text-red-600/70 mb-8 md:mb-12 text-sm">
                        正直に言う。全部は効かない。
                    </p>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 border border-red-200">
                            <h3 className="font-bold text-red-600 mb-2">❌ サプリメント全般</h3>
                            <p className="text-stone-600">
                                アシュワガンダ、マグネシウム、αGPC...いろいろ試した。
                                正直、効果がわからん。プラセボかもしれないし、俺の体質に合わないのかもしれない。
                                金の無駄だった気がする。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-red-200">
                            <h3 className="font-bold text-red-600 mb-2">❌ 冬の冷水シャワー</h3>
                            <p className="text-stone-600">
                                夏はいい。冬は無理。というか、現場で十分冷えてるのに、
                                家でわざわざ冷たい水を浴びる意味がわからなくなった。
                                今は冬はやってない。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-red-200">
                            <h3 className="font-bold text-red-600 mb-2">❌ 完璧な睡眠スケジュール</h3>
                            <p className="text-stone-600">
                                「毎日同じ時間に寝て起きろ」って言うけど、現場仕事は日によって違う。
                                遠い現場の日は4時半起き、近い日は6時起き。
                                無理に揃えようとしてストレスになった。諦めた。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 border border-red-200">
                            <h3 className="font-bold text-red-600 mb-2">❌ カフェイン断ち</h3>
                            <p className="text-stone-600">
                                「カフェインは起床後90分待ってから」って言うけど、
                                朝5時に起きて、現場着いてからコーヒー飲まないと死ぬ。
                                普通に飲んでる。
                            </p>
                        </div>
                    </div>

                    <p className="text-center text-stone-500 text-sm mt-8">
                        全部試す必要はない。自分に合うものだけやればいい。
                    </p>
                </div>
            </section>

            {/* Section: ポッドキャストあるある */}
            <section
                id="aruaru" data-section-id="aruaru"
                ref={el => { sectionRefs.current[15] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-white transition-all duration-1000 ${revealedSections.has(15) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-8 text-center">
                        😂 英語ポッドキャストあるある
                    </h2>

                    <div className="space-y-4">
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                            <p className="text-stone-700">「なんか理解できた気がする」→ 振り返ると何も覚えてない</p>
                        </div>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                            <p className="text-stone-700">再生速度1.5倍で聞いてたら、1.0倍が遅すぎて戻れない</p>
                        </div>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                            <p className="text-stone-700">3時間のエピソードを「長い」と思わなくなる</p>
                        </div>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                            <p className="text-stone-700">気づいたらホストの口癖を覚えてる（"Right?", "You know"）</p>
                        </div>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                            <p className="text-stone-700">同じ話を違うエピソードで5回聞く（ヒューバーマン、朝日浴びろ言いすぎ）</p>
                        </div>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                            <p className="text-stone-700">スポンサー広告をスキップする速度が上がる</p>
                        </div>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                            <p className="text-stone-700">日本語のポッドキャストが薄く感じる</p>
                        </div>
                        <div className="bg-stone-50 rounded-xl p-4 border border-stone-200">
                            <p className="text-stone-700">「英語勉強してます」って言うと「すごい」って言われるけど、ただ聞いてるだけ</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 俺の装備 */}
            <section
                id="equipment" data-section-id="equipment"
                ref={el => { sectionRefs.current[16] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-stone-900 text-white transition-all duration-1000 ${revealedSections.has(16) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        🎧 俺の装備
                    </h2>
                    <p className="text-center text-stone-400 mb-8 md:mb-12 text-sm">
                        1000時間聞くための道具
                    </p>

                    <div className="space-y-6">
                        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl">🎧</span>
                                <h3 className="font-bold text-lg">AirPods Pro</h3>
                            </div>
                            <p className="text-stone-400 text-sm">
                                ノイズキャンセリングが神。現場でも車でも使える。
                                耳から落ちにくいのがいい。1日8時間つけてても疲れない。
                            </p>
                        </div>

                        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl">📱</span>
                                <h3 className="font-bold text-lg">Spotify / Apple Podcasts</h3>
                            </div>
                            <p className="text-stone-400 text-sm">
                                どっちでもいい。再生速度変えられればOK。
                                俺はSpotify派。オフライン保存できるから現場で通信量気にしなくていい。
                            </p>
                        </div>

                        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl">📝</span>
                                <h3 className="font-bold text-lg">メモ帳（なんでもいい）</h3>
                            </div>
                            <p className="text-stone-400 text-sm">
                                正直、メモはあんまり取らない。でもたまに「これ覚えとこ」ってときに使う。
                                スマホのメモアプリで十分。
                            </p>
                        </div>

                        <div className="bg-stone-800 rounded-xl p-6 border border-stone-700">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-3xl">☕</span>
                                <h3 className="font-bold text-lg">コーヒー</h3>
                            </div>
                            <p className="text-stone-400 text-sm">
                                これがないと始まらない。朝、現場着いたらまずコーヒー。
                                そしてイヤホンつけてスタート。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 最初の100時間を乗り越える */}
            <section
                id="first-100h" data-section-id="first-100h"
                ref={el => { sectionRefs.current[17] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-amber-50 to-white transition-all duration-1000 ${revealedSections.has(17) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        🚀 最初の100時間を乗り越える方法
                    </h2>
                    <p className="text-center text-stone-500 mb-8 md:mb-12 text-sm">
                        ここが一番キツい。でも乗り越えたら楽になる。
                    </p>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
                            <h3 className="font-bold text-amber-600 text-lg mb-2">1. わからなくていい</h3>
                            <p className="text-stone-600">
                                最初は10%もわからない。それでいい。
                                「なんか英語が流れてる」状態でOK。
                                理解しようとすると疲れる。BGMだと思え。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
                            <h3 className="font-bold text-amber-600 text-lg mb-2">2. 毎日聞く</h3>
                            <p className="text-stone-600">
                                30分でもいい。毎日聞く。
                                1日サボると「あ、もういいか」ってなる。
                                習慣になるまでが勝負。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
                            <h3 className="font-bold text-amber-600 text-lg mb-2">3. 同じエピソードを何回も聞く</h3>
                            <p className="text-stone-600">
                                新しいの聞かなくていい。
                                同じエピソードを3回聞くと、1回目より確実にわかるようになる。
                                それが成長。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
                            <h3 className="font-bold text-amber-600 text-lg mb-2">4. 興味あるトピックだけ聞く</h3>
                            <p className="text-stone-600">
                                義務感で聞くな。
                                睡眠に興味あればスリープのエピソード、ドーパミンならドーパミン。
                                興味ないのは飛ばせ。
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-amber-200">
                            <h3 className="font-bold text-amber-600 text-lg mb-2">5. 100時間を目標にする</h3>
                            <p className="text-stone-600">
                                1000時間は遠い。まず100時間。
                                毎日1時間で約3ヶ月。それだけでだいぶ変わる。
                                そしたら次の100時間が見えてくる。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: すでに英語使ってる説 */}
            <section
                id="already-using" data-section-id="already-using"
                ref={el => { sectionRefs.current[19] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-purple-50 to-white transition-all duration-1000 ${revealedSections.has(19) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl md:text-3xl font-bold mb-4 text-center">
                        🤔 すでに英語使ってる説
                    </h2>
                    <p className="text-center text-stone-500 mb-8 md:mb-12 text-sm">
                        これは告白だ。俺の矛盾について。
                    </p>

                    <div className="space-y-6">
                        {/* Confession */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-purple-200">
                            <h3 className="text-lg font-bold text-purple-600 mb-4">俺のコンプレックス</h3>
                            <p className="text-stone-600 leading-relaxed mb-4">
                                正直に言う。俺は英語にコンプレックスがある。
                            </p>
                            <p className="text-stone-600 leading-relaxed mb-4">
                                「発音矯正とかゴミ」「TOEICとか意味ない」と言ってきた。
                                でもそれは、<span className="font-bold text-purple-600">自分ができないことへの防衛反応</span>だった。
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                「できないから、価値がないと言う」——これはエゴの典型だ。
                            </p>
                        </div>

                        {/* The Twist */}
                        <div className="bg-purple-100 rounded-2xl p-6 md:p-8 border-2 border-purple-300">
                            <h3 className="text-lg font-bold text-purple-700 mb-4">でも待て。</h3>
                            <p className="text-xl md:text-2xl font-bold text-purple-800 mb-6">
                                アジャシャンティ、もう英語で話してるじゃん？
                            </p>
                            <div className="space-y-3 text-stone-700">
                                <p>俺が毎日聴いてる人たち：</p>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li><span className="font-bold">アジャシャンティ</span> — アメリカの非二元論の教師</li>
                                    <li><span className="font-bold">サドグル</span> — インドのヨギ</li>
                                    <li><span className="font-bold">マーティン・ボール</span> — 意識の研究者</li>
                                    <li><span className="font-bold">ヒューバーマン</span> — このページの主役</li>
                                </ul>
                                <p className="mt-4 font-bold text-purple-800">
                                    全員、英語で話してる。
                                </p>
                                <p className="mt-2">
                                    字幕なしで聴いてる。<br />
                                    意味がわかってる。<br />
                                    <span className="text-purple-700 font-bold">つまり俺は、すでに英語を「使ってる」んだ。</span>
                                </p>
                            </div>
                        </div>

                        {/* Realization */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-stone-200">
                            <h3 className="text-lg font-bold text-stone-700 mb-4">じゃあ何を嫌ってたのか</h3>
                            <p className="text-stone-600 leading-relaxed mb-4">
                                俺が嫌いなのは「英語学習」という<span className="font-bold">形式</span>だ。
                            </p>
                            <ul className="space-y-2 text-stone-600">
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500">✗</span>
                                    スコアで測られること
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500">✗</span>
                                    「ネイティブ度」で評価されること
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500">✗</span>
                                    「もう一度リピートしてください」と言われること
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-red-500">✗</span>
                                    教科書的な例文を覚えること
                                </li>
                            </ul>
                            <p className="mt-6 text-stone-600 leading-relaxed">
                                でも英語そのものは、すでに俺の生活に入ってる。
                            </p>
                        </div>

                        {/* Conclusion */}
                        <div className="text-center py-8">
                            <p className="text-xl md:text-2xl font-bold text-purple-700 mb-4">
                                アジャシャンティの教えを聴くために、<br />
                                俺は英語を使ってる。
                            </p>
                            <p className="text-stone-500">
                                これに気づいたのは、AIと深夜に英会話してたとき。
                            </p>
                            <p className="text-sm text-stone-400 mt-4">
                                ※ 詳しくは <a href="/journal/059" className="text-purple-600 hover:underline">ジャーナル#059</a> を読め
                            </p>
                        </div>

                        {/* So What */}
                        <div className="bg-amber-50 rounded-2xl p-6 md:p-8 border border-amber-200">
                            <h3 className="text-lg font-bold text-amber-700 mb-4">で、何が言いたいか</h3>
                            <p className="text-stone-600 leading-relaxed mb-4">
                                「英語を勉強しなきゃ」と思ってる人へ：
                            </p>
                            <p className="text-xl font-bold text-amber-800 mb-4">
                                もう使ってるかもしれないぞ？
                            </p>
                            <ul className="space-y-2 text-stone-600">
                                <li>• 洋楽聴いてない？</li>
                                <li>• 海外のYouTube見てない？</li>
                                <li>• ゲームで英語出てこない？</li>
                                <li>• 仕事で英語のドキュメント読んでない？</li>
                            </ul>
                            <p className="mt-6 text-stone-600 leading-relaxed">
                                「勉強」という形式を経由しなくても、<br />
                                英語は入ってきてる。それでいい。
                            </p>
                            <p className="mt-4 font-bold text-amber-700">
                                TOEICもTOEFLも、別に悪くない。<br />
                                勉強してスコア上げる人、普通に偉い。<br />
                                俺はできないから言い訳してただけ。
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: 最後に */}
            <section
                id="lastly" data-section-id="lastly"
                ref={el => { sectionRefs.current[20] = el }}
                className={`py-16 md:py-24 px-4 md:px-6 bg-[#252423] text-white transition-all duration-1000 ${revealedSections.has(20) ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
            >
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-xl md:text-3xl font-bold mb-8">
                        最後に
                    </h2>

                    <div className="space-y-6 text-lg leading-relaxed">
                        <p className="text-stone-400">
                            ここまで読んでくれてありがとう。
                        </p>
                        <p className="text-stone-400">
                            長かったよな。でも、ヒューバーマンのポッドキャストは<br />
                            これの10倍長いから、これくらいは余裕だろ。
                        </p>
                        <p className="text-white font-bold">
                            英語を「学ぶ」んじゃなくて「住む」。
                        </p>
                        <p className="text-stone-400">
                            それが、俺がこのページで言いたかったこと。
                        </p>
                        <p className="text-stone-400">
                            効率とか、テストのスコアとか、そういうのはどうでもいい。
                        </p>
                        <p className="text-amber-400 font-bold text-xl">
                            ただ、聞け。1000時間聞け。
                        </p>
                        <p className="text-stone-500 text-sm mt-8">
                            そしたら、気づいたら英語が「外国語」じゃなくなってる。<br />
                            それだけ。
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-stone-700">
                        <p className="text-stone-600 text-xs">
                            このページは内装屋が趣味で作ってます。<br />
                            本業はクロス貼りです。床も張ります。<br />
                            内装の仕事はイワサキ内装まで。
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-6 md:py-8 border-t border-stone-200 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <Link href="/" className="text-stone-500 hover:text-[#252423] text-sm">
                        ← イワサキ内装に戻る
                    </Link>
                    <p className="text-xs text-stone-400">
                        © 2026 イワサキ内装（の実験）
                    </p>
                </div>
            </footer>
        </main>
    )
}
