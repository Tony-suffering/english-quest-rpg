'use client';

// 居酒屋TOEIC ── DUOスタイル300例文ビューア
// データ: src/data/english/365/duo-style-300.ts (30話 × 10文, 根拠付き)
// 1文ごとに: キャラ / 場面 / 英文(音声) / 和訳 / targets(根拠チップ) / pitfall(誤用注意) / YouGlish実音声

import { useState, useEffect, useMemo, useCallback, type CSSProperties } from 'react';
import Link from 'next/link';
import { DUO_STYLE_300, DUO_EPISODES, type DuoSentence } from '@/data/english/365/duo-style-300';
import { IZAKAYA_CHARACTERS, charIcon } from '@/data/izakaya-toeic/characters';
import { T } from '@/data/izakaya-toeic/theme';
import { addPhrase } from '@/lib/local-store';

const LS_KEY = 'toeic-duo300-learned';
const REG_KEY = 'toeic-duo300-registered';

const CHAR_MAP = Object.fromEntries(IZAKAYA_CHARACTERS.map(c => [c.id, c])) as Record<string, (typeof IZAKAYA_CHARACTERS)[number]>;

const SOURCE_COLOR: Record<string, string> = {
  NGSL: T.textSub, TSL: T.gold, PHaVE: T.blue, CEFR: T.green, '英検': T.purple,
};

function cleanQuery(item: string): string {
  // "get back to (someone)" -> "get back to" / "between A and B" -> 整形
  return item.replace(/\([^)]*\)/g, '').replace(/\bA and B\b/i, '').replace(/\s+/g, ' ').trim();
}
function youglishUrl(item: string): string {
  return `https://youglish.com/pronounce/${encodeURIComponent(cleanQuery(item))}/english`;
}
function playphraseUrl(item: string): string {
  return `https://www.playphrase.me/#/search?q=${encodeURIComponent(cleanQuery(item))}`;
}
function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function speak(en: string, ja: string, onStart: () => void, onEnd: () => void) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  onStart();
  const u = new SpeechSynthesisUtterance(en);
  u.lang = 'en-US'; u.rate = 0.85;
  const j = new SpeechSynthesisUtterance(ja);
  j.lang = 'ja-JP'; j.rate = 0.95;
  j.onend = onEnd; j.onerror = onEnd;
  u.onend = () => setTimeout(() => window.speechSynthesis.speak(j), 250);
  u.onerror = onEnd;
  window.speechSynthesis.speak(u);
}

export default function DuoSentencesPage() {
  const [episode, setEpisode] = useState(1);
  const [learned, setLearned] = useState<Set<number>>(new Set());
  const [registered, setRegistered] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setLearned(new Set(JSON.parse(raw)));
      const reg = localStorage.getItem(REG_KEY);
      if (reg) setRegistered(new Set(JSON.parse(reg)));
    } catch { /* noop */ }
  }, []);

  const register = useCallback((s: DuoSentence) => {
    setRegistered(prev => {
      if (prev.has(s.no)) return prev;
      try {
        addPhrase({ english: s.en, japanese: s.ja, category: 'izakaya-300', date: todayStr(), context: s.note || s.beat });
      } catch { /* noop */ }
      const next = new Set(prev); next.add(s.no);
      try { localStorage.setItem(REG_KEY, JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  }, []);

  const toggleLearned = useCallback((no: number) => {
    setLearned(prev => {
      const next = new Set(prev);
      if (next.has(no)) next.delete(no); else next.add(no);
      try { localStorage.setItem(LS_KEY, JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  }, []);

  const episodeSentences = useMemo(
    () => DUO_STYLE_300.filter(s => s.episode === episode),
    [episode],
  );
  const epMeta = DUO_EPISODES.find(e => e.no === episode);
  const epLearned = episodeSentences.filter(s => learned.has(s.no)).length;

  return (
    <main style={{ minHeight: '100vh', background: T.bg, color: T.text, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: T.surface, borderBottom: `1px solid ${T.border}`, padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 720, margin: '0 auto' }}>
          <div>
            <Link href="/english/toeic" style={{ fontSize: 12, color: T.textMuted, textDecoration: 'none' }}>← 居酒屋TOEIC</Link>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>居酒屋300 <span style={{ fontSize: 12, fontWeight: 500, color: T.textMuted }}>DUO式・根拠付き</span></div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 12, color: T.textSub }}>
            <div style={{ fontWeight: 700, color: T.gold, fontSize: 16 }}>{learned.size}<span style={{ color: T.textMuted, fontSize: 12 }}>/300</span></div>
            <div>覚えた</div>
          </div>
        </div>
      </header>

      {/* Episode tabs */}
      <div style={{ overflowX: 'auto', borderBottom: `1px solid ${T.border}`, background: T.bgSecondary }}>
        <div style={{ display: 'flex', gap: 6, padding: '10px 16px', maxWidth: 900, margin: '0 auto' }}>
          {DUO_EPISODES.map(e => (
            <button key={e.no} onClick={() => setEpisode(e.no)}
              style={{
                flex: '0 0 auto', padding: '6px 12px', borderRadius: 8, cursor: 'pointer',
                border: `1px solid ${episode === e.no ? T.gold : T.border}`,
                background: episode === e.no ? T.goldBg : T.surface,
                color: episode === e.no ? '#92400E' : T.textSub,
                fontSize: 12, fontWeight: episode === e.no ? 700 : 500, whiteSpace: 'nowrap',
              }}>
              Day {e.no}
            </button>
          ))}
        </div>
      </div>

      {/* Episode title */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 16px 4px' }}>
        <div style={{ fontSize: 12, color: T.textMuted, letterSpacing: 1 }}>DAY {episode} / 30 ・ {epLearned}/{episodeSentences.length} 覚えた</div>
        <h1 style={{ fontSize: 20, fontWeight: 700, margin: '2px 0 0' }}>{epMeta?.title}</h1>
      </div>

      {/* Sentence cards */}
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '12px 16px 80px', display: 'grid', gap: 12 }}>
        {episodeSentences.map(s => (
          <SentenceCard
            key={s.no} s={s}
            isLearned={learned.has(s.no)}
            isRegistered={registered.has(s.no)}
            isPlaying={playing === s.no}
            onToggle={() => toggleLearned(s.no)}
            onRegister={() => register(s)}
            onPlay={() => speak(s.en, s.ja, () => setPlaying(s.no), () => setPlaying(null))}
          />
        ))}
      </div>
    </main>
  );
}

function SentenceCard({ s, isLearned, isRegistered, isPlaying, onToggle, onRegister, onPlay }: {
  s: DuoSentence; isLearned: boolean; isRegistered: boolean; isPlaying: boolean;
  onToggle: () => void; onRegister: () => void; onPlay: () => void;
}) {
  const char = CHAR_MAP[s.character];

  return (
    <div style={{
      background: T.surface, border: `1px solid ${isLearned ? T.goldBorder : T.border}`,
      borderRadius: 14, padding: 16, boxShadow: T.shadow, opacity: isLearned ? 0.78 : 1,
    }}>
      {/* character + beat */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <img src={charIcon(s.character)} alt={char?.name || s.character} width={28} height={28}
          style={{ borderRadius: '50%', objectFit: 'cover', border: `1.5px solid ${char?.color || T.border}` }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: char?.color || T.textSub }}>{char?.name || s.character}</div>
        <div style={{ fontSize: 11, color: T.textMuted, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.beat}</div>
      </div>

      {/* English (tap to listen) */}
      <button onClick={onPlay} style={{
        display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        fontSize: 17, fontWeight: 600, lineHeight: 1.45, color: T.text,
      }}>
        {s.en}
        <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: isPlaying ? T.green : T.gold }}>{isPlaying ? '再生中' : '▶ 音声'}</span>
      </button>

      {/* Japanese */}
      <div style={{ fontSize: 14, color: T.textSub, marginTop: 6 }}>{s.ja}</div>

      {/* pitfall */}
      {s.pitfall && (
        <div style={{ marginTop: 10, background: 'rgba(239,68,68,0.06)', border: `1px solid rgba(239,68,68,0.25)`, borderRadius: 8, padding: '8px 10px', fontSize: 12.5 }}>
          <span style={{ color: T.red, fontWeight: 700 }}>NG</span>{' '}
          <span style={{ color: T.textSub, textDecoration: 'line-through' }}>{s.pitfall.wrong}</span>
          <div style={{ color: T.textSub, marginTop: 3 }}>{s.pitfall.why}</div>
        </div>
      )}

      {/* targets (根拠) + 各表現の実音声 (YouGlish / PlayPhrase) */}
      <div style={{ display: 'grid', gap: 6, marginTop: 10 }}>
        {s.targets.map((t, i) => {
          const c = SOURCE_COLOR[t.source] || T.textSub;
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{
                fontSize: 12, padding: '2px 8px', borderRadius: 6,
                background: c + '14', color: c, fontWeight: 600, opacity: t.reinforcement ? 0.6 : 1,
              }}>
                {t.item} <span style={{ fontSize: 9, opacity: 0.8 }}>{t.source}</span>
              </span>
              <a href={youglishUrl(t.item)} target="_blank" rel="noopener noreferrer" style={MINI_LINK(T.blue)}>YouGlish</a>
              <a href={playphraseUrl(t.item)} target="_blank" rel="noopener noreferrer" style={MINI_LINK(T.purple)}>PlayPhrase</a>
            </div>
          );
        })}
      </div>

      {s.note && <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 8, lineHeight: 1.5 }}>{s.note}</div>}

      {/* actions */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center' }}>
        <button onClick={onRegister} disabled={isRegistered} style={{
          fontSize: 12, fontWeight: 700, cursor: isRegistered ? 'default' : 'pointer',
          border: `1px solid ${isRegistered ? T.green : T.gold}`, borderRadius: 8, padding: '6px 12px',
          background: isRegistered ? T.greenBg : T.goldBg, color: isRegistered ? T.green : '#92400E',
        }}>{isRegistered ? '登録済' : '+ トレーニング登録'}</button>
        <button onClick={onToggle} style={{
          marginLeft: 'auto', fontSize: 12, fontWeight: 700, cursor: 'pointer',
          border: `1px solid ${isLearned ? T.gold : T.border}`, borderRadius: 8, padding: '6px 14px',
          background: isLearned ? T.goldBg : T.surface, color: isLearned ? '#92400E' : T.textSub,
        }}>{isLearned ? '覚えた' : '未'}</button>
      </div>
    </div>
  );
}

function MINI_LINK(color: string): CSSProperties {
  return {
    fontSize: 11, fontWeight: 600, color, textDecoration: 'none',
    border: `1px solid ${color}40`, borderRadius: 6, padding: '2px 8px', whiteSpace: 'nowrap',
  };
}
