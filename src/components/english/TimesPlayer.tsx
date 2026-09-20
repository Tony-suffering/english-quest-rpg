// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/components/english/TimesPlayer.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

// The Tonio Times — 紙面読み上げ (TTS)。
//
// 紙面(Sheet 1)の英文を「文単位」に割って、上から順に読み上げる。
// 文単位にするのは2つ理由がある:
//   1. Chrome の speechSynthesis は長い utterance を途中で落とす (15秒前後で無音になる)
//   2. 1文ずつなら戻る/繰り返すが効く。聴き取れなかった文だけ何度も叩ける
//
// 紙面側の各ブロックには data-tts="<block>" が振ってあり、いま読んでいる文が属する
// ブロックに .nt-tts-on を付けて反転させる (ハイライトは DOM 側で当てる。3種類の紙面
// 〈通常 / 号外AOT / 号外GHOST〉が同じ block キーを持つので、この1本で全部に効く)。

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NewspaperEdition } from '@/data/english/newspaper';

export type TimesSection = 'LEAD' | 'VOICES' | 'RAIL' | 'STORY';

export interface TimesSegment {
    block: string;        // 紙面の data-tts と対応するブロックID
    section: TimesSection;
    text: string;         // 読み上げる1文
}

const SECTION_LABEL: Record<TimesSection, string> = {
    LEAD: 'Lead',
    VOICES: 'Voices',
    RAIL: 'Rail',
    STORY: 'Story',
};

// ── 文の切り出し ────────────────────────────────────────────────
// 紙面には Mr. / No. / U.S. / 1971. のような「終止符ではないピリオド」が普通に出る。
// 正規表現の一発 split だと切れすぎるので、終止符の候補を1つずつ検分する。
const ABBREV = new Set([
    'mr', 'mrs', 'ms', 'dr', 'st', 'jr', 'sr', 'prof', 'rev', 'gen', 'sen', 'rep',
    'vs', 'etc', 'no', 'vol', 'fig', 'inc', 'ltd', 'co', 'ave', 'dept', 'est',
]);
const CLOSERS = '”"’\')]»';

export function splitSentences(input: string): string[] {
    const text = input.trim();
    if (!text) return [];
    const out: string[] = [];
    let start = 0;

    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (ch !== '.' && ch !== '!' && ch !== '?' && ch !== '…') continue;

        // 終止符に続く閉じ引用符・括弧はこの文に含める
        let end = i + 1;
        while (end < text.length && CLOSERS.includes(text[end])) end++;
        if (end >= text.length) break;
        if (!/\s/.test(text[end])) continue;                 // 3.5 のような小数はここで落ちる

        let next = end;
        while (next < text.length && /\s/.test(text[next])) next++;
        if (!/[A-Z“"‘(]/.test(text[next] ?? '')) continue;   // 次が小文字なら文は続いている

        if (ch === '.') {
            const word = text.slice(Math.max(0, i - 12), i).split(/[\s("“]/).pop() ?? '';
            // 略語 (Mr.) と頭文字 (U.S. の S.) は切らない
            if (ABBREV.has(word.toLowerCase()) || word.length <= 1) continue;
        }

        const piece = text.slice(start, end).trim();
        if (piece) out.push(piece);
        start = next;
    }

    const tail = text.slice(start).trim();
    if (tail) out.push(tail);
    return out;
}

// ── 長すぎる文は節で割る ────────────────────────────────────────
// 本紙の lead には500字を超える一文が普通に出る。1発話が長いほど音声エンジンが
// 途中で黙る事故に当たりやすく、バーの表示も読めない。260字を超える文だけ、
// ダッシュ・セミコロン・コンマの切れ目で200字前後に割る (文の切れ目は動かさない)。
const MAX_CHARS = 260;
const CHUNK_TARGET = 200;
const SEPS = [' — ', '; ', ': ', ', '];

export function chunkLong(sentence: string): string[] {
    if (sentence.length <= MAX_CHARS) return [sentence];
    const out: string[] = [];
    let rest = sentence;
    while (rest.length > MAX_CHARS) {
        const win = rest.slice(0, CHUNK_TARGET);
        let cut = -1;
        for (const sep of SEPS) {
            const at = win.lastIndexOf(sep);
            if (at > cut) cut = at + sep.length - 1;   // 区切り記号は前のかたまりに残す
        }
        if (cut < 60) cut = win.lastIndexOf(' ');       // 節が見つからない時は語の切れ目
        if (cut < 60) cut = CHUNK_TARGET;               // それも無ければ強制的に切る
        const head = rest.slice(0, cut + 1).trim();
        if (!head) break;
        out.push(head);
        rest = rest.slice(cut + 1).trim();
    }
    if (rest) out.push(rest);
    return out;
}

// ── 紙面 → 読み上げ台本 ─────────────────────────────────────────
export function buildTimesSegments(ed: NewspaperEdition): TimesSegment[] {
    const segs: TimesSegment[] = [];
    const push = (block: string, section: TimesSection, raw?: string) => {
        if (!raw) return;
        for (const s of splitSentences(raw)) {
            for (const c of chunkLong(s)) segs.push({ block, section, text: c });
        }
    };

    push('lead-headline', 'LEAD', ed.lead.headline);
    push('lead-standfirst', 'LEAD', ed.lead.standfirst);
    ed.lead.body.forEach((p, i) => push(`lead-body-${i}`, 'LEAD', p));

    push('voices-headline', 'VOICES', ed.voices.headline);
    push('voices-headline', 'VOICES', ed.voices.standfirst);
    ed.voices.turns.forEach((t, i) => {
        push(`voices-turn-${i}`, 'VOICES', t.q);
        push(`voices-turn-${i}`, 'VOICES', t.a);
    });

    // rail.standfirst は紙面に刷っていないので読まない (聞こえる = 紙面にある、を守る)
    push('rail-headline', 'RAIL', ed.rail.headline);
    ed.rail.body.forEach((p, i) => push(`rail-body-${i}`, 'RAIL', p));

    push('story-headline', 'STORY', ed.story.headline);
    ed.story.body.forEach((p, i) => push(`story-body-${i}`, 'STORY', p));

    return segs;
}

const RATES = [0.75, 0.9, 1, 1.15, 1.3];
const STORE_KEY = 'tonio_times_tts';

const PAPER = '#FBFAF7';
const INK = '#1A1A1A';
const MUTED = '#57534E';
const GOLD = '#B8941E';
const KICKER = '#7A1F1F';
const SERIF = "Georgia, 'Times New Roman', 'Noto Serif JP', serif";

export default function TimesPlayer({ ed }: { ed: NewspaperEdition }) {
    const segments = useMemo(() => buildTimesSegments(ed), [ed]);

    const [ready, setReady] = useState(false);          // speechSynthesis が使えるか
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [rate, setRate] = useState(1);
    const [voiceName, setVoiceName] = useState('');
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [repeatOne, setRepeatOne] = useState(false);
    const [open, setOpen] = useState(false);            // 設定パネル

    // 読み上げループはコールバックの中で自分を呼ぶので、最新値は ref で持つ
    const indexRef = useRef(0);
    const rateRef = useRef(rate);
    const voiceRef = useRef('');
    const repeatRef = useRef(false);
    const playingRef = useRef(false);
    // 今読んでいる utterance。GC 避けと「これは自分の発話か」の判定に使う
    const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
    const stallRef = useRef(0);   // 無音のまま経過した監視回数
    const retryRef = useRef(0);   // 同じ文をやり直した回数
    const segsRef = useRef(segments);
    segsRef.current = segments;
    rateRef.current = rate;
    voiceRef.current = voiceName;
    repeatRef.current = repeatOne;

    // ── 初期化: 音声一覧と保存設定 ──
    useEffect(() => {
        if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        setReady(true);

        const loadVoices = () => {
            const en = window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('en'));
            setVoices(en);
        };
        loadVoices();
        window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

        try {
            const saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
            if (typeof saved.rate === 'number') setRate(saved.rate);
            if (typeof saved.voice === 'string') setVoiceName(saved.voice);
        } catch { /* 壊れていたら既定値で始める */ }

        return () => {
            window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
            window.speechSynthesis.cancel();
        };
    }, []);

    useEffect(() => {
        if (!ready) return;
        localStorage.setItem(STORE_KEY, JSON.stringify({ rate, voice: voiceName }));
    }, [rate, voiceName, ready]);

    // 号を変えたら頭から
    useEffect(() => {
        window.speechSynthesis?.cancel();
        utterRef.current = null;
        playingRef.current = false;
        setPlaying(false);
        indexRef.current = 0;
        setIndex(0);
    }, [ed.date, ed.id]);

    // ── 紙面のハイライト (DOM 直付け) ──
    useEffect(() => {
        const block = segments[index]?.block;
        const nodes = document.querySelectorAll<HTMLElement>('[data-tts]');
        nodes.forEach((n) => n.classList.toggle('nt-tts-on', n.dataset.tts === block));
        return () => { nodes.forEach((n) => n.classList.remove('nt-tts-on')); };
    }, [index, segments]);

    // 再生中だけ、いま読んでいる箇所を画面内に保つ
    useEffect(() => {
        if (!playingRef.current) return;
        const block = segments[index]?.block;
        if (!block) return;
        const el = document.querySelector<HTMLElement>(`[data-tts="${block}"]`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < 80 || r.bottom > window.innerHeight - 170) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [index, segments]);

    // speak(i, interrupt)
    //   interrupt=true  … ユーザー操作 (再生/前後/章ジャンプ)。今喋っている分を切ってから読む
    //   interrupt=false … 前の文が終わっての自動送り。**cancel を呼ばない**。
    // 毎回 cancel してから speak すると、cancel の後始末が新しい発話を巻き込んで
    // 「無言のまま止まる」事故が起きる (途中で止まる、の主犯)。列が空なら切る必要はない。
    const speak = useCallback((i: number, interrupt = true) => {
        const segs = segsRef.current;
        if (i < 0 || i >= segs.length) {
            playingRef.current = false;
            setPlaying(false);
            return;
        }
        const synth = window.speechSynthesis;
        if (interrupt) synth.cancel();
        if (synth.paused) synth.resume();

        const u = new SpeechSynthesisUtterance(segs[i].text);
        // 参照を持っておかないと、喋り終わる前に GC されて無音になることがある
        utterRef.current = u;
        u.lang = 'en-US';
        u.rate = rateRef.current;
        const v = synth.getVoices().find((x) => x.name === voiceRef.current);
        if (v) u.voice = v;

        indexRef.current = i;
        setIndex(i);
        playingRef.current = true;
        setPlaying(true);
        stallRef.current = 0;

        const advance = () => {
            retryRef.current = 0;
            const next = repeatRef.current ? i : i + 1;
            if (next >= segsRef.current.length) {
                playingRef.current = false;
                setPlaying(false);
                return;
            }
            window.setTimeout(() => {
                if (playingRef.current && utterRef.current === u) speak(next, false);
            }, repeatRef.current ? 400 : 120);
        };

        u.onend = () => {
            if (!playingRef.current || utterRef.current !== u) return;
            advance();
        };
        u.onerror = (e) => {
            if (!playingRef.current || utterRef.current !== u) return;
            const err = (e as SpeechSynthesisErrorEvent).error;
            // 自分で切った分 (stop / 次へ / 章ジャンプ) は事故ではない
            if (err === 'canceled' || err === 'interrupted') return;
            // 読めない1文のために全部止めない。次へ送る
            advance();
        };

        // 割り込んだ直後だけ、cancel が片付くのを一拍待ってから積む
        if (interrupt) window.setTimeout(() => { if (utterRef.current === u) synth.speak(u); }, 60);
        else synth.speak(u);
    }, []);

    const stop = useCallback(() => {
        playingRef.current = false;
        setPlaying(false);
        utterRef.current = null;
        window.speechSynthesis.cancel();
    }, []);

    // 見張り番。再生中なのに1秒以上なにも喋っていない = どこかで発話が消えている。
    // 音声エンジンは長い文の途中で黙ることがあり、その時 end も error も飛んでこない。
    // まず同じ文をやり直し、それでも駄目なら次の文へ送る。ここで必ず復帰する。
    useEffect(() => {
        if (!ready) return;
        const id = window.setInterval(() => {
            const synth = window.speechSynthesis;
            if (!playingRef.current) return;
            if (synth.paused) { synth.resume(); return; }
            if (synth.speaking || synth.pending) { stallRef.current = 0; return; }
            stallRef.current += 1;
            if (stallRef.current < 2) return;   // 文と文の間 (120ms) を事故と見なさない
            stallRef.current = 0;
            if (retryRef.current < 1) {
                retryRef.current += 1;
                speak(indexRef.current, true);
            } else {
                retryRef.current = 0;
                speak(Math.min(indexRef.current + 1, segsRef.current.length - 1), true);
            }
        }, 900);
        return () => window.clearInterval(id);
    }, [ready, speak]);

    // 別タブから戻ってきた時、止まっていたら続きから鳴らし直す
    useEffect(() => {
        if (!ready) return;
        const onVis = () => {
            if (document.hidden || !playingRef.current) return;
            const synth = window.speechSynthesis;
            if (synth.paused) { synth.resume(); return; }
            if (!synth.speaking && !synth.pending) speak(indexRef.current, true);
        };
        document.addEventListener('visibilitychange', onVis);
        return () => document.removeEventListener('visibilitychange', onVis);
    }, [ready, speak]);

    const toggle = useCallback(() => {
        if (playingRef.current) stop();
        else speak(indexRef.current);
    }, [speak, stop]);

    const step = useCallback((d: number) => {
        const next = Math.min(Math.max(indexRef.current + d, 0), segsRef.current.length - 1);
        if (playingRef.current) speak(next);
        else { indexRef.current = next; setIndex(next); }
    }, [speak]);

    const jumpSection = useCallback((s: TimesSection) => {
        const i = segsRef.current.findIndex((x) => x.section === s);
        if (i < 0) return;
        speak(i);
    }, [speak]);

    // ── キーボード ──
    useEffect(() => {
        if (!ready) return;
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement | null;
            if (t && /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(t.tagName)) return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.code === 'Space') { e.preventDefault(); toggle(); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [ready, toggle, step]);

    if (!ready || segments.length === 0) return null;

    const cur = segments[index];
    const sections = Array.from(new Set(segments.map((s) => s.section)));
    const pct = ((index + 1) / segments.length) * 100;

    return (
        <div className="no-print nt-tts-bar" style={{
            position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 40,
            backgroundColor: PAPER, borderTop: `3px double ${INK}`,
            boxShadow: '0 -6px 24px rgba(0,0,0,0.14)', color: INK,
        }}>
            {/* 進捗 */}
            <div style={{ height: '3px', backgroundColor: '#E7E5E4' }}>
                <div style={{ height: '100%', width: `${pct}%`, backgroundColor: GOLD, transition: 'width 0.2s ease' }} />
            </div>

            {open && (
                <div className="nt-tts-panel" style={{
                    padding: '10px 20px', borderBottom: '1px solid #E7E5E4', display: 'flex',
                    alignItems: 'center', gap: '18px', flexWrap: 'wrap', fontFamily: SERIF, fontSize: '12px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: MUTED, letterSpacing: '1px' }}>SPEED</span>
                        {RATES.map((r) => (
                            <button
                                key={r}
                                onClick={() => { setRate(r); rateRef.current = r; if (playingRef.current) speak(indexRef.current); }}
                                style={chip(rate === r)}
                            >{r}×</button>
                        ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: MUTED, letterSpacing: '1px' }}>VOICE</span>
                        <select
                            value={voiceName}
                            onChange={(e) => { setVoiceName(e.target.value); voiceRef.current = e.target.value; if (playingRef.current) speak(indexRef.current); }}
                            style={{ fontFamily: SERIF, fontSize: '12px', padding: '4px 8px', border: '1px solid #D6D3D1', borderRadius: '6px', background: '#fff', color: INK, maxWidth: '260px' }}
                        >
                            <option value="">自動 (端末の既定)</option>
                            {voices.map((v) => <option key={v.name} value={v.name}>{v.name} — {v.lang}</option>)}
                        </select>
                    </div>
                    <button onClick={() => { const n = !repeatOne; setRepeatOne(n); repeatRef.current = n; }} style={chip(repeatOne)}>
                        1文リピート
                    </button>
                    {/* 章ジャンプ。狭い画面では下段の chip 行を畳むので、こちらが受け皿になる */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                        <span style={{ color: MUTED, letterSpacing: '1px' }}>JUMP</span>
                        {sections.map((s) => (
                            <button key={s} onClick={() => jumpSection(s)} style={chip(cur.section === s)}>{SECTION_LABEL[s]}</button>
                        ))}
                    </div>
                    <span style={{ color: MUTED, fontSize: '11px' }}>Space=再生/停止 ・ ←→=1文戻る/進む</span>
                </div>
            )}

            <div className="nt-tts-row" style={{ padding: '9px 20px 11px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* 操作 */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <button onClick={() => step(-1)} style={ctrl} aria-label="1文戻る">‹</button>
                    <button
                        onClick={toggle}
                        aria-label={playing ? '停止' : '再生'}
                        style={{
                            ...ctrl, width: '52px', backgroundColor: playing ? INK : GOLD,
                            color: playing ? PAPER : INK, border: 'none', fontSize: '12px',
                            fontWeight: 700, letterSpacing: '1px', fontFamily: SERIF,
                        }}
                    >
                        {playing ? 'STOP' : 'PLAY'}
                    </button>
                    <button onClick={() => step(1)} style={ctrl} aria-label="1文進む">›</button>
                </div>

                {/* いま読んでいる文 */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: SERIF, fontSize: '9.5px', letterSpacing: '1.5px', color: KICKER, textTransform: 'uppercase', marginBottom: '2px' }}>
                        {SECTION_LABEL[cur.section]} · {index + 1} / {segments.length}
                    </div>
                    <div style={{
                        fontFamily: SERIF, fontSize: '14px', lineHeight: 1.35, color: INK,
                        overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    }}>
                        {cur.text}
                    </div>
                </div>

                {/* 章ジャンプ + 設定 */}
                <div className="nt-tts-jump" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {sections.map((s) => (
                        <button key={s} onClick={() => jumpSection(s)} style={chip(cur.section === s)}>{SECTION_LABEL[s]}</button>
                    ))}
                </div>
                <button onClick={() => setOpen((o) => !o)} style={chip(open)} aria-label="読み上げ設定">設定</button>
            </div>
        </div>
    );
}

const chip = (on: boolean): React.CSSProperties => ({
    fontFamily: SERIF, fontSize: '11px', letterSpacing: '0.5px', cursor: 'pointer',
    padding: '5px 10px', borderRadius: '6px', whiteSpace: 'nowrap',
    border: on ? `1px solid ${GOLD}` : '1px solid #D6D3D1',
    backgroundColor: on ? '#FBF1CE' : '#fff',
    color: on ? '#6B5410' : MUTED,
    fontWeight: on ? 700 : 500,
});

const ctrl: React.CSSProperties = {
    width: '34px', height: '38px', borderRadius: '8px', border: '1px solid #D6D3D1',
    background: '#fff', color: INK, fontSize: '20px', lineHeight: 1, cursor: 'pointer', fontWeight: 700,
};
