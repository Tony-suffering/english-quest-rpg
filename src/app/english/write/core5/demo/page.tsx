'use client';

/**
 * CORE 5 DEMO — 在庫を1つのお題で全部使い切る実演。DMMで画面共有して講師に見せる教材。
 *
 * **ページの中身は全部英語。**講師がそのまま読める形にする。日本語は1文字も置かない。
 *
 * 【前の版との違い】
 * 前は50文の平らな一覧だった。今回は**指1本 = 段落1つ**に組み直してある。
 * 枝3本が親指・人差し指・中指に載っている事実を、そのまま段落の3文の役割に使う。
 * 賛成3段落・反対3段落を先に置き、残る4指12枝は在庫棚として後ろに置く。
 */

import Link from 'next/link';
import {
    ENGINE_BY_ID, FINGERS, TEN_VERBS, CLOSE_VERB, SKELETON_VERBS, TAILS, HINGES, SLOT_BY_FINGER,
    ESSAY_FRAME, BODY_OPENERS, ESSAY_SHAPES, SPEAKING_FIVE, INSTEAD_OF_I_THINK, I_THINK_COUNT,
    FINGER_PARAGRAPHS, SUPPORT_PATTERNS, SUPPORT_BY_ID, BACKED_AI, SUPPORT_FLOWS, buildParagraph, PARAGRAPH_BY_ENGINE,
    TRUNK_KEYS_GOOD, TRUNK_KEYS_BAD, type SupportStep,
} from '@/data/english/write-core5';
import {
    DEMO_TOPIC, DEMO_BRIEF, DEMO_MOVES, DEMO_WORD_COUNT, PARAGRAPH_SHAPE,
    DEMO_ESSAY_FOR, DEMO_ESSAY_AGAINST, DEMO_BANK_FOR, DEMO_BANK_AGAINST, DEMO_ESSAY_WORDS,
    DEMO_EXAM_LENGTH, DEMO_EXAM_WORDS, DEMO_ESSAY, DEMO_ESSAY_TOTAL, DEMO_ESSAY_FIXED,
    DEMO_ONE_CLAIM, DEMO_ONE_CLAIM_BAD, DEMO_NATURE_NOTES,
    demoCoverage, moveHingeHead, findBranch, paragraphWordCount, spokenOf,
    type DemoMove, type DemoParagraph,
} from '@/data/english/write-core5-demo';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const RED = '#DC2626';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const CREAM = '#FAF9F7';

function Chip({ text, color, solid }: { text: string; color: string; solid?: boolean }) {
    return (
        <span style={{
            fontSize: '9px', fontWeight: 900, letterSpacing: '0.3px',
            color: solid ? '#fff' : color,
            background: solid ? color : `${color}18`,
            borderRadius: '4px', padding: '2px 6px', whiteSpace: 'nowrap',
        }}>{text}</span>
    );
}

/** 型の穴(A / B)を枠付きで描く */
function FrameHoles({ frame }: { frame: string }) {
    return (
        <>
            {frame.split(/\b(A|B)\b/).map((part, k) => (
                /^(A|B)$/.test(part)
                    ? <span key={k} style={{
                        display: 'inline-block', minWidth: '22px', textAlign: 'center',
                        border: `1.5px solid ${GREEN}`, borderRadius: '5px', color: GREEN,
                        fontWeight: 900, fontSize: '12px', padding: '0 5px', margin: '0 2px',
                    }}>{part}</span>
                    : <span key={k}>{part}</span>
            ))}
        </>
    );
}

/** 宣言(金) + 固定の型(黒) + 名詞(緑) を塗り分けて1行にする。型は1つか2つ */
function BackedLine({ claim, steps }: { claim: string; steps: SupportStep[] }) {
    const head = claim.trim().replace(/\.$/, '');
    return (
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', lineHeight: 1.8, marginTop: '4px', color: INK }}>
            <span style={{ color: DEEPGOLD, fontWeight: 700 }}>{head}</span>
            {steps.map((st, i) => {
                const p = SUPPORT_BY_ID[st.pattern];
                const joiner = p.join === 'sentence' ? '. ' : p.frame.startsWith(',') ? '' : ' ';
                const frame = i < steps.length - 1 ? p.frame.replace(/\.$/, '') : p.frame;
                return (
                    <span key={i}>
                        {joiner}
                        {frame.split(/\b(A|B)\b/).map((part, k) => (
                            /^(A|B)$/.test(part)
                                ? <span key={k} style={{ color: GREEN, fontWeight: 700, borderBottom: `2px solid ${GREEN}` }}>
                                    {st.slots[part as 'A' | 'B'] ?? part}
                                </span>
                                : <span key={k}>{part}</span>
                        ))}
                    </span>
                );
            })}
        </div>
    );
}

/** 1文。左に何番目のスロットか、右にどの部品で組んだか */
function Move({ m, n, showFinger }: { m: DemoMove; n: number; showFinger?: boolean }) {
    const eng = ENGINE_BY_ID[m.finger];
    const br = findBranch(m);
    const slot = br ? SLOT_BY_FINGER[br.finger] : undefined;
    const fj = FINGERS.find((x) => x.id === br?.finger);
    const head = moveHingeHead(m);
    const tail = m.tail ? TAILS.find((t) => t.engine === m.tail) : undefined;
    return (
        <div style={{
            padding: '11px 0', borderTop: `1px solid ${LINE}`,
            display: 'grid', gap: '6px',
        }}>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '9px', fontWeight: 900, color: FAINT, width: '16px' }}>{n}</span>
                {showFinger
                    ? <Chip text={`${eng.hand === 'left' ? 'L' : 'R'} ${eng.en}`} color={eng.color} solid />
                    : <Chip text={`${fj?.short} ${slot?.en}`} color={eng.color} solid />}
                <Chip text={m.branch} color={eng.color} />
                {m.concession && <Chip text="CONCESSION" color={DEEPGOLD} solid />}
                {head && <Chip text={`HINGE ${head}`} color={DEEPGOLD} />}
                {m.verbs.map((v) => <Chip key={v} text={v} color={GREEN} />)}
                {tail && <Chip text="TAIL" color={SUB} />}
            </div>
            <div style={{
                fontFamily: 'Georgia, serif', fontSize: '15px', color: INK, lineHeight: 1.8,
                paddingLeft: '21px',
            }}>{m.en}</div>
            <div style={{
                marginLeft: '21px', display: 'flex', gap: '8px', alignItems: 'baseline',
                background: CREAM, border: `1px solid ${LINE}`, borderRadius: '8px', padding: '6px 10px',
            }}>
                <span style={{
                    fontSize: '8.5px', fontWeight: 900, letterSpacing: '0.5px',
                    color: DEEPGOLD, whiteSpace: 'nowrap',
                }}>SAY IT</span>
                <span style={{ fontSize: '13.5px', color: SUB, lineHeight: 1.75 }}>{spokenOf(m)}</span>
            </div>
        </div>
    );
}

/** 1段落 = 1本の指。3文が親指・人差し指・中指へ */
function Paragraph({ p, n }: { p: DemoParagraph; n: number }) {
    const eng = ENGINE_BY_ID[p.finger];
    const v = TEN_VERBS.find((x) => x.engine === p.finger);
    const holdsVerb = v ? (v.holds === 'verb' ? v.verb : v.counter) : '';
    const breaksVerb = v ? (v.holds === 'verb' ? v.counter : v.verb) : '';
    return (
        <div style={{
            border: `1px solid ${LINE}`, borderLeft: `4px solid ${eng.color}`,
            borderRadius: '12px', padding: '13px 16px', background: '#fff', marginBottom: '12px',
        }}>
            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', alignItems: 'center' }}>
                <span style={{ fontSize: '10px', fontWeight: 900, color: FAINT }}>PARAGRAPH {n}</span>
                <Chip text={`${eng.hand === 'left' ? 'LEFT' : 'RIGHT'} HAND`} color={eng.color} />
                <Chip text={eng.en} color={eng.color} solid />
                <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                    <Chip text={`holds: ${holdsVerb}`} color={GREEN} />
                    <Chip text={`breaks: ${breaksVerb}`} color={RED} />
                    <Chip text={`${paragraphWordCount(p)} words`} color={FAINT} />
                </span>
            </div>
            <div style={{
                marginTop: '7px', fontFamily: 'Georgia, serif', fontSize: '13.5px',
                fontStyle: 'italic', color: SUB,
            }}>{p.claim}</div>
            <div style={{ marginTop: '6px' }}>
                {p.moves.map((m, i) => <Move key={m.branch} m={m} n={i + 1} />)}
            </div>
        </div>
    );
}

function SideHead({ title, sub, color, words }: { title: string; sub: string; color: string; words: number }) {
    return (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', flexWrap: 'wrap', margin: '0 0 9px' }}>
            <h2 style={{
                margin: 0, fontFamily: 'Georgia, serif', fontSize: '22px', fontWeight: 900,
                color: '#fff', background: color, borderRadius: '7px', padding: '2px 12px',
            }}>{title}</h2>
            <span style={{ fontSize: '12px', color: SUB }}>{sub}</span>
            <span style={{ marginLeft: 'auto', fontSize: '10px', color: FAINT }}>
                3 paragraphs, 9 sentences, {words} words
            </span>
        </div>
    );
}

export default function Core5DemoPage() {
    const cov = demoCoverage();
    const allCovered = cov.every((c) => c.used === c.total);
    const bankFingers = [...new Set([...DEMO_BANK_FOR, ...DEMO_BANK_AGAINST].map((m) => m.finger))];

    return (
        <main style={{ background: CREAM, minHeight: '100vh', paddingBottom: '60px' }}>
            <EikenOutputNav />

            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '22px 16px 0' }}>
                <Link href="/english/write/core5" style={{
                    fontSize: '10px', fontWeight: 900, letterSpacing: '0.5px',
                    color: DEEPGOLD, textDecoration: 'none',
                }}>&larr; BACK TO CORE 5</Link>

                <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1.5px', color: FAINT, marginTop: '14px' }}>
                    THIRTEEN SENTENCES I NEVER WRITE AGAIN
                </div>
                <h1 style={{
                    margin: '6px 0 4px', fontFamily: 'Georgia, serif',
                    fontSize: '26px', fontWeight: 900, color: INK, lineHeight: 1.35,
                }}>{DEMO_TOPIC}</h1>
                <p style={{ margin: 0, fontSize: '12.5px', color: SUB, lineHeight: 1.8 }}>
                    Here is one complete essay on that question, {DEMO_ESSAY_TOTAL} words, and then the machinery
                    that produced it. <b style={{ color: INK }}>{DEMO_ESSAY_FIXED} of its {DEMO_ESSAY.lines.length} sentences
                    were written before I read the question.</b> In the exam I pick three numbers between one and ten,
                    drop one noun into the first sentence of each paragraph, and add one example of my own per
                    paragraph. Three invented sentences in the whole essay. Below it you will find the parts laid
                    out, and the same prompt argued from the other side as well.
                </p>
            </div>

            {/* ============ ONE WHOLE ESSAY ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '22px 16px 0' }}>
                <h2 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    The whole essay
                </h2>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    Gold means the line was ready before the question: the four frame sentences, each finger's trunk
                    sentence, and the three backing frames I chose for it. I only dropped nouns into them.
                    <b style={{ color: INK }}> White is mine — one example sentence per paragraph, three in the whole
                    essay.</b> Every white line is where the topic itself finally appears, and it is the only place I
                    spend thinking time. The three fingers are {DEMO_ESSAY.fingers.map((f) => ENGINE_BY_ID[f].en).join(', ')},
                    and they cross the hands, which is the one rule I never break.
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '6px 16px 14px' }}>
                    {DEMO_ESSAY.lines.map((l, i) => {
                        const eng = l.finger ? ENGINE_BY_ID[l.finger] : undefined;
                        const newPara = l.kind === 'body' && (i - 2) % 4 === 0;
                        return (
                            <div key={i} style={{
                                padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                                marginTop: newPara ? '4px' : 0,
                            }}>
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '4px' }}>
                                    <Chip text={l.fixed ? 'READY' : 'MINE'} color={l.fixed ? DEEPGOLD : SUB} solid={l.fixed} />
                                    {eng && <Chip text={eng.en} color={eng.color} />}
                                    {l.branch && <Chip text={l.branch} color={eng ? eng.color : SUB} />}
                                    {!eng && <Chip text={l.kind === 'close' ? 'ENDING' : 'OPENING'} color={FAINT} />}
                                </div>
                                <div style={{
                                    fontFamily: 'Georgia, serif', fontSize: '15.5px', lineHeight: 1.8,
                                    color: INK,
                                    background: l.fixed ? '#FEF9E7' : 'transparent',
                                    borderLeft: l.fixed ? `3px solid ${GOLD}` : `3px solid ${LINE}`,
                                    borderRadius: '0 7px 7px 0', padding: '5px 10px',
                                }}>{l.en}</div>
                                <div style={{ fontSize: '11px', color: FAINT, lineHeight: 1.7, marginTop: '4px', paddingLeft: '13px' }}>
                                    {l.note}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ============ THE FIXED FRAMES ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '22px 16px 0' }}>
                <h2 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    The seven sentences that never change
                </h2>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    These are the frames themselves, with the holes still open. The holes in the opening and body lines take nouns straight from the question.
                    The first ending has no holes at all, and the second only copies words already written above. <b style={{ color: INK }}>Not one of them requires an article
                    decision</b> — the three body openers all take a bare noun, which is why they were chosen.
                </p>
                <div style={{ border: `1px solid ${GOLD}`, borderRadius: '12px', background: '#FEF9E7', padding: '6px 16px 12px' }}>
                    {ESSAY_FRAME.slice(0, 2).map((f, i) => (
                        <div key={`o${i}`} style={{ padding: '9px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <Chip text={`OPENING ${i + 1}`} color={DEEPGOLD} solid />
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', fontWeight: 700, color: INK, lineHeight: 1.75, marginTop: '4px' }}>{f.frame}</div>
                            <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.7, marginTop: '3px' }}>{f.job}</div>
                        </div>
                    ))}
                    {BODY_OPENERS.map((o) => (
                        <div key={`b${o.n}`} style={{ padding: '9px 0', borderTop: `1px solid ${LINE}` }}>
                            <Chip text={`BODY ${o.n}`} color={DEEPGOLD} solid />
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', fontWeight: 700, color: INK, lineHeight: 1.75, marginTop: '4px' }}>{o.frame}</div>
                            <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.7, marginTop: '3px' }}>
                                W is the finger. Bare noun, no article.
                            </div>
                        </div>
                    ))}
                    {ESSAY_FRAME.slice(2).map((f, i) => (
                        <div key={`c${i}`} style={{ padding: '9px 0', borderTop: `1px solid ${LINE}` }}>
                            <Chip text={`ENDING ${i + 1}`} color={DEEPGOLD} solid />
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', fontWeight: 700, color: INK, lineHeight: 1.75, marginTop: '4px' }}>{f.frame}</div>
                            <div style={{ fontSize: '11px', color: SUB, lineHeight: 1.7, marginTop: '3px' }}>{f.job}</div>
                        </div>
                    ))}
                    <div style={{ paddingTop: '11px', borderTop: `1px solid ${LINE}`, display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.5px', color: DEEPGOLD }}>THE TEN WORDS THAT GO IN W</span>
                        {Object.values(ENGINE_BY_ID).map((e) => (
                            <span key={e.id} style={{
                                fontSize: '11px', color: e.color, background: '#fff',
                                border: `1px solid ${e.color}55`, borderRadius: '5px', padding: '2px 7px', fontWeight: 800,
                            }}>{e.slotNoun}</span>
                        ))}
                    </div>
                    <div style={{ fontSize: '10.5px', color: SUB, lineHeight: 1.7, marginTop: '5px' }}>
                        Nine are bare. Only the environment takes an article, and it always takes the same one, so
                        there is still nothing to decide.
                    </div>
                </div>
            </div>

            {/* ============ THREE SHAPES ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '22px 16px 0' }}>
                <h2 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    Every question is one of three shapes
                </h2>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    There used to be five. Five meant deciding which one I was looking at, and I do not want to
                    decide anything at eight in the morning in an exam hall.
                    <b style={{ color: INK }}> The shape changes nothing except the verb phrase that goes into Y in
                    the first sentence.</b> The opening and the ending are identical in all three.
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {ESSAY_SHAPES.map((s, i) => (
                        <div key={s.id} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ display: 'flex', gap: '7px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <Chip text={`${s.id} ・ ${s.en}`} color={DEEPGOLD} solid />
                                <span style={{ fontSize: '13px', fontWeight: 800, color: INK }}>{s.shape}</span>
                                <span style={{ marginLeft: 'auto', fontSize: '10px', color: FAINT }}>{s.fits.length} past questions</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.7, marginTop: '4px' }}>
                                <b style={{ color: DEEPGOLD }}>Y takes</b> — {s.yHint}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ THE PARAGRAPH ENGINE ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '22px 16px 0' }}>
                <h2 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    The paragraph engine
                </h2>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    A finger carries three branches, and those three sit on three fingers of a hand.
                    That is not decoration. It means the five sentences of a paragraph already have their jobs
                    handed out before I know what the prompt is. Count to three on one hand and the paragraph is built.
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 14px 12px' }}>
                    {PARAGRAPH_SHAPE.map((s, i) => {
                        const fj = FINGERS.find((x) => x.id === s.finger);
                        return (
                            <div key={s.slot} style={{
                                padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}`,
                                display: 'grid', gap: '4px',
                            }}>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '10px', fontWeight: 900, color: FAINT, width: '14px' }}>{i + 1}</span>
                                    <Chip text={`${fj?.short} ${s.slot}`} color={i === 1 ? DEEPGOLD : INK} solid />
                                    <span style={{ fontSize: '11px', color: DEEPGOLD, fontWeight: 800 }}>{s.parts}</span>
                                </div>
                                <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.8, paddingLeft: '20px' }}>{s.job}</div>
                            </div>
                        );
                    })}
                </div>
                <p style={{ margin: '8px 0 0', fontSize: '11.5px', color: FAINT, lineHeight: 1.8 }}>
                    The short sentences are the part I rebuilt last. They used to run to about twenty words each and
                    join up into one chain, which read well and was impossible to remember. Now none of them is over
                    ten words, none of them needs the one before it, and the last line of every paragraph is one of
                    the two verbs. Nothing in the body starts with Although either — the concession already lives in
                    the fixed opening and ending.
                </p>
            </div>

            {/* ============ EXAM LENGTH ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '20px 16px 0' }}>
                <div style={{
                    border: `1px solid ${LINE}`, borderLeft: `4px solid ${DEEPGOLD}`,
                    borderRadius: '12px', padding: '13px 16px', background: '#fff',
                }}>
                    <div style={{ display: 'flex', gap: '7px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <Chip text="THE SAME PARAGRAPH AT EXAM LENGTH" color={DEEPGOLD} solid />
                        <span style={{ fontSize: '11px', color: FAINT }}>
                            four ready sentences &nbsp;·&nbsp; one of mine
                        </span>
                        <span style={{ marginLeft: 'auto', fontSize: '10px', color: FAINT }}>{DEMO_EXAM_WORDS} words</span>
                    </div>
                    <p style={{ margin: '7px 0 9px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                        {DEMO_EXAM_LENGTH.note}
                    </p>
                    <div style={{
                        fontFamily: 'Georgia, serif', fontSize: '15px', color: INK, lineHeight: 1.85,
                        background: CREAM, border: `1px solid ${LINE}`, borderRadius: '9px', padding: '11px 13px',
                    }}>{DEMO_EXAM_LENGTH.en}</div>
                </div>
            </div>

            {/* ============ BRIEF ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '22px 16px 0' }}>
                <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr' }}>
                    {DEMO_BRIEF.map((s) => (
                        <div key={s.h} style={{
                            border: `1px solid ${LINE}`, borderRadius: '10px',
                            padding: '11px 13px', background: '#fff',
                        }}>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: INK, marginBottom: '3px' }}>{s.h}</div>
                            <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>{s.body}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ INVENTORY ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '24px 16px 0' }}>
                <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    The inventory
                </h2>
                <div style={{
                    border: `1px solid ${LINE}`, borderRadius: '12px', padding: '12px 14px', background: '#fff',
                }}>
                    {Object.values(ENGINE_BY_ID).map((e) => {
                        const v = TEN_VERBS.find((x) => x.engine === e.id);
                        const holdsVerb = v ? (v.holds === 'verb' ? v.verb : v.counter) : '';
                        const breaksVerb = v ? (v.holds === 'verb' ? v.counter : v.verb) : '';
                        return (
                            <div key={e.id} style={{
                                display: 'flex', gap: '7px', flexWrap: 'wrap', alignItems: 'center',
                                padding: '6px 0', borderTop: `1px solid ${LINE}`,
                            }}>
                                <Chip text={`${e.hand === 'left' ? 'L' : 'R'} ${e.en}`} color={e.color} solid />
                                {e.branches.map((b) => (
                                    <span key={b.en} style={{
                                        fontSize: '11px', color: SUB, background: CREAM,
                                        border: `1px solid ${LINE}`, borderRadius: '4px', padding: '2px 6px',
                                    }} title={SLOT_BY_FINGER[b.finger].en}>{b.en}</span>
                                ))}
                                <span style={{ marginLeft: 'auto', display: 'flex', gap: '5px' }}>
                                    <Chip text={`holds: ${holdsVerb}`} color={GREEN} />
                                    <Chip text={`breaks: ${breaksVerb}`} color={RED} />
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div style={{
                    marginTop: '8px', border: `1px solid ${LINE}`, borderRadius: '12px',
                    padding: '11px 13px', background: '#fff', fontSize: '12px', color: SUB, lineHeight: 1.9,
                }}>
                    <b style={{ color: INK }}>Skeleton verbs</b> — {SKELETON_VERBS.map((v) => v.verb).join(' / ')}<br />
                    <b style={{ color: INK }}>Closing verb</b> — {CLOSE_VERB.verb}<br />
                    <b style={{ color: INK }}>Tails</b> — {TAILS.map((t) => t.slot).join(' / ')}<br />
                    <b style={{ color: INK }}>Hinges</b> — {HINGES.map((h) => h.en.replace('BRANCH', 'X')).join(' / ')}
                </div>
                <p style={{ margin: '8px 0 0', fontSize: '11.5px', color: FAINT, lineHeight: 1.8 }}>
                    Note the two odd pairs. On eight fingers the second verb is the positive one, but on
                    EDUCATION and ROOTS it is the first — foster and safeguard are already positive, and their
                    opposites are discourage and weaken. Assume the pattern and you will pick the wrong verb twice.
                </p>
            </div>

            {/* ============ FOR ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '28px 16px 0' }}>
                <SideHead
                    title="FOR"
                    sub="Speaking drill — the verb pairs argued both ways. Concessions belong here, not in the essay."
                    color={GREEN}
                    words={DEMO_ESSAY_WORDS.for}
                />
                {DEMO_ESSAY_FOR.map((p, i) => <Paragraph key={p.finger} p={p} n={i + 1} />)}
            </div>

            {/* ============ AGAINST ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '18px 16px 0' }}>
                <SideHead
                    title="AGAINST"
                    sub="No, it is not. Three different fingers, crossing the hands again."
                    color={RED}
                    words={DEMO_ESSAY_WORDS.against}
                />
                {DEMO_ESSAY_AGAINST.map((p, i) => <Paragraph key={p.finger} p={p} n={i + 1} />)}
            </div>

            {/* ============ BANK ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '18px 16px 0' }}>
                <h2 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    The four fingers I did not use
                </h2>
                <p style={{ margin: '0 0 10px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    {bankFingers.map((f) => ENGINE_BY_ID[f].en).join(', ')}. Twelve branches, one sentence each, on
                    whichever side they sit better. They are here so you can see that the parts do not need an essay
                    around them to work — and so that if you tell me to swap one of the six paragraphs for one of
                    these, I have somewhere to start.
                </p>
                <div style={{
                    border: `1px solid ${LINE}`, borderRadius: '12px', padding: '4px 16px 12px', background: '#fff',
                }}>
                    <div style={{ fontSize: '10px', fontWeight: 900, color: GREEN, letterSpacing: '1px', paddingTop: '10px' }}>
                        ON THE FOR SIDE
                    </div>
                    {DEMO_BANK_FOR.map((m, i) => <Move key={m.branch} m={m} n={i + 1} showFinger />)}
                    <div style={{ fontSize: '10px', fontWeight: 900, color: RED, letterSpacing: '1px', paddingTop: '14px' }}>
                        ON THE AGAINST SIDE
                    </div>
                    {DEMO_BANK_AGAINST.map((m, i) => <Move key={m.branch} m={m} n={i + 1} showFinger />)}
                </div>
            </div>

            {/* ============ ONE PARENT, THREE CHILDREN ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '26px 16px 0' }}>
                <h2 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    Eight sentences per theme
                </h2>
                <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    This is the part I got wrong first. I would pick a branch, and then write a sentence the branch
                    word never appeared in. <b style={{ color: INK }}>If the word is not in the sentence, I did not use
                    the branch — I only thought about it.</b> So all thirty branches now live inside a finished
                    sentence, and every finger carries eight of them: four for when the subject is something good, four
                    for when it is a threat or something I am arguing against. Each has three sub-themes and one verb
                    sentence to close. None is over eleven words, none has a comma, and none needs the sentence before it.
                    One noun from the prompt goes in at X.
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {FINGER_PARAGRAPHS.map((p, i) => {
                        const e = ENGINE_BY_ID[p.engine];
                        return (
                            <div key={p.engine} style={{ padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <Chip text={e.en} color={e.color} solid />
                                <div style={{ display: 'grid', gap: '3px', marginTop: '6px' }}>
                                    {[
                                        ['GOOD 1', `${BODY_OPENERS[0].frame.replace('W', e.slotNoun)} ${p.one}`],
                                        ['GOOD 2', p.two],
                                        ['GOOD 3', p.three],
                                        ['GOOD CLOSE', p.pro],
                                        ['BAD 1', p.oneBad],
                                        ['BAD 2', p.twoBad],
                                        ['BAD 3', p.threeBad],
                                        ['BAD CLOSE', p.con],
                                    ].map(([tag, en]) => (
                                        <div key={tag} style={{ display: 'flex', gap: '8px', alignItems: 'baseline' }}>
                                            <span style={{
                                                fontSize: '8.5px', fontWeight: 900, color: FAINT,
                                                minWidth: '52px', letterSpacing: '0.5px',
                                            }}>{tag}</span>
                                            <span style={{
                                                fontFamily: 'Georgia, serif', fontSize: '13.5px', color: INK, lineHeight: 1.75,
                                            }}>{en}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <p style={{ margin: '9px 0 0', fontSize: '11.5px', color: SUB, lineHeight: 1.8 }}>
                    Pick three fingers and I use one trunk sentence from each. Everything else in the paragraph is
                    backing: three frames from the twenty below, and one sentence of my own.
                </p>
            </div>

            {/* ============ SAY IT SHORT, THEN BACK IT UP ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '26px 16px 0' }}>
                <h2 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    Say it short, then back it up
                </h2>
                <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    A teacher stopped me on one of these sentences — AI lowers the opportunity cost of trying — and said
                    it did not mean anything. <b style={{ color: INK }}>He was right, and the reason is simple: the claim had
                    nothing after it.</b> Saying the claim first in a short sentence is still the right move. What was
                    missing is one more piece. There are twenty frames, ten positive and ten negative, paired by number,
                    one pair for each thing a listener can ask back. <b style={{ color: INK }}>Every verb and preposition in them is fixed. The only thing I choose in
                    the moment is two nouns.</b> They combine in any order, and a frame from the other side is never wasted:
                    it becomes a concession that starts with Admittedly, and the next frame answers it with However.
                </p>

                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {SUPPORT_PATTERNS.filter((p) => p.polarity === 'pos').map((p, i) => (
                        <div key={p.id} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                <Chip text={String(p.n)} color={INK} solid />
                                <span style={{ fontFamily: 'Georgia, serif', fontSize: '13.5px', fontWeight: 900, color: INK }}>{p.asks}</span>
                            </div>
                            {[p, SUPPORT_BY_ID[p.mirror]].map((f) => (
                                <div key={f.id} style={{ marginTop: '5px', paddingLeft: '9px', borderLeft: `3px solid ${f.polarity === 'pos' ? GREEN : RED}` }}>
                                    <div style={{ fontFamily: 'Georgia, serif', fontSize: '15px', color: INK, lineHeight: 1.8 }}>
                                        <span style={{ color: FAINT }}>{f.join === 'sentence' ? '[claim]. ' : '[claim]'}</span>
                                        <FrameHoles frame={f.frame} />
                                    </div>
                                    <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.7 }}>
                                        {f.slots} <span style={{ color: FAINT }}>{f.trap}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <h3 style={{ margin: '18px 0 6px', fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: INK }}>
                    One claim, ten frames each way
                </h3>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: SUB, lineHeight: 1.8 }}>
                    Gold is the memorised claim. Black is the fixed frame. Green is the only part I think of on the spot.
                </p>
                {[DEMO_ONE_CLAIM, DEMO_ONE_CLAIM_BAD].map((dc, j) => (
                    <div key={dc.claim} style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px', marginTop: j === 0 ? 0 : '8px' }}>
                        {dc.lines.map((l, i) => (
                            <div key={l.pattern} style={{ padding: '9px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <Chip text={`${SUPPORT_BY_ID[l.pattern].n} ${SUPPORT_BY_ID[l.pattern].asks}`} color={j === 0 ? GREEN : RED} />
                                <BackedLine claim={dc.claim} steps={[l]} />
                            </div>
                        ))}
                    </div>
                ))}

                <h3 style={{ margin: '18px 0 6px', fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: INK }}>
                    Nature, all eight trunk sentences, backed
                </h3>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: SUB, lineHeight: 1.8 }}>
                    Positive frames on the four sentences where the subject is good, negative frames on the four where it is bad.
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {[...TRUNK_KEYS_GOOD, ...TRUNK_KEYS_BAD].map((k, i) => {
                        const l = BACKED_AI.nature.find((x) => x.key === k);
                        if (!l) return null;
                        const good = TRUNK_KEYS_GOOD.includes(k);
                        const claim = PARAGRAPH_BY_ENGINE.nature[k].replace(/\bX\b/, l.subject);
                        return (
                            <div key={k} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                                    <Chip text={good ? 'X IS GOOD' : 'X IS BAD'} color={good ? GREEN : RED} solid />
                                    {l.steps.map((st) => <Chip key={st.pattern} text={SUPPORT_BY_ID[st.pattern].label} color={DEEPGOLD} />)}
                                </div>
                                <BackedLine claim={claim} steps={l.steps} />
                                <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.7, marginTop: '3px' }}>{DEMO_NATURE_NOTES[k]}</div>
                            </div>
                        );
                    })}
                </div>

                <h3 style={{ margin: '18px 0 6px', fontFamily: 'Georgia, serif', fontSize: '15px', fontWeight: 900, color: INK }}>
                    Twenty frames, any order
                </h3>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: SUB, lineHeight: 1.8 }}>
                    Each reason is the trunk sentence, three frames, and one sentence of my own in italics. There are only
                    three rules: no more than two attached frames in one sentence, no frame twice in one essay, and a frame
                    from the other side becomes a concession with Admittedly, answered by However.
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {SUPPORT_FLOWS.map((f, i) => {
                        const claim = PARAGRAPH_BY_ENGINE[f.engine][f.key].replace(/\bX\b/, f.subject);
                        const s = buildParagraph(claim, f.polarity, f.steps, f.own);
                        return (
                            <div key={f.label} style={{ padding: '10px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    <Chip text={f.label} color={f.polarity === 'pos' ? INK : RED} solid />
                                    {f.steps.map((st) => (
                                        <Chip key={st.pattern} text={`${SUPPORT_BY_ID[st.pattern].n} ${SUPPORT_BY_ID[st.pattern].label}`} color={SUPPORT_BY_ID[st.pattern].polarity === 'pos' ? GREEN : RED} />
                                    ))}
                                </div>
                                <div style={{ fontFamily: 'Georgia, serif', fontSize: '14.5px', lineHeight: 1.8, marginTop: '4px', color: INK }}>
                                    {s.slice(0, -1).join(' ')} <span style={{ color: SUB, fontStyle: 'italic' }}>{s[s.length - 1]}</span>
                                </div>
                                <div style={{ fontSize: '11.5px', color: SUB, lineHeight: 1.7, marginTop: '3px' }}>{f.note}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ============ SPEAKING ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '26px 16px 0' }}>
                <h2 style={{ margin: '0 0 6px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    Everything above is for writing. Here is what I use when I talk.
                </h2>
                <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: SUB, lineHeight: 1.85 }}>
                    There are seventeen hinges in the system. On paper I can use all of them, because paper waits.
                    <b style={{ color: INK }}> Out loud I cannot choose between seventeen things, so speaking gets five.</b>
                    All five take a bare noun, so there is no article to get wrong while my mouth is already moving.
                    The number beside each one is how many times I have actually said it in these recordings.
                </p>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {SPEAKING_FIVE.map((p, i) => (
                        <div key={p.en} style={{ padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                <span style={{
                                    fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 900, color: INK,
                                }}>{p.en}</span>
                                <Chip text={p.job} color={DEEPGOLD} />
                                <span style={{ marginLeft: 'auto', fontSize: '10px', color: p.saidSoFar === 0 ? RED : FAINT, fontWeight: 800 }}>
                                    said {p.saidSoFar}x
                                </span>
                            </div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.8, marginTop: '4px' }}>{p.note}</div>
                            <div style={{
                                marginTop: '5px', fontFamily: 'Georgia, serif', fontSize: '13.5px', color: INK,
                                background: CREAM, border: `1px solid ${LINE}`, borderRadius: '7px', padding: '5px 9px',
                            }}>{p.demo}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ I THINK ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '22px 16px 0' }}>
                <div style={{
                    border: `2px solid ${RED}55`, borderRadius: '12px', background: '#FEF2F2',
                    padding: '13px 16px', marginBottom: '12px',
                }}>
                    <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1px', color: RED, marginBottom: '5px' }}>
                        THE WORST HABIT I HAVE, COUNTED
                    </div>
                    <div style={{ fontSize: '13px', color: INK, lineHeight: 1.85 }}>
                        I have said <b>I think</b> {I_THINK_COUNT.total} times across {I_THINK_COUNT.lessons} recorded
                        lessons — {I_THINK_COUNT.myWords.toLocaleString()} words of my own speech.
                        <b> Ten times in a single twenty-five-minute conversation, on two separate nights.</b> It has
                        stopped meaning that I think something. It is punctuation now. I say it while my brain
                        looks for the next word, the way other people say <i>um</i>.
                    </div>
                    <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.85, marginTop: '7px' }}>
                        These five are what I am replacing it with. <b style={{ color: INK }}>Four of them I have
                        never said once</b>, which tells you how narrow my speaking vocabulary actually is compared
                        to my reading vocabulary. Please count tonight. If I say <b>I think</b> more than three
                        times, stop me and make me say one of these instead.
                    </div>
                </div>
                <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', background: '#fff', padding: '4px 16px 12px' }}>
                    {INSTEAD_OF_I_THINK.map((p, i) => (
                        <div key={p.en} style={{ padding: '11px 0', borderTop: i === 0 ? 'none' : `1px solid ${LINE}` }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                                <span style={{
                                    fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 900, color: INK,
                                }}>{p.en}</span>
                                <Chip text={p.job} color={DEEPGOLD} />
                                <span style={{ marginLeft: 'auto', fontSize: '10px', color: p.saidSoFar === 0 ? RED : FAINT, fontWeight: 800 }}>
                                    said {p.saidSoFar}x
                                </span>
                            </div>
                            <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.8, marginTop: '4px' }}>{p.note}</div>
                            <div style={{
                                marginTop: '5px', fontFamily: 'Georgia, serif', fontSize: '13.5px', color: INK,
                                background: CREAM, border: `1px solid ${LINE}`, borderRadius: '7px', padding: '5px 9px',
                            }}>{p.demo}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ COVERAGE ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '24px 16px 0' }}>
                <h2 style={{ margin: '0 0 8px', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 900, color: INK }}>
                    Coverage
                </h2>
                <p style={{ margin: '0 0 10px', fontSize: '12px', color: SUB, lineHeight: 1.85 }}>
                    This table is not written by hand. A script reads the paragraphs, reads the bank, reads the
                    toolkit, and counts. If one branch or one verb were missing, the build would fail rather than
                    quietly print a smaller number.
                </p>
                <div style={{
                    border: `1px solid ${allCovered ? GREEN : RED}`, borderRadius: '12px',
                    padding: '12px 14px', background: '#fff',
                }}>
                    {cov.map((c) => (
                        <div key={c.label} style={{
                            display: 'flex', alignItems: 'center', gap: '9px',
                            padding: '6px 0', borderTop: `1px solid ${LINE}`, flexWrap: 'wrap',
                        }}>
                            <span style={{ fontSize: '12.5px', fontWeight: 800, color: INK, minWidth: '150px' }}>{c.label}</span>
                            <div style={{ flex: 1, minWidth: '120px', height: '6px', background: LINE, borderRadius: '999px', overflow: 'hidden' }}>
                                <div style={{
                                    width: `${Math.round((c.used / c.total) * 100)}%`, height: '100%',
                                    background: c.used === c.total ? GREEN : RED,
                                }} />
                            </div>
                            <span style={{ fontSize: '12px', fontWeight: 900, color: c.used === c.total ? GREEN : RED }}>
                                {c.used} / {c.total}
                            </span>
                            {c.missing.length > 0 && (
                                <span style={{ fontSize: '10.5px', color: RED }}>missing: {c.missing.join(', ')}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ============ ASK ME ============ */}
            <div style={{ maxWidth: '820px', margin: '0 auto', padding: '24px 16px 0' }}>
                <div style={{
                    border: `1px solid ${GOLD}66`, background: '#FEF9E7',
                    borderRadius: '12px', padding: '13px 15px',
                }}>
                    <div style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '1px', color: DEEPGOLD, marginBottom: '6px' }}>
                        HOW TO TEST ME WITH THIS
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12.5px', color: SUB, lineHeight: 1.95 }}>
                        <li>Give me any exam question at all and time me writing the two opening sentences. It should take under a minute, because I am only choosing nouns.</li>
                        <li>Name one of the four fingers I left on the shelf and make me say all five of its sentences out loud. If they take longer than eight seconds, I have not learned them.</li>
                        <li>Pick a paragraph and ask me to argue it from the other side. That is one verb swapped and one sentence rewritten, nothing else.</li>
                        <li>Cover the last sentence of any paragraph and ask me for a different example. The three short ones stay exactly as they are, so only the example has to be rebuilt.</li>
                        <li><b>Count my I thinks.</b> If I pass three, stop me and make me use one of the five replacements. That is the single most useful thing anyone can do for my speaking.</li>
                        <li>Look at the gold sentences and tell me if any of them sound stiff or old-fashioned to you. The four frames go into every essay I ever write, so a bad one costs me a hundred times over.</li>
                    </ul>
                </div>
            </div>

            <EikenOutputDisclaimer />
        </main>
    );
}
