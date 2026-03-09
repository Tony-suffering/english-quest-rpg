import { TypographyVideoMask } from "@/components/website/original/TypographyVideoMask";
import { SpotlightVideo } from "@/components/website/original/SpotlightVideo";
import { GlassmorphismSection } from "@/components/website/original/GlassmorphismSection";
import { ObjectVideoMapping } from "@/components/website/original/ObjectVideoMapping";
import Link from "next/link";
import React from "react";

export const metadata = {
    title: 'Visual Effects v1 (Original) | イワサキ内装',
    description: '元のビジュアルエフェクト実装',
};

export default function VisualEffectsV1Page() {
    return (
        <main>
            {/* Version Navigation */}
            <div className="fixed top-6 left-6 z-50 flex items-center gap-2 text-xs">
                <Link href="/visual-effects-gallery" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">
                    Gallery
                </Link>
                <span className="text-white/20">|</span>
                <span className="px-3 py-1.5 text-[#D4AF37] border border-[#D4AF37]/50 rounded">V1</span>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects-v2" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">V2</Link>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects-v3" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">V3</Link>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">Latest</Link>
            </div>

            <section className="h-screen w-full">
                <TypographyVideoMask
                    text="IWASAKI"
                    subText="DIGITAL CRAFTSMANSHIP"
                    videoSrc="/videos/digital-sumitsubo-demo.mov"
                    mode="dark"
                />
            </section>

            <section className="h-screen w-full relative">
                <SpotlightVideo
                    videoSrc="/videos/digital-sumitsubo-demo.mov"
                    text="DISCOVER"
                />
                <div className="absolute bottom-10 left-0 w-full text-center pointer-events-none text-white/50 text-sm">
                    Mouse over to reveal
                </div>
            </section>

            <section className="h-screen w-full">
                <GlassmorphismSection
                    videoSrc="/videos/digital-sumitsubo-demo.mov"
                />
            </section>

            <section className="h-screen w-full">
                <ObjectVideoMapping
                    videoSrc="/videos/digital-sumitsubo-demo.mov"
                />
            </section>

            {/* Future sections placeholder */}
            <section className="h-screen w-full bg-neutral-900 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4">Original Version (v1)</h2>
                    <p className="opacity-60 mb-8">This is the original implementation before improvements.</p>
                    <Link
                        href="/visual-effects"
                        className="px-6 py-3 bg-[#D4AF37] text-black font-medium rounded hover:bg-[#D4AF37]/90 transition-colors"
                    >
                        View New Version
                    </Link>
                </div>
            </section>
        </main>
    );
}
