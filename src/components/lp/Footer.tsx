import Link from 'next/link'

export default function Footer() {
    const footerNav = {
        concept: [
            { name: '問題提起', href: '/concept#problem' },
            { name: '7つの構造ルール', href: '/concept#rules' },
            { name: '10の会話パターン', href: '/concept#patterns' },
            { name: 'RPGの設計思想', href: '/concept#philosophy' },
        ],
        training: [
            { name: 'スロットマシン', href: '/training-guide#slot' },
            { name: 'パズルバトル', href: '/training-guide#battle' },
            { name: 'マリオランナー', href: '/training-guide#runner' },
            { name: 'チェーン / フィーバー', href: '/training-guide#chain' },
            { name: 'アリーナ', href: '/training-guide#arena' },
        ],
        content: [
            { name: 'Memoria', href: '/content-guide#memoria' },
            { name: 'Requiem', href: '/content-guide#requiem' },
            { name: '俺語録', href: '/content-guide#goroku' },
            { name: 'Pro', href: '/content-guide#pro' },
            { name: 'Quest', href: '/content-guide#quest' },
            { name: '英会話Lab', href: '/content-guide#lab' },
        ],
        system: [
            { name: 'カード進化', href: '/system-guide#cards' },
            { name: 'エレメント', href: '/system-guide#elements' },
            { name: '日レベル', href: '/system-guide#daily' },
            { name: 'プレイヤーレベル', href: '/system-guide#player' },
            { name: 'テクノロジー', href: '/tech' },
        ],
    }

    return (
        <footer className="bg-[#0a0a0a] relative overflow-hidden" aria-labelledby="footer-heading">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37] opacity-[0.03] rounded-full blur-[100px] pointer-events-none" />
            <h2 id="footer-heading" className="sr-only">Footer</h2>

            <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 border-b border-white/5 pb-20">
                    <div>
                        <h3 className="text-[10px] tracking-[0.3em] text-[#D4AF37] mb-6 uppercase font-serif">Start Learning</h3>
                        <p className="text-3xl md:text-4xl font-light text-white leading-relaxed font-serif mb-8">
                            完成を待ってたら<br />
                            <span className="font-bold">永遠に喋れない。</span><br />
                            <span className="text-xl text-white/60 mt-4 block font-sans">毎日何かが増える。毎日何かが壊れる。毎日何かが直る。</span>
                        </p>
                        <Link
                            href="/english/training"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-bold tracking-widest hover:bg-[#D4AF37] transition-all duration-300"
                        >
                            START <span className="text-lg">→</span>
                        </Link>
                    </div>
                    <div className="flex flex-col justify-end items-start text-left lg:items-end lg:text-right">
                        <div className="text-5xl md:text-6xl font-black text-white/5 mb-4 tracking-tighter select-none">TONIO LAB</div>
                        <div className="text-white/60 text-sm leading-7 font-light">
                            <span className="block text-white text-base font-bold mb-2 tracking-widest">English Quest RPG</span>
                            TOEIC 900. 4技能のうち3つクリア。<br />
                            最後の1つで永遠に死んでる男が作ってるアプリ。<br />
                            <a href="https://note.com/tonio_english" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors mt-2 block text-white/40 text-xs tracking-widest uppercase">
                                note.com/tonio_english
                            </a>
                        </div>
                    </div>
                </div>

                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <div className="text-2xl font-serif text-white tracking-widest">TONIO LAB</div>
                        <p className="text-xs leading-6 text-gray-400 font-light tracking-wide">
                            英語フレーズをポケモンみたいに<br />
                            捕まえて、育てて、戦わせる。
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-xs font-semibold leading-6 text-white uppercase tracking-widest border-b border-[#D4AF37]/30 pb-2 mb-6 w-fit">Concept</h3>
                                <ul role="list" className="space-y-3">
                                    {footerNav.concept.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                                                <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-xs font-semibold leading-6 text-white uppercase tracking-widest border-b border-[#D4AF37]/30 pb-2 mb-6 w-fit">Training</h3>
                                <ul role="list" className="space-y-3">
                                    {footerNav.training.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                                                <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-xs font-semibold leading-6 text-white uppercase tracking-widest border-b border-[#D4AF37]/30 pb-2 mb-6 w-fit">Content</h3>
                                <ul role="list" className="space-y-3">
                                    {footerNav.content.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                                                <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-xs font-semibold leading-6 text-white uppercase tracking-widest border-b border-[#D4AF37]/30 pb-2 mb-6 w-fit">System</h3>
                                <ul role="list" className="space-y-3">
                                    {footerNav.system.map((item) => (
                                        <li key={item.name}>
                                            <Link href={item.href} className="text-sm leading-6 text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                                                <span className="w-1 h-1 rounded-full bg-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-white/5 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] leading-5 text-gray-500 tracking-wider">
                            &copy; {new Date().getFullYear()} Tonio Lab. Built with Vibe Coding + Claude AI.
                        </p>
                        <div className="flex items-center gap-6">
                            <a href="https://note.com/tonio_english" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors uppercase tracking-widest font-mono">
                                note.com
                            </a>
                            <Link href="/english/training" className="text-[10px] text-gray-600 hover:text-[#D4AF37] transition-colors uppercase tracking-widest">
                                Training
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
