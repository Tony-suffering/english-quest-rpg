'use client';

import { useEffect, useState } from 'react';
import { playCheckinCelebration, playQuestComplete, playTapPlay } from '@/lib/kaiwa-sounds';

// ─── とにお節 / 楽しく、やさしく、開く理由がある言葉。──────
// 脅しゼロ。怖さゼロ。ニヤッと笑って指が動く31本。

interface Quote {
    jp: string;
    en: string;
}

const QUOTES: Quote[] = [
    { jp: 'お前、今日もここ開いたのかよ。その時点でもう、今日は勝ちだ。',                       en: 'You opened the app again? That\'s a win already.' },
    { jp: '英語話せる自分、ちょっと見てみたくない？今日1フレーズ分、近づくぞ。',                en: 'Wanna meet the you who speaks English? You\'re one phrase closer today.' },
    { jp: '1フレーズ覚えるだけで、今日1日ちょっと得した気分になる。コスパ最強。',              en: 'Learn one phrase, feel a tiny bit richer all day. Best deal around.' },
    { jp: '外国人の友達ができる日、たぶん今日のこの10分から始まってる。',                      en: 'The day you make a foreign friend? Probably starts with today\'s ten minutes.' },
    { jp: '昨日の自分に「見とけよ」って言ってやれ。今日ちょっと前に出るぞ。',                  en: 'Tell yesterday-you to watch. You\'re about to pull ahead.' },
    { jp: '英語が話せると、海外で飲む酒が5倍うまくなる。それだけは保証する。',                 en: 'Beer abroad tastes 5x better when you can speak. Scientific fact.' },
    { jp: 'Netflix字幕なしで見れる日、ちゃんと来るぞ。それまで、今日の1個を積もう。',          en: 'Watching Netflix without subs is coming. Stack one phrase at a time.' },
    { jp: '笑いながら覚えたフレーズは、一生忘れない。だから今日は楽しんでけ。',                en: 'Phrases you learn laughing stick forever. So have fun today.' },
    { jp: '「I\'m fine, thank you」以外で答えられたら、もう上級者の仲間入りだ。',               en: 'Answer with anything besides "I\'m fine, thank you" and you\'re already advanced.' },
    { jp: '英語は裏切らない。やった分だけ返ってくる。こんな正直な相手、なかなかいないぞ。',   en: 'English doesn\'t lie — it pays back what you put in. Rare in this world.' },
    { jp: '今日のフレーズ1個は、3年後のどこかの飲み会で必ず効く。そういうもんだ。',            en: 'One phrase today will save you at some party three years from now. That\'s how it works.' },
    { jp: '通じればOK、通じなくても笑えばOK。英語、それくらいで十分だ。',                      en: 'If it lands, great. If it doesn\'t, just laugh. That\'s all English needs.' },
    { jp: 'お前が英語で何か言えた瞬間、相手の顔がパッと明るくなる。あれは最高だ。',            en: 'The moment you say something and their face lights up? Best feeling out there.' },
    { jp: '「あっ通じた！」のあの快感、今日もう一回取りに行こう。',                            en: 'That rush when it clicks — "wait, they got me!" — let\'s go chase that again today.' },
    { jp: '旅先で道を聞かれて英語で答えられたら、その日のお前は主人公だ。',                   en: 'Nail directions abroad in English and you\'re the main character that day.' },
    { jp: 'スラング1個覚えると、ネイティブと一気に距離が縮まる。今日1個、盗んでこう。',       en: 'One slang word closes the gap with natives fast. Steal one today.' },
    { jp: '今日のお前は、昨日のお前より確実に1ミリ前にいる。1ミリも積めば山になる。',          en: 'Today-you is one millimeter ahead of yesterday-you. Stack the mm, build a mountain.' },
    { jp: '英語を勉強する、じゃない。英語で遊ぶ。それだけ。',                                  en: 'You\'re not studying English. You\'re playing with it. That\'s it.' },
    { jp: '海外ドラマのセリフ、今日1個だけ盗もう。盗んだもん勝ち。',                           en: 'Steal one line from a Netflix show today. Theft is encouraged.' },
    { jp: '「英語喋れます」って言える日、想像以上に気持ちいいらしいぞ。行こう。',              en: '"Yeah, I speak English" — apparently it feels better than you\'d think. Let\'s go.' },
    { jp: '今日の10分は、未来の自分への仕送りだ。ちょっとだけ送っとこう。',                    en: 'Ten minutes today is an allowance to future-you. Drop a little in.' },
    { jp: '英語ができると、世界が2倍広がる。半分で満足するの、ちょっともったいなくない？',    en: 'English doubles the world. Settling for half would be a shame, no?' },
    { jp: '「喋れるようになりたい」って思えた時点で、お前にはもうセンスがある。',              en: 'Wanting to speak already means you\'ve got the instinct. That\'s the whole thing.' },
    { jp: '今日1フレーズ、ちゃんと口に出してみよう。脳じゃなくて口。それが魔法の呪文。',      en: 'Say one phrase out loud today. Not in your head — in your mouth. That\'s the spell.' },
    { jp: 'お前が今日ここに来た。それだけで今日はもう、勝ち確定。',                            en: 'You showed up. Today is already a W.' },
    { jp: '英語で誰かを笑わせられた日、国境が消える瞬間を味わえる。最高だぞ。',                en: 'Make someone laugh in English and borders just... vanish for a second. Try it.' },
    { jp: '今日覚えたフレーズ、明日誰かに使ってみろ。実況は頭の中でOK。',                     en: 'Use today\'s phrase on someone tomorrow. Narrate it in your head, nobody\'s watching.' },
    { jp: '続けてる奴はみんな知ってる——コツは、楽しむことだけ。マジでそれだけだ。',            en: 'Everyone who kept going knows the secret: just have fun. That\'s really it.' },
    { jp: '「あ、今のわかった！」が1日1回あれば、それで今日は大成功だ。',                      en: 'One "oh wait, I got that!" a day and today\'s a huge success.' },
    { jp: 'お前、ほんとによく続けてるよ。今日もちょっとだけ、一緒にやろう。',                  en: 'You\'ve really been showing up. Seriously, nice. Let\'s do a little bit together today.' },
    { jp: '英語は人生のおまけじゃない。人生の面白い部分を、今日から倍にするやつだ。',          en: 'English isn\'t a side quest. It doubles the fun part of your life. Starting today.' },
];

// ─── Date helpers ───────────────────────────────────────────

function getTodayStr(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function getDayOfYear(): number {
    const d = new Date();
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d.getTime() - start.getTime();
    return Math.floor(diff / 86400000);
}

const QUOTE_SHOWN_PREFIX = '365-quote-shown-';

export function isQuoteShownToday(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(QUOTE_SHOWN_PREFIX + getTodayStr()) !== null;
}

export function markQuoteShown(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(QUOTE_SHOWN_PREFIX + getTodayStr(), '1');
}

export function getTodayQuote(): Quote {
    return QUOTES[getDayOfYear() % QUOTES.length];
}

// ─── Particles (deterministic per render) ───────────────────

interface Particle {
    left: number;
    delay: number;
    duration: number;
    size: number;
    drift: number;
}

function makeParticles(count: number): Particle[] {
    return Array.from({ length: count }, (_, i) => ({
        left: (i * 37 + 13) % 100,
        delay: (i * 0.43) % 6,
        duration: 8 + ((i * 1.7) % 6),
        size: 2 + ((i * 0.9) % 3),
        drift: ((i * 11) % 40) - 20,
    }));
}

// ─── Component ──────────────────────────────────────────────

interface DailyQuoteProps {
    onStart: () => void;
    streak?: number;
}

export default function DailyQuote({ onStart, streak = 0 }: DailyQuoteProps) {
    const [phase, setPhase] = useState(0);
    const [quote] = useState<Quote>(() => getTodayQuote());
    const [particles] = useState<Particle[]>(() => makeParticles(24));

    useEffect(() => {
        const t1 = setTimeout(() => setPhase(1), 120);   // bg + orb fade in
        const t2 = setTimeout(() => {                     // label appears
            setPhase(2);
            try { playQuestComplete(); } catch {}
        }, 700);
        const t3 = setTimeout(() => {                     // ring + quote reveal (big moment)
            setPhase(3);
            try { playCheckinCelebration(); } catch {}
        }, 1600);
        const t4 = setTimeout(() => setPhase(4), 3000);   // en gloss
        const t5 = setTimeout(() => setPhase(5), 3700);   // CTA
        return () => { [t1, t2, t3, t4, t5].forEach(clearTimeout); };
    }, []);

    const handleStart = () => {
        try { playTapPlay(); } catch {}
        markQuoteShown();
        onStart();
    };

    const gold = '#D4AF37';
    const today = new Date();
    const dateLabel = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;

    return (
        <>
            <style>{`
                @keyframes dq-float {
                    0%   { transform: translateY(0) translateX(0); opacity: 0; }
                    10%  { opacity: 0.8; }
                    90%  { opacity: 0.6; }
                    100% { transform: translateY(-120vh) translateX(var(--drift, 0px)); opacity: 0; }
                }
                @keyframes dq-pulse {
                    0%, 100% { transform: scale(1);   opacity: 0.75; }
                    50%      { transform: scale(1.08); opacity: 1; }
                }
                @keyframes dq-shimmer {
                    0%   { background-position: -200% 0; }
                    100% { background-position:  200% 0; }
                }
                @keyframes dq-ray-rotate {
                    0%   { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes dq-ring-pulse {
                    0%, 100% { box-shadow: 0 0 40px ${gold}30, 0 0 80px ${gold}15; }
                    50%      { box-shadow: 0 0 60px ${gold}55, 0 0 120px ${gold}25; }
                }
                .dq-shimmer-text {
                    background: linear-gradient(
                        90deg,
                        #ffffff 0%,
                        #ffffff 35%,
                        ${gold} 50%,
                        #ffffff 65%,
                        #ffffff 100%
                    );
                    background-size: 200% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    animation: dq-shimmer 5s linear infinite;
                }
                .dq-particle {
                    position: absolute;
                    bottom: -10px;
                    width: var(--s);
                    height: var(--s);
                    border-radius: 50%;
                    background: ${gold};
                    box-shadow: 0 0 8px ${gold}cc, 0 0 16px ${gold}66;
                    animation: dq-float var(--d) linear infinite;
                    animation-delay: var(--dl);
                    pointer-events: none;
                }
            `}</style>

            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: 'radial-gradient(ellipse at center, #1a1917 0%, #050403 70%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 24px',
                overflow: 'hidden',
            }}>
                {/* Rotating light rays */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 900,
                    height: 900,
                    background: `conic-gradient(from 0deg, transparent 0deg, ${gold}0a 20deg, transparent 40deg, transparent 90deg, ${gold}08 110deg, transparent 130deg, transparent 180deg, ${gold}0a 200deg, transparent 220deg, transparent 270deg, ${gold}08 290deg, transparent 310deg, transparent 360deg)`,
                    filter: 'blur(40px)',
                    opacity: phase >= 1 ? 0.9 : 0,
                    transition: 'opacity 2s ease-out',
                    animation: 'dq-ray-rotate 60s linear infinite',
                    pointerEvents: 'none',
                }} />

                {/* Ambient gold orb (pulses) */}
                <div style={{
                    position: 'absolute',
                    width: 600,
                    height: 600,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${gold}22 0%, ${gold}08 40%, transparent 70%)`,
                    filter: 'blur(70px)',
                    opacity: phase >= 1 ? 1 : 0,
                    transition: 'opacity 1.5s ease-out',
                    animation: phase >= 2 ? 'dq-pulse 5s ease-in-out infinite' : 'none',
                    pointerEvents: 'none',
                }} />

                {/* Floating particles */}
                {phase >= 1 && particles.map((p, i) => (
                    <div
                        key={i}
                        className="dq-particle"
                        style={{
                            left: `${p.left}%`,
                            ['--s' as string]: `${p.size}px`,
                            ['--d' as string]: `${p.duration}s`,
                            ['--dl' as string]: `${p.delay}s`,
                            ['--drift' as string]: `${p.drift}px`,
                        } as React.CSSProperties}
                    />
                ))}

                {/* Subtle gold ring */}
                <div style={{
                    position: 'absolute',
                    width: 420,
                    height: 420,
                    borderRadius: '50%',
                    border: `1px solid ${gold}50`,
                    opacity: phase >= 3 ? 0.6 : 0,
                    transform: phase >= 3 ? 'scale(1)' : 'scale(0.5)',
                    transition: 'all 1.8s cubic-bezier(0.2, 0.65, 0.3, 0.9)',
                    animation: phase >= 4 ? 'dq-ring-pulse 4s ease-in-out infinite' : 'none',
                    pointerEvents: 'none',
                }} />

                {/* Second inner ring */}
                <div style={{
                    position: 'absolute',
                    width: 260,
                    height: 260,
                    borderRadius: '50%',
                    border: `1px solid ${gold}25`,
                    opacity: phase >= 3 ? 0.5 : 0,
                    transform: phase >= 3 ? 'scale(1)' : 'scale(0.3)',
                    transition: 'all 2.2s cubic-bezier(0.2, 0.65, 0.3, 0.9) 0.2s',
                    pointerEvents: 'none',
                }} />

                {/* Content wrapper */}
                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    maxWidth: 620,
                    width: '100%',
                    textAlign: 'center',
                }}>
                    {/* Top label + date */}
                    <div style={{
                        opacity: phase >= 2 ? 1 : 0,
                        transform: phase >= 2 ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'all 1s ease-out',
                        marginBottom: 56,
                    }}>
                        <div style={{
                            fontSize: 10,
                            letterSpacing: '0.45em',
                            color: gold,
                            fontWeight: 700,
                            marginBottom: 8,
                            textShadow: `0 0 20px ${gold}80`,
                        }}>
                            TODAY&apos;S WORDS
                        </div>
                        <div style={{
                            fontSize: 10,
                            letterSpacing: '0.22em',
                            color: '#888',
                            fontFamily: 'monospace',
                        }}>
                            {dateLabel}
                            {streak > 0 && (
                                <span style={{ color: gold, marginLeft: 14 }}>
                                    {streak} DAY STREAK
                                </span>
                            )}
                        </div>
                    </div>

                    {/* The JP quote — shimmering star */}
                    <div style={{
                        opacity: phase >= 3 ? 1 : 0,
                        transform: phase >= 3 ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.96)',
                        transition: 'all 1.4s cubic-bezier(0.2, 0.65, 0.3, 0.9)',
                        marginBottom: 32,
                    }}>
                        <div
                            className={phase >= 4 ? 'dq-shimmer-text' : ''}
                            style={{
                                fontSize: 24,
                                fontWeight: 300,
                                color: phase >= 4 ? undefined : '#fff',
                                lineHeight: 1.9,
                                letterSpacing: '0.02em',
                                textShadow: phase >= 4 ? 'none' : `0 0 30px ${gold}40`,
                            }}
                        >
                            {quote.jp}
                        </div>
                    </div>

                    {/* Gold separator */}
                    <div style={{
                        width: phase >= 4 ? 80 : 0,
                        height: 1,
                        background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
                        margin: '0 auto 32px',
                        transition: 'width 1.1s ease-out 0.2s',
                        boxShadow: phase >= 4 ? `0 0 12px ${gold}80` : 'none',
                    }} />

                    {/* English gloss */}
                    <div style={{
                        opacity: phase >= 4 ? 0.6 : 0,
                        transform: phase >= 4 ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'all 1s ease-out 0.3s',
                        marginBottom: 72,
                    }}>
                        <div style={{
                            fontSize: 13,
                            fontStyle: 'italic',
                            color: '#b8b8b8',
                            lineHeight: 1.7,
                            fontWeight: 300,
                        }}>
                            &ldquo;{quote.en}&rdquo;
                        </div>
                    </div>

                    {/* CTA */}
                    <div style={{
                        opacity: phase >= 5 ? 1 : 0,
                        transform: phase >= 5 ? 'translateY(0)' : 'translateY(14px)',
                        transition: 'all 0.9s ease-out',
                    }}>
                        <button
                            onClick={handleStart}
                            style={{
                                padding: '18px 56px',
                                background: `linear-gradient(135deg, ${gold} 0%, #e8c558 50%, ${gold} 100%)`,
                                color: '#1a1917',
                                border: 'none',
                                borderRadius: 0,
                                fontSize: 14,
                                fontWeight: 800,
                                letterSpacing: '0.2em',
                                cursor: 'pointer',
                                boxShadow: `0 4px 32px ${gold}70, 0 0 0 1px ${gold}40`,
                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = `0 6px 40px ${gold}90, 0 0 0 1px ${gold}60`;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = `0 4px 32px ${gold}70, 0 0 0 1px ${gold}40`;
                            }}
                        >
                            今日も始めよう
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
