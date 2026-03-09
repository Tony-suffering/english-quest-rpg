// Seed Day 043 (words 550-599) -- Feb 25 - Mar 1
// Day 043: Game Night Gone Wrong (大学友人6人, モノポリーナイト)
// ALL sentences are SPOKEN DIALOGUE -- actual things people say out loud
// g-dropping (70-80%), grammar breaking, fillers, real spoken English
// Characters: Marcus(29M, HR guy, Dad bod, peacekeeper tired of peacekeeping, corporate-speak),
//   Jess(28F, Marcus's girlfriend, Korean-American, sweet-then-savage competitor),
//   Trent(28M, disaster friend, appendix out/arm in sling, owes Marcus money, says "bruh"),
//   Nina(27F, quiet one, just quit corporate job, dry humor, devastatingly concise),
//   Devon(30M, rules lawyer, finance guy, pretentious vocab, insecure underneath),
//   Priya(27F, marathon runner, health nut, 150% energy, takes photos of everything)
// Story: 5-day arc. Day 1: Arrivals, food, catching up, performing "I'm fine".
//   Day 2: Monopoly starts, competitive streaks, Devon's rules obsession.
//   Day 3: Drinks loosen tongues, Nina's secret, Trent's debt surfaces.
//   Day 4: Near board-flip, real talk, Marcus snaps, game abandoned.
//   Day 5: Cleanup, hangovers, honest conversation, closer than before.

const DAY43_DATA = [
    // ========== DAY 1 (Feb 25) -- THE SETUP ==========
    {
        id: '0D7mygZB', // derpy
        speaker: "Priya",
        meaning: "おバカな・間抜けな",
        sentence: "OK who let Trent park? His car is like fully diagonal across two spots, it looks SO derpy. I took a photo obviously. But honestly I don't think he's got a chip on his shoulder about it -- he literally doesn't care.",
        sentence_ja: "ちょっと誰がトレントに駐車させたの？車が完全に斜めで2台分使ってるんだけど、超間抜け。もちろん写真撮った。でもまあ本人は別に根に持ってないっていうか -- マジで気にしてない。",
        idiom: "a chip on one's shoulder",
        idiom_meaning: "holding a grudge / 根に持ってる"
    },
    {
        id: '8be0kkNT', // removal of appendix
        speaker: "Trent",
        meaning: "虫垂切除・盲腸の手術",
        sentence: "Bruh so the removal of appendix was supposed to be like a quick thing right? Nah, I woke up and my whole side was on FIRE. Doctor was like 'you'll be fine in a week' -- dude was just shootin' from the hip 'cause it's been three weeks and I still can't lift my arm.",
        sentence_ja: "いやさ盲腸の手術ってすぐ終わるやつだと思ってたじゃん？全然、起きたら横腹が燃えてた。医者が「一週間で治りますよ」って -- あいつ適当に言っただけだよ、もう3週間経つのにまだ腕上がんないんだけど。",
        idiom: "shoot from the hip",
        idiom_meaning: "speak bluntly without thinking / 思ったことをそのまま言う"
    },
    {
        id: 'T4sPG76O', // all bets are off
        speaker: "Marcus",
        meaning: "予測不能・何でもあり",
        sentence: "Alright so ground rules for tonight -- no phones at the table, no side deals, no cryin'. Once we crack open that Monopoly box, all bets are off. And I'm tellin' you, the devil is in the details with this game. Read the cards carefully.",
        sentence_ja: "じゃあ今夜のルール -- テーブルにスマホ禁止、裏取引禁止、泣くの禁止。モノポリーの箱開けたら何でもありだからな。言っとくけど、このゲームは細かいとこで差がつく。カードちゃんと読めよ。",
        idiom: "the devil is in the details",
        idiom_meaning: "small things cause big problems / 悪魔は細部に宿る"
    },
    {
        id: 'TNjhkt30', // Keith
        speaker: "Nina",
        meaning: "キース（堅物のルール厳格者）",
        sentence: "Devon's already readin' the rulebook. Classic Keith move. But watch -- he's a dark horse tonight. Every time we underestimate the rules guy, he wins.",
        sentence_ja: "デヴォンがもうルールブック読んでる。典型的なキース。でも見てて -- 今夜はダークホースだから。ルール厨を舐めるとだいたい負ける。",
        idiom: "a dark horse",
        idiom_meaning: "unexpected contender / ダークホース"
    },
    {
        id: 'ToqacHyd', // grit one's teeth
        speaker: "Jess",
        meaning: "歯を食いしばる",
        sentence: "I grit my teeth every time Marcus says 'let's all just have fun' because he KNOWS I play to win. This is Monopoly, babe. I'm goin' for broke tonight, so don't expect me to go easy on anybody.",
        sentence_ja: "マーカスが「みんな楽しもう」って言うたびに歯を食いしばるんだけど、だって私が勝ちに行くの知ってるくせに。モノポリーだよ？今夜は一か八かでいくから、手加減期待しないで。",
        idiom: "go for broke",
        idiom_meaning: "risk everything / 一か八かやる"
    },
    {
        id: 'aBSuL2ap', // Dad bod
        speaker: "Marcus",
        meaning: "お父さん体型・中年太り",
        sentence: "Yeah I got a Dad bod, what about it. Jess made me join her gym for like a month but I keep my cards close to the chest about whether I actually went. Spoiler -- I mostly sat in the sauna.",
        sentence_ja: "うん、中年太りだけど何か。ジェスにジム入れって言われて一ヶ月だけ入ったけど、実際行ったかどうかは手の内見せない。ネタバレ -- だいたいサウナに座ってた。",
        idiom: "keep one's cards close to the chest",
        idiom_meaning: "not reveal plans / 手の内を見せない"
    },
    {
        id: 'rh2JEOJ3', // bruh
        speaker: "Trent",
        meaning: "おい・マジかよ（驚き・呆れの間投詞）",
        sentence: "Bruh, Devon brought like four different craft beers and nobody's touchin' em. He's over there explainin' the hop profile to Priya who's drinkin' water. You're playin' with fire, man -- she's about to lecture you on liver health.",
        sentence_ja: "おい、デヴォンがクラフトビール4種類くらい持ってきたのに誰も飲んでない。プリヤが水飲んでる横でホップのプロファイル説明してるし。火遊びだよそれ -- 今から肝臓の健康について説教されるぞ。",
        idiom: "play with fire",
        idiom_meaning: "do something risky / 火遊びする"
    },
    {
        id: 'rwXhZWr0', // carb loading
        speaker: "Priya",
        meaning: "カーボローディング・炭水化物の蓄積",
        sentence: "I've been carb loading all day for this, you guys. Rice, pasta, two bananas -- game night is basically a sport for me. And Devon, last time you said my quinoa salad was weird? I had to eat crow and admit your nachos were better, so let's not start tonight.",
        sentence_ja: "今日ずっとカーボローディングしてたんだよ。ご飯、パスタ、バナナ2本 -- ゲームナイトは私にとってスポーツだから。あとデヴォン、前に私のキヌアサラダ変って言ったでしょ？あんたのナチョスの方がおいしいって認めざるを得なかったから、今夜はやめてね。",
        idiom: "eat crow",
        idiom_meaning: "admit you were wrong / 間違いを認める"
    },
    {
        id: 's9wz_0JT', // wait for it
        speaker: "Devon",
        meaning: "ここからがいいんだよ・待って",
        sentence: "So I brought a 2019 hazy IPA -- wait for it -- from a microbrewery that only made forty kegs. Nobody's impressed, I can tell. Fine. But when Trent says he doesn't owe Marcus money, I'm gonna call his bluff, because I was THERE.",
        sentence_ja: "2019年のヘイジーIPA持ってきたんだけど -- ここからがいいんだよ -- 40樽しか作ってないマイクロブルワリーのやつ。誰も感動してないのは分かる。まあいい。でもトレントがマーカスに金借りてないって言ったら、ハッタリ見破るからね、俺あの場にいたし。",
        idiom: "call someone's bluff",
        idiom_meaning: "challenge a false claim / ハッタリを見破る"
    },
    {
        id: 'vAYHwLwQ', // tin cup
        speaker: "Devon",
        meaning: "ブリキのカップ",
        sentence: "Marcus is over here drinkin' out of a tin cup like some kind of artisanal cowboy. I appreciate the aesthetic, I do. But after Trent and Jess had that fight last year, somebody's gotta pick up the pieces tonight, and it's probably gonna be him again.",
        sentence_ja: "マーカスがブリキのカップで飲んでて職人カウボーイみたい。美学は分かる、分かるよ。でも去年トレントとジェスが喧嘩した後、誰かが散らかったもの拾い集めなきゃいけなくて、今夜もたぶんあいつだよ。",
        idiom: "pick up the pieces",
        idiom_meaning: "recover after a mess / 散らかったものを拾い集める"
    },

    // ========== DAY 2 (Feb 26) -- THE GAME BEGINS ==========
    {
        id: '3UIzACRM', // communal
        speaker: "Jess",
        meaning: "共同の・共有の",
        sentence: "I put the banchan out as communal, so everyone just grab what you want. But if Devon touches the japchae one more time without reading between the lines that I'm saving it for Marcus, we're gonna have a problem.",
        sentence_ja: "バンチャンはみんなで食べる用に出したから、好きに取って。でもデヴォンがもう一回チャプチェに手出したら -- マーカスに取っといてるの行間読めよ -- 問題になるからね。",
        idiom: "read between the lines",
        idiom_meaning: "understand hidden meaning / 行間を読む"
    },
    {
        id: '3oTw-5qX', // earth shattering
        speaker: "Devon",
        meaning: "衝撃的な・地球を揺るがすような",
        sentence: "I'm not sayin' my Monopoly strategy is earth shattering, but I've been studyin' optimal property acquisition theory since Thursday. And before someone accuses me of tryin' to move the goalposts -- I'm just playing by the ACTUAL rules.",
        sentence_ja: "俺のモノポリー戦略が衝撃的とは言わないけど、木曜から最適な不動産取得理論を勉強してきた。誰かにゴールポスト動かしてるって言われる前に言うけど -- 俺は本来のルールでやってるだけ。",
        idiom: "move the goalposts",
        idiom_meaning: "change rules unfairly / ゴールポストを動かす"
    },
    {
        id: '6BXQYeCl', // done for
        speaker: "Trent",
        meaning: "もうダメ・終わった",
        sentence: "Bruh I landed on Boardwalk on like my THIRD turn, I'm done for. I got no money, one railroad, and a busted arm. I got egg on my face for talkin' trash earlier about how I was gonna crush everyone.",
        sentence_ja: "おいさ3ターン目でボードウォークに止まっちゃってもう終わり。金ない、鉄道1本、腕壊れてる。さっきみんなぶっ潰すとか言ってたの完全に恥かいたわ。",
        idiom: "have egg on one's face",
        idiom_meaning: "be embarrassed / 恥をかく"
    },
    {
        id: '8a_SwZ0m', // Yom Kippur
        speaker: "Devon",
        meaning: "ヨム・キプル（贖罪の日）",
        sentence: "It's like Yom Kippur for Trent's bank account right now -- a day of atonement for all the bad financial decisions. Don't pass the buck to Marcus when you go bankrupt though, man. You owe him enough already.",
        sentence_ja: "今トレントの銀行口座にとってはヨム・キプルだね -- 全ての悪い金銭決断の贖罪の日。でも破産した時にマーカスに責任転嫁するなよ。もう十分借りてるんだから。",
        idiom: "pass the buck",
        idiom_meaning: "shift blame / 責任転嫁する"
    },
    {
        id: 'EM49Z9or', // short hop
        speaker: "Marcus",
        meaning: "ショートホップ・すぐそこ",
        sentence: "Priya's apartment is just a short hop from mine so she's always the first one here. I didn't wanna twist her arm to bring snacks again but she showed up with like three bags. She doesn't know how to do anything halfway.",
        sentence_ja: "プリヤのアパートはうちからすぐそこだからいつも一番乗り。またおやつ持ってきてって無理やり頼みたくなかったけど、3袋くらい持って現れた。あの子は何でも中途半端ができない。",
        idiom: "twist someone's arm",
        idiom_meaning: "persuade reluctantly / 無理やり説得する"
    },
    {
        id: 'Kn7ZZiTR', // so much for
        speaker: "Nina",
        meaning: "～はこれでおしまい・台無しだ",
        sentence: "So much for Marcus's 'no side deals' rule -- Jess and Priya are already whisperin' about a trade. Everyone's focused on the small stuff and missing the forest for the trees. Devon's quietly buying everything.",
        sentence_ja: "マーカスの「裏取引禁止」ルール台無しだね -- ジェスとプリヤがもうトレードの相談してる。みんな細かいことに集中して木を見て森を見ずだよ。デヴォンが静かに全部買ってる。",
        idiom: "miss the forest for the trees",
        idiom_meaning: "miss the big picture / 木を見て森を見ず"
    },
    {
        id: 'n1oaHx01', // gumball
        speaker: "Priya",
        meaning: "ガムボール",
        sentence: "I brought a gumball machine as a prop for whoever wins! I know, I know, it's extra. But I've been runnin' circles around you guys in board games since college and I plan to keep that streak alive.",
        sentence_ja: "勝った人用にガムボールマシン持ってきた！分かってる分かってる、やりすぎって。でも大学の時からボードゲームでみんなを圧倒してきたわけで、その連勝記録は守るつもり。",
        idiom: "run circles around",
        idiom_meaning: "easily outperform / 圧倒する"
    },
    {
        id: 'st2ZBFDm', // urbane
        speaker: "Nina",
        meaning: "洗練された・都会的な",
        sentence: "Devon acts all urbane with his craft beer and wool cardigan but he just asked if Baltic Avenue was a real place. He thinks he holds all the cards but honestly the man's bluffin'.",
        sentence_ja: "デヴォンがクラフトビールとウールのカーディガンで洗練されたフリしてるけど、バルティック・アベニューが実在するか聞いてきた。全ての切り札持ってるつもりだけど正直ハッタリだよ。",
        idiom: "hold all the cards",
        idiom_meaning: "have all the power / 全ての切り札を持つ"
    },
    {
        id: 't337Xsjk', // punch out
        speaker: "Trent",
        meaning: "タイムカードを押して退勤する・殴り倒す",
        sentence: "I'm about to punch out of this game emotionally, bruh. I already owe like two thousand in fake money. I painted myself into a corner by mortgagin' everything on turn five. Classic Trent move.",
        sentence_ja: "もう精神的にこのゲームからタイムカード押したい。もうゲーム内の借金2千ドルくらいある。5ターン目に全部抵当に入れて自分で自分を追い詰めた。いつものトレントだよ。",
        idiom: "paint oneself into a corner",
        idiom_meaning: "create impossible situation / 自分で自分を追い詰める"
    },
    {
        id: 'y7qm4yFw', // on a dime
        speaker: "Jess",
        meaning: "瞬時に・一瞬で",
        sentence: "I can switch strategies on a dime -- that's why I always win. Like right now everyone thinks I'm goin' for railroads but I'm actually -- wait, let me play devil's advocate here, what if NOBODY buys the greens?",
        sentence_ja: "戦略を瞬時に切り替えられる -- だからいつも勝つの。今みんな私が鉄道狙いだと思ってるけど実は -- 待って、あえて反対意見言うけど、誰もグリーン買わなかったらどうなる？",
        idiom: "play devil's advocate",
        idiom_meaning: "argue opposing side / 悪魔の代弁者になる"
    },

    // ========== DAY 3 (Feb 27) -- THE UNRAVELING ==========
    {
        id: '-mD0j9nm', // that ship has sailed
        speaker: "Nina",
        meaning: "もう手遅れ・その船は出た",
        sentence: "Devon asked if we could restart with different rules. That ship has sailed, man. We're three hours in. I'm between a rock and a hard place here too but you don't see me askin' for a do-over.",
        sentence_ja: "デヴォンがルール変えてやり直したいって。もう手遅れだよ。3時間経ってるんだから。私も板挟みだけど、やり直し頼んだりしてないでしょ。",
        idiom: "between a rock and a hard place",
        idiom_meaning: "impossible choice / 板挟み"
    },
    {
        id: '5QBRz1Hf', // bad faith
        speaker: "Devon",
        meaning: "不誠実・悪意",
        sentence: "I'm not accusin' anyone of acting in bad faith, but Jess traded Nina a monopoly for one railroad and NOBODY questioned it. That's a wolf in sheep's clothing deal if I've ever seen one. I'm just pointing out the optics here.",
        sentence_ja: "誰かが不誠実にやってるとは言わないけど、ジェスがニナにモノポリー1セットを鉄道1本と交換して誰も疑問に思わなかった。あれは完全に羊の皮を被った狼な取引だよ。客観的に指摘してるだけ。",
        idiom: "a wolf in sheep's clothing",
        idiom_meaning: "deceptive person / 羊の皮を被った狼"
    },
    {
        id: '7olBnV5B', // korean banchan
        speaker: "Jess",
        meaning: "韓国のバンチャン（おかず・小皿料理）",
        sentence: "My mom spent like four hours makin' that korean banchan and Trent just double-dipped the kimchi with a chip he already bit. I love you Trent but you're really pourin' salt on the wound right now because my mom specifically asked if you guys had manners.",
        sentence_ja: "うちのお母さんが4時間くらいかけて韓国のバンチャン作ったのに、トレントがかじったチップスでキムチ二度漬けした。トレントのこと好きだけど、マジで傷口に塩塗ってるよ、お母さんがわざわざ「みんな行儀いい？」って聞いてきたのに。",
        idiom: "pour salt on the wound",
        idiom_meaning: "make bad situation worse / 傷口に塩を塗る"
    },
    {
        id: 'MaceBw9Y', // knock off perch
        speaker: "Trent",
        meaning: "王座から引きずり下ろす",
        sentence: "Bruh I just landed on Devon's hotel and it knocked him off his perch when I said I literally cannot pay. Dude's face went white. The jig is up, man -- I got nothin'. Like actually nothin'. Not even the railroads.",
        sentence_ja: "おい今デヴォンのホテルに止まって、マジで払えないって言ったら王座から引きずり下ろされた顔してた。顔真っ白。もうバレたよ -- マジで何もない。鉄道すらない。",
        idiom: "the jig is up",
        idiom_meaning: "deception discovered / ばれた"
    },
    {
        id: 'cqpHA0NJ', // dominion
        speaker: "Devon",
        meaning: "支配権・領土",
        sentence: "My dominion over the orange properties is ABSOLUTE. I have hotels on all three. But somehow the game is dead in the water because nobody has enough cash to actually pay rent. This is a liquidity crisis, people.",
        sentence_ja: "オレンジの不動産に対する俺の支配権は絶対だ。3つ全部にホテル建てた。でもなぜか家賃払える現金が誰にもなくてゲームが行き詰まってる。流動性危機だよこれは。",
        idiom: "dead in the water",
        idiom_meaning: "stalled, no progress / 行き詰まって動けない"
    },
    {
        id: 'dghaCyuC', // the worst kept secret
        speaker: "Marcus",
        meaning: "公然の秘密",
        sentence: "Look, it's the worst kept secret that Trent owes me eight hundred bucks from two years ago. I didn't bring it up but since we're all sittin' here... we all got skeletons in the closet, right? It's fine. It's whatever.",
        sentence_ja: "ほら、トレントが2年前から俺に800ドル借りてるのは公然の秘密でしょ。俺から言い出したくなかったけど、こうしてみんな座ってるし...隠し事は誰にでもあるよね？大丈夫。別にいいよ。",
        idiom: "skeletons in the closet",
        idiom_meaning: "hidden shameful secrets / 隠された秘密"
    },
    {
        id: 'fPgUJz66', // apostatize
        speaker: "Nina",
        meaning: "背教する・信仰を捨てる",
        sentence: "I basically had to apostatize from the whole corporate religion to leave my job. HR, KPIs, quarterly reviews -- none of it meant anything. I felt like a square peg in a round hole for three years. So I quit.",
        sentence_ja: "会社辞めるのは基本的に企業宗教からの背教だった。人事、KPI、四半期レビュー -- 全部意味なかった。3年間ずっと場違いな気がしてた。だから辞めた。",
        idiom: "a square peg in a round hole",
        idiom_meaning: "someone who doesn't fit / 場違いな人"
    },
    {
        id: 'mArxqvl4', // formication
        speaker: "Priya",
        meaning: "蟻走感（皮膚の上を虫が這うような感覚）",
        sentence: "So I read about formication -- it's this thing where your skin feels like bugs are crawlin' on it? I get it sometimes after really long runs. Totally unrelated but Nina, you had to swallow your pride to quit that job, right? Like that takes guts.",
        sentence_ja: "蟻走感について読んだんだけど -- 皮膚の上を虫が這ってるみたいに感じるやつ？めっちゃ長く走った後にたまになる。全然関係ないけどニナ、あの仕事辞めるのプライド飲み込んだよね？勇気いるよそれ。",
        idiom: "swallow one's pride",
        idiom_meaning: "humble oneself / プライドを飲み込む"
    },
    {
        id: 'oPAzj8vQ', // dolt
        speaker: "Trent",
        meaning: "バカ・のろま",
        sentence: "OK I know I'm a dolt for not payin' Marcus back sooner, I GET it. Everyone can stop with the looks. I'm just gonna lay all my cards on the table -- I was broke, then I got sick, and now I'm like... still broke. But I'm gonna pay it back.",
        sentence_ja: "マーカスにもっと早く返さなかったの俺がバカなのは分かってる。みんなそういう目で見るのやめて。手の内全部見せるわ -- 金なくて、病気になって、で今...まだ金ない。でも返すから。",
        idiom: "lay all cards on the table",
        idiom_meaning: "be completely honest / 手の内を全部見せる"
    },
    {
        id: 'w-o5DLBY', // at will employment
        speaker: "Marcus",
        meaning: "随意雇用（いつでも解雇可能な雇用形態）",
        sentence: "Nina, I work in HR, I KNOW about at will employment -- they can fire you for anything or nothin'. But you quit on your own terms, and that matters. I mean, blood is thicker than water, and we're basically family at this table, so... we got you.",
        sentence_ja: "ニナ、俺HR勤めだから随意雇用のことは分かる -- 何でも理由なしでもクビにできるやつ。でもお前は自分の意志で辞めた、それが大事。血は水よりも濃いっていうか、このテーブルはもう家族みたいなもんだから...味方だよ。",
        idiom: "blood is thicker than water",
        idiom_meaning: "family bonds are strongest / 血は水よりも濃い"
    },

    // ========== DAY 4 (Feb 28) -- THE FIGHT & THE FIX ==========
    {
        id: '7Ty3fdxM', // mjolnir
        speaker: "Trent",
        meaning: "ムジョルニル（トールの雷のハンマー）",
        sentence: "Bruh when Marcus slammed his hand on the table it was like mjolnir comin' down, I swear the board jumped. But he's right though. Come hell or high water, we gotta talk about the stuff we've been avoidin'.",
        sentence_ja: "おいマーカスがテーブル叩いた時マジでムジョルニルが降ってきたみたいで、ボード跳ねたもん。でもあいつ正しいんだよ。何が何でも、避けてきたこと話さなきゃいけない。",
        idiom: "come hell or high water",
        idiom_meaning: "no matter what / 何が何でも"
    },
    {
        id: 'CMYlg3ts', // foreplay
        speaker: "Nina",
        meaning: "前戯・前振り",
        sentence: "Can we skip the foreplay and just say what everyone's thinking? Marcus is exhausted from keepin' this group together. We all see it. He crossed the Rubicon when he yelled just now -- there's no pretending we're fine anymore.",
        sentence_ja: "前振りすっ飛ばしてみんなが思ってること言わない？マーカスがこのグループまとめるのに疲弊してるの、みんな分かってるでしょ。さっき叫んだ時点で後戻りできない一線越えた -- もう大丈夫なフリはできない。",
        idiom: "cross the Rubicon",
        idiom_meaning: "pass point of no return / 後戻りできない一線を越える"
    },
    {
        id: 'O5c-1_XP', // put out of misery
        speaker: "Marcus",
        meaning: "楽にしてやる・苦しみから解放する",
        sentence: "Somebody just put this game out of its misery, please. I can't keep smilin' and actin' like everything's cool when it's not. We've been kickin' the can down the road on real conversations for what, two years now? I'm done.",
        sentence_ja: "誰かこのゲーム楽にしてやって。大丈夫なフリして笑ってるの、もう無理。ちゃんとした会話をもう何年先送りにしてきた？2年？もういいよ。",
        idiom: "kick the can down the road",
        idiom_meaning: "postpone a problem / 問題を先送りにする"
    },
    {
        id: 'Q0lXJLHH', // hard cash
        speaker: "Trent",
        meaning: "現金・現ナマ",
        sentence: "Look, Marcus, I don't have the hard cash right now but I swear on my life I'm gonna get it to you. I know it looks like I'm robbin' Peter to pay Paul with my credit cards but I got a plan. Kinda. Mostly. I got a direction.",
        sentence_ja: "なあマーカス、今現ナマはないけど命かけて返すから。クレジットカードであちらを立てればこちらが立たずってのは分かるけど、計画はある。たぶん。だいたい。方向性はある。",
        idiom: "rob Peter to pay Paul",
        idiom_meaning: "solve one problem by creating another / あちらを立てればこちらが立たず"
    },
    {
        id: 'TOR2rKNw', // junket
        speaker: "Devon",
        meaning: "視察旅行・接待旅行",
        sentence: "I went on a work junket to Napa last month and the whole time I kept thinkin' about how you guys would love it there. Then I realized we never hang out anymore. The grass is always greener, but maybe what we had was already good enough.",
        sentence_ja: "先月ナパに接待旅行行って、その間ずっとみんなだったらここ好きだろうなって思ってた。で、もう全然遊んでないことに気づいた。隣の芝は青いって言うけど、今あるものがもう十分良かったのかもしれない。",
        idiom: "the grass is greener on the other side",
        idiom_meaning: "elsewhere seems better / 隣の芝は青い"
    },
    {
        id: 'Uk8Ux8VU', // chicken scratch
        speaker: "Jess",
        meaning: "ミミズが這ったような字",
        sentence: "Trent's IOU to Marcus was literally chicken scratch on a napkin -- I found it in Marcus's jacket pocket last year. He never said anything about it 'cause he's too nice. I drew a blank on how much it was but Marcus remembers every penny.",
        sentence_ja: "トレントのマーカスへの借用書って、ナプキンにミミズが這ったような字で書いてあった -- 去年マーカスのジャケットのポケットで見つけた。優しすぎて何も言わなかった。金額思い出せなかったけどマーカスは1円まで覚えてる。",
        idiom: "draw a blank",
        idiom_meaning: "unable to remember / 思い出せない"
    },
    {
        id: 'Uq1b_-Ie', // jump rope
        speaker: "Priya",
        meaning: "縄跳び",
        sentence: "I brought my jump rope in case we needed an energy break! Nobody? OK that's fine. Honestly tonight feels like we're all flyin' by the seat of our pants emotionally and I don't really know how to help except... jump rope? No? OK.",
        sentence_ja: "エネルギー補給に縄跳び持ってきたんだけど！誰も？OK大丈夫。正直今夜はみんな感情的に行き当たりばったりで、どう助けたらいいか分からない...縄跳びする？しない？OK。",
        idiom: "fly by the seat of one's pants",
        idiom_meaning: "improvise / 行き当たりばったりでやる"
    },
    {
        id: 'jiY35XCc', // crabbed
        speaker: "Marcus",
        meaning: "不機嫌な・気難しい",
        sentence: "Yeah I've been crabbed all night and I'm sorry. I hold stuff in until I can't anymore, that's my thing. But listen -- Trent, the money, Nina's job, Devon feelin' like nobody respects him -- let's just let bygones be bygones and actually talk like adults for once.",
        sentence_ja: "うん、今夜ずっと不機嫌だったのはごめん。溜め込んでもう無理ってなるのが俺のパターン。でも聞いて -- トレントの金、ニナの仕事、デヴォンが尊敬されてないと感じてること -- 過去のことは水に流して、一回大人として本気で話そう。",
        idiom: "let bygones be bygones",
        idiom_meaning: "forget past disagreements / 過去のことは水に流す"
    },
    {
        id: 'pbklYA0I', // blue zone
        speaker: "Priya",
        meaning: "ブルーゾーン（長寿地域）",
        sentence: "You know what they have in every blue zone? Like Okinawa, Sardinia? Strong friend groups. People who show up for each other. And Devon, I know I took the wind out of your sails earlier about the beer, and that wasn't cool. I'm sorry.",
        sentence_ja: "ブルーゾーンに共通してるの何か知ってる？沖縄とかサルデーニャとか？強い友達グループ。お互いのために駆けつける人たち。あとデヴォン、さっきビールのこと出鼻くじいてごめん。よくなかった。",
        idiom: "take the wind out of someone's sails",
        idiom_meaning: "deflate, discourage / 出鼻をくじく"
    },
    {
        id: 'zOsR8vde', // monopoly
        speaker: "Devon",
        meaning: "モノポリー（独占）",
        sentence: "The irony is that monopoly -- the concept, the game, all of it -- it's supposed to show how unfair capitalism is. And here we are, fightin' over fake money while ignorin' real problems. Out of the frying pan into the fire, aren't we.",
        sentence_ja: "皮肉なのは、モノポリー -- コンセプトもゲームも全部 -- 資本主義の不公平さを示すためのものだってこと。で俺たちは偽金で喧嘩しながら本当の問題を無視してる。一難去ってまた一難だよ。",
        idiom: "out of the frying pan into the fire",
        idiom_meaning: "from bad to worse / 一難去ってまた一難"
    },

    // ========== DAY 5 (Mar 1) -- THE MORNING AFTER ==========
    {
        id: '8NqHKmQV', // milkweed
        speaker: "Nina",
        meaning: "トウワタ（植物）",
        sentence: "There's milkweed growin' in Marcus's backyard and the butterflies are wild out there this morning. I guess quitting my job was like that -- off the beaten path, but maybe that's where the good stuff grows.",
        sentence_ja: "マーカスの裏庭にトウワタが生えてて、今朝蝶がすごいの。仕事辞めたのもそういう感じかも -- 型にはまらない道だけど、いいものが育つのはそういう場所なのかも。",
        idiom: "off the beaten path",
        idiom_meaning: "unconventional / 型にはまらない"
    },
    {
        id: 'B8RRk0-b', // peruse
        speaker: "Devon",
        meaning: "じっくり読む・精読する",
        sentence: "I was perusin' through old group chat messages this morning and we used to text every single day. I miss that. I know people say a leopard can't change its spots but I wanna try bein' less... Devon about things.",
        sentence_ja: "今朝グループチャットの昔のメッセージをじっくり読んでたんだけど、昔は毎日メッセージしてた。懐かしい。人は変わらないって言うけど、もうちょっと...デヴォンっぽくないようにしたい。",
        idiom: "a leopard can't change its spots",
        idiom_meaning: "people don't change / 人は本質的に変わらない"
    },
    {
        id: 'F3jyrpX6', // fever dream
        speaker: "Trent",
        meaning: "熱にうなされた夢・非現実的な体験",
        sentence: "Bruh last night was a fever dream. Marcus yelled, Nina dropped her job bombshell, I cried about money. But like, we're all cut from the same cloth, you know? Same dumb college kids just... older and more tired.",
        sentence_ja: "いやさ昨夜は熱にうなされた夢みたいだった。マーカスが叫んで、ニナが退職爆弾落として、俺は金のことで泣いた。でもさ、俺たち似た者同士じゃん？同じバカな大学生が...歳取って疲れただけ。",
        idiom: "cut from the same cloth",
        idiom_meaning: "very similar / 同じ布から切り出された＝似た者同士"
    },
    {
        id: 'GhR3UcJs', // wook
        speaker: "Jess",
        meaning: "ウーク（フェス系のだらしない人）",
        sentence: "Trent looks like a total wook right now with that blanket wrapped around him and the bedhead. Love you though. Honestly this is the first time we've all been real with each other and it feels like gettin' my feet wet in somethin' new.",
        sentence_ja: "トレント今ブランケット巻いて寝癖で完全にウークみたい。でも好きだよ。正直みんなで本音で話したの初めてで、何か新しいことに初めて挑戦してる感じ。",
        idiom: "get one's feet wet",
        idiom_meaning: "try something new / 初めて挑戦する"
    },
    {
        id: 'KstvoSQp', // a tempest in a teapot
        speaker: "Marcus",
        meaning: "コップの中の嵐",
        sentence: "You know what, maybe the Monopoly fight was a tempest in a teapot. The game didn't matter -- it was just the excuse we needed to stop pretendin'. And now it's the calm after the storm, and I kinda like this part better.",
        sentence_ja: "ほら、モノポリーの喧嘩はコップの中の嵐だったのかも。ゲームはどうでもよくて -- フリをやめるための口実が必要だっただけ。で今は嵐の後の静けさで、こっちの方が好きかも。",
        idiom: "the calm after the storm",
        idiom_meaning: "peace following chaos / 嵐の後の静けさ"
    },
    {
        id: 'XipABGHX', // set out
        speaker: "Priya",
        meaning: "出発する・着手する",
        sentence: "I'm gonna set out on a run before everyone wakes up fully -- who wants to come? No? OK one day I'll convert you guys. But for real, I think we should take a page from last night's book and do this more often. The honest part, not the cryin' part.",
        sentence_ja: "みんなが完全に起きる前にランニング出発するけど -- 誰か来る？来ない？OKいつか改宗させるから。でもマジで、昨夜を見習ってもっと頻繁にやるべき。正直に話す方ね、泣く方じゃなくて。",
        idiom: "take a page from someone's book",
        idiom_meaning: "learn from someone / 人の真似をする"
    },
    {
        id: 'bw9mVu5l', // hike up
        speaker: "Priya",
        meaning: "引き上げる・つり上げる",
        sentence: "Can someone help me hike up this cooler onto the counter? It's heavy. Also I just realized -- me doin' fitness stuff and Devon doin' finance stuff, we're like two sides of the same coin. Both tryin' way too hard to prove somethin'.",
        sentence_ja: "このクーラーボックスをカウンターに引き上げるの手伝って？重い。あと今気づいたけど -- 私がフィットネスでデヴォンがファイナンス、表裏一体じゃん。どっちも何か証明しようとしすぎてる。",
        idiom: "two sides of the same coin",
        idiom_meaning: "two aspects of same thing / 表裏一体"
    },
    {
        id: 'oIKtK17-', // orange brown
        speaker: "Marcus",
        meaning: "オレンジブラウン",
        sentence: "The sunrise is this weird orange brown color this mornin'. Kinda beautiful actually. Hey, about last night -- I won the argument but I didn't win it fair and square. I yelled. That's not how I wanna be.",
        sentence_ja: "今朝の日の出がなんか変なオレンジブラウンの色してる。結構きれいかも。なあ、昨夜のことだけど -- 議論には勝ったけど正々堂々じゃなかった。叫んだ。そういう自分でいたくない。",
        idiom: "fair and square",
        idiom_meaning: "honestly / 正々堂々と"
    },
    {
        id: 'qu3-JRBf', // cinematic
        speaker: "Jess",
        meaning: "映画的な・シネマティック",
        sentence: "Last night was weirdly cinematic -- like if someone made a movie about six idiots cryin' over Monopoly, I'd watch it. Marcus cleanin' up the board at 2am, Nina smokin' on the porch alone... the whole ball of wax was just painfully real.",
        sentence_ja: "昨夜はなんか映画的だった -- 6人のバカがモノポリーで泣く映画があったら見るわ。マーカスが夜中2時にボード片付けて、ニナが一人でポーチでタバコ吸って...全部まるごと痛いくらいリアルだった。",
        idiom: "the whole ball of wax",
        idiom_meaning: "everything / 全部まるごと"
    },
    {
        id: 'uV9tCAOU', // reimagine
        speaker: "Nina",
        meaning: "再構築する・一から考え直す",
        sentence: "I think we all need to reimagine what this friend group looks like going forward. Less performin', more of... this. Morning coffee, honest hangovers, ugly truths. And yeah, I'm hedgin' my bets on all of you. That's the scariest part.",
        sentence_ja: "これからこの友達グループがどうあるべきか、みんなで再構築する必要があると思う。フリを減らして、もっと...これ。朝のコーヒー、正直な二日酔い、きつい本音。うん、みんなに賭けてる。それが一番怖い。",
        idiom: "hedge one's bets",
        idiom_meaning: "reduce risk / リスクを分散する"
    },
];

async function seedDay43() {
    console.log('Seeding Day 043 -- Game Night Gone Wrong (words 550-599)...');
    let success = 0;
    let failed = 0;
    let meaningFixed = 0;

    for (const item of DAY43_DATA) {
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

seedDay43();
