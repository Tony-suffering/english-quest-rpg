'use client';

/**
 * 耳の実測 — 無料の入口
 *
 * 集客の入口に置くものは「登録が要らない / 5分で終わる / 数字が出る」の3つを満たす必要がある。
 * 教材はこの3つを全部満たさないので、玄関には測定を置く。
 *
 * サーバもDBも使わない。何人来ても費用が増えない。
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
    DIAG_ITEMS, RAMP, rampOf, scoreDictation, readEar, contentWords, PASS,
} from '@/data/english/ear-test';
import { play, stopAll, onVoicesReady, supported, noiseDial } from '@/lib/english/ear/engine';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const BG = '#FAFAF9';

type Phase = 'intro' | 'test' | 'done';

export default function EarTestPage() {
    const [phase, setPhase] = useState<Phase>('intro');
    const [i, setI] = useState(0);
    const [answer, setAnswer] = useState('');
    const [plays, setPlays] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [scores, setScores] = useState<number[]>([]);
    const [noTts, setNoTts] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const item = DIAG_ITEMS[i];
    const ramp = item ? rampOf(item.lv) : RAMP[0];

    useEffect(() => {
        if (!supported()) { setNoTts(true); return; }
        const off = onVoicesReady(() => { });
        return () => { off(); stopAll(); };
    }, []);

    const speak = useCallback(() => {
        if (!item || playing) return;
        setPlays(p => p + 1);
        play(item.en, {
            rate: ramp.rate,
            noise: ramp.noise,
            onStart: () => setPlaying(true),
            onEnd: () => { setPlaying(false); inputRef.current?.focus(); },
        });
    }, [item, ramp, playing]);

    const check = () => {
        if (!item) return;
        setRevealed(true);
        setScores(s => { const n = [...s]; n[i] = scoreDictation(answer, item.en); return n; });
    };

    const next = () => {
        stopAll();
        if (i + 1 >= DIAG_ITEMS.length) { setPhase('done'); return; }
        setI(i + 1); setAnswer(''); setPlays(0); setRevealed(false);
    };

    const reachedLv = (() => {
        let lv = 0;
        DIAG_ITEMS.forEach((it, idx) => { if ((scores[idx] ?? 0) >= PASS) lv = Math.max(lv, it.lv); });
        return lv;
    })();

    useEffect(() => {
        if (phase !== 'done' || typeof window === 'undefined') return;
        try {
            window.localStorage.setItem('ear:result', JSON.stringify({ at: new Date().toISOString(), lv: reachedLv }));
        } catch { /* noop */ }
    }, [phase, reachedLv]);

    const wrap: React.CSSProperties = { background: BG, minHeight: '100vh', color: INK, padding: '28px 16px 70px' };
    const inner: React.CSSProperties = { maxWidth: 640, margin: '0 auto' };

    // ---------------- intro ----------------
    if (phase === 'intro') {
        return (
            <div style={wrap}>
                <div style={inner}>
                    <div style={{ fontSize: 10, letterSpacing: '0.3em', color: '#A8A29E', fontWeight: 700, marginBottom: 8 }}>FREE ・ 5分 ・ 登録不要</div>
                    <h1 style={{ fontSize: 26, fontWeight: 900, lineHeight: 1.45, margin: '0 0 14px', letterSpacing: '-0.02em' }}>
                        あなたの耳が、<br />どこで壊れるかを測ります。
                    </h1>
                    <p style={{ fontSize: 13.5, lineHeight: 1.95, color: SUB, margin: '0 0 20px' }}>
                        英語力を測るテストではありません。測るのは<b style={{ color: INK }}>「速度」と「雑音」をどこまで上げても文が保てるか</b>だけ。
                        12問。試験音声より遅い設定から始まって、居酒屋の中まで上げていきます。
                    </p>

                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, padding: '16px 18px', marginBottom: 18 }}>
                        <div style={{ fontSize: 11, fontWeight: 800, color: DEEPGOLD, letterSpacing: '0.15em', marginBottom: 10 }}>やりかた</div>
                        {[
                            '再生ボタンを押して、聞こえた英文を打つ',
                            '完璧に書けなくていい。単語を拾えていれば正解になります',
                            'イヤホン推奨。雑音の入る問題があります',
                        ].map(t => (
                            <div key={t} style={{ fontSize: 12.5, lineHeight: 1.85, paddingLeft: 14, position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: GOLD, fontWeight: 900 }}>·</span>{t}
                            </div>
                        ))}
                    </div>

                    {noTts ? (
                        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 10, padding: '14px 16px', fontSize: 12.5, lineHeight: 1.8, color: '#991B1B' }}>
                            このブラウザは音声合成に対応していないため測定できません。Chrome / Edge / Safari の最新版で開いてください。
                        </div>
                    ) : (
                        <button onClick={() => setPhase('test')} style={{
                            width: '100%', border: 'none', cursor: 'pointer',
                            background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                            padding: 17, borderRadius: 12, fontSize: 16, fontWeight: 900, letterSpacing: '0.03em',
                        }}>測定を始める</button>
                    )}
                    <p style={{ fontSize: 11, color: '#A8A29E', marginTop: 16, lineHeight: 1.8 }}>
                        結果はあなたの端末にだけ保存されます。送信されません。
                    </p>
                </div>
            </div>
        );
    }

    // ---------------- done ----------------
    if (phase === 'done') {
        const read = readEar(reachedLv);
        const avg = Math.round(scores.reduce((a, b) => a + (b || 0), 0) / DIAG_ITEMS.length);
        return (
            <div style={wrap}>
                <div style={inner}>
                    <div style={{ background: INK, color: '#fff', borderRadius: 16, padding: '30px 22px', marginBottom: 20, textAlign: 'center' }}>
                        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.3em', color: GOLD, marginBottom: 12 }}>YOUR EAR</div>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: 56, fontWeight: 900, lineHeight: 1 }}>
                            Lv.{reachedLv}<span style={{ fontSize: 20, opacity: 0.5 }}> / 10</span>
                        </div>
                        <div style={{ fontSize: 13.5, fontWeight: 800, marginTop: 12, color: GOLD }}>{read.title}</div>
                        <div style={{ fontSize: 11.5, opacity: 0.7, marginTop: 8 }}>12問の平均一致率 {avg}%</div>
                    </div>

                    <p style={{ fontSize: 13.5, lineHeight: 1.95, margin: '0 0 22px' }}>{read.body}</p>

                    <div style={{ fontSize: 11, fontWeight: 800, color: DEEPGOLD, letterSpacing: '0.15em', marginBottom: 10 }}>10段のどこにいるか</div>
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
                        {RAMP.map(r => {
                            const cleared = r.lv <= reachedLv;
                            const isRaw = r.band === 'raw';
                            return (
                                <div key={r.lv} style={{
                                    display: 'flex', gap: 11, alignItems: 'center', padding: '11px 14px',
                                    borderBottom: `1px solid ${LINE}`,
                                    background: cleared ? '#FEFCF2' : isRaw ? '#F7FDFA' : '#fff',
                                    opacity: cleared || isRaw ? 1 : 0.6,
                                }}>
                                    <div style={{
                                        flexShrink: 0, width: 30, height: 30, borderRadius: 8,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 12, fontWeight: 900, color: '#fff',
                                        background: cleared ? GOLD : isRaw ? GREEN : '#D6D3D1',
                                    }}>{r.lv}</div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{ fontSize: 12.5, fontWeight: 800 }}>
                                            {r.label}
                                            <span style={{ fontSize: 10.5, fontWeight: 700, color: SUB, marginLeft: 7 }}>
                                                {r.rate.toFixed(2)}倍 / 雑音{noiseDial(r.noise)}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: 11, color: SUB, lineHeight: 1.6, marginTop: 2 }}>{r.feel}</div>
                                    </div>
                                    {r.lv === reachedLv && (
                                        <div style={{ flexShrink: 0, fontSize: 9.5, fontWeight: 900, color: '#fff', background: INK, padding: '3px 7px', borderRadius: 99 }}>今ここ</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: 14, padding: '22px 20px', textAlign: 'center' }}>
                        <div style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.6, marginBottom: 10 }}>Lv.8 から先が、YouTube です。</div>
                        <p style={{ fontSize: 12.5, lineHeight: 1.9, color: SUB, margin: '0 0 16px' }}>
                            ここで使えるのは試験音声で作れる Lv.7 まで。台本のない生の話し言葉は、順番を踏まないと、測っても意味がありません。
                        </p>
                        <Link href="/membership" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                                padding: 15, borderRadius: 11, fontSize: 15, fontWeight: 900,
                            }}>続きを一緒に作る(¥100 / 月)</div>
                        </Link>
                    </div>

                    <button
                        onClick={() => { setPhase('intro'); setI(0); setScores([]); setAnswer(''); setPlays(0); setRevealed(false); }}
                        style={{ marginTop: 14, width: '100%', background: 'none', border: `1px solid ${LINE}`, color: SUB, padding: 12, borderRadius: 10, fontSize: 12.5, fontWeight: 700, cursor: 'pointer' }}
                    >もう一度測る</button>

                    <div style={{ marginTop: 12, textAlign: 'center' }}>
                        <Link href="/english/home" style={{ fontSize: 12, color: SUB, fontWeight: 700 }}>← 他のアプリを見る</Link>
                    </div>
                </div>
            </div>
        );
    }

    // ---------------- test ----------------
    const sc = scores[i];
    return (
        <div style={wrap}>
            <div style={inner}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
                    {DIAG_ITEMS.map((_, idx) => (
                        <div key={idx} style={{
                            flex: 1, height: 4, borderRadius: 2,
                            background: idx < i ? ((scores[idx] ?? 0) >= PASS ? GOLD : '#D6D3D1') : idx === i ? INK : '#EFEDEB',
                        }} />
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: SUB, fontWeight: 700, marginBottom: 18 }}>
                    <span>{i + 1} / {DIAG_ITEMS.length}</span>
                    <span>Lv.{item.lv} ｜ {ramp.rate.toFixed(2)}倍 ｜ 雑音 {noiseDial(ramp.noise)}/5</span>
                </div>

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 14, padding: '22px 18px', textAlign: 'center', marginBottom: 14 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 800, color: DEEPGOLD, marginBottom: 3 }}>{ramp.label}</div>
                    <div style={{ fontSize: 11, color: SUB, marginBottom: 16 }}>{ramp.feel}</div>
                    <button onClick={speak} disabled={playing} style={{
                        width: '100%', border: 'none', cursor: playing ? 'default' : 'pointer',
                        background: playing ? '#F5F5F4' : INK, color: playing ? SUB : '#fff',
                        padding: 16, borderRadius: 11, fontSize: 15, fontWeight: 900, letterSpacing: '0.04em',
                    }}>{playing ? '再生中...' : plays === 0 ? '聞く' : `もう一度聞く (${plays}回目)`}</button>
                </div>

                <textarea
                    ref={inputRef}
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    disabled={revealed}
                    placeholder="聞こえた英文を打つ。拾えた単語だけでもいい"
                    rows={3}
                    style={{
                        width: '100%', boxSizing: 'border-box', padding: 14,
                        border: `1px solid ${revealed ? LINE : '#D6D3D1'}`, borderRadius: 11,
                        fontSize: 16, lineHeight: 1.65, fontFamily: 'inherit',
                        background: revealed ? '#FAFAF9' : '#fff', color: INK, resize: 'vertical',
                    }}
                />

                {!revealed ? (
                    <button onClick={check} disabled={plays === 0} style={{
                        marginTop: 11, width: '100%', border: 'none', cursor: plays === 0 ? 'default' : 'pointer',
                        background: plays === 0 ? '#E7E5E4' : GREEN, color: plays === 0 ? SUB : '#fff',
                        padding: 15, borderRadius: 11, fontSize: 14.5, fontWeight: 900,
                    }}>{plays === 0 ? 'まず聞いてください' : '答え合わせ'}</button>
                ) : (
                    <>
                        <div style={{
                            marginTop: 13, background: '#fff',
                            border: `2px solid ${(sc ?? 0) >= PASS ? GREEN : '#FCA5A5'}`,
                            borderRadius: 12, padding: '16px 18px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, marginBottom: 10 }}>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 900, color: (sc ?? 0) >= PASS ? GREEN : '#DC2626' }}>{sc}%</span>
                                <span style={{ fontSize: 12, fontWeight: 800, color: SUB }}>{(sc ?? 0) >= PASS ? 'この段は聞けている' : 'この段で崩れた'}</span>
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.7, marginBottom: 7 }}>
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
                            <div style={{ fontSize: 12.5, color: SUB, lineHeight: 1.75 }}>{item.ja}</div>
                            <div style={{ fontSize: 11, color: SUB, marginTop: 9, paddingTop: 9, borderTop: `1px dashed ${LINE}` }}>
                                赤い語が、あなたの耳を通らなかった内容語です。
                            </div>
                        </div>
                        <button onClick={next} style={{
                            marginTop: 11, width: '100%', border: 'none', cursor: 'pointer',
                            background: INK, color: '#fff', padding: 15, borderRadius: 11, fontSize: 14.5, fontWeight: 900,
                        }}>{i + 1 >= DIAG_ITEMS.length ? '結果を見る' : '次へ'}</button>
                    </>
                )}
            </div>
        </div>
    );
}
