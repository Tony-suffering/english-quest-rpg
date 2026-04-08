/**
 * 365 English Master -- Month 6 Week 24: 旅の思い出 (Travel Memories)
 * Days 172-180: 90 expressions
 * Month: September 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 6 (2026-09) -- WEEK 24
// ============================================================

export const MONTH6_W24_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 172: 旅先のグルメ (Food on the Road)
    // Scene: 旅先で入ったレストランの料理が最高すぎてみんな感動している
    // ────────────────────────────────────────────────────

    {
        daySlot: 172, japanese: 'この店、当たりだね',
        english: [
            'This place is great.',
            'We totally hit the jackpot with this restaurant.',
            'I cannot believe we just walked in without a reservation and the food is this good.',
            "Right? I almost didn't wanna come in 'cause the outside looked sketchy, but this is insane.",
        ],
        jaTranslations: [
            'この店いいね。',
            'この店マジで大当たりだわ。',
            '予約なしでフラッと入っただけなのに、こんなうまいとかありえなくない？',
            'だよな？外観ちょっと怪しくて入るか迷ったけど、これはヤバいわ。',
        ],
        context: 'hit the jackpot は「大当たり」。sketchy は「怪しい」。tourist trap は「観光客向けのぼったくり店」。日本語の「当たり」は一言で済むが、英語では理由まで全部説明するのが自然。',
        character: 'yuki', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: 'これ何の料理？',
        english: [
            'What is this dish?',
            'I have no idea what I ordered but it smells amazing.',
            'Can someone explain what this is? The menu was in Italian and I just pointed at something.',
            "Honestly, who cares what it is? It smells amazing. Just eat it and ask questions later.",
        ],
        jaTranslations: [
            'これ何の料理？',
            '何頼んだか全然わかんないけど、めっちゃいい匂いする。',
            '誰かこれ何か教えて？メニューがイタリア語で、適当に指差しただけなんだけど。',
            'ぶっちゃけ何でもよくない？いい匂いするし。とりあえず食って、質問はあとだ。',
        ],
        context: 'I have no clue は「全然わからない」。pointed at は「指差した」。identify は「特定する」。メニューが読めないときの注文は旅の醍醐味。日本語では「これ何？」で済むが英語では状況説明から入る。',
        character: 'takeshi', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: 'おすすめは何ですか？',
        english: [
            'What do you recommend?',
            'What is the best thing on the menu here?',
            'We are first-timers here. What should we absolutely not miss?',
            "Good call. I'd go with the house special if I were you. That's usually the safest bet at a place like this.",
        ],
        jaTranslations: [
            'おすすめは何ですか？',
            'ここで一番うまいの何？',
            '初めて来たんだけど、絶対食べた方がいいやつある？',
            'いい判断だな。俺だったら看板メニュー行くわ。こういう店はそれが一番ハズレない。',
        ],
        context: 'first-timers は「初めて来た人」。overwhelmed は「圧倒された」。the real deal は「本物」。local cuisine は「地元の料理」。safe tourist options は「無難な観光客向けメニュー」。店員におすすめを聞くのは海外では普通。',
        character: 'lisa', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: '量が多すぎる',
        english: [
            'This is too much food.',
            'There is no way I can finish all of this.',
            'I ordered one dish and they brought enough food for four people.',
            "Tell me about it. I haven't even touched my main course yet and I'm already stuffed from the appetizer alone.",
        ],
        jaTranslations: [
            '量多すぎ。',
            'こんなの絶対食べきれないって。',
            '一品しか頼んでないのに4人前くらい来たんだけど。',
            'ほんとそれ。メインまだ手つけてないのに、前菜だけでもう腹パンなんだけど。',
        ],
        context: 'portions は「一皿の量」。on another level は「レベルが違う」。doggy bag は「持ち帰り袋」。no wonder は「どうりで」。日本の一人前と海外の一人前は全然違う。持ち帰り文化も国によって異なる。',
        character: 'mina', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: 'これ日本にもほしい',
        english: [
            'I wish we had this in Japan.',
            'Why do we not have this back home? It is so good.',
            'If someone opened a restaurant like this in Tokyo, I would go every single week.',
            "For real. If you opened this place in Shibuya, there'd be a two-hour line every day.",
        ],
        jaTranslations: [
            'これ日本にもほしい。',
            'なんで日本にこれないの？めちゃくちゃうまいのに。',
            'これ東京に出したら毎週通うわ、マジで。',
            'ほんとそれ。渋谷に出したら毎日2時間待ちだろ。',
        ],
        context: 'back home は「地元で」。combination of flavors は「味の組み合わせ」。smoky undertone は「スモーキーな風味」。recreate は「再現する」。旅先の味を持ち帰りたい気持ちは万国共通。',
        character: 'kenji', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: 'チップっていくら？',
        english: [
            'How much should we tip?',
            'What is the tipping rule here? I never know.',
            'Is it fifteen percent or twenty? I always get confused about tipping etiquette.',
            "I think it's around fifteen percent here, but honestly just round up. Nobody's gonna judge you for a couple extra euros.",
        ],
        jaTranslations: [
            'チップっていくら払えばいいの？',
            'ここのチップのルールって何？いつもわかんないんだよな。',
            '15パーセント？20パーセント？チップのマナーいっつも混乱するわ。',
            'ここは15パーぐらいだと思うけど、正直切り上げときゃいいよ。数ユーロ多くても誰も気にしねえから。',
        ],
        context: 'tipping etiquette は「チップのマナー」。I have no instinct for this は「感覚がない」。overtip は「チップを多く払いすぎる」。日本にはチップ文化がないので、海外で一番困るポイントの一つ。',
        character: 'master', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: '会計お願いします',
        english: [
            'Check, please.',
            'Could we get the bill when you have a chance?',
            'Excuse me, we are ready to pay. Could you bring us the check?',
            "Wait, before you ask for the check, does anyone have cash? I don't think they take cards here.",
        ],
        jaTranslations: [
            'お会計お願いします。',
            'すみません、お時間あるときにお会計いただけますか？',
            'すみません、お支払いしたいんですけど、伝票持ってきてもらえますか？',
            'ちょっと待って、会計頼む前に誰か現金ある？ここカード使えないっぽいんだけど。',
        ],
        context: 'check/bill は「お会計」。アメリカは check、イギリスは bill。split the bill は「割り勘にする」。pay separately は「別々に払う」。日本では自動的に一括会計だが海外では分割が普通の国も。',
        character: 'yuki', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: 'この味、忘れられない',
        english: [
            'I will never forget this taste.',
            'This is going in my top five meals of all time.',
            'I have eaten at a lot of places around the world but this might be the best meal I have ever had.',
            "Same here. I'm literally taking a photo of every dish so I can make everyone back home jealous.",
        ],
        jaTranslations: [
            'この味、一生忘れない。',
            'これ人生ベスト5に入るわ。',
            '世界中いろんなとこで食べてきたけど、これ人生で一番うまいかもしれん。',
            'わかる。全皿写真撮ってるわ、地元のやつらに自慢するために。',
        ],
        context: 'hands down は「文句なしに」。top five は「人生ベスト5」。seasoned は「味付けされた」。worth the whole trip は「旅全体の価値がある」。英語で食事を褒めるときは大げさなくらいがちょうど良い。',
        character: 'master', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: 'お腹いっぱいで動けない',
        english: [
            'I am so full.',
            'I ate way too much. I cannot move.',
            'Someone is going to have to roll me out of this restaurant because my legs no longer work.',
            "You did this to yourself, man. Nobody forced you to order that second dessert. Want me to roll you outta here?",
        ],
        jaTranslations: [
            'お腹いっぱい。',
            '食べすぎた。もう動けない。',
            '誰か俺をこの店から転がして出してくれ、足がもう機能しない。',
            '自業自得だろ。デザート2個目頼んだの誰だよ。転がして出してやろうか？',
        ],
        context: 'food coma は「食後の昏睡状態」。roll me out は「転がして外に出す」。self-control は「自制心」。paying the price は「ツケを払う」。英語では満腹を大げさに表現する文化がある。',
        character: 'takeshi', category: 'order', month: '2026-09',
    },
    {
        daySlot: 172, japanese: 'また絶対来よう',
        english: [
            'We have to come back.',
            'I am already planning my next visit to this place.',
            'If we ever come back to this city, this restaurant is the first stop. No discussion.',
            "A hundred percent. Let me drop a pin on Google Maps right now before we forget where this place is.",
        ],
        jaTranslations: [
            'また絶対来よう。',
            'もう次いつ来るか考えてるわ。',
            'この街にまた来ることがあったら、まずこの店だ。議論の余地なし。',
            '間違いない。場所忘れる前に今すぐGoogleマップにピン落とすわ。',
        ],
        context: 'mark my words は「覚えておいて」。hidden gem は「隠れた名店」。travel guides は「旅行ガイドブック」。save up は「貯金する」。write a review は「レビューを書く」。旅先の名店を再訪したい気持ちを英語で表現。',
        character: 'mina', category: 'order', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 173: 異文化体験 (Cultural Experiences)
    // Scene: 現地の文化体験に参加して日本との違いに驚いている
    // ────────────────────────────────────────────────────

    {
        daySlot: 173, japanese: '文化が全然違う',
        english: [
            'The culture is so different.',
            'Everything here is the complete opposite of Japan.',
            'I knew it would be different but I was not prepared for just how different it actually is.',
            "Oh my god, yes. This woman kissed me on both cheeks when we met and I just stood there frozen. I had no idea what to do.",
        ],
        jaTranslations: [
            '文化が全然違う。',
            'ここ何もかも日本と真逆だわ。',
            '違うとは思ってたけど、ここまで違うとは覚悟してなかった。',
            'マジでそれ。初対面の女の人に両頬キスされて固まっちゃった。どうしていいかわかんなかった。',
        ],
        context: 'it is one thing to... and a completely different thing to は「〜するのと〜するのは全然違う」。personal space は「パーソナルスペース」。kissing on the cheek は頬にキスする挨拶。日本とのギャップが大きいポイント。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: 'これ日本と逆だね',
        english: [
            'It is the opposite in Japan.',
            'We do it the exact opposite way back home.',
            'Funny how something totally normal here would be considered weird in Japan.',
            "It's wild, right? Like the noise level alone in restaurants here would get you kicked out back home.",
        ],
        jaTranslations: [
            '日本だと逆だね。',
            '地元じゃ完全に逆のやり方だわ。',
            'ここじゃ普通のことが日本だと変に思われるって面白いよな。',
            'すごくない？ここのレストランの騒がしさだけで、日本だったら追い出されるレベルだよ。',
        ],
        context: 'dirty looks は「嫌な顔」。on their best behavior は「行儀よくしている」。neither way is wrong は「どちらも間違いではない」。tear bread apart は「パンをちぎる」。文化の違いに良い悪いはない、という成熟した視点。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: '現地のマナーがわからない',
        english: [
            'I do not know the manners here.',
            'I keep worrying that I am being rude without knowing it.',
            'Nobody told me that tipping is required here. I have been accidentally insulting people all week.',
            "Don't worry about it too much. Most people can tell you're a tourist and they won't hold it against you.",
        ],
        jaTranslations: [
            'ここのマナーがわからない。',
            '知らないうちに失礼なことしてないかずっと心配なんだよね。',
            'チップが必須だって誰も教えてくれなくて、一週間ずっと無意識に失礼なことしてたわ。',
            'そんな気にすんなって。観光客ってわかるし、別にそれで怒ったりしないから。',
        ],
        context: 'walking on eggshells は「卵の殻の上を歩くように慎重になる」。cut in line は「割り込む」。invisible queue は「見えない列」。マナーがわからない不安を英語で表現。日本人が海外で最も困るポイントの一つ。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: 'これ体験してよかった',
        english: [
            'I am glad I tried this.',
            'I would have regretted it if I had not done this.',
            'This is exactly the kind of experience you cannot get from reading a guidebook.',
            "I know what you mean. That kind of stuff sticks with you way longer than any photo ever could.",
        ],
        jaTranslations: [
            'やってみてよかった。',
            'やらなかったら絶対後悔してたわ。',
            'これがまさにガイドブック読んだだけじゃ得られない体験だよな。',
            'わかる。こういうのって写真よりずっと長く心に残るんだよな。',
        ],
        context: 'sign up for は「申し込む」。put on a show は「見世物を演じる」。the real thing は「本物」。got chills は「鳥肌が立った」。connect with は「つながる」。観光ではなく文化体験に感動する英語表現。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: '日本のことも聞かれた',
        english: [
            'They asked about Japan too.',
            'People here are really curious about Japanese culture.',
            'I spent an hour explaining what a bento box is and why we take our shoes off indoors.',
            "Ha, let me guess, they asked about samurai and ninja too? Everyone always does. It's kinda funny though.",
        ],
        jaTranslations: [
            '日本のことも聞かれた。',
            'ここの人たち、日本の文化にめっちゃ興味あるんだよな。',
            '弁当って何かと靴を脱ぐ理由を1時間説明してたわ。',
            'あはは、当てようか、侍と忍者のことも聞かれただろ？みんな絶対聞くんだよな。まあ面白いけど。',
        ],
        context: 'surgical masks は「マスク」。hay fever は「花粉症」。cold etiquette は「風邪のエチケット」。the surface stuff は「表面的なこと」。異文化交流で日本文化を説明する場面。samurai/ninja を聞かれるのは海外あるある。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: '言葉が通じなくても何とかなる',
        english: [
            'You can manage without the language.',
            'We barely spoke the same language but we still communicated.',
            'It is amazing how much you can say with just gestures and a smile.',
            "Totally. I spent twenty minutes yesterday just pointing and smiling at a shop lady and we somehow figured everything out.",
        ],
        jaTranslations: [
            '言葉がわからなくても何とかなる。',
            'ほとんど言葉通じなかったけど、ちゃんとコミュニケーション取れたんだよ。',
            'ジェスチャーと笑顔だけでこんなに伝わるって、すごくない？',
            'ほんとそれ。昨日もお店のおばちゃんと20分間ずっと指差しと笑顔だけで、なんとか全部解決したわ。',
        ],
        context: 'managed は「何とかやった」。threw in は「おまけしてくれた」。human connection は「人と人のつながり」。willingness は「やろうとする気持ち」。言語を超えたコミュニケーションは旅の醍醐味。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: 'お祭りに偶然出くわした',
        english: [
            'We stumbled into a festival.',
            'We accidentally walked right into some kind of local celebration.',
            'We had no idea there was a festival today. We just turned the corner and suddenly there was music and dancing everywhere.',
            "No way! That's so lucky. Those unplanned moments always end up being the best part of any trip.",
        ],
        jaTranslations: [
            'お祭りに偶然出くわした。',
            'たまたま現地のお祭りに遭遇しちゃった。',
            '今日お祭りがあるなんて全然知らなくて、角を曲がったら急に音楽とダンスだらけだった。',
            'マジで！？ラッキーすぎる。そういう予定外の瞬間って結局一番の思い出になるんだよな。',
        ],
        context: 'stumbled into は「偶然出くわした」。traditional costumes は「民族衣装」。food stalls は「屋台」。turning bright red は「真っ赤になる」。pure magic は「まさに魔法」。予定にない出来事が最高の思い出になるのは旅の法則。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: '宗教的な場所ではルールがある',
        english: [
            'There are rules at religious sites.',
            'You have to cover your shoulders and knees to enter the temple.',
            'I did not realize you had to take off your shoes and cover your head to go inside.',
            "Yeah, I almost made the same mistake. Good thing they had loaner scarves at the entrance or I would've been turned away too.",
        ],
        jaTranslations: [
            '宗教的な場所にはルールがある。',
            'お寺に入るには肩と膝を隠さなきゃいけないんだよ。',
            '中に入るのに靴脱いで頭も覆わなきゃいけないって知らなかった。',
            'あー、俺も同じミスしかけた。入口で貸しスカーフあったから助かったけど、なかったら追い返されてたわ。',
        ],
        context: 'turned away は「入場を断られた」。cover your knees and shoulders は宗教施設のドレスコード。puts things in perspective は「視野が広がる」。instinctively は「本能的に」。旅行先の宗教マナーは事前調査が必須。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: '写真撮っていいですか？',
        english: [
            'Can I take a picture?',
            'Excuse me, would it be OK if I took a photo?',
            'I love what you are doing here. Would you mind if I took a picture? I will not post it anywhere.',
            "Of course, go ahead! And actually, do you want me to take one of all of you together? Gimme your phone.",
        ],
        jaTranslations: [
            '写真撮っていい？',
            'すみません、写真撮ってもいいですか？',
            'ここでやってること素敵ですね。写真撮らせてもらえませんか？どこにも投稿しないので。',
            'もちろん、どうぞ！あ、みんなで一緒に撮る？スマホ貸して。',
        ],
        context: 'would you mind if は丁寧な許可の聞き方。I will not post it は「投稿しない」。personal memory は「個人的な記念」。写真の許可を取るのは海外では大事なマナー。日本人は撮影時の配慮が足りないと言われがち。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 173, japanese: '価値観が変わった',
        english: [
            'It changed my perspective.',
            'I see things differently now after this experience.',
            'I came here thinking one way and now I realize I had it all wrong.',
            "That's deep. I feel the same way honestly. It's like my whole definition of 'normal' just got flipped upside down.",
        ],
        jaTranslations: [
            '価値観が変わった。',
            'この体験のあと、物の見方が変わったわ。',
            'ある考え方でここに来たんだけど、自分が完全に間違ってたって気づいた。',
            '深いな。正直俺も同じ気持ちだわ。「普通」の定義がひっくり返された感じ。',
        ],
        context: 'perspective は「視点」。I had it all wrong は「完全に間違っていた」。more than one right way は「正解は一つではない」。punctual は「時間に正確な」。旅が価値観を変える瞬間を表現。日本人が海外で気づくこと。',
        character: 'master', category: 'social', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 174: 旅で出会った人 (People Met on Trips)
    // Scene: 旅先で出会った人との交流を振り返って語り合っている
    // ────────────────────────────────────────────────────

    {
        daySlot: 174, japanese: '隣の席の人と仲良くなった',
        english: [
            'I made friends with the person next to me.',
            'The guy sitting next to me on the train turned out to be really cool.',
            'I started chatting with the woman next to me at the bar and we ended up talking for three hours.',
            "That's awesome. The random ones are always the best conversations. Did you guys swap Instagrams at least?",
        ],
        jaTranslations: [
            '隣の席の人と仲良くなった。',
            '電車で隣に座ってた人がめっちゃいいやつだった。',
            'バーで隣の女の人と話し始めたら、結局3時間も話し込んじゃった。',
            'いいじゃん。偶然の出会いっていつも一番いい会話になるよな。インスタくらい交換した？',
        ],
        context: 'turned out to be は「結果的に〜だった」。traveling solo は「一人旅」。ditched him は「置いていった」。stay in touch は「連絡を取り合う」。旅先での偶然の出会いは英語で話すと最高のストーリーになる。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: 'ガイドさんが面白かった',
        english: [
            'The tour guide was great.',
            'Our guide was hilarious. I learned so much from her.',
            'I expected a boring history lesson but the guide made it feel like a stand-up comedy show.',
            "Jealous. Ours just read off a script the whole time. A good guide really makes or breaks the whole experience.",
        ],
        jaTranslations: [
            'ガイドさんが面白かった。',
            'ガイドさんめっちゃ面白くて、すごい勉強になった。',
            '退屈な歴史の授業かと思ったら、ガイドが完全にお笑いライブにしてくれた。',
            'うらやましい。うちのガイドはずっと台本読んでるだけだったわ。いいガイドって体験を左右するよな。',
        ],
        context: 'walking encyclopedia は「歩く百科事典」。drop facts は「豆知識を投入する」。relatable は「共感できる」。cracking up は「爆笑する」。made the whole trip は「旅全体を最高にしてくれた」。良いガイドは旅の質を劇的に変える。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: 'ホテルのスタッフが親切だった',
        english: [
            'The hotel staff was so kind.',
            'Everyone at the hotel went out of their way to help us.',
            'The concierge remembered my name every morning and always asked how my day was.',
            "Right? Marco was the best. When he made us those sandwiches at midnight, I knew we picked the right hotel.",
        ],
        jaTranslations: [
            'ホテルのスタッフがめっちゃ親切だった。',
            'ホテルのみんながわざわざ色々やってくれたんだよ。',
            'コンシェルジュが毎朝名前覚えてて、今日はどうだったって聞いてくれるの。',
            'だよな？マルコ最高だったわ。深夜にサンドイッチ作ってくれた時点で、このホテル選んで正解だったって確信した。',
        ],
        context: 'went out of their way は「わざわざ」。concierge は「コンシェルジュ」。shout-out は「感謝の言葉」。hospitality は「おもてなし」。英語では good service を具体的なエピソードで褒めるのが効果的。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: '子供に助けられた',
        english: [
            'A kid helped us out.',
            'This little kid spoke better English than me and saved us.',
            'We were totally lost until a ten-year-old came up and gave us perfect directions in English.',
            "Ha! That's humbling. A ten-year-old with better English than all of us combined. I need to step up my game.",
        ],
        jaTranslations: [
            '子供に助けられた。',
            '小さい子が俺らより英語うまくて助けてくれた。',
            '完全に迷ってたら10歳くらいの子が来て完璧な英語で道教えてくれたんだよ。',
            'あはは！それはへこむわ。10歳の子に英語力で全員負けてるとか。もっと頑張んないと。',
        ],
        context: 'saved us は「助けてくれた」。could not have been older than は「〜歳以上には見えなかった」。destroyed me は「完敗した」。avoid the line は「列を避ける」。海外で子供に英語で助けられる経験は日本人旅行者あるある。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: '地元の人に夕食に誘われた',
        english: [
            'A local invited us to dinner.',
            'This family we met on the street actually invited us to eat at their house.',
            'I still cannot believe a complete stranger invited us into their home for a home-cooked meal.',
            "Wait, seriously? You went to a stranger's house for dinner? That's either incredibly brave or incredibly lucky. Probably both.",
        ],
        jaTranslations: [
            '地元の人に夕食に誘われた。',
            '道で会った家族が家でご飯食べていきなよって誘ってくれた。',
            '全くの他人が自分の家に招いて手料理ごちそうしてくれたとか、いまだに信じられない。',
            'え、マジで？知らない人の家に夕飯食べに行ったの？それ信じられないくらい勇気あるか信じられないくらいラッキーかのどっちかだわ。たぶん両方。',
        ],
        context: 'sounds made up は「作り話みたい」。out of nowhere は「突然」。home-cooked meal は「手料理」。homemade wine は「自家製ワイン」。旅先で地元の人の家に招かれる経験は一生の思い出。日本では他人を家に招く文化が薄れている。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: '連絡先を交換した',
        english: [
            'We exchanged contact info.',
            'I gave him my Instagram so we can keep in touch.',
            'We swapped numbers and promised to meet up again if we are ever in the same city.',
            "Nice. Those travel friendships hit different. You'll probably never meet again but that one night meant everything.",
        ],
        jaTranslations: [
            '連絡先を交換した。',
            'インスタ教えといたから、連絡取り合えるようにした。',
            '番号交換して、同じ街にいることがあったらまた会おうって約束した。',
            'いいね。旅先の友情って特別だよな。たぶんもう会えないけど、あの一晩が全てだったりする。',
        ],
        context: 'exchanged Instagram handles は「インスタを交換した」。the clock is ticking は「時間が限られている」。skip the small talk は「世間話を省く」。旅先の友情は短いからこそ深い、という考え方。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: '英語が通じてうれしかった',
        english: [
            'I was happy my English worked.',
            'My English is not great but they understood me and that felt amazing.',
            'For the first time in my life, I had a real conversation in English with a real person and it actually worked.',
            "That's amazing! See, your English is way better than you think. You just needed the real thing to prove it.",
        ],
        jaTranslations: [
            '英語が通じてうれしかった。',
            '英語上手くないけど、通じた時めちゃくちゃうれしかった。',
            '人生で初めて、本物の人と英語でちゃんと会話できて、しかもそれが通じたんだよ。',
            'すごいじゃん！ほら、思ってるより英語できてんだって。本番で証明するだけだったんだよ。',
        ],
        context: 'mess up tenses は「時制を間違える」。sound like a robot は「ロボットみたいに聞こえる」。flashcards は「単語帳」。became worth it は「報われた」。英語が通じた喜びは日本人学習者にとって最高の体験。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: '二度と会えないかもしれないけど',
        english: [
            'We might never meet again.',
            'It is sad that we will probably never see each other again.',
            'We spent one perfect evening together knowing we would probably never cross paths again.',
            "Yeah, that's the hard part. But I'd rather have one great night with someone than never meet them at all.",
        ],
        jaTranslations: [
            'もう二度と会えないかもしれないけど。',
            'たぶんもう会えないって思うと寂しいよな。',
            '二度と会えないってわかってて、それでも最高の一晩を一緒に過ごした。',
            'そうなんだよな、それが辛いとこだよな。でも会えないよりは、一晩でも最高の時間過ごせた方がいいだろ。',
        ],
        context: 'bittersweet は「ほろ苦い」。cross paths は「再び出会う」。go your separate ways は「それぞれの道を行く」。letting go は「手放す」。旅先での出会いと別れの切なさを表現する英語。brief moment in time は詩的な表現。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: 'あの人元気にしてるかな',
        english: [
            'I wonder how they are doing.',
            'I still think about that person sometimes.',
            'Every now and then I look at the photo we took together and wonder where they are now.',
            "Oh, the fisherman guy? I think about him too sometimes. Crazy how someone you spent an hour with can stick with you like that.",
        ],
        jaTranslations: [
            'あの人元気にしてるかな。',
            'たまにあの人のこと思い出すんだよな。',
            'ときどき一緒に撮った写真見返して、今どこで何してんだろうなって考える。',
            'あー、あの漁師のおっちゃん？俺もたまに思い出すわ。1時間しか一緒にいなかったのに忘れられないって不思議だよな。',
        ],
        context: 'every now and then は「たまに」。leave a mark は「跡を残す」。blurry photo は「ぼやけた写真」。旅先で出会った人をふと思い出す瞬間。名前も知らないのに忘れられない人がいるのは旅の不思議。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 174, japanese: '旅は人との出会いが一番',
        english: [
            'The best part of travel is meeting people.',
            'I always say the people you meet are more memorable than the places you visit.',
            'Ask me about my favorite trip and I will not tell you about the sights. I will tell you about the people.',
            "Couldn't agree more. I barely remember the landmarks, but I'll never forget the people we shared drinks with.",
        ],
        jaTranslations: [
            '旅は人との出会いが一番。',
            '出会った人の方が行った場所より記憶に残るっていつも思う。',
            '一番良かった旅を聞かれても、景色の話はしない。人の話をする。',
            '激しく同意。観光名所なんてほとんど覚えてないけど、一緒に飲んだ人たちのことは絶対忘れない。',
        ],
        context: 'took my breath away は「息をのむほど美しかった」。along the way は「旅の途中で」。magnets and keychains は「マグネットとキーホルダー」(定番の土産)。real souvenirs は「本当のお土産」。旅の本質は人との出会いだという哲学。',
        character: 'master', category: 'social', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 175: 旅の失敗談 (Travel Mishaps)
    // Scene: 居酒屋で旅の失敗談を披露し合って盛り上がっている
    // ────────────────────────────────────────────────────

    {
        daySlot: 175, japanese: '飛行機に乗り遅れた',
        english: [
            'I missed my flight.',
            'I actually missed my flight because I went to the wrong terminal.',
            'I showed up at the airport two hours early and still managed to miss my flight somehow.',
            "No way. You got there three hours early and still missed it? That takes a special kind of talent, honestly.",
        ],
        jaTranslations: [
            '飛行機に乗り遅れた。',
            'ターミナル間違えて飛行機乗り遅れた。',
            '2時間前に空港着いたのに、なぜか乗り遅れた。',
            'ウソだろ。3時間前に着いて乗り遅れるって、ある意味才能だわ、マジで。',
        ],
        context: 'missed my flight は「飛行機に乗り遅れた」。boarding announcement は「搭乗案内」。the gate was closed は「搭乗口が閉まっていた」。never living this down は「一生この話をされる」。空港での失敗は最高のネタになる。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: 'ホテルを間違えた',
        english: [
            'I went to the wrong hotel.',
            'I checked into the wrong hotel and did not realize for two hours.',
            'The taxi took me to a hotel with the same name but in a completely different part of the city.',
            "Wait, you ate their snacks and everything? That's hilarious. I bet the front desk was so confused when you checked out.",
        ],
        jaTranslations: [
            'ホテルを間違えた。',
            '間違えたホテルにチェックインして2時間気づかなかった。',
            'タクシーが同じ名前の全然別のホテルに連れてった。',
            'え、そこのお菓子まで食べたの？ウケるわ。チェックアウトの時フロント超困惑しただろうな。',
        ],
        context: 'legendary は「伝説級」。complimentary snacks は「無料のお菓子」。pitying look は「同情の目」。booking app は「予約アプリ」。同名のホテルが複数あるのは海外あるある。タクシーに乗るときは住所も伝えるべき。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: 'お土産を全部空港に忘れた',
        english: [
            'I forgot all my souvenirs at the airport.',
            'I left a bag full of souvenirs at the security checkpoint.',
            'I spent three hundred dollars on souvenirs and left the entire bag at the gate.',
            "Oh no. All of them? That's brutal. Did you at least try calling the airport's lost and found?",
        ],
        jaTranslations: [
            'お土産を全部空港に忘れた。',
            '保安検査場にお土産の袋まるごと忘れてきた。',
            'お土産に3万円使ったのに、搭乗ゲートに袋ごと忘れた。',
            'うわ最悪。全部？それはキツい。空港の忘れ物センターに電話くらいした？',
        ],
        context: 'security checkpoint は「保安検査場」。lost and found は「忘れ物センター」。collecting dust は「ホコリをかぶっている」。handmade ceramics は「手作りの陶器」。お土産を忘れるのは旅行者あるある。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: '変なもの食べてお腹壊した',
        english: [
            'I ate something bad and got sick.',
            'I have no idea what I ate but my stomach has not been the same since.',
            'I was feeling adventurous and tried street food from a cart that looked questionable and paid for it later.',
            "Dude, I told you that cart looked sketchy. But no, you said 'it smells fine.' How's your stomach now?",
        ],
        jaTranslations: [
            '変なもの食べてお腹壊した。',
            '何食べたかわかんないけど、あれ以来お腹がずっと調子悪い。',
            '冒険心で怪しい屋台の食べ物に手を出したら、あとで痛い目見た。',
            'おい、あの屋台怪しいって言っただろ。「匂いは大丈夫」って言い張ったのお前だからな。お腹どう？',
        ],
        context: 'street food は「屋台の食べ物」。questionable は「怪しい」。questioning every decision は「人生の全選択を疑う」(大げさ表現)。英語では食あたりの話を笑い話として語る文化がある。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: '言葉が通じなくてパニック',
        english: [
            'I panicked because nobody spoke English.',
            'I froze completely because I could not communicate at all.',
            'There I was in the middle of nowhere and not a single person spoke English or Japanese.',
            "I was so worried when we lost you. Next time just download the offline map, OK? Seriously though, I'm glad you're safe.",
        ],
        jaTranslations: [
            '言葉が通じなくてパニックになった。',
            '全くコミュニケーション取れなくて完全にフリーズした。',
            '何もないところで誰も英語も日本語も話せない状況になった。',
            'はぐれた時マジで心配したよ。次はオフライン地図ダウンロードしといてよ。てか、無事でよかった。',
        ],
        context: 'in the middle of nowhere は「何もないところで」。got separated は「はぐれた」。translation app は「翻訳アプリ」。glitchy は「不安定な」。言葉が通じないパニックは英語学習のモチベーションになる。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: '写真が全部消えた',
        english: [
            'I lost all my photos.',
            'My phone died and I lost every photo from the trip.',
            'Three weeks of photos gone in an instant because I never backed anything up.',
            "Ouch. That physically hurts to hear. This is exactly why I back up my photos to the cloud every night.",
        ],
        jaTranslations: [
            '写真が全部消えた。',
            'スマホが壊れて旅行の写真全部消えた。',
            '3週間分の写真が一瞬で消えた。バックアップ一回もしてなかったから。',
            'うわ痛い。聞いてるだけで辛い。だから俺は毎晩クラウドにバックアップしてんだよ。',
        ],
        context: 'backed up は「バックアップした」。in slow motion は「スローモーションで」。slipped right out は「するりと落ちた」。tomorrow never came は「明日は来なかった」。写真データの消失は現代の旅行者にとって最大の悲劇。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: '今思えば笑い話だけど',
        english: [
            'It is funny now though.',
            'I can laugh about it now but at the time I wanted to cry.',
            'Looking back, it is one of my favorite travel stories even though it was a nightmare at the time.',
            "So true. The stories we're laughing hardest about right now are all the ones that made us miserable at the time.",
        ],
        jaTranslations: [
            '今思えば笑い話だけどね。',
            '今は笑えるけど、あの時はマジで泣きたかった。',
            '振り返ると、あの時は最悪だったのに今じゃ一番好きな旅の話だわ。',
            'ほんとそれ。今一番爆笑してる話って、全部あの時一番辛かったやつだよな。',
        ],
        context: 'looking back は「振り返ると」。nightmare は「悪夢」。went according to plan は「計画通りにいった」。dinner parties は「食事会」。mishaps は「ハプニング」。失敗談が最高のネタになる英語表現。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: 'ぼったくられた',
        english: [
            'I got ripped off.',
            'That taxi driver totally scammed me. The fare was three times the normal price.',
            'I paid fifty euros for a five-minute ride because I did not know the local rates.',
            "Fifty euros?! You got played so hard. You gotta use the ride app next time. It's like six euros for the same trip.",
        ],
        jaTranslations: [
            'ぼったくられた。',
            'あのタクシー運転手に完全にぼったくられた。料金が通常の3倍だった。',
            '現地の相場知らなくて、5分の乗車に50ユーロ払っちゃった。',
            '50ユーロ！？カモられすぎだろ。次は配車アプリ使えよ。同じ距離で6ユーロだぞ。',
        ],
        context: 'ripped off は「ぼったくられた」。scammed は「騙された」。meter は「メーター」。ride app は「配車アプリ」。funded his retirement は「彼の老後資金を出した」(大げさ表現)。観光客を狙うぼったくりは世界共通の問題。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: '荷物が出てこなかった',
        english: [
            'My luggage did not arrive.',
            'I waited at the carousel for an hour and my suitcase never showed up.',
            'The airline lost my luggage and I had to wear the same clothes for three days.',
            "Buenos Aires instead of Barcelona? That's not even close! At least the pink I Love Barcelona shirt was a good look on you.",
        ],
        jaTranslations: [
            '荷物が出てこなかった。',
            'ターンテーブルで1時間待ったけどスーツケースが出てこなかった。',
            '航空会社に荷物なくされて3日間同じ服で過ごした。',
            'バルセロナじゃなくてブエノスアイレス？全然違う場所じゃん！まあピンクの「I Love Barcelona」Tシャツ似合ってたけどな。',
        ],
        context: 'carousel は「荷物受取のターンテーブル」。sinking feeling は「絶望的な気持ち」。toiletry kit は「アメニティセット」。the world is most enthusiastic tourist は「世界一やる気のある観光客」。ロストバゲージは旅の定番トラブル。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 175, japanese: '失敗から学ぶことが多い',
        english: [
            'You learn a lot from mistakes.',
            'Every travel disaster taught me something I will never forget.',
            'I am a much better traveler now specifically because of all the stupid things I have done.',
            "Well said. I wouldn't trade any of those disasters. They're what made us actual travelers instead of just tourists.",
        ],
        jaTranslations: [
            '失敗から学ぶことが多い。',
            '旅のトラブルって全部忘れられない教訓になるんだよ。',
            '今までやった馬鹿なこと全部のおかげで、だいぶ旅上手になった。',
            'いいこと言うね。あのトラブルの一つも手放したくない。あれがあったから、ただの観光客じゃなくて本物の旅人になれたんだ。',
        ],
        context: 'tuition fee は「授業料」。suspicious は「疑い深い」。cautious は「慎重な」。a life well-traveled は「旅に満ちた人生」。失敗から学ぶ姿勢を英語で表現。keep the lesson but not the fear は名言級のフレーズ。',
        character: 'master', category: 'social', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 176: おすすめスポット (Recommending Places)
    // Scene: それぞれが行って良かった場所を熱く語り合っている
    // ────────────────────────────────────────────────────

    {
        daySlot: 176, japanese: 'ここは絶対行った方がいい',
        english: [
            'You have to go there.',
            'Trust me, put it on your list. You will not regret it.',
            'If you only visit one place on this trip, make it this one. It is absolutely worth it.',
            "OK, I'm sold. How do we get there? And please tell me it doesn't involve another two-hour hike in the heat.",
        ],
        jaTranslations: [
            'ここは絶対行った方がいい。',
            '騙されたと思ってリストに入れとけ。後悔しないから。',
            'この旅で一箇所だけ行くなら、ここにしろ。絶対に価値がある。',
            'OK、行く。どうやって行くの？頼むからまた炎天下で2時間ハイキングとかじゃないよね？',
        ],
        context: 'must-visit は「絶対行くべき場所」。making such a big deal は「大げさに言う」。take it all in は「全部目に焼き付ける」。英語で場所をおすすめするときは情熱的に語るのが効果的。without a screen は現代的な名言。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: '穴場を見つけた',
        english: [
            'I found a hidden spot.',
            'I found this amazing place that nobody knows about.',
            'Forget the famous spots. I found a little beach that is not in any guidebook and it was paradise.',
            "That sounds incredible. You have to tell us where it is. I promise I won't post it online. Well, probably.",
        ],
        jaTranslations: [
            '穴場を見つけた。',
            '誰も知らないすごい場所見つけた。',
            '有名な場所は忘れろ。ガイドブックにも載ってない小さいビーチ見つけたんだけど、天国だった。',
            'それヤバそう。場所教えてよ。ネットには載せないから。たぶん。',
        ],
        context: 'hidden spot は「穴場」。off the beaten path は「人が行かない場所」。cove は「入り江」。crystal clear は「透き通った」。not a single person in sight は「誰もいない」。穴場を秘密にしたい心理は万国共通。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: '朝一で行くべき',
        english: [
            'Go first thing in the morning.',
            'Get there early before the crowds show up.',
            'The trick is to arrive right when they open. By ten it is packed and you cannot enjoy anything.',
            "Noted. I am not a morning person at all, but if it means skipping a three-hour line, I'll set my alarm.",
        ],
        jaTranslations: [
            '朝一で行くべき。',
            '人が来る前に早く行け。',
            'コツは開店と同時に行くこと。10時には激混みで何も楽しめない。',
            'メモった。朝全然ダメな人間だけど、3時間待ちを回避できるならアラームかけるわ。',
        ],
        context: 'first thing in the morning は「朝一で」。packed は「混んでいる」。the early bird gets the worm は「早起きは三文の得」。opening time は「開店時間」。朝一行動は海外旅行の鉄則。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: 'あそこは行かなくていい',
        english: [
            'You can skip that one.',
            'Honestly, it is overrated. Do not waste your time.',
            'Everyone says you have to go there but it is just a crowded mess with overpriced souvenirs.',
            "Thank you! I've been saying the same thing. Total waste of time. The local neighborhood two blocks away was ten times better.",
        ],
        jaTranslations: [
            'あそこは行かなくていい。',
            '正直あそこは期待はずれだから。時間の無駄。',
            'みんな行けって言うけど、混んでるだけでぼったくりお土産屋だらけだよ。',
            'それな！ずっと同じこと言ってたわ。完全に時間の無駄。2ブロック先の地元のエリアの方が10倍良かった。',
        ],
        context: 'overrated は「過大評価されている」。separate tourists from their money は「観光客から金を巻き上げる」。vendors は「露天商」。aggressive は「しつこい」。有名観光地のガッカリ体験を英語で表現。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: '地元の市場が一番楽しい',
        english: [
            'The local market is the best part.',
            'If you want to see the real culture, go to the morning market.',
            'I spent four hours at the local market and it was more fun than any museum or monument.',
            "Yes! The cheese guy gave me like ten free samples too. I ended up buying way too much but no regrets.",
        ],
        jaTranslations: [
            '地元の市場が一番楽しい。',
            '本物の文化を知りたいなら朝市に行け。',
            '地元の市場で4時間過ごしたけど、どの美術館や記念碑より楽しかった。',
            'それ！チーズのおっちゃんが試食10個くらいくれてさ。結局買いすぎたけど後悔ゼロ。',
        ],
        context: 'morning catch は「朝の水揚げ」。stealing samples は「試食をこっそり取る」。felt guilty は「罪悪感を感じた」。museums tell you, markets let you live it は対比表現。市場は文化体験の宝庫。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: '夜景がきれいな場所がある',
        english: [
            'There is a great spot for night views.',
            'I know a place with the most incredible view at night.',
            'If you go up the hill behind the old church at sunset, you get a view that will blow your mind.',
            "OK, we're going tonight. Everyone bring a jacket, it probably gets cold up there after sunset. This sounds amazing.",
        ],
        jaTranslations: [
            '夜景がきれいな場所がある。',
            '夜の景色が信じられないくらいきれいな場所知ってる。',
            '古い教会の裏の丘を日没に登ると、度肝を抜かれる景色が見られる。',
            'OK、今夜行こう。上は日没後寒くなるだろうから全員上着持ってこいよ。めっちゃ良さそう。',
        ],
        context: 'blow your mind は「度肝を抜く」。spread out below は「眼下に広がる」。come alive は「生き生きとする」。夜景スポットをおすすめするときの熱量。secret spot を教えるのは信頼の証。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: '次はいつ行く？',
        english: [
            'When are we going next?',
            'I am already thinking about the next trip. When are you free?',
            'We should start planning the next one now while we are still excited about this trip.',
            "I'm in! Let's pick somewhere before we go home. Once we're back to our routines, it'll never happen.",
        ],
        jaTranslations: [
            '次はいつ行く？',
            'もう次の旅のこと考えてるんだけど。いつ空いてる？',
            'まだテンション上がってるうちに次の計画立てよう。',
            '俺も行く！帰る前に行き先決めよう。日常に戻ったら絶対うやむやになるから。',
        ],
        context: 'fired up は「やる気に満ちている」。routines は「日常のルーティン」。full of regrets は「後悔だらけ」。who is in は「誰が参加する？」。旅のテンションがあるうちに次を計画する提案。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: 'Wi-Fiがあるカフェを探そう',
        english: [
            'Let us find a cafe with Wi-Fi.',
            'I need Wi-Fi badly. Is there a cafe nearby?',
            'I have not been online in six hours and I am getting withdrawal symptoms. Where is the nearest cafe with free Wi-Fi?',
            "There's one around the corner, I saw the Wi-Fi sign earlier. Let's grab coffee and charge our phones while we're at it.",
        ],
        jaTranslations: [
            'Wi-Fiがあるカフェを探そう。',
            'Wi-Fiマジで必要。近くにカフェない？',
            '6時間ネットに繋がってなくて禁断症状出てきた。無料Wi-Fiあるカフェどこ？',
            'この角曲がったとこにあったぞ、さっきWi-Fiのマーク見た。コーヒー飲みながら充電もしよう。',
        ],
        context: 'withdrawal symptoms は「禁断症状」。disconnect from technology は「テクノロジーから離れる」。nothing is on fire は「大問題が起きていない」。defeats the purpose は「目的に反する」。Wi-Fi依存は現代の旅行者あるある。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: 'ガイドブックに載ってない店が最高',
        english: [
            'The best places are not in guidebooks.',
            'The restaurant that changed my life was one I found by accident.',
            'Every time I follow a guidebook recommendation I am disappointed. The real gems are the ones you stumble into.',
            "A hundred percent. Just look for the place where all the locals are eating. That's never gonna steer you wrong.",
        ],
        jaTranslations: [
            'ガイドブックに載ってない店が一番いい。',
            '人生変わったレストランは偶然見つけた店だった。',
            'ガイドブックの店行くたびにガッカリする。本当の名店は偶然入る店なんだよ。',
            'それな。地元の人がいっぱいいる店探せばいい。それで外れたことないから。',
        ],
        context: 'gems は「宝石」=名店。stumble into は「偶然見つける」。local charm は「地元の魅力」。chalkboard は「黒板」。transcendent は「超越的に素晴らしい」。ガイドブックに頼らない旅の哲学。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 176, japanese: 'お土産はどこで買う？',
        english: [
            'Where should I buy souvenirs?',
            'I need to get souvenirs but I do not want to buy the same junk everyone else buys.',
            'Is there a place where I can get authentic local crafts instead of those made-in-China keychains?',
            "Try the market we went to yesterday. There was a guy selling handmade stuff in the back. Way better than the tourist junk near the station.",
        ],
        jaTranslations: [
            'お土産どこで買う？',
            'お土産買わなきゃだけど、みんなと同じようなゴミは買いたくない。',
            'メイドインチャイナのキーホルダーじゃなくて、ちゃんとした地元の工芸品買える場所ない？',
            '昨日行った市場行ってみ。奥の方で手作りの物売ってるおっちゃんいたぞ。駅前の観光客向けのやつより全然いい。',
        ],
        context: 'authentic local crafts は「本物の地元工芸品」。made-in-China は「中国製の大量生産品」。artisan は「職人」。something with a story は「物語のあるもの」。お土産選びのこだわりを英語で表現。',
        character: 'yuki', category: 'social', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 177: 次の旅行の計画 (Planning the Next Trip)
    // Scene: 居酒屋で次の旅行先を真剣に話し合っている
    // ────────────────────────────────────────────────────

    {
        daySlot: 177, japanese: '次はどこに行きたい？',
        english: [
            'Where do you want to go next?',
            'If you could go anywhere in the world, where would it be?',
            'We should start throwing out ideas for the next trip. No budget limits, dream big.',
            "Ooh, I've always wanted to go to Portugal. The food, the weather, the prices. Everything about it sounds perfect.",
        ],
        jaTranslations: [
            '次はどこに行きたい？',
            '世界のどこでも行けるとしたら、どこ行く？',
            '次の旅のアイデア出し合おうよ。予算とか気にしないで、夢でっかく行こう。',
            'おー、ポルトガルずっと行きたかったんだよね。飯、天気、物価、全部最高って聞く。',
        ],
        context: 'throwing out ideas は「アイデアを出し合う」。dream destination は「夢の旅行先」。checked off は「チェックを入れた」。makes our hearts beat faster は「心拍が上がる」。旅行計画の議論は居酒屋で最も盛り上がる話題の一つ。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: '予算はどれくらい？',
        english: [
            'What is our budget?',
            'How much can everyone spend? Let us be realistic.',
            'Before we get too excited, let us figure out the budget first so we do not end up planning a trip we cannot afford.',
            "Good point. Let's be real about it this time so nobody has to back out last minute like what happened before.",
        ],
        jaTranslations: [
            '予算はどれくらい？',
            'みんないくら出せる？現実的に行こう。',
            '盛り上がる前に予算決めとこうよ。払えない旅行計画立てても意味ないからさ。',
            'それな。今回はちゃんと現実的にいこう。前みたいに直前でキャンセルする人出ないようにさ。',
        ],
        context: 'what are we working with は「どれくらい使える」。backed out は「辞退した」。no shame は「恥ずかしがらなくていい」。on every budget は「あらゆる予算で」。予算の話は旅行計画で最も重要かつ微妙な話題。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: '航空券を調べてみよう',
        english: [
            'Let me check flight prices.',
            'I will look up flights. Sometimes you find crazy deals.',
            'Give me five minutes. I am going to search every airline and find us the cheapest flights.',
            "Nice, let me know what you find. And try incognito mode, I swear the prices go up when they know you're looking.",
        ],
        jaTranslations: [
            '航空券を調べてみよう。',
            '航空券調べるわ。たまにとんでもない激安があるからさ。',
            '5分くれ。全航空会社調べて最安値見つけてくる。',
            'いいね、見つけたら教えて。あとシークレットモードで調べろよ、見てると値段上がる気がするから。',
        ],
        context: 'crazy deals は「信じられない格安」。booking sites は「予約サイト」。incognito mode は「シークレットモード」。flexible with dates は「日程に融通をきかせる」。航空券の裏技は旅行者の共通言語。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: 'ホテルと民泊どっちがいい？',
        english: [
            'Hotel or Airbnb?',
            'Should we book a hotel or try an Airbnb this time?',
            'I am thinking Airbnb might be better because we can cook and save money on eating out.',
            "Airbnb for sure. If we split a big apartment six ways, it'll be way cheaper and we can cook our own breakfast.",
        ],
        jaTranslations: [
            'ホテルと民泊どっちがいい？',
            '今回はホテルにする？民泊にする？',
            '民泊の方がいいかも。自炊できるから外食費浮くし。',
            '民泊一択だわ。6人でデカいアパート割り勘したら全然安いし、自分で朝飯も作れる。',
        ],
        context: 'Airbnb は民泊サービスの代名詞。eating out は「外食」。roughing it は「不便を楽しむ」。room service は「ルームサービス」。ホテルvs民泊は現代の旅行者が必ず議論するテーマ。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: '何日休み取れる？',
        english: [
            'How many days off can you take?',
            'I can probably get five days off. What about everyone else?',
            'If we combine a three-day weekend with two vacation days, we can stretch it to a full week.',
            "I can do five days max. Let's just pick the dates now and everyone put in their vacation request tomorrow. No excuses.",
        ],
        jaTranslations: [
            '何日休み取れる？',
            '俺は多分5日は取れる。みんなは？',
            '3連休に有休2日くっつけたら丸1週間になるじゃん。',
            '俺は最大5日だな。今日中に日程決めて、明日みんな有休申請出そう。言い訳なしな。',
        ],
        context: 'schedules to align は「スケジュールを合わせる」。stretch it は「伸ばす」。deathbed は「死の床」。vacation request は「有休申請」。休みの調整は旅行計画最大のハードル。日本人は有休を取ることに罪悪感を感じがち。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: 'パスポートの期限を確認して',
        english: [
            'Check your passport expiration.',
            'Make sure your passport is still valid. Some countries need six months left on it.',
            'I am serious. Check it tonight. I know someone who got turned away at the airport because their passport expired.',
            "Oh shoot, thanks for the reminder. Mine might be expiring soon. I'll check it the second I get home tonight.",
        ],
        jaTranslations: [
            'パスポートの期限確認して。',
            'パスポートまだ有効か確認しろよ。国によっては残り6ヶ月必要だから。',
            'マジで今夜確認しろ。知り合いでパスポート切れてて空港で追い返されたやつ知ってるから。',
            'やべ、思い出させてくれてありがとう。そろそろ切れるかも。帰ったら速攻確認するわ。',
        ],
        context: 'expiration は「有効期限」。validity remaining は「残りの有効期間」。turned away は「追い返された」。renewing は「更新する」。パスポートの有効期限チェックは旅行準備の基本中の基本。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: '旅行保険は入った方がいい？',
        english: [
            'Should we get travel insurance?',
            'I never used to buy travel insurance but after last time I always do.',
            'It sounds like a waste of money until something actually happens and then you wish you had it.',
            "Just get it. It's like three thousand yen and you'll thank yourself if anything goes wrong. Not worth the risk.",
        ],
        jaTranslations: [
            '旅行保険は入った方がいい？',
            '前は旅行保険入らなかったけど、前回の件から毎回入るようにしてる。',
            '無駄金に聞こえるけど、実際何か起きたら入っとけばよかったって後悔するやつだよ。',
            '入っとけ。3千円くらいだし、何かあったとき自分に感謝するから。リスク取る意味ない。',
        ],
        context: 'travel insurance は「旅行保険」。out of pocket は「自腹で」。coverage は「補償範囲」。peace of mind は「安心」。旅行保険の重要性は体験談で語ると説得力がある。日本のクレジットカード付帯保険も要チェック。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: 'ビザって必要？',
        english: [
            'Do we need a visa?',
            'Is that country visa-free for Japanese passport holders?',
            'I should probably check the visa requirements before we go any further with this plan.',
            "I just googled it. Japanese passports are visa-free there, so we're good. One less thing to worry about.",
        ],
        jaTranslations: [
            'ビザって必要？',
            'あの国、日本のパスポートでビザなしで行ける？',
            'これ以上計画進める前にビザの要件調べた方がいいかも。',
            '今ググった。日本のパスポートならビザ不要だから大丈夫。心配事が一個減ったな。',
        ],
        context: 'visa-free は「ビザ免除」。visa on arrival は「到着時ビザ取得」。denied boarding は「搭乗拒否」。Japanese passports are pretty powerful は事実で世界最強クラス。ビザ要件の確認は渡航前の必須項目。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: 'もう楽しみすぎる',
        english: [
            'I cannot wait.',
            'I am already so excited. I cannot focus on anything else.',
            'I know we just started planning but I am already counting the days.',
            "Same! I'm already looking up restaurants. Someone make a group chat so we can start planning for real.",
        ],
        jaTranslations: [
            'もう待ちきれない。',
            'もうワクワクしすぎて他のこと何も手につかない。',
            'まだ計画始めたばっかなのに、もう指折り数えてるんだけど。',
            'わかる！もうレストラン調べてるもん。誰かグループチャット作ってよ、本格的に計画しよう。',
        ],
        context: 'counting the days は「指折り数えて待つ」。anticipation は「期待・ワクワク」。spreadsheet は「スプレッドシート」。nothing has gone wrong yet は「まだ何も失敗していない」。旅行計画の段階が一番楽しいという共感。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 177, japanese: '現地の言葉を少し覚えよう',
        english: [
            'Let us learn some of the language.',
            'I want to learn at least the basics before we go.',
            'Even just knowing how to say hello and thank you in the local language makes a huge difference.',
            "Totally. Even just 'hello' and 'thank you' in the local language goes a long way. People really appreciate the effort.",
        ],
        jaTranslations: [
            '現地の言葉を少し覚えよう。',
            '行く前に基本だけでも覚えたいんだよね。',
            '現地の言葉で「こんにちは」と「ありがとう」が言えるだけでも全然違うんだよ。',
            'それな。挨拶とお礼だけでも現地の言葉で言うと、めっちゃ喜ばれるんだよ。努力が伝わるんだな。',
        ],
        context: 'the basics は「基本フレーズ」。make the effort は「努力する」。appreciate は「感謝する」。shows respect は「敬意を示す」。旅先の言語を少しでも覚えると、現地の人の反応が劇的に変わる。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 178: 帰国 (Coming Home)
    // Scene: 旅から帰ってきて日本の良さを再認識している
    // ────────────────────────────────────────────────────

    {
        daySlot: 178, japanese: 'やっぱり日本が一番',
        english: [
            'Japan is still the best.',
            'I love traveling but there is nothing like coming home to Japan.',
            'After two weeks abroad I have never appreciated Japanese convenience stores and clean toilets more.',
            "First thing I did was hit a convenience store. That onigiri tasted like heaven after two weeks of bread and cheese.",
        ],
        jaTranslations: [
            'やっぱり日本が一番。',
            '旅行は好きだけど、日本に帰ってくるのが一番ほっとする。',
            '2週間海外にいて、日本のコンビニと綺麗なトイレのありがたみがこんなにわかったの初めてだわ。',
            '帰って最初にやったのコンビニ直行。2週間パンとチーズだったから、おにぎりが天国の味したわ。',
        ],
        context: 'there is nothing like は「〜に勝るものはない」。wave of relief は「安堵の波」。appreciate は「ありがたみがわかる」。日本のコンビニのクオリティは帰国後に再認識する定番ポイント。',
        character: 'takeshi', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: '時差ボケがひどい',
        english: [
            'I have terrible jet lag.',
            'My body has no idea what time zone it is in right now.',
            'It is three in the afternoon and I feel like it is the middle of the night. Jet lag is destroying me.',
            "You too? I fell asleep at my desk yesterday and my boss caught me. Told her I was 'resting my eyes.'",
        ],
        jaTranslations: [
            '時差ボケがひどい。',
            '今どこのタイムゾーンにいるか体が全然わかってない。',
            '昼の3時なのに真夜中みたいな気分。時差ボケに殺されてる。',
            'お前もか？昨日デスクで寝落ちして上司にバレた。「目を休めてただけです」って言ったけど。',
        ],
        context: 'jet lag は「時差ボケ」。wide awake は「完全に目が冴えている」。internal clock は「体内時計」。look like a zombie は「ゾンビみたいに見える」。時差ボケの辛さを英語で大げさに表現。',
        character: 'yuki', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: '洗濯物が山ほどある',
        english: [
            'I have so much laundry to do.',
            'My suitcase is basically a mountain of dirty clothes.',
            'I opened my suitcase and the smell hit me like a wall. Two weeks of laundry waiting to be done.',
            "Girl, just throw it all in the machine at once. Don't even open the suitcase slowly. Rip off the band-aid.",
        ],
        jaTranslations: [
            '洗濯物が山ほどある。',
            'スーツケースの中が汚れた服の山。',
            'スーツケース開けた瞬間に臭いが壁みたいにドンと来た。2週間分の洗濯物が待ってる。',
            'もう全部一気に洗濯機にぶち込め。スーツケースゆっくり開けんな。一思いにやれ。',
        ],
        context: 'ticking time bomb は「時限爆弾」。beyond dirty は「汚いを超越している」。aftermath は「後始末」。unpacking は「荷物を開ける」。旅行後の洗濯地獄は全旅行者が共感するテーマ。',
        character: 'mina', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: '現実に戻りたくない',
        english: [
            'I do not want to go back to reality.',
            'Can we just pretend the trip is not over?',
            'I have work tomorrow and I am already dreading it. I want to still be on vacation.',
            "I feel you. I spent my entire morning meeting daydreaming about that cafe by the ocean. Reality is overrated.",
        ],
        jaTranslations: [
            '現実に戻りたくない。',
            'まだ旅行終わってないことにしていい？',
            '明日仕事とか考えただけで憂鬱。まだ休暇でいたい。',
            'わかるわ。午前中の会議ずっと海沿いのカフェのこと妄想してた。現実なんてクソだわ。',
        ],
        context: 'dreading は「恐れている」。post-vacation depression は「旅行後の鬱」。classified as は「分類される」。my body is here but my mind is still は「体はここだけど心はまだ」。帰国後の現実復帰の辛さは全世界共通。',
        character: 'lisa', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: '写真を整理しないと',
        english: [
            'I need to organize my photos.',
            'I took like two thousand photos and I need to sort through them.',
            'Half of my phone storage is from this one trip. I really need to back everything up and delete the blurry ones.',
            "Just pick your top twenty and post those. You and I both know you'll never sort through all two thousand of them.",
        ],
        jaTranslations: [
            '写真を整理しないと。',
            '2千枚くらい撮ったから整理しないと。',
            'スマホの容量の半分がこの旅行だけで埋まった。バックアップしてブレてるの消さないと。',
            'ベスト20枚選んでそれだけ投稿しろよ。2千枚全部整理するわけないの、お前も俺もわかってるだろ。',
        ],
        context: 'sort through は「選別する」。camera roll は「カメラロール」。phone storage は「スマホの容量」。back up は「バックアップする」。写真を大量に撮って整理しないのは現代の旅行者あるある。',
        character: 'takeshi', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: 'お土産を渡さないと',
        english: [
            'I need to give out the souvenirs.',
            'I bought souvenirs for everyone at work and I am already regretting it.',
            'I spent more on souvenirs than I did on myself. That is the Japanese curse of traveling.',
            "Twenty-three souvenirs? That's so Japanese of you. I just bought a box of cookies at duty-free and called it a day.",
        ],
        jaTranslations: [
            'お土産を渡さないと。',
            '職場全員分のお土産買ったけど、もう後悔してる。',
            'お土産に自分の分より金使ったわ。これが日本人旅行者の宿命だよ。',
            '23個？日本人すぎるだろ。俺なんか免税店でクッキー一箱買って終わりだぞ。',
        ],
        context: 'give out は「配る」。empty-handed は「手ぶらで」。duty-free は「免税店」。the Japanese curse of traveling は「日本人旅行者の宿命」。お土産文化は日本特有。英語圏ではそこまでお土産を配らない。',
        character: 'kenji', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: '向こうの食事が恋しい',
        english: [
            'I miss the food there.',
            'I would do anything for one more plate of that pasta right now.',
            'I have been back for a week and I still cannot stop thinking about that little restaurant by the harbor.',
            "I tried making that pasta from the little restaurant and it was decent but... it's just not the same without the view, you know?",
        ],
        jaTranslations: [
            '向こうの食事が恋しい。',
            'あのパスタもう一皿食えるなら何でもするわ。',
            '帰ってきて1週間経つのに、まだあの港のレストランのことが頭から離れない。',
            'あの小さいレストランのパスタ再現してみたんだけど、まあまあだったけど...あの景色がないと同じにならないんだよな。',
        ],
        context: 'I miss は「恋しい」。recreate は「再現する」。you cannot bottle that feeling は「あの感覚は瓶詰めにできない」。vacation food は「旅行中の食事」。旅先の食事が特別な理由は環境も含めた総合体験だから。',
        character: 'master', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: '帰ってきたらやることが山積み',
        english: [
            'I have so much to catch up on.',
            'I came back to three hundred unread emails and a pile of work.',
            'Two weeks of vacation means two weeks of accumulated chaos waiting for me at my desk.',
            "Same. Three hundred unread emails and a sticky note from my boss that just says 'we need to talk.' Vacation vibes gone in ten minutes.",
        ],
        jaTranslations: [
            '帰ってきたらやることが山積み。',
            '帰ったら未読メール300件と仕事の山が待ってた。',
            '2週間の休暇は2週間分の混乱が机の上に積み上がるってことだ。',
            '同じだわ。未読メール300件と上司からの「話がある」って付箋。休暇気分10分で消えた。',
        ],
        context: 'catch up on は「溜まったことを片付ける」。accumulated chaos は「蓄積された混乱」。evaporated は「蒸発した」。sticky note は「付箋」。旅行後の仕事復帰の恐怖を英語で表現。',
        character: 'yuki', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: '太って帰ってきた',
        english: [
            'I gained weight on the trip.',
            'I ate everything in sight and now my pants do not fit.',
            'I stepped on the scale this morning and I am three kilograms heavier than when I left.',
            "Only three kilos? Amateur. I'm up four and a half. But honestly, worth every single bite.",
        ],
        jaTranslations: [
            '旅行で太った。',
            '見るもの全部食べてたらズボン入らなくなった。',
            '今朝体重計乗ったら出発前より3キロ増えてた。',
            'たった3キロ？甘いな。俺は4.5キロ増だぞ。でも正直、一口一口全部価値あったわ。',
        ],
        context: 'gained weight は「太った」。the elephant in the room は「みんな気づいているのに誰も言わない問題」。in my defense は「言い訳をさせてもらうと」。sticking with it は「それで押し通す」。旅行太りは全旅行者あるある。',
        character: 'takeshi', category: 'feeling', month: '2026-09',
    },
    {
        daySlot: 178, japanese: '旅行って最高だよね',
        english: [
            'Traveling is the best.',
            'Nothing makes me feel more alive than traveling.',
            'I work fifty weeks a year just so I can travel for two. And it is totally worth it.',
            "Cheers to that. My wallet's empty but my heart's full. When do we start planning the next one?",
        ],
        jaTranslations: [
            '旅行って最高だよね。',
            '旅行してるときほど生きてる実感があることない。',
            '50週働いて2週間旅行するために生きてる。それだけの価値は完全にある。',
            'それに乾杯だ。財布は空だけど心は満タン。次の計画いつから始める？',
        ],
        context: 'feel alive は「生きている実感がある」。makes me richer は「豊かにしてくれる」。wider view は「広い視野」。savings account は「貯金口座」。旅行の価値を語る総括表現。お金では買えない豊かさ。',
        character: 'master', category: 'feeling', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 179: 旅の振り返り (Trip Reflection)
    // Scene: 居酒屋で旅全体を振り返り、成長を実感している
    // ────────────────────────────────────────────────────

    {
        daySlot: 179, japanese: '一番の思い出は何？',
        english: [
            'What was the highlight?',
            'If you had to pick one moment from the whole trip, what would it be?',
            'I have been thinking about the best moment of the trip and honestly I cannot narrow it down to just one.',
            "For me it was that quiet morning on the beach when nobody else was awake. Just me, the ocean, and the fishermen. Perfect.",
        ],
        jaTranslations: [
            '一番の思い出は何？',
            '旅行全部の中から一瞬だけ選ぶとしたら、何？',
            '旅のベストモーメント考えてたんだけど、正直一つに絞れないんだよな。',
            '俺はあの朝だな。ビーチで誰も起きてなくて、俺と海と漁師だけ。最高だった。',
        ],
        context: 'highlight は「ハイライト」。narrow it down は「絞る」。life-changing は「人生を変える」。perfect silence は「完璧な静けさ」。旅のベストモーメントは意外と静かな瞬間だったりする。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: '旅行前と何か変わった？',
        english: [
            'Did anything change for you?',
            'Do you feel different compared to before the trip?',
            'I feel like I came back as a slightly different person. Not dramatically, but something shifted.',
            "Definitely. I feel like I was on autopilot before this trip. Now I actually want to shake things up a bit back home.",
        ],
        jaTranslations: [
            '旅行前と何か変わった？',
            '旅行前と比べて何か違う感じする？',
            'ちょっとだけ違う人間になって帰ってきた気がする。劇的じゃないけど、何かが変わった。',
            '確かに。この旅行の前はオートパイロットで生きてた気がする。今は日常をちょっと変えたいって思ってる。',
        ],
        context: 'going through the motions は「惰性でこなす」。something shifted は「何かが変わった」。predictable は「予測可能な」。drastic は「急激な」。keep curiosity alive は「好奇心を持ち続ける」。旅が日常を見直すきっかけになる。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: '英語力は伸びた？',
        english: [
            'Did your English improve?',
            'I think my English actually got better. I feel more confident now.',
            'Two weeks of using English every day did more for me than two years of textbook studying.',
            "Honestly, yeah. By the second week you were just talking without that long pause. It was really cool to watch.",
        ],
        jaTranslations: [
            '英語力は伸びた？',
            '英語ちょっと上手くなった気がする。前より自信ついた。',
            '2週間毎日英語使った方が、2年間の教科書勉強より効果あったわ。',
            '正直、うん。2週目にはあの長い間がなくなって普通に喋ってたよ。見てて感動した。',
        ],
        context: 'rehearse は「リハーサルする」。buffering は「読み込み中」(パソコン用語を比喩的に)。grammatically questionable は「文法的に怪しい」。jumping in は「飛び込む」。実践が最強の英語学習法であることの実感。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: 'もっと冒険すればよかった',
        english: [
            'I wish I had been more adventurous.',
            'I played it too safe on this trip. Next time I want to take more risks.',
            'Looking back, all my favorite moments were when I stepped outside my comfort zone.',
            "Then let's make a deal. Next trip, we both say yes to everything. No more chickening out. Deal?",
        ],
        jaTranslations: [
            'もっと冒険すればよかった。',
            '今回の旅、安全策取りすぎた。次はもっとリスク取りたい。',
            '振り返ると、一番良かった瞬間って全部コンフォートゾーン出たときなんだよな。',
            'じゃあ約束しよう。次の旅は全部イエス。もうビビるのなし。いいな？',
        ],
        context: 'played it safe は「安全策を取った」。comfort zone は「安全圏」。within reason は「常識の範囲内で」。zip line は「ジップライン」。旅の後悔は「やったこと」より「やらなかったこと」の方が大きい。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: '次はもっと計画を立てる',
        english: [
            'I will plan better next time.',
            'We were a little too spontaneous this time. A bit more planning would help.',
            'I am not saying we should plan every minute, but maybe we should at least book the important stuff in advance.',
            "Agreed. Let's at least check opening hours and reservations next time. Showing up to a closed restaurant twice was rough.",
        ],
        jaTranslations: [
            '次はもっと計画を立てる。',
            '今回はちょっとノープランすぎた。もう少し計画した方がいいかも。',
            '分刻みで計画しろとは言わないけど、大事なところは事前に予約した方がいい。',
            'それな。次は営業時間と予約くらいは確認しよう。閉まってるレストランに2回行ったのはキツかった。',
        ],
        context: 'spontaneous は「自然発生的な」。itinerary は「旅程」。opening hours は「営業時間」。book in advance は「事前に予約する」。計画性と自由度のバランスは旅行スタイルの永遠のテーマ。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: 'あのときの自分が信じられない',
        english: [
            'I cannot believe I did that.',
            'I still cannot believe I actually talked to a stranger in English.',
            'If you had told me a year ago that I would be ordering food in Italian, I would have laughed in your face.',
            "You negotiated in English AND made Americans laugh? That's huge. Give yourself some credit, seriously.",
        ],
        jaTranslations: [
            'あのときの自分が信じられない。',
            '英語で知らない人に話しかけたの、まだ信じられない。',
            '1年前の俺にイタリア語で料理注文するって言ったら、顔の前で笑われてたわ。',
            '英語で交渉してアメリカ人笑わせたんだろ？すごいことだぞ。もっと自分を褒めろよ、マジで。',
        ],
        context: 'acknowledge は「認める」。broken English は「片言の英語」。freeze up は「固まる」。climbing Everest は「エベレスト登頂」(比喩)。小さな成長を認めることの大切さ。英語力の成長は劇的ではなく日常の中にある。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: 'みんなと行けてよかった',
        english: [
            'I am glad I went with everyone.',
            'This trip would not have been the same without all of you.',
            'Solo travel is great but there is something special about sharing these experiences with friends.',
            "OK now I'm getting emotional. Stop it. But seriously, this wouldn't have been half as fun without you guys.",
        ],
        jaTranslations: [
            'みんなと行けてよかった。',
            'みんながいなかったらこの旅は全然違ってた。',
            '一人旅もいいけど、友達とこういう経験を共有するのは特別なんだよな。',
            'やめろ泣きそうになるだろ。でもマジで、お前らがいなかったら半分も楽しくなかったわ。',
        ],
        context: 'cheesy は「クサい」。it was not about the destination は「場所じゃなかった」。ordinary moments extraordinary は対比表現。旅仲間への感謝を英語で伝える。英語では感情をストレートに表現する方が好まれる。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: 'もう次の旅の夢を見ている',
        english: [
            'I am already dreaming about the next trip.',
            'I fell asleep last night thinking about where we should go next.',
            'My body came home but my heart stayed overseas. I am already browsing flights for the next adventure.',
            "Ha, you're already looking at flights, aren't you? I saw you on that booking site on the train. You're hopeless.",
        ],
        jaTranslations: [
            'もう次の旅の夢を見ている。',
            '昨日寝る前、次どこ行くか考えてた。',
            '体は帰ってきたけど心は海外に置いてきた。もう次の冒険の航空券検索してる。',
            'はは、もう航空券調べてるだろ？電車で予約サイト見てたの知ってるぞ。お前は救いようがない。',
        ],
        context: 'browsing flights は「航空券を検索する」。sit still は「じっとしている」。boarding pass は「搭乗券」。a new version of myself は「新しい自分」。旅への情熱を詩的に表現。終わりのない旅のリストは旅好きの証。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: '写真を見返すと泣きそう',
        english: [
            'Looking at the photos makes me emotional.',
            'I scrolled through the trip photos last night and almost cried.',
            'It has only been a week but looking at these photos already feels like looking at a different lifetime.',
            "Send me that photo from the last night, the one Mina took. Everyone looks so happy in it. I want it as my wallpaper.",
        ],
        jaTranslations: [
            '写真を見返すと泣きそう。',
            '昨日旅行の写真見返してたら泣きそうになった。',
            'まだ1週間しか経ってないのに、写真見ると別の人生を見てるみたいに感じる。',
            '最後の夜のあの写真送って、ミナが撮ったやつ。みんなめっちゃ幸せそうなやつ。壁紙にしたい。',
        ],
        context: 'nostalgic は「懐かしい」。watery は「潤んだ」。snapped は「パシャッと撮った」。genuinely happy は「本当に幸せ」。you cannot go back to it は「戻れない」。写真が呼び起こす旅の記憶と切なさ。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 179, japanese: '旅は人生を豊かにする',
        english: [
            'Travel enriches your life.',
            'Every trip teaches you something you did not know you needed to learn.',
            'I have read a thousand books about the world but one trip taught me more than all of them combined.',
            "You always know exactly what to say, Master. I'm raising my glass to that. To more trips and more moments like this.",
        ],
        jaTranslations: [
            '旅は人生を豊かにする。',
            '旅に出るたび、自分が知らなかった何かを学ぶんだよ。',
            '本は千冊読んだけど、一回の旅の方がそれ全部合わせたより多くのことを教えてくれた。',
            'マスターはいつもちょうどいいこと言うよな。グラス上げるわ。もっと旅を、もっとこういう瞬間を。',
        ],
        context: 'enriches は「豊かにする」。investment は「投資」。perspective は「視野」。feel small in the best possible way は「良い意味で自分の小ささを感じる」。旅の哲学的価値を語る総括。マスターらしい深い言葉。',
        character: 'master', category: 'social', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 180: 旅月卒業 (Month 6 Graduation)
    // Scene: 旅の月の最終日、全員が旅を通じて成長した実感を分かち合う
    // ────────────────────────────────────────────────────

    {
        daySlot: 180, japanese: 'この一ヶ月で世界が広がった',
        english: [
            'My world got bigger this month.',
            'A month ago the world felt small and familiar. Now it feels endless.',
            'I used to think the world was what I could see from my window. Now I know it is so much bigger.',
            "I feel that. A month ago the idea of traveling scared me. Now I actually can't wait. That's a pretty big shift.",
        ],
        jaTranslations: [
            'この一ヶ月で世界が広がった。',
            '一ヶ月前は世界が狭くて見慣れたものだった。今は果てしなく感じる。',
            '前は窓から見える範囲が世界だと思ってた。今はもっとずっと広いって知ってる。',
            'わかる。一ヶ月前は旅行って聞くだけで怖かった。今は待ちきれない。結構デカい変化だよな。',
        ],
        context: 'my world got bigger は「世界が広がった」。possibilities instead of obstacles は「障害ではなく可能性」。curious instead of anxious は「不安ではなく好奇心」。旅の月を通じた内面的成長の実感。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: '英語で旅ができる自信がついた',
        english: [
            'I feel confident traveling in English now.',
            'I am not fluent but I know enough to survive and that is everything.',
            'A month ago I could not order a coffee in English. Now I can navigate an entire trip.',
            "You should be proud. Seriously, a month ago you couldn't even order a coffee without panicking. Look at you now.",
        ],
        jaTranslations: [
            '英語で旅ができる自信がついた。',
            'ペラペラじゃないけど、生き延びるくらいの英語はわかる。それで十分だ。',
            '一ヶ月前は英語でコーヒーも注文できなかった。今は旅行丸ごと英語で乗り切れる。',
            '誇りに思えよ、マジで。一ヶ月前はコーヒー注文でパニクってたんだぞ。今の自分見てみ。',
        ],
        context: 'navigate は「乗り切る」。kept me up at night は「夜も眠れなかった」。brave enough to be imperfect は「不完全でいる勇気」。英語力の自信は完璧さからではなく、不完全でも通じた体験から生まれる。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: 'トラブルも含めて全部良い経験',
        english: [
            'Even the bad parts were good experiences.',
            'I would not change a single thing, not even the disasters.',
            'The mishaps and the mistakes made this month more real and more memorable than any perfect plan could.',
            "Exactly. The wrong hotel story alone is gonna be my go-to dinner party story for the next ten years.",
        ],
        jaTranslations: [
            'トラブルも含めて全部良い経験。',
            '一つも変えたくない。トラブルも含めて全部。',
            'ハプニングとかミスがあったからこそ、完璧な計画よりリアルで思い出に残る一ヶ月になった。',
            'それな。ホテル間違えた話だけで向こう10年は飲み会のネタになるわ。',
        ],
        context: 'mishaps は「ハプニング」。the imperfections are the plot は「不完全さがストーリーの筋」。character development は「キャラクターの成長」(物語用語の比喩)。旅のトラブルを肯定的に捉える哲学。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: '来月も楽しみだな',
        english: [
            'I am excited for next month.',
            'I wonder what next month will bring. I am ready for anything.',
            'If this month taught me about the world out there, I hope next month teaches me about the world in here.',
            "Me too. Whatever next month throws at us, I'm ready. This place doesn't feel like studying anymore. It just feels like hanging out.",
        ],
        jaTranslations: [
            '来月も楽しみだな。',
            '来月何が待ってるか楽しみだ。何が来ても大丈夫。',
            '今月が外の世界を教えてくれたなら、来月は内面の世界を教えてくれるといいな。',
            '俺も。来月何が来ても準備できてる。ここはもう勉強してる感じじゃなくて、ただ遊びに来てる感じだわ。',
        ],
        context: 'chapter in a book は「本の一章」。the world in here は「内面の世界」。it is not a classroom, it is a home は居酒屋学習の本質。6ヶ月の成長を実感する卒業の言葉。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: 'マスター、乾杯しましょう',
        english: [
            'Master, let us make a toast.',
            'Master, pour everyone a drink. I want to make a toast to this amazing month.',
            'Before we wrap up this month, I think we need a proper toast. Master, give us your best sake.',
            "You heard the man, Master. Your best sake, please. To travel, to English, and to all of us. Kanpai!",
        ],
        jaTranslations: [
            'マスター、乾杯しよう。',
            'マスター、みんなに注いで。この最高の一ヶ月に乾杯したい。',
            '今月終わる前にちゃんと乾杯しよう。マスター、一番いい酒出してくれ。',
            '聞いたな、マスター。一番いい酒頼むわ。旅に、英語に、俺たち全員に。乾杯！',
        ],
        context: 'make a toast は「乾杯の音頭を取る」。we owe ourselves は「自分たちへのご褒美」。here is to は「〜に乾杯」。卒業の乾杯。日本語の「乾杯」は一言だが英語ではスピーチ込みで乾杯するのが文化。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: '旅はまだ終わらない',
        english: [
            'The journey is not over.',
            'This is not the end. This is just the beginning of a much bigger journey.',
            'We finished one month but the real adventure, learning English and exploring the world, that never stops.',
            "That gave me chills. You're right, Master. The real journey never ends. Now pour us another round already!",
        ],
        jaTranslations: [
            '旅はまだ終わらない。',
            'これは終わりじゃない。もっと大きな旅の始まりだ。',
            '一ヶ月は終わったけど、本当の冒険、つまり英語を学んで世界を探検すること、それは終わらない。',
            '鳥肌立った。マスターの言う通り、本当の旅は終わらない。ほら、もう一杯注いでくれよ！',
        ],
        context: 'the journey is not over は「旅はまだ終わらない」。between your ears は「頭の中で」。in abundance は「たくさん」。another round は「もう一杯」。マスターの哲学的な締めの言葉。学びそのものが旅である。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: 'いつかみんなで海外に行こう',
        english: [
            'Let us all travel together someday.',
            'One day we should take everything we learned and actually go on a trip together.',
            'Imagine all six of us in a foreign country using the English we practiced here. That would be incredible.',
            "I'm with you. Let's actually do it this time. Not 'someday,' but an actual date on the calendar. Who's in?",
        ],
        jaTranslations: [
            'いつかみんなで海外に行こう。',
            'いつかここで学んだこと全部使って、みんなで旅行に行くべきだよ。',
            '6人全員で外国にいて、ここで練習した英語使ってるの想像してみ。最高じゃん。',
            '俺も乗った。今回はマジでやろう。「いつか」じゃなくて、カレンダーに日付入れよう。誰が来る？',
        ],
        context: 'commit to は「約束する」。preparation は「準備」。who is with me は「誰がやる？」。居酒屋での練習を実践に移す夢。not someday, one specific day は「いつかではなく具体的な日」。行動に移す決意。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: '半年間、ありがとう',
        english: [
            'Thank you for these six months.',
            'I cannot believe it has been six months already. Thank you, everyone.',
            'Six months ago I walked into this izakaya knowing nothing. Now I walk out knowing that I can learn anything.',
            "Master, come on, you're gonna make everyone cry. But thank you. This place changed all of us. Here's to the next six months.",
        ],
        jaTranslations: [
            '半年間、ありがとう。',
            'もう半年経ったなんて信じられない。みんな、ありがとう。',
            '半年前、何も知らないままこの居酒屋に入った。今は何でも学べるって知って出ていく。',
            'マスター、やめてくれよ、みんな泣くだろ。でもありがとう。この店が俺たち全員を変えた。次の半年に乾杯。',
        ],
        context: 'one conversation at a time は「一つの会話ずつ」。vulnerability は「弱さを見せること」。standing out は「目立つこと」。6ヶ月間の総括。マスターの言葉で全員の成長を振り返る感動的な締め。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: 'よし、明日からまた頑張ろう',
        english: [
            'All right, let us keep going tomorrow.',
            'New month starting tomorrow. I am ready. Bring it on.',
            'Six months down, six months to go. The second half starts tomorrow and I am more motivated than ever.',
            "Bring it on. Six months down, six to go. We're not starting from zero this time. That's what makes it exciting.",
        ],
        jaTranslations: [
            'よし、明日からまた頑張ろう。',
            '明日から新しい月だ。準備できてる。来い。',
            '半年終わって残り半年。後半戦は明日からだ。今まで以上にやる気に満ちてる。',
            '来い。半年終わって残り半年。今回はゼロからじゃない。だからこそ楽しいんだよ。',
        ],
        context: 'bring it on は「来い」。six down, six to go は「6ヶ月終わって残り6ヶ月」。a pretty amazing foundation は「かなり素晴らしい基盤」。終わりのない学習を前向きに捉える。it is not a burden, it is a gift は名言。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 180, japanese: 'マスター、もう一杯',
        english: [
            'Master, one more drink.',
            'One more round for everyone. My treat tonight.',
            'The month is over but the night is still young. Master, keep them coming.',
            "Wait, Kenji's buying? In that case, Master, I'll have whatever's most expensive. Cheers, everyone!",
        ],
        jaTranslations: [
            'マスター、もう一杯。',
            'もう一杯みんなに。今夜は俺のおごりだ。',
            '月は終わったけど夜はまだこれからだ。マスター、どんどん出してくれ。',
            'え、ケンジのおごり？それなら、マスター、一番高いやつで。みんな、乾杯！',
        ],
        context: 'my treat は「おごり」。put it on my tab は「つけにして」。the night is still young は「夜はまだこれから」。drink up は「飲み干せ」。居酒屋の最終日にふさわしい締めの一杯。学びと友情の価値をお金に換算できない。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
];

// ============================================================
// DAY THEMES -- MONTH 6 WEEK 24
// ============================================================

export const MONTH6_W24_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    172: {
        title: '旅先のグルメ', titleEn: 'Food on the Road', category: 'order',
        scene: '旅先で入ったレストランの料理が最高すぎてみんな感動している',
        keywords: [
            { en: 'portion', ja: '一人前の量', pron: 'ポーション', example: 'The portions here are enormous.', note: '海外の一人前は日本の2-3倍が普通。a large portion=大盛り。' },
            { en: 'tip', ja: 'チップ', pron: 'ティップ', example: 'How much should we tip?', note: 'アメリカは15-20%が標準。tip=動詞にもなる。tipping culture=チップ文化。' },
            { en: 'local cuisine', ja: '地元料理', pron: 'ローカル キュイジーン', example: 'I want to try the local cuisine.', note: 'cuisine はフランス語由来。「キュイジーン」と発音。food より上品な響き。' },
            { en: 'doggy bag', ja: '持ち帰り袋', pron: 'ドギー バッグ', example: 'Can I get a doggy bag for the leftovers?', note: '元々は「犬のために」という建前で残り物を持ち帰る袋。to-go box とも言う。' },
            { en: 'split the bill', ja: '割り勘にする', pron: 'スプリット ザ ビル', example: 'Can we split the bill six ways?', note: '日本の「割り勘」に相当。go Dutch とも言う。separate checks=個別会計。' },
        ],
    },
    173: {
        title: '異文化体験', titleEn: 'Cultural Experiences', category: 'social',
        scene: '現地の文化体験に参加して日本との違いに驚いている',
        keywords: [
            { en: 'personal space', ja: 'パーソナルスペース', pron: 'パーソナル スペイス', example: 'People here have a very different idea of personal space.', note: '日本人は広め、南欧や中南米は狭め。文化による距離感の違い。' },
            { en: 'etiquette', ja: 'マナー・礼儀作法', pron: 'エチケット', example: 'I need to learn the local etiquette.', note: '国ごとに違うマナーのこと。table etiquette=食事マナー。manners より堅い。' },
            { en: 'authentic', ja: '本物の', pron: 'オーセンティック', example: 'This feels like an authentic cultural experience.', note: '観光用でない「本物の」体験。authentic food=本場の味。真正性を評価する言葉。' },
            { en: 'perspective', ja: '視点・考え方', pron: 'パースペクティブ', example: 'Travel gives you a new perspective on life.', note: 'put things in perspective=視野が広がる。from my perspective=私の視点からすると。' },
            { en: 'gesture', ja: 'ジェスチャー', pron: 'ジェスチャー', example: 'We communicated using gestures and smiles.', note: '手振り身振り。国によって意味が違うジェスチャーもあるので注意。thumbs up=親指立ての仕草。' },
        ],
    },
    174: {
        title: '旅で出会った人', titleEn: 'People Met on Trips', category: 'social',
        scene: '旅先で出会った人との交流を振り返って語り合っている',
        keywords: [
            { en: 'stranger', ja: '見知らぬ人', pron: 'ストレインジャー', example: 'I made friends with a complete stranger at the bar.', note: 'complete stranger=全くの他人。talk to strangers=知らない人に話しかける。' },
            { en: 'connection', ja: 'つながり', pron: 'コネクション', example: 'I felt a real connection with the people we met.', note: 'human connection=人と人のつながり。make a connection=つながりを作る。' },
            { en: 'hospitality', ja: 'おもてなし', pron: 'ホスピタリティ', example: 'The hospitality we received was incredible.', note: '日本の「おもてなし」に近い概念。hospitality industry=接客業。warm hospitality=温かいもてなし。' },
            { en: 'bittersweet', ja: 'ほろ苦い', pron: 'ビタースウィート', example: 'Saying goodbye was bittersweet.', note: '嬉しさと悲しさが混ざった感情。旅の別れにぴったりの単語。甘くて苦い。' },
            { en: 'stay in touch', ja: '連絡を取り合う', pron: 'ステイ イン タッチ', example: 'Let us stay in touch after the trip.', note: 'keep in touch も同じ意味。lose touch=連絡が途絶える。get in touch=連絡する。' },
        ],
    },
    175: {
        title: '旅の失敗談', titleEn: 'Travel Mishaps', category: 'social',
        scene: '居酒屋で旅の失敗談を披露し合って盛り上がっている',
        keywords: [
            { en: 'mishap', ja: 'ハプニング', pron: 'ミスハップ', example: 'Every trip has at least one mishap.', note: 'accidentほど深刻ではない小さなトラブル。travel mishap=旅のハプニング。' },
            { en: 'ripped off', ja: 'ぼったくられた', pron: 'リップド オフ', example: 'I got ripped off by that taxi driver.', note: 'rip off=ぼったくる。rip-off(名詞)=ぼったくり。scammed も類義語。' },
            { en: 'luggage', ja: '荷物', pron: 'ラゲッジ', example: 'The airline lost my luggage.', note: 'baggage も同義。carry-on=機内持ち込み。checked luggage=預け入れ荷物。' },
            { en: 'backup', ja: 'バックアップ', pron: 'バックアップ', example: 'Always back up your photos to the cloud.', note: 'back up(動詞)=バックアップする。backup(名詞)=バックアップ。cloud=クラウド。' },
            { en: 'lesson learned', ja: '教訓', pron: 'レッスン ラーンド', example: 'Lesson learned. I will never make that mistake again.', note: '失敗から得た教訓。hard way=痛い目にあって学ぶ。the hard way が旅では一番多い。' },
        ],
    },
    176: {
        title: 'おすすめスポット', titleEn: 'Recommending Places', category: 'social',
        scene: 'それぞれが行って良かった場所を熱く語り合っている',
        keywords: [
            { en: 'hidden gem', ja: '穴場', pron: 'ヒドゥン ジェム', example: 'I found a hidden gem that is not in any guidebook.', note: 'gem=宝石。隠れた名所や名店を指す。best-kept secret も類似表現。' },
            { en: 'overrated', ja: '過大評価されている', pron: 'オーバーレイティド', example: 'That famous restaurant is overrated in my opinion.', note: '反対は underrated(過小評価)。期待ほどではなかったときに使う。' },
            { en: 'off the beaten path', ja: '人が行かない場所', pron: 'オフ ザ ビートゥン パス', example: 'I prefer places off the beaten path.', note: 'beaten path=踏み固められた道。そこから外れた場所=穴場。旅好きの決まり文句。' },
            { en: 'must-visit', ja: '絶対行くべき場所', pron: 'マスト ビジット', example: 'The morning market is a must-visit.', note: 'must-see=絶対見るべき。must-try=絶対試すべき。must-ハイフン名詞のパターン。' },
            { en: 'packed', ja: '混んでいる', pron: 'パクト', example: 'The beach was absolutely packed on Saturday.', note: 'crowded より口語的。packed out も同じ意味。the place was packed=店が激混みだった。' },
        ],
    },
    177: {
        title: '次の旅行の計画', titleEn: 'Planning the Next Trip', category: 'travel',
        scene: '居酒屋で次の旅行先を真剣に話し合っている',
        keywords: [
            { en: 'itinerary', ja: '旅程', pron: 'アイティナラリー', example: 'I made a detailed itinerary for the whole trip.', note: '日程表のこと。flight itinerary=航空券の旅程表。tight itinerary=詰め込みスケジュール。' },
            { en: 'budget', ja: '予算', pron: 'バジェット', example: 'We need to stick to a budget on this trip.', note: 'on a budget=予算内で。budget travel=格安旅行。budget-friendly=お財布に優しい。' },
            { en: 'visa', ja: 'ビザ', pron: 'ヴィーザ', example: 'Do we need a visa for that country?', note: '英語では「ヴィーザ」。visa-free=ビザ免除。apply for a visa=ビザを申請する。' },
            { en: 'travel insurance', ja: '旅行保険', pron: 'トラベル インシュランス', example: 'Always get travel insurance before you go.', note: 'coverage=補償範囲。file a claim=保険請求する。peace of mind=安心。' },
            { en: 'anticipation', ja: 'ワクワク・期待', pron: 'アンティシペイション', example: 'The anticipation before a trip is half the fun.', note: 'anticipate=期待する。excited より知的な響き。旅行前のワクワク感を表す上品な単語。' },
        ],
    },
    178: {
        title: '帰国', titleEn: 'Coming Home', category: 'feeling',
        scene: '旅から帰ってきて日本の良さを再認識している',
        keywords: [
            { en: 'jet lag', ja: '時差ボケ', pron: 'ジェット ラグ', example: 'I have terrible jet lag and I cannot sleep.', note: 'lag=遅れ。jet lagged(形容詞)=時差ボケの。recover from jet lag=時差ボケから回復する。' },
            { en: 'unpack', ja: '荷ほどきする', pron: 'アンパック', example: 'I still have not unpacked my suitcase.', note: 'pack=荷造り。unpack=荷ほどき。live out of a suitcase=スーツケース生活をする。' },
            { en: 'catch up', ja: '溜まったことを片付ける', pron: 'キャッチ アップ', example: 'I have a lot of work to catch up on.', note: 'catch up on emails=メールの溜まりを処理する。catch up with someone=人と近況を話す。' },
            { en: 'nostalgic', ja: '懐かしい', pron: 'ノスタルジック', example: 'Looking at trip photos makes me feel nostalgic.', note: 'nostalgia(名詞)=郷愁。feel nostalgic=懐かしく感じる。日本語の「懐かしい」より少し切ない響き。' },
            { en: 'appreciate', ja: 'ありがたみがわかる', pron: 'アプリーシエイト', example: 'I really appreciate Japanese convenience now.', note: '旅行後に自国の良さを再認識するときの定番。I appreciate it=ありがたい。grateful も近い意味。' },
        ],
    },
    179: {
        title: '旅の振り返り', titleEn: 'Trip Reflection', category: 'social',
        scene: '居酒屋で旅全体を振り返り、成長を実感している',
        keywords: [
            { en: 'highlight', ja: 'ハイライト', pron: 'ハイライト', example: 'What was the highlight of your trip?', note: 'trip highlight=旅のベストモーメント。the highlight of my week=今週一番の出来事。' },
            { en: 'comfort zone', ja: '安全圏', pron: 'コンフォート ゾーン', example: 'I stepped outside my comfort zone on this trip.', note: 'step outside は「外に出る」。居心地の良い範囲から出ることで成長する。成長の定番表現。' },
            { en: 'growth', ja: '成長', pron: 'グロウス', example: 'I have seen so much personal growth this month.', note: 'personal growth=自己成長。growth mindset=成長マインドセット。grow as a person=人として成長する。' },
            { en: 'spontaneous', ja: '自然発生的な', pron: 'スポンテイニアス', example: 'The best moments on the trip were spontaneous.', note: '計画しない自然な行動。spur of the moment=その場の思いつき。be spontaneous=型にはまらない。' },
            { en: 'foundation', ja: '基盤・土台', pron: 'ファウンデイション', example: 'These six months gave us a strong foundation.', note: 'lay the foundation=土台を築く。solid foundation=しっかりした基盤。build on a foundation=基盤の上に積み上げる。' },
        ],
    },
    180: {
        title: '旅月卒業', titleEn: 'Month 6 Graduation', category: 'social',
        scene: '旅の月の最終日、全員が旅を通じて成長した実感を分かち合う',
        keywords: [
            { en: 'milestone', ja: '節目', pron: 'マイルストーン', example: 'Six months is a major milestone.', note: '元々は道路のマイル標識。reach a milestone=節目に達する。人生や学習の重要な区切り。' },
            { en: 'toast', ja: '乾杯', pron: 'トースト', example: 'Let us make a toast to our journey.', note: 'make a toast=乾杯の音頭を取る。raise your glass=グラスを上げる。here is to=〜に乾杯。' },
            { en: 'journey', ja: '旅・旅路', pron: 'ジャーニー', example: 'The journey is just beginning.', note: 'trip より深い意味。人生の旅路にも使う。life journey=人生の旅。learning journey=学びの道。' },
            { en: 'investment', ja: '投資', pron: 'インベストメント', example: 'Learning English is the best investment I have ever made.', note: 'invest in yourself=自己投資する。time investment=時間の投資。return on investment=投資対効果。' },
            { en: 'cheers', ja: '乾杯', pron: 'チアーズ', example: 'Cheers to six amazing months together.', note: 'イギリスでは「ありがとう」や「さようなら」の意味にも。乾杯のときのカジュアル版。Cheers, mate。' },
        ],
    },
};
