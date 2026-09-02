import Link from 'next/link';
import { T } from '@/data/stack/theme';
import { CHAPTERS } from '@/data/stack/chapters';
import { ChapterCard } from '@/components/stack/ChapterCard';

export const metadata = {
    title: 'TONIO STACK — 自分専用の英語アプリを、自分で建てる',
    description: '毎日回している本物のスタック (Next.js + Cloudflare D1 + Vercel) で、自分だけの英語アプリを建てる全10章。',
};

export default function StackHome() {
    return (
        <div style={{ backgroundColor: T.bg, minHeight: '100vh' }}>
            <div style={{ maxWidth: 860, margin: '0 auto', padding: '40px 20px 64px' }}>
                <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.16em', color: T.gold, margin: '0 0 12px' }}>
                    TONIO STACK ・ 全10章
                </p>

                <h1 style={{ fontSize: 30, fontWeight: 900, lineHeight: 1.35, letterSpacing: '-0.02em', margin: '0 0 18px', color: T.text }}>
                    自分専用の英語アプリを、
                    <br />
                    自分で建てる
                </h1>

                <div style={{ fontSize: 15, color: T.textSub, maxWidth: 640, lineHeight: 1.95 }}>
                    <p style={{ margin: '0 0 13px' }}>
                        英語アプリは山ほどある。金を払えば明日から使える。それでも自分で建てる理由は一つで、
                        市販のアプリは「自分がどこで詰まったか」を持っていないからだ。
                    </p>
                    <p style={{ margin: '0 0 13px' }}>
                        自分で建てると、詰まった場所がそのまま資産になる。データベースに1行入る。
                        1年経つと1万行になっている。ここまで来ると、それは英語アプリじゃなくて自分のカルテだ。
                    </p>
                    <p style={{ margin: 0 }}>
                        この教材は、実際に毎日動かしているアプリのコードをそのまま使う。
                        作った風のサンプルは1つも載せない。
                    </p>
                </div>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: 12, margin: '30px 0 34px',
                }}>
                    {[
                        { v: '10', l: '章', s: '読むだけで終わらせない' },
                        { v: '3', l: '部品', s: '画面 / 配管 / 保管庫' },
                        { v: '0', l: '円', s: '完走まで無料枠で足りる' },
                    ].map(x => (
                        <div key={x.l} style={{
                            backgroundColor: T.surface, border: `1px solid ${T.border}`,
                            borderRadius: T.radius, padding: '14px 16px', boxShadow: T.shadow,
                        }}>
                            <div style={{ fontSize: 25, fontWeight: 900, color: T.gold, lineHeight: 1.2 }}>
                                {x.v}
                                <span style={{ fontSize: 13, color: T.text, marginLeft: 4 }}>{x.l}</span>
                            </div>
                            <div style={{ fontSize: 11.5, color: T.textMuted }}>{x.s}</div>
                        </div>
                    ))}
                </div>

                {/* 使う道具 */}
                <section style={{
                    backgroundColor: T.surface, border: `1px solid ${T.border}`,
                    borderRadius: T.radius, padding: '18px 20px', marginBottom: 34, boxShadow: T.shadow,
                }}>
                    <h2 style={{ fontSize: 14.5, fontWeight: 900, margin: '0 0 4px', color: T.text }}>使う道具は5つだけ</h2>
                    <p style={{ margin: '0 0 12px', fontSize: 12.5, color: T.textMuted, lineHeight: 1.8 }}>
                        全部、完走まで無料枠で足りる。ノーコードの道具は使わない。データが自分のものにならないから。
                    </p>
                    <div style={{ display: 'grid', gap: 8 }}>
                        {[
                            ['Next.js', '画面と配管を1つのフォルダで書く'],
                            ['Cloudflare D1', 'データの保管庫。SQL がそのまま書ける'],
                            ['Vercel', '世に出すところ。push すると勝手に更新される'],
                            ['GitHub', 'コードの置き場。パソコンが壊れても残る'],
                            ['TypeScript', '列名のタイプミスをエディタが止める'],
                        ].map(([n, d]) => (
                            <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: 13.5, fontWeight: 800, minWidth: 118, color: T.text }}>{n}</span>
                                <span style={{ fontSize: 12.5, color: T.textSub, flex: 1 }}>{d}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <h2 style={{ fontSize: 18, fontWeight: 900, margin: '0 0 4px', color: T.text }}>全10章</h2>
                <p style={{ margin: '0 0 16px', fontSize: 13, color: T.textMuted }}>
                    上から順にやる。飛ばすと後ろで必ず戻される。
                </p>

                <div style={{ display: 'grid', gap: 10 }}>
                    {CHAPTERS.map(c => (
                        <ChapterCard key={c.slug} c={c} />
                    ))}
                </div>

                <div style={{ marginTop: 28, textAlign: 'center' }}>
                    <Link
                        href={`/english/stack/${CHAPTERS[0].slug}`}
                        style={{
                            display: 'inline-block', padding: '13px 30px', borderRadius: 999,
                            backgroundColor: T.gold, color: '#FFF', fontWeight: 800, fontSize: 14.5,
                            textDecoration: 'none', boxShadow: '0 2px 10px rgba(212,175,55,0.35)',
                        }}
                    >
                        第1章から読む
                    </Link>
                </div>

                <div style={{ marginTop: 26, textAlign: 'center' }}>
                    <Link href="/english/home" style={{ fontSize: 12.5, color: T.textMuted, textDecoration: 'none' }}>
                        英語の玄関に戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
