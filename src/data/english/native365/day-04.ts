import type { Native365Day } from '@/types/native365';

/**
 * Day 4
 *
 * 発音: 縮約 (gonna / wanna / hafta / gotta)  -- 助動詞レベルで融合する口語形
 * 文法: 動名詞 vs to 不定詞 -- 動詞で分かれる  -- enjoy to see が間違いな理由
 */

export const DAY_04: Native365Day = {
    day: 4,
    week: 1,
    month: 1,

    opening: {
        scene: '夜の居酒屋。カウンター。連結の次は、特定の動詞+to が完全に融合して新しい動詞になる話題に入った。',
        lines: [
            { char: 'mina',    text: "『gonna』って教科書では見ないけど、字幕はだいたいこれ。going to は実際何回言われるん?" },
            { char: 'lisa',    text: "Almost never in casual speech. gonna, wanna, hafta, gotta -- these are the real verbs.", },
            { char: 'master',  text: "文法側も近い話がある。enjoy + to see は絶対ダメ、enjoy seeing。この動詞の選り好み、今日潰す。" },
        ],
    },

    pronunciation: {
        title: '縮約 (gonna / wanna / hafta / gotta) -- 教科書にない本物の助動詞',
        subtitle: '書き言葉の going to は実話で gonna。書き起こせない形が音の本体。',
        intro: {
            question: 'なぜ going to と書いてあるのに gonna としか聞こえないのか?',
            insight: "英語の縮約 (reduction / contraction) は連結の延長線上にある。特に頻出の「動詞+to」は使用頻度が高すぎて、音が融合して新しい動詞として定着した。going to → gonna、want to → wanna、have to → hafta、got to → gotta、used to → yusta。これらは「崩れた発音」ではなく「別の正式な発音形」。\\n\\n重要なのは、縮約形は書き言葉では原則使わないが、音としては完全に標準形であるという点。ネイティブがフォーマルな場面でも「I'm gonna present」と発音する。スクリプトでは going to と書かれるが音は gonna。これを理解しないと、スクリプトと音のギャップに永遠に悩まされる。\\n\\nさらに縮約は意味限定でも起きる。want to の gonna 化は不定詞 (to + 動詞) の場合のみ。I'm going to the store (前置詞の to) は gonna にならない。ここを混同するとリスニングが全部 gonna に聞こえて崩壊する。",
        },
        tldr: 'gonna / wanna / hafta / gotta / yusta の5形で口語の本物の助動詞を体に入れる。',
        items: [
            {
                id: 'd4-p-01-gonna',
                label: 'gonna = going to + 動詞',
                trigger: "'I'm going to eat' を gonna で発音しろ。",
                points: {
                    core: { en: "I'm gonna eat. /aɪm ˈɡʌn.ə iːt/", ja: 'going to + 動詞 のみ gonna。going to + 名詞 (場所) は gonna にならない。' },
                    nuance: { en: "I'm going to the store vs I'm gonna go to the store -- only the second one uses gonna.", ja: '場所を示す to は縮約しない。不定詞の to だけ縮約対象。' },
                    shift: { en: "In songs and casual writing: 'gonna' is fine. In essays: write 'going to'.", ja: '書き言葉と話し言葉で選択肢が違う。テキスト・フォーマルなら going to。' },
                    native: { en: "I'm gonna crash -- long day.", ja: '寝る宣言の定型。gonna でテンポ良く出る。' },
                },
                trap: "場所の to まで gonna 化する。I\\'m gonna the store は絶対に言わない。動詞が続く時だけ縮約可能。",
                tip: 'to の後ろを見る。動詞なら gonna OK、名詞 (場所) なら going to のまま。文法の判定1ステップ。',
                reactions: {
                    master: "gonna は going to の auxiliary 用法 (= 未来助動詞) にのみ適用される縮約。本動詞 go to a place には適用されない。",
                    lisa: "'I'm gonna Tokyo' -- nope, never. 'I'm gonna visit Tokyo' -- yes, all day every day.",
                    takeshi: '場所の to まで gonna にしてる奴、めっちゃ多い。動詞か名詞か、後ろ見て判別しろ。',
                    yuki: '同じ going to でも縮約できる時とできない時がある。見分け方がやっとハッキリした。',
                    kenji: "I'm gonna finish this by 5、現場の報告で使えて短くキマる。",
                    mina: "SNSの「I\\'m gonna...」ミーム、全部動詞続いてる。文法のルール反映してるやん。",
                },
            },
            {
                id: 'd4-p-02-wanna',
                label: 'wanna = want to + 動詞',
                trigger: "'I want to go home' を wanna で発音しろ。",
                points: {
                    core: { en: "I wanna go home. /aɪ ˈwɒn.ə ɡoʊ hoʊm/", ja: 'want to + 動詞 が wanna。主語が三人称単数 (He wants to) では wanna にならない。' },
                    nuance: { en: "I wanna, you wanna, we wanna -- but He wants to, not 'he wannas'.", ja: '助動詞的縮約は主語の人称・数の制約を受ける。三単現では want + s が必要で縮約不可。' },
                    shift: { en: "Written as 'wanna' in song lyrics, texts, social media. Formal writing: 'want to'.", ja: '歌詞・SNS では wanna で OK。メール・論文では want to。' },
                    native: { en: "Wanna grab dinner later?", ja: '誘い文句の定型。主語 You が省略されることも多い。' },
                },
                trap: '三単現の wants to を wannas / wanna にする誤り。He wanna は絶対に通じない。縮約は一人称・二人称・複数形のみ。',
                tip: '主語をチェックしてから wanna 発動。I/You/We/They なら OK、He/She/It なら want to のまま。',
                reactions: {
                    master: 'wanna は want to の縮約。助動詞化しているが完全な助動詞ではなく、三単現の s を吸収しきれないため制約がある。',
                    lisa: "'You wanna go?' -- yes. 'He wanna go?' -- no, never. We'd say 'Does he wanna go?' with does carrying the tense.",
                    takeshi: 'wanna の縮約ルール、主語の人称で詰まる。He wants to だけ仲間外れ、と覚えろ。',
                    yuki: '三単現で wannas って言ったら恥ずかしいやつ。Do 疑問文に持っていく。',
                    kenji: '誘う時 Wanna grab a beer? で砕けたテンポ出て、同僚とも距離縮まる。',
                    mina: 'DM で Wanna hang? が王道、ここで want to 使うと重すぎるやん。',
                },
            },
            {
                id: 'd4-p-03-hafta',
                label: 'hafta = have to + 動詞',
                trigger: "'I have to go' を hafta で発音しろ。",
                points: {
                    core: { en: "I hafta go. /ˈhæf.tə/", ja: 'have to = 義務の助動詞で hafta。所有の have とは区別。' },
                    nuance: { en: "I have a dog = /hæv/. I have to go = /hæf/ -- the 'v' goes voiceless before 't'.", ja: '義務の have to は /v/ が /f/ に無声化する。所有の have は /v/ のまま。' },
                    shift: { en: "has to → hasta (/ˈhæs.tə/). Third-person form keeps the s.", ja: '三単現は hasta。主語の人称で形が変わる点は wanna と同じ。' },
                    native: { en: "I hafta head out -- catch you later.", ja: '去る時の定型。hafta でテンポを作る。' },
                },
                trap: '所有の have を /hæf/ と読む。I have a car /hæv/ と I have to go /hæf/、音で意味が分かれる。',
                tip: 'have の後ろが名詞 (所有) なら /hæv/、to + 動詞 (義務) なら /hæf/。無意識に切り替える。',
                reactions: {
                    master: 'have to の v が無声化するのは、直後の t が無声音で同化を起こすため。音韻規則が助動詞化を物理的に裏付けている。',
                    lisa: "'I have a meeting' (hav) vs 'I have to go' (haf) -- same word, two sounds. That f sound tells you 'obligation'.",
                    takeshi: '所有の have と義務の have to、日本人は同じ音で出しがち。英語はここで音まで分けてる。',
                    yuki: '/v/ と /f/ の差で所有・義務が分かるって、英語の音韻にロマンすら感じる。',
                    kenji: 'I hafta finish by Friday、現場で期限言う時このテンポで伝える。',
                    mina: 'Netflix 字幕で「have to」って書いてあってもセリフは hafta ばっかり、これ耳慣らし必須。',
                },
            },
            {
                id: 'd4-p-04-gotta',
                label: 'gotta = (have) got to + 動詞',
                trigger: "'I have got to go' を gotta で発音しろ。",
                points: {
                    core: { en: "I gotta go. /ˈɡɒt.ə/", ja: 'have を落として got to → gotta。義務 + 緊急度のニュアンス。' },
                    nuance: { en: "I gotta = slight urgency, more urgent than hafta.", ja: 'gotta は「今すぐ」感が hafta より強い。口語の急迫感。' },
                    shift: { en: "British English often keeps 'I've got to', American English drops to 'I gotta'.", ja: '米語は have をばっさり落とす傾向、英語は I\'ve got to を残す傾向。' },
                    native: { en: "Gotta run -- my bus is here.", ja: '急ぐ時の定型。主語 I も省略されることが多い。' },
                },
                trap: 'gotta を have to と全く同じ意味で使う。緊急度の違いを無視すると、友人の誘いを gotta で断って冷たく響く。',
                tip: 'hafta = 義務 (仕事など)、gotta = 緊急・個人的な切迫、と温度差で使い分ける。',
                reactions: {
                    master: 'have got to の have が口語で脱落し gotta に。元の完了形のマーカー have が音から消えるが、意味上の「今その状況」は残る。',
                    lisa: "I gotta bounce = I'm out right now. I hafta bounce = I'm leaving soon. The 't' sound carries urgency.",
                    takeshi: 'gotta と hafta を互換で使うと温度感ズレる。gotta はアツい、hafta はクール、と覚えとけ。',
                    yuki: "義務の中でも細かい温度差があるの、単語1つで出せる英語の精度。",
                    kenji: 'Gotta go! って現場で言えば緊急感伝わる、待たんといて欲しい時に使える。',
                    mina: 'Twitter で「gotta」連発する投稿主は忙しい自慢タイプってエモさも読み取れる。',
                },
            },
            {
                id: 'd4-p-05-yusta',
                label: 'yusta = used to + 動詞',
                trigger: "'I used to smoke' を yusta で発音しろ。",
                points: {
                    core: { en: "I yusta smoke. /ˈjuːs.tə/", ja: 'used to = 過去の習慣で yusta。d は完全に消えて s が二度分の役割。' },
                    nuance: { en: "/juːs.tə/ -- no 'd' sound. 'Used' loses its d in both pronunciation and meaning.", ja: '文字には d があっても音はゼロ。過去形なのに過去形に聞こえない理由。' },
                    shift: { en: "The 's' stays /s/ here, not /z/. 'Used' meaning 'utilized' keeps /juːzd/.", ja: '同じ used でも意味で音が違う。「使った」は /juːzd/、「かつて〜した」は /juːst/。' },
                    native: { en: "I yusta hate coffee. Now I can't live without it.", ja: '習慣の変化を語る定型。yusta で過去の習慣をスッと出す。' },
                },
                trap: '「ユーズド・トゥー」と丁寧に発音。ネイティブには /juːzd tuː/ は「使った、〜するために」で意味が変わって聞こえる。',
                tip: '「かつて〜した」の used to は s で固定。d は心の中だけに残す。to も t くっつけて一気に yusta。',
                reactions: {
                    master: 'used to の d が脱落するのは後続の t との同化と脱落。音韻的には /juːsd.tuː/ → /juːs.tə/ で一貫性あり。',
                    lisa: "'I used to smoke' = /yusta/. 'I used a hammer' = /yuzd/. Same word, two pronunciations, two meanings.",
                    takeshi: "used to の発音、d をクリアに出すと「使った」の意味に化ける。過去の習慣なら d は心の中。",
                    yuki: '/juːs/ と /juːz/ で意味が完全に変わるの、used の二面性を知らんと詰む。',
                    kenji: 'I yusta work in Osaka、過去の職歴話す時これで軽く流せる。',
                    mina: 'TikTokで「I used to…」で始まる告白動画、音はガチで yusta やから耳慣らしになる。',
                },
            },
        ],
    },

    grammar: {
        title: '動名詞 vs to 不定詞 -- 動詞で決まる、意味で迷うな',
        subtitle: 'enjoy to see は絶対にダメ。動詞の「性格」で後続の形が決まる。',
        intro: {
            question: 'なぜ enjoy の後は doing で、want の後は to do なのか?',
            insight: '日本語には動名詞と不定詞の区別がない。「〜するのを楽しむ」「〜したい」の「〜する」は同じ動詞原形で、後続の形に意味の差を込めない。英語は対照的に、動詞ごとに後続が doing (動名詞) か to do (不定詞) か固定されている。この選択は話者の好みではなく、動詞の持つ「性格」で決まる。\n\n乱暴な分類では、動名詞を取る動詞は「事実的・既成的」(enjoy, finish, avoid, mind, suggest)、to 不定詞を取る動詞は「未来志向・願望」(want, hope, decide, plan, agree)。remember, forget, stop, try のように両方取るが意味が変わる動詞もある。これは「時間の方向」で分かれる。doing は既に存在している行為を指し、to do はこれから行う行為を指す。\n\n解決策は「動詞ごとの後続形」を暗記リストではなく意味軸で束ねること。未来向き → to、既存向き → ing。この軸で90%の動詞は判別できる。残り10% (try, stop 等) は両方取ると覚え、意味の違いを別個に理解する。',
        },
        tldr: '未来向き動詞 → to do、既存向き動詞 → doing。try/stop/remember は両方取り意味が変わる。',
        items: [
            {
                id: 'd4-g-01-enjoy',
                label: 'enjoy doing -- 動名詞のみ',
                trigger: '「会えて楽しかった」を英語で。',
                points: {
                    core: { en: "I enjoyed seeing you.", ja: 'enjoy は動名詞 (doing) のみ取る。I enjoyed to see は絶対に間違い。' },
                    nuance: { en: "enjoy = experience something existing. The activity has to already be happening or have happened.", ja: 'enjoy は「既にある/あった行為を味わう」。未来のことには使わない。' },
                    shift: { en: "Similar verbs: finish, avoid, mind, suggest, consider, recommend -- all take doing only.", ja: '同じ仲間 (finish, avoid, mind, suggest, consider, recommend) も全て動名詞のみ。' },
                    native: { en: "I really enjoyed meeting your family last weekend.", ja: '別れ際の感謝の定型。過去の経験を ing で振り返る。' },
                },
                trap: 'enjoy to see you で覚える日本人は多い。want to see の類推で to 不定詞を付けたくなるが、動詞の性格が違う。',
                tip: 'enjoy が出たら反射で doing。考える余地なく ing をつける。to の誘惑を断ち切る。',
                reactions: {
                    master: 'enjoy, finish, avoid, mind など「経験系」動詞は動名詞専用。既に存在する事象を目的語にする性格による。',
                    lisa: "'I enjoyed to meet you' -- my ears literally reject this. It has to be 'meeting'. No exception.",
                    takeshi: 'enjoy + to を書いた瞬間に英語教師が赤ペン構える。反射で ing 出せ。',
                    yuki: 'enjoy + doing、単に覚えるより「経験を味わう動詞」ってカテゴリで押さえる方が応用効く。',
                    kenji: "I enjoyed working with you、現場の最後の挨拶として決まるやつ。",
                    mina: 'メールで「Looking forward to seeing you」の ing と enjoy の ing、これ全部同じ性格やん。',
                },
            },
            {
                id: 'd4-g-02-want',
                label: 'want to do -- 不定詞のみ',
                trigger: '「明日会いたい」を英語で。',
                points: {
                    core: { en: "I want to meet tomorrow.", ja: 'want は不定詞 (to do) のみ。I want meeting は絶対に間違い。' },
                    nuance: { en: "want = desire pointing to a future action.", ja: 'want は「これからやりたい」の方向性。未来志向の動詞。' },
                    shift: { en: "Similar verbs: hope, decide, plan, agree, offer, promise -- all take to do only.", ja: '同じ仲間 (hope, decide, plan, agree, offer, promise) も全て不定詞のみ。未来志向の意味を共有。' },
                    native: { en: "I want to grab lunch with you next week.", ja: '誘いの定型。未来への指向性が want + to で自然に出る。' },
                },
                trap: 'want doing で「〜したい」を表そうとする。英語では未来指向が不定詞の to に込められるので、ing では方向が消える。',
                tip: 'want = 矢印の動詞。「これから」の矢印を to で出す、と図で理解する。',
                reactions: {
                    master: 'want, hope, decide, plan などは未来指向を持つ動詞群。不定詞 to do が未来方向を示す機能と一致して結びつく。',
                    lisa: "'I want meeting you' is fully broken. Want is pointing forward in time, and 'to' is that forward arrow.",
                    takeshi: '「〜したい」系動詞は全部 to、と覚えろ。enjoy 組と want 組で世界を2分割。',
                    yuki: '動名詞・不定詞の選択、動詞の「時間の向き」で分けると覚えやすい。',
                    kenji: "I want to discuss this with the team、会議前に提案する時の基本。",
                    mina: 'Bio 欄の「I want to connect with…」、この to の矢印感あるから伝わるん。',
                },
            },
            {
                id: 'd4-g-03-try',
                label: "try doing vs try to do -- 意味で変わる",
                trigger: "「再起動してみた」を英語で。",
                points: {
                    core: { en: "I tried restarting it.", ja: 'try + doing = 試しにやってみる (実際に実行した)。' },
                    nuance: { en: "I tried to restart it.", ja: 'try + to do = やろうと試みた (できたかは別問題)。実際には失敗の含みが強い。' },
                    shift: { en: "'I tried to open it' -- it might not have opened. 'I tried opening it' -- I did open it, to see what'd happen.", ja: '成功・失敗の有無が動詞の形で分かれる。' },
                    native: { en: "Try turning it off and on again.", ja: 'IT サポートの定型。「試しにやってごらん」ニュアンス。' },
                },
                trap: 'どちらも「〜してみた」で訳すと、成功・失敗・実行の有無が全部曖昧になる。ネイティブは形を見て結果を判断する。',
                tip: '実際にやった → try + ing、やろうとした → try + to。結果の有無で形を切る。',
                reactions: {
                    master: 'try は ing / to で意味が分岐する典型動詞。ing は実行済みの行為、to は未達の試み。',
                    lisa: "'I tried to call you' = maybe no answer. 'I tried calling you' = I did call, just telling you.",
                    takeshi: '「やってみた」を日本語でごまかしてると、この2択で毎回詰まる。結果の有無で機械的に切れ。',
                    yuki: "同じ try で全然違う意味になる、動詞の性格が2つ入ってるみたい。",
                    kenji: "Tried restarting the machine って報告の仕方、試した事実と結果を分けて伝えられる。",
                    mina: 'DM で「I tried texting you」って書けば「送った事実」は伝わる、to text だと「送ろうとした」感が出てそっけない。',
                },
            },
            {
                id: 'd4-g-04-stop',
                label: "stop doing vs stop to do -- 主客が逆転",
                trigger: "「タバコやめた」を英語で。",
                points: {
                    core: { en: "I stopped smoking.", ja: 'stop + doing = その行為を止める。目的語が ing。' },
                    nuance: { en: "I stopped to smoke.", ja: 'stop + to do = 別のことを止めて〜するために立ち止まる。to 以下が目的。' },
                    shift: { en: "'I stopped to talk to him' = I paused what I was doing in order to talk.", ja: 'to 不定詞は目的を表す副詞用法。主動詞 stop の目的語ではない。' },
                    native: { en: "She stopped crying when he walked in.", ja: 'ing の方。泣くことそのものを止めた。' },
                },
                trap: 'I stopped to smoke を「喫煙をやめた」と誤解する。実は「タバコを吸うために (何かを) やめた」で真逆の意味。',
                tip: 'stop の目的語 (止めるもの) は ing。to do は副詞 (目的)。「何を止めたか」を考えて形を選ぶ。',
                reactions: {
                    master: "stop to do の to は目的を表す副詞的用法。stop 自体は自動詞で、目的語を取らない文が出来上がる。",
                    lisa: "'I stopped smoking' = quit forever. 'I stopped to smoke' = paused everything else to light up. Opposite feelings.",
                    takeshi: '「タバコやめた」を stopped to smoke で言うと、周囲ドン引き。真逆の意味だから。',
                    yuki: "英語の動詞、形1つで意味反転するの怖すぎる。でも論理分かれば間違わない。",
                    kenji: "I stopped drinking、禁酒報告で効く。to drink は「飲みに行くために寄った」で全然違う。",
                    mina: 'ツイで「stopped to post」は投稿やめたやなくて、投稿するために他をやめたって意味、ややこしい。',
                },
            },
            {
                id: 'd4-g-05-remember',
                label: "remember doing vs remember to do -- 時間が逆",
                trigger: "「鍵閉めたの覚えてる」を英語で。",
                points: {
                    core: { en: "I remember locking the door.", ja: 'remember + doing = やったことを覚えている (過去の記憶)。' },
                    nuance: { en: "Remember to lock the door.", ja: 'remember + to do = やるのを覚えている (未来の予定・忘れないで)。' },
                    shift: { en: "'Don't forget to lock the door' has the same forward meaning as 'remember to'.", ja: 'forget + to do も同じ構造 (やり忘れないで)。未来・過去の向きは to / ing で決まる。' },
                    native: { en: "Remember to grab milk on your way home.", ja: '家族への定型。これからのタスクを思い出させる表現。' },
                },
                trap: 'どちらも「覚えてる」で訳すと、過去のことか未来のことか分からなくなる。英語は時間の向きを形で出す。',
                tip: '記憶 (過去) → ing、指示・予定 (未来) → to。doing = 既にあること、to do = これからのこと、の基本軸に戻る。',
                reactions: {
                    master: "remember, forget, regret は ing (過去) / to do (未来) で意味が分岐する動詞群。時間の向きが動詞形で表現される。",
                    lisa: "'I remember meeting her' = that happened. 'Remember to meet her' = don't forget, it's coming up. Completely different.",
                    takeshi: '「覚えている」を曖昧に訳すと、過去か未来か英語で迷子になる。ing と to で時間を指し分けろ。',
                    yuki: "同じ remember で過去と未来、動詞の形で時間が逆転する仕組み見えてきた。",
                    kenji: "Remember to check the material、現場の指示で定型。doing は報告用、to do は予告用。",
                    mina: 'Remember that time we...? のやつも ing 系の感覚、過去を振り返るトーンやん。',
                },
            },
        ],
    },
};
