'use client';

import { useState, useEffect, useCallback, useRef, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LIFE_ROSTER } from '@/data/life-members';

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
const SELF_BG = '#FFFBEB';

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

function getJSTDateString(d: Date = new Date()): string {
  const jst = new Date(d.getTime() + 9 * 60 * 60 * 1000);
  return jst.toISOString().slice(0, 10);
}

function getTodayJST(): string {
  return getJSTDateString();
}

function getYesterdayJST(): string {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() - 1);
  return getJSTDateString(now);
}

function formatJSTDateJP(dateStr: string): string {
  const parts = dateStr.split('-').map(Number);
  if (parts.length < 3) return dateStr;
  const [y, m, d] = parts;
  const date = new Date(Date.UTC(y, m - 1, d));
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const dow = days[date.getUTCDay()];
  return `${m}月${d}日（${dow}）`;
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
    background: SELF_BG,
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

type RosterRow = {
  slug: string | null;
  displayName: string;
  isAuthor: boolean;
  isSelf: boolean;
  todayRec?: Recording;
};

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
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [showMyPage, setShowMyPage] = useState(false);

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

  const fetchAll = useCallback(async () => {
    if (!slug) return;
    setLoading(true);
    try {
      const res = await fetch('/api/life-recordings');
      const data = await res.json();
      if (data.success) setRecordings(data.recordings || []);
    } catch { /* */ }
    setLoading(false);
  }, [slug]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

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
        setJustSubmitted(true);
        setTimeout(() => setJustSubmitted(false), 4000);
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

  const today = getTodayJST();
  const yesterday = getYesterdayJST();
  const todayJP = formatJSTDateJP(today);
  const yesterdayJP = formatJSTDateJP(yesterday);

  const myRecordings = useMemo(
    () => recordings.filter(r => r.member_slug === slug),
    [recordings, slug]
  );

  const todayRecs = useMemo(
    () => recordings.filter(r => r.created_at.startsWith(today)),
    [recordings, today]
  );

  const yesterdayConverted = useMemo(
    () => recordings
      .filter(r => r.created_at.startsWith(yesterday) && r.status === 'converted')
      .sort((a, b) => a.created_at.localeCompare(b.created_at)),
    [recordings, yesterday]
  );

  const rosterRows = useMemo<RosterRow[]>(() => {
    return LIFE_ROSTER.map(m => {
      const namedRec = recordings.find(r => r.member_slug === m.slug && r.member_name);
      let displayName = namedRec?.member_name || m.defaultName;
      if (m.slug === slug && name) displayName = name;
      const todayRec = todayRecs.find(r => r.member_slug === m.slug);
      return {
        slug: m.slug,
        displayName,
        isAuthor: m.isAuthor,
        isSelf: m.slug === slug,
        todayRec,
      };
    });
  }, [recordings, todayRecs, slug, name]);

  const orderedRoster = useMemo(() => {
    const self = rosterRows.filter(r => r.isSelf);
    const others = rosterRows.filter(r => !r.isSelf);
    return [...self, ...others];
  }, [rosterRows]);

  const filledToday = todayRecs.length;
  const isNewcomer = !loading && myRecordings.length === 0;
  const hasRecordedToday = rosterRows.some(r => r.isSelf && r.todayRec);

  const bookPageCount = recordings.length;
  const sortedByDate = useMemo(
    () => [...recordings].sort((a, b) => a.created_at.localeCompare(b.created_at)),
    [recordings]
  );
  const firstEntry = sortedByDate[0];
  const latestEntry = sortedByDate[sortedByDate.length - 1];

  const mySorted = useMemo(
    () => [...myRecordings].sort((a, b) => b.created_at.localeCompare(a.created_at)),
    [myRecordings]
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

  const selfDisplayName = rosterRows.find(r => r.isSelf)?.displayName || name || '—';

  return (
    <div style={{ minHeight: '100vh', background: BG, fontFamily: SANS, color: TEXT }}>
      {/* Book header */}
      <div style={{ borderBottom: `1px solid ${LINE}`, padding: '16px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', color: FAINT, fontWeight: 500, flexShrink: 0 }}>
            LIFE
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 12, color: MUTE, letterSpacing: '0.15em', textAlign: 'center', flex: 1 }}>
            VOL.1 · 2026
          </div>
          <div style={{ fontSize: 11, color: MUTE, flexShrink: 0, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {selfDisplayName} · @{slug}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '28px 24px 120px' }}>
        {/* Name prompt (first visit) */}
        {!name && (
          <div style={{ marginBottom: 32, padding: 20, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, color: INK, marginBottom: 8 }}>
              はじめまして。お名前を教えてください
            </div>
            <div style={{ fontSize: 13, color: MUTE, marginBottom: 16 }}>
              この本に著者として載るときの名前。後で変えられる。
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

        {/* Hero — adaptive */}
        {isNewcomer ? (
          <div style={{ marginBottom: 40 }}>
            <h1 style={{ fontFamily: SERIF, fontSize: 30, lineHeight: 1.4, color: INK, margin: 0, marginBottom: 18, fontWeight: 400 }}>
              6人で、<br />1冊の本を書いている。
            </h1>
            <p style={{ fontSize: 15, lineHeight: 1.95, color: TEXT, margin: 0, marginBottom: 16 }}>
              1人1日1行。日本語で残した一言を、とにおが翌朝までに英語化する。5人 + とにお = 6人。この本の著者は、この6人だけ。
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: MUTE, margin: 0 }}>
              DeepLでもChatGPTでもない。ネイティブが同じ場面で実際に使う一言に、人力で変える。100人には配れない。5人だから回る。
            </p>

            {/* Example showcase (newcomer only) */}
            <div style={{ marginTop: 28, padding: 24, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.25em', color: FAINT, fontWeight: 500, marginBottom: 14 }}>
                例えば
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 22, color: INK, marginBottom: 14 }}>
                小春日和
              </div>
              <div style={{ paddingLeft: 14, borderLeft: `2px solid ${GOLD}`, fontSize: 16, color: TEXT, lineHeight: 1.7, marginBottom: 14 }}>
                One of those warm days that sneak in when it should be cold.
              </div>
              <div style={{ fontSize: 13, color: MUTE, lineHeight: 1.8 }}>
                季節がズレた温かさ。直訳はムリ。こういう感覚の日本語は、辞書にも翻訳ツールにもない。人力だけが出せる。
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginBottom: 32 }}>
            <h1 style={{ fontFamily: SERIF, fontSize: 24, lineHeight: 1.45, color: INK, margin: 0, fontWeight: 400 }}>
              {hasRecordedToday
                ? '書いた。明朝、金色がつく。'
                : '今日、6人で1ページ書こう。'}
            </h1>
          </div>
        )}

        {/* Today's Page — shared 6-row view */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
            <div style={{ fontFamily: SERIF, fontSize: 16, color: INK }}>
              {todayJP}のページ
            </div>
            <div style={{ fontSize: 11, color: MUTE, letterSpacing: '0.15em', fontWeight: 500 }}>
              {filledToday} / 6
            </div>
          </div>
          {loading ? (
            <div style={{ fontSize: 13, color: FAINT, padding: '16px 0' }}>読み込み中...</div>
          ) : (
            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4, overflow: 'hidden' }}>
              {orderedRoster.map((row, i) => {
                const rec = row.todayRec;
                const rowBg = row.isSelf ? SELF_BG : '#fff';
                const rowBorder = i === orderedRoster.length - 1 ? 'none' : `1px solid ${LINE}`;
                const leftAccent = row.isSelf ? `3px solid ${GOLD}` : '3px solid transparent';
                return (
                  <div
                    key={(row.slug || 'author') + '-' + i}
                    style={{
                      padding: '14px 16px 14px 13px',
                      borderBottom: rowBorder,
                      borderLeft: leftAccent,
                      background: rowBg,
                      display: 'flex',
                      gap: 12,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ flexShrink: 0, width: 14, marginTop: 3, textAlign: 'center' }}>
                      {rec
                        ? <span style={{ color: GOLD, fontSize: 12 }}>●</span>
                        : <span style={{ color: FAINT, fontSize: 12 }}>○</span>}
                    </div>
                    <div style={{ flexShrink: 0, minWidth: 72, fontSize: 12, color: row.isSelf ? INK : TEXT, fontWeight: row.isSelf ? 500 : 400, marginTop: 2 }}>
                      {row.displayName}{row.isAuthor ? <span style={{ color: GOLD, marginLeft: 4, fontSize: 10 }}>·編</span> : null}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      {rec ? (
                        <>
                          <div style={{ fontSize: 14, color: INK, lineHeight: 1.6, marginBottom: rec.status === 'converted' && rec.english_attitude ? 6 : 0, overflowWrap: 'anywhere' }}>
                            {rec.japanese}
                          </div>
                          {rec.status === 'converted' && rec.english_attitude ? (
                            <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.65, paddingLeft: 10, borderLeft: `2px solid ${GOLD}`, marginTop: 6 }}>
                              {rec.english_attitude}
                            </div>
                          ) : (
                            <div style={{ fontSize: 11, color: FAINT, letterSpacing: '0.15em', marginTop: 4 }}>
                              PENDING
                            </div>
                          )}
                        </>
                      ) : (
                        <div style={{ fontSize: 13, color: FAINT, lineHeight: 1.6 }}>
                          {row.isSelf ? 'まだ書いてない' : '—'}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* REC */}
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
          <div style={{ marginTop: 20, fontSize: 13, color: justSubmitted ? GOLD : MUTE, minHeight: 40, lineHeight: 1.6, transition: 'color 0.3s' }}>
            {isRecording
              ? (interim || '聞いてます...')
              : submitting
                ? '書いてる...'
                : justSubmitted
                  ? '書いた。明朝、金色がつく。'
                  : hasRecordedToday
                    ? '今日の1行、もう1つ足してもいい'
                    : '今日のあんたの1行を書く'}
          </div>
        </div>

        {/* Prompt hints — only when idle and haven't recorded today */}
        {!isRecording && !submitting && !hasRecordedToday && !justSubmitted && (
          <div style={{ marginBottom: 40, display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
            {['月極駐車場', 'ピンキリ', 'ないがしろにする', '自転車は降りてください', '車のドア少し開けて涼しい風'].map(s => (
              <span key={s} style={{ fontSize: 11, padding: '5px 11px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 999, color: MUTE }}>
                {s}
              </span>
            ))}
          </div>
        )}
        {(hasRecordedToday || justSubmitted) && <div style={{ marginBottom: 40 }} />}

        {/* Yesterday's Harvest — unified card */}
        {yesterdayConverted.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div style={{ fontFamily: SERIF, fontSize: 15, color: INK }}>
                {yesterdayJP}のページ
              </div>
              <div style={{ fontSize: 10, letterSpacing: '0.25em', color: GOLD, fontWeight: 500 }}>
                YESTERDAY
              </div>
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4, padding: '4px 20px' }}>
              {yesterdayConverted.map((r, i) => {
                const row = rosterRows.find(x => x.slug === r.member_slug);
                const who = row?.displayName || r.member_name || '—';
                const convertedAt = r.converted_at ? r.converted_at.slice(11, 16) : null;
                return (
                  <div key={r.id} style={{ padding: '18px 0', borderTop: i === 0 ? 'none' : `1px dashed ${LINE}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                      <div style={{ fontSize: 12, color: TEXT, fontWeight: 500 }}>
                        {who}
                      </div>
                      {convertedAt && (
                        <div style={{ fontSize: 10, color: FAINT, letterSpacing: '0.1em' }}>
                          converted · {convertedAt}
                        </div>
                      )}
                    </div>
                    <div style={{ fontSize: 15, color: INK, lineHeight: 1.65, marginBottom: 8, overflowWrap: 'anywhere' }}>
                      {r.japanese}
                    </div>
                    <div style={{ fontSize: 14, color: TEXT, lineHeight: 1.7, paddingLeft: 12, borderLeft: `2px solid ${GOLD}` }}>
                      {r.english_attitude}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Story So Far */}
        {bookPageCount > 0 && !isNewcomer && (
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.25em', color: MUTE, fontWeight: 500, marginBottom: 14 }}>
              STORY SO FAR
            </div>
            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4, padding: 20 }}>
              <div style={{ fontFamily: SERIF, fontSize: 15, color: INK, lineHeight: 1.8, marginBottom: 14 }}>
                この本は今、<span style={{ color: GOLD, fontWeight: 500 }}>{bookPageCount}</span> 行目。
              </div>
              {firstEntry && (
                <div style={{ fontSize: 12, color: MUTE, lineHeight: 1.8, marginBottom: 6 }}>
                  最初の1行 · {firstEntry.created_at.slice(0, 10)} · {firstEntry.member_name || '—'} 「{firstEntry.japanese.slice(0, 30)}{firstEntry.japanese.length > 30 ? '…' : ''}」
                </div>
              )}
              {latestEntry && latestEntry.id !== firstEntry?.id && (
                <div style={{ fontSize: 12, color: MUTE, lineHeight: 1.8 }}>
                  最新の1行 · {latestEntry.created_at.slice(0, 10)} · {latestEntry.member_name || '—'} 「{latestEntry.japanese.slice(0, 30)}{latestEntry.japanese.length > 30 ? '…' : ''}」
                </div>
              )}
            </div>
          </div>
        )}

        {/* Your Page — collapsed */}
        {myRecordings.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <button
              onClick={() => setShowMyPage(v => !v)}
              style={{
                width: '100%', textAlign: 'left',
                padding: '14px 16px',
                background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4,
                fontFamily: SANS, fontSize: 13, color: INK,
                cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <span>
                <span style={{ fontFamily: SERIF, fontSize: 15, marginRight: 10 }}>自分のページ</span>
                <span style={{ color: MUTE, fontSize: 12 }}>{myRecordings.length} 行</span>
              </span>
              <span style={{ color: FAINT, fontSize: 14 }}>{showMyPage ? '閉じる' : '開く'}</span>
            </button>
            {showMyPage && (
              <div style={{ marginTop: 2, background: '#fff', border: `1px solid ${LINE}`, borderTop: 'none', borderRadius: '0 0 4px 4px', padding: '4px 16px' }}>
                {mySorted.slice(0, 30).map((r, i) => (
                  <div key={r.id} style={{ padding: '12px 0', borderTop: i === 0 ? 'none' : `1px dashed ${LINE}` }}>
                    <div style={{ fontSize: 11, color: FAINT, marginBottom: 4, letterSpacing: '0.05em' }}>
                      {r.created_at.slice(0, 10)}
                    </div>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.6, marginBottom: 6, overflowWrap: 'anywhere' }}>
                      {r.japanese}
                    </div>
                    {r.status === 'converted' && r.english_attitude ? (
                      <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.65, paddingLeft: 10, borderLeft: `2px solid ${GOLD}` }}>
                        {r.english_attitude}
                      </div>
                    ) : (
                      <div style={{ fontSize: 11, color: FAINT, letterSpacing: '0.15em' }}>
                        PENDING · 明朝までに金色がつく
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Why this exists */}
        <details style={{ marginTop: 40, padding: '20px 24px', background: '#fff', border: `1px solid ${LINE}`, borderRadius: 4 }}>
          <summary style={{ fontFamily: SERIF, fontSize: 16, color: INK, cursor: 'pointer', outline: 'none' }}>
            なぜこれを作ったのか
          </summary>
          <div style={{ marginTop: 18, fontSize: 14, lineHeight: 1.95, color: TEXT }}>
            <p style={{ margin: '0 0 14px' }}>
              英語学習アプリの例文は、全部他人の人生。She went to the market を何回読んでも、自分が言いたい場面がこない。
            </p>
            <p style={{ margin: '0 0 14px' }}>
              自分の日本語から始めれば、英語を見た瞬間、あ、これ俺が言いたかったやつだ、になる。身体に入る順番が逆だから。
            </p>
            <p style={{ margin: '0 0 14px' }}>
              翻訳ツールは単語を正確に変換するけど、ネイティブが同じ場面で実際に使う一言は出してこない。小春日和を Indian summer と直訳するだけじゃ、あの感覚は伝わらない。
            </p>
            <p style={{ margin: '0 0 14px' }}>
              だから、人力で、とにおが、一つ一つ考える。1人なら続かない。100人なら回せない。5人なら回せる。6人目は俺。
            </p>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 15, color: INK }}>
              これはお前らに作ってあげる本じゃない。お前らと俺で書く本。
            </p>
          </div>
        </details>

        {/* Footer */}
        <div style={{ marginTop: 40, fontSize: 12, color: FAINT, textAlign: 'center', lineHeight: 1.8 }}>
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
