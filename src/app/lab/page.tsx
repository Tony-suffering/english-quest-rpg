'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { labEntries } from '@/data/lab'

const CORRECT_PASSWORD = 'thistoowillpass'

export default function LabPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === CORRECT_PASSWORD) {
            setShowSuccess(true)
            setTimeout(() => {
                localStorage.setItem('lab-auth', 'granted')
                setIsAuthenticated(true)
            }, 1500)
        } else {
            setError(true)
            setPassword('')
            setTimeout(() => setError(false), 2000)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('lab-auth')
        setIsAuthenticated(false)
        setShowSuccess(false)
    }

    // パスワード成功のトランジション
    if (showSuccess && !isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] flex items-center justify-center">
                        <span className="text-white text-3xl">✓</span>
                    </div>
                    <p className="text-2xl font-serif text-[#252423]">This too shall pass</p>
                    <p className="text-[#D4AF37] tracking-widest text-sm mt-2">ようこそ...</p>
                </motion.div>
            </div>
        )
    }

    // ========================================
    // パスワード入力後 → 非公開コンテンツ
    // ========================================
    if (isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-[#F5F3F0] flex flex-col">
                <Header />
                <main className="flex-1 py-20 px-6">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-16"
                        >
                            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                                Private Content
                            </span>
                            <h1 className="text-3xl font-serif text-[#252423] mt-4 mb-4">
                                非公開の記事
                            </h1>
                            <p className="text-[#252423]/60 leading-relaxed">
                                ここにあるものは、表には出せない。<br />
                                でも、消すこともできなかった。
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {labEntries.map((entry, index) => (
                                <motion.div
                                    key={entry.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                >
                                    <Link
                                        href={`/lab/${entry.id}`}
                                        className="block bg-white border border-[#DAE2E8] p-8 hover:border-[#D4AF37] hover:shadow-lg transition-all group"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-[10px] uppercase tracking-[0.15em] text-red-500 font-bold px-2 py-1 bg-red-50 rounded-sm">
                                                Private
                                            </span>
                                            <span className="text-[10px] uppercase tracking-[0.15em] text-[#252423]/40">
                                                {entry.date}
                                            </span>
                                            <span className="text-[10px] uppercase tracking-[0.15em] text-[#252423]/40">
                                                {entry.readTime}分
                                            </span>
                                        </div>
                                        <h2 className="text-xl font-serif text-[#252423] mb-3 group-hover:text-[#B8860B] transition-colors">
                                            {entry.title}
                                        </h2>
                                        <p className="text-[#252423]/60 text-sm leading-relaxed mb-4">
                                            {entry.summary}
                                        </p>
                                        <span className="text-[#D4AF37] text-sm font-medium group-hover:underline underline-offset-4">
                                            読む →
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-16 text-center"
                        >
                            <p className="text-[#252423]/40 text-sm italic mb-8">
                                "This too shall pass"<br />
                                良いことも悪いことも、全部通り過ぎる。
                            </p>
                            <button
                                onClick={handleLogout}
                                className="text-[#D4AF37] text-sm hover:underline underline-offset-4"
                            >
                                ← 戻る
                            </button>
                        </motion.div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    // ========================================
    // パスワード入力前 → 全コンテンツ公開
    // ========================================
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-[#F5F3F0] flex flex-col">
            <Header />

            <main className="flex-1 pt-12 pb-24 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16 pt-12"
                    >
                        <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold">
                            Behind the Scenes // 2026
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif text-[#252423] mt-4 mb-6">
                            IWASAKI <span className="text-[#D4AF37]">LAB</span>
                        </h1>
                        <p className="text-[#252423]/60 font-light max-w-xl mx-auto leading-relaxed">
                            このサイトを作った記録。AIと人間の共同作業。<br className="hidden md:block" />
                            全部公開する。隠すものはない。
                        </p>
                    </motion.div>

                    {/* ビジネス計画 */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                            <h2 className="text-sm uppercase tracking-[0.2em] text-[#252423]/50 font-bold">
                                現在の注力領域
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <ProjectCard
                                title="HP制作ビジネスの可能性"
                                status="探索中"
                                category="事業開発"
                                description={`内装職人がIT領域に参入する実験。このウェブサイト自体がポートフォリオであり、証明でもある。

問い：
・内装業界の顧客は、どんなデジタル体験を求めているか？
・他の職人ビジネスにこのアプローチは横展開できるか？
・AIを活用したHP制作の価値提案は何か？

仮説：
中小の建設・リフォーム会社は、大手制作会社に依頼する予算がない。しかし「同業者が作った」という信頼と、業界知識を活かしたコンテンツ設計には価値がある。`}
                            />
                            <ProjectCard
                                title="職人技術のデジタル継承"
                                status="構想段階"
                                category="社会課題"
                                description={`2025年問題：建設業界で90万人の人材不足が予測されている。55歳以上が36%、29歳以下が12%。技術の継承が途絶えるリスク。

構想：
・熟練職人の動きをAIで解析し、教育コンテンツ化
・VR/ARを使った施工トレーニング
・暗黙知の言語化とマニュアル自動生成

障壁：
・職人文化の「見て覚えろ」という価値観との衝突
・投資対効果の証明が困難
・導入側のITリテラシー`}
                            />
                        </div>
                    </motion.section>

                    {/* 進行中の実験 */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <h2 className="text-sm uppercase tracking-[0.2em] text-[#252423]/50 font-bold">
                                進行中の実験
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <ExperimentRow name="MEMORIA" type="プロダクト" status="開発中" description="AIと対話しながら家族の記憶を記録するアプリ。日記を超えた「記憶のアーカイブ」。" />
                            <ExperimentRow name="CORK JIJII TV" type="コンテンツ" status="運用中" description="AIキャラクター「コルクじじい」による24時間放送。常夜灯として、誰も見ていなくても喋り続ける。" />
                            <ExperimentRow name="AI×内装コンサル" type="サービス" status="検証中" description="GPTベースの内装相談ボット。顧客の「なんとなく」を言語化し、具体的な提案に変換する。" />
                            <ExperimentRow name="職人×哲学コンテンツ" type="メディア" status="実験中" description="エックハルト・トール、パチンコ、瞑想。一見無関係なテーマを職人の視点で繋げる思考実験。" />
                        </div>
                    </motion.section>

                    {/* ビジネス仮説 */}
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-2 h-2 rounded-full bg-amber-500" />
                            <h2 className="text-sm uppercase tracking-[0.2em] text-[#252423]/50 font-bold">
                                検証中のビジネス仮説
                            </h2>
                        </div>

                        <div className="bg-white border border-[#DAE2E8] p-8 md:p-10">
                            <div className="space-y-8">
                                <HypothesisBlock number="01" hypothesis="内装業者による同業者向けHP制作は、制作会社よりも信頼される" evidence="このサイトを見た同業者からの問い合わせ実績（2件）" nextStep="5社へのヒアリング実施" />
                                <HypothesisBlock number="02" hypothesis="哲学的コンテンツは、価格競争から脱却するブランド差別化になる" evidence="ブログ記事の滞在時間が通常の3倍" nextStep="コンバージョンとの相関分析" />
                                <HypothesisBlock number="03" hypothesis="AIキャラクターは、企業の「顔」として機能する" evidence="コルクじじいへの反応（SNSでの言及）" nextStep="商談での効果測定" />
                            </div>
                        </div>
                    </motion.section>

                    {/* 区切り線 */}
                    <div className="border-t-2 border-[#D4AF37]/30 my-20 pt-20">
                        <h2 className="text-3xl font-serif text-[#252423] text-center mb-4">制作記録</h2>
                        <p className="text-center text-[#252423]/50 text-sm">このサイトができるまで</p>
                    </div>

                    {/* 作ったもの */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">作ったもの</h2>
                        <div className="space-y-8">
                            <ContentBlock title="このウェブサイト全体" description="Next.js 14、TypeScript、Tailwind CSS、Framer Motion。Vercelにデプロイ。Cloudflare Imagesで画像管理。ゼロから作った。テンプレートは使っていない。" />
                            <ContentBlock title="AIキャラクター3体" description="コルクじじい（コルク床への異常な愛）、AIタクミ（真面目な職人AI）、アーニャ（ツンデレ系）。それぞれの「魂」を定義した。" />
                            <ContentBlock title="Cork Jijii TV" description="/cork にある24時間放送システム。天気API、ニュースAPI、ジャーナルからコンテンツを自動生成。誰も見てなくても喋り続ける「常夜灯」。" />
                            <ContentBlock title="ブログ/インサイト記事40本以上" description="パチンコと瞑想、エックハルト・トール、5-MeO-DMT研究、材料メーカー分析、「会社とは何か」、職人の技術継承問題。" />
                        </div>
                    </motion.section>

                    {/* 学んだこと */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">学んだこと</h2>
                        <div className="space-y-6">
                            <LearningCard number="01" title="AIはコードを書ける。でも判断はできない。" content="方向性を決めるのは人間の仕事。AIは手足であって、頭脳じゃない。" />
                            <LearningCard number="02" title="「しょぼい」と言われたら、本当にしょぼい" content="人間のフィードバックは正確。素直に聞くべき。" />
                            <LearningCard number="03" title="デザインの「なんか違う」は説明が難しい" content="言語化できない感覚がデザインの本質。イテレーションするしかない。" />
                            <LearningCard number="04" title="コンテンツは量より深さ" content="浅い記事を100本より、深い記事を10本。" />
                            <LearningCard number="05" title="哲学は差別化になる" content="エックハルト・トールを読む内装屋は他にいない。ニッチは強い。" />
                        </div>
                    </motion.section>

                    {/* 失敗したこと */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">失敗したこと</h2>
                        <div className="bg-amber-50/50 border border-amber-200/50 p-8">
                            <ul className="space-y-4 text-[#252423]/80">
                                <li className="flex items-start gap-3"><span className="text-amber-600 mt-1">✗</span><p><strong>最初のラボページ</strong> — ハッカー映画風のターミナルUI。「子供のおもちゃ」と言われた。全部作り直し。</p></li>
                                <li className="flex items-start gap-3"><span className="text-amber-600 mt-1">✗</span><p><strong>職人記事の最初のバージョン</strong> — 内容がぬるかった。「職人」という言葉自体を問い直す記事に書き換えた。</p></li>
                                <li className="flex items-start gap-3"><span className="text-amber-600 mt-1">✗</span><p><strong>バックティックのエスケープ</strong> — TypeScriptの構文エラーを3回やり直した。</p></li>
                                <li className="flex items-start gap-3"><span className="text-amber-600 mt-1">✗</span><p><strong>ジャーナルエントリの削除ミス</strong> — ファイル全体を壊した。gitで復元。</p></li>
                            </ul>
                        </div>
                    </motion.section>

                    {/* 数字 */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">数字で見る</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <StatCard label="作業期間" value="約1ヶ月" />
                            <StatCard label="コミット数" value="200+" />
                            <StatCard label="ブログ記事" value="40本以上" />
                            <StatCard label="コード行数" value="50,000+" />
                            <StatCard label="生成した画像" value="100枚以上" />
                            <StatCard label="AIキャラ" value="3体" />
                            <StatCard label="失敗した試み" value="数え切れない" />
                            <StatCard label="やり直し回数" value="無限" />
                        </div>
                    </motion.section>

                    {/* 思想 */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">このサイトの思想</h2>
                        <div className="bg-gradient-to-br from-amber-50 via-[#FAF9F7] to-amber-100/30 border-2 border-[#D4AF37]/20 p-8 md:p-10">
                            <div className="font-serif text-lg leading-relaxed space-y-6 text-[#252423]/80">
                                <p>内装工事のサイトに、なぜ瞑想やパチンコの話があるのか。普通はない。SEOに効かないし、集客にもならない。でも、これは意図的だ。</p>
                                <p className="text-[#B8860B] font-bold text-xl">「この会社は他と違う」と思わせる。それが目的。</p>
                                <p>価格で競争したら負ける。だから「何を考えているか」で勝負する。「変な会社だな」と思う人もいるだろう。でも「面白い会社だな」と思う人もいる。後者だけを狙っている。</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* ========== 新しいセクション開始 ========== */}

                    {/* 区切り線 */}
                    <div className="border-t-2 border-[#D4AF37]/30 my-20 pt-20">
                        <h2 className="text-3xl font-serif text-[#252423] text-center mb-4">この人について</h2>
                        <p className="text-center text-[#252423]/50 text-sm">壁紙職人が哲学とAIに溺れた理由</p>
                    </div>

                    {/* 人物像 */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">人物像</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-white border border-[#DAE2E8] p-6">
                                    <h3 className="text-lg font-serif text-[#252423] mb-3">表の顔</h3>
                                    <ul className="text-[#252423]/70 space-y-2 text-sm">
                                        <li>・有限会社イワサキ内装 代表</li>
                                        <li>・壁紙職人歴20年以上</li>
                                        <li>・東京都墨田区在住</li>
                                        <li>・家族4人（妻、長男8歳、長女5歳）+ 柴犬</li>
                                        <li>・見積もりを書いて、壁紙を貼る</li>
                                    </ul>
                                </div>
                                <div className="bg-white border border-[#DAE2E8] p-6">
                                    <h3 className="text-lg font-serif text-[#252423] mb-3">裏の顔</h3>
                                    <ul className="text-[#252423]/70 space-y-2 text-sm">
                                        <li>・エックハルト・トールを読む内装屋</li>
                                        <li>・アジャシャンティを聴きながら荒川を歩く</li>
                                        <li>・マーティン・ボールの5-MeO-DMT研究に興味</li>
                                        <li>・AIとコードを書きながら自分を罵倒する</li>
                                        <li>・正月にパチンコ駐車場で夕焼けを見る</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-amber-50 to-[#FAF9F7] border border-[#DAE2E8] p-6">
                                <h3 className="text-lg font-serif text-[#252423] mb-4">自己診断</h3>
                                <div className="space-y-4 text-[#252423]/70 text-sm leading-relaxed">
                                    <p>2025年の始まり、「存在すること」に疲れていた。</p>
                                    <p>正確に言うと、「自分」という概念を維持することへの疲弊。「岩崎」という看板を背負うことの重さ。「経営者」「職人」「夫」「父」という役割を演じ続けることへの虚脱。</p>
                                    <p>仏教が言う「生老病死」——人間存在のデフォルトは「苦」である。それを頭では理解していた。でも、体が理解していなかった。</p>
                                    <p className="text-[#B8860B] font-bold">年末には、「存在したくない」から「存在することを許した」に変わった。</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* 哲学的探求 */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">哲学的探求</h2>
                        <div className="space-y-8">
                            <PhilosophyCard
                                name="アジャシャンティ"
                                source="『Falling into Grace』"
                                quote="The door to God is the insecurity of not knowing anything."
                                translation="神への扉は、何も知らないという不安定さの中にある。"
                                insight="『知っている』ことにしがみついていた。内装のプロ、ビジネスがわかる、人生の苦しみを理解している。その『知っている』が、俺を締め付けていた。"
                            />
                            <PhilosophyCard
                                name="マーティン・ボール"
                                source="YouTubeインタビュー"
                                quote="Human wants to get out. God wants to get in."
                                translation="人間は出ていきたがる。神は入ってきたがる。"
                                insight="俺は『逃げたかった』。この体から、この人生から、この苦しみから。でも、何かが『入ってきたがっている』。ベクトルが逆なんだ。"
                            />
                            <PhilosophyCard
                                name="ラマナ・マハルシ"
                                source="Self-Inquiry"
                                quote="Who am I?"
                                translation="私は誰か？"
                                insight="神経伝達物質（扁桃体、ドーパミン）？それとも思考・過去・未来（エゴ）？両方を否定したとき、何が残るのか。『観測者』としての『意識』。答えは出ていない。でも、問い続けることに意味がある。"
                            />
                        </div>
                    </motion.section>

                    {/* パチンコと瞑想 */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">パチンコと瞑想</h2>
                        <div className="bg-white border border-[#DAE2E8] p-8">
                            <div className="space-y-6 text-[#252423]/80">
                                <p className="text-lg font-serif">「パチンコなんて時間の無駄だ」と言う人がいる。</p>
                                <p>その批判は正しい。でも、表面的だ。</p>
                                <p className="bg-amber-50 border-l-4 border-[#D4AF37] p-4 italic">
                                    パチンコは「意図的な脳機能停止」ではない。<br />
                                    「過剰な情報処理からの、緊急脱出（Emergency Eject）」だ。
                                </p>
                                <p>6時間AIと格闘した後。脳がオーバーヒートしている。「判断」というCPUが焼き切れそうだ。</p>
                                <p>そこで俺は、エマージェンシーイジェクトする。パチンコ駐車場へ。打ったわけじゃない。ただ、車の中で駐車場にいただけだ。</p>
                                <p className="text-[#B8860B] font-bold text-lg">これが「中道」だ。肯定も否定もしない。ただ、宙吊りになる。</p>
                                <p className="text-sm text-[#252423]/50">※ 正月に一人でパチンコ駐車場で夕焼けを見ていた男より</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* AIへの本音 */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">AIへの本音</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white border border-[#DAE2E8] p-6">
                                <h3 className="text-lg font-serif text-[#252423] mb-4">皆が想像するAI開発</h3>
                                <ul className="text-[#252423]/70 space-y-2 text-sm">
                                    <li>「AIさん、アプリ作って」</li>
                                    <li>「はい、完璧なアプリです」</li>
                                    <li>「すごい！天才！」</li>
                                </ul>
                            </div>
                            <div className="bg-amber-50 border border-amber-200 p-6">
                                <h3 className="text-lg font-serif text-[#252423] mb-4">現実のAI開発</h3>
                                <ul className="text-[#252423]/70 space-y-2 text-sm">
                                    <li>「これ違う」</li>
                                    <li>「まだ違う」</li>
                                    <li>「なんかダサい」</li>
                                    <li>「UI完成したとか寝ぼけてんの？」</li>
                                    <li>「もっと　中途半端でやめんな」</li>
                                    <li>（6時間経過）</li>
                                    <li>「...まあいいか」</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 bg-gradient-to-br from-amber-50 to-[#FAF9F7] border-2 border-[#D4AF37]/20 p-8">
                            <p className="text-[#252423]/80 mb-4">AIは便利だ。でも、すごくはない。<strong>「過去の平均値」を返すだけ。</strong></p>
                            <p className="text-[#252423]/80 mb-4">俺が求めているのは「まだ誰も見たことがないもの」。その差を埋めるのは、俺の仕事だ。</p>
                            <p className="text-[#B8860B] font-bold">AIに文句を言っても意味がない。俺の「問い」の質を上げるしかない。</p>
                        </div>
                    </motion.section>

                    {/* 家族とMEMORIA */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">家族とMEMORIA</h2>
                        <div className="bg-white border border-[#DAE2E8] p-8 mb-8">
                            <p className="text-[#252423]/80 mb-6">正月に6時間かけて「MEMORIA」という家族の記憶アプリのプロトタイプを作った。おせちも食べずに。親戚の集まりをサボって。</p>
                            <h3 className="text-lg font-serif text-[#252423] mb-4">設定した6ペルソナ</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <PersonaCard name="俺" role="自分" />
                                <PersonaCard name="ママ" role="妻" />
                                <PersonaCard name="ばあば" role="母" />
                                <PersonaCard name="ユウタ" role="長男8歳" />
                                <PersonaCard name="ミナ" role="長女5歳" />
                                <PersonaCard name="健太" role="友人" />
                            </div>
                        </div>
                        <div className="bg-amber-50/50 border border-amber-200/50 p-8">
                            <h3 className="text-lg font-serif text-[#252423] mb-4">子どもの投稿が一番良かった</h3>
                            <div className="space-y-4 text-[#252423]/70 text-sm italic">
                                <p>ユウタ（8歳）: 「じいじからもらった！たくさんあった！ぜんぶで1まんえん！すごい！ポケモンカードかう！」</p>
                                <p>ミナ（5歳）: 「にいにがずるい。わたしのほしいのとった。でもばあばがおかしくれた。」</p>
                            </div>
                            <p className="text-[#252423]/80 mt-6">純粋。直接的。感情がそのまま。大人になると、余計な意味を付け足してしまう。「賑やかさの中にある疲労と、それでも『この時間は二度と戻らない』という自覚」とか言い出す。<strong>うるせえよ。</strong>お年玉もらって嬉しい。それでいい。</p>
                        </div>
                    </motion.section>

                    {/* 材料メーカーへの敬意 */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">材料メーカーへの敬意</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <MakerCard name="サンゲツ" insight="「バイオクロス」がグッドデザイン賞。環境に良いだけじゃダメ。使いやすさも必要。両方を実現した技術力。" />
                            <MakerCard name="リリカラ" insight="中堅だからこそできる機動力。デジタルプリント壁紙の可能性。挑戦者の魂がある。" />
                            <MakerCard name="東リ" insight="床材の王者がなぜ壁紙も作るのか。ファブリックフロアという革命。「貼る」から「敷く」への発想転換。" />
                        </div>
                        <p className="text-center text-[#252423]/50 text-sm mt-8">どのメーカーも「魂」を持っている。大事なのは、その魂が自分の魂と共鳴するかどうか。</p>
                    </motion.section>

                    {/* 壁紙を貼るということ */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mb-20">
                        <h2 className="text-2xl font-serif text-[#252423] mb-8 border-b border-[#DAE2E8] pb-4">壁紙を貼るということ</h2>
                        <div className="bg-gradient-to-br from-amber-50 via-[#FAF9F7] to-amber-100/30 border-2 border-[#D4AF37]/20 p-8 md:p-10">
                            <div className="font-serif text-lg leading-relaxed space-y-6 text-[#252423]/80">
                                <p>結局、俺は壁紙職人だ。1年間、哲学やAIに溺れていたけど、最後に残るのは——壁紙を貼るという行為。</p>
                                <p>マーティン・ボールが言った「サレンダー（明け渡し）」。アジャシャンティが言った「Falling（落ちること）」。これは、壁紙を貼るときの「力の抜き方」と同じだ。</p>
                                <p>力を入れすぎると、シワになる。ヘラを押しすぎると、紙が破れる。</p>
                                <p className="text-[#B8860B] font-bold text-xl">ちょうどいい力加減は、「コントロールと手放しの間」にある。</p>
                                <p>サレンダーしすぎたら、壁紙はズレる。コントロールしすぎたら、壁紙は破れる。その間。人生もそうなんだと思う。</p>
                            </div>
                        </div>
                    </motion.section>

                    {/* ========== 新しいセクション終了 ========== */}

                    {/* IWASAKI AI STUDIO セクション */}
                    <div className="border-t-2 border-[#D4AF37]/30 my-20 pt-20">
                        <h2 className="text-3xl font-serif text-[#252423] text-center mb-4">
                            IWASAKI <span className="text-[#D4AF37]">AI STUDIO</span>
                        </h2>
                        <p className="text-center text-[#252423]/50 text-sm mb-2">Google Colab Pro (A100 40GB) で生成</p>
                        <p className="text-center text-[#D4AF37] text-xs">「どうせうまくいかない」— でもやる</p>
                    </div>

                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="mb-20">
                        {/* ステータス */}
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-green-600 text-sm">A100 GPU: 40GB VRAM</span>
                            </div>
                        </div>



                        {/* 生成済み画像ギャラリー */}
                        <div className="mb-8">
                            <h3 className="text-lg font-serif text-[#252423] mb-4 text-center">生成済み作品</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* ジャーナル057のドラゴン */}
                                <div className="aspect-square relative overflow-hidden rounded-lg border border-[#DAE2E8] group">
                                    <img
                                        src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/664066c9-a884-4bf8-e9ed-a4cd72115700/public"
                                        alt="AI生成ドラゴン"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <p className="text-white text-xs">Epic Dragon - Fooocus</p>
                                    </div>
                                </div>
                                {/* 猫 */}
                                <div className="aspect-square relative overflow-hidden rounded-lg border border-[#DAE2E8] group">
                                    <img
                                        src="https://imagedelivery.net/k1Zw56y2FNiZaFcOP7Rs2Q/ffc61a0b-afc7-4dbd-ad39-1a1427ee1400/public"
                                        alt="AI生成猫"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <p className="text-white text-xs">Cat - 初生成</p>
                                    </div>
                                </div>
                                {/* プレースホルダー */}
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="aspect-square bg-[#FAF9F7] border border-[#DAE2E8] rounded-lg flex flex-col items-center justify-center">
                                        <div className="w-8 h-8 border-2 border-[#D4AF37]/30 rounded-full" />
                                        <p className="text-[#252423]/30 text-xs mt-2">Next #{i}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 使い方 */}
                        <div className="bg-gradient-to-br from-amber-50 to-[#FAF9F7] border border-[#DAE2E8] p-6 md:p-8 rounded-lg">
                            <h3 className="text-lg font-serif text-[#252423] mb-4">クイックスタート</h3>
                            <div className="grid md:grid-cols-4 gap-4 text-sm">
                                <div className="bg-white p-4 rounded-lg border border-[#DAE2E8]">
                                    <p className="text-[#D4AF37] font-bold mb-2">01</p>
                                    <p className="font-bold text-[#252423]">Colab Pro契約</p>
                                    <p className="text-[#252423]/60 text-xs mt-1">月1,200円でA100使い放題</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-[#DAE2E8]">
                                    <p className="text-[#D4AF37] font-bold mb-2">02</p>
                                    <p className="font-bold text-[#252423]">ノートブック開く</p>
                                    <p className="text-[#252423]/60 text-xs mt-1">上の「Colabで開く」をクリック</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-[#DAE2E8]">
                                    <p className="text-[#D4AF37] font-bold mb-2">03</p>
                                    <p className="font-bold text-[#252423]">セル実行</p>
                                    <p className="text-[#252423]/60 text-xs mt-1">上から順番に実行するだけ</p>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-[#DAE2E8]">
                                    <p className="text-[#D4AF37] font-bold mb-2">04</p>
                                    <p className="font-bold text-[#252423]">生成 & 保存</p>
                                    <p className="text-[#252423]/60 text-xs mt-1">Cloudflare or Driveに保存</p>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* パスワード入力エリア */}
                    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }} className="mb-20">
                        <div className="bg-white border-2 border-[#D4AF37]/30 p-8 md:p-12 max-w-lg mx-auto">
                            <div className="text-center mb-8">
                                <p className="text-sm text-[#252423]/50 mb-2">ここまで全部公開した。</p>
                                <p className="text-lg font-serif text-[#252423]">でも、もっと見たい？</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <input
                                        ref={inputRef}
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`w-full bg-[#FAF9F7] border ${error ? 'border-red-400' : 'border-[#DAE2E8]'} 
                                            text-[#252423] text-lg py-4 px-5 focus:outline-none focus:border-[#D4AF37]
                                            transition-colors placeholder:text-[#252423]/30 font-serif tracking-wider text-center`}
                                        placeholder="パスワードを入力"
                                        autoComplete="off"
                                    />
                                    <AnimatePresence>
                                        {error && (
                                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-red-500 text-sm mt-3 text-center">
                                                違います
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white py-4 
                                        text-sm font-bold tracking-[0.2em] uppercase shadow-md"
                                >
                                    入る
                                </motion.button>
                            </form>
                        </div>
                    </motion.section>

                    {/* フッター */}
                    <div className="text-center text-[#252423]/30 text-xs border-t border-[#DAE2E8] pt-8 space-y-4">
                        <p className="bg-amber-50 border border-amber-200/50 px-4 py-3 inline-block text-[#252423]/50">
                            ⚠️ このページに登場する「壁紙職人」「父」「哲学者」は架空のキャラクターです。<br />
                            実在の人物・団体とは一切関係ありません。（笑）
                        </p>
                        <p>© 2026 IWASAKI LAB — Built by Human + AI</p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

// コンポーネント

function ProjectCard({ title, status, category, description }: { title: string; status: string; category: string; description: string }) {
    const categoryIcons: { [key: string]: string } = {
        '事業開発': '🚀',
        '社会課題': '🌍',
        'プロダクト': '⚡',
        'コンテンツ': '📺',
        'サービス': '🛠️',
        'メディア': '📖'
    }
    return (
        <div className="group relative bg-gradient-to-br from-white via-white to-amber-50/30 border border-[#DAE2E8] p-6 md:p-8 hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300 overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent" />

            <div className="relative">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">{categoryIcons[category] || '📋'}</span>
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#D4AF37] font-bold px-2 py-1 bg-[#D4AF37]/10 rounded-sm">{category}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#252423]/40 font-bold bg-[#252423]/5 px-2 py-1 rounded-sm">{status}</span>
                </div>
                <h3 className="text-xl font-serif text-[#252423] mb-4 group-hover:text-[#B8860B] transition-colors">{title}</h3>
                <p className="text-[#252423]/60 text-sm leading-relaxed whitespace-pre-line">{description}</p>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    )
}

function ExperimentRow({ name, type, status, description, link }: { name: string; type: string; status: string; description: string; link?: string }) {
    const statusColors: { [key: string]: string } = { '開発中': 'text-blue-600 bg-blue-50', '運用中': 'text-green-600 bg-green-50', '検証中': 'text-amber-600 bg-amber-50', '実験中': 'text-purple-600 bg-purple-50' }
    const content = (
        <div className={`bg-white border border-[#DAE2E8] p-5 md:p-6 ${link ? 'hover:border-[#D4AF37]/50 cursor-pointer' : ''} transition-colors`}>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-4 md:w-1/4">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-[#252423]/40 font-bold w-16">{type}</span>
                    <h4 className="font-serif text-[#252423] font-bold">{name}</h4>
                </div>
                <div className="flex-1"><p className="text-[#252423]/60 text-sm">{description}</p></div>
                <div className="flex items-center gap-4">
                    <span className={`text-[10px] uppercase tracking-[0.1em] font-bold px-2 py-1 ${statusColors[status] || 'text-gray-600 bg-gray-50'}`}>{status}</span>
                    {link && <span className="text-[#D4AF37]">→</span>}
                </div>
            </div>
        </div>
    )
    return link ? <Link href={link}>{content}</Link> : content
}

function HypothesisBlock({ number, hypothesis, evidence, nextStep }: { number: string; hypothesis: string; evidence: string; nextStep: string }) {
    return (
        <div className="border-l-2 border-[#D4AF37] pl-6">
            <span className="text-[#D4AF37] font-bold text-sm">仮説 {number}</span>
            <p className="text-[#252423] font-serif text-lg mt-2 mb-4">{hypothesis}</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div><span className="text-[#252423]/40 text-[10px] uppercase tracking-[0.1em] font-bold">現在のエビデンス</span><p className="text-[#252423]/70 mt-1">{evidence}</p></div>
                <div><span className="text-[#252423]/40 text-[10px] uppercase tracking-[0.1em] font-bold">次のアクション</span><p className="text-[#252423]/70 mt-1">{nextStep}</p></div>
            </div>
        </div>
    )
}

function ContentBlock({ title, description }: { title: string; description: string }) {
    return (
        <div className="border-l-2 border-[#D4AF37]/50 pl-6">
            <h3 className="text-xl font-serif text-[#252423] mb-3">{title}</h3>
            <p className="text-[#252423]/60 leading-relaxed whitespace-pre-line">{description}</p>
        </div>
    )
}

function LearningCard({ number, title, content }: { number: string; title: string; content: string }) {
    return (
        <div className="bg-white border border-[#DAE2E8] p-6">
            <div className="flex items-start gap-4">
                <span className="text-[#D4AF37] font-bold text-2xl font-serif">{number}</span>
                <div><h3 className="text-lg font-serif text-[#252423] mb-2">{title}</h3><p className="text-[#252423]/60 leading-relaxed">{content}</p></div>
            </div>
        </div>
    )
}

function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white border border-[#DAE2E8] p-4 text-center">
            <p className="text-2xl font-serif text-[#D4AF37] mb-1">{value}</p>
            <p className="text-[10px] uppercase tracking-widest text-[#252423]/50">{label}</p>
        </div>
    )
}

function PhilosophyCard({ name, source, quote, translation, insight }: {
    name: string; source: string; quote: string; translation: string; insight: string
}) {
    return (
        <div className="bg-white border border-[#DAE2E8] p-6 md:p-8">
            <div className="flex items-center gap-4 mb-4">
                <span className="text-[#D4AF37] font-bold">{name}</span>
                <span className="text-[#252423]/40 text-sm">{source}</span>
            </div>
            <blockquote className="border-l-4 border-[#D4AF37] pl-4 mb-4">
                <p className="text-[#252423] font-serif text-lg italic">&quot;{quote}&quot;</p>
                <p className="text-[#252423]/60 text-sm mt-2">{translation}</p>
            </blockquote>
            <p className="text-[#252423]/70 text-sm leading-relaxed">{insight}</p>
        </div>
    )
}

function PersonaCard({ name, role }: { name: string; role: string }) {
    return (
        <div className="bg-[#FAF9F7] border border-[#DAE2E8] p-4 text-center">
            <p className="text-lg font-serif text-[#252423] mb-1">{name}</p>
            <p className="text-[10px] uppercase tracking-widest text-[#252423]/50">{role}</p>
        </div>
    )
}

function MakerCard({ name, insight }: { name: string; insight: string }) {
    return (
        <div className="bg-white border border-[#DAE2E8] p-6">
            <h3 className="text-lg font-serif text-[#D4AF37] mb-3">{name}</h3>
            <p className="text-[#252423]/70 text-sm leading-relaxed">{insight}</p>
        </div>
    )
}
