/**
 * BANK — The Delivery Room / 分娩室
 *
 * この部屋で実際に飛ぶ英語を、飛ぶ順に全部入れる。
 * 陣痛が始まる → 病院に電話 → 受付 → トリアージ → 内診 → モニター → 麻酔 →
 * いきむ → 生まれる → 直後 → 付き添いの英語。
 *
 * Station の必須6文はこの中から抜いたもの。ここは総量の側で、上限を置かない。
 */

import type { LifePhrase } from '../../lifeline-types';

export const DELIVERY_ROOM_BANK: LifePhrase[] = [

    // ---- 陣痛が始まる。家の中 ----
    { en: "I think my water just broke.", ja: '破水したかも', note: 'water breaks。この一文で全部が動き出す' },
    { en: "It's been about an hour of steady contractions.", ja: '規則的な陣痛が1時間くらい続いてる', note: 'steady。規則的という意味。不規則は irregular' },
    { en: "They're about five minutes apart now.", ja: 'いま5分間隔くらい', note: '間隔は apart。病院に行く目安が5-1-1(5分間隔・1分続く・1時間)' },
    { en: "That one was a big one.", ja: '今のは強かった', note: '陣痛を one で受ける。名前を言わなくていい' },
    { en: "Time it. Start now.", ja: '測って。今から', note: 'time が動詞。陣痛の計測はこの語' },
    { en: "Grab the bag by the door.", ja: 'ドアのとこのバッグ持って', note: 'the bag。入院バッグは定冠詞だけで通じる' },
    { en: "Should we head in?", ja: 'もう病院行く？', note: 'head in。病院へ向かうこと' },
    { en: "Let's give it another twenty minutes.", ja: 'あと20分様子見よう', note: 'give it 〜。待つときの言い方' },
    { en: "I can't talk through them anymore.", ja: 'もう陣痛の間に喋れない', note: 'talk through 〜。喋れなくなったら病院へ、が目安' },
    { en: "Call the on-call doctor.", ja: '当直の先生に電話して', note: 'on-call。夜間の担当医' },

    // ---- 病院に電話 ----
    { en: "This is Yuko Aida, I'm a patient of Dr. Halberg.", ja: '相田ユウコです。ハルバーグ先生にかかっています', note: 'a patient of 〜。電話の第一声はこの形' },
    { en: "I'm thirty-nine weeks.", ja: '39週です', note: '週数を先に言う。以後の判断が全部これで決まる' },
    { en: "How long have they been coming?", ja: 'どれくらい前から来ていますか', note: 'come。陣痛が来るのはこの動詞' },
    { en: "Is the baby moving?", ja: '胎動はありますか', note: '必ず聞かれる。答えは Yes, a lot. / Less than usual.' },
    { en: "Go ahead and come in.", ja: '来てください', note: 'go ahead and 〜。指示を柔らかくする定型' },
    { en: "Come to the labor and delivery entrance.", ja: '産科の入口から来てください', note: 'labor and delivery。夜は救急とは別の入口' },

    // ---- 受付・トリアージ ----
    { en: "We're here for labor and delivery.", ja: '出産で来ました', note: '受付でこの一文。それ以上要らない' },
    { en: "Do you have your hospital bracelet from pre-registration?", ja: '事前登録のリストバンドはお持ちですか', note: 'pre-registration。妊娠後期に済ませておく手続き' },
    { en: "We're going to put you in triage first.", ja: 'まず観察室に入っていただきます', note: 'triage。まだ入院ではない。ここで帰される場合もある' },
    { en: "Let's get you changed into a gown.", ja: '検査着に着替えてください', note: 'get you changed。病院の指示はこの形が多い' },
    { en: "I need to check your cervix.", ja: '内診します', note: 'check your cervix。内診の直接的な言い方' },
    { en: "You're three centimeters, seventy percent effaced.", ja: '3センチ、展退70%です', note: 'effaced。子宮頸管が薄くなること。開き(cm)とセットで言われる' },
    { en: "The baby is at minus one station.", ja: '児頭の位置はマイナス1です', note: 'station。赤ちゃんの下がり具合。マイナスからプラスへ進む' },
    { en: "We're going to walk you for an hour and recheck.", ja: '1時間歩いてもう一度診ます', note: 'walk you。歩かせて進行を促す' },
    { en: "If you don't progress, we'll send you home.", ja: '進まなければ一度帰ってもらいます', note: 'progress。進行するの意' },
    { en: "You're being admitted.", ja: '入院になります', note: 'be admitted。この一言で部屋が決まる' },

    // ---- 病室・モニター ----
    { en: "We're going to hook you up to the monitors.", ja: 'モニターを付けますね', note: 'hook up to 〜。機器につなぐ' },
    { en: "This one tracks the baby, this one tracks contractions.", ja: 'こっちが胎児、こっちが陣痛の記録です', note: 'track。2本のベルトの説明は必ずこれ' },
    { en: "Try not to move too much or we'll lose the trace.", ja: '動きすぎると波形が拾えなくなります', note: 'lose the trace。よく言われる' },
    { en: "I'm going to start an IV.", ja: '点滴を入れます', note: 'start an IV。アイ・ヴィーと読む' },
    { en: "Small pinch.", ja: 'ちくっとしますよ', note: '注射・採血の合図。全部これ' },
    { en: "You can have ice chips, but nothing to drink.", ja: '氷はいいですが飲み物は駄目です', note: '手術になる可能性があるため。理由は聞けば教えてくれる' },
    { en: "Do you want the lights down?", ja: '照明を落としますか', note: 'lights down。頼んでいい' },
    { en: "Whatever you need, just hit the call button.", ja: '何かあればナースコールを押してください', note: 'hit the call button。押していい。遠慮する場面ではない' },

    // ---- 陣痛の中 ----
    { en: "Breathe through it.", ja: '呼吸で乗り切って', note: 'breathe through 〜。付き添いが一番言う一文' },
    { en: "In through your nose, out through your mouth.", ja: '鼻から吸って口から吐いて', note: '呼吸の指示。順番はこれで固定' },
    { en: "You're doing great.", ja: 'すごくいいですよ', note: '中身はないが、効く。看護師が何十回も言う' },
    { en: "One at a time. Just this one.", ja: '一つずつ。今のこれだけ', note: '先を考えさせない言い方' },
    { en: "Do you want counter-pressure on your back?", ja: '腰を押しましょうか', note: 'counter-pressure。腰の痛みに一番効く' },
    { en: "Lower. Harder.", ja: 'もっと下。もっと強く', note: '2語で指示する。この場面では文にしない' },
    { en: "I need to change positions.", ja: '体勢を変えたい', note: 'change positions。頼んでいい' },
    { en: "Let's try you on your left side.", ja: '左を下にしてみましょう', note: 'on your left side。胎児の心拍が落ちたときの定番' },
    { en: "Can we get the birthing ball?", ja: 'バランスボールをもらえますか', note: 'birthing ball。ほぼどの病院にもある' },
    { en: "That was a long one.", ja: '今の長かったね', note: '付き添いのモニターの読み方。声に出すと本人が楽になる' },
    { en: "You're peaking. It's coming down now.", ja: 'いま山。もう下がってく', note: 'peak / come down。波形を実況する' },

    // ---- 麻酔 ----
    { en: "Do you want to talk about pain management?", ja: '痛みの管理について話しますか', note: 'pain management。麻酔の話はこの語から始まる' },
    { en: "I'd like the epidural.", ja: '硬膜外麻酔をお願いします', note: 'the epidural。冠詞は the。頼み方はこれだけでいい' },
    { en: "I want to try without it as long as I can.", ja: 'できるところまで無しでやってみたい', note: '無痛を選ばない意思表示。後から変えていい' },
    { en: "It's not too late to change your mind.", ja: '今からでも変えられますよ', note: '看護師が必ず言う。変えていい' },
    { en: "Anesthesia is on the way.", ja: '麻酔科の医師が向かっています', note: 'on the way。到着まで20分かかることがある' },
    { en: "Curl forward like a shrimp.", ja: 'えびみたいに丸くなって', note: '硬膜外麻酔の姿勢。本当にこう言われる' },
    { en: "Don't move, even if you get a contraction.", ja: '陣痛が来ても動かないで', note: '針を刺している間の指示。最も重要' },
    { en: "You'll feel pressure, not pain.", ja: '圧迫感はありますが痛みはありません', note: 'pressure, not pain。麻酔後の説明の定型' },
    { en: "Your legs are going to feel heavy.", ja: '脚が重くなります', note: 'heavy。しびれではなく重さで表現する' },
    { en: "Push the button if it starts wearing off.", ja: '効きが切れてきたらボタンを押して', note: 'wear off。自分で追加できる装置がある' },
    { en: "I can still feel it on my right side.", ja: '右側はまだ感じます', note: '片側だけ効かないことがある。必ず言う' },

    // ---- 進行 ----
    { en: "You're at seven.", ja: '7センチです', note: '単位を言わない。数字だけで通じる' },
    { en: "You're complete.", ja: '全開です', note: 'complete = 10センチ。この一言でいきむ段階に入る' },
    { en: "We're going to break your water.", ja: '人工破膜をします', note: 'break your water。進行が止まったときの処置' },
    { en: "We'll start a little Pitocin to help things along.", ja: '陣痛促進剤を少し入れます', note: 'Pitocin。促進剤の商品名がそのまま使われる' },
    { en: "The baby's heart rate dropped a little.", ja: '胎児の心拍が少し落ちました', note: 'heart rate dropped。落ち着いた声で言われるが重要な情報' },
    { en: "We're going to give you some oxygen.", ja: '酸素を入れます', note: '心拍が落ちたときの最初の対応' },
    { en: "Everything looks good.", ja: '問題ありません', note: 'looks good。この一言で家族の空気が変わる' },

    // ---- いきむ ----
    { en: "Okay, let's do a practice push.", ja: 'では一度、練習でいきんでみましょう', note: 'practice push。本番の前に1回やる' },
    { en: "Chin to your chest.", ja: 'あごを引いて', note: 'chin to your chest。いきむときの基本姿勢' },
    { en: "Hold it — one, two, three, four...", ja: 'そのまま。1、2、3、4…', note: '10まで数える。3回繰り返すのが1セット' },
    { en: "Take a quick breath and go again.", ja: '一度吸って、もう一回', note: 'go again。繰り返しの合図' },
    { en: "Rest between contractions.", ja: '陣痛の間は休んで', note: 'rest between 〜。休んでいい時間がある' },
    { en: "I can see the head.", ja: '頭が見えます', note: 'see the head。この一文で部屋の空気が変わる' },
    { en: "Do you want a mirror?", ja: '鏡、見ますか', note: "断っていい。No, I'm good. で足りる" },
    { en: "Reach down and feel.", ja: '手を伸ばして触ってみて', note: 'reach down。任意。断ってもいい' },
    { en: "Small pushes now. Little ones.", ja: '今は小さくいきんで', note: '会陰を守るための指示。急に切り替わる' },
    { en: "Stop pushing. Just breathe.", ja: 'いきむのをやめて。呼吸だけ', note: '臍帯が巻いている場合など。必ず従う' },
    { en: "Here she comes.", ja: '出てきます', note: 'here she comes。実況の定型' },

    // ---- 緊急のとき ----
    { en: "We may need to talk about a C-section.", ja: '帝王切開の話をする必要があるかもしれません', note: 'C-section。この語が出たら決断が近い' },
    { en: "This isn't an emergency, but we don't want to wait.", ja: '緊急ではありませんが、待ちたくはありません', note: '医師の温度が一番わかる言い方' },
    { en: "I need you to sign this consent.", ja: '同意書に署名をお願いします', note: 'consent。読む時間が無くても、何の同意かは聞いていい' },
    { en: "Dad, you'll wait here until we call you.", ja: 'お父さんは呼ぶまでここで待っていてください', note: '手術室に入る前。付き添いが最も動揺する一文' },
    { en: "You're going to feel a lot of tugging.", ja: '引っ張られる感じが強くします', note: 'tugging。帝王切開中の感覚の説明' },

    // ---- 生まれた直後 ----
    { en: "Time of birth, four eighteen.", ja: '出生時刻、4時18分', note: '声に出して記録する。全員が聞く' },
    { en: "Dad, do you want to cut the cord?", ja: 'お父さん、へその緒を切りますか', note: '断っても全く問題ない' },
    { en: "We're going to put her right on your chest.", ja: 'そのまま胸に乗せますね', note: 'skin to skin。カンガルーケアのこと' },
    { en: "Apgar of nine.", ja: 'アプガー9点', note: 'Apgar。生後1分と5分に付ける点数' },
    { en: "She's got a good set of lungs.", ja: 'いい声で泣いてますね', note: 'a good set of lungs。よく泣く子への定番の褒め方' },
    { en: "Seven pounds, two ounces.", ja: '3230グラムです', note: 'ポンドとオンス。日本語に変換せず、この単位で覚える' },
    { en: "Twenty inches long.", ja: '身長50.8センチ', note: 'inch。身長もインチで言う' },
    { en: "Does she have a name?", ja: 'お名前は決まっていますか', note: '直後に必ず聞かれる。まだなら Not yet. でいい' },
    { en: "We're just going to do a quick check.", ja: '簡単な確認をします', note: '新生児の初期評価。数分で戻ってくる' },
    { en: "I'm going to deliver the placenta now.", ja: '胎盤を出します', note: 'deliver the placenta。出産はここまでで終わり' },
    { en: "You're going to feel some cramping.", ja: '子宮の収縮で痛みが来ます', note: 'cramping。産後の後陣痛' },
    { en: "I need to put in a couple of stitches.", ja: '数針縫います', note: 'stitches。縫合。ほとんどの人が経験する' },

    // ---- 付き添いと家族 ----
    { en: "Can I get you anything?", ja: '何かいる？', note: '付き添いが一番言うべき一文。中身は何でもいい' },
    { en: "You're almost there.", ja: 'もうすぐだよ', note: '励ましの定型。使いすぎない方がいい' },
    { en: "Don't leave.", ja: '行かないで', note: '2語。この場面で一番使われる文の一つ' },
    { en: "I'm not going anywhere.", ja: 'どこにも行かないよ', note: '上の返し。これで固定されている' },
    { en: "Should I call your mom?", ja: 'お母さんに電話する？', note: 'いつ誰に連絡するかは、先に決めておく' },
    { en: "We'll send pictures when we're ready.", ja: '落ち着いたら写真送るね', note: "when we're ready。急かされないための一文" },
    { en: "No visitors for a couple of hours.", ja: '数時間は面会をご遠慮ください', note: '断っていい。看護師に頼めば代わりに言ってくれる' },
    { en: "Get some sleep while she sleeps.", ja: '寝てる間に寝ておいて', note: '看護師が付き添いに言う。以後3年、これが正解' },
    { en: "Congratulations, you two.", ja: 'おめでとうございます', note: 'you two。夫婦に向けて言う形' },

    // ---- 部屋を移る ----
    { en: "We're moving you to postpartum.", ja: '産後病棟へ移ります', note: 'postpartum。産後の病棟' },
    { en: "Someone will be in every two hours to check on you.", ja: '2時間おきに様子を見に来ます', note: 'check on you。夜も来る' },
    { en: "Try to pee within the first four hours.", ja: '4時間以内に排尿してください', note: '本当に確認される。産後の重要項目' },
    { en: "Do you want me to take her to the nursery?", ja: '新生児室で預かりましょうか', note: 'nursery。預けていい。休むために使う' },
    { en: "I'd rather keep her with me.", ja: 'そばに置いておきたいです', note: 'rooming-in。どちらでもいい' },
];
