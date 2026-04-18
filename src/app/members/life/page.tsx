'use client';

import { useState, useEffect, useCallback, useRef, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

interface Recording {
  id: string;
  japanese: string;
  english_short: string | null;
  english_attitude: string | null;
  english_full: string | null;
  english_monologue: string | null;
  context: string | null;
  literal: string | null;
  category: string | null;
  status: 'pending' | 'converted';
  created_at: string;
  converted_at: string | null;
  member_slug: string | null;
  member_name: string | null;
}

const SLUG_KEY = 'tonio-life-member-slug';
const NAME_KEY = 'tonio-life-member-name';

const SERIF = "'Noto Serif JP', 'Source Serif Pro', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const GOLD = '#D4AF37';
const INK = '#1C1917';
const TEXT = '#44403C';
const MUTE = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const BG = '#FAFAF9';

function dedupAdjacentRepeats(text: string): string {
  if (!text || text.length < 6) return text;
  let result = text;
  let prev = '';
  let guard = 0;
  while (result !== prev && guard++ < 30) {
    prev = result;
    outer: for (let pos = 0; pos < result.length; pos++) {
      const maxLen = Math.floor((result.length - pos) / 2);
      for (let len = maxLen; len >= 3; len--) {
        if (result.slice(pos, pos + len) === result.slice(pos + len, pos + 2 * len)) {
          result = result.slice(0, pos + len) + result.slice(pos + 2 * len);
          break outer;
        }
      }
    }
  }
  return result;
}

function useMembersPWA() {
  useEffect(() => {
    const existing = document.querySelector('link[rel="manifest"]');
    if (existing) existing.remove();
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = '/members-app.json';
    document.head.appendChild(link);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/members-sw.js', { scope: '/members' }).catch(() => {});
    }
    return () => { link.remove(); };
  }, []);
}

function LifeMemberInner() {
  const searchParams = useSearchParams();
  const [slug, setSlug] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [nameInput, setNameInput] = useState<string>('');
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [interim, setInterim] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const recognitionRef = useRef<any>(null);
  const sessionFinalsRef = useRef<string[]>([]);
  const priorSessionsTextRef = useRef<string>('');
  const userStoppedRef = useRef<boolean>(false);

  useMembersPWA();

  useEffect(() => {
    const urlSlug = searchParams?.get('m');
    const saved = typeof window !== 'undefined' ? localStorage.getItem(SLUG_KEY) : null;
    const resolved = urlSlug || saved;
    if (resolved) {
      setSlug(resolved);
      try { localStorage.setItem(SLUG_KEY, resolved); } catch { /* */ }
    }
    try {
      const savedName = localStorage.getItem(NAME_KEY);
      if (savedName) setName(savedName);
    } catch { /* */ }
  }, [searchParams]);

  const fetchMine = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/life-recordings?member=${encodeURIComponent(slug)}`);
      const data = await res.json();
      if (data.success) setRecordings(data.recordings || []);
    } catch { /* */ }
    setLoading(false);
  }, [slug]);

  useEffect(() => { fetchMine(); }, [fetchMine]);

  const saveName = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setName(trimmed);
    try { localStorage.setItem(NAME_KEY, trimmed); } catch { /* */ }
  };

  const submitRecording = async (text: string) => {
    if (!text.trim() || !slug) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/life-recordings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          japanese: text.trim(),
          member_slug: slug,
          member_name: name || null,
        }),
      });
      const data = await res.json();
      if (data.success && data.recording) {
        setRecordings(prev => [data.recording, ...prev]);
      }
    } catch { /* */ }
    setSubmitting(false);
  };

  const startRecording = () => {
    if (typeof window === 'undefined') return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert('このブラウザは音声認識に対応していません'); return; }
    sessionFinalsRef.current = [];
    priorSessionsTextRef.current = '';
    userStoppedRef.current = false;

    const startSession = () => {
      const recognition = new SR();
      recognition.lang = 'ja-JP';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = true;
      recognition.onresult = (event: any) => {
        let interimText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            sessionFinalsRef.current[i] = result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }
        setInterim(interimText);
      };
      recognition.onerror = (e: any) => {
        const fatal = e?.error === 'not-allowed' || e?.error === 'service-not-allowed' || e?.error === 'audio-capture';
        if (fatal) {
          userStoppedRef.current = true;
          sessionFinalsRef.current = [];
          priorSessionsTextRef.current = '';
          setIsRecording(false);
          setInterim('');
        }
      };
      recognition.onend = () => {
        const sessionText = sessionFinalsRef.current.join('');
        if (!userStoppedRef.current) {
          try {
            sessionFinalsRef.current = [];
            startSession();
            priorSessionsTextRef.current += sessionText;
            return;
          } catch { /* fallthrough */ }
        }
        const raw = (priorSessionsTextRef.current + sessionText).trim();
        const fullText = dedupAdjacentRepeats(raw);
        priorSessionsTextRef.current = '';
        sessionFinalsRef.current = [];
        if (fullText) submitRecording(fullText);
        setIsRecording(false);
        setInterim('');
      };
      recognitionRef.current = recognition;
      recognition.start();
    };

    startSession();
    setIsRecording(true);
  };

  const stopRecording = () => {
    userStoppedRef.current = true;
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch { /* */ }
    }
  };

  const today = new Date().toISOString().slice(0, 10);
  const todayRecordings = useMemo(
    () => recordings.filter(r => r.created_at.startsWith(today)),
    [recordings, today]
  );
  const convertedRecordings = useMemo(
    () => recordings.filter(r => r.status === 'converted'),
    [recordings]
  );

  if (!slug) {
    return (
      <div style={{ minHeight: '100vh', background: BG, fontFamily: SANS, color: TEXT, padding: '80px 24px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: 520, width: '100%' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.3em', color: FAINT, fontWeight: 500, marginBottom: 32 }}>
            TONIO LAB / MEMBERS / LIFE
          </div>
          <h1 style={{ fontFamily: SERIF, fontSize: 32, lineHeight: 1.3, color: INK, margin: 0, marginBottom: 16, fontWeight: 400 }}>
            メンバー用のリンクから入ってください
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: TEXT, margin: 0, marginBottom: 24 }}>
            このページは、とにおからLINEで配られた専用URL（<code style={{ fontFamily: 'monospace', fontSize: 13, color: INK }}>?m=あなたの名前</code>付き）から開いてください。
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: MUTE, margin: 0 }}>
            URL が分からない場合はとにおに聞いてください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: SANS, color: TEXT }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${LINE}`, padding: '20px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.3em', color: FAINT, fontWeight: 500 }}>
            LIFE
          </div>
          <div style={{ fontSize: 12, color: MUTE }}>
            {name ? `${name} — ` : ''}@{slug}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px 120px' }}>
        {/* Name prompt (first visit) */}
        {!name && (
          <div style={{ marginBottom: 32, padding: 20, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, color: INK, marginBottom: 8 }}>
              はじめまして。お名前を教えてください
            </div>
            <div style={{ fontSize: 13, color: MUTE, marginBottom: 16 }}>
              記事で紹介するとき、この名前でクレジットします。
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="例: 中田"
                style={{ flex: 1, padding: '10px 14px', border: `1px solid ${LINE}`, borderRadius: 4, fontSize: 15, fontFamily: SANS }}
              />
              <button
                onClick={saveName}
                disabled={!nameInput.trim()}
                style={{ padding: '10px 20px', background: INK, color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: nameInput.trim() ? 'pointer' : 'not-allowed', opacity: nameInput.trim() ? 1 : 0.4 }}
              >
                決定
              </button>
            </div>
          </div>
        )}

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontFamily: SERIF, fontSize: 36, lineHeight: 1.3, color: INK, margin: 0, marginBottom: 12, fontWeight: 400 }}>
            今日の一言を録音する
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: TEXT, margin: 0 }}>
            日本語で喋ってください。とにおが翌日までに英語化して、<a href="/membership" style={{ color: INK, textDecoration: 'underline' }}>メンバーシップ</a>の語録に載せます。
          </p>
        </div>

        {/* Record button */}
        <div style={{ marginBottom: 40, padding: 32, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4, textAlign: 'center' }}>
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={submitting}
            style={{
              width: 140, height: 140, borderRadius: '50%',
              background: isRecording ? '#DC2626' : INK,
              color: '#fff', border: 'none',
              fontSize: 15, fontWeight: 500, letterSpacing: '0.1em',
              cursor: submitting ? 'not-allowed' : 'pointer',
              boxShadow: isRecording ? '0 0 0 8px rgba(220, 38, 38, 0.15)' : '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'all 0.2s',
              opacity: submitting ? 0.5 : 1,
            }}
          >
            {isRecording ? 'STOP' : submitting ? '...' : 'REC'}
          </button>
          <div style={{ marginTop: 20, fontSize: 13, color: MUTE, minHeight: 40 }}>
            {isRecording ? (interim || '聞いてます...') : submitting ? '送信中...' : 'ボタンを押して話してください'}
          </div>
        </div>

        {/* Today's recordings */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: MUTE, fontWeight: 500, marginBottom: 16 }}>
            TODAY — {today}
          </div>
          {loading ? (
            <div style={{ fontSize: 14, color: FAINT }}>読み込み中...</div>
          ) : todayRecordings.length === 0 ? (
            <div style={{ fontSize: 14, color: FAINT, padding: '20px 0' }}>
              まだ今日の録音はありません。
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {todayRecordings.map(r => (
                <div key={r.id} style={{ padding: 16, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4 }}>
                  <div style={{ fontSize: 15, lineHeight: 1.7, color: INK, marginBottom: 8 }}>
                    {r.japanese}
                  </div>
                  {r.status === 'converted' && r.english_attitude ? (
                    <div style={{ fontSize: 14, lineHeight: 1.7, color: TEXT, paddingLeft: 12, borderLeft: `2px solid ${GOLD}`, marginTop: 12 }}>
                      {r.english_attitude}
                    </div>
                  ) : (
                    <div style={{ fontSize: 11, color: FAINT, letterSpacing: '0.15em', marginTop: 6 }}>
                      PENDING — 英語化待ち
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Converted archive */}
        {convertedRecordings.length > 0 && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: MUTE, fontWeight: 500, marginBottom: 16 }}>
              YOUR CONVERTED — {convertedRecordings.length}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {convertedRecordings.slice(0, 10).map(r => (
                <div key={r.id} style={{ padding: '12px 0', borderBottom: `1px solid ${LINE}` }}>
                  <div style={{ fontSize: 13, color: MUTE, marginBottom: 4 }}>
                    {r.created_at.slice(0, 10)} · {r.japanese}
                  </div>
                  <div style={{ fontSize: 14, color: INK }}>
                    {r.english_attitude}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LifeMemberPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: BG }} />}>
      <LifeMemberInner />
    </Suspense>
  );
}
