'use client';

/**
 * ここにあるものを全部説明する紙 (公開版)
 *
 * 玄関 (/english/home) は「迷わず押せる1つ」を出す場所なので、説明を積むと壊れる。
 * かわりに、全部知りたい人だけが来るこの1枚に、作ってきたものを順番に置く。
 *
 * 書き方の約束:
 *   - 数字は、この site が実際に出している数字しか書かない
 *   - 専門語を使ったら、その場で日本語に言い直す
 *   - 作った側の事情 (毎日の運用、自分用の版) は書かない。読む人に関係ない
 */

import Link from 'next/link';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#E7E5E4';

function Section({ no, kicker, title, children }: {
    no: string; kicker: string; title: string; children: React.ReactNode;
}) {
    return (
        <section style={{ marginBottom: '34px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontFamily: 'Georgia, serif', fontSize: '30px', fontWeight: 900, color: '#E7E5E4', lineHeight: 1 }}>
                    {no}
                </span>
                <div>
                    <div style={{ fontSize: '9.5px', letterSpacing: '0.22em', color: FAINT, fontWeight: 800, marginBottom: '3px' }}>
                        {kicker}
                    </div>
                    <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 900, color: INK, letterSpacing: '-0.01em', lineHeight: 1.5 }}>
                        {title}
                    </h2>
                </div>
            </div>
            <div style={{ paddingLeft: '2px' }}>{children}</div>
        </section>
    );
}

function P({ children }: { children: React.ReactNode }) {
    return <p style={{ margin: '0 0 11px', fontSize: '13.5px', color: '#44403C', lineHeight: 2 }}>{children}</p>;
}

function Go({ href, label, note, color, deep }: {
    href: string; label: string; note: string; color: string; deep: string;
}) {
    return (
        <Link href={href} style={{ textDecoration: 'none', display: 'block', marginTop: '10px' }}>
            <div style={{
                background: '#fff', border: `1px solid ${LINE}`, borderLeft: `4px solid ${color}`,
                borderRadius: '11px', padding: '12px 15px',
            }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: deep, marginBottom: '3px' }}>{label} →</div>
                <div style={{ fontSize: '12px', color: SUB, lineHeight: 1.75 }}>{note}</div>
            </div>
        </Link>
    );
}

function Num({ v, l }: { v: string; l: string }) {
    return (
        <div style={{ padding: '10px 6px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 900, color: INK, lineHeight: 1.1 }}>{v}</div>
            <div style={{ fontSize: '9px', letterSpacing: '0.16em', color: FAINT, marginTop: '4px' }}>{l}</div>
        </div>
    );
}

export default function EnglishAboutPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#FAFAF9', padding: '28px 16px 64px' }}>
            <div style={{ maxWidth: '740px', margin: '0 auto' }}>

                <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: FAINT, fontWeight: 700, marginBottom: '9px' }}>
                    TONIO LAB ・ ここにあるもの
                </div>
                <h1 style={{ fontSize: '27px', fontWeight: 900, color: INK, margin: '0 0 15px', lineHeight: 1.45, letterSpacing: '-0.02em' }}>
                    英語が話せない人間が、<br />
                    <span style={{ color: DEEPGOLD }}>自分のために作った道具を全部置いてあります。</span>
                </h1>
                <P>
                    どれも英語が得意になってから作ったものではありません。話せないまま、
                    詰まるたびに「これは道具で解けるんじゃないか」と思って作ったものが溜まって、こうなりました。
                    順番に説明します。全部無料で、登録も要りません。
                </P>

                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px',
                    background: '#fff', border: `1px solid ${LINE}`, borderRadius: '12px',
                    margin: '18px 0 34px', overflow: 'hidden',
                }}>
                    <Num v="1億語" l="数えた話し言葉" />
                    <Num v="10本" l="意見の論点" />
                    <Num v="5つ" l="要約の型" />
                    <Num v="88号" l="英字新聞" />
                </div>

                <Section no="1" kicker="STEP 1 ・ 数える" title="単語帳が教えない「回数」から始めた">
                    <P>
                        最初にやったのは、覚えることではなく<strong style={{ color: INK }}>数えること</strong>でした。
                        話し言葉を1億語ぶん集めて、どの言い方が何回出てくるかを数えました。
                    </P>
                    <P>
                        たとえば <b style={{ fontFamily: 'Georgia, serif' }}>kind</b> という単語。
                        英語を話す人が一生のうちに出会う回数は約<strong style={{ color: INK }}>131,909回</strong>で、
                        そのうち<strong style={{ color: INK }}>89%</strong>は「親切な」ではなく
                        <b style={{ fontFamily: 'Georgia, serif' }}>kind of</b>（なんか、ちょっと）の形です。
                        単語帳のとおりに「親切な」で覚えた人は、9割を取り逃していることになります。
                    </P>
                    <P>
                        この数え方で全部の表現を並べ直すと、出会う回数の多い上位1,000個だけで、
                        日常会話の約18%が埋まります。だから「何から覚えるか」は、好みではなく順位で決められます。
                    </P>
                    <Go href="/english/ear" label="耳がどこで壊れるか測る"
                        note="速度と雑音を10段まで上げて、文が保てなくなる段を出します。5分・登録不要。"
                        color={INK} deep={INK} />
                    <Go href="/english/course" label="百日課程 ー 1日10個で100日"
                        note="測ったあとの道のり。順位の上から1,000個を、1日10個ずつ。"
                        color="#0E2A3F" deep="#0E2A3F" />
                </Section>

                <Section no="2" kicker="STEP 2 ・ 書く" title="白紙で止まるのは、形を持っていないから">
                    <P>
                        英作文で手が止まるとき、足りないのは単語でも意見でもなく、
                        <strong style={{ color: INK }}>1文目の形</strong>です。毎回ゼロから組み立てようとするから、
                        組み立て方を考えているうちに時間が終わります。そこで、形の側を全部こちらで用意しました。
                    </P>
                    <P>
                        <strong style={{ color: DEEPGREEN }}>意見を書くとき（CORE 5）</strong>。
                        賛成・反対を書く問題で使う論点は10種類しかありません。
                        左手に「自分のもの」（金・時間・体・幸せ・学び）、右手に「自分の外」（公平・自由・信用・受け継ぐもの・自然）を割り当てて、
                        お題に対して立つ指を3本だけ選びます。指ごとに使える文はもう書いてあり、
                        あなたが埋めるのは<strong style={{ color: INK }}>名詞2つ</strong>だけです。
                    </P>
                    <P>
                        <strong style={{ color: DEEPGOLD }}>要約を書くとき（SUM 5）</strong>。
                        要約は作文ではなく、本文を決まった数の文に潰す作業です。潰し方は本文の形で決まり、
                        その形は<strong style={{ color: INK }}>賛否・損得・因果・対策・研究</strong>の5つしかありません。
                        見分ける手がかりは第2段落の1文目1か所だけ。形が決まった瞬間に全部の文頭が決まるので、
                        自分で作るのは<strong style={{ color: INK }}>主語と動詞</strong>だけになります。
                    </P>
                    <Go href="/english/write" label="英作文の2本をまとめて見る"
                        note="CORE 5（意見）と SUM 5（要約）の入口。先に日本語の説明があります。"
                        color={GREEN} deep={DEEPGREEN} />
                </Section>

                <Section no="3" kicker="STEP 3 ・ 読む" title="毎日、英字新聞を1枚ぶん書いています">
                    <P>
                        読む側の道具は <strong style={{ color: INK }}>The Tonio Times</strong> です。
                        A4で1枚に収まる英字新聞を、記事・インタビュー・小説つきで、これまで88号ぶん書きました。
                        実在の出来事・年号・発言で裏を取って書いていて、文の難しさは実測で英字経済誌と同じくらいです。
                    </P>
                    <P>
                        難しい紙をそのまま渡すと読めないので、本文の文をタップすると
                        <strong style={{ color: INK }}>一言一句の日本語</strong>が出ます。
                        英文を頭から意味のかたまりで切って、切れ端ごとに訳を当てたもので、全部で2,817か所あります。
                        「全体はなんとなく分かるが、どの語が効いているのか分からない」で終わらないための欄です。
                        読み上げも付いているので、目で読む・耳で聞くを同じ紙でできます。
                    </P>
                    <Go href="/english/newspaper" label="The Tonio Times を読む"
                        note="カレンダーから号を選びます。印刷して読む前提のレイアウトです。"
                        color="#7A1F1F" deep="#7A1F1F" />
                </Section>

                <Section no="4" kicker="STEP 4 ・ 溜める" title="気になった英文は、その場で自分の棚に入る">
                    <P>
                        新聞でも英作文でも、気になった文の横にボタンがあります。押すと
                        <Link href="/english/training" style={{ color: DEEPGREEN, fontWeight: 800 }}>トレーニング</Link>
                        に溜まって、あとから復習できます。読んだ端から消えていくのを止めるための仕組みです。
                    </P>
                    <div style={{
                        background: '#F7FBF9', border: `1px solid ${GREEN}33`, borderRadius: '11px',
                        padding: '13px 15px', fontSize: '12.5px', color: '#3F3F46', lineHeight: 1.9,
                    }}>
                        <strong>保存先について。</strong>
                        溜めた英文は、サーバーではなく<strong>あなたのブラウザの中</strong>に保存されます。
                        アカウントもメールアドレスも要らず、こちらからは誰が何を保存したかを見ることができません。
                        同じ端末の同じブラウザで開けば次の日も残っていますが、
                        ブラウザのデータを消すと一緒に消えます。別の端末には引き継がれません。
                    </div>
                </Section>

                <Section no="5" kicker="STEP 5 ・ その他" title="ほかにも13本あります">
                    <P>
                        TOEIC を物語で読む「居酒屋TOEIC」、映画のセリフを毎日分解する「Movie Harvest」、
                        日本語の動画を英語に変える「罪悪感ゼロ英語」、3秒で返す練習、同時通訳の練習、
                        聞き取りの書き取りなど、型の違うものが13本あります。どれも無料・登録不要です。
                    </P>
                    <Go href="/english/home" label="玄関に戻って全部見る"
                        note="下のほうに「これまでに作ったアプリ(13本)」があります。"
                        color={GOLD} deep={DEEPGOLD} />
                </Section>

                <div style={{
                    marginTop: '10px', padding: '15px 17px', background: '#fff',
                    border: `1px solid ${LINE}`, borderRadius: '12px',
                }}>
                    <div style={{ fontSize: '9.5px', letterSpacing: '0.22em', color: FAINT, fontWeight: 800, marginBottom: '8px' }}>
                        最後に
                    </div>
                    <p style={{ margin: 0, fontSize: '12.5px', color: SUB, lineHeight: 2 }}>
                        ここにあるものは、英語が上手い人が下手な人に教えるために作ったものではありません。
                        自分が詰まったところを、その日のうちに道具にしてきた結果の集まりです。
                        だから完成していないものもあるし、明日また形が変わるものもあります。
                        使ってみて壊れているところがあれば、それはまだ直していないところです。
                    </p>
                </div>
            </div>
        </div>
    );
}
