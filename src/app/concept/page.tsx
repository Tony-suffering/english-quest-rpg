'use client'

import { motion } from 'framer-motion'
import Header from '@/components/lp/Header'
import Footer from '@/components/lp/Footer'
import { Section, Label, GoldLabel, H2, P, Accent, Code, GoldCode, Rule, PageHeader, f } from '@/components/lp/shared'

export default function ConceptPage() {
    return (
        <div className="min-h-screen bg-white text-[#252423]">
            <Header />
            <PageHeader label="CONCEPT" title="テストの英語と、人が喋ってる英語は、構造がまるで違う。" />

            {/* ━━━ THE PROBLEM ━━━ */}
            <div id="problem" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>THE PROBLEM</GoldLabel>
                <H2>TOEIC 900点を取った日。</H2>
                <P>TOEIC 900点を取った日、嬉しかった。けどその翌週、ネイティブとZoomで話して3秒で詰んだ。相手が何を言ってるかは聞こえる。でも自分の口から出てくるのは、教科書の英語。正しいけど、誰もそうは喋らない英語。</P>
                <P>そこから、ネイティブのポッドキャスト（Dodgers Territory）を構造ごと分解し始めた。わかったのは、ネイティブの発話の60%以上が「意味のない単語」だということ。I mean, like, you know, right, so, basically -- こういう接着剤で文が繋がってる。教科書はこれを全部取り除いた「きれいな英語」を教えてくる。だから喋れない。</P>

                <Accent>Pellegrino (2011): あらゆる言語の情報伝達速度は約39 bits/sec に収束する。</Accent>

                <P>英語は情報密度が低い代わりにスピードが速い。日本語は情報密度が高い代わりに遅い。同じ情報量を、まったく違う構造で運んでいる。教科書はこの「構造の違い」を無視している。</P>
            </Section>

            {/* ━━━ TEXTBOOK vs REAL ━━━ */}
            <Section>
                <Label>TEXTBOOK vs REAL</Label>
                <H2>教科書の英語。誰も喋ってない。</H2>

                <motion.p variants={f} className="text-xs text-gray-400 tracking-widest font-bold mb-3">TEXTBOOK</motion.p>
                <Code>{`"I went to the store and bought some milk."`}</Code>
                <Code>{`"I think that this is a good idea."`}</Code>
                <Code>{`"Could you please pass me the salt?"`}</Code>
                <P>文法100点。テストでは満点。でもこれを喋る人間はいない。</P>

                <motion.div variants={f} className="h-6" />

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-3">REAL</motion.p>
                <GoldCode>{`"I mean, I literally just -- like, walked to the store and forgot my wallet. Classic me."`}</GoldCode>
                <GoldCode>{`"So basically what I'm sayin' is, like -- it's not bad? I dunno, it's just..."`}</GoldCode>
                <GoldCode>{`"Nah I was kinda reluctant at first, but honestly? Best decision I ever made."`}</GoldCode>
                <P>hesitation, filler, reformulation, false start, g-dropping。これがネイティブの「音響署名」。</P>
            </Section>

            {/* ━━━ 7 STRUCTURAL RULES ━━━ */}
            <div id="rules" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>7 STRUCTURAL RULES</GoldLabel>
                <H2>ネイティブの発話を支配する7つの構造ルール。</H2>
                <P>Dodgers Territory の構造分解から抽出した7つのルール。これが「教科書英語」と「本物の英語」の構造的な差分。</P>
                <div className="space-y-0">
                    <Rule
                        num="01"
                        title="情報密度: 60%以上が機能語"
                        desc="本物のスピーチは「ムダ」だらけ。I mean, like, you know, so, basically。それは効率じゃなく、足場。聞き手に処理時間を与え、話し手に方向修正の余地を残す構造。教科書はこの足場を全部取り除いている。"
                    />
                    <Rule
                        num="02"
                        title="認知マーカー: 5-8行ごとに um, uh, false start"
                        desc="考えながら喋ってる証拠。「I was -- so basically what happened was」「he hit like .280 -- well, actually more like .275」。ESL話者がこれを入れないと、暗記したテキストを読み上げてるように聞こえる。"
                    />
                    <Rule
                        num="03"
                        title="4節以上の接着剤チェーン"
                        desc="30%以上の発話が4節以上をand, but, so, I mean, becauseで繋ぐ。ネイティブは5-8節をノンストップで接着する。0.5秒の沈黙は「割り込みOK」のサイン。ESLは2-3節で止まるから、テンポが崩れる。"
                    />
                    <Rule
                        num="04"
                        title="g-dropping: 70-80%、100%ではない"
                        desc="thinkin', goin', runnin'。ただし「I'm not KIDDING」のように強調部分では戻る。文末の強調、ポーズ後、フォーマルな文脈でも戻る。100%均一なg-droppingは、逆に不自然。"
                    />
                    <Rule
                        num="05"
                        title="ターン長の振れ幅"
                        desc="20%以上が超短（1-5語: 'Yeah.' 'Right, right.' 'No way.' 'That's fair.'）。20%以上が超長（50語以上、4文以上）。テニスのラリーではない。3ターン以上同じ長さが続かない。"
                    />
                    <Rule
                        num="06"
                        title="反復と言い換え"
                        desc="大事な意見は2-3回、表現を変えて繰り返す。Statement → Elaboration → Landing（感情的なパンチ）。1回しか言わないのは、それほど重要じゃないということ。"
                    />
                    <Rule
                        num="07"
                        title="クロスターン構築"
                        desc="20%以上のターンが前の発言者の言葉を直接参照する。Echo, Rephrase, Extend, Challenge。会話は独立した文の連続ではない。"
                    />
                </div>
            </Section>

            {/* ━━━ 10 SPEECH PATTERNS ━━━ */}
            <div id="patterns" className="scroll-mt-20" />
            <Section>
                <Label>10 SPEECH PATTERNS / 会話の骨格</Label>
                <H2>ネイティブが無意識にやっている会話の「型」。</H2>
                <P>Journal #115 で書いた「会話の骨格」。ネイティブが無意識にやっている会話の「型」を10個に分類した。俺語録の310表現は全部、この10パターンのどれかに属してる。</P>
                <div className="space-y-0">
                    <Rule num="01" title="レンガ積み (Fragment Stacking)" desc="短いフラグメントを積み上げて意味を構築する。'So. Yeah. That happened.' 1文で言えることを3つに割る。日本語の「。」の使い方に近い。" />
                    <Rule num="02" title="軌道 (Orbit & Land)" desc="結論に直行せず、周回してから着地する。'I mean, it's not like I'm against it or anything, it's just -- you know what, actually yeah, I'm in.'  遠回りに見えて、実は聞き手の心理的準備を整えてる。" />
                    <Rule num="03" title="許可サンドイッチ (Hedge Sandwich)" desc="意見をヘッジで挟む。'I could be wrong but / 意見 / just my take though.' 日本語の「〜かもしれないけど」を前後に配置する英語版。" />
                    <Rule num="04" title="エスカレーション梯子 (Escalation Ladder)" desc="同じ意見を段階的に強めて繰り返す。'It's good. Like, really good. Honestly? It's probably the best thing I've seen all year.'  控えめ→中→強。" />
                    <Rule num="05" title="哲学トラップドア (Philosophy Trapdoor)" desc="日常の話題から急に深みへ落ちる。'So I'm making coffee this morning and I just -- I dunno, you ever think about how we're all just... doing this? Every day? Like, what is this?'" />
                    <Rule num="06" title="聴衆マルチプレックス (Audience Multiplex)" desc="複数の聞き手に順番にアドレスする。'And Marcus, you know what I'm talkin' about -- but Kai, man, you gotta hear this part --' ポッドキャストで特に多い。" />
                    <Rule num="07" title="メタ実況 (Meta Commentary)" desc="自分の発言を実況する。'OK I know this sounds crazy but hear me out.' 'I'm about to say something controversial.' 発言の「予告編」。" />
                    <Rule num="08" title="だからの川 (5-Way Connector)" desc="日本語の「だから」が英語では5つに分岐する。so（結果）/ basically（要約）/ see?（確認）/ like（例示）/ anyway（軌道修正）。1つの接続詞を5つに使い分ける。" />
                    <Rule num="09" title="未完成の招待 (Trailing Invitation)" desc="文を未完成で終わらせて、相手に完成させる。'So if we could just...' 'I mean, it's not like...' 沈黙が誘い。日本語の「〜じゃないですか」の英語版。" />
                    <Rule num="10" title="英語質問爆弾 (Self-Q&A Walk)" desc="自分で質問して自分で答える。'Do I think it's worth it? Absolutely. Am I nervous? Sure. But am I gonna do it? Yeah. Yeah I am.' 独り問答で説得力を作る。" />
                </div>
            </Section>

            {/* ━━━ RPG DESIGN PHILOSOPHY ━━━ */}
            <div id="philosophy" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>RPG DESIGN PHILOSOPHY</GoldLabel>
                <H2>「ゼロは存在しない」</H2>
                <P>このアプリの設計思想は「0は存在しない」。ガチャでハズレても+1GP。間違えてもカードXPが入る。レビューをスキップしても「スキップした」という記録が残る。何をやっても前に進む。何もしないことだけが後退。</P>
                <P>英語学習で一番つらいのは「やったのに成果が見えない」こと。TOEICのスコアが変わらない。会話が上手くならない。でもカードが進化してれば、レベルが上がってれば、少なくとも「やった」という証拠がある。成長が可視化されてれば、続けられる。</P>

                <Accent>ポケモンは世界共通言語。「進化」「御三家」「色違い」「ジムリーダー」。これを30年間、全世代が共有してる。だからポケモンのメタファーを使う。</Accent>

                <motion.div variants={f} className="mb-8">
                    <p className="text-xs text-[#D4AF37] tracking-widest font-bold mb-3">御三家 (STARTER 3)</p>
                    <div className="space-y-2">
                        {[
                            ['YOU KNOW', 'つなぎ型', '共感・接続。相手との距離を縮める。「わかるでしょ？」の空気を作る。'],
                            ['I MEAN', '修正型', '言い直し・精密化。「つまりさ」「というか」。思考の軌道修正。'],
                            ['SO', '接続型', '展開・推進。話を前に進める燃料。「で、」「だから、」「つまり、」。'],
                        ].map(([word, type, desc]) => (
                            <div key={word} className="flex gap-4 py-3 border-b border-[#DAE2E8]">
                                <span className="text-sm font-black text-[#D4AF37] w-24 shrink-0">{word}</span>
                                <div>
                                    <span className="text-xs text-[#252423]/40">{type}</span>
                                    <p className="text-xs text-[#252423]/60 mt-0.5">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <P>カード経験値（Card XP）とGP（ギャンブルポイント）は完全に分離している。Card XPは英語力の成長。GPはスロットマシンのドーパミン。GPを稼いでも英語力は上がらない。でも「スロットを回すためにレビューする」→「レビューしたからCard XPが貯まる」→「英語力が上がる」。パチンコの仕組みで英語を学ぶ。意識的に設計した。</P>
            </Section>

            <Footer />
        </div>
    )
}
