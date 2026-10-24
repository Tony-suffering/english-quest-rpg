'use client';

// LISTEN — Excel に入れていない音声(=聞き流し教材)のプレーヤー。
//
// 山の分け方: english.xlsx に書いた文 = 覚えるやつ → training。
//             Excel に無い音声        = 聞き流し   → ここ。
//             取り込みは scripts/import-listening-clips.mjs (Excel を除外して拾う)。
//
// 見た目は /english/training (TrainingClient) の語彙をそのまま使う:
//   - 上に統計タイル (大きい等幅数字 + 3px字間の極小ラベル、1px の仕切り)
//   - 真ん中に大きい英文 (中央寄せ・20-32px・weight 600)
//   - 下に枠線だけの小さいボタン列 (5px 10px / radius 5 / #ddd / #888)
//   - 主役の数字は金のグラデーション (#F6C85F → #D4AF37 → #B8860B)
//
// 連続再生を詰めるために、次の1本を隠し <audio> で先読みしてある。
// 曲間で R2 を取りに行くと必ず無音が入るので、それを消すのが目的。

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Clip { slug: string; text: string; url: string; pack: string; words: number; }
interface Stats { total: number; packs: { pack: string; n: number }[]; words: { avg: number; min: number; max: number }; }

const GOLD = '#D4AF37';
const GOLD_DEEP = '#B8860B';
const INK = '#1a1a1a';
const MUTED = '#888';
const LINE = '#e5e5e5';

const pretty = (w: string, first: boolean) => {
    const out = w === 'i' || w.startsWith("i'") ? 'I' + w.slice(1) : w;
    return first ? out.charAt(0).toUpperCase() + out.slice(1) : out;
};
const prettyLine = (t: string) =>
    t.split(/\s+/).filter(Boolean).map((w, i) => pretty(w.toLowerCase(), i === 0)).join(' ');

const G = (q: string) => `https://www.google.com/search?q=${encodeURIComponent(`"${q}"`)}`;
const YG = (q: string) => `https://youglish.com/pronounce/${encodeURIComponent(q)}/english`;
const PP = (q: string) => `https://playphrase.me/#/search?q=${encodeURIComponent(q)}`;

const todayKey = () => new Date().toISOString().slice(0, 10);

export default function ListenPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [pack, setPack] = useState('');
    const [range, setRange] = useState<[number, number]>([1, 40]);
    const [clips, setClips] = useState<Clip[]>([]);
    const [order, setOrder] = useState<number[]>([]);
    const [cursor, setCursor] = useState(0);
    const [loading, setLoading] = useState(true);

    const [playing, setPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [shuffle, setShuffle] = useState(false);
    const [loopAll, setLoopAll] = useState(true);
    const [reps, setReps] = useState(1);       // 1本を何回続けて鳴らすか (シャドーイング用)
    const [progress, setProgress] = useState(0);
    const [showQueue, setShowQueue] = useState(false);

    const [saved, setSaved] = useState<Set<string>>(new Set());
    const [busy, setBusy] = useState<string | null>(null);
    const [heard, setHeard] = useState(0);      // 今日ここで聞いた本数
    const [added, setAdded] = useState(0);      // 今日ここから登録した枚数

    // 1本ずつの再生回数 (ずっと残る)。training の mastery にあたるもので、
    // 「まだ一度も聞いていない音声」を先に出すために使う。D1 に書くと再生のたびに
    // 書き込みが走るので localStorage に置く。
    const [plays, setPlays] = useState<Record<string, number>>({});
    const [mode, setMode] = useState<'random' | 'unheard' | 'least'>('random');
    const [sleepMin, setSleepMin] = useState(0);   // 0 = 切
    const [sleepLeft, setSleepLeft] = useState(0); // 残り秒
    const playsRef = useRef<Record<string, number>>({});

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const preloadRef = useRef<HTMLAudioElement | null>(null);
    const playedRef = useRef(0);                // 現在の1本を何回鳴らしたか
    const wantPlayRef = useRef(false);          // 鳴らし続ける意思。pause イベントでは折らない
    const loopRef = useRef(true);
    const repsRef = useRef(1);
    const heardOnce = useRef<Set<string>>(new Set());

    const idx = order[cursor] ?? 0;
    const clip: Clip | undefined = clips[idx];
    const nextClip: Clip | undefined = clips[order[cursor + 1] ?? order[0] ?? 0];

    // 設定と今日のカウンタを持ち回る
    useEffect(() => {
        try {
            const s = localStorage.getItem('listen_speed');
            const sh = localStorage.getItem('listen_shuffle');
            const lp = localStorage.getItem('listen_loop');
            const rp = localStorage.getItem('listen_reps');
            const day = localStorage.getItem('listen_day');
            if (s) setSpeed(parseFloat(s));
            if (sh === 'true') setShuffle(true);
            if (lp === 'false') { setLoopAll(false); loopRef.current = false; }
            if (rp) { setReps(parseInt(rp)); repsRef.current = parseInt(rp); }
            if (day === todayKey()) {
                setHeard(parseInt(localStorage.getItem('listen_heard') || '0'));
                setAdded(parseInt(localStorage.getItem('listen_added') || '0'));
            } else {
                localStorage.setItem('listen_day', todayKey());
                localStorage.setItem('listen_heard', '0');
                localStorage.setItem('listen_added', '0');
            }
            const pl = JSON.parse(localStorage.getItem('listen_plays') || '{}');
            playsRef.current = pl; setPlays(pl);
            const md = localStorage.getItem('listen_mode');
            if (md === 'unheard' || md === 'least') setMode(md);
        } catch { /* private mode */ }
    }, []);
    useEffect(() => { try { localStorage.setItem('listen_mode', mode); } catch { } }, [mode]);

    const bumpPlay = (slug: string) => {
        const next = { ...playsRef.current, [slug]: (playsRef.current[slug] || 0) + 1 };
        playsRef.current = next;
        setPlays(next);
        try { localStorage.setItem('listen_plays', JSON.stringify(next)); } catch { }
    };
    useEffect(() => { try { localStorage.setItem('listen_speed', String(speed)); } catch { } }, [speed]);
    useEffect(() => { try { localStorage.setItem('listen_shuffle', String(shuffle)); } catch { } }, [shuffle]);
    useEffect(() => { try { localStorage.setItem('listen_loop', String(loopAll)); } catch { } }, [loopAll]);
    useEffect(() => { try { localStorage.setItem('listen_reps', String(reps)); } catch { } }, [reps]);
    const bumpHeard = () => setHeard(v => { const n = v + 1; try { localStorage.setItem('listen_heard', String(n)); } catch { } return n; });
    const bumpAdded = () => setAdded(v => { const n = v + 1; try { localStorage.setItem('listen_added', String(n)); } catch { } return n; });

    useEffect(() => {
        fetch('/api/listening-clips?stats=1').then(r => r.json())
            .then(d => setStats(d.stats || null)).catch(() => setStats(null));
    }, []);

    const load = useCallback(async () => {
        setLoading(true);
        const seen = new Set<string>();
        const out: Clip[] = [];
        // 未聴優先のときは、未聴が集まるまでバケツを引き足す。
        // どのモードでも1回の読み取りは LIMIT で頭打ちなので D1 の行読みは増えない。
        const starts = mode === 'random'
            ? [Math.floor(Math.random() * 100), 0]
            : [Math.floor(Math.random() * 100), 25, 50, 75, 0];
        for (const b of starts) {
            const enough = mode === 'random'
                ? out.length >= 40
                : out.filter(c => !(playsRef.current[c.slug] > 0)).length >= 40;
            if (enough) break;
            const qs = new URLSearchParams({
                bucket: String(b), limit: '60',
                minWords: String(range[0]), maxWords: String(range[1]),
            });
            if (pack) qs.set('pack', pack);
            try {
                const d = await (await fetch(`/api/listening-clips?${qs}`)).json();
                for (const c of (d.clips || []) as Clip[]) {
                    if (!seen.has(c.slug)) { seen.add(c.slug); out.push(c); }
                }
            } catch { /* 次へ */ }
        }

        let picked = out;
        const cnt = (c: Clip) => playsRef.current[c.slug] || 0;
        if (mode === 'unheard') picked = out.filter(c => cnt(c) === 0);
        if (picked.length === 0) picked = out;   // 全部聞き終わっていたら普通に流す
        if (mode === 'least') picked = [...out].sort((a, b) => cnt(a) - cnt(b));
        picked = picked.slice(0, 60);

        const ord = picked.map((_, n) => n);
        // 少ない順は並びに意味があるので混ぜない
        if (shuffle && mode !== 'least') for (let k = ord.length - 1; k > 0; k--) {
            const j = Math.floor(Math.random() * (k + 1));
            [ord[k], ord[j]] = [ord[j], ord[k]];
        }
        setClips(picked); setOrder(ord); setCursor(0); setLoading(false);
    }, [pack, range, shuffle, mode]);

    useEffect(() => { load(); }, [load]);

    const go = useCallback((delta: number) => {
        playedRef.current = 0;
        setCursor(c => {
            const n = c + delta;
            if (n < 0) return loopRef.current ? Math.max(0, order.length - 1) : 0;
            if (n >= order.length) return loopRef.current ? 0 : order.length - 1;
            return n;
        });
    }, [order.length]);

    // 曲が変わったら即座に鳴らす。src は先読み済みなので待ちが出ない
    useEffect(() => {
        const a = audioRef.current;
        if (!a || !clip) return;
        a.playbackRate = speed;
        // 「鳴らし続ける意思」は ref で持つ。playing(state) を見てはいけない —
        // 再生が終わると ended の前に pause が飛んで playing が false になるので、
        // それを条件にすると1本目で必ず連続再生が止まる。
        if (wantPlayRef.current) { a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
        if (!heardOnce.current.has(clip.slug)) { heardOnce.current.add(clip.slug); bumpHeard(); }
        bumpPlay(clip.slug);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clip?.slug]);

    useEffect(() => { if (audioRef.current) audioRef.current.playbackRate = speed; }, [speed, clip?.slug]);

    // ロック画面/バックグラウンド再生。スマホで流すのが本命なので外せない
    useEffect(() => {
        if (!clip || typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
        try {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: prettyLine(clip.text).slice(0, 90), artist: 'LISTEN', album: clip.pack,
            });
            navigator.mediaSession.setActionHandler('play', () => toggle(true));
            navigator.mediaSession.setActionHandler('pause', () => toggle(false));
            navigator.mediaSession.setActionHandler('previoustrack', () => go(-1));
            navigator.mediaSession.setActionHandler('nexttrack', () => go(1));
        } catch { /* 未対応 */ }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clip?.slug, go]);

    const toggle = (force?: boolean) => {
        const a = audioRef.current;
        if (!a) return;
        const want = force ?? !playing;
        wantPlayRef.current = want;   // 意思はここでだけ書き換える
        if (want) { a.play().catch(() => { }); setPlaying(true); } else { a.pause(); setPlaying(false); }
    };

    // 終わった瞬間に次へ。待ち時間を1msも入れない
    const onEnded = () => {
        const a = audioRef.current;
        playedRef.current += 1;
        if (playedRef.current < repsRef.current && a) { a.currentTime = 0; a.play().catch(() => { }); return; }
        playedRef.current = 0;
        if (cursor >= order.length - 1 && !loopRef.current) { wantPlayRef.current = false; setPlaying(false); return; }
        // 曲末の pause で playing が false に落ちているが、意思(wantPlayRef)は生きている。
        // 次の1本は clip 変更の effect が鳴らす
        go(1);
    };

    const toTraining = async (c: Clip) => {
        setBusy(c.slug);
        try {
            // category は送らない。/api/phrases が属性を自分で割り当てる
            const res = await fetch('/api/phrases', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english: prettyLine(c.text), japanese: '', date: todayKey() }),
            });
            const d = await res.json();
            if (d.success || d.phrase) { setSaved(s => new Set(s).add(c.slug)); bumpAdded(); }
        } catch { /* 再生は止めない */ }
        setBusy(null);
    };

    // ライブラリから捨てる (D1 の行と R2 の音声ごと)。一語だけの屑や聞き取る価値のない
    // 断片が必ず混ざるので、流しながら間引けないとライブラリが腐る。
    const drop = async (c: Clip) => {
        setBusy(c.slug);
        try {
            await fetch('/api/listening-clips', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ remove: [c.slug] }),
            });
            const keep = clips.filter(x => x.slug !== c.slug);
            setClips(keep);
            setOrder(keep.map((_, n) => n));
            setCursor(v => Math.min(v, Math.max(0, keep.length - 1)));
            setStats(s => (s ? { ...s, total: Math.max(0, s.total - 1) } : s));
        } catch { /* 失敗しても再生は続ける */ }
        setBusy(null);
    };

    // 束の付け替え。落としたあとにジャンルを分け直せる
    const retag = async (c: Clip, nextPack: string) => {
        if (!nextPack || nextPack === c.pack) return;
        setBusy(c.slug);
        try {
            await fetch('/api/listening-clips', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ retag: { slug: c.slug, pack: nextPack } }),
            });
            setClips(list => list.map(x => (x.slug === c.slug ? { ...x, pack: nextPack } : x)));
            fetch('/api/listening-clips?stats=1').then(r => r.json())
                .then(d => setStats(d.stats || null)).catch(() => { });
        } catch { /* そのまま */ }
        setBusy(null);
    };

    // スリープタイマー。寝る前に流すので、止まらないと朝まで鳴る
    useEffect(() => {
        if (!sleepMin) { setSleepLeft(0); return; }
        setSleepLeft(sleepMin * 60);
        const t = setInterval(() => {
            setSleepLeft(v => {
                if (v <= 1) {
                    wantPlayRef.current = false;   // 意思ごと折らないと次の1本で復活する
                    audioRef.current?.pause(); setPlaying(false); setSleepMin(0); return 0;
                }
                return v - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, [sleepMin]);

    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
            if (e.code === 'Space') { e.preventDefault(); toggle(); }
            if (e.code === 'ArrowRight') go(1);
            if (e.code === 'ArrowLeft') go(-1);
            if (e.key === 'q') setShowQueue(v => !v);
        };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [go, playing]);

    const lineWords = useMemo(() => (clip ? clip.text.split(/\s+/).filter(Boolean) : []), [clip]);

    // ライブラリのうち一度でも鳴らした割合。聞き流しは「何周したか」より
    // 「まだ触っていない山がどれだけ残っているか」のほうが効く
    const coverage = useMemo(() => {
        const total = stats?.total || 0;
        if (!total) return 0;
        return Math.min(100, Math.round((Object.keys(plays).length / total) * 100));
    }, [plays, stats]);

    // training の小さい枠線ボタン
    const btn = (active = false, accent = GOLD): React.CSSProperties => ({
        padding: '6px 14px', borderRadius: 5, fontSize: 11, fontWeight: 600, cursor: 'pointer',
        border: active ? `2px solid ${accent}` : `1px solid #ddd`,
        backgroundColor: active ? '#FFFBEB' : 'transparent',
        color: active ? accent : MUTED,
        textDecoration: 'none', display: 'inline-block', lineHeight: 1.5, transition: 'all 0.15s',
    });

    const Tile = ({ n, label, big, gold }: { n: string | number; label: string; big?: boolean; gold?: boolean }) => (
        <div style={{ textAlign: 'center', minWidth: big ? 90 : 62 }}>
            <div style={{
                fontSize: big ? 34 : 22, fontWeight: 900, fontVariantNumeric: 'tabular-nums',
                letterSpacing: '-1.5px', lineHeight: 1,
                ...(gold ? {
                    background: `linear-gradient(180deg, #F6C85F 0%, ${GOLD} 50%, ${GOLD_DEEP} 100%)`,
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 1px 3px rgba(212,175,55,0.3))',
                } : { color: INK }),
            }}>{typeof n === 'number' ? n.toLocaleString() : n}</div>
            <div style={{
                fontSize: 8, fontWeight: 800, color: gold ? GOLD : '#aaa',
                letterSpacing: '3px', marginTop: 4,
            }}>{label}</div>
        </div>
    );
    const Div = () => <div style={{ width: 1, height: 30, backgroundColor: LINE }} />;

    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', color: INK }}>
            <div style={{ maxWidth: 820, margin: '0 auto', padding: '26px 20px 60px' }}>

                {/* ヘッダー */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: '0.16em', margin: 0 }}>LISTEN</h1>
                        <p style={{ margin: '4px 0 0', fontSize: 11, color: MUTED }}>
                            エクセルに入れていない音声。覚えるやつではなく、流して浴びるほう。
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11 }}>
                        <select value={pack} onChange={e => setPack(e.target.value)}
                            style={{ padding: '5px 8px', border: '1px solid #ddd', borderRadius: 5, background: '#fff', color: MUTED, fontSize: 11 }}>
                            <option value="">すべての束</option>
                            {(stats?.packs || []).map(p => <option key={p.pack} value={p.pack}>{p.pack} ({p.n})</option>)}
                        </select>
                        <input type="number" min={1} max={60} value={range[0]}
                            onChange={e => setRange([Number(e.target.value) || 1, range[1]])}
                            style={{ width: 42, padding: '5px 6px', border: '1px solid #ddd', borderRadius: 5, fontSize: 11 }} />
                        <span style={{ color: '#ccc' }}>–</span>
                        <input type="number" min={1} max={60} value={range[1]}
                            onChange={e => setRange([range[0], Number(e.target.value) || 40])}
                            style={{ width: 42, padding: '5px 6px', border: '1px solid #ddd', borderRadius: 5, fontSize: 11 }} />
                        <span style={{ color: '#ccc' }}>語</span>
                        <button onClick={load} style={btn()}>引き直す</button>
                        <button onClick={() => setShowQueue(v => !v)} style={btn(showQueue)}>
                            キュー {order.length}
                        </button>
                    </div>
                </div>

                {/* 統計 — training と同じタイル */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 22,
                    padding: '16px 18px', background: '#fff', border: `1px solid ${LINE}`,
                    borderRadius: 12, marginBottom: 14, flexWrap: 'wrap',
                }}>
                    <Tile n={stats?.total ?? 0} label="LIBRARY" />
                    <Div />
                    <Tile n={`${coverage}%`} label="COVERED" />
                    <Div />
                    <Tile n={stats?.packs.length ?? 0} label="PACKS" />
                    <Div />
                    <Tile n={stats?.words.avg ?? 0} label="AVG WORDS" />
                    <Div />
                    <Tile n={heard} label="HEARD" big gold />
                    <Div />
                    <Tile n={added} label="CARDED" />
                </div>

                {/* 出し方 — training の並び替えにあたるもの */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    marginBottom: 14, flexWrap: 'wrap',
                }}>
                    <span style={{ fontSize: 9, color: '#bbb', letterSpacing: '2px', fontWeight: 700 }}>ORDER</span>
                    {([['random', 'ランダム'], ['unheard', '未聴だけ'], ['least', '回数の少ない順']] as const).map(([m, label]) => (
                        <button key={m} onClick={() => setMode(m)} style={{ ...btn(mode === m), padding: '4px 12px', fontSize: 10 }}>
                            {label}
                        </button>
                    ))}
                    <span style={{ width: 1, height: 18, background: LINE, margin: '0 4px' }} />
                    <span style={{ fontSize: 9, color: '#bbb', letterSpacing: '2px', fontWeight: 700 }}>SLEEP</span>
                    {[0, 15, 30, 60].map(m => (
                        <button key={m} onClick={() => setSleepMin(m)} style={{ ...btn(sleepMin === m && m !== 0), padding: '4px 10px', fontSize: 10 }}>
                            {m === 0 ? '切' : `${m}分`}
                        </button>
                    ))}
                    {sleepLeft > 0 && (
                        <span style={{ fontSize: 11, color: GOLD, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                            残り {Math.floor(sleepLeft / 60)}:{String(sleepLeft % 60).padStart(2, '0')}
                        </span>
                    )}
                </div>

                {/* 本体 */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, padding: '22px 22px 18px' }}>
                    {loading && <p style={{ color: '#bbb', fontSize: 12, margin: 0, textAlign: 'center' }}>読み込み中…</p>}

                    {!loading && !clip && (
                        <div style={{ fontSize: 12, color: MUTED, textAlign: 'center', lineHeight: 2 }}>
                            この条件で出せる音声がない。<br />
                            <code style={{ fontSize: 10, background: '#F5F5F4', padding: '3px 7px', borderRadius: 4 }}>
                                node scripts/import-listening-clips.mjs --pack movies
                            </code>
                        </div>
                    )}

                    {!loading && clip && (
                        <>
                            <div style={{ fontSize: 9, letterSpacing: '2.5px', color: '#bbb', textAlign: 'center', fontWeight: 700 }}>
                                {clip.pack.toUpperCase()} · {clip.words} WORDS · {cursor + 1}/{order.length}
                            </div>

                            {/* 英文。語をクリックすると Google。語の間には本物の空白を置く
                                (margin だけで隙間を作ると改行できず溢れる) */}
                            <div style={{
                                fontSize: 30, fontWeight: 600, color: INK, lineHeight: 1.5,
                                textAlign: 'center', margin: '18px 0 20px', overflowWrap: 'break-word',
                            }}>
                                {lineWords.map((w, n) => {
                                    const clean = w.replace(/[^A-Za-z0-9']/g, '');
                                    return (
                                        <span key={n}>
                                            <a href={G(clean)} target="_blank" rel="noopener noreferrer" title={`"${clean}" を Google`}
                                                style={{ color: INK, textDecoration: 'none', borderBottom: '2px solid transparent' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderBottomColor = GOLD; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'transparent'; }}
                                            >{pretty(w.toLowerCase(), n === 0)}</a>
                                            {n < lineWords.length - 1 ? ' ' : ''}
                                        </span>
                                    );
                                })}
                            </div>

                            {/* 道具列 — training と同じ小さい枠線ボタン */}
                            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 }}>
                                <button onClick={() => toTraining(clip)} disabled={saved.has(clip.slug) || busy === clip.slug}
                                    style={{
                                        ...btn(true, saved.has(clip.slug) ? '#10B981' : GOLD),
                                        backgroundColor: saved.has(clip.slug) ? '#ECFDF5' : '#FFFBEB',
                                        cursor: saved.has(clip.slug) ? 'default' : 'pointer',
                                    }}>
                                    {saved.has(clip.slug) ? '登録済み' : busy === clip.slug ? '登録中…' : '+ Training'}
                                </button>
                                <a style={btn()} href={G(prettyLine(clip.text))} target="_blank" rel="noopener noreferrer">Google</a>
                                <a style={btn()} href={YG(prettyLine(clip.text))} target="_blank" rel="noopener noreferrer">YG</a>
                                <a style={btn()} href={PP(prettyLine(clip.text))} target="_blank" rel="noopener noreferrer">PP</a>
                                <button style={btn()} onClick={() => navigator.clipboard?.writeText(prettyLine(clip.text))}>コピー</button>
                                <a style={btn()} href={clip.url} target="_blank" rel="noopener noreferrer">音声</a>
                                {/* 束の付け替え。落とした後にジャンルを分け直せる */}
                                <select value={clip.pack} onChange={e => retag(clip, e.target.value)}
                                    title="束を付け替える"
                                    style={{ ...btn(), padding: '5px 8px', cursor: 'pointer' }}>
                                    {[...new Set([clip.pack, ...(stats?.packs || []).map(p => p.pack)])].map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                                <button style={{ ...btn(), color: '#c0392b', borderColor: '#f0d0cc' }}
                                    disabled={busy === clip.slug}
                                    onClick={() => { if (confirm('この音声をライブラリから消す。取り消せない。')) drop(clip); }}>
                                    捨てる
                                </button>
                            </div>

                            <audio ref={audioRef} src={clip.url} onEnded={onEnded} preload="auto"
                                onPlay={() => { wantPlayRef.current = true; setPlaying(true); }}
                                onPause={() => setPlaying(false)}
                                onTimeUpdate={e => {
                                    const a = e.currentTarget;
                                    setProgress(a.duration ? (a.currentTime / a.duration) * 100 : 0);
                                }} />
                            {/* 次の1本を先読みしておく。曲間の無音はここで消える */}
                            {nextClip && nextClip.slug !== clip.slug && (
                                <audio ref={preloadRef} src={nextClip.url} preload="auto" style={{ display: 'none' }} />
                            )}

                            <div style={{ height: 3, background: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                                <div style={{ height: '100%', width: `${progress}%`, background: GOLD, transition: 'width 0.05s linear' }} />
                            </div>

                            {/* 操作 */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 26, marginTop: 16 }}>
                                <button onClick={() => setShuffle(v => !v)} title="シャッフル"
                                    style={{ background: 'none', border: 'none', color: shuffle ? GOLD : '#ddd', cursor: 'pointer', padding: 6 }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" /></svg>
                                </button>
                                <button onClick={() => go(-1)} title="前へ (←)" style={{ background: 'none', border: 'none', color: INK, cursor: 'pointer', padding: 6 }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
                                </button>
                                <button onClick={() => toggle()} title="再生 (Space)"
                                    style={{
                                        width: 58, height: 58, borderRadius: '50%',
                                        background: `linear-gradient(180deg, #F6C85F 0%, ${GOLD} 55%, ${GOLD_DEEP} 100%)`,
                                        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 2px 12px rgba(212,175,55,0.4)',
                                    }}>
                                    {playing
                                        ? <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                        : <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z" /></svg>}
                                </button>
                                <button onClick={() => go(1)} title="次へ (→)" style={{ background: 'none', border: 'none', color: INK, cursor: 'pointer', padding: 6 }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
                                </button>
                                <button onClick={() => { const v = !loopAll; loopRef.current = v; setLoopAll(v); }} title="最後まで行ったら頭に戻る"
                                    style={{ background: 'none', border: 'none', color: loopAll ? GOLD : '#ddd', cursor: 'pointer', padding: 6 }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" /></svg>
                                </button>
                            </div>

                            {/* 速度と回数 */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 14, flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ fontSize: 10, color: '#bbb' }}>0.5x</span>
                                    <input type="range" min="0.5" max="1.5" step="0.05" value={speed}
                                        onChange={e => setSpeed(parseFloat(e.target.value))}
                                        style={{ width: 130, accentColor: GOLD }} />
                                    <span style={{ fontSize: 12, color: GOLD, fontWeight: 700, minWidth: 42 }}>{speed.toFixed(2)}x</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                    <span style={{ fontSize: 9, color: '#bbb', letterSpacing: '2px', fontWeight: 700 }}>REPS</span>
                                    {[1, 2, 3].map(r => (
                                        <button key={r} onClick={() => { repsRef.current = r; setReps(r); }}
                                            style={{ ...btn(reps === r), padding: '4px 10px', fontSize: 10 }}>{r}</button>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* キュー — 常設の一覧はやめて、押したときだけ開く */}
                {showQueue && clips.length > 0 && (
                    <div style={{
                        marginTop: 12, background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12,
                        maxHeight: 340, overflowY: 'auto',
                    }}>
                        {order.map((n, pos) => {
                            const c = clips[n];
                            const cur = pos === cursor;
                            return (
                                <div key={c.slug} style={{
                                    display: 'flex', alignItems: 'center', gap: 10, padding: '9px 13px',
                                    borderTop: pos === 0 ? 'none' : '1px solid #f5f5f4',
                                    background: cur ? '#FFFBEB' : '#fff',
                                }}>
                                    <span style={{ fontSize: 10, color: '#ccc', width: 22, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{pos + 1}</span>
                                    {/* 再生回数。0 のものが未聴 */}
                                    <span style={{
                                        fontSize: 9, width: 20, flexShrink: 0, textAlign: 'center', fontWeight: 700,
                                        color: (plays[c.slug] || 0) === 0 ? GOLD : '#ddd',
                                    }}>{(plays[c.slug] || 0) === 0 ? 'NEW' : `×${plays[c.slug]}`}</span>
                                    <button onClick={() => { playedRef.current = 0; wantPlayRef.current = true; setCursor(pos); setPlaying(true); }}
                                        style={{
                                            flex: 1, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer',
                                            fontSize: 13, lineHeight: 1.45, color: cur ? GOLD_DEEP : INK, padding: 0, fontWeight: cur ? 600 : 400,
                                        }}>{prettyLine(c.text)}</button>
                                    <button onClick={() => toTraining(c)} disabled={saved.has(c.slug)}
                                        style={{ ...btn(saved.has(c.slug), '#10B981'), padding: '3px 8px', fontSize: 10, flexShrink: 0 }}>
                                        {saved.has(c.slug) ? '済' : '+T'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                <p style={{ marginTop: 14, fontSize: 10, color: '#bbb', textAlign: 'center', lineHeight: 1.9 }}>
                    Space = 再生 / 停止 ・ ← → = 前後 ・ Q = キュー ・ 語をクリックで Google<br />
                    次の1本は先読みしてあるので、曲間で止まらない
                </p>
            </div>
        </div>
    );
}
