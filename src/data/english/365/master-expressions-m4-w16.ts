/**
 * 365 English Master -- Month 4 Week 16: エンタメ英語 (Entertainment English)
 * Days 112-120: 90 expressions
 * Month: July 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 4 (2026-07) -- WEEK 16
// ============================================================

export const MONTH4_W16_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 112: スポーツ観戦 (Watching Sports)
    // Scene: 居酒屋のテレビで野球中継。ゴンドが解説者気取りで語り始める。
    // ────────────────────────────────────────────────────

    {
        daySlot: 112, japanese: '今日の試合どうなった？',
        english: [
            'How did the game go?',
            'Hey, how did the game go today?',
            'I missed the game today. Did we win? What happened?',
            'Let\'s make the most of it!',
        ],
        context: 'How did the game go? は「試合どうだった？」の定番。日本語は「どうなった？」と結果を聞くけど、英語は go を使って「どう進んだ？」と過程を聞く構造。spoilers はスポーツでも使う。score alert は「速報通知」。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'いい試合だったよ',
        english: [
            'It was a great game.',
            'It was a really good game actually.',
            'You missed a great game. It went down to the wire.',
            'Right? I was just thinking that.',
        ],
        context: 'went down to the wire は「最後の最後まで接戦だった」。wire は競馬のゴールに張ってあったワイヤーが語源。closer は「抑え投手」。fell apart は「崩れた」。erupted は「爆発した（歓声）」。スポーツの興奮を伝える表現はどれも大げさなのが英語の特徴。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'あのプレー見た？',
        english: [
            'Did you see that play?',
            'Wait, did you see that play? Unreal.',
            'Tell me you saw that catch. That was the play of the year.',
            'Go on, I\'m listening!',
        ],
        context: 'unreal は「信じられない」。diving catch は「ダイビングキャッチ」。horizontal は「水平」。held onto は「掴み続けた」。highlight は「ハイライト」。英語圏のスポーツトークは replay を何回見たかが熱量のバロメーター。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: '審判ひどくない？',
        english: [
            'That ref is terrible.',
            'Are you kidding me? That call was awful.',
            'That umpire has been missing calls all night. Both teams should be frustrated.',
            'Oh wow, good to know!',
        ],
        context: 'ref は referee の略、umpire は野球の審判。missing calls は「判定を間違える」。biased は「偏っている」。come on は「おいおい」。英語圏では審判への文句はスポーツ観戦の必須科目。ref と ump はスポーツによって使い分ける。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'スポーツバーで見ようよ',
        english: [
            'Let us watch it at a sports bar.',
            'We should hit up a sports bar for the game.',
            'The game starts at seven. Let us find a sports bar with a big screen and grab some wings.',
            'Did you catch the game? It was insane.',
        ],
        context: 'hit up は「行く」のカジュアル版。grab some wings は「手羽先を食べる」。cranked up は「音量を上げた」。losing their minds は「大興奮している」。英語圏の sports bar 文化は日本のスポーツバーとかなり違って、見知らぬ人同士がハイタッチする世界。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'あの選手すごいね',
        english: [
            'That player is something else.',
            'He is on a completely different level from everyone else.',
            'I have been watching this sport for twenty years and he might be the most talented player I have ever seen.',
            'Oh wow, you\'re right! Good eye.',
        ],
        context: 'something else は「別格」。on a different level は「レベルが違う」。generational talent は「世代に一人の才能」。come around は「現れる」。effortless は「楽々と」。選手の凄さを語るとき、英語は once every thirty years のように時間軸で表現するのが好き。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'ルールよくわからないんだけど',
        english: [
            'I do not really get the rules.',
            'Can someone explain the rules to me? I am lost.',
            'I want to watch but I have no idea what is going on. Why did they stop playing just now?',
            'No worries! Let me break it down for you.',
        ],
        context: 'I am lost は「さっぱりわからない」。offsides は「オフサイド」。hand signal は「ハンドサイン」。too embarrassed to ask は「恥ずかしくて聞けない」。スポーツのルールがわからないのは英語圏でもあるある。pretending to understand は共感度が高い。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: '延長戦になりそう',
        english: [
            'It might go into overtime.',
            'This looks like it is heading to overtime.',
            'The way this game is going, we are definitely looking at extra time.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'overtime は「延長戦」。winding down は「残り時間が減っている」。extra time はサッカーで使う言い方。a zombie at work は「仕事中にゾンビ状態」。英語では overtime(アメリカ)と extra time(イギリス)でスポーツによって使い分ける。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: 'ハーフタイムだって',
        english: [
            'It is halftime.',
            'Halftime. Let us grab another round.',
            'OK it is halftime. Perfect timing to get more drinks and hit the restroom.',
            'Nailed it! Couldn\'t agree more.',
        ],
        context: 'halftime は「ハーフタイム」。grab another round は「もう一杯ずつ注文する」。came out swinging は「最初から全力で攻めた」。pulled the starter は「先発を引っ込めた」。my round は「ここは俺が奢る」。round は全員分を一人が買う飲み方。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 112, japanese: '生で見たいなあ',
        english: [
            'I want to see it live.',
            'I would love to see a game live someday.',
            'Watching on TV is fun but nothing beats being there in person. The energy is completely different.',
            'Yeah, totally! That\'s a great point.',
        ],
        context: 'live は「生で」。nothing beats は「〜に勝るものはない」。in person は「現場で」。on another level は「次元が違う」。save up は「お金を貯める」。日本語の「生で見たい」の「生」は英語では live。in person でも通じるが live のほうがスポーツ向き。',
        character: 'yuki', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 113: 推し活 (Fan Culture)
    // Scene: ミナが推しアイドルのグッズを大量に見せびらかす。全員引き気味。
    // ────────────────────────────────────────────────────

    {
        daySlot: 113, japanese: '推しがいるんだよね',
        english: [
            'I have a bias.',
            'So I have this one person I am completely obsessed with.',
            'There is this one member in the group who I am totally devoted to. He is my absolute favorite.',
            'Interesting! Tell me more about that.',
        ],
        context: 'bias はK-POPファン用語で「推し」。英語圏では fave(favorite の略)や stan も使う。devoted は「献身的な」。obsessed は「取り憑かれた」。日本語の「推し」は英語に直訳しにくくて、my bias, my fave, I stan で状況によって使い分ける。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'グッズ全部集めてる',
        english: [
            'I collect all the merch.',
            'I have every single piece of merchandise they have ever released.',
            'My room is basically a shrine at this point. I have every album, every photocard, every limited edition item.',
            'Ha, that\'s so true! Love it.',
        ],
        context: 'merch は merchandise の略で「グッズ」。shrine は「神社」だけどファンの文脈では「聖地のような部屋」。photocard は「フォトカード」。pop-up shop は「期間限定ショップ」。you cannot put a price on happiness は皮肉込みの定番フレーズ。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'ファンミーティング行ってきた',
        english: [
            'I went to a fan meeting.',
            'I just got back from a fan meeting and I am still shaking.',
            'I actually got to meet them in person. My heart was pounding the entire time.',
            'Ugh, those things always take forever.',
        ],
        context: 'fan meeting は日本語と同じだけど英語では meet and greet のほうが一般的。my mind went blank は「頭が真っ白になった」。live off that smile は「あの笑顔で5年は生きていける」。rehearsed は「練習した」。推しに会ったときの緊張は世界共通。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'それオタクじゃん',
        english: [
            'That is so nerdy.',
            'Dude, you are a total superfan.',
            'I am not judging but that is some serious dedication right there.',
            'Oh yeah, that makes a lot of sense.',
        ],
        context: 'nerdy は「オタクっぽい」。superfan は「超ファン」。dedication は「献身」。with a straight face は「真顔で」。committed to an institution は「施設に入れられる(精神病院)」のジョーク。double standard は「ダブルスタンダード」。英語圏でもオタクいじりは定番の友達トーク。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: '新曲がやばい',
        english: [
            'The new song is fire.',
            'Have you heard the new single? It is an absolute banger.',
            'They just dropped a new track and I have had it on repeat all day. It is so good.',
            'Wait, good yabai or bad yabai?',
        ],
        context: 'fire は「最高」のスラング。banger は「めちゃくちゃいい曲」。dropped は「リリースした」。hook は「サビの一番キャッチーな部分」。bridge は「Bメロとサビの間の部分」。bass drops は「ベースが落ちる(重低音が入る)」。outdid themselves は「自分たちを超えた」。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: '推しが引退したらどうしよう',
        english: [
            'What if they retire?',
            'I honestly do not know what I would do if they retired.',
            'The thought of them disbanding keeps me up at night. I am not ready for that.',
            'Born ready! Let\'s go.',
        ],
        context: 'disband は「解散する」。keeps me up at night は「夜も眠れないくらい心配」。revolves around は「〜を中心に回っている」。live in denial は「現実を受け入れずに生きる」。推しの引退への恐怖は英語圏のファンダムでも huge topic。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'ライブ最高だった',
        english: [
            'The concert was amazing.',
            'Best concert I have ever been to. Hands down.',
            'I still have goosebumps from last night. The energy in that arena was unreal.',
            'Totally! Best one yet.',
        ],
        context: 'hands down は「文句なしに」。goosebumps は「鳥肌」。lost it は「大興奮した」。at the top of their lungs は「声の限り」。broke down crying は「泣き崩れた」。encore は「アンコール」。acoustic version は「アコースティック版」。ライブの感想は英語でも最上級表現を連発する。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: '推しにお金使いすぎ',
        english: [
            'I spend too much on my faves.',
            'My fan spending is kind of out of control honestly.',
            'I did the math and I have spent more on merchandise this year than on groceries. That is probably a problem.',
            'Let me take a look. Maybe I can help.',
        ],
        context: 'out of control は「制御不能」。resellers は「転売ヤー」。a beater は「ボロ車」。investing in experiences は「経験に投資している」のジョーク。日本語の「推し活に使いすぎ」は英語で fan spending is out of control と表現する。refuse to feel bad は「後悔しないことにしている」。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: 'ファン同士の繋がりがいい',
        english: [
            'The fan community is great.',
            'One of the best parts is the friends I have made through the fandom.',
            'I never expected it but the fan community has given me some of my closest friendships.',
            'Wait, really?! That\'s fascinating.',
        ],
        context: 'fandom は「ファンダム(ファンの集合体)」。bonded は「絆が生まれた」。rough patch は「つらい時期」。check on は「安否確認する」。dismiss as silly は「くだらないと切り捨てる」。英語圏でもファンコミュニティの温かさは意外と語られるトピック。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 113, japanese: '推し活は自分への投資だから',
        english: [
            'Supporting my faves is self-care.',
            'I see it as investing in my own happiness.',
            'Some people spend money on therapy. I spend money on concert tickets. Same thing.',
            'Yeah, I can totally see that.',
        ],
        context: 'self-care は「セルフケア」。same thing は「同じことでしょ」のジョーク。mood shifts は「気分が変わる」。last I checked は「私の知る限り」。destructive は「破壊的な」。推し活を self-care と言い切る論法は英語圏のファンダムで定番の自己正当化フレーズ。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 114: 試合結果 (Game Results)
    // Scene: 朝の居酒屋仕込み中にケンジが昨夜の試合結果を報告。勝敗で一喜一憂。
    // ────────────────────────────────────────────────────

    {
        daySlot: 114, japanese: '勝ったよ！',
        english: [
            'We won!',
            'We won! I cannot believe it!',
            'We actually pulled it off. I am still in shock. What a game.',
            'Ha, that\'s a great way to put it!',
        ],
        context: 'pulled it off は「やり遂げた」。blow it は「台無しにする」。clutch は「土壇場で決める」。went nuclear は「大爆発した」。banged on the wall は「壁をドンドン叩いた」。英語圏では自分のチームを we と呼ぶのが普通。日本語でも「勝った！」と言うけど、英語の we はもっと一体感が強い。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '負けた。最悪。',
        english: [
            'We lost. I am devastated.',
            'We lost and I do not want to talk about it.',
            'They had it in the bag and they blew it in the last five minutes. I want to cry.',
            'Say no more! Let\'s make it happen.',
        ],
        context: 'devastated は「打ちのめされた」。had it in the bag は「勝ちを確信していた」。blew it は「台無しにした」。collapsed は「崩壊した」。wide open shot は「完全にフリーのシュート」。unfold は「展開する」。スポーツの負けを語るときの英語はとにかくドラマチック。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '何対何だった？',
        english: [
            'What was the score?',
            'What was the final score?',
            'I did not catch the score. How did it end? Was it close?',
            'Wow, I had no idea! That\'s cool.',
        ],
        context: 'score は「スコア」。blowout は「大差の試合」。went down to the wire は「最後まで接戦」。rundown は「要約」。英語では What was the score? とシンプルに聞く。日本語の「何対何」は具体的な数字を求めているけど、英語はまずスコアという概念を聞いてから詳細に入る。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: 'あの監督がダメだよ',
        english: [
            'The coach is the problem.',
            'Honestly, they need to fire the coach.',
            'The players are fine. It is the coaching decisions that are losing games for this team.',
            'Ha, that\'s so true! Love it.',
        ],
        context: 'fire は「クビにする」。game plan は「作戦」。adjust は「修正する」。plays his favorites は「お気に入りを使う」。press conference は「記者会見」。英語圏の監督批判は日本よりかなり激しくて、fire the coach は毎シーズン必ず聞くフレーズ。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '逆転勝ちだったよ',
        english: [
            'It was a comeback win.',
            'They were down by ten and came all the way back.',
            'I almost turned it off in the third quarter but I am so glad I did not. The comeback was insane.',
            'Ha! Only you could pull that off.',
        ],
        context: 'comeback は「逆転」。went on a run は「連続得点した」。never looked back は「もう振り返らなかった(そのまま勝った)」。I take back は「撤回する」。英語圏では comeback story は最も盛り上がる話題。almost turned it off は「もう消そうとした」という前フリが重要。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '引き分けかあ',
        english: [
            'It was a draw.',
            'A tie? That is so unsatisfying.',
            'After all that buildup it ended in a draw. I feel robbed of a proper ending.',
            'I hear you. That\'s totally valid.',
        ],
        context: 'draw と tie は両方「引き分け」。draw はイギリス英語(サッカー)、tie はアメリカ英語で使い分ける。feel robbed は「損した気分」。penalty kicks は「PK戦」。日本語の「引き分けかあ」のがっかり感は英語では I feel robbed で表現する。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '優勝狙えるかも',
        english: [
            'They might win it all.',
            'If they keep playing like this, they could win the championship.',
            'I am not trying to jinx it but this team has a real shot at the title this year.',
            'Go for it! Nothing to lose, right?',
        ],
        context: 'win it all は「優勝する」。jinx は「縁起を悪くする」。has a real shot は「本当にチャンスがある」。choke は「大事な場面で失敗する」。cautiously optimistic は「慎重に楽観的」。parade tickets は「優勝パレードのチケット」。jinx を気にしながら語るのがスポーツファンあるある。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: 'ハイライト見た？',
        english: [
            'Did you see the highlights?',
            'Check out the highlights. You will not believe what happened.',
            'I just watched the highlight reel and even knowing the result, it still gave me chills.',
            'Oh really? Tell me more!',
        ],
        context: 'highlight reel は「ハイライト集」。recap は「まとめ」。controversial call は「物議を醸した判定」。pumping his fist は「ガッツポーズ」。pure cinema は「まるで映画」。英語圏では試合のハイライトを YouTube で見るのが完全に文化として定着している。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: '今シーズンは期待できそう',
        english: [
            'This season looks promising.',
            'I have a good feeling about this season.',
            'The off-season moves were smart and the roster looks stacked. This could be our year.',
            'Oh wow, you\'re right! Good eye.',
        ],
        context: 'promising は「期待できそうな」。off-season は「シーズンオフ」。stacked は「戦力が充実している」。free agents は「FA選手」。draft class は「ドラフト年次の選手たち」。on paper は「データ上は」。going all the way は「最後まで勝ち進む」。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 114, japanese: 'スポーツは結果がすべて',
        english: [
            'At the end of the day, it is about winning.',
            'In sports, results are all that matter.',
            'You can play the most beautiful game in the world but if you lose, nobody remembers.',
            'Did you catch the game? It was insane.',
        ],
        context: 'at the end of the day は「結局のところ」。playing with heart は「情熱を持ってプレーする」。trophy は「トロフィー」。the journey vs the destination は「過程 vs 結果」。harsh は「厳しい」。この「結果がすべて」論争は英語圏のスポーツトークでも永遠のテーマ。',
        character: 'kenji', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 115: 運動する (Working Out)
    // Scene: リサが「最近ジム行ってる」と言ったら全員に質問攻めにされる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 115, japanese: '最近ジム行き始めた',
        english: [
            'I just started going to the gym.',
            'I signed up for a gym last month and I have actually been going.',
            'I finally got a gym membership and I have been going three times a week. I am shocked at myself.',
            'Nice! I should start working out too.',
        ],
        context: 'signed up は「入会した」。stuck with it は「続けた」。New Year rush は「新年の混雑」（1月はジム入会が増える）。showing up は「行くこと自体」。what counts は「大事なこと」。英語圏でも「ジム入会しても行かない」は最も共感されるあるある。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '何のトレーニングしてるの？',
        english: [
            'What kind of workouts do you do?',
            'So what is your routine? Weights? Cardio? What are we talking here?',
            'Are you following a program or just kind of doing whatever feels right that day?',
            'Yeah, I can see why. That\'s frustrating.',
        ],
        context: 'routine は「ルーティン」。weights は「ウェイトトレーニング」。cardio は cardiovascular exercise の略で「有酸素運動」。CrossFit は「クロスフィット」。overwhelmed は「圧倒された」。英語では What is your routine? がジムの会話の入り口。日本語の「何のトレーニング」より具体的。',
        character: 'yuki', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '筋肉痛がやばい',
        english: [
            'I am so sore.',
            'My whole body is sore. I can barely walk.',
            'I did legs yesterday and now I cannot sit down without wincing. The stairs are my enemy.',
            'Wait, good yabai or bad yabai?',
        ],
        context: 'sore は「筋肉痛」。wincing は「痛みで顔をしかめる」。leg day は「脚のトレーニング日」。a full production は「大仕事」。refused to cooperate は「言うことを聞かない」。leg day は英語圏のジム文化で最も有名なミーム。「never skip leg day」も定番フレーズ。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '一緒に走らない？',
        english: [
            'Want to go for a run together?',
            'I am going for a run tomorrow morning. Want to join?',
            'I have been running three times a week and it would be way more fun with a partner. What do you say?',
            'Oh, for sure. I\'ve noticed that too.',
        ],
        context: 'not everyone is cup of tea は「誰もが好きなわけではない」。hear me out は「聞いてくれ」。pushed through は「乗り越えた」。initial phase は「最初の段階」。no pressure は「プレッシャーはかけないけど」。running partner は「ランニング仲間」。英語の誘い方は理由を先に説明してから誘うのが自然。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: 'プロテイン飲んでる？',
        english: [
            'Do you take protein?',
            'Are you doing any protein shakes or supplements?',
            'I just ordered some protein powder online but I have no idea which flavor is good. Any recommendations?',
            'Oh, easy! You\'ve gotta go with the signature dish.',
        ],
        context: 'protein shakes は「プロテインシェイク」。supplements は「サプリメント」。recovery time は「回復時間」。you cannot go wrong with は「〜なら間違いない」。liquid chalk は「液体のチョーク」。swears by は「を絶対信頼している」。プロテインの味の不満は英語圏のジムあるある。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '体重が全然変わらない',
        english: [
            'The scale has not moved at all.',
            'I have been working out for a month and the number on the scale has not changed.',
            'I am working out four times a week and eating healthy but the scale will not budge. I am so frustrated.',
            'Oh yeah, that makes a lot of sense.',
        ],
        context: 'the scale は「体重計」。budge は「動く」。eating clean は「健康的な食事をしている」。muscle weighs more than fat は定番の慰めフレーズ。putting in effort は「努力している」。give up pizza は「ピザを我慢する」。日本語の「全然変わらない」の焦りと同じ感情が英語にもある。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: 'ストレッチ大事だよ',
        english: [
            'Make sure you stretch.',
            'You really need to stretch before and after. Trust me.',
            'I skipped stretching once and pulled a muscle. Worst week of my life. Never again.',
            'Couldn\'t agree more. That\'s so important.',
        ],
        context: 'stretch は「ストレッチする」。pulled a muscle は「筋肉を痛めた」。went pop は「ポキッと音がした」。flexibility は「柔軟性」。learn from my mistakes は「俺の失敗から学べ」。英語圏のジム文化でも stretching の重要性は常に議論される。skip stretching は後悔する人の定番フレーズ。',
        character: 'master', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '休む日も必要だよ',
        english: [
            'Rest days are important.',
            'You need to take rest days. Your body needs time to recover.',
            'I know it feels like you should go every day but that is actually counterproductive. Rest is part of the process.',
            'Oh really? Tell me more!',
        ],
        context: 'rest days は「休息日」。counterproductive は「逆効果」。joints ached は「関節が痛んだ」。shut down は「機能停止した」。less is more は「少ないほうが良い」。muscles grow during rest は科学的にも正しいフレーズ。英語圏のフィットネス文化ではオーバートレーニングへの警告が多い。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: 'フォームが大事らしい',
        english: [
            'Form is everything.',
            'Focus on your form first. Weight comes later.',
            'I had a trainer fix my squat form and it was a completely different exercise. I had been doing it wrong for months.',
            'Couldn\'t agree more. That\'s so important.',
        ],
        context: 'form は「フォーム(姿勢)」。ego lifting は「見栄を張って重いものを持つこと」。setting yourself up for は「自分から〜に向かっている」。proper form は「正しいフォーム」。quality over quantity は「量より質」。英語圏のジムでは form police(フォームを指摘する人)がいる。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 115, japanese: '今日はサボりたい',
        english: [
            'I really do not feel like going today.',
            'I am thinking about skipping the gym today. I am so tired.',
            'Every fiber of my being is telling me to stay on the couch. The gym can wait one more day.',
            'Let\'s make the most of it!',
        ],
        context: 'skip は「サボる」。every fiber of my being は「全身全霊で」。compelling argument は「説得力のある主張」。cost-benefit analysis は「費用対効果分析」。by a landslide は「圧倒的に」。the couch is calling my name は「ソファが私を呼んでいる」。サボりたい気持ちの英語表現は世界共通の共感ネタ。',
        character: 'mina', category: 'request', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 116: チームを応援する (Cheering for Teams)
    // Scene: タケシがひいきチームの話をしたら全員のひいきチームが違って大論争。
    // ────────────────────────────────────────────────────

    {
        daySlot: 116, japanese: 'どこのファン？',
        english: [
            'Who do you root for?',
            'So who is your team? Who do you root for?',
            'I need to know which team you support before I decide if we can still be friends.',
            'Oh really? Tell me more!',
        ],
        context: 'root for は「応援する」。アメリカ英語。イギリスでは support。day-one は「最初からの」。ride-or-die は「何があっても一緒」。allegiance は「忠誠」。Who do you root for? は英語圏で友達になるときの重要質問。日本語の「どこのファン？」よりずっと重い意味を持つことがある。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: 'にわかファンじゃないよ',
        english: [
            'I am not a bandwagon fan.',
            'I have been a fan since way before they were good.',
            'I supported this team through their worst years. I earned the right to celebrate now.',
            'Oh, for sure. I\'ve noticed that too.',
        ],
        context: 'bandwagon fan は「にわかファン」。bandwagon は「勝ち馬に乗る」意味。sat through は「耐えて見続けた」。losing season は「負け越しシーズン」。got roasted は「いじられた」。could never は「絶対にできない」。英語圏では bandwagon 呼ばわりされるのは最大の侮辱。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '声援がすごかった',
        english: [
            'The crowd was electric.',
            'The energy in the stadium was absolutely electric.',
            'I have never heard a crowd that loud. The atmosphere was unlike anything I have ever experienced.',
            'Me too! Great minds think alike.',
        ],
        context: 'electric は「電気が走るような興奮」。deafening は「耳が聞こえなくなるほどの」。wall of sound は「音の壁」。in unison は「一斉に」。日本語の「声援がすごかった」は英語では the crowd was electric と表現する。crowd(群衆)を主語にするのが英語の特徴。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '今年こそ優勝してほしい',
        english: [
            'I hope they win it all this year.',
            'This is our year. I can feel it.',
            'If they do not win it all this year with this roster, I do not know what else they need.',
            'Oh really? Tell me more!',
        ],
        context: 'win it all は「全部勝つ(優勝する)」。the pieces are all there は「パズルのピースが全部揃った」。clicking は「噛み合っている」。mathematically eliminated は「数学的に可能性がなくなった」。this is our year は毎年言うのに毎年裏切られるファンの定番フレーズ。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: 'あのチームだけは嫌い',
        english: [
            'I cannot stand that team.',
            'I hate that team with every fiber of my being.',
            'If there is one team in this league I want to see fail, it is them. I do not even have a logical reason.',
            'You\'ve got a good team? That makes all the difference.',
        ],
        context: 'cannot stand は「我慢できない」。with every fiber of my being は「全身全霊で」。primal は「本能的な」。irrational は「非合理的」。shared negativity は「共有された否定感情」のジョーク。英語圏のスポーツ文化ではライバルチームへの hatred は friendship の基盤になる。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '子供の頃からファンなんだ',
        english: [
            'I have been a fan since I was a kid.',
            'I grew up watching this team with my dad. It is in my blood.',
            'My earliest memory is sitting on my dad is lap watching this team play on a tiny TV in the living room.',
            'Right? I was just thinking that.',
        ],
        context: 'it is in my blood は「血に流れている」。came out of the womb は「生まれた瞬間から」(大げさな表現)。pass down は「受け継ぐ」。through generations は「世代を超えて」。英語圏ではスポーツチームのファンであることを「遺伝」や「家族の伝統」として語るのがとても一般的。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: 'ユニフォーム買っちゃった',
        english: [
            'I just bought a jersey.',
            'I could not resist. I bought the new jersey.',
            'They released the new home jersey and I ordered it within five minutes. No regrets.',
            'Ha, that\'s so true! Love it.',
        ],
        context: 'jersey は「ユニフォーム」(英語圏ではjersey)。clean は「かっこいい」のスラング。dropped は「発売された」。checked out は「購入手続きした」。that look は「あの顔」。you have a problem は「依存症がある」のジョーク。ユニフォームの衝動買いは英語圏のスポーツファンあるある。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '移籍しないでほしい',
        english: [
            'I hope he does not leave the team.',
            'If he gets traded I am going to be devastated.',
            'There are rumors he might leave and I honestly do not know how to handle that emotionally.',
            'I appreciate that. Seriously.',
        ],
        context: 'traded は「トレードされた」。trade deadline は「トレード期限」。shipped off は「送り出された」。breakup は「別れ」。betrayal は「裏切り」。英語圏では選手の移籍を breakup に例えるのが一般的。日本語の「移籍」より感情的な表現が多い。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: '応援歌一緒に歌おう',
        english: [
            'Let us sing the fight song!',
            'Come on, everyone! Let us sing the chant together!',
            'I do not care if you do not know the words. Just sing loud and pretend you do.',
            'Oh really? Tell me more!',
        ],
        context: 'fight song は「応援歌」。chant は「チャント」。mumble は「もごもご歌う」。verses は「歌詞のAメロ部分」。chorus は「サビ」。volume は「声量」。英語圏のスポーツ応援歌は歌詞を知らなくてもノリで参加するのが正解。fight song はアメリカの大学スポーツ文化から来た表現。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 116, japanese: 'スポーツは平和だよね',
        english: [
            'Sports bring people together.',
            'No matter what is going on in the world, sports can still unite people.',
            'I love that sports can make complete strangers high-five each other like old friends.',
            'Did you catch the game? It was insane.',
        ],
        context: 'bring people together は「人を結びつける」。unite は「団結させる」。high-five は「ハイタッチ」(英語ではhigh-five)。connected by something bigger は「もっと大きなもので繋がった」。strangers は「見知らぬ人」。日本語の「平和」は英語では bring together や unite で表現する。',
        character: 'master', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 117: スポーツニュース (Sports News)
    // Scene: ケンジがスマホでスポーツニュースを読み上げる。全員が食いつく。
    // ────────────────────────────────────────────────────

    {
        daySlot: 117, japanese: 'トレードされたらしいよ',
        english: [
            'He just got traded.',
            'Did you hear? He got traded this morning.',
            'I woke up to the news that he got traded and I have been in a bad mood all day.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'got traded は「トレードされた」。push notification は「通知」。called in sick は「病欠の電話をした」。threw him away は「捨てた」。used napkin は「使用済みナプキン」。英語圏ではスポーツ選手のトレードニュースに対する感情的な反応が非常に大きい。personal reasons は仕事を休む定番の理由。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '怪我したって',
        english: [
            'He got injured.',
            'Bad news. He is out with an injury.',
            'They just announced he tore his ACL. He is done for the season.',
            'Ha, that\'s a great way to put it!',
        ],
        context: 'tore his ACL は「前十字靭帯を断裂した」。ACL(anterior cruciate ligament)はスポーツで最も恐れられる怪我。out for the season は「シーズン絶望」。make a run は「優勝を目指す」。knee brace は「膝のサポーター」。英語のスポーツニュースでは injury report が最も注目される情報。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: 'FA(フリーエージェント)になるらしい',
        english: [
            'He is becoming a free agent.',
            'His contract is up. He is going to be a free agent.',
            'He is hitting free agency this winter and every team in the league is going to be after him.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'free agent は「フリーエージェント」。contract is up は「契約が切れた」。circling like sharks は「サメのように周りを回っている」。heart palpitations は「動悸」。Google alert は「検索アラート」。FA は英語でも free agency と言う。日本語のFAと同じ概念だが英語圏はもっとドラマチックに語る。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '新記録出たんだって',
        english: [
            'He just set a new record.',
            'Did you see? He broke the all-time record last night.',
            'He did it. He finally broke the record that has stood for thirty years. I witnessed history.',
            'Wow, I had no idea! That\'s cool.',
        ],
        context: 'set a record は「記録を作った」。broke the record は「記録を破った」。all-time record は「歴代記録」。stood for は「続いていた」。standing ovation は「スタンディングオベーション」。sold-out は「完売」。英語圏では記録破りの瞬間を I witnessed history(歴史の目撃者)と表現する。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '引退するってニュースで見た',
        english: [
            'I saw he is retiring.',
            'He just announced his retirement. End of an era.',
            'I cannot believe he is actually retiring. It does not feel real yet.',
            'I hear you. That\'s totally valid.',
        ],
        context: 'end of an era は「一つの時代の終わり」。retirement は「引退」。passage of time は「時の流れ」。walk away は「去る」。I need a moment は「ちょっと時間が必要」。英語圏では選手の引退発表は Instagram や Twitter で行われることが多い。end of an era は必ず使われるフレーズ。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: 'ドラフト誰取るかな',
        english: [
            'I wonder who they will draft.',
            'Draft night is coming up. Who do you think they will pick?',
            'If they do not draft that quarterback with the first pick, I am going to lose my mind.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'draft は「ドラフト」。mock drafts は「模擬ドラフト」。prospects は「有望選手」。watching tape は「映像を研究する」。front office は「フロント(経営陣)」。their results show は「その結果が物語っている」。英語圏のドラフト文化は日本よりイベント性が高く、テレビ中継される。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '移籍金すごい額だね',
        english: [
            'The transfer fee is insane.',
            'They paid how much? That is an absurd amount of money.',
            'Two hundred million for one player. The economics of professional sports make no sense to me.',
            'Yeah, totally! That\'s a great point.',
        ],
        context: 'transfer fee は「移籍金」。absurd は「馬鹿げた」。GDP は「国内総生産」。existential crisis は「存在の危機」。life choices は「人生の選択」。英語圏では選手の年俸や移籍金の話題はスポーツニュースの定番。absurd amount of money は定番の反応フレーズ。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: 'オフシーズンが暇すぎる',
        english: [
            'The off-season is so boring.',
            'I hate the off-season. I do not know what to do with myself.',
            'The season ended last month and I have already watched every highlight from the past ten years.',
            'Bored? Come on, let\'s go do something fun!',
        ],
        context: 'off-season は「シーズンオフ」。fill the void は「空虚を埋める」。thrilled は「喜んでいる」。miserable は「惨めな」。a cry for help は「助けを求めるサイン」のジョーク。英語圏では off-season の退屈さをネタにするのがスポーツファンの定番ユーモア。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: 'ネットの反応がすごい',
        english: [
            'The internet is going crazy.',
            'Social media is absolutely melting down over this.',
            'I have been scrolling through reactions for an hour and I cannot stop. The memes are incredible.',
            'Let me check... try this password.',
        ],
        context: 'melting down は「大炎上している」。memes は「ミーム(ネタ画像)」。trending hashtags は「トレンドのハッシュタグ」。Wikipedia edit は「Wikipedia編集」(速報でWikipediaが書き換えられるジョーク)。breakup letters は「別れの手紙」。英語圏のスポーツニュースへのネット反応は日本より数倍激しい。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 117, japanese: '解説者の意見ってあてにならない',
        english: [
            'Pundits are always wrong.',
            'Sports analysts never get anything right. I trust my own instincts more.',
            'Every expert predicted the opposite of what actually happened. Maybe they should just flip a coin.',
            'Wow, I had no idea! That\'s cool.',
        ],
        context: 'pundits は「解説者・評論家」。analysts は「アナリスト」。bold predictions は「大胆な予測」。breakout season は「ブレイクのシーズン」。accountability は「説明責任」。flip a coin は「コインを投げる」。英語圏ではスポーツ解説者への不信感が shared joke として定着している。',
        character: 'master', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 118: イベントに行く (Going to Events)
    // Scene: ユキが音楽フェスの計画を立てている。全員を巻き込もうとする。
    // ────────────────────────────────────────────────────

    {
        daySlot: 118, japanese: 'フェスに行きたい',
        english: [
            'I want to go to a festival.',
            'There is a music festival next month and I really want to go.',
            'I have never been to a proper outdoor festival and this summer I am finally making it happen.',
            'You know what, you\'re absolutely right.',
        ],
        context: 'putting my foot down は「断固として決める」。something comes up は「何かが起きる」。requested days off は「休みを申請した」。saving up は「貯金している」。putting things off は「先延ばしにする」。英語圏の music festival 文化は日本のフェスより大規模で数日間のキャンプ形式が多い。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: 'チケット取れた！',
        english: [
            'I got tickets!',
            'I just got tickets! I cannot believe it!',
            'I was in the online queue for forty-five minutes and I somehow managed to get tickets. I am shaking.',
            'Got them! We\'re all set.',
        ],
        context: 'online queue は「オンラインの待ち列」。with two seconds to spare は「残り2秒で」。screenshot は「スクリーンショット」。worth every penny は「1円も無駄ではない」。英語圏ではチケット争奪戦の話は共感度が非常に高い。multiple devices は定番の戦略。',
        character: 'mina', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '何持っていけばいい？',
        english: [
            'What should I bring?',
            'What do I need to bring? This is my first festival.',
            'I am making a packing list but I have no idea what I actually need. Any tips from people who have been before?',
            'Oh, that\'s actually genius. Let\'s try it.',
        ],
        context: 'packing list は「持ち物リスト」。portable charger は「モバイルバッテリー」。rain gear は「雨具」。logistics は「段取り」。help me out は「助けて」。英語圏のフェスでは comfortable shoes と sunscreen が最重要アドバイス。nobody tells you about は「誰も教えてくれない」情報を求めるフレーズ。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '一緒に行かない？',
        english: [
            'Want to come with me?',
            'I have an extra ticket. Do you want to come?',
            'I think you would love it. Let me know if you want to go and I will grab you a ticket.',
            'That\'d be great! Thanks for offering.',
        ],
        context: 'headlining は「ヘッドライナーとして出演する」。lineup は「出演者リスト」。acts は「出演者」。I am not going to pressure you は「プレッシャーはかけないけど」と言いながら実質かけている。selling out は「売り切れる」。英語の誘い方は情報を並べてから相手に判断させるスタイルが多い。',
        character: 'lisa', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '人が多すぎて大変だった',
        english: [
            'It was so crowded.',
            'The crowd was insane. I could barely move.',
            'I have never seen that many people in one place. It took thirty minutes just to get from one stage to another.',
            'That sounds rough. Hang in there.',
        ],
        context: 'crowded は「混んでいる」。compressed は「圧縮された」。squeezed は「押しつぶされた」。personal space は「パーソナルスペース」。overwhelming は「圧倒される」。英語圏のフェスでは crowd management(群衆管理)が大きな話題。I could barely move は定番の不満フレーズ。',
        character: 'takeshi', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '開場は何時？',
        english: [
            'What time do doors open?',
            'When do the doors open? I want to get there early.',
            'If doors open at two I want to be in line by noon. I am not missing the opening act.',
            'Say no more! Let\'s make it happen.',
        ],
        context: 'doors open は「開場する」。in line は「列に並ぶ」。opening act は「前座」。get settled は「落ち着く」。wrapped around は「(列が建物を)ぐるっと取り囲んだ」。英語圏では What time do doors open? がイベントの最重要質問。日本語の「開場」と「開演」の区別は英語でも doors open と show starts で分ける。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '物販の列がやばかった',
        english: [
            'The merch line was crazy long.',
            'I waited in the merch line for over an hour.',
            'By the time I got to the front of the merch line, half the stuff was already sold out.',
            'Born ready! Let\'s go.',
        ],
        context: 'merch line は「グッズ販売の列」。sold out は「売り切れ」。inventory は「在庫」。highway robbery は「ぼったくり」。empty-handed は「手ぶらで」。emotionally invested は「感情的に投資した」。英語圏のイベント物販問題は日本とまったく同じ。sold out in my size は世界共通の悲劇。',
        character: 'mina', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '帰りの電車混みそうだな',
        english: [
            'The train home is going to be packed.',
            'We should leave a little early to avoid the rush.',
            'Last time I went to an event here it took me two hours to get home because the trains were so packed.',
            'It\'s two stops from here. I can walk you there.',
        ],
        context: 'packed は「満員の」。sardined は「サーディン(イワシ)のように詰め込まれた」。breathing room は「息をする余裕」。worn off は「消えた」。the high は「興奮・高揚感」。英語では packed like sardines(イワシの缶詰のように詰め込まれた)が定番表現。日本語の「すし詰め」と同じ発想。',
        character: 'kenji', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '写真いっぱい撮った',
        english: [
            'I took so many photos.',
            'My camera roll is full. I took like three hundred photos.',
            'I was trying to live in the moment but I also wanted to document everything so I was doing both poorly.',
            'Let me see! Oh that\'s a great shot.',
        ],
        context: 'camera roll は「カメラロール」。live in the moment は「今を生きる」。document は「記録する」。drowned out は「かき消された」。photographic evidence は「写真の証拠」。英語圏でも「スマホで撮るか今を楽しむか」問題は大きな議論テーマ。put your phone away は定番の忠告。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 118, japanese: '来年も絶対行く',
        english: [
            'I am definitely going again next year.',
            'I am already planning for next year. That was too good to miss.',
            'I do not care what it costs or what I have to rearrange. I am going to this event every single year from now on.',
            'Let me check... it\'s about that much, yeah.',
        ],
        context: 'rearrange は「予定を組み直す」。walked through the gates は「ゲートをくぐった」。cooperated は「味方した(天気が)」。non-negotiable は「交渉の余地なし」。annual tradition は「年間行事」。VIP は「VIPチケット」。英語圏では annual tradition(毎年の恒例行事)を宣言するのが感動体験後の定番フレーズ。',
        character: 'lisa', category: 'travel', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 119: 趣味を深める (Deep Diving into Hobbies)
    // Scene: 居酒屋で全員が自分のハマっている趣味を語り出す。意外な一面が見える。
    // ────────────────────────────────────────────────────

    {
        daySlot: 119, japanese: 'どんどんハマっていく',
        english: [
            'I keep getting more into it.',
            'The more I learn about it, the more obsessed I get.',
            'It started as a casual interest and now it has completely taken over my life.',
            'Ha, for real? That\'s interesting!',
        ],
        context: 'getting more into it は「もっとハマっていく」。taken over は「支配した」。out of curiosity は「好奇心で」。forums は「掲示板」。arguing with strangers は「見知らぬ人と議論する」。日本語の「ハマる」は段階があるけど、英語では got into → obsessed → taken over my life と escalation で表現する。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '道具にこだわり始めた',
        english: [
            'I have started caring about the gear.',
            'I went from cheap equipment to researching high-end gear obsessively.',
            'I spent three hours last night reading reviews on a piece of equipment that costs more than my phone.',
            'Let me check... it\'s about that much, yeah.',
        ],
        context: 'gear は「道具・装備」。high-end は「高級な」。comparison reviews は「比較レビュー」。unboxing videos は「開封動画」。convince yourself は「自分を納得させる」。the gear phase は趣味の深みにハマる段階を指す英語圏の概念。日本語の「沼」に近いが、英語では rabbit hole とも言う。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: 'YouTube で独学してる',
        english: [
            'I am learning from YouTube.',
            'YouTube has been my teacher. I have learned everything from videos.',
            'I do not have a formal teacher but honestly the free content on YouTube is better than most paid courses.',
            'Which channel? I\'m always looking for good stuff.',
        ],
        context: 'self-education は「独学」。golden age は「黄金時代」。step-by-step は「段階的な」。along the way は「その過程で」。formal education は「正規の教育」。英語圏では YouTube 独学を self-taught と表現する。I am self-taught は趣味の話で最も使われるフレーズの一つ。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '仲間が見つかった',
        english: [
            'I found people who share the same hobby.',
            'I joined a local group and it has been amazing meeting like-minded people.',
            'For years I thought I was the only person into this and then I found a whole community online.',
            'Oh yeah, that makes a lot of sense.',
        ],
        context: 'like-minded は「同じ考えの」。niche は「ニッチ(マニアックな)」。subreddit は「Redditのスレッド」。meetups は「オフ会」。finding your people は「自分の仲間を見つける」。英語圏では趣味の community(コミュニティ)を見つけることが人生を変えるきっかけとして語られる。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '沼にハマった',
        english: [
            'I fell down a rabbit hole.',
            'I am in way too deep at this point. There is no coming back.',
            'What started as a minor interest has become a full-blown obsession. I think I need an intervention.',
            'Hmm, good question. What do you think?',
        ],
        context: 'fell down a rabbit hole は「沼にハマった」。不思議の国のアリスが語源。full-blown は「本格的な」。intervention は「介入(依存症の治療で使う)」。sunk cost fallacy は「サンクコスト(埋没費用)の誤り」。rabbit hole は英語圏で最も使われる「沼」の表現。日本語の「沼」と完全に同じ概念。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '上達してきた気がする',
        english: [
            'I feel like I am getting better.',
            'I can actually see improvement now. It is a great feeling.',
            'I compared something I made six months ago to what I can do now and the difference is huge.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'improvement は「上達」。imperceptibly は「気づかないくらいゆっくり」。linear は「直線的な」。going backward は「後退している」。talent is just practice that people do not see は名言的な表現。英語圏では progress(進歩)を語るとき before and after の比較が好まれる。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '教えてくれない？',
        english: [
            'Can you teach me?',
            'I have always wanted to try that. Would you mind teaching me the basics?',
            'I know you are really into this. If you have time sometime, I would love to learn from you.',
            'Sure! Ask me anything.',
        ],
        context: 'would you mind は「してくれませんか」の丁寧表現。contagious は「伝染する」。frame は「(状況を)捉える」。you are welcome は「どういたしまして」の皮肉版。英語では hobby を教えてもらうとき I would love to learn from you と言うとお世辞も含まれて好印象。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '趣味にお金かけすぎかな',
        english: [
            'I think I spend too much on this hobby.',
            'My hobby expenses are getting out of hand.',
            'I did the math on how much I have spent on this hobby this year and I am choosing not to think about it.',
            'Oh cool! How long have you been into that?',
        ],
        context: 'getting out of hand は「手に負えなくなっている」。impulse purchase は「衝動買い」。cooling-off period は「冷却期間」。exceeded は「超えた」。cart は「(ネットの)カート」。progress is slow but it is progress は自虐的ユーモア。英語圏では hobby spending の告白が friendship bonding のネタになる。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '結局続かないんだよね',
        english: [
            'I never stick with anything.',
            'I always start strong but I lose interest after a few weeks.',
            'My hobby history is a graveyard of abandoned interests. I have tried everything and finished nothing.',
            'Oh, for sure. I\'ve noticed that too.',
        ],
        context: 'stick with は「続ける」。serial hobbyist は「趣味を次々に変える人」。graveyard は「墓場」。abandoned は「放棄された」。commit は「コミットする」。initial excitement fades は「最初の興奮が薄れる」。英語では hobby hopping(趣味を転々とする)や shiny object syndrome とも呼ばれる現象。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 119, japanese: '趣味があるって大事だよ',
        english: [
            'Having a hobby is important.',
            'Everyone needs something that is just for them. Not for work, not for anyone else.',
            'My hobby keeps me sane. Without it, I think I would go crazy from just working and sleeping.',
            'Oh cool! How long have you been into that?',
        ],
        context: 'keeps me sane は「正気を保ってくれる」。lose track of time は「時間を忘れる」。present は「今に集中している」。reset button は「リセットボタン」。日本語の「大事だよ」は英語では important だけでなく keeps me sane のように具体的な効果で表現するのが説得力がある。',
        character: 'lisa', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 120: エンタメ月卒業 (Month 4 Graduation)
    // Scene: エンタメ月最終日。4週間を振り返りながら居酒屋で打ち上げ。
    // ────────────────────────────────────────────────────

    {
        daySlot: 120, japanese: 'この一ヶ月楽しかったね',
        english: [
            'This month has been so fun.',
            'I cannot believe the month is already over. It flew by.',
            'Looking back on this month, I feel like I have grown so much. It has been a blast.',
            'Me too! Great minds think alike.',
        ],
        context: 'flew by は「あっという間に過ぎた」。a blast は「最高に楽しかった」。bearable は「耐えられる」。that is not a life, that is a schedule は哲学的なフレーズ。英語圏では月末や期間の終わりに time flies(時間が飛ぶ)と表現するのが定番。日本語の「楽しかった」より感慨深い表現ができる。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '英語で感想言えるようになった',
        english: [
            'I can share my opinions in English now.',
            'A month ago I could not even describe a movie in English. Now I can argue about it.',
            'The biggest change is not my vocabulary. It is my confidence to actually speak up and say what I think.',
            'Your English is great! Keep it up.',
        ],
        context: 'speak up は「発言する」。the courage to use them は「使う勇気」。expressing opinions は「意見を表現する」。I feel like myself は「自分らしくいられる」。that is huge は「それはすごいこと」。英語学習で最も重要なのは vocabulary ではなく confidence(自信)だという英語圏の教育哲学。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '好きなことだと覚えやすい',
        english: [
            'It is easier to learn when you enjoy the topic.',
            'I memorized so many new words this month because I actually cared about the content.',
            'The trick is not studying harder. It is studying something you are genuinely interested in.',
            'Same here! We should hang out more.',
        ],
        context: 'memorized は「暗記した」。the trick は「コツ」。passionate conversation は「熱い会話」。flashcards は「単語カード」。connected to emotions は「感情に紐づいた」。英語圏の言語教育でも passion-based learning(興味ベースの学習)の重要性が強調されている。textbook fatigue は共通の課題。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '来月も楽しみだな',
        english: [
            'I am looking forward to next month.',
            'I wonder what next month will be about. I am already excited.',
            'If next month is even half as fun as this one, we are in for a great time.',
            'Same here! Can\'t wait.',
        ],
        context: 'looking forward to は「楽しみにしている」。in for は「〜が待っている」。forced は「無理矢理な」。builds on は「積み重なる」。bring it on は「かかってこい」。英語では I am looking forward to が最も使われる「楽しみ」の表現。日本語の「楽しみだな」より期待の度合いが強い。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '映画の話が一番盛り上がった',
        english: [
            'The movie conversations were the best part.',
            'Nothing gets people talking like movies. We could have gone all night.',
            'I think we spent more time arguing about movies than any other topic this month. And I loved every second of it.',
            'Have you seen it yet? No spoilers!',
        ],
        context: 'nothing gets people talking like は「〜ほど人を話させるものはない」。open up は「心を開く」。small talk は「世間話」。conversation starters は「会話のきっかけ」。lead anywhere は「どこにでも行ける」。映画が会話の潤滑油になるという観察は英語圏でも完全に共感される。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '推し活の話面白かったな',
        english: [
            'The fandom talk was hilarious.',
            'I had no idea how deep fan culture goes. Mina opened my eyes.',
            'I used to think fandom was silly but after hearing everyone talk about it, I get it now.',
            'Yeah, I totally get where you\'re coming from.',
        ],
        context: 'hilarious は「爆笑もの」。opened my eyes は「目を開かせた」。roll my eyes は「白目を剥く(呆れる)」。sense of belonging は「帰属意識」。underlying need は「根本的な欲求」。英語圏でも fandom への偏見が理解に変わる体験は共感度が高い。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: 'スポーツの表現が一番使えそう',
        english: [
            'The sports expressions seem the most useful.',
            'I feel like sports English comes up the most in real conversations.',
            'Learning sports vocabulary is not just about sports. Half these expressions are used in everyday English.',
            'Did you catch the game? It was insane.',
        ],
        context: 'slam dunk は「楽勝」。dropped the ball は「しくじった」。game changer は「状況を変えるもの」。level playing field は「公平な条件」。infiltrated は「浸透した」。hidden layer は「隠れた層」。英語のスポーツ由来の慣用句は日常会話で非常に多く使われる。これは日本語にはない特徴。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: 'みんなと話すのが一番の勉強',
        english: [
            'Talking to you guys is the best practice.',
            'I learn more in one night at this izakaya than a week of textbook study.',
            'Real conversation is where real learning happens. No app can replicate what we have here.',
            'That\'s awesome! How\'s it going so far?',
        ],
        context: 'think on your feet は「即座に考える」。get your point across は「言いたいことを伝える」。stumble は「つまずく」。sticks with me は「忘れられない」。replicate は「再現する」。no app can replicate は「どんなアプリでも再現できない」。英語学習において real conversation の価値は英語圏の教育者も最も強調するポイント。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '卒業おめでとう！',
        english: [
            'Congratulations on finishing the month!',
            'We made it through another month. Cheers to that!',
            'Four months down. I am proud of all of us for sticking with it this long.',
            'Happy birthday! This round\'s on me!',
        ],
        context: 'we made it through は「乗り越えた」。cheers to that は「それに乾杯」。sticking with it は「続けている」。discipline は「規律」。stubbornness は「頑固さ」。round of applause は「拍手」。英語の graduation(卒業)は学校だけでなく、何かを完了したときに使う。Cheers は乾杯の合図。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 120, japanese: '乾杯！来月もよろしく！',
        english: [
            'Cheers! See you next month!',
            'Cheers everyone! Here is to another great month ahead!',
            'Raise your glasses! To month four in the books and month five on the horizon. We have got this!',
            'Likewise! Looking forward to hanging out.',
        ],
        context: 'here is to は「〜に乾杯」。in the books は「完了した」。on the horizon は「目の前にある」。we have got this は「俺たちならできる」。I am not crying, you are crying は「泣いてないよ(泣いてる)」の定番ジョーク。raise your glasses は乾杯のスピーチの定番フレーズ。英語の乾杯は cheers 一言でもスピーチ付きでもどちらも自然。',
        character: 'master', category: 'social', month: '2026-07',
    },
];

// ============================================================
// DAY THEMES -- MONTH 4 (2026-07) -- WEEK 16
// ============================================================

export const MONTH4_W16_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    112: {
        title: 'スポーツ観戦', titleEn: 'Watching Sports', category: 'social',
        scene: '居酒屋のテレビで野球中継。ゴンドが解説者気取りで語り始める。',
        keywords: [
            { en: 'overtime', ja: '延長戦', pron: 'オーバータイム', example: 'The game went into overtime.', note: 'アメリカ英語。サッカーでは extra time(イギリス英語)。日本語の「延長」と同じだが、仕事の残業も overtime。' },
            { en: 'ref', ja: '審判', pron: 'レフ', example: 'The ref made a terrible call.', note: 'referee の略。野球は umpire(アンプ)。bad call=誤審。スポーツ観戦で最もよく叫ばれる単語の一つ。' },
            { en: 'halftime', ja: 'ハーフタイム', pron: 'ハーフタイム', example: 'Let us grab drinks at halftime.', note: 'バスケは quarter(クォーター)、野球は inning(イニング)で区切る。halftime show はスーパーボウルの目玉。' },
            { en: 'replay', ja: 'リプレイ', pron: 'リプレイ', example: 'I have watched the replay five times.', note: 'instant replay=すぐに見返す映像。video replay=ビデオ判定。日本語と同じだが英語では動詞としても使う。' },
            { en: 'underdog', ja: '弱者・劣勢', pron: 'アンダードッグ', example: 'Everyone loves an underdog story.', note: '闘犬で下になった犬が語源。underdog story=逆転劇。root for the underdog=弱い方を応援する。' },
        ],
    },
    113: {
        title: '推し活', titleEn: 'Fan Culture', category: 'feeling',
        scene: 'ミナが推しアイドルのグッズを大量に見せびらかす。全員引き気味。',
        keywords: [
            { en: 'stan', ja: '熱狂的ファン', pron: 'スタン', example: 'I stan this group so hard.', note: 'Eminem の曲 "Stan" が語源。ファンを超えた熱狂を指す。動詞としても使う。I stan=推してる。' },
            { en: 'merch', ja: 'グッズ', pron: 'マーチ', example: 'I spent too much on merch again.', note: 'merchandise の略。発音は「マーチャンダイズ」だが略すと「マーチ」。concert merch=ライブグッズ。' },
            { en: 'fandom', ja: 'ファンダム', pron: 'ファンダム', example: 'The fandom is amazing.', note: 'fan+kingdom。ファンの集合体。toxic fandom=有害なファン文化。fandom name=ファンの呼称(例:Army)。' },
            { en: 'bias', ja: '推し', pron: 'バイアス', example: 'He is my ultimate bias.', note: 'K-POPファン用語。ultimate bias=最推し。bias wrecker=推し変させる人。本来は「偏見」の意味。' },
            { en: 'drop', ja: 'リリース', pron: 'ドロップ', example: 'They just dropped a new album.', note: '「落とす」から「リリースする」。music drop=新曲発売。limited drop=限定発売。英語のスラングとして定着。' },
        ],
    },
    114: {
        title: '試合結果', titleEn: 'Game Results', category: 'social',
        scene: '朝の居酒屋仕込み中にケンジが昨夜の試合結果を報告。勝敗で一喜一憂。',
        keywords: [
            { en: 'comeback', ja: '逆転', pron: 'カムバック', example: 'What an incredible comeback!', note: 'come back=戻る → comeback=逆転劇。make a comeback=復帰する。日本語の「カムバック」は芸能界での復帰が多いが、英語はスポーツが主。' },
            { en: 'clutch', ja: '土壇場の', pron: 'クラッチ', example: 'He hit a clutch shot in the last second.', note: '大事な場面で決める力。clutch player=勝負強い選手。英語では形容詞として使う。That was so clutch。' },
            { en: 'blowout', ja: '大差の試合', pron: 'ブローアウト', example: 'It was a total blowout. Not even close.', note: 'blow out=吹き飛ばす。一方的な試合。反対は nail-biter(接戦)。down to the wire も接戦の意味。' },
            { en: 'roster', ja: '選手名簿', pron: 'ロスター', example: 'They have a stacked roster this year.', note: 'stacked roster=豪華メンバー。日本語では「ロースター」。lineup(スタメン)とは違い、全選手を含む。' },
            { en: 'choke', ja: '大事な場面で失敗する', pron: 'チョーク', example: 'They choked in the playoffs again.', note: '「窒息する」が原義。プレッシャーで実力を発揮できないこと。choker=プレッシャーに弱い選手。非常にきつい批判語。' },
        ],
    },
    115: {
        title: '運動する', titleEn: 'Working Out', category: 'request',
        scene: 'リサが「最近ジム行ってる」と言ったら全員に質問攻めにされる。',
        keywords: [
            { en: 'sore', ja: '筋肉痛の', pron: 'ソア', example: 'My legs are so sore from yesterday.', note: '筋肉痛=muscle soreness。I am sore=筋肉痛がある。throat is sore=喉が痛い。体のどこでも使える。' },
            { en: 'cardio', ja: '有酸素運動', pron: 'カーディオ', example: 'I hate cardio but I know I need it.', note: 'cardiovascular exercise の略。running, cycling, swimming など。weights(ウェイト)と対比される。' },
            { en: 'rep', ja: '反復回数', pron: 'レップ', example: 'Do three sets of ten reps.', note: 'repetition の略。set=セット。3 sets of 10 reps=10回3セット。one more rep=あと1回。ジムの基本用語。' },
            { en: 'gains', ja: '筋肉の成果', pron: 'ゲインズ', example: 'I am finally seeing some gains.', note: '複数形で使う。leg day gains=脚トレの成果。newbie gains=初心者ボーナス。SNSで #gains は筋トレ投稿の定番タグ。' },
            { en: 'cool down', ja: 'クールダウン', pron: 'クールダウン', example: 'Do not skip the cool down.', note: 'warm up(ウォームアップ)の反対。stretch(ストレッチ)と合わせて使う。cool off=体温を下げる。' },
        ],
    },
    116: {
        title: 'チームを応援する', titleEn: 'Cheering for Teams', category: 'social',
        scene: 'タケシがひいきチームの話をしたら全員のひいきチームが違って大論争。',
        keywords: [
            { en: 'bandwagon', ja: 'にわかファン', pron: 'バンドワゴン', example: 'Do not be a bandwagon fan.', note: 'bandwagon=楽隊車。jump on the bandwagon=勝ち馬に乗る。英語圏のスポーツで最も嫌われるファンタイプ。' },
            { en: 'rivalry', ja: 'ライバル関係', pron: 'ライバルリー', example: 'This rivalry goes back decades.', note: 'rival の名詞形。fierce rivalry=激しいライバル関係。crosstown rivalry=同じ街のチーム対決。' },
            { en: 'jersey', ja: 'ユニフォーム', pron: 'ジャージー', example: 'I just bought the new away jersey.', note: '日本語の「ジャージ」とは違う。home jersey=ホーム用、away jersey=アウェイ用。英語のユニフォームはjersey。' },
            { en: 'chant', ja: '応援歌・声援', pron: 'チャント', example: 'The whole stadium was chanting.', note: '繰り返す歌。サッカーのchant文化は世界最大。fight song=応援歌(アメリカの大学)。名詞・動詞両方で使う。' },
            { en: 'dynasty', ja: '王朝(連覇チーム)', pron: 'ダイナスティ', example: 'That team built a dynasty.', note: '「王朝」。連覇するチームを dynasty と呼ぶ。build a dynasty=王朝を築く。スポーツ史で最高の称号。' },
        ],
    },
    117: {
        title: 'スポーツニュース', titleEn: 'Sports News', category: 'social',
        scene: 'ケンジがスマホでスポーツニュースを読み上げる。全員が食いつく。',
        keywords: [
            { en: 'trade', ja: 'トレード', pron: 'トレイド', example: 'He just got traded to another team.', note: '選手の交換。trade deadline=トレード期限。trade rumor=トレードの噂。blockbuster trade=大型トレード。' },
            { en: 'free agent', ja: 'フリーエージェント', pron: 'フリーエイジェント', example: 'He is hitting free agency this winter.', note: '契約が切れた選手。sign as a free agent=FA契約。free agency period=FA期間。日本語のFAと同じ。' },
            { en: 'draft', ja: 'ドラフト', pron: 'ドラフト', example: 'Who do you think they will draft first?', note: '新人選手の指名。first-round pick=1巡目指名。draft bust=期待外れの指名選手。NFL Draft は一大イベント。' },
            { en: 'pundit', ja: '解説者', pron: 'パンディット', example: 'The pundits got it all wrong again.', note: '評論家・解説者。armchair pundit=素人評論家。TV pundit=テレビ解説者。スポーツ以外でも政治評論家にも使う。' },
            { en: 'headline', ja: '見出し', pron: 'ヘッドライン', example: 'He made headlines after that performance.', note: 'make headlines=ニュースになる。headline news=トップニュース。grab headlines=注目を集める。' },
        ],
    },
    118: {
        title: 'イベントに行く', titleEn: 'Going to Events', category: 'travel',
        scene: 'ユキが音楽フェスの計画を立てている。全員を巻き込もうとする。',
        keywords: [
            { en: 'venue', ja: '会場', pron: 'ヴェニュー', example: 'The venue was packed to capacity.', note: 'イベント会場。indoor venue=室内会場。outdoor venue=野外会場。日本語の「ベニュー」より幅広く使う。' },
            { en: 'lineup', ja: '出演者リスト', pron: 'ラインナップ', example: 'The festival lineup looks incredible this year.', note: 'フェスの出演者一覧。headliner=トリ。opening act=前座。stacked lineup=豪華ラインナップ。' },
            { en: 'sold out', ja: '完売', pron: 'ソールドアウト', example: 'Tickets sold out in ten minutes.', note: 'sell out の過去分詞。sold-out show=完売公演。sell out=裏切る(別の意味も)。コンサートでは最も恐れられる表現。' },
            { en: 'encore', ja: 'アンコール', pron: 'アンコー', example: 'They played three songs for the encore.', note: 'フランス語由来。発音は「アンコー」(日本語の「アンコール」ではない)。encore performance=アンコール公演。' },
            { en: 'queue', ja: '列', pron: 'キュー', example: 'The queue for merch was insane.', note: 'イギリス英語。アメリカでは line。queue up=列に並ぶ。virtual queue=オンラインの待ち列。発音は「キュー」。' },
        ],
    },
    119: {
        title: '趣味を深める', titleEn: 'Deep Diving into Hobbies', category: 'social',
        scene: '居酒屋で全員が自分のハマっている趣味を語り出す。意外な一面が見える。',
        keywords: [
            { en: 'rabbit hole', ja: '沼', pron: 'ラビットホール', example: 'I fell down a YouTube rabbit hole last night.', note: '不思議の国のアリスが語源。趣味の沼にハマる=fall down a rabbit hole。deep rabbit hole=底なしの沼。' },
            { en: 'self-taught', ja: '独学の', pron: 'セルフトート', example: 'I am completely self-taught.', note: 'teach の過去分詞。self-taught programmer=独学プログラマー。YouTube で学んだ人も self-taught と名乗る。' },
            { en: 'niche', ja: 'ニッチ', pron: 'ニッチ/ニーシュ', example: 'It is a pretty niche hobby.', note: '発音が2通り。アメリカ=ニッチ、イギリス=ニーシュ。niche market=ニッチ市場。niche interest=マニアックな趣味。' },
            { en: 'gear', ja: '道具・装備', pron: 'ギア', example: 'I spent way too much on new gear.', note: 'equipment より口語的。gear up=装備を整える。camera gear=カメラ機材。fishing gear=釣り道具。' },
            { en: 'burnout', ja: '燃え尽き症候群', pron: 'バーンアウト', example: 'I took a break because of burnout.', note: 'burn out=燃え尽きる。hobby burnout=趣味での燃え尽き。creative burnout=創作の燃え尽き。仕事以外でも使う。' },
        ],
    },
    120: {
        title: 'エンタメ月卒業', titleEn: 'Month 4 Graduation', category: 'social',
        scene: 'エンタメ月最終日。4週間を振り返りながら居酒屋で打ち上げ。',
        keywords: [
            { en: 'milestone', ja: '節目', pron: 'マイルストーン', example: 'Finishing month four is a huge milestone.', note: '道路の距離標識が語源。hit a milestone=節目を迎える。project milestone=プロジェクトの節目。' },
            { en: 'reflect', ja: '振り返る', pron: 'リフレクト', example: 'Let us reflect on what we learned this month.', note: 'reflect on=〜を振り返る。self-reflection=自己省察。looking back=振り返ると(カジュアル)。日記にも使える。' },
            { en: 'growth', ja: '成長', pron: 'グロウス', example: 'I can see real growth in my English.', note: 'grow の名詞形。personal growth=個人の成長。growth mindset=成長マインドセット。progress より大きな変化を示す。' },
            { en: 'cheers', ja: '乾杯', pron: 'チアーズ', example: 'Cheers to another great month!', note: '乾杯。cheers to=〜に乾杯。イギリスでは「ありがとう」の意味でも使う。raise your glass=グラスを上げて。' },
            { en: 'streak', ja: '連続記録', pron: 'ストリーク', example: 'I am on a four-month learning streak.', note: 'winning streak=連勝。losing streak=連敗。on a streak=記録継続中。Duolingo の streak 機能で有名になった。' },
        ],
    },
};
