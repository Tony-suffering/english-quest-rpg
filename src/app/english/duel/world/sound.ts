/**
 * カードの中庭の音。
 * 曲と、取る・返す・そろった ときの音は、対戦画面(DuelGame.tsx)と同じ素材(public/duel/bgm, public/duel/sfx。CC0)。
 * 曲は最初の画面と同じ home。声が鳴るあいだは曲を下げる(これも対戦画面と同じ)。向こうの素材や音量を変えたら、ここも合わせる。
 * 風・水・鳥・足音は、この場所だけの音なので、その場で作る。
 *
 * 呼ぶ声(call): カードの演じた声を、そのカードが立っている位置から鳴らす。耳(listener)は歩く人。
 * 遠いと小さく、高い音が削れてこもる。近づくほど、はっきりする。左右はヘッドホンだとよく分かる。
 * 本人の本丸は「崩れた音を聞き取ること」なので、こもった声を聞き分ける時間そのものが練習になる。
 */

export interface WorldSound {
    start: () => void;
    setOn: (on: boolean) => void;
    step: (run: boolean) => void;
    take: () => void;
    drop: () => void;
    deny: () => void;
    full: () => void;
    /** 演じた声(mp3)があればそれを、無ければ端末の読み上げ */
    speak: (text: string, voiceUrl?: string) => void;
    /** そのカードの声を、カードの位置(x, z)から呼び続ける。前の呼び声は止まる */
    call: (voiceUrl: string, x: number, z: number) => void;
    stopCall: () => void;
    /** 耳の位置と向き(毎コマ) */
    setListener: (x: number, z: number, yaw: number) => void;
    /** 目の前のカードの声を、その場で1回(聞き比べ用。呼び声はそのあいだ小さくする) */
    hear: (voiceUrl: string) => void;
    /** いまの呼び声の聞こえ方(検査用) */
    debug: () => { calling: boolean; distance: number; cutoff: number; loaded: number };
    stop: () => void;
}

export function createSound(): WorldSound {
    let ctx: AudioContext | null = null;
    let master: GainNode | null = null;
    let on = true;
    let birdTimer: ReturnType<typeof setTimeout> | null = null;
    let voiceEl: HTMLAudioElement | null = null;
    let bgm: HTMLAudioElement | null = null;
    let duckTimer: ReturnType<typeof setTimeout> | null = null;
    const BGM_VOL = 0.16, SFX_V = 1;   // 声を追う場所なので、曲は対戦画面(0.4)より小さく
    const vbufs: Record<string, Promise<AudioBuffer>> = {};
    let loaded = 0;
    let callSeq = 0;
    let callNodes: { src: AudioBufferSourceNode | null; lp: BiquadFilterNode; pan: PannerNode; gain: GainNode; x: number; z: number; timer: ReturnType<typeof setTimeout> | null } | null = null;
    const ear = { x: 0, z: 0 };
    let lastCut = 0;

    const voiceBuf = (url: string): Promise<AudioBuffer> => {
        const ac = ctx!;
        if (!vbufs[url]) vbufs[url] = fetch(url).then(r => r.arrayBuffer()).then(d => ac.decodeAudioData(d)).then(b => { loaded++; return b; });
        return vbufs[url];
    };
    const endCall = () => {
        callSeq++;
        if (!callNodes) return;
        if (callNodes.timer) clearTimeout(callNodes.timer);
        try { callNodes.src?.stop(); } catch { /* もう止まっている */ }
        callNodes.gain.disconnect();
        callNodes = null;
    };
    const tune = () => {
        if (!callNodes || !ctx) return;
        const d = Math.hypot(callNodes.x - ear.x, callNodes.z - ear.z);
        lastCut = d < 5 ? 16000 : Math.max(650, 16000 * Math.pow(5 / d, 1.5));
        callNodes.lp.frequency.setTargetAtTime(lastCut, ctx.currentTime, 0.08);
    };
    const bufs: Record<string, AudioBuffer> = {};

    const duck = (down: boolean) => {
        if (duckTimer) clearTimeout(duckTimer);
        if (bgm) bgm.volume = BGM_VOL * (down ? 0.3 : 1);
        if (down) duckTimer = setTimeout(() => duck(false), 9000);   // 終わりの合図が来ない端末でも、下げっぱなしにしない
    };
    /** 対戦画面と同じ録音の音。読めていなければ false(呼ぶ側が発振の音で代わりを鳴らす) */
    const sample = (name: string, vol = 0.7): boolean => {
        if (!ctx || !master || !on || !bufs[name]) return false;
        const src = ctx.createBufferSource(); src.buffer = bufs[name];
        const g = ctx.createGain(); g.gain.value = vol;
        src.connect(g).connect(master);
        src.start();
        return true;
    };

    const noise = (c: AudioContext, sec: number) => {
        const buf = c.createBuffer(1, Math.floor(c.sampleRate * sec), c.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        return buf;
    };

    const tone = (freq: number, dur: number, type: OscillatorType, vol: number, to?: number, delay = 0) => {
        if (!ctx || !master || !on) return;
        const t = ctx.currentTime + delay;
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, t);
        if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g).connect(master);
        o.start(t); o.stop(t + dur + 0.05);
    };

    const bird = () => {
        if (!ctx) return;
        if (on && !document.hidden) {
            const base = 2400 + Math.random() * 1800, n = 2 + Math.floor(Math.random() * 4);
            for (let i = 0; i < n; i++) tone(base + Math.random() * 500, 0.09, 'sine', 0.012 + Math.random() * 0.012, base * (0.8 + Math.random() * 0.5), i * 0.13);
        }
        birdTimer = setTimeout(bird, 2500 + Math.random() * 7000);
    };

    return {
        start() {
            if (ctx) { ctx.resume().catch(() => { /* そのまま */ }); return; }
            try {
                const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                ctx = new AC();
                master = ctx.createGain();
                master.gain.value = on ? 1 : 0;
                master.connect(ctx.destination);
                const buf = noise(ctx, 4);
                // 風: 低く絞った雑音を、ゆっくり揺らす
                const wind = ctx.createBufferSource(); wind.buffer = buf; wind.loop = true;
                const wf = ctx.createBiquadFilter(); wf.type = 'lowpass'; wf.frequency.value = 420;
                const wg = ctx.createGain(); wg.gain.value = 0.05;
                const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
                const lg = ctx.createGain(); lg.gain.value = 0.03;
                lfo.connect(lg).connect(wg.gain);
                wind.connect(wf).connect(wg).connect(master);
                wind.start(); lfo.start();
                // 水: 高めの帯を細かく揺らす
                const wat = ctx.createBufferSource(); wat.buffer = buf; wat.loop = true; wat.playbackRate.value = 0.7;
                const bf = ctx.createBiquadFilter(); bf.type = 'bandpass'; bf.frequency.value = 1700; bf.Q.value = 0.9;
                const bg = ctx.createGain(); bg.gain.value = 0.012;
                const l2 = ctx.createOscillator(); l2.frequency.value = 0.31;
                const l2g = ctx.createGain(); l2g.gain.value = 0.007;
                l2.connect(l2g).connect(bg.gain);
                wat.connect(bf).connect(bg).connect(master);
                wat.start(); l2.start();
                bird();
                const ac = ctx;
                ['select', 'click', 'turn', 'play'].forEach(name => {
                    fetch(`/duel/sfx/${name}.mp3?v=${SFX_V}`).then(r => r.arrayBuffer()).then(d => ac.decodeAudioData(d)).then(b => { bufs[name] = b; }).catch(() => { /* 無ければ発振の音 */ });
                });
                bgm = new Audio(`/duel/bgm/home.mp3?v=${SFX_V}`);
                bgm.loop = true; bgm.volume = BGM_VOL;
                if (on) bgm.play().catch(() => { /* 鳴らせない端末 */ });
            } catch { /* 音が出せない端末 */ }
        },
        setOn(v) {
            on = v;
            if (master && ctx) master.gain.setTargetAtTime(v ? 1 : 0, ctx.currentTime, 0.05);
            if (!v) { voiceEl?.pause(); bgm?.pause(); try { window.speechSynthesis.cancel(); } catch { /* 無い端末 */ } }
            else bgm?.play().catch(() => { /* 鳴らせない端末 */ });
        },
        step(run) {
            if (!ctx || !master || !on) return;
            const t = ctx.currentTime;
            const src = ctx.createBufferSource(); src.buffer = noise(ctx, 0.08);
            const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 500 + Math.random() * 500; f.Q.value = 1.4;
            const g = ctx.createGain();
            g.gain.setValueAtTime(run ? 0.09 : 0.06, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
            src.connect(f).connect(g).connect(master);
            src.start(t);
            tone(90 + Math.random() * 20, 0.07, 'sine', 0.05, 50);
        },
        take() { if (!sample('select')) { [660, 880, 1320].forEach((f, i) => tone(f, 0.5, 'sine', 0.07, undefined, i * 0.07)); tone(220, 0.25, 'triangle', 0.06, 440); } },
        drop() { if (!sample('click')) tone(520, 0.22, 'sine', 0.06, 260); },
        deny() { tone(180, 0.16, 'square', 0.04, 140); },
        full() { if (!sample('turn')) [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, 0.7, 'triangle', 0.07, undefined, i * 0.11)); },
        speak(text, voiceUrl) {
            if (!on) return;
            try {
                window.speechSynthesis.cancel();
                voiceEl?.pause();
                if (voiceUrl) {
                    const el = new Audio(voiceUrl);
                    voiceEl = el;
                    duck(true);
                    el.onended = el.onerror = () => duck(false);
                    el.play().catch(() => duck(false));
                    return;
                }
                duck(true);
                const u = new SpeechSynthesisUtterance(text);
                u.lang = 'en-US'; u.rate = 0.95;
                u.onend = u.onerror = () => duck(false);
                window.speechSynthesis.speak(u);
            } catch { /* 読み上げが無い端末 */ }
        },
        call(voiceUrl, x, z) {
            if (!ctx || !master) return;
            endCall();
            const ac = ctx, seq = callSeq;
            const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900;
            const pan = ac.createPanner();
            pan.panningModel = 'HRTF'; pan.distanceModel = 'inverse'; pan.refDistance = 5; pan.rolloffFactor = 0.85; pan.maxDistance = 400;
            if (pan.positionX) { pan.positionX.value = x; pan.positionY.value = 1.9; pan.positionZ.value = z; } else pan.setPosition(x, 1.9, z);
            const gain = ac.createGain(); gain.gain.value = 2.0;
            lp.connect(pan).connect(gain).connect(master);
            callNodes = { src: null, lp, pan, gain, x, z, timer: null };
            tune();
            voiceBuf(voiceUrl).then(buf => {
                const once = () => {
                    if (seq !== callSeq || !callNodes) return;
                    const src = ac.createBufferSource(); src.buffer = buf;
                    src.connect(lp);
                    src.onended = () => { if (seq === callSeq && callNodes) callNodes.timer = setTimeout(once, 1500); };
                    callNodes.src = src;
                    src.start();
                };
                once();
            }).catch(() => { /* 声が読めなければ、波紋だけがたより */ });
        },
        stopCall() { endCall(); },
        setListener(x, z, yaw) {
            ear.x = x; ear.z = z;
            if (!ctx) return;
            const l = ctx.listener, fx = -Math.sin(yaw), fz = -Math.cos(yaw);
            if (l.positionX) {
                l.positionX.value = x; l.positionY.value = 1.62; l.positionZ.value = z;
                l.forwardX.value = fx; l.forwardY.value = 0; l.forwardZ.value = fz;
                l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0;
            } else { l.setPosition(x, 1.62, z); l.setOrientation(fx, 0, fz, 0, 1, 0); }
            tune();
        },
        hear(voiceUrl) {
            if (!ctx || !master || !on) return;
            const ac = ctx, out = master, cn = callNodes;
            voiceBuf(voiceUrl).then(buf => {
                const src = ac.createBufferSource(); src.buffer = buf;
                const g = ac.createGain(); g.gain.value = 1;
                src.connect(g).connect(out);
                if (cn) cn.gain.gain.setTargetAtTime(0.25, ac.currentTime, 0.05);
                src.onended = () => { if (cn && cn === callNodes) cn.gain.gain.setTargetAtTime(2.0, ac.currentTime, 0.2); };
                src.start();
            }).catch(() => { /* 声が読めない */ });
        },
        debug() {
            return { calling: !!callNodes, distance: callNodes ? Math.hypot(callNodes.x - ear.x, callNodes.z - ear.z) : -1, cutoff: Math.round(lastCut), loaded };
        },
        stop() {
            endCall();
            if (birdTimer) clearTimeout(birdTimer);
            voiceEl?.pause();
            bgm?.pause(); bgm = null;
            if (duckTimer) clearTimeout(duckTimer);
            try { window.speechSynthesis.cancel(); } catch { /* 無い端末 */ }
            ctx?.close().catch(() => { /* 閉じられなくてもよい */ });
            ctx = null;
        },
    };
}
