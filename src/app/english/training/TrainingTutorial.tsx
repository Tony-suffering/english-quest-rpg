'use client';

import { useState, useEffect, useCallback } from 'react';

const TUTORIAL_KEY = 'toeic_training_tutorial_done';

interface TutorialStep {
  title: string;
  body: string;
  icon: string;
  iconColor: string;
}

const STEPS: TutorialStep[] = [
  {
    icon: 'T',
    iconColor: '#D4AF37',
    title: 'TOEIC + 英会話 TRAINING へようこそ！',
    body: 'ここがあなたのトレーニング基地です。\n\nTOEICスコアアップに直結する\nフレーズと単語が30日分、\n合計600個すべて入っています。\n\n英会話でも使える実践的な表現ばかり。\nカレンダーから今日の分を始めましょう！',
  },
  {
    icon: '31',
    iconColor: '#3B82F6',
    title: 'カレンダーで日付をタップ',
    body: 'まず左のカレンダーで日付をタップします。\n\nその日に割り当てられた\nフレーズと単語が右側に表示されます。\n\n金色の丸がついた日 = レビュー済み\n何もない日 = まだやっていない日\n\n毎日コツコツ、が一番効きます。',
  },
  {
    icon: 'A',
    iconColor: '#10B981',
    title: 'カードの使い方',
    body: '右側にカードが表示されます。\n\n1. 英語を見て意味を考える\n2. カードをタップして答え合わせ\n3. 覚えていたらレベルアップボタンを押す\n\nレベルが上がるとカードが進化します！',
  },
  {
    icon: '7',
    iconColor: '#A855F7',
    title: 'カードは7段階で進化！',
    body: 'Lv.1 タマゴ（赤）\nLv.2 孵化（オレンジ）\nLv.3 ルーキー（黄）\nLv.4 ファイター（緑）\nLv.5 チャンピオン（青）\nLv.6 エリート（藍）\nLv.7 マスター（紫）\n\n全部マスターに育てよう！',
  },
  {
    icon: 'S',
    iconColor: '#EC4899',
    title: 'スロット演出で盛り上がる！',
    body: 'レベルアップするたびにガチャが回ります。\n\nBONUS → GREAT → SUPER\n→ MEGA → LEGENDARY\n\n連続で当たるとFEVER MODE突入！\nパチンコ風の演出で楽しく続けられます。',
  },
  {
    icon: 'B',
    iconColor: '#3B82F6',
    title: 'BGMが流れます',
    body: 'トレーニング中はBGMが自動で流れます。\n集中力を高めるBGMと、\nFEVER時の専用BGMの2種類。\n\nOFFにしたい場合は\nサイドバーの「設定」から\nBGM・サウンドを個別に調整できます。\n\n音量もスライダーで細かく設定OK。',
  },
  {
    icon: 'E',
    iconColor: '#F59E0B',
    title: 'エピソードから追加もできる',
    body: 'TOEIC酒場のエピソードで\n「トレーニングに追加」した表現も\nここに自動で表示されます。\n\nストーリーで覚えた生きた英会話フレーズを\n繰り返し復習して定着させましょう！',
  },
  {
    icon: '!',
    iconColor: '#D4AF37',
    title: 'さあ、始めよう！',
    body: 'カレンダーの今日の日付をタップして\n最初のカードに挑戦！\n\n1日20個ずつ。30日で600個。\nTOEICも英会話も、これ1つでカバー。\nスコアアップの最短ルートです。',
  },
];

export default function TrainingTutorial() {
  const [step, setStep] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const done = localStorage.getItem(TUTORIAL_KEY);
    if (!done) {
      const timer = setTimeout(() => {
        setStep(0);
        setVisible(true);
      }, 800);
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
          animation: step === 0 ? 'tut-enter 0.4s ease-out' : undefined,
        }}
      >
        {/* Gold top accent */}
        <div style={{
          height: 3,
          background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
        }} />

        <div style={{ padding: '28px 24px 24px' }}>
          {/* Icon + step dots row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
            {/* Icon badge */}
            <div style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: current.iconColor + '15',
              border: `2px solid ${current.iconColor}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 900,
              color: current.iconColor,
              flexShrink: 0,
            }}>
              {current.icon}
            </div>

            {/* Step dots */}
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
            minHeight: 120,
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
                  transition: 'all 0.15s',
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
                transition: 'all 0.15s',
              }}
            >
              {isLast ? 'START!' : '次へ'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tut-enter {
          from { opacity: 0; transform: scale(0.9) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
