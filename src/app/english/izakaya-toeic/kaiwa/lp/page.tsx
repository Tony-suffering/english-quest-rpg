'use client';

import Link from 'next/link';
import { useState } from 'react';

/* ──────────────────────────── Design Tokens ──────────────────────────── */
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F5E6B8';
const EMERALD = '#10B981';
const EMERALD_LIGHT = '#A7F3D0';
const BG_WHITE = '#FFFFFF';
const BG_STONE = '#FAFAF9';
const BG_AMBER = '#FFFBEB';
const BG_EMERALD = '#ECFDF5';
const TEXT_DARK = '#1C1917';
const TEXT_MED = '#57534E';
const TEXT_MUTED = '#78716C';
const TEXT_LIGHT = '#A8A29E';
const BORDER = '#E7E5E4';
const BORDER_LIGHT = '#F5F5F4';
const FONT = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

const SHADOW_SM = '0 1px 3px rgba(28, 25, 23, 0.04), 0 1px 2px rgba(28, 25, 23, 0.06)';
const SHADOW_MD = '0 4px 12px rgba(28, 25, 23, 0.05), 0 1px 3px rgba(28, 25, 23, 0.08)';
const SHADOW_LG = '0 8px 24px rgba(28, 25, 23, 0.06), 0 2px 8px rgba(28, 25, 23, 0.04)';
const SHADOW_XL = '0 20px 48px rgba(28, 25, 23, 0.08), 0 4px 12px rgba(28, 25, 23, 0.04)';

/* ──────────────────────────── Shared Styles ──────────────────────────── */
const sectionPadding = { padding: '110px 24px' } as const;
const narrowContainer = { maxWidth: 760, margin: '0 auto' } as const;
const wideContainer = { maxWidth: 1060, margin: '0 auto' } as const;

function GradientText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={{
        background: `linear-gradient(135deg, ${GOLD} 0%, ${EMERALD} 100%)`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function SectionDivider() {
  return (
    <div style={{ height: 1, background: `linear-gradient(90deg, transparent 0%, ${BORDER} 20%, ${BORDER} 80%, transparent 100%)` }} />
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
          padding: '22px 0',
        }}
      >
        <span style={{ fontFamily: FONT, fontSize: 16, fontWeight: 600, color: TEXT_DARK, lineHeight: 1.6, flex: 1, paddingRight: 16 }}>
          {q}
        </span>
        <span
          style={{
            fontFamily: FONT,
            fontSize: 20,
            color: TEXT_LIGHT,
            transition: 'transform 0.25s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            flexShrink: 0,
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          +
        </span>
      </div>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease, opacity 0.3s ease',
          opacity: open ? 1 : 0,
        }}
      >
        <p style={{ fontFamily: FONT, fontSize: 15, color: TEXT_MED, lineHeight: 1.9, margin: 0, paddingBottom: 22 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────── Try It Quiz ──────────────────────────── */
const QUIZ_DATA = [
  {
    ja: 'ビールください',
    levels: [
      { label: 'CORE', text: 'Beer, please.', color: TEXT_MUTED },
      { label: 'VIBE', text: "I'll start with a beer.", color: GOLD },
      { label: 'SCENE', text: "Let me get a beer. Whatever you have on tap.", color: '#D97706' },
      { label: 'FLOW', text: "Beer first. I need to unwind before I can even think about food.", color: EMERALD },
    ],
  },
  {
    ja: '今日めっちゃ疲れた',
    levels: [
      { label: 'CORE', text: "I'm tired.", color: TEXT_MUTED },
      { label: 'VIBE', text: "I'm so exhausted today.", color: GOLD },
      { label: 'SCENE', text: "I'm absolutely wiped out from work today.", color: '#D97706' },
      { label: 'FLOW', text: "You know when you just hit that wall? Yeah, that's me right now.", color: EMERALD },
    ],
  },
  {
    ja: 'ちょっと待って',
    levels: [
      { label: 'CORE', text: 'Wait.', color: TEXT_MUTED },
      { label: 'VIBE', text: 'Hold on a sec.', color: GOLD },
      { label: 'SCENE', text: "Hang on, let me think about that for a second.", color: '#D97706' },
      { label: 'FLOW', text: "Wait wait wait -- before you go any further, let me catch up.", color: EMERALD },
    ],
  },
];

function TryItQuiz() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const reveal = (idx: number) => {
    setRevealed(prev => { const next = new Set(prev); next.add(idx); return next; });
  };

  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {QUIZ_DATA.map((q, qi) => {
        const isRevealed = revealed.has(qi);
        return (
          <div key={qi} style={{
            borderRadius: 14, overflow: 'hidden',
            border: `1px solid ${isRevealed ? BORDER : GOLD}60`,
            boxShadow: SHADOW_SM,
            transition: 'all 0.3s',
          }}>
            {/* Japanese */}
            <div style={{
              padding: '14px 20px', background: BG_WHITE,
              borderBottom: `1px solid ${BORDER_LIGHT}`,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: TEXT_LIGHT,
                  marginRight: 10,
                }}>Q{qi + 1}</span>
                <span style={{ fontSize: 17, fontWeight: 700, color: TEXT_DARK }}>
                  {q.ja}
                </span>
              </div>
              {isRevealed && (
                <span style={{
                  fontSize: 10, fontWeight: 700, color: EMERALD,
                  background: BG_EMERALD, padding: '2px 8px', borderRadius: 4,
                }}>REVEALED</span>
              )}
            </div>

            {/* Answer area */}
            {isRevealed ? (
              <div style={{ background: BG_WHITE }}>
                {q.levels.map((lvl, i) => (
                  <div
                    key={lvl.label}
                    onClick={() => speak(lvl.text)}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 10,
                      padding: '8px 20px',
                      borderLeft: `3px solid ${lvl.color}`,
                      borderBottom: i < 3 ? `1px solid ${BORDER_LIGHT}` : 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{
                      fontSize: 9, fontWeight: 800, color: lvl.color,
                      width: 40, flexShrink: 0, paddingTop: 3,
                    }}>{lvl.label}</span>
                    <span style={{
                      fontSize: i === 2 ? 15 : 13,
                      fontWeight: i === 2 ? 600 : 400,
                      color: i === 0 ? TEXT_LIGHT : TEXT_DARK,
                      lineHeight: 1.6,
                    }}>{lvl.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div
                onClick={() => reveal(qi)}
                style={{
                  padding: '28px 20px', textAlign: 'center',
                  background: `linear-gradient(135deg, ${BG_AMBER} 0%, ${BG_EMERALD}40 100%)`,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: '#EA580C', marginBottom: 4 }}>
                  Tap to reveal
                </div>
                <div style={{ fontSize: 12, color: TEXT_MED }}>
                  まず頭の中で英語にしてみよう
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Score */}
      {revealed.size === 3 && (
        <div style={{
          padding: '20px 24px', borderRadius: 14,
          background: `linear-gradient(135deg, ${BG_AMBER} 0%, ${BG_EMERALD} 100%)`,
          border: `2px solid ${GOLD}`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: GOLD, marginBottom: 4 }}>
            3/3 COMPLETE
          </div>
          <div style={{ fontSize: 14, color: TEXT_DARK }}>
            Core と Flow の差、感じましたか？
          </div>
          <div style={{ fontSize: 13, color: TEXT_MED, marginTop: 4 }}>
            この感覚を、毎日10フレーズ。
          </div>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────── Character Card ──────────────────────────── */
function CharacterCard({ name, age, role, desc, color }: { name: string; age: string; role: string; desc: string; color: string }) {
  return (
    <div
      style={{
        background: BG_WHITE,
        borderRadius: 16,
        padding: '28px 24px',
        border: `1px solid ${BORDER_LIGHT}`,
        boxShadow: SHADOW_SM,
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = SHADOW_MD;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = SHADOW_SM;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3, background: color }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}22, ${color}44)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 700,
            color: color,
            flexShrink: 0,
          }}
        >
          {name[0]}
        </div>
        <div>
          <div style={{ fontFamily: FONT, fontSize: 16, fontWeight: 700, color: TEXT_DARK }}>{name}</div>
          <div style={{ fontFamily: FONT, fontSize: 12, color: TEXT_LIGHT, letterSpacing: '0.04em' }}>{age} -- {role}</div>
        </div>
      </div>
      <p style={{ fontFamily: FONT, fontSize: 14, color: TEXT_MED, lineHeight: 1.8, margin: 0 }}>{desc}</p>
    </div>
  );
}

/* ──────────────────────────── Interactive Demo ──────────────────────────── */
function HeroDemo() {
  const [revealed, setRevealed] = useState(false);
  const speak = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  };

  const DEMO_LEVELS = [
    { label: 'CORE', ja: '核', text: "Nice to meet you.", desc: '通じればOK', color: TEXT_MUTED },
    { label: 'VIBE', ja: '空気', text: "Hey, great to finally meet you!", desc: '感情を乗せる', color: GOLD },
    { label: 'SCENE', ja: '場面', text: "I've heard so much about you. It's really great to finally put a face to the name.", desc: '場面で使える一言', color: '#D97706' },
    { label: 'FLOW', ja: '流れ', text: "Oh, you're the one everyone keeps talking about! I feel like I already know you.", desc: 'ネイティブの脳内', color: EMERALD },
  ];

  return (
    <div style={{ maxWidth: 520, width: '100%', margin: '0 auto' }}>
      {/* Japanese prompt */}
      <div style={{
        background: BG_WHITE, borderRadius: '14px 14px 0 0',
        padding: '16px 20px', border: `1px solid ${BORDER}`, borderBottom: 'none',
        boxShadow: SHADOW_LG,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: TEXT_LIGHT, letterSpacing: '0.1em', marginBottom: 6 }}>
          DAY 1 -- PHRASE 1
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: TEXT_DARK }}>
          はじめまして
        </div>
      </div>

      {/* Build-up reveal */}
      <div
        onClick={() => setRevealed(true)}
        style={{
          borderRadius: '0 0 14px 14px',
          border: `1px solid ${revealed ? BORDER : GOLD}60`,
          overflow: 'hidden',
          cursor: revealed ? 'default' : 'pointer',
          boxShadow: SHADOW_LG,
          transition: 'all 0.3s',
        }}
      >
        {revealed ? (
          <div style={{ background: BG_WHITE }}>
            {DEMO_LEVELS.map((lvl, i) => (
              <div
                key={lvl.label}
                onClick={(e) => { e.stopPropagation(); speak(lvl.text); }}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '10px 20px',
                  borderLeft: `4px solid ${lvl.color}`,
                  borderBottom: i < 3 ? `1px solid ${BORDER_LIGHT}` : 'none',
                  background: i === 3 ? `${lvl.color}06` : BG_WHITE,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ flexShrink: 0, width: 48, paddingTop: 3 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: lvl.color, letterSpacing: '0.05em' }}>
                    {lvl.label}
                  </div>
                  <div style={{ fontSize: 9, color: TEXT_LIGHT }}>{lvl.ja}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: i === 2 ? 15 : 14,
                    fontWeight: i === 2 ? 600 : 400,
                    color: i === 0 ? TEXT_LIGHT : TEXT_DARK,
                    lineHeight: 1.6,
                    fontStyle: i === 3 ? 'italic' : 'normal',
                  }}>
                    {lvl.text}
                  </div>
                  <div style={{ fontSize: 10, color: TEXT_LIGHT, marginTop: 2 }}>
                    {lvl.desc}
                  </div>
                </div>
              </div>
            ))}
            <div style={{
              padding: '8px 20px', background: `${GOLD}08`,
              borderTop: `1px solid ${BORDER_LIGHT}`,
              fontSize: 11, color: TEXT_LIGHT, textAlign: 'center',
            }}>
              Click any level to hear the pronunciation
            </div>
          </div>
        ) : (
          <div style={{
            padding: '32px 20px', textAlign: 'center',
            background: `linear-gradient(135deg, ${BG_AMBER} 0%, ${BG_EMERALD}60 100%)`,
          }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: GOLD, marginBottom: 6 }}>
              Tap to see the 4-level build-up
            </div>
            <div style={{ fontSize: 12, color: TEXT_MED }}>
              同じ日本語を、4段階の英語で分解
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────── Main Page ──────────────────────────── */
export default function KaiwaLandingPage() {
  return (
    <div style={{ fontFamily: FONT, color: TEXT_DARK, background: BG_WHITE, overflowX: 'hidden' }}>

      {/* ━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━ */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px 24px 60px',
          background: `linear-gradient(180deg, ${BG_WHITE} 0%, ${BG_AMBER}40 50%, ${BG_EMERALD}30 100%)`,
          position: 'relative',
        }}
      >
        {/* Pill badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 20px',
            borderRadius: 100,
            background: `linear-gradient(135deg, ${GOLD}12, ${GOLD}20)`,
            border: `1px solid ${GOLD}40`,
            marginBottom: 40,
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD }} />
          <span style={{ fontFamily: FONT, fontSize: 12, fontWeight: 600, color: GOLD, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            TONIOLAB.COM
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontFamily: FONT,
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 800,
            color: TEXT_DARK,
            textAlign: 'center',
            lineHeight: 1.3,
            margin: 0,
            maxWidth: 720,
            letterSpacing: '-0.02em',
          }}
        >
          同じ日本語を、
          <br />
          <GradientText>4段階の英語</GradientText>で分解する。
        </h1>

        {/* Sub headline */}
        <p
          style={{
            fontFamily: FONT,
            fontSize: 'clamp(14px, 2vw, 17px)',
            color: TEXT_MED,
            textAlign: 'center',
            lineHeight: 1.9,
            maxWidth: 560,
            margin: '24px 0 40px',
          }}
        >
          ネイティブが頭の中で文を組み立てるプロセスを可視化。
          <br />
          他にないメソッドで、1日10フレーズ、365日。
        </p>

        {/* Interactive Demo -- the hero */}
        <HeroDemo />

        {/* CTA */}
        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link href="/english/izakaya-toeic/kaiwa" style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '18px 52px',
                borderRadius: 14,
                background: `linear-gradient(135deg, ${GOLD}, #C49B2F)`,
                color: BG_WHITE,
                fontFamily: FONT,
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: `0 4px 16px ${GOLD}44, 0 1px 3px rgba(28,25,23,0.1)`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 28px ${GOLD}55, 0 2px 6px rgba(28,25,23,0.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${GOLD}44, 0 1px 3px rgba(28,25,23,0.1)`;
              }}
            >
              無料で始める
            </div>
          </Link>
          <p style={{ fontFamily: FONT, fontSize: 13, color: TEXT_LIGHT, marginTop: 16 }}>
            登録不要 -- ブラウザだけで始められます
          </p>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(32px, 6vw, 80px)',
            marginTop: 48,
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '3,650', label: 'フレーズ' },
            { num: '365', label: '日' },
            { num: '0', label: '円' },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  background: `linear-gradient(135deg, ${GOLD} 0%, ${EMERALD} 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.num}
              </div>
              <div style={{ fontFamily: FONT, fontSize: 14, color: TEXT_LIGHT, marginTop: 4, letterSpacing: '0.06em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ PROBLEM ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: BG_WHITE }}>
        <div style={narrowContainer}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              PROBLEM
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              こんな経験、ありませんか？
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              'How are you? に Good. しか返せない',
              'オンライン英会話の無料体験が怖くて申し込めない',
              '海外旅行でレストランの注文ができなくて指差し',
              '文法は勉強した。単語も覚えた。でも口から出ない',
              'Duolingoは続けている。でも会話になると真っ白',
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  padding: '22px 28px',
                  background: BG_STONE,
                  borderRadius: 14,
                  borderLeft: `4px solid ${GOLD}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(4px)';
                  e.currentTarget.style.boxShadow = SHADOW_SM;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontFamily: FONT, fontSize: 15, color: TEXT_DARK, lineHeight: 1.8 }}>
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ INSIGHT (在庫理論) ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: `linear-gradient(180deg, ${BG_STONE} 0%, ${BG_AMBER}30 100%)` }}>
        <div style={narrowContainer}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: EMERALD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              INSIGHT
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              足りないのは度胸じゃない。
              <br />
              <GradientText>在庫</GradientText>です。
            </h2>
          </div>

          {/* Karaoke analogy */}
          <div
            style={{
              background: BG_WHITE,
              borderRadius: 16,
              padding: '36px 32px',
              boxShadow: SHADOW_MD,
              marginBottom: 48,
              lineHeight: 2.0,
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 16, color: TEXT_MED, margin: 0 }}>
              カラオケを想像してください。歌詞を知らない曲は歌えない。でも、サビだけ知っていれば「なんとなく歌える」。英会話もまったく同じです。完璧な文法より、使い回せるフレーズの在庫。それが、口から英語が出る唯一の条件です。
            </p>
          </div>

          {/* Research card */}
          <div
            style={{
              background: BG_WHITE,
              borderRadius: 16,
              padding: '36px 32px',
              border: `2px solid ${GOLD}`,
              boxShadow: `0 4px 20px ${GOLD}18`,
              textAlign: 'center',
              marginBottom: 56,
            }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: 'clamp(36px, 5vw, 48px)',
                fontWeight: 800,
                background: `linear-gradient(135deg, ${GOLD} 0%, #C49B2F 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: 12,
              }}
            >
              58.6%
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: TEXT_DARK, fontWeight: 600, margin: '0 0 8px' }}>
              ネイティブの会話は定型フレーズでできている
            </p>
            <p style={{ fontFamily: FONT, fontSize: 13, color: TEXT_LIGHT, margin: 0 }}>
              Erman & Warren (2000)
            </p>
          </div>

          {/* Milestone numbers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 20,
              marginBottom: 48,
            }}
          >
            {[
              { num: '50-100', label: '旅行で使える' },
              { num: '300', label: '日常会話レベル' },
              { num: '1,000', label: '自信を持てる' },
            ].map((m) => (
              <div
                key={m.label}
                style={{
                  textAlign: 'center',
                  background: BG_WHITE,
                  borderRadius: 14,
                  padding: '28px 20px',
                  boxShadow: SHADOW_SM,
                }}
              >
                <div
                  style={{
                    fontFamily: FONT,
                    fontSize: 32,
                    fontWeight: 800,
                    color: GOLD,
                    marginBottom: 8,
                  }}
                >
                  {m.num}
                </div>
                <div style={{ fontFamily: FONT, fontSize: 14, color: TEXT_MED }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div
            style={{
              textAlign: 'center',
              background: `linear-gradient(135deg, ${BG_AMBER} 0%, ${BG_EMERALD} 100%)`,
              borderRadius: 14,
              padding: '28px 24px',
            }}
          >
            <p style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: 0, letterSpacing: '0.02em' }}>
              1日10 x 30日 = <GradientText style={{ fontWeight: 800, fontSize: 22 }}>300</GradientText>。日常会話レベル。
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ METHOD (3 Steps) ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: BG_WHITE }}>
        <div style={narrowContainer}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              METHOD
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              なぜストーリーで覚えるのか
            </h2>
          </div>

          {/* Vertical timeline */}
          <div style={{ position: 'relative', paddingLeft: 56 }}>
            {/* Gradient connecting line */}
            <div
              style={{
                position: 'absolute',
                left: 19,
                top: 24,
                bottom: 24,
                width: 2,
                background: `linear-gradient(180deg, ${GOLD} 0%, ${EMERALD} 100%)`,
              }}
            />

            {[
              {
                step: '1',
                title: 'ストーリーで出会う',
                theory: 'Krashen -- Input Hypothesis',
                desc: '居酒屋を舞台にした会話の中で、自然にフレーズと出会う。教科書のように「覚えろ」とは言わない。物語の流れで、意味ごと体に入る。',
                color: GOLD,
              },
              {
                step: '2',
                title: 'カードで気づく',
                theory: 'Schmidt -- Noticing Hypothesis',
                desc: '出会ったフレーズをカード形式で振り返る。「あ、さっきの場面で使われていたやつだ」。この"気づき"が記憶を定着させる鍵。',
                color: '#D97706',
              },
              {
                step: '3',
                title: '解説で理解する',
                theory: 'Nation -- Four Strands',
                desc: '4段階の英語表現で、同じ意味の言い方を深掘り。ニュアンスの違いが分かると、自分の言葉として使えるようになる。',
                color: EMERALD,
              },
            ].map((item, i) => (
              <div key={i} style={{ position: 'relative', marginBottom: i < 2 ? 48 : 0 }}>
                {/* Step number circle */}
                <div
                  style={{
                    position: 'absolute',
                    left: -56,
                    top: 0,
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${item.color}, ${item.color}CC)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: FONT,
                    fontSize: 16,
                    fontWeight: 800,
                    color: BG_WHITE,
                    boxShadow: `0 2px 8px ${item.color}44`,
                  }}
                >
                  {item.step}
                </div>

                <div
                  style={{
                    background: BG_STONE,
                    borderRadius: 14,
                    padding: '28px 28px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: FONT, fontSize: 18, fontWeight: 700, color: TEXT_DARK, margin: 0 }}>
                      {item.title}
                    </h3>
                    <span
                      style={{
                        fontFamily: FONT,
                        fontSize: 11,
                        fontWeight: 600,
                        color: item.color,
                        background: `${item.color}14`,
                        padding: '4px 12px',
                        borderRadius: 100,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.theory}
                    </span>
                  </div>
                  <p style={{ fontFamily: FONT, fontSize: 15, color: TEXT_MED, lineHeight: 1.9, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ 4-LEVEL SYSTEM ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: BG_STONE }}>
        <div style={narrowContainer}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: EMERALD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              4-LEVEL SYSTEM
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.5 }}>
              同じ「ビールください」を、
              <br />
              4段階で覚える
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                level: 'Core',
                color: TEXT_MUTED,
                en: 'Beer, please.',
                ja: '最短。通じればOK。',
                borderWidth: 3,
              },
              {
                level: 'Vibe',
                color: GOLD,
                en: "I'll start with a beer.",
                ja: '感情が乗る。',
                borderWidth: 4,
              },
              {
                level: 'Scene',
                color: '#D97706',
                en: 'Let me get a beer. Whatever you have on tap.',
                ja: '場面に合う。',
                borderWidth: 5,
              },
              {
                level: 'Flow',
                color: EMERALD,
                en: 'Beer first. I need to unwind before I can even think about food.',
                ja: 'ネイティブの脳。',
                borderWidth: 6,
              },
            ].map((item) => (
              <div
                key={item.level}
                style={{
                  background: BG_WHITE,
                  borderRadius: 14,
                  padding: '24px 28px',
                  borderLeft: `${item.borderWidth}px solid ${item.color}`,
                  boxShadow: SHADOW_SM,
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = SHADOW_MD; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = SHADOW_SM; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span
                    style={{
                      fontFamily: FONT,
                      fontSize: 11,
                      fontWeight: 700,
                      color: item.color,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      background: `${item.color}12`,
                      padding: '3px 10px',
                      borderRadius: 6,
                    }}
                  >
                    {item.level}
                  </span>
                  <span style={{ fontFamily: FONT, fontSize: 13, color: TEXT_LIGHT }}>{item.ja}</span>
                </div>
                <p style={{ fontFamily: FONT, fontSize: 16, color: TEXT_DARK, fontWeight: 500, margin: 0, lineHeight: 1.7, fontStyle: 'italic' }}>
                  &ldquo;{item.en}&rdquo;
                </p>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: FONT, fontSize: 14, color: TEXT_MED, textAlign: 'center', marginTop: 36, lineHeight: 1.8 }}>
            最初はCoreだけでいい。でもFlowまで見ると、英語の世界が変わる。
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ COEXISTENCE ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: BG_WHITE }}>
        <div style={narrowContainer}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              COEXISTENCE
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              今やっているアプリ、
              <br />
              やめなくていい
            </h2>
          </div>

          {/* Visual formula */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              marginBottom: 48,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                background: BG_STONE,
                borderRadius: 12,
                padding: '16px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: FONT, fontSize: 13, color: TEXT_LIGHT, marginBottom: 4 }}>Your App</div>
              <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: TEXT_DARK }}>5<span style={{ fontSize: 14, fontWeight: 500, color: TEXT_MED }}>min</span></div>
            </div>
            <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 300, color: TEXT_LIGHT }}>+</span>
            <div
              style={{
                background: `linear-gradient(135deg, ${BG_AMBER} 0%, ${BG_EMERALD} 100%)`,
                borderRadius: 12,
                padding: '16px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: FONT, fontSize: 13, color: TEXT_MED, marginBottom: 4 }}>英会話マスター365</div>
              <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: TEXT_DARK }}>5<span style={{ fontSize: 14, fontWeight: 500, color: TEXT_MED }}>min</span></div>
            </div>
            <span style={{ fontFamily: FONT, fontSize: 28, fontWeight: 300, color: TEXT_LIGHT }}>=</span>
            <div
              style={{
                background: BG_WHITE,
                borderRadius: 12,
                padding: '16px 24px',
                textAlign: 'center',
                border: `2px solid ${EMERALD}`,
              }}
            >
              <div style={{ fontFamily: FONT, fontSize: 13, color: EMERALD, marginBottom: 4, fontWeight: 600 }}>合計</div>
              <div style={{ fontFamily: FONT, fontSize: 24, fontWeight: 800, color: EMERALD }}>10<span style={{ fontSize: 14, fontWeight: 500 }}>min/day</span></div>
            </div>
          </div>

          {/* Comparison */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
            {[
              { app: 'Duolingo', role: '文法の基礎', color: '#58CC02' },
              { app: 'スタディサプリ', role: 'TOEIC対策', color: '#4A90D9' },
              { app: '英会話マスター365', role: '口から出すフレーズの在庫', color: GOLD },
            ].map((item) => (
              <div
                key={item.app}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '18px 24px',
                  background: BG_STONE,
                  borderRadius: 12,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: TEXT_DARK, minWidth: 140 }}>{item.app}</span>
                <span style={{ fontFamily: FONT, fontSize: 14, color: TEXT_MED }}>= {item.role}</span>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: FONT, fontSize: 17, fontWeight: 600, color: TEXT_DARK, textAlign: 'center', lineHeight: 1.8 }}>
            置き換えじゃない。<GradientText>追加</GradientText>。5分足すだけ。
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ TRY IT NOW ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: `linear-gradient(180deg, ${BG_AMBER}30 0%, ${BG_WHITE} 100%)` }}>
        <div style={{ ...narrowContainer, maxWidth: 580 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: '#EA580C', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              TRY IT NOW
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.5 }}>
              3問だけ、やってみよう
            </h2>
            <p style={{ fontFamily: FONT, fontSize: 14, color: TEXT_MED, marginTop: 12 }}>
              日本語を見て、英語を考えてからタップ。4段階が出てくる。
            </p>
          </div>

          <TryItQuiz />

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/english/izakaya-toeic/kaiwa" style={{ textDecoration: 'none' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '16px 44px',
                  borderRadius: 14,
                  background: `linear-gradient(135deg, ${GOLD}, #C49B2F)`,
                  color: BG_WHITE,
                  fontFamily: FONT,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  boxShadow: `0 4px 16px ${GOLD}44`,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                Day 1 から始める
              </div>
            </Link>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ CHARACTERS ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: `linear-gradient(180deg, ${BG_STONE} 0%, ${BG_AMBER}20 100%)` }}>
        <div style={wideContainer}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: EMERALD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              CHARACTERS
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              居酒屋「のれん」の仲間たち
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 20,
              marginBottom: 48,
            }}
          >
            <CharacterCard name="Yuki" age="28F" role="商社OL" desc="英語初心者。物語の主人公。仕事で英語が必要になり、のれんに通い始める。" color={GOLD} />
            <CharacterCard name="権藤マスター" age="58M" role="居酒屋のマスター" desc="元翻訳家。英語の師匠。さりげないアドバイスが、いつも核心をつく。" color="#78716C" />
            <CharacterCard name="Takeshi" age="35M" role="エンジニア" desc="真面目で不器用。リスニングは得意だけど、話すのが苦手。" color="#3B82F6" />
            <CharacterCard name="Lisa" age="32F" role="帰国子女" desc="明るくて、みんなの架け橋。ネイティブ表現を惜しみなく教えてくれる。" color={EMERALD} />
            <CharacterCard name="Kenji" age="45M" role="サラリーマン" desc="プレゼンに英語が必要。超初心者だけど、人一倍やる気がある。" color="#D97706" />
            <CharacterCard name="Mina" age="24F" role="カフェ店員" desc="英語への憧れと不安が半々。Yukiと一緒に少しずつ成長していく。" color="#EC4899" />
          </div>

          <p style={{ fontFamily: FONT, fontSize: 15, color: TEXT_MED, textAlign: 'center', lineHeight: 1.8 }}>
            毎日の10フレーズは、この6人の会話の中で出てきます。
          </p>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ ROADMAP ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: BG_WHITE }}>
        <div style={narrowContainer}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              ROADMAP
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              12ヶ月のロードマップ
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { month: '1', theme: '自己紹介・あいさつ', count: '300' },
              { month: '2', theme: '日常生活・買い物', count: '600' },
              { month: '3', theme: 'レストラン・食事', count: '900' },
              { month: '4', theme: '旅行・交通', count: '1,200' },
              { month: '5', theme: '仕事・職場', count: '1,500' },
              { month: '6', theme: '趣味・エンタメ', count: '1,800' },
              { month: '7', theme: '健康・体調', count: '2,100' },
              { month: '8', theme: '感情・意見', count: '2,400' },
              { month: '9', theme: 'ニュース・社会', count: '2,700' },
              { month: '10', theme: '議論・ディベート', count: '3,000' },
              { month: '11', theme: 'ビジネス応用', count: '3,300' },
              { month: '12', theme: '総まとめ・実践', count: '3,650' },
            ].map((row, i) => (
              <div
                key={row.month}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 1fr auto',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 20px',
                  borderRadius: 10,
                  background: i === 0 ? `linear-gradient(135deg, ${BG_AMBER} 0%, ${BG_EMERALD}60 100%)` : (i % 2 === 0 ? BG_STONE : BG_WHITE),
                  border: i === 0 ? `1px solid ${GOLD}40` : 'none',
                }}
              >
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 13,
                    fontWeight: 700,
                    color: i === 0 ? GOLD : TEXT_LIGHT,
                    letterSpacing: '0.04em',
                  }}
                >
                  Month {row.month}
                </span>
                <span style={{ fontFamily: FONT, fontSize: 15, color: i === 0 ? TEXT_DARK : TEXT_MED, fontWeight: i === 0 ? 600 : 400 }}>
                  {row.theme}
                </span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: 700,
                    color: i === 0 ? GOLD : TEXT_LIGHT,
                  }}
                >
                  {row.count}
                </span>
              </div>
            ))}
          </div>

          {/* Big number */}
          <div style={{ textAlign: 'center', marginTop: 56 }}>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 'clamp(48px, 8vw, 72px)',
                fontWeight: 800,
                background: `linear-gradient(135deg, ${GOLD} 0%, ${EMERALD} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              3,650
            </div>
            <p style={{ fontFamily: FONT, fontSize: 16, color: TEXT_MED, marginTop: 8 }}>
              フレーズを1年で
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ CREATOR ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: BG_WHITE }}>
        <div style={{ ...narrowContainer, maxWidth: 640 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: TEXT_MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              CREATOR
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.5 }}>
              TOEIC 900。喋れない。
            </h2>
          </div>

          <div style={{
            background: BG_STONE, borderRadius: 16, padding: '32px 28px',
            border: `1px solid ${BORDER_LIGHT}`,
          }}>
            <div style={{ fontFamily: FONT, fontSize: 15, color: TEXT_MED, lineHeight: 2.2 }}>
              <p style={{ margin: '0 0 16px' }}>
                読める。聞ける。書ける。でも喋れない。
              </p>
              <p style={{ margin: '0 0 16px' }}>
                4技能のうち3つクリアして、最後の1つで永遠に死んでいる。それが僕です。
              </p>
              <p style={{ margin: '0 0 16px' }}>
                原因はわかっていました。<strong style={{ color: TEXT_DARK }}>口から出せるフレーズの在庫がゼロ</strong>。文法は知っている。単語も知っている。でも、会話になると「何て言えばいいかわからない」。
              </p>
              <p style={{ margin: '0 0 16px' }}>
                市販のフレーズ帳を買いました。続きませんでした。アプリも試しました。翌日には忘れていました。
              </p>
              <p style={{ margin: '0 0 16px' }}>
                だから自分で作りました。ストーリーの中で出会い、4段階で分解し、文脈ごと体に入れる。自分が本当に欲しかったものを、そのまま形にしました。
              </p>
              <p style={{ margin: 0 }}>
                毎日更新しています。一緒にやりませんか。
              </p>
            </div>

            <div style={{
              marginTop: 24, paddingTop: 20,
              borderTop: `1px solid ${BORDER}`,
              display: 'flex', alignItems: 'center', gap: 16,
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: `linear-gradient(135deg, ${GOLD}, ${EMERALD})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT, fontSize: 16, fontWeight: 800, color: BG_WHITE,
              }}>T</div>
              <div>
                <div style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: TEXT_DARK }}>
                  Tonio
                </div>
                <div style={{ fontFamily: FONT, fontSize: 12, color: TEXT_LIGHT }}>
                  TOEIC 900 / Speaking 0 / Builder
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ FAQ ━━━━━━━━━━━━━━━━━━ */}
      <section style={{ ...sectionPadding, background: BG_STONE }}>
        <div style={{ ...narrowContainer, maxWidth: 680 }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <p style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: EMERALD, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
              FAQ
            </p>
            <h2 style={{ fontFamily: FONT, fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, color: TEXT_DARK, margin: 0, letterSpacing: '-0.01em', lineHeight: 1.4 }}>
              よくある質問
            </h2>
          </div>

          <div
            style={{
              background: BG_WHITE,
              borderRadius: 16,
              padding: '8px 32px',
              boxShadow: SHADOW_MD,
            }}
          >
            <FAQItem
              q="本当に無料？"
              a="完全無料。広告もなし。個人開発のプロジェクトです。"
            />
            <FAQItem
              q="英語初心者でも大丈夫？"
              a="むしろ初心者のために作りました。Day 1は「はじめまして」から始まります。"
            />
            <FAQItem
              q="1日何分かかる？"
              a="5分。通勤電車で。お昼休みに。寝る前に。スキマ時間で完結します。"
            />
            <FAQItem
              q="他のアプリと何が違う？"
              a="4段階メソッド。同じ日本語をCore（骨格）→Vibe（感情）→Scene（場面）→Flow（ネイティブの脳内）の4レベルで分解します。ネイティブの思考プロセスを可視化するアプローチは他にありません。"
            />
            <FAQItem
              q="TOEICに効く？"
              a="TOEIC対策は「のれん30夜」で。英会話マスター365は会話の在庫づくりに特化しています。"
            />
            <FAQItem
              q="スマホで使える？"
              a="ブラウザベースなのでスマホもPCもOK。アプリのインストールは不要です。"
            />
            <FAQItem
              q="続けられるか不安"
              a="毎日ストーリーが進みます。続きが気になるから続く。単語帳とは別物です。"
            />
            <FAQItem
              q="いつから始められる？"
              a="今すぐ。登録も不要。このページのボタンを押すだけで始められます。"
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ━━━━━━━━━━━━━━━━━━ FINAL CTA ━━━━━━━━━━━━━━━━━━ */}
      <section
        style={{
          padding: '120px 24px',
          background: `linear-gradient(180deg, ${BG_WHITE} 0%, ${BG_AMBER}40 30%, ${BG_EMERALD}30 70%, ${BG_WHITE} 100%)`,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: `Georgia, "Times New Roman", ${FONT}`,
              fontSize: 'clamp(22px, 4vw, 32px)',
              fontWeight: 700,
              color: TEXT_DARK,
              lineHeight: 1.6,
              margin: '0 0 20px',
              letterSpacing: '0.01em',
            }}
          >
            度胸は最初から足りていた。
            <br />
            足りなかったのは、<GradientText style={{ fontFamily: `Georgia, "Times New Roman", serif` }}>在庫</GradientText>。
          </h2>
          <p style={{ fontFamily: FONT, fontSize: 16, color: TEXT_MED, lineHeight: 1.8, margin: '0 0 48px' }}>
            1日10フレーズ。30日で300。1年で3,650。
            <br />
            あなたの英語は、ここから変わる。
          </p>

          <Link href="/english/izakaya-toeic/kaiwa" style={{ textDecoration: 'none' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '20px 56px',
                borderRadius: 14,
                background: `linear-gradient(135deg, ${GOLD}, #C49B2F)`,
                color: BG_WHITE,
                fontFamily: FONT,
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.04em',
                boxShadow: `0 4px 16px ${GOLD}44, 0 1px 3px rgba(28,25,23,0.1)`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 28px ${GOLD}55, 0 2px 6px rgba(28,25,23,0.12)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 16px ${GOLD}44, 0 1px 3px rgba(28,25,23,0.1)`;
              }}
            >
              今日の10フレーズを始める
            </div>
          </Link>

          <p style={{ fontFamily: FONT, fontSize: 14, color: TEXT_MUTED, marginTop: 20, lineHeight: 1.8 }}>
            Day 1 -- はじめまして。ここから全てが始まる。
          </p>

          <div style={{ marginTop: 64 }}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{
                fontFamily: FONT,
                fontSize: 13,
                color: TEXT_LIGHT,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.06em',
                padding: '8px 16px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = TEXT_MED; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = TEXT_LIGHT; }}
            >
              Back to top
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
