/**
 * 365 English Master -- Month 2 Week 5: 日常生活 (Daily Life)
 * Days 31-37: 70 expressions
 * Month: May 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 2 (2026-05) -- WEEK 5
// ============================================================

export const MONTH2_W5_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 31: 朝の会話 (Morning Routines)
    // Scene: ユキが朝のルーティンについて話す。みんな朝型か夜型かで盛り上がる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 31, japanese: '今日寝坊した',
        english: [
            'I overslept.',
            'I totally overslept this morning.',
            'I overslept and had to skip breakfast. Barely made the train.',
            "I totally overslept. My alarm went off like three times and I just kept hitting snooze. By the time I actually got up I had maybe ten minutes to get ready. No breakfast, no coffee, just pure panic. Not my best morning.",
        ],
        context: 'oversleepは「寝すぎた」の1語。日本語の「寝坊した」にドンピシャ。I slept too much だと「たっぷり寝た」のニュアンスになる。hit snooze は目覚ましのスヌーズボタンを押す動作。朝の失敗談はどの国でも盛り上がる。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: 'コーヒーがないと動けない',
        english: [
            'I need coffee.',
            "I can't function without coffee.",
            "I literally cannot function until I have my first cup of coffee.",
            "I am not a person until I have had my coffee. Like, do not talk to me before that. My brain is just static. One cup and I am human again. Two cups and I am actually pleasant to be around.",
        ],
        context: 'function は「機能する」。人に使うと「まともに動く」の意味で面白い。I am not a person until... は「〜するまで人間じゃない」の大げさ表現。コーヒー中毒ネタは英語圏の鉄板ユーモア。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: '朝ごはん何食べた？',
        english: [
            'What did you eat?',
            'What did you have for breakfast?',
            'What did you have for breakfast? I just grabbed a rice ball on the way.',
            "What did you have for breakfast? I did not have time for anything proper so I just grabbed an onigiri at the convenience store. Honestly that is my breakfast like four days a week. I keep telling myself I will wake up early and cook but... yeah, that is not happening.",
        ],
        context: 'have for breakfast は eat breakfast よりネイティブっぽい。grabbed は「さっとつかんだ」で、急いで買った感じが出る。英語は朝食の話をするとき what did you have が定番。eat は少し直接的。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: '毎朝ジョギングしてる',
        english: [
            'I jog every morning.',
            'I go jogging every morning.',
            'I try to go jogging every morning. Even if it is just twenty minutes.',
            "I have been going jogging every morning for about a year now. It started as a new year's resolution that I actually stuck with for once. Just twenty or thirty minutes around the neighborhood. It is not much but it wakes me up better than coffee honestly.",
        ],
        context: 'go jogging は「ジョギングに行く」。I jog でもいいけど go ...ing のパターンが英語では超自然（go shopping, go fishing）。stuck with は「続けた」。for once は「一度くらいは」の自虐。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: '通勤に1時間かかる',
        english: [
            'One hour to work.',
            'My commute is about an hour.',
            'It takes me about an hour to get to work. Door to door.',
            "My commute is about an hour each way. So two hours a day just sitting on a train. I have gotten really good at sleeping standing up. It is basically a skill at this point. Sometimes I miss my stop though, so maybe I am too good at it.",
        ],
        context: 'commute（コミュート）は通勤・通学の移動自体を指す名詞。日本語は「通勤」だけど英語は commute 1語で動詞にも名詞にもなる。door to door は「家のドアから会社のドアまで」。each way は片道。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: 'いつもギリギリ',
        english: [
            'Always last minute.',
            'I am always cutting it close.',
            'I am always running late. I leave the house at the last possible second.',
            "I am one of those people who is always cutting it close. Like, I calculate the exact minute I need to leave and then I somehow still end up rushing. I think I am just allergic to being early. It is a problem.",
        ],
        context: 'cutting it close は「ギリギリ」のネイティブ表現。last minute でもOKだけどcutting it closeのほうがハラハラ感がある。allergic to は「〜アレルギー」を比喩で使う英語のユーモア。日本語の「ギリギリ」は英語で一番訳しにくい感覚の1つ。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: '朝は苦手なんだよね',
        english: [
            'I am not a morning person.',
            "Mornings are not really my thing.",
            "I am so not a morning person. My brain does not start working until noon.",
            "I am the opposite of a morning person. Like, I physically cannot process anything before ten. My coworkers know not to ask me important questions before lunch. I have made some truly terrible decisions at eight in the morning.",
        ],
        context: 'morning person は「朝型の人」。not a morning person で「朝が苦手」を完璧に表現できる。日本語の「朝弱い」に直訳はないけど、この表現で100%通じる。night owl（夜型）とセットで覚える。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: 'シャワー浴びてから出る',
        english: [
            'I shower first.',
            'I take a quick shower before I head out.',
            'I always take a quick shower in the morning before I leave. Wakes me up.',
            "I cannot leave the house without a shower. Even if I am running late I will still jump in for like two minutes. It is the only thing that actually wakes me up. Cold water in the face and suddenly I am alive. My hair is a disaster but at least I am conscious.",
        ],
        context: 'take a shower が「シャワーを浴びる」の定番。have a shower はイギリス英語寄り。head out は「出かける」のカジュアル表現。leave より友達同士の会話向き。jump in は「さっと入る」の感覚。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: '早起きは三文の徳って言うけどさ',
        english: [
            'The early bird catches the worm.',
            "They say the early bird catches the worm, but...",
            "They always say the early bird catches the worm, but honestly I would rather sleep.",
            "You know how they say the early bird catches the worm? I have never been that bird. I am the worm. I am the one getting caught. But seriously, morning people scare me a little. How are you that cheerful at six in the morning? That is not natural.",
        ],
        context: 'The early bird catches the worm は英語のことわざで「早起きは三文の徳」とほぼ同じ意味。でも英語では「鳥が虫を捕まえる」で、日本語は「三文の得」。I am the worm は自虐ジョークとして最高。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 31, japanese: '目覚ましが鳴らなかった',
        english: [
            'My alarm did not go off.',
            "My alarm didn't go off this morning.",
            "My alarm did not go off. Or maybe it did and I just slept right through it.",
            "So my alarm did not go off this morning. Or maybe it did and I was just so deeply asleep that I did not hear it. Either way, I woke up and looked at my phone and it was already nine thirty. I have never gotten dressed that fast in my entire life.",
        ],
        context: 'go off は「鳴る」。日本語感覚だと go off=消える に思えるけど、英語ではalarm が go off すると「鳴り始める」。逆に turn off が「消す」。紛らわしいけど超頻出。slept through it は「寝たまま気づかなかった」。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 32: 仕事の英語 (Workplace Basics)
    // Scene: ケンジが職場の英語あるあるを語る。外国人の同僚とのやりとり。
    // ────────────────────────────────────────────────────

    {
        daySlot: 32, japanese: 'ちょっと確認したいんですけど',
        english: [
            'Can I check something?',
            'I just want to double-check something.',
            'Hey, I just want to double-check something real quick. Do you have a sec?',
            "Hey, sorry to bother you. I just want to double-check something real quick. It should only take a minute. I want to make sure I have the numbers right before I send this to the client. Do you mind taking a look?",
        ],
        context: 'double-check は「再確認する」。日本語の「確認」は1回の確認にも使うけど、英語の double-check は「念のためもう1回」のニュアンス。Do you have a sec? は「ちょっと時間ある？」の最短形。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: '締め切りいつですか？',
        english: [
            'When is the deadline?',
            "When is this due?",
            "When is this due? I want to make sure I have enough time.",
            "When is this due again? I have it in my calendar somewhere but I want to make sure I am not mixing it up with something else. I have like three things due this week and honestly I am starting to lose track.",
        ],
        context: 'deadline と due は同じ「締め切り」だけど使い方が違う。When is the deadline? はフォーマル寄り。When is this due? が日常会話で圧倒的に自然。due は「期限が来る」の形容詞。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: '会議が長すぎて死にそう',
        english: [
            'The meeting was so long.',
            "That meeting was way too long.",
            "That meeting went on forever. I could barely keep my eyes open.",
            "That meeting was supposed to be thirty minutes and it turned into two hours. Two hours. I ran out of things to doodle on my notepad. At some point I was just nodding and hoping nobody would ask me a question because I completely zoned out.",
        ],
        context: 'went on forever は「永遠に続いた」の大げさ表現。zone out は「ぼーっとする」のスラング。doodle は「落書きする」。英語圏でも会議が長い愚痴は世界共通。supposed to be は「本来〜のはずだった」。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: 'メール送っておきました',
        english: [
            'I sent the email.',
            "I've already sent the email.",
            "I sent the email earlier. Let me know if you need me to follow up.",
            "I already shot them an email this morning. I CC'd you on it so you should have it in your inbox. If they do not get back to us by tomorrow I will follow up. Just let me know if you want me to change anything before then.",
        ],
        context: 'shot them an email は「メールをさっと送った」のカジュアル表現。send より軽い。CC は carbon copy の略で「写しを送る」。follow up は「追いかける/フォローする」。日本語の「フォロー」とは微妙に違って、英語では「続けて確認する」の意味。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: 'お先に失礼します',
        english: [
            'I am leaving now.',
            "I'm heading out. See you tomorrow.",
            "I'm going to head out for the day. See you all tomorrow.",
            "All right, I think I am going to call it a day. I got through most of what I needed to do. If anything urgent comes up just shoot me a message. Otherwise I will see you all tomorrow morning. Have a good night, everyone.",
        ],
        context: 'call it a day は「今日はここまでにする」の定番表現。日本語の「お先に失礼します」の謙遜ニュアンスは英語にはない。英語はシンプルに I am heading out で十分。head out = leave のカジュアル版。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: 'これ手伝ってもらえますか？',
        english: [
            'Can you help me?',
            'Could you give me a hand with this?',
            'Hey, could you give me a hand with this? I am a little stuck.',
            "Hey, I hate to ask but could you give me a hand with this spreadsheet? I have been staring at these numbers for an hour and something is not adding up. I think there is a formula error somewhere but I cannot figure out where. Fresh eyes might help.",
        ],
        context: 'give me a hand は help me のカジュアル版。hand = 手 から「手を貸して」。I hate to ask は「頼みにくいんだけど」の前置き。fresh eyes は「新しい目線」で、自分が見落としてるものを他の人なら見つけられるかも、の意味。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: '今日は在宅です',
        english: [
            'I am working from home.',
            "I'm working from home today.",
            "I'm working remotely today. You can reach me on Slack though.",
            "I am working from home today. My kid is sick so I need to be here. I will be online the whole time though so just message me if you need anything. I might be a little slow to respond between like ten and eleven because I have a call but otherwise I am all yours.",
        ],
        context: 'work from home (WFH) はコロナ以降世界中で定着した表現。remotely は「遠隔で」。reach me は「連絡がつく」。日本語の「在宅勤務」は固いけど英語の working from home はカジュアル。',
        character: 'lisa', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: '忙しすぎて無理',
        english: [
            'I am too busy.',
            "I'm swamped right now.",
            "I am totally swamped this week. I do not think I can take on anything else.",
            "I wish I could help but I am absolutely swamped right now. I have three projects all due this week and I have not even started on the report yet. If you can wait until next week I am happy to jump in but right now I just physically cannot fit anything else in.",
        ],
        context: 'swamped は「沼にはまった」が語源で「忙しすぎて溺れそう」の意味。busy より切迫感がある。take on は「引き受ける」。jump in は「参加する」。英語は断るときも理由+代替案を出すのがマナー。',
        character: 'kenji', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: '了解です、やっておきます',
        english: [
            'Got it.',
            "Got it. I'll take care of it.",
            "Sure thing. I will get that done by end of day.",
            "Got it. I will take care of it. Should not take too long, maybe an hour or so. I will send you a message when it is done so you do not have to keep checking. If there is anything weird I will come find you before I finalize anything.",
        ],
        context: 'Got it は「了解」の最短形。Sure thing も「もちろん」のカジュアル版。take care of it は「やっておく/処理する」で万能。by end of day は「今日中に」。日本語の「了解です」の1語でここまで展開できるのが英語の面白さ。',
        character: 'yuki', category: 'request', month: '2026-05',
    },
    {
        daySlot: 32, japanese: 'ランチ一緒にどう？',
        english: [
            'Want to have lunch?',
            'Want to grab lunch together?',
            'Hey, want to grab lunch? There is a new place I want to try.',
            "Hey, are you free for lunch? There is this new ramen place that opened up around the corner and I have been wanting to try it all week. My treat if you are interested. I just do not want to eat at my desk again. I need to get out of this building for at least thirty minutes.",
        ],
        context: 'grab lunch は eat lunch よりカジュアルで「さくっとランチ行く」感。my treat は「おごるよ」。eat at my desk は「デスクでご飯」の悲しい現代あるある。around the corner は「すぐ近く」の便利フレーズ。',
        character: 'takeshi', category: 'request', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 33: ランチタイム (Lunch Break)
    // Scene: お昼に外へ食べに行く。注文からレストランでの会話まで。
    // ────────────────────────────────────────────────────

    {
        daySlot: 33, japanese: '日替わりランチください',
        english: [
            'The lunch special, please.',
            "I'll have the lunch special.",
            "I'll go with the lunch special. What comes with it?",
            "I think I will go with the lunch special today. What does it come with? Is it the soup and salad or just the salad? And can I swap the drink for an iced coffee instead? Sorry, I know I am being complicated.",
        ],
        context: 'lunch special が「日替わりランチ」。daily special も同じ。go with は「〜にする」で、take でもOKだけど go with のほうが口語的。What does it come with? は「何がついてくる？」のレストラン定番。',
        character: 'yuki', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: 'これ何が入ってますか？',
        english: [
            'What is in this?',
            "What's in this dish?",
            "Excuse me, what is in this? I am a little picky about certain ingredients.",
            "Sorry, could I ask what is in this? I am not allergic or anything, I just want to know before I order. Last time I ordered something without asking and it had cilantro in it and I just... I cannot do cilantro. It tastes like soap to me.",
        ],
        context: 'What is in this? はメニュー確認の基本。ingredients は「材料」だけど会話では what is in it で十分。cilantro（パクチー）のsoap taste ネタは英語圏で超有名。遺伝的に石鹸味に感じる人がいる。',
        character: 'mina', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: '大盛りにできますか？',
        english: [
            'Can I get a large?',
            'Can I get a bigger portion?',
            'Is it possible to get a larger portion? I am really hungry today.',
            "Is there any way I can get a bigger portion? Or like an extra serving of rice or something? I skipped breakfast this morning and I am absolutely starving. I know I am going to regret this in about an hour but right now I do not care.",
        ],
        context: '「大盛り」は英語に直訳がない。large portion, extra serving, supersize（ファストフード）など場面で変わる。Can I get extra...? が一番使いやすい。upsize は「サイズアップ」の意味で一部のチェーン店で通じる。',
        character: 'takeshi', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: 'お会計別々でお願いします',
        english: [
            'Separate checks, please.',
            'Can we get separate checks?',
            "Could we get separate checks? We're paying individually.",
            "Sorry, would it be possible to split the check? There are four of us and we all had different things so it would be easier to just pay separately. I know it is kind of annoying for you guys but I would really appreciate it.",
        ],
        context: 'separate checks が「別会計」。split the bill/check も同じ意味。日本では割り勘（split equally）が多いけど、欧米は各自が自分の分だけ払う separate checks が主流。文化の違いが出る場面。',
        character: 'kenji', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: 'テイクアウトできますか？',
        english: [
            'Can I get this to go?',
            "Can I get this to go, please?",
            "Actually, can I get mine to go? Something just came up at work.",
            "Hey, sorry, change of plans. Can I actually get mine to go instead? I just got a message from work and I need to head back. I hate to eat and run but you know how it is. I will make it up to you next time, I promise.",
        ],
        context: 'to go が「持ち帰り」のアメリカ英語。イギリスでは takeaway。日本語の「テイクアウト」は和製英語に近い。for here or to go? は店員の定番質問。eat and run は「食い逃げ」じゃなくて「食べてすぐ帰る」。',
        character: 'lisa', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: 'おすすめは何ですか？',
        english: [
            'What do you recommend?',
            "What's good here?",
            "What is good here? This is my first time so I have no idea what to get.",
            "This is my first time here so I have no idea what to order. What is good? Like, if you could only order one thing what would it be? I trust your judgment. I am not picky at all so literally anything works for me.",
        ],
        context: 'What is good here? は What do you recommend? よりカジュアルで店員にも友達にも使える万能フレーズ。if you could only order one thing は「1つだけ選ぶなら」で、本気のおすすめを引き出すテクニック。',
        character: 'yuki', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: 'ここ混んでるね',
        english: [
            'It is crowded.',
            "It's packed in here.",
            "Wow, it is packed. Should we wait or try somewhere else?",
            "Whoa, it is packed in here. I did not expect this on a weekday. The wait is probably going to be at least twenty minutes. Do you want to just wait it out or should we try that Thai place down the street? I am fine either way.",
        ],
        context: 'packed は crowded の口語版で「ぎゅうぎゅう」。jam-packed はさらに混んでる。wait it out は「我慢して待つ」。either way は「どっちでもいい」。日本語の「混んでる」1語に対して英語はレベル別に言い分ける。',
        character: 'takeshi', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: 'これ美味しい！',
        english: [
            'This is good!',
            'This is really good!',
            'Oh my god, this is so good. You have to try this.',
            "OK, this is incredible. Like, seriously. This might be the best pasta I have ever had and I am not even exaggerating. Here, try a bite. I am definitely coming back here. This place is going straight to my favorites list.",
        ],
        context: 'delicious は日本語の「デリシャス」のイメージほど使わない。ネイティブは so good, amazing, incredible を多用。You have to try this は「絶対食べて」の最強フレーズ。try a bite は「一口食べてみて」。',
        character: 'mina', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: 'お腹いっぱい',
        english: [
            'I am full.',
            "I'm so full.",
            "I am stuffed. I should not have ordered dessert too.",
            "I am absolutely stuffed. I cannot move. That was way too much food but I have zero regrets. OK, maybe one regret — the cheesecake. That was unnecessary. But it was right there on the menu and it was staring at me. What was I supposed to do, say no?",
        ],
        context: 'stuffed は full の強化版で「パンパン」。I am full より stuffed のほうがネイティブは圧倒的に使う。zero regrets / no regrets は「後悔なし」。What was I supposed to do? は言い訳の定番で、面白く使える。',
        character: 'takeshi', category: 'order', month: '2026-05',
    },
    {
        daySlot: 33, japanese: 'ここはカードは使えますか？',
        english: [
            'Do you take cards?',
            'Do you accept credit cards?',
            'Excuse me, do you accept credit cards? Or is it cash only?',
            "Do you take credit cards? I just realized I barely have any cash on me. I always forget to go to the ATM. If it is cash only there is a convenience store around the corner, right? I can run and grab some. Sorry about that.",
        ],
        context: 'Do you take...? が「〜使えますか？」のレストラン定番。accept はフォーマル、take がカジュアル。cash only は「現金のみ」。on me は「持ち合わせが」。日本はキャッシュレスが進んでるけど海外では現金必要な店もまだ多い。',
        character: 'kenji', category: 'order', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 34: 天気の話 (Weather Talk)
    // Scene: 居酒屋で雨の日。天気の話から盛り上がるいつもの夜。
    // ────────────────────────────────────────────────────

    {
        daySlot: 34, japanese: '今日めっちゃ暑くない？',
        english: [
            'It is so hot.',
            "It's so hot today, isn't it?",
            "Is it just me or is it insanely hot today? I am dying.",
            "Is it just me or is it absolutely insane out there? I walked from the station and by the time I got here I was drenched in sweat. Like, completely soaked. How is it this hot already? It is only May. We are not going to survive summer.",
        ],
        context: 'Is it just me or...? は「私だけ？」で会話を始める最高のフレーズ。insanely は「異常に」。drenched in sweat は「汗でびしょ濡れ」。日本語の「暑くない？」の同意を求める形は英語でも is it just me で再現できる。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: '傘持ってくればよかった',
        english: [
            'I should have brought an umbrella.',
            "I should've brought my umbrella.",
            "I should have brought my umbrella. I got completely soaked on the way here.",
            "I should have brought an umbrella. The forecast said it was going to be fine but then it just started pouring out of nowhere. I am literally dripping right now. My shoes are making that squeaky noise every time I take a step. Very embarrassing.",
        ],
        context: 'should have + 過去分詞 は「〜すればよかった」の後悔表現。超重要文法。pouring は「土砂降り」。out of nowhere は「突然」。squeaky は「キュッキュ」の擬音語。英語の擬音は形容詞として使えるのが日本語との違い。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: '梅雨がもうすぐ来るよね',
        english: [
            'Rainy season is coming.',
            'The rainy season is almost here.',
            'The rainy season is just around the corner. I already hate it.',
            "The rainy season is right around the corner and I am already dreading it. Like, a solid month of just gray skies and humidity. My hair goes completely insane. And everything smells a little musty. The only good thing is the hydrangeas. Those are actually really pretty.",
        ],
        context: '梅雨は英語で rainy season。monsoon season とも言うけど日本の梅雨は rainy season が一般的。right around the corner は「もうすぐ」の口語表現。dread は「嫌で怖い」。英語には「梅雨」にぴったりの1語がない。文化の穴。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: '天気予報ハズレたね',
        english: [
            'The forecast was wrong.',
            'The weather forecast was totally off.',
            'The forecast said it would be sunny but look at this. Totally wrong.',
            "Can you believe the forecast? It said sunny all day. Sunny! And what do we get? Rain. Every single time I trust the weather app I get burned. I should just start looking out the window like a normal person instead of checking three different apps.",
        ],
        context: 'forecast was off/wrong が「予報ハズレ」。off は「ズレてる」の感覚で超万能。get burned は「痛い目にあう」の比喩。日本語の「ハズレた」は英語で wrong, off, inaccurate と言えるけど、会話なら off が一番カジュアル。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: 'いい天気だから外で食べない？',
        english: [
            'Nice weather. Eat outside?',
            "It's so nice out. Want to eat outside?",
            "The weather is gorgeous today. Should we eat outside for a change?",
            "It is so nice out today. We should eat outside. When was the last time we did that? It feels like it has been raining forever. Let us grab a bench in the park or something. I will get us some drinks from the convenience store on the way.",
        ],
        context: 'nice out は「外がいい天気」の超カジュアル表現。gorgeous は beautiful よりテンション高い。for a change は「たまには」の便利フレーズ。Let us が会話では Let us ではなく実際は短縮して使われる。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: '風がすごいね',
        english: [
            'It is so windy.',
            "It's really windy out there.",
            "It is crazy windy today. My hair is a mess.",
            "The wind today is ridiculous. I could barely walk in a straight line on the way here. My umbrella flipped inside out twice. Twice! I just gave up and closed it. At that point I was already wet so what is the difference. The wind won.",
        ],
        context: 'windy は「風が強い」。breezy は「そよ風程度」。flipped inside out は「裏返しになった」で傘が壊れるあるある。the wind won は「風に負けた」の擬人化ユーモア。英語は天候を擬人化するのが好き。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: '日焼け止め塗った？',
        english: [
            'Did you put on sunscreen?',
            'Did you put sunscreen on?',
            "Did you put sunscreen on? You are going to burn. Trust me.",
            "Did you put sunscreen on? Because you are going to regret it if you did not. Last summer I went to the beach without any and I looked like a lobster for a week. A literal lobster. My friends still bring it up. SPF 50 minimum, that is my rule now.",
        ],
        context: 'put on sunscreen が「日焼け止めを塗る」。apply は固い。looked like a lobster は「ロブスターみたいに真っ赤」のネイティブ定番ジョーク。SPF は Sun Protection Factor。英語圏は日焼けに対してかなり気をつける文化。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: '台風来るらしいよ',
        english: [
            'A typhoon is coming.',
            "I heard a typhoon is coming.",
            "Apparently there is a typhoon coming this weekend. Better stock up.",
            "I saw on the news that there is a typhoon heading our way this weekend. Probably should stock up on water and snacks just in case. Remember the last one? The power went out for like eight hours and I had nothing to eat. I just sat there in the dark with my phone at twelve percent.",
        ],
        context: 'apparently は「どうやら」「らしい」にぴったり。stock up は「買いだめする」。heading our way は「こっちに向かってる」。英語では typhoon は西太平洋、hurricane は大西洋、cyclone はインド洋。場所で名前が変わる。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: '最近の気候おかしくない？',
        english: [
            'The weather has been strange.',
            "The weather has been really weird lately.",
            "Is it me or has the weather been really weird lately? It does not feel normal.",
            "Has the weather been getting weirder or is it just me? Like, it was freezing last week and now it is thirty degrees. Pick a lane, Mother Nature. I feel like the seasons do not even make sense anymore. Spring lasted about three days this year.",
        ],
        context: 'Pick a lane は「どっちかにしてくれ」のスラング。Mother Nature は「大自然」の擬人化。lasted about three days は「3日しかなかった」の誇張。日本語の「おかしくない？」の共感を求める感覚は Has it been...? で出せる。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 34, japanese: '洗濯物干しっぱなしだった',
        english: [
            'I left my laundry out.',
            "I left my laundry hanging outside.",
            "I left my laundry out to dry and now it is raining. Great.",
            "I just realized I left all my laundry hanging outside. And it has been raining for the last two hours. So that is basically a waste of an entire wash cycle. I am going to have to do it all over again. This is what I get for not checking the forecast. Lesson learned.",
        ],
        context: 'left ... out は「出しっぱなし」。hanging outside は「外に干してある」。do it all over again は「全部やり直し」。lesson learned は「教訓を得た」だけどネイティブは自嘲的に使う。日本語の「〜しっぱなし」は left ... で再現できる。',
        character: 'yuki', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 35: 予定を立てる (Making Plans)
    // Scene: 週末の予定をみんなで相談。ドタバタのスケジュール調整。
    // ────────────────────────────────────────────────────

    {
        daySlot: 35, japanese: '今週末ヒマ？',
        english: [
            'Are you free this weekend?',
            'You free this weekend?',
            'Hey, are you free this weekend? I was thinking we could do something.',
            "Hey, are you free this weekend? I do not have any plans for once and I was thinking we could actually do something. We keep saying we should hang out more and then never actually do it. So what do you say? Saturday or Sunday work for you?",
        ],
        context: 'Are you free? が「ヒマ？」の定番。You free? は主語を省いた超カジュアル版。We keep saying は「いつも言ってるけど」。What do you say? は「どう思う？」の提案フレーズ。work for you は「都合がいい」。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: 'ちょっと予定入ってるかも',
        english: [
            'I might be busy.',
            "I might have something. Let me check.",
            "I think I might have something that day. Let me check my calendar real quick.",
            "Hmm, I think I might have something. Let me check... Yeah, I have a dentist appointment in the morning but I should be free after like two. Does afternoon work? Or we could push it to Sunday if that is easier. I am flexible either way.",
        ],
        context: 'might have something は「予定入ってるかも」の曖昧表現。日本語の「ちょっと...」のぼかし方と同じニュアンス。Let me check は「確認させて」。flexible は「融通がきく」。either way は「どっちでも」。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: '何時に待ち合わせる？',
        english: [
            'What time should we meet?',
            'What time works for you?',
            'What time should we meet up? And where do you want to meet?',
            "What time works for you? I am fine with whenever honestly. Just not too early because you know me and mornings. How about we say around noon? We could meet at the station and figure it out from there. Sound good?",
        ],
        context: 'meet up は meet よりカジュアルで友達同士向き。What time works? は「何時がいい？」で仕事にもプライベートにも使える。figure it out from there は「そこから決める」。Sound good? は「いい感じ？」の確認。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: 'ドタキャンしないでよ',
        english: [
            'Do not cancel on me.',
            "You better not cancel on me.",
            "You better not flake on me this time. You always do this.",
            "You better not flake on me again. Last time you said you were coming and then two hours before you sent me that text like, oh sorry something came up. Something always comes up with you. I swear if you bail this time I am never making plans with you again. I mean it.",
        ],
        context: 'flake (on) は「ドタキャンする」のスラング。bail も同じ意味。cancel on me は少しフォーマル。something came up は「急用ができた」でドタキャンの定番言い訳。日本語の「ドタキャン」は英語に1語の等価がなく、flake が一番近い。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: '予約しておこうか？',
        english: [
            'Should I book it?',
            'Should I make a reservation?',
            'Want me to make a reservation? It might be busy on Saturday.',
            "Should I make a reservation just in case? It is a Saturday night so it is probably going to be packed. Last time we tried to go without one we ended up waiting forty-five minutes. I can call right now if you want. Or I will just do it on the app, it takes like thirty seconds.",
        ],
        context: 'make a reservation が「予約する」の基本。book も同じ。just in case は「念のため」の超頻出フレーズ。ended up は「結局〜になった」。日本語の「しておこうか？」の提案ニュアンスは Should I...? / Want me to...? で出す。',
        character: 'lisa', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: 'どこにする？',
        english: [
            'Where should we go?',
            'Where do you want to go?',
            'Where should we go? I am up for anything honestly.',
            "Where do you want to go? I am honestly up for anything. We could do dinner and then maybe catch a movie if we feel like it. Or we could just walk around Shibuya and see what happens. I kind of prefer not having a strict plan. More fun that way.",
        ],
        context: 'up for anything は「何でもいいよ」の超便利表現。catch a movie は「映画を観る」のカジュアル版。see what happens は「成り行きに任せる」。strict plan は「きっちりした予定」。英語は計画を緩くする表現が豊富。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: 'また今度にしよう',
        english: [
            'Maybe next time.',
            "Let's do it another time.",
            "Let us do it another time. I really want to but this week is just crazy.",
            "I really want to go but I just cannot this weekend. Work has been insane and I need at least one day to just do nothing. Can we push it to next weekend? I promise I will not bail. We can lock it in right now. Put it in the calendar and everything.",
        ],
        context: 'another time は「また今度」。rain check は「延期の約束」で、もともと雨で中止になった野球チケットの再発行から来た表現。lock it in は「確定させる」。日本語の「また今度」は曖昧だけど英語でも同じ使い方ができる。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: '楽しみにしてる！',
        english: [
            'I am looking forward to it.',
            "I'm looking forward to it!",
            "I am so looking forward to this weekend. It has been a while since we hung out.",
            "I am so looking forward to it. Seriously, I have been counting down the days. It feels like forever since we all got together. I already know I am going to eat too much and stay out too late but honestly that is exactly what I need right now.",
        ],
        context: 'look forward to は「楽しみにする」の定番中の定番。to の後は名詞か動名詞（looking forward to seeing you）。I am so looking forward to it の so が感情を強調。counting down the days は「指折り数えて待ってる」。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: '何人来るの？',
        english: [
            'How many people?',
            'How many people are coming?',
            'How many people are coming? Just so I know how big a table we need.',
            "How many people are we looking at? I want to make sure we get a table that is big enough. Last time we were crammed into that tiny booth and I could barely move my arms to eat. If it is more than six maybe we should look for a place with a private room or something.",
        ],
        context: 'How many people are coming? が「何人来るの？」の直球。we are looking at は「見込み」を聞くビジネスでも使える表現。crammed は「詰め込まれた」。booth はファミレスなどの仕切りのある席。private room は「個室」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 35, japanese: '場所はあとで送るね',
        english: [
            'I will send the location later.',
            "I'll send you the location later.",
            "I'll text you the address later. Or I'll just drop a pin.",
            "I will send you the details later tonight. I will drop a pin on the group chat so everyone knows exactly where to go. The place is kind of hidden so you might walk right past it. Look for a small sign on the second floor. I almost missed it the first time I went.",
        ],
        context: 'drop a pin は「ピンを落とす」=地図の位置情報を共有する現代表現。text you は「LINEする/メッセする」。group chat は「グループチャット」。kind of hidden は「ちょっとわかりにくい」。walk right past は「気づかず通り過ぎる」。',
        character: 'lisa', category: 'social', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 36: 体調の話 (Health & Body)
    // Scene: 居酒屋で「最近どう？」から体調トークへ。健康あるある。
    // ────────────────────────────────────────────────────

    {
        daySlot: 36, japanese: 'ちょっと風邪気味かも',
        english: [
            'I think I have a cold.',
            "I think I'm coming down with something.",
            "I think I might be coming down with something. My throat has been scratchy all day.",
            "I think I might be coming down with something. My throat has been a little scratchy since this morning and I am starting to get that heavy feeling in my head. You know that stage where you are not sick yet but you just know it is coming? I am right there. I need to go home and just sleep for twelve hours.",
        ],
        context: 'coming down with something は「何かの病気になりかけてる」の定番表現。something を使うことで何の病気かわからない曖昧さを出す。scratchy は「イガイガする」。日本語の「風邪気味」のちょうど半分くらいの感覚が coming down with。',
        character: 'yuki', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: '肩こりがひどい',
        english: [
            'My shoulders are stiff.',
            'My shoulders are killing me.',
            'My shoulders are killing me. I need a massage or something.',
            "My shoulders are absolutely killing me. I have been sitting at my desk for like ten hours straight and I can barely turn my neck. I think I need one of those ergonomic chairs or something. Or maybe I just need to stop hunching over my laptop like a goblin.",
        ],
        context: '肩こりは英語圏の人にはピンと来ない概念。stiff shoulders / tense shoulders で通じるけど、killing me が「痛くてたまらない」の最強表現。hunching over は「前かがみになる」。like a goblin は自虐のユーモア。',
        character: 'kenji', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: '最近運動してないなあ',
        english: [
            'I have not exercised recently.',
            "I haven't worked out in ages.",
            "I have not worked out in forever. I really need to get back into it.",
            "I have not worked out in I do not even know how long. Months? I keep saying I am going to start going to the gym again but then Monday comes and I am like, eh, next week. It is a vicious cycle. My gym membership is just a monthly donation at this point.",
        ],
        context: 'work out は exercise よりカジュアルで日常会話向き。in ages / in forever は「ずっとしてない」の大げさ表現。vicious cycle は「悪循環」。monthly donation は「毎月の寄付」= 使ってないのにお金だけ払ってるジョーク。',
        character: 'takeshi', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: '目が疲れてる',
        english: [
            'My eyes are tired.',
            'My eyes are so tired.',
            'My eyes are so strained. I have been staring at screens all day.',
            "My eyes are completely fried. I have been looking at screens for like twelve hours today — laptop, phone, tablet, repeat. I tried that twenty-twenty-twenty rule where you look at something far away every twenty minutes but I forgot after the first time. I think I need blue light glasses.",
        ],
        context: 'strained は「酷使された」。fried は「やられた」のスラング。the 20-20-20 rule は目の疲れ対策のルール（20分ごとに20フィート先を20秒見る）。英語圏ではblue light glasses が流行中。日本語の「目が疲れた」は my eyes are tired でOK。',
        character: 'mina', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: '昨日飲みすぎた',
        english: [
            'I drank too much yesterday.',
            "I had way too much to drink last night.",
            "I had way too much last night. I woke up with a terrible headache.",
            "I had way too much last night and I am paying for it today. Woke up with the worst headache and I could not even look at food until like two in the afternoon. I kept telling myself I was going to stop after three drinks but then someone ordered another round and... here we are.",
        ],
        context: 'paying for it は「そのツケが来てる」のネイティブ表現。had way too much は「飲みすぎた」で drink を省略するのが自然。another round は「もう一杯ずつ」。日本語の「飲みすぎた」は I drank too much でも通じるけど had too much が口語的。',
        character: 'takeshi', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: '最近よく眠れない',
        english: [
            'I cannot sleep well.',
            "I haven't been sleeping well lately.",
            "I have not been sleeping well at all lately. I keep waking up in the middle of the night.",
            "I have not been sleeping well at all lately. I fall asleep fine but then I wake up at like three in the morning and I just lie there for hours. My brain starts thinking about every embarrassing thing I have ever done. Why does it do that? By the time I actually feel sleepy again it is time to get up.",
        ],
        context: 'have not been sleeping well は現在完了進行形で「最近ずっと」のニュアンス。lie there は「横になったまま」。英語の3 AM brain は世界共通の悩み。embarrassing things は「恥ずかしいこと」。fall asleep は「寝付く」。',
        character: 'yuki', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: '花粉症がつらい',
        english: [
            'My allergies are bad.',
            'My hay fever is terrible.',
            'My hay fever is killing me this year. I cannot stop sneezing.',
            "My hay fever is out of control this year. I go through an entire box of tissues every day. My eyes are itchy, my nose is running nonstop, and I sneeze like fifteen times in a row. The medicine helps a little but it also makes me drowsy so I am basically a zombie either way.",
        ],
        context: 'hay fever は花粉症。allergies でもOK。out of control は「制御不能」。go through は「使い切る」。in a row は「連続で」。either way は「どっちにしろ」。花粉症は日本特有と思われがちだけど英語圏にもある。',
        character: 'kenji', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: '腰が痛い',
        english: [
            'My back hurts.',
            'I have a sore back.',
            'My lower back has been killing me. I think I need to see someone about it.',
            "My lower back has been acting up again. It started a couple of days ago and it just will not go away. I tried stretching, I tried a hot bath, nothing works. I am probably going to have to see a doctor or a chiropractor or something. Getting old is not for the weak.",
        ],
        context: 'lower back は「腰」。英語には「腰」の1語がなく、waist は「ウエスト」、hip は「骨盤」、lower back は「腰の背面」と分かれる。acting up は「調子が悪い」。Getting old is not for the weak は年齢ネタの定番ジョーク。',
        character: 'master', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: 'ストレスで食べすぎちゃう',
        english: [
            'I eat too much when stressed.',
            'I stress-eat a lot.',
            'I totally stress-eat. When work is bad I just keep snacking.',
            "I am such a stress eater. The worse my day is the more I eat. Like, if I had a bad meeting I will go straight to the convenience store and buy three different kinds of chocolate. It is not even hunger, it is just my brain going, you deserve this. And honestly? Maybe I do.",
        ],
        context: 'stress-eat は「ストレスで食べる」の1語動詞。英語はハイフンで新語を作るのが好き。comfort food は「心が安らぐ食べ物」。you deserve this は「自分へのご褒美」の正当化。日本語の「食べすぎちゃう」の「ちゃう」のニュアンスは英語で出しにくい。',
        character: 'mina', category: 'feeling', month: '2026-05',
    },
    {
        daySlot: 36, japanese: '無理しないでね',
        english: [
            'Take it easy.',
            "Don't push yourself too hard.",
            "Do not push yourself too hard, OK? You need to rest.",
            "Seriously, do not push yourself. I know you want to power through but sometimes you just need to stop and let your body recover. Take a day off if you need to. The work will still be there tomorrow. You are not going to be any use to anyone if you burn yourself out.",
        ],
        context: 'Take it easy は「無理しないで」の万能フレーズ。push yourself は「無理する」。power through は「耐えて乗り越える」。burn yourself out は「燃え尽きる」。日本語の「無理しないで」は英語で一番伝えたい気持ちなのに直訳しにくい。Take it easy が最適解。',
        character: 'lisa', category: 'feeling', month: '2026-05',
    },

    // ────────────────────────────────────────────────────
    // DAY 37: 趣味の話 (Hobbies & Interests)
    // Scene: 居酒屋で「休みの日何してる？」から趣味バトル。意外な趣味が発覚。
    // ────────────────────────────────────────────────────

    {
        daySlot: 37, japanese: '休みの日は何してるの？',
        english: [
            'What do you do on your days off?',
            'What do you usually do on your days off?',
            'What do you do on your days off? I feel like I always just end up doing nothing.',
            "What do you usually do on your days off? I always tell myself I am going to do something productive but then I just end up watching YouTube for six hours. By the time I realize it the whole day is gone and I have accomplished absolutely nothing. It is a talent, honestly.",
        ],
        context: 'days off が「休みの日」。off day は「調子の悪い日」で意味が変わるので注意。end up doing は「結局〜してしまう」の超重要フレーズ。accomplished nothing は「何も成し遂げなかった」。It is a talent は皮肉の自虐。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: '最近ハマってることある？',
        english: [
            'Any hobbies?',
            "What are you into these days?",
            "What are you into these days? Anything new you have been obsessed with?",
            "What are you into these days? I feel like everyone has that one thing they get totally obsessed with for like three months and then move on to something completely different. Last month for me it was making sourdough bread. This month it is probably going to be something else entirely.",
        ],
        context: 'be into は「ハマっている」の最もカジュアルな表現。obsessed with はもっと強い。move on to は「次に移る」。日本語の「ハマる」には into, obsessed, hooked, addicted など段階があるけど into が一番使いやすい。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: '映画よく観るよ',
        english: [
            'I watch movies a lot.',
            'I watch a lot of movies.',
            'I am a big movie person. I try to watch at least one a week.',
            "I am a huge movie person. I try to watch at least one or two a week. I have this rule where I alternate between something new and a classic I have never seen. Right now I am going through all the Kurosawa films. I know, I know, I should have watched them a long time ago.",
        ],
        context: 'a big ... person は「〜が好きな人」（a big coffee person, a big movie person）。alternate between は「交互にする」。I should have watched は「もっと前に観ておくべきだった」の should have。go through は「順番に全部観る」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: '写真撮るのが好き',
        english: [
            'I like taking photos.',
            "I'm really into photography.",
            "I am really into photography. Mostly street photography around the city.",
            "I am really into photography lately. Nothing professional or anything, just my phone. I love walking around the city and capturing random moments. Like, the way the light hits a building at sunset, or some old guy feeding pigeons in the park. I post them on Instagram sometimes but mostly I just keep them for myself.",
        ],
        context: 'be into photography は「写真にハマってる」。capturing moments は「瞬間を切り取る」の写真用語。nothing professional は「プロじゃないけど」の謙遜。for myself は「自分用に」。日本語の「撮る」は take だけど、capture のほうが趣味感が出る。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: 'ゲームするよ、結構ガチで',
        english: [
            'I play games.',
            'I play video games. Pretty seriously, actually.',
            'I am a gamer, not going to lie. I play like every day after work.',
            "I play video games pretty seriously, not going to lie. Like, I am not just casually playing on my phone. I have a whole setup at home — big monitor, gaming chair, headset, the works. I know it sounds nerdy but it is honestly the best way to unwind after a long day. Plus I have made some good friends online through it.",
        ],
        context: 'not going to lie は「正直に言うと」のカジュアル表現。the works は「一式全部」。setup は「環境」。nerdy は「オタクっぽい」だけど英語では今やポジティブ寄り。unwind は「リラックスする」。gaming はもう恥ずかしいものじゃない文化。',
        character: 'takeshi', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: '読書が一番の趣味',
        english: [
            'I love reading.',
            'Reading is my favorite hobby.',
            'Reading is probably my number one hobby. I always have a book on me.',
            "Reading is honestly my favorite thing to do. I always have a book in my bag. Right now I am reading this mystery novel and I literally cannot put it down. I stayed up until two in the morning last night because I kept telling myself, just one more chapter. That is a lie I tell myself every single time.",
        ],
        context: 'cannot put it down は「面白くて止められない」の本・映画の定番表現。just one more chapter は「あと1章だけ」。number one は「一番の」のカジュアル版。on me は「持ち歩いている」。日本語の「趣味は読書」より英語のほうが語り方が情熱的。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: '料理するのが意外と好き',
        english: [
            'I actually like cooking.',
            'I actually really enjoy cooking.',
            'I have gotten into cooking recently. It is surprisingly relaxing.',
            "I actually really enjoy cooking. I know, I do not look like the type, right? But I started during the pandemic when there was nothing else to do and I kind of got hooked. I can make a pretty solid carbonara now. Nothing fancy, but my friends say it is good and they are not the type to lie just to be nice.",
        ],
        context: 'got hooked は「ハマった」。hook は「釣り針」で、引っかかった=ハマったの比喩。surprisingly は「意外にも」。I do not look like the type は「そういうタイプに見えない」の自虐。not the type to lie は「お世辞を言わないタイプ」。',
        character: 'kenji', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: 'カフェ巡りが好き',
        english: [
            'I like visiting cafes.',
            'I love cafe hopping.',
            'I am into cafe hopping. I try a new place almost every weekend.',
            "I love cafe hopping. Like, finding cute little hidden cafes is kind of my thing. I have a whole list on my phone of places I want to try. Some of them are in the middle of nowhere but that is part of the fun. The coffee does not even have to be amazing. I just love the atmosphere and taking my time.",
        ],
        context: 'cafe hopping は「カフェ巡り」。bar hopping（はしご酒）と同じ構造。my thing は「私の趣味/好きなこと」。in the middle of nowhere は「辺鄙な場所」。taking my time は「ゆっくりする」。英語は hopping で「あちこち回る」を1語で表現できる。',
        character: 'mina', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: '昔はバンドやってた',
        english: [
            'I used to be in a band.',
            "I was in a band back in the day.",
            "I was in a band when I was in college. Guitar, believe it or not.",
            "I was in a band back in college. Played guitar. We were terrible but we thought we were amazing, which is kind of the best part of being young, right? We played a few small shows and once we had an audience of like seven people and we acted like we were playing a stadium. Good times.",
        ],
        context: 'back in the day は「昔は」のノスタルジー表現。believe it or not は「信じられないかもだけど」。Good times は「いい思い出だった」で過去を振り返る定番。日本語の「やってた」は used to do で完璧に表現できる。',
        character: 'master', category: 'social', month: '2026-05',
    },
    {
        daySlot: 37, japanese: '何か始めたいんだよね',
        english: [
            'I want to start something.',
            'I want to pick up a new hobby.',
            'I want to pick up something new. I just do not know what yet.',
            "I have been wanting to start something new for a while now but I just cannot decide what. I thought about yoga but that seems too calm for me. I looked at rock climbing but I am scared of heights. Maybe pottery? That seems cool. I just need something where I can turn my brain off for a couple of hours.",
        ],
        context: 'pick up は趣味を「始める」の定番。start でもいいけど pick up は「手に取る」イメージでカジュアル。turn my brain off は「頭を空っぽにする」。scared of heights は「高所恐怖症」。日本語の「何か始めたい」の漠然とした感覚は I want to pick up something new で完璧。',
        character: 'yuki', category: 'social', month: '2026-05',
    },
];

// ============================================================
// WEEK 5 DAY THEMES
// ============================================================

export const MONTH2_W5_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    31: {
        title: '朝の会話', titleEn: 'Morning Routines', category: 'social',
        scene: 'ユキが朝のルーティンについて話す。みんな朝型か夜型かで盛り上がる。',
        keywords: [
            { en: 'oversleep', ja: '寝坊する', pron: 'オーバースリープ', example: 'I totally overslept this morning.', note: 'over+sleep=寝すぎ。英語は over- をつけるだけで「〜しすぎ」になる便利接頭辞。' },
            { en: 'commute', ja: '通勤', pron: 'コミュート', example: 'My commute is about an hour.', note: '名詞でも動詞でも使える。commuter=通勤者。日本のラッシュは英語圏でも有名。' },
            { en: 'snooze', ja: 'スヌーズ', pron: 'スヌーズ', example: 'I kept hitting snooze.', note: 'hit snooze=スヌーズボタンを押す。you snooze, you lose=ぼーっとしてると負けるよ。' },
            { en: 'routine', ja: 'ルーティン', pron: 'ルーティーン', example: 'My morning routine takes about an hour.', note: '発音は「ルーティーン」で日本語の「ルーティン」より伸ばす。daily routine=日課。' },
            { en: 'function', ja: '機能する・まともに動く', pron: 'ファンクション', example: "I can't function without coffee.", note: '人に使うと「まともに動けない」のユーモア表現。IT用語と同じ語源。' },
        ],
    },
    32: {
        title: '仕事の英語', titleEn: 'Workplace Basics', category: 'request',
        scene: 'ケンジが職場の英語あるあるを語る。外国人の同僚とのやりとり。',
        keywords: [
            { en: 'deadline', ja: '締め切り', pron: 'デッドライン', example: 'When is this due?', note: 'dead+line=死の線。超えたら死ぬ線。due は「期限が来る」でdeadlineより柔らかい。' },
            { en: 'swamped', ja: '忙殺されてる', pron: 'スワンプト', example: "I'm swamped right now.", note: 'swamp=沼。沼にはまったように身動き取れない忙しさ。busyの上位互換。' },
            { en: 'follow up', ja: 'フォローする', pron: 'フォローアップ', example: "I'll follow up on that.", note: '日本語の「フォロー」と違う。英語は「追いかけて確認する」の意味。follow-up email=確認メール。' },
            { en: 'remote', ja: 'リモート・遠隔', pron: 'リモート', example: "I'm working remotely today.", note: 'work from home (WFH) とほぼ同義。コロナ後に世界中で定着した単語。' },
            { en: 'double-check', ja: '再確認する', pron: 'ダブルチェック', example: 'Let me double-check that.', note: '1回のcheckでも使えるけど、double-checkで「念のためもう1回」の安心感。' },
        ],
    },
    33: {
        title: 'ランチタイム', titleEn: 'Lunch Break', category: 'order',
        scene: 'お昼に外へ食べに行く。注文からレストランでの会話まで。',
        keywords: [
            { en: 'special', ja: '日替わり・特別メニュー', pron: 'スペシャル', example: "I'll have the lunch special.", note: 'daily special, lunch special=日替わり。お得感のある限定メニューを指す。' },
            { en: 'packed', ja: '混んでいる', pron: 'パックト', example: "It's packed in here.", note: 'crowdedのカジュアル版。pack=詰め込む→packed=ぎゅうぎゅう。jam-packedはさらに上。' },
            { en: 'to go', ja: '持ち帰り', pron: 'トゥーゴー', example: 'Can I get this to go?', note: 'アメリカ英語。イギリスではtakeaway。for here or to go?は店員の定番質問。' },
            { en: 'stuffed', ja: 'お腹いっぱい', pron: 'スタッフト', example: 'I am absolutely stuffed.', note: 'fullの3倍の満腹感。stuff=詰め込む→stuffed=パンパン。クリスマスの七面鳥もstuffed。' },
            { en: 'split', ja: '割り勘にする', pron: 'スプリット', example: 'Should we split the check?', note: 'split=割る。割り勘=split the bill/check。go Dutch は古い言い方で失礼になることも。' },
        ],
    },
    34: {
        title: '天気の話', titleEn: 'Weather Talk', category: 'social',
        scene: '居酒屋で雨の日。天気の話から盛り上がるいつもの夜。',
        keywords: [
            { en: 'forecast', ja: '天気予報', pron: 'フォーキャスト', example: 'The forecast was totally off.', note: 'fore(前もって)+cast(投げる)=予測。weather forecast=天気予報。off=外れて。' },
            { en: 'pouring', ja: '土砂降り', pron: 'ポーリング', example: 'It started pouring out of nowhere.', note: 'rain < pour < downpour。「バケツをひっくり返したような雨」に相当する表現。' },
            { en: 'gorgeous', ja: 'とても綺麗な', pron: 'ゴージャス', example: 'The weather is gorgeous today.', note: '天気にも人にも使える最上級の褒め言葉。beautifulよりテンション高め。' },
            { en: 'apparently', ja: 'どうやら・らしい', pron: 'アパレントリー', example: 'Apparently there is a typhoon coming.', note: '「〜らしいよ」にドンピシャ。伝聞情報を伝えるときの万能副詞。' },
            { en: 'drenched', ja: 'びしょ濡れ', pron: 'ドレンチト', example: 'I got completely drenched.', note: 'wet < soaked < drenched。drenchedが「もうこれ以上濡れようがない」レベル。' },
        ],
    },
    35: {
        title: '予定を立てる', titleEn: 'Making Plans', category: 'social',
        scene: '週末の予定をみんなで相談。ドタバタのスケジュール調整。',
        keywords: [
            { en: 'reservation', ja: '予約', pron: 'レザベーション', example: 'Should I make a reservation?', note: 'レストラン=reservation、ホテル=booking/reservationどちらもOK。makeで「取る」。' },
            { en: 'flexible', ja: '融通がきく', pron: 'フレキシブル', example: "I'm flexible either way.", note: '時間・場所・条件すべてに使える。I am flexible=「合わせるよ」の万能フレーズ。' },
            { en: 'flake', ja: 'ドタキャンする', pron: 'フレイク', example: "You better not flake on me.", note: 'flake=薄い破片→すぐ崩れる→約束を破る人。flakyは「当てにならない」。' },
            { en: 'pin', ja: 'ピン・位置情報', pron: 'ピン', example: "I'll drop a pin on the map.", note: 'drop a pin=地図にピンを落とす。現代の「場所を教える」は地図アプリのpin共有。' },
            { en: 'bail', ja: 'ドタキャンする・逃げる', pron: 'ベイル', example: "If you bail, I'll never forgive you.", note: 'bail=保釈金→逃げる→約束から逃げる。bail on someone=誰かとの約束をすっぽかす。' },
        ],
    },
    36: {
        title: '体調の話', titleEn: 'Health & Body', category: 'feeling',
        scene: '居酒屋で「最近どう？」から体調トークへ。健康あるある。',
        keywords: [
            { en: 'stiff', ja: '凝っている・硬い', pron: 'スティフ', example: 'My shoulders are really stiff.', note: '筋肉が凝った=stiff。stiff neck=首の凝り。英語に「肩こり」の1語はない。' },
            { en: 'exhausted', ja: 'へとへと', pron: 'イグゾーステッド', example: 'I am absolutely exhausted.', note: 'tired×3=exhausted。tiredの最上級。wiped out, dead tiredも同義。' },
            { en: 'scratchy', ja: 'イガイガする', pron: 'スクラッチー', example: 'My throat has been scratchy all day.', note: 'scratch(引っかく)+y=イガイガ。風邪のひき始めの喉の違和感にぴったり。' },
            { en: 'drowsy', ja: '眠い・ぼんやり', pron: 'ドラウジー', example: 'The medicine makes me drowsy.', note: 'sleepyは自然な眠気。drowsyは薬の副作用など不本意な眠気。薬の注意書きに必ず出る。' },
            { en: 'burn out', ja: '燃え尽きる', pron: 'バーンアウト', example: "Don't burn yourself out.", note: '働きすぎて燃え尽きる=burn out。burnout(名詞)は現代の社会問題。WHO公認の症候群。' },
        ],
    },
    37: {
        title: '趣味の話', titleEn: 'Hobbies & Interests', category: 'social',
        scene: '居酒屋で「休みの日何してる？」から趣味バトル。意外な趣味が発覚。',
        keywords: [
            { en: 'hooked', ja: 'ハマった', pron: 'フックト', example: 'I kind of got hooked on cooking.', note: 'hook=釣り針。引っかかった=ハマった。get hooked on...で「〜にハマる」。' },
            { en: 'into', ja: '〜にハマっている', pron: 'イントゥ', example: "I'm really into photography.", note: '趣味を語る最頻出表現。What are you into?=何にハマってる？カジュアルさ最強。' },
            { en: 'unwind', ja: 'リラックスする', pron: 'アンワインド', example: 'Gaming is how I unwind after work.', note: 'wind(巻く)のun(解く)=緊張をほぐす。relaxよりちょっとオシャレ。' },
            { en: 'obsessed', ja: '夢中になっている', pron: 'オブセスト', example: "I've been obsessed with this show.", note: 'intoの最上級。obsessedは「取り憑かれたように」のレベル。ポジティブにも使える。' },
            { en: 'pick up', ja: '（趣味を）始める', pron: 'ピックアップ', example: 'I want to pick up a new hobby.', note: '手に取る→始める。pick up a language=語学を始める。startよりカジュアル。' },
        ],
    },
};
