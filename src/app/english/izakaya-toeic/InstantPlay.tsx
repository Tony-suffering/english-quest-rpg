'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const GOLD = '#D4AF37';
const STONE_BG = '#FAFAF9';
const STONE_100 = '#F5F5F4';
const TEXT_MAIN = '#1C1917';
const TEXT_SUB = '#57534E';
const TEXT_MUTED = '#A8A29E';
const BORDER = '#E7E5E4';
const SHADOW = '0 2px 8px rgba(0,0,0,0.04)';
const GREEN = '#16A34A';
const RED = '#DC2626';
const LS_KEY = 'izakaya-instant-played';

const CHOICES = [
  { label: 'A', text: 'He wants to know the available options', correct: true },
  { label: 'B', text: "He doesn't want any beer", correct: false },
  { label: 'C', text: 'He wants the cheapest one', correct: false },
] as const;

function playSound(type: 'correct' | 'wrong' | 'tap') {
  if (typeof window === 'undefined') return;
  try {
    const ctx = new AudioContext();
    const make = (freq: number, t: number, dur: number, wave: OscillatorType = 'sine', vol = 0.12) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = freq; o.type = wave;
      g.gain.setValueAtTime(vol, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + t + dur);
      o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + dur);
    };
    if (type === 'correct') { make(523, 0, 0.15); make(659, 0.08, 0.15); make(784, 0.16, 0.25); }
    if (type === 'wrong') { make(200, 0, 0.2, 'sawtooth', 0.08); make(150, 0.1, 0.2, 'sawtooth', 0.06); }
    if (type === 'tap') make(800, 0, 0.04, 'sine', 0.06);
  } catch { /* */ }
}

function CharAvatar({ src, color, alt }: { src: string; color: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: 40, height: 40, borderRadius: '50%', border: `2px solid ${color}`,
        objectFit: 'cover', flexShrink: 0,
      }}
    />
  );
}

function DialogueLine({ charId, color, name, text }: { charId: string; color: string; name: string; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
      <CharAvatar src={`/characters/${charId}.png`} color={color} alt={name} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 2 }}>{name}</div>
        <div style={{
          backgroundColor: '#fff', border: `1px solid ${BORDER}`, borderRadius: '2px 12px 12px 12px',
          padding: '8px 14px', fontSize: 14, color: TEXT_MAIN, lineHeight: 1.6,
        }}>
          {text}
        </div>
      </div>
    </div>
  );
}

export default function InstantPlay() {
  const [selected, setSelected] = useState<number | null>(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState<boolean | null>(null);

  useEffect(() => {
    setAlreadyPlayed(localStorage.getItem(LS_KEY) === 'true');
  }, []);

  if (alreadyPlayed === null) return null;

  if (alreadyPlayed && selected === null) {
    return (
      <div style={{
        backgroundColor: STONE_BG, borderRadius: 16, border: `1px solid ${BORDER}`,
        padding: '20px 24px', boxShadow: SHADOW, textAlign: 'center',
      }}>
        <p style={{ color: TEXT_SUB, fontSize: 14, margin: '0 0 14px' }}>
          お帰りなさい。
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/english/izakaya-toeic/episodes/ep-001" style={{
            color: GOLD, fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>
            Episode 一覧
          </Link>
          <span style={{ color: TEXT_MUTED }}>|</span>
          <Link href="/english/izakaya-toeic/tonight" style={{
            color: GOLD, fontSize: 13, fontWeight: 600, textDecoration: 'none',
          }}>
            今夜の1杯
          </Link>
        </div>
      </div>
    );
  }

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    playSound('tap');
    setSelected(index);
    setTimeout(() => {
      playSound(CHOICES[index].correct ? 'correct' : 'wrong');
    }, 150);
    localStorage.setItem(LS_KEY, 'true');
  };

  const isCorrect = selected !== null ? CHOICES[selected].correct : null;

  return (
    <>
      <style>{`
        @keyframes instantFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{
        backgroundColor: STONE_BG, borderRadius: 16, border: `1px solid ${BORDER}`,
        boxShadow: SHADOW, overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center', padding: '16px 20px 12px',
          borderBottom: `1px solid ${BORDER}`,
        }}>
          <span style={{
            color: GOLD, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em',
          }}>
            -- お試し来店 --
          </span>
        </div>

        {/* Scene dialogue */}
        <div style={{ padding: '16px 20px', backgroundColor: STONE_100 }}>
          <DialogueLine charId="master" color="#78716C" name="マスター" text="タケシ。ビール何にする。" />
          <DialogueLine charId="takeshi" color="#F59E0B" name="タケシ" text="えーと、何があるんすか？" />
        </div>

        {/* Question */}
        <div style={{ padding: '16px 20px 8px' }}>
          <p style={{
            fontSize: 14, fontWeight: 600, color: TEXT_MAIN,
            margin: '0 0 14px', lineHeight: 1.5,
          }}>
            What does Takeshi&apos;s response mean?
          </p>

          {/* Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CHOICES.map((c, i) => {
              const isThis = selected === i;
              let borderColor = BORDER;
              let bg = '#fff';
              if (selected !== null) {
                if (c.correct) { borderColor = GREEN; bg = '#F0FDF4'; }
                else if (isThis) { borderColor = RED; bg = '#FEF2F2'; }
              }
              return (
                <button
                  key={c.label}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 14px', borderRadius: 12,
                    border: `1.5px solid ${borderColor}`, backgroundColor: bg,
                    cursor: selected !== null ? 'default' : 'pointer',
                    transition: 'border-color 0.2s, background-color 0.2s',
                    textAlign: 'left', fontSize: 13, color: TEXT_MAIN,
                    lineHeight: 1.5, width: '100%',
                  }}
                >
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%',
                    backgroundColor: STONE_100, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 11, fontWeight: 700,
                    color: TEXT_SUB, flexShrink: 0,
                  }}>
                    {c.label}
                  </span>
                  {c.text}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result */}
        {selected !== null && (
          <div style={{
            padding: '16px 20px 20px',
            animation: 'instantFadeIn 0.35s ease-out',
          }}>
            <div style={{
              backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2',
              border: `1px solid ${isCorrect ? '#BBF7D0' : '#FECACA'}`,
              borderRadius: 12, padding: '14px 16px', marginBottom: 16,
            }}>
              <p style={{
                fontSize: 13, fontWeight: 700, color: isCorrect ? GREEN : RED,
                margin: '0 0 8px',
              }}>
                {isCorrect ? '正解' : '不正解'}
              </p>
              <p style={{ fontSize: 13, color: TEXT_MAIN, margin: '0 0 6px', lineHeight: 1.6, fontWeight: 600 }}>
                これが「間接回答」-- TOEICで最も出る罠パターン
              </p>
              <p style={{ fontSize: 12, color: TEXT_SUB, margin: '0 0 6px', lineHeight: 1.7 }}>
                「何にする？」に「何があるか」で返した。直接答えてないけど、会話として自然。
              </p>
              <p style={{ fontSize: 12, color: TEXT_SUB, margin: 0, lineHeight: 1.7 }}>
                Part 2の25問中、約10問がこのパターン。
              </p>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/english/izakaya-toeic/episodes/ep-001" style={{
                display: 'block', textAlign: 'center', padding: '12px 16px',
                borderRadius: 12, backgroundColor: GOLD, color: '#fff',
                fontSize: 14, fontWeight: 700, textDecoration: 'none',
                letterSpacing: '0.02em',
              }}>
                Episode 1 で続きを見る
              </Link>
              <Link href="/english/izakaya-toeic/tonight" style={{
                display: 'block', textAlign: 'center', padding: '12px 16px',
                borderRadius: 12, backgroundColor: '#fff',
                border: `1.5px solid ${BORDER}`, color: TEXT_SUB,
                fontSize: 14, fontWeight: 600, textDecoration: 'none',
              }}>
                今夜の1杯
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
