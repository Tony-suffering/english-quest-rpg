import SpotlightTypography from "@/components/website/SpotlightTypography";
import Link from "next/link";
import React from "react";

export const metadata = {
    title: 'Experimental Effects | イワサキ内装',
    description: 'AI Video Workflow Visualization',
};

export default function VisualEffectsPage() {
    const videoSrc = "/videos/ai-workflow.mp4";

    return (
        <main className="relative bg-black min-h-screen">
            {/* Minimal Header */}
            <div className="fixed top-6 left-6 z-50 flex items-center gap-4 text-xs tracking-widest mix-blend-difference">
                <Link href="/" className="text-white hover:text-[#D4AF37] transition-colors">
                    ← BACK TO HOME
                </Link>
                <div className="h-px w-8 bg-current opacity-50" />
                <span className="text-white/50">EXPERIMENTAL / 05</span>
            </div>

            {/* Combined Effect */}
            <section className="h-screen w-full">
                <SpotlightTypography
                    text="IWASAKI"
                    subText="AI VIDEO WORKFLOW"
                    cloudflareId="7f6b4d1e053d41d0dcd56aa789261692"
                    className="h-screen w-full"
                    initialRadius={250}
                />
            </section>
        </main>
    );
}
