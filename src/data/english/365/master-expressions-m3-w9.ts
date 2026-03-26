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
            "So, I have been talking about this place for weeks at work and my coworker finally said she wanted to come. I have been wanting to bring her here for a while because I think you guys would really get along. She just moved here from Canada and does not know many people yet, so please be nice. I mean, you are always nice, but like, extra nice.",
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
            "Welcome, welcome! Any friend of Yuki is a friend of ours. Sit wherever you like, do not worry about being polite. This is not that kind of place. Here we just eat, drink, and talk too much. That is basically all we do. If you need anything, just shout. And if Takeshi says something weird, just ignore him. We all do.",
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
            "Oh my gosh, it is so nice to finally put faces to names! Yuki literally talks about you guys every single day at work. She is always like, you have to come to this izakaya, the people are so fun. And honestly I was starting to think she was making it up because she made it sound too good to be true. But here I am!",
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
            "Hey, really nice to meet you. I am Takeshi by the way. Do not worry about remembering everyone's name right away, it took me like three months to remember Kenji's name and I see him every week. I am just kidding. But seriously, welcome. This crew is a little weird but we are harmless. Mostly harmless.",
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
            "So what do you do? Wait, sorry, I always feel weird asking that right away because it feels like I am sizing someone up. But I am genuinely curious. Yuki said you do something with marketing? I do not really understand marketing to be honest. Like, I know it exists, but what do you actually do all day? That probably sounds rude but I mean it in the most curious way possible.",
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
            "How long have you been here? Like in Japan, I mean. I always wonder what it is like moving to a completely different country. I have never lived abroad so I honestly cannot imagine it. Is the culture shock real or is that just something people say? I feel like I would last about two weeks before I started missing rice and miso soup.",
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
            "Hold on, you speak Japanese? And like, actually speak it? Not just the konnichiwa and arigatou level? That is amazing. I have been trying to learn English for years and I can barely order coffee. How long did it take you to get this good? I need to know your secret because whatever I am doing is clearly not working.",
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
            "We have been coming here for, what, like two years now? Something like that. We started as strangers and now we are basically family. Well, a very loud, opinionated family that argues about everything. But in a good way. The master here makes the best food and he puts up with all of us, which honestly deserves an award.",
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
            "Listen, do not hold back, okay? If you want something, just say it. Nobody here is polite. I mean, we are polite but not in the Japanese over-polite way where you say no three times before you finally accept. Just grab what you want and eat. If you are thirsty, grab a drink. If you want more food, just ask. This is not a formal dinner party.",
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
            "Honestly, this place saved me when I first started my job. I was stressed out of my mind and Kenji told me about this izakaya. The first time I came, everyone was so welcoming that I forgot about all my problems. Now it is like therapy for me. Cheaper than actual therapy too. And the food is better.",
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
            "You know what they say, you never get a second chance to make a first impression. And I totally believe that. I remember the first time I met everyone here. Takeshi was talking way too loud, Kenji barely said anything, and the master just stared at me for like ten seconds before he smiled. I was honestly a little scared.",
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
            "Do not take this the wrong way but when I first saw you, I was a little intimidated. You had this serious look on your face and you were not smiling. I thought, oh no, this person is going to be hard to talk to. But then you started laughing at one of Takeshi's terrible jokes and I was like, okay, never mind, this person is cool.",
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
            "I learned a long time ago that you cannot judge people by how they look. I used to think I was good at reading people but I was wrong like ninety percent of the time. The guy who looked super unfriendly turned out to be the nicest person ever. And the person who seemed really sweet was actually kind of mean. Humans are complicated.",
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
            "It is weird, right? Sometimes you meet someone and within five minutes you feel like you have known them your whole life. That is exactly what happened when I first came here. I sat down, someone handed me a beer, and we just started talking like old friends. No awkward silence, no forced conversation. It just flowed. That almost never happens.",
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
            "I am not great with new people. Like, one-on-one I am fine, but walking into a room full of strangers? My brain just shuts down. I do not know what to say, I overthink everything, and my face gets all red. I was like that when I first came here too. I think I barely said three words the whole night. But everyone was so chill about it that I felt okay. Nobody pressured me to talk.",
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
            "That is the thing though. You build up this image of someone in your head before you even talk to them, and then you actually have a conversation and it is nothing like what you imagined. I thought Kenji was this serious, quiet guy who did not want to be bothered. Turns out he is hilarious. He just takes a while to warm up. Like a diesel engine.",
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
            "I do not know what it is about her but she just has this energy that makes you feel comfortable. Some people walk into a room and the whole atmosphere changes. Not in a bad way, like in a warm way. She asked me questions, she actually listened to my answers, and she laughed at my jokes even when they were not funny. That is the mark of a good person.",
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
            "My father used to say, never trust a man who cannot look you in the eye. And I have lived by that. If someone is constantly looking away or staring at their phone while talking to me, I just feel like they are not being genuine. Eye contact tells you a lot about a person. It is one of those small things that makes a big difference.",
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
            "You know what really stood out? Her smile. Not like a polite smile that people put on to be nice, but an actual real smile. You can always tell the difference. A real smile reaches the eyes. A fake one is just mouth movement. Hers was definitely real. And I think that is why everyone relaxed so quickly. A genuine smile puts the whole room at ease.",
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
            "After running this bar for thirty years, I have seen every type of person walk through that door. I can tell within five minutes if someone is genuine or fake. It is not magic, it is just experience. You watch how people treat the staff, how they handle their first drink, what they talk about. All of it tells you something. I was right about all of you. Well, mostly right. Takeshi surprised me. He turned out dumber than I expected.",
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
            "Okay wait, hold on. You went to a goukon and you are not going to describe the people? That is the whole point of telling us. What did she look like? Tall? Short? Hair color? Come on, paint us a picture. I need details. Do not just say she was cute. Cute means nothing. Cute how? Like puppy cute or like model cute? There is a range.",
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
            "Okay so she was tall. Like, taller than me when she had heels on, which was a little awkward honestly. And she was slim, not like skinny skinny, but like, naturally slim? You know, like the kind of person who probably eats whatever she wants and stays thin. I hate those people. I look at a cake and gain two kilos.",
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
            "Her hair was probably the first thing I noticed. It was long, like really long, past her shoulders, and this warm brown color. Not dyed brown, like natural brown. And it was super shiny and healthy looking. I do not know how some people have perfect hair like that. Mine looks like I just woke up no matter what I do. I have tried everything.",
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
            "She had one of those faces that just immediately makes you feel comfortable. Round face, soft features, always smiling. You know how some people just radiate warmth? Like you look at them and you think, this person would never say a mean thing in their life. That was her. She had that energy. I do not even know how to describe it. She just looked kind.",
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
            "Hold on. I need to build a mental picture here. Was she wearing glasses? Because that changes everything. Glasses can completely change how a person looks. Some people look way better with glasses and some people look totally different without them. I look like a completely different human without my contacts. People do not recognize me. It is actually kind of sad.",
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
            "Okay, how do I say this without being rude. She was not thin. But I do not mean that in a bad way at all. She had this healthy, full figure and honestly she owned it. She looked confident and comfortable in her skin. That is way more attractive than being super skinny and insecure about it. Confidence changes everything.",
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
            "She was one of those people who looks good without trying. You know the type. She was wearing something simple, nothing flashy, but it all fit perfectly and the colors matched and she had these cool accessories. Some people just have that natural sense of style. I spend twenty minutes picking out a shirt and I still look like I got dressed in the dark.",
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
            "I seriously could not tell how old she was. And I did not want to ask because that is a guaranteed way to make things awkward. She could have been 25 or she could have been 38. I have no idea. Some people just have ageless faces. My face, unfortunately, tells you exactly how old I am plus ten years. Life has not been kind to this face.",
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
            "I know this sounds vague but she just had a really good vibe. Not because of how she looked or what she said, but just her overall energy. She was calm but not boring, funny but not trying too hard. She made the whole table feel at ease without even trying. That is a rare quality. Most people either try too hard or do not try at all.",
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
            "You know how everyone looks different in photos? She was like the extreme version of that. Her profile picture made her look like a completely different person. But here is the thing, she actually looked better in person. That almost never happens. Usually it is the other way around. People use their best angle, perfect lighting, filters. And then you meet them and you are like, wait, who is this? But she was the opposite. A pleasant surprise.",
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
            "Kenji is one of the best people I know. Reliable, honest, thoughtful. But if I had to pick one flaw, it would be that he takes everything too seriously. Like, you cannot make a joke around him without him actually thinking about it and giving you a serious answer. I said something sarcastic yesterday and he spent five minutes analyzing whether I was right. Relax, man. It was a joke.",
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
            "You know those people who are just completely in their own world? Like, you tell them something and they nod and smile and then five minutes later they ask you the same question. She is like that. But it is not annoying. It is endearing. She once walked into a glass door and apologized to it. I cannot make this up. And somehow that made everyone like her more. She is a different kind of smart.",
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
            "He is interesting because he genuinely does not care about what other people think. And I do not mean that in a selfish way. He just has his own rhythm and he sticks to it. Everyone else is rushing and stressing and he is just over there, taking his sweet time, completely unbothered. I used to find it annoying but now I kind of admire it. He figured out something the rest of us have not.",
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
            "Okay, I love the guy, but he has absolutely no filter and zero ability to read the room. Last week someone was talking about their breakup and he started telling a funny story about his ex. Like, read the room, man. Everybody went quiet and he just kept going. He did not even notice. I had to physically tap him to make him stop. It is almost impressive how oblivious he is.",
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
            "She is one of those people who just gets it. Like, you do not even have to say anything and she already knows what you need. If your glass is empty, she fills it. If you look tired, she asks if you are okay. She remembers things you said three months ago and brings them up at the perfect time. I wish I had that ability. I cannot even remember what I had for lunch yesterday.",
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
            "I respect people who are the same in front of you as they are behind your back. She is exactly that. She does not gossip, she does not pretend to like people she does not like, and she tells you exactly what she thinks. Some people find that blunt but I think it is refreshing. Too many people are nice to your face and then talk about you the second you leave the room. She is not like that.",
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
            "You know those people who are always down for whatever? You suggest something random at midnight and they are like, let us do it. No hesitation, no overthinking. They just go with the flow and make everything ten times more fun. I am not that person at all. I need at least three days notice and a detailed plan before I commit to anything. But I love being around people like that.",
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
            "People always say I am stubborn like it is a bad thing. Yeah, I do not change my mind easily. But that is because I think things through before I decide. Once I make a decision, I stick with it. Is that stubborn or is that having principles? There is a difference. I think. Actually, no, my wife says I am just stubborn. And she is probably right. She usually is.",
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
            "You would never guess it but he hates being alone. He acts all tough and independent but the second everyone leaves, he is texting people asking what they are doing tonight. I caught him looking sad at closing time once and when I asked what was wrong he said, nothing, I just do not feel like going home to an empty apartment. That kind of broke my heart a little.",
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
            "Here is what I have learned after all these years. There is no right personality type. Some people are loud, some are quiet. Some are emotional, some are logical. And none of that makes anyone better or worse. The best groups have a mix of everything. Look at us. We are completely different people and somehow it works. That is the beauty of it. If everyone were the same, life would be incredibly boring.",
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
            "I have to show you this video. My grandson took his first steps on Saturday and my daughter caught it on camera. Look at him. He is wobbling all over the place like a tiny drunk person. He took three steps and then just fell on his butt and started laughing. I have watched this video maybe two hundred times and I get emotional every single time. I am not ashamed to admit it.",
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
            "My wife and my mother? They are civil. That is the nicest word I can use. They are polite to each other but there is this tension underneath that everybody can feel but nobody talks about. My mother thinks my wife spoils the kids. My wife thinks my mother meddles too much. And I am stuck in the middle trying not to take sides. Being a husband is basically being a diplomat for life.",
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
            "Do you have siblings? I am asking because I am an only child and I always wondered what it would be like to have a brother or sister. People who have siblings always complain about them but deep down I think they would not trade it for anything. I used to be jealous of kids who had brothers because they always had someone to play with. I had to entertain myself. Which explains a lot about my personality, honestly.",
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
            "I swore when I was twenty that I would never turn into my father. And now look at me. I say the same things he used to say. I make the same face when I am annoyed. I even stand the same way. Last week my daughter said, you sound just like grandpa, and I had a full existential crisis. I stared at the mirror for ten minutes trying to see if I looked like him too. I did. It is over. I am him.",
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
            "My mom still calls me every single day to ask if I ate dinner. I am twenty-eight years old. She also tracks my location on her phone, which I did not know about until she called me at eleven at night asking why I was still at a bar. I was like, how do you even know where I am? And she just said, a mother always knows. That was terrifying. I love her but I need boundaries.",
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
            "I live forty minutes from my parents and I see them like once every two months. That is terrible, right? I keep telling myself I should visit more but weekends come and I am tired and I just want to stay home. And then I feel guilty about it. My mom never says anything but I know she wants me to come over more. I should call her. Actually, I should just go. Calling is not enough. I will go this weekend. Probably.",
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
            "My daughter used to think I was the coolest person in the world. Now she acts like my existence is an inconvenience. I said good morning yesterday and she rolled her eyes. Rolled her eyes! At good morning! I tried to give her a hug and she dodged it like I was throwing a punch. My wife says it is normal and she will grow out of it. I hope so because right now I am living with a tiny angry roommate who hates me.",
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
            "My parents never told me what to do. Like, ever. I could stay out as late as I wanted, eat whatever I wanted, do whatever I wanted. Some people think that sounds amazing but honestly it was kind of lonely sometimes. I wished they cared more. Now that I am older I realize they trusted me, which is a form of love. But as a kid I just thought they did not care.",
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
            "There is this moment in every person's life where you catch yourself saying something your parents used to say and you realize, oh no, they were right all along. Everything they told me that I thought was annoying or wrong turned out to be completely accurate. Do not stay up too late. Save your money. Be careful who you trust. All of it. They were right about all of it. It just took me twenty years to figure that out.",
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
            "Wait, you have grandkids and you have not shown us a single picture? What kind of grandfather are you? Pull out your phone right now. I want to see them. I bet they are adorable. Actually, all grandparents think their grandkids are adorable even when they are not. But I will be honest with you. If they are ugly, I will still say they are cute because that is what friends do.",
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
            "So these two idols, they have been best friends since kindergarten. Like, they lived on the same street, went to the same school, and even debuted in the same group. Can you imagine? Going through all of that together from age five to now? That is over fifteen years of friendship. I cannot even keep a plant alive for fifteen months. Let alone a friendship.",
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
            "Honest question. How many people can you actually call at three in the morning and they would pick up? Not just pick up, but actually be worried about you and come help if you needed it. I think that number is your real friend count. And for most people it is like two or three. Maybe just one. That is not sad. That is normal. Quality over quantity.",
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
            "We used to be super close but then something happened and now things are just weird between us. We still see each other because we have mutual friends but it is not the same. The conversations are forced, we avoid eye contact, and there is always this elephant in the room that nobody addresses. I hate it. I wish we could just go back to how things were but I do not know how to fix it.",
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
            "It is funny how friendships work. Like, I met Yuki through a friend of a friend at a random party. We talked for five minutes and exchanged numbers. Now she is one of my closest friends. But there are other people I have met the exact same way and I cannot even remember their names. It is completely random. You never know which acquaintance is going to become a real friend.",
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
            "Sometimes you have to let people go. I had this friend who was just toxic. Everything was always about them. When something good happened to me, they could not be happy for me. When something bad happened, they made it about themselves. I spent years trying to make it work but eventually I just had to walk away. It felt terrible at first but honestly my life got so much better after.",
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
            "I messed up and I know I need to apologize but I am too proud to go first. Which is stupid because the longer I wait, the harder it gets. We have not talked in three months and at this point I am not even sure if she wants to hear from me. But I miss her. She was my best friend and I let a stupid argument ruin everything. I need someone to just push me to pick up the phone.",
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
            "Those two are wild. They finish each other's sentences, they have inside jokes nobody else understands, and they can communicate with just a look. I asked one of them something once and the other one answered. Like, how? How do you know what someone else is thinking? That is either the most beautiful friendship or the most terrifying thing I have ever seen. I cannot decide.",
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
            "The friendships that last the longest are the ones where both people understand boundaries. You do not have to talk every day. You do not have to share everything. Sometimes you just need space. And the best friends are the ones who get that. You can go weeks without talking and when you finally do, it is like no time has passed at all. That is the real test of a friendship.",
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
            "How do I explain to someone who does not know K-pop why this group is special? It is not just the music. It is the way they support each other, the way they cry together on stage, the friendship behind the scenes. I watched this documentary where two members talked about how they almost quit but the other one convinced them to stay. I was sobbing. I need English words that capture that but everything I say sounds too simple.",
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
            "I have had money and I have had no money. I have had success and I have had failure. And through all of it, the one constant was the people who stuck around. These guys right here. They showed up when things were good and they showed up when things were terrible. You cannot buy that. You cannot fake it. Real friendship is the most valuable thing in life and I am not just saying that because I am getting sentimental.",
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
            "Alright, listen up. We have been learning about describing people all week. Now it is time for a test. Each of you is going to describe one person in this room using only English. No Japanese allowed. Be honest. Be specific. And if you describe me as old, you are paying double for your drinks tonight. I am kidding. Mostly.",
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
            "Okay, um, let me think. He is... how do you say it... he looks scary and he yells a lot but like, not in a mean way? More like in a caring way? Like when he tells me to study harder, it is because he actually wants me to improve, not because he is being mean. He is like a... what is the word... tough love kind of person? Is that right? Did I say that right?",
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
            "Can I just use a Japanese word? Because there is no English equivalent. He is a textbook tsundere. Acts all grumpy and tough but then secretly does nice things when he thinks nobody is looking. Last week he made extra food for me because he said I looked tired. But when I thanked him, he said it was just leftovers. It was not leftovers. I saw him cooking it fresh. He is not fooling anyone.",
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
            "Lisa is that person everyone wishes they had in their life. She is calm when everyone else is panicking, she gives great advice without being preachy, and she somehow always knows exactly what to say. If I had to describe her in one phrase, it would be the glue that holds this group together. Without her, we would fall apart in about three days. Maybe two.",
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
            "Takeshi is like a human speaker system. You always know when he is in the building because you can hear him three rooms away. He talks loud, he laughs loud, he even eats loud. But here is the thing, take away the noise and the room feels empty. He brings the energy. Without him it is just a bunch of quiet people sipping drinks and staring at their phones. So yeah, he is loud. But we need his kind of loud.",
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
            "You know how some people fill a room with noise and some people fill it with presence? Kenji is the second type. He sits in the corner, barely says anything, but somehow you always know he is there. And when he does speak up, everybody stops and listens because you know it is going to be something worth hearing. He could say five words and it would carry more weight than Takeshi's five hundred.",
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
            "If you could bottle Mina's energy and sell it, you would be a billionaire. She walks in and suddenly everything feels more alive. She is always excited about something, always sharing something on her phone, always laughing at full volume. I get tired just watching her sometimes. But this place would not be the same without her. She keeps us young. Well, she keeps me feeling slightly less old.",
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
            "Wait wait wait. Kenji said I am loud? That is it? That is my entire personality to you? Just loud? I am way more than loud. I am funny, I am generous, I am... okay, I am loud. But I am other things too! Like, I have depth! I have layers! I am like an onion! A very loud onion but still an onion. You guys are the worst. I am never describing any of you nicely ever again.",
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
            "This exercise made me realize something. When I describe someone in Japanese, I can use words like tenshin or majime or genki and everyone immediately gets it. But in English, those words do not exist as single concepts. You have to explain them with like five words minimum. And even then, something gets lost. It is not that English is missing the words. It is that the concepts are packaged differently. That is actually kind of fascinating.",
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
            "Not bad, not bad at all. You know what, I am actually impressed. A month ago none of you could describe a person in English without switching to Japanese every three words. Today you held entire conversations. That is real progress. Do not let up now. Next week we are going to tackle something even harder. But for tonight, drinks are on the house. You earned it. Now stop looking at me like that. I am not getting soft.",
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
