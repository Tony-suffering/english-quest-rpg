'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

/* ──────────────────────────── Design Tokens ──────────────────────────── */
const AMBER = '#F59E0B';
const AMBER_DARK = '#D97706';
const AMBER_DEEPER = '#B45309';
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F5E6B8';
const EMERALD = '#10B981';
const EMERALD_DARK = '#059669';
const RED = '#EF4444';
const RED_DARK = '#DC2626';
const PURPLE = '#8B5CF6';
const BLUE = '#3B82F6';
const PINK = '#EC4899';
const BG_WHITE = '#FFFFFF';
const BG_STONE = '#FAFAF9';
const BG_STONE_100 = '#F5F5F4';
const BG_AMBER = '#FFFBEB';
const BG_AMBER_WARM = '#FFF7ED';
const TEXT_DARK = '#1C1917';
const TEXT_MED = '#57534E';
const TEXT_MUTED = '#78716C';
const TEXT_LIGHT = '#A8A29E';
const BORDER = '#E7E5E4';
const BORDER_LIGHT = '#F5F5F4';
const FONT = '"Noto Sans JP", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const SHADOW_XS = '0 1px 2px rgba(28, 25, 23, 0.03)';
const SHADOW_SM = '0 1px 3px rgba(28, 25, 23, 0.04), 0 1px 2px rgba(28, 25, 23, 0.06)';
const SHADOW_MD = '0 4px 12px rgba(28, 25, 23, 0.05), 0 2px 4px rgba(28, 25, 23, 0.08)';
const SHADOW_LG = '0 8px 32px rgba(28, 25, 23, 0.07), 0 4px 12px rgba(28, 25, 23, 0.04)';
const SHADOW_XL = '0 16px 48px rgba(28, 25, 23, 0.08), 0 8px 24px rgba(28, 25, 23, 0.04)';

/* ──────────────────────────── Shared Styles ──────────────────────────── */
const narrowContainer = { maxWidth: 760, margin: '0 auto' } as const;
const wideContainer = { maxWidth: 1060, margin: '0 auto' } as const;

/* ──────────────────────────── Animated Visibility Hook ──────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function AnimateIn({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ──────────────────────────── Section Header ──────────────────────────── */
function SectionHeader({ tag, tagColor, title, subtitle }: { tag: string; tagColor: string; title: string; subtitle?: string }) {
  return (
    <AnimateIn style={{ textAlign: 'center', marginBottom: 64 }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 20px',
        borderRadius: 100,
        background: `${tagColor}10`,
        border: `1px solid ${tagColor}25`,
        marginBottom: 20,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: tagColor }} />
        <span style={{
          fontFamily: FONT,
          fontSize: 11,
          fontWeight: 800,
          color: tagColor,
          letterSpacing: '0.14em',
          textTransform: 'uppercase' as const,
        }}>
          {tag}
        </span>
      </div>
      <h2 style={{
        fontFamily: FONT,
        fontSize: 32,
        fontWeight: 900,
        color: TEXT_DARK,
        margin: '0 0 12px 0',
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontFamily: FONT,
          fontSize: 16,
          color: TEXT_MED,
          margin: 0,
          lineHeight: 1.8,
          maxWidth: 540,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          {subtitle}
        </p>
      )}
    </AnimateIn>
  );
}

/* ──────────────────────────── FAQ Item ──────────────────────────── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: `1px solid ${BORDER_LIGHT}`,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => setOpen(!open)}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0',
        }}
      >
        <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: TEXT_DARK, lineHeight: 1.6, flex: 1, paddingRight: 16 }}>
          {q}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 600,
            color: open ? AMBER_DARK : TEXT_LIGHT,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            background: open ? `${AMBER}15` : BG_STONE,
          }}
        >
          {open ? '\u2212' : '+'}
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          opacity: open ? 1 : 0,
        }}
      >
        <p style={{ fontFamily: FONT, fontSize: 15, color: TEXT_MED, lineHeight: 1.9, margin: 0, paddingBottom: 24 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────── Character Data ──────────────────────────── */
const CHARACTERS = [
  {
    name: 'Kenji',
    nameJa: 'ケンジ',
    role: '主人公',
    roleDetail: '建設会社取締役 / 45歳',
    desc: 'TOEIC 480。英語の書類が読めなくて焦っている。東南アジアの大型契約がかかっている。',
    catchphrase: '30日でなんとかしてくれ。',
    color: '#92400E',
    bg: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
    borderColor: '#FDE68A',
    initial: 'K',
  },
  {
    name: 'Gondo',
    nameJa: 'マスター権藤',
    role: '解説役',
    roleDetail: '読解の師匠',
    desc: 'なぜ読み間違えるのかを毎回TRAPとして解説する。読解指導のプロフェッショナル。',
    catchphrase: 'その読み方、TRAPだよ。',
    color: '#57534E',
    bg: 'linear-gradient(135deg, #F5F5F4 0%, #FAFAF9 100%)',
    borderColor: '#E7E5E4',
    initial: 'G',
  },
  {
    name: 'Yuki',
    nameJa: 'ユキ',
    role: 'リーディングの先生',
    roleDetail: 'Part 5 / Part 7 専門',
    desc: 'Part 5とPart 7が得意。文法から意味を取る読み方を教える。',
    catchphrase: '構文が見えれば、意味が見える。',
    color: '#B45309',
    bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
    borderColor: '#FDE68A',
    initial: 'Y',
  },
  {
    name: 'Lisa',
    nameJa: 'リサ',
    role: 'ネイティブ目線',
    roleDetail: '日米バイリンガル',
    desc: 'ネイティブがどう読むかを教える。日本人が見落とすニュアンスを指摘。',
    catchphrase: 'そこ、ネイティブは違う意味で読むよ。',
    color: '#BE185D',
    bg: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
    borderColor: '#FBCFE8',
    initial: 'L',
  },
  {
    name: 'Takeshi',
    nameJa: 'タケシ',
    role: 'ケンジの仲間',
    roleDetail: '後輩社員 / 28歳',
    desc: 'ケンジと一緒に学ぶ後輩。間違えながら成長する姿が励みになる。',
    catchphrase: 'あ、俺もそこ間違えました。',
    color: '#1D4ED8',
    bg: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
    borderColor: '#BFDBFE',
    initial: 'T',
  },
  {
    name: 'Mina',
    nameJa: 'ミナ',
    role: '読解苦手組',
    roleDetail: '経理部 / 32歳',
    desc: '長文を見ると固まるタイプ。ケンジと同じ悩みを持つ仲間。',
    catchphrase: '長文見ると目が滑るんです。',
    color: '#7C3AED',
    bg: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
    borderColor: '#DDD6FE',
    initial: 'M',
  },
];

/* ──────────────────────────── Phase Data ──────────────────────────── */
const PHASES = [
  {
    phase: 1,
    label: 'Phase 1',
    title: '読みの基礎',
    days: 'Day 1 -- 10',
    dayRange: '10日間',
    color: AMBER,
    colorDark: AMBER_DARK,
    bg: '#FFFBEB',
    border: '#FDE68A',
    icon: 'I',
    items: ['看板・標識を読む', 'メニュー・レシピを読む', 'メール・チャットを読む', '単語の意味推測', '品詞の見分け方'],
    description: '身近な英語から始める。短い文を確実に読む力をつける。',
  },
  {
    phase: 2,
    label: 'Phase 2',
    title: '文章を読む',
    days: 'Day 11 -- 20',
    dayRange: '10日間',
    color: PURPLE,
    colorDark: '#7C3AED',
    bg: '#F5F3FF',
    border: '#DDD6FE',
    icon: 'II',
    items: ['文構造の把握', '接続詞の読み方', '代名詞の追跡', '文脈からの推測', 'パラグラフの要点'],
    description: '複数の文をつなげて読む。段落レベルの理解力を鍛える。',
  },
  {
    phase: 3,
    label: 'Phase 3',
    title: '実践リーディング',
    days: 'Day 21 -- 30',
    dayRange: '10日間',
    color: RED,
    colorDark: RED_DARK,
    bg: '#FEF2F2',
    border: '#FECACA',
    icon: 'III',
    items: ['ニュース記事', '契約書・規約', 'レポート・報告書', 'スキミング実践', '時間内に読み切る'],
    description: '実務レベルの英語を、時間内に正確に読む。',
  },
];

/* ──────────────────────────── Demo Exercise ──────────────────────────── */
function DemoExercise() {
  const [selected, setSelected] = useState<number | null>(null);
  const correctAnswer = 2;

  const passage = `From: David Chen <d.chen@mekong-build.vn>
To: kenji.tanaka@iwasaki-const.jp
Subject: Site Visit Schedule - Ho Chi Minh Project

Dear Mr. Tanaka,

Following our meeting last week, I would like to confirm the site visit on March 15th.
Please note that all visitors must wear safety equipment provided at the entrance.
The meeting with local contractors has been moved from 2:00 PM to 3:30 PM
due to a scheduling conflict on their end.

Best regards,
David Chen`;

  const question = 'ミーティングの時間はどうなった？';
  const choices = [
    { label: 'A', text: 'キャンセルになった' },
    { label: 'B', text: '2:00 PMのまま' },
    { label: 'C', text: '3:30 PMに変更された' },
    { label: 'D', text: '翌日に延期された' },
  ];

  return (
    <div style={{
      borderRadius: 20,
      overflow: 'hidden',
      border: `1px solid ${BORDER}`,
      boxShadow: SHADOW_LG,
      background: BG_WHITE,
    }}>
      {/* Header */}
      <div style={{
        padding: '18px 28px',
        background: `linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)`,
        borderBottom: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
      }}>
        <span style={{
          fontFamily: FONT,
          fontSize: 10,
          fontWeight: 800,
          color: BG_WHITE,
          background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
          padding: '4px 14px',
          borderRadius: 100,
          letterSpacing: '0.1em',
          boxShadow: `0 2px 8px ${AMBER}30`,
        }}>
          DEMO
        </span>
        <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>
          Day 3 -- ビジネスメールを読む
        </span>
      </div>

      {/* Passage */}
      <div style={{
        padding: '24px 28px',
        background: BG_STONE,
        borderBottom: `1px solid ${BORDER_LIGHT}`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 16,
          left: 16,
          fontFamily: FONT,
          fontSize: 48,
          fontWeight: 900,
          color: `${TEXT_LIGHT}15`,
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}>
          &ldquo;
        </div>
        <pre style={{
          fontFamily: '"SF Mono", "Fira Code", "Courier New", Courier, monospace',
          fontSize: 13,
          color: TEXT_DARK,
          lineHeight: 1.9,
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          position: 'relative',
        }}>
          {passage}
        </pre>
      </div>

      {/* Question */}
      <div style={{ padding: '24px 28px' }}>
        <p style={{
          fontFamily: FONT,
          fontSize: 16,
          fontWeight: 800,
          color: TEXT_DARK,
          margin: '0 0 20px 0',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 24,
            height: 24,
            borderRadius: 6,
            background: `${AMBER}15`,
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 800,
            color: AMBER_DARK,
          }}>Q</span>
          {question}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {choices.map((c, i) => {
            const isSelected = selected === i;
            const isCorrect = i === correctAnswer;
            const showResult = selected !== null;
            let bg = BG_WHITE;
            let borderColor = BORDER;
            let textColor = TEXT_DARK;
            let labelBg = BG_STONE;
            let labelColor = TEXT_MUTED;

            if (showResult && isCorrect) {
              bg = '#ECFDF5';
              borderColor = EMERALD;
              textColor = '#065F46';
              labelBg = '#D1FAE5';
              labelColor = EMERALD_DARK;
            } else if (showResult && isSelected && !isCorrect) {
              bg = '#FEF2F2';
              borderColor = RED;
              textColor = '#991B1B';
              labelBg = '#FEE2E2';
              labelColor = RED;
            }

            return (
              <div
                key={c.label}
                onClick={() => { if (selected === null) setSelected(i); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 18px',
                  borderRadius: 12,
                  border: `1.5px solid ${borderColor}`,
                  background: bg,
                  cursor: selected === null ? 'pointer' : 'default',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  ...(selected === null ? {} : {}),
                }}
                onMouseEnter={(e) => {
                  if (selected === null) {
                    e.currentTarget.style.borderColor = AMBER;
                    e.currentTarget.style.background = BG_AMBER;
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selected === null) {
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.background = BG_WHITE;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <span style={{
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 800,
                  color: labelColor,
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: labelBg,
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}>
                  {showResult && isCorrect ? '\u2713' : showResult && isSelected ? '\u2717' : c.label}
                </span>
                <span style={{
                  fontFamily: FONT,
                  fontSize: 15,
                  color: textColor,
                  fontWeight: showResult && isCorrect ? 700 : 500,
                  transition: 'all 0.2s',
                }}>
                  {c.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* TRAP / TIP explanation */}
        {selected !== null && (
          <div style={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}>
            {/* TRAP */}
            <div style={{
              padding: '20px 24px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
              borderLeft: `4px solid ${RED}`,
              position: 'relative',
            }}>
              <div style={{
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 900,
                color: RED,
                letterSpacing: '0.1em',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: `${RED}18`,
                  fontSize: 10,
                }}>!</span>
                TRAP -- なぜ間違える？
              </div>
              <p style={{
                fontFamily: FONT,
                fontSize: 14,
                color: '#7F1D1D',
                lineHeight: 1.9,
                margin: 0,
              }}>
                「moved from 2:00 PM」の部分だけ読んで「2:00 PM」と答える人が多い。
                moved <span style={{ fontWeight: 800, background: '#FEE2E2', padding: '1px 4px', borderRadius: 3 }}>from</span> A <span style={{ fontWeight: 800, background: '#FEE2E2', padding: '1px 4px', borderRadius: 3 }}>to</span> B の構文を見落とすと、古い時間を正解だと思ってしまう。
              </p>
            </div>

            {/* TIP */}
            <div style={{
              padding: '20px 24px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
              borderLeft: `4px solid ${EMERALD}`,
            }}>
              <div style={{
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 900,
                color: EMERALD_DARK,
                letterSpacing: '0.1em',
                marginBottom: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: `${EMERALD}18`,
                  fontSize: 11,
                  fontWeight: 800,
                  color: EMERALD_DARK,
                }}>{'\u2713'}</span>
                TIP -- こう読む
              </div>
              <p style={{
                fontFamily: FONT,
                fontSize: 14,
                color: '#064E3B',
                lineHeight: 1.9,
                margin: 0,
              }}>
                「変更」を示すキーワード（moved, changed, rescheduled, postponed）を見つけたら、
                from/to のペアを探す。to の後ろが新しい情報。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────── CTA Button ──────────────────────────── */
function CTAButton({ href, text, size = 'md', sub }: { href: string; text: string; size?: 'sm' | 'md' | 'lg'; sub?: string }) {
  const sizes = {
    sm: { padding: '14px 40px', fontSize: 15, borderRadius: 12 },
    md: { padding: '16px 48px', fontSize: 16, borderRadius: 14 },
    lg: { padding: '20px 56px', fontSize: 17, borderRadius: 16 },
  };
  const s = sizes[size];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <Link href={href} style={{ textDecoration: 'none' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: s.padding,
            borderRadius: s.borderRadius,
            background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
            color: BG_WHITE,
            fontFamily: FONT,
            fontSize: s.fontSize,
            fontWeight: 800,
            boxShadow: `0 4px 20px ${AMBER}35, 0 2px 8px ${AMBER}20`,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            cursor: 'pointer',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = `0 8px 32px ${AMBER}45, 0 4px 12px ${AMBER}25`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = `0 4px 20px ${AMBER}35, 0 2px 8px ${AMBER}20`;
          }}
        >
          {text}
          <span style={{ fontSize: s.fontSize + 2, transition: 'transform 0.2s' }}>{'\u2192'}</span>
        </div>
      </Link>
      {sub && (
        <span style={{
          fontFamily: FONT,
          fontSize: 12,
          color: TEXT_LIGHT,
          fontWeight: 500,
        }}>
          {sub}
        </span>
      )}
    </div>
  );
}

/* ──────────────────────────── Sticky Bottom Bar ──────────────────────────── */
function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: `1px solid ${BORDER}`,
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        boxShadow: '0 -4px 24px rgba(28, 25, 23, 0.06)',
      }}>
        <span style={{
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 700,
          color: TEXT_DARK,
          display: 'none',
        }}>
          30日で英語が読める脳を作る
        </span>
        <Link href="/english/yomique" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 32px',
            borderRadius: 10,
            background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
            color: BG_WHITE,
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 800,
            boxShadow: `0 2px 12px ${AMBER}30`,
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}>
            今すぐ始める
            <span>{'\u2192'}</span>
          </div>
        </Link>
        <span style={{
          fontFamily: FONT,
          fontSize: 11,
          color: TEXT_LIGHT,
          fontWeight: 500,
        }}>
          登録不要 / 無料
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export default function YomiQueLPPage() {
  return (
    <div style={{ fontFamily: FONT, color: TEXT_DARK, background: BG_WHITE, overflowX: 'hidden' }}>

      {/* ═══════════════════ 1. HERO ═══════════════════ */}
      <section style={{
        padding: '0 24px',
        paddingTop: 64,
        paddingBottom: 96,
        background: `linear-gradient(180deg, #FFFBEB 0%, #FEF3C7 30%, #FFFBEB 60%, ${BG_WHITE} 100%)`,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Top accent bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${AMBER}, ${GOLD}, ${AMBER_DARK}, ${GOLD}, ${AMBER})`,
        }} />

        {/* Subtle decorative circles */}
        <div style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${AMBER}08 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -80,
          left: -120,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${GOLD}06 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ ...narrowContainer, position: 'relative' }}>
          {/* Badge */}
          <AnimateIn delay={0}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 24px',
              borderRadius: 100,
              background: `rgba(245, 158, 11, 0.08)`,
              border: `1px solid rgba(245, 158, 11, 0.2)`,
              marginBottom: 32,
              backdropFilter: 'blur(8px)',
            }}>
              <div style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: AMBER,
                boxShadow: `0 0 8px ${AMBER}60`,
              }} />
              <span style={{
                fontFamily: FONT,
                fontSize: 12,
                fontWeight: 800,
                color: AMBER_DARK,
                letterSpacing: '0.14em',
              }}>
                READING QUEST
              </span>
            </div>
          </AnimateIn>

          {/* Title */}
          <AnimateIn delay={100}>
            <h1 style={{
              fontFamily: FONT,
              fontSize: 64,
              fontWeight: 900,
              margin: '0 0 12px 0',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}>
              <span style={{
                background: `linear-gradient(135deg, ${AMBER_DARK} 0%, ${GOLD} 40%, ${AMBER} 70%, ${AMBER_DARK} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ヨミクエ
              </span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={200}>
            <p style={{
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 800,
              color: TEXT_DARK,
              margin: '0 0 8px 0',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}>
              30日で英語が読める脳を作る
            </p>
          </AnimateIn>

          <AnimateIn delay={300}>
            <p style={{
              fontFamily: FONT,
              fontSize: 16,
              color: TEXT_MED,
              margin: '0 0 48px 0',
              lineHeight: 1.8,
              maxWidth: 440,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              看板からニュースまで。読めない原因を1日1つ潰す、
              リーディング専門トレーニングアプリ。
            </p>
          </AnimateIn>

          {/* Stats */}
          <AnimateIn delay={400}>
            <div style={{
              display: 'inline-flex',
              gap: 0,
              marginBottom: 48,
              background: BG_WHITE,
              borderRadius: 16,
              border: `1px solid ${BORDER}`,
              boxShadow: SHADOW_MD,
              overflow: 'hidden',
            }}>
              {[
                { value: '30', unit: '日間', sub: 'カリキュラム' },
                { value: '300', unit: '問', sub: '実践問題' },
                { value: '0', unit: '円', sub: '完全無料' },
              ].map((s, i) => (
                <div key={s.unit} style={{
                  textAlign: 'center',
                  padding: '24px 36px',
                  borderRight: i < 2 ? `1px solid ${BORDER_LIGHT}` : 'none',
                  minWidth: 120,
                }}>
                  <div style={{
                    fontFamily: FONT,
                    fontSize: 40,
                    fontWeight: 900,
                    color: AMBER_DARK,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}>
                    {s.value}
                  </div>
                  <div style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: 700,
                    color: TEXT_DARK,
                    marginTop: 4,
                  }}>
                    {s.unit}
                  </div>
                  <div style={{
                    fontFamily: FONT,
                    fontSize: 11,
                    fontWeight: 500,
                    color: TEXT_LIGHT,
                    marginTop: 2,
                  }}>
                    {s.sub}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

          {/* CTA */}
          <AnimateIn delay={500}>
            <CTAButton href="/english/yomique" text="今すぐ始める" size="lg" sub="登録不要 -- 今すぐブラウザで始められます" />
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════ 2. PROBLEM ═══════════════════ */}
      <section style={{ padding: '96px 24px', background: BG_WHITE }}>
        <div style={narrowContainer}>
          <SectionHeader
            tag="Problem"
            tagColor={RED}
            title="なぜ英語が「読めない」のか"
            subtitle="英単語を知っていても、英語は読めない。原因はもっと根本的なところにある。"
          />

          {/* Comparison layout */}
          <AnimateIn delay={100}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginBottom: 32,
            }}>
              {/* Bad approach */}
              <div style={{
                padding: '28px 24px',
                borderRadius: 16,
                background: '#FEF2F2',
                border: `1px solid #FECACA`,
                position: 'relative',
              }}>
                <div style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 800,
                  color: RED,
                  letterSpacing: '0.1em',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <span style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    background: `${RED}15`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 900,
                    color: RED,
                  }}>{'\u2717'}</span>
                  よくある英語学習
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    '単語帳を丸暗記する',
                    '英文をひたすら読む',
                    '問題を解いて正解数を数える',
                  ].map((item, i) => (
                    <div key={i} style={{
                      fontFamily: FONT,
                      fontSize: 14,
                      color: '#991B1B',
                      lineHeight: 1.7,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                    }}>
                      <span style={{ color: '#FECACA', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>&mdash;</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Good approach */}
              <div style={{
                padding: '28px 24px',
                borderRadius: 16,
                background: '#ECFDF5',
                border: `1px solid #A7F3D0`,
              }}>
                <div style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  fontWeight: 800,
                  color: EMERALD_DARK,
                  letterSpacing: '0.1em',
                  marginBottom: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <span style={{
                    width: 18,
                    height: 18,
                    borderRadius: 4,
                    background: `${EMERALD}15`,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 900,
                    color: EMERALD_DARK,
                  }}>{'\u2713'}</span>
                  ヨミクエのアプローチ
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    '間違える原因を理解する',
                    '読み方の技術を身につける',
                    '実際の素材で実践する',
                  ].map((item, i) => (
                    <div key={i} style={{
                      fontFamily: FONT,
                      fontSize: 14,
                      color: '#065F46',
                      lineHeight: 1.7,
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                    }}>
                      <span style={{ color: '#6EE7B7', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>&mdash;</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Pain points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              {
                text: '英語の文章を見ると頭が真っ白になる',
                sub: '単語は知っているのに、文になると意味がわからない',
              },
              {
                text: '辞書で調べても文全体の意味がわからない',
                sub: '1つ1つの単語は訳せるのに、つなげると意味不明',
              },
              {
                text: 'TOEICの長文で時間が足りない',
                sub: 'Part 7で毎回時間切れ。最後の10問は塗り絵',
              },
            ].map((item, i) => (
              <AnimateIn key={i} delay={200 + i * 80}>
                <div style={{
                  padding: '24px 28px',
                  borderRadius: 14,
                  background: BG_STONE,
                  border: `1px solid ${BORDER}`,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  cursor: 'default',
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = SHADOW_MD;
                    e.currentTarget.style.transform = 'translateX(4px)';
                    e.currentTarget.style.borderColor = '#FECACA';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = BORDER;
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: '#FEF2F2',
                      border: `1px solid #FECACA`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: 2,
                    }}>
                      <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 900, color: RED }}>
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p style={{
                        fontFamily: FONT,
                        fontSize: 16,
                        fontWeight: 700,
                        color: TEXT_DARK,
                        margin: '0 0 6px 0',
                        lineHeight: 1.6,
                      }}>
                        {item.text}
                      </p>
                      <p style={{
                        fontFamily: FONT,
                        fontSize: 14,
                        color: TEXT_MED,
                        margin: 0,
                        lineHeight: 1.7,
                      }}>
                        {item.sub}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Kenji quote */}
          <AnimateIn delay={500}>
            <div style={{
              marginTop: 40,
              padding: '28px 32px',
              borderRadius: 16,
              background: `linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)`,
              border: `1px solid #FDE68A`,
              boxShadow: `0 4px 20px rgba(212, 175, 55, 0.08)`,
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute',
                top: 16,
                right: 24,
                fontFamily: FONT,
                fontSize: 64,
                fontWeight: 900,
                color: `${GOLD}12`,
                lineHeight: 1,
                pointerEvents: 'none',
              }}>
                &rdquo;
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginBottom: 16,
              }}>
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #92400E 0%, #78350F 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(146, 64, 14, 0.2)',
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 800, color: BG_WHITE }}>K</span>
                </div>
                <div>
                  <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#92400E', display: 'block', lineHeight: 1.3 }}>
                    ケンジ
                  </span>
                  <span style={{ fontFamily: FONT, fontSize: 11, fontWeight: 600, color: TEXT_MUTED }}>
                    45歳 / TOEIC 480
                  </span>
                </div>
              </div>
              <p style={{
                fontFamily: FONT,
                fontSize: 16,
                color: '#78350F',
                lineHeight: 1.9,
                margin: 0,
                fontStyle: 'italic',
                fontWeight: 500,
              }}>
                「来月の東南アジア出張、現地企業との契約書が全部英語なんだ。読めないとマジでやばい。
                30日しかない。なんとかしてくれ。」
              </p>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════ 3. TRAP/TIP SOLUTION ═══════════════════ */}
      <section style={{
        padding: '96px 24px',
        background: `linear-gradient(180deg, ${BG_STONE} 0%, ${BG_WHITE} 100%)`,
      }}>
        <div style={narrowContainer}>
          <SectionHeader
            tag="Solution"
            tagColor={EMERALD_DARK}
            title="TRAP と TIP で読解力を鍛える"
            subtitle="なぜ間違えるか（TRAP）を知り、どう読むか（TIP）を学ぶ。この2つのサイクルが読解力の核心。"
          />

          {/* TRAP & TIP demo cards side by side */}
          <AnimateIn delay={100}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
              marginBottom: 40,
            }}>
              {/* TRAP card */}
              <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: BG_WHITE,
                border: `1px solid #FECACA`,
                boxShadow: SHADOW_MD,
                transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = SHADOW_LG;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOW_MD;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                  borderBottom: `1px solid #FECACA`,
                }}>
                  <div style={{
                    fontFamily: FONT,
                    fontSize: 28,
                    fontWeight: 900,
                    color: RED,
                    letterSpacing: '0.04em',
                    marginBottom: 4,
                  }}>TRAP</div>
                  <div style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#991B1B',
                  }}>なぜ読み間違えるのか</div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { title: '部分読み', desc: '一部の単語だけ拾って早合点する' },
                      { title: '誤訳連鎖', desc: '1つの誤訳が文全体の意味をズラす' },
                      { title: '構文無視', desc: '文の構造を見ずに単語だけ追う' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: '#FEE2E2',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 1,
                        }}>
                          <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, color: RED }}>{i + 1}</span>
                        </div>
                        <div>
                          <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#7F1D1D', marginBottom: 2 }}>{item.title}</div>
                          <div style={{ fontFamily: FONT, fontSize: 13, color: '#991B1B', lineHeight: 1.6 }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* TIP card */}
              <div style={{
                borderRadius: 20,
                overflow: 'hidden',
                background: BG_WHITE,
                border: `1px solid #A7F3D0`,
                boxShadow: SHADOW_MD,
                transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = SHADOW_LG;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = SHADOW_MD;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  padding: '20px 24px',
                  background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
                  borderBottom: `1px solid #A7F3D0`,
                }}>
                  <div style={{
                    fontFamily: FONT,
                    fontSize: 28,
                    fontWeight: 900,
                    color: EMERALD_DARK,
                    letterSpacing: '0.04em',
                    marginBottom: 4,
                  }}>TIP</div>
                  <div style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#065F46',
                  }}>どう読めばいいのか</div>
                </div>
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { title: 'キーワード法', desc: '変更・否定・条件のシグナルを拾う' },
                      { title: '構文分解', desc: 'S/V/Oを見つけて文の骨格を掴む' },
                      { title: '文脈推測', desc: '前後の文脈から意味を絞り込む' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: '#D1FAE5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: 1,
                        }}>
                          <span style={{ fontFamily: FONT, fontSize: 10, fontWeight: 800, color: EMERALD_DARK }}>{i + 1}</span>
                        </div>
                        <div>
                          <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: '#064E3B', marginBottom: 2 }}>{item.title}</div>
                          <div style={{ fontFamily: FONT, fontSize: 13, color: '#065F46', lineHeight: 1.6 }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Third feature: REAL */}
          <AnimateIn delay={200}>
            <div style={{
              padding: '32px',
              borderRadius: 20,
              background: `linear-gradient(135deg, #FFFBEB 0%, ${BG_WHITE} 100%)`,
              border: `1px solid #FDE68A`,
              boxShadow: SHADOW_MD,
              transition: 'all 0.3s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = SHADOW_LG;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = SHADOW_MD;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${AMBER} 0%, ${AMBER_DARK} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 4px 16px ${AMBER}25`,
                }}>
                  <span style={{ fontFamily: FONT, fontSize: 20, fontWeight: 900, color: BG_WHITE }}>R</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'inline-block',
                    fontFamily: FONT,
                    fontSize: 11,
                    fontWeight: 800,
                    color: AMBER_DARK,
                    background: '#FEF3C7',
                    padding: '4px 14px',
                    borderRadius: 100,
                    letterSpacing: '0.08em',
                    marginBottom: 12,
                  }}>REAL</div>
                  <h3 style={{
                    fontFamily: FONT,
                    fontSize: 20,
                    fontWeight: 800,
                    color: TEXT_DARK,
                    margin: '0 0 10px 0',
                    lineHeight: 1.4,
                  }}>
                    実際に使う素材で練習する
                  </h3>
                  <p style={{
                    fontFamily: FONT,
                    fontSize: 15,
                    color: TEXT_MED,
                    margin: '0 0 20px 0',
                    lineHeight: 1.9,
                  }}>
                    看板、メニュー、メール、契約書、ニュース。「実際に出会う英語」で練習するから、すぐ使える。
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['看板', 'メニュー', 'メール', 'ニュース', '契約書', 'レポート'].map((tag) => (
                      <span key={tag} style={{
                        fontFamily: FONT,
                        fontSize: 12,
                        fontWeight: 600,
                        color: AMBER_DARK,
                        background: '#FEF3C7',
                        padding: '5px 14px',
                        borderRadius: 8,
                        border: `1px solid #FDE68A`,
                      }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Mid-section CTA */}
          <AnimateIn delay={300}>
            <div style={{ textAlign: 'center', marginTop: 56 }}>
              <CTAButton href="/english/yomique" text="無料で体験する" size="md" sub="登録不要 -- 30秒で始められます" />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════ 4. CHARACTERS ═══════════════════ */}
      <section style={{ padding: '96px 24px', background: BG_WHITE }}>
        <div style={wideContainer}>
          <SectionHeader
            tag="Characters"
            tagColor={GOLD}
            title="Kenjiの東南アジア大作戦"
            subtitle="6人のキャラクターと一緒に、30日間のリーディング特訓"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 20,
          }}>
            {CHARACTERS.map((c, idx) => (
              <AnimateIn key={c.name} delay={idx * 80}>
                <div
                  style={{
                    padding: '28px',
                    borderRadius: 20,
                    background: c.bg,
                    border: `1px solid ${c.borderColor}`,
                    boxShadow: SHADOW_SM,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = SHADOW_LG;
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = SHADOW_SM;
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: `linear-gradient(135deg, ${c.color} 0%, ${c.color}CC 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: `0 4px 12px ${c.color}25`,
                    }}>
                      <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 800, color: BG_WHITE }}>
                        {c.initial}
                      </span>
                    </div>
                    <div>
                      <div style={{
                        fontFamily: FONT,
                        fontSize: 18,
                        fontWeight: 800,
                        color: c.color,
                        lineHeight: 1.3,
                      }}>
                        {c.nameJa}
                      </div>
                      <div style={{
                        fontFamily: FONT,
                        fontSize: 11,
                        fontWeight: 600,
                        color: TEXT_MUTED,
                        marginTop: 2,
                      }}>
                        {c.roleDetail}
                      </div>
                    </div>
                  </div>

                  {/* Role badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignSelf: 'flex-start',
                    padding: '4px 12px',
                    borderRadius: 100,
                    background: `${c.color}12`,
                    border: `1px solid ${c.color}22`,
                    marginBottom: 14,
                  }}>
                    <span style={{
                      fontFamily: FONT,
                      fontSize: 11,
                      fontWeight: 700,
                      color: c.color,
                    }}>
                      {c.role}
                    </span>
                  </div>

                  <p style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    color: TEXT_MED,
                    lineHeight: 1.8,
                    margin: '0 0 14px 0',
                    flex: 1,
                  }}>
                    {c.desc}
                  </p>

                  {/* Catchphrase */}
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: `${c.color}08`,
                    borderLeft: `3px solid ${c.color}40`,
                  }}>
                    <p style={{
                      fontFamily: FONT,
                      fontSize: 13,
                      color: c.color,
                      margin: 0,
                      fontStyle: 'italic',
                      fontWeight: 600,
                      lineHeight: 1.6,
                    }}>
                      「{c.catchphrase}」
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 5. 30-DAY STRUCTURE ═══════════════════ */}
      <section style={{
        padding: '96px 24px',
        background: `linear-gradient(180deg, ${BG_STONE} 0%, ${BG_WHITE} 100%)`,
      }}>
        <div style={narrowContainer}>
          <SectionHeader
            tag="Structure"
            tagColor={AMBER_DARK}
            title="30日間のロードマップ"
            subtitle="1日10問。看板から契約書まで、段階的にレベルアップ。"
          />

          {/* Timeline */}
          <div style={{ position: 'relative', paddingLeft: 40 }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute',
              left: 15,
              top: 20,
              bottom: 20,
              width: 2,
              background: `linear-gradient(180deg, ${AMBER} 0%, ${PURPLE} 50%, ${RED} 100%)`,
              borderRadius: 100,
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {PHASES.map((p, idx) => (
                <AnimateIn key={p.phase} delay={idx * 120}>
                  <div style={{ position: 'relative' }}>
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute',
                      left: -33,
                      top: 28,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: BG_WHITE,
                      border: `3px solid ${p.color}`,
                      boxShadow: `0 0 0 4px ${p.color}15`,
                      zIndex: 1,
                    }} />

                    <div style={{
                      borderRadius: 20,
                      overflow: 'hidden',
                      background: BG_WHITE,
                      border: `1px solid ${p.border}`,
                      boxShadow: SHADOW_MD,
                      transition: 'all 0.3s',
                    }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = SHADOW_LG;
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = SHADOW_MD;
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      {/* Phase header */}
                      <div style={{
                        padding: '24px 28px',
                        background: p.bg,
                        borderBottom: `1px solid ${p.border}`,
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: 12,
                          marginBottom: 8,
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span style={{
                              fontFamily: FONT,
                              fontSize: 11,
                              fontWeight: 900,
                              color: BG_WHITE,
                              background: `linear-gradient(135deg, ${p.color} 0%, ${p.colorDark} 100%)`,
                              padding: '5px 14px',
                              borderRadius: 100,
                              letterSpacing: '0.08em',
                              boxShadow: `0 2px 8px ${p.color}25`,
                            }}>
                              {p.icon}
                            </span>
                            <span style={{
                              fontFamily: FONT,
                              fontSize: 20,
                              fontWeight: 900,
                              color: p.colorDark,
                              letterSpacing: '-0.01em',
                            }}>
                              {p.title}
                            </span>
                          </div>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                          }}>
                            <span style={{
                              fontFamily: FONT,
                              fontSize: 12,
                              fontWeight: 700,
                              color: p.color,
                              background: `${p.color}10`,
                              padding: '4px 12px',
                              borderRadius: 100,
                            }}>
                              {p.days}
                            </span>
                          </div>
                        </div>
                        <p style={{
                          fontFamily: FONT,
                          fontSize: 14,
                          color: TEXT_MED,
                          margin: 0,
                          lineHeight: 1.7,
                        }}>
                          {p.description}
                        </p>
                      </div>

                      {/* Items */}
                      <div style={{ padding: '20px 28px' }}>
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 8,
                        }}>
                          {p.items.map((item, i) => (
                            <span key={i} style={{
                              fontFamily: FONT,
                              fontSize: 13,
                              fontWeight: 600,
                              color: TEXT_MED,
                              padding: '8px 16px',
                              borderRadius: 10,
                              background: BG_STONE,
                              border: `1px solid ${BORDER_LIGHT}`,
                              transition: 'all 0.2s',
                            }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = p.bg;
                                e.currentTarget.style.borderColor = p.border;
                                e.currentTarget.style.color = p.colorDark;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = BG_STONE;
                                e.currentTarget.style.borderColor = BORDER_LIGHT;
                                e.currentTarget.style.color = TEXT_MED;
                              }}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <AnimateIn delay={400}>
            <div style={{
              marginTop: 40,
              padding: '24px 28px',
              borderRadius: 16,
              background: BG_WHITE,
              border: `1px solid ${BORDER}`,
              boxShadow: SHADOW_SM,
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
                <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: TEXT_MUTED }}>
                  Day 1
                </span>
                <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 700, color: TEXT_MUTED }}>
                  Day 30
                </span>
              </div>
              <div style={{
                height: 10,
                borderRadius: 100,
                background: BG_STONE_100,
                overflow: 'hidden',
                display: 'flex',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04)',
              }}>
                <div style={{
                  width: '33.3%',
                  height: '100%',
                  background: `linear-gradient(90deg, ${AMBER} 0%, #FBBF24 100%)`,
                  borderRadius: '100px 0 0 100px',
                }} />
                <div style={{
                  width: '33.3%',
                  height: '100%',
                  background: `linear-gradient(90deg, #A78BFA 0%, ${PURPLE} 100%)`,
                }} />
                <div style={{
                  width: '33.4%',
                  height: '100%',
                  background: `linear-gradient(90deg, #F87171 0%, ${RED} 100%)`,
                  borderRadius: '0 100px 100px 0',
                }} />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginTop: 12,
              }}>
                {PHASES.map((p) => (
                  <span key={p.phase} style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    fontWeight: 700,
                    color: p.colorDark,
                  }}>
                    {p.title}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════ 6. DEMO ═══════════════════ */}
      <section style={{ padding: '96px 24px', background: BG_WHITE }}>
        <div style={narrowContainer}>
          <SectionHeader
            tag="Try It"
            tagColor={AMBER_DARK}
            title="体験してみよう"
            subtitle="実際の問題を1問解いてみてください。選択肢を選ぶと、TRAPとTIPが表示されます。"
          />

          <AnimateIn delay={100}>
            <DemoExercise />
          </AnimateIn>

          <AnimateIn delay={200}>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <CTAButton href="/english/yomique" text="全30日分を始める" size="md" />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════ 7. FAQ ═══════════════════ */}
      <section style={{
        padding: '96px 24px',
        background: `linear-gradient(180deg, ${BG_STONE} 0%, ${BG_WHITE} 100%)`,
      }}>
        <div style={narrowContainer}>
          <SectionHeader
            tag="FAQ"
            tagColor={TEXT_MUTED}
            title="よくある質問"
          />

          <AnimateIn delay={100}>
            <div style={{
              background: BG_WHITE,
              borderRadius: 20,
              border: `1px solid ${BORDER}`,
              padding: '8px 32px',
              boxShadow: SHADOW_MD,
            }}>
              <FAQItem
                q="英語が全く読めないレベルでも大丈夫？"
                a="大丈夫です。Phase 1は看板やメニューなど、短い英語から始めます。主人公のケンジもTOEIC 480からのスタート。1日10問、少しずつ「読める感覚」を積み上げていきます。"
              />
              <FAQItem
                q="1日どれくらい時間がかかる？"
                a="10問で約15〜20分です。通勤中や昼休みにサッとできる量に設計しています。毎日続けることが大事なので、負担にならない分量にしています。"
              />
              <FAQItem
                q="TOEICの点数は上がる？"
                a="Part 5（文法）とPart 7（長文読解）の対策になります。特に「読むスピード」と「引っかけ問題の見抜き方」は直接スコアに効きます。TRAP解説がTOEICの選択肢の罠と同じ構造になっています。"
              />
              <FAQItem
                q="リスニングや会話の練習にはならない？"
                a="ヨミクエはリーディング特化です。リスニング・会話は姉妹アプリの「リスクエ」をどうぞ。ただし、読む力がつくとリスニングも自然に伸びます。読めない英語は聞いても理解できないからです。"
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ═══════════════════ 8. FINAL CTA ═══════════════════ */}
      <section style={{
        padding: '96px 24px',
        paddingBottom: 140,
        background: `linear-gradient(180deg, ${BG_WHITE} 0%, #FEF3C7 50%, #FFFBEB 100%)`,
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${GOLD}08 0%, transparent 60%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ ...narrowContainer, position: 'relative' }}>
          <AnimateIn>
            {/* Kenji avatar */}
            <div style={{
              width: 72,
              height: 72,
              borderRadius: 22,
              background: 'linear-gradient(135deg, #92400E 0%, #78350F 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 28px auto',
              boxShadow: `0 8px 24px rgba(146, 64, 14, 0.2)`,
            }}>
              <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 900, color: BG_WHITE }}>K</span>
            </div>
          </AnimateIn>

          <AnimateIn delay={100}>
            <h2 style={{
              fontFamily: FONT,
              fontSize: 32,
              fontWeight: 900,
              color: TEXT_DARK,
              margin: '0 0 16px 0',
              lineHeight: 1.4,
              letterSpacing: '-0.01em',
            }}>
              Kenjiと一緒に、30日間。
            </h2>
          </AnimateIn>

          <AnimateIn delay={200}>
            <p style={{
              fontFamily: FONT,
              fontSize: 17,
              color: TEXT_MED,
              margin: '0 0 12px 0',
              lineHeight: 1.9,
              maxWidth: 480,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: 500,
            }}>
              英語が読めないのは才能の問題じゃない。
            </p>
            <p style={{
              fontFamily: FONT,
              fontSize: 17,
              color: TEXT_MED,
              margin: '0 0 12px 0',
              lineHeight: 1.9,
              maxWidth: 480,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: 500,
            }}>
              読み方を知らないだけ。
            </p>
            <p style={{
              fontFamily: FONT,
              fontSize: 18,
              color: TEXT_DARK,
              margin: '0 0 48px 0',
              lineHeight: 1.9,
              maxWidth: 480,
              marginLeft: 'auto',
              marginRight: 'auto',
              fontWeight: 700,
            }}>
              1日10問、30日で「読める脳」を作ろう。
            </p>
          </AnimateIn>

          <AnimateIn delay={300}>
            <CTAButton href="/english/yomique" text="Day 1 を始める" size="lg" sub="登録不要 -- 今すぐブラウザで始められます" />
          </AnimateIn>
        </div>

        {/* Bottom accent */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${AMBER}, ${GOLD}, ${AMBER_DARK}, ${GOLD}, ${AMBER})`,
        }} />
      </section>

      {/* Sticky bottom bar */}
      <StickyBar />

      {/* Bottom spacer for sticky bar */}
      <div style={{ height: 56 }} />
    </div>
  );
}
