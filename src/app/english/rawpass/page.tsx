'use client';

/**
 * RAW PASS 商品LP
 *
 * 売る約束は「TOEICリスニング」。届けるものは「YouTubeが聞ける耳」。
 * この2つを繋ぐのが「試験音声を準備運動として使い切る」という設計で、それがこのページの全部。
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    RAMP, PAPERS, PHASES, PRICE, GUARANTEE, FAQ, RAWPASS_DAYS, BUY_URL, WAITLIST_URL,
} from '@/data/english/rawpass';
import { noiseDial } from '@/lib/english/rawpass/ear-engine';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const CREAM = '#FFFDF8';
const INK = '#1C1917';
const SUB = '#78716C';
const LINE = '#E7E5E4';
const SERIF = '"Hiragino Mincho ProN", "Yu Mincho", Georgia, serif';

export default function RawPassLP() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const c = () => setIsMobile(window.innerWidth < 768);
        c(); window.addEventListener('resize', c);
        return () => window.removeEventListener('resize', c);
    }, []);

    const pad = isMobile ? '0 18px' : '0 30px';
    const sec: React.CSSProperties = { maxWidth: '960px', margin: '0 auto', padding: isMobile ? '52px 18px 0' : '84px 30px 0' };

    const Eyebrow = ({ children }: { children: React.ReactNode }) => (
        <div style={{ fontSize: '11px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '3px', marginBottom: '14px' }}>{children}</div>
    );
    const H = ({ children }: { children: React.ReactNode }) => (
        <h2 style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '34px', fontWeight: 900, lineHeight: 1.4, margin: '0 0 20px', letterSpacing: '0.5px' }}>{children}</h2>
    );
    const P = ({ children }: { children: React.ReactNode }) => (
        <p style={{ fontSize: isMobile ? '14px' : '15.5px', lineHeight: 2.1, color: '#44403C', margin: '0 0 18px' }}>{children}</p>
    );

    const Buy = ({ label }: { label?: string }) => {
        const href = BUY_URL || WAITLIST_URL;
        const text = BUY_URL ? (label || `${PRICE.mainLabel} で買う`) : '先行案内を受け取る';
        return (
            <div>
                <a href={href} target={BUY_URL ? undefined : '_blank'} rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <div style={{
                        display: 'block', textAlign: 'center',
                        background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                        padding: isMobile ? '17px 28px' : '19px 40px', borderRadius: '14px',
                        fontSize: isMobile ? '16px' : '18px', fontWeight: 900, letterSpacing: '0.5px',
                        boxShadow: '0 8px 24px rgba(212,175,55,0.32)',
                    }}>{text}</div>
                </a>
                {!BUY_URL && (
                    <div style={{ fontSize: '11.5px', color: SUB, marginTop: '9px', textAlign: 'center', lineHeight: 1.8 }}>
                        販売開始前です。無料の「耳の実測」と Day 1-3 は今すぐ試せます。
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{
            background: CREAM, minHeight: '100vh', color: INK, overflowX: 'hidden',
            fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif',
        }}>
            {/* ============ HERO ============ */}
            <section style={{
                background: `radial-gradient(1100px 460px at 50% -12%, #FBF4DD, ${CREAM})`,
                padding: isMobile ? '46px 0 34px' : '86px 0 58px', textAlign: 'center',
            }}>
                <div style={{ maxWidth: '880px', margin: '0 auto', padding: pad }}>
                    <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: '9px', marginBottom: '22px' }}>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '32px', fontWeight: 900, color: GOLD, letterSpacing: '1px' }}>RAW</span>
                        <span style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '26px' : '32px', fontWeight: 900, letterSpacing: '1px' }}>PASS</span>
                        <span style={{ fontSize: '10px', fontWeight: 900, color: '#fff', background: INK, padding: '3px 8px', borderRadius: '5px', letterSpacing: '1px' }}>リスニング30日</span>
                    </div>

                    <h1 style={{ fontFamily: SERIF, fontSize: isMobile ? '29px' : '48px', fontWeight: 900, lineHeight: 1.32, margin: '0 0 20px', letterSpacing: '0.5px' }}>
                        TOEICのリスニングを、<br />
                        <span style={{ color: DEEPGOLD }}>TOEICで勉強するのをやめる。</span>
                    </h1>

                    <p style={{ fontSize: isMobile ? '14.5px' : '17px', color: '#44403C', lineHeight: 2.05, maxWidth: '660px', margin: '0 auto 16px' }}>
                        試験音声は、台本があり、言い直しがなく、被せがなく、スタジオ収録で、話者が一度に1人です。
                        <b style={{ color: INK }}>世界で一番易しい英語</b>です。
                        だから教材にするのではなく、<b style={{ color: INK }}>準備運動として10日で使い切って、生の英語に出ます。</b>
                    </p>
                    <p style={{ fontSize: isMobile ? '13.5px' : '15.5px', color: INK, fontWeight: 800, lineHeight: 1.95, maxWidth: '620px', margin: '0 auto 30px' }}>
                        30日後、試験音声はスローモーションに聞こえます。<br />それが目的ではなく、副産物です。
                    </p>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '26px' }}>
                        <Link href="/english/rawpass/ear" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: INK, color: '#fff', padding: isMobile ? '16px 26px' : '18px 34px',
                                borderRadius: '13px', fontSize: isMobile ? '15px' : '16.5px', fontWeight: 900,
                            }}>
                                まず耳を測る(無料・5分)
                            </div>
                        </Link>
                        <Link href="/english/rawpass/day/1" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: '#fff', border: `1px solid ${LINE}`, color: INK,
                                padding: isMobile ? '16px 26px' : '18px 34px',
                                borderRadius: '13px', fontSize: isMobile ? '15px' : '16.5px', fontWeight: 900,
                            }}>
                                Day 1 を試す
                            </div>
                        </Link>
                    </div>

                    <div style={{ display: 'flex', gap: isMobile ? '7px' : '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {['難易度10段', '30日', '実在音源10本', '試験問題の転載ゼロ', '返金保証つき'].map(b => (
                            <span key={b} style={{ fontSize: '11.5px', fontWeight: 700, color: DEEPGOLD, background: '#FEF9E7', border: `1px solid ${GOLD}44`, padding: '6px 12px', borderRadius: '99px' }}>{b}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============ STATS ============ */}
            <section style={{ background: INK, color: '#fff', padding: isMobile ? '26px 0' : '32px 0' }}>
                <div style={{
                    maxWidth: '960px', margin: '0 auto', padding: pad,
                    display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '22px 12px' : '16px',
                }}>
                    {[
                        { n: '10〜20文', u: '速い音声への適応が始まる量' },
                        { n: '116語/分', u: '大規模英語試験の聴解音声の実測例' },
                        { n: '150語/分+', u: '英語圏の日常会話' },
                        { n: '10段', u: '試験音声から生音までの刻み' },
                    ].map(s => (
                        <div key={s.u} style={{ textAlign: 'center' }}>
                            <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '25px' : '31px', fontWeight: 900, color: GOLD, letterSpacing: '-0.5px' }}>{s.n}</div>
                            <div style={{ fontSize: '11px', opacity: 0.72, marginTop: '5px', lineHeight: 1.6 }}>{s.u}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ 問題 ============ */}
            <section style={sec}>
                <Eyebrow>WHY IT NEVER WORKS</Eyebrow>
                <H>聞けないままの人は、<br />2つのうちどちらかをやっています。</H>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginTop: '26px' }}>
                    {[
                        {
                            t: '失敗1: 試験音声だけで練習する',
                            b: '公式問題集を何周もして、点は少し上がります。でも試験音声は台本つきの一番易しい英語なので、そこで満点を取っても、YouTubeを開いた瞬間に何も分かりません。プールの浅い所で泳ぎ続けても、海には出られない。',
                        },
                        {
                            t: '失敗2: いきなり生音に浸かる',
                            b: '「洋画・海外ドラマ・ポッドキャストで耳を作る」。3日で心が折れます。しかもこれは根性の問題ではありません。易しい条件から段階的に上げた群のほうが速い音声の学習が進んだ、という研究があります。順番を間違えると、時間をかけても伸びない。',
                        },
                    ].map(c => (
                        <div key={c.t} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: isMobile ? '22px 20px' : '28px 26px' }}>
                            <div style={{ fontSize: isMobile ? '15.5px' : '17px', fontWeight: 900, marginBottom: '12px', lineHeight: 1.5 }}>{c.t}</div>
                            <div style={{ fontSize: '13.5px', lineHeight: 2.05, color: SUB }}>{c.b}</div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '24px', background: '#FEF9E7', border: `1px solid ${GOLD}55`, borderRadius: '16px', padding: isMobile ? '20px 20px' : '26px 28px' }}>
                    <div style={{ fontSize: isMobile ? '15px' : '17px', fontWeight: 900, lineHeight: 1.75 }}>
                        RAW PASS は、試験音声を<span style={{ color: DEEPGOLD }}>「教材」ではなく「一番浅い所」</span>として扱います。
                        10日で使い切って、そこから速度と雑音を上げ、20日目で生音に出ます。
                    </div>
                </div>
            </section>

            {/* ============ 10段 ============ */}
            <section style={sec}>
                <Eyebrow>THE RAMP</Eyebrow>
                <H>商品の中身は、この10段です。</H>
                <P>
                    上げる要素は2つだけ。<b>速度</b>と<b>雑音</b>。内容は変えません。同じ英文が、聞こえなくなるまで環境だけ変わっていきます。
                    Lv.8で生の話し言葉に切り替わりますが、そこで<b>速度は1.0に戻します</b>。台本のない英語は、遅くても十分にきついからです。
                </P>
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', overflow: 'hidden' }}>
                    {RAMP.map(r => (
                        <div key={r.lv} style={{
                            display: 'flex', gap: '14px', alignItems: 'center',
                            padding: isMobile ? '13px 15px' : '15px 22px',
                            borderBottom: `1px solid ${LINE}`,
                            background: r.band === 'raw' ? '#F5FDF9' : '#fff',
                        }}>
                            <div style={{
                                flexShrink: 0, width: '36px', height: '36px', borderRadius: '10px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '13px', fontWeight: 900, color: '#fff',
                                background: r.band === 'raw' ? GREEN : GOLD,
                            }}>{r.lv}</div>
                            <div style={{ minWidth: 0, flex: 1 }}>
                                <div style={{ fontSize: isMobile ? '13.5px' : '14.5px', fontWeight: 800 }}>{r.label}</div>
                                <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.7, marginTop: '2px' }}>{r.feel}</div>
                            </div>
                            <div style={{ flexShrink: 0, textAlign: 'right', fontSize: '11.5px', color: SUB, fontWeight: 700, lineHeight: 1.6 }}>
                                {r.rate.toFixed(2)}倍<br />雑音 {noiseDial(r.noise)}/5
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '14px', fontSize: '12px', color: SUB, lineHeight: 1.9 }}>
                    雑音は、人の話し声のざわめきを合成して音声と同時に鳴らしています。デシベル表記はしません。端末の音量で実際の比率が変わるので、測れない数字を書かないためです。
                </div>
            </section>

            {/* ============ 根拠 ============ */}
            <section style={sec}>
                <Eyebrow>EVIDENCE</Eyebrow>
                <H>この設計に根拠があります。</H>
                <P>
                    体験談ではなく、査読された研究から取っています。都合のいい数字は作りません。
                    <b>数値を確認できなかったものは「確認できていない」と書いてあります。</b>
                </P>
                {PAPERS.map(p => (
                    <div key={p.claim} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: isMobile ? '20px 18px' : '26px 28px', marginBottom: '14px' }}>
                        <div style={{ display: 'inline-block', fontSize: '10.5px', fontWeight: 900, color: '#fff', background: DEEPGOLD, padding: '4px 10px', borderRadius: '99px', letterSpacing: '1px', marginBottom: '13px' }}>{p.tag}</div>
                        <div style={{ fontSize: isMobile ? '15px' : '16.5px', fontWeight: 900, lineHeight: 1.7, marginBottom: '11px' }}>{p.claim}</div>
                        <div style={{ fontSize: '13.5px', lineHeight: 2.05, color: SUB, marginBottom: '13px' }}>{p.detail}</div>
                        <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                            display: 'block', fontSize: '11.5px', color: SUB, lineHeight: 1.75,
                            paddingTop: '12px', borderTop: `1px dashed ${LINE}`, textDecoration: 'none',
                        }}>
                            {p.cite}
                        </a>
                    </div>
                ))}
            </section>

            {/* ============ 30日 ============ */}
            <section style={sec}>
                <Eyebrow>30 DAYS</Eyebrow>
                <H>30日の地図。</H>
                {PHASES.map(p => (
                    <div key={p.n} style={{
                        background: '#fff', border: `1px solid ${p.n === 3 ? `${GREEN}55` : LINE}`,
                        borderRadius: '18px', padding: isMobile ? '22px 20px' : '28px 28px', marginBottom: '14px',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2.5px', color: p.n === 3 ? GREEN : DEEPGOLD }}>PHASE {p.n}</span>
                            <span style={{ fontSize: '12px', color: SUB, fontWeight: 700 }}>{p.days}</span>
                            <span style={{ fontSize: isMobile ? '15px' : '17px', fontWeight: 900 }}>{p.name}</span>
                        </div>
                        <div style={{ fontFamily: SERIF, fontSize: isMobile ? '17px' : '20px', fontWeight: 900, lineHeight: 1.6, marginBottom: '11px' }}>{p.head}</div>
                        <div style={{ fontSize: '13.5px', lineHeight: 2.05, color: SUB }}>{p.body}</div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '15px' }}>
                            {RAWPASS_DAYS.filter(d => d.phase === p.n).map(d => (
                                <span key={d.day} style={{
                                    fontSize: '11px', fontWeight: 800, color: SUB,
                                    background: '#FAFAF9', border: `1px solid ${LINE}`,
                                    padding: '5px 9px', borderRadius: '7px',
                                }}>
                                    {d.day}. {d.title.length > 22 ? `${d.title.slice(0, 22)}…` : d.title}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                <div style={{ background: INK, color: '#fff', borderRadius: '18px', padding: isMobile ? '24px 20px' : '30px 28px', marginTop: '6px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2.5px', color: GOLD, marginBottom: '11px' }}>DAY 30</div>
                    <div style={{ fontFamily: SERIF, fontSize: isMobile ? '19px' : '23px', fontWeight: 900, lineHeight: 1.6, marginBottom: '12px' }}>
                        生音を1本潰した直後に、Day 1 と同じ音声を聞きます。
                    </div>
                    <div style={{ fontSize: '13.5px', lineHeight: 2.05, opacity: 0.82 }}>
                        1文字も違わない、同じ6文、同じ設定。30日前の自分のスコアが隣に並びます。
                        これが「効いたかどうか」の唯一の証拠で、同時に返金の判定でもあります。
                    </div>
                </div>
            </section>

            {/* ============ 約束しないこと ============ */}
            <section style={sec}>
                <Eyebrow>WHAT THIS IS NOT</Eyebrow>
                <H>約束しないことを、先に書きます。</H>
                <P>ここを曖昧にする教材は、だいたい中身がありません。</P>
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', overflow: 'hidden' }}>
                    {[
                        ['TOEICが何点上がるか', '言いません。試験の点はリーディング・当日の体力・問題の相性にも左右されます。こちらが測れるのは「同じ音声を同じ設定で聞いた時の一致率」だけで、約束もそこに限ります。'],
                        ['30日で英語が話せるようになる', 'なりません。これは聞く訓練だけです。書き取りはしますが、発話の練習は入っていません。'],
                        ['聞き流すだけで身につく', 'つきません。毎日、聞いて、打って、赤字になった語を見る作業です。Phase 3 は1日30分以上かかります。'],
                        ['過去問の音声が入っている', '入っていません。試験パートの英文は全て自作です。実在音源は公開されているYouTubeクリップの埋め込みだけを使います。'],
                        ['誰にでも合う', '合いません。単語の在庫が極端に少ない人は、まず語彙を入れたほうが速い。無料の実測でLv.1判定が出た人には、その旨が表示されます。'],
                    ].map(([t, b]) => (
                        <div key={t} style={{ padding: isMobile ? '18px 18px' : '22px 26px', borderBottom: `1px solid ${LINE}` }}>
                            <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 900, marginBottom: '8px' }}>
                                <span style={{ color: '#DC2626', marginRight: '9px' }}>×</span>{t}
                            </div>
                            <div style={{ fontSize: '13px', lineHeight: 2, color: SUB, paddingLeft: '22px' }}>{b}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ 価格 ============ */}
            <section style={sec}>
                <Eyebrow>PRICE</Eyebrow>
                <H>{PRICE.mainLabel}。買い切りです。</H>
                <div style={{
                    background: '#fff', border: `2px solid ${GOLD}`, borderRadius: '22px',
                    padding: isMobile ? '30px 22px' : '42px 34px', textAlign: 'center', marginBottom: '18px',
                }}>
                    <div style={{ fontFamily: 'Georgia, serif', fontSize: isMobile ? '46px' : '62px', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1 }}>
                        {PRICE.mainLabel}
                    </div>
                    <div style={{ fontSize: '13px', color: SUB, fontWeight: 700, margin: '12px 0 26px' }}>{PRICE.mainNote}</div>
                    <div style={{ maxWidth: '420px', margin: '0 auto' }}><Buy /></div>
                    <div style={{ fontSize: '12px', color: SUB, marginTop: '20px', lineHeight: 1.95 }}>
                        30日を終えた人だけ、毎朝の生音配給({PRICE.subLabel})を選べます。<br />必須ではありません。買い切りだけで完結します。
                    </div>
                </div>

                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', overflow: 'hidden' }}>
                    {PRICE.compare.map(c => (
                        <div key={c.name} style={{
                            display: 'flex', gap: '12px', alignItems: isMobile ? 'flex-start' : 'center',
                            flexDirection: isMobile ? 'column' : 'row',
                            padding: isMobile ? '16px 18px' : '18px 24px', borderBottom: `1px solid ${LINE}`,
                            background: c.me ? '#FEF9E7' : '#fff',
                        }}>
                            <div style={{ flex: isMobile ? undefined : '0 0 190px', fontSize: '13.5px', fontWeight: c.me ? 900 : 800, color: c.me ? DEEPGOLD : INK }}>{c.name}</div>
                            <div style={{ flex: isMobile ? undefined : '0 0 130px', fontSize: '13px', fontWeight: 800, color: SUB }}>{c.price}</div>
                            <div style={{ flex: 1, fontSize: '12.5px', color: SUB, lineHeight: 1.8 }}>{c.note}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ============ 保証 ============ */}
            <section style={sec}>
                <div style={{
                    background: `linear-gradient(135deg, #F5FDF9, #FFFFFF)`, border: `2px solid ${GREEN}`,
                    borderRadius: '22px', padding: isMobile ? '28px 22px' : '40px 34px',
                }}>
                    <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '3px', color: GREEN, marginBottom: '14px' }}>GUARANTEE</div>
                    <div style={{ fontFamily: SERIF, fontSize: isMobile ? '22px' : '28px', fontWeight: 900, lineHeight: 1.5, marginBottom: '16px' }}>
                        上がらなかったら、全額返します。
                    </div>
                    <div style={{ fontSize: isMobile ? '13.5px' : '15px', lineHeight: 2.1, color: '#44403C' }}>{GUARANTEE}</div>
                </div>
            </section>

            {/* ============ FAQ ============ */}
            <section style={sec}>
                <Eyebrow>FAQ</Eyebrow>
                <H>よくある質問</H>
                {FAQ.map(([q, a]) => (
                    <div key={q} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: isMobile ? '18px 18px' : '22px 26px', marginBottom: '11px' }}>
                        <div style={{ fontSize: isMobile ? '14px' : '15px', fontWeight: 900, marginBottom: '9px' }}>
                            <span style={{ color: GOLD, marginRight: '10px' }}>Q</span>{q}
                        </div>
                        <div style={{ fontSize: '13px', lineHeight: 2.05, color: SUB, paddingLeft: '24px' }}>{a}</div>
                    </div>
                ))}
            </section>

            {/* ============ 最終CTA ============ */}
            <section style={{ ...sec, paddingBottom: isMobile ? '70px' : '100px' }}>
                <div style={{ background: INK, color: '#fff', borderRadius: '26px', padding: isMobile ? '40px 22px' : '62px 40px', textAlign: 'center' }}>
                    <div style={{ fontFamily: SERIF, fontSize: isMobile ? '24px' : '34px', fontWeight: 900, lineHeight: 1.45, marginBottom: '18px' }}>
                        英語でYouTubeが聞けると、<br />世界が変わります。
                    </div>
                    <p style={{ fontSize: isMobile ? '13.5px' : '15px', lineHeight: 2.1, opacity: 0.8, maxWidth: '560px', margin: '0 auto 30px' }}>
                        それは本当ですが、いきなり言われても手が出ません。だから最初の10日は、世界で一番易しい英語から始めます。
                        まず、自分が10段のどこにいるかを5分で測ってください。無料です。
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/english/rawpass/ear" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: `linear-gradient(135deg, ${GOLD}, #E6C75E)`, color: '#fff',
                                padding: isMobile ? '16px 28px' : '18px 38px', borderRadius: '13px',
                                fontSize: isMobile ? '15px' : '17px', fontWeight: 900,
                            }}>耳の実測(無料・5分)</div>
                        </Link>
                        <Link href="/english/rawpass/program" style={{ textDecoration: 'none' }}>
                            <div style={{
                                background: 'transparent', border: '1px solid rgba(255,255,255,0.35)', color: '#fff',
                                padding: isMobile ? '16px 28px' : '18px 38px', borderRadius: '13px',
                                fontSize: isMobile ? '15px' : '17px', fontWeight: 900,
                            }}>30日の中身を見る</div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
