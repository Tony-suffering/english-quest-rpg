'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { EPISODES } from '@/data/izakaya-toeic/episodes';
import { CHARACTER_MAP, charIcon } from '@/data/izakaya-toeic/characters';
import { T } from '@/data/izakaya-toeic/theme';
import { ToeicQuestion } from '@/data/izakaya-toeic/types';
import { calculateRank } from '@/data/izakaya-toeic/ranking';
import ShareCard from '../ShareCard';

// ── Sound ──
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
  } catch { /* audio not available */ }
}

// ── Streak persistence ──
interface TonightStreak {
  lastDate: string;
  streak: number;
  totalPlayed: number;
}

const TONIGHT_KEY = 'izakaya-tonight-streak';

function getStreak(): TonightStreak {
  if (typeof window === 'undefined') return { lastDate: '', streak: 0, totalPlayed: 0 };
  try {
    const raw = localStorage.getItem(TONIGHT_KEY);
    if (!raw) return { lastDate: '', streak: 0, totalPlayed: 0 };
    return JSON.parse(raw);
  } catch {
    return { lastDate: '', streak: 0, totalPlayed: 0 };
  }
}

function recordTonight(): TonightStreak {
  const today = new Date().toISOString().split('T')[0];
  const current = getStreak();

  if (current.lastDate === today) return current; // Already played today

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const newStreak = current.lastDate === yesterday ? current.streak + 1 : 1;

  const updated: TonightStreak = {
    lastDate: today,
    streak: newStreak,
    totalPlayed: current.totalPlayed + 1,
  };
  localStorage.setItem(TONIGHT_KEY, JSON.stringify(updated));
  return updated;
}

// ── Daily question selection ──
function getDailyQuestion(): { question: ToeicQuestion; episodeId: string; episodeTitle: string } | null {
  // Gather all questions across all episodes
  const allQuestions: { question: ToeicQuestion; episodeId: string; episodeTitle: string }[] = [];
  for (const ep of EPISODES) {
    for (const q of ep.questions) {
      allQuestions.push({ question: q, episodeId: ep.id, episodeTitle: ep.title });
    }
  }
  if (allQuestions.length === 0) return null;

  // Date-based seed for daily consistency
  const today = new Date().toISOString().split('T')[0];
  const seed = today.split('-').reduce((a, b) => a + parseInt(b), 0);
  const idx = seed % allQuestions.length;
  return allQuestions[idx];
}

// ── Format today's date in Japanese ──
function formatDateJa(): string {
  const d = new Date();
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`;
}

export default function TonightPage() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState<TonightStreak>({ lastDate: '', streak: 0, totalPlayed: 0 });

  useEffect(() => {
    setMounted(true);
    setStreak(getStreak());
  }, []);

  const daily = getDailyQuestion();

  const handleSelect = useCallback((idx: number) => {
    if (revealed || !daily) return;
    playSound('tap');
    setSelected(idx);
    setRevealed(true);
    const correct = daily.question.choices[idx].isCorrect;
    setTimeout(() => playSound(correct ? 'correct' : 'wrong'), 200);
    const updated = recordTonight();
    setStreak(updated);
  }, [revealed, daily]);

  if (!mounted) {
    return (
      <div style={{ minHeight: '100dvh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: T.textMuted, fontSize: 13 }}>Loading...</div>
      </div>
    );
  }

  if (!daily) {
    return (
      <div style={{ minHeight: '100dvh', background: T.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: T.textMuted, fontSize: 14, textAlign: 'center' }}>
          問題がありません。<br />エピソードを追加してください。
        </div>
      </div>
    );
  }

  const { question, episodeId, episodeTitle } = daily;
  const correctIdx = question.choices.findIndex(c => c.isCorrect);
  const isCorrect = selected !== null && question.choices[selected]?.isCorrect;
  const diffColor = question.difficulty === 'easy' ? T.green : question.difficulty === 'medium' ? T.gold : T.red;
  const rankInfo = calculateRank();

  return (
    <div style={{ minHeight: '100dvh', background: T.bg }}>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 16px 40px' }}>

        {/* Back link */}
        <Link href="/english/izakaya-toeic" style={{
          fontSize: 12, color: T.textMuted, textDecoration: 'none', display: 'inline-block', marginBottom: 16,
        }}>
          {'<'} 居酒屋TOEICに戻る
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <img
              src={charIcon('master')}
              alt="マスター"
              style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid ${T.gold}`, objectFit: 'cover' }}
            />
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: T.text, margin: 0 }}>
                今夜の1杯
              </h1>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: T.textMuted }}>{formatDateJa()}</span>
                {streak.streak > 0 && (
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: T.gold,
                    padding: '2px 8px', background: T.goldBg, borderRadius: 10,
                  }}>
                    {streak.streak}日連続
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quiz card */}
        <div style={{
          background: T.surface, borderRadius: 14, padding: '18px 16px',
          border: `1px solid ${T.border}`, boxShadow: T.shadow, marginBottom: 16,
        }}>
          {/* Question header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{
              padding: '3px 10px', background: T.goldBg, borderRadius: 4,
              fontSize: 12, fontWeight: 800, color: T.gold,
            }}>
              今夜の1問
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: diffColor, display: 'inline-block',
              }} />
              <span style={{ fontSize: 11, color: T.textMuted }}>{question.scoreLevel}</span>
            </div>
          </div>

          {/* Audio script (non-conversation only) */}
          {question.audioScript && (
            <div style={{
              padding: '10px 14px', background: T.bgSecondary, borderRadius: 8,
              marginBottom: 14, fontSize: 14, color: T.text, lineHeight: 1.6,
              border: `1px solid ${T.border}`, borderLeftWidth: 3, borderLeftColor: T.gold,
            }}>
              <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>
                YOU HEAR
              </div>
              {question.audioScript}
            </div>
          )}

          {/* Question text */}
          {question.questionText && (
            <div style={{
              padding: '10px 14px', background: T.bgSecondary, borderRadius: 8,
              marginBottom: 14, fontSize: 14, color: T.text, lineHeight: 1.6,
              border: `1px solid ${T.border}`,
            }}>
              {question.questionText}
            </div>
          )}

          {/* Choices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
            {question.choices.map((choice, idx) => {
              const letter = String.fromCharCode(65 + idx);
              let bg = T.surface;
              let borderC = T.border;
              let txtC = T.text;
              if (revealed) {
                if (idx === correctIdx) { bg = T.green + '08'; borderC = T.green; txtC = '#065F46'; }
                else if (idx === selected) { bg = T.red + '08'; borderC = T.red; txtC = '#991B1B'; }
                else { txtC = T.textMuted; }
              }
              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={revealed}
                  style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: bg,
                    border: `1.5px solid ${borderC}`, borderRadius: 8, cursor: revealed ? 'default' : 'pointer',
                    textAlign: 'left', transition: 'all 0.15s',
                    opacity: revealed && idx !== correctIdx && idx !== selected ? 0.4 : 1,
                  }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: revealed && idx === correctIdx ? T.green + '15' : revealed && idx === selected ? T.red + '15' : T.bgSecondary,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 800, fontSize: 11, color: txtC, flexShrink: 0,
                  }}>{letter}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: txtC, lineHeight: 1.5 }}>{choice.text}</div>
                    {revealed && (idx === selected || idx === correctIdx) && choice.explanation && (
                      <div style={{
                        marginTop: 6, fontSize: 12, color: T.textSub, lineHeight: 1.6,
                        paddingTop: 6, borderTop: `1px solid ${T.border}`,
                      }}>
                        {choice.trapType && (
                          <span style={{
                            display: 'inline-block', padding: '1px 5px',
                            background: T.red + '10', color: T.red,
                            fontSize: 9, fontWeight: 800, borderRadius: 2, marginRight: 4,
                          }}>
                            {choice.trapType.toUpperCase()}
                          </span>
                        )}
                        {choice.isCorrect && (
                          <span style={{
                            display: 'inline-block', padding: '1px 5px',
                            background: T.green + '10', color: T.green,
                            fontSize: 9, fontWeight: 800, borderRadius: 2, marginRight: 4,
                          }}>
                            CORRECT
                          </span>
                        )}
                        {choice.explanation}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation after answer */}
          {revealed && (
            <div style={{ animation: 'izk-fadein 0.3s ease' }}>
              <div style={{
                padding: '14px 16px', background: T.surface, borderRadius: 10,
                border: `1px solid ${T.border}`, borderLeftWidth: 3,
                borderLeftColor: isCorrect ? T.green : T.red,
              }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: isCorrect ? T.green + '12' : T.red + '12',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 900, color: isCorrect ? T.green : T.red,
                  }}>
                    {isCorrect ? 'O' : 'X'}
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: 1,
                    color: isCorrect ? T.green : T.red,
                  }}>
                    {isCorrect ? 'CORRECT' : 'INCORRECT'}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: T.textSub, lineHeight: 1.8 }}>
                  {question.explanation}
                </div>

                {/* Paraphrase map */}
                {question.paraphraseMap && question.paraphraseMap.length > 0 && (
                  <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, marginBottom: 6 }}>PARAPHRASE MAP</div>
                    {question.paraphraseMap.map((pm, i) => (
                      <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 12, marginBottom: 3 }}>
                        <span style={{ color: T.textMuted, background: T.bgSecondary, padding: '2px 6px', borderRadius: 3 }}>{pm.original}</span>
                        <span style={{ color: T.gold, fontWeight: 700, fontSize: 10 }}>{'>'}</span>
                        <span style={{ color: T.text, fontWeight: 600, background: T.goldBg, padding: '2px 6px', borderRadius: 3 }}>{pm.paraphrased}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Post-answer section */}
        {revealed && (
          <div style={{ animation: 'izk-fadein 0.4s ease' }}>
            {/* Source episode */}
            <div style={{
              padding: '12px 14px', background: T.surface, borderRadius: 10,
              border: `1px solid ${T.border}`, marginBottom: 16,
            }}>
              <div style={{ fontSize: 10, color: T.textMuted, fontWeight: 600, marginBottom: 8 }}>
                出典エピソード
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Character faces from the episode */}
                  <div style={{ display: 'flex', marginRight: 4 }}>
                    {(() => {
                      const ep = EPISODES.find(e => e.id === episodeId);
                      if (!ep) return null;
                      const speakers = [...new Set(ep.story.map(s => s.speaker).filter(s => s !== 'narration'))].slice(0, 4);
                      return speakers.map((spk, i) => {
                        const ch = CHARACTER_MAP[spk];
                        if (!ch) return null;
                        return (
                          <img
                            key={spk}
                            src={charIcon(ch.id)}
                            alt={ch.name}
                            style={{
                              width: 28, height: 28, borderRadius: '50%',
                              border: `2px solid ${ch.color}`, objectFit: 'cover',
                              marginLeft: i > 0 ? -8 : 0, position: 'relative',
                              zIndex: speakers.length - i,
                            }}
                          />
                        );
                      });
                    })()}
                  </div>
                  <div style={{ fontSize: 13, color: T.text, fontWeight: 600 }}>
                    {episodeTitle}
                  </div>
                </div>
                <Link href={`/english/izakaya-toeic/episodes/${episodeId}`} style={{
                  fontSize: 11, fontWeight: 700, color: T.gold, textDecoration: 'none',
                  padding: '5px 12px', border: `1.5px solid ${T.goldBorder}`, borderRadius: 6,
                  flexShrink: 0,
                }}>
                  挑戦する
                </Link>
              </div>
            </div>

            {/* Share card */}
            <div style={{ marginBottom: 20 }}>
              <ShareCard
                type="tonight"
                title={isCorrect ? '今夜の1杯 -- 正解' : '今夜の1杯 -- 不正解'}
                subtitle={`${formatDateJa()} / ${streak.streak}日連続`}
                stats={[
                  { label: '通算', value: `${streak.totalPlayed}杯` },
                  { label: '連続', value: `${streak.streak}日` },
                ]}
                rank={rankInfo.rank}
              />
            </div>

            {/* Motivational */}
            <div style={{
              textAlign: 'center', padding: '16px 0',
            }}>
              <div style={{ fontSize: 14, color: T.textSub, fontWeight: 600, marginBottom: 4 }}>
                また明日も1杯。
              </div>
              <div style={{ fontSize: 11, color: T.textMuted }}>
                毎日続けることが一番の近道。
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
              <Link href="/english/izakaya-toeic" style={{
                padding: '10px 20px', fontSize: 13, fontWeight: 700,
                color: T.textSub, background: T.surface, border: `1.5px solid ${T.border}`,
                borderRadius: 8, textDecoration: 'none',
              }}>
                トップに戻る
              </Link>
              <Link href="/english/izakaya-toeic/episodes" style={{
                padding: '10px 20px', fontSize: 13, fontWeight: 700,
                color: T.surface, background: T.gold, border: 'none',
                borderRadius: 8, textDecoration: 'none',
              }}>
                エピソード一覧
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
