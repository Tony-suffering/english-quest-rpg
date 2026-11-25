'use client';

/**
 * DEBATE ROOM — (とにおラボ版。元は iwasaki-naisou-website の /english/debate。講師にリンクで渡すために公開側へ置いた 2026-11-25)Pinker vs Hasan(Al Jazeera UpFront)を講師と画面共有で見ながら学ぶページ。
 * 1ラウンドずつ再生して止め、「言う一言」→「先生に聞くこと」で回す。データは src/data/english/debate-pinker.ts。
 * 再生の頭出しは YouTube の iframe に postMessage(enablejsapi=1)で seekTo / playVideo を送る。
 */

import { createContext, useContext, useRef, useState } from 'react';
import { DEBATE_META, DEBATE_ROUNDS, DEBATE_TAKEAWAYS, DEBATE_HOWTO, type DebateRound } from '@/data/english/debate-pinker';
import { DEBATE_EN, DEBATE_META_EN, type DebateRoundEn } from '@/data/english/debate-pinker-en';

const GOLD = '#D4AF37';
const GOLD_DEEP = '#A8862A';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E0CF';
const PAPER = '#FBFAF7';
const HASAN = '#9A3412';
const PINKER = '#1D4ED8';
const SERIF = '"Yu Mincho", "YuMincho", "Hiragino Mincho ProN", "Noto Serif JP", "Noto Serif CJK JP", serif';
const ROMAN = 'Georgia, "Times New Roman", serif';

const CSS = `
.db{min-height:100vh;background:${PAPER};color:${INK};padding:28px 16px 96px}
.db-wrap{max-width:960px;margin:0 auto}
.db-kicker{display:flex;justify-content:space-between;gap:12px;font-family:${ROMAN};font-size:11px;letter-spacing:.28em;color:${GOLD_DEEP};font-weight:700;border-bottom:1px solid ${LINE};padding-bottom:10px;flex-wrap:wrap}
.db-kicker span:last-child{letter-spacing:.1em;color:${SUB};font-weight:400}
.db-h1{font-family:${SERIF};font-size:clamp(28px,7vw,54px);line-height:1.25;font-weight:700;margin:22px 0 0}
.db-h1 .vs{font-family:${ROMAN};font-style:italic;color:${GOLD_DEEP};font-weight:400;margin:0 .25em}
.db-h1 .p{color:${PINKER}}
.db-h1 .h{color:${HASAN}}
.db-lede{font-size:14.5px;line-height:1.9;color:#44403C;margin:14px 0 0;max-width:720px}
.db-people{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px}
.db-person{background:#fff;border:1px solid ${LINE};padding:12px 14px;font-size:12.5px;line-height:1.7}
.db-person b{display:block;font-family:${ROMAN};font-size:15px;margin-bottom:2px}
.db-stage{position:static;z-index:5;background:${PAPER};padding:16px 0 10px;margin-top:20px;border-bottom:3px double ${GOLD}}
.db-video{position:relative;width:100%;max-width:560px;aspect-ratio:16/9;background:#000;margin:0 auto}
.db-video iframe{position:absolute;inset:0;width:100%;height:100%;border:0}
.db-now{display:flex;justify-content:center;gap:10px;align-items:center;margin-top:8px;font-size:12px;color:${SUB};flex-wrap:wrap}
.db-now b{color:${INK}}
.db-sec{margin-top:34px}
.db-sech{display:flex;align-items:baseline;gap:12px;border-bottom:1px solid ${LINE};padding-bottom:8px;margin-bottom:14px}
.db-sech .en{font-family:${ROMAN};font-size:11px;letter-spacing:.28em;color:${GOLD_DEEP};font-weight:700}
.db-sech .ja{font-family:${SERIF};font-size:20px;font-weight:700}
.db-howto{background:#fff;border:1px solid ${LINE};padding:14px 18px;margin:0;counter-reset:s;list-style:none}
.db-howto li{counter-increment:s;font-size:13.5px;line-height:1.8;padding-left:28px;position:relative}
.db-howto li:before{content:counter(s);position:absolute;left:0;top:2px;width:20px;height:20px;border-radius:10px;background:${GOLD};color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;font-family:${ROMAN}}
.db-round{background:#fff;border:1px solid ${LINE};margin-top:16px;padding:18px 20px 16px;scroll-margin-top:24px}
.db-round.on{border-color:${GOLD};box-shadow:0 0 0 2px rgba(212,175,55,.25)}
.db-rhead{display:flex;justify-content:space-between;gap:12px;align-items:flex-start;flex-wrap:wrap}
.db-rno{font-family:${ROMAN};font-size:11px;letter-spacing:.22em;color:${GOLD_DEEP};font-weight:700}
.db-rtitle{font-family:${SERIF};font-size:20px;font-weight:700;line-height:1.45;margin-top:4px}
.db-rtopic{font-size:12.5px;color:${SUB};margin-top:4px;line-height:1.7}
.db-play{flex-shrink:0;border:1px solid ${GOLD};background:#fff;color:#6B5410;font-weight:700;font-size:13px;padding:9px 14px;cursor:pointer;font-family:inherit}
.db-play:hover{background:#FBF4DF}
.db-ad{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.db-ad > div{padding:10px 12px;font-size:12.5px;line-height:1.75;border-left:3px solid}
.db-ad .a{border-color:${HASAN};background:#FFF7F3}
.db-ad .d{border-color:${PINKER};background:#F4F7FF}
.db-ad b{display:block;font-size:11px;letter-spacing:.08em;margin-bottom:2px}
.db-lines{margin-top:14px}
.db-line{display:grid;grid-template-columns:64px 1fr;gap:10px;padding:8px 0;border-top:1px dashed ${LINE}}
.db-who{font-family:${ROMAN};font-size:12px;font-weight:700;padding-top:2px}
.db-en{font-family:${ROMAN};font-size:16px;line-height:1.6;overflow-wrap:anywhere}
.db-ja{font-size:12.5px;color:${SUB};margin-top:2px;line-height:1.6}
.db-moves{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.db-move{border:1px solid ${LINE};padding:8px 10px;font-size:12px;line-height:1.65;flex:1 1 260px;background:${PAPER}}
.db-move b{font-size:12.5px}
.db-phr{margin-top:14px}
.db-phr table{width:100%;border-collapse:collapse;font-size:13px}
.db-phr td{border-top:1px solid ${LINE};padding:7px 6px;vertical-align:top;line-height:1.6}
.db-phr td:first-child{font-family:${ROMAN};font-size:14.5px;width:40%;overflow-wrap:anywhere}
.db-phr td:last-child{color:${SUB};font-size:12px}
.db-foot{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px}
.db-say{background:#FBF4DF;border:1px solid ${GOLD};padding:12px 14px}
.db-ask{background:#fff;border:1px solid ${LINE};padding:12px 14px}
.db-say .k,.db-ask .k{font-size:11px;font-weight:700;letter-spacing:.08em;color:${GOLD_DEEP}}
.db-say .v,.db-ask .v{font-family:${ROMAN};font-size:16px;line-height:1.55;margin-top:4px;overflow-wrap:anywhere}
.db-verdict{margin-top:10px;font-size:12.5px;color:#44403C}
.db-verdict b{color:${INK}}
.db-kit{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.db-kit > div{background:#fff;border:1px solid ${LINE};padding:14px 16px}
.db-kit h3{margin:0 0 8px;font-family:${ROMAN};font-size:15px}
.db-kit ul{margin:0;padding-left:18px;font-size:13px;line-height:1.85}
.db-take{background:#fff;border:1px solid ${GOLD};padding:14px 18px}
.db-take li{font-size:13.5px;line-height:1.85;overflow-wrap:anywhere}
.bi{cursor:pointer;border-bottom:1px dotted rgba(168,134,42,.55);transition:background .15s ease}
.bi:hover{background:rgba(212,175,55,.12)}
.bi.en{font-family:${ROMAN};border-bottom-style:solid;border-bottom-color:rgba(29,78,216,.45)}
.db-lang{border:1px solid #D4AF37;background:#fff;color:#6B5410;font-weight:700;font-size:12px;padding:5px 12px;cursor:pointer;font-family:inherit;letter-spacing:.04em}
.db-lang.on{background:#D4AF37;color:#fff}
@media (min-width:641px) and (min-height:820px){.db-stage{position:sticky;top:0}}
@media (max-width:640px){
  .db-people,.db-ad,.db-foot,.db-kit{grid-template-columns:1fr}
  .db-round{padding:16px 14px}
  .db-line{grid-template-columns:1fr;gap:2px}
}
`;

function mmss(s: number): string {
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** 日本語を押すと英語に、もう一度押すと日本語に戻る。上の「全部英語」で全体が切り替わる */
const EnCtx = createContext(false);

function Bi({ ja, en, block = false }: { ja: string; en?: string; block?: boolean }) {
    const all = useContext(EnCtx);
    const [flip, setFlip] = useState(false);
    if (!en) return <>{ja}</>;
    const showEn = flip ? !all : all;
    const Tag = block ? 'div' : 'span';
    return (
        <Tag
            className={`bi${showEn ? ' en' : ''}`}
            onClick={(e) => { e.stopPropagation(); setFlip((f) => !f); }}
            title={showEn ? '押すと日本語' : 'Tap for English'}
        >
            {showEn ? en : ja}
        </Tag>
    );
}

export default function DebatePage() {
    const frame = useRef<HTMLIFrameElement>(null);
    const [now, setNow] = useState<number | null>(null);
    const [allEn, setAllEn] = useState(false);

    const send = (func: string, args: unknown[] = []) => {
        frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
    };

    const play = (r: DebateRound) => {
        setNow(r.no);
        send('seekTo', [r.start, true]);
        send('playVideo');
        if (!window.matchMedia('(min-width:641px) and (min-height:820px)').matches) {
            frame.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const current = DEBATE_ROUNDS.find((r) => r.no === now);
    const next = current ? DEBATE_ROUNDS.find((r) => r.no === current.no + 1) : undefined;
    const E = DEBATE_META_EN;

    return (
        <EnCtx.Provider value={allEn}>
            <div className="db">
                <style>{CSS}</style>
                <div className="db-wrap">
                    <div className="db-kicker">
                        <span>DEBATE ROOM</span>
                        <span>先生と一緒に見る ・ 本物のディベートの英語</span>
                    </div>

                    <h1 className="db-h1">
                        <span className="p">Pinker</span><span className="vs">vs</span><span className="h">Hasan</span>
                    </h1>
                    <p className="db-lede"><Bi ja={DEBATE_META.oneLine} en={E.oneLine} /></p>
                    <div className="db-people">
                        <div className="db-person" style={{ borderTop: `3px solid ${PINKER}` }}><b style={{ color: PINKER }}>Steven Pinker</b><Bi ja={DEBATE_META.pinker.replace('Steven Pinker — ', '')} en={E.pinker} /></div>
                        <div className="db-person" style={{ borderTop: `3px solid ${HASAN}` }}><b style={{ color: HASAN }}>Mehdi Hasan</b><Bi ja={DEBATE_META.hasan.replace('Mehdi Hasan — ', '')} en={E.hasan} /></div>
                    </div>

                    <div className="db-stage">
                        <div className="db-video">
                            <iframe
                                ref={frame}
                                src={`https://www.youtube.com/embed/${DEBATE_META.youtubeId}?enablejsapi=1&rel=0&modestbranding=1`}
                                title={DEBATE_META.title}
                                allow="autoplay; encrypted-media; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                        <div className="db-now">
                            <button className={`db-lang${allEn ? ' on' : ''}`} onClick={() => setAllEn((v) => !v)}>
                                {allEn ? '日本語にもどす' : 'ALL ENGLISH — 全部英語'}
                            </button>
                            {current ? (
                                <>
                                    <span>再生中 <b>ROUND {current.no}</b> {mmss(current.start)}〜{next ? mmss(next.start) : '終わり'}</span>
                                    <span>{next ? `${mmss(next.start)} で止めて、下の2つを言う` : '最後まで流す'}</span>
                                    <button className="db-play" style={{ padding: '5px 10px', fontSize: 12 }} onClick={() => send('pauseVideo')}>止める</button>
                                </>
                            ) : (
                                <span>{DEBATE_META.show} 「{DEBATE_META.title}」 約15分 ・ 日本語は押すと英語になる</span>
                            )}
                        </div>
                    </div>

                    <section className="db-sec">
                        <div className="db-sech"><span className="en">HOW TO</span><span className="ja">先生との進め方</span></div>
                        <ol className="db-howto">
                            {DEBATE_HOWTO.map((x, i) => <li key={x}><Bi ja={x} en={E.howto[i]} /></li>)}
                        </ol>
                        <div style={{ fontSize: 12, color: SUB, marginTop: 8, overflowWrap: 'anywhere' }}>チャットに貼るリンク: https://www.toniolab.com/english/debate ・ 動画: {DEBATE_META.url}</div>
                    </section>

                    <section className="db-sec">
                        <div className="db-sech"><span className="en">12 ROUNDS</span><span className="ja">1往復ずつ</span></div>
                        {DEBATE_ROUNDS.map((r) => <Round key={r.no} r={r} en={DEBATE_EN[r.no]} on={r.no === now} onPlay={() => play(r)} />)}
                    </section>

                    <section className="db-sec">
                        <div className="db-sech"><span className="en">TOOLKITS</span><span className="ja">2人の技</span></div>
                        <div style={{ fontSize: 13.5, marginBottom: 12 }}><Bi ja={DEBATE_TAKEAWAYS.score} en={E.score} /></div>
                        <div className="db-kit">
                            <div style={{ borderTop: `3px solid ${HASAN}` }}>
                                <h3 style={{ color: HASAN }}>Hasan — <Bi ja="攻める技" en="how he attacks" /></h3>
                                <ul>{DEBATE_TAKEAWAYS.hasanKit.map((x, i) => <li key={x}><Bi ja={x} en={E.hasanKit[i]} /></li>)}</ul>
                            </div>
                            <div style={{ borderTop: `3px solid ${PINKER}` }}>
                                <h3 style={{ color: PINKER }}>Pinker — <Bi ja="受ける技" en="how he defends" /></h3>
                                <ul>{DEBATE_TAKEAWAYS.pinkerKit.map((x, i) => <li key={x}><Bi ja={x} en={E.pinkerKit[i]} /></li>)}</ul>
                            </div>
                        </div>
                    </section>

                    <section className="db-sec">
                        <div className="db-sech"><span className="en">FOR THE EIKEN</span><span className="ja"><Bi ja="テーマ2(貧困)に持ち帰る" en={E.forTheme2} /></span></div>
                        <ul className="db-take">
                            {DEBATE_TAKEAWAYS.forTheme2.map((x) => <li key={x}>{x}</li>)}
                        </ul>
                    </section>
                </div>
            </div>
        </EnCtx.Provider>
    );
}

function Round({ r, en, on, onPlay }: { r: DebateRound; en?: DebateRoundEn; on: boolean; onPlay: () => void }) {
    const L = DEBATE_META_EN.roundLabels;
    return (
        <article className={`db-round${on ? ' on' : ''}`} id={`round-${r.no}`}>
            <div className="db-rhead">
                <div style={{ flex: '1 1 300px', minWidth: 0 }}>
                    <div className="db-rno">ROUND {r.no} ・ {mmss(r.start)}</div>
                    <div className="db-rtitle"><Bi ja={r.title} en={en?.title} /></div>
                    <div className="db-rtopic"><Bi ja={r.topic} en={en?.topic} /></div>
                </div>
                <button className="db-play" onClick={onPlay}>{mmss(r.start)} から再生</button>
            </div>

            <div className="db-ad">
                <div className="a"><b style={{ color: HASAN }}><Bi ja="HASAN の攻め" en={L.attack} /></b><Bi ja={r.attack} en={en?.attack} /></div>
                <div className="d"><b style={{ color: PINKER }}><Bi ja="PINKER の受け" en={L.defense} /></b><Bi ja={r.defense} en={en?.defense} /></div>
            </div>

            <div className="db-lines">
                {r.lines.map((l, i) => (
                    <div className="db-line" key={i}>
                        <div className="db-who" style={{ color: l.who === 'hasan' ? HASAN : PINKER }}>{l.who === 'hasan' ? 'HASAN' : 'PINKER'}</div>
                        <div>
                            <div className="db-en">{l.en}</div>
                            <div className="db-ja">{l.ja}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="db-moves">
                {r.moves.map((m, i) => (
                    <div className="db-move" key={m.name} style={{ borderLeft: `3px solid ${m.who === 'hasan' ? HASAN : PINKER}` }}>
                        <b><Bi ja={m.name} en={en?.moves[i]?.name} /></b>(<span style={{ color: m.who === 'hasan' ? HASAN : PINKER }}>{m.who === 'hasan' ? 'Hasan' : 'Pinker'}</span>)<br />
                        <Bi ja={m.how} en={en?.moves[i]?.how} />
                    </div>
                ))}
            </div>

            <div className="db-phr">
                <table>
                    <tbody>
                        {r.phrases.map((p, i) => (
                            <tr key={p.en}>
                                <td>{p.en}</td>
                                <td>{p.ja}</td>
                                <td><Bi ja={p.use} en={en?.uses[i]} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="db-foot">
                <div className="db-say"><div className="k"><Bi ja="止めたら言う一言" en={L.say} /></div><div className="v">{r.sayThis}</div></div>
                <div className="db-ask"><div className="k"><Bi ja="先生に聞くこと" en={L.ask} /></div><div className="v">{r.askTeacher}</div></div>
            </div>
            <div className="db-verdict"><b><Bi ja="見立て" en={L.verdict} /></b> <Bi ja={r.verdict} en={en?.verdict} /></div>
        </article>
    );
}
