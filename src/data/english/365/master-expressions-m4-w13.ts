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
            "Oh yeah, actually I just saw this one thing last week. You'd love it, let me think of the name.",
        ],
        jaTranslations: [
            '最近なんかいい映画見た？',
            'ねえ、最近なんかいい映画見た？',
            '最近なんかいいの見た？今週末なんか見たいんだよね。',
            'あー、実は先週ちょうど一本見たんだよ。絶対好きだと思う、タイトルなんだっけ。',
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
            "Right? I couldn't stop thinking about it for days. We gotta talk about that ending.",
        ],
        jaTranslations: [
            'あの映画やばかった。',
            'いや、あの映画マジでやばかった。',
            '先週末見たんだけど、まだ頭から離れない。それぐらいよかった。',
            'だろ？俺も何日も考えちゃったよ。あのラスト語りたいんだけど。',
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
            "It's kind of a thriller but with a sci-fi twist. Trust me, the less you know going in, the better.",
        ],
        jaTranslations: [
            'どんな話？',
            'え、どんな話？ざっくり教えて。',
            'お、気になる。どんな話？でもネタバレはやめてよ。',
            'スリラーっぽいんだけどSF要素もあるんだよ。マジで前情報なしで見たほうがいい。',
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
            "Ugh, fine. But you're watching it this weekend, no excuses. Text me the second you finish.",
        ],
        jaTranslations: [
            'あらすじ言うとネタバレになるんだよね。',
            '説明しようとするとどうしてもバレちゃうんだよな。',
            'あのさ、内容言っちゃうと全部台無しになるタイプの映画なんだよ。',
            'はぁ、わかった。でも今週末絶対見ろよ、言い訳なしな。見終わったら即連絡して。',
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
            "Yeah, IMAX if you can. The sound alone is worth it, honestly.",
        ],
        jaTranslations: [
            '映画館で見た方がいいよ。',
            'できれば大きいスクリーンで見ろ。',
            'スマホで見る映画じゃないぞ。映画館行け。',
            'IMAXがあれば最高。音だけでも行く価値あるぞ、マジで。',
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
            "Not gonna lie, I teared up a little. That last scene hit way harder than I expected.",
        ],
        jaTranslations: [
            '泣いた？',
            'え、マジで泣いた？',
            '正直に言って。泣いた？だって私は絶対泣いたから。',
            '嘘つかない、ちょっとウルっときた。あのラストシーン、思ったよりキた。',
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
            "Ha, no way! You missed the best part. You seriously need to rewatch it from the beginning.",
        ],
        jaTranslations: [
            '途中で寝ちゃった。',
            '悪いけど、途中で寝落ちした。',
            '引かないでよ、開始30分で寝落ちした。疲れてたんだよ。',
            'は？マジで？一番いいとこ見てないじゃん。最初から見直せって。',
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
            "I keep hearing that. Maybe I should just read the book first and skip the movie entirely.",
        ],
        jaTranslations: [
            '原作のほうが良かった。',
            '正直、原作のほうが全然良かった。',
            '先に原作読んだんだけど、映画は原作の良さ出せてなかった。',
            'それよく聞くわ。もう原作だけ読んで映画はスルーしようかな。',
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
            "Wait, for real? That's amazing. Do they have a release date yet or is it just announced?",
        ],
        jaTranslations: [
            '続編出るらしいよ。',
            'なんか続編作るらしいよ。',
            '聞いた？続編発表されたんだよ。めっちゃ楽しみ。',
            'え、マジで？最高じゃん。公開日もう出てる？それともまだ発表だけ？',
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
            "Here we go again. You say that every time, old man. But honestly, you're not totally wrong.",
        ],
        jaTranslations: [
            '昔の映画のほうが良かった。',
            '昔の映画みたいなのはもう作れないよな。',
            '映画にちゃんとストーリーがあった時代が懐かしいよ。CGIの爆発ばっかりじゃなくてさ。',
            'また始まったよ。毎回それ言うよな、おっさん。でも正直、間違ってはないんだよな。',
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
            "Oh no, what show? Don't tell me, I can't afford to get hooked on anything right now.",
        ],
        jaTranslations: [
            '最近ハマってるドラマがある。',
            '最近新しいドラマ見始めたんだけど、完全にハマった。',
            'このドラマ見始めたら止まらなくなった、マジで。',
            'やめて、何のドラマ？言わないで、今これ以上ハマるもの増やせない。',
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
            "A whole season in one night? That's impressive and concerning at the same time.",
        ],
        jaTranslations: [
            '一気見しちゃった。',
            'やめられなくて、一晩でシーズン全部見ちゃった。',
            '1話だけって決めてたのに、気づいたらシーズン全部見てた。',
            '一晩でシーズン全部？すごいけど、ちょっと心配になるわ。',
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
            "I know the feeling. Just watch one more, you won't be able to sleep anyway.",
        ],
        jaTranslations: [
            '続きが気になって寝れない。',
            'あの終わり方やばい。次のエピソード見なきゃ無理。',
            'あんな気になる終わり方されたら止められるわけないじゃん。',
            'わかるわー。もう1話見ちゃえよ、どうせ寝れないんだから。',
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
            "Five, but fair warning, season four is kind of a slog. Push through it though, the finale's worth it.",
        ],
        jaTranslations: [
            'シーズン何まであるの？',
            'え、シーズンいくつまである？',
            'せめて3シーズンはあってくれ。もっと見たい。',
            '5シーズン。ただシーズン4はちょっとダレるから覚悟しろ。でも最終回のために頑張れ。',
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
            "Same! If they kill off that character I'm literally done with the show. I mean it this time.",
        ],
        jaTranslations: [
            'あのキャラが好き。',
            'あのキャラに愛着ありすぎて笑えない。',
            'あのキャラに何かあったらマジで無理。',
            'わかる！あのキャラ殺されたら本気で見るのやめる。今回はマジ。',
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
            "Subs, always. The dubbed voices never sound right to me. It totally kills the vibe.",
        ],
        jaTranslations: [
            '字幕派？吹替派？',
            '字幕で見る？それとも吹替？',
            'ガチで聞きたいんだけど、字幕と吹替どっちが好き？',
            '字幕一択。吹替の声ってなんか違うんだよな。雰囲気壊れるし。',
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
            "Wait, they canceled it? I was just about to start watching. Now I don't even wanna bother.",
        ],
        jaTranslations: [
            '打ち切りになったの悲しい。',
            '1シーズンで打ち切りとか最悪。マジで凹む。',
            '信じられない。テレビで一番面白かったのに誰も見てなかったんだって。',
            'え、打ち切り？ちょうど見ようと思ってたのに。もう見る気なくなった。',
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
            "OK fine, I'll add it to my list. But if it's boring I'm blaming you.",
        ],
        jaTranslations: [
            'おすすめしていい？',
            'ねえ、おすすめしていい？後で感謝するから。',
            '聞いてないかもしれないけど、このドラマ絶対好きだから。ドンピシャだと思う。',
            'はいはい、リストに入れるよ。でもつまらなかったらお前のせいな。',
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
            "You're dedicated. I always tell myself I'll watch it live but end up falling behind by like three episodes.",
        ],
        jaTranslations: [
            'リアタイで見てる。',
            '毎週リアルタイムで見てる。',
            '待てないから毎週水曜に配信された瞬間に見てる。',
            'すごいな。俺もリアタイで見るって毎回思うんだけど、結局3話ぐらい溜まるんだよな。',
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
            "Mixed feelings, honestly. The ending was solid but they rushed a couple of story lines. Still worth watching though.",
        ],
        jaTranslations: [
            '最終回どうだった？',
            'で、最終回どうだった？良かった？',
            '最終回は賛否両論って聞いたんだけど。好き嫌い分かれたらしいね。',
            '正直微妙かな。結末自体は良かったんだけど、いくつかの話が急ぎすぎ。でも見る価値はあるよ。',
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
            "Sure thing. That'll be twenty-four dollars. Row H, seats five and six work for you?",
        ],
        jaTranslations: [
            '大人2枚お願いします。',
            '大人のチケット2枚もらえますか？',
            'すみません、7時半の回で大人2枚お願いします。',
            'はい、24ドルになります。H列の5番6番でいいですか？',
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
            "Want to just split a large? There's no way either of us is finishing one alone.",
        ],
        jaTranslations: [
            'ポップコーンのLサイズください。',
            'ポップコーンのLとドリンクのMもらえますか？',
            'ポップコーンのLでバター多めと、コーラください。やっぱセットで。',
            'L一個シェアしない？一人じゃ絶対食べきれないでしょ。',
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
            "Looks like there are a few in the middle section. Row J, center. Those good enough?",
        ],
        jaTranslations: [
            'いい席まだある？',
            'いい席まだ空いてますか？',
            'スクリーンに近すぎるのは嫌なんだけど、真ん中あたりで何かない？',
            '真ん中にいくつかありますね。J列のセンター。そこでいいですか？',
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
            "I know, right? At least that last one looked pretty good though. I might actually go see it.",
        ],
        jaTranslations: [
            '予告編長すぎない？',
            'また20分も予告編見んの？',
            '予告編って毎年長くなってない？もう本編始まってていい頃だろ。',
            'ほんとだよね。でもさっきの最後のやつは面白そうだった。見に行くかも。',
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
            "Oh sorry, it's off now. My bad, I forgot to switch it before the lights went down.",
        ],
        jaTranslations: [
            'スマホ切って。',
            'スマホのサイレントにしてくれない？',
            'おい、スマホサイレントにしろ。もう始まるぞ。',
            'あ、ごめん、切ったわ。暗くなる前に切るの忘れてた。',
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
            "Let's do subbed. I'd rather hear the original voices even if I have to read the whole time.",
        ],
        jaTranslations: [
            '字幕版と吹替版どっち？',
            '字幕で見る？吹替で見る？',
            '7時の字幕版と8時の吹替版があるんだけど、どっちがいい？',
            '字幕にしよう。ずっと読むことになるけど、オリジナルの声で聞きたい。',
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
            "Go now, nothing big is happening. I'll catch you up when you get back.",
        ],
        jaTranslations: [
            'トイレ行っていい？今大事なとこ？',
            'マジでトイレ行きたいんだけど、何か見逃す？大事なシーン？',
            '20分我慢してんだけど、今こっそり出ても大丈夫？大事なとこじゃない？',
            '今行け、大したことやってないから。戻ったら教えてやるよ。',
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
            "Good call. Last time I left early and missed a huge teaser. Not making that mistake again.",
        ],
        jaTranslations: [
            'エンドロールの後に映像あるかも。',
            'ちょっと待って、まだ帰るな。エンドロールの後に何かあるかも。',
            '座ってろ。マーベル映画はエンドロールの後に絶対なんかあるから。',
            'ナイス判断。前に途中で帰って特報見逃したんだよ。同じミスはしない。',
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
            "Just scoot over one seat, there's an empty one right there. Problem solved.",
        ],
        jaTranslations: [
            '前の人の頭が邪魔で見えない。',
            'あの人背高いな。スクリーンほとんど見えない。',
            'よりによって映画館で一番背が高い人が真ん前に座ってるんだけど。',
            '一個隣にずれなよ、空いてるじゃん。はい解決。',
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
            "Yeah, let's move. Last time we waited and it took forever to get out of the parking lot.",
        ],
        jaTranslations: [
            '混む前に出よう。',
            'ほら、混む前に出るぞ。',
            '今出れば混雑避けられる。駐車場で待つのはごめんだ。',
            'だな、行こう。前に待ったら駐車場から出るのに永遠にかかったからな。',
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
            "OK OK, my lips are sealed. But seriously, hurry up and watch it so we can finally talk about it.",
        ],
        jaTranslations: [
            'ネタバレしないで。',
            'ちょっと待って、ネタバレやめて。まだ見てないから。',
            'そこでストップ。まだ見てないし、何も知りたくないから。',
            'わかったわかった、何も言わない。でもマジで早く見ろ、語りたいんだから。',
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
            "Dude, yes, that was a spoiler. It's only been out for a week. I can't unhear that now.",
        ],
        jaTranslations: [
            'え、それネタバレだった？',
            'やば。それ言っちゃダメだった？',
            'ごめん、もうみんな見たと思ってた。気づかなかった。',
            'おい、それ完全にネタバレだよ。まだ公開1週間だぞ。もう聞かなかったことにできない。',
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
            "I'm sorry, I really didn't mean to. Maybe it won't be what you think, just give it a chance.",
        ],
        jaTranslations: [
            '今ので大体わかっちゃったんだけど。',
            'まあ、今ので何が起きるかだいたい予想ついちゃったよ。',
            '結末は言ってないけど、もう推測できるくらいのヒント出してたよね。',
            'ごめん、マジで悪気なかったんだ。予想と違うかもしれないし、とりあえず見てみて。',
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
            "Yeah, go ahead. We all finished it. I've been dying to hear what you thought about the twist.",
        ],
        jaTranslations: [
            'ネタバレOKな人いる？',
            '結末の話していい？まだみんな見てない？',
            'あの展開について語りたいんだけど、先にみんな見たか確認させて。',
            'いいよ、全員見たよ。あの展開についてお前がどう思ったか聞きたかったんだよ。',
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
            "Yes! The way the music just cut out right before the reveal gave me chills. I had to rewatch it immediately.",
        ],
        jaTranslations: [
            'あのシーン最高だったよね。',
            'あのシーンの話していい？マジで信じられないぐらいよかった。',
            'あのシーンずっと頭の中でリプレイしてる。演技が次元違ったわ。',
            'わかる！あの真相明かされる直前に音楽がスッと消えるの、鳥肌立った。即リピートした。',
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
            "Same here. I thought I had it figured out and then they completely flipped everything. My jaw literally dropped.",
        ],
        jaTranslations: [
            'あの展開は予想外だった。',
            'あの展開、完全に不意打ちだった。',
            'こうなるだろうなって思ってたけど、全然違った。',
            'わかる。全部読めた気でいたのに、完全にひっくり返された。マジで口開いたわ。',
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
            "Right? The clues were right there the whole time. I can't believe I missed the painting in that one scene.",
        ],
        jaTranslations: [
            '二回目見ると伏線に気づくよ。',
            '結末知ってから見ると伏線がやばい。',
            '見直したら、一回目に完全に見逃してたことめちゃくちゃあった。',
            'だろ？ヒントずっと目の前にあったんだよ。あのシーンの絵に気づかなかったの信じられない。',
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
            "Don't trust the reviews too much though. Some of my favorite movies have terrible scores.",
        ],
        jaTranslations: [
            'レビュー見てから決める。',
            'いつもレビュー見てから決めるんだよね。',
            'Rotten Tomatoes見て批評家の評価チェックしてから決めるわ。',
            'でもレビュー信じすぎるなよ。俺の好きな映画、スコア最悪なのもあるから。',
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
            "You're still on about that? It's been two years! At some point you gotta let it go.",
        ],
        jaTranslations: [
            'ネタバレされた恨みは忘れない。',
            '2年前のネタバレまだ怒ってるからね。',
            '2019年にアベンジャーズのネタバレされたの一生許さない。マジで。',
            'まだそれ言ってんの？2年前だぞ！いい加減許してやれよ。',
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
            "Nah, a week tops for big stuff. After that, it's on you if you haven't seen it yet.",
        ],
        jaTranslations: [
            'もう時効でしょ。',
            'いやもう、ネタバレの時効過ぎてるって。',
            '5年前に公開された映画だぞ。いつになったら自由に話していいの？',
            'いや、大作は1週間が限界だろ。それ以降は見てないほうが悪い。',
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
            "I know, right? I didn't even recognize them at first. They completely disappeared into that role.",
        ],
        jaTranslations: [
            'あの俳優の演技すごい。',
            'あの映画の演技、次元が違った。',
            '主演の演技やばすぎた。完全に別人だったわ。',
            'わかる。最初誰かわからなかった。完全に役に入り込んでたよな。',
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
            "Oh, they were in that crime show a few years back! The one with the detective. It'll come to you.",
        ],
        jaTranslations: [
            'あの人、他に何に出てたっけ？',
            'あの顔見たことある。他に何に出てた？',
            'あの俳優めっちゃ見覚えあるんだけど思い出せない。他に何やってた？',
            'あ、何年か前の刑事ドラマに出てたよ！探偵のやつ。そのうち思い出すって。',
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
            "For sure. That kitchen scene alone should be enough to get them nominated. It felt so real.",
        ],
        jaTranslations: [
            'アカデミー賞取るべき。',
            'あの演技はオスカーもんだよ、間違いなく。',
            'あの演技でノミネートされなかったら、アカデミー賞の信頼性なくなるわ。',
            'だよな。あのキッチンのシーンだけでノミネート確定だろ。マジでリアルだった。',
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
            "Totally. You can tell they're actually friends in real life. It just comes through on screen.",
        ],
        jaTranslations: [
            'あの二人の共演最高だよね。',
            'あの二人の相性がやばすぎる。',
            '二人が一緒に映るシーン全部すごい。お互い引き出し合ってる。',
            'ほんとにね。プライベートでも仲良いのが画面から伝わってくるよな。',
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
            "Wait, that was actually them singing? I assumed they dubbed it. That's seriously impressive.",
        ],
        jaTranslations: [
            'あの人、実は歌もうまいんだよ。',
            'あの人、自分で歌ってるの知ってた？めっちゃ多才。',
            'あのミュージカル見るまで歌えるって知らなかった。三拍子揃ってるわ。',
            'え、あれ本人が歌ってたの？吹替だと思ってた。マジですごいな。',
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
            "Have you seen their earlier stuff though? The first two are rough but you can see the potential.",
        ],
        jaTranslations: [
            'あの監督の作品は全部見てる。',
            'あの監督が出すものは全部見てる。',
            'あの監督の大ファンで、最初から全部追いかけてるんだよ。',
            '初期の作品も見た？最初の2本は荒いけど、才能は見えるよ。',
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
            "So true. Some voice performances have made me cry harder than any live-action role. It's a real skill.",
        ],
        jaTranslations: [
            '声優の演技って過小評価されてるよね。',
            '声優さんってもっと評価されていいのに。',
            '声の演技って全然別のスキルだよ。アニメの演技のほうがすごいこともあるし。',
            'ほんとそれ。声の演技で実写より泣いたことあるわ。あれは本物の技術だよ。',
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
            "Oh my God, yes! The elevator story had me in tears. I've watched that clip so many times.",
        ],
        jaTranslations: [
            'あの人のインタビュー面白いんだよ。',
            'あの人のトーク番組見た？めっちゃ面白いよ。',
            'もう映画より本人のインタビューのほうが見てるかもしれない。',
            'わかる！あのエレベーターの話、涙出るほど笑った。あのクリップ何回見たことか。',
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
            "Ha, same. I've sat through some terrible movies just 'cause they were in it. No regrets though.",
        ],
        jaTranslations: [
            '好きな俳優が出てるだけで見る。',
            'あの人が出てたら理由聞かず見る。',
            '史上最悪の映画でも、あの俳優が出てたら公開初日に見に行くわ。',
            'わかる。あの人が出てるってだけで酷い映画我慢して見たこと何回もあるけど、後悔してない。',
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
            "OK boomer. But honestly, there was something special about that era. They just don't make 'em like that anymore.",
        ],
        jaTranslations: [
            '昔の俳優は格が違うよ。',
            '黄金時代の俳優には独特のオーラがあった。',
            '昔のハリウッド俳優には、今の俳優にはない何かがあるんだよ。',
            'はいはい、おじいちゃん。でも正直あの時代は特別だったよな。もうああいうの出てこないわ。',
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
            "Thrillers, all day. Something with a good twist that keeps me guessing till the end.",
        ],
        jaTranslations: [
            '何系の映画が好き？',
            'どんなジャンルが好き？',
            '一生一つのジャンルしか見れないとしたら、何にする？',
            'スリラー一択。いいどんでん返しがあって、最後まで読めないやつ。',
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
            "Come on, you gotta at least try the new one. It's more suspense than actual horror. You might like it.",
        ],
        jaTranslations: [
            'ホラーだけは無理。',
            'ホラー映画？絶対無理。耐えられない。',
            'お金払って怖い思いする人の気持ちがわからない。正気じゃないでしょ。',
            'まあまあ、新作だけでも試してみなよ。ホラーっていうよりサスペンス寄りだから。気に入るかもよ。',
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
            "Honestly, same. After a long week, the last thing I want is a movie that makes me think too hard.",
        ],
        jaTranslations: [
            'アクション映画は頭空っぽで見れる。',
            'アクション映画は考えなくていいから最高。',
            'たまには爆発とカーチェイスだけでいいんだよ。深いストーリーも象徴もいらない、ただ楽しければいい。',
            '正直わかるわ。長い一週間の後に、頭使う映画は一番見たくない。',
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
            "Oh, which one? I've been looking for a good documentary. Got any recommendations?",
        ],
        jaTranslations: [
            '最近ドキュメンタリーにハマってる。',
            'ドキュメンタリーめっちゃ見てる。中毒性やばい。',
            '昔はドキュメンタリーつまんないと思ってたけど、今はドハマり中。現実のほうがフィクションよりヤバい。',
            'へー、どれ？いいドキュメンタリー探してたんだよ。おすすめある？',
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
            "No judgment here. A good rom-com on a rainy Sunday is honestly one of life's simple pleasures.",
        ],
        jaTranslations: [
            'ラブコメは意外と好き。',
            '引かないでよ、ラブコメに弱いんだよ。',
            'いいラブコメって安心感あるよね。結末わかってても、それでいいんだよ。',
            '全然引かないよ。雨の日曜にいいラブコメ見るのは、人生のささやかな幸せだよな。',
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
            "Have you seen that new one about parallel timelines? It's right up your alley. You'd lose your mind.",
        ],
        jaTranslations: [
            'SF映画は設定が一番面白い。',
            'SF好きなんだよ、世界観がいつもぶっ飛んでるから。',
            'タイムトラベルとか並行世界とかの映画出してくれれば俺は幸せだよ。',
            '並行世界のやつ新しいの見た？絶対好きだよ。頭おかしくなるぞ。',
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
            "Preach. Anyone who says anime is for kids clearly hasn't seen a Miyazaki film. Their loss.",
        ],
        jaTranslations: [
            'アニメも立派な映画だよ。',
            'アニメ映画も実写と同じくらいリスペクトされるべき。',
            'アニメは子供向けとか言ってる人、宮崎映画見たことないでしょ。',
            'それな。アニメが子供向けとか言ってるやつは宮崎映画見てないだけ。見ないやつの損だよ。',
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
            "Ha, that's why I only watch horror during the day. Nighttime is a hard no for me.",
        ],
        jaTranslations: [
            '怖い映画見た後の帰り道が怖い。',
            'なんで夜にホラー見て、そのあと歩いて帰るんだろ。',
            'ホラー映画見た後に暗い駐車場歩いたんだけど。人生最悪の判断。',
            'だから俺はホラーは昼にしか見ない。夜は絶対無理。',
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
            "We should do a bad movie night sometime. I'll bring the drinks, you pick the worst one you can find.",
        ],
        jaTranslations: [
            'B級映画も好き。',
            'ダメ映画って正しいメンバーで見ると最高に楽しい。',
            '映画の夜で一番楽しいのって、ひどすぎて逆にいい映画を見るときだよ。',
            '今度ダメ映画ナイトやろうよ。酒は持ってく、お前は一番ひどいやつ探してきて。',
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
            "Exactly. Life's too short to pretend you don't enjoy what you enjoy. Watch whatever makes you happy.",
        ],
        jaTranslations: [
            '結局好みは人それぞれだよ。',
            'みんな好みは違うし、それでいいんだよ。',
            '映画の良いところは、誰にでも合うものがあること。どのジャンルが上とかない。',
            'その通り。人生短いんだから、好きなものを好きって言えよ。楽しいもん見ろ。',
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
            "Really? I thought you'd love it. What didn't work for you? The pacing?",
        ],
        jaTranslations: [
            '正直微妙だった。',
            '悪くはないけど、良くもなかった。',
            'もっと好きになりたかったんだけど、なんかハマらなかった。',
            'マジ？絶対好きだと思ったのに。何がダメだった？テンポ？',
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
            "See, that's why I never trust trailers. Some of the best movies have the worst marketing.",
        ],
        jaTranslations: [
            '期待してなかったけど良かった。',
            '全然期待してなかったのにめちゃくちゃ良かった。',
            '他に見るもんなくて見たんだけど、結果すごかった。',
            'ほらな、だから予告編は信用するなって。名作に限って宣伝がへたくそだったりするから。',
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
            "Ha, a two-hour screensaver. That's harsh but honestly pretty accurate. It looked amazing though.",
        ],
        jaTranslations: [
            '映像はきれいだけど話がつまらない。',
            '見た目はすごかったけどストーリーがペラペラ。',
            '2時間のスクリーンセーバー見てる気分だった。きれいだけど中身ゼロ。',
            '2時間のスクリーンセーバーって、きつい言い方だけど正直的確。映像はすごかったけどね。',
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
            "I'm with you. Sometimes you just need a good cry. It's honestly kind of therapeutic.",
        ],
        jaTranslations: [
            '思いっきり泣ける映画っていいよね。',
            'ぐちゃぐちゃに泣ける映画大好き。',
            'いい感動映画で全部吐き出すの、最高だよね。',
            '同感。たまには思いっきり泣きたいよな。正直、癒しになるんだよ。',
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
            "Oh thank God, I thought it was just me. I was sitting there pretending I understood the whole time.",
        ],
        jaTranslations: [
            '意味わかんなかった。',
            '正直、監督が何したかったのかさっぱり。',
            '俺がバカなのかもしれないけど、最初から最後まで意味不明だった。',
            'あーよかった、俺だけかと思ってた。ずっとわかったフリして座ってたわ。',
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
            "Oh, I already added the whole soundtrack to my playlist. That one track during the climax was perfect.",
        ],
        jaTranslations: [
            '音楽がよかった。',
            'あの映画、音楽がなかったら普通だったよ。音楽に救われてた。',
            '見てからずっとサントラをリピートしてる。それぐらい良かった。',
            'あ、もう全曲プレイリストに入れたわ。クライマックスの曲、完璧だったよな。',
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
            "Yeah, that usually means it's doing something interesting though. Boring movies don't divide anyone.",
        ],
        jaTranslations: [
            '評価割れてるよね。',
            '好き嫌いめっちゃ分かれてるよね。中間がない。',
            '誰も意見が合わない系の映画だよね、あれ。',
            'まあ、それって何か面白いことやってるってことだよ。つまらない映画で意見は割れないから。',
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
            "Let's rewatch it together this weekend then. I bet we'll catch so much more the second time around.",
        ],
        jaTranslations: [
            'もう一回見たい。',
            '正直、今すぐもう一回見れる。',
            '見るたびに良くなるタイプの映画だよ、あれ。',
            'じゃあ今週末一緒に見直そうよ。2回目のほうが絶対気づくこと多いって。',
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
            "You already told me twice this week! Fine, I'll watch it tonight. Happy now?",
        ],
        jaTranslations: [
            '友達にすすめたい。',
            '友達全員に見せたい。',
            'もう5人に予告編送った。みんな見なきゃダメ。',
            '今週2回も言われたって！わかった、今夜見るから。これで満足？',
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
            "Cheers to that. Alright, same time next week? I'll have a new recommendation ready.",
        ],
        jaTranslations: [
            '映画って最高の趣味だよね。',
            'いい映画で一日を締めるのって最高。',
            'どんなに嫌な日でも、いい映画見れば全部マシになるんだよ。',
            'それに乾杯。よし、来週も同じ時間な？おすすめ用意しとくよ。',
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
