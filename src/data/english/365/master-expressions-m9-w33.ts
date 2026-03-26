/**
 * 365 English Master -- Month 9 Week 33: 話を始める (Starting Stories)
 * Days 241-247: 70 expressions
 * Month: December 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 9 (2026-12) -- WEEK 33
// ============================================================

export const MONTH9_W33_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 241: 昔の話をする (Talking About the Old Days)
    // Scene: 居酒屋で懐かしい話が止まらない夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 241, japanese: 'そういえば昔さ',
        english: [
            'That reminds me.',
            'You know, that reminds me of something.',
            'Oh wait, that reminds me. I have a story from way back.',
            "OK so this might be totally off topic but what you just said reminded me of this thing that happened to me years ago. I have not thought about this in forever but it is actually a really good story. So basically what happened was, I was still living in my old apartment at the time, and one night I hear this crazy noise from upstairs and I just froze.",
        ],
        context: '日本語の「そういえば」は話題を唐突に変えても許される魔法の言葉だが、英語では that reminds me で「今の話がきっかけで思い出した」という理由付けが必要。理由なく話題を変えると rude に聞こえるリスクがある。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: '昔は全然違ったよ',
        english: [
            'It used to be different.',
            'Things were completely different back then.',
            'You would not even recognize this place. It used to be totally different.',
            "I am telling you, it was a completely different world back then. Like, you would not believe how much things have changed. I am not saying it was better or worse, it was just different. The whole vibe was different. People actually talked to each other on the train. Nobody had smartphones. You just stared out the window and that was entertainment.",
        ],
        context: 'used to は「かつては~だった（今は違う）」を一発で伝える超便利構文。日本語の「昔は」にはこの「今は違う」が明示されないが、英語では used to の中に自動的に含まれる。I am not saying it was better と先に断るのが英語の老害回避テクニック。',
        character: 'master', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: 'あの頃は若かったなあ',
        english: [
            'We were so young.',
            'We were so young and clueless back then.',
            'Man, we were so young. We had absolutely no idea what we were doing.',
            "It is funny looking back. We were so young and we thought we knew everything. We had zero clue. I mean, I was making like two hundred thousand yen a month and I thought I was rich. I was going out every single weekend, spending money like it was nothing. If I could go back and tell my younger self one thing, it would be start saving now, you absolute idiot.",
        ],
        context: 'clueless は「何も分かっていない」でカジュアルに自虐するときに最高の単語。looking back は「振り返ると」で昔話の定番フレーズ。英語では若い頃の自分を笑い飛ばすスタイルが好まれる。日本語の「若気の至り」を一言で言う英語はない。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: 'いつ頃の話？',
        english: [
            'When was this?',
            'Wait, when exactly was this?',
            'Hold on, when did this happen? Like what year are we talking about?',
            "OK wait, I need to get the timeline straight. When exactly was this? Was this before or after you moved to Tokyo? Because I feel like there are two different eras of your life and I always get them mixed up. Were you still at your old job? Give me some context or I am going to get completely lost here.",
        ],
        context: '英語のストーリーテリングではリスナーが when, where を積極的に確認する。日本語の「黙って最後まで聞く」文化とは真逆。途中で質問するのは「興味がある証拠」であり失礼ではない。get the timeline straight は「時系列を整理する」。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: '今思えば恥ずかしい',
        english: [
            'Looking back, so embarrassing.',
            'I cringe every time I think about it.',
            'Honestly, looking back on it now, I am kind of embarrassed.',
            "Oh my god, do not even get me started. Every time I think about it, I physically cringe. Like, I literally cannot believe I did that. It haunts me. Sometimes I am just lying in bed at night and my brain randomly decides to replay that exact moment and I just want to disappear into the mattress. You know that feeling? That is my life.",
        ],
        context: 'cringe は元々「身をすくめる」だが、今は形容詞的にも使われる。That is so cringe.=「あれはキツい」。haunts me は「つきまとう」で、英語では恥ずかしい記憶が幽霊のように追いかけてくるイメージ。日本語の「黒歴史」にぴったりの英語は存在しない。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: '信じられないかもしれないけど',
        english: [
            'You might not believe this.',
            'This is going to sound crazy, but...',
            'I know this sounds unbelievable, but I swear it actually happened.',
            "OK so I know this is going to sound absolutely insane and you are probably going to think I am making this up, but I promise you every single word of this is true. I could not make this up if I tried. Honestly, if someone told me this story I would not believe them either. But hand to god, this actually happened. You ready? OK so...",
        ],
        context: 'I swear は「誓って本当」。hand to god は「神に誓って」で信憑性を強調。you might not believe this は話を始める前の前振りとして超定番。日本語と違って英語では「嘘みたいな本当の話」は先に信憑性の保証をするのがマナー。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: 'それ何回も聞いたよ',
        english: [
            'I have heard that before.',
            'You have told me this story like ten times.',
            'Wait, you have told me this exact story before. Multiple times actually.',
            "I swear you have told me this story at least ten times. I could probably tell it better than you at this point. I know all the details. I know the punchline. I know where you pause for dramatic effect. It is still a good story though, I will give you that. Go ahead, tell it again. I will pretend I have never heard it.",
        ],
        context: '英語では「何回も聞いた」と言うのは必ずしも失礼ではなく、仲の良さの証拠にもなる。I could tell it better than you は親友間のツッコミ。日本語だと「もう聞いた」は話を止める効果が強いが、英語では tell it again とフォローするのが友達。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: '懐かしいね',
        english: [
            'Good times.',
            'Man, that takes me back.',
            'Wow, that really takes me back. Those were good times.',
            "Oh man, that takes me back. I had completely forgotten about that. We had some really good times back then, did we not? Like, we did not even realize how good we had it. We were just living in the moment without a care in the world. I miss that sometimes. Not the actual situation, just the feeling, you know?",
        ],
        context: '日本語の「懐かしい」は一語で完結する超便利な形容詞だが、英語にはこれに対応する一語がない。nostalgic は少し重い。takes me back が最もカジュアルで自然。good times は過去を美化するニュアンスが入る。この翻訳ギャップは日本人学習者の定番つまずきポイント。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: '時代が変わったよね',
        english: [
            'Times have changed.',
            'Things are so different now, right?',
            'It is crazy how much things have changed. Like, a completely different era.',
            "It is wild when you actually stop and think about how much the world has changed. I mean, when we were kids, there was no internet. Can you imagine? No Google, no YouTube, no nothing. If you wanted to know something you had to go to the library. The actual library. With books. Kids today have no idea what that was like. I am not complaining, it is just objectively insane how fast everything moved.",
        ],
        context: 'times have changed は直訳的だが自然な英語。era は「時代」で a completely different era は「まるで別の時代」。英語では世代間の変化を語るとき kids today have no idea が定番のフレーズ。I am not complaining は「文句を言っているわけではない」という保険。',
        character: 'master', category: 'social', month: '2026-12',
    },
    {
        daySlot: 241, japanese: 'あの店まだあるかな',
        english: [
            'Is that place still there?',
            'I wonder if that place is still around.',
            'Do you think that place is still open? I have not been there in years.',
            "I wonder if that place is still around. We used to go there all the time, remember? That little ramen shop on the corner. It had the best tonkotsu in the area. I would kill to go back there one more time. Although knowing my luck, it is probably a parking lot now. That is what happens to all the good places. They disappear and get replaced by something nobody asked for.",
        ],
        context: 'still around は「まだ存在している」。is it still there と is it still open はニュアンスが違う。there は物理的に建物があるか、open は営業しているか。I would kill to は「~のためなら何でもする」の超カジュアル版。日本語の「あるかな」の独り言的な感じは I wonder if で出せる。',
        character: 'yuki', category: 'social', month: '2026-12',
    },

    // ────────────────────────────────────────────────────
    // DAY 242: 子供の頃の話 (Childhood Stories)
    // Scene: 居酒屋で子供時代の思い出話に花が咲く夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 242, japanese: 'うちは厳しかったから',
        english: [
            'My parents were strict.',
            'My parents were super strict growing up.',
            'I had really strict parents, so I was not allowed to do much as a kid.',
            "My parents were insanely strict. Like, I had a curfew until I was in high school. All my friends would be out playing and I had to be home by five. Five! In elementary school I could not even have sleepovers. My mom was convinced that something terrible would happen if I slept at someone else is house. I rebelled hard once I got to college though. Classic.",
        ],
        context: 'strict parents は万国共通の話題。curfew は「門限」で日本語とほぼ同義。英語では strict に対して I rebelled（反抗した）がセットで語られることが多い。日本語の「うちは」は my family was/my parents were で訳すが、主語が明確でないと英語では成立しない。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: 'どこで育ったの？',
        english: [
            'Where did you grow up?',
            'So where did you grow up exactly?',
            'Wait, where did you actually grow up? I do not think you have ever told me.',
            "Hold on, I just realized I do not actually know where you grew up. Like, I know you live in Tokyo now obviously but were you born here? Or did you move here later? I feel like I should know this by now. We have been drinking together for how long and I do not even know this basic thing about you. That is kind of embarrassing on my part.",
        ],
        context: 'Where did you grow up? は Where are you from? より深い質問。from は出身地を聞くだけだが、grow up は「どういう環境で育ったか」まで含む。I should know this by now は「もう知っているべきなのに」で、長い付き合いなのに知らなかったことへの自虐。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: '兄弟はいる？',
        english: [
            'Do you have siblings?',
            'Do you have any brothers or sisters?',
            'Are you an only child or do you have siblings?',
            "Wait, do you have any siblings? I always assumed you were an only child for some reason. I do not know why. Maybe it is your personality. Only children have this certain vibe about them, you know? They are usually pretty independent. Not in a bad way. My sister and I fought constantly growing up but I would not trade her for anything. Siblings are weird like that.",
        ],
        context: 'siblings は兄弟姉妹をまとめた便利な単語。日本語では「お兄さん？弟？」と上下関係を聞くが、英語では older/younger で後から聞く。only child は「一人っ子」。I would not trade her for anything は「何があっても彼女と交換しない」=大切な存在。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: '放課後何してた？',
        english: [
            'What did you do after school?',
            'What did you do after school as a kid?',
            'So what was your go-to thing after school? Like did you have clubs or just go home?',
            "What did you do after school growing up? Were you a club kid or did you just go straight home? I was in the baseball team so I basically lived at school until like seven every day. I did not have time for anything else. Looking back, I kind of wish I had more free time to just be a kid. But honestly, those were some of the best years of my life. I just did not appreciate it at the time.",
        ],
        context: 'after school は日本語の「放課後」にほぼ対応。go-to は「定番の」。club kid は「部活の子」。英語では what did you do は具体的な行動を期待する質問で、日本語のように「別に」と答えると会話が死ぬ。具体例で答えるのが英語圏のマナー。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: '初恋の話しようよ',
        english: [
            'Let us talk about first crushes.',
            'OK everyone, first crush stories. Go.',
            'Come on, everyone has a first crush story. Who is going first?',
            "Alright, we are doing this. First crush stories. Everyone has one and everyone is embarrassed about it. That is the whole point. I will go first if nobody else wants to. Mine was in second grade. This kid named Yuta. He shared his eraser with me once and I was absolutely convinced we were going to get married. I was seven. Do not judge me. Your turn.",
        ],
        context: 'crush は「片思いの相手」。first love より軽くて使いやすい。have a crush on someone は「~に片思いする」。英語では恋バナの入りとして first crush は定番トピック。do not judge me は「引かないでね」で恥ずかしい話の後に使う鉄板フレーズ。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: '実家に帰りたくなる',
        english: [
            'I miss home sometimes.',
            'This kind of talk makes me miss home.',
            'Talking about this stuff always makes me want to go back home for a visit.',
            "I do not know, every time we have this kind of conversation I get this weird wave of homesickness. I think about my mom is cooking and my old room and just the whole atmosphere of being home. Tokyo is great and all but there is something about the place you grew up in. It just hits different. Maybe I should go back for a weekend soon. I have not been home in like four months.",
        ],
        context: 'homesickness は「ホームシック」。miss home は「実家が恋しい」。hits different は最近のスラングで「特別な感じがする」。日本語の「実家」は childhood home か parents place で訳す。home alone だと「一人暮らし」になるので注意。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: 'あの先生覚えてる？',
        english: [
            'Remember that teacher?',
            'Do you remember that one teacher we had?',
            'Hey, do you guys remember that one teacher? The really strict one from third grade?',
            "Oh my god, do you remember that teacher we had in third grade? The one who always wore the same brown jacket every single day? He was terrifying. He would slam his hand on the desk when someone fell asleep and the entire class would jump. But actually, looking back, he was probably the best teacher I ever had. I learned more in his class than any other year. Funny how that works.",
        ],
        context: 'remember は自力で思い出す。remind は何かがきっかけで思い出させる。日本語の「覚えてる？」は remember。the one who は「あの~な人」で特定する方法。looking back, he was probably the best は英語の昔話で「振り返ると実は良い先生だった」パターンの定番。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: '小さい頃の写真ある？',
        english: [
            'Got any childhood photos?',
            'Do you have any pictures from when you were a kid?',
            'Wait, do you have any old photos on your phone? From when you were little?',
            "Do you have any childhood photos on your phone? Or at your parents place or something? I love seeing people is old photos. You can always tell who was a weird kid just from the pictures. Like, some kids just have that look in their eyes. You know what I mean? That slightly unhinged energy. I bet you were one of those kids. Do not even try to deny it.",
        ],
        context: 'childhood photos は「子供の頃の写真」。英語では pictures も photos も同じ意味で使う。unhinged は「ちょっとヤバい」で最近よく使われるスラング。do not even try to deny it は「否定しようとすらするな」で友達へのツッコミ。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: '子供の頃に戻りたい',
        english: [
            'I wish I was a kid again.',
            'Sometimes I just want to be a kid again.',
            'Honestly, I would give anything to go back to being a kid for just one day.',
            "Do you ever just want to go back? Like, not permanently, but just for one day. Wake up on a Saturday morning with zero responsibilities. Watch cartoons. Eat cereal. Go play outside with your friends until the sun goes down. No bills, no deadlines, no existential dread. Just pure bliss. That is the dream. Adults have it all wrong. We spend our whole childhood wanting to grow up and then our whole adulthood wishing we were kids again.",
        ],
        context: 'I wish I was は仮定法で「~だったらいいのに」。I would give anything は「何でも差し出す」=それくらい望んでいる。existential dread は「存在論的な恐怖」=大人特有の漠然とした不安。日本語の「戻りたい」は英語では go back to being a kid と長くなる。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 242, japanese: '夏休みが一番楽しかった',
        english: [
            'Summer break was the best.',
            'Summer vacation was the best part of being a kid.',
            'Nothing will ever top summer break as a kid. That was peak happiness.',
            "Summer vacation as a kid was genuinely the peak of human existence. I am convinced of this. Six weeks of absolutely nothing. You wake up whenever you want. You eat whatever you want. You go wherever you want. The only deadline was getting home before it got dark. And even that was flexible. I spent entire summers just riding my bike around the neighborhood doing absolutely nothing. And it was perfect. Perfection.",
        ],
        context: 'peak は「頂点」。peak happiness は「最高の幸福」。nothing will ever top は「これを超えるものはない」。日本語の「一番楽しかった」は英語だと the best, the greatest, peak, nothing tops it と選択肢が豊富。summer break と summer vacation は同義。',
        character: 'lisa', category: 'social', month: '2026-12',
    },

    // ────────────────────────────────────────────────────
    // DAY 243: 面白い話がある (I Have a Funny Story)
    // Scene: 居酒屋で笑い話大会が勃発する夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 243, japanese: '面白い話があるんだけど',
        english: [
            'I have a funny story.',
            'Oh man, I have the funniest story for you.',
            'OK you guys are going to love this. I have the best story.',
            "OK OK OK, stop everything. I have a story and you are all going to die laughing. This happened like two days ago and I have been waiting for the perfect moment to tell it. I could not tell anyone at work because it involves my boss. So you guys are the first people hearing this. Are you ready? Make sure you are not drinking anything because you might spit it out. OK here we go.",
        ],
        context: 'you are going to die laughing は「笑い死にするよ」で英語でも日本語でも同じ大げさ表現。stop everything は「全部止めて」で注目を集める前振り。spit it out は普通「言えよ」だが、ここでは文字通り飲み物を噴き出す意味。英語は前振りが長いほど期待値が上がる文化。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: 'ちょっと盛ってない？',
        english: [
            'Are you exaggerating?',
            'You are totally exaggerating right now.',
            'Hold on, there is no way that actually happened. You are definitely exaggerating.',
            "OK I am calling it. You are one hundred percent exaggerating. There is absolutely no way that happened exactly like that. I know you. You always add extra details that did not actually happen. Remember last time? You said the fish was this big and it turned out to be like a sardine. I love your stories but I need to apply at least a forty percent discount to everything you say.",
        ],
        context: 'exaggerate は「大げさに言う」「話を盛る」。日本語の「盛る」にぴったり。embellish は上品な同義語。apply a discount は「割引を適用する」=「話半分に聞く」のユーモア表現。calling it は「断言する」。英語では話を盛る友人にツッコむのが笑いのパターン。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: 'で、オチは？',
        english: [
            'So what is the punchline?',
            'OK so where is this going? What is the punchline?',
            'I have been listening for five minutes. Please tell me there is a punchline.',
            "Listen, I love you but you have been talking for like five straight minutes and I still do not know where this is going. Is there a punchline? Please tell me there is a punchline. Because if this is one of those stories where the ending is and then I went home, I am going to be very disappointed. I have invested time and emotional energy into this story. I need a payoff.",
        ],
        context: 'punchline は「オチ」で日本語と完全対応する珍しい例。punch+line=パンチのあるセリフ。payoff は「見返り」「報われること」。英語ではオチのない話を shaggy dog story（長くてオチのない話）と呼ぶ。日本語の「で？」は so? or and? で済むが英語では待てない感じを出す。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: '話それすぎ！',
        english: [
            'You are getting sidetracked.',
            'Wait, you are totally going off track here.',
            'Hold on, hold on. You got completely sidetracked. Go back to the main story.',
            "Whoa whoa whoa, stop. You just went on like three different tangents. We started with the story about your coworker and somehow we ended up talking about your dentist appointment. How did we get here? Can we please go back to the original story? I need closure. You cannot just leave a story hanging like that. It is cruel.",
        ],
        context: 'sidetracked は「脱線する」。tangent も同義で go off on a tangent は「話が脱線する」。closure は「区切り」「終わりの納得感」。leave something hanging は「宙ぶらりんにする」。日本語の「話それすぎ」は英語だと you are going off topic/getting sidetracked。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: '腹抱えて笑った',
        english: [
            'I was dying laughing.',
            'I literally could not stop laughing.',
            'I laughed so hard I could not breathe. My stomach hurt for like an hour.',
            "I am not even joking, I laughed so hard that actual tears were coming down my face. Like, not a cute little giggle. Full on ugly crying laughter. People were staring at me on the train and I could not stop. The more I tried to stop the worse it got. I had to get off two stops early because I was making a scene. My stomach muscles hurt for the rest of the day. It was that funny.",
        ],
        context: 'dying laughing は「笑い死にしそう」。could not breathe は「息ができないくらい」。ugly crying は「ブサイクに泣く」で笑いすぎて泣く様子。making a scene は「騒ぎを起こす」。日本語の「腹抱えて」は英語では my stomach hurt で直訳可能な珍しいケース。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: '全部話してよ',
        english: [
            'Tell me everything.',
            'Come on, spill it. I want all the details.',
            'Do not leave anything out. I want the full story with all the details.',
            "Nope, you do not get to just hint at a story and then not tell it. That is not how this works. You opened this door, now walk through it. I want every single detail. Start from the beginning. Who was there, what happened, what did they say, what was the exact facial expression. I want the director is cut. The extended edition. Leave nothing out. I have got time and I have got beer. Go.",
        ],
        context: 'spill it は「全部話せ」。spill は「こぼす」で秘密をこぼす=全部話す。spill the beans も同義だがやや古い。the director is cut は映画の「ディレクターズカット」から。leave nothing out は「何も省くな」。英語では「全部聞きたい」とはっきり要求するのが普通。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: 'あれは笑えた',
        english: [
            'That was hilarious.',
            'Oh man, that was absolutely hilarious.',
            'I still laugh every time I think about that. It was so funny.',
            "That story never gets old. Like, I have heard it probably twenty times and I still crack up every single time. It is the way you tell it too. You have this perfect timing where you pause right before the good part and everyone is just on the edge of their seat. You should do stand-up comedy. I am being serious. You have a gift. A gift for making people spit out their drinks.",
        ],
        context: 'hilarious は funny の最上級。never gets old は「何度聞いても面白い」。crack up は「爆笑する」。on the edge of their seat は「ハラハラして前のめりになる」。stand-up comedy は「漫談」。日本語の「あれは笑えた」のシンプルさは英語だと that was hilarious で十分だが、理由を添えるのが自然。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: 'それ本当の話？',
        english: [
            'Is that a true story?',
            'Wait, did that actually happen?',
            'Hold on, is this for real? This is not something you made up?',
            "OK I need to know right now. Is this a true story or are you messing with us? Because the last time you told us something unbelievable it turned out you saw it on TV and just changed the character to yourself. I am not falling for that again. Look me in the eyes and tell me this actually happened. To you. In real life. Not in a movie, not on TikTok, not to your friend is friend.",
        ],
        context: 'is this for real は「マジ？」。messing with us は「からかっている」。made up は「作り話」。falling for は「騙される」。英語では面白すぎる話に対して is this real? と聞くのは褒め言葉でもある。日本語の「本当の話？」と完全対応するが、英語の方がしつこく確認する傾向がある。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: '笑いすぎてお腹痛い',
        english: [
            'I cannot stop laughing.',
            'My stomach hurts from laughing so hard.',
            'Please stop. I am begging you. My abs hurt from laughing.',
            "You need to stop. Seriously, my entire body hurts from laughing. My abs, my jaw, everything. I think I pulled a muscle. Is that even possible? Can you actually injure yourself from laughing too hard? Because I think I just did. I am going to blame you for my hospital bill if I have to go see a doctor about this. This is your fault. You and your stupid stories.",
        ],
        context: 'abs は abdominal muscles（腹筋）の略。pulled a muscle は「筋肉を痛める」。英語では笑いすぎて身体的にダメージを受ける表現が豊富。it is your fault は「お前のせいだ」で愛情のあるツッコミ。日本語の「笑いすぎ」は英語では laughed too hard/too much。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 243, japanese: '誰にも言わないでね',
        english: [
            'Do not tell anyone.',
            'This stays between us, OK?',
            'Seriously, this does not leave this table. Promise me.',
            "OK I am being dead serious right now. What I just told you does not leave this table. If this gets back to the person I am talking about, I am absolutely done for. Like, career over, friendship over, everything over. I am trusting you guys with my life here. And yes I know I say that every time but this time I actually mean it. Pinky swear. All of you. Right now.",
        ],
        context: 'this stays between us は「ここだけの話」。does not leave this table は「このテーブルから出さない」。done for は「終わり」。pinky swear は「指切りげんまん」。英語の秘密の約束は日本語より大げさに言う傾向がある。trust you with my life は「命を預けている」レベルの信頼表現。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },

    // ────────────────────────────────────────────────────
    // DAY 244: 怖い話 (Scary Stories)
    // Scene: 居酒屋の照明を落として怪談タイムが始まる
    // ────────────────────────────────────────────────────

    {
        daySlot: 244, japanese: '怖い話していい？',
        english: [
            'Can I tell a scary story?',
            'You guys want to hear a scary story?',
            'OK mood change. Who wants to hear a scary story? Fair warning, this one is real.',
            "Alright listen up. I have been saving this story for the right moment and I think this is it. Everyone put your drinks down. Get comfortable. And just so we are clear, this is not something I read online or saw in a movie. This actually happened to me. And no, I am not exaggerating this time. I still get chills thinking about it. Mina, you OK? You look scared already and I have not even started yet.",
        ],
        context: 'fair warning は「先に言っておくけど」。get chills は「ゾッとする」。you look scared already は英語の怪談の前振りテクニック。日本語の「していい？」は can I が直訳だが、英語では who wants to hear と全員を巻き込む形にする方が自然。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: '背筋がゾッとした',
        english: [
            'I got the chills.',
            'A chill just ran down my spine.',
            'I literally just got goosebumps. Look. My arm. Right now.',
            "OK I literally have goosebumps right now and you can physically see them on my arm. Look at this. This is your fault. My entire body just went cold. You know that feeling when every hair on your body stands up at the same time? That just happened. And the worst part is we are in a well-lit izakaya with like fifty people around and I am still terrified. Imagine hearing this alone at night.",
        ],
        context: 'goosebumps は「鳥肌」で goose（ガチョウ）の皮膚から。chill down my spine は「背筋を寒気が走る」。英語でも日本語でも恐怖は身体反応で表現する点が共通。every hair stands up は「全身の毛が逆立つ」。英語では恐怖の証拠を物理的に見せる（腕の鳥肌）のが怪談のリアクション。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: '夜中にそれは怖い',
        english: [
            'That is terrifying at night.',
            'Imagine experiencing that in the middle of the night.',
            'If that happened to me at like three in the morning, I would absolutely lose it.',
            "Nope. Nope nope nope. If that happened to me at three in the morning I would literally pack a bag and leave my apartment forever. I am not even joking. I would call my mom, I would call the police, I would call a priest. Probably in that order. I do not care if I look crazy. Self-preservation comes first. You cannot pay me enough money to be in that situation. Not a chance.",
        ],
        context: 'lose it は「パニックになる」。self-preservation は「自己保存本能」。nope は no の強調版で繰り返すと恐怖や拒否を強調。you cannot pay me enough は「いくら積まれても無理」。英語の怖い話リアクションでは大げさに「逃げる宣言」をするのが定番。日本語の「無理無理無理」に相当。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: 'それ作り話でしょ',
        english: [
            'You made that up.',
            'There is no way that is real. You totally made that up.',
            'OK come on, that cannot be real. You are just trying to scare us.',
            "I am going to need some evidence because there is absolutely no way that actually happened. You are a known exaggerator. Your track record is not great here. Remember the ghost story from last year? You had us all terrified and then it turned out you dreamed the whole thing. You literally scared us with your dream and did not tell us until the next day. I have trust issues now because of you.",
        ],
        context: 'track record は「実績」「前歴」。trust issues は「信頼の問題」でカジュアルに使われる心理学用語。known exaggerator は「常習的に話を盛る人」。英語では怪談の後に「嘘でしょ」と突っ込むのは照れ隠し兼本気で怖かった証拠。日本語の「作り話」は made up か fiction。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: '一人で帰れなくなった',
        english: [
            'I cannot walk home alone now.',
            'Great, now I cannot walk home by myself. Thanks.',
            'You realize I have to walk home alone tonight, right? This was irresponsible.',
            "Thanks a lot. Really. Thank you so much for telling that story right before I have to walk home alone through a dark neighborhood at eleven at night. This was genuinely irresponsible of you. I am going to need someone to walk me to the station at minimum. Actually no, I am going to need someone to walk me all the way home. And check under my bed. And in my closet. I am twenty-eight years old and I am genuinely scared right now.",
        ],
        context: 'thanks a lot は皮肉で使うと「ふざけんな」の意味になる。irresponsible は「無責任」。check under my bed は子供の頃のモンスター恐怖の callback。英語では怖い話の後に「帰れない」と言うのは笑いも含んだリアクション。genuinely は「本気で」を強調。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: 'その先聞きたくない',
        english: [
            'I do not want to hear more.',
            'Stop. I do not want to know what happens next.',
            'Nope, that is enough. I am officially tapping out. Do not finish that story.',
            "Please stop. I am begging you. I already know where this is going and I do not want to hear it. Every time you tell a scary story it gets worse and worse as it goes on and I am already at my limit. My heart is literally pounding right now. Feel my pulse. I am not built for this. Some people enjoy being scared. I am not one of those people. I am the opposite of those people.",
        ],
        context: 'tapping out は格闘技の「ギブアップ」から来たスラング。at my limit は「限界」。I am not built for this は「こういうのに向いていない」で自分の弱さを認める表現。pounding は心臓がバクバクする様子。日本語の「聞きたくない」は I do not want to hear で直訳OK。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: '実際にあった話なの？',
        english: [
            'Did this really happen?',
            'Wait, is this based on something real?',
            'I need to know before you continue. Is this a true story or a ghost story?',
            "OK time out. Before you go any further I need to establish one thing. Is this something that actually happened in real life? To a real person? Or is this just a story you heard somewhere? Because if this is real, I might actually need therapy after this. And if it is fake, I am going to be really annoyed that you got my heart rate up for nothing. Either way, someone owes me something.",
        ],
        context: 'time out は「タイム」で一時中断。establish は「確認する」。therapy は比喩的に「この話のせいでカウンセリングが必要」。heart rate は「心拍数」。got my heart rate up for nothing は「無駄にドキドキさせた」。日本語の「実話？」は英語では true story? か based on something real? で聞く。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: '気味が悪いね',
        english: [
            'That is creepy.',
            'OK that is genuinely creepy.',
            'Yeah no, that is really creepy. I do not like that at all.',
            "That is not scary. That is creepy. There is a difference. Scary is like a jump scare. It is sudden and then it is over. Creepy is the kind of thing that sits in the back of your brain and slowly eats away at you for weeks. Like, you forget about it and then you are brushing your teeth at midnight and your brain goes hey, remember that thing? And suddenly you cannot look in the mirror anymore.",
        ],
        context: 'creepy と scary の違いは重要。scary は「びっくりする怖さ」、creepy は「じわじわ来る不気味さ」。jump scare は映画の「ドッキリ演出」。eats away at you は「じわじわ蝕む」。日本語の「気味が悪い」は creepy がぴったり。「怖い」とは質が違う恐怖。',
        character: 'master', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: '今夜悪夢見そう',
        english: [
            'I am going to have nightmares.',
            'Great, I am definitely having nightmares tonight.',
            'I one hundred percent know I am going to have nightmares about this tonight.',
            "You just ruined my sleep for the next three days minimum. I am not exaggerating. I am the kind of person who cannot watch horror movies because I will literally not be able to sleep for a week. And you just told me something worse than any horror movie because it is apparently real. If I have nightmares tonight, which I will, I am sending you a text at three in the morning. You are not sleeping either. We suffer together.",
        ],
        context: 'nightmare は night+mare（古英語の悪魔）。ruined my sleep は「睡眠を台無しにした」。we suffer together は「一緒に苦しもう」で道連れにする表現。英語では怖い話のリアクションとして「今夜の睡眠が終わった」宣言をするのが定番ユーモア。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 244, japanese: '話変えよう',
        english: [
            'Let us change the subject.',
            'OK can we talk about something else now please?',
            'I am done with scary stories. Someone talk about something normal. Anything.',
            "That is it. I am calling it. Scary story time is officially over. We are done. I am changing the channel. Someone please talk about literally anything else. Weather, sports, taxes, I do not care. Tell me about your grocery shopping this week. I want to hear the most boring story possible to cleanse my brain. Actually, Kenji, tell me about your accounting reports. That should put me to sleep.",
        ],
        context: 'change the subject は「話題を変える」。changing the channel は TV のチャンネルを変えるメタファー。cleanse my brain は「脳を浄化する」。英語では怖い話の後に palate cleanser（口直し）として「つまらない話をしてくれ」と頼むのがユーモアパターン。日本語の「話変えよう」はシンプルだが英語は理由付きで言う。',
        character: 'yuki', category: 'social', month: '2026-12',
    },

    // ────────────────────────────────────────────────────
    // DAY 245: 夢の話 (Talking About Dreams)
    // Scene: 居酒屋で「昨日変な夢見た」トークが始まる
    // ────────────────────────────────────────────────────

    {
        daySlot: 245, japanese: '昨日変な夢見た',
        english: [
            'I had a weird dream last night.',
            'I had the strangest dream last night.',
            'OK so I had the weirdest dream last night and I need to tell someone about it.',
            "You guys, I had the absolute weirdest dream last night and I have been thinking about it all day. Like, it felt so real that when I woke up I genuinely did not know where I was for about ten seconds. I was just lying there staring at the ceiling trying to figure out if I was still dreaming. My heart was racing. It took me a full minute to realize I was in my own bedroom. I have never had a dream that vivid before.",
        ],
        context: 'vivid は「鮮明な」で夢の描写に最適な形容詞。strangest/weirdest は「最も奇妙な」。did not know where I was は寝起きの混乱。英語では夢の話をするとき I had a dream（夢を見た）が正しく、I saw a dream は日本語からの直訳で不自然。had が正解。',
        character: 'mina', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: '同じ夢を何回も見る',
        english: [
            'I keep having the same dream.',
            'I have this recurring dream that will not stop.',
            'There is this one dream I keep having over and over. It is always the same.',
            "I do not know what is going on with my brain but I keep having the exact same dream. Like, not similar. Identical. The same location, the same people, the same sequence of events. Every single time. It is been happening for about three months now. I looked it up online and apparently recurring dreams mean your subconscious is trying to tell you something. But I have no idea what it is trying to say.",
        ],
        context: 'recurring dream は「繰り返し見る夢」。recur は「再発する」。subconscious は「潜在意識」。looked it up は「調べた」。英語では夢の話に心理学的解釈を持ち込むのが一般的。日本語の「何回も見る」は keep having で自然に訳せる。see ではなく have を使うのがポイント。',
        character: 'takeshi', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: '夢の中で気づいた',
        english: [
            'I realized I was dreaming.',
            'I became aware I was in a dream.',
            'At some point in the dream, I suddenly realized I was dreaming.',
            "OK so this is going to sound weird but at some point during the dream I actually realized I was dreaming. Like, I was fully aware that none of it was real. And the crazy part is I could kind of control what happened. I decided to fly and I actually flew. It was the most incredible feeling. Have you ever had a lucid dream? Because that is apparently what it is called and it is the wildest experience of my life.",
        ],
        context: 'lucid dream は「明晰夢」で夢の中で夢だと気づいている状態。lucid は「明晰な」。control what happened は「何が起こるかコントロールできた」。英語では lucid dreaming は Reddit やポッドキャストで超人気トピック。日本語の「気づいた」は realized で、noticed とはニュアンスが違う。',
        character: 'lisa', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: 'それ何かの暗示かも',
        english: [
            'That might mean something.',
            'I think your dream is trying to tell you something.',
            'That sounds symbolic. I bet your subconscious is trying to tell you something.',
            "OK I am no expert but I am pretty sure that dream means something. Like, dreams about falling usually mean you feel like you are losing control in some area of your life. Dreams about teeth falling out supposedly mean anxiety about your appearance or social judgment. I went through this phase where I was really into dream interpretation and some of it is actually legit. What exactly happened in yours?",
        ],
        context: 'dream interpretation は「夢判断」「夢占い」。symbolic は「象徴的な」。supposedly は「らしい」で伝聞。legit は legitimate の略で「本物の」「ちゃんとした」。英語圏ではフロイト的な夢解釈が一般常識として浸透している。日本語の「暗示」は hint/sign/symbol で訳す。',
        character: 'yuki', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: '起きたらホッとした',
        english: [
            'I was so relieved when I woke up.',
            'When I woke up, I was genuinely relieved it was just a dream.',
            'The moment I realized it was a dream, I literally sighed with relief.',
            "I cannot even describe how relieved I was when I woke up. For the first like thirty seconds I was still in that weird in-between state where you are not sure if you are awake or still dreaming. And then I felt my pillow and my blanket and heard the sound of traffic outside and I just went oh thank god. I lay there for like five minutes just being grateful that none of it was real. My heart was still pounding.",
        ],
        context: 'relieved は「安心した」「ホッとした」。sighed with relief は「安堵のため息」。in-between state は「中間の状態」で寝起きのぼんやりした時間。oh thank god は「ああ良かった」。日本語の「ホッとした」は relieved が完全対応するが、英語の方が身体反応（心臓バクバク）を添える傾向がある。',
        character: 'kenji', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: '夢か現実か分からなかった',
        english: [
            'I could not tell if it was real.',
            'It felt so real I could not tell the difference.',
            'For a solid minute, I genuinely could not tell if I was awake or still dreaming.',
            "OK so you know that feeling when you wake up from a really intense dream and for a few seconds you are like wait, did that actually happen? That was me this morning. I woke up and I was fully convinced that I had quit my job yesterday. Like, completely certain. I was lying in bed thinking about how to explain it to my parents. And then I checked my phone and saw my work emails and it slowly hit me that I had dreamed the whole thing.",
        ],
        context: 'could not tell the difference は「違いが分からなかった」。for a solid minute は「まるまる一分間」で solid は「完全な」を強調。hit me は「気づいた」のカジュアル版。日本語の「夢か現実か」は英語では dream or reality だが、日常会話では awake or still dreaming の方が自然。',
        character: 'mina', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: '夢占いって信じる？',
        english: [
            'Do you believe in dream interpretation?',
            'Do you actually believe dreams mean something?',
            'So be honest. Do you think dream interpretation is real or is it total nonsense?',
            "I go back and forth on this. Part of me thinks it is complete nonsense because dreams are just random neurons firing while you sleep. But then I will have a dream that is so specific and so relevant to what is happening in my life that I cannot help but wonder. Like, there has to be some connection, right? Your brain does not just make stuff up for no reason. Or maybe it does. I do not know. What do you guys think?",
        ],
        context: 'go back and forth は「行ったり来たりする」=「迷う」。random neurons firing は「ランダムなニューロン発火」で科学的説明。cannot help but wonder は「考えずにはいられない」。日本語の「信じる？」は英語だと do you believe in で宗教的ニュアンスも入るが、夢占いの文脈では自然。',
        character: 'lisa', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: '飛ぶ夢よく見る',
        english: [
            'I dream about flying a lot.',
            'I have flying dreams all the time.',
            'I get flying dreams pretty regularly. They are my favorite kind of dream.',
            "Am I weird for actually looking forward to flying dreams? Because I get them maybe once or twice a month and they are honestly the highlight of my sleep life. There is this one where I just take off from my apartment balcony and I can see the entire city below me. It feels incredibly real. The wind, the height, everything. And then right when I am having the time of my life, my alarm goes off. Every single time. It is devastating.",
        ],
        context: 'flying dreams は「飛ぶ夢」。highlight of my sleep life は「睡眠生活のハイライト」というユーモア表現。take off は「離陸する」。having the time of my life は「人生最高の時間を過ごしている」。devastating は「壊滅的」で目覚ましに起こされることへの大げさな表現。',
        character: 'takeshi', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: '正夢だったら怖い',
        english: [
            'Scary if it comes true.',
            'It would be terrifying if that dream came true.',
            'If that dream actually came true, I do not even want to think about it.',
            "Please do not say that. Do not even put that energy out there. If that dream actually came true I would literally move to another country and change my name. I am not even being dramatic. Some dreams are just too realistic to be coincidence. My grandmother used to say she could predict things through her dreams and honestly, based on my own experience, I am starting to think she was not crazy.",
        ],
        context: 'came true は「実現する」で夢が正夢になること。put that energy out there は「そういうことを口に出すな」で、言霊的な考え方。スピリチュアル文化が英語にも反映。日本語の「正夢」は prophetic dream が正式だがカジュアルには dream that comes true。jinx it も「口にすると実現する」系の表現。',
        character: 'yuki', category: 'feeling', month: '2026-12',
    },
    {
        daySlot: 245, japanese: '夢の話って聞くと眠くなる',
        english: [
            'Dream talk makes me sleepy.',
            'Is it just me or does talking about dreams make you sleepy?',
            'Every time we talk about dreams I start getting drowsy. Is that a thing?',
            "I do not know what it is but every single time someone starts talking about their dreams I get incredibly sleepy. Like, my eyelids get heavy and I start yawning. Is that a psychological thing? Because it happens without fail. Maybe it is because talking about sleep makes your brain think about sleep. Or maybe I am just tired. Probably the latter honestly. I only got five hours last night.",
        ],
        context: 'drowsy は「うとうとする」で sleepy よりやや文語的。yawning は「あくびをする」。without fail は「例外なく毎回」。the latter は「後者」。英語では is that a thing? は「それって普通のこと？」で共感を求める表現。日本語の「眠くなる」は get sleepy/drowsy で状態変化の get を使う。',
        character: 'master', category: 'feeling', month: '2026-12',
    },

    // ────────────────────────────────────────────────────
    // DAY 246: 「あの時さ」(Remember When)
    // Scene: 居酒屋で共通の思い出を振り返る夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 246, japanese: 'あの時さ、覚えてる？',
        english: [
            'Remember that time?',
            'Hey, do you remember that one time?',
            'Do you guys remember that time when we all went to Hakone? That was insane.',
            "Oh my god, do you guys remember that trip to Hakone? The one where Takeshi forgot to book the hotel and we ended up sleeping in the car? That was simultaneously the worst and best night of my entire life. We were freezing, we were hungry, and Kenji would not stop complaining. But honestly, looking back, that is one of my favorite memories. It is always the disasters that make the best stories.",
        ],
        context: 'remember that time when は「あの時~したの覚えてる？」で共有の思い出を引き出す定番フレーズ。simultaneously は「同時に」。it is always the disasters that make the best stories は英語の名言的フレーズ。日本語の「あの時さ」は英語では remember when で、独特のノスタルジア導入。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: 'あれは伝説だよね',
        english: [
            'That was legendary.',
            'That moment was absolutely legendary.',
            'That is hands down one of the most legendary things that has ever happened to us.',
            "That is going in the hall of fame. I am serious. If we ever write a book about our friend group, that story is chapter one. It has everything. Drama, comedy, a twist ending, and someone crying. What more could you ask for? Every time I bring it up at a party, people think I am making it up. They cannot believe it actually happened. And the best part is we have photo evidence.",
        ],
        context: 'legendary は「伝説的な」。hands down は「文句なしに」。hall of fame は「殿堂入り」。photo evidence は「写真の証拠」。英語の友達グループでは伝説的なエピソードを定期的に語り直す文化がある。日本語の「伝説」も同じ使い方だが、英語の legendary は日常的にもっとカジュアルに使われる。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: 'あの時は本当にやばかった',
        english: [
            'That was seriously intense.',
            'That whole situation was absolutely wild.',
            'Dude, that was one of the most intense experiences of my entire life.',
            "I still get a rush of adrenaline just thinking about it. Like, my palms get sweaty and my heart starts beating faster. That is how intense it was. We were completely out of our depth. None of us knew what we were doing. We were just winging it and hoping for the best. The fact that it actually worked out is a miracle. It could have gone so badly. But it did not. And here we are, laughing about it over drinks.",
        ],
        context: 'wild は「ヤバい」のポジティブ版。out of our depth は「手に負えない」。winging it は「アドリブでやる」。hoping for the best は「良い結果を祈る」。日本語の「やばかった」は良い意味にも悪い意味にも使えるが、英語では intense, wild, crazy で文脈に応じて使い分ける。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: 'もう一回やりたいね',
        english: [
            'I want to do that again.',
            'Man, I would love to do that again.',
            'We should totally do that again. Like, for real this time, not just talk about it.',
            "We always say we are going to do it again and we never actually follow through. This time I am serious. Let us actually plan it. Pick a date right now. Everyone pull out your calendars. I am not letting this turn into one of those someday things that never happens. We are not getting any younger. If we do not do it now, when? Ten years from now we will be sitting here saying the same thing. Let us just commit.",
        ],
        context: 'follow through は「最後までやり通す」。someday things は「いつかやること」で永遠に実行されないもの。we are not getting any younger は「若くなることはない」=「今やらないと」。commit は「決意する」「コミットする」。日本語の「やりたいね」は願望だが、英語の let us actually plan it は行動に移す提案。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: 'あの頃が一番楽しかった',
        english: [
            'Those were the best days.',
            'Those were honestly some of the best days of my life.',
            'I think about those days all the time. That was peak happiness for me.',
            "You know what, I think those were genuinely the happiest days of my life. And I did not even realize it at the time. That is the frustrating thing about happiness. You never appreciate it when you are in it. You only realize how good you had it after it is gone. Not that I am unhappy now. I am just saying that era was something special. We will never get that exact combination of people and circumstances again. And that is OK.",
        ],
        context: 'peak happiness は「幸福の頂点」。you never appreciate it when you are in it は英語の哲学的名フレーズ。frustrating は「もどかしい」。that exact combination は「あの組み合わせ」。日本語の「一番楽しかった」は英語だと the best days で十分だが、理由を語るのが英語圏の回顧スタイル。',
        character: 'master', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: 'あれからもう何年？',
        english: [
            'How many years ago was that?',
            'Wait, how many years has it been since then?',
            'Has it really been that long? That feels like it was just yesterday.',
            "Stop. Do not tell me how many years it has been. I do not want to know. Actually, tell me. No, do not. OK fine, tell me. Wait, that cannot be right. There is no way it has been that long. I refuse to accept that. In my head, that was like three years ago maximum. Time is moving way too fast and I would like it to stop please. Can someone talk to whoever is in charge of time?",
        ],
        context: 'how many years has it been は現在完了で「あれから何年経った？」。feels like yesterday は「昨日のことのように感じる」。I refuse to accept that は「認めない」で時間の経過への抵抗。日本語の「もう何年？」は英語でも同じショックを表現するが、英語の方がドラマチックに抵抗する。',
        character: 'mina', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: '写真残ってる？',
        english: [
            'Do you have any photos?',
            'Does anyone have photos from back then?',
            'Wait, someone has to have photos from that. Check your old phone.',
            "Somebody has to have evidence of this somewhere. Check your cloud storage. Check your old phone. Check your Facebook from 2018. There is no way we did something that epic and nobody took a single photo. Actually, knowing us, we were probably too busy having fun to take any. That is the problem with the best moments. You are too in the moment to document them. The worst moments though? Those have plenty of evidence.",
        ],
        context: 'cloud storage は「クラウドストレージ」。evidence は「証拠」で笑いを込めた使い方。too in the moment は「その瞬間に没頭しすぎて」。document は「記録する」。英語では写真がないことを too busy having fun と美化するのが定番。日本語の「残ってる？」は do you still have が自然。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: 'あの時ああしてれば',
        english: [
            'If only I had done things differently.',
            'I sometimes wonder what would have happened if...',
            'You know, I still think about what would have happened if I had made a different choice.',
            "I try not to play the what-if game because it never leads anywhere good. But sometimes I cannot help it. Like, what if I had taken that job offer in Osaka? What if I had said yes instead of no? My entire life would be completely different right now. But then I think, well, if I had done that I would not be here, drinking with you guys, and honestly this is pretty good too. So maybe everything worked out exactly how it was supposed to.",
        ],
        context: 'what-if game は「もしもゲーム」で後悔の思考パターン。if I had done は仮定法過去完了で「あの時~していたら」。played out differently は「違う展開になっていた」。everything worked out は「全部うまくいった」。日本語の「ああしてれば」は英語では if I had + 過去分詞の構文が必須。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: 'また集まろうよ',
        english: [
            'Let us get together again.',
            'We should do this more often. Seriously.',
            'OK can we make this a regular thing? Like, at least once a month?',
            "I am being completely serious right now. We need to do this more often. We always say we should get together and then three months go by before we actually do. Life gets busy, I get it. But nights like this are important. These are the moments that actually matter. Not work, not deadlines, not whatever. This. Right here. Friends, drinks, stupid stories. We need to protect this. Put it in your calendar right now. Same time next month.",
        ],
        context: 'get together は「集まる」。make this a regular thing は「これを定例化する」。life gets busy は「生活が忙しくなる」で誰もが共感する理由。protect this は「これを守る」で友情に対する真剣さ。英語では we should do this more often は別れ際の定番フレーズだが、実行されないことも含めて定番。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 246, japanese: '一瞬で過ぎたよね',
        english: [
            'It went by so fast.',
            'That whole period flew by in the blink of an eye.',
            'Looking back, it feels like that entire chapter of our lives lasted about five minutes.',
            "It is insane how fast time moves. I feel like just yesterday we were all in our twenties trying to figure out what to do with our lives. And now here we are. When did we become adults? Did I miss the memo? Nobody told me that being an adult meant sitting in an izakaya at forty talking about how fast time goes. Actually, you know what, this is exactly what being an adult is. And it is not so bad.",
        ],
        context: 'flew by は「飛ぶように過ぎた」。in the blink of an eye は「瞬きする間に」。chapter は「人生の章」。missed the memo は「連絡を見逃した」で「いつの間に」感を出す。日本語の「一瞬で過ぎた」は英語でも同様のメタファーが豊富。time flies は最も一般的。',
        character: 'master', category: 'social', month: '2026-12',
    },

    // ────────────────────────────────────────────────────
    // DAY 247: 伝説と都市伝説 (Legends and Urban Myths)
    // Scene: 居酒屋で日本の伝説や都市伝説を語り合う夜
    // ────────────────────────────────────────────────────

    {
        daySlot: 247, japanese: '言い伝えによると',
        english: [
            'Legend has it that...',
            'According to legend, it all started here.',
            'So legend has it that this place is cursed. And before you laugh, hear me out.',
            "OK so this is an actual local legend from where I grew up. Legend has it that there is this old shrine at the top of the mountain behind our town. Nobody goes there anymore because supposedly, anyone who visits after dark never comes back the same. Now, I am not saying I believe it. But I will tell you this. I went up there once when I was sixteen and I have never gone back. Make of that what you will.",
        ],
        context: 'legend has it は「言い伝えによると」で物語の始め方として最高にかっこいい。supposedly は「らしい」で伝聞。make of that what you will は「ご自由にどうぞ」で解釈を相手に委ねる。英語の伝説語りでは I am not saying I believe it と科学的立場を示しつつ話すのがパターン。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: '信じるかどうかは別として',
        english: [
            'Whether you believe it or not.',
            'Believe it or not, people swear this is true.',
            'Look, I know it sounds crazy. But there are people who genuinely believe this.',
            "I am just telling you what people say. Whether you believe it or not is completely up to you. I am not here to convince anyone. But I will say this. I have talked to multiple people who have had the same exact experience at that location. Completely independently. They do not know each other. And they described the same thing down to the smallest detail. You can call it coincidence if you want. I am not so sure.",
        ],
        context: 'whether you believe it or not は「信じるかどうかは別として」で客観性を演出。independently は「独立して」。down to the smallest detail は「最小の細部まで」。call it coincidence は「偶然と呼ぶ」。英語では都市伝説を語るとき、信憑性の根拠として「複数の独立した証言」パターンが定番。',
        character: 'master', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: '話半分に聞いてね',
        english: [
            'Take it with a grain of salt.',
            'Take this with a massive grain of salt.',
            'Just so we are clear, take everything I am about to say with a huge grain of salt.',
            "OK disclaimer before I start. I heard this from my uncle who heard it from his coworker who heard it from someone at a bar. So the source credibility is basically zero. Take everything I am about to tell you with about seventeen grains of salt. That said, it is still a great story and even if it is not true, it should be. Some stories deserve to be real even if they are not. Ready?",
        ],
        context: 'take it with a grain of salt は「話半分に聞く」。grain は「粒」。ローマ時代の塩が語源。source credibility は「情報源の信頼性」。disclaimer は「免責事項」。英語では信頼性を先に下げておいて話すテクニックがあり、期待値コントロールと呼ばれる。seventeen grains は大げさにしたユーモア。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: 'それ都市伝説でしょ',
        english: [
            'That is an urban legend.',
            'That is definitely an urban legend.',
            'I am pretty sure that is just an urban legend. I have heard like ten versions of it.',
            "That is a textbook urban legend. I have heard that exact same story except with different locations and different people. It is one of those stories that everyone swears happened to their friend is friend is cousin but nobody can actually trace it back to a real person. That is literally the definition of an urban legend. It always happened to someone you cannot verify. Convenient, right?",
        ],
        context: 'urban legend は「都市伝説」で日本語はこの英語からの借用。textbook は「教科書通りの」=「典型的な」。trace it back は「たどる」。friend of a friend は都市伝説学の用語 FOAF。convenient は皮肉で「都合がいいね」。英語では都市伝説を論理的に分解する人が必ずいる。skeptic の役割。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: '日本にはこんな話があってね',
        english: [
            'In Japan, there is this story...',
            'So in Japan, we have this really old legend about...',
            'OK so this is a legit Japanese legend that has been around for centuries.',
            "So in Japanese folklore, there is this story that has been passed down for hundreds of years. It is about this woman who appears at a crossroads at midnight. She asks travelers a question and if they answer wrong, well, let us just say it does not end well. The interesting thing is, almost every culture has some version of this. A figure at a crossroads making you choose. It is like a universal human fear or something.",
        ],
        context: 'folklore は folk（民間）+lore（知識）で「民間伝承」。passed down は「代々伝えられた」。crossroads は「十字路」で英語では人生の選択の象徴でもある。universal human fear は「人類共通の恐怖」。日本語の「こんな話があってね」は英語では there is this story で、this が「面白い話があるよ」のニュアンス。',
        character: 'kenji', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: 'そういうの信じる？',
        english: [
            'Do you believe in that stuff?',
            'Are you the type to believe in that kind of thing?',
            'Honest question. Do you actually believe in ghosts and legends and all that?',
            "Here is my thing. I do not believe in any of it on an intellectual level. Like, logically, rationally, I know there are explanations for everything. But emotionally? There is a part of me that is not a hundred percent sure. And I think most people are like that if they are being honest. You can be a complete skeptic during the day but at three in the morning when you hear a weird noise in your apartment, suddenly science is not that reassuring.",
        ],
        context: 'on an intellectual level は「知的レベルでは」。rationally は「理性的には」。skeptic は「懐疑論者」。reassuring は「安心させる」。英語では believe in ghosts は大人が真面目に議論するトピック。日本語の「信じる？」より do you believe in のほうが哲学的な重みがある。',
        character: 'yuki', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: '科学的に説明できないこともある',
        english: [
            'Science cannot explain everything.',
            'There are things science just cannot explain yet.',
            'Look, I am all for science, but some things just do not have an explanation.',
            "I am a rational person. I believe in science. I believe in evidence. But I also think it is arrogant to claim that we have figured everything out. We know like four percent of the universe. Four percent. And we are sitting here saying we know everything? Come on. There are phenomena that we cannot explain. Not because they are supernatural but because we do not have the tools or the knowledge yet. Maybe in a hundred years we will. Or maybe some things are just meant to remain mysteries.",
        ],
        context: 'arrogant は「傲慢な」。phenomena は phenomenon の複数形で「現象」。supernatural は「超自然的な」。meant to remain は「そうであるべき」。日本語の「科学的に」は scientifically だが、英語の日常会話では science cannot explain の方が自然。四パーセントは暗黒物質を含む宇宙論の参照。',
        character: 'master', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: '友達の友達から聞いた話',
        english: [
            'A friend of a friend told me.',
            'So I heard this from a friend of a friend.',
            'OK this is very much a friend-of-a-friend thing, but hear me out.',
            "Alright, I know the second I say friend of a friend you are all going to roll your eyes. I get it. It is the universal signal for this is probably not true. But I swear the person who told me this was dead serious. He had no reason to lie. He was genuinely shaken up when he told me about it. And look, maybe he was messing with me. But the look on his face when he talked about it was not the look of someone who is joking around.",
        ],
        context: 'friend of a friend は都市伝説学で FOAF と呼ばれる典型パターン。roll your eyes は「目を回す」=呆れる。dead serious は「超真剣」。shaken up は「動揺している」。英語では FOAF ソースの話は自動的に信頼度が下がるが、語り手の真剣さで補おうとするのが面白いパターン。',
        character: 'takeshi', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: 'その話、オチがすごい',
        english: [
            'That story has an amazing ending.',
            'The ending of that story is absolutely wild.',
            'If you think the story is good so far, wait until you hear how it ends.',
            "OK I know I have been building this up for a while but I promise the ending is worth it. This is one of those stories where the twist at the end completely changes everything you thought you knew. Like, you think you know where it is going and then it takes this sharp left turn that nobody sees coming. I remember when someone first told me this story, my jaw literally dropped. And I do not use that expression lightly.",
        ],
        context: 'twist は「ひねり」「どんでん返し」。sharp left turn は「急な方向転換」。jaw dropped は「顎が落ちた」=驚いた。building this up は「盛り上げている」。I do not use that expression lightly は「軽々しくその表現は使わない」で信憑性を強調。日本語の「オチがすごい」は英語では the ending is wild/incredible。',
        character: 'lisa', category: 'social', month: '2026-12',
    },
    {
        daySlot: 247, japanese: '語り継がれるにはわけがある',
        english: [
            'There is a reason it survived.',
            'Stories like that survive for a reason.',
            'There is a reason this story has been told for hundreds of years.',
            "Think about it. Out of all the stories that have ever been told, only a tiny fraction survive more than a generation. So if a story has been passed down for centuries, there has to be something in it that resonates with people on a deep level. Maybe it is not literally true. Maybe it never happened. But it captures something real about the human experience. Fear, hope, love, consequence. The best stories are not about facts. They are about truth. And those are not the same thing.",
        ],
        context: 'survive は「生き残る」。fraction は「ほんの一部」。resonates with は「共鳴する」「心に響く」。captures something real は「何か本質的なものを捉える」。facts vs truth は英語の哲学的区別で、事実と真実は違うという深い指摘。日本語の「語り継がれる」は passed down/told for generations。',
        character: 'master', category: 'social', month: '2026-12',
    },
];

// ============================================================
// DAY THEMES -- MONTH 9 (2026-12) -- WEEK 33
// ============================================================

export const MONTH9_W33_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    241: {
        title: '昔の話をする', titleEn: 'Talking About the Old Days', category: 'social',
        scene: '居酒屋で懐かしい話が止まらない夜。「昔はさ」トークが始まる。',
        keywords: [
            { en: 'reminds me', ja: '思い出させる', pron: 'リマインズミー', example: 'That reminds me of something.', note: 'remind は「何かがきっかけで思い出す」。remember は自力で思い出す。この違いは日本語の「思い出す」一語ではカバーできない。' },
            { en: 'nostalgic', ja: '懐かしい', pron: 'ノスタルジック', example: 'I feel so nostalgic right now.', note: '日本語の「懐かしい」は一語で完結する便利な形容詞だが、英語の nostalgic は少し重い。カジュアルには takes me back がぴったり。' },
            { en: 'back then', ja: 'あの頃は', pron: 'バックゼン', example: 'Things were different back then.', note: 'at that time より圧倒的に口語的。in those days はやや文語的。居酒屋トークなら back then 一択。' },
            { en: 'cringe', ja: '恥ずかしくて身をすくめる', pron: 'クリンジ', example: 'I cringe every time I think about it.', note: '元は動詞だが最近は形容詞的にも使う。That is so cringe.=「それはキツい」。SNS時代に急速に広まった。' },
            { en: 'used to', ja: 'かつては~だった', pron: 'ユーストゥ', example: 'I used to live in Osaka.', note: '「以前は~だったけど今は違う」が自動的に含まれる。be used to（慣れている）と混同注意。発音も違う。' },
        ],
    },
    242: {
        title: '子供の頃の話', titleEn: 'Childhood Stories', category: 'social',
        scene: '居酒屋で子供時代の思い出話に花が咲く夜。実家、兄弟、放課後の話。',
        keywords: [
            { en: 'grew up', ja: '育った', pron: 'グリューアップ', example: 'Where did you grow up?', note: 'Where are you from? より深い質問。どこで大人になったかを聞いている。出身地ではなく環境を問う。' },
            { en: 'siblings', ja: '兄弟姉妹', pron: 'シブリングス', example: 'Do you have any siblings?', note: '性別不問で兄弟姉妹をまとめた単語。日本語では上下関係を聞くが、英語では older/younger で後から聞く。' },
            { en: 'strict', ja: '厳しい', pron: 'ストリクト', example: 'My parents were really strict.', note: 'strict parents は世界共通の話題。lenient=甘い が対義語。overprotective=過保護 も関連語。' },
            { en: 'curfew', ja: '門限', pron: 'カーフュー', example: 'I had a curfew until high school.', note: '元は夜間外出禁止令。家庭レベルでは「門限」。日本語の門限と完全対応する珍しい英単語。' },
            { en: 'crush', ja: '片思い', pron: 'クラッシュ', example: 'My first crush was in second grade.', note: 'have a crush on someone=片思いする。first love より軽くてカジュアル。動詞の crush=「潰す」とは全然違う意味。' },
        ],
    },
    243: {
        title: '面白い話がある', titleEn: 'I Have a Funny Story', category: 'social',
        scene: '居酒屋で笑い話大会が勃発。誰が一番面白い話を持っているか勝負。',
        keywords: [
            { en: 'hilarious', ja: '超面白い', pron: 'ヒレリアス', example: 'That story was absolutely hilarious.', note: 'funny の最上級。hysterical も同義。日本語の「ヤバい（面白い）」に相当する破壊力。' },
            { en: 'punchline', ja: 'オチ', pron: 'パンチライン', example: 'Wait for the punchline.', note: 'punch+line=笑いの決め手。日本語の「オチ」と完全対応する珍しい例。deliver the punchline=オチを言う。' },
            { en: 'exaggerate', ja: '大げさに言う', pron: 'イグザジュレイト', example: 'You are totally exaggerating.', note: '話を盛ること。embellish はやや上品な同義語。日本語の「盛る」がぴったりの翻訳。' },
            { en: 'crack up', ja: '爆笑する', pron: 'クラックアップ', example: 'That story cracked me up.', note: 'crack=割れる。笑いで壊れるイメージ。burst out laughing より圧倒的にカジュアル。' },
            { en: 'spill it', ja: '全部話して', pron: 'スピルイット', example: 'Come on, spill it.', note: 'spill=こぼす。秘密をこぼす=全部話す。spill the beans も同義だがやや古い表現。' },
        ],
    },
    244: {
        title: '怖い話', titleEn: 'Scary Stories', category: 'social',
        scene: '居酒屋の照明を落として怪談タイムが始まる。リアクションが飛び交う夜。',
        keywords: [
            { en: 'creepy', ja: '気味が悪い', pron: 'クリーピー', example: 'That is so creepy.', note: 'scary より不気味でじわじわ来る怖さ。creep=気持ち悪い人、という名詞用法もある。' },
            { en: 'goosebumps', ja: '鳥肌', pron: 'グースバンプス', example: 'I got goosebumps all over.', note: 'goose=ガチョウの皮膚のブツブツ。英語でも日本語でも動物由来の恐怖表現。物理的証拠として見せるのが定番。' },
            { en: 'nightmare', ja: '悪夢', pron: 'ナイトメア', example: 'I am going to have nightmares tonight.', note: 'night+mare（古英語の悪魔）。比喩的に最悪な状況にも使う。This project is a nightmare=このプロジェクトは地獄。' },
            { en: 'spine-chilling', ja: '背筋が凍る', pron: 'スパインチリング', example: 'That was a spine-chilling story.', note: 'spine=背骨、chilling=凍らせる。a chill ran down my spine=背筋がゾッとした。英語でも日本語でも恐怖は背骨で感じる。' },
            { en: 'haunted', ja: '幽霊が出る', pron: 'ホーンテッド', example: 'That building is haunted.', note: 'haunt=つきまとう。haunted house=お化け屋敷。it haunts me=あの記憶がつきまとう、と比喩的にも使える。' },
        ],
    },
    245: {
        title: '夢の話', titleEn: 'Dream Talk', category: 'feeling',
        scene: '居酒屋で「昨日変な夢見た」トーク。夢の意味を議論する夜。',
        keywords: [
            { en: 'vivid', ja: '鮮明な', pron: 'ビビッド', example: 'I had a really vivid dream.', note: 'vivid dream=鮮明な夢。色、音、感覚がリアルな夢に使う。日本語の「リアルな夢」にはこの単語が最適。' },
            { en: 'recurring', ja: '繰り返しの', pron: 'リカーリング', example: 'I keep having this recurring dream.', note: 'recurring dream=繰り返し見る夢。recur=再発する。サブスクの recurring payment と同じ語源。' },
            { en: 'subconscious', ja: '潜在意識', pron: 'サブコンシャス', example: 'It might be your subconscious talking.', note: 'sub（下の）+conscious（意識）。フロイト理論から来た一般用語。your subconscious is telling you=無意識があなたに伝えている。' },
            { en: 'lucid', ja: '明晰な', pron: 'ルーシッド', example: 'Have you ever had a lucid dream?', note: 'lucid dream=夢の中で夢だと気づいている状態。Reddit やポッドキャストで超人気トピック。' },
            { en: 'interpret', ja: '解釈する', pron: 'インタープリット', example: 'How do you interpret that dream?', note: 'dream interpretation=夢判断。interpreter=通訳者と同じ語源。意味を読み解く行為全般に使える。' },
        ],
    },
    246: {
        title: '「あの時さ」', titleEn: 'Remember When', category: 'social',
        scene: '居酒屋で共通の思い出を振り返る夜。あの時こうだったよねトーク。',
        keywords: [
            { en: 'legendary', ja: '伝説的な', pron: 'レジェンダリー', example: 'That moment was legendary.', note: 'legend から派生。友達同士では「あれは伝説」のノリでカジュアルに使える。epic と並んで最高を表現。' },
            { en: 'what-ifs', ja: 'もしも', pron: 'ワットイフス', example: 'I try not to think about the what-ifs.', note: 'what if を名詞化したもの。後悔や空想のこと。the what-ifs will eat you alive=もしもに食い尽くされる。' },
            { en: 'in a heartbeat', ja: '一瞬で', pron: 'インナハートビート', example: 'I would go back in a heartbeat.', note: '心臓が一回打つ時間=一瞬。即座にやるという強い意思。without hesitation のカジュアル版。' },
            { en: 'bond', ja: '絆を深める', pron: 'ボンド', example: 'We bonded over the hard times.', note: 'bond は名詞（絆）も動詞（絆を深める）もOK。bond over=~を通じて仲良くなる。male bonding=男の友情。' },
            { en: 'follow through', ja: '最後までやり通す', pron: 'フォロースルー', example: 'We never follow through on these plans.', note: 'ゴルフの follow through と同じ。言ったことを実行する。日本語の「有言実行」に近い概念。' },
        ],
    },
    247: {
        title: '伝説と都市伝説', titleEn: 'Legends and Urban Myths', category: 'social',
        scene: '居酒屋で日本の伝説や都市伝説を英語でどう語るか議論する夜。',
        keywords: [
            { en: 'legend has it', ja: '言い伝えによると', pron: 'レジェンドハズイット', example: 'Legend has it that this mountain is cursed.', note: '物語の始まり方として最高にかっこいい。once upon a time より大人向け。居酒屋で使うと盛り上がる。' },
            { en: 'skeptic', ja: '懐疑論者', pron: 'スケプティック', example: 'I am a skeptic, but...', note: '何でも疑う人。skeptical=懐疑的な。科学的思考の基礎であり、英語圏では褒め言葉にもなる。' },
            { en: 'passed down', ja: '受け継がれた', pron: 'パストダウン', example: 'This story has been passed down for centuries.', note: 'pass down=世代から世代へ伝える。hand down も同義。文化遺産の文脈で頻出。' },
            { en: 'grain of salt', ja: '話半分に', pron: 'グレインオブソルト', example: 'Take that with a grain of salt.', note: 'take it with a grain of salt=話半分に聞く。ローマ時代が語源。英語で最もよく使われることわざの一つ。' },
            { en: 'folklore', ja: '民間伝承', pron: 'フォークロア', example: 'Japanese folklore is incredibly rich.', note: 'folk（民間）+lore（知識）。urban legend は現代版、folklore は伝統的。日本の妖怪文化は folklore の宝庫。' },
        ],
    },
};
