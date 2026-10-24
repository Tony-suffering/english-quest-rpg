'use client';

/**
 * RAW PASS 無料の入口 -- 耳の実測
 *
 * ここで測るのは「英語力」ではなく「どの段で耳が壊れるか」。
 * 試験音声で作れる Lv1-7 までを測り、Lv8-10(生音)は本編に送る。これが商品の導線。
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
    DIAG_ITEMS, RAMP, rampOf, scoreDictation, readEar, contentWords,
} from '@/data/english/rawpass';
import { play, stopAll, onVoicesReady, supported, noiseDial } from '@/lib/english/rawpass/ear-engine';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

const PASS = 60; // 内容語の6割拾えたら「聞けた」と判定する

type Phase = 'intro' | 'test' | 'done';

export default function EarTestPage() {
    const [phase, setPhase] = useState<Phase>('intro');
    const [i, setI] = useState(0);
    const [answer, setAnswer] = useState('');
    const [plays, setPlays] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [revealed, setRevealed] = useState(false);
    const [scores, setScores] = useState<number[]>([]);
    const [ready, setReady] = useState(false);
    const [noTts, setNoTts] = useState(false);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const item = DIAG_ITEMS[i];
    const ramp = item ? rampOf(item.lv) : RAMP[0];

    useEffect(() => {
        if (!supported()) { setNoTts(true); return; }
        const off = onVoicesReady(() => setReady(true));
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
        if (i + 1 >= DIAG_ITEMS.length) {
            setPhase('done');
            return;
        }
        setI(i + 1);
        setAnswer('');
        setPlays(0);
        setRevealed(false);
    };

    // 到達レベル: 合格したいちばん上の段
    const reachedLv = (() => {
        let lv = 0;
        DIAG_ITEMS.forEach((it, idx) => {
            if ((scores[idx] ?? 0) >= PASS) lv = Math.max(lv, it.lv);
        });
        return lv;
    })();

    useEffect(() => {
        if (phase !== 'done' || typeof window === 'undefined') return;
        try {
            window.localStorage.setItem('rawpass:ear', JSON.stringify({
                at: new Date().toISOString(), lv: reachedLv, scores,
            }));
        } catch { /* noop */ }
    }, [phase, reachedLv, scores]);

    const wrap: React.CSSProperties = {
        background: CREAM, minHeight: '100vh', color: INK,
        fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
    };
    const inner: React.CSSProperties = { maxWidth: '760px', margin: '0 auto', padding: '0 20px' };

    const Brand = () => (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>RAW</span>
            <span style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, letterSpacing: '1px' }}>PASS</span>
            <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 7px', borderRadius: '4px' }}>耳の実測</span>
        </div>
    );

    // ---------------- intro ----------------
    if (phase === 'intro') {
        return (
            <div style={wrap}>
                <div style={{ ...inner, paddingTop: '40px', paddingBottom: '80px' }}>
                    <Brand />
                    <h1 style={{ fontFamily: SERIF, fontSize: '32px', fontWeight: 900, lineHeight: 1.4, margin: '28px 0 16px' }}>
                        あなたの耳が、<br />どこで壊れるかを測ります。
                    </h1>
                    <p style={{ fontSize: '15px', lineHeight: 2, color: SUB, margin: '0 0 24px' }}>
                        英語力を測るテストではありません。測るのは<b style={{ color: INK }}>「速度」と「雑音」をどこまで上げても文が保てるか</b>だけ。
                        12問、5分。試験音声より遅い設定から始まって、居酒屋の中まで上げていきます。
                    </p>

                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '20px 22px', marginBottom: '22px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '12px' }}>やりかた</div>
                        {[
                            '再生ボタンを押して、聞こえた英文を打つ',
                            '完璧に書けなくていい。単語を拾えていれば正解にする採点です',
                            '再生は1問につき2回まで。3回目からは記録に残りません',
                            'イヤホン推奨。雑音の入る問題があります',
                        ].map(t => (
                            <div key={t} style={{ fontSize: '13.5px', lineHeight: 1.9, color: INK, paddingLeft: '16px', position: 'relative' }}>
                                <span style={{ position: 'absolute', left: 0, color: GOLD, fontWeight: 900 }}>·</span>{t}
                            </div>
                        ))}
                    </div>

                    {noTts ? (
                        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '16px 18px', fontSize: '13.5px', lineHeight: 1.9, color: '#991B1B' }}>
                            このブラウザは音声合成に対応していないため測定できません。Chrome / Edge / Safari の最新版で開いてください。
                        </div>
                    ) : (
                        <button
                            onClick={() => { setPhase('test'); }}
                            style={{
                                border: 'none', cursor: 'pointer', width: '100%',
                                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                                padding: '18px', borderRadius: '14px', fontSize: '17px', fontWeight: 900, letterSpacing: '1px',
                                boxShadow: '0 8px 24px rgba(212,175,55,0.32)',
                            }}
                        >
                            測定を始める(無料)
                        </button>
                    )}
                    {!ready && !noTts && (
                        <p style={{ fontSize: '12px', color: SUB, marginTop: '10px', textAlign: 'center' }}>
                            音声の準備中です。始まらない場合は一度ページを再読み込みしてください。
                        </p>
                    )}
                    <p style={{ fontSize: '12px', color: SUB, marginTop: '26px', lineHeight: 1.9 }}>
                        測定結果はあなたの端末にだけ保存されます。送信されません。
                        <br />
                        <Link href="/english/rawpass" style={{ color: DEEPGOLD, fontWeight: 700 }}>RAW PASS とは</Link>
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
                <div style={{ ...inner, paddingTop: '40px', paddingBottom: '90px' }}>
                    <Brand />
                    <div style={{ background: INK, color: '#fff', borderRadius: '20px', padding: '34px 26px', margin: '26px 0 24px', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '3px', color: GOLD, marginBottom: '14px' }}>YOUR EAR</div>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '64px', fontWeight: 900, lineHeight: 1, letterSpacing: '-1px' }}>
                            Lv.{reachedLv}
                            <span style={{ fontSize: '22px', opacity: 0.5 }}> / 10</span>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '14px', color: GOLD }}>{read.title}</div>
                        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '10px' }}>12問の平均一致率 {avg}%</div>
                    </div>

                    <p style={{ fontSize: '15px', lineHeight: 2.05, margin: '0 0 26px' }}>{read.body}</p>

                    <div style={{ fontSize: '12px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '12px' }}>10段のどこにいるか</div>
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', overflow: 'hidden', marginBottom: '28px' }}>
                        {RAMP.map(r => {
                            const cleared = r.lv <= reachedLv;
                            const isRaw = r.band === 'raw';
                            return (
                                <div key={r.lv} style={{
                                    display: 'flex', gap: '12px', alignItems: 'center',
                                    padding: '12px 16px', borderBottom: `1px solid ${LINE}`,
                                    background: cleared ? '#FEFCF2' : isRaw ? '#F7FDFA' : '#fff',
                                    opacity: cleared || isRaw ? 1 : 0.62,
                                }}>
                                    <div style={{
                                        flexShrink: 0, width: '34px', height: '34px', borderRadius: '9px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '13px', fontWeight: 900, color: '#fff',
                                        background: cleared ? GOLD : isRaw ? GREEN : '#D6D3D1',
                                    }}>{r.lv}</div>
                                    <div style={{ minWidth: 0, flex: 1 }}>
                                        <div style={{ fontSize: '13.5px', fontWeight: 800 }}>
                                            {r.label}
                                            <span style={{ fontSize: '11px', fontWeight: 700, color: SUB, marginLeft: '8px' }}>
                                                {r.rate.toFixed(2)}倍 / 雑音{noiseDial(r.noise)}
                                            </span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.7, marginTop: '2px' }}>{r.feel}</div>
                                    </div>
                                    {r.lv === reachedLv && (
                                        <div style={{ flexShrink: 0, fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, padding: '4px 8px', borderRadius: '99px' }}>今ここ</div>
                                    )}
                                    {isRaw && (
                                        <div style={{ flexShrink: 0, fontSize: '10px', fontWeight: 900, color: GREEN, border: `1px solid ${GREEN}55`, padding: '4px 8px', borderRadius: '99px' }}>生音</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '18px', padding: '26px 22px', textAlign: 'center' }}>
                        <div style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 900, lineHeight: 1.6, marginBottom: '10px' }}>
                            Lv.8 から先が、YouTube です。
                        </div>
                        <p style={{ fontSize: '13.5px', lineHeight: 2, color: SUB, margin: '0 0 20px' }}>
                            この測定で使えるのは試験音声で作れる Lv.7 まで。<b style={{ color: INK }}>台本のない生の話し言葉(Lv.8-10)は、順番を踏まないと測っても意味がありません</b>。
                            RAW PASS は、今のあなたの段から Lv.10 までを30日で繋ぐ設計です。
                        </p>
                        <Link href="/english/rawpass" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                                padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 900, letterSpacing: '0.5px',
                            }}>30日プログラムを見る</div>
                        </Link>
                    </div>

                    <button
                        onClick={() => { setPhase('intro'); setI(0); setScores([]); setAnswer(''); setPlays(0); setRevealed(false); }}
                        style={{ marginTop: '18px', width: '100%', background: 'none', border: `1px solid ${LINE}`, color: SUB, padding: '13px', borderRadius: '10px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                    >
                        もう一度測る
                    </button>
                </div>
            </div>
        );
    }

    // ---------------- test ----------------
    const sc = scores[i];
    return (
        <div style={wrap}>
            <div style={{ ...inner, paddingTop: '28px', paddingBottom: '80px' }}>
                <Brand />

                {/* 進捗 */}
                <div style={{ display: 'flex', gap: '3px', margin: '20px 0 6px' }}>
                    {DIAG_ITEMS.map((_, idx) => (
                        <div key={idx} style={{
                            flex: 1, height: '4px', borderRadius: '2px',
                            background: idx < i ? ((scores[idx] ?? 0) >= PASS ? GOLD : '#D6D3D1') : idx === i ? INK : '#EFEDEB',
                        }} />
                    ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: SUB, fontWeight: 700, marginBottom: '22px' }}>
                    <span>{i + 1} / {DIAG_ITEMS.length}</span>
                    <span>Lv.{item.lv} ｜ {ramp.rate.toFixed(2)}倍 ｜ 雑音 {noiseDial(ramp.noise)}/5</span>
                </div>

                {/* 再生 */}
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: '26px 20px', textAlign: 'center', marginBottom: '16px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 800, color: DEEPGOLD, marginBottom: '4px' }}>{ramp.label}</div>
                    <div style={{ fontSize: '11.5px', color: SUB, marginBottom: '18px' }}>{ramp.feel}</div>
                    <button
                        onClick={speak}
                        disabled={playing}
                        style={{
                            width: '100%', border: 'none', cursor: playing ? 'default' : 'pointer',
                            background: playing ? '#F5F5F4' : INK, color: playing ? SUB : '#fff',
                            padding: '17px', borderRadius: '12px', fontSize: '16px', fontWeight: 900, letterSpacing: '1px',
                        }}
                    >
                        {playing ? '再生中...' : plays === 0 ? '聞く' : `もう一度聞く (${plays}回目)`}
                    </button>
                    {plays >= 2 && !revealed && (
                        <div style={{ fontSize: '11.5px', color: '#B45309', marginTop: '10px', fontWeight: 700 }}>
                            3回目以降は、本番の耳とは違う状態です
                        </div>
                    )}
                </div>

                {/* 書き取り */}
                <textarea
                    ref={inputRef}
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    disabled={revealed}
                    placeholder="聞こえた英文を打つ。拾えた単語だけでもいい"
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
                            border: `2px solid ${(sc ?? 0) >= PASS ? GREEN : '#FCA5A5'}`,
                            borderRadius: '14px', padding: '18px 20px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '12px' }}>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '30px', fontWeight: 900, color: (sc ?? 0) >= PASS ? GREEN : '#DC2626' }}>{sc}%</span>
                                <span style={{ fontSize: '12.5px', fontWeight: 800, color: SUB }}>
                                    {(sc ?? 0) >= PASS ? 'この段は聞けている' : 'この段で崩れた'}
                                </span>
                            </div>
                            <div style={{ fontSize: '15.5px', fontWeight: 700, lineHeight: 1.75, marginBottom: '8px' }}>
                                {contentWords(item.en).length > 0 && item.en.split(/(\s+)/).map((w, k) => {
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
                            <div style={{ fontSize: '11.5px', color: SUB, marginTop: '10px', paddingTop: '10px', borderTop: `1px dashed ${LINE}` }}>
                                赤い語が、あなたの耳を通らなかった内容語です。
                            </div>
                        </div>
                        <button
                            onClick={next}
                            style={{
                                marginTop: '12px', width: '100%', border: 'none', cursor: 'pointer',
                                background: INK, color: '#fff', padding: '16px', borderRadius: '12px', fontSize: '15px', fontWeight: 900,
                            }}
                        >
                            {i + 1 >= DIAG_ITEMS.length ? '結果を見る' : '次へ'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
