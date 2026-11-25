'use client';

/**
 * DEBATE ROOM — Pinker vs Hasan(Al Jazeera UpFront)を講師と一緒に見ながら学ぶページ。
 * 講師にはとにおラボの https://www.toniolab.com/english/debate を送る(iwasaki 側はパスワードの内側)。
 *
 * 中継ブースの作り:
 *  - 動画は YouTube IFrame API で置き、0.2秒ごとに再生位置を読む
 *  - 再生位置から「いまのラウンド」「いま話されている引用」を出す(引用の秒は字幕の単語の時刻から取った)
 *  - ラウンドの終わりで自動で止める(AUTO-STOP)/ いまの引用を 0.75倍で聞き直して止める(SLOW REPLAY)
 *  - 12ラウンドの帯(勝った側の色)で頭出し、採点表で「このページの判定」と「見ている人の判定」を並べる
 *  - 日本語は押すと英語、ALL ENGLISH で全体が英語。キーボード: Space / ← → / R / A / E
 * データは src/data/english/debate-pinker.ts と debate-pinker-en.ts。
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEBATE_META, DEBATE_ROUNDS, DEBATE_TAKEAWAYS, DEBATE_HOWTO, type DebateRound } from '@/data/english/debate-pinker';
import { DEBATE_EN, DEBATE_META_EN, type DebateRoundEn } from '@/data/english/debate-pinker-en';

const INK = '#14110F';
const SUB = '#6B645C';
const RULE = '#D9D2C3';
const PAPER = '#F6F3EC';
const CARD = '#FFFDF8';
const GOLD = '#D4AF37';
const GOLD_DEEP = '#9C7A1C';
const HASAN = '#9A3412';
const PINKER = '#1D4ED8';
const DRAW = '#8A8378';
const SERIF = '"Yu Mincho", "YuMincho", "Hiragino Mincho ProN", "Noto Serif JP", serif';
const ROMAN = 'Georgia, "Times New Roman", serif';
const COND = '"Barlow Condensed", "Arial Narrow", "Roboto Condensed", sans-serif';
const FALLBACK_LEN = 890;
const CARD_KEY = 'debate-pinker-card-v1';

type Side = 'pinker' | 'hasan' | 'draw';
const colorOf = (s: Side) => (s === 'pinker' ? PINKER : s === 'hasan' ? HASAN : DRAW);
const nameOf = (s: Side) => (s === 'pinker' ? 'PINKER' : s === 'hasan' ? 'HASAN' : 'DRAW');
const winnerOf = (v: string): Side => (v.startsWith('ピンカーの勝ち') ? 'pinker' : v.startsWith('司会の勝ち') ? 'hasan' : 'draw');

function mmss(s: number): string {
    const t = Math.max(0, Math.floor(s));
    return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
}

interface FlatLine { round: number; i: number; t: number; who: 'hasan' | 'pinker'; en: string; ja: string }
const FLAT: FlatLine[] = DEBATE_ROUNDS.flatMap((r) => r.lines.map((l, i) => ({ round: r.no, i, t: l.t ?? r.start, who: l.who, en: l.en, ja: l.ja })))
    .sort((a, b) => a.t - b.t);

const CSS = `
.db{min-height:100vh;background:${PAPER};color:${INK};font-feature-settings:"palt"}
.db *{box-sizing:border-box}
.db button{font-family:inherit}
.db-top{border-bottom:3px solid ${INK};background:${PAPER}}
.db-strip{max-width:1320px;margin:0 auto;padding:10px 20px;display:flex;justify-content:space-between;align-items:center;gap:12px;font-family:${COND};font-size:13px;letter-spacing:.22em;font-weight:700;text-transform:uppercase}
.db-strip .l{display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.db-strip .dot{width:8px;height:8px;background:${HASAN};display:inline-block}
.db-strip .live .dot{animation:blink 1s steps(2) infinite}
@keyframes blink{50%{opacity:0}}
.db-lang{border:2px solid ${INK};background:transparent;color:${INK};font-family:${COND};font-weight:800;font-size:13px;letter-spacing:.14em;padding:5px 12px;cursor:pointer;text-transform:uppercase}
.db-lang.on{background:${INK};color:${PAPER}}

.db-card{max-width:1320px;margin:0 auto;padding:22px 20px 18px;display:grid;grid-template-columns:1fr auto 1fr;gap:0;align-items:stretch}
.db-fighter{padding:6px 18px 8px;position:relative}
.db-fighter.p{border-right:0;text-align:left}
.db-fighter.h{text-align:right}
.db-fighter .nm{font-family:${COND};font-weight:800;font-size:clamp(48px,9vw,112px);line-height:.86;letter-spacing:-.01em;text-transform:uppercase}
.db-fighter .first{font-family:${ROMAN};font-style:italic;font-size:clamp(15px,1.6vw,19px);color:${SUB};margin-bottom:4px}
.db-fighter .bio{font-size:12.5px;line-height:1.75;color:#3F3A34;margin-top:10px;max-width:440px}
.db-fighter.h .bio{margin-left:auto}
.db-fighter .rec{font-family:${COND};font-size:14px;letter-spacing:.16em;font-weight:700;margin-top:10px}
.db-fighter .rec b{font-size:40px;letter-spacing:0;line-height:1;margin-right:6px;vertical-align:-6px}
.db-vs{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 10px;min-width:120px}
.db-vs .band{background:${INK};color:${PAPER};font-family:${ROMAN};font-style:italic;font-size:34px;padding:6px 18px 8px;transform:skewX(-14deg)}
.db-vs .band span{display:inline-block;transform:skewX(14deg)}
.db-vs .draws{font-family:${COND};font-size:12px;letter-spacing:.2em;font-weight:700;color:${DRAW};margin-top:10px;text-align:center}
.db-lede{max-width:1320px;margin:0 auto;padding:0 20px 18px;font-size:14px;line-height:1.9;color:#3F3A34}
.db-lede > div{border-top:1px solid ${RULE};padding-top:12px;max-width:820px}

.db-main{max-width:1320px;margin:0 auto;padding:0 20px 120px;display:grid;grid-template-columns:minmax(0,560px) minmax(0,1fr);gap:28px;align-items:start}
.db-booth{position:sticky;top:0;padding-top:16px;z-index:4;background:${PAPER}}
.db-video{position:relative;width:100%;aspect-ratio:16/9;background:#000;outline:3px solid ${INK}}
.db-video > div, .db-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.db-onair{background:${INK};color:${PAPER};padding:12px 14px 14px;margin-top:3px;position:relative;overflow:hidden}
.db-onair .rn{position:absolute;right:-6px;top:-18px;font-family:${COND};font-weight:800;font-size:120px;line-height:1;color:transparent;-webkit-text-stroke:1px rgba(246,243,236,.22);pointer-events:none;user-select:none}
.db-onair .lab{font-family:${COND};font-size:12px;letter-spacing:.22em;font-weight:700;color:${GOLD};display:flex;gap:10px;align-items:center;position:relative}
.db-onair .ttl{font-family:${SERIF};font-size:15.5px;font-weight:700;margin-top:4px;line-height:1.5;position:relative;max-width:420px}
.db-quote{margin-top:10px;border-left:4px solid;padding:2px 0 2px 12px;position:relative;min-height:62px}
.db-quote .who{font-family:${COND};font-size:12px;letter-spacing:.2em;font-weight:800}
.db-quote .en{font-family:${ROMAN};font-size:18px;line-height:1.5;margin-top:2px}
.db-quote .ja{font-size:12px;color:#BDB5A8;margin-top:3px;line-height:1.6}
.db-quote.idle .en{color:#8E877C;font-style:italic;font-size:15px}
.db-ctrl{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;margin-top:3px}
.db-ctrl button{background:${CARD};border:0;border-bottom:3px solid ${RULE};padding:10px 4px 8px;cursor:pointer;font-family:${COND};font-weight:800;font-size:14px;letter-spacing:.1em;color:${INK};text-transform:uppercase;line-height:1.1}
.db-ctrl button small{display:block;font-family:inherit;font-weight:600;font-size:10px;letter-spacing:.08em;color:${SUB};margin-top:2px;text-transform:none}
.db-ctrl button:hover{border-bottom-color:${GOLD}}
.db-ctrl button.main{background:${GOLD};border-bottom-color:${GOLD_DEEP}}
.db-ctrl button.on{border-bottom-color:${HASAN};color:${HASAN}}
.db-tl{margin-top:12px}
.db-tl .bar{position:relative;display:flex;height:40px;cursor:pointer;background:${CARD};outline:1px solid ${RULE}}
.db-tl .seg{position:relative;height:100%;border-right:1px solid ${PAPER};display:flex;align-items:flex-end;padding:0 0 3px 4px;font-family:${COND};font-weight:800;font-size:13px;overflow:hidden;transition:filter .15s ease}
.db-tl .seg:hover{filter:brightness(.93)}
.db-tl .seg.cur{outline:2px solid ${INK};outline-offset:-2px;z-index:1}
.db-tl .head{position:absolute;top:-4px;bottom:-4px;width:2px;background:${INK};pointer-events:none;z-index:2}
.db-tl .head:after{content:"";position:absolute;top:-5px;left:-4px;border:5px solid transparent;border-top-color:${INK}}
.db-tl .ax{display:flex;justify-content:space-between;font-family:${COND};font-size:11px;letter-spacing:.12em;color:${SUB};margin-top:4px;font-weight:600}
.db-score{margin-top:12px;background:${CARD};outline:1px solid ${RULE};padding:10px 12px 12px}
.db-score .hd{display:flex;justify-content:space-between;align-items:baseline;font-family:${COND};font-size:12px;letter-spacing:.2em;font-weight:800}
.db-score table{width:100%;border-collapse:collapse;margin-top:6px;table-layout:fixed}
.db-score th,.db-score td{font-family:${COND};text-align:center;padding:3px 0;font-size:12px;font-weight:700}
.db-score th{color:${SUB};font-weight:600}
.db-score td.k{text-align:left;width:68px;font-size:11px;letter-spacing:.1em;color:${SUB}}
.db-score .mk{display:inline-block;width:22px;height:22px;line-height:22px;color:#fff;font-size:12px}
.db-score button.mk{border:1px dashed ${RULE};background:transparent;color:${SUB};cursor:pointer;padding:0}
.db-score button.mk.set{border:0;color:#fff}
.db-score .tot{display:flex;gap:16px;margin-top:8px;font-family:${COND};font-size:13px;letter-spacing:.08em;font-weight:700;flex-wrap:wrap}
.db-keys{font-family:${COND};font-size:11.5px;letter-spacing:.08em;color:${SUB};margin-top:8px;line-height:1.7}
.db-keys kbd{font-family:inherit;border:1px solid ${RULE};border-bottom-width:2px;padding:0 5px;margin:0 2px;background:${CARD};color:${INK};font-weight:700}

.db-feed{padding-top:16px;min-width:0}
.db-sech{display:flex;align-items:baseline;gap:14px;border-bottom:3px solid ${INK};padding-bottom:6px;margin:34px 0 14px}
.db-sech:first-child{margin-top:0}
.db-sech .en{font-family:${COND};font-size:30px;font-weight:800;letter-spacing:.02em;line-height:1}
.db-sech .ja{font-family:${SERIF};font-size:14px;font-weight:700;color:${SUB}}
.db-howto{margin:0;padding:0;list-style:none;counter-reset:s;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:0;border-top:1px solid ${RULE};border-left:1px solid ${RULE}}
.db-howto li{counter-increment:s;font-size:13px;line-height:1.75;padding:10px 12px 12px;border-right:1px solid ${RULE};border-bottom:1px solid ${RULE};background:${CARD}}
.db-howto li:before{content:counter(s,decimal-leading-zero);display:block;font-family:${COND};font-weight:800;font-size:22px;color:${GOLD_DEEP};line-height:1;margin-bottom:4px}
.db-link{font-size:12px;color:${SUB};margin-top:10px;overflow-wrap:anywhere}

.db-round{position:relative;background:${CARD};margin-top:22px;padding:0 0 16px;scroll-margin-top:16px;outline:1px solid ${RULE};transition:outline-color .2s ease}
.db-round.on{outline:3px solid ${INK}}
.db-rbig{position:absolute;right:10px;top:-34px;font-family:${COND};font-weight:800;font-size:110px;line-height:1;color:transparent;-webkit-text-stroke:1.5px ${RULE};pointer-events:none;user-select:none}
.db-round.on .db-rbig{-webkit-text-stroke-color:${GOLD}}
.db-rhead{padding:14px 18px 0;position:relative}
.db-rno{display:flex;gap:10px;align-items:center;font-family:${COND};font-size:13px;letter-spacing:.2em;font-weight:800}
.db-rno .win{color:#fff;padding:1px 8px;letter-spacing:.14em}
.db-rtitle{font-family:${SERIF};font-size:21px;font-weight:700;line-height:1.45;margin-top:6px;max-width:560px}
.db-rtopic{font-size:12.5px;color:${SUB};margin-top:4px;line-height:1.7;max-width:600px}
.db-rplay{margin-top:10px;display:flex;gap:6px;flex-wrap:wrap}
.db-rplay button{border:2px solid ${INK};background:${INK};color:${PAPER};font-family:${COND};font-weight:800;font-size:14px;letter-spacing:.12em;padding:6px 12px;cursor:pointer}
.db-rplay button.ghost{background:transparent;color:${INK}}
.db-ad{display:grid;grid-template-columns:1fr 1fr;margin-top:14px;position:relative}
.db-ad > div{padding:12px 18px 12px;font-size:12.8px;line-height:1.8}
.db-ad .a{background:#F8EDE6;clip-path:polygon(0 0,100% 0,calc(100% - 14px) 100%,0 100%);padding-right:28px}
.db-ad .d{background:#E9EEFB;clip-path:polygon(14px 0,100% 0,100% 100%,0 100%);margin-left:-10px;padding-left:28px}
.db-ad b{display:block;font-family:${COND};font-size:13px;letter-spacing:.18em;margin-bottom:3px}
.db-lines{margin:12px 18px 0}
.db-line{display:grid;grid-template-columns:52px 1fr;gap:12px;padding:9px 0;border-top:1px solid ${RULE};transition:background .2s ease}
.db-line.live{background:linear-gradient(90deg,rgba(212,175,55,.18),rgba(212,175,55,0) 70%)}
.db-ts{border:0;background:transparent;cursor:pointer;text-align:left;padding:0;font-family:${COND};font-weight:800;font-size:13px;letter-spacing:.06em}
.db-ts span{display:block;font-size:15px;letter-spacing:.02em;color:${INK}}
.db-ts:hover span{text-decoration:underline}
.db-en{font-family:${ROMAN};font-size:16.5px;line-height:1.55;overflow-wrap:anywhere}
.db-ja{font-size:12.5px;color:${SUB};margin-top:2px;line-height:1.6}
.db-moves{margin:14px 18px 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}
.db-move{padding:2px 0 2px 10px;border-left:3px solid;font-size:12.3px;line-height:1.7}
.db-move b{display:block;font-size:13px}
.db-move .w{font-family:${COND};font-size:11px;letter-spacing:.18em;font-weight:800}
.db-phr{margin:14px 18px 0}
.db-phr table{width:100%;border-collapse:collapse;font-size:13px}
.db-phr td{border-top:1px solid ${RULE};padding:7px 6px 7px 0;vertical-align:top;line-height:1.6}
.db-phr td:first-child{font-family:${ROMAN};font-size:15px;width:40%;overflow-wrap:anywhere}
.db-phr td:last-child{color:${SUB};font-size:12px}
.db-foot{display:grid;grid-template-columns:1.15fr 1fr;gap:0;margin:14px 18px 0}
.db-say{background:${INK};color:${PAPER};padding:12px 14px}
.db-ask{border:2px solid ${INK};padding:10px 12px}
.db-say .k,.db-ask .k{font-family:${COND};font-size:12px;font-weight:800;letter-spacing:.18em}
.db-say .k{color:${GOLD}}
.db-say .v,.db-ask .v{font-family:${ROMAN};font-size:16px;line-height:1.5;margin-top:4px;overflow-wrap:anywhere}
.db-verdict{margin:14px 18px 0;display:flex;gap:16px;align-items:center}
.db-stamp{flex-shrink:0;border:3px solid;padding:4px 10px 3px;font-family:${COND};font-weight:800;font-size:20px;letter-spacing:.12em;transform:rotate(-7deg);line-height:1;opacity:.9}
.db-stamp small{display:block;font-size:10px;letter-spacing:.24em;text-align:center}
.db-verdict p{margin:0;font-size:12.8px;line-height:1.75;color:#3F3A34}
.db-kit{display:grid;grid-template-columns:1fr 1fr;gap:0}
.db-kit > div{padding:14px 16px;background:${CARD};outline:1px solid ${RULE}}
.db-kit h3{margin:0 0 8px;font-family:${COND};font-size:20px;letter-spacing:.06em}
.db-kit ul{margin:0;padding-left:18px;font-size:13px;line-height:1.85}
.db-take{background:${CARD};border-left:6px solid ${GOLD};padding:14px 18px;margin:0}
.db-take li{font-size:13.5px;line-height:1.85;overflow-wrap:anywhere;margin-left:4px}
.bi{cursor:pointer;border-bottom:1px dotted rgba(156,122,28,.6);transition:background .15s ease}
.bi:hover{background:rgba(212,175,55,.16)}
.bi.en{font-family:${ROMAN};border-bottom-style:solid;border-bottom-color:rgba(29,78,216,.45)}
.db-onair .bi{border-bottom-color:rgba(246,243,236,.35)}

@media (max-width:1000px){
  .db-main{grid-template-columns:minmax(0,1fr);gap:0}
  .db-booth{display:contents}
  .db-vidwrap{position:sticky;top:0;z-index:6;background:${PAPER};padding-top:8px}
  .db-feed{padding-top:8px}
}
@media (max-width:640px){
  .db-strip{padding:8px 14px;font-size:11px;letter-spacing:.16em}
  .db-strip .hide-s{display:none}
  .db-card{grid-template-columns:1fr auto 1fr;padding:16px 8px 12px}
  .db-fighter{padding:4px 6px}
  .db-fighter .bio{display:none}
  .db-fighter .rec b{font-size:30px}
  .db-vs{min-width:0;padding:0 2px}
  .db-vs .band{font-size:22px;padding:4px 10px 6px}
  .db-lede,.db-main{padding-left:14px;padding-right:14px}
  .db-ad,.db-foot,.db-kit{grid-template-columns:1fr}
  .db-ad .a,.db-ad .d{clip-path:none;margin-left:0;padding:10px 14px}
  .db-rhead{padding:12px 14px 0}
  .db-lines,.db-moves,.db-phr,.db-foot,.db-verdict{margin-left:14px;margin-right:14px}
  .db-line{grid-template-columns:44px 1fr;gap:8px}
  .db-rbig{font-size:80px;top:-24px}
  .db-quote .en{font-size:16px}
  .db-ctrl button{font-size:12px;letter-spacing:.06em}
  .db-ctrl button small{display:none}
  .db-sech .en{font-size:24px}
  .db-phr tr{display:block;border-top:1px solid ${RULE};padding:7px 0}
  .db-phr td{display:block;border:0;padding:0;width:auto !important}
  .db-phr td:nth-child(2){font-size:12.5px;margin-top:1px}
  .db-phr td:last-child{margin-top:3px}
}
`;

/** 日本語を押すと英語に、もう一度押すと日本語に戻る。ALL ENGLISH で全体が切り替わる */
const EnCtx = createContext(false);

function Bi({ ja, en, block = false }: { ja: string; en?: string; block?: boolean }) {
    const all = useContext(EnCtx);
    const [flip, setFlip] = useState(false);
    if (!en) return <>{ja}</>;
    const showEn = flip ? !all : all;
    const Tag = block ? 'div' : 'span';
    return (
        <Tag
            className={`bi${showEn ? ' en' : ''}`}
            onClick={(e) => { e.stopPropagation(); setFlip((f) => !f); }}
            title={showEn ? '押すと日本語' : 'Tap for English'}
        >
            {showEn ? en : ja}
        </Tag>
    );
}

/* ---------- YouTube IFrame API(型は使う分だけ) ---------- */
interface YTPlayer {
    seekTo(s: number, allow: boolean): void;
    playVideo(): void;
    pauseVideo(): void;
    getCurrentTime(): number;
    getDuration(): number;
    getPlayerState(): number;
    setPlaybackRate(r: number): void;
    destroy(): void;
}
// window の型は広げない(/english/youtube が別の形で同じ名前を宣言しているため)。ここだけで読む
interface YTWindow {
    YT?: { Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer };
    onYouTubeIframeAPIReady?: () => void;
}
const ytWin = () => window as unknown as YTWindow;

function useYouTube(videoId: string) {
    const hostRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<YTPlayer | null>(null);
    const [ready, setReady] = useState(false);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;
        // YT.Player は渡した要素を iframe に置き換える。React の管理する div を渡さず、中に作った div を渡す
        const mount = document.createElement('div');
        host.appendChild(mount);
        let cancelled = false;
        const make = () => {
            const w = ytWin();
            if (cancelled || !w.YT) return;
            playerRef.current = new w.YT.Player(mount, {
                videoId,
                playerVars: { rel: 0, modestbranding: 1, playsinline: 1 },
                events: {
                    onReady: () => setReady(true),
                    onStateChange: (e: { data: number }) => setPlaying(e.data === 1),
                },
            });
        };
        if (ytWin().YT?.Player) make();
        else {
            const w = ytWin();
            const prev = w.onYouTubeIframeAPIReady;
            w.onYouTubeIframeAPIReady = () => { prev?.(); make(); };
            if (!document.getElementById('yt-iframe-api')) {
                const s = document.createElement('script');
                s.id = 'yt-iframe-api';
                s.src = 'https://www.youtube.com/iframe_api';
                document.head.appendChild(s);
            }
        }
        return () => {
            cancelled = true;
            try { playerRef.current?.destroy(); } catch { /* 破棄済み */ }
            playerRef.current = null;
            host.innerHTML = '';
        };
    }, [videoId]);

    return { hostRef, playerRef, ready, playing };
}

function loadCard(): Record<number, Side> {
    try {
        const raw = window.localStorage.getItem(CARD_KEY);
        return raw ? (JSON.parse(raw) as Record<number, Side>) : {};
    } catch { return {}; }
}
function saveCard(c: Record<number, Side>) {
    try { window.localStorage.setItem(CARD_KEY, JSON.stringify(c)); } catch { /* 保存できない環境では表示だけ */ }
}

export default function DebatePage() {
    const { hostRef, playerRef, ready, playing } = useYouTube(DEBATE_META.youtubeId);
    const [t, setT] = useState(0);
    const [len, setLen] = useState(FALLBACK_LEN);
    const [allEn, setAllEn] = useState(false);
    const [autoStop, setAutoStop] = useState(true);
    const [card, setCard] = useState<Record<number, Side>>({});
    const stoppedRef = useRef<number | null>(null);
    const slowUntilRef = useRef<number | null>(null);
    const E = DEBATE_META_EN;

    useEffect(() => { setCard(loadCard()); }, []);

    const ends = useMemo(() => DEBATE_ROUNDS.map((r, i) => DEBATE_ROUNDS[i + 1]?.start ?? len), [len]);
    const roundAt = useCallback((s: number) => {
        let cur = DEBATE_ROUNDS[0];
        for (const r of DEBATE_ROUNDS) if (s >= r.start - 0.5) cur = r;
        return cur;
    }, []);
    const current = roundAt(t);
    const curEnd = ends[DEBATE_ROUNDS.indexOf(current)];
    const started = t > 0.5;

    const liveLine = useMemo(() => {
        let hit: FlatLine | null = null;
        for (const l of FLAT) if (l.t <= t + 0.2) hit = l;
        // 前のラウンドの引用を、次のラウンドの見出しの下に残さない
        if (!hit || hit.round !== current.no) return null;
        // 次の引用まで、または言い始めから25秒までを「いま」とする
        const next = FLAT.find((l) => l.t > hit!.t);
        const until = Math.min(next ? next.t : Infinity, hit.t + 25);
        return t < until ? hit : null;
    }, [t, current.no]);

    // 0.2秒ごとに再生位置を読む。自動停止と、ゆっくり再生の戻しもここで
    useEffect(() => {
        if (!ready) return;
        const p = playerRef.current;
        if (!p) return;
        const d = p.getDuration();
        if (d > 0) setLen(d);
        const id = window.setInterval(() => {
            const pl = playerRef.current;
            if (!pl) return;
            const now = pl.getCurrentTime();
            setT(now);
            const state = pl.getPlayerState();
            if (slowUntilRef.current != null && now >= slowUntilRef.current) {
                slowUntilRef.current = null;
                pl.setPlaybackRate(1);
                pl.pauseVideo();
                return;
            }
            if (autoStop && state === 1 && slowUntilRef.current == null) {
                const r = roundAt(now);
                const idx = DEBATE_ROUNDS.indexOf(r);
                const end = DEBATE_ROUNDS[idx + 1]?.start;
                if (end != null) {
                    if (now < end - 2.5 && stoppedRef.current === r.no) stoppedRef.current = null;
                    if (now >= end - 0.6 && stoppedRef.current !== r.no) {
                        stoppedRef.current = r.no;
                        pl.pauseVideo();
                    }
                }
            }
        }, 200);
        return () => window.clearInterval(id);
    }, [ready, autoStop, playerRef, roundAt]);

    const seek = useCallback((s: number, andPlay = true) => {
        const p = playerRef.current;
        if (!p) return;
        slowUntilRef.current = null;
        p.setPlaybackRate(1);
        p.seekTo(Math.max(0, s), true);
        if (andPlay) p.playVideo();
        setT(s);
    }, [playerRef]);

    const playRound = useCallback((r: DebateRound) => {
        stoppedRef.current = null;
        seek(r.start);
    }, [seek]);

    const togglePlay = useCallback(() => {
        const p = playerRef.current;
        if (!p) return;
        if (p.getPlayerState() === 1) p.pauseVideo();
        else {
            // 自動で止まった所から再開するときは、次のラウンドへそのまま進む
            p.playVideo();
        }
    }, [playerRef]);

    const stepRound = useCallback((dir: 1 | -1) => {
        const idx = DEBATE_ROUNDS.indexOf(roundAt(t));
        const target = DEBATE_ROUNDS[Math.min(DEBATE_ROUNDS.length - 1, Math.max(0, idx + dir))];
        playRound(target);
    }, [t, roundAt, playRound]);

    const slowReplay = useCallback(() => {
        const p = playerRef.current;
        if (!p) return;
        let target: FlatLine | null = null;
        for (const l of FLAT) if (l.t <= t + 0.2) target = l;
        if (!target) target = FLAT[0];
        const next = FLAT.find((l) => l.t > target!.t);
        const until = Math.min(next ? next.t : target.t + 10, target.t + 14);
        p.seekTo(Math.max(0, target.t - 0.4), true);
        p.setPlaybackRate(0.75);
        p.playVideo();
        slowUntilRef.current = until;
    }, [playerRef, t]);

    const back5 = useCallback(() => {
        const p = playerRef.current;
        if (!p) return;
        p.seekTo(Math.max(0, p.getCurrentTime() - 5), true);
    }, [playerRef]);

    // キーボード(講師と画面共有しながら手元で操作する用)
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const el = e.target as HTMLElement | null;
            if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
            if (e.metaKey || e.ctrlKey || e.altKey) return;
            if (e.key === ' ') { e.preventDefault(); togglePlay(); }
            else if (e.key === 'ArrowRight') { e.preventDefault(); stepRound(1); }
            else if (e.key === 'ArrowLeft') { e.preventDefault(); stepRound(-1); }
            else if (e.key === 'r' || e.key === 'R') slowReplay();
            else if (e.key === 'a' || e.key === 'A') setAutoStop((v) => !v);
            else if (e.key === 'e' || e.key === 'E') setAllEn((v) => !v);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [togglePlay, stepRound, slowReplay]);

    // 再生中のラウンドを、右の列で見える所へ
    const lastScrolled = useRef<number | null>(null);
    useEffect(() => {
        if (!playing || lastScrolled.current === current.no) return;
        lastScrolled.current = current.no;
        const el = document.getElementById(`round-${current.no}`);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top > window.innerHeight * 0.7 || r.bottom < 80) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [playing, current.no]);

    const vote = (no: number) => {
        setCard((c) => {
            const order: (Side | undefined)[] = [undefined, 'pinker', 'draw', 'hasan'];
            const nextSide = order[(order.indexOf(c[no]) + 1) % order.length];
            const n = { ...c };
            if (nextSide) n[no] = nextSide; else delete n[no];
            saveCard(n);
            return n;
        });
    };

    const pageTally = { pinker: 0, hasan: 0, draw: 0 } as Record<Side, number>;
    DEBATE_ROUNDS.forEach((r) => { pageTally[winnerOf(r.verdict)]++; });
    const yourTally = { pinker: 0, hasan: 0, draw: 0 } as Record<Side, number>;
    Object.values(card).forEach((s) => { yourTally[s]++; });
    const yourCount = Object.keys(card).length;
    const agree = DEBATE_ROUNDS.filter((r) => card[r.no] && card[r.no] === winnerOf(r.verdict)).length;

    return (
        <EnCtx.Provider value={allEn}>
            <div className="db">
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&display=swap" />
                <style>{CSS}</style>

                <header className="db-top">
                    <div className="db-strip">
                        <div className="l">
                            <span className={playing ? 'live' : ''}><span className="dot" /> {playing ? 'ON AIR' : 'DEBATE ROOM'}</span>
                            <span className="hide-s">UPFRONT / AL JAZEERA ENGLISH</span>
                            <span className="hide-s" style={{ color: SUB }}>{mmss(t)} / {mmss(len)}</span>
                        </div>
                        <button className={`db-lang${allEn ? ' on' : ''}`} onClick={() => setAllEn((v) => !v)}>
                            {allEn ? '日本語' : 'All English'}
                        </button>
                    </div>
                </header>

                <section className="db-card" aria-label="対戦カード">
                    <div className="db-fighter p">
                        <div className="first">Steven</div>
                        <div className="nm" style={{ color: PINKER }}>Pinker</div>
                        <div className="rec" style={{ color: PINKER }}><b>{pageTally.pinker}</b>ROUNDS</div>
                        <div className="bio"><Bi ja={DEBATE_META.pinker.replace('Steven Pinker — ', '')} en={E.pinker} /></div>
                    </div>
                    <div className="db-vs">
                        <div className="band"><span>vs</span></div>
                        <div className="draws">DRAWS {pageTally.draw}</div>
                    </div>
                    <div className="db-fighter h">
                        <div className="first">Mehdi</div>
                        <div className="nm" style={{ color: HASAN }}>Hasan</div>
                        <div className="rec" style={{ color: HASAN }}><b>{pageTally.hasan}</b>ROUNDS</div>
                        <div className="bio"><Bi ja={DEBATE_META.hasan.replace('Mehdi Hasan — ', '')} en={E.hasan} /></div>
                    </div>
                </section>
                <div className="db-lede"><div><Bi ja={DEBATE_META.oneLine} en={E.oneLine} /></div></div>

                <div className="db-main">
                    {/* ---------- 左: 中継ブース ---------- */}
                    <aside className="db-booth">
                        <div className="db-vidwrap">
                            <div className="db-video"><div ref={hostRef} /></div>
                        </div>
                        <div className="db-onair">
                            <div className="rn" aria-hidden>{String(current.no).padStart(2, '0')}</div>
                            <div className="lab">
                                <span>ROUND {current.no} / {DEBATE_ROUNDS.length}</span>
                                <span style={{ color: '#BDB5A8' }}>{mmss(current.start)}–{mmss(curEnd)}</span>
                            </div>
                            <div className="ttl"><Bi ja={current.title} en={DEBATE_EN[current.no]?.title} /></div>
                            {liveLine && started ? (
                                <div className="db-quote" style={{ borderColor: liveLine.who === 'hasan' ? '#E07A4F' : '#7EA1F5' }}>
                                    <div className="who" style={{ color: liveLine.who === 'hasan' ? '#E07A4F' : '#7EA1F5' }}>{liveLine.who === 'hasan' ? 'HASAN' : 'PINKER'}</div>
                                    <div className="en">{liveLine.en}</div>
                                    <div className="ja">{liveLine.ja}</div>
                                </div>
                            ) : (
                                <div className="db-quote idle" style={{ borderColor: '#4A443D' }}>
                                    <div className="who" style={{ color: '#8E877C' }}>{started ? 'BETWEEN THE LINES' : 'STAND BY'}</div>
                                    <div className="en">{started ? 'Listen for the next key line.' : 'Pick a round, or press Space.'}</div>
                                </div>
                            )}
                        </div>
                        <div className="db-ctrl">
                            <button onClick={() => stepRound(-1)} aria-label="前のラウンド">Prev<small>前のラウンド</small></button>
                            <button onClick={back5} aria-label="5秒戻る">−5s<small>5秒戻る</small></button>
                            <button className="main" onClick={togglePlay}>{playing ? 'Pause' : 'Play'}<small>{playing ? '止める' : '再生'}</small></button>
                            <button onClick={slowReplay}>Slow<small>今の一言 0.75倍</small></button>
                            <button onClick={() => stepRound(1)} aria-label="次のラウンド">Next<small>次のラウンド</small></button>
                        </div>
                        <div className="db-ctrl" style={{ gridTemplateColumns: '1fr' }}>
                            <button className={autoStop ? 'on' : ''} onClick={() => setAutoStop((v) => !v)}>
                                Auto-stop {autoStop ? 'on' : 'off'}<small>{autoStop ? 'ラウンドの終わりで止まる。止まったら下の2つを言う' : '止まらずに最後まで流す'}</small>
                            </button>
                        </div>

                        <div className="db-tl">
                            <div
                                className="bar"
                                onClick={(e) => {
                                    if ((e.target as HTMLElement).closest('.seg')) return;
                                    const b = e.currentTarget.getBoundingClientRect();
                                    seek(((e.clientX - b.left) / b.width) * len);
                                }}
                            >
                                {DEBATE_ROUNDS.map((r, i) => {
                                    const w = winnerOf(r.verdict);
                                    const width = ((ends[i] - r.start) / len) * 100;
                                    return (
                                        <div
                                            key={r.no}
                                            className={`seg${r.no === current.no && started ? ' cur' : ''}`}
                                            style={{ width: `${width}%`, background: w === 'pinker' ? '#D6E0FA' : w === 'hasan' ? '#F3D9CC' : '#E7E2D8', color: colorOf(w) }}
                                            title={`ROUND ${r.no} ${mmss(r.start)} — ${nameOf(w)}`}
                                            onClick={() => playRound(r)}
                                        >
                                            {r.no}
                                        </div>
                                    );
                                })}
                                {(() => {
                                    const first = DEBATE_ROUNDS[0].start;
                                    return <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${(first / len) * 100}%`, background: PAPER }} />;
                                })()}
                                <div className="head" style={{ left: `${Math.min(100, (t / len) * 100)}%` }} />
                            </div>
                            <div className="ax"><span>0:00</span><span>色 = このページの判定(青 PINKER / 赤 HASAN / 灰 DRAW)</span><span>{mmss(len)}</span></div>
                        </div>

                        <div className="db-score">
                            <div className="hd"><span>SCORECARD</span><span style={{ color: SUB, fontWeight: 600, letterSpacing: '.08em' }}>下の段を押して自分の判定(先生の判定でも)</span></div>
                            <table>
                                <thead>
                                    <tr><th className="k" />{DEBATE_ROUNDS.map((r) => <th key={r.no}>{r.no}</th>)}</tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="k">THIS PAGE</td>
                                        {DEBATE_ROUNDS.map((r) => {
                                            const w = winnerOf(r.verdict);
                                            return <td key={r.no}><span className="mk" style={{ background: colorOf(w) }}>{w === 'draw' ? '–' : nameOf(w)[0]}</span></td>;
                                        })}
                                    </tr>
                                    <tr>
                                        <td className="k">YOUR CALL</td>
                                        {DEBATE_ROUNDS.map((r) => {
                                            const s = card[r.no];
                                            return (
                                                <td key={r.no}>
                                                    <button
                                                        className={`mk${s ? ' set' : ''}`}
                                                        style={s ? { background: colorOf(s) } : undefined}
                                                        onClick={() => vote(r.no)}
                                                        aria-label={`ラウンド${r.no}の判定`}
                                                    >
                                                        {s ? (s === 'draw' ? '–' : nameOf(s)[0]) : '?'}
                                                    </button>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                            <div className="tot">
                                <span style={{ color: PINKER }}>PINKER {yourTally.pinker}</span>
                                <span style={{ color: HASAN }}>HASAN {yourTally.hasan}</span>
                                <span style={{ color: DRAW }}>DRAW {yourTally.draw}</span>
                                <span style={{ color: SUB }}>{yourCount > 0 ? `このページと一致 ${agree}/${yourCount}` : '押すたびに P → – → H → 空'}</span>
                            </div>
                        </div>
                        <div className="db-keys">
                            <kbd>Space</kbd>再生/停止 <kbd>←</kbd><kbd>→</kbd>ラウンド <kbd>R</kbd>今の一言をゆっくり <kbd>A</kbd>自動停止 <kbd>E</kbd>全部英語
                        </div>
                    </aside>

                    {/* ---------- 右: ラウンドの記事 ---------- */}
                    <main className="db-feed">
                        <div className="db-sech"><span className="en">HOW TO</span><span className="ja">先生との進め方</span></div>
                        <ol className="db-howto">
                            {DEBATE_HOWTO.map((x, i) => <li key={x}><Bi ja={x} en={E.howto[i]} /></li>)}
                        </ol>
                        <div className="db-link">講師に送るリンク: https://www.toniolab.com/english/debate ・ 動画: {DEBATE_META.url}</div>

                        <div className="db-sech"><span className="en">12 ROUNDS</span><span className="ja">攻めと受けの1往復ずつ</span></div>
                        {DEBATE_ROUNDS.map((r, i) => (
                            <Round
                                key={r.no}
                                r={r}
                                en={DEBATE_EN[r.no]}
                                end={ends[i]}
                                on={started && r.no === current.no}
                                liveKey={liveLine ? `${liveLine.round}-${liveLine.i}` : null}
                                onPlay={() => playRound(r)}
                                onSeek={seek}
                            />
                        ))}

                        <div className="db-sech"><span className="en">TOOLKITS</span><span className="ja">2人の技</span></div>
                        <div style={{ fontSize: 13.5, marginBottom: 12 }}><Bi ja={DEBATE_TAKEAWAYS.score} en={E.score} /></div>
                        <div className="db-kit">
                            <div style={{ borderTop: `4px solid ${HASAN}` }}>
                                <h3 style={{ color: HASAN }}>HASAN — <Bi ja="攻める技" en="how he attacks" /></h3>
                                <ul>{DEBATE_TAKEAWAYS.hasanKit.map((x, i) => <li key={x}><Bi ja={x} en={E.hasanKit[i]} /></li>)}</ul>
                            </div>
                            <div style={{ borderTop: `4px solid ${PINKER}` }}>
                                <h3 style={{ color: PINKER }}>PINKER — <Bi ja="受ける技" en="how he defends" /></h3>
                                <ul>{DEBATE_TAKEAWAYS.pinkerKit.map((x, i) => <li key={x}><Bi ja={x} en={E.pinkerKit[i]} /></li>)}</ul>
                            </div>
                        </div>

                        <div className="db-sech"><span className="en">FOR THE EIKEN</span><span className="ja"><Bi ja="テーマ2(貧困)に持ち帰る" en={E.forTheme2} /></span></div>
                        <ul className="db-take">
                            {DEBATE_TAKEAWAYS.forTheme2.map((x) => <li key={x}>{x}</li>)}
                        </ul>
                    </main>
                </div>
            </div>
        </EnCtx.Provider>
    );
}

function Round({ r, en, end, on, liveKey, onPlay, onSeek }: {
    r: DebateRound; en?: DebateRoundEn; end: number; on: boolean; liveKey: string | null;
    onPlay: () => void; onSeek: (s: number) => void;
}) {
    const L = DEBATE_META_EN.roundLabels;
    const w = winnerOf(r.verdict);
    return (
        <article className={`db-round${on ? ' on' : ''}`} id={`round-${r.no}`}>
            <div className="db-rbig" aria-hidden>{String(r.no).padStart(2, '0')}</div>
            <div className="db-rhead">
                <div className="db-rno">
                    <span>ROUND {r.no}</span>
                    <span style={{ color: SUB }}>{mmss(r.start)}–{mmss(end)}</span>
                </div>
                <div className="db-rtitle"><Bi ja={r.title} en={en?.title} /></div>
                <div className="db-rtopic"><Bi ja={r.topic} en={en?.topic} /></div>
                <div className="db-rplay">
                    <button onClick={onPlay}>PLAY FROM {mmss(r.start)}</button>
                </div>
            </div>

            <div className="db-ad">
                <div className="a"><b style={{ color: HASAN }}><Bi ja="HASAN の攻め" en={L.attack} /></b><Bi ja={r.attack} en={en?.attack} /></div>
                <div className="d"><b style={{ color: PINKER }}><Bi ja="PINKER の受け" en={L.defense} /></b><Bi ja={r.defense} en={en?.defense} /></div>
            </div>

            <div className="db-lines">
                {r.lines.map((l, i) => {
                    const c = l.who === 'hasan' ? HASAN : PINKER;
                    const live = liveKey === `${r.no}-${i}`;
                    return (
                        <div className={`db-line${live ? ' live' : ''}`} key={i}>
                            <button className="db-ts" style={{ color: c }} onClick={() => onSeek(Math.max(0, (l.t ?? r.start) - 0.4))} title="ここから再生">
                                {l.who === 'hasan' ? 'HASAN' : 'PINKER'}
                                <span>{mmss(l.t ?? r.start)}</span>
                            </button>
                            <div>
                                <div className="db-en">{l.en}</div>
                                <div className="db-ja">{l.ja}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="db-moves">
                {r.moves.map((m, i) => {
                    const c = m.who === 'hasan' ? HASAN : PINKER;
                    return (
                        <div className="db-move" key={m.name} style={{ borderLeftColor: c }}>
                            <span className="w" style={{ color: c }}>{m.who === 'hasan' ? 'HASAN' : 'PINKER'}</span>
                            <b><Bi ja={m.name} en={en?.moves[i]?.name} /></b>
                            <Bi ja={m.how} en={en?.moves[i]?.how} />
                        </div>
                    );
                })}
            </div>

            <div className="db-phr">
                <table>
                    <tbody>
                        {r.phrases.map((p, i) => (
                            <tr key={p.en}>
                                <td>{p.en}</td>
                                <td>{p.ja}</td>
                                <td><Bi ja={p.use} en={en?.uses[i]} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="db-foot">
                <div className="db-say"><div className="k"><Bi ja="止めたら言う一言" en={L.say} /></div><div className="v">{r.sayThis}</div></div>
                <div className="db-ask"><div className="k"><Bi ja="先生に聞くこと" en={L.ask} /></div><div className="v">{r.askTeacher}</div></div>
            </div>
            <div className="db-verdict">
                <div className="db-stamp" style={{ color: colorOf(w), borderColor: colorOf(w) }}>
                    <small>{w === 'draw' ? 'EVEN' : 'WINNER'}</small>{nameOf(w)}
                </div>
                <p><Bi ja={r.verdict} en={en?.verdict} /></p>
            </div>
        </article>
    );
}
