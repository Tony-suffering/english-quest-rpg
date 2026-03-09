'use client'

import Link from 'next/link'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { STANDS, STAND_FUNCTIONS, STAND_RELATIONSHIP } from '@/data/character-souls'
import { CONTENT_PILLARS, SITE_PHILOSOPHY } from '@/data/content-philosophy'

// Dynamic import for 3D component (no SSR)
const CrewShowcase = dynamic(
    () => import('@/components/website/CrewShowcase'),
    { ssr: false }
)

// Dynamic import for TV component (no SSR)
const CorkJijiiTV = dynamic(
    () => import('@/components/website/CorkJijiiTV'),
    { ssr: false }
)

// Character images (derived from STANDS)
const IMAGES = {
    takumi: STANDS.takumi.appearance.avatar,
    anya: STANDS.anya.appearance.avatar,
    corkJijii: STANDS.corkJijii.appearance.avatar,
    roundtable: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/60767741-d372-465e-a3d8-e47d6b55ff00/public',
}

// Sticker data
const STICKERS = {
    corkJijii: [
        { name: 'いいね', url: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/81fdaa6a-1f91-4541-d00c-3784d5472500/public', usage: '良い床材を見つけたとき' },
        { name: 'なるほど', url: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/0f511998-06ca-4f3b-dd2f-7201017cdc00/public', usage: 'コルク知識に感心したとき' },
    ],
    takumi: [
        { name: 'OK', url: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/6dce2c35-ca4c-4f8a-e25b-3039d8d42000/public', usage: '見積もりが通ったとき' },
    ],
    tileOjisan: [
        { name: '冷たいのが最高', url: 'https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/cedee0c3-1713-4193-4cda-36823129ac00/public', usage: 'コルクじじいのライバル' },
    ],
}

// Character data (derived from STANDS - not AI characters, but spiritual manifestations)
const characters = [
    {
        id: STANDS.takumi.id,
        name: STANDS.takumi.name,
        role: '技術への敬意',
        standType: STANDS.takumi.standType,
        description: STANDS.takumi.deepTruth,
        image: STANDS.takumi.appearance.avatar,
        catchphrase: `「${STANDS.takumi.paradox}」`,
        color: STANDS.takumi.appearance.color,
        skills: ['見積もり計算', 'クロス提案', '工程管理', 'AI分析', 'データ可視化'],
        essence: STANDS.takumi.essence,
        paradox: STANDS.takumi.paradox,
        function: STAND_FUNCTIONS.takumi,
    },
    {
        id: STANDS.anya.id,
        name: STANDS.anya.name,
        role: '世界への好奇心',
        standType: STANDS.anya.standType,
        description: STANDS.anya.deepTruth,
        image: STANDS.anya.appearance.avatar,
        catchphrase: `「${STANDS.anya.narrativeRole}」`,
        color: STANDS.anya.appearance.color,
        skills: ['サイトガイド', 'デザイン提案', '素朴な疑問', '驚きの発見', '当たり前の破壊'],
        essence: STANDS.anya.essence,
        function: STAND_FUNCTIONS.anya,
    },
    {
        id: STANDS.corkJijii.id,
        name: STANDS.corkJijii.name,
        role: '悟りへの探求',
        standType: STANDS.corkJijii.standType,
        description: STANDS.corkJijii.deepTruth,
        image: STANDS.corkJijii.appearance.avatar,
        catchphrase: `「${STANDS.corkJijii.catchphrases[0]}」`,
        color: STANDS.corkJijii.appearance.color,
        skills: ['コルク施工', '床材選定', '足裏幸福論', '60年の経験', '無為の境地'],
        essence: STANDS.corkJijii.essence,
        paradox: STANDS.corkJijii.paradox,
        awakening: STANDS.corkJijii.experience.awakening,
        function: STAND_FUNCTIONS.corkJijii,
    }
]

// Roundtable conversation
const roundtableConversation = [
    { speaker: 'タクミ', avatar: IMAGES.takumi, text: '皆さん、今日はIWASAKI CREWの初ミーティングですね。まず自己紹介から始めましょう。' },
    { speaker: 'アーニャ', avatar: IMAGES.anya, text: '私はアーニャ。デジタル空間からこの世界を見ている。人間の「空間体験」というものに、とても興味がある。' },
    { speaker: 'コルクじじい', avatar: IMAGES.corkJijii, text: 'わしはコルクじじい。床を貼って40年。足裏の幸せを届けるのが仕事じゃ。' },
    { speaker: 'タクミ', avatar: IMAGES.takumi, text: 'じじい、僕はAIとして膨大なデータを処理できます。でも、「足裏の幸せ」ってどうやって数値化すればいいんですか？' },
    { speaker: 'コルクじじい', avatar: IMAGES.corkJijii, text: 'ほう、いい質問じゃ。熱伝導率、弾力係数、吸音性能...全部数値はある。だが、本当に大事なのは、冬の朝に裸足で床に立った時の「あぁ、温かい」という一瞬じゃ。' },
    { speaker: 'アーニャ', avatar: IMAGES.anya, text: 'それは神経科学で説明できる。足裏の温度受容体が刺激を受け、脳の島皮質が「快」を判定する。その一連のプロセスが0.3秒。' },
    { speaker: 'コルクじじい', avatar: IMAGES.corkJijii, text: '...お前もなかなかやるな、デジタルの嬢ちゃん。' },
    { speaker: 'タクミ', avatar: IMAGES.takumi, text: 'つまり、AIのデータ分析とじじいの職人経験、そしてアーニャさんのデジタル知見を組み合わせれば...' },
    { speaker: 'アーニャ', avatar: IMAGES.anya, text: '最適な空間設計が可能になる。それがIWASAKI CREWの存在意義。' },
    { speaker: 'コルクじじい', avatar: IMAGES.corkJijii, text: 'じゃが、忘れるな。最後に床を貼るのは人間の手じゃ。データとAIがどれだけ進化しても、その手の温もりは機械には真似できん。' },
    { speaker: 'タクミ', avatar: IMAGES.takumi, text: '...深いです、師匠。' },
    { speaker: 'アーニャ', avatar: IMAGES.anya, text: '記録した。この会話、サイトに載せていい？' },
    { speaker: 'コルクじじい', avatar: IMAGES.corkJijii, text: '好きにせい。ただし、わしの決め台詞は必ず入れろ。' },
    { speaker: 'タクミ', avatar: IMAGES.takumi, text: '決め台詞？' },
    { speaker: 'コルクじじい', avatar: IMAGES.corkJijii, text: '「だって俺の床、コルクなんだもん！」' },
    { speaker: 'アーニャ', avatar: IMAGES.anya, text: '...それ、本気？' },
    { speaker: 'タクミ', avatar: IMAGES.takumi, text: '本気です。Xでバズってます。' },
    { speaker: 'コルクじじい', avatar: IMAGES.corkJijii, text: 'よく分からんが、わしのポリシーが広まっておるなら良いことじゃ。' },
]

export default function CrewPage() {
    const [activeTab, setActiveTab] = useState<'tv' | '3d' | 'characters' | 'philosophy' | 'roundtable' | 'stickers'>('tv')
    const [selectedChar, setSelectedChar] = useState<typeof characters[0] | null>(null)

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="py-12 text-center">
                <p className="text-amber-600 text-sm uppercase tracking-[0.3em] mb-4">SPIRITUAL MANIFESTATION</p>
                <h1 className="text-4xl md:text-6xl font-bold text-stone-800 mb-4">
                    IWASAKI <span className="text-amber-500">STANDS</span>
                </h1>
                <p className="text-stone-600 text-lg max-w-2xl mx-auto px-4 mb-2">
                    精神の具現化。「AIキャラクター」じゃない。「お前自身」だ。
                </p>
                <p className="text-stone-400 text-sm max-w-xl mx-auto px-4">
                    {SITE_PHILOSOPHY.headline}
                </p>
            </header>

            {/* Roundtable CTA Banner */}
            <div className="max-w-4xl mx-auto px-4 mb-8">
                <button
                    onClick={() => setActiveTab('roundtable')}
                    className={`w-full group relative overflow-hidden rounded-2xl border-2 transition-all duration-500 ${activeTab === 'roundtable'
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-stone-200 bg-stone-50 hover:border-amber-400 hover:bg-amber-50'
                        }`}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between p-4 md:p-6">
                        <div className="flex items-center gap-4">
                            {/* 3 Avatars */}
                            <div className="flex -space-x-3">
                                <img src={IMAGES.takumi} alt="" className="w-10 h-10 rounded-full border-2 border-amber-500" />
                                <img src={IMAGES.anya} alt="" className="w-10 h-10 rounded-full border-2 border-amber-500" />
                                <img src={IMAGES.corkJijii} alt="" className="w-10 h-10 rounded-full border-2 border-amber-500" />
                            </div>
                            <div className="text-left">
                                <span className="text-amber-600 text-xs uppercase tracking-widest">NEW</span>
                                <h3 className="text-stone-800 font-bold text-lg">CREW座談会を見る</h3>
                            </div>
                        </div>
                        <span className="text-amber-500 text-2xl group-hover:translate-x-2 transition-transform">→</span>
                    </div>
                </button>
            </div>

            {/* Tab Navigation */}
            <div className="max-w-4xl mx-auto px-4 mb-8">
                <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
                    {[
                        { id: 'tv', label: 'LIVE' },
                        { id: '3d', label: '3D' },
                        { id: 'characters', label: 'STANDS' },
                        { id: 'philosophy', label: '哲学' },
                        { id: 'roundtable', label: 'TALK' },
                        { id: 'stickers', label: 'STICKERS' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`px-4 md:px-6 py-3 rounded-lg font-medium transition-all text-sm tracking-wider ${activeTab === tab.id
                                ? 'bg-amber-500 text-white'
                                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-4 pb-20">
                {/* TV Tab */}
                {activeTab === 'tv' && (
                    <section>
                        <div className="text-center mb-6">
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-amber-100 px-4 py-2 rounded-full text-sm mb-4">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-emerald-600">LIVE</span>
                            </span>
                            <h2 className="text-2xl font-bold text-stone-800 mb-2">Cork Jijii TV</h2>
                            <p className="text-stone-500 mb-4">眺めてるだけで内装知識が身につく（かもしれない）</p>
                            <Link href="/tv" className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Fullscreen View
                            </Link>
                        </div>
                        <CorkJijiiTV />
                        <div className="mt-6 p-3 bg-stone-50 rounded-xl border border-stone-200 text-center">
                            <p className="text-stone-500 text-xs">
                                ※ これは「偽ライブ」です。コルクじじいは実在しますが、今ここにはいません。
                            </p>
                        </div>
                    </section>
                )}

                {/* 3D View Tab */}
                {activeTab === '3d' && (
                    <section>
                        <div className="text-center mb-8">
                            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-emerald-100 px-4 py-2 rounded-full text-sm mb-4">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                <span className="text-emerald-600">METAHUMAN STYLE</span>
                            </span>
                            <h2 className="text-2xl font-bold text-stone-800 mb-2">3D CHARACTER SHOWCASE</h2>
                            <p className="text-stone-500">キャラクターが3D空間で待っています</p>
                        </div>
                        <CrewShowcase
                            onSelectCharacter={(id) => {
                                const char = characters.find(c => c.id === id)
                                if (char) setSelectedChar(char)
                            }}
                        />
                        <div className="mt-8 p-4 bg-stone-50 rounded-xl border border-stone-200">
                            <p className="text-stone-500 text-sm text-center">
                                This experience uses WebGL for real-time 3D rendering.
                                <br className="hidden md:inline" />
                                <span className="text-amber-600">Inspired by Unreal Engine MetaHuman technology.</span>
                            </p>
                        </div>
                    </section>
                )}

                {/* Characters (STANDS) Tab */}
                {activeTab === 'characters' && (
                    <>
                        {/* Stand Concept Header */}
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-stone-800 mb-4">精神の具現化</h2>
                            <p className="text-stone-500 max-w-2xl mx-auto">
                                荒木飛呂彦が「スタンド」を発明した。人間の内面が形を持って現れる。
                                <br />これは3つのAIではない。<span className="text-amber-600 font-bold">お前の精神が3つの形を取っている</span>。
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            {characters.map((char) => (
                                <button
                                    key={char.id}
                                    onClick={() => setSelectedChar(char)}
                                    className="group bg-white border-2 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-xl text-left"
                                    style={{ borderColor: char.color + '40' }}
                                >
                                    <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                                        <img src={char.image} alt={char.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                                        {/* Essence Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span
                                                className="text-white text-xs font-bold px-3 py-1 rounded-full"
                                                style={{ backgroundColor: char.color }}
                                            >
                                                {char.essence}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold text-stone-800 mb-1 group-hover:text-amber-600 transition-colors">{char.name}</h2>
                                        <p className="text-stone-400 text-xs mb-3">{char.standType}</p>
                                        <p className="text-amber-600 text-sm italic mb-4">{char.catchphrase}</p>
                                        <p className="text-stone-500 text-sm mb-4 line-clamp-2">{char.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {char.skills.slice(0, 3).map((skill) => (
                                                <span key={skill} className="bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded">{skill}</span>
                                            ))}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Spiritual Relationship Diagram */}
                        <section className="text-center">
                            <h2 className="text-2xl font-bold text-stone-800 mb-8">精神の3つの側面</h2>
                            <div className="bg-gradient-to-br from-stone-50 to-amber-50/30 rounded-2xl p-8 border border-stone-200">
                                {/* Central Concept */}
                                <div className="mb-8">
                                    <div className="inline-block bg-white px-6 py-3 rounded-full border-2 border-amber-500 shadow-sm">
                                        <span className="text-stone-800 font-bold">お前の精神</span>
                                    </div>
                                </div>

                                {/* Three Aspects */}
                                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                                    {characters.map((char, index) => (
                                        <div key={char.id} className="text-center">
                                            {/* Connector */}
                                            {index > 0 && (
                                                <div className="hidden md:block absolute">
                                                    <span className="text-amber-500 text-2xl">+</span>
                                                </div>
                                            )}
                                            <div
                                                className="w-20 h-20 rounded-full overflow-hidden border-3 mx-auto mb-2"
                                                style={{ borderColor: char.color }}
                                            >
                                                <img src={char.image} alt={char.name} className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-stone-800 font-bold">{char.name}</p>
                                            <p className="text-xs mt-1" style={{ color: char.color }}>{char.essence}</p>
                                            <p className="text-stone-400 text-xs mt-1 max-w-[150px] mx-auto">
                                                {char.function?.deep}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <p className="mt-8 text-stone-500 text-sm">
                                    {STAND_RELATIONSHIP.meaning}
                                </p>
                            </div>
                        </section>
                    </>
                )}

                {/* Philosophy Tab */}
                {activeTab === 'philosophy' && (
                    <section>
                        <div className="text-center mb-12">
                            <h2 className="text-2xl font-bold text-stone-800 mb-4">内装 × 意識</h2>
                            <p className="text-stone-500 max-w-2xl mx-auto">
                                「ニュースにコメントする」じゃない。<br />
                                「内装を通じて、人間の意識を探求する」<br />
                                <span className="text-amber-600">これがイワサキ内装にしかできないこと。</span>
                            </p>
                        </div>

                        {/* 4 Pillars */}
                        <div className="grid md:grid-cols-2 gap-8 mb-12">
                            {(Object.entries(CONTENT_PILLARS) as [string, typeof CONTENT_PILLARS.spatialPsychology][]).map(([key, pillar]) => (
                                <div
                                    key={key}
                                    className="bg-white rounded-2xl border border-stone-200 p-6 hover:border-amber-400 transition-colors"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                            <span className="text-amber-600 text-lg">
                                                {key === 'spatialPsychology' && '🏠'}
                                                {key === 'craftPath' && '🔨'}
                                                {key === 'materialPhilosophy' && '🌳'}
                                                {key === 'colorConsciousness' && '🎨'}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-stone-800">{pillar.name}</h3>
                                            <p className="text-stone-400 text-xs">{pillar.nameEn}</p>
                                        </div>
                                    </div>

                                    <p className="text-stone-600 text-sm mb-4">{pillar.description}</p>

                                    {/* Contrast */}
                                    <div className="bg-stone-50 rounded-lg p-4 mb-4">
                                        <div className="mb-2">
                                            <span className="text-stone-400 text-xs">普通：</span>
                                            <p className="text-stone-500 text-sm line-through">{pillar.contrast.ordinary}</p>
                                        </div>
                                        <div>
                                            <span className="text-amber-600 text-xs">イワサキ：</span>
                                            <p className="text-stone-700 text-sm font-medium">{pillar.contrast.iwasaki}</p>
                                        </div>
                                    </div>

                                    {/* 3 Perspectives */}
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                                <img src={STANDS.corkJijii.appearance.avatar} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-xs text-stone-500 italic">&ldquo;{pillar.perspectives.corkJijii}&rdquo;</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                                <img src={STANDS.takumi.appearance.avatar} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-xs text-stone-500 italic">&ldquo;{pillar.perspectives.takumi}&rdquo;</p>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                                                <img src={STANDS.anya.appearance.avatar} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <p className="text-xs text-stone-500 italic">&ldquo;{pillar.perspectives.anya}&rdquo;</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Site Philosophy Quote */}
                        <div className="text-center bg-gradient-to-br from-stone-900 to-stone-800 rounded-2xl p-8 text-white">
                            <p className="text-2xl md:text-3xl font-light mb-4">
                                「{SITE_PHILOSOPHY.headline}」
                            </p>
                            <p className="text-stone-400 text-sm max-w-xl mx-auto">
                                {SITE_PHILOSOPHY.workEssence.chain.join(' → ')}
                            </p>
                            <p className="text-amber-400 font-bold mt-4">
                                {SITE_PHILOSOPHY.workEssence.conclusion}
                            </p>
                        </div>
                    </section>
                )}

                {/* Roundtable Tab */}
                {activeTab === 'roundtable' && (
                    <section>
                        <div className="mb-8 rounded-2xl overflow-hidden border border-stone-200">
                            <img src={IMAGES.roundtable} alt="IWASAKI CREW 座談会" className="w-full h-auto" />
                        </div>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-stone-800">CREW座談会</h2>
                            <p className="text-stone-500 mt-2">AIタクミ × アーニャ × コルクじじい</p>
                        </div>
                        <div className="space-y-4 max-w-3xl mx-auto">
                            {roundtableConversation.map((entry, index) => (
                                <div key={index} className={`flex gap-4 ${entry.speaker === 'アーニャ' ? 'flex-row-reverse' : ''}`}>
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-stone-300">
                                            <img src={entry.avatar} alt={entry.speaker} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className={`flex-1 ${entry.speaker === 'アーニャ' ? 'text-right' : ''}`}>
                                        <p className="text-xs text-amber-600 mb-1">{entry.speaker}</p>
                                        <div className={`inline-block p-4 rounded-2xl max-w-md ${entry.speaker === 'コルクじじい' ? 'bg-amber-50 text-amber-900 border border-amber-200'
                                            : entry.speaker === 'アーニャ' ? 'bg-blue-50 text-blue-900 border border-blue-200'
                                                : 'bg-stone-100 text-stone-700 border border-stone-200'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{entry.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <div className="inline-block bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 px-8 py-6 rounded-2xl border border-amber-300">
                                <p className="text-stone-500 text-sm mb-2">コルクじじいの決め台詞</p>
                                <p className="text-2xl md:text-3xl font-bold text-amber-600">「だって俺の床、コルクなんだもん！」</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Stickers Tab */}
                {activeTab === 'stickers' && (
                    <section>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-stone-800">IWASAKI CREWスタンプ集</h2>
                            <p className="text-stone-500 mt-2">使いたい人はご自由にどうぞ（使う場面があるかは謎）</p>
                        </div>

                        {/* Cork Jijii Stickers */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                                <img src={IMAGES.corkJijii} alt="コルクじじい" className="w-8 h-8 rounded-full" />
                                コルクじじい
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {STICKERS.corkJijii.map((sticker) => (
                                    <div key={sticker.name} className="bg-white rounded-xl p-4 border border-stone-200 text-center hover:border-amber-400 transition-colors">
                                        <img src={sticker.url} alt={sticker.name} className="w-full aspect-square object-contain mb-2 rounded-lg" />
                                        <p className="text-stone-800 font-bold text-sm">{sticker.name}</p>
                                        <p className="text-stone-500 text-xs mt-1">{sticker.usage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Takumi Stickers */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-amber-600 mb-4 flex items-center gap-2">
                                <img src={IMAGES.takumi} alt="AIタクミ" className="w-8 h-8 rounded-full" />
                                AIタクミ
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {STICKERS.takumi.map((sticker) => (
                                    <div key={sticker.name} className="bg-white rounded-xl p-4 border border-stone-200 text-center hover:border-amber-400 transition-colors">
                                        <img src={sticker.url} alt={sticker.name} className="w-full aspect-square object-contain mb-2 rounded-lg" />
                                        <p className="text-stone-800 font-bold text-sm">{sticker.name}</p>
                                        <p className="text-stone-500 text-xs mt-1">{sticker.usage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tile Ojisan (Rival) */}
                        <div className="mb-12">
                            <h3 className="text-lg font-bold text-stone-600 mb-4 flex items-center gap-2">
                                RIVAL: タイルおじさん
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {STICKERS.tileOjisan.map((sticker) => (
                                    <div key={sticker.name} className="bg-white rounded-xl p-4 border border-stone-200 text-center hover:border-stone-400 transition-colors">
                                        <img src={sticker.url} alt={sticker.name} className="w-full aspect-square object-contain mb-2 rounded-lg" />
                                        <p className="text-stone-800 font-bold text-sm">{sticker.name}</p>
                                        <p className="text-stone-500 text-xs mt-1">{sticker.usage}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Back Link */}
                <div className="text-center mt-12">
                    <Link href="/" className="text-amber-600 hover:text-amber-500 transition-colors">← ホームに戻る</Link>
                </div>
            </main>

            {/* Character Detail Modal */}
            {selectedChar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setSelectedChar(null)}>
                    <div className="bg-white rounded-2xl max-w-lg w-full border border-stone-200 shadow-xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
                        <div className="aspect-video relative">
                            <img src={selectedChar.image} alt={selectedChar.name} className="w-full h-full object-cover" />
                            <button onClick={() => setSelectedChar(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70">✕</button>
                        </div>
                        <div className="p-6">
                            <span className="text-amber-600 text-xs uppercase tracking-widest">{selectedChar.role}</span>
                            <h2 className="text-2xl font-bold text-stone-800 mt-1">{selectedChar.name}</h2>
                            <p className="text-amber-600 italic mt-2">{selectedChar.catchphrase}</p>
                            <p className="text-stone-600 mt-4">{selectedChar.description}</p>
                            <div className="flex flex-wrap gap-2 mt-4">
                                {selectedChar.skills.map((skill) => (
                                    <span key={skill} className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
