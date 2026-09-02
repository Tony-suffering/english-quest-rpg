import Link from 'next/link';
import { T } from '@/data/stack/theme';
import { LESSONS, OUTLINE } from '@/data/stack/lessons';

export const metadata = {
    title: '作り直し版デモ | TONIO STACK',
    description: 'コードは1行も書かない。Claude Code に日本語で頼んで、自分だけの英語アプリを建てる全12回。',
};

export default function StackDemo() {
    return (
        <div style={{ backgroundColor: T.bg, minHeight: '100vh' }}>
            <div style={{ maxWidth: 780, margin: '0 auto', padding: '36px 20px 64px' }}>

                <div style={{
                    display: 'inline-block', fontSize: 10.5, fontWeight: 800, letterSpacing: '0.12em',
                    color: '#9A3412', backgroundColor: '#FFF7ED', border: '1px solid #FDBA74',
                    borderRadius: 999, padding: '4px 12px', marginBottom: 16,
                }}>
                    作り直し版 ・ デモ
                </div>

                <h1 style={{ fontSize: 29, fontWeight: 900, lineHeight: 1.4, letterSpacing: '-0.02em', margin: '0 0 16px', color: T.text }}>
                    コードは1行も書かない。
                    <br />
                    全部、日本語で頼む。
                </h1>

                <div style={{ fontSize: 15, color: T.textSub, lineHeight: 1.95 }}>
                    <p style={{ margin: '0 0 13px' }}>
                        自分専用の英語アプリを作る。ただし、あなたはコードを書かない。書くのは Claude Code だ。
                        あなたがやるのは、欲しいものを日本語で言うことと、出てきたものを見て「違う」と言うこと。それだけ。
                    </p>
                    <p style={{ margin: '0 0 13px' }}>
                        だからこの教材に載っているのは、コードじゃなくて<b style={{ color: T.text }}>「なんて言うか」</b>だ。
                        全部そのままコピーして貼れる。貼れば動く。
                    </p>
                    <p style={{ margin: 0 }}>
                        1回30分。全12回。終わると、自分の詰まった英語だけが貯まっていく箱が手元に残る。
                    </p>
                </div>

                {/* 5つの箱の説明 */}
                <section style={{
                    marginTop: 30, backgroundColor: T.surface, border: `1px solid ${T.border}`,
                    borderRadius: T.radius, padding: '18px 20px',
                }}>
                    <h2 style={{ fontSize: 14.5, fontWeight: 900, margin: '0 0 4px', color: T.text }}>
                        本文に出てくる箱は5種類だけ
                    </h2>
                    <p style={{ margin: '0 0 14px', fontSize: 12.5, color: T.textMuted, lineHeight: 1.8 }}>
                        色を見れば、自分が手を動かすのか、ただ見ていればいいのかが分かる。
                    </p>
                    <div style={{ display: 'grid', gap: 9 }}>
                        {[
                            ['Claude Code にこう言う', '#166534', '#F0FDF4', '#86EFAC', 'コピーして貼るだけ。ほとんどがこれ'],
                            ['黒い画面にこれを打つ', '#1E293B', '#F1F5F9', '#CBD5E1', '第1回にしか出てこない'],
                            ['自分の手でやる', '#9A3412', '#FFF7ED', '#FDBA74', 'アカウント作成など。代われない部分'],
                            ['こうなったら成功', '#57534E', '#FFFFFF', '#E7E5E4', '見ているだけでいい'],
                            ['確かめること', '#92700F', '#FFFBEB', '#FCD34D', '1手順につき1つだけ'],
                        ].map(([label, color, bg, border, desc]) => (
                            <div key={label} style={{ display: 'flex', gap: 11, alignItems: 'center', flexWrap: 'wrap' }}>
                                <span style={{
                                    fontSize: 10.5, fontWeight: 800, color, backgroundColor: bg,
                                    border: `1px solid ${border}`, borderLeft: `3px solid ${color}`,
                                    borderRadius: 6, padding: '4px 10px', whiteSpace: 'nowrap',
                                }}>
                                    {label}
                                </span>
                                <span style={{ fontSize: 12.5, color: T.textSub, flex: 1, minWidth: 170 }}>{desc}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* いま読める回 */}
                <h2 style={{ fontSize: 17, fontWeight: 900, margin: '34px 0 4px', color: T.text }}>
                    いま読めるのは2回分
                </h2>
                <p style={{ margin: '0 0 14px', fontSize: 13, color: T.textMuted, lineHeight: 1.8 }}>
                    この2回を実際にやってみて、通じるかどうかを見てほしい。形が良ければ残り10回を同じ書き方で書く。
                </p>

                <div style={{ display: 'grid', gap: 10 }}>
                    {LESSONS.map(l => (
                        <Link
                            key={l.slug}
                            href={`/english/stack/demo/${l.slug}`}
                            style={{
                                display: 'block', textDecoration: 'none', color: 'inherit',
                                backgroundColor: T.surface, border: `1px solid ${T.border}`,
                                borderLeft: `4px solid ${T.gold}`,
                                borderRadius: T.radius, padding: '16px 18px',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 11.5, fontWeight: 900, color: T.gold }}>第{l.no}回</span>
                                <span style={{ fontSize: 16.5, fontWeight: 900, flex: 1, minWidth: 190, color: T.text }}>{l.title}</span>
                                <span style={{ fontSize: 11, color: T.textMuted, whiteSpace: 'nowrap' }}>{l.time}</span>
                            </div>
                            <p style={{ margin: '0 0 8px', fontSize: 13.5, color: T.textSub, lineHeight: 1.8 }}>{l.goal}</p>
                            <div style={{ fontSize: 11.5, color: T.textMuted }}>手元に残る: {l.result}</div>
                        </Link>
                    ))}
                </div>

                {/* これから書く回 */}
                <h2 style={{ fontSize: 17, fontWeight: 900, margin: '32px 0 4px', color: T.text }}>
                    このあとの10回
                </h2>
                <p style={{ margin: '0 0 14px', fontSize: 13, color: T.textMuted, lineHeight: 1.8 }}>
                    まだ書いていない。順番だけ決めてある。
                </p>
                <div style={{
                    backgroundColor: T.surface, border: `1px solid ${T.border}`,
                    borderRadius: T.radius, padding: '6px 18px',
                }}>
                    {OUTLINE.map((o, i) => (
                        <div key={o.no} style={{
                            display: 'flex', gap: 12, padding: '11px 0', alignItems: 'baseline', flexWrap: 'wrap',
                            borderTop: i === 0 ? 'none' : `1px solid ${T.border}`,
                        }}>
                            <span style={{ fontSize: 11, fontWeight: 900, color: T.textMuted, minWidth: 30 }}>
                                第{o.no}回
                            </span>
                            <span style={{ fontSize: 14, fontWeight: 800, color: T.text, minWidth: 160 }}>{o.title}</span>
                            <span style={{ fontSize: 12.5, color: T.textSub, flex: 1, minWidth: 190 }}>{o.lead}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 30, textAlign: 'center' }}>
                    <Link
                        href={`/english/stack/demo/${LESSONS[0].slug}`}
                        style={{
                            display: 'inline-block', padding: '13px 30px', borderRadius: 999,
                            backgroundColor: T.gold, color: '#FFF', fontWeight: 800, fontSize: 14.5,
                            textDecoration: 'none',
                        }}
                    >
                        第1回をやってみる
                    </Link>
                </div>

                <div style={{ marginTop: 24, textAlign: 'center' }}>
                    <Link href="/english/stack" style={{ fontSize: 12, color: T.textMuted, textDecoration: 'none' }}>
                        旧版（自分でコードを書く版）を見る
                    </Link>
                </div>
            </div>
        </div>
    );
}
