'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { T } from '@/data/izakaya-toeic/theme';
import {
  PART2_DRILLS,
  Part2Drill,
  Part2QuestionType,
  getRandomPart2Set,
  getPart2Stats,
} from '@/data/izakaya-toeic/part2-drills';

// ── Sound FX ──
function playSound(type: 'correct' | 'wrong' | 'tap' | 'complete') {
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
    if (type === 'complete') { make(523, 0, 0.2); make(659, 0.1, 0.2); make(784, 0.2, 0.2); make(1047, 0.3, 0.4); }
  } catch { /* */ }
}

function speakText(text: string, rate = 0.9) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US'; utter.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const en = voices.find(v => /google us|david|daniel/i.test(v.name) && v.lang.startsWith('en'));
  if (en) utter.voice = en;
  window.speechSynthesis.speak(utter);
}

// ── Question type labels ──
const TYPE_LABELS: Record<Part2QuestionType, { ja: string; color: string }> = {
  'wh-who': { ja: 'Who', color: '#3B82F6' },
  'wh-what': { ja: 'What', color: '#3B82F6' },
  'wh-where': { ja: 'Where', color: '#3B82F6' },
  'wh-when': { ja: 'When', color: '#3B82F6' },
  'wh-why': { ja: 'Why', color: '#3B82F6' },
  'wh-how': { ja: 'How', color: '#3B82F6' },
  'yes-no': { ja: 'Yes/No', color: '#10B981' },
  negative: { ja: '否定疑問', color: '#EF4444' },
  tag: { ja: '付加疑問', color: '#F59E0B' },
  choice: { ja: '選択', color: '#8B5CF6' },
  suggestion: { ja: '提案', color: '#EC4899' },
  request: { ja: '依頼', color: '#06B6D4' },
  offer: { ja: '申し出', color: '#14B8A6' },
  statement: { ja: '平叙文', color: '#78716C' },
};

const DIFF_COLORS = { easy: '#10B981', medium: '#D4AF37', hard: '#EF4444' };
const SET_SIZES = [10, 15, 25];

type Mode = 'home' | 'drill' | 'results';

export default function Part2DrillPage() {
  const [mode, setMode] = useState<Mode>('home');
  const [selectedType, setSelectedType] = useState<Part2QuestionType | 'all' | 'random'>('random');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [setSize, setSetSize] = useState(10);
  const [drillSet, setDrillSet] = useState<Part2Drill[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<boolean[]>([]);
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const stats = useMemo(() => getPart2Stats(), []);

  const startDrill = useCallback(() => {
    let pool = PART2_DRILLS;
    if (selectedType !== 'all' && selectedType !== 'random') {
      pool = pool.filter(d => d.questionType === selectedType);
    }
    if (selectedDifficulty !== 'all') {
      pool = pool.filter(d => d.difficulty === selectedDifficulty);
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, setSize);
    setDrillSet(shuffled);
    setCurrentIdx(0); setSelected(null); setRevealed(false); setResults([]);
    setMode('drill');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedType, selectedDifficulty, setSize]);

  const current = drillSet[currentIdx];

  // Auto-play audio
  useEffect(() => {
    if (mode === 'drill' && current) {
      const t = setTimeout(() => speakText(current.audioScript), 400);
      return () => clearTimeout(t);
    }
  }, [mode, currentIdx, current]);

  const handleSelect = useCallback((idx: number) => {
    if (revealed) return;
    playSound('tap');
    setSelected(idx);
    setRevealed(true);
    setTimeout(() => playSound(current.choices[idx].isCorrect ? 'correct' : 'wrong'), 200);
  }, [revealed, current]);

  const handleNext = useCallback(() => {
    const correct = selected !== null && current.choices[selected].isCorrect;
    const nr = [...results, correct];
    setResults(nr);
    if (currentIdx + 1 < drillSet.length) {
      setCurrentIdx(p => p + 1);
      setSelected(null); setRevealed(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      playSound('complete');
      setMode('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentIdx, drillSet, selected, current, results]);

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '10px 16px',
        background: 'rgba(250,250,249,0.92)', backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/english/izakaya-toeic" style={{ fontSize: 11, color: T.textMuted, textDecoration: 'none' }}>
              {'<'} 居酒屋TOEIC
            </Link>
            <span style={{ fontSize: 10, color: T.gold, fontWeight: 700 }}>{stats.total} questions</span>
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 800, margin: '4px 0 0' }}>
            Part 2 <span style={{ color: T.gold }}>速射</span>ドリル
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '16px 16px 60px' }}>

        {/* HOME */}
        {mode === 'home' && (
          <div>
            {/* Master intro */}
            <div style={{
              padding: '14px 18px', background: T.surface, borderRadius: 10,
              borderLeft: `3px solid ${T.gold}`, marginBottom: 16, boxShadow: T.shadow,
            }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#78716C12', border: '1.5px solid #78716C',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 8, color: '#78716C',
                }}>権</div>
                <span style={{ fontSize: 10, fontWeight: 700, color: T.gold, letterSpacing: 1 }}>MASTER SAYS</span>
              </div>
              <p style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8, margin: 0 }}>
                「Part 2は25問。30秒に1問のペースで流れてくる。考えてる暇はない。反射で答えろ。このドリルで反射を作れ。」
              </p>
            </div>

            {/* Stats overview */}
            <div style={{
              padding: '14px 18px', background: T.surface, borderRadius: 10,
              border: `1px solid ${T.border}`, marginBottom: 16, boxShadow: T.shadow,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1, marginBottom: 10 }}>QUESTION BANK</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {(Object.entries(stats.byType) as [Part2QuestionType, number][]).map(([type, count]) => {
                  const info = TYPE_LABELS[type];
                  return (
                    <span key={type} style={{
                      padding: '3px 8px', background: info.color + '10', color: info.color,
                      fontSize: 10, fontWeight: 700, borderRadius: 4, border: `1px solid ${info.color}20`,
                    }}>
                      {info.ja}: {count}
                    </span>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {(['easy', 'medium', 'hard'] as const).map(d => (
                  <span key={d} style={{ fontSize: 11, color: DIFF_COLORS[d], fontWeight: 600 }}>
                    {d}: {stats.byDifficulty[d]}
                  </span>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div style={{
              padding: '14px 18px', background: T.surface, borderRadius: 10,
              border: `1px solid ${T.border}`, marginBottom: 16, boxShadow: T.shadow,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1, marginBottom: 10 }}>DRILL SETTINGS</div>

              {/* Type selection */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, marginBottom: 6 }}>Question Type</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                  {(['random', 'all'] as const).map(t => (
                    <button key={t} onClick={() => setSelectedType(t)} style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                      background: selectedType === t ? T.gold : T.bgSecondary,
                      color: selectedType === t ? '#fff' : T.textMuted,
                      border: `1px solid ${selectedType === t ? T.gold : T.border}`,
                    }}>
                      {t === 'random' ? 'RANDOM MIX' : 'ALL TYPES'}
                    </button>
                  ))}
                  {(Object.keys(TYPE_LABELS) as Part2QuestionType[]).map(type => {
                    const info = TYPE_LABELS[type];
                    const active = selectedType === type;
                    return (
                      <button key={type} onClick={() => setSelectedType(type)} style={{
                        padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                        background: active ? info.color : T.bgSecondary,
                        color: active ? '#fff' : info.color,
                        border: `1px solid ${active ? info.color : info.color + '30'}`,
                      }}>
                        {info.ja}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, marginBottom: 6 }}>Difficulty</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {(['all', 'easy', 'medium', 'hard'] as const).map(d => (
                    <button key={d} onClick={() => setSelectedDifficulty(d)} style={{
                      padding: '4px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700, cursor: 'pointer',
                      background: selectedDifficulty === d ? (d === 'all' ? T.gold : DIFF_COLORS[d]) : T.bgSecondary,
                      color: selectedDifficulty === d ? '#fff' : (d === 'all' ? T.textMuted : DIFF_COLORS[d]),
                      border: `1px solid ${selectedDifficulty === d ? 'transparent' : T.border}`,
                    }}>
                      {d === 'all' ? 'ALL' : d.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Set size */}
              <div>
                <div style={{ fontSize: 11, color: T.textSub, fontWeight: 600, marginBottom: 6 }}>Set Size</div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {SET_SIZES.map(s => (
                    <button key={s} onClick={() => setSetSize(s)} style={{
                      padding: '4px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700, cursor: 'pointer',
                      background: setSize === s ? T.gold : T.bgSecondary,
                      color: setSize === s ? '#fff' : T.textMuted,
                      border: `1px solid ${setSize === s ? T.gold : T.border}`,
                    }}>
                      {s}問
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Start button */}
            <button onClick={startDrill} style={{
              width: '100%', padding: '16px 20px', background: T.gold,
              border: 'none', borderRadius: 10, color: '#fff', fontWeight: 800, fontSize: 16,
              cursor: 'pointer', boxShadow: T.shadowMd,
            }}>
              START DRILL
            </button>
          </div>
        )}

        {/* DRILL */}
        {mode === 'drill' && current && (
          <div style={{ animation: 'izk-fadein 0.3s ease' }}>
            {/* Progress */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: T.gold }}>Q{currentIdx + 1}/{drillSet.length}</span>
                <span style={{
                  padding: '2px 6px', background: TYPE_LABELS[current.questionType].color + '10',
                  color: TYPE_LABELS[current.questionType].color, fontSize: 9, fontWeight: 700, borderRadius: 3,
                }}>
                  {TYPE_LABELS[current.questionType].ja}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%', background: DIFF_COLORS[current.difficulty], display: 'inline-block', marginTop: 5,
                }} />
                <span style={{ fontSize: 10, color: T.textMuted }}>{current.scoreLevel}点</span>
              </div>
            </div>

            <div style={{ height: 3, background: T.bgSecondary, borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${((currentIdx + (revealed ? 1 : 0)) / drillSet.length) * 100}%`,
                background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`, transition: 'width 0.4s',
              }} />
            </div>

            {/* Audio script */}
            <button
              onClick={() => speakText(current.audioScript)}
              style={{
                width: '100%', padding: '14px 16px', background: T.surface, borderRadius: 10,
                marginBottom: 14, textAlign: 'left', cursor: 'pointer',
                border: `1px solid ${T.border}`, borderLeftWidth: 3, borderLeftColor: T.gold,
              }}
            >
              <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>YOU HEAR (tap to replay)</div>
              <div style={{ fontSize: 16, color: T.text, fontWeight: 600, lineHeight: 1.6 }}>{current.audioScript}</div>
            </button>

            {/* Choices */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
              {current.choices.map((choice, idx) => {
                const letter = String.fromCharCode(65 + idx);
                let bg = T.surface;
                let borderC = T.border;
                let txtC = T.text;
                if (revealed) {
                  if (choice.isCorrect) { bg = '#10B98108'; borderC = '#10B981'; txtC = '#065F46'; }
                  else if (idx === selected) { bg = '#EF444408'; borderC = '#EF4444'; txtC = '#991B1B'; }
                  else { txtC = T.textMuted; }
                }
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={revealed}
                    style={{
                      display: 'flex', gap: 10, alignItems: 'flex-start', padding: '12px 14px',
                      background: bg, border: `1.5px solid ${borderC}`, borderRadius: 8,
                      cursor: revealed ? 'default' : 'pointer', textAlign: 'left',
                      transition: 'all 0.15s',
                      opacity: revealed && !choice.isCorrect && idx !== selected ? 0.4 : 1,
                    }}
                  >
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                      background: revealed && choice.isCorrect ? '#10B98115' : revealed && idx === selected ? '#EF444415' : T.bgSecondary,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: 12, color: txtC,
                    }}>{letter}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: txtC, lineHeight: 1.5 }}>{choice.text}</div>
                      {revealed && choice.trapType && (
                        <span style={{
                          display: 'inline-block', marginTop: 4, padding: '1px 5px',
                          background: '#EF444410', color: '#EF4444', fontSize: 9, fontWeight: 800, borderRadius: 2,
                        }}>
                          TRAP: {choice.trapType}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation + Next */}
            {revealed && (
              <div style={{ animation: 'izk-fadein 0.3s ease' }}>
                <div style={{
                  padding: '12px 14px', background: T.surface, borderRadius: 10,
                  border: `1px solid ${T.border}`, borderLeftWidth: 3,
                  borderLeftColor: selected !== null && current.choices[selected].isCorrect ? '#10B981' : '#EF4444',
                  marginBottom: 14,
                }}>
                  <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8 }}>{current.explanation}</div>
                  {current.tip && (
                    <div style={{
                      marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.border}`,
                      fontSize: 12, color: T.gold, fontWeight: 600,
                    }}>
                      TIP: {current.tip}
                    </div>
                  )}
                </div>

                <button onClick={handleNext} style={{
                  width: '100%', padding: '14px 20px', background: T.gold,
                  border: 'none', borderRadius: 10, color: '#fff', fontWeight: 800, fontSize: 15,
                  cursor: 'pointer', boxShadow: T.shadowMd,
                }}>
                  {currentIdx + 1 < drillSet.length ? (
                    <>次へ <span style={{ fontSize: 12, opacity: 0.7 }}>Q{currentIdx + 2}/{drillSet.length}</span></>
                  ) : '結果を見る'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* RESULTS */}
        {mode === 'results' && (
          <div style={{ animation: 'izk-fadein 0.5s ease' }}>
            {/* Score */}
            {(() => {
              const correct = results.filter(Boolean).length;
              const total = drillSet.length;
              const accuracy = total > 0 ? correct / total : 0;
              return (
                <>
                  <div style={{
                    textAlign: 'center', padding: '28px 20px', background: T.surface,
                    borderRadius: 14, marginBottom: 14,
                    border: `1.5px solid ${accuracy >= 0.8 ? T.goldBorder : T.border}`,
                    boxShadow: accuracy === 1 ? T.goldGlow : T.shadow,
                  }}>
                    <div style={{ fontSize: 48, fontWeight: 900, color: accuracy >= 0.8 ? T.gold : accuracy >= 0.6 ? '#10B981' : '#EF4444' }}>
                      {correct}/{total}
                    </div>
                    <div style={{ fontSize: 14, color: T.textSub, marginTop: 4 }}>
                      {accuracy === 1 ? '完璧。Part 2はお前の得意科目だ。'
                        : accuracy >= 0.8 ? 'いい感じだ。間違えた問題を復習しろ。'
                          : accuracy >= 0.6 ? 'まだ甘い。罠のパターンを覚えろ。'
                            : '反射がまだ鈍い。繰り返し訓練だ。'}
                    </div>
                  </div>

                  {/* Review */}
                  <div style={{
                    padding: '16px 18px', background: T.surface, borderRadius: 12,
                    border: `1px solid ${T.border}`, marginBottom: 14, boxShadow: T.shadow,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1, marginBottom: 10 }}>REVIEW</div>
                    {drillSet.map((q, i) => {
                      const isOpen = expandedQ === i;
                      const wasCorrect = results[i];
                      const correctChoice = q.choices.find(c => c.isCorrect);
                      return (
                        <div key={q.id} style={{ marginBottom: 4 }}>
                          <button onClick={() => { setExpandedQ(isOpen ? null : i); playSound('tap'); }}
                            style={{
                              display: 'flex', gap: 8, alignItems: 'center', width: '100%', padding: '8px 10px',
                              background: isOpen ? (wasCorrect ? '#10B98105' : '#EF444405') : T.bgSecondary,
                              borderRadius: isOpen ? '8px 8px 0 0' : 8, border: 'none', cursor: 'pointer', textAlign: 'left',
                            }}
                          >
                            <div style={{
                              width: 20, height: 20, borderRadius: '50%',
                              background: wasCorrect ? '#10B98112' : '#EF444412',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 10, fontWeight: 800, color: wasCorrect ? '#10B981' : '#EF4444', flexShrink: 0,
                            }}>
                              {wasCorrect ? 'O' : 'X'}
                            </div>
                            <div style={{ flex: 1, fontSize: 12, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              Q{i + 1}. {q.audioScript}
                            </div>
                            <span style={{
                              padding: '1px 5px', background: TYPE_LABELS[q.questionType].color + '10',
                              color: TYPE_LABELS[q.questionType].color, fontSize: 8, fontWeight: 700, borderRadius: 2, flexShrink: 0,
                            }}>
                              {TYPE_LABELS[q.questionType].ja}
                            </span>
                          </button>
                          {isOpen && (
                            <div style={{
                              padding: '10px 12px', background: T.bgSecondary,
                              borderRadius: '0 0 8px 8px', animation: 'izk-fadein 0.2s ease',
                            }}>
                              <div style={{ fontSize: 12, color: '#10B981', fontWeight: 700, marginBottom: 4 }}>
                                A: {correctChoice?.text}
                              </div>
                              <div style={{ fontSize: 12, color: T.textSub, lineHeight: 1.7 }}>{q.explanation}</div>
                              {q.tip && (
                                <div style={{ marginTop: 6, fontSize: 11, color: T.gold, fontWeight: 600 }}>TIP: {q.tip}</div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}

            {/* Actions */}
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => { setMode('home'); setExpandedQ(null); }} style={{
                flex: 1, padding: '12px 16px', background: T.surface, border: `1px solid ${T.border}`,
                borderRadius: 8, color: T.textSub, fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}>設定に戻る</button>
              <button onClick={() => { startDrill(); setExpandedQ(null); }} style={{
                flex: 1, padding: '12px 16px', background: T.gold, border: 'none',
                borderRadius: 8, color: '#fff', fontWeight: 800, fontSize: 13, cursor: 'pointer',
              }}>もう1セット</button>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/english/izakaya-toeic" style={{ fontSize: 12, color: T.textMuted, textDecoration: 'none' }}>
            居酒屋TOEIC Top
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes izk-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
