'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { EPISODES } from '@/data/izakaya-toeic/episodes';
import { T, PART_COLORS } from '@/data/izakaya-toeic/theme';
import {
  getVocabDeck, getVocabDeckStats, getReviewQueue,
  updateVocabMastery, VocabDeckItem, addVocabToDeck,
  getProgress, isEpisodeCompleted,
} from '@/data/izakaya-toeic/progress';

// ── Sound FX ──
function playSound(type: 'correct' | 'wrong' | 'tap' | 'complete' | 'spin' | 'stop' | 'levelup') {
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
    if (type === 'spin') { for (let i = 0; i < 8; i++) make(300 + i * 60, i * 0.04, 0.05, 'square', 0.04); }
    if (type === 'stop') make(600, 0, 0.08, 'triangle', 0.08);
    if (type === 'levelup') { make(392, 0, 0.12); make(523, 0.08, 0.12); make(659, 0.16, 0.12); make(784, 0.24, 0.3); }
  } catch { /* */ }
}

// ── TTS ──
function speakWord(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = 'en-US';
  utter.rate = 0.85;
  window.speechSynthesis.speak(utter);
}

// ── Mastery ──
const MASTERY_LABELS = ['NEW', 'SEEN', 'OK', 'DONE'];
const MASTERY_COLORS = [T.textMuted, T.blue, T.gold, T.green];
const MASTERY_BG = ['transparent', T.blue + '08', T.goldBg, T.green + '08'];

type Mode = 'home' | 'review' | 'browse';

export default function ToeicTrainingPage() {
  const [mode, setMode] = useState<Mode>('home');
  const [deck, setDeck] = useState<VocabDeckItem[]>([]);
  const [stats, setStats] = useState({ total: 0, mastered: 0, reviewing: 0, newCount: 0 });
  const [filterEp, setFilterEp] = useState<string | null>(null);
  const [reviewQueue, setReviewQueue] = useState<VocabDeckItem[]>([]);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [showMeaning, setShowMeaning] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [spinText, setSpinText] = useState('');
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0 });
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [reelSymbols, setReelSymbols] = useState(['?', '?', '?']);
  const [reelsStopped, setReelsStopped] = useState([false, false, false]);

  useEffect(() => {
    refreshData();
    // Seed vocab from completed episodes if not already in deck
    const existingDeck = getVocabDeck();
    const existingWords = new Set(existingDeck.map(d => d.word));
    EPISODES.forEach(ep => {
      if (isEpisodeCompleted(ep.id)) {
        ep.vocabHighlights.forEach(v => {
          if (!existingWords.has(v.word)) {
            addVocabToDeck(v.word, v.meaning, ep.id, ep.title, v.example, v.partOfSpeech);
          }
        });
      }
    });
    refreshData();
  }, []);

  const refreshData = () => {
    const d = getVocabDeck();
    setDeck(d);
    setStats(getVocabDeckStats());
  };

  const startReview = (epFilter?: string) => {
    const fullDeck = getVocabDeck();
    const filtered = epFilter ? fullDeck.filter(d => d.sourceEpisode === epFilter) : fullDeck;
    const queue = [...filtered].sort((a, b) => {
      if (a.masteryLevel === 0 && b.masteryLevel !== 0) return -1;
      if (b.masteryLevel === 0 && a.masteryLevel !== 0) return 1;
      if (a.masteryLevel !== b.masteryLevel) return a.masteryLevel - b.masteryLevel;
      if (!a.lastReviewedAt) return -1;
      if (!b.lastReviewedAt) return 1;
      return new Date(a.lastReviewedAt).getTime() - new Date(b.lastReviewedAt).getTime();
    }).slice(0, 20);

    if (queue.length === 0) return;
    setReviewQueue(queue);
    setReviewIdx(0);
    setShowMeaning(false);
    setSpinning(false);
    setSpinText('');
    setSessionStats({ correct: 0, wrong: 0 });
    setCombo(0);
    setMaxCombo(0);
    setReelSymbols(['?', '?', '?']);
    setReelsStopped([false, false, false]);
    setMode('review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpin = () => {
    if (spinning || showMeaning) return;
    const current = reviewQueue[reviewIdx];
    if (!current) return;
    playSound('spin');
    setSpinning(true);
    setReelsStopped([false, false, false]);

    // Reel animation
    const SYMBOLS = ['7', 'V', 'R', 'B', '-'];
    let count = 0;
    const interval = setInterval(() => {
      setReelSymbols([
        count < 6 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : (count < 6 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : reelSymbols[0]),
        count < 10 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : reelSymbols[1],
        count < 14 ? SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)] : reelSymbols[2],
      ]);

      // Stop reels sequentially
      if (count === 6) { setReelsStopped(p => [true, p[1], p[2]]); playSound('stop'); }
      if (count === 10) { setReelsStopped(p => [p[0], true, p[2]]); playSound('stop'); }
      if (count === 14) {
        setReelsStopped([true, true, true]);
        playSound('stop');
      }

      // Flicker meaning text
      const randWord = reviewQueue[Math.floor(Math.random() * reviewQueue.length)];
      setSpinText(randWord.meaning);

      count++;
      if (count > 16) {
        clearInterval(interval);
        setSpinText(current.meaning);
        setSpinning(false);
        setShowMeaning(true);

        // Set final reel result based on mastery
        const m = current.masteryLevel;
        if (m >= 2) setReelSymbols(['7', '7', '7']);
        else if (m === 1) setReelSymbols(['7', '7', 'V']);
        else setReelSymbols(['7', 'B', '-']);
      }
    }, 60);
  };

  const handleJudge = (correct: boolean) => {
    const current = reviewQueue[reviewIdx];
    if (!current) return;

    updateVocabMastery(current.word, correct);
    playSound(correct ? 'correct' : 'wrong');

    const newCombo = correct ? combo + 1 : 0;
    setCombo(newCombo);
    if (newCombo > maxCombo) setMaxCombo(newCombo);
    setSessionStats(s => ({
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }));

    if (newCombo >= 3 && correct) playSound('levelup');

    if (reviewIdx + 1 < reviewQueue.length) {
      setTimeout(() => {
        setReviewIdx(p => p + 1);
        setShowMeaning(false);
        setSpinning(false);
        setSpinText('');
        setReelSymbols(['?', '?', '?']);
        setReelsStopped([false, false, false]);
      }, 400);
    } else {
      setTimeout(() => {
        playSound('complete');
        refreshData();
        setMode('home');
      }, 600);
    }
  };

  // Episode groups with vocab counts (safe for SSR - deck is state, populated in useEffect)
  const [completedEps, setCompletedEps] = useState<Set<string>>(new Set());
  useEffect(() => {
    setCompletedEps(new Set(EPISODES.filter(ep => isEpisodeCompleted(ep.id)).map(ep => ep.id)));
  }, [deck]);

  const episodeVocabCounts = EPISODES.map(ep => ({
    ep,
    vocabCount: deck.filter(d => d.sourceEpisode === ep.id).length,
    mastered: deck.filter(d => d.sourceEpisode === ep.id && d.masteryLevel === 3).length,
    completed: completedEps.has(ep.id),
  }));

  const totalMasteryPct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: T.bg, color: T.text }}>
      {/* Header */}
      <div style={{
        padding: '10px 16px', background: 'rgba(250,250,249,0.92)',
        backdropFilter: 'blur(10px)', borderBottom: `1px solid ${T.border}`,
        position: 'sticky', top: 0, zIndex: 20,
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/english/izakaya-toeic" style={{ fontSize: 11, color: T.textMuted, textDecoration: 'none' }}>
              {'<'} 居酒屋TOEIC
            </Link>
            <span style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1 }}>TRAINING</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '16px 16px 60px' }}>

        {/* HOME */}
        {mode === 'home' && (
          <div style={{ animation: 'trn-fadein 0.3s ease' }}>
            {/* Hero */}
            <div style={{
              textAlign: 'center', padding: '24px 20px', marginBottom: 14,
              background: T.surface, borderRadius: 14,
              border: `1px solid ${T.goldBorder}`, boxShadow: T.shadow,
            }}>
              <div style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
                TOEIC VOCAB SLOT
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: T.text, marginBottom: 4 }}>
                {stats.total}
              </div>
              <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 14 }}>語彙カード</div>

              {/* Mastery bars */}
              {stats.total > 0 && (
                <div style={{ maxWidth: 280, margin: '0 auto', marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: T.textMuted }}>MASTERY</span>
                    <span style={{ fontSize: 10, color: T.gold, fontWeight: 700 }}>{totalMasteryPct}%</span>
                  </div>
                  <div style={{ height: 6, background: T.bgSecondary, borderRadius: 3, overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${(stats.mastered / stats.total) * 100}%`, background: T.green, transition: 'width 0.6s' }} />
                    <div style={{ width: `${(stats.reviewing / stats.total) * 100}%`, background: T.gold, transition: 'width 0.6s' }} />
                    <div style={{ width: `${(stats.newCount / stats.total) * 100}%`, background: T.textMuted + '30', transition: 'width 0.6s' }} />
                  </div>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 6 }}>
                    <span style={{ fontSize: 10, color: T.green }}>DONE {stats.mastered}</span>
                    <span style={{ fontSize: 10, color: T.gold }}>OK {stats.reviewing}</span>
                    <span style={{ fontSize: 10, color: T.textMuted }}>NEW {stats.newCount}</span>
                  </div>
                </div>
              )}

              {/* Start button */}
              {stats.total > 0 ? (
                <button onClick={() => startReview()} style={{
                  padding: '14px 40px',
                  background: `linear-gradient(135deg, ${T.gold}, #B8941F)`,
                  border: 'none', borderRadius: 10, color: '#fff', fontWeight: 800, fontSize: 16,
                  cursor: 'pointer', boxShadow: T.shadowMd,
                }}>
                  SPIN START
                </button>
              ) : (
                <div style={{ padding: '12px', background: T.bgSecondary, borderRadius: 8 }}>
                  <p style={{ fontSize: 12, color: T.textMuted, margin: 0 }}>
                    エピソードをクリアすると語彙カードがここに追加されます
                  </p>
                </div>
              )}
            </div>

            {/* Episode vocab list */}
            <div style={{
              padding: '16px 18px', background: T.surface, borderRadius: 12,
              border: `1px solid ${T.border}`, marginBottom: 14, boxShadow: T.shadow,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, letterSpacing: 1, marginBottom: 10 }}>
                EPISODE VOCABULARY
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {episodeVocabCounts.map(({ ep, vocabCount, mastered, completed }) => {
                  const pc = PART_COLORS[ep.targetPart] || T.gold;
                  return (
                    <button
                      key={ep.id}
                      onClick={() => { if (vocabCount > 0) startReview(ep.id); }}
                      disabled={vocabCount === 0}
                      style={{
                        display: 'flex', gap: 8, alignItems: 'center', width: '100%',
                        padding: '10px 12px', background: T.bgSecondary, borderRadius: 8,
                        border: 'none', cursor: vocabCount > 0 ? 'pointer' : 'default',
                        textAlign: 'left', opacity: completed ? 1 : 0.5,
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: completed ? T.greenBg : `${pc}10`,
                        border: `1.5px solid ${completed ? T.green : pc}30`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 900, fontSize: 12, color: completed ? T.green : pc, flexShrink: 0,
                      }}>
                        {completed ? 'O' : ep.number}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: 12, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          EP.{ep.number} {ep.title}
                        </div>
                        <div style={{ fontSize: 10, color: T.textMuted }}>
                          {vocabCount > 0 ? `${mastered}/${vocabCount} mastered` : 'not unlocked'}
                        </div>
                      </div>
                      {vocabCount > 0 && (
                        <div style={{
                          padding: '4px 10px', background: T.goldBg,
                          borderRadius: 6, fontSize: 11, fontWeight: 700, color: T.gold, flexShrink: 0,
                        }}>
                          SPIN
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Browse all */}
            {stats.total > 0 && (
              <button onClick={() => { setMode('browse'); setFilterEp(null); playSound('tap'); }}
                style={{
                  width: '100%', padding: '12px 16px', background: T.surface,
                  border: `1px solid ${T.border}`, borderRadius: 10,
                  color: T.textSub, fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  boxShadow: T.shadow,
                }}>
                全{stats.total}語を一覧表示
              </button>
            )}
          </div>
        )}

        {/* REVIEW MODE */}
        {mode === 'review' && reviewQueue.length > 0 && (
          <div style={{ animation: 'trn-fadein 0.3s ease' }}>
            <button onClick={() => { setMode('home'); refreshData(); }} style={{
              display: 'block', marginBottom: 14, fontSize: 11, color: T.textMuted,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              {'<'} トレーニングに戻る
            </button>

            {/* Stats bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: T.gold, fontWeight: 700, letterSpacing: 1 }}>
                {reviewIdx + 1}/{reviewQueue.length}
              </span>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {combo >= 3 && (
                  <span style={{
                    padding: '2px 8px', background: T.goldBg, borderRadius: 4,
                    fontSize: 10, fontWeight: 800, color: T.gold,
                    animation: 'trn-pulse 0.5s ease',
                  }}>
                    {combo} COMBO
                  </span>
                )}
                <span style={{ fontSize: 11, color: T.green, fontWeight: 700 }}>O:{sessionStats.correct}</span>
                <span style={{ fontSize: 11, color: T.red, fontWeight: 700 }}>X:{sessionStats.wrong}</span>
              </div>
            </div>

            {/* Progress */}
            <div style={{ height: 3, background: T.bgSecondary, borderRadius: 2, marginBottom: 20, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${((reviewIdx + (showMeaning ? 1 : 0)) / reviewQueue.length) * 100}%`,
                background: `linear-gradient(90deg, ${T.gold}, ${T.goldLight})`, transition: 'width 0.4s',
              }} />
            </div>

            {(() => {
              const current = reviewQueue[reviewIdx];
              if (!current) return null;
              const mc = MASTERY_COLORS[current.masteryLevel];

              return (
                <>
                  {/* Slot Reels */}
                  <div style={{
                    display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 16,
                  }}>
                    {reelSymbols.map((s, i) => (
                      <div key={i} style={{
                        width: 48, height: 56, borderRadius: 8,
                        background: reelsStopped[i] ? (s === '7' ? T.goldBg : T.bgSecondary) : T.bgSecondary,
                        border: `2px solid ${reelsStopped[i] ? (s === '7' ? T.gold : T.border) : T.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 24, fontWeight: 900,
                        color: s === '7' ? T.gold : s === 'V' ? T.green : s === 'R' ? T.red : T.textMuted,
                        transition: 'all 0.15s',
                        animation: !reelsStopped[i] && spinning ? 'trn-shake 0.08s infinite' : undefined,
                      }}>
                        {s}
                      </div>
                    ))}
                  </div>

                  {/* Card */}
                  <div style={{
                    padding: '28px 24px', background: T.surface, borderRadius: 14,
                    border: `1.5px solid ${T.goldBorder}`, textAlign: 'center',
                    boxShadow: T.shadowMd, marginBottom: 16,
                    minHeight: 200, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    {/* Mastery badge */}
                    <div style={{
                      padding: '2px 10px', background: mc + '10', borderRadius: 4,
                      fontSize: 9, fontWeight: 800, color: mc, letterSpacing: 1, marginBottom: 10,
                    }}>
                      {MASTERY_LABELS[current.masteryLevel]} {'*'.repeat(current.masteryLevel)}
                    </div>

                    {/* Word */}
                    <button onClick={() => speakWord(current.word)} style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: T.text, marginBottom: 4 }}>
                        {current.word}
                      </div>
                    </button>
                    {current.partOfSpeech && (
                      <span style={{ padding: '2px 8px', background: T.goldBg, color: T.gold, fontSize: 10, fontWeight: 700, borderRadius: 3, marginBottom: 14 }}>
                        {current.partOfSpeech}
                      </span>
                    )}

                    {/* Spin area */}
                    {!showMeaning && !spinning ? (
                      <button onClick={handleSpin} style={{
                        marginTop: 8, padding: '14px 40px',
                        background: `linear-gradient(135deg, ${T.gold}, #B8941F)`,
                        border: 'none', borderRadius: 10, color: '#fff', fontWeight: 800, fontSize: 16,
                        cursor: 'pointer', boxShadow: T.shadowMd,
                        animation: 'trn-pulse 2s infinite',
                      }}>
                        SPIN
                      </button>
                    ) : spinning ? (
                      <div style={{
                        marginTop: 8, fontSize: 20, fontWeight: 700, color: T.gold,
                        minHeight: 36, display: 'flex', alignItems: 'center',
                        animation: 'trn-shake 0.1s infinite',
                      }}>
                        {spinText}
                      </div>
                    ) : (
                      <div style={{ marginTop: 8, animation: 'trn-fadein 0.3s ease' }}>
                        <div style={{ fontSize: 22, fontWeight: 800, color: T.gold, marginBottom: 4 }}>
                          {current.meaning}
                        </div>
                        {current.example && (
                          <div style={{ fontSize: 12, color: T.textMuted, fontStyle: 'italic', marginTop: 10, lineHeight: 1.6, maxWidth: 340 }}>
                            "{current.example}"
                          </div>
                        )}
                      </div>
                    )}

                    {/* Source */}
                    <div style={{ marginTop: 16, fontSize: 10, color: T.textMuted }}>
                      {current.sourceEpisodeTitle}
                    </div>
                  </div>

                  {/* Judge buttons */}
                  {showMeaning && (
                    <div style={{ display: 'flex', gap: 8, animation: 'trn-fadein 0.2s ease' }}>
                      <button onClick={() => handleJudge(false)} style={{
                        flex: 1, padding: '14px', background: T.red + '08', border: `1.5px solid ${T.red}30`,
                        borderRadius: 10, color: T.red, fontWeight: 800, fontSize: 15, cursor: 'pointer',
                      }}>
                        X 知らなかった
                      </button>
                      <button onClick={() => handleJudge(true)} style={{
                        flex: 1, padding: '14px', background: T.green + '08', border: `1.5px solid ${T.green}30`,
                        borderRadius: 10, color: T.green, fontWeight: 800, fontSize: 15, cursor: 'pointer',
                      }}>
                        O 知ってた
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        )}

        {/* BROWSE MODE */}
        {mode === 'browse' && (
          <div style={{ animation: 'trn-fadein 0.3s ease' }}>
            <button onClick={() => { setMode('home'); playSound('tap'); }} style={{
              display: 'block', marginBottom: 14, fontSize: 11, color: T.textMuted,
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            }}>
              {'<'} トレーニングに戻る
            </button>

            <h2 style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>語彙カード一覧</h2>
            <p style={{ fontSize: 11, color: T.textMuted, marginBottom: 14 }}>{deck.length}語 / tap to pronounce</p>

            {/* Episode filter pills */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 14 }}>
              <button onClick={() => setFilterEp(null)} style={{
                padding: '4px 10px', borderRadius: 4, border: 'none', cursor: 'pointer',
                background: !filterEp ? T.gold : T.bgSecondary,
                color: !filterEp ? '#fff' : T.textSub, fontSize: 10, fontWeight: 700,
              }}>ALL</button>
              {EPISODES.filter(ep => deck.some(d => d.sourceEpisode === ep.id)).map(ep => (
                <button key={ep.id} onClick={() => setFilterEp(ep.id)} style={{
                  padding: '4px 10px', borderRadius: 4, border: 'none', cursor: 'pointer',
                  background: filterEp === ep.id ? T.gold : T.bgSecondary,
                  color: filterEp === ep.id ? '#fff' : T.textSub, fontSize: 10, fontWeight: 700,
                }}>EP.{ep.number}</button>
              ))}
            </div>

            {/* Card list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {deck.filter(d => !filterEp || d.sourceEpisode === filterEp).map((item, i) => {
                const mc = MASTERY_COLORS[item.masteryLevel];
                return (
                  <button key={i} onClick={() => speakWord(item.word)} style={{
                    display: 'flex', gap: 10, alignItems: 'center', width: '100%', padding: '10px 12px',
                    background: MASTERY_BG[item.masteryLevel] || T.surface, borderRadius: 8,
                    border: `1px solid ${T.border}`, cursor: 'pointer', textAlign: 'left',
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 6, flexShrink: 0,
                      background: mc + '10', border: `1.5px solid ${mc}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 8, fontWeight: 800, color: mc, letterSpacing: 0.5,
                    }}>
                      {MASTERY_LABELS[item.masteryLevel]}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{item.word}</div>
                      <div style={{ fontSize: 12, color: T.textSub }}>{item.meaning}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      {item.partOfSpeech && (
                        <span style={{ fontSize: 9, color: T.textMuted }}>{item.partOfSpeech}</span>
                      )}
                      {item.reviewCount > 0 && (
                        <div style={{ fontSize: 9, color: T.textMuted }}>x{item.reviewCount}</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {deck.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: T.textMuted }}>
                <p style={{ fontSize: 14, margin: '0 0 8px' }}>語彙カードがありません</p>
                <p style={{ fontSize: 12 }}>エピソードをクリアすると語彙が追加されます</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes trn-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes trn-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
        @keyframes trn-shake { 0% { transform: translateX(-1px) translateY(-1px); } 50% { transform: translateX(1px) translateY(1px); } 100% { transform: translateX(-1px) translateY(-1px); } }
      `}</style>
    </div>
  );
}
