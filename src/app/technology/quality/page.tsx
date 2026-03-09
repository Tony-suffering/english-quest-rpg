import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import SocialShare from '@/components/website/SocialShare'
import { Shield, CheckCircle2, Eye, FileCheck, ThumbsUp, Camera, Ruler, ClipboardCheck, AlertTriangle, Sparkles, Award, Users, Clock } from 'lucide-react'

export default function QualityPage() {
  const qualityPhilosophy = [
    {
      icon: Award,
      title: '30年の実績',
      description: '1994年創業以来、東京23区を中心に施工を続けてきました',
    },
    {
      icon: Users,
      title: '熟練職人',
      description: '経験豊富な職人が丁寧に施工します',
    },
    {
      icon: Shield,
      title: 'アフターサポート',
      description: '施工後の不具合にも誠実に対応します',
    },
  ]

  const qualitySteps = [
    {
      icon: Eye,
      title: '①現地調査・事前確認',
      description: '施工前の入念な現場調査で、トラブルを未然に防ぎます',
      details: [
        {
          subtitle: '現場状況の確認',
          items: [
            '壁・天井・床の状態チェック（剥がれ、ひび割れ、カビ等）',
            '下地の種類確認（石膏ボード、コンクリート、木材等）',
            '既存仕上げ材の確認（サンゲツ、リリカラ、東リ等のメーカー・品番）',
            '湿気・結露の有無、換気状況の確認',
          ]
        },
        {
          subtitle: '採寸・図面作成',
          items: [
            'レーザー距離計による正確な採寸',
            '柱・梁・配管等の障害物の位置確認',
            '開口部（窓・ドア）の寸法測定',
            '必要資材の正確な数量算出（ロス率含む）',
          ]
        },
        {
          subtitle: '施工計画の立案',
          items: [
            '最適な工法の選定（GLボンド、LGS下地、直貼り等）',
            '作業日程・工期の調整（お客様のご都合に合わせて）',
            '養生範囲の確認（家具・床・建具等）',
            '廃材処分方法の確認',
          ]
        },
      ]
    },
    {
      icon: Shield,
      title: '②施工中の品質管理',
      description: '職人の技術と丁寧な作業で品質を確保します',
      details: [
        {
          subtitle: '下地処理の徹底',
          items: [
            '既存仕上げ材の丁寧な撤去（傷をつけない）',
            'パテ処理による段差・凹凸の修正（F☆☆☆☆製品使用）',
            'プライマー塗布による接着力向上',
            'ひび割れ補修（Vカット工法、メッシュテープ等）',
          ]
        },
        {
          subtitle: '施工精度の確保',
          items: [
            '墨出し・基準線の正確な設定',
            '柄合わせ（リピート）の確認（クロス・床材）',
            '気泡・シワ・浮きの徹底排除',
            'ジョイント部の丁寧な処理（目立たない仕上げ）',
          ]
        },
        {
          subtitle: '進捗管理・記録',
          items: [
            '工程ごとの写真記録（before・施工中・after）',
            '日報による作業内容・進捗の報告',
            '材料使用状況の管理（ロス削減）',
            'お客様への定期的な進捗報告',
          ]
        },
        {
          subtitle: '安全・環境配慮',
          items: [
            '養生の徹底（ブルーシート、マスカー、養生テープ）',
            '粉塵・騒音対策（近隣への配慮）',
            '作業場の整理整頓・清掃',
            '廃材の分別・適正処分',
          ]
        },
      ]
    },
    {
      icon: FileCheck,
      title: '③完成検査・引き渡し',
      description: '細部まで確認し、丁寧に仕上げます',
      details: [
        {
          subtitle: '仕上がり検査',
          items: [
            '全体の仕上がり確認（色ムラ、柄ずれ、傷等）',
            'ジョイント部の確認（剥がれ、浮き、目立ち）',
            'コーナー・端部の処理確認',
            '照明を当てて影による凹凸チェック',
          ]
        },
        {
          subtitle: '機能確認',
          items: [
            '建具（ドア・窓）の開閉確認（干渉していないか）',
            'スイッチ・コンセントプレートの動作確認',
            '巾木・廻り縁の接着確認',
            '床材の歩行確認（きしみ、浮き等）',
          ]
        },
        {
          subtitle: 'クリーニング・養生撤去',
          items: [
            '施工箇所の清掃（糊跡、パテ粉等の除去）',
            '養生材の丁寧な撤去（跡を残さない）',
            '床・家具の清掃',
            '廃材・梱包材の完全撤去',
          ]
        },
        {
          subtitle: 'お客様立会い確認',
          items: [
            'お客様と一緒に仕上がりをチェック',
            'ご不明点・ご要望のヒアリング',
            '手直し箇所があれば即座に対応',
            'メンテナンス方法のご説明',
          ]
        },
      ]
    },
    {
      icon: ThumbsUp,
      title: '④アフターフォロー',
      description: '施工後も安心のサポート体制。長いお付き合いを大切にします',
      details: [
        {
          subtitle: '施工後のサポート',
          items: [
            '施工に関するご相談に対応',
            'メンテナンス方法のアドバイス',
            '汚れ・傷の補修方法のご説明',
            '次回張替え時期の目安をご案内',
          ]
        },
        {
          subtitle: '追加工事・リピート対応',
          items: [
            '他の部屋の施工も喜んで対応',
            'リピーター様には特別価格でご提供',
            '追加工事も同じ職人が担当（品質の統一）',
            'ご紹介特典あり',
          ]
        },
      ]
    },
  ]

  const qualityStandards = [
    {
      title: '使用材料の基準',
      items: [
        '防火認定品（不燃・準不燃）の使用',
        'F☆☆☆☆（フォースター）製品の優先使用',
        '一流メーカー品（サンゲツ、リリカラ、東リ、シンコール等）',
        '耐久性・メンテナンス性を考慮した材料選定',
      ]
    },
    {
      title: '施工技術の基準',
      items: [
        '一級技能士・職業訓練指導員の技術指導',
        '業界標準工法の遵守',
        'メーカー推奨施工方法の厳守',
        '継続的な技術研修の実施',
      ]
    },
    {
      title: '安全・環境基準',
      items: [
        '労働安全衛生法の遵守',
        '産業廃棄物処理法の遵守',
        'VOC（揮発性有機化合物）対策',
        '騒音・振動規制法の遵守',
      ]
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* ヒーローセクション */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-[#10B981]/10 text-[#10B981] px-4 py-2 text-sm font-bold mb-4 border border-[#10B981] rounded-full">
              Quality Management
            </div>
            <h1 className="text-3xl sm:text-5xl font-black mb-4 text-[#252423]">
              品質管理への<span className="text-[#10B981]">こだわり</span>
            </h1>
            <p className="text-base sm:text-lg text-[#252423]/70 max-w-3xl mx-auto leading-relaxed">
              1994年創業以来、30年にわたり培ってきた品質管理のノウハウ。<br />
              「丁寧な仕事」「確かな技術」「誠実な対応」で、お客様の信頼にお応えします。
            </p>
          </div>

          {/* 品質方針 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {qualityPhilosophy.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-white border-2 border-[#DAE2E8] p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-[#10B981] rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-black text-[#252423] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#252423]/70 leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 品質管理の4ステップ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-4">
              品質管理の4ステップ
            </h2>
            <p className="text-base text-[#252423]/70 max-w-2xl mx-auto">
              施工前から施工後まで、一貫した品質管理を心がけています
            </p>
          </div>

          <div className="space-y-8">
            {qualitySteps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white border-2 border-[#DAE2E8] p-6 sm:p-8 rounded-xl">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#10B981] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#252423] mb-2">{step.title}</h3>
                      <p className="text-base text-[#252423]/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="bg-white border border-[#DAE2E8] p-5 rounded-lg">
                        <h4 className="text-base font-bold text-[#252423] mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                          </div>
                          {detail.subtitle}
                        </h4>
                        <ul className="space-y-2">
                          {detail.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2 text-sm text-[#252423]/70">
                              <span className="text-[#10B981] mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 品質基準 */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-[#252423] mb-4">
              イワサキ内装の品質基準
            </h2>
            <p className="text-base text-[#252423]/70 max-w-2xl mx-auto">
              法令遵守はもちろん、基本的な品質基準を守り、安全な施工を心がけています
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {qualityStandards.map((standard, index) => (
              <div key={index} className="bg-white border-2 border-[#DAE2E8] p-6 rounded-xl">
                <h3 className="text-lg font-black text-[#252423] mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#10B981]" />
                  {standard.title}
                </h3>
                <ul className="space-y-2">
                  {standard.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#252423]/70">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お客様の声 */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#10B981]/5 to-white border-2 border-[#10B981]/20 p-8 rounded-xl">
            <h2 className="text-xl font-black text-[#252423] mb-6 text-center">
              お客様からの評価
            </h2>
            <div className="space-y-4 text-[#252423]/80">
              <p className="leading-relaxed">
                「下地処理が丁寧で、仕上がりが本当に綺麗。前に頼んだ業者とは全然違いました」
                <span className="text-sm text-[#252423]/60 ml-2">（江東区 M様）</span>
              </p>
              <p className="leading-relaxed">
                「職人さんが毎日写真を送ってくれたので、仕事中でも安心して任せられました」
                <span className="text-sm text-[#252423]/60 ml-2">（墨田区 O様）</span>
              </p>
              <p className="leading-relaxed">
                「養生も撤去もとても丁寧で、他の部屋も傷一つありませんでした。また頼みます」
                <span className="text-sm text-[#252423]/60 ml-2">（台東区 S様）</span>
              </p>
              <p className="leading-relaxed">
                「工期通りに仕上げてくれて、店舗オープンに間に合いました。本当に助かりました」
                <span className="text-sm text-[#252423]/60 ml-2">（千代田区 ビル管理会社様）</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SNSシェア */}
      <section className="py-8 bg-white border-t border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-4">
            <SocialShare
              title="品質管理へのこだわり | イワサキ内装"
              description="1994年創業以来30年、東京23区を中心に施工を続けています。施工前から施工後まで、一貫した品質管理を心がけています。"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
