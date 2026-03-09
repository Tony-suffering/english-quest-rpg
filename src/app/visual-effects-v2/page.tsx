import { TypographyVideoMask } from "@/components/website/TypographyVideoMask";
import { SpotlightVideo } from "@/components/website/SpotlightVideo";
import { GlassmorphismSection } from "@/components/website/GlassmorphismSection";
import { HolographicVideoSculpture } from "@/components/website/HolographicVideoSculpture";
import Link from "next/link";
import React from "react";

export const metadata = {
    title: 'Visual Effects v2 | イワサキ内装',
    description: 'ホログラフィック3Dエフェクト搭載の最新バージョン',
};

export default function VisualEffectsV2Page() {
    const videoSrc = "/videos/digital-sumitsubo-demo.mov";

    return (
        <main className="relative">
            {/* Version Navigation */}
            <div className="fixed top-6 left-6 z-50 flex items-center gap-2 text-xs">
                <Link href="/visual-effects-gallery" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">
                    Gallery
                </Link>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects-v1" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">V1</Link>
                <span className="text-white/20">|</span>
                <span className="px-3 py-1.5 text-[#D4AF37] border border-[#D4AF37]/50 rounded">V2</span>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects-v3" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">V3</Link>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">Latest</Link>
            </div>

            {/* Navigation Dots */}
            <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
                {['01', '02', '03', '04'].map((num, i) => (
                    <a
                        key={num}
                        href={`#section-${num}`}
                        className="group flex items-center gap-3"
                    >
                        <span className="text-white/0 group-hover:text-white/60 text-xs tracking-widest transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                            {['TYPOGRAPHY', 'SPOTLIGHT', 'COMPARISON', 'HOLOGRAPHIC'][i]}
                        </span>
                        <div className="w-3 h-3 rounded-full border border-white/30 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all duration-300" />
                    </a>
                ))}
            </nav>

            {/* Section 1: Typography Video Mask */}
            <section id="section-01" className="h-screen w-full">
                <TypographyVideoMask
                    text="IWASAKI"
                    subText="DIGITAL CRAFTSMANSHIP"
                    videoSrc={videoSrc}
                    mode="dark"
                />
            </section>

            {/* Section 2: Spotlight Video */}
            <section id="section-02" className="h-screen w-full relative">
                <SpotlightVideo
                    videoSrc={videoSrc}
                    text="DISCOVER"
                    initialRadius={180}
                />
            </section>

            {/* Section 3: Before/After Comparison */}
            <section id="section-03" className="h-screen w-full">
                <GlassmorphismSection
                    videoSrc={videoSrc}
                    title="BEFORE → AFTER"
                    content="Drag the slider to reveal the color grading transformation"
                />
            </section>

            {/* Section 4: NEW Holographic 3D Sculpture */}
            <section id="section-04" className="h-screen w-full">
                <HolographicVideoSculpture videoSrc={videoSrc} />
            </section>

            {/* Footer */}
            <footer className="h-screen w-full bg-[#030308] flex items-center justify-center relative overflow-hidden">
                {/* Background effect */}
                <div className="absolute inset-0">
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
                        style={{
                            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 50%)'
                        }}
                    />
                </div>

                <div className="text-center max-w-2xl px-8 relative z-10">
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
                        <span className="text-[#D4AF37] text-xs tracking-[0.3em] font-mono">VERSION 2.0</span>
                        <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
                    </div>
                    <h2 className="text-white text-4xl md:text-5xl font-light tracking-tight mb-6">
                        Holographic<br />
                        <span className="text-[#D4AF37]">Experience</span>
                    </h2>
                    <p className="text-white/40 text-lg leading-relaxed mb-12">
                        3Dホログラフィック・クリスタルで<br />
                        映像の記憶を結晶化する。
                    </p>
                    <div className="flex items-center justify-center gap-6">
                        <Link
                            href="/blog/2025-12-15-digital-sumitsubo"
                            className="px-8 py-3 bg-[#D4AF37] text-black font-medium tracking-wider hover:bg-[#D4AF37]/90 transition-colors"
                        >
                            READ ARTICLE
                        </Link>
                        <Link
                            href="/visual-effects"
                            className="px-8 py-3 border border-white/20 text-white/70 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors tracking-wider"
                        >
                            LATEST VERSION
                        </Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
