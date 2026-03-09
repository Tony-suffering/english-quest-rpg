'use client'

import { useState } from 'react'
import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import Link from 'next/link'
import { Search, ChevronDown, ChevronRight, Phone, ArrowRight, Clock, Banknote, Wrench, HelpCircle, Home, Building2, Accessibility } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// 30年の経験から抽出した知識
const knowledgeCategories = [
  {
    id: 'wallpaper',
    title: '壁紙・クロス',
    icon: Home,
    description: '張替え時期、費用目安、選び方',
    questions: [
      {
        q: '壁紙の張替えはいくらかかりますか？',
        a: '6畳の部屋で約4〜8万円が目安です。内訳は材料費（壁紙代）と工賃。量産品クロスなら安く、機能性クロス（消臭・防カビ等）は高くなります。天井も含めるか、家具の移動が必要かで変動します。',
        keywords: ['壁紙 張替え 費用', '壁紙 張替え 6畳', 'クロス 張替え 相場'],
        priceRange: '4〜8万円/6畳',
        duration: '1日'
      },
      {
        q: '壁紙の張替え時期の目安は？',
        a: '一般的に10〜15年が目安です。ただし、タバコを吸う部屋は5〜7年、ペットがいる部屋も早めの交換をおすすめします。黄ばみ、剥がれ、カビが見えたら交換のサインです。',
        keywords: ['壁紙 張替え 時期', 'クロス 寿命', '壁紙 いつ替える'],
      },
      {
        q: '賃貸でも壁紙を変えられますか？',
        a: '大家さんの許可があれば可能です。最近は「貼って剥がせる壁紙」もあり、原状回復できるものも。退去時のことを考えて、事前に相談することをおすすめします。',
        keywords: ['賃貸 壁紙 張替え', '賃貸 クロス 変更'],
      },
      {
        q: '壁紙の上から壁紙を貼れますか？',
        a: '基本的には剥がしてから貼ります。上から貼ると、下の模様が浮き出たり、剥がれやすくなったりします。ただし、状態が良ければ上貼りできる場合もあります。現場を見て判断します。',
        keywords: ['壁紙 上から貼る', 'クロス 重ね貼り'],
      },
    ]
  },
  {
    id: 'flooring',
    title: '床・フローリング',
    icon: Home,
    description: '張替え、重ね貼り、材質の違い',
    questions: [
      {
        q: 'フローリングの張替え費用は？',
        a: '6畳で約10〜20万円が目安です。既存床を剥がすか、上から重ね貼りするかで大きく変わります。重ね貼りなら工期も短く、費用も抑えられます。',
        keywords: ['フローリング 張替え 費用', '床 張替え 6畳', 'フローリング 相場'],
        priceRange: '10〜20万円/6畳',
        duration: '1〜2日'
      },
      {
        q: 'クッションフロアとフローリングの違いは？',
        a: 'クッションフロア（CF）は塩ビシートで、水に強く安価（6畳で3〜6万円）。フローリングは木質で高級感があり、長持ちしますが水に弱い。キッチン・洗面所はCF、リビングはフローリングという使い分けが多いです。',
        keywords: ['クッションフロア フローリング 違い', 'CF 床材', '床材 選び方'],
        priceRange: 'CF: 3〜6万円 / フローリング: 10〜20万円',
      },
      {
        q: '床鳴りは直せますか？',
        a: '多くの場合、直せます。原因は下地の緩み、木材の乾燥収縮など様々。軽度なら部分補修で1〜3万円程度。重度なら張替えが必要になることも。まずは現場確認が必要です。',
        keywords: ['床鳴り 修理', 'フローリング きしみ', '床 音がする'],
        priceRange: '1〜3万円〜',
      },
    ]
  },
  {
    id: 'ceiling',
    title: '天井',
    icon: Building2,
    description: '天井クロス、塗装、高さの問題',
    questions: [
      {
        q: '天井の壁紙も張り替えられますか？',
        a: 'もちろん可能です。天井は壁より難易度が高く、工賃も1.5〜2倍程度かかります。6畳の天井で約3〜5万円が目安。壁と一緒にやると効率的でお得です。',
        keywords: ['天井 壁紙 張替え', '天井 クロス 費用'],
        priceRange: '3〜5万円/6畳',
      },
      {
        q: '天井のシミは消せますか？',
        a: '原因によります。雨漏りの場合はまず防水工事が先。結露によるカビなら、クロス張替えと換気改善で解決できることが多いです。',
        keywords: ['天井 シミ', '天井 カビ', '天井 汚れ'],
      },
    ]
  },
  {
    id: 'barrier-free',
    title: 'バリアフリー',
    icon: Accessibility,
    description: '手すり、段差解消、介護保険',
    questions: [
      {
        q: '介護保険でリフォームできますか？',
        a: '要介護・要支援認定を受けている方は、住宅改修費として最大20万円（自己負担1〜3割）が支給されます。手すり設置、段差解消、床材変更などが対象。事前申請が必要です。',
        keywords: ['介護保険 リフォーム', 'バリアフリー 補助金', '介護 住宅改修'],
        priceRange: '自己負担 2〜6万円（上限20万円工事の場合）',
      },
      {
        q: '手すりの取り付け費用は？',
        a: '1本あたり1〜3万円が目安です。廊下、トイレ、浴室などに設置することが多いです。下地の状態によって補強が必要な場合は追加費用がかかります。',
        keywords: ['手すり 取り付け 費用', '手すり 設置', 'バリアフリー 手すり'],
        priceRange: '1〜3万円/本',
        duration: '数時間〜半日'
      },
      {
        q: '段差をなくす工事はできますか？',
        a: '可能です。スロープ設置、敷居の撤去、床のかさ上げなど方法は様々。費用は1箇所2〜10万円程度。車椅子対応が必要な場合は、通路幅の確保も合わせて検討します。',
        keywords: ['段差解消 費用', 'バリアフリー 段差', '敷居 撤去'],
        priceRange: '2〜10万円/箇所',
      },
    ]
  },
  {
    id: 'shop',
    title: '店舗・オフィス',
    icon: Building2,
    description: '店舗内装、原状回復、営業中工事',
    questions: [
      {
        q: '店舗の内装工事はいくらかかりますか？',
        a: '業種と規模によって大きく異なります。10坪の飲食店で300〜800万円、物販で150〜400万円が目安。居抜き物件なら大幅に抑えられます。まずはコンセプトと予算をお聞かせください。',
        keywords: ['店舗 内装 費用', '店舗 内装工事 相場', '飲食店 内装'],
        priceRange: '150〜800万円/10坪',
      },
      {
        q: '営業しながら工事できますか？',
        a: '可能な場合が多いです。夜間・早朝工事、区画を分けての段階施工など、営業への影響を最小限にする方法をご提案します。ただし工期は長くなり、費用も割増になります。',
        keywords: ['営業中 工事', '店舗 リフォーム 営業しながら'],
      },
      {
        q: '原状回復工事とは？',
        a: 'テナント退去時に、入居前の状態に戻す工事です。壁・床の張替え、設備撤去、塗装など。契約書の原状回復条件を確認し、必要最小限の範囲をご提案します。',
        keywords: ['原状回復 費用', 'テナント 退去 工事', '原状回復工事'],
      },
    ]
  },
  {
    id: 'process',
    title: '工事の流れ',
    icon: Wrench,
    description: '見積もり、工期、準備すること',
    questions: [
      {
        q: '見積もりは無料ですか？',
        a: '無料です。現地調査も無料で行います。お見積り後のお断りも全く問題ありません。相見積もりも歓迎します。',
        keywords: ['内装 見積もり 無料', '内装工事 見積もり'],
      },
      {
        q: '工事中は家にいないといけませんか？',
        a: '基本的にはいなくても大丈夫です。鍵をお預かりするか、キーボックスを使用します。ただし、工事開始時と終了時の立ち会いをお願いしています。',
        keywords: ['リフォーム 立ち会い', '工事中 外出'],
      },
      {
        q: '家具は動かす必要がありますか？',
        a: '壁紙工事の場合、壁際の家具は移動が必要です。軽いものは当社で移動できますが、大型家具やピアノなどは事前に移動をお願いしています。追加料金で移動サービスも可能です。',
        keywords: ['リフォーム 家具 移動', '壁紙工事 準備'],
      },
      {
        q: '支払い方法は？',
        a: '工事完了後、請求書をお送りします。銀行振込（14日以内）が基本です。大規模工事の場合は、着手金をいただく場合があります。',
        keywords: ['内装工事 支払い', 'リフォーム 支払い方法'],
      },
    ]
  },
]

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>('wallpaper')
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set(['壁紙の張替えはいくらかかりますか？']))

  const toggleQuestion = (question: string) => {
    const newExpanded = new Set(expandedQuestions)
    if (newExpanded.has(question)) {
      newExpanded.delete(question)
    } else {
      newExpanded.add(question)
    }
    setExpandedQuestions(newExpanded)
  }

  // 検索フィルタリング
  const filteredCategories = knowledgeCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      searchQuery === '' ||
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.keywords?.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ヘッダー */}
      <section className="bg-[#252423] py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#D4AF37] text-xs uppercase tracking-widest font-medium">30 Years of Expertise</span>
          <h1 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4">
            内装の知識ベース
          </h1>
          <p className="text-white/70 text-sm md:text-base max-w-2xl mx-auto">
            30年の現場経験から、よくある疑問にお答えします。<br />
            費用目安、工期、選び方など、内装工事の「知りたい」をまとめました。
          </p>

          {/* 検索バー */}
          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="知りたいことを入力（例：壁紙 費用）"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-transparent focus:border-[#D4AF37] outline-none text-[#252423] placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* クイックリンク */}
      <section className="bg-stone-50 border-b border-stone-200 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {knowledgeCategories.map(category => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setExpandedCategory(category.id)
                    document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    expandedCategory === category.id
                      ? 'bg-[#252423] text-white'
                      : 'bg-white border border-stone-200 text-stone-600 hover:border-[#D4AF37] hover:text-[#D4AF37]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.title}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500">検索結果が見つかりませんでした</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 text-[#10B981] hover:underline"
            >
              検索をクリア
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredCategories.map(category => {
              const Icon = category.icon
              const isExpanded = expandedCategory === category.id

              return (
                <div key={category.id} id={category.id} className="scroll-mt-20">
                  {/* カテゴリヘッダー */}
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="w-full flex items-center justify-between p-4 bg-stone-50 border border-stone-200 hover:border-[#D4AF37] transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#252423] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h2 className="text-lg font-bold text-[#252423]">{category.title}</h2>
                        <p className="text-sm text-stone-500">{category.description}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-6 h-6 text-stone-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* 質問リスト */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-x border-b border-stone-200 divide-y divide-stone-100">
                          {category.questions.map((item, idx) => {
                            const isOpen = expandedQuestions.has(item.q)
                            return (
                              <div key={idx} className="bg-white">
                                <button
                                  onClick={() => toggleQuestion(item.q)}
                                  className="w-full flex items-start justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                                >
                                  <span className="font-medium text-[#252423] pr-4">{item.q}</span>
                                  <ChevronRight className={`w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                                </button>

                                <AnimatePresence>
                                  {isOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="px-4 pb-4">
                                        <div className="bg-stone-50 p-4 border-l-4 border-[#10B981]">
                                          <p className="text-[#252423]/80 text-sm leading-relaxed">
                                            {item.a}
                                          </p>

                                          {/* 価格・工期バッジ */}
                                          {(item.priceRange || item.duration) && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                              {item.priceRange && (
                                                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-xs font-medium px-3 py-1 rounded-full">
                                                  <Banknote className="w-3 h-3" />
                                                  {item.priceRange}
                                                </span>
                                              )}
                                              {item.duration && (
                                                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                                                  <Clock className="w-3 h-3" />
                                                  {item.duration}
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#252423] to-stone-800 p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            お探しの答えが見つかりませんでしたか？
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            30年の経験を持つ職人が、あなたの疑問に直接お答えします。<br />
            お見積り・ご相談は無料です。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-white px-8 py-4 font-bold hover:bg-[#C5A028] transition-colors"
            >
              無料相談する
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:03-5638-7402"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#252423] px-8 py-4 font-bold hover:bg-stone-100 transition-colors"
            >
              <Phone className="w-5 h-5" />
              03-5638-7402
            </a>
          </div>
        </div>

        {/* 信頼性の証明 */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4">
            <div className="text-3xl font-black text-[#D4AF37]">30</div>
            <div className="text-xs text-stone-500">年の実績</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-black text-[#D4AF37]">800+</div>
            <div className="text-xs text-stone-500">施工実績</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-black text-[#D4AF37]">50</div>
            <div className="text-xs text-stone-500">職人ネットワーク</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
