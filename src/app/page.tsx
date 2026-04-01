'use client';

import Link from 'next/link';
import { charIcon } from '@/data/izakaya-toeic/characters';

const G = '#D4AF37';
const G_BG = 'rgba(212,175,55,0.06)';
const G_BORDER = 'rgba(212,175,55,0.2)';
const EM = '#10B981';
const EM_BG = 'rgba(16,185,129,0.06)';
const EM_BORDER = 'rgba(16,185,129,0.2)';
const BG = '#FAFAF9';
const SURFACE = '#FFFFFF';
const TEXT = '#1C1917';
const TEXT_SUB = '#57534E';
const TEXT_MUTED = '#78716C';
const BORDER = '#E7E5E4';
const SHADOW = '0 2px 12px rgba(28,25,23,0.06)';
const SHADOW_LG = '0 8px 32px rgba(28,25,23,0.08)';
const FONT = 'system-ui, -apple-system, sans-serif';

export default function HomePage() {
  return (
    <div style={{
      minHeight: '100dvh', background: BG, fontFamily: FONT,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 20px',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 10, fontWeight: 700, letterSpacing: 4, color: TEXT_MUTED, marginBottom: 12,
        }}>
          TONIO LAB -- ENGLISH
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 900, margin: '0 0 12px', lineHeight: 1.3 }}>
          どっちから始める？
        </h1>
        <p style={{ fontSize: 14, color: TEXT_SUB, margin: 0, lineHeight: 1.8 }}>
          2つのアプリ。目的が違う。どっちも無料。
        </p>
      </div>

      {/* Two Cards */}
      <div style={{
        display: 'flex', gap: 16, maxWidth: 760, width: '100%',
        flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}>

        {/* ── 英会話マスター365 ── */}
        <Link href="/english/izakaya-toeic/kaiwa/lp" style={{
          flex: '1 1 340px', maxWidth: 380, textDecoration: 'none', color: TEXT,
          background: SURFACE, borderRadius: 20, overflow: 'hidden',
          border: `1px solid ${BORDER}`, boxShadow: SHADOW,
          transition: 'all 0.2s ease',
          display: 'flex', flexDirection: 'column',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = SHADOW_LG;
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = G_BORDER;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = SHADOW;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = BORDER;
          }}
        >
          {/* Accent bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${G}, ${G}66)` }} />

          <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignSelf: 'flex-start',
              padding: '3px 12px', borderRadius: 20, marginBottom: 16,
              background: G_BG, border: `1px solid ${G_BORDER}`,
              fontSize: 10, fontWeight: 700, color: G, letterSpacing: 2,
            }}>
              DAILY PHRASES
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px', lineHeight: 1.3 }}>
              英会話マスター<span style={{ color: G }}>365</span>
            </h2>

            <p style={{ fontSize: 14, color: TEXT_SUB, margin: '0 0 20px', lineHeight: 1.8, flex: 1 }}>
              日本語1つに英語4つ。
              <br />毎日10フレーズ、365日。
              <br />口から出すフレーズの在庫を作る。
            </p>

            {/* Mini example */}
            <div style={{
              background: BG, borderRadius: 10, padding: '14px 16px', marginBottom: 20,
              border: `1px solid ${BORDER}`,
            }}>
              <div style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 6 }}>
                Example: ビールください
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { level: 'CORE', text: 'Beer, please.', color: TEXT_MUTED },
                  { level: 'FLOW', text: 'Beer first. I need to unwind before I can even think about food.', color: G },
                ].map(l => (
                  <div key={l.level} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 9, fontWeight: 800, color: l.color, width: 36, flexShrink: 0 }}>{l.level}</span>
                    <span style={{ fontSize: 12, color: TEXT_SUB, lineHeight: 1.5 }}>{l.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              {[
                { v: '3,650', l: 'フレーズ' },
                { v: '365', l: '日' },
                { v: '0', l: '円' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: G }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              padding: '12px 0', background: G, color: '#fff',
              borderRadius: 10, fontWeight: 800, fontSize: 14, textAlign: 'center',
            }}>
              英会話マスターを始める
            </div>
          </div>
        </Link>

        {/* ── 居酒屋トーイック ── */}
        <Link href="/english/izakaya-toeic/lp" style={{
          flex: '1 1 340px', maxWidth: 380, textDecoration: 'none', color: TEXT,
          background: SURFACE, borderRadius: 20, overflow: 'hidden',
          border: `1px solid ${BORDER}`, boxShadow: SHADOW,
          transition: 'all 0.2s ease',
          display: 'flex', flexDirection: 'column',
        }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = SHADOW_LG;
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = EM_BORDER;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = SHADOW;
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = BORDER;
          }}
        >
          {/* Accent bar */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${EM}, ${EM}66)` }} />

          <div style={{ padding: '28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignSelf: 'flex-start',
              padding: '3px 12px', borderRadius: 20, marginBottom: 16,
              background: EM_BG, border: `1px solid ${EM_BORDER}`,
              fontSize: 10, fontWeight: 700, color: EM, letterSpacing: 2,
            }}>
              TOEIC DRAMA
            </div>

            <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 8px', lineHeight: 1.3 }}>
              居酒屋<span style={{ color: EM }}>TOEIC</span>
            </h2>

            <p style={{ fontSize: 14, color: TEXT_SUB, margin: '0 0 20px', lineHeight: 1.8, flex: 1 }}>
              全30話の連続ドラマ。
              <br />6人のキャラ。伏線。涙。
              <br />物語を読んだらTOEICが上がってた。
            </p>

            {/* Character preview */}
            <div style={{
              background: BG, borderRadius: 10, padding: '14px 16px', marginBottom: 20,
              border: `1px solid ${BORDER}`,
            }}>
              <div style={{ fontSize: 12, color: TEXT_MUTED, marginBottom: 10 }}>
                のれんの常連たち
              </div>
              <div style={{ display: 'flex', gap: -4, marginBottom: 8 }}>
                {['master', 'yuki', 'takeshi', 'lisa', 'kenji', 'mina'].map((id, i) => (
                  <img
                    key={id}
                    src={charIcon(id)}
                    alt=""
                    style={{
                      width: 32, height: 32, borderRadius: '50%',
                      border: '2px solid #fff', objectFit: 'cover',
                      marginLeft: i > 0 ? -8 : 0, position: 'relative',
                      zIndex: 6 - i,
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: 11, color: TEXT_SUB, lineHeight: 1.5 }}>
                480点のおっさんが泣きながら勉強してる。860点の帰国子女がプライドを砕かれてる。
              </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
              {[
                { v: '30', l: '話' },
                { v: '6', l: '人' },
                { v: '0', l: '円' },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: EM }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: TEXT_MUTED }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{
              padding: '12px 0', background: EM, color: '#fff',
              borderRadius: 10, fontWeight: 800, fontSize: 14, textAlign: 'center',
            }}>
              居酒屋トーイックを始める
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom note */}
      <div style={{ marginTop: 36, textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: TEXT_MUTED, margin: '0 0 4px' }}>
          登録不要 -- ブラウザだけで始められます
        </p>
        <p style={{ fontSize: 11, color: `${TEXT_MUTED}80`, margin: 0 }}>
          どっちも無料。併用もできる。
        </p>
      </div>
    </div>
  );
}
