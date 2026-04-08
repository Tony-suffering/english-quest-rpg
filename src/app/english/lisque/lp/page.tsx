'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const GOLD = '#D4AF37';
const GREEN = '#10B981';
const BLUE = '#3B82F6';
const PURPLE = '#8B5CF6';
const TEXT_DARK = '#1C1917';
const TEXT_SUB = '#57534E';
const TEXT_MUTED = '#78716C';
const BG_MAIN = '#FAFAF9';
const RED = '#EF4444';

const characters = [
  {
    name: 'Takeshi',
    nameJa: 'タケシ',
    age: 35,
    job: 'ITプロジェクトマネージャー',
    toeic: 550,
    role: '主人公',
    color: BLUE,
    catchphrase: 'No problem! ...Wait, big problem.',
  },
  {
    name: 'Master',
    nameJa: 'マスター',
    age: 58,
    job: '居酒屋のれん店主',
    toeic: 860,
    role: '解説',
    color: GOLD,
    catchphrase: '答えはもう持ってる。声に出すだけだ。',
  },
  {
    name: 'Mina',
    nameJa: 'ミナ',
    age: 28,
    job: '外資系コンサル',
    toeic: 990,
    role: 'リスニング天才 495/495',
    color: PURPLE,
    catchphrase: '全部聞き取れた...でも返せなかった。',
  },
  {
    name: 'Lisa',
    nameJa: 'リサ',
    age: 31,
    job: '英会話講師',
    toeic: null,
    role: 'ネイティブ',
    color: GREEN,
    catchphrase: 'みんなが思ってるより、ずっと近いよ。',
  },
  {
    name: 'Yuki',
    nameJa: 'ユキ',
    age: 26,
    job: 'Webデザイナー',
    toeic: 680,
    role: '仲間',
    color: '#F59E0B',
    catchphrase: '知ってるのに...出てこない。',
  },
  {
    name: 'Kenji',
    nameJa: 'ケンジ',
    age: 48,
    job: '営業部長',
    toeic: 420,
    role: '最年長',
    color: '#EF4444',
    catchphrase: 'もう歳だよ...でも来てるだろ。',
  },
];

const phases = [
  {
    number: 1,
    title: '音の基礎',
    days: 'Day 1 - 10',
    color: BLUE,
    bgColor: '#EFF6FF',
    topics: '母音、子音、カタカナの罠、アクセント、弱形、リンキング',
    description: '英語の音そのものを聞き分ける耳を作る。日本語にない音を1つずつ覚える。',
  },
  {
    number: 2,
    title: '文を聞く',
    days: 'Day 11 - 20',
    color: GREEN,
    bgColor: '#ECFDF5',
    topics: '主語、動詞、否定、数字、感情、質問',
    description: '単語ではなく文の構造を聞き取る。英語の語順で意味を掴む。',
  },
  {
    number: 3,
    title: '会話を聞く',
    days: 'Day 21 - 30',
    color: GOLD,
    bgColor: '#FFFBEB',
    topics: 'カフェ、道案内、ホテル、空港、雑談、電話、買い物',
    description: 'リアルな場面で会話を聞き取る。Takeshiと一緒にシンガポールを乗り越える。',
  },
];

const faqs = [
  {
    q: '本当に無料？',
    a: '完全無料。広告もなし。登録もなし。ブラウザを開くだけで始められます。',
  },
  {
    q: '英語初心者でも大丈夫？',
    a: 'Phase 1は完全ゼロから。「英語の音は日本語と何が違うのか」から始めます。TOEIC 400でも問題なし。',
  },
  {
    q: '1日何分かかる？',
    a: '10問で約5-10分。通勤中にできる。まとめてやっても、分けてやってもOK。',
  },
  {
    q: '他のアプリとの違いは？',
    a: '「なぜ聞こえないか」を教える唯一の教材。ドリルを解くだけじゃなく、聞こえない原因を科学的に潰していく。',
  },
  {
    q: 'スマホで使える？',
    a: 'ブラウザだけで動く。アプリのダウンロード不要。iPhone、Android、PC、すべて対応。',
  },
];

const dialogueLines = [
  { speaker: 'Takeshi', text: 'マスター、ビール。あと、俺の人生終わったかもしれない。' },
  { speaker: 'Master', text: 'どうした。' },
  { speaker: 'Takeshi', text: 'シンガポールのカンファレンスで英語プレゼンしろって。30日後に。' },
  { speaker: 'Master', text: '...30日か。十分だ。' },
];

function getDialogueColor(speaker: string): string {
  const char = characters.find((c) => c.name === speaker);
  return char?.color ?? TEXT_DARK;
}

/* ── Animated counter hook ── */
function useCountUp(target: number, duration: number = 1600) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { count, ref };
}

/* ── Fade-in-on-scroll hook ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function FadeInSection({ children, style, delay = 0 }: { children: React.ReactNode; style?: React.CSSProperties; delay?: number }) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Keyframes via style tag ── */
function GlobalStyles() {
  return (
    <style>{`
      @keyframes lp-gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes lp-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
      }
      @keyframes lp-pulse-ring {
        0% { transform: scale(1); opacity: 0.4; }
        100% { transform: scale(1.8); opacity: 0; }
      }
      @keyframes lp-shimmer {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
      }
      @keyframes lp-slide-up {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .lp-sticky-cta {
        display: none;
      }
      @media (max-width: 768px) {
        .lp-sticky-cta {
          display: flex !important;
        }
      }
    `}</style>
  );
}

export default function LisqueLPPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [trapFlipped, setTrapFlipped] = useState(false);

  const stat30 = useCountUp(30);
  const stat300 = useCountUp(300);
  const stat0 = useCountUp(0, 800);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ fontFamily: '"Hiragino Kaku Gothic ProN", "Noto Sans JP", system-ui, -apple-system, sans-serif', color: TEXT_DARK, background: '#FFFFFF', overflowX: 'hidden' }}>
      <GlobalStyles />

      {/* ====== HERO ====== */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '80px 24px 60px',
          position: 'relative',
          background: 'linear-gradient(135deg, #F0F9FF 0%, #FEFCE8 25%, #F0FDF4 50%, #EFF6FF 75%, #FEFCE8 100%)',
          backgroundSize: '400% 400%',
          animation: 'lp-gradient-shift 12s ease infinite',
        }}
      >
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: '10%', left: '8%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40%', right: '15%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, width: '100%' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 24px',
              borderRadius: 100,
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(59,130,246,0.2)',
              color: BLUE,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.2em',
              marginBottom: 40,
              boxShadow: '0 2px 12px rgba(59,130,246,0.08)',
              animation: 'lp-slide-up 0.8s ease',
            }}
          >
            LISTENING QUEST
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontSize: 'clamp(32px, 6vw, 52px)',
              fontWeight: 900,
              lineHeight: 1.3,
              marginBottom: 24,
              letterSpacing: '-0.02em',
              animation: 'lp-slide-up 0.8s ease 0.1s both',
            }}
          >
            30日で、
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 50%, #D4AF37 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'lp-shimmer 4s linear infinite',
              }}
            >
              英語が聞こえる耳
            </span>
            を作る。
          </h1>

          <p
            style={{
              fontSize: 'clamp(15px, 2.5vw, 18px)',
              color: TEXT_SUB,
              lineHeight: 1.9,
              maxWidth: 460,
              margin: '0 auto 48px',
              animation: 'lp-slide-up 0.8s ease 0.2s both',
            }}
          >
            聞こえない原因を1日1つ潰していく。
            <br />
            教科書じゃない。体験だ。
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: 0,
              justifyContent: 'center',
              marginBottom: 48,
              animation: 'lp-slide-up 0.8s ease 0.3s both',
            }}
          >
            {[
              { counter: stat30, unit: '日間', label: 'カリキュラム' },
              { counter: stat300, unit: '問', label: '全問題数' },
              { counter: stat0, unit: '円', label: '完全無料' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                ref={stat.counter.ref}
                style={{
                  textAlign: 'center',
                  padding: '0 clamp(20px, 4vw, 40px)',
                  borderRight: i < 2 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <div style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 800, color: TEXT_DARK, letterSpacing: '-0.02em' }}>
                  {stat.counter.count}
                </div>
                <div style={{ fontSize: 14, color: BLUE, fontWeight: 700, marginTop: 2 }}>{stat.unit}</div>
                <div style={{ fontSize: 11, color: TEXT_MUTED, fontWeight: 500, marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, animation: 'lp-slide-up 0.8s ease 0.4s both' }}>
            <Link
              href="/english/lisque"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '18px 56px',
                borderRadius: 16,
                background: `linear-gradient(135deg, ${BLUE} 0%, #2563EB 100%)`,
                color: '#FFFFFF',
                fontSize: 17,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(59, 130, 246, 0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(59, 130, 246, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(59, 130, 246, 0.2)';
              }}
            >
              今すぐ始める
              <span style={{ fontSize: 20, marginLeft: 4 }}>&rarr;</span>
            </Link>

            <button
              onClick={() => scrollToSection('problem')}
              style={{
                background: 'none',
                border: 'none',
                color: TEXT_MUTED,
                fontSize: 14,
                cursor: 'pointer',
                padding: '8px 16px',
                fontFamily: 'inherit',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = BLUE; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = TEXT_MUTED; }}
            >
              どんな教材？ &darr;
            </button>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12,
                color: TEXT_MUTED,
                margin: 0,
              }}
            >
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: GREEN }} />
              登録不要 -- ブラウザだけで始められます
            </div>
          </div>
        </div>
      </section>

      {/* ====== PROBLEM ====== */}
      <section
        id="problem"
        style={{
          padding: '120px 24px',
          background: BG_MAIN,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Top border accent */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)' }} />

        <FadeInSection style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: BLUE, marginBottom: 16, textTransform: 'uppercase' }}>
            The Problem
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: 20,
              maxWidth: 560,
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            なぜ、何年勉強しても
            <br />
            英語が聞こえないのか。
          </h2>
          <p style={{ fontSize: 15, color: TEXT_MUTED, textAlign: 'center', marginBottom: 64, maxWidth: 400 }}>
            原因は3つ。そしてどれも、学校では教わらない。
          </p>
        </FadeInSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            maxWidth: 1000,
            width: '100%',
          }}
        >
          {[
            {
              number: '01',
              title: '音が違う',
              body: '日本語22音 vs 英語44音。そもそも聞く耳がない。日本語の耳で英語を聞いている限り、永遠に聞こえない。',
              accent: BLUE,
              bgAccent: 'rgba(59,130,246,0.04)',
            },
            {
              number: '02',
              title: '音が変わる',
              body: 'ネイティブは音をつなげて、消して、変える。教科書には書いてない。実際の英語と教科書の英語は別物。',
              accent: GREEN,
              bgAccent: 'rgba(16,185,129,0.04)',
            },
            {
              number: '03',
              title: '速すぎる',
              body: '弱形、リンキング、リダクション。速いんじゃなくて、省略されてる。「速い」と思った瞬間、対策を間違える。',
              accent: PURPLE,
              bgAccent: 'rgba(139,92,246,0.04)',
            },
          ].map((item, i) => (
            <FadeInSection key={item.title} delay={i * 120}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 20,
                  padding: '40px 32px',
                  border: '1px solid #E7E5E4',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.04)';
                }}
              >
                {/* Top gradient line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${item.accent}, ${item.accent}80)` }} />
                {/* Background number */}
                <div style={{ position: 'absolute', top: -8, right: 16, fontSize: 80, fontWeight: 900, color: item.bgAccent, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                  {item.number}
                </div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${item.accent}12`,
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ width: 4, height: 20, borderRadius: 2, background: item.accent }} />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, letterSpacing: '-0.01em' }}>{item.title}</h3>
                  <p style={{ fontSize: 14, color: TEXT_SUB, lineHeight: 1.9, margin: 0 }}>{item.body}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* ====== MID CTA ====== */}
      <section
        style={{
          padding: '56px 24px',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderTop: '1px solid rgba(59,130,246,0.08)',
          borderBottom: '1px solid rgba(16,185,129,0.08)',
        }}
      >
        <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, maxWidth: 400 }}>
          原因がわかれば、対策が見える。
        </p>
        <Link
          href="/english/lisque"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '14px 40px',
            borderRadius: 12,
            background: BLUE,
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 16px rgba(59,130,246,0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(59,130,246,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(59,130,246,0.25)';
          }}
        >
          無料で体験する &rarr;
        </Link>
      </section>

      {/* ====== TRAP / TIP SOLUTION ====== */}
      <section
        style={{
          padding: '120px 24px',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <FadeInSection style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: BLUE, marginBottom: 16 }}>
            THE METHOD
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: 20,
              maxWidth: 600,
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            聞こえない原因を、科学的に1つずつ潰す。
          </h2>
          <p style={{ fontSize: 15, color: TEXT_MUTED, textAlign: 'center', marginBottom: 64, maxWidth: 440 }}>
            毎日10問。1問ごとに「TRAP」と「TIP」がセットで出る。
          </p>
        </FadeInSection>

        {/* Interactive demo area */}
        <FadeInSection delay={200} style={{ maxWidth: 760, width: '100%' }}>
          {/* Scenario header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%)',
              borderRadius: '24px 24px 0 0',
              border: '1px solid #E2E8F0',
              borderBottom: 'none',
              padding: '28px 32px 20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  padding: '4px 14px',
                  borderRadius: 8,
                  background: `${BLUE}12`,
                  fontSize: 12,
                  fontWeight: 700,
                  color: BLUE,
                  letterSpacing: '0.05em',
                }}
              >
                Day 5
              </div>
              <div style={{ fontSize: 13, color: TEXT_MUTED, fontWeight: 500 }}>
                弱形 -- 機能語の弱い発音
              </div>
            </div>
            <p style={{ fontSize: 16, color: TEXT_DARK, lineHeight: 1.8, margin: 0 }}>
              カフェで注文。{' '}
              <span style={{ fontWeight: 700, color: BLUE }}>&quot;Can I get a latte?&quot;</span>
            </p>
            <p style={{ fontSize: 16, color: TEXT_DARK, lineHeight: 1.8, margin: '4px 0 0' }}>
              店員の返事: <span style={{ fontWeight: 700 }}>&quot;For here or to go?&quot;</span>
            </p>
          </div>

          {/* TRAP / TIP cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 0,
            }}
          >
            {/* TRAP card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '0 0 0 24px',
                border: '1px solid #E2E8F0',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onClick={() => setTrapFlipped(!trapFlipped)}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFBFB'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${RED}, ${RED}80)` }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: '#FEF2F2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 900,
                    color: RED,
                  }}
                >
                  X
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: RED, letterSpacing: '0.15em' }}>
                  TRAP
                </div>
                <div style={{ fontSize: 11, color: TEXT_MUTED, marginLeft: 'auto' }}>
                  なぜ聞こえない？
                </div>
              </div>
              <p style={{ fontSize: 15, color: TEXT_DARK, lineHeight: 1.9, margin: 0 }}>
                Takeshiには <strong style={{ color: RED }}>&quot;Ferrier to go?&quot;</strong> に聞こえた。
              </p>
              <p style={{ fontSize: 14, color: TEXT_SUB, lineHeight: 1.8, margin: '12px 0 0' }}>
                &quot;for&quot; が /f&#601;r/ になる弱形。日本語にこの概念がない。
              </p>
            </div>

            {/* TIP card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '0 0 24px 0',
                border: '1px solid #E2E8F0',
                borderLeft: 'none',
                padding: '32px 28px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFDFB'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#FFFFFF'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${GREEN}, ${GREEN}80)` }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: '#ECFDF5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    fontWeight: 900,
                    color: GREEN,
                  }}
                >
                  O
                </div>
                <div style={{ fontSize: 13, fontWeight: 800, color: GREEN, letterSpacing: '0.15em' }}>
                  TIP
                </div>
                <div style={{ fontSize: 11, color: TEXT_MUTED, marginLeft: 'auto' }}>
                  どう鍛える？
                </div>
              </div>
              <p style={{ fontSize: 15, color: TEXT_DARK, lineHeight: 1.9, margin: 0 }}>
                大事じゃない単語は<strong style={{ color: GREEN }}>超テキトーに発音される。</strong>
              </p>
              <p style={{ fontSize: 14, color: TEXT_SUB, lineHeight: 1.8, margin: '12px 0 0' }}>
                弱い音に耳を慣らせ。意味のない音を聞き流す技術が必要。
              </p>
            </div>
          </div>

          {/* Method note */}
          <div
            style={{
              marginTop: 24,
              padding: '20px 28px',
              borderRadius: 16,
              background: 'linear-gradient(135deg, #F8FAFC 0%, #F0F9FF 100%)',
              border: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: 12, background: `${BLUE}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14, fontWeight: 800, color: BLUE }}>
              ?
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>全問にTRAPとTIPが付く</div>
              <div style={{ fontSize: 13, color: TEXT_SUB, lineHeight: 1.7 }}>
                聞いて、間違えて、原因を知って、対策を覚える。この4ステップを300問くり返す。
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ====== CHARACTERS ====== */}
      <section
        style={{
          padding: '120px 24px',
          background: BG_MAIN,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)' }} />

        <FadeInSection style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: GOLD, marginBottom: 16 }}>
            THE CAST
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: 20,
              maxWidth: 520,
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            のれんの6人が、あなたの耳を鍛える。
          </h2>
          <p style={{ fontSize: 15, color: TEXT_MUTED, textAlign: 'center', marginBottom: 64, maxWidth: 440 }}>
            居酒屋「のれん」の常連たち。全員、英語に何かしらの壁がある。
          </p>
        </FadeInSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
            maxWidth: 1020,
            width: '100%',
          }}
        >
          {characters.map((char, i) => {
            const isHovered = hoveredChar === char.name;
            return (
              <FadeInSection key={char.name} delay={i * 80}>
                <div
                  onMouseEnter={() => setHoveredChar(char.name)}
                  onMouseLeave={() => setHoveredChar(null)}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 20,
                    padding: '0',
                    border: '1px solid #E7E5E4',
                    boxShadow: isHovered
                      ? `0 12px 40px rgba(0,0,0,0.06), 0 0 0 1px ${char.color}30`
                      : '0 2px 12px rgba(0,0,0,0.03)',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
                    cursor: 'default',
                  }}
                >
                  {/* Character color header bar */}
                  <div
                    style={{
                      height: 56,
                      background: `linear-gradient(135deg, ${char.color}18 0%, ${char.color}08 100%)`,
                      position: 'relative',
                      borderBottom: `1px solid ${char.color}15`,
                    }}
                  >
                    {/* TOEIC badge */}
                    {char.toeic !== null && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 12,
                          right: 16,
                          padding: '4px 12px',
                          borderRadius: 8,
                          background: 'rgba(255,255,255,0.9)',
                          backdropFilter: 'blur(4px)',
                          fontSize: 12,
                          fontWeight: 700,
                          color: char.toeic >= 800 ? GOLD : char.toeic >= 600 ? GREEN : TEXT_SUB,
                          letterSpacing: '0.05em',
                          border: '1px solid rgba(0,0,0,0.06)',
                        }}
                      >
                        TOEIC {char.toeic}
                      </div>
                    )}
                  </div>

                  <div style={{ padding: '0 28px 28px' }}>
                    {/* Avatar overlapping header */}
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: 16,
                        background: `linear-gradient(135deg, ${char.color}20, ${char.color}40)`,
                        border: `3px solid #FFFFFF`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 22,
                        fontWeight: 900,
                        color: char.color,
                        marginTop: -28,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      {char.nameJa.charAt(0)}
                    </div>

                    <div style={{ marginTop: 16 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.01em' }}>{char.nameJa}</span>
                        <span style={{ fontSize: 13, color: TEXT_MUTED, fontWeight: 500 }}>{char.name}</span>
                      </div>
                      <div style={{ fontSize: 13, color: TEXT_MUTED, marginBottom: 14 }}>
                        {char.age}歳 / {char.job}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '5px 14px',
                          borderRadius: 8,
                          background: `${char.color}12`,
                          color: char.color,
                          letterSpacing: '0.03em',
                        }}
                      >
                        {char.role}
                      </span>
                    </div>

                    <div
                      style={{
                        fontSize: 14,
                        color: TEXT_SUB,
                        lineHeight: 1.7,
                        padding: '14px 18px',
                        background: '#F8FAFC',
                        borderRadius: 12,
                        borderLeft: `3px solid ${char.color}40`,
                        fontStyle: 'italic',
                      }}
                    >
                      &quot;{char.catchphrase}&quot;
                    </div>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </section>

      {/* ====== STORY PREVIEW ====== */}
      <section
        style={{
          padding: '120px 24px',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <FadeInSection style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: GOLD, marginBottom: 16 }}>
            THE STORY
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: 20,
              maxWidth: 520,
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            ドリル集じゃない。ストーリーだ。
          </h2>
          <p style={{ fontSize: 15, color: TEXT_MUTED, marginBottom: 56, textAlign: 'center', maxWidth: 360 }}>
            Day 1 -- 居酒屋のれんにて
          </p>
        </FadeInSection>

        <FadeInSection delay={200} style={{ maxWidth: 580, width: '100%' }}>
          <div
            style={{
              background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
              borderRadius: 24,
              border: '1px solid #E7E5E4',
              padding: '36px 32px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
            }}
          >
            {dialogueLines.map((line, i) => {
              const color = getDialogueColor(line.speaker);
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 16,
                    marginBottom: i < dialogueLines.length - 1 ? 28 : 0,
                    alignItems: 'flex-start',
                    animation: `lp-slide-up 0.5s ease ${i * 0.15}s both`,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      background: `${color}12`,
                      border: `2px solid ${color}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontWeight: 800,
                      color: color,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    {line.speaker.charAt(0)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: color, marginBottom: 6, letterSpacing: '0.03em' }}>
                      {line.speaker}
                    </div>
                    <div
                      style={{
                        fontSize: 15,
                        color: TEXT_DARK,
                        lineHeight: 1.8,
                        background: '#FFFFFF',
                        padding: '14px 20px',
                        borderRadius: '2px 16px 16px 16px',
                        border: '1px solid #F0EFEE',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
                      }}
                    >
                      {line.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeInSection>
      </section>

      {/* ====== CURRICULUM / PHASES ====== */}
      <section
        style={{
          padding: '120px 24px',
          background: BG_MAIN,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)' }} />

        <FadeInSection style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: BLUE, marginBottom: 16 }}>
            THE CURRICULUM
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: 20,
              maxWidth: 520,
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            30日間のロードマップ
          </h2>
          <p style={{ fontSize: 15, color: TEXT_MUTED, textAlign: 'center', marginBottom: 64, maxWidth: 440 }}>
            3つのフェーズで、音 → 文 → 会話 へとステップアップ。
          </p>
        </FadeInSection>

        {/* Timeline */}
        <div style={{ maxWidth: 800, width: '100%', position: 'relative' }}>
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 24,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, #E2E8F0 0%, #D4AF37 100%)',
              borderRadius: 1,
              display: 'none',
            }}
            className="timeline-line"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {phases.map((phase, i) => {
              const isActive = activePhase === phase.number;
              return (
                <FadeInSection key={phase.number} delay={i * 150}>
                  <div
                    onMouseEnter={() => setActivePhase(phase.number)}
                    onMouseLeave={() => setActivePhase(null)}
                    style={{
                      background: '#FFFFFF',
                      borderRadius: 20,
                      padding: '36px 32px',
                      border: isActive ? `1px solid ${phase.color}40` : '1px solid #E7E5E4',
                      boxShadow: isActive
                        ? `0 12px 40px rgba(0,0,0,0.06), 0 0 0 1px ${phase.color}20`
                        : '0 2px 12px rgba(0,0,0,0.03)',
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      cursor: 'default',
                    }}
                  >
                    {/* Left color bar */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: isActive ? 5 : 4,
                        background: `linear-gradient(180deg, ${phase.color}, ${phase.color}80)`,
                        transition: 'width 0.3s',
                      }}
                    />

                    {/* Phase header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
                      {/* Phase number circle */}
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          background: `linear-gradient(135deg, ${phase.color}20, ${phase.color}10)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 20,
                          fontWeight: 900,
                          color: phase.color,
                          flexShrink: 0,
                        }}
                      >
                        {phase.number}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: phase.color, letterSpacing: '0.1em', marginBottom: 2 }}>
                          Phase {phase.number}
                        </div>
                        <div style={{ fontSize: 13, color: TEXT_MUTED, fontWeight: 500 }}>{phase.days}</div>
                      </div>
                      {/* Progress indicator */}
                      <div
                        style={{
                          marginLeft: 'auto',
                          padding: '6px 16px',
                          borderRadius: 8,
                          background: phase.bgColor,
                          fontSize: 12,
                          fontWeight: 600,
                          color: phase.color,
                        }}
                      >
                        10 DAYS
                      </div>
                    </div>

                    <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10, letterSpacing: '-0.01em' }}>{phase.title}</h3>
                    <p style={{ fontSize: 15, color: TEXT_SUB, lineHeight: 1.8, margin: '0 0 20px 0' }}>
                      {phase.description}
                    </p>

                    {/* Topic tags */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {phase.topics.split('\u3001').map((topic) => (
                        <span
                          key={topic}
                          style={{
                            fontSize: 12,
                            padding: '6px 14px',
                            borderRadius: 8,
                            background: '#F5F5F4',
                            color: TEXT_MUTED,
                            fontWeight: 600,
                            transition: 'background 0.2s, color 0.2s',
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeInSection>
              );
            })}
          </div>

          {/* Journey end marker */}
          <FadeInSection delay={500} style={{ textAlign: 'center', marginTop: 32 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 28px',
                borderRadius: 100,
                background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
                border: `1px solid ${GOLD}30`,
                fontSize: 14,
                fontWeight: 700,
                color: GOLD,
              }}
            >
              Day 30 -- 英語が聞こえる耳の完成
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ====== MID CTA 2 ====== */}
      <section
        style={{
          padding: '64px 24px',
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 30%, #ECFDF5 70%, #EFF6FF 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderTop: '1px solid rgba(212,175,55,0.1)',
          borderBottom: '1px solid rgba(59,130,246,0.08)',
        }}
      >
        <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, letterSpacing: '-0.01em' }}>
          まだ迷ってる？
        </p>
        <p style={{ fontSize: 15, color: TEXT_SUB, marginBottom: 24 }}>
          最初の10問で、このアプリの違いがわかる。
        </p>
        <Link
          href="/english/lisque"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '16px 48px',
            borderRadius: 14,
            background: `linear-gradient(135deg, ${BLUE} 0%, #2563EB 100%)`,
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 700,
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 6px 24px rgba(59,130,246,0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 32px rgba(59,130,246,0.35)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(59,130,246,0.3)';
          }}
        >
          無料で始める &rarr;
        </Link>
      </section>

      {/* ====== FAQ ====== */}
      <section
        style={{
          padding: '120px 24px',
          background: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FadeInSection style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', color: BLUE, marginBottom: 16 }}>
            FAQ
          </div>
          <h2
            style={{
              fontSize: 'clamp(24px, 4vw, 34px)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: 56,
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            よくある質問
          </h2>
        </FadeInSection>

        <div style={{ maxWidth: 680, width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <FadeInSection key={i} delay={i * 60}>
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 16,
                    border: isOpen ? `1px solid ${BLUE}30` : '1px solid #E7E5E4',
                    overflow: 'hidden',
                    transition: 'all 0.3s',
                    boxShadow: isOpen ? `0 4px 20px rgba(59,130,246,0.08)` : '0 1px 4px rgba(0,0,0,0.02)',
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      padding: '22px 28px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = '#FAFAF9'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 700, color: TEXT_DARK, paddingRight: 16 }}>{faq.q}</span>
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: isOpen ? `${BLUE}12` : '#F5F5F4',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 18,
                        fontWeight: 600,
                        color: isOpen ? BLUE : TEXT_MUTED,
                        transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                        transition: 'all 0.3s',
                        flexShrink: 0,
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 200 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                  >
                    <div style={{ padding: '0 28px 24px 28px' }}>
                      <p style={{ fontSize: 15, color: TEXT_SUB, lineHeight: 1.9, margin: 0 }}>{faq.a}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section
        style={{
          padding: '120px 24px 140px',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 30%, #ECFDF5 60%, #FFFBEB 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '10%', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <FadeInSection style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 'clamp(28px, 5vw, 40px)',
              fontWeight: 900,
              marginBottom: 20,
              maxWidth: 500,
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
            }}
          >
            30日後、
            <br />
            英語が聞こえる世界へ。
          </div>

          <p style={{ fontSize: 16, color: TEXT_SUB, lineHeight: 1.8, marginBottom: 40, maxWidth: 400 }}>
            Takeshiと一緒に、居酒屋のれんから始めよう。
          </p>

          <Link
            href="/english/lisque"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '20px 64px',
              borderRadius: 16,
              background: `linear-gradient(135deg, ${BLUE} 0%, #2563EB 100%)`,
              color: '#FFFFFF',
              fontSize: 18,
              fontWeight: 700,
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(59, 130, 246, 0.2)',
              marginBottom: 24,
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.4), 0 4px 12px rgba(59, 130, 246, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(59, 130, 246, 0.3), 0 2px 8px rgba(59, 130, 246, 0.2)';
            }}
          >
            今すぐ始める &rarr;
          </Link>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: TEXT_MUTED }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: GREEN }} />
              登録不要。ブラウザだけ。
            </div>
            <div style={{ display: 'flex', gap: 24, marginTop: 8 }}>
              {['iPhone', 'Android', 'PC'].map((device) => (
                <span key={device} style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: 500, padding: '4px 12px', borderRadius: 6, background: 'rgba(255,255,255,0.6)' }}>
                  {device}
                </span>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ====== STICKY MOBILE CTA ====== */}
      <div
        className="lp-sticky-cta"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '12px 20px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          display: 'none',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.06)',
        }}
      >
        <Link
          href="/english/lisque"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '14px 0',
            width: '100%',
            maxWidth: 400,
            borderRadius: 14,
            background: `linear-gradient(135deg, ${BLUE} 0%, #2563EB 100%)`,
            color: '#FFFFFF',
            fontSize: 16,
            fontWeight: 700,
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(59,130,246,0.3)',
          }}
        >
          今すぐ始める &rarr;
        </Link>
      </div>

      {/* Bottom spacer for sticky CTA on mobile */}
      <div style={{ height: 72 }} className="lp-sticky-cta" />
    </div>
  );
}
