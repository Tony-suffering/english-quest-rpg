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
    title: 'TOEIC単語トレーニングへようこそ',
    body: 'TOEICリスニングに出る単語・フレーズを\n毎日コツコツ覚えるページです。\n\n1日20個、1ヶ月で約620個。\n無理なく、楽しく、確実に。\n\nこの説明は右上の「?」ボタンで\nいつでも見返せます。',
  },
  {
    icon: 'C',
    iconColor: '#3B82F6',
    title: 'カレンダーの見方',
    body: '画面左のカレンダーが学習の地図です。\n\n1日〜31日の各日付に\n20個ずつフレーズが入っています。\n\n日付をタップするとその日の20個が\n右側に表示されます。\n\n今日の日付には白い丸がついています。\nまずはそこをタップしてみてください。',
  },
  {
    icon: 'D',
    iconColor: '#10B981',
    title: '各フレーズの見方',
    body: '日付をタップすると\nフレーズカードが並びます。\n\n各カードには:\n・英語フレーズ\n・日本語の意味\n・今のレベル（色付きバッジ）\n\nが表示されています。',
  },
  {
    icon: '!',
    iconColor: '#EF4444',
    title: 'レベルアップボタン（色付きボタン）',
    body: 'カードの横にある色付きのバッジ\n（「Lv.1 EGG」など）が\nレベルアップボタンです。\n\n覚えたと思ったらタップするだけ。\nタップするとレベルが1つ上がります。\n\n重要: 1日1回しかレベルアップできません。\n翌日また来てタップしてください。\n毎日の継続が大事です。',
  },
  {
    icon: '7',
    iconColor: '#A855F7',
    title: '7段階のレベル',
    body: '各フレーズは7段階で進化します:\n\nLv.1 EGG ... まだ覚えてない\nLv.2 HATCH ... 見たことはある\nLv.3 ROOKIE ... なんとなくわかる\nLv.4 FIGHTER ... 覚えた！\nLv.5 CHAMPION ... 録音もした\nLv.6 ELITE ... 例文も追加した\nLv.7 MASTER ... 完全に自分のもの\n\nFIGHTER(Lv.4)になるとボタンが\nグレーになって「完了」扱いです。',
  },
  {
    icon: 'B',
    iconColor: '#F59E0B',
    title: 'カレンダーの色バー',
    body: 'カレンダーの日付の下に\n小さな色付きバーが見えます。\n\nこのバーの色は\nその日のフレーズの平均レベルです。\n\n赤（EGG）→ 紫（MASTER）\nバーが紫になったらその日は制覇！\n\nどの日が終わっていて\nどの日がまだかが一目でわかります。',
  },
  {
    icon: 'X',
    iconColor: '#78716C',
    title: '覚えなくていいフレーズ',
    body: '「これは知ってる」「覚える必要ない」\nというフレーズもありますよね。\n\nFIGHTER(Lv.4)まで上げれば\nそのフレーズは完了扱いになり\nレビューに出てこなくなります。\n\n知ってるものはサクサク\nタップしてLv.4にしてしまいましょう。\n（1日1レベルずつなので3日で完了）',
  },
  {
    icon: '+',
    iconColor: '#1C1917',
    title: '自分で登録もできる',
    body: '右上の黒い「+」ボタンをタップすると\n自分だけのフレーズを追加できます。\n\n入力するもの:\n・英語フレーズ\n・日本語の意味\n・カテゴリ（自由入力）\n・日付（どの日に入れるか）\n\nTOEIC酒場のエピソードで出てきた\n表現を追加するのもおすすめです。',
  },
  {
    icon: 'R',
    iconColor: '#EC4899',
    title: '復習モード（PC用）',
    body: 'PCの場合、右上の「復習」ボタンで\nカードが1枚ずつ表示されます。\n\nシャッフルされたカードが出てきて\nレベルアップボタンを押して進めます。\n\nスロット演出つきで\nGPが貯まるとカードの見た目が\nアップグレードされます。\n\n楽しみながら復習できる仕組みです。',
  },
  {
    icon: 'L',
    iconColor: '#3B82F6',
    title: 'Listen -- 聴いて覚える',
    body: '右上の「Listen」ボタンをタップすると\nその日のフレーズを音声で\n連続再生するページに移動します。\n\n速度調整もできるので\n最初はゆっくり、慣れたら速く。\n\n通勤中やスキマ時間に\n耳から覚えるのに最適です。',
  },
  {
    icon: 'E',
    iconColor: '#10B981',
    title: 'TOEIC酒場と連携',
    body: 'TOEIC酒場のエピソードで\n「トレーニングに追加」した表現は\nこのページに自動で追加されます。\n\nエピソードで出会った\n生きた英会話表現を\nここで繰り返し復習しましょう。\n\nストーリーの文脈と一緒に覚えると\n記憶の定着率が格段に上がります。',
  },
  {
    icon: '?',
    iconColor: '#D4AF37',
    title: 'ボタンまとめ',
    body: '右上のボタン一覧:\n\n「Listen」... 音声で聴く\n「復習」... カード1枚ずつ復習(PC)\n「List」... 全フレーズ一覧表示\n「+」... 自分のフレーズを追加\n「?」... この説明をもう一度見る\n\nカレンダーの月名をタップすると\n今月に戻ります。\n「<」「>」で前月・翌月に移動。',
  },
  {
    icon: '!',
    iconColor: '#D4AF37',
    title: 'さあ、始めよう！',
    body: 'やることはシンプル:\n\n1. 今日の日付をタップ\n2. 20個のフレーズを確認\n3. 覚えたらレベルアップボタンを押す\n4. 明日また来て繰り返す\n\n毎日20個 x 30日 = 600個。\nこれだけでTOEICリスニングが変わる。\n\n頑張りましょう！',
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
