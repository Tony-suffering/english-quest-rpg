import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'

export default function HistoryPage() {
  const history = [
    { year: '1950年', event: '創業者、栃木県足利市に誕生。ものづくりの街で育つ', category: '原点' },
    { year: '1970年代', event: '上京し、都内のさまざまな内装会社で働き、業界の仕組みと経営を学ぶ', category: '修行時代' },
    { year: '1994', event: 'イワサキ内装として独立開業。住宅内装工事を中心に事業開始', category: '創業' },
    { year: '2000年代', event: 'マンション・オフィス内装工事に進出。事業領域を拡大', category: '発展期' },
    { year: '2010年代', event: 'リフォーム・バリアフリー事業を強化。高齢化社会に対応', category: '事業拡大' },
    { year: '2020', event: 'AI・デジタル技術の導入により業務DXを開始。業界の先駆者として注目される', category: 'DX推進' },
    { year: '2023', event: '職人ネットワークを50名超に拡大。施工体制を強化', category: '組織強化' },
    { year: '2025', event: 'AI業務サポートシステム導入。伝統と最新技術の融合を実現', category: '革新' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-[#252423] text-white py-12 border-b border-[#DAE2E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-black mb-3 border-b-2 border-[#D4AF37] pb-3 inline-block">
            沿革
          </h1>
          <p className="text-sm text-white/70 mt-4">1950年から続く、挑戦と革新の歴史</p>
        </div>
      </section>

      {/* 創業ストーリー */}
      <section className="py-12 bg-white border-b border-[#DAE2E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5F5F5] border border-[#DAE2E8] p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-[#D4AF37] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xl font-black">1950</span>
              </div>
              <div>
                <h2 className="text-xl font-black text-[#252423] mb-2">足利から東京へ。職人の技を磨いた日々、そして1994年の独立開業</h2>
                <p className="text-sm text-[#252423]/70 leading-relaxed mb-3">
                  創業者は、織物の街として知られる栃木県足利市で生まれ育ちました。
                  ものづくりの伝統が息づく街で、人の手で丁寧につくることの大切さを自然と学びながら成長。
                </p>
                <p className="text-sm text-[#252423]/70 leading-relaxed mb-3">
                  若き日に東京へ。さまざまな内装会社で働きながら、職人たちと共に現場に立ち、内装業界の仕組みを学んでいきました。
                  お客様のニーズをどう聞き出すか、職人の技術をどう活かすか、工程をどう管理するか、会社をどう経営するか。
                  現場の最前線で見て、聞いて、考えた日々のすべてが、今のイワサキ内装の礎となっています。
                </p>
                <p className="text-sm text-[#252423]/70 leading-relaxed">
                  そして1994年、イワサキ内装を設立。
                  「技術と人を尊重し、伝統と革新で持続可能な空間を創造する」という理念のもと、
                  一つ一つの現場を大切に、確かな技術と誠実な姿勢でお客様との信頼を築いてきました。
                </p>
              </div>
            </div>

            <div className="border-t border-[#DAE2E8] pt-4 mt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black text-[#D4AF37]">30+</div>
                  <div className="text-xs text-[#252423]/70">年の経営実績</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#D4AF37]">96%</div>
                  <div className="text-xs text-[#252423]/70">顧客満足度</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#D4AF37]">50+</div>
                  <div className="text-xs text-[#252423]/70">職人ネットワーク</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* タイムライン */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#252423] mb-8 border-b-2 border-[#10B981] pb-3 inline-block">
            歩みの軌跡
          </h2>

          <div className="space-y-6">
            {history.map((item, index) => (
              <div key={index} className="flex gap-4">
                {/* 年号エリア */}
                <div className="w-24 flex-shrink-0">
                  <div className="bg-[#252423] text-white px-3 py-2 text-center">
                    <div className="text-sm font-black">{item.year}</div>
                  </div>
                </div>

                {/* 内容エリア */}
                <div className="flex-1 border border-[#DAE2E8] p-4 hover:shadow-md transition-shadow bg-white">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#10B981] flex-shrink-0 mt-2"></div>
                    <div className="flex-1">
                      <div className="text-xs text-[#D4AF37] font-bold mb-1">{item.category}</div>
                      <p className="text-sm text-[#252423] leading-relaxed">{item.event}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DX推進への挑戦 */}
      <section className="py-12 bg-[#F5F5F5] border-t border-[#DAE2E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#DAE2E8] p-6">
            <h2 className="text-xl font-black text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-3 inline-block">
              業界の先駆者としてのDX推進
            </h2>

            <div className="space-y-4 text-sm text-[#252423]/80 leading-relaxed">
              <p>
                2020年、「業界の未来のために」とAI・デジタル技術の導入を決断。
                職人の高齢化、人手不足、2024年問題といった業界課題に真正面から向き合い、
                建設業界では異例とも言えるDX推進に乗り出しました。
              </p>

              <div className="bg-[#10B981]/5 border border-[#10B981]/20 p-4">
                <h3 className="font-bold text-[#252423] mb-2 flex items-center gap-2">
                  <span className="text-[#10B981]">●</span>
                  実現したDX施策
                </h3>
                <ul className="space-y-2 text-[#252423]/70 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span>AI日報システムによる業務効率化</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span>職人マッチングシステムで最適配置を実現</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span>クラウド施工管理で品質向上と働き方改革を両立</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span>デジタル経営分析で戦略的意思決定をサポート</span>
                  </li>
                </ul>
              </div>

              <p className="border-l-4 border-[#D4AF37] pl-4 italic">
                「業界のため、職人のため、お客様のために、常に新しいことに挑戦し続ける」<br />
                <span className="text-xs text-[#252423]/50">— 経営理念より</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* これからの展望 */}
      <section className="py-12 bg-white border-t border-[#DAE2E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#252423] mb-6 border-b-2 border-[#10B981] pb-3 inline-block">
            これからの展望
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-[#DAE2E8] p-4 bg-[#F5F5F5]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#252423] mb-1">AI技術のさらなる活用</h3>
                  <p className="text-xs text-[#252423]/70">施工品質の可視化と予測分析で、さらなる品質向上を実現</p>
                </div>
              </div>
            </div>

            <div className="border border-[#DAE2E8] p-4 bg-[#F5F5F5]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#252423] mb-1">若手職人の育成</h3>
                  <p className="text-xs text-[#252423]/70">デジタルとアナログを融合した新しい職人育成プログラム</p>
                </div>
              </div>
            </div>

            <div className="border border-[#DAE2E8] p-4 bg-[#F5F5F5]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#252423] mb-1">シニアリフォーム市場</h3>
                  <p className="text-xs text-[#252423]/70">超高齢化社会を見据えたバリアフリー・介護リフォーム</p>
                </div>
              </div>
            </div>

            <div className="border border-[#DAE2E8] p-4 bg-[#F5F5F5]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#10B981] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#252423] mb-1">業界のDX化推進</h3>
                  <p className="text-xs text-[#252423]/70">自社の経験を活かし、業界全体のデジタル化をリード</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
