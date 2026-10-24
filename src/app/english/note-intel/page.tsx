'use client';

import EnglishSidebar from '@/components/EnglishSidebar';

const GOLD = '#D4AF37';
const GOLD_DEEP = '#8a6d1a';
const EMERALD = '#10B981';
const EMERALD_DEEP = '#047857';
const ALARM = '#b4472b';
const INK = '#1c1917';
const SOFT = '#57534e';
const LINE = '#e7e5e4';

const motives = [
    { name: '承認 / 孤独の穴埋め', pct: '55–65%', w: 60, c: GOLD_DEEP, tell: 'プロフに「英語コーチ」等と書きつつ有料商品はゼロか申し訳程度。反応が止まると更新も止まる。マウントより「反応がある＝社会と繋がってる感覚」を求める形で出る。' },
    { name: '公開宣言 / 自己規律', pct: '20–30%', w: 25, c: GOLD, tell: '「サボれない仕組みとして発信を使う」と明言。DayN連番、100日チャレンジ。純度は高いが、見られていないと続かない時点で承認が担保になっている。' },
    { name: 'ブランディング / 独立の布石', pct: '10–15%', w: 13, c: '#c0a86a', tell: '肩書き(コーチ・翻訳者・発信力)を転職や独立の実績にしたい層。プロフに願望が滲む。数字が伸びないと早期に萎む。' },
    { name: '実際の商品導線', pct: '5%未満', w: 5, c: '#d6c79a', tell: '有料note・Kindle・メンバーシップ・アフィリを実際に置き、X→note→商品の三点セットが揃っている。中身は「英語で稼いだ体験談」が多い。黒字はさらにその一部。' },
];

const postTypes = [
    { type: '弱者告白', ex: 'TOEIC300点だった僕が…', aim: 'スキ＋フォロー', how: '数字で自分を下げ「見下してこない人」で信頼を取る。読者が自己投影。全型のブースター。' },
    { type: '数字リスト', ex: '3つの習慣 / 5つの法則', aim: '保存', how: '読む労力を提示して離脱を防ぎ「後で全部やる」で保存誘発。単体では薄い。' },
    { type: '格言', ex: 'わからないをそのままにしない', aim: 'スキ＋拡散', how: '断定一文を自分の代弁として引用シェア。消費が速く、フォロー転換は弱い瞬発力担当。' },
    { type: '問いかけ', ex: '日本語→英語のゲームに…', aim: '開封＋スキ', how: '「え、自分のこと?」で図星を突きクリックを取る。入口としてCTR効率が最も高い。' },
    { type: '身内エピソード', ex: '3歳の息子から学んだ話', aim: 'スキ＋フォロー', how: 'ノウハウを人生の物語に偽装。「日常が読みたい」でフォロー母数を厚くする本命。' },
    { type: '連番実況', ex: '英語ゼロから実況 Day149', aim: 'フォロー＋再訪', how: '継続の証明そのものがブランド。既存フォロワーの定着装置。新規には無意味。' },
    { type: 'アフィリ', ex: 'レアジョブ Daily news', aim: '検索流入＋収益', how: 'スキを捨て、サービス名の指名検索を刈る。世界観を薄めるので頻度は絞る別ロジック。' },
    { type: '雑学', ex: '英語が完璧なのに…ない人', aim: 'クリック＋保存', how: '情報の欠落(…)で好奇心ギャップを作る。人格が乗らずフォロー転換は弱い、新規リーチ担当。' },
];

const stats = [
    { fig: '≈2%', lab: '会員のうち1円でも収益化した割合' },
    { fig: '数百円', lab: '単発noteの中央値 (3か月あたり)' },
    { fig: '0.2%', lab: '累計100万円超のクリエイター' },
    { fig: '100%', lab: '英語で食える実名層は全員 note が主戦場ではない' },
];

const plays = [
    { h: '「点はあるのに話せない」を弱者告白の上位互換にする', p: '凡百の「300→900」逆転の逆を突く。点はあるが実戦で死ぬ層の恐怖そのもので、しかも笑える＝商品「恥とあきらめの英会話」と一致。DayN連番はやるな。途切れた瞬間、羞恥装置に反転する。' },
    { h: 'noteは広告、換金は自作サイト', p: 'note単体は食えない。noteは自虐ギャグで人格を立てる広告塔に徹し、換金はプロダクト(CINEPASS / WriteOne / アプリ作る部)で。Content Hub(toniolab＝本体 / note＝広告)をそのまま実行。' },
    { h: 'スキ数KPIを捨てる。相互いいねは一切やらない', p: '義理とbotの混合物で本当のデータが死ぬ。追うのは「相互圏の外の見知らぬ読者の反応」と「サイトへの遷移率」だけ。スキが伸びても遷移しない記事は失敗と判定する。' },
    { h: '教える発信者でなく、作る純ジャパになる', p: 'クラスタの99%は「教える／実況する」だけ。お前は実体験(DMM検死・walking English・ツッコミ復習)を動く製品に変換して見せられる。中身を学習ログでなく「製品開発ログ＋検死ギャグ」にずらせ。ネタが尽きない。' },
    { h: '刃は必ず自分に向ける。ギャグを必須化する', p: '他人を斬ると「嫌味な負け惜しみ」で誰も読まない。「俺もTOEIC900の見栄でnote始めて、スキ5個に一喜一憂してた馬鹿です」と先に自分を斬る。自虐で笑わせながら実は製品を売る ── この席は空いている。' },
];

const secHead = (letter: string, title: string, color: string) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
        <span style={{
            fontWeight: 700, fontSize: 14, color: 'white', background: color,
            width: 28, height: 28, flex: 'none', display: 'flex', alignItems: 'center',
            justifyContent: 'center', borderRadius: '50%', transform: 'translateY(3px)',
        }}>{letter}</span>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, lineHeight: 1.3 }}>{title}</h2>
    </div>
);

export default function NoteIntelPage() {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#FAFAF9' }}>
            <EnglishSidebar />
            <main style={{
                flex: 1, maxWidth: 800, margin: '0 auto', padding: '40px 20px 96px',
                fontFamily: 'system-ui, -apple-system, sans-serif', color: INK, lineHeight: 1.85,
            }}>
                {/* header */}
                <header style={{ paddingBottom: 26, borderBottom: `1px solid ${LINE}`, marginBottom: 36 }}>
                    <div style={{ fontSize: 12, letterSpacing: 3, color: GOLD_DEEP, textTransform: 'uppercase', fontWeight: 700 }}>
                        競合検死ファイル No.01 ・ note / 英語学習クラスタ
                    </div>
                    <h1 style={{ fontSize: 34, fontWeight: 700, margin: '14px 0 12px', letterSpacing: 0.5, lineHeight: 1.25 }}>
                        note英語学習クラスタは、結局なにがしたいのか
                    </h1>
                    <div style={{ fontSize: 12.5, color: SOFT }}>16体のエージェントによる実地調査 ＋ 敵対的検証 ／ 2026-07-19</div>
                    <div style={{
                        marginTop: 22, padding: '16px 20px', borderLeft: `4px solid ${GOLD}`,
                        background: '#faf6ea', borderRadius: '0 6px 6px 0', fontSize: 19, lineHeight: 1.6,
                    }}>
                        これは学習フィードの皮をかぶった、<b style={{ color: GOLD_DEEP }}>自己承認の定期供給システム</b>だ。
                    </div>
                </header>

                {/* A */}
                <section style={{ paddingBottom: 40, borderBottom: `1px solid ${LINE}`, marginBottom: 40 }}>
                    {secHead('A', '一段の結論', EMERALD_DEEP)}
                    <p style={{
                        fontSize: 22, lineHeight: 1.6, margin: '0 0 20px', padding: '20px 0',
                        borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}`,
                    }}>
                        大半は英語を<b style={{ color: GOLD_DEEP }}>教えたいのでも売りたいのでもない</b>。「毎日続けている自分」という物語を更新して、承認と所属感を補給しているだけだ。
                    </p>
                    <p style={{ margin: 0, color: SOFT }}>
                        英語はたまたま選ばれた供物であって、筋トレでも読書でも構造は同じになる。「英語コーチ」「発信力を実績に」といった看板は、承認欲求に社会的な言い訳を与える<b style={{ color: INK }}>建前</b>として機能している。実際に金になっているのは全体の<b style={{ color: GOLD_DEEP }}>1〜2%</b>、単発noteの中央値は3か月で数百円。稼げないのに続くのは、金以外の報酬(スキ・伴走・寂しさの穴埋め)を毎日受け取っているからだ。
                    </p>
                </section>

                {/* B */}
                <section style={{ paddingBottom: 40, borderBottom: `1px solid ${LINE}`, marginBottom: 40 }}>
                    {secHead('B', '動機の4分類と、その比率', GOLD_DEEP)}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        {motives.map(m => (
                            <div key={m.name}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, marginBottom: 7 }}>
                                    <span style={{ fontWeight: 700, fontSize: 15.5 }}>{m.name}</span>
                                    <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: SOFT }}>{m.pct}</span>
                                </div>
                                <div style={{ height: 12, background: '#f0ebe0', borderRadius: 6, overflow: 'hidden', border: `1px solid ${LINE}` }}>
                                    <span style={{ display: 'block', height: '100%', width: `${m.w}%`, background: m.c, borderRadius: '6px 0 0 6px' }} />
                                </div>
                                <div style={{ fontSize: 13.5, color: SOFT, marginTop: 7, lineHeight: 1.65 }}>{m.tell}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 24, fontSize: 14, color: SOFT, background: '#f5f5f4', padding: '13px 16px', borderRadius: 6 }}>
                        合計が過剰なのは1人が複数を兼ねるから。最頻は<b style={{ color: INK }}>「(d)の建前を掲げた(a)」</b> ── コーチを名乗り、商品を置き、実収益はほぼゼロ。これがボリュームゾーンの正体。ただし承認欲求＝悪ではない。それが継続を駆動する限り、英語力は実際に伸びる。
                    </div>
                </section>

                {/* C */}
                <section style={{ paddingBottom: 40, borderBottom: `1px solid ${LINE}`, marginBottom: 40 }}>
                    {secHead('C', '投稿型カタログ ── 狙いと、スキが付く仕掛け', EMERALD_DEEP)}
                    <div style={{ overflowX: 'auto', border: `1px solid ${LINE}`, borderRadius: 8 }}>
                        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: 13.5, minWidth: 520 }}>
                            <thead>
                                <tr>
                                    {['型', '狙い', 'スキ / フォローが付く機構'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '11px 14px', background: '#f5f5f4', fontSize: 11.5, letterSpacing: 1.2, textTransform: 'uppercase', color: SOFT, fontWeight: 700, borderBottom: `1px solid ${LINE}` }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {postTypes.map((r, i) => (
                                    <tr key={r.type}>
                                        <td style={{ padding: '11px 14px', borderBottom: i === postTypes.length - 1 ? 'none' : `1px solid ${LINE}`, verticalAlign: 'top' }}>
                                            <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{r.type}</span><br />
                                            <span style={{ color: SOFT, fontSize: 12.5 }}>{r.ex}</span>
                                        </td>
                                        <td style={{ padding: '11px 14px', borderBottom: i === postTypes.length - 1 ? 'none' : `1px solid ${LINE}`, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{r.aim}</td>
                                        <td style={{ padding: '11px 14px', borderBottom: i === postTypes.length - 1 ? 'none' : `1px solid ${LINE}`, verticalAlign: 'top', lineHeight: 1.6 }}>{r.how}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* D */}
                <section style={{ paddingBottom: 40, borderBottom: `1px solid ${LINE}`, marginBottom: 40, background: 'linear-gradient(180deg,#f6eae4,transparent 70%)', borderRadius: 12, padding: '24px 20px 40px' }}>
                    {secHead('D', 'スキ稼ぎ ≠ 稼ぎ', ALARM)}
                    <p style={{ fontSize: 21, lineHeight: 1.55, color: ALARM, fontWeight: 700, margin: '0 0 18px' }}>スキは “承認” であって “財布” ではない。</p>
                    <p style={{ margin: '0 0 16px', color: SOFT }}>
                        スキ5個の有料記事が後日ちゃんと売れる一方、フォロワー1万超でも有料記事が売れないアカウントがある。スキは「拍手・挨拶・相互狙い」で押されるもので、購買意欲と相関しない。しかも4層で人工的に水増しされる。
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', margin: '18px 0', fontSize: 13, fontWeight: 700 }}>
                        {['相互スキ(義理)', 'お題巡回(制度)', '自動スキbot', 'スキの買収'].map((c, i) => (
                            <span key={c} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ background: 'white', border: '1px solid #e4c3b8', color: ALARM, padding: '5px 11px', borderRadius: 20 }}>{c}</span>
                                {i < 3 && <span style={{ color: ALARM, opacity: 0.5 }}>&rarr;</span>}
                            </span>
                        ))}
                    </div>
                    <p style={{ margin: 0, color: SOFT }}>
                        「義理→制度→bot→捏造」の地続きで、どこからが不正か線引きできない。<b style={{ color: INK }}>相互で回した瞬間、自分の数字は義理・bot・空アカの混合物になり、“誰が金を払うか” という本当のデータが観測不能になる。</b> 外部から来た1スキは、相互で得た100スキより桁違いに価値が高い。<b style={{ color: ALARM }}>盛るほど、稼ぎから遠ざかる。</b>
                    </p>
                </section>

                {/* E */}
                <section style={{ paddingBottom: 40, borderBottom: `1px solid ${LINE}`, marginBottom: 40 }}>
                    {secHead('E', 'この市場で、誰がどう稼いでいるか', GOLD_DEEP)}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 22 }}>
                        {stats.map(s => (
                            <div key={s.lab} style={{ background: 'white', border: `1px solid ${LINE}`, borderRadius: 10, padding: '16px' }}>
                                <div style={{ fontWeight: 700, fontSize: 28, color: GOLD_DEEP, fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{s.fig}</div>
                                <div style={{ fontSize: 12, color: SOFT, marginTop: 9, lineHeight: 1.5 }}>{s.lab}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ margin: '0 0 16px', color: SOFT }}>
                        <b style={{ color: INK }}>noteは「レジ」ではなく「信用の置き場」。</b> 稼ぐ実体(自作教材・EC・講座・書籍・本業送客)を外に持ち、Xで人を集め、noteに着地させる。ATSU(自作単語帳＋EC)、モリテツ型(商業出版)、講師送客 ── 稼げている実名は全員この構造。<b style={{ color: GOLD_DEEP }}>三点セットの無い「note単体・英語だけ」は、実例が示す通り食えない。</b>「毎日ニュース要約」系は情報提供でなく、無償で集客して比較記事・自社商品へ送る撒き餌と断定してよい。
                    </p>
                    <div style={{ fontSize: 14, color: SOFT, background: '#f5f5f4', padding: '13px 16px', borderRadius: 6 }}>
                        ※ 敵対的検証による補正: 「英語ジャンルは特にダメ」は誇張。<b style={{ color: INK }}>英語学習は実用系で単価を上げやすく、少数読者でも成立する側</b>。飽和は「無差別記事が埋もれる」を意味するだけで、機会消失ではない。勝負は結局<b style={{ color: INK }}>企画力とテーマ選定</b>。
                    </div>
                </section>

                {/* F */}
                <section style={{ marginBottom: 8 }}>
                    {secHead('F', 'で、とにおはどう抜けるか', EMERALD_DEEP)}
                    <p style={{ fontSize: 17, margin: '0 0 20px', color: SOFT }}>
                        量産型が逆立ちしても真似できない札を、お前はもう持っている ── <b style={{ color: EMERALD_DEEP }}>TOEIC900あるのに話せない</b>／<b style={{ color: EMERALD_DEEP }}>自虐とギャグが核</b>／<b style={{ color: EMERALD_DEEP }}>自作の英語学習サイトを運営</b>。差は「作れる」ことと「面白い」こと。承認装置ではなく製品導線に振り切れ。
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        {plays.map((p, i) => (
                            <div key={i} style={{ display: 'flex', gap: 16, background: 'white', border: `1px solid ${LINE}`, borderLeft: `4px solid ${EMERALD}`, borderRadius: '0 10px 10px 0', padding: '16px 18px' }}>
                                <span style={{ fontWeight: 700, fontSize: 20, color: EMERALD_DEEP, flex: 'none', width: 24, fontVariantNumeric: 'tabular-nums' }}>{i + 1}</span>
                                <div>
                                    <h3 style={{ margin: '0 0 5px', fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}>{p.h}</h3>
                                    <p style={{ margin: 0, fontSize: 14, color: SOFT, lineHeight: 1.7 }}>{p.p}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: 36, padding: '26px 24px', borderRadius: 12, background: INK, color: '#f6f0e2' }}>
                        <div style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: GOLD, fontWeight: 700 }}>総括</div>
                        <p style={{ fontSize: 20, lineHeight: 1.55, margin: '12px 0 0' }}>
                            勝ち筋は、彼らの土俵(スキ・連番・承認)に降りないこと。<b style={{ color: '#5fd3a3' }}>点はあるが話せない自虐</b> × <b style={{ color: '#5fd3a3' }}>教えずに作る純ジャパ</b> × <b style={{ color: GOLD }}>note＝広告 / 自作サイト＝レジ</b> ── この三点で、承認装置クラスタから製品発信者へ抜ける。飽和市場で唯一、模倣されないポジションだ。
                        </p>
                    </div>
                </section>

                <footer style={{ marginTop: 32, paddingTop: 22, borderTop: `1px solid ${LINE}`, fontSize: 12, color: SOFT, lineHeight: 1.7 }}>
                    調査方法: note収益化 / 露出アルゴリズム / 英語クラスタの実名プレイヤー / 投稿型分解 / 連番実況ジャンル / 英会話アフィリ / 相互スキ文化 / 発信者の動機 ── の<b style={{ color: INK }}>8方向を並列調査</b>し、<b style={{ color: INK }}>3つの主要主張を敵対的に検証</b>して統合。実地エージェント計16体。数値は2025年決算・2026年公式手数料ベースの公開情報に基づく推定。
                </footer>
            </main>
        </div>
    );
}
