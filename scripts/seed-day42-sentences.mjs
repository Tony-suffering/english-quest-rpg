// Seed Day 042 (words 500-549) -- Feb 20-24
// Day 042: First Movie Without Parents (12歳, グループ)
// ALL sentences are SPOKEN DIALOGUE -- actual things people say out loud
// g-dropping (70-80%), grammar breaking, fillers, real spoken English
// Characters: Jayden(12M, ringleader, acts 16 but panics at real decisions),
//   Maddie(12F, anxious about everything, mom texts every 3 min, hand sanitizer),
//   Tyler C.(12M, class clown, nonstop commentary, eats everyone's snacks),
//   Ava(12F, film nerd, already read every spoiler, wanted the indie movie),
//   Benji(11M, Jayden's little brother, wasn't supposed to come, zero volume control),
//   Mrs. Chen(42F, Jayden's mom, hovering via text, threatened to come inside),
//   Marcus(17M, movie theater usher, bored, on phone, zero authority),
//   Old Man Gus(70M, grumpy retiree in row F, shushes everyone)
// Story: 5-day arc. Day 1: Drop-off, lobby, buying tickets/snacks.
//   Day 2: Finding seats, movie starts, trying to act cool.
//   Day 3: Mid-movie chaos -- bathroom, noise, Gus confrontation.
//   Day 4: Movie climax + real drama between friends.
//   Day 5: Post-movie, waiting for pickup, reflecting.
// Sub-plots: Jayden picked superhero movie vs Ava's indie preference,
//   Maddie's mom texts constantly, Tyler vs Old Man Gus comedy/silence war,
//   Benji keeps doing embarrassing things (too loud, asks dumb questions)

const DAY42_DATA = [
    // ========== DAY 1 (Feb 20) -- THE DROP-OFF ==========
    {
        id: 'KOB6b93d', // every man for himself
        speaker: "Jayden",
        meaning: "各自で生き延びろ",
        sentence: "Alright listen up -- once Mom drives away it's every man for himself in that snack line. I ain't holdin' anybody's spot. First come, first served, so don't miss the boat on the large popcorn combo.",
        sentence_ja: "いいか聞けよ -- お母さんが車で行ったらスナックの列は各自で生き延びろだからな。誰の場所も取っとかない。早い者勝ちだから、ラージポップコーンコンボ逃すなよ。",
        idiom: "first come, first served",
        idiom_meaning: "whoever arrives first gets priority / 早い者勝ち"
    },
    {
        id: 'sXeeuv6D', // horse blinder
        speaker: "Tyler C.",
        meaning: "馬の目隠し",
        sentence: "Dude Maddie's got her hoodie pulled up like a horse blinder so she can't see the scary poster on the wall. She's actin' like the sky is fallin' and we haven't even gone inside yet.",
        sentence_ja: "おいマディがフード被って馬の目隠しみたいにして壁の怖いポスター見えないようにしてる。まだ中にも入ってないのに世界の終わりみたいな顔してるんだけど。",
        idiom: "the sky is falling",
        idiom_meaning: "overreacting to a minor problem / 大げさに騒ぐ・世界の終わりみたい"
    },
    {
        id: '9ykqkuzw', // Plastic wrap, cling wrap
        speaker: "Maddie",
        meaning: "ラップ",
        sentence: "I brought hand sanitizer AND wet wipes AND I wrapped my phone in plastic wrap so it doesn't get butter on it. My mom said better safe than -- wait, I know that's a thing people say but like, she's not wrong, right? You only live once so why NOT be careful?",
        sentence_ja: "手指消毒液とウェットティッシュ持ってきたし、スマホにラップ巻いてバターつかないようにした。お母さんが備えあれば -- あ、それよく言うやつだけど、間違ってなくない？一度きりの人生なんだから慎重でいいじゃん。",
        idiom: "you only live once",
        idiom_meaning: "life is short, take opportunities / 人生一度きり"
    },
    {
        id: '27Jg1JdG', // stand still
        speaker: "Mrs. Chen",
        meaning: "じっと立つ・動かないこと",
        sentence: "Jayden, stand still for ONE second so I can fix your collar. And tell Benji if he doesn't answer my texts within five minutes I'm comin' in. I mean it -- I'm not just whistlin' Dixie over here.",
        sentence_ja: "ジェイデン、1秒でいいからじっとして襟直させて。あとベンジに5分以内にメール返さなかったら中に入るって伝えて。本気だからね -- ただ言ってるだけじゃないの。",
        idiom: "whistling Dixie",
        idiom_meaning: "talking idly, not being serious / ただ適当なことを言ってるだけ・口だけ"
    },
    {
        id: '0-YfABPT', // manboobs
        speaker: "Tyler C.",
        meaning: "男の胸の脂肪",
        sentence: "OK so the dude on that poster's got major manboobs under his armor and I CANNOT stop laughin'. Ava's givin' me the stink eye but come ON, you can't tell me you don't see it.",
        sentence_ja: "あのポスターの男、鎧の下にめっちゃ男の胸の脂肪あるんだけど笑い止まんない。アヴァに睨まれてるけど、いや見えないとは言わせないぞ。",
        idiom: "give the stink eye",
        idiom_meaning: "glare at someone disapprovingly / 睨む・嫌な目で見る"
    },
    {
        id: 'PwGnX7q6', // more of the same
        speaker: "Ava",
        meaning: "代わり映えしないもの",
        sentence: "This franchise is just more of the same every single time -- hero loses, hero trains, hero wins. I've been sayin' this till I'm blue in the face but nobody cares what the film nerd thinks.",
        sentence_ja: "このシリーズ毎回代わり映えしない -- ヒーロー負ける、鍛える、勝つ。口酸っぱく言ってるのに映画オタクの意見なんて誰も気にしないんだよね。",
        idiom: "till one is blue in the face",
        idiom_meaning: "repeatedly without success / 口が酸っぱくなるほど・何度言っても"
    },
    {
        id: '6wot17dy', // Icelandic sea salt
        speaker: "Tyler C.",
        meaning: "アイスランドの海塩",
        sentence: "They got popcorn with Icelandic sea salt here and it costs like three bucks extra. Jayden's tryin' to act all fancy but I say that's a rip-off -- plain butter's where it's at, bro. Penny for your thoughts, Maddie?",
        sentence_ja: "ここアイスランドの海塩ポップコーンあって3ドルも高いの。ジェイデンがオシャレぶってるけど、ぼったくりでしょ -- 普通のバター味が最高だよ。マディはどう思う？",
        idiom: "a penny for your thoughts",
        idiom_meaning: "asking what someone is thinking / 何考えてるの？"
    },
    {
        id: 'wUPb4wf0', // stoicism
        speaker: "Jayden",
        meaning: "ストイシズム・禁欲主義",
        sentence: "My dad says stoicism is about stayin' calm no matter what, and that's EXACTLY what I gotta do today with this group. Honestly managin' these guys is no walk in the park but somebody's gotta do it.",
        sentence_ja: "父さんが何があっても冷静でいるのがストイシズムだって言ってて、今日このグループでまさにそれやらなきゃ。正直こいつら管理するの楽じゃないけど誰かがやらないと。",
        idiom: "no walk in the park",
        idiom_meaning: "not easy, difficult / 楽じゃない・簡単じゃない"
    },
    {
        id: 'e49NTVPn', // take no prisoners
        speaker: "Benji",
        meaning: "容赦しない",
        sentence: "JAYDEN SAID WE'RE GONNA TAKE NO PRISONERS AT THE CANDY COUNTER! I WANT THE BIG GUMMY SNAKE! THE ONE THAT'S LONG AS MY ARM! Is it a lot? I DON'T CARE, GO BIG OR GO HOME!",
        sentence_ja: "ジェイデンがお菓子カウンターで容赦しないって言った！！でっかいグミのヘビほしい！腕くらい長いやつ！高い？知らない、やるなら全力だよ！！",
        idiom: "go big or go home",
        idiom_meaning: "do it fully or don't bother / やるなら全力で・中途半端ならやめろ"
    },
    {
        id: '-Eer20B5', // bridezilla
        speaker: "Maddie",
        meaning: "結婚式で暴走する花嫁",
        sentence: "My older sister turned into a total bridezilla last month and now she's bein' super nice to everyone like nothin' happened. I'm just -- sorry, I'm ramblin'. I'm like a fish out of water at the movies without my mom, you guys.",
        sentence_ja: "お姉ちゃんが先月完全にブライドジラになって、今は何もなかったみたいにみんなに超優しくしてる。えっと -- ごめん、脱線した。お母さんなしで映画館とか場違い感すごいの。",
        idiom: "a fish out of water",
        idiom_meaning: "uncomfortable in an unfamiliar situation / 場違い・居心地が悪い"
    },

    // ========== DAY 2 (Feb 21) -- FINDING SEATS, MOVIE STARTS ==========
    {
        id: '-V82V9gD', // work up an appetite
        speaker: "Tyler C.",
        meaning: "食欲を湧かせる",
        sentence: "Just walkin' up the stairs to row G worked up an appetite, I swear. Gimme some of your Skittles, Maddie. Don't be stingy -- sharin' is carin' and all that jazz, right?",
        sentence_ja: "G列まで階段上っただけで食欲湧いたんだけどマジで。マディ、スキットルズちょっとくれよ。ケチるなって -- 分け合うのは思いやりだし、まあそういうことだよ。",
        idiom: "and all that jazz",
        idiom_meaning: "and all that sort of thing / まあそういうこと全部・その他もろもろ"
    },
    {
        id: 'ZoARfnZ7', // duckweed
        speaker: "Ava",
        meaning: "ウキクサ",
        sentence: "We learned about duckweed in science -- it doubles every two days. Kinda like how the bad reviews for this franchise keep doublin' online. The critics are havin' a field day, but does anyone listen? Nope, deaf ears.",
        sentence_ja: "理科でウキクサ習った -- 2日で倍になるの。このシリーズの悪いレビューがネットで倍増してるのと一緒。批評家は大喜びなのに誰か聞く？聞かない、馬耳東風。",
        idiom: "fall on deaf ears",
        idiom_meaning: "be ignored, go unheeded / 馬耳東風・聞き流される"
    },
    {
        id: '_EDA-a7P', // trundle
        speaker: "Old Man Gus",
        meaning: "ゴロゴロ転がる・のろのろ進む",
        sentence: "Watch me trundle down to my seat like the old man I am. These knees ain't what they used to be. And if those kids behind me don't pipe down, there'll be hell to pay, mark my words.",
        sentence_ja: "この年寄りがのろのろ席まで行くの見ろ。膝がもう昔とは違うんだ。後ろのガキどもが静かにしなかったら、ただじゃすまんぞ、覚えとけ。",
        idiom: "there'll be hell to pay",
        idiom_meaning: "serious trouble ahead / ただじゃすまない・大変なことになる"
    },
    {
        id: 'RK2jUI71', // bugged out
        speaker: "Benji",
        meaning: "目が飛び出た・ビビった",
        sentence: "I TOTALLY BUGGED OUT WHEN THE LIGHTS WENT OFF! IT'S SO DARK! Jayden, can I hold your arm? NO? FINE, I'LL JUST SIT ON MY HANDS! This is gonna be a piece of -- wait, no, I'm SCARED!",
        sentence_ja: "ライト消えた時めっちゃビビった！！超暗い！ジェイデン、腕掴んでいい？ダメ？いいよ、手の上に座る！！楽勝 -- いや待って、怖い！",
        idiom: "sit on one's hands",
        idiom_meaning: "do nothing, refuse to act / 何もしない・手をこまねく"
    },
    {
        id: 'VtIdlRC5', // in a bind
        speaker: "Jayden",
        meaning: "困った状況に",
        sentence: "OK we're in a bind -- Benji wants the front row, Ava wants the back, and there's an old dude in row F givin' us the evil eye. I gotta think on my feet here 'cause everyone's countin' on me.",
        sentence_ja: "やばい困った -- ベンジが最前列、アヴァが最後列希望で、F列のおじいさんが怖い目で見てる。みんな俺に頼ってるからここは臨機応変にいかないと。",
        idiom: "give the evil eye",
        idiom_meaning: "look at someone with hostility / 睨みつける・怖い目で見る"
    },
    {
        id: 's2ipbsPs', // put one's hands together
        speaker: "Tyler C.",
        meaning: "拍手する",
        sentence: "Everybody put your hands together for Jayden, the kid who planned the WORST seating arrangement ever! Nah I'm just messin' with you, dude. Don't get your feathers ruffled -- these seats are actually decent.",
        sentence_ja: "史上最悪の座席配置を計画したジェイデンに拍手！嘘だって、からかっただけだよ。ムキになるなって -- 実際この席まあまあいいじゃん。",
        idiom: "get one's feathers ruffled",
        idiom_meaning: "become annoyed or upset / ムキになる・怒る"
    },
    {
        id: 'plK5Clo2', // Spaghetti Western
        speaker: "Ava",
        meaning: "マカロニ・ウエスタン",
        sentence: "You know what's actually a great genre? The Spaghetti Western. Sergio Leone was lightyears ahead of whatever this CGI nonsense is. But I'll hold my peace for now 'cause the movie's startin'.",
        sentence_ja: "マジでいいジャンルって何か知ってる？マカロニ・ウエスタン。セルジオ・レオーネはこのCGIのゴミの何光年も先にいた。でもまあ映画始まるからとりあえず黙っとく。",
        idiom: "hold one's peace",
        idiom_meaning: "stay silent, refrain from speaking / 黙っておく・口をつぐむ"
    },
    {
        id: 'AKOu7fD-', // make way for
        speaker: "Marcus",
        meaning: "道を開ける",
        sentence: "Hey, make way for the people comin' in. Don't just stand there blockin' the aisle. I ain't paid enough to babysit y'all, but rules are rules, so keep it movin'. Chop chop.",
        sentence_ja: "おい、入ってくる人に道開けて。通路で突っ立ってんなよ。お前らのベビーシッターするほど給料もらってないけど、ルールはルールだから動け。さっさと。",
        idiom: "chop chop",
        idiom_meaning: "hurry up, do it quickly / さっさとやれ・急げ"
    },
    {
        id: '8ykR6RSH', // pincushion
        speaker: "Maddie",
        meaning: "針刺し",
        sentence: "Somebody left a pin in this seat and I sat on it! I feel like a pincushion! Oh my GOD, what if it's dirty? I'm gonna need a tetanus shot. My mom's gonna freak -- she always says an ounce of prevention is worth a pound of cure.",
        sentence_ja: "誰か席にピン置いてって座っちゃった！針刺しになった気分！OMG、汚かったらどうしよう？破傷風の注射打たなきゃ。お母さん絶対パニック -- いつも予防は治療に勝るって言ってるし。",
        idiom: "an ounce of prevention is worth a pound of cure",
        idiom_meaning: "preventing is easier than fixing / 予防は治療に勝る"
    },
    {
        id: 'a85RNlFt', // spagetti-brained womanizer
        speaker: "Tyler C.",
        meaning: "頭の中がスパゲッティな女たらし",
        sentence: "The villain in this movie is such a spaghetti-brained womanizer -- like every scene he's hittin' on somebody. Reminds me of my uncle honestly. He's a dead ringer for my uncle actually, same goofy smile and everything.",
        sentence_ja: "この映画の悪役マジで頭スパゲッティな女たらし -- 毎シーンナンパしてる。正直うちの叔父さんに似てる。マジでうちの叔父のそっくりさん、同じ間抜けな笑顔まで。",
        idiom: "a dead ringer",
        idiom_meaning: "someone who looks exactly like another person / そっくりさん・瓜二つ"
    },

    // ========== DAY 3 (Feb 22) -- MID-MOVIE CHAOS ==========
    {
        id: 'iKT9cYjW', // in toto
        speaker: "Ava",
        meaning: "全体として・すべて",
        sentence: "In toto, the first act was actually not terrible? I mean the dialogue's a trainwreck but the cinematography's got some -- wait, Tyler, did you just eat my pretzel? Caught you red-handed, dude.",
        sentence_ja: "全体として、第一幕は実はそんなにひどくなかった？台詞はめちゃくちゃだけど撮影技法には -- 待って、タイラー、私のプレッツェル食べた？現行犯だからね。",
        idiom: "caught red-handed",
        idiom_meaning: "caught in the act of doing something wrong / 現行犯で捕まる"
    },
    {
        id: 'i0B8P9YH', // buttmunch
        speaker: "Jayden",
        meaning: "バカ・マヌケ（軽い悪口）",
        sentence: "Benji, you little buttmunch, you just knocked over the ENTIRE large popcorn. That was twelve bucks! Mom's gonna have my head on a platter for wastin' money like that.",
        sentence_ja: "ベンジ、このバカ、ラージポップコーン全部ひっくり返したじゃん。12ドルだぞ！金の無駄遣いで母さんに首飛ばされる。",
        idiom: "have someone's head on a platter",
        idiom_meaning: "punish someone severely / 首を飛ばす・厳しく罰する"
    },
    {
        id: '3A6u7E-l', // the back of my hand
        speaker: "Old Man Gus",
        meaning: "手の甲",
        sentence: "I know this theater like the back of my hand -- been comin' here since before you kids were born. And I'm tellin' you right now, if y'all don't zip it, I'm gettin' the manager. That's the bottom line.",
        sentence_ja: "この映画館はワシの手の甲のように知っとる -- お前らが生まれる前から来とるんだ。今言っとくが、黙らんかったらマネージャー呼ぶぞ。それが結論だ。",
        idiom: "zip it",
        idiom_meaning: "be quiet, shut up / 黙れ・口を閉じろ"
    },
    {
        id: 'K93J9yOz', // roadkill
        speaker: "Tyler C.",
        meaning: "ロードキル・路上の動物の死骸",
        sentence: "That CGI monster looks like roadkill somebody tried to bring back to life with a car battery. The special effects are so bad I'm dyin' over here. Honestly this movie's got me in stitches for all the wrong reasons.",
        sentence_ja: "あのCGIモンスター、車のバッテリーで蘇らせたロードキルみたい。特殊効果ひどすぎて死にそう。正直この映画、別の意味で爆笑してるんだけど。",
        idiom: "dying over here",
        idiom_meaning: "laughing extremely hard / 笑い死にしそう・爆笑"
    },
    {
        id: 'kdGnfo1B', // inky hell
        speaker: "Maddie",
        meaning: "真っ暗な地獄",
        sentence: "The hallway to the bathroom is like inky hell -- I can't see ANYTHING and there's probably germs everywhere. Can somebody come with me? I don't wanna go alone. I'm scared out of my wits.",
        sentence_ja: "トイレまでの廊下が真っ暗な地獄みたい -- 何も見えないしたぶんバイ菌だらけ。誰か一緒に来て？一人で行きたくない。怖くてどうにかなりそう。",
        idiom: "scared out of one's wits",
        idiom_meaning: "extremely frightened / 怖くてどうにかなりそう・死ぬほど怖い"
    },
    {
        id: 'UroYzc7t', // media blitz
        speaker: "Ava",
        meaning: "メディアの集中攻撃",
        sentence: "The media blitz for this sequel was INSANE -- like every billboard, every YouTube ad. They spent more on marketin' than the actual movie. The whole thing's smoke and mirrors if you ask me.",
        sentence_ja: "この続編のメディア攻勢ヤバかった -- 全部のビルボード、全部のYouTube広告。映画本体よりマーケティングに金使ってる。聞かれたら全部まやかしって言うけど。",
        idiom: "smoke and mirrors",
        idiom_meaning: "deception, illusion / まやかし・見せかけ"
    },
    {
        id: 'YDDuL2Mo', // proxy
        speaker: "Jayden",
        meaning: "代理",
        sentence: "Benji's basically actin' as Mom's proxy right now -- he keeps tattlin' on us through text. Dude, whose side are you ON? You're supposed to be one of us. Don't upset the apple cart, man.",
        sentence_ja: "ベンジが今お母さんの代理みたいなことしてる -- メールでチクり続けてる。おい、お前どっちの味方だよ？俺らの仲間だろ。波風立てんなよ。",
        idiom: "upset the apple cart",
        idiom_meaning: "ruin a plan or disrupt things / 計画を台無しにする・波風を立てる"
    },
    {
        id: 'NOVZ7VcH', // strong suit
        speaker: "Tyler C.",
        meaning: "得意なこと・強み",
        sentence: "Bein' quiet was NEVER my strong suit -- everybody knows that. But I'm tryin' here, OK? Gus is starin' daggers at me and honestly I think he's got a bone to pick with me specifically.",
        sentence_ja: "静かにするのは俺の得意じゃない -- みんな知ってる。でも頑張ってるんだよ、OK？ガスが俺を睨みつけてて正直俺に特に文句ありそう。",
        idiom: "have a bone to pick",
        idiom_meaning: "have a complaint to discuss / 文句がある・言いたいことがある"
    },
    {
        id: 'er3lPGS7', // in the clouds
        speaker: "Benji",
        meaning: "ぼんやりして・空想の中",
        sentence: "JAYDEN SAYS I'M ALWAYS IN THE CLOUDS BUT I'M PAYIN' ATTENTION! I just -- WHOA DID THE HERO JUST FLY?! THAT WAS SICK! Wait what were we talkin' about? I LOST MY TRAIN OF THOUGHT!",
        sentence_ja: "ジェイデンがいつもぼんやりしてるって言うけど集中してるし！ただ -- うわヒーロー今飛んだ？！すげー！あれ何の話してた？考えてたこと忘れちゃった！！",
        idiom: "lose one's train of thought",
        idiom_meaning: "forget what you were thinking or saying / 考えてたことを忘れる"
    },
    {
        id: 'Q0EKn81v', // spread like wild fire
        speaker: "Maddie",
        meaning: "野火のように広がる",
        sentence: "Tyler's joke about Gus just spread like wildfire -- everybody in our row is laughin' and Gus looks like he's about to blow a fuse. I'm so nervous. Why can't we just sit still and watch the movie?",
        sentence_ja: "タイラーのガスのジョークが野火みたいに広がって、列のみんな笑ってるしガスはもうキレそう。超緊張する。なんで大人しく映画見てられないの？",
        idiom: "blow a fuse",
        idiom_meaning: "become very angry suddenly / キレる・ヒューズが飛ぶ"
    },

    // ========== DAY 4 (Feb 23) -- MOVIE CLIMAX + REAL DRAMA ==========
    {
        id: 'cLcz0Kop', // horsecrap
        speaker: "Old Man Gus",
        meaning: "くだらないこと・でたらめ",
        sentence: "That plot twist was absolute horsecrap. The villain was the hero's brother the WHOLE time? In MY day, movies didn't need that kinda cheap trick. Hollywood's gone to the dogs, I tell ya.",
        sentence_ja: "あのどんでん返しは完全にでたらめだ。悪役がずっとヒーローの兄弟だった？ワシらの時代はそんな安いトリックいらなかった。ハリウッドは終わりだ、ホントに。",
        idiom: "gone to the dogs",
        idiom_meaning: "deteriorated badly / 堕落した・ダメになった"
    },
    {
        id: 'CACp391q', // Where dead bodies are buried?
        speaker: "Tyler C.",
        meaning: "秘密の隠し場所・弱みを握ること",
        sentence: "Ava knows where dead bodies are buried with this franchise -- she read every leak online. But she won't spill 'cause she says real film lovers don't spoil. Whatever, she's just stringin' us along at this point.",
        sentence_ja: "アヴァはこのシリーズの裏事情全部知ってる -- ネットのリーク全部読んでるし。でも本物の映画ファンはネタバレしないんだって。もう焦らしてるだけだろ。",
        idiom: "string someone along",
        idiom_meaning: "keep someone waiting or hoping with false promises / 焦らす・引っ張る"
    },
    {
        id: '2jcF6cVF', // yellow green
        speaker: "Benji",
        meaning: "黄緑色",
        sentence: "THE HERO'S NEW SUIT IS YELLOW GREEN AND IT LOOKS SO COOL! Wait -- is it yellow or green? IT'S BOTH! I CAN'T MAKE UP MY MIND! JAYDEN, WHAT COLOR IS THAT?!",
        sentence_ja: "ヒーローの新しいスーツ黄緑色でめっちゃかっこいい！待って -- 黄色？緑？両方だ！決められない！ジェイデン、あれ何色？！",
        idiom: "make up one's mind",
        idiom_meaning: "decide, reach a decision / 決心する・決める"
    },
    {
        id: 'jnt3IO_T', // trade barbs
        speaker: "Jayden",
        meaning: "悪口を言い合う",
        sentence: "Ava and Tyler keep tradin' barbs about the movie and I'm stuck in the middle tryin' to keep the peace. Honestly I'm at the end of my rope -- can you guys just shut up for like five minutes?",
        sentence_ja: "アヴァとタイラーが映画のこと悪口言い合い続けてて、俺は真ん中で仲裁してる。正直もう限界 -- 5分くらい黙っててくれない？",
        idiom: "at the end of one's rope",
        idiom_meaning: "completely out of patience / もう限界・我慢の限界"
    },
    {
        id: '6F0NogrA', // brassels sprout
        speaker: "Tyler C.",
        meaning: "芽キャベツ",
        sentence: "The hero said his weakness is Brussels sprouts in the comic and I'm like SAME, dude. My mom makes me eat 'em every Thursday. I'd rather eat dirt honestly. That's my two cents, take it or leave it.",
        sentence_ja: "ヒーローがコミックで弱点は芽キャベツって言ってて俺も同じ。母さんが毎週木曜に食べさせるんだよ。正直土食った方がマシ。俺の意見、聞くも聞かないも自由。",
        idiom: "take it or leave it",
        idiom_meaning: "accept it or not, no negotiation / 好きにしろ・嫌なら断れ"
    },
    {
        id: '_JhEnxbo', // doodlebug
        speaker: "Maddie",
        meaning: "アリジゴク・落書き好き",
        sentence: "My little cousin's a total doodlebug -- she draws on everything. She'd LOVE the art in this movie. Oh gosh, my mom just texted again askin' if I'm OK. For the love of Pete, I'm FINE, Mom.",
        sentence_ja: "うちの小さいいとこ完全に落書き魔 -- 何にでも描く。この映画のアート気に入ると思う。あ、お母さんからまた大丈夫？ってメール。もういい加減にしてよ、大丈夫だってば。",
        idiom: "for the love of Pete",
        idiom_meaning: "exclamation of frustration / もういい加減にして・頼むから"
    },
    {
        id: 'RTqVlSfh', // applewood-smoked bacon
        speaker: "Tyler C.",
        meaning: "リンゴの木でスモークしたベーコン",
        sentence: "Dude I would KILL for some applewood-smoked bacon right now. This popcorn ain't cuttin' it. I could eat a horse. Wait -- the hero just saved the city! YOOO THAT WAS INSANE!",
        sentence_ja: "今アップルウッドスモークのベーコンのためなら何でもする。ポップコーンじゃ足りない。馬一頭食えるくらい腹減った。待って -- ヒーローが街救った！うおおすげー！",
        idiom: "could eat a horse",
        idiom_meaning: "extremely hungry / めちゃくちゃ腹が減った"
    },
    {
        id: '26LSMHXd', // King Tut
        speaker: "Ava",
        meaning: "ツタンカーメン王",
        sentence: "The villain's golden mask looks like somethin' off King Tut's sarcophagus. At least the costume designer did their homework. Credit where it's due -- that mask is the saving grace of this whole trainwreck.",
        sentence_ja: "悪役の金のマスク、ツタンカーメン王の石棺みたい。少なくとも衣装デザイナーはちゃんと調べたね。認めるべきところは認める -- あのマスクがこの惨事の唯一の救い。",
        idiom: "saving grace",
        idiom_meaning: "the one good thing about something otherwise bad / 唯一の救い・取り柄"
    },
    {
        id: 'Yj66sIdz', // man up
        speaker: "Jayden",
        meaning: "男らしくしろ・しっかりしろ",
        sentence: "Benji, man up and stop cryin' -- it's just a movie. The hero's fine, he always comes back. Wait... why am I gettin' choked up too? Must be somethin' in the air. I'm not cryin', YOU'RE cryin'.",
        sentence_ja: "ベンジ、しっかりしろよ泣くな -- ただの映画だよ。ヒーローは大丈夫、いつも戻ってくる。待って...なんで俺もウルッときてるの？なんか空気のせいだ。俺は泣いてない、お前が泣いてるんだ。",
        idiom: "something in the air",
        idiom_meaning: "a feeling or mood that's noticeable / 何かが漂ってる・雰囲気的に"
    },
    {
        id: '4i8ZVfqI', // coot
        speaker: "Tyler C.",
        meaning: "オオバン（鳥）/ 変なじいさん",
        sentence: "That old coot in row F just shushed me for like the TENTH time. I'm gonna lose it. But Jayden says I gotta let sleeping dogs lie so I'm just gonna ignore him. Easier said than done though.",
        sentence_ja: "F列のあの変なじいさんがもう10回目くらいシーってした。キレそう。でもジェイデンが寝た子を起こすなって言うから無視する。言うのは簡単だけどね。",
        idiom: "easier said than done",
        idiom_meaning: "more difficult to do than to talk about / 言うは易し行うは難し"
    },

    // ========== DAY 5 (Feb 24) -- POST-MOVIE, PICKUP, REFLECTING ==========
    {
        id: '6vRUquI3', // IIT Bombay
        speaker: "Ava",
        meaning: "IITボンベイ（インド工科大学ボンベイ校）",
        sentence: "My neighbor's sister goes to IIT Bombay and she says Indian cinema is way more emotionally complex than this stuff. I've been sayin' that from day one but nobody takes me seriously. It's like talkin' to a brick wall with you guys.",
        sentence_ja: "近所のお姉さんがIITボンベイ通ってて、インド映画はこういうのよりずっと感情的に複雑だって。初日から言ってるのに誰も真面目に聞いてくれない。あんたたちに話すのは壁に向かって喋るようなもん。",
        idiom: "like talking to a brick wall",
        idiom_meaning: "talking to someone who won't listen / 壁に向かって話す・のれんに腕押し"
    },
    {
        id: 'WSGc_kF6', // hog heaven
        speaker: "Tyler C.",
        meaning: "最高の幸せ・至福",
        sentence: "Dude the credits are rollin' and there's still free popcorn in the warmer -- I'm in hog heaven right now. Best day EVER. Everybody else is rushin' out but I'm gonna milk it for all it's worth.",
        sentence_ja: "エンドロール流れてるのにまだウォーマーに無料ポップコーンある -- 今最高に幸せ。史上最高の日。みんな急いで出てくけど、俺は最後まで楽しみ尽くす。",
        idiom: "milk it for all it's worth",
        idiom_meaning: "get maximum benefit from something / 最大限搾り取る・楽しみ尽くす"
    },
    {
        id: 'hoI_Bnkn', // black hat marketing
        speaker: "Ava",
        meaning: "ブラックハットマーケティング（不正なSEO手法）",
        sentence: "Half the five-star reviews for this movie are probably black hat marketing -- bots and paid reviews. The real score's like a 55. I'd put money on it. Anyway, that movie was a guilty pleasure, not that I'd ever admit it out loud.",
        sentence_ja: "この映画の五つ星レビューの半分はたぶんブラックハットマーケティング -- ボットとサクラ。本当の点数は55点くらい。賭けてもいい。まあ、やましい快楽だったけど、口には出さない。",
        idiom: "guilty pleasure",
        idiom_meaning: "something enjoyed despite feeling it's not respected / やましい快楽・好きだけど恥ずかしい"
    },
    {
        id: 'BdJ5nAFp', // cut back on
        speaker: "Maddie",
        meaning: "減らす・控える",
        sentence: "I need to cut back on the worrying, I know. My mom says the same thing. But honestly? I had fun today. Like actual fun. Maybe I should stop puttin' the cart before the horse and just enjoy stuff more.",
        sentence_ja: "心配するの減らさなきゃ、分かってる。お母さんも同じこと言う。でも正直？今日楽しかった。マジで楽しかった。先走りすぎないでもっと楽しめばいいのかも。",
        idiom: "put the cart before the horse",
        idiom_meaning: "do things in the wrong order / 本末転倒・順序を間違える"
    },
    {
        id: 'ZXAjJlhM', // GO BIG OR GO HOME
        speaker: "Benji",
        meaning: "やるなら全力でやれ",
        sentence: "JAYDEN SAID NEXT TIME WE GO BIG OR GO HOME AND I'M LIKE YES! IMAX! 3D! I WANNA SIT IN THE FRONT ROW AGAIN! Today was the best -- it was a blast and a half!",
        sentence_ja: "ジェイデンが次は全力でいくって言って僕もそう！IMAX！3D！また最前列に座りたい！今日最高だった -- めちゃくちゃ楽しかった！",
        idiom: "a blast and a half",
        idiom_meaning: "extremely fun, more fun than expected / めちゃくちゃ楽しい"
    },
    {
        id: 'BLhONbuB', // agonize over
        speaker: "Jayden",
        meaning: "思い悩む",
        sentence: "I used to agonize over every little thing when I planned stuff for the group, but today just kinda... worked out? Even with Benji bein' a maniac. I guess I was just makin' a mountain outta nothin' the whole time.",
        sentence_ja: "グループの計画する時いつも細かいこと全部で悩んでたけど、今日はなんか...うまくいった？ベンジが暴れてたのに。ずっと大げさに考えすぎてただけかも。",
        idiom: "make a mountain out of nothing",
        idiom_meaning: "exaggerate a small issue / 大げさにする・些細なことを大事にする"
    },
    {
        id: '9oG2Jg0n', // BOB (bug out bag)
        speaker: "Tyler C.",
        meaning: "BOB（緊急避難バッグ）",
        sentence: "My older brother's got this BOB -- bug out bag -- with like survival stuff in it. Maddie basically brought one to the movies. Hand sanitizer, wipes, Band-Aids... girl came prepared. Gotta hand it to her, honestly.",
        sentence_ja: "兄貴がBOB -- 緊急避難バッグ持ってて、サバイバル用品入ってるの。マディが映画に持ってきたのほぼそれ。消毒液、ウェットティッシュ、絆創膏...準備万端だよ。正直認めざるを得ない。",
        idiom: "gotta hand it to someone",
        idiom_meaning: "must give credit to someone / 認めざるを得ない・さすが"
    },
    {
        id: 'XXYp2pd1', // homecoming
        speaker: "Mrs. Chen",
        meaning: "帰還・ホームカミング",
        sentence: "Finally, the homecoming! Jayden, get in the car. Benji, seatbelt NOW. I've been on pins and needles for two hours waitin' in this parking lot. Next time I'm buyin' a ticket and sittin' RIGHT behind you.",
        sentence_ja: "やっとお帰り！ジェイデン、車乗って。ベンジ、シートベルト今すぐ。2時間この駐車場でハラハラしながら待ってたの。次は私もチケット買ってあんたたちの真後ろに座るからね。",
        idiom: "on pins and needles",
        idiom_meaning: "extremely anxious or nervous / ハラハラ・気が気じゃない"
    },
    {
        id: 'Hke7XF4D', // brig
        speaker: "Old Man Gus",
        meaning: "営倉・船の独房",
        sentence: "If this were my Navy days, those kids'd be in the brig for that level of noise. But the movie's over and I survived. Gotta look on the bright side -- at least I didn't have to sit through it TWICE.",
        sentence_ja: "ワシの海軍時代なら、あのレベルの騒音で営倉行きだ。でも映画は終わったし生き延びた。良い面を見ないとな -- 少なくとも2回見なくてよかった。",
        idiom: "look on the bright side",
        idiom_meaning: "focus on the positive aspects / 良い面を見る・前向きに考える"
    },
    {
        id: 'fcR3lUYV', // showcase
        speaker: "Jayden",
        meaning: "披露する・ショーケース",
        sentence: "Today was kinda my chance to showcase that I can handle things without Mom and Dad. And you know what? We made it. Nobody died, nobody got lost. I'm gonna sleep like a baby tonight, no joke.",
        sentence_ja: "今日はお母さんとお父さんなしでやれるって披露するチャンスだった。で、どうだった？やり遂げたよ。誰も死んでないし、迷子もいない。今夜はぐっすり眠れるよ、マジで。",
        idiom: "sleep like a baby",
        idiom_meaning: "sleep very deeply and peacefully / ぐっすり眠る"
    },
];

async function seedDay42() {
    console.log('Seeding Day 042 -- First Movie Without Parents (words 500-549)...');
    let success = 0;
    let failed = 0;
    let meaningFixed = 0;

    for (const item of DAY42_DATA) {
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

seedDay42();
