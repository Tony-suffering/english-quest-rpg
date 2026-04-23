import type { Native365Day } from '@/types/native365';

/**
 * Day 25
 *
 * 発音: actually の発音と機能 -- schwa 化、discourse marker、訂正の合図
 * 文法: 依頼の丁寧度 -- Can / Could / Would / Would you mind の階段
 */

export const DAY_25: Native365Day = {
    day: 25,
    week: 4,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 木曜の夜、ケンジがクライアントとの会議で 'actually' に詰まった話
    // ══════════════════════════════════════════════════
    opening: {
        scene: "木曜の夜、ケンジがアメリカ人クライアントとの電話で\"Actually, can I get back to you?\" と言われ、「実際は」で解釈して意味を取り違えた話。actually の discourse marker としての役と、依頼の丁寧度に話が飛ぶ。",
        lines: [
            { char: 'kenji',   text: "クライアントが 'Actually, can I get back to you?' って言うたんや。「実際は」で訳したら意味通らんくて固まった。" },
            { char: 'lisa',    text: "Yeah that 'actually' isn't 'in reality'. It's a soft reversal -- 'wait, let me reconsider'. Super common." },
            { char: 'takeshi', text: "で、その 'can I get back to you' の can が Could や Would やと失礼度が変わる。依頼の丁寧度、日本人が崩壊するやつ。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: actually の発音と機能
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'actually -- 「実際は」だけじゃない、方向転換の合図',
        subtitle: 'schwa 化した /ˈækʃəli/ で、内容を訂正したり話題を反転させる discourse marker。',
        intro: {
            question: 'なぜネイティブは会話中に actually を連発するのか?',
            insight: 'actually の辞書的意味は「実際は」。しかし日常会話で出てくる actually の大半は discourse marker (談話標識) で、「意外性の合図」「訂正の導入」「話題の転換」が実際の機能。日本語の「というか」「あ、やっぱり」「実は」に近い。\n\n発音も重要。/ˈæktʃuəli/ の理論発音に対し、実際は /ˈækʃəli/ や /ˈækʃli/ に崩れる。中間の tʃu が完全に schwa 化して消える。日本人は4音節で「アクチュアリー」と読むが、ネイティブは2〜3音節で /AK-shə-li/ か /AK-shli/。\n\n機能面では (1) 訂正「違う、〜だ」(2) 意外性「実は〜」(3) 丁寧な反対「いや、むしろ〜」(4) 自己訂正「あ、待って、〜」の4役。特に (3) は直接 No と言わずに反対意見を出す diplomatic device で、ビジネス英語で頻出する。今日で全役潰す。',
        },
        tldr: 'actually = /ˈækʃəli/ の3音節。discourse marker として方向転換・訂正・丁寧な反対を出す。',
        items: [
            {
                id: 'd25-p-01-actually-literal',
                label: "actually = 実際は、本当は (辞書的用法)",
                trigger: "'It's actually true.' を発音しろ。",
                points: {
                    core: { en: '/ˈækʃəli/ -- 3 syllables, not 4', ja: 'AK-shə-li の3音節で読む。中間の tʃu は schwa 化して消える。' },
                    nuance: { en: "Actually, it's true. (Emphasizes reality vs assumption)", ja: '「実際はそうなんだ」の意味。予想と現実のズレを強調。' },
                    shift: { en: "Fast speech: /ˈækʃli/ (2 syllables only)", ja: '早口ではさらに潰れて /AK-shli/ の2音節になる。' },
                    native: { en: "I know it sounds wild, but this is actually the third time he's forgotten our anniversary -- I'm genuinely done.", ja: '信じられんやろうけど、あの人が記念日忘れたの、これで本当に3回目なの。マジでもう無理。' },
                },
                trap: '「アクチュアリー」4音節で読む。英語は3音節 (崩して2音節)。',
                tip: 'tʃu を消して AK + shə + li の3音節にまとめる。それがネイティブ発音の入口。',
                reactions: {
                    master: 'actually は辞書的には副詞 (in fact)。音節数は書記上4でも実発話では3〜2に圧縮される。',
                    lisa: "'Actually' is like my default filler word. I say it fast -- /AKshli/ -- almost one syllable.",
                    takeshi: '「アクチュアリー」って4拍で読んでる限り、英語の滑らかさに追いつかん。3拍に削れ。',
                    yuki: 'actually 発音、短くしていいんや。意識して削る練習する。',
                    kenji: "'This is actually the final version' って現場で言えたら説明に深みが出る。",
                    mina: "SNS で \"actually...\" って書く時、文脈転換の合図として機能するのまさにこれ。",
                },
            },
            {
                id: 'd25-p-02-actually-correction',
                label: "actually -- 相手の言葉をやんわり訂正",
                trigger: "'Actually, it's tomorrow.' を発音しろ。",
                points: {
                    core: { en: 'Actually, + correction', ja: '文頭の actually は「違うんだけど」のクッション。直接否定を避ける。' },
                    nuance: { en: "You said Monday? Actually, it's Tuesday. (softer than 'No, it's Tuesday.')", ja: '「No」の代わりに actually で訂正に入ると柔らかい。' },
                    shift: { en: "'Oh actually...' with rising tone = polite correction coming.", ja: 'トーンを上げると訂正の予告になる。相手に準備させる。' },
                    native: { en: "Wait, you said the meeting's at 3? Actually, they pushed it to 4 -- check the email, they just sent an update.", ja: 'ちょっと、会議3時って言った? 実は4時にずれてる。メール見て、今アップデート来たとこ。' },
                },
                trap: "相手を訂正する時に 'No, you're wrong' で入る。英語では actually の一語で同じ内容を柔らかく伝えられる。",
                tip: "相手の発言を訂正する時は、反射的に Actually, ... で入る癖をつける。衝突を避ける defense 技。",
                reactions: {
                    master: 'actually の訂正用法は face-saving 装置。直接否定による face threat を actually で緩和する。',
                    lisa: "I use 'actually' constantly to correct people without sounding rude. It's the polite 'um, no'.",
                    takeshi: '訂正で No から入ると日本人以上にキツく聞こえる。Actually で柔らげろ。',
                    yuki: 'actually で訂正、No を避ける装置なんや。丁寧なコミュニケーションの肝。',
                    kenji: "会議で 'Actually, the data shows otherwise' って言えば対立せずに反対意見出せる。",
                    mina: 'DM で誤り指摘する時、"actually no..." って入れるとトゲが消える。Z 世代も使う。',
                },
            },
            {
                id: 'd25-p-03-actually-surprise',
                label: "actually -- 意外性の合図",
                trigger: "'It was actually good!' を発音しろ。",
                points: {
                    core: { en: 'actually + positive = unexpectedly', ja: '予想と違ってポジティブな結果だった時の「意外にも」。' },
                    nuance: { en: "I didn't expect it to be good, but it was actually good.", ja: '事前の期待と結果のギャップを埋める副詞。驚きの明示。' },
                    shift: { en: "'She's actually kind of nice' -- reversing a negative first impression.", ja: '第一印象と違った時の反転。人に対する評価の更新。' },
                    native: { en: "Okay so the new Thai place on Market? It was actually insanely good -- we're going back this weekend.", ja: 'マーケット通りのタイ料理の新しい店、マジでめっちゃ美味かった。週末また行くわ。' },
                },
                trap: '「実際は」の訳だけで覚えてると、意外性のニュアンスが落ちる。予想と現実のズレが本質。',
                tip: 'actually + good / nice / fun の組み合わせが出たら「意外に良かった」の意。',
                reactions: {
                    master: 'actually + 評価形容詞は expectation-reality gap を明示する。驚きや発見の情報構造。',
                    lisa: "'It was actually fun!' means 'I didn't think it would be, but it was'. Super specific meaning.",
                    takeshi: "actually + good の定型、「意外に〜」の表現。日本語の「想像以上」の感覚。",
                    yuki: 'actually で意外性が出るの、シンプルで便利。感想述べる時使える。',
                    kenji: "'It was actually really useful' って会議で感想述べれば、期待値超えた評価に。",
                    mina: "SNS で \"this is actually so good\" ってポスト、まさにこの意外性 actually。",
                },
            },
            {
                id: 'd25-p-04-actually-reversal',
                label: "Actually, wait -- 自己訂正",
                trigger: "'Actually, wait, I changed my mind.' を発音しろ。",
                points: {
                    core: { en: 'Actually, ... (mid-sentence reversal)', ja: '自分の発言を途中で撤回する時の合図。「あ、待って、やっぱり」に相当。' },
                    nuance: { en: "I said X, but actually let's do Y. (Self-correction)", ja: '自分の判断を途中で変える時、actually を挟んで切り替える。' },
                    shift: { en: "'Actually never mind' -- cancels previous statement entirely.", ja: '直前の発言を取り消す時の定型。' },
                    native: { en: "Let me grab the Americano -- actually, make that a latte, I'm too tired for straight espresso today.", ja: 'アメリカーノで、あ、やっぱりラテにする。今日はエスプレッソだけ飲める元気ない。' },
                },
                trap: "自己訂正で 'Sorry, I mean...' しか使えない。actually 一語で同じ機能を柔らかく出せる。",
                tip: "発言を変更したくなった瞬間、反射的に 'Actually, ...' で切り替える。思考の切り替えの合図として体に入れる。",
                reactions: {
                    master: 'actually の自己訂正用法は metacognitive marker。発話者自身の認知更新を外化する。',
                    lisa: "'Actually, make that a large' -- I reverse myself all the time at cafes. Super natural.",
                    takeshi: '自分の発言変える時、Actually で入ると「考え直した」感が自然に出る。Sorry より滑らか。',
                    yuki: '注文変える時に actually、覚えとく。店で便利に使える。',
                    kenji: "'Actually, let's reschedule' って言えたら現場でスムーズに予定変更できる。",
                    mina: "DM で \"actually nvm\" って書くの、まさに自己訂正の actually。Z 世代定番。",
                },
            },
            {
                id: 'd25-p-05-actually-disagree',
                label: "Actually -- 丁寧な反対",
                trigger: "'Actually, I disagree.' を発音しろ。",
                points: {
                    core: { en: 'Actually, + counter-argument', ja: '反対意見を出す時のクッション。直接 I disagree より柔らかい。' },
                    nuance: { en: "Actually, I see it differently. (Opens disagreement without attack)", ja: '視点の違いを示す時、actually で入ると争いにならない。' },
                    shift: { en: "'I think actually...' (even softer, hedging the hedge)", ja: 'さらに I think を足すと反対意見が最大限に柔らかくなる。' },
                    native: { en: "I hear what you're saying, but actually I think we should probably hold off until the numbers come in -- it's just safer.", ja: '言いたいこと分かるけど、やっぱ数字出るまで一旦保留したほうがいい気がする。そのほうが安全やし。' },
                },
                trap: "反対意見で 'I disagree' から直接入る。英語圏 (特に米) では actually でクッション置くのが礼儀。",
                tip: "反対意見を言う前、'Actually, I think...' のテンプレで入る。ビジネス英語の鉄板。",
                reactions: {
                    master: '反対意見の actually は politeness strategy の核。negative face (反対による面子損失) を保護する。',
                    lisa: "'Actually, I see it differently' -- this is how I disagree without starting a fight.",
                    takeshi: '日本人は「でも」から反対に入るから英語だと But を使う。実は Actually の方が柔らかい。',
                    yuki: '反対意見で actually って新鮮。日本語の「いや、でも」よりエレガント。',
                    kenji: "会議で 'Actually, I'd push back on that' って言えたら建設的な議論に。",
                    mina: "DM の議論で \"actually i think...\" って書くの、もはや Z 世代の基本装備。",
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 依頼の丁寧度 (Can / Could / Would / Would you mind)
    // ══════════════════════════════════════════════════
    grammar: {
        title: '依頼の丁寧度 -- Can / Could / Would / Would you mind の4段階',
        subtitle: '同じ「〜してくれる?」でも4段階の丁寧度がある。場面で選ぶ。',
        intro: {
            question: 'なぜ日本人の英語は丁寧に言おうとして失礼になるのか?',
            insight: '日本語の「〜してくれる?」「〜していただけますか?」は敬語の階段で丁寧度を出す。英語は助動詞の選択と過去形化で同じ機能を果たす。\n\n階段は (1) Can you ... ? (カジュアル、仲間)、(2) Could you ... ? (丁寧、同僚・知人)、(3) Would you ... ? (より丁寧、顧客・目上)、(4) Would you mind + -ing? (最も丁寧、面倒な依頼)。時制を過去形にずらすほど距離が生まれ、距離が丁寧度になる。仮定法の原理と同じ。\n\n最大の罠は Would you mind の返答。「構いませんよ (OK です)」を英語では No, not at all. (いや、全く構わない) で返す。Yes と答えると「嫌です」の意味になる。質問の構造が「〜することを気にしますか?」だから、許可は No。ここで詰まる日本人が非常に多い。今日の5つで依頼の階段と返答の落とし穴を全部潰す。',
        },
        tldr: 'Can → Could → Would → Would you mind の順に丁寧度アップ。mind の答えは No で許可。',
        items: [
            {
                id: 'd25-g-01-can-you',
                label: "Can you ... ? -- カジュアルな依頼",
                trigger: '「塩取ってくれる?」を英語で。',
                points: {
                    core: { en: 'Can you pass the salt?', ja: 'Can you は仲間・家族・親しい同僚向けのカジュアルな依頼。' },
                    nuance: { en: "Can you... assumes familiarity. Not rude, just informal.", ja: '失礼ではないが、距離感が近い。知らない人には少しフランクすぎる。' },
                    shift: { en: "'Can you...?' is default among friends and casual coworkers.", ja: '親しい相手への標準。初対面や上司には Could / Would に切り替える。' },
                    native: { en: "Hey, can you grab me another coffee while you're up? I literally cannot move my legs right now.", ja: 'ちょっと、立ってるついでにもう一杯コーヒー取ってきてくれる? マジで脚動かん。' },
                },
                trap: '初対面や目上に Can you を使って軽く聞こえる。距離がある相手には Could / Would に上げる。',
                tip: 'Can you は家族・友達・親しい同僚。それ以外は Could 以上に上げるのが無難。',
                reactions: {
                    master: 'Can you は能力・許可・依頼の3義を持つ。依頼機能では informal register に属する。',
                    lisa: "'Can you grab the door?' -- totally normal with friends. I'd never say that to my boss.",
                    takeshi: 'Can you の距離感、日本語で言うと「〜してくれる?」。ため口の領域。',
                    yuki: 'Can you と Could you、距離感の違いやっとわかった。相手で切り替える。',
                    kenji: "現場で 'Can you pass that?' は仲間内、'Could you pass that?' は外注相手、みたいに使い分け。",
                    mina: "DM で友達に \"can u check this?\" が普通。敬語不要な関係の証。",
                },
            },
            {
                id: 'd25-g-02-could-you',
                label: "Could you ... ? -- 丁寧な標準依頼",
                trigger: '「これを確認していただけますか?」を英語で。',
                points: {
                    core: { en: 'Could you check this?', ja: 'Could you は丁寧で標準的な依頼。ビジネスで最頻出。' },
                    nuance: { en: "Could you... = Can you + politeness. Past form = distance = respect.", ja: 'Can の過去形を使うことで心理的距離が生まれ、丁寧になる。' },
                    shift: { en: "'Could you please...?' adds another layer of politeness.", ja: 'please を足すとさらに丁寧。依頼の標準装備。' },
                    native: { en: "Hey, could you take a quick look at this deck before I send it to the client? I just wanna make sure I'm not missing anything stupid.", ja: 'ちょっと、クライアントに送る前にこの資料見てもらえる? アホなミスないか確認したくて。' },
                },
                trap: 'Could you も please もつけずに使うと、意図は丁寧でもやや素っ気なく響く。please を忘れるな。',
                tip: 'ビジネスの標準依頼は Could you please ... ? を基本形に。迷ったらこれでOK。',
                reactions: {
                    master: 'Could you は仮定法過去の politeness 拡張。can の過去形化が心理的距離を作り、直接性を弱める。',
                    lisa: "'Could you' is my default at work. Polite but not stiff.",
                    takeshi: "Could you please が依頼のスイスアーミーナイフ。迷ったらこれ。",
                    yuki: 'Could you please の組み合わせ、万能。全シーンで使える。',
                    kenji: "'Could you send me the file?' は現場の標準依頼。違和感ゼロ。",
                    mina: "メールで Could you please...、ちゃんとしたい時の定型。無難で安全。",
                },
            },
            {
                id: 'd25-g-03-would-you',
                label: "Would you ... ? -- より丁寧な依頼",
                trigger: '「少々お待ちいただけますでしょうか?」を英語で。',
                points: {
                    core: { en: 'Would you wait a moment, please?', ja: 'Would you は Could you よりさらに丁寧。意志・気持ちを問う形。' },
                    nuance: { en: "Would you... = asking about willingness, not ability. Extra respect.", ja: '「能力」ではなく「意思」を確認する形で、相手の主体性を尊重する。' },
                    shift: { en: "'Would you be willing to...?' (even more deferential, common in emails)", ja: 'be willing to を足すと最大限に丁寧。メールの冒頭で定番。' },
                    native: { en: "Would you be willing to hop on a quick call tomorrow? I know it's last minute, but honestly this thing is kinda urgent.", ja: '明日ちょっと電話できる? 急で申し訳ないけど、正直これ結構急ぎで。' },
                },
                trap: 'Would you を Could you と同じ感覚で使う。Would you の方が「意志を聞いてる」分、一段丁寧。',
                tip: '顧客・目上・初対面には Would you。特にメール・依頼文書では標準。',
                reactions: {
                    master: 'Would you は will の過去形化。意志確認形が依頼として機能する。politeness は仮定法の派生。',
                    lisa: "'Would you mind taking a look?' -- this is how I email someone I barely know.",
                    takeshi: 'Would you は一段上の丁寧。顧客対応で Could より Would を選ぶと差が出る。',
                    yuki: 'Would you、意志を確認する丁寧さ。覚えておくと重要な場面で使える。',
                    kenji: "'Would you be able to send it by Friday?' って顧客メールで使う。品格出る。",
                    mina: "重要な相手への DM で Would you...って書くと、急に大人っぽくなる。",
                },
            },
            {
                id: 'd25-g-04-would-you-mind',
                label: "Would you mind -ing? -- 最も丁寧、答えは No で許可",
                trigger: '「窓を開けていただいてもよろしいですか?」を英語で。',
                points: {
                    core: { en: 'Would you mind opening the window?', ja: 'Would you mind + -ing は最も丁寧な依頼。「〜することを気にしますか?」の構造。' },
                    nuance: { en: "'Would you mind' asks if it would bother them. No = 'No, I don't mind' = OK.", ja: '「嫌ですか?」の質問だから、許可の返答は No (いや、嫌じゃない)。' },
                    shift: { en: "Answer: 'No, not at all' = Yes, I'll do it. / 'Yes, actually...' = No, I won't.", ja: 'No, not at all が「了解」、Yes は「嫌です」。答え方を間違えると大混乱。' },
                    native: { en: "Hey, would you mind keeping it down just a bit? I'm literally on a client call and they can totally hear you.", ja: 'ちょっと、少しだけ静かにしてもらっていい? マジでクライアントと電話中で、完全に向こうに聞こえてて。' },
                },
                trap: "Would you mind への返答で Yes と答えてしまい「嫌です」の意味にしてしまう。答えは No, not at all が定型。",
                tip: 'Would you mind + -ing の後は必ず動名詞。返答は No, not at all か Of course, go ahead. を反射で出す。',
                reactions: {
                    master: 'Would you mind + -ing は否定疑問の politeness 装置。negation 構造が許可応答の反転を引き起こす。',
                    lisa: "'Would you mind closing the door?' -- answer is always 'No, go ahead'. If I say 'Yes' I mean I DO mind.",
                    takeshi: 'mind の返答、No で許可が最大の罠。Yes と答えた瞬間気まずい空気になる。覚えろ。',
                    yuki: "Would you mind の No で OK、これ知らんと必ずミスる。反復する。",
                    kenji: "'Would you mind sending a reminder?' ってメールで書けば最上級の丁寧さ。",
                    mina: '"Would you mind if I..." って書き出し、海外の Airbnb ホストとかにDM送る時の定型。',
                },
            },
            {
                id: 'd25-g-05-imperative-politeness',
                label: "Please + 命令 vs Would you ...? -- 命令形の丁寧度",
                trigger: '「ドアを閉めてください」を状況別に英語で。',
                points: {
                    core: { en: 'Please close the door. (polite imperative)', ja: '命令形 + please は丁寧だが、指示的ニュアンスが残る。距離の近い相手向け。' },
                    nuance: { en: "Could/Would you close the door? (question form, more polite)", ja: '疑問形にすることで選択権を相手に渡す。命令より丁寧。' },
                    shift: { en: "Please close the door. / Could you close the door, please? / Would you mind closing the door?", ja: '3段階の丁寧度。場面で選ぶ。' },
                    native: { en: "Please don't tell me you forgot the keys again -- honestly, I'm gonna lose it if we're locked out twice in one week.", ja: 'マジでまた鍵忘れたって言わないで。1週間で2回も締め出されたら、マジでキレるから。' },
                },
                trap: 'Please + 命令形で万能と思って目上に使う。疑問形 (Would you ... ?) の方が一段上。',
                tip: '丁寧度順: Please + 命令 < Could you < Would you < Would you mind + -ing。相手との距離で選ぶ。',
                reactions: {
                    master: '命令形 + please は polite imperative。疑問形依頼 (Would/Could you) より直接性が高く、下位の politeness level。',
                    lisa: "I say 'Please sit down' to my niece, but 'Would you mind taking a seat?' to a client.",
                    takeshi: 'Please + 命令は実は中ランク。Would you の方が上、と知っとくとミスらん。',
                    yuki: '命令形 please、目上に使うと実は失礼寄りなんや。疑問形で出すほうが安全。',
                    kenji: "'Please have a seat' は問題ないが、本当に丁寧にするなら 'Would you like to have a seat?'。",
                    mina: "DM で \"pls check this\" と \"would you mind checking this?\" は全然温度違う。相手見て選ぶ。",
                },
            },
        ],
    },
};
