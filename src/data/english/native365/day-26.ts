import type { Native365Day } from '@/types/native365';

/**
 * Day 26
 *
 * 発音: you know の発音と用法 -- 発音 yanno、共感・間埋め・強調の3役
 * 文法: 分詞構文 -- Walking home, ... / Having finished, ... / Given the circumstances, ...
 */

export const DAY_26: Native365Day = {
    day: 26,
    week: 4,
    month: 1,

    // ══════════════════════════════════════════════════
    // 扉絵: 金曜の夜、ミナがポッドキャストで you know 連発を聞いた話
    // ══════════════════════════════════════════════════
    opening: {
        scene: "金曜の夜、ミナがお気に入りのポッドキャストで司会者が\"you know\"を1分に10回言うのを聞いて、意味を探そうとして疲れた話。discourse marker の本質と分詞構文の「語順のショートカット」が今日のテーマ。",
        lines: [
            { char: 'mina',    text: "ポッドキャスト聞いてたら 'you know, I was you know thinking, you know...' ってえぐい頻度で出てきて、意味拾おうとして脳みそ止まったわ。" },
            { char: 'lisa',    text: "Honestly that 'you know' isn't carrying any meaning -- it's yanno, pure filler, maybe a tiny 'you get me?' vibe. Just let it float by." },
            { char: 'master',  text: "あと今日は分詞構文をやる。Walking home と Having finished は形が違う。時制と主語の関係で自動的に決まる。ここが分かると英語の文が一段密になる。" },
        ],
    },

    // ══════════════════════════════════════════════════
    // 発音: you know の発音と用法
    // ══════════════════════════════════════════════════
    pronunciation: {
        title: 'you know -- 発音 yanno、英語で最頻出の discourse marker',
        subtitle: '「知ってるでしょ?」じゃない。共感確認・間埋め・強調のフィラー。',
        intro: {
            question: 'なぜネイティブは you know を1分に10回も言うのか?',
            insight: 'you know は書き言葉では「あなたは知っている」だが、話し言葉では大半が discourse marker (談話標識)。機能は (1) 共感確認「分かるでしょ?」(2) 間埋め (thinking time buying) (3) 強調の前置き「いやもうマジで」(4) 話題の再接続「えっと、さっきの話」の4役。\n\n発音も重要。you know を字義通り /juː noʊ/ とは読まない。会話では /jənoʊ/ → /jəno/ → /jənə/ と潰れ、最終的に「ヤノー」「ヤナ」に近い /yanno/ になる。日本人は2音節で「ユー・ノウ」と丁寧に読むから、ネイティブの /yanno/ が耳に入らない。\n\n使いすぎは禁物。you know の頻発は uneducated/nervous に聞こえる場面もある。でも全く使わないのも不自然。ネイティブの会話リズムに乗るには、適度に挟めることが重要。今日の5項目で機能・発音・頻度感覚を全部押さえる。',
        },
        tldr: 'you know は /yanno/ の1.5音節。共感確認・間埋め・強調の3役。意味は大半ゼロと割り切る。',
        items: [
            {
                id: 'd26-p-01-you-know-empathy',
                label: "you know? -- 共感確認「分かるでしょ?」",
                trigger: "'It's been a rough week, you know?' を発音しろ。",
                points: {
                    core: { en: '/jənoʊ/ with rising intonation', ja: '文末の you know は上昇調。「同意してくれる?」の合図。' },
                    nuance: { en: "You know? = You feel me? / Right? (seeking agreement)", ja: '相手に「うん」と頷いてほしい時の定型。共感の要求。' },
                    shift: { en: "'...you know what I mean?' fuller version (same function)", ja: 'フル形に拡張すると同機能のまま丁寧度が上がる。' },
                    native: { en: "It's been a genuinely awful week, you know? Like, nothing is working out and I'm honestly just so done with everything.", ja: '本当にマジで最悪の1週間だったんよ、わかるやろ? もう何もかも上手くいかんし、正直全部もう無理。' },
                },
                trap: "文末 you know? を「あなた知ってる?」で訳そうとする。「共感してくれる?」のサイン。意味で取らず反応で返す。",
                tip: "文末 you know? が来たら、反射で Yeah / I get it / Totally で返す。議論の合図ではない。",
                reactions: {
                    master: '文末 you know? は共感確認 (confirmation seeking) の discourse marker。上昇イントネーションが必須構成要素。',
                    lisa: "'...you know?' at the end of a sentence = 'tell me you get it'. I just want a 'yeah' back.",
                    takeshi: 'you know? に「知らん」で返すと会話止まる。共感しろって合図や。反射で Yeah。',
                    yuki: 'you know? は「うん」って返す合図なんや。意味取ろうとして止まってた。',
                    kenji: "プレゼン後の 'you know?' は 'ついてきてる?' の合図。Yes って頷けば場が進む。",
                    mina: 'SNS で \"you know?\" のあとに\"right?\" 被せる時あるけど、共感欲しい DM の定番。',
                },
            },
            {
                id: 'd26-p-02-you-know-filler',
                label: "you know -- 純粋フィラー (意味ゼロ)",
                trigger: "'I was, you know, thinking about it.' を発音しろ。",
                points: {
                    core: { en: '/jənoʊ/ reduced, mid-sentence', ja: '文中の you know は純粋フィラー。思考時間を稼ぐための飾り。' },
                    nuance: { en: "I was, you know, thinking... (just buying time)", ja: '意味はほぼゼロ。日本語の「なんか」「えーと」に近い。' },
                    shift: { en: "Overuse sounds uneducated. Native speakers also criticize it.", ja: '使いすぎはマイナス印象。でも全く使わないのも不自然。バランスが重要。' },
                    native: { en: "I was, you know, kinda hoping we could grab lunch tomorrow -- just the two of us, if you're free, obviously.", ja: 'あの、できれば明日一緒にランチどうかなって。ふたりで、もし空いてたらやけど、もちろん。' },
                },
                trap: "文中 you know を「あなた知ってる」で訳す。フィラーと認識し、意味取りをスキップ。",
                tip: "文中 you know は全部無視で意味取りに支障なし。聞き流せる耳を作る。",
                reactions: {
                    master: 'you know の filler 用法は時間稼ぎ装置。意味的貢献ゼロで、発話計画のための余剰時間を確保する。',
                    lisa: "I say 'you know' way too much. My mom always calls me out. But it's just how I talk.",
                    takeshi: 'you know 飛ばして意味取る癖つけろ。全部真面目に受け取ると脳が持たん。',
                    yuki: 'フィラーの you know、無視でいいって割り切れると聞き取り一気に楽になる。',
                    kenji: "会議で you know 連発する人の話、内容だけ抜けばスッキリ聞ける。",
                    mina: "自分の英語で you know 出そうな時、1文に1回まで、って自分ルール決めてる。",
                },
            },
            {
                id: 'd26-p-03-you-know-what',
                label: "you know what -- 新しい話題の導入",
                trigger: "'You know what? I'm done.' を発音しろ。",
                points: {
                    core: { en: "You know what? + new thought", ja: '文頭 You know what? で決断・新発想の導入。「ちょっと聞いて」のサイン。' },
                    nuance: { en: "You know what? I'm just gonna do it. (announcing a decision)", ja: '相手の注意を引き、大事なことを言うぞの予告。' },
                    shift: { en: "'You know what? Never mind.' = changing direction mid-thought.", ja: '発言を取り消す時にも使える。思考の転換マーカー。' },
                    native: { en: "You know what? I'm just gonna call in sick tomorrow -- I've earned literally one mental health day, I swear to god.", ja: 'なあ聞いて、明日病欠で休むわ。マジで1日くらいメンタルヘルスデー取っていいよな、誓って。' },
                },
                trap: 'You know what? を「何を知ってる?」と質問だと思う。発言の予告、が正解。',
                tip: 'You know what? が出たら即「これから何か言うぞ」のサイン。内容に集中する準備。',
                reactions: {
                    master: "'You know what?' は話題導入の formulaic discourse marker。新情報導入の signal として固定化されている。",
                    lisa: "'You know what? I'm done with this.' -- this is how I announce a decision.",
                    takeshi: "'You know what?' は『聞いて』の合図。質問じゃないから、黙って続きを聞け。",
                    yuki: 'You know what? が新情報の予告、シンプルで覚えやすい。',
                    kenji: "会議で 'You know what? Let's just ship it.' って言えば決断感出る。",
                    mina: "You know what? I'm blocking him、って DM、決断の定型。若者も大人も使う。",
                },
            },
            {
                id: 'd26-p-04-you-know-emphasis',
                label: "you know + intensifier -- 強調前置き",
                trigger: "'She was, you know, like, incredibly upset.' を発音しろ。",
                points: {
                    core: { en: 'you know + intensifier (like / really / totally)', ja: 'you know + 強意語で「強調するぞ」の前置き。' },
                    nuance: { en: "You know, really, seriously... (stacking emphasis)", ja: '単独では弱いが、強意副詞と組むと「ヤバさ」を強調する。' },
                    shift: { en: "'You know, I swear to god...' = very strong emphasis coming.", ja: '強い誓いの前置きとしても機能。' },
                    native: { en: "She was, you know, like, genuinely devastated -- I've literally never seen her cry like that in the ten years I've known her.", ja: '彼女、マジで本当にボロボロで。10年の付き合いであそこまで泣くの、マジで初めて見た。' },
                },
                trap: 'you know + 強調語の組み合わせを全部フィラーと片付ける。強調のサインが含まれてると気づく。',
                tip: 'you know の後に really / genuinely / seriously が来たら「ここからヤバい話」の合図。',
                reactions: {
                    master: "'you know + intensifier' は強調の scaffolding (足場)。本体の強調語を受け止める余地を作る機能。",
                    lisa: "'You know, really, I can't even...' -- the 'you know' sets up the emotion that follows.",
                    takeshi: 'you know の後に really / seriously 来たら要警戒。本題が来る。',
                    yuki: "you know + 強意語で前置きになるの、覚えた。反応の準備ができる。",
                    kenji: "'You know, this is seriously concerning' って言えば重さが増す。",
                    mina: 'TikTok で \"you know like literally I was dying\" って流れ、典型的な強調積み上げ。',
                },
            },
            {
                id: 'd26-p-05-you-know-reconnect',
                label: "you know, -- 話題の再接続",
                trigger: "'You know, speaking of that...' を発音しろ。",
                points: {
                    core: { en: "You know, + reconnection", ja: '話題を戻したり繋げたりする時の合図。「あ、そういえば」に近い。' },
                    nuance: { en: "You know, that reminds me... (topic reactivation)", ja: '前に話してたことや相手が知ってる情報を再起動するサイン。' },
                    shift: { en: "'Oh, you know, like I was saying...' = returning to previous topic.", ja: '中断した話題に戻る時の定型。' },
                    native: { en: "You know, speaking of that -- did you ever hear back from her about the whole apartment thing? I've been wondering for weeks.", ja: 'あ、それで思い出したけど、あの部屋の件、彼女から返事あった? 何週間も気になってた。' },
                },
                trap: 'You know を全部フィラーと片付けて、話題の再接続サインを見逃す。文頭の位置で機能を判別。',
                tip: "文頭 You know, + 新しい話題は「そういえば」のサイン。意識して topic の切り替え聞き取る。",
                reactions: {
                    master: "文頭 'You know, ...' は topic reconnection marker。共有知識 (common ground) を起点に新話題を導入する。",
                    lisa: "'You know, speaking of which...' -- this is how I smoothly change topics in conversation.",
                    takeshi: "'You know' の位置 (文頭 or 文中) で機能が変わる。文頭なら話題移行の合図。",
                    yuki: "文頭 you know で話題転換、聞き取りの手がかりになる。",
                    kenji: "'You know, on that note...' って別話題に自然に移れる。会議で便利。",
                    mina: "DM の \"you know, speaking of...\" パターン、SNS でも話題ジャンプに使う。",
                },
            },
        ],
    },

    // ══════════════════════════════════════════════════
    // 文法: 分詞構文
    // ══════════════════════════════════════════════════
    grammar: {
        title: '分詞構文 -- 文を密にするショートカット',
        subtitle: 'Walking home / Having finished / Given the circumstances. 形の違いで時制と関係が自動で決まる。',
        intro: {
            question: 'なぜ分詞構文は書けるのに話せないのか?',
            insight: '分詞構文は2つの節を1つに圧縮する装置。接続詞 (when / because / if / although) と主語を削除し、動詞を -ing か -ed に変えて先頭に置く。結果、文が密になり、洗練された印象になる。\n\nルールは3形。(1) Walking home = 現在分詞、同時進行または現在の状態、(2) Having finished = 完了分詞、主節より前に起きたこと、(3) Given the circumstances = 過去分詞、受動または確定した状況。主節と分詞節の主語は原則一致する。\n\n最大の罠は dangling modifier (懸垂分詞)。主語が一致しないと文が壊れる。Walking down the street, the tree was beautiful. (× 木が歩いてることになる)。主語を意識して書く / 話すのが重要。\n\n分詞構文は話し言葉ではあまり使われないが、書き言葉・プレゼン・改まった場面では頻出。TOEIC 900+ の壁はここ。今日の5つで3形と慣用表現を全部潰す。',
        },
        tldr: 'Walking / Having finished / Given + 節。主節と主語を一致させれば文が密になる。',
        items: [
            {
                id: 'd26-g-01-present-participle',
                label: "Walking home, ... -- 現在分詞、同時進行",
                trigger: '「家に歩いて帰りながら、彼女に電話した」を英語で。',
                points: {
                    core: { en: 'Walking home, I called her.', ja: '現在分詞 -ing で「〜しながら」「〜する時に」を表す。主節と同時進行。' },
                    nuance: { en: "= While I was walking home, I called her. (compressed)", ja: '接続詞 while と主語 I を削除、動詞を -ing 化してショートカット。' },
                    shift: { en: "'Feeling exhausted, she sat down.' -- state verbs also work.", ja: '動作動詞だけでなく状態動詞 (feel, know, see) でも可能。' },
                    native: { en: "Walking home from the station last night, I literally ran into my ex -- I swear to god, I wanted the sidewalk to swallow me whole.", ja: '昨夜駅から歩いて帰る途中、マジで元カレにバッタリ会ったんよ。誓って、歩道が俺を呑み込んでほしかった。' },
                },
                trap: '分詞構文の主語を省略すると、主節の主語と自動的に一致することを忘れて dangling modifier を作る。',
                tip: "分詞の動作をするのが主節の主語か? 一致すればOK、違えば書き換える。",
                reactions: {
                    master: '現在分詞構文は同時性または進行中の状態を示す。接続詞削除 + 主語一致 が成立条件。',
                    lisa: "'Walking home, I realized...' -- this sounds literary but totally natural in narrative.",
                    takeshi: "主語一致の原則、ここ守れんと全部崩れる。Walking した人と主節の主語を一致させろ。",
                    yuki: '分詞構文、同時進行の時に使えるって覚える。並列より密になる。',
                    kenji: "報告書で 'Reviewing the data, we found...' とか使えば文が引き締まる。",
                    mina: '"Walking home crying..." みたいな書き出し、小説や note で使うと雰囲気出るやん。',
                },
            },
            {
                id: 'd26-g-02-perfect-participle',
                label: "Having finished, ... -- 完了分詞、主節より前",
                trigger: '「仕事を終えた後、彼は帰宅した」を英語で。',
                points: {
                    core: { en: 'Having finished his work, he went home.', ja: 'Having + 過去分詞 で「〜し終えた後」。主節より前の動作。' },
                    nuance: { en: "= After he finished his work, he went home. (time sequence)", ja: '接続詞 after を削り、時制差を分詞の完了形で表現。' },
                    shift: { en: "'Having been rejected, she applied elsewhere.' -- passive perfect works too.", ja: 'Having been + 過去分詞で受動の完了形。「〜された後」。' },
                    native: { en: "Having basically lived on coffee and granola bars for three weeks straight, I am genuinely about to collapse the second I sit down.", ja: 'もう3週間コーヒーとグラノーラバーだけで生きてきたから、座った瞬間マジで倒れそうなんだが。' },
                },
                trap: '時間の前後関係があるのに Having を使わず -ing だけで処理する。時制差がある時は Having + pp。',
                tip: '主節より前に起きた動作なら Having finished、同時なら Finishing。時制差の有無で選ぶ。',
                reactions: {
                    master: '完了分詞構文 (Having + pp) は時制シフトを分詞側で担う。主節が過去なら分詞は過去より前 (大過去)。',
                    lisa: "'Having spent hours on this, I just need a break.' -- very natural, showing the sequence.",
                    takeshi: "Having + pp、『終わったあとに〜』の型。同時なら -ing、前後なら Having。ここで混ざるな。",
                    yuki: 'Having finished、完了の時制差を分詞側で出せるの便利。',
                    kenji: "報告書で 'Having reviewed the draft, I have some comments' って切り出せばプロっぽい。",
                    mina: "DM で \"having waited 2 hours...\" って書くと不満感が一段強調される。",
                },
            },
            {
                id: 'd26-g-03-past-participle',
                label: "Given the circumstances, ... -- 過去分詞、受動・確定",
                trigger: '「状況を考えれば、それは最善の選択だった」を英語で。',
                points: {
                    core: { en: 'Given the circumstances, it was the best choice.', ja: 'Given + 名詞で「〜を考えると」「〜を前提とすれば」。慣用化された過去分詞構文。' },
                    nuance: { en: "= If we consider the circumstances / Considering... (conditional / causal)", ja: 'considering と入れ替え可能。「〜を踏まえて」の論証マーカー。' },
                    shift: { en: "'Left alone, she felt afraid.' -- passive participle for state.", ja: '過去分詞単体で「〜された状態で」を表す通常用法もある。' },
                    native: { en: "Given how brutal this quarter's been, I'm honestly impressed anyone on the team is still showing up at 9 AM with a smile.", ja: '今期の厳しさ考えたら、チームの誰かが朝9時に笑顔で出社してること自体マジで感動もん。' },
                },
                trap: "Given を「与えられた」で直訳する。「〜を前提にすれば」の論証接続詞と認識。",
                tip: "Given + 名詞/節 は「〜を考えると」の論証定型。Considering に置き換えて意味を取る。",
                reactions: {
                    master: 'Given は過去分詞由来の前置詞的接続詞。条件・前提を示す論証装置として確立している。',
                    lisa: "'Given the situation, we should probably wait' -- I use this in emails all the time.",
                    takeshi: "'Given ...' の構文、ビジネスで超使う。「〜を踏まえて」の英語版。",
                    yuki: "Given + 名詞、考慮・前提のマーカー。覚えれば一段上の英語。",
                    kenji: "'Given the deadline, we need to prioritize' って言えたら説得力増す。",
                    mina: 'DM で \"given how you ignored me...\" って書く時、責める前提として機能するやん。',
                },
            },
            {
                id: 'd26-g-04-dangling-modifier',
                label: "懸垂分詞 -- 主語がズレると文が壊れる",
                trigger: "次の文は正しい? 'Walking down the street, the tree was beautiful.'",
                points: {
                    core: { en: 'Wrong. The tree is not walking.', ja: '主節の主語 (the tree) が walking の動作主と一致しない → 懸垂分詞の典型ミス。' },
                    nuance: { en: "Fix: Walking down the street, I saw a beautiful tree.", ja: '主節の主語を walking の動作主 (I) に揃えると正文になる。' },
                    shift: { en: "Or rewrite with a full clause: 'As I walked down the street, I saw...'", ja: '分詞を使わず接続詞で書けば主語を明示できて安全。' },
                    native: { en: "'Walking down Fifth Ave, the lights were incredible' -- technically wrong but honestly, you hear this all the time in casual speech.", ja: '「5番街を歩いてたら、ライトがすごかった」って、文法的にはアウトやけど普通に会話で出るやつ。' },
                },
                trap: '分詞の主語が一致しない文を書いてしまい、論理的に意味不明になる。主語チェックが必須。',
                tip: '分詞構文を書いたら必ず「この動作をしてるのは誰?」を主節の主語と照合する。',
                reactions: {
                    master: '懸垂分詞 (dangling modifier) は分詞節と主節の主語不一致によって生じる統語エラー。意味崩壊を引き起こす。',
                    lisa: "Technically 'Walking down the street, the tree was beautiful' is wrong, but people say stuff like this all the time. In writing, I'd fix it.",
                    takeshi: "書く時は主語一致、話す時は少し許される。書き言葉では絶対厳守。",
                    yuki: '懸垂分詞、落とし穴過ぎる。書いた後チェックする癖つける。',
                    kenji: "メールで 'Reviewing the report, errors were found' って書いてないか要確認。エラーが review したことになる。",
                    mina: '会話では流れるけど、ちゃんとした文書で懸垂分詞書いたら一気に信頼落ちる。',
                },
            },
            {
                id: 'd26-g-05-idiomatic-participle',
                label: "慣用分詞構文 -- generally speaking / all things considered",
                trigger: '「一般的に言うと、彼は信頼できる」を英語で。',
                points: {
                    core: { en: 'Generally speaking, he is reliable.', ja: 'generally speaking は「一般論として」の慣用分詞構文。主語一致ルールから外れる。' },
                    nuance: { en: "= Generally / In general, he is reliable.", ja: '接続詞 while one is speaking generally の圧縮形が固定化したもの。' },
                    shift: { en: "'All things considered' / 'Judging from ...' / 'Speaking of ...'", ja: '他に all things considered (総合的に見て)、judging from (〜から判断すると) などの慣用表現。' },
                    native: { en: "Generally speaking, if I haven't slept at least seven hours, I literally cannot be held responsible for anything that comes out of my mouth.", ja: '基本的に、7時間寝てへん日は、俺の口から出る発言、マジで何一つ責任取れんからな。' },
                },
                trap: '慣用分詞構文を主語一致ルールで書き換えようとする。これらは独立した慣用句として固定。',
                tip: 'generally speaking / strictly speaking / all things considered は丸ごと慣用句として覚える。',
                reactions: {
                    master: '慣用分詞構文は独立節相当の adverbial として固定化され、主語一致ルールの例外として機能する。',
                    lisa: "'Generally speaking, I don't like spicy food' -- I use this whenever I need to generalize politely.",
                    takeshi: "'Generally speaking' 系は主語チェック不要。丸暗記の定型句、と割り切れ。",
                    yuki: '慣用分詞、例外として覚えとく。Generally speaking、超使える。',
                    kenji: "報告で 'All things considered, this is the best option' って言えたら締まる。",
                    mina: '"Strictly speaking..." とか使うと、急に知的な印象になる。DM でもたまに使う。',
                },
            },
        ],
    },
};
