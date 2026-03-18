'use client';

import { useState, useEffect, useCallback } from 'react';

const TUTORIAL_KEY = 'toeic_episode_tutorial_done';

interface TutorialStep {
  title: string;
  body: string;
  icon: string;
  iconColor: string;
}

const STEPS: TutorialStep[] = [
  {
    icon: 'EP',
    iconColor: '#D4AF37',
    title: 'エピソードの楽しみ方',
    body: 'TOEIC酒場のキャラクターたちが\n繰り広げるストーリーを聴きながら\nリスニング力と英会話力を鍛えます。\n\n楽しみながらTOEIC + 英会話の\n両方が身につく！使い方を説明しますね。',
  },
  {
    icon: 'P',
    iconColor: '#3B82F6',
    title: '再生ボタンで聴く',
    body: '画面中央の大きな再生ボタンをタップ！\n\n英語で読み上げられます。\n下のスライダーで速度を調整できます。\n\nまずはゆっくり聴いて、\n慣れたらスピードを上げましょう。',
  },
  {
    icon: '+',
    iconColor: '#10B981',
    title: '「トレーニングに追加」で保存',
    body: '覚えたい表現を見つけたら\n「トレーニングに追加」をタップ！\n\nトレーニングページに自動で追加されて\n繰り返し復習できるようになります。\n\nTOEICにも英会話にも効く表現を\nどんどんストックしましょう。',
  },
  {
    icon: 'L',
    iconColor: '#A855F7',
    title: '全行リストで振り返り',
    body: '画面を下にスクロールすると\n全ての会話が一覧で見れます。\n\n各行の右にも「+Training」ボタンが\nあるので、気になる表現は\nどんどん追加しましょう！',
  },
  {
    icon: 'Q',
    iconColor: '#EC4899',
    title: 'クイズで実力チェック',
    body: 'ストーリーを聴き終わったら\n一番下の「TOEIC問題に挑戦」をタップ。\n\n本番形式のクイズで理解度チェック！\n正解するとエピソードクリアです。',
  },
  {
    icon: '!',
    iconColor: '#D4AF37',
    title: 'さあ、聴いてみよう！',
    body: '再生ボタンを押してスタート！\n\n聴く → 表現を保存 → クイズに挑戦\n\nこの3ステップを繰り返すだけで\nTOEICリスニングも英会話力も伸びます。',
  },
];

export default function EpisodeTutorial() {
  const [step, setStep] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const done = localStorage.getItem(TUTORIAL_KEY);
    if (!done) {
      const timer = setTimeout(() => {
        setStep(0);
        setVisible(true);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const next = useCallback(() => {
    if (step >= STEPS.length - 1) {
      localStorage.setItem(TUTORIAL_KEY, 'true');
      setVisible(false);
      setTimeout(() => setStep(-1), 300);
    } else {
      setStep(s => s + 1);
    }
  }, [step]);

  const skip = useCallback(() => {
    localStorage.setItem(TUTORIAL_KEY, 'true');
    setVisible(false);
    setTimeout(() => setStep(-1), 300);
  }, []);

  if (step < 0) return null;
  const current = STEPS[step];
  if (!current) return null;
  const isLast = step === STEPS.length - 1;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={next}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Card */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 380,
          width: 'calc(100% - 40px)',
          background: '#111',
          borderRadius: 20,
          border: '1px solid #2a2a2a',
          boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,175,55,0.08)',
          overflow: 'hidden',
          animation: step === 0 ? 'ep-tut-enter 0.4s ease-out' : undefined,
        }}
      >
        {/* Gold top accent */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }} />

        <div style={{ padding: '28px 24px 24px' }}>
          {/* Icon + step dots */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: current.iconColor + '15',
              border: `2px solid ${current.iconColor}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 900,
              color: current.iconColor,
              flexShrink: 0,
            }}>
              {current.icon}
            </div>

            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              {STEPS.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === step ? 22 : 7,
                    height: 7,
                    borderRadius: 4,
                    background: i === step ? '#D4AF37' : i < step ? '#D4AF3760' : '#333',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Title */}
          <div style={{
            fontSize: 20,
            fontWeight: 900,
            color: '#fff',
            marginBottom: 14,
            lineHeight: 1.3,
          }}>
            {current.title}
          </div>

          {/* Body */}
          <div style={{
            fontSize: 14,
            color: '#aaa',
            lineHeight: 2,
            whiteSpace: 'pre-line',
            marginBottom: 24,
            minHeight: 100,
          }}>
            {current.body}
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
            {!isLast && (
              <button
                onClick={skip}
                style={{
                  padding: '11px 18px',
                  background: 'transparent',
                  border: '1px solid #333',
                  borderRadius: 10,
                  color: '#666',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                スキップ
              </button>
            )}
            <button
              onClick={next}
              style={{
                padding: '11px 28px',
                background: isLast
                  ? 'linear-gradient(135deg, #D4AF37, #B8941F)'
                  : '#D4AF37',
                border: 'none',
                borderRadius: 10,
                color: '#fff',
                fontSize: 15,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: isLast ? '0 4px 24px #D4AF3750' : '0 2px 8px #D4AF3730',
                letterSpacing: isLast ? 3 : 0,
              }}
            >
              {isLast ? 'START!' : '次へ'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ep-tut-enter {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
