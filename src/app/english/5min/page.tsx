'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { DAILY_LESSONS, type DailyLesson, type ConvoChoice } from '@/data/english/five-min-data';

// ── Colors ──────────────────────────────────────────────
const GOLD = '#D4AF37';
const GREEN = '#10B981';
const STONE_50 = '#FAFAF9';
const STONE_100 = '#F5F5F4';
const STONE_200 = '#E7E5E4';
const STONE_400 = '#A8A29E';
const STONE_500 = '#78716C';
const STONE_600 = '#57534E';
const STONE_700 = '#44403C';
const STONE_800 = '#292524';
const STONE_900 = '#1C1917';

// ── Level System ────────────────────────────────────────
const LEVELS = [
  { min: 0, name: 'はじめの一歩', nameEn: 'First Steps', color: STONE_500 },
  { min: 5, name: '慣れてきた', nameEn: 'Getting Used To It', color: '#3B82F6' },
  { min: 10, name: '自信がついた', nameEn: 'Growing Confident', color: GREEN },
  { min: 15, name: '実戦力', nameEn: 'Battle Ready', color: '#F59E0B' },
  { min: 20, name: '一人前', nameEn: 'Fully Capable', color: '#EF4444' },
  { min: 25, name: '達人', nameEn: 'Master', color: '#8B5CF6' },
  { min: 30, name: '英会話サバイバー', nameEn: 'Conversation Survivor', color: GOLD },
];

function getLevel(completedCount: number) {
  let level = LEVELS[0];
  for (const l of LEVELS) {
    if (completedCount >= l.min) level = l;
  }
  const idx = LEVELS.indexOf(level);
  const next = LEVELS[idx + 1];
  const progress = next
    ? (completedCount - level.min) / (next.min - level.min)
    : 1;
  return { ...level, index: idx + 1, progress: Math.min(progress, 1), next };
}

// ── Storage ─────────────────────────────────────────────
const STREAK_KEY = '5min-streak';
const HISTORY_KEY = '5min-history';
const REGISTERED_KEY = '5min-registered';
const COMPLETED_DAYS_KEY = '5min-completed-days';

interface StreakData { current: number; longest: number; lastDate: string; }
interface HistoryData { [date: string]: boolean; }

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function load<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return fallback;
}

function save(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

function completeToday(streak: StreakData, history: HistoryData): { streak: StreakData; history: HistoryData } {
  const today = todayStr();
  if (history[today]) return { streak, history };
  const newHistory = { ...history, [today]: true };
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
  const newCurrent = streak.lastDate === yStr ? streak.current + 1 : 1;
  const newStreak: StreakData = { current: newCurrent, longest: Math.max(streak.longest, newCurrent), lastDate: today };
  save(STREAK_KEY, newStreak);
  save(HISTORY_KEY, newHistory);
  return { streak: newStreak, history: newHistory };
}

// ── Review Quiz ─────────────────────────────────────────
interface ReviewQuestion {
  japanese: string;
  correct: string;
  options: string[];
  tip: string;
}

function generateReview(completedDays: Set<number>, count: number): ReviewQuestion[] {
  const allPhrases = DAILY_LESSONS
    .filter(l => completedDays.has(l.day))
    .flatMap(l => l.phrases);
  if (allPhrases.length < 4) return [];

  // Shuffle
  const shuffled = [...allPhrases].sort(() => Math.random() - 0.5);
  const questions: ReviewQuestion[] = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const correct = shuffled[i];
    // Pick 3 wrong answers from other phrases
    const others = allPhrases
      .filter(p => p.english !== correct.english)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    const options = [correct.english, ...others.map(o => o.english)]
      .sort(() => Math.random() - 0.5);

    questions.push({
      japanese: correct.japanese,
      correct: correct.english,
      options,
      tip: correct.tip,
    });
  }

  return questions;
}

// ── Types ───────────────────────────────────────────────
type Screen = 'home' | 'phrase' | 'convo' | 'review' | 'done';

// ── Component ───────────────────────────────────────────
export default function FiveMinPage() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [convoIndex, setConvoIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [streak, setStreak] = useState<StreakData>({ current: 0, longest: 0, lastDate: '' });
  const [history, setHistory] = useState<HistoryData>({});
  const [fadeIn, setFadeIn] = useState(false);
  const [choicePicked, setChoicePicked] = useState<number | null>(null);
  const [showResponse, setShowResponse] = useState(false);

  // Progress
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [registered, setRegistered] = useState<Set<string>>(new Set());
  const [registering, setRegistering] = useState<string | null>(null);
  const [registerFeedback, setRegisterFeedback] = useState<string | null>(null);

  // Review
  const [reviewQuestions, setReviewQuestions] = useState<ReviewQuestion[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewAnswer, setReviewAnswer] = useState<number | null>(null);
  const [reviewScore, setReviewScore] = useState(0);

  const totalDays = DAILY_LESSONS.length;
  const lesson: DailyLesson | undefined = DAILY_LESSONS.find(l => l.day === selectedDay);
  const level = useMemo(() => getLevel(completedDays.size), [completedDays.size]);

  useEffect(() => {
    setStreak(load(STREAK_KEY, { current: 0, longest: 0, lastDate: '' }));
    setHistory(load(HISTORY_KEY, {}));
    setRegistered(new Set(load<string[]>(REGISTERED_KEY, [])));
    setCompletedDays(new Set(load<number[]>(COMPLETED_DAYS_KEY, [])));
    setTimeout(() => setFadeIn(true), 50);
  }, []);

  const transition = useCallback(() => {
    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 50);
  }, []);

  // ── Training Registration (localStorage) ──────────────
  const registerToTraining = async (english: string, japanese: string) => {
    if (registered.has(english) || registering) return;
    setRegistering(english);
    setRegisterFeedback(null);
    try {
      const existing = load<{ english: string; japanese: string; category: string; date: string }[]>('5min-training-phrases', []);
      const isDuplicate = existing.some(p => p.english === english.trim());
      if (!isDuplicate) {
        existing.push({ english: english.trim(), japanese: japanese.trim(), category: '5min', date: todayStr() });
        save('5min-training-phrases', existing);
      }
      const newReg = new Set(registered);
      newReg.add(english);
      setRegistered(newReg);
      save(REGISTERED_KEY, [...newReg]);
      setRegisterFeedback(isDuplicate ? '登録済みです' : 'トレーニングに追加しました');
    } catch {
      setRegisterFeedback('エラーが発生しました');
    }
    setRegistering(null);
    setTimeout(() => setRegisterFeedback(null), 2000);
  };

  // ── Handlers ──────────────────────────────────────────
  const startDay = (day: number) => {
    setSelectedDay(day);
    transition();
    setTimeout(() => {
      setScreen('phrase');
      setPhraseIndex(0);
    }, 200);
  };

  const nextPhrase = () => {
    transition();
    setTimeout(() => {
      if (phraseIndex < 4) {
        setPhraseIndex(phraseIndex + 1);
      } else {
        setScreen('convo');
        setConvoIndex(0);
        setSelectedChoices([]);
        setChoicePicked(null);
        setShowResponse(false);
      }
    }, 200);
  };

  const pickChoice = (choiceIdx: number) => {
    if (choicePicked !== null) return;
    setChoicePicked(choiceIdx);
    setShowResponse(true);
    setTimeout(() => {
      const newChoices = [...selectedChoices, choiceIdx];
      setSelectedChoices(newChoices);
      if (convoIndex < 2) {
        setChoicePicked(null);
        setShowResponse(false);
        transition();
        setTimeout(() => setConvoIndex(convoIndex + 1), 200);
      } else {
        transition();
        setTimeout(() => {
          // Complete the day
          const result = completeToday(streak, history);
          setStreak(result.streak);
          setHistory(result.history);
          const newCompleted = new Set(completedDays);
          newCompleted.add(selectedDay);
          setCompletedDays(newCompleted);
          save(COMPLETED_DAYS_KEY, [...newCompleted]);
          setScreen('done');
        }, 400);
      }
    }, 1200);
  };

  const startReview = () => {
    const questions = generateReview(completedDays, 5);
    if (questions.length === 0) return;
    setReviewQuestions(questions);
    setReviewIndex(0);
    setReviewAnswer(null);
    setReviewScore(0);
    transition();
    setTimeout(() => setScreen('review'), 200);
  };

  const answerReview = (optionIdx: number) => {
    if (reviewAnswer !== null) return;
    setReviewAnswer(optionIdx);
    const q = reviewQuestions[reviewIndex];
    const isCorrect = q.options[optionIdx] === q.correct;
    if (isCorrect) setReviewScore(s => s + 1);

    setTimeout(() => {
      if (reviewIndex < reviewQuestions.length - 1) {
        setReviewAnswer(null);
        transition();
        setTimeout(() => setReviewIndex(reviewIndex + 1), 200);
      } else {
        transition();
        setTimeout(() => setScreen('home'), 200);
      }
    }, 1500);
  };

  const goHome = () => {
    transition();
    setTimeout(() => {
      setScreen('home');
      setPhraseIndex(0);
      setConvoIndex(0);
      setSelectedChoices([]);
      setChoicePicked(null);
      setShowResponse(false);
    }, 200);
  };

  // ── Sub Components ────────────────────────────────────
  const RegisterButton = ({ english, japanese, compact = false }: { english: string; japanese: string; compact?: boolean }) => {
    const isReg = registered.has(english);
    const isLoading = registering === english;
    return (
      <button
        onClick={(e) => { e.stopPropagation(); registerToTraining(english, japanese); }}
        disabled={isReg || isLoading}
        style={{
          padding: compact ? '6px 12px' : '8px 16px', borderRadius: 8,
          border: `1px solid ${isReg ? GREEN + '40' : GOLD + '60'}`,
          backgroundColor: isReg ? GREEN + '10' : 'transparent',
          color: isReg ? GREEN : GOLD, fontSize: 11, fontWeight: 600,
          letterSpacing: '0.08em', cursor: isReg ? 'default' : 'pointer',
          transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', gap: 6,
          opacity: isLoading ? 0.5 : 1,
        }}
      >
        {isReg ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            登録済み
          </>
        ) : isLoading ? '...' : '+ 登録'}
      </button>
    );
  };

  const ProgressDots = ({ current, total }: { current: number; total: number }) => (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 32 }}>
      {Array.from({ length: total }, (_, i) => (
        <div key={i} style={{
          width: i === current ? 24 : 8, height: 8, borderRadius: 4,
          backgroundColor: i < current ? GREEN : i === current ? GOLD : STONE_200,
          transition: 'all 0.3s ease',
        }} />
      ))}
    </div>
  );

  const CalendarDots = () => {
    const today = new Date();
    const days: { date: string; done: boolean; isToday: boolean }[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      days.push({ date: str, done: !!history[str], isToday: i === 0 });
    }
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', maxWidth: 280, margin: '0 auto' }}>
        {days.map((day) => (
          <div key={day.date} style={{
            width: 12, height: 12, borderRadius: '50%',
            backgroundColor: day.done ? GOLD : STONE_200,
            border: day.isToday ? `2px solid ${day.done ? GOLD : STONE_500}` : 'none',
          }} />
        ))}
      </div>
    );
  };

  const FeedbackToast = () => {
    if (!registerFeedback) return null;
    return (
      <div style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        padding: '10px 20px', borderRadius: 10,
        backgroundColor: registerFeedback?.includes('エラー') ? '#EF4444' : GREEN,
        color: '#fff', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)', zIndex: 100,
      }}>
        {registerFeedback}
      </div>
    );
  };

  // ── Shared Styles ─────────────────────────────────────
  const containerStyle: React.CSSProperties = {
    minHeight: '100vh', backgroundColor: STONE_50,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '24px 20px', paddingBottom: 80,
    opacity: fadeIn ? 1 : 0, transform: fadeIn ? 'translateY(0)' : 'translateY(12px)',
    transition: 'all 0.4s ease',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff', borderRadius: 20, padding: '24px 22px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)', border: `1px solid ${STONE_200}`,
    maxWidth: 440, width: '100%',
  };

  const goldButton: React.CSSProperties = {
    padding: '14px 40px', borderRadius: 14, backgroundColor: GOLD,
    border: 'none', color: STONE_900, fontSize: 15, fontWeight: 700,
    cursor: 'pointer', letterSpacing: '0.06em',
    boxShadow: '0 4px 16px rgba(212,175,55,0.25)',
    transition: 'all 0.2s ease', width: '100%', maxWidth: 320,
  };

  // ══════════════════════════════════════════════════════
  // ── HOME SCREEN ───────────────────────────────────────
  // ══════════════════════════════════════════════════════
  if (screen === 'home') {
    const isFirstTime = completedDays.size === 0;
    return (
      <div style={containerStyle}>
        <FeedbackToast />

        {/* Welcome / Description */}
        <div style={{ textAlign: 'center', marginBottom: 20, marginTop: 8, maxWidth: 400 }}>
          <div style={{ fontSize: 22, fontWeight: 700, color: STONE_900, marginBottom: 6 }}>
            5min 英会話
          </div>
          <div style={{ fontSize: 13, color: STONE_500, lineHeight: 1.8 }}>
            {isFirstTime
              ? '1日5分、5つのフレーズと1つの会話シーン。好きな日を選んでタップするだけ。全30日で150フレーズが身につきます。'
              : '今日もやっていきましょう。下の番号をタップしてスタート。'
            }
          </div>
        </div>

        {/* Level Badge */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 20,
            backgroundColor: level.color + '12', border: `1px solid ${level.color}30`,
          }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: level.color }}>
              Lv.{level.index}
            </div>
            <div style={{ fontSize: 13, color: level.color, fontWeight: 500 }}>
              {level.name}
            </div>
          </div>
          {/* Level progress bar */}
          {level.next && (
            <div style={{ maxWidth: 200, margin: '8px auto 0' }}>
              <div style={{
                height: 4, borderRadius: 2, backgroundColor: STONE_200,
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 2, backgroundColor: level.color,
                  width: `${level.progress * 100}%`, transition: 'width 0.5s ease',
                }} />
              </div>
              <div style={{ fontSize: 10, color: STONE_400, marginTop: 4 }}>
                あと {level.next.min - completedDays.size} 日で「{level.next.name}」にレベルアップ
              </div>
            </div>
          )}
        </div>

        {/* Streak */}
        {streak.current > 0 && (
          <div style={{ fontSize: 13, color: STONE_500, marginBottom: 20, textAlign: 'center' }}>
            <span style={{ color: GOLD, fontWeight: 700 }}>{streak.current}</span> 日連続
            {streak.longest > streak.current && (
              <span style={{ color: STONE_400 }}> (最高記録: {streak.longest}日)</span>
            )}
          </div>
        )}

        {/* Day Grid */}
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: STONE_600, marginBottom: 4, textAlign: 'center', fontWeight: 500 }}>
            レッスン一覧
          </div>
          <div style={{ fontSize: 10, color: STONE_400, marginBottom: 14, textAlign: 'center' }}>
            {completedDays.size === 0 ? '好きな番号をタップしてスタート' : `${completedDays.size} / ${totalDays} 日 クリア済み`}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 8,
          }}>
            {DAILY_LESSONS.map((l) => {
              const isDone = completedDays.has(l.day);
              return (
                <button
                  key={l.day}
                  onClick={() => startDay(l.day)}
                  style={{
                    aspectRatio: '1', borderRadius: 12,
                    border: `1px solid ${isDone ? GREEN + '40' : STONE_200}`,
                    backgroundColor: isDone ? GREEN + '08' : '#fff',
                    cursor: 'pointer', transition: 'all 0.15s ease',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 2,
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (!isDone) e.currentTarget.style.borderColor = GOLD; }}
                  onMouseLeave={e => { if (!isDone) e.currentTarget.style.borderColor = STONE_200; }}
                >
                  <div style={{ fontSize: 14, fontWeight: 600, color: isDone ? GREEN : STONE_800 }}>
                    {l.day}
                  </div>
                  <div style={{ fontSize: 8, color: isDone ? GREEN : STONE_400, letterSpacing: '0.05em' }}>
                    {l.label}
                  </div>
                  {isDone && (
                    <div style={{ position: 'absolute', top: 3, right: 3 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Review Button */}
        {completedDays.size >= 2 && (
          <div style={{ textAlign: 'center', marginBottom: 12, maxWidth: 320, width: '100%' }}>
            <button
              onClick={startReview}
              style={{
                ...goldButton, backgroundColor: 'transparent',
                border: `1px solid ${STONE_200}`, color: STONE_700,
                boxShadow: 'none', fontSize: 13,
              }}
            >
              復習テスト ({completedDays.size * 5} フレーズ)
            </button>
            <div style={{ fontSize: 10, color: STONE_400, marginTop: 6 }}>
              クリア済みのフレーズからランダム出題
            </div>
          </div>
        )}

        {/* Calendar */}
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <div style={{ fontSize: 12, color: STONE_600, fontWeight: 500, marginBottom: 2 }}>
            学習カレンダー
          </div>
          <div style={{ fontSize: 10, color: STONE_400, marginBottom: 10 }}>
            直近30日間の学習記録（金色 = 学習した日）
          </div>
          <CalendarDots />
        </div>

        {/* How to use (first time) */}
        {isFirstTime && (
          <div style={{ ...cardStyle, marginTop: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: STONE_700, marginBottom: 12 }}>
              使い方
            </div>
            <div style={{ fontSize: 12, color: STONE_500, lineHeight: 2 }}>
              1. 上の番号をタップして、レッスンを選ぶ<br />
              2. 5つのフレーズを声に出して練習する<br />
              3. 会話シーンで返答を選ぶ（正解不正解なし）<br />
              4. 気に入ったフレーズはトレーニングに登録<br />
              5. 毎日5分。30日で日常英会話の基礎が身につく
            </div>
          </div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // ── PHRASE SCREEN ─────────────────────────────────────
  // ══════════════════════════════════════════════════════
  if (screen === 'phrase' && lesson) {
    const phrase = lesson.phrases[phraseIndex];
    return (
      <div style={{ ...containerStyle, justifyContent: 'center' }}>
        <FeedbackToast />
        <ProgressDots current={phraseIndex} total={5} />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{
              padding: '4px 10px', borderRadius: 6, backgroundColor: `${GOLD}12`,
              fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: '0.1em',
            }}>
              DAY {lesson.day}
            </div>
            <div style={{ fontSize: 11, color: STONE_400 }}>
              {lesson.themeJa}
            </div>
          </div>
          <div style={{ fontSize: 11, color: STONE_400 }}>
            フレーズ {phraseIndex + 1} / 5
          </div>
        </div>

        {/* Instruction (first phrase only) */}
        {phraseIndex === 0 && (
          <div style={{
            fontSize: 12, color: STONE_500, lineHeight: 1.8, textAlign: 'center',
            marginBottom: 20, maxWidth: 360, padding: '10px 16px',
            backgroundColor: `${GOLD}06`, borderRadius: 12, border: `1px solid ${GOLD}15`,
          }}>
            英語を声に出して読んでみてください。<br />
            発音や意味がわからなくても大丈夫。<br />
            下のヒントを読んで、もう一度声に出す。
          </div>
        )}

        {/* Phrase Card */}
        <div style={{ ...cardStyle, textAlign: 'center', marginBottom: 20 }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: STONE_900, lineHeight: 1.4, marginBottom: 16 }}>
            {phrase.english}
          </div>
          <div style={{ fontSize: 15, color: STONE_600, marginBottom: 16, paddingTop: 16, borderTop: `1px solid ${STONE_100}` }}>
            {phrase.japanese}
          </div>
          <div style={{
            fontSize: 13, color: STONE_500, lineHeight: 1.7,
            padding: '12px 16px', backgroundColor: STONE_50, borderRadius: 12, marginBottom: 16,
          }}>
            {phrase.tip}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, alignItems: 'center' }}>
            <RegisterButton english={phrase.english} japanese={phrase.japanese} />
            <div style={{ fontSize: 10, color: STONE_400 }}>
              トレーニングに追加
            </div>
          </div>
        </div>

        <div style={{
          fontSize: 13, color: GOLD, marginBottom: 12, textAlign: 'center', fontWeight: 500,
        }}>
          声に出してから「次へ」を押してください
        </div>

        <button onClick={nextPhrase} style={goldButton}>
          {phraseIndex < 4 ? '次のフレーズへ' : '会話シーンへ進む'}
        </button>

        {/* Back */}
        <button onClick={goHome} style={{
          marginTop: 12, padding: '8px 20px', backgroundColor: 'transparent',
          border: 'none', color: STONE_400, fontSize: 12, cursor: 'pointer',
        }}>
          ホームに戻る
        </button>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // ── CONVERSATION SCREEN ───────────────────────────────
  // ══════════════════════════════════════════════════════
  if (screen === 'convo' && lesson) {
    const convo = lesson.conversation;
    const exchange = convo.exchanges[convoIndex];

    return (
      <div style={{ ...containerStyle, justifyContent: 'flex-start', paddingTop: 40 }}>
        <FeedbackToast />

        {convoIndex === 0 && (
          <>
            <div style={{
              fontSize: 12, fontWeight: 600, color: STONE_700, marginBottom: 8, textAlign: 'center',
            }}>
              会話シーン
            </div>
            <div style={{
              fontSize: 12, color: STONE_500, textAlign: 'center', marginBottom: 8, maxWidth: 360, lineHeight: 1.8,
              padding: '10px 16px', backgroundColor: `${GREEN}06`, borderRadius: 12, border: `1px solid ${GREEN}15`,
            }}>
              相手の英語を読んで、3つの返答から好きなものを選んでください。正解も不正解もありません。自分ならどう答えるか、を考えるのが練習です。
            </div>
            <div style={{ fontSize: 13, color: STONE_600, textAlign: 'center', marginBottom: 24, maxWidth: 360, lineHeight: 1.8 }}>
              {convo.setting}
            </div>
          </>
        )}

        <ProgressDots current={convoIndex} total={3} />

        <div style={{ maxWidth: 440, width: '100%' }}>
          {/* Previous exchanges */}
          {selectedChoices.map((choiceIdx, i) => {
            const prev = convo.exchanges[i];
            return (
              <div key={i} style={{ marginBottom: 12, opacity: 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 6 }}>
                  <div style={{
                    backgroundColor: STONE_100, borderRadius: '16px 16px 16px 4px',
                    padding: '10px 14px', maxWidth: '75%', fontSize: 13, color: STONE_700,
                  }}>{prev.line}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{
                    backgroundColor: `${GOLD}20`, borderRadius: '16px 16px 4px 16px',
                    padding: '10px 14px', maxWidth: '75%', fontSize: 13, color: STONE_800,
                  }}>{prev.choices[choiceIdx].text}</div>
                </div>
              </div>
            );
          })}

          {/* Current NPC */}
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 6 }}>
            <div style={{ backgroundColor: STONE_100, borderRadius: '16px 16px 16px 4px', padding: '14px 18px', maxWidth: '80%' }}>
              <div style={{ fontSize: 10, color: STONE_400, letterSpacing: '0.1em', marginBottom: 4 }}>{exchange.speaker}</div>
              <div style={{ fontSize: 15, color: STONE_800, lineHeight: 1.6, marginBottom: 6 }}>{exchange.line}</div>
              <div style={{ fontSize: 12, color: STONE_500 }}>{exchange.lineJa}</div>
            </div>
          </div>

          {/* Selected response */}
          {showResponse && choicePicked !== null && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
              <div style={{
                backgroundColor: `${GOLD}25`, borderRadius: '16px 16px 4px 16px',
                padding: '14px 18px', maxWidth: '80%', border: `1px solid ${GOLD}40`,
              }}>
                <div style={{ fontSize: 15, color: STONE_800, lineHeight: 1.5 }}>{exchange.choices[choicePicked].text}</div>
                <div style={{ fontSize: 11, color: GOLD, marginTop: 4, textAlign: 'right' }}>{exchange.choices[choicePicked].vibe}</div>
              </div>
            </div>
          )}

          {/* Choices */}
          {choicePicked === null && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
              <div style={{ fontSize: 11, color: STONE_400, textAlign: 'center', marginBottom: 4 }}>あなたの返答を選んでください</div>
              {exchange.choices.map((choice: ConvoChoice, i: number) => (
                <button
                  key={i} onClick={() => pickChoice(i)}
                  style={{
                    backgroundColor: '#fff', border: `1px solid ${STONE_200}`, borderRadius: 14,
                    padding: '14px 18px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s ease',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.backgroundColor = `${GOLD}08`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = STONE_200; e.currentTarget.style.backgroundColor = '#fff'; }}
                >
                  <span style={{ fontSize: 14, color: STONE_800, lineHeight: 1.5 }}>{choice.text}</span>
                  <span style={{ fontSize: 11, color: STONE_400, marginLeft: 12, flexShrink: 0 }}>{choice.vibe}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // ── REVIEW SCREEN ─────────────────────────────────────
  // ══════════════════════════════════════════════════════
  if (screen === 'review' && reviewQuestions.length > 0) {
    const q = reviewQuestions[reviewIndex];
    const isLast = reviewIndex === reviewQuestions.length - 1;

    return (
      <div style={{ ...containerStyle, justifyContent: 'center' }}>
        <ProgressDots current={reviewIndex} total={reviewQuestions.length} />

        <div style={{ fontSize: 12, fontWeight: 600, color: STONE_700, marginBottom: 4, textAlign: 'center' }}>
          復習テスト
        </div>
        <div style={{ fontSize: 11, color: STONE_400, marginBottom: 8, textAlign: 'center' }}>
          {reviewIndex + 1} / {reviewQuestions.length} 問
        </div>

        <div style={{ fontSize: 13, color: STONE_500, marginBottom: 24, textAlign: 'center' }}>
          {reviewScore} / {reviewIndex + (reviewAnswer !== null ? 1 : 0)} 正解
        </div>

        {/* Question */}
        <div style={{ ...cardStyle, textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: STONE_500, marginBottom: 12 }}>
            この日本語を英語で言うと？
          </div>
          <div style={{ fontSize: 22, fontWeight: 500, color: STONE_800, marginBottom: 16 }}>
            {q.japanese}
          </div>
          <div style={{ fontSize: 11, color: STONE_400 }}>
            下の4つから正しい英語を選んでください
          </div>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 440, width: '100%' }}>
          {q.options.map((opt, i) => {
            const isSelected = reviewAnswer === i;
            const isCorrect = opt === q.correct;
            const showResult = reviewAnswer !== null;

            let bgColor = '#fff';
            let borderColor = STONE_200;
            let textColor = STONE_800;

            if (showResult && isCorrect) {
              bgColor = GREEN + '12';
              borderColor = GREEN;
              textColor = GREEN;
            } else if (showResult && isSelected && !isCorrect) {
              bgColor = '#FEF2F2';
              borderColor = '#EF4444';
              textColor = '#EF4444';
            }

            return (
              <button
                key={i} onClick={() => answerReview(i)}
                disabled={reviewAnswer !== null}
                style={{
                  backgroundColor: bgColor, border: `1px solid ${borderColor}`, borderRadius: 14,
                  padding: '14px 18px', textAlign: 'left', cursor: reviewAnswer !== null ? 'default' : 'pointer',
                  transition: 'all 0.2s ease', fontSize: 14, color: textColor, fontWeight: isSelected || (showResult && isCorrect) ? 600 : 400,
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Tip after answering */}
        {reviewAnswer !== null && (
          <div style={{
            marginTop: 16, padding: '12px 16px', borderRadius: 12,
            backgroundColor: STONE_50, maxWidth: 440, width: '100%',
            fontSize: 12, color: STONE_500, fontStyle: 'italic', lineHeight: 1.6,
          }}>
            {q.tip}
          </div>
        )}

        {/* Summary on last question */}
        {reviewAnswer !== null && isLast && (
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 300, color: GOLD, marginBottom: 4 }}>
              {reviewScore} / {reviewQuestions.length}
            </div>
            <div style={{ fontSize: 13, color: STONE_500, marginBottom: 16 }}>
              {reviewScore === reviewQuestions.length ? '全問正解！すごい！' : reviewScore >= 3 ? 'いい調子！この調子でいこう' : 'まだ伸びしろあり。繰り返しが大事！'}
            </div>
            <button onClick={goHome} style={goldButton}>ホームに戻る</button>
          </div>
        )}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // ── DONE SCREEN ───────────────────────────────────────
  // ══════════════════════════════════════════════════════
  // Collect all phrases user encountered
  const allEncountered: { english: string; japanese: string; source: string }[] = [];
  if (lesson) {
    for (const p of lesson.phrases) {
      allEncountered.push({ english: p.english, japanese: p.japanese, source: 'phrase' });
    }
    for (let i = 0; i < selectedChoices.length; i++) {
      const exchange = lesson.conversation.exchanges[i];
      if (exchange) {
        const choice = exchange.choices[selectedChoices[i]];
        allEncountered.push({ english: choice.text, japanese: exchange.lineJa, source: 'convo' });
      }
    }
  }

  return (
    <div style={{ ...containerStyle, justifyContent: 'flex-start', paddingTop: 40 }}>
      <FeedbackToast />

      {/* Checkmark */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%', backgroundColor: `${GREEN}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20,
      }}>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <div style={{ fontSize: 14, fontWeight: 600, color: GREEN, marginBottom: 8 }}>
        Day {selectedDay} クリア！
      </div>

      {/* Level up check */}
      {(() => {
        const newLevel = getLevel(completedDays.size);
        const oldLevel = getLevel(completedDays.size - 1);
        if (newLevel.index > oldLevel.index) {
          return (
            <div style={{
              padding: '12px 24px', borderRadius: 14, marginBottom: 16,
              backgroundColor: newLevel.color + '12', border: `1px solid ${newLevel.color}30`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', color: newLevel.color, marginBottom: 4 }}>レベルアップ！</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: newLevel.color }}>Lv.{newLevel.index} {newLevel.name}</div>
            </div>
          );
        }
        return null;
      })()}

      <div style={{ fontSize: 22, fontWeight: 300, color: STONE_800, marginBottom: 4, textAlign: 'center' }}>
        {lesson?.themeJa}
      </div>
      <div style={{ fontSize: 13, color: STONE_500, marginBottom: 28, textAlign: 'center' }}>
        {completedDays.size} / {totalDays} 日クリア
      </div>

      {/* Streak */}
      <div style={{ ...cardStyle, textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: STONE_600, fontWeight: 500, marginBottom: 8 }}>連続記録</div>
        <div style={{ fontSize: 36, fontWeight: 300, color: GOLD, marginBottom: 2 }}>{streak.current}</div>
        <div style={{ fontSize: 12, color: STONE_500, marginBottom: 12 }}>
          日連続
          {streak.longest > 1 && <span style={{ color: STONE_400 }}> (最高: {streak.longest}日)</span>}
        </div>
        <CalendarDots />
      </div>

      {/* Phrase Register */}
      <div style={{ ...cardStyle, marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: STONE_600, marginBottom: 4, textAlign: 'center' }}>
          トレーニングに登録
        </div>
        <div style={{ fontSize: 10, color: STONE_400, marginBottom: 12, textAlign: 'center' }}>
          気に入ったフレーズを「トレーニング」に追加して繰り返し復習できます
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {allEncountered.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 12px', backgroundColor: STONE_50, borderRadius: 10,
              border: `1px solid ${STONE_100}`, gap: 8,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: STONE_800 }}>{item.english}</div>
                <div style={{ fontSize: 11, color: STONE_500 }}>
                  {item.japanese}
                  {item.source === 'convo' && <span style={{ color: GREEN, marginLeft: 6, fontSize: 10 }}>CONVO</span>}
                </div>
              </div>
              <RegisterButton english={item.english} japanese={item.japanese} compact />
            </div>
          ))}
        </div>
        {allEncountered.some(p => !registered.has(p.english)) && (
          <button
            onClick={async () => {
              for (const item of allEncountered) {
                if (!registered.has(item.english)) {
                  await registerToTraining(item.english, item.japanese);
                  await new Promise(r => setTimeout(r, 150));
                }
              }
            }}
            style={{
              marginTop: 12, padding: '10px', borderRadius: 10,
              border: `1px solid ${GOLD}40`, backgroundColor: `${GOLD}08`,
              color: GOLD, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              width: '100%', letterSpacing: '0.06em',
            }}
          >
            すべてトレーニングに追加
          </button>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 10, maxWidth: 320, width: '100%' }}>
        <button onClick={goHome} style={{
          ...goldButton, flex: 1, padding: '12px 0', fontSize: 13,
        }}>
          ホームへ
        </button>
        <a href="/english/training" style={{
          ...goldButton, textDecoration: 'none', textAlign: 'center',
          flex: 1, padding: '12px 0', fontSize: 13,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'transparent', border: `1px solid ${STONE_200}`,
          color: STONE_600, boxShadow: 'none',
        }}>
          トレーニングへ
        </a>
      </div>
    </div>
  );
}
