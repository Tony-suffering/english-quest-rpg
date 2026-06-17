'use client';
// 罠師（わなし） — TOEIC Part 5 を解くのをやめ、ひっかけ選択肢を作る側に回る。
// 仕掛ける(主役): 正解だけ提示→誤答3つ+煽りを作る→AI審判→予測釣果。
// 解く: ハウスバンクの罠を作者の煽り付きで解く(対人戦の感触)。

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { SOLVE_BANK, AUTHOR_PROMPTS } from '@/data/english/wanashi-bank';

const GOLD = '#D4AF37', GREEN = '#10B981', INK = '#1C1917', SUB = '#78716C';
const LINE = '#E7E5E4', RED = '#B91C1C', PAPER = '#FBF7EF';

interface Verdict { word: string; accept: boolean; reason: string; plausibility: number; }
interface RefResult { verdicts: Verdict[]; predictedCatch: number | null; refereeOffline?: boolean; }
interface SavedTrap { stem: string; correct: string; words: { word: string; plausibility: number }[]; predictedCatch: number | null; }

function Stem({ stem }: { stem: string }) {
    const parts = stem.split('___');
    return (
        <span>
            {parts[0]}
            <span style={{ display: 'inline-block', minWidth: 54, borderBottom: `2px solid ${GOLD}`, textAlign: 'center', color: SUB }}>　</span>
            {parts[1]}
        </span>
    );
}

export default function WanashiPage() {
    const [mode, setMode] = useState<'make' | 'solve'>('make');

    // ── 仕掛ける ──
    const [pIdx, setPIdx] = useState(0);
    const [inputs, setInputs] = useState([{ word: '', taunt: '' }, { word: '', taunt: '' }, { word: '', taunt: '' }]);
    const [judging, setJudging] = useState(false);
    const [result, setResult] = useState<RefResult | null>(null);
    const [saved, setSaved] = useState<SavedTrap[]>([]);
    const prompt = AUTHOR_PROMPTS[pIdx];

    useEffect(() => {
        try {
            const s = JSON.parse(localStorage.getItem('tl_wanashi_traps') || '[]');
            if (Array.isArray(s)) setSaved(s);
        } catch { /* noop */ }
    }, []);

    const setInput = (i: number, field: 'word' | 'taunt', v: string) => {
        setInputs((prev) => prev.map((x, j) => (j === i ? { ...x, [field]: v } : x)));
    };

    const judge = async () => {
        const candidates = inputs.filter((x) => x.word.trim()).map((x) => ({ word: x.word.trim(), taunt: x.taunt.trim() }));
        if (candidates.length === 0) return;
        setJudging(true);
        setResult(null);
        try {
            const res = await fetch('/english/wanashi/judge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stem: prompt.stem, correct: prompt.correct, candidates }),
            });
            const data: RefResult = await res.json();
            if (!Array.isArray(data.verdicts)) throw new Error('bad referee response');
            setResult(data);
            const accepted = data.verdicts.filter((v) => v.accept);
            if (accepted.length > 0) {
                const trap: SavedTrap = {
                    stem: prompt.stem, correct: prompt.correct,
                    words: accepted.map((v) => ({ word: v.word, plausibility: v.plausibility })),
                    predictedCatch: data.predictedCatch,
                };
                setSaved((prev) => {
                    const next = [trap, ...prev].slice(0, 50);
                    try { localStorage.setItem('tl_wanashi_traps', JSON.stringify(next)); } catch { /* noop */ }
                    return next;
                });
            }
        } catch {
            setResult({ verdicts: inputs.filter(x => x.word.trim()).map(x => ({ word: x.word.trim(), accept: false, reason: '審判に届かなかった。通信失敗。', plausibility: 0 })), predictedCatch: null });
        } finally {
            setJudging(false);
        }
    };

    const nextPrompt = () => {
        setPIdx((i) => (i + 1) % AUTHOR_PROMPTS.length);
        setInputs([{ word: '', taunt: '' }, { word: '', taunt: '' }, { word: '', taunt: '' }]);
        setResult(null);
    };

    // ── 解く ──
    const [sIdx, setSIdx] = useState(0);
    const [picked, setPicked] = useState<number | null>(null);
    const trap = SOLVE_BANK[sIdx];
    const pickedChoice = picked !== null ? trap.choices[picked] : null;
    const nextSolve = () => { setSIdx((i) => (i + 1) % SOLVE_BANK.length); setPicked(null); };

    const totalCaught = useMemo(() => saved.reduce((s, t) => s + (t.predictedCatch || 0), 0), [saved]);

    return (
        <div style={{ minHeight: '100vh', background: '#F2F0EC', padding: '24px 16px 90px' }}>
            <div style={{ maxWidth: 660, margin: '0 auto' }}>

                <header style={{ marginBottom: 18 }}>
                    <Link href="/english/home" style={{ fontSize: 12, color: '#A8A29E', textDecoration: 'none' }}>← 英語ラボ</Link>
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.22em', color: GOLD, margin: '12px 0 6px' }}>TOEIC PART 5 ・ 罠師（わなし）</div>
                    <h1 style={{ fontSize: 28, fontWeight: 900, color: INK, margin: '0 0 8px', letterSpacing: '-0.02em' }}>解くな。仕掛けろ。</h1>
                    <p style={{ fontSize: 13.5, color: SUB, lineHeight: 1.75, margin: 0 }}>
                        正解は教えてやる。お前の仕事は<strong style={{ color: INK }}>他人を釣る誤答を3つ設計する</strong>こと。
                        Part 5 の本質は「正解を知る」じゃなく「そっくりな誤答を瞬時に切る」こと。釣る側に回ると、その対比が出題者の解像度で体に入る。
                    </p>
                </header>

                {/* モード切替 */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                    {([['make', '仕掛ける'], ['solve', '解く']] as const).map(([m, label]) => (
                        <button key={m} onClick={() => setMode(m)} style={{
                            flex: 1, borderRadius: 10, padding: '10px 0', fontSize: 14, cursor: 'pointer',
                            border: `1.5px solid ${mode === m ? INK : LINE}`, fontWeight: mode === m ? 800 : 600,
                            background: mode === m ? INK : '#fff', color: mode === m ? '#fff' : SUB,
                        }}>{label}</button>
                    ))}
                </div>

                {mode === 'make' && (
                    <>
                        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '20px', marginBottom: 16 }}>
                            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', color: SUB, marginBottom: 10 }}>お題</div>
                            <div style={{ fontSize: 18, color: INK, lineHeight: 1.7, marginBottom: 12 }}><Stem stem={prompt.stem} /></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                                <span style={{ fontSize: 11, fontWeight: 800, color: '#065F46', background: '#ECFDF5', borderRadius: 6, padding: '3px 10px' }}>正解 {prompt.correct}</span>
                            </div>
                            <div style={{ fontSize: 12.5, color: SUB, lineHeight: 1.6, background: PAPER, borderRadius: 8, padding: '8px 11px' }}>{prompt.hint}</div>
                        </div>

                        <div style={{ fontSize: 12, fontWeight: 800, color: SUB, marginBottom: 8 }}>お前の罠を3つ仕掛けろ（単語＋なぜ釣れるかの煽り）</div>
                        {inputs.map((inp, i) => {
                            const v = result?.verdicts?.find((x) => x.word.toLowerCase().trim() === inp.word.toLowerCase().trim());
                            const bd = v ? (v.accept ? GREEN : RED) : LINE;
                            return (
                                <div key={i} style={{ border: `1.5px solid ${bd}`, borderRadius: 12, padding: 12, marginBottom: 10, background: '#fff' }}>
                                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        <span style={{ fontSize: 12, fontWeight: 800, color: '#A8A29E', width: 16 }}>{i + 1}</span>
                                        <input value={inp.word} onChange={(e) => setInput(i, 'word', e.target.value)} placeholder="誤答の単語"
                                            style={{ flex: '0 0 38%', fontSize: 15, padding: '8px 10px', border: `1px solid ${LINE}`, borderRadius: 8, color: INK, fontFamily: 'inherit' }} />
                                        <input value={inp.taunt} onChange={(e) => setInput(i, 'taunt', e.target.value)} placeholder="なぜ釣れる? 煽り(任意)"
                                            style={{ flex: 1, fontSize: 13, padding: '8px 10px', border: `1px solid ${LINE}`, borderRadius: 8, color: INK, fontFamily: 'inherit' }} />
                                    </div>
                                    {v && (
                                        <div style={{ marginTop: 8, marginLeft: 24, fontSize: 12.5, lineHeight: 1.6, color: v.accept ? '#065F46' : RED }}>
                                            <strong>{v.accept ? `通過 ・ 予測釣り率 ${v.plausibility}%` : '却下'}</strong> — {v.reason}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <button onClick={judge} disabled={judging} style={{
                            width: '100%', borderRadius: 10, padding: '12px 0', fontSize: 14, fontWeight: 800, marginTop: 4,
                            border: 'none', background: judging ? '#A8A29E' : GREEN, color: '#fff', cursor: judging ? 'default' : 'pointer',
                        }}>{judging ? '審判中…' : '審判にかける'}</button>

                        {result && (
                            <div style={{ marginTop: 16 }}>
                                {result.refereeOffline && (
                                    <div style={{ fontSize: 11.5, color: RED, marginBottom: 8 }}>※ 審判オフライン（本番で OPENAI_API_KEY 設定が必要）。下は暫定。</div>
                                )}
                                {/* 釣果カード(予測) */}
                                {(() => {
                                    const accepted = (result.verdicts || []).filter(v => v.accept);
                                    if (accepted.length === 0) return (
                                        <div style={{ background: PAPER, border: `1px solid ${LINE}`, borderRadius: 12, padding: 16, fontSize: 13.5, color: RED, lineHeight: 1.6 }}>
                                            全部却下。罠を仕掛けたつもりが、お前の文法が罠だった。書き直せ。
                                        </div>
                                    );
                                    return (
                                        <div style={{ background: PAPER, border: `2px solid ${INK}`, borderRadius: 8, padding: '18px 20px' }}>
                                            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', color: SUB }}>本日の戦果（予測）</div>
                                            <div style={{ fontSize: 16, color: INK, margin: '8px 0', lineHeight: 1.6 }}><Stem stem={prompt.stem} /> <span style={{ color: '#065F46', fontWeight: 700 }}>= {prompt.correct}</span></div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '4px 0 12px' }}>
                                                {accepted.map((v, i) => (
                                                    <span key={i} style={{ fontSize: 13, fontWeight: 700, color: '#7F1D1D', background: '#FEF2F2', borderRadius: 6, padding: '4px 10px' }}>{v.word} <span style={{ color: SUB, fontWeight: 500 }}>釣率{v.plausibility}%</span></span>
                                                ))}
                                            </div>
                                            <div style={{ borderTop: `1px dashed ${INK}`, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: 13, color: INK }}>予測釣果 <strong style={{ fontSize: 18, color: RED }}>{result.predictedCatch ?? '—'}{result.predictedCatch != null ? '%' : ''}</strong></span>
                                                <span style={{ fontSize: 11, fontWeight: 900, color: GOLD, letterSpacing: '0.1em' }}>toniolab ・ 罠師</span>
                                            </div>
                                        </div>
                                    );
                                })()}
                                <button onClick={nextPrompt} style={{ marginTop: 12, fontSize: 13, fontWeight: 800, color: '#fff', background: INK, border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer' }}>次のお題 →</button>
                            </div>
                        )}

                        <div style={{ marginTop: 18, fontSize: 12, color: SUB }}>
                            仕掛けた罠 <strong style={{ color: INK }}>{saved.length}</strong> 件 ・ 予測累計釣果 <strong style={{ color: RED }}>{totalCaught}</strong>
                            <span style={{ color: '#A8A29E' }}>（本物の釣果＝他の受験者がお前の罠に挑むのは次版で実装）</span>
                        </div>
                    </>
                )}

                {mode === 'solve' && (
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: 16, padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <span style={{ fontSize: 11, fontWeight: 800, color: SUB }}>誰かの罠 ・ {sIdx + 1}/{SOLVE_BANK.length}</span>
                            <span style={{ fontSize: 11, color: '#A8A29E' }}>{trap.point}</span>
                        </div>
                        <div style={{ fontSize: 18, color: INK, lineHeight: 1.7, marginBottom: 16 }}><Stem stem={trap.stem} /></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {trap.choices.map((c, i) => {
                                const revealed = picked !== null;
                                let bg = '#fff', bd = LINE, col = INK;
                                if (revealed) {
                                    if (c.correct) { bg = '#ECFDF5'; bd = GREEN; col = '#065F46'; }
                                    else if (i === picked) { bg = '#FEF2F2'; bd = RED; col = '#7F1D1D'; }
                                    else { col = '#A8A29E'; }
                                }
                                return (
                                    <button key={i} onClick={() => picked === null && setPicked(i)} disabled={revealed}
                                        style={{ textAlign: 'left', border: `1.5px solid ${bd}`, background: bg, color: col, borderRadius: 10, padding: '11px 14px', fontSize: 15, cursor: revealed ? 'default' : 'pointer', fontFamily: 'inherit' }}>
                                        <span style={{ fontWeight: 700, marginRight: 8, color: '#A8A29E' }}>{String.fromCharCode(65 + i)}</span>{c.word}
                                        {revealed && c.correct && <span style={{ float: 'right', fontSize: 12, fontWeight: 800 }}>正解</span>}
                                    </button>
                                );
                            })}
                        </div>
                        {picked !== null && (
                            <div style={{ marginTop: 14 }}>
                                <div style={{ display: 'inline-block', fontSize: 12, fontWeight: 800, color: pickedChoice?.correct ? '#065F46' : '#7F1D1D', background: pickedChoice?.correct ? '#ECFDF5' : '#FEF2F2', borderRadius: 999, padding: '4px 12px', marginBottom: 10 }}>
                                    {pickedChoice?.correct ? '回避 ・ 罠にかからなかった' : '釣られた'}
                                </div>
                                {!pickedChoice?.correct && pickedChoice?.taunt && (
                                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.7, marginBottom: 10 }}>作者:「{pickedChoice.taunt}」</div>
                                )}
                                <div style={{ fontSize: 12.5, color: SUB }}>正解は <strong style={{ color: '#065F46' }}>{trap.choices.find(c => c.correct)?.word}</strong> ・ {trap.point}</div>
                                <button onClick={nextSolve} style={{ marginTop: 12, fontSize: 13, fontWeight: 800, color: '#fff', background: INK, border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer' }}>次の罠 →</button>
                            </div>
                        )}
                    </div>
                )}

                <div style={{ marginTop: 16, padding: '10px 14px', background: '#fff', border: `1px dashed ${LINE}`, borderRadius: 10, fontSize: 11, color: '#A8A29E', lineHeight: 1.7 }}>
                    間違える恥を、罠を仕掛ける快感に変える。誤答を製造できる奴は、本番で同じ罠を一瞬で切れる。
                </div>
            </div>
        </div>
    );
}
