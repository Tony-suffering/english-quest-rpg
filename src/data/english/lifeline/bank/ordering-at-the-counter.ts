/**
 * BANK — Ordering at the Counter / レジと注文
 *
 * 大人が一番回数を踏む窓口。ドライブスルー・カフェ・スーパー・コンビニ・薬局のレジ。
 * 教科書に一度も出ないのに、アメリカで最も多く発話する英語がここにある。
 * 飛ぶ順に入れる: 呼ばれる → 注文 → カスタム → 追加 → 終える → 支払い → 受け取り → トラブル。
 */

import type { LifePhrase } from '../../lifeline-types';

export const ORDERING_BANK: LifePhrase[] = [

    // ---- 呼ばれる・並ぶ ----
    { en: "Next in line.", ja: '次の方どうぞ', note: '呼ばれ方。返事は要らない。進むだけ' },
    { en: "I can help whoever's next.", ja: '次の方どうぞ', note: 'whoever\'s next。列が複数のときの呼び方' },
    { en: "Are you in line?", ja: '並んでますか', note: '曖昧な列で必ず要る。答えは Yeah. / No, go ahead.' },
    { en: "Go ahead, I'm still deciding.", ja: 'どうぞ、まだ決めてないので', note: '順番を譲る。決まっていないときの逃げ道' },
    { en: "Take your time.", ja: 'ゆっくりどうぞ', note: '店員も客も使う。急かさない合図' },
    { en: "Whenever you're ready.", ja: '決まったらどうぞ', note: '店員が待つときの定型' },
    { en: "I'm just looking, thanks.", ja: '見てるだけです', note: '声をかけられたときの断り。棚の前で一生使う' },
    { en: "Two, please.", ja: '2つで', note: '数だけ言えば通じる場面が多い' },

    // ---- 注文の本体 ----
    { en: "Can I get a medium coffee?", ja: 'コーヒーのMをください', note: 'Can I get 〜。アメリカの注文はほぼこれ' },
    { en: "I'll take the number three.", ja: '3番セットで', note: 'I\'ll take 〜。セットは番号で言う' },
    { en: "I'll do the combo.", ja: 'セットで', note: 'do を動詞に使う。注文でよく出る' },
    { en: "Just the sandwich, no combo.", ja: '単品で。セットじゃなくて', note: 'just 〜, no 〜。引き算の言い方' },
    { en: "Make it a large.", ja: 'それLで', note: 'make it 〜。あとから変更する形' },
    { en: "Same thing as last time.", ja: '前と同じで', note: '常連の一文。記録が残っている店で効く' },
    { en: "What do you recommend?", ja: 'おすすめは何ですか', note: '迷ったとき。会話も生まれる' },
    { en: "What's in that?", ja: 'それ、何が入ってますか', note: '中身を聞く最短の形' },
    { en: "Is that spicy?", ja: 'それ辛いですか', note: '辛さの基準は店で違う。必ず聞く' },
    { en: "How big is the small?", ja: 'Sってどれくらいの大きさですか', note: '本当に必要。アメリカのSは日本のLに近い' },
    { en: "Is it enough for two?", ja: '2人でシェアできますか', note: '量を聞く形。ほぼ Yes と返る' },
    { en: "What's the soup today?", ja: '今日のスープは何ですか', note: 'the soup today。日替わりの聞き方' },
    { en: "Can I see a menu?", ja: 'メニューもらえますか', note: 'カウンターでも頼める' },

    // ---- カスタム・変更 ----
    { en: "No onions, please.", ja: '玉ねぎ抜きで', note: 'no 〜。抜きはこれだけ' },
    { en: "Light ice.", ja: '氷少なめで', note: 'light。少なめは less より light' },
    { en: "No ice at all.", ja: '氷なしで', note: 'at all を足すと確実に伝わる' },
    { en: "Extra cheese.", ja: 'チーズ多めで', note: 'extra。追加は全部この語' },
    { en: "On the side, please.", ja: '別添えでお願いします', note: 'on the side。ソース・ドレッシングの定番' },
    { en: "Can you hold the mayo?", ja: 'マヨ抜きにできますか', note: 'hold 〜。厨房に通る言い方' },
    { en: "Swap the fries for a salad?", ja: 'ポテトをサラダに替えられますか', note: 'swap A for B。差額が出ることがある' },
    { en: "Is there a charge for that?", ja: 'それ、追加料金かかりますか', note: '変更のたびに聞くと会計が読める' },
    { en: "Can you make it decaf?", ja: 'カフェインレスにできますか', note: 'decaf。夕方に必ず使う' },
    { en: "Oat milk, if you have it.", ja: 'あればオーツミルクで', note: 'if you have it。無理のない頼み方' },
    { en: "Not too hot, please.", ja: '熱すぎないようにお願いします', note: '子ども用の飲み物で使う' },
    { en: "Cut in half, please.", ja: '半分に切ってください', note: 'シェアするとき。頼めば切ってくれる' },
    { en: "Can you leave the sauce off?", ja: 'ソースなしにできますか', note: 'leave 〜 off。hold と同じ意味' },
    { en: "Well done, please.", ja: 'よく焼いてください', note: '焼き加減。rare / medium / well done' },
    { en: "Whatever's easiest.", ja: 'やりやすい方で', note: '相手に判断を渡す。店員が助かる一文' },

    // ---- 追加・終わり ----
    { en: "Anything else?", ja: '他にご注文は', note: '必ず聞かれる。答えは That\'s it. か Actually, yeah —' },
    { en: "That's it, thanks.", ja: '以上です', note: '注文を終わらせる一文。これが言えないと止まる' },
    { en: "That'll do it.", ja: 'それで全部です', note: 'That\'s it. の言い換え。少し大人びる' },
    { en: "Actually, add a water.", ja: 'あ、水も1つ足してください', note: 'actually。あとから足すときの枕' },
    { en: "Oh, and a bag, please.", ja: 'あと袋もください', note: 'oh, and 〜。思い出して足す形' },
    { en: "Can I add a cookie to that?", ja: 'それにクッキー足せますか', note: 'add 〜 to that。会計前なら足せる' },
    { en: "Scratch that.", ja: '今のなしで', note: '注文を取り消す最短の一文' },
    { en: "Sorry, I meant medium.", ja: 'すみません、Mでした', note: 'I meant 〜。言い間違いの訂正' },

    // ---- 店内か持ち帰りか ----
    { en: "For here or to go?", ja: '店内ですか、お持ち帰りですか', note: '必ず聞かれる。To go. だけで返せる' },
    { en: "To go, please.", ja: '持ち帰りで', note: 'take out より to go の方が普通' },
    { en: "For here.", ja: '店内で', note: '2語で終わる' },
    { en: "Actually, make it to go.", ja: 'やっぱり持ち帰りで', note: '途中変更。make it 〜' },
    { en: "Can I get a tray?", ja: 'トレーもらえますか', note: '店内で運ぶとき' },
    { en: "Can I get that in a bag?", ja: '袋に入れてもらえますか', note: '有料の州がある' },

    // ---- 名前・呼び出し ----
    { en: "Can I get a name for the order?", ja: 'お名前を伺えますか', note: 'カフェで必ず聞かれる。短い名前を用意しておく' },
    { en: "It's Sota. S-O-T-A.", ja: 'ソウタです。S-O-T-A', note: 'つづりまで先に言うと呼び間違いが減る' },
    { en: "They'll call your name.", ja: '名前をお呼びします', note: 'カウンターの前で待つ合図' },
    { en: "It'll be right up.", ja: 'すぐお出しします', note: 'right up。すぐ出るという意味' },
    { en: "We'll bring it out to you.", ja: '席までお持ちします', note: '番号札を渡されたときに言われる' },
    { en: "Order up!", ja: 'できました', note: '厨房から飛ぶ。名前が続く' },

    // ---- 支払い ----
    { en: "Debit or credit?", ja: 'デビットですか、クレジットですか', note: '同じカードでも聞かれる。Credit. が無難' },
    { en: "Credit, please.", ja: 'クレジットで', note: '1語で足りる' },
    { en: "Go ahead and insert your card.", ja: 'カードを差し込んでください', note: 'insert / tap / swipe の3つ' },
    { en: "You can tap.", ja: 'タッチで大丈夫です', note: 'tap。非接触決済' },
    { en: "It's asking for a PIN.", ja: '暗証番号を求められています', note: 'it\'s asking for 〜。機械を主語にする' },
    { en: "Do you want your receipt?", ja: 'レシートはいりますか', note: '要れば Yes, please.' },
    { en: "Email or printed?", ja: 'メールですか、紙ですか', note: 'レシートの形式。printed で足りる' },
    { en: "Do you have a rewards number?", ja: 'ポイント番号はお持ちですか', note: '無ければ I don\'t, thanks.' },
    { en: "Can I use this coupon?", ja: 'このクーポン使えますか', note: '期限切れでも通ることがある' },
    { en: "It didn't go through.", ja: '決済が通りませんでした', note: 'go through。カードが弾かれたとき' },
    { en: "Let me try another card.", ja: '別のカードで試します', note: '慌てない。よくあること' },
    { en: "Keep the change.", ja: 'お釣りは結構です', note: '現金のとき。チップの代わりになる' },
    { en: "Out of twenty.", ja: '20ドルからお預かりします', note: 'out of 〜。店員が現金を受け取る言い方' },
    { en: "Do you take cash?", ja: '現金は使えますか', note: 'カードのみの店が増えている' },
    { en: "Can I split it between two cards?", ja: '2枚のカードで分けられますか', note: '断られることもある' },
    { en: "I've got a gift card too.", ja: 'ギフトカードもあります', note: '先に出す。後からだと使えない' },
    { en: "What's my balance on this?", ja: 'これの残高はいくらですか', note: 'balance。ギフトカードの残り' },

    // ---- チップ画面 ----
    { en: "It's going to ask you a question.", ja: '画面に質問が出ます', note: 'チップ画面が出る前の予告。ほぼ必ず言われる' },
    { en: "Just hit no tip.", ja: 'チップなしを押してください', note: '押していい。カウンターなら普通' },
    { en: "Any button is fine.", ja: 'どれでも大丈夫です', note: '店員が気まずさを消すために言う' },
    { en: "Do you want to leave a tip?", ja: 'チップを入れますか', note: '直接聞かれることもある。No, thanks. でいい' },

    // ---- ドライブスルー ----
    { en: "Welcome in, go ahead when you're ready.", ja: 'ご注文どうぞ', note: 'ドライブスルーの第一声' },
    { en: "Give me one second.", ja: '少し待ってください', note: 'まだ決まっていないとき' },
    { en: "Can you repeat that?", ja: 'もう一度お願いします', note: 'スピーカーは本当に聞き取れない。遠慮なく使う' },
    { en: "Sorry, I couldn't hear you.", ja: 'すみません、聞こえませんでした', note: '正直に言う。相手も慣れている' },
    { en: "Your total is nine forty-two. Pull around.", ja: '9ドル42セントです。前へどうぞ', note: 'pull around。次の窓口へ進め' },
    { en: "First window, please.", ja: '最初の窓口へどうぞ', note: '支払いと受け取りが別窓口の店' },
    { en: "Can you pull up to the front?", ja: '前に停めて待ってもらえますか', note: '時間がかかる注文。番号札を渡される' },
    { en: "Have a good one.", ja: 'どうも', note: '別れの一言。Have a good day. の短い形' },

    // ---- スーパーのレジ ----
    { en: "Did you find everything OK?", ja: 'お探しのものは見つかりましたか', note: '100%言われる。I did, thanks. で返す' },
    { en: "Paper or plastic?", ja: '紙袋ですか、レジ袋ですか', note: '州によっては袋が有料' },
    { en: "I brought my own bags.", ja: 'マイバッグ持ってきました', note: 'my own bags。割引がある店もある' },
    { en: "Do you need help out?", ja: '車まで運びましょうか', note: '断るなら I\'m good, thanks.' },
    { en: "This one didn't scan.", ja: 'これ、読み取れません', note: 'scan を自動詞で使う' },
    { en: "Is this on sale?", ja: 'これセール中ですか', note: '棚の表示と違うことがある。聞いていい' },
    { en: "It rang up wrong.", ja: '値段が違って打たれています', note: 'ring up。レジに通すこと' },
    { en: "Can you do a price check?", ja: '値段を確認してもらえますか', note: 'price check。店内放送で流れる語' },
    { en: "I'll put this back.", ja: 'これ戻します', note: '会計の途中でやめるとき' },
    { en: "Go ahead, I only have a few things.", ja: 'どうぞ、少しだけなので', note: '列を譲る・譲られるときの定型' },

    // ---- セルフレジ ----
    { en: "Unexpected item in the bagging area.", ja: '袋詰めエリアに予期しない商品があります', note: '機械の音声。全米共通の呪文' },
    { en: "Please wait for assistance.", ja: '係員をお待ちください', note: 'この表示が出たら手を止める' },
    { en: "Can you clear this for me?", ja: 'これ解除してもらえますか', note: 'clear。係員を呼ぶときの一文' },
    { en: "I need an override.", ja: '解除操作をお願いします', note: 'override。酒や年齢確認で止まったとき' },
    { en: "Can I see your ID?", ja: '身分証を見せてもらえますか', note: '酒を買うと必ず来る。何歳でも聞かれる' },
    { en: "Skip bagging.", ja: '袋詰めをスキップ', note: '画面のボタン。押せると詰まらない' },

    // ---- トラブル・返品 ----
    { en: "I think you gave me the wrong one.", ja: '違うものが入っていると思います', note: 'I think を付けると角が立たない' },
    { en: "This isn't what I ordered.", ja: '頼んだものと違います', note: '事実だけ。責めない' },
    { en: "There's one missing.", ja: '1つ足りません', note: 'one missing。ドライブスルーで一番使う' },
    { en: "Could I get a new one? This one's cold.", ja: '作り直してもらえますか。冷めています', note: '理由を1つ添える。それで通る' },
    { en: "No worries, take your time.", ja: '大丈夫です、ゆっくりで', note: '待たされたときの返し。関係が良くなる' },
    { en: "Can I get a refund instead?", ja: '返金でお願いできますか', note: '作り直しを断る場合' },
    { en: "I'll just take the credit.", ja: '次回使える形で結構です', note: 'store credit。妥協案を自分から出す' },

    // ---- 締め ----
    { en: "Thanks, appreciate it.", ja: 'ありがとう、助かります', note: 'appreciate it。Thanks より一段温かい' },
    { en: "You're all set.", ja: 'これで完了です', note: '会計・手続きの終わりの合図。全米で使う' },
    { en: "Have a good one.", ja: 'それでは', note: '日中でも夜でも使える万能の別れ' },
    { en: "You too.", ja: 'そちらも', note: 'Have a good one. への唯一の返し' },
];
