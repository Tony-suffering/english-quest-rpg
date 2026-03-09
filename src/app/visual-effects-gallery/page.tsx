import Link from "next/link";

export const metadata = {
    title: 'Visual Effects Gallery | イワサキ内装',
    description: '映像エフェクト全バージョン一覧',
};

const versions = [
    {
        id: 'v1',
        name: 'Version 1',
        subtitle: 'Original',
        description: '基本的な4セクション構成。Typography, Spotlight, Glassmorphism, 3D Mapping。',
        href: '/visual-effects-v1',
        features: ['タイポグラフィマスク', 'スポットライト', 'グラスモーフィズム', '3Dマッピング'],
    },
    {
        id: 'v2',
        name: 'Version 2',
        subtitle: 'Holographic',
        description: 'ホログラフィック3Dクリスタルを搭載。軌道リング、浮遊パーティクル、星空エフェクト。',
        href: '/visual-effects-v2',
        features: ['ホログラフィッククリスタル', '軌道リング', 'フローティングフラグメント', 'スターフィールド'],
    },
    {
        id: 'v3',
        name: 'Version 3',
        subtitle: 'Clean',
        description: 'シンプルでクリーンな3D動画表示。映像そのものを活かすミニマルデザイン。',
        href: '/visual-effects-v3',
        features: ['フローティングスクリーン', 'ミニマルグリッド', 'オートローテーション', 'クリーンUI'],
    },
    {
        id: 'latest',
        name: 'Latest',
        subtitle: 'Full Experience',
        description: '全エフェクトを統合した最新版。4セクション構成でスクロール体験。',
        href: '/visual-effects',
        features: ['Typography Mask', 'Spotlight Effect', 'Before/After', 'Holographic 3D'],
    },
];

export default function VisualEffectsGalleryPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                        <span className="text-amber-500 text-xs font-mono tracking-widest uppercase">
                            Visual Effects Gallery
                        </span>
                    </div>
                    <Link
                        href="/blog/2025-12-15-digital-sumitsubo"
                        className="text-white/40 hover:text-amber-500 text-xs font-mono tracking-wider transition-colors"
                    >
                        記事を読む →
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-20 h-px bg-gradient-to-r from-amber-500 to-transparent" />
                        <span className="text-white/30 text-xs font-mono tracking-widest">IWASAKI INTERIOR</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6">
                        Visual<br />
                        <span className="text-amber-500">Effects</span>
                    </h1>
                    <p className="text-white/40 text-lg max-w-xl leading-relaxed">
                        DaVinci Resolveで編集した映像を<br />
                        様々な3Dエフェクトで表現するシリーズ。
                    </p>
                </div>
            </section>

            {/* Versions Grid */}
            <section className="px-8 pb-32">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {versions.map((version, index) => (
                            <Link
                                key={version.id}
                                href={version.href}
                                className="group relative bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-lg p-8 transition-all duration-500 hover:bg-white/10"
                            >
                                {/* Version number */}
                                <div className="absolute top-8 right-8 text-6xl font-light text-white/5 group-hover:text-amber-500/10 transition-colors duration-500">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-amber-500 text-xs font-mono tracking-widest uppercase">
                                            {version.subtitle}
                                        </span>
                                        {version.id === 'latest' && (
                                            <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-xs font-mono rounded">
                                                RECOMMENDED
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-2xl font-light mb-3 group-hover:text-amber-500 transition-colors">
                                        {version.name}
                                    </h2>

                                    <p className="text-white/40 text-sm leading-relaxed mb-6">
                                        {version.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {version.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-3 py-1 bg-white/10 text-white/50 text-xs rounded-full"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Arrow */}
                                    <div className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Info */}
            <section className="px-8 pb-20 border-t border-white/5">
                <div className="max-w-7xl mx-auto pt-16">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            <div className="text-white/30 text-xs font-mono tracking-widest mb-2">TECHNOLOGY STACK</div>
                            <div className="flex flex-wrap gap-4 text-white/50 text-sm">
                                <span>React Three Fiber</span>
                                <span className="text-white/20">•</span>
                                <span>@react-three/drei</span>
                                <span className="text-white/20">•</span>
                                <span>Three.js</span>
                                <span className="text-white/20">•</span>
                                <span>DaVinci Resolve</span>
                            </div>
                        </div>
                        <div className="text-white/20 text-xs font-mono tracking-widest">
                            © IWASAKI INTERIOR
                        </div>
                    </div>
                </div>
            </section>

            {/* Corner decorations */}
            <div className="fixed top-20 left-4 w-16 h-16 border-l border-t border-amber-500/10 pointer-events-none" />
            <div className="fixed top-20 right-4 w-16 h-16 border-r border-t border-amber-500/10 pointer-events-none" />
            <div className="fixed bottom-4 left-4 w-16 h-16 border-l border-b border-amber-500/10 pointer-events-none" />
            <div className="fixed bottom-4 right-4 w-16 h-16 border-r border-b border-amber-500/10 pointer-events-none" />
        </main>
    );
}
