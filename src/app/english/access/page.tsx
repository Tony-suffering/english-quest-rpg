'use client';

/**
 * ACCESS -- 聞けない動画に、順番をつける
 *
 * 初学者の罠は「全部知らないから、どこから始めればいいか分からない」。
 * これは量の問題に見えて、実は順番が示されていないだけ。
 * 108,834表現の実測コーパスと動画の字幕を突き合わせて、順番と到達率を数字で出す。
 */

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ACCESS_VIDEOS, BUY_URL, WAITLIST_URL, FREE_BLOCKS, PRICE } from '@/data/english/access-index';
import { canOpen, submitCode, type UnlockResult } from '@/lib/english/unlock';
import { BLOCKS, reachAt, type AccessVideo, type AccessChunk } from '@/data/english/access-types';
import { glossFor } from '@/data/english/chunk-gloss';
import { KIND_LABELS, GROUP_LABELS, TIER_LABELS, CHUNK_STATS } from '@/data/english/chunk-ranking';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function AccessPage() {
    const [videoId, setVideoId] = useState(ACCESS_VIDEOS[0]?.id ?? '');
    const v = ACCESS_VIDEOS.find(x => x.id === videoId) ?? ACCESS_VIDEOS[0];
    const [openBlock, setOpenBlock] = useState<number | null>(1);
    const [hideJoints, setHideJoints] = useState(true);

    if (!v) {
        return <div style={{ padding: '60px 20px' }}>解析済みの動画がありません。</div>;
    }

    return (
        <div style={{
            background: CREAM, minHeight: '100vh', color: INK,
            fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
        }}>
            <Hero v={v} />
            <Proof v={v} />
            <Trap v={v} />
            <Curves v={v} />
            <Order
                v={v}
                openBlock={openBlock} setOpenBlock={setOpenBlock}
                hideJoints={hideJoints} setHideJoints={setHideJoints}
            />
            <Limits />
            <Foot v={v} others={ACCESS_VIDEOS} onPick={setVideoId} />
        </div>
    );
}

const Sec = ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <section id={id} style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 20px 0' }}>{children}</section>
);
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: '11px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '3px', marginBottom: '13px' }}>{children}</div>
);
const H = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(22px, 4vw, 33px)', fontWeight: 900, lineHeight: 1.42, margin: '0 0 18px' }}>{children}</h2>
);
const Body = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontSize: '15px', lineHeight: 2.1, color: '#44403C', margin: '0 0 16px' }}>{children}</p>
);

// ============================================================
function Hero({ v }: { v: AccessVideo }) {
    const w500 = v.wordCurve.find(c => c[0] === 500)?.[1] ?? 0;
    return (
        <section style={{ background: `radial-gradient(1100px 460px at 50% -14%, #FBF4DD, ${CREAM})`, padding: '46px 0 20px' }}>
            <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'Georgia, serif', fontSize: '30px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>ACCESS</span>
                    <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '5px', letterSpacing: '1px' }}>
                        コーパス {CHUNK_STATS.total.toLocaleString()}表現 × この動画
                    </span>
                </div>

                <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(27px, 5.2vw, 46px)', fontWeight: 900, lineHeight: 1.32, margin: '0 0 18px' }}>
                    あなたは単語を知らないんじゃない。<br />
                    <span style={{ color: DEEPGOLD }}>並びを知らないだけ。</span>
                </h1>
                <p style={{ fontSize: 'clamp(14px, 2vw, 16.5px)', lineHeight: 2.05, color: '#44403C', maxWidth: '720px', margin: '0 0 18px' }}>
                    この{Math.round(v.duration / 60)}分の会話は、日本の物差しでいえば英検1級を超える。台本がなく、2人が被せて喋り、話速は{v.wpm}語毎分。
                    聞き取るには{v.chunkKinds.toLocaleString()}個の表現が要る。
                </p>
                <p style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', lineHeight: 1.95, color: INK, fontWeight: 800, maxWidth: '720px', margin: '0 0 26px', borderLeft: `4px solid ${GOLD}`, paddingLeft: '16px' }}>
                    そのうち上位100個は<b style={{ color: DEEPGOLD }}>100%</b>、上位600個でも<b style={{ color: DEEPGOLD }}>{v.bandTable.find(b => b.top === 600)?.w1000}%</b>が、
                    <b style={{ color: DEEPGOLD }}>中学・高校で習う上位1,000語だけ</b>でできている。
                    <span style={{ fontWeight: 700, color: '#44403C', fontSize: '0.92em' }}>　you know / i think / kind of / a lot of / of course — 単語は全部知っている。並びを知らない。</span>
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '18px', alignItems: 'start' }}>
                    <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
                        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '14px', overflow: 'hidden', background: '#000' }}>
                            <iframe
                                src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0`}
                                title={v.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                            />
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 800, marginTop: '10px', lineHeight: 1.6 }}>{v.title}</div>
                        <div style={{ fontSize: '11.5px', color: SUB, marginTop: '3px' }}>
                            {v.channel} ｜ {v.uploadDate.slice(0, 4)}-{v.uploadDate.slice(4, 6)}-{v.uploadDate.slice(6)}
                        </div>
                    </div>
                    <div style={{ background: INK, color: '#fff', borderRadius: '14px', padding: '20px 18px' }}>
                        <div style={{ fontSize: '10.5px', fontWeight: 900, letterSpacing: '2px', color: GOLD, marginBottom: '14px' }}>字幕からの実測</div>
                        {[
                            [`${Math.round(v.duration / 60)}分`, '長さ'],
                            [`${v.wpm}語毎分`, '話速(日常会話は約150)'],
                            [`${v.tokens.toLocaleString()}語`, '総語数'],
                            [`${v.distinctWords.toLocaleString()}種`, '異なり語数'],
                            [`${v.chunkKinds.toLocaleString()}個`, 'コーパスと一致した表現'],
                            [`${v.chunkInstances.toLocaleString()}回`, 'その延べ出現'],
                        ].map(([n, u]) => (
                            <div key={u} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '10px', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                                <span style={{ fontSize: '11px', opacity: 0.72 }}>{u}</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 900, color: GOLD, whiteSpace: 'nowrap' }}>{n}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================
/**
 * 商品の芯。「単語が足りない」という思い込みを、その人が聞きたい動画そのもので壊す。
 * ここが弱いと、以下のカバー曲線は全部ただの豆知識になる。
 */
function Proof({ v }: { v: AccessVideo }) {
    const easy = useMemo(
        () => v.chunks.slice(0, 400).filter(c => c[9] <= 1000).map(c => c[1]),
        [v],
    );
    return (
        <Sec>
            <Eyebrow>THE PROOF</Eyebrow>
            <H>部品の単語は、もう持っている。</H>
            <Body>
                聞き取れないと「単語が足りない」と思う。だから単語帳に戻る。ここが最大の誤診で、しかも実測すると一瞬で消える。
                この動画に出てくる表現を、<b>それを構成する単語がどの頻度帯にあるか</b>で仕分けた結果が下の表。
            </Body>

            <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '18px', overflow: 'hidden', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', background: INK, color: '#fff' }}>
                    {['覚える表現', '上位1,000語だけ', '2,000語まで', '3,000語まで'].map((h, i) => (
                        <div key={h} style={{ padding: '13px 10px', fontSize: '11.5px', fontWeight: 800, textAlign: i ? 'center' : 'left', opacity: i ? 0.85 : 1 }}>{h}</div>
                    ))}
                </div>
                {v.bandTable.map(b => (
                    <div key={b.top} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', borderBottom: `1px solid ${LINE}`, alignItems: 'center' }}>
                        <div style={{ padding: '15px 12px', fontSize: '13.5px', fontWeight: 800 }}>上位 {b.top.toLocaleString()} 個</div>
                        {[b.w1000, b.w2000, b.w3000].map((p, i) => (
                            <div key={i} style={{ padding: '15px 8px', textAlign: 'center' }}>
                                <span style={{
                                    fontFamily: 'Georgia, serif', fontSize: i === 0 ? '22px' : '17px', fontWeight: 900,
                                    color: i === 0 ? DEEPGOLD : SUB,
                                }}>{p}%</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div style={{ background: '#FEF9E7', border: `1px solid ${GOLD}55`, borderRadius: '16px', padding: '22px 24px', marginBottom: '18px' }}>
                <div style={{ fontSize: 'clamp(15px, 2.2vw, 18px)', fontWeight: 900, lineHeight: 1.85 }}>
                    英検1級を超えると言われる会話の、聞き取りに必要な表現。
                    <br />その<span style={{ color: DEEPGOLD }}>上位100個は、1つ残らず中学・高校の単語だけ</span>でできていた。
                </div>
                <div style={{ fontSize: '13px', lineHeight: 2, color: SUB, marginTop: '12px' }}>
                    つまり詰まっている原因は語彙の量ではない。<b style={{ color: INK }}>知っている単語が、塊で流れてくると見つけられない</b>ことのほうが本体で、
                    塊には頻度順があり、その順番は実測できる。ここから先は「何を」ではなく「どの順で」の話になる。
                </div>
            </div>

            <div style={{ fontSize: '11.5px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '2px', marginBottom: '11px' }}>実例 — 全部この動画に出てくる。単語は全部知っているはず</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {easy.slice(0, 24).map(c => (
                    <span key={c} style={{
                        fontSize: '13px', fontWeight: 700, color: INK, background: '#fff',
                        border: `1px solid ${LINE}`, padding: '7px 12px', borderRadius: '8px',
                    }}>{c}</span>
                ))}
            </div>
        </Sec>
    );
}

// ============================================================
function Trap({ v }: { v: AccessVideo }) {
    const w = (n: number) => v.wordCurve.find(c => c[0] === n)?.[1] ?? 0;
    return (
        <Sec>
            <Eyebrow>THE TRAP</Eyebrow>
            <H>初学者の罠は、「全部知らない」と思うこと。</H>
            <Body>
                聞き取れないと、英語が無限にあるように感じる。だから何から始めればいいか分からなくなって、
                結局「単語帳を1ページ目から」に戻る。ここが罠で、しかも罠の正体は測れば消える。
            </Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px', margin: '26px 0 0' }}>
                {[
                    { n: `${v.distinctWords.toLocaleString()}種`, t: 'この動画で使われた語は、これだけ', b: `${Math.round(v.duration / 60)}分ぶっ通しで喋って、異なり語数は${v.distinctWords.toLocaleString()}。無限ではない。` },
                    { n: `${w(500)}%`, t: '上位500語で、ここまで埋まる', b: `頻度順に500語知っていれば、この動画の総語数の${w(500)}%は既知の語。上位1,000語で${w(1000)}%。` },
                    { n: `${v.oovShare}%`, t: '頻度表の外にある語', b: `残りはこれだけで、中身はほぼ固有名詞(${v.oovTop.slice(0, 4).map(o => o[0]).join(', ')} など)。覚える対象ではない。` },
                ].map(c => (
                    <div key={c.t} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '22px 20px' }}>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '34px', fontWeight: 900, color: DEEPGOLD, lineHeight: 1 }}>{c.n}</div>
                        <div style={{ fontSize: '14px', fontWeight: 900, margin: '11px 0 8px', lineHeight: 1.55 }}>{c.t}</div>
                        <div style={{ fontSize: '12.5px', lineHeight: 1.95, color: SUB }}>{c.b}</div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '22px', background: '#FEF9E7', border: `1px solid ${GOLD}55`, borderRadius: '16px', padding: '24px 24px' }}>
                <div style={{ fontSize: '16px', fontWeight: 900, lineHeight: 1.8 }}>
                    つまり詰まっている原因は語彙の量ではない。<br />
                    <span style={{ color: DEEPGOLD }}>単語を知っていても、塊(かたまり)で流れてくると見つけられない</span>ことのほうが本体で、
                    その塊がこの動画に{v.chunkKinds.toLocaleString()}個入っている。次はその順番の話。
                </div>
            </div>
        </Sec>
    );
}

// ============================================================
function Curves({ v }: { v: AccessVideo }) {
    return (
        <Sec>
            <Eyebrow>MEASURED</Eyebrow>
            <H>どこまでやると、何%届くか。</H>
            <Body>
                推定ではない。この動画の字幕を1語ずつ数えた結果。縦軸は「この動画のどれだけを覆えるか」、横軸は「頻度順に上から何個やるか」。
                全部やる必要がないことと、どこで切ればいいかが、同じ絵で分かる。
            </Body>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
                <Chart
                    title="単語" unit="語"
                    curve={v.wordCurve}
                    note={`頻度順の単語リスト(8,000語)との照合。上位${v.wordCurve[2][0]}語で${v.wordCurve[2][1]}%、上位2,000語で${v.wordCurve.find(c => c[0] === 2000)?.[1]}%。ここは伸びが早く、早めに天井が来る。`}
                    color={GOLD}
                />
                <Chart
                    title="表現(塊)" unit="個"
                    curve={v.chunkCurve}
                    note={`実測コーパス${CHUNK_STATS.total.toLocaleString()}表現との照合。上位100個で${v.chunkCurve.find(c => c[0] === 100)?.[1]}%、上位600個で${v.chunkCurve.find(c => c[0] === 600)?.[1]}%。単語より傾きが緩いかわりに、上限まで効き続ける。`}
                    color={GREEN}
                />
            </div>
            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.95, marginTop: '14px' }}>
                2つのグラフは分母が違う。単語は「総語数のうち何%が既知語か」、表現は「一致した表現の延べ出現のうち何%を持っているか」。
                足し算はできない。並べているのは、単語を詰めても表現を詰めても聞けるようにはならず、両方の順番が必要だという話をするため。
            </div>
        </Sec>
    );
}

function Chart({ title, unit, curve, note, color }: {
    title: string; unit: string; curve: Array<[number, number]>; note: string; color: string;
}) {
    const W = 520, Hh = 210, PL = 40, PR = 14, PT = 14, PB = 34;
    const maxN = curve[curve.length - 1][0];
    // 横軸は対数。頻度分布は上位に極端に偏るので線形だと潰れる
    const lx = (n: number) => Math.log10(Math.max(n, 10));
    const x0 = lx(10), x1 = lx(maxN);
    const px = (n: number) => PL + ((lx(n) - x0) / (x1 - x0)) * (W - PL - PR);
    const py = (p: number) => PT + (1 - p / 100) * (Hh - PT - PB);
    const pts = curve.map(([n, p]) => `${px(n).toFixed(1)},${py(p).toFixed(1)}`).join(' ');

    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '20px 18px' }}>
            <div style={{ fontSize: '14px', fontWeight: 900, marginBottom: '12px' }}>{title}のカバー曲線</div>
            <svg viewBox={`0 0 ${W} ${Hh}`} style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}>
                {[0, 25, 50, 75, 100].map(g => (
                    <g key={g}>
                        <line x1={PL} y1={py(g)} x2={W - PR} y2={py(g)} stroke={LINE} strokeWidth="1" />
                        <text x={PL - 6} y={py(g) + 4} textAnchor="end" fontSize="10" fill={SUB}>{g}%</text>
                    </g>
                ))}
                <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
                {curve.map(([n, p]) => (
                    <circle key={n} cx={px(n)} cy={py(p)} r="3.2" fill="#fff" stroke={color} strokeWidth="2" />
                ))}
                {curve.filter((_, i) => i % 2 === 0 || i === curve.length - 1).map(([n]) => (
                    <text key={n} x={px(n)} y={Hh - PB + 16} textAnchor="middle" fontSize="9.5" fill={SUB}>
                        {n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n}
                    </text>
                ))}
                <text x={(W + PL) / 2} y={Hh - 2} textAnchor="middle" fontSize="10" fill={SUB}>頻度順に上から何{unit}(対数)</text>
            </svg>
            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9, marginTop: '10px' }}>{note}</div>
        </div>
    );
}

// ============================================================
const isJoint = (chunk: string) => {
    const g = glossFor(chunk);
    return !!g && g.ja.startsWith('(語の継ぎ目)');
};

function Order({ v, openBlock, setOpenBlock, hideJoints, setHideJoints }: {
    v: AccessVideo;
    openBlock: number | null; setOpenBlock: (n: number | null) => void;
    hideJoints: boolean; setHideJoints: (b: boolean) => void;
}) {
    // localStorage は SSR で読めないので、判定はマウント後に確定させる
    const [gateReady, setGateReady] = useState(false);
    const [unlocked, setUnlocked] = useState(true);
    const [code, setCode] = useState('');
    const [codeState, setCodeState] = useState<UnlockResult | null>(null);
    useEffect(() => {
        setUnlocked(canOpen('access', BUY_URL, FREE_BLOCKS, 99));
        setGateReady(true);
    }, []);
    const tryCode = async () => {
        const r = await submitCode('access', code);
        setCodeState(r);
        if (r === 'ok') setUnlocked(true);
    };
    const blockLocked = (no: number) => gateReady && !unlocked && !canOpen('access', BUY_URL, FREE_BLOCKS, no);

    const glossed = useMemo(
        () => v.chunks.slice(0, 250).filter(c => glossFor(c[1])).length,
        [v],
    );
    return (
        <Sec>
            <Eyebrow>THE ORDER</Eyebrow>
            <H>覚える順番。6ブロック。</H>
            <Body>
                並び順はコーパスの頻度順。つまり<b>「英語全体でどれだけ会うか」が上のものから</b>並んでいる。
                この動画のためだけの順番ではないので、ここでやったものは次の動画にも効く。
                各ブロックの「到達」は、そこまで覚えた時にこの動画の表現出現をどれだけ覆えるかの実測値。
            </Body>
            <Body>
                数字が2つ出るので先に断っておく。太字の番号は<b>この動画で何番目か</b>、その下の「全体N位」は
                <b>コーパス{CHUNK_STATS.total.toLocaleString()}表現の中での順位</b>。この動画に出てこない表現は飛ばされるので、
                番号は連続するが全体順位は飛ぶ。
            </Body>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
                <button
                    onClick={() => setHideJoints(!hideJoints)}
                    style={{
                        border: `1px solid ${hideJoints ? INK : LINE}`, background: hideJoints ? INK : '#fff',
                        color: hideJoints ? '#fff' : SUB, padding: '8px 14px', borderRadius: '99px',
                        fontSize: '12px', fontWeight: 800, cursor: 'pointer',
                    }}
                >
                    語の継ぎ目を隠す{hideJoints ? '(ON)' : '(OFF)'}
                </button>
                <span style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.8 }}>
                    上位250のうち訳が付いているのは{glossed}個。残りは訳の登録待ちで、表現そのものは実測から出ている。
                </span>
            </div>

            {BLOCKS.map(b => {
                const to = Math.min(b.to, v.chunkKinds);
                if (b.from > v.chunkKinds) return null;
                const reach = reachAt(v.chunkCurve, to);
                const prevReach = b.from > 1 ? reachAt(v.chunkCurve, b.from - 1) : 0;
                const open = openBlock === b.no;
                // 番号は「この動画で何番目か」。行に出す「全体N位」はコーパス順位で別物
                const rows = open
                    ? v.chunks.slice(b.from - 1, to).map((c, i) => ({ c, pos: b.from + i }))
                    : [];
                const shown = hideJoints ? rows.filter(r => !isJoint(r.c[1])) : rows;
                return (
                    <div key={b.no} style={{ background: '#fff', border: `1px solid ${open ? GOLD : LINE}`, borderRadius: '18px', marginBottom: '12px', overflow: 'hidden' }}>
                        <button
                            onClick={() => setOpenBlock(open ? null : b.no)}
                            style={{ width: '100%', textAlign: 'left', background: open ? '#FEFCF2' : '#fff', border: 'none', cursor: 'pointer', padding: '20px 22px', display: 'flex', gap: '16px', alignItems: 'center' }}
                        >
                            <div style={{
                                flexShrink: 0, width: '42px', height: '42px', borderRadius: '11px', background: b.no <= 4 ? GOLD : '#D6D3D1',
                                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 900,
                            }}>{b.no}</div>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '16px', fontWeight: 900 }}>{b.name}</span>
                                    {blockLocked(b.no) && (
                                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: DEEPGOLD, padding: '3px 8px', borderRadius: '99px' }}>有料</span>
                                    )}
                                    <span style={{ fontSize: '11.5px', color: SUB, fontWeight: 700 }}>
                                        この動画の{b.from}〜{to}番目 ({to - b.from + 1}個)
                                    </span>
                                </div>
                                <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.9, marginTop: '5px' }}>{b.why}</div>
                            </div>
                            <div style={{ flexShrink: 0, textAlign: 'right' }}>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: b.no <= 4 ? DEEPGOLD : SUB, lineHeight: 1 }}>{reach}%</div>
                                <div style={{ fontSize: '10px', color: SUB, fontWeight: 700, marginTop: '3px' }}>到達 (+{(reach - prevReach).toFixed(1)})</div>
                            </div>
                        </button>

                        {open && blockLocked(b.no) && (
                            <div style={{ borderTop: `1px solid ${LINE}`, padding: '26px 22px', background: '#FEFCF2' }}>
                                <div style={{ fontSize: '15px', fontWeight: 900, lineHeight: 1.8, marginBottom: '10px' }}>
                                    ここから先の {to - b.from + 1} 個は、有料です。
                                </div>
                                <div style={{ fontSize: '13px', lineHeight: 2, color: SUB, marginBottom: '18px' }}>
                                    ブロック{FREE_BLOCKS}までは無料で全部見えます。到達 {reach}% までの表現に、訳・実例・音の該当秒が付きます。
                                </div>
                                <a href={BUY_URL || WAITLIST_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                                    <div style={{
                                        background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff', textAlign: 'center',
                                        padding: '15px', borderRadius: '11px', fontSize: '15px', fontWeight: 900, marginBottom: '8px',
                                    }}>{BUY_URL ? `${PRICE.mainLabel} で全部開ける` : '先行案内を受け取る'}</div>
                                </a>
                                <div style={{ fontSize: '11.5px', color: SUB, textAlign: 'center', lineHeight: 1.85, marginBottom: '16px' }}>{PRICE.mainNote}</div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: `1px dashed ${LINE}`, paddingTop: '16px' }}>
                                    <input
                                        value={code}
                                        onChange={e => setCode(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') void tryCode(); }}
                                        placeholder="購入済みの方は解錠コード"
                                        style={{
                                            flex: '1 1 180px', minWidth: 0, boxSizing: 'border-box', padding: '12px 13px',
                                            border: `1px solid ${codeState && codeState !== 'ok' ? '#FCA5A5' : '#D6D3D1'}`,
                                            borderRadius: '9px', fontSize: '15px', fontFamily: 'inherit', color: INK,
                                        }}
                                    />
                                    <button onClick={() => void tryCode()} style={{
                                        border: 'none', cursor: 'pointer', background: INK, color: '#fff',
                                        padding: '12px 22px', borderRadius: '9px', fontSize: '13.5px', fontWeight: 900,
                                    }}>開ける</button>
                                </div>
                                {codeState && codeState !== 'ok' && (
                                    <div style={{ fontSize: '12px', color: '#B45309', fontWeight: 700, marginTop: '10px', lineHeight: 1.8 }}>
                                        {codeState === 'not_configured'
                                            ? 'まだ販売を開始していません。ブロック1-2 は無料で見られます。'
                                            : codeState === 'error' ? '通信に失敗しました。' : 'そのコードでは開きません。'}
                                    </div>
                                )}
                            </div>
                        )}

                        {open && !blockLocked(b.no) && (
                            <div style={{ borderTop: `1px solid ${LINE}` }}>
                                {shown.map(({ c, pos }) => (
                                    <Row key={`${c[1]}-${pos}`} c={c} videoId={v.id} pos={pos} />
                                ))}
                                {hideJoints && shown.length < rows.length && (
                                    <div style={{ padding: '12px 22px', fontSize: '11.5px', color: SUB, background: '#FAFAF9' }}>
                                        語の継ぎ目 {rows.length - shown.length} 個を隠しています。
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </Sec>
    );
}

function Row({ c, videoId, pos }: { c: AccessChunk; videoId: string; pos: number }) {
    const [rank, chunk, n, kind, group, life, tier, ex, at] = c;
    const g = glossFor(chunk);
    return (
        <div style={{ padding: '15px 22px', borderBottom: `1px solid ${LINE}`, display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <div style={{ flexShrink: 0, width: '58px', paddingTop: '3px' }}>
                <div style={{ fontSize: '13px', color: INK, fontWeight: 900 }}>{pos}</div>
                <div style={{ fontSize: '10px', color: SUB, fontWeight: 700, lineHeight: 1.5, marginTop: '1px' }}>
                    全体<br />{(rank + 1).toLocaleString()}位
                </div>
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', gap: '9px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '16px', fontWeight: 900, letterSpacing: '0.2px' }}>{chunk}</span>
                    <span style={{ fontSize: '13px', color: DEEPGOLD, fontWeight: 800 }}>{g ? g.ja : '訳の登録待ち'}</span>
                </div>
                {g?.note && (
                    <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.9, marginTop: '5px' }}>{g.note}</div>
                )}
                <div style={{ fontSize: '12px', color: '#57534E', lineHeight: 1.85, marginTop: '8px', background: '#FAFAF9', borderLeft: `2px solid ${LINE}`, padding: '8px 11px', borderRadius: '0 7px 7px 0' }}>
                    <a
                        href={`https://www.youtube.com/watch?v=${videoId}&t=${Math.max(0, at - 2)}s`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ color: GREEN, fontWeight: 800, textDecoration: 'none', marginRight: '8px', whiteSpace: 'nowrap' }}
                    >
                        {mmss(at)}
                    </a>
                    {ex}
                </div>
                <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '9px' }}>
                    <Tag>この動画で {n}回</Tag>
                    <Tag>一生で約 {life.toLocaleString()}回</Tag>
                    <Tag>{TIER_LABELS[tier]?.name}</Tag>
                    <Tag>{KIND_LABELS[kind]?.name}</Tag>
                    {group !== 0 && <Tag>{GROUP_LABELS[group]?.name}</Tag>}
                </div>
            </div>
        </div>
    );
}

const Tag = ({ children }: { children: React.ReactNode }) => (
    <span style={{ fontSize: '10.5px', fontWeight: 800, color: SUB, background: '#F5F5F4', border: `1px solid ${LINE}`, padding: '4px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>{children}</span>
);

// ============================================================
function Limits() {
    return (
        <Sec>
            <Eyebrow>LIMITS</Eyebrow>
            <H>この数字が言っていないこと。</H>
            <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', overflow: 'hidden' }}>
                {[
                    ['覚えれば聞こえる、とは言っていない', `覆えるのは「知識として持っている割合」まで。音として拾えるかは別の訓練が必要で、それが RAW PASS の担当。順番(ここ)と耳(あちら)は別の問題。`],
                    ['字幕は自動生成', `YouTubeの自動字幕を数えている。固有名詞や崩れた発話の書き起こしは完全ではないので、数字には数%の誤差がある。誤差の向きは「拾えていない表現がある」側。`],
                    ['コーパスの外にある表現は出てこない', `照合しているのは実測コーパス${CHUNK_STATS.total.toLocaleString()}表現。ここに無い言い回しは、この動画に出ていても表に載らない。`],
                    ['上位ほど正しく、下位ほど怪しい', `頻度上位の塊は誰が数えても同じ結果になる。一方で1回しか出ない表現は、この動画の話題に依存しているだけで、覚える価値の判断はできない。だからブロック6は「覚えなくていい」と書いてある。`],
                    ['訳は手書きなので、まだ穴がある', `頻度と順位は機械が出すが、意味と「日本人が言えない理由」は人間が書く。上位から順に埋めている途中で、下位は未登録が多い。`],
                ].map(([t, b]) => (
                    <div key={t} style={{ padding: '20px 24px', borderBottom: `1px solid ${LINE}` }}>
                        <div style={{ fontSize: '14.5px', fontWeight: 900, marginBottom: '8px' }}>{t}</div>
                        <div style={{ fontSize: '13px', lineHeight: 2, color: SUB }}>{b}</div>
                    </div>
                ))}
            </div>
        </Sec>
    );
}

// ============================================================
function Foot({ v, others, onPick }: { v: AccessVideo; others: AccessVideo[]; onPick: (id: string) => void }) {
    return (
        <Sec>
            {others.length > 1 && (
                <div style={{ marginBottom: '28px' }}>
                    <Eyebrow>OTHER VIDEOS</Eyebrow>
                    <div style={{ display: 'flex', gap: '9px', flexWrap: 'wrap' }}>
                        {others.map(o => (
                            <button key={o.id} onClick={() => onPick(o.id)} style={{
                                border: `1px solid ${o.id === v.id ? INK : LINE}`, background: o.id === v.id ? INK : '#fff',
                                color: o.id === v.id ? '#fff' : SUB, padding: '9px 14px', borderRadius: '10px',
                                fontSize: '12.5px', fontWeight: 800, cursor: 'pointer', maxWidth: '320px', textAlign: 'left',
                            }}>{o.title}</button>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ background: INK, color: '#fff', borderRadius: '24px', padding: '46px 30px', marginBottom: '70px' }}>
                <div style={{ fontFamily: SERIF, fontSize: 'clamp(21px, 3.6vw, 30px)', fontWeight: 900, lineHeight: 1.5, marginBottom: '18px' }}>
                    順番が分かれば、この動画は<br />誰でも登れる山になる。
                </div>
                <p style={{ fontSize: '14.5px', lineHeight: 2.1, opacity: 0.82, maxWidth: '640px', margin: '0 0 28px' }}>
                    英検1級レベルと言われる{Math.round(v.duration / 60)}分の会話に、覚えるべき塊が{v.chunkKinds.toLocaleString()}個。
                    上位100個で{v.chunkCurve.find(c => c[0] === 100)?.[1]}%、上位600個で{v.chunkCurve.find(c => c[0] === 600)?.[1]}%。
                    あとは、それが音として耳を通るかどうかだけが残る。
                </p>
                <div style={{ display: 'flex', gap: '11px', flexWrap: 'wrap' }}>
                    <Link href="/english/rawpass" style={{ textDecoration: 'none' }}>
                        <div style={{ background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff', padding: '16px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 900 }}>
                            耳を作る (RAW PASS)
                        </div>
                    </Link>
                    <Link href="/english/corpus" style={{ textDecoration: 'none' }}>
                        <div style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.35)', color: '#fff', padding: '16px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: 900 }}>
                            コーパスの全在庫を見る
                        </div>
                    </Link>
                </div>
                <div style={{ fontSize: '11.5px', opacity: 0.6, marginTop: '24px', lineHeight: 1.9 }}>
                    他の動画を解析する: node scripts/gen-video-access.mjs &lt;youtubeId&gt;
                </div>
            </div>
        </Sec>
    );
}
