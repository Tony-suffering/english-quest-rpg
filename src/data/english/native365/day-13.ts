import type { Native365Day } from '@/types/native365';

/**
 * Day 13
 *
 * 発音: 長母音 (beat / bit / bought / but) -- 日本人が一番区別できない母音4組
 * 文法: 仮定法過去完了 -- 後悔の型
 */

export const DAY_13: Native365Day = {
    day: 13,
    week: 2,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 寒い夜
    // ══════════════════════════════════════════════════
    opening: {
        scene: '寒い夜。タケシが「"beach" と言ったつもりが "bitch" に聞こえた」って海外出張での冷や汗エピソードを語り出す。',
        lines: [
            { char: 'takeshi', text: "beach って言ったら相手が固まった。発音が /ɪ/ 寄りになって、とんでもない単語になってた。" },
            { char: 'lisa',    text: "日本人の /iː/ と /ɪ/、ほぼ区別なし。口の開け方で長さじゃなく音質が変わるのよ。" },
            { char: 'master',  text: "それと「あの時〜していれば」の後悔の型、仮定法過去完了。これも今日1本で片付けよう。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: 長母音
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: '長母音 (beat / bit / bought / but) -- 日本人が一番区別できない母音4組',
        subtitle: '長さではなく音質で区別する。口の開け方と舌の位置で別音を作る。',
        intro: {
            question: 'なぜ beach と bitch、ship と sheep を日本人は区別できないのか?',
            insight: "日本語の「イ」は1つしかない。英語には /iː/(beat, sheep)と /ɪ/(bit, ship)の2つがある。日本人はこれを「長い i」と「短い i」の長さの違いだと誤解するが、実際には音質の違い。/iː/ は口を横に引いて舌を高く前に、/ɪ/ は口を緩めて舌を少し下げる。長さではなく口の形で作る別音。\\n\\n同様に /ɔː/(bought)と /ʌ/(but)、/ɑː/(father) も日本語の「オ」「ア」の1つに圧縮されてしまう。結果、don\\'t と don と Don が全部「ドン」に聞こえる。これは聴く側だけでなく話す側の問題でもある。自分で作れない音は耳でも聞き分けられない。\\n\\n今日の5語で、口の開け方と舌の位置の違いを体に刻む。これが出来れば、単語の聞き分けが一気に解像度上がる。",
        },
        tldr: 'beat/bit/bought/but を口の形で作り分ける。長さではなく音質。',
        items: [
            {
                id: 'd13-p-01-beat-bit',
                label: 'beat vs bit -- /iː/ と /ɪ/',
                trigger: "'beat' と 'bit' を交互に発音しろ。",
                points: {
                    core: { en: 'beat /biːt/ vs bit /bɪt/', ja: '/iː/ は口を横に引く、/ɪ/ は口を緩める。長さではなく口の形。' },
                    nuance: { en: 'beat: lips stretched, tongue high front. bit: lips relaxed, tongue slightly lower.', ja: '/iː/ は微笑みの口、/ɪ/ はフラット。口の緊張度が違う。' },
                    shift: { en: 'sheep /ʃiːp/ vs ship /ʃɪp/ -- same contrast.', ja: 'seat/sit, feet/fit, leave/live 全部同じ対立。' },
                    native: { en: "Hey, have a seat anywhere you want -- I'll be with you in just a bit, I'm finishing up with someone.", ja: 'どこでも座ってて、もうちょっとで伺うから。今別のお客さん対応中で。' },
                },
                trap: '長さだけで区別しようとする。/bɪːt/ と /bɪt/ では別単語にならない。口の形で別音を作る必要がある。',
                tip: '/iː/ は「にっこり」の口、/ɪ/ は「だらっ」の口。鏡で口の形をチェックしながら練習。',
                reactions: {
                    master: '英語の /iː/ vs /ɪ/ は音質 (tense vs lax) の対立。長さは副次的。音質で区別しないと聞き分けも話し分けも不可能。',
                    lisa: "'Beach' and 'bitch' -- if you say them both relaxed, I can't tell. Stretch for 'ea' words.",
                    takeshi: 'beach/bitch の悲劇、これ日本人全員通る道。「にっこり」の口を意識すれば一発で解決する。',
                    yuki: '長さじゃなく口の形って言われて、初めてストンと落ちた。',
                    kenji: 'sheet (シート) と shit、これも同じ。現場で絶対間違えたくないやつ。',
                    mina: 'Tiktok で "feel" を「フィル」って発音してる日本人動画、確かに /ɪ/ になってて feel じゃなく fill に聞こえるわ。',
                },
            },
            {
                id: 'd13-p-02-bought-but',
                label: 'bought vs but -- /ɔː/ と /ʌ/',
                trigger: "'bought' と 'but' を交互に発音しろ。",
                points: {
                    core: { en: 'bought /bɔːt/ vs but /bʌt/', ja: '/ɔː/ は口を丸く開く、/ʌ/ は口を弛緩させて中央で出す。' },
                    nuance: { en: 'bought: round, open, back. but: neutral, central, relaxed.', ja: '/ɔː/ は唇を丸めて「オー」、/ʌ/ は唇を丸めず「ア」。' },
                    shift: { en: 'US: bought /bɑːt/ (caught-cot merger). UK: bought /bɔːt/ clear.', ja: '米語では /ɔː/ が /ɑː/ に近づく地域多数 (caught と cot が同音)。' },
                    native: { en: "Honestly, I bought that jacket last week, but I'm genuinely not sure I'll ever actually wear it outside the house.", ja: '正直、先週あのジャケット買ったんだけど、家の外で本当に着るか自信ない。' },
                },
                trap: '両方とも日本語の「ア」で処理する。bought が but に聞こえ、全文崩壊する。',
                tip: '/ɔː/ は唇を前に出して丸める、/ʌ/ は唇をリラックスさせる。唇の丸みで判別。',
                reactions: {
                    master: '/ɔː/ (open O) vs /ʌ/ (wedge) は唇の丸みで区別。日本語の「オ」「ア」では両方とも作れない別音。',
                    lisa: "'Bought' needs round lips. 'But' is totally flat. If your lips don't move between them, it's one sound to me.",
                    takeshi: 'bought と but、両方「ア/オ」で処理してる限り過去形が全部怪しく聞こえる。唇を動かせ。',
                    yuki: '唇の丸みで母音が変わるの、日本語ないから意識したことなかった。',
                    kenji: 'I bought it は発注現場でよく言う。bought の口を丸める癖付けたい。',
                    mina: '"I thought" も /ɔː/ の仲間やね。thought/bought/caught で口丸める練習、セットで。',
                },
            },
            {
                id: 'd13-p-03-father-but',
                label: 'father vs but -- /ɑː/ と /ʌ/',
                trigger: "'father' と 'but' を発音しろ。",
                points: {
                    core: { en: 'father /ˈfɑː.ðər/ vs but /bʌt/', ja: '/ɑː/ は口を大きく開けて喉の奥、/ʌ/ は口を中程度に緩く。' },
                    nuance: { en: 'father: mouth wide open, tongue low back. but: mouth medium, tongue central.', ja: '/ɑː/ は「ひゃーっ」と開ける「アー」、/ʌ/ は中間の曖昧な「ア」。' },
                    shift: { en: 'calm /kɑːm/ vs come /kʌm/ -- same contrast.', ja: 'calm/come, father/mother など同じ対立。' },
                    native: { en: "Oh, my father called me earlier -- apparently he's coming up to visit us next month for the first time in years.", ja: 'あ、そういえば親父から電話あってさ、何年かぶりに来月会いに来るらしいんだ。' },
                },
                trap: '/ɑː/ と /ʌ/ を両方「ア」で処理。father と mother、calm と come が区別できない。',
                tip: '/ɑː/ は医者に「あー」と見せる口、/ʌ/ は何気なく「あ」と言う口。開きの差で作る。',
                reactions: {
                    master: '/ɑː/ (open back) vs /ʌ/ (mid central) は顎の開きと舌位置で区別。日本語「ア」1音では両方表せない。',
                    lisa: "'Father' needs a wide-open mouth. 'But' is small and lazy. The difference is huge.",
                    takeshi: 'father を /fʌ.ðər/ で読んだら fuddah になって意味不明。口をしっかり開けろ。',
                    yuki: '「ア」が3種類あるの、改めて整理できた。/æ/ もあるし、慣れるしかない。',
                    kenji: 'calm down を現場で言う時、/kʌm/ になったら come down で別の意味になる。怖い。',
                    mina: '"oh my god" の god が /gɑːd/ で口大きく開くの、SNSで聞くと納得。',
                },
            },
            {
                id: 'd13-p-04-hat-hut',
                label: 'hat vs hut -- /æ/ と /ʌ/',
                trigger: "'hat' と 'hut' を発音しろ。",
                points: {
                    core: { en: 'hat /hæt/ vs hut /hʌt/', ja: '/æ/ は口を横に大きく開く「ア」、/ʌ/ は中立の曖昧な「ア」。' },
                    nuance: { en: 'hat: cheek muscles tense, mouth pulled wide. hut: relaxed, neutral.', ja: '/æ/ は頬の筋肉を使って口を横に引く、/ʌ/ は脱力。' },
                    shift: { en: 'cat/cut, bad/bud, match/much -- same contrast.', ja: '英語で /æ/ と /ʌ/ の対立は頻出。区別できないと意味が変わる。' },
                    native: { en: "Dude, I got such a bad haircut yesterday -- can we just literally not talk about it right now, please?", ja: 'おい、昨日マジでひどい髪型になって、今それにはもう触れないで、頼むから。' },
                },
                trap: '/æ/ と /ʌ/ を全部「ア」で処理。hat と hut が同音になり、相手が意味を取れない。',
                tip: '/æ/ は口を横に引き締めて「あ(ェ)」、/ʌ/ は口を緩めて中央で「あ」。頬の筋肉の使用で区別。',
                reactions: {
                    master: '/æ/ (near-open front) と /ʌ/ (mid central) は舌の前後で区別。両方「ア」で処理する日本語耳では崩壊する。',
                    lisa: "'Hat' needs you to almost smile while saying it. 'Hut' is just neutral. Totally different mouths.",
                    takeshi: 'cat/cut、bad/bud、1つも区別できないまま TOEIC 900 取っちゃう罠、ここで直す。',
                    yuki: '/æ/ の「あェ」の音、中学で習った記憶ない…これが apple の ap か。',
                    kenji: 'bad job / cut off、現場用語でも /æ/ と /ʌ/ が隣接する。ここ区別できれば報告が通る。',
                    mina: "\"that\\'s bad\" の bad、/æ/ で口を引いて出すの、SNSネイティブ動画でよく確認できるわ。",
                },
            },
            {
                id: 'd13-p-05-pool-pull',
                label: 'pool vs pull -- /uː/ と /ʊ/',
                trigger: "'pool' と 'pull' を発音しろ。",
                points: {
                    core: { en: 'pool /puːl/ vs pull /pʊl/', ja: '/uː/ は唇を強く丸めて前に突き出す、/ʊ/ は唇を軽く丸めるだけ。' },
                    nuance: { en: 'pool: lips pursed tight and forward. pull: lips loose, mouth relaxed.', ja: '/uː/ は「ウー」のしっかり版、/ʊ/ は緩い「ウ」。' },
                    shift: { en: 'fool/full, Luke/look -- same /uː/ vs /ʊ/ contrast.', ja: '同じ対立。日本語の「ウ」1つでは両方作れない。' },
                    native: { en: "I had to pull my daughter out of the pool because her lips were literally turning blue from how cold the water was.", ja: '娘の唇が水の冷たさでマジで紫になってきたから、プールから引き上げるしかなかった。' },
                },
                trap: '/uː/ と /ʊ/ を両方「ウ」で処理。pool と pull、fool と full が区別できない。',
                tip: '/uː/ は唇をすぼめて前に突き出す、/ʊ/ は唇を弛緩させる。唇の緊張度で区別。',
                reactions: {
                    master: '/uː/ (close back, tense) と /ʊ/ (near-close, lax) は唇の緊張度で区別。長さではなく音質。',
                    lisa: "'Pool' needs puckered lips. 'Pull' is just a casual 'u' sound. You'll feel the difference.",
                    takeshi: 'pool/pull の区別、ここも日本人の鬼門。唇を突き出すかどうかで決まる。',
                    yuki: '日本語の「ウ」って唇あんまり動かさないから、/uː/ の突き出し方が新鮮。',
                    kenji: 'pull up the file って現場で言う時、pool になったら全然違う動作になるな。',
                    mina: '"fool proof" って書いてるやつ、fool の /uː/ 唇突き出しで発音したらリズム出る。',
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 仮定法過去完了
    // ══════════════════════════════════════════════════
    grammar: {
        title: '仮定法過去完了 -- 後悔の型',
        subtitle: '「あの時〜していれば、今頃〜だったのに」。型を1つ体に入れる。',
        intro: {
            question: 'なぜ仮定法過去完了で詰まるのか?',
            insight: '日本語は「もしあの時〜してたら」「〜すればよかった」など、後悔と仮定が1つの時間軸で処理される。英語は違う。仮定法過去完了は、過去の非実現を「今振り返って想像する」という二重の時間操作を動詞の形で表現する。\n\n型は1つ。If + 主語 + had + 過去分詞, 主語 + would have + 過去分詞。前半が過去の非実現条件、後半が過去の非実現結果。両方とも過去完了ベースの形で、時制を1段ずらすことで「現実ではないが、もし〜だったら」を作る。\n\nさらに混乱するのは、主節の would have を could have, might have, should have に置き換えると意味範囲が変わること。would = そうなってた(結果)、could = そうなれた(可能)、might = そうだったかも(推測)、should = そうすべきだった(後悔)。この4バリエーションで後悔のニュアンスを微調整する。',
        },
        tldr: 'If + had + pp, S + would/could/might/should have + pp。この1型で後悔を全部カバー。',
        items: [
            {
                id: 'd13-g-01-basic',
                label: '基本型 -- If had pp, would have pp',
                trigger: '「もっと勉強してたら、受かってたのに」を英語で。',
                points: {
                    core: { en: 'If I had studied harder, I would have passed.', ja: '過去の非実現条件 + 過去の非実現結果。両方 had + pp / would have + pp。' },
                    nuance: { en: 'Past counterfactual. Both clauses refer to past events that didn\'t happen.', ja: '現実: 勉強しなかった、落ちた。仮定: もし勉強してたら、受かってた。' },
                    shift: { en: "If I'd studied harder, I would've passed. -- 口語では縮約が基本.", ja: "had -> \'d, would have -> would\'ve。書き言葉と話し言葉で音が全く違う。" },
                    native: { en: "Ugh, if I'd just left ten minutes earlier this morning, I wouldn't have missed my flight and I'd already be in Tokyo by now.", ja: 'あー、今朝あと10分早く出てれば飛行機に乗り遅れず、今頃もう東京に着いてたのに。' },
                },
                trap: 'If + 過去形 で済ませる (仮定法過去の型)。仮定法過去は現在の非実現、過去完了形が必要なのは過去の非実現。',
                tip: '「過去のやり直し」=If + had + pp, S + would have + pp。型を丸ごと暗唱。',
                reactions: {
                    master: '仮定法過去完了 = 過去の反実仮想。時制を1段階過去にずらす規則で過去完了ベースの形になる。',
                    lisa: "'If I\\'d studied, I would\\'ve passed' -- 100% of the time I contract both. Nobody says the full form.",
                    takeshi: '過去の後悔を日本語感覚で過去形だけで済ませた瞬間、英語のタイムラインが崩壊する。had + pp を固定で体に入れろ。',
                    yuki: '型を1つ覚えれば他の動詞でも使える、って思ったらラクに感じてきた。',
                    kenji: '「あの時言っとけば」って現場の後悔、If I had said so... で切り出せたら大人っぽい。',
                    mina: 'SNSの "if I had known..." って定型、投稿でよく見るね。型1つで応用効くやつ。',
                },
            },
            {
                id: 'd13-g-02-could',
                label: 'could have -- 「〜できたのに」',
                trigger: '「もし時間があったら、終わらせられたのに」を英語で。',
                points: {
                    core: { en: 'If I had had more time, I could have finished it.', ja: 'could have = 過去の可能性。「〜できた(のにしなかった)」。' },
                    nuance: { en: 'Not that I would have, but I had the potential.', ja: 'would have は「そうしてた」断定、could have は「できた」可能性。' },
                    shift: { en: "I could've done that. / You could've told me!", ja: '主節だけ単独で使える。If 節を省略し、相手への非難や自嘲で使う。' },
                    native: { en: "Dude, you could've literally just told me -- I would've helped in a heartbeat, no questions asked.", ja: 'なあ、マジで一言言ってくれれば、俺すぐ手伝ったよ。何も聞かずに。' },
                },
                trap: 'could have を「できたはず」で機械的に訳すと、強い後悔や非難のニュアンスが乗ることを見落とす。',
                tip: 'would have = 断定、could have = 可能性。目的に応じて使い分け。単独使用も多い。',
                reactions: {
                    master: 'could have + pp は過去の潜在的可能性。実現しなかったことへの無念や他者への非難を込めた用法が多い。',
                    lisa: "'You could've told me' isn't just a fact -- it's a light scolding. The tone matters.",
                    takeshi: '"You could have told me" に込められた薄い怒り、ここ日本人が見落とす語用論。',
                    yuki: '単なる「できた」じゃなくて、後悔や非難のトーンが乗るんや。深いな。',
                    kenji: '"We could have made it" って現場で敗戦の時言うやつ、刺さる一言やね。',
                    mina: "DMで \"you could\\'ve texted me\" って送ったら、ちょい怒ってる感じ伝わるね。使い時選ぶな。",
                },
            },
            {
                id: 'd13-g-03-should',
                label: 'should have -- 「〜すべきだった」',
                trigger: '「彼女に謝るべきだった」を英語で。',
                points: {
                    core: { en: 'I should have apologized to her.', ja: 'should have = 過去の義務の非実現。後悔の最も直接的な型。' },
                    nuance: { en: 'Pure regret. Not about possibility, but about the right thing to do.', ja: '単なる「できた」ではなく「すべきだった」の道徳的重み。' },
                    shift: { en: "I should've known. / You shouldn't have done that.", ja: '口語では shoulda / shouldn-ta まで縮む。日常の後悔の王道。' },
                    native: { en: "Honestly, I should've called you back way sooner -- I'm really sorry, it completely slipped my mind with everything going on this week.", ja: '正直、もっと早く折り返すべきだった。本当にごめん、今週色々あってすっかり忘れてた。' },
                },
                trap: 'should の原義「〜すべき」から、should have を単純な後悔と訳してしまう。義務/正しさの含みを忘れない。',
                tip: '後悔=should have。単なる「〜しとけばよかった」より、道徳的な「すべきだった」の含みが強い。',
                reactions: {
                    master: 'should have + pp は過去の義務の非実現。単なる後悔ではなく「正しい選択ではなかった」という道徳的評価を含む。',
                    lisa: "'I shouldn't have said that' is the apology before the apology. It's built into the sentence.",
                    takeshi: 'should have は後悔の最強表現。日本語の「すべきだった」の倫理的重みをそのまま運べる。',
                    yuki: '後悔って3種類あるんやね。could / should / would で色合い変わる。',
                    kenji: '"I should have checked it first"、現場で失敗した時の素直な謝罪に使える。',
                    mina: '"shoulda woulda coulda" って歌詞あるやん、あれ3種類の後悔を並べた完璧な表現やな。',
                },
            },
            {
                id: 'd13-g-04-mixed',
                label: '混合型 -- 過去の原因、現在の結果',
                trigger: '「もっと早く寝てたら、今眠くないのに」を英語で。',
                points: {
                    core: { en: "If I had gone to bed earlier, I wouldn't be sleepy now.", ja: '前半 = 過去完了、後半 = 現在の結果 (would + 原形)。混合型。' },
                    nuance: { en: 'Past cause, present effect. Half past perfect subjunctive, half present subjunctive.', ja: '過去の非実現が現在の状態に繋がっている場合、前後で時制がずれる。' },
                    shift: { en: "If I hadn't eaten that, I wouldn't feel sick now.", ja: '「あの時〜してなかったら、今〜じゃないのに」の定型。' },
                    native: { en: "Dude, if I'd just started learning English back in high school, I'd probably be totally fluent by now instead of still struggling with basics.", ja: 'おい、高校時代に英語始めてたら、今頃完全にペラペラだったろうな。まだ基本で苦労してないで。' },
                },
                trap: '前後両方を過去完了形で揃えてしまう。過去の原因が現在にも及んでいる場合、後半は would + 原形。',
                tip: '結果が現在まで影響しているなら混合型。後半だけ would + 原形 (現在の仮定) に変える。',
                reactions: {
                    master: '混合仮定法 = 過去の非実現条件 + 現在の非実現結果。両方過去完了にすると論理がズレる。',
                    lisa: "'If I'd gone to bed earlier, I wouldn't be tired now' -- this structure is super useful. Mix the tenses.",
                    takeshi: '混合型、日本語だと違和感ない表現だけど、英語では時制をずらす技術が要る。ここ中級の壁。',
                    yuki: '過去と現在を1文で繋ぐ型があるんや。これ使いこなせたら英語力ぐっと上がる。',
                    kenji: "\"If I\\'d learned English earlier, I\\'d be working overseas now\"、響くやつ。",
                    mina: "SNSで \"if I hadn\\'t done that, I wouldn\\'t be here\" みたいな投稿、ちょうど混合型やね。",
                },
            },
            {
                id: 'd13-g-05-inversion',
                label: '倒置形 -- Had I known',
                trigger: '「知ってたら、行かなかったのに」を英語で。',
                points: {
                    core: { en: 'Had I known, I wouldn\'t have gone.', ja: 'If を省略して had を主語の前に出す倒置形。フォーマル。' },
                    nuance: { en: 'If I had known, I wouldn\'t have gone. -- 同じ意味。倒置の方が書き言葉向き。', ja: '倒置は If の代替表現。文学・ビジネス文書で頻出。' },
                    shift: { en: 'Had I been there, things would have been different.', ja: 'Had + 主語 + pp が文頭に来たら仮定法の倒置の合図。' },
                    native: { en: "Had I known you were stopping by tonight, I literally would've cleaned up the place and maybe even cooked something decent.", ja: '今夜寄るって知ってたら、マジで部屋片付けて、何かまともな料理も作ってたのに。' },
                },
                trap: '倒置の had を過去完了の had と混同する。文頭の Had + 主語 + pp, ...は必ず仮定法。',
                tip: 'Had で文が始まって主語が後ろに来たら、ほぼ100%仮定法過去完了の倒置。',
                reactions: {
                    master: '仮定法の倒置 = If の省略 + 助動詞 (had/were/should) の前置。フォーマル寄り、書き言葉で頻出。',
                    lisa: "'Had I known' sounds dramatic and literary. I don't use it daily, but in writing it works.",
                    takeshi: '倒置の Had I known は一段上の表現。ビジネスメールで使うと急に格が上がる。',
                    yuki: 'Had I known って映画で聞いたことある。仮定法だったんや、やっと意味繋がった。',
                    kenji: '現場では使わんけど、文章書く時には使える。Had I known は装備しておきたい1個。',
                    mina: 'Tumblr の文学系ポスト、"had i known..." 頻出。倒置で空気が一気に文学調になる。',
                },
            },
        ],
    },
};
