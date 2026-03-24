'use client';

import Link from 'next/link';

const T = {
  bg: '#FFFFFF',
  bgSoft: '#FAFAF9',
  bgWarm: '#FFFBEB',
  bgGreen: '#ECFDF5',
  surface: '#FFFFFF',
  gold: '#D4AF37',
  goldLight: '#FDE68A',
  goldBg: 'rgba(212,175,55,0.06)',
  goldBorder: 'rgba(212,175,55,0.18)',
  green: '#10B981',
  greenBg: 'rgba(16,185,129,0.06)',
  greenBorder: 'rgba(16,185,129,0.18)',
  text: '#1C1917',
  textSub: '#57534E',
  textMuted: '#A8A29E',
  border: '#E7E5E4',
  borderLight: '#F5F5F4',
  shadow: '0 2px 8px rgba(0,0,0,0.04)',
};

const RESEARCH = [
  {
    author: 'Erman & Warren',
    year: 2000,
    finding: 'ネイティブの発話の58.6%は、文法から組み立てた文ではなく「定型フレーズ」だった。',
    detail: 'つまりネイティブは「主語 + 動詞 + 目的語」と組み立てて喋ってるわけじゃない。頭の中の棚から、状況に合うフレーズを丸ごと引っ張り出してる。文法力じゃなくて、在庫量が流暢さを決める。',
    accent: T.gold,
  },
  {
    author: 'Lewis',
    year: 1993,
    finding: '言語は「文法化された語彙」であって、「語彙化された文法」ではない。',
    detail: '文法ドリルだけでは自然な英語は出てこない。フレーズを丸ごと覚えるほうが速いし、定着する。文法は後からついてくる。',
    accent: T.green,
  },
  {
    author: 'Krashen',
    year: 1982,
    finding: '不安があると、脳は言語の習得をブロックする（情意フィルター仮説）。',
    detail: 'テストや教科書は不安を上げる。楽しければフィルターが下がって、言語がすっと入ってくる。だからストーリーで学ぶ。居酒屋の会話を聞いてるだけで、フレーズが自然に頭に入る。',
    accent: '#3B82F6',
  },
  {
    author: 'Schmidt',
    year: 1990,
    finding: '言語が身につくには「あ、これ使える」と気づく瞬間が必要（気づき仮説）。',
    detail: 'ただ聞き流すだけじゃダメ。意識的に「このフレーズ、こういう意味なんだ」と気づく瞬間が必要。だからカードで取り出して、解説をつける。気づきの瞬間を設計してる。',
    accent: '#8B5CF6',
  },
  {
    author: 'Nation',
    year: 2001,
    finding: 'ストーリーの中で出会った語彙は、単語帳で覚えた語彙より記憶に残りやすい。',
    detail: 'フレーズにキャラクター、場面、感情がくっつくから。「ユキがフリーズしたあの場面で出てきたやつ」という記憶の紐がつく。単語帳にはこの紐がない。',
    accent: '#F97316',
  },
];

const LEVELS = [
  {
    label: 'Core（核）',
    color: T.gold,
    desc: '最短。通じればいい。旅行はこれで生き残れる。',
    example: 'Beer, please.',
    exampleJa: 'ビールください。',
  },
  {
    label: 'Vibe（空気）',
    color: T.green,
    desc: '自然な言い方。感情が乗る。「英語できる人」に見える。',
    example: "I'll start with a beer.",
    exampleJa: 'まずビールで。',
  },
  {
    label: 'Scene（場面）',
    color: '#3B82F6',
    desc: '場を読んでる感じ。実際にバーで言うやつ。',
    example: 'Let me get a beer to start. Whatever you have on tap.',
    exampleJa: 'とりあえず生で。おすすめので。',
  },
  {
    label: 'Flow（流れ）',
    color: '#8B5CF6',
    desc: 'ネイティブの脳内。人柄が出る。ここまで来たら会話が楽しい。',
    example: 'Beer first. Yeah, just a beer. I need to unwind before I can even think about food.',
    exampleJa: 'まずビール。うん、ビールだけでいい。飯のこと考える前にまず一息つかせて。',
  },
];

const ROADMAP = [
  { month: 1, label: '4月', title: 'サバイバル英語', sub: '挨拶、注文、買い物、移動、気持ち', phrases: 300, cumulative: 300 },
  { month: 2, label: '5月', title: '日常生活', sub: '朝の会話、仕事、天気、趣味、予定', phrases: 300, cumulative: 600 },
  { month: 3, label: '6月', title: '人間関係', sub: '褒める、断る、相談、お礼、謝る', phrases: 300, cumulative: 900 },
  { month: 4, label: '7月', title: '仕事と社会', sub: '会議、電話、メール、プレゼン、雑談', phrases: 300, cumulative: 1200 },
  { month: 5, label: '8月', title: '旅行と文化', sub: '空港、ホテル、観光、トラブル、SNS', phrases: 300, cumulative: 1500 },
  { month: 6, label: '9月', title: '意見と議論', sub: '賛成、反対、提案、説得、妥協', phrases: 300, cumulative: 1800 },
  { month: 7, label: '10月', title: 'ユーモアと表現', sub: 'ジョーク、皮肉、比喩、慣用句', phrases: 300, cumulative: 2100 },
  { month: 8, label: '11月', title: '感情と機微', sub: '怒り、喜び、悲しみ、驚き、微妙な気持ち', phrases: 300, cumulative: 2400 },
  { month: 9, label: '12月', title: '交渉と説明', sub: '値段交渉、条件提示、理由説明', phrases: 300, cumulative: 2700 },
  { month: 10, label: '1月', title: 'ストーリーテリング', sub: '思い出、体験談、面白い話、オチ', phrases: 300, cumulative: 3000 },
  { month: 11, label: '2月', title: '専門と応用', sub: 'IT、医療、法律、教育、専門用語', phrases: 300, cumulative: 3300 },
  { month: 12, label: '3月', title: 'マスター', sub: '全分野の総仕上げ。英語で自分を出す。', phrases: 350, cumulative: 3650 },
];

export default function KaiwaGuidePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      color: T.text,
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(180deg, ${T.bgWarm} 0%, ${T.bg} 100%)`,
        borderBottom: `1px solid ${T.border}`,
        padding: '36px 20px 40px',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, marginBottom: 28 }}>
            <Link href="/english/izakaya-toeic" style={{ color: T.gold, textDecoration: 'none', fontWeight: 500 }}>TOEIC酒場</Link>
            <span style={{ color: T.textMuted }}>/</span>
            <Link href="/english/izakaya-toeic/kaiwa" style={{ color: T.gold, textDecoration: 'none', fontWeight: 500 }}>会話マスター365</Link>
            <span style={{ color: T.textMuted }}>/</span>
            <span style={{ color: T.textSub, fontWeight: 600 }}>メソッド</span>
          </nav>

          <h1 style={{ fontSize: 26, fontWeight: 900, color: T.text, margin: '0 0 12px', lineHeight: 1.4 }}>
            なぜこのアプリで<br />英語が話せるようになるのか
          </h1>
          <p style={{ fontSize: 15, color: T.textSub, margin: 0, lineHeight: 1.8 }}>
            根性論じゃない。論文5本で裏付けた、フレーズ在庫型の学習メソッド。
          </p>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 20px 80px' }}>

        {/* ── Section 1: 問題提起 ── */}
        <section style={{ marginBottom: 56 }}>
          <div style={{
            background: T.bgSoft,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: '32px 24px',
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 16px', lineHeight: 1.4 }}>
              英会話が怖い人へ
            </h2>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 12px' }}>
              オンライン英会話を始めたいけど怖い。
            </p>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 12px' }}>
              海外旅行で困りたくないけど、何から始めればいいかわからない。
            </p>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 12px' }}>
              How are you? と聞かれて、Good. しか出てこない。
            </p>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 20px' }}>
              みんな同じことを思ってる。<strong style={{ color: T.text }}>度胸が足りない</strong>、と。
            </p>
            <div style={{
              background: T.bg,
              border: `2px solid ${T.gold}`,
              borderRadius: 10,
              padding: '20px 24px',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 18, fontWeight: 800, color: T.text, margin: 0, lineHeight: 1.6 }}>
                違います。<br />
                足りないのは<span style={{ color: T.gold }}>度胸</span>じゃなくて<span style={{ color: T.gold }}>在庫</span>。
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 2: カラオケ理論 ── */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 20px' }}>
            カラオケ理論
          </h2>
          <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 12px' }}>
            カラオケが怖い人は、歌が下手なんじゃない。
          </p>
          <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 12px' }}>
            <strong style={{ color: T.text }}>歌える曲がないから怖い。</strong>
          </p>
          <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 12px' }}>
            レパートリーが3曲しかない人は恐怖。50曲ある人は楽しい。
          </p>
          <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 12px' }}>
            歌唱力の問題じゃない。<strong style={{ color: T.text }}>在庫の問題。</strong>
          </p>
          <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 24px' }}>
            英会話もまったく同じ。口から出せるフレーズの在庫があれば、怖くない。
          </p>

          {/* 数字カード */}
          <div style={{
            display: 'flex', gap: 12, flexWrap: 'wrap',
          }}>
            {[
              { num: '50-100', label: '旅行サバイバル', sub: 'ホテル、レストラン、空港で困らない' },
              { num: '300', label: '日常会話', sub: '普通の会話をなんとかこなせる' },
              { num: '1,000', label: '自信を持って会話', sub: 'ほとんどの場面で困らない' },
            ].map(item => (
              <div key={item.num} style={{
                flex: 1, minWidth: 180,
                background: T.bgSoft,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                padding: '20px 16px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: T.gold, lineHeight: 1 }}>{item.num}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginTop: 8 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: T.goldBg,
            border: `1px solid ${T.goldBorder}`,
            borderRadius: 10,
            padding: '16px 20px',
            textAlign: 'center',
            marginTop: 16,
          }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: 0 }}>
              1日10フレーズ。<span style={{ color: T.gold }}>1ヶ月で300。</span>それだけで世界が変わる。
            </p>
          </div>
        </section>

        {/* ── Section 3: 論文が証明している ── */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 8px' }}>
            論文が証明している
          </h2>
          <p style={{ fontSize: 13, color: T.textMuted, margin: '0 0 24px' }}>
            このアプリの全ての設計は、第二言語習得の研究論文に基づいています。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {RESEARCH.map((paper) => (
              <div key={paper.author} style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderLeft: `4px solid ${paper.accent}`,
                borderRadius: 10,
                padding: '20px 22px',
                boxShadow: T.shadow,
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: paper.accent }}>{paper.author}</span>
                  <span style={{ fontSize: 11, color: T.textMuted }}>({paper.year})</span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: T.text, lineHeight: 1.8, margin: '0 0 10px' }}>
                  {paper.finding}
                </p>
                <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8, margin: 0 }}>
                  {paper.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 4: 3ステップ ── */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 20px' }}>
            3ステップで身につく
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { n: '1', title: 'ストーリーで出会う', desc: 'キャラクターの会話の中で、フレーズに自然に出会う。勉強してる感覚ゼロ。ストーリーを追ってるだけ。Krashenの情意フィルターが下がった状態で、フレーズが頭に入る。', color: T.gold },
              { n: '2', title: 'カードで気づく', desc: 'ストーリーの中で使われたフレーズを、カードとして取り出す。「あ、これ使える」と意識的に気づく瞬間。Schmidtの気づき仮説が言う、習得に必要な瞬間。', color: T.green },
              { n: '3', title: '解説で理解する', desc: '日本語と英語の間にある「溝」を解説する。なぜこう言うのか、日本語とどう違うのか。この溝の理解が、フレーズを本当に使えるようにする。', color: '#3B82F6' },
            ].map((step, i) => (
              <div key={step.n}>
                <div style={{
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  padding: '20px 0',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: `${step.color}14`,
                    border: `2px solid ${step.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 900, color: step.color,
                    flexShrink: 0,
                  }}>
                    {step.n}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: T.text, margin: '0 0 8px' }}>{step.title}</h3>
                    <p style={{ fontSize: 14, color: T.textSub, lineHeight: 1.9, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
                {i < 2 && (
                  <div style={{ marginLeft: 17, width: 2, height: 16, background: T.border }} />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Section 5: 4段階システム ── */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 8px' }}>
            同じ日本語を、4段階の英語で覚える
          </h2>
          <p style={{ fontSize: 13, color: T.textMuted, margin: '0 0 24px' }}>
            例: とりあえずビール。
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {LEVELS.map((level) => (
              <div key={level.label} style={{
                background: T.surface,
                border: `1px solid ${T.border}`,
                borderRadius: 10,
                padding: '18px 20px',
                boxShadow: T.shadow,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: 5,
                    background: `${level.color}14`,
                    border: `1px solid ${level.color}40`,
                    fontSize: 11, fontWeight: 800,
                    color: level.color,
                  }}>
                    {level.label}
                  </span>
                  <span style={{ fontSize: 13, color: T.textSub }}>{level.desc}</span>
                </div>
                <div style={{
                  background: T.bgSoft,
                  border: `1px solid ${T.borderLight}`,
                  borderRadius: 8,
                  padding: '12px 16px',
                }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: T.text, margin: '0 0 4px', lineHeight: 1.6 }}>
                    {level.example}
                  </p>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: 0 }}>
                    {level.exampleJa}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: T.goldBg,
            border: `1px solid ${T.goldBorder}`,
            borderRadius: 8,
            padding: '16px 20px',
            marginTop: 16,
          }}>
            <p style={{ fontSize: 14, color: T.textSub, lineHeight: 1.8, margin: 0 }}>
              <strong style={{ color: T.text }}>最初はCoreだけでいい。</strong>でもFlowまで見ると、ネイティブの頭の中が見える。教科書はCoreで終わる。このアプリはFlowまで見せる。
            </p>
          </div>
        </section>

        {/* ── Section 6: 併用設計 ── */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 20px' }}>
            今やってるアプリ、やめなくていい
          </h2>

          <div style={{
            background: T.bgSoft,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: '28px 24px',
          }}>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 8px' }}>
              Duolingoやってる？ いい。続けて。
            </p>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 8px' }}>
              スタサプやってる？ いい。続けて。
            </p>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 16px' }}>
              でも、それだけだと<strong style={{ color: T.text }}>口から出せるフレーズの在庫は増えない。</strong>
            </p>
            <p style={{ fontSize: 15, color: T.textSub, lineHeight: 2, margin: '0 0 20px' }}>
              会話マスター365は、その穴を埋めるためのアプリ。
              <br />他のアプリと<strong style={{ color: T.text }}>一緒に使う</strong>ために設計してる。
            </p>

            <div style={{
              display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              <div style={{
                background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8,
                padding: '12px 20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.textMuted }}>今のアプリ</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.text, marginTop: 4 }}>5分</div>
              </div>
              <span style={{ fontSize: 20, color: T.textMuted }}>+</span>
              <div style={{
                background: T.goldBg, border: `1px solid ${T.goldBorder}`, borderRadius: 8,
                padding: '12px 20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.gold }}>会話マスター365</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.gold, marginTop: 4 }}>5分</div>
              </div>
              <span style={{ fontSize: 20, color: T.textMuted }}>=</span>
              <div style={{
                background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 8,
                padding: '12px 20px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.green }}>合計</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.green, marginTop: 4 }}>10分/日</div>
              </div>
            </div>

            <p style={{ fontSize: 14, color: T.textMuted, textAlign: 'center', marginTop: 16, marginBottom: 0 }}>
              それだけで、オンライン英会話を始めるときの恐怖が消える。
            </p>
          </div>
        </section>

        {/* ── Section 7: ロードマップ ── */}
        <section style={{ marginBottom: 56 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: T.text, margin: '0 0 8px' }}>
            12ヶ月のロードマップ
          </h2>
          <p style={{ fontSize: 13, color: T.textMuted, margin: '0 0 24px' }}>
            毎月300フレーズ。1年で3,650フレーズ。サバイバルからマスターまで。
          </p>

          <div style={{
            background: T.bgSoft,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {ROADMAP.map((item, i) => {
              const isFirst = i === 0;
              const isLast = i === ROADMAP.length - 1;
              const progress = item.cumulative / 3650;
              return (
                <div key={item.month} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 20px',
                  borderBottom: isLast ? 'none' : `1px solid ${T.borderLight}`,
                  background: isFirst ? T.goldBg : (isLast ? T.greenBg : 'transparent'),
                }}>
                  <div style={{
                    width: 36, fontSize: 12, fontWeight: 700, textAlign: 'center',
                    color: isFirst ? T.gold : (isLast ? T.green : T.textMuted),
                  }}>
                    {item.label}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{item.title}</div>
                    <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{item.sub}</div>
                    <div style={{ height: 3, borderRadius: 2, background: T.borderLight, overflow: 'hidden', marginTop: 4 }}>
                      <div style={{
                        height: '100%', borderRadius: 2,
                        background: `linear-gradient(90deg, ${T.gold}, ${T.green})`,
                        width: `${progress * 100}%`,
                      }} />
                    </div>
                  </div>
                  <div style={{
                    fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
                    color: isLast ? T.green : T.textMuted,
                  }}>
                    {item.cumulative.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Final stat */}
          <div style={{
            marginTop: 20,
            textAlign: 'center',
            padding: '28px 20px',
            background: `linear-gradient(135deg, ${T.bgWarm} 0%, ${T.bgGreen} 100%)`,
            border: `1px solid ${T.goldBorder}`,
            borderRadius: 12,
          }}>
            <div style={{
              fontSize: 48, fontWeight: 900, letterSpacing: '-0.03em',
              background: `linear-gradient(135deg, ${T.gold}, ${T.green})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: 1,
            }}>
              3,650
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginTop: 10 }}>
              1年で3,650フレーズ
            </div>
            <div style={{ fontSize: 13, color: T.textMuted, marginTop: 6 }}>
              Beer, please. から、テーブル全員を笑わせるジョークまで。
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: T.text, marginBottom: 20 }}>
            度胸は最初から足りてた。<br />足りなかったのは在庫。
          </p>
          <Link
            href="/english/izakaya-toeic/kaiwa"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              background: T.gold,
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              borderRadius: 8,
              textDecoration: 'none',
              letterSpacing: '0.03em',
              boxShadow: '0 4px 12px rgba(212,175,55,0.3)',
            }}
          >
            今日の10フレーズを始める
          </Link>
          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 12 }}>
            Day 1 -- 10フレーズ、1つのストーリー、5分。
          </div>
        </div>
      </div>
    </div>
  );
}
