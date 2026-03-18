/**
 * 135 - WBC 2026開幕とチビキャラの午後
 * 今日の作業 + WBC 2026リアルタイム
 */

import { JournalEntry } from '../types';

export const wbcChibiCodingEntry: JournalEntry = {
    id: '135',
    date: '2026-03-10',
    title: 'WBC 2026開幕とチビキャラの午後 ― 大谷がグランドスラム打ってる間に俺は猫を描いてた',
    summary: 'WBC 2026がリアルタイムで進行中。大谷がまた怪物やってる裏で、俺はトレーニングページの敵キャラをかわいくする作業に没頭してた。5000単語生成もした。',
    featured: false,
    readTime: 5,
    businessTags: ['開発日記', 'スポーツ', 'バイブコーディング'],
    techTags: ['WBC', 'SVG', 'アニメーション', 'Next.js'],

    // ===== Piece 1: Japanese Journal =====
    conversation: `
## 今日やったこと

トレーニングページのリデザインに丸一日突っ込んだ。

主人公キャラがRPGの勇者みたいなゴツいやつだったんだけど、見ててなんか気持ち悪い。癒されない。で、チビ猫キャラに全面書き換え。丸い頭、でっかい目、猫耳、しっぽ振りアニメーション。走ると足がパタパタ動く。

敵キャラも同じノリで全部かわいくした。スライムは王冠つきの丸いやつ、ウルフは垂れ耳の子犬、ドラゴンはベビードラゴン、デーモンは悪魔ネコ。全員ピンクほっぺ。

布陣バトルのボスもかわいい悪魔ネコに変えた。HPが減ると表情が変わる。普段はにっこり、瀕死だと怒り顔になって胸の宝石が赤く点滅する。

あと5000単語を一気に生成した。20個の並列エージェントで2500語ずつ。200日分の英単語データ。

マイルストーンフラッグも等間隔配置に変えて日本語ラベル消した。ワードストリームも右から左に1文字ずつ出て消えるように直した。

地味だけど充実してた。

## WBC 2026が今やってる

で、作業してる間にWBC 2026が開幕してた。リアルタイムで。

Pool Cが東京ドームで3月5日から。日本は今日でプール最終戦。3勝0敗で準々決勝確定済み。

大谷がまたやってる。初戦のチャイニーズタイペイ戦でグランドスラム。13-0。韓国戦でもホームラン。オーストラリア戦でも逆転の立役者。2023年と同じ匂いがする。MVP候補筆頭。

今回の侍ジャパンの監督は井端弘和。栗山から代わったけど、2023のメンバーが15人も残ってる。山本由伸、鈴木誠也、吉田正尚。層が厚い。

アメリカもやばい。アーロン・ジャッジ、ブライス・ハーパー、ボビー・ウィットJr。史上最強ロースターって言われてる。Paul Skenesがメキシコ戦で4イニング7奪三振。両リーグのサイ・ヤング賞受賞者が同じロースターにいる。

そしてクレイトン・カーショウ。2025年で引退したのにWBCのロースターに入ってる。最後の舞台。

## 2023の決勝をまた思い出す

昨日のエントリで2023年の空気の話を書いたばかりだけど、今年の日本にも同じものが見える。

大谷が初戦でグランドスラム打った時のベンチの映像。全員が飛び跳ねてた。あの温度感。個人技じゃなくてチーム全体が一つの生き物みたいに動いてる感じ。

2023年の決勝は日本3-2アメリカ。9回に大谷がクローザーでマウンドに上がって、トラウトを三振に取って終わった。あれから3年。また同じストーリーが始まろうとしてる。

決勝は3月17日、マイアミ。

また深夜に叫ぶことになりそう。

## 猫と野球

チビ猫キャラ描いてる時に思ったんだけど。

かわいいって強い。

敵キャラをゴツくしても「倒したい」って思わない。でもかわいい敵は「ごめんね」って思いながら倒す。感情が動く。

大谷のグランドスラムも同じかもしれない。技術だけならもっとすごいバッターはいた。でも大谷が打つと感情が動く。あの笑顔で走ってると応援したくなる。

かわいさも、カリスマも、結局は「感情を動かせるかどうか」で決まる。

SVGの猫も、WBCの大谷も、やってることは同じ。

...いや、さすがにそれは違うか。
`,

    // ===== Piece 2: English Summary (Pro expression teaching) =====
    englishSummary: {
        title: "Five Expressions from the WBC Coding Episode",
        readTime: 5,
        sections: [
            {
                heading: "Go All In -- 全力投入する、全部賭ける",
                paragraphs: [
                    "In the Memoria, he's talkin' about spending an entire day redesigning characters -- 'I went all in on the chibi redesign.' Going all in comes from poker. You push all your chips to the center. No holdin' back, no safety net. When you go all in on somethin', you're committin' everything you've got. Time, energy, attention. It's the opposite of half-assin' it.",
                    "You hear this all the time in business and sports. 'They went all in on AI this quarter.' 'Ohtani goes all in every at-bat.' 'We need to go all in or not bother at all.' There's this built-in drama to it, right? 'Cause goin' all in means you could also lose everything. That's what makes it exciting. A startup that goes all in on one product -- either they win big or they're done.",
                    "Related: 'double down' is similar but you're ALREADY committed and you're addin' more. 'Bet the farm' is the extreme version -- riskin' everything you own. 'Hedge your bets' is the opposite -- spreadin' risk. And 'all or nothing' is the mindset behind goin' all in. Oh, and 'put all your eggs in one basket' -- that's the WARNING version. Same action, different framing. Poker gives English so many good phrases.",
                ],
                japaneseParagraphs: [
                    "\"go all in\" = ポーカーが語源。チップ全部をテーブルの真ん中に押し出す。安全策なし、逃げ道なし。Memoriaで「チビキャラのリデザインにall inした」って使ってた。時間もエネルギーも注意力も全部投入すること。中途半端の反対。",
                    "ビジネスでもスポーツでもめちゃくちゃ使う。\"They went all in on AI\"（AI事業に全力投入した）。\"Ohtani goes all in every at-bat\"（大谷は毎打席全力）。ドラマ性が内蔵されてる表現で、all inする＝全部失う可能性もあるから。スタートアップが1つのプロダクトにall inする -- 大勝ちか全滅か。",
                    "仲間: \"double down\" = もう賭けてるのにさらに追加する。\"bet the farm\" = 全財産を賭ける（極端版）。\"hedge your bets\" = リスク分散（反対）。\"all or nothing\" = all inの背後にあるマインドセット。\"put all your eggs in one basket\" = 同じ行動だけど警告として使う。ポーカーは英語に最高のフレーズを供給しすぎ。",
                ],
            },
            {
                heading: "In Real Time -- リアルタイムで、今まさに",
                paragraphs: [
                    "'The WBC is happening in real time.' This one seems simple but there's more to it than you'd think. 'In real time' doesn't just mean 'right now' -- it means you're WATCHING it unfold as it happens. There's no delay, no replay, no summary. You're experiencing the raw, unedited version. In the Memoria, the WBC games are literally happening while he's coding. That simultaneous thing -- that's the heart of 'in real time.'",
                    "'I watched the stock crash in real time.' 'We're seein' climate change happen in real time.' 'The company fell apart in real time on Twitter.' Notice how it often comes with, like, a sense of helplessness? You're watchin' somethin' unfold and you can't speed it up or skip ahead. You just gotta sit there and experience it second by second. It's also got this voyeuristic quality -- you're THERE, witnessing history.",
                    "'Live' overlaps but it's not the same. 'Live' is about broadcast -- 'we're live from Tokyo.' 'In real time' is about the EXPERIENCE of the viewer. 'As it happens' is the formal version. 'Play by play' is the sports commentary version. And 'in the moment' is the emotional version -- bein' present. Japanese has 'リアルタイム' as a loan word, but the English version carries more weight 'cause it implies you're THERE, not just aware.",
                ],
                japaneseParagraphs: [
                    "\"in real time\" = ただの「今」じゃない。展開をそのまま、遅延なく、編集なく見てること。Memoriaで「WBCがコーディングしてる間にリアルタイムで進行してる」って話 -- あの同時進行感が核。リプレイでもまとめでもない、生の体験。",
                    "\"I watched the stock crash in real time\"（株の暴落をリアルタイムで見た）。この表現、だいたい無力感がセット。展開を見てるけど早送りもスキップもできない。1秒1秒を体験するしかない。歴史の目撃者になってる感覚もある。",
                    "\"live\" は近いけど違う。liveは放送の話（\"we're live from Tokyo\"）。\"in real time\" は見てる人の体験の話。\"as it happens\" は堅い版。\"play by play\" はスポーツ実況版。日本語の「リアルタイム」は借用語だけど、英語版のほうが「自分がそこにいる」ニュアンスが強い。",
                ],
            },
            {
                heading: "Pull Off -- やり遂げる（難しいことを）",
                paragraphs: [
                    "From the Tangent about cookin' disasters: 'I still can't believe he pulled off that souffle.' 'Pull off' means you did somethin' difficult and it actually WORKED. There's always an element of surprise. Nobody expected it to work, or it was really hard, or you were under pressure -- but you did it anyway. It's not just 'finish' or 'complete.' Those are neutral. 'Pull off' has triumph baked in.",
                    "'She pulled off the presentation even though the projector broke.' 'Can we really pull this off in two weeks?' 'They pulled off the biggest trade in franchise history.' The grammar's flexible -- 'pull off a win,' 'pull it off,' 'pull off somethin' crazy.' And here's a tip: when someone asks 'can we pull this off?' they're already doubtin' it. The question implies difficulty. If it were easy, they'd just say 'can we do this.'",
                    "Don't confuse it with 'pull out' (withdraw) or 'pull through' (survive a tough situation). 'Pull together' means cooperate. 'Pull apart' means disassemble or critique harshly. And there's 'pull a fast one' which means trick someone -- totally different vibe. Oh, and 'pull strings' means use connections to get what you want. English has like thirty 'pull' phrases and they all mean different things. Good luck.",
                ],
                japaneseParagraphs: [
                    "Tangentの料理失敗話から。\"pull off\" = 難しいことをやり遂げる。ただの「完了」じゃない。驚きの要素がある。誰も成功すると思ってなかった、めちゃくちゃ難しかった、プレッシャーの中でやった -- でもやった。\"finish\" や \"complete\" はニュートラル。\"pull off\" には勝利感が内蔵されてる。",
                    "\"She pulled off the presentation even though the projector broke\"（プロジェクター壊れたのにプレゼンやり切った）。\"Can we pull this off?\" って聞く時点で、もう疑ってる。簡単なら \"can we do this?\" で済む。pull off を使うこと自体が「これ難しいよね」を含んでる。",
                    "混同注意: \"pull out\" = 撤退。\"pull through\" = 困難を乗り越える。\"pull together\" = 協力する。\"pull apart\" = 分解する/厳しく批判する。\"pull a fast one\" = 騙す（全然違うニュアンス）。\"pull strings\" = コネを使う。英語の \"pull\" フレーズは30個くらいあって全部意味が違う。頑張って。",
                ],
            },
            {
                heading: "Hit Different -- 響き方が違う、刺さり方が特別",
                paragraphs: [
                    "'Ohtani hitting a grand slam in the WBC just hits different.' This is a newer expression -- very Gen Z, very 2020s. 'Hit different' means the emotional impact is stronger than usual. The same action, but in a specific context, it affects you more. A home run in a regular season game? Cool. A grand slam in the WBC opener? That hits different. The event is the same but the FEELING is elevated.",
                    "It works for everything. 'Coffee on a rainy morning hits different.' 'That song hits different at 2 AM.' 'Winnin' after you've been losing hits different.' It's always about context making something more impactful. And it's always positive or bittersweet -- you wouldn't say 'getting fired hits different.' Well, you COULD, but it'd be sarcastic. The default vibe is 'this thing is better than expected because of the circumstances.'",
                    "'Hit hard' is the older version but it's more about pain. 'The news hit hard.' 'Hit home' means it became personal. 'Strike a chord' is the formal equivalent of 'hit different' -- somethin' resonates with you emotionally. And 'land' is similar -- 'that joke really landed.' All of these are about impact, but 'hit different' is the most casual, most vibes-based one. It's pure feeling, zero analysis.",
                ],
                japaneseParagraphs: [
                    "\"hit different\" = 響き方が通常と違う。同じ行動でも特定の文脈で感情的インパクトが大きくなる。レギュラーシーズンのホームラン? いいね。WBC初戦のグランドスラム? That hits different。イベントは同じだけど感覚が上がってる。2020年代のZ世代発の表現。",
                    "なんにでも使える。\"Coffee on a rainy morning hits different\"（雨の朝のコーヒーは格別）。\"That song hits different at 2 AM\"（深夜2時のあの曲は刺さり方が違う）。文脈が体験の価値を上げてる時に使う。基本ポジティブか切なさ混じり。ネガティブに使うと皮肉になる。",
                    "\"hit hard\" = 古い版だけど痛みの方向。\"hit home\" = 自分事になった。\"strike a chord\" = フォーマル版で感情に共鳴する。\"land\" = 似てて「着地した」（\"that joke really landed\"）。全部インパクトの話だけど、\"hit different\" が一番カジュアルで一番フィーリング重視。分析ゼロ、純粋な感覚。",
                ],
            },
            {
                heading: "Wing It -- ぶっつけ本番でやる、即興で乗り切る",
                paragraphs: [
                    "From the Tangent cooking disaster: 'I didn't have a recipe so I just winged it.' Winging it means you're doin' somethin' without preparation, without a plan, just goin' with whatever happens. The origin is from theater -- actors waiting 'in the wings' (offstage) who had to go on without rehearsin'. So you're literally performin' from the wings. No script, no safety net, just vibes and hope.",
                    "'I forgot my notes so I'm just gonna wing the presentation.' 'We don't have a reservation, let's just wing it.' 'He's been winging it his whole career and somehow it works.' There's a weird admiration for people who wing it successfully, right? Like, it shouldn't work, but it does, and that makes it cooler than if they'd prepared. The anti-preparation flex.",
                    "The opposite is 'come prepared' or 'have a game plan.' 'Play it by ear' is similar to winging it but softer -- it means you'll decide as you go, usually when someone asks about plans. 'Improvise' is the formal version. 'Fly by the seat of your pants' is the dramatic version. And 'ad-lib' is specifically for speech or performance. Honestly, 'wing it' covers all of these and it's the one people actually use in conversation.",
                ],
                japaneseParagraphs: [
                    "Tangentの料理失敗から。\"wing it\" = 準備なし、計画なし、その場のノリでやる。語源は演劇で、舞台袖（wings）で待ってた役者がリハーサルなしで舞台に出ること。台本なし、セーフティネットなし。バイブと希望だけ。",
                    "\"I forgot my notes so I'm gonna wing the presentation\"（メモ忘れたからプレゼンぶっつけでやる）。\"He's been winging it his whole career\"（キャリアずっとぶっつけ本番）。wing itで成功した人への変な尊敬ってあるよね。準備してないのにうまくいく、それが準備した場合よりクールに見える。反・準備のフレックス。",
                    "反対: \"come prepared\" = 準備してくる。\"play it by ear\" = wing it のソフト版で「成り行きで決める」。\"improvise\" = フォーマル版。\"fly by the seat of your pants\" = ドラマチック版。\"ad-lib\" = スピーチや演技限定。正直、\"wing it\" が全部カバーしてて、実際の会話で一番使われてる。",
                ],
            },
        ],
    },

    // ===== Piece 3: Memoria Conversation (Same topic - today's coding + WBC 2026) =====
    conversationData: {
        english: [
            { speaker: 'male', text: "So I, uh -- I spent literally the entire day drawin' a cat." },
            { speaker: 'female', text: "A cat?" },
            { speaker: 'male', text: "A cat. In SVG. For the training page. The hero character was this, like, RPG warrior dude with armor and a sword, and I'm lookin' at it and I'm like... this is ugly. Like, nobody wants to stare at this for an hour while they're studyin' English." },
            { speaker: 'female', text: "So you made it a cat." },
            { speaker: 'male', text: "A chibi cat! Round head, big sparkly eyes, little cat ears, a tail that wags when it runs. Pink cheeks. The whole thing. And then I went -- I couldn't stop, right? -- I went and redesigned ALL the enemies too. The slime got a little crown, the wolf became a puppy with floppy ears, the dragon's a baby dragon now, and the final boss is, um... a demon cat." },
            { speaker: 'female', text: "A demon cat." },
            { speaker: 'male', text: "With a devil tail. And tiny horns on its cat ears. But like, cute tiny horns. And when you fight it in the battle mode, its expression changes as you deal damage. Normal face at full HP, kinda angry at half, and when it's almost dead it does this little -- the blush fades and the eyes go red. I'm way too proud of this." },
            { speaker: 'female', text: "OK I love that the eyes go red. That's actually adorable." },
            { speaker: 'male', text: "Right?! And the thing is -- like, I had this moment where I realized, cute is just... better? For engagement. Nobody cares about fightin' a scary monster. But a cute monster? You feel BAD killin' it. Your emotions are involved. That's what keeps you comin' back." },
            { speaker: 'female', text: "That's -- huh. That's actually a really good design insight." },
            { speaker: 'male', text: "And THEN, while I'm sittin' there drawin' cat ears, I check my phone and -- the WBC is happening. Like, right now. Today." },
            { speaker: 'female', text: "Wait, the World Baseball Classic?" },
            { speaker: 'male', text: "Yeah! Pool C is in Tokyo Dome. Japan's already 3-0. And Ohtani -- dude. Ohtani hit a grand slam in the OPENER against Chinese Taipei. 13-0. Thirteen to nothing. And I'm here drawin' whiskers on a demon cat while that's happening." },
            { speaker: 'female', text: "Ha!" },
            { speaker: 'male', text: "I mean -- the priorities, right? The biggest baseball event in the world is happenin' in real time and I'm like 'hmm, should this blush be FDA4AF or FCA5B5?'" },
            { speaker: 'female', text: "Those are... hex colors?" },
            { speaker: 'male', text: "Hex colors for pink cheeks. While Ohtani's hittin' grand slams. My life is very normal." },
            { speaker: 'female', text: "OK but tell me about the WBC. What's the -- what's goin' on this year?" },
            { speaker: 'male', text: "So it's 20 teams, four pools. Japan, Korea, Chinese Taipei, Australia, and Czechia in Pool C at Tokyo Dome. And then the US is in Houston with Mexico, Italy, Great Britain, and Brazil. And here's the wild part about Team USA -- Aaron Judge, Bryce Harper, Bobby Witt Jr., both Cy Young winners, and -- get this -- Clayton Kershaw." },
            { speaker: 'female', text: "Kershaw? Didn't he retire?" },
            { speaker: 'male', text: "He retired! After 2025! And he's on the WBC roster! One last ride. Like a -- like a war hero comin' out of retirement for one more mission. I'm gettin' chills just thinkin' about it." },
            { speaker: 'female', text: "That's actually kinda beautiful." },
            { speaker: 'male', text: "And Paul Skenes -- the young pitcher from the Pirates -- threw four innings against Mexico, seven strikeouts. Four innings, seven K's. The kid is a machine. So the US roster might be the strongest it's ever been. Like, EVER." },
            { speaker: 'female', text: "So if Japan and the US both make the final again..." },
            { speaker: 'male', text: "That's the thing! That's EXACTLY the storyline! 2023, Japan 3, America 2. Ohtani strikes out Trout in the ninth. The most iconic moment in WBC history. And now, three years later, same matchup could happen. Final's March 17th in Miami." },
            { speaker: 'female', text: "Are you gonna watch?" },
            { speaker: 'male', text: "Am I -- of course I'm gonna watch. I'll be screaming at 3 AM. Again. Just like 2023. My neighbors probably think I'm, like, witnessing a crime every March." },
            { speaker: 'female', text: "So you spent today drawin' cute cats AND followin' the WBC." },
            { speaker: 'male', text: "AND I generated five thousand English words with parallel AI agents. Twenty agents runnin' at once, spittin' out vocabulary. Two hundred days of word data. It was actually -- it was insane to watch. Like, all these little processes churnin' away in parallel while I'm manually tweakin' SVG coordinates for a cat's tail angle." },
            { speaker: 'female', text: "That's such a weird contrast. AI doin' the bulk work and you hand-craftin' a tail." },
            { speaker: 'male', text: "But that's -- I mean, that's the whole vibe codin' thing, right? The AI handles the volume and I handle the... the soul. The cat's tail angle IS the soul. No AI is gonna get that right. They'd make it functional. I made it cute. And cute wins. Cute ALWAYS wins. Just ask Ohtani." },
            { speaker: 'female', text: "You're comparin' yourself to Ohtani now?" },
            { speaker: 'male', text: "We're both -- we both -- OK, no. No. One of us hit a grand slam in front of forty thousand people and one of us adjusted blush opacity for three hours. But the PRINCIPLE is the same!" },
            { speaker: 'female', text: "It really isn't." },
            { speaker: 'male', text: "...yeah, it really isn't. But the cat IS cute though." },
            { speaker: 'female', text: "The cat is very cute." },
        ],
        japanese: [
            { speaker: 'male', text: "今日さ、丸一日猫を描いてた。" },
            { speaker: 'female', text: "猫？" },
            { speaker: 'male', text: "猫。SVGで。トレーニングページの主人公がRPGの戦士みたいなゴツいやつだったんだけど、見てて「これダサいな」って。英語の勉強しながら1時間これ見たくない。" },
            { speaker: 'female', text: "で、猫にした。" },
            { speaker: 'male', text: "チビ猫！丸い頭、キラキラ目、猫耳、走ると揺れるしっぽ。ピンクのほっぺ。で、止まれなくなって敵キャラも全部やり直した。スライムに王冠つけて、ウルフは垂れ耳の子犬にして、ドラゴンはベビードラゴン、ラスボスは悪魔ネコ。" },
            { speaker: 'female', text: "悪魔ネコ。" },
            { speaker: 'male', text: "デビルのしっぽつき。猫耳にちっちゃい角。でもかわいい角ね。で、バトルモードで戦うとダメージに応じて表情変わるの。HPフルで普通の顔、半分で怒り、瀕死でほっぺのピンクが消えて目が赤くなる。自分で言うのもアレだけど結構いい出来。" },
            { speaker: 'female', text: "目が赤くなるのいいね。かわいい。" },
            { speaker: 'male', text: "でしょ！で、気づいたの。かわいいは強い。怖いモンスターと戦っても何も感じない。でもかわいいモンスターだと「ごめんね」って思いながら倒す。感情が動く。それがリピートに繋がる。" },
            { speaker: 'female', text: "それ、地味にいいデザインの洞察だね。" },
            { speaker: 'male', text: "で、猫耳描いてる最中にスマホ見たらWBCやってた。今。リアルタイムで。" },
            { speaker: 'female', text: "え、ワールド・ベースボール・クラシック？" },
            { speaker: 'male', text: "Pool Cが東京ドーム。日本3勝0敗。で、大谷が初戦のチャイニーズタイペイ戦でグランドスラム。13-0。俺が悪魔ネコにヒゲ描いてる間にそれが起きてた。" },
            { speaker: 'female', text: "あはは！" },
            { speaker: 'male', text: "優先順位よ。世界最大の野球イベントがリアルタイムで進行してて、俺は「このほっぺのピンク、FDA4AFかFCA5B5か」で悩んでる。" },
            { speaker: 'female', text: "それ...16進カラーコード？" },
            { speaker: 'male', text: "ピンクのほっぺ用のね。大谷がグランドスラム打ってる裏で。俺の人生、非常に通常運転。" },
            { speaker: 'female', text: "WBCの話聞かせて。今年どうなってるの？" },
            { speaker: 'male', text: "20チーム、4プール。Pool Cが東京ドームで日韓台豪チェコ。アメリカはヒューストンでメキシコ、イタリア、イギリス、ブラジルと。で、アメリカのロースターがやばくて。ジャッジ、ハーパー、ウィットJr.、サイヤング両受賞者、そしてカーショウ。" },
            { speaker: 'female', text: "カーショウ？引退したよね？" },
            { speaker: 'male', text: "2025年で引退した！のにWBCのロースターに入ってる！最後の舞台。戦争映画の「もう一回だけ」みたいな。鳥肌立つ。" },
            { speaker: 'female', text: "それは...ちょっと泣ける。" },
            { speaker: 'male', text: "で、ポール・スキーンズっていう若いピッチャーがメキシコ戦で4イニング7奪三振。怪物。アメリカのロースター、史上最強かもしれない。" },
            { speaker: 'female', text: "日本とアメリカがまた決勝で当たったら..." },
            { speaker: 'male', text: "そう！それ！2023年、日本3-2アメリカ。9回に大谷がトラウトを三振。WBC史上最高の瞬間。3年経ってまた同じ対決がありえる。決勝は3月17日、マイアミ。" },
            { speaker: 'female', text: "見るの？" },
            { speaker: 'male', text: "当たり前。深夜3時に絶叫するよ。2023年と同じ。近所の人たちたぶん毎年3月に事件が起きてると思ってる。" },
            { speaker: 'female', text: "今日、かわいい猫描いてWBC追いかけてたわけね。" },
            { speaker: 'male', text: "あと5000英単語をAIの並列エージェントで生成した。20エージェント同時稼働で200日分のボキャブラリーデータ。それ走ってる横で俺は手動で猫のしっぽの角度をSVGで微調整してた。" },
            { speaker: 'female', text: "すごい対比。AIが大量生産してる横で手作業のしっぽ。" },
            { speaker: 'male', text: "でもそれがバイブコーディングでしょ。AIがボリュームやって、俺が魂をやる。猫のしっぽの角度が魂なの。AIに任せたら機能的にはなるけどかわいくはならない。かわいいが勝つ。かわいいは常に勝つ。大谷に聞いてみ。" },
            { speaker: 'female', text: "自分を大谷と比べ始めた。" },
            { speaker: 'male', text: "俺たち二人とも -- いや、やめよう。一人は4万人の前でグランドスラム打って、一人はほっぺのopacityを3時間いじってた。でも原理は同じ！" },
            { speaker: 'female', text: "全然同じじゃない。" },
            { speaker: 'male', text: "...うん、全然同じじゃない。でも猫はかわいいよ。" },
            { speaker: 'female', text: "猫はかわいい。" },
        ],
        tone: 'playful' as const,
        generatedAt: new Date('2026-03-10'),
    },

    // ===== Piece 4: Tangent (Completely different topic - cooking disasters) =====
    tangentData: {
        english: [
            { speaker: 'male', text: "OK completely different topic. I, um -- I tried to make a souffle last night." },
            { speaker: 'female', text: "You did not." },
            { speaker: 'male', text: "I did! I saw a video and I was like, how hard can it be? It's eggs and air. That's literally the ingredients. Eggs. And air." },
            { speaker: 'female', text: "That is... not how souffles work." },
            { speaker: 'male', text: "Yeah, I -- I found that out. So I'm whippin' the egg whites, right? And the video says 'whip until stiff peaks form.' And I'm starin' at the bowl goin', what's a stiff peak? Like, compared to what? A soft peak? A medium peak? Is there a peak taxonomy I don't know about?" },
            { speaker: 'female', text: "A peak taxonomy." },
            { speaker: 'male', text: "There should be! Nobody explains this! They just say 'stiff peaks' like everyone's born knowin' what peak stiffness looks like. I googled it and it said 'the peaks should stand up straight without folding over.' Which -- OK, that's helpful. But then I'm holdin' the whisk upside down tryin' to evaluate peak posture and the egg whites are drippin' on my face." },
            { speaker: 'female', text: "Oh no." },
            { speaker: 'male', text: "Oh yes. Egg face. And I haven't even gotten to the folding part. 'Fold the egg whites into the batter.' FOLD. What does fold mean in cooking?! In my world, fold means paper. Origami. You fold clothes. How do you FOLD a liquid into another liquid?" },
            { speaker: 'female', text: "It's like -- you gently combine them without deflating the --" },
            { speaker: 'male', text: "WITHOUT DEFLATING. Right. So now I have to worry about deflation? The egg whites have an economy now? They can experience deflation? I'm stirring SO carefully, and my arm is shaking, and I'm doin' this weird scoop-and-turn motion that I saw in the video, and I THINK it's working? Maybe?" },
            { speaker: 'female', text: "Did you preheat the oven?" },
            { speaker: 'male', text: "I -- ... no." },
            { speaker: 'female', text: "Oh no." },
            { speaker: 'male', text: "I forgot to preheat the oven. So I'm standin' there with this perfectly folded -- allegedly perfectly folded -- souffle batter, and the oven is cold. And the video specifically said 'souffles wait for no one.' So now I'm panicking, I crank the oven to max, shove the ramekin in, and I'm just standin' there with my face pressed against the glass watching it like -- like it's a surgery." },
            { speaker: 'female', text: "And?" },
            { speaker: 'male', text: "And it rose! It actually ROSE! For about forty-five seconds. I was so happy. I was -- I literally called out loud to nobody, 'IT'S RISING!' in my empty apartment. And then it stopped. And then it... sank. Just -- pfffffft. Like a sad balloon." },
            { speaker: 'female', text: "The oven wasn't hot enough." },
            { speaker: 'male', text: "The oven wasn't hot enough! Because I didn't preheat! And now I have this, like, egg pancake? It's flat. It's dense. It tastes fine, honestly, but it looks like a crime scene. It looks like a souffle that witnessed something traumatic and never recovered." },
            { speaker: 'female', text: "Ha! A traumatized souffle." },
            { speaker: 'male', text: "A PTSD souffle. Post-Traumatic Souffle Disorder. And the worst part -- the WORST part -- is that I took a picture of it before it collapsed 'cause I was gonna post it on social media. So now I have photographic evidence of the brief, beautiful moment when I almost pulled it off, followed by the reality of what I actually made." },
            { speaker: 'female', text: "Are you gonna try again?" },
            { speaker: 'male', text: "Tomorrow. I'm preheatin' the oven first this time. I've learned one lesson and one lesson only: heat comes first, ambition comes second." },
            { speaker: 'female', text: "That's actually applicable to a lot of things." },
            { speaker: 'male', text: "It's applicable to everything. Prepare the foundation before you build the dream. The souffle is a metaphor. I'm living a souffle metaphor." },
            { speaker: 'female', text: "You're just bad at cooking." },
            { speaker: 'male', text: "...also that." },
        ],
        japanese: [
            { speaker: 'male', text: "全然関係ない話。昨日スフレ作ろうとした。" },
            { speaker: 'female', text: "嘘でしょ。" },
            { speaker: 'male', text: "マジで。動画見て「これ簡単そうじゃん」って。材料、卵と空気。卵。と。空気。" },
            { speaker: 'female', text: "スフレはそういうものじゃない。" },
            { speaker: 'male', text: "ね、それ分かった。で、卵白泡立ててて、動画が「角が立つまで泡立てる」って言うの。で、ボウル見ながら「角が立つってなに？比較対象は？柔らかい角？中間の角？角の分類学があるの？」って。" },
            { speaker: 'female', text: "角の分類学。" },
            { speaker: 'male', text: "あるべきでしょ！誰も説明してくれない。「角が立つ」って言うけど角の硬さの基準を生まれつき知ってる前提。ググったら「泡立て器を逆さにして角が倒れなければOK」って。で、逆さにしたら卵白が顔に垂れてきた。" },
            { speaker: 'female', text: "あちゃー。" },
            { speaker: 'male', text: "卵白フェイスパック。で、まだ「混ぜる」工程に入ってない。「卵白を生地にさっくり混ぜる」。さっくりって何？！俺の世界でさっくりは紙を折ること。服をたたむこと。液体を液体にさっくり混ぜるってどうやるの？" },
            { speaker: 'female', text: "泡をつぶさないように優しく --" },
            { speaker: 'male', text: "泡をつぶさない！卵白に経済があるの？デフレが起きるの？めちゃくちゃ慎重にかき混ぜて、腕が震えて、動画で見たすくい上げて返す動作をやってて、たぶんうまくいってる？たぶん？" },
            { speaker: 'female', text: "オーブン予熱した？" },
            { speaker: 'male', text: "......してない。" },
            { speaker: 'female', text: "あー。" },
            { speaker: 'male', text: "予熱忘れた。完璧に混ぜた（はずの）スフレ生地を持って立ってて、オーブンは冷たい。動画は「スフレは待ってくれない」って言ってた。パニックになって最大温度にして突っ込んで、ガラスに顔くっつけて見てた。手術を見守るみたいに。" },
            { speaker: 'female', text: "で？" },
            { speaker: 'male', text: "膨らんだ！マジで膨らんだ！45秒くらい。嬉しくて、誰もいないアパートで「膨らんでる！！」って叫んだ。で、止まった。そして...しぼんだ。ぷしゅーって。悲しい風船みたいに。" },
            { speaker: 'female', text: "オーブンの温度が足りなかった。" },
            { speaker: 'male', text: "予熱してないから！で、出来上がったのが卵パンケーキ。平ら。ぎゅっとしてる。味は正直悪くない。でも見た目が事件現場。トラウマを経験して立ち直れなくなったスフレ。" },
            { speaker: 'female', text: "あはは！トラウマスフレ！" },
            { speaker: 'male', text: "PTSDスフレ。しかも最悪なのが、しぼむ前に写真撮ってた。SNSに上げようと思って。だから「一瞬だけ成功しかけた美しい瞬間」と「実際にできたもの」の写真が両方残ってる。" },
            { speaker: 'female', text: "またやるの？" },
            { speaker: 'male', text: "明日。今度は先に予熱する。学んだ教訓は1つだけ。熱が先、野心は後。" },
            { speaker: 'female', text: "それ、色んなことに当てはまるね。" },
            { speaker: 'male', text: "全てに当てはまる。土台を整えてから夢を建てる。スフレはメタファーなんだよ。俺はスフレのメタファーを生きてる。" },
            { speaker: 'female', text: "料理が下手なだけでしょ。" },
            { speaker: 'male', text: "...それもある。" },
        ],
        tone: 'playful' as const,
        generatedAt: new Date('2026-03-10'),
    },
};
