/**
 * 365 English Master -- Week 4 + Final Days (Days 22-30)
 *
 * Week 4 Theme: "自分を出す" (Being Yourself)
 * Days 22-28: Weekly theme expressions
 * Days 29-30: Month 1 wrap-up (Celebration + Farewell)
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 1 (2026-04) -- WEEK 4 + FINAL DAYS
// ============================================================

export const WEEK4_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 22: 褒める (Giving Compliments)
    // Scene: リサが「英語で褒める」授業を開催。褒め方の文化差に全員驚く。
    // ────────────────────────────────────────────────────

    {
        daySlot: 22, japanese: 'いいね！',
        english: [
            'Nice!',
            'Oh, that is nice!',
            'That is really nice — where did you get that?',
            "Oh that is nice. Like, actually nice. Not like when people say nice and they mean it is fine. I mean it.",
        ],
        context: '英語のniceは日本語の「いいね」より弱い。Great, awesome, lovelyのほうが本気の褒めに聞こえる。niceは「まあまあ」に近い温度で使われることも多いので、トーンで全然意味が変わる要注意ワード。',
        character: 'lisa', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: '似合ってるよ',
        english: [
            'It suits you.',
            'That looks great on you!',
            'That really suits you — is it new?',
            "OK wait, that looks really good on you. Did you just get that? Because it is working. Like, seriously.",
        ],
        context: '「似合う」の直訳suits youはやや硬い。looks great on you が日常会話の鉄板。英語圏では服を褒められたらThank you! の一言でOK。日本語みたいに「いやいやそんな」の謙遜は逆に失礼になる。',
        character: 'lisa', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: 'すごいじゃん',
        english: [
            'That is great!',
            'No way, that is amazing!',
            'Are you serious? That is incredible — good for you!',
            "Wait, seriously? That is insane. I could never do that. How did you even pull that off?",
        ],
        context: '日本語の「すごい」は1語で全ジャンル対応。英語はgreat(良い)、amazing(驚き)、incredible(信じられない)、insane(ヤバい)と温度別に使い分ける。「すごいじゃん」のカジュアルさはThat is amazing! が一番近い。',
        character: 'mina', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: 'センスいいね',
        english: [
            'Good taste.',
            'You have great taste!',
            'You have got really good taste — I would never have thought of that.',
            "You know what, you have got taste. Like, actual taste. Not everyone can pull that off but you just... yeah.",
        ],
        context: '日本語の「センス」と英語のsenseは意味が違う。英語でsense of fashion とは言うけど、You have good sense とは普通言わない。taste（味覚・趣味）が正解。センス=tasteは意外と知らない人が多い。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: 'うまくなったね',
        english: [
            'You got better.',
            'You have really improved!',
            'You have come a long way — remember when you first started?',
            "Dude, you have gotten so much better. Like, remember last month? Night and day. I am not even exaggerating.",
        ],
        context: '「うまくなった」のimprovedは正しいけど先生っぽい。You have come a long way が友達間の最高の褒め言葉。「遠い道のりを歩いてきた」という比喩で努力をリスペクトする。日本語にない褒め方の角度。',
        character: 'kenji', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: '頑張ってるね',
        english: [
            'You work hard.',
            'You have been working so hard!',
            'I can tell you have been putting in the work — it shows.',
            "I see you out here grinding every day. Like, that takes dedication. Most people would have quit by now.",
        ],
        context: '「頑張って」の直訳は英語にない問題。I can tell は「見ればわかる」の意味で、相手の努力を認める最強の一言。it shows は「成果が出てる」。日本語の「頑張ってる」は過程を褒めるけど英語は結果を褒める文化。',
        character: 'master', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: 'さすがだね',
        english: [
            'Of course.',
            'That is so you.',
            'I mean, I am not surprised — that is just who you are.',
            "Yeah, that tracks. Like, of course you did. I would have been shocked if you had not, honestly.",
        ],
        context: '「さすが」は英語に直訳不可能な日本語ベスト3に入る。That is so you（あなたらしい）やI am not surprised（驚かない）で「期待通りの実力」を表す。一語で尊敬と信頼を伝える日本語の効率の良さ。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: 'その髪型いいね',
        english: [
            'Nice hair.',
            'I love your hair!',
            'Did you do something different with your hair? It looks amazing.',
            "Wait, did you change your hair? It looks so good. Was that on purpose or did you just wake up like that? Either way, I am jealous.",
        ],
        context: '英語圏では髪型を褒めるのは最も一般的な褒め言葉の一つ。Did you do something different? は「何か変えた？」の決まり文句で、変化に気づいたことが褒めになる。気づく=caring。日本語より「観察」が褒めになる文化。',
        character: 'mina', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: '料理上手だね',
        english: [
            'Great cooking.',
            'You are such a good cook!',
            'This is amazing — you made this yourself?',
            "OK you need to stop because I am going to eat all of it. Did you actually make this? From scratch? I can barely boil water.",
        ],
        context: '英語で料理を褒めるときYou are a good cook よりThis is amazing のほうが自然。料理人を褒めるより料理そのものを褒める。I can barely boil water は「お湯も沸かせない」=料理できないの定番自虐フレーズ。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 22, japanese: 'かっこいい',
        english: [
            'Cool.',
            'That is so cool!',
            'That is honestly really impressive — I am kind of jealous.',
            "Dude, that is sick. Like, legitimately cool. I am not just saying that. I wish I could do something like that.",
        ],
        context: '「かっこいい」は人にも物にも使える万能褒め。英語のcoolもほぼ同じ。ただしcoolは温度が低い褒め。本気で褒めるならsick, awesome, fire が若者言葉。日本語も「ヤバい」が褒めになるのと全く同じ現象。',
        character: 'kenji', category: 'greeting', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 23: 予約する (Making Reservations)
    // Scene: ケンジが海外出張で初めて英語でレストラン予約。電話で緊張。
    // ────────────────────────────────────────────────────

    {
        daySlot: 23, japanese: '予約したいんですが',
        english: [
            'I want to make a reservation.',
            "I would like to make a reservation, please.",
            "Hi, I am calling to make a reservation for this Saturday.",
            "Hi, yeah, I was wondering if I could make a reservation? It is for Saturday. I know it is kind of last minute, sorry about that.",
        ],
        context: '電話予約の第一声。I would like to が鉄板だけど、I was wondering if I could... で始めると「無理かもしれないけど」のニュアンスが出て丁寧度MAX。日本語の「〜んですが」の柔らかさに近い。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: '2名で',
        english: [
            'For two.',
            'Table for two, please.',
            'It will be just the two of us.',
            "Just two. Well, maybe three actually. Hold on, let me check... yeah, make it two for now. I will call back if it changes.",
        ],
        context: 'Table for two が映画でもよく聞く定番。partyという単語も使われる（How many in your party?）。このpartyはパーティーではなく「一行、グループ」の意味。知らないと混乱する罠。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: '7時に',
        english: [
            'At seven.',
            'Around seven, if possible.',
            'Would seven work? We are flexible if that is too busy.',
            "We were thinking around seven? But honestly, anywhere between seven and eight works. Whatever is easier for you guys.",
        ],
        context: '英語の時間指定はaroundを使うと柔軟な印象。Would ... work? は「〜で大丈夫？」の超便利フレーズ。日本語の「7時で」は断定だけど英語はWould that work? と相手に選択権を渡すのが礼儀。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: '窓際の席ありますか',
        english: [
            'Window seat, please.',
            'Could we get a window seat?',
            'Any chance we could get a table by the window?',
            "This might be a long shot, but is there any way we could get a window seat? It is kind of a special occasion so I wanted to make it nice.",
        ],
        context: 'Any chance...? は「可能性ある？」の万能リクエスト。強めのお願いをソフトに聞けるので旅行で超使える。a long shot は「難しいかもしれないけど」。日本語の「無理かもしれませんが」と同じ前置き技術。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: '個室ありますか',
        english: [
            'Private room?',
            'Do you have a private room?',
            'We are looking for something a bit more private — do you have any rooms available?',
            "So this is kind of a business dinner situation. Do you guys have, like, a private room or at least a quiet corner? We need to be able to actually talk.",
        ],
        context: '英語圏のレストランに個室はほぼない。日本の居酒屋文化の個室は特殊。a quiet corner（静かなコーナー）やa private area で代替する。文化の違いで存在しないものを英語でどう頼むかの実践問題。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: '誕生日なんです',
        english: [
            'It is a birthday.',
            "It is actually someone's birthday.",
            "We are celebrating a birthday — do you do anything special for that?",
            "So, full disclosure, it is my friend's birthday and I kind of want to make it special. Do you guys do like a cake or a dessert or anything? Even just a candle would be great.",
        ],
        context: '海外レストランは誕生日を伝えるとデザートが無料で出てくることが多い。Do you do anything special? が最強の一言。日本では恥ずかしくて言わないけど英語圏では言った者勝ち。サービスの引き出し方の文化差。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: 'キャンセルしたい',
        english: [
            'I need to cancel.',
            "I am sorry, but I need to cancel my reservation.",
            "I hate to do this, but something came up and I need to cancel for tonight.",
            "Hey, I am really sorry about this. Something came up at work and I am not going to be able to make it tonight. Is it too late to cancel? I feel terrible.",
        ],
        context: 'Something came up は「予定が入った」の万能フレーズ。具体的な理由を言わなくていい便利な言い回し。I hate to do this は「やりたくないけど」の前置き。日本語の「申し訳ないんですが」の英語版。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: '予約変更できますか',
        english: [
            'Can I change the reservation?',
            'Would it be possible to change our reservation?',
            "I was hoping to move our reservation to a different time — is that doable?",
            "So I know this is annoying, but any chance I could move the reservation? Same day, just a little later. Like eight instead of seven? I totally understand if you can not.",
        ],
        context: 'Is that doable? は「それ可能？」のカジュアル版。Would it be possible? はフォーマル。I totally understand if you can not で「ダメなら全然OK」の保険をかける。日本語の「ご無理なら大丈夫です」と同じ気遣い戦略。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: '予約してある〇〇です',
        english: [
            'I have a reservation.',
            'Hi, I have a reservation under Kenji.',
            "I have a reservation for seven o'clock — it should be under Kenji.",
            "Hi there. I called earlier? Should be under Kenji, party of two, for seven. Unless I messed up the time, which... honestly, is possible.",
        ],
        context: 'under + 名前 が「〇〇の名前で予約」の決まり文句。reservation under Tanaka のように使う。for + 名前 ではなくunder。日本語の「〇〇で予約した者です」は自分を名乗る形だけど、英語は「名前の下に予約がある」という発想。',
        character: 'kenji', category: 'order', month: '2026-04',
    },
    {
        daySlot: 23, japanese: '遅れそうです',
        english: [
            'I will be late.',
            "I am running a little late — sorry!",
            "Hey, just a heads up — I am running about fifteen minutes late. Can you hold the table?",
            "Hi, I am so sorry, I am stuck in traffic and I am probably going to be like fifteen minutes late. Can you hold our reservation? I promise I am on my way.",
        ],
        context: 'I am running late が「遅れそう」の完璧な訳。running は「今まさに遅れている最中」の進行形。heads up は「ちょっと先に言っておくと」の前置き。日本語の「遅れます」より英語は理由と謝罪をセットにする。',
        character: 'kenji', category: 'order', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 24: お土産を選ぶ (Souvenir Shopping)
    // Scene: ミナが外国人の友達へのお土産を選ぶ。何が喜ばれるかの文化差。
    // ────────────────────────────────────────────────────

    {
        daySlot: 24, japanese: 'お土産探してます',
        english: [
            'Looking for souvenirs.',
            "I am looking for souvenirs.",
            "I am looking for something to bring back for friends — any suggestions?",
            "So I need to find souvenirs for like... a lot of people. My coworkers, my family, my neighbors. Where do I even start?",
        ],
        context: '日本の「お土産文化」は世界的に特殊。義務としてお土産を買う感覚は英語圏にほぼない。bring back something は「何か持って帰る」で軽い。日本語の「お土産」には「義理」が含まれるけど英語のsouvenirは「自分用の記念品」に近い。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: '人気あるのは何？',
        english: [
            'What is popular?',
            'What is the most popular one?',
            'What do people usually go for? Like, what sells the most?',
            "What do most people end up getting? I am terrible at picking gifts so I just want to go with whatever everyone else is buying. Safety in numbers, right?",
        ],
        context: 'What do people go for? の go for は「選ぶ」のカジュアル版。bestseller は店員に聞くときに使える。Safety in numbers は「多数派なら安心」のことわざ。日本語の「みんな何買ってますか」の英語版。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: '日本っぽいものがいい',
        english: [
            'Something Japanese.',
            'I want something very Japanese.',
            'I am looking for something that screams Japan — you know, something unique.',
            "I want something that is, like, very obviously Japanese. Not a keychain or a magnet. Something where they open it and go, oh this is from Japan. You know what I mean?",
        ],
        context: 'screams Japan は「日本感全開」の面白い言い方。scream は本来「叫ぶ」だけど「強烈に主張する」の意味で使う。This screams expensive = いかにも高そう。日本語の「THE 日本」を英語にするとscreamsが一番近い。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: '予算は〜くらい',
        english: [
            'My budget is about...',
            "I am trying to keep it around thirty dollars.",
            "I have got a budget of about thirty bucks each — what can I get in that range?",
            "So here is the thing, I do not want to go crazy. Maybe like thirty bucks per person? Is that realistic or am I dreaming?",
        ],
        context: 'bucks はドルのカジュアル版。「1000 yen くらい」を英語で言うとabout, around, roughly が使える。Am I dreaming? は「現実的？」をユーモラスに聞く表現。予算を伝えるのは英語圏では全く恥ずかしくない。むしろ効率的。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: 'ラッピングできますか',
        english: [
            'Can you wrap it?',
            'Could you gift wrap this for me?',
            'Do you offer gift wrapping? I want it to look nice.',
            "Is there any way to get this wrapped? I am giving it as a gift and my wrapping skills are... let us just say it would look like a toddler did it.",
        ],
        context: '日本のデパートの無料ラッピングは世界遺産レベルの文化。海外はgift wrappingは有料か自分でやるのが普通。Do you offer...? は「〜のサービスはありますか」の万能フレーズ。ないサービスを聞くときに使える。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: '賞味期限いつまで？',
        english: [
            'When does it expire?',
            "What is the expiration date on this?",
            'How long does this keep? I need to bring it on a plane.',
            "So I am flying out in like three days. Is this going to last that long? I do not want to give someone expired candy, that would be a terrible gift.",
        ],
        context: 'expiration date は賞味期限。shelf life は「棚の寿命」=保存可能期間。How long does it keep? が会話では一番自然。日本の「賞味期限」と「消費期限」の区別は英語にはない。best before(賞味) と use by(消費) で分かれる。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: '持って帰れますか（飛行機）',
        english: [
            'Can I take it on the plane?',
            'Is this OK to bring on a flight?',
            "Will this get through customs? I do not want any trouble at the airport.",
            "Real talk — is this going to be a problem at the airport? Like, with customs or the security check? I got stuff confiscated once and I am still traumatized.",
        ],
        context: 'get through customs は「税関を通る」。confiscated は「没収された」。液体物や食品の持ち込みルールは国ごとに違う。Will this be OK to fly with? もよく使う。日本語の「大丈夫ですか」の対象が英語では具体的になる。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: 'みんなに配りたい',
        english: [
            'I want to share these.',
            "These are for everyone at the office.",
            "I need something I can split up and give to a bunch of people — do you have anything individually wrapped?",
            "So the thing is, I need to give these out to like twenty people. I can not show up with one box and be like, here, share. That is weird. Do you have something individually packaged?",
        ],
        context: '日本の「配る」文化は英語圏にない。お土産を職場全員に配る発想が外国人には衝撃。individually wrapped(個包装)は日本が世界一。英語圏の人は「なんで全員に買うの？」と本気で不思議がる。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: 'これ有名？',
        english: [
            'Is this famous?',
            'Is this a popular brand?',
            'Is this well known? Like, would people recognize it?',
            "Would someone who has never been to Japan know what this is? I do not want to give something random that they are just going to put in a drawer and forget about.",
        ],
        context: 'famous は人に使う。物にはwell-known, popular, recognizable が自然。Is this a thing? は「これって知られてる？」のスラング。日本語の「有名」は人にも物にも使える万能語だけど英語は使い分けが必要。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },
    {
        daySlot: 24, japanese: 'おすすめ教えて',
        english: [
            'Any recommendations?',
            "What would you suggest?",
            "If you were buying a gift for someone, what would you pick?",
            "OK, I am going to trust you on this. If your friend was visiting from another country and you had to pick one thing — one thing — what would it be?",
        ],
        context: 'What would you pick? は「あなたなら何を選ぶ？」で店員の本音を引き出せる。recommendations はフォーマル、suggestions はやや柔らかい。日本語の「おすすめ」一語で済むところを英語はシチュエーション別に聞き方が変わる。',
        character: 'mina', category: 'shopping', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 25: 空港で (At the Airport)
    // Scene: ユキの初海外。空港の英語が全部わからなくてパニック。
    // ────────────────────────────────────────────────────

    {
        daySlot: 25, japanese: '搭乗口どこですか？',
        english: [
            'Where is the gate?',
            'Excuse me, where is gate twelve?',
            "I am looking for gate twelve — am I going the right way?",
            "Sorry, I am completely lost. Gate twelve? I have been walking for like ten minutes and I feel like I am going in circles. Is it this way?",
        ],
        context: '空港のgateは「門」ではなく「搭乗口」。boarding gateが正式名称だけど日常会話ではgateだけでOK。Am I going the right way? は「方向合ってる？」で空港のみならずどこでも使える。迷子の万能フレーズ。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '乗り継ぎです',
        english: [
            'I have a connecting flight.',
            "I am connecting to another flight.",
            "I have a connecting flight to Los Angeles — where do I go from here?",
            "So I have a connection and I am a little stressed because my layover is only like an hour and a half. Do I need to go through security again? Please say no.",
        ],
        context: 'connecting flight が乗り継ぎ便。layover は乗り継ぎの待ち時間。connection だけでも通じる。日本語の「乗り継ぎ」は1語だけど英語は connecting flight, layover, transfer と場面で分かれる。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '荷物が出てこない',
        english: [
            'My bag is missing.',
            'My luggage did not come out.',
            "I have been waiting for my bag and it has not shown up — who do I talk to?",
            "OK so I have been standing here for like thirty minutes and my bag is just... not here. Everyone else got theirs. I am starting to panic. Where do I report this?",
        ],
        context: '荷物紛失は海外旅行あるある。lost luggage, missing bag で通じる。carousel はターンテーブルの英語名。Who do I talk to? は「誰に言えばいい？」で困ったとき万能。日本語の「どこに行けば」に相当する。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '税関で申告するものは？',
        english: [
            'Anything to declare?',
            'Do I need to declare anything?',
            'I am not sure if I need to declare these — they are just snacks.',
            "So I have got like a bunch of snacks and some sake. Do I need to declare that? I filled out the form but honestly I was not sure about half of it.",
        ],
        context: 'declare は「申告する」。Anything to declare? は税関職員の決まり文句。Nothing to declare で「何もないです」。日本人はお土産の食品が引っかかりがち。alcohol と food は正直に申告しないと罰金の可能性あり。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '機内持ち込みサイズですか？',
        english: [
            'Is this carry-on size?',
            'Will this fit as a carry-on?',
            'Is this bag small enough for carry-on? I do not want to check it.',
            "Does this count as carry-on? It is like right on the edge of being too big. I swear it fit last time but I might have stuffed too much in it this time.",
        ],
        context: 'carry-on が機内持ち込み。check は預ける。right on the edge は「ギリギリ」。日本語の「持ち込み」は1語で明確だけど、英語は carry-on(持ち込み) vs checked(預け入れ) をしっかり区別する。サイズ超過はその場で追加料金。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '遅延してますか？',
        english: [
            'Is it delayed?',
            'Is the flight delayed?',
            "Do you know if the flight is on time? The board says delayed but I want to make sure.",
            "Hey, sorry to bother you. Is flight 247 still delayed or did they update it? Because the board said delayed an hour ago and now it just says... nothing. That can not be good.",
        ],
        context: 'delayed は遅延、on time は定刻通り。departure board は電光掲示板。英語圏の空港は遅延が日常茶飯事。日本の鉄道の定時運行は世界的に異常なので、遅延を聞く英語は旅行の必須スキル。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '席変えてもらえますか？',
        english: [
            'Can I change my seat?',
            'Is it possible to switch seats?',
            "Would it be possible to move to a different seat? This one is a bit cramped.",
            "I hate to be that person, but is there any chance I could switch seats? The middle seat is... I mean, nobody likes the middle seat, right? Even a window or aisle would be amazing.",
        ],
        context: 'middle seat は中央席で世界共通の不人気ナンバーワン。aisle seat(通路側)は「アイル」と読む。sは黙字。window, middle, aisle は飛行機英語の基本3語。日本語の「窓側」「通路側」と違って「真ん中」も明確に名前がある。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '毛布もらえますか',
        english: [
            'Can I have a blanket?',
            'Could I get a blanket, please?',
            "Excuse me, do you have any extra blankets? It is freezing in here.",
            "Is it just me or is it really cold? Could I get a blanket? And maybe a pillow too if you have one? I am trying to sleep but it is like sitting in a refrigerator.",
        ],
        context: 'It is freezing は「凍えそう」の大げさ表現で日常会話頻出。pillow(枕)とblanket(毛布)は機内で欲しいもの2大巨頭。Is it just me or...? は「自分だけ？」と共感を求める便利な出だし。日本語の「寒くないですか？」より直球。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '入国の目的は？',
        english: [
            'Sightseeing.',
            "I am here for sightseeing.",
            "I am here on vacation — just doing some sightseeing.",
            "Vacation. Yeah, just sightseeing. First time here actually. I am really excited. I have been planning this trip for like a year.",
        ],
        context: '入国審査でsightseeingは魔法の一言。余計なことは言わない。business(仕事)と言うとビザの種類を聞かれる。How long are you staying? に対してはOne weekのように具体的に。入国審査は短く、明確に、笑顔で。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },
    {
        daySlot: 25, japanese: '帰りの便はいつですか',
        english: [
            'When is my return flight?',
            "When does my return flight leave?",
            "Can you check my return flight? I think it is on the fifteenth but I want to make sure.",
            "I should probably double-check my return flight. I think it is the fifteenth? But honestly, I booked it months ago and I did not write it down. That was smart.",
        ],
        context: 'return flight は帰りの便。one-way(片道)、round-trip(往復)も覚えておくと便利。double-check は「再確認」。日本語の「念のため確認」にぴったり。英語圏では旅行日程を暗記せずスマホに頼るのが普通。',
        character: 'yuki', category: 'travel', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 26: 思い出を語る (Sharing Memories)
    // Scene: 居酒屋で「人生で一番の思い出」を語る夜。権藤マスターの過去も少し出る。
    // ────────────────────────────────────────────────────

    {
        daySlot: 26, japanese: 'あの時は楽しかった',
        english: [
            'That was fun.',
            'That was such a good time.',
            'I had the best time — I still think about it.',
            "Man, that was so much fun. Like, I still think about it randomly sometimes and just start smiling. Those were the days.",
        ],
        context: 'Those were the days は「あの頃はよかった」の決まり文句。英語は思い出を語るとき過去形が基本だけど、I still think about it で「今でも覚えている」と現在に引き戻す。日本語の「楽しかったなー」の余韻を英語でも出せる。',
        character: 'master', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: '忘れられない',
        english: [
            'I can not forget it.',
            'I will never forget that.',
            'That is something I will carry with me forever.',
            "That is one of those things that just... stays with you, you know? Like, years go by and it is still right there.",
        ],
        context: 'carry with me は「一生持ち歩く」の比喩で思い出に使うと詩的。stays with you も同じ。unforgettable は作文っぽい。会話ではI will never forget のほうが断然自然。日本語の「忘れられない」は受動的、英語は能動的に「忘れない」と宣言する。',
        character: 'master', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: '懐かしい',
        english: [
            'I miss those days.',
            'That takes me back.',
            'That brings back so many memories — I had not thought about that in years.',
            "Oh wow, that takes me back. I have not thought about that in forever. It is funny how one little thing can just bring it all back, right?",
        ],
        context: '「懐かしい」は英語に一語で訳せない日本語の代表格。nostalgicはフォーマルすぎる。That takes me back(あの頃に連れ戻される)が会話で最も自然。brings back memories も良い。英語は「感情」ではなく「移動」で懐かしさを表現する。',
        character: 'kenji', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: '昔はよく〜した',
        english: [
            'I used to...',
            'I used to do that all the time.',
            'I used to do that all the time when I was younger — it was kind of my thing.',
            "Oh, I used to do that all the time. Like, every weekend. I do not know when I stopped. Life just gets busy, I guess. I kind of miss it.",
        ],
        context: 'used to は「昔はよく〜した（今はしない）」。英語学習者が意外と使えない文法ナンバーワン。would も過去の習慣に使えるけど、used to のほうが「今はやっていない」のニュアンスが強い。日本語の「昔は」の切なさ。',
        character: 'takeshi', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: '初めて〜した時のこと覚えてる',
        english: [
            'I remember my first time.',
            'I still remember the first time I did that.',
            'I will never forget the first time — I was so nervous, but it was amazing.',
            "I remember my first time like it was yesterday. I was shaking. Like, literally shaking. And then it happened and I was like... that is it? All that stress for nothing.",
        ],
        context: 'like it was yesterday は「昨日のことのように」。英語の思い出話ではI was so nervous(めっちゃ緊張した)がよく出る。That is it? は「え、これだけ？」の期待外れ表現。初体験の話は日英どちらも盛り上がるネタ。',
        character: 'mina', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: '一番嬉しかったのは',
        english: [
            'The happiest moment was...',
            'The best moment was when...',
            'If I had to pick the one moment I was happiest — it would be that.',
            "You know what the best part was? It was not even the big moment. It was this tiny little thing that happened right before. That is the part I remember the most.",
        ],
        context: 'If I had to pick は「一つ選ぶなら」のフレーズ。英語圏では「一番」を聞かれたら具体的エピソードで答える文化。日本語の「一番嬉しかった」は感情で終わるけど英語は「なぜ？」「どの瞬間？」まで語るのが普通。',
        character: 'lisa', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: 'あの頃に戻りたい',
        english: [
            'I want to go back.',
            'I wish I could go back to that.',
            'Sometimes I wish I could just go back and live in that moment again.',
            "Honestly? If I could go back, I would. Not to change anything — just to feel that way again. Is that weird? Whatever, I do not care if it is weird.",
        ],
        context: 'I wish I could は「できたらいいのに（でもできない）」の仮定法。英語の仮定法は日本語にない微妙なニュアンスを出す。「戻りたい」を I want to go back と言うと本気度が高すぎる。I wish で「叶わない願い」の切なさが出る。',
        character: 'master', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: '写真見せて',
        english: [
            'Show me.',
            'Let me see the photos!',
            "Pull up the pictures — I want to see!",
            "Wait, you have pictures? Pull them up right now. I need to see this. Oh my God, look at you. You look so young. This is amazing.",
        ],
        context: 'Pull up は「（スマホで）出して」。Showだと命令っぽいがLet me seeは「見せてー」のワクワク感。Look at you! は「見てこれ！」で写真を見ながらの定番リアクション。日本語の「うわー若い！」は英語でもYou look so young! でそのまま通じる。',
        character: 'mina', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: '覚えてる？',
        english: [
            'Remember?',
            'Do you remember that?',
            'Do you remember when we...? That was hilarious.',
            "Wait, do you remember that time when... oh God, what was it. It was at that place with the... you know what I am talking about, right?",
        ],
        context: 'Remember? だけで「覚えてる？」になるシンプルさ。Do you remember when は思い出話の定番の出だし。途中で言葉に詰まるのもリアルな英語。You know what I am talking about は「わかるよね？」で記憶を共有する親密さ。',
        character: 'takeshi', category: 'feeling', month: '2026-04',
    },
    {
        daySlot: 26, japanese: 'あれからもう5年',
        english: [
            'It has been five years.',
            'It has already been five years since then.',
            'Can you believe it has been five years? Time flies.',
            "Five years. Five years already. Where did the time go? I feel like that was last month. Seriously, someone needs to slow time down because this is getting ridiculous.",
        ],
        context: 'Time flies は「光陰矢の如し」の英語版で世界共通の感覚。Where did the time go? は「時間どこ行った？」で時の流れの速さを嘆く。英語は時間を擬人化する（Time flies, Time heals, Time waits for no one）。日本語と発想が同じ。',
        character: 'kenji', category: 'feeling', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 27: 約束する (Making & Keeping Plans)
    // Scene: みんなで旅行計画を立てる。約束の仕方がバラバラ。
    // ────────────────────────────────────────────────────

    {
        daySlot: 27, japanese: 'いつがいい？',
        english: [
            'When is good?',
            'When works for you?',
            'What day works best for everyone? I am pretty flexible.',
            "So when are we doing this? I am free basically any weekend this month. Just throw out a date and I will make it work.",
        ],
        context: 'When works for you? が予定調整の鉄板。What works は「何が都合いい？」で時間にも場所にも使える。flexible は「融通がきく」。日本語の「いつでもいいよ」は英語だとI am flexible のほうがAnytime より具体的で親切。',
        character: 'lisa', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: '〜なら空いてる',
        english: [
            'I am free then.',
            "I am free on Saturday!",
            "Saturday works for me — I have got nothing going on that day.",
            "Saturday? Let me check... yeah, Saturday is good. I mean, I was going to do laundry but that can wait. This is more important.",
        ],
        context: 'I am free は「空いてる」の直訳だけど自然。I have got nothing going on は「何も予定ない」のカジュアル版。Let me check は「確認させて」で即答を避ける日本人にぴったりの便利フレーズ。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: '予定確認するね',
        english: [
            'Let me check.',
            'Let me check my schedule.',
            'Give me a second to check my calendar — I might have something.',
            "Hold on, let me look. I feel like I might have... no wait, that is next week. OK yeah, I am good. Let us do it.",
        ],
        context: 'Let me check は返事を保留する万能フレーズ。I might have something は「何かあるかも」で曖昧にする技術。日本語の「ちょっと確認する」と全く同じ使い方。即答できないときの時間稼ぎは日英共通の生存戦略。',
        character: 'yuki', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: 'ドタキャンしないでね',
        english: [
            'Do not cancel on me.',
            "You better not bail on me!",
            "Promise me you will not flake out this time — I am counting on you.",
            "OK but for real, do not bail on me. You always do this. You say you are coming and then the day of, you are like, oh something came up. Not this time.",
        ],
        context: 'bail は「ドタキャンする」のスラング。flake out も同じ。cancel on me のon me が「俺に対して」の被害者感を出す。日本語の「ドタキャン」は和製英語で英語にはない。bail, flake, ditch が英語のドタキャン3兄弟。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: 'リマインドして',
        english: [
            'Remind me.',
            'Can you remind me the day before?',
            "Send me a reminder, because I will definitely forget.",
            "You need to text me the night before. And then again in the morning. I have the memory of a goldfish, I am not even joking.",
        ],
        context: 'memory of a goldfish は「金魚並みの記憶力」=すぐ忘れる人の自虐。remind は「思い出させる」。日本語の「リマインド」はそのまま英語だけど、実際の会話ではSend me a text（テキスト送って）のほうが自然。',
        character: 'mina', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: '何時に集合？',
        english: [
            'What time?',
            "What time should we meet?",
            "What time are we meeting? And where? I need specifics or I will be lost.",
            "OK so what time are we meeting and where exactly? Like, give me a pin. I am the kind of person who shows up to the wrong place if you give me vague directions.",
        ],
        context: 'give me a pin は「位置ピンを送って」でスマホ時代の集合あるある。specifics は「具体的な情報」。日本語の「集合」は英語にはない概念で、meetやgather が近いけど「集合」のきっちり感は英語に訳せない。',
        character: 'kenji', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: '遅れそう',
        english: [
            'I will be late.',
            "I am running late — sorry!",
            "I am going to be like ten minutes late — start without me.",
            "OK do not hate me but I am running so late. I was literally walking out the door and then... long story. I will be there in fifteen. Maybe twenty. Just order me a drink.",
        ],
        context: 'I am running late の running は「遅刻が進行中」。start without me は「先に始めてて」の気遣い。Do not hate me は「嫌いにならないで」の冗談前置き。日本語の「遅れます、すみません」は謝罪が先だけど英語は状況説明が先。',
        character: 'mina', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: '予定変更していい？',
        english: [
            'Can we change the plan?',
            "Would you mind if we moved it?",
            "Something came up — any chance we could reschedule?",
            "I feel so bad asking this, but can we push it back? I know we already set a date but my schedule just blew up. Is that OK? I will make it up to you.",
        ],
        context: 'push it back は「後ろにずらす」。reschedule は「予定を組み直す」。my schedule blew up は「予定が爆発した」=急に忙しくなった。I will make it up to you は「埋め合わせする」の定番。日本語の「ごめん」の代わりに「埋め合わせ」を申し出る英語文化。',
        character: 'lisa', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: '約束したじゃん',
        english: [
            'You promised.',
            'But you promised!',
            "Come on, you gave me your word — you can not back out now.",
            "Excuse me, you literally said, and I quote, I will be there. Those were your exact words. You can not do this to me. I saved the text.",
        ],
        context: 'gave me your word は「約束した」のフォーマル版で本気度が高い。back out は「約束から撤退する」。I saved the text は「LINEスクショあるよ」の英語版。日本語の「約束したじゃん」の詰め寄り感はYou literally said で出せる。',
        character: 'takeshi', category: 'request', month: '2026-04',
    },
    {
        daySlot: 27, japanese: '楽しみ！',
        english: [
            'I can not wait!',
            "I am so excited!",
            "I can not wait — this is going to be so much fun!",
            "I am literally counting down the days. Is that sad? I do not care. I need this. We all need this. It is going to be amazing.",
        ],
        context: 'I can not wait が「楽しみ」の鉄板。excited は「ワクワク」。日本語の「楽しみ」は静かな期待だけど英語のI can not wait! は「待てない！」と爆発的。counting down the days は「指折り数えて待つ」。英語は期待を大げさに表現する文化。',
        character: 'yuki', category: 'request', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 28: 夢を語る (Talking About Dreams)
    // Scene: 居酒屋で「将来何したい？」を語る。酔った勢いの本音トーク。
    // ────────────────────────────────────────────────────

    {
        daySlot: 28, japanese: 'いつか〜したい',
        english: [
            'Someday I want to...',
            "One day, I really want to...",
            "It has always been a dream of mine to... I just never found the right time.",
            "You know what I have always wanted to do? Like, ever since I was a kid? This is going to sound random but... I have always wanted to live abroad. Even just for a year.",
        ],
        context: 'someday と one day の微妙な差。someday は「いつかね」と曖昧、one day は「ある日きっと」と少し本気度が高い。It has always been a dream は「ずっと夢だった」。英語は夢を語るとき具体的なほどカッコいい。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: '夢がある',
        english: [
            'I have a dream.',
            'There is something I have always wanted to do.',
            "Do not laugh, but I actually have a dream I have never told anyone about.",
            "OK, so this is going to sound cheesy, but I actually have a dream. Like a real one. I just never say it out loud because then it becomes real, you know?",
        ],
        context: 'I have a dream はキング牧師の有名スピーチと同じ。英語で夢を語るとき Do not laugh は「笑わないで」の前置き。日本語では夢を語るのが恥ずかしい文化だけど英語圏では夢を持つことがリスペクトされる。照れる必要なし。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: '目標は〜です',
        english: [
            'My goal is to...',
            "I am working toward...",
            "My goal right now is to... and I am actually making progress.",
            "So my big goal — and I have actually been working on this — is to... I mean, I am not there yet, but I am closer than I was a year ago. That counts for something, right?",
        ],
        context: 'dream と goal の違い。dream は「叶うかわからない夢」、goal は「具体的に目指しているもの」。working toward は「〜に向かって努力中」。That counts for something は「それなりに意味がある」の自己肯定。',
        character: 'kenji', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: '〜になりたい',
        english: [
            'I want to be...',
            "I have always wanted to be...",
            "When I was younger, I wanted to be... and honestly, a part of me still does.",
            "I know this sounds kind of childish, but I always wanted to be a... Like, even now, sometimes I think about it and I am like, what if I just went for it?",
        ],
        context: 'what if I just went for it? は「やっちゃったらどうなる？」の自問。went for it の went は仮定法で「もし」のニュアンス。日本語の「〜になりたい」は子供っぽく聞こえるけど英語では大人が堂々と言う。年齢制限なし。',
        character: 'mina', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: 'まだ間に合う？',
        english: [
            'Is it too late?',
            'Do you think it is too late for me?',
            "Be honest with me — is it too late to start over at my age?",
            "Serious question. Like, real talk. Is it too late for me? Because some days I think yeah, ship has sailed. And other days I think, why not me? Why not now?",
        ],
        context: 'ship has sailed は「もう手遅れ」の慣用句。船が出港した=チャンスは去った。Is it too late? は年齢を気にする日本人がよく聞くフレーズ。英語圏では It is never too late（遅すぎることはない）が定番の励まし。',
        character: 'kenji', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: '諦めたくない',
        english: [
            'I do not want to give up.',
            "I refuse to give up.",
            "I have come too far to give up now — I am seeing this through.",
            "You know what, I am not giving up. I have put too much into this. And yeah, maybe it is stupid, but I would rather try and fail than just... not try. That is worse.",
        ],
        context: 'give up は「諦める」。see it through は「最後までやり遂げる」。I have come too far は「ここまで来すぎた」=引き返せない。日本語の「諦めない」は精神論だけど英語はI would rather try and fail で論理的に理由を語る。',
        character: 'master', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: '現実的じゃないけど',
        english: [
            'It is not realistic but...',
            "I know it sounds crazy, but...",
            "This is probably unrealistic, but hear me out...",
            "OK so this is probably the most unrealistic thing I have ever said, and I have said some pretty unrealistic things, but... what if we actually did it? Like, for real?",
        ],
        context: 'hear me out は「最後まで聞いて」の前置き。I know it sounds crazy は「バカみたいに聞こえるのはわかってる」。日本語では夢を語る前に自分を下げるけど英語でも同じテクニックがある。笑われる前に自分で笑う。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: '一歩踏み出したい',
        english: [
            'I want to take the first step.',
            "I just need to take that first step.",
            "I think the hardest part is just starting — once I take that first step, I will be fine.",
            "Everyone keeps saying just take the first step, and I am like, yeah, but that is the hard part. The first step is the scariest one. After that it is just... walking.",
        ],
        context: 'take the first step は日英で全く同じ比喩。「一歩」の力は言語を超える。the hardest part is starting は「始めるのが一番難しい」の真理。英語は人生のアドバイスを比喩で語る文化。journey of a thousand miles begins with a single step も有名。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: '何歳からでも遅くない',
        english: [
            'It is never too late.',
            "It is never too late to start.",
            "Age is just a number — if you want it, go get it.",
            "You know what, I used to think there was an age limit on stuff like this. But there is not. My grandma started painting at seventy and she is better than me. It is never too late.",
        ],
        context: 'age is just a number は「年齢はただの数字」の名言。It is never too late は世界で最も多く言われている励ましの一つ。日本語の「遅くない」は慰めに聞こえるけど英語では本気の信念として語る。文化的に年齢を理由にしない。',
        character: 'master', category: 'social', month: '2026-04',
    },
    {
        daySlot: 28, japanese: 'やるしかない',
        english: [
            'Just do it.',
            "There is nothing left to do but go for it.",
            "At this point, what do I have to lose? I am going for it.",
            "You know what, I am done thinking about it. I have been going back and forth for months. Years, maybe. At some point you just have to commit and figure it out as you go.",
        ],
        context: 'What do I have to lose? は「失うものは何？」=やるしかない。figure it out as you go は「やりながら考える」。日本語の「やるしかない」は覚悟の一言だけど英語は自分を説得するプロセスを言語化する。決断の独り言が英語は長い。',
        character: 'lisa', category: 'social', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 29: お祝い (Celebrating)
    // Scene: 居酒屋で誰かの昇進祝い。乾杯からプレゼントまで。
    // ────────────────────────────────────────────────────

    {
        daySlot: 29, japanese: 'おめでとう！',
        english: [
            'Congratulations!',
            "Congrats! You deserve it!",
            "Congratulations — I am so happy for you. This is huge!",
            "Dude, congratulations! I literally screamed when I heard. Like, in public. People looked at me. I do not care. This is amazing.",
        ],
        context: 'Congrats が会話のカジュアル版。You deserve it は「あなたにふさわしい」で最高の褒め言葉。日本語の「おめでとう」は1語だけど英語は理由や感情を足す。I am so happy for you の for you が「自分のことのように嬉しい」のニュアンス。',
        character: 'lisa', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: '乾杯！',
        english: [
            'Cheers!',
            "Cheers, everyone!",
            "Cheers to you and everything you have accomplished — bottoms up!",
            "All right, everyone grab your glass. I want to make a toast. To the hardest working person I know. You earned this. Cheers!",
        ],
        context: 'Cheers! が英語の「乾杯」。toast は「乾杯のスピーチ」。make a toast で「乾杯の挨拶をする」。bottoms up は「飲み干せ」。英語圏の乾杯は目を見てグラスをぶつける。目をそらすと不幸が来るという迷信がある国も。',
        character: 'master', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: 'お祝いしよう',
        english: [
            'Let us celebrate!',
            "We have to celebrate this!",
            "This calls for a celebration — drinks are on me tonight!",
            "OK we are celebrating tonight. No excuses. Nobody is going home early. This is a big deal and we are making a night of it. First round is on me.",
        ],
        context: 'This calls for a celebration は「これはお祝いに値する」の決まり文句。drinks are on me は「おごる」。日本語の「おごる」は英語で on me / my treat / I got this と複数ある。first round は「最初の一杯」で全部はおごらないスマートな線引き。',
        character: 'takeshi', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: 'よく頑張ったね',
        english: [
            'Good job.',
            'You worked so hard for this.',
            "You put in the work and it paid off — I am proud of you.",
            "I watched you grind for this. Like, all those late nights and all that stress. And now look at you. You actually did it. I am genuinely proud of you.",
        ],
        context: 'it paid off は「努力が報われた」。I am proud of you は英語で最も心に響く褒め言葉の一つ。日本語で「誇りに思う」は大げさだけど英語では友達にも気軽に言う。grind は「コツコツ努力する」のスラング。',
        character: 'kenji', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: 'プレゼントあるよ',
        english: [
            'I got you something.',
            "I have a little something for you.",
            "Close your eyes — I got you a little present.",
            "OK so do not get too excited, but I got you something. It is nothing crazy. I just saw it and thought of you and I was like, yeah, I have to get this.",
        ],
        context: 'I got you something は「何か買ってきた」のサプライズ前置き。a little something は「ちょっとしたもの」と期待値を下げる謙遜。I saw it and thought of you は「見たらあなたを思い出した」で贈り物の最高の理由。',
        character: 'mina', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: 'サプライズ！',
        english: [
            'Surprise!',
            "Surprise! Did we get you?",
            "Did you have any idea? We have been planning this for weeks!",
            "Your face right now is priceless. We have been keeping this a secret for like three weeks and honestly I almost ruined it twice. I am the worst at secrets.",
        ],
        context: 'priceless は「値段がつけられない」=「最高の表情」。英語のsurpriseは日本語と同じだけど、Did we get you?(驚いた？)のget youは「やってやった」のニュアンス。英語圏のサプライズは日本より盛大にやる文化。',
        character: 'lisa', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: '嬉しすぎる',
        english: [
            'I am so happy.',
            "I can not believe this — I am so happy!",
            "You guys, this means the world to me. I do not even know what to say.",
            "I am going to cry. I am not even kidding. This is... you guys are the best. I do not deserve this. Actually, no, I do deserve this. But still. Thank you.",
        ],
        context: 'means the world to me は「世界と同じくらい大切」=「本当に嬉しい」の最上級表現。I do not know what to say は「言葉にならない」。英語は感動したとき自己矛盾する（I do not deserve this, actually I do）のがリアル。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: '泣きそう',
        english: [
            'I am going to cry.',
            "I am literally about to cry.",
            "Do not look at me — I am getting emotional over here.",
            "OK nobody look at me right now because I am about to lose it. I told myself I was not going to cry and look at me. This is so embarrassing. I love you guys.",
        ],
        context: 'lose it は「感情が溢れる」。I told myself I was not going to cry は「泣かないって決めてたのに」の定番。英語圏の男性も人前で泣くことに日本ほどの抵抗がない。getting emotional は「感情的になってきた」で泣く手前。',
        character: 'yuki', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: 'みんなのおかげ',
        english: [
            'Thanks to all of you.',
            "I could not have done it without you guys.",
            "Seriously, I owe it all to you guys. I would not be here without your support.",
            "I mean it — I could not have done any of this without you. Every single one of you helped me get here. And I know that sounds like an awards speech but I do not care. It is true.",
        ],
        context: 'I could not have done it without you は「あなたたちなしではできなかった」で英語の感謝の最上級。I owe it all to you は「全部あなたのおかげ」。日本語の「おかげさまで」は英語にない謙虚さだけどI owe it to youが近い。',
        character: 'kenji', category: 'greeting', month: '2026-04',
    },
    {
        daySlot: 29, japanese: '最高の夜だ',
        english: [
            'Best night ever.',
            "This is the best night ever!",
            "I do not think tonight can be topped — this is the best night I have had in years.",
            "You know what, I am going to remember this night for a really long time. Like, when I am old and grumpy, I am going to think back to tonight and smile. Best night ever.",
        ],
        context: 'Best night ever は「史上最高の夜」。can not be topped は「これ以上はない」。英語は感情のピークをeverで強調する(best ever, worst ever)。日本語の「最高」は控えめに使うけど英語のbest everは気軽に連発する。',
        character: 'master', category: 'greeting', month: '2026-04',
    },

    // ────────────────────────────────────────────────────
    // DAY 30: さよなら、またね (Goodbyes & See You Again)
    // Scene: Month 1最終日。居酒屋を出る夜。「終わり」ではなく「始まり」。
    // ────────────────────────────────────────────────────

    {
        daySlot: 30, japanese: 'そろそろ帰るね',
        english: [
            'I should get going.',
            "I should probably head out.",
            "I hate to say it, but I should probably get going — it is getting late.",
            "I do not want to leave, but it is getting late and I have to be up early. Which is the worst excuse ever but it is true this time. I promise.",
        ],
        context: 'I should get going は「そろそろ」の完璧な訳。head out も「出発する」のカジュアル版。日本語の「そろそろ」は帰る前に必ず言う予告。英語も I should probably... で「多分帰ったほうが」と未練を残す。去りがたさは世界共通。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: '今日はありがとう',
        english: [
            'Thanks for today.',
            "Thank you for tonight — I had a great time.",
            "I really needed this tonight. Thank you guys for everything.",
            "Honestly, tonight was exactly what I needed. I did not even realize how much until right now. Thank you. All of you. For real.",
        ],
        context: 'I really needed this は「これが必要だった」=「来てよかった」。日本語の「ありがとう」は去り際の礼儀だけど英語のThank youは感情を込めないとただの形式になる。I had a great time が「楽しかった」の万能お礼フレーズ。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: 'また来月ね',
        english: [
            'See you next month.',
            "See you next month — I will be here.",
            "Same time next month? I am already looking forward to it.",
            "Next month, right? Same spot, same people? I am putting it in my calendar right now. Done. It is locked in. You can not cancel on me.",
        ],
        context: 'Same time next month は「来月も同じ時間に」の約束。locked in は「確定した」のスラング。日本語の「また来月」は軽いけど英語ではI am putting it in my calendar と具体的にすることで本気度を示す。口約束より行動。',
        character: 'takeshi', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: '元気でね',
        english: [
            'Take care.',
            'Take care of yourself.',
            "Take care, OK? And do not work too hard.",
            "Take care of yourself, all right? Like, actually take care of yourself. Not the Japanese version where you say it but then work twelve-hour days. I mean it.",
        ],
        context: 'Take care は万能の「元気でね」。「お大事に」にも「またね」にも使える。日本語の「元気でね」は別れの言葉だけど英語のTake careはコンビニ店員すら言う軽いフレーズ。本気で心配するときは of yourself を足す。',
        character: 'master', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: '寂しくなるな',
        english: [
            'I will miss this.',
            "I am going to miss you guys.",
            "It is going to be weird not seeing you all every week. I actually got used to this.",
            "I know it is not goodbye forever, but I am still going to miss this. Like, this specific thing. Sitting here, talking about nothing and everything at the same time. Yeah. I am going to miss it.",
        ],
        context: 'I am going to miss this の this は「この空間・時間・雰囲気」全部を含む。日本語の「寂しい」は感情だけど英語は何がmissするのか具体的に言う。nothing and everything は「何でもないことと全部」の対比で居酒屋トークの本質を突く。',
        character: 'mina', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: '連絡するね',
        english: [
            'I will text you.',
            "I will keep in touch!",
            "I will text you — do not be a stranger, OK?",
            "We are staying in touch. I am serious. If I do not hear from you I am just going to show up at your door. That is not a threat, that is a promise.",
        ],
        context: 'keep in touch は「連絡取り合おう」の別れの定番。Do not be a stranger は「疎遠にならないでね」=「たまには顔出して」。日本語の「連絡する」は社交辞令率が高いけど英語のkeep in touchも正直、社交辞令率は同じくらい高い。',
        character: 'lisa', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: '忘れないでね',
        english: [
            'Do not forget me.',
            "Do not forget about me, OK?",
            "Promise you will not forget about me — I will quiz you next time.",
            "You better not forget me. I am not saying that in a sad way, I am saying it in a... OK maybe a little sad way. But mostly in a I will haunt you way. Keep practicing.",
        ],
        context: 'Do not forget about me は「忘れないで」のストレート版。I will haunt you は「化けて出るよ」のジョーク。日本語の「忘れないで」は切ない響きだけど英語では冗談を混ぜて重くしすぎないのが別れの作法。笑いで包む別れ。',
        character: 'kenji', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: 'これからもよろしくね',
        english: [
            'Here is to what is next.',
            "Let us keep this going.",
            "This is just the beginning — we are just getting started.",
            "I feel like we just got started, you know? Like, this was chapter one. And honestly, chapter one was pretty great. So I can not wait to see what chapter two looks like.",
        ],
        context: '「これからもよろしく」は英語に訳せない日本語の代表格その2。直訳不可能。Let us keep this going（続けよう）やThis is just the beginning（まだ始まり）で未来への期待を表す。英語は「よろしく」を未来形で語る。',
        character: 'master', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: '最高の1ヶ月だった',
        english: [
            'Best month ever.',
            "This has been the best month.",
            "If someone told me a month ago that I would feel this way, I would not have believed them.",
            "Thirty days. That is all it took. Thirty days ago I walked in here not knowing anyone and now I... yeah. I do not really have the words for it. Funny, right? Learning all this English and I still can not find the right words.",
        ],
        context: 'That is all it took は「たったそれだけで」。30日前の自分と今の自分を比較するのは英語の振り返りの王道。最後のオチ「英語を学んでるのに言葉が見つからない」は物語のメタ的な終わり方。言語の限界に気づくことが言語学習の始まり。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
    {
        daySlot: 30, japanese: '次はもっと話せるようになる',
        english: [
            'I will get better.',
            "Next time, I will be even better at this.",
            "Give me one more month and I will blow you away — just watch.",
            "Next time I walk in here, I am going to order in English, tell a joke in English, and make you cry in English. That is my goal. All three. One month. Watch me.",
        ],
        context: 'blow you away は「度肝を抜く」。just watch, watch me は「見てて」の宣言。英語は未来の自分を堂々と語る文化。日本語の「頑張ります」は控えめだけど英語は具体的に何ができるようになるか言い切る。Month 1の最後にふさわしい宣言。',
        character: 'yuki', category: 'social', month: '2026-04',
    },
];

// ============================================================
// DAY THEMES -- WEEK 4 + FINAL DAYS
// ============================================================

export const WEEK4_DAY_THEMES: Record<number, { title: string; titleEn: string; category: string; scene: string; keywords: KeyWord[] }> = {
    22: {
        title: '褒める', titleEn: 'Giving Compliments', category: 'greeting',
        scene: 'リサが「英語で褒める」授業を開催。褒め方の文化差に全員驚く。',
        keywords: [
            { en: 'compliment', ja: '褒め言葉', pron: 'コンプリメント', example: 'That is a nice compliment.', note: '日本語の「お世辞」は英語でflattery。complimentは純粋な褒め。使い分け注意。' },
            { en: 'suit', ja: '似合う', pron: 'スート', example: 'That really suits you.', note: '服にはsuit、髪型にもsuit。「スーツ」のsuitと同じ単語。意味が全然違う。' },
            { en: 'improve', ja: '上達する', pron: 'インプルーヴ', example: 'You have really improved.', note: 'get betterのほうがカジュアル。improveは少しフォーマルで先生っぽい。' },
            { en: 'talented', ja: '才能がある', pron: 'タレンテッド', example: 'You are so talented.', note: '日本語の「タレント」は芸能人だけど英語のtalentedは才能全般。誰にでも使える。' },
            { en: 'gorgeous', ja: '素敵すぎる', pron: 'ゴージャス', example: 'You look gorgeous!', note: '日本語の「ゴージャス」は豪華だけど英語のgorgeousは「めっちゃきれい」の意味が強い。' },
        ],
    },
    23: {
        title: '予約する', titleEn: 'Making Reservations', category: 'order',
        scene: 'ケンジが海外出張で初めて英語でレストラン予約。電話で緊張。',
        keywords: [
            { en: 'reservation', ja: '予約', pron: 'レザベーション', example: 'I have a reservation under Kenji.', note: 'レストラン=reservation、ホテル=booking、医者=appointment。全部「予約」だけど英語は分かれる。' },
            { en: 'available', ja: '空いている', pron: 'アヴェイラブル', example: 'Is a window seat available?', note: '人にも物にも場所にも使える万能語。Are you available? は「空いてる？」。' },
            { en: 'private room', ja: '個室', pron: 'プライベートルーム', example: 'Do you have a private room?', note: '海外のレストランに個室はほぼない。日本の居酒屋文化ならではの概念。' },
            { en: 'cancel', ja: 'キャンセルする', pron: 'キャンセル', example: 'I need to cancel my reservation.', note: 'cancelは英語でも日本語でも同じ。ただしcancellationは名詞形で綴りが変わる。' },
            { en: 'confirm', ja: '確認する', pron: 'コンファーム', example: 'I would like to confirm my reservation.', note: 'ホテルのcheck-in前に使う。confirmは「間違いないか確かめる」で予約以外にも頻出。' },
        ],
    },
    24: {
        title: 'お土産を選ぶ', titleEn: 'Souvenir Shopping', category: 'shopping',
        scene: 'ミナが外国人の友達へのお土産を選ぶ。何が喜ばれるかの文化差。',
        keywords: [
            { en: 'souvenir', ja: 'お土産', pron: 'スーヴェニア', example: 'I am looking for souvenirs.', note: '英語のsouvenirは自分用の記念品。日本の「配るお土産」はgifts from my trip が近い。' },
            { en: 'popular', ja: '人気がある', pron: 'ポピュラー', example: 'What is the most popular one?', note: 'famous(有名)とpopular(人気)は違う。物にはpopular、人にはどちらも使える。' },
            { en: 'shelf life', ja: '賞味期限', pron: 'シェルフライフ', example: 'What is the shelf life?', note: '棚(shelf)の寿命(life)=保存期間。expiration dateより口語的で自然。' },
            { en: 'customs', ja: '税関', pron: 'カスタムズ', example: 'Will this get through customs?', note: 'customは「習慣」、customsは「税関」。sがつくだけで全然違う意味になる罠。' },
            { en: 'individually wrapped', ja: '個包装', pron: 'インディヴィジュアリーラップト', example: 'Do you have anything individually wrapped?', note: '日本の個包装文化は世界的に珍しい。海外では「過剰包装」と見られることも。' },
        ],
    },
    25: {
        title: '空港で', titleEn: 'At the Airport', category: 'travel',
        scene: 'ユキの初海外。空港の英語が全部わからなくてパニック。',
        keywords: [
            { en: 'boarding gate', ja: '搭乗口', pron: 'ボーディングゲート', example: 'Where is gate twelve?', note: '会話ではgateだけでOK。boarding passは搭乗券。boardは「乗る」の意味。' },
            { en: 'connecting flight', ja: '乗り継ぎ便', pron: 'コネクティングフライト', example: 'I have a connecting flight.', note: 'connectionだけでも通じる。layoverは乗り継ぎ待ち時間。stopoverは途中降機。' },
            { en: 'customs', ja: '税関', pron: 'カスタムズ', example: 'Anything to declare at customs?', note: 'immigration(入国審査)とcustoms(税関)は別。日本人はimmigrationで緊張しがち。' },
            { en: 'carry-on', ja: '機内持ち込み', pron: 'キャリーオン', example: 'Is this carry-on size?', note: 'carry-on(持ち込み) vs checked bag(預け入れ)。LCCはcarry-onにも料金がかかる。' },
            { en: 'delay', ja: '遅延', pron: 'ディレイ', example: 'Is the flight delayed?', note: '日本の鉄道の正確さは世界的に異常。海外では遅延は日常。on timeは「定刻通り」。' },
        ],
    },
    26: {
        title: '思い出を語る', titleEn: 'Sharing Memories', category: 'feeling',
        scene: '居酒屋で「人生で一番の思い出」を語る夜。権藤マスターの過去も少し出る。',
        keywords: [
            { en: 'nostalgic', ja: '懐かしい', pron: 'ノスタルジック', example: 'That makes me feel nostalgic.', note: '会話ではThat takes me back のほうが自然。nostalgicはエッセイ向き。' },
            { en: 'unforgettable', ja: '忘れられない', pron: 'アンフォゲッタブル', example: 'It was an unforgettable experience.', note: '会話ではI will never forget のほうが自然。unforgettableは書き言葉寄り。' },
            { en: 'memory', ja: '思い出', pron: 'メモリー', example: 'That brings back memories.', note: 'memoryは記憶も思い出も。good memories(いい思い出)、fond memories(懐かしい思い出)。' },
            { en: 'regret', ja: '後悔', pron: 'リグレット', example: 'I have no regrets.', note: 'No regrets は「後悔なし」の人生哲学。I regret not doing it は「やらなかったことを後悔」。' },
            { en: 'cherish', ja: '大切にする', pron: 'チェリッシュ', example: 'I will cherish this memory.', note: 'treasureも同じ意味。cherish memories, cherish friendship のように使う。日常会話ではやや文学的。' },
        ],
    },
    27: {
        title: '約束する', titleEn: 'Making Plans', category: 'request',
        scene: 'みんなで旅行計画を立てる。約束の仕方がバラバラ。',
        keywords: [
            { en: 'schedule', ja: '予定・スケジュール', pron: 'スケジュール', example: 'Let me check my schedule.', note: '英語の発音はスケジュールではなくシェジュール(英)またはスケジュール(米)。国で違う珍しい単語。' },
            { en: 'available', ja: '都合がいい', pron: 'アヴェイラブル', example: 'When are you available?', note: 'free(空いてる)のほうがカジュアル。availableはやや丁寧でビジネス寄り。' },
            { en: 'cancel', ja: 'キャンセルする', pron: 'キャンセル', example: 'Do not cancel on me.', note: 'cancel on someone で「誰かとの約束をキャンセルする」。onがつくと被害者ニュアンス。' },
            { en: 'reminder', ja: 'リマインダー', pron: 'リマインダー', example: 'Send me a reminder.', note: 'remind me(思い出させて)が動詞形。日本語の「リマインド」はそのまま英語。' },
            { en: 'confirm', ja: '確定する', pron: 'コンファーム', example: 'Can you confirm the time?', note: '予約の確認にも約束の確認にも使える。Let me confirm は「確認させて」のビジネス定番。' },
        ],
    },
    28: {
        title: '夢を語る', titleEn: 'Talking About Dreams', category: 'social',
        scene: '居酒屋で「将来何したい？」を語る。酔った勢いの本音トーク。',
        keywords: [
            { en: 'goal', ja: '目標', pron: 'ゴール', example: 'My goal is to travel the world.', note: 'dreamは夢(叶うかわからない)、goalは目標(具体的に目指す)。日本語では混同しがち。' },
            { en: 'dream', ja: '夢', pron: 'ドリーム', example: 'It has always been my dream.', note: '英語圏ではI have a dreamと堂々と語るのがカッコいい。恥ずかしがらない文化。' },
            { en: 'someday', ja: 'いつか', pron: 'サムデイ', example: 'Someday I will do it.', note: 'someday(いつか、曖昧) vs one day(ある日きっと、やや本気)。微妙に温度が違う。' },
            { en: 'realistic', ja: '現実的', pron: 'リアリスティック', example: 'Is that realistic?', note: 'unrealisticは「非現実的」。Be realistic は「現実を見ろ」で厳しいアドバイス。' },
            { en: 'pursue', ja: '追いかける', pron: 'パスー', example: 'I want to pursue my dream.', note: 'chase(追いかける)よりpursue(追求する)のほうが夢に対して使うと上品。go for itがカジュアル版。' },
        ],
    },
    29: {
        title: 'お祝い', titleEn: 'Celebrating', category: 'greeting',
        scene: '居酒屋で誰かの昇進祝い。乾杯からプレゼントまで。',
        keywords: [
            { en: 'congratulations', ja: 'おめでとう', pron: 'コングラチュレーションズ', example: 'Congratulations on your promotion!', note: 'Congrats が日常版。on + 理由 で「何のお祝い」を具体的に。sを忘れずに。' },
            { en: 'toast', ja: '乾杯のスピーチ', pron: 'トースト', example: 'I want to make a toast.', note: '食べるトーストと同じ単語。make a toast = 乾杯のスピーチ。語源はパンをワインに浸す習慣。' },
            { en: 'celebrate', ja: '祝う', pron: 'セレブレイト', example: 'Let us celebrate tonight!', note: 'celebration(名詞)。celebrity(有名人)と語源が同じ。「称える」の意味がコア。' },
            { en: 'deserve', ja: 'ふさわしい', pron: 'ディザーヴ', example: 'You deserve it!', note: '英語で最高の褒め言葉の一つ。You deserve it = 努力の成果にふさわしい。日本語にない概念。' },
            { en: 'milestone', ja: '節目', pron: 'マイルストーン', example: 'This is a huge milestone.', note: '元は道路の距離標。人生の節目にも使う。turning point(転換点)とは少し違う。' },
        ],
    },
    30: {
        title: 'さよなら、またね', titleEn: 'Goodbyes & See You Again', category: 'social',
        scene: 'Month 1最終日。居酒屋を出る夜。「終わり」ではなく「始まり」。',
        keywords: [
            { en: 'farewell', ja: '別れの挨拶', pron: 'フェアウェル', example: 'This is not a farewell — it is a see you later.', note: 'goodbye よりフォーマル。farewell partyは送別会。日常会話ではSee you のほうが圧倒的に多い。' },
            { en: 'grateful', ja: '感謝している', pron: 'グレイトフル', example: 'I am so grateful for this.', note: 'thankfulよりやや深い感謝。I am grateful for... はスピーチの定番。日記にも使える。' },
            { en: 'promise', ja: '約束', pron: 'プロミス', example: 'I promise I will be back.', note: 'promise は重い約束。pinky promise は指切りげんまん。日英で「指」を使う約束の仕方が似ている。' },
            { en: 'journey', ja: '旅・道のり', pron: 'ジャーニー', example: 'This is just the start of the journey.', note: '物理的な旅だけでなく「人生の道のり」にも使う。英語学習もa journeyと言える。tripは短期旅行。' },
            { en: 'chapter', ja: '章・節目', pron: 'チャプター', example: 'This was chapter one.', note: '人生を本に例える英語の定番比喩。new chapter = 新しい段階。close a chapter = 一区切り。' },
        ],
    },
};
