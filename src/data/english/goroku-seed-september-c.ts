// 俺語録 2026年9月 その3 — Day 17-21
// 語の選び方と書き方は goroku-seed-september.ts の頭を参照。

import type { GorokuSeed } from './goroku-seed';

export const GOROKU_SEP_C: GorokuSeed[] = [
    // ── Day 17 ── 金・値段・損得
    { daySlot: 17, japanese: '高くついた', english: [
        "it ended up costing a lot",
        "it ended up costing way more than I planned",
        "it ended up costing more than just buying the good one",
        "it ended up costing more than buying the good one would have. I saved money at the start and then paid it back with interest over six months."
    ], context: "「高くつく」は結果として高くなること。英語はend up costingで、end upという着地の句動詞が要る。日本語は「つく」一語で結果を出せるが、英語は結果を表す動詞を別に立てる。", category: 'reaction', month: '2026-09' },
    { daySlot: 17, japanese: '元が取れない', english: [
        "I won't get my money back",
        "I'm never getting that money back",
        "I'll never make that money back, not at this rate",
        "I'll never make that money back. and I knew that going in, I just told myself a story where I used it every week."
    ], context: "「元を取る」は元手を回収すること。英語はmake back(作り戻す)かget back。日本語は元という起点の名詞、英語は戻すという動作。回収を、地点で言うか動きで言うか。", category: 'reaction', month: '2026-09' },
    { daySlot: 17, japanese: '安物買いの銭失い', english: [
        "you get what you pay for",
        "well, you get what you pay for",
        "you get what you pay for, I should have known",
        "you get what you pay for. I have learned this exact lesson four separate times and each time I was sure this one was different."
    ], context: "諺の対応。日本語は買う人の失敗を描き、英語はyou get what you pay forと交換の等価を言う。日本語は行為の物語、英語は原理の宣言。同じ教訓を、失敗談と法則で別々に言葉にしている。", category: 'opinion', month: '2026-09' },
    { daySlot: 17, japanese: '出費がかさむ', english: [
        "the costs keep adding up",
        "the costs really keep adding up",
        "it's not one big thing, the small costs keep adding up",
        "it's not one big thing. it's forty small things, and every one of them individually was completely reasonable."
    ], literal: 'add up = 足し上がる(積み重なる)', context: "「かさむ」は嵩が増す、英語のadd upは足し算。日本語は体積、英語は算術。増えることを、量で言うか計算で言うか。日本語の擬態的な動詞は英語では句動詞になることが多い。", category: 'reaction', month: '2026-09' },
    { daySlot: 17, japanese: '懐が寒い', english: [
        "money's tight",
        "money's pretty tight right now",
        "money's tight this month, let's do something cheap",
        "money's tight this month. not emergency tight. just the kind where I look at the total before I get to the register."
    ], context: "「懐が寒い」は温度、英語のtightは締まり具合。日本語は寒さで金欠を言い、英語は余裕の無さを幅で言う。同じ状態を、体感温度と物理的な余白で別々に表す。", category: 'reaction', month: '2026-09' },
    { daySlot: 17, japanese: '割り勘でいい？', english: [
        "should we split it",
        "should we just split it",
        "should we just split it down the middle?",
        "should we just split it. I had one more drink than you, you had the appetizer, and I refuse to do the arithmetic on that."
    ], context: "「割り勘」は割って勘定する。英語はsplitで割るだけ。日本語は割ると勘定の二語を合わせた名詞を持ち、英語は動詞ひとつ。名詞にできるかどうかで、会話での使い方が変わる。", category: 'request', month: '2026-09' },
    { daySlot: 17, japanese: 'もったいない', english: [
        "that's such a waste",
        "honestly, that's such a waste",
        "that's such a waste, it's barely been used",
        "that's such a waste. it works. there's nothing wrong with it. it's just not the newest one anymore and apparently that's enough."
    ], context: "「もったいない」は英語に無い。wasteは無駄、a shameは残念。日本語のもったいないは物への申し訳なさを含むが、英語のwasteにその感情は無い。だから海外でMOTTAINAIがそのまま使われた。", category: 'reaction', month: '2026-09' },
    { daySlot: 17, japanese: '値段の割にいい', english: [
        "good for the price",
        "it's really good for the price",
        "it's good for the price, I wouldn't pay double",
        "it's good for the price. that's the whole review. remove the price and it becomes an average thing, which is fine, because the price is not removable."
    ], context: "「割に」は比率の語。英語はforという前置詞ひとつで比較を作る。good for the priceのforは「〜にしては」で、日本語の「割に」と機能が同じ。前置詞が比率を担うのが英語。", category: 'opinion', month: '2026-09' },
    { daySlot: 17, japanese: 'ぼったくりだ', english: [
        "that's a rip-off",
        "that is a complete rip-off",
        "that's a rip-off, don't pay that",
        "that's a rip-off. and the annoying part is they know it's a rip-off, and they know you know, and they're counting on you not wanting to make a scene."
    ], literal: 'rip off = 引きちぎる(ぼる)', context: "「ぼったくり」はrip-off。英語は引き剥がすという暴力の比喩、日本語の「ぼる」は掠め取る。どちらも暴力的だが、英語は破る、日本語は奪う。奪い方の動作が違う。", category: 'opinion', month: '2026-09' },
    { daySlot: 17, japanese: 'ケチらないほうがいい', english: [
        "don't cheap out on it",
        "seriously, don't cheap out on it",
        "don't cheap out on that part, it's the part that fails",
        "don't cheap out on that part. everything else you can replace later. that one is buried behind three other things and you will never want to touch it again."
    ], literal: 'cheap out = 安く済ませる(ケチる)', context: "「ケチる」はcheap out。英語はcheapという形容詞を動詞にしてoutを付ける。日本語の「ケチ」は名詞から動詞化。どちらも品詞をまたぐが、英語は句動詞、日本語は活用で処理する。", category: 'suggestion', month: '2026-09' },

    // ── Day 18 ── 見る・聞く・言うの周辺
    { daySlot: 18, japanese: '見て見ぬふり', english: [
        "everyone looked the other way",
        "everyone just looked the other way",
        "everyone knew and everyone looked the other way",
        "everyone knew and everyone looked the other way. nobody lied. that's the part that makes it work, technically nobody did anything at all."
    ], literal: 'look the other way = 別の方を見る(見逃す)', context: "「見て見ぬふり」は見たのに見ないふりをする。英語はlook the other wayと視線を逸らす動作。日本語はふりという演技、英語は方向転換。同じ黙認を、演技と身体の向きで別々に言う。", category: 'opinion', month: '2026-09' },
    { daySlot: 18, japanese: '聞いてない', english: [
        "nobody told me",
        "nobody told me any of this",
        "nobody told me, I found out from the group chat",
        "nobody told me. I found out from the group chat, which means the decision, the discussion, and the announcement all happened somewhere I wasn't."
    ], context: "「聞いてない」は自分が主語。英語はnobody told meと、伝えなかった側を主語にする。日本語は受け取れなかったことを自分側で言い、英語は誰かが伝えなかったと責任を外に置く。", category: 'reaction', month: '2026-09' },
    { daySlot: 18, japanese: '言われてみれば', english: [
        "now that you mention it",
        "actually, now that you mention it",
        "now that you mention it, that does seem strange",
        "now that you mention it, that does seem strange. I looked at it four times this week and it never once registered."
    ], context: "「言われてみれば」は受身と条件が重なった型。英語はnow that you mention itと、時と行為で言う。日本語は「言われる」という受身で相手を消せるが、英語はyouと必ず名指しする。", category: 'reaction', month: '2026-09' },
    { daySlot: 18, japanese: '口が滑った', english: [
        "it slipped out",
        "sorry, it just slipped out",
        "it slipped out, I wasn't supposed to say that",
        "it slipped out. I wasn't supposed to say that, I knew I wasn't supposed to say that, and there is apparently a gap between knowing and not saying."
    ], literal: 'slip out = するっと出る', context: "「口が滑る」は口が主語、英語のit slipped outは言葉が主語。日本語は器官が滑り、英語は内容が滑り出る。どちらも滑るという同じ動詞だが、滑る主体が違う。", category: 'reaction', month: '2026-09' },
    { daySlot: 18, japanese: '話を盛ってる', english: [
        "they're exaggerating",
        "they're definitely exaggerating",
        "they're exaggerating, it wasn't nearly that bad",
        "they're exaggerating. I was there. the story is about eighty percent accurate and the twenty percent that isn't happens to be the part that makes it a story."
    ], context: "「盛る」は積み上げる動作。英語のexaggerateはラテン語で「積み上げる」が語源なので、実は発想が同じ。ただし英語では語源が見えなくなっていて、日本語は今も動作として生きている。", category: 'opinion', month: '2026-09' },
    { daySlot: 18, japanese: '話半分に聞く', english: [
        "take it with a grain of salt",
        "I'd take that with a grain of salt",
        "take it with a grain of salt, they always talk big",
        "take it with a grain of salt. not because they lie, but because their version of a short delay and my version of a short delay have never once matched."
    ], literal: 'a grain of salt = 一粒の塩(割り引いて聞く)', context: "「話半分」は量を半分にする。英語は塩を一粒足す。日本語は情報を減らし、英語は調味料を足す。同じ「割り引いて聞く」を、減算と加算で正反対に表している。", category: 'suggestion', month: '2026-09' },
    { daySlot: 18, japanese: '言い訳に聞こえる', english: [
        "that sounds like an excuse",
        "honestly that sounds like an excuse",
        "I know it's true, it still sounds like an excuse",
        "I know it's true and it still sounds like an excuse. that's the problem with real reasons, they're indistinguishable from the fake ones from the outside."
    ], context: "「聞こえる」はsound like。日本語は聞くという受け取り側の動詞、英語はsoundという音が出す側の動詞。日本語は自分に届く音、英語は物が発する音。方向が逆。", category: 'opinion', month: '2026-09' },
    { daySlot: 18, japanese: '棚に上げる', english: [
        "they're ignoring their own part in it",
        "he's completely ignoring his own part in it",
        "he's ignoring his own part in it and lecturing everyone else",
        "he's ignoring his own part in it. and he's not being dishonest, I don't think he can see it, which is somehow worse than if he could."
    ], context: "「棚に上げる」は物を高い場所に置いて見えなくする。英語に対応の慣用句が無く、ignore one's own partと説明になる。日本語は自分の非を物として棚に置けるが、英語は行為の説明にほどける。", category: 'opinion', month: '2026-09' },
    { daySlot: 18, japanese: '話を戻すと', english: [
        "anyway, back to what we were saying",
        "anyway, back to the point",
        "anyway, getting back to what we were talking about",
        "anyway, back to the point. we've been off it for ten minutes and the ten minutes were more fun, but the point is still sitting there."
    ], context: "「話を戻す」は話が主語で戻す他動詞。英語はback toと前置詞句で方向だけを言う。日本語は話という対象を動かし、英語は自分が戻る。誰が移動するかで発想が分かれる。", category: 'suggestion', month: '2026-09' },
    { daySlot: 18, japanese: '言うだけ無駄', english: [
        "there's no point saying it",
        "there's honestly no point saying it",
        "there's no point saying anything, nothing changes",
        "there's no point saying anything. I've said it twice. the response both times was agreement followed by nothing, and I've decided to stop paying for the agreement."
    ], context: "「〜だけ無駄」は行為の空しさを言う型。英語はthere's no point ~ingで、pointという要点の名詞を使う。日本語は無駄という結果、英語は意義の不在。空しさを、成果と意味で別々に言う。", category: 'opinion', month: '2026-09' },

    // ── Day 19 ── 家・生活・片付け
    { daySlot: 19, japanese: '片付かない', english: [
        "it never stays tidy",
        "the place never stays tidy",
        "I clean it and two days later it's back",
        "I clean it and two days later it's back. I've started to think the mess is the natural state and clean is the temporary condition I keep paying for."
    ], context: "「片付く」は自動詞で、物が勝手に片付く形が言える。英語はtidy upと人が主語の他動詞になる。日本語は物が自分で収まり、英語は人が収める。自動詞の豊富さが日本語の特徴。", category: 'reaction', month: '2026-09' },
    { daySlot: 19, japanese: '物が多すぎる', english: [
        "I have too much stuff",
        "I honestly have way too much stuff",
        "I have too much stuff and I don't use most of it",
        "I have too much stuff. and I don't use most of it, and I know which ones I don't use, and I still can't throw them out."
    ], context: "「物」はstuffが一番近い。thingsは数えられる個体、stuffは塊。日本語の「物」は両方を含む。英語は可算と不可算で世界を割るので、日本語話者はここで毎回選択を迫られる。", category: 'reaction', month: '2026-09' },
    { daySlot: 19, japanese: '掃除がはかどらない', english: [
        "cleaning is going slowly",
        "the cleaning is going really slowly",
        "I keep finding things and stopping to look at them",
        "I keep finding things and stopping to look at them. two hours in, one drawer is done and I have read four old letters."
    ], context: "「はかどる」は進捗が良いこと。英語に一語で無く、going wellやmaking progressになる。日本語は捗るという専用の動詞を持つが、英語は進むという一般動詞に副詞を足す。", category: 'reaction', month: '2026-09' },
    { daySlot: 19, japanese: '置きっぱなし', english: [
        "you left it out",
        "you left it out again",
        "you left it out again, it's been there three days",
        "you left it out again. and I'm not going to move it, because the last four times I moved it you couldn't find it and that became my problem too."
    ], context: "「〜っぱなし」は放置の状態を作る接尾辞。英語はleave outという句動詞で、outが「しまわれていない」を担う。日本語は動詞に付ける形式、英語は句動詞。放置を語尾で言うか、方向で言うか。", category: 'shutdown', month: '2026-09' },
    { daySlot: 19, japanese: '捨てるに捨てられない', english: [
        "I can't bring myself to throw it out",
        "I just can't bring myself to throw it out",
        "I can't bring myself to throw it out even though I never use it",
        "I can't bring myself to throw it out. I don't use it, I won't use it, and the moment it's in the bin it becomes the thing I needed."
    ], context: "「〜に〜られない」は同じ動詞を重ねて葛藤を作る型。英語はcan't bring myself toと、自分を連れて行けないという分裂の言い方。日本語は動詞の反復、英語は自分の二重化。葛藤の作り方が違う。", category: 'reaction', month: '2026-09' },
    { daySlot: 19, japanese: '生活感がある', english: [
        "it looks lived in",
        "the place looks properly lived in",
        "it looks lived in, in a good way",
        "it looks lived in, in a good way. nothing is staged. you can tell where people actually sit."
    ], literal: 'lived in = 住まれている(生活感がある)', context: "「生活感」は英語に名詞が無い。lived inという過去分詞で状態にする。日本語は感という抽象名詞を作れるので、生活感・季節感・安定感と量産できる。英語は毎回形容詞句に開く。", category: 'opinion', month: '2026-09' },
    { daySlot: 19, japanese: '洗濯物が溜まってる', english: [
        "the laundry's piling up",
        "the laundry is really piling up",
        "the laundry's piling up and I keep ignoring it",
        "the laundry's piling up. it's at the stage where doing it is a whole afternoon, which is exactly why it got to this stage."
    ], literal: 'pile up = 積み上がる', context: "「溜まる」は液体が溜まるイメージ、英語のpile upは固体が積み上がる。日本語は水、英語は山。溜まるものが液体か固体かで、比喩の元が分かれている。", category: 'reaction', month: '2026-09' },
    { daySlot: 19, japanese: '模様替えしたい', english: [
        "I want to rearrange the room",
        "I really want to rearrange the room",
        "I want to move everything around, I'm sick of this layout",
        "I want to move everything around. nothing's wrong with it. I've just looked at it from the same angle for two years and I want a different one."
    ], context: "「模様替え」は模様を替えると書くが、実際は配置の変更。英語はrearrange(並べ替える)で位置の語。日本語は見た目、英語は配置。同じ行為を、印象と物理で別々に名付けている。", category: 'opinion', month: '2026-09' },
    { daySlot: 19, japanese: '寝落ちした', english: [
        "I fell asleep",
        "I fell asleep with it still on",
        "I fell asleep halfway through and woke up at four",
        "I fell asleep halfway through and woke up at four with the screen still going and no memory of the last forty minutes."
    ], context: "「寝落ち」は落ちるという垂直の動き。英語のfall asleepも落ちる。ここは珍しく発想が一致する。ただし英語はfall + 形容詞という型で、日本語は寝る + 落ちるという動詞の複合。組み立て方が違う。", category: 'reaction', month: '2026-09' },
    { daySlot: 19, japanese: '目が覚めた', english: [
        "I woke up",
        "I woke up way too early",
        "I woke up at four and never got back to sleep",
        "I woke up at four and never got back to sleep. nothing was wrong. my brain simply decided that four was the new morning."
    ], context: "「目が覚める」は目が主語。英語はI woke upで人が主語。日本語は部位が勝手に働き、英語は人が動作する。腹が立つ・気が済む・目が覚めると同じ構造で、日本語は身体を主語にできる。", category: 'reaction', month: '2026-09' },

    // ── Day 20 ── 天気・季節・体感
    { daySlot: 20, japanese: '涼しくなってきた', english: [
        "it's getting cooler",
        "it's finally getting cooler",
        "it's finally starting to cool off in the evenings",
        "it's finally starting to cool off in the evenings. still hot at noon, but you can walk home now without planning a route around the shade."
    ], context: "「〜てきた」は変化が自分に向かってくる型。英語はgetting + 比較級で、変化そのものを言う。日本語は変化の到来を、英語は状態の推移を言う。だからcoming coolerとは言えない。", category: 'reaction', month: '2026-09' },
    { daySlot: 20, japanese: '蒸し暑い', english: [
        "it's muggy",
        "it's so muggy out",
        "it's muggy, the kind where you shower and immediately need another one",
        "it's muggy. the kind where you shower and immediately need another one, and where sitting still is somehow more work than walking."
    ], context: "「蒸し暑い」は蒸すという調理の動詞。英語のmuggyは語源不明の専用語。日本語は熱と水の状態を動詞で説明し、英語は専用の形容詞を持つ。専用語がある英語と、複合で作る日本語。", category: 'reaction', month: '2026-09' },
    { daySlot: 20, japanese: '肌寒い', english: [
        "it's a bit chilly",
        "it's a little chilly out",
        "it's chilly enough that I want a jacket but not enough to wear one",
        "it's chilly enough that I want a jacket but not enough to actually wear one, so I'm carrying it, which is the worst of both."
    ], context: "「肌寒い」は肌という部位で寒さの程度を言う。英語のchillyは寒さそのものの弱い版。日本語は身体のどこで感じるかを語に入れ、英語は温度の目盛りで言う。身体か温度か。", category: 'reaction', month: '2026-09' },
    { daySlot: 20, japanese: '日が短くなった', english: [
        "the days are getting shorter",
        "the days are getting noticeably shorter",
        "the days are getting shorter, it's dark before I leave work",
        "the days are getting shorter. it's dark before I leave work now, and that single fact rearranges the entire feeling of the evening."
    ], context: "「日」は太陽と一日の両方。英語はdayも同じく両義だが、この文脈ではdaysと複数にして日々を言う。日本語は単数複数を区別しないので、英語にするとき必ずどちらかを選ぶ必要がある。", category: 'reaction', month: '2026-09' },
    { daySlot: 20, japanese: '雨が降りそう', english: [
        "looks like rain",
        "it really looks like rain",
        "it looks like rain, you should take an umbrella",
        "it looks like rain. take the umbrella. the version of today where you carry it for nothing is much better than the other one."
    ], context: "「〜そう」は見た目からの推量。英語はlooks likeで視覚を明示する。日本語の「そう」は視覚に限らず、聞いた話にも使える。だから伝聞の「そうだ」と混同されやすい。英語は視覚と伝聞を必ず分ける。", category: 'opinion', month: '2026-09' },
    { daySlot: 20, japanese: '傘持ってく', english: [
        "I'll take an umbrella",
        "I'll just take an umbrella",
        "I'll take one just in case, it's not heavy",
        "I'll take one just in case. carrying it all day is annoying, and standing under an awning for twenty minutes is worse."
    ], context: "「持ってく」は持って行くの縮約。英語のtakeは一語で持って行くを担う。日本語は持つと行くの二動詞を繋げ、英語はtakeとbringを方向で使い分ける。動詞の合成か、方向による選択か。", category: 'reaction', month: '2026-09' },
    { daySlot: 20, japanese: '汗が引かない', english: [
        "I can't stop sweating",
        "I seriously can't stop sweating",
        "I've been sitting still for ten minutes and I'm still sweating",
        "I've been sitting still for ten minutes and I'm still sweating. the sweating has become independent of anything I'm doing."
    ], context: "「引く」は潮が引くの引く。英語はstopで停止の動詞。日本語は水が退く比喩、英語は動作の終了。汗の収まりを、潮汐と停止で別々に言う。", category: 'reaction', month: '2026-09' },
    { daySlot: 20, japanese: '風が気持ちいい', english: [
        "the breeze feels good",
        "the breeze feels really good",
        "the breeze feels good, first time in weeks",
        "the breeze feels good. first time in weeks that being outside is something other than a thing to get through."
    ], context: "「風」はwindとbreezeに割れる。windは強い風、breezeはそよ風。日本語は強さを形容詞で足すが、英語は語そのものが強さを持つ。名詞に程度が埋まっているのが英語。", category: 'reaction', month: '2026-09' },
    { daySlot: 20, japanese: '季節の変わり目', english: [
        "the change of seasons",
        "it's the change of seasons",
        "it's the change of seasons, everyone's getting sick",
        "it's the change of seasons. everyone's getting sick, everyone's tired, and everyone is pretending that this year it won't happen to them."
    ], context: "「変わり目」は変化の境目を名詞にした語。英語はchange of seasonsと、変化を名詞にして所有格で繋ぐ。日本語は目という視覚の語で境界を作り、英語は変化そのものを名詞にする。", category: 'opinion', month: '2026-09' },
    { daySlot: 20, japanese: '体がだるい', english: [
        "I feel sluggish",
        "I feel really sluggish today",
        "I feel sluggish, like everything takes twice the effort",
        "I feel sluggish. nothing hurts, nothing is wrong, everything just takes about twice the effort it should."
    ], context: "「だるい」は英語に一語で無い。sluggishは動きが鈍い、lethargicは無気力、heavyは重い。日本語の「だるい」は身体の重さと気力の無さを同時に持つ。英語は身体か気力かを選ぶ。", category: 'reaction', month: '2026-09' },

    // ── Day 21 ── 食べる・飲む・店
    { daySlot: 21, japanese: 'お腹すいた', english: [
        "I'm hungry",
        "I'm getting pretty hungry",
        "I'm hungry, can we eat before the next thing?",
        "I'm hungry. and I'm at the stage where I'm going to start having opinions about things that don't deserve opinions, so let's eat first."
    ], context: "「お腹すいた」は腹が空くという容器の比喩。英語のhungryは形容詞で、身体の状態を直接言う。日本語は器官の状態、英語は人の状態。しかも日本語は過去形で今を言うのが難しい点。", category: 'reaction', month: '2026-09' },
    { daySlot: 21, japanese: '飲みすぎた', english: [
        "I had too much",
        "I definitely had too much",
        "I had too much last night and I felt it all morning",
        "I had too much last night. I knew it at the time, there was a specific drink where I thought this is the one I'll regret, and I was right."
    ], context: "「〜すぎる」は超過の動詞。英語はtoo muchと副詞句。日本語は動詞に付けて活用させ、英語は量の副詞で言う。過剰を動詞にできるのが日本語で、英語は量として外に出す。", category: 'reaction', month: '2026-09' },
    { daySlot: 21, japanese: '味が濃い', english: [
        "it's really rich",
        "it's a bit too rich for me",
        "it's rich, good, but I couldn't eat a whole plate",
        "it's rich. good rich, not bad rich. but three bites in you understand why the portion is that size."
    ], context: "「濃い」は密度の語。英語はrich(豊か)かstrong(強い)、saltyなら塩味。日本語は濃いで味の強さ全般を言えるが、英語は何が強いかを名指す。味の記述が、密度か成分かで分かれる。", category: 'opinion', month: '2026-09' },
    { daySlot: 21, japanese: 'あっさりしてる', english: [
        "it's light",
        "it's nice and light",
        "it's light, you could eat it every day",
        "it's light. and that's the whole appeal, it doesn't sit on you afterward, you can eat it and then still do something with your afternoon."
    ], context: "「あっさり」は擬態語。英語はlight(軽い)かmild(穏やか)。日本語のオノマトペは味だけでなく性格や別れ方にも使えるが、英語は分野ごとに別語。擬態語の守備範囲の広さが訳を難しくする。", category: 'opinion', month: '2026-09' },
    { daySlot: 21, japanese: '食べきれない', english: [
        "I can't finish it",
        "I definitely can't finish this",
        "I can't finish it, the portion is enormous",
        "I can't finish it. and I hate leaving food, so I'm going to sit here for another ten minutes pretending I might."
    ], context: "「〜きれない」は完遂の否定。英語はcan't finishで、finishが完遂を担う。日本語は動詞に切るを付けて完遂の意味を作るが、英語はfinishやthroughで言う。複合動詞と単一動詞の差。", category: 'reaction', month: '2026-09' },
    { daySlot: 21, japanese: '混んでる', english: [
        "it's packed",
        "it's absolutely packed",
        "it's packed, there's a line out the door",
        "it's packed. there's a line out the door and the line isn't moving, which means the packed part is happening inside too."
    ], context: "「混む」は混ざるが語源で、人が入り混じる状態。英語のpackedは詰め込まれた状態で、荷造りの語。日本語は混合、英語は圧縮。同じ混雑を、混ざりと詰め込みで別々に言う。", category: 'reaction', month: '2026-09' },
    { daySlot: 21, japanese: '並ぶのは嫌だ', english: [
        "I'm not waiting in line",
        "I'm really not waiting in line for that",
        "I'm not waiting forty minutes for food, any food",
        "I'm not waiting forty minutes for food. it could be the best thing I've ever eaten and I would still be doing arithmetic about the forty minutes."
    ], context: "「並ぶ」は横に並ぶ動作、英語はwait in lineで待つのが主動詞。日本語は列を作る行為、英語は待つ行為。同じことを、身体の配置と時間の消費で別々に言う。lineという名詞が要るのが英語。", category: 'opinion', month: '2026-09' },
    { daySlot: 21, japanese: 'お会計お願いします', english: [
        "could we get the check",
        "could we get the check when you have a second",
        "could we get the check whenever you get a chance?",
        "could we get the check whenever you get a chance. no rush, we're not in a hurry, I just want to start the process because it takes a while."
    ], context: "「お願いします」は依頼の万能語。英語は場面ごとにcould we get / could you / would you mindと構文が変わる。日本語は名詞にお願いしますを付けるだけで済むが、英語は毎回文を組む。", category: 'request', month: '2026-09' },
    { daySlot: 21, japanese: 'また来たい', english: [
        "I'd come back",
        "I'd definitely come back",
        "I'd come back, that was genuinely good",
        "I'd come back. and I say that about maybe one in ten places, and I actually go back to maybe one in ten of those, so take it for what it is."
    ], context: "「また」はagainだが、位置が違う。日本語は文頭、英語は文末のcome back againか、backだけで済む。backに再訪の意味が入っているので、againを足すと重複になる。小語の重複は日本人の頻出ミス。", category: 'opinion', month: '2026-09' },
    { daySlot: 21, japanese: '奢るよ', english: [
        "I've got this",
        "don't worry, I've got this",
        "I've got this one, you can get the next one",
        "I've got this one. you can get the next one, and there will be a next one, which is the actual point of saying it this way."
    ], literal: "I've got this = これは自分が持つ(奢る)", context: "「奢る」はtreatかI've got this。英語のgotは掴むが原義で、支払いを引き受ける比喩。日本語の「奢る」は驕るが語源で、豪勢に振る舞う意味。負担を持つ英語と、豪勢さを出す日本語。", category: 'suggestion', month: '2026-09' },
];
