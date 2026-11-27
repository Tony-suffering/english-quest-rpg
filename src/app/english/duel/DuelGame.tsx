'use client';

/**
 * カード対戦 — 自分の英語カード20枚でデッキを組み、相手(CPU)のリーダーを倒す。
 * ルールは src/lib/duel.ts(第3版)。画面の文字は全部英語、カードの日本語は出さない(本人 2026-11-27)。
 *
 * 見た目(本人「見た目がすごく大事」「盤上もしょぼい」「演出がほしい」):
 * - カードは 240×340 で組んで縮める。絵はカードの id から毎回同じ模様を描く(属性の色と紋章)。
 * - 盤面は1枚の卓。リーダー、エナジーの珠、扇形の手札、右に END TURN。
 * - 演出: 召喚の光、攻撃の突進、衝撃の粒、ダメージの数字、破壊、ターンの帯、勝敗。効果音は Web Audio で鳴らす(素材なし)。
 * - 暗い画面にはしない(このアプリの決まり)。卓は明るい緑と金。
 */

import { memo, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import STYLES from '@/data/english/duel-styles.json';
import FIXED_STYLES from '@/data/english/duel-card-styles.json';   // 画風を入れる前に作った絵(id → 実際の画風)
import {
    ABILITY_TEXT, DECK_SIZE, ELEMENT_NAMES, ENERGY_MAX, START_HP,
    aiAction, apply, autoDeck, canAttack, canPlay, makeRng, newGame, shuffle, targetsFor, toSpec, wordSpec,
    type Action, type CardSpec, type Game, type PoolCard, type Side, type WordPack,
} from '@/lib/duel';

const GOLD = '#D4AF37';
const INK = '#1C1917';
const SUB = '#78716C';
const DECK_KEY = 'duel:deck:v3';
const RECORD_KEY = 'duel:record:v3';
const ROOM_KEY = 'duel:room:v1';   // 自分が作った部屋(読み込み直しても続きに戻るため)
const CW = 240, CH = 340;

const PAL: Record<string, [string, string, string]> = {
    flame: ['#FFE4D6', '#FB923C', '#C2410C'],
    aqua: ['#DBEAFE', '#38BDF8', '#1D4ED8'],
    wind: ['#D1FAE5', '#34D399', '#047857'],
    earth: ['#FEF3C7', '#D99A3B', '#92400E'],
    thunder: ['#FEF9C3', '#FACC15', '#A16207'],
};

const CSS = `
@keyframes duel-summon { 0% { transform: translateY(-46px) scale(1.35); opacity: 0; filter: brightness(3); } 55% { transform: translateY(0) scale(0.94); opacity: 1; filter: brightness(1.6); } 100% { transform: none; filter: none; } }
@keyframes duel-ring { 0% { transform: translate(-50%,-50%) scale(0.2); opacity: 0.95; } 100% { transform: translate(-50%,-50%) scale(2.4); opacity: 0; } }
@keyframes duel-draw { 0% { transform: translate(120px, -160px) rotate(25deg) scale(0.5); opacity: 0; } 100% { opacity: 1; } }
@keyframes duel-pop { 0% { transform: translate(-50%,-50%) scale(0.3); opacity: 0; } 18% { transform: translate(-50%,-70%) scale(1.5); opacity: 1; } 100% { transform: translate(-50%,-190%) scale(1); opacity: 0; } }
@keyframes duel-die { 0% { opacity: 1; filter: none; } 35% { filter: brightness(2.6) saturate(0); transform: scale(1.08) rotate(-3deg); } 100% { opacity: 0; transform: scale(0.55) rotate(9deg) translateY(26px); filter: brightness(3) blur(3px); } }
@keyframes duel-spark { 0% { transform: translate(0,0) scale(1); opacity: 1; } 100% { transform: translate(var(--dx), var(--dy)) scale(0.2); opacity: 0; } }
@keyframes duel-flash { 0% { transform: translate(-50%,-50%) scale(0.2); opacity: 1; } 100% { transform: translate(-50%,-50%) scale(1.9); opacity: 0; } }
@keyframes duel-shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-9px) rotate(-2deg); } 40% { transform: translateX(8px) rotate(2deg); } 60% { transform: translateX(-6px); } 80% { transform: translateX(4px); } }
@keyframes duel-ready { 0%,100% { box-shadow: 0 0 0 3px rgba(74,222,128,0.95), 0 0 16px 5px rgba(34,197,94,0.8); } 50% { box-shadow: 0 0 0 3px rgba(240,253,244,1), 0 0 30px 11px rgba(74,222,128,1); } }
@keyframes duel-target { 0%,100% { box-shadow: 0 0 0 3px rgba(239,68,68,0.95), 0 0 14px 4px rgba(239,68,68,0.6); } 50% { box-shadow: 0 0 0 4px rgba(254,202,202,1), 0 0 26px 9px rgba(239,68,68,0.9); } }
@keyframes duel-banner { 0% { transform: translateX(-110%) skewX(-14deg); opacity: 0; } 18%,72% { transform: translateX(0) skewX(-14deg); opacity: 1; } 100% { transform: translateX(110%) skewX(-14deg); opacity: 0; } }
@keyframes duel-spin { to { transform: translate(-50%,-50%) rotate(360deg); } }
@keyframes duel-orb { 0% { transform: scale(0.3); filter: brightness(3); } 100% { transform: none; filter: none; } }
@keyframes duel-win { 0% { transform: scale(0.2) rotate(-8deg); opacity: 0; } 60% { transform: scale(1.15) rotate(2deg); opacity: 1; } 100% { transform: none; } }
@keyframes duel-rays { to { transform: translate(-50%,-50%) rotate(360deg); } }
@keyframes duel-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes duel-quake { 0%,100% { transform: translate(0,0); } 20% { transform: translate(-10px,6px); } 40% { transform: translate(9px,-7px); } 60% { transform: translate(-6px,-4px); } 80% { transform: translate(5px,5px); } }
@keyframes duel-reveal { 0% { transform: translate(-50%,-50%) scale(0.3) rotate(-8deg); opacity: 0; } 10% { transform: translate(-50%,-50%) scale(1.06); opacity: 1; } 88% { transform: translate(-50%,-50%) scale(1); opacity: 1; } 100% { transform: translate(-50%,-30%) scale(0.35); opacity: 0; } }
@keyframes duel-aim { to { stroke-dashoffset: -28; } }
@keyframes duel-cap { 0% { transform: translateY(14px); opacity: 0; } 100% { transform: none; opacity: 1; } }
@keyframes duel-ping { 0% { transform: scale(0.4); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
@keyframes duel-chant { 0% { opacity: 0.28; text-shadow: none; } 40% { opacity: 1; color: #FFF2A8; text-shadow: 0 0 12px #FDE68A, 0 0 26px #F59E0B; } 100% { opacity: 1; color: #FFFDF2; text-shadow: 0 0 8px rgba(253,230,138,0.85), 0 1px 2px #000; } }
@keyframes duel-chev { 0%,100% { opacity: 0.45; } 50% { opacity: 1; } }
@keyframes duel-veil { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes duel-bar-top { 0% { transform: translateY(-100%); } 100% { transform: none; } }
@keyframes duel-bar-bottom { 0% { transform: translateY(100%); } 100% { transform: none; } }
@keyframes duel-letter { 0% { opacity: 0; transform: translateY(46px) scale(1.5); filter: blur(10px); } 100% { opacity: 1; transform: none; } }
@keyframes duel-line { 0% { transform: scaleX(0); opacity: 0; } 100% { transform: none; opacity: 1; } }
@keyframes duel-fadeup { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: none; } }
@keyframes duel-crest { 0% { opacity: 0; transform: scale(0.2) rotate(-40deg); } 100% { opacity: 1; transform: none; } }
@keyframes duel-mote { 0% { opacity: 0; transform: translate(0,0); } 12% { opacity: 0.95; } 80% { opacity: 0.7; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)); } }
@keyframes duel-sway { 0% { transform: rotate(-5deg); } 100% { transform: rotate(5deg); } }
.duel-menu { transition: transform .14s ease, filter .14s ease; }
.duel-menu:not(:disabled):hover { transform: translateX(8px); filter: brightness(1.15); }
@keyframes duel-kenburns { 0% { transform: translate(-50%,-50%) scale(1.02); } 100% { transform: translate(-50%,-50%) scale(1.1); } }
@keyframes duel-cloud { 0% { transform: translateX(-70%); } 100% { transform: translateX(200%); } }
@keyframes duel-breathe { 0%,100% { opacity: 0.45; } 50% { opacity: 1; } }
@keyframes duel-shine { 0% { left: -18%; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: 102%; opacity: 0; } }
@keyframes duel-wave { 0% { opacity: 0.9; transform: translate(-50%,-50%) scaleY(var(--sq, 1)) scale(0.12); } 100% { opacity: 0; transform: translate(-50%,-50%) scaleY(var(--sq, 1)) scale(1.45); } }
@keyframes duel-spin2 { from { transform: translate(-50%,-50%) scaleY(var(--sq, 1)) rotate(0deg); } to { transform: translate(-50%,-50%) scaleY(var(--sq, 1)) rotate(360deg); } }
@keyframes duel-drift { 0% { opacity: 0; transform: translate(0,0) rotate(0deg); } 8% { opacity: 0.95; } 88% { opacity: 0.85; } 100% { opacity: 0; transform: translate(var(--dx), var(--dy)) rotate(var(--rot)); } }
@keyframes duel-firefly { 0%,100% { opacity: 0; transform: translate(0,0); } 20% { opacity: 1; transform: translate(var(--dx), calc(var(--dy) * 0.3)); } 50% { opacity: 0.2; transform: translate(calc(var(--dx) * 0.4), var(--dy)); } 75% { opacity: 1; transform: translate(calc(var(--dx) * -0.5), calc(var(--dy) * 0.5)); } }
@keyframes duel-chant-hot { 0% { opacity: 0.28; text-shadow: none; } 40% { opacity: 1; color: #fff; text-shadow: 0 0 14px #FDE68A, 0 0 30px #F59E0B; transform: scale(1.25); } 100% { opacity: 1; color: #F6C85F; font-weight: 900; text-shadow: 0 0 10px rgba(246,200,95,0.95), 0 1px 2px #000; transform: scale(1.08); } }
@keyframes duel-pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.07); } }
@keyframes duel-shimmer { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
.duel-hand-card { transition: transform .16s ease; }
.duel-hand-card:hover { transform: translateY(var(--lift, -16px)) scale(1.08); }
div:has(> .duel-hand-card:hover) { z-index: 40 !important; }
`;

// ── 音 ──
// 効果音は録音素材(CC0)を重ねて作った mp3(public/duel/sfx)。読み込めるまでは発振の音で代わりをする。
// 曲は public/duel/bgm(CC0: Emma_MA / Joth / cynicmusic、OpenGameArt)。出どころは public/duel/AUDIO-CREDITS.txt
let audio: AudioContext | null = null;
function actx(): AudioContext | null {
    try {
        audio = audio || new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        if (audio.state === 'suspended') audio.resume().catch(() => { /* まだ操作が無い */ });
        return audio;
    } catch { return null; }
}
function tone(freq: number, dur: number, type: OscillatorType, vol: number, to?: number, delay = 0) {
    try {
        const ac = actx();
        if (!ac) return;
        const t = ac.currentTime + delay;
        const o = ac.createOscillator(), gn = ac.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, t);
        if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
        gn.gain.setValueAtTime(vol, t);
        gn.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(gn).connect(ac.destination);
        o.start(t);
        o.stop(t + dur + 0.02);
    } catch { /* 音が出せない端末 */ }
}
const TONES: Record<string, () => void> = {
    play: () => { tone(260, 0.16, 'triangle', 0.12, 780); tone(1040, 0.3, 'sine', 0.06, 1560, 0.1); },
    swing: () => tone(520, 0.14, 'sawtooth', 0.05, 110),
    hit: () => { tone(140, 0.2, 'square', 0.12, 45); tone(900, 0.06, 'sawtooth', 0.05, 200); },
    die: () => tone(300, 0.45, 'sawtooth', 0.07, 40),
    turn: () => { tone(660, 0.12, 'sine', 0.08); tone(990, 0.22, 'sine', 0.08, undefined, 0.11); },
    heal: () => { tone(520, 0.2, 'sine', 0.08, 1040); },
    win: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.35, 'triangle', 0.1, undefined, i * 0.13)),
    lose: () => [392, 330, 262, 196].forEach((f, i) => tone(f, 0.4, 'sawtooth', 0.06, undefined, i * 0.16)),
};
/** 効果音の名前と、そろえるための音量。vary は鳴らすたびに高さを少し変える幅(同じ音の連打に聞こえないように) */
const SFX_SET: Record<string, { vol: number; vary?: number }> = {
    play: { vol: 0.85 }, draw: { vol: 1.0, vary: 0.06 }, select: { vol: 1.5, vary: 0.05 }, swing: { vol: 1.4, vary: 0.08 }, hit: { vol: 0.95, vary: 0.08 }, face: { vol: 0.85, vary: 0.04 },
    die: { vol: 0.95, vary: 0.06 }, turn: { vol: 1.0 }, end: { vol: 1.1 }, heal: { vol: 1.3 }, strike: { vol: 0.85 }, ward: { vol: 1.0 }, click: { vol: 1.5, vary: 0.04 }, win: { vol: 1.3 }, lose: { vol: 0.95 },
};
const SFX_V = 1;
const sfxBuf: Record<string, AudioBuffer> = {};
let sfxAsked = false;
function loadSfx() {
    if (sfxAsked) return;
    const ac = actx();
    if (!ac) return;
    sfxAsked = true;
    for (const name of Object.keys(SFX_SET)) {
        fetch(`/duel/sfx/${name}.mp3?v=${SFX_V}`).then(r => r.arrayBuffer()).then(d => ac.decodeAudioData(d)).then(buf => { sfxBuf[name] = buf; }).catch(() => { /* 無ければ発振の音 */ });
    }
}
function playSfx(name: string) {
    const ac = actx();
    const buf = sfxBuf[name], set = SFX_SET[name];
    if (!ac || !buf || !set) { TONES[name]?.(); return; }
    try {
        const src = ac.createBufferSource(), gn = ac.createGain();
        src.buffer = buf;
        if (set.vary) src.playbackRate.value = 1 - set.vary + Math.random() * set.vary * 2;
        gn.gain.value = set.vol * 0.8;
        src.connect(gn).connect(ac.destination);
        src.start();
    } catch { /* 音が出せない端末 */ }
}

// 曲。場面ごとに1曲、切り替えはなめらかに。カードの声が鳴っているあいだは下げる
type BgmName = string;
/** 対戦の曲。対戦ごとに1つ選ぶ(本人 2026-11-27「曲も背景も何パターンか用意してランダムで」) */
const BATTLE_TRACKS = ['battle', 'battle-2', 'battle-3', 'battle-4', 'battle-5', 'battle-6', 'battle-7'];
const bgmVol = (n: string) => n.startsWith('battle') ? 0.34 : n === 'victory' ? 0.5 : 0.4;
let bgmEl: HTMLAudioElement | null = null;
let bgmName: BgmName | null = null;
let bgmDuck = 1;
const fades = new WeakMap<HTMLAudioElement, number>();
function fadeTo(el: HTMLAudioElement, to: number, ms: number, then?: () => void) {
    window.clearInterval(fades.get(el));
    const from = el.volume, t0 = performance.now();
    const id = window.setInterval(() => {
        const k = Math.min(1, (performance.now() - t0) / ms);
        el.volume = Math.max(0, Math.min(1, from + (to - from) * k));
        if (k >= 1) { window.clearInterval(id); then?.(); }
    }, 40);
    fades.set(el, id);
}
function setBgm(name: BgmName | null) {
    if (name === bgmName) { if (name && bgmEl?.paused && !document.hidden) bgmEl.play().catch(() => { /* まだ操作が無い */ }); return; }
    const old = bgmEl;
    if (old) fadeTo(old, 0, 500, () => old.pause());
    bgmEl = null; bgmName = null;
    if (!name) return;
    const el = new Audio(`/duel/bgm/${name}.mp3?v=${SFX_V}`);
    el.loop = name !== 'victory';
    el.volume = 0;
    bgmEl = el; bgmName = name;
    el.play().then(() => { if (bgmEl === el) fadeTo(el, bgmVol(name) * bgmDuck, 900); else el.pause(); })
        .catch(() => { if (bgmEl === el) { bgmEl = null; bgmName = null; } });   // 操作の前は鳴らせない。次に押したときにもう一度試す
}
let duckTimer = 0;
function duck(on: boolean) {
    window.clearTimeout(duckTimer);
    bgmDuck = on ? 0.3 : 1;
    if (bgmEl && bgmName) fadeTo(bgmEl, bgmVol(bgmName) * bgmDuck, on ? 180 : 600);
    if (on) duckTimer = window.setTimeout(() => duck(false), 9000);   // 終わりの合図が来ない端末でも、下げっぱなしにしない
}

/** 取り込み済みの絵。public/duel/art/manifest.json にある分だけ(scripts/duel-art-import.mjs が書く) */
let ART: Record<string, string> = {};
function artFor(spec: CardSpec): string | undefined {
    return ART[`card-${spec.id}`] || ART[`${spec.element}-${spec.ability.toLowerCase()}`] || ART[spec.element];
}

/** そのカードの画風(100種から id で1つ決まる。scripts/duel-art-generate.mjs の styleIndex と同じ計算) */
function styleOf(id: string): string {
    const fixed = (FIXED_STYLES as Record<string, string>)[id];
    if (fixed) return fixed;
    let h = 0;
    for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return (STYLES as { name: string }[])[h % STYLES.length].name;
}

/** 演じた声のあるカード(public/duel/voice/manifest.json。scripts/duel-voice-generate.mjs が作る) */
let VOICE: Record<string, string> = {};
let voiceEl: HTMLAudioElement | null = null;

/** カードの英文を声に出す(出した瞬間に自動で鳴らす。SOUND を切っていれば鳴らさない)。演じた声があればそれ、無ければ端末の読み上げ */
function speakLine(text: string, id?: string) {
    try {
        voiceEl?.pause();
        if (id && VOICE[id]) {
            window.speechSynthesis?.cancel();
            const el = new Audio(VOICE[id]);
            voiceEl = el;
            duck(true);
            el.onended = el.onerror = () => duck(false);
            el.play().catch(() => duck(false));
            return;
        }
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 1.0;
        duck(true);
        u.onend = u.onerror = () => duck(false);
        window.speechSynthesis.speak(u);
    } catch { /* 読み上げが無い端末 */ }
}

function load<T>(key: string, fallback: T): T {
    try { const v = window.localStorage.getItem(key); return v ? JSON.parse(v) as T : fallback; } catch { return fallback; }
}
function save(key: string, value: unknown) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* 残せなくても遊べる */ }
}
const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

function Sigil({ el, size, color = '#fff' }: { el: string; size: number; color?: string }) {
    const p: Record<string, React.ReactNode> = {
        flame: <path fill={color} d="M12 2c1 4 5 5.5 5 10.5a5 5 0 0 1-10 0c0-2 1-3.2 2-4.2 0 2 1 3 2 3 0-3-1-5.3 1-9.3z" />,
        aqua: <path fill={color} d="M12 2.5c4 5 6 8 6 11.5a6 6 0 0 1-12 0c0-3.500 2-6.500 6-11.500z" />,
        wind: <path fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" d="M3 9h10a3 3 0 1 0-3-3M3 14h15a3 3 0 1 1-3 3M3 19h6" />,
        earth: <path fill={color} fillRule="evenodd" d="M12 3l9.500 17h-19zM12 9.500l-4.300 7.500h8.600z" />,
        thunder: <path fill={color} d="M13.500 2L4 14h6l-1.500 8L19 10h-6z" />,
    };
    return <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block' }}>{p[el] || p.flame}</svg>;
}

/** カードの絵。id から毎回同じ模様になる */
function CardArt({ spec }: { spec: CardSpec }) {
    const [c0, c1, c2] = PAL[spec.element] || PAL.flame;
    const url = artFor(spec);
    // eslint-disable-next-line @next/next/no-img-element
    if (url) return <img src={url} alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%' }} />;
    const n = (i: number) => spec.id.charCodeAt(i % spec.id.length);
    const sides = 3 + (n(0) % 6), rays = 8 + (n(1) % 9), rot = n(2) % 360, r2 = 30 + (n(3) % 30);
    const poly = (r: number, k: number, off: number) => Array.from({ length: k }).map((_, i) => {
        const a = (i / k) * Math.PI * 2 + off;
        return `${(112 + Math.cos(a) * r).toFixed(1)},${(112 + Math.sin(a) * r).toFixed(1)}`;
    }).join(' ');
    const gid = `g${spec.id.replace(/[^a-zA-Z0-9]/g, '')}`;
    return (
        <svg viewBox="0 0 224 224" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <defs>
                <radialGradient id={gid} cx="50%" cy="42%" r="75%">
                    <stop offset="0%" stopColor="#fff" /><stop offset="28%" stopColor={c0} /><stop offset="68%" stopColor={c1} /><stop offset="100%" stopColor={c2} />
                </radialGradient>
            </defs>
            <rect width="224" height="224" fill={`url(#${gid})`} />
            <g transform={`rotate(${rot} 112 112)`} opacity="0.5">
                {Array.from({ length: rays }).map((_, i) => <line key={i} x1="112" y1="112" x2={112 + Math.cos((i / rays) * Math.PI * 2) * 180} y2={112 + Math.sin((i / rays) * Math.PI * 2) * 180} stroke="#fff" strokeWidth={i % 2 ? 1 : 3} />)}
            </g>
            <polygon points={poly(92, sides, rot / 57)} fill="none" stroke="#fff" strokeWidth="2" opacity="0.75" />
            <polygon points={poly(92 - r2 / 2, sides, rot / 57 + Math.PI / sides)} fill={c2} opacity="0.28" />
            <circle cx="112" cy="112" r={r2 + 22} fill="none" stroke={c2} strokeWidth="1.5" opacity="0.6" strokeDasharray={`${4 + (n(4) % 8)} ${3 + (n(5) % 6)}`} />
            <circle cx="112" cy="112" r="38" fill={c2} opacity="0.55" />
            <circle cx="112" cy="112" r="38" fill="none" stroke="#fff" strokeWidth="2.5" />
            <g transform="translate(84 84)"><Sigil el={spec.element} size={56} /></g>
        </svg>
    );
}

// 数字の宝石。色ガラスの結晶(試作 /english/duel/lab/glass の C4 案)。
// 経緯(2026-11-27): 丸い珠 →「しょぼい」→ 面取りの濃い宝石 →「強調が強すぎる。もっと調和させて」→ 透ける案 →「はみ出していい」→ C4 に決定。
// 透ける色ガラスに白い細い縁、面の線。後ろの絵が透けるので絵となじむ。外の光と三重の縁はやめた。
// 形で意味を分ける: コスト = 六角(緑)、攻撃 = 菱形(青)、体力 = 盾(赤)。呼ぶ側は今まで通り色を渡すだけで、色から形を決める。
// 数字は高さのそろった太い書体を、形の重心に置く(Georgia は数字の高さがばらばらで、真ん中に見えない)。
const JEWEL: Record<string, { d: string; cy: number }> = {
    '#047857': { d: 'M24 2 L43.500 13 V35 L24 46 L4.500 35 V13 Z', cy: 24 },
    '#1D4ED8': { d: 'M24 1.500 L46 24 L24 46.500 L2 24 Z', cy: 24 },
    '#B91C1C': { d: 'M24 2.500 L43.500 8.500 V23 C43.500 34.500 35 42 24 46 C13 42 4.500 34.500 4.500 23 V8.500 Z', cy: 22.500 },
};
function Gem({ value, color, size, tint }: { value: number | string; color: [string, string]; size: number; tint?: string }) {
    const id = useId().replace(/:/g, '');
    const j = JEWEL[color[1]] || JEWEL['#047857'];
    const two = String(value).length > 1;
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" style={{ display: 'block', flexShrink: 0, overflow: 'visible', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.5))' }}>
            <defs>
                <clipPath id={`c${id}`}><path d={j.d} /></clipPath>
                <linearGradient id={`h${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0.55" /><stop offset="0.45" stopColor="#fff" stopOpacity="0.05" /><stop offset="1" stopColor="#000" stopOpacity="0.25" /></linearGradient>
            </defs>
            <path d={j.d} fill={color[1]} fillOpacity="0.5" />
            <path d={j.d} fill={`url(#h${id})`} />
            <g clipPath={`url(#c${id})`} stroke="rgba(255,255,255,0.45)" strokeWidth="0.800" fill="none">
                <path d={j.d} transform={`translate(24 ${j.cy}) scale(0.6) translate(-24 ${-j.cy})`} />
                <line x1="24" y1={j.cy} x2="24" y2="0" /><line x1="24" y1={j.cy} x2="0" y2="40" /><line x1="24" y1={j.cy} x2="48" y2="40" />
            </g>
            <path d={j.d} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.600" />
            <text x="24" y={j.cy} textAnchor="middle" dominantBaseline="central" fontFamily={'"Arial Black", "Segoe UI Black", "Helvetica Neue", Arial, sans-serif'} fontWeight="900" fontSize={two ? 19 : 24}
                fill={tint || '#fff'} stroke="rgba(0,0,0,0.62)" strokeWidth="2.600" strokeLinejoin="round" paintOrder="stroke">{value}</text>
        </svg>
    );
}

// 枠・影・窓・帯の値は、本物のカード(training/card-preview/page.tsx の getCardFrame / getCardShadow / getCardWindowBg /
// getFrameAccent と CARD_RANKS)から写した。角は 8px、縁は 8px、内側の余白は 6px、上の帯・窓・下の帯の3段。
// 向こうを直したら、ここも同じ値に直す。
const RANK_STYLE: { paper: string; edge: string; shadow: string; win: string; accent: string; label: string }[] = [
    { paper: 'linear-gradient(#FAFAF9, #FAFAF9)', edge: 'linear-gradient(#E7E5E4, #E7E5E4)', shadow: '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)', win: '#F5F5F4', accent: '#E7E5E4', label: '#A8A29E' },
    { paper: 'linear-gradient(#FFFBF5, #FFFBF5)', edge: 'linear-gradient(135deg, #CD7F32 0%, #E8B87A 30%, #CD7F32 60%, #A0622E 100%)', shadow: '0 6px 16px rgba(205,127,50,0.15), 0 2px 6px rgba(205,127,50,0.1)', win: 'linear-gradient(180deg, #FDF8F0, #FAF0E4)', accent: '#CD7F32', label: '#CD7F32' },
    { paper: 'linear-gradient(#F8FAFB, #F8FAFB)', edge: 'linear-gradient(135deg, #e2e8f0 0%, #ffffff 40%, #cbd5e1 60%, #94a3b8 100%)', shadow: '0 6px 20px rgba(148,163,184,0.25), 0 2px 8px rgba(148,163,184,0.15)', win: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)', accent: '#94A3B8', label: '#94A3B8' },
    { paper: 'linear-gradient(180deg, #FFFEF5 0%, #FFFBEB 100%)', edge: 'linear-gradient(135deg, #D4AF37 0%, #FFF2A8 25%, #F6C85F 50%, #D4AF37 75%, #B8941E 100%)', shadow: '0 8px 24px rgba(212,175,55,0.35), 0 4px 12px rgba(246,200,95,0.25)', win: 'radial-gradient(ellipse at top, #FFFBEB, #FFF3CC 100%)', accent: '#D4AF37', label: '#F6C85F' },
    { paper: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #E0E7FF 100%)', edge: 'linear-gradient(135deg, #E879F9 0%, #A855F7 25%, #6366F1 50%, #3B82F6 75%, #06B6D4 100%)', shadow: '0 8px 30px rgba(168,85,247,0.3), 0 4px 16px rgba(99,102,241,0.25)', win: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(243,232,255,0.8))', accent: '#A855F7', label: '#A855F7' },
    { paper: 'linear-gradient(135deg, #1C1917 0%, #2D2438 50%, #1c1813 100%)', edge: 'linear-gradient(135deg, #18181B 0%, #A855F7 40%, #D4AF37 60%, #18181B 100%)', shadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.4), 0 0 30px rgba(168,85,247,0.3)', win: 'radial-gradient(circle at center, #2D2438 0%, #181A1B 100%)', accent: '#D4AF37', label: '#D4AF37' },
];
const RANK_NAMES = ['', 'BRONZE', 'SILVER', 'GOLD', 'HOLO', 'LEGENDARY'];

/**
 * カード1枚。枠は本物のカードの値(240×340、角8px、縁8px)。絵は全面(本人 2026-11-27「絵が隠れちゃう。絵が優先で全部写して」)。
 * 英語は下の薄い幕に、金の細い線に挟んだ斜体で出す(試作 /english/duel/lab の A 案)。
 * chant = 出した瞬間の見せ場。1語ずつ順に光る(同 D 案)。読み上げは呼ぶ側(perform)が鳴らす。
 */
function Card({ spec, w, back, chant, noCost, fx, onClick, onHover, attrs, style }: {
    spec: CardSpec; w: number; back?: boolean; chant?: boolean; noCost?: boolean;
    fx?: 'chosen' | 'playable' | 'dim';
    onClick?: () => void; onHover?: (s: CardSpec | null) => void; attrs?: Record<string, string | number>; style?: React.CSSProperties;
}) {
    const k = w / CW;
    const R = RANK_STYLE[spec.rank];
    const [, c1] = PAL[spec.element] || PAL.flame;
    const ring =
        fx === 'chosen' ? `0 0 0 4px #fff, 0 0 30px 10px ${GOLD}`
            : fx === 'playable' ? '0 0 0 3px rgba(52,211,153,0.95), 0 0 18px 5px rgba(16,185,129,0.75)'
                : R.shadow;
    const words = spec.text.split(' ');
    const step = Math.min(0.16, 1.15 / words.length);
    const size = spec.text.length > 80 ? 12 : spec.text.length > 55 ? 13.5 : spec.text.length > 30 ? 15.5 : 18;
    const hot = new Set((spec.word || '').toLowerCase().split(' ').filter(Boolean));
    const isHot = (x: string) => hot.has(x.toLowerCase().replace(/[^a-z]/g, ''));
    const own = !!ART[`card-${spec.id}`];
    return (
        <div {...attrs} onClick={onClick} onMouseEnter={onHover ? () => onHover(spec) : undefined} onMouseLeave={onHover ? () => onHover(null) : undefined}
            style={{ position: 'relative', width: w, height: CH * k, flexShrink: 0, cursor: onClick ? 'pointer' : 'default', filter: fx === 'dim' ? 'saturate(0.6) brightness(0.72)' : undefined, ...style }}>
            <div style={{
                width: CW, height: CH, transform: `scale(${k})`, transformOrigin: 'top left', position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
                border: '8px solid transparent', borderRadius: 8,
                background: `linear-gradient(#14101F, #14101F) padding-box, ${R.edge} border-box`,
                boxShadow: ring,
            }}>
                {back ? (
                    ART['card-back']
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={ART['card-back']} alt="" draggable={false} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        : (
                            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, #FFF8DC 0%, #F6C85F 45%, #B8941E 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', inset: 8, border: '3px double #fff', borderRadius: 6, opacity: 0.8 }} />
                                <div style={{ width: 110, height: 110, borderRadius: '50%', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(140,109,15,0.55)' }}>
                                    <span style={{ fontSize: 60, fontWeight: 900, color: '#fff', fontFamily: 'Georgia, serif' }}>E</span>
                                </div>
                            </div>
                        )
                ) : (
                    <>
                        <CardArt spec={spec} />
                        {/* 下の幕と英語 */}
                        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '52%', background: 'linear-gradient(180deg, rgba(10,8,30,0) 0%, rgba(10,8,30,0.72) 48%, rgba(10,8,30,0.94) 100%)' }} />
                        <div style={{ position: 'absolute', left: 14, right: 14, bottom: 44, textAlign: 'center' }}>
                            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #FFF2A8, transparent)', marginBottom: 6 }} />
                            {spec.word && (
                                <div style={{ marginBottom: chant ? 4 : 0 }}>
                                    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 900, fontSize: spec.word.length > 11 ? 23 : 30, lineHeight: 1.1, letterSpacing: 0.5, color: '#FFF6C8', textShadow: '0 0 12px rgba(246,200,95,0.9), 0 2px 3px #000' }}>{spec.word}</div>
                                    <div style={{ marginTop: 3, fontSize: 13, fontWeight: 800, lineHeight: 1.3, color: '#fff', textShadow: '0 1px 3px #000' }}>{spec.ja}</div>
                                </div>
                            )}
                            {(!spec.word || chant) && (
                                <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontSize: spec.word ? Math.min(size, 13.5) : size, lineHeight: 1.32, color: '#FFFDF2', textShadow: '0 0 8px rgba(253,230,138,0.85), 0 1px 2px #000', display: '-webkit-box', WebkitLineClamp: 5, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {chant
                                        ? words.map((x, i) => <span key={i} style={{ display: 'inline-block', marginRight: '0.28em', opacity: 0.28, animation: `duel-${isHot(x) ? 'chant-hot' : 'chant'} .5s ease-out ${0.15 + i * step}s forwards` }}>{x}</span>)
                                        : spec.text}
                                </div>
                            )}
                            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, #FFF2A8, transparent)', marginTop: 6 }} />
                            {spec.ability !== 'NONE' && (
                                <div style={{ marginTop: 4, fontSize: 9, lineHeight: 1.3, color: 'rgba(255,242,168,0.92)', textShadow: '0 1px 2px #000' }}>
                                    <b style={{ letterSpacing: 1, color: c1 }}>{abilityName(spec.ability)}</b> {LANG === 'ja' ? ABILITY_JA[spec.ability] : ABILITY_TEXT[spec.ability]}
                                </div>
                            )}
                        </div>
                        {/* 上: コスト … 属性と枠 */}
                        <div style={{ position: 'absolute', right: 6, top: 7, display: 'flex', gap: 4, alignItems: 'center' }}>
                            {rankLabel(spec) && <span style={{ fontSize: 8, fontWeight: 900, letterSpacing: 1.5, color: R.label, background: 'rgba(10,8,30,0.6)', borderRadius: 4, padding: '1px 5px' }}>{rankLabel(spec)}</span>}
                            <span style={{ fontSize: 9, fontWeight: 900, letterSpacing: 1, color: '#fff', background: 'rgba(10,8,30,0.6)', border: `1px solid ${c1}`, borderRadius: 4, padding: '1px 6px' }}>{elementLabel(spec)}</span>
                        </div>
                        {/* 下: ATK … 画風・番号 … HP */}
                        {/* 四隅の飾り */}
                        {[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => (
                            <svg key={`${x}${y}`} width="30" height="30" viewBox="0 0 30 30" style={{ position: 'absolute', [x ? 'right' : 'left']: 3, [y ? 'bottom' : 'top']: 3, transform: `scale(${x ? -1 : 1}, ${y ? -1 : 1})`, opacity: 0.9, pointerEvents: 'none' } as React.CSSProperties}>
                                <path d="M2 28 V9 C2 5 5 2 9 2 H28" fill="none" stroke="#FFF2A8" strokeWidth="1.400" />
                                <path d="M6 22 V11 C6 8 8 6 11 6 H22" fill="none" stroke="#FFF2A8" strokeWidth="0.700" opacity="0.7" />
                                <circle cx="8.500" cy="8.500" r="2" fill="#FFF2A8" />
                            </svg>
                        ))}
                        <div style={{ position: 'absolute', left: 44, right: 44, bottom: 9, textAlign: 'center', fontSize: 7.5, fontWeight: 700, letterSpacing: 1, lineHeight: 1.35, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
                            {own && <>{spec.style || styleOf(spec.id)}<br /></>}{spec.tier} · {spec.no ? `No.${spec.no}` : spec.id.slice(0, 6)}
                        </div>
                    </>
                )}
            </div>
            {!back && (
                <>
                    {!noCost && <div style={{ position: 'absolute', left: -w * 0.06, top: -w * 0.06 }}><Gem value={spec.cost} color={['#6EE7B7', '#047857']} size={Math.round(w * 0.22)} /></div>}
                    <div style={{ position: 'absolute', left: -w * 0.06, bottom: -w * 0.06 }}><Gem value={spec.atk} color={['#93C5FD', '#1D4ED8']} size={Math.round(w * 0.22)} /></div>
                    <div style={{ position: 'absolute', right: -w * 0.06, bottom: -w * 0.06 }}><Gem value={spec.hp} color={['#FCA5A5', '#B91C1C']} size={Math.round(w * 0.22)} /></div>
                </>
            )}
        </div>
    );
}

/** 場のユニット。カードではなく、絵だけのアーチ形の駒。左下に ATK(青)、右下に HP(赤)。英語は駒の下に出す */
function Token({ spec, w, atk, hp, fx, attrs, onClick, onHover }: {
    spec: CardSpec; w: number; atk: number; hp: number; fx?: 'ready' | 'target' | 'chosen' | 'spent';
    attrs?: Record<string, string | number>; onClick?: () => void; onHover?: (s: CardSpec | null) => void;
}) {
    const R = RANK_STYLE[spec.rank];
    const [, c1, c2] = PAL[spec.element] || PAL.flame;
    const h = Math.round(w * 1.24), gem = Math.round(w * 0.4), bw = Math.max(3, Math.round(w * 0.055));
    const shape = `${w / 2}px ${w / 2}px ${w * 0.16}px ${w * 0.16}px`;
    const edge = spec.rank === 0 ? 'linear-gradient(160deg, #FAFAF9 0%, #A8A29E 45%, #F5F5F4 70%, #78716C 100%)' : R.edge;
    const glow = fx === 'chosen' ? `0 0 0 3px #fff, 0 0 26px 10px ${GOLD}` : fx === 'spent' ? '0 6px 12px rgba(0,0,0,0.45)' : '0 8px 16px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.35)';
    const anim = fx === 'ready' ? 'duel-ready 1.3s ease-in-out infinite' : fx === 'target' ? 'duel-target 0.9s ease-in-out infinite' : undefined;
    return (
        <div {...attrs} onClick={onClick} onMouseEnter={onHover ? () => onHover(spec) : undefined} onMouseLeave={onHover ? () => onHover(null) : undefined}
            style={{ position: 'relative', width: w, height: h, cursor: onClick ? 'pointer' : 'default', filter: fx === 'spent' ? 'saturate(0.55) brightness(0.82)' : undefined, animation: fx === 'ready' || fx === 'chosen' ? 'duel-float 2.4s ease-in-out infinite' : undefined }}>
            <div style={{ position: 'absolute', left: '8%', right: '8%', bottom: -h * 0.09, height: h * 0.16, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: shape, border: `${bw}px solid transparent`, background: `linear-gradient(#111, #111) padding-box, ${edge} border-box`, overflow: 'hidden', boxShadow: anim ? undefined : glow, animation: anim }}>
                <CardArt spec={spec} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.5) 100%)' }} />
                {spec.ability === 'WARD' && <div style={{ position: 'absolute', inset: 0, borderRadius: shape, boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.9), inset 0 0 18px 6px rgba(96,165,250,0.95)' }} />}
            </div>
            {spec.ability !== 'NONE' && (
                <div style={{ position: 'absolute', left: '50%', top: -Math.round(w * 0.07), transform: 'translateX(-50%)', fontSize: Math.max(8, w * 0.1), fontWeight: 900, letterSpacing: 1, color: '#fff', background: `linear-gradient(180deg, ${c1}, ${c2})`, border: '1.5px solid #fff', borderRadius: 999, padding: '0 7px', lineHeight: 1.5, whiteSpace: 'nowrap', boxShadow: '0 2px 5px rgba(0,0,0,0.45)' }}>{abilityName(spec.ability)}</div>
            )}
            <div style={{ position: 'absolute', left: -gem * 0.28, bottom: -gem * 0.22 }}><Gem value={atk} color={['#93C5FD', '#1D4ED8']} size={gem} tint={atk > spec.atk ? '#BBF7D0' : undefined} /></div>
            <div style={{ position: 'absolute', right: -gem * 0.28, bottom: -gem * 0.22 }}><Gem value={hp} color={['#FCA5A5', '#B91C1C']} size={gem} tint={hp < spec.hp ? '#FECACA' : undefined} /></div>
        </div>
    );
}

/** リーダー。金の輪の中に絵(無ければ紋章)。右下に体力、下に名前の札 */
function Leader({ side, hp, size, hit, target, onClick }: { side: 0 | 1; hp: number; size: number; hit: boolean; target: boolean; onClick?: () => void }) {
    const c = side === 0 ? ['#A7F3D0', '#059669', '#064E3B'] : ['#FECDD3', '#E11D48', '#881337'];
    const img = ART[side === 0 ? 'leader-you' : 'leader-rival'];
    const gem = Math.round(size * 0.46);
    return (
        <div data-leader={side} onClick={onClick} style={{ position: 'relative', width: size, height: size, cursor: onClick ? 'pointer' : 'default', animation: hit ? 'duel-shake 0.4s ease' : undefined }}>
            <div style={{ position: 'absolute', inset: -Math.round(size * 0.09), borderRadius: '50%', background: 'conic-gradient(from 0deg, #8C6D0F, #FFF2A8, #D4AF37, #8C6D0F, #FFF2A8, #D4AF37, #8C6D0F)', boxShadow: '0 10px 24px rgba(0,0,0,0.6)' }} />
            <div style={{ position: 'absolute', inset: -Math.round(size * 0.04), borderRadius: '50%', background: '#3B2F16' }} />
            <div style={{
                position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
                background: `radial-gradient(circle at 38% 28%, #fff 0%, ${c[0]} 22%, ${c[1]} 62%, ${c[2]} 100%)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: target ? 'duel-target 0.9s ease-in-out infinite' : undefined,
            }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {img ? <img src={img} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (
                    <svg viewBox="0 0 64 64" width={size * 0.62} height={size * 0.62}>
                        <path d="M8 44l4-24 12 12 8-18 8 18 12-12 4 24z" fill="#fff" opacity="0.95" />
                        <rect x="8" y="46" width="48" height="6" rx="2" fill="#fff" opacity="0.95" />
                        <circle cx="32" cy="12" r="3.500" fill="#FFF2A8" /><circle cx="11" cy="19" r="3" fill="#FFF2A8" /><circle cx="53" cy="19" r="3" fill="#FFF2A8" />
                    </svg>
                )}
            </div>
            <div style={{ position: 'absolute', right: -gem * 0.5, bottom: -gem * 0.12 }}><Gem value={hp} color={['#FCA5A5', '#B91C1C']} size={gem} tint={hp < START_HP ? '#FECACA' : undefined} /></div>
            <div style={{ position: 'absolute', left: '50%', bottom: -Math.round(size * 0.2), transform: 'translateX(-50%)', fontSize: Math.max(9, size * 0.12), fontWeight: 900, letterSpacing: 3, color: '#FFF2A8', background: 'linear-gradient(180deg, #5B4513, #2E220A)', border: '1.5px solid #D4AF37', borderRadius: 4, padding: '1px 10px', fontFamily: 'Georgia, serif', whiteSpace: 'nowrap' }}>{side === 0 ? BT[LANG].you : BT[LANG].rival}</div>
        </div>
    );
}

/** 金の縁の小さな札(枚数やエナジーを書く) */
function Plaque({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div style={{ background: 'linear-gradient(180deg, #4A3A14, #2A1F08)', border: '2px solid #D4AF37', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,242,168,0.35)', color: '#FFF2A8', fontWeight: 900, fontFamily: 'Georgia, serif', whiteSpace: 'nowrap', ...style }}>{children}</div>
    );
}

interface Pop { id: number; x: number; y: number; text: string; color: string }
interface Ghost { id: number; x: number; y: number; w: number; spec: CardSpec }
interface Burst { id: number; x: number; y: number; color: string }

// ── ルールのデモ(盤面が勝手に動いて、順に説明する)──
// 本人(2026-11-27)「ページ開いてルールとか説明するデモを作って」。初めて開いたとき自動で流れ、HOW TO PLAY で見直せる。
// 中身は本物のカード(山の先頭から)に、説明用の数字と能力をかぶせたもの。行動は本番と同じ apply() を通る。
const DEMO_SEEN_KEY = 'duel:demo:seen:v1';
function demoGame(pool: CardSpec[]): Game {
    const pick = (i: number, o: Partial<CardSpec>): CardSpec => ({ ...pool[i % pool.length], ...o });
    const me: Side = {
        hp: START_HP, energy: 1, energyMax: 1, field: [], grave: [],
        hand: [pick(0, { cost: 1, atk: 2, hp: 3, ability: 'NONE' }), pick(1, { cost: 2, atk: 2, hp: 2, ability: 'RUSH' }), pick(2, { cost: 3, atk: 3, hp: 4, ability: 'INSIGHT' })],
        deck: [pick(6, { cost: 3, atk: 3, hp: 3, ability: 'HEAL' }), pick(7, { cost: 4, atk: 4, hp: 4, ability: 'STRIKE' }), pick(8, { cost: 2, atk: 2, hp: 3, ability: 'NONE' })],
    };
    const foe: Side = {
        hp: START_HP, energy: 0, energyMax: 0, field: [], grave: [],
        hand: [pick(3, { cost: 1, atk: 1, hp: 2, ability: 'NONE' }), pick(4, { cost: 2, atk: 1, hp: 4, ability: 'WARD' }), pick(5, { cost: 4, atk: 4, hp: 5, ability: 'NONE' })],
        deck: [pick(9, { cost: 3, atk: 3, hp: 3, ability: 'NONE' }), pick(10, { cost: 2, atk: 2, hp: 2, ability: 'NONE' }), pick(11, { cost: 3, atk: 2, hp: 4, ability: 'NONE' })],
    };
    return { seed: 1, turn: 1, active: 0, sides: [me, foe], winner: null, log: ['Demo.'], nextUid: 1 };
}
const DEMO_STEPS: { cap: string; act?: Action; read?: number }[] = [
    { cap: 'Each leader has 20 HP. Bring the rival leader to 0 and you win.', read: 3800 },
    { cap: 'You get 1 more energy every turn. The green gem on a card is its cost.', read: 3800 },
    { cap: 'You have 1 energy. Tap a glowing card to play it.', act: { type: 'play', idx: 0 }, read: 2600 },
    { cap: 'A unit cannot attack on the turn it is played. End your turn.', act: { type: 'end' }, read: 3000 },
    { cap: 'The rival plays a unit too.', act: { type: 'play', idx: 0 }, read: 1600 },
    { cap: 'Blue gem = attack. Red gem = health.', act: { type: 'end' }, read: 3000 },
    { cap: 'Tap your unit, then a target. Each one loses health equal to the other\'s attack.', act: { type: 'attack', a: 1, t: 2 }, read: 3600 },
    { cap: 'Health at 0 means destroyed. Yours survived with 2 left.', read: 3000 },
    { cap: 'RUSH: this unit can attack on the turn it is played.', act: { type: 'play', idx: 0 }, read: 2800 },
    { cap: 'Nothing in the way? Hit the rival leader.', act: { type: 'attack', a: 3, t: null }, read: 2400 },
    { cap: 'End your turn.', act: { type: 'end' }, read: 1400 },
    { cap: 'WARD: enemies must attack this unit first.', act: { type: 'play', idx: 0 }, read: 2000 },
    { cap: 'The WARD blocks the way to the leader.', act: { type: 'end' }, read: 2600 },
    { cap: 'So break the WARD first.', act: { type: 'attack', a: 1, t: 4 }, read: 2200 },
    { cap: 'One more hit.', act: { type: 'attack', a: 3, t: 4 }, read: 1500 },
    { cap: 'Other abilities. HEAL: +2 HP to your leader. INSIGHT: draw a card. STRIKE: 2 damage to the strongest enemy.', read: 5200 },
    { cap: 'That is everything. Pick 20 cards and duel.', read: 3000 },
];

/** 0 から to まで、数え上げて見せる数字 */
function CountUp({ to, delay = 0 }: { to: number; delay?: number }) {
    const [v, setV] = useState(0);
    useEffect(() => {
        let raf = 0;
        const t0 = performance.now() + delay;
        const tick = (now: number) => {
            const k = Math.max(0, Math.min(1, (now - t0) / 900));
            setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
            if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        const done = setTimeout(() => setV(to), delay + 1200);   // 裏のタブなどで描画が止まっていても、最後は正しい数にする
        return () => { cancelAnimationFrame(raf); clearTimeout(done); };
    }, [to, delay]);
    return <>{v}</>;
}

// 最初の画面とカード一覧の文言(日本語 / 英語)。対戦中の短い札(ENERGY など)は英語のまま
const LANG_KEY = 'duel:lang:v1';
const TEXT = {
    ja: {
        pitch: '自分の英語カードで戦うカードゲーム。カードを出すたびに、その英語が声で流れる。相手のリーダーの体力を 0 にしたら勝ち。',
        play: '対戦する', playSub: 'コンピューターと1戦。デッキは自動で組まれる',
        online: '友だちと対戦', onlineSub: '招待リンクを送るだけ。相手は登録もデッキもいらない',
        walk: '中庭を歩く', walkSub: '3Dの中庭を歩いて、声を聞きながら20枚を自分で選ぶ',
        how: '遊び方', howSub: '盤面が動いて、1分でルールを見せる',
        guide: 'ルールブック', guideSub: '図で読む。画面の見方から、勝つコツまで',
        cards: 'カードを見る', cardsSub: '絵と英文と声。押すと大きく出る',
        record: '戦績', win: '勝', lose: '敗', loading: 'カードを読み込み中...', loadFail: 'カードを読み込めなかった。読み込み直して。',
        back: '戻る', count: '枚', cardsHint: 'カードを押すと、大きく表示される。', close: '閉じる',
        listen: '読み上げを聞く', listenActed: '声を聞く', cost: 'コスト', atk: '攻撃', hp: '体力', noAbility: '能力なし', style: '画風',
        room: '対戦の部屋', roomHelp: 'このリンクを相手に送る。相手が開いた瞬間に対戦が始まる。', waiting: '相手を待っています...', copy: 'リンクを写す', cancel: 'やめる',
    },
    en: {
        pitch: 'A card game played with your own English lines. Every card you play is spoken aloud. Bring the rival leader to 0 HP to win.',
        play: 'Play', playSub: 'One match against the computer. Your deck is built for you',
        online: 'Play a friend', onlineSub: 'Send an invite link. No account or deck needed on their side',
        walk: 'Walk the grounds', walkSub: 'A 3D courtyard. Hear each card and pick your own twenty',
        how: 'How to play', howSub: 'The board plays itself and shows the rules in a minute',
        guide: 'Rulebook', guideSub: 'Read it with pictures: the screen, the cards, a turn, tips',
        cards: 'Cards', cardsSub: 'Art, lines and voices. Tap one to see it large',
        record: 'Record', win: 'W', lose: 'L', loading: 'Loading cards...', loadFail: 'Could not load the cards. Reload the page.',
        back: 'Back', count: 'cards', cardsHint: 'Tap a card to see it large.', close: 'Close',
        listen: 'Hear it read', listenActed: 'Hear the voice', cost: 'Cost', atk: 'Attack', hp: 'Health', noAbility: 'No ability', style: 'Art style',
        room: 'ONLINE ROOM', roomHelp: 'Send this link. The duel starts the moment they open it.', waiting: 'Waiting for the other player...', copy: 'Copy link', cancel: 'Cancel',
    },
} as const;
/** いま表示している言語。対戦の部品(Card など)は DuelGame の外にあるので、ここから読む。DuelGame が描くたびに書き込む */
let LANG: 'ja' | 'en' = 'ja';
// 本人(2026-11-27)「日本人が使いやすいように日本語の表記を工夫して、バトル説明も超丁寧に」。対戦中の表示は全部ここから出す(English に切り替えると元の英語)
const ABILITY_NAME_JA: Record<string, string> = { HEAL: '回復', STRIKE: '一撃', WARD: '守護', INSIGHT: 'ひらめき', RUSH: '速攻', NONE: '' };
const abilityName = (a: string) => LANG === 'ja' ? (ABILITY_NAME_JA[a] ?? a) : a;
const ELEMENT_JA: Record<string, string> = { flame: '炎', aqua: '水', wind: '風', earth: '土', thunder: '雷' };
const POS_LABEL: Record<string, [string, string]> = { flame: ['動詞', 'VERB'], earth: ['名詞', 'NOUN'], wind: ['形容詞', 'ADJ'], thunder: ['副詞', 'ADV'], aqua: ['熟語', 'PHRASE'] };
/** カード右上の札。単語カードは品詞、ふつうのカードは属性 */
const elementLabel = (c: CardSpec) => c.word ? (POS_LABEL[c.element] || ['', ''])[LANG === 'ja' ? 0 : 1] : LANG === 'ja' ? ELEMENT_JA[c.element] : ELEMENT_NAMES[c.element];
/** その隣の札。単語カードは TOEIC の点数帯、ふつうのカードはランク */
const rankLabel = (c: CardSpec) => c.word ? `TOEIC ${c.band || 500}` : RANK_NAMES[c.rank];
const BT = {
    ja: {
        you: 'あなた', rival: '相手', energy: 'エナジー', deck: '山札', hand: '手札', turn: 'ターン', win: '勝', lose: '敗',
        end1: 'ターン', end2: '終了', rv1: '相手', rv2: 'の番', yourField: '自分の場', rivalField: '相手の場',
        soundOn: '音 入', soundOff: '音 切', quit: 'やめる', yourTurn: 'あなたの番', rivalTurn: '相手の番',
        play: '場に出す', noEnergy: 'エナジーが足りない', notTurn: '相手の番です', back: '戻る',
        howto: '遊び方', skip: '飛ばして対戦する', restart: '最初から',
        winSub: '相手のリーダーを倒した', loseSub: '自分のリーダーが倒された', tLeader: 'あなたの体力', tTurns: 'ターン数', tRecord: '戦績',
        home: 'ホームへ', words: '出た単語', rematch: 'もう1戦', guestAgain: 'もう1戦するときは、新しいリンクをもらってください。',
        reviewTitle: 'この対戦で出た単語', reviewHelp: '意味を思い出してから、押して確かめる。', tapMeaning: '押すと意味',
        hOver: '対戦は終わり。', hRival: '相手の番。相手が考えています...', hTarget: '攻撃する相手を押す。相手のユニットでも、相手のリーダーでもいい。',
        hWard: '「守護」のユニットが道をふさいでいる。先にそれを攻撃する。', hIdle: 'もうできることがない。右の「ターン終了」を押す。',
        hBoth: '緑に光るカードは出せる。光っているユニットは攻撃できる。どちらからでもいい。',
        hPlay: '緑に光っているカードを押すと、場に出る。カード左上の数字が、必要なエナジー。',
        hAttack: '光っている自分のユニットを押して選ぶ。そのあと、攻撃する相手を押す。',
        hPhonePlay: '手札を押すと大きく出る。「場に出す」で場に出る。', hPhoneBoth: '手札を押すと出せる。光っているユニットを押すと攻撃できる。',
    },
    en: {
        you: 'YOU', rival: 'RIVAL', energy: 'ENERGY', deck: 'DECK', hand: 'HAND', turn: 'TURN', win: 'W', lose: 'L',
        end1: 'END', end2: 'TURN', rv1: 'RIVAL', rv2: 'TURN', yourField: 'YOUR FIELD', rivalField: 'RIVAL FIELD',
        soundOn: 'SOUND ON', soundOff: 'SOUND OFF', quit: 'QUIT', yourTurn: 'YOUR TURN', rivalTurn: 'RIVAL TURN',
        play: 'PLAY', noEnergy: 'NOT ENOUGH ENERGY', notTurn: 'RIVAL TURN', back: 'BACK',
        howto: 'HOW TO PLAY', skip: 'SKIP AND PLAY', restart: 'RESTART',
        winSub: 'THE RIVAL LEADER HAS FALLEN', loseSub: 'YOUR LEADER HAS FALLEN', tLeader: 'YOUR LEADER', tTurns: 'TURNS', tRecord: 'RECORD',
        home: 'HOME', words: 'WORDS', rematch: 'REMATCH', guestAgain: 'Ask for a new link to play again.',
        reviewTitle: 'WORDS FROM THIS DUEL', reviewHelp: 'Recall the meaning first, then tap to check.', tapMeaning: 'tap for meaning',
        hOver: 'Game over.', hRival: 'Rival is thinking...', hTarget: 'Tap a rival unit or the rival leader.',
        hWard: 'A WARD unit blocks the way. Tap it.', hIdle: 'Nothing left to do. End your turn.',
        hBoth: 'Tap a glowing card to play it. Tap a glowing unit, then a target.',
        hPlay: 'Tap a glowing card to play it. The number at its top left is the energy it needs.',
        hAttack: 'Tap one of your glowing units, then tap a target.',
        hPhonePlay: 'Tap a card to look at it and play it.', hPhoneBoth: 'Tap a card to play it. Tap a glowing unit to attack.',
    },
} as const;
const ABILITY_JA: Record<string, string> = {
    HEAL: '出したとき、自分のリーダーの体力を 2 回復する。',
    STRIKE: '出したとき、相手のいちばん攻撃の高いユニットに 2 ダメージ。',
    WARD: '相手は、先にこのユニットを攻撃しなければならない。',
    INSIGHT: '出したとき、カードを1枚引く。',
    RUSH: '出したターンに攻撃できる。',
};
const DEMO_JA = [
    'リーダーの体力は 20。相手のリーダーを 0 にしたら勝ち。',
    'エナジーは毎ターン 1 つ増える。カードの緑の宝石がコスト。',
    'いまエナジーは 1。光っているカードを押して出す。',
    '出したターンは攻撃できない。ターンを終える。',
    '相手もユニットを出す。',
    '青い宝石が攻撃、赤い宝石が体力。',
    '自分のユニットを押して、相手を押す。お互いに、相手の攻撃の分だけ体力が減る。',
    '体力が 0 になると破壊。こちらは 2 残って生き残った。',
    '能力「速攻」: このユニットは、出したターンにすぐ攻撃できる。',
    '邪魔がいなければ、相手のリーダーを攻撃する。',
    'ターンを終える。',
    '能力「守護」: 相手は、先にこのユニットを攻撃しなければならない。',
    '「守護」が、リーダーへの道をふさいでいる。',
    'だから、先に「守護」のユニットを倒す。',
    'もう1回。',
    'ほかの能力。「回復」: リーダーの体力 +2。「ひらめき」: カードを1枚引く。「一撃」: 相手のいちばん強いユニットに 2 ダメージ。',
    'これで全部。くわしくは、最初の画面の「ルールブック」にまとめてある。さあ対戦しよう。',
];

/** 舞台。1つずつ専用の絵がある(public/duel/art/board*.webp。scripts/duel-art-generate.mjs --base で作る。お題は src/data/english/duel-art.json)。
 *  横長(1536x1024)と、スマホ用の縦長(<名前>-tall、1024x1536)の2枚ずつ。cy は絵の中の魔法陣の中心の高さ(0〜1)、ring は魔法陣の幅(絵の幅に対する割合)。tcy / tring は縦長の絵の同じ数字。重ねる輪をこれに合わせる。
 *  色だけ替えた版(夕暮れ・月夜・秋・雪。同じ地形の色ちがい)は、本人の「5枚作って」(2026-11-27)で絵のある舞台に入れ替えた */
type Arena = { name: string; img: string; cy: number; ring: number | null; tcy: number; tring: number | null; corners: boolean; base: string; filter: string; tint: string | null; blend: string; ray: string; rayOpacity: number; shade: number; glow: string; line: string; motes: { kind: 'fall' | 'rise' | 'float'; colors: string[]; leaf?: boolean; n: number; size: [number, number] } };
const ARENAS: Arena[] = [
    { name: 'MEADOW', img: 'board', cy: 0.5, ring: null, tcy: 0.5, tring: null, corners: true, base: '#14240f', filter: 'none', tint: null, blend: 'normal', ray: 'rgba(255,244,190,0.55)', rayOpacity: 0.5, shade: 0.3, glow: '#FFF2A8', line: '#FFF2A8', motes: { kind: 'fall', colors: ['#FFD1E3', '#ffffff', '#FBCFE8'], leaf: true, n: 26, size: [7, 13] } },
    { name: 'VOLCANO', img: 'board-volcano', cy: 0.49, ring: 0.45, tcy: 0.47, tring: 0.73, corners: false, base: '#120604', filter: 'none', tint: null, blend: 'normal', ray: 'rgba(255,140,60,0.6)', rayOpacity: 0.28, shade: 0.3, glow: '#FF9A4D', line: '#FFB37A', motes: { kind: 'rise', colors: ['#FDBA74', '#FDE68A', '#F97316', '#EF4444'], n: 40, size: [3, 6] } },
    { name: 'MOONLIT RUINS', img: 'board-moon', cy: 0.5, ring: 0.475, tcy: 0.5, tring: 0.7, corners: false, base: '#050a1c', filter: 'none', tint: null, blend: 'normal', ray: 'rgba(170,200,255,0.6)', rayOpacity: 0.35, shade: 0.3, glow: '#BFDBFE', line: '#DBEAFE', motes: { kind: 'float', colors: ['#FEF9C3', '#BBF7D0', '#ffffff', '#BFDBFE'], n: 32, size: [4, 7] } },
    { name: 'AUTUMN SHRINE', img: 'board-shrine', cy: 0.5, ring: 0.5, tcy: 0.49, tring: 0.7, corners: false, base: '#2a1206', filter: 'none', tint: null, blend: 'normal', ray: 'rgba(255,214,140,0.6)', rayOpacity: 0.4, shade: 0.3, glow: '#FED7AA', line: '#FFE8B8', motes: { kind: 'fall', colors: ['#F59E0B', '#DC2626', '#B45309', '#EF4444'], leaf: true, n: 30, size: [9, 16] } },
    { name: 'ICE CATHEDRAL', img: 'board-ice', cy: 0.5, ring: 0.57, tcy: 0.57, tring: 0.8, corners: false, base: '#c9d6ee', filter: 'contrast(1.12) saturate(1.25) brightness(0.9)', tint: 'linear-gradient(180deg, rgba(30,58,138,0.22) 0%, rgba(30,64,175,0.12) 100%)', blend: 'normal', ray: 'rgba(255,255,255,0.6)', rayOpacity: 0.3, shade: 0.16, glow: '#7DD3FC', line: '#E0F2FE', motes: { kind: 'fall', colors: ['#ffffff', '#E0F2FE'], n: 46, size: [3, 8] } },
    { name: 'DESERT TEMPLE', img: 'board-desert', cy: 0.49, ring: 0.5, tcy: 0.5, tring: 0.7, corners: false, base: '#3a2208', filter: 'none', tint: null, blend: 'normal', ray: 'rgba(255,200,120,0.6)', rayOpacity: 0.42, shade: 0.28, glow: '#5EEAD4', line: '#FFE8B8', motes: { kind: 'fall', colors: ['#FDE68A', '#F5D08A', '#ffffff'], n: 36, size: [2, 4] } },
];

/** 舞う粒。位置や速さは番号から決める(描き直しても飛ばない) */
const ArenaMotes = memo(function ArenaMotes({ arena, w, h }: { arena: Arena; w: number; h: number }) {
    const m = arena.motes;
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {Array.from({ length: m.n }).map((_, i) => {
                const x = (i * 61 + 7) % 100, y = (i * 37 + 11) % 100;
                const size = m.size[0] + ((i * 7) % (m.size[1] - m.size[0] + 1));
                const dur = (m.kind === 'float' ? 7 : m.kind === 'rise' ? 6 : 9) + (i % 6) * 1.3;
                const delay = -((i * 1.37) % dur);
                const color = m.colors[i % m.colors.length];
                const base: React.CSSProperties = { position: 'absolute', width: size, height: m.leaf ? size * 0.7 : size, background: color, opacity: 0, willChange: 'transform, opacity' };
                if (m.kind === 'float') {
                    return <span key={i} style={{ ...base, left: `${x}%`, top: `${y}%`, borderRadius: '50%', boxShadow: `0 0 ${size * 2.5}px ${size * 0.8}px ${color}`,
                        ['--dx' as string]: `${((i * 29) % 120) - 60}px`, ['--dy' as string]: `${((i * 43) % 90) - 45}px`, animation: `duel-firefly ${dur}s ease-in-out ${delay}s infinite` } as React.CSSProperties} />;
                }
                const rise = m.kind === 'rise';
                return <span key={i} style={{ ...base, left: `${x}%`, [rise ? 'bottom' : 'top']: -20, borderRadius: m.leaf ? '80% 0 80% 0' : '50%', boxShadow: rise ? `0 0 ${size * 2}px ${size * 0.6}px ${color}` : m.leaf ? '0 1px 2px rgba(0,0,0,0.25)' : `0 0 ${size}px rgba(255,255,255,0.8)`,
                    ['--dx' as string]: `${(rise ? ((i * 29) % 120) - 60 : 60 + ((i * 29) % 200)) * (w / 1400 + 0.4)}px`, ['--dy' as string]: `${(rise ? -0.85 : 1) * (h + 40)}px`, ['--rot' as string]: `${m.leaf ? 360 + (i % 5) * 140 : 0}deg`,
                    animation: `duel-drift ${dur}s linear ${delay}s infinite` } as React.CSSProperties} />;
            })}
        </div>
    );
});

/** 相手側から見た盤面。計算は対称なので、入れ替えた盤面に同じ行動を当てれば、両方の端末で同じ結果になる */
function flip(g: Game): Game {
    return { ...g, active: (1 - g.active) as 0 | 1, sides: [g.sides[1], g.sides[0]], winner: g.winner === null ? null : ((1 - g.winner) as 0 | 1) };
}

// ── 単語パックの進み具合 ──
// 本人(2026-11-27)「覚えたか覚えてないかの基準が無いと進捗が分からない」「デッキは自分の覚えたい語で組む。覚えたら殿堂入り。それを増やしていけば、やってる感がある」
// 「最初のテストがあれば、どんなレベルの人でも始められる」「レベルで勇者が成長する、何をしたらクリアかを明確に」。
// デッキ = いま覚えている途中の20語。対戦のあとの確認テスト(意味の4択)で、日をまたいで2回正解した語は殿堂入りしてデッキから抜け、次の語が入る。
// 殿堂の数が勇者のレベル。章(TOEIC の点数帯)ごとに、殿堂が8割たまるとボスに挑める。記録は端末の中(localStorage)。
type WordStat = { seen: number; ok: string[]; miss: number };
type Progress = { words: Record<string, WordStat>; placed: boolean; start: number; bosses: number[]; deck: string[]; bench: string[] };
const emptyProg = (): Progress => ({ words: {}, placed: false, start: 0, bosses: [], deck: [], bench: [] });
const progKey = (id: string) => `duel:progress:v1:${id}`;
const dayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const HALL_NEED = 2;        // 殿堂入りに要る正解の回数(別の日に)
const BOSS_NEED = 0.8;      // ボスに挑むのに要る、その章の殿堂の割合
const okCount = (p: Progress, id: string) => p.words[id]?.ok.length || 0;
const inHall = (p: Progress, id: string) => okCount(p, id) >= HALL_NEED;
const BANDS = [500, 600, 700, 800, 900];
const chapterOf = (c: CardSpec) => Math.max(0, BANDS.indexOf(c.band || 500));   // 点数帯が章
const CHAPTERS: { name: [string, string]; boss: [string, string]; intro: [string, string]; arena: number }[] = [
    { name: ['見習いの森', 'Apprentice Woods'], boss: ['森の門番', 'The Gatekeeper'], intro: ['仕事の英語の入口。いちばんよく出る語が待っている。', 'The gateway. The most common work words live here.'], arena: 0 },
    { name: ['商人の砂漠', 'Merchant Desert'], boss: ['帳簿の番人', 'The Ledger Keeper'], intro: ['請求と支払いの語が行き交う道。', 'A road of invoices and payments.'], arena: 5 },
    { name: ['会議の社', 'Council Shrine'], boss: ['議長', 'The Chair'], intro: ['会議と規則の語。ここを越えると読める文書が増える。', 'Words of meetings and rules.'], arena: 3 },
    { name: ['契約の氷堂', 'Hall of Contracts'], boss: ['契約の魔術師', 'The Contract Mage'], intro: ['契約書やお知らせに出る、少しかたい語。', 'Stiffer words from contracts and notices.'], arena: 4 },
    { name: ['竜の火口', 'Dragon Crater'], boss: ['満点の竜', 'The Perfect-Score Dragon'], intro: ['上級者でも落とす語。', 'Words even advanced players miss.'], arena: 1 },
];
const HERO_TITLES: [number, string, string][] = [[0, '見習い', 'Apprentice'], [0.2, '冒険者', 'Adventurer'], [0.4, '騎士', 'Knight'], [0.7, '英雄', 'Hero'], [1, '伝説', 'Legend']];
const heroTitle = (hall: number, total: number) => { const r = total ? hall / total : 0; let t = HERO_TITLES[0]; for (const x of HERO_TITLES) if (r >= x[0]) t = x; return LANG === 'ja' ? t[1] : t[2]; };
/** デッキを整える。殿堂入りした語を外し、空きを「始める章から上 → それより下」の順に埋める。控えに回した語は自動では戻さない */
function fillDeck(p: Progress, pool: CardSpec[]): string[] {
    const has = new Set(pool.map(c => c.id));
    const deck = p.deck.filter(id => has.has(id) && !inHall(p, id));
    const key = (c: CardSpec) => chapterOf(c) >= p.start ? chapterOf(c) : 10 + (p.start - chapterOf(c));
    const cand = pool.filter(c => !inHall(p, c.id) && !deck.includes(c.id) && !p.bench.includes(c.id)).sort((x, y) => key(x) - key(y) || (x.no || 0) - (y.no || 0));
    for (const c of cand) { if (deck.length >= DECK_SIZE) break; deck.push(c.id); }
    return deck;
}
/** 答えを記録する。正解は「その日」を1つ足す(同じ日に何度当てても1回)。まちがえたら最初から */
function applyAnswers(p: Progress, res: Record<string, boolean>, pool: CardSpec[]): Progress {
    const words = { ...p.words };
    const day = dayKey();
    for (const [id, ok] of Object.entries(res)) {
        const w = words[id] || { seen: 0, ok: [], miss: 0 };
        words[id] = ok ? { ...w, ok: w.ok.includes(day) ? w.ok : [...w.ok, day] } : { ...w, ok: [], miss: w.miss + 1 };
    }
    const n = { ...p, words };
    return { ...n, deck: fillDeck(n, pool) };
}

/** 意味の4択。対戦のあとの確認テストと、最初のテストで使う */
function Quiz({ title, sub, cards, pool, onDone, onClose }: { title: string; sub: string; cards: CardSpec[]; pool: CardSpec[]; onDone: (res: Record<string, boolean>) => void; onClose: () => void }) {
    const J = (ja: string, en: string) => LANG === 'ja' ? ja : en;
    const qs = useMemo(() => cards.map(c => {
        const others = [...new Set(pool.filter(x => x.id !== c.id && x.ja && x.ja !== c.ja).map(x => x.ja as string))].sort(() => Math.random() - 0.5).slice(0, 3);
        return { c, choices: [...others, c.ja as string].sort(() => Math.random() - 0.5) };
    }), [cards, pool]);
    const [i, setI] = useState(0);
    const [picked, setPicked] = useState<string | null>(null);
    const [res, setRes] = useState<Record<string, boolean>>({});
    const q = qs[i];
    if (!q) return null;
    const right = q.c.ja as string;
    const pick = (x: string) => { if (picked) return; setPicked(x); setRes(r => ({ ...r, [q.c.id]: x === right })); playSfx(x === right ? 'heal' : 'end'); };
    const next = () => { if (i + 1 >= qs.length) onDone(res); else { setI(i + 1); setPicked(null); } };
    const gold = 'linear-gradient(180deg, #FFF6C8 0%, #F6C85F 45%, #B8941E 55%, #F6C85F 100%)';
    return (
        <div data-quiz style={{ position: 'absolute', inset: 0, zIndex: 90, background: 'rgba(8,6,2,0.97)', overflowY: 'auto', color: '#fff' }}>
            <div style={{ maxWidth: 560, margin: '0 auto', padding: '18px 16px 40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 22, color: '#F6C85F' }}>{title}</div>
                    <button onClick={onClose} style={{ marginLeft: 'auto', border: '1px solid #D4AF37', background: 'transparent', color: '#FFF2A8', fontWeight: 800, fontSize: 12, borderRadius: 8, padding: '5px 12px', cursor: 'pointer' }}>{J('やめる', 'Quit')}</button>
                </div>
                <div style={{ marginTop: 2, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{sub}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: '#2A1F08', background: '#F6C85F', borderRadius: 999, padding: '1px 10px' }}>{i + 1} / {qs.length}</span>
                    <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}><div style={{ width: `${((i + (picked ? 1 : 0)) / qs.length) * 100}%`, height: '100%', background: '#10B981', transition: 'width .3s ease' }} /></div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginTop: 18 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {ART[`card-${q.c.id}`] && <img src={ART[`card-${q.c.id}`]} alt="" style={{ width: 92, height: 130, objectFit: 'cover', borderRadius: 8, border: '2px solid #D4AF37', flexShrink: 0 }} />}
                    <div>
                        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{J('この語の意味は?', 'What does this word mean?')}</div>
                        <div data-quiz-word style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: (q.c.word || '').length > 11 ? 30 : 40, lineHeight: 1.15, color: '#FFF6C8' }}>{q.c.word}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 16 }}>
                    {q.choices.map(x => {
                        const good = picked && x === right, bad = picked === x && x !== right;
                        return <button key={x} data-choice={x === right ? 'right' : 'wrong'} onClick={() => pick(x)} style={{ textAlign: 'left', fontSize: 16, fontWeight: 800, lineHeight: 1.4, padding: '12px 14px', borderRadius: 10, cursor: picked ? 'default' : 'pointer', color: '#fff',
                            border: `2px solid ${good ? '#10B981' : bad ? '#EF4444' : 'rgba(212,175,55,0.6)'}`, background: good ? 'rgba(16,185,129,0.25)' : bad ? 'rgba(239,68,68,0.22)' : 'rgba(255,255,255,0.05)', opacity: picked && !good && !bad ? 0.5 : 1 }}>{good ? '○ ' : bad ? '× ' : ''}{x}</button>;
                    })}
                </div>
                {picked && (
                    <div style={{ marginTop: 14, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,175,55,0.4)' }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: picked === right ? '#6EE7B7' : '#FCA5A5' }}>{picked === right ? J('正解', 'Correct') : J('ちがう。正しくは「', 'Not quite. It means "') + (picked === right ? '' : right) + (picked === right ? '' : J('」', '"'))}</div>
                        <div style={{ marginTop: 6, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 16, lineHeight: 1.45, color: '#FFFDF2' }}>{q.c.text}</div>
                        <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)' }}>{q.c.lineJa}</div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                            <button onClick={() => speakLine(q.c.text, q.c.id)} style={{ border: '1px solid #D4AF37', background: 'rgba(255,242,168,0.1)', color: '#FFF2A8', fontWeight: 800, fontSize: 13, borderRadius: 8, padding: '8px 14px', cursor: 'pointer' }}>▶ {J('声を聞く', 'Hear it')}</button>
                            <button data-act="quiz-next" onClick={next} style={{ flex: 1, border: 'none', background: gold, color: '#2A1F08', fontWeight: 900, fontSize: 16, borderRadius: 10, padding: '10px 0', cursor: 'pointer' }}>{i + 1 >= qs.length ? J('結果を見る', 'See result') : J('次へ', 'Next')}</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DuelGame({ guestRoom, pack }: { guestRoom?: string; pack?: WordPack }) {
    const minPool = pack ? 12 : 40;                                     // 対戦を始められる枚数(単語パックは同じ山を両方が使う)
    const seen = useRef<Map<string, CardSpec>>(new Map());              // この対戦で出た単語(終わったあとの一覧に出す)
    const [review, setReview] = useState(false);
    const [shownJa, setShownJa] = useState<Record<string, boolean>>({});
    const [prog, setProg] = useState<Progress>(emptyProg);
    const packId = pack?.id;
    const updateProg = useCallback((fn: (p: Progress) => Progress) => { setProg(p => { const n = fn(p); if (packId) save(progKey(packId), n); return n; }); }, [packId]);
    const [quiz, setQuiz] = useState<CardSpec[] | null>(null);                                           // 対戦のあとの確認テストに出す語
    const [verdict, setVerdict] = useState<{ score: number; n: number; fresh: CardSpec[]; boss: number | null } | null>(null);   // その結果(fresh = いま殿堂入りした語)
    const [placedMsg, setPlacedMsg] = useState<{ ch: number; score: number; n: number } | null>(null);
    const [testCards, setTestCards] = useState<CardSpec[]>([]);
    const bossRef = useRef<number | null>(null);          // いまの対戦がボス戦なら、その章
    const forcedArena = useRef<number | null>(null);      // ボス戦は章の舞台で戦う
    const [pool, setPool] = useState<CardSpec[] | null>(null);
    const [deckIds, setDeckIds] = useState<string[]>([]);
    const [game, setGame] = useState<Game | null>(null);
    const [sel, setSel] = useState<number | null>(null);
    const [record, setRecord] = useState({ win: 0, lose: 0 });
    const [vw, setVw] = useState(1000);
    const [scr, setScr] = useState({ w: 1200, h: 800 });
    const [pops, setPops] = useState<Pop[]>([]);
    const [ghosts, setGhosts] = useState<Ghost[]>([]);
    const [bursts, setBursts] = useState<Burst[]>([]);
    const [hits, setHits] = useState<string[]>([]);
    const [lunge, setLunge] = useState<{ uid: number; dx: number; dy: number } | null>(null);
    const [banner, setBanner] = useState<string | null>(null);
    const [preview, setPreview] = useState<CardSpec | null>(null);
    const [tick, setTick] = useState(0);
    const [aim, setAim] = useState<{ x: number; y: number } | null>(null);
    const [quake, setQuake] = useState(false);
    const [handSel, setHandSel] = useState<number | null>(null);   // (使っていない。前の持ち上げ式の名残)
    const [inspect, setInspect] = useState<{ spec: CardSpec; hand?: number } | null>(null);   // 大きく見ているカード
    const [lang, setLang] = useState<'ja' | 'en'>('ja');
    const [mounted, setMounted] = useState(false);   // 画面全体を覆う部品は body に出すので、ブラウザで開いてから描く
    useEffect(() => setMounted(true), []);
    const [view, setView] = useState<'home' | 'cards' | 'guide' | 'story' | 'test'>('home');
    LANG = lang;
    const [detail, setDetail] = useState<CardSpec | null>(null);   // カード一覧で大きく見ているカード
    const [reveal, setReveal] = useState<{ id: number; spec: CardSpec; side: 0 | 1; ms: number } | null>(null);
    const [demo, setDemo] = useState<{ cap: string; n: number; total: number } | null>(null);
    const [ptr, setPtr] = useState<{ x: number; y: number } | null>(null);
    // 通信対戦。net = 部屋の状態、applied = ここまでに当てた行動の数(自分のも相手のも)
    const [net, setNet] = useState<{ code: string; role: 'host' | 'guest'; status: 'waiting' | 'playing' | 'error'; msg?: string } | null>(null);
    // 終わっていない通信対戦の部屋(自分が作った側)。最初の画面に「続きに戻る」を出す
    const [resume, setResume] = useState<{ code: string; go: () => void } | null>(null);
    const netRef = useRef<{ code: string; role: 'host' | 'guest' } | null>(null);
    const applied = useRef(0);
    const pending = useRef<{ seed: number; guestDeck: CardSpec[] } | null>(null);
    const hostDeckRef = useRef<CardSpec[] | null>(null);   // 部屋を作ったときのデッキ(読み込み直したあとも同じものを使う)
    const zoomRef = useRef(1);
    const demoToken = useRef(0);
    const demoOn = useRef(false);
    const [sound, setSound] = useState(true);
    const [, setArtV] = useState(0);
    const gameRef = useRef<Game | null>(null);
    const busy = useRef(false);
    const worldDeck = useRef<CardSpec[] | null>(null);   // 中庭(/english/duel/world)で自分で選んだ20枚
    const fromWorld = useRef(false);
    const fxId = useRef(1);
    const soundRef = useRef(true);
    const sfx = (name: string) => { if (soundRef.current) playSfx(name); };
    const wantBgm = useRef<BgmName | null>(null);

    useEffect(() => {
        const onResize = () => { setVw(document.getElementById('duel-root')?.clientWidth || window.innerWidth); setScr({ w: window.innerWidth, h: window.innerHeight }); };
        onResize();
        window.addEventListener('resize', onResize);
        setRecord(load(RECORD_KEY, { win: 0, lose: 0 }));
        // 言語: 自分で選んだことがあればそれ。無ければ端末の言語で決める(日本語の端末だけ日本語)。
        // 2026-11-27 の DMM で、招待リンクで入った先生の画面に日本語が出た。入った側には切り替えが無く、既定が日本語だったため
        const savedLang = load<string | null>(LANG_KEY, null);
        setLang(savedLang === 'en' || savedLang === 'ja' ? savedLang : (navigator.language || 'en').toLowerCase().startsWith('ja') ? 'ja' : 'en');
        fetch('/duel/voice/manifest.json', { cache: 'no-store' }).then(r => r.json()).then((m: { ids: string[]; v: number }) => {
            VOICE = Object.fromEntries((m.ids || []).map(k => [k, `/duel/voice/${k}.mp3?v=${m.v}`]));
        }).catch(() => { /* 声が無ければ端末の読み上げ */ });
        fetch('/duel/art/manifest.json', { cache: 'no-store' }).then(r => r.json()).then((m: { keys: string[]; v: number }) => {
            ART = Object.fromEntries((m.keys || []).map(k => [k, `/duel/art/${k}.webp?v=${m.v}`]));
            setArtV(m.v || 1);
        }).catch(() => { /* 絵が無ければ模様で描く */ });
        if (guestRoom) { setPool([]); return () => window.removeEventListener('resize', onResize); }
        if (pack) {
            const specs = pack.cards.map(wordSpec);
            setPool(specs);
            const p0 = { ...emptyProg(), ...load<Partial<Progress>>(progKey(pack.id), {}) };
            setProg({ ...p0, deck: fillDeck(p0, specs) });
            // 最初のテストに出す語: 章ごとに3語まで、下の章から
            const pickN = (list: CardSpec[], n: number) => [...list].sort(() => Math.random() - 0.5).slice(0, n);
            setTestCards([0, 1, 2, 3, 4].flatMap(ch => pickN(specs.filter(c => chapterOf(c) === ch), 3)));
            return () => window.removeEventListener('resize', onResize);
        }   // 単語パック: 中身は同梱のファイル。通信しない
        fetch('/api/phrases/duel-pool').then(r => r.json()).then(d => {
            let cards = ((d?.cards || []) as PoolCard[]).map(toSpec);
            // 中庭から来たとき: 向こうで選んだ20枚をデッキにして(山に無ければ足す)、最初の画面を挟まずに始める
            if (new URLSearchParams(window.location.search).get('from') === 'world') {
                const carried = load<PoolCard[]>('duel:world:cards:v1', []).map(toSpec);
                if (carried.length === DECK_SIZE) {
                    cards = [...cards, ...carried.filter(c => !cards.some(x => x.id === c.id))];
                    worldDeck.current = carried;
                    fromWorld.current = true;
                    save(DEMO_SEEN_KEY, 1);
                }
                window.history.replaceState(null, '', window.location.pathname);
            }
            setPool(cards);
            const saved = load<string[]>(DECK_KEY, []).filter(id => cards.some(c => c.id === id));
            setDeckIds(saved.length === DECK_SIZE ? saved : autoDeck(cards).map(c => c.id));
        }).catch(() => setPool([]));
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const deck = useMemo(() => (pool || []).filter(c => deckIds.includes(c.id)), [pool, deckIds]);

    // 舞台と曲は、対戦ごとに選び直す(前と同じものは続けない)
    const [arena, setArena] = useState(0);
    const [track, setTrack] = useState(0);
    const newStage = useCallback(() => {
        const other = (n: number, prev: number) => { let k = Math.floor(Math.random() * n); if (n > 1 && k === prev) k = (k + 1 + Math.floor(Math.random() * (n - 1))) % n; return k; };
        const forced = Number(new URLSearchParams(window.location.search).get('arena'));   // 見た目を確かめるための入口(?arena=1〜)
        setArena(a => forced >= 1 ? forced - 1 : forcedArena.current !== null ? forcedArena.current : other(ARENAS.length, a));
        setTrack(t => other(BATTLE_TRACKS.length, t));
    }, []);
    const hasGame = !!game;
    useEffect(() => { if (hasGame) newStage(); }, [hasGame, newStage]);
    const bgmWant: BgmName | null = !sound ? null : !game ? 'home' : game.winner === null ? BATTLE_TRACKS[track] : game.winner === 0 ? 'victory' : null;
    wantBgm.current = bgmWant;
    useEffect(() => { setBgm(bgmWant); }, [bgmWant]);
    useEffect(() => {
        const onDown = (e: PointerEvent) => {
            loadSfx();
            setBgm(wantBgm.current);
            if (soundRef.current && (e.target as HTMLElement | null)?.closest?.('button')) playSfx('click');
        };
        const onHide = () => { if (document.hidden) bgmEl?.pause(); else setBgm(wantBgm.current); };
        window.addEventListener('pointerdown', onDown);
        document.addEventListener('visibilitychange', onHide);
        return () => { window.removeEventListener('pointerdown', onDown); document.removeEventListener('visibilitychange', onHide); setBgm(null); };
    }, []);

    const showBanner = (text: string) => { setBanner(text); setTimeout(() => setBanner(b => b === text ? null : b), 1250); };

    /** デッキを2つ組む。自分のデッキは、専用の絵があるカードを優先する。毎回ちがう顔ぶれになる */
    const dealDecks = (seed: number, boss: number | null = null) => {
        if (pack) {
            // 単語パック: 自分のデッキは「覚えている途中の語」。20枚に足りない分は殿堂の語で埋める。相手は山から20枚(ボスはその章の語を優先)
            const all = pool || [];
            const ids = fillDeck(prog, all);
            const mine = ids.map(id => all.find(c => c.id === id)).filter(Boolean) as CardSpec[];
            for (const c of shuffle(all.filter(c => !ids.includes(c.id)), makeRng(seed + 3))) { if (mine.length >= DECK_SIZE) break; mine.push(c); }
            const sh = shuffle(all, makeRng(seed + 7));
            const rival = boss === null ? sh.slice(0, DECK_SIZE) : [...sh.filter(c => chapterOf(c) === boss), ...sh.filter(c => chapterOf(c) !== boss)].slice(0, DECK_SIZE);
            return { mine, rival };
        }
        const sh = shuffle(pool || [], makeRng(seed));
        const own = sh.filter(c => ART[`card-${c.id}`]);
        const mine = autoDeck(own.length >= 40 ? own.slice(0, 60) : sh.slice(0, 70));
        const ids = new Set(mine.map(c => c.id));
        return { mine, rival: autoDeck(sh.filter(c => !ids.has(c.id)).slice(0, 70)) };
    };

    const start = () => begin(null);
    /** 確認テストに出す語: この対戦で出た語のうち、まだ殿堂に入っていないものから5つまで */
    const checkCards = (): CardSpec[] => [...seen.current.values()].filter(c => !inHall(prog, c.id)).slice(0, 5);
    /** 対戦を始める。boss に章の番号を渡すとボス戦(相手のリーダーの体力が多く、その章の舞台で戦う) */
    const begin = (boss: number | null) => {
        if (!pool || pool.length < minPool) return;
        seen.current = new Map(); setReview(false); setShownJa({});
        bossRef.current = boss; setQuiz(null); setVerdict(null);
        forcedArena.current = boss !== null ? CHAPTERS[boss].arena : null;
        const seed = Math.floor(Math.random() * 1e9);
        let { mine: deck, rival } = dealDecks(seed, boss);
        if (worldDeck.current) {
            deck = worldDeck.current;
            const ids = new Set(deck.map(c => c.id));
            rival = autoDeck(shuffle(pool.filter(c => !ids.has(c.id)), makeRng(seed)).slice(0, 70));
        }
        const g = newGame(deck, rival, seed);
        if (boss !== null) g.sides[1].hp = START_HP + 4 + boss * 2;   // ボスは体力が多い(上の章ほど多い)
        const fxp = new URLSearchParams(window.location.search).get('fx');   // 結果の画面を見るための入口(?fx=victory / ?fx=defeat)
        if (fxp === 'victory' || fxp === 'defeat') { g.winner = fxp === 'victory' ? 0 : 1; g.sides[fxp === 'victory' ? 1 : 0].hp = 0; g.turn = 17; }
        gameRef.current = g;
        busy.current = false;
        setSel(null); setPops([]); setGhosts([]); setBursts([]);
        if (gameRef.current !== g && game) newStage();   // 続けてもう1戦のときも、舞台と曲を替える
        setGame(g);
        sfx('turn');
        showBanner('YOUR TURN');
    };

    const center = (selector: string) => {
        const r = document.querySelector(selector)?.getBoundingClientRect();
        const z = zoomRef.current;   // 盤面を縮めているときは、画面上の位置を盤面の中の位置に直す
        return r ? { x: (r.left + r.width / 2) / z, y: (r.top + r.height / 2) / z, w: r.width / z } : null;
    };

    /** 行動を1つ、演出つきで当てる(自分の手も相手の手もここを通る) */
    const perform = useCallback(async (a: Action, remote = false) => {
        const g = gameRef.current;
        if (!g || busy.current || g.winner !== null) return;
        const next = apply(g, a);
        if (next === g) return;
        if (netRef.current) {
            if (!remote && g.active !== 0) return;          // 通信対戦で、相手の番に自分が動かすことはない
            const n = applied.current++;
            if (!remote) {
                fetch('/api/duel/room', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'act', code: netRef.current.code, n, action: a }) })
                    .then(r => { if (!r.ok) setNet(x => x && { ...x, status: 'error', msg: 'Lost sync with the other player. Start a new room.' }); })
                    .catch(() => setNet(x => x && { ...x, status: 'error', msg: 'Connection problem.' }));
            }
        }
        busy.current = true;
        const tok = demoToken.current;
        setSel(null);
        setAim(null);
        setHandSel(null);
        setInspect(null);
        const p = g.active, q = (1 - p) as 0 | 1;

        if (a.type === 'play') {
            const spec = g.sides[p].hand[a.idx];
            const id = fxId.current++;
            sfx('play');
            if (spec.word) {
                seen.current.set(spec.id, spec);
                updateProg(pr => ({ ...pr, words: { ...pr.words, [spec.id]: { ...(pr.words[spec.id] || { ok: [], miss: 0 }), seen: (pr.words[spec.id]?.seen || 0) + 1 } } }));
            }
            if (soundRef.current) speakLine(spec.text, spec.id);
            const hold = Math.min(2600, 1100 + spec.text.split(' ').length * 95);
            setReveal({ id, spec, side: p, ms: hold + 300 });
            await sleep(hold);
            setTimeout(() => setReveal(r => r && r.id === id ? null : r), 300);
            if (spec.ability === 'STRIKE') sfx('strike'); else if (spec.ability === 'WARD') sfx('ward'); else if (spec.ability === 'INSIGHT') sfx('draw'); else if (spec.ability === 'RUSH') sfx('swing');
        }
        if (a.type === 'attack') {
            const from = center(`[data-u="${a.a}"]`);
            const to = center(a.t === null ? `[data-leader="${q}"]` : `[data-u="${a.t}"]`);
            if (from && to) {
                sfx('swing');
                setLunge({ uid: a.a, dx: (to.x - from.x) * 0.82, dy: (to.y - from.y) * 0.82 });
                await sleep(210);
                const id = fxId.current++;
                setBursts(b => [...b, { id, x: to.x, y: to.y, color: '#FDE68A' }]);
                setTimeout(() => setBursts(b => b.filter(x => x.id !== id)), 600);
                sfx(a.t === null ? 'face' : 'hit');
            }
        }

        // 前と後を比べて、数字・破壊・揺れを出す
        const newPops: Pop[] = [], newGhosts: Ghost[] = [], newHits: string[] = [];
        for (const s of [0, 1] as const) {
            for (const u of g.sides[s].field) {
                const after = next.sides[s].field.find(x => x.uid === u.uid);
                const lost = u.hp - (after ? after.hp : Math.min(0, u.hp));
                const at = center(`[data-u="${u.uid}"]`);
                if (!at) continue;
                if (after && after.hp < u.hp) { newPops.push({ id: fxId.current++, x: at.x, y: at.y, text: `-${u.hp - after.hp}`, color: '#EF4444' }); newHits.push(`u${u.uid}`); }
                if (!after) {
                    newPops.push({ id: fxId.current++, x: at.x, y: at.y, text: lost > 0 ? `-${lost}` : 'KO', color: '#EF4444' });
                    newGhosts.push({ id: fxId.current++, x: at.x, y: at.y, w: at.w, spec: u.card });
                }
            }
            const d = next.sides[s].hp - g.sides[s].hp;
            const at = center(`[data-leader="${s}"]`);
            if (d !== 0 && at) {
                newPops.push({ id: fxId.current++, x: at.x, y: at.y, text: d > 0 ? `+${d}` : `${d}`, color: d > 0 ? '#10B981' : '#EF4444' });
                if (d < 0) newHits.push(`L${s}`); else sfx('heal');
            }
        }
        if (newHits.some(h => h.startsWith('L'))) { setQuake(true); setTimeout(() => setQuake(false), 380); }
        if (newGhosts.length) setTimeout(() => sfx('die'), 120);

        if (demoToken.current !== tok) { busy.current = false; setLunge(null); return; }   // 途中でデモを止めた
        setLunge(null);
        gameRef.current = next;
        setGame(next);
        setPops(x => [...x, ...newPops]);
        setGhosts(x => [...x, ...newGhosts]);
        setHits(newHits);
        const ids = [...newPops, ...newGhosts].map(x => x.id);
        setTimeout(() => { setPops(x => x.filter(y => !ids.includes(y.id))); setGhosts(x => x.filter(y => !ids.includes(y.id))); setHits([]); }, 900);

        if (next.winner !== null) {
            await sleep(500);
            sfx(next.winner === 0 ? 'win' : 'lose');
            if (next.winner === 0 && bossRef.current !== null) { const ch = bossRef.current; updateProg(pr => pr.bosses.includes(ch) ? pr : { ...pr, bosses: [...pr.bosses, ch] }); }
            setRecord(r => { const n = { win: r.win + (next.winner === 0 ? 1 : 0), lose: r.lose + (next.winner === 1 ? 1 : 0) }; save(RECORD_KEY, n); return n; });
        } else if (a.type === 'end') {
            sfx(next.active === 0 ? 'turn' : 'end');
            showBanner(next.active === 0 ? 'YOUR TURN' : 'RIVAL TURN');
            await sleep(250);
        } else {
            await sleep(a.type === 'attack' ? 460 : 420);
        }
        busy.current = false;
        setTick(t => t + 1);
    }, []);

    const stopDemo = () => {
        demoToken.current++;
        demoOn.current = false;
        setDemo(null); setPtr(null); setAim(null); setSel(null);
        save(DEMO_SEEN_KEY, 1);
        busy.current = false;
        gameRef.current = null;
        setGame(null);
    };

    /** デモを最初から流す。途中で stopDemo されたら、次の一手の前でやめる */
    const runDemo = async () => {
        if (!pool || pool.length < 12) return;
        const token = ++demoToken.current;
        demoOn.current = true;
        const g0 = demoGame(pool);
        gameRef.current = g0;
        busy.current = false;
        setSel(null); setPops([]); setGhosts([]); setBursts([]);
        setGame(g0);
        const alive = () => demoToken.current === token;
        for (let i = 0; i < DEMO_STEPS.length; i++) {
            if (!alive()) return;
            const st = DEMO_STEPS[i];
            setDemo({ cap: st.cap, n: i + 1, total: DEMO_STEPS.length });
            await sleep(st.read ?? 2600);
            if (!alive()) return;
            const a = st.act;
            if (!a) continue;
            const g = gameRef.current;
            if (!g) return;
            if (g.active === 0) {
                // 自分の手は、カーソルが押す所まで動いてから当てる
                if (a.type === 'play') { setPtr(center(`[data-hand="${a.idx}"]`)); await sleep(750); }
                if (a.type === 'end') { setPtr(center('[data-act="end"]')); await sleep(750); }
                if (a.type === 'attack') {
                    setPtr(center(`[data-u="${a.a}"]`));
                    await sleep(650);
                    setSel(a.a);
                    const to = center(a.t === null ? '[data-leader="1"]' : `[data-u="${a.t}"]`);
                    setAim(to); setPtr(to);
                    await sleep(800);
                }
                if (!alive()) return;
            }
            await perform(a);
            setPtr(null);
            await sleep(500);
        }
        if (alive()) stopDemo();
    };

    // 初めて開いたときは、山が読めたらデモを流す
    useEffect(() => {
        if (!pool || pool.length < 12 || game || demoOn.current || guestRoom) return;
        if (load<number>(DEMO_SEEN_KEY, 0) || load<unknown>(ROOM_KEY, null)) return;
        save(DEMO_SEEN_KEY, 1);
        runDemo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pool]);

    const leaveNet = () => { netRef.current = null; pending.current = null; applied.current = 0; setNet(null); save(ROOM_KEY, null); };

    const beginNet = (g: Game, code: string, role: 'host' | 'guest') => {
        netRef.current = { code, role };
        gameRef.current = g;
        busy.current = false;
        setSel(null); setPops([]); setGhosts([]); setBursts([]);
        setGame(g);
        setNet({ code, role, status: 'playing' });
        sfx('turn');
        showBanner(g.active === 0 ? 'YOUR TURN' : 'RIVAL TURN');
    };

    /** 部屋を作る(自分のデッキと、相手に渡すデッキを置く)。相手が入るのを待つ */
    // 中庭から来た: 山が読めたら、そのまま始める
    useEffect(() => {
        if (!fromWorld.current || !pool || pool.length < 40 || gameRef.current) return;
        fromWorld.current = false;
        start();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pool]);

    const createRoom = async () => {
        if (pack || !pool || pool.length < 40) return;
        const seed = Math.floor(Math.random() * 1e9);
        const { mine: deck, rival: guestDeck } = dealDecks(seed);
        try {
            const d = await (await fetch('/api/duel/create', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ seed, hostDeck: deck, guestDeck }) })).json();
            if (!d.success) throw new Error();
            pending.current = { seed, guestDeck };
            applied.current = 0;
            hostDeckRef.current = deck;
            save(ROOM_KEY, { code: d.code, seed, hostDeck: deck, guestDeck, at: Date.now() });
            setResume(null);
            setNet({ code: d.code, role: 'host', status: 'waiting' });
        } catch { setNet({ code: '', role: 'host', status: 'error', msg: 'Could not create a room.' }); }
    };

    // 部屋を作った側が読み込み直したとき: 3時間以内の部屋が残っていれば、行動の列を当て直して続きに戻る
    useEffect(() => {
        if (guestRoom) return;
        const r = load<{ code: string; seed: number; hostDeck: CardSpec[]; guestDeck: CardSpec[]; at: number } | null>(ROOM_KEY, null);
        if (!r || Date.now() - r.at > 3 * 3600_000) return;
        // 勝手には戻らない。最初の画面に「対戦の続きに戻る」を出して、本人が押したら戻る
        // (終わらせずに閉じた部屋が残っていると、開くたびに最初の画面を飛ばして対戦が始まってしまっていた)
        fetch(`/api/duel/room?code=${r.code}`, { cache: 'no-store' }).then(x => x.json()).then(d => {
            if (!d.success || netRef.current || gameRef.current) return;
            let g: Game | null = null;
            if (d.joined) {
                g = newGame(r.hostDeck, r.guestDeck, r.seed);
                for (const a of d.actions as Action[]) g = apply(g, a);
                if (g.winner !== null) { save(ROOM_KEY, null); return; }
            }
            const resumed = g, count = d.joined ? (d.actions as Action[]).length : 0;
            setResume({
                code: r.code,
                go: () => {
                    setResume(null);
                    if (netRef.current || gameRef.current) return;
                    if (!resumed) { pending.current = { seed: r.seed, guestDeck: r.guestDeck }; hostDeckRef.current = r.hostDeck; applied.current = 0; setNet({ code: r.code, role: 'host', status: 'waiting' }); return; }
                    applied.current = count;
                    demoToken.current++; demoOn.current = false; setDemo(null);
                    beginNet(resumed, r.code, 'host');
                },
            });
        }).catch(() => { /* つながらなければ普通に始める */ });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 部屋を作った側: 相手が入るまで2秒おきに見る
    useEffect(() => {
        if (!net || net.role !== 'host' || net.status !== 'waiting') return;
        const t = setInterval(async () => {
            try {
                const d = await (await fetch(`/api/duel/room?code=${net.code}`, { cache: 'no-store' })).json();
                if (d.success && d.joined && pending.current) {
                    clearInterval(t);
                    beginNet(newGame(hostDeckRef.current || deck, pending.current.guestDeck, pending.current.seed), net.code, 'host');
                }
            } catch { /* 次の回でまた見る */ }
        }, 2000);
        return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [net?.code, net?.status, net?.role]);

    // 招待リンクで来た側: 部屋に入って、相手側から見た盤面で始める(途中から入り直しても、行動の列を当て直して追いつく)
    useEffect(() => {
        if (!guestRoom) return;
        const code = guestRoom.toUpperCase();
        setNet({ code, role: 'guest', status: 'waiting' });
        fetch('/api/duel/room', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ op: 'join', code }) })
            .then(r => r.json())
            .then(d => {
                if (!d.success) throw new Error();
                let g = flip(newGame(d.hostDeck as CardSpec[], d.guestDeck as CardSpec[], d.seed));
                for (const a of d.actions as Action[]) g = apply(g, a);
                applied.current = (d.actions as Action[]).length;
                beginNet(g, code, 'guest');
            })
            .catch(() => setNet({ code, role: 'guest', status: 'error', msg: 'This room does not exist. Ask for a new link.' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [guestRoom]);

    // 対戦中: 相手の手を1.2秒おきに取りに行って、演出つきで当てる
    useEffect(() => {
        if (!net || net.status !== 'playing') return;
        let stop = false, running = false;
        const t = setInterval(async () => {
            const g = gameRef.current;
            if (stop || running || busy.current || !g || g.winner !== null || g.active !== 1) return;
            running = true;
            try {
                const d = await (await fetch(`/api/duel/room?code=${net.code}&from=${applied.current}`, { cache: 'no-store' })).json();
                for (const a of (d.actions || []) as Action[]) {
                    if (stop) break;
                    await perform(a, true);
                }
            } catch { /* 次の回でまた取る */ }
            running = false;
        }, 1200);
        return () => { stop = true; clearInterval(t); };
    }, [net?.code, net?.status, perform]);  // eslint-disable-line react-hooks/exhaustive-deps

    // 相手の番: 1手ずつ進める(デモのあいだは台本が動かす)
    useEffect(() => {
        if (!game || game.winner !== null || game.active !== 1 || demoOn.current || netRef.current) return;
        const t = setTimeout(() => { const g = gameRef.current; if (g && g.active === 1 && !busy.current) perform(aiAction(g)); }, 620);
        return () => clearTimeout(t);
    }, [game, tick, perform]);

    const btn = (primary: boolean, disabled = false): React.CSSProperties => ({
        border: primary ? 'none' : '1px solid #D6D3D1', background: disabled ? '#E7E5E4' : primary ? 'linear-gradient(135deg, #F6C85F, #B8941E)' : '#fff',
        color: disabled ? '#A8A29E' : primary ? '#fff' : INK, fontWeight: 900, fontSize: vw < 560 ? 12 : 14, borderRadius: 12, padding: vw < 560 ? '9px 12px' : '11px 20px', cursor: disabled ? 'default' : 'pointer', letterSpacing: vw < 560 ? 0.5 : 1.5, whiteSpace: 'nowrap',
        boxShadow: primary && !disabled ? '0 6px 16px rgba(184,148,30,0.45)' : undefined,
    });
    const page: React.CSSProperties = { minHeight: '100vh', background: 'linear-gradient(180deg, #FFFBEB 0%, #ECFDF5 100%)', color: INK, padding: '16px 10px 60px', overflowX: 'hidden' };

    // ── 招待リンクで来た相手: 盤面が始まるまでは、これだけ ──
    if (!game && guestRoom) {
        return (
            <div id="duel-root" style={{ ...page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', maxWidth: 420 }}>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 3, color: '#B8941E' }}>CARD DUEL</div>
                    <div style={{ fontSize: 40, fontWeight: 900, letterSpacing: 8, fontFamily: 'Georgia, serif', margin: '6px 0' }}>{(guestRoom || '').toUpperCase()}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: net?.status === 'error' ? '#B91C1C' : SUB }}>{net?.status === 'error' ? net.msg : 'Joining the room...'}</div>
                </div>
            </div>
        );
    }

    // ── 最初の画面(本人 2026-11-27「初期画面もおかしい。もっと分かりやすく丁寧に。日本語と英語を切り替え。押したらカードが出る。デッキ構築は最初はいらない。全面的に刷新」)──
    // デッキは毎回こちらで組む(dealDecks)。画面は 入口(home) と カード一覧(cards) の2つ。どちらも画面全体を覆う。
    if (!game) {
        if (!mounted) return null;
        const t = TEXT[lang];
        const ready = !!pool && pool.length >= minPool;
        const narrow = scr.w < 760;
        const gold = 'linear-gradient(180deg, #FFF6C8 0%, #F6C85F 45%, #B8941E 55%, #F6C85F 100%)';
        const plate: React.CSSProperties = { background: 'linear-gradient(180deg, rgba(42,31,8,0.86), rgba(20,14,4,0.92))', border: '1.5px solid #D4AF37', boxShadow: '0 8px 24px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,242,168,0.25)', borderRadius: 12 };
        const menu: { key: string; icon: string; title: string; sub: string; on: () => void; main?: boolean; off?: boolean }[] = [
            ...(resume ? [{ key: 'resume', icon: 'M8 5v14l11-7z', title: lang === 'ja' ? '対戦の続きに戻る' : 'Resume match', sub: lang === 'ja' ? `友だちとの対戦が途中のまま(部屋 ${resume.code})` : `Your match with a friend is unfinished (room ${resume.code})`, on: resume.go }] : []),
            { key: 'duel', icon: 'M5 3l7 7 7-7 2 2-7 7 3 3-2 2-3-3-3 3-2-2 3-3-7-7z', title: t.play, sub: pack ? (lang === 'ja' ? 'いまのデッキ(覚えている途中の単語)で、コンピューターと1戦' : 'One match with your deck of words in progress') : t.playSub, on: start, main: true, off: !ready },
            ...(pack ? [] : [{ key: 'world', icon: 'M12 2l2.4 5.6L20 9l-4.2 3.9L17 19l-5-3-5 3 1.2-6.1L4 9l5.6-1.4z', title: t.walk, sub: t.walkSub, on: () => { window.location.href = '/english/duel/world'; } }]),
            { key: 'online', icon: 'M9 12a4 4 0 0 1 4-4h3a4 4 0 0 1 0 8h-1v-2h1a2 2 0 0 0 0-4h-3a2 2 0 0 0-2 2zm6 0a4 4 0 0 1-4 4H8a4 4 0 0 1 0-8h1v2H8a2 2 0 0 0 0 4h3a2 2 0 0 0 2-2z', title: t.online, sub: t.onlineSub, on: createRoom, off: !ready || !!pack },
            { key: 'demo', icon: 'M4 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zm16 0h-5a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h5z', title: t.how, sub: t.howSub, on: runDemo, off: !pool || pool.length < 12 },
            ...(pack ? [{ key: 'story', icon: 'M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 16.6 6.500 19.500l1-6.300L3 8.900 9 8z', title: lang === 'ja' ? '冒険と殿堂' : 'Journey & Hall', sub: lang === 'ja' ? '章とボス、いまのデッキ、殿堂入りした単語' : 'Chapters and bosses, your deck, mastered words', on: () => { setPlacedMsg(null); setView('story'); } }] : []),
            { key: 'guide', icon: 'M6 3h11a2 2 0 0 1 2 2v16l-3-2-3 2-3-2-3 2-3-2V5a2 2 0 0 1 2-2zm2 5v2h7V8zm0 4v2h7v-2z', title: t.guide, sub: t.guideSub, on: () => setView('guide') },
            { key: 'cards', icon: 'M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm5 5l-3 4 3 4 3-4z', title: t.cards, sub: t.cardsSub, on: () => setView('cards'), off: !pool || !pool.length },
        ];
        const langBtn = (
            <div style={{ ...plate, display: 'flex', padding: 3, borderRadius: 999 }}>
                {(['ja', 'en'] as const).map(l => (
                    <button key={l} data-lang={l} onClick={() => { setLang(l); save(LANG_KEY, l); }} style={{ border: 'none', cursor: 'pointer', borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 900, letterSpacing: 1, background: lang === l ? gold : 'transparent', color: lang === l ? '#2A1F08' : '#FFF2A8' }}>{l === 'ja' ? '日本語' : 'English'}</button>
                ))}
            </div>
        );
        const shell = (children: React.ReactNode) => createPortal(
            <div id="duel-root" key={`menu-${view}`} style={{ position: 'fixed', left: 0, top: 0, width: '100vw', height: '100dvh', zIndex: 99999, overflowY: 'auto', overflowX: 'hidden', color: '#fff', fontFamily: 'inherit',
                background: `linear-gradient(180deg, rgba(14,10,4,0.72) 0%, rgba(14,10,4,0.5) 40%, rgba(14,10,4,0.86) 100%), ${ART.board ? `center / cover no-repeat url(${ART.board})` : 'radial-gradient(ellipse at 50% 40%, #5B4513, #1C1407)'}` }}>
                <style>{CSS}</style>
                {children}
            </div>,
            document.body,
        );

        // ── カード一覧: 押すと、そのカードが大きく出る ──
        if (view === 'cards') {
            const list = [...(pool || [])].sort((x, y) => Number(!!ART[`card-${y.id}`]) - Number(!!ART[`card-${x.id}`]) || x.cost - y.cost || y.atk - x.atk);
            const cw = narrow ? Math.floor((scr.w - 16 * 2 - 26) / 2) : 170;
            const d = detail;
            return shell(
                <>
                    <div style={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'linear-gradient(180deg, rgba(14,10,4,0.96), rgba(14,10,4,0.8))', borderBottom: '1.5px solid #D4AF37' }}>
                        <button data-act="back" onClick={() => setView('home')} style={{ ...plate, color: '#FFF2A8', fontWeight: 900, fontSize: 13, padding: '7px 16px', cursor: 'pointer' }}>‹ {t.back}</button>
                        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 20, letterSpacing: 2, background: gold, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.cards}</div>
                        <div style={{ fontSize: 12, color: '#D4AF37' }}>{list.length} {t.count}</div>
                        <div style={{ marginLeft: 'auto' }}>{langBtn}</div>
                    </div>
                    <div style={{ padding: '8px 16px 0', fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>{t.cardsHint}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '26px 22px', justifyContent: 'center', padding: '22px 16px 60px' }}>
                        {list.map(c => <Card key={c.id} spec={c} w={cw} onClick={() => setDetail(c)} />)}
                    </div>
                    {d && (
                        <div data-act="detail" onClick={() => setDetail(null)} style={{ position: 'fixed', inset: 0, zIndex: 20, background: 'rgba(8,6,2,0.86)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto' }}>
                            <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', alignItems: 'center', gap: narrow ? 22 : 40, maxWidth: 940, animation: 'duel-fadeup .3s ease-out both' }}>
                                <div style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.7))' }}><Card spec={d} w={Math.round(Math.min(narrow ? scr.w * 0.72 : 380, (scr.h * (narrow ? 0.5 : 0.8)) * CW / CH))} /></div>
                                <div style={{ ...plate, padding: '18px 20px', width: narrow ? '100%' : 440, boxSizing: 'border-box' }}>
                                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, borderBottom: '1px solid rgba(212,175,55,0.6)', paddingBottom: 8 }}>
                                        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 22, background: gold, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{d.no ? `No.${d.no}` : d.id.slice(0, 6)}</span>
                                        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 2, color: '#D4AF37' }}>{elementLabel(d)} · {rankLabel(d) || 'NORMAL'}</span>
                                    </div>
                                    {d.word && (
                                        <div style={{ marginTop: 12 }}>
                                            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 34, lineHeight: 1.1, color: '#FFF6C8' }}>{d.word}</div>
                                            <div style={{ marginTop: 4, fontSize: 17, fontWeight: 800, color: '#fff' }}>{d.ja}</div>
                                            {d.tone && <div style={{ marginTop: 10, display: 'inline-block', fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#2A1F08', background: '#F6C85F', borderRadius: 4, padding: '2px 8px' }}>{d.tone}</div>}
                                        </div>
                                    )}
                                    <div style={{ marginTop: d.word ? 8 : 12, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: d.word ? 19 : 21, lineHeight: 1.4, color: '#FFFDF2' }}>{d.text}</div>
                                    {d.lineJa && <div style={{ marginTop: 6, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{d.lineJa}</div>}
                                    <button data-act="listen" onClick={() => speakLine(d.text, d.id)} style={{ marginTop: 10, border: '1px solid #D4AF37', background: 'rgba(255,242,168,0.1)', color: '#FFF2A8', fontWeight: 800, fontSize: 13, borderRadius: 8, padding: '6px 16px', cursor: 'pointer' }}>▶ {VOICE[d.id] ? t.listenActed : t.listen}</button>
                                    <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
                                        {([[t.cost, d.cost, ['#6EE7B7', '#047857']], [t.atk, d.atk, ['#93C5FD', '#1D4ED8']], [t.hp, d.hp, ['#FCA5A5', '#B91C1C']]] as [string, number, [string, string]][]).map(([label, v, col]) => (
                                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Gem value={v} color={col} size={38} /><span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{label}</span></div>
                                        ))}
                                    </div>
                                    <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(212,175,55,0.35)' }}>
                                        <div style={{ fontSize: 13, fontWeight: 900, letterSpacing: 2, color: '#F6C85F' }}>{d.ability === 'NONE' ? t.noAbility : abilityName(d.ability)}</div>
                                        {d.ability !== 'NONE' && <div style={{ fontSize: 14, lineHeight: 1.6, color: '#fff', marginTop: 2 }}>{lang === 'ja' ? ABILITY_JA[d.ability] : ABILITY_TEXT[d.ability]}</div>}
                                    </div>
                                    {ART[`card-${d.id}`] && <div style={{ marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{t.style}: {d.style || styleOf(d.id)}</div>}
                                    <button onClick={() => setDetail(null)} style={{ marginTop: 16, width: '100%', border: 'none', background: gold, color: '#2A1F08', fontWeight: 900, fontSize: 15, letterSpacing: 2, borderRadius: 10, padding: '11px 0', cursor: 'pointer' }}>{t.close}</button>
                                </div>
                            </div>
                        </div>
                    )}
                </>,
            );
        }

        // ── 最初のテスト: どの章から始めるかを決める ──
        if (view === 'test' && pack && pool) {
            const J = (ja: string, en: string) => lang === 'ja' ? ja : en;
            return shell(
                <Quiz title={J('最初のテスト', 'Placement test')} sub={J('知っている語は飛ばして、ちょうどいい章から始める。分からなければ勘でいい。', 'Skip what you know and start at the right chapter. Guess if unsure.')} cards={testCards} pool={pool} onClose={() => setView('home')}
                    onDone={res => {
                        const chs = [...new Set(pool.map(chapterOf))].sort((x, y) => x - y);
                        let startCh = chs[chs.length - 1];
                        for (const ch of chs) {
                            const asked = testCards.filter(c => chapterOf(c) === ch);
                            const got = asked.filter(c => res[c.id]).length;
                            if (got < Math.ceil(asked.length * 2 / 3)) { startCh = ch; break; }
                        }
                        const onlyRight = Object.fromEntries(Object.entries(res).filter(([, v]) => v));   // 最初のテストでは、まちがいは記録しない(当たった分だけ1回目の正解にする)
                        updateProg(p => { const n = applyAnswers({ ...p, placed: true, start: startCh, deck: [] }, onlyRight, pool); return n; });
                        setPlacedMsg({ ch: startCh, score: Object.values(res).filter(Boolean).length, n: testCards.length });
                        setView('story');
                    }} />,
            );
        }

        // ── 冒険と殿堂: 勇者・章とボス・いまのデッキ・殿堂入りした単語 ──
        if (view === 'story' && pack && pool) {
            const J = (ja: string, en: string) => lang === 'ja' ? ja : en;
            const sec: React.CSSProperties = { ...plate, padding: narrow ? '14px 14px' : '18px 22px', marginTop: 16 };
            const hall = pool.filter(c => inHall(prog, c.id));
            const deckIdsNow = fillDeck(prog, pool);
            const deckCards = deckIdsNow.map(id => pool.find(c => c.id === id)).filter(Boolean) as CardSpec[];
            const benchCards = pool.filter(c => !inHall(prog, c.id) && !deckIdsNow.includes(c.id));
            const chs = [...new Set(pool.map(chapterOf))].sort((x, y) => x - y);
            const bar = (v: number, total: number, color = '#10B981') => <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.14)', overflow: 'hidden' }}><div style={{ width: `${total ? (v / total) * 100 : 0}%`, height: '100%', background: color, transition: 'width .5s ease' }} /></div>;
            const sw = narrow ? Math.floor((scr.w - 32 - 28 - 3 * 12) / 4) : 104;
            const small = (c: CardSpec, onTap: (() => void) | undefined, tag: string, tagColor: string) => (
                <div key={c.id} onClick={onTap} style={{ position: 'relative', cursor: onTap ? 'pointer' : 'default' }}>
                    <Card spec={c} w={sw} noCost />
                    <span style={{ position: 'absolute', left: '50%', top: -8, transform: 'translateX(-50%)', fontSize: 10, fontWeight: 900, color: '#fff', background: tagColor, border: '1.5px solid #fff', borderRadius: 999, padding: '0 7px', whiteSpace: 'nowrap', lineHeight: 1.6 }}>{tag}</span>
                </div>
            );
            return shell(
                <>
                    <div style={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'linear-gradient(180deg, rgba(14,10,4,0.96), rgba(14,10,4,0.8))', borderBottom: '1.5px solid #D4AF37' }}>
                        <button data-act="back" onClick={() => setView('home')} style={{ ...plate, color: '#FFF2A8', fontWeight: 900, fontSize: 13, padding: '7px 16px', cursor: 'pointer' }}>‹ {t.back}</button>
                        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 20, letterSpacing: 2, background: gold, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{J('冒険と殿堂', 'Journey & Hall')}</div>
                        <div style={{ marginLeft: 'auto' }}>{langBtn}</div>
                    </div>
                    <div data-story style={{ maxWidth: 860, margin: '0 auto', padding: '4px 16px 70px' }}>
                        {placedMsg && (
                            <div style={{ ...sec, border: '2px solid #10B981' }}>
                                <div style={{ fontSize: 17, fontWeight: 900, color: '#6EE7B7' }}>{J(`テストの結果: ${placedMsg.n}問中 ${placedMsg.score}問 正解`, `Test result: ${placedMsg.score} of ${placedMsg.n}`)}</div>
                                <div style={{ fontSize: 15, lineHeight: 1.7, marginTop: 4 }}>{J(`あなたは 第${placedMsg.ch + 1}章「${CHAPTERS[placedMsg.ch].name[0]}」(TOEIC ${BANDS[placedMsg.ch]}) から始める。デッキはその章の語から組んだ。`, `You start at Chapter ${placedMsg.ch + 1}, ${CHAPTERS[placedMsg.ch].name[1]} (TOEIC ${BANDS[placedMsg.ch]}). Your deck is built from its words.`)}</div>
                            </div>
                        )}
                        {/* 勇者 */}
                        <div style={{ ...sec, display: 'flex', gap: 16, alignItems: 'center' }}>
                            {ART['leader-you'] && <div style={{ width: narrow ? 70 : 96, height: narrow ? 70 : 96, borderRadius: '50%', flexShrink: 0, backgroundImage: `url(${ART['leader-you']})`, backgroundSize: 'cover', border: '3px solid #F6C85F', boxShadow: '0 0 18px rgba(246,200,95,0.6)' }} />}
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: narrow ? 26 : 34, color: '#FFF6C8' }}>Lv {hall.length}</span>
                                    <span style={{ fontSize: 15, fontWeight: 900, color: '#2A1F08', background: gold, borderRadius: 999, padding: '1px 12px' }}>{heroTitle(hall.length, pool.length)}</span>
                                </div>
                                <div style={{ fontSize: 13, margin: '6px 0 4px', color: 'rgba(255,255,255,0.85)' }}>{J(`殿堂入り ${hall.length} / ${pool.length} 語。殿堂入りした語の数が、勇者のレベル。`, `${hall.length} of ${pool.length} words in the Hall. That number is your level.`)}</div>
                                {bar(hall.length, pool.length, '#F6C85F')}
                            </div>
                        </div>
                        {/* 決まり */}
                        <div style={sec}>
                            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 19, color: '#FFF6C8', marginBottom: 6 }}>{J('進め方', 'How it works')}</div>
                            {[
                                J('デッキは、いま覚えている途中の単語でできている。', 'Your deck is made of the words you are learning now.'),
                                J('対戦が終わったら「確認テスト」を受ける。出てきた語の意味を4択で答える。', 'After a duel, take the check: pick the meaning of words that appeared.'),
                                J(`同じ語に、別の日に ${HALL_NEED} 回正解すると「殿堂入り」。その語はデッキから抜けて、次の語が入る。`, `Answer a word correctly on ${HALL_NEED} different days and it enters the Hall. It leaves your deck and a new word comes in.`),
                                J('まちがえた語は、数え直しになる。', 'A wrong answer resets that word.'),
                                J(`章の語の ${Math.round(BOSS_NEED * 100)}% が殿堂入りすると、その章のボスに挑める。ボスに勝つと章クリア。全部の章のボスを倒したら、このパックはクリア。`, `When ${Math.round(BOSS_NEED * 100)}% of a chapter is in the Hall you can fight its boss. Beat every boss to clear the pack.`),
                            ].map((x, i) => <div key={i} style={{ fontSize: narrow ? 13.5 : 15, lineHeight: 1.8, color: '#FFFDF2' }}>{i + 1}. {x}</div>)}
                            {!prog.placed && <button data-act="take-test" onClick={() => setView('test')} style={{ marginTop: 12, border: '2px solid #FFF6C8', background: 'linear-gradient(180deg, #F6C85F, #B8941E)', color: '#2A1F08', fontWeight: 900, fontSize: 16, borderRadius: 10, padding: '11px 20px', cursor: 'pointer' }}>{J('最初のテストを受ける(約2分)', 'Take the placement test (about 2 min)')}</button>}
                        </div>
                        {/* 章とボス */}
                        {chs.map(ch => {
                            const list = pool.filter(c => chapterOf(c) === ch);
                            const h = list.filter(c => inHall(prog, c.id)).length;
                            const need = Math.ceil(list.length * BOSS_NEED);
                            const cleared = prog.bosses.includes(ch);
                            const open = cleared || ch < prog.start || h >= need;
                            return (
                                <div key={ch} data-chapter={ch} style={{ ...sec, border: ch === prog.start && prog.placed ? '2px solid #F6C85F' : sec.border }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: 12, fontWeight: 900, color: '#2A1F08', background: gold, borderRadius: 999, padding: '1px 10px' }}>{J(`第${ch + 1}章`, `Chapter ${ch + 1}`)}</span>
                                        <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: narrow ? 19 : 23, color: '#FFF6C8' }}>{CHAPTERS[ch].name[lang === 'ja' ? 0 : 1]}</span>
                                        <span style={{ fontSize: 12, fontWeight: 800, color: '#F6C85F' }}>TOEIC {BANDS[ch]}</span>
                                        {ch === prog.start && prog.placed && <span style={{ fontSize: 11, fontWeight: 900, color: '#fff', background: '#047857', borderRadius: 4, padding: '1px 8px' }}>{J('ここから', 'START')}</span>}
                                        {cleared && <span style={{ fontSize: 11, fontWeight: 900, color: '#fff', background: '#B45309', borderRadius: 4, padding: '1px 8px' }}>{J('クリア', 'CLEARED')}</span>}
                                    </div>
                                    <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', margin: '4px 0 8px' }}>{CHAPTERS[ch].intro[lang === 'ja' ? 0 : 1]}</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        <div style={{ flex: 1 }}>{bar(h, list.length, '#F6C85F')}</div>
                                        <span style={{ fontSize: 13, fontWeight: 900, color: '#fff', whiteSpace: 'nowrap' }}>{J('殿堂', 'Hall')} {h} / {list.length}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, flexWrap: 'wrap' }}>
                                        <button data-act="boss" disabled={!open} onClick={() => begin(ch)} style={{ border: open ? '2px solid #FFF6C8' : '1px solid rgba(255,255,255,0.3)', background: open ? 'linear-gradient(180deg, #E11D48, #881337)' : 'rgba(255,255,255,0.06)', color: '#fff', fontWeight: 900, fontSize: 15, borderRadius: 10, padding: '9px 18px', cursor: open ? 'pointer' : 'default', opacity: open ? 1 : 0.6 }}>{J(`ボス「${CHAPTERS[ch].boss[0]}」${cleared ? 'ともう一度' : 'に挑む'}`, `${cleared ? 'Rematch' : 'Fight'} ${CHAPTERS[ch].boss[1]}`)}</button>
                                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>{cleared ? J('この章はクリア済み。', 'Chapter cleared.') : open ? (ch < prog.start ? J('テストで合格した章。ボスにはいつでも挑める。', 'You passed this chapter in the test. The boss is open.') : J('ボスに挑める。勝てば章クリア。', 'The boss is open. Win to clear the chapter.')) : J(`あと ${need - h} 語、殿堂入りするとボスに挑める。`, `${need - h} more words in the Hall to open the boss.`)}</span>
                                    </div>
                                </div>
                            );
                        })}
                        {/* デッキ */}
                        <div style={sec}>
                            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 19, color: '#FFF6C8' }}>{J(`いまのデッキ — 覚えている途中の ${deckCards.length} 語`, `Your deck — ${deckCards.length} words in progress`)}</div>
                            <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.8)', margin: '4px 0 14px' }}>{J(`札の数字は、殿堂入りまでの正解の回数(${HALL_NEED} 回で殿堂入り)。${benchCards.length ? 'カードを押すと控えに回せる。' : ''}${deckCards.length < DECK_SIZE ? ' 20枚に足りない分は、対戦のときだけ殿堂の語で埋める。' : ''}`, `The tag shows correct answers so far (${HALL_NEED} to enter the Hall).`)}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 12px', justifyContent: narrow ? 'center' : 'flex-start' }}>
                                {deckCards.map(c => small(c, benchCards.length ? () => updateProg(p => { const n = { ...p, bench: [...p.bench.filter(x => x !== c.id), c.id], deck: p.deck.filter(x => x !== c.id) }; return { ...n, deck: fillDeck(n, pool) }; }) : undefined, `${okCount(prog, c.id)} / ${HALL_NEED}`, okCount(prog, c.id) ? '#047857' : '#57534E'))}
                            </div>
                            {benchCards.length > 0 && (
                                <>
                                    <div style={{ fontSize: 15, fontWeight: 900, color: '#FFF6C8', margin: '22px 0 4px' }}>{J(`控え — ${benchCards.length} 語`, `Bench — ${benchCards.length} words`)}</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 14 }}>{J('押すとデッキに入る(デッキがいっぱいのときは、先にデッキのカードを控えに回す)。', 'Tap to add to your deck (make room first if it is full).')}</div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 12px', justifyContent: narrow ? 'center' : 'flex-start' }}>
                                        {benchCards.map(c => small(c, deckIdsNow.length < DECK_SIZE || prog.bench.includes(c.id) ? () => updateProg(p => { if (fillDeck(p, pool).length >= DECK_SIZE) return p; const n = { ...p, bench: p.bench.filter(x => x !== c.id), deck: [...fillDeck(p, pool), c.id] }; return { ...n, deck: fillDeck(n, pool) }; }) : undefined, J('控え', 'BENCH'), '#57534E'))}
                                    </div>
                                </>
                            )}
                        </div>
                        {/* 殿堂 */}
                        <div style={{ ...sec, border: '2px solid #F6C85F', boxShadow: '0 0 26px rgba(246,200,95,0.35)' }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 22, background: gold, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{J(`殿堂 — 覚えた ${hall.length} 語`, `The Hall — ${hall.length} words mastered`)}</div>
                            {hall.length === 0
                                ? <div style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', marginTop: 6 }}>{J('まだ空。対戦して、確認テストで正解すると、ここに単語が並んでいく。', 'Empty for now. Duel, pass the checks, and words will line up here.')}</div>
                                : <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px 12px', marginTop: 16, justifyContent: narrow ? 'center' : 'flex-start' }}>{hall.map(c => small(c, () => { setDetail(c); setView('cards'); }, J('殿堂入り', 'HALL'), '#B45309'))}</div>}
                        </div>
                    </div>
                </>,
            );
        }

        // ── ルールブック: 図つきで、順に読める(本人 2026-11-27「バトル説明も超丁寧に」)──
        if (view === 'guide') {
            const J = (ja: string, en: string) => lang === 'ja' ? ja : en;
            const sample = (pool || []).find(c => c.ability === 'RUSH') || (pool || [])[0];
            const cw = narrow ? Math.min(220, scr.w - 130) : 250, chh = cw * CH / CW;
            const sec: React.CSSProperties = { ...plate, padding: narrow ? '16px 14px' : '20px 24px', marginTop: 16 };
            const para: React.CSSProperties = { fontSize: narrow ? 14 : 15.5, lineHeight: 1.85, color: '#FFFDF2', margin: '4px 0' };
            const mark: React.CSSProperties = { width: 24, height: 24, borderRadius: '50%', background: '#DC2626', border: '2px solid #fff', color: '#fff', fontWeight: 900, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.6)', flexShrink: 0 };
            const h2 = (n: number, text: string) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ width: 32, height: 32, borderRadius: '50%', background: gold, color: '#2A1F08', fontWeight: 900, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{n}</span>
                    <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: narrow ? 20 : 25, color: '#FFF6C8' }}>{text}</span>
                </div>
            );
            const dot = (k: string, x: number, y: number) => <span key={k} style={{ ...mark, position: 'absolute', left: x, top: y, zIndex: 5 }}>{k}</span>;
            const row = (k: string, title: string, body: string) => (
                <div key={k} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '9px 0' }}>
                    <span style={mark}>{k}</span>
                    <div style={{ ...para, margin: 0 }}><b style={{ color: '#F6C85F' }}>{title}</b>{J('　', ' — ')}{body}</div>
                </div>
            );
            const zone = (k: string, label: string, st: React.CSSProperties) => (
                <div key={k} style={{ position: 'absolute', border: '2px dashed rgba(255,242,168,0.8)', borderRadius: 10, background: 'rgba(255,242,168,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, fontWeight: 800, color: '#fff', textAlign: 'center', lineHeight: 1.3, ...st }}>
                    <span style={{ ...mark, width: 22, height: 22, fontSize: 12 }}>{k}</span>{label}
                </div>
            );
            const unit = (label: string, atk: number, hp: number, dead?: boolean) => (
                <div style={{ textAlign: 'center', opacity: dead ? 0.45 : 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{label}</div>
                    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', padding: '8px 12px', borderRadius: 10, border: '1.5px solid #D4AF37', background: 'rgba(0,0,0,0.35)' }}>
                        <Gem value={atk} color={['#93C5FD', '#1D4ED8']} size={38} /><Gem value={hp} color={['#FCA5A5', '#B91C1C']} size={38} />
                    </div>
                    {dead && <div style={{ fontSize: 12, fontWeight: 900, color: '#FCA5A5', marginTop: 3 }}>{J('破壊', 'DESTROYED')}</div>}
                </div>
            );
            const mw = Math.min(scr.w - 60, 360);
            return shell(
                <>
                    <div style={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', background: 'linear-gradient(180deg, rgba(14,10,4,0.96), rgba(14,10,4,0.8))', borderBottom: '1.5px solid #D4AF37' }}>
                        <button data-act="back" onClick={() => setView('home')} style={{ ...plate, color: '#FFF2A8', fontWeight: 900, fontSize: 13, padding: '7px 16px', cursor: 'pointer' }}>‹ {t.back}</button>
                        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 20, letterSpacing: 2, background: gold, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t.guide}</div>
                        <div style={{ marginLeft: 'auto' }}>{langBtn}</div>
                    </div>
                    <div data-guide style={{ maxWidth: 860, margin: '0 auto', padding: '4px 16px 70px' }}>
                        <div style={sec}>
                            {h2(1, J('勝ち方', 'How to win'))}
                            <p style={para}>{J('自分と相手に、それぞれ「リーダー」がいる。リーダーの体力は 20。', 'Each side has a leader with 20 health.')}</p>
                            <p style={para}><b style={{ color: '#F6C85F' }}>{J('相手のリーダーの体力を 0 にしたら勝ち。', 'Bring the rival leader to 0 and you win.')}</b> {J('自分のリーダーが 0 になったら負け。', 'If your leader reaches 0, you lose.')}</p>
                            <p style={para}>{J('山札が無くなって、カードを引けなくなったときも負けになる。', 'You also lose if your deck runs out and you cannot draw.')}</p>
                        </div>

                        <div style={sec}>
                            {h2(2, J('カードの見方', 'Reading a card'))}
                            <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: narrow ? 14 : 30, alignItems: narrow ? 'center' : 'flex-start' }}>
                                {sample && (
                                    <div style={{ position: 'relative', padding: 26, flexShrink: 0 }}>
                                        <Card spec={sample} w={cw} />
                                        {dot('1', 8, 8)}{dot('2', 8, 26 + chh - 6)}{dot('3', 26 + cw - 6, 26 + chh - 6)}{dot('4', 26 + cw / 2 - 12, 26 + chh * 0.6)}{dot('5', 26 + cw / 2 - 12, 26 + chh * 0.79)}{dot('6', 26 + cw - 6, 22)}
                                    </div>
                                )}
                                <div style={{ flex: 1 }}>
                                    {row('1', J('コスト(左上・緑)', 'Cost (top left, green)'), J('このカードを出すのに必要なエナジーの数。', 'The energy you need to play this card.'))}
                                    {row('2', J('攻撃(左下・青)', 'Attack (bottom left, blue)'), J('攻撃したとき、相手に与えるダメージの数。', 'The damage it deals when it attacks.'))}
                                    {row('3', J('体力(右下・赤)', 'Health (bottom right, red)'), J('ダメージを受けると減る。0 になると破壊される。', 'Goes down when it takes damage. At 0 the unit is destroyed.'))}
                                    {row('4', pack ? J('単語と意味', 'Word and meaning') : J('英文', 'The line'), pack ? J('このカードで覚える語。出すと、この語を使った英文が声で流れて、語が金色に光る。', 'The word this card teaches. When played, a line using it is spoken and the word lights up.') : J('出すと、この英文が声で流れる。', 'When played, this line is spoken aloud.'))}
                                    {row('5', J('能力', 'Ability'), J('そのカードだけの特別な効果。能力が無いカードもあり、そのぶん数字が少し高い。', 'A special effect. Some cards have none, and get slightly higher numbers instead.'))}
                                    {row('6', pack ? J('品詞と、点数帯(右上)', 'Part of speech and score band (top right)') : J('属性とランク(右上)', 'Element and rank (top right)'), pack ? J('動詞・名詞などの品詞と、その語が TOEIC の何点あたりで要るか。', 'Verb, noun and so on, and the TOEIC score band the word belongs to.') : J('カードの種類を表す札。', 'Tags that show the kind of card.'))}
                                </div>
                            </div>
                        </div>

                        <div style={sec}>
                            {h2(3, J('画面の見方', 'The screen'))}
                            <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: narrow ? 14 : 30, alignItems: narrow ? 'center' : 'flex-start' }}>
                                <div style={{ position: 'relative', width: mw, height: 400, flexShrink: 0, borderRadius: 14, border: '1.5px solid #D4AF37', background: 'radial-gradient(ellipse at 50% 45%, #3b3320, #17130a)' }}>
                                    {zone('A', J('相手のリーダー', 'Rival leader'), { left: '30%', width: '40%', top: 10, height: 50 })}
                                    {zone('B', J('相手の場', 'Rival field'), { left: '6%', width: '66%', top: 74, height: 76 })}
                                    <div style={{ position: 'absolute', left: '4%', right: '26%', top: 160, height: 2, background: 'linear-gradient(90deg, transparent, #FFF2A8, transparent)' }} />
                                    {zone('C', J('自分の場', 'Your field'), { left: '6%', width: '66%', top: 172, height: 76 })}
                                    {zone('D', J('自分のリーダー', 'Your leader'), { left: '30%', width: '40%', top: 260, height: 50 })}
                                    {zone('E', J('手札', 'Your hand'), { left: '6%', width: '88%', top: 322, height: 66 })}
                                    {zone('F', J('ターン終了', 'End turn'), { right: '3%', width: '20%', top: 128, height: 66, borderRadius: 40, flexDirection: 'column', gap: 2 })}
                                </div>
                                <div style={{ flex: 1 }}>
                                    {row('A', J('相手のリーダー', 'Rival leader'), J('赤い数字が体力。これを 0 にする。', 'The red number is its health. Bring it to 0.'))}
                                    {row('B', J('相手の場', 'Rival field'), J('相手が出したユニットが並ぶ。', 'Units the rival has played.'))}
                                    {row('C', J('自分の場', 'Your field'), J('自分が出したユニットが並ぶ。5体まで置ける。', 'Units you have played. Up to 5.'))}
                                    {row('D', J('自分のリーダー', 'Your leader'), J('これが 0 になると負け。', 'If this reaches 0, you lose.'))}
                                    {row('E', J('手札', 'Your hand'), J('緑に光っているカードが、いま出せるカード。8枚まで持てる。', 'Cards glowing green can be played now. You can hold up to 8.'))}
                                    {row('F', J('ターン終了ボタン', 'End turn button'), J('まわりの珠が、いま使えるエナジー。やることが終わったら押す。', 'The gems around it are your energy. Press it when you are done.'))}
                                </div>
                            </div>
                        </div>

                        <div style={sec}>
                            {h2(4, J('1ターンの流れ', 'One turn'))}
                            {([
                                [J('カードを1枚引く', 'Draw a card'), J('自分の番が来ると、自動で山札から1枚引く。', 'At the start of your turn you draw one card automatically.')],
                                [J('エナジーが増える', 'Energy grows'), J('使える数が 1 つ増えて、全部回復する。1ターン目は 1、2ターン目は 2、と増えて、最大 8。', 'Your energy limit rises by 1 and refills. 1 on turn one, 2 on turn two, up to 8.')],
                                [J('カードを出す', 'Play cards'), J('手札のカードを押して場に出す。エナジーが足りるかぎり、何枚出してもいい。出したカードは「ユニット」になって場に残る。', 'Tap cards in your hand to play them, as many as your energy allows. A played card stays on the field as a unit.')],
                                [J('ユニットで攻撃する', 'Attack'), J('場のユニットを押して選び、攻撃する相手を押す。1体につき、1ターンに1回。', 'Tap one of your units, then tap a target. Each unit attacks once per turn.')],
                                [J('ターンを終える', 'End your turn'), J('「ターン終了」を押すと、相手の番になる。', 'Press End Turn and the rival takes a turn.')],
                            ] as [string, string][]).map(([a, b2], i) => row(String(i + 1), a, b2))}
                            <p style={{ ...para, marginTop: 10, color: 'rgba(255,255,255,0.78)' }}>{J('最初はあなたが先攻で、手札は4枚。相手は後攻のかわりに5枚持って始まる。', 'You go first with 4 cards. The rival goes second and starts with 5.')}</p>
                        </div>

                        <div style={sec}>
                            {h2(5, J('攻撃のルール', 'How attacks work'))}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: narrow ? 8 : 18, flexWrap: 'wrap', margin: '6px 0 12px' }}>
                                {unit(J('あなた', 'Yours'), 3, 4)}
                                <span style={{ fontSize: 13, fontWeight: 900, color: '#F6C85F' }}>{J('攻撃', 'attacks')} ▶</span>
                                {unit(J('相手', 'Rival'), 2, 3)}
                                <span style={{ fontSize: 22, color: '#F6C85F' }}>⇒</span>
                                {unit(J('あなた', 'Yours'), 3, 2)}
                                {unit(J('相手', 'Rival'), 2, 0, true)}
                            </div>
                            <p style={para}>{J('ユニットどうしがぶつかると、お互いに、相手の「攻撃」の数だけ「体力」が減る。上の例では、あなたは 4 − 2 で 2 残り、相手は 3 − 3 で 0 になって破壊される。', 'When units fight, each loses health equal to the other\'s attack. Above, yours goes 4 − 2 = 2 and survives; the rival goes 3 − 3 = 0 and is destroyed.')}</p>
                            <p style={para}>{J('相手のリーダーを攻撃すると、攻撃の数だけリーダーの体力が減る。このとき、こちらは傷つかない。', 'Attack the rival leader and its health drops by your attack. Your unit is not hurt.')}</p>
                            <p style={para}>{J('出したばかりのユニットは、次の自分の番まで攻撃できない(能力「速攻」は例外)。', 'A unit cannot attack on the turn it is played (except with RUSH).')}</p>
                            <p style={para}>{J('相手の場に「守護」のユニットがいるあいだは、守護しか攻撃できない。リーダーにも届かない。', 'While the rival has a WARD unit, you can only attack that unit. The leader is out of reach.')}</p>
                            <p style={para}>{J('減った体力は、ターンが変わっても元に戻らない。', 'Lost health does not come back on later turns.')}</p>
                        </div>

                        <div style={sec}>
                            {h2(6, J('能力は5つ', 'The five abilities'))}
                            {(['RUSH', 'WARD', 'HEAL', 'INSIGHT', 'STRIKE'] as const).map(a => (
                                <div key={a} style={{ display: 'flex', gap: 12, alignItems: 'center', margin: '9px 0' }}>
                                    <span style={{ minWidth: 86, textAlign: 'center', fontSize: 14, fontWeight: 900, color: '#2A1F08', background: gold, borderRadius: 999, padding: '3px 10px', flexShrink: 0 }}>{abilityName(a)}</span>
                                    <span style={{ ...para, margin: 0 }}>{lang === 'ja' ? ABILITY_JA[a] : ABILITY_TEXT[a]}</span>
                                </div>
                            ))}
                        </div>

                        {pack && (
                            <div style={sec}>
                                {h2(7, J('単語カードの決まり', 'How word cards are built'))}
                                <p style={para}>{J('1枚のカードが、1つの単語。カードを出すと、その語を使った英文が声で流れる。対戦しているうちに、何度も耳に入る。', 'One card is one word. Playing it speaks a line that uses the word, so you hear it again and again as you play.')}</p>
                                <p style={para}><b style={{ color: '#F6C85F' }}>{J('カードの右上に、TOEIC の点数帯が書いてある。', 'The top right shows the TOEIC score band.')}</b> {J('500 から 900 まで。章はこの点数帯で分かれていて、最初のテストで始める章が決まる。', 'From 500 to 900. Chapters follow these bands, and the placement test picks where you start.')}</p>
                                <p style={para}>{J('カードの色は品詞で決まる。炎=動詞、土=名詞、風=形容詞、雷=副詞、水=熟語。', 'The colour shows the part of speech: flame = verb, earth = noun, wind = adjective, thunder = adverb, water = phrase.')}</p>
                                <p style={para}>{J('対戦が終わると「出た単語」で、その対戦に出てきた語を見直せる。意味は隠してあるので、思い出してから押す。', 'After a duel, open the word list to review the words that appeared. Meanings are hidden until you tap.')}</p>
                            </div>
                        )}

                        <div style={sec}>
                            {h2(pack ? 8 : 7, J('勝つコツ', 'Tips'))}
                            {([
                                J('最初のうちは、コストの軽いカードから出して、場にユニットを並べる。', 'Early on, play cheap cards and build a board.'),
                                J('体力の多いユニットで、相手の弱いユニットを攻撃する。こちらは生き残って、相手だけ減る。', 'Attack weak rival units with your sturdy ones: yours survive, theirs do not.'),
                                J('「守護」を出しておくと、相手はリーダーを攻撃できなくなる。', 'A WARD unit stops the rival from reaching your leader.'),
                                J('相手の場にユニットがいなければ、全員でリーダーを攻撃する。', 'If the rival field is empty, send everything at the leader.'),
                                J('エナジーは次のターンに持ち越せない。使い切るつもりで出す。', 'Energy does not carry over. Try to spend it all.'),
                            ]).map((x, i) => <p key={i} style={para}>・{x}</p>)}
                        </div>

                        <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                            <button data-act="guide-play" disabled={!ready} onClick={() => { setView('home'); start(); }} style={{ flex: 1, minWidth: 200, border: '2px solid #FFF6C8', background: 'linear-gradient(180deg, #F6C85F, #B8941E)', color: '#2A1F08', fontWeight: 900, fontSize: 18, letterSpacing: 1, borderRadius: 12, padding: '14px 0', cursor: 'pointer' }}>{t.play}</button>
                            <button onClick={() => { setView('home'); runDemo(); }} style={{ ...plate, flex: 1, minWidth: 200, color: '#FFF6C8', fontWeight: 900, fontSize: 16, padding: '14px 0', cursor: 'pointer' }}>{J('動く説明を見る', 'Watch the demo')}</button>
                        </div>
                    </div>
                </>,
            );
        }

        // ── 入口 ──
        const waiting = net && net.role === 'host' && net.status !== 'playing';
        const link = waiting ? `${window.location.origin}/english/duel/guest?room=${net.code}` : '';
        return shell(
            <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {/* 右に大きく、自分のリーダーの絵 */}
                {ART['leader-you'] && <div style={{ position: 'absolute', right: narrow ? '-20%' : '2%', top: narrow ? 40 : '8%', width: narrow ? '90%' : '46%', aspectRatio: '1 / 1', backgroundImage: `url(${ART['leader-you']})`, backgroundSize: 'cover', borderRadius: '50%', opacity: narrow ? 0.4 : 0.95, maskImage: 'radial-gradient(circle, #000 52%, transparent 72%)', WebkitMaskImage: 'radial-gradient(circle, #000 52%, transparent 72%)', pointerEvents: 'none' }} />}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px' }}>
                    <div style={{ ...plate, padding: '6px 14px', fontSize: 12, fontWeight: 800, letterSpacing: 1, color: '#FFF2A8' }}>{t.record} <b style={{ color: '#fff', fontSize: 15 }}>{record.win}</b> {t.win} <b style={{ color: '#fff', fontSize: 15 }}>{record.lose}</b> {t.lose}</div>
                    {pack && <button data-act="leave" onClick={() => { if (window.history.length > 1) window.history.back(); else window.location.assign('/english'); }} style={{ ...plate, color: '#FFF2A8', fontWeight: 800, fontSize: 12, padding: '6px 14px', cursor: 'pointer' }}>‹ {lang === 'ja' ? 'サイトへ戻る' : 'Back to site'}</button>}
                    <div style={{ marginLeft: 'auto' }}>{langBtn}</div>
                </div>

                <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: narrow ? '10px 18px 30px' : '0 6% 40px', maxWidth: 620 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 6, color: '#F6C85F' }}>{pack ? 'TONIO LAB' : 'EIGODAMASHII'}</div>
                    <div style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 900, fontSize: narrow ? 52 : 84, lineHeight: 1, letterSpacing: 3, background: gold, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 4px 0 rgba(0,0,0,0.5)) drop-shadow(0 0 26px rgba(246,200,95,0.55))' }}>{pack ? 'WORD DUEL' : 'CARD DUEL'}</div>
                    <div style={{ width: narrow ? 220 : 380, height: 2, margin: '12px 0 10px', background: 'linear-gradient(90deg, #FFF2A8, transparent)' }} />
                    {pack && <div style={{ display: 'inline-block', alignSelf: 'flex-start', marginBottom: 8, padding: '4px 12px', borderRadius: 999, border: '1px solid #F6C85F', background: 'rgba(20,14,4,0.7)', fontSize: 13, fontWeight: 900, letterSpacing: 1, color: '#FFF6C8' }}>{lang === 'ja' ? pack.titleJa : pack.title} · {pack.cards.length} {lang === 'ja' ? '語' : 'words'}</div>}
                    <div style={{ fontSize: narrow ? 14 : 17, lineHeight: 1.7, color: '#FFFDF2', textShadow: '0 1px 3px #000', maxWidth: 480 }}>{pack ? (lang === 'ja' ? '1枚が1語のカードゲーム。出すたびに声が鳴って、英文の中でその語が光る。遊んでいるうちに、仕事で必ず出る単語が入る。' : 'One card, one word. Every card you play is spoken aloud and the word lights up inside its line. Play, and the must-know work words stick.') : t.pitch}</div>

                    {/* 単語パック: 勇者のレベルと、次にやること */}
                    {pack && pool && (() => {
                        const hallN = pool.filter(c => inHall(prog, c.id)).length;
                        const chs = [...new Set(pool.map(chapterOf))].sort((x, y) => x - y);
                        const bossCh = chs.find(ch => !prog.bosses.includes(ch) && (ch < prog.start || pool.filter(c => chapterOf(c) === ch && inHall(prog, c.id)).length >= Math.ceil(pool.filter(c => chapterOf(c) === ch).length * BOSS_NEED)));
                        const allDone = chs.every(ch => prog.bosses.includes(ch));
                        const todo = !prog.placed ? { text: lang === 'ja' ? '最初のテストを受ける(約2分)。ちょうどいい章から始められる。' : 'Take the placement test (about 2 minutes).', on: () => setView('test') }
                            : allDone ? { text: lang === 'ja' ? '全部の章をクリアした。残りの語を殿堂に入れよう。' : 'All chapters cleared. Fill the Hall.', on: start }
                                : bossCh !== undefined ? { text: lang === 'ja' ? `第${bossCh + 1}章のボス「${CHAPTERS[bossCh].boss[0]}」に挑める。` : `The Chapter ${bossCh + 1} boss is open.`, on: () => { setPlacedMsg(null); setView('story'); } }
                                    : { text: lang === 'ja' ? '対戦して、終わったら確認テストを受ける。正解した語が殿堂に近づく。' : 'Duel, then take the check. Correct words move toward the Hall.', on: start };
                        return (
                            <div data-hero style={{ ...plate, marginTop: 16, padding: '12px 16px' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 24, color: '#FFF6C8' }}>{lang === 'ja' ? '勇者' : 'Hero'} Lv {hallN}</span>
                                    <span style={{ fontSize: 13, fontWeight: 900, color: '#2A1F08', background: gold, borderRadius: 999, padding: '1px 10px' }}>{heroTitle(hallN, pool.length)}</span>
                                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{lang === 'ja' ? `殿堂入り ${hallN} / ${pool.length} 語` : `${hallN} / ${pool.length} words in the Hall`}</span>
                                </div>
                                <div style={{ height: 7, borderRadius: 4, background: 'rgba(255,255,255,0.14)', overflow: 'hidden', margin: '7px 0 9px' }}><div style={{ width: `${(hallN / pool.length) * 100}%`, height: '100%', background: '#F6C85F' }} /></div>
                                <button data-act="todo" onClick={todo.on} style={{ display: 'flex', width: '100%', alignItems: 'center', gap: 8, textAlign: 'left', border: '1px solid #10B981', background: 'rgba(16,185,129,0.16)', color: '#fff', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}>
                                    <span style={{ fontSize: 11, fontWeight: 900, color: '#fff', background: '#047857', borderRadius: 4, padding: '1px 7px', flexShrink: 0 }}>{lang === 'ja' ? '次にやること' : 'NEXT'}</span>
                                    <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.45 }}>{todo.text}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: 18, color: '#6EE7B7' }}>›</span>
                                </button>
                            </div>
                        );
                    })()}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
                        {menu.filter(m => !(pack && m.key === 'online')).map(m => (
                            <button key={m.key} data-act={m.key} disabled={m.off} onClick={m.on} className="duel-menu" style={{ ...plate, display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', cursor: m.off ? 'default' : 'pointer', opacity: m.off ? 0.5 : 1, padding: m.main ? '16px 18px' : '11px 18px',
                                ...(m.main ? { background: 'linear-gradient(180deg, #F6C85F, #B8941E)', border: '2px solid #FFF6C8', boxShadow: '0 10px 28px rgba(0,0,0,0.55), 0 0 26px rgba(246,200,95,0.6)' } : {}) }}>
                                <svg width={m.main ? 40 : 30} height={m.main ? 40 : 30} viewBox="0 0 24 24" style={{ flexShrink: 0 }}><path d={m.icon} fill={m.main ? '#2A1F08' : '#F6C85F'} /></svg>
                                <span style={{ flex: 1 }}>
                                    <span style={{ display: 'block', fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: m.main ? 26 : 19, letterSpacing: 1, color: m.main ? '#2A1F08' : '#FFF6C8' }}>{m.title}</span>
                                    <span style={{ display: 'block', fontSize: 12, marginTop: 1, color: m.main ? 'rgba(42,31,8,0.85)' : 'rgba(255,255,255,0.72)' }}>{m.sub}</span>
                                </span>
                                <span style={{ fontSize: 22, color: m.main ? '#2A1F08' : '#D4AF37' }}>›</span>
                            </button>
                        ))}
                    </div>
                    {pool === null && <div style={{ marginTop: 14, fontSize: 13, color: '#FFF2A8' }}>{t.loading}</div>}
                    {pool && pool.length < minPool && <div style={{ marginTop: 14, fontSize: 13, color: '#FCA5A5' }}>{t.loadFail}</div>}
                </div>

                {/* 通信対戦の部屋を作ったあと: 招待リンク */}
                {waiting && (
                    <div style={{ position: 'fixed', inset: 0, zIndex: 20, background: 'rgba(8,6,2,0.84)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                        <div style={{ ...plate, padding: 22, maxWidth: 520, width: '100%', textAlign: 'center', boxSizing: 'border-box' }}>
                            {net.status === 'error' ? <div style={{ fontSize: 15, fontWeight: 800, color: '#FCA5A5' }}>{net.msg}</div> : (
                                <>
                                    <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 4, color: '#F6C85F' }}>{t.room}</div>
                                    <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 52, letterSpacing: 10, background: gold, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{net.code}</div>
                                    <div style={{ fontSize: 13, lineHeight: 1.7, color: '#fff', margin: '4px 0 10px' }}>{t.roomHelp}</div>
                                    <div data-link style={{ fontFamily: 'monospace', fontSize: 13, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(212,175,55,0.6)', borderRadius: 8, padding: '9px 10px', wordBreak: 'break-all', userSelect: 'all', color: '#FFF6C8' }}>{link}</div>
                                    <div style={{ marginTop: 12, fontSize: 14, fontWeight: 800, color: '#6EE7B7', animation: 'duel-chev 1.4s ease-in-out infinite' }}>{t.waiting}</div>
                                </>
                            )}
                            <div style={{ marginTop: 14, display: 'flex', gap: 10, justifyContent: 'center' }}>
                                {net.status !== 'error' && <button style={btn(true)} onClick={() => { navigator.clipboard?.writeText(link).catch(() => { /* 写せない端末 */ }); }}>{t.copy}</button>}
                                <button style={btn(false)} onClick={leaveNet}>{t.cancel}</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>,
        );
    }

    // ── 対戦(画面全体を盤面にする)──
    const g = game;
    const me = g.sides[0], foe = g.sides[1];
    const myTurn = g.active === 0 && g.winner === null;
    const b = BT[lang];
    // 狭い画面(スマホなど)では、幅 760 の盤面を組んでから全体を縮めて収める。部品を1つずつ詰め直すより崩れない
    // 縦長の画面(スマホ)は専用の配置: 幅 480 で組む。駒は横5体が入る大きさ、END TURN は右下、手札は幅いっぱい
    const portrait = scr.w < 700 && scr.w < scr.h * 0.8;
    const zoom = Math.min(1, scr.w / (portrait ? 480 : 760));
    zoomRef.current = zoom;
    const SW = Math.round(scr.w / zoom), SH = Math.round(scr.h / zoom);
    const leaderS = portrait ? 84 : Math.round(Math.max(60, Math.min(SH * 0.125, SW * 0.11, 112)));
    const handW = portrait ? 100 : Math.round(Math.max(96, Math.min(SW / 9.5, SH * 0.2, 150)));
    const handH = Math.round(handW * CH / CW);
    const handPeek = handH + (portrait ? 8 : 12);                       // 画面の下から覗く高さ
    const tokenW = portrait ? 84 : Math.round(Math.max(54, Math.min(SW / 9.2, (SH - handPeek - Math.min(SH * 0.125, 112) * 3.2) / 3.25, 132)));
    const tokenH = Math.round(tokenW * 1.24);
    const selUnit = sel !== null ? me.field.find(u => u.uid === sel) : undefined;
    const legal = myTurn && selUnit && canAttack(g, selUnit) ? targetsFor(g) : { units: [] as number[], leader: false };
    const idle = myTurn && !me.hand.some((_, i) => canPlay(g, i)) && !me.field.some(u => canAttack(g, u));
    const shown = preview || selUnit?.card || null;
    const midY = portrait ? Math.round((64 + leaderS + 34 + (SH - handPeek - 30 - leaderS - 10)) / 2) : Math.round((leaderS * 1.45 + (SH - handPeek - leaderS * 1.55)) / 2);                                        // 盤面の中心(手札の分だけ上に寄せる)
    const rowGap = Math.round(tokenH * (portrait ? 0.62 : 0.34));
    const AR = ARENAS[arena % ARENAS.length];
    const tall = portrait && !!ART[`${AR.img}-tall`];                 // スマホの縦長の画面には、縦長の絵を使う
    const boardKey = tall ? `${AR.img}-tall` : AR.img;
    const own = !!ART[boardKey];                                        // その舞台の絵が有るか(無ければ草原の絵で代わりをする)
    const aspect = tall ? 2 / 3 : 1.5;
    const bgCy = own ? (tall ? AR.tcy : AR.cy) : 0.5;
    // 絵の大きさ。絵の中の魔法陣を midY に置いたまま、画面を覆える大きさにする(魔法陣が絵の中心から外れている分だけ大きく)
    const bgH = Math.max(SW / aspect, 2 * Math.max(midY, SH - midY) * (1 / (1 - 2 * Math.abs(0.5 - bgCy)) + 0.03));
    const bgW = bgH * aspect;
    const boardSrc = ART[boardKey] || ART.board;
    const ringF = own ? (tall ? AR.tring : AR.ring) : null;
    const circ = ringF ? bgW * ringF * 0.86 : Math.min(SW * 0.6, SH * 0.82);   // 重ねる魔法陣の直径(絵に描かれた輪の少し内側)
    const sq = 1;
    const ringR = portrait ? 40 : Math.round(Math.max(40, Math.min(SH * 0.085, 66)));

    const row = (side: 0 | 1) => (
        <div style={{ position: 'absolute', left: 0, right: 0, top: side === 1 ? midY - rowGap / 2 - tokenH - 16 : midY + rowGap / 2, height: tokenH + 44, display: 'flex', gap: g.sides[side].field.length > 1 ? Math.max(0, Math.min(Math.round(tokenW * 0.3), Math.floor((SW - 16 - g.sides[side].field.length * tokenW) / (g.sides[side].field.length - 1)))) : 0, justifyContent: 'center', alignItems: 'flex-start' }}>
            {g.sides[side].field.map(u => {
                const mine = side === 0;
                const isTarget = !mine && legal.units.includes(u.uid);
                const ready = mine && myTurn && canAttack(g, u);
                const lg = lunge?.uid === u.uid ? lunge : null;
                return (
                    <div key={u.uid} style={{ position: 'relative', zIndex: lg ? 25 : 1, transform: lg ? `translate(${lg.dx}px, ${lg.dy}px) scale(1.15)` : 'none', transition: lg ? 'transform .2s cubic-bezier(.5,-0.3,.8,.6)' : 'transform .3s ease-out' }}>
                        <div style={{ animation: hits.includes(`u${u.uid}`) ? 'duel-shake .4s ease' : 'duel-summon .5s ease-out' }}>
                            <Token spec={u.card} w={tokenW} atk={u.atk} hp={u.hp} attrs={{ 'data-u': u.uid, 'data-side': side }} onHover={setPreview}
                                fx={sel === u.uid ? 'chosen' : isTarget ? 'target' : ready ? 'ready' : mine && myTurn ? 'spent' : undefined}
                                onClick={mine && myTurn && canAttack(g, u) ? () => { if (sel !== u.uid) sfx('select'); setSel(sel === u.uid ? null : u.uid); }
                                    : isTarget && selUnit ? () => perform({ type: 'attack', a: selUnit.uid, t: u.uid }) : () => setInspect({ spec: u.card })} />
                        </div>
                        <div style={{ position: 'absolute', left: '50%', top: tokenH + Math.round(tokenW * 0.1), transform: 'translateX(-50%)', width: tokenW * 1.25, fontSize: Math.max(8, Math.round(tokenW * 0.095)), fontWeight: 800, lineHeight: 1.2, color: '#fff', textAlign: 'center', textShadow: '0 1px 2px #000, 0 0 6px rgba(0,0,0,0.9)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', pointerEvents: 'none' }}>{u.card.word ? <><span style={{ fontSize: '1.25em' }}>{u.card.word}</span><br />{u.card.ja}</> : u.card.text}</div>
                        <div style={{ position: 'absolute', left: '50%', top: tokenH / 2, width: tokenW * 1.3, height: tokenW * 1.3, borderRadius: '50%', border: '4px solid #fff', pointerEvents: 'none', opacity: 0, animation: 'duel-ring .6s ease-out' }} />
                    </div>
                );
            })}
        </div>
    );

    const handStep = me.hand.length > 1 ? Math.min(handW * 0.9, ((portrait ? SW - 24 : Math.min(SW * 0.74, SW - 2 * (ringR + 60))) - handW) / (me.hand.length - 1)) : 0;

    // 画面全体を覆う。親に transform があると fixed が親の大きさになるので、body の直下に出す
    return createPortal(
        <div id="duel-root" key="battle" onMouseMove={selUnit ? e => setAim({ x: e.clientX / zoom, y: e.clientY / zoom }) : undefined}
            onClick={handSel !== null ? e => { if (!(e.target as HTMLElement).closest('[data-hand]')) setHandSel(null); } : undefined}
            style={{ position: 'fixed', left: 0, top: 0, width: SW, height: SH, transform: zoom < 1 ? `scale(${zoom})` : undefined, transformOrigin: 'top left', zIndex: 99999, overflow: 'hidden', userSelect: 'none', fontFamily: 'inherit', animation: quake ? 'duel-quake .35s ease' : undefined,
            background: ART.board ? AR.base : [
                `radial-gradient(ellipse 58% 46% at 50% ${midY}px, rgba(255,246,214,0.95) 0%, rgba(255,232,170,0.5) 34%, rgba(255,232,170,0) 66%)`,
                `repeating-radial-gradient(circle at 50% ${midY}px, rgba(74,56,28,0) 0 ${Math.round(SH * 0.062)}px, rgba(74,56,28,0.42) ${Math.round(SH * 0.062)}px ${Math.round(SH * 0.062) + 2}px)`,
                `repeating-conic-gradient(from 3deg at 50% ${midY}px, rgba(74,56,28,0) 0deg 11.4deg, rgba(74,56,28,0.3) 11.4deg 12deg)`,
                `radial-gradient(ellipse at 50% ${midY}px, #E4D3A8 0%, #C4AD7C 38%, #96805A 70%, #5F5136 100%)`,
            ].join(', ') }}>
            <style>{CSS}</style>
            {/* 舞台の絵。絵に描かれた魔法陣の中心を、盤面の中心(midY)に合わせて置く(本人 2026-11-27「六芒星がずれてる」: 前は画面の中心に置いていて、上に寄せた盤面とずれていた)。ゆっくり寄っていく */}
            <div data-arena={AR.name} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', filter: AR.filter }}>
                {boardSrc && <div style={{ position: 'absolute', left: '50%', top: midY + (0.5 - bgCy) * bgH, width: bgW, height: bgH, background: `center / 100% 100% no-repeat url(${boardSrc})`, transform: 'translate(-50%,-50%)', transformOrigin: `50% ${bgCy * 100}%`, animation: 'duel-kenburns 36s ease-in-out infinite alternate' }} />}
                {/* 四隅の草木と、周りの暗さ */}
                <div style={{ position: 'absolute', inset: 0, background: [
                    ...(AR.corners ? [
                        'radial-gradient(ellipse 34% 30% at 0% 0%, rgba(22,101,52,0.85) 0%, rgba(22,101,52,0) 70%)',
                        'radial-gradient(ellipse 30% 28% at 100% 0%, rgba(21,128,61,0.8) 0%, rgba(21,128,61,0) 70%)',
                        'radial-gradient(ellipse 30% 30% at 0% 100%, rgba(20,83,45,0.85) 0%, rgba(20,83,45,0) 70%)',
                        'radial-gradient(ellipse 32% 30% at 100% 100%, rgba(22,101,52,0.85) 0%, rgba(22,101,52,0) 70%)',
                    ] : []),
                    'radial-gradient(ellipse 75% 70% at 50% 45%, rgba(0,0,0,0) 55%, rgba(24,18,8,0.62) 100%)',
                ].join(', ') }} />
            </div>
            {/* 舞台の色 */}
            {AR.tint && <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: AR.tint, mixBlendMode: AR.blend as React.CSSProperties['mixBlendMode'] }} />}
            {/* 流れる雲の影 */}
            {[0, 1, 2].map(i => (
                <div key={i} style={{ position: 'absolute', left: 0, top: `${[4, 38, 62][i]}%`, width: '55%', height: '46%', pointerEvents: 'none', background: `radial-gradient(ellipse 50% 50% at 50% 50%, rgba(10,14,8,${AR.shade}) 0%, rgba(10,14,8,0) 70%)`, animation: `duel-cloud ${[58, 74, 66][i]}s linear ${[-12, -40, -55][i]}s infinite` }} />
            ))}
            {/* 上から差す光の筋。ゆっくり揺れる */}
            <div style={{ position: 'absolute', left: '50%', top: -SH * 0.55, width: SW * 1.7, height: SH * 2.1, marginLeft: -SW * 0.85, pointerEvents: 'none', mixBlendMode: 'screen', opacity: AR.rayOpacity,
                background: `repeating-conic-gradient(from 148deg at 34% 0%, ${AR.ray} 0deg 2.4deg, rgba(0,0,0,0) 2.4deg 9deg, ${AR.ray} 9deg 9.8deg, rgba(0,0,0,0) 9.8deg 15deg)`,
                maskImage: 'radial-gradient(ellipse 62% 62% at 34% 0%, #000 0%, transparent 74%)', WebkitMaskImage: 'radial-gradient(ellipse 62% 62% at 34% 0%, #000 0%, transparent 74%)', animation: 'duel-sway 13s ease-in-out infinite alternate' }} />
            {/* 相手側は赤く、自分側は緑に、うっすら染める */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `linear-gradient(180deg, rgba(190,18,60,0.2) 0%, rgba(190,18,60,0) ${Math.round(midY * 0.9)}px, rgba(5,150,105,0) ${Math.round(midY * 1.1)}px, rgba(5,150,105,0.2) 100%)` }} />
            {/* 魔法陣の下の光。息をするように明滅する */}
            <div style={{ position: 'absolute', left: '50%', top: midY, width: circ * 1.15, height: circ * 1.15, transform: `translate(-50%,-50%) scaleY(${sq})`, borderRadius: '50%', pointerEvents: 'none', mixBlendMode: 'screen', background: `radial-gradient(circle, ${AR.glow}55 0%, ${AR.glow}22 38%, transparent 68%)`, animation: 'duel-breathe 5.5s ease-in-out infinite' }} />
            {/* 逆に回る内側の輪(12の菱) */}
            <svg viewBox="0 0 400 400" style={{ position: 'absolute', left: '50%', top: midY, width: circ * 0.78, height: circ * 0.78, ['--sq' as string]: sq, animation: 'duel-spin2 55s linear infinite reverse', opacity: 0.75, pointerEvents: 'none', filter: `drop-shadow(0 0 6px ${AR.glow})` } as React.CSSProperties}>
                <circle cx="200" cy="200" r="190" fill="none" stroke={AR.glow} strokeWidth="1.5" strokeDasharray="1 7" />
                {Array.from({ length: 12 }).map((_, i) => {
                    const a = (i / 12) * Math.PI * 2, x = 200 + Math.cos(a) * 170, y = 200 + Math.sin(a) * 170, k = i % 3 ? 7 : 12;
                    return <polygon key={i} points={`${x},${y - k} ${x + k * 0.6},${y} ${x},${y + k} ${x - k * 0.6},${y}`} fill={i % 3 ? 'none' : AR.glow} stroke="#fff" strokeWidth="1.2" transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`} />;
                })}
            </svg>
            {/* 中央の魔法陣 */}
            <svg viewBox="0 0 400 400" style={{ position: 'absolute', left: '50%', top: midY, width: circ, height: circ, ['--sq' as string]: sq, animation: 'duel-spin2 80s linear infinite', opacity: sq < 1 ? 0.5 : 0.7, pointerEvents: 'none', filter: `drop-shadow(0 0 8px ${AR.glow})` } as React.CSSProperties}>
                <circle cx="200" cy="200" r="192" fill="none" stroke="#FFF2A8" strokeWidth="3" />
                <circle cx="200" cy="200" r="178" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="2 8" />
                <circle cx="200" cy="200" r="120" fill="none" stroke="#FFF2A8" strokeWidth="2" />
                <circle cx="200" cy="200" r="60" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="10 6" />
                {Array.from({ length: 6 }).map((_, i) => {
                    const a = (i / 6) * Math.PI * 2 - Math.PI / 2, b = ((i + 2) / 6) * Math.PI * 2 - Math.PI / 2;
                    return <line key={i} x1={200 + Math.cos(a) * 178} y1={200 + Math.sin(a) * 178} x2={200 + Math.cos(b) * 178} y2={200 + Math.sin(b) * 178} stroke="#fff" strokeWidth="1.5" />;
                })}
                {Array.from({ length: 36 }).map((_, i) => {
                    const a = (i / 36) * Math.PI * 2;
                    return <line key={i} x1={200 + Math.cos(a) * 180} y1={200 + Math.sin(a) * 180} x2={200 + Math.cos(a) * (i % 3 ? 188 : 192)} y2={200 + Math.sin(a) * (i % 3 ? 188 : 192)} stroke="#FFF2A8" strokeWidth={i % 3 ? 1.5 : 3} />;
                })}
            </svg>
            {/* 中央の線。光が端から端へ走る */}
            <div style={{ position: 'absolute', left: '14%', right: '14%', top: midY - 1, height: 3, background: `linear-gradient(90deg, transparent, ${AR.line} 18%, #fff 50%, ${AR.line} 82%, transparent)`, boxShadow: `0 0 14px 2px ${AR.line}`, pointerEvents: 'none', overflow: 'visible' }}>
                <div style={{ position: 'absolute', top: -5, width: '16%', height: 13, borderRadius: 8, background: 'radial-gradient(ellipse, #fff 0%, rgba(255,255,255,0) 70%)', mixBlendMode: 'screen', animation: 'duel-shine 4.2s ease-in-out infinite' }} />
            </div>
            {/* 盤面で何かが起きるたびに、中心から波が広がる(出す・倒す・番が替わる・リーダーに当たる) */}
            <div key={`w${g.turn}-${g.active}-${me.field.length}-${foe.field.length}-${me.hp}-${foe.hp}`} style={{ position: 'absolute', left: '50%', top: midY, width: circ, height: circ, borderRadius: '50%', border: `3px solid ${AR.glow}`, boxShadow: `0 0 24px 4px ${AR.glow}, inset 0 0 24px 4px ${AR.glow}`, pointerEvents: 'none', opacity: 0, ['--sq' as string]: sq, animation: 'duel-wave 1.1s ease-out both' } as React.CSSProperties} />
            {/* 舞う粒: 舞台ごとに、花びら・火の粉・蛍・落ち葉・雪 */}
            <ArenaMotes arena={AR} w={SW} h={SH} />

            {/* 相手: 手札(左上)、リーダー(上の中央)、エナジー、枚数 */}
            <div style={{ position: 'absolute', left: 12, top: 10, display: 'flex' }}>
                {foe.hand.map((c, i) => <Card key={i} spec={c} w={Math.round(Math.max(28, Math.min(SW * 0.04, 46)))} back style={{ marginLeft: i ? -Math.round(Math.max(28, Math.min(SW * 0.04, 46)) * 0.42) : 0, filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.5))' }} />)}
            </div>
            <div style={{ position: 'absolute', left: '50%', top: portrait ? 64 : Math.round(leaderS * 0.16) + 6, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: portrait ? 26 : Math.round(leaderS * 0.5) }}>
                <Plaque style={{ padding: '4px 12px', textAlign: 'center', lineHeight: 1.1 }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: '#6EE7B7' }}>{b.energy}</div>
                    <div style={{ fontSize: Math.max(16, leaderS * 0.24) }}>{foe.energy}<span style={{ fontSize: '0.6em', color: '#D4AF37' }}> / {foe.energyMax}</span></div>
                </Plaque>
                <Leader side={1} hp={foe.hp} size={leaderS} hit={hits.includes('L1')} target={legal.leader}
                    onClick={legal.leader && selUnit ? () => perform({ type: 'attack', a: selUnit.uid, t: null }) : undefined} />
                <Plaque style={{ padding: '4px 12px', fontSize: 11, lineHeight: 1.5, letterSpacing: 1, fontFamily: 'inherit' }}>
                    <div>{b.deck} <b style={{ color: '#fff' }}>{foe.deck.length}</b></div>
                    <div>{b.hand} <b style={{ color: '#fff' }}>{foe.hand.length}</b></div>
                </Plaque>
            </div>

            {row(1)}
            {row(0)}
            {foe.field.length === 0 && <div style={{ position: 'absolute', left: 0, right: 0, top: midY - rowGap / 2 - tokenH / 2 - 16, textAlign: 'center', fontSize: 11, fontWeight: 800, letterSpacing: 4, color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 3px rgba(0,0,0,0.6)', pointerEvents: 'none' }}>{b.rivalField}</div>}
            {me.field.length === 0 && <div style={{ position: 'absolute', left: 0, right: 0, top: midY + rowGap / 2 + tokenH / 2 - 8, textAlign: 'center', fontSize: 11, fontWeight: 800, letterSpacing: 4, color: 'rgba(255,255,255,0.6)', textShadow: '0 1px 3px rgba(0,0,0,0.6)', pointerEvents: 'none' }}>{b.yourField}</div>}

            {/* 右: END TURN。まわりの珠が自分のエナジー */}
            <div style={{ position: 'absolute', right: portrait ? ringR + 24 : ringR + 30, top: portrait ? SH - handPeek - 30 - leaderS / 2 : midY, width: 0, height: 0, zIndex: 6 }}>
                <div style={{ position: 'absolute', left: -(ringR + 16), top: -(ringR + 16), width: (ringR + 16) * 2, height: (ringR + 16) * 2, borderRadius: '50%', background: 'radial-gradient(circle, #2A1F08 0%, #4A3A14 70%, #2A1F08 100%)', border: '3px solid #D4AF37', boxShadow: '0 8px 22px rgba(0,0,0,0.6), inset 0 0 14px rgba(0,0,0,0.6)' }} />
                {Array.from({ length: ENERGY_MAX }).map((_, i) => {
                    const a = (i / ENERGY_MAX) * Math.PI * 2 - Math.PI / 2, on = i < me.energy, has = i < me.energyMax, o = Math.max(11, ringR * 0.23);
                    return <span key={`${i}-${on}`} style={{ position: 'absolute', left: Math.cos(a) * (ringR + 1) - o / 2, top: Math.sin(a) * (ringR + 1) - o / 2, width: o, height: o, borderRadius: '50%',
                        background: on ? 'radial-gradient(circle at 32% 28%, #fff, #6EE7B7 35%, #047857)' : has ? '#57534E' : '#1C1917', border: `1.5px solid ${has ? '#FFF2A8' : '#57534E'}`, boxShadow: on ? '0 0 9px 2px rgba(52,211,153,0.95)' : undefined, animation: on ? 'duel-orb .35s ease' : undefined }} />;
                })}
                <button data-act="end" disabled={!myTurn} onClick={() => perform({ type: 'end' })} style={{
                    position: 'absolute', left: -ringR * 0.72, top: -ringR * 0.72, width: ringR * 1.44, height: ringR * 1.44, borderRadius: '50%', border: '3px solid #FFF2A8', cursor: myTurn ? 'pointer' : 'default',
                    background: myTurn ? 'radial-gradient(circle at 35% 28%, #FFF2A8, #F6C85F 42%, #B8941E 100%)' : 'radial-gradient(circle at 35% 28%, #A8A29E, #57534E)',
                    color: '#fff', fontWeight: 900, fontSize: Math.max(9, ringR * 0.21), letterSpacing: 1, lineHeight: 1.1, textShadow: '0 1px 3px rgba(0,0,0,0.6)', fontFamily: 'Georgia, serif', padding: 0,
                    boxShadow: myTurn ? '0 0 20px 4px rgba(255,242,168,0.85), inset 0 -6px 12px rgba(0,0,0,0.25)' : 'inset 0 -6px 12px rgba(0,0,0,0.35)',
                    animation: idle ? 'duel-pulse 0.9s ease-in-out infinite' : undefined,
                }}>{myTurn ? <>{b.end1}<br />{b.end2}</> : <>{b.rv1}<br />{b.rv2}</>}</button>
                <Plaque style={{ position: 'absolute', left: -44, top: portrait ? -(ringR + 16) - 52 : ringR + 24, width: 88, textAlign: 'center', padding: '3px 0', lineHeight: 1.1 }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: '#6EE7B7' }}>{b.energy}</div>
                    <div style={{ fontSize: 20 }}>{me.energy}<span style={{ fontSize: 12, color: '#D4AF37' }}> / {me.energyMax}</span></div>
                </Plaque>
            </div>

            {net && (
                <div style={{ position: 'absolute', left: '50%', top: 6, transform: 'translateX(-50%)', zIndex: 8, fontSize: 10, fontWeight: 900, letterSpacing: 3, color: '#FFF2A8', background: net.status === 'error' ? 'linear-gradient(180deg, #B91C1C, #7F1D1D)' : 'linear-gradient(180deg, #1D4ED8, #1E3A8A)', border: '2px solid #FFF2A8', borderRadius: 999, padding: '2px 14px', whiteSpace: 'nowrap' }}>
                    {net.status === 'error' ? net.msg : `ONLINE ${net.code}`}
                </div>
            )}
            {/* 右上: 音と戻る */}
            <div style={{ position: 'absolute', right: 10, top: 10, display: 'flex', gap: 6, zIndex: 8 }}>
                <Plaque style={{ padding: 0 }}><button data-act="lang" onClick={() => { const l = lang === 'ja' ? 'en' : 'ja'; setLang(l); save(LANG_KEY, l); }} style={{ background: 'none', border: 'none', color: '#FFF2A8', fontSize: 10, fontWeight: 800, letterSpacing: 1, padding: '5px 9px', cursor: 'pointer' }}>{lang === 'ja' ? 'English' : '日本語'}</button></Plaque>
                <Plaque style={{ padding: 0 }}><button onClick={() => { soundRef.current = !sound; setSound(!sound); if (sound) { voiceEl?.pause(); try { window.speechSynthesis.cancel(); } catch { /* 無い端末 */ } } }} style={{ background: 'none', border: 'none', color: '#FFF2A8', fontSize: 10, fontWeight: 800, letterSpacing: 1, padding: '5px 9px', cursor: 'pointer' }}>{sound ? b.soundOn : b.soundOff}</button></Plaque>
                <Plaque style={{ padding: 0 }}><button onClick={() => { leaveNet(); gameRef.current = null; setGame(null); }} style={{ background: 'none', border: 'none', color: '#FFF2A8', fontSize: 10, fontWeight: 800, letterSpacing: 1, padding: '5px 9px', cursor: 'pointer' }}>{b.quit}</button></Plaque>
            </div>

            {/* 左: カードの拡大(マウスを乗せたか、選んだカード) */}
            {shown && !portrait && !inspect && (
                <div style={{ position: 'absolute', left: 12, top: midY, transform: 'translateY(-50%)', zIndex: 9, pointerEvents: 'none', filter: 'drop-shadow(0 14px 26px rgba(0,0,0,0.6))' }}>
                    <Card spec={shown} w={Math.round(Math.max(190, Math.min(SW * 0.2, (SH * 0.5) * CW / CH, 330)))} />
                    {/* 単語カード: 英文と訳を、カードの下に出す */}
                    {shown.word && (
                        <div style={{ marginTop: 12, width: Math.round(Math.max(190, Math.min(SW * 0.2, (SH * 0.5) * CW / CH, 330))), boxSizing: 'border-box', padding: '8px 10px', borderRadius: 10, background: 'rgba(10,8,30,0.86)', border: '1px solid rgba(246,200,95,0.7)' }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 14, lineHeight: 1.4, color: '#FFFDF2' }}>{shown.text}</div>
                            <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.88)' }}>{shown.lineJa}</div>
                        </div>
                    )}
                </div>
            )}

            {/* 自分: リーダー(手札の上)、枚数 */}
            <div style={{ position: 'absolute', left: '50%', bottom: portrait ? handPeek + 30 : handPeek + Math.round(leaderS * 0.3), transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: portrait ? 26 : Math.round(leaderS * 0.5), zIndex: 4 }}>
                <Plaque style={{ padding: '4px 12px', fontSize: 11, lineHeight: 1.5, letterSpacing: 1, fontFamily: 'inherit' }}>
                    <div>{b.deck} <b style={{ color: '#fff' }}>{me.deck.length}</b></div>
                    <div>{b.hand} <b style={{ color: '#fff' }}>{me.hand.length}</b></div>
                </Plaque>
                <Leader side={0} hp={me.hp} size={leaderS} hit={hits.includes('L0')} target={false} />
                <Plaque style={{ padding: '4px 12px', fontSize: 11, lineHeight: 1.5, letterSpacing: 1, fontFamily: 'inherit', visibility: portrait ? 'hidden' : undefined }}>
                    <div>{b.turn} <b style={{ color: '#fff' }}>{g.turn}</b></div>
                    <div><b style={{ color: '#fff' }}>{record.win}</b> {b.win} · <b style={{ color: '#fff' }}>{record.lose}</b> {b.lose}</div>
                </Plaque>
            </div>

            {/* 自分の手札: カードを切らずに全部見せる(本人 2026-11-27「手札が下に見切れてる」)。PC は押すと出す、スマホは押すと全画面で見てから出す */}
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: handPeek, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', zIndex: 7, pointerEvents: 'none' }}>
                {me.hand.map((c, i) => {
                    const ok = myTurn && canPlay(g, i);
                    return (
                        <div key={c.id} style={{ marginLeft: i ? handStep - handW : 0, animation: 'duel-draw .45s ease-out both', position: 'relative', zIndex: i, pointerEvents: 'auto' }}>
                            <div className={portrait ? undefined : 'duel-hand-card'} style={{ position: 'relative', ['--lift' as string]: '-16px' } as React.CSSProperties}>
                                <Card spec={c} w={handW} attrs={{ 'data-hand': i }} fx={ok ? 'playable' : myTurn ? 'dim' : undefined} onHover={portrait ? undefined : setPreview}
                                    onClick={portrait ? () => setInspect({ spec: c, hand: i }) : ok ? () => perform({ type: 'play', idx: i }) : undefined} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* カードを大きく見る(スマホの手札、押しても何も起きない駒)。暗い幕の上に、画面いっぱいの1枚 */}
            {inspect && (
                <div data-act="inspect" onClick={() => setInspect(null)} style={{ position: 'absolute', inset: 0, zIndex: 75, background: 'rgba(10,8,30,0.78)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22 }}>
                    <div style={{ animation: 'duel-win .28s ease-out both' }}>
                        <Card spec={inspect.spec} w={Math.round(Math.min(SW * 0.8, (SH * (inspect.spec.word ? 0.52 : 0.66)) * CW / CH, 440))} />
                    </div>
                    {inspect.spec.word && (
                        <div style={{ maxWidth: Math.min(SW * 0.9, 560), textAlign: 'center', marginTop: -6 }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 18, lineHeight: 1.4, color: '#FFFDF2', textShadow: '0 1px 3px #000' }}>{inspect.spec.text}</div>
                            <div style={{ marginTop: 4, fontSize: 14, lineHeight: 1.5, color: 'rgba(255,255,255,0.88)' }}>{inspect.spec.lineJa}</div>
                        </div>
                    )}
                    <div style={{ display: 'flex', gap: 12 }} onClick={e => e.stopPropagation()}>
                        {inspect.hand !== undefined && (
                            <button data-act="inspect-play" disabled={!(myTurn && canPlay(g, inspect.hand))} onClick={() => { const i = inspect.hand!; setInspect(null); perform({ type: 'play', idx: i }); }}
                                style={{ ...btn(true, !(myTurn && canPlay(g, inspect.hand))), fontSize: 18, padding: '14px 34px' }}>{myTurn && canPlay(g, inspect.hand) ? b.play : myTurn ? b.noEnergy : b.notTurn}</button>
                        )}
                        <button onClick={() => setInspect(null)} style={{ ...btn(false), fontSize: 18, padding: '14px 28px' }}>{b.back}</button>
                    </div>
                </div>
            )}

            {/* 案内(左下) */}
            <Plaque style={{ display: demo ? 'none' : undefined, position: 'absolute', ...(portrait ? { left: '50%', top: midY + rowGap / 2 + tokenH + 56, transform: 'translateX(-50%)', whiteSpace: 'nowrap', pointerEvents: 'none', opacity: 0.94 } : { left: 10, bottom: handPeek + 10, maxWidth: Math.min(280, SW * 0.3), whiteSpace: 'normal' as const }), padding: '6px 10px', fontSize: 11, fontWeight: 700, lineHeight: 1.45, fontFamily: 'inherit', zIndex: 4 }}>
                <div style={{ color: '#fff', fontSize: lang === 'ja' ? 12.5 : 11, whiteSpace: portrait && lang === 'ja' ? 'normal' : undefined, maxWidth: portrait ? SW - 150 : undefined }}>{(() => {
                    if (g.winner !== null) return b.hOver;
                    if (!myTurn) return b.hRival;
                    if (selUnit) return legal.leader ? b.hTarget : b.hWard;
                    if (idle) return b.hIdle;
                    const canP = me.hand.some((_, i) => canPlay(g, i)), canA = me.field.some(u => canAttack(g, u));
                    if (portrait) return canA ? b.hPhoneBoth : b.hPhonePlay;
                    return canP && canA ? b.hBoth : canP ? b.hPlay : b.hAttack;
                })()}</div>
                {!portrait && lang === 'en' && <div style={{ color: '#D4AF37', fontWeight: 400, marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.log[g.log.length - 1]}</div>}
            </Plaque>

            {/* デモ: 盤面は触れないようにして、説明の札を出す */}
            {demo && (
                <>
                    <div style={{ position: 'absolute', inset: 0, zIndex: 60 }} />
                    <div style={{ position: 'absolute', left: '50%', top: 10, transform: 'translateX(-50%)', zIndex: 81, fontSize: 11, fontWeight: 900, letterSpacing: 4, color: '#FFF2A8', background: 'linear-gradient(180deg, #9F1239, #4C0519)', border: '2px solid #FFF2A8', borderRadius: 999, padding: '3px 16px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>{b.howto}</div>
                    <div key={demo.n} style={{ position: 'absolute', left: 12, bottom: portrait ? handPeek + 30 + leaderS + 40 : handPeek + 12, width: portrait ? SW - 24 : Math.min(440, SW * 0.44), zIndex: 81, background: 'linear-gradient(180deg, #FFFDF7, #FEF3C7)', border: '3px solid #D4AF37', borderRadius: 14, boxShadow: '0 12px 30px rgba(0,0,0,0.55), inset 0 0 0 1px #fff', padding: '12px 14px 10px', animation: 'duel-cap .35s ease-out' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                            <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: 2, color: '#fff', background: '#B8941E', borderRadius: 999, padding: '1px 9px' }}>{demo.n} / {demo.total}</span>
                            <div style={{ flex: 1, height: 4, borderRadius: 2, background: '#E7E5E4', overflow: 'hidden' }}><div style={{ width: `${(demo.n / demo.total) * 100}%`, height: '100%', background: '#10B981', transition: 'width .4s ease' }} /></div>
                        </div>
                        <div style={{ fontSize: Math.max(15, Math.min(20, SW / 52)), fontWeight: 800, lineHeight: 1.4, color: INK }}>{lang === 'ja' ? DEMO_JA[demo.n - 1] : demo.cap}</div>
                        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                            <button data-act="demo-skip" onClick={stopDemo} style={{ ...btn(true), fontSize: 12, padding: '7px 16px' }}>{b.skip}</button>
                            <button onClick={runDemo} style={{ ...btn(false), fontSize: 12, padding: '7px 16px' }}>{b.restart}</button>
                        </div>
                    </div>
                </>
            )}

            {/* ターンの帯 */}
            {banner && (
                <div style={{ position: 'absolute', left: -60, right: -60, top: midY - 48, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 30,
                    background: banner.startsWith('YOUR') ? 'linear-gradient(90deg, transparent, rgba(4,120,87,0.94) 22%, rgba(4,120,87,0.94) 78%, transparent)' : 'linear-gradient(90deg, transparent, rgba(159,18,57,0.94) 22%, rgba(159,18,57,0.94) 78%, transparent)',
                    borderTop: '3px solid #FFF2A8', borderBottom: '3px solid #FFF2A8', animation: 'duel-banner 1.25s ease-in-out forwards' }}>
                    <span style={{ fontSize: Math.min(60, SW / 11), fontWeight: 900, letterSpacing: 12, color: '#fff', fontFamily: 'Georgia, serif', textShadow: '0 3px 0 rgba(0,0,0,0.4), 0 0 26px rgba(255,242,168,0.95)' }}>{banner.startsWith('YOUR') ? b.yourTurn : b.rivalTurn}</span>
                </div>
            )}

            {/* 決着。白く飛ばさず、盤面を暗く落として、上下の帯・光・1字ずつの題・数え上げる数字を順に出す(本人 2026-11-27「しょぼすぎ」で作り直し) */}
            {g.winner !== null && (() => {
                const win = g.winner === 0;
                const title = win ? 'VICTORY' : 'DEFEAT';
                const tone = win ? { a: '#FFF6C8', b: '#F6C85F', c: '#8C6D0F', glow: 'rgba(246,200,95,0.9)', veil: 'rgba(28,18,4,0.72)' } : { a: '#E5E7EB', b: '#94A3B8', c: '#334155', glow: 'rgba(148,163,184,0.7)', veil: 'rgba(8,12,24,0.8)' };
                const fs0 = Math.min(150, SW / 5.6);
                const tile = (label: string, value: number, suffix: string, delay: number) => (
                    <div style={{ minWidth: Math.min(170, SW / 3.6), padding: '10px 18px', textAlign: 'center', borderTop: `1px solid ${tone.b}`, borderBottom: `1px solid ${tone.b}`, background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))', animation: `duel-fadeup .6s ease-out ${delay}s both` }}>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: 4, color: tone.b }}>{label}</div>
                        <div style={{ fontSize: Math.min(40, SW / 14), fontWeight: 900, fontFamily: 'Georgia, serif', color: '#fff', lineHeight: 1.15 }}><CountUp to={value} delay={delay * 1000 + 200} />{suffix}</div>
                    </div>
                );
                return (
                    <div data-result={title} style={{ position: 'absolute', inset: 0, zIndex: 40, overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        background: `radial-gradient(ellipse 70% 60% at 50% 46%, rgba(0,0,0,0) 0%, ${tone.veil} 78%)`, backdropFilter: `blur(5px) saturate(${win ? 0.85 : 0.25}) brightness(0.62)`, WebkitBackdropFilter: `blur(5px) saturate(${win ? 0.85 : 0.25}) brightness(0.62)`, animation: 'duel-veil .7s ease-out both' }}>
                        {/* 上からの光 */}
                        <div style={{ position: 'absolute', left: '50%', top: '-60%', width: SW * 1.6, height: SH * 2, marginLeft: -SW * 0.8, pointerEvents: 'none', opacity: win ? 0.55 : 0.22, mixBlendMode: 'screen',
                            background: `repeating-conic-gradient(from 150deg at 50% 0%, ${tone.glow} 0deg 2.200deg, rgba(0,0,0,0) 2.200deg 7deg)`, maskImage: 'radial-gradient(ellipse 50% 60% at 50% 0%, #000 0%, transparent 72%)', WebkitMaskImage: 'radial-gradient(ellipse 50% 60% at 50% 0%, #000 0%, transparent 72%)', animation: 'duel-sway 9s ease-in-out infinite alternate' }} />
                        {/* 舞う粒(勝ちは金が昇る、負けは灰が降る) */}
                        {Array.from({ length: 44 }).map((_, i) => {
                            const x = (i * 61) % 100, size = 2 + (i % 4), dur = 4 + (i % 5), delay = -((i * 0.37) % 5);
                            return <span key={i} style={{ position: 'absolute', left: `${x}%`, [win ? 'bottom' : 'top']: -10, width: size, height: size, borderRadius: '50%', background: i % 3 ? tone.b : '#fff', boxShadow: `0 0 ${size * 3}px ${tone.glow}`, opacity: 0, pointerEvents: 'none',
                                ['--dx' as string]: `${((i * 29) % 80) - 40}px`, ['--dy' as string]: `${(win ? -1 : 1) * SH * 1.05}px`, animation: `duel-mote ${dur}s linear ${delay}s infinite` } as React.CSSProperties} />;
                        })}
                        {/* 映画の帯 */}
                        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: SH * 0.1, background: '#07060C', animation: 'duel-bar-top .7s cubic-bezier(.2,.8,.2,1) both' }} />
                        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: SH * 0.1, background: '#07060C', animation: 'duel-bar-bottom .7s cubic-bezier(.2,.8,.2,1) both' }} />

                        {/* 勝った側の顔 */}
                        <div style={{ position: 'relative', width: Math.min(120, SH * 0.14), height: Math.min(120, SH * 0.14), borderRadius: '50%', padding: 4, background: `conic-gradient(${tone.c}, ${tone.a}, ${tone.b}, ${tone.c}, ${tone.a}, ${tone.b}, ${tone.c})`, boxShadow: `0 0 40px 6px ${tone.glow}`, animation: 'duel-crest .9s cubic-bezier(.2,1.5,.4,1) .25s both' }}>
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#14101F' }}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                {ART[win ? 'leader-you' : 'leader-rival'] && <img src={ART[win ? 'leader-you' : 'leader-rival']} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: win ? undefined : 'saturate(0.6)' }} />}
                            </div>
                        </div>

                        {/* 題: 1字ずつ */}
                        <div style={{ position: 'relative', marginTop: 10, display: 'flex', fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 900, fontSize: fs0, lineHeight: 1, letterSpacing: fs0 * 0.06 }}>
                            {title.split('').map((ch, i) => (
                                <span key={i} style={{ display: 'inline-block', background: `linear-gradient(180deg, ${tone.a} 0%, ${tone.b} 46%, ${tone.c} 54%, ${tone.b} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: `drop-shadow(0 3px 0 rgba(0,0,0,0.55)) drop-shadow(0 0 22px ${tone.glow})`, animation: `duel-letter .7s cubic-bezier(.2,1.3,.3,1) ${0.55 + i * 0.07}s both` }}>{ch}</span>
                            ))}
                        </div>
                        <div style={{ position: 'relative', width: Math.min(560, SW * 0.7), height: 2, marginTop: 10, background: `linear-gradient(90deg, transparent, ${tone.a}, transparent)`, boxShadow: `0 0 12px ${tone.glow}`, animation: 'duel-line .8s ease-out 1.15s both' }} />
                        <div style={{ position: 'relative', marginTop: 8, fontSize: Math.max(11, Math.min(15, SW / 60)), fontWeight: 700, letterSpacing: 6, color: tone.a, animation: 'duel-fadeup .6s ease-out 1.3s both' }}>{win ? b.winSub : b.loseSub}</div>

                        <div style={{ position: 'relative', display: 'flex', gap: Math.min(26, SW / 40), marginTop: 22 }}>
                            {tile(b.tLeader, me.hp, lang === 'ja' ? '' : ' HP', 1.5)}
                            {tile(b.tTurns, g.turn, '', 1.65)}
                            {tile(b.tRecord, record.win, ` ${b.win} · ${record.lose} ${b.lose}`, 1.8)}
                        </div>

                        <div style={{ position: 'relative', marginTop: 26, display: 'flex', gap: 12, alignItems: 'center', animation: 'duel-fadeup .6s ease-out 2.2s both' }}>
                            {net?.role === 'guest' ? <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{b.guestAgain}</span> : (
                                <>
                                    <button style={{ ...btn(false), background: 'rgba(255,255,255,0.08)', color: '#fff', border: `1px solid ${tone.b}` }} onClick={() => { leaveNet(); gameRef.current = null; setGame(null); }}>{b.home}</button>
                                    {pack && !verdict && checkCards().length > 0 && <button data-act="check" style={{ ...btn(true), fontSize: 16, padding: '13px 26px' }} onClick={() => setQuiz(checkCards())}>{lang === 'ja' ? '確認テスト' : 'CHECK'}</button>}
                                    {pack && seen.current.size > 0 && <button data-act="review" style={{ ...btn(false), background: 'rgba(255,255,255,0.08)', color: '#fff', border: `1px solid ${tone.b}` }} onClick={() => setReview(true)}>{b.words} · {seen.current.size}</button>}
                                    {!net && <button data-act="rematch" style={{ ...btn(true), fontSize: 16, padding: '13px 34px' }} onClick={start}>{b.rematch}</button>}
                                </>
                            )}
                        </div>
                    </div>
                );
            })()}

            {/* この対戦で出た単語。意味は隠してあり、押すと出る(思い出せるかを自分で確かめる) */}
            {review && (
                <div data-act="review-list" style={{ position: 'absolute', inset: 0, zIndex: 60, background: 'rgba(8,6,2,0.94)', overflowY: 'auto', padding: '18px 16px 40px' }}>
                    <div style={{ maxWidth: 760, margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 24, letterSpacing: 2, color: '#F6C85F' }}>{b.reviewTitle}</div>
                            <button onClick={() => setReview(false)} style={{ ...btn(false), marginLeft: 'auto' }}>{b.back}</button>
                        </div>
                        <div style={{ marginTop: 4, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{b.reviewHelp}</div>
                        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {[...seen.current.values()].map(c => (
                                <div key={c.id} onClick={() => setShownJa(x => ({ ...x, [c.id]: !x[c.id] }))} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: 10, borderRadius: 12, cursor: 'pointer', background: 'linear-gradient(180deg, rgba(42,31,8,0.86), rgba(20,14,4,0.92))', border: '1.5px solid #D4AF37' }}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {ART[`card-${c.id}`] && <img src={ART[`card-${c.id}`]} alt="" style={{ width: 64, height: 90, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }} />}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                                            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 24, color: '#FFF6C8' }}>{c.word}</span>
                                            <span style={{ fontSize: 15, fontWeight: 800, color: shownJa[c.id] ? '#fff' : 'rgba(255,255,255,0.4)' }}>{shownJa[c.id] ? c.ja : b.tapMeaning}</span>
                                        </div>
                                        <div style={{ marginTop: 3, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 15, lineHeight: 1.4, color: '#FFFDF2' }}>{c.text}</div>
                                        {shownJa[c.id] && <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>{c.lineJa}</div>}
                                    </div>
                                    <button onClick={e => { e.stopPropagation(); speakLine(c.text, c.id); }} style={{ ...btn(false), flexShrink: 0 }}>▶</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 対戦のあとの確認テスト */}
            {quiz && pool && (
                <Quiz title={lang === 'ja' ? '確認テスト' : 'Check'} sub={lang === 'ja' ? `この対戦で出た語から ${quiz.length} 問。別の日に ${HALL_NEED} 回正解した語は殿堂入りする。` : `${quiz.length} words from this duel. ${HALL_NEED} correct answers on different days put a word in the Hall.`} cards={quiz} pool={pool} onClose={() => setQuiz(null)}
                    onDone={res => {
                        const before = prog;
                        const after = applyAnswers(before, res, pool);
                        updateProg(pr => applyAnswers(pr, res, pool));
                        setVerdict({ score: Object.values(res).filter(Boolean).length, n: quiz.length, fresh: quiz.filter(c => !inHall(before, c.id) && inHall(after, c.id)), boss: bossRef.current });
                        setQuiz(null);
                        if (quiz.some(c => !inHall(before, c.id) && inHall(after, c.id))) playSfx('win');
                    }} />
            )}
            {/* その結果: 何問当たったか、殿堂入りした語 */}
            {verdict && (
                <div data-verdict style={{ position: 'absolute', inset: 0, zIndex: 88, background: 'rgba(8,6,2,0.95)', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
                    <div style={{ maxWidth: 560, width: '100%', textAlign: 'center', color: '#fff' }}>
                        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 3, color: '#F6C85F' }}>{lang === 'ja' ? '確認テストの結果' : 'CHECK RESULT'}</div>
                        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 64, lineHeight: 1.1, color: '#FFF6C8' }}>{verdict.score} <span style={{ fontSize: 30, color: '#D4AF37' }}>/ {verdict.n}</span></div>
                        {verdict.fresh.length > 0 ? (
                            <>
                                <div style={{ marginTop: 10, fontFamily: 'Georgia, serif', fontWeight: 900, fontSize: 30, color: '#F6C85F', textShadow: '0 0 20px rgba(246,200,95,0.8)' }}>{lang === 'ja' ? `殿堂入り ${verdict.fresh.length} 語` : `${verdict.fresh.length} into the Hall`}</div>
                                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 14 }}>{verdict.fresh.map(c => <Card key={c.id} spec={c} w={110} noCost />)}</div>
                                <div style={{ marginTop: 12, fontSize: 14, lineHeight: 1.7 }}>{lang === 'ja' ? `勇者のレベルが ${verdict.fresh.length} 上がった。空いた枠には、次の語が入る。` : 'Your level went up. New words take the empty slots.'}</div>
                            </>
                        ) : (
                            <div style={{ marginTop: 12, fontSize: 15, lineHeight: 1.8 }}>{lang === 'ja' ? `正解した語は、殿堂入りに1歩近づいた。別の日にもう一度正解すると殿堂入りする(同じ日に何度当てても1回ぶん)。まちがえた語は数え直し。` : 'Correct words moved one step closer. Answer them again on another day to put them in the Hall. Wrong ones start over.'}</div>
                        )}
                        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' }}>
                            <button onClick={() => { setVerdict(null); leaveNet(); gameRef.current = null; setGame(null); setPlacedMsg(null); setView('story'); }} style={{ ...btn(false), background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid #D4AF37' }}>{lang === 'ja' ? '冒険と殿堂を見る' : 'Journey & Hall'}</button>
                            <button data-act="again" onClick={() => begin(null)} style={{ ...btn(true), fontSize: 16, padding: '13px 30px' }}>{b.rematch}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 演出の層 */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 70 }}>
                {selUnit && aim && (() => {
                    const from = center(`[data-u="${selUnit.uid}"]`);
                    if (!from) return null;
                    const dx = aim.x - from.x, dy = aim.y - from.y, len = Math.hypot(dx, dy);
                    if (len < tokenW * 0.6) return null;
                    // 弧: 中点を、進む向きの左へ持ち上げた2次曲線
                    const bow = Math.min(90, len * 0.22) * (dx >= 0 ? 1 : -1);
                    const cx = (from.x + aim.x) / 2 + (dy / len) * bow, cy = (from.y + aim.y) / 2 - (dx / len) * bow;
                    const n = Math.max(4, Math.round(len / 30));
                    const at = (t: number) => {
                        const u = 1 - t;
                        return { x: u * u * from.x + 2 * u * t * cx + t * t * aim.x, y: u * u * from.y + 2 * u * t * cy + t * t * aim.y,
                            a: Math.atan2(2 * u * (cy - from.y) + 2 * t * (aim.y - cy), 2 * u * (cx - from.x) + 2 * t * (aim.x - cx)) * 180 / Math.PI };
                    };
                    const tip = at(1);
                    return (
                        <svg width={SW} height={SH} style={{ position: 'absolute', inset: 0, filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.55))' }}>
                            {Array.from({ length: n }).map((_, i) => {
                                const t = 0.12 + (i / n) * 0.8, q = at(t), k = 0.7 + t * 0.9;
                                return <polygon key={i} points="-10,-11 5,0 -10,11 -4,0" transform={`translate(${q.x} ${q.y}) rotate(${q.a}) scale(${k})`}
                                    fill={`hsl(${Math.round(46 - t * 46)} 96% ${Math.round(66 - t * 12)}%)`} stroke="#fff" strokeWidth={1.2 / k} strokeLinejoin="round"
                                    style={{ animation: `duel-chev .9s ease-in-out ${i * 0.07}s infinite` }} />;
                            })}
                            <g transform={`translate(${tip.x} ${tip.y})`}>
                                <circle r="30" fill="rgba(239,68,68,0.18)" stroke="#fff" strokeWidth="2" />
                                <g>
                                    <circle r="23" fill="none" stroke="#EF4444" strokeWidth="4" strokeDasharray="18 18" />
                                    <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.4s" repeatCount="indefinite" />
                                </g>
                                <polygon points="-12,-13 16,0 -12,13 -5,0" fill="#EF4444" stroke="#fff" strokeWidth="2" strokeLinejoin="round" transform={`rotate(${tip.a})`} />
                            </g>
                        </svg>
                    );
                })()}
                {ptr && (
                    <div style={{ position: 'absolute', left: ptr.x, top: ptr.y, transition: 'left .55s cubic-bezier(.3,.8,.3,1), top .55s cubic-bezier(.3,.8,.3,1)', zIndex: 5 }}>
                        <div style={{ position: 'absolute', left: -30, top: -30, width: 60, height: 60, borderRadius: '50%', border: '3px solid #FFF2A8', animation: 'duel-ping 1s ease-out infinite' }} />
                        <svg width="46" height="46" viewBox="0 0 24 24" style={{ position: 'absolute', left: -6, top: -4, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.6))' }}>
                            <path d="M5 2l14 9-6 1.500 3.500 7-3 1.500-3.500-7-5 4z" fill="#fff" stroke="#1C1917" strokeWidth="1.500" strokeLinejoin="round" />
                        </svg>
                    </div>
                )}
                {reveal && (
                    <div key={reveal.id} style={{ position: 'absolute', left: '50%', top: midY, animation: `duel-reveal ${reveal.ms}ms ease-out forwards`, filter: `drop-shadow(0 0 30px ${reveal.side === 0 ? 'rgba(110,231,183,0.95)' : 'rgba(253,164,175,0.95)'}) drop-shadow(0 18px 30px rgba(0,0,0,0.6))` }}>
                        <Card spec={reveal.spec} chant w={Math.round(Math.max(190, Math.min(SW * 0.3, SH * 0.42, 320)))} />
                        {reveal.spec.lineJa && <div style={{ position: 'absolute', left: '50%', top: '100%', transform: 'translateX(-50%)', marginTop: 10, width: Math.min(SW * 0.86, 460), textAlign: 'center', fontSize: 15, fontWeight: 700, lineHeight: 1.5, color: '#fff', background: 'rgba(10,8,30,0.82)', border: '1px solid rgba(246,200,95,0.7)', borderRadius: 10, padding: '7px 12px' }}>{reveal.spec.lineJa}</div>}
                    </div>
                )}
                {ghosts.map(x => (
                    <div key={x.id} style={{ position: 'absolute', left: x.x - x.w / 2, top: x.y - (x.w * 1.24) / 2, animation: 'duel-die .7s ease-in forwards' }}>
                        <Token spec={x.spec} w={x.w} atk={x.spec.atk} hp={0} />
                    </div>
                ))}
                {bursts.map(b => (
                    <div key={b.id} style={{ position: 'absolute', left: b.x, top: b.y }}>
                        <div style={{ position: 'absolute', width: 150, height: 150, borderRadius: '50%', background: 'radial-gradient(circle, #fff 0%, #FDE68A 35%, rgba(251,146,60,0.6) 60%, transparent 72%)', animation: 'duel-flash .45s ease-out forwards' }} />
                        {Array.from({ length: 16 }).map((_, i) => {
                            const a = (i / 16) * Math.PI * 2 + b.id, d = 70 + ((i * 37) % 70);
                            return <span key={i} style={{ position: 'absolute', width: i % 3 ? 7 : 13, height: i % 3 ? 7 : 13, marginLeft: -4, marginTop: -4, borderRadius: i % 2 ? '50%' : 2, background: i % 2 ? '#fff' : b.color, boxShadow: '0 0 8px #FDE68A',
                                ['--dx' as string]: `${Math.cos(a) * d}px`, ['--dy' as string]: `${Math.sin(a) * d}px`, animation: 'duel-spark .55s ease-out forwards' } as React.CSSProperties} />;
                        })}
                    </div>
                ))}
                {pops.map(p => (
                    <div key={p.id} style={{ position: 'absolute', left: p.x, top: p.y, fontSize: Math.max(34, tokenW * 0.5), fontWeight: 900, fontFamily: 'Georgia, serif', color: p.color, WebkitTextStroke: '2px #fff', textShadow: '0 4px 10px rgba(0,0,0,0.6)', animation: 'duel-pop .9s ease-out forwards', whiteSpace: 'nowrap' }}>{p.text}</div>
                ))}
            </div>
        </div>,
        document.body,
    );
}
