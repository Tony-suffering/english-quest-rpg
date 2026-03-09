'use client'

import Header from '@/components/website/Header'
import Footer from '@/components/website/Footer'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* ページヘッダー */}
      <section className="bg-[#252423] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-black text-white border-b-2 border-[#D4AF37] pb-4 inline-block">
            会社概要
          </h1>
        </div>
      </section>

      {/* イントロ - 数字で語る */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#252423] mb-4">
              イワサキ内装を数字で知る
            </h2>
            <p className="text-[#252423]/70">AI × 職人技 × グローバル対応で、業界に新しい風を</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white border-2 border-[#10B981] p-6 text-center hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-[#10B981] mb-2">30+</div>
              <div className="text-sm text-[#252423] font-bold mb-1">年の実績</div>
              <div className="text-xs text-[#252423]/60">1994年創業</div>
            </div>

            <div className="bg-white border-2 border-[#D4AF37] p-6 text-center hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-[#D4AF37] mb-2">50+</div>
              <div className="text-sm text-[#252423] font-bold mb-1">職人ネットワーク</div>
              <div className="text-xs text-[#252423]/60">各分野のプロ</div>
            </div>

            <div className="bg-white border-2 border-[#10B981] p-6 text-center hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-[#10B981] mb-2">100+</div>
              <div className="text-sm text-[#252423] font-bold mb-1">施工実績</div>
              <div className="text-xs text-[#252423]/60">住宅・店舗・オフィス</div>
            </div>

            <div className="bg-white border-2 border-[#D4AF37] p-6 text-center hover:shadow-lg transition-all">
              <div className="text-4xl font-black text-[#D4AF37] mb-2">24/7</div>
              <div className="text-sm text-[#252423] font-bold mb-1">AI対応</div>
              <div className="text-xs text-[#252423]/60">タクミが常駐</div>
            </div>
          </div>

          <div className="bg-white border border-[#DAE2E8] p-8">
            <h3 className="text-xl font-black text-[#252423] mb-4 border-b-2 border-[#10B981] pb-3 inline-block">
              伝統×革新で、建設業界の「当たり前」を変える
            </h3>
            <div className="space-y-4 text-[#252423]/80 leading-relaxed">
              <p>
                1994年創業、都内を中心に30年以上。
                クロス張替え、ダイノックシート、床材施工など内装工事のプロフェッショナル集団として、
                数千件の施工実績を積み重ねてきました。
              </p>
              <p className="font-bold text-[#252423]">
                でも、私たちは「昔ながらの工事屋」で終わりません。
              </p>
              <p>
                <span className="bg-[#10B981]/10 text-[#10B981] px-2 py-1 font-bold">デジタル技術の活用</span>に積極的に取り組み、
                <span className="bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 font-bold ml-2">英語コミュニケーション</span>で多国籍現場に対応。
                <span className="bg-[#82EDA6]/10 text-[#82EDA6] px-2 py-1 font-bold ml-2">海外最新技術</span>を積極的に収集。
              </p>
              <p>
                経験豊富な経営陣が率先してDXに挑戦し、若手職人と一緒に業界の未来を創る。
                それが、イワサキ内装です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3つの強み */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-[#252423] mb-8 border-b-2 border-[#D4AF37] pb-3 inline-block">
            イワサキ内装の3つの強み
          </h2>
          <div className="space-y-8">
            {/* 1. デジタル技術への取り組み */}
            <div className="bg-white border-l-4 border-[#10B981] p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-[#252423] mb-4 flex items-center gap-2">
                <span className="text-[#10B981] text-2xl">1.</span>
                デジタル技術への挑戦で、業務改善を目指す
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  従来の建設業界では「職人の経験と勘」に頼った現場管理が一般的でした。
                  当社では、デジタル技術を活用した業務改善に取り組んでいます。
                </p>
                <p>
                  例えば、AI職人タクミ（Claude Code + OpenAI GPT-4o mini）による24時間お問い合わせ対応や、
                  スマホアプリでの現場記録（写真・位置情報・作業内容）など、
                  Claude Codeを活用した迅速な開発で、少しずつ現場の効率化を進めています。
                </p>
                <p>
                  まだまだ発展途上ですが、施工データの蓄積や工程管理の可視化など、
                  将来的にはAIを活用した見積もり精度向上や最適な職人配置も実現したいと考えています。
                </p>
                <div className="bg-[#10B981]/5 border border-[#10B981]/20 p-4 mt-4">
                  <p className="text-xs font-semibold text-[#252423] mb-2">デジタル活用の取り組み:</p>
                  <ul className="text-xs text-[#252423]/70 space-y-1">
                    <li>✅ AI職人タクミ（24時間対応、実稼働中）</li>
                    <li>✅ 現場記録アプリ（開発中）</li>
                    <li>🔧 施工管理システム（構想中）</li>
                    <li>🔧 データ分析ツール（構想中）</li>
                  </ul>
                  <p className="text-xs text-[#252423]/60 mt-2">
                    ※ Claude Codeを活用し、社長自ら開発に挑戦中
                  </p>
                </div>
              </div>
            </div>

            {/* 2. 英語対応力 */}
            <div className="bg-white border-l-4 border-[#D4AF37] p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-[#252423] mb-4 flex items-center gap-2">
                <span className="text-[#D4AF37] text-2xl">2.</span>
                英語コミュニケーション力で、グローバル現場に対応
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  建設業界では外国人労働者の増加や、外資系企業案件の増加により、
                  英語でのコミュニケーション能力が求められる場面が増えています。
                  当社では経営者自らが英語学習に取り組み、基本的な作業指示や安全確認を英語で行える体制を整えています。
                </p>
                <p>
                  特に安全管理においては、日本語が不十分な作業員との意思疎通不足が重大事故につながるリスクがあります。
                  「ヘルメット着用」「脚立の安定確認」といった
                  基本的な安全指示を英語で伝えられることで、現場の安全性が大きく向上しました。
                </p>
                <p>
                  また、海外の最新施工技術や材料情報を英語で直接収集することで、
                  日本語訳を待たずに業界の最先端情報をいち早くキャッチ。
                  お客様により良い提案ができる体制を構築しています。
                </p>
                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 p-4 mt-4">
                  <p className="text-xs font-semibold text-[#252423] mb-2">英語対応可能領域:</p>
                  <ul className="text-xs text-[#252423]/70 space-y-1">
                    <li>• 基本的な作業指示</li>
                    <li>• 安全確認・注意喚起</li>
                    <li>• 外国人労働者との日常会話</li>
                    <li>• 海外技術情報の収集と理解</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3. 職人ネットワーク */}
            <div className="bg-white border-l-4 border-[#82EDA6] p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-[#252423] mb-4 flex items-center gap-2">
                <span className="text-[#82EDA6] text-2xl">3.</span>
                50名超の専門職人ネットワークで、あらゆる工事に対応
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  内装工事は、クロス職人、床職人、大工、左官、塗装職人など、
                  各分野の専門技術が必要な総合的な仕事です。
                  当社は30年以上の実績で培った信頼関係により、
                  東京・神奈川エリアに50名を超える専門職人のネットワークを構築しています。
                </p>
                <p>
                  小規模な壁紙張替えから、大規模オフィスビルの内装工事、
                  複雑なバリアフリー改修まで、工事内容に応じて最適な職人をアサイン。
                  各職人の得意分野や稼働状況を把握し、
                  最も適した人材を配置することで、質の高い施工を実現しています。
                </p>
                <p>
                  また、職人同士の情報共有や技術研鑽の場も定期的に設けており、
                  若手職人の育成やベテラン職人の技術継承にも力を入れています。
                  「良い職人は良い現場から育つ」という信念のもと、
                  働きやすく、やりがいのある環境づくりを大切にしています。
                </p>
                <div className="bg-[#82EDA6]/5 border border-[#82EDA6]/20 p-4 mt-4">
                  <p className="text-xs font-semibold text-[#252423] mb-2">職人ネットワーク内訳:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#252423]/70">
                    <div>• クロス職人: 20名以上</div>
                    <div>• 床職人: 15名以上</div>
                    <div>• 大工職人: 10名以上</div>
                    <div>• 左官・塗装: 5名以上</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 専門サービス */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#252423] mb-8 border-l-4 border-[#D4AF37] pl-4">
            専門サービス
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-[#DAE2E8] p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-[#252423] mb-4 border-b-2 border-[#10B981] pb-2 inline-block">
                クロス・壁紙工事
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  ビニルクロス、織物クロス、紙クロス、機能性クロス（防火・抗菌・消臭）など、
                  多様な材質と用途に対応した壁装工事を行っています。
                  単なる壁紙の張替えではなく、下地処理（パテ処理・研磨）から丁寧に施工することで、
                  継ぎ目が目立たず、長年使用しても剥がれない確実な仕上がりを実現します。
                </p>
                <p>
                  特に、ビニルクロスの施工では継ぎ目処理が品質を左右します。
                  当社の職人は、壁の形状や照明の当たり方を考慮し、
                  継ぎ目が最も目立たない位置に配置する技術を持っています。
                  また、湿度や温度による伸縮を見越した施工により、季節による剥がれを防ぎます。
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-[#252423] mb-4 border-b-2 border-[#D4AF37] pb-2 inline-block">
                ダイノックシート施工
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  3M™ダイノック™フィルムは、木目調、石目調、金属調など900種類以上のデザインバリエーションを持つ、
                  高品質な化粧フィルムです。当社は3M認定施工技術者による施工で、
                  本物の木材や大理石と見紛うような質感を、コストを抑えて実現します。
                </p>
                <p>
                  オフィスのエレベーターホール、店舗の什器、住宅のキッチン扉など、
                  あらゆる場所に施工可能。既存の扉や壁を撤去せず、上から貼るだけでリニューアルできるため、
                  工期短縮とコスト削減を同時に実現できます。
                  また、10年以上の耐久性があり、メンテナンスも簡単です。
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-[#252423] mb-4 border-b-2 border-[#82EDA6] pb-2 inline-block">
                床材施工
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  OAフロア（オフィス向け配線対応床）、タイルカーペット、フロアタイル、
                  長尺シート（病院・店舗向け）など、用途と環境に応じた最適な床材をご提案します。
                  特に重要なのは水平精度の確保。床の傾きやガタつきは、長期使用時の不具合につながります。
                </p>
                <p>
                  当社では、レーザーレベラー（水平測定機器）を用いた精密な下地調整を行い、
                  ミリ単位の精度で床を施工。オフィスの椅子が勝手に動く、ドアが閉まりにくいといった
                  細かな不具合も防ぎます。また、防音性、耐久性、清掃性など、
                  お客様の使用環境に最適な床材選定もサポートしています。
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-8 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-[#252423] mb-4 border-b-2 border-[#10B981] pb-2 inline-block">
                総合内装工事
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  パーティション工事（間仕切り壁）、天井工事（システム天井・ボード天井）、
                  造作家具工事（カウンター・棚・収納）まで、内装に関わる工事を一貫して対応。
                  複数の業者に分けて発注する必要がないため、工期短縮とコスト削減が可能です。
                </p>
                <p>
                  特に、オフィスや店舗の新装・改装では、
                  電気工事、空調工事、設備工事など他業種との調整が重要になります。
                  当社は長年の経験により、他業種との連携もスムーズ。
                  工事全体の進行を見据えた最適な工程管理で、
                  お客様のご要望を機能性と美しさを兼ね備えた空間として実現します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 品質保証体制 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#252423] mb-8 border-l-4 border-[#D4AF37] pl-4">
            品質保証体制 - デジタルと職人の目による二重チェック
          </h2>
          <div className="space-y-6">
            <div className="bg-white border border-[#DAE2E8] p-8">
              <h3 className="text-lg font-bold text-[#252423] mb-4 border-b border-[#10B981] pb-2">
                施工中の品質管理
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  施工開始から完了まで、デジタルツールと職人の熟練した目による二段階チェック体制を採用しています。
                  まず、施工の各工程で写真撮影を行い、クラウド上に記録。
                  これにより、お客様がリアルタイムで工事の進捗を確認できるだけでなく、
                  後から「どのように施工されたか」を明確に追跡することが可能です。
                </p>
                <p>
                  次に、ベテラン職人による最終チェック。
                  クロスの継ぎ目のズレ、床材の浮き、色ムラなど、
                  長年の経験で培った「職人の目」でしか判断できない微細な不具合も見逃しません。
                  デジタルの客観性と、人間の感性を組み合わせることで、高い品質基準を維持しています。
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-8">
              <h3 className="text-lg font-bold text-[#252423] mb-4 border-b border-[#D4AF37] pb-2">
                施工後の保証とサポート
              </h3>
              <div className="space-y-3 text-sm text-[#252423]/80 leading-relaxed">
                <p>
                  施工完了後1年間の品質保証を標準でご提供。
                  万一、クロスの剥がれ、床材の浮き、その他施工に起因する不具合が発生した場合は、
                  無償で修理・補修を行います。保証期間中は、施工後3ヶ月、6ヶ月、1年の定期点検を実施し、
                  経年劣化の兆候を早期に発見・対処することで、長期的な品質維持をサポートします。
                </p>
                <p>
                  また、保証期間終了後も、AIタクミが24時間365日、メンテナンスや追加工事のご相談に対応。
                  「ちょっとした質問」から「大規模リフォームの相談」まで、
                  いつでも気軽にお問い合わせいただける体制を整えています。
                  長期的なお付き合いを大切にし、お客様の暮らしや事業を継続的にサポートすることが、
                  私たちの使命だと考えています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 主な施工先 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#252423] mb-8 border-l-4 border-[#D4AF37] pl-4">
            主な施工先カテゴリ
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold text-[#252423] mb-3 border-b-2 border-[#10B981] pb-2 inline-block">
                オフィス・商業施設
              </h3>
              <p className="text-sm text-[#252423]/80 mb-3 leading-relaxed">
                企業本社ビル、金融機関店舗、飲食チェーン、スタートアップ拠点など、
                多様なビジネス環境に対応した内装工事を手がけています。
                特にオフィスビルでは、営業時間外や休日の施工により、
                業務への影響を最小限に抑えた工事が可能です。
              </p>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold text-[#252423] mb-3 border-b-2 border-[#D4AF37] pb-2 inline-block">
                医療・福祉施設
              </h3>
              <p className="text-sm text-[#252423]/80 mb-3 leading-relaxed">
                総合病院、クリニック、介護施設、デイサービスなど、
                衛生基準が厳しい施設での施工実績も豊富です。
                抗菌・防カビ機能を持つ材料の選定から、
                施設利用者への配慮を最優先とした工程管理まで、きめ細かく対応します。
              </p>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold text-[#252423] mb-3 border-b-2 border-[#82EDA6] pb-2 inline-block">
                住宅・マンション
              </h3>
              <p className="text-sm text-[#252423]/80 mb-3 leading-relaxed">
                高級マンション、戸建住宅、リノベーション、バリアフリー改修まで、
                住まいに関わるあらゆる内装工事に対応。
                お客様の暮らし方やライフステージに合わせた提案で、
                長く愛される住空間を創ります。
              </p>
            </div>

            <div className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold text-[#252423] mb-3 border-b-2 border-[#10B981] pb-2 inline-block">
                グローバル対応案件
              </h3>
              <p className="text-sm text-[#252423]/80 mb-3 leading-relaxed">
                外資系企業のオフィス、多国籍チームが働く現場、
                英語対応が必須の案件など、グローバルな環境での施工実績も増加中。
                基本的な英語コミュニケーションが可能なため、
                外国人スタッフとの円滑な連携が可能です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 会社概要テーブル */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#252423] mb-8 border-l-4 border-[#D4AF37] pl-4">
            会社概要
          </h2>
          <div className="bg-white border border-[#DAE2E8] overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-[#DAE2E8]">
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-[#252423] bg-gray-50 w-1/3">商号</td>
                  <td className="px-6 py-4 text-[#252423]/80">有限会社イワサキ内装</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-[#252423] bg-gray-50">創業</td>
                  <td className="px-6 py-4 text-[#252423]/80">1994年（平成6年）</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-[#252423] bg-gray-50">代表取締役</td>
                  <td className="px-6 py-4 text-[#252423]/80">岩﨑 和男</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-[#252423] bg-gray-50">事業内容</td>
                  <td className="px-6 py-4 text-[#252423]/80">
                    内装仕上工事業、壁装工事業、大工工事業<br />
                    <span className="text-xs text-[#10B981] font-semibold">+ デジタル技術活用、英語対応可能</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-[#252423] bg-gray-50">特色</td>
                  <td className="px-6 py-4 text-[#252423]/80">
                    デジタル技術活用 / 英語対応 / 50名職人ネットワーク / 30年の実績
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-[#252423] bg-gray-50">建設業許可</td>
                  <td className="px-6 py-4 text-[#252423]/80">東京都知事 許可 (般-5) 第157230号</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-[#252423] bg-gray-50">所在地</td>
                  <td className="px-6 py-4 text-[#252423]/80">〒130-0021 東京都墨田区緑1丁目24-2 タカミビル101</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-[#252423] bg-gray-50">営業時間</td>
                  <td className="px-6 py-4 text-[#252423]/80">
                    平日 9:00～18:00（電話・来訪）<br />
                    <span className="text-xs text-[#10B981] font-semibold">AIタクミは24時間365日対応</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#252423] mb-4 border-l-4 border-[#D4AF37] pl-4">
            お問い合わせ
          </h2>
          <p className="text-sm text-[#252423]/70 mb-8 leading-relaxed">
            まずはAIタクミにご相談ください。24時間365日、即座に回答します。
            もちろん、お急ぎの方や直接相談されたい方は、電話やメールでも対応しております。
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* AIタクミ - アイコンなし */}
            <div className="bg-[#10B981] text-white p-8 hover:shadow-2xl transition-all col-span-full md:col-span-3">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-black mb-3">AIタクミに相談する（最速・おすすめ）</h3>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">
                  24時間365日対応のAI職人「タクミ」が、見積もり相談、施工の疑問、工事の流れ、技術的な質問など、
                  あらゆるご質問に即座にお答えします。もちろん完全無料です。
                  複雑な内容や詳細な見積もりが必要な場合は、人間のスタッフにスムーズにお繋ぎします。
                </p>
                <a
                  href="/chat"
                  className="inline-block bg-white text-[#10B981] px-8 py-3 font-bold hover:bg-gray-100 transition-all"
                >
                  いますぐAIタクミに相談する →
                </a>
              </div>
            </div>

            {/* 電話 - シンプルに */}
            <div className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
              <h3 className="font-bold text-[#252423] mb-3 text-lg">電話でのお問い合わせ</h3>
              <div className="space-y-2">
                <a href="tel:0356387402" className="text-[#D4AF37] font-bold text-2xl hover:underline block">
                  03-5638-7402
                </a>
                <p className="text-sm text-[#252423]/70">
                  受付時間: 平日 9:00～18:00<br />
                  お急ぎの方、直接話したい方はこちら
                </p>
              </div>
            </div>

            {/* メール - シンプルに */}
            <div className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
              <h3 className="font-bold text-[#252423] mb-3 text-lg">メールでのお問い合わせ</h3>
              <div className="space-y-2">
                <a href="mailto:kaz@iwasaki-naisou.jp" className="text-[#10B981] hover:underline block text-sm break-all">
                  kaz@iwasaki-naisou.jp
                </a>
                <p className="text-sm text-[#252423]/70">
                  24時間受付<br />
                  詳細な資料や図面を添付したい方はこちら
                </p>
              </div>
            </div>

            {/* 所在地 - シンプルに */}
            <div className="bg-white border border-[#DAE2E8] p-6 hover:shadow-lg transition-all">
              <h3 className="font-bold text-[#252423] mb-3 text-lg">所在地</h3>
              <div className="space-y-2 text-sm text-[#252423]/70">
                <p>
                  〒130-0021<br />
                  東京都墨田区緑1丁目24-2<br />
                  タカミビル101
                </p>
                <p className="text-xs text-[#252423]/60">
                  JR総武線・都営大江戸線<br />
                  「両国駅」より徒歩5分
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
