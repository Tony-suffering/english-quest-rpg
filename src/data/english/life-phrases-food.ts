import type { LifePhrase } from './life-phrases';

export const foodPhrases: LifePhrase[] = [
  {
    id: 'life-food-001',
    japanese: 'コンビニでいいや',
    english: [
      "convenience store's fine",
      "let's just hit up the convenience store",
      "I don't feel like cooking, convenience store it is",
      "convenience store. that's my answer to everything. what's for dinner? convenience store. what do you want for lunch? convenience store. where do you see yourself in five years? ...convenience store. I've accepted this about myself. the guy at the register knows my name. we have a bond. he judges me silently and I respect that."
    ],
    context: "「でいいや」の「で」が曲者。「が」じゃなくて「で」。本命じゃない妥協を1文字で表現してる。英語にはこの「妥協の助詞」がない。だからfineやit isで「もうそれでいいわ」の態度を足す。",
    category: 'food',
    subcategory: 'convenience-store',
    situation: '夕飯を考えるのが面倒なとき',
  },
  {
    id: 'life-food-002',
    japanese: 'あー、うまっ',
    english: [
      "oh, that's good",
      "oh man, that hits different",
      "that is so good, I can't even deal right now",
      "oh my god. this is incredible. I just took one bite and my entire life has been recontextualized. every meal I've eaten before this was a lie. I want to call my mom and tell her about this. I want to write a letter to the chef. I want to cry. I'm not even being dramatic. okay I'm being a little dramatic. but still."
    ],
    context: "「うまっ」の「っ」が重要。言い切らずに切る。感動で言葉が止まった瞬間。英語のhits differentも同じ匂い。何がどうdifferentかは言わない。説明を放棄するほどうまい、という構造。",
    category: 'food',
    subcategory: 'reaction',
    situation: '一口食べて感動したとき',
  },
  {
    id: 'life-food-003',
    japanese: 'ラーメン食いてぇ',
    english: [
      "craving ramen",
      "I could really go for some ramen right now",
      "I've been craving ramen all day, I need to make this happen",
      "I've been thinking about ramen for three hours now. not metaphorical ramen. actual ramen. tonkotsu. the kind where the broth is so thick it's basically a meal in liquid form. I can feel it calling to me. this is not a want. this is a biological need. my body is telling me something and I refuse to ignore it."
    ],
    context: "「食いてぇ」は欲求むき出しの男言葉。英語のcravingも「理性を超えた欲求」。could go forはもう少し軽い。日本語の「食いたい」と「食いてぇ」の温度差を、英語ではcraving vs want vs could go forで使い分ける。",
    category: 'food',
    subcategory: 'ramen',
    situation: '無性にラーメンが食べたくなったとき',
  },
  {
    id: 'life-food-004',
    japanese: 'とりあえず生で',
    english: [
      "draft beer first",
      "I'll start with a draft beer",
      "let me get a draft beer to start, we'll figure out the rest later",
      "draft beer. the universal opening move. nobody has ever sat down at an izakaya and gone hmm let me really think about what I want. no. you sit down and you say draft beer like it's a reflex. it's not even a choice at this point. it's muscle memory. my mouth just does it. the waiter doesn't even need to ask anymore."
    ],
    context: "「とりあえず」は日本語最強の便利ワード。to start / for nowが近いけど、「深く考えてないけどまずこれ」というニュアンスはfor nowだけでは足りない。we'll figure out the restで「考えるのは後」を補完する。",
    category: 'food',
    subcategory: 'izakaya',
    situation: '居酒屋で最初の注文をするとき',
  },
  {
    id: 'life-food-005',
    japanese: '飲みすぎた',
    english: [
      "drank too much",
      "I definitely overdid it last night",
      "I went way too hard last night, I'm paying for it now",
      "I am a broken person today. I remember saying one more and then I said one more about seven more times. past me is a terrible decision maker. past me looked at that eighth glass and thought yeah this is a great idea. present me is lying on the floor questioning everything. I have learned nothing and I will do this again next friday."
    ],
    context: "「飲みすぎた」は事実報告に見えて反省ゼロの場合が多い。overdid itは「やりすぎた」の万能表現。went too hardは「攻めすぎた」のニュアンス。paying for itは「ツケが回ってきた」。反省なき後悔を英語は3段階で表現できる。",
    category: 'food',
    subcategory: 'drinking',
    situation: '二日酔いの朝',
  },
  {
    id: 'life-food-006',
    japanese: 'これ、まずくね？',
    english: [
      "this is bad",
      "is it just me or does this taste kinda off",
      "I don't want to be mean but this doesn't taste right at all",
      "okay I need someone else to try this because I don't trust my own taste buds right now. like, is this supposed to taste like this? is this a flavor I'm not sophisticated enough to appreciate? or is this just genuinely bad? because I'm getting strong cardboard vibes and I don't think that's intentional. someone please validate me."
    ],
    context: "「まずくね？」の「ね？」は同意を求める確認。自分一人で断言したくない。英語のis it just meも同じ構造。「俺だけ？」と聞くことで責任を分散させる。まずいと言い切る勇気がない時の保険。",
    category: 'food',
    subcategory: 'reaction',
    situation: '出された料理が微妙なとき',
  },
  {
    id: 'life-food-007',
    japanese: '食べすぎて動けない',
    english: [
      "can't move",
      "I ate so much I literally can't move",
      "I'm in a food coma right now, don't talk to me",
      "I have made a series of choices that I cannot undo. my stomach is a crime scene. I can see my belt screaming for help. I knew I should have stopped at the second plate but there was a third plate and it was right there and it looked at me and I looked at it and we both knew what was going to happen. I am a cautionary tale."
    ],
    context: "「動けない」は物理的に不可能じゃなくて「動く気力がない」。英語のliterallyは本来「文字通り」だけど、今は強調で使う。food comaは英語圏の定番表現。日本語の「食い倒れ」に近い感覚で日常的に使う。",
    category: 'food',
    subcategory: 'overeating',
    situation: '食後にソファで動けなくなったとき',
  },
  {
    id: 'life-food-008',
    japanese: 'ダイエット明日から',
    english: [
      "diet starts tomorrow",
      "I'll start my diet tomorrow, for real this time",
      "okay starting tomorrow I'm actually going to eat healthy, I swear",
      "diet starts tomorrow. I've said this exact sentence three hundred and sixty-four times this year. tomorrow is the most productive day in the history of my life because that's where all my plans live. tomorrow me is a health god. tomorrow me eats salad for lunch. today me is eating this entire pizza and feeling great about it because tomorrow exists."
    ],
    context: "日本語の「明日から」は永遠に来ない明日。英語のstarting tomorrowも同じ詐欺。for real this timeを足すと「今回はマジ」と言いつつ嘘の自覚がある。この自己欺瞞は日英共通。言語の壁を超える人間の弱さ。",
    category: 'food',
    subcategory: 'diet',
    situation: '食べた後に罪悪感を感じつつも本気じゃないとき',
  },
  {
    id: 'life-food-009',
    japanese: '今日は自炊するか',
    english: [
      "cooking tonight",
      "I guess I'll cook something tonight",
      "alright, let me actually cook something for once",
      "today I'm going to cook. I'm going to be a functioning adult who uses a kitchen for its intended purpose. I have ingredients. I have a pan. I have YouTube. what could go wrong. everything. everything could go wrong. but I'm choosing optimism today. I'm going to chop vegetables and pretend I know what I'm doing. this is growth."
    ],
    context: "「するか」の「か」は自分への問いかけ兼決意。半分面倒、半分やる気。英語のI guessが「まあやるか」の温度。for onceは「たまには」で自炊してない自分へのツッコミ。let meは「よしやるぞ」の起動音。",
    category: 'food',
    subcategory: 'cooking',
    situation: '珍しく自炊する気になったとき',
  },
  {
    id: 'life-food-010',
    japanese: 'カップ麺で済ませるか',
    english: [
      "cup noodles it is",
      "cup noodles and call it a night",
      "I'll just have cup noodles and be done with it",
      "cup noodles. the meal of champions who have given up on being champions. three minutes to completion. no dishes. no prep. no dignity. just me, a fork, and boiling water. Gordon Ramsay would weep. but you know what Gordon Ramsay doesn't have? three extra minutes of free time. checkmate, Gordon. I'm efficient. that's what I'm calling this."
    ],
    context: "「済ませる」は「本来ちゃんとすべきことを手抜きで終わらせる」。英語にこのニュアンスの一語がない。be done with itが「もう終わりにする」。call it a nightは「今日はこれで終了」。日本語の「済ませる」の罪悪感を英語は2語で分担する。",
    category: 'food',
    subcategory: 'instant-food',
    situation: '食事を最低限で済ませたいとき',
  },
  {
    id: 'life-food-011',
    japanese: 'この店めっちゃ並んでるな',
    english: [
      "line's insane",
      "look at that line, no way I'm waiting",
      "this place is packed, the line goes around the block",
      "are you seeing this line right now? these people have been standing here since before lunch and it's almost dinner. I respect the dedication but I don't share it. there is no food on earth worth standing in the sun for forty-five minutes. I don't care if the chef trained under a monk on a mountain. my legs have opinions and they're saying absolutely not."
    ],
    context: "「並んでる」は他動詞じゃなくて状態描写。英語のthe line goes aroundは行列を風景として描く。日本語は「並んでる」一語で人と行列を同時に表現するけど、英語はlineという物体を主語にする。視点の置き方が違う。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '人気店の行列を見たとき',
  },
  {
    id: 'life-food-012',
    japanese: '唐揚げ最強説',
    english: [
      "karaage supremacy",
      "karaage is the greatest food ever created",
      "I will die on this hill: karaage is the best food in existence",
      "I'm prepared to fight anyone on this. karaage is the pinnacle of human achievement. forget the wheel. forget electricity. someone looked at a piece of chicken and thought what if I fried this in the most perfect way possible and that person is my hero. every culture has fried chicken but Japan won. I'm not being biased. okay I'm being biased. I don't care."
    ],
    context: "「最強説」はネット発の「〇〇は最強である、という説」。英語のsupremacyが一番近い。die on this hillは「この意見を絶対に曲げない」。日本語は「説」と学術っぽくすることでギャグにしてるけど、英語は大げさに戦う姿勢でギャグにする。",
    category: 'food',
    subcategory: 'reaction',
    situation: '好きな食べ物について熱く語るとき',
  },
  {
    id: 'life-food-013',
    japanese: '冷蔵庫に何もない',
    english: [
      "fridge is empty",
      "there's literally nothing in the fridge",
      "I just opened the fridge and stared at nothing for thirty seconds",
      "I opened the fridge like something was going to magically appear since the last time I opened it four minutes ago. spoiler alert: nothing appeared. there's a bottle of soy sauce and something in the back that I'm afraid to identify. I closed the fridge. waited two minutes. opened it again. still nothing. this is the definition of insanity and I'm living it."
    ],
    context: "「何もない」は実際にはゼロじゃない。調味料や怪しいタッパーはある。英語もthere's nothingと言いつつ本当に空じゃない。stared at nothingは「虚無を見つめた」。日英どちらも「食べたいものがない」を「何もない」と誇張する構造が同じ。",
    category: 'food',
    subcategory: 'cooking',
    situation: '冷蔵庫を開けて絶望するとき',
  },
  {
    id: 'life-food-014',
    japanese: '二日酔いやばい',
    english: [
      "hangover's killing me",
      "this hangover is absolutely destroying me",
      "I'm so hungover right now I can barely function",
      "I woke up and my head was already screaming at me before I even opened my eyes. water tastes like punishment. sunlight is my enemy. I keep thinking about what I said at the bar last night and somehow that hurts worse than the headache. my body is a hostile environment. I texted my friend sorry about last night and he said for what? and now I'm more scared."
    ],
    context: "「やばい」は文脈で意味が変わる万能語だけど、二日酔いの「やばい」は100%ネガティブ。英語のkilling meは「殺される」の誇張。destroyingも同じ。日本語の「やばい」一語の便利さを、英語は動詞の暴力度で代替する。",
    category: 'food',
    subcategory: 'drinking',
    situation: '二日酔いで起きた朝',
  },
  {
    id: 'life-food-015',
    japanese: 'デリバリー頼むか',
    english: [
      "let's order delivery",
      "should we just get delivery tonight",
      "I'm thinking we should just order something and have it delivered",
      "cooking requires standing up and I've done the math and that's not happening tonight. my couch and I have a thing going and I'm not about to ruin it by walking to the kitchen. delivery exists because humans evolved to be lazy and I refuse to fight evolution. that's science. I'm just following the science. the science says order pizza."
    ],
    context: "「頼むか」の「か」はまた自問。英語のshould weは提案形。日本語は独り言でも「か」で終われるけど、英語は一人でもshould Iと自分に提案する。日本語の独り言は問い、英語の独り言は提案。同じ迷いの表現方法が違う。",
    category: 'food',
    subcategory: 'delivery',
    situation: '料理する気力がないとき',
  },
  {
    id: 'life-food-016',
    japanese: '味濃くね？',
    english: [
      "too salty",
      "this is kinda heavy on the seasoning",
      "is it just me or is this way too salty",
      "my tongue is having a crisis right now. I think whoever made this just opened the salt shaker and let gravity do its thing. I need water. I need a lot of water. my kidneys are filing a complaint. this isn't food this is a sodium delivery system. I can feel my blood pressure going up in real time. someone call a doctor. or at least bring me some rice."
    ],
    context: "「濃くね？」の「ね？」がまた同意求め。味の判断を一人で背負いたくない日本人の優しさ。英語のis it just meも同じ。kinda heavyは「ちょっと重い」で直接disってない。too saltyだと批判になるけど、heavyなら感想で逃げられる。",
    category: 'food',
    subcategory: 'reaction',
    situation: '味が濃い料理を食べたとき',
  },
  {
    id: 'life-food-017',
    japanese: '作り置きしとけばよかった',
    english: [
      "should've meal prepped",
      "I really should've done some meal prep this weekend",
      "if I had just spent an hour on Sunday prepping meals I wouldn't be in this situation",
      "past me had the entire weekend to cook a bunch of stuff and put it in containers like a responsible human being. past me chose to watch an entire season of a show instead. and now present me is standing in the kitchen at nine pm with nothing to eat. this is a pattern. I know it's a pattern. identifying the pattern has not helped me break the pattern."
    ],
    context: "「しとけば」は「しておけば」の口語短縮。後悔の定型文。英語のshould've + past participleが完全対応。meal prepは英語圏で流行った概念で、日本語の「作り置き」とほぼ同義。文化が違っても「週末に作っておけば」の後悔は同じ。",
    category: 'food',
    subcategory: 'cooking',
    situation: '平日に食事の準備がなくて後悔するとき',
  },
  {
    id: 'life-food-018',
    japanese: 'この店ハズレだったな',
    english: [
      "this place was a miss",
      "yeah this place was definitely a miss",
      "we picked the wrong restaurant tonight, this was a total letdown",
      "I had such high hopes. the reviews were good. the pictures looked amazing. and then the food arrived and it was the equivalent of a movie trailer that's better than the actual movie. the presentation said five stars but my mouth said two. maybe one and a half. I feel betrayed by the internet. this is why I have trust issues with Tabelog ratings."
    ],
    context: "「ハズレ」はくじ引きの比喩。当たりかハズレか。英語のmissも同じ射的イメージ。hit or missは「当たり外れ」。letdownは「期待を下げられた」。日本語はギャンブル用語、英語はスポーツ用語で、比喩の元ネタが違うけど意味は同じ。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '期待外れのレストランに行ったとき',
  },
  {
    id: 'life-food-019',
    japanese: 'もう一軒行く？',
    english: [
      "one more place?",
      "should we hit up one more spot",
      "what do you guys think, should we go to one more place",
      "I know it's late. I know we all said we'd go home early tonight. I know we've already been to two places. but hear me out. there's this bar around the corner. just one drink. just one. I've heard that before too and I know how it ends but hope is a beautiful thing. let's be beautiful together. one more. that's all I'm asking. one. singular. probably."
    ],
    context: "「もう一軒」の「軒」は店を数える助数詞で、日本の飲み文化特有。英語にはbar/spotで代替するけど「軒数を重ねる」概念自体が薄い。one more placeは意味は通じるけど、日本語の「一軒一軒はしごする」楽しさの文化コードは伝わりにくい。",
    category: 'food',
    subcategory: 'izakaya',
    situation: '飲み会で次の店に行こうとするとき',
  },
  {
    id: 'life-food-020',
    japanese: 'お腹すいて死にそう',
    english: [
      "starving",
      "I'm absolutely starving right now",
      "I haven't eaten all day and I'm about to pass out",
      "my stomach is making sounds that concern me. like, medically concerning sounds. noises that a stomach should not make. I skipped breakfast because I was running late and then I skipped lunch because I was in a meeting and now my body is staging a full revolution. every cell in my body is yelling feed me. I can smell food from three blocks away. I've become a wolf."
    ],
    context: "「死にそう」は日本語の王道誇張。英語のstarvingも同じ誇張。aboutを入れるとto pass outで「倒れそう」。日英どちらも空腹を命の危機で表現する。人類は腹が減ると大げさになる生き物。これは言語じゃなくて本能の問題。",
    category: 'food',
    subcategory: 'hunger',
    situation: '長時間食べてなくて限界のとき',
  },
  {
    id: 'life-food-021',
    japanese: '夜中にラーメンは背徳感がすごい',
    english: [
      "late-night ramen hits different",
      "late-night ramen is such a guilty pleasure",
      "eating ramen at midnight feels so wrong but so incredibly right",
      "it's one AM. I should be asleep. instead I'm sitting at a counter eating ramen that's so hot it's burning my mouth and I don't care. there's something about eating heavy food when you know you shouldn't that makes it taste ten times better. guilt is a seasoning. the best seasoning. my diet plan is weeping somewhere but this ramen doesn't care and neither do I."
    ],
    context: "「背徳感」は英語に直訳できない名ワード。guilty pleasureが一番近いけど、「背徳」の宗教的な重さはない。feels so wrong but so rightは矛盾を並べることで背徳感を演出。日本語は漢字一語で済むことを、英語は対比構造で表現する。",
    category: 'food',
    subcategory: 'ramen',
    situation: '深夜にラーメンを食べているとき',
  },
  {
    id: 'life-food-022',
    japanese: '割り勘でいい？',
    english: [
      "split it?",
      "should we just split the bill",
      "let's just split it evenly, that cool with everyone",
      "I hate this moment. the bill comes and suddenly everyone becomes a mathematician. he had two more drinks than me but I had the appetizer. she only had a salad. do we really want to be those people with calculators at the table? no. we split it. democracy. equality. even though I only had water for the last hour. it's fine. peace has a price."
    ],
    context: "「割り勘」は日本の外食文化の柱。split the billは意味は同じだけど、アメリカでは個別会計(separate checks)も普通。「割り勘でいい？」と聞く文化自体が日本寄り。英語圏では最初からseparateかsplitか聞かれることが多い。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '会計のときに割り勘を提案するとき',
  },
  {
    id: 'life-food-023',
    japanese: 'おかわり自由って最高じゃん',
    english: [
      "free refills though",
      "free refills are honestly the best thing ever",
      "the fact that you can get unlimited refills here is incredible",
      "whoever invented the concept of free refills deserves a Nobel Prize. in what? I don't care. make a new category. Nobel Prize in making people happy. I'm on my fourth glass of iced tea and nobody's even looking at me weird. this is freedom. this is what they wrote songs about. I'm going to keep drinking until they ask me to leave or I float away."
    ],
    context: "「自由」は「free」だけど、おかわり自由のfreeは「無料」と「自由」が合体してる。英語のfree refillsは「無料のお代わり」で、日本語の「自由」の開放感が薄い。日本語は「自由」で気分を、英語はunlimitedで量を強調する。",
    category: 'food',
    subcategory: 'eating-out',
    situation: 'おかわり自由のドリンクバーで喜ぶとき',
  },
  {
    id: 'life-food-024',
    japanese: '今日の弁当しょぼいな',
    english: [
      "sad lunch today",
      "my lunch box is looking pretty pathetic today",
      "I opened my lunch and honestly it's kind of embarrassing",
      "I opened my lunch box and it looked back at me with disappointment. there's rice. there's something that might have been a vegetable in a past life. and there's a gap where effort should have been. meanwhile the person next to me has a bento that looks like it belongs in a magazine. I'm eating shame in a box. I should've just bought something."
    ],
    context: "「しょぼい」は見た目と中身の貧相さを同時に表現する。英語のsadはモノに使うと「かわいそうに見える」。pathetic lunchは「哀れな弁当」。日本語の「しょぼい」は自虐で使えるけど、他人に言うとキツい。英語のsadも同じ使い分け。",
    category: 'food',
    subcategory: 'bento',
    situation: '自分の弁当の中身が寂しいとき',
  },
  {
    id: 'life-food-025',
    japanese: 'これ絶対太るやつ',
    english: [
      "this is fattening",
      "this is definitely going straight to my waistline",
      "I can feel myself gaining weight just looking at this thing",
      "I know what this is. this is calories disguised as happiness. this is my future self cursing my current self. I picked this up and my brain said don't and my hand said too late. there's a calorie count on the back and I'm choosing not to look at it because ignorance is bliss and bliss tastes like chocolate. knowledge is for people who don't want dessert."
    ],
    context: "「絶対太るやつ」の「やつ」はモノを人みたいに扱うカジュアル表現。英語のgoing straight toは「直行する」。waistlineで腰回りを指定。日本語は「太る」で全身、英語は具体的にwaistline/hips/thighsと部位を言いがち。抽象vs具体の差。",
    category: 'food',
    subcategory: 'diet',
    situation: '高カロリーの食べ物を前にしたとき',
  },
  {
    id: 'life-food-026',
    japanese: 'ちょっと味見して',
    english: [
      "try this",
      "here, try a bite of this",
      "taste this real quick and tell me what you think",
      "I need a second opinion because my taste buds might be lying to me. just try it. one bite. tell me if this is as good as I think it is or if I've just been hungry so long that anything tastes amazing. I need objective data. you're my control group. the scientific method demands that you eat this. please. for science. just a small bite. okay a big bite is fine too."
    ],
    context: "「味見して」は命令形だけど柔らかい依頼。英語のtry thisは同じくらいカジュアル。taste thisはもう少し具体的。日本語の「味見」は「味を見る」で視覚の比喩。英語のtasteは直接味覚。日本語は一歩引いて「見る」、英語は直接「味わう」。",
    category: 'food',
    subcategory: 'cooking',
    situation: '料理を作っていて人に確認してもらうとき',
  },
  {
    id: 'life-food-027',
    japanese: 'つまみ何頼む？',
    english: [
      "what are we snacking on",
      "what should we get for snacks to share",
      "what are we ordering for appetizers, any preferences",
      "this is the most important negotiation of the evening. the food order sets the tone for everything. if someone orders edamame I know we're going to have a calm civilized night. if someone orders the fried platter I know things are about to get wild. these appetizers are prophecy. choose wisely. also get the gyoza because that's non-negotiable."
    ],
    context: "「つまみ」は酒のお供専用の言葉。英語にはこの概念がappetizers/snacks/bar foodに分散してる。「つまみ」一語で「酒を飲みながらつまむもの」が完結するのは日本語の飲み文化の濃さ。英語はシーンごとに使い分ける必要がある。",
    category: 'food',
    subcategory: 'izakaya',
    situation: '居酒屋でみんなに注文を聞くとき',
  },
  {
    id: 'life-food-028',
    japanese: 'これ何の肉？',
    english: [
      "what meat is this",
      "wait, what kind of meat is this exactly",
      "before I take another bite, can someone tell me what I'm eating",
      "I've been eating this for five minutes and I just now realized I have no idea what it is. it could be chicken. it could be pork. it could be something I've never heard of. the texture isn't giving me any clues. I'm too deep into this meal to stop now but I'd like to at least know what I'm digesting. this is basic information. I deserve basic information."
    ],
    context: "日本語では「何の肉」と素材に注目する。英語はwhat kind of meatで種類を聞く。日本語の「何」は疑問詞一語、英語はwhat kind ofと3語必要。日本語は「何+の+名詞」で何でも聞ける超効率構文。英語はkindやtypeを挟む必要がある。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '出された料理の正体が分からないとき',
  },
  {
    id: 'life-food-029',
    japanese: '替え玉ください',
    english: [
      "extra noodles please",
      "can I get an extra serving of noodles",
      "I'd like to add another round of noodles to this, please",
      "the broth is still going strong but the noodles abandoned me. this is an unacceptable ratio. the broth-to-noodle ratio is a sacred covenant and it has been broken. I need reinforcements. more noodles. send them in. they will absorb the remaining broth and order will be restored. balance will be achieved. this is not gluttony this is mathematics."
    ],
    context: "「替え玉」は博多ラーメン文化の産物で、英語に直訳がない。extra noodlesが機能的には近いけど、「替え玉」の「今のスープにもう一玉投入する」というシステム自体を説明しないと通じない。文化ごとラーメンに込めたシステム設計が違う。",
    category: 'food',
    subcategory: 'ramen',
    situation: 'ラーメン屋で替え玉を注文するとき',
  },
  {
    id: 'life-food-030',
    japanese: 'シメのラーメン行かない？',
    english: [
      "ramen to finish",
      "let's get ramen to cap off the night",
      "we should totally end the night with a bowl of ramen",
      "we've been drinking for four hours and now it's time for the most important meal of the day. not breakfast. not lunch. the post-drinking ramen. this is tradition. this is culture. this is our bodies screaming for carbs and salt after processing an unreasonable amount of alcohol. anyone who says no is wrong. ramen is not optional at this hour. it's mandatory."
    ],
    context: "「シメ」は「締め」。飲みの最後を締めくくる炭水化物。英語にこの概念がない。cap offやfinish withで代替するけど、「シメ」の持つ儀式感は伝わらない。日本の飲み文化ではシメは予定調和。英語圏ではlate-night snackで軽く済ませがち。",
    category: 'food',
    subcategory: 'ramen',
    situation: '飲み会の後にシメのラーメンを提案するとき',
  },
  {
    id: 'life-food-031',
    japanese: '今月外食しすぎた',
    english: [
      "ate out too much",
      "I've been eating out way too much this month",
      "I just checked my spending and I blew so much on eating out this month",
      "I looked at my credit card statement and the restaurant section reads like a diary. Monday: ramen. Tuesday: curry. Wednesday: conveyor belt sushi. Thursday through Sunday: a montage of bad decisions. I spent more on food than rent. that's not an exaggeration. well it's a small exaggeration. but the point stands. my wallet is on life support."
    ],
    context: "「外食しすぎた」は頻度の反省。英語のeating outは「外で食べる」の直訳で同じ。blew so muchは「散財した」。日本語は「しすぎた」で行為の過剰を、英語はblew/spentで金額の過剰を強調する。視点が「行為」と「金」で違う。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '月末にクレカ明細を見て反省するとき',
  },
  {
    id: 'life-food-032',
    japanese: 'あと一口だけ',
    english: [
      "one more bite",
      "just one more bite and I'm done",
      "okay, just one last bite and then I'm really stopping",
      "one more bite. the most dangerous sentence in the human language. because one more bite is never one more bite. it's three more bites pretending to be one. my fork keeps moving and my mouth keeps accepting deliveries. the plate is almost empty and I'm almost full but almost isn't done and done isn't stopping. I'll stop when the plate is empty. that's biology."
    ],
    context: "「あと一口だけ」の「だけ」は自分への嘘の免罪符。英語のjust one moreのjustも同じ機能。「ちょっとだけ」「もう一個だけ」、日本語の「だけ」と英語のjustは嘘をつく時の双子。世界中の人間がこの一語で自分を騙してる。",
    category: 'food',
    subcategory: 'overeating',
    situation: 'もう十分食べたのにやめられないとき',
  },
  {
    id: 'life-food-033',
    japanese: 'この店当たりだわ',
    english: [
      "this place is a hit",
      "oh this place is actually really solid",
      "I think we found a winner, this place is seriously good",
      "you know what? I didn't expect much when we walked in. the outside looked sketchy. the menu was too simple. but then the food came and it was incredible. this is the kind of place that doesn't need to try hard because the food does all the talking. I'm adding this to my rotation. this is now a regular spot. I'm claiming this restaurant. it's mine now."
    ],
    context: "「当たり」はハズレの反対でくじ引きの比喩。英語のhitも「命中」で同じ射的イメージ。solidは「手堅い」で安定した美味さ。winnerは「勝者」で競争の比喩。日本語は運の比喩、英語は競争の比喩。いい店に出会う感覚の比喩の選び方が違う。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '期待以上に美味しい店に入れたとき',
  },
  {
    id: 'life-food-034',
    japanese: '酒のつまみにちょうどいい',
    english: [
      "perfect with drinks",
      "this is the perfect thing to snack on while drinking",
      "this goes so well with beer, it's like they were made for each other",
      "some foods exist to be eaten. some foods exist to accompany alcohol. this is the second kind. it's salty enough to make you want another sip. and then the sip makes you want another bite. it's a beautiful cycle of consumption that ends with an empty plate and an empty glass and a full sense of satisfaction. this is food engineering at its finest."
    ],
    context: "「ちょうどいい」は過不足ない完璧な適合。英語のperfect withは「相性がいい」。goes well withは「合う」。日本語の「ちょうど」は量や程度のジャストフィット、英語のperfectは質の最高到達点。「ちょうどいい」は完璧より控えめで日本的。",
    category: 'food',
    subcategory: 'izakaya',
    situation: '酒に合うおつまみを食べているとき',
  },
  {
    id: 'life-food-035',
    japanese: 'チェーン店でよくね？',
    english: [
      "chain's fine",
      "a chain restaurant is totally fine with me",
      "honestly let's just go to a chain, at least you know what you're getting",
      "I don't understand people who refuse to eat at chain restaurants. consistency is a virtue. I walk in. I know the menu. I know the taste. I know the price. there are no surprises. in a world full of chaos this Gusto is my anchor. my safe harbor. the food is exactly a six out of ten and I find that deeply comforting. not everyone needs a ten. sometimes you need a reliable six."
    ],
    context: "「でよくね？」は「でいいじゃん」の確認。「で」がまた妥協の助詞。英語のfine with meは「俺は構わない」。at least you knowは「少なくとも分かってる」。日本語の「よくね？」は同意を求めるけど、英語は理由を足して正当化する傾向がある。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '店選びで迷ったときにチェーン店を提案するとき',
  },
  {
    id: 'life-food-036',
    japanese: '胃もたれしてる',
    english: [
      "stomach feels heavy",
      "my stomach is not happy with me right now",
      "I've had this heavy feeling in my stomach all day and it won't go away",
      "my stomach is currently writing a formal complaint to my brain about the decisions that were made last night. it's a strongly worded letter. there are bullet points. my stomach wants an apology and a promise that it will never happen again. my brain is drafting a response that says we both know that's not going to happen. they've been having this argument for years."
    ],
    context: "「胃もたれ」は「胃がもたれる」で、英語に一語の対応がない。heavyが一番近いけど、「もたれる」の「何かに寄りかかってる感じ」は消える。upset stomachは痛い方。日本語は胃の「重さ」を感覚で表現、英語は形容詞で描写するしかない。",
    category: 'food',
    subcategory: 'overeating',
    situation: '食べすぎた翌日に胃が重いとき',
  },
  {
    id: 'life-food-037',
    japanese: 'これ見た目と味違くない？',
    english: [
      "looks deceiving",
      "this looks way better than it actually tastes",
      "the presentation is beautiful but the taste is not matching up at all",
      "this dish catfished me. the menu photo was gorgeous. Instagram would love it. but my mouth is confused because my eyes were promised something entirely different. it's like dating someone whose profile picture was taken in 2015. technically the same dish. practically a different experience. I've been visually manipulated by a plate of food. this is a new low."
    ],
    context: "「違くない？」は文法的には間違い（正しくは「違わない？」）だけど口語で定着。英語のlooks deceivingも「見た目が騙す」。not matching upは「一致してない」。日本語は主語なしで「違う」、英語はlooksとtasteを対比させる。省略vs明示の差。",
    category: 'food',
    subcategory: 'reaction',
    situation: 'SNS映えする料理が実は微妙だったとき',
  },
  {
    id: 'life-food-038',
    japanese: '今日はちょっと奮発するか',
    english: [
      "treating myself today",
      "let's splurge a little tonight",
      "I'm going to treat myself to something nice today, I deserve it",
      "I've been eating convenience store rice balls for a week straight and I think my body deserves better. not much better. but slightly better. today I'm spending more than eight hundred yen on a meal and I'm going to feel like royalty. this is my self-care. some people do spa days. I eat something that isn't wrapped in plastic. we all heal differently."
    ],
    context: "「奮発」は「思い切って金を使う」で、普段はケチな自分からの逸脱を含む。英語のsplurgeが完全対応。treat myselfは「自分にご褒美」。日本語の「奮発」には「ふんっ」と気合を入れる擬態語感がある。英語のsplurgeもsplash的な爆発感がある。",
    category: 'food',
    subcategory: 'eating-out',
    situation: 'たまにはいいものを食べようと思ったとき',
  },
  {
    id: 'life-food-039',
    japanese: 'レンジでチンして終わり',
    english: [
      "just microwave it",
      "microwave it and call it dinner",
      "I'm literally just going to throw this in the microwave and that's my meal",
      "the microwave is the most honest kitchen appliance. it doesn't pretend to be fancy. it doesn't have settings named after Italian cooking techniques. it has a button that says two minutes and another button that says start and that's all I need. beep beep dinner is ready. total time from hungry to eating: two minutes and thirty seconds including unwrapping. that's efficiency."
    ],
    context: "「チン」は電子レンジの音の擬態語で、日本語だけの天才表現。動詞化して「チンする」。英語にはこの擬音動詞がない。microwaveを動詞で使うのが精一杯。「チン」の一音で完結する手抜き感を、英語はthrow it inやjustで補う。",
    category: 'food',
    subcategory: 'instant-food',
    situation: '料理する気がゼロの日の夕飯',
  },
  {
    id: 'life-food-040',
    japanese: 'ビール何杯目だっけ',
    english: [
      "lost count",
      "wait, how many beers have I had",
      "I've completely lost track of how many beers I've had tonight",
      "I know I started with a draft. and then someone ordered a round. and then I think there was a toast. and then things get fuzzy. there's a number in my head and it might be five but it might also be seven and I'm not sure which answer I'd prefer. at this point counting feels like a problem for tomorrow morning me. right now me is having a great time and that's what matters."
    ],
    context: "「だっけ」は記憶の確認。「〜だったっけ」の短縮。英語にはこの一語がない。how many have I hadで聞くけど、日本語の「だっけ」は「覚えてないけど気にしてない」感がセット。lost countは「数えるのをやめた」で、もう少し意図的。",
    category: 'food',
    subcategory: 'drinking',
    situation: '飲みの途中で何杯飲んだか分からなくなったとき',
  },
  {
    id: 'life-food-041',
    japanese: '食レポ下手すぎるだろ',
    english: [
      "terrible food review",
      "your food review skills are absolutely terrible",
      "you're the worst at describing food, just say it's good or bad",
      "I asked you how the food was and you said it's like, you know, good. that's your review. that's the whole thing. a professional food critic would weep. you have the vocabulary of a golden retriever when it comes to food. everything is either good or not good. there are other words. there are many other words. delicious. savory. rich. please expand your range. I'm begging you."
    ],
    literal: '食べ物レポート下手すぎる',
    context: "「食レポ」はテレビ発の和製略語。英語にはfood reviewが近いけど、「リアクション芸としての食レポ」の概念がない。日本の食レポは味の描写+オーバーリアクションの芸。英語のfood reviewは分析寄り。エンタメ性の期待値が違う。",
    category: 'food',
    subcategory: 'reaction',
    situation: '友達の食レポが雑すぎるとき',
  },
  {
    id: 'life-food-042',
    japanese: '迎え酒しよう',
    english: [
      "hair of the dog",
      "let's have a hair of the dog and fight this hangover",
      "the only cure for this hangover is another drink, let's go",
      "I know this sounds insane. I know the logical thing is to drink water and rest. but logic abandoned me at the third bar last night so we're going with tradition instead. the tradition says you fight alcohol with alcohol. it's like fighting fire with fire except nobody calls the fire department and the fire just becomes your personality. here's to bad decisions round two."
    ],
    literal: '迎えの酒',
    context: "「迎え酒」は二日酔いを酒で迎え撃つ。英語のhair of the dogは「噛んだ犬の毛で傷を治す」という中世の迷信から。日本語は「迎える」で戦闘、英語は「犬の毛」で民間療法。どちらも科学的根拠ゼロの酒飲みの伝統。文化は違うが結論は同じ。",
    category: 'food',
    subcategory: 'drinking',
    situation: '二日酔いの状態でまた飲もうとするとき',
  },
  {
    id: 'life-food-043',
    japanese: '残り物でなんとかする',
    english: [
      "making do with leftovers",
      "I'll figure something out with what's left",
      "there's some stuff left over so I'll throw something together",
      "I'm about to open the fridge and become a contestant on a cooking show where the mystery ingredient is whatever didn't expire last week. I have half an onion. some rice from two days ago. a single egg. and something in tupperware that I'm going to pretend is still good. this isn't cooking. this is survival. I'm basically Bear Grylls but indoors and less attractive."
    ],
    context: "「なんとかする」は日本語の万能表現。具体的な方法はないけど「どうにかする」。英語のfigure something outが一番近い。throw something togetherは「適当にまとめる」。make doは「あるもので済ます」。日本語1語の曖昧さを英語は3パターンで分業する。",
    category: 'food',
    subcategory: 'cooking',
    situation: '買い物に行かずに冷蔵庫の残り物で済ませるとき',
  },
  {
    id: 'life-food-044',
    japanese: 'ここの定食コスパ良すぎ',
    english: [
      "insane value",
      "this set meal is such a crazy good deal",
      "for the price you're paying, this set meal is absolutely unbeatable",
      "eight hundred yen. eight hundred yen for rice, miso soup, a main dish, pickles, and a small salad. in what economy does this make sense? how is this restaurant making money? I'm worried about them. I'm eating here out of concern. every time I come here I feel like I'm getting away with something. this isn't a meal this is theft and I'm the beneficiary."
    ],
    literal: 'コストパフォーマンス良すぎ',
    context: "「コスパ」は和製英語の極み。cost performanceは英語では使わない。英語はvalue for money、bang for your buckと言う。great dealが一番カジュアル。日本語は「コスパ」一語で「払った金に対する満足度」を表現できるけど英語は文で説明する。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '安くて量が多い定食屋で感動するとき',
  },
  {
    id: 'life-food-045',
    japanese: '酔っ払ってなかったらこれ頼んでない',
    english: [
      "drunk order",
      "I would never order this sober and we both know it",
      "if I were sober right now there's no way I'd be eating this",
      "alcohol turns me into a different person when it comes to food choices. sober me eats salad and drinks green tea. drunk me orders an entire pizza and two sides and a dessert and then asks if they have more. drunk me has no budget. drunk me has no shame. drunk me is living his best life at the expense of tomorrow me's wallet and stomach. I love and hate drunk me equally."
    ],
    context: "「〜なかったら〜ない」は仮定法。英語のif I were soberも仮定法。日本語は「酔ってなかったら」で酔いが条件、英語はsober(素面)が条件。同じことを日本語は否定の否定で、英語は肯定の仮定で表現。裏と表から同じ意味に到達する。",
    category: 'food',
    subcategory: 'drinking',
    situation: '酔った勢いで余計なものを注文してしまったとき',
  },
  {
    id: 'life-food-046',
    japanese: '食後のコーヒーないと無理',
    english: [
      "need my coffee",
      "I literally cannot function without my after-meal coffee",
      "if I don't have coffee after eating, my whole day falls apart",
      "my meal is not complete until the coffee arrives. the food was the opening act. the coffee is the headliner. everything between the last bite and the first sip is intermission. I don't make the rules. my body makes the rules. and my body has decided that digestion requires caffeine. is that medically accurate? absolutely not. is it emotionally accurate? one hundred percent."
    ],
    context: "「ないと無理」は「なかったら無理」の短縮で、依存を表明する定番フレーズ。英語のcannot function withoutが構造的に同じ。日本語は「無理」一語で「不可能+嫌だ+やりたくない」を含む。英語はcannot functionと機能停止で表現。",
    category: 'food',
    subcategory: 'routine',
    situation: '食後にコーヒーが飲みたいとき',
  },
  {
    id: 'life-food-047',
    japanese: 'お腹パンパン',
    english: [
      "absolutely stuffed",
      "I am so incredibly full right now",
      "I couldn't eat another bite even if you paid me",
      "my stomach has reached maximum capacity. there's a warning light going off somewhere inside me. if I eat one more thing I'm going to need a nap. no, not a nap. a coma. a food-induced coma that lasts until tomorrow morning. my belt is on its last hole. I can hear it straining. we went too far. we always go too far. but the food was worth it so I have no regrets."
    ],
    literal: 'お腹がぱんぱんに膨らんでる',
    context: "「パンパン」は擬態語で「膨張した状態」。英語にこの音の表現がない。stuffedは「詰め込まれた」で受動的。fullは「満杯」。日本語の擬態語は感覚を音にする天才システムだけど、英語は状態を形容詞で描写する。音vs意味の言語哲学の違い。",
    category: 'food',
    subcategory: 'overeating',
    situation: '限界まで食べた後',
  },
  {
    id: 'life-food-048',
    japanese: '炭水化物は正義',
    english: [
      "carbs are king",
      "carbs are the answer to everything, honestly",
      "I don't care what any diet says, carbs are the best thing on earth",
      "rice. bread. noodles. pasta. the four horsemen of deliciousness. every diet on the internet tells me to avoid them and every cell in my body tells me to eat them. I tried low-carb once. I lasted three days. on day four I ate an entire bowl of rice and cried tears of joy. some people need love. I need white rice. we're all fighting different battles."
    ],
    literal: '炭水化物は正義である',
    context: "「〇〇は正義」はネットスラングで「〇〇こそが正しい」。英語のis kingが近い。「正義」は本来justice/righteousnessだけど、ネットスラングでは「最高」の意味。英語のis kingも「王」が転じて「最高」。どちらも大げさな権威を借りてくるギャグ構造。",
    category: 'food',
    subcategory: 'diet',
    situation: '炭水化物の美味さを力説するとき',
  },
  {
    id: 'life-food-049',
    japanese: '今日何食べたい？何でもいい以外で',
    english: [
      "pick something specific",
      "what do you want to eat, and don't say anything is fine",
      "tell me what you actually want to eat, I'm not accepting anything is fine as an answer",
      "we've been doing this dance for ten minutes. I ask what you want. you say anything. I suggest something. you say hmm not that. I suggest something else. you say hmm. this is not a negotiation it's a hostage situation and the hostage is my patience. please. just name a food. any food. except anything is fine. that's not a food. that's a trap. give me a real answer."
    ],
    context: "「何でもいい以外で」は日本語の高等テクニック。除外条件を先に出す。英語はdon't sayやI'm not acceptingで「その回答は受け付けない」と宣言する。日本語は「以外で」の2文字、英語は文で禁止する。日本語の除外表現の効率が際立つ。",
    category: 'food',
    subcategory: 'eating-out',
    situation: '食事の相手が何でもいいと言い続けるとき',
  },
  {
    id: 'life-food-050',
    japanese: '賞味期限ちょっと過ぎてるけどいけるっしょ',
    english: [
      "probably still fine",
      "it's a little past the date but it should be fine",
      "the expiration date was two days ago but honestly it smells okay to me",
      "the date says April fifteenth and today is April seventeenth and I'm choosing to interpret that as a suggestion rather than a deadline. it's not expired. it's experienced. it has character now. I'm going to smell it. okay it smells fine. I'm going to taste it. okay it tastes fine. I'm going to eat the whole thing and if I'm wrong we'll find out in about four hours."
    ],
    context: "「いけるっしょ」は「いけるでしょう」の崩し。「たぶん大丈夫」と言いつつ確信はない。英語のshould be fineも同じ曖昧な安心。probablyは「おそらく」で逃げ道を残す。日本語の「っしょ」と英語のshouldは、どちらも責任を取りたくない時の緩衝材。",
    category: 'food',
    subcategory: 'cooking',
    situation: '冷蔵庫の食品の期限が微妙に切れているとき',
  },
];
