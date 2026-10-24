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
    icon: 'D',
    iconColor: '#D4AF37',
    title: 'Daily Trainingへようこそ',
    body: '英会話マスター365で学んだフレーズや\n自分で登録した表現を\nここで繰り返しトレーニングします。\n\nカレンダー形式で管理、\nスロット演出で楽しく復習。\n\nこの説明は右上の「?」ボタンで\nいつでも見返せます。',
  },
  {
    icon: 'C',
    iconColor: '#3B82F6',
    title: 'カレンダーの見方',
    body: 'カレンダーが学習の地図です。\n\n日付ごとにフレーズが割り振られていて\nタップするとその日のカードが\n表示されます。\n\n各日付の下にある色バーは進捗の目安。\n全部クリアすると紫に変わります。\n\n今日の日付に白い丸がついています。',
  },
  {
    icon: '!',
    iconColor: '#EF4444',
    title: 'レベルアップの仕組み',
    body: 'カードの色付きバッジが\nレベルアップボタンです。\n\n覚えたらタップ。1日1回だけ上がります。\n翌日また来てタップしてください。\n\n7段階:\nLv.1 EGG → Lv.4 FIGHTER で完了扱い\nLv.5以降は録音・例文追加で到達。\n\n毎日コツコツが最強です。',
  },
  {
    icon: 'S',
    iconColor: '#F59E0B',
    title: 'スロット演出',
    body: 'レベルアップするたびに\nスロットが回ります。\n\n揃うとボーナスポイント獲得。\nフィーバーモードに入ると\nポイント倍率がアップ。\n\n演出はmy-trainingページ上部の\nトグルでON/OFFできます。',
  },
  {
    icon: 'R',
    iconColor: '#EC4899',
    title: '復習モード',
    body: '「復習」ボタンで\nカードを1枚ずつシャッフル表示。\n\nフィルター機能で\n未習得だけ、録音済みだけなど\n絞り込めます。\n\nキーボードショートカット対応(PC):\n矢印キーで前後移動。',
  },
  {
    icon: '+',
    iconColor: '#1C1917',
    title: '自分で登録できる',
    body: '右上の「+」ボタンで\n自分だけのフレーズを追加。\n\n英会話マスター365のストーリーや\nメモリアで出会った表現を\nここに登録して繰り返し復習。\n\n「トレーニングに追加」ボタンから\n自動登録もできます。',
  },
  {
    icon: 'L',
    iconColor: '#3B82F6',
    title: 'Listen -- 聴いて覚える',
    body: '「Listen」ボタンで\nその日のフレーズを音声で連続再生。\n\n速度調整もできるので\n最初はゆっくり、慣れたら速く。\n\n通勤中やスキマ時間に\n耳から覚えるのに最適です。',
  },
  {
    icon: '!',
    iconColor: '#D4AF37',
    title: 'さあ、始めよう！',
    body: 'やることはシンプル:\n\n1. カレンダーで今日の日付をタップ\n2. フレーズカードを確認\n3. 覚えたらレベルアップボタンを押す\n4. 明日また来て繰り返す\n\n毎日の積み重ねが\n英語力に変わります。',
  },
];

export default function TrainingTutorial({ forceOpen }: { forceOpen?: boolean }) {
  const [step, setStep] = useState(-1);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (forceOpen) {
      setStep(0);
      setVisible(true);
      return;
    }
    const done = localStorage.getItem(TUTORIAL_KEY);
    if (!done) {
      const timer = setTimeout(() => {
        setStep(0);
        setVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const next = useCallback(() => {
    if (step >= STEPS.length - 1) {
      localStorage.setItem(TUTORIAL_KEY, 'true');
      setVisible(false);
      setTimeout(() => setStep(-1), 300);
    } else {
      setStep(s => s + 1);
    }
  }, [step]);

  const prev = useCallback(() => {
    if (step > 0) setStep(s => s - 1);
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
  const isFirst = step === 0;

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
          maxWidth: 400,
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
          {/* Icon + step counter */}
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

            {/* Step counter + progress bar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <span style={{ fontSize: 11, color: '#666', fontWeight: 600 }}>
                {step + 1} / {STEPS.length}
              </span>
              <div style={{
                width: 100, height: 4, borderRadius: 2, background: '#222', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${((step + 1) / STEPS.length) * 100}%`,
                  background: 'linear-gradient(90deg, #D4AF37, #F59E0B)',
                  borderRadius: 2,
                  transition: 'width 0.3s ease',
                }} />
              </div>
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
            minHeight: 140,
          }}>
            {current.body}
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: 8,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: 8 }}>
              {!isFirst && (
                <button
                  onClick={prev}
                  style={{
                    padding: '11px 16px',
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
                  戻る
                </button>
              )}
              {!isLast && (
                <button
                  onClick={skip}
                  style={{
                    padding: '11px 16px',
                    background: 'transparent',
                    border: '1px solid #333',
                    borderRadius: 10,
                    color: '#555',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  スキップ
                </button>
              )}
            </div>
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
