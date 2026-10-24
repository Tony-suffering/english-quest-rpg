'use client';

/**
 * 話し言葉の単語帳
 *
 * 市販の単語帳との差は「載っている語」ではなく「載っている数字」。
 * 語のリスト自体には価値がない(誰でも作れる)。価値があるのは
 *   一生で何回会うか / どの塊で来るか / どこで話されているか
 * で、これは1億語の実測コーパスが無いと出せない。
 *
 * 商品の主張は1つ: **kind を「親切な」で覚えた人は、131,909回のうち89%を取り逃す。**
 */

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import WORDS, { WORDBOOK_STATS } from '@/data/english/wordbook';
import {
    W, concLabel, BANDS, bandOf,
    type WordEntry,
} from '@/data/english/wordbook-types';
import { canOpen, submitCode, type UnlockResult } from '@/lib/english/unlock';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

/** 決済リンク。空のあいだは全開放 */
const BUY_URL = '';
const WAITLIST_URL = 'https://x.com/tonio_english';
const FREE_RANK = 100;
const PRICE_LABEL = '¥3,200';
const PRICE_NOTE = '買い切り / 1,200語 + 塊 + 実音の座標';

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

export default function WordbookPage() {
    const [q, setQ] = useState('');
    const [band, setBand] = useState<number | null>(null);
    const [onlyConc, setOnlyConc] = useState(false);
    const [limit, setLimit] = useState(60);

    const [gateReady, setGateReady] = useState(false);
    const [unlocked, setUnlocked] = useState(true);
    const [code, setCode] = useState('');
    const [codeState, setCodeState] = useState<UnlockResult | null>(null);

    useEffect(() => {
        setUnlocked(canOpen('wordbook', BUY_URL, FREE_RANK, 99999));
        setGateReady(true);
    }, []);
    const tryCode = async () => {
        const r = await submitCode('wordbook', code);
        setCodeState(r);
        if (r === 'ok') setUnlocked(true);
    };
    const rankLocked = (rank: number) =>
        gateReady && !unlocked && !canOpen('wordbook', BUY_URL, FREE_RANK, rank);

    const filtered = useMemo(() => {
        const needle = q.trim().toLowerCase();
        return WORDS.filter(e => {
            if (band !== null) {
                const b = bandOf(e[W.rank]);
                if (BANDS.indexOf(b) !== band) return false;
            }
            if (onlyConc && e[W.conc] < 45) return false;
            if (!needle) return true;
            if (e[W.word].includes(needle)) return true;
            return e[W.chunks].some(c => c[0].includes(needle));
        });
    }, [q, band, onlyConc]);

    useEffect(() => { setLimit(60); }, [q, band, onlyConc]);

    const topConc = useMemo(
        () => WORDS.filter(e => e[W.conc] >= 55).sort((a, b) => b[W.conc] - a[W.conc]).slice(0, 8),
        [],
    );
    const spoken = useMemo(() => {
        const seen = new Map<string, number>();
        WORDS.forEach(e => e[W.chunks].forEach(c => {
            if (c[2] === 1 && c[1] > 5000 && !seen.has(c[0])) seen.set(c[0], c[1]);
        }));
        return [...seen.entries()].sort((a, b) => b[1] - a[1]).slice(0, 14);
    }, []);

    return (
        <div style={{
            background: CREAM, minHeight: '100vh', color: INK,
            fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
        }}>
            {/* ===== HERO ===== */}
            <section style={{ background: `radial-gradient(1100px 460px at 50% -14%, #FBF4DD, ${CREAM})`, padding: '46px 0 30px' }}>
                <div style={{ maxWidth: '980px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 900, letterSpacing: '0.5px' }}>話し言葉の単語帳</span>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '5px', letterSpacing: '1px' }}>
                            実測コーパス 1億語 / 話し言葉100%
                        </span>
                    </div>

                    <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 900, lineHeight: 1.34, margin: '0 0 20px' }}>
                        <span style={{ fontFamily: 'Georgia, serif' }}>kind</span> は「親切な」じゃない。<br />
                        <span style={{ color: DEEPGOLD }}>89%は「なんか」だ。</span>
                    </h1>

                    <p style={{ fontSize: 'clamp(14px, 2vw, 16.5px)', lineHeight: 2.05, color: '#44403C', maxWidth: '730px', margin: '0 0 22px' }}>
                        英語を話す人が <b>kind</b> に会う回数は一生で <b>131,909回</b>。
                        そのうち <b style={{ color: INK }}>117,236回(89%)は <span style={{ fontFamily: 'Georgia, serif' }}>kind of</span></b> — 意味は「なんか、ちょっと」で、品詞すら違う。
                        単語帳で「親切な」と覚えた人は、<b style={{ color: INK }}>9割を取り逃す。</b>
                    </p>
                    <p style={{ fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 2, color: INK, fontWeight: 800, maxWidth: '730px', margin: '0 0 26px', borderLeft: `4px solid ${GOLD}`, paddingLeft: '16px' }}>
                        これは編集方針の違いではなく、<b style={{ color: DEEPGOLD }}>頻度を実測しないと発見できない構造的な欠陥</b>です。
                        だからこの単語帳は、語を単体で載せません。
                    </p>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {[
                            [`${WORDBOOK_STATS.total.toLocaleString()}語`, '収録'],
                            [`${WORDBOOK_STATS.withClip.toLocaleString()}語`, '本物の音の座標つき'],
                            ['100%', '話し言葉コーパス'],
                            [`${WORDBOOK_STATS.droppedJunk}個`, '非語を除外'],
                        ].map(([n, u]) => (
                            <div key={u} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 16px' }}>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: DEEPGOLD }}>{n}</div>
                                <div style={{ fontSize: '11px', color: SUB, fontWeight: 700, marginTop: '2px' }}>{u}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 証拠1: 集中度 ===== */}
            <Sec>
                <Eyebrow>THE DEFECT</Eyebrow>
                <H>単体で覚えると外す語が、これだけある。</H>
                <Body>
                    その語に一生で会う回数のうち、<b>いちばん多い「塊」1つが何%を占めるか</b>を計算した。
                    数字が高いほど、その語は決まった形でしか来ない。単語だけ覚えても、その形を知らなければ聞き取れない。
                </Body>
                <div style={{ background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '18px', overflow: 'hidden' }}>
                    {topConc.map(e => (
                        <div key={e[W.word]} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '15px 18px', borderBottom: `1px solid ${LINE}`, flexWrap: 'wrap' }}>
                            <div style={{ flex: '0 0 92px', fontFamily: 'Georgia, serif', fontSize: '19px', fontWeight: 900 }}>{e[W.word]}</div>
                            <div style={{ flex: '0 0 120px', fontSize: '12px', color: SUB, fontWeight: 700 }}>一生 {e[W.life].toLocaleString()}回</div>
                            <div style={{ flex: '0 0 58px', fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, color: DEEPGOLD, textAlign: 'right' }}>{e[W.conc]}%</div>
                            <div style={{ flex: '1 1 160px', fontSize: '14px', fontWeight: 800, fontFamily: 'Georgia, serif' }}>{e[W.chunks][0][0]}</div>
                        </div>
                    ))}
                </div>
                <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.95, marginTop: '13px' }}>
                    塊どうしの重なりで二重に数えないよう、<b>最頻の1つだけ</b>で計算している。実際の偏りはこれ以上に大きい。
                </div>
            </Sec>

            {/* ===== 証拠2: 語域 ===== */}
            <Sec>
                <Eyebrow>SPOKEN ONLY</Eyebrow>
                <H>脚本には出ない。会話にだけ出る。</H>
                <Body>
                    このコーパスは YouTube字幕(43チャンネル) + 映像字幕 + 映画脚本の3つでできていて、<b>100%が話し言葉</b>。
                    そのうち <b>YouTube(演出されていない生の会話)に濃く、脚本には薄い</b>ものを抜いた。教材にも小説にも載らない層で、
                    実際の会話では毎日飛んでくる。
                </Body>
                <div style={{ display: 'flex', gap: '9px', flexWrap: 'wrap' }}>
                    {spoken.map(([c, n]) => (
                        <div key={c} style={{ background: '#fff', border: `1px solid ${GREEN}55`, borderRadius: '10px', padding: '10px 14px' }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 800 }}>{c}</div>
                            <div style={{ fontSize: '10.5px', color: SUB, fontWeight: 700, marginTop: '2px' }}>一生 {n.toLocaleString()}回</div>
                        </div>
                    ))}
                </div>
            </Sec>

            {/* ===== 本体 ===== */}
            <Sec>
                <Eyebrow>THE BOOK</Eyebrow>
                <H>本体。{WORDBOOK_STATS.total.toLocaleString()}語。</H>
                <Body>
                    頻度順。各語に「一生で会う回数」「その語が実際に来る塊」「語域」、そして解析済みの動画があれば
                    <b>本物の音の該当秒</b>が付く。順番どおりに上から潰せば、会話で会う量の多いものから先に入る。
                </Body>

                <div style={{ display: 'flex', gap: '9px', flexWrap: 'wrap', marginBottom: '14px' }}>
                    <input
                        value={q}
                        onChange={e => setQ(e.target.value)}
                        placeholder="語 / 塊で検索 (例: kind, get, up)"
                        style={{
                            flex: '1 1 220px', minWidth: 0, boxSizing: 'border-box', padding: '12px 14px',
                            border: `1px solid #D6D3D1`, borderRadius: '10px', fontSize: '15px', fontFamily: 'inherit', color: INK,
                        }}
                    />
                    <button onClick={() => setOnlyConc(!onlyConc)} style={{
                        border: `1px solid ${onlyConc ? INK : LINE}`, background: onlyConc ? INK : '#fff',
                        color: onlyConc ? '#fff' : SUB, padding: '12px 16px', borderRadius: '10px',
                        fontSize: '12.5px', fontWeight: 800, cursor: 'pointer', whiteSpace: 'nowrap',
                    }}>塊で覚えるべき語だけ</button>
                </div>
                <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <Chip on={band === null} onClick={() => setBand(null)}>ぜんぶ</Chip>
                    {BANDS.map((b, i) => (
                        <Chip key={b.name} on={band === i} onClick={() => setBand(i)}>{b.name} ({b.from}-{b.to > 9999 ? '' : b.to})</Chip>
                    ))}
                </div>
                <div style={{ fontSize: '12px', color: SUB, fontWeight: 700, marginBottom: '12px' }}>
                    {filtered.length.toLocaleString()} 語
                </div>

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', overflow: 'hidden' }}>
                    {filtered.slice(0, limit).map(e => (
                        <Entry key={e[W.word]} e={e} locked={rankLocked(e[W.rank])} />
                    ))}
                </div>

                {filtered.length > limit && (
                    <button onClick={() => setLimit(l => l + 120)} style={{
                        marginTop: '14px', width: '100%', border: `1px solid ${LINE}`, background: '#fff',
                        color: INK, padding: '15px', borderRadius: '12px', fontSize: '14px', fontWeight: 800, cursor: 'pointer',
                    }}>
                        もっと見る (残り {(filtered.length - limit).toLocaleString()} 語)
                    </button>
                )}

                {gateReady && !unlocked && (
                    <div style={{ marginTop: '20px', background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '18px', padding: '26px 22px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 900, lineHeight: 1.8, marginBottom: '10px' }}>
                            上位{FREE_RANK}語までは無料です。
                        </div>
                        <div style={{ fontSize: '13px', lineHeight: 2, color: SUB, marginBottom: '18px' }}>
                            {WORDBOOK_STATS.total.toLocaleString()}語ぶんの「一生で会う回数 / 実際に来る塊 / 語域 / 本物の音の座標」が開きます。
                        </div>
                        <a href={BUY_URL || WAITLIST_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff', textAlign: 'center',
                                padding: '16px', borderRadius: '12px', fontSize: '16px', fontWeight: 900, marginBottom: '8px',
                            }}>{BUY_URL ? `${PRICE_LABEL} で全部開ける` : '先行案内を受け取る'}</div>
                        </a>
                        <div style={{ fontSize: '11.5px', color: SUB, textAlign: 'center', marginBottom: '16px' }}>{PRICE_NOTE}</div>
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
                                    ? 'まだ販売を開始していません。上位100語は無料で見られます。'
                                    : codeState === 'error' ? '通信に失敗しました。' : 'そのコードでは開きません。'}
                            </div>
                        )}
                    </div>
                )}
            </Sec>

            {/* ===== 限界 ===== */}
            <Sec>
                <Eyebrow>LIMITS</Eyebrow>
                <H>この数字が言っていないこと。</H>
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', overflow: 'hidden' }}>
                    {[
                        ['市販の単語帳と比較していない', '「市販より優れている」とは書いていない。書いてあるのは、このコーパスで数えた実測値だけ。他社の本の語彙リストは参照も転載もしていない。'],
                        ['話し言葉に偏っている', 'コーパスは YouTube・字幕・映画の3つで、論説や書籍は配合から外れている。読解や学術英語の語彙は、この順番では出てこない。狙って外している。'],
                        ['一生の遭遇回数は推定', 'ネイティブが20歳までに浴びる語数(およそ1.5億語)を仮定して、100万語あたりの頻度から換算した数字。桁の感覚をつかむためのもので、個人差は当然ある。'],
                        ['本物の音は、解析した動画のぶんだけ', `いま座標が付いているのは ${WORDBOOK_STATS.withClip} 語(${Math.round(WORDBOOK_STATS.withClip / WORDBOOK_STATS.total * 100)}%)。解析する動画を増やすと増える。足りていないことを隠さない。`],
                        ['自動字幕を含む', 'YouTube側は人力字幕を優先しているが、自動生成が混ざる。固有名詞まわりに誤りが残っている可能性がある。'],
                    ].map(([t, b]) => (
                        <div key={t} style={{ padding: '20px 24px', borderBottom: `1px solid ${LINE}` }}>
                            <div style={{ fontSize: '14.5px', fontWeight: 900, marginBottom: '8px' }}>{t}</div>
                            <div style={{ fontSize: '13px', lineHeight: 2, color: SUB }}>{b}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '30px', marginBottom: '80px', display: 'flex', gap: '11px', flexWrap: 'wrap' }}>
                    <Link href="/english/access" style={{ textDecoration: 'none' }}>
                        <div style={{ background: INK, color: '#fff', padding: '15px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 900 }}>
                            動画1本ぶんの順番を見る (ACCESS)
                        </div>
                    </Link>
                    <Link href="/english/corpus" style={{ textDecoration: 'none' }}>
                        <div style={{ background: '#fff', border: `1px solid ${LINE}`, color: SUB, padding: '15px 24px', borderRadius: '12px', fontSize: '14px', fontWeight: 900 }}>
                            コーパスの作り方
                        </div>
                    </Link>
                </div>
            </Sec>
        </div>
    );
}

// ============================================================

const Sec = ({ children }: { children: React.ReactNode }) => (
    <section style={{ maxWidth: '980px', margin: '0 auto', padding: '58px 20px 0' }}>{children}</section>
);
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <div style={{ fontSize: '11px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '3px', marginBottom: '13px' }}>{children}</div>
);
const H = ({ children }: { children: React.ReactNode }) => (
    <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 900, lineHeight: 1.42, margin: '0 0 16px' }}>{children}</h2>
);
const Body = ({ children }: { children: React.ReactNode }) => (
    <p style={{ fontSize: '14.5px', lineHeight: 2.1, color: '#44403C', margin: '0 0 20px' }}>{children}</p>
);
const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button onClick={onClick} style={{
        border: `1px solid ${on ? INK : LINE}`, background: on ? INK : '#fff', color: on ? '#fff' : SUB,
        padding: '8px 14px', borderRadius: '99px', fontSize: '12.5px', fontWeight: 800, cursor: 'pointer',
    }}>{children}</button>
);

function Entry({ e, locked }: { e: WordEntry; locked: boolean }) {
    const conc = concLabel(e[W.conc]);
    const clip = e[W.clip];
    const b = bandOf(e[W.rank]);

    if (locked) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderBottom: `1px solid ${LINE}`, background: '#FAFAF9' }}>
                <div style={{ flex: '0 0 46px', fontSize: '11.5px', color: SUB, fontWeight: 800 }}>{e[W.rank]}</div>
                <div style={{ flex: 1, fontFamily: 'Georgia, serif', fontSize: '17px', fontWeight: 900, color: '#D6D3D1', letterSpacing: '3px' }}>
                    {'•'.repeat(Math.min(10, e[W.word].length))}
                </div>
                <div style={{ fontSize: '10.5px', fontWeight: 900, color: '#fff', background: DEEPGOLD, padding: '3px 9px', borderRadius: '99px' }}>有料</div>
            </div>
        );
    }

    return (
        <div style={{ padding: '18px 20px', borderBottom: `1px solid ${LINE}` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '11.5px', color: SUB, fontWeight: 800, minWidth: '38px' }}>{e[W.rank]}</span>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900, letterSpacing: '0.3px' }}>{e[W.word]}</span>
                <span style={{ fontSize: '12px', color: DEEPGOLD, fontWeight: 800 }}>一生 {e[W.life].toLocaleString()}回</span>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: SUB, background: '#F5F5F4', border: `1px solid ${LINE}`, padding: '3px 8px', borderRadius: '6px' }}>{b.name}</span>
                {e[W.conc] >= 40 && (
                    <span style={{ fontSize: '10.5px', fontWeight: 900, color: '#fff', background: e[W.conc] >= 70 ? '#DC2626' : DEEPGOLD, padding: '3px 9px', borderRadius: '99px' }}>
                        {e[W.conc]}% {conc.label}
                    </span>
                )}
            </div>

            {e[W.conc] >= 40 && (
                <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.85, marginTop: '7px' }}>{conc.note}</div>
            )}

            {e[W.chunks].length > 0 && (
                <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '11px' }}>
                    {e[W.chunks].map(c => (
                        <span key={c[0]} style={{
                            fontSize: '12.5px', fontWeight: 700, background: '#fff',
                            border: `1px solid ${c[2] === 1 ? `${GREEN}66` : LINE}`,
                            padding: '6px 11px', borderRadius: '8px',
                        }}>
                            <span style={{ fontFamily: 'Georgia, serif', fontWeight: 800 }}>{c[0]}</span>
                            <span style={{ color: SUB, marginLeft: '7px', fontSize: '10.5px' }}>{c[1].toLocaleString()}回</span>
                            {c[2] === 1 && <span style={{ color: GREEN, marginLeft: '6px', fontSize: '10px', fontWeight: 900 }}>生</span>}
                        </span>
                    ))}
                </div>
            )}

            {clip && (
                <div style={{ fontSize: '12px', color: '#57534E', lineHeight: 1.85, marginTop: '10px', background: '#FAFAF9', borderLeft: `2px solid ${LINE}`, padding: '8px 11px', borderRadius: '0 7px 7px 0' }}>
                    <a
                        href={`https://www.youtube.com/watch?v=${clip[0]}&t=${Math.max(0, clip[1] - 2)}s`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ color: GREEN, fontWeight: 800, textDecoration: 'none', marginRight: '8px', whiteSpace: 'nowrap' }}
                    >{mmss(clip[1])}</a>
                    {clip[2]}
                </div>
            )}
        </div>
    );
}
