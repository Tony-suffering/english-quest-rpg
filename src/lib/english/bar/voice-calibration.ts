/**
 * Silent Bartender — voice calibration.
 *
 * Before a night starts, sample ambient audio for ~2 seconds to
 * estimate a noise floor. The actual game threshold is set ~25 units
 * above this floor, so ambient noise (fan, traffic) doesn't trigger
 * a bust.
 *
 * Usage:
 *   const threshold = await calibrateMicNoise();
 *   // threshold ~ typical 30-80 for quiet room, 100+ for noisy.
 */

const CALIBRATION_MS = 2000;
const MIN_THRESHOLD = 30;
const MAX_THRESHOLD = 140;
const HEADROOM = 25;

export async function calibrateMicNoise(): Promise<number> {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const AnyCtx = (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext);
        const ctx = new AnyCtx();
        const src = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 512;
        src.connect(analyser);
        const data = new Uint8Array(analyser.fftSize);

        const samples: number[] = [];
        const start = performance.now();

        await new Promise<void>((resolve) => {
            const tick = () => {
                analyser.getByteTimeDomainData(data);
                let peak = 0;
                for (let i = 0; i < data.length; i++) {
                    const v = Math.abs(data[i] - 128);
                    if (v > peak) peak = v;
                }
                samples.push(peak);
                if (performance.now() - start >= CALIBRATION_MS) resolve();
                else requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });

        stream.getTracks().forEach(t => t.stop());
        if (ctx.state !== 'closed') ctx.close().catch(() => {});

        // Use the 90th-percentile peak as the noise floor
        samples.sort((a, b) => a - b);
        const floor = samples[Math.floor(samples.length * 0.9)] ?? 0;
        const threshold = Math.min(MAX_THRESHOLD, Math.max(MIN_THRESHOLD, floor + HEADROOM));
        return threshold;
    } catch {
        return 35; // reasonable default
    }
}
