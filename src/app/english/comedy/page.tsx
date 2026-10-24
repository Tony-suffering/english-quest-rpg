'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { STORIES, SPEAKER_META, type Speaker, type Story } from '@/data/english/stories';

const GOLD = '#D4AF37';
const INK = '#1C1917';

// 多声設定: ナレーター/とにお=米、先生=英。pitch/rateで声色を変える。
const VOICE_CFG: Record<Speaker, { lang: string; pitch: number; rate: number }> = {
    narrator: { lang: 'en-US', pitch: 1.0, rate: 1.0 },
    tonio:    { lang: 'en-US', pitch: 1.12, rate: 1.06 },
    teacher:  { lang: 'en-GB', pitch: 0.82, rate: 0.92 },
};

export default function ComedyPage() {
    const story: Story = STORIES[0];
    const [isMobile, setIsMobile] = useState(false);
    const [showJa, setShowJa] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [current, setCurrent] = useState(-1);

    const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
    const stoppedRef = useRef(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);

        const loadVoices = () => { voicesRef.current = window.speechSynthesis?.getVoices() || []; };
        loadVoices();
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        return () => {
            window.removeEventListener('resize', check);
            if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel();
        };
    }, []);

    const pickVoice = useCallback((lang: string): SpeechSynthesisVoice | null => {
        const vs = voicesRef.current;
        if (!vs.length) return null;
        const exact = vs.find(v => v.lang === lang || v.lang === lang.replace('-', '_'));
        if (exact) return exact;
        const base = lang.split('-')[0];
        return vs.find(v => v.lang.toLowerCase().startsWith(base)) || null;
    }, []);

    const utter = useCallback((seg: { speaker: Speaker; en: string }) => {
        const cfg = VOICE_CFG[seg.speaker];
        const u = new SpeechSynthesisUtterance(seg.en);
        u.lang = cfg.lang; u.pitch = cfg.pitch; u.rate = cfg.rate;
        const v = pickVoice(cfg.lang);
        if (v) u.voice = v;
        return u;
    }, [pickVoice]);

    const stop = useCallback(() => {
        stoppedRef.current = true;
        window.speechSynthesis.cancel();
        setPlaying(false);
        setCurrent(-1);
    }, []);

    const playFrom = useCallback((i: number) => {
        if (stoppedRef.current || i >= story.segments.length) {
            setPlaying(false); setCurrent(-1); return;
        }
        setCurrent(i);
        const u = utter(story.segments[i]);
        u.onend = () => { if (!stoppedRef.current) playFrom(i + 1); };
        u.onerror = () => { if (!stoppedRef.current) playFrom(i + 1); };
        window.speechSynthesis.speak(u);
    }, [story.segments, utter]);

    const playAll = useCallback(() => {
        window.speechSynthesis.cancel();
        stoppedRef.current = false;
        setPlaying(true);
        playFrom(0);
    }, [playFrom]);

    const playOne = useCallback((i: number) => {
        window.speechSynthesis.cancel();
        stoppedRef.current = true; // 連続再生は止める
        setPlaying(false);
        setCurrent(i);
        const u = utter(story.segments[i]);
        u.onend = () => setCurrent(-1);
        window.speechSynthesis.speak(u);
    }, [story.segments, utter]);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#FAF8F2', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
            {/* HEADER */}
            <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #ECE7DA', padding: isMobile ? '16px' : '22px 32px' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#C9C0AC', letterSpacing: '2px', marginBottom: '4px' }}>DMM COMEDY ・ 多声TTS</div>
                    <h1 style={{ margin: 0, fontSize: isMobile ? '22px' : '28px', fontWeight: '900', color: INK, letterSpacing: '-0.5px' }}>{story.title}</h1>
                    <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#A8A29E' }}>{story.subtitle}</p>
                </div>
            </div>

            {/* CONTROL BAR */}
            <div style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#FAF8F2', borderBottom: '1px solid #ECE7DA' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '12px 16px' : '14px 32px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {!playing ? (
                        <button onClick={playAll} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: INK, color: '#fff', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                            全部読み上げる (多声TTS)
                        </button>
                    ) : (
                        <button onClick={stop} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#DC2626', color: '#fff', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}>
                            停止
                        </button>
                    )}
                    <button onClick={() => setShowJa(v => !v)} style={{ padding: '12px 16px', borderRadius: '12px', border: '1px solid #ECE7DA', background: '#fff', color: '#57534E', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                        {showJa ? '日本語OFF' : '日本語ON'}
                    </button>
                </div>
                <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '0 16px 10px' : '0 32px 10px', display: 'flex', gap: '12px' }}>
                    {(Object.keys(SPEAKER_META) as Speaker[]).map(sp => (
                        <span key={sp} style={{ fontSize: '10px', fontWeight: '700', color: SPEAKER_META[sp].color }}>
                            {SPEAKER_META[sp].label}{sp === 'teacher' ? ' (UK)' : sp === 'narrator' ? '' : ' (US)'}
                        </span>
                    ))}
                </div>
            </div>

            {/* STORY */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '14px 16px' : '20px 32px' }}>
                {story.segments.map((seg, i) => {
                    const meta = SPEAKER_META[seg.speaker];
                    const active = current === i;
                    return (
                        <div key={i} onClick={() => playOne(i)} style={{
                            display: 'flex', gap: '10px', alignItems: 'flex-start',
                            padding: isMobile ? '10px 10px' : '12px 14px', marginBottom: '6px',
                            borderRadius: '12px', cursor: 'pointer',
                            backgroundColor: active ? meta.bg : 'transparent',
                            border: active ? `1px solid ${meta.color}55` : '1px solid transparent',
                            transition: 'background-color 0.2s',
                        }}>
                            <span style={{ flexShrink: 0, width: '64px', fontSize: '9px', fontWeight: '800', color: meta.color, letterSpacing: '0.5px', paddingTop: '4px' }}>
                                {meta.label}
                            </span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: isMobile ? '16px' : '18px', lineHeight: 1.7, color: active ? INK : '#3A3530', fontWeight: active ? 600 : 400 }}>
                                    {seg.en}
                                </p>
                                {showJa && <p style={{ margin: '5px 0 0', fontSize: '12px', lineHeight: 1.6, color: '#A8A29E' }}>{seg.ja}</p>}
                            </div>
                        </div>
                    );
                })}
                <p style={{ fontSize: '11px', color: '#B8AE92', textAlign: 'center', marginTop: '8px' }}>
                    各行をタップ = その一文だけ再生。声を聞きながら、声に出して真似してみて。
                </p>
            </div>

            {/* EXPRESSIONS */}
            <div style={{ maxWidth: '760px', margin: '0 auto', padding: isMobile ? '10px 16px 50px' : '14px 32px 60px' }}>
                <div style={{ fontSize: '11px', fontWeight: '800', color: GOLD, letterSpacing: '1px', marginBottom: '12px' }}>使えるフレーズ {story.expressions.length}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {story.expressions.map((e, i) => (
                        <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #ECE7DA', borderRadius: '12px', padding: isMobile ? '12px 14px' : '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '8px' }}>
                                <span style={{ fontSize: isMobile ? '15px' : '16px', fontWeight: '800', color: INK }}>{e.en}</span>
                                <span style={{ fontSize: '12px', color: '#78716C', flexShrink: 0 }}>{e.ja}</span>
                            </div>
                            <p style={{ margin: '6px 0 0', fontSize: '12px', lineHeight: 1.6, color: '#A8A29E' }}>{e.note}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
