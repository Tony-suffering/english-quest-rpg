'use client';

/**
 * 英語を書く — 玄関 (公開版)
 *
 * iwasaki 側の /english/write は自分用の「ライトパス30日」の台帳で、
 * 初めて来た人が読むものではない。こちらは持ち出した2本 (CORE 5 / SUM 5) の入口に、
 * 「なぜ書けないのか」「この2本は何を肩代わりするのか」を日本語で先に置いた版。
 *
 * 置く順番:
 *   1. 痛いところ  — 書けないのは語彙のせいではない、と名指しする
 *   2. 答え2つ     — 意見を書く型 (CORE 5) / 要約を書く型 (SUM 5)
 *   3. 中の仕組み  — 実際に画面で何が起きるか。触る前に分かるように
 *   4. 使う順番    — 1日目に何をするか
 */

import Link from 'next/link';
import { EikenOutputNav, EikenOutputDisclaimer } from '@/components/english/EikenOutputChrome';

const GOLD = '#D4AF37';
const DEEPGOLD = '#9A7B16';
const GREEN = '#10B981';
const DEEPGREEN = '#047857';
const INK = '#1C1917';
const SUB = '#78716C';
const FAINT = '#A8A29E';
const LINE = '#ECE7DA';
const PAPER = '#FAFAF9';

function Card({ href, kicker, title, lead, color, deep, bullets }: {
    href: string; kicker: string; title: string; lead: string;
    color: string; deep: string; bullets: string[];
}) {
    return (
        <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>
            <div style={{
                background: '#fff', border: `1px solid ${LINE}`, borderLeft: `4px solid ${color}`,
                borderRadius: '14px', padding: '18px 20px', height: '100%',
            }}>
                <div style={{ fontSize: '9.5px', letterSpacing: '0.22em', color: deep, fontWeight: 800, marginBottom: '7px' }}>
                    {kicker}
                </div>
                <div style={{ fontSize: '19px', fontWeight: 900, color: INK, marginBottom: '7px', letterSpacing: '-0.01em' }}>
                    {title}
                </div>
                <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#44403C', lineHeight: 1.9 }}>{lead}</p>
                <ul style={{ margin: 0, padding: '0 0 0 17px', listStyle: 'disc' }}>
                    {bullets.map((b) => (
                        <li key={b} style={{ fontSize: '12px', color: SUB, lineHeight: 1.85, marginBottom: '3px' }}>{b}</li>
                    ))}
                </ul>
                <div style={{
                    display: 'inline-block', marginTop: '14px', background: color, color: '#fff',
                    padding: '9px 18px', borderRadius: '9px', fontSize: '13px', fontWeight: 900,
                }}>
                    開く
                </div>
            </div>
        </Link>
    );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
    return (
        <div style={{ display: 'flex', gap: '13px', alignItems: 'flex-start', marginBottom: '15px' }}>
            <div style={{
                width: '26px', height: '26px', borderRadius: '50%', background: INK, color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 900, flexShrink: 0, marginTop: '2px',
            }}>{n}</div>
            <div>
                <div style={{ fontSize: '14px', fontWeight: 900, color: INK, marginBottom: '3px' }}>{title}</div>
                <div style={{ fontSize: '12.5px', color: SUB, lineHeight: 1.9 }}>{body}</div>
            </div>
        </div>
    );
}

export default function WriteHubPage() {
    return (
        <div style={{ minHeight: '100vh', background: PAPER }}>
            <EikenOutputNav active="write" />

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '26px 16px 40px' }}>

                {/* 1. 痛いところ */}
                <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: FAINT, fontWeight: 700, marginBottom: '9px' }}>
                    英語を書く
                </div>
                <h1 style={{ fontSize: '26px', fontWeight: 900, color: INK, margin: '0 0 14px', lineHeight: 1.45, letterSpacing: '-0.02em' }}>
                    英作文が書けないのは、<br />
                    <span style={{ color: DEEPGOLD }}>言いたいことが無いからじゃない。</span>
                </h1>
                <p style={{ fontSize: '13.5px', color: '#44403C', lineHeight: 2, margin: '0 0 10px' }}>
                    白紙の前で止まるとき、足りていないのは単語でも意見でもありません。
                    <strong style={{ color: INK }}>1文目の形</strong>です。
                    形が決まっていないから、毎回ゼロから文を組み立てようとして、組み立て方を考えているうちに時間が終わります。
                </p>
                <p style={{ fontSize: '13px', color: SUB, lineHeight: 2, margin: '0 0 24px' }}>
                    ここに置いてある2つは、その「形」の側を全部こちらで持ってしまう道具です。
                    あなたが本番で考えるのは、意見なら<strong style={{ color: INK }}>名詞2つ</strong>、要約なら<strong style={{ color: INK }}>主語と動詞</strong>だけになります。
                    どちらも無料、登録不要、書いたものは自分の端末の中にだけ残ります。
                </p>

                {/* 2. 答え2つ */}
                <div style={{ display: 'grid', gap: '14px', marginBottom: '28px' }}>
                    <Card
                        href="/english/write/core5"
                        kicker="CORE 5 ・ 意見を書く"
                        title="指を3本立てて、意見を書く"
                        lead="「賛成か反対か」を書く問題は、理由の中身が毎回違うように見えて、使う論点は10種類しかありません。その10個を両手の指に割り当てて、お題に対して立つ指を3本だけ選びます。"
                        color={GREEN}
                        deep={DEEPGREEN}
                        bullets={[
                            '左手=自分のもの(金・時間・体・幸せ・学び)、右手=自分の外(公平・自由・信用・受け継ぐもの・自然)',
                            '指1本ごとに、そのまま使える幹の文が8つ(良い側4・悪い側4)',
                            '補足の型は動詞と前置詞が固定。埋めるのは名詞2つだけ',
                            '話すとき用の言い換え(I think の代わり)も同じ画面に',
                        ]}
                    />
                    <Card
                        href="/english/write/sum5"
                        kicker="SUM 5 ・ 要約を書く"
                        title="本文の形は、5つしかない"
                        lead="要約は作文ではなく、本文を決まった数の文に潰す作業です。潰し方は本文の形で決まり、その形は5種類。どれかを見分けた瞬間に、書くべき文の頭が全部決まります。"
                        color={GOLD}
                        deep={DEEPGOLD}
                        bullets={[
                            '本文の形5つ(賛否・損得・因果・対策・研究)の見分け方',
                            '見分ける手がかりは第2段落の1文目1か所だけ',
                            '形が決まると第1文から最終文までの文頭が確定する。作るのは主語と動詞だけ',
                            '模範解答が本文から5語以上そのまま写していないか機械で検査済み',
                        ]}
                    />
                </div>

                {/* 3. 中の仕組み */}
                <div style={{
                    background: '#fff', border: `1px solid ${LINE}`, borderRadius: '14px',
                    padding: '20px 20px 14px', marginBottom: '26px',
                }}>
                    <div style={{ fontSize: '9.5px', letterSpacing: '0.22em', color: FAINT, fontWeight: 800, marginBottom: '10px' }}>
                        中で何が起きているか
                    </div>
                    <p style={{ margin: '0 0 14px', fontSize: '13px', color: '#44403C', lineHeight: 1.95 }}>
                        画面には英語が本体で出て、日本語は小さく添えてあります。英文を読んで意味が取れなければ下を見る、という順番にしてあるためです。
                        気になった文は横のボタンで印を付けられて、印を付けた文は
                        <Link href="/english/training" style={{ color: DEEPGREEN, fontWeight: 800 }}>トレーニング</Link>
                        に溜まっていきます。
                    </p>
                    <div style={{
                        background: '#F7FBF9', border: `1px solid ${GREEN}33`, borderRadius: '10px',
                        padding: '11px 13px', fontSize: '12px', color: '#3F3F46', lineHeight: 1.85,
                    }}>
                        溜めた英文の保存先は、サーバーではなく<strong>あなたのブラウザの中</strong>です。
                        アカウントもメールアドレスも要りません。こちらからは誰が何を保存したか見えません。
                        同じ端末の同じブラウザで開けば、次の日も残っています。
                    </div>
                </div>

                {/* 4. 使う順番 */}
                <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '9.5px', letterSpacing: '0.22em', color: FAINT, fontWeight: 800, marginBottom: '12px' }}>
                        1日目にやること
                    </div>
                    <Step n="1" title="CORE 5 を開いて、お題を1つ押す"
                        body="押すと、そのお題で立つ指が3本光ります。自分で論点を思いつく必要はありません。光った3本を読むところから始めます。" />
                    <Step n="2" title="幹の文を1本選んで、名詞を2つ入れる"
                        body="文の形と動詞はもう決まっています。空いているのは名詞の枠だけです。ここだけ自分の言葉にします。" />
                    <Step n="3" title="SUM 5 で、本文の形を見分ける練習を1本"
                        body="要約は形の見分けが8割です。5つの形の特徴を読んで、例題を1本潰せば、その日のうちに型が1つ手に入ります。" />
                </div>

                <div style={{
                    marginTop: '18px', padding: '11px 14px', background: '#fff',
                    border: `1px dashed ${LINE}`, borderRadius: '10px',
                    fontSize: '11.5px', color: FAINT, lineHeight: 1.8,
                }}>
                    どちらも作者が自分の練習のために作って、毎日使っているものをそのまま公開しています。
                    英文・お題・模範解答はすべて自作で、試験の問題を写したものは1つも入っていません。
                </div>
            </div>

            <EikenOutputDisclaimer />
        </div>
    );
}
