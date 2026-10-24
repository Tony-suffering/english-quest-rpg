import Link from 'next/link';
import { curriculum } from '@/data/app-build/curriculum';

export const metadata = {
    title: 'とにおと英語アプリ作る部 | バイブコーディング教材',
    description:
        'コードを書いたことがない中年・非IT・副業手前向け。 8週間で「自分専用のAI連携英語学習アプリ」を deploy する完全初心者向け教材。',
};

export default function AppBuildPage() {
    return (
        <div style={{ maxWidth: '880px', margin: '0 auto', padding: '48px 24px 96px', fontFamily: 'system-ui, -apple-system, sans-serif', color: '#1a1a1a' }}>
            {/* Hero */}
            <section style={{ marginBottom: '64px' }}>
                <div style={{ fontSize: '12px', letterSpacing: '0.2em', color: '#D4AF37', fontWeight: 600, marginBottom: '12px' }}>
                    APP BUILD CLUB / アプリ作る部
                </div>
                <h1 style={{ fontSize: '42px', fontWeight: 800, lineHeight: 1.25, marginBottom: '24px', letterSpacing: '-0.01em' }}>
                    コードを書かないで、<br />
                    用語ゼロから、<br />
                    自分用の英語学習アプリを作る 8週間
                </h1>
                <p style={{ fontSize: '17px', lineHeight: 1.8, color: '#444', marginBottom: '32px' }}>
                    ChatGPT は使える。 でもコードは書けない。 スクール 170万は払えない。 まさおさんの動画は難しい。
                    そういう中年・非IT・副業手前の人が、用語の説明をひとつずつ受けながら、Lovable と Supabase と AI API を組み合わせて、自分用の英語学習アプリを 1個 deploy するまで。
                </p>
                <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#666', marginBottom: '32px', padding: '14px 18px', backgroundColor: '#FFF9E6', borderLeft: '3px solid #D4AF37', borderRadius: '4px' }}>
                    <strong style={{ color: '#1a1a1a' }}>この教材の作りで大事にしてること</strong><br />
                    各ステップに <strong>「なぜ」「やり方」「こうなれば成功」「詰まったら」</strong> を全部書く。 用語は毎週用語集で説明。 1週間で終わらなくていい、3週間でも 8ヶ月でもいい。 「分からない」を恥じない構造で作ってる。
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link
                        href="/english/app-build/start"
                        style={{
                            display: 'inline-block',
                            padding: '14px 28px',
                            backgroundColor: '#D4AF37',
                            color: '#1a1a1a',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 700,
                            textDecoration: 'none',
                            letterSpacing: '0.02em',
                        }}
                    >
                        まず「始める前に読む」を開く →
                    </Link>
                    <Link
                        href="/english/app-build/about"
                        style={{
                            display: 'inline-block',
                            padding: '14px 28px',
                            backgroundColor: '#fff',
                            color: '#1a1a1a',
                            border: '1px solid #1a1a1a',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: 600,
                            textDecoration: 'none',
                            letterSpacing: '0.02em',
                        }}
                    >
                        誰向け・価格・FAQ
                    </Link>
                    <Link
                        href="/english/app-build/week-1"
                        style={{
                            display: 'inline-block',
                            padding: '14px 28px',
                            backgroundColor: '#fff',
                            color: '#666',
                            border: '1px solid #E7E5E4',
                            borderRadius: '8px',
                            fontSize: '13px',
                            fontWeight: 500,
                            textDecoration: 'none',
                            letterSpacing: '0.02em',
                        }}
                    >
                        Week 1 に直行
                    </Link>
                </div>
            </section>

            {/* Why this matters - とにお voice */}
            <section style={{ marginBottom: '72px', padding: '32px', backgroundColor: '#FAFAF9', borderLeft: '3px solid #D4AF37', borderRadius: '4px' }}>
                <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#888', fontWeight: 600, marginBottom: '12px' }}>
                    とにおのひとこと
                </div>
                <p style={{ fontSize: '16px', lineHeight: 1.9, color: '#333', margin: 0 }}>
                    俺は英語ペラペラじゃない。 コーディングも独学。 でも 8週間で英語学習アプリ作って毎日使ってる。
                    これ「特別な才能の話」じゃなくて、Lovable に「作って」って言える人なら全員できる作業。
                    「コード書ける人」になる必要はない、「自分用のツール持ってる人」になればいい。 親戚の集まりで話すネタが変わる。 それだけで充分。
                </p>
            </section>

            {/* Target audience */}
            <section style={{ marginBottom: '72px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.01em' }}>
                    こういう人向け
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                    {[
                        'ChatGPT は使えるけど、自分のアプリは作れないと諦めてる',
                        'プログラミングスクール 170万円は払えない',
                        'Progate やドットインストールは退屈で続かなかった',
                        'まさおさんの YouTube は専門用語で何言ってるか分からない',
                        '40代・50代でも今から何か作れる人になりたい',
                        '副業で「自分の作品」を持ちたい (副業即お金じゃなく、作品)',
                    ].map((t, i) => (
                        <div
                            key={i}
                            style={{
                                padding: '20px',
                                backgroundColor: '#fff',
                                border: '1px solid #E7E5E4',
                                borderRadius: '12px',
                                fontSize: '14px',
                                lineHeight: 1.65,
                                color: '#333',
                            }}
                        >
                            {t}
                        </div>
                    ))}
                </div>
            </section>

            {/* Curriculum overview */}
            <section style={{ marginBottom: '72px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px', letterSpacing: '-0.01em' }}>
                    8週間のカリキュラム
                </h2>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '32px', lineHeight: 1.7 }}>
                    各週 2〜5時間。 通勤・夜・週末でも回せる量。 主軸ツールは Lovable (環境構築ゼロ、ブラウザだけで完結)。
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {curriculum.map((w) => (
                        <Link
                            key={w.slug}
                            href={`/english/app-build/${w.slug}`}
                            style={{
                                display: 'block',
                                padding: '24px',
                                backgroundColor: '#fff',
                                border: '1px solid #E7E5E4',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.15s ease',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                                <div
                                    style={{
                                        fontSize: '11px',
                                        letterSpacing: '0.15em',
                                        color: '#D4AF37',
                                        fontWeight: 700,
                                        minWidth: '60px',
                                    }}
                                >
                                    WEEK {w.number}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#1a1a1a', flex: 1 }}>
                                    {w.title}
                                </h3>
                            </div>
                            <p style={{ fontSize: '13px', color: '#666', margin: 0, marginLeft: '76px', lineHeight: 1.65 }}>
                                {w.subtitle} ・ {w.duration} ・ {w.tool}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Differentiation */}
            <section style={{ marginBottom: '72px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', letterSpacing: '-0.01em' }}>
                    他の教材と違う 3軸
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                        {
                            n: '01',
                            title: '完全ゼロ起点',
                            body: 'まさお (月9800円) は中級者向け、スクール (月数十万) はガチ転職勢向け。 ここは「コード触ったことゼロ」から始める。',
                        },
                        {
                            n: '02',
                            title: '英語学習アプリ作る、をテーマシリーズに',
                            body: '他の教材は「AI 活用全般」と広い。 ここは「英語学習アプリ作る」一点突破。 自分も英語学んでる人だから刺さる細部が出る。',
                        },
                        {
                            n: '03',
                            title: '恥とあきらめのダークユーモア voice',
                            body: 'プロエンジニアの解説じゃなく、「俺もここで詰まった、こうやり過ごした」型。 失敗を毎週見せる構造。',
                        },
                    ].map((item) => (
                        <div key={item.n} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div
                                style={{
                                    fontSize: '32px',
                                    fontWeight: 800,
                                    color: '#D4AF37',
                                    minWidth: '60px',
                                    lineHeight: 1,
                                }}
                            >
                                {item.n}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0', color: '#1a1a1a' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '14px', lineHeight: 1.75, color: '#555', margin: 0 }}>
                                    {item.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section
                style={{
                    padding: '40px 32px',
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    borderRadius: '16px',
                    textAlign: 'center',
                }}
            >
                <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.01em' }}>
                    Day 1 は 30分で「俺の URL」を持って帰る
                </h2>
                <p style={{ fontSize: '14px', color: '#bbb', marginBottom: '28px', lineHeight: 1.75 }}>
                    8週間後には「自作の AI 連携英語学習アプリ」が手元にある。 そこから先は自分の道。
                </p>
                <Link
                    href="/english/app-build/start"
                    style={{
                        display: 'inline-block',
                        padding: '14px 32px',
                        backgroundColor: '#D4AF37',
                        color: '#1a1a1a',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        letterSpacing: '0.02em',
                    }}
                >
                    始める前に読む →
                </Link>
            </section>
        </div>
    );
}
