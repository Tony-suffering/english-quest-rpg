'use client';

// note投稿の型 — 「今夜も通じない」を note に書くときの完全マニュアル。
// 構成(8ブロック)/ コピペ定型文 / スクショの取り先 / 完全モデル記事(第49夜) /
// ファンが増える理屈 / 節目回の変化球 / 投稿前チェックリスト。
// 1本15分で書けることを最優先。ライト基調、絵文字なし。

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
    recapOneLine, recapStandard, recapStatus, recapFull, recapFooter, getRecapNumbers,
} from '@/data/english/tonio-recap';
import { CONTENT_LAYERS, CONTENT_LAYERS_NOTE } from '@/data/english/tonio-basics';

const PAPER = '#F4F0E6';
const CARD = '#FFFFFF';
const INK = '#17130F';
const MUTED = '#6E6558';
const RED = '#C0392B';
const GOLD = '#B8941E';
const GOLD_HI = '#E7C14B';
const GREEN = '#2E9E6B';
const LINE = '#E5DECF';
const SERIF = "Georgia, 'Times New Roman', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif";
const SANS = "'Helvetica Neue', Arial, 'Yu Gothic', 'Hiragino Kaku Gothic ProN', 'Noto Sans JP', sans-serif";

// ============ コピペ用定型文 ============
const TPL_TITLE = '【今夜も通じない】第49夜 あの接続詞は、ダクトテープだ';

function CopyBlock({ label, text }: { label: string; text: string }) {
    const [done, setDone] = useState(false);
    const bodyRef = useRef<HTMLDivElement>(null);

    // クリップボードAPIが権限で弾かれる環境(iOSの一部/埋め込み)向けに、
    // execCommand → それも駄目なら本文を範囲選択して手動コピーできる状態にする。
    const copy = async () => {
        const flash = () => { setDone(true); setTimeout(() => setDone(false), 1600); };
        try {
            await navigator.clipboard.writeText(text);
            flash();
            return;
        } catch { /* 次の手段へ */ }
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.style.position = 'fixed';
            ta.style.opacity = '0';
            document.body.appendChild(ta);
            ta.select();
            const ok = document.execCommand('copy');
            document.body.removeChild(ta);
            if (ok) { flash(); return; }
        } catch { /* 最後の手段へ */ }
        // 手動コピー用に本文を選択状態にする
        const el = bodyRef.current;
        if (el) {
            const range = document.createRange();
            range.selectNodeContents(el);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    };
    return (
        <div style={{ border: `1px solid ${LINE}`, borderRadius: '10px', overflow: 'hidden', backgroundColor: '#FBF8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: `1px solid ${LINE}`, backgroundColor: '#F1ECDD' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '1.5px', color: MUTED }}>{label}</span>
                <button onClick={copy} style={{ cursor: 'pointer', backgroundColor: done ? GREEN : INK, color: '#fff', border: 'none', borderRadius: '6px', padding: '5px 14px', fontSize: '11px', fontWeight: 700 }}>
                    {done ? 'コピーした' : 'コピー'}
                </button>
            </div>
            <div ref={bodyRef} style={{ padding: '12px 14px', fontSize: '13px', lineHeight: 1.9, color: INK, whiteSpace: 'pre-wrap' }}>{text}</div>
        </div>
    );
}

// ============ モデル記事のスクショ枠 ============
function ShotBox({ no, from, what }: { no: number; from: string; what: string }) {
    return (
        <div style={{ border: `2px dashed ${GOLD}`, borderRadius: '10px', padding: '18px 16px', textAlign: 'center', backgroundColor: '#FBF6E7', margin: '14px 0' }}>
            <div style={{ fontSize: '11px', fontWeight: 900, letterSpacing: '2px', color: GOLD }}>スクショ ({no})</div>
            <div style={{ fontSize: '13.5px', fontWeight: 800, color: INK, marginTop: '5px' }}>{what}</div>
            <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '4px' }}>取り先: {from}</div>
        </div>
    );
}

function SectionH({ children }: { children: React.ReactNode }) {
    return <h2 style={{ fontFamily: SERIF, fontSize: '22px', fontWeight: 900, color: INK, margin: '0 0 4px' }}>{children}</h2>;
}
function Card({ children }: { children: React.ReactNode }) {
    return <div style={{ backgroundColor: CARD, border: `1px solid ${LINE}`, borderRadius: '14px', padding: 'clamp(18px, 4vw, 28px)', marginTop: '16px' }}>{children}</div>;
}

// ============ 構成8ブロック ============
const BLOCKS = [
    { no: 1, name: 'タイトル', write: '【今夜も通じない】第N夜 + その夜のヘッドライン', from: 'リーグの見出しをそのまま', min: 1, why: '角括弧の連載名で「またあれだ」と認知させる' },
    { no: 2, name: '1行目 = 日本語で笑える状況', write: '英語を1文字も使わず、その夜の事故を1行で書く', from: 'リーグの見出し / 本編の catchcopy', min: 1, why: '英文で始めると初心者はそこで離脱する。日本語なら全員が笑える' },
    { no: 3, name: 'あらすじ(定型)', write: '毎回一字一句同じ3行。数字だけ自動更新', from: '「毎回書くあらすじ」からコピー', min: 0, why: '毎回同じ=番組のオープニング。新規読者はここだけで状況を掴める' },
    { no: 4, name: 'ボケ 2〜3本(崩れた英文+正解)', write: 'スクショ1枚 + 地の文2行以内。正解を必ず添える', from: 'スマホ縦スクショ(ボケカード)', min: 6, why: '崩れた英文だけ置くと初心者には意味不明。正解とセットで初めて笑いになる' },
    { no: 5, name: 'ベストプレー 1本 + 初級の1フレーズ', write: 'スクショ1枚 + 「たまには決める」。初心者が今日使える1つを必ず添える', from: 'スマホ縦スクショ / 教材の初級フィルタ', min: 2, why: 'ただの下手は笑えない。そして初級を1つ入れないと初心者が手ぶらで帰る' },
    { no: 6, name: '成績(数字で締め)', write: '相場パネルのスクショ + 1行', from: 'リーグ最上部の黒パネル', min: 2, why: '芸指数の上下が連載の骨格。数字は追いたくなる' },
    { no: 7, name: '次回予告', write: 'オッズのスクショ or 引きの一文', from: 'リーグ最下部「次回予告」', min: 1, why: '賭けさせたら勝ち。翌日の記事が「答え合わせ」になる' },
    { no: 8, name: 'フッター(定型)', write: '毎回同じ締め(下のコピペ)+ ハッシュタグ', from: 'コピペ', min: 1, why: 'エンドロール。スキ/フォローの理由を自虐で言う' },
];

export default function NoteGuidePage() {
    const recap = useMemo(() => ({
        one: recapOneLine(),
        std: recapStandard(),
        status: recapStatus(),
        full: recapFull(),
        footer: recapFooter(),
        n: getRecapNumbers(),
    }), []);

    return (
        <div style={{ minHeight: '100vh', backgroundColor: PAPER, fontFamily: SANS, color: INK, padding: '0 0 90px' }}>
            {/* ツールバー */}
            <div style={{ backgroundColor: INK, color: '#fff', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Link href="/english/tonight" style={{ color: GOLD_HI, textDecoration: 'none', fontSize: '13px', fontWeight: 700 }}>← 番組へ</Link>
                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '2px' }}>note投稿の型</span>
                </div>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>1本15分</span>
            </div>

            <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 14px' }}>
                {/* ===== ヘッダー ===== */}
                <div style={{ backgroundColor: INK, color: '#fff', borderRadius: '0 0 16px 16px', padding: 'clamp(24px, 5vw, 40px) clamp(20px, 5vw, 38px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', color: GOLD_HI }}>制作マニュアル</div>
                    <h1 style={{ fontFamily: SERIF, fontSize: 'clamp(26px, 6.5vw, 42px)', fontWeight: 900, lineHeight: 1.25, margin: '10px 0 0' }}>
                        スクショを貼る順番まで、<br />ぜんぶ決めてある。
                    </h1>
                    <p style={{ fontSize: '13.5px', lineHeight: 1.9, color: 'rgba(255,255,255,0.85)', marginTop: '14px', margin: '14px 0 0' }}>
                        考えるのは地の文のツッコミだけ。構成・導入・締めは毎回同じ型を使う。
                        型が同じだから連載になり、連載だからファンがつく。1本15分。
                    </p>
                </div>

                {/* ===== 毎回書くあらすじ(最重要) ===== */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <SectionH>毎回書くあらすじ</SectionH>
                        <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1px', color: '#fff', backgroundColor: RED, borderRadius: '999px', padding: '3px 10px' }}>数字は自動で最新</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 14px', lineHeight: 1.8 }}>
                        連載物は、毎回「これは何の話か」を書かないと新規読者が入れない。だが毎回考えていると続かない。
                        だから型を固定して、数字だけ自動で更新する。<b style={{ color: INK }}>基本は3行版を毎回そのまま貼るだけ。</b>
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div>
                            <div style={{ fontSize: '11.5px', fontWeight: 800, color: INK, marginBottom: '5px' }}>
                                ① 3行版 — <span style={{ color: RED }}>毎回これを冒頭に貼る</span>
                            </div>
                            <CopyBlock label="標準あらすじ (第1ボケの直後)" text={recap.std} />
                        </div>
                        <div>
                            <div style={{ fontSize: '11.5px', fontWeight: 800, color: INK, marginBottom: '5px' }}>② 戦況の1行 — あらすじの直後、または記事末尾</div>
                            <CopyBlock label="戦況" text={recap.status} />
                        </div>
                        <div>
                            <div style={{ fontSize: '11.5px', fontWeight: 800, color: INK, marginBottom: '5px' }}>③ 1行版 — X投稿・OGP・サムネの一言</div>
                            <CopyBlock label="1行あらすじ" text={recap.one} />
                        </div>
                        <div>
                            <div style={{ fontSize: '11.5px', fontWeight: 800, color: INK, marginBottom: '5px' }}>④ フル版 — マガジン説明文・プロフィール・第1回だけ本文に</div>
                            <CopyBlock label="初見向けフル" text={recap.full} />
                        </div>
                    </div>

                    <div style={{ marginTop: '14px', backgroundColor: '#FBF6E7', border: '1px solid #E8D9A8', borderRadius: '9px', padding: '12px 15px' }}>
                        <div style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '2px', color: GOLD }}>今の数字(自動)</div>
                        <div style={{ fontSize: '12.5px', color: INK, marginTop: '5px', lineHeight: 1.8 }}>
                            第{recap.n.night}夜 / 冠詞a {recap.n.aWin}勝{recap.n.aLose}敗({recap.n.aStreak}夜連続欠勤中) / 捏造語 {recap.n.monsters}体 / 読者の表現 {recap.n.expressions}個
                        </div>
                        <div style={{ fontSize: '11px', color: MUTED, marginTop: '6px', lineHeight: 1.7 }}>
                            ※ 新しい夜を登録すると、上の定型文の数字も自動で書き換わる。毎回このページからコピーすれば数字は常に正しい。
                        </div>
                    </div>
                </Card>

                {/* ===== 内容の3層(構成の前提) ===== */}
                <Card>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <SectionH>内容は3層で書く</SectionH>
                        <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1px', color: '#fff', backgroundColor: GREEN, borderRadius: '999px', padding: '3px 10px' }}>初心者を置き去りにしない</span>
                    </div>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 14px', lineHeight: 1.85 }}>
                        入口を作っても、記事の中身が上級者専用なら意味が無い。
                        <b style={{ color: INK }}>1行目を英文にした瞬間、初心者はそこで離脱する。</b>
                        だが幸い、この番組の笑いは元から3層に分かれている。順番を守るだけでいい。
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {CONTENT_LAYERS.map((l) => (
                            <div key={l.no} style={{ border: `1px solid ${LINE}`, borderLeft: `5px solid ${l.no === 1 ? GREEN : l.no === 2 ? GOLD : RED}`, borderRadius: '10px', padding: '13px 15px', backgroundColor: '#FDFBF5' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '9px', flexWrap: 'wrap' }}>
                                    <span style={{ fontFamily: SERIF, fontSize: '20px', fontWeight: 900, color: l.no === 1 ? GREEN : l.no === 2 ? GOLD : RED }}>{l.no}</span>
                                    <span style={{ fontSize: '14.5px', fontWeight: 800, color: INK }}>{l.name}</span>
                                    <span style={{ fontSize: '11px', color: MUTED }}>— {l.who}</span>
                                </div>
                                <div style={{ fontSize: '12.5px', color: INK, marginTop: '6px', lineHeight: 1.8 }}>{l.what}</div>
                                <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '5px', lineHeight: 1.7, fontStyle: 'italic' }}>例: {l.example}</div>
                                <div style={{ fontSize: '11.5px', color: '#166534', marginTop: '6px', lineHeight: 1.7, borderTop: `1px solid ${LINE}`, paddingTop: '6px' }}>{l.rule}</div>
                            </div>
                        ))}
                    </div>
                    <p style={{ fontSize: '12.5px', color: INK, marginTop: '12px', lineHeight: 1.85, fontWeight: 600 }}>{CONTENT_LAYERS_NOTE}</p>
                </Card>

                {/* ===== 構成8ブロック ===== */}
                <Card>
                    <SectionH>構成 — この順番で貼るだけ</SectionH>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 14px' }}>合計15分。スクショは4〜5枚。</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                        {BLOCKS.map((b) => (
                            <div key={b.no} style={{ display: 'flex', gap: '13px', border: `1px solid ${LINE}`, borderRadius: '10px', padding: '12px 14px', backgroundColor: '#FDFBF5' }}>
                                <div style={{ fontFamily: SERIF, fontSize: '24px', fontWeight: 900, color: GOLD, minWidth: '30px', lineHeight: 1.1 }}>{b.no}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 800, color: INK }}>{b.name}</span>
                                        <span style={{ fontSize: '11px', color: MUTED, fontWeight: 700 }}>{b.min > 0 ? `約${b.min}分` : 'コピペ'}</span>
                                    </div>
                                    <div style={{ fontSize: '12.5px', color: INK, marginTop: '3px', lineHeight: 1.7 }}>{b.write}</div>
                                    <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '2px' }}>素材: {b.from}</div>
                                    <div style={{ fontSize: '11.5px', color: '#166534', marginTop: '4px', lineHeight: 1.6 }}>なぜ — {b.why}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ===== スクショの取り先 ===== */}
                <Card>
                    <SectionH>スクショの取り先 — 3ページだけ</SectionH>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px', marginTop: '12px' }}>
                        {[
                            { href: '/english/tonight/screens', label: 'スマホ縦スクショ (PNG書き出し)', use: 'ボケカード / ベストプレー (ブロック4・5)。高解像度PNGで保存' },
                            { href: '/english/tonight/league', label: 'とにおリーグ', use: '相場パネル / 次回オッズ (ブロック6・7)' },
                            { href: '/english/tonight/cards', label: 'カード書き出し', use: '横長が欲しいときの代替' },
                        ].map((s) => (
                            <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
                                <div style={{ border: `1px solid ${LINE}`, borderTop: `3px solid ${GOLD}`, borderRadius: '9px', padding: '13px 15px', backgroundColor: PAPER, height: '100%' }}>
                                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: INK }}>{s.label} →</div>
                                    <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '4px', lineHeight: 1.6 }}>{s.use}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <p style={{ fontSize: '11.5px', color: MUTED, marginTop: '10px', marginBottom: 0 }}>
                        リーグは URL 末尾に「?night=夜番号」でその夜に直行できる。例: /english/tonight/league?night=49
                    </p>
                </Card>

                {/* ===== コピペ定型文 ===== */}
                <Card>
                    <SectionH>コピペ定型文</SectionH>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 14px' }}>導入とフッターは毎回一字一句同じでいい。同じだから番組になる。</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <CopyBlock label="タイトルの型 (Nと見出しだけ差し替え)" text={TPL_TITLE} />
                        <CopyBlock label="フッター (毎回同じ)" text={recap.footer} />
                        <CopyBlock label="ハッシュタグ" text="#英語学習 #DMM英会話 #英会話 #英語 #学習記録" />
                    </div>
                    <div style={{ fontSize: '11.5px', color: MUTED, marginTop: '10px' }}>
                        ※ 導入(あらすじ)は上の「毎回書くあらすじ」から。数字が自動で入る分、こちらが本体。
                    </div>
                </Card>

                {/* ===== モデル記事 ===== */}
                <Card>
                    <SectionH>モデル記事 — 第49夜で書くとこうなる</SectionH>
                    <p style={{ fontSize: '12.5px', color: MUTED, margin: '4px 0 16px' }}>点線の枠 = スクショを貼る場所。それ以外の文はこのまま使える文体見本。</p>

                    <div style={{ border: `1px solid ${LINE}`, borderRadius: '12px', padding: 'clamp(16px, 4vw, 26px)', backgroundColor: '#FDFCF8' }}>
                        {/* タイトル */}
                        <div style={{ fontFamily: SERIF, fontSize: 'clamp(19px, 4vw, 24px)', fontWeight: 900, lineHeight: 1.45, color: INK }}>
                            【今夜も通じない】第49夜 あの接続詞は、ダクトテープだ
                        </div>

                        {/* 1行目フック(1層目 = 日本語だけで笑える状況) */}
                        <div style={{ fontFamily: SERIF, fontSize: '17px', fontWeight: 700, color: INK, marginTop: '20px', lineHeight: 1.75 }}>
                            経済の記事を教材に選んだ男の、開口一番が「経済には一切興味が無い」だった。
                        </div>
                        <p style={{ fontSize: '13.5px', lineHeight: 2, margin: '8px 0 0' }}>
                            準備はしてきた。興味だけが無かった。
                        </p>
                        <div style={{ fontSize: '11px', color: '#166534', fontWeight: 800, marginTop: '7px' }}>
                            ↑ ここまで英語ゼロ。英語力に関係なく笑える(1層目)
                        </div>

                        {/* 導入定型(=毎回のあらすじ) */}
                        <p style={{ fontSize: '13.5px', lineHeight: 2, margin: '16px 0 0', color: INK, whiteSpace: 'pre-wrap' }}>
                            {recapStandard(49)}
                        </p>

                        <ShotBox no={1} from="スマホ縦スクショ ?night=49" what="ボケカード1枚目(崩れた英文 + 正解がセットで写る)" />
                        <p style={{ fontSize: '13.5px', lineHeight: 2, margin: 0 }}>
                            実際に口から出たのは <b>&ldquo;I don&apos;t give a damn about the economy.&rdquo;</b>。
                            教材を読み込んだうえでの全面拒否である。
                        </p>
                        <div style={{ fontSize: '11px', color: GOLD, fontWeight: 800, marginTop: '6px' }}>
                            ↑ ここから英語(2層目)。1層目で笑った人が「そういうことか」と繋がる
                        </div>

                        <ShotBox no={2} from="スマホ縦スクショ ?night=49" what="ボケカード2枚目(戦争→埼玉の職人の因果チェーン)" />
                        <p style={{ fontSize: '13.5px', lineHeight: 2, margin: 0 }}>
                            中東の戦争の被害として、埼玉の職人が家で酒を飲んでいる光景が提出された。因果の鎖は正しい。最終地点だけ解像度が異様に高い。
                        </p>

                        <ShotBox no={3} from="スマホ縦スクショ ?night=49" what="ベストプレー(ダクトテープ発言)" />
                        <p style={{ fontSize: '13.5px', lineHeight: 2, margin: 0 }}>
                            そして今夜も、一発だけ決める。試験の接続詞を「ダクトテープだ、どんなゴミ意見でも貼り合わせられる」と言い切った。
                            4ヶ月後にその試験を受けるのは、本人である。
                        </p>

                        <ShotBox no={4} from="リーグ ?night=49 最上部の黒パネル" what="醜態相場(芸指数 29,070 / 前夜比 +910 / S判定)" />
                        <p style={{ fontSize: '13.5px', lineHeight: 2, margin: 0 }}>
                            今夜の芸指数は29,070。前夜比プラス910でS判定。壊れるほど上がる株は、世界でこれだけだ。
                        </p>

                        <ShotBox no={5} from="リーグ ?night=49 最下部" what="次回予告のオッズ(受付中)" />
                        <p style={{ fontSize: '13.5px', lineHeight: 2, margin: 0 }}>
                            明日もどこかで25分、壊れる。オッズは「新語爆誕 ×3.0」。張って待て。
                        </p>

                        {/* 戦況 + フッター定型 */}
                        <div style={{ borderTop: `1px solid ${LINE}`, marginTop: '20px', paddingTop: '14px' }}>
                            <p style={{ fontSize: '12.5px', lineHeight: 1.9, color: INK, margin: '0 0 10px', fontWeight: 600 }}>
                                {recapStatus(49)}
                            </p>
                            <p style={{ fontSize: '13px', lineHeight: 2, color: MUTED, margin: 0, whiteSpace: 'pre-wrap' }}>
                                {recap.footer}
                            </p>
                        </div>
                    </div>
                </Card>

                {/* ===== ファンが増える理屈 ===== */}
                <Card>
                    <SectionH>なぜこの順番なのか — 5ヶ条</SectionH>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                        {[
                            ['1行目は英語のボケ', '読者は3秒で去る。挨拶・近況・前置きから始めた記事は、その時点で読まれていない。'],
                            ['導入とフッターは毎回同じ', '「またこの始まり方だ」が番組感。連載の中毒性は、変化ではなく様式から生まれる。'],
                            ['地の文は各スクショ2行以内', 'スクショに説明させる。あなたが書くのはツッコミとオチだけ。長い解説は笑いを殺す。'],
                            ['ベストプレーを必ず1本', 'ただ下手な人は笑えないし、応援できない。「たまに刺さる」が推される条件。刃は常に自分へ。'],
                            ['数字とオッズで締める', '芸指数の上下と賭けの答え合わせが「続き物」の骨格。読者が結果を追いはじめたら、それはもうファンだ。'],
                        ].map(([t, d], i) => (
                            <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                                <span style={{ fontFamily: SERIF, fontWeight: 900, fontSize: '18px', color: GOLD, minWidth: '22px' }}>{i + 1}</span>
                                <div>
                                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: INK }}>{t}</div>
                                    <div style={{ fontSize: '12.5px', color: MUTED, lineHeight: 1.8, marginTop: '2px' }}>{d}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ===== 節目回 ===== */}
                <Card>
                    <SectionH>節目回 — 10夜ごとの変化球</SectionH>
                    <p style={{ fontSize: '13px', lineHeight: 2, color: INK, margin: '8px 0 0' }}>
                        10夜ごと(または章の切れ目)に1本だけ「まとめ回」を挟む。通常回はファンを深くし、まとめ回は新規を拾う。
                    </p>
                    <div style={{ backgroundColor: '#FBF6E7', border: '1px solid #E8D9A8', borderRadius: '10px', padding: '14px 16px', marginTop: '12px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: GOLD, letterSpacing: '1px' }}>まとめ回の構成</div>
                        <ol style={{ fontSize: '12.5px', lineHeight: 2, color: INK, margin: '8px 0 0', paddingLeft: '18px' }}>
                            <li>タイトル: 【今夜も通じない】第N夜までの全成績を公開する</li>
                            <li>相場チャート全体のスクショ(リーグの「醜態相場 — シーズン全N夜」)</li>
                            <li>物語ページの章あらすじスクショ(現在の章まで)</li>
                            <li>この10夜のワースト3ボケを再掲(過去記事へのリンク付き=回遊)</li>
                            <li>フッター定型で締め</li>
                        </ol>
                    </div>
                </Card>

                {/* ===== チェックリスト ===== */}
                <Card>
                    <SectionH>投稿前チェック</SectionH>
                    <ul style={{ fontSize: '13px', lineHeight: 2.2, color: INK, margin: '10px 0 0', paddingLeft: '20px' }}>
                        <li>タイトルは【今夜も通じない】第N夜 + 見出しになっているか</li>
                        <li>1行目が英語のボケか(挨拶で始まっていないか)</li>
                        <li>スクショは4〜5枚か(多すぎたら削る)</li>
                        <li>地の文は各スクショ2行以内か</li>
                        <li>ベストプレーが1本入っているか</li>
                        <li>成績スクショ+次回への引きで締めたか</li>
                        <li>刃が自分に向いているか(講師・他人を落としていないか)</li>
                        <li>絵文字ゼロか</li>
                    </ul>
                </Card>

                {/* ===== 導線 ===== */}
                <div style={{ marginTop: '20px', backgroundColor: INK, color: '#fff', borderRadius: '14px', padding: 'clamp(20px, 4vw, 30px)', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>では、書く。素材はここから:</span>
                    <Link href="/english/tonight/screens" style={{ backgroundColor: GOLD, color: INK, fontWeight: 900, fontSize: '13px', padding: '10px 20px', borderRadius: '9px', textDecoration: 'none' }}>スマホ縦スクショ</Link>
                    <Link href="/english/tonight/league" style={{ color: GOLD_HI, fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>とにおリーグ →</Link>
                </div>
            </div>
        </div>
    );
}
