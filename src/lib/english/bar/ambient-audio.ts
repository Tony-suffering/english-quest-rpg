'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type Phase = 'early' | 'peak' | 'late' | 'closing' | 'idle';

const STORAGE_KEY = 'tonio-bar-audio';

// Phase -> master gain multiplier. Closing near silent; peak loudest.
const PHASE_GAIN: Record<Phase, number> = {
  idle: 0.25,
  early: 0.45,
  peak: 0.6,
  late: 0.3,
  closing: 0.08,
};

// ---- Singleton AudioContext (lazy) ----
let _ctx: AudioContext | null = null;
function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (_ctx && _ctx.state !== 'closed') return _ctx;
  const Ctor =
    (window as unknown as { AudioContext?: typeof AudioContext }).AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  _ctx = new Ctor();
  return _ctx;
}

function isEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'on';
  } catch {
    return false;
  }
}

function phaseMult(): number {
  if (typeof window === 'undefined') return PHASE_GAIN.idle;
  try {
    const p = window.localStorage.getItem('tonio-bar-phase') as Phase | null;
    if (p && p in PHASE_GAIN) return PHASE_GAIN[p];
  } catch { /* ignore */ }
  return PHASE_GAIN.idle;
}

async function resumeCtx(ctx: AudioContext) {
  if (ctx.state === 'suspended') {
    try { await ctx.resume(); } catch { /* ignore */ }
  }
}

// ---- Noise buffers (cached) ----
let _brownBuf: AudioBuffer | null = null;
function brownNoise(ctx: AudioContext): AudioBuffer {
  if (_brownBuf) return _brownBuf;
  const len = ctx.sampleRate * 3;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  _brownBuf = buf;
  return buf;
}

let _pinkBuf: AudioBuffer | null = null;
function pinkNoise(ctx: AudioContext): AudioBuffer {
  if (_pinkBuf) return _pinkBuf;
  const len = ctx.sampleRate;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + w * 0.0555179;
    b1 = 0.99332 * b1 + w * 0.0750759;
    b2 = 0.96900 * b2 + w * 0.1538520;
    b3 = 0.86650 * b3 + w * 0.3104856;
    b4 = 0.55000 * b4 + w * 0.5329522;
    b5 = -0.7616 * b5 - w * 0.0168980;
    d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
    b6 = w * 0.115926;
  }
  _pinkBuf = buf;
  return buf;
}

let _whiteBuf: AudioBuffer | null = null;
function whiteNoise(ctx: AudioContext): AudioBuffer {
  if (_whiteBuf) return _whiteBuf;
  const buf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  _whiteBuf = buf;
  return buf;
}

// ---- One-shot sound primitives ----
function envGain(ctx: AudioContext, peak: number, attack: number, release: number) {
  const g = ctx.createGain();
  const now = ctx.currentTime;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), now + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, now + attack + release);
  return g;
}

function percGain(ctx: AudioContext, at: number, peak: number, attack: number, release: number) {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), at + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, at + attack + release);
  return g;
}

function mkBP(ctx: AudioContext, f: number, q: number) {
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.frequency.value = f;
  bp.Q.value = q;
  return bp;
}

function clink(ctx: AudioContext, vol = 0.18) {
  const now = ctx.currentTime;
  const freqs = [2400, 3600];
  freqs.forEach((f, i) => {
    const o = ctx.createOscillator();
    o.type = 'triangle';
    o.frequency.setValueAtTime(f + i * 40, now);
    const g = envGain(ctx, vol * (i === 0 ? 1 : 0.6), 0.004, 0.22);
    o.connect(g).connect(ctx.destination);
    o.start(now);
    o.stop(now + 0.3);
  });
}

function chime(ctx: AudioContext, vol = 0.14) {
  const now = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(880, now);
  const g = envGain(ctx, vol, 0.02, 0.45);
  o.connect(g).connect(ctx.destination);
  o.start(now);
  o.stop(now + 0.5);
}

function stingDown(ctx: AudioContext, vol = 0.16) {
  const now = ctx.currentTime;
  const o = ctx.createOscillator();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(420, now);
  o.frequency.exponentialRampToValueAtTime(110, now + 0.28);
  const g = envGain(ctx, vol, 0.005, 0.3);
  const lp = ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 1200;
  o.connect(lp).connect(g).connect(ctx.destination);
  o.start(now);
  o.stop(now + 0.35);
}

// One soft footstep thud. Low sine + short noise click attack.
function footstep(ctx: AudioContext, at: number, fundamental: number, vol: number) {
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(fundamental * 1.8, at);
  o.frequency.exponentialRampToValueAtTime(fundamental, at + 0.08);
  o.connect(percGain(ctx, at, vol, 0.006, 0.154)).connect(ctx.destination);
  o.start(at); o.stop(at + 0.2);

  const src = ctx.createBufferSource();
  src.buffer = whiteNoise(ctx);
  src.connect(mkBP(ctx, 1800, 1.2)).connect(percGain(ctx, at, vol * 0.5, 0.002, 0.048)).connect(ctx.destination);
  src.start(at); src.stop(at + 0.08);
}

function footsteps(ctx: AudioContext, direction: 'enter' | 'exit', vol = 0.12) {
  const now = ctx.currentTime;
  const steps = 4;
  // Enter: slight accelerando (intervals shrink). Exit: slight ritardando.
  const baseGap = 0.18;
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1); // 0..1
    const curve = direction === 'enter' ? 1 - t * 0.35 : 1 + t * 0.4;
    const at = now + i * baseGap * curve;
    const fundamental = 80 + Math.random() * 40; // 80-120Hz
    const stepVol = vol * (direction === 'enter' ? 0.7 + t * 0.3 : 1.0 - t * 0.35);
    footstep(ctx, at, fundamental, stepVol);
  }
}

function norenFlap(ctx: AudioContext, vol = 0.1) {
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = pinkNoise(ctx);
  src.playbackRate.setValueAtTime(1.0, now);
  src.playbackRate.linearRampToValueAtTime(0.75, now + 0.28);
  const bp = mkBP(ctx, 1400, 0.9);
  bp.frequency.exponentialRampToValueAtTime(700, now + 0.28);
  src.connect(bp).connect(percGain(ctx, now, vol, 0.03, 0.25)).connect(ctx.destination);
  src.start(now); src.stop(now + 0.32);
}

function iceDrop(ctx: AudioContext, vol = 0.14) {
  const now = ctx.currentTime;
  // Click: narrow bandpass noise burst around 3kHz
  const src = ctx.createBufferSource();
  src.buffer = whiteNoise(ctx);
  src.connect(mkBP(ctx, 3000, 6)).connect(percGain(ctx, now, vol, 0.002, 0.038)).connect(ctx.destination);
  src.start(now); src.stop(now + 0.05);

  // Reverb-like tail: short feedback delay on a softer high partial
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(2600, now);
  o.frequency.exponentialRampToValueAtTime(2200, now + 0.18);
  const og = percGain(ctx, now + 0.01, vol * 0.35, 0.01, 0.26);
  const dly = ctx.createDelay(0.25); dly.delayTime.value = 0.06;
  const fb = ctx.createGain(); fb.gain.value = 0.35;
  o.connect(og); og.connect(ctx.destination);
  og.connect(dly); dly.connect(fb).connect(dly); dly.connect(ctx.destination);
  o.start(now + 0.005); o.stop(now + 0.3);
}

function paperCrumple(ctx: AudioContext, vol = 0.1) {
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = pinkNoise(ctx);
  src.loop = true;
  const bp = mkBP(ctx, 2200, 8);
  bp.frequency.linearRampToValueAtTime(3400, now + 0.12);
  bp.frequency.linearRampToValueAtTime(1800, now + 0.3);
  // Crumpled envelope: stuttering via small gain wobble
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(vol, now + 0.01);
  g.gain.linearRampToValueAtTime(vol * 0.4, now + 0.08);
  g.gain.linearRampToValueAtTime(vol * 0.85, now + 0.14);
  g.gain.linearRampToValueAtTime(vol * 0.3, now + 0.22);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
  src.connect(bp).connect(g).connect(ctx.destination);
  src.start(now); src.stop(now + 0.34);
}

function glassSet(ctx: AudioContext, vol = 0.12) {
  const now = ctx.currentTime;
  // Low thud (wood contact)
  const o = ctx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(180, now);
  o.frequency.exponentialRampToValueAtTime(90, now + 0.1);
  o.connect(percGain(ctx, now, vol, 0.004, 0.136)).connect(ctx.destination);
  o.start(now); o.stop(now + 0.16);

  // Higher tick (glass rim settle)
  const t = ctx.createOscillator();
  t.type = 'triangle';
  t.frequency.setValueAtTime(2100, now + 0.01);
  t.connect(percGain(ctx, now + 0.01, vol * 0.35, 0.004, 0.076)).connect(ctx.destination);
  t.start(now + 0.01); t.stop(now + 0.12);
}

function gondoCough(ctx: AudioContext, vol = 0.12) {
  const now = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = whiteNoise(ctx);
  // Two formant bandpasses for dry vocal cough character
  const sum = ctx.createGain(); sum.gain.value = 1;
  src.connect(mkBP(ctx, 500, 5)).connect(sum);
  src.connect(mkBP(ctx, 1200, 4)).connect(sum);
  // Cough envelope: fast burst, quick fall, tiny tail
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(vol, now + 0.012);
  g.gain.exponentialRampToValueAtTime(vol * 0.35, now + 0.05);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  sum.connect(g).connect(ctx.destination);
  src.start(now); src.stop(now + 0.22);
}

// ---- Public one-shots (respect toggle + phase gain) ----
function fire(play: (ctx: AudioContext, vol: number) => void, base: number, floor = 0.04) {
  if (!isEnabled()) return;
  const ctx = getCtx();
  if (!ctx) return;
  void resumeCtx(ctx).then(() => play(ctx, base * phaseMult() + floor));
}

export const playClink = () => fire(clink, 0.18);
export const playSoftChime = () => fire(chime, 0.14);
export const playStingDown = () => fire(stingDown, 0.16);
export const playNorenFlap = () => fire(norenFlap, 0.1, 0.03);
export const playIceDrop = () => fire(iceDrop, 0.14);
export const playPaperCrumple = () => fire(paperCrumple, 0.1, 0.03);
export const playGlassSet = () => fire(glassSet, 0.12);
export const playGondoCough = () => fire(gondoCough, 0.12);

export function playFootsteps(direction: 'enter' | 'exit' = 'enter') {
  if (!isEnabled()) return;
  const ctx = getCtx();
  if (!ctx) return;
  void resumeCtx(ctx).then(() => footsteps(ctx, direction, 0.12 * phaseMult() + 0.04));
}

// ---- Ambient loop hook ----
export function useAmbientAudio({ enabled, phase }: { enabled: boolean; phase: Phase }) {
  const nodesRef = useRef<{
    src: AudioBufferSourceNode;
    master: GainNode;
    lp: BiquadFilterNode;
  } | null>(null);
  const clinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const eventTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPhase = useRef<Phase | null>(null);

  // Persist phase so one-shot plays outside the hook can read gain multiplier
  useEffect(() => {
    try {
      window.localStorage.setItem('tonio-bar-phase', phase);
    } catch {
      /* ignore */
    }
  }, [phase]);

  // Start/stop ambient bed
  useEffect(() => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx) return;

    let cancelled = false;
    void resumeCtx(ctx).then(() => {
      if (cancelled) return;
      const src = ctx.createBufferSource();
      src.buffer = brownNoise(ctx);
      src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.value = 380;
      const master = ctx.createGain();
      master.gain.value = 0.0001;
      src.connect(lp).connect(master).connect(ctx.destination);
      src.start();
      master.gain.exponentialRampToValueAtTime(PHASE_GAIN[phase] * 0.12, ctx.currentTime + 0.8);
      nodesRef.current = { src, master, lp };
    });

    return () => {
      cancelled = true;
      const n = nodesRef.current;
      if (n) {
        try {
          n.master.gain.cancelScheduledValues(ctx.currentTime);
          n.master.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
          setTimeout(() => {
            try {
              n.src.stop();
            } catch {
              /* ignore */
            }
          }, 350);
        } catch {
          /* ignore */
        }
        nodesRef.current = null;
      }
    };
  }, [enabled, phase]);

  // Phase change → mix + door chime
  useEffect(() => {
    const n = nodesRef.current;
    const ctx = getCtx();
    if (!enabled || !n || !ctx) {
      lastPhase.current = phase;
      return;
    }
    const target = PHASE_GAIN[phase] * 0.12;
    n.master.gain.cancelScheduledValues(ctx.currentTime);
    n.master.gain.exponentialRampToValueAtTime(Math.max(target, 0.0002), ctx.currentTime + 1.2);
    if (lastPhase.current && lastPhase.current !== phase) {
      chime(ctx, 0.08);
    }
    lastPhase.current = phase;
  }, [phase, enabled]);

  // Random glass clinks (always on, all phases)
  useEffect(() => {
    if (!enabled) return;
    const ctx = getCtx();
    if (!ctx) return;
    const schedule = () => {
      const delay = 15000 + Math.random() * 15000;
      clinkTimer.current = setTimeout(() => {
        clink(ctx, 0.07 * PHASE_GAIN[phase]);
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      if (clinkTimer.current) clearTimeout(clinkTimer.current);
      clinkTimer.current = null;
    };
  }, [enabled, phase]);

  // Random ambient events (ice drop / glass set) — peak & late only, 30-60s cadence
  useEffect(() => {
    if (!enabled) return;
    if (phase !== 'peak' && phase !== 'late') return;
    const ctx = getCtx();
    if (!ctx) return;
    const schedule = () => {
      const delay = 30000 + Math.random() * 30000;
      eventTimer.current = setTimeout(() => {
        const gain = PHASE_GAIN[phase];
        const roll = Math.random();
        if (roll < 0.5) {
          iceDrop(ctx, 0.1 * gain + 0.03);
        } else {
          glassSet(ctx, 0.09 * gain + 0.03);
        }
        schedule();
      }, delay);
    };
    schedule();
    return () => {
      if (eventTimer.current) clearTimeout(eventTimer.current);
      eventTimer.current = null;
    };
  }, [enabled, phase]);
}

// ---- Toggle hook ----
export function useAudioToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isEnabled());
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
      } catch {
        /* ignore */
      }
      if (next) {
        const ctx = getCtx();
        if (ctx) void resumeCtx(ctx);
      }
      return next;
    });
  }, []);

  return { enabled, toggle };
}
