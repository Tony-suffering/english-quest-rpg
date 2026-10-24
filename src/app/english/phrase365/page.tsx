/**
 * フレーズ貯金 (仮称) -- 商品LP。
 *
 * コンセプト: 1年後に英語が話せるようになる。そのあとも自分の財産(フレーズ)が
 * 一生増え続ける。復習と追加が終わらない「英語の貯金」。
 *
 * 方針:
 *  - 嘘をつかない。「ペラペラ」「聞き流すだけ」は約束しない。
 *    約束するのは「続く仕組み」と「1年で1,095個の自分の言葉」だけ。
 *  - 間口は全日本人。専門用語なし、貯金のメタファーで通す。
 *  - 併用前提 (1日3分)。他の教材と戦わない。
 *  - 画面イメージは実際に開発者が365日使っているトレーニング画面がベース。
 *
 * CTA は仮で mailto。公開前にフォーム / LINE 登録に差し替えること。
 * 商品名「フレーズ貯金」も仮。決まったらここと metadata を差し替え。
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'フレーズ貯金 | 1日3フレーズ、1年後、英語はあなたの財産になる',
    description: '毎日3フレーズ、3分だけ。1年で1,095個の「自分の言葉」が貯まる英語の貯金アプリ。復習と追加は一生続く。',
    robots: { index: false, follow: false }, // 公開判断まで noindex (middleware と二重)
};

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#57534E';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';

const REGISTER_HREF = 'mailto:sinnurawase@gmail.com?subject=%E3%83%95%E3%83%AC%E3%83%BC%E3%82%BA%E8%B2%AF%E9%87%91%20%E5%85%88%E8%A1%8C%E7%99%BB%E9%8C%B2'; // TODO差し替え不可ルール対象外: 動作する仮CTA。公開前にフォームへ

/* ---------------- 小物 ---------------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ fontSize: '12px', fontWeight: 800, color: DEEPGOLD, letterSpacing: '3px', marginBottom: '14px' }}>
            {children}
        </div>
    );
}

function CtaButton({ primary, href, children }: { primary?: boolean; href: string; children: React.ReactNode }) {
    return (
        <a href={href} className={primary ? 'p365-cta' : 'p365-cta-ghost'}
            style={{
                display: 'inline-block', textDecoration: 'none', textAlign: 'center',
                padding: '15px 34px', borderRadius: '14px', fontSize: '15px', fontWeight: 800, letterSpacing: '0.5px',
                background: primary ? INK : '#fff',
                color: primary ? '#fff' : INK,
                border: primary ? `1px solid ${INK}` : `1px solid ${LINE}`,
                boxShadow: primary ? '0 6px 24px rgba(28,25,23,0.18)' : '0 2px 10px rgba(28,25,23,0.05)',
                transition: 'transform 0.12s, box-shadow 0.12s',
            }}>
            {children}
        </a>
    );
}

/** アプリ画面イメージ: 積み立てカレンダー */
function CalendarMock() {
    // 18日目まで貯めた月のイメージ。数字は累計フレーズ数
    const days: (number | '+3' | null)[] = [
        null, null, null, 3, 6, 9, 12,
        15, 18, 21, 24, 27, 30, 33,
        36, 39, 42, 45, 48, 51, '+3',
        null, null, null, null, null, null, null,
    ];
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '20px', padding: '22px 20px', boxShadow: '0 10px 40px rgba(28,25,23,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: INK, letterSpacing: '1px' }}>2027.01</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: DEEPGOLD }}>今月の積み立て 54 フレーズ</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                {['日', '月', '火', '水', '木', '金', '土'].map(d => (
                    <div key={d} style={{ textAlign: 'center', fontSize: '10px', fontWeight: 700, color: FAINT, padding: '2px 0' }}>{d}</div>
                ))}
                {days.map((v, i) => {
                    const today = v === '+3';
                    const filled = typeof v === 'number';
                    const depth = filled ? Math.min(1, (v as number) / 54) : 0;
                    return (
                        <div key={i} style={{
                            aspectRatio: '1', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '11px', fontWeight: 800,
                            background: today ? INK : filled ? `rgba(212,175,55,${0.10 + depth * 0.38})` : '#FAFAF9',
                            border: today ? `1px solid ${INK}` : `1px solid ${filled ? 'rgba(212,175,55,0.35)' : LINE}`,
                            color: today ? GOLD : filled ? DEEPGOLD : '#D6D3D1',
                        }}>
                            {today ? '+3' : filled ? v : ''}
                        </div>
                    );
                })}
            </div>
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: `1px dashed ${LINE}`, display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: SUB }}>
                <span>総資産 <b style={{ color: INK, fontSize: '14px' }}>642</b> フレーズ</span>
                <span>連続 <b style={{ color: DEEPGREEN, fontSize: '14px' }}>128</b> 日</span>
            </div>
        </div>
    );
}

/** アプリ画面イメージ: きょうの1枚 */
function CardMock() {
    return (
        <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '20px', padding: '24px 22px', boxShadow: '0 10px 40px rgba(28,25,23,0.07)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#fff', background: GREEN, borderRadius: '5px', padding: '3px 9px', letterSpacing: '1px' }}>きょうの1枚</span>
                <span style={{ fontSize: '11px', color: FAINT, fontWeight: 700 }}>2 / 3</span>
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '23px', fontWeight: 700, color: INK, lineHeight: 1.35, marginBottom: '10px' }}>
                We don&apos;t have all day.
            </div>
            <div style={{ fontSize: '12.5px', lineHeight: 1.8, color: SUB, marginBottom: '20px' }}>
                「いつまでかかってんだ」の定番。列が進まない時、会議が長い時にドンピシャ。
                黙って待つ代わりに、これをサラッと言えると空気が動く。
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                <span style={{ flex: 1, textAlign: 'center', padding: '11px 0', borderRadius: '11px', background: GREEN, color: '#fff', fontSize: '13px', fontWeight: 800 }}>言えた</span>
                <span style={{ flex: 1, textAlign: 'center', padding: '11px 0', borderRadius: '11px', background: '#fff', border: `1px solid ${LINE}`, color: SUB, fontSize: '13px', fontWeight: 800 }}>まだ</span>
            </div>
            <div style={{ marginTop: '12px', fontSize: '10.5px', color: FAINT, textAlign: 'center' }}>
                「まだ」のカードだけ、忘れた頃にまた出てきます
            </div>
        </div>
    );
}

/* ---------------- ページ ---------------- */

export default function Phrase365LandingPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', color: INK, fontFamily: '-apple-system, "Hiragino Kaku Gothic ProN", "Yu Gothic", Meiryo, sans-serif' }}>
            <style>{`
                .p365-cta:hover { transform: translateY(-1px); box-shadow: 0 10px 30px rgba(28,25,23,0.24); }
                .p365-cta-ghost:hover { transform: translateY(-1px); }
                .p365-g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 26px; }
                .p365-g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
                @media (max-width: 760px) {
                    .p365-g2, .p365-g3 { grid-template-columns: 1fr; }
                    .p365-hero-h1 { font-size: 34px !important; }
                }
            `}</style>

            {/* ===== ヘッダー ===== */}
            <header style={{ maxWidth: '1040px', margin: '0 auto', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '17px', fontWeight: 900, letterSpacing: '1px' }}>
                    フレーズ<span style={{ color: DEEPGOLD }}>貯金</span>
                    <span style={{ fontSize: '10px', fontWeight: 700, color: FAINT, marginLeft: '8px', letterSpacing: '2px' }}>PHRASE SAVINGS</span>
                </div>
                <a href="#register" style={{ fontSize: '13px', fontWeight: 800, color: INK, textDecoration: 'none', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '9px 18px', background: '#fff' }}>
                    先行登録
                </a>
            </header>

            {/* ===== ヒーロー ===== */}
            <section style={{ background: 'linear-gradient(160deg, #FFFBEB 0%, #FAFAF9 55%, #ECFDF5 100%)', borderBottom: `1px solid ${LINE}` }}>
                <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '72px 24px 84px', textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', fontSize: '12px', fontWeight: 800, color: DEEPGREEN, background: '#fff', border: `1px solid ${GREEN}55`, borderRadius: '99px', padding: '7px 18px', letterSpacing: '1px', marginBottom: '26px' }}>
                        1日3フレーズ ・ 3分 ・ 誰でも
                    </div>
                    <h1 className="p365-hero-h1" style={{ margin: 0, fontSize: '52px', fontWeight: 900, lineHeight: 1.25, letterSpacing: '1px' }}>
                        1年後、英語は<br />
                        <span style={{ color: DEEPGOLD }}>あなたの財産</span>になる。
                    </h1>
                    <p style={{ maxWidth: '560px', margin: '26px auto 0', fontSize: '15.5px', lineHeight: 2.05, color: SUB }}>
                        毎日3フレーズ、3分だけ。1年で1,095フレーズ。<br />
                        それは誰かの例文ではなく、<b style={{ color: INK }}>あなたが今日、言いたかった言葉</b>。<br />
                        復習と追加は一生続いて、財産は増え続けます。
                    </p>
                    <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '38px' }}>
                        <CtaButton primary href="/english/phrase365/app">試作版を触ってみる(無料)</CtaButton>
                        <CtaButton href="#how">仕組みを見る</CtaButton>
                    </div>
                    <div style={{ marginTop: '26px', fontSize: '12px', color: FAINT }}>
                        教材を増やすアプリではありません。あなたの英語を貯めるアプリです。
                    </div>
                </div>
            </section>

            {/* ===== 数字ストリップ ===== */}
            <section style={{ borderBottom: `1px solid ${LINE}`, background: '#fff' }}>
                <div className="p365-g3" style={{ maxWidth: '860px', margin: '0 auto', padding: '30px 24px', textAlign: 'center', gap: '10px' }}>
                    {[
                        ['30日で', '90', 'フレーズ'],
                        ['1年で', '1,095', 'フレーズ'],
                        ['そのあとは', '一生', '増え続ける'],
                    ].map(([a, b, c]) => (
                        <div key={b as string}>
                            <div style={{ fontSize: '12px', color: SUB, fontWeight: 700 }}>{a}</div>
                            <div style={{ fontSize: '34px', fontWeight: 900, color: DEEPGOLD, letterSpacing: '1px', lineHeight: 1.3 }}>{b}</div>
                            <div style={{ fontSize: '12px', color: SUB, fontWeight: 700 }}>{c}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== 問題提起 ===== */}
            <section style={{ maxWidth: '1040px', margin: '0 auto', padding: '84px 24px 0' }}>
                <SectionLabel>WHY</SectionLabel>
                <h2 style={{ margin: '0 0 34px', fontSize: '30px', fontWeight: 900, letterSpacing: '0.5px' }}>
                    続かなかったのは、あなたのせいじゃない。
                </h2>
                <div className="p365-g3">
                    {[
                        ['単語帳は、終わると消える', '3ヶ月がんばったあの教材、いまどこにありますか。本棚の奥か、メルカリか。やり終えた努力ごと、手元から消えていく。'],
                        ['アプリの例文は、他人の人生', '「The economy is recovering.」——それ、いつ言うんですか。自分の生活に一度も登場しない文は、覚えても出番がない。'],
                        ['やる気は燃料、仕組みは装置', '燃料は必ず切れます。切れても回り続ける装置だけが1年もつ。根性の問題にした時点で、勝負は終わっている。'],
                    ].map(([t, b]) => (
                        <div key={t} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: '26px 24px' }}>
                            <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '10px', lineHeight: 1.5 }}>{t}</div>
                            <div style={{ fontSize: '13px', lineHeight: 1.95, color: SUB }}>{b}</div>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: '26px', fontSize: '14.5px', color: INK, fontWeight: 700 }}>
                    足りなかったのは根性ではなく、<span style={{ borderBottom: `2px solid ${GOLD}` }}>貯まっていく実感</span>のほうです。
                </p>
            </section>

            {/* ===== 仕組み ===== */}
            <section id="how" style={{ maxWidth: '1040px', margin: '0 auto', padding: '84px 24px 0', scrollMarginTop: '20px' }}>
                <SectionLabel>HOW</SectionLabel>
                <h2 style={{ margin: '0 0 34px', fontSize: '30px', fontWeight: 900 }}>英語の貯金は、こう増える。</h2>
                <div className="p365-g3">
                    {[
                        ['01', 'きょうの3個を入れる', '言えなかった一言。言いたかった一言。5段階のレベルから自分の位置を選ぶと、思いつかない日は「今日の3個」が届きます。'],
                        ['02', '3分だけ、めくる', '忘れた頃に、忘れたやつだけが戻ってきます。覚えたカードは先へ、あやしいカードはまた明日。あなたは、めくるだけ。'],
                        ['03', '財産が増えていく', 'カレンダーに数字が積もり、7日・2週間・1ヶ月・3ヶ月の節目が返ってくる。365日後、最初の3個と再会してスラッと言えたら——もう一生モノです。'],
                    ].map(([n, t, b]) => (
                        <div key={n} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: '26px 24px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 900, color: GOLD, letterSpacing: '2px', marginBottom: '8px' }}>STEP {n}</div>
                            <div style={{ fontSize: '16px', fontWeight: 800, marginBottom: '10px' }}>{t}</div>
                            <div style={{ fontSize: '13px', lineHeight: 1.95, color: SUB }}>{b}</div>
                        </div>
                    ))}
                </div>

                {/* 画面イメージ */}
                <div className="p365-g2" style={{ marginTop: '42px' }}>
                    <CalendarMock />
                    <CardMock />
                </div>
                <div style={{ marginTop: '16px', fontSize: '12px', color: FAINT, textAlign: 'center' }}>
                    画面イメージ。開発者自身が365日、自分のために使っているトレーニング画面がベースです。飾りのスクリーンショットではありません。
                </div>
            </section>

            {/* ===== あなただけのフレーズ ===== */}
            <section style={{ maxWidth: '1040px', margin: '84px auto 0', padding: '0 24px' }}>
                <div style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #ECFDF5 100%)', border: `1px solid ${LINE}`, borderRadius: '24px', padding: '52px 34px' }}>
                    <SectionLabel>ONLY YOURS</SectionLabel>
                    <h2 style={{ margin: '0 0 20px', fontSize: '28px', fontWeight: 900, lineHeight: 1.5 }}>
                        他人の例文は忘れる。<br />自分の言葉は、残る。
                    </h2>
                    <p style={{ maxWidth: '620px', fontSize: '14.5px', lineHeight: 2.1, color: SUB, margin: '0 0 26px' }}>
                        学生時代の英語で覚えているのは、教科書の例文ではなく、
                        言えなくて悔しかった一言のほうのはずです。感情がついた言葉は消えません。
                        ここに貯めるのは、そういう言葉だけ。
                    </p>
                    <div className="p365-g3">
                        {[
                            '昨日の会議で詰まった、あの一言',
                            '海外ドラマで拾った、気の利いた返し',
                            '旅行で言えずに、指さしで済ませた注文',
                        ].map(t => (
                            <div key={t} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px', padding: '16px 18px', fontSize: '13.5px', fontWeight: 700, color: INK, lineHeight: 1.7 }}>
                                {t}
                            </div>
                        ))}
                    </div>
                    <p style={{ margin: '24px 0 0', fontSize: '14px', fontWeight: 800, color: DEEPGREEN }}>
                        全部、あなた専用のフレーズになる。だから、使える。だから、楽しくなる。
                    </p>
                </div>
            </section>

            {/* ===== 正直セクション ===== */}
            <section style={{ maxWidth: '1040px', margin: '0 auto', padding: '84px 24px 0' }}>
                <SectionLabel>HONESTY</SectionLabel>
                <h2 style={{ margin: '0 0 34px', fontSize: '30px', fontWeight: 900 }}>約束しないこと、約束すること。</h2>
                <div className="p365-g2">
                    <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '18px', padding: '28px 26px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: FAINT, letterSpacing: '2px', marginBottom: '16px' }}>約束しない</div>
                        {['「1ヶ月でペラペラ」', '「聞き流すだけで」', '「勉強ゼロで話せる」'].map(t => (
                            <div key={t} style={{ fontSize: '15px', fontWeight: 700, color: FAINT, textDecoration: 'line-through', textDecorationColor: '#D6A76F', padding: '7px 0', borderBottom: `1px dashed ${LINE}` }}>{t}</div>
                        ))}
                    </div>
                    <div style={{ background: '#fff', border: `1.5px solid ${GREEN}66`, borderRadius: '18px', padding: '28px 26px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 900, color: DEEPGREEN, letterSpacing: '2px', marginBottom: '16px' }}>約束する</div>
                        {['1日3分が、続く仕組み', '1年で1,095個の「自分の言葉」', 'やめても、財産が消えないこと'].map(t => (
                            <div key={t} style={{ fontSize: '15px', fontWeight: 800, color: INK, padding: '7px 0', borderBottom: `1px dashed ${LINE}` }}>{t}</div>
                        ))}
                    </div>
                </div>
                <p style={{ maxWidth: '720px', marginTop: '26px', fontSize: '13.5px', lineHeight: 2.05, color: SUB }}>
                    3分×365日は約18時間。留学の数千時間には遠く及びません。だから「何でも話せるようになる」とは言いません。
                    約束するのは、<b style={{ color: INK }}>あなたが選んだ1,095個が、口から出るようになること</b>。
                    ふだんの会話の主戦場は、実はそこです。
                </p>
            </section>

            {/* ===== 価格 ===== */}
            <section style={{ maxWidth: '1040px', margin: '0 auto', padding: '84px 24px 0' }}>
                <SectionLabel>PRICE</SectionLabel>
                <div style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '24px', padding: '44px 34px', textAlign: 'center' }}>
                    <h2 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: 900 }}>はじめるのは、無料。</h2>
                    <p style={{ margin: '0 auto', maxWidth: '520px', fontSize: '14px', lineHeight: 2, color: SUB }}>
                        財産が増えてきたら、月々コーヒー2杯分(980円を予定)。<br />
                        確定価格と公開日は、先行登録の方に最初にお知らせします。
                    </p>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <section style={{ maxWidth: '860px', margin: '0 auto', padding: '84px 24px 0' }}>
                <SectionLabel>FAQ</SectionLabel>
                <h2 style={{ margin: '0 0 26px', fontSize: '30px', fontWeight: 900 }}>よくある質問</h2>
                {[
                    ['英語力ゼロでも大丈夫ですか', 'レベルは5段階あって、いちばん下は「二言三言でそのまま使える」から始まります。ゼロのままの人と、毎日3個ずつ貯めた人の1年後は、別物です。'],
                    ['他の教材やアプリと併用できますか', '併用が前提です。1日3分しか取りません。むしろ、他の教材で出会った「これ使いたい」を貯めておく場所です。'],
                    ['毎日3個も思いつきません', '思いつかない日は、選んだレベルに合わせた「今日の3個」が届きます。開発者が毎日実際に貯めている中からのおすそ分けです。気に入ったものだけ、自分の財産に入れてください。'],
                    ['続かなかったらどうなりますか', 'カレンダーは責めません。空白の日はただの空白で、翌日戻れば続きから。貯金と同じで、休んでも残高は減りません。'],
                ].map(([q, a]) => (
                    <div key={q} style={{ background: '#fff', border: `1px solid ${LINE}`, borderRadius: '16px', padding: '20px 24px', marginBottom: '12px' }}>
                        <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '8px' }}>
                            <span style={{ color: GOLD, marginRight: '10px', fontWeight: 900 }}>Q</span>{q}
                        </div>
                        <div style={{ fontSize: '13.5px', lineHeight: 2, color: SUB, paddingLeft: '24px' }}>{a}</div>
                    </div>
                ))}
            </section>

            {/* ===== 最終CTA ===== */}
            <section id="register" style={{ maxWidth: '1040px', margin: '84px auto 0', padding: '0 24px 90px', scrollMarginTop: '20px' }}>
                <div style={{ background: INK, borderRadius: '28px', padding: '64px 34px', textAlign: 'center' }}>
                    <h2 style={{ margin: '0 0 16px', fontSize: '30px', fontWeight: 900, color: '#fff', lineHeight: 1.6 }}>
                        1年後のあなたは、<br />
                        <span style={{ color: GOLD }}>1,095フレーズ</span>持っている。か、いないか。
                    </h2>
                    <p style={{ margin: '0 0 34px', fontSize: '14px', color: '#D6D3D1', lineHeight: 2 }}>
                        始めた日から、貯金は増えるだけです。
                    </p>
                    <a href={REGISTER_HREF} className="p365-cta"
                        style={{
                            display: 'inline-block', textDecoration: 'none', padding: '17px 44px', borderRadius: '14px',
                            background: GOLD, color: INK, fontSize: '16px', fontWeight: 900, letterSpacing: '0.5px',
                            boxShadow: '0 8px 30px rgba(212,175,55,0.35)', transition: 'transform 0.12s, box-shadow 0.12s',
                        }}>
                        先行登録する(無料)
                    </a>
                    <div style={{ marginTop: '18px', fontSize: '11px', color: '#78716C' }}>
                        登録はメール1通。公開日と価格を最初にお知らせします。
                    </div>
                    <div style={{ marginTop: '14px' }}>
                        <a href="/english/phrase365/app" style={{ fontSize: '12.5px', fontWeight: 700, color: GOLD, textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                            先に試作版を触ってみる
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== フッター ===== */}
            <footer style={{ borderTop: `1px solid ${LINE}`, background: '#fff' }}>
                <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '26px 24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', fontSize: '11.5px', color: FAINT }}>
                    <span>フレーズ<b style={{ color: DEEPGOLD }}>貯金</b> (仮称) ・ 個人開発</span>
                    <span>1日3フレーズ、3分。英語をあなたの財産に。</span>
                </div>
            </footer>
        </div>
    );
}
