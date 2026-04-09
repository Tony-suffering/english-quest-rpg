// Kaiwa page sound effects — Web Audio API synthesized (no audio files)
// Respects soundEnabled + volume from app settings

import { getSettings } from '@/lib/settings';

let _ctx: AudioContext | null = null;
function ctx(): AudioContext {
    if (!_ctx || _ctx.state === 'closed') _ctx = new AudioContext();
    return _ctx;
}

function vol(): number {
    const st = getSettings();
    if (!st.soundEnabled) return 0;
    return st.volume / 100;
}

function ready(): boolean {
    const v = vol();
    if (v <= 0) return false;
    const c = ctx();
    if (c.state === 'suspended') c.resume();
    return true;
}

// ─── Play button tap: bright click + short tone ───
export function playTapPlay() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        // Click
        const click = c.createOscillator();
        const cg = c.createGain();
        click.type = 'sine';
        click.frequency.value = 1200;
        cg.gain.setValueAtTime(0.15 * v, now);
        cg.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        click.connect(cg); cg.connect(c.destination);
        click.start(now); click.stop(now + 0.08);
        // Tone
        const tone = c.createOscillator();
        const tg = c.createGain();
        tone.type = 'triangle';
        tone.frequency.value = 880;
        tg.gain.setValueAtTime(0.08 * v, now + 0.02);
        tg.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        tone.connect(tg); tg.connect(c.destination);
        tone.start(now + 0.02); tone.stop(now + 0.18);
    } catch { /* */ }
}

// ─── Mastery check ON: satisfying ascending ding ───
export function playMasteryOn() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const freqs = [523, 659, 784]; // C5 E5 G5
        freqs.forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.06;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.14 * v, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.3);
        });
    } catch { /* */ }
}

// ─── Mastery check OFF: soft descending tone ───
export function playMasteryOff() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.15);
        g.gain.setValueAtTime(0.1 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.25);
    } catch { /* */ }
}

// ─── Day complete: victory fanfare ───
export function playDayComplete() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        // Rising arpeggio
        const freqs = [523, 659, 784, 1047]; // C5 E5 G5 C6
        freqs.forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.1;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.12 * v, t + 0.03);
            g.gain.setValueAtTime(0.12 * v, t + 0.15);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.55);
        });
        // Final chord
        [523, 659, 784, 1047].forEach(freq => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            g.gain.setValueAtTime(0, now + 0.5);
            g.gain.linearRampToValueAtTime(0.1 * v, now + 0.55);
            g.gain.setValueAtTime(0.1 * v, now + 0.8);
            g.gain.exponentialRampToValueAtTime(0.001, now + 1.5);
            osc.connect(g); g.connect(c.destination);
            osc.start(now + 0.5); osc.stop(now + 1.6);
        });
    } catch { /* */ }
}

// ─── Register to training: pop + sparkle ───
export function playRegister() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        // Pop
        const pop = c.createOscillator();
        const pg = c.createGain();
        pop.type = 'sine';
        pop.frequency.setValueAtTime(800, now);
        pop.frequency.exponentialRampToValueAtTime(1400, now + 0.05);
        pg.gain.setValueAtTime(0.15 * v, now);
        pg.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        pop.connect(pg); pg.connect(c.destination);
        pop.start(now); pop.stop(now + 0.12);
        // Sparkle
        const sparkle = c.createOscillator();
        const sg = c.createGain();
        sparkle.type = 'sine';
        sparkle.frequency.value = 1800;
        sg.gain.setValueAtTime(0, now + 0.05);
        sg.gain.linearRampToValueAtTime(0.08 * v, now + 0.08);
        sg.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        sparkle.connect(sg); sg.connect(c.destination);
        sparkle.start(now + 0.05); sparkle.stop(now + 0.3);
    } catch { /* */ }
}

// ─── Day switch: soft page turn ───
export function playDaySwitch() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        // Soft whoosh using filtered noise
        const bufLen = c.sampleRate * 0.12;
        const buf = c.createBuffer(1, bufLen, c.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
        const noise = c.createBufferSource();
        noise.buffer = buf;
        const filter = c.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 0.5;
        const ng = c.createGain();
        ng.gain.setValueAtTime(0.08 * v, now);
        ng.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        noise.connect(filter); filter.connect(ng); ng.connect(c.destination);
        noise.start(now); noise.stop(now + 0.15);
        // Subtle tone
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.value = 600;
        g.gain.setValueAtTime(0.04 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.12);
    } catch { /* */ }
}

// ─── Story expand/collapse: soft slide ───
export function playStoryToggle(open: boolean) {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        if (open) {
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(700, now + 0.1);
        } else {
            osc.frequency.setValueAtTime(700, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        }
        g.gain.setValueAtTime(0.06 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.15);
    } catch { /* */ }
}

// ─── Level tab switch: quick tick ───
export function playLevelSwitch() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'square';
        osc.frequency.value = 1000;
        g.gain.setValueAtTime(0.06 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.04);
    } catch { /* */ }
}

// ─── Navigation (prev/next day arrows): directional blip ───
export function playNavClick() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'triangle';
        osc.frequency.value = 900;
        g.gain.setValueAtTime(0.1 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.07);
    } catch { /* */ }
}

// ─── Card expand: soft open reveal ───
export function playCardExpand() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
        g.gain.setValueAtTime(0.08 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.15);
    } catch { /* */ }
}

// ─── Card collapse: soft close ───
export function playCardCollapse() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.08);
        g.gain.setValueAtTime(0.06 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.12);
    } catch { /* */ }
}

// ─── Quest step complete: cheerful ping ───
export function playQuestStep() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        [880, 1100].forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.08;
            g.gain.setValueAtTime(0.12 * v, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.25);
        });
    } catch { /* */ }
}

// ─── Quest ALL complete: epic fanfare (pachinko-level celebration) ───
export function playQuestComplete() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;

        // Phase 1: Rising arpeggio (0-0.5s)
        const arp = [523, 659, 784, 1047, 1319];
        arp.forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.08;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.15 * v, t + 0.02);
            g.gain.setValueAtTime(0.15 * v, t + 0.1);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.45);
        });

        // Phase 2: Power chord (0.5s)
        const chord = [523, 659, 784, 1047];
        chord.forEach(freq => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'triangle';
            osc.frequency.value = freq;
            g.gain.setValueAtTime(0, now + 0.5);
            g.gain.linearRampToValueAtTime(0.12 * v, now + 0.55);
            g.gain.setValueAtTime(0.12 * v, now + 1.0);
            g.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
            osc.connect(g); g.connect(c.destination);
            osc.start(now + 0.5); osc.stop(now + 2.1);
        });

        // Phase 3: Sparkle high notes (0.8-1.5s)
        [1568, 2093, 1760, 2349].forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + 0.8 + i * 0.12;
            g.gain.setValueAtTime(0.06 * v, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.35);
        });

        // Phase 4: Sub-bass impact
        const bass = c.createOscillator();
        const bg = c.createGain();
        bass.type = 'sine';
        bass.frequency.setValueAtTime(80, now + 0.48);
        bass.frequency.exponentialRampToValueAtTime(40, now + 1.0);
        bg.gain.setValueAtTime(0.2 * v, now + 0.48);
        bg.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        bass.connect(bg); bg.connect(c.destination);
        bass.start(now + 0.48); bass.stop(now + 1.3);
    } catch { /* */ }
}

// ─── Level picker select: satisfying click ───
export function playLevelSelect() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);
        g.gain.setValueAtTime(0.12 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.1);
        // Confirmation tone
        const osc2 = c.createOscillator();
        const g2 = c.createGain();
        osc2.type = 'triangle';
        osc2.frequency.value = 1200;
        g2.gain.setValueAtTime(0.06 * v, now + 0.05);
        g2.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc2.connect(g2); g2.connect(c.destination);
        osc2.start(now + 0.05); osc2.stop(now + 0.18);
    } catch { /* */ }
}

// ─── Checkin select: satisfying pick tick ───
export function playCheckinSelect() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        // Crisp tick
        const tick = c.createOscillator();
        const tg = c.createGain();
        tick.type = 'sine';
        tick.frequency.setValueAtTime(1400, now);
        tick.frequency.exponentialRampToValueAtTime(1800, now + 0.03);
        tg.gain.setValueAtTime(0.13 * v, now);
        tg.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        tick.connect(tg); tg.connect(c.destination);
        tick.start(now); tick.stop(now + 0.08);
        // Warm undertone
        const warm = c.createOscillator();
        const wg = c.createGain();
        warm.type = 'triangle';
        warm.frequency.value = 700;
        wg.gain.setValueAtTime(0.05 * v, now + 0.01);
        wg.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        warm.connect(wg); wg.connect(c.destination);
        warm.start(now + 0.01); warm.stop(now + 0.15);
    } catch { /* */ }
}

// ─── Checkin deselect: soft release ───
export function playCheckinDeselect() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        const osc = c.createOscillator();
        const g = c.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(500, now + 0.08);
        g.gain.setValueAtTime(0.07 * v, now);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(g); g.connect(c.destination);
        osc.start(now); osc.stop(now + 0.12);
    } catch { /* */ }
}

// ─── Checkin 3 picks ready: confirmation shimmer ───
export function playCheckin3Ready() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        // Ascending shimmer
        [880, 1109, 1319, 1760].forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.06;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.1 * v, t + 0.02);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.25);
        });
    } catch { /* */ }
}

// ─── Checkin celebration: premium fanfare with reverb ───
export function playCheckinCelebration() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;

        // Phase 1: Rising arpeggio with warmth (0-0.6s)
        const arp = [523, 659, 784, 1047, 1319, 1568];
        arp.forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.07;
            g.gain.setValueAtTime(0, t);
            g.gain.linearRampToValueAtTime(0.14 * v, t + 0.02);
            g.gain.setValueAtTime(0.14 * v, t + 0.12);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.55);
        });

        // Phase 2: Rich power chord with harmonics (0.5s)
        [523, 659, 784, 1047, 1319].forEach(freq => {
            ['sine', 'triangle'].forEach((type, ti) => {
                const osc = c.createOscillator();
                const g = c.createGain();
                osc.type = type as OscillatorType;
                osc.frequency.value = freq * (ti === 1 ? 1.002 : 1); // slight detune for richness
                const gain = ti === 0 ? 0.1 : 0.05;
                g.gain.setValueAtTime(0, now + 0.5);
                g.gain.linearRampToValueAtTime(gain * v, now + 0.55);
                g.gain.setValueAtTime(gain * v, now + 1.2);
                g.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
                osc.connect(g); g.connect(c.destination);
                osc.start(now + 0.5); osc.stop(now + 2.6);
            });
        });

        // Phase 3: High sparkle cascade (0.7-1.5s)
        [2093, 2637, 2349, 3136, 2793].forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + 0.7 + i * 0.1;
            g.gain.setValueAtTime(0.06 * v, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.4);
        });

        // Phase 4: Sub-bass foundation
        const bass = c.createOscillator();
        const bg = c.createGain();
        bass.type = 'sine';
        bass.frequency.setValueAtTime(80, now + 0.48);
        bass.frequency.exponentialRampToValueAtTime(40, now + 1.5);
        bg.gain.setValueAtTime(0.18 * v, now + 0.48);
        bg.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
        bass.connect(bg); bg.connect(c.destination);
        bass.start(now + 0.48); bass.stop(now + 1.9);

        // Phase 5: Final resolution chord (2.0s)
        [523, 784, 1047].forEach(freq => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            g.gain.setValueAtTime(0, now + 2.0);
            g.gain.linearRampToValueAtTime(0.08 * v, now + 2.1);
            g.gain.exponentialRampToValueAtTime(0.001, now + 3.5);
            osc.connect(g); g.connect(c.destination);
            osc.start(now + 2.0); osc.stop(now + 3.6);
        });
    } catch { /* */ }
}

// ─── Calendar day complete sparkle ───
export function playCalendarComplete() {
    try {
        if (!ready()) return;
        const v = vol(), c = ctx(), now = c.currentTime;
        // Gentle chime
        [1047, 1319, 1568].forEach((freq, i) => {
            const osc = c.createOscillator();
            const g = c.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            const t = now + i * 0.1;
            g.gain.setValueAtTime(0.08 * v, t);
            g.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
            osc.connect(g); g.connect(c.destination);
            osc.start(t); osc.stop(t + 0.45);
        });
    } catch { /* */ }
}
