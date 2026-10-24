/**
 * BANK — Thanksgiving / 感謝祭
 *
 * 義理の実家に着く → 台所 → 持ってきた一品 → 食卓 → 料理を回す →
 * 親戚の質問をかわす → 政治を避ける → 乾杯 → おかわり → 皿洗い → 残り物 →
 * 別れ → 帰りの車の反省会。年に一度、全員が同じ部屋に閉じ込められる日の英語。
 *
 * ここで要るのは料理の名前ではない。かわす言葉と、話題を変える合図。
 * Anyway と Not at the table と For now, yeah. の3つで、だいたい生き延びられる。
 */

import type { LifePhrase } from '../../lifeline-types';

export const THANKSGIVING_BANK: LifePhrase[] = [

    // ---- 到着 ----
    { en: "Happy Thanksgiving!", ja: 'ハッピーサンクスギビング', note: '玄関で全員に言う。返しも同じ一言でいい' },
    { en: "You're here! Come in, come in.", ja: '来たね。入って入って', note: '同じ語を2回重ねるのが歓迎の言い方' },
    { en: "Sorry we're late, traffic was brutal.", ja: '遅れてごめん。渋滞がひどくて', note: 'brutal。ひどいの強調。感謝祭の前後は本当に混む' },
    { en: "Everybody's in the kitchen.", ja: 'みんな台所にいるよ', note: '感謝祭は居間ではなく台所に人が溜まる' },
    { en: "Let me take your coats.", ja: 'コート預かるよ', note: '入ってすぐ言われる。渡してしまう' },
    { en: "Just throw them on the bed upstairs.", ja: '2階のベッドに置いといて', note: '上着はベッドの上に山積みになる。よくある扱い' },
    { en: "Something smells amazing.", ja: 'すごくいい匂い', note: '入って最初に言う一言。作った人に一番効く' },
    { en: "Grandma's already asleep in the chair.", ja: 'おばあちゃんもう椅子で寝てる', note: '起こさない。感謝祭の風物詩' },
    { en: "How was the drive?", ja: '運転はどうだった', note: '遠方から来る前提の挨拶。所要時間で答える' },
    { en: "Four hours, but it wasn't bad.", ja: '4時間。でも悪くなかった', note: '時間+評価の2点で答えると会話が続く' },

    // ---- 台所 ----
    { en: "Can I help with anything?", ja: '何か手伝おうか', note: '台所に入ったら必ず言う。断られても言っておく' },
    { en: "You can peel these if you want.", ja: 'やりたいならこれ剥いて', note: '本当に頼まれた時は素直にやる' },
    { en: "The turkey needs another hour.", ja: '七面鳥はあと1時間かかる', note: '予定は必ず後ろにずれる。腹を空かせて待つ' },
    { en: "Is it done? Check the thigh.", ja: '焼けてる。腿のところ見て', note: '感謝祭の台所で毎年必ず出る会話' },
    { en: "It's resting.", ja: '今休ませてるところ', note: 'rest。焼き上がった肉を寝かせること。まだ切らない' },
    { en: "Who's carving?", ja: '誰が切り分ける', note: 'carve。七面鳥を切ること。家長の役目とされることが多い' },
    { en: "Watch out, hot pan coming through.", ja: '通ります、熱いの持ってる', note: 'coming through。狭い台所を通り抜ける時の定型' },
    { en: "Can you taste this? Does it need salt?", ja: '味見して。塩足りてる', note: '味見を頼まれたら断らない。参加の合図' },
    { en: "We're out of butter.", ja: 'バターが切れた', note: 'be out of 〜。在庫が尽きたこと' },
    { en: "There's another stick in the fridge.", ja: '冷蔵庫にもう1本ある', note: 'a stick of butter。棒状に包まれた1本' },

    // ---- 持ってきた一品 ----
    { en: "I brought a pie. It's store-bought, I'm not even going to pretend.", ja: 'パイ持ってきた。買ったやつ。取り繕う気もない', note: '先に自分で言ってしまうと笑いになる。隠すと気まずい' },
    { en: "Where should I put this?", ja: 'これどこに置けばいい', note: '勝手に置かない。台所には順番がある' },
    { en: "It just needs twenty minutes in the oven.", ja: 'オーブンで20分温めるだけでいい', note: '温め直しが要る物は事前に伝える' },
    { en: "The oven's full. Can it go in the microwave?", ja: 'オーブンいっぱいなんだけど、レンジでいける', note: '感謝祭の台所は本当にオーブンが空かない' },
    { en: "Did you make this yourself?", ja: 'これ自分で作ったの', note: '褒める前置き。作ってなくても正直に言う' },
    { en: "It's my mother's recipe.", ja: '母のレシピなんだ', note: '一品に来歴を付けると必ず話が広がる' },
    { en: "Save room for dessert.", ja: 'デザートの分お腹に残しといて', note: 'save room。腹に余地を残すこと' },

    // ---- 食卓につく ----
    { en: "Dinner's ready, everybody!", ja: 'ごはんできたよ、みんな', note: 'この一声で全員が動き出す' },
    { en: "Sit wherever.", ja: 'どこでも座って', note: '実際には毎年ほぼ同じ席に座る' },
    { en: "Kids are at the little table.", ja: '子どもは子ども用テーブルで', note: 'the kids table。感謝祭の伝統。なかなか卒業できない' },
    { en: "I'm thirty-two and I'm still at the kids table.", ja: '32歳だけどまだ子どもテーブルだよ', note: '毎年誰かが言う定番のネタ' },
    { en: "Is this seat taken?", ja: 'ここ空いてる', note: '席を取る前に必ず一言' },
    { en: "Somebody grab another chair.", ja: '誰か椅子もう1脚持ってきて', note: '人数が読めていないのも毎年のこと' },
    { en: "Let's say grace.", ja: 'お祈りしましょう', note: 'say grace。食前の祈り。やる家とやらない家がある' },
    { en: "We go around and say what we're thankful for.", ja: '順番に感謝してることを言うんだ', note: 'この習慣がある家では一文用意しておくと助かる' },

    // ---- 料理を回す ----
    { en: "Pass the potatoes, please.", ja: 'ポテト取ってください', note: '手を伸ばして取らない。頼むのが作法' },
    { en: "Could you send the gravy down?", ja: 'グレービーこっちに回して', note: 'send 〜 down。テーブルの端まで送ってもらうこと' },
    { en: "Here, take the whole dish.", ja: 'はい、皿ごとどうぞ', note: '取り分けずに器ごと渡すのが早い' },
    { en: "Careful, it's heavy.", ja: '気をつけて、重いよ', note: '渡す時の一言。落とすと本当に困る' },
    { en: "White meat or dark?", ja: '胸肉、それとも腿肉', note: '七面鳥は必ず聞かれる。white が胸、dark が腿' },
    { en: "A little of both.", ja: '両方ちょっとずつ', note: '迷った時の安全な答え' },
    { en: "Not too much, I want to try everything.", ja: '少しでいい。全部味見したいから', note: '断る理由を添えると角が立たない' },
    { en: "Is there gravy in the stuffing?", ja: 'スタッフィングにグレービー入ってる', note: '中身を聞くのは失礼ではない。むしろ普通' },
    { en: "Somebody start the rolls.", ja: 'パン回し始めて', note: 'start。テーブルの端から順に回し始めること' },

    // ---- 親戚の質問をかわす ----
    { en: "So, are you seeing anyone?", ja: '付き合ってる人はいるの', note: '毎年必ず来る質問。正面から答えなくていい' },
    { en: "Nothing serious right now.", ja: '今は真剣なのはいないかな', note: '一番角が立たない返し。これ以上聞かれにくい' },
    { en: "When are you two going to give us grandkids?", ja: '孫はいつ見せてくれるの', note: '悪気なく聞かれる。真面目に答えると長引く' },
    { en: "We'll let you know when there's news.", ja: '何かあったら知らせるよ', note: '断言せずに話を打ち切る一文' },
    { en: "You'd be such a good mom.", ja: 'あなた絶対いいお母さんになるのに', note: '褒め言葉のつもりで言っている。Thanks で流す' },
    { en: "How's work? I mean really.", ja: '仕事どう。本当のところ', note: 'I mean really。建前ではない答えを求めている' },
    { en: "Same as always, honestly.", ja: '正直、いつもどおり', note: '何も言わずに答えたことにできる万能句' },
    { en: "Still at that same company?", ja: 'まだあの会社にいるの', note: '転職を勧めてくる流れの前振り' },
    { en: "For now, yeah.", ja: '今のところはね', note: 'For now。含みを残して追及を止める' },
    { en: "You've lost weight.", ja: '痩せた', note: '褒めているつもり。Thanks とだけ返して次へ' },
    { en: "Anyway, how's your garden?", ja: 'それはそうと、庭はどう', note: '話題を変える最短ルート。Anyway が合図になる' },
    { en: "Let me go get some more of that.", ja: 'あれもう少しもらってくる', note: '席を立って質問から逃げる。誰も咎めない' },

    // ---- 政治を避ける ----
    { en: "Don't get him started.", ja: 'その話させないで', note: 'get 〜 started。始めさせると止まらない人がいる' },
    { en: "Not at the table.", ja: '食卓でその話はやめて', note: '一番強い制止。だいたいこれで止まる' },
    { en: "Can we do one year without this?", ja: '1年くらいこの話なしでいけない', note: '呆れた口調で言う。責める言い方にはならない' },
    { en: "I don't really keep up with it.", ja: '正直あまり追ってないんだ', note: '意見を言わずに降りる一文。角が立たない' },
    { en: "Everybody's got their own take.", ja: 'みんなそれぞれ考えがあるからね', note: '同意も否定もせずに終わらせる万能句' },
    { en: "You two can argue outside.", ja: '2人は外でやって', note: '実際に外に出される。冗談半分本気半分' },
    { en: "Who wants more wine?", ja: 'ワインおかわりの人', note: '場を切り替える定番の割り込み。効く' },
    { en: "Okay, moving on.", ja: 'はい、次の話', note: '短く区切る。ここで本当に話題が変わる' },

    // ---- 乾杯 ----
    { en: "Can I say something real quick?", ja: 'ちょっといいかな', note: '乾杯の前置き。real quick を付けると身構えられない' },
    { en: "I just want to say thanks for having us all.", ja: 'みんなを呼んでくれてありがとう', note: '主催者に向けた一文。ここは長くしない' },
    { en: "To family.", ja: '家族に', note: '一番短い乾杯。これだけで成立する' },
    { en: "And to the ones who couldn't be here.", ja: 'ここに来られなかった人にも', note: '亡くなった人も含む。声を落として言う' },
    { en: "Cheers.", ja: '乾杯', note: 'グラスを上げる。全員で言う' },
    { en: "Alright, eat before it gets cold.", ja: 'はい、冷める前に食べよう', note: '乾杯を長引かせないための締め' },

    // ---- おかわり ----
    { en: "Anybody want seconds?", ja: 'おかわりいる人', note: 'seconds。2皿目。感謝祭では前提として聞かれる' },
    { en: "I couldn't. Well, maybe a little.", ja: '無理。まあ、ちょっとだけなら', note: '断ってから受ける。この流れ自体が笑いになる' },
    { en: "There's plenty left.", ja: 'まだたくさん残ってるよ', note: '遠慮を崩すための一言' },
    { en: "I'm stuffed.", ja: '満腹で動けない', note: 'stuffed。食べ過ぎた状態。七面鳥の詰め物と同じ語' },
    { en: "Save some for later.", ja: '後の分も残しといて', note: '残り物を持ち帰る前提で言っている' },
    { en: "I'm going to regret this.", ja: '後で絶対後悔するやつだ', note: '取り皿を伸ばしながら言う決まり文句' },

    // ---- 皿洗い ----
    { en: "Cooks don't clean.", ja: '作った人は洗わない', note: 'この家の掟として宣言される。素直に従う' },
    { en: "I'll wash, you dry.", ja: '俺が洗うから拭いて', note: '2人で分担する時の定型' },
    { en: "Just leave it, I'll get it in the morning.", ja: '置いといて。朝やるから', note: '本気ではないことが多い。1回は食い下がる' },
    { en: "No way, we're not leaving you with this.", ja: 'とんでもない。これ全部置いて帰れない', note: 'leave 〜 with。押し付けて去ること' },
    { en: "Does this go in the dishwasher?", ja: 'これ食洗機に入れていい', note: '勝手に入れない。怒られる原因の第1位' },
    { en: "Not that one, it's hand-wash.", ja: 'それは駄目。手洗いのやつ', note: '古い皿や木の道具は必ず手洗い' },
    { en: "Where does this bowl live?", ja: 'このボウルどこにしまうの', note: 'where does 〜 live。物の定位置を聞く言い方' },

    // ---- 残り物 ----
    { en: "Take some leftovers.", ja: '残り物持って帰って', note: 'leftovers。翌日のほうが本番だという人もいる' },
    { en: "I brought containers.", ja: '容器持ってきた', note: '用意していくと本当に喜ばれる' },
    { en: "You want the turkey or the ham?", ja: '七面鳥とハム、どっちいる', note: '両方出る家も多い。遠慮せず選ぶ' },
    { en: "Take the pie. I don't need it in this house.", ja: 'パイ持ってって。うちに置いときたくない', note: '食べてしまうから困る、という自虐' },
    { en: "Don't forget your dish.", ja: '自分の器忘れないで', note: '持ち寄った器は回収する。来年も使う' },
    { en: "Sandwiches tomorrow.", ja: '明日はサンドイッチだね', note: '残った七面鳥の定番の使い道' },
    { en: "This is the best part of the whole thing.", ja: 'これが全部の中で一番の楽しみ', note: '残り物のほうが好きだと公言する人は多い' },

    // ---- 別れ ----
    { en: "We should hit the road.", ja: 'そろそろ出ないと', note: 'hit the road。出発すること' },
    { en: "Text me when you get home.", ja: '着いたら連絡して', note: '必ず言われる。実際に送らないと心配される' },
    { en: "Thanks for everything. Really.", ja: '本当に色々ありがとう', note: 'Really を後ろに置くと社交辞令に聞こえない' },
    { en: "Come here, give me a hug.", ja: 'ほら、ハグして', note: '別れ際は握手ではなくハグ。身内では必ず' },
    { en: "Say bye to Grandma.", ja: 'おばあちゃんにさよなら言って', note: '子どもに向けて言う。親が必ず促す' },
    { en: "Same time next year.", ja: '来年も同じ時期にね', note: '次の約束が別れの挨拶になる' },
    { en: "Drive safe, it's dark out.", ja: '暗いから気をつけて', note: 'it is dark out。外が暗いこと' },

    // ---- 帰りの車 ----
    { en: "That went better than last year.", ja: '去年よりましだったね', note: '車のドアが閉まった瞬間に反省会が始まる' },
    { en: "I thought your uncle was going to lose it.", ja: 'おじさん、爆発するかと思った', note: 'lose it。堪忍袋の緒が切れること' },
    { en: "You handled that well.", ja: 'よく我慢したね', note: '質問をかわし切った相手をねぎらう一文' },
    { en: "I'm never eating again.", ja: 'もう二度と食べない', note: '毎年言って毎年また食べる' },
    { en: "Did we forget anything?", ja: '何か忘れてない', note: '高速に乗る前に必ず一度出る' },
    { en: "The dish. We left the dish.", ja: '皿だ。皿置いてきた', note: '毎年何かを置き忘れる。だいたい器' },
    { en: "We'll get it at Christmas.", ja: 'クリスマスの時に取ればいい', note: '次に会う日が決まっているから成り立つ会話' },

];
