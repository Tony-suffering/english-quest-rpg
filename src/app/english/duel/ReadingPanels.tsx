'use client';

/**
 * カード対戦の読解モード(/english/duel/toeic)の画面の部品。2026-11-28。
 * 本人「Part 5 以降を速く読んでほぼ満点を取るのが目標。シャドバ形式は保守したい。メールを読んで回答するとバトルに勝てる、みたいに」。
 * 第1版(クリーム色の箱に4択ボタン)は「構成は悪くないけど、みためが悪すぎる」で作り直した。
 * いまの作り: 盤面を暗く落とし、魔法陣と粒を回した上に、黒曜石と金の枠。英文は羊皮紙に載せる(長文を読ませるので、文字の面だけは明るく)。
 * 選択肢は石の札、時間は金の輪、結果は決着の画面と同じ金の題字。呼び名は対戦の世界の言葉にする(詠唱・覚醒・封書・封印・発動)。
 *
 * TOEIC の3つの Part を、対戦の3つの仕組みに乗せる(ルールは src/lib/duel.ts の「読解モード」)。
 *  Part5Rite  = 詠唱: 自分のターンの頭の1問。速く当てるほどエナジーが増える
 *  Part6Rite  = 覚醒: ユニットを強くするときの1問。長文の空所
 *  Part7Reader = 封書を解く: 相手が置いた文書を読んで設問に答える。当てるたびに封印が1つ解ける
 *  DocToken   = 盤面に置かれた封書(発動までのカウントと封印)
 *  ReadingReport = 対戦のあとの解読の記録(秒数・正答・まちがえた問題と解説)
 *
 * 問題は自作のフル模試8回分(src/data/english/toeic-test-01〜08.ts)から scripts/duel-reading-build.cjs が抜いた
 * public/duel/reading.json。実試験の転載ではない。
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { READ5_FAST_SEC, READ5_LIMIT_SEC, READ5_GAIN, docDamage, docRecoil, type DocAmulet } from '@/lib/duel';

// ── 問題集 ──
export interface P5 { k: string; s: string; c: string[]; a: number; tag: string; n: string }
export interface P6Q { no: number; c: string[]; a: number; t: string; n: string }
export interface P6 { k: string; type: string; p: string; q: P6Q[] }
export interface P7Q { q: string; c: string[]; a: number; t: string; n: string }
export interface P7 { k: string; kind: 'single' | 'double' | 'triple'; type: string; intro: string; docs: { h: string; b: string; type: string }[]; q: P7Q[] }
export interface Bank { v: number; p5: P5[]; p6: P6[]; p7: P7[] }

/** 1問ぶんの記録。対戦のあとの記録と、まちがえた問題の出し直しに使う */
export interface ReadLog { part: 5 | 6 | 7; key: string; qi: number; ok: boolean; sec: number; tag?: string }

export const PART7_LIMIT: Record<P7['kind'], number> = { single: 60, double: 75, triple: 75 };   // 1問あたりの秒数(本番は Part 7 の54問を約55分)
export const PART6_LIMIT = 40;
export const PACE = { 5: 20, 6: 30, 7: 60 } as const;   // 本番で満点を狙うときの1問あたりの目安(秒)

let bankCache: Bank | null = null;
export function useBank(on: boolean): Bank | null {
    const [bank, setBank] = useState<Bank | null>(bankCache);
    useEffect(() => {
        if (!on || bankCache) return;
        fetch('/duel/reading.json').then(r => r.json()).then((b: Bank) => { bankCache = b; setBank(b); }).catch(() => { /* 読めなければ普通の対戦 */ });
    }, [on]);
    return bank;
}

// まちがえた問題は、次の対戦で優先して出し直す。出した問題は、しばらく出さない
const SEEN_KEY = 'duel:reading:seen:v1', MISS_KEY = 'duel:reading:miss:v1', HIST_KEY = 'duel:reading:hist:v1';
const loadJ = <T,>(k: string, f: T): T => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) as T : f; } catch { return f; } };
const saveJ = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 容量 */ } };

/** 問題を選ぶ道具。1つの対戦のあいだ同じものを使う(同じ問題を2度出さない) */
export function makePicker(bank: Bank) {
    const seen = new Set(loadJ<string[]>(SEEN_KEY, []));
    const miss = loadJ<string[]>(MISS_KEY, []);
    const used = new Set<string>();
    const pick = <T extends { k: string }>(list: T[], keyOf: (x: T) => string[] = x => [x.k]): T => {
        const again = list.filter(x => keyOf(x).some(k => miss.includes(k)) && !used.has(x.k));
        const fresh = list.filter(x => !used.has(x.k) && !keyOf(x).some(k => seen.has(k)));
        const any = list.filter(x => !used.has(x.k));
        const from = again.length && Math.random() < 0.35 ? again : fresh.length ? fresh : any.length ? any : list;
        const x = from[Math.floor(Math.random() * from.length)];
        used.add(x.k);
        return x;
    };
    return {
        p5: () => pick(bank.p5),
        p6: () => { const set = pick(bank.p6, s => s.q.map((_, i) => `${s.k}#${i}`)); return { set, qi: Math.floor(Math.random() * set.q.length) }; },
        /** 相手が置く封書の順番。最初は短い文書から、後半ほど長い文書が混ざる */
        p7Queue: (n: number) => {
            const out: P7[] = [];
            for (let i = 0; i < n; i++) {
                const wantLong = i >= 2 && i % 2 === 1;
                const list = bank.p7.filter(s => wantLong ? s.q.length >= 4 : s.q.length <= 3);
                out.push(pick(list.length ? list : bank.p7, s => s.q.map((_, j) => `${s.k}#${j}`)));
            }
            return out;
        },
    };
}

/** 対戦の記録を残す(見た問題・まちがえた問題・成績の履歴) */
export function saveReadLog(log: ReadLog[], won: boolean | null) {
    if (!log.length) return;
    const id = (l: ReadLog) => l.part === 5 ? l.key : `${l.key}#${l.qi}`;
    const seen = loadJ<string[]>(SEEN_KEY, []);
    saveJ(SEEN_KEY, [...seen.filter(k => !log.some(l => id(l) === k)), ...log.map(id)].slice(-600));
    let miss = loadJ<string[]>(MISS_KEY, []);
    for (const l of log) miss = l.ok ? miss.filter(k => k !== id(l)) : [...miss.filter(k => k !== id(l)), id(l)];
    saveJ(MISS_KEY, miss.slice(-200));
    const hist = loadJ<HistRow[]>(HIST_KEY, []);
    hist.push({ at: Date.now(), won, ...summarize(log) });
    saveJ(HIST_KEY, hist.slice(-60));
}
type PartSum = { n: number; ok: number; sec: number };
type HistRow = { at: number; won: boolean | null } & Record<'p5' | 'p6' | 'p7', PartSum>;
function summarize(log: ReadLog[]): Record<'p5' | 'p6' | 'p7', PartSum> {
    const s = (p: 5 | 6 | 7) => { const xs = log.filter(l => l.part === p); return { n: xs.length, ok: xs.filter(l => l.ok).length, sec: xs.length ? xs.reduce((t, l) => t + l.sec, 0) / xs.length : 0 }; };
    return { p5: s(5), p6: s(6), p7: s(7) };
}

// ── 見た目の素 ──
const INK = '#231A0B';
const IVORY = '#FFFDF2';
const GOLD_TXT = 'linear-gradient(180deg, #FFF6C8 0%, #F6C85F 45%, #B8941E 55%, #F6C85F 100%)';
const TONE = {
    5: { main: '#34D399', deep: '#047857', glow: 'rgba(52,211,153,', ja: '詠唱', en: 'INCANTATION' },
    6: { main: '#F6C85F', deep: '#B8941E', glow: 'rgba(246,200,95,', ja: '覚醒', en: 'AWAKENING' },
    7: { main: '#FB7185', deep: '#BE123C', glow: 'rgba(244,63,94,', ja: '封書', en: 'SEALED LETTER' },
} as const;
type Part = 5 | 6 | 7;
const LET = ['A', 'B', 'C', 'D'];

const CSS = `
@keyframes rd-veil { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes rd-bar-t { 0% { transform: translateY(-100%); } 100% { transform: none; } }
@keyframes rd-bar-b { 0% { transform: translateY(100%); } 100% { transform: none; } }
@keyframes rd-spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
@keyframes rd-spin-r { to { transform: translate(-50%,-50%) rotate(-360deg); } }
@keyframes rd-rise { 0% { opacity: 0; transform: translateY(30px) scale(0.96); filter: blur(6px); } 100% { opacity: 1; transform: none; filter: none; } }
@keyframes rd-letter { 0% { opacity: 0; transform: translateY(26px) scale(1.4); filter: blur(8px); } 100% { opacity: 1; transform: none; filter: none; } }
@keyframes rd-line { 0% { transform: scaleX(0); opacity: 0; } 100% { transform: none; opacity: 1; } }
@keyframes rd-mote { 0% { opacity: 0; transform: translate(0,0); } 15% { opacity: 0.9; } 85% { opacity: 0.6; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)); } }
@keyframes rd-rune { 0%,100% { box-shadow: 0 0 0 1px rgba(246,200,95,0.55), 0 0 14px 2px rgba(246,200,95,0.35); } 50% { box-shadow: 0 0 0 1.5px #FFF2A8, 0 0 26px 7px rgba(246,200,95,0.75); } }
@keyframes rd-sheen { 0% { transform: translateX(-120%) skewX(-20deg); } 100% { transform: translateX(320%) skewX(-20deg); } }
@keyframes rd-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-9px); } 40% { transform: translateX(8px); } 60% { transform: translateX(-5px); } 80% { transform: translateX(3px); } }
@keyframes rd-verdict { 0% { opacity: 0; transform: translate(-50%,-50%) scale(2.2); filter: blur(10px); } 45% { opacity: 1; transform: translate(-50%,-50%) scale(0.94); filter: none; } 70% { transform: translate(-50%,-50%) scale(1.02); } 100% { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
@keyframes rd-verdict-out { to { opacity: 0; transform: translate(-50%,-50%) scale(1.12); filter: blur(4px); } }
@keyframes rd-rays { to { transform: translate(-50%,-50%) rotate(360deg); } }
@keyframes rd-spark { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(var(--dx), var(--dy)) scale(0.2); opacity: 0; } }
@keyframes rd-tick { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
@keyframes rd-blank { 0%,100% { box-shadow: inset 0 -3px 0 #D4AF37, 0 0 0 rgba(246,200,95,0); } 50% { box-shadow: inset 0 -3px 0 #F6C85F, 0 6px 16px -6px rgba(246,200,95,0.9); } }
@keyframes rd-float { 0%,100% { transform: translateY(0) rotate(var(--r, -3deg)); } 50% { transform: translateY(-6px) rotate(var(--r, -3deg)); } }
@keyframes rd-aura { 0%,100% { opacity: 0.55; transform: translate(-50%,-50%) scale(1); } 50% { opacity: 1; transform: translate(-50%,-50%) scale(1.12); } }
@keyframes rd-crack { 0% { transform: scale(1); filter: none; } 35% { transform: scale(1.35); filter: brightness(2.2); } 100% { transform: scale(1); } }
.rd-rune { position: relative; overflow: hidden; transition: transform .14s ease, box-shadow .14s ease, border-color .14s ease, background .14s ease; }
.rd-rune:not(:disabled):hover { transform: translateY(-2px); border-color: #F6C85F !important; box-shadow: 0 10px 22px rgba(0,0,0,0.5), 0 0 22px rgba(246,200,95,0.45) !important; }
.rd-rune:not(:disabled):hover .rd-sheen { animation: rd-sheen .7s ease-out; }
.rd-scroll::-webkit-scrollbar { width: 8px; } .rd-scroll::-webkit-scrollbar-thumb { background: rgba(140,109,15,0.45); border-radius: 4px; } .rd-scroll::-webkit-scrollbar-track { background: transparent; }
`;

function useClock(running: boolean) {
    const t0 = useRef(0);
    const [sec, setSec] = useState(0);
    useEffect(() => { t0.current = performance.now(); }, []);
    useEffect(() => {
        if (!running) return;
        const id = setInterval(() => setSec((performance.now() - t0.current) / 1000), 100);
        return () => clearInterval(id);
    }, [running]);
    return { sec, read: () => (performance.now() - t0.current) / 1000 };
}

/** 押しても、キーの 1〜4 / A〜D でも答えられる(速さの練習なので、手を止めない) */
function useKeys(on: boolean, n: number, pick: (i: number) => void, enter?: () => void) {
    const ref = useRef(pick); ref.current = pick;
    const ent = useRef(enter); ent.current = enter;
    useEffect(() => {
        if (!on && !enter) return;
        const f = (e: KeyboardEvent) => {
            const k = e.key.toLowerCase();
            const i = ['1', '2', '3', '4'].indexOf(k) >= 0 ? ['1', '2', '3', '4'].indexOf(k) : ['a', 'b', 'c', 'd'].indexOf(k);
            if (on && i >= 0 && i < n) { e.preventDefault(); ref.current(i); }
            else if ((k === 'enter' || k === ' ') && ent.current) { e.preventDefault(); ent.current(); }
        };
        window.addEventListener('keydown', f);
        return () => window.removeEventListener('keydown', f);
    }, [on, n, enter]);
}

/** 魔法陣(盤面の中央の輪と同じ描き方) */
function Sigil({ size, color, reverse, opacity }: { size: number; color: string; reverse?: boolean; opacity: number }) {
    return (
        <svg viewBox="0 0 400 400" style={{ position: 'absolute', left: '50%', top: '50%', width: size, height: size, opacity, pointerEvents: 'none', animation: `${reverse ? 'rd-spin-r' : 'rd-spin'} ${reverse ? 70 : 110}s linear infinite`, filter: `drop-shadow(0 0 10px ${color})` }}>
            <circle cx="200" cy="200" r="194" fill="none" stroke={color} strokeWidth="2" />
            <circle cx="200" cy="200" r="182" fill="none" stroke={color} strokeWidth="1" strokeDasharray="2 7" />
            <circle cx="200" cy="200" r="128" fill="none" stroke={color} strokeWidth="1.5" />
            {Array.from({ length: 6 }).map((_, i) => {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 2, b = ((i + 2) / 6) * Math.PI * 2 - Math.PI / 2;
                return <line key={i} x1={200 + Math.cos(a) * 182} y1={200 + Math.sin(a) * 182} x2={200 + Math.cos(b) * 182} y2={200 + Math.sin(b) * 182} stroke={color} strokeWidth="1.2" />;
            })}
            {Array.from({ length: 48 }).map((_, i) => {
                const a = (i / 48) * Math.PI * 2;
                return <line key={i} x1={200 + Math.cos(a) * 184} y1={200 + Math.sin(a) * 184} x2={200 + Math.cos(a) * (i % 4 ? 190 : 194)} y2={200 + Math.sin(a) * (i % 4 ? 190 : 194)} stroke={color} strokeWidth={i % 4 ? 1 : 2.5} />;
            })}
        </svg>
    );
}

/** 舞台: 盤面を暗く落とし、上下に映画の帯、後ろで魔法陣が回り、粒が昇る */
function Stage({ part, children }: { part: Part; children: React.ReactNode }) {
    const c = TONE[part];
    const motes = useMemo(() => Array.from({ length: 26 }).map((_, i) => ({ x: (i * 37) % 100, s: 2 + (i % 4), d: 5 + (i % 6), delay: -((i * 0.53) % 6), dx: ((i * 23) % 60) - 30 })), []);
    return (
        <div data-reading={part} style={{ position: 'absolute', inset: 0, zIndex: 72, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5vh 14px', boxSizing: 'border-box',
            background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${c.glow}0.2) 0%, rgba(10,7,2,0.42) 45%, rgba(6,4,1,0.82) 100%)`,
            backdropFilter: 'blur(5px) brightness(0.72) saturate(0.9)', WebkitBackdropFilter: 'blur(5px) brightness(0.72) saturate(0.9)', animation: 'rd-veil .3s ease-out both' }}>
            <style>{CSS}</style>
            <Sigil size={1100} color={c.main} opacity={0.26} />
            <Sigil size={760} color="#F6C85F" opacity={0.22} reverse />
            {motes.map((m, i) => (
                <span key={i} style={{ position: 'absolute', left: `${m.x}%`, bottom: -10, width: m.s, height: m.s, borderRadius: '50%', background: i % 3 ? c.main : '#FFF2A8', boxShadow: `0 0 ${m.s * 3}px ${c.glow}0.9)`, pointerEvents: 'none', opacity: 0,
                    ['--dx' as string]: `${m.dx}px`, ['--dy' as string]: '-105vh', animation: `rd-mote ${m.d}s linear ${m.delay}s infinite` } as React.CSSProperties} />
            ))}
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '4vh', background: '#07060C', animation: 'rd-bar-t .45s cubic-bezier(.2,.8,.2,1) both' }} />
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '4vh', background: '#07060C', animation: 'rd-bar-b .45s cubic-bezier(.2,.8,.2,1) both' }} />
            {children}
        </div>
    );
}

/** 題: 小さな肩書き + 金の1字ずつの題 + 金の線 */
function Heading({ part, title, sub, narrow }: { part: Part; title: string; sub?: string; narrow: boolean }) {
    const c = TONE[part];
    const fs = narrow ? 30 : 44;
    return (
        <div style={{ textAlign: 'center', marginBottom: narrow ? 8 : 12, pointerEvents: 'none' }}>
            <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 5, color: c.main, textShadow: `0 0 10px ${c.glow}0.8)` }}>PART {part} · {c.en}</div>
            <div style={{ display: 'flex', justifyContent: 'center', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 900, fontSize: fs, lineHeight: 1.15, letterSpacing: fs * 0.08 }}>
                {[...title].map((ch, i) => (
                    <span key={i} style={{ display: 'inline-block', background: GOLD_TXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: `drop-shadow(0 2px 0 rgba(0,0,0,0.6)) drop-shadow(0 0 16px ${c.glow}0.7))`, animation: `rd-letter .55s cubic-bezier(.2,1.3,.3,1) ${0.05 + i * 0.06}s both` }}>{ch}</span>
                ))}
            </div>
            <div style={{ width: narrow ? 180 : 280, height: 1.5, margin: '5px auto 6px', background: 'linear-gradient(90deg, transparent, #FFF2A8, transparent)', boxShadow: '0 0 8px rgba(246,200,95,0.8)', animation: 'rd-line .6s ease-out .25s both' }} />
            {sub && <div style={{ fontSize: narrow ? 12 : 13, fontWeight: 700, color: 'rgba(255,253,242,0.82)', letterSpacing: 1, textShadow: '0 1px 3px #000' }}>{sub}</div>}
        </div>
    );
}

/** 四隅の金の唐草 */
function Filigree({ size = 34 }: { size?: number }) {
    return (
        <>
            {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y], i) => (
                <svg key={i} width={size} height={size} viewBox="0 0 34 34" style={{ position: 'absolute', [x ? 'right' : 'left']: -3, [y ? 'bottom' : 'top']: -3, transform: `scale(${x ? -1 : 1}, ${y ? -1 : 1})`, pointerEvents: 'none', filter: 'drop-shadow(0 0 3px rgba(246,200,95,0.6))' }}>
                    <path d="M3 31V12C3 7 7 3 12 3h19" fill="none" stroke="#F6C85F" strokeWidth="2" />
                    <path d="M8 31V14c0-3.3 2.7-6 6-6h17" fill="none" stroke="#8C6D0F" strokeWidth="1" />
                    <path d="M12 12c3-1 6 1 5 4s-5 2-4-1" fill="none" stroke="#F6C85F" strokeWidth="1.3" />
                    <rect x="1" y="1" width="5" height="5" transform="rotate(45 3.5 3.5)" fill="#FFF2A8" />
                </svg>
            ))}
        </>
    );
}

/** 黒曜石と金の枠 */
function Frame({ part, width, children, pad = '18px 20px 18px' }: { part: Part; width: number; children: React.ReactNode; pad?: string }) {
    const c = TONE[part];
    return (
        <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width, maxWidth: '100%', minHeight: 0, flex: '0 1 auto', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', padding: pad, borderRadius: 10,
            background: 'linear-gradient(180deg, rgba(44,33,11,0.95) 0%, rgba(20,14,4,0.97) 60%, rgba(12,8,2,0.98) 100%)',
            border: '1.5px solid #D4AF37', boxShadow: `0 30px 80px rgba(0,0,0,0.75), inset 0 0 0 4px rgba(20,14,4,0.9), inset 0 0 0 5px rgba(212,175,55,0.35), inset 0 1px 30px rgba(255,242,168,0.06), 0 0 60px ${c.glow}0.22)`,
            animation: 'rd-rise .45s cubic-bezier(.2,1.1,.4,1) .08s both' }}>
            <Filigree />
            {/* 上の縁の宝石 */}
            <div style={{ position: 'absolute', left: '50%', top: -9, width: 16, height: 16, transform: 'translateX(-50%) rotate(45deg)', background: `linear-gradient(135deg, #fff, ${c.main} 45%, ${c.deep})`, border: '1.5px solid #FFF2A8', boxShadow: `0 0 12px ${c.glow}0.9)` }} />
            {/* 中身が画面より長いときは、枠の中だけをスクロール(枠と飾りは動かさない) */}
            <div className="rd-scroll" style={{ position: 'relative', flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, overflowY: 'auto', margin: '-4px -8px', padding: '4px 8px' }}>{children}</div>
        </div>
    );
}

/** 羊皮紙(英文を載せる面) */
function Parchment({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
    return (
        <div className={className} style={{ position: 'relative', borderRadius: 4, color: INK, background: 'radial-gradient(ellipse 120% 90% at 50% 0%, #FFFDF6 0%, #F8EDD0 62%, #EDD9A8 100%)',
            boxShadow: 'inset 0 0 0 1px rgba(140,109,15,0.35), inset 0 0 0 5px rgba(248,237,208,0.9), inset 0 0 0 6px rgba(140,109,15,0.25), inset 0 0 40px rgba(150,105,30,0.22), 0 8px 20px rgba(0,0,0,0.55)', ...style }}>
            {children}
        </div>
    );
}

/** 時間の金の輪。fast までは金(Part 5 の +2 の区間)、残りわずかで赤 */
function Medallion({ sec, limit, part, fast, size = 84 }: { sec: number; limit: number; part: Part; fast?: number; size?: number }) {
    const c = TONE[part];
    const left = Math.max(0, limit - sec), r = 38, L = 2 * Math.PI * r;
    const hot = left <= Math.min(8, limit * 0.25);
    const zone = fast !== undefined && sec <= fast;
    const col = hot ? '#F43F5E' : zone ? '#F6C85F' : c.main;
    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, animation: hot ? 'rd-tick .5s ease-in-out infinite' : undefined }}>
            <svg viewBox="0 0 100 100" width={size} height={size} style={{ position: 'absolute', inset: 0, filter: `drop-shadow(0 0 8px ${hot ? 'rgba(244,63,94,0.9)' : zone ? 'rgba(246,200,95,0.9)' : c.glow + '0.8)'})` }}>
                <circle cx="50" cy="50" r="48" fill="url(#rdmed)" stroke="#D4AF37" strokeWidth="1.5" />
                <defs><radialGradient id="rdmed" cx="40%" cy="30%"><stop offset="0%" stopColor="#4A3A14" /><stop offset="100%" stopColor="#140E04" /></radialGradient></defs>
                {Array.from({ length: 30 }).map((_, i) => { const a = (i / 30) * Math.PI * 2; return <line key={i} x1={50 + Math.cos(a) * 44} y1={50 + Math.sin(a) * 44} x2={50 + Math.cos(a) * (i % 5 ? 46 : 47.5)} y2={50 + Math.sin(a) * (i % 5 ? 46 : 47.5)} stroke="#8C6D0F" strokeWidth={i % 5 ? 0.8 : 1.6} />; })}
                <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                {fast !== undefined && <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(246,200,95,0.28)" strokeWidth="6" strokeDasharray={`${(fast / limit) * L} ${L}`} transform="rotate(-90 50 50)" />}
                <circle cx="50" cy="50" r={r} fill="none" stroke={col} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${(left / limit) * L} ${L}`} transform="rotate(-90 50 50)" style={{ transition: 'stroke-dasharray .1s linear, stroke .3s' }} />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
                <span style={{ fontWeight: 900, fontSize: size * 0.34, color: hot ? '#FECDD3' : IVORY, fontVariantNumeric: 'tabular-nums', textShadow: `0 0 10px ${hot ? 'rgba(244,63,94,0.9)' : 'rgba(255,242,168,0.6)'}` }}>{Math.ceil(left)}</span>
                <span style={{ fontSize: size * 0.11, fontWeight: 800, letterSpacing: 2, color: '#D4AF37', marginTop: 2 }}>SEC</span>
            </div>
        </div>
    );
}

/** 選択肢 = 石の札。左に金の菱形の印 */
function Rune({ i, text, state, onClick, size = 17 }: { i: number; text: string; state: 'idle' | 'right' | 'wrong' | 'dim'; onClick?: () => void; size?: number }) {
    const bg = state === 'right' ? 'linear-gradient(180deg, rgba(6,95,70,0.96), rgba(2,44,34,0.98))'
        : state === 'wrong' ? 'linear-gradient(180deg, rgba(136,19,55,0.94), rgba(60,5,20,0.98))'
            : 'linear-gradient(180deg, rgba(58,44,15,0.92) 0%, rgba(26,19,6,0.96) 100%)';
    const bd = state === 'right' ? '#6EE7B7' : state === 'wrong' ? '#FB7185' : 'rgba(212,175,55,0.55)';
    return (
        <button className="rd-rune" disabled={!onClick} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 14, width: '100%', textAlign: 'left', padding: '11px 16px 11px 12px', borderRadius: 8, border: `1px solid ${bd}`, background: bg, cursor: onClick ? 'pointer' : 'default',
            opacity: state === 'dim' ? 0.32 : 1, boxShadow: state === 'right' ? '0 0 0 1px #A7F3D0, 0 0 26px rgba(52,211,153,0.7)' : state === 'wrong' ? '0 0 20px rgba(244,63,94,0.55)' : '0 6px 14px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,242,168,0.12)',
            animation: state === 'wrong' ? 'rd-shake .42s ease' : undefined }}>
            <span className="rd-sheen" style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '30%', background: 'linear-gradient(90deg, transparent, rgba(255,242,168,0.18), transparent)', transform: 'translateX(-120%) skewX(-20deg)', pointerEvents: 'none' }} />
            <span style={{ position: 'relative', flexShrink: 0, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ position: 'absolute', inset: 3, transform: 'rotate(45deg)', borderRadius: 3, border: '1.5px solid #FFF2A8',
                    background: state === 'right' ? 'linear-gradient(135deg, #D1FAE5, #34D399 50%, #047857)' : state === 'wrong' ? 'linear-gradient(135deg, #FFE4E6, #FB7185 50%, #9F1239)' : 'linear-gradient(135deg, #FFF6C8, #D4AF37 50%, #8C6D0F)', boxShadow: '0 2px 6px rgba(0,0,0,0.5)' }} />
                <span style={{ position: 'relative', fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 13, color: '#2A1F08' }}>{LET[i]}</span>
            </span>
            <span style={{ position: 'relative', fontFamily: 'Georgia, "Times New Roman", serif', fontSize: size, lineHeight: 1.35, color: IVORY, fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>{text}</span>
        </button>
    );
}

/** 解説。金の線の板に、日本語 */
function Lore({ ok, answer, tag, note, ja }: { ok: boolean; answer: string; tag?: string; note: string; ja: boolean }) {
    const col = ok ? '#34D399' : '#FB7185';
    return (
        <div style={{ position: 'relative', borderRadius: 8, padding: '10px 14px 11px 16px', background: 'linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))', border: '1px solid rgba(212,175,55,0.35)', animation: 'rd-rise .35s ease-out both' }}>
            <div style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 2, background: col, boxShadow: `0 0 10px ${col}` }} />
            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap', marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, color: col }}>{ok ? (ja ? '読み解いた' : 'CORRECT') : (ja ? '正しい答え' : 'ANSWER')}</span>
                {!ok && <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800, fontSize: 16, color: '#FFF6C8' }}>{answer}</span>}
                {tag && <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: 1, color: '#D4AF37', border: '1px solid rgba(212,175,55,0.6)', borderRadius: 3, padding: '0 6px' }}>{tag}</span>}
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.8, color: 'rgba(255,253,242,0.88)' }}>{note}</div>
        </div>
    );
}

/** 結果の題字(決着の画面と同じ金の文字)。後ろに光の筋と火花。少し見せて消える */
function Verdict({ text, sub, part, bad }: { text: string; sub?: string; part: Part; bad?: boolean }) {
    const c = TONE[part];
    const glow = bad ? 'rgba(244,63,94,' : c.glow;
    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%', zIndex: 6, pointerEvents: 'none', textAlign: 'center', animation: 'rd-verdict .55s cubic-bezier(.2,1.2,.3,1) both, rd-verdict-out .35s ease-in 1.2s forwards' }}>
            <div style={{ position: 'absolute', left: '50%', top: '50%', width: 420, height: 420, borderRadius: '50%', background: `repeating-conic-gradient(${glow}0.4) 0deg 4deg, transparent 4deg 14deg)`, maskImage: 'radial-gradient(circle, #000 0%, transparent 65%)', WebkitMaskImage: 'radial-gradient(circle, #000 0%, transparent 65%)', animation: 'rd-rays 8s linear infinite' }} />
            <div style={{ position: 'relative', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 900, fontSize: 74, lineHeight: 1, letterSpacing: 4, whiteSpace: 'nowrap',
                background: bad ? 'linear-gradient(180deg, #FFE4E6 0%, #FB7185 45%, #881337 55%, #FB7185 100%)' : GOLD_TXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: `drop-shadow(0 4px 0 rgba(0,0,0,0.6)) drop-shadow(0 0 24px ${glow}0.95))` }}>{text}</div>
            {sub && <div style={{ position: 'relative', marginTop: 6, fontSize: 13, fontWeight: 900, letterSpacing: 4, color: bad ? '#FECDD3' : '#FFF6C8', textShadow: `0 0 12px ${glow}1), 0 1px 2px #000` }}>{sub}</div>}
            {!bad && Array.from({ length: 18 }).map((_, i) => {
                const a = (i / 18) * Math.PI * 2, d = 110 + (i * 29) % 80;
                return <span key={i} style={{ position: 'absolute', left: '50%', top: '45%', width: i % 3 ? 6 : 11, height: i % 3 ? 6 : 11, borderRadius: i % 2 ? '50%' : 2, background: i % 2 ? '#fff' : c.main, boxShadow: `0 0 10px ${c.main}`,
                    ['--dx' as string]: `${Math.cos(a) * d}px`, ['--dy' as string]: `${Math.sin(a) * d}px`, animation: 'rd-spark .8s ease-out .12s both' } as React.CSSProperties} />;
            })}
        </div>
    );
}

/** 金の主ボタン */
function MainButton({ children, onClick, disabled, tone }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; tone?: 'gold' | 'crimson' }) {
    const crimson = tone === 'crimson';
    return (
        <button data-act="rite-next" onClick={onClick} disabled={disabled} style={{ alignSelf: 'center', border: `1.5px solid ${crimson ? '#FECDD3' : '#FFF6C8'}`, borderRadius: 6, padding: '10px 34px', cursor: disabled ? 'default' : 'pointer', fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 16, letterSpacing: 2,
            background: crimson ? 'linear-gradient(180deg, #FB7185, #9F1239)' : 'linear-gradient(180deg, #FFF2A8 0%, #F6C85F 40%, #B8941E 100%)', color: crimson ? '#fff' : '#2A1F08',
            boxShadow: crimson ? '0 8px 20px rgba(0,0,0,0.5), 0 0 22px rgba(244,63,94,0.55)' : '0 8px 20px rgba(0,0,0,0.5), 0 0 22px rgba(246,200,95,0.55)' }}>
            {children} <span style={{ fontFamily: 'inherit', fontSize: 10, letterSpacing: 1, opacity: 0.7, marginLeft: 6 }}>ENTER</span>
        </button>
    );
}

// ── Part 5: 詠唱 ──
export function Part5Rite({ q, ja, turn, narrow, onDone, sfx }: { q: P5; ja: boolean; turn: number; narrow: boolean; onDone: (r: { ok: boolean; sec: number; gain: number }) => void; sfx: (n: string) => void }) {
    const [picked, setPicked] = useState<number | null>(null);
    const [timeUp, setTimeUp] = useState(false);
    const [showNote, setShowNote] = useState(false);
    const done = picked !== null || timeUp;
    const { sec, read } = useClock(!done);
    const result = useRef<{ ok: boolean; sec: number; gain: number } | null>(null);
    const finish = () => { if (result.current) onDone(result.current); };
    const answer = (i: number) => {
        if (done) return;
        const s = read(), ok = i === q.a;
        const gain = ok ? (s <= READ5_FAST_SEC ? READ5_GAIN.fast : READ5_GAIN.ok) : 0;
        result.current = { ok, sec: s, gain };
        setPicked(i);
        sfx(ok ? (gain === 2 ? 'win' : 'heal') : 'hit');
    };
    useEffect(() => {
        if (done || sec < READ5_LIMIT_SEC) return;
        result.current = { ok: false, sec: READ5_LIMIT_SEC, gain: 0 };
        setTimeUp(true); sfx('hit');
    }, [sec, done, sfx]);
    // 当たったら、少し見せてから盤面へ戻る(解説を開いたら止める)
    useEffect(() => {
        if (!result.current?.ok || showNote) return;
        const t = setTimeout(finish, 1500);
        return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [picked, showNote]);
    useKeys(!done, 4, answer, done ? finish : undefined);

    const r = result.current;
    const [pre, post] = q.s.split(/-{4,}/);
    const zone = !done ? (sec <= READ5_FAST_SEC ? 2 : 1) : r?.gain ?? 0;
    const slot = picked !== null ? q.c[picked] : timeUp ? q.c[q.a] : '';
    const tier = (g: 2 | 1, label: string, t: string) => {
        const on = zone === g;
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: on ? 1 : 0.38, transition: 'opacity .3s', flexDirection: g === 2 ? 'row-reverse' : 'row', textAlign: g === 2 ? 'right' : 'left' }}>
                <span style={{ display: 'flex', gap: 3 }}>{Array.from({ length: g }).map((_, i) => <span key={i} style={{ width: 18, height: 18, borderRadius: '50%', background: 'radial-gradient(circle at 32% 28%, #fff, #6EE7B7 35%, #047857)', border: '1.5px solid #FFF2A8', boxShadow: on ? '0 0 12px 3px rgba(52,211,153,0.95)' : undefined }} />)}</span>
                <span>
                    <span style={{ display: 'block', fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 15, color: on ? '#A7F3D0' : IVORY }}>{label} +{g}</span>
                    <span style={{ display: 'block', fontSize: 10, fontWeight: 800, letterSpacing: 1, color: '#D4AF37' }}>{t}</span>
                </span>
            </div>
        );
    };
    return (
        <Stage part={5}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 860, maxHeight: '100%' }}>
                <Heading part={5} narrow={narrow} title={ja ? '詠唱' : 'Incantation'} sub={ja ? `第 ${turn} ターン · 空所を読み解いて、エナジーを呼ぶ` : `Turn ${turn} · Read the blank, call the energy`} />
                <Frame part={5} width={860}>
                    {/* 時間の輪と、2つの報酬 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: narrow ? 8 : 18 }}>
                        {tier(2, ja ? '速詠唱' : 'Swift', ja ? `${READ5_FAST_SEC}秒以内` : `within ${READ5_FAST_SEC}s`)}
                        <Medallion sec={done ? (r?.sec ?? sec) : sec} limit={READ5_LIMIT_SEC} fast={READ5_FAST_SEC} part={5} size={narrow ? 72 : 88} />
                        {tier(1, ja ? '詠唱' : 'Chant', ja ? `${READ5_LIMIT_SEC}秒以内` : `within ${READ5_LIMIT_SEC}s`)}
                    </div>

                    {/* 問題文(羊皮紙)。空所は金の線で脈打つ */}
                    <Parchment style={{ padding: narrow ? '16px 16px' : '22px 30px' }}>
                        <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: narrow ? 19 : 25, lineHeight: 1.65, textAlign: 'center' }}>
                            {pre}
                            <span style={{ display: 'inline-block', minWidth: narrow ? 90 : 130, margin: '0 6px', padding: '0 10px', textAlign: 'center', fontWeight: 800, borderRadius: 2,
                                color: r?.ok ? '#065F46' : '#9F1239', backgroundColor: slot ? (r?.ok ? 'rgba(16,185,129,0.16)' : 'rgba(225,29,72,0.12)') : 'transparent',
                                boxShadow: slot ? `inset 0 -3px 0 ${r?.ok ? '#059669' : '#E11D48'}` : undefined, animation: slot ? undefined : 'rd-blank 1.4s ease-in-out infinite' }}>{slot || ' '}</span>
                            {post}
                        </div>
                    </Parchment>

                    <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1fr 1fr', gap: 10 }}>
                        {q.c.map((c, i) => <Rune key={i} i={i} text={c} onClick={done ? undefined : () => answer(i)} state={!done ? 'idle' : i === q.a ? 'right' : i === picked ? 'wrong' : 'dim'} />)}
                    </div>

                    {!done && !narrow && <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 2, color: 'rgba(212,175,55,0.7)', textAlign: 'center' }}>{ja ? 'キー 1〜4 / A〜D でも唱えられる' : 'KEYS 1-4 OR A-D'}</div>}
                    {done && r && (r.ok && !showNote ? (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 14, alignItems: 'center' }}>
                            <span style={{ fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 800, color: '#A7F3D0' }}>{r.sec.toFixed(1)}{ja ? ' 秒' : 's'}</span>
                            <button onClick={() => setShowNote(true)} style={{ border: '1px solid rgba(212,175,55,0.7)', background: 'transparent', color: '#F6C85F', fontWeight: 800, fontSize: 12, letterSpacing: 1, borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>{ja ? '解説を読む' : 'Explanation'}</button>
                        </div>
                    ) : (
                        <>
                            <Lore ok={r.ok} answer={`(${LET[q.a]}) ${q.c[q.a]}`} tag={q.tag} note={q.n} ja={ja} />
                            <MainButton onClick={finish}>{ja ? '盤面へ戻る' : 'Return to the board'}</MainButton>
                        </>
                    ))}
                    {done && r && (r.ok
                        ? <Verdict part={5} text={`+${r.gain}`} sub={ja ? (r.gain === 2 ? '速詠唱 · エナジー' : 'エナジー') : (r.gain === 2 ? 'SWIFT CHANT · ENERGY' : 'ENERGY')} />
                        : <Verdict part={5} bad text={timeUp ? (ja ? '時間切れ' : 'TIME UP') : (ja ? '詠唱失敗' : 'MISCAST')} />)}
                </Frame>
            </div>
        </Stage>
    );
}

// ── Part 6: 覚醒 ──
export function Part6Rite({ set, qi, ja, narrow, unit, onDone, onCancel, sfx }: { set: P6; qi: number; ja: boolean; narrow: boolean; unit: React.ReactNode; onDone: (r: { ok: boolean; sec: number }) => void; onCancel: () => void; sfx: (n: string) => void }) {
    const q = set.q[qi];
    const [picked, setPicked] = useState<number | null>(null);
    const [timeUp, setTimeUp] = useState(false);
    const done = picked !== null || timeUp;
    const { sec, read } = useClock(!done);
    const result = useRef<{ ok: boolean; sec: number } | null>(null);
    const finish = () => { if (result.current) onDone(result.current); };
    const answer = (i: number) => {
        if (done) return;
        result.current = { ok: i === q.a, sec: read() };
        setPicked(i);
        sfx(i === q.a ? 'win' : 'hit');
    };
    useEffect(() => {
        if (done || sec < PART6_LIMIT) return;
        result.current = { ok: false, sec: PART6_LIMIT };
        setTimeUp(true); sfx('hit');
    }, [sec, done, sfx]);
    useKeys(!done, 4, answer, done ? finish : undefined);
    const r = result.current;
    const slotRef = useRef<HTMLSpanElement | null>(null);
    // 解く空所が見える所まで、本文の枠の中だけを動かす(scrollIntoView は盤面ごと動かしてしまう)
    useEffect(() => {
        const s = slotRef.current, box = s?.closest('[data-passage]') as HTMLElement | null;
        if (s && box) box.scrollTop = Math.max(0, s.offsetTop - box.clientHeight / 2);   // box は position: relative なので、offsetTop は box の中の位置
    }, []);

    // 本文: 解く空所は光らせる。ほかの空所は正解を薄く入れておく(1問だけに集中させる)
    const parts = useMemo(() => set.p.split(/(§\d+§)/), [set.p]);
    const long = q.c.some(c => c.length > 40);
    return (
        <Stage part={6}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 1100, maxHeight: '100%' }}>
                <Heading part={6} narrow={narrow} title={ja ? '覚醒' : 'Awakening'} sub={ja ? '長文の空所を読み解けば、このユニットが目覚める' : 'Fill the blank and this unit awakens'} />
                <Frame part={6} width={1100}>
                    <div style={{ display: 'flex', gap: 18, minHeight: 0, flexDirection: narrow ? 'column' : 'row', overflow: narrow ? 'auto' : undefined }}>
                        {/* 左: 本文 */}
                        <Parchment className="rd-scroll" style={{ flex: 1.2, minWidth: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '10px 18px 6px', fontSize: 10, fontWeight: 900, letterSpacing: 4, color: '#8C6D0F', borderBottom: '1px solid rgba(140,109,15,0.25)' }}>{set.type.toUpperCase()}</div>
                            <div data-passage className="rd-scroll" style={{ position: 'relative', maxHeight: narrow ? 240 : 'min(54vh, 470px)', overflowY: 'auto', padding: '12px 20px 18px', fontFamily: 'Georgia, serif', fontSize: 15.5, lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>
                                {parts.map((p, i) => {
                                    const m = p.match(/§(\d+)§/);
                                    if (!m) return <span key={i}>{p}</span>;
                                    const no = Number(m[1]), other = set.q.find(x => x.no === no);
                                    if (no !== q.no) return <span key={i} style={{ color: '#6B5A3A', borderBottom: '1px dotted rgba(107,90,58,0.6)' }}>{other ? other.c[other.a] : '___'}</span>;
                                    const text = picked !== null ? q.c[picked] : timeUp ? q.c[q.a] : '';
                                    return <span key={i} ref={slotRef} style={{ padding: '1px 8px', fontWeight: 800, color: r?.ok ? '#065F46' : '#9F1239', backgroundColor: text ? (r?.ok ? 'rgba(16,185,129,0.16)' : 'rgba(225,29,72,0.12)') : 'rgba(246,200,95,0.22)', animation: text ? undefined : 'rd-blank 1.4s ease-in-out infinite' }}>{text || ` (${no})    `}</span>;
                                })}
                            </div>
                        </Parchment>
                        {/* 右: 目覚めるユニット・時間・選択肢 */}
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <div style={{ position: 'relative', flexShrink: 0, padding: '6px 8px' }}>
                                    <div style={{ position: 'absolute', left: '50%', top: '50%', width: 130, height: 130, borderRadius: '50%', background: `radial-gradient(circle, rgba(246,200,95,${r?.ok ? 0.8 : 0.35}) 0%, transparent 65%)`, animation: 'rd-aura 2s ease-in-out infinite' }} />
                                    <div style={{ position: 'relative', filter: r?.ok ? 'drop-shadow(0 0 16px rgba(253,230,138,1)) brightness(1.15)' : undefined, transition: 'filter .4s' }}>{unit}</div>
                                </div>
                                <div style={{ flex: 1, fontSize: 13, lineHeight: 1.7, color: 'rgba(255,253,242,0.85)' }}>
                                    {ja ? <>当てれば <b style={{ color: '#F6C85F' }}>攻撃 +2 / 体力 +2</b>。目覚めたターンから、相手のユニットに斬りかかれる。外すと、覚醒の力だけが消える。</> : <>A hit grants <b style={{ color: '#F6C85F' }}>+2 / +2</b>, and it can strike enemy units at once. A miss spends the awakening.</>}
                                </div>
                                <Medallion sec={done ? (r?.sec ?? sec) : sec} limit={PART6_LIMIT} part={6} size={narrow ? 64 : 76} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {q.c.map((c, i) => <Rune key={i} i={i} text={c} size={long ? 14.5 : 17} onClick={done ? undefined : () => answer(i)} state={!done ? 'idle' : i === q.a ? 'right' : i === picked ? 'wrong' : 'dim'} />)}
                            </div>
                            {done && r && <Lore ok={r.ok} answer={`(${LET[q.a]}) ${q.c[q.a]}`} note={q.n} ja={ja} />}
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', alignItems: 'center', marginTop: 'auto' }}>
                                {!done && <button onClick={onCancel} style={{ border: 'none', background: 'transparent', color: 'rgba(255,253,242,0.6)', fontSize: 12, fontWeight: 700, textDecoration: 'underline', cursor: 'pointer' }}>{ja ? 'やめる(覚醒の力は残る)' : 'Cancel (keeps the awakening)'}</button>}
                                {done && <MainButton onClick={finish}>{r?.ok ? (ja ? '目覚めさせる' : 'Awaken') : (ja ? '盤面へ戻る' : 'Return')}</MainButton>}
                            </div>
                        </div>
                    </div>
                    {done && r && (r.ok ? <Verdict part={6} text={ja ? '覚醒' : 'AWAKEN'} sub="ATK +2 · HP +2" /> : <Verdict part={6} bad text={timeUp ? (ja ? '時間切れ' : 'TIME UP') : (ja ? '覚醒失敗' : 'FAILED')} />)}
                </Frame>
            </div>
        </Stage>
    );
}

// ── Part 7: 封書を解く ──
/** メールの頭(To / From / Date / Subject)は、本物のメールのように並べる */
function DocBody({ text }: { text: string }) {
    const lines = text.split('\n');
    let head = 0;
    while (head < lines.length && /^(To|From|Date|Subject|Sent|Cc|Re):/i.test(lines[head])) head++;
    return (
        <>
            {head > 0 && (
                <div style={{ borderBottom: '1px solid rgba(140,109,15,0.3)', paddingBottom: 8, marginBottom: 10, fontFamily: 'Georgia, serif', fontSize: 13.5, lineHeight: 1.7 }}>
                    {lines.slice(0, head).map((l, i) => { const [k, ...v] = l.split(':'); return <div key={i}><span style={{ display: 'inline-block', minWidth: 70, fontSize: 10.5, fontWeight: 900, letterSpacing: 2, color: '#8C6D0F' }}>{k.toUpperCase()}</span>{v.join(':').trim()}</div>; })}
                </div>
            )}
            <BodyWithTables lines={lines.slice(head)} />
        </>
    );
}

/** 本文。「| a | b |」の行が続いたところは、本物の表にする(領収書・日程表・料金表) */
function BodyWithTables({ lines }: { lines: string[] }) {
    const blocks: ({ kind: 'text'; text: string } | { kind: 'table'; rows: string[][] })[] = [];
    for (const l of lines) {
        const isRow = /^\s*\|.*\|\s*$/.test(l);
        const last = blocks[blocks.length - 1];
        if (isRow) {
            if (/^\s*\|[\s:|-]+\|\s*$/.test(l)) continue;   // 区切りの行(|---|---|)
            const cells = l.trim().slice(1, -1).split('|').map(c => c.trim());
            if (last?.kind === 'table') last.rows.push(cells); else blocks.push({ kind: 'table', rows: [cells] });
        } else if (last?.kind === 'text') last.text += '\n' + l;
        else blocks.push({ kind: 'text', text: l });
    }
    return (
        <>
            {blocks.map((b, i) => b.kind === 'text'
                ? <div key={i} style={{ whiteSpace: 'pre-wrap' }}>{i === 0 ? b.text.replace(/^\n+/, '') : b.text.replace(/^\n/, '')}</div>
                : (
                    <table key={i} style={{ width: '100%', borderCollapse: 'collapse', margin: '8px 0 10px', fontSize: 14, lineHeight: 1.45 }}>
                        <tbody>
                            {b.rows.map((r, j) => (
                                <tr key={j} style={{ background: j === 0 ? 'rgba(140,109,15,0.14)' : j % 2 ? 'transparent' : 'rgba(140,109,15,0.05)' }}>
                                    {r.map((c, k) => {
                                        const num = /^[\s$€£¥]*[\d.,]+[\s%]*$/.test(c) || /^[$€£¥]/.test(c);
                                        return <td key={k} style={{ padding: '4px 8px', borderBottom: '1px solid rgba(140,109,15,0.25)', fontWeight: j === 0 ? 800 : 400, fontSize: j === 0 ? 11.5 : 14, letterSpacing: j === 0 ? 1 : 0, color: j === 0 ? '#6B5212' : INK, textAlign: num && j > 0 ? 'right' : 'left', fontVariantNumeric: 'tabular-nums' }}>{c}</td>;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ))}
        </>
    );
}

/** 封蝋。解けたら金、外したら灰、まだなら紅 */
function WaxSeal({ state, size, label }: { state: 'hit' | 'miss' | 'left'; size: number; label?: string | number }) {
    const bg = state === 'hit' ? 'radial-gradient(circle at 35% 30%, #FFF6C8, #D4AF37 50%, #6B5212)' : state === 'miss' ? 'radial-gradient(circle at 35% 30%, #E7E5E4, #78716C 55%, #44403C)' : 'radial-gradient(circle at 35% 30%, #FDA4AF, #E11D48 45%, #6B0F2A)';
    return (
        <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size, borderRadius: '50%', background: bg, flexShrink: 0,
            boxShadow: `inset 0 0 0 ${Math.max(1.5, size * 0.08)}px rgba(0,0,0,0.18), inset 0 -2px 4px rgba(0,0,0,0.35), 0 2px 5px rgba(0,0,0,0.55)${state === 'hit' ? ', 0 0 12px rgba(246,200,95,0.8)' : ''}`, animation: state === 'hit' ? 'rd-crack .5s ease-out' : undefined }}>
            {label !== undefined ? <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: size * 0.48, color: state === 'left' ? '#FFE4E6' : '#2A1F08', textShadow: '0 1px 1px rgba(0,0,0,0.4)' }}>{label}</span>
                : <svg viewBox="0 0 20 20" width={size * 0.5} height={size * 0.5}><path d="M10 2l2.1 5.2 5.6.4-4.3 3.6 1.4 5.4L10 13.7 5.2 16.6l1.4-5.4L2.3 7.6l5.6-.4z" fill={state === 'left' ? 'rgba(255,228,230,0.75)' : 'rgba(42,31,8,0.55)'} /></svg>}
            {state === 'miss' && <span style={{ position: 'absolute', width: '70%', height: 2, background: 'rgba(28,25,23,0.7)', transform: 'rotate(-35deg)' }} />}
        </span>
    );
}

export function Part7Reader({ set, doc, ja, narrow, busy, onAnswer, onClose, sfx }: {
    set: P7; doc: DocAmulet; ja: boolean; narrow: boolean; busy: boolean;
    onAnswer: (r: { qi: number; ok: boolean; sec: number; last: boolean }) => void; onClose: () => void; sfx: (n: string) => void;
}) {
    const qi = doc.left[0];
    const [tab, setTab] = useState(0);
    const answered = doc.total - doc.left.length;
    return (
        <Stage part={7}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: 1200, height: '100%' }}>
                <Heading part={7} narrow={narrow} title={ja ? '封書を解く' : 'Break the Seals'} sub={`${set.docs.map(d => d.type).join(' + ').toUpperCase()} · ${ja ? `封印 ${doc.total}` : `${doc.total} seals`}`} />
                <Frame part={7} width={1200}>
                    <div style={{ display: 'flex', gap: 18, flexDirection: narrow ? 'column' : 'row', minHeight: 0, flex: 1, overflow: narrow ? 'auto' : 'hidden' }}>
                        {/* 左: 封書の中身(羊皮紙の手紙) */}
                        <div style={{ flex: 1.3, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0 }}>
                            {set.docs.length > 1 && (
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {set.docs.map((d, i) => (
                                        <button key={i} onClick={() => setTab(i)} style={{ border: `1px solid ${tab === i ? '#F6C85F' : 'rgba(212,175,55,0.35)'}`, background: tab === i ? 'linear-gradient(180deg, #F6C85F, #B8941E)' : 'rgba(255,255,255,0.04)', color: tab === i ? '#2A1F08' : 'rgba(255,253,242,0.75)', fontWeight: 900, fontSize: 11, letterSpacing: 1, borderRadius: 4, padding: '4px 12px', cursor: 'pointer' }}>
                                            {ja ? `第${i + 1}の書` : `Letter ${i + 1}`} · {d.type.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <Parchment className="rd-scroll" style={{ flex: 1, minHeight: narrow ? 220 : 0, maxHeight: narrow ? 330 : 'min(60vh, 580px)', overflowY: 'auto', padding: '20px 26px 26px', fontFamily: 'Georgia, serif', fontSize: 15.5, lineHeight: 1.78 }}>
                                <div style={{ position: 'absolute', right: 16, top: 14 }}><WaxSeal state="left" size={40} label={doc.count} /></div>
                                {set.docs[tab].h.toLowerCase() !== set.docs[tab].type.toLowerCase() && <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 4, color: '#8C6D0F', marginBottom: 4 }}>{set.docs[tab].type.toUpperCase()}</div>}
                                {set.docs[tab].h && <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 19, lineHeight: 1.35, marginBottom: 10, paddingRight: 52, color: '#2A1F08' }}>{set.docs[tab].h}</div>}
                                <DocBody text={set.docs[tab].b} />
                            </Parchment>
                        </div>
                        {/* 右: 封印と設問 */}
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 10, overflowY: narrow ? undefined : 'auto' }} className="rd-scroll">
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, background: 'linear-gradient(180deg, rgba(136,19,55,0.35), rgba(60,5,20,0.35))', border: '1px solid rgba(251,113,133,0.4)' }}>
                                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                    {Array.from({ length: doc.total }).map((_, i) => <WaxSeal key={i} size={28} state={i < answered ? (i < doc.hit ? 'hit' : 'miss') : 'left'} />)}
                                </div>
                                <div style={{ marginLeft: 'auto', textAlign: 'right', lineHeight: 1.3 }}>
                                    <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 15, color: doc.count <= 1 ? '#FECDD3' : IVORY }}>{ja ? `発動まで ${doc.count} ターン` : `Triggers in ${doc.count}`}</div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,253,242,0.65)' }}>{ja ? `放っておけば ${docDamage(doc)} ダメージ · 解き切れば ${docRecoil({ ...doc, hit: doc.hit + doc.left.length })} 返す` : `${docDamage(doc)} damage if left · up to ${docRecoil({ ...doc, hit: doc.hit + doc.left.length })} back`}</div>
                                </div>
                            </div>
                            {qi !== undefined
                                ? <P7Question key={`${set.k}-${qi}`} set={set} qi={qi} n={answered + 1} total={doc.total} ja={ja} busy={busy} last={doc.left.length === 1} willBoom={doc.count <= 1} onAnswer={onAnswer} sfx={sfx} />
                                : <div style={{ fontSize: 14, color: IVORY }}>{ja ? '読み終えた。' : 'Done.'}</div>}
                            <button onClick={onClose} disabled={busy} style={{ alignSelf: 'flex-end', marginTop: 'auto', border: 'none', background: 'transparent', color: 'rgba(255,253,242,0.6)', fontWeight: 700, fontSize: 12, textDecoration: 'underline', cursor: 'pointer' }}>{ja ? 'いったん盤面に戻る(続きはあとで解ける)' : 'Back to the board (finish later)'}</button>
                        </div>
                    </div>
                </Frame>
            </div>
        </Stage>
    );
}

const Q7_JA: Record<string, string> = { purpose: '目的', detail: '詳細', infer: '推論', person: '人物の推論', not: 'NOT 問題', synonym: '同義語', insert: '文の挿入', intent: '発言の意図' };

function P7Question({ set, qi, n, total, ja, busy, last, willBoom, onAnswer, sfx }: { set: P7; qi: number; n: number; total: number; ja: boolean; busy: boolean; last: boolean; willBoom: boolean; onAnswer: (r: { qi: number; ok: boolean; sec: number; last: boolean }) => void; sfx: (n: string) => void }) {
    const q = set.q[qi];
    const limit = PART7_LIMIT[set.kind];
    const [picked, setPicked] = useState<number | null>(null);
    const [timeUp, setTimeUp] = useState(false);
    const done = picked !== null || timeUp;
    const { sec, read } = useClock(!done);
    const result = useRef<{ ok: boolean; sec: number } | null>(null);
    const sent = useRef(false);
    const send = () => { if (!result.current || sent.current || busy) return; sent.current = true; onAnswer({ qi, ...result.current, last: last || (!result.current.ok && willBoom) }); };
    const answer = (i: number) => {
        if (done) return;
        result.current = { ok: i === q.a, sec: read() };
        setPicked(i);
        sfx(i === q.a ? 'heal' : 'hit');
    };
    useEffect(() => {
        if (done || sec < limit) return;
        result.current = { ok: false, sec: limit };
        setTimeUp(true); sfx('hit');
    }, [sec, done, limit, sfx]);
    // 当たったら少し見せて次へ。外したら解説を読んでから
    useEffect(() => {
        if (!result.current?.ok) return;
        const t = setTimeout(send, 1150);
        return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [picked]);
    useKeys(!done, 4, answer, done ? send : undefined);
    const r = result.current;
    return (
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 9, animation: 'rd-rise .35s ease-out both' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 4, color: '#FB7185' }}>{ja ? `第 ${n} の封印 / ${total}` : `SEAL ${n} OF ${total}`}</div>
                    <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 18.5, lineHeight: 1.45, color: IVORY, marginTop: 2 }}>{q.q}</div>
                </div>
                <Medallion sec={done ? (r?.sec ?? sec) : sec} limit={limit} part={7} size={68} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {q.c.map((c, i) => <Rune key={i} i={i} text={c} size={15} onClick={done ? undefined : () => answer(i)} state={!done ? 'idle' : i === q.a ? 'right' : i === picked ? 'wrong' : 'dim'} />)}
            </div>
            {done && r && !r.ok && <Lore ok={false} answer={`(${LET[q.a]}) ${q.c[q.a]}`} tag={q.t ? (ja ? Q7_JA[q.t] || q.t : q.t.toUpperCase()) : undefined} note={q.n} ja={ja} />}
            {done && r && !r.ok && <MainButton tone="crimson" onClick={send} disabled={busy}>{last || willBoom ? (ja ? '盤面へ' : 'To the board') : (ja ? '次の封印へ' : 'Next seal')}</MainButton>}
            {done && r?.ok && <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'Georgia, serif', fontSize: 15, fontWeight: 800, color: '#FDE68A', textShadow: '0 0 10px rgba(246,200,95,0.7)' }}><WaxSeal state="hit" size={26} />{ja ? `封印が解けた · ${r.sec.toFixed(1)} 秒` : `Seal broken · ${r.sec.toFixed(1)}s`}</div>}
        </div>
    );
}

// ── 盤面に置かれた封書 ──
export function DocToken({ doc, type, w, active, label, attrs, onClick }: { doc: DocAmulet; type: string; w: number; active: boolean; label: string; attrs?: Record<string, string | number>; onClick?: () => void }) {
    const h = Math.round(w * 0.74), urgent = doc.count <= 1;
    const answered = doc.total - doc.left.length;
    return (
        <div {...attrs} onClick={onClick} title={type} style={{ position: 'relative', width: w, height: h + w * 0.3, cursor: onClick ? 'pointer' : 'default', ['--r' as string]: `${(doc.uid % 2 ? -1 : 1) * 4}deg`, animation: 'rd-float 3.4s ease-in-out infinite' } as React.CSSProperties}>
            <style>{CSS}</style>
            {/* 紅の気配(発動が近いほど濃い) */}
            <div style={{ position: 'absolute', left: '50%', top: h / 2, width: w * 1.7, height: w * 1.7, borderRadius: '50%', pointerEvents: 'none', background: `radial-gradient(circle, rgba(244,63,94,${urgent ? 0.75 : 0.35}) 0%, transparent 62%)`, animation: `rd-aura ${urgent ? 0.9 : 2.4}s ease-in-out infinite` }} />
            {/* 封筒 */}
            <svg viewBox="0 0 100 74" width={w} height={h} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', filter: `drop-shadow(0 6px 8px rgba(0,0,0,0.6))${active ? ` drop-shadow(0 0 6px ${urgent ? 'rgba(244,63,94,1)' : 'rgba(253,230,138,0.9)'})` : ''}` }}>
                <defs>
                    <linearGradient id={`rdenv${doc.uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFF8E4" /><stop offset="100%" stopColor="#E6CF9A" /></linearGradient>
                </defs>
                <rect x="1" y="1" width="98" height="72" rx="3" fill={`url(#rdenv${doc.uid})`} stroke="#8C6D0F" strokeWidth="1.2" />
                <rect x="4" y="4" width="92" height="66" rx="2" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 2" />
                <path d="M1 3 L50 42 L99 3" fill="none" stroke="#B8941E" strokeWidth="1.4" />
                <path d="M1 72 L38 36 M99 72 L62 36" fill="none" stroke="rgba(140,109,15,0.45)" strokeWidth="1" />
            </svg>
            {/* 封蝋とカウント */}
            <div style={{ position: 'absolute', left: '50%', top: h * 0.57, transform: 'translate(-50%,-50%)' }}>
                <WaxSeal state="left" size={Math.round(w * 0.42)} label={doc.count} />
            </div>
            {/* 封印の数 */}
            <div style={{ position: 'absolute', left: 0, right: 0, top: h + w * 0.04, display: 'flex', justifyContent: 'center', gap: Math.max(2, w * 0.03) }}>
                {Array.from({ length: doc.total }).map((_, i) => <WaxSeal key={i} size={Math.max(8, Math.round(w * 0.12))} state={i < answered ? (i < doc.hit ? 'hit' : 'miss') : 'left'} />)}
            </div>
            <div style={{ position: 'absolute', left: '50%', top: h + w * 0.18, transform: 'translateX(-50%)', fontSize: Math.max(8, w * 0.1), fontWeight: 900, letterSpacing: 1, color: '#FFE4E6', textShadow: '0 1px 3px #000, 0 0 6px rgba(244,63,94,0.8)', whiteSpace: 'nowrap', maxWidth: w * 1.3, overflow: 'hidden', textOverflow: 'ellipsis' }}>{type.toUpperCase()}</div>
            {active && <div style={{ position: 'absolute', right: -w * 0.26, top: -w * 0.14, transform: 'rotate(10deg)', fontFamily: 'Georgia, serif', fontSize: Math.max(10, w * 0.13), fontWeight: 900, letterSpacing: 1, color: '#2A1F08', background: GOLD_TXT, border: '1.5px solid #fff', borderRadius: 3, padding: '1px 7px', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 12px rgba(246,200,95,0.8)' }}>{label}</div>}
        </div>
    );
}

// ── 対戦のあとの記録 ──
export function ReadingReport({ log, bank, ja, onClose }: { log: ReadLog[]; bank: Bank; ja: boolean; onClose: () => void }) {
    const sum = summarize(log);
    const hist = useMemo(() => loadJ<HistRow[]>(HIST_KEY, []), []);
    const trend = hist.filter(h => h.p5.n).slice(-12);
    const misses = log.filter(l => !l.ok);
    const lookup = (l: ReadLog): { q: string; ans: string; note: string } | null => {
        if (l.part === 5) { const q = bank.p5.find(x => x.k === l.key); return q ? { q: q.s, ans: q.c[q.a], note: q.n } : null; }
        if (l.part === 6) { const s = bank.p6.find(x => x.k === l.key), q = s?.q[l.qi]; return q ? { q: `${s!.type} · (${q.no})`, ans: q.c[q.a], note: q.n } : null; }
        const s = bank.p7.find(x => x.k === l.key), q = s?.q[l.qi];
        return q ? { q: q.q, ans: q.c[q.a], note: q.n } : null;
    };
    const tile = (p: Part) => {
        const s = sum[`p${p}` as 'p5'], c = TONE[p], pace = PACE[p];
        return (
            <div style={{ flex: 1, minWidth: 170, position: 'relative', padding: '12px 14px', borderRadius: 8, background: 'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))', border: `1px solid ${c.main}`, boxShadow: `0 0 18px ${c.glow}0.25)` }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, color: c.main }}>PART {p} · {ja ? c.ja : c.en}</div>
                {s.n ? (
                    <>
                        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 34, lineHeight: 1.1, color: '#FFF6C8' }}>{s.ok}<span style={{ fontSize: 17, color: '#D4AF37' }}> / {s.n}</span></div>
                        <div style={{ fontSize: 12.5, fontWeight: 800, color: s.sec <= pace ? '#A7F3D0' : '#FDE68A' }}>{ja ? `1問 ${s.sec.toFixed(1)} 秒` : `${s.sec.toFixed(1)}s each`} <span style={{ fontWeight: 600, color: 'rgba(255,253,242,0.55)' }}>{ja ? `· 本番の目安 ${pace} 秒` : `· pace ${pace}s`}</span></div>
                    </>
                ) : <div style={{ fontSize: 12.5, color: 'rgba(255,253,242,0.45)', marginTop: 10 }}>{ja ? 'この対戦では出なかった' : 'Not in this duel'}</div>}
            </div>
        );
    };
    const maxSec = Math.max(READ5_LIMIT_SEC * 0.7, ...trend.map(h => h.p5.sec));
    return (
        <div data-act="reading-report" className="rd-scroll" style={{ position: 'absolute', inset: 0, zIndex: 89, overflowY: 'auto', background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(40,30,10,0.9), rgba(6,4,1,0.96))', padding: '28px 14px 50px', boxSizing: 'border-box' }}>
            <style>{CSS}</style>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginBottom: 14 }}>
                    <div>
                        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 5, color: '#D4AF37' }}>READING CHRONICLE</div>
                        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 34, lineHeight: 1.15, background: GOLD_TXT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.6))' }}>{ja ? '解読の記録' : 'Chronicle'}</div>
                    </div>
                    <button onClick={onClose} style={{ marginLeft: 'auto', border: '1.5px solid #FFF6C8', background: 'linear-gradient(180deg, #FFF2A8 0%, #F6C85F 40%, #B8941E 100%)', color: '#2A1F08', fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 14, letterSpacing: 1, borderRadius: 6, padding: '8px 22px', cursor: 'pointer' }}>{ja ? '閉じる' : 'Close'}</button>
                </div>
                <Frame part={6} width={900}>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>{tile(5)}{tile(6)}{tile(7)}</div>
                    {trend.length >= 2 && (
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: 'rgba(255,253,242,0.75)', marginBottom: 8 }}>{ja ? `詠唱の速さ(最近 ${trend.length} 戦の1問あたりの秒数)。低いほど速い。緑の点線が本番の目安 ${PACE[5]} 秒` : `Incantation speed, last ${trend.length} duels`}</div>
                            <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 6, height: 96, padding: '0 4px', borderBottom: '1px solid rgba(212,175,55,0.45)' }}>
                                <div style={{ position: 'absolute', left: 0, right: 0, bottom: (PACE[5] / maxSec) * 96, borderTop: '1.5px dashed #34D399' }} />
                                {trend.map((h, i) => (
                                    <div key={i} title={`${h.p5.sec.toFixed(1)}s`} style={{ flex: 1, height: Math.max(4, (h.p5.sec / maxSec) * 96), borderRadius: '3px 3px 0 0', background: i === trend.length - 1 ? 'linear-gradient(180deg, #FFF2A8, #B8941E)' : 'linear-gradient(180deg, rgba(255,253,242,0.35), rgba(255,253,242,0.1))', boxShadow: i === trend.length - 1 ? '0 0 12px rgba(246,200,95,0.7)' : undefined }} />
                                ))}
                            </div>
                        </div>
                    )}
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 900, color: '#FFF6C8' }}>{misses.length ? (ja ? `読み違えた ${misses.length} 問` : `${misses.length} misread`) : (ja ? 'すべて読み解いた。' : 'Every seal broken.')}<span style={{ fontFamily: 'inherit', fontSize: 12, fontWeight: 700, color: 'rgba(255,253,242,0.55)', marginLeft: 10 }}>{misses.length ? (ja ? '次の対戦で、また出る' : 'they will return') : ''}</span></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {misses.map((l, i) => {
                            const x = lookup(l);
                            if (!x) return null;
                            const c = TONE[l.part];
                            return (
                                <Parchment key={i} style={{ padding: '12px 16px 12px 18px' }}>
                                    <div style={{ position: 'absolute', left: 0, top: 10, bottom: 10, width: 3, background: c.deep, borderRadius: 2 }} />
                                    <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: 3, color: c.deep }}>PART {l.part} · {ja ? c.ja : c.en}</div>
                                    <div style={{ fontFamily: 'Georgia, serif', fontSize: 15.5, lineHeight: 1.5, marginTop: 2 }}>{x.q}</div>
                                    <div style={{ marginTop: 5, fontSize: 13.5, fontWeight: 800, color: '#065F46' }}>{ja ? '正しい答え' : 'Answer'} · <span style={{ fontFamily: 'Georgia, serif' }}>{x.ans}</span></div>
                                    <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.75, color: '#57472A' }}>{x.note}</div>
                                </Parchment>
                            );
                        })}
                    </div>
                </Frame>
            </div>
        </div>
    );
}
