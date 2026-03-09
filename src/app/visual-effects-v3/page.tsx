import { SimpleVideo3D } from "@/components/website/SimpleVideo3D";
import Link from "next/link";

export const metadata = {
    title: 'Visual Effects v3 (Clean) | イワサキ内装',
    description: 'クリーンな3D動画表示',
};

export default function VisualEffectsV3Page() {
    return (
        <main className="bg-black min-h-screen">
            {/* Version Navigation */}
            <div className="fixed top-6 left-6 z-50 flex items-center gap-2 text-xs">
                <Link href="/visual-effects-gallery" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">
                    Gallery
                </Link>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects-v1" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">V1</Link>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects-v2" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">V2</Link>
                <span className="text-white/20">|</span>
                <span className="px-3 py-1.5 text-[#D4AF37] border border-[#D4AF37]/50 rounded">V3</span>
                <span className="text-white/20">|</span>
                <Link href="/visual-effects" className="px-3 py-1.5 text-white/40 hover:text-white transition-colors">Latest</Link>
            </div>

            {/* Simple 3D Video */}
            <SimpleVideo3D videoSrc="/videos/digital-sumitsubo-demo.mov" />
        </main>
    );
}
