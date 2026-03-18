// Training page sound effects — extracted from training/page.tsx
// All Web Audio API synthesized sounds (no audio files except fever BGM)

import { getSettings } from '@/lib/settings';

export type ChakraLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type CardRank = 'NORMAL' | 'BRONZE' | 'SILVER' | 'GOLD' | 'HOLOGRAPHIC' | 'LEGENDARY';

// Shared AudioContext to avoid autoplay policy issues
let _audioCtx: AudioContext | null = null;
export function getAudioCtx(): AudioContext {
    if (!_audioCtx || _audioCtx.state === 'closed') {
        _audioCtx = new AudioContext();
    }
    return _audioCtx;
}

export function playLevelSound(level: ChakraLevel) {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;

        const sounds: Record<ChakraLevel, { freqs: number[]; dur: number; type: OscillatorType; gain: number }> = {
            0: { freqs: [220], dur: 0.2, type: 'triangle', gain: 0.2 },
            1: { freqs: [330, 440], dur: 0.25, type: 'triangle', gain: 0.18 },
            2: { freqs: [392, 494, 587], dur: 0.3, type: 'triangle', gain: 0.16 },
            3: { freqs: [523, 659, 784], dur: 0.4, type: 'sine', gain: 0.16 },
            4: { freqs: [587, 740, 880, 1109], dur: 0.5, type: 'sine', gain: 0.14 },
            5: { freqs: [659, 831, 988, 1245, 1480], dur: 0.6, type: 'sine', gain: 0.12 },
            6: { freqs: [440, 554, 659, 880, 1109, 1319, 1760], dur: 0.9, type: 'sine', gain: 0.1 },
        };

        const s = sounds[level];
        s.freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = s.type;
            osc.frequency.value = freq;
            const g = s.gain * vol;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(g, now + 0.03);
            gain.gain.setValueAtTime(g, now + s.dur * 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, now + s.dur);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(now + i * 0.05);
            osc.stop(now + s.dur + 0.1);
        });
    } catch (e) {
        console.warn('Audio failed:', e);
    }
}

// Slot reel spin tick — single click per symbol change
export function playSpinTick() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = (st.volume / 100) * 0.4;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = 800 + Math.random() * 200;
        osc.type = 'square';
        gain.gain.setValueAtTime(0.06 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.03);
    } catch { /* audio not available */ }
}

// Slot reel stop — heavy thud with resonance
export function playReelStop(reelIndex: number) {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        // Low thud
        const thud = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thud.frequency.value = 120 + reelIndex * 30;
        thud.type = 'sine';
        thudGain.gain.setValueAtTime(0.2 * vol, now);
        thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        thud.connect(thudGain); thudGain.connect(ctx.destination);
        thud.start(now); thud.stop(now + 0.2);
        // Click
        const click = ctx.createOscillator();
        const clickGain = ctx.createGain();
        click.frequency.value = 1200;
        click.type = 'square';
        clickGain.gain.setValueAtTime(0.1 * vol, now);
        clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
        click.connect(clickGain); clickGain.connect(ctx.destination);
        click.start(now); click.stop(now + 0.05);
    } catch { /* audio not available */ }
}

// Reach alert — tension rising tone
export function playReachAlert() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        [440, 554, 659].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0, now + i * 0.08);
            gain.gain.linearRampToValueAtTime(0.12 * vol, now + i * 0.08 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(now + i * 0.08); osc.stop(now + i * 0.08 + 0.35);
        });
    } catch { /* audio not available */ }
}

// Slot spin start — brief ascending whir
export function playSpinStart() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
        gain.gain.setValueAtTime(0.1 * vol, now);
        gain.gain.linearRampToValueAtTime(0.04 * vol, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.35);
    } catch { /* audio not available */ }
}

// Gacha tier reveal sound
export function playGachaSound(tier: string) {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const sounds: Record<string, { freqs: number[]; dur: number; type: OscillatorType; gain: number; stagger: number }> = {
            MISS: { freqs: [150], dur: 0.15, type: 'triangle', gain: 0.08, stagger: 0 },
            BONUS: { freqs: [523, 659], dur: 0.25, type: 'sine', gain: 0.12, stagger: 0.08 },
            GREAT: { freqs: [523, 659, 784], dur: 0.35, type: 'sine', gain: 0.14, stagger: 0.07 },
            SUPER: { freqs: [262, 392, 523, 659, 784], dur: 0.50, type: 'triangle', gain: 0.10, stagger: 0.05 },
            MEGA: { freqs: [220, 330, 440, 554, 659, 880], dur: 0.90, type: 'sine', gain: 0.08, stagger: 0.06 },
            LEGENDARY: { freqs: [440, 554, 659, 880, 1109, 1319, 1760], dur: 1.20, type: 'sine', gain: 0.07, stagger: 0.05 },
        };
        const s = sounds[tier] || sounds.MISS;
        s.freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = s.type;
            osc.frequency.value = freq;
            const g = s.gain * vol;
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(g, now + 0.03);
            gain.gain.setValueAtTime(g, now + s.dur * 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, now + s.dur);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(now + i * s.stagger); osc.stop(now + s.dur + 0.1);
        });
        if (tier === 'LEGENDARY' || tier === 'MYTHIC' || tier === 'SHINY' || tier === 'PHANTOM') {
            const rumble = ctx.createOscillator();
            const rGain = ctx.createGain();
            rumble.frequency.value = tier === 'PHANTOM' ? 40 : 80; rumble.type = 'sawtooth';
            rGain.gain.setValueAtTime(0.08 * vol, now);
            rGain.gain.linearRampToValueAtTime(0.15 * vol, now + 0.3);
            rGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
            rumble.connect(rGain); rGain.connect(ctx.destination);
            rumble.start(now); rumble.stop(now + 0.5);
        }
        // MYTHIC: rising heavenly choir
        if (tier === 'MYTHIC') {
            const choirFreqs = [523.3, 659.3, 784.0, 1046.5, 1318.5];
            choirFreqs.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'sine'; osc.frequency.value = freq;
                const t = now + 0.8 + i * 0.12;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.1 * vol, t + 0.05);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
                osc.connect(g); g.connect(ctx.destination);
                osc.start(t); osc.stop(t + 0.7);
            });
        }
        // SHINY: prismatic shimmer cascade
        if (tier === 'SHINY') {
            for (let wave = 0; wave < 3; wave++) {
                const freqs = [440, 554, 659, 880, 1109, 1319, 1760];
                freqs.forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const g = ctx.createGain();
                    osc.type = 'sine'; osc.frequency.value = freq * (1 + wave * 0.01);
                    const t = now + wave * 0.4 + i * 0.04;
                    g.gain.setValueAtTime(0, t);
                    g.gain.linearRampToValueAtTime(0.06 * vol, t + 0.02);
                    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
                    osc.connect(g); g.connect(ctx.destination);
                    osc.start(t); osc.stop(t + 0.55);
                });
            }
        }
        // PHANTOM: eerie reverse reverb + sub-bass
        if (tier === 'PHANTOM') {
            const sub = ctx.createOscillator();
            const subG = ctx.createGain();
            sub.type = 'sine'; sub.frequency.value = 30;
            subG.gain.setValueAtTime(0.2 * vol, now);
            subG.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
            sub.connect(subG); subG.connect(ctx.destination);
            sub.start(now); sub.stop(now + 2.1);
            const eerieFreqs = [1760, 1319, 880, 659, 440, 330, 220];
            eerieFreqs.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'triangle'; osc.frequency.value = freq;
                const t = now + 0.3 + i * 0.15;
                g.gain.setValueAtTime(0, t);
                g.gain.linearRampToValueAtTime(0.08 * vol, t + 0.03);
                g.gain.setValueAtTime(0.08 * vol, t + 0.08);
                g.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
                osc.connect(g); g.connect(ctx.destination);
                osc.start(t); osc.stop(t + 0.85);
            });
        }
    } catch { /* audio not available */ }
}

// FEVER entry sound — pachinko kakuhen-level impact (~1.5s)
export function playFeverEntrySound() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;

        // Phase 1: Low rumble 60Hz sawtooth -> rising sweep
        const sweep = ctx.createOscillator();
        const sweepGain = ctx.createGain();
        sweep.type = 'sawtooth';
        sweep.frequency.setValueAtTime(60, now);
        sweep.frequency.exponentialRampToValueAtTime(400, now + 0.3);
        sweepGain.gain.setValueAtTime(0.12 * vol, now);
        sweepGain.gain.linearRampToValueAtTime(0.18 * vol, now + 0.15);
        sweepGain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        sweep.connect(sweepGain); sweepGain.connect(ctx.destination);
        sweep.start(now); sweep.stop(now + 0.4);

        // Phase 2: Rising arpeggio
        const arpFreqs = [261.6, 329.6, 392.0, 523.3, 659.3];
        arpFreqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + 0.3 + i * 0.1;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.15 * vol, t + 0.03);
            g.gain.setValueAtTime(0.15 * vol, t + 0.06);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(t); osc.stop(t + 0.25);
        });

        // Phase 3: Power chord explosion
        const chordFreqs = [523.3, 659.3, 784.0, 1046.5];
        chordFreqs.forEach(freq => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            g.gain.setValueAtTime(0, now + 0.8);
            g.gain.linearRampToValueAtTime(0.2 * vol, now + 0.85);
            g.gain.setValueAtTime(0.2 * vol, now + 0.95);
            g.gain.exponentialRampToValueAtTime(0.001, now + 1.25);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(now + 0.8); osc.stop(now + 1.3);
        });

        // Phase 4: Sub-bass + white noise shockwave
        const sub = ctx.createOscillator();
        const subGain = ctx.createGain();
        sub.type = 'sine';
        sub.frequency.value = 40;
        subGain.gain.setValueAtTime(0.2 * vol, now + 0.8);
        subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
        sub.connect(subGain); subGain.connect(ctx.destination);
        sub.start(now + 0.8); sub.stop(now + 1.6);

        const bufferSize = ctx.sampleRate * 0.3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
        const noise = ctx.createBufferSource();
        const noiseGain = ctx.createGain();
        noise.buffer = noiseBuffer;
        noiseGain.gain.setValueAtTime(0.12 * vol, now + 0.8);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
        noise.connect(noiseGain); noiseGain.connect(ctx.destination);
        noise.start(now + 0.8); noise.stop(now + 1.2);
    } catch { /* audio not available */ }
}

// FEVER exit sound — descending sweep (~0.8s)
export function playFeverExitSound() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;

        const sweep = ctx.createOscillator();
        const sweepGain = ctx.createGain();
        sweep.type = 'sawtooth';
        sweep.frequency.setValueAtTime(800, now);
        sweep.frequency.exponentialRampToValueAtTime(100, now + 0.5);
        sweepGain.gain.setValueAtTime(0.1 * vol, now);
        sweepGain.gain.linearRampToValueAtTime(0.14 * vol, now + 0.1);
        sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        sweep.connect(sweepGain); sweepGain.connect(ctx.destination);
        sweep.start(now); sweep.stop(now + 0.7);

        const low = ctx.createOscillator();
        const lowGain = ctx.createGain();
        low.type = 'triangle';
        low.frequency.value = 80;
        lowGain.gain.setValueAtTime(0.06 * vol, now + 0.4);
        lowGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        low.connect(lowGain); lowGain.connect(ctx.destination);
        low.start(now + 0.4); low.stop(now + 0.9);
    } catch { /* audio not available */ }
}

// FEVER BGM — looping MP3
// Module-level tracker to prevent double-play across all callers
let _activeFeverBGM: HTMLAudioElement | null = null;
let _feverBGMFadeInterval: ReturnType<typeof setInterval> | null = null;

export function startFeverBGM(): HTMLAudioElement | null {
    try {
        const st = getSettings(); if (!st.soundEnabled) return null;
        // Stop any existing fever BGM before creating a new one
        if (_activeFeverBGM) {
            try { _activeFeverBGM.pause(); _activeFeverBGM.currentTime = 0; } catch { /* */ }
            _activeFeverBGM = null;
        }
        if (_feverBGMFadeInterval) {
            clearInterval(_feverBGMFadeInterval);
            _feverBGMFadeInterval = null;
        }
        const audio = new Audio('/audio/fever-bgm.mp3');
        audio.loop = true;
        audio.volume = (st.feverBgmVolume / 100) * (st.volume / 100);
        audio.play().catch(() => {
            // Autoplay blocked — retry on next user interaction
            const retry = () => {
                if (_activeFeverBGM === audio) {
                    audio.play().catch(() => { /* still blocked */ });
                }
                window.removeEventListener('click', retry);
                window.removeEventListener('touchstart', retry);
            };
            window.addEventListener('click', retry, { once: true });
            window.addEventListener('touchstart', retry, { once: true });
        });
        _activeFeverBGM = audio;
        return audio;
    } catch { return null; }
}

export function stopFeverBGM(audio: HTMLAudioElement | null) {
    if (!audio) return;
    // Clear any existing fade to prevent stacking
    if (_feverBGMFadeInterval) {
        clearInterval(_feverBGMFadeInterval);
        _feverBGMFadeInterval = null;
    }
    if (_activeFeverBGM === audio) _activeFeverBGM = null;
    try {
        if (audio.paused) { audio.currentTime = 0; return; }
        const startVol = audio.volume;
        if (startVol <= 0) { audio.pause(); audio.currentTime = 0; return; }
        const steps = 8;
        let step = 0;
        _feverBGMFadeInterval = setInterval(() => {
            step++;
            try {
                audio.volume = Math.max(0, startVol * (1 - step / steps));
            } catch { /* element may be gone */ }
            if (step >= steps) {
                if (_feverBGMFadeInterval) { clearInterval(_feverBGMFadeInterval); _feverBGMFadeInterval = null; }
                try { audio.pause(); audio.currentTime = 0; } catch { /* */ }
            }
        }, 30);
    } catch { /* audio not available */ }
}

// Check if fever BGM is currently playing (for external guards)
export function isFeverBGMPlaying(): boolean {
    return _activeFeverBGM !== null && !_activeFeverBGM.paused;
}

// Card rank reveal sound
export function playCardRankSound(rank: CardRank) {
    try {
        if (rank === 'NORMAL') return;
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;

        const configs: Partial<Record<CardRank, { freqs: number[]; dur: number; type: OscillatorType; gain: number; stagger: number }>> = {
            BRONZE: { freqs: [440], dur: 0.15, type: 'triangle', gain: 0.1, stagger: 0 },
            SILVER: { freqs: [523, 659], dur: 0.2, type: 'sine', gain: 0.1, stagger: 0 },
            GOLD: { freqs: [523, 659, 784], dur: 0.35, type: 'sine', gain: 0.12, stagger: 0.08 },
            HOLOGRAPHIC: { freqs: [523, 659, 784, 988, 1175], dur: 0.6, type: 'sine', gain: 0.1, stagger: 0.06 },
            LEGENDARY: { freqs: [440, 523, 659, 784, 988, 1175, 1568], dur: 0.9, type: 'sine', gain: 0.08, stagger: 0.05 },
        };
        const s = configs[rank];
        if (!s) return;

        s.freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = s.type;
            osc.frequency.value = freq;
            const t = now + i * s.stagger;
            const gv = s.gain * vol;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(gv, t + 0.02);
            g.gain.setValueAtTime(gv, t + s.dur * 0.4);
            g.gain.exponentialRampToValueAtTime(0.001, t + s.dur);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(t); osc.stop(t + s.dur + 0.05);
        });

        if (rank === 'LEGENDARY') {
            const rumble = ctx.createOscillator();
            const rg = ctx.createGain();
            rumble.type = 'sawtooth'; rumble.frequency.value = 80;
            rg.gain.setValueAtTime(0.06 * vol, now);
            rg.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
            rumble.connect(rg); rg.connect(ctx.destination);
            rumble.start(now); rumble.stop(now + 0.6);
        }
    } catch { /* audio not available */ }
}

// Rank-up fanfare — ascending celebration
export function playRankUpSound(newRank: CardRank) {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;

        const fanfareFreqs: Record<string, number[]> = {
            BRONZE: [330, 440],
            SILVER: [330, 440, 523],
            GOLD: [330, 440, 523, 659],
            HOLOGRAPHIC: [330, 440, 523, 659, 784],
            LEGENDARY: [262, 330, 392, 523, 659, 784, 1047],
        };
        const freqs = fanfareFreqs[newRank] || [440, 523];
        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.08;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.14 * vol, t + 0.03);
            g.gain.setValueAtTime(0.14 * vol, t + 0.15);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(t); osc.stop(t + 0.55);
        });

        const chordTime = now + freqs.length * 0.08 + 0.1;
        const topFreqs = freqs.slice(-3);
        topFreqs.forEach(freq => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            g.gain.setValueAtTime(0, chordTime);
            g.gain.linearRampToValueAtTime(0.12 * vol, chordTime + 0.03);
            g.gain.exponentialRampToValueAtTime(0.001, chordTime + 0.4);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(chordTime); osc.stop(chordTime + 0.45);
        });
    } catch { /* audio not available */ }
}

// Impact hit — scales with tier power (0-6)
export function playImpactHit(tierPower: number) {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        if (tierPower <= 0) {
            // MISS: sad whiff
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.frequency.value = 150; osc.type = 'triangle';
            g.gain.setValueAtTime(0.06 * vol, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(now); osc.stop(now + 0.15);
        } else if (tierPower <= 2) {
            // BONUS/GREAT: light hit
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.frequency.value = 300 + tierPower * 80; osc.type = 'square';
            g.gain.setValueAtTime(0.1 * vol, now);
            g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(now); osc.stop(now + 0.12);
            // noise
            const buf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
            const n = ctx.createBufferSource(); const ng = ctx.createGain();
            n.buffer = buf; ng.gain.setValueAtTime(0.08 * vol, now);
            ng.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            n.connect(ng); ng.connect(ctx.destination);
            n.start(now); n.stop(now + 0.06);
        } else {
            // SUPER+: heavy impact with sub-bass
            const sub = ctx.createOscillator();
            const sg = ctx.createGain();
            sub.frequency.value = 50 + tierPower * 10; sub.type = 'sine';
            sg.gain.setValueAtTime((0.1 + tierPower * 0.02) * vol, now);
            sg.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + tierPower * 0.05);
            sub.connect(sg); sg.connect(ctx.destination);
            sub.start(now); sub.stop(now + 0.3 + tierPower * 0.05);
            // crack
            const buf = ctx.createBuffer(1, ctx.sampleRate * (0.08 + tierPower * 0.02), ctx.sampleRate);
            const d = buf.getChannelData(0);
            for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (0.4 + tierPower * 0.1);
            const n = ctx.createBufferSource(); const ng = ctx.createGain();
            n.buffer = buf; ng.gain.setValueAtTime((0.1 + tierPower * 0.02) * vol, now);
            ng.gain.exponentialRampToValueAtTime(0.001, now + 0.1 + tierPower * 0.02);
            n.connect(ng); ng.connect(ctx.destination);
            n.start(now); n.stop(now + 0.12 + tierPower * 0.02);
            // high ping
            const ping = ctx.createOscillator();
            const pg = ctx.createGain();
            ping.frequency.value = 800 + tierPower * 200; ping.type = 'sine';
            pg.gain.setValueAtTime(0.08 * vol, now + 0.02);
            pg.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
            ping.connect(pg); pg.connect(ctx.destination);
            ping.start(now + 0.02); ping.stop(now + 0.2);
        }
    } catch { /* audio not available */ }
}

// Boss explosion — massive layered impact
export function playBossExplode() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        // Sub-bass boom
        const sub = ctx.createOscillator();
        const sg = ctx.createGain();
        sub.frequency.value = 35; sub.type = 'sine';
        sg.gain.setValueAtTime(0.25 * vol, now);
        sg.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        sub.connect(sg); sg.connect(ctx.destination);
        sub.start(now); sub.stop(now + 0.9);
        // Noise explosion
        const buf = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.8;
        const n = ctx.createBufferSource(); const ng = ctx.createGain();
        n.buffer = buf; ng.gain.setValueAtTime(0.18 * vol, now);
        ng.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        n.connect(ng); ng.connect(ctx.destination);
        n.start(now); n.stop(now + 0.4);
        // Descending sweep
        const sweep = ctx.createOscillator();
        const swg = ctx.createGain();
        sweep.type = 'sawtooth';
        sweep.frequency.setValueAtTime(600, now);
        sweep.frequency.exponentialRampToValueAtTime(40, now + 0.6);
        swg.gain.setValueAtTime(0.12 * vol, now);
        swg.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        sweep.connect(swg); swg.connect(ctx.destination);
        sweep.start(now); sweep.stop(now + 0.6);
    } catch { /* audio not available */ }
}

// Kakuhen entry — dramatic power-up jingle
export function playKakuhenEntry() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        // Rising power chord
        [261.6, 329.6, 392, 523.3, 659.3, 784].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'triangle'; osc.frequency.value = freq;
            const t = now + i * 0.08;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.14 * vol, t + 0.03);
            g.gain.setValueAtTime(0.14 * vol, t + 0.12);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(t); osc.stop(t + 0.45);
        });
        // Final power burst at end
        const burstTime = now + 0.5;
        [523.3, 659.3, 784, 1046.5, 1318.5].forEach(freq => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine'; osc.frequency.value = freq;
            g.gain.setValueAtTime(0, burstTime);
            g.gain.linearRampToValueAtTime(0.16 * vol, burstTime + 0.03);
            g.gain.setValueAtTime(0.16 * vol, burstTime + 0.15);
            g.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.6);
            osc.connect(g); g.connect(ctx.destination);
            osc.start(burstTime); osc.stop(burstTime + 0.65);
        });
        // Sub rumble
        const sub = ctx.createOscillator();
        const sg = ctx.createGain();
        sub.type = 'sine'; sub.frequency.value = 50;
        sg.gain.setValueAtTime(0.15 * vol, burstTime);
        sg.gain.exponentialRampToValueAtTime(0.001, burstTime + 0.5);
        sub.connect(sg); sg.connect(ctx.destination);
        sub.start(burstTime); sub.stop(burstTime + 0.55);
    } catch { /* audio not available */ }
}

// GP coin collect — bright coin sound
export function playGpCoin() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = (st.volume / 100) * 0.6;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.frequency.value = 1800 + Math.random() * 400; osc.type = 'sine';
        g.gain.setValueAtTime(0.1 * vol, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.1);
    } catch { /* audio not available */ }
}

// Streak break — descending dissonant tone (glass shatter feeling)
export function playStreakBreak() {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = (st.volume / 100) * 0.7;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        // Descending dissonant sweep
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const g = ctx.createGain();
        osc1.type = 'sawtooth'; osc2.type = 'square';
        osc1.frequency.setValueAtTime(600, now);
        osc1.frequency.exponentialRampToValueAtTime(80, now + 0.6);
        osc2.frequency.setValueAtTime(620, now); // slight detune for dissonance
        osc2.frequency.exponentialRampToValueAtTime(60, now + 0.6);
        g.gain.setValueAtTime(0.12 * vol, now);
        g.gain.linearRampToValueAtTime(0.06 * vol, now + 0.2);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc1.connect(g); osc2.connect(g); g.connect(ctx.destination);
        osc1.start(now); osc2.start(now);
        osc1.stop(now + 0.8); osc2.stop(now + 0.8);
        // Noise burst for shatter texture
        const bufLen = Math.floor(ctx.sampleRate * 0.15);
        const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / bufLen);
        const ns = ctx.createBufferSource();
        const ng = ctx.createGain();
        ns.buffer = buf;
        ng.gain.setValueAtTime(0.15 * vol, now);
        ng.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        ns.connect(ng); ng.connect(ctx.destination);
        ns.start(now);
    } catch { /* audio not available */ }
}

// FEVER chain hit — metallic ping that rises with streak
export function playFeverChainHit(streak: number) {
    try {
        const st = getSettings(); if (!st.soundEnabled) return;
        const vol = st.volume / 100;
        const ctx = getAudioCtx();
        if (ctx.state === 'suspended') ctx.resume();
        const now = ctx.currentTime;
        const freq = 1200 + streak * 50;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = Math.min(freq, 3000);
        g.gain.setValueAtTime(0.08 * vol, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(g); g.connect(ctx.destination);
        osc.start(now); osc.stop(now + 0.2);
    } catch { /* audio not available */ }
}
