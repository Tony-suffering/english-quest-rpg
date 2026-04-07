/**
 * 365 English Master -- Month 3 Week 9: 人間関係の英語 (Talking About People)
 * Days 61-67: 70 expressions
 * Month: June 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 3 (2026-06) -- WEEK 9
// ============================================================

export const MONTH3_W9_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 61: 人を紹介する (Introducing Someone)
    // Scene: ユキが居酒屋に外国人の同僚を連れてくる。マスターが英語で歓迎する
    // ────────────────────────────────────────────────────

    {
        daySlot: 61, japanese: '紹介したい人がいるんだけど',
        english: [
            'I want you to meet someone.',
            'There is someone I would really like you to meet.',
            'Hey everyone, there is someone I have been wanting you guys to meet.',
            "Oh awesome, bring 'em over! We've always got room for one more.",
        ],
        context: '日本語の「紹介したい人がいる」をそのまま訳すとI want to introduce someoneだけど、英語ではI want you to meetの方が圧倒的に自然。introduceは司会者とかフォーマルな場で使う単語。居酒屋ならmeetで十分。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: 'いらっしゃい、ここは気楽にやってくれ',
        english: [
            'Welcome, make yourself at home.',
            'Welcome! Just relax and make yourself at home.',
            'Welcome to our little spot! Just grab a seat and make yourself comfortable.',
            "Thank you so much! This place already feels super cozy. I love it.",
        ],
        context: 'make yourself at home は直訳すると「自分の家のように」。日本語の「くつろいでね」に近いけど、英語の方がもっとカジュアル。grab a seat は「座って」のくだけた言い方。take a seatより断然カジュアル。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: 'はじめまして、ユキからいつも話聞いてます',
        english: [
            'Nice to meet you. I have heard about you.',
            'Nice to meet you! Yuki talks about you all the time.',
            'It is so nice to finally meet you! Yuki is always talking about how great this place is.',
            "Aw, that's sweet! Yuki's told us a ton about you too. Glad you could make it!",
        ],
        context: 'put faces to names は「名前だけ知っていた人に実際に会う」という英語独特の表現。日本語にはない発想。「いつも話聞いてます」をshe talks about youにするだけで自然な英語になる。I have heard a lot about youはやや硬い。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: 'どうぞよろしく',
        english: [
            'Nice to meet you.',
            'Great to meet you! Looking forward to hanging out.',
            'Really great to meet you. I hope we can all hang out more often.',
            "Likewise! Stick around tonight and you'll see why Yuki won't shut up about this place.",
        ],
        context: '日本語の「よろしくお願いします」に相当する万能英語は存在しない。初対面ならNice to meet you、その後はLooking forward to itが近い。英語は場面によって使い分ける必要がある。日本語1語 vs 英語は状況別。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: '何の仕事してるの？',
        english: [
            'What do you do?',
            'So what do you do for work?',
            'If you do not mind me asking, what do you do for a living?',
            "I'm in marketing, actually! Mostly digital stuff. It's hectic but I love it.",
        ],
        context: 'What do you do?だけで「仕事は何？」になる。日本語みたいに「お仕事は何を？」と丁寧にする必要がない。ただしアメリカでは初対面で仕事を聞くのは普通だけど、イギリスでは少し失礼に感じる人もいる。文化差。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: '日本にはどれくらいいるの？',
        english: [
            'How long have you been in Japan?',
            'How long have you been living in Japan?',
            'So how long have you been in Japan? Are you planning to stay a while?',
            "About a year and a half now. Honestly, it flew by. I can't believe it's been that long already.",
        ],
        context: 'How long have you been here?で「どれくらいいるの？」。現在完了のhave beenが必要。How long are you here?だと「いつまでいるの？」になって全然違う意味になる。時制ミスで意味が変わる典型例。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: '日本語上手ですね',
        english: [
            'Your Japanese is great.',
            'Wow, your Japanese is really impressive!',
            'Wait, your Japanese is actually really good! How long have you been studying?',
            "Ha, thanks! I've been studying for three years but kanji still destroys me every day.",
        ],
        context: '外国人に「日本語上手ですね」と言うのは日本特有の文化。英語圏では特定の言語を褒めること自体が少ない。ネイティブからすると、挨拶レベルで褒められると「本当はできてないのに」と微妙な気持ちになることも。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: 'この店の常連なんだ',
        english: [
            'We are regulars here.',
            'We come here all the time. We are basically regulars.',
            'Yeah, we are all regulars here. We come pretty much every week.',
            "Oh nice! That explains why everyone seems so tight-knit. I can tell you guys go way back.",
        ],
        context: 'regulars は「常連」。英語でも a regular at the bar のように使う。puts up with は「我慢してくれる」。日本語の「常連」は誇らしい感じだけど、英語の regular はもう少し淡白。ニュアンスの温度差がある。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: '遠慮しないでね',
        english: [
            'Do not be shy.',
            'Please do not hold back. Just say what you want.',
            'Do not be shy about ordering whatever you want. It is on us tonight.',
            "You guys are way too nice! Okay, in that case, I'll have whatever you're having.",
        ],
        context: '「遠慮しないで」は英語にしにくい日本語の代表格。Do not be shy は近いけど「恥ずかしがらないで」のニュアンスが入る。Do not hold back は「抑えないで」。英語には「遠慮」という概念自体があまりない。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 61, japanese: 'ここに来ると元気出るよ',
        english: [
            'This place cheers me up.',
            'Coming here always puts me in a good mood.',
            'Whenever I am having a rough day, I just come here and I feel better right away.',
            "Right? Same here. I had the worst day at work and now I feel totally fine. This place is magic.",
        ],
        context: 'cheers me up は「元気づける」。puts me in a good mood は「いい気分にする」。stressed out of my mind は「頭がおかしくなるほどストレス」。therapy は「セラピー」で居酒屋をセラピーに例えるのがアメリカン。',
        character: 'mina', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 62: 第一印象 (First Impressions)
    // Scene: 初対面の外国人にどんな印象を持ったか、みんなで話す
    // ────────────────────────────────────────────────────

    {
        daySlot: 62, japanese: '第一印象ってやっぱ大事だよね',
        english: [
            'First impressions matter.',
            'First impressions really do matter, do they not?',
            'I always say first impressions are everything. You only get one shot at it.',
            "For sure. I always try to smile and be chill, but honestly I overthink it every single time.",
        ],
        context: 'You never get a second chance to make a first impression は有名なことわざ。日本語の「第一印象」はそのまま first impression で直訳が成立するレアケース。ただし英語では make a first impression と動詞が make になる。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: '最初はちょっと怖そうに見えた',
        english: [
            'You looked a little scary at first.',
            'Honestly, you seemed kind of intimidating at first.',
            'I am not going to lie, you came across as a little intimidating when we first met.',
            "Wait, really? I get that a lot actually. I swear I'm friendly, my face just doesn't show it.",
        ],
        context: 'intimidating は「威圧的な」「近寄りがたい」。scary より大人な表現。came across as は「〜という印象を与えた」で、日本語の「〜に見えた」に当たる。seemed と came across as は似てるけど、came across as の方が「本人はそうじゃないかもだけど」のニュアンスがある。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: '見た目と中身って違うよね',
        english: [
            'Looks can be deceiving.',
            'You really cannot judge a book by its cover.',
            'People are never what they seem on the surface. Looks can be so deceiving.',
            "Totally. The quietest guy in our office turned out to be the funniest person I've ever met.",
        ],
        context: 'You cannot judge a book by its cover は「見かけで判断するな」の定番ことわざ。Looks can be deceiving は「見た目は当てにならない」。日本語の「人は見かけによらぬもの」にピッタリ対応する珍しいケース。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: 'すぐ打ち解けたよね',
        english: [
            'We hit it off right away.',
            'We really clicked from the very beginning.',
            'It is funny how we hit it off immediately. It felt like we had known each other forever.',
            "I know, right? It's so rare. Usually it takes me weeks to get comfortable with someone.",
        ],
        context: 'hit it off は「すぐ仲良くなる」の定番表現。clicked も同じ意味で「カチッとはまった」感。日本語の「打ち解ける」は「壁がなくなる」イメージだけど、英語は「相性がカチッとはまる」イメージ。発想が違う。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: '人見知りだから最初きつかった',
        english: [
            'I am shy, so it was tough at first.',
            'I am kind of shy around new people, so the beginning was rough.',
            'I have always been a little shy, so meeting a group of strangers was pretty nerve-wracking for me.',
            "I had no idea you were nervous! You seemed totally natural to me that night.",
        ],
        context: '「人見知り」を英語にするのは難しい。shy は近いけど子供っぽく聞こえることもある。introverted は性格全体の話。socially awkward は「社交的に不器用」。場面によって使い分けが必要。一語で全部カバーする英語はない。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: '話してみたら全然違った',
        english: [
            'Once we talked, it was totally different.',
            'But once we actually started talking, everything changed.',
            'I had the wrong idea about you at first, but once we started talking, I realized you were completely different from what I expected.',
            "Ha, same with you! I thought you'd be super serious but you're actually hilarious.",
        ],
        context: 'warm up は「打ち解ける」。build up an image は「イメージを作り上げる」。turns out は「実は〜だった」で、期待と現実のギャップを表す定番表現。Like a diesel engine は「ディーゼルエンジンみたいに温まるのに時間がかかる」の比喩。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: 'あの人、感じいいよね',
        english: [
            'That person seems nice.',
            'She gives off really good vibes.',
            'I got a really good vibe from her. She seems like a genuinely nice person.',
            "Right? She's the kind of person you feel like you've known forever after five minutes.",
        ],
        context: 'gives off good vibes は「いい雰囲気を出している」。vibe は若者言葉だけど今はほぼ全世代が使う。日本語の「感じいい」に一番近いのが good vibes かも。「空気感」を英語にすると energy や vibe になる。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: '目を見て話す人は信用できる',
        english: [
            'I trust people who make eye contact.',
            'People who look you in the eye when they talk are trustworthy.',
            'I have always believed that if someone can look you in the eye, you can trust them.',
            "Hmm, that's true. Although I've met some really sweet people who are just too shy to look up.",
        ],
        context: 'make eye contact は「目を合わせる」。look you in the eye は「目を見て話す」でより強い表現。日本語では目を見すぎると失礼になることがあるけど、英語圏では逆に目を合わせないと「信用できない」と思われる。文化差がデカい。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: '笑顔が素敵だった',
        english: [
            'She had a great smile.',
            'Her smile was really warm and genuine.',
            'The first thing I noticed was her smile. It felt genuine and made me feel at ease.',
            "Oh yeah, you could tell it was real too. Not one of those forced smiles people put on at parties.",
        ],
        context: 'genuine smile は「本物の笑顔」。put at ease は「安心させる」。英語では smile の種類を細かく分ける。fake smile, forced smile, polite smile, warm smile, genuine smile。日本語の「愛想笑い」は英語だと polite smile か fake smile。区別が重要。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 62, japanese: '俺は人を見る目がある',
        english: [
            'I am a good judge of character.',
            'I have always been pretty good at reading people.',
            'I like to think I am a good judge of character. I can usually tell what someone is like right away.',
            "Okay, so what was your first read on me? I'm scared to ask but I gotta know.",
        ],
        context: 'a good judge of character は「人を見る目がある」の完全対応英語。reading people は「人を読む」で同じ意味。handle their first drink は「最初の一杯の飲み方」で人柄を見る、というマスターらしい哲学。',
        character: 'master', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 63: 外見を描写する (Describing People)
    // Scene: タケシが合コンの相手を説明しようとして大惨事
    // ────────────────────────────────────────────────────

    {
        daySlot: 63, japanese: 'どんな人だった？見た目的に',
        english: [
            'What did she look like?',
            'So what did she look like? Describe her.',
            'Come on, tell us what she looked like. Give us the details.',
            "Hmm, where do I start? She was... you know, cute? Like, really cute. That's all I got.",
        ],
        context: 'What does she look like? は「どんな見た目？」。paint us a picture は「詳しく描写して」。合コンの英語は group blind date だけど英語圏にはこの文化がないからそのまま goukon で通じる場合も。there is a range は「幅があるだろ」。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: '背が高くてスラッとしてた',
        english: [
            'She was tall and slim.',
            'She was tall and had a really slender figure.',
            'She was pretty tall, maybe around 170, and had this elegant, slender look.',
            "Wait, how tall are we talkin'? Like taller than you? That's kinda hot honestly.",
        ],
        context: 'slim, slender, thin, skinny は全部「細い」だけどニュアンスが全然違う。slim=健康的に細い、slender=優雅に細い、thin=中立、skinny=痩せすぎ。英語では体型の描写に超敏感。日本語より地雷が多い。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: '髪が長くて茶色かった',
        english: [
            'She had long brown hair.',
            'She had really long, light brown hair.',
            'She had this gorgeous long brown hair, like down to her waist almost.',
            "Ooh, long brown hair? Sounds like your type. Did you actually talk to her or just stare?",
        ],
        context: '英語で髪色を言うとき brunette（茶髪の女性）という専用語がある。blonde, brunette, redhead は髪色で人を呼ぶ英語独特の文化。日本語で「あの茶髪の子」とは言っても、それが固有名詞的に使われることはない。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: '丸顔で優しそうだった',
        english: [
            'She had a round face and looked kind.',
            'She had this soft, round face that made her look really gentle.',
            'She had a round face with these gentle features. She just looked like a warm, approachable person.',
            "Aw, that sounds adorable. Okay now I really wanna see a picture of her.",
        ],
        context: 'round face は直訳で「丸顔」。soft features は「柔らかい顔立ち」。radiate warmth は「温かさを放つ」。英語で顔の描写をするとき、features（顔立ち）をよく使う。sharp features=シャープ、soft features=柔らかい。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: 'メガネかけてた？',
        english: [
            'Did she wear glasses?',
            'Was she wearing glasses?',
            'Wait, did she have glasses on? I feel like that is important information.',
            "Yeah, she had these cute round glasses on. Honestly it suited her really well.",
        ],
        context: 'wear glasses は「メガネをかけている」。日本語は「かけている」だけど英語は wear（着る）。Was she wearing? が進行形なのは「そのとき」の一時的な状態だから。Does she wear? にすると「普段かけている人か？」の意味になる。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: 'ちょっとぽっちゃりしてた',
        english: [
            'She was a little chubby.',
            'She was on the curvy side, which I think looks great.',
            'She was not super skinny or anything, more on the curvy side. She looked healthy and confident.',
            "Dude, careful how you say that. 'Curvy' is fine but if you said that to her face, you'd be dead.",
        ],
        context: '体型の話は英語では超デリケート。chubby は親しい間でも失礼になりうる。curvy はポジティブな言い方。plus-size はさらにポジティブ。full-figured もOK。overweight は医療用語。fat は基本NG。日本語より数倍地雷が多い。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: 'おしゃれだった',
        english: [
            'She was stylish.',
            'She was really fashionable and put together.',
            'She had this effortlessly stylish look. Like she was not trying too hard but everything worked.',
            "Lucky. I spend an hour getting ready and still end up looking like a mess.",
        ],
        context: 'put together は「きちんとまとまっている」。effortlessly stylish は「頑張ってない風にオシャレ」。fashionable は少し古臭い響きもある。stylish の方がモダン。got dressed in the dark は「暗闇で着替えた」＝センスがない、の自虐。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: '年齢が読めない顔だった',
        english: [
            'I could not tell her age.',
            'She had one of those faces where you cannot guess her age.',
            'Honestly, I have no idea how old she was. She could have been anywhere from 25 to 40.',
            "That's so Asian though. People always guess my age wrong too. I'll take it as a compliment.",
        ],
        context: '英語圏では年齢を聞くのは日本以上にタブー。ageless は「年齢不詳の」で褒め言葉。How old are you? は初対面では基本聞かない。日本語の「おいくつですか？」より失礼度が高い。baby face も使えるけど人による。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: '雰囲気がいい人だった',
        english: [
            'She had a nice vibe.',
            'She had this really warm, welcoming aura about her.',
            'There was something about her presence that just made the whole room feel more relaxed.',
            "I know exactly what you mean. Some people just have that natural warmth you can't fake.",
        ],
        context: '「雰囲気」は英語にしにくい日本語の筆頭。vibe, aura, energy, presence, atmosphere。全部微妙に違う。vibe は全体的な印象、aura は神秘的、energy は活力、presence は存在感。日本語の「雰囲気」が広すぎて英語1語では収まらない。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 63, japanese: '写真と全然違った',
        english: [
            'She looked nothing like her photo.',
            'She looked completely different from her picture.',
            'I am not going to lie, she looked nothing like her profile picture. But in a good way.',
            "In a good way or a bad way? 'Cause that could go either direction real quick.",
        ],
        context: 'look nothing like は「全然似てない」。the other way around は「逆パターン」。in person は「実物は」で、写真やオンラインとの対比で使う。日本語の「実物の方がいい」は she looks better in person。マッチングアプリ時代の必須表現。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 64: 性格を表現する (Personality Types)
    // Scene: リサが「日本語の性格表現は英語にしにくい」と解説
    // ────────────────────────────────────────────────────

    {
        daySlot: 64, japanese: '真面目すぎるのが玉にキズ',
        english: [
            'Being too serious is his only flaw.',
            'His only downside is that he takes everything too seriously.',
            'He is a great guy. His one flaw is that he is way too serious about everything.',
            "Hey, I'm right here you know. And I don't take everything seriously... do I?",
        ],
        context: '「真面目」は英語にするとserious, diligent, earnest, studious。でもどれも「真面目」のニュアンスを完全にはカバーしない。seriousは「堅い」、diligentは「勤勉」、earnestは「真剣」。日本語の「真面目」はもっと広い概念。「玉にキズ」はhis only flaw。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: 'あの人、天然だよね',
        english: [
            'She is a natural airhead.',
            'She is kind of spacey but in a lovable way.',
            'She is a total space cadet but everyone adores her for it.',
            "Ha, that's so true! But honestly, that's what makes her fun to hang out with.",
        ],
        context: '「天然」は英語に直訳できない日本語の代表。spacey, ditzy, airheadが近いけど全部ネガティブ寄り。日本語の「天然」は褒め言葉にもなるけど英語にはそのポジティブなニュアンスがない。in a lovable wayを付けないとただの悪口になる。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: 'マイペースな人だよね',
        english: [
            'He does things at his own pace.',
            'He is the kind of person who marches to his own drum.',
            'He totally goes at his own pace. He does not care what anyone else thinks.',
            "Must be nice. I wish I could stop caring what people think but I'm way too anxious for that.",
        ],
        context: '「マイペース」は和製英語で英語では通じない。marches to his own drum は「自分のリズムで生きる」の定番表現。goes at his own pace で通じるけど、marches to the beat of his own drum の方が英語らしい。taking his sweet time は「マイペースに」のカジュアル版。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: 'あいつ、空気読めないんだよ',
        english: [
            'He cannot read the room.',
            'He is totally clueless about reading the room.',
            'He has zero awareness of social cues. He just says whatever comes to mind.',
            "Oh god, yeah. Remember when he made that joke at the funeral? I wanted to disappear.",
        ],
        context: '「空気を読む」は英語で read the room。実はこの表現、英語にも存在する。ただし日本語ほど重要視されていない。英語圏では空気を読まなくても「正直な人」で済むことが多い。社会的プレッシャーの度合いが違う。oblivious は「全く気づかない」。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: 'あの子は気が利くよね',
        english: [
            'She is very thoughtful.',
            'She is the kind of person who always notices the little things.',
            'She is incredibly thoughtful. She always picks up on things nobody else notices.',
            "Yeah, she texted me on my bad day last week without me even saying anything. That blew my mind.",
        ],
        context: '「気が利く」は英語にしにくい。thoughtful は「思いやりがある」、attentive は「注意を払う」、considerate は「気遣いができる」。でも日本語の「気が利く」は「言われる前に気づいて動く」という能動性がある。英語では picks up on things が近い。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: '裏表がない人だよね',
        english: [
            'She is very genuine.',
            'What you see is what you get with her.',
            'She is the most genuine person I know. There is absolutely no hidden agenda.',
            "That's so rare these days. I feel like most people I meet are putting on some kind of act.",
        ],
        context: '「裏表がない」は what you see is what you get（見たまんま）が完璧な英語。genuine は「本物の」。two-faced は「裏表がある」の逆。日本語の「裏表」は物理的な表裏のイメージだけど、英語は two faces（2つの顔）。比喩の発想が面白い。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: 'ノリがいい人っているよね',
        english: [
            'Some people are just fun to be around.',
            'Some people are naturally the life of the party.',
            'I love people who are always up for anything. They make everything more fun.',
            "Takeshi's like that. You say 'karaoke' and he's already out the door before you finish the sentence.",
        ],
        context: '「ノリがいい」は英語に直訳不可能な日本語トップ5に入る。up for anything, down for whatever, go with the flow が近い。life of the party は「盛り上げ役」。でも「ノリ」の本質は「場の空気に乗れる」で、英語にはその概念がそもそもない。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: '頑固だけど悪い人じゃない',
        english: [
            'He is stubborn but not a bad person.',
            'He is stubborn as a mule but his heart is in the right place.',
            'Sure, he is set in his ways, but deep down he genuinely cares about everyone.',
            "Ha, 'set in his ways' is a nice way of putting it. The man won't even try a new brand of soy sauce.",
        ],
        context: 'stubborn as a mule は「ロバみたいに頑固」のことわざ。set in his ways は「やり方を変えない」。his heart is in the right place は「根は悪くない」。日本語の「頑固だけどいい人」をhis heart is in the right placeで表現するのが英語的。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: 'あの人、意外とさみしがり屋だよね',
        english: [
            'He is actually pretty lonely.',
            'He seems tough but he actually gets lonely really easily.',
            'For someone who acts so independent, he really does not like being alone.',
            "Really? He always acts so cool about it. I never would've guessed he's the clingy type.",
        ],
        context: '「さみしがり屋」は英語だと gets lonely easily か hates being alone。英語には「さみしがり屋」を一語で表す単語がない。clingy（べったり）は近いけどネガティブすぎる。needs company は「誰かといたい」。日本語の方が可愛く言える。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 64, japanese: '人それぞれだからね',
        english: [
            'Everyone is different.',
            'Well, everyone has their own personality.',
            'At the end of the day, everyone is wired differently and that is what makes it interesting.',
            "Exactly. That's what I love about this group. We're all completely different and it just works.",
        ],
        context: 'wired differently は「配線が違う」→「性格が違う」。脳の配線の比喩。to each their own は「人それぞれ」のもう一つの定番。it takes all kinds は「いろんな人がいる」。日本語の「人それぞれ」は超万能だけど、英語は場面で使い分けが必要。',
        character: 'master', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 65: 家族の話 (Talking About Family)
    // Scene: ケンジが孫の話を始めて止まらなくなる
    // ────────────────────────────────────────────────────

    {
        daySlot: 65, japanese: '孫が最近歩けるようになってさ',
        english: [
            'My grandson just started walking.',
            'My little grandson finally started walking and it is the cutest thing.',
            'You guys, my grandson took his first steps last week and I almost cried.',
            "No way, that's adorable! Show us the video. I bet he's the cutest little guy ever.",
        ],
        context: 'took his first steps は「初めて歩いた」。wobbling は「よろよろ」。fell on his butt は「お尻から転んだ」。tiny drunk person は「小さい酔っぱらい」で赤ちゃんの歩き方を表現するのが英語的ユーモア。get emotional は「感動して泣きそうになる」。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: '嫁と姑の関係って難しいよね',
        english: [
            'The in-law relationship is tough.',
            'The relationship between a wife and her mother-in-law is always tricky.',
            'Getting along with your in-laws is one of the hardest parts of marriage, I swear.',
            "Oh tell me about it. My wife and my mom are so passive-aggressive it gives me a headache.",
        ],
        context: 'in-laws は「義理の家族」。mother-in-law は「義母」。日本語の「嫁姑問題」は英語でも in-law problems として世界共通の悩み。meddles は「口出しする」。take sides は「どちらかの味方をする」。stuck in the middle は「板挟み」。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: '兄弟いる？',
        english: [
            'Do you have any siblings?',
            'Do you have brothers or sisters?',
            'Are you an only child or do you have siblings?',
            "Yeah, I've got an older brother. We fought like crazy as kids but now we're super close.",
        ],
        context: 'siblings は「兄弟姉妹」の性別を問わない単語。日本語は兄・姉・弟・妹と4種類あるけど、英語は brother と sister の2種類。年齢の上下は older/younger で表す。only child は「一人っ子」。英語の方がシンプル。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: '親に似てきた自分が怖い',
        english: [
            'I am becoming my parents.',
            'I am slowly turning into my father and it terrifies me.',
            'The older I get, the more I catch myself acting exactly like my dad. It is honestly scary.',
            "Ha, join the club. I caught myself saying 'back in my day' last week and almost lost it.",
        ],
        context: 'turning into は「〜になってきている」。catch myself は「自分が〜しているのに気づく」。existential crisis は「存在の危機」で大げさに言うのが英語のユーモア。I am him は「もう完全に親父だ」の絶望表現。世界共通の「親に似てきた」恐怖。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: 'うちの親、過保護なんだよね',
        english: [
            'My parents are overprotective.',
            'My parents are way too overprotective. It drives me crazy.',
            'I love my parents but they are so overprotective that it is suffocating sometimes.',
            "Same! My mom calls me every night. I'm like, Mom, I'm a grown adult. She does not care.",
        ],
        context: 'overprotective は「過保護」の直訳だけど、英語ではhelicopter parent（ヘリコプターペアレント）の方がよく使われる。常に上空から監視しているイメージ。boundaries は「境界線」で「距離感」に近い。英語圏では boundaries の概念が超重要。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: '親孝行しなきゃなと思うけど',
        english: [
            'I should be better to my parents.',
            'I keep thinking I should do more for my parents.',
            'I always say I am going to visit my parents more often but I never actually do it.',
            "I feel that. You don't realize how much they did for you until you're older, huh?",
        ],
        context: '「親孝行」は英語に直訳できない日本語。be a good son/daughter が近いけど「孝行」の儒教的な深みがない。英語圏では親への義務感より「会いたいから会う」の方が自然。filial piety は学術用語で日常では使わない。文化の根本差。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: '娘が反抗期でさ',
        english: [
            'My daughter is going through a rebellious phase.',
            'My teenage daughter is in full rebellion mode right now.',
            'My daughter is going through that teenage phase where she hates everything I say.',
            "Oof, hang in there. My sister was the same way and now she calls our dad every Sunday.",
        ],
        context: 'rebellious phase は「反抗期」。going through a phase は「時期を経験中」。rolled her eyes は「目をくるっと回した」で反抗のサイン。grow out of it は「成長して卒業する」。日本語の「反抗期」と英語の rebellious phase はほぼ同じ概念。珍しく直訳OK。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: 'うちは放任主義だった',
        english: [
            'My parents were hands-off.',
            'My parents pretty much let me do whatever I wanted.',
            'I grew up in a pretty laid-back household. My parents gave me a lot of freedom.',
            "That's interesting. I kinda wish mine were more like that. The grass is always greener, I guess.",
        ],
        context: 'hands-off は「干渉しない」。laid-back は「ゆるい」。日本語の「放任主義」はネガティブ寄りだけど、英語の hands-off parenting はポジティブにもネガティブにも使える。free-range parenting は最近流行の「自由に育てる」概念。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: '親の気持ち、今ならわかる',
        english: [
            'Now I understand how my parents felt.',
            'I finally get why my parents said all those things.',
            'I used to think my parents were crazy but now I totally understand where they were coming from.',
            "So true. My mom always said 'save your money' and I never listened. Wish I had.",
        ],
        context: 'where they were coming from は「彼らの立場・気持ち」。they were right all along は「ずっと正しかった」。figure out は「理解する」。日本語の「今ならわかる」がI finally get itで表現できる。get はunderstandのカジュアル版。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 65, japanese: '家族写真見せてよ',
        english: [
            'Show me your family photos.',
            'Come on, show us a family photo!',
            'You keep talking about them, so show us a picture! I want to see your family.',
            "Oh no, here we go. Once Kenji starts showing baby pics, we're here for an hour.",
        ],
        context: 'pull out your phone は「スマホ出して」。grandkids は grandchildren のカジュアル版。adorable は「めちゃくちゃかわいい」で cute より強い。I bet は「きっと〜だよ」の推測表現。英語圏でも孫の写真攻撃は世界共通現象。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 66: 友達関係 (Friendship Vocabulary)
    // Scene: ミナが韓国アイドルの友情エピソードを英語で説明したい
    // ────────────────────────────────────────────────────

    {
        daySlot: 66, japanese: '幼なじみなんだって',
        english: [
            'They are childhood friends.',
            'Apparently they have been friends since they were little kids.',
            'They grew up together. They have known each other since they were like five years old.',
            "Since kindergarten? That's wild. I don't even remember anyone from my kindergarten.",
        ],
        context: '「幼なじみ」は英語で childhood friend。ただしこの英語は日本語ほどのエモさがない。日本語の「幼なじみ」は特別な響きがあるけど、childhood friend は単に「子供の頃の友達」。grew up together の方が絆の深さが伝わる。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: '親友って呼べる人、何人いる？',
        english: [
            'How many best friends do you have?',
            'How many people would you actually call your best friend?',
            'Real talk. How many people in your life would you truly call a best friend?',
            "Hmm, honestly? Maybe two. Three if I'm being generous. But those three are rock solid.",
        ],
        context: '「親友」は best friend だけど、英語の best friend は日本語ほど重くない。アメリカ人は割とカジュアルに best friend を使う。日本語の「親友」はもっと重い。BFF（Best Friends Forever）は若い女性がよく使うカジュアル表現。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: '気まずくなっちゃったんだよね',
        english: [
            'Things got awkward between us.',
            'Our friendship got a little awkward after that.',
            'After that incident, things between us just got really weird and uncomfortable.',
            "That sucks. Have you tried just being straight with her about it? Might clear the air.",
        ],
        context: 'awkward は「気まずい」のドンピシャ英語。elephant in the room は「みんなわかっているけど誰も触れない問題」。日本語の「気まずい」は「間が持たない」ニュアンスもあるけど、awkward は「居心地が悪い」全般に使える超便利単語。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: '友達の友達ってだけだった',
        english: [
            'We were just friends of friends.',
            'We only knew each other through mutual friends.',
            'We were not really friends. We just happened to know the same people.',
            "Yeah, that's how most of my friendships started too. Funny how random it is.",
        ],
        context: 'mutual friends は「共通の友達」。acquaintance は「知り合い」で friend より浅い関係。日本語では「知り合い」と「友達」の境界が曖昧だけど、英語では friend と acquaintance を明確に使い分ける。friend は結構重い単語。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: '縁を切ったんだ',
        english: [
            'I cut ties with them.',
            'I completely cut that person out of my life.',
            'I had to cut ties with a friend last year. It was one of the hardest things I have done.',
            "Wow, that must've been tough. But sometimes you gotta do what's best for yourself.",
        ],
        context: 'cut ties は「縁を切る」。cut someone out of your life は「人生から排除する」。toxic は「有害な」人間関係で最近よく使われる単語。walk away は「立ち去る」。let go は「手放す」。英語では人間関係を「手放す」という表現をよく使う。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: '仲直りしたいんだけど',
        english: [
            'I want to make up with them.',
            'I really want to patch things up but I do not know how.',
            'I have been wanting to reach out and make things right but I do not know where to start.',
            "Just text her something casual. Don't overthink it. She probably misses you too.",
        ],
        context: 'make up は「仲直りする」。patch things up は「修復する」。make things right は「正す」。reach out は「連絡する」。日本語の「仲直り」は子供っぽく聞こえることがあるけど、英語の make up は大人同士でも普通に使う。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: 'あの二人、めっちゃ仲いいよね',
        english: [
            'Those two are really close.',
            'Those two are inseparable. They do everything together.',
            'Have you noticed those two are literally always together? They are like best friends on steroids.',
            "I know! They even finish each other's sentences. It's honestly a little creepy but also adorable.",
        ],
        context: "inseparable は「離れられない」。finish each other's sentences は「相手の文を最後まで言う」で仲良しの証拠。inside jokes は「内輪ネタ」。on steroids は「強化版」のスラングで、best friends on steroids は「超絶仲良し」。",
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: '距離感って大事だよね',
        english: [
            'Personal space is important.',
            'Keeping the right distance in a friendship is really important.',
            'I think the key to a long friendship is knowing how much space to give each other.',
            "So true. My best friend and I go months without talking and it's never weird when we reconnect.",
        ],
        context: '「距離感」は英語で boundaries か personal space。ただし英語の boundaries は「ここまでOK、ここからNG」の明確な線引き。日本語の「距離感」はもっとふわっとした概念。英語圏では boundaries を言語化することが重視される。暗黙の了解に頼らない文化。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: 'あの子に推しの良さを伝えたい',
        english: [
            'I want to tell her about my favorite idol.',
            'I am dying to explain to her why my favorite idol is so amazing.',
            'I have been trying to get my friend into this group but I cannot find the right words in English.',
            "Just show her that backstage video you showed me. That's what got me into them too.",
        ],
        context: '「推し」は英語に直訳できない日本語。bias は K-pop ファン用語で「推し」に近い。fave は favorite の略。stan は「熱狂的ファン」だけど少しネガティブ。英語圏のファンは my bias か my fave を使う。「推す」文化が英語にも浸透中。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 66, japanese: '持つべきものは友だよ',
        english: [
            'Good friends are everything.',
            'Nothing beats having good friends in your life.',
            'At the end of the day, the people around you are what matter most.',
            "Cheers to that. I honestly don't know what I'd do without you guys. I mean it.",
        ],
        context: '「持つべきものは友」の英語は A friend in need is a friend indeed（困った時の友が本当の友）が近い。Nothing beats は「〜に勝るものはない」。stuck around は「そばにいてくれた」。showed up は「現れた・駆けつけた」。',
        character: 'master', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 67: 復習:人物描写チャレンジ (People Description Review)
    // Scene: マスターが「英語で常連客を描写してみろ」と課題を出す
    // ────────────────────────────────────────────────────

    {
        daySlot: 67, japanese: 'よし、お前ら、英語で俺を描写してみろ',
        english: [
            'Alright, describe me in English.',
            'Okay, I want each of you to describe me in English. Go.',
            'Here is a challenge. Describe me using only English. And be honest.',
            "Wait, is this a test? Oh man, my English is not ready for this. Can I go last?",
        ],
        context: 'describe は「描写する」。listen up は「聞け」で注目を集める表現。no Japanese allowed は「日本語禁止」。paying double は「倍額払え」。be specific は「具体的に」。マスターの教育的な遊び心が英語学習につながる。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: 'えーっと、厳しいけど優しい人…？',
        english: [
            'He is strict but kind.',
            'Um, he is tough on the outside but soft on the inside?',
            'How do I say this... He is like a strict teacher who actually cares about his students.',
            "Nailed it! That's exactly what he is. Strict but kind is the perfect way to put it.",
        ],
        context: 'tough love は「厳しい愛情」で、日本語の「愛のムチ」に近い。strict but kind は直訳だけど通じる。tough on the outside, soft on the inside は「外は硬いけど中は柔らかい」。英語学習者の「言いたいことがあるのに英語が出てこない」もどかしさがリアル。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: '一言で言うと、ツンデレだよね',
        english: [
            'Basically, he is a tsundere.',
            'In one word? Total tsundere.',
            'If I had to sum him up in one word, it would be tsundere. Cold on the surface, warm underneath.',
            "Ha! The Master's face right now is priceless. He's trying not to smile. Total tsundere move.",
        ],
        context: 'tsundere は英語圏のアニメファンには通じる日本語。英語で説明すると cold on the outside, warm on the inside。no English equivalent は「英語に同等の言葉がない」。secretly does nice things は「こっそりいいことをする」。日本の概念が英語に輸出される例。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: 'リサは頼れるお姉さんって感じ',
        english: [
            'Lisa is like a reliable big sister.',
            'Lisa gives off total big sister energy.',
            'Lisa is basically the dependable older sister of the group. Everyone goes to her for advice.',
            "Aw, stop it! You're gonna make me blush. But yeah, someone has to keep you guys in line.",
        ],
        context: 'big sister energy は「お姉さんオーラ」。the glue that holds the group together は「グループをまとめる接着剤」。preachy は「説教くさい」。dependable は reliable より少し温かい「頼れる」。英語の energy は「〜のオーラ・雰囲気」の意味で最近超使われる。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: 'タケシは…うるさい',
        english: [
            'Takeshi is loud.',
            'Takeshi? One word. Loud.',
            'How do I describe Takeshi? He is the loudest person in any room he walks into.',
            "Hey! That's it? Just 'loud'? Come on, there's gotta be more to me than that!",
        ],
        context: 'human speaker system は「人間スピーカー」の比喩。take away は「取り除く」。brings the energy は「場を盛り上げる」。his kind of loud は「彼みたいなうるさいの」。描写の練習として、最初の一言（loud）から掘り下げていくのが英語の論理展開。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: 'ケンジさんは静かだけど存在感ある',
        english: [
            'Kenji is quiet but has presence.',
            'Kenji does not say much but when he does, everyone listens.',
            'Kenji is the strong silent type. He does not need to talk to make an impact.',
            "That's actually really well said. You nailed him perfectly. The strong silent type for sure.",
        ],
        context: 'the strong silent type は「寡黙で存在感がある人」。fill a room with presence は「存在感で部屋を満たす」。speak up は「声を上げる」。carry weight は「重みがある」。英語では quiet を必ずしもネガティブに使わない。still waters run deep（静かな水は深い）の概念。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: 'ミナは元気の塊だよね',
        english: [
            'Mina is a ball of energy.',
            'Mina is basically a walking ball of energy and enthusiasm.',
            'Mina brings so much life to this group. She is like a burst of sunshine every time she walks in.',
            "Aww, you guys! That's the sweetest thing anyone's ever said about me. I'm not crying, you're crying!",
        ],
        context: 'a ball of energy は「エネルギーの塊」。a burst of sunshine は「太陽のような明るさ」。bottle her energy は「エネルギーを瓶詰めにする」比喩。keeps us young は「若く保ってくれる」。英語は人を物に例える比喩がとにかく多い。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: '俺の描写ひどくない？',
        english: [
            'Wait, my description is terrible!',
            'Hold on, that is how you describe me? That is harsh!',
            'Seriously? All you had to say about me was that I am loud? I am offended.',
            "Relax, he also said you bring the energy. That's a compliment, you loud onion.",
        ],
        context: 'I have layers は映画シュレックの名台詞「Ogres are like onions, they have layers」のパロディ。I am offended は「傷ついた」のコミカルな表現。that is it? は「それだけ？」。自虐しながらも笑いに変える英語的ユーモアの構造。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: '英語で人を描写するのって難しいね',
        english: [
            'Describing people in English is hard.',
            'It is really tough to describe someone accurately in English.',
            'I realized describing people in English is way harder than I thought. So many nuances get lost.',
            "Right? Like, I wanted to say 'tenshin' and there's just nothing that captures it in English.",
        ],
        context: '言語によって「概念のパッケージング」が違う。日本語の「天然」「真面目」「元気」は英語では1語にならない。逆に英語の awkward や boundaries は日本語にしにくい。これが言語学習の本質。単語を覚えるのではなく、概念の再構成が必要。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 67, japanese: '来週もこの調子でいくぞ',
        english: [
            'Let us keep this up next week.',
            'We are doing great. Let us keep this momentum going.',
            'I am proud of all of you. Same energy next week. We have got more to learn.',
            "Wait, did he just say drinks are on the house? Somebody screenshot this. It'll never happen again!",
        ],
        context: 'keep this up は「この調子を維持する」。let up は「手を緩める」。drinks are on the house は「今夜はおごり」。on the house は「店のおごり」の定番表現。getting soft は「甘くなる」。マスターのツンデレが全開。',
        character: 'master', category: 'social', month: '2026-06',
    },
];

// ============================================================
// DAY THEMES -- MONTH 3 (2026-06) -- WEEK 9
// ============================================================

export const MONTH3_W9_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    61: {
        title: '人を紹介する', titleEn: 'Introducing Someone', category: 'social',
        scene: 'ユキが居酒屋に外国人の同僚を連れてくる。マスターが英語で歓迎する。',
        keywords: [
            { en: 'introduce', ja: '紹介する', pron: 'イントロデュース', example: 'Let me introduce my friend.', note: '日本語の「紹介」は情報を一方的に伝えるイメージだけど、英語のintroduceは「会わせる」に近い。introduce A to Bの形が基本。' },
            { en: 'regular', ja: '常連', pron: 'レギュラー', example: 'We are regulars here.', note: 'a regular at the bar=バーの常連。日本語の「常連」は特別感があるけど、英語のregularは「よく来る人」で少し淡白。' },
            { en: 'welcome', ja: '歓迎する', pron: 'ウェルカム', example: 'Welcome! Make yourself at home.', note: 'You are welcome は「どういたしまして」、welcome は「ようこそ」。welcoming=歓迎的な、も形容詞で使える。' },
            { en: 'get along', ja: '仲良くする', pron: 'ゲットアロング', example: 'I think you two would really get along.', note: 'get along with は「うまくやっていく」。仲良くなるプロセスではなく、相性が合う状態を表す。hit it offは出会いの瞬間。' },
            { en: 'shy', ja: '恥ずかしがり', pron: 'シャイ', example: 'Do not be shy, just grab a seat.', note: 'shy は性格の話。英語にはshy, timid, reserved, introvertedと「控えめ」の段階が4つ以上ある。日本語より細かい。' },
        ],
    },
    62: {
        title: '第一印象', titleEn: 'First Impressions', category: 'feeling',
        scene: '初対面の外国人にどんな印象を持ったか、みんなで話す。',
        keywords: [
            { en: 'impression', ja: '印象', pron: 'インプレッション', example: 'What was your first impression?', note: 'first impression=第一印象は英語でもそのまま。make a good impression=いい印象を与える。give an impressionとは言わない。makeが定番。' },
            { en: 'intimidating', ja: '威圧的な', pron: 'インティミデイティング', example: 'He looked a bit intimidating at first.', note: 'scary（怖い）より大人な表現。人だけでなく、タスクや状況にも使える。This project is intimidating=このプロジェクト手強い。' },
            { en: 'genuine', ja: '本物の・誠実な', pron: 'ジェニュイン', example: 'She seemed really genuine.', note: 'genuine smile=本物の笑顔、genuine person=嘘のない人。fakeの反対語。authentic も似た意味だがよりフォーマル。' },
            { en: 'vibe', ja: '雰囲気・空気感', pron: 'ヴァイブ', example: 'She gives off really good vibes.', note: '元々は音楽用語。今は「雰囲気」の意味で全世代が使う。good vibes=いい空気、bad vibes=嫌な予感。複数形vibesが普通。' },
            { en: 'hit it off', ja: 'すぐ意気投合する', pron: 'ヒットイットオフ', example: 'We hit it off right away.', note: 'すぐ仲良くなる瞬間を表す。get along（継続）との違いが重要。hit it off=出会いの瞬間、get along=その後の関係。' },
        ],
    },
    63: {
        title: '外見を描写する', titleEn: 'Describing People', category: 'social',
        scene: 'タケシが合コンの相手を説明しようとして大惨事。',
        keywords: [
            { en: 'appearance', ja: '外見', pron: 'アピアランス', example: 'Do not judge people by their appearance.', note: 'looks は外見のカジュアル版。She has good looks=見た目がいい。appearance はもう少しフォーマル。look は単数で「表情」。' },
            { en: 'slim', ja: 'スリムな', pron: 'スリム', example: 'She was tall and slim.', note: 'slim=健康的に細い、slender=優雅、thin=中立、skinny=痩せすぎ。体型描写は英語では超デリケート。間違えると大事故になる。' },
            { en: 'feature', ja: '顔立ち・特徴', pron: 'フィーチャー', example: 'She has sharp features.', note: 'facial features=顔立ち。sharp features=シャープ、soft features=柔らかい。日本語の「目鼻立ちがはっきり」はdefined featuresが近い。' },
            { en: 'stylish', ja: 'おしゃれな', pron: 'スタイリッシュ', example: 'She was effortlessly stylish.', note: 'fashionable はやや古い響き。stylish の方がモダン。trendy は流行を追っている人。put together=全体的にまとまっている。' },
            { en: 'curvy', ja: 'ふくよかな', pron: 'カーヴィー', example: 'She was curvy and confident.', note: '体型のポジティブな描写。chubby, plump は微妙に失礼。plus-size はファッション用語。英語は体型の言い方で地雷が日本語より多い。' },
        ],
    },
    64: {
        title: '性格を表現する', titleEn: 'Personality Types', category: 'feeling',
        scene: 'リサが「日本語の性格表現は英語にしにくい」と解説。',
        keywords: [
            { en: 'stubborn', ja: '頑固な', pron: 'スタバン', example: 'He is stubborn as a mule.', note: 'as a mule（ロバのように）は定番比喩。determined は「決意が固い」でポジティブ。stubborn はネガティブ寄り。同じ性格でも言い方で印象が変わる。' },
            { en: 'outgoing', ja: '社交的な', pron: 'アウトゴーイング', example: 'She is really outgoing and fun.', note: 'sociable, extroverted も近い。outgoing は「外向的で人と話すのが好き」。introvert の対義語として使われることが多い。' },
            { en: 'thoughtful', ja: '気が利く・思慮深い', pron: 'ソートフル', example: 'She is incredibly thoughtful.', note: '「気が利く」「思いやりがある」「考え深い」の3つの意味がある。文脈で判断。considerate は「気遣い」に特化、thoughtful はもっと広い。' },
            { en: 'clueless', ja: '鈍い・わかっていない', pron: 'クルーレス', example: 'He is totally clueless about social cues.', note: 'clue（手がかり）+less（ない）=何もわかってない。oblivious は「気づいてない」。cluelessの方がカジュアルで少し呆れた感じ。' },
            { en: 'genuine', ja: '裏表がない', pron: 'ジェニュイン', example: 'What you see is what you get with her.', note: '性格描写でも使える。a genuine person=裏表がない人。what you see is what you get=見たままの人。two-faced=裏表がある。' },
        ],
    },
    65: {
        title: '家族の話', titleEn: 'Talking About Family', category: 'social',
        scene: 'ケンジが孫の話を始めて止まらなくなる。',
        keywords: [
            { en: 'sibling', ja: '兄弟姉妹', pron: 'シブリング', example: 'Do you have any siblings?', note: '性別を問わない「きょうだい」。日本語は兄・姉・弟・妹と4種類あるけど英語はbrother/sisterの2種類。上下はolder/youngerで表す。' },
            { en: 'in-law', ja: '義理の家族', pron: 'インロー', example: 'Getting along with in-laws is tough.', note: 'mother-in-law=義母、father-in-law=義父。lawは法律の意味で「法的に家族」ということ。the in-lawsで義理の家族全体を指す。' },
            { en: 'overprotective', ja: '過保護な', pron: 'オーバープロテクティブ', example: 'My parents are way too overprotective.', note: 'helicopter parent=常に上空から監視する親。英語圏で大流行したスラング。lawnmower parentは子供の障害を先に除去する親。比喩が面白い。' },
            { en: 'rebellious', ja: '反抗的な', pron: 'リベリアス', example: 'She is going through a rebellious phase.', note: 'phase=時期。going through a phase=一時的な時期を通過中。rebel は名詞で「反逆者」。日本語の「反抗期」は英語でもrebellious phaseで直訳OK。' },
            { en: 'bond', ja: '絆', pron: 'ボンド', example: 'Family bonds are the strongest.', note: '接着剤のbondと同じ語源。family bond=家族の絆。strong bond=強い絆。bondは動詞としても使える。We bonded over food=食べ物で仲良くなった。' },
        ],
    },
    66: {
        title: '友達関係', titleEn: 'Friendship Vocabulary', category: 'social',
        scene: 'ミナが韓国アイドルの友情エピソードを英語で説明したい。',
        keywords: [
            { en: 'acquaintance', ja: '知り合い', pron: 'アクウェインタンス', example: 'We are acquaintances, not really friends.', note: 'friendとacquaintanceの区別は英語では重要。日本語は「友達」の範囲が広いけど、英語のfriendはもっと重い。気軽にfriendと言わない文化もある。' },
            { en: 'awkward', ja: '気まずい', pron: 'オークワード', example: 'Things got awkward between us.', note: '居心地の悪い状況全般に使える超便利単語。awkward silence=気まずい沈黙、awkward conversation=気まずい会話。日常で超頻出。' },
            { en: 'inseparable', ja: '離れられない仲', pron: 'インセパラブル', example: 'Those two are inseparable.', note: 'in（否定）+separate（分ける）+able=分けられない。ベストフレンドを描写する最強の単語。親子、カップルにも使える。' },
            { en: 'boundary', ja: '境界線・距離感', pron: 'バウンダリー', example: 'Good friendships need healthy boundaries.', note: '英語圏では boundaries の概念が超重視される。日本語の「距離感」より明確で言語化する文化。set boundaries=境界線を設定する。' },
            { en: 'toxic', ja: '有害な', pron: 'トキシック', example: 'That friendship was toxic.', note: '元は「毒性の」だけど、人間関係で「有害な」の意味で大流行中。toxic relationship, toxic behavior。2018年のオックスフォード今年の言葉。' },
        ],
    },
    67: {
        title: '復習:人物描写チャレンジ', titleEn: 'People Description Review', category: 'social',
        scene: 'マスターが「英語で常連客を描写してみろ」と課題を出す。',
        keywords: [
            { en: 'describe', ja: '描写する', pron: 'ディスクライブ', example: 'Describe me in English.', note: 'describe=言葉で描写する、explain=説明する。describeは見た目や性格、explainは理由や仕組み。日本語ではどちらも「説明する」で混同しがち。' },
            { en: 'presence', ja: '存在感', pron: 'プレゼンス', example: 'Kenji has a quiet but strong presence.', note: 'present（存在する）の名詞形。stage presence=舞台での存在感。英語ではpresenceとcharismaを区別する。presenceは静かでもOK。' },
            { en: 'sum up', ja: '一言でまとめる', pron: 'サムアップ', example: 'If I had to sum him up in one word...', note: 'sum up=要約する。to sum up=まとめると。in summary やin short も同義。ビジネスでもカジュアルでも使える万能表現。' },
            { en: 'accurate', ja: '正確な', pron: 'アキュレット', example: 'That is a pretty accurate description.', note: 'accurate は「事実に合っている」。precise は「細かく正確」。correct は「間違いがない」。accurate が日常で一番使いやすい「当たってる」。' },
            { en: 'nuance', ja: 'ニュアンス', pron: 'ニューアンス', example: 'So many nuances get lost in translation.', note: '日本語でも「ニュアンス」は使うけど発音が全然違う。英語は「ニューアンス」。lost in translation=翻訳で失われる、は超有名フレーズ。映画のタイトルにもなった。' },
        ],
    },
};
