'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// ============================================================================
// TYPES
// ============================================================================
interface PracticePhrase {
  id: string;
  text: string;
  ipa: string;
  focusAreas: string[];
  japaneseHint?: string;
}

interface RecordingData {
  audioUrl: string;
  waveform: number[];
  spectrogram: number[][];
  pitchContour: number[];
  duration: number;
}

interface ComparisonResult {
  waveformSimilarity: number;
  pitchSimilarity: number;
  overallScore: number;
  feedback: string[];
}

// ============================================================================
// PRACTICE PHRASES
// ============================================================================
const PRACTICE_PHRASES: PracticePhrase[] = [
  { id: 'lr-1', text: "really", ipa: "/ˈriːəli/", focusAreas: ['L/R'], japaneseHint: "舌先を上の歯茎につけない" },
  { id: 'lr-2', text: "light and right", ipa: "/laɪt ənd raɪt/", focusAreas: ['L/R'], japaneseHint: "L: 舌先を歯茎に / R: 舌を巻く" },
  { id: 'th-1', text: "think", ipa: "/θɪŋk/", focusAreas: ['TH'], japaneseHint: "舌を歯の間に" },
  { id: 'th-2', text: "this and that", ipa: "/ðɪs ənd ðæt/", focusAreas: ['TH'], japaneseHint: "有声TH: 振動させる" },
  { id: 'vb-1', text: "very", ipa: "/ˈveri/", focusAreas: ['V/B'], japaneseHint: "下唇を上の歯に当てる" },
  { id: 'vowel-1', text: "ship and sheep", ipa: "/ʃɪp ənd ʃiːp/", focusAreas: ['Vowel'], japaneseHint: "短い vs 長い" },
  { id: 'sentence-1', text: "I really like it", ipa: "/aɪ ˈriːəli laɪk ɪt/", focusAreas: ['L/R'], japaneseHint: "really, like の L" },
];

// ============================================================================
// THEME
// ============================================================================
const theme = {
  bg: '#0a0a0a',
  bgSecondary: '#1a1a1a',
  bgTertiary: '#141414',
  text: '#fff',
  textSecondary: '#888',
  textMuted: '#666',
  border: '#1a1a1a',
  borderLight: '#333',
  accent: '#D4AF37',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  native: '#3b82f6', // Blue for native
  user: '#D4AF37',   // Gold for user
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function VoiceLabPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState<PracticePhrase>(PRACTICE_PHRASES[0]);

  // Recording states
  const [isRecording, setIsRecording] = useState(false);
  const [nativeRecording, setNativeRecording] = useState<RecordingData | null>(null);
  const [userRecording, setUserRecording] = useState<RecordingData | null>(null);
  const [isGeneratingNative, setIsGeneratingNative] = useState(false);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  // Playback states
  const [isPlaying, setIsPlaying] = useState<'native' | 'user' | 'compare' | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  // Audio refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  // Canvas refs
  const nativeWaveformRef = useRef<HTMLCanvasElement>(null);
  const userWaveformRef = useRef<HTMLCanvasElement>(null);
  const nativeSpectrogramRef = useRef<HTMLCanvasElement>(null);
  const userSpectrogramRef = useRef<HTMLCanvasElement>(null);
  const liveWaveformRef = useRef<HTMLCanvasElement>(null);

  // Animation
  const animationRef = useRef<number>(0);
  const recordingDataRef = useRef<{ waveform: number[], spectrogram: number[][], pitch: number[] }>({
    waveform: [], spectrogram: [], pitch: []
  });

  // Initialize audio
  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true }
      });
      streamRef.current = stream;

      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      mediaRecorderRef.current = recorder;

      setIsInitialized(true);
    } catch (err) {
      console.error('Failed to init audio:', err);
    }
  };

  // Generate native audio using TTS API (real audio file)
  const generateNativeAudio = async () => {
    setIsGeneratingNative(true);
    setNativeRecording(null);
    setComparison(null);

    try {
      // Try server-side TTS API first
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: selectedPhrase.text })
      });

      const data = await response.json();

      if (data.audioContent) {
        // Got real audio from API - decode and analyze it
        const audioData = atob(data.audioContent);
        const audioArray = new Uint8Array(audioData.length);
        for (let i = 0; i < audioData.length; i++) {
          audioArray[i] = audioData.charCodeAt(i);
        }
        const audioBlob = new Blob([audioArray], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Analyze the audio using Web Audio API
        const analysisResult = await analyzeAudioFile(audioUrl);

        setNativeRecording({
          audioUrl,
          waveform: analysisResult.waveform,
          spectrogram: analysisResult.spectrogram,
          pitchContour: analysisResult.pitch,
          duration: analysisResult.duration
        });

        // Draw visualizations
        setTimeout(() => {
          drawWaveform(nativeWaveformRef.current, analysisResult.waveform, theme.native);
          drawSpectrogram(nativeSpectrogramRef.current, analysisResult.spectrogram, theme.native);
        }, 100);
      } else {
        // Fallback to browser TTS with recording workaround
        await generateNativeWithBrowserTTS();
      }
    } catch (error) {
      console.error('TTS API error:', error);
      // Fallback to browser TTS
      await generateNativeWithBrowserTTS();
    }

    setIsGeneratingNative(false);
  };

  // Analyze audio file to extract waveform and spectrogram
  const analyzeAudioFile = async (audioUrl: string): Promise<{
    waveform: number[];
    spectrogram: number[][];
    pitch: number[];
    duration: number;
  }> => {
    const audioContext = new AudioContext();
    const response = await fetch(audioUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const channelData = audioBuffer.getChannelData(0);
    const sampleRate = audioBuffer.sampleRate;
    const duration = audioBuffer.duration * 1000;

    // Extract waveform (RMS per frame)
    const frameSize = Math.floor(sampleRate / 20); // 50ms frames
    const waveform: number[] = [];
    for (let i = 0; i < channelData.length; i += frameSize) {
      let sum = 0;
      const end = Math.min(i + frameSize, channelData.length);
      for (let j = i; j < end; j++) {
        sum += channelData[j] * channelData[j];
      }
      waveform.push(Math.sqrt(sum / (end - i)));
    }

    // Extract spectrogram using FFT
    const fftSize = 2048;
    const spectrogram: number[][] = [];
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = fftSize;

    // Process in chunks for spectrogram
    const hopSize = Math.floor(sampleRate / 20);
    for (let i = 0; i < channelData.length - fftSize; i += hopSize) {
      const frame = channelData.slice(i, i + fftSize);
      const spectrum = computeSpectrum(frame, fftSize);
      spectrogram.push(spectrum.slice(0, 128));
    }

    // Simple pitch extraction (fundamental frequency estimation)
    const pitch: number[] = [];
    for (let i = 0; i < spectrogram.length; i++) {
      const maxIdx = spectrogram[i].indexOf(Math.max(...spectrogram[i]));
      pitch.push((maxIdx * sampleRate) / fftSize);
    }

    audioContext.close();

    return {
      waveform: normalizeArray(waveform),
      spectrogram,
      pitch,
      duration
    };
  };

  // Simple FFT spectrum computation
  const computeSpectrum = (samples: Float32Array, fftSize: number): number[] => {
    // Apply Hanning window
    const windowed = new Float32Array(fftSize);
    for (let i = 0; i < fftSize; i++) {
      const window = 0.5 * (1 - Math.cos(2 * Math.PI * i / fftSize));
      windowed[i] = (samples[i] || 0) * window;
    }

    // Simple DFT (not optimal but works for our purpose)
    const spectrum: number[] = [];
    const halfSize = fftSize / 2;
    for (let k = 0; k < halfSize; k++) {
      let real = 0, imag = 0;
      for (let n = 0; n < fftSize; n++) {
        const angle = (2 * Math.PI * k * n) / fftSize;
        real += windowed[n] * Math.cos(angle);
        imag -= windowed[n] * Math.sin(angle);
      }
      spectrum.push(Math.sqrt(real * real + imag * imag));
    }

    // Normalize to 0-255 range
    const max = Math.max(...spectrum);
    return spectrum.map(v => Math.min(255, (v / max) * 255));
  };

  // Fallback: Browser TTS (plays audio and user hears it)
  const generateNativeWithBrowserTTS = async () => {
    if (!('speechSynthesis' in window)) {
      alert('お使いのブラウザはText-to-Speechに対応していません');
      return;
    }

    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(selectedPhrase.text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;

      // Get voices
      let voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(v => v.lang === 'en-US') || voices[0];
      if (usVoice) utterance.voice = usVoice;

      // For browser TTS, we create synthetic waveform data based on text length
      const estimatedDuration = selectedPhrase.text.length * 80; // rough estimate
      const frames = Math.ceil(estimatedDuration / 50);
      const waveform = Array.from({ length: frames }, (_, i) => {
        // Create a natural-looking envelope
        const t = i / frames;
        return 0.3 + 0.4 * Math.sin(Math.PI * t) + 0.1 * Math.random();
      });
      const spectrogram = waveform.map(() => {
        return Array.from({ length: 128 }, (_, j) => {
          // Simulate speech frequency distribution (lower frequencies stronger)
          const freq = j / 128;
          return Math.max(0, 255 * (1 - freq * 1.5) * (0.5 + 0.5 * Math.random()));
        });
      });

      utterance.onend = () => {
        setNativeRecording({
          audioUrl: '', // No URL for browser TTS
          waveform: normalizeArray(waveform),
          spectrogram,
          pitchContour: waveform.map((_, i) => 150 + 50 * Math.sin(i / 5)),
          duration: estimatedDuration
        });

        setTimeout(() => {
          drawWaveform(nativeWaveformRef.current, normalizeArray(waveform), theme.native);
          drawSpectrogram(nativeSpectrogramRef.current, spectrogram, theme.native);
        }, 100);

        resolve();
      };

      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  };

  // Normalize array to 0-1 range
  const normalizeArray = (arr: number[]): number[] => {
    if (arr.length === 0) return [];
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min || 1;
    return arr.map(v => (v - min) / range);
  };

  // Draw waveform on canvas
  const drawWaveform = (canvas: HTMLCanvasElement | null, data: number[], color: string) => {
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = theme.bgTertiary;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const step = width / data.length;
    const midY = height / 2;

    for (let i = 0; i < data.length; i++) {
      const x = i * step;
      const amplitude = data[i] * (height * 0.8);

      ctx.moveTo(x, midY - amplitude / 2);
      ctx.lineTo(x, midY + amplitude / 2);
    }

    ctx.stroke();
  };

  // Draw spectrogram on canvas
  const drawSpectrogram = (canvas: HTMLCanvasElement | null, data: number[][], baseColor: string) => {
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = theme.bgTertiary;
    ctx.fillRect(0, 0, width, height);

    const colWidth = width / data.length;
    const rowHeight = height / (data[0]?.length || 64);

    // Parse base color for gradient
    const isBlue = baseColor === theme.native;

    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < (data[x]?.length || 0); y++) {
        const value = data[x][y] / 255;

        if (value > 0.05) {
          const alpha = Math.min(value * 1.5, 1);
          if (isBlue) {
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(212, 175, 55, ${alpha})`;
          }
          ctx.fillRect(x * colWidth, height - (y * rowHeight) - rowHeight, colWidth + 1, rowHeight + 1);
        }
      }
    }
  };

  // Start recording user audio
  const startRecording = () => {
    if (!mediaRecorderRef.current || !analyserRef.current) return;

    chunksRef.current = [];
    recordingDataRef.current = { waveform: [], spectrogram: [], pitch: [] };
    setUserRecording(null);
    setComparison(null);
    setIsRecording(true);

    mediaRecorderRef.current.start(100);

    // Start capturing audio data
    const captureData = () => {
      if (!isRecording && !mediaRecorderRef.current?.state.includes('recording')) return;

      const analyser = analyserRef.current!;
      const freqData = new Uint8Array(analyser.frequencyBinCount);
      const timeData = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(freqData);
      analyser.getByteTimeDomainData(timeData);

      // RMS
      let sum = 0;
      for (let i = 0; i < timeData.length; i++) {
        const sample = (timeData[i] - 128) / 128;
        sum += sample * sample;
      }
      recordingDataRef.current.waveform.push(Math.sqrt(sum / timeData.length));
      recordingDataRef.current.spectrogram.push(Array.from(freqData.slice(0, 128)));

      // Live waveform
      drawLiveWaveform(timeData);

      animationRef.current = requestAnimationFrame(captureData);
    };

    captureData();
  };

  // Draw live waveform during recording
  const drawLiveWaveform = (data: Uint8Array) => {
    const canvas = liveWaveformRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = theme.bgTertiary;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = theme.user;
    ctx.lineWidth = 2;
    ctx.beginPath();

    const sliceWidth = width / data.length;
    let x = 0;

    for (let i = 0; i < data.length; i++) {
      const v = data[i] / 128.0;
      const y = (v * height) / 2;

      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);

      x += sliceWidth;
    }

    ctx.stroke();
  };

  // Stop recording
  const stopRecording = async () => {
    if (!mediaRecorderRef.current) return;

    cancelAnimationFrame(animationRef.current);
    setIsRecording(false);

    mediaRecorderRef.current.stop();

    await new Promise(resolve => setTimeout(resolve, 200));

    const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
    const url = URL.createObjectURL(blob);

    const recording: RecordingData = {
      audioUrl: url,
      waveform: normalizeArray(recordingDataRef.current.waveform),
      spectrogram: recordingDataRef.current.spectrogram,
      pitchContour: recordingDataRef.current.pitch,
      duration: recordingDataRef.current.waveform.length * 50
    };

    setUserRecording(recording);

    // Draw user visualizations
    setTimeout(() => {
      drawWaveform(userWaveformRef.current, recording.waveform, theme.user);
      drawSpectrogram(userSpectrogramRef.current, recording.spectrogram, theme.user);
    }, 100);

    // Compare with native
    if (nativeRecording) {
      compareRecordings(nativeRecording, recording);
    }
  };

  // Compare native and user recordings
  const compareRecordings = (native: RecordingData, user: RecordingData) => {
    // Waveform similarity using correlation
    const waveformSim = calculateSimilarity(native.waveform, user.waveform);

    // Spectrogram similarity (average frequency distribution)
    const nativeAvgSpec = averageSpectrogram(native.spectrogram);
    const userAvgSpec = averageSpectrogram(user.spectrogram);
    const spectrogramSim = calculateSimilarity(nativeAvgSpec, userAvgSpec);

    // Duration similarity
    const durationRatio = Math.min(native.duration, user.duration) / Math.max(native.duration, user.duration);

    // Overall score
    const overall = Math.round((waveformSim * 30 + spectrogramSim * 50 + durationRatio * 20));

    // Generate feedback
    const feedback: string[] = [];

    if (durationRatio < 0.7) {
      feedback.push(user.duration < native.duration
        ? '話すスピードが速すぎる。もう少しゆっくり。'
        : '話すスピードが遅い。もう少し流暢に。');
    }

    if (spectrogramSim < 0.5) {
      feedback.push('音の周波数パターンが異なる。ネイティブ音声をよく聞いて真似てみて。');
    }

    if (waveformSim < 0.5) {
      feedback.push('抑揚（強弱）のパターンを意識して。');
    }

    if (overall >= 70) {
      feedback.push('良い！この調子で練習を続けて。');
    }

    setComparison({
      waveformSimilarity: Math.round(waveformSim * 100),
      pitchSimilarity: Math.round(spectrogramSim * 100),
      overallScore: overall,
      feedback
    });
  };

  // Calculate similarity between two arrays
  const calculateSimilarity = (a: number[], b: number[]): number => {
    if (a.length === 0 || b.length === 0) return 0;

    // Resample to same length
    const len = Math.min(a.length, b.length, 100);
    const resampleA = resample(a, len);
    const resampleB = resample(b, len);

    // Correlation coefficient
    let sumA = 0, sumB = 0, sumAB = 0, sumA2 = 0, sumB2 = 0;
    for (let i = 0; i < len; i++) {
      sumA += resampleA[i];
      sumB += resampleB[i];
      sumAB += resampleA[i] * resampleB[i];
      sumA2 += resampleA[i] * resampleA[i];
      sumB2 += resampleB[i] * resampleB[i];
    }

    const n = len;
    const num = n * sumAB - sumA * sumB;
    const den = Math.sqrt((n * sumA2 - sumA * sumA) * (n * sumB2 - sumB * sumB));

    if (den === 0) return 0;
    return Math.max(0, (num / den + 1) / 2); // Normalize to 0-1
  };

  // Resample array to target length
  const resample = (arr: number[], targetLen: number): number[] => {
    const result: number[] = [];
    const step = arr.length / targetLen;
    for (let i = 0; i < targetLen; i++) {
      const idx = Math.floor(i * step);
      result.push(arr[idx] || 0);
    }
    return result;
  };

  // Average spectrogram across time
  const averageSpectrogram = (spec: number[][]): number[] => {
    if (spec.length === 0) return [];
    const len = spec[0]?.length || 0;
    const result = new Array(len).fill(0);
    for (const frame of spec) {
      for (let i = 0; i < len; i++) {
        result[i] += frame[i] || 0;
      }
    }
    return result.map(v => v / spec.length);
  };

  // Play native audio
  const playNative = () => {
    if (nativeRecording?.audioUrl) {
      // Play from actual audio file
      setIsPlaying('native');
      const audio = new Audio(nativeRecording.audioUrl);
      audio.onended = () => setIsPlaying(null);
      audio.play();
    } else {
      // Fallback to browser TTS
      window.speechSynthesis.cancel();
      setIsPlaying('native');

      const utterance = new SpeechSynthesisUtterance(selectedPhrase.text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;

      const voices = window.speechSynthesis.getVoices();
      const usVoice = voices.find(v => v.lang === 'en-US');
      if (usVoice) utterance.voice = usVoice;

      utterance.onend = () => setIsPlaying(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Play user recording
  const playUser = () => {
    if (!userRecording?.audioUrl) return;
    setIsPlaying('user');

    const audio = new Audio(userRecording.audioUrl);
    audio.onended = () => setIsPlaying(null);
    audio.play();
  };

  // Compare playback: Native -> User -> Native
  const playComparison = async () => {
    if (!userRecording?.audioUrl) return;
    setIsPlaying('compare');

    const playNativeOnce = (): Promise<void> => {
      return new Promise((resolve) => {
        if (nativeRecording?.audioUrl) {
          const audio = new Audio(nativeRecording.audioUrl);
          audio.onended = () => resolve();
          audio.play();
        } else {
          const utterance = new SpeechSynthesisUtterance(selectedPhrase.text);
          utterance.lang = 'en-US';
          utterance.rate = 0.85;
          utterance.onend = () => resolve();
          window.speechSynthesis.speak(utterance);
        }
      });
    };

    // Play native
    await playNativeOnce();
    await new Promise(r => setTimeout(r, 500));

    // Play user
    await new Promise<void>(resolve => {
      const audio = new Audio(userRecording.audioUrl);
      audio.onended = () => resolve();
      audio.play();
    });

    await new Promise(r => setTimeout(r, 500));

    // Play native again
    await playNativeOnce();

    setIsPlaying(null);
  };

  // Reset for new phrase
  useEffect(() => {
    setNativeRecording(null);
    setUserRecording(null);
    setComparison(null);
  }, [selectedPhrase]);

  // ============================================================================
  // RENDER
  // ============================================================================

  if (!isInitialized) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
        <header style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}` }}>
          <Link href="/english" style={{ color: theme.textMuted, textDecoration: 'none' }}>Back</Link>
        </header>
        <div style={{ padding: '60px 24px', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%',
            backgroundColor: theme.bgSecondary, margin: '0 auto 32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `3px solid ${theme.accent}`
          }}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill={theme.accent}>
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
            </svg>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>Pronunciation Lab</h1>
          <p style={{ color: theme.textMuted, marginBottom: '32px', lineHeight: '1.7' }}>
            ネイティブ音声と自分の発音を比較。波形とスペクトログラムで違いを可視化。
          </p>
          <button
            onClick={initializeAudio}
            style={{
              backgroundColor: theme.accent, color: '#000', border: 'none',
              padding: '18px 40px', borderRadius: '12px', fontSize: '18px',
              fontWeight: '600', cursor: 'pointer', width: '100%'
            }}
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.bg, color: theme.text }}>
      {/* Header */}
      <header style={{
        padding: '16px 24px', borderBottom: `1px solid ${theme.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <Link href="/english" style={{ color: theme.textMuted, textDecoration: 'none' }}>Back</Link>
        <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0, color: theme.accent }}>Pronunciation Lab</h1>
        <div style={{ width: '40px' }} />
      </header>

      <main style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
        {/* Phrase Selection */}
        <div style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px'
        }}>
          {PRACTICE_PHRASES.map(phrase => (
            <button
              key={phrase.id}
              onClick={() => setSelectedPhrase(phrase)}
              style={{
                padding: '10px 16px',
                backgroundColor: selectedPhrase.id === phrase.id ? theme.accent : theme.bgSecondary,
                color: selectedPhrase.id === phrase.id ? '#000' : theme.textMuted,
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontSize: '14px', fontWeight: selectedPhrase.id === phrase.id ? '600' : '400'
              }}
            >
              {phrase.text}
            </button>
          ))}
        </div>

        {/* Current Phrase */}
        <div style={{
          backgroundColor: theme.bgSecondary, borderRadius: '16px',
          padding: '24px', marginBottom: '24px', textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            {selectedPhrase.text}
          </div>
          <div style={{ fontSize: '18px', color: theme.accent, fontFamily: 'monospace', marginBottom: '8px' }}>
            {selectedPhrase.ipa}
          </div>
          {selectedPhrase.japaneseHint && (
            <div style={{ fontSize: '14px', color: theme.textSecondary }}>
              {selectedPhrase.japaneseHint}
            </div>
          )}
        </div>

        {/* Step 1: Generate Native */}
        <div style={{
          backgroundColor: theme.bgSecondary, borderRadius: '16px',
          padding: '24px', marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              backgroundColor: nativeRecording ? theme.success : theme.native,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: '700', fontSize: '14px'
            }}>
              {nativeRecording ? '✓' : '1'}
            </div>
            <div>
              <div style={{ fontWeight: '600' }}>Native Reference</div>
              <div style={{ fontSize: '13px', color: theme.textMuted }}>ネイティブ音声を生成</div>
            </div>
          </div>

          {!nativeRecording ? (
            <button
              onClick={generateNativeAudio}
              disabled={isGeneratingNative}
              style={{
                width: '100%', padding: '16px',
                backgroundColor: theme.native, color: '#fff',
                border: 'none', borderRadius: '12px',
                fontSize: '16px', fontWeight: '600', cursor: 'pointer',
                opacity: isGeneratingNative ? 0.6 : 1
              }}
            >
              {isGeneratingNative ? 'Generating...' : 'Generate Native Audio'}
            </button>
          ) : (
            <div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Waveform</div>
                <canvas ref={nativeWaveformRef} width={800} height={60} style={{
                  width: '100%', height: '60px', backgroundColor: theme.bgTertiary, borderRadius: '8px'
                }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Spectrogram</div>
                <canvas ref={nativeSpectrogramRef} width={800} height={80} style={{
                  width: '100%', height: '80px', backgroundColor: theme.bgTertiary, borderRadius: '8px'
                }} />
              </div>
              <button
                onClick={playNative}
                disabled={isPlaying !== null}
                style={{
                  padding: '12px 24px', backgroundColor: 'transparent',
                  color: theme.native, border: `2px solid ${theme.native}`,
                  borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
                }}
              >
                {isPlaying === 'native' ? 'Playing...' : 'Play Native'}
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Record User */}
        {nativeRecording && (
          <div style={{
            backgroundColor: theme.bgSecondary, borderRadius: '16px',
            padding: '24px', marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: userRecording ? theme.success : theme.user,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#000', fontWeight: '700', fontSize: '14px'
              }}>
                {userRecording ? '✓' : '2'}
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>Your Recording</div>
                <div style={{ fontSize: '13px', color: theme.textMuted }}>あなたの発音を録音</div>
              </div>
            </div>

            {/* Live waveform during recording */}
            {isRecording && (
              <div style={{ marginBottom: '16px' }}>
                <canvas ref={liveWaveformRef} width={800} height={80} style={{
                  width: '100%', height: '80px', backgroundColor: theme.bgTertiary, borderRadius: '8px'
                }} />
              </div>
            )}

            {!userRecording ? (
              <button
                onClick={isRecording ? stopRecording : startRecording}
                style={{
                  width: '100%', padding: '20px',
                  backgroundColor: isRecording ? theme.error : theme.user,
                  color: isRecording ? '#fff' : '#000',
                  border: 'none', borderRadius: '12px',
                  fontSize: '18px', fontWeight: '700', cursor: 'pointer'
                }}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            ) : (
              <div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Your Waveform</div>
                  <canvas ref={userWaveformRef} width={800} height={60} style={{
                    width: '100%', height: '60px', backgroundColor: theme.bgTertiary, borderRadius: '8px'
                  }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Your Spectrogram</div>
                  <canvas ref={userSpectrogramRef} width={800} height={80} style={{
                    width: '100%', height: '80px', backgroundColor: theme.bgTertiary, borderRadius: '8px'
                  }} />
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={playUser}
                    disabled={isPlaying !== null}
                    style={{
                      padding: '12px 24px', backgroundColor: 'transparent',
                      color: theme.user, border: `2px solid ${theme.user}`,
                      borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
                    }}
                  >
                    {isPlaying === 'user' ? 'Playing...' : 'Play Yours'}
                  </button>
                  <button
                    onClick={() => { setUserRecording(null); setComparison(null); }}
                    style={{
                      padding: '12px 24px', backgroundColor: 'transparent',
                      color: theme.textMuted, border: `1px solid ${theme.borderLight}`,
                      borderRadius: '8px', cursor: 'pointer'
                    }}
                  >
                    Re-record
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Comparison */}
        {comparison && (
          <div style={{
            backgroundColor: theme.bgSecondary, borderRadius: '16px',
            padding: '24px', marginBottom: '24px'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: theme.success,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: '700', fontSize: '14px'
              }}>
                3
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>Comparison Result</div>
                <div style={{ fontSize: '13px', color: theme.textMuted }}>ネイティブとの比較</div>
              </div>
            </div>

            {/* Score */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                fontSize: '72px', fontWeight: '800',
                color: comparison.overallScore >= 70 ? theme.success :
                       comparison.overallScore >= 50 ? theme.warning : theme.error
              }}>
                {comparison.overallScore}
              </div>
              <div style={{ fontSize: '14px', color: theme.textMuted }}>Overall Match</div>
            </div>

            {/* Detail Scores */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px'
            }}>
              <div style={{
                padding: '16px', backgroundColor: theme.bgTertiary, borderRadius: '12px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: theme.native }}>
                  {comparison.waveformSimilarity}%
                </div>
                <div style={{ fontSize: '12px', color: theme.textMuted }}>Rhythm Match</div>
              </div>
              <div style={{
                padding: '16px', backgroundColor: theme.bgTertiary, borderRadius: '12px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: theme.user }}>
                  {comparison.pitchSimilarity}%
                </div>
                <div style={{ fontSize: '12px', color: theme.textMuted }}>Sound Match</div>
              </div>
            </div>

            {/* Side-by-Side Visual Comparison */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '12px', textAlign: 'center' }}>
                Visual Comparison (Blue: Native / Gold: You)
              </div>

              {/* Overlaid Waveforms */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Waveform Overlay</div>
                <canvas
                  ref={(canvas) => {
                    if (canvas && nativeRecording && userRecording) {
                      const ctx = canvas.getContext('2d');
                      if (!ctx) return;
                      const w = canvas.width, h = canvas.height;
                      ctx.fillStyle = theme.bgTertiary;
                      ctx.fillRect(0, 0, w, h);

                      // Draw native waveform (blue)
                      const native = nativeRecording.waveform;
                      const user = userRecording.waveform;
                      const maxLen = Math.max(native.length, user.length);

                      ctx.globalAlpha = 0.7;

                      // Native
                      ctx.strokeStyle = theme.native;
                      ctx.lineWidth = 2;
                      ctx.beginPath();
                      for (let i = 0; i < native.length; i++) {
                        const x = (i / maxLen) * w;
                        const amp = native[i] * (h * 0.8);
                        ctx.moveTo(x, h / 2 - amp / 2);
                        ctx.lineTo(x, h / 2 + amp / 2);
                      }
                      ctx.stroke();

                      // User
                      ctx.strokeStyle = theme.user;
                      ctx.beginPath();
                      for (let i = 0; i < user.length; i++) {
                        const x = (i / maxLen) * w;
                        const amp = user[i] * (h * 0.8);
                        ctx.moveTo(x, h / 2 - amp / 2);
                        ctx.lineTo(x, h / 2 + amp / 2);
                      }
                      ctx.stroke();
                      ctx.globalAlpha = 1;
                    }
                  }}
                  width={800}
                  height={80}
                  style={{ width: '100%', height: '80px', backgroundColor: theme.bgTertiary, borderRadius: '8px' }}
                />
              </div>

              {/* Side-by-Side Spectrograms */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '11px', color: theme.native, marginBottom: '4px', textAlign: 'center' }}>Native</div>
                  <canvas
                    ref={(canvas) => {
                      if (canvas && nativeRecording) {
                        drawSpectrogram(canvas, nativeRecording.spectrogram, theme.native);
                      }
                    }}
                    width={400}
                    height={100}
                    style={{ width: '100%', height: '100px', backgroundColor: theme.bgTertiary, borderRadius: '8px' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: theme.user, marginBottom: '4px', textAlign: 'center' }}>You</div>
                  <canvas
                    ref={(canvas) => {
                      if (canvas && userRecording) {
                        drawSpectrogram(canvas, userRecording.spectrogram, theme.user);
                      }
                    }}
                    width={400}
                    height={100}
                    style={{ width: '100%', height: '100px', backgroundColor: theme.bgTertiary, borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>

            {/* Feedback */}
            {comparison.feedback.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                {comparison.feedback.map((fb, i) => (
                  <div key={i} style={{
                    padding: '12px 16px',
                    backgroundColor: theme.bgTertiary,
                    borderRadius: '8px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    borderLeft: `3px solid ${i === comparison.feedback.length - 1 && comparison.overallScore >= 70 ? theme.success : theme.warning}`
                  }}>
                    {fb}
                  </div>
                ))}
              </div>
            )}

            {/* Compare Playback */}
            <button
              onClick={playComparison}
              disabled={isPlaying !== null}
              style={{
                width: '100%', padding: '16px',
                backgroundColor: theme.accent, color: '#000',
                border: 'none', borderRadius: '12px',
                fontSize: '16px', fontWeight: '700', cursor: 'pointer'
              }}
            >
              {isPlaying === 'compare' ? 'Playing Native → You → Native...' : 'Compare: Native → You → Native'}
            </button>
          </div>
        )}

        {/* Legend */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '24px',
          padding: '16px', color: theme.textMuted, fontSize: '13px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: theme.native, borderRadius: '4px' }} />
            <span>Native</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '16px', height: '16px', backgroundColor: theme.user, borderRadius: '4px' }} />
            <span>You</span>
          </div>
        </div>
      </main>
    </div>
  );
}
