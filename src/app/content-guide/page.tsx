'use client'

import { motion } from 'framer-motion'
import Header from '@/components/lp/Header'
import Footer from '@/components/lp/Footer'
import { Section, Label, GoldLabel, H2, P, Accent, Code, GoldCode, Rule, Feature, Stat, f, PageHeader } from '@/components/lp/shared'

export default function ContentGuidePage() {
    return (
        <div className="min-h-screen bg-white text-[#252423]">
            <Header />
            <PageHeader label="CONTENT" title="7シナリオ、310表現、15,000単語。全部、人間が喋ってる英語。" />

            {/* ━━━ MEMORIA ━━━ */}
            <div id="memoria" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>MEMORIA</GoldLabel>
                <H2>ネイティブの「本物の会話」を構造ごと再現する。</H2>

                <P>7つのシナリオ、35日分の会話。各シナリオ5日間、毎日30-40行の英語+日本語対訳。キャラクター40人以上、全員の喋り方が違う。4歳の男の子（Timmy）と68歳のおじいさん（Frank）では語彙もリズムも全然違う。</P>

                <P>全ての会話は「7つの構造ルール」に従って書いてある。60%以上の機能語、5-8行ごとの認知マーカー、4節以上の接着剤チェーン、70-80%のg-dropping。AIが生成した「カジュアルっぽい英語」とは構造レベルで違う。</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">CONVERSATION EXAMPLE</motion.p>
                <Code>
                    <span className="text-[#DC2626] font-bold">Marcus:</span> I mean, Naylor right? The extension? Like that was -- that was the move, honestly...<br /><br />
                    <span className="text-[#0284C7] font-bold">Kai:</span> No no, see that&apos;s -- OK so here&apos;s the thing though, right? Like you&apos;re thinkin&apos; about it from a Cardinals perspective but from a Mariners standpoint? Dude...
                </Code>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-10">CHARACTER ROSTER</motion.p>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { name: 'Timmy', age: '4M', scenario: 'Monster Under the Bed', pattern: '短い文。"the"の代わりに"da"。false startが多い。' },
                        { name: 'Frank', age: '68M', scenario: 'Monster Under the Bed', pattern: '長い回想。"Well now"で始まる。フォーマルな語彙。' },
                        { name: 'Kayla', age: '16F', scenario: 'Monster Under the Bed', pattern: 'ティーンスラング。"like"と"literally"が多い。' },
                        { name: 'Marcus', age: '28M', scenario: 'Game Night Gone Wrong', pattern: '熱い。長い文。エスカレーション。' },
                        { name: 'Jess', age: '29F', scenario: 'Game Night Gone Wrong', pattern: '冷静。短い反応。許可サンドイッチ。' },
                        { name: 'Kai', age: '--M', scenario: 'Mariners Trade Talk', pattern: 'マリナーズファン。"dude"が口癖。興奮すると文が長くなる。' },
                        { name: 'Marcus (host)', age: '--M', scenario: 'Mariners Trade Talk', pattern: 'カージナルズファン。ホスト役で短い反応が多い。' },
                        { name: 'Mrs. Chen', age: '42F', scenario: 'First Movie', pattern: '母親。心配性。"Just promise me..."で始める。' },
                        { name: 'Old Man Gus', age: '70M', scenario: 'First Movie', pattern: '映画館のおじさん。"Back in my day"型の懐古。' },
                    ].map((row) => (
                        <div key={row.name + row.scenario} className="flex items-start gap-2 py-2.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="font-bold w-28 shrink-0 text-sm">{row.name}</span>
                            <span className="font-mono text-[#252423]/30 w-8 shrink-0 text-xs pt-0.5">{row.age}</span>
                            <span className="text-[#D4AF37] w-36 shrink-0 text-xs pt-0.5">{row.scenario}</span>
                            <span className="text-[11px] text-[#252423]/50">{row.pattern}</span>
                        </div>
                    ))}
                </motion.div>

                <motion.p variants={f} className="text-xs text-gray-400 tracking-widest font-bold mb-3 mt-8">SCENARIOS</motion.p>
                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { name: 'College Party', location: '東京' },
                        { name: 'Monster Under the Bed', location: 'LA' },
                        { name: 'Mariners Trade Talk', location: 'シアトル' },
                        { name: 'First Movie Without Parents', location: 'ニューヨーク' },
                        { name: 'Game Night Gone Wrong', location: 'ロンドン' },
                        { name: 'Antiques House Call', location: 'パリ' },
                        { name: 'Bucket List Trip', location: '--' },
                    ].map((s) => (
                        <div key={s.name} className="flex items-baseline gap-3 py-2 border-b border-[#DAE2E8] last:border-0">
                            <span className="text-sm font-bold">{s.name}</span>
                            <span className="text-[11px] text-[#252423]/40 font-mono">{s.location}</span>
                        </div>
                    ))}
                </motion.div>

                <P>各シナリオに75表現。ディープリンク対応（?line=5&autoplay=true）。Web Speech API for TTS。</P>
            </Section>

            {/* ━━━ REQUIEM ━━━ */}
            <div id="requiem" className="scroll-mt-20" />
            <Section>
                <Label>REQUIEM</Label>
                <H2>15,000単語。15,000イディオム。一度も重複しない。</H2>

                <P>1日10単語。1単語に1例文と1ボーナスイディオム。約4年分。15,000のイディオムは全てユニーク。used-idioms.jsonで重複チェック。</P>

                <P>全ての例文は「誰かが実際に喋っている文」。ナレーションは1つもない。</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">EXAMPLE ENTRY</motion.p>
                <GoldCode>
                    <span className="text-[#252423]/40 text-xs block mb-2">word: reluctant</span>
                    <span className="text-[#252423]/40 text-xs block mb-2">speaker: Jess, 29, accountant</span>
                    <span className="block mb-2">&quot;I was kinda reluctant at first, but honestly? Best decision I ever made.&quot;</span>
                    <span className="text-[#252423]/40 text-xs block">idiom: drag one&apos;s feet -- 「ぐずぐずする」</span>
                </GoldCode>

                <P>50単語 = 1シナリオ = 5日間。キャラクター設定付きプロローグ。</P>

                <P>ハブビューとカレンダービューの2画面。</P>
            </Section>

            {/* ━━━ 俺語録 ━━━ */}
            <div id="goroku" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <GoldLabel>俺語録</GoldLabel>
                <H2>「翻訳するな、人間を翻訳しろ」</H2>

                <P>310の日本語表現を、直訳ではなく、ネイティブが本当に言う英語に変換する。</P>

                <P>6カテゴリ: reaction(gold), request(green), opinion(blue), suggestion(purple), filler(amber), shutdown(red)。</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">EXAMPLES</motion.p>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { ja: '朝が存在しない', en: "I don't do mornings", pattern: 'レンガ積み', context: '「do」は便利すぎて禁止にしたいレベル。"I don\'t do X"で「Xは無理」。直訳の"mornings don\'t exist"より100倍自然。' },
                        { ja: 'それ、聞いてない', en: 'Nobody asked', pattern: '哲学トラップドア', context: '2語で完結する英語の鋭さ。日本語の「聞いてない」は主語が曖昧だけど、英語は"nobody"で全員巻き込む。' },
                        { ja: 'まあ、いっか', en: 'It is what it is', pattern: '許可サンドイッチ', context: '直訳すると「それはそれ」。意味不明なのに全米で通じる最強フレーズ。諦めと受容の間。' },
                        { ja: '絶対やだ', en: 'Hard pass', pattern: 'エスカレーション梯子', context: 'passだけで「遠慮する」。hardをつけると「絶対に無理」。2語で拒否の温度が伝わる。' },
                    ].map((row) => (
                        <div key={row.ja} className="py-3 border-b border-[#DAE2E8] last:border-0">
                            <div className="flex items-baseline gap-2 flex-wrap">
                                <span className="font-bold text-sm">{row.ja}</span>
                                <span className="text-[#252423]/30">→</span>
                                <span className="font-mono text-[#252423]/70 text-sm">{row.en}</span>
                                <span className="text-[9px] text-[#D4AF37] tracking-wider ml-auto">{row.pattern}</span>
                            </div>
                            <p className="text-[11px] text-[#252423]/40 mt-1 leading-relaxed">{row.context}</p>
                        </div>
                    ))}
                </motion.div>

                <P>コンテキストフィールドが核。居酒屋テンション。</P>

                <P>カレンダーUI。31スロット。音声合成。マスタリーはバイナリ。</P>
            </Section>

            {/* ━━━ PRO ━━━ */}
            <div id="pro" className="scroll-mt-20" />
            <Section>
                <Label>PRO</Label>
                <H2>毎日の日記から、4-6個の表現を抜き出して教える。</H2>

                <P>133+エントリ。居酒屋のトーンで解説。</P>

                <P>フォーマット: 「Expression -- 日本語訳」。英語3段落+日本語3段落。Entry #130がゴールドスタンダード。</P>

                <P>トラックベースの再生。速度調整、シャッフル、リピート、ブックマーク。</P>
            </Section>

            {/* ━━━ QUEST ━━━ */}
            <div id="quest" className="scroll-mt-20" />
            <Section bg="bg-[#F5F5F7]">
                <Label>QUEST</Label>
                <H2>草むらでフレーズに出会う。</H2>

                <P>ポケモンの草むら。「Wild phrase appeared!」。GETする。</P>

                <P>現在125語（Day 1-5）。12カテゴリ。</P>

                <motion.p variants={f} className="text-xs text-[#D4AF37] tracking-widest font-bold mb-4 mt-8">QUEST CATEGORIES</motion.p>

                <motion.div variants={f} className="space-y-0 mb-8">
                    {[
                        { color: '#EF4444', label: 'blind', id: '知ってるつもり', desc: 'False Friends' },
                        { color: '#F97316', label: 'katakana', id: 'カタカナの嘘', desc: '和製英語トラップ' },
                        { color: '#8B5CF6', label: 'nogap', id: '日本語にない感覚', desc: '翻訳不可能' },
                        { color: '#3B82F6', label: 'glue', id: 'つなぎ言葉', desc: 'well, actually, basically' },
                        { color: '#D4AF37', label: 'core', id: '超基本なのに', desc: 'get, take, make' },
                        { color: '#EC4899', label: 'feel', id: '感情・感覚', desc: 'frustrated, overwhelmed' },
                        { color: '#10B981', label: 'daily', id: '毎日の動作', desc: 'grab, toss, sneak' },
                        { color: '#06B6D4', label: 'think', id: '考える系', desc: 'figure out, come up with' },
                        { color: '#DC2626', label: 'social', id: '人間関係', desc: 'hang out, catch up' },
                        { color: '#7C3AED', label: 'power', id: '万能ワード', desc: 'stuff, thing, deal' },
                    ].map((cat) => (
                        <div key={cat.label} className="flex items-center gap-3 py-2.5 border-b border-[#DAE2E8] last:border-0">
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                            <span className="font-mono text-xs font-bold w-20 shrink-0">{cat.label}</span>
                            <span className="text-sm w-32 shrink-0">{cat.id}</span>
                            <span className="text-[11px] text-[#252423]/50">{cat.desc}</span>
                        </div>
                    ))}
                </motion.div>

                <P>Hack Connection field。ステージテーマ。</P>
            </Section>

            {/* ━━━ 英会話LAB ━━━ */}
            <div id="lab" className="scroll-mt-20" />
            <Section>
                <Label>英会話LAB</Label>
                <H2>DMM英会話の前夜に、ChatGPTと作戦会議する。</H2>

                <P>15レッスンプラン。コードネーム。難易度。ターゲット表現。</P>

                <P>コピーバー3つ: CHATGPT, CHEAT, REVIEW。</P>

                <P>Arsenal カルーセル。セッションログ。</P>
            </Section>

            <Footer />
        </div>
    )
}
