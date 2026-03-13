'use client'

import { motion } from 'framer-motion'

export const f = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.65, 0.3, 0.9] } },
}

export function Section({ children, bg = 'bg-white', className = '' }: { children: React.ReactNode; bg?: string; className?: string }) {
    return (
        <section className={`px-6 sm:px-12 lg:px-24 py-20 ${bg} ${className}`}>
            <motion.div
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
                transition={{ staggerChildren: 0.08 }}
                className="max-w-3xl"
            >
                {children}
            </motion.div>
        </section>
    )
}

export function Label({ children }: { children: React.ReactNode }) {
    return <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-gray-400 font-mono mb-6">{children}</motion.p>
}

export function GoldLabel({ children }: { children: React.ReactNode }) {
    return <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-6">{children}</motion.p>
}

export function H2({ children }: { children: React.ReactNode }) {
    return <motion.h2 variants={f} className="text-2xl sm:text-3xl font-black leading-[1.4] mb-6">{children}</motion.h2>
}

export function P({ children }: { children: React.ReactNode }) {
    return <motion.p variants={f} className="text-[15px] text-[#252423]/60 leading-[1.9] mb-4">{children}</motion.p>
}

export function Accent({ children }: { children: React.ReactNode }) {
    return <motion.div variants={f} className="border-l-[5px] border-[#D4AF37] pl-6 mb-8"><p className="text-lg sm:text-xl font-bold leading-relaxed">{children}</p></motion.div>
}

export function Code({ children }: { children: React.ReactNode }) {
    return <motion.div variants={f} className="bg-[#F5F5F7] border border-[#DAE2E8] p-5 font-mono text-xs text-[#252423]/60 leading-relaxed mb-4">{children}</motion.div>
}

export function GoldCode({ children }: { children: React.ReactNode }) {
    return <motion.div variants={f} className="bg-white border-l-[5px] border-[#D4AF37] p-5 font-mono text-sm text-[#252423] leading-relaxed shadow-sm mb-4">{children}</motion.div>
}

export function Rule({ num, title, desc }: { num: string; title: string; desc: string }) {
    return (
        <motion.div variants={f} className="flex gap-4 py-3 border-b border-[#DAE2E8] last:border-0">
            <span className="text-[10px] text-[#D4AF37] font-mono font-bold w-5 pt-0.5 shrink-0">{num}</span>
            <div>
                <p className="text-sm font-bold text-[#252423]">{title}</p>
                <p className="text-xs text-[#252423]/50 mt-0.5 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    )
}

export function Feature({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
    return (
        <motion.div variants={f} className="mb-12 last:mb-0">
            <div className="flex items-baseline gap-3 mb-3">
                <h3 className="text-base font-black">{title}</h3>
                <span className="text-[10px] text-gray-400 tracking-widest">{sub}</span>
            </div>
            {children}
        </motion.div>
    )
}

export function Stat({ value, label }: { value: string; label: string }) {
    return (
        <motion.div variants={f}>
            <p className="text-2xl sm:text-3xl font-black text-[#252423]">{value}</p>
            <p className="text-[10px] text-gray-400 tracking-widest mt-0.5">{label}</p>
        </motion.div>
    )
}

export function PageHeader({ label, title }: { label: string; title: string }) {
    return (
        <section className="px-6 sm:px-12 lg:px-24 pt-12 pb-16 border-b border-[#DAE2E8]">
            <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }} className="max-w-3xl">
                <motion.p variants={f} className="text-[10px] tracking-[0.3em] text-[#D4AF37] font-mono mb-4">{label}</motion.p>
                <motion.h1 variants={f} className="text-3xl sm:text-4xl font-black leading-[1.3] tracking-tight">{title}</motion.h1>
            </motion.div>
        </section>
    )
}
