'use client';

/**
 * RAW PASS 本編 -- Day 1-30
 *
 * Phase 1-2 は書き取りドリルだけ。Phase 3 は「生音を通しで聞く」+「実際に喋られた行を潰す」。
 * Day 30 は最後に Day 1 と同じ音声を Lv2 で聞き直し、初日の記録と並べる(返金保証の測定)。
 */

import { useState, useEffect, useRef, useCallback, use } from 'react';
import Link from 'next/link';
import {
    dayOf, rampOf, RAMP, scoreDictation, contentWords, REPLAY_ITEMS, PHASES,
    type DrillItem,
} from '@/data/english/rawpass';
import { play, stopAll, onVoicesReady, supported, noiseDial } from '@/lib/english/rawpass/ear-engine';
import { canOpen, submitCode, type UnlockResult } from '@/lib/english/unlock';
import { BUY_URL, WAITLIST_URL, PRICE, FREE_DAYS } from '@/data/english/rawpass';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

const PASS = 60;
const REPLAY_LV = 2;

interface DayRecord { at: string; avg: number; scores: number[]; replayAvg?: number; }

const loadRec = (day: number): DayRecord | null => {
    if (typeof window === 'undefined') return null;
    try { return JSON.parse(window.localStorage.getItem(`rawpass:day:${day}`) || 'null'); }
    catch { return null; }
};
const saveRec = (day: number, r: DayRecord) => {
    if (typeof window === 'undefined') return;
    try { window.localStorage.setItem(`rawpass:day:${day}`, JSON.stringify(r)); } catch { /* noop */ }
};

export default function RawPassDayPage({ params }: { params: Promise<{ n: string }> }) {
    const { n } = use(params);
    const dayNum = parseInt(n, 10);
    const day = dayOf(dayNum);

    // ---- 生音を通しで聞いたか (Phase 3 のゲート) ----
    const [heardClip, setHeardClip] = useState(false);
    const [ytRate, setYtRate] = useState(1);
    const ytRef = useRef<HTMLIFrameElement>(null);

    // ---- ドリル ----
    const [stage, setStage] = useState<'drill' | 'replay' | 'done'>('drill');
    const [i, setI] = useState(0);
    const [answer, setAnswer] = useState('');
    const [plays, setPlays] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [scores, setScores] = useState<number[]>([]);
    const [replayScores, setReplayScores] = useState<number[]>([]);
    const [noTts, setNoTts] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // ---- 開錠 ----
    // localStorage は SSR で読めないので、判定はマウント後に確定させる。
    // 最初から locked を出すと、開錠済みの人に一瞬だけ鍵が見える。
    const [gateReady, setGateReady] = useState(false);
    const [locked, setLocked] = useState(false);
    const [code, setCode] = useState('');
    const [codeState, setCodeState] = useState<UnlockResult | null>(null);

    useEffect(() => {
        setLocked(!canOpen('rawpass', BUY_URL, FREE_DAYS, dayNum));
        setGateReady(true);
    }, [dayNum]);

    useEffect(() => {
        if (!supported()) { setNoTts(true); return; }
        const off = onVoicesReady(() => { });
        return () => { off(); stopAll(); };
    }, []);

    const tryCode = async () => {
        const r = await submitCode('rawpass', code);
        setCodeState(r);
        if (r === 'ok') setLocked(false);
    };

    const inReplay = stage === 'replay';
    const items: DrillItem[] = inReplay ? REPLAY_ITEMS : (day?.items ?? []);
    const item = items[i];
    const lv = inReplay ? REPLAY_LV : (day?.lv ?? 1);
    const ramp = rampOf(lv);

    const speak = useCallback(() => {
        if (!item || playing) return;
        setPlays(p => p + 1);
        play(item.en, {
            rate: ramp.rate, noise: ramp.noise,
            onStart: () => setPlaying(true),
            onEnd: () => { setPlaying(false); inputRef.current?.focus(); },
        });
    }, [item, ramp, playing]);

    const check = () => {
        if (!item) return;
        setRevealed(true);
        const s = scoreDictation(answer, item.en);
        if (inReplay) setReplayScores(p => { const q = [...p]; q[i] = s; return q; });
        else setScores(p => { const q = [...p]; q[i] = s; return q; });
    };

    const advance = () => {
        stopAll();
        if (i + 1 < items.length) {
            setI(i + 1); setAnswer(''); setPlays(0); setRevealed(false);
            return;
        }
        // ドリル終了
        if (!inReplay && day?.replay) {
            setStage('replay'); setI(0); setAnswer(''); setPlays(0); setRevealed(false);
            return;
        }
        setStage('done');
    };

    const avg = (a: number[], len: number) => len ? Math.round(a.reduce((x, y) => x + (y || 0), 0) / len) : 0;
    const drillAvg = avg(scores, day?.items.length ?? 0);
    const replayAvg = avg(replayScores, REPLAY_ITEMS.length);

    useEffect(() => {
        if (stage !== 'done' || !day) return;
        saveRec(day.day, {
            at: new Date().toISOString(), avg: drillAvg, scores,
            ...(day.replay ? { replayAvg } : {}),
        });
    }, [stage, day, drillAvg, scores, replayAvg]);

    const setYt = (r: number) => {
        setYtRate(r);
        try {
            ytRef.current?.contentWindow?.postMessage(
                JSON.stringify({ event: 'command', func: 'setPlaybackRate', args: [r] }), '*',
            );
        } catch { /* noop */ }
    };

    const wrap: React.CSSProperties = {
        background: CREAM, minHeight: '100vh', color: INK,
        fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
    };
    const inner: React.CSSProperties = { maxWidth: '760px', margin: '0 auto', padding: '0 20px' };

    if (!day) {
        return (
            <div style={wrap}>
                <div style={{ ...inner, paddingTop: '60px' }}>
                    <h1 style={{ fontFamily: SERIF, fontSize: '24px', fontWeight: 900 }}>その日はありません</h1>
                    <p style={{ fontSize: '14px', color: SUB, lineHeight: 2 }}>Day 1 から Day 30 までです。</p>
                    <Link href="/english/rawpass/program" style={{ color: DEEPGOLD, fontWeight: 800, fontSize: '14px' }}>30日の一覧へ</Link>
                </div>
            </div>
        );
    }

    const phase = PHASES.find(p => p.n === day.phase)!;

    const Head = () => (
        <div style={{ borderBottom: `1px solid ${LINE}`, background: '#fff' }}>
            <div style={{ ...inner, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Link href="/english/rawpass/program" style={{ textDecoration: 'none', color: SUB, fontSize: '13px', fontWeight: 800 }}>一覧</Link>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginLeft: 'auto' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: GOLD }}>RAW</span>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900 }}>PASS</span>
                </div>
            </div>
        </div>
    );

    // ---------------- 鍵 ----------------
    if (gateReady && locked) {
        const msg: Record<UnlockResult, string> = {
            ok: '',
            wrong: 'そのコードでは開きません。購入時のメールをもう一度確認してください。',
            not_configured: 'まだ販売を開始していません。Day 1-3 と耳の実測は無料で試せます。',
            error: '通信に失敗しました。時間をおいて試してください。',
        };
        return (
            <div style={wrap}>
                <Head />
                <div style={{ ...inner, paddingTop: '40px', paddingBottom: '90px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '3px', color: DEEPGOLD }}>DAY {day.day} ｜ 鍵がかかっています</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: '26px', fontWeight: 900, lineHeight: 1.5, margin: '14px 0 12px' }}>
                        Day {FREE_DAYS} までは無料です。<br />ここから先が、本編です。
                    </h1>
                    <p style={{ fontSize: '14px', lineHeight: 2.05, color: SUB, margin: '0 0 24px' }}>
                        Day 1-{FREE_DAYS} は試験音声そのままの設定で、10段のうち下2段しか使いません。
                        速度と雑音を上げるのは Day {FREE_DAYS + 1} から、生音に出るのは Day 21 からです。
                        <b style={{ color: INK }}>耳の基準が動くのは、その先だけです。</b>
                    </p>

                    <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '18px', padding: '26px 22px', marginBottom: '18px', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '40px', fontWeight: 900, lineHeight: 1 }}>{PRICE.mainLabel}</div>
                        <div style={{ fontSize: '12.5px', color: SUB, fontWeight: 700, margin: '10px 0 20px' }}>{PRICE.mainNote}</div>
                        <a href={BUY_URL || WAITLIST_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                                padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 900,
                            }}>{BUY_URL ? `${PRICE.mainLabel} で買う` : '先行案内を受け取る'}</div>
                        </a>
                    </div>

                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '20px 22px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '12px' }}>すでに購入した方</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <input
                                value={code}
                                onChange={e => setCode(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') void tryCode(); }}
                                placeholder="解錠コード"
                                style={{
                                    flex: '1 1 180px', minWidth: 0, boxSizing: 'border-box', padding: '13px 14px',
                                    border: `1px solid ${codeState && codeState !== 'ok' ? '#FCA5A5' : '#D6D3D1'}`,
                                    borderRadius: '10px', fontSize: '16px', fontFamily: 'inherit', color: INK,
                                }}
                            />
                            <button
                                onClick={() => void tryCode()}
                                style={{
                                    border: 'none', cursor: 'pointer', background: INK, color: '#fff',
                                    padding: '13px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 900,
                                }}
                            >開ける</button>
                        </div>
                        {codeState && codeState !== 'ok' && (
                            <div style={{ fontSize: '12.5px', color: '#B45309', lineHeight: 1.85, marginTop: '11px', fontWeight: 700 }}>
                                {msg[codeState]}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: '20px', flexWrap: 'wrap' }}>
                        <Link href={`/english/rawpass/day/${Math.min(day.day, FREE_DAYS)}`} style={{ flex: '1 1 150px', textDecoration: 'none' }}>
                            <div style={{ border: `1px solid ${LINE}`, background: '#fff', color: SUB, padding: '14px', borderRadius: '11px', fontSize: '13.5px', fontWeight: 800, textAlign: 'center' }}>
                                無料の Day {Math.min(day.day, FREE_DAYS)} に戻る
                            </div>
                        </Link>
                        <Link href="/english/rawpass/ear" style={{ flex: '1 1 150px', textDecoration: 'none' }}>
                            <div style={{ border: `1px solid ${LINE}`, background: '#fff', color: SUB, padding: '14px', borderRadius: '11px', fontSize: '13.5px', fontWeight: 800, textAlign: 'center' }}>
                                耳の実測(無料)
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ---------------- done ----------------
    if (stage === 'done') {
        const d1 = loadRec(1);
        return (
            <div style={wrap}>
                <Head />
                <div style={{ ...inner, paddingTop: '34px', paddingBottom: '90px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '3px', color: DEEPGOLD }}>DAY {day.day} 終了</div>
                    <div style={{
                        background: INK, color: '#fff', borderRadius: '18px', padding: '30px 24px',
                        margin: '16px 0 22px', textAlign: 'center',
                    }}>
                        <div style={{ fontSize: '11.5px', letterSpacing: '2px', color: GOLD, fontWeight: 900, marginBottom: '10px' }}>
                            Lv.{day.lv} ｜ {ramp.rate.toFixed(2)}倍 ｜ 雑音 {noiseDial(rampOf(day.lv).noise)}/5
                        </div>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '58px', fontWeight: 900, lineHeight: 1 }}>{drillAvg}%</div>
                        <div style={{ fontSize: '12.5px', opacity: 0.75, marginTop: '10px' }}>
                            {day.items.length}文の内容語 一致率
                        </div>
                    </div>

                    {day.replay && (
                        <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '18px', padding: '24px 22px', marginBottom: '22px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: DEEPGOLD, marginBottom: '12px' }}>返金保証の測定</div>
                            <div style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 900, marginBottom: '16px', lineHeight: 1.55 }}>
                                Day 1 と、同じ音声・同じ設定。
                            </div>
                            <div style={{ display: 'flex', gap: '14px', alignItems: 'stretch' }}>
                                <div style={{ flex: 1, textAlign: 'center', background: '#FAFAF9', borderRadius: '12px', padding: '16px 8px' }}>
                                    <div style={{ fontSize: '11px', color: SUB, fontWeight: 800 }}>Day 1</div>
                                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 900, color: SUB }}>
                                        {d1 ? `${d1.avg}%` : '—'}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: GOLD, fontSize: '20px', fontWeight: 900 }}>→</div>
                                <div style={{ flex: 1, textAlign: 'center', background: '#FEFCF2', borderRadius: '12px', padding: '16px 8px' }}>
                                    <div style={{ fontSize: '11px', color: DEEPGOLD, fontWeight: 800 }}>Day 30</div>
                                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '32px', fontWeight: 900, color: GOLD }}>{replayAvg}%</div>
                                </div>
                            </div>
                            <p style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.95, marginTop: '16px', marginBottom: 0 }}>
                                {d1
                                    ? (replayAvg > d1.avg
                                        ? `同じ音声で ${replayAvg - d1.avg} ポイント上がっています。この記録はあなたの端末に残ります。`
                                        : '上がっていません。この画面のスクリーンショットを送ってください。理由を聞かずに全額返金します。')
                                    : 'Day 1 の記録がこの端末にありません。別の端末で始めた場合は、その端末の記録と並べてください。'}
                            </p>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {day.day > 1 && (
                            <Link href={`/english/rawpass/day/${day.day - 1}`} style={{ flex: 1, textDecoration: 'none' }}>
                                <div style={{ border: `1px solid ${LINE}`, background: '#fff', color: SUB, padding: '15px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, textAlign: 'center' }}>
                                    Day {day.day - 1}
                                </div>
                            </Link>
                        )}
                        {day.day < 30 ? (
                            <Link href={`/english/rawpass/day/${day.day + 1}`} style={{ flex: 2, textDecoration: 'none' }}>
                                <div style={{ background: INK, color: '#fff', padding: '15px', borderRadius: '12px', fontSize: '15px', fontWeight: 900, textAlign: 'center' }}>
                                    Day {day.day + 1} へ
                                </div>
                            </Link>
                        ) : (
                            <Link href="/english/rawpass/program" style={{ flex: 2, textDecoration: 'none' }}>
                                <div style={{ background: GREEN, color: '#fff', padding: '15px', borderRadius: '12px', fontSize: '15px', fontWeight: 900, textAlign: 'center' }}>
                                    30日、終わり
                                </div>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // ---------------- Phase 3 の「通しで聞く」ゲート ----------------
    if (day.phase === 3 && day.clip && !heardClip) {
        return (
            <div style={wrap}>
                <Head />
                <div style={{ ...inner, paddingTop: '30px', paddingBottom: '80px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '3px', color: GREEN }}>
                        DAY {day.day} ｜ PHASE 3 生音
                    </div>
                    <h1 style={{ fontFamily: SERIF, fontSize: '24px', fontWeight: 900, lineHeight: 1.5, margin: '12px 0 8px' }}>
                        まず、字幕を消して通しで聞く。
                    </h1>
                    <p style={{ fontSize: '13.5px', color: SUB, lineHeight: 2, margin: '0 0 20px' }}>
                        {day.clip.tagline}
                        <br />
                        <b style={{ color: INK }}>ほぼ分からなくて正常です。</b>分かろうとせず、「どこで置いていかれたか」だけ見てください。
                    </p>

                    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '14px', overflow: 'hidden', background: '#000', marginBottom: '14px' }}>
                        <iframe
                            ref={ytRef}
                            src={`https://www.youtube-nocookie.com/embed/${day.clip.youtubeId}?enablejsapi=1&cc_load_policy=0&rel=0`}
                            title={day.clip.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: SUB }}>速度</span>
                        {[0.75, 1, 1.25].map(r => (
                            <button key={r} onClick={() => setYt(r)} style={{
                                border: `1px solid ${ytRate === r ? INK : LINE}`, cursor: 'pointer',
                                background: ytRate === r ? INK : '#fff', color: ytRate === r ? '#fff' : SUB,
                                padding: '7px 14px', borderRadius: '99px', fontSize: '12.5px', fontWeight: 800,
                            }}>{r}倍</button>
                        ))}
                        <span style={{ fontSize: '11.5px', color: SUB }}>効かない場合はプレーヤー内の設定から</span>
                    </div>

                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '18px 20px', marginBottom: '20px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '10px' }}>今日の狙い</div>
                        <div style={{ fontSize: '14px', lineHeight: 1.9 }}>{day.aim}</div>
                    </div>

                    <button
                        onClick={() => setHeardClip(true)}
                        style={{
                            width: '100%', border: 'none', cursor: 'pointer',
                            background: GREEN, color: '#fff', padding: '17px', borderRadius: '13px',
                            fontSize: '16px', fontWeight: 900, letterSpacing: '0.5px',
                        }}
                    >
                        通しで聞いた。実際に喋られた行を潰す
                    </button>
                    <p style={{ fontSize: '11.5px', color: SUB, marginTop: '12px', lineHeight: 1.85 }}>
                        次の画面では、このクリップの中で実際に喋られた {day.items.length} 行を、Lv.{day.lv} の設定で書き取ります。
                    </p>
                </div>
            </div>
        );
    }

    // ---------------- ドリル ----------------
    const cur = inReplay ? replayScores[i] : scores[i];
    return (
        <div style={wrap}>
            <Head />
            <div style={{ ...inner, paddingTop: '26px', paddingBottom: '80px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2.5px', color: day.phase === 3 ? GREEN : DEEPGOLD }}>
                        DAY {day.day} ｜ PHASE {day.phase} {phase.name}
                    </span>
                    {inReplay && (
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: GOLD, padding: '3px 9px', borderRadius: '99px' }}>
                            Day 1 の音声に戻る
                        </span>
                    )}
                </div>
                <h1 style={{ fontFamily: SERIF, fontSize: '21px', fontWeight: 900, lineHeight: 1.55, margin: '10px 0 4px' }}>
                    {inReplay ? '同じ音声を、同じ設定で。' : day.title}
                </h1>
                <p style={{ fontSize: '13px', color: SUB, lineHeight: 1.9, margin: '0 0 18px' }}>
                    {inReplay ? '30日前と1文字も違わない音声です。ここで差が出なければ、この商品は失敗です。' : day.aim}
                </p>

                {noTts && (
                    <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '14px 16px', fontSize: '13px', color: '#991B1B', lineHeight: 1.8, marginBottom: '16px' }}>
                        このブラウザは音声合成に対応していません。Chrome / Edge / Safari の最新版で開いてください。
                    </div>
                )}

                <div style={{ display: 'flex', gap: '3px', marginBottom: '6px' }}>
                    {items.map((_, idx) => {
                        const arr = inReplay ? replayScores : scores;
                        return (
                            <div key={idx} style={{
                                flex: 1, height: '4px', borderRadius: '2px',
                                background: idx < i ? ((arr[idx] ?? 0) >= PASS ? GOLD : '#D6D3D1') : idx === i ? INK : '#EFEDEB',
                            }} />
                        );
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: SUB, fontWeight: 700, marginBottom: '20px' }}>
                    <span>{i + 1} / {items.length}</span>
                    <span>Lv.{lv} ｜ {ramp.rate.toFixed(2)}倍 ｜ 雑音 {noiseDial(ramp.noise)}/5</span>
                </div>

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: '24px 20px', textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: ramp.band === 'raw' ? GREEN : DEEPGOLD, marginBottom: '4px' }}>{ramp.label}</div>
                    <div style={{ fontSize: '11.5px', color: SUB, marginBottom: '18px' }}>{ramp.feel}</div>
                    <button
                        onClick={speak}
                        disabled={playing || noTts}
                        style={{
                            width: '100%', border: 'none', cursor: playing || noTts ? 'default' : 'pointer',
                            background: playing || noTts ? '#F5F5F4' : INK, color: playing || noTts ? SUB : '#fff',
                            padding: '17px', borderRadius: '12px', fontSize: '16px', fontWeight: 900, letterSpacing: '1px',
                        }}
                    >
                        {playing ? '再生中...' : plays === 0 ? '聞く' : `もう一度聞く (${plays}回目)`}
                    </button>
                </div>

                <textarea
                    ref={inputRef}
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    disabled={revealed}
                    placeholder="聞こえた英文を打つ"
                    rows={3}
                    style={{
                        width: '100%', boxSizing: 'border-box', padding: '15px',
                        border: `1px solid ${revealed ? LINE : '#D6D3D1'}`, borderRadius: '12px',
                        fontSize: '16px', lineHeight: 1.7, fontFamily: 'inherit',
                        background: revealed ? '#FAFAF9' : '#fff', color: INK, resize: 'vertical',
                    }}
                />

                {!revealed ? (
                    <button
                        onClick={check}
                        disabled={plays === 0}
                        style={{
                            marginTop: '12px', width: '100%', border: 'none',
                            cursor: plays === 0 ? 'default' : 'pointer',
                            background: plays === 0 ? '#E7E5E4' : GREEN, color: plays === 0 ? SUB : '#fff',
                            padding: '16px', borderRadius: '12px', fontSize: '15px', fontWeight: 900,
                        }}
                    >
                        {plays === 0 ? 'まず聞いてください' : '答え合わせ'}
                    </button>
                ) : (
                    <>
                        <div style={{
                            marginTop: '14px', background: '#fff',
                            border: `2px solid ${(cur ?? 0) >= PASS ? GREEN : '#FCA5A5'}`,
                            borderRadius: '14px', padding: '18px 20px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '30px', fontWeight: 900, color: (cur ?? 0) >= PASS ? GREEN : '#DC2626' }}>{cur}%</span>
                                <span style={{ fontSize: '12.5px', fontWeight: 800, color: SUB }}>
                                    {(cur ?? 0) >= PASS ? '通った' : '崩れた'}
                                </span>
                            </div>
                            <div style={{ fontSize: '15.5px', fontWeight: 700, lineHeight: 1.75, marginBottom: '8px' }}>
                                {item.en.split(/(\s+)/).map((w, k) => {
                                    const bare = w.toLowerCase().replace(/[^a-z0-9']/g, '');
                                    const want = contentWords(item.en).includes(bare);
                                    const got = contentWords(answer).some(g => g === bare || (bare.length > 4 && g.startsWith(bare.slice(0, 4))));
                                    if (!want) return <span key={k}>{w}</span>;
                                    return <span key={k} style={{
                                        color: got ? INK : '#DC2626',
                                        background: got ? 'transparent' : '#FEF2F2',
                                        fontWeight: got ? 700 : 900,
                                        borderBottom: got ? 'none' : '2px solid #FCA5A5',
                                    }}>{w}</span>;
                                })}
                            </div>
                            <div style={{ fontSize: '13px', color: SUB, lineHeight: 1.8 }}>{item.ja}</div>
                        </div>
                        <button
                            onClick={advance}
                            style={{
                                marginTop: '12px', width: '100%', border: 'none', cursor: 'pointer',
                                background: INK, color: '#fff', padding: '16px', borderRadius: '12px', fontSize: '15px', fontWeight: 900,
                            }}
                        >
                            {i + 1 < items.length ? '次の1文' : (!inReplay && day.replay ? 'Day 1 の音声に戻る' : '今日の記録を見る')}
                        </button>
                    </>
                )}

                <div style={{ marginTop: '26px', fontSize: '11.5px', color: SUB, lineHeight: 1.9, borderTop: `1px solid ${LINE}`, paddingTop: '16px' }}>
                    Lv.{lv} は10段のうち{lv <= 7 ? '試験音声で作れる範囲' : '生の話し言葉'}。
                    {RAMP[9].lv === lv ? ' ここが取れたら字幕は要りません。' : ` 上限は Lv.10(${RAMP[9].label})。`}
                </div>
            </div>
        </div>
    );
}
