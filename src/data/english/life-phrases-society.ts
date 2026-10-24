import type { LifePhrase } from './life-phrases';

export const societyPhrases: LifePhrase[] = [
  {
    id: 'life-society-001',
    japanese: 'またニュースが暗い話ばっかり',
    english: [
      "all bad news",
      "the news is nothing but depressing stuff again",
      "every time I turn on the news it's just one depressing thing after another",
      "I made the mistake of checking the news this morning. earthquake, scandal, economy tanking, another politician lying. it's like a highlight reel of everything wrong with the world. I used to watch the news to stay informed. now I watch it to confirm that yes, everything is still terrible. at least the weather segment was nice. partly cloudy. finally some neutral content."
    ],
    context: "nothing butは「〜しかない」の超便利フレーズ。日本語の「ばっかり」に完璧に対応する。depressingは「気が滅入る」で、sadより重くhopelessより軽い絶妙なポジション。ニュースに対してはdepressingが一番しっくりくる。",
    category: 'society',
    subcategory: 'news',
    situation: '朝スマホでニュースを見て気が滅入ったとき',
  },
  {
    id: 'life-society-002',
    japanese: '政治家って何やってんの',
    english: [
      "politicians, man",
      "what are politicians even doing at this point",
      "I genuinely don't understand what politicians do all day besides argue",
      "every time there's an election they promise the world. lower taxes, better healthcare, fix the economy. then they get elected and suddenly it's all about budget committees and photo ops. nobody fixes anything. they just argue about whose fault it is that nothing got fixed. it's like watching a group project where everybody blames everybody else and the presentation never gets done."
    ],
    context: "what are they even doingのevenが不満を強調する。「いったい何を」のニュアンス。at this pointは「もうこの期に及んで」。日本語は「何やってんの」で怒りも呆れも全部カバーするけど、英語はeven/genuinely/honestlyで温度を調整する。",
    category: 'society',
    subcategory: 'politics',
    situation: '政治のニュースに呆れたとき',
  },
  {
    id: 'life-society-003',
    japanese: '選挙行っても変わんないし',
    english: [
      "voting won't change anything",
      "what's the point of voting if nothing ever changes",
      "I go to every election but nothing ever actually changes so what's even the point",
      "I voted last time. I voted the time before that. I've been voting since I turned eighteen. and every single time I think okay maybe this time things will be different. they are never different. the faces change but the policies don't. it's like changing the wallpaper on your phone and expecting it to run faster. same system, different screensaver."
    ],
    context: "what's the pointは「何の意味があるの」の定番。if nothing ever changesのeverが「一度も」を強調。日本語の「〜ても」は英語のeven ifに近いけど、日常会話ではifだけでも十分投げやり感が出る。",
    category: 'society',
    subcategory: 'election',
    situation: '選挙の話になって冷めてるとき',
  },
  {
    id: 'life-society-004',
    japanese: '税金高すぎて手取り泣ける',
    english: [
      "taxes are brutal",
      "taxes eat so much of my paycheck it's depressing",
      "my gross pay looks great but after taxes my take-home is just sad",
      "I looked at my pay stub today. big mistake. the gross amount had me feeling good for about half a second. then I saw the deductions. income tax, residence tax, health insurance, pension. by the time they're done taking their cut I'm left with maybe sixty percent of what I actually earned. sixty percent. I work five days a week but two of those days are basically for the government."
    ],
    literal: '手取りが泣ける = "my take-home pay is cry-able"',
    context: "take-home payは「手取り」の完璧な英訳。gross vs netは給与明細の基本。brutalは「残酷」だけど日常では「きっつい」くらいの軽さで使う。日本語の「泣ける」は比喩だけど英語ではsad/depressingと感情で直球に言う。",
    category: 'society',
    subcategory: 'taxes',
    situation: '給与明細を見てがっかりしたとき',
  },
  {
    id: 'life-society-005',
    japanese: '年金もらえるか正直不安',
    english: [
      "pension worries",
      "honestly not sure I'll ever see my pension",
      "I keep paying into the pension system but I seriously doubt I'll get anything back",
      "every month they take pension money out of my paycheck. every single month. and I'm supposed to believe that forty years from now there'll still be money in the pot for me. the birth rate is dropping, the population is shrinking, and somehow the math is going to work out in my favor. sure. I'm basically throwing coins into a wishing well at this point."
    ],
    context: "pensionは「年金」。pay intoは「〜に払い込む」で積立のニュアンス。I doubt I'll get anything backの構造が日本語の「もらえるか不安」と微妙に違う。日本語は可能性に不安、英語は確信的に疑う。doubt=不安より強い。",
    category: 'society',
    subcategory: 'pension',
    situation: '将来の年金に不安を感じたとき',
  },
  {
    id: 'life-society-006',
    japanese: '少子化やばくない？',
    english: [
      "birth rate's tanking",
      "the birth rate is seriously scary at this point",
      "the declining birth rate is becoming a real crisis and nobody seems to care enough",
      "I saw a stat the other day that said the birth rate hit another record low. every year it's a new record low. at some point you'd think someone would do something about it but the solution is always 'have more kids' as if people can just decide to have kids when they can barely afford rent. maybe if housing didn't cost a kidney and daycare wasn't a second mortgage people would actually consider it."
    ],
    context: "tankingは「急降下中」でカジュアルな表現。株価にもよく使う。birth rateは「出生率」だけど会話ではthe birth rateと定冠詞付き。scary/crisis/alarming、温度感で選ぶ。日本語の「やばくない？」は英語のisn't it scary?より軽い。",
    category: 'society',
    subcategory: 'declining-birthrate',
    situation: '少子化のニュースを見て危機感を感じたとき',
  },
  {
    id: 'life-society-007',
    japanese: 'マナー悪いやつ多すぎ',
    english: [
      "people have no manners",
      "so many people just have zero manners these days",
      "it feels like basic manners are disappearing and it drives me crazy",
      "I was on the train this morning and some guy was blasting music from his phone speaker. no headphones. just full volume. and the person next to him was eating something that smelled like it came from another dimension. nobody said anything. nobody ever says anything. we all just sit there suffering in polite silence while society crumbles one rude person at a time."
    ],
    context: "have no mannersは「マナーがない」の直球表現。these daysを付けると「最近は」と嘆き感が出る。英語のmannersは可算名詞で複数形。basic mannersで「基礎的なマナー」。日本語の「マナー悪い」は形容詞的だけど英語はhave no〜と所有で表現。",
    category: 'society',
    subcategory: 'manners',
    situation: '公共の場でマナーの悪い人にイラッとしたとき',
  },
  {
    id: 'life-society-008',
    japanese: 'それって常識じゃないの',
    english: [
      "that's common sense",
      "isn't that just common sense though",
      "I thought that was common sense but apparently it's not for everyone",
      "I told my coworker that you're supposed to reply to emails within a day and he looked at me like I'd just explained quantum physics. apparently not everyone got the memo on basic professional behavior. I'm not asking for perfection here. I'm asking for the bare minimum. respond to the email. say please and thank you. don't microwave fish in the office. these are not unreasonable standards."
    ],
    context: "common senseは「常識」のド直球。isntit just〜thoughの構造で「〜じゃないの普通」感が出る。日本語の「常識」は社会規範寄りだけど英語のcommon senseは「普通の判断力」。文化によって中身が全然違うのが面白い。",
    category: 'society',
    subcategory: 'common-sense',
    situation: '当たり前のことが通じない相手にモヤッとしたとき',
  },
  {
    id: 'life-society-009',
    japanese: 'SNSで炎上してるらしい',
    english: [
      "blew up online",
      "apparently someone's getting roasted on social media",
      "I heard there's some big controversy blowing up on social media right now",
      "so apparently some celebrity said something dumb on Twitter and now the entire internet is tearing them apart. I spent twenty minutes reading the replies. twenty minutes I'll never get back. everyone's an expert. everyone has an opinion. half the people are outraged, the other half are outraged at the outrage. and I'm just sitting here eating chips watching the whole thing burn like digital entertainment."
    ],
    context: "「炎上」は英語にぴったりの一語がない。blow up/go viral(拡散)+ get roasted/dragged(叩かれる)の組み合わせ。controversyは「論争」でニュース寄り。日本語は「炎上」一語で全部済むけど英語は「拡散+批判」を分けて言う。",
    category: 'society',
    subcategory: 'sns-controversy',
    situation: 'SNSの炎上ネタを誰かに話すとき',
  },
  {
    id: 'life-society-010',
    japanese: '世代が違うと話合わないよね',
    english: [
      "generational gap",
      "it's hard to see eye to eye with a different generation",
      "when there's a generational gap it's tough to find common ground on anything",
      "I tried explaining TikTok to my dad last week. he asked me if it was like YouTube. I said kind of but shorter. he said so it's like a commercial. I said no, it's like... I gave up. and honestly he probably feels the same way when he tries to explain why he still reads a physical newspaper every morning. we're both confused by each other and that's just how generations work I guess."
    ],
    context: "generational gapで「世代間ギャップ」。see eye to eyeは「意見が合う」のイディオム。find common groundは「共通点を見つける」。日本語の「話が合わない」は英語だとcan't relate/don't connect/hard to see eye to eyeなど、「噛み合わなさ」の種類で表現が変わる。",
    category: 'society',
    subcategory: 'generation-gap',
    situation: '親や上司と話が噛み合わないとき',
  },
  {
    id: 'life-society-011',
    japanese: '格差広がってない？',
    english: [
      "gap's getting wider",
      "the wealth gap is just getting bigger and bigger",
      "doesn't it feel like the gap between rich and poor keeps getting wider every year",
      "I walked past a luxury car dealership on my way to the hundred-yen store today. that pretty much sums up the economy right now. some people are buying Porsches and I'm comparing prices on instant noodles. five packs for three hundred yen or six packs for three-fifty. this is the kind of financial analysis I'm doing while billionaires are launching rockets into space for fun."
    ],
    context: "wealth gapは「経済格差」。keep getting widerでジワジワ広がる進行感。英語はrich and poorとストレートに言う。日本語の「格差」は婉曲的だけど英語のinequalityやgapは直球。数字やデータと一緒に使われることが多い。",
    category: 'society',
    subcategory: 'inequality',
    situation: '格差を実感する場面に出くわしたとき',
  },
  {
    id: 'life-society-012',
    japanese: '物価上がりすぎじゃない？',
    english: [
      "prices are insane",
      "everything's gotten so expensive it's ridiculous",
      "prices keep going up but my salary stays exactly the same, so that's fun",
      "I went to the grocery store yesterday and eggs were fifty percent more expensive than last year. eggs. not caviar. eggs. the most basic food on the planet just decided to become a luxury item. I used to grab stuff without looking at the price. now I'm standing in the aisle doing mental math like I'm on a game show. 'is this cabbage worth it? final answer.'"
    ],
    context: "prices keep going upが「物価が上がり続ける」の自然な言い方。inflationは経済用語すぎて日常では使わない。英語は「物価」をpricesと複数形で言う。日本語みたいに「物の価格」を一語にまとめず、具体的なモノの値段の話にする傾向。",
    category: 'society',
    subcategory: 'prices',
    situation: 'スーパーで値上がりに気づいたとき',
  },
  {
    id: 'life-society-013',
    japanese: '景気悪いよね最近',
    english: [
      "economy's rough",
      "the economy's been pretty rough lately, right",
      "the economy hasn't been great lately and you can really feel it in everyday life",
      "you know things are bad when even the cheap lunch places are raising their prices. the place I used to go every day went from five hundred yen to seven-fifty. that's a fifty percent increase. in what world is that okay. my boss says the economy is recovering and I want to ask him recovering from what, to what, and when, because I'm not seeing it from down here."
    ],
    context: "roughは「厳しい」でtoughより口語的。the economy hasn't been greatは控えめな不満の言い方。英語はbad economyと形容詞を前に置くよりthe economy is badと文にする方が自然。日本語の「景気悪い」は体感だけど英語は数字で語りたがる。",
    category: 'society',
    subcategory: 'recession',
    situation: '景気の悪さを実感して誰かと話すとき',
  },
  {
    id: 'life-society-014',
    japanese: 'AIに仕事奪われそう',
    english: [
      "AI's coming for us",
      "AI is seriously going to take over our jobs",
      "I'm genuinely worried that AI is going to replace half the jobs out there",
      "my company just started using AI for customer support. the thing answers faster than any human ever could and it never calls in sick. I watched a demo and thought well, there goes my career plan B. first it was factory jobs, then it was cashiers, now it's office workers. pretty soon the only safe job will be AI repairman. until they build an AI that repairs AI. then we're all just spectators."
    ],
    context: "is coming for usは「俺たちのところに来てる」で脅威感を出す。take overは「奪う」より「取って代わる」。replaceが一番直球。日本語の「奪われる」は受動態だけど英語はAI will replaceとAI側を主語にする方が自然。脅威を擬人化する感覚。",
    category: 'society',
    subcategory: 'ai',
    situation: 'AIの進化に危機感を覚えたとき',
  },
  {
    id: 'life-society-015',
    japanese: 'テクノロジーについていけない',
    english: [
      "can't keep up",
      "I can't keep up with technology anymore",
      "technology moves so fast that I feel like I'm constantly falling behind",
      "my phone updated overnight and now everything is in a different place. the camera button moved. why did the camera button move. I just figured out where everything was and they rearranged the whole thing. and my nephew is over here setting up smart home devices like it's nothing while I'm struggling to connect to Bluetooth. I'm thirty-four and I already feel like a fossil."
    ],
    context: "can't keep upは「ついていけない」のド定番。fall behindは「遅れを取る」でkeep upの反対。英語はmove fastで技術の速さを表現する。日本語の「ついていけない」は自分の能力不足感があるけど、英語はtechnology moves too fastと技術側を主語にして責任を外す言い方もできる。",
    category: 'society',
    subcategory: 'technology',
    situation: '新しい技術やアプリに戸惑ったとき',
  },
  {
    id: 'life-society-016',
    japanese: '環境のこと考えると罪悪感ある',
    english: [
      "feel guilty though",
      "I feel kinda guilty about not being more eco-friendly",
      "every time I see environmental news I feel guilty about not doing enough",
      "I know I should bring my own bag. I know I should use less plastic. I know I should take shorter showers. I know all of these things. and yet I'm standing here with three plastic bags because I forgot my eco bag again. the planet is literally on fire and my contribution to saving it is occasionally remembering to turn off the lights. sorry, Earth. I'm doing my mediocre best."
    ],
    context: "feel guiltyは「罪悪感がある」の直球。eco-friendlyは「環境にやさしい」のカジュアル表現。doing enoughの「enough」がポイント。日本語は「考えると」と条件付きだけど英語はevery time I see〜と具体的なトリガーを言う。",
    category: 'society',
    subcategory: 'environment',
    situation: '環境問題のニュースを見て後ろめたくなったとき',
  },
  {
    id: 'life-society-017',
    japanese: '地震来たらどうしよう',
    english: [
      "what if there's an earthquake",
      "I always worry about what I'd do if a big earthquake hit",
      "every time I hear about an earthquake somewhere I start wondering if I'm prepared enough",
      "my emergency kit is a bottle of water from 2023 and a flashlight with dead batteries. that's my disaster preparedness plan. I keep saying I'll put together a proper kit this weekend but this weekend never comes. and my apartment is on the seventh floor so if a big one hits I'm just going to have to befriend my neighbors real fast and hope someone owns a camping stove."
    ],
    context: "what ifは「もし〜たらどうする」の万能フレーズ。preparedは「備えができている」でready for itより具体的。日本語の「どうしよう」は漠然とした不安だけど英語はwhat would I doと具体的な行動を考える形になる。",
    category: 'society',
    subcategory: 'disaster',
    situation: '地震や災害のニュースを見て不安になったとき',
  },
  {
    id: 'life-society-018',
    japanese: 'コロナ前に戻れない感じするよね',
    english: [
      "can't go back",
      "things never really went back to how they were before COVID",
      "even though COVID is technically over, it feels like things permanently changed",
      "remember when we used to just cough in public without everyone staring at you like you've committed a crime? those days are gone. remote work is normal now, masks are still around, and I still instinctively look for hand sanitizer when I walk into a store. we all pretend things went back to normal but we know they didn't. normal got a software update and we're all running the new version whether we like it or not."
    ],
    context: "permanently changedは「恒久的に変わった」。go back to normalの「normal」が何を指すか人によって違う。technically overのtechnicallyは「一応は」で微妙なニュアンス。日本語の「前に戻れない感じ」は感覚だけど英語はthings changedと事実として言い切る傾向。",
    category: 'society',
    subcategory: 'post-covid',
    situation: 'コロナ後の社会の変化について話すとき',
  },
  {
    id: 'life-society-019',
    japanese: '外国人観光客めっちゃ増えた',
    english: [
      "tourists everywhere",
      "there are so many foreign tourists these days it's wild",
      "the number of foreign tourists has exploded recently and you notice it everywhere",
      "I tried to go to my favorite ramen place last week. thirty-minute wait. all tourists. which is great for the economy I guess but also I just wanted ramen, not a cultural exchange program. the convenience stores are packed, the trains are packed, and everyone's taking photos of things I walk past every day without a second thought. I saw a guy photographing a vending machine for five minutes. five minutes. it's just a vending machine, man."
    ],
    context: "touristsは可算名詞で数の多さを強調できる。everywhereは「どこにでも」の一語で「増えた」感を出す。it's wildは「やばい」のカジュアル表現。日本語の「増えた」は変化の事実だけど英語はthere are so manyと今の状態を描写する方が会話的。",
    category: 'society',
    subcategory: 'tourism',
    situation: '観光地化した身近な場所で実感したとき',
  },
  {
    id: 'life-society-020',
    japanese: '今の若い子すごいなって思う',
    english: [
      "kids these days though",
      "honestly, young people these days are pretty impressive",
      "I look at what young people are doing nowadays and I'm genuinely impressed",
      "my friend's kid is nineteen and already running an online business. at nineteen I was trying to figure out how a washing machine works. these kids grew up with the internet so they just naturally understand things that took me years to learn. they start YouTube channels, they code apps, they do things I couldn't even imagine at their age. part of me is impressed and part of me is jealous and I'm choosing to focus on the impressed part."
    ],
    context: "kids these daysは普通ネガティブで使うけど、その後にimpressiveで裏切ると効果的。young peopleの方がニュートラル。I'm genuinely impressedのgenuinelyが「本当に」の本気感を出す。日本語の「すごいな」は素直だけど英語はimpressedと自分の感情で受ける。",
    category: 'society',
    subcategory: 'generation-gap',
    situation: '若い世代の活躍を見て感心したとき',
  },
  {
    id: 'life-society-021',
    japanese: 'ネットの情報どこまで信じていいかわかんない',
    english: [
      "can't trust anything",
      "I never know what's real online anymore",
      "there's so much information on the internet that I can't tell what's true and what's not",
      "I read an article yesterday that said coffee is bad for you. then I read another one that said it's good for you. then a third one said it depends on your genetics. so now I'm drinking coffee while feeling both healthy and doomed at the same time. the internet gives you access to all the information in the world and somehow you end up more confused than when you started."
    ],
    context: "what's realは「何が本当か」のシンプルな言い方。can't tellは「見分けがつかない」。anymoreを付けると「もはや」と諦め感が出る。日本語の「どこまで信じていいか」は程度の問題だけど英語はtrue or notと二択にしがち。グレーゾーンが苦手な言語。",
    category: 'society',
    subcategory: 'misinformation',
    situation: 'ネットで矛盾する情報を見て混乱したとき',
  },
  {
    id: 'life-society-022',
    japanese: '日本ってもう衰退してない？',
    english: [
      "Japan's declining though",
      "isn't Japan kind of in decline at this point",
      "looking at the numbers, it really feels like Japan is on a slow decline",
      "the GDP hasn't really grown in decades. salaries are flat. the population is shrinking. buildings in the countryside are abandoned. and yet somehow we still have the world's best convenience stores and the trains run on time to the second. so I guess we're declining in the most organized and convenient way possible. leave it to Japan to make decline look aesthetic."
    ],
    context: "in declineは「衰退中」のフォーマル寄り。kind ofが「なんか」のヘッジ。at this pointは「もうこの段階で」。日本語の「衰退してない？」は疑問形で投げかけるけど英語はisn't it〜?と否定疑問で同意を求める形。",
    category: 'society',
    subcategory: 'economy',
    situation: '日本の将来について悲観的になったとき',
  },
  {
    id: 'life-society-023',
    japanese: '消費税また上がるとかマジかよ',
    english: [
      "sales tax again?",
      "they're raising the sales tax again, are you kidding me",
      "I can't believe they're talking about raising the consumption tax yet again",
      "ten percent wasn't enough apparently. every time they raise the tax they say it's for social security and healthcare. okay, fine. but my paycheck didn't go up by a single yen. so now I'm paying more for everything while earning exactly the same. that's not a tax increase, that's a pay cut with extra steps. somebody do the math and tell me I'm wrong. you can't because I'm not."
    ],
    context: "are you kidding meは「マジかよ」の超定番。yet againは「またかよ」の呆れ感。consumption taxは公式用語だけど会話ではsales taxの方が自然。日本語の「また上がる」は事実報告だけど英語はI can't believeと感情を先に出す。",
    category: 'society',
    subcategory: 'taxes',
    situation: '増税のニュースに怒りを感じたとき',
  },
  {
    id: 'life-society-024',
    japanese: '老後2000万問題ってあったよね',
    english: [
      "retirement savings crisis",
      "remember that whole 'you need twenty million yen to retire' thing",
      "that report about needing twenty million yen for retirement really shook everybody up",
      "some government report said you need twenty million yen saved up to retire comfortably. twenty million. I checked my savings account and let's just say I'm not retiring comfortably. or uncomfortably. I'm just not retiring. I'll be the eighty-year-old guy still showing up to work because my retirement fund is basically a jar of coins on my bookshelf."
    ],
    context: "rememberは過去の話を持ち出すときの定番。that whole〜thingは「あの〜の件」でカジュアル。shook everybody upは「みんなを動揺させた」。英語は金額をtwenty million yenと数字で言う。日本語の「問題」は英語ではcrisis/issue/debateなど深刻度で使い分ける。",
    category: 'society',
    subcategory: 'retirement',
    situation: '老後の資金問題について話すとき',
  },
  {
    id: 'life-society-025',
    japanese: 'SNSやめたいけどやめられない',
    english: [
      "can't quit social media",
      "I wanna quit social media but I literally can't",
      "I know social media is bad for me but I can't bring myself to delete the apps",
      "I set a screen time limit on Instagram. thirty minutes a day. sounds reasonable right? I hit the limit by lunch. then I override it. every single day. the app literally asks me 'are you sure?' and I say yes, I'm sure I want to keep rotting my brain, thank you for checking. it's like a cigarette you can't put down except the cigarette also shows you what your ex had for dinner."
    ],
    context: "can't bring myself toは「どうしても〜できない」で意志の弱さを認める表現。literallyは「マジで」の強調。日本語の「やめたいけどやめられない」は願望+不可能。英語も同じ構造だけどI want to but I can'tと主語Iで自分の問題として引き受ける。",
    category: 'society',
    subcategory: 'sns',
    situation: 'SNSに時間を取られすぎて自己嫌悪のとき',
  },
  {
    id: 'life-society-026',
    japanese: '正論だけど言い方ってあるよね',
    english: [
      "right but harsh",
      "I mean they're right but there's a way to say things",
      "technically they're not wrong but the way they said it was just unnecessarily harsh",
      "my coworker told someone their presentation was bad. straight up. no softener, no sandwich feedback, just 'this is bad.' and look, it was bad. everyone knew it was bad. but you can't just say that to someone's face. there's an art to delivering truth without making someone want to crawl under their desk. being right doesn't give you permission to be brutal about it."
    ],
    context: "there's a way to say thingsは「言い方ってあるよね」の完璧な訳。technically rightは「正論ではある」。unnecessarily harshは「不必要にきつい」。英語にはsandwich feedback(褒める→指摘→褒める)という概念がある。日本語の「言い方」は英語のdeliveryに近い。",
    category: 'society',
    subcategory: 'communication',
    situation: '正論だけど配慮のない発言にモヤッとしたとき',
  },
  {
    id: 'life-society-027',
    japanese: '日本の働き方っておかしくない？',
    english: [
      "Japan's work culture though",
      "Japan's work culture is honestly kind of messed up",
      "when you really think about it, Japan's work culture has some seriously unhealthy aspects",
      "in most countries, leaving on time is normal. in Japan, leaving on time means you're not committed. my friend in Europe works from nine to five and nobody questions it. I leave at six-thirty after unpaid overtime and still feel guilty. guilty. for going home. to my own house. where I live. that's not dedication, that's Stockholm syndrome with a salary."
    ],
    literal: '働き方がおかしい = "the way of working is strange"',
    context: "work cultureは「働き方」をシステムとして捉える英語的な視点。messed upは「おかしい/壊れてる」。kind ofは断言を避けるヘッジ。日本語の「おかしくない？」は同意を求める形。英語もisn't it?で同じだけどwhen you think about itで「考えてみると」と前置きする方が自然。",
    category: 'society',
    subcategory: 'work-culture',
    situation: '日本の労働環境に疑問を感じたとき',
  },
  {
    id: 'life-society-028',
    japanese: 'フェイクニュースに騙されそうになった',
    english: [
      "almost fell for it",
      "I almost fell for a fake news article",
      "I was about to share a news article before I realized it was completely fake",
      "I saw a headline that seemed legit. had a real-looking news site, proper formatting, even quotes from 'experts.' I was halfway through typing a comment when something felt off. checked the source. completely fake. fabricated the whole thing. and I almost shared it with two hundred followers. two hundred people who would have believed me because I believed it. that's how misinformation spreads. one almost at a time."
    ],
    context: "fall forは「騙される」のカジュアル表現。almostが「危うく」。fake newsは2016年以降の定番語。日本語の「騙されそうになった」は未遂だけど英語はalmost fell forと完了形寄り。「危うくやるところだった」のalmostは英語学習者の鬼門。",
    category: 'society',
    subcategory: 'misinformation',
    situation: 'フェイクニュースに引っかかりそうになったとき',
  },
  {
    id: 'life-society-029',
    japanese: '自己責任って言うけどさ',
    english: [
      "personal responsibility, sure",
      "they always say it's your own responsibility but come on",
      "people love to say 'it's your own fault' but the system makes it really hard",
      "every time someone struggles, there's always that one person who says 'well that's your own responsibility.' sure, technically. but it's easy to say that when you had a stable upbringing and a college fund waiting for you. not everyone starts from the same line. telling someone who started twenty meters behind to just run faster isn't advice, it's just dismissive."
    ],
    literal: '自己責任 = "self-responsibility"',
    context: "personal responsibilityが「自己責任」。it's your own faultは「自業自得」寄り。come onは「おいおい」の反論。日本語の「自己責任」は社会的プレッシャーとして使われるけど英語のpersonal responsibilityはもっと個人主義的な文脈。同じ言葉でも社会の圧力の方向が違う。",
    category: 'society',
    subcategory: 'social-pressure',
    situation: '自己責任論に反論したいとき',
  },
  {
    id: 'life-society-030',
    japanese: 'ゴミの分別めんどくさすぎ',
    english: [
      "trash sorting is a pain",
      "sorting garbage is honestly such a pain in the neck",
      "I understand why we sort trash but it's so tedious I want to scream sometimes",
      "today is burnable day. tomorrow is plastic day. Thursday is cans and bottles. every other Tuesday is cardboard. the second Wednesday of the month is glass. I need a PhD in waste management just to throw things away. I put a plastic bottle in the wrong bin once and my neighbor gave me a look like I'd committed a federal crime. it's recycling, not a personality test."
    ],
    context: "sort trash/garbageが「ゴミを分別する」。pain in the neckは「面倒くさい」のイディオム。tediousは「退屈で面倒」。英語圏は分別がゆるいのでこの愚痴は日本特有。trash/garbage/rubbishは国で呼び方が違う(米trash、英rubbish)。",
    category: 'society',
    subcategory: 'manners',
    situation: 'ゴミの分別ルールに嫌気がさしたとき',
  },
  {
    id: 'life-society-031',
    japanese: '投票率低すぎて終わってる',
    english: [
      "voter turnout is pathetic",
      "the voter turnout is embarrassingly low every single time",
      "the voter turnout keeps hitting new lows and nobody seems to care",
      "voter turnout was like forty-something percent. forty-something. that means more than half the country didn't even bother showing up. they stayed home. and then those same people complain about the government online. you can't skip the vote and then be surprised when things don't go your way. that's like not studying for a test and being mad you failed. cause and effect, people."
    ],
    context: "voter turnoutは「投票率」。patheticは「情けない」で強い軽蔑。embarrassingly lowは「恥ずかしいほど低い」。日本語の「終わってる」は英語にしにくい。pathetic/hopeless/done forなどで温度を調整。didn't even botherは「わざわざ〜しなかった」で怠慢を非難。",
    category: 'society',
    subcategory: 'election',
    situation: '投票率の低さに呆れたとき',
  },
  {
    id: 'life-society-032',
    japanese: 'コンプラうるさくなったよね',
    english: [
      "compliance overload",
      "everyone's so worried about compliance these days",
      "everything is about compliance now and honestly it makes things way harder than they need to be",
      "we used to just do things. now we have to fill out a form before doing things, get approval to fill out the form, and then write a report about how the form-filling went. compliance review for a team lunch. risk assessment for a company barbecue. I understand we need rules but at some point the rules about the rules need their own rules and that's where we are right now."
    ],
    context: "complianceは「コンプライアンス」そのまま英語。these daysで「最近は」。worried aboutよりobsessed withの方が「うるさい」に近い。日本語の「うるさくなった」は音の比喩だけど英語はstricterやtighterと「きつくなった」で表現する。",
    category: 'society',
    subcategory: 'work-culture',
    situation: 'コンプライアンスの厳しさに辟易したとき',
  },
  {
    id: 'life-society-033',
    japanese: '電車でベビーカーに冷たい目向ける人いるよね',
    english: [
      "people glare at strollers",
      "some people really give dirty looks to parents with strollers on trains",
      "it's sad how some people act annoyed when they see a stroller on a crowded train",
      "I watched a woman with a stroller get on the train today. she was already apologizing before she even got through the door. apologizing for existing in public with a child. and some guy actually sighed loudly. sighed. as if this woman woke up and said you know what would be fun, let me take a baby on a packed train during rush hour. she's not doing it for fun, man. she's doing it because she has to."
    ],
    context: "give dirty looksは「冷たい目を向ける」。act annoyedは「迷惑そうにする」。strollerは米語でベビーカー(英語はpram/pushchair)。日本語の「冷たい目」は比喩だけど英語はdirty look/glare/stareと視線の種類を動詞で具体的に言う。",
    category: 'society',
    subcategory: 'manners',
    situation: '電車で子連れに冷たい人を見たとき',
  },
  {
    id: 'life-society-034',
    japanese: 'もう現金使わなくなったな',
    english: [
      "all cashless now",
      "I barely use cash anymore, everything's digital",
      "I realized I haven't used actual cash in weeks, everything is just tap and go",
      "I found a ten-thousand yen bill in my winter jacket pocket the other day. I have no idea how long it's been there. could be months. could be a year. I pay for everything with my phone now. coffee, lunch, train, groceries. all one tap. I'm starting to forget what coins feel like. the other day a vending machine only took cash and I stood there like a time traveler who forgot how the old world worked."
    ],
    context: "cashlessは「キャッシュレス」そのまま。barelyは「ほとんど〜ない」。tap and goは電子決済のカジュアルな言い方。日本語の「使わなくなった」は変化だけど英語はdon't use〜anymoreと「もう使わない」と状態で言う。変化より現在を描写する。",
    category: 'society',
    subcategory: 'technology',
    situation: '現金を使わない生活に気づいたとき',
  },
  {
    id: 'life-society-035',
    japanese: '空気読む文化しんどい',
    english: [
      "reading the room is exhausting",
      "this whole 'read the room' culture is honestly exhausting",
      "always having to read the room and guess what people really mean is mentally draining",
      "nobody says what they actually think. you have to decode everything. 'it's fine' means it's not fine. 'that's interesting' means I hate it. 'let me think about it' means no. I spend half my mental energy translating what people say into what they actually mean. it's like being a simultaneous interpreter except both languages are Japanese and one of them is lying."
    ],
    literal: '空気を読む = "read the air"',
    context: "read the roomは英語にもある概念だけど日本語の「空気読む」ほど社会的圧力がない。exhausting/drainingは「消耗する」。日本語は「しんどい」で身体感覚だけど英語はmentally/emotionallyと「何がしんどいか」を指定する傾向。",
    category: 'society',
    subcategory: 'communication',
    situation: '暗黙の了解に疲れたとき',
  },
  {
    id: 'life-society-036',
    japanese: 'マイナンバーカード結局めんどくさい',
    english: [
      "what a hassle",
      "the My Number card system is such a hassle honestly",
      "they keep pushing this digital ID card but the whole process is such a headache",
      "they said the My Number card would make everything easier. so I applied. waited three months. went to city hall. waited two hours. filled out forms. got the card. tried to use it online. needed a card reader. bought a card reader. it didn't work with my phone. reset the PIN. forgot the PIN. now I have a very expensive piece of plastic sitting in my wallet doing absolutely nothing."
    ],
    context: "hassleは「面倒くさい手続き」で日本語の「めんどくさい」にぴったり。headacheは「頭痛の種」。push〜は「推し進める」。英語はthe whole processと「プロセス全体」を一つの塊として批判する。日本語は「結局」で結論を先に出すけど英語はthey said〜butの期待→裏切り構造が好き。",
    category: 'society',
    subcategory: 'bureaucracy',
    situation: '行政手続きの面倒さに嫌気がさしたとき',
  },
  {
    id: 'life-society-037',
    japanese: '地方と都会の差がひどい',
    english: [
      "urban-rural divide",
      "the gap between cities and rural areas is getting ridiculous",
      "the difference between living in Tokyo and living in the countryside is night and day",
      "my parents live in a small town where the nearest convenience store is a twenty-minute drive. twenty minutes to buy milk. in Tokyo you can't walk two blocks without passing three convenience stores and a Starbucks. the town has one bus an hour. Tokyo has a train every ninety seconds. same country, completely different realities. it doesn't even feel like we're talking about the same place."
    ],
    context: "urban-rural divideは「都市と地方の格差」。night and dayは「雲泥の差」のイディオム。ridiculousは「ばかげている」でひどさを強調。日本語の「差がひどい」は評価だけど英語はnight and dayのように比喩で「差」を可視化する表現が好まれる。",
    category: 'society',
    subcategory: 'inequality',
    situation: '地方の衰退を実感したとき',
  },
  {
    id: 'life-society-038',
    japanese: '監視社会っぽくなってない？',
    english: [
      "surveillance vibes",
      "doesn't it feel like we're heading toward a surveillance society",
      "between all the cameras and data tracking, it's starting to feel like a surveillance state",
      "there are security cameras on every corner. my phone tracks where I go. my browser knows what I search. my smart speaker is definitely listening. I got an ad for running shoes an hour after I mentioned going jogging to a friend. an hour. nobody can convince me that was a coincidence. we traded privacy for convenience and I don't remember signing that contract."
    ],
    context: "surveillance societyは「監視社会」。heading towardは「〜に向かっている」で進行中のニュアンス。日本語の「っぽくない？」は英語のdoesn't it feel likeに近い。「感じがする」と断言を避ける。between A and Bは「AとBの合わせ技で」という構造。",
    category: 'society',
    subcategory: 'privacy',
    situation: 'プライバシーの侵食に不気味さを感じたとき',
  },
  {
    id: 'life-society-039',
    japanese: '正社員と非正規の差おかしいでしょ',
    english: [
      "that's not fair",
      "the gap between full-time and contract workers is just not fair",
      "it's messed up that contract workers do the same job but get treated so differently",
      "I sit next to a contract worker. same desk. same hours. same job. same spreadsheet. different salary. different benefits. no bonus. no job security. we're literally doing identical work but the system treats us like we're in different leagues. someone decided years ago that a label on your contract determines your worth and everyone just went along with it. how is that still a thing."
    ],
    context: "full-time vs contractが「正社員vs非正規」。it's messed upは「おかしい」の口語。treated differentlyは「扱いが違う」。英語はsame〜same〜differentの対比構造でギャップを際立たせる。日本語の「おかしいでしょ」は英語のhow is that a thingに近い。",
    category: 'society',
    subcategory: 'inequality',
    situation: '雇用格差に理不尽さを感じたとき',
  },
  {
    id: 'life-society-040',
    japanese: '結局みんなスマホ見てるよね',
    english: [
      "everyone's on their phones",
      "at the end of the day everyone's just staring at their phone",
      "look around any public place and literally everyone is glued to their phone",
      "I was at a restaurant the other day and looked around. every single table had at least one person staring at their phone. couples on dates, families with kids, groups of friends. all scrolling. we're physically together but mentally somewhere else. I caught myself doing it too. I was checking my phone while my friend was talking and I thought when did this become normal. and then I kept scrolling anyway."
    ],
    context: "glued to their phoneは「スマホに釘付け」のネイティブ表現。at the end of the dayは「結局のところ」。日本語の「結局」は英語でat the end of the day/ultimately/in the endと複数ある。scrollingは「スクロールする」がそのまま動名詞で使える。",
    category: 'society',
    subcategory: 'sns',
    situation: '周りの人がみんなスマホを見ている光景を目にしたとき',
  },
  {
    id: 'life-society-041',
    japanese: 'ハラスメント多すぎて逆に何も言えない',
    english: [
      "afraid to say anything",
      "there are so many types of harassment now I'm scared to speak",
      "harassment awareness is good but now everyone's so paranoid that nobody says anything",
      "we have power harassment, sexual harassment, moral harassment, maternity harassment, alcohol harassment. there's probably a harassment for breathing too loudly. and look, I'm glad people are protected. that's important. but now I'm afraid to compliment someone's haircut because what if that's hair harassment. I'm joking, but only barely. the line between being polite and being sued has never been thinner."
    ],
    context: "so many types of harassmentは直球。paranoidは「被害妄想的に警戒している」。scared to speakは「怖くて話せない」。英語圏もPC(political correctness)で同じ現象がある。日本語の「逆に」は英語のironicallyやparadoxicallyに近い。",
    category: 'society',
    subcategory: 'work-culture',
    situation: 'ハラスメントを気にしすぎて窮屈に感じたとき',
  },
  {
    id: 'life-society-042',
    japanese: 'NHKの受信料払いたくない',
    english: [
      "don't wanna pay that",
      "I really don't wanna pay the NHK subscription fee",
      "I don't even watch NHK so paying the subscription fee feels like throwing money away",
      "a guy from NHK came to my door last week. I pretended I wasn't home. he came back the next day. I pretended again. it's like a horror movie where the villain keeps coming back. I don't watch NHK. I don't own a TV. I watch everything on my laptop. but apparently if your device can receive a broadcast signal, you owe them money. by that logic my microwave should be paying too."
    ],
    context: "subscription feeは「受信料」。don't even watchのevenが「見てすらいない」を強調。throwing money awayは「金をドブに捨てる」。日本語の「払いたくない」は意思だけど英語はwhy should I payと理由を求める形にすると説得力が出る。",
    category: 'society',
    subcategory: 'media',
    situation: 'NHKの集金人が来たとき',
  },
  {
    id: 'life-society-043',
    japanese: '年取ると時間が早く感じるの不思議',
    english: [
      "time flies though",
      "isn't it weird how time goes faster the older you get",
      "it's strange how a year feels shorter and shorter the older I get",
      "when I was a kid, summer vacation felt like an eternity. three months of infinite freedom. now three months goes by and I'm like wait, what happened. it's already April. I swear January was last week. the years are speeding up and nobody warned me about this. at this rate I'll be fifty by next Tuesday. I want a refund on the time I spent not appreciating how slow time used to be."
    ],
    context: "time fliesは「時が経つのが早い」の定番。the older you getのthe+比較級構造が「〜するほど」。feels shorter and shorterの繰り返しで加速感を出す。日本語の「不思議」は英語ではstrange/weird/funnyの三択。weirdが一番カジュアル。",
    category: 'society',
    subcategory: 'aging',
    situation: '歳を取って時間の速さに驚いたとき',
  },
  {
    id: 'life-society-044',
    japanese: 'ちゃんとした大人なんていない説',
    english: [
      "nobody's got it together",
      "honestly I don't think any adult actually has it all figured out",
      "the older I get the more I realize nobody really knows what they're doing",
      "when I was a kid I thought adults had everything figured out. they had jobs and houses and answers to every question. then I became an adult and realized we're all just winging it. every single one of us. your boss is winging it. your doctor is probably winging it. the prime minister is definitely winging it. we're all just children in bigger bodies pretending we know the plan."
    ],
    literal: 'ちゃんとした大人 = "a proper adult"',
    context: "have it figured outは「ちゃんとわかっている」。winging itは「アドリブでやっている」で超便利な口語表現。日本語の「ちゃんとした」は英語のproper/real/put-togetherに相当するけど、英語はhave it togetherが一番ニュアンスが近い。",
    category: 'society',
    subcategory: 'life-philosophy',
    situation: '大人になってもわからないことだらけだと気づいたとき',
  },
  {
    id: 'life-society-045',
    japanese: '年功序列ってまだあるの',
    english: [
      "seniority system still?",
      "is the seniority system seriously still a thing in this day and age",
      "I can't believe some companies still promote people based on how long they've been there",
      "there's a guy on my team who's been here for fifteen years. he gets paid more than me. he also takes two-hour lunches and leaves all the hard work to junior staff. but he's senior so apparently that's fine. meanwhile I've been here for three years doing twice the output but I'm 'still young' so I should 'be patient.' patient until when. until I'm also taking two-hour lunches and doing nothing."
    ],
    literal: '年功序列 = "years-of-service order"',
    context: "seniority systemは「年功序列」。still a thingは「まだ存在するの」の口語。in this day and ageは「この時代に」と時代遅れ感を強調。日本語の「まだあるの」は疑問だけど英語はI can't believeと驚きを全面に出す方が自然。",
    category: 'society',
    subcategory: 'work-culture',
    situation: '年功序列の弊害を実感したとき',
  },
  {
    id: 'life-society-046',
    japanese: '満員電車って人権侵害じゃない？',
    english: [
      "packed trains are inhumane",
      "honestly packed trains should be considered a human rights violation",
      "being squeezed into a packed train every morning is basically a human rights issue",
      "this morning I was pressed so tightly against a stranger that I could feel his heartbeat. his heartbeat. I know more about this man's cardiovascular health than his doctor does. we were breathing the same air, sharing the same body heat, our backpacks fused into one entity. and this happens every single day. in what other context would this be acceptable. nowhere. the answer is nowhere."
    ],
    context: "packed trainは「満員電車」。inhumaneは「非人道的」で大げさに言うのが英語のユーモア。human rights violationは「人権侵害」で皮肉的に使う。日本語の「人権侵害じゃない？」は半分冗談だけど英語でもshould be consideredで一段クッションを置いて冗談感を保つ。",
    category: 'society',
    subcategory: 'commute',
    situation: '満員電車に押し込まれて限界のとき',
  },
  {
    id: 'life-society-047',
    japanese: 'ChatGPTに聞いた方が早い',
    english: [
      "just ask ChatGPT",
      "it's faster to just ask ChatGPT at this point",
      "why spend thirty minutes searching when ChatGPT gives you the answer in five seconds",
      "I used to Google everything. now I just ask ChatGPT. it's like having a friend who knows everything and never gets tired of your questions. need a recipe? ChatGPT. need to fix a bug? ChatGPT. need life advice at 3 AM? ChatGPT. the only thing it can't do is judge me for asking dumb questions. actually it probably does judge me. it's just too polite to say it."
    ],
    context: "it's faster to justは「〜した方が早い」の直訳が通用するレアケース。at this pointは「もうこの段階では」。why spend〜when〜?は「〜するのに〜な理由は?」の反語的構文。日本語の「聞いた方が早い」は比較だけど英語は同じ比較構造がそのまま使える。",
    category: 'society',
    subcategory: 'ai',
    situation: '何か調べものをしていて検索に疲れたとき',
  },
  {
    id: 'life-society-048',
    japanese: 'バズりたいとか思ったことないわ',
    english: [
      "don't need to go viral",
      "I've never once wanted to go viral honestly",
      "I don't get why everyone wants to go viral, I just want to live my life quietly",
      "my coworker spent thirty minutes staging a photo of her lunch for Instagram. thirty minutes. the food was cold by the time she was done. she got two hundred likes. two hundred people saw a cold salad. meanwhile I ate my lunch in peace in ten minutes and enjoyed every warm bite. going viral is just millions of strangers judging you simultaneously. how is that a goal. I'll take my zero followers and hot food, thanks."
    ],
    context: "go viralは「バズる」の英語版。I've never once wantedのonceが「一度も」を強調。I don't get whyは「なんでか理解できない」。日本語の「〜したことない」は経験の否定、英語はI've neverで同じだけどhonestly/seriouslyを添えて本気度を出す。",
    category: 'society',
    subcategory: 'sns',
    situation: 'SNSでバズを狙う人を見て冷めた気持ちのとき',
  },
  {
    id: 'life-society-049',
    japanese: '自然災害多すぎてもう慣れてきた',
    english: [
      "getting used to disasters",
      "we're having so many natural disasters I'm almost numb to it",
      "there are so many natural disasters lately that I'm ashamed to admit I'm getting used to them",
      "earthquake in March. flooding in July. typhoon in September. another earthquake in November. rinse and repeat. every year. I used to panic. now I just check my phone and think oh, a magnitude five, that's not too bad. when did I become the kind of person who rates earthquakes casually. this isn't normal but it's become my normal and that's actually kind of terrifying if I think about it."
    ],
    context: "getting numb to itは「感覚が麻痺してきた」。ashamed to admitは「恥ずかしいけど認めると」。rinse and repeatは「繰り返し」のカジュアル表現。日本語の「慣れてきた」は中立だけど英語はnumb(麻痺)やdesensitized(鈍感化)とネガティブに捉える傾向。",
    category: 'society',
    subcategory: 'disaster',
    situation: '災害ニュースに対する自分の反応の薄さに気づいたとき',
  },
  {
    id: 'life-society-050',
    japanese: '結局この国好きなんだよな',
    english: [
      "still love this place",
      "for all its problems I still love this country honestly",
      "I complain a lot but at the end of the day I wouldn't want to live anywhere else",
      "the trains are always on time. the food is incredible. the streets are clean. customer service is almost too good. I can walk home at 2 AM and feel completely safe. yes the work culture is rough. yes the bureaucracy makes me want to pull my hair out. yes the summer humidity is a war crime. but every time I come back from a trip abroad I walk out of the airport and think yeah, this is home. problems and all."
    ],
    context: "for all its problemsは「問題はあるけれど」の譲歩表現。wouldn't want to live anywhere elseが「他のどこにも住みたくない」の最上級の褒め言葉。日本語の「結局」は英語のat the end of the dayに完璧に対応。problems and allの「all込みで」が日本語の「だよな」の含みに近い。",
    category: 'society',
    subcategory: 'patriotism',
    situation: '日本のいいところを再確認したとき',
  },
];
