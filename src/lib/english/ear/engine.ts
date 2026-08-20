/**
 * RAW PASS 耳エンジン
 *
 * 劣化の2軸だけを扱う。
 *   1. 速度  -> SpeechSynthesisUtterance.rate
 *   2. 雑音  -> WebAudio で作ったバブルノイズを「同時に」鳴らしてマスキングする
 *
 * TTS の出力は WebAudio のグラフに入れられない(ブラウザが繋がせない)ので、
 * フィルタを掛ける方式は取れない。代わりに、実際の騒がしい環境と同じ「同時再生による
 * マスキング」で難易度を作る。これは音声知覚研究の speech-in-noise と同じ構造。
 */

let ctx: AudioContext | null = null;
let noiseSrc: AudioBufferSourceNode | null = null;
let noiseGain: GainNode | null = null;
let babbleBuf: AudioBuffer | null = null;

const getCtx = (): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
};

/**
 * バブルノイズ(人の話し声のざわめき)を合成する。
 * ホワイトノイズを声の帯域に寄せ、4〜7Hz の音節リズムで振幅を揺らすと
 * 「隣の席で誰かが喋っている」に近い、聞き取りを実際に邪魔する雑音になる。
 */
const buildBabble = (c: AudioContext): AudioBuffer => {
    const seconds = 8;
    const len = c.sampleRate * seconds;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);

    // ホワイトノイズ
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

    // 1次ローパス(声の帯域より上を落とす) + ハイパス(低域のゴロゴロを削る)
    let lp = 0;
    let prev = 0;
    let hp = 0;
    const aLp = 0.16;   // ざっくり 2〜3kHz 相当
    const aHp = 0.985;  // ざっくり 150Hz 相当
    for (let i = 0; i < len; i++) {
        lp += aLp * (d[i] - lp);
        hp = aHp * (hp + lp - prev);
        prev = lp;
        d[i] = hp;
    }

    // 音節リズムの振幅変調を4本重ねて「複数人が喋っている」感を出す
    const voices = [
        { f: 4.1, ph: 0.0 },
        { f: 5.3, ph: 1.7 },
        { f: 6.7, ph: 3.1 },
        { f: 3.3, ph: 4.9 },
    ];
    for (let i = 0; i < len; i++) {
        const t = i / c.sampleRate;
        let env = 0;
        for (const v of voices) env += 0.5 + 0.5 * Math.sin(2 * Math.PI * v.f * t + v.ph);
        d[i] *= (env / voices.length) * 0.9 + 0.1;
    }

    // 正規化
    let peak = 0;
    for (let i = 0; i < len; i++) peak = Math.max(peak, Math.abs(d[i]));
    if (peak > 0) for (let i = 0; i < len; i++) d[i] /= peak;

    return buf;
};

/** 雑音を鳴らし始める。level は 0(無音)〜1 */
export const startNoise = (level: number) => {
    if (level <= 0) return;
    const c = getCtx();
    if (!c) return;
    stopNoise();
    if (!babbleBuf) babbleBuf = buildBabble(c);

    noiseSrc = c.createBufferSource();
    noiseSrc.buffer = babbleBuf;
    noiseSrc.loop = true;
    noiseGain = c.createGain();
    noiseGain.gain.value = 0;
    noiseSrc.connect(noiseGain).connect(c.destination);
    noiseSrc.start();
    // 立ち上がりでビクッとしないよう 120ms でフェードイン
    noiseGain.gain.linearRampToValueAtTime(level, c.currentTime + 0.12);
};

export const stopNoise = () => {
    if (noiseGain && ctx) {
        try {
            noiseGain.gain.cancelScheduledValues(ctx.currentTime);
            noiseGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
        } catch { /* noop */ }
    }
    const src = noiseSrc;
    noiseSrc = null;
    noiseGain = null;
    if (src) {
        setTimeout(() => { try { src.stop(); src.disconnect(); } catch { /* noop */ } }, 120);
    }
};

// ---------------------------------------------------------------
// 音声(TTS)
// ---------------------------------------------------------------

let cachedVoice: SpeechSynthesisVoice | null = null;

/** 英語の声を1つ選ぶ。日本語音声で英文を読ませると訓練にならないので必ず en を掴む */
export const pickVoice = (): SpeechSynthesisVoice | null => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    if (cachedVoice) return cachedVoice;
    const vs = window.speechSynthesis.getVoices();
    if (!vs.length) return null;
    const prefer = [
        (v: SpeechSynthesisVoice) => v.lang === 'en-US' && /natural|google|samantha|aria/i.test(v.name),
        (v: SpeechSynthesisVoice) => v.lang === 'en-US',
        (v: SpeechSynthesisVoice) => v.lang.startsWith('en-'),
    ];
    for (const p of prefer) {
        const hit = vs.find(p);
        if (hit) { cachedVoice = hit; return hit; }
    }
    return null;
};

/** getVoices() が非同期で埋まるブラウザ向け。ready になったら呼ばれる */
export const onVoicesReady = (cb: () => void): (() => void) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return () => { };
    if (window.speechSynthesis.getVoices().length) { cb(); return () => { }; }
    const h = () => { cachedVoice = null; cb(); };
    window.speechSynthesis.addEventListener('voiceschanged', h);
    return () => window.speechSynthesis.removeEventListener('voiceschanged', h);
};

export interface PlayOpts {
    rate: number;
    noise: number;
    onStart?: () => void;
    onEnd?: () => void;
}

/** 1文を、指定の速度と雑音で鳴らす */
export const play = (text: string, opts: PlayOpts) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
        opts.onEnd?.();
        return;
    }
    window.speechSynthesis.cancel();
    stopNoise();

    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice();
    if (v) u.voice = v;
    u.lang = v?.lang || 'en-US';
    u.rate = opts.rate;
    u.pitch = 1;
    u.volume = 1;

    let done = false;
    const finish = () => {
        if (done) return;
        done = true;
        stopNoise();
        opts.onEnd?.();
    };
    u.onend = finish;
    u.onerror = finish;

    startNoise(opts.noise);
    opts.onStart?.();
    window.speechSynthesis.speak(u);

    // 一部の環境で onend が来ないので保険を張る(語数から所要時間を概算)
    const words = text.split(/\s+/).length;
    const estMs = (words / (2.6 * opts.rate)) * 1000 + 2500;
    setTimeout(finish, estMs);
};

export const stopAll = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
    stopNoise();
};

/** 雑音の量を 1-5 の目盛りに翻訳する(dBを騙って書かない。実測できないので) */
export const noiseDial = (noise: number): number => {
    if (noise <= 0) return 0;
    if (noise < 0.09) return 1;
    if (noise < 0.14) return 2;
    if (noise < 0.20) return 3;
    if (noise < 0.25) return 4;
    return 5;
};

export const supported = (): boolean =>
    typeof window !== 'undefined' && !!window.speechSynthesis;
