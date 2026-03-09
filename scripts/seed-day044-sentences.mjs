// Seed Day 044 (words 600-649) -- Mar 2 - Mar 6
// Day 044: Antiques House Call (骨董鑑定パニック -- 遺品整理)
// ALL sentences are SPOKEN DIALOGUE -- actual things people say out loud
// g-dropping (70-80%), grammar breaking, fillers, real spoken English
// Characters: Uncle Ray(58M, Antiques Roadshow superfan, dramatic gasps, puts price on everything),
//   Nadia(30F, organized, pragmatic, wants to donate 90%),
//   Dex(27M, ex-croupier, gambler energy, finds humor in everything),
//   Aunt Margot(62F, sentimental, cries at old photos, "Ida would have wanted..."),
//   Cody(17M, misophonia, headphones on, brutally honest, zero patience),
//   Pearl(85F, Ida's neighbor 40 years, knows where everything is, savage one-liners)
// Story: 5-day arc. Day 1: Arrival, opening garage, first reactions to the hoard.
//   Day 2: Sorting begins, Ray's appraisals, Margot's photo meltdowns.
//   Day 3: Dex finds lockbox, family secrets, Pearl drops bombs.
//   Day 4: Arguments over keep/sell/donate, Ray vs Nadia showdown.
//   Day 5: Resolution, unexpected treasure, family closer.

const DAY44_DATA = [
    // ========== DAY 1 (Mar 2) -- ARRIVAL ==========
    {
        id: 'Q82-4jb5', // flapjack
        speaker: "Margot",
        meaning: "パンケーキ・ホットケーキ",
        sentence: "Ida used to make flapjacks every Sunday mornin' for the whole block -- I'm not gonna sugarcoat it, walkin' into this kitchen without smellin' butter is just... it's hittin' me harder than I thought.",
        sentence_ja: "イーダは毎週日曜の朝、近所中にパンケーキ焼いてたの -- 取り繕うつもりはないんだけど、バターの匂いがしないこのキッチンに入るのは...思ってたより堪えるわ。",
        idiom: "the early bird catches the worm",
        idiom_meaning: "those who act first get the advantage / 早起きは三文の得"
    },
    {
        id: 'HZTRjj37', // A knob of butter
        speaker: "Pearl",
        meaning: "バターのかたまり（ひとかけ）",
        sentence: "A knob of butter, that's all Ida ever used. One knob. Rest of you people drownin' everything in oil like you're deep-fryin' your whole life. She had it down to a fine art, cookin' with next to nothin'.",
        sentence_ja: "バターひとかけ、イーダはいつもそれだけだった。ひとかけだけ。あんたらは何でも油漬けにして人生ごと揚げ物にしてるみたいだけど。あの子は最小限で料理するのを極めてたの。",
        idiom: "down to a fine art",
        idiom_meaning: "perfected through practice / 完璧に極めている"
    },
    {
        id: 'x2ax-_O1', // pineal (pineal gland)
        speaker: "Dex",
        meaning: "松果体",
        sentence: "Ray's over here talkin' about how some crystal activates your pineal gland and I'm like, man, you're barkin' mad if you think Grandma kept that thing for spiritual reasons. She probably used it as a doorstop.",
        sentence_ja: "レイがそこで水晶が松果体を活性化するとか言ってて、いやおっさん頭おかしいだろ、ばあちゃんがスピリチュアルな理由であれ持ってたと思ってんの。たぶんドアストッパーにしてたよ。",
        idiom: "barking mad",
        idiom_meaning: "completely crazy / 完全に頭がおかしい"
    },
    {
        id: 'xfRlrLXz', // 2nd draft
        speaker: "Nadia",
        meaning: "第2稿・2回目の書き直し",
        sentence: "OK so I made a 2nd draft of the sorting plan -- keep, sell, donate, trash. Four piles. It's not rocket science, people. Can we please just stick to the system?",
        sentence_ja: "で、仕分け計画の第2稿作ったから -- 残す、売る、寄付、捨てる。4つの山。難しい話じゃないでしょ。お願いだからこのシステムに従って？",
        idiom: "it's not rocket science",
        idiom_meaning: "it's not complicated / そんな難しい話じゃない"
    },
    {
        id: 'KWjwLIW3', // name of the game
        speaker: "Ray",
        meaning: "最も重要なこと・肝心なところ",
        sentence: "Efficiency is the name of the game here, but -- *gasp* -- is that a Hummel figurine?! Hold on, hold on. These go for hundreds. You can't just toss this. This is a needle in a haystack situation, people!",
        sentence_ja: "効率が一番大事なんだけど -- *息を飲む* -- あれハンメル人形じゃない？！ちょっと待って。これ何百ドルもするのよ。ポイって捨てちゃダメ。砂の中のダイヤモンドだよこれは！",
        idiom: "a needle in a haystack",
        idiom_meaning: "extremely hard to find / 干し草の中の針（見つけるのが困難）"
    },
    {
        id: '6Es5TTz_', // sideswipe
        speaker: "Cody",
        meaning: "横からぶつける・かすめる",
        sentence: "Uncle Ray literally sideswipped the mailbox pullin' in. Like, the driveway is twenty feet wide. How. I'm just gonna turn a deaf ear to him explainin' how it wasn't his fault 'cause I can't deal right now.",
        sentence_ja: "レイおじさんマジで入ってくる時にポスト擦った。車道6メートルあるのに。どうやって。今から自分のせいじゃないって説明始めるんだろうけど聞こえないフリするわ。無理。",
        idiom: "turn a deaf ear",
        idiom_meaning: "deliberately ignore / 聞こえないフリをする"
    },
    {
        id: '-Db5qGGs', // a watched pot never boils
        speaker: "Pearl",
        meaning: "見てる鍋は沸かない（待ってると遅く感じる）",
        sentence: "You kids standin' in the doorway starin' at all this junk -- a watched pot never boils, so quit gawkin' and start movin' boxes. Ida had sixty years of stuff in here and it ain't gonna sort itself.",
        sentence_ja: "あんたら入口に突っ立ってガラクタ眺めてるけど -- 見てるだけじゃ何も始まらないんだから、ボーっとしてないで箱動かしな。イーダの60年分の荷物は勝手に片付かないよ。",
        idiom: "get the green light",
        idiom_meaning: "receive permission to proceed / ゴーサインをもらう"
    },
    {
        id: '8d4XZngV', // A for effort
        speaker: "Pearl",
        meaning: "努力は認める（結果はともかく）",
        sentence: "Nadia, honey, I'll give you an A for effort with that clipboard, but Ida's garage is a whole different beast. I've been her neighbor forty years and even I don't know what's in half those boxes. You're gonna have a bone to pick with gravity once those top shelves come down.",
        sentence_ja: "ナディア、あんた、そのクリップボード持ってる努力は認めるけど、イーダのガレージは別物よ。40年隣に住んでても箱の半分は中身知らないし。上の棚下ろしたら重力と喧嘩になるわよ。",
        idiom: "have a bone to pick",
        idiom_meaning: "have a complaint to discuss / 文句がある"
    },
    {
        id: 'n7ZdCira', // flying blind
        speaker: "Dex",
        meaning: "手探りでやる・情報なしで進む",
        sentence: "We're basically flyin' blind here -- nobody knows what's worth money and what's actual trash. Ray thinks everything's an antique and Nadia thinks everything's garbage. I say we let the chips fall where they may and just open boxes.",
        sentence_ja: "ここ完全に手探りだよ -- 何に価値があって何がガチのゴミか誰も分かんない。レイは全部アンティークだと思ってるしナディアは全部ゴミだと思ってる。なるようになれで箱開けようぜ。",
        idiom: "let the chips fall where they may",
        idiom_meaning: "accept whatever happens / なるようになれ"
    },
    {
        id: '21lM6le1', // misophonia
        speaker: "Cody",
        meaning: "ミソフォニア（音嫌悪症）",
        sentence: "Can somebody PLEASE tell Aunt Margot to stop crinklin' that newspaper? I got misophonia and she's over there wrappin' stuff like it's Christmas. I'm at the end of my rope here, I swear I'm gonna lose it.",
        sentence_ja: "誰かマーゴットおばさんにその新聞紙カシャカシャするのやめてって言って？ミソフォニアなんだけど。クリスマスかってくらい包んでるし。マジで限界、もう無理。",
        idiom: "at the end of one's rope",
        idiom_meaning: "completely out of patience / 我慢の限界"
    },

    // ========== DAY 2 (Mar 3) -- SORTING BEGINS ==========
    {
        id: '8Y25REnf', // Chardonnay
        speaker: "Margot",
        meaning: "シャルドネ（白ワインの品種）",
        sentence: "I found six bottles of Chardonnay in the back closet -- Ida was savin' these for somethin' special, I just know it. Ida would have wanted us to open one right now... oh, I'm gettin' all choked up again.",
        sentence_ja: "奥のクローゼットからシャルドネ6本見つけた -- イーダ何か特別な時のために取っておいてたのよ、絶対。イーダなら今すぐ開けようって言ったはず...あぁ、また泣きそう。",
        idiom: "get choked up",
        idiom_meaning: "become too emotional to speak / 感極まって声が詰まる"
    },
    {
        id: 'k0u0gzEx', // borrow money against
        speaker: "Ray",
        meaning: "～を担保にお金を借りる",
        sentence: "You know Ida could've borrowed money against this house years ago, but she never did. Woman had principles. Honestly this whole collection could be worth a small fortune -- I'm not just whistlin' Dixie here, I've seen stuff like this on the show.",
        sentence_ja: "イーダはこの家を担保に何年も前にお金借りられたのに、しなかった。信念のある女性だったよ。正直このコレクション全部でかなりの額になるかも -- 冗談じゃないよ、番組でこういうの見たことある。",
        idiom: "whistling Dixie",
        idiom_meaning: "talking nonsense or being unrealistic / でたらめを言う"
    },
    {
        id: 'INvAxa3D', // capable hands
        speaker: "Nadia",
        meaning: "有能な手・任せられる人",
        sentence: "Look, Grandma's stuff is in capable hands, OK? I've been doin' estate organization for clients for three years. But Ray keeps pullin' things outa my donate pile and it's like -- can you stop movin' the cheese? We had a system.",
        sentence_ja: "ねえ、おばあちゃんの物はちゃんとした人が管理してるから、OK？3年間クライアントの遺品整理やってきたの。でもレイが寄付の山から勝手に物取り出して -- ルール変えるのやめてくれない？システムあったでしょ。",
        idiom: "move the cheese",
        idiom_meaning: "change the rules or situation unexpectedly / 状況やルールを勝手に変える"
    },
    {
        id: '__E6DdFX', // Rob Peter to pay Paul
        speaker: "Dex",
        meaning: "あちらを立てればこちらが立たず",
        sentence: "Margot wants to keep everything, Nadia wants to donate everything -- we're basically robbin' Peter to pay Paul tryin' to make both of em happy. I say we just go Dutch on a storage unit and deal with it later.",
        sentence_ja: "マーゴットは全部取っときたい、ナディアは全部寄付したい -- 両方を満足させようとしたらあっちを立てればこっちが立たない。いっそ割り勘でトランクルーム借りて後で考えようぜ。",
        idiom: "go Dutch",
        idiom_meaning: "split the cost equally / 割り勘にする"
    },
    {
        id: '__Rw1rH8', // hold out on
        speaker: "Pearl",
        meaning: "隠す・教えない・出し渋る",
        sentence: "Ray, you been holdin' out on us? I saw you slip that little jewelry box into your coat pocket. Don't play innocent with me, boy. I wasn't born yesterday, and I got eyes like a hawk even at eighty-five.",
        sentence_ja: "レイ、あんた何か隠してるでしょ？あの小さい宝石箱コートのポケットに入れたの見えたよ。しらばっくれんじゃないよ。85でもまだ目は鷹みたいに利くんだからね。",
        idiom: "wasn't born yesterday",
        idiom_meaning: "not naive or easily fooled / そう簡単には騙されない"
    },
    {
        id: '__sp43zP', // Agastya
        speaker: "Ray",
        meaning: "アガスティヤ（インドの聖者・星の名前）",
        sentence: "This book is about Agastya, some ancient Indian sage -- and look at the binding, the gilding! I bet this is worth at least-- Nadia, don't you DARE put that in the donate box. That's the golden goose right there.",
        sentence_ja: "この本はアガスティヤ、古代インドの聖者についてで -- この装丁見てよ、金箔！少なくとも-- ナディア、それを寄付ボックスに入れるなよ絶対。これが金の卵を産むガチョウだよ。",
        idiom: "the golden goose",
        idiom_meaning: "a valuable source of income / 金の卵を産むガチョウ"
    },
    {
        id: '_-2AriqU', // living dead / organized chaos
        speaker: "Nadia",
        meaning: "生ける屍・整理された混沌",
        sentence: "This garage is organized chaos at best and a livin' dead zone at worst. I've been at this since seven AM and I feel like I'm just rearrangin' deck chairs on the Titanic -- nothin's actually gettin' sorted.",
        sentence_ja: "このガレージは良く言って整理された混沌、悪く言ったら死んだゾーン。朝7時からやってるのにタイタニックで椅子並べ替えてる気分 -- 実際には何も片付いてない。",
        idiom: "rearranging deck chairs on the Titanic",
        idiom_meaning: "doing something pointless while disaster looms / 焼け石に水"
    },
    {
        id: '_-dGC20Z', // prenup
        speaker: "Dex",
        meaning: "婚前契約",
        sentence: "Found a prenup draft in Grandma's desk drawer -- dated 1974. Guess Grandpa wanted to cover his bases. Never got signed though. Margot, don't look at me like that, I didn't write the thing, I just opened the drawer.",
        sentence_ja: "おばあちゃんの机の引き出しから婚前契約の草案見つけた -- 1974年の日付。じいちゃん用心したかったんだな。でも署名されてない。マーゴット、そんな顔で見んなよ、俺が書いたんじゃないし、引き出し開けただけだって。",
        idiom: "cover one's bases",
        idiom_meaning: "prepare for all possibilities / あらゆる事態に備える"
    },
    {
        id: '_-TINPwb', // microphone
        speaker: "Cody",
        meaning: "マイク・マイクロフォン",
        sentence: "Ray found an old microphone in a box and now he's doin' an Antiques Roadshow impression. Somebody pull the rug out from under him before he starts appraisin' the toilet. I literally cannot take this anymore.",
        sentence_ja: "レイが箱から古いマイク見つけて今アンティークロードショーのモノマネしてる。トイレの鑑定始める前に誰か止めて。マジでもう無理。",
        idiom: "pull the rug out from under someone",
        idiom_meaning: "suddenly remove support / 足元をすくう"
    },
    {
        id: '_-woU2zL', // efficacy
        speaker: "Nadia",
        meaning: "有効性・効き目",
        sentence: "I'm questionin' the efficacy of havin' six people sort one garage when half of em are cryin' and the other half are playin' dress-up with Grandma's hats. Can we please get our act together? Time is money.",
        sentence_ja: "6人でガレージ1つ片付ける有効性を疑ってるんだけど、半分泣いてて残り半分がおばあちゃんの帽子でファッションショーしてるし。ちゃんとしてくれない？時は金なりだよ。",
        idiom: "time is money",
        idiom_meaning: "don't waste time / 時は金なり"
    },

    // ========== DAY 3 (Mar 4) -- SECRETS SURFACE ==========
    {
        id: '_02pCImy', // eye dotting
        speaker: "Ray",
        meaning: "細部の仕上げ・最終チェック（i に点を打つ）",
        sentence: "I'm doin' the eye dotting on this inventory list -- every piece cataloged, photographed, estimated. It's tedious but you gotta dot your i's and cross your t's. And honestly, this Victorian brooch? Dead ringer for one I saw sell for two grand.",
        sentence_ja: "この在庫リストの最終チェックしてる -- 全部カタログ化して、写真撮って、見積もり出して。面倒だけどちゃんと最後まで仕上げないと。正直このヴィクトリア朝のブローチ？2千ドルで売れたやつにそっくり。",
        idiom: "dead ringer",
        idiom_meaning: "exact lookalike / 瓜二つ・そっくり"
    },
    {
        id: '_0EVg8HD', // wild card
        speaker: "Pearl",
        meaning: "予測不能な要素・ワイルドカード",
        sentence: "Dex is the wild card in this family -- always has been. Reminds me of your grandfather, actually. That man could sell ice to Eskimos and charm the pants off a nun. Apple doesn't fall far, I suppose.",
        sentence_ja: "デックスはこの家族の予測不能な存在 -- 昔からそう。実はおじいちゃんにそっくりなの。あの人はエスキモーに氷を売れるような人で、尼さんも魅了しちゃうタイプだった。蛙の子は蛙ね。",
        idiom: "sell ice to Eskimos",
        idiom_meaning: "extremely persuasive / 口が上手い"
    },
    {
        id: '_0gh86U-', // zest (enthusiasm)
        speaker: "Margot",
        meaning: "熱意・情熱",
        sentence: "Ida had such zest for collectin' things -- she'd go to every flea market, every yard sale. I remember she drove three hours for a teapot once. That woman had a one-track mind when she wanted somethin'.",
        sentence_ja: "イーダは物を集めることにすごい情熱があって -- フリマも、ヤードセールも全部行ってた。一回ティーポットのために3時間運転したの覚えてる。あの人欲しいものがあると一直線だった。",
        idiom: "a one-track mind",
        idiom_meaning: "focused on only one thing / 一つのことしか頭にない"
    },
    {
        id: '_0qGREVn', // tusk
        speaker: "Dex",
        meaning: "牙（象・セイウチなど）",
        sentence: "Yo, is this an actual tusk? Like, from an elephant? This could be worth a fortune or it could get us arrested, I dunno. Talk about openin' Pandora's box -- we shoulda left that crate shut.",
        sentence_ja: "おい、これ本物の牙？象の？大金になるか逮捕されるかどっちかだな、分かんないけど。まさにパンドラの箱開けちゃったよ -- あの木箱開けるべきじゃなかった。",
        idiom: "open Pandora's box",
        idiom_meaning: "start something that causes many problems / パンドラの箱を開ける"
    },
    {
        id: '_0QQ5T2i', // croupier
        speaker: "Dex",
        meaning: "クルーピエ（カジノのディーラー）",
        sentence: "Y'all keep actin' like sortin' Grandma's stuff is torture, but try bein' a croupier at a Vegas table for twelve hours straight. THAT'S torture. This? This is a walk in the park compared to dealin' blackjack to drunk tourists.",
        sentence_ja: "みんなおばあちゃんの物の仕分けが拷問みたいに言ってるけど、ベガスのテーブルで12時間クルーピエやってみ？あれが拷問。これ？酔っ払い観光客にブラックジャック配るのと比べたら朝飯前だよ。",
        idiom: "a walk in the park",
        idiom_meaning: "something very easy / 朝飯前"
    },
    {
        id: '_0VZPP1b', // twenty-four seven
        speaker: "Nadia",
        meaning: "24時間年中無休・いつも",
        sentence: "Margot's been cryin' twenty-four seven since we started. I love her but we can't stop every five minutes for a tissue break. I don't wanna be the bad guy here but somebody's gotta crack the whip or we'll be here til Christmas.",
        sentence_ja: "マーゴットが始めてからずっと泣いてる。大好きだけど5分ごとにティッシュ休憩してたら終わんない。悪者になりたくないけど誰かが厳しくしないとクリスマスまでかかるよ。",
        idiom: "crack the whip",
        idiom_meaning: "enforce discipline strictly / ムチを振るう・厳しく管理する"
    },
    {
        id: '_0wE_dxq', // equine
        speaker: "Ray",
        meaning: "馬の・馬に関する",
        sentence: "This equine painting -- look at the brushwork! This could be from the 1800s. I'm tellin' you, don't look a gift horse in the mouth, Nadia. Your grandmother may have been sittin' on a goldmine this whole time.",
        sentence_ja: "この馬の絵 -- 筆遣い見てよ！1800年代のかもしれない。ナディア、もらいものに文句つけるなよ。おばあちゃん知らないうちに宝の山の上に座ってたかもしれないんだぞ。",
        idiom: "don't look a gift horse in the mouth",
        idiom_meaning: "don't question a gift's value / もらいものに文句を言うな"
    },
    {
        id: '_18cb4_R', // clubfoot
        speaker: "Pearl",
        meaning: "内反足（先天性の足の変形）",
        sentence: "Ida's first husband -- before your grandfather -- had a clubfoot. Nobody talks about him. Family swept that whole marriage under the carpet. But I got the receipts, honey. I was there for ALL of it.",
        sentence_ja: "イーダの最初の旦那 -- おじいちゃんの前の人 -- 内反足だったの。誰もあの人の話しないけど。家族はあの結婚全部なかったことにした。でも私は証拠持ってるわよ。全部見てたから。",
        idiom: "sweep under the carpet",
        idiom_meaning: "hide something embarrassing / 臭いものに蓋をする"
    },
    {
        id: '_19bqBah', // hind brain (fore brain, midbrain)
        speaker: "Cody",
        meaning: "後脳（前脳、中脳）",
        sentence: "My hind brain is screamin' at me to just leave. Like, the part of my brain that controls fight or flight is full-on choosin' flight right now. This family drama is above my pay grade and I didn't even sign up for this.",
        sentence_ja: "後脳が「逃げろ」って叫んでる。闘うか逃げるかの部分が完全に逃げ選んでる。この家族のドラマは俺の給料等級じゃ対応できないし、そもそも志願してないし。",
        idiom: "above one's pay grade",
        idiom_meaning: "beyond one's level of responsibility / 自分の担当レベルを超えている"
    },
    {
        id: '_1bzGevx', // windowsill
        speaker: "Margot",
        meaning: "窓の桟（さん）・窓台",
        sentence: "There's still a coffee ring on this windowsill from Ida's mug... she'd sit right here every mornin' watchin' the birds. I'm sorry, I know I keep gettin' weepy, but these little things just tug at my heartstrings somethin' awful.",
        sentence_ja: "この窓台にまだイーダのマグカップの跡が...毎朝ここに座って鳥を見てたの。ごめんね、また泣きそうになってるの分かってるけど、こういう小さいことが本当に胸を締め付けて。",
        idiom: "tug at one's heartstrings",
        idiom_meaning: "cause strong emotions / 胸を締め付ける"
    },

    // ========== DAY 4 (Mar 5) -- THE SHOWDOWN ==========
    {
        id: '_1lGJRCD', // holiday break
        speaker: "Cody",
        meaning: "休暇・連休",
        sentence: "I was supposed to be on holiday break right now, playin' video games, doin' nothin'. Instead I'm carryin' boxes of dead lady's porcelain dolls. No offense, Grandma. But this is the straw that broke the camel's back -- I'm takin' a break.",
        sentence_ja: "今頃休みでゲームして何もしないはずだったのに。代わりに死んだおばあちゃんの陶器人形の箱運んでる。おばあちゃんごめん。でもこれが我慢の限界 -- 休憩する。",
        idiom: "the straw that broke the camel's back",
        idiom_meaning: "the final thing that causes collapse / 我慢の限界を超えた最後の一撃"
    },
    {
        id: '_1mcHdV2', // braggadocio
        speaker: "Nadia",
        meaning: "大言壮語・自慢話",
        sentence: "Ray, enough with the braggadocio about how you 'know antiques.' You watched a TV show. That's it. You don't have a leg to stand on when it comes to actual appraisals, and I'm tired of pretendin' you do.",
        sentence_ja: "レイ、「アンティーク分かる」っていう大言壮語やめて。テレビ見ただけでしょ。それだけ。実際の鑑定に関してはあんたの言い分には根拠がないの、そのフリするのもう疲れた。",
        idiom: "don't have a leg to stand on",
        idiom_meaning: "have no valid argument / 根拠がない"
    },
    {
        id: '_1QSwI8u', // outa (out of)
        speaker: "Dex",
        meaning: "〜から（out ofのくだけた形）",
        sentence: "I'm outa patience with this whole thing. Nadia and Ray been goin' at it for two hours straight about a lamp. A LAMP. I feel like I'm caught between the devil and the deep blue sea here -- pick a side and somebody hates you.",
        sentence_ja: "この件で忍耐力もう切れた。ナディアとレイがランプについて2時間ぶっ通しで言い合ってる。ランプだよ。進退窮まった感じ -- どっちについても誰かに嫌われる。",
        idiom: "between the devil and the deep blue sea",
        idiom_meaning: "caught between two bad options / 前門の虎後門の狼"
    },
    {
        id: '_2LQGV6y', // pule (cry weakly)
        speaker: "Cody",
        meaning: "めそめそ泣く・弱々しく泣く",
        sentence: "Margot's startin' to pule again over a shoebox of old letters. Every single time. I know I sound heartless but somebody's gotta call a spade a spade -- we're never gonna finish if we cry over every piece of paper.",
        sentence_ja: "マーゴットがまた古い手紙の靴箱でめそめそ泣き始めた。毎回これ。冷たく聞こえるの分かるけど誰かがはっきり言わないと -- 紙切れ一枚で泣いてたら一生終わんないよ。",
        idiom: "call a spade a spade",
        idiom_meaning: "speak bluntly and honestly / ズバリ言う"
    },
    {
        id: '_2LYTNFF', // high octane
        speaker: "Dex",
        meaning: "ハイオク・エネルギッシュな",
        sentence: "This argument is gettin' real high octane right now. Ray's red in the face, Nadia's got her clipboard out like a weapon. I'm just sittin' here eatin' popcorn figuratively 'cause honestly this family's dirty laundry is better than Netflix.",
        sentence_ja: "この言い合いマジでヒートアップしてきた。レイは顔真っ赤、ナディアはクリップボードを武器みたいに構えてる。俺はポップコーン食いながら見てる感じ。正直この家族の内輪もめはネトフリより面白い。",
        idiom: "air one's dirty laundry",
        idiom_meaning: "expose private matters publicly / 内輪の恥をさらす"
    },
    {
        id: '_2Nt0WdG', // make-believe
        speaker: "Margot",
        meaning: "ごっこ遊び・空想",
        sentence: "When we were little, Ida turned this whole attic into a make-believe castle for us. Nadia, you played here too, don't you remember? I know you're tryin' to put your best foot forward with this project but please... some things are priceless.",
        sentence_ja: "私たちが小さい時、イーダがこの屋根裏全部をお城のごっこ遊び場にしてくれたの。ナディアもここで遊んだでしょ、覚えてない？このプロジェクトで頑張ろうとしてるの分かるけど...値段つけられないものもあるのよ。",
        idiom: "put one's best foot forward",
        idiom_meaning: "make the best impression / 全力を尽くす"
    },
    {
        id: '_2RFEumN', // smug
        speaker: "Nadia",
        meaning: "独りよがりな・自己満足な・ドヤ顔",
        sentence: "Ray's sittin' there all smug 'cause he found ONE thing that might be worth somethin'. One thing outa thousands. I'm sorry but that's like findin' a four-leaf clover and thinkin' you're a botanist. Get over yourself.",
        sentence_ja: "レイが何か一個だけ値打ちあるかもしれない物見つけたからってドヤ顔してる。何千個の中の一個だよ。ごめんだけど四つ葉のクローバー見つけて植物学者気取りしてるようなもんだよ。いい加減にして。",
        idiom: "get over oneself",
        idiom_meaning: "stop being so self-important / 自惚れるな"
    },
    {
        id: '_2StvCC9', // ruffle
        speaker: "Ray",
        meaning: "波立たせる・怒らせる・フリル",
        sentence: "I didn't mean to ruffle any feathers, but somebody's gotta say it -- half this stuff belongs in a museum, not a Goodwill. Nadia, you're penny wise and pound foolish if you donate that clock without gettin' it appraised first.",
        sentence_ja: "誰の気分も害するつもりはなかったけど、誰かが言わなきゃ -- この半分は博物館行きで、グッドウィルじゃないよ。ナディア、あの時計を鑑定もせずに寄付するのは小さいことに細かくて大事なことが見えてないよ。",
        idiom: "penny wise and pound foolish",
        idiom_meaning: "careful with small amounts but wasteful with large ones / 安物買いの銭失い"
    },
    {
        id: '_2vAkQdx', // concave
        speaker: "Pearl",
        meaning: "凹面の・くぼんだ",
        sentence: "That concave mirror in the hallway? Ida bought it in '72 at an auction. Made her face look skinny, she said. Woman was vain as a peacock but lord, she was funny about it. She'd own it, you know? No shame in her game.",
        sentence_ja: "廊下のあの凹面鏡？イーダが72年にオークションで買ったの。顔が細く見えるって言ってた。孔雀みたいに見栄っ張りだったけど、それをネタにして笑ってた。堂々としてたの。",
        idiom: "vain as a peacock",
        idiom_meaning: "extremely vain about appearance / とても見栄っ張り"
    },
    {
        id: '_3C4_tWe', // Antiques Roadshow
        speaker: "Ray",
        meaning: "アンティーク鑑定番組",
        sentence: "I've been watchin' Antiques Roadshow for twenty years and I'm tellin' you, this vase has all the hallmarks of Meissen porcelain. Nadia, before you bite my head off again, just let me get it looked at. What've we got to lose?",
        sentence_ja: "アンティーク・ロードショーを20年見てきて言うけど、この花瓶はマイセン磁器の特徴全部ある。ナディア、また噛みつく前に、鑑定に出させてくれ。損することないだろ？",
        idiom: "bite someone's head off",
        idiom_meaning: "respond angrily / 噛みつく・怒鳴りつける"
    },

    // ========== DAY 5 (Mar 6) -- RESOLUTION ==========
    {
        id: '_3CubH92', // a bite of the cherry
        speaker: "Dex",
        meaning: "チャンスを得る・やってみる機会",
        sentence: "Look, Ray deserves a bite of the cherry with that vase. Let him get it appraised, worst case it's worth nothin'. Best case we all eat. Nadia, just give him the benefit of the doubt one more time -- third time's the charm, right?",
        sentence_ja: "なあ、レイにあの花瓶のチャンスやろうよ。鑑定に出させて、最悪何の価値もない。最高ならみんな潤う。ナディア、もう一回だけ信じてやれよ -- 三度目の正直ってやつだろ？",
        idiom: "third time's the charm",
        idiom_meaning: "success comes on the third try / 三度目の正直"
    },
    {
        id: '_3IqpeQW', // pustule / pus
        speaker: "Cody",
        meaning: "膿疱・膿",
        sentence: "I got a pustule on my hand from movin' those dusty boxes without gloves. Gross. This whole house is like one big festerin' wound and we finally lanced it. Better late than never, I guess. Can I go home now?",
        sentence_ja: "手袋なしで埃まみれの箱動かしたから手に膿疱できた。キモ。この家全体が一つの大きな化膿した傷みたいで、やっと切開した感じ。遅くてもやらないよりマシか。もう帰っていい？",
        idiom: "better late than never",
        idiom_meaning: "doing something late is better than not at all / 遅くてもやらないよりマシ"
    },
    {
        id: '_3xTbQ62', // scooch over
        speaker: "Margot",
        meaning: "ちょっと詰める・寄る",
        sentence: "Scooch over, Pearl, let me sit next to you. I found this photo of me and Ida at the beach in '83 and I -- oh, there I go again. But you know what, Pearl? Through it all, we stuck together like glue, this family.",
        sentence_ja: "パール、ちょっと詰めて、隣座らせて。83年のビーチでのイーダと私の写真見つけて -- あぁ、また泣いちゃう。でもねパール、色々あったけど、この家族はくっついて離れなかったのよ。",
        idiom: "stick together like glue",
        idiom_meaning: "remain very close / 離れない・固い絆"
    },
    {
        id: '_3Zrz_KS', // trinket (knickknack)
        speaker: "Pearl",
        meaning: "小物・こまごました飾り物",
        sentence: "Every trinket in this house has a story, and most of em are stories Ida told me over coffee at five AM. You kids think it's junk but one man's trash is another man's treasure. I could write a book about this stuff.",
        sentence_ja: "この家の小物全部にストーリーがあって、ほとんどは朝5時にコーヒー飲みながらイーダが話してくれた話。あんたらにはガラクタでも捨てる神あれば拾う神あり。本一冊書けるわよ。",
        idiom: "one man's trash is another man's treasure",
        idiom_meaning: "value is subjective / 捨てる神あれば拾う神あり"
    },
    {
        id: '_40o7B9J', // infant mortality rate
        speaker: "Pearl",
        meaning: "乳児死亡率",
        sentence: "Back in our day the infant mortality rate was somethin' you just lived with. Ida lost a baby before your mother was born -- never talked about it. She kept a little blanket in that cedar chest. Now you know. Some things are worth their weight in gold.",
        sentence_ja: "私たちの時代は乳児死亡率ってのは受け入れるしかなかった。イーダはあんたらのお母さんが生まれる前に赤ちゃん亡くしてて -- 誰にも言わなかった。あの杉の箱に小さい毛布入れてた。これで分かったでしょ。金の重さほどの価値があるものもあるの。",
        idiom: "worth one's weight in gold",
        idiom_meaning: "extremely valuable / 金の重さほどの価値がある"
    },
    {
        id: '_4AMfYul', // swing of things
        speaker: "Nadia",
        meaning: "調子が出てくる・慣れてくる",
        sentence: "OK I think we're finally gettin' into the swing of things. Four days of chaos but we've actually made a dent. Ray, I owe you an apology -- that vase WAS worth somethin'. I jumped the gun callin' everything junk and I'm sorry.",
        sentence_ja: "やっと調子出てきた気がする。4日間カオスだったけど実際進んだ。レイ、謝らないと -- あの花瓶本当に価値あったね。全部ガラクタって早とちりしてごめん。",
        idiom: "make a dent",
        idiom_meaning: "make noticeable progress / 目に見える進歩を遂げる"
    },
    {
        id: '_4BzWdYq', // live by one's wits
        speaker: "Dex",
        meaning: "知恵で生きる・機転で切り抜ける",
        sentence: "Grandma Ida really lived by her wits, huh? No money, no fancy education, just pure street smarts and stubbornness. I like to think I got that from her. Gotta hand it to her -- she built this whole life from nothin'.",
        sentence_ja: "おばあちゃんイーダはマジで知恵で生きてきたんだな。金もなく、立派な学歴もなく、ただの処世術と頑固さだけで。俺もそれ受け継いだと思いたい。認めざるを得ない -- 何もないところからこの人生全部作ったんだから。",
        idiom: "hand it to someone",
        idiom_meaning: "give someone credit / 認めざるを得ない"
    },
    {
        id: '_4iGj_-t', // sound off
        speaker: "Ray",
        meaning: "意見を述べる・ぶちまける",
        sentence: "I just wanna sound off real quick -- I know I went overboard with the appraisals and drove everybody nuts. But that Meissen vase? Twelve hundred bucks. TWELVE. HUNDRED. Who's laughin' now? Don't count your chickens, I know, but still.",
        sentence_ja: "ちょっとだけ言わせて -- 鑑定やりすぎてみんなイラつかせたのは分かってる。でもあのマイセンの花瓶？1200ドル。千。二百。今笑ってるの誰？捕らぬ狸の何とかは分かってるけど、それでもね。",
        idiom: "go overboard",
        idiom_meaning: "do too much / やりすぎる"
    },
    {
        id: '_4mGAwzJ', // goggle
        speaker: "Margot",
        meaning: "目を丸くする・びっくりして見つめる",
        sentence: "We all just goggled at the appraiser's number -- twelve hundred dollars for ONE vase! Ida, you sneaky woman, you had treasures hidin' in plain sight this whole time. I guess good things come to those who wait, huh?",
        sentence_ja: "鑑定士の数字を見てみんな目を丸くした -- 花瓶一個で1200ドル！イーダ、このずるい人、ずっと目の前に宝物隠してたのね。待つ者には福が来るってこういうことね。",
        idiom: "good things come to those who wait",
        idiom_meaning: "patience is rewarded / 待てば海路の日和あり"
    },
    {
        id: '_4pfcH2C', // cauterize
        speaker: "Pearl",
        meaning: "焼灼する・傷口を焼いて止血する",
        sentence: "Sometimes you gotta cauterize the wound to stop the bleedin', and that's what this week was. Painful, ugly, but necessary. But every cloud has a silver linin' -- you kids finally sorted the garage AND figured out you actually like each other. Ida's up there laughin' at every single one of you, trust me.",
        sentence_ja: "出血止めるには傷口を焼くしかない時もある、今週はそういう週だった。痛くて、醜くて、でも必要だった。でも不幸中の幸いってやつで -- あんたらやっとガレージ片付けて、しかもお互い嫌いじゃないって気づいた。イーダは上からあんたら全員見て笑ってるわよ、間違いない。",
        idiom: "every dog has its day",
        idiom_meaning: "everyone gets a chance eventually / 誰にでもチャンスは巡ってくる"
    },
];

// ============================================================
// Seeder
// ============================================================
async function seedDay44() {
    console.log('Seeding Day 044 -- Antiques House Call (words 600-649)...');
    let success = 0;
    let failed = 0;
    let meaningFixed = 0;

    for (const item of DAY44_DATA) {
        try {
            // PATCH review data
            const res = await fetch(`http://localhost:3001/api/user-phrases/${item.id}`, {
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
                console.log(`  OK: [${item.speaker}] ${item.idiom}`);
            } else {
                failed++;
                console.log(`  FAIL: ${item.id} - ${JSON.stringify(data)}`);
            }

            // PUT meaning fix (if meaning field exists)
            if (item.meaning) {
                const mRes = await fetch(`http://localhost:3001/api/user-phrases/${item.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ meaning: item.meaning }),
                });
                const mData = await mRes.json();
                if (mData.success) {
                    meaningFixed++;
                    console.log(`    -> meaning fixed: ${item.meaning}`);
                }
            }
        } catch (err) {
            failed++;
            console.log(`  ERROR: ${item.id} - ${err.message}`);
        }
    }

    console.log(`\nDone! Review: ${success}/50, Meanings fixed: ${meaningFixed}`);
}

seedDay44();
