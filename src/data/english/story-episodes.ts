// v7 物語没入チャット — narrative immersion (LINE/chat style)
// 物語をチャットスレッド風に読み進める。地の文(日本語)+セリフ(英語)で文脈ごと覚える。
// データはワークフロー(story-v7)が生成。下記は見本兼フォールバック。

export interface StoryLine {
    kind: 'narration' | 'dialogue';
    speaker?: string;     // dialogue時の話者
    en?: string;          // セリフ(英語)
    ja: string;           // 地の文 or セリフ和訳
    note?: string;        // とにおの一言
}

export interface StoryEpisode {
    id: string;
    title: string;
    premise: string;     // 状況(日本語)
    lines: StoryLine[];
}

export const STORY_EPISODES: StoryEpisode[] = [
    {
        id: 's-001',
        title: '隣の席のうるさい客',
        premise: "海外のカフェ。隣のテーブルの電話の声がデカい。意を決して声をかける。",
        lines: [
            { kind: 'narration', ja: "コーヒーを片手に集中したいのに、隣の男の通話がうるさい。深呼吸して、声をかけた。" },
            { kind: 'dialogue', speaker: 'あなた', en: "Excuse me, would you mind keeping it down a little?", ja: "すみません、もう少し声を抑えてもらえます？", note: "would you mind -ing? は丁寧に頼む鉄板。keep it down=声を抑える。" },
            { kind: 'dialogue', speaker: '男', en: "Oh — sorry, didn't realize I was being loud. My bad.", ja: "あ、ごめん、うるさいって気づかなかった。悪いね。", note: "My bad=ごめん(軽い)。didn't realize=気づかなかった。" },
            { kind: 'narration', ja: "拍子抜けするほど素直に謝られた。身構えてたのが馬鹿みたいだった。" },
            { kind: 'dialogue', speaker: 'あなた', en: "No worries, thanks.", ja: "いえ、ありがとう。", note: "No worries=気にしないで。揉めずに終わらせる魔法の一言。" },
        ],
    },
    { id: "s-g01", title: "乗り継ぎゲートが見つからない", premise: "海外の巨大空港で乗り継ぎ。掲示板の表示が変わり、自分のゲートがどこにあるか分からなくなった。出発まであと40分。意を決して、近くの係員に声をかける。", lines: [
        { kind: "narration", ja: "案内板を見上げても、さっきまであったはずの便名が消えている。スーツケースを引きずったまま、汗が背中を伝う。残り40分。立ち止まっていても始まらない。" },
        { kind: "dialogue", speaker: "あなた", en: "Excuse me, I'm a little lost. Can you help me?", ja: "すみません、ちょっと迷ってしまって。助けてもらえますか？", note: "I'm lost=道に迷った、の超定番。a little を足すと「ちょっと」と肩の力が抜けて頼みやすい。" },
        { kind: "dialogue", speaker: "係員", en: "Of course. Where are you trying to go?", ja: "もちろんです。どちらへ行こうとしていますか？", note: "trying to go=行こうとしている。be trying to は「しようとしている途中」のニュアンス。" },
        { kind: "dialogue", speaker: "あなた", en: "Tokyo. My flight... gate change. I cannot find.", ja: "東京です。便が…ゲートが変わって。見つからなくて。", note: "文法はガタガタでも単語が並べば通じる。崩れても止まらず言い切るのが空港英語のコツ。" },
        { kind: "narration", ja: "言葉に詰まったが、係員は急かさず、こちらの搭乗券にちらりと目をやった。" },
        { kind: "dialogue", speaker: "係員", en: "Let me see your boarding pass. Ah, they moved you to gate 52.", ja: "搭乗券を見せてください。ああ、52番ゲートに変更になってますね。", note: "moved you=あなたを移した=ゲート変更された。主語they(航空会社)で軽く言うのが自然。" },
        { kind: "dialogue", speaker: "あなた", en: "Gate 52. Is it far? I only have forty minutes.", ja: "52番ゲート。遠いですか？あと40分しかないんです。", note: "only have ~ で「~しかない」。時間がない焦りはこの一言で伝わる。" },
        { kind: "dialogue", speaker: "係員", en: "You'll make it. Go down this hall, take the train, and it's two stops.", ja: "間に合いますよ。この通路を進んで電車に乗って、2駅です。", note: "You'll make it=間に合うよ、の励まし定番。make it は「たどり着く・うまくいく」。" },
        { kind: "narration", ja: "「間に合う」と言われた瞬間、肩の力が少し抜けた。あとは進むだけだ。" },
        { kind: "dialogue", speaker: "あなた", en: "Train, two stops. Got it. Thank you so much.", ja: "電車で2駅。分かりました。本当にありがとう。", note: "Got it=分かった、了解。聞いた内容を自分の言葉で繰り返すと、確認にもなって安心。" },
        { kind: "dialogue", speaker: "係員", en: "No problem. Safe travels home.", ja: "どういたしまして。気をつけてお帰りを。", note: "Safe travels=道中ご無事で。旅人にかける優しい決まり文句。覚えておくと自分も使える。" },
        { kind: "narration", ja: "電車を降り、見えてきた「52」の表示。搭乗の列に滑り込んだとき、さっきの係員の落ち着いた声を思い出した。崩れた英語でも、ちゃんと人は助けてくれる。" }
    ] },
    { id: "s-g02", title: "ここ、空いてますか?", premise: "雨の土曜、混みあった駅前のカフェ。あなたは窓際の四人席にひとりで座っている。トレイを持った外国人の若い女性が、満席の店内を見回しながら、あなたの席の前で足を止めた。", lines: [
        { kind: "narration", ja: "傘から滴る雨。コーヒーをひと口飲んだとき、目の前に人影が立った。トレイを持った女性が、少し困った顔でこちらを見ている。" },
        { kind: "dialogue", speaker: "女性", en: "Hi, sorry to bother you. Is anyone sitting here?", ja: "すみません、お邪魔して。ここ、どなたか座ってます?", note: "Is this seat taken? と並ぶ定番。bother は「邪魔する」で、知らない人に話しかける時の軽いクッション言葉です。" },
        { kind: "narration", ja: "頭の中で英語を組み立てる時間はない。とっさに出たのは、単語だけだった。" },
        { kind: "dialogue", speaker: "あなた", en: "Ah... no, no. Empty. Please, sit.", ja: "あ…いえいえ。空いてます。どうぞ座って。", note: "文法はガタガタでも全く問題なし。Empty と Please, sit で意図は120%伝わります。単語を置いていくだけで会話は回る。" },
        { kind: "dialogue", speaker: "女性", en: "Oh, thank you so much. This place is packed today.", ja: "わあ、ありがとうございます。今日ここ、ほんと混んでますね。", note: "packed は「ぎゅうぎゅう」。crowded より口語的で、満員電車にも使えます。" },
        { kind: "dialogue", speaker: "あなた", en: "Yes. Rain, so... everybody come inside.", ja: "ええ。雨だから…みんな中に入ってきて。", note: "comes じゃなく come でも気にしない。Rain, so... の一語で「雨のせいで」が伝わる。理由を so でつなぐだけで十分。" },
        { kind: "narration", ja: "女性は笑ってうなずき、濡れたコートを椅子にかけた。会話が続くのが少し怖い。あなたは思いきって聞いてみた。" },
        { kind: "dialogue", speaker: "あなた", en: "You... traveling? Japan first time?", ja: "あなたは…旅行? 日本は初めて?", note: "Are you traveling? の Are you を落としても通じる。短く区切って単語を投げる、これが現場の英語です。" },
        { kind: "dialogue", speaker: "女性", en: "Yeah, my first time. I've been here for a week. Honestly, the food is amazing.", ja: "うん、初めて。一週間いるんです。正直、ごはんが最高で。", note: "I've been here for a week は「一週間いる」。Honestly は「正直さ」を出す前置きで、ネイティブが感想を言う前によく挟みます。" },
        { kind: "dialogue", speaker: "あなた", en: "Good, good. You must try... ramen. Real one. Not airport.", ja: "いいね、いいね。食べなきゃ…ラーメン。本物のやつ。空港のじゃなく。", note: "You must try で「絶対食べて」。Not airport のジョークが効いてます。完璧な文じゃなく、笑わせにいく姿勢が会話を温める。" },
        { kind: "dialogue", speaker: "女性", en: "Ha! Okay, noted. Any place you'd recommend?", ja: "ははっ! 了解、メモしときます。おすすめのお店あります?", note: "noted は「メモった/了解」。Any place you'd recommend? は「どこかおすすめ?」の自然な短縮形です。" },
        { kind: "narration", ja: "あなたはスマホを取り出し、よく行く近所の店を地図で見せた。言葉が足りなくても、指さしと笑顔がそれを埋めていく。" },
        { kind: "dialogue", speaker: "女性", en: "This is so kind of you. Thank you for sharing the table, and for the tip.", ja: "ほんとに親切にどうも。相席させてくれて、おすすめまで、ありがとう。", note: "This is so kind of you は感謝の決まり文句。share the table が「相席する」。覚えておくと一発で品が出ます。" },
        { kind: "narration", ja: "彼女が店を出るとき、もう一度こちらを振り返って手を振った。崩れた英語でも、ちゃんと届いていた。窓の外の雨が、少し優しく見えた。" }
    ] },
    { id: "s-g03", title: "シャワーが出ないホテルの夜", premise: "出張で泊まったホテルにチェックインしたら、部屋のシャワーからお湯が出ない。明日は朝早い。フロントに電話して、なんとか直してもらわないといけない。50代のあなたの、たどたどしくも切り抜ける英語の一夜。", lines: [
        { kind: "narration", ja: "夜10時。長いフライトのあと、ようやくホテルの部屋にたどり着いた。シャワーを浴びて寝るだけ。そう思っていた。" },
        { kind: "narration", ja: "ところが、お湯のレバーをどっちに回しても、出てくるのは冷たい水だけ。明日は7時に出発しなければならない。" },
        { kind: "dialogue", speaker: "あなた", en: "Hello, this is room 408. Sorry, but, the shower... no hot water.", ja: "もしもし、408号室です。すみません、あの、シャワーが…お湯が出ないんです。", note: "完璧な文じゃなくていい。「the shower, no hot water」だけで相手は100%わかる。困ったら主語と単語を並べるだけで通じる。" },
        { kind: "dialogue", speaker: "フロント係", en: "Oh, I'm so sorry to hear that. Only cold water, is that right?", ja: "ああ、それは申し訳ございません。冷たい水だけ、ということですね？", note: "相手が「is that right?」と確認してくれる。聞き取れたら Yes と返すだけでいい。会話は二人で作るもの。" },
        { kind: "dialogue", speaker: "あなた", en: "Yes. Cold only. I tried, but no hot.", ja: "はい。冷たいだけ。やってみたけど、お湯が出なくて。", note: "「I tried」=やってみた。これ一語で「ちゃんと自分で試した」が伝わる。クレームのとき地味に効く便利な動詞。" },
        { kind: "narration", ja: "電話の向こうで、何かをタイプする音が聞こえる。" },
        { kind: "dialogue", speaker: "フロント係", en: "Let me send someone up to check. It might take about ten minutes, is that okay?", ja: "係の者を見に行かせますね。10分ほどかかるかもしれませんが、よろしいですか？", note: "「send someone up」=誰かを上の階に行かせる。ホテルでよく出る表現。upは「あなたの部屋へ」のニュアンス。" },
        { kind: "dialogue", speaker: "あなた", en: "Yes, okay. But, I have early morning tomorrow. Seven o'clock.", ja: "はい、大丈夫です。でも、明日の朝早いんです。7時に。", note: "「I have early morning」は文法的には惜しいが、伝われば勝ち。急いでる事情を先に言っておくと相手の動きが変わる。" },
        { kind: "dialogue", speaker: "フロント係", en: "Understood. If we can't fix it quickly, we'll move you to another room right away.", ja: "承知しました。すぐ直らないようでしたら、別のお部屋にすぐお移しします。", note: "「right away」=今すぐ。早朝出発を伝えたから、相手が「待たせない」案を出してくれた。事情を言う価値はここにある。" },
        { kind: "narration", ja: "10分後、ドアがノックされた。スタッフが入って蛇口をひねると、少しして湯気が立ちのぼった。" },
        { kind: "dialogue", speaker: "スタッフ", en: "There you go. The boiler just needed a minute. You're all set now.", ja: "はい、出ました。ボイラーがちょっと時間かかっただけでした。これでもう大丈夫です。", note: "「You're all set」=これで準備万端・もうOK、の決まり文句。店や受付で言われたら「終わったよ」の合図。" },
        { kind: "dialogue", speaker: "あなた", en: "Oh, great. Thank you so much. Really, you saved me.", ja: "ああ、よかった。本当にありがとう。助かりました。", note: "「You saved me」=助かった、の超自然な言い方。Thank youの後にこれを足すと、心からの感謝がぐっと伝わる。" },
        { kind: "narration", ja: "湯気の立つシャワーを浴びながら、あなたは思った。完璧な英語じゃなくても、困ったことはちゃんと伝わる。明日の朝も、きっと大丈夫だ。" }
    ] },
    { id: "s-g04", title: "外国人に道を聞かれた帰り道", premise: "仕事帰り、駅前の交差点で信号待ちをしていると、スーツケースを引いた外国人観光客に声をかけられた。なんと、こっちが道を教える側だ。学校で習った英語は遠い昔、でも目の前の人は本気で困っている。", lines: [
        { kind: "narration", ja: "夕方の駅前。信号が赤に変わった瞬間、横からカタコトじゃない、流れるような英語が飛んできた。" },
        { kind: "dialogue", speaker: "観光客", en: "Excuse me, sorry to bother you. Do you know how to get to the Hilton Hotel?", ja: "すみません、お邪魔します。ヒルトンホテルへの行き方ってわかりますか?", note: "sorry to bother you は「お邪魔して悪いけど」の定番クッション。これ一個知ってるだけで相手の警戒が解ける。" },
        { kind: "narration", ja: "ヒルトン。聞いたことはある。たしか、あの大きい通りをまっすぐ行った先だ。心臓が一瞬跳ねたが、口は勝手に動いた。" },
        { kind: "dialogue", speaker: "あなた", en: "Ah, Hilton... yes, yes. Umm, you go straight. Straight, this road.", ja: "ああ、ヒルトン…はいはい。えーと、まっすぐ行く。まっすぐ、この道。", note: "go straight だけで十分通じる。文法より先に「straight」と手で方向を指す。崩れててもいい、止まらないのが勝ち。" },
        { kind: "dialogue", speaker: "観光客", en: "Straight down this road, okay. And then?", ja: "この道をまっすぐ、了解。それから?", note: "相手が and then? と聞き返してくれる。これは「続けて」のサイン。会話が転がってる証拠だ。" },
        { kind: "narration", ja: "それから、だ。たしか二つ目の信号を左。「二つ目」って英語でなんだっけ。指を二本立てた。" },
        { kind: "dialogue", speaker: "あなた", en: "Then... two signal. Two. Turn left. Big building, you see it.", ja: "それから…信号二つ。二つ。左に曲がる。大きい建物、見えるよ。", note: "second が出てこなくても two signal で指二本立てれば伝わる。完璧な単語を探して黙るより、ある単語を並べる方が百倍強い。" },
        { kind: "dialogue", speaker: "観光客", en: "Second traffic light, turn left. Got it. That's super helpful, thank you so much.", ja: "二つ目の信号で左折ね。わかった。すごく助かります、本当にありがとう。", note: "相手がさりげなく second traffic light と言い直してくれた。これが生きた復習。正解を覚えるチャンス。" },
        { kind: "narration", ja: "Got it、と相手が笑った。通じた。じわっと汗をかいていた手のひらが、少しゆるんだ。" },
        { kind: "dialogue", speaker: "あなた", en: "Maybe ten minutes walking. Not far.", ja: "たぶん歩いて十分くらい。遠くないよ。", note: "ten minutes walking と not far、この二つで観光客はすごく安心する。距離を添えるだけで親切度が跳ね上がる。" },
        { kind: "dialogue", speaker: "観光客", en: "Perfect. You speak English really well, by the way.", ja: "完璧。ところで、英語すごく上手ですね。", note: "by the way は話のついでに何か足すときの軽い前振り。ここでは去り際のお世辞に使ってる。" },
        { kind: "narration", ja: "上手、なんてとんでもない。単語を並べただけだ。でも、悪い気はしなかった。むしろ、ちょっと誇らしかった。" },
        { kind: "dialogue", speaker: "あなた", en: "No, no. But thank you. Take care. Enjoy Japan.", ja: "いやいや。でもありがとう。気をつけて。日本を楽しんで。", note: "Take care と Enjoy Japan、別れ際の鉄板二連発。これを言えると会話がきれいに着地する。" },
        { kind: "narration", ja: "信号が青になる。スーツケースの音が遠ざかっていく。五十を過ぎて、知らない国の人を助けられた。たった三分の英語が、今日いちばんの出来事になった。" }
    ] },
    { id: "s-g05", title: "隣に越してきた人", premise: "海外の住宅街。隣の家に新しい住人が越してきて、引っ越しの段ボールを運んでいる。窓から見ていたら目が合ってしまった。会釈だけで逃げるか、声をかけるか。意を決して外に出る。", lines: [
        { kind: "narration", ja: "土曜の朝。隣の家の前にトラックが停まり、見知らぬ夫婦が段ボールを運んでいる。カーテンの隙間から見ていたら、ふと目が合ってしまった。" },
        { kind: "narration", ja: "気まずい。でも、ここで隠れたら今後ずっと顔を合わせるたびに気まずい。サンダルをつっかけて、外に出た。" },
        { kind: "dialogue", speaker: "あなた", en: "Hi, hello. I am... living next door. Welcome!", ja: "どうも、こんにちは。私は…隣に住んでます。ようこそ！", note: "文法はガタガタでもlive next door(隣に住む)が伝われば100点。Welcome!の一言が一番効く。" },
        { kind: "dialogue", speaker: "隣人(マイク)", en: "Oh, hey! Nice to meet you. I'm Mike, this is my wife Sarah.", ja: "あ、どうも！はじめまして。マイクです、妻のサラ。", note: "this is my wife ~ で家族を紹介。海外では引っ越し初日の挨拶がすごく喜ばれる。" },
        { kind: "narration", ja: "マイクは汗だくの笑顔で手を差し出してきた。握手。手がデカい。" },
        { kind: "dialogue", speaker: "あなた", en: "Many boxes. Heavy, right? You need... some help?", ja: "荷物多いね。重いでしょ？手伝い…要る？", note: "You need some help? は完璧な英語じゃなくても親切が一発で伝わる。理想はDo you need a hand?" },
        { kind: "dialogue", speaker: "隣人(マイク)", en: "Are you serious? That would be amazing. Just a couple of the big ones, if you don't mind.", ja: "マジで？助かるよ。大きいの何個か、よかったら。", note: "Are you serious?=マジで?(嬉しい驚き)。a couple of=2、3個。if you don't mind=よければ。" },
        { kind: "narration", ja: "言葉が足りない分、体を動かした。一番デカい段ボールを抱える。腰が、ちょっと、やばい。" },
        { kind: "dialogue", speaker: "あなた", en: "Okay... this one is very heavy. What is inside? Stones?", ja: "うわ…これすごい重い。中、何？石？", note: "ジョークは語彙が少なくても通じる。Stones?(石でも入ってんの?)で場が和む。" },
        { kind: "dialogue", speaker: "隣人(サラ)", en: "Ha! Books. Mike never throws anything away.", ja: "ふふ、本よ。マイクって物を全然捨てないの。", note: "throw away=捨てる。never throws anything away=何も捨てない、で旦那いじり。" },
        { kind: "narration", ja: "三人で笑った。重い箱を玄関まで運び終え、額の汗をぬぐう。" },
        { kind: "dialogue", speaker: "隣人(マイク)", en: "Hey, we're grabbing pizza tonight. Wanna join us? Our treat.", ja: "今夜ピザ取るんだけど、一緒にどう？おごるよ。", note: "Wanna join us?=一緒にどう?(超カジュアル)。Our treat=こっちのおごり。" },
        { kind: "dialogue", speaker: "あなた", en: "Pizza? Yes! Thank you. My English is... not so good, but okay?", ja: "ピザ？いいね！ありがとう。英語、あんまり…上手じゃないけど、平気？", note: "自分から弱みを先に言うと相手は安心する。完璧主義を捨てた瞬間に会話は続く。" },
        { kind: "dialogue", speaker: "隣人(マイク)", en: "Don't worry about it. Your English is way better than my Japanese — which is zero.", ja: "気にすんな。あんたの英語、俺の日本語よりずっとマシだよ。俺ゼロだから。", note: "way better=ずっとマシ。way=断然、を強調。最後の自虐で対等な空気に。" },
        { kind: "narration", ja: "段ボールひと箱分の勇気で、隣に友達ができた。英語はガタガタだったけど、ピザの約束はちゃんと取りつけた。今夜が、ちょっと楽しみだ。" }
    ] },
    { id: "s-g06", title: "果物屋のおじさんと、50円の攻防", premise: "旅行先の市場。山盛りのマンゴーを前に、あなたは値段を見て少しだけ高いと感じる。陽気な果物屋のおじさんが声をかけてきた。英語は得意じゃないけど、なんとか値切ってみたい。", lines: [
        { kind: "narration", ja: "市場の奥、色とりどりの果物が山になった一角。甘い匂いが漂ってくる。" },
        { kind: "dialogue", speaker: "果物屋のおじさん", en: "Hey, my friend! Best mango here. Very sweet, very fresh!", ja: "よお、お客さん!うちのマンゴーは一番だよ。甘くて新鮮だ!", note: "market英語の定番。my friendは知らない相手にも使う気さくな呼びかけ。" },
        { kind: "dialogue", speaker: "あなた", en: "Oh... they look nice. How much?", ja: "おお…うまそうだね。いくら?", note: "How much? だけで完璧に通じる。文法ゼロでも値段は聞ける。" },
        { kind: "dialogue", speaker: "果物屋のおじさん", en: "For you, six dollars. Six for the whole box.", ja: "あんたには6ドルにしとくよ。一箱まるごと6ドルだ。" },
        { kind: "narration", ja: "少しだけ高い気がする。あなたは箱を持ち上げ、わざと困った顔をしてみせた。" },
        { kind: "dialogue", speaker: "あなた", en: "Hmm... six is little expensive for me. Maybe five?", ja: "うーん…6はちょっと高いなあ。5にできない?", note: "littleの前のa が抜けても問題なし。Maybe five? と数字を投げるだけで立派な交渉。" },
        { kind: "dialogue", speaker: "果物屋のおじさん", en: "Five? Ah, my friend, these are the good ones. Five fifty.", ja: "5かい?おいおい、これは上物だよ。5ドル50セントだ。" },
        { kind: "narration", ja: "おじさんはニヤリと笑った。あと一押し、という空気だ。" },
        { kind: "dialogue", speaker: "あなた", en: "Okay okay. Five fifty, and... you give me one extra. Deal?", ja: "わかったわかった。5ドル50で…1個おまけしてよ。それで手を打つ?", note: "値引きが無理なら「おまけ」を狙う。extra=おまけ。Deal? は「それで決まり?」の魔法の一言。" },
        { kind: "dialogue", speaker: "果物屋のおじさん", en: "Haha! You are tough. Okay, one extra. Deal, my friend!", ja: "はは!あんた手強いな。よし、1個おまけだ。決まりだよ、お客さん!" },
        { kind: "narration", ja: "おじさんは一番熟れたマンゴーを選んで、そっと袋に放り込んでくれた。" },
        { kind: "dialogue", speaker: "あなた", en: "Thank you! You are a good man.", ja: "ありがとう!あんた、いい人だね。", note: "You are a good man. は最後の一言に最高。崩れた英語でも、笑顔と一言で人はつながる。" },
        { kind: "narration", ja: "袋はずっしり重い。完璧な英語じゃなかったけど、ちゃんと値切れた。市場の喧騒の中、あなたは少しだけ得意げに歩き出した。" }
    ] },
    { id: "s-g07", title: "薬局で、胃が痛い", premise: "出張先のアメリカで、前夜の食べすぎか胃がキリキリ痛む。あなたは50代、英語は得意じゃない。ホテル近くのドラッグストアに、薬を買いに入った。店員に症状をどう伝えるか、それが問題だ。", lines: [
        { kind: "narration", ja: "昼を過ぎても胃の重さが抜けない。あなたはスマホの翻訳を開きかけて、結局しまった。店の奥にカウンターが見える。" },
        { kind: "dialogue", speaker: "店員(薬剤師)", en: "Hi there. Are you finding everything okay?", ja: "こんにちは。お探しのもの、見つかりました?", note: "店員の定番の声かけ。「Are you finding everything okay?」は『何かお探しですか』くらいの軽い挨拶。身構えなくていい。" },
        { kind: "dialogue", speaker: "あなた", en: "Um, my stomach... it hurts. Here.", ja: "えっと、お腹が…痛いんです。ここ。", note: "完璧な文じゃなくていい。痛い場所を手で指して「Here」と言えば、半分は伝わる。これが現場の英語。" },
        { kind: "dialogue", speaker: "店員(薬剤師)", en: "Okay, sorry to hear that. Is it a sharp pain or more of a dull ache?", ja: "そうですか、それはお気の毒に。鋭い痛みですか、それとも鈍い痛みですか?", note: "sharp=刺すような、dull ache=どんよりした鈍い痛み。胃の症状で必ず聞かれる二択。覚えておくと一発。" },
        { kind: "narration", ja: "sharpとdull。どっちだったか。あなたは少し考えて、こぶしを胃に当てた。" },
        { kind: "dialogue", speaker: "あなた", en: "Dull. Like... heavy. I think I was eating too much last night.", ja: "鈍い感じ。なんか…重い。昨日の夜、食べすぎたと思う。", note: "「I think I was eating too much」で十分通じる。原因を自分で添えると、相手が薬を選びやすくなる。" },
        { kind: "dialogue", speaker: "店員(薬剤師)", en: "Ah, that happens. Sounds like indigestion. Any heartburn? Like a burning feeling?", ja: "ああ、よくありますよ。消化不良みたいですね。胸やけはあります? 焼けるような感じ。", note: "indigestion=消化不良。heartburn=胸やけ。「burning feeling(焼ける感じ)」と言い換えてくれるのが親切な店員。聞き取れなくても言い換えで拾える。" },
        { kind: "dialogue", speaker: "あなた", en: "No burning. Just... heavy and a little sick.", ja: "焼ける感じはない。ただ…重くて、ちょっと気持ち悪い。", note: "a little sick=ちょっと気持ち悪い。アメリカ英語で sick はムカつき・吐き気も指す。短く言い切れば誤解されない。" },
        { kind: "dialogue", speaker: "店員(薬剤師)", en: "Got it. Then this one should help. Take it after meals, twice a day.", ja: "了解です。じゃあこれが効くはずです。食後に、1日2回飲んでください。", note: "after meals=食後、twice a day=1日2回。薬の飲み方はこの2フレーズがほぼ全部。聞き取れたらメモする勇気を。" },
        { kind: "dialogue", speaker: "あなた", en: "After meals, two times. Okay. And... is it strong? I drive later.", ja: "食後、2回。わかりました。あと…これ強いですか? このあと運転するので。", note: "言われたことを「After meals, two times」と復唱するのが最強。確認になるし、相手も安心する。眠くなる薬か確かめる視点も◎。" },
        { kind: "dialogue", speaker: "店員(薬剤師)", en: "No, you'll be fine to drive. It won't make you drowsy.", ja: "いえ、運転は大丈夫ですよ。眠くなったりしません。", note: "drowsy=眠い・ぼんやりする。海外の薬で一番気にすべき単語。これを覚えておくと運転前でも安心。" },
        { kind: "narration", ja: "あなたは小さく息を吐いた。翻訳アプリを一度も開かずに、ここまで来た。" },
        { kind: "dialogue", speaker: "あなた", en: "Thank you. You helped a lot. Really.", ja: "ありがとう。すごく助かりました。本当に。", note: "「You helped a lot」は『あなたが助けてくれた』と相手を主語にする一言。ただのthank youより気持ちが乗る。" },
        { kind: "dialogue", speaker: "店員(薬剤師)", en: "Anytime. Feel better soon, okay?", ja: "いつでもどうぞ。早くよくなってくださいね。", note: "Feel better soon=お大事に。別れ際の決まり文句。これに「Thanks, I will.」と返せたら、もう現場の英語は卒業に近い。" }
    ] },
    { id: "s-g08", title: "タクシーの運転手と15分", premise: "出張先の見知らぬ街。あなたはホテルまでタクシーに乗り込む。陽気な運転手が話しかけてきて、英語での世間話が始まってしまう。降りるまでの短い時間、崩れた英語でなんとか会話を続けることになる。", lines: [
        { kind: "narration", ja: "後部座席に座り、行き先を告げる。バックミラー越しに運転手と目が合った。" },
        { kind: "dialogue", speaker: "運転手", en: "Grand Hotel, right? No problem. First time in this city?", ja: "グランドホテルだね? 任せて。この街は初めて?", note: "right? は確認の口ぐせ。「だよね?」くらいの軽さ。最後の文は First time here? と同じ意味です。" },
        { kind: "dialogue", speaker: "あなた", en: "Yes, first time. I come from Japan. For work.", ja: "うん、初めて。日本から来た。仕事で。", note: "文法は崩れてても全然通じます。I'm from Japan が自然ですが come from でも相手は分かってくれます。" },
        { kind: "dialogue", speaker: "運転手", en: "Japan! Long flight, huh? You must be tired.", ja: "日本か! 長いフライトだったろ? 疲れてるんじゃない。", note: "huh? は「だろ?」と相づちを求める音。You must be tired は「疲れてるでしょ」と気づかう定番。" },
        { kind: "dialogue", speaker: "あなた", en: "Yeah... very long. Twelve hours. My body is still Japan time.", ja: "ああ…すごく長い。12時間。体はまだ日本時間だよ。", note: "My body is still on Japan time が正解ですが、on を落としても伝わります。時差ボケは jet lag です。" },
        { kind: "narration", ja: "運転手は声をあげて笑い、信号で車を止めた。" },
        { kind: "dialogue", speaker: "運転手", en: "Ha! Jet lag is brutal. So what kind of work do you do?", ja: "ははっ! 時差ボケはきついよな。で、どんな仕事してるの?", note: "brutal は「えげつない・きつい」。What do you do? は職業を聞く最も普通の言い方です。" },
        { kind: "dialogue", speaker: "あなた", en: "I... how do you say... I sell building materials. Construction.", ja: "私は…なんて言うんだろう…建材を売ってる。建設関係。", note: "詰まったら how do you say...? で時間を稼げます。これ、ネイティブも普通に使う神フレーズ。" },
        { kind: "dialogue", speaker: "運転手", en: "Oh nice, construction! My brother is in that business too. Tough job.", ja: "おお、いいね、建設! 俺の弟もその業界だよ。大変な仕事だ。", note: "in that business で「その業界にいる」。be in 〜 は所属を表す便利な型です。" },
        { kind: "dialogue", speaker: "あなた", en: "Yes, tough. But I like it. Twenty-five years.", ja: "ああ、大変。でも好きなんだ。25年やってる。", note: "数字を一言足すだけで会話が深まります。完璧な文じゃなくても、25年の重みは十分伝わる。" },
        { kind: "narration", ja: "ホテルの灯りが見えてきた。運転手が車を寄せる。" },
        { kind: "dialogue", speaker: "運転手", en: "Twenty-five years? Respect, man. Here we are. Enjoy your stay!", ja: "25年? 尊敬するよ。さ、着いた。ゆっくりしてって!", note: "Respect, man は「いやマジ尊敬」の口語。Enjoy your stay はホテル・店で必ず聞く別れの一言です。" },
        { kind: "dialogue", speaker: "あなた", en: "Thank you. You drive safe. Good night.", ja: "ありがとう。安全運転でね。おやすみ。", note: "Drive safe は「気をつけて運転して」の決まり文句。崩れた英語でも、最後まで会話を切らさなかった。" },
        { kind: "narration", ja: "ドアを閉めると、運転手が窓越しに親指を立てた。たった15分。文法はめちゃくちゃだったが、ちゃんと人と話せた。あなたは少しだけ胸を張って、ホテルへ歩き出した。" }
    ] },
    { id: "s-g09", title: "はじめましてのワイングラス", premise: "友人に連れられて来た海外風のホームパーティー。知り合いは一人もいない。壁際でワインを持ったまま固まっていると、隣の男が話しかけてきた。", lines: [
        { kind: "narration", ja: "会場の隅。ワイングラスを握ったまま、誰とも話せず三十分。逃げ場を探していると、隣に立った男がこっちを向いた。" },
        { kind: "dialogue", speaker: "男", en: "Hey, I don't think we've met. I'm Marcus.", ja: "やあ、初めてだよね。マーカスです。", note: "I don't think we've met=「会ったことないよね」。初対面の自然な切り出し。" },
        { kind: "dialogue", speaker: "あなた", en: "Ah, yes. I am Ken. Nice to... meet you.", ja: "あ、はい。ケンです。よろしく…お願いします。", note: "少し詰まってもOK。Nice to meet you が言えれば初対面は合格。" },
        { kind: "dialogue", speaker: "マーカス", en: "Ken, nice one. So how do you know the host?", ja: "ケンね、いいね。ホストとはどういう知り合い？", note: "how do you know ~? =「~とどういう関係?」。パーティーの定番質問。" },
        { kind: "narration", ja: "ホスト。主催者のことか。友人の顔が浮かんだが、英語が出てこない。" },
        { kind: "dialogue", speaker: "あなた", en: "Um... my friend. He bring me. I don't know many people here.", ja: "えっと…友達が。彼が連れてきて。ここ知り合い少なくて。", note: "bring→broughtが正しいが通じる。崩れても止まらないのが一番大事。" },
        { kind: "dialogue", speaker: "マーカス", en: "Same here, honestly. I barely know anyone. Want to grab a drink together?", ja: "実は俺も同じ。ほとんど誰も知らないんだ。一緒に飲み物取りに行く？", note: "Same here=「こっちも同じ」。barely=ほとんど~ない。" },
        { kind: "narration", ja: "自分だけじゃなかった。少し肩の力が抜けた。" },
        { kind: "dialogue", speaker: "あなた", en: "Yes, please. I am... a little nervous, actually.", ja: "ぜひ。実はちょっと緊張してて。", note: "actually=「実は」。正直に言うと相手も心を開く。完璧より素直。" },
        { kind: "dialogue", speaker: "マーカス", en: "Don't worry, your English is totally fine. Better than my Japanese, for sure.", ja: "気にしないで、君の英語は全然いけてるよ。少なくとも俺の日本語よりずっと上だ。", note: "totally fine=「全然問題ない」。for sure=「間違いなく」。冗談で場を和ませてる。" },
        { kind: "dialogue", speaker: "あなた", en: "Ha, thank you. You speak Japanese?", ja: "はは、ありがとう。日本語話せるの？", note: "笑って質問を返せたら会話が回り始めた証拠。" },
        { kind: "dialogue", speaker: "マーカス", en: "Just 'konnichiwa' and 'sushi.' That's my whole vocabulary.", ja: "『こんにちは』と『すし』だけ。それが全語彙。", note: "That's my whole vocabulary=「それで全部」。自虐ジョークは万国共通の親しみ方。" },
        { kind: "narration", ja: "二人で笑った。崩れた英語でも、ちゃんと人とつながれた。グラスの中のワインが、さっきより少し軽く感じた。" }
    ] },
    { id: "s-g10", title: "頼んだのはこれじゃない", premise: "海外出張中の50代の田中さん。一人で入ったビストロで、頼んだステーキがウェルダンのはずが真っ赤なレア。胃も弱ってるし、これは戻したい。でも英語で文句を言うなんて生まれて初めて。", lines: [
        { kind: "narration", ja: "白いテーブルクロスの店。運ばれてきた皿を見て、田中さんは一瞬固まる。中はまだ真っ赤だ。" },
        { kind: "dialogue", speaker: "店員", en: "Here you go. The ribeye. Enjoy your meal.", ja: "お待たせしました。リブアイです。ごゆっくりどうぞ。" },
        { kind: "narration", ja: "ナイフを入れると、断面から赤い汁がじわっと広がった。これは無理だ。でも、どう言えばいい。" },
        { kind: "dialogue", speaker: "あなた", en: "Um... excuse me? Sorry. This meat is... very red inside.", ja: "あの…すみません。このお肉、中がすごく赤くて。", note: "完璧な文じゃなくていい。Sorry を一個挟むだけで角が取れる。日本人の得意技をそのまま使え。" },
        { kind: "dialogue", speaker: "店員", en: "Oh, is something wrong with it?", ja: "あら、何か問題がありましたか?" },
        { kind: "dialogue", speaker: "あなた", en: "I asked for well done. But this is... not. Sorry.", ja: "ウェルダンでお願いしたんですが、これは…違くて。すみません。", note: "well done だけ言えれば勝ち。文法が崩れても料理名と焼き加減の単語が立ってれば100%通じる。" },
        { kind: "narration", ja: "店員は皿をのぞき込むと、すぐに表情をやわらげた。" },
        { kind: "dialogue", speaker: "店員", en: "You're totally right, that's way too rare. My bad. Let me get the kitchen to redo it.", ja: "本当ですね、これはレアすぎます。失礼しました。厨房で作り直させます。", note: "My bad は『ごめんごめん』くらいの軽い謝罪。海外の現場でめちゃくちゃ飛び交う。覚えとくと一気にこなれる。" },
        { kind: "dialogue", speaker: "あなた", en: "Thank you. Sorry for the trouble.", ja: "ありがとう。手間かけてすみません。" },
        { kind: "dialogue", speaker: "店員", en: "No trouble at all. You should get exactly what you ordered.", ja: "とんでもない。頼んだ通りのものが来て当然ですから。" },
        { kind: "narration", ja: "数分後。湯気の立つ、こんがり焼けたステーキが運ばれてきた。今度はちゃんと茶色い。" },
        { kind: "dialogue", speaker: "店員", en: "Here we go, well done this time. Hope you like it.", ja: "はい、今度はウェルダンです。気に入ってもらえたら。" },
        { kind: "narration", ja: "一口食べる。文句なし。崩れた英語でも、ちゃんと伝わった。田中さんは小さく笑って、ワインに手を伸ばした。" }
    ] },
    { id: "s-g11", title: "席、空いてますよ", premise: "夕方の混んだ電車。あなたの前に、大きなスーツケースを持った外国人観光客の女性が立っている。少し疲れた様子で、つり革につかまるのもやっとに見える。あなたは席に座っているが、なんだか落ち着かない。", lines: [
        { kind: "narration", ja: "金曜の夕方。会社帰りの電車は人でぎゅうぎゅう。あなたはやっと座れた席で、ほっと一息ついている。" },
        { kind: "narration", ja: "次の駅で、大きなスーツケースを引いた外国人の女性が乗ってきた。座る場所はなく、つり革にしがみつくようにして立っている。" },
        { kind: "dialogue", speaker: "あなた（心の声）", ja: "（うわ、声かけたいけど…英語、出てくるかな。まあ、いいや。やってみるか。）", note: "心の中の独り言。完璧な英語じゃなくていい、の精神。ここから物語が動きます。" },
        { kind: "dialogue", speaker: "あなた", en: "Excuse me. Here, please. You can sit.", ja: "あの、すみません。どうぞ、ここ。座っていいですよ。", note: "文法は荒いけど通じます。Here, please. の3語で席を譲る気持ちは100%伝わる。完璧主義より一歩。" },
        { kind: "dialogue", speaker: "観光客の女性", en: "Oh, really? Are you sure? Thank you so much!", ja: "え、本当に？いいんですか？ありがとうございます！", note: "Are you sure? は「本当にいいの?」の決まり文句。遠慮されたら次の一言で押すのがコツ。" },
        { kind: "dialogue", speaker: "あなた", en: "Yes, yes. I get off soon. No problem.", ja: "ええ、ええ。私もうすぐ降りるので。大丈夫です。", note: "I get off soon=もうすぐ降りる。get off は電車・バスを降りる超頻出フレーズ。これ言えると一気に楽になる。" },
        { kind: "narration", ja: "女性はスーツケースを脇に寄せ、ほっとした顔で席に腰を下ろした。あなたは立ち上がり、つり革につかまる。" },
        { kind: "dialogue", speaker: "観光客の女性", en: "That's such a relief. My feet are killing me. I've been walking around all day.", ja: "本当に助かりました。足がもう限界で。一日中歩き回ってたんです。", note: "My feet are killing me=足が死ぬほど痛い。直訳すると物騒だけど「もうクタクタ」の定番表現。" },
        { kind: "dialogue", speaker: "あなた", en: "Ah, sightseeing? Tokyo is big. Very tired, I think.", ja: "ああ、観光ですか?東京は広いですもんね。疲れますよね。", note: "I think を語尾に足すだけで「〜でしょうね」と柔らかくなる。50代の落ち着いた話し方にもよく合う。" },
        { kind: "dialogue", speaker: "観光客の女性", en: "Exactly! We went to so many places today. Honestly, people here are so kind.", ja: "そうなんです!今日はあちこち回って。それにしても、ここの人たちは本当に親切ですね。", note: "Honestly は「いやマジで」くらいの軽い前置き。感想を強める時に native が無意識に挟む一言。" },
        { kind: "narration", ja: "電車がカーブで揺れる。あなたはつり革を握り直しながら、なんだか少し誇らしい気持ちになっていた。" },
        { kind: "dialogue", speaker: "あなた", en: "Enjoy Japan. Take care. This is my stop.", ja: "日本、楽しんでくださいね。お気をつけて。私、ここで降りるので。", note: "This is my stop.=「私、ここで降ります」。降車を告げる鉄板フレーズ。覚えておくと毎回使える。" },
        { kind: "dialogue", speaker: "観光客の女性", en: "Thank you again! You made my day. Take care!", ja: "本当にありがとう!おかげで救われました。あなたもお気をつけて!", note: "You made my day=あなたのおかげで今日いい日になった。最高級のお礼。言われたら相当うれしいやつ。" },
        { kind: "narration", ja: "ドアが開く。あなたは軽く会釈して電車を降りた。完璧な英語じゃなかった。でも、ちゃんと届いた。ホームを歩く足取りが、少しだけ軽かった。" }
    ] },
    { id: "s-g12", title: "成田で、あいつだった", premise: "出張帰りの成田空港。荷物を待つターンテーブルの前で、肩をぶつけてきた外国人男性がこっちをじっと見ている。20年前、同じ工場で働いていた研修生のマイクだった。英語なんてとっくに錆びついている50代のあなたが、思いがけない再会をどう切り抜けるか。", lines: [
        { kind: "narration", ja: "成田空港、深夜の到着ロビー。ターンテーブルがゆっくり回り始める。隣で誰かが大きなスーツケースを引きずり、その角があなたのすねに当たった。" },
        { kind: "dialogue", speaker: "見知らぬ男性", en: "Oh, sorry! Are you okay?", ja: "おっと、ごめん!大丈夫?", note: "ぶつかった時の定番。Are you okay? は「平気?」くらいの軽さ。日本語の「すみません」より謝りすぎないのが普通です。" },
        { kind: "dialogue", speaker: "あなた", en: "Ah, yes, fine, fine.", ja: "ああ、うん、平気、平気。", note: "とっさに英語が出なくても fine を2回でいい。慌てて完璧な文を作ろうとしないのが正解。" },
        { kind: "narration", ja: "男性が顔を上げ、こちらをまじまじと見た。少し白髪の混じった、見覚えのある笑い方。" },
        { kind: "dialogue", speaker: "男性", en: "Wait... is that you? From the Hamamatsu factory? It's me, Mike!", ja: "待って…もしかして君?浜松の工場の?マイクだよ!", note: "再会の鉄板フレーズ is that you? 「あなたなの?」と確かめる時に使えます。From the ~ で「~で会った」と一気に思い出させる。" },
        { kind: "dialogue", speaker: "あなた", en: "Mike? No way... twenty years! You... your face, same!", ja: "マイク?まさか…20年だよ!君…顔、変わらないな!", note: "文法はぐちゃぐちゃでも No way!(うそだろ)が出れば満点。your face same は崩れてるけど通じます。気にしない。" },
        { kind: "dialogue", speaker: "Mike", en: "Ha! You haven't changed either. What are you doing here so late?", ja: "はは!君も変わってないよ。こんな遅くに何してるの?", note: "either は「君もね」と返すときの便利な一語。What are you doing here? は責めてなくて「どうしてここに?」の軽い質問。" },
        { kind: "dialogue", speaker: "あなた", en: "Business trip. Osaka. Tired, very tired.", ja: "出張。大阪。疲れた、すごく疲れた。", note: "単語を並べるだけで十分。主語や動詞が抜けても、状況があれば相手は補ってくれます。" },
        { kind: "dialogue", speaker: "Mike", en: "Tell me about it. I just flew in from Bangkok. My back is killing me.", ja: "わかるわ。俺もバンコクから着いたばっか。腰が死にそう。", note: "Tell me about it は「ほんとそれ」の共感表現。直訳の「話して」じゃないので注意。My back is killing me=腰がめちゃ痛い。" },
        { kind: "narration", ja: "あなたのスーツケースがターンテーブルから現れた。手を伸ばすが、腰が思うように動かない。" },
        { kind: "dialogue", speaker: "Mike", en: "Here, let me grab that for you. Same old teamwork, right?", ja: "ほら、俺が取ってやるよ。昔と同じチームワークだろ?", note: "let me grab that=取ってあげる、の自然な言い方。Same old~ で「昔と変わらず」と懐かしさを出しています。" },
        { kind: "dialogue", speaker: "あなた", en: "Thank you, Mike. My English... so bad now. Sorry.", ja: "ありがとう、マイク。俺の英語…今ひどいな。ごめん。", note: "謝らなくていいけど、この素直さが距離を縮めます。so bad now で「昔よりサビた」が伝わる。" },
        { kind: "dialogue", speaker: "Mike", en: "Are you kidding? I understood every word. Come on, let's grab a beer before our trains.", ja: "冗談だろ?全部わかったよ。ほら、電車の前にビールでも飲もうぜ。", note: "Are you kidding? は「何言ってんの(全然平気だよ)」の励まし。grab a beer=軽く一杯やる。誘いの超定番です。" },
        { kind: "narration", ja: "二人はスーツケースを並べて押しながら、明かりの灯ったカフェへ歩き出した。錆びた英語も、20年の時間も、ビール一杯で溶けていくようだった。" }
    ] },
];
