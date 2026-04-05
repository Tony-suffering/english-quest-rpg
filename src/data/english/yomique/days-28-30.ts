import type { YomiqueDay } from '@/types/yomique';

// ═══════════════════════════════════════════════════════════
// ヨミクエ Days 28-30: THE FINALE
// Phase 3: 実践リーディング -- Real-World Reading
// Day 28: 契約書の読み方 -- 初級
// Day 29: 契約書の読み方 -- 実践
// Day 30: 最終テスト -- 契約書を読んでサインする
// 30 exercises total, 10 per day
// ═══════════════════════════════════════════════════════════

export const YOMIQUE_DAYS_28_30: YomiqueDay[] = [
  // ─────────────────────────────────────────────────────────
  // Day 28: 契約書の読み方 -- 初級 (Basic Contract Reading)
  // Kenji faces his first real contract clauses
  // ─────────────────────────────────────────────────────────
  {
    day: 28,
    phase: 3,
    theme: '契約書の読み方 -- 初級',
    themeEn: 'Basic Contract Reading',
    hook: 'ここからが本番。ケンジが30日間学んできた全てを使う。契約書だ。',
    rule: '契約書の基本構造: Parties(当事者) → Scope(範囲) → Term(期間) → Payment(支払い) → Termination(解除)。この5セクションが全ての契約書の骨格。看板の構造が読めたように、契約書にも構造がある。',
    exercises: [
      // ── y28-ex01: beginner / scan ──
      {
        id: 'y28-ex01',
        type: 'scan',
        passage: {
          text: 'SERVICE AGREEMENT\n\nThis Agreement is entered into as of January 15, 2026 ("Effective Date") by and between Iwasaki Construction Co., Ltd., a corporation organized under the laws of Japan ("Client"), and Mekong Building Solutions Co., Ltd., a corporation organized under the laws of Thailand ("Contractor").',
          sourceType: 'Contract',
          wordCount: 47,
        },
        question: 'この契約の「Client」は誰？',
        options: ['Iwasaki Construction Co., Ltd.', 'Mekong Building Solutions Co., Ltd.', '両社', '記載なし'],
        answer: 'Iwasaki Construction Co., Ltd.',
        jaTranslation: '業務委託契約書\n\n本契約は2026年1月15日（「発効日」）をもって、日本法に基づき設立された法人であるイワサキ建設株式会社（「クライアント」）と、タイ王国法に基づき設立された法人であるメコン・ビルディング・ソリューションズ株式会社（「コントラクター」）との間で締結される。',
        trap: 'by and betweenの後に2社並ぶ。どっちがClientでどっちがContractorか？括弧内の("Client")と("Contractor")を見つけられるかが勝負。日本人は長い社名に気を取られて括弧内の定義を見落とす。',
        tip: '契約書の冒頭では当事者を定義する。会社名の後の括弧("Client")が定義名。以降この契約書でClientと出てきたらイワサキ建設のこと。括弧内の定義を最初に全部マーキングしろ。',
        difficulty: 'beginner',
        characterIntro: { speaker: 'master', text: 'ケンジ。契約書だ。お前が30日間やってきたことの総決算だぞ。看板を読む要領でいい。構造を見ろ。', mood: 'serious' },
        reaction: { speaker: 'kenji', correct: 'うちの会社がClientか...括弧で定義してあるんだな。看板と同じで構造がある。', wrong: '括弧を見ろ、括弧を。("Client")って書いてあるだろ。そこがお前の会社だ。' },
      },
      // ── y28-ex02: beginner / vocabulary ──
      {
        id: 'y28-ex02',
        type: 'vocabulary',
        passage: {
          text: 'The Contractor shall commence work within fourteen (14) business days from the Effective Date and shall complete all deliverables no later than December 31, 2026 ("Completion Date"), unless otherwise agreed in writing by both Parties.',
          sourceType: 'Contract',
          wordCount: 40,
        },
        question: '"shall" はこの契約書でどういう意味？',
        options: ['〜する義務がある', '〜してもよい', '〜するかもしれない', '〜するべきだ（推奨）'],
        answer: '〜する義務がある',
        jaTranslation: 'コントラクターは発効日から14営業日以内に業務を開始し、両当事者が書面で別途合意しない限り、2026年12月31日（「完了日」）までに全ての成果物を完了しなければならない。',
        trap: 'shallは日常英語では「〜するつもり」だが、契約書では意味が全く違う。契約書のshall=義務。「〜しなければならない」。mustより強い法的拘束力。shouldと混同すると契約違反になる。',
        tip: '契約書の3大助動詞: shall=義務（やらなきゃいけない）、may=許可（やってもいい）、will=予定（やる予定）。shallが出てきたら赤ペンで線を引け。それが義務条項だ。',
        difficulty: 'beginner',
        reaction: { speaker: 'yuki', correct: 'shallの意味、TOEICでは出ないけど契約書では命綱。正確に理解できたね。', wrong: 'shallは契約書では「義務」。shouldの丁寧版じゃない。法的拘束力がある最強の言葉だよ。' },
      },
      // ── y28-ex03: beginner / scan ──
      {
        id: 'y28-ex03',
        type: 'scan',
        passage: {
          text: 'ARTICLE 3 -- COMPENSATION\n\n3.1 The Client shall pay the Contractor a total fee of USD 420,000 (Four Hundred Twenty Thousand US Dollars) for the Services.\n\n3.2 Payment shall be made in three (3) installments:\n  (a) 30% upon execution of this Agreement;\n  (b) 40% upon completion of Phase 1 deliverables;\n  (c) 30% upon final acceptance of all deliverables.',
          sourceType: 'Contract',
          wordCount: 62,
        },
        question: 'Phase 1完了時に支払う金額は？',
        options: ['USD 168,000', 'USD 126,000', 'USD 420,000', 'USD 210,000'],
        answer: 'USD 168,000',
        jaTranslation: '第3条 -- 報酬\n\n3.1 クライアントは本業務に対し、コントラクターに合計420,000米ドル（42万米ドル）を支払う。\n\n3.2 支払いは3回の分割で行われる:\n  (a) 本契約締結時に30%\n  (b) フェーズ1の成果物完了時に40%\n  (c) 全成果物の最終受領時に30%',
        trap: '420,000 x 40% = 168,000。(b)のPhase 1完了時は40%。30%を選ぶ人が多い。(a)の30%と(c)の30%に挟まれて、(b)の40%を見落とすか、30%と混同する。数字は必ず計算しろ。',
        tip: '支払い条項は「総額 x パーセンテージ」の計算。installments(分割)が出たら、各回の%を確認。(a)(b)(c)のどれが質問されてるかを正確に見極めろ。Day 1の駐車場の計算と同じ要領だ。',
        difficulty: 'beginner',
        reaction: { speaker: 'master', correct: '計算もできた。看板の駐車料金でやったことと同じだろう？構造は同じだ。', wrong: '40%だぞ、30%じゃない。(b)をよく見ろ。420,000 x 0.4 = 168,000だ。' },
      },
      // ── y28-ex04: growing / main_idea ──
      {
        id: 'y28-ex04',
        type: 'main_idea',
        passage: {
          text: 'ARTICLE 5 -- TERM AND TERMINATION\n\n5.1 This Agreement shall be effective from the Effective Date and shall remain in force until the Completion Date, unless terminated earlier in accordance with this Article.\n\n5.2 Either Party may terminate this Agreement by providing sixty (60) days written notice to the other Party if the other Party commits a material breach that remains uncured for thirty (30) days after written notice thereof.',
          sourceType: 'Contract',
          wordCount: 70,
        },
        question: 'この条項の主旨は？',
        options: [
          '契約の有効期間と解除条件を定めている',
          '支払い方法について定めている',
          '業務範囲を定めている',
          '紛争解決の方法を定めている',
        ],
        answer: '契約の有効期間と解除条件を定めている',
        jaTranslation: '第5条 -- 期間および解除\n\n5.1 本契約は発効日から効力を有し、本条に従い早期に解除されない限り、完了日まで有効とする。\n\n5.2 いずれの当事者も、相手方が重大な契約違反を犯し、書面による通知後30日以内に是正されない場合、相手方に60日前の書面による通知を行うことにより本契約を解除できる。',
        trap: 'TERM AND TERMINATIONという見出しを見て「期間と解除」とわかるのが本来の読み方。でも日本人はTerminationを知らない人が多い。「ターミネーター」の語源と同じ。terminate=終わらせる。見出しが読めれば中身は予測できる。',
        tip: '契約書は見出しが命。ARTICLE 5 -- TERM AND TERMINATION。見出しを読むだけで「期間と解除の話だな」とわかる。中身を全部読む前に、まず見出しで全体構造を掴め。目次を読むのと同じだ。',
        difficulty: 'growing',
        reaction: { speaker: 'yuki', correct: '見出しで内容を予測する力。Part 7のダブルパッセージでも最強のスキルだよ。', wrong: 'TERM AND TERMINATIONって見出しに書いてあるよ。Term=期間、Termination=解除。見出しを見ろ。' },
      },
      // ── y28-ex05: growing / truefalse ──
      {
        id: 'y28-ex05',
        type: 'truefalse',
        passage: {
          text: 'ARTICLE 4 -- SCOPE OF WORK\n\n4.1 The Contractor shall provide the following services ("Services"):\n  (a) Structural engineering consultation;\n  (b) On-site quality inspection at the Bangkok facility;\n  (c) Monthly progress reports in English and Japanese.\n\n4.2 Any work not expressly described in this Article shall require a separate written agreement and additional compensation.',
          sourceType: 'Contract',
          wordCount: 56,
        },
        question: '契約範囲外の作業を追加する場合、口頭の合意で十分である。',
        options: ['True', 'False'],
        answer: 'False',
        jaTranslation: '第4条 -- 業務範囲\n\n4.1 コントラクターは以下の業務（「本業務」）を提供する:\n  (a) 構造エンジニアリングのコンサルテーション\n  (b) バンコク施設での現場品質検査\n  (c) 英語および日本語による月次進捗報告\n\n4.2 本条に明示的に記載されていない業務は、別途の書面による合意および追加報酬を必要とする。',
        trap: '4.2の"separate written agreement"がポイント。written=書面。口頭(verbal/oral)ではダメ。日本のビジネスでは口約束で追加作業を受けがちだが、英語の契約書でwrittenと書いてあったら書面が絶対条件。',
        tip: 'writtenが出てきたら「書面必須」。口頭は通用しない。契約書で最も危険なのは、書いてある条件を「まぁ口頭でも大丈夫だろう」と思い込むこと。writtenは赤信号。',
        difficulty: 'growing',
        reaction: { speaker: 'kenji', correct: 'written agreement...書面か。うちの会社でも口約束で追加作業受けてトラブルになったことあるわ。', wrong: 'written agreementって書いてあるだろ。writtenは「書面の」。口頭じゃダメなんだ。' },
      },
      // ── y28-ex06: growing / vocabulary ──
      {
        id: 'y28-ex06',
        type: 'vocabulary',
        passage: {
          text: 'ARTICLE 8 -- CONFIDENTIALITY\n\nEach Party shall keep confidential all information received from the other Party in connection with this Agreement ("Confidential Information") and shall not disclose such information to any third party without the prior written consent of the disclosing Party.',
          sourceType: 'Contract',
          wordCount: 44,
        },
        question: '"prior written consent" の意味は？',
        options: ['事前の書面による同意', '事後の口頭承認', '法定の許可証', '最終確認書'],
        answer: '事前の書面による同意',
        jaTranslation: '第8条 -- 秘密保持\n\n各当事者は、本契約に関連して相手方から受領した全ての情報（「秘密情報」）を秘密に保持し、開示側当事者の事前の書面による同意なく、いかなる第三者にも当該情報を開示してはならない。',
        trap: 'prior=事前の、written=書面の、consent=同意。3語セットで契約書頻出。priorを「優先」と訳す人がいるが、ここでは「事前の」。「優先」はpriorityの方。prior written consentは契約書の定番フレーズ。',
        tip: 'prior written consent(事前書面同意)は契約書の最頻出フレーズの1つ。丸ごと覚えろ。これが条件についてたら「勝手にやるな、先に書面で許可取れ」という意味。',
        difficulty: 'growing',
        reaction: { speaker: 'lisa', correct: 'prior written consentはビジネスで毎日見るよ。セットで覚えるのが一番。', wrong: 'prior=事前の。priorとpriority(優先)を混同しないで。ここでは「事前に書面で同意を取れ」ってこと。' },
      },
      // ── y28-ex07: growing / inference ──
      {
        id: 'y28-ex07',
        type: 'inference',
        passage: {
          text: 'ARTICLE 6 -- INTELLECTUAL PROPERTY\n\n6.1 All deliverables produced by the Contractor under this Agreement shall become the exclusive property of the Client upon payment in full.\n\n6.2 The Contractor retains the right to use general knowledge, skills, and experience gained during the performance of this Agreement.',
          sourceType: 'Contract',
          wordCount: 48,
        },
        question: 'コントラクターが作った成果物を自社の別プロジェクトでそのまま使うことは？',
        options: [
          '全額支払い後はできない（クライアントの独占所有物になるため）',
          'いつでも自由にできる',
          '口頭で許可を得れば可能',
          '6.2により常に可能',
        ],
        answer: '全額支払い後はできない（クライアントの独占所有物になるため）',
        jaTranslation: '第6条 -- 知的財産\n\n6.1 本契約に基づきコントラクターが制作した全ての成果物は、全額支払い完了時にクライアントの独占的財産となる。\n\n6.2 コントラクターは、本契約の履行中に得た一般的な知識、技術、経験を使用する権利を保持する。',
        trap: '6.2を見て「使えるじゃん」と思う罠。6.2はgeneral knowledge, skills, experience(一般的な知識・技術・経験)の話。成果物(deliverables)そのものは6.1でexclusive property of the Client(クライアントの独占所有物)。6.1と6.2の区別が鍵。',
        tip: '知財条項はdeliverables(成果物)とknowledge(知識)を区別する。成果物=相手のもの、知識=自分のもの。この切り分けが読めないと、自社の成果物を勝手に流用して訴訟になる。',
        difficulty: 'growing',
        reaction: { speaker: 'master', correct: '成果物と知識の区別。これが読めるようになったのは大きい。実務で使える力だ。', wrong: '6.2はknowledge、skills、experienceの話。deliverablesは6.1でクライアントのものだ。成果物は流用できない。' },
      },
      // ── y28-ex08: challenge / scan ──
      {
        id: 'y28-ex08',
        type: 'scan',
        passage: {
          text: 'ARTICLE 3 -- COMPENSATION (continued)\n\n3.3 All payments shall be made in United States Dollars by wire transfer to the account designated by the Contractor within fifteen (15) business days of receiving a valid invoice.\n\n3.4 Late payments shall bear interest at a rate of 1.5% per month, compounded monthly, until the outstanding amount is paid in full.',
          sourceType: 'Contract',
          wordCount: 56,
        },
        question: '請求書受領後、何営業日以内に支払えば遅延利息は発生しない？',
        options: ['15営業日', '30営業日', '10営業日', '即日'],
        answer: '15営業日',
        jaTranslation: '第3条 -- 報酬(続き)\n\n3.3 全ての支払いは、有効な請求書の受領後15営業日以内に、コントラクターが指定する口座への米ドル建て電信送金により行われるものとする。\n\n3.4 遅延した支払いには、未払い額が全額支払われるまで月利1.5%の複利で利息が発生する。',
        trap: 'fifteen (15) business daysが支払い期限。business daysは「営業日」であって「日」ではない。カレンダーの15日ではなく、土日祝を除いた15日。日本のビジネスでも同じ概念だが、英語で読むと見落とす人が多い。',
        tip: 'business days=営業日。calendar days=暦日。契約書でdaysとだけ書いてあったら要注意。business daysかcalendar daysか確認しろ。この違いで支払い期限が1週間以上変わることがある。',
        difficulty: 'challenge',
        reaction: { speaker: 'takeshi', correct: 'business daysとcalendar daysの違いは盲点だな。IT契約でもよく問題になる。', wrong: '15 business days。businessが付いてるから営業日。土日祝は数えない。ここを間違えると遅延利息がかかるぞ。' },
      },
      // ── y28-ex09: challenge / order ──
      {
        id: 'y28-ex09',
        type: 'order',
        passage: {
          text: 'PROJECT MILESTONES\n\nMilestone 1: Site survey and assessment report -- Due: 30 days after Effective Date\nMilestone 2: Preliminary structural design -- Due: 90 days after Effective Date\nMilestone 3: Final design with cost estimates -- Due: 150 days after Effective Date\nMilestone 4: On-site inspection and quality certification -- Due: 270 days after Effective Date\nMilestone 5: Final report and project handover -- Due: 330 days after Effective Date',
          sourceType: 'Contract',
          wordCount: 68,
        },
        question: '正しい作業順序は？',
        options: [
          '現地調査 → 予備設計 → 最終設計 → 現場検査 → 最終報告',
          '予備設計 → 現地調査 → 現場検査 → 最終設計 → 最終報告',
          '現地調査 → 最終設計 → 予備設計 → 最終報告 → 現場検査',
          '最終設計 → 現地調査 → 予備設計 → 現場検査 → 最終報告',
        ],
        answer: '現地調査 → 予備設計 → 最終設計 → 現場検査 → 最終報告',
        jaTranslation: 'プロジェクトマイルストーン\n\nマイルストーン1: 現地調査および評価報告 -- 期限: 発効日から30日後\nマイルストーン2: 予備構造設計 -- 期限: 発効日から90日後\nマイルストーン3: 見積付き最終設計 -- 期限: 発効日から150日後\nマイルストーン4: 現場検査および品質認証 -- 期限: 発効日から270日後\nマイルストーン5: 最終報告およびプロジェクト引渡し -- 期限: 発効日から330日後',
        trap: 'site survey、preliminary design、final design、inspection、handover。建設プロジェクトの流れを知ってれば常識だが、英語で読むとpreliminaryとfinalの順序を逆にする人がいる。preliminary=予備、final=最終。日数も30→90→150→270→330と増えていくのがヒント。',
        tip: 'マイルストーンは日数順に並んでる。due 30 days → 90 days → 150 days。数字の順序がそのまま作業順序。英語が完璧に読めなくても数字を追えば正解できる。',
        difficulty: 'challenge',
        reaction: { speaker: 'kenji', correct: 'これは俺の得意分野だ。建設の工程管理なら英語でも読める...と思えるようになってきた。', wrong: 'preliminary=予備、final=最終。30日→90日→150日。数字の順番を見ろ。それが答えだ。' },
      },
      // ── y28-ex10: challenge / inference ──
      {
        id: 'y28-ex10',
        type: 'inference',
        passage: {
          text: 'ARTICLE 9 -- GOVERNING LAW\n\n9.1 This Agreement shall be governed by and construed in accordance with the laws of Singapore.\n\n9.2 Any dispute arising out of or in connection with this Agreement shall first be submitted to mediation in Singapore. If the dispute is not resolved within sixty (60) days of the commencement of mediation, either Party may submit the dispute to arbitration under the rules of the Singapore International Arbitration Centre (SIAC).',
          sourceType: 'Contract',
          wordCount: 78,
        },
        question: 'なぜ準拠法が日本法でもタイ法でもなくシンガポール法なのか、最も合理的な推測は？',
        options: [
          '両当事者にとって中立的な第三国の法律を選んでいる',
          'シンガポールの法律が最も契約者に有利だから',
          'シンガポールに本社があるから',
          '日本の法律では国際契約を結べないから',
        ],
        answer: '両当事者にとって中立的な第三国の法律を選んでいる',
        jaTranslation: '第9条 -- 準拠法\n\n9.1 本契約はシンガポール法に準拠し、同法に従って解釈される。\n\n9.2 本契約に起因しまたは関連する紛争は、まずシンガポールでの調停に付される。調停開始から60日以内に紛争が解決されない場合、いずれの当事者もシンガポール国際仲裁センター(SIAC)の規則に基づく仲裁に紛争を付すことができる。',
        trap: '日本企業とタイ企業の契約なのにシンガポール法。これは国際契約の常識で、両方に有利不利がない中立国を選ぶ。シンガポールは英語が公用語で法制度が整備されてるから国際契約でよく使われる。でもこの「常識」は英語の読解力だけじゃ得られない。推測力が要る。',
        tip: '準拠法(governing law)が当事者以外の国になってたら、中立性のため。国際契約では相手国の法律を準拠法にすると不利になる可能性がある。だから第三国を選ぶ。シンガポール、イギリス、ニューヨーク州法が定番。',
        difficulty: 'challenge',
        reaction: { speaker: 'master', correct: '中立国の法律を選ぶ。国際ビジネスの知恵だ。英語が読めるとこういう「裏の意図」まで見えてくる。', wrong: 'シンガポールは中立国として選ばれてる。日本企業とタイ企業、どっちの国の法律でもない場所。公平のためだ。' },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 29: 契約書の読み方 -- 実践 (Contract Reading: Practice)
  // The dangerous clauses -- liability, indemnification, force majeure
  // ─────────────────────────────────────────────────────────
  {
    day: 29,
    phase: 3,
    theme: '契約書の読み方 -- 実践',
    themeEn: 'Contract Reading: Practice',
    hook: '契約書の怖いセクション。ここが読めなかったら、全責任を負わされる可能性がある。',
    rule: '"Notwithstanding" は「〜にもかかわらず」。前の条件を上書きする最強カード。"Whereas" は前文。契約の背景を説明する部分で法的拘束力はない。"Indemnify" は「損害を補償する」。この3語を知ってるだけで契約書の地雷を避けられる。',
    exercises: [
      // ── y29-ex01: beginner / vocabulary ──
      {
        id: 'y29-ex01',
        type: 'vocabulary',
        passage: {
          text: 'WHEREAS, the Client desires to engage the Contractor for structural engineering services related to the construction of a commercial facility in Bangkok, Thailand; and\n\nWHEREAS, the Contractor has the necessary expertise, qualifications, and resources to perform such services;\n\nNOW, THEREFORE, in consideration of the mutual covenants set forth herein, the Parties agree as follows:',
          sourceType: 'Contract',
          wordCount: 57,
        },
        question: '"WHEREAS" の役割は？',
        options: [
          '契約の背景を説明する前文（法的拘束力なし）',
          '契約の義務条項を定める（法的拘束力あり）',
          '支払い条件を指定する',
          '紛争解決方法を定める',
        ],
        answer: '契約の背景を説明する前文（法的拘束力なし）',
        jaTranslation: 'クライアントは、タイ・バンコクにおける商業施設建設に関連する構造エンジニアリング業務をコントラクターに委託することを希望しており、\n\nコントラクターは、かかる業務を遂行するために必要な専門知識、資格、およびリソースを有していることから、\n\nここに定める相互の約束を約因として、両当事者は以下のとおり合意する。',
        trap: 'WHEREASは契約書の前文(preamble/recitals)に出てくる。日本人は「一方では」と訳しがちだが、契約書では「〜であることから」「〜を踏まえて」の意味。法的拘束力がないのに、ここに大事なことが書いてあると勘違いして時間を浪費する人が多い。',
        tip: 'WHEREAS=前文=背景説明。法的拘束力なし。NOW, THEREFOREの後が本文。WHEREASの部分は「なぜこの契約を結ぶのか」の説明。読むときはサッと目を通すだけでいい。本番はNOW, THEREFOREの後から。',
        difficulty: 'beginner',
        characterIntro: { speaker: 'yuki', text: 'Day 29。今日は契約書で一番怖い条項をやる。ここが読めないと、会社に何千万の損害が出る可能性があるよ。', mood: 'serious' },
        reaction: { speaker: 'lisa', correct: 'WHEREASは前文。ネイティブでも読み飛ばす人がいるくらい、本文じゃないんだよ。', wrong: 'WHEREASは背景説明。法的拘束力はない。NOW, THEREFOREの後からが本番だよ。' },
      },
      // ── y29-ex02: beginner / vocabulary ──
      {
        id: 'y29-ex02',
        type: 'vocabulary',
        passage: {
          text: 'ARTICLE 7 -- LIMITATION OF LIABILITY\n\n7.1 Notwithstanding any other provision of this Agreement, in no event shall either Party be liable for any indirect, incidental, consequential, special, or punitive damages, including but not limited to loss of profits or revenue.',
          sourceType: 'Contract',
          wordCount: 43,
        },
        question: '"Notwithstanding any other provision" の意味は？',
        options: [
          'この契約の他の条項にかかわらず（本条が優先する）',
          'この契約の他の条項に従って',
          'この契約の他の条項を補足して',
          'この契約の他の条項を削除して',
        ],
        answer: 'この契約の他の条項にかかわらず（本条が優先する）',
        jaTranslation: '第7条 -- 責任の制限\n\n7.1 本契約の他のいかなる条項にもかかわらず、いかなる場合も、いずれの当事者も、利益または収益の損失を含むがこれに限定されない、間接的、付随的、結果的、特別、または懲罰的損害について責任を負わない。',
        trap: 'Notwithstandingは「〜にもかかわらず」。つまり他の条項で何が書いてあっても、この条項が優先するという上書きカード。日本人はnot+with+standingで分解しようとして迷子になる。丸ごと覚えるしかない。',
        tip: 'Notwithstanding=最強の上書きカード。「他に何が書いてあっても、この条項が勝つ」。契約書でNotwithstandingが出てきたら、その条項は超重要。赤ペンで三重線を引け。',
        difficulty: 'beginner',
        reaction: { speaker: 'master', correct: 'Notwithstandingが読めた。これで契約書の地雷の半分は見えるようになった。', wrong: 'Notwithstanding=「〜にもかかわらず」。他の条項を上書きする最強カード。覚えろ。' },
      },
      // ── y29-ex03: beginner / truefalse ──
      {
        id: 'y29-ex03',
        type: 'truefalse',
        passage: {
          text: 'ARTICLE 10 -- FORCE MAJEURE\n\n10.1 Neither Party shall be liable for any failure or delay in performance due to causes beyond its reasonable control, including but not limited to: natural disasters, war, terrorism, epidemics, government actions, or labor disputes.\n\n10.2 The affected Party shall notify the other Party within seven (7) days of the occurrence of a Force Majeure event.',
          sourceType: 'Contract',
          wordCount: 60,
        },
        question: '地震で工事が遅れた場合、コントラクターは契約違反で罰せられる。',
        options: ['True', 'False'],
        answer: 'False',
        jaTranslation: '第10条 -- 不可抗力\n\n10.1 いずれの当事者も、自然災害、戦争、テロ、疫病、政府の措置、労働争議を含むがこれに限定されない、合理的な制御を超えた原因による不履行または遅延について責任を負わない。\n\n10.2 影響を受けた当事者は、不可抗力事象の発生から7日以内に相手方に通知しなければならない。',
        trap: 'natural disastersが明記されてるから地震は不可抗力。ただし10.2の通知義務(7日以内)を忘れると保護されない可能性がある。True/Falseの問題では「条件付きFalse」が多い。不可抗力でも通知義務は残る。',
        tip: 'Force Majeure=不可抗力。天災や戦争など人間の力ではどうしようもないこと。この条項があれば「あなたのせいじゃないから罰しない」。ただし通知義務(notification)は別。7 days以内に知らせろ、は守らないとダメ。',
        difficulty: 'beginner',
        reaction: { speaker: 'kenji', correct: 'Force Majeure...うちの建設業界でも大事な概念だ。台風で工期遅れるとき使うやつだな。', wrong: 'natural disastersはForce Majeure(不可抗力)に含まれてる。地震は自然災害だから罰されない。' },
      },
      // ── y29-ex04: growing / main_idea ──
      {
        id: 'y29-ex04',
        type: 'main_idea',
        passage: {
          text: 'ARTICLE 11 -- INDEMNIFICATION\n\n11.1 The Contractor shall indemnify, defend, and hold harmless the Client and its officers, directors, employees, and agents from and against any and all claims, damages, losses, costs, and expenses (including reasonable attorney fees) arising out of or resulting from the Contractor\'s negligence or willful misconduct in the performance of the Services.',
          sourceType: 'Contract',
          wordCount: 56,
        },
        question: 'この条項が意味するのは？',
        options: [
          'コントラクターの過失による損害はコントラクターが全て補償する',
          'クライアントがコントラクターの法的費用を負担する',
          '両者が損害を折半する',
          '保険会社が全てカバーする',
        ],
        answer: 'コントラクターの過失による損害はコントラクターが全て補償する',
        jaTranslation: '第11条 -- 補償\n\n11.1 コントラクターは、本業務の遂行におけるコントラクターの過失または故意の不正行為に起因しまたはその結果として生じる、一切の請求、損害、損失、費用および経費（合理的な弁護士費用を含む）について、クライアントならびにその役員、取締役、従業員および代理人を補償し、防御し、免責するものとする。',
        trap: 'indemnify, defend, and hold harmlessは3つで1セット。「補償し、防御し、免責する」。日本人はindemnifyを知らない人が多いが、これは「損害賠償する」。しかもincluding reasonable attorney fees(弁護士費用含む)。つまり訴訟費用もコントラクター持ち。',
        tip: 'indemnify=補償する。defend=防御する。hold harmless=免責する。この3点セットが出てきたら「何かあったら全部あなたが責任取りますよ」という条項。どっちが主語(indemnifyする側)かを必ず確認しろ。',
        difficulty: 'growing',
        reaction: { speaker: 'yuki', correct: 'indemnifyの意味が取れたね。この条項が読めなかったら、何千万の損害を知らないうちに背負うことになる。', wrong: 'The Contractorが主語。shall indemnify the Client。コントラクターがクライアントを補償する。コントラクター側の責任条項だよ。' },
      },
      // ── y29-ex05: growing / scan ──
      {
        id: 'y29-ex05',
        type: 'scan',
        passage: {
          text: 'ARTICLE 7 -- LIMITATION OF LIABILITY (continued)\n\n7.2 The total aggregate liability of the Contractor under this Agreement shall not exceed the total fees actually paid to the Contractor under this Agreement.\n\n7.3 The limitations set forth in this Article 7 shall not apply to: (a) the Contractor\'s indemnification obligations under Article 11; (b) breach of confidentiality obligations under Article 8; or (c) willful misconduct or gross negligence.',
          sourceType: 'Contract',
          wordCount: 68,
        },
        question: '責任制限が適用されないのはどれ？',
        options: [
          '秘密保持違反',
          '軽微な納期遅延',
          '予算の超過',
          'コミュニケーションの不足',
        ],
        answer: '秘密保持違反',
        jaTranslation: '第7条 -- 責任の制限(続き)\n\n7.2 本契約に基づくコントラクターの合計責任総額は、本契約に基づきコントラクターに実際に支払われた報酬総額を超えないものとする。\n\n7.3 本第7条に定める制限は以下には適用されない: (a) 第11条に基づくコントラクターの補償義務、(b) 第8条に基づく秘密保持義務の違反、(c) 故意の不正行為または重大な過失。',
        trap: '7.3の"shall not apply to"がポイント。制限が「適用されない」ケースのリスト。(b)にbreach of confidentiality obligations(秘密保持義務の違反)がある。つまり秘密保持を破ったら責任制限の天井なし=青天井。',
        tip: 'shall not apply to=適用されない。制限条項の「例外リスト」は最も怖い部分。ここに書いてあることは制限なしの全額責任。契約書を読むときは、制限条項の本文よりも例外リストの方を重点的に読め。',
        difficulty: 'growing',
        reaction: { speaker: 'master', correct: '例外リストが読めた。制限の例外=青天井の責任。ここが契約書で最も危険な場所だ。', wrong: '7.3を見ろ。shall not apply to(b) breach of confidentiality。秘密保持違反は制限の例外。つまり全額責任だ。' },
      },
      // ── y29-ex06: growing / vocabulary ──
      {
        id: 'y29-ex06',
        type: 'vocabulary',
        passage: {
          text: 'ARTICLE 12 -- INSURANCE\n\n12.1 The Contractor shall maintain, at its own expense, the following insurance coverage throughout the Term:\n  (a) Commercial general liability insurance with a minimum coverage of USD 2,000,000 per occurrence;\n  (b) Professional liability (errors and omissions) insurance with a minimum coverage of USD 1,000,000 per claim;\n  (c) Workers\' compensation insurance as required by applicable law.',
          sourceType: 'Contract',
          wordCount: 62,
        },
        question: '"errors and omissions" の意味は？',
        options: [
          '過失および怠慢（専門家の業務ミス）',
          '文書の誤字と脱字',
          '製品の欠陥と不良',
          '計算ミスと記入漏れ',
        ],
        answer: '過失および怠慢（専門家の業務ミス）',
        jaTranslation: '第12条 -- 保険\n\n12.1 コントラクターは、自己の費用で、期間を通じて以下の保険を維持するものとする:\n  (a) 1事故あたり最低200万米ドルの商業一般賠償責任保険\n  (b) 1請求あたり最低100万米ドルの専門職業賠償責任(過失および怠慢)保険\n  (c) 適用法で求められる労災保険',
        trap: 'errors and omissionsを直訳すると「間違いと省略」だが、法律・保険の用語では「専門家の過失と怠慢」。文書の誤字脱字と勘違いする人が多い。Professional liability(専門家賠償責任)の括弧内にあるからプロの業務ミスのこと。',
        tip: 'errors and omissions(E&O)は保険業界の定番用語。設計ミスや検査漏れなど、プロの仕事のミスをカバーする保険。建設業界では超重要。日本語では「E&O保険」とそのまま使うことも多い。',
        difficulty: 'growing',
        reaction: { speaker: 'kenji', correct: 'E&O保険か。うちの設計事務所でも入ってるやつだ。英語でこう書くのか。', wrong: 'errorsは「間違い」、omissionsは「省略」が直訳だけど、ここではプロの業務ミスの保険用語。文脈で意味が変わる。' },
      },
      // ── y29-ex07: growing / inference ──
      {
        id: 'y29-ex07',
        type: 'inference',
        passage: {
          text: 'ARTICLE 13 -- REPRESENTATIONS AND WARRANTIES\n\n13.1 Each Party represents and warrants that:\n  (a) it has the full power and authority to enter into this Agreement;\n  (b) the execution and performance of this Agreement does not conflict with any other agreement to which it is a party;\n  (c) it shall comply with all applicable laws and regulations in the performance of its obligations.',
          sourceType: 'Contract',
          wordCount: 62,
        },
        question: 'もしコントラクターが別の会社と競合する契約を結んでいた場合、この条項のどれに違反する？',
        options: [
          '(b) 他の契約と矛盾しないという保証',
          '(a) 権限に関する保証',
          '(c) 法令遵守の保証',
          'どれにも違反しない',
        ],
        answer: '(b) 他の契約と矛盾しないという保証',
        jaTranslation: '第13条 -- 表明および保証\n\n13.1 各当事者は以下を表明し保証する:\n  (a) 本契約を締結するための完全な権限と権能を有すること\n  (b) 本契約の締結および履行が、当事者が当事者である他のいかなる契約とも矛盾しないこと\n  (c) 義務の履行にあたり、全ての適用法規を遵守すること',
        trap: '(b)のdoes not conflict with any other agreement。競合契約があるなら「矛盾する」。represents and warrantsは「表明し保証する」。嘘だったら保証違反。日本人はrepresent=「代表する」と思いがちだが、法律用語では「表明する」。',
        tip: 'represents and warrants(表明および保証)は「これが真実だと約束する」という意味。嘘だったら契約違反。(a)(b)(c)はそれぞれ違う内容を保証してる。何を保証してるかを正確に読み取れ。',
        difficulty: 'growing',
        reaction: { speaker: 'yuki', correct: 'conflict with any other agreement。「他の契約と矛盾しない」という保証。競合契約はこれに抵触する。', wrong: '(b)を見て。does not conflict with any other agreement=他の契約と矛盾しない。競合契約があったらこの保証に違反するよ。' },
      },
      // ── y29-ex08: challenge / main_idea ──
      {
        id: 'y29-ex08',
        type: 'main_idea',
        passage: {
          text: 'ARTICLE 14 -- DISPUTE RESOLUTION\n\n14.1 The Parties shall first attempt to resolve any dispute through good faith negotiation.\n\n14.2 If the dispute is not resolved within thirty (30) days, the Parties shall submit the dispute to mediation administered by the Singapore Mediation Centre.\n\n14.3 If mediation fails to resolve the dispute within sixty (60) days, either Party may refer the dispute to binding arbitration under the rules of the Singapore International Arbitration Centre (SIAC). The arbitral award shall be final and binding on both Parties.',
          sourceType: 'Contract',
          wordCount: 90,
        },
        question: 'この紛争解決条項の構造は？',
        options: [
          '3段階エスカレーション: 交渉 → 調停 → 仲裁',
          '2段階: 交渉 → 裁判',
          '1段階: 即座に仲裁',
          '4段階: 交渉 → 調停 → 仲裁 → 裁判',
        ],
        answer: '3段階エスカレーション: 交渉 → 調停 → 仲裁',
        jaTranslation: '第14条 -- 紛争解決\n\n14.1 両当事者はまず誠実な交渉により紛争の解決を試みるものとする。\n\n14.2 30日以内に紛争が解決されない場合、両当事者はシンガポール調停センターが管理する調停に紛争を付するものとする。\n\n14.3 調停で60日以内に紛争が解決されない場合、いずれの当事者もシンガポール国際仲裁センター(SIAC)の規則に基づく拘束力のある仲裁に紛争を付すことができる。仲裁判断は最終的なものであり両当事者を拘束する。',
        trap: 'negotiation → mediation → arbitration。3段階。裁判(litigation/court)は出てこない。日本人は紛争=裁判と思いがちだが、国際契約では仲裁(arbitration)が最終手段であることが多い。仲裁判断はfinal and binding(最終的で拘束力あり)=もう争えない。',
        tip: '紛争解決条項は「エスカレーション」の構造を見る。1段目は何か、2段目は何か、最終手段は何か。14.1→14.2→14.3と番号が上がるにつれて手段が強くなる。看板やメニューと同じで「構造」を読め。',
        difficulty: 'challenge',
        reaction: { speaker: 'master', correct: 'エスカレーション構造。メニューの階層、メールの構造、全部同じだ。「構造を読む」力が完成しつつある。', wrong: '14.1、14.2、14.3。3段階だ。negotiation→mediation→arbitration。番号順に見ろ。' },
      },
      // ── y29-ex09: challenge / scan ──
      {
        id: 'y29-ex09',
        type: 'scan',
        passage: {
          text: 'ARTICLE 15 -- GENERAL PROVISIONS\n\n15.1 Amendment. No modification or amendment of this Agreement shall be valid unless made in writing and signed by both Parties.\n\n15.2 Entire Agreement. This Agreement constitutes the entire agreement between the Parties and supersedes all prior negotiations, representations, and agreements, whether written or oral.\n\n15.3 Severability. If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.\n\n15.4 Waiver. The failure of either Party to enforce any right under this Agreement shall not constitute a waiver of such right.',
          sourceType: 'Contract',
          wordCount: 91,
        },
        question: '過去にメールでやりとりした口約束は、この契約書に影響を与えるか？',
        options: [
          'いいえ、15.2により本契約が過去の全合意に優先する',
          'はい、メールは書面なので有効',
          '場合による',
          'メールの内容が正しければ有効',
        ],
        answer: 'いいえ、15.2により本契約が過去の全合意に優先する',
        jaTranslation: '第15条 -- 一般条項\n\n15.1 修正。本契約の修正または変更は、書面で作成され両当事者が署名しない限り有効としない。\n\n15.2 完全合意。本契約は両当事者間の完全な合意を構成し、書面または口頭を問わず、従前の全ての交渉、表明、合意に優先する。\n\n15.3 可分性。本契約のいずれかの条項が無効または執行不能と判断された場合、残りの条項は完全に有効に存続する。\n\n15.4 権利放棄。いずれかの当事者が本契約に基づく権利を行使しなかったとしても、当該権利の放棄を構成しない。',
        trap: '15.2 Entire Agreement(完全合意条項)。supersedes all prior negotiations, representations, and agreements, whether written or oral。過去のメール、口約束、議事録、全てがこの契約書で上書きされる。日本人は「メールで確認したから大丈夫」と思いがちだが、この条項がある限り過去のやりとりは無意味。',
        tip: 'Entire Agreement=完全合意。「この契約書が全て。過去のメールも口約束もチャラ」。supersedes(上書きする)が鍵。だから契約書に書いてない条件は存在しないのと同じ。大事な条件は全て契約書本文に入れろ。',
        difficulty: 'challenge',
        reaction: { speaker: 'kenji', correct: 'supersedes...上書きか。メールで約束してたことも、契約書に入ってなきゃ意味ないのか。怖いな。', wrong: '15.2を見ろ。supersedes all prior...whether written or oral。メールだろうが口約束だろうが、全て上書きだ。' },
      },
      // ── y29-ex10: challenge / inference ──
      {
        id: 'y29-ex10',
        type: 'inference',
        passage: {
          text: 'ARTICLE 7 -- LIMITATION OF LIABILITY (continued)\n\n7.4 Notwithstanding Section 7.2, the Client\'s liability for late payment shall be limited to the interest charges specified in Section 3.4 and shall not be subject to the aggregate liability cap.\n\n7.5 Each Party acknowledges that it has had the opportunity to negotiate the terms of this Article and that the limitations set forth herein reflect a fair and reasonable allocation of risk between the Parties.',
          sourceType: 'Contract',
          wordCount: 72,
        },
        question: '7.5が入っている実務的な理由は何か？',
        options: [
          '後から「不公平だ」と主張して責任制限を無効にすることを防ぐため',
          '両者が弁護士に相談したことを証明するため',
          '保険会社への報告義務を果たすため',
          '契約書のページ数を増やすため',
        ],
        answer: '後から「不公平だ」と主張して責任制限を無効にすることを防ぐため',
        jaTranslation: '第7条 -- 責任の制限(続き)\n\n7.4 第7.2条にかかわらず、遅延支払いに対するクライアントの責任は第3.4条に規定する利息に限定され、責任総額の上限の対象外とする。\n\n7.5 各当事者は、本条の条件を交渉する機会を得たこと、および本条に定める制限が両当事者間のリスクの公正かつ合理的な配分を反映していることを認める。',
        trap: '7.5は「交渉する機会があった」「公正かつ合理的」と書いてある。これは法的な防衛線。一方的に押し付けられたと後から主張させないための条項。acknowledges(認める)は「認めたよな？文句言うなよ」の法律用語版。日本人には読んでも意図が見えにくい。',
        tip: 'acknowledgesが出てきたら「後で文句言わせない」条項。契約書の裏の意図を読む力が実務では一番大事。文法や単語の問題じゃない。「なぜこの条項があるのか」を考えろ。',
        difficulty: 'challenge',
        reaction: { speaker: 'master', correct: '裏の意図まで読めた。単語じゃなく意図を読む。30日間の集大成だな。', wrong: '7.5は「交渉の機会があった」と書いてある。なぜわざわざそんなことを書くか？後から「不公平だ」と言わせないためだ。' },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────
  // Day 30: 最終テスト -- 契約書を読んでサインする
  // THE FINAL DAY -- Kenji reads and signs the actual contract
  // ─────────────────────────────────────────────────────────
  {
    day: 30,
    phase: 3,
    theme: '最終テスト -- 契約書を読んでサインする',
    themeEn: 'Final: Read and Sign the Contract',
    hook: 'ケンジ、30日前のお前はOPENとCLOSEDから始めた。今日、契約書にサインする。',
    rule: '30日間で看板からメニュー、メール、仕様書、そして契約書まで読めるようになった。これが「読める脳」。単語力じゃない。構造を見抜く力だ。ケンジ、サインしろ。お前はもう読める。',
    exercises: [
      // ── y30-ex01: beginner / scan ──
      {
        id: 'y30-ex01',
        type: 'scan',
        passage: {
          text: 'CONSTRUCTION SERVICES AGREEMENT\n\nBetween:\nIwasaki Construction Co., Ltd. ("Iwasaki" or "Client")\n1-23-4 Nishi-Shinjuku, Shinjuku-ku, Tokyo 160-0023, Japan\n\nAnd:\nMekong Building Solutions Co., Ltd. ("MBS" or "Contractor")\n88 Wireless Road, Lumpini, Pathumwan, Bangkok 10330, Thailand\n\nDate: January 15, 2026\nContract No.: IWS-MBS-2026-001',
          sourceType: 'Contract',
          wordCount: 52,
        },
        question: 'コントラクターの所在地はどこ？',
        options: ['バンコク、タイ', '東京、日本', 'シンガポール', 'ホーチミン、ベトナム'],
        answer: 'バンコク、タイ',
        jaTranslation: '建設業務委託契約書\n\n当事者:\nイワサキ建設株式会社（「イワサキ」または「クライアント」）\n東京都新宿区西新宿1-23-4 〒160-0023\n\nおよび:\nメコン・ビルディング・ソリューションズ株式会社（「MBS」または「コントラクター」）\nタイ王国バンコク パトゥムワン区 ルンピニ ワイヤレスロード88 10330\n\n日付: 2026年1月15日\n契約番号: IWS-MBS-2026-001',
        trap: '2つの会社が並ぶとどっちがどっちか混乱する。Contractor=MBS=バンコク。Client=Iwasaki=東京。Day 28で学んだ括弧の定義を使う。ここで間違える人は30日前に戻って看板からやり直せ。',
        tip: 'Day 1で看板の構造を覚えた。Day 28で括弧の定義を覚えた。今日はその全てを使う。契約書の表紙は名刺と同じ。誰が誰か、どこにいるかを確認するだけ。',
        difficulty: 'beginner',
        characterIntro: { speaker: 'master', text: 'ケンジ。これがお前の会社の契約書だ。本物だ。30日前、お前はOPENの看板から始めた。今日、ここにサインする。さぁ読め。', mood: 'serious' },
        reaction: { speaker: 'kenji', correct: 'バンコク...本当に俺の会社の契約書だ。住所まで読めるようになったんだな。', wrong: 'And:の後がコントラクター。Bangkok 10330 Thailand。バンコク、タイだ。Day 28でやっただろ。' },
      },
      // ── y30-ex02: beginner / vocabulary ──
      {
        id: 'y30-ex02',
        type: 'vocabulary',
        passage: {
          text: 'RECITALS\n\nWHEREAS, Iwasaki is a licensed construction company specializing in commercial and industrial building projects in the Asia-Pacific region;\n\nWHEREAS, MBS possesses specialized expertise in tropical climate structural engineering and seismic reinforcement techniques;\n\nWHEREAS, Iwasaki desires to engage MBS for a commercial warehouse facility project located in the Eastern Seaboard Industrial Estate, Chonburi Province, Thailand;',
          sourceType: 'Contract',
          wordCount: 60,
        },
        question: 'MBSの専門分野は？',
        options: [
          '熱帯気候の構造エンジニアリングと耐震補強技術',
          'アジア太平洋地域の商業建築',
          '倉庫施設の設計と建設',
          '不動産開発と投資',
        ],
        answer: '熱帯気候の構造エンジニアリングと耐震補強技術',
        jaTranslation: '前文\n\nイワサキはアジア太平洋地域における商業用および工業用建築プロジェクトを専門とする許認可建設会社であり、\n\nMBSは熱帯気候の構造エンジニアリングおよび耐震補強技術に特化した専門知識を有しており、\n\nイワサキはタイ・チョンブリ県の東部臨海工業団地に所在する商業用倉庫施設プロジェクトのためにMBSを起用することを希望する。',
        trap: 'WHEREASが3つ並ぶ。2つ目のWHEREASがMBSの説明。tropical climate structural engineering(熱帯気候の構造エンジニアリング)とseismic reinforcement techniques(耐震補強技術)。Day 29でWHEREASは前文だと学んだ。前文でも情報の整理には使える。',
        tip: 'Day 29で「WHEREASは前文=背景説明」と学んだ。法的拘束力はないけど、当事者の情報が詰まってる。WHEREASごとに誰の説明かを把握しろ。1つ目=Iwasaki、2つ目=MBS、3つ目=プロジェクト。',
        difficulty: 'beginner',
        reaction: { speaker: 'yuki', correct: 'WHEREASの使い方、昨日より速く読めたね。成長してる。', wrong: '2つ目のWHEREASを見て。MBS possesses specialized expertise in...の後がMBSの専門分野だよ。' },
      },
      // ── y30-ex03: beginner / truefalse ──
      {
        id: 'y30-ex03',
        type: 'truefalse',
        passage: {
          text: 'ARTICLE 2 -- SCOPE OF WORK\n\n2.1 MBS shall provide the following services:\n  (a) Structural design for a 5,000 sqm warehouse with loading dock;\n  (b) Foundation engineering suitable for soft clay soil conditions;\n  (c) Seismic reinforcement design to Zone 2 standards;\n  (d) On-site supervision during foundation and steel erection phases;\n  (e) As-built documentation in both English and Thai.\n\n2.2 Interior finishing, MEP systems, and landscaping are expressly excluded from the Scope of Work.',
          sourceType: 'Contract',
          wordCount: 78,
        },
        question: 'MEP設備工事はMBSの業務範囲に含まれる。',
        options: ['True', 'False'],
        answer: 'False',
        jaTranslation: '第2条 -- 業務範囲\n\n2.1 MBSは以下の業務を提供する:\n  (a) 荷下ろしドック付き5,000平方メートル倉庫の構造設計\n  (b) 軟弱粘土地盤条件に適した基礎エンジニアリング\n  (c) ゾーン2基準に準拠した耐震補強設計\n  (d) 基礎工事および鉄骨建方フェーズの現場監督\n  (e) 英語およびタイ語による竣工図書\n\n2.2 内装仕上げ、MEPシステム、および造園は業務範囲から明示的に除外される。',
        trap: '2.2のexpressly excluded(明示的に除外)を見落とすと間違える。2.1の(a)-(e)を読んで「含まれてない」と判断するだけでなく、2.2で「除外」と明示されている。日本人は含まれるものリストだけ読んで、除外リストを見ない。',
        tip: '業務範囲条項は「含まれるもの」と「含まれないもの」の両方を読め。expressly excluded=明示的に除外。ここに書いてあることは絶対にやらない。追加するならDay 28で学んだ通りseparate written agreementが必要。',
        difficulty: 'beginner',
        reaction: { speaker: 'kenji', correct: 'expressly excluded...明示的に除外か。含まれないものリストも読まなきゃダメなんだな。建設現場と同じだ。', wrong: '2.2を見ろ。MEP systems are expressly excluded。「明示的に除外」だ。含まれない。' },
      },
      // ── y30-ex04: growing / scan ──
      {
        id: 'y30-ex04',
        type: 'scan',
        passage: {
          text: 'ARTICLE 3 -- CONTRACT PRICE AND PAYMENT\n\n3.1 Total Contract Price: USD 420,000\n\n3.2 Payment Schedule:\n  Milestone 1: Site survey report -- USD 126,000 (30%) -- Due: Feb 14, 2026\n  Milestone 2: Preliminary design approval -- USD 84,000 (20%) -- Due: Apr 15, 2026\n  Milestone 3: Final design package -- USD 84,000 (20%) -- Due: Jul 15, 2026\n  Milestone 4: Construction supervision -- USD 84,000 (20%) -- Due: Oct 15, 2026\n  Milestone 5: As-built documentation -- USD 42,000 (10%) -- Due: Dec 15, 2026\n\n3.3 Payment Terms: Net 15 business days from invoice date.',
          sourceType: 'Contract',
          wordCount: 91,
        },
        question: '最も大きい支払いはどのマイルストーン？',
        options: ['Milestone 1 (現地調査報告)', 'Milestone 2 (予備設計承認)', 'Milestone 3 (最終設計)', 'Milestone 5 (竣工図書)'],
        answer: 'Milestone 1 (現地調査報告)',
        jaTranslation: '第3条 -- 契約金額および支払い\n\n3.1 契約金額合計: 420,000米ドル\n\n3.2 支払いスケジュール:\n  マイルストーン1: 現地調査報告 -- 126,000米ドル(30%) -- 期限: 2026年2月14日\n  マイルストーン2: 予備設計承認 -- 84,000米ドル(20%) -- 期限: 2026年4月15日\n  マイルストーン3: 最終設計パッケージ -- 84,000米ドル(20%) -- 期限: 2026年7月15日\n  マイルストーン4: 施工監理 -- 84,000米ドル(20%) -- 期限: 2026年10月15日\n  マイルストーン5: 竣工図書 -- 42,000米ドル(10%) -- 期限: 2026年12月15日\n\n3.3 支払い条件: 請求書日付から15営業日以内',
        trap: 'Milestone 1が30%(126,000ドル)で最大。Milestone 2-4は全て20%(84,000ドル)。Milestone 5が10%(42,000ドル)。数字が5つ並ぶとパニックになるが、Day 1の看板の計算問題と同じ。パーセンテージを比較するだけ。',
        tip: '支払いスケジュールは%か金額を比較するだけ。5つ並んでもびびるな。30%が一番大きい。それがMilestone 1。Day 28で分割支払いの読み方を学んだ。構造は同じだ。',
        difficulty: 'growing',
        reaction: { speaker: 'master', correct: '5つのマイルストーンをスキャンして最大値を見つけた。Day 1の駐車場の料金計算と同じ技術だ。', wrong: '30% > 20% > 10%。数字を比較するだけだ。Milestone 1の126,000ドルが最大。焦るな、計算しろ。' },
      },
      // ── y30-ex05: growing / main_idea ──
      {
        id: 'y30-ex05',
        type: 'main_idea',
        passage: {
          text: 'ARTICLE 6 -- WARRANTIES AND DEFECT LIABILITY\n\n6.1 MBS warrants that all Services shall be performed in a professional and workmanlike manner, consistent with generally accepted industry standards.\n\n6.2 MBS shall correct, at its own cost, any defects in the deliverables discovered within twelve (12) months from the date of final acceptance ("Defect Liability Period").\n\n6.3 The Client shall notify MBS in writing of any defect within thirty (30) days of discovery. MBS shall commence corrective action within fourteen (14) days of receiving such notice.',
          sourceType: 'Contract',
          wordCount: 90,
        },
        question: 'この条項でクライアント(イワサキ)を最も強く守っているのは？',
        options: [
          '12ヶ月間の欠陥責任期間でMBSが無償修正する義務',
          'MBSが業界標準に従う約束',
          'クライアントの通知義務',
          'MBSが14日以内に対応する義務',
        ],
        answer: '12ヶ月間の欠陥責任期間でMBSが無償修正する義務',
        jaTranslation: '第6条 -- 保証および欠陥責任\n\n6.1 MBSは全ての業務がプロフェッショナルかつ熟練した方法で、一般に認められた業界標準に一致して遂行されることを保証する。\n\n6.2 MBSは、最終受領日から12ヶ月以内（「欠陥責任期間」）に発見された成果物の欠陥を、自己の費用で修正するものとする。\n\n6.3 クライアントは発見から30日以内に書面でMBSに欠陥を通知するものとする。MBSは当該通知の受領から14日以内に是正措置を開始するものとする。',
        trap: '6.1の業界標準、6.2の12ヶ月無償修正、6.3の14日対応。全てクライアントを守る条項だが、最も強力なのは6.2。12ヶ月間=1年間、at its own cost=MBS持ち。金銭的インパクトが最も大きい。',
        tip: '保証条項は「期間」と「費用負担」を見ろ。twelve (12) months + at its own cost。1年間、MBSが自腹で直す。これが実質的に一番強い保護。期間と費用の2つを確認する癖をつけろ。',
        difficulty: 'growing',
        reaction: { speaker: 'kenji', correct: '12ヶ月の欠陥責任...建設業界では当たり前の概念だけど、英語で読めるとは思わなかった。', wrong: '6.2を読め。twelve (12) months、at its own cost。12ヶ月間、MBS持ちで直す。これが一番強い保護だ。' },
      },
      // ── y30-ex06: growing / vocabulary ──
      {
        id: 'y30-ex06',
        type: 'vocabulary',
        passage: {
          text: 'ARTICLE 9 -- TERMINATION\n\n9.1 Either Party may terminate this Agreement for cause if the other Party:\n  (a) commits a material breach and fails to cure such breach within thirty (30) days after receiving written notice; or\n  (b) becomes insolvent, files for bankruptcy, or has a receiver appointed.\n\n9.2 Upon termination, MBS shall be compensated for all Services satisfactorily performed up to the date of termination, less any damages suffered by the Client.',
          sourceType: 'Contract',
          wordCount: 76,
        },
        question: '"material breach" の意味は？',
        options: [
          '重大な契約違反',
          '材料の破損',
          '物質的な破壊',
          '部分的な違反',
        ],
        answer: '重大な契約違反',
        jaTranslation: '第9条 -- 解除\n\n9.1 いずれの当事者も、相手方が以下に該当する場合、正当な理由により本契約を解除できる:\n  (a) 重大な契約違反を犯し、書面による通知受領後30日以内に当該違反を是正しない場合\n  (b) 支払い不能に陥り、破産を申請し、または管財人が選任された場合\n\n9.2 解除時、MBSは解除日までに満足に遂行された全業務について、クライアントが被った損害を差し引いた額の報酬を受ける。',
        trap: 'materialを「材料の」と訳すのは直訳の罠。法律英語のmaterialは「重要な」「重大な」。material breach=重大な契約違反。Day 1で学んだ「同じ単語が文脈で意味が変わる」の最重要例。',
        tip: 'materialは文脈で意味が変わる最重要単語の1つ。建設現場: material=材料。契約書: material=重大な。material breach=重大な違反、material change=重要な変更。契約書でmaterialを見たら「重大な」と読め。',
        difficulty: 'growing',
        reaction: { speaker: 'lisa', correct: 'material=材料じゃなくて「重大な」。契約書でこれを間違えると致命的だよ。読めたね。', wrong: 'materialは契約書では「重大な」。建設現場の「材料」とは全然違う意味。文脈で切り替えて。' },
      },
      // ── y30-ex07: growing / inference ──
      {
        id: 'y30-ex07',
        type: 'inference',
        passage: {
          text: 'ARTICLE 10 -- LIMITATION OF LIABILITY\n\n10.1 Notwithstanding any other provision of this Agreement, the total aggregate liability of either Party shall not exceed the Total Contract Price.\n\n10.2 In no event shall either Party be liable for indirect, incidental, or consequential damages.\n\n10.3 The limitations in this Article shall not apply to: (a) indemnification obligations under Article 8; (b) breach of confidentiality under Article 7; (c) willful misconduct or fraud; or (d) personal injury or death caused by negligence.',
          sourceType: 'Contract',
          wordCount: 82,
        },
        question: 'MBSの過失で作業員が怪我をした場合、42万ドルの責任上限は適用されるか？',
        options: [
          '適用されない。10.3(d)で人身傷害は例外とされている',
          '適用される。42万ドルまでが上限',
          '保険でカバーされるので関係ない',
          '契約書に記載がない',
        ],
        answer: '適用されない。10.3(d)で人身傷害は例外とされている',
        jaTranslation: '第10条 -- 責任の制限\n\n10.1 本契約の他のいかなる条項にもかかわらず、いずれの当事者の責任総額も契約金額合計を超えないものとする。\n\n10.2 いかなる場合も、いずれの当事者も間接的、付随的、または結果的損害について責任を負わない。\n\n10.3 本条の制限は以下には適用されない: (a) 第8条に基づく補償義務、(b) 第7条に基づく秘密保持違反、(c) 故意の不正行為または詐欺、(d) 過失による人身傷害または死亡。',
        trap: 'Day 29で学んだ「例外リスト」のパターン。10.3(d)にpersonal injury or death caused by negligence(過失による人身傷害または死亡)。制限が適用されない=青天井の責任。建設業界では人身事故が最大リスク。この例外を見落としたら命に関わる。',
        tip: 'Day 29の復習。shall not apply to=例外リスト。(d)のpersonal injury or death。人の命に関わる問題には責任上限がない。これは世界共通の原則。契約書の制限条項は必ず例外リストを確認しろ。',
        difficulty: 'growing',
        reaction: { speaker: 'master', correct: 'Day 29で学んだ例外リストのパターンを使えた。成長してるぞ、ケンジ。', wrong: '10.3(d)を見ろ。personal injury or death。人身事故は制限の例外だ。Day 29でやった「例外リスト」と同じ構造だ。' },
      },
      // ── y30-ex08: challenge / scan ──
      {
        id: 'y30-ex08',
        type: 'scan',
        passage: {
          text: 'ARTICLE 14 -- SPECIAL CONDITIONS\n\n14.1 Language. All formal communications shall be in English. Working-level communications may be in English, Japanese, or Thai, provided that any legally binding communication shall be confirmed in English within five (5) business days.\n\n14.2 Currency Fluctuation. If the USD/THB exchange rate fluctuates by more than 10% from the rate on the Effective Date (34.5 THB/USD), either Party may request a good faith renegotiation of the Contract Price.\n\n14.3 Local Permits. MBS shall be responsible for obtaining all necessary local permits and approvals in Thailand at its own expense.',
          sourceType: 'Contract',
          wordCount: 100,
        },
        question: '契約日のレートから為替が何%以上変動したら価格再交渉を要求できる？',
        options: ['10%', '5%', '15%', '20%'],
        answer: '10%',
        jaTranslation: '第14条 -- 特別条件\n\n14.1 言語。全ての公式な通信は英語とする。実務レベルの通信は英語、日本語、またはタイ語で行うことができるが、法的拘束力のある通信は5営業日以内に英語で確認されるものとする。\n\n14.2 為替変動。USD/THB為替レートが発効日のレート(34.5 THB/USD)から10%を超えて変動した場合、いずれの当事者も契約金額の誠実な再交渉を要求できる。\n\n14.3 現地許認可。MBSは自己の費用でタイにおける全ての必要な現地許認可および承認の取得に責任を負う。',
        trap: 'more than 10%。「10%を超えて」。日本人は「10%以上」と「10%を超えて」を混同しがち。more than=超えて（10%は含まない）。10% or more=10%以上（10%を含む）。契約書では「含むか含まないか」が大違い。',
        tip: 'more than 10% = 10%は含まない。10%ちょうどでは再交渉できない。10.1%から再交渉可能。数字の境界はmore than(超)とnot less than(以上)の違いを意識しろ。',
        difficulty: 'challenge',
        reaction: { speaker: 'takeshi', correct: 'more than 10%か。為替リスクのヘッジ条項まで読めるようになったな。', wrong: '14.2を見ろ。fluctuates by more than 10%。10%を超えたら再交渉。数字を正確に読め。' },
      },
      // ── y30-ex09: challenge / main_idea ──
      {
        id: 'y30-ex09',
        type: 'main_idea',
        passage: {
          text: 'IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.\n\nFor and on behalf of Iwasaki Construction Co., Ltd.:\n\nName: ____________________\nTitle: Director\nDate: ____________________\nSignature: ____________________\n\nFor and on behalf of Mekong Building Solutions Co., Ltd.:\n\nName: Somchai Rattanapong\nTitle: Managing Director\nDate: January 15, 2026\nSignature: [signed]',
          sourceType: 'Contract',
          wordCount: 60,
        },
        question: 'この署名欄で、まだ完了していないのは何か？',
        options: [
          'イワサキ側の署名（名前・日付・サイン全て空欄）',
          'MBS側の署名',
          '両社とも未署名',
          '証人の署名',
        ],
        answer: 'イワサキ側の署名（名前・日付・サイン全て空欄）',
        jaTranslation: '以上の証として、両当事者は上記の日付をもって本契約を締結した。\n\nイワサキ建設株式会社を代表して:\n\n氏名: ____________________\n役職: 取締役\n日付: ____________________\n署名: ____________________\n\nメコン・ビルディング・ソリューションズ株式会社を代表して:\n\n氏名: Somchai Rattanapong\n役職: マネージングディレクター\n日付: 2026年1月15日\n署名: [署名済み]',
        trap: 'MBS側はName, Date, Signatureが全て記入済み。イワサキ側は全て空欄(アンダーバー)。Title: Directorだけ記入されてる。ケンジの役職だ。つまりケンジがサインするのを待っている。これが最終問題への伏線。',
        tip: 'IN WITNESS WHEREOF=「以上の証として」。署名欄(signature block)は契約書の最終ページ。ここが空欄=まだ契約は成立していない。MBSは署名済み。あとはイワサキ側=ケンジのサインだけ。',
        difficulty: 'challenge',
        reaction: { speaker: 'yuki', correct: 'イワサキ側が空欄。つまり...ケンジ、あとはあなたがサインするだけだよ。', wrong: 'MBS側は[signed]って書いてある。イワサキ側は____。空欄だ。ケンジがサインしてない。' },
      },
      // ── y30-ex10: challenge / inference ── THE FINAL EXERCISE
      {
        id: 'y30-ex10',
        type: 'inference',
        passage: {
          text: 'CONSTRUCTION SERVICES AGREEMENT\nContract No.: IWS-MBS-2026-001\n\nThis Agreement, consisting of fifteen (15) Articles and three (3) Appendices, has been reviewed, understood, and accepted by the undersigned representatives of each Party.\n\nTotal Contract Price: USD 420,000\nProject: Commercial Warehouse Facility, Chonburi, Thailand\nTerm: January 15, 2026 -- December 31, 2026\nGoverning Law: Singapore\n\nFor Iwasaki Construction Co., Ltd.:\nName: Kenji Iwasaki\nTitle: Director\nDate: January 15, 2026\nSignature: ____________________',
          sourceType: 'Contract',
          wordCount: 80,
        },
        question: 'ケンジはこの契約書にサインするべきか？ 30日間の学習に基づいて判断せよ。',
        options: [
          'サインできる。15条と3つの付録を理解し、リスクを把握した上でサインする',
          'サインすべきでない。英語力が不十分',
          'サインすべきでない。契約書に問題がある',
          '弁護士に任せてサインしない',
        ],
        answer: 'サインできる。15条と3つの付録を理解し、リスクを把握した上でサインする',
        jaTranslation: '建設業務委託契約書\n契約番号: IWS-MBS-2026-001\n\n本契約は、15条および3つの付録から成り、各当事者の下記署名代表者により確認、理解、受領された。\n\n契約金額合計: 420,000米ドル\nプロジェクト: 商業用倉庫施設、チョンブリ、タイ\n期間: 2026年1月15日 -- 2026年12月31日\n準拠法: シンガポール\n\nイワサキ建設株式会社:\n氏名: イワサキ ケンジ\n役職: 取締役\n日付: 2026年1月15日\n署名: ____________________',
        trap: 'has been reviewed, understood, and accepted(確認し、理解し、受領した)。30日間で契約書の構造を学んだケンジは、この文が何を意味するか理解している。Parties(当事者)、Scope(範囲)、Payment(支払い)、Termination(解除)、Liability(責任)、Force Majeure(不可抗力)、全て読めた。もう「読めない」とは言わせない。',
        tip: '30日前のケンジはOPENとCLOSEDから始めた。今日、15条の契約書を構造で理解できるようになった。単語を全部知ってる必要はない。構造がわかれば、どこに何が書いてあるかがわかる。それが「読める脳」だ。サインしろ、ケンジ。',
        difficulty: 'challenge',
        characterIntro: { speaker: 'master', text: 'ケンジ。最後の問題だ。30日間、お前は逃げなかった。看板、メニュー、メール、仕様書、そして契約書。全部読んできた。...さぁ、答えを出せ。', mood: 'proud' },
        reaction: {
          speaker: 'kenji',
          correct: '...読めた。全部読めた。Day 1でOPENの看板すら自信がなかった俺が、42万ドルの契約書を読んでる。マスター、ユキ、リサ、タケシ、ミナ...ありがとう。サインする。俺はもう「読めない」とは言わない。',
          wrong: 'ここまで来て間違えるか...？いや、いい。30日間で学んだことを思い出せ。構造を見ろ。15 Articles、reviewed、understood、accepted。全部読んできたんだ。もう一回考えろ。',
        },
      },
    ],
  },
];
