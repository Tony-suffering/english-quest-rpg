/**
 * BANK — The Backyard BBQ / 裏庭のバーベキュー
 *
 * 誘われる → 何を持っていくか → 到着 → グリルと焼き加減 → 手伝う → 飲み物 →
 * ご近所の雑談(庭・試合・学校・渋滞) → 走り回る子ども → 食べられないもの →
 * 帰る → 次はうちで。アメリカのご近所付き合いは、ほぼ全部ここで起きている。
 *
 * この場の英語は、整った文より、断り方と流し方でできている。
 * 手伝いを断る、酒を断る、スポーツの話をかわす、帰る理由を作る。この4つが本体。
 */

import type { LifePhrase } from '../../lifeline-types';

export const BBQ_BANK: LifePhrase[] = [

    // ---- 誘われる、何を持っていくか ----
    { en: "We're throwing some burgers on Saturday, you should come by.", ja: '土曜にバーベキューやるから、よかったら来て', note: 'throw 〜 on。グリルに載せること。招待はだいたいこの軽さ' },
    { en: "Nothing fancy, just the neighbors.", ja: '大したことないよ。ご近所だけ', note: '身構えるなという合図。服装も普段着でいい' },
    { en: "What can I bring?", ja: '何か持っていこうか', note: '必ず聞く。手ぶら前提の文化ではない' },
    { en: "Just bring yourselves.", ja: '手ぶらで来て', note: '真に受けない。飲み物か甘い物は持っていく' },
    { en: "Okay, but I'm bringing something anyway.", ja: '分かった、でも何か持っていくね', note: 'anyway。相手の遠慮を軽く押し切る言い方' },
    { en: "If you want, a side or a six-pack.", ja: '持ってくるなら、付け合わせかビール半ダースで', note: 'a side は付け合わせの一品。持ち寄りの最小単位' },
    { en: "We've got plenty of food, so drinks are more helpful.", ja: '食べ物は足りてるから、飲み物のほうが助かる', note: '具体的に指定してくれた時は、そのとおりにする' },
    { en: "Is it a potluck, or are you cooking?", ja: '持ち寄り、それとも作ってくれるの', note: 'potluck。全員が一品ずつ持ってくる形式' },
    { en: "Starts around four, but come whenever.", ja: '4時からだけど、いつでもどうぞ', note: '時間は目安。ちょうどに行くと早すぎることが多い' },
    { en: "Should we bring the kids?", ja: '子ども連れて行っていい', note: '裏庭のバーベキューはほぼ全部連れて行っていい' },
    { en: "Absolutely, the more the merrier.", ja: 'もちろん。人が多いほうが楽しい', note: 'the more the merrier。誘いの定番の返し' },
    { en: "Rain date is Sunday.", ja: '雨なら日曜に順延', note: 'rain date。予備日。屋外の集まりには必ず付いてくる' },

    // ---- 到着 ----
    { en: "Come on in, the gate's open.", ja: '入ってきて。門開いてるから', note: '玄関ではなく裏庭の門から入るのが普通' },
    { en: "We're out back!", ja: '裏にいるよー', note: 'out back。裏庭。家の中から返ってくる声' },
    { en: "Hey! You made it.", ja: 'お、来たね', note: '到着した人への第一声。予定どおりでもこう言う' },
    { en: "We brought a little something.", ja: 'ちょっとしたもの持ってきた', note: '渡すときの決まり文句。中身の説明はいらない' },
    { en: "Oh, you didn't have to.", ja: 'そんな気を遣わなくてよかったのに', note: "You didn't have to は必ず言われる儀式。真に受けない" },
    { en: "Just set it on the table over there.", ja: 'そこのテーブルに置いといて', note: '渡した物はだいたい自分で置きに行く' },
    { en: "Coolers are by the deck.", ja: 'クーラーボックスはデッキのそば', note: 'cooler。氷を入れた箱。飲み物はここに集まる' },
    { en: "Have you met Rick? He's two houses down.", ja: 'リックとは会った。2軒先の人', note: 'two houses down。近所の場所はこの数え方で言う' },
    { en: "I don't think we've met. I'm Sota.", ja: '初めましてですよね。ソウタです', note: '名前だけで足りる。フルネームは名乗らない' },
    { en: "You're the ones who moved into the corner house.", ja: '角の家に越してきた人たちだよね', note: '近所では名前より家で覚えられている' },

    // ---- グリルと焼き加減 ----
    { en: "How do you want your burger?", ja: 'ハンバーガーの焼き加減は', note: '肉は必ず聞かれる。ここで固まる人が多い' },
    { en: "Medium's fine.", ja: 'ミディアムで', note: '一番無難。迷ったらこれで通る' },
    { en: "I'll take mine well done.", ja: '自分のはよく焼いてください', note: 'take mine 〜。自分の分だけの指定' },
    { en: "Cheese on that?", ja: 'チーズのせる', note: '短く聞かれる。Yes, please. だけで足りる' },
    { en: "It'll be another five minutes.", ja: 'あと5分くらいかかる', note: 'another 〜。まだこれから追加でかかる時間' },
    { en: "Careful, the plate's hot.", ja: '気をつけて、皿が熱い', note: '紙皿でなく金属皿の時に言われる' },
    { en: "Dogs are done, burgers are close.", ja: 'ホットドッグはできた。バーガーももうすぐ', note: 'dogs は hot dogs の省略。この場では必ず短く言う' },
    { en: "Grab a bun.", ja: 'パン取って', note: 'bun。バーガー用の丸パン。grab は取るの万能語' },
    { en: "Buns are in the bag on the table.", ja: 'パンは袋のままテーブルにある', note: '袋から出さずに置いてあるのが普通' },
    { en: "Anybody want the last one?", ja: '最後の1個いる人', note: '残りを捌くための声かけ。遠慮せず取っていい' },
    { en: "I've got veggie burgers too, if anyone wants one.", ja: 'ベジバーガーもあるよ、欲しい人いれば', note: '肉を食べない人がいる前提で用意されている' },
    { en: "Don't put those on the same side of the grill.", ja: 'それは同じ側で焼かないで', note: '肉と分けたい人が実際にいる。揉める前に言う' },

    // ---- 手伝う、断る ----
    { en: "Need a hand with anything?", ja: '何か手伝おうか', note: 'need a hand。手伝いの申し出はほぼこの形' },
    { en: "Nah, I got it.", ja: 'いや、大丈夫', note: 'I got it。断りの定番。押すのは2回までにする' },
    { en: "Actually, could you grab the ice?", ja: 'じゃあ氷取ってきてもらえる', note: '受けてくれた時は本当に頼んでいる。素直にやる' },
    { en: "Where do you want this?", ja: 'これどこに置く', note: '運んだ物の置き場所を聞く一文' },
    { en: "Anywhere's fine.", ja: 'どこでもいいよ', note: '本当にどこでもいい。悩まない' },
    { en: "I'll take the trash out later, don't worry about it.", ja: 'ゴミは後で出すから気にしないで', note: '片付けの申し出を断る言い方' },
    { en: "You're a guest, sit down.", ja: 'お客さんなんだから座ってて', note: '本気のことも社交辞令のこともある。1回は食い下がる' },
    { en: "Let me at least clear the plates.", ja: 'せめて皿だけ下げさせて', note: 'at least。全部は無理でもこれだけは、の言い方' },

    // ---- 飲み物 ----
    { en: "There's beer in the cooler, help yourself.", ja: 'クーラーにビールあるから好きに取って', note: 'help yourself。出してもらうのを待たない' },
    { en: "Anything without alcohol?", ja: 'お酒じゃないものある', note: '普通に聞いていい。必ず用意されている' },
    { en: "Water, lemonade, and there's soda for the kids.", ja: '水とレモネード。子ども用に炭酸も', note: 'soda。炭酸飲料。地域によっては pop とも言う' },
    { en: "I'm driving, so I'll stick with the water.", ja: '運転するので水にしときます', note: '運転を理由にすると誰も勧めてこない。最強の断り' },
    { en: "You good on that?", ja: 'それ足りてる', note: 'グラスを見て言う。おかわりいるかの意味' },
    { en: "I'm still working on this one.", ja: 'まだこれ飲んでる途中', note: 'おかわりを角を立てずに断る言い方' },
    { en: "Grab me one while you're up?", ja: '立つついでに1本取ってくれる', note: "while you're up。立っている人に頼む時の定型" },
    { en: "Ice is melting. I'll go get more.", ja: '氷溶けてきた。買ってくる', note: '途中で誰かが必ず買い足しに行く' },

    // ---- ご近所の雑談 / 庭 ----
    { en: "Your yard looks great.", ja: 'お庭きれいですね', note: 'ご近所の会話はまず庭から始まる。ほぼ確実に' },
    { en: "We finally got the sprinklers fixed.", ja: 'やっとスプリンクラー直したんだ', note: '家の直した話は、この場で一番受ける話題' },
    { en: "Who do you use for the lawn?", ja: '芝はどこに頼んでる', note: '業者の紹介がそのままご近所付き合いになる' },
    { en: "I do it myself, mostly to have an excuse to be outside.", ja: '自分でやってる。外に出る口実だね', note: '自虐まじりの返し。この軽さが求められている' },
    { en: "That tree's going to be a problem in a storm.", ja: 'あの木、嵐のとき危ないよ', note: '越境した枝は近所の揉め事の定番' },
    { en: "We had the deck redone last spring.", ja: '去年の春にデッキをやり直したんだ', note: 'have 〜 redone。業者にやってもらうこと' },
    { en: "How long have you guys been in the neighborhood?", ja: 'この辺どれくらい住んでるの', note: '初対面のご近所さんにほぼ必ず聞かれる' },

    // ---- ご近所の雑談 / 試合 ----
    { en: "You watching the game later?", ja: 'あとで試合見る', note: '主語を落とすのが普通。Are は言わない' },
    { en: "I've got it on in the garage if anybody wants.", ja: 'ガレージで流してるから見たい人はどうぞ', note: '実際ガレージで見る。裏庭文化の一部' },
    { en: "They're falling apart in the fourth.", ja: '第4クオーターで崩れてる', note: 'fall apart。試合内容が崩壊すること' },
    { en: "I don't really follow it, honestly.", ja: '正直あんまり見てないんだ', note: 'スポーツの話をかわす一文。これで嫌われることはない' },
    { en: "Who do you root for?", ja: 'どこのファンなの', note: 'root for。応援する。地元チームで答えると話が続く' },
    { en: "I just watch whatever's on.", ja: 'やってるやつを適当に見るだけ', note: '詳しくない側の安全な返し' },

    // ---- ご近所の雑談 / 学校 ----
    { en: "What grade is she in?", ja: '娘さん何年生', note: '子ども連れの会話は学年から入る' },
    { en: "She just started third.", ja: '3年生になったばかり', note: 'third で足りる。grade は省く' },
    { en: "Is she at Lincoln?", ja: 'リンカーン小学校に通ってるの', note: '学区名で相手の生活圏がだいたい分かる' },
    { en: "We're zoned for Lincoln, but we're on the waitlist for the magnet.", ja: '学区はリンカーンだけど、別の学校の順番待ち中', note: 'zoned for。その学区に割り当てられていること' },
    { en: "How do you like it over there?", ja: 'あそこはどう', note: '評判を聞く定番。over there で学校を指している' },
    { en: "The teachers are great. The parking is a disaster.", ja: '先生はいいけど駐車が最悪', note: '褒めてから落とす。この二段が会話を軽くする' },
    { en: "It gets better after the first year.", ja: '1年経てば楽になるよ', note: '先輩の親から必ず言われる慰め' },

    // ---- ご近所の雑談 / 渋滞と通勤 ----
    { en: "How's your commute?", ja: '通勤どれくらいかかる', note: '天気の次に安全な話題。誰でも答えられる' },
    { en: "Forty minutes if I leave before seven, an hour if I don't.", ja: '7時前に出れば40分、遅れたら1時間', note: '条件付きで答えると会話が続く' },
    { en: "They've been doing that construction for two years.", ja: 'あの工事、もう2年やってる', note: '道路工事の愚痴は全員が乗ってくる話題' },
    { en: "I just take the back way now.", ja: '今は裏道使ってる', note: 'the back way。渋滞を避ける抜け道' },
    { en: "Do you take the highway or surface streets?", ja: '高速で行く、それとも下道', note: 'surface streets。一般道' },
    { en: "Whatever the app tells me.", ja: 'アプリの言うとおりに行くだけ', note: '考えていないことを軽く言う。会話を締める便利な返し' },

    // ---- 走り回る子ども ----
    { en: "Slow down, guys!", ja: 'ちょっと、走らないで', note: '誰の子でも大人が普通に注意する' },
    { en: "Watch the grill!", ja: 'グリルに近づかないで', note: 'watch 〜。危ないものから離れろの意味になる' },
    { en: "They're fine, let them run.", ja: '大丈夫、走らせとけば', note: '親が言ったら気にしなくていいという合図' },
    { en: "Is he yours?", ja: 'あの子お宅の', note: '短く聞くのが普通。失礼にならない' },
    { en: "The one in the red shirt, yeah.", ja: '赤いシャツの子、そう', note: '服の色で子どもを指すのが一番早い' },
    { en: "They found the hose. Of course they did.", ja: 'ホース見つけたな。まあそうなるよね', note: 'Of course they did。予想どおりという皮肉の型' },
    { en: "Somebody's going home wet.", ja: '誰か濡れて帰ることになるね', note: '諦めまじりの一言。laughing で流す場面' },

    // ---- 食べられないもの ----
    { en: "Is there anything you don't eat?", ja: '食べられないものある', note: '事前に聞かれる。遠慮せずはっきり言う' },
    { en: "No pork for me, but everything else is fine.", ja: '豚だけ駄目です。他は大丈夫', note: '駄目なものを1つ言って、すぐ大丈夫を足す' },
    { en: "She's got a nut allergy, so we watch the desserts.", ja: 'ナッツアレルギーだから甘い物は気をつけてる', note: 'watch。気をつけて見ておくこと' },
    { en: "Is there dairy in this?", ja: 'これ乳製品入ってる', note: 'dairy。牛乳・チーズ・バターをまとめて指す' },
    { en: "I think there's sour cream in the dip.", ja: 'ディップにサワークリーム入ってると思う', note: 'I think を付けて断定を避ける。責任が減る' },
    { en: "I'll make you a plate without it.", ja: '抜きで取り分けとくよ', note: 'make you a plate。取り分けてあげること' },
    { en: "Don't go out of your way.", ja: 'わざわざしなくていいよ', note: "go out of one's way。手間をかけること" },

    // ---- 帰る ----
    { en: "We should probably get going.", ja: 'そろそろ帰ろうかな', note: '帰る合図。probably を入れると柔らかくなる' },
    { en: "Already? You just got here.", ja: 'もう。来たばかりじゃない', note: '必ず言われる。本気で止めているわけではない' },
    { en: "Yeah, it's a school night.", ja: '明日学校だからね', note: 'school night。翌日が平日。万能の帰る理由' },
    { en: "Take some food with you.", ja: '食べ物持って帰って', note: '断らずもらう。断ると押し問答が長引く' },
    { en: "Let me get you a plate.", ja: '取り分けるから待って', note: '残り物を持たせるのが最後の儀式' },
    { en: "Thanks for having us.", ja: '呼んでくれてありがとう', note: '帰り際の決まり文句。これを言わないと変に思われる' },
    { en: "This was great, really.", ja: '本当に楽しかった', note: 'really を最後に置くと社交辞令に聞こえない' },
    { en: "Drive safe.", ja: '気をつけて帰って', note: '見送りの定番。safely とは言わない' },

    // ---- 次はうちで ----
    { en: "Next one's at our place.", ja: '次はうちでやるよ', note: '呼ばれたら次は呼ぶ。これが続く仕組み' },
    { en: "We'll do it in a couple weeks once it cools off.", ja: '涼しくなったら2週間後くらいにやろう', note: 'once it cools off。暑さが落ち着いたら' },
    { en: "I'll text you.", ja: '連絡するね', note: '本気のことも社交辞令のこともある。来なければそれまで' },
    { en: "Sounds good, we're around most weekends.", ja: 'いいね。週末はだいたい家にいるよ', note: 'be around。特に予定なく家にいること' },
    { en: "Don't be a stranger.", ja: 'また顔出してよ', note: '直訳できない。疎遠にならないでね、という別れの一言' },

];
