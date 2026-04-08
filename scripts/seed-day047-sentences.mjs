// Seed Day 047 (words 750-799) -- Mar 17 - Mar 21
// Day 047: Tokyo 52 Episode 1 (渋谷カフェ → のれん)
// Characters: Yuki(27F), Aya(24F), Rina(22F), Foreign Customer(M), Master Gondo(78M)
// SORTED BY: (created_at ASC, id ASC) -- page sort order

const DAY47_DATA = [
    // ========== DAY 1 (Mar 17) -- MEETING FREEZE: Yuki freezes at cafe when foreigner speaks ==========
    {
        id: '_NfB2kqX',
        speaker: "Yuki",
        meaning: "恐れ・不安",
        sentence: "I got this... trepidation every single time a foreign customer walks up to the register. Like my whole body just locks up, you know? My TOEIC's 620 but my mouth score's gotta be like... negative forty. It's like my brain's runnin' but my mouth forgot to clock in.",
        sentence_ja: "外国人のお客さんがレジに来るたびに...この恐怖感があるの。体全体が固まるっていうか。TOEIC 620あるけど口のスコアは...マイナス40くらい。脳は動いてるのに口が出勤拒否してる感じ。",
        idiom: "clock in",
        idiom_meaning: "start working / show up for duty / 出勤する・仕事を始める"
    },
    {
        id: '_NgR3VaP',
        speaker: "Aya",
        meaning: "崖っぷち・瀬戸際",
        sentence: "Yuki-san, I've seen you handle a conference call with Osaka AND Tokyo at the same time -- you're not on the precipice of failure, you're just psychin' yourself out. English ain't a test, it's just... talkin'. You already know how to talk, right?",
        sentence_ja: "ゆきさん、大阪と東京の電話会議を同時に仕切ってるの見たことあるよ -- 崖っぷちなんかじゃない、自分で自分を追い込んでるだけ。英語はテストじゃないよ、ただの...会話。話し方はもう知ってるでしょ？",
        idiom: "psych oneself out",
        idiom_meaning: "make yourself nervous by overthinking / 考えすぎて自滅する"
    },
    {
        id: '_NhWt8mY',
        speaker: "Rina",
        meaning: "常連客",
        sentence: "Oh my god, that regular -- the Australian guy with the man-bun? He comes in every mornin' and I literally just make it up as I go. Half the time I'm sayin' random stuff and he's laughin', so either I'm funny or he's real polite. Either way, it's workin'!",
        sentence_ja: "あの常連さん -- マンバンのオーストラリア人？毎朝来るんだけどマジでその場しのぎでやってる。半分意味不明なこと言ってるのに笑ってるから、私が面白いか彼が超礼儀正しいかのどっちか。どっちにしろうまくいってる！",
        idiom: "make it up as you go",
        idiom_meaning: "improvise without a plan / その場しのぎでやる・行き当たりばったりでやる"
    },
    {
        id: '_NkfQrW7',
        speaker: "Foreign Customer",
        meaning: "渋い・控えめな上品さ",
        sentence: "Excuse me, this area has such an understated vibe compared to Harajuku -- I'm lovin' it. Could you maybe point me toward a good ramen spot? Doesn't gotta be fancy, just somethin' real, you know? I wanna eat where the locals eat, not the tourist traps.",
        sentence_ja: "すみません、このエリアは原宿に比べて渋い雰囲気ですね -- 気に入ってます。いいラーメン屋さん教えてもらえますか？派手じゃなくていい、本物のやつ。地元の人が行くところで食べたいんです、観光客向けじゃなくて。",
        idiom: "tourist trap",
        idiom_meaning: "a place that overcharges tourists / 観光客向けのぼったくり店"
    },
    {
        id: '_NmrP4QH',
        speaker: "Yuki",
        meaning: "ぎこちない・不器用な",
        sentence: "I just stood there bein' all gauche while Aya swooped in and handled the whole thing in like ten seconds flat. Perfect English, big smile, the guy was happy. And I'm just... standin' there holdin' a cup like a mannequin. I wanted the floor to swallow me whole.",
        sentence_ja: "私はそこにぎこちなく突っ立ってて、綾が颯爽と来て10秒で全部対応した。完璧な英語、満面の笑み、お客さんも満足。で私は...カップ持ったマネキンみたいに立ってるだけ。地面に飲み込まれたかった。",
        idiom: "swallow someone whole",
        idiom_meaning: "completely overwhelm or consume someone / 丸呑みにする・完全に打ちのめす"
    },
    {
        id: '_NnYs5cJ',
        speaker: "Aya",
        meaning: "共感・感情移入",
        sentence: "Look, I got total empathy for where you're at right now. I froze up too when I first came back from the States -- Japanese meetings terrified me, if you can believe that. Everybody's got their thing, y'know? Don't beat yourself up over one awkward moment.",
        sentence_ja: "ねえ、今のゆきさんの気持ち、完全に共感する。私もアメリカから帰ってきた時固まったよ -- 日本の会議が怖かった、信じられないかもだけど。みんなそれぞれ苦手なものがあるんだよ。ちょっとぎこちなかったくらいで自分を責めないで。",
        idiom: "beat oneself up",
        idiom_meaning: "criticize yourself harshly / 自分を責める・自己嫌悪する"
    },
    {
        id: '_NoP7KhT',
        speaker: "Rina",
        meaning: "失敗・大コケ",
        sentence: "Okay so my biggest flop? I once told this British couple 'please enjoy your dinner' at 9 AM when they ordered croissants. They just stared at me. I wanted to DIE. But then the lady laughed and said 'cheers, love' and honestly? We vibed after that. No big deal!",
        sentence_ja: "私の最大のやらかし？イギリス人カップルがクロワッサン頼んだ朝9時に「ディナーをお楽しみください」って言っちゃった。めっちゃ見られた。死にたかった。でもおばさんが笑って「ありがと」って言ってくれて、そっからいい感じだった。大したことない！",
        idiom: "no big deal",
        idiom_meaning: "it's not important / 大したことない"
    },
    {
        id: '_NqGhxM4',
        speaker: "Yuki",
        meaning: "悔しさ・苦渋",
        sentence: "The bitterness isn't even about English anymore, honestly. It's about me. I studied SO hard, did all the grammar drills, memorized like a thousand words, and I still can't string a sentence together when it counts. All that effort just... went down the drain.",
        sentence_ja: "悔しさはもう英語のことじゃないの、正直。自分自身のこと。あんなに勉強して、文法ドリル全部やって、単語千個くらい覚えて、それでも肝心な時に文章一つ組み立てられない。全部の努力が...水の泡。",
        idiom: "go down the drain",
        idiom_meaning: "be completely wasted / 水の泡になる・無駄になる"
    },
    {
        id: '_NsBt3kR',
        speaker: "Aya",
        meaning: "独り言",
        sentence: "Can I let you in on a secret? When I was in college in Oregon, I used to do these soliloquy things in the mirror -- just ramblin' in Japanese to keep from losin' it. My roommate thought I was nuts. Point is, everybody fakes it till they make it. Everybody.",
        sentence_ja: "秘密教えていい？オレゴンの大学にいた時、鏡に向かって独り言言ってた -- 日本語でブツブツ言って正気を保ってた。ルームメイトに頭おかしいと思われた。言いたいのは、みんな最初はフリしてるってこと。みんな。",
        idiom: "fake it till you make it",
        idiom_meaning: "pretend confidence until it becomes real / できるフリをして本物になるまで続ける"
    },
    {
        id: '_NtYZm8A',
        speaker: "Foreign Customer",
        meaning: "活気・エネルギー",
        sentence: "Man, the vivacity in this city is somethin' else -- everybody's movin' with purpose, the trains are spotless, and this coffee? Best I've had since Milan. I keep tellin' my buddies back home they gotta see Tokyo to believe it. Photos don't do it justice at all.",
        sentence_ja: "いやー、この街の活気は別格だね -- みんな目的持って動いてるし、電車はピカピカ、このコーヒー？ミラノ以来最高。地元の友達にずっと東京は見ないと分からないって言ってる。写真じゃ伝わらないんだよ。",
        idiom: "do it justice",
        idiom_meaning: "represent something fairly or adequately / 正当に評価する・魅力を伝えきる"
    },

    // ========== DAY 2 (Mar 18) -- CAFE DEVASTATION: Yuki bombs another encounter, considers quitting ==========
    {
        id: '_NuWa6fL',
        speaker: "Yuki",
        meaning: "屈辱",
        sentence: "That was pure humiliation -- the lady asked for oat milk and I panicked and gave her hot water. HOT WATER. Aya had to come fix it AGAIN. I'm startin' to think I should just throw in the towel on this whole English thing. Maybe it's just not for me.",
        sentence_ja: "完全な屈辱だった -- お客さんがオーツミルク頼んだのにパニックでお湯出した。お湯。綾がまた直しに来た。もう英語は白旗あげた方がいいのかな。向いてないのかも。",
        idiom: "throw in the towel",
        idiom_meaning: "give up / admit defeat / 白旗を揚げる・諦める"
    },
    {
        id: '_Nv8k2VE',
        speaker: "Rina",
        meaning: "気前のいい・惜しみない",
        sentence: "Yuki-senpai, you're being super munificent with the self-hate today, wow. Like, you're just GIVIN' it away for free. Save some of that energy for somethin' fun, yeah? One messed-up order isn't the end of the world. I mess up like three times a shift, easy.",
        sentence_ja: "ゆき先輩、今日の自己嫌悪めっちゃ気前いいね、わお。無料で配ってるじゃん。そのエネルギー楽しいことに取っといてよ。注文一つ間違えたくらいで世界は終わらないから。私なんかシフトで3回は間違えるよ、余裕で。",
        idiom: "the end of the world",
        idiom_meaning: "the worst possible outcome (usually used in negative) / 世界の終わり・最悪の事態"
    },
    {
        id: '_NwFq9RE',
        speaker: "Aya",
        meaning: "根本的な・深く根差した",
        sentence: "I think the issue's more deep-rooted than just vocab, Yuki. You KNOW the words -- I've seen your flashcards, you've got hundreds. It's the confidence piece that's missin'. You gotta get outta your own head. Easier said than done, I know, but still.",
        sentence_ja: "問題は単語力より根本的なものだと思う、ゆき。言葉は知ってるもん -- フラッシュカード見たよ、何百もある。足りないのは自信。自分の頭の中から出なきゃ。言うのは簡単って分かってるけど、でもさ。",
        idiom: "get out of one's own head",
        idiom_meaning: "stop overthinking and self-doubting / 考えすぎをやめる・頭の中から抜け出す"
    },
    {
        id: '_NxHY7pK',
        speaker: "Yuki",
        meaning: "自虐的な・卑下する",
        sentence: "I know I'm bein' self-deprecating but can you blame me? Aya speaks English like she was born in California, Rina just... vibes her way through everything, and I'm over here stutterin' through 'May I help you.' Three years of TOEIC prep for THIS.",
        sentence_ja: "自虐的なのは分かってるけど責められる？綾はカリフォルニア生まれみたいに英語話すし、りなは...全部ノリで乗り切るし、私は「いらっしゃいませ」でどもってる。3年間のTOEIC対策でこれ。",
        idiom: "can you blame me",
        idiom_meaning: "it's understandable that I feel this way / 責められる？・無理もないでしょ"
    },
    {
        id: '_NyFa4bM',
        speaker: "Foreign Customer",
        meaning: "異国情緒のある・エキゾチックな",
        sentence: "Everything here feels so exotic to me -- the little alleyways, the vending machines on every corner, the way people bow. I tried bowin' to the convenience store clerk and she looked at me like I had two heads. But hey, when in Rome, right?",
        sentence_ja: "ここは全部エキゾチックに感じる -- 小さな路地、角ごとの自販機、お辞儀する人たち。コンビニの店員さんにお辞儀したら頭が二つあるみたいな顔された。まあ、郷に入っては郷に従えだよね？",
        idiom: "when in Rome",
        idiom_meaning: "follow local customs when visiting / 郷に入っては郷に従え"
    },
    {
        id: '_NzMr5hG',
        speaker: "Rina",
        meaning: "明るい・輝く",
        sentence: "Okay but like, Yuki-senpai, your radiant energy when you're speakin' Japanese is SO good -- customers love you, your smile is killer, you're like the warmest person here. You just gotta let that shine through in English too. Same you, different language, that's all!",
        sentence_ja: "でもさ、ゆき先輩、日本語で話してる時の明るいエネルギーめっちゃいいよ -- お客さんに愛されてるし、笑顔最高だし、ここで一番あったかい人。それを英語でも出せばいいだけ。同じ自分で、言語が違うだけ！",
        idiom: "let it shine through",
        idiom_meaning: "allow a quality to be visible / 輝きを見せる・にじみ出させる"
    },
    {
        id: '_O-Kf8mV',
        speaker: "Aya",
        meaning: "再起・復活",
        sentence: "Listen, I know a place that might help with your resurgence -- there's this tiny izakaya in the back streets called Noren. The master's like eighty-somethin' and speaks better English than me. He's got this whole philosophy about language. Wanna check it out tonight?",
        sentence_ja: "ねえ、復活に役立つかもしれない場所知ってる -- 裏路地にのれんっていう小さい居酒屋があるの。マスターが80歳くらいで私より英語うまい。言語について哲学持ってるの。今夜行ってみない？",
        idiom: "check it out",
        idiom_meaning: "go see or investigate something / 見てみる・行ってみる"
    },
    {
        id: '_O0Ts2nH',
        speaker: "Yuki",
        meaning: "懐疑的な・疑い深い",
        sentence: "I'm kinda skeptical about goin' to some random izakaya for English advice, not gonna lie. What's an eighty-year-old bar owner gonna teach me that three years of textbooks couldn't? No offense, Aya, but this sounds like a wild goose chase to me.",
        sentence_ja: "正直、よく分からない居酒屋に英語のアドバイスもらいに行くの懐疑的なんだけど。80歳のバーのオーナーが3年間の教科書にできなかったこと何教えてくれるの？悪気はないけど綾、無駄足な気がする。",
        idiom: "wild goose chase",
        idiom_meaning: "a hopeless search for something unattainable / 無駄足・見込みのない追跡"
    },
    {
        id: '_O1Ya3pK',
        speaker: "Rina",
        meaning: "せがむ・しつこく頼む",
        sentence: "Ooh I wanna go I wanna go! Yuki-senpai, I'm gonna badger you until you say yes -- pleasepleaseplease? Old-man izakayas have the BEST vibes, and if the master's got some secret English hack I need that in my life right now. Let's gooo!",
        sentence_ja: "行きたい行きたい！ゆき先輩、行くって言うまでせがむからね -- おねがいおねがいおねがい？おじいちゃん居酒屋って最高の雰囲気だし、マスターに英語の裏技あるなら今すぐ知りたい。行こー！",
        idiom: "let's go",
        idiom_meaning: "expression of excitement and readiness / さあ行こう・テンション上がる"
    },
    {
        id: '_O2PbVqN',
        speaker: "Yuki",
        meaning: "降参・屈服",
        sentence: "Fine, fine, I capitulate -- you two are impossible to say no to. But if this turns out to be some weird old guy just drinkin' sake and ramblin', we're leavin' after one drink. Deal? I'm only goin' 'cause you won't drop it otherwise.",
        sentence_ja: "分かった分かった、降参 -- あなたたち二人にはノーって言えない。でもただの変なおじいちゃんが酒飲んでブツブツ言ってるだけだったら一杯で帰るからね。約束？しつこいから行くだけだから。",
        idiom: "drop it",
        idiom_meaning: "stop talking about something / その話やめて・もうしつこくしないで"
    },

    // ========== DAY 3 (Mar 19) -- FINDING NOREN: The three arrive at the izakaya, meet Master Gondo ==========
    {
        id: '_O3Qc6wR',
        speaker: "Rina",
        meaning: "古風な・時代遅れの",
        sentence: "Whoa, this place is SO quaint -- like we stepped into a time machine or somethin'. The lanterns, the wood counter, the little sake cups lined up... I'm obsessed already. This is givin' major main-character energy. Somebody take my picture next to the noren!",
        sentence_ja: "うわ、この場所めっちゃ趣がある -- タイムマシンに乗ったみたい。提灯、木のカウンター、並んだ小さいおちょこ...もうハマった。主人公エネルギー出まくり。のれんの横で写真撮って！",
        idiom: "main-character energy",
        idiom_meaning: "behaving as if you're the protagonist of a story / 主人公感・自分が主役な雰囲気"
    },
    {
        id: '_O4FdTxS',
        speaker: "Master Gondo",
        meaning: "覚悟・決意",
        sentence: "Three young ladies at my counter on a Wednesday night -- that takes a certain resolve. Most people your age are starin' at phones in chain restaurants. Sit. The oden's almost ready. First rule of my place: no menus. You eat what I make. That's the deal.",
        sentence_ja: "水曜の夜にカウンターに若い女性三人 -- ある種の覚悟がいる。君たちの歳は大体チェーン店でスマホ見てる。座りなさい。おでんがもうすぐ。うちのルール：メニューはない。私が作ったものを食べる。それが約束。",
        idiom: "that's the deal",
        idiom_meaning: "those are the terms / accept it as it is / そういう約束・条件はそれ"
    },
    {
        id: '_O5TeLyU',
        speaker: "Yuki",
        meaning: "畏敬の念",
        sentence: "I feel this weird sense of reverence sittin' here -- like the counter's been polished by a thousand elbows over fifty years. Aya said you speak English, Master? I'm... sorry, I don't mean to be rude, but... how? Where did you learn?",
        sentence_ja: "ここに座ると不思議な畏敬の念を感じる -- 50年間で千人の肘に磨かれたカウンターみたい。マスター、英語話せるって綾が言ってたんですけど？...すみません、失礼な意味じゃなくて...どうやって？どこで習ったんですか？",
        idiom: "I don't mean to be rude",
        idiom_meaning: "apologetic preface before a potentially offensive question / 失礼な意味じゃないんですが"
    },
    {
        id: '_O6Re3mV',
        speaker: "Master Gondo",
        meaning: "自分で身につけた・独学の",
        sentence: "Self-taught. Fifty-two years of talkin' to every foreigner who walked through that curtain. No textbook, no classroom, no TOEIC. Just conversations, thousands of 'em. Language isn't somethin' you study -- it's somethin' you live. Big difference, young lady.",
        sentence_ja: "独学。あの暖簾をくぐった全ての外国人と52年間話した。教科書なし、教室なし、TOEICなし。会話だけ、何千回も。言語は勉強するものじゃない -- 生きるものだ。大きな違いだよ、お嬢さん。",
        idiom: "big difference",
        idiom_meaning: "there is an important distinction / 大きな違いがある"
    },
    {
        id: '_O7Sf8nW',
        speaker: "Aya",
        meaning: "驚愕の",
        sentence: "See, Yuki? I told you this would be worth it. Master Gondo's taken the TOEIC twelve times -- all 990, which is just stupefying when you think about it. And he learned the whole thing right here behind this counter. Not a single lesson. That's the real deal.",
        sentence_ja: "ね、ゆき？来る価値あるって言ったでしょ。権藤マスターTOEIC12回受けて全部990点、考えたら驚愕でしょ。全部このカウンターの向こうで覚えたの。レッスン一つも受けてない。これが本物。",
        idiom: "the real deal",
        idiom_meaning: "genuine and authentic / 本物・正真正銘"
    },
    {
        id: '_O8Tg9oX',
        speaker: "Master Gondo",
        meaning: "根底にある・潜在的な",
        sentence: "Your underlying problem isn't English. It's fear. You're so scared of bein' wrong that you forgot the whole point of talkin' -- connection. Nobody ever connected with another human through a perfect sentence. They connect through tryin'. Through messy, broken, honest tryin'.",
        sentence_ja: "君の根底にある問題は英語じゃない。恐怖だ。間違えることが怖すぎて話す意味を忘れてる -- つながり。完璧な文章で人とつながった奴はいない。挑戦してつながる。不器用で、壊れた、正直な挑戦で。",
        idiom: "the whole point",
        idiom_meaning: "the fundamental purpose or reason / そもそもの意味・本質"
    },
    {
        id: '_O9Uh0pY',
        speaker: "Yuki",
        meaning: "脆い・壊れやすい",
        sentence: "That's... wow. I feel kinda fragile right now, not gonna lie. Like you just cracked open somethin' I've been keepin' locked up for years. I KNOW I'm scared, I just... didn't think anyone else could see it. Is it that obvious? Do I wear it on my face?",
        sentence_ja: "それは...わあ。正直今ちょっと脆い感じ。何年も閉じ込めてたものをこじ開けられたみたい。怖いのは分かってる、ただ...他の人にも見えてると思わなかった。そんなにバレバレ？顔に出てる？",
        idiom: "wear it on one's face",
        idiom_meaning: "show emotions visibly / 顔に出る・表情に出す"
    },
    {
        id: '_OAVi1qZ',
        speaker: "Rina",
        meaning: "電撃的な・衝撃の",
        sentence: "Master, that was GALVANIZING -- like a TED Talk but with oden and sake. I got goosebumps! Can I come here every week? I'll wash dishes, I'll do anything. This place has got some kinda magic, I can feel it in my bones. Seriously, what's your secret?",
        sentence_ja: "マスター、今の衝撃的だった -- おでんと酒のTEDトークみたい。鳥肌立った！毎週来ていい？皿洗いでもなんでもする。この場所なんか魔法がある、骨の髄まで感じる。マジで、秘密は何？",
        idiom: "feel it in one's bones",
        idiom_meaning: "sense something instinctively / 直感で感じる・骨の髄まで感じる"
    },
    {
        id: '_OBWj2rA',
        speaker: "Master Gondo",
        meaning: "格言・教訓",
        sentence: "Here's a maxim I've lived by for fifty years: the tongue learns what the heart permits. Your heart's got a wall around it right now, young lady. Tear it down brick by brick. Start with one sentence a day. Just one. That's all I ask.",
        sentence_ja: "50年守ってきた格言がある：舌は心が許したことを覚える。お嬢さん、君の心は今壁に囲まれてる。一つずつ崩しなさい。1日1文から始めなさい。たった1文。それだけでいい。",
        idiom: "brick by brick",
        idiom_meaning: "gradually, one step at a time / 一つずつ・少しずつ着実に"
    },

    // ========== DAY 4 (Mar 20) -- SMALL STEPS: Yuki tries ordering in English at Noren, stumbles but survives ==========
    {
        id: '_OCXk3sB',
        speaker: "Yuki",
        meaning: "不安定な・おぼつかない",
        sentence: "Okay, so... my English is still pretty precarious but... Master, could I... um... have another piece of that daikon? Please? ...Oh my god I actually said it. That was terrible but I SAID IT. My hands are shakin' but I don't even care right now.",
        sentence_ja: "えっと、その...私の英語はまだかなりおぼつかないけど...マスター、あの...大根もう一つ...もらえますか？...やだ実際に言えた。ひどかったけど言えた。手が震えてるけど今はどうでもいい。",
        idiom: "I don't even care",
        idiom_meaning: "expressing liberation from worry / もうどうでもいい（前向きな意味で）"
    },
    {
        id: '_ODYl4tC',
        speaker: "Master Gondo",
        meaning: "萌芽の・芽生え始めた",
        sentence: "There it is. That nascent little spark -- I saw it the moment you opened your mouth just now. Wasn't pretty, wasn't smooth, but it was real. Real beats perfect every single time. Remember that when the fear comes knockin' again. And it will knock again.",
        sentence_ja: "それだ。その芽生え始めた小さな火花 -- さっき口を開けた瞬間に見えた。綺麗じゃなかった、滑らかでもなかった、でも本物だった。本物は毎回完璧に勝つ。恐怖がまた叩きに来た時それを思い出しなさい。また来るから。",
        idiom: "come knocking",
        idiom_meaning: "arrive or appear, often unexpectedly / やって来る・訪れる"
    },
    {
        id: '_OEZm5uD',
        speaker: "Aya",
        meaning: "歓喜・大喜び",
        sentence: "YUKI! Oh my god, I'm literally burstin' with elation right now -- you DID it! That was your first voluntary English sentence to a stranger in like... ever? I'm so proud I could cry. Don't look at me like that, I'm ALLOWED to be emotional about this!",
        sentence_ja: "ゆき！やだ、もう歓喜で爆発しそう -- やったじゃん！見知らぬ人への初めての自発的英語文...史上初？嬉しすぎて泣きそう。そんな目で見ないで、感動していいでしょ！",
        idiom: "I could cry",
        idiom_meaning: "so moved emotionally / 感動で泣きそう"
    },
    {
        id: '_OFAn6vE',
        speaker: "Rina",
        meaning: "大げさな・仰々しい",
        sentence: "Okay Aya, that reaction was a LITTLE melodramatic -- she asked for daikon, not gave a UN speech. But also like... yeah, no, you're right, that was huge. Yuki-senpai, you're literally on the road to recovery and I'm HERE for it. Main character arc unlocked!",
        sentence_ja: "綾、そのリアクションちょっと大げさ -- 大根頼んだだけで国連スピーチしたわけじゃないから。でもまあ...うん、合ってる、あれデカかった。ゆき先輩、マジで回復の道の途中で、私は見届ける。主人公アーク解除！",
        idiom: "on the road to recovery",
        idiom_meaning: "in the process of getting better / 回復の途上・立ち直りかけている"
    },
    {
        id: '_OGBo7wF',
        speaker: "Master Gondo",
        meaning: "集大成・最高傑作",
        sentence: "Don't expect a magnum opus tomorrow -- language is a slow river, not a waterfall. Some nights you'll come in here and say nothin'. That's fine too. Showin' up is half the battle. The other half? Not runnin' away when it gets uncomfortable.",
        sentence_ja: "明日集大成を期待するな -- 言語はゆっくりした川で、滝じゃない。何も言えない夜もある。それでもいい。来ることが半分。残りの半分は？居心地悪くなった時に逃げないこと。",
        idiom: "showing up is half the battle",
        idiom_meaning: "just being present is a major part of success / 来るだけで半分成功"
    },
    {
        id: '_OHCp8xG',
        speaker: "Yuki",
        meaning: "感謝・ありがたさ",
        sentence: "I feel this... gratitude I can't really explain? Like, nobody's ever told me it's okay to be bad at somethin'. My whole life it's been 'study harder, score higher, don't mess up.' But you're sayin' messin' up IS the lesson? That's... honestly that's a game changer.",
        sentence_ja: "この...うまく説明できない感謝がある。何かが下手でも大丈夫だって誰にも言われたことなくて。ずっと「もっと勉強しろ、点数上げろ、失敗するな」だった。でも失敗が学びだって言うの？それ...正直ゲームチェンジャー。",
        idiom: "game changer",
        idiom_meaning: "something that fundamentally alters the situation / 状況を根本的に変えるもの"
    },
    {
        id: '_OICq9yH',
        speaker: "Aya",
        meaning: "転換点・変わり目",
        sentence: "This feels like a real inflection point for you, Yuki -- and I don't say that lightly. You've been white-knucklin' through English for years, and tonight you finally let go. Even just a little. That little is everything. Trust the process, okay? I've got your back.",
        sentence_ja: "ゆきにとって本当の転換点な気がする -- 軽く言ってないよ。何年も英語を必死に握りしめてきて、今夜やっと少し手を離した。その少しが全て。プロセスを信じて？私がついてる。",
        idiom: "I've got your back",
        idiom_meaning: "I'll support and protect you / 味方だよ・ついてるよ"
    },
    {
        id: '_OJDr0zI',
        speaker: "Rina",
        meaning: "雰囲気・空気感",
        sentence: "The ambience in here is seriously unmatched -- the steam from the oden, the warm light, the jazz playin' real low... I feel like I'm in a movie. Master, you ever thought about doin' Instagram? 'Cause this aesthetic would go viral in like two seconds flat.",
        sentence_ja: "ここの雰囲気マジで最強 -- おでんの湯気、暖かい光、小さく流れるジャズ...映画の中にいるみたい。マスター、インスタ考えたことある？この美学、2秒でバズるよ。",
        idiom: "go viral",
        idiom_meaning: "spread rapidly on the internet / バズる・ネットで爆発的に広まる"
    },
    {
        id: '_OKEs1AJ',
        speaker: "Master Gondo",
        meaning: "抵抗・反対",
        sentence: "I appreciate the sentiment but I have a strong aversion to puttin' this place on the internet. Noren has survived fifty-two years by bein' quiet. The right people find it. Like you three found it tonight. Some things are better left as hidden gems.",
        sentence_ja: "気持ちはありがたいがこの場所をネットに載せることには強い抵抗がある。のれんは52年間静かにして生き延びた。正しい人が見つける。今夜君たちが見つけたように。隠れた名店のままがいいものもある。",
        idiom: "hidden gem",
        idiom_meaning: "an excellent but little-known place or thing / 隠れた名店・知る人ぞ知る逸品"
    },

    // ========== DAY 5 (Mar 21) -- FIRST VOLUNTARY ENGLISH: Yuki speaks to a foreign customer on her own ==========
    {
        id: '_OLFt2BK',
        speaker: "Yuki",
        meaning: "決定的な・運命を左右する",
        sentence: "Today felt... pivotal somehow. A French couple came into the cafe and I just... walked up to 'em. Heart poundin', palms sweaty, the whole nine yards. But I did it. I said 'Welcome, what can I get for you?' and they UNDERSTOOD. They actually smiled at me.",
        sentence_ja: "今日は...なんか運命を左右する感じだった。フランス人カップルがカフェに来て私は...自分から近づいた。心臓バクバク、手汗びっしょり、全部。でもやった。「いらっしゃいませ、何にしますか」って言ったら通じた。本当に笑ってくれた。",
        idiom: "the whole nine yards",
        idiom_meaning: "everything / the full extent / 全部・あらゆること"
    },
    {
        id: '_OMGu3CL',
        speaker: "Aya",
        meaning: "鳥肌が立つ",
        sentence: "I literally got goosebumps watchin' you from behind the espresso machine -- like full-body chills. You didn't even look at me for backup. You just went for it. That's the Yuki I KNOW is in there. She's been hidin' but she's comin' out now. No turnin' back.",
        sentence_ja: "エスプレッソマシンの後ろから見てて鳥肌立った -- 全身ゾクゾク。助けを求めてこっち見もしなかった。ただ行った。それが私の知ってるゆき。隠れてたけどもう出てきてる。もう後戻りなし。",
        idiom: "no turning back",
        idiom_meaning: "past the point of return / もう後戻りはない"
    },
    {
        id: '_ONHv4DM',
        speaker: "Rina",
        meaning: "変貌・大変身",
        sentence: "Okay the metamorphosis is REAL -- four days ago you were givin' people hot water instead of oat milk and now you're out here takin' orders like a boss? Character development! I'm screenshottin' this moment in my brain. Yuki-senpai redemption arc, episode one!",
        sentence_ja: "変貌がガチだ -- 4日前はオーツミルクの代わりにお湯出してたのに今は堂々と注文取ってる？キャラクター成長！この瞬間を脳内スクショする。ゆき先輩リデンプションアーク、エピソード1！",
        idiom: "like a boss",
        idiom_meaning: "with confidence and authority / 堂々と・カッコよく"
    },
    {
        id: '_OOIw5EN',
        speaker: "Foreign Customer",
        meaning: "歓待・おもてなし",
        sentence: "The hospitality here is just... wow. That girl at the counter was so sweet -- she was a little nervous but honestly that made it MORE charming, y'know? You could tell she was really tryin'. That's the kinda thing that makes Japan special. Genuine effort, genuine warmth.",
        sentence_ja: "ここのおもてなしは...わお。カウンターの女の子めっちゃ優しかった -- ちょっと緊張してたけど正直それがもっと魅力的だった。本当に頑張ってるのが伝わった。日本を特別にしてるのはそういうこと。本物の努力、本物の温かさ。",
        idiom: "the kind of thing",
        idiom_meaning: "the type of quality or action that defines something / そういうところ・まさにそういうこと"
    },
    {
        id: '_OPJx6FO',
        speaker: "Master Gondo",
        meaning: "証・証拠",
        sentence: "What happened today is testament to what I told you -- one sentence becomes two, two becomes a conversation, a conversation becomes a life. You spoke because you chose to, not because you had to. That's the only English lesson worth learnin'.",
        sentence_ja: "今日起きたことが私の言った証だ -- 1文が2文になり、2文が会話になり、会話が人生になる。話したのは話さなきゃいけなかったからじゃない、話したいと思ったからだ。それが唯一学ぶ価値のある英語の授業だ。",
        idiom: "worth learning",
        idiom_meaning: "valuable enough to invest time in / 学ぶ価値がある"
    },
    {
        id: '_OQKy7GP',
        speaker: "Yuki",
        meaning: "感慨深い・胸がいっぱいの",
        sentence: "I'm feelin' all sentimental and I HATE it -- but also... thank you? Both of you, and Master. I've been runnin' from this for so long and you all just... wouldn't let me. I'm not fixed or anything, I know that. But I took a step. One real step. That counts, right?",
        sentence_ja: "感慨深くなっちゃってそれが嫌なんだけど -- でも...ありがとう？二人とも、マスターも。ずっと逃げてたのにみんなが...逃がしてくれなかった。治ったとかじゃないのは分かってる。でも一歩踏み出した。本物の一歩。それって価値ある、よね？",
        idiom: "that counts",
        idiom_meaning: "that matters / has value / それには価値がある・意味がある"
    },
    {
        id: '_ORLz8HQ',
        speaker: "Aya",
        meaning: "揺るぎない・確固たる",
        sentence: "That counts more than you know, Yuki. And I want you to have unwavering faith in one thing -- you're not alone in this anymore. Monday you froze, Friday you flew. That's not nothin'. That's everything. We're comin' back to Noren next week, yeah? No excuses.",
        sentence_ja: "思ってる以上に価値があるよ、ゆき。一つだけ揺るぎない信念を持ってほしい -- もうこれは一人じゃない。月曜に固まって、金曜に飛んだ。それはたいしたことないんじゃない。全てだよ。来週ものれんに来るよね？言い訳なし。",
        idiom: "no excuses",
        idiom_meaning: "absolutely, without exception / 言い訳なし・絶対に"
    },
    {
        id: '_OSM09IR',
        speaker: "Rina",
        meaning: "前兆・予感",
        sentence: "I got this premonition that Yuki-senpai's gonna be the one trainin' new baristas in English by summer -- callin' it now! You heard it here first, folks. And when it happens, I want full credit for draggin' her to Noren. Put it on the record!",
        sentence_ja: "ゆき先輩が夏までに新人バリスタに英語教えてるっていう予感がある -- 今宣言する！ここで初めて聞いたよね皆さん。そうなったら、のれんに引っ張ってった功績は全部私のもの。記録に残して！",
        idiom: "put it on the record",
        idiom_meaning: "officially state something for future reference / 記録に残す・公式に宣言する"
    },
    {
        id: '_OTN10JS',
        speaker: "Master Gondo",
        meaning: "遺産・受け継がれるもの",
        sentence: "My legacy won't be TOEIC scores or perfect grammar -- it'll be the people who walked through that curtain scared and walked out brave. You three remind me why I've kept this place open all these years. Come back. The oden will be waitin'.",
        sentence_ja: "私の遺産はTOEICのスコアや完璧な文法じゃない -- あの暖簾を怖がってくぐって、勇気を持って出ていった人たちだ。君たち三人がこの店を何年も開け続けてきた理由を思い出させてくれた。また来なさい。おでんが待ってる。",
        idiom: "walked out brave",
        idiom_meaning: "left with courage gained from the experience / 勇気を得て去った"
    },
    {
        id: '_OUO21KT',
        speaker: "Aya",
        meaning: "節目・画期的出来事",
        sentence: "You know what? This whole week's been a real milestone for all three of us, not just Yuki. I learned that my English isn't just for showin' off -- it's for liftin' people up. That feels way better than any compliment on my accent ever did. Hands down.",
        sentence_ja: "ねえ、今週は三人全員にとって節目だった、ゆきだけじゃなくて。私の英語は見せびらかすためじゃなくて人を持ち上げるためにあるって分かった。アクセント褒められるよりずっといい気分。断然。",
        idiom: "hands down",
        idiom_meaning: "without question / easily the best / 断然・文句なしに"
    },
    {
        id: '_OVP32LU',
        speaker: "Rina",
        meaning: "連帯感・仲間意識",
        sentence: "I feel this camaraderie between us three that wasn't there on Monday -- like we're a squad now, an English squad. Yuki-senpai's the heart, Aya's the brain, and I'm the chaos. Every good team needs chaos, don't even argue with me on that one!",
        sentence_ja: "月曜にはなかった連帯感を三人の間に感じる -- チームになったみたい、英語チーム。ゆき先輩がハート、綾が頭脳、で私がカオス。いいチームにはカオスが必要、それについては議論しないで！",
        idiom: "don't even argue",
        idiom_meaning: "I'm so right that debate is pointless / 議論の余地なし・反論無用"
    },
    {
        id: '_OWQ43MV',
        speaker: "Yuki",
        meaning: "再生・生まれ変わり",
        sentence: "Walking home tonight, the city looks... different? Like maybe this is some kinda rebirth for me, or maybe I'm just tipsy from Master's sake. Either way, I'm comin' back to Noren next Wednesday. And the Wednesday after that. I'm not done yet. Not even close.",
        sentence_ja: "今夜歩いて帰ると、街が...違って見える？これが何かの再生なのか、マスターの酒で酔ってるだけなのか。どっちにしろ、来週の水曜ものれんに行く。その次の水曜も。まだ終わってない。全然。",
        idiom: "not even close",
        idiom_meaning: "far from finished or done / 全然まだ・程遠い"
    },
];

// ============================================================
// Seeder
// ============================================================
async function seedDay47() {
    console.log('Seeding Day 047 -- Tokyo 52 Ep1 (words 750-799)...');
    let success = 0;
    let failed = 0;
    let meaningFixed = 0;

    for (const item of DAY47_DATA) {
        try {
            // PATCH review data
            const res = await fetch(`https://iwasaki-naisou.com/api/user-phrases/${item.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    review_sentence: item.sentence,
                    review_sentence_ja: item.sentence_ja,
                    review_idiom: item.idiom,
                    review_idiom_meaning: item.idiom_meaning,
                }),
            });
            const data = await res.json();
            if (data.success) {
                success++;
                console.log(`  OK: [${item.speaker}] ${item.id} ${item.idiom}`);
            } else {
                failed++;
                console.log(`  FAIL: ${item.id} - ${JSON.stringify(data)}`);
            }

            // PUT meaning fix
            if (item.meaning) {
                const mRes = await fetch(`https://iwasaki-naisou.com/api/user-phrases/${item.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ meaning: item.meaning }),
                });
                const mData = await mRes.json();
                if (mData.success) {
                    meaningFixed++;
                }
            }
        } catch (err) {
            failed++;
            console.log(`  ERROR: ${item.id} - ${err.message}`);
        }
    }

    console.log(`\nDone! Review: ${success}/50, Meanings fixed: ${meaningFixed}`);
}

seedDay47();
