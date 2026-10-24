// 自動生成 — ここでは直さない。
// 元: iwasaki-naisou-website/src/app/english/write/core5/sheet/page.tsx
// 直すときは向こうを直して `node scripts/port-to-toniolab.mjs` を流す。
'use client';

/**
 * CORE 5 — 1枚。日本語だけ、操作なし、上から下に読むだけのページ。
 *
 * 【なぜ別に作るか】
 * /english/write/core5 は道具ぜんぶを説明する場所でで、長い。**本番の朝に見るための1枚が無かった。**
 * ここは説明を削って、覚えるものと固定のものだけを順番に並べる。
 *
 * 【並べる順番 = 本番で使う順番】
 * 手順 -> 固定の7文 -> 指と枝 -> 動詞 -> 段落の型 -> 口語 -> 型
 * 迷ったらこのページを上から読めば、答案が1本書ける状態にする。
 */

import Link from 'next/link';
import {
    ENGINES_BY_HAND, BRANCH_SLOTS, FINGERS,
    ESSAY_FRAME, BODY_OPENERS, ESSAY_SHAPES,
    TEN_VERBS, SKELETON_VERBS, CLOSE_VERB, TAILS,
    SPEAKING_FIVE, INSTEAD_OF_I_THINK, I_THINK_COUNT,
    FINGER_PARAGRAPHS, PARAGRAPH_BY_ENGINE, ENGINE_BY_ID,
    TOTAL_BRANCHES,
} from '@/data/english/write-core5';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const RED = '#B91C1C';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const CREAM = '#FAFAF9';

function Section({ n, title, lead, children }: {
    n: string; title: string; lead?: string; children: React.ReactNode;
}) {
    return (
        <section style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', marginBottom: '6px' }}>
                <span style={{
                    fontSize: '10px', fontWeight: 900, color: '#fff', background: DEEPGOLD,
                    borderRadius: '4px', padding: '3px 8px', letterSpacing: '0.5px',
                }}>{n}</span>
                <h2 style={{
                    margin: 0, fontSize: '17px', fontWeight: 900, color: INK, letterSpacing: '-0.2px',
                }}>{title}</h2>
            </div>
            {lead && (
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: SUB, lineHeight: 1.85 }}>{lead}</p>
            )}
            {children}
        </section>
    );
}

function Card({ children, accent }: { children: React.ReactNode; accent?: string }) {
    return (
        <div style={{
            border: `1px solid ${LINE}`,
            borderLeft: accent ? `4px solid ${accent}` : `1px solid ${LINE}`,
            borderRadius: '10px', background: '#fff', padding: '12px 14px',
        }}>{children}</div>
    );
}

export default function Core5SheetPage() {
    const fingerShort: Record<string, string> = Object.fromEntries(FINGERS.map((f) => [f.id, f.short]));

    return (
        <div style={{ minHeight: '100vh', background: CREAM }}>
            <main style={{ maxWidth: '760px', margin: '0 auto', padding: '26px 18px 80px' }}>

                <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1.5px', color: FAINT }}>
                    CORE 5
                </div>
                <h1 style={{
                    margin: '5px 0 6px', fontSize: '26px', fontWeight: 900, color: INK, letterSpacing: '-0.5px',
                }}>1枚</h1>
                <p style={{ margin: '0 0 8px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    覚えるものと、固定してあるものだけ。説明は全部落としてある。
                    上から読めば、そのまま1本書ける順番に並べてある。
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '26px' }}>
                    <Link href="/english/write/core5" style={{
                        fontSize: '10.5px', fontWeight: 800, color: DEEPGOLD, textDecoration: 'none',
                        border: `1px solid ${GOLD}66`, borderRadius: '999px', padding: '4px 12px',
                    }}>道具の説明はこちら</Link>
                </div>

                {/* ---------- 0 手順 ---------- */}
                <Section n="0" title="本番でやること">
                    <Card accent={GOLD}>
                        {[
                            ['1', '指を3本立てる', '手をまたぐこと。左2+右1 か 左1+右2。迷ったら左の親指(金)から'],
                            ['2', '枠に名詞を落とす', '冒頭2文・本論の頭3つ・結び2文は決まっている。入れるのは名詞だけ'],
                            ['3', '選んだ指の4文を出す', '子テーマ3文 + 締めの動詞文。1文目の X にお題の名詞を入れ、2文目からは It。あとは段落ごとに具体例を1文足す'],
                        ].map(([n, t, s]) => (
                            <div key={n} style={{
                                display: 'flex', gap: '10px', alignItems: 'baseline',
                                padding: '8px 0', borderTop: n === '1' ? 'none' : `1px solid ${LINE}`,
                            }}>
                                <span style={{
                                    fontSize: '11px', fontWeight: 900, color: '#fff', background: INK,
                                    borderRadius: '50%', width: '20px', height: '20px',
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>{n}</span>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: 900, color: INK }}>{t}</div>
                                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.7, marginTop: '1px' }}>{s}</div>
                                </div>
                            </div>
                        ))}
                    </Card>
                </Section>

                {/* ---------- 1 固定の7文 ---------- */}
                <Section n="1" title="動かさない7文"
                    lead="お題が何であっても、この7文は書き換えない。穴に名詞を入れるだけで、結び1には穴すら無い。冠詞の判定は1回も起きない。">
                    <div style={{
                        border: `2px solid ${GOLD}`, borderRadius: '10px', background: '#FEF9E7', padding: '4px 14px 12px',
                    }}>
                        {[
                            ...ESSAY_FRAME.slice(0, 2).map((f, i) => ({ tag: `冒頭 ${i + 1}`, en: f.frame, ja: f.frameJa })),
                            ...BODY_OPENERS.map((o) => ({ tag: `本論 ${o.n}`, en: o.frame, ja: o.frameJa })),
                            ...ESSAY_FRAME.slice(2).map((f, i) => ({ tag: `結び ${i + 1}`, en: f.frame, ja: f.frameJa })),
                        ].map((r, i) => (
                            <div key={r.tag} style={{ padding: '9px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <span style={{
                                    fontSize: '9px', fontWeight: 900, color: DEEPGOLD,
                                    background: '#fff', border: `1px solid ${GOLD}55`,
                                    borderRadius: '4px', padding: '2px 7px',
                                }}>{r.tag}</span>
                                <div style={{
                                    fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 700,
                                    color: INK, lineHeight: 1.7, marginTop: '4px',
                                }}>{r.en}</div>
                                <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.65, marginTop: '1px' }}>{r.ja}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.8, marginTop: '8px' }}>
                        <b style={{ color: INK }}>X</b> お題の主語 ・
                        <b style={{ color: INK }}> Y</b> 動詞句(should be ~ / will ~ / benefits ~ のどれでも) ・
                        <b style={{ color: INK }}> Z</b> それを1〜2語で言い直したもの ・
                        <b style={{ color: INK }}> W</b> 指の名詞(下の表)。<b style={{ color: INK }}>結び2は例外で、本論の指の名詞3つと冒頭2文目の立場を写すだけ。結び1は穴なし</b>
                    </div>
                </Section>

                {/* ---------- 2 指と枝 ---------- */}
                <Section n="2" title={`10の指 × 3の枝 = ${TOTAL_BRANCHES}`}
                    lead="左手は自分の中、右手は自分の外。W に入れるのは一番右の列。3本の枝はそのまま段落の3文になる。">
                    {ENGINES_BY_HAND.map((h) => (
                        <div key={h.id} style={{ marginBottom: '10px' }}>
                            <div style={{
                                fontSize: '10px', fontWeight: 900, letterSpacing: '1px', color: FAINT, marginBottom: '4px',
                            }}>{h.en} ・ {h.ja}</div>
                            <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', overflow: 'hidden' }}>
                                <div style={{
                                    display: 'grid', gridTemplateColumns: '84px 1fr 1fr 1fr 96px',
                                    fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '0.5px',
                                    background: CREAM, borderBottom: `1px solid ${LINE}`, padding: '5px 10px', gap: '6px',
                                }}>
                                    <span>指</span>
                                    {BRANCH_SLOTS.map((s) => (
                                        <span key={s.finger}>{fingerShort[s.finger]} {s.ja}</span>
                                    ))}
                                    <span>W に入れる語</span>
                                </div>
                                {h.engines.map((e) => (
                                    <div key={e.id} style={{
                                        display: 'grid', gridTemplateColumns: '84px 1fr 1fr 1fr 96px',
                                        alignItems: 'center', gap: '6px',
                                        padding: '7px 10px', borderTop: `1px solid ${LINE}`,
                                    }}>
                                        <span style={{
                                            fontSize: '10px', fontWeight: 900, color: '#fff', background: e.color,
                                            borderRadius: '4px', padding: '2px 6px', textAlign: 'center',
                                        }}>{e.en}</span>
                                        {BRANCH_SLOTS.map((s) => {
                                            const b = e.branches.find((x) => x.finger === s.finger);
                                            return (
                                                <span key={s.finger} style={{ fontSize: '12px', color: INK, fontWeight: 700 }}>
                                                    {b?.en}
                                                    <span style={{ display: 'block', fontSize: '9.5px', color: FAINT, fontWeight: 400 }}>{b?.ja}</span>
                                                </span>
                                            );
                                        })}
                                        <span style={{
                                            fontSize: '11.5px', fontWeight: 800, color: e.color,
                                        }}>{e.slotNoun}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.75 }}>
                        {BRANCH_SLOTS.map((s) => `${s.ja} = ${s.en}`).join(' / ')}。
                        <b style={{ color: INK }}>BODY は health、NATURE は the environment。</b>
                        the が付くのはこの1本だけで、それも固定なので判定は起きない。
                    </div>
                </Section>

                {/* ---------- 3 段落の型 ---------- */}
                <Section n="3" title="1本の指 = 1つの段落 = 子3文 + 自分の1文 + 締め"
                    lead="枝が親指・人差し指・中指に載っているので、3文の並びも決まっている。3文はつながっていないので、覚えるのは1文ずつでいい。">
                    <Card accent={DEEPGOLD}>
                        {[
                            ['親指', '文1', '本論の枠 + お題の名詞 + 守る側の動詞 + 枝。10語以内'],
                            ['人差し指', '文2', 'It + 枝。前の文につなげない。Although も使わない'],
                            ['中指', '文3', 'It + 枝。ここで話が今日の先へ出る'],
                            ['自分', '文4', '具体例を1文。答案で自分で考えるのはここだけ'],
                            ['締め', '文5', '動詞の文。賛成なら守る側、反対なら壊す側に差し替える'],
                        ].map(([f, r, s], i) => (
                            <div key={f} style={{
                                display: 'flex', gap: '10px', alignItems: 'baseline', flexWrap: 'wrap',
                                padding: '7px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                            }}>
                                <span style={{
                                    fontSize: '10px', fontWeight: 900, color: SUB, background: CREAM,
                                    border: `1px solid ${LINE}`, borderRadius: '4px', padding: '2px 7px', minWidth: '58px', textAlign: 'center',
                                }}>{f}</span>
                                <span style={{ fontSize: '13.5px', fontWeight: 900, color: INK, minWidth: '44px' }}>{r}</span>
                                <span style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.7, flex: 1, minWidth: '200px' }}>{s}</span>
                            </div>
                        ))}
                    </Card>
                    <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.8, marginTop: '7px' }}>
                        3本立てて短い12文。<b style={{ color: INK }}>1文10語以内だから覚えられる。</b>足すのは段落ごとに具体例1文。
                    </div>
                </Section>

                {/* ---------- 3.5 1親3子 ---------- */}
                <Section n="3+" title="1テーマ5文 (子3つ + 動詞2つ)"
                    lead="指を1本選べば、この5文がまるごと付いてくる。子テーマの3文 + 動詞2本の文2つ。つながっていないので、順番を変えても1文だけ使っても壊れない。どの文も10語以内。入れる名詞は1文目の X だけで、2文目からは It。">
                    {FINGER_PARAGRAPHS.map((p) => {
                        const e = ENGINE_BY_ID[p.engine];
                        return (
                            <div key={p.engine} style={{
                                border: `1px solid ${LINE}`, borderLeft: `4px solid ${e.color}`,
                                borderRadius: '10px', background: '#fff',
                                padding: '10px 13px', marginBottom: '8px',
                            }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <span style={{
                                        fontSize: '10px', fontWeight: 900, color: '#fff', background: e.color,
                                        borderRadius: '4px', padding: '2px 7px',
                                    }}>{e.en}</span>
                                    <span style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.6 }}>{p.parentJa}</span>
                                </div>
                                {[
                                    ['文1 子1', `(枠) ${p.one}`, p.oneJa],
                                    ['文2 子2', p.two, p.twoJa],
                                    ['文3 子3', p.three, p.threeJa],
                                    ['締め 賛成', p.pro, p.proJa],
                                    ['締め 反対', p.con, p.conJa],
                                ].map(([tag, en, ja]) => (
                                    <div key={tag} style={{ padding: '6px 0', borderTop: `1px solid ${LINE}`, marginTop: '5px' }}>
                                        <span style={{
                                            fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '0.5px',
                                        }}>{tag}</span>
                                        <div style={{
                                            fontFamily: 'Georgia, serif', fontSize: '13px', color: INK, lineHeight: 1.7, marginTop: '2px',
                                        }}>{en}</div>
                                        <div style={{ fontSize: '10.5px', color: FAINT, lineHeight: 1.65 }}>{ja}</div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                    <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.8 }}>
                        Although は1回も出てこない。<b style={{ color: INK }}>譲歩は冒頭2文目と結び1文目の固定文がもう持っている。</b>3本選べば短い12文で約80語。答案はここに具体例を1段落1文ずつ足して仕上げる。<b style={{ color: INK }}>自分で考えるのは3文だけ。</b>段落の締めは、賛成なら「締め 賛成」、反対なら「締め 反対」に差し替えるだけ。
                    </div>
                </Section>

                {/* ---------- 4 動詞 ---------- */}
                <Section n="4" title="動詞"
                    lead="指1本に2語。賛成で書くときは、守る側の動詞で主張し、壊す側の動詞は結論で「避けたい危険」として出す。これで両方の動詞が毎段落に入る。">
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', overflow: 'hidden' }}>
                        <div style={{
                            display: 'grid', gridTemplateColumns: '84px 1fr 1fr',
                            fontSize: '9px', fontWeight: 900, color: FAINT, letterSpacing: '0.5px',
                            background: CREAM, borderBottom: `1px solid ${LINE}`, padding: '5px 10px', gap: '8px',
                        }}>
                            <span>指</span><span>壊す</span><span>守る・生む</span>
                        </div>
                        {TEN_VERBS.map((v) => {
                            const holdsVerb = v.holds === 'verb' ? v.verb : v.counter;
                            const breaksVerb = v.holds === 'verb' ? v.counter : v.verb;
                            return (
                                <div key={v.engine} style={{
                                    display: 'grid', gridTemplateColumns: '84px 1fr 1fr',
                                    alignItems: 'center', gap: '8px',
                                    padding: '6px 10px', borderTop: `1px solid ${LINE}`,
                                }}>
                                    <span style={{ fontSize: '10.5px', fontWeight: 800, color: SUB }}>{v.engine}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 800, color: RED }}>{breaksVerb}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#047857' }}>{holdsVerb}</span>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{
                        marginTop: '8px', border: `1px solid ${LINE}`, borderRadius: '10px',
                        background: '#fff', padding: '10px 13px', fontSize: '12px', color: SUB, lineHeight: 1.9,
                    }}>
                        <b style={{ color: INK }}>骨の動詞</b> ― {SKELETON_VERBS.map((v) => v.verb).join(' / ')}<br />
                        <b style={{ color: INK }}>結びの動詞</b> ― {CLOSE_VERB.verb}(結び1文目でだけ撃つ)
                    </div>
                    <div style={{ fontSize: '10.5px', color: FAINT, lineHeight: 1.75, marginTop: '6px' }}>
                        EDUCATION と ROOTS だけ並びが逆。foster と safeguard が守る側である。
                    </div>
                </Section>

                {/* ---------- 5 締め ---------- */}
                <Section n="5" title="締め ― 中指の文を閉じる10本"
                    lead="X に名詞を1つ入れるだけ。段落の3文目はここで終わる。">
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', padding: '4px 13px 10px' }}>
                        {TAILS.map((t, i) => (
                            <div key={t.engine} style={{
                                display: 'flex', gap: '9px', alignItems: 'baseline', flexWrap: 'wrap',
                                padding: '6px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                            }}>
                                <span style={{ fontSize: '10px', fontWeight: 800, color: FAINT, minWidth: '64px' }}>{t.engine}</span>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '12.5px', color: INK, flex: 1, minWidth: '260px' }}>{t.slot}</span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ---------- 6 口語 ---------- */}
                <Section n="6" title="喋る時はこの5本だけ"
                    lead="蝶番は17本あるが、口では選ぶ時間が無い。5本とも裸の名詞を取るので、冠詞の判定が起きない。">
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', padding: '4px 13px 10px' }}>
                        {SPEAKING_FIVE.map((p, i) => (
                            <div key={p.en} style={{
                                display: 'flex', gap: '10px', alignItems: 'baseline', flexWrap: 'wrap',
                                padding: '7px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                            }}>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 900, color: INK, minWidth: '160px' }}>{p.en}</span>
                                <span style={{ fontSize: '11.5px', color: SUB, flex: 1, minWidth: '190px', lineHeight: 1.7 }}>{p.jobJa}</span>
                                <span style={{ fontSize: '10px', color: p.saidSoFar === 0 ? RED : FAINT, fontWeight: 800 }}>{p.saidSoFar}回</span>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ---------- 7 I think ---------- */}
                <Section n="7" title="I think をやめる"
                    lead={`作者の録音${I_THINK_COUNT.lessons}レッスン、作者の発話${I_THINK_COUNT.myWords.toLocaleString()}語のうち I think は${I_THINK_COUNT.total}回。1回の25分で${I_THINK_COUNT.worstNight}回言った夜が2つある。もう句読点になっている。`}>
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', padding: '4px 13px 10px' }}>
                        {INSTEAD_OF_I_THINK.map((p, i) => (
                            <div key={p.en} style={{
                                display: 'flex', gap: '10px', alignItems: 'baseline', flexWrap: 'wrap',
                                padding: '7px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                            }}>
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '14px', fontWeight: 900, color: INK, minWidth: '160px' }}>{p.en}</span>
                                <span style={{ fontSize: '11.5px', color: SUB, flex: 1, minWidth: '190px', lineHeight: 1.7 }}>{p.jobJa}</span>
                                <span style={{ fontSize: '10px', color: p.saidSoFar === 0 ? RED : FAINT, fontWeight: 800 }}>{p.saidSoFar}回</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.75, marginTop: '6px' }}>
                        赤は一度も言っていない語。<b style={{ color: INK }}>5本のうち4本が未使用。</b>
                    </div>
                </Section>

                {/* ---------- 8 型 ---------- */}
                <Section n="8" title="お題は3つの型のどれか"
                    lead="型が変えるのは冒頭の Y だけ。序論も結論も1文字も変わらないので、間違えても答案は壊れない。">
                    <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', background: '#fff', padding: '4px 13px 10px' }}>
                        {ESSAY_SHAPES.map((s, i) => (
                            <div key={s.id} style={{ padding: '8px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                    <span style={{
                                        fontSize: '10px', fontWeight: 900, color: '#fff', background: DEEPGOLD,
                                        borderRadius: '4px', padding: '2px 7px',
                                    }}>{s.en}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 900, color: INK }}>{s.ja}</span>
                                    <span style={{ marginLeft: 'auto', fontSize: '9.5px', color: FAINT }}>過去問{s.fits.length}件</span>
                                </div>
                                <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.7, marginTop: '3px' }}>
                                    <b style={{ color: DEEPGOLD }}>Y</b> ― {s.yHint}
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

            </main>
        </div>
    );
}
