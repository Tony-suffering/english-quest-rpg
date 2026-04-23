import type { Native365Day } from '@/types/native365';

/**
 * Day 2
 *
 * 発音: 語強勢の山 (PRE-sent vs pre-SENT)  -- 同じ綴りで品詞が変わると山の位置が変わる
 * 文法: will vs going to vs be -ing          -- 未来の3択、話者の頭の中が違う
 */

export const DAY_02: Native365Day = {
    day: 2,
    week: 1,
    month: 1,

    opening: {
        scene: '夜の居酒屋。カウンター。昨日 schwa で開眼した男が、次は強勢の位置で同じ単語が別物に化ける壁にぶつかった。',
        lines: [
            { char: 'master',  text: "present という単語、名詞では PRE-sent、動詞では pre-SENT。山の位置で品詞が割れる。" },
            { char: 'takeshi', text: "これ日本語脳にはない発想だ。「プレゼント」は1つの音でしか出せない。英語は山の位置で意味を切る。" },
            { char: 'lisa',    text: "And tomorrow and 'I'll do it' -- 同じ未来でも頭の中が違う。そこも今日潰す。" },
        ],
    },

    pronunciation: {
        title: '語強勢の山 -- 同じ綴りで山が動くと品詞が変わる',
        subtitle: 'PRE-sent (名詞) と pre-SENT (動詞) は音が違えば意味が違う。山1つの位置で勝負が決まる。',
        intro: {
            question: 'なぜ日本人の英語は「名詞なのか動詞なのか」がネイティブに伝わりにくいのか?',
            insight: '日本語は高低アクセント (pitch accent)。「橋・端・箸」のように音の上下で語を区別するが、強さの差ではない。英語は強勢アクセント (stress accent)。母音を長く、大きく、ハッキリ出す部分が山になり、他は潰す。この山が品詞を決定する語が英語には数百ある。\n\n二音節の名詞/動詞ペアは特に頻出。名詞は第一音節に山 (PRE-sent, RE-cord, OB-ject)、動詞は第二音節に山 (pre-SENT, re-CORD, ob-JECT)。これは中学で習う語彙なのに、日本語教育では山の位置を教えない。結果、TOEIC 900 でも「I will present the report」が「I will PRE-sent the report」と名詞読みされて、ネイティブには「報告書 present する?」と意味不明な波形で届く。\n\n今日の5語で「山の位置=品詞」の感覚を体に入れる。強勢は発音ではなく文法情報。これが掴めると、動詞で置いたのに名詞に聞こえる事故がなくなる。',
        },
        tldr: 'present / record / object / increase / refuse の5語で名詞 vs 動詞の山位置スイッチを体に入れる。',
        items: [
            {
                id: 'd2-p-01-present',
                label: 'present -- PRE-sent (名) / pre-SENT (動)',
                trigger: "'I will present the present' を発音しろ。",
                points: {
                    core: { en: 'noun /ˈprez.ənt/, verb /prɪˈzent/', ja: '名詞は第一音節 PRE、動詞は第二音節 SENT に山。' },
                    nuance: { en: "The PRE-sent is a gift. To pre-SENT is to give.", ja: '山が前=モノ、山が後ろ=動作。この対応は英語の二音節語に広く効く。' },
                    shift: { en: "Even 'the present' (= now) keeps first-syllable stress: PRE-sent moment.", ja: '「現在」の意味の present も名詞・形容詞扱いで山は前。動詞の時だけ後ろ。' },
                    native: { en: "Okay so I'm gonna pre-SENT the slides first, then we'll do the awards and hand out the PRE-sents at the end.", ja: 'じゃ最初にスライドでプレゼンやって、最後に表彰してプレゼント配る流れで。' },
                },
                trap: 'カタカナ「プレゼント」で常に PRE に力が入る。動詞で使うと「名詞なのに何するつもり?」と通じない。',
                tip: '動詞の時だけ意識的に後ろに山を移す。「present する」の「する」の瞬間に音を SENT に押し込む。',
                reactions: {
                    master: '二音節語の名詞/動詞ペアは英語で定型。山を前か後ろかで品詞を聞き分ける習慣が、英語話者の耳には埋め込まれている。',
                    lisa: "If you say 'I'll PRE-sent' I literally don't hear a verb. My brain waits for an object because it sounds like a noun.",
                    takeshi: '「プレゼント」の1音で名詞も動詞も処理しようとするから、動詞の時に事故る。山を後ろに動かすだけで直る。',
                    yuki: '山の位置が品詞を決めるなんて、学校で1度も教わらなかった。今日の衝撃これ。',
                    kenji: '現場で I will present this plan、pre-SENT で山後ろに置かんと「プレゼント配るんか?」って顔される。',
                    mina: 'TikTokでネイティブが present を発音する時、名詞か動詞かで全然違う波形やん。あれ山の位置やったんや。',
                },
            },
            {
                id: 'd2-p-02-record',
                label: 'record -- RE-cord (名) / re-CORD (動)',
                trigger: "'She broke the record' と 'She will record the song' を発音しろ。",
                points: {
                    core: { en: 'noun /ˈrek.ərd/, verb /rɪˈkɔːrd/', ja: '名詞 RE の母音は /e/、動詞 CORD の母音は /ɔːr/。山移動で母音の質まで変わる。' },
                    nuance: { en: "A RE-cord is a thing. To re-CORD is an action.", ja: '山の位置=品詞、という対応はここでも有効。' },
                    shift: { en: "World RE-cord (noun + modifier) vs Let me re-CORD it (verb).", ja: '文の中での働きを取るので、前置に来れば名詞、動詞位置なら動詞。' },
                    native: { en: "Hey, do you mind if I re-CORD this call real quick? I just wanna make sure it goes into the client's RE-cord properly.", ja: 'ちょっと、この通話録音していい? ちゃんとクライアントの記録に残したいだけだから。' },
                },
                trap: '「レコード」の1音で両方出す。動詞の時 RE-cord と言うと、ネイティブは一瞬「え、今のもう名詞?」と止まる。',
                tip: '動詞の時は母音まで意識的に変える。RE の /e/ から CORD の /ɔːr/ へ、音を後ろに引っ張る。',
                reactions: {
                    master: '名詞と動詞で強勢位置と母音質がセットで変わる。山移動は単なる音量ではなく音質まで引きずる。',
                    lisa: "I hear 'RE-cord' I think vinyl or a world record. 'Re-CORD' I hear action. Totally different words to me.",
                    takeshi: '日本語の「レコード」は1音で完結。英語はこの語が2つの単語に割れてると腹を括れ。',
                    yuki: '強勢が変わると母音の音まで変わるなんて、完全に別単語じゃん。',
                    kenji: '会議メモで Record this って言われる場面、re-CORD で正解や。山の位置、体に叩き込む。',
                    mina: 'Spotify に上がる before/after の音源で、アナウンサーが record を言い分けるの聴くと分かるわ。',
                },
            },
            {
                id: 'd2-p-03-object',
                label: 'object -- OB-ject (名) / ob-JECT (動)',
                trigger: "'I object to this object' を発音しろ。",
                points: {
                    core: { en: 'noun /ˈɒb.dʒɪkt/, verb /əbˈdʒekt/', ja: '名詞は OB、動詞は JECT。動詞側で O が schwa 化する。' },
                    nuance: { en: "An OB-ject is a thing. To ob-JECT is to disagree.", ja: '物理的な物体 vs 反対するという動作、完全に意味が割れる。' },
                    shift: { en: "Objection! (名詞形) keeps the 'OB' stress.", ja: '法廷ドラマの Objection! は名詞派生なので前に山。動詞形 ob-JECT とは違う。' },
                    native: { en: "Honestly, I'd ob-JECT to that whole approach, but the OB-ject of this meeting was supposed to be saving time, so whatever.", ja: '正直そのやり方には反対なんだけど、この会議の目的は時間短縮のはずだったから、もういいや。' },
                },
                trap: '動詞 object を「オブジェクト」で押し切る。「反対します」の意味が一切伝わらず、ネイティブは話の流れで逆算するしかない。',
                tip: '反対の意思を示す瞬間に、山を JECT の J に向けて押し込む。弱く始めて後半で爆発させるイメージ。',
                reactions: {
                    master: '-ject で終わる動詞 (reject, project, inject) は全て第二音節強勢。派生名詞 (rejection, projection) は -tion 直前が強勢。規則性あり。',
                    lisa: "If you OB-ject in a meeting with first-stress, it sounds like you're naming a noun, not disagreeing. Totally loses force.",
                    takeshi: '「オブジェクト」で意見表明しようとすると、誰も反対だと気づかない。山を動かすだけで会議が動く。',
                    yuki: 'objection は山が前、object の動詞は山が後ろ。規則で覚えると楽になる。',
                    kenji: '打ち合わせで I object to this、ob-JECT で山立てて言えば「反対」がちゃんと伝わるな。',
                    mina: '裁判ドラマで弁護士が「Objection!」って叫ぶの、あれ名詞形の OB 強勢やったんか。気付き。',
                },
            },
            {
                id: 'd2-p-04-increase',
                label: 'increase -- IN-crease (名) / in-CREASE (動)',
                trigger: "'The increase in sales will increase our budget' を発音しろ。",
                points: {
                    core: { en: 'noun /ˈɪn.kriːs/, verb /ɪnˈkriːs/', ja: '名詞は IN、動詞は CREASE。動詞の方が語尾の /iːs/ が長く伸びる。' },
                    nuance: { en: "An IN-crease is a number. To in-CREASE is to make it go up.", ja: '結果 (名詞) か動作 (動詞) かで山が動く。ビジネス英語頻出ペア。' },
                    shift: { en: "Decrease follows the exact same pattern: DE-crease (n) / de-CREASE (v).", ja: '対義語も同じ型。覚えれば1ペア、効果2ペア。' },
                    native: { en: "Dude, if sales actually in-CREASE next quarter the way the forecast says, that'll literally be the biggest IN-crease we've ever pulled off.", ja: 'おい、予測通り来期の売上伸びたら、マジで過去最大の伸び幅になるぞ。' },
                },
                trap: '「インクリース」で名詞・動詞の区別なく読む。グラフが上がったのか上げたいのか、聞き手が動詞か結果か判別できない。',
                tip: '動詞の時は「上げるぞ」という意志を CREASE に乗せる。名詞の時は最初に数字をドンと置くイメージで IN。',
                reactions: {
                    master: '二音節でラテン語起源の動詞/名詞ペアは多くがこの型 (in/export, in/contest など)。ストックで覚えると効率的。',
                    lisa: "In a business meeting if you say 'The IN-crease will IN-crease' with same stress both times, the second one sounds wrong to me.",
                    takeshi: 'ビジネス会議で increase は1日10回は出る。山を2つ持って使い分ける癖を今日で作れ。',
                    yuki: 'decrease も同じパターンなの、めちゃ効率いい覚え方。',
                    kenji: '現場で Production will increase、in-CREASE で山後ろにして言えば「これから上げる」と伝わる。',
                    mina: 'インスタで売上グラフ貼るキャプションに IN-crease / in-CREASE 使い分けると知的に見えそう。',
                },
            },
            {
                id: 'd2-p-05-refuse',
                label: 'refuse -- REF-use (名: ゴミ) / re-FUSE (動: 拒む)',
                trigger: "'They refuse to collect the refuse' を発音しろ。",
                points: {
                    core: { en: 'noun /ˈref.juːs/, verb /rɪˈfjuːz/', ja: '名詞「ゴミ」は REF、語尾 /s/。動詞「拒む」は FUSE、語尾 /z/。綴りは同じでも末尾の子音まで違う。' },
                    nuance: { en: "REF-use (trash) and re-FUSE (decline) aren't really the same word to me.", ja: 'ネイティブの感覚では別単語扱い。山・母音・末尾子音が全部ズレる。' },
                    shift: { en: "Refusal (名詞派生) is /rɪˈfjuː.zəl/ -- stress stays on 'FU', like the verb.", ja: '動詞派生の名詞化 refusal は動詞の山を引き継ぐ。' },
                    native: { en: "Can you believe these guys? They literally re-FUSE to take out the REF-use, like it's somehow beneath them.", ja: '信じられる? あいつら本気でゴミ出し拒否してるんだよ、格に合わないみたいな顔して。' },
                },
                trap: '「リフューズ」で統一。名詞の「ゴミ」の意味がそもそもあるとは知らない人が多く、会話で refuse collector (清掃員) を聞いても接続できない。',
                tip: '名詞時は REF に置いて短く切る。動詞時は FUSE に向けて声帯を震わせ、語尾を /z/ で響かせる。',
                reactions: {
                    master: '同一綴りで名詞と動詞の語尾子音まで違うのは refuse, use, close, house など。山の位置と末尾の有声/無声が連動する。',
                    lisa: "REF-use is literally garbage to me. Re-FUSE is to say no. Different words wearing the same costume.",
                    takeshi: '「拒否する」の refuse は馴染みがあっても、「ゴミ」の refuse は盲点。語彙が倍に増えるボーナス。',
                    yuki: '山の位置で末尾の子音の有声/無声まで変わるの、英語の仕組みが深い。',
                    kenji: "現場で Refuse collection って看板見ても、REF-use だと分かれば「ゴミ収集」って読める。",
                    mina: 'フリマアプリで「refuse」って書く時、動詞の断るかゴミかで山が違うって知ってると使いやすい。',
                },
            },
        ],
    },

    grammar: {
        title: 'will vs going to vs be -ing -- 未来の3択で話者の頭の中が分かる',
        subtitle: '未来はどれも訳せば「〜する」。選ぶ基準は「いつ決めたか」と「確度」。',
        intro: {
            question: 'なぜ日本人は未来を全部 will で片付けてしまうのか?',
            insight: '日本語の未来は「〜する」「〜するつもり」「〜することになってる」で分岐するが、会話ではほとんど「〜する」で済む。明示しなくても文脈で伝わる曖昧さが日本語の強み。\n\n英語は逆で、話者が未来を「いつ・どう決めたか」を動詞で出す義務がある。will は今この瞬間に決めた (spontaneous decision)。going to は以前から決めていた (prior plan, intention)。be -ing (現在進行形の未来) はスケジュール上で既に確定している (arrangement with other people)。この3つは交換不可能で、間違えるとネイティブには「この人いつ決めたんだ?」「本当に予定あるの?」と違和感を与える。\n\n解決策は「いつ決めた?」と自問する1ステップを挟むこと。今決めた → will。前から思ってた → going to。相手と約束済み → be -ing。3択を言葉ではなく時間軸で選ぶ。',
        },
        tldr: '「いつ決めた?」の1問で will / going to / be -ing を切る。',
        items: [
            {
                id: 'd2-g-01-spontaneous',
                label: "I'll get it -- 今決めた will",
                trigger: '「(電話が鳴って) 俺が出る」を英語で。',
                points: {
                    core: { en: "I'll get it.", ja: 'たった今、この瞬間に決めた行動に will。' },
                    nuance: { en: "I'll get it -- decided the moment I hear the phone.", ja: '話す0.5秒前に決めた未来。going to だと「前から出るつもり」で気持ち悪い。' },
                    shift: { en: "'I'm going to get it' would only make sense if you'd already announced it.", ja: '同じ状況で going to を使うと「前から宣言してた」含みが出て不自然。' },
                    native: { en: "Hey don't even worry about the dishes -- I'll take care of them in the morning, I swear.", ja: '食器のことは気にしないでいいから。朝やっとくよ、ほんとに。' },
                },
                trap: "その場で決めた未来を I'm going to で出す。ネイティブは「前から出ると決めてたの?」と違和感を覚える。",
                tip: '電話・ドアベル・誰かの困った顔 → 0.5秒で反応する未来は全部 will。助走なしで口を開く。',
                reactions: {
                    master: "will = 発話時点で意思決定。going to = 発話前に既に意思決定済み。決定のタイムスタンプが違う。",
                    lisa: "If the phone rings and you say 'I'm going to get it' I'll think you were planning this before it even rang. Weird.",
                    takeshi: '「今決めた」瞬間を will で出せるか。これができないと未来全部 going to に塗りつぶす事故が起きる。',
                    yuki: '学校では will = 単純未来、going to = 意志未来って習ったけど、「いつ決めた」で切る方が腑に落ちる。',
                    kenji: "現場で急に手伝い頼まれた時、I\\'ll do it でサッと出せたら頼れる兄ちゃんや。",
                    mina: "DMで即レス返す時も I'll + 動詞。going to だと返信遅れてた言い訳みたい。",
                },
            },
            {
                id: 'd2-g-02-plan',
                label: "I'm going to -- 前から決めてた予定",
                trigger: '「来月イタリア行くんだ」を英語で。',
                points: {
                    core: { en: "I'm going to Italy next month.", ja: '以前から計画していた未来。話者の頭の中に既に存在する予定。' },
                    nuance: { en: "I'm going to Italy -- I've been planning this for weeks.", ja: 'going to は意思決定が過去に済んでいることを示す。「行くんだ」のニュアンス。' },
                    shift: { en: "'I'll go to Italy' sounds like you just decided right now, mid-conversation.", ja: '同じ内容を will で出すと「今決めた」感が出て、計画済みのトーンと矛盾する。' },
                    native: { en: "Okay so I'm gonna try that new ramen spot tonight around 7 -- you wanna come with or you got other plans?", ja: 'じゃ7時ごろあの新しいラーメン屋行ってみる。一緒に行く? それとも他に予定あり?' },
                },
                trap: '「行く予定」を will で出す。ネイティブは「この人さっき決めた?」と予定の現実味を疑う。',
                tip: '頭の中に既に予定が存在するなら going to。新情報として相手に出す時も going to。前提が「前から」であればこれ。',
                reactions: {
                    master: 'going to の語源は go (物理的な動作) + to (方向)。「既にその方向に動き始めている」イメージで、予定の既定感を生む。',
                    lisa: "'I'm going to move to NYC' sounds real. 'I'll move to NYC' sounds like you just thought of it this second.",
                    takeshi: '「〜するつもり」の未来を will でやっつけてると、すべての予定が「今思いつき」に聞こえる。going to に切り替えろ。',
                    yuki: "将来の夢も I\\'m going to be a teacher って言う方が自然なのか。意志と重さが変わる。",
                    kenji: "来月の予定話す時、I'm gonna go to Osaka next week でいけば自然に響く。",
                    mina: "ストーリーに「next week 大阪行く」って書く時、I\\'m going to / gonna が普通やね。will だとちょい硬い。",
                },
            },
            {
                id: 'd2-g-03-arrangement',
                label: "I'm meeting him -- 確定アポは現在進行形",
                trigger: '「明日7時にジョンと会うんだ」を英語で。',
                points: {
                    core: { en: "I'm meeting John at 7 tomorrow.", ja: '相手と約束済みで確定している未来は現在進行形 (be -ing) で出す。' },
                    nuance: { en: "I'm meeting him -- we've already arranged it.", ja: '相手と合意済みなので、もう進行が始まっている感覚。going to より確定度が高い。' },
                    shift: { en: "'I'm going to meet him' = I plan to, but not confirmed. 'I'm meeting him' = we've agreed on it.", ja: 'going to は自分だけの計画。be -ing は相手との合意が存在する。' },
                    native: { en: "Actually I'm meeting the team at 3, so can we push our chat till like 4:30? Sorry for the last-minute shuffle.", ja: 'ごめん、3時にチームと会う予定入ってるから、話は4時半ごろまで延ばせる? 直前で動かしちゃって悪い。' },
                },
                trap: "確定アポを I'll meet him で出す。「明日会うって決めたの今?」とアポ実在を疑われる。",
                tip: '相手の名前が出てきて、時間まで決まっている → 現在進行形で出す。「進行中のアレンジメント」と理解する。',
                reactions: {
                    master: '未来の be -ing は「arrangement (取り決め)」を表す。スケジュール帳に書かれた予定に専用の文法形。',
                    lisa: "Ask me 'What are you doing Friday?' I'll say 'I'm grabbing dinner with mom.' It means it's locked in.",
                    takeshi: '予定の確定度で will < going to < be -ing と階段がある。アポは一番上の段で表現しろ。',
                    yuki: '現在進行形が未来を指すなんて、頭が混乱してた。でも「もう動き始めてる」と思えば納得。',
                    kenji: "明日の打ち合わせ、I\\'m meeting the client at 3 でいけば「決まってる」感が伝わる。",
                    mina: 'カレンダーに入れた予定は全部 be -ing で答えるのが自然。going to だと「するつもり」でまだ変えられそう。',
                },
            },
            {
                id: 'd2-g-04-evidence',
                label: "It\\'s going to rain -- 証拠ベースの予測",
                trigger: '「雨降りそう」を英語で。',
                points: {
                    core: { en: "It's going to rain.", ja: '目の前の証拠 (黒い雲・湿気) から導く予測は going to。' },
                    nuance: { en: "Look at those clouds -- it's gonna pour.", ja: '証拠に裏打ちされた予測。will より根拠がある。' },
                    shift: { en: "'It will rain tomorrow' = prediction from a forecast or feeling, no immediate evidence.", ja: '目の前に証拠がなく、一般的な見通しや感覚で言う未来は will。' },
                    native: { en: "Whoa watch out -- you're literally gonna slip on that patch of ice if you don't pay attention.", ja: 'ちょ、気をつけて。そのままだとあの氷でマジで滑るよ。' },
                },
                trap: '天気予報で will、目の前の雲で going to、この区別を持たずに全部 will で出すと「なんの根拠もない予言者」に聞こえる。',
                tip: '空・相手の動き・皿の傾き、目の前に「前兆」があれば going to。根拠ゼロの見通しなら will。',
                reactions: {
                    master: '予測の will と going to は「根拠の有無」で住み分ける。証拠ありが going to、勘や一般知識が will。',
                    lisa: "'It's gonna rain' -- I can see the clouds. 'It'll rain tomorrow' -- I saw the forecast. Both valid, different reasons.",
                    takeshi: '天気予報なら will、空が黒ければ going to。根拠がどこにあるか指差せる未来かどうかで分けろ。',
                    yuki: '予測でも will と going to が違うの深い。天気の話が急に繊細になった。',
                    kenji: "現場で You\\'re going to slip って警告するの、going to で瞬時に出せるとケガ防げる。",
                    mina: 'インスタのストーリーで「雨やばそう」の英語、going to pour って言うと写真と合ってて自然やん。',
                },
            },
            {
                id: 'd2-g-05-schedule',
                label: 'The train leaves at 6 -- 時刻表は現在形',
                trigger: '「電車は6時に出発するよ」を英語で。',
                points: {
                    core: { en: 'The train leaves at 6.', ja: '時刻表・スケジュールで決まっている未来は現在形。' },
                    nuance: { en: "The movie starts at 8. -- Fixed, public, unchangeable.", ja: '個人の意志を超えて決まっている公的予定は現在形で出す。' },
                    shift: { en: "'The train is leaving at 6' only works if you mean right now, this specific train.", ja: '同じ現在進行形でも「まさに今出発する」の意味に寄るので、スケジュールの未来とは別文脈。' },
                    native: { en: "Ugh, my flight leaves at 6 a.m. tomorrow, so honestly I should probably just crash early and call it a night.", ja: 'あー、明日の飛行機6時発だから、正直もう早めに寝て今夜は切り上げた方がいいな。' },
                },
                trap: '時刻表の未来を will で出す。「電車が6時に出るって今決めた?」ぐらい違和感。公的スケジュールに個人意志は乗らない。',
                tip: '主語が電車・バス・映画・店の開店時刻 → 動詞は現在形でいい、と機械的に処理する。',
                reactions: {
                    master: '未来を現在形で表すのは scheduled future と呼ばれる特殊用法。公的・固定された未来にのみ適用される。',
                    lisa: "'The train leaves at 6' is automatic. 'The train will leave at 6' sounds like someone just decided the schedule.",
                    takeshi: '時刻表・開店時間・試験日、個人で動かせない未来は現在形で吐き出す。ここだけルール違う。',
                    yuki: '未来を現在形で言うって最初違和感あるけど、「決まってる事実」と思えば納得する。',
                    kenji: "出張の新幹線、The Shinkansen leaves at 7:30 am でサッと言えれば段取り上手に見える。",
                    mina: '映画の上映時刻聞かれて starts at 7 でいけば自然、will starts は一発でカタコトに見える。',
                },
            },
        ],
    },
};
