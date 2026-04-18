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
    link.href = '/membership-life-app.json';
    document.head.appendChild(link);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/membership-life-sw.js', { scope: '/membership/life' }).catch(() => {});
    }
    return () => { link.remove(); };
  }, []);
}

type Platform = {
  isIOS: boolean;
  isAndroid: boolean;
  isInApp: boolean;
  inAppName: string | null;
  isStandalone: boolean;
  ready: boolean;
};

function usePlatform(): Platform {
  const [state, setState] = useState<Platform>({
    isIOS: false, isAndroid: false, isInApp: false, inAppName: null, isStandalone: false, ready: false,
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/.test(ua);
    let inAppName: string | null = null;
    if (/Line\//i.test(ua)) inAppName = 'LINE';
    else if (/FBAN|FBAV/.test(ua)) inAppName = 'Facebook';
    else if (/Instagram/.test(ua)) inAppName = 'Instagram';
    else if (/Twitter/.test(ua)) inAppName = 'X (Twitter)';
    const isInApp = inAppName !== null;
    const isStandalone =
      window.matchMedia?.('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;
    setState({ isIOS, isAndroid, isInApp, inAppName, isStandalone, ready: true });
  }, []);
  return state;
}

function useInstallPrompt() {
  const [deferred, setDeferred] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setDeferred(null);
      setInstalled(true);
    };
    window.addEventListener('beforeinstallprompt', onPrompt as any);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt as any);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);
  const trigger = useCallback(async () => {
    if (!deferred) return false;
    try {
      deferred.prompt();
      const choice = await deferred.userChoice;
      setDeferred(null);
      return choice?.outcome === 'accepted';
    } catch {
      return false;
    }
  }, [deferred]);
  return { canPrompt: !!deferred, installed, trigger };
}

function InstallBanner() {
  const platform = usePlatform();
  const { canPrompt, trigger } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(false);

  if (!platform.ready) return null;
  if (platform.isStandalone) return null;
  if (dismissed) return null;

  const BoxBase: React.CSSProperties = {
    marginBottom: 24,
    padding: 20,
    background: '#FFFBEB',
    border: `1px solid ${GOLD}`,
    borderRadius: 4,
    position: 'relative',
  };
  const Heading: React.CSSProperties = {
    fontFamily: SERIF, fontSize: 17, color: INK, marginBottom: 8, fontWeight: 500,
  };
  const Body: React.CSSProperties = {
    fontSize: 14, lineHeight: 1.8, color: TEXT, margin: 0,
  };
  const Step: React.CSSProperties = {
    fontSize: 13, lineHeight: 1.8, color: TEXT, padding: '6px 0',
    borderBottom: `1px dashed ${LINE}`,
  };
  const CloseBtn = (
    <button
      onClick={() => setDismissed(true)}
      aria-label="閉じる"
      style={{ position: 'absolute', top: 8, right: 12, background: 'none', border: 'none', color: MUTE, fontSize: 18, cursor: 'pointer', lineHeight: 1 }}
    >
      ×
    </button>
  );

  if (platform.isInApp) {
    return (
      <div style={BoxBase}>
        {CloseBtn}
        <div style={Heading}>
          {platform.inAppName}の中では使えません
        </div>
        <p style={Body}>
          右上のメニューから「{platform.isIOS ? 'Safari' : '他のブラウザ'}で開く」を選んでください。そこからホーム画面にインストールできます。
        </p>
      </div>
    );
  }

  if (platform.isIOS) {
    return (
      <div style={BoxBase}>
        {CloseBtn}
        <div style={Heading}>
          ホーム画面に追加してアプリっぽく使う
        </div>
        <div style={{ ...Body, marginBottom: 12 }}>
          毎回URLを踏まなくて済みます。3秒で終わります。
        </div>
        <div>
          <div style={Step}>
            1. 画面下の <span style={{ fontWeight: 600 }}>共有ボタン</span>（□に↑のアイコン）をタップ
          </div>
          <div style={Step}>
            2. メニューを下にスクロールして <span style={{ fontWeight: 600 }}>「ホーム画面に追加」</span> をタップ
          </div>
          <div style={{ ...Step, borderBottom: 'none' }}>
            3. 右上の <span style={{ fontWeight: 600 }}>「追加」</span> をタップ
          </div>
        </div>
      </div>
    );
  }

  if (platform.isAndroid && canPrompt) {
    return (
      <div style={BoxBase}>
        {CloseBtn}
        <div style={Heading}>
          ホーム画面に追加してアプリっぽく使う
        </div>
        <p style={{ ...Body, marginBottom: 14 }}>
          毎回URLを踏まなくて済みます。一発で終わります。
        </p>
        <button
          onClick={async () => { const ok = await trigger(); if (ok) setDismissed(true); }}
          style={{ padding: '10px 20px', background: INK, color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer', letterSpacing: '0.05em' }}
        >
          ホーム画面に追加
        </button>
      </div>
    );
  }

  if (platform.isAndroid) {
    return (
      <div style={BoxBase}>
        {CloseBtn}
        <div style={Heading}>
          ホーム画面に追加してアプリっぽく使う
        </div>
        <p style={Body}>
          ブラウザ右上のメニュー（︙）から <span style={{ fontWeight: 600 }}>「アプリをインストール」</span> または <span style={{ fontWeight: 600 }}>「ホーム画面に追加」</span> をタップしてください。
        </p>
      </div>
    );
  }

  return null;
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
            TONIO LAB / MEMBERSHIP / LIFE
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

        <InstallBanner />

        {/* Hero */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: SERIF, fontSize: 30, lineHeight: 1.4, color: INK, margin: 0, marginBottom: 16, fontWeight: 400 }}>
            日本語で残した一言が、<br />翌朝、英語になって戻ってくる。
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: TEXT, margin: 0 }}>
            街で「これ、英語でなんて言うんだろう」と思った瞬間を、音声で残す。とにおが翌朝までに英語化する。DeepLでもChatGPTでもなく、ネイティブが同じ場面で実際に使う一言に。
          </p>
        </div>

        {/* Example showcase */}
        <div style={{ marginBottom: 32, padding: 24, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: FAINT, fontWeight: 500, marginBottom: 14 }}>
            例えば、こう
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 22, color: INK, marginBottom: 14 }}>
            「小春日和」
          </div>
          <div style={{ paddingLeft: 14, borderLeft: `2px solid ${GOLD}`, fontSize: 16, color: TEXT, lineHeight: 1.7, marginBottom: 14 }}>
            One of those warm days that sneak in when it should be cold.
          </div>
          <div style={{ fontSize: 13, color: MUTE, lineHeight: 1.8 }}>
            季節がズレた温かさ。直訳はムリ。こういう"感覚の日本語"は、辞書にも翻訳ツールにもない。
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: MUTE, fontWeight: 500, marginBottom: 12 }}>
            HOW IT WORKS
          </div>
          {[
            { n: '01', t: '今日、日本語で録音する' },
            { n: '02', t: '翌朝までに、金色の英語が付く' },
            { n: '03', t: '自分の言葉が、英語の語録として残る' },
          ].map((s, i, arr) => (
            <div key={s.n} style={{ padding: '14px 0', borderBottom: i === arr.length - 1 ? 'none' : `1px solid ${LINE}`, display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <div style={{ fontSize: 11, color: GOLD, letterSpacing: '0.2em', fontWeight: 500, flexShrink: 0 }}>
                {s.n}
              </div>
              <div style={{ fontSize: 15, color: INK, lineHeight: 1.6 }}>
                {s.t}
              </div>
            </div>
          ))}
        </div>

        {/* Record button */}
        <div style={{ marginBottom: 16, padding: 32, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4, textAlign: 'center' }}>
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
          <div style={{ marginTop: 20, fontSize: 13, color: MUTE, minHeight: 40, lineHeight: 1.6 }}>
            {isRecording
              ? (interim || '聞いてます...')
              : submitting
                ? '送信中...'
                : '1単語でも、1フレーズでも、1シーンでもいい'}
          </div>
        </div>

        {/* Prompt hints */}
        {!isRecording && !submitting && (
          <div style={{ marginBottom: 40, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {['月極駐車場', 'ピンキリ', 'ないがしろにする', '自転車は降りてください', '車のドア少し開けて涼しい風'].map(s => (
              <span key={s} style={{ fontSize: 11, padding: '5px 11px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 999, color: MUTE }}>
                {s}
              </span>
            ))}
          </div>
        )}

        {/* Today's recordings */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: MUTE, fontWeight: 500, marginBottom: 16 }}>
            TODAY — {today}
          </div>
          {loading ? (
            <div style={{ fontSize: 14, color: FAINT }}>読み込み中...</div>
          ) : todayRecordings.length === 0 ? (
            <div style={{ padding: '16px 0', fontSize: 13, color: MUTE, lineHeight: 1.9 }}>
              今日はまだ録音なし。浮かんだ瞬間にボタン押せばOK。<br />
              感覚語（小春日和）も、シーン（車のドア開けて涼しい風）も、動詞（ないがしろにする）も、なんでも。
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
                    <div style={{ marginTop: 10, fontSize: 12, color: MUTE, lineHeight: 1.6 }}>
                      <span style={{ color: FAINT, letterSpacing: '0.15em', fontSize: 11, marginRight: 10 }}>
                        PENDING
                      </span>
                      とにおが明日の朝までに英語化します
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

        {/* Why this exists */}
        <details style={{ marginTop: 64, padding: '20px 24px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4 }}>
          <summary style={{ fontFamily: SERIF, fontSize: 16, color: INK, cursor: 'pointer', outline: 'none' }}>
            なぜこれを作ったのか
          </summary>
          <div style={{ marginTop: 18, fontSize: 14, lineHeight: 1.95, color: TEXT }}>
            <p style={{ margin: '0 0 14px' }}>
              英語学習アプリの例文は、全部他人の人生。「She went to the market」を何回読んでも、自分が言いたい場面がこない。
            </p>
            <p style={{ margin: '0 0 14px' }}>
              自分の日本語から始めれば、英語を見た瞬間「あ、これ俺が言いたかったやつだ」になる。身体に入る順番が逆だから。
            </p>
            <p style={{ margin: '0 0 14px' }}>
              翻訳ツールは単語を正確に変換するけど、ネイティブが同じ場面で実際に使う一言は出してこない。「小春日和」を「Indian summer」と直訳するだけじゃ、あの感覚は伝わらない。
            </p>
            <p style={{ margin: 0 }}>
              だから、人力で、とにおが、一つ一つ考える。5人分なら回せる。だからメンバー限定。
            </p>
          </div>
        </details>

        {/* Footer */}
        <div style={{ marginTop: 48, fontSize: 12, color: FAINT, textAlign: 'center', lineHeight: 1.8 }}>
          詰まったら、とにおにLINEで。スクショあるとベスト。
        </div>
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
