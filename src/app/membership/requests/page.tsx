'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const MEMBER_REQUESTS = [
    {
        requester: 'Goro Yamaguchi',
        title: 'Blackadder (1983-1989)',
        desc: 'イギリス皮肉の教科書。Rowan Atkinson主演。全4シリーズから厳選10表現。',
        expressions: [
            { expr: 'I have a cunning plan.', note: '英語圏で最も有名なキャッチフレーズの1つ。cunningは「ずる賢い」。Baldrickのplanは毎回ゴミだけど、この一言は日常で「いい作戦がある」って言う時に使われてる。皮肉込みで。', score: 19 },
            { expr: "Baldrick, your brain is so minute that if a hungry cannibal cracked your head open, there wouldn't be enough to cover a small water biscuit.", note: 'イギリス式insultの最高傑作。minuteは「マイニュート」と読んで「極小の」。so X that...構文のお手本。相手をバカにする時に、ここまで具体的なイメージで語るのがブリティッシュ・ウィット。', score: 16 },
            { expr: "I've come up with a plan so cunning you could stick a tail on it and call it a weasel.", note: 'so X you could...で「Xすぎて〜できるレベル」。weaselは「イタチ」。cunningとイタチを結びつける発想がイギリス人。褒めてるようで完全にふざけてる。', score: 17 },
            { expr: "Baldrick, have you no idea what irony is? -- Yes, it's like goldy and bronzy, only it's made out of iron.", note: 'ironyの意味を聞いたら「鉄でできたやつ」と返された。goldy, bronzyは存在しない単語。-yをつけて形容詞にするBaldrickの造語センス。バカなのに天才。', score: 18 },
            { expr: "I've been in your family since 1532. -- So has syphilis.", note: 'So has X.は「Xもな」。短い返しで最大ダメージを与えるイギリス式カウンター。syphilis（梅毒）との比較が容赦ない。タイミングと間が全て。', score: 15 },
            { expr: 'If you want something done properly, kill Baldrick before you start.', note: '元のことわざはIf you want something done properly, do it yourself.（自分でやれ）。これをBaldrick排除に改変。ことわざをツイストする技術。', score: 14 },
            { expr: "The path of my life is strewn with cow pats from the devil's own satanic herd!", note: 'strewn withは「〜で散らかっている」。cow patsは「牛のフン」。悪魔の牛のフンが人生に散らばってる。日本語の「踏んだり蹴ったり」の1000倍おもしろい言い方。', score: 15 },
            { expr: "Am I jumping the gun, Baldrick, or are the words 'I have a cunning plan' marching with ill-deserved confidence in the direction of this conversation?", note: 'jumping the gunは「先走る」。marching with ill-deserved confidenceは「身の程知らずの自信で行進してる」。相手が言いそうなことを先に潰す高等テクニック。', score: 16 },
            { expr: 'Your services might be as useful as a barbershop on the steps of a guillotine.', note: 'as useful as Xの形で「Xくらい役に立つ（＝全く役に立たない）」。ギロチンの階段の床屋。髪を整えても首が飛ぶ。この比喩はイギリス人の十八番。', score: 14 },
            { expr: "Who would have noticed another madman round here? Good luck, everyone.", note: 'シリーズ最終回。塹壕から飛び出す直前の台詞。Good luck, everyone.たった3語。何百もの皮肉の後で、最後だけ真っすぐ。ローワン・アトキンソンの最高傑作。', score: 20 },
        ],
    },
    {
        requester: 'Goro Yamaguchi',
        title: 'Mr. Bean / Rowan Atkinson (1990-2007)',
        desc: 'セリフが少ない男の、数少ないセリフが全部名言。インタビュー含む10表現。',
        expressions: [
            { expr: "I'm as poor as a church mouse, that's just had an enormous tax bill on the very day his wife ran off with another mouse, taking all the cheese.", note: 'as poor as a church mouseは「教会のネズミほど貧乏」。それをtax bill→wife ran off→taking all the cheeseと積み上げる。比喩を重ねて笑わせるイギリス話法。', score: 16 },
            { expr: "I think visual comedy is a universal language. You don't need subtitles if the performance is clear enough.", note: 'universal languageは「世界共通語」。Beanがセリフなしで世界中で通じる理由。英語学習者へのメッセージでもある。', score: 14 },
            { expr: "You're about as useful as a one-legged man at an arse-kicking contest.", note: '片足の男が尻蹴り大会に出る。arseはイギリス英語で「尻」（アメリカはass）。British vs Americanの違いが出る。', score: 15 },
            { expr: 'I may have the body of a weak and feeble woman, but I have the heart and stomach of a concrete elephant.', note: 'エリザベス1世の実際のスピーチのパロディ。本来は「lion\'s heart」のところを象に変えてる。歴史ネタ＋誇張＝Blackadder。', score: 14 },
            { expr: 'Leave me alone, Baldrick. If I wanted to talk to a vegetable, I would have bought one at the market.', note: 'vegetableは「野菜」だけどスラングで「無能な人」。If I wanted to X, I would have Y.は条件法の完璧な使い方。皮肉で学ぶ文法。', score: 15 },
            { expr: 'Baldrick, get the door.', note: 'get the doorは普通「ドアを開けろ」。Baldrickはドアを外して持ってきた。英語のget+名詞は文脈で意味が変わる。直訳と意味のズレがコメディになる瞬間。', score: 17 },
            { expr: "Not good enough. You're fired.", note: '5語。You\'re firedはトランプの決め台詞で有名だけど、Blackadderの方が先。短い文の連続で衝撃を与える技術。英語は短いほど強い。', score: 13 },
            { expr: "Have you ever been to Wales, Baldrick? Well, don't. It's a ghastly place. Huge gangs of tough, sinewy men roam the valleys, terrorizing people with their close-harmony singing.", note: 'ghastlyは「おぞましい」。terrorizing with close-harmony singingで「合唱で恐怖に陥れる」。怖そうな描写の結末が歌。このギャップがイギリスのユーモア。', score: 16 },
            { expr: "Darling, the guns have stopped. -- I say, do you think it's peace? -- No, I think it's lunch.", note: 'Darlingは人名だけどダブルミーニング。peaceに対するlunchの落差。希望を一瞬で粉砕する技術。喜劇と悲劇は同じ構造。', score: 17 },
            { expr: 'Who would have noticed another madman round here? Good luck, everyone.', note: 'シリーズ最後の最後。Good luck, everyone.たった3語。それまでの何百もの皮肉の後で、最後だけ真っすぐ。この3語が一番重い。', score: 20 },
        ],
    },
];

const SERIF = "'Noto Serif JP', 'Source Serif Pro', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', 'Noto Sans JP', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const GOLD = '#D4AF37';
const INK = '#1C1917';
const TEXT = '#44403C';
const MUTE = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';
const BG = '#FAFAF9';

export default function MemberRequestsPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: BG, fontFamily: SANS }}>
            {/* Header */}
            <header style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backgroundColor: 'rgba(250,250,249,0.95)',
                backdropFilter: 'blur(12px)',
                borderBottom: `1px solid ${LINE}`,
                padding: '14px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Link href="/" style={{ fontSize: 11, color: FAINT, textDecoration: 'none', letterSpacing: '0.12em', fontWeight: 600 }}>TONIO LAB</Link>
                    <span style={{ color: LINE, fontSize: 11 }}>/</span>
                    <Link href="/membership" style={{ fontSize: 11, color: FAINT, textDecoration: 'none', letterSpacing: '0.12em' }}>MEMBERS</Link>
                    <span style={{ color: LINE, fontSize: 11 }}>/</span>
                    <span style={{ fontSize: 11, color: GOLD, fontWeight: 700, letterSpacing: '0.14em' }}>REQUESTS</span>
                </div>
                <Link href="/membership" style={{ fontSize: 11, color: FAINT, textDecoration: 'none', letterSpacing: '0.08em' }}>← Back</Link>
            </header>

            {/* Hero */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '80px 24px 40px' }}>
                <p style={{
                    fontSize: 10,
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase' as const,
                    color: GOLD,
                    fontWeight: 700,
                    margin: '0 0 20px',
                }}>
                    Member Requests
                </p>
                <h1 style={{
                    fontFamily: SERIF,
                    fontSize: 38,
                    fontWeight: 700,
                    color: INK,
                    lineHeight: 1.25,
                    letterSpacing: '-0.01em',
                    margin: '0 0 24px',
                }}>
                    メンバーが頼んで、<br />実際に作ったやつ。
                </h1>
                <p style={{
                    fontSize: 15,
                    color: TEXT,
                    lineHeight: 1.95,
                    maxWidth: 560,
                    margin: 0,
                }}>
                    Goro Yamaguchiさんから「BlackadderとMr. Beanやってほしい」とリクエストされて、合計20表現の教材を組みました。以下がその全記録です。
                </p>
            </section>

            {/* Requests */}
            <section style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px 80px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
                    {MEMBER_REQUESTS.map((req) => (
                        <article key={req.title}>
                            <p style={{
                                fontSize: 10,
                                letterSpacing: '0.25em',
                                textTransform: 'uppercase' as const,
                                color: GOLD,
                                fontWeight: 700,
                                margin: '0 0 12px',
                            }}>
                                Requested by {req.requester}
                            </p>
                            <h2 style={{
                                fontFamily: SERIF,
                                fontSize: 28,
                                fontWeight: 700,
                                color: INK,
                                margin: '0 0 10px',
                                letterSpacing: '-0.005em',
                            }}>
                                {req.title}
                            </h2>
                            <p style={{
                                fontSize: 14,
                                color: MUTE,
                                lineHeight: 1.75,
                                margin: '0 0 32px',
                                fontStyle: 'italic' as const,
                            }}>
                                {req.desc}
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                                {req.expressions
                                    .sort((a, b) => b.score - a.score)
                                    .map((e, idx) => (
                                    <div key={idx}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 12 }}>
                                            <span style={{
                                                fontFamily: SERIF,
                                                fontSize: 13,
                                                color: GOLD,
                                                fontStyle: 'italic' as const,
                                                flexShrink: 0,
                                                minWidth: 28,
                                            }}>
                                                {String(idx + 1).padStart(2, '0')}.
                                            </span>
                                            <p style={{
                                                fontFamily: SERIF,
                                                fontSize: 18,
                                                fontWeight: 600,
                                                color: INK,
                                                lineHeight: 1.55,
                                                margin: 0,
                                                fontStyle: 'italic' as const,
                                            }}>
                                                &ldquo;{e.expr}&rdquo;
                                            </p>
                                        </div>
                                        <p style={{
                                            fontSize: 14,
                                            color: TEXT,
                                            lineHeight: 1.9,
                                            margin: '0 0 0 44px',
                                            paddingLeft: 16,
                                            borderLeft: `2px solid ${GOLD}`,
                                        }}>
                                            {e.note}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                <div style={{
                    textAlign: 'center' as const,
                    marginTop: 80,
                    paddingTop: 40,
                    borderTop: `1px solid ${LINE}`,
                }}>
                    <p style={{ fontSize: 13, color: MUTE, margin: '0 0 16px', fontStyle: 'italic' as const }}>
                        あなたからのリクエストも、待ってます。
                    </p>
                    <Link href="/membership" style={{
                        fontSize: 13,
                        color: INK,
                        textDecoration: 'underline',
                        textDecorationColor: GOLD,
                        textUnderlineOffset: 4,
                        fontWeight: 600,
                    }}>
                        ← メンバーシップページへ戻る
                    </Link>
                </div>
            </section>
        </div>
    );
}
