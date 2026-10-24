import type { LifePhrase } from './life-phrases';

export const weatherPhrases: LifePhrase[] = [
  {
    id: 'life-weather-001',
    japanese: '蒸し暑い',
    english: [
      "so humid",
      "it's disgustingly humid out there",
      "the humidity is killing me, I'm soaking wet just from walking outside",
      "it's not even hot. it's humid. which is worse. because hot you can deal with. you drink water, you find shade, you survive. humidity? there's no escape. the air itself is attacking you. I stepped outside for thirty seconds and came back looking like I just ran a marathon. in a sauna. fully clothed. my shirt is a crime scene."
    ],
    context: "「蒸し暑い」はhot and humidだけど、ネイティブはhumidだけで蒸し暑さを表現する。hotは乾いた暑さ、humidは水分を含んだ暑さ。muggy(不快な蒸し暑さ)、stuffy(室内)、sweltering(うだるような)。日本語の1語に英語は5語で対応する。",
    category: 'weather',
    subcategory: 'humidity',
    situation: '梅雨時期に外出したとき',
  },
  {
    id: 'life-weather-002',
    japanese: '暑すぎてやばい',
    english: [
      "insanely hot",
      "it's stupid hot outside, I can't function",
      "it's so hot I feel like my brain is melting, I refuse to go outside",
      "thirty-eight degrees. thirty-eight. that's not weather. that's an oven. the sidewalk is cooking eggs. the vending machine water is warm. I bought an ice cream and it turned into a milkshake before I could unwrap it. the sun is personally targeting me. I don't know what I did to offend it but I'd like to apologize."
    ],
    context: "「やばい」は万能だけど、英語のstupid hotはその精度に近い。stupidは「バカみたいに」の意味で形容詞を強調する口語。insanely/ridiculously/stupidly + 形容詞で「やばい+X」を量産できる。",
    category: 'weather',
    subcategory: 'heat',
    situation: '真夏の猛暑日',
  },
  {
    id: 'life-weather-003',
    japanese: '寒っ',
    english: [
      "freezing",
      "oh god, it's freezing out here",
      "it's absolutely freezing, I can't feel my fingers anymore",
      "I just stepped outside and my soul left my body. that's not cold. that's an assault. my nose hairs froze. I didn't even know nose hairs could freeze. every breath hurts. I'm wearing three layers and it means nothing. the wind just goes right through everything like my jacket is decorative."
    ],
    context: "「寒っ」の「っ」は言い切れない瞬間反応。英語のfreezingも同じ即座の反応語。coldは客観報告、freezingは体感の叫び。chilly(ちょっと肌寒い)→cold(寒い)→freezing(凍える)で温度計のように使い分ける。",
    category: 'weather',
    subcategory: 'cold',
    situation: '冬の朝、外に出た瞬間',
  },
  {
    id: 'life-weather-004',
    japanese: '雨かよ',
    english: [
      "great, rain",
      "are you kidding me, it's raining",
      "of course it's raining, I literally just did my hair",
      "rain. on the one day I didn't bring an umbrella. because the forecast said sunny. the forecast lied. the forecast is a liar. I trusted you, weather app. I believed in you. and now I'm standing under a convenience store awning with six other betrayed people, all of us staring at the sky like it owes us an apology."
    ],
    context: "「かよ」は不満と諦めの終助詞。英語にはこの1語がない。だからof courseで「やっぱりな」の諦め、are you kiddingで「マジかよ」の不満を別々に表現する。日本語の助詞1つ分の感情を、英語はフレーズで補う。",
    category: 'weather',
    subcategory: 'rain',
    situation: '傘を持っていない日に雨が降ったとき',
  },
  {
    id: 'life-weather-005',
    japanese: '梅雨入りしたらしい',
    english: [
      "rainy season started",
      "apparently the rainy season officially started",
      "they said the rainy season started, so it's going to be miserable for a month",
      "rainy season. six weeks of wet everything. wet shoes, wet socks, wet bag, wet mood. the laundry never dries. the room smells like damp towel. mushrooms could grow on my curtains. I'm going to spend the next month and a half living inside a cloud and pretending that's fine."
    ],
    context: "「梅雨」は英語に直訳がない。rainy seasonが最も近いけど、東南アジアのモンスーンとは違う陰鬱さがある。apparentlyは「らしい」の定番訳。ニュースで聞いた情報を他人事のように伝える温度感が同じ。",
    category: 'weather',
    subcategory: 'rainy-season',
    situation: '梅雨入りのニュースを見たとき',
  },
  {
    id: 'life-weather-006',
    japanese: '洗濯物乾かない',
    english: [
      "laundry won't dry",
      "my laundry hasn't dried in three days",
      "the laundry just won't dry, I'm running out of clothes to wear",
      "day four. the laundry is still damp. I've moved it to the window. I've moved it to the bathroom. I've turned on the fan. I've pointed the dehumidifier at it. nothing works. these jeans have been hanging there so long they've become a permanent fixture. they're furniture now. I might frame them."
    ],
    context: "「乾かない」はwon't dry。cannotではなくwon't。まるで洗濯物に意志があるかのような表現。英語のwon'tはwill notの短縮だが、無生物主語+won'tで「頑固に～しない」という擬人化が自然に発生する。",
    category: 'weather',
    subcategory: 'rainy-season',
    situation: '梅雨で洗濯物が乾かないとき',
  },
  {
    id: 'life-weather-007',
    japanese: '台風来てるね',
    english: [
      "typhoon coming",
      "there's a typhoon heading this way",
      "looks like a typhoon's heading straight for us, hope the trains are okay",
      "typhoon. the annual tradition of buying way too much bread and water and then sitting in your apartment watching the wind try to rip your balcony off. the news shows reporters standing in rain sideways like that's journalism. my biggest concern is always the same. is the train running tomorrow. that's it. that's my whole disaster plan."
    ],
    context: "「来てるね」の「ね」は共感の確認。英語はheading this wayで方向性を出す。coming vs heading: comingは単純な接近、headingは「狙ってきている」感。日本人が台風で真っ先に心配するのが電車という文化差も面白い。",
    category: 'weather',
    subcategory: 'typhoon',
    situation: '台風のニュースを見ながら',
  },
  {
    id: 'life-weather-008',
    japanese: '花粉やばい',
    english: [
      "pollen's brutal",
      "the pollen is destroying me right now",
      "my allergies are going insane, I can barely keep my eyes open",
      "I sneezed fourteen times in a row this morning. fourteen. my coworker stopped saying bless you after the fifth one. my eyes are swollen. my nose is a faucet. I go through a box of tissues a day. the cedar trees are waging biological warfare on my face and I have no defense. spring is supposed to be beautiful. spring is a lie."
    ],
    context: "「花粉やばい」の花粉はpollenだが、会話ではmy allergiesの方が自然。日本語は原因(花粉)で語り、英語は症状(allergies)で語る。この視点の違いが英語脳への入り口。pollen countという気象用語もある。",
    category: 'weather',
    subcategory: 'pollen',
    situation: '春の花粉シーズン',
  },
  {
    id: 'life-weather-009',
    japanese: 'エアコンつけよ',
    english: [
      "turning on the AC",
      "that's it, I'm turning on the AC",
      "I can't take it anymore, I'm turning on the air conditioning",
      "I was trying to be responsible. save electricity. save the planet. open the windows. use a fan. but the fan is just pushing hot air around in circles. it's not cooling anything. it's a hot air redistributor. that's it. I'm done being eco-friendly. the AC is going on. the planet will have to forgive me."
    ],
    context: "「つけよ」は独り言の意志表明。英語はI'm turning it onと進行形で「もう決めた」を表す。ACはair conditioningの略で会話の定番。イギリス英語ではairconとも。つける=turn on、消す=turn off。",
    category: 'weather',
    subcategory: 'air-conditioning',
    situation: '暑さに耐えられなくなったとき',
  },
  {
    id: 'life-weather-010',
    japanese: 'エアコンの温度で揉める',
    english: [
      "AC war",
      "we're fighting over the thermostat again",
      "my wife wants it at 28 and I want it at 24, this is a real problem",
      "every summer. the same war. she says twenty-eight is fine. twenty-eight is not fine. twenty-eight is room temperature in a country that doesn't have summers like this. I set it to twenty-four when she's not looking. she sets it back when I'm not looking. we've been doing this for years. neither of us has ever won."
    ],
    context: "「揉める」はfight over / argue aboutだが、thermostat warは英語圏の定番ネタ。職場でも家庭でも温度設定は戦争になる。thermostatは温度調節器。日本語の「リモコン」とは違い、壁付けのイメージが強い。",
    category: 'weather',
    subcategory: 'air-conditioning',
    situation: '家族や同僚とエアコンの温度で揉めているとき',
  },
  {
    id: 'life-weather-011',
    japanese: '紫外線やばいから日焼け止め塗らなきゃ',
    english: [
      "need sunscreen",
      "the UV is brutal, I need to put on sunscreen",
      "the sun is no joke today, I need to lather on sunscreen before I go out",
      "I checked the UV index. it said extreme. extreme. that's the highest level. the sun is literally trying to cook me. and I still know people who don't wear sunscreen because they want a tan. a tan. you're going to look like a leather bag at forty but sure, enjoy your tan. I'm putting on SPF 50 and a hat."
    ],
    context: "「紫外線」は英語ではUV(ultraviolet)。会話ではthe UV is strongよりthe sun is brutalが自然。日焼け止め=sunscreen。put on/apply/lather onの3段階。lather onは「たっぷり塗る」。日本の紫外線意識は世界的に見てもかなり高い。",
    category: 'weather',
    subcategory: 'uv',
    situation: '夏の外出前',
  },
  {
    id: 'life-weather-012',
    japanese: '桜咲いたね',
    english: [
      "cherry blossoms are out",
      "the cherry blossoms finally bloomed",
      "the cherry blossoms are out, we should go see them before they're gone",
      "they're here. and they'll be gone in a week. that's the thing about cherry blossoms. the whole country loses its mind for seven days. everybody suddenly becomes a poet. oh how fleeting. how beautiful. how temporary. and then we all sit under the trees and drink beer. the philosophy lasts about two drinks before it's just a regular picnic."
    ],
    context: "「咲いたね」の「ね」は感動の共有。cherry blossoms are outのoutは「出現した」。bloomedは「咲いた」の正式表現。英語にはhanami文化がないので、blossom viewingかcherry blossom partyと説明的になる。",
    category: 'weather',
    subcategory: 'cherry-blossom',
    situation: '桜の開花を見つけたとき',
  },
  {
    id: 'life-weather-013',
    japanese: '花見しよう',
    english: [
      "let's go hanami",
      "let's go have a picnic under the cherry blossoms",
      "the blossoms are out, let's grab some drinks and find a good spot",
      "hanami. the official Japanese sport of sitting under trees and pretending you care about flowers while drinking beer at noon on a weekday. someone brings a blue tarp. someone brings too much food. someone gets lost. someone falls asleep. the flowers are beautiful and nobody is looking at them. it's the best tradition this country has."
    ],
    context: "「花見」は英語に直訳不可能な文化語。picnic under the cherry blossomsが最も近い。hanamiがそのまま英語圏でも通じ始めている。花見の本質は「花を見る」ではなく「花を口実に飲む」。",
    category: 'weather',
    subcategory: 'cherry-blossom',
    situation: '春に友達を花見に誘うとき',
  },
  {
    id: 'life-weather-014',
    japanese: '夏バテした',
    english: [
      "summer fatigue",
      "the heat totally wiped me out",
      "I've got no energy at all, I think the heat finally got to me",
      "I can't eat. I can't sleep. I can't think. all I can do is lie on the floor and exist. the heat has taken everything from me. my motivation. my appetite. my will to do anything productive. I'm basically a houseplant right now. just sitting here. absorbing sunlight. contributing nothing. water me occasionally."
    ],
    context: "「夏バテ」は英語にぴったりの1語がない。heat exhaustionは医学用語で重すぎる。the heat got to meが日常会話での夏バテ。wiped outは「体力を全部奪われた」。夏バテの曖昧なだるさを英語は症状で説明する。",
    category: 'weather',
    subcategory: 'heat',
    situation: '真夏に食欲がなくなったとき',
  },
  {
    id: 'life-weather-015',
    japanese: '涼しくなってきた',
    english: [
      "getting cooler",
      "it's finally starting to cool down",
      "I can actually feel the air getting cooler, thank god summer is ending",
      "wait. do you feel that. that's a breeze. an actual cool breeze. not the fake breeze from my AC. a real one. from outside. with actual cool air in it. this is the first time in three months I've stepped outside and not immediately wanted to go back inside. I think I might cry. fall is coming. we made it."
    ],
    context: "「なってきた」の「てきた」は変化の始まりを表す進行形。英語はstarting toで同じ「変わり始め」を表現する。getting+形容詞も変化の進行。coolとcoldの差は重要。coolは心地よい涼しさ、coldは不快な寒さ。",
    category: 'weather',
    subcategory: 'autumn',
    situation: '秋の気配を感じたとき',
  },
  {
    id: 'life-weather-016',
    japanese: '紅葉見に行きたい',
    english: [
      "want to see fall colors",
      "I really want to go see the autumn leaves",
      "the fall colors should be amazing right now, I want to go check them out",
      "every year I say I'm going to go see the autumn leaves. every year I look up the best spots. every year I check the forecast. and every year I end up just looking at pictures on Instagram from the couch. this year will be different. I'm actually going. probably. maybe. we'll see. the couch is very comfortable though."
    ],
    context: "「紅葉」は英語ではautumn leaves / fall foliage / fall colors。アメリカではfall、イギリスではautumn。foliageはフォーマルな響き。leaf peepingは紅葉狩りに近いカジュアル表現。日本語の「紅葉」1語の美しさは英語では再現困難。",
    category: 'weather',
    subcategory: 'autumn',
    situation: '秋に紅葉の話題が出たとき',
  },
  {
    id: 'life-weather-017',
    japanese: '雪降ってる',
    english: [
      "it's snowing",
      "oh wow, it's actually snowing outside",
      "look, it's snowing, it's been a while since we got snow here",
      "snow. in Tokyo. which means the city will shut down completely. two centimeters and the trains stop. the convenience store runs out of bread. people walk like baby deer on ice. meanwhile Hokkaido is getting two meters and they're just going to work normally. we are not the same. Tokyo cannot handle weather."
    ],
    context: "「降ってる」の現在進行形はit's snowingでそのまま。ただし東京の雪と北海道の雪は英語でも区別される。flurry(ちらつく雪)、dusting(薄っすら積もる)、blizzard(吹雪)。2cmで都市機能停止は世界的に見ると異常。",
    category: 'weather',
    subcategory: 'snow',
    situation: '雪が降り始めたとき',
  },
  {
    id: 'life-weather-018',
    japanese: '季節の変わり目で体調崩した',
    english: [
      "seasonal change got me",
      "the weather change totally messed me up",
      "I always get sick when the seasons change, my body can't handle it",
      "every single time. spring to summer. summer to fall. fall to winter. the moment the weather can't decide what it wants to be, my body just gives up. is it hot? is it cold? dress in layers, they say. I dressed in layers. I was hot on the train and cold outside. now I have a sore throat. layers didn't save me."
    ],
    context: "「季節の変わり目」は英語ではwhen the seasons changeまたはseasonal transition。1語では表現できない。体調を崩す=get sick/come down with somethingだが、天気のせいで体調を崩す概念は英語圏ではあまり一般的ではない。",
    category: 'weather',
    subcategory: 'seasonal-change',
    situation: '季節の変わり目に風邪をひいたとき',
  },
  {
    id: 'life-weather-019',
    japanese: '今日あったかいね',
    english: [
      "warm today",
      "it's actually pretty warm today, isn't it",
      "it's surprisingly warm today, I didn't even need a jacket",
      "I walked outside without a jacket and I didn't die. that's how you know it's getting warmer. yesterday I needed two layers. today I need zero. this is the kind of weather where you don't think about weather. you just exist. comfortably. no sweating, no shivering. just being. this is the perfect temperature and it'll last exactly two days."
    ],
    context: "「あったかい」はwarmの一言。hotではない。warmは心地よい暖かさ、hotは暑い。この使い分けを日本語話者は間違えやすい。「ね」は相手に同意を求める日本語の癖。isn't itで同じ機能を果たす。",
    category: 'weather',
    subcategory: 'warmth',
    situation: '春先の暖かい日',
  },
  {
    id: 'life-weather-020',
    japanese: '天気予報ハズレた',
    english: [
      "forecast was wrong",
      "the weather forecast totally lied to me",
      "the forecast said it was going to be sunny and now it's pouring rain",
      "I planned my entire day around the weather forecast. sunny, it said. clear skies, it said. I wore a white shirt. I left my umbrella at home. I told my friend we should eat outside. then at noon the sky turned dark like a movie villain entrance and it rained so hard my shoes became swimming pools. I will never trust technology again."
    ],
    context: "「ハズレた」は予測が外れたこと。forecast was wrongは客観的、lied to meは擬人化して恨みを込める。英語は天気予報を人格化して怒る表現が多い。the weather app betrayed meなど。天気予報への信頼と裏切りは世界共通のネタ。",
    category: 'weather',
    subcategory: 'forecast',
    situation: '天気予報が外れて濡れたとき',
  },
  {
    id: 'life-weather-021',
    japanese: '風強すぎ',
    english: [
      "crazy windy",
      "the wind is absolutely insane today",
      "the wind is so strong I can barely walk straight, my umbrella is useless",
      "my umbrella lasted three seconds. three seconds. it flipped inside out and became a metal flower. I'm now just holding a stick in the rain looking like a defeated warrior. the wind is pushing me sideways down the street. I'm not walking. I'm being transported. this is not commuting. this is extreme sports."
    ],
    context: "「強すぎ」の「すぎ」はtoo strong / so strongだが、口語ではinsane/crazy/ridiculousが自然。windyだけだと弱い。gusty(突風のある)、breezy(そよ風)、gale-force(暴風)で風の強さを段階表現する。",
    category: 'weather',
    subcategory: 'wind',
    situation: '風が強い日に外を歩いているとき',
  },
  {
    id: 'life-weather-022',
    japanese: 'ゲリラ豪雨',
    english: [
      "sudden downpour",
      "it just started pouring out of nowhere",
      "five minutes ago it was sunny and now it's a total downpour, what is this",
      "the sky was blue. blue. I looked up, confirmed it, blue sky, not a single cloud. went into the store for five minutes. came out and it looked like someone turned on a giant shower head over the city. five minutes. that's all it took. I didn't even get my receipt. now I'm trapped in a drug store watching the apocalypse happen outside."
    ],
    context: "「ゲリラ豪雨」は英語に完璧な訳がない。sudden downpourが最も近い。cloudburstは気象用語。pouring / coming down hardが口語。out of nowhereで「突然」の感覚を足す。guerrilla rainstormとは言わない。",
    category: 'weather',
    subcategory: 'rain',
    situation: '突然の大雨に遭遇したとき',
  },
  {
    id: 'life-weather-023',
    japanese: '日が長くなったね',
    english: [
      "days are longer",
      "the days are getting so much longer now",
      "it's still light out at seven, the days are really getting longer",
      "I left work and it was still light out. that's how you know summer is coming. in winter I leave work and it's pitch black and I feel like the day is over and my life is over and everything is sad. but now it's bright at seven and suddenly I have hope again. sunlight is free therapy."
    ],
    context: "「日が長い」は英語ではthe days are longerまたはit stays light later。日本語は「日」で太陽を指すが、英語のdayは1日全体。だからdaylightやsunlightを使う方が正確。still light outは「まだ明るい」の自然な表現。",
    category: 'weather',
    subcategory: 'daylight',
    situation: '夏至に向かって日が伸びてきたとき',
  },
  {
    id: 'life-weather-024',
    japanese: '日が短くなって寂しい',
    english: [
      "days getting shorter",
      "the days are getting shorter and it's kind of depressing",
      "it gets dark so early now, it really makes me feel kind of down",
      "it's five o'clock and it's already dark. this is deeply upsetting. I used to leave work with sunlight. now I leave work in darkness and arrive home in more darkness. I'm a vampire. I haven't seen the sun on a weekday in two weeks. my vitamin D levels are probably in the negatives. winter is seasonal depression with a holiday attached."
    ],
    context: "「寂しい」をlonelyと訳すと誤訳。ここの寂しいはsad/depressing/down。日本語の「寂しい」は孤独だけでなく「もの寂しさ」も含む。英語はlonely(人が恋しい)とmelancholy(もの悲しい)を明確に区別する。",
    category: 'weather',
    subcategory: 'daylight',
    situation: '秋冬に日没が早くなったとき',
  },
  {
    id: 'life-weather-025',
    japanese: '花火大会行く？',
    english: [
      "going to fireworks?",
      "are you going to the fireworks festival?",
      "there's a fireworks festival this weekend, do you want to go check it out?",
      "the fireworks festival is Saturday. which means leaving the house three hours early to find a spot. sitting on a blue tarp surrounded by ten thousand people. eating overpriced yakisoba. sweating. waiting. and then the fireworks start and you go oh wow and take a video you'll never watch. and you know what? it's still worth it. every time."
    ],
    context: "「花火大会」はfireworks festivalまたはfireworks show。displayはイギリス英語寄り。日本の花火大会の規模と文化は独特。浴衣・屋台・場所取りの概念は英語圏にはない。行く？のカジュアルさはare you going?で十分。",
    category: 'weather',
    subcategory: 'summer-event',
    situation: '夏に花火大会の話題が出たとき',
  },
  {
    id: 'life-weather-026',
    japanese: 'お盆休みどこ行くの？',
    english: [
      "Obon plans?",
      "where are you going for the Obon holiday?",
      "what are your plans for the Obon break? going back to your hometown?",
      "Obon. the great migration. everyone goes home at the same time. the highways look like parking lots. the bullet train is standing room only. you spend four hours getting somewhere that normally takes two. and then you sit in your parents' living room eating watermelon and wondering why you didn't just stay home and video call."
    ],
    context: "「お盆」は英語に直訳不可。Obon holidayかsummer breakで説明する。going back hometo your hometown?は「実家帰るの？」の英語版。日本特有の帰省ラッシュはgreat migrationやexodusで表現される。",
    category: 'weather',
    subcategory: 'obon',
    situation: 'お盆前に同僚と休みの話をするとき',
  },
  {
    id: 'life-weather-027',
    japanese: '年末年始の予定は？',
    english: [
      "New Year's plans?",
      "what are you doing for the New Year's holidays?",
      "do you have any plans for the New Year's break? staying home or going somewhere?",
      "every year I plan to do something productive over the New Year's break. read a book. organize the closet. start a workout routine. and every year I end up lying on the couch eating mochi and watching the same New Year's TV specials I've been watching since I was twelve. January second rolls around and I've accomplished exactly nothing. tradition."
    ],
    context: "「年末年始」はNew Year's holidays/breakが自然。holiday seasonはクリスマス含むアメリカ英語。日本の年末年始とアメリカのholiday seasonは時期が重なるが文化が全く違う。大掃除・紅白・初詣は説明が必要。",
    category: 'weather',
    subcategory: 'new-year',
    situation: '12月に年末年始の予定を聞くとき',
  },
  {
    id: 'life-weather-028',
    japanese: 'GW何する？',
    english: [
      "Golden Week plans?",
      "what are you doing for Golden Week?",
      "Golden Week's coming up, got any plans or are you just going to chill?",
      "Golden Week. the one time of year Japan collectively agrees to not work and the entire country tries to go to the same five places. Disneyland. Okinawa. anywhere with a beach. the airports are chaos. the toll roads are nightmares. half the country is in a car right now going twelve kilometers per hour. and yet we do this every single year."
    ],
    context: "「GW」はそのままGolden Weekで英語圏でも通じつつある。got any plans?は「予定ある？」のカジュアル定番。chillは「のんびりする」。日本特有の大型連休の概念は英語圏にはない。long weekendが最も近いが規模が違う。",
    category: 'weather',
    subcategory: 'golden-week',
    situation: 'GW前に友達と予定を話すとき',
  },
  {
    id: 'life-weather-029',
    japanese: '今日めっちゃいい天気',
    english: [
      "gorgeous day",
      "the weather is absolutely perfect today",
      "it's such a beautiful day, it feels like a waste to be stuck indoors",
      "I looked outside and the sky was that ridiculous shade of blue that doesn't look real. not a single cloud. perfect temperature. light breeze. this is the kind of day that makes you question your entire life. why am I in an office. why am I staring at a screen. nature is out there being perfect and I'm replying to emails."
    ],
    context: "「めっちゃいい天気」はbeautiful/gorgeous/perfect dayで表現。niceだと弱すぎる。gorgeousは見た目の美しさ、perfectは条件の完璧さ。英語はいい天気の「何がいいか」まで形容詞で指定する。日本語は「いい天気」で全部まとめる。",
    category: 'weather',
    subcategory: 'clear-sky',
    situation: '快晴の朝',
  },
  {
    id: 'life-weather-030',
    japanese: 'じめじめする',
    english: [
      "so damp",
      "everything feels sticky and gross",
      "the air is so damp and muggy, nothing feels clean",
      "you know that feeling where everything is slightly moist? your skin. your clothes. the table. the air itself. like you're living inside a mouth. that's what Japan is like from June to September. you shower and then immediately need another shower. you dry your hair and it's wet again. physics doesn't work here in summer."
    ],
    context: "「じめじめ」は擬態語。英語にはこの音の質感がない。damp(湿った)、muggy(蒸し暑い)、sticky(べたべた)、clammy(じっとり)で分解する。living inside a mouthという比喩が英語話者には伝わる「じめじめ」の最強翻訳。",
    category: 'weather',
    subcategory: 'humidity',
    situation: '梅雨のじめじめした日',
  },
  {
    id: 'life-weather-031',
    japanese: '夕立来そう',
    english: [
      "looks like rain",
      "it looks like an afternoon shower is coming",
      "the sky's getting dark, I think we're about to get hit with an afternoon shower",
      "see those clouds? they're not the friendly white puffy clouds. those are the dark angry ones. they're moving fast. and they're coming this way. I give it about twenty minutes before it dumps. I've been caught in enough afternoon showers to know the signs. that sudden wind. that drop in temperature. it's coming. run."
    ],
    context: "「夕立」は英語ではafternoon showerまたはsummer shower。eveningではなくafternoon。日本語の「夕」は夕方だが、夕立は実際には午後に来ることが多い。looks like rainは空模様を見て予測する定番表現。",
    category: 'weather',
    subcategory: 'rain',
    situation: '夏の午後に空が急に暗くなったとき',
  },
  {
    id: 'life-weather-032',
    japanese: '日焼けした',
    english: [
      "got sunburned",
      "I'm totally sunburned, it stings",
      "I fell asleep on the beach and now I look like a lobster",
      "I put on sunscreen. I did. but apparently I missed a spot. and that spot was my entire back. so now I have a perfectly white front and a perfectly red back like some kind of human flag. I can't lean against anything. I can't sleep on my back. every shirt feels like sandpaper. one nap on the beach. one nap."
    ],
    context: "「日焼け」は英語ではsunburn(痛い)とtan(小麦色)で意味が全然違う。日本語は両方「日焼け」。I got a tanは褒め言葉、I got sunburnedは失敗談。look like a lobsterは赤い日焼けの定番比喩。",
    category: 'weather',
    subcategory: 'uv',
    situation: '海やプールで日焼けしたとき',
  },
  {
    id: 'life-weather-033',
    japanese: '熱中症気をつけて',
    english: [
      "watch for heatstroke",
      "be careful out there, you could get heatstroke",
      "make sure you stay hydrated, this heat is no joke, heatstroke is real",
      "every summer the news says the same thing. drink water. stay in the shade. avoid going out between twelve and three. and every summer someone faints at a train platform. the human body was not designed for this. we are not lizards. we cannot thermoregulate at thirty-nine degrees. please drink water. I'm begging you. drink water."
    ],
    context: "「熱中症」はheatstroke。heat exhaustionは軽症、heatstrokeは重症で命に関わる。「気をつけて」はbe careful / watch outだが、stay hydratedが具体的な対処法を含む自然な注意。日本の熱中症対策の真剣さは世界的に見ても際立つ。",
    category: 'weather',
    subcategory: 'heat',
    situation: '猛暑日に外出する人に声をかけるとき',
  },
  {
    id: 'life-weather-034',
    japanese: '雷すごい',
    english: [
      "insane thunder",
      "the thunder is absolutely terrifying right now",
      "the lightning is nonstop and the thunder is shaking the whole building",
      "I'm sitting in my apartment and the windows are vibrating. the thunder is so loud it set off a car alarm outside. the lightning is turning my room into a strobe light. my cat is under the bed. I'm considering joining the cat. this is not weather. this is the sky having a breakdown. someone check on the sky."
    ],
    context: "「すごい」はamazing/incredible/terrifyingのどれにもなる。雷の場合はterrifyingかintenseが自然。thunderは音、lightningは光。日本語は「雷」で両方を指すが、英語は必ず分ける。この区別を意識するだけで英語力が上がる。",
    category: 'weather',
    subcategory: 'storm',
    situation: '雷雨の夜',
  },
  {
    id: 'life-weather-035',
    japanese: '初雪だ',
    english: [
      "first snow",
      "oh, it's the first snow of the year",
      "it's the first snow of the season, it always feels kind of special",
      "the first snow hits different. it's not about the cold. it's not about the inconvenience. it's that moment where you look out the window and the world looks different. cleaner. quieter. for about thirty minutes everything is magical. then it turns to slush. and the magic is gone. and you're just cold and wet and late for work."
    ],
    context: "「初雪」はfirst snow of the season/year。英語にも初雪を特別視する感覚はある。hits differentは「なんか違う」の若者言葉。日本語の「だ」は発見と感動の断定。英語はoh+感嘆で同じ瞬間を表す。",
    category: 'weather',
    subcategory: 'snow',
    situation: '冬の初雪を見たとき',
  },
  {
    id: 'life-weather-036',
    japanese: '布団から出られない',
    english: [
      "can't leave the futon",
      "I literally cannot get out of bed in this cold",
      "it's so cold outside the blanket that leaving bed feels like a survival challenge",
      "my alarm went off. I acknowledged it. I understand that I need to get up. but the gap between my warm blanket and the freezing air outside it is about fifteen degrees. that's not a temperature difference. that's a negotiation. my brain says get up. my body says absolutely not. we've been having this argument for forty minutes."
    ],
    context: "「出られない」は物理的にではなく心理的に出られない。can'tではなくliterally can't / physicallyと大げさに言うのが英語の自然な誇張法。futonと言っても英語圏の人はベッドを想像する。日本の布団文化は別途説明が必要。",
    category: 'weather',
    subcategory: 'cold',
    situation: '冬の朝、起きたくないとき',
  },
  {
    id: 'life-weather-037',
    japanese: '真夏に外で並ぶとか地獄',
    english: [
      "outdoor line, hell",
      "standing in line outside in this heat is literal hell",
      "whoever decided to make people line up outside in the middle of summer is a monster",
      "there are thirty people in front of me. we're outside. there is no shade. it's thirty-five degrees. the asphalt is radiating heat from below and the sun is attacking from above. I'm being grilled from both sides like a panini. this ramen better change my life because I'm paying for it with years of my lifespan right now."
    ],
    context: "「とか地獄」の「とか」は引用＋軽蔑。literal hellはliterallyで大げささを強調する現代英語の定番。日本語の「地獄」は比喩的に軽く使うが、hellも英語では同じくらいカジュアルに使う。文化的等価性が高い。",
    category: 'weather',
    subcategory: 'heat',
    situation: '炎天下で行列に並んでいるとき',
  },
  {
    id: 'life-weather-038',
    japanese: '秋刀魚が美味しい季節',
    english: [
      "sanma season",
      "it's that time of year for grilled sanma",
      "fall is here, which means sanma season, it's the best time of year for food",
      "you know fall is real when the sanma shows up. not the frozen kind. the fresh kind. the one you grill whole and eat with grated daikon and soy sauce. the skin gets crispy. the fat drips. the smell fills the entire apartment and probably your neighbor's apartment too. sorry not sorry. this fish is a seasonal event and I will not apologize."
    ],
    context: "「季節」は英語ではseasonだが、「食べ物が美味しい季節」という表現は英語圏ではin season(旬)で表す。sanmaは英語ではPacific sauryだが誰も言わない。foodie文化の発達で日本語の食材名がそのまま通じ始めている。",
    category: 'weather',
    subcategory: 'autumn',
    situation: '秋に旬の食べ物の話をするとき',
  },
  {
    id: 'life-weather-039',
    japanese: '冷房効きすぎ',
    english: [
      "AC's too cold",
      "the air conditioning is way too strong in here",
      "whoever set the AC in this office needs to chill, it's literally freezing in here",
      "it's thirty-five outside and five inside. I came to work in a t-shirt because it's summer. but the office has other plans. the office thinks it's December. I have goosebumps. I'm wearing a cardigan I keep in my desk specifically for this. who is controlling the thermostat. show yourself. we need to talk."
    ],
    context: "「効きすぎ」はtoo strong / too cold / blasting。効く=workだが、エアコンが「効きすぎ」の場合はwork too wellではなくway too coldが自然。日本のオフィスや電車の冷房の強さは外国人が驚くポイント。",
    category: 'weather',
    subcategory: 'air-conditioning',
    situation: 'オフィスや電車の冷房が強すぎるとき',
  },
  {
    id: 'life-weather-040',
    japanese: '夏祭り行こうよ',
    english: [
      "let's hit the festival",
      "there's a summer festival this weekend, let's go",
      "the summer festival is this weekend, we should go, it'll be fun",
      "summer festival. the one night where it's socially acceptable to walk around in a yukata eating things on sticks. yakitori on a stick. corn on a stick. chocolate banana on a stick. everything is on a stick. you play goldfish scooping and lose immediately. you buy a mask you'll never wear again. you watch the fireworks. it's perfect."
    ],
    context: "「行こうよ」の「よ」は柔らかい誘い。let's goだとニュートラル、let's hitはカジュアル。hit upは「行く」のスラング。夏祭り=summer festivalだが、屋台・盆踊り・浴衣の文化は英語圏のfestivalとは全く異なる。",
    category: 'weather',
    subcategory: 'summer-event',
    situation: '夏祭りに友達を誘うとき',
  },
  {
    id: 'life-weather-041',
    japanese: 'もう半袖でいいかな',
    english: [
      "short sleeves okay?",
      "think I can get away with short sleeves now?",
      "is it warm enough for short sleeves? I'm so done with layers",
      "the eternal spring question. is it short-sleeve weather yet. because some days it's twenty degrees and you think yes. then the wind blows and it's actually twelve. and you're standing at the station in a t-shirt pretending you're not cold because you already committed. you can't put a jacket on now. that's admitting defeat."
    ],
    context: "「でいいかな」は自問自答の許可確認。get away withは「〜で済む」。short sleeves vs long sleevesは英語の基本だが、日本語の「半袖」「長袖」の1語の便利さに英語は2語必要。short-sleeve weatherという表現は実際に使う。",
    category: 'weather',
    subcategory: 'seasonal-change',
    situation: '春先に服装を迷うとき',
  },
  {
    id: 'life-weather-042',
    japanese: '今年の冬寒すぎない？',
    english: [
      "colder this year?",
      "is it just me or is this winter way colder than usual?",
      "this winter feels way colder than last year, I can't be the only one who thinks so",
      "I'm wearing the same coat I wore last year. same gloves. same scarf. and I'm colder. either this winter got more aggressive or my cold tolerance is decreasing with age. I choose to believe it's the weather and not my body slowly giving up. I refuse to accept that I'm becoming one of those people who's always cold."
    ],
    context: "「寒すぎない？」の「ない？」は否定疑問で同意を求める日本語特有の形。英語はis it just me or...で「自分だけ？」と聞くことで同じ効果を出す。than usualは「いつもより」の便利表現。天気の比較話は英語圏の鉄板トピック。",
    category: 'weather',
    subcategory: 'cold',
    situation: '冬にいつもより寒く感じるとき',
  },
  {
    id: 'life-weather-043',
    japanese: '虹出てる',
    english: [
      "rainbow",
      "look, there's a rainbow out there",
      "there's a rainbow outside, quick, come look before it disappears",
      "I don't care how old you are. when you see a rainbow you stop what you're doing and you point at it. it's a law. the CEO of the company could be in the middle of a presentation and someone would go rainbow and everyone would turn to the window. that's just how rainbows work. nobody is too cool for a rainbow. nobody."
    ],
    context: "「出てる」は存在の発見報告。there's a rainbow / there is oneで英語も同じ構造。rainbowを見て興奮するのは全世界共通。double rainbow(二重の虹)は2010年のYouTube動画で英語圏のミームになった。",
    category: 'weather',
    subcategory: 'clear-sky',
    situation: '雨上がりに虹を見つけたとき',
  },
  {
    id: 'life-weather-044',
    japanese: '汗だく',
    english: [
      "drenched in sweat",
      "I'm completely soaked, this is disgusting",
      "I'm dripping sweat from just walking to the station, this is inhuman",
      "I walked seven minutes. seven. from my apartment to the station. and I look like I just finished a triathlon. my back is a river. my forehead is a waterfall. I'm going to walk into the office and people are going to think I ran here. I didn't run. I simply existed outside in July. that's enough to destroy a person."
    ],
    context: "「汗だく」は英語ではdrenched in sweat / soaked / dripping。sweating a lotは弱すぎ。英語は汗のレベルをsweating(普通)→soaked(びしょびしょ)→drenched(ずぶ濡れ)で段階化。「だく」の濁音の不快感をdrenchedのdrで再現。",
    category: 'weather',
    subcategory: 'heat',
    situation: '真夏に少し歩いただけで汗だくになったとき',
  },
  {
    id: 'life-weather-045',
    japanese: '今日は外に出たくない',
    english: [
      "staying in today",
      "I have zero desire to go outside today",
      "the weather is so bad I'm not leaving the house unless someone pays me",
      "I looked out the window. I assessed the situation. rain. wind. gray sky. everything about the outside world is saying stay home. and for once I'm going to listen. I have snacks. I have Wi-Fi. I have a couch. the three pillars of civilization. nothing outside can compete with that. today is an indoor day and I'm at peace with that decision."
    ],
    context: "「出たくない」はdon't want to go outだが、zero desire / no intention / refuseで拒否レベルを調整。unless someone pays meは「金もらわないと無理」の誇張法。英語はハイパーボリー(大げさ表現)を日常的に使う。日本語の「たくない」より強い。",
    category: 'weather',
    subcategory: 'general',
    situation: '天気が悪くて引きこもりたいとき',
  },
  {
    id: 'life-weather-046',
    japanese: '冬は鍋に限る',
    english: [
      "hot pot weather",
      "nothing beats hot pot on a cold night like this",
      "winter nights are made for hot pot, there's literally nothing better",
      "the formula is simple. cold outside. warm inside. a giant pot of broth in the middle of the table. everyone throws stuff in. tofu. mushrooms. pork. more pork. the lid comes off and the steam hits your face and that's the moment. that's winter at its best. you don't even need to go anywhere. this is the destination."
    ],
    context: "「に限る」は「それが一番」の断定。nothing beatsが完璧な対応。you can't beat itも同じ意味。hot potは鍋の英語。nabe/shabu-shabu/sukiyakiは種類名としてそのまま通じる。食卓を囲む冬の団欒は英語圏のcomfort foodと通じる概念。",
    category: 'weather',
    subcategory: 'cold',
    situation: '冬の夜に鍋を食べるとき',
  },
  {
    id: 'life-weather-047',
    japanese: '春一番来たね',
    english: [
      "first spring wind",
      "the first strong spring wind finally hit",
      "that warm wind today must be the first spring wind, it really feels like spring is coming",
      "every year there's that one day in February or March where the wind blows warm for the first time. and everyone goes oh, spring is coming. it's not spring. it's still cold. tomorrow will be cold again. but for this one gust of warm wind, we all collectively pretend winter is over. it's the most optimistic thing humans do."
    ],
    context: "「春一番」は英語にぴったりの訳がない。first strong spring windが説明的訳。英語圏にはこの気象現象を特別な言葉で呼ぶ文化がない。日本語の季節感覚の精密さが際立つ表現。春一番は気象庁が正式に発表する点も独特。",
    category: 'weather',
    subcategory: 'seasonal-change',
    situation: '2月〜3月に暖かい強風が吹いたとき',
  },
  {
    id: 'life-weather-048',
    japanese: '寝苦しい',
    english: [
      "can't sleep, too hot",
      "it's way too hot to sleep tonight",
      "I can't sleep at all, it's so hot and stuffy even with the fan on",
      "it's two in the morning. I've flipped the pillow four times. I've kicked the blanket off, pulled it back, kicked it off again. the fan is on full blast pointing directly at my face and it's still not enough. I'm considering sleeping in the bathtub with cold water. this is not living. this is just being awake horizontally and suffering."
    ],
    context: "「寝苦しい」は英語に1語の訳がない。too hot to sleepが最も自然。英語はcan't sleep because of the heatと原因を説明する。tossingand turningは「寝返りを繰り返す」。日本語の「苦しい」が持つ身体的不快感をstuffyで補う。",
    category: 'weather',
    subcategory: 'heat',
    situation: '熱帯夜で眠れないとき',
  },
  {
    id: 'life-weather-049',
    japanese: '路面凍結してるかも',
    english: [
      "roads might be icy",
      "watch out, the roads might be frozen over",
      "be careful driving today, the roads could be icy with how cold it got last night",
      "it got below zero last night. which means the road that looks normal is secretly a death trap. it looks dry. it looks fine. but there's a thin invisible layer of ice that will send your car spinning into the future. black ice is the most dishonest thing in nature. at least snow has the decency to be visible."
    ],
    context: "「凍結」はfrozen / icyだが、black ice(路面の見えない薄い氷)が英語圏では重要ワード。日本語の「路面凍結」は明示的だが、英語のblack iceは「見えない氷」というニュアンスが怖さを含む。watch out / be carefulで注意喚起。",
    category: 'weather',
    subcategory: 'cold',
    situation: '冬の朝、出かける人に注意するとき',
  },
  {
    id: 'life-weather-050',
    japanese: 'やっと過ごしやすくなった',
    english: [
      "finally comfortable",
      "the weather's finally livable again, thank god",
      "it took months but the weather is finally comfortable enough to enjoy being outside",
      "it's not hot. it's not cold. the humidity is gone. the sun is warm but not aggressive. I can go outside without a strategy. no sunscreen protocol. no umbrella check. no layer calculation. just walk out the door and exist. this is what weather is supposed to be. this feeling lasts about two weeks before the next extreme starts. enjoy it."
    ],
    context: "「過ごしやすい」はcomfortableだが、livableの方が「生存可能」のニュアンスで面白い。日本語の「やすい」は快適さ、英語のlivableは「生きていける」。暑さ寒さを生き延びた後の安堵感を表す語彙力の差。pleasant/mild/niceは弱すぎる。",
    category: 'weather',
    subcategory: 'seasonal-change',
    situation: '猛暑や厳冬が終わって快適になったとき',
  },
];
