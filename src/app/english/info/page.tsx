/**
 * 使い方・案内(補助メニュー)
 *
 * 毎日の練習画面に並べないものをここに集める:
 *   使い方 / 保存と音声のこと / サイトの説明 / 読み物 / 講座・サービス / 設定 / 問い合わせ
 * 練習を始める条件にはしない。
 */

import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell, Kicker, H1, H2, LinkRow, Footnote, C } from '@/components/english/public/ui';

export const metadata: Metadata = {
    title: '使い方・案内 | とにおラボ',
    description: 'とにおラボの英語練習の使い方、記録の保存のしくみ、音声について、読み物・講座・サービスの案内、問い合わせ先。',
    alternates: { canonical: '/english/info' },
};

export default function InfoPage() {
    return (
        <PageShell>
            <Kicker>TONIO LAB ・ 案内</Kicker>
            <H1 sub="練習に必要なことだけ先に。読み物や講座はその下にあります。">使い方・案内</H1>

            <H2>使い方</H2>
            <ol className="grid gap-2 text-[13.5px] leading-relaxed" style={{ color: C.body }}>
                {[
                    ['今日の練習を開く', '「練習をはじめる」を押す。教材も設定も選ばなくて始められます。最初は5問。'],
                    ['日本語を見て、英語で言ってみる', '声に出すのがいちばん効きます。言えなくても大丈夫。「英語を見る」で答えを確かめ、音声も聞けます。'],
                    ['自分で評価する', 'すぐ言えた / 少し迷った / 出てこなかった の3つ。迷った表現と出てこなかった表現は、間をあけてもう一度出ます。'],
                    ['翌日またここへ', '復習が先に出て、そのあと新しい表現が続きます。1セット10問前後、終わると「今日はここまで」。'],
                ].map(([t, d], i) => (
                    <li key={t} className="rounded-xl border bg-white px-4 py-3 flex gap-3" style={{ borderColor: C.line }}>
                        <span className="shrink-0 w-6 h-6 rounded-full text-[12px] font-black inline-flex items-center justify-center" style={{ background: C.gold, color: C.ink }}>{i + 1}</span>
                        <span><span className="block font-bold" style={{ color: C.ink }}>{t}</span>{d}</span>
                    </li>
                ))}
            </ol>

            <H2>記録と保存について</H2>
            <div className="rounded-xl border bg-white px-4 py-4 text-[13px] leading-relaxed grid gap-2" style={{ borderColor: C.line, color: C.body }}>
                <p>無料・登録不要です。練習の記録はこの端末のブラウザの中(localStorage)にだけ保存され、サーバには送られません。</p>
                <p>そのため、別の端末やブラウザには引き継がれません。ブラウザのデータを消すと記録も消えます。端末間の同期機能はありません。</p>
                <p>「すぐ言えた」などの数字は自己評価の回数です。英語力や習得の判定ではなく、復習の順番を決めるために使っています。</p>
                <p>音声は端末のブラウザの読み上げ機能(音声合成)を使います。対応していない端末では音声ボタンが使えませんが、文字で練習できます。</p>
            </div>

            <H2>このサイトについて</H2>
            <div className="grid gap-2">
                <LinkRow href="/english/about" title="ここにあるもの、全部の説明" desc="何を数えて、何を作って、どういう順番で使うと効くのか。日本語で7分。" />
                <LinkRow href="/english/speaking-guide" title="話せるようになるまでの考え方" desc="なぜ話せないのか、目標をどう置くか、6段階の手順。" />
            </div>

            <H2 note="作者の記事や番組">読み物</H2>
            <div className="grid gap-2">
                <LinkRow href="/english/dmm-open" title="DMM英会話 音源と原稿の公開レッスン" desc="作者の25分のレッスンを、崩れた英語ごと1行ずつの直しつきで。" />
                <LinkRow href="/english/journal" title="英語ジャーナル" desc="毎日の記事から英語の表現を取り出して解説。" />
                <LinkRow href="/memoria" title="メモリア" desc="会話を聞いて追う物語プレーヤー。" />
                <LinkRow href="/english/requiem" title="レクイエム(単語レビュー)" desc="日ごとの単語を物語の文で聞く。" />
                <LinkRow href="/english/note" title="note の記事一覧" desc="作者が note に書いた英語の記事。" />
                <LinkRow href="/english/grind" title="GRIND 365(作者の勉強動画ログ)" desc="作者が1日1本あげている勉強動画の記録。あなたの記録ではありません。" />
            </div>

            <H2 note="料金や内容はそれぞれのページに">講座・サービス</H2>
            <div className="grid gap-2">
                <LinkRow href="/english/coach" title="コーチング(28日)" desc="話せないコーチが28日つきあう。根拠と手順を公開。" />
                <LinkRow href="/membership" title="メンバーシップ" desc="作りかけも全部見せる。要望がそのまま次の機能になる。" />
                <LinkRow href="/english/stack/demo" title="TONIO STACK(自分の英語アプリを建てる)" desc="コードは書かない。全部 Claude Code に日本語で頼む全12回。" />
                <LinkRow href="/english/service" title="1対1の英会話サービス" desc="作者と1回ずつ話す。" />
            </div>

            <H2>設定・そのほか</H2>
            <div className="grid gap-2">
                <LinkRow href="/english/settings" title="設定" desc="音の有無、進捗のリセット。" />
                <LinkRow href="/install" title="ホーム画面に追加" desc="アプリのように開く手順。容量はほぼゼロ。" />
                <LinkRow href="https://note.com/tonio_english" external title="問い合わせ(note)" desc="不具合や要望は note の記事へのコメント、またはクリエイターページから。" />
            </div>

            <Footnote>
                公開版の名称は「とにおラボ / TONIO LAB」です。トップへ戻る: <Link href="/english/home" style={{ color: C.deepGold }}>今日の練習</Link>
            </Footnote>
        </PageShell>
    );
}
