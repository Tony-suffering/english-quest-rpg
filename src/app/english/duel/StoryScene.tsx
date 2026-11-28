'use client';
// WORD DUEL の本編の会話場面。塔の階の前後にはさまる(台詞は src/data/english/duel-story.json、絵は public/duel/story)。
// 本人(2026-11-28)「ストーリーラインをちゃんと作って。いつどこで挟むのとか、対戦カードゲームでやってるでしょ」。
// 作り: 章の背景がゆっくり動く。話している人物が左右に立ち、話していないほうは暗くなる。台詞は1文字ずつ出る。画面を押すと次へ。
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type StoryLine = { w: string; ja: string; en: string };
export type StoryData = { id: string; floor: number; when: string; bg: string; title: [string, string]; lines: StoryLine[] };
export type StoryCast = Record<string, { ja: string; en: string; art: string }>;

const CSS = `
@keyframes duelstory-in { 0% { opacity: 0; } 100% { opacity: 1; } }
@keyframes duelstory-drift { 0% { transform: scale(1.06) translate3d(-1%, 0, 0); } 100% { transform: scale(1.16) translate3d(1.5%, -1%, 0); } }
@keyframes duelstory-rise { 0% { opacity: 0; transform: translateY(26px); } 100% { opacity: 1; transform: none; } }
@keyframes duelstory-title { 0% { opacity: 0; letter-spacing: .6em; filter: blur(8px); } 100% { opacity: 1; letter-spacing: .22em; filter: blur(0); } }
@keyframes duelstory-next { 0%, 100% { transform: translateY(0); opacity: .5; } 50% { transform: translateY(5px); opacity: 1; } }
@keyframes duelstory-mote { 0% { transform: translate3d(0, 0, 0); opacity: 0; } 12% { opacity: .9; } 100% { transform: translate3d(var(--dx), -110vh, 0); opacity: 0; } }
`;

export default function StoryScene({ scene, cast, lang, onDone, tick, sound }: { scene: StoryData; cast: StoryCast; lang: 'ja' | 'en'; onDone: () => void; tick?: () => void; sound?: boolean }) {
    const [i, setI] = useState(0);
    const [shown, setShown] = useState(0);          // いま出ている文字数
    const [left, setLeft] = useState<string | null>(null);     // 左に立っている人物(主人公)
    const [right, setRight] = useState<string | null>(null);   // 右に立っている人物(相棒かボス)
    const timer = useRef<number | null>(null);
    const music = useRef<HTMLAudioElement | null>(null);
    const voice = useRef<HTMLAudioElement | null>(null);
    // 曲: 会話のあいだは、静かな曲を流す。結末の場面は、口を開く行から、立ち上がる曲に替える
    useEffect(() => {
        if (!sound) return;
        try { const a = new Audio('/duel/opening/bed.mp3'); a.loop = true; a.volume = 0.2; music.current = a; a.play().catch(() => { /* 鳴らせない端末 */ }); } catch { /* 無い端末 */ }
        return () => { music.current?.pause(); music.current = null; voice.current?.pause(); };
    }, [sound]);
    const line = scene.lines[i];
    const text = lang === 'ja' ? line.ja : line.en;
    const narr = line.w === 'narr';
    const done = shown >= text.length;
    const title = i === 0 && narr && scene.lines.length > 1 && /^(第|Chapter)/.test(text);

    useEffect(() => {
        setShown(0);
        if (line.w === 'you') setLeft('you'); else if (line.w !== 'narr') setRight(line.w);
        // 声(日本語だけ)。その行の声が無ければ、何も鳴らない
        voice.current?.pause();
        if (sound && lang === 'ja') { try { const v = new Audio(`/duel/story/voice/${scene.id}-${i}.mp3`); voice.current = v; v.play().catch(() => { /* 声が無い行 */ }); } catch { /* 無い端末 */ } }
        if (sound && scene.id === 'ending' && i === 3) { music.current?.pause(); try { const r = new Audio('/duel/opening/rise.mp3'); r.volume = 0.5; music.current = r; r.play().catch(() => { /* 鳴らせない端末 */ }); } catch { /* 無い端末 */ } }
        let n = 0;
        const id = window.setInterval(() => {
            n += 1;
            setShown(n);
            if (n % 3 === 1) tick?.();
            if (n >= text.length) window.clearInterval(id);
        }, lang === 'ja' ? 34 : 18);
        timer.current = id;
        return () => window.clearInterval(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i, scene.id]);

    const next = () => {
        if (!done) { if (timer.current) window.clearInterval(timer.current); setShown(text.length); return; }
        if (i + 1 < scene.lines.length) setI(i + 1); else onDone();
    };
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); next(); } };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    });

    const serif = 'Georgia, "Yu Mincho", "Hiragino Mincho ProN", "Noto Serif JP", serif';
    const bgSrc = scene.bg === 'end' ? '/duel/opening/meeting.webp' : `/duel/story/${scene.bg}.webp`;
    const figure = (who: string | null, side: 'left' | 'right') => {
        if (!who || !cast[who]?.art) return null;
        const active = line.w === who;
        // 額に入った立ち絵。台詞の箱のすぐ上に立つ。話しているほうが明るく大きい
        return (
            <div key={who} style={{ position: 'absolute', [side]: 'max(3%, calc(50% - 450px))', bottom: 'calc(max(4%, 14px) + clamp(110px, 21vh, 170px) + 34px)', height: 'min(56vh, 480px)', aspectRatio: '2 / 3', borderRadius: 14, overflow: 'hidden',
                border: active ? '2px solid #F6C85F' : '1px solid rgba(255,255,255,0.25)', boxShadow: active ? '0 18px 40px rgba(0,0,0,0.7), 0 0 34px rgba(246,200,95,0.45)' : '0 10px 24px rgba(0,0,0,0.6)',
                transform: active ? 'scale(1)' : 'scale(0.9)', transformOrigin: side === 'left' ? 'bottom left' : 'bottom right', filter: active ? 'none' : 'brightness(0.42) saturate(0.6)', opacity: narr ? 0.55 : 1,
                transition: 'transform .35s cubic-bezier(.2,.8,.2,1), filter .35s ease, opacity .35s ease, box-shadow .35s ease', animation: 'duelstory-rise .6s cubic-bezier(.2,.8,.2,1) both', pointerEvents: 'none', background: '#0B0920' } as React.CSSProperties}>
                <img src={`/duel/story/${cast[who].art}.webp`} alt="" draggable={false} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 12%', transform: side === 'left' ? 'scaleX(-1)' : 'none', display: 'block' }} />
            </div>
        );
    };

    return createPortal(
        <div data-story={scene.id} data-line={i} onClick={next} style={{ position: 'fixed', inset: 0, zIndex: 100001, overflow: 'hidden', background: '#05040A', color: '#fff', cursor: 'pointer', userSelect: 'none' }}>
            <style>{CSS}</style>
            <div style={{ position: 'absolute', inset: '-3%', backgroundImage: `url(${bgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', animation: 'duelstory-drift 40s ease-in-out infinite alternate', filter: narr && !title ? 'brightness(0.8)' : 'brightness(0.62)', transition: 'filter .6s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,4,10,0.5) 0%, rgba(5,4,10,0) 26%, rgba(5,4,10,0.2) 55%, rgba(5,4,10,0.94) 100%)', pointerEvents: 'none' }} />
            {Array.from({ length: 16 }).map((_, k) => (
                <span key={k} style={{ position: 'absolute', left: `${(k * 41 + 7) % 100}%`, bottom: -10, width: 2 + (k % 3), height: 2 + (k % 3), borderRadius: '50%', background: '#F6C85F', boxShadow: '0 0 8px rgba(246,200,95,0.9)', opacity: 0, pointerEvents: 'none', ['--dx' as string]: `${((k * 23) % 80) - 40}px`, animation: `duelstory-mote ${9 + (k % 5) * 2}s linear ${-((k * 1.7) % 9)}s infinite` } as React.CSSProperties} />
            ))}

            {!title && figure(left, 'left')}
            {!title && figure(right, 'right')}

            {/* 上: どの場面か */}
            <div style={{ position: 'absolute', left: 16, top: 14, fontSize: 12, fontWeight: 800, letterSpacing: 3, color: '#F6C85F', textShadow: '0 1px 4px #000' }}>{scene.floor > 0 ? (lang === 'ja' ? `塔 ${scene.floor}階` : `FLOOR ${scene.floor}`) : (lang === 'ja' ? '塔の入口' : 'THE GATE')}<span style={{ color: 'rgba(255,255,255,0.75)', marginLeft: 12, letterSpacing: 1 }}>{scene.title[lang === 'ja' ? 0 : 1]}</span></div>
            <button data-act="story-skip" onClick={e => { e.stopPropagation(); onDone(); }} style={{ position: 'absolute', right: 14, top: 10, border: '1px solid rgba(255,255,255,0.35)', background: 'rgba(0,0,0,0.4)', color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: 700, letterSpacing: 2, borderRadius: 999, padding: '5px 14px', cursor: 'pointer' }}>{lang === 'ja' ? '飛ばす' : 'Skip'}</button>

            {title ? (
                // 章の題
                <div key={`t${i}`} style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 20 }}>
                    <div style={{ fontFamily: serif, fontWeight: 900, fontSize: 'clamp(26px, 5.4vw, 60px)', color: '#FFF6C8', textShadow: '0 4px 0 rgba(0,0,0,0.6), 0 0 30px rgba(246,200,95,0.6)', animation: 'duelstory-title 1.6s cubic-bezier(.2,.7,.2,1) both' }}>{text}</div>
                    <div style={{ width: 'min(420px, 60vw)', height: 2, marginTop: 16, background: 'linear-gradient(90deg, transparent, #FFF6C8, transparent)', animation: 'duelstory-in 1.2s ease .8s both' }} />
                </div>
            ) : narr ? (
                // 地の文
                <div key={`n${i}`} style={{ position: 'absolute', left: '50%', bottom: 'max(9%, 34px)', transform: 'translateX(-50%)', width: 'min(880px, 92vw)', textAlign: 'center', fontFamily: serif, fontWeight: 700, fontSize: 'clamp(17px, 2.5vw, 27px)', lineHeight: 1.85, letterSpacing: 1, color: '#FFFDF2', textShadow: '0 2px 10px #000, 0 0 26px rgba(0,0,0,0.9)', minHeight: '3.7em' }}>
                    {text.slice(0, shown)}
                </div>
            ) : (
                // 台詞の箱
                <div key={`d${i}`} style={{ position: 'absolute', left: '50%', bottom: 'max(4%, 14px)', transform: 'translateX(-50%)', width: 'min(900px, 94vw)', boxSizing: 'border-box', padding: '26px 24px 20px', borderRadius: 16, background: 'linear-gradient(180deg, rgba(16,12,34,0.9), rgba(8,6,20,0.95))', border: '1px solid rgba(246,200,95,0.65)', boxShadow: '0 14px 40px rgba(0,0,0,0.7), inset 0 0 30px rgba(246,200,95,0.06)', minHeight: 'clamp(110px, 21vh, 170px)' }}>
                    <div style={{ position: 'absolute', top: -15, [line.w === 'you' ? 'left' : 'right']: 22, padding: '4px 18px', borderRadius: 8, fontFamily: serif, fontWeight: 900, fontSize: 'clamp(13px, 1.7vw, 17px)', letterSpacing: 2, color: '#2A1F08', background: 'linear-gradient(180deg, #FFF6C8, #F6C85F 55%, #B8941E)', border: '1px solid #fff', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' } as React.CSSProperties}>{cast[line.w]?.[lang] || ''}</div>
                    <div style={{ fontSize: 'clamp(16px, 2.2vw, 23px)', lineHeight: 1.8, fontWeight: 600, color: '#FFFDF2' }}>{text.slice(0, shown)}</div>
                    {done && <div style={{ position: 'absolute', right: 18, bottom: 10, width: 0, height: 0, borderLeft: '7px solid transparent', borderRight: '7px solid transparent', borderTop: '10px solid #F6C85F', animation: 'duelstory-next .9s ease-in-out infinite' }} />}
                </div>
            )}
            <div style={{ position: 'absolute', left: '50%', bottom: 4, transform: 'translateX(-50%)', fontSize: 10, letterSpacing: 2, color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }}>{i + 1} / {scene.lines.length}</div>
        </div>,
        document.body,
    );
}
