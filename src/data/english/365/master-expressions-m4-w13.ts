/**
 * 365 English Master -- Month 4 Week 13: エンタメ英語 (Entertainment English)
 * Days 91-97: 70 expressions
 * Month: July 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 4 (2026-07) -- WEEK 13
// ============================================================

export const MONTH4_W13_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 91: 映画を語る (Talking About Movies)
    // Scene: ユキが居酒屋で「最近面白い映画ない？」と話を振る。全員のおすすめが意外すぎる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 91, japanese: '最近なんか面白い映画あった？',
        english: [
            'Seen any good movies lately?',
            'Hey, seen any good movies lately?',
            'Have you seen anything good lately? I need something to watch this weekend.',
            "So I have been going through my watchlist and honestly nothing is grabbing me. Have you guys seen anything good lately? I feel like I have watched everything on Netflix already and that cannot be true but it feels that way. I need a recommendation from someone with actual taste.",
        ],
        context: '日本語の「なんかいい映画あった？」に「見た？」が含まれてないけど英語はseen(見た)が必須。日本語は主語も動詞も省略できるけど英語は最低限の骨格が必要。でもHave youすら省略してSeen any...?で始めるのがカジュアル英語。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: 'あの映画やばかった',
        english: [
            'That movie was insane.',
            'Dude, that movie was absolutely insane.',
            'I watched it last weekend and I am still thinking about it. It was that good.',
            "OK so I finally watched it and I have to say, I was not expecting much going in because the trailer looked kind of meh. But then the first twenty minutes hit and I was completely hooked. By the end I was just sitting there in silence staring at the credits. I could not move. That is how you know a movie is good. When you cannot even get up from the couch.",
        ],
        context: 'insane は「頭おかしい」が原義だけど褒め言葉としても使う。crazy, wild, nuts も同じパターン。日本語の「やばい」と全く同じ構造で、良いにも悪いにも使える。「あの映画やばかった」は文脈で褒めか分かるのも一緒。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: 'どんな話？',
        english: [
            'What is it about?',
            'Wait, what is it about? Give me the short version.',
            'OK I am interested. What is it about? But do not spoil it for me.',
            "Hold on, back up. What is it actually about? Give me the elevator pitch. Like two sentences max. And please do not tell me the ending because I am one of those people who gets genuinely angry when someone spoils a movie for me. Just give me enough to know if it is worth my time. Is it a thriller? Drama? What are we working with here?",
        ],
        context: 'elevator pitch は「エレベーターに乗ってる30秒で説明できるくらい短い要約」。ビジネスでもよく使う。spoil は「台無しにする」。What are we working with? は「何系の話？」を聞く口語的な言い方。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: 'あらすじ言うとネタバレになるんだけど',
        english: [
            'I cannot say much without spoiling it.',
            'It is hard to explain without giving too much away.',
            'The thing is, if I tell you what it is about, I basically ruin the whole experience.',
            "This is one of those movies where the less you know going in, the better. I really cannot say anything because the whole point is the twist. If I even hint at what genre it is, you are going to start piecing things together. Just trust me and go in completely blind. Do not even watch the trailer. Seriously. I wish someone had told me that before I watched the trailer because it gives away way too much.",
        ],
        context: 'give away は「ばらす・あげる」。go in blind は「予備知識なしで見る」。piece things together は「断片を組み合わせて理解する」。英語圏では no spoilers 文化がかなり強い。映画の感想を言うときに最も気をつけるポイント。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: '映画館で見た方がいいよ',
        english: [
            'You should see it in theaters.',
            'Definitely see it on the big screen if you can.',
            'This is not a movie you want to watch on your phone. Go see it in theaters.',
            "Trust me on this one, do not wait for it to come out on streaming. This movie was made for the big screen. The sound design alone is worth the price of admission. I watched it in IMAX and it was a completely different experience from watching stuff at home. Some movies are just meant to be seen in a dark theater with surround sound. This is one of them.",
        ],
        context: 'in theaters は「映画館で」。on the big screen も同義。come out on streaming は「配信で出る」。price of admission は「入場料」。英語では theater(米)と cinema(英)で呼び方が違う。日本語の「シネマ」はイギリス英語寄り。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: '泣いた？',
        english: [
            'Did you cry?',
            'Wait, did you actually cry?',
            'Be honest. Did you cry? Because I definitely cried.',
            "OK real question. Did you cry? Because I am not going to lie, I was a complete mess by the end. I do not usually cry at movies but this one got me. I was trying so hard to hold it together because I was with my coworkers and I did not want them to see me ugly crying in the theater. But yeah, tears were flowing. No shame.",
        ],
        context: 'a complete mess は「ぐちゃぐちゃ」で感情的に崩壊した状態。hold it together は「なんとか堪える」。ugly crying は「顔がぐちゃぐちゃになるほど泣く」。no shame は「恥じることはない」。英語圏の男性も映画で泣くことをオープンに話す文化が増えている。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: '途中で寝ちゃった',
        english: [
            'I fell asleep halfway through.',
            'I hate to say it but I fell asleep in the middle.',
            'Do not judge me but I passed out like thirty minutes in. I was so tired.',
            "I know everyone says it is amazing but I literally could not keep my eyes open. I fell asleep maybe thirty minutes in and woke up during the climax completely confused. I had no idea what was going on. My friend had to explain the entire second half to me on the way home. To be fair, it was a late showing and I had been up since five AM. I should probably give it another shot when I am actually awake.",
        ],
        context: 'passed out は「気を失った・寝落ちした」。halfway through は「途中で」。give it another shot は「もう一回やってみる」。Do not judge me は「引かないでね」。映画で寝るのは英語圏でもちょっと恥ずかしいけど、正直に言うとウケる。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: '原作のほうが良かった',
        english: [
            'The book was better.',
            'Honestly, the book was way better.',
            'I read the book first and the movie just did not do it justice.',
            "I know this is such a cliche thing to say but the book was genuinely better. The movie cut out so many important scenes that it barely made sense if you had not read the book. My biggest issue was the pacing. The book takes its time building up the tension but the movie rushed through everything. They had two hundred pages of character development crammed into like fifteen minutes of screen time.",
        ],
        context: 'did not do it justice は「原作の良さを再現できなかった」。cliche は「ありきたりな言い方」。pacing は「テンポ」。crammed into は「詰め込まれた」。The book was better は映画ファンの間で最もよく聞くフレーズの一つ。言うとちょっと通ぶれる。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: '続編出るらしいよ',
        english: [
            'I heard a sequel is coming.',
            'Apparently they are making a sequel.',
            'Did you hear? They just announced a sequel. I cannot wait.',
            "So I saw on Twitter yesterday that they officially announced a sequel. The director confirmed it in an interview. Apparently they are bringing back the whole cast which is huge because there were rumors that the lead actor wanted out. Release date is supposed to be next summer but you know how that goes. It will probably get pushed back at least twice. It always does.",
        ],
        context: 'sequel は「続編」。prequel は「前日譚」。bringing back は「再び起用する」。wanted out は「抜けたがっていた」。pushed back は「延期される」。映画の続編情報を共有するのは英語圏のカジュアルな会話でかなり盛り上がるネタ。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 91, japanese: '昔の映画のほうが良かった',
        english: [
            'Old movies were better.',
            'They do not make movies like they used to.',
            'I miss the days when movies had actual stories and not just CGI explosions.',
            "Call me old-fashioned but I think movies peaked in the nineties. The writing was better, the acting was better, and they actually had to use practical effects instead of slapping CGI on everything. These days every movie is either a superhero franchise or a remake of something that was already perfect. Where is the originality? I sound like a grumpy old man and I do not even care. Give me a nineties thriller over any Marvel movie any day of the week.",
        ],
        context: 'they do not make them like they used to は「昔のほうが良かった」の定番フレーズ。peaked は「ピークを迎えた」。practical effects は「実写効果」（CGIの反対）。any day of the week は「いつでも」の強調。こういう「最近の映画はダメだ」論は世界共通。',
        character: 'master', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 92: ドラマにハマる (Binge-Watching)
    // Scene: ミナが海外ドラマにどハマりして寝不足。居酒屋で熱弁する。
    // ────────────────────────────────────────────────────

    {
        daySlot: 92, japanese: '最近ハマってるドラマがある',
        english: [
            'I am hooked on a new show.',
            'I just started this new show and I am completely hooked.',
            'So there is this new show I started watching and I literally cannot stop.',
            "OK so you guys need to hear about this show I started watching last week. I was just scrolling through Netflix looking for something to put on in the background while I ate dinner and I clicked on this random show. Three episodes later it was two AM and I had work the next morning. That is how hooked I am. I have been sleeping like four hours a night because I keep telling myself just one more episode.",
        ],
        context: 'hooked は「ハマっている」。釣り針(hook)にかかったイメージ。addicted より軽い。put on in the background は「BGMのように流す」。just one more episode は一気見する人の決まり文句。英語でもこの「あと1話だけ」現象は共通の笑い話。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: '一気見しちゃった',
        english: [
            'I binged the whole thing.',
            'I could not help it. I binged the whole season in one night.',
            'I told myself I would only watch one episode but I ended up binging the entire season.',
            "It started out innocent. I was like OK just one episode to see what it is about. Next thing I know it is four AM, I have finished all ten episodes, and I am reading fan theories on Reddit. I did not eat, I did not move, I barely went to the bathroom. My neck was killing me from staring at my laptop in bed. But you know what, I have zero regrets. Best weekend I have had in months. My social life is dead but my watchlist is clear.",
        ],
        context: 'binge は「一気に大量消費する」。元は暴飲暴食の意味。binge-watch がドラマの一気見、binge-eat が食べすぎ。next thing I know は「気がついたら」。fan theories は「ファンの考察」。zero regrets は「後悔ゼロ」。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: '続きが気になって寝れない',
        english: [
            'I cannot sleep. I need to know what happens.',
            'The cliffhanger is killing me. I need to watch the next episode.',
            'They ended the episode on such a cliffhanger that I physically could not turn it off.',
            "The episode ended right when the main character opened the door and you hear a scream and then black screen. Credits. That is it. How am I supposed to sleep after that? I need answers. Who screamed? What was behind the door? Is she dead? I spent an hour reading theories online and now I am even more confused. I am going to be useless at work tomorrow because all I am going to be thinking about is that cliffhanger.",
        ],
        context: 'cliffhanger は「次回が気になる終わり方」。崖(cliff)にぶら下がっている(hanging)から。killing me は「たまらない・我慢できない」。I need answers は「答えが欲しい」。このcliffhangerを仕掛けるのが海外ドラマの常套手段。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: 'シーズン何まであるの？',
        english: [
            'How many seasons are there?',
            'Wait, how many seasons does it have?',
            'Please tell me there are at least three seasons. I need more.',
            "How many seasons are there? Because I am already on season two and I am burning through episodes at a terrifying pace. I checked and it says five seasons. Thank God. But then someone told me the last season is kind of disappointing and now I am worried. I do not want to invest all this time and then have the ending ruined. Game of Thrones traumatized an entire generation. I cannot go through that again.",
        ],
        context: 'burning through は「猛スピードで消費する」。at a terrifying pace は「恐ろしいペースで」。Thank God は「よかった」。invest time は「時間を投資する」。Game of Thrones の最終シーズンは英語圏で「ドラマの終わり方」の反面教師として永遠にネタにされる。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: 'あのキャラが好き',
        english: [
            'I love that character.',
            'I am so attached to that character. It is not even funny.',
            'If anything happens to that character I am going to lose it.',
            "I know it is fictional but I am genuinely emotionally invested in this character. Like I care about their happiness more than I care about my own sometimes. When something bad happens to them I actually feel anxious. My friend told me something major happens to them in season four and I have been dreading it. I do not think I can handle it. I am going to need a support group.",
        ],
        context: 'attached は「愛着がある」。emotionally invested は「感情移入している」。I am going to lose it は「もう無理・取り乱す」。dreading は「恐れている」。support group は「支え合うグループ」で大げさに言うところが笑いのポイント。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: '字幕で見る？吹替で見る？',
        english: [
            'Subs or dubs?',
            'Do you watch it with subtitles or dubbed?',
            'Serious question. Do you prefer subtitles or do you watch the dubbed version?',
            "This is going to be controversial but I actually prefer watching things dubbed. I know subtitle purists are going to come for me but sometimes I just want to relax and watch a show without having to read the whole time. My eyes get tired. Plus if I look away for even a second I miss a whole line of dialogue. That said, for Korean dramas, subtitles all the way. The dubbed voices never match the emotional delivery.",
        ],
        context: 'subs は subtitles(字幕)、dubs は dubbed(吹替)の略。purist は「原理主義者」。come for me は「批判してくる」。all the way は「絶対に」。字幕vs吹替論争は英語圏でも永遠のテーマ。アニメファンの間では特に激しい。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: '打ち切りになったのが悲しい',
        english: [
            'I am so sad it got canceled.',
            'They canceled it after one season. I am devastated.',
            'I cannot believe they canceled it. It was the best show on TV and nobody watched it.',
            "I am still not over it getting canceled. It had the best writing, the best acting, and the ratings were actually not that bad. But apparently not bad is not good enough for the streaming platforms. They need blockbuster numbers or they kill it. The worst part is they left it on a massive cliffhanger because they were expecting a second season. So now I will never know what happens. The showrunner posted on Twitter that she had a whole plan for five seasons. Five. And we got one. This is why I have trust issues.",
        ],
        context: 'got canceled は「打ち切りになった」。devastated は「打ちのめされた」。not over it は「まだ立ち直れていない」。ratings は「視聴率」。showrunner は「番組制作責任者」。This is why I have trust issues は「だから信用できない」のユーモア表現。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: 'おすすめしていい？',
        english: [
            'Can I recommend something?',
            'OK, can I recommend a show? You are going to thank me later.',
            'I know you did not ask but I have to recommend this show. It is right up your alley.',
            "OK I am going to be that person who aggressively recommends a show even though nobody asked. But seriously, if you liked Breaking Bad, you need to watch this. Same energy. Same level of writing. It starts a little slow but stick with it. By episode three you are in. By episode five you cannot stop. By episode eight you are questioning your entire moral framework. You will thank me. Or hate me for destroying your sleep schedule. Either way.",
        ],
        context: 'right up your alley は「あなたの好みにピッタリ」。stick with it は「最後まで付き合う・続ける」。aggressively recommend は「グイグイすすめる」。moral framework は「道徳観」。Either way は「どっちにしろ」。良いドラマを布教したい欲求は万国共通。',
        character: 'kenji', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: 'リアタイで見てる',
        english: [
            'I am watching it live.',
            'I watch it in real time every week.',
            'I refuse to wait. I watch it the second it drops every Wednesday.',
            "I am one of those people who sets an alarm for when new episodes drop. I cannot wait. I do not even want to check social media until I have watched it because people love posting spoilers. Last week someone put a major plot twist in their Instagram story with no warning. I almost threw my phone. Now I literally wake up at four AM because that is when it comes out in Japan and I watch it before work. My coworkers think I am crazy but I call it dedication.",
        ],
        context: 'in real time は「リアルタイムで」。drops は「配信される」。新曲、新エピソード、新商品が「出る」をdropと言う。dedication は「献身」。日本語の「リアタイ」に相当する英語はwatch it live か catch it when it drops。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 92, japanese: '最終回どうだった？',
        english: [
            'How was the finale?',
            'So, how was the finale? Was it worth it?',
            'I heard the finale was polarizing. People either loved it or hated it.',
            "I just finished the finale and I have a lot of feelings. I need to process. On one hand, I think they wrapped up most of the storylines in a satisfying way. On the other hand, there were a couple of character arcs that felt rushed and unearned. I do not want to say too much because I know some of you have not seen it yet. But I will say this. It is better than Game of Thrones. Which is a low bar, but still. Bring tissues.",
        ],
        context: 'finale は「最終回」。polarizing は「賛否両論の」。on one hand / on the other hand は「一方では / 他方では」。character arc は「キャラクターの成長曲線」。a low bar は「ハードルが低い」。Bring tissues は「ティッシュ持ってきて（泣くから）」。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 93: 映画館で (At the Cinema)
    // Scene: 全員で映画館に行く。チケット購入からポップコーンまで。
    // ────────────────────────────────────────────────────

    {
        daySlot: 93, japanese: '大人2枚お願いします',
        english: [
            'Two adults, please.',
            'Can I get two adult tickets, please?',
            'Hi, two adult tickets for the seven thirty showing, please.',
            "Hi there. Can I get two adult tickets for the seven thirty showing of that new action movie? Actually wait, what theater is it in? Is it in IMAX or just the regular screen? If IMAX is available I would rather do that even if it costs a little more. Also, are there any good seats left or is it mostly front row? I do not want to sit in the front. My neck cannot take it.",
        ],
        context: 'showing は「上映回」。seven thirty showing は「7時半の回」。screen は「スクリーン」。front row は「最前列」。英語圏の映画館ではチケットを買うときにshowing(上映回)とscreen(スクリーン番号)を指定する。日本のように席を選ぶシステムは最近増えてきた。',
        character: 'takeshi', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: 'ポップコーンのLサイズください',
        english: [
            'Large popcorn, please.',
            'Can I get a large popcorn and a medium drink?',
            'One large popcorn with extra butter and a Coke, please. Actually make it a combo.',
            "Can I get the large popcorn combo? Wait, what comes with the combo? Popcorn and a drink? OK that works. Large popcorn with butter on top and a large Coke. Actually, can you do half butter half no butter? I want it layered so the butter goes all the way through. I made that mistake once where all the butter was just on top and the bottom half was completely dry. Never again.",
        ],
        context: 'combo は「セット」。layered は「層にする」。英語圏のポップコーンはbutterが重要。half and half で「半分ずつ」。日本の映画館のポップコーンにバターをかける文化はアメリカほど強くない。サイズもアメリカのlargeは日本の感覚で言うとXL。',
        character: 'yuki', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: 'いい席まだある？',
        english: [
            'Any good seats left?',
            'Are there any good seats still available?',
            'I do not want to be too close to the screen. What do you have in the middle section?',
            "What seats do you have left? I am looking for something in the middle, maybe a little further back. Not too far though because I cannot see that well from the very back. The sweet spot is like row G through J, center. Is anything available in that range? If not I would rather move to a later showing than sit in a bad seat. I am kind of picky about where I sit in theaters. It makes a huge difference.",
        ],
        context: 'available は「空いている」。sweet spot は「最適な場所」。row は「列」。center は「中央」。picky は「こだわりが強い」。makes a huge difference は「大違い」。映画館での席選びは英語でも結構こだわる人が多い。',
        character: 'kenji', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: '予告編長すぎない？',
        english: [
            'The trailers are so long.',
            'Are we going to sit through twenty minutes of trailers again?',
            'I swear the trailers get longer every year. I feel like the movie should have started by now.',
            "We have been sitting here for twenty-five minutes and the actual movie has not even started yet. Twenty-five minutes of trailers. And half of them are for movies I have already seen trailers for. I specifically showed up late to skip the trailers and I still caught like ten of them. At this point I feel like I have seen the entire plot of six different movies and I have not even watched the one I paid for.",
        ],
        context: 'sit through は「我慢して最後まで見る」。showed up late は「わざと遅く来た」。trailers は「予告編」。trailer はもともと映画のあとに流れたから「後を追うもの」だったけど、今は前に流れる。英語圏でも予告編の長さは永遠の愚痴ネタ。',
        character: 'lisa', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: 'スマホの電源切って',
        english: [
            'Turn off your phone.',
            'Can you please silence your phone?',
            'Hey, put your phone on silent. The movie is about to start.',
            "I cannot believe that guy in front of us is still texting. The movie literally started five minutes ago and his screen is lighting up the whole row. I do not understand people who pay fifteen dollars to sit in a dark theater and stare at their phone. At least turn the brightness down. The glare is killing me. Should I say something? I want to say something. I am going to lean forward and ask him nicely. Or maybe not nicely. Depends on my mood.",
        ],
        context: 'silence は「サイレントにする」。glare は「まぶしい光」。lean forward は「前に身を乗り出す」。映画館でのスマホ使用は英語圏で最も嫌われる行為の一つ。says something は「注意する」の婉曲表現。映画館マナーは日本より厳しい場合も。',
        character: 'kenji', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: '字幕版と吹替版どっちにする？',
        english: [
            'Subbed or dubbed?',
            'Do you want to see the subbed version or the dubbed one?',
            'There is a subtitled showing at seven and a dubbed one at eight. Which do you prefer?',
            "So they have two options. There is a subtitled version at seven and a dubbed version at eight. I personally prefer subtitles because I want to hear the original actors, but I know some people do not like reading while watching a movie. It is a fair point. Especially for action movies where things are happening fast and you miss half the visuals because you are reading the bottom of the screen. What do you guys think?",
        ],
        context: 'subbed は subtitled の略。dubbed は「吹き替え」。showing は「上映回」。original actors は「オリジナルの俳優」。visuals は「映像」。日本では字幕版/吹替版の選択は当たり前だけど、英語圏ではそもそも英語の映画が多いから外国語映画を見るときだけの話。',
        character: 'yuki', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: 'トイレ行っていい？今大事なシーン？',
        english: [
            'Can I go to the bathroom? Is this important?',
            'I really need to go but I do not want to miss anything. Is this scene important?',
            'I have been holding it for twenty minutes. Can I sneak out without missing anything big?',
            "I should not have gotten the large drink. I have been holding it for the last thirty minutes and I am dying. Is anything important happening right now? Like if I miss the next five minutes am I going to be completely lost? Because I cannot focus on the movie at all. All I can think about is how much I need to use the bathroom. Just give me a nod when there is a boring part. Actually, is there an app for this? There has to be an app that tells you the best time to run to the bathroom during a movie.",
        ],
        context: 'holding it は「我慢している」（トイレ）。sneak out は「こっそり出る」。give me a nod は「うなずいて合図して」。実際に RunPee というアプリが存在する。映画中のトイレタイミングを教えてくれる。英語圏では映画中に席を立つのは普通。',
        character: 'takeshi', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: 'エンドロールの後に映像あるかも',
        english: [
            'There might be a post-credits scene.',
            'Wait, do not leave yet. There might be something after the credits.',
            'Stay in your seat. Marvel movies always have a scene after the credits.',
            "Nobody move. I am checking online if there is a post-credits scene. Give me one second. OK yeah, there are actually two. One in the middle of the credits and one at the very end. So we are staying. I know the credits are boring but trust me, these post-credits scenes sometimes set up the entire next movie. If you leave now you are going to miss something important and then complain about being confused when the sequel comes out.",
        ],
        context: 'post-credits scene は「エンドロール後の映像」。Marvel(マーベル)映画がこれを定着させた。mid-credits は「クレジット途中」。set up は「伏線を張る」。英語圏では映画のエンドロール後に席を立つかどうかで客層が分かるという冗談がある。',
        character: 'mina', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: '前の人の頭が邪魔',
        english: [
            'I cannot see over the person in front of me.',
            'That guy is tall. I can barely see the screen.',
            'Of course the tallest person in the theater is sitting right in front of me.',
            "Why does this always happen to me? I specifically picked a good seat and then the tallest human being on the planet sits directly in front of me. I cannot see the bottom third of the screen. I have been leaning left and right for the past ten minutes trying to find an angle that works. At this point I am basically sitting in the next person is seat. Maybe I should just move. There are empty seats over there. Is it weird to move in the middle of a movie?",
        ],
        context: 'lean は「身を傾ける」。angle は「角度」。basically は「ほぼ」。映画館で前の人の頭が邪魔な経験は世界共通。stadium seating(段差のある座席配置)が普及してこの問題は減ったけど、まだ起こる。',
        character: 'lisa', category: 'order', month: '2026-07',
    },
    {
        daySlot: 93, japanese: '出よう、混む前に',
        english: [
            'Let us go before it gets crowded.',
            'Come on, let us leave before the crowd.',
            'If we leave now we can beat the rush. I do not want to wait in line for the parking lot.',
            "OK movie is over. Let us get out of here before everyone else starts moving. If we wait even two minutes we are going to be stuck in that bottleneck at the exit where everyone is shuffling at the same pace. And then the parking lot is going to be a nightmare. Last time I waited twenty minutes just to get out of the parking structure. I would rather miss the post-credits scene than deal with that. Actually no, let us stay for the post-credits scene. But then we book it.",
        ],
        context: 'beat the rush は「混雑を避ける」。bottleneck は「ボトルネック・混雑するポイント」。shuffling は「のろのろ歩く」。parking structure は「立体駐車場」。book it は「急いで移動する」のスラング。映画後の駐車場渋滞は英語圏でも悩みの種。',
        character: 'master', category: 'order', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 94: ネタバレ注意 (Spoiler Alert)
    // Scene: タケシがうっかりネタバレして大炎上。居酒屋が修羅場に。
    // ────────────────────────────────────────────────────

    {
        daySlot: 94, japanese: 'ネタバレしないで',
        english: [
            'No spoilers.',
            'Wait, no spoilers. I have not seen it yet.',
            'Stop right there. I have not watched it yet and I do not want to know anything.',
            "Hold on. Stop talking. Right now. I can see where this is going and I need you to not say another word. I have not seen the latest episode and I have been avoiding social media all day specifically to avoid spoilers. If you ruin this for me I will never forgive you. I am not even exaggerating. I will hold a grudge for the rest of my life. So please, for the love of everything, shut up.",
        ],
        context: 'spoiler は「ネタバレ」。spoil は「台無しにする」。hold a grudge は「恨みを持つ」。for the love of everything は「お願いだから」の大げさ表現。英語圏のネタバレ嫌悪は日本以上に激しい。SNSでネタバレすると本気で友達を失う。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: 'えっ、あれ言っちゃダメだった？',
        english: [
            'Wait, was that a spoiler?',
            'Oh no. Was I not supposed to say that?',
            'I am so sorry. I thought everyone had already seen it. I did not realize.',
            "Oh God. Did I just spoil it? I am so sorry. I genuinely thought everyone had seen it by now. It has been out for like two weeks. In my defense, I did not say the actual ending. I just kind of implied something. Can you pretend you did not hear that? Your brain can do that, right? Just erase the last ten seconds? I feel terrible. I hate when people do this to me and I literally just did the exact same thing.",
        ],
        context: 'In my defense は「弁解させてもらうと」。implied は「ほのめかした」。pretend は「ふりをする」。erase は「消す」。英語圏ではネタバレの「時効」は作品によって違う。大作映画は1-2週間、古い映画は時効なし（ルーク、I am your father レベル）。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: '今のでだいたいわかっちゃったよ',
        english: [
            'I kind of figured it out now.',
            'Well, now I can pretty much guess what happens.',
            'You did not say the ending but you basically gave away enough for me to figure it out.',
            "Great. Thanks a lot. You did not technically say the ending but you dropped enough hints that my brain already connected the dots. I cannot un-know this. It is like someone telling you the magic trick before you see it. The whole experience is ruined. I know exactly what the twist is going to be now. I am going to sit there watching and just waiting for it instead of being surprised. That is the worst part. The anticipation of a surprise you already know is coming.",
        ],
        context: 'figured it out は「推測できた」。connected the dots は「点と点をつないだ」。un-know は造語で「知らなかったことにする」。anticipation は「期待・予期」。ネタバレされて「直接は言ってないけど推測できちゃった」パターンが一番たちが悪い。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: 'ネタバレOKな人いる？',
        english: [
            'Is anyone OK with spoilers?',
            'Can I talk about the ending or has everyone not seen it?',
            'I want to discuss the twist but I need to make sure everyone here has watched it first.',
            "OK before I say anything. Has everyone here seen the finale? Because I really need to talk about it with someone. I have been holding this in for three days and I feel like I am going to explode. If even one person has not seen it I will wait. But if everyone is caught up then we are having this conversation right now because I have opinions and they need to come out. Show of hands. Who has seen it?",
        ],
        context: 'caught up は「追いついた」。show of hands は「挙手」。holding this in は「我慢している」。opinions は「意見」。映画やドラマの感想を語りたい欲求を英語で表現する典型的なパターン。I have opinions は「言いたいことがある」のカジュアルな表現。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: 'あのシーン最高だったよね',
        english: [
            'That scene was amazing.',
            'Can we talk about that scene? It was absolutely incredible.',
            'I keep replaying that scene in my head. The acting was on another level.',
            "I cannot stop thinking about that one scene. You know the one I am talking about. The long take in the hallway where the camera does not cut for like six minutes. The tension was unreal. And the way the music just builds and builds until it suddenly goes silent right before the big reveal. I got actual chills. I had to rewind it and watch it again immediately. That is peak filmmaking right there. I do not know how the director pulled that off.",
        ],
        context: 'long take は「長回し」。cut は「カットを入れる」。tension は「緊張感」。unreal は「現実離れした」（褒め言葉）。chills は「鳥肌」。rewind は「巻き戻す」。peak filmmaking は「映画制作の最高到達点」。pulled it off は「やり遂げた」。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: 'あの展開は予想外だった',
        english: [
            'I did not see that coming.',
            'That twist totally caught me off guard.',
            'I thought I knew where the story was going but I was completely wrong.',
            "I have watched hundreds of movies and I can usually predict the twist by the halfway point. But this one genuinely surprised me. I was sitting there thinking I had it all figured out and then they hit me with that reveal and I literally said what out loud in the theater. People looked at me. I did not care. My mind was blown. I spent the next twenty minutes trying to figure out how I missed all the clues. They were right there the whole time.",
        ],
        context: 'I did not see that coming は「予想外だった」の超定番。caught me off guard は「不意打ちを食らった」。had it all figured out は「全部わかった気でいた」。mind was blown は「衝撃を受けた」。clues は「伏線・手がかり」。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: '二回目見ると伏線に気づく',
        english: [
            'You catch so much more the second time.',
            'The foreshadowing is insane once you know the ending.',
            'I rewatched it and noticed so many things I completely missed the first time.',
            "I watched it again last night and it is almost like a completely different movie when you know the ending. All these little details that seemed random the first time suddenly make perfect sense. There is this one shot where the camera focuses on a painting in the background for like two seconds. I did not think anything of it the first time but now I realize it basically tells you the entire plot. The director planted clues everywhere. I am going to need a third viewing.",
        ],
        context: 'foreshadowing は「伏線」。planted clues は「手がかりを仕込んだ」。did not think anything of it は「何とも思わなかった」。third viewing は「3回目の鑑賞」。英語で映画の伏線を語るのは考察好きの定番。rewatch culture は英語圏で根強い。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: 'レビュー見てから決める',
        english: [
            'Let me check the reviews first.',
            'I always read the reviews before I decide.',
            'I am going to look at Rotten Tomatoes and see what the critics say.',
            "I am not going to waste two hours on a movie without checking the reviews first. I usually look at both the critic score and the audience score on Rotten Tomatoes because sometimes they are completely different. If the critics love it but the audience hates it, that usually means it is artsy but boring. If the audience loves it but the critics hate it, it is probably a fun popcorn movie. I want both scores to be at least seventy percent.",
        ],
        context: 'Rotten Tomatoes は英語圏最大の映画レビューサイト。critic score は「批評家スコア」、audience score は「観客スコア」。artsy は「芸術気取りの」。popcorn movie は「気楽に楽しめる娯楽映画」。レビューサイトの二重スコアを見比べるのは英語圏の映画選び文化。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: 'ネタバレされた恨みは忘れない',
        english: [
            'I will never forget that spoiler.',
            'I am still mad about that spoiler from two years ago.',
            'You spoiled Avengers for me in 2019 and I have not let it go. I never will.',
            "You want to know something? I have a mental list of every person who has ever spoiled a movie or show for me. It is not a short list. And I remember every single one. That guy from work who told me the ending of Breaking Bad at the water cooler? Dead to me. My cousin who posted the Game of Thrones twist on Facebook? We do not talk anymore. These are not jokes. This is real. Spoiling a movie is a violation of trust on the deepest level.",
        ],
        context: 'let it go は「忘れる・水に流す」（アナ雪のあの曲も同じ意味）。dead to me は「もう存在しないも同然」。water cooler は「給湯器」で water cooler talk は「職場の雑談」。violation of trust は「信頼の侵害」。ネタバレの恨みを忘れないのは英語圏でも定番ネタ。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 94, japanese: 'もう時効でしょ',
        english: [
            'It has been long enough.',
            'Come on, the statute of limitations on spoilers has expired.',
            'It came out five years ago. At what point is it OK to talk about it freely?',
            "OK can we talk about the fact that there is no agreed-upon expiration date for spoilers? Like, is it one week? One month? One year? Because I made a comment about a movie that came out in 2015 and someone got genuinely angry at me. At some point it becomes general knowledge. I should not have to whisper about Darth Vader being Luke is father. That has been out for over forty years. There has to be a statute of limitations.",
        ],
        context: 'statute of limitations は「時効」。法律用語だけど日常会話でもジョークとして使う。expiration date は「有効期限」。general knowledge は「常識」。ネタバレの時効問題は英語圏のネット文化で永遠に議論されるテーマ。新作は1-2週間が暗黙のルール。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 95: 俳優と演技 (Actors and Acting)
    // Scene: 誰が一番の名優か論争が居酒屋で勃発。
    // ────────────────────────────────────────────────────

    {
        daySlot: 95, japanese: 'あの俳優の演技がすごい',
        english: [
            'That actor is incredible.',
            'The acting in that movie was next level.',
            'I cannot get over how good the lead actor was. Completely transformed.',
            "Have you seen the latest movie with that actor? I was completely blown away. I did not even recognize them at first. They gained thirty pounds for the role, changed their accent, and apparently stayed in character the entire time on set. That is what dedication looks like. Some actors just show up and say their lines but this person becomes the character. That is the difference between a good actor and a great one.",
        ],
        context: 'next level は「次元が違う」。transformed は「変身した」。stayed in character は「役になりきったまま」。on set は「撮影現場で」。dedication は「献身」。becomes the character は「キャラクターになる」。method acting(メソッド演技)の概念は英語圏で深く浸透している。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: 'あの人って何に出てたっけ？',
        english: [
            'What else have they been in?',
            'I know that face. What else were they in?',
            'That actor looks so familiar but I cannot place them. What else have they done?',
            "This is going to bother me all night. I know I have seen that actor somewhere before but I cannot remember what movie it was. Do not look it up. I want to figure it out myself. Was it that show we watched last year? No. Was it that thriller? No, that was someone else. Wait, were they in that commercial? No, that is ridiculous. OK fine, just look it up. It is going to drive me crazy otherwise. I had it on the tip of my tongue.",
        ],
        context: 'I cannot place them は「どこで見たか思い出せない」。drive me crazy は「気が狂いそう」。on the tip of my tongue は「喉まで出かかっている」。look it up は「調べる」。IMDb(Internet Movie Database)で調べるのが英語圏の定番行動。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: 'アカデミー賞取るべき',
        english: [
            'They deserve an Oscar.',
            'That performance was Oscar-worthy, no question.',
            'If they do not get nominated for that performance, the Oscars have no credibility.',
            "I am calling it right now. If that performance does not get at least a nomination, the Academy has completely lost the plot. I am not even being dramatic. That was hands down the best acting I have seen in years. The scene where they break down in the kitchen? I forgot I was watching a movie. I thought I was watching a real person fall apart. That is how good it was. They better not give the award to someone in a biopic again just because they wore a prosthetic nose.",
        ],
        context: 'Oscar-worthy は「オスカーに値する」。nomination は「ノミネート」。lost the plot は「方向性を見失った」。break down は「崩れ落ちる」。biopic は「伝記映画」。prosthetic nose は「付け鼻」。オスカー予想は英語圏で毎年盛り上がる話題。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: 'あの二人の共演が最高',
        english: [
            'Those two have great chemistry.',
            'The chemistry between those two actors is unreal.',
            'Every scene they are in together is electric. They just play off each other so well.',
            "I do not know what it is about those two but whenever they are on screen together the movie just gets ten times better. Their timing is perfect. The way they finish each other is sentences, the little looks they give each other, the improvised moments. You can tell they are actually friends in real life because it comes through on screen. Some actor pairings just work. Like peanut butter and jelly. You cannot explain it but you know it when you see it.",
        ],
        context: 'chemistry は「相性・ケミストリー」。日本語でも「ケミストリーがある」と使う。electric は「電撃的な」。play off each other は「お互いを活かし合う」。improvised は「アドリブの」。peanut butter and jelly は英語圏の「最強の組み合わせ」の比喩。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: 'あの人、実は歌もうまい',
        english: [
            'They can actually sing too.',
            'Did you know they do their own singing? They are so talented.',
            'I had no idea they could sing until I saw that musical. They are a triple threat.',
            "I just found out they did all their own singing in that musical and I am honestly offended by how talented some people are. Acting, singing, dancing, and apparently they also play the piano. At some point it stops being impressive and starts being unfair. Like, leave some talent for the rest of us. Meanwhile I cannot even sing in the shower without my neighbor complaining. Life is not fair. But seriously, triple threats like that are so rare.",
        ],
        context: 'triple threat は「三拍子揃った人」（演技・歌・ダンス）。offended は「失礼に感じる」（ここでは冗談で「才能がありすぎて腹が立つ」）。leave some for the rest of us は「残りの人にも分けてくれ」。英語圏のエンタメ業界ではtriple threat は最高の褒め言葉。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: 'あの監督の作品は全部見てる',
        english: [
            'I have seen all of their movies.',
            'I watch everything that director puts out.',
            'I am a huge fan of that director. I have been following their work since the beginning.',
            "That director is one of those people whose name alone is enough to get me to buy a ticket. I do not even need to know what the movie is about. If they directed it, I am watching it. I have seen everything they have ever made, including the short films from film school that you can only find on obscure websites. Some of them are terrible but you can already see the style developing. That is what being a real fan is about. Not just the hits, but the whole journey.",
        ],
        context: 'puts out は「作品を出す」。following their work は「作品を追いかけている」。short films は「短編映画」。obscure は「知る人ぞ知る」。the whole journey は「全行程」。英語圏では映画を監督(director)で選ぶファンをauteur theory(作家主義)の信者と呼ぶことも。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: '声優の演技もすごいよね',
        english: [
            'Voice acting is underrated.',
            'People do not give voice actors enough credit.',
            'Voice acting is a completely different skill. Some of the best performances are animated.',
            "People always overlook voice acting but honestly it might be harder than regular acting in some ways. You cannot use your face or body. Everything has to come through your voice. The emotion, the timing, the personality. And animation voice actors sometimes record their lines alone in a booth without the other actors. They are literally acting with nobody. Try delivering a heartfelt scene to a microphone and a glass window. Some voice actors are absolute legends and they never get the recognition they deserve.",
        ],
        context: 'underrated は「過小評価されている」。give credit は「正当に評価する」。booth は「ブース・収録室」。heartfelt は「心のこもった」。legends は「伝説的な人」。recognition は「認知・評価」。英語圏ではアニメ声優の地位は日本ほど高くないが、近年変わりつつある。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: 'あの人のインタビュー面白い',
        english: [
            'Their interviews are hilarious.',
            'Have you seen their talk show appearances? They are so funny.',
            'I think I watch more of their interviews than their actual movies at this point.',
            "I went down a YouTube rabbit hole last night watching that actor is interviews and I could not stop laughing. Some actors are kind of boring in real life but this person is genuinely one of the funniest people on the planet. Their chemistry with the talk show hosts is incredible. There is this one clip where they tell a story about getting stuck in an elevator during a press tour and it has like twenty million views. I must have watched it five times. They could honestly do stand-up comedy if acting does not work out.",
        ],
        context: 'rabbit hole は「深みにはまる」（不思議の国のアリスが語源）。talk show は「トーク番組」。press tour は「宣伝ツアー」。clip は「切り抜き動画」。stand-up comedy は「一人で舞台に立つお笑い」。YouTube で俳優のインタビュー切り抜きを見るのは英語圏で大人気。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: '好きな俳優が出てるだけで見る',
        english: [
            'I watch anything with them in it.',
            'If they are in it, I am watching it. No questions asked.',
            'It could be the worst movie ever made but if that actor is in it, I am there opening night.',
            "I have a very short list of actors that I will watch in literally anything. It does not matter if the reviews are terrible. It does not matter if the plot sounds ridiculous. If that person is in the cast, I am buying a ticket. I have sat through some truly awful movies because of this policy and I regret nothing. Because even in a bad movie, a great actor is still worth watching. They can elevate mediocre material just by being on screen. That is star power.",
        ],
        context: 'opening night は「公開初日」。no questions asked は「理由は聞かない」。sat through は「我慢して最後まで見た」。elevate は「高める」。mediocre は「平凡な」。star power は「スターの力」。英語でも推し俳優を理由に映画を見る文化は根強い。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 95, japanese: '昔の映画の俳優は格が違う',
        english: [
            'Classic actors hit different.',
            'Actors from the golden age had a certain presence.',
            'There is something about old Hollywood actors that modern actors just cannot replicate.',
            "I am going to sound like a boomer but actors from the golden age of Hollywood had something that you just do not see anymore. They had this presence, this gravitas. When they walked into a frame you could not look away. Modern actors are great, do not get me wrong. But back then, acting was almost like a craft that people studied and perfected over decades. Now everything is so fast. People become famous on social media and suddenly they are starring in blockbusters. Different era, different standards.",
        ],
        context: 'hit different は「一味違う」の若者言葉。golden age は「黄金時代」。gravitas は「威厳・重み」。sound like a boomer は「年寄りくさいこと言うけど」。craft は「職人技」。blockbusters は「大作映画」。異なる時代の俳優を比較するのは居酒屋で盛り上がる定番テーマ。',
        character: 'master', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 96: ジャンルの好み (Genre Preferences)
    // Scene: 居酒屋で好きな映画ジャンルを語り合う。好みが分かれすぎて面白い。
    // ────────────────────────────────────────────────────

    {
        daySlot: 96, japanese: '何系の映画が好き？',
        english: [
            'What kind of movies do you like?',
            'What genres are you into?',
            'If you had to pick one genre to watch for the rest of your life, what would it be?',
            "So I am curious. What genres are you guys into? Because I feel like you can tell a lot about a person by the kind of movies they watch. Like, thriller people are usually overthinkers. Comedy people are usually the life of the party. And horror people are either completely fearless or deeply disturbed. There is no in-between. I am a documentary person which probably means I am boring but at least I am well-informed.",
        ],
        context: 'genres は「ジャンル」。into は「ハマっている」。overthinker は「考えすぎる人」。life of the party は「場を盛り上げる人」。no in-between は「中間はない」。映画の好みで人の性格がわかるという話は英語圏でもよく話題になる。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: 'ホラーだけは無理',
        english: [
            'I cannot do horror.',
            'Horror movies? Absolutely not. I cannot handle them.',
            'I do not understand people who pay money to be scared. That is insane to me.',
            "I am going to be completely honest. I cannot watch horror movies. I tried. I really tried. But I am that person who covers my eyes for eighty percent of the movie and then peeks through my fingers at the worst possible moment. I once watched a horror movie and could not sleep for a week. A week. I had to leave the hallway light on like I was five years old. My husband still makes fun of me for it. I am a grown adult who is afraid of fictional monsters and I have accepted this about myself.",
        ],
        context: 'I cannot handle it は「無理・耐えられない」。covers my eyes は「目を覆う」。peeks through は「隙間から覗く」。hallway light は「廊下の電気」。accepted this about myself は「自分のこの性質を受け入れた」。ホラー嫌いを告白するのは英語圏でも共感を得やすいネタ。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: 'アクション映画は頭空っぽで見れる',
        english: [
            'I can just turn my brain off for action movies.',
            'Action movies are perfect when you do not want to think.',
            'Sometimes I just want explosions and car chases. No deep plot, no symbolism, just fun.',
            "After a long week at work, the last thing I want to do is watch some two-hour art film that makes me think about the meaning of life. I just want to sit on my couch, eat pizza, and watch things explode. Is that so wrong? Action movies get a bad reputation for being dumb but that is exactly why they are great. They are not trying to be anything other than entertaining. I do not need every movie to be a cinematic masterpiece. Sometimes a masterpiece is just a really good car chase.",
        ],
        context: 'turn my brain off は「頭を空っぽにする」。car chases は「カーチェイス」。art film は「芸術映画」。get a bad reputation は「悪い評判を持つ」。cinematic masterpiece は「映画の傑作」。英語圏でも「考えなくていい映画」を堂々と好きだと言う人は多い。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: 'ドキュメンタリーにハマってる',
        english: [
            'I am into documentaries lately.',
            'I have been watching a lot of documentaries. They are addicting.',
            'I used to think documentaries were boring but now I am obsessed. Reality is crazier than fiction.',
            "I went through a phase where I thought documentaries were for old people and then I watched one about a guy who pretended to be a millionaire for ten years and got away with it. After that I was hooked. True crime, nature, social experiments, you name it. The craziest thing about documentaries is that everything you are watching actually happened. No script, no actors, just real life being absolutely unhinged. I have learned more from Netflix documentaries than I did in four years of college.",
        ],
        context: 'went through a phase は「一時的な期間を経験した」。got away with it は「バレずにやり遂げた」。true crime は「実録犯罪もの」。unhinged は「常軌を逸した」。documentaryブームは英語圏ではNetflixが火付け役。Making a Murderer やTiger Kingが社会現象に。',
        character: 'kenji', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: 'ラブコメは意外と好き',
        english: [
            'I actually like rom-coms.',
            'Do not judge me but I am a sucker for romantic comedies.',
            'There is something comforting about a good rom-com. You know exactly how it ends and that is fine.',
            "I know rom-coms get made fun of for being predictable but that is literally the point. You watch them because you want to feel good. You want the couple to get together at the end. You want the big airport chase or the kiss in the rain. It is comfort food for your brain. Like nobody criticizes mac and cheese for being simple. It is supposed to be simple. That is why it is good. Same thing with rom-coms. Let people enjoy things without being pretentious about it.",
        ],
        context: 'rom-com は romantic comedy の略。sucker for は「〜に弱い」。comfort food は「心が安らぐ食べ物」。pretentious は「気取った・通ぶった」。airport chase は「空港での追いかけっこ」。Let people enjoy things は英語のネットでよく使われる「好きにさせてよ」の定番フレーズ。',
        character: 'master', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: 'SF映画は設定が面白い',
        english: [
            'Sci-fi has the coolest concepts.',
            'I love sci-fi because the world-building is always insane.',
            'Give me a movie with time travel or alternate dimensions and I am happy.',
            "What I love about sci-fi is that it takes ideas that seem impossible and makes you actually think about them. Like what if we could upload our consciousness to a computer? What if there were parallel universes where different versions of you made different choices? These are not just fun movie plots. They are actual philosophical questions wrapped in special effects. The best sci-fi movies are basically philosophy classes disguised as entertainment. That is why they stick with you long after the credits roll.",
        ],
        context: 'sci-fi は science fiction の略。world-building は「世界観の構築」。alternate dimensions は「別の次元」。consciousness は「意識」。stick with you は「心に残る」。credits roll は「エンドロールが流れる」。SF映画の哲学的側面を語るのは居酒屋で盛り上がるテーマ。',
        character: 'kenji', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: 'アニメも立派な映画だよ',
        english: [
            'Anime is cinema.',
            'Animated movies deserve the same respect as live action.',
            'People who say anime is for kids have clearly never watched a Miyazaki film.',
            "I get so frustrated when people dismiss animated movies as just for kids. Have you seen what Studio Ghibli produces? Have you seen the emotional depth of something like Your Name or A Silent Voice? These are films that deal with grief, identity, love, and loss in ways that most live-action movies do not even attempt. The animation medium allows you to tell stories that would be impossible in live action. It is not a lesser form of filmmaking. It is a different and equally valid one.",
        ],
        context: 'cinema は「映画芸術」。live action は「実写」。dismiss は「軽視する」。emotional depth は「感情の深さ」。medium は「媒体」。lesser は「劣った」。equally valid は「同等に正当な」。英語圏ではアニメの地位が年々向上しているが、まだ偏見も残っている。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: '怖い映画見た後の帰り道が怖い',
        english: [
            'The walk home after a horror movie is terrifying.',
            'Why do I always watch horror movies at night and then have to walk home?',
            'I watched a ghost movie and then had to walk through a dark parking lot. Worst decision ever.',
            "So last week I made the brilliant decision to watch a horror movie alone at the theater on a weeknight. The movie itself was fine. I was fine in the theater. But then the movie ended and I had to walk to my car in a dark parking lot at eleven PM. Suddenly every shadow was a ghost. Every noise was a serial killer. I power walked to my car, locked the doors immediately, and checked the back seat before I drove away. I am thirty-two years old. I should not be living like this.",
        ],
        context: 'terrifying は「恐ろしい」。power walked は「早歩きした」。checked the back seat は「後部座席を確認した」。I should not be living like this は「こんな生活をするべきじゃない」の自嘲。ホラー映画後の帰り道の恐怖は万国共通のあるあるネタ。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: 'B級映画も好き',
        english: [
            'I love B-movies.',
            'Bad movies can be so fun if you watch them with the right people.',
            'Some of my favorite movie nights are when we watch something so bad it is good.',
            "There is a special joy in watching a truly terrible movie. I am talking about the kind of movie where the acting is wooden, the special effects look like they cost twelve dollars, and the plot makes absolutely no sense. But if you watch it with friends and a couple of drinks, it becomes the most entertaining thing in the world. You end up laughing harder than you would at any comedy. My friends and I have a monthly bad movie night and it is honestly the highlight of my social life.",
        ],
        context: 'B-movie は「低予算映画」。so bad it is good は「ひどすぎて逆にいい」。wooden は「棒読みの」。highlight は「ハイライト」。bad movie night は英語圏で実際に人気のあるイベント。MST3K(Mystery Science Theater 3000)という番組がB級映画を笑いながら見る文化を広めた。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 96, japanese: '結局好みは人それぞれ',
        english: [
            'To each their own.',
            'Everyone has different taste and that is totally fine.',
            'The beauty of movies is that there is something for everyone. No genre is better than another.',
            "At the end of the day, there is no such thing as a wrong genre to like. If you love horror, great. If you love rom-coms, great. If you love black and white foreign films from the nineteen fifties, that is also great. The worst thing you can do is judge someone for their taste in movies. I have a friend who only watches Hallmark Christmas movies and you know what? She is happier than any film snob I have ever met. Happiness is the whole point. Watch what makes you happy and ignore the gatekeepers.",
        ],
        context: 'to each their own は「人それぞれ」。film snob は「映画通ぶる人」。gatekeeper は「門番」で「本物のファンはこうあるべき」と決めつける人。Hallmark Christmas movies は毎年大量に作られる定番恋愛映画。英語圏では嘲笑の対象だが実は大人気。',
        character: 'master', category: 'feeling', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 97: 感想を語る (Sharing Reviews)
    // Scene: 居酒屋で映画の感想を語るのが恒例になった。今夜も激論。
    // ────────────────────────────────────────────────────

    {
        daySlot: 97, japanese: '正直微妙だった',
        english: [
            'Honestly, it was just OK.',
            'It was not bad but it was not great either.',
            'I wanted to like it more than I did. Something about it just did not click.',
            "I do not know. I went in with really high expectations because everyone kept telling me how amazing it was. And it was fine. The acting was good. The visuals were stunning. But something was missing and I cannot put my finger on what it was. It just did not grab me the way I thought it would. Maybe I was overhyped. That happens sometimes. When everyone tells you something is the best thing ever, nothing can live up to that. I would give it like a six out of ten.",
        ],
        context: 'did not click は「しっくりこなかった」。put my finger on は「何か特定できない」。overhyped は「期待が上がりすぎた」。live up to は「期待に応える」。six out of ten は「10点中6点」。微妙な感想を英語で伝えるのは意外と難しい。直接的に悪いとは言わず間接的に表現する。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: '期待してなかったけど良かった',
        english: [
            'It was way better than I expected.',
            'I had zero expectations and it blew me away.',
            'I only watched it because nothing else was on and it turned out to be incredible.',
            "I was completely wrong about this movie. I saw the trailer and thought it looked generic and forgettable. Another action movie with a predictable plot. But my friend dragged me to the theater and within the first fifteen minutes I was all in. The writing was sharp, the characters were actually interesting, and there was this twist halfway through that completely changed the movie. I walked out of the theater thinking that might be the best movie I have seen all year. Goes to show you cannot judge a movie by its trailer.",
        ],
        context: 'blew me away は「衝撃を受けた」。generic は「ありきたりの」。dragged me は「引きずって連れて行った」。all in は「完全にのめり込んだ」。sharp は「切れ味のある」。goes to show は「それが証明している」。低期待からの逆転体験は映画トークの定番ネタ。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: '映像はきれいだけど話がつまらない',
        english: [
            'It looked great but the story was boring.',
            'Visually stunning but the plot was paper thin.',
            'I felt like I was watching a two-hour screensaver. Beautiful but completely empty.',
            "I want to be clear. Technically, that movie is a masterpiece. Every single frame could be a painting. The cinematography was breathtaking. The color grading was perfect. But I am sorry, a movie needs more than pretty pictures. Where was the story? Where were the characters I could actually care about? I felt nothing the entire time. It was like eating at a fancy restaurant where the food looks amazing on the plate but has no flavor. All presentation, no substance. Give me an ugly movie with a great story any day.",
        ],
        context: 'paper thin は「薄っぺらい」。screensaver は「スクリーンセーバー」（きれいだけど中身がない比喩）。cinematography は「撮影技術」。color grading は「色調補正」。substance は「中身」。All presentation, no substance は「見た目だけで中身がない」の完璧な表現。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: '泣ける映画はやっぱりいい',
        english: [
            'A good cry is so cathartic.',
            'I love a movie that makes me ugly cry.',
            'There is nothing like a good emotional movie to just let everything out.',
            "Call me a softie but I think the best movies are the ones that make you feel something. And by feel something I mean cry uncontrollably into a pillow while your cat judges you. Last week I watched this movie about a father and daughter and I was a wreck by the end. Just absolutely destroyed. But here is the thing. After I was done crying, I felt amazing. Like emotionally reset. It is like a workout for your feelings. Sometimes you need a good cry the same way you need a good run. It clears everything out.",
        ],
        context: 'cathartic は「浄化作用のある」。ugly cry は「ぐちゃぐちゃに泣く」。wreck は「ボロボロの状態」。emotionally reset は「感情的にリセットされた」。workout for your feelings は「感情のエクササイズ」。泣ける映画の効用を語るのは英語圏でも定番の映画トーク。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: '監督の意図がわからなかった',
        english: [
            'I did not get it.',
            'Honestly, I have no idea what the director was going for.',
            'Maybe I am not smart enough for this movie but I was completely lost the whole time.',
            "Can someone please explain to me what that movie was about? Because I sat there for two and a half hours and I genuinely do not know what happened. Was it a metaphor? Was it a dream? Was the main character dead the whole time? I read three different analyses online and they all said different things. At some point, if nobody understands your movie, maybe the problem is not the audience. Maybe the problem is your movie. I know that is controversial but I stand by it.",
        ],
        context: 'I did not get it は「理解できなかった」。going for は「目指していた」。metaphor は「比喩」。analyses は「分析」(analysisの複数形)。I stand by it は「その意見を変えない」。難解な映画に対する率直な感想は英語でもこう言えると楽。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: '音楽がよかった',
        english: [
            'The soundtrack was amazing.',
            'The music made that movie. Without it, it would have been average.',
            'I have been listening to the soundtrack on repeat since I saw it. It is that good.',
            "Can we talk about the soundtrack for a second? Because I think it was the best part of the entire movie. There was this one track that played during the emotional climax and I just completely lost it. The way the music swelled right at that moment was perfect. I went home and immediately looked up the soundtrack on Spotify and I have been listening to it every day since. Music has this incredible power to make a good scene unforgettable. Without that score, the movie would have been half as impactful.",
        ],
        context: 'soundtrack は「サウンドトラック」。on repeat は「リピートで」。swelled は「盛り上がった」。score は「映画音楽」（soundtrack と微妙に違い、score は映画のために作曲されたオリジナル音楽）。impactful は「印象的な」。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: '評価割れてるよね',
        english: [
            'Reviews are pretty split on this one.',
            'People either love it or hate it. There is no middle ground.',
            'It is one of those polarizing movies where nobody can agree.',
            "I find it fascinating how the same movie can get five-star reviews and one-star reviews. Like, did we watch the same movie? Some people are calling it a masterpiece and others are calling it the worst thing they have ever seen. And both sides are equally passionate about their opinion. I think that is actually a sign of a good movie though. The safest movies are the ones that everybody thinks are just OK. The really great ones always divide people. If a movie makes you feel strongly either way, it did its job.",
        ],
        context: 'split は「割れている」。no middle ground は「中間がない」。polarizing は「賛否両論の」。five-star と one-star は「五つ星と一つ星」。did its job は「役割を果たした」。映画のレビューが割れているときの議論は英語圏の映画トークの定番。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: 'もう一回見たい',
        english: [
            'I want to watch it again.',
            'I could honestly watch it again right now.',
            'It is one of those movies that gets better every time you watch it.',
            "There are two kinds of movies. Movies you watch once and forget about and movies that live in your head rent-free for weeks. This is the second kind. I have been thinking about it nonstop since I watched it. I already want to watch it again because I know I missed things the first time. Some movies reveal new layers every time you rewatch them. New details, new meanings, new connections. The mark of a truly great movie is that it rewards repeat viewings. This one definitely does.",
        ],
        context: 'lives in your head rent-free は「頭の中に家賃も払わず居座る」というネットスラング。reveal new layers は「新しい層を見せる」。reward repeat viewings は「繰り返し見ることに応える」。rent-free は2020年頃からSNSで広まった表現で、忘れられないことに使う。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: '友達にすすめたい',
        english: [
            'I have to tell my friends about this.',
            'I am going to make all my friends watch this.',
            'I have already sent the trailer to like five people. Everyone needs to see this movie.',
            "The first thing I did when the credits rolled was pull out my phone and text everyone I know. You have to watch this movie. No context, no explanation, just trust me. I have already convinced three people and I am working on two more. One of them is resistant because she does not like that genre but I told her this one is different. I am like a missionary for this movie at this point. I will not rest until everyone in my life has seen it.",
        ],
        context: 'credits rolled は「エンドロールが流れた」。convinced は「説得した」。resistant は「抵抗がある」。missionary は「宣教師」。I will not rest until は「〜するまで休まない」。好きな映画を布教する情熱を表す英語。missionary は大げさだが英語圏ではユーモアとして通じる。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 97, japanese: '映画って最高の趣味だよね',
        english: [
            'Movies are the best hobby.',
            'There is nothing like a good movie to end the day.',
            'No matter how bad my day was, a good movie always makes it better.',
            "You know what I love about movies? They are the most accessible form of art in the world. You do not need to be educated to appreciate them. You do not need to be rich. You do not need special equipment. You just sit down, press play, and for two hours you get to live someone else is life. You get to feel things you have never felt. You get to see places you have never been. It is the closest thing we have to teleportation. And when you find a movie that really speaks to you, it changes something inside you. That is not just entertainment. That is magic.",
        ],
        context: 'accessible は「誰でもアクセスできる」。speaks to you は「心に響く」。teleportation は「瞬間移動」。the closest thing we have to は「〜に最も近いもの」。映画への愛を語る締めの言葉。Month 4 Week 13 の映画テーマを居酒屋の温かい空気で締めくくるマスターらしい一言。',
        character: 'master', category: 'social', month: '2026-07',
    },

];

// ============================================================
// WEEK 13 DAY THEMES
// ============================================================

export const MONTH4_W13_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    91: {
        title: '映画を語る', titleEn: 'Talking About Movies', category: 'social',
        scene: 'ユキが居酒屋で「最近面白い映画ない？」と話を振る。全員のおすすめが意外すぎる。',
        keywords: [
            { en: 'plot', ja: 'あらすじ', pron: 'プロット', example: 'The plot was kind of predictable.', note: 'storyより技術的。「筋書き」のニュアンス。plot twist=どんでん返し。plot hole=脚本の矛盾。' },
            { en: 'spoiler', ja: 'ネタバレ', pron: 'スポイラー', example: 'No spoilers!', note: 'spoil=台無しにする。ネタバレする人=spoiler。spoiler alert=ネタバレ注意。英語圏でも超嫌われる行為。' },
            { en: 'binge', ja: '一気見する', pron: 'ビンジ', example: 'I binged the whole season.', note: 'binge-watch=一気見。元は「暴飲暴食」。binge eating, binge drinking。何でもやりすぎに使う。' },
            { en: 'sequel', ja: '続編', pron: 'シークエル', example: 'The sequel was even better.', note: 'sequel=続編、prequel=前日譚、reboot=リブート、remake=リメイク。franchise=シリーズ全体。' },
            { en: 'genre', ja: 'ジャンル', pron: 'ジャンラ', example: 'What genre do you like?', note: '発音注意。「ジャンル」じゃなくて「ジャンラ」。フランス語由来。英語圏でもよく間違える単語。' },
        ],
    },
    92: {
        title: 'ドラマにハマる', titleEn: 'Binge-Watching', category: 'feeling',
        scene: 'ミナが海外ドラマにどハマりして寝不足。居酒屋で熱弁する。',
        keywords: [
            { en: 'hooked', ja: 'ハマっている', pron: 'フックト', example: 'I am completely hooked on this show.', note: 'hook=釣り針。釣り針にかかった=ハマった。get hooked=ハマる。addicted より軽くてカジュアル。' },
            { en: 'cliffhanger', ja: '続きが気になる終わり方', pron: 'クリフハンガー', example: 'That cliffhanger is killing me.', note: 'cliff=崖+hanger=ぶら下がる。崖にぶら下がった状態で終わる=次が気になる。ドラマの定番手法。' },
            { en: 'season', ja: 'シーズン', pron: 'シーズン', example: 'How many seasons are there?', note: '日本語の「シーズン」と同じだけど、series(イギリス英語)とseason(アメリカ英語)の違いがある。' },
            { en: 'finale', ja: '最終回', pron: 'フィナーリー', example: 'The finale was disappointing.', note: '発音注意。「フィナーレ」ではなく「フィナーリー」。season finale=シーズン最終回。series finale=最終回。' },
            { en: 'canceled', ja: '打ち切り', pron: 'キャンセルド', example: 'They canceled my favorite show.', note: 'get canceled=打ち切りになる。renewed=続編決定。最近はcancel cultureの意味も。文脈で判断。' },
        ],
    },
    93: {
        title: '映画館で', titleEn: 'At the Cinema', category: 'order',
        scene: '全員で映画館に行く。チケット購入からポップコーンまで。',
        keywords: [
            { en: 'showing', ja: '上映回', pron: 'ショウイング', example: 'What time is the next showing?', note: '上映回=showing。上映時間=showtime。matinee=昼の上映（割引あり）。late showing=レイトショー。' },
            { en: 'trailer', ja: '予告編', pron: 'トレイラー', example: 'The trailers were so long.', note: '元は映画の後に流れたからtrailer(後を追うもの)。今は前に流れるけど名前はそのまま。teaser=短い予告。' },
            { en: 'screen', ja: 'スクリーン', pron: 'スクリーン', example: 'What screen is it in?', note: 'screen 3=3番スクリーン。IMAX screen=IMAXスクリーン。silver screen=映画界の古い呼び方。' },
            { en: 'combo', ja: 'セット', pron: 'コンボ', example: 'I will take the large combo.', note: 'combination の略。ポップコーン+ドリンクのセット。deal, special, package も似た意味。コスパを気にするとき使う。' },
            { en: 'post-credits', ja: 'エンドロール後', pron: 'ポストクレジッツ', example: 'Is there a post-credits scene?', note: 'Marvelが広めた文化。mid-credits=エンドロール途中。stinger=最後のおまけ映像。映画ファンは必ず最後まで残る。' },
        ],
    },
    94: {
        title: 'ネタバレ注意', titleEn: 'Spoiler Alert', category: 'social',
        scene: 'タケシがうっかりネタバレして大炎上。居酒屋が修羅場に。',
        keywords: [
            { en: 'spoil', ja: 'ネタバレする', pron: 'スポイル', example: 'Do not spoil it for me.', note: 'spoil=台無しにする。spoiler=ネタバレする人/ネタバレ内容。spoiler-free=ネタバレなし。' },
            { en: 'twist', ja: 'どんでん返し', pron: 'ツイスト', example: 'I did not see the twist coming.', note: 'plot twist=ストーリーのどんでん返し。twist ending=予想外の結末。twisty=展開が読めない。' },
            { en: 'foreshadowing', ja: '伏線', pron: 'フォーシャドウイング', example: 'The foreshadowing was so clever.', note: 'fore=前+shadow=影。前もって影を落とす=伏線。set up(伏線を張る)とpay off(伏線を回収する)がセット。' },
            { en: 'reveal', ja: '明かす・暴露', pron: 'リヴィール', example: 'The big reveal shocked everyone.', note: 'reveal=明かす。big reveal=大きな真相解明。character reveal=キャラクターの正体が分かる場面。' },
            { en: 'statue of limitations', ja: '時効', pron: 'スタチュートオブリミテーションズ', example: 'Is there a spoiler statute of limitations?', note: '法律用語だけど日常会話でジョークとして使う。ネタバレの時効は英語圏で永遠に議論されるテーマ。' },
        ],
    },
    95: {
        title: '俳優と演技', titleEn: 'Actors and Acting', category: 'social',
        scene: '誰が一番の名優か論争が居酒屋で勃発。',
        keywords: [
            { en: 'chemistry', ja: '相性・ケミストリー', pron: 'ケミストリー', example: 'Those two have incredible chemistry.', note: '化学のchemistryと同じ語源。俳優同士の相性。on-screen chemistry=画面上の相性。日本語でもそのまま使う。' },
            { en: 'cast', ja: 'キャスト・出演者', pron: 'キャスト', example: 'The cast was incredible.', note: '発音は日本語の「キャスト」とほぼ同じだけど、casting=配役を決めること。miscast=ミスキャスト。' },
            { en: 'Oscar', ja: 'アカデミー賞', pron: 'オスカー', example: 'That performance is Oscar-worthy.', note: 'Oscar=アカデミー賞の通称。Oscar-worthy=オスカーに値する。nomination=ノミネート。snub=ノミネートされるべきなのにされなかった。' },
            { en: 'range', ja: '演技の幅', pron: 'レンジ', example: 'That actor has incredible range.', note: 'range=幅。コメディからシリアスまでできる=has range。versatile(多才な)とほぼ同義。typecasting=同じ役ばかりやらされること。' },
            { en: 'underrated', ja: '過小評価された', pron: 'アンダーレイテッド', example: 'That actor is so underrated.', note: 'underrated=もっと評価されるべき。overrated=過大評価。properly rated=適正評価。映画トークで最も使う形容詞の一つ。' },
        ],
    },
    96: {
        title: 'ジャンルの好み', titleEn: 'Genre Preferences', category: 'feeling',
        scene: '居酒屋で好きな映画ジャンルを語り合う。好みが分かれすぎて面白い。',
        keywords: [
            { en: 'thriller', ja: 'スリラー', pron: 'スリラー', example: 'I love a good psychological thriller.', note: 'thriller=スリラー。psychological thriller=心理スリラー。horror より怖くないけどハラハラする。suspense とほぼ同義。' },
            { en: 'rom-com', ja: 'ラブコメ', pron: 'ロムコム', example: 'I am a sucker for rom-coms.', note: 'romantic comedy の略。日本語の「ラブコメ」と同じ概念。chick flick=女性向け映画（やや古い表現）。' },
            { en: 'documentary', ja: 'ドキュメンタリー', pron: 'ドキュメンタリー', example: 'I have been watching a lot of documentaries.', note: 'docuseries=ドキュメンタリーシリーズ。true crime doc=実録犯罪ドキュメンタリー。Netflix がジャンルを大衆化した。' },
            { en: 'sci-fi', ja: 'SF・サイエンスフィクション', pron: 'サイファイ', example: 'Sci-fi movies blow my mind.', note: 'science fiction の略。発音は「サイファイ」。space opera=宇宙もの。dystopian=ディストピア。cyberpunk=サイバーパンク。' },
            { en: 'comfort movie', ja: '何度も見る安心映画', pron: 'コンフォートムービー', example: 'That is my comfort movie.', note: 'comfort food(心が安らぐ食べ物)の映画版。何度見ても安心する映画。guilty pleasure=好きだけど恥ずかしい作品。' },
        ],
    },
    97: {
        title: '感想を語る', titleEn: 'Sharing Reviews', category: 'social',
        scene: '居酒屋で映画の感想を語るのが恒例になった。今夜も激論。',
        keywords: [
            { en: 'overrated', ja: '過大評価されている', pron: 'オーバーレイテッド', example: 'I think that movie is overrated.', note: 'overrated=世間の評価ほどではない。underrated の反対。unpopular opinion(少数派の意見)と一緒に使われることが多い。' },
            { en: 'masterpiece', ja: '傑作', pron: 'マスターピース', example: 'That is a genuine masterpiece.', note: 'master=匠+piece=作品。映画に対する最高の褒め言葉。gem=隠れた名作。classic=時代を超える名作。' },
            { en: 'soundtrack', ja: 'サウンドトラック', pron: 'サウンドトラック', example: 'The soundtrack was incredible.', note: 'soundtrack=映画の音楽全体。score=映画のために作曲されたオリジナル音楽。OST=original soundtrack。' },
            { en: 'polarizing', ja: '賛否両論の', pron: 'ポーラライジング', example: 'It is a very polarizing movie.', note: 'polarize=二極化する。divisive とほぼ同義。controversial=議論を呼ぶ。love it or hate it=好きか嫌いかの二択。' },
            { en: 'rent-free', ja: '頭から離れない', pron: 'レントフリー', example: 'That scene lives in my head rent-free.', note: '「家賃(rent)も払わず頭の中に住んでいる」。2020年頃からSNSで流行。忘れられない映画/シーン/曲に使う。' },
        ],
    },
};
