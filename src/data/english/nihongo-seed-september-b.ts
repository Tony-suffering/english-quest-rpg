// 日本語から学ぶ 2026年9月 その2 — Day 11-20
// 選び方と書き方は nihongo-seed-september.ts の頭を参照。

import type { NihongoEntry } from './nihongo-seed';

export const NIHONGO_SEP_B: NihongoEntry[] = [
    // ── Day 11 ── 動物
    { daySlot: 11, japanese: '猫の手も借りたい', english: "We're so short-handed I'd take literally anyone right now.", context: "猫の手も借りたい＝人手が足りず何でもいいから助けが欲しいこと。英語に対応の慣用句が無く、short-handedと手の不足で言う。日本語は役に立たない猫の手まで挙げる誇張、英語は単純な人手不足。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '馬が合う', english: "We just hit it off right away, I don't know why.", literal: 'hit it off = 打てば響く(意気投合する)', context: "馬が合う＝相性がいいこと。日本語は乗馬で人と馬の呼吸が合う比喩、英語はhit it offと打撃の反応。相性を、乗馬と打音で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '虫がいい', english: "That's a bit rich, coming from him.", context: "虫がいい＝自分に都合がよすぎること。英語はa bit richと富の比喩で皮肉る。日本語は体内の虫という古い医学観、英語は過剰な豊かさ。厚かましさを、寄生虫と贅沢で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '蛇の道は蛇', english: "It takes one to know one.", literal: 'it takes one to know one = 同類だから分かる', context: "蛇の道は蛇＝同類のことは同類が一番よく知る。英語も同類性で言うが、英語は人間、日本語は蛇という具体的な生物。専門性を、動物と同一性で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '鶴の一声', english: "The boss said one word and that was the end of the discussion.", context: "鶴の一声＝権威者の一言で決まること。英語に対応の慣用句が無く、状況を説明する。日本語は鶴という高貴な鳥の鳴き声、英語は役職と発話数。権威を、生物と組織で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '犬猿の仲', english: "Those two have been at each other's throats for years.", literal: "at each other's throats = 互いの喉に噛みつく", context: "犬猿の仲＝仲が非常に悪いこと。日本語は犬と猿という動物の組み合わせ、英語は喉に噛みつく攻撃描写。敵対を、動物種と身体攻撃で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '狐につままれる', english: "I honestly don't know what just happened.", context: "狐につままれる＝訳が分からず呆然とすること。日本語は狐に化かされる民話が語源で、英語に対応の慣用句が無い。困惑を、妖怪と単純な無知で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '雀の巣', english: "His hair looks like he just rolled out of bed.", context: "雀の巣＝乱れた髪。英語はrolled out of bedとベッドから転がり出た比喩で、日本語は鳥の巣という構造物。乱れを、巣と寝起きで表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '烏の行水', english: "He was in and out of the shower in about ninety seconds.", context: "烏の行水＝入浴が極端に短いこと。日本語は烏の水浴びという観察、英語は時間で言う。短さを、生物の行動と秒数で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 11, japanese: '虎の子', english: "That's my rainy day money, I'm not touching it.", literal: 'rainy day money = 雨の日のための金', context: "虎の子＝大切に取っておくもの。日本語は虎が子を守る様子、英語は雨の日という将来の困難。備蓄を、母性と天候で表す違い。", category: 'nature', month: '2026-09' },

    // ── Day 12 ── 仕事の慣用句
    { daySlot: 12, japanese: '骨が折れる', english: "That job was a real slog, took me all weekend.", literal: 'a slog = 泥の中を進むような重労働', context: "骨が折れる＝非常に苦労すること。日本語は骨の破損、英語は泥中の行進。労苦を、骨折と歩行で表す違い。どちらも身体の限界を使う。", category: 'body', month: '2026-09' },
    { daySlot: 12, japanese: '油断も隙もない', english: "You can't take your eyes off him for a second.", context: "油断も隙もない＝一瞬も気を抜けないこと。英語は視線を外せないと目で言い、日本語は油断と隙という二語の重ね。警戒を、視覚と防御で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 12, japanese: '根回しする', english: "I'll sound a few people out before the meeting.", literal: 'sound out = 打診する', context: "根回し＝事前に関係者の了解を取ること。日本語は樹木の移植で根を整える園芸の語、英語は音で探るsound out。事前調整を、植樹と音波で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 12, japanese: '肩書きだけ', english: "The title doesn't mean anything, he doesn't decide anything.", context: "肩書き＝地位の名称。英語はtitleで一致するが、日本語は肩に書くという身体の比喩が語に残っている。地位を、身体の表示と称号で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 12, japanese: '腕を上げる', english: "You've gotten a lot better at this, seriously.", context: "腕を上げる＝技量が向上すること。日本語は腕という部位を上げる、英語はgotten betterと質の向上。上達を、身体と品質で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 12, japanese: '首を切られる', english: "He got laid off last month.", literal: 'lay off = 一時解雇する', context: "首を切る＝解雇すること。日本語は斬首という物騒な比喩、英語はlay offと横に置く。解雇を、処刑と配置で表す違い。日本語のほうが暴力的な語源。", category: 'body', month: '2026-09' },
    { daySlot: 12, japanese: '畑違い', english: "That's not really my area, you'd want to ask someone else.", context: "畑違い＝専門が異なること。日本語は農地の区画、英語はareaと領域。専門性を、農業と地理で表す違い。どちらも土地の比喩なのが面白い。", category: 'life', month: '2026-09' },
    { daySlot: 12, japanese: '看板に偽りあり', english: "It doesn't do what it says on the tin.", literal: 'what it says on the tin = 缶の表示どおり', context: "看板に偽りあり＝宣伝と中身が違うこと。英語は缶詰のラベル、日本語は店の看板。誇大広告を、商品と店舗で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 12, japanese: '尻拭いをする', english: "I'm the one who has to clean up his mess, as usual.", literal: 'clean up someone\'s mess = 散らかしを片付ける', context: "尻拭い＝他人の失敗の後始末。日本語は排泄の後始末という直接的な身体語、英語はmessと散らかり。責任を、身体と散乱で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 12, japanese: '腕によりをかける', english: "I'm going to pull out all the stops for this one.", literal: 'pull out all the stops = オルガンの音栓を全部引く', context: "腕によりをかける＝全力で技を尽くすこと。英語はパイプオルガンの音栓を全開にする比喩、日本語は糸によりをかける紡績。全力を、楽器と織物で表す違い。", category: 'action', month: '2026-09' },

    // ── Day 13 ── 人間関係
    { daySlot: 13, japanese: '虫の知らせ', english: "I had this weird feeling something was wrong.", context: "虫の知らせ＝予感。日本語は体内の虫が告げるという古い身体観、英語はa weird feelingと単なる感覚。予感を、内なる他者と感覚で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 13, japanese: '顔が広い', english: "He knows absolutely everyone in this industry.", context: "顔が広い＝交友関係が広いこと。日本語は顔の面積、英語はknows everyoneと知人の数。人脈を、身体の広さと人数で表す違い。well-connectedだと配線の比喩になる。", category: 'body', month: '2026-09' },
    { daySlot: 13, japanese: '水臭い', english: "You didn't have to be so formal about it, just ask me.", context: "水臭い＝親しいのに他人行儀なこと。日本語は水で薄めた味の比喩、英語はformalと形式。よそよそしさを、濃度と作法で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 13, japanese: '虫が好かない', english: "I can't put my finger on why, but I just don't like the guy.", literal: 'put one\'s finger on = 指で特定する', context: "虫が好かない＝理由なく嫌なこと。日本語は体内の虫が拒否する、英語は指で場所を特定できない。不快の理由不明を、内臓と触覚で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 13, japanese: '肩を持つ', english: "Why are you always taking his side?", literal: 'take someone\'s side = 側に付く', context: "肩を持つ＝味方すること。日本語は肩という部位を支える、英語はsideと位置。味方を、身体の支持と空間の配置で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 13, japanese: '間が悪い', english: "Sorry, is this a bad time?", context: "間が悪い＝タイミングが悪いこと。日本語は間という空隙、英語はtimeと時間。悪いタイミングを、空間と時間で表す違い。日本語の間は音楽や芝居の語でもある。", category: 'life', month: '2026-09' },
    { daySlot: 13, japanese: '波長が合わない', english: "We just don't really click, and that's fine.", literal: 'click = カチッと嵌まる', context: "波長が合わない＝相性が悪いこと。日本語は電波の物理、英語は部品の嵌合。相性を、波動と機構で表す違い。どちらも近代の技術から来た比喩。", category: 'emotion', month: '2026-09' },
    { daySlot: 13, japanese: '一目置く', english: "Everyone here has a lot of respect for her.", context: "一目置く＝相手を上位と認めること。囲碁で弱い側が先に一石置くのが語源。英語はrespectと敬意で言う。敬意を、対局のハンデと感情で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 13, japanese: '喧嘩を売る', english: "He was clearly trying to start something.", context: "喧嘩を売る＝争いを仕掛けること。日本語は売買の比喩、英語はstart somethingと開始。挑発を、商取引と着火で表す違い。売る買うで争いを言うのは日本語独特。", category: 'action', month: '2026-09' },
    { daySlot: 13, japanese: '顔をつぶす', english: "That would embarrass him in front of everyone.", context: "顔をつぶす＝面子を失わせること。日本語は顔の物理的な破壊、英語はembarrassと感情。面子を、身体と羞恥で表す違い。save faceは英語に入っているが、潰すほうは入らなかった。", category: 'body', month: '2026-09' },

    // ── Day 14 ── 感情の強度
    { daySlot: 14, japanese: '頭にきた', english: "That really ticked me off.", literal: 'tick off = カチッと怒らせる', context: "頭にくる＝怒りが頭部に上ること。英語はtick offと時計の音で言う。怒りを、上昇と機械音で表す違い。日本語は血が上る身体観が背景にある。", category: 'emotion', month: '2026-09' },
    { daySlot: 14, japanese: 'はらわたが煮えくり返る', english: "I was absolutely seething the whole way home.", literal: 'seethe = 煮え立つ', context: "はらわたが煮えくり返る＝激怒。英語のseetheも煮え立つで、ここは比喩が一致する。日本語は内臓を具体的に出し、英語は状態だけ。同じ沸騰を、部位の有無で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 14, japanese: '呆れて物も言えない', english: "I don't even know where to start with that.", context: "呆れて物も言えない＝あきれて発話できないこと。英語はwhere to startと開始点の不在で言う。絶句を、発話能力と着手点で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 14, japanese: '嬉しくて涙が出る', english: "I actually teared up, which is embarrassing.", literal: 'tear up = 涙ぐむ', context: "涙が出る＝涙が自然に出ること。英語はtear upと自分が主語の句動詞。感涙を、自動詞と他動詞で表す違い。日本語は身体が勝手に反応する構文を持つ。", category: 'emotion', month: '2026-09' },
    { daySlot: 14, japanese: '肝を冷やす', english: "That gave me a real scare.", context: "肝を冷やす＝ひやりとすること。日本語は肝臓の温度低下、英語はscareと恐怖の名詞。驚愕を、内臓と感情で表す違い。日本語は内臓に感情が宿る身体観。", category: 'emotion', month: '2026-09' },
    { daySlot: 14, japanese: '身の毛がよだつ', english: "It gave me goosebumps, and not the good kind.", literal: 'goosebumps = 鳥肌', context: "身の毛がよだつ＝恐怖で毛が逆立つこと。英語はgoosebumpsとガチョウの皮膚。日本語は自分の毛、英語は鳥の皮。同じ生理反応を、自他の身体で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 14, japanese: '胸をなでおろす', english: "That was a huge relief, I can breathe again.", context: "胸をなでおろす＝安心すること。日本語は胸を撫でる動作、英語はreliefと感情の名詞。安堵を、身体動作と感情で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 14, japanese: '穴があったら入りたい', english: "I wanted the floor to swallow me whole.", literal: 'the floor swallows you = 床が飲み込む', context: "穴があったら入りたい＝恥ずかしくて隠れたいこと。日本語は自分が穴に入る能動、英語は床が飲み込む受動。羞恥を、隠遁と嚥下で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 14, japanese: '拍子抜けする', english: "That was kind of anticlimactic, honestly.", literal: 'anticlimactic = 盛り上がりの逆', context: "拍子抜け＝勢いが空振りすること。日本語は音楽の拍子が抜ける、英語は物語の山場の反対。肩透かしを、リズムと構成で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 14, japanese: '身が入らない', english: "My heart's just not in it today.", literal: "one's heart is not in it = 心がそこに無い", context: "身が入らない＝集中できないこと。日本語は身体が対象に入らない、英語は心がそこに無い。没入の欠如を、身体と心で表す違い。入るか在るかの動詞も違う。", category: 'emotion', month: '2026-09' },

    // ── Day 15 ── 道・旅
    { daySlot: 15, japanese: '道草を食う', english: "I got sidetracked on the way and lost an hour.", literal: 'get sidetracked = 側線に入る', context: "道草を食う＝寄り道すること。日本語は馬が道端の草を食べる情景、英語は列車が側線に逸れる鉄道の語。脱線を、家畜と鉄道で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 15, japanese: '回り道になる', english: "It's the long way around, but it's safer.", context: "回り道＝遠回りの経路。英語はthe long way aroundで距離と周回。日本語は回るという動作、英語は長さと周囲。迂回を、旋回と距離で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 15, japanese: '袋小路に入る', english: "We've hit a dead end on this one.", literal: 'a dead end = 死んだ端(行き止まり)', context: "袋小路＝行き止まりの路地。英語はdead endと死の比喩。日本語は袋という容器、英語は生死。行き詰まりを、形状と生命で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 15, japanese: '軌道に乗る', english: "It's finally starting to get off the ground.", literal: 'get off the ground = 地面を離れる', context: "軌道に乗る＝順調に進み始めること。日本語は列車が線路に乗る、英語は飛行機が離陸する。始動を、鉄道と航空で表す違い。時代の乗り物が語に残っている。", category: 'action', month: '2026-09' },
    { daySlot: 15, japanese: '踏み出す', english: "I finally took the plunge and signed up.", literal: 'take the plunge = 飛び込む', context: "踏み出す＝最初の一歩を出すこと。日本語は足の動作、英語は水への飛び込み。着手を、歩行と飛び込みで表す違い。日本語は地上、英語は水中。", category: 'action', month: '2026-09' },
    { daySlot: 15, japanese: '引き返す', english: "We should turn back before it gets dark.", context: "引き返す＝来た道を戻ること。英語はturn backと方向転換。日本語は引くと返すの複合動詞、英語は回転。帰路を、牽引と旋回で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 15, japanese: '腰を上げる', english: "It took him three months to finally get moving on it.", context: "腰を上げる＝ようやく行動を始めること。日本語は座位から立つ身体動作、英語はget movingと運動の開始。着手を、姿勢と移動で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 15, japanese: '足並みをそろえる', english: "We all need to be on the same page before we start.", literal: 'on the same page = 同じページにいる', context: "足並みをそろえる＝行動を統一すること。日本語は行進の歩調、英語は書物の同じページ。統一を、歩行と読書で表す違い。軍隊と印刷の語源。", category: 'action', month: '2026-09' },
    { daySlot: 15, japanese: '通りがいい', english: "That name is a lot easier for people to remember.", context: "通りがいい＝名前などが通用しやすいこと。日本語は道の通過、英語はeasier to rememberと記憶の容易さ。浸透を、通行と記憶で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 15, japanese: '見送る', english: "I went to see her off at the station.", literal: 'see off = 見送る', context: "見送る＝出発する人を送ること。英語のsee offも視覚と離脱でほぼ一致する。ただし日本語の「見送る」は延期や断念の意味も持ち、英語のsee offにはその用法が無い。", category: 'action', month: '2026-09' },

    // ── Day 16 ── 光・色
    { daySlot: 16, japanese: '目が覚めるような青', english: "That blue is absolutely striking.", literal: 'striking = 打つような(目を奪う)', context: "目が覚めるような＝鮮烈なこと。日本語は覚醒、英語は打撃。強い印象を、睡眠からの覚醒と物理的な打撃で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 16, japanese: '色を失う', english: "The blood just drained from his face.", literal: 'blood drains from the face = 顔から血が引く', context: "色を失う＝驚愕で顔面蒼白になること。日本語は色の消失、英語は血液の排出。蒼白を、色彩と体液で表す違い。日本語は視覚、英語は生理。", category: 'body', month: '2026-09' },
    { daySlot: 16, japanese: '色よい返事', english: "I'm still waiting to hear something positive back.", context: "色よい返事＝好意的な返答。日本語は色という視覚語で好意を言う、英語はpositiveと極性。好意を、色彩と符号で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 16, japanese: '一目瞭然', english: "It's obvious the second you look at it.", context: "一目瞭然＝一見して明らかなこと。日本語は四字熟語で目と明瞭を組む、英語はthe second you look atと時間で言う。明白さを、視認と即時性で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 16, japanese: '影が薄い', english: "He kind of fades into the background.", literal: 'fade into the background = 背景に溶ける', context: "影が薄い＝存在感が乏しいこと。日本語は影の濃度、英語は背景への融解。存在感を、影と前景背景で表す違い。どちらも視覚の比喩。", category: 'body', month: '2026-09' },
    { daySlot: 16, japanese: '真っ暗', english: "I'm completely in the dark about all of this.", literal: 'in the dark = 暗闇の中(知らされていない)', context: "真っ暗＝何も分からない状態。英語のin the darkも同じ闇の比喩で、ここは一致する。日本語は状態の描写、英語は位置。無知を、明度と場所で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 16, japanese: '灯台下暗し', english: "Sometimes you can't see what's right under your nose.", literal: 'right under one\'s nose = 鼻のすぐ下', context: "灯台下暗し＝近すぎて気づかないこと。日本語は灯台の真下という光学、英語は鼻の下という身体。盲点を、照明と身体で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 16, japanese: '日の目を見る', english: "The project finally saw the light of day.", literal: 'see the light of day = 日の光を見る', context: "日の目を見る＝ようやく世に出ること。英語もsee the light of dayでほぼ同じ。日本語は日の目、英語は日の光。同じ太陽を、擬人化と物理で言う違い。", category: 'nature', month: '2026-09' },
    { daySlot: 16, japanese: '色眼鏡で見る', english: "You're looking at this with a lot of preconceptions.", context: "色眼鏡＝偏見を通した見方。英語に対応の慣用句が無く、preconceptionsと概念で言う。偏見を、光学器具と観念で表す違い。日本語は道具、英語は思考。", category: 'action', month: '2026-09' },
    { daySlot: 16, japanese: '暗礁に乗り上げる', english: "The whole thing has run aground.", literal: 'run aground = 座礁する', context: "暗礁に乗り上げる＝行き詰まること。英語のrun agroundも座礁で、比喩が一致する。海運が両言語の語彙に同じ絵を残した例。", category: 'nature', month: '2026-09' },

    // ── Day 17 ── 時間
    { daySlot: 17, japanese: '時間を潰す', english: "I've got two hours to kill before the train.", literal: 'kill time = 時間を殺す', context: "時間を潰す＝空き時間をやり過ごすこと。日本語は潰すという圧壊、英語はkillと殺害。時間の消費を、圧縮と殺害で表す違い。どちらも時間を物として扱う。", category: 'action', month: '2026-09' },
    { daySlot: 17, japanese: 'あっという間', english: "The whole weekend just flew by.", literal: 'fly by = 飛び去る', context: "あっという間＝時間が非常に短く感じること。日本語は感嘆詞を言う長さ、英語は飛行。速さを、発話時間と飛翔で表す違い。日本語は音声の長さを単位にしている。", category: 'life', month: '2026-09' },
    { daySlot: 17, japanese: '間に合わせる', english: "We'll make do with what we've got for now.", literal: 'make do = 有り合わせで済ます', context: "間に合わせ＝当座をしのぐこと。英語はmake doと作ると行うの組み合わせ。日本語は時間の隙間に合わせ、英語は間に合う物を作る。応急を、時間と製作で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 17, japanese: '寝耳に水', english: "That came completely out of the blue.", literal: 'out of the blue = 青空から突然', context: "寝耳に水＝突然の知らせに驚くこと。日本語は寝ている耳に水を注がれる感覚、英語は晴れた空から降ってくる。不意打ちを、身体と天空で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 17, japanese: '善は急げ', english: "There's no time like the present.", context: "善は急げ＝良いことは早くやれ。英語はno time like the presentと時点の比較。日本語は善という価値、英語は現在という時。即行を、道徳と時間で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 17, japanese: '時期尚早', english: "It's too early to call it, honestly.", context: "時期尚早＝まだ早すぎること。日本語は漢語の四字、英語はtoo early to callと判断の早さ。早計を、時期と判定で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 17, japanese: '待ちぼうけ', english: "I got stood up, waited forty minutes.", literal: 'get stood up = すっぽかされる', context: "待ちぼうけ＝待たされて終わること。英語はstand upと立たせるの受動で、約束を破られる意。徒労を、待機と放置で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 17, japanese: '長い目で見る', english: "You have to look at it in the long run.", literal: 'in the long run = 長い走りで', context: "長い目で見る＝長期の視点で判断すること。日本語は目の長さ、英語は走行距離。長期を、視覚と移動で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 17, japanese: '一段落つく', english: "We've reached a good stopping point for today.", context: "一段落＝区切りがつくこと。日本語は文章の段落、英語はstopping pointと停止地点。区切りを、書物と地点で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 17, japanese: '時間の問題', english: "It's only a matter of time at this point.", literal: 'a matter of time = 時間の問題', context: "時間の問題＝いずれ必ず起きること。英語のa matter of timeも全く同じで、これは翻訳を経て両言語に定着した表現。珍しく完全に一致する。", category: 'life', month: '2026-09' },

    // ── Day 18 ── 金
    { daySlot: 18, japanese: '財布のひもが固い', english: "She's really careful with money.", context: "財布のひもが固い＝倹約すること。日本語は巾着の紐という物理、英語はcarefulと性質。倹約を、道具と注意深さで表す違い。tight with moneyだとやや否定的。", category: 'life', month: '2026-09' },
    { daySlot: 18, japanese: '身銭を切る', english: "He paid for it out of his own pocket.", literal: 'out of one\'s own pocket = 自分のポケットから', context: "身銭を切る＝自腹を出すこと。日本語は身と銭を切る、英語はポケットという容器。自費を、身体と衣服で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 18, japanese: '金に糸目をつけない', english: "They spared no expense on this.", literal: 'spare no expense = 出費を惜しまない', context: "糸目をつけない＝金額を気にしないこと。日本語は凧の糸目という制御装置、英語はspareと節約の否定。惜しみなさを、凧と会計で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 18, japanese: '足が出た', english: "We went over budget by a fair bit.", context: "足が出る＝予算超過。日本語は隠れていた足のはみ出し、英語はover budgetと線の越境。超過を、露出と境界で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 18, japanese: '安かろう悪かろう', english: "You get what you pay for.", context: "諺の対応。日本語は安いと悪いを並べる推量の形、英語は支払いと取得の等価。品質と価格の関係を、対句と交換で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 18, japanese: '高嶺の花', english: "That's way out of my league.", literal: 'out of one\'s league = 自分の階級の外', context: "高嶺の花＝手の届かない対象。日本語は山頂の花という高度、英語はleagueというスポーツの階級。到達不能を、標高と序列で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 18, japanese: '元も子もない', english: "Then the whole thing was for nothing.", context: "元も子もない＝元本も利息も失うこと。日本語は金融の元金と利子、英語はfor nothingと無。全損を、会計と虚無で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 18, japanese: '棒に振る', english: "He threw away a really good opportunity.", literal: 'throw away = 投げ捨てる', context: "棒に振る＝価値あるものを無駄にすること。日本語は棒を振る動作が語源とされ、英語はthrow awayと投棄。浪費を、振動と投擲で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 18, japanese: '出費がかさむ', english: "The costs really start to add up.", literal: 'add up = 足し上がる', context: "かさむ＝嵩が増すこと。英語はadd upと加算。増加を、体積と算術で表す違い。日本語は物理量、英語は計算。", category: 'life', month: '2026-09' },
    { daySlot: 18, japanese: '懐が痛む', english: "That's going to hurt, financially.", context: "懐が痛む＝出費が苦しいこと。日本語は懐という身体の部位が痛む、英語はhurtで同じく痛みだが部位は無い。出費の苦痛を、身体と抽象で表す違い。", category: 'body', month: '2026-09' },

    // ── Day 19 ── 失敗
    { daySlot: 19, japanese: 'しくじった', english: "Yeah, I dropped the ball on that one.", literal: 'drop the ball = 球を落とす', context: "しくじる＝やり損なうこと。英語は球技で捕球を失敗する比喩、日本語は動詞そのもの。失敗を、競技と行為で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 19, japanese: '墓穴を掘る', english: "He dug his own grave with that email.", literal: 'dig one\'s own grave = 自分の墓を掘る', context: "墓穴を掘る＝自ら破滅を招くこと。英語も全く同じ比喩で、これは一致する。死と埋葬の観念が両言語で同じ絵を作った例。", category: 'action', month: '2026-09' },
    { daySlot: 19, japanese: '藪蛇になる', english: "Asking about it just opened a whole can of worms.", literal: 'a can of worms = 虫の缶(面倒の種)', context: "藪蛇＝余計なことをして災いを招くこと。日本語は藪を突いて蛇を出す、英語は虫の缶を開ける。自業自得を、野外と容器で表す違い。どちらも生き物。", category: 'nature', month: '2026-09' },
    { daySlot: 19, japanese: '後の祭り', english: "That ship has sailed, unfortunately.", literal: 'that ship has sailed = その船はもう出た', context: "後の祭り＝手遅れなこと。日本語は祭りの後という時間、英語は出港した船という移動。手遅れを、行事と船で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 19, japanese: '見込み違い', english: "I completely misjudged that one.", context: "見込み違い＝予測の誤り。日本語は見込むという視覚、英語はmisjudgeと判断。誤算を、視線と判定で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 19, japanese: '泥をかぶる', english: "Somebody had to take the fall for it.", literal: 'take the fall = 転落を引き受ける', context: "泥をかぶる＝他人の責任を引き受けること。日本語は泥という汚れ、英語はfallという転落。責任を、汚染と落下で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 19, japanese: '水泡に帰す', english: "All of that effort went down the drain.", literal: 'go down the drain = 排水口に流れる', context: "水泡に帰す＝努力が無になること。日本語は泡になって消える、英語は排水口へ流れる。徒労を、消泡と排水で表す違い。どちらも水。", category: 'nature', month: '2026-09' },
    { daySlot: 19, japanese: '躓く', english: "We hit a snag early on and never recovered.", literal: 'hit a snag = 障害物に引っかかる', context: "躓く＝足を取られること。英語のsnagは木の切り株や引っかかりで、日本語は足の動作。障害を、身体と物体で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 19, japanese: '取り返しがつかない', english: "There's no undoing it now.", context: "取り返しがつかない＝元に戻せないこと。日本語は取り返すという回収、英語はundoと行為の取り消し。不可逆を、返却と解除で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 19, japanese: '痛い目に遭う', english: "He learned that one the hard way.", literal: 'the hard way = 苦しいやり方で', context: "痛い目に遭う＝苦い経験をすること。日本語は目という部位と痛み、英語はhard wayと方法の困難。教訓を、身体と経路で表す違い。", category: 'body', month: '2026-09' },

    // ── Day 20 ── 決着
    { daySlot: 20, japanese: 'けりをつける', english: "Let's put this to bed once and for all.", literal: 'put to bed = 寝かしつける(片付ける)', context: "けりをつける＝決着させること。日本語は和歌の終助詞けりが語源、英語は子を寝かしつける比喩。終結を、文法と育児で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 20, japanese: '白黒つける', english: "I want a straight yes or no on this.", context: "白黒つける＝はっきり決めること。日本語は色の二値、英語は肯定否定の二値。決着を、色彩と返答で表す違い。囲碁の石が語源にある。", category: 'action', month: '2026-09' },
    { daySlot: 20, japanese: '折り合いをつける', english: "We managed to meet in the middle.", literal: 'meet in the middle = 中間で会う', context: "折り合いをつける＝妥協点を見つけること。日本語は折るという物理、英語は中間地点での合流。妥協を、屈曲と移動で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 20, japanese: '手を打つ', english: "Let's call it settled and move on.", context: "手を打つ＝合意すること。日本語は商談で手を打ち鳴らす所作、英語はcall it settledと宣言。妥結を、動作と発話で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 20, japanese: '丸く収まる', english: "It all worked itself out in the end.", literal: 'work itself out = 自然に解決する', context: "丸く収まる＝穏便に決着すること。日本語は丸という形と収納、英語は物事が自ら働いて解決する。円満を、形状と自律で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 20, japanese: '棚上げにする', english: "Let's shelve it for now and revisit next quarter.", literal: 'shelve = 棚に載せる', context: "棚上げ＝保留すること。英語のshelveも棚で、比喩が完全に一致する。物を棚に置いて忘れるという生活の情景が両言語で同じ語になった例。", category: 'action', month: '2026-09' },
    { daySlot: 20, japanese: '腹を決める', english: "I've made up my mind, we're doing it.", literal: 'make up one\'s mind = 心を組み立てる', context: "腹を決める＝決心すること。日本語は腹という内臓、英語はmindという精神。決意を、内臓と心で表す違い。日本語は決意が腹に宿る。", category: 'body', month: '2026-09' },
    { daySlot: 20, japanese: '見切りをつける', english: "At some point you just have to cut your losses.", literal: 'cut one\'s losses = 損切りする', context: "見切りをつける＝諦めて手を引くこと。日本語は見ることの限界、英語は損失の切断という金融の語。撤退を、視覚と会計で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 20, japanese: '筋を通す', english: "He does things by the book, always has.", literal: 'by the book = 本の通りに', context: "筋を通す＝道理を貫くこと。日本語は筋という線、英語は書物という規範。一貫性を、線条と文書で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 20, japanese: '一件落着', english: "And that's that, case closed.", literal: 'case closed = 事件終了', context: "一件落着＝物事が解決すること。日本語は件という単位が落ち着く、英語はcaseという事件が閉じる。解決を、着地と閉鎖で表す違い。どちらも司法の語彙。", category: 'life', month: '2026-09' },
];
