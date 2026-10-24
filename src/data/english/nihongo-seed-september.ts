// 日本語から学ぶ 2026年9月 — 身体で言う日本語
//
// 今月の見出しは日本語コーパス2億6,223万語から拾った。
// 慣用句として実際に使われていて、かつ英語へ1対1で移せないものだけ。
// 英語側は定義ではなく、同じ場面でネイティブが使うイディオムを当てる。
// 対応するイディオムが無い語は入れない。説明文になった時点で教材にならない。

import type { NihongoEntry } from './nihongo-seed';

export const NIHONGO_SEP_A: NihongoEntry[] = [
    // ── Day 1 ── 手
    { daySlot: 1, japanese: '手が離せない', english: "I'm right in the middle of something, can it wait five minutes?", context: "手が離せない＝今まさに何かを掴んでいて中断できない状態。英語のin the middle of somethingは「物事の真ん中にいる」という位置の言い方で、日本語は手という身体、英語は時間軸上の位置で同じ状況を指す違い。", category: 'body', month: '2026-09' },
    { daySlot: 1, japanese: '手を焼く', english: "That kid has been a real handful all week.", literal: 'a handful = 一掴み分(手に余る)', context: "手を焼く＝扱いに困って手が熱くなる感覚。英語のa handfulは「片手いっぱい」で量が多すぎて持てない意。日本語は熱、英語は量で持て余しを表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 1, japanese: '手が込んでる', english: "Someone really went to town on this cake.", literal: 'go to town = 町へ行く(徹底的にやる)', context: "手が込む＝手数が複雑に入り組んでいる状態。英語のgo to townは「町に繰り出す」から転じて存分にやる意で、日本語は労力の密度、英語は行動の勢いで凝り具合を言う違い。", category: 'body', month: '2026-09' },
    { daySlot: 1, japanese: '手も足も出ない', english: "I was completely out of my depth in that meeting.", literal: 'out of one\'s depth = 足の立たない深さ', context: "手も足も出ない＝四肢が動かせないほど太刀打ちできない状態。英語は水深が背丈を超えて足が着かない比喩で、日本語は四肢の停止、英語は水の深さで無力を言う違い。", category: 'body', month: '2026-09' },
    { daySlot: 1, japanese: '手を打つ', english: "We need to do something about it before it gets worse.", context: "手を打つ＝先回りして対策すること。英語には対応する慣用句が無く、take stepsやdo somethingと行為で言う。日本語は手を叩く動作が決着の合図として残っているが、英語は動作の比喩を持たない違い。", category: 'action', month: '2026-09' },
    { daySlot: 1, japanese: '手のひらを返す', english: "He did a complete one-eighty the second the money showed up.", literal: 'one-eighty = 180度', context: "手のひらを返す＝態度が正反対に変わること。英語は180度回転という角度で言い、日本語は掌の裏表で言う。同じ反転を、身体の部位と幾何で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 1, japanese: '手塩にかける', english: "She raised that business from nothing with her own two hands.", context: "手塩にかける＝自ら手をかけて大事に育てること。英語はwith one's own two handsと手の数で言う。日本語は食卓の塩を自分で振る所作が語源で、英語は労働の直接性で愛情を示す違い。", category: 'life', month: '2026-09' },
    { daySlot: 1, japanese: '手を抜く', english: "You can tell they cut corners on the second half.", literal: 'cut corners = 角を切る(近道する)', context: "手を抜く＝入れるべき力を抜くこと。英語は道の角を曲がらず突っ切る比喩で、日本語は力の引き算、英語は経路の短縮。同じ手抜きを、労力と距離で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 1, japanese: '手が早い', english: "He doesn't waste any time, does he.", context: "手が早い＝行動に移るのが速いこと。英語はdoesn't waste timeと時間の浪費で言う。日本語は手の速度、英語は時間の消費で素早さを表す違い。文脈次第で色恋の意味にもなる点は英語に対応が無い。", category: 'action', month: '2026-09' },
    { daySlot: 1, japanese: '手に負えない', english: "This has gotten completely out of hand.", literal: 'out of hand = 手の外(制御不能)', context: "手に負えない＝自分の手で担えないこと。英語のout of handも手の外で、ここは比喩が一致する珍しい例。日本語は担う重さ、英語は掴んでいる範囲で制御不能を言う違い。", category: 'body', month: '2026-09' },

    // ── Day 2 ── 目
    { daySlot: 2, japanese: '目が肥えてる', english: "She's got a really good eye for this kind of thing.", literal: 'a good eye = 良い目(見る目がある)', context: "目が肥える＝見慣れて審美眼が育つこと。英語はa good eyeと目の質で言う。日本語は目が太る成長の比喩、英語は目の性能。育つか備わるかの違い。", category: 'body', month: '2026-09' },
    { daySlot: 2, japanese: '目をつぶる', english: "I'll let it slide this once.", literal: 'let it slide = 滑らせておく(見逃す)', context: "目をつぶる＝あえて見ないことにする。英語は物事を滑って行かせる比喩で、日本語は視覚の遮断、英語は物の通過。見逃しを、目と動きで表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 2, japanese: '目に余る', english: "His behavior has gone way past the line at this point.", context: "目に余る＝見過ごせる限度を超えること。英語はpast the lineと境界線で言う。日本語は視界に収まらない量、英語は線の越境。過剰を、容量と境界で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 2, japanese: '目を通す', english: "Could you give this a quick once-over before I send it?", literal: 'once-over = 一度ざっと通すこと', context: "目を通す＝ざっと全体を見ること。英語のonce-overも一度通す意で発想が近い。日本語は目という器官を通過させ、英語は動作を名詞化する。同じ動きを器官と回数で言う違い。", category: 'action', month: '2026-09' },
    { daySlot: 2, japanese: '目が点になる', english: "I just stood there blinking, I had no idea what to say.", context: "目が点になる＝驚いて表情が固まること。漫画の記号から生まれた比較的新しい語で、英語に対応の慣用句が無い。日本語は視覚記号を言葉にし、英語は瞬きという実際の動作で描く違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 2, japanese: '大目に見る', english: "Cut him some slack, it's his first week.", literal: 'cut slack = 綱を緩める', context: "大目に見る＝基準を緩めて許すこと。英語は綱のたるみを与える航海の比喩で、日本語は見る目盛りを大きくする。寛容を、視野と張力で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 2, japanese: '目もくれない', english: "He didn't even give it a second look.", context: "目もくれない＝視線すら向けないこと。英語はnot a second lookと視線の回数で言う。日本語は目を与えないという授受、英語は見る回数。無関心を、贈与と計数で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 2, japanese: '目星をつける', english: "I've got my eye on a couple of places already.", literal: 'have one\'s eye on = 目をつけている', context: "目星をつける＝あたりを付けること。英語はhave one's eye onで目を対象に置く。日本語は星という印を対象に付け、英語は目のほうを置く。狙いを、印と視線で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 2, japanese: '見て見ぬふり', english: "Everyone just looked the other way and let it happen.", literal: 'look the other way = 別の方を見る', context: "見て見ぬふり＝見たのに見ないことにする演技。英語は視線を逸らす動作で言い、日本語はふりという演技で言う。黙認を、演技と身体の向きで表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 2, japanese: '目の上のたんこぶ', english: "He's been a thorn in my side since day one.", literal: 'a thorn in one\'s side = 脇腹の棘', context: "目の上のたんこぶ＝目障りで邪魔な存在。英語は脇腹に刺さった棘で、日本語は瞼の上のこぶ。どちらも身体の異物だが、痛む場所が目と脇で違う。", category: 'body', month: '2026-09' },

    // ── Day 3 ── 口・舌
    { daySlot: 3, japanese: '口が滑る', english: "It just slipped out, I wasn't supposed to say that.", literal: 'slip out = するっと出る', context: "口が滑る＝言うつもりのない言葉が出ること。英語は言葉のほうが滑り出る言い方で、日本語は口という器官が滑る。滑る主体が器官か内容かで違う。", category: 'body', month: '2026-09' },
    { daySlot: 3, japanese: '口が堅い', english: "Don't worry, he can keep a secret.", context: "口が堅い＝秘密を漏らさないこと。英語はkeep a secretと保持の動詞で言い、日本語は口の物理的な硬さで言う。守秘を、材質と保管で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 3, japanese: '口を挟む', english: "Sorry to butt in, but that's not quite what happened.", literal: 'butt in = 頭で割り込む', context: "口を挟む＝話に割り込むこと。英語のbutt inは頭突きで割り込む動作で、日本語は口を隙間に差し入れる。割り込みを、頭と口で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 3, japanese: '口をそろえる', english: "Everyone said the exact same thing, word for word.", context: "口をそろえる＝全員が同じことを言うこと。英語はword for wordと語の一致で言う。日本語は口という器官を並べ、英語は語を並べる。一致を、身体と言葉で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 3, japanese: '舌を巻く', english: "I have to hand it to her, that was seriously impressive.", literal: 'hand it to = 一本取られたと認める', context: "舌を巻く＝驚いて言葉が出ないほど感嘆すること。英語は相手に何かを手渡す比喩で、日本語は舌が丸まる身体反応。感嘆を、身体の停止と敗北の授与で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 3, japanese: '口車に乗る', english: "I fell for his sales pitch completely.", literal: 'fall for = 引っかかる', context: "口車に乗る＝巧みな話に乗せられること。英語はfall forと落ちる動作で、日本語は車に乗る移動。騙されることを、落下と乗車で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 3, japanese: '口が減らない', english: "He always has to have the last word.", context: "口が減らない＝言い返しが尽きないこと。英語はthe last wordと最後の一言で言う。日本語は口の消耗、英語は順番の最後。負けん気を、量と位置で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 3, japanese: '開いた口が塞がらない', english: "I was absolutely speechless, I didn't know what to say.", context: "開いた口が塞がらない＝呆れて口が閉じないこと。英語はspeechlessと言葉の不在で言う。日本語は口の物理状態、英語は発話の欠如。呆れを、身体と機能で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 3, japanese: '口が悪い', english: "He's got a sharp tongue, but he means well.", literal: 'a sharp tongue = 鋭い舌', context: "口が悪い＝言い方がきついこと。英語は舌の鋭さ、日本語は口の悪さ。どちらも発話の器官で言うが、日本語は善悪、英語は形状。攻撃性を、道徳と刃物で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 3, japanese: '口先だけ', english: "It's all talk and no action with that guy.", context: "口先だけ＝言うだけで行動が伴わないこと。英語はall talk no actionと対で言う。日本語は口の先端という部位、英語は言葉と行動の対比。空約束を、部位と対比で表す違い。", category: 'body', month: '2026-09' },

    // ── Day 4 ── 腹・胸
    { daySlot: 4, japanese: '腹を割って話す', english: "Let's just be straight with each other for a minute.", context: "腹を割る＝内側を全部見せて話すこと。英語はbe straightと直線で言い、日本語は腹という内臓を開く。率直さを、解剖と直線で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 4, japanese: '腹に据えかねる', english: "I've had about all I can take of this.", context: "腹に据えかねる＝怒りを腹の中に収めきれないこと。英語はall I can takeと許容量で言う。日本語は内臓の容量、英語は受け取れる限界。我慢の限界を、器と量で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 4, japanese: '腹をくくる', english: "Alright, I'm committing to it, no more second-guessing.", context: "腹をくくる＝覚悟を決めること。英語はcommitと委ねる動詞で、日本語は腹を縛る身体動作。決意を、契約と身体で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 4, japanese: '腹の探り合い', english: "The whole meeting was just two people feeling each other out.", literal: 'feel out = 手探りで探る', context: "腹の探り合い＝互いの本心を探ること。英語はfeel outと触覚で言い、日本語は腹という内臓を探る。相互の探索を、触感と解剖で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 4, japanese: '胸が痛む', english: "It broke my heart to see him like that.", context: "胸が痛む＝心が苦しくなること。英語はbreak one's heartと破損で言い、日本語は痛みで言う。同じ悲しみを、破壊と疼痛で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 4, japanese: '胸を張る', english: "You should be proud of that, honestly.", context: "胸を張る＝誇らしく振る舞うこと。英語はproudと感情の形容詞で言い、日本語は胸を広げる姿勢。誇りを、感情と姿勢で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 4, japanese: '胸が騒ぐ', english: "I've got a bad feeling about this, I can't shake it.", context: "胸が騒ぐ＝不安で落ち着かないこと。英語はa bad feelingと感覚で言い、日本語は胸の内側が動く。予感を、感覚と運動で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 4, japanese: '胸に刻む', english: "That's something I'll carry with me for a long time.", context: "胸に刻む＝忘れないよう心に留めること。英語はcarry with meと携帯で言い、日本語は彫刻。記憶の保持を、運搬と刻印で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 4, japanese: '腹が減っては戦ができぬ', english: "You can't do anything on an empty stomach.", context: "諺の対応。日本語は戦という具体的な場面を出し、英語はan empty stomachと状態だけを言う。同じ教訓を、戦闘の比喩と身体の状態で表す違い。", category: 'food', month: '2026-09' },
    { daySlot: 4, japanese: '太っ腹', english: "That's incredibly generous of you, are you sure?", context: "太っ腹＝気前がよいこと。英語はgenerousと性質の形容詞で、日本語は腹の太さという体型。寛大さを、性格と身体で表す違い。", category: 'body', month: '2026-09' },

    // ── Day 5 ── 足・腰
    { daySlot: 5, japanese: '足を引っ張る', english: "I feel like I'm holding the whole team back.", literal: 'hold back = 後ろに保つ', context: "足を引っ張る＝他人の前進を妨げること。英語は後ろに保つ方向で言い、日本語は足という部位を掴む。妨害を、方向と接触で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 5, japanese: '足が出る', english: "We went over budget by about twenty percent.", context: "足が出る＝予算を超過すること。英語はgo over budgetと超過で言い、日本語は隠していた足がはみ出す。超過を、線の越境と露出で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 5, japanese: '二の足を踏む', english: "I keep hesitating, I don't know why.", context: "二の足を踏む＝一歩目は出たが二歩目が出ないこと。英語はhesitateと躊躇の動詞で、日本語は歩数を数える。迷いを、心理と歩数で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 5, japanese: '足を洗う', english: "He got out of that business years ago.", literal: 'get out of = そこから出る', context: "足を洗う＝悪い世界から抜けること。英語はget outと空間からの離脱で、日本語は足の汚れを落とす洗浄。離脱を、移動と清潔で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 5, japanese: '腰が引けてる', english: "You're not really committing to it, I can tell.", context: "腰が引ける＝逃げ腰になること。英語はnot committingと約束の不足で言い、日本語は腰の後退という姿勢。及び腰を、意志と体勢で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 5, japanese: '腰を据える', english: "I'm settling in for the long haul on this one.", literal: 'the long haul = 長い運搬(長期戦)', context: "腰を据える＝落ち着いて長く取り組むこと。英語は長距離輸送の比喩で、日本語は腰を地に置く。腰を下ろすか、長い距離を運ぶか。持久を、姿勢と距離で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 5, japanese: '足元を見る', english: "They knew we were desperate and they took advantage of it.", context: "足元を見る＝相手の弱みにつけこむこと。英語はtake advantageと利益の取得で言い、日本語は相手の足元という下方の観察。搾取を、視線と獲得で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 5, japanese: '足が棒になる', english: "My legs are absolutely dead, I've been walking all day.", context: "足が棒になる＝疲れて足が硬直すること。英語はdeadと死の比喩で、日本語は棒という物体化。疲労を、死と硬直で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 5, japanese: '揚げ足を取る', english: "He's just nitpicking at this point.", literal: 'nitpick = 虱を取る(細かく粗探しする)', context: "揚げ足を取る＝言葉尻を捉えて非難すること。英語は髪から虱を摘む動作で、日本語は上がった足を掴む相撲の技。粗探しを、寄生虫と組み技で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 5, japanese: '手も足も動かない', english: "I'm completely wiped, I can't move.", context: "手も足も動かない＝疲れ果てて動けないこと。英語はwipedと拭き取られた比喩で、日本語は四肢の停止。消耗を、消去と機能停止で表す違い。", category: 'body', month: '2026-09' },

    // ── Day 6 ── 気
    { daySlot: 6, japanese: '気が済む', english: "Do whatever you need to do to get it out of your system.", literal: 'get out of one\'s system = 体内から出す', context: "気が済む＝溜まった気持ちが解消すること。英語は体内から排出する比喩で、日本語は気が完了する。解消を、排出と完了で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気が向いたら', english: "Come by if you feel like it, no pressure.", context: "気が向く＝気持ちが自然にそちらを向くこと。英語はfeel like itと感覚で言い、日本語は気の方向。意欲を、感覚と方位で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気を取り直す', english: "Alright, let's shake it off and start again.", literal: 'shake off = 振り落とす', context: "気を取り直す＝落ちた気持ちを立て直すこと。英語は身体を振って落とす動作で、日本語は気を取り直す掴み直し。回復を、振動と再把持で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気が気じゃない', english: "I've been on edge all day waiting to hear back.", literal: 'on edge = 縁の上(神経が張った)', context: "気が気でない＝心配で落ち着かないこと。英語は縁に立つ危うさで、日本語は気という語の反復。不安を、位置と反復で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気が引ける', english: "I feel bad asking after everything you've done.", context: "気が引ける＝遠慮して気持ちが後退すること。英語はfeel badと感情で言い、日本語は気の後退。躊躇を、感情と方向で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気を許す', english: "I can actually relax around him, which is rare.", context: "気を許す＝警戒を解くこと。英語はrelaxと身体の弛緩で言い、日本語は気の緊張を解放する。安心を、身体と精神で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気が置けない', english: "We go way back, I don't have to put on an act with her.", context: "気が置けない＝遠慮がいらない親しさ。否定形なのに肯定的な意味という日本語特有の型で、英語はdon't have to put on an actと演技の不要で言う。親しさを、遠慮の不在と演技の不要で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気が滅入る', english: "This weather is really getting me down.", literal: 'get down = 下げる(落ち込ませる)', context: "気が滅入る＝気分が沈むこと。英語はget downと下方向で言い、日本語は滅び入るという消滅。憂鬱を、下降と消失で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気を紛らわす', english: "I just needed something to take my mind off it.", literal: 'take one\'s mind off = 心を離す', context: "気を紛らわす＝注意を別へ逸らすこと。英語は心を対象から外す動作で、日本語は気を混ぜて紛れさせる。転換を、除去と混合で表す違い。", category: 'emotion', month: '2026-09' },
    { daySlot: 6, japanese: '気が抜ける', english: "Once it was over I just went completely flat.", context: "気が抜ける＝張りが失われること。英語はgo flatと平坦化で、炭酸が抜ける言い方も同じ。日本語も英語も気体の喪失を使うが、日本語は気、英語は泡。", category: 'emotion', month: '2026-09' },

    // ── Day 7 ── 水・火
    { daySlot: 7, japanese: '水を差す', english: "I don't want to rain on your parade, but have you checked the dates?", literal: 'rain on someone\'s parade = 行進に雨を降らせる', context: "水を差す＝盛り上がりに冷や水を浴びせること。英語は祝賀のパレードに雨という天候で、日本語は熱い物に水を注ぐ。妨害を、天気と温度で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 7, japanese: '水に流す', english: "Let's just put it behind us and move on.", context: "水に流す＝過去を無かったことにすること。英語はput behind usと後方への配置で、日本語は川に流す。忘却を、位置と流水で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 7, japanese: '焼け石に水', english: "It's a drop in the ocean, honestly.", literal: 'a drop in the ocean = 大海の一滴', context: "焼け石に水＝効果が小さすぎること。英語は海に落ちる一滴という規模の対比で、日本語は熱い石にかける水という蒸発。無力を、比率と気化で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 7, japanese: '火に油を注ぐ', english: "Saying that just added fuel to the fire.", literal: 'add fuel to the fire = 火に燃料を足す', context: "火に油を注ぐ＝事態を悪化させること。英語も同じ火と燃料の比喩で、ここは一致する珍しい例。日本語は油と具体的で、英語はfuelと総称。同じ絵を、具体と抽象で言う違い。", category: 'nature', month: '2026-09' },
    { daySlot: 7, japanese: '火の車', english: "Our finances are a complete disaster right now.", context: "火の車＝家計が非常に苦しいこと。仏教の火車が語源で、英語に対応の慣用句が無くdisasterやin the redと言う。困窮を、地獄の車と赤字で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 7, japanese: '油を売る', english: "Where have you been? You've been gone for an hour.", context: "油を売る＝仕事中に無駄話をして時間を潰すこと。江戸の髪油売りが語源で、英語に対応の慣用句が無い。怠業を、商売の情景と時間の不在で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 7, japanese: '水の泡', english: "All that work went down the drain.", literal: 'go down the drain = 排水口に流れる', context: "水の泡＝努力が無に帰すこと。英語は排水口へ流れる比喩で、日本語は泡が消える。徒労を、排水と消泡で表す違い。どちらも水を使うのが面白い。", category: 'nature', month: '2026-09' },
    { daySlot: 7, japanese: '火消しに回る', english: "I've spent all week doing damage control.", context: "火消しに回る＝問題の収拾に追われること。英語はdamage controlと軍艦の被害対処の用語で、日本語は消防。収拾を、艦船と火事で表す違い。", category: 'action', month: '2026-09' },
    { daySlot: 7, japanese: '水と油', english: "Those two have never gotten along, they're just oil and water.", literal: 'oil and water = 油と水', context: "水と油＝混ざらない相性。英語も同じ油と水で、語順だけが逆。同じ物理現象を両言語が採用した稀な例で、順序の違いは各言語の並びの癖による。", category: 'nature', month: '2026-09' },
    { daySlot: 7, japanese: '呼び水になる', english: "That one comment opened the floodgates.", literal: 'open the floodgates = 水門を開く', context: "呼び水＝きっかけを作ること。英語は水門を開いて奔流を招く比喩で、日本語はポンプに注ぐ少量の水。誘発を、放流と誘導で表す違い。どちらも水利の語。", category: 'nature', month: '2026-09' },

    // ── Day 8 ── 食
    { daySlot: 8, japanese: '朝飯前', english: "That's a piece of cake, give me ten minutes.", literal: 'a piece of cake = 一切れのケーキ', context: "朝飯前＝朝食前でもできる簡単なこと。英語は一切れのケーキという食べやすさ。日本語は時間帯、英語は食品。容易さを、空腹時と菓子で表す違い。", category: 'food', month: '2026-09' },
    { daySlot: 8, japanese: '塩対応', english: "She was pretty cold with him, honestly.", context: "塩対応＝そっけない態度。比較的新しい語で、英語はcoldと温度で言う。日本語は味覚、英語は温度。冷淡を、塩味と低温で表す違い。", category: 'food', month: '2026-09' },
    { daySlot: 8, japanese: '甘く見る', english: "Don't underestimate how long that's going to take.", context: "甘く見る＝軽く見積もること。英語はunderestimateと数量で言い、日本語は甘いという味覚。過小評価を、味と計算で表す違い。", category: 'food', month: '2026-09' },
    { daySlot: 8, japanese: '苦い経験', english: "That was a hard lesson to learn.", context: "苦い経験＝つらい体験。英語はhard lessonと難度で言い、日本語は苦味。痛みを、味覚と困難で表す違い。英語にもbitterはあるが恨みの意味に寄る。", category: 'food', month: '2026-09' },
    { daySlot: 8, japanese: '棚からぼた餅', english: "That just fell right into my lap.", literal: 'fall into one\'s lap = 膝の上に落ちてくる', context: "棚からぼた餅＝思いがけない幸運。英語は膝の上に落ちる比喩で、日本語は棚から菓子。どちらも落下だが、日本語は食べ物、英語は身体の受け皿。", category: 'food', month: '2026-09' },
    { daySlot: 8, japanese: '腹八分目', english: "Everything in moderation, that's the whole trick.", context: "腹八分目＝満腹の八割で止めること。英語はin moderationと節度で言い、日本語は具体的な割合。節制を、数値と概念で表す違い。日本語の数値の具体性が特徴。", category: 'food', month: '2026-09' },
    { daySlot: 8, japanese: '味をしめる', english: "He got a taste for it and now he won't stop.", literal: 'get a taste for = 味を覚える', context: "味をしめる＝一度の成功で癖になること。英語もget a taste forと味覚で言い、ここは発想が近い。日本語は締めるという把持、英語は獲得。癖づきを、掴みと取得で表す違い。", category: 'food', month: '2026-09' },
    { daySlot: 8, japanese: '生煮え', english: "The whole plan is half-baked, it's not ready.", literal: 'half-baked = 半分焼けた(生煮え)', context: "生煮え＝中途半端な状態。英語はhalf-bakedと焼き加減で、日本語は煮え加減。未完成を、焼くと煮るで表す違い。調理法の主流が国で違うのがそのまま出ている。", category: 'food', month: '2026-09' },
    { daySlot: 8, japanese: 'さじを投げる', english: "The doctors basically threw in the towel.", literal: 'throw in the towel = タオルを投げ入れる', context: "さじを投げる＝見込みがなく諦めること。英語はボクシングのタオル投入で、日本語は医者が薬匙を投げる。断念を、競技と医療で表す違い。どちらも投げる動作。", category: 'action', month: '2026-09' },
    { daySlot: 8, japanese: '煮え切らない', english: "Just give me a straight answer, yes or no.", context: "煮え切らない＝態度がはっきりしないこと。英語はa straight answerと直線で言い、日本語は加熱の不足。曖昧さを、直線と煮え加減で表す違い。", category: 'food', month: '2026-09' },

    // ── Day 9 ── 天気・季節
    { daySlot: 9, japanese: '雲行きが怪しい', english: "Things are starting to look pretty shaky.", context: "雲行きが怪しい＝事態が悪化しそうなこと。英語はshakyと不安定な揺れで言い、日本語は雲の動き。悪化の予兆を、天候と振動で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 9, japanese: '嵐の前の静けさ', english: "It's the calm before the storm.", literal: 'the calm before the storm = 嵐の前の凪', context: "嵐の前の静けさ＝大事の直前の不気味な平穏。英語も全く同じ比喩で、これは完全に一致する。気象の観察は文化を越えて同じ言い方に辿り着いた例。", category: 'nature', month: '2026-09' },
    { daySlot: 9, japanese: '風向きが変わった', english: "The tide has turned on this one.", literal: 'the tide turns = 潮目が変わる', context: "風向きが変わる＝形勢が変わること。英語は潮の流れで言い、日本語は風。形勢を、海流と気流で表す違い。島国同士なのに水と空気で分かれている。", category: 'nature', month: '2026-09' },
    { daySlot: 9, japanese: '晴れ舞台', english: "This is her moment, she's been working toward it for years.", context: "晴れ舞台＝晴れがましい場。英語はone's momentと時間で言い、日本語は天気と舞台。栄誉の場を、時点と天候で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 9, japanese: '雨降って地固まる', english: "Things are usually stronger after you work through something like that.", context: "雨降って地固まる＝揉め事の後に関係が強くなること。英語に対応の諺が無く、work throughと通過で説明する。回復を、地質と過程で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 9, japanese: '肩で風を切る', english: "He walked in there like he owned the place.", literal: 'like he owned the place = そこの持ち主のように', context: "肩で風を切る＝威勢よく歩くこと。英語は所有者のような態度で言い、日本語は肩が風を裂く物理。誇示を、所有と空気抵抗で表す違い。", category: 'body', month: '2026-09' },
    { daySlot: 9, japanese: '暑さ寒さも彼岸まで', english: "It always breaks around the equinox, every year.", context: "彼岸を境に気候が和らぐという日本の観察。英語はequinoxと天文の語で言うが、諺としては定着していない。季節の区切りを、仏事と天文で表す違い。", category: 'nature', month: '2026-09' },
    { daySlot: 9, japanese: '秋の日はつるべ落とし', english: "It gets dark so fast this time of year.", context: "つるべ落とし＝井戸の釣瓶が落ちる速さ。英語に対応の諺が無く、単純に速度で言う。日暮れの速さを、井戸の道具と時間で表す違い。道具が消えた現代でも語は残っている。", category: 'nature', month: '2026-09' },
    { daySlot: 9, japanese: '天気が崩れる', english: "The weather's going to turn later today.", context: "崩れる＝形が壊れること。英語はturnと方向転換で言う。天候の悪化を、崩壊と回転で表す違い。日本語は構造物、英語は舵。", category: 'nature', month: '2026-09' },
    { daySlot: 9, japanese: '風邪をひく', english: "I think I'm coming down with something.", literal: 'come down with = 病が降りてくる', context: "風邪をひく＝引くという動作。英語はcome down withと病が上から降りてくる。日本語は自分が引き寄せ、英語は病が降ってくる。方向が正反対。", category: 'body', month: '2026-09' },

    // ── Day 10 ── 数・量
    { daySlot: 10, japanese: '五十歩百歩', english: "There's not much in it either way, honestly.", context: "五十歩百歩＝どちらも大差ないこと。中国の故事が語源で具体的な歩数を出すが、英語はnot much in itと差の量で言う。同等を、数値と差分で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 10, japanese: '二束三文', english: "They sold it for next to nothing.", literal: 'next to nothing = ほとんど無いに等しい', context: "二束三文＝非常に安いこと。日本語は束と文という具体的な単位、英語はnothingへの近接。安さを、通貨単位とゼロへの距離で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 10, japanese: '一石二鳥', english: "That kills two birds with one stone.", literal: 'kill two birds with one stone = 一石で二鳥', context: "一石二鳥＝一つの行為で二つの利益。英語からの翻訳語なので比喩が完全に一致する。日本語は四字熟語に圧縮し、英語は文のまま。同じ絵を、熟語と文で持つ違い。", category: 'life', month: '2026-09' },
    { daySlot: 10, japanese: '九分九厘', english: "It's as good as done at this point.", literal: 'as good as done = 済んだも同然', context: "九分九厘＝ほぼ確実なこと。日本語は割合の単位で九割九分を言い、英語はas good asと同等性で言う。確実さを、数値と等価で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 10, japanese: '朝三暮四', english: "They just moved the numbers around, nothing actually changed.", context: "朝三暮四＝見かけを変えて中身は同じにすること。故事成語で猿と餌の話が語源。英語に対応が無く、moved the numbers aroundと操作で言う。詭弁を、寓話と会計で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 10, japanese: '数えるほどしかない', english: "You could count them on one hand.", literal: 'count on one hand = 片手で数えられる', context: "数えるほど＝ごく少数。英語は片手という身体の単位で言い、日本語は数える行為の可能性。少なさを、指の本数と可算性で表す違い。", category: 'life', month: '2026-09' },
    { daySlot: 10, japanese: '桁が違う', english: "That's on a completely different level.", context: "桁が違う＝規模が段違いなこと。英語はdifferent levelと高さで言い、日本語は数の位。差を、階層と桁数で表す違い。日本語は算術、英語は空間。", category: 'life', month: '2026-09' },
    { daySlot: 10, japanese: '雀の涙', english: "The raise was basically pocket change.", literal: 'pocket change = ポケットの小銭', context: "雀の涙＝ごくわずかな量。英語はポケットの小銭という具体物で、日本語は小鳥の涙。少量を、貨幣と生物で表す違い。日本語は生き物の比喩が多い。", category: 'nature', month: '2026-09' },
    { daySlot: 10, japanese: '山ほどある', english: "I've got a mountain of work to get through.", literal: 'a mountain of = 山のような', context: "山ほど＝大量にあること。英語もa mountain ofと山で言い、ここは一致する。日本語は程度の副詞、英語は名詞の量詞。同じ山を、程度と単位で使う違い。", category: 'nature', month: '2026-09' },
    { daySlot: 10, japanese: '五分五分', english: "It's a coin flip at this point, could go either way.", literal: 'a coin flip = コイン投げ', context: "五分五分＝互角。日本語は割合の数値、英語はコインを投げる行為。等確率を、数値と賭けの動作で表す違い。", category: 'life', month: '2026-09' },
];
