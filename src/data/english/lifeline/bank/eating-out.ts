/**
 * BANK — Eating Out / レストランの注文と会計
 *
 * 入店 → 席 → 飲み物 → 注文 → 途中 → 苦情 → デザート → 会計 → チップ → 退店。
 * カウンター(ordering-at-the-counter)と違い、こちらは **人が席まで来る** 店の英語。
 * 会話の往復があるぶん、聞き取りの負荷が一段上がる。
 */

import type { LifePhrase } from '../../lifeline-types';

export const EATING_OUT_BANK: LifePhrase[] = [

    // ---- 入店・席 ----
    { en: "Two for dinner, please.", ja: '2名、夕食で', note: '人数 + for + 食事。入店の第一声はこれで足りる' },
    { en: "Do you have a reservation?", ja: 'ご予約はございますか', note: '答えは Under Aida. / No, we don\'t.' },
    { en: "It's under Aida.", ja: '相田で取っています', note: 'under + 名字。予約の言い方は全部これ' },
    { en: "How long is the wait?", ja: 'どれくらい待ちますか', note: 'the wait。名詞で使う' },
    { en: "About twenty minutes.", ja: '20分ほどです', note: '実際は30分。読み替えていい' },
    { en: "We'll text you when your table's ready.", ja: '席ができたらメッセージします', note: '呼び出しは携帯に来る店が増えた' },
    { en: "Can we sit outside?", ja: '外の席にできますか', note: 'patio。テラス席は patio とも言う' },
    { en: "Is there a booth open?", ja: 'ボックス席は空いていますか', note: 'booth。壁際の箱型の席。人気がある' },
    { en: "Anywhere is fine.", ja: 'どこでも大丈夫です', note: '案内を早める一文' },
    { en: "Right this way.", ja: 'こちらへどうぞ', note: '案内の定型。ついていくだけ' },
    { en: "Is this table OK?", ja: 'こちらの席でよろしいですか', note: '嫌なら Could we take that one instead? と言える' },
    { en: "Could we move? It's a little loud here.", ja: '席を替えられますか。ここ少しうるさくて', note: '理由を1つ添えると通る' },
    { en: "Someone will be right with you.", ja: '担当がすぐ参ります', note: 'be right with you。待つ合図' },

    // ---- 担当・飲み物 ----
    { en: "Hi, I'm Casey, I'll be taking care of you tonight.", ja: 'ケイシーです。本日担当します', note: '担当が名乗る。名前を覚えると呼びやすい' },
    { en: "Can I start you off with something to drink?", ja: 'まずお飲み物はいかがですか', note: 'start you off with 〜。最初の質問はこれ' },
    { en: "Just water, thanks.", ja: 'お水だけで', note: '一番使う。無料' },
    { en: "Tap is fine.", ja: '水道水で大丈夫です', note: 'tap water。有料のボトル水を避ける一文' },
    { en: "What do you have on draft?", ja: '生ビールは何がありますか', note: 'on draft。樽生' },
    { en: "I'll have an iced tea, unsweetened.", ja: 'アイスティー、砂糖なしで', note: '南部は黙っていると甘い。必ず言う' },
    { en: "Do you have a happy hour?", ja: 'ハッピーアワーはありますか', note: '時間帯で半額になる。聞かないと出ない' },
    { en: "Can I see the wine list?", ja: 'ワインリストをお願いします', note: '別冊のことが多い' },
    { en: "What's your house red?", ja: 'ハウスの赤は何ですか', note: 'house 〜。一番安い銘柄' },
    { en: "I'll do a refill on that.", ja: 'おかわりお願いします', note: 'refill。ソフトドリンクは無料の店が多い' },
    { en: "Can we get some more water?", ja: 'お水もう少しもらえますか', note: 'some more。複数回頼んでいい' },

    // ---- 注文 ----
    { en: "Do you need another minute?", ja: 'もう少しお時間必要ですか', note: "答えは Yes, please. / We're ready." },
    { en: "Can you give us a minute?", ja: '少し待ってもらえますか', note: 'a minute。実際は5分でいい' },
    { en: "We're ready to order.", ja: '注文お願いします', note: '呼び止める一文。手を挙げなくていい' },
    { en: "I'll have the salmon.", ja: 'サーモンをお願いします', note: 'I\'ll have 〜。注文で一番自然' },
    { en: "I'll do the same.", ja: '同じものを', note: '2人目の注文。楽で自然' },
    { en: "What comes with that?", ja: 'それには何が付きますか', note: 'come with 〜。付け合わせの確認' },
    { en: "Can I substitute the fries?", ja: 'ポテトを別のものに替えられますか', note: 'substitute。差額が出ることがある' },
    { en: "How is that prepared?", ja: 'それはどう調理されますか', note: 'prepared。焼きか揚げかを聞く' },
    { en: "Is that a large portion?", ja: '量は多いですか', note: 'portion。量の話はこの語' },
    { en: "We're going to share.", ja: 'シェアします', note: '取り皿を持ってきてくれる' },
    { en: "Can we get an extra plate?", ja: '取り皿もらえますか', note: 'extra plate。シェアの必需品' },
    { en: "We'll start with the wings.", ja: 'まず手羽をお願いします', note: 'start with 〜。前菜の頼み方' },
    { en: "How spicy is it, one to ten?", ja: '辛さは10段階でどれくらいですか', note: '基準が店で違うので数字で聞く' },
    { en: "Nothing with peanuts — it's an allergy.", ja: 'ピーナッツは駄目です。アレルギーです', note: 'it\'s an allergy を足すと厨房に伝わる' },
    { en: "Is there anything without dairy?", ja: '乳製品なしのものはありますか', note: 'without 〜。除去の言い方' },
    { en: "I'll take the check whenever.", ja: '伝票はいつでも大丈夫です', note: '早めに言うと回転が良くなる' },
    { en: "Excellent choice.", ja: 'いいですね', note: '店員の相槌。中身はない' },
    { en: "I'll get that started for you.", ja: 'すぐお出しします', note: '注文を厨房に通す合図' },

    // ---- 途中 ----
    { en: "How is everything?", ja: 'お味はいかがですか', note: '料理の途中で必ず来る。Great, thanks. で足りる' },
    { en: "Can I get you anything else?", ja: '他に何かお持ちしますか', note: "断るなら We're good, thanks." },
    { en: "Could we get some napkins?", ja: 'ナプキンもらえますか', note: '頼まないと出ない店がある' },
    { en: "Can I get a to-go box?", ja: '持ち帰り用の容器をください', note: 'to-go box。残すのは全く恥ずかしくない' },
    { en: "Would you like me to box that up?", ja: 'お包みしましょうか', note: 'box up。店員から言われることも多い' },
    { en: "Where's the restroom?", ja: 'お手洗いはどこですか', note: 'restroom。bathroom も使う。toilet は言わない' },
    { en: "We're still working on it.", ja: 'まだ食べています', note: '皿を下げられそうなときの一文' },
    { en: "You can take that.", ja: 'それ、下げてもらって大丈夫です', note: '皿を下げてもらう合図' },

    // ---- 苦情 ----
    { en: "This isn't what I ordered.", ja: '注文したものと違います', note: '事実だけ言う。責めない' },
    { en: "I asked for medium, this is well done.", ja: 'ミディアムで頼みましたが、よく焼けています', note: '比較で言うと伝わる' },
    { en: "Could you throw this back on the grill?", ja: 'もう少し焼いてもらえますか', note: 'throw it back on 〜。焼き足しの頼み方' },
    { en: "It came out cold.", ja: '冷めて出てきました', note: 'come out。料理が出てくること' },
    { en: "There's something in my salad.", ja: 'サラダに何か入っています', note: '穏やかな言い方。それで伝わる' },
    { en: "No rush, but we've been waiting a while.", ja: '急ぎませんが、少し待っています', note: 'No rush, but 〜。角が立たない催促' },
    { en: "I'm so sorry about that — let me take care of it.", ja: '申し訳ありません。すぐ対応します', note: 'take care of it。店員の謝罪の定型' },
    { en: "I'll take that off the check.", ja: '会計から引いておきます', note: 'take off the check。実際によくやってくれる' },
    { en: "That's really not necessary.", ja: 'そこまでしていただかなくても', note: '返金や無料を申し出られたときの返し' },

    // ---- デザート・締め ----
    { en: "Did you save room for dessert?", ja: 'デザートは入りますか', note: 'save room。定型の勧め方' },
    { en: "We're stuffed.", ja: 'もうお腹いっぱいです', note: 'stuffed。満腹の一番自然な語' },
    { en: "Maybe next time.", ja: 'また今度で', note: '断りの定型。角が立たない' },
    { en: "We'll split one.", ja: '1つを分けます', note: 'split one。デザートの定番' },
    { en: "Two forks, please.", ja: 'フォークを2本ください', note: 'シェアする合図。これだけで通じる' },
    { en: "Just the check, thanks.", ja: '会計だけお願いします', note: '締めの一文' },

    // ---- 会計 ----
    { en: "Together or separate?", ja: 'ご一緒ですか、別々ですか', note: '答えは Separate, please. / All together.' },
    { en: "Can you split it three ways?", ja: '3等分にできますか', note: 'split 〜 ways。人数で割る' },
    { en: "Put it all on this one.", ja: '全部このカードで', note: 'put it on 〜。まとめて払う' },
    { en: "I've got this.", ja: 'ここは自分が出します', note: 'おごる一文。最短で自然' },
    { en: "Let me get it this time.", ja: '今回は自分に出させて', note: '交互に払う関係の言い方' },
    { en: "Next one's on me.", ja: '次は自分が持つよ', note: 'on me。おごりの定型' },
    { en: "Whenever you get a chance.", ja: '手が空いたときで大丈夫です', note: '伝票を頼むときの丁寧な形' },
    { en: "Is gratuity included?", ja: 'チップは含まれていますか', note: '6人以上だと自動で入っていることがある' },
    { en: "There's an eighteen percent auto-grat for parties of six.", ja: '6名以上は18%のチップが自動で入ります', note: 'auto-grat。伝票の下に小さく書いてある' },
    { en: "I'll take it whenever you're ready.", ja: '準備ができたらお願いします', note: '店員が伝票を置くときの一文' },
    { en: "No rush at all.", ja: '全然急がなくて大丈夫です', note: '受け取ったあとに返す一言' },

    // ---- チップ ----
    { en: "What did you leave?", ja: 'いくら置いた？', note: '連れとの確認。金額の話は普通にする' },
    { en: "Twenty is standard now.", ja: '今は20%が普通', note: '相場の話。都市部は20-22%' },
    { en: "Round it up to sixty.", ja: '60ドルちょうどにしとこう', note: 'round it up。計算を簡単にする' },
    { en: "The service was great.", ja: 'サービスが良かった', note: 'チップを多めにする理由' },
    { en: "Did you sign the slip?", ja: '伝票にサインした？', note: 'slip。カードの控え。サインしないと確定しない' },
    { en: "Keep the change.", ja: 'お釣りは結構です', note: '現金のとき' },

    // ---- 退店 ----
    { en: "Thanks, everything was great.", ja: 'ありがとう、全部おいしかったです', note: '出るときに1回言う。それで十分' },
    { en: "We'll be back.", ja: 'また来ます', note: '社交辞令として了解されている' },
    { en: "Have a good night.", ja: 'それでは', note: '夜の別れ。昼は Have a good one.' },
    { en: "Do you validate parking?", ja: '駐車券の認証はありますか', note: 'validate。都市部では必須の一文' },
    { en: "Can we get the car brought around?", ja: '車を回してもらえますか', note: 'valet のある店。bring the car around' },

    // ---- 予約・電話 ----
    { en: "I'd like to make a reservation for Friday at seven.", ja: '金曜の7時に予約したいのですが', note: '曜日 + 時刻。この順で言う' },
    { en: "For how many?", ja: '何名様ですか', note: '答えは Four. だけでいい' },
    { en: "Is there anything earlier?", ja: 'もっと早い時間は空いていますか', note: '空いていない時間を言われたとき' },
    { en: "We can put you on the waitlist.", ja: 'キャンセル待ちに入れます', note: 'waitlist。連絡が来ることがある' },
    { en: "I need to cancel my reservation.", ja: '予約をキャンセルしたいのですが', note: '直前だと料金がかかる店もある' },
    { en: "Is there a dress code?", ja: '服装の決まりはありますか', note: 'dress code。高い店では聞いておく' },
    { en: "Are you kid-friendly?", ja: '子ども連れでも大丈夫ですか', note: 'kid-friendly。高椅子の有無も含む' },
    { en: "Do you have high chairs?", ja: 'ベビーチェアはありますか', note: 'high chair。子連れの必須質問' },
];
