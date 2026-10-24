/**
 * BANK — The Road Test / DMV の窓口と実技試験
 *
 * 番号札 → 用件 → 用紙が違う → 居住証明 → 予約か飛び込みか → 筆記 → 視力 →
 * 車の確認 → 走り出す → 縦列と切り返し → 一発不合格 → 合否 → 写真 →
 * 仮免の紙 → 登録とナンバー。
 *
 * ここは聞き取りが全部。窓口の職員も試験官も、こちらに合わせて話してくれない。
 * とくに運転中の指示は短く速く、聞き返す余裕がない。
 * 指示の語(pull up / pull over / merge / ease up)を先に体に入れておく。
 */

import type { LifePhrase } from '../../lifeline-types';

export const DMV_BANK: LifePhrase[] = [

    // ---- 番号札 ----
    { en: "Are you checking in?", ja: '受付ですか', note: 'check in。着いたことを知らせる手続き。まずここ' },
    { en: "Take a number and have a seat.", ja: '番号札を取って座って', note: '入口の機械から紙が出る。呼ばれるまで動かない' },
    { en: "They're on B-forty-two.", ja: '今B42番です', note: '記号と数字で呼ばれる。自分の記号を覚えておく' },
    { en: "Now serving G-one-oh-nine at window four.", ja: '4番窓口、G109番の方', note: 'now serving。放送と電光掲示の定型' },
    { en: "That's us.", ja: 'うちの番だ', note: '呼ばれたら黙って立って窓口へ行く' },
    { en: "You're in the wrong line.", ja: '列を間違えてます', note: '免許と車の登録で列が違うことがある' },

    // ---- 用件を聞かれる ----
    { en: "What are you here for today?", ja: '今日はどのご用件ですか', note: '第一声。文でなく単語で答えていい' },
    { en: "Road test.", ja: '実技試験です', note: '名詞1語が一番速く通じる' },
    { en: "I'm transferring an out-of-state license.", ja: '他州の免許の切り替えです', note: 'out-of-state。州をまたぐ手続きの言い方' },
    { en: "First-time license.", ja: '初めての免許です', note: '一番書類が多い区分。時間に余裕を持つ' },
    { en: "Do you have an appointment?", ja: '予約はありますか', note: '必ず聞かれる。ない場合の答えも用意しておく' },
    { en: "Just a renewal.", ja: '更新だけです', note: 'just を付けると簡単な用件だと伝わる' },

    // ---- 用紙が違う ----
    { en: "This is the wrong form.", ja: 'これは違う用紙です', note: '窓口で一番よく言われる一文' },
    { en: "You filled out the renewal, you need the DL-forty-four.", ja: '更新用に書いてます。必要なのはDL44です', note: '用紙は番号で呼ばれる。数字を聞き取る' },
    { en: "Grab one off the wall and come back to me.", ja: '壁から1枚取って戻ってきて', note: 'come back to me。並び直さなくていいという意味' },
    { en: "Do I have to get back in line?", ja: '並び直しですか', note: '聞くだけで並ばずに済むことがある' },
    { en: "You left this part blank.", ja: 'ここが空欄です', note: 'leave blank。書き漏らしは全部差し戻し' },
    { en: "Print, don't sign, in that box.", ja: 'そこはサインじゃなく活字体で書いて', note: 'print はブロック体で書くこと。sign と区別する' },

    // ---- 居住証明と書類 ----
    { en: "I need two proofs of residency.", ja: '居住証明が2点必要です', note: 'proof of residency。住所を証明する書類' },
    { en: "A utility bill works.", ja: '光熱費の請求書で通ります', note: 'work。有効である、条件を満たす' },
    { en: "Does a bank statement count?", ja: '銀行の明細でも認められますか', note: 'count。数に入る、有効として扱われる' },
    { en: "It has to be dated within ninety days.", ja: '発行から90日以内のものです', note: 'dated within。古い書類は中身を見ずに弾かれる' },
    { en: "This one's from March, that's too old.", ja: 'これは3月付けなので古すぎます', note: '見られるのは日付だけ。持参前に自分で確認する' },
    { en: "Can I pull it up on my phone?", ja: 'スマホで表示してもいいですか', note: '認める窓口と認めない窓口がある。紙も持つ' },
    { en: "We need a physical copy.", ja: '紙の原本が必要です', note: 'physical copy。画面では受け付けない' },
    { en: "Is a lease okay?", ja: '賃貸契約書でも大丈夫ですか', note: '住所のページと署名のページを両方持っていく' },

    // ---- 予約か飛び込みか ----
    { en: "Walk-ins are first come, first served.", ja: '予約なしは先着順です', note: 'first come, first served。並んだ順' },
    { en: "The next road test opening is in six weeks.", ja: '実技の次の空きは6週間後です', note: 'opening。空き枠。都市部はこれが普通' },
    { en: "Check online in the morning, people cancel.", ja: '朝に見てみて。キャンセルが出るから', note: 'キャンセル待ちの実務。朝が狙い目' },
    { en: "I booked it under my maiden name.", ja: '旧姓で予約しました', note: '名前が書類と一致しないとその場で止められる' },
    { en: "You're checked in. It'll be about an hour.", ja: '受付完了です。1時間ほどです', note: 'ここから待ち時間。席を外すと飛ばされる' },
    { en: "If you miss your slot, you forfeit the fee.", ja: '時間に遅れると料金は戻りません', note: 'forfeit。没収される。遅刻は金が消える' },

    // ---- 筆記試験 ----
    { en: "The written test is on the tablet over there.", ja: '筆記はあそこのタブレットです', note: '紙ではなく端末が普通になっている' },
    { en: "Thirty-six out of forty-six to pass.", ja: '46問中36問で合格', note: 'out of。合格ラインはこの形で言われる' },
    { en: "You can take it in Japanese.", ja: '日本語でも受けられます', note: '多言語対応の州は多い。先に聞くだけで楽になる' },
    { en: "Phones in the locker.", ja: '携帯はロッカーへ', note: '持っているのが見つかると即失格' },
    { en: "You can miss ten.", ja: '10問まで間違えられます', note: 'miss。落とす、間違える' },
    { en: "You failed by two.", ja: '2問足りませんでした', note: 'fail by。どれだけ足りなかったかを言う' },
    { en: "You can retake it tomorrow.", ja: '明日また受けられます', note: 'retake。当日の再受験を認めない州もある' },
    { en: "There's a fee each time.", ja: '毎回料金がかかります', note: '受け直しは有料。何度でも受けられるが金は減る' },

    // ---- 視力検査 ----
    { en: "Step up and look in here.", ja: '前に出てここを覗いて', note: '箱型の検査機を覗き込む' },
    { en: "Read me line four.", ja: '4行目を読んで', note: 'read me。声に出して読み上げる' },
    { en: "Chin on the rest.", ja: 'あごを台に乗せて', note: 'the rest はあご台。動くと測り直しになる' },
    { en: "Do you wear glasses or contacts?", ja: '眼鏡かコンタクトは使いますか', note: '正直に言う。免許に条件が付くだけで損はない' },
    { en: "You'll have a corrective lens restriction.", ja: '眼鏡等の条件が付きます', note: 'restriction。免許に記載される条件' },
    { en: "That means you have to wear them when you drive.", ja: '運転中は必ず着けるということです', note: '外して運転していると止められたときに違反になる' },

    // ---- 実技の前・車の確認 ----
    { en: "Is this your car?", ja: 'これはご自分の車ですか', note: '試験車は自分で用意する。借り物でもいい' },
    { en: "I need to see registration and insurance.", ja: '登録証と保険証を見せてください', note: '車の書類。ないと運転する前に終わる' },
    { en: "Show me your turn signals.", ja: 'ウインカーを出して', note: '球切れの確認。ここで落ちる人が実際にいる' },
    { en: "Left, right, brake lights.", ja: '左、右、ブレーキランプ', note: '順に指示される。エンジンはかけたままでいい' },
    { en: "Hit your hazards.", ja: 'ハザードを点けて', note: 'hit。スイッチを押す。押す動作は全部 hit' },
    { en: "Where's your horn?", ja: 'クラクションはどこですか', note: '指させばいい。鳴らせと言われることもある' },
    { en: "Roll your window down and keep it down.", ja: '窓を開けて、そのままにして', note: '手信号の確認のため開けたままにさせる' },
    { en: "Adjust your mirrors and seat before we go.", ja: '出る前にミラーと座席を合わせて', note: '走り出してから触ると減点になる' },

    // ---- 走り出す ----
    { en: "Whenever you're ready, pull out.", ja: '準備ができたら出て', note: 'pull out。駐車場や路肩から出る' },
    { en: "Take a left at the light.", ja: '信号を左', note: 'take a left。turn left より口語で速い' },
    { en: "Go ahead and merge.", ja: '合流して', note: 'go ahead and。指示のやわらかい前置き。意味は命令' },
    { en: "Stay in this lane.", ja: 'この車線のままで', note: '指示がなければ車線変更はしない' },
    { en: "Speed up, you're under.", ja: '遅いので上げて', note: 'under。制限速度を下回っている。遅すぎも減点' },
    { en: "Ease up on the brake.", ja: 'ブレーキを緩めて', note: 'ease up。急な操作はそれだけで減点される' },
    { en: "Check your mirrors.", ja: 'ミラーを見て', note: '見たと分かるように首を動かす。目だけでは伝わらない' },
    { en: "Head check.", ja: '目視で確認', note: '肩越しに振り返ること。ミラーだけでは足りない' },
    { en: "Pull up to the stop sign.", ja: '停止標識まで進んで', note: 'pull up。前へ進めて止める' },
    { en: "Come to a complete stop.", ja: '完全に止まって', note: 'complete stop。少しでも転がると減点' },
    { en: "Pull over when you can.", ja: '止められるところで路肩に寄せて', note: 'pull over。路肩に寄せて停止する' },
    { en: "Put it in park.", ja: 'パーキングに入れて', note: 'put it in。ギアの位置を指示する形' },

    // ---- 縦列と切り返し ----
    { en: "Let's do a three-point turn.", ja: '切り返しで方向転換します', note: 'three-point turn。3回の操作で向きを変える' },
    { en: "Use the whole road.", ja: '道幅を全部使っていい', note: '小さく回ろうとして失敗する人が多い' },
    { en: "Don't hit the curb.", ja: '縁石に当てないで', note: 'curb。乗り上げると一発不合格の州もある' },
    { en: "Back up in a straight line for me.", ja: 'まっすぐ後退して', note: '振り返って後ろを見る。カメラだけだと減点' },
    { en: "Keep your hand on the wheel.", ja: 'ハンドルから手を離さないで', note: '後退中に助手席の背を掴むのは認められる' },
    { en: "Parallel park between the cones.", ja: 'コーンの間に縦列駐車', note: 'parallel park。試験の山場' },
    { en: "You get one correction.", ja: '切り返しは1回までです', note: 'correction。やり直しの回数制限' },
    { en: "You're too far off the curb.", ja: '縁石から離れすぎです', note: '18インチ以内が目安の州が多い' },
    { en: "Straighten it out.", ja: 'まっすぐに直して', note: 'straighten out。車体の向きを整える' },
    { en: "Okay, pull it forward and we're done.", ja: '前に出して、これで終わりです', note: '課題終了の合図。まだ運転は続いている' },

    // ---- 一発不合格 ----
    { en: "That's an automatic fail.", ja: 'それは一発で不合格です', note: 'automatic fail。減点ではなくその場で終了' },
    { en: "You rolled the stop sign.", ja: '一時停止で止まりきってません', note: 'roll。転がるように通過する。失格理由の最多' },
    { en: "I had to use the brake.", ja: '私がブレーキを踏みました', note: '助手席の補助ブレーキ。踏まれた時点で終わり' },
    { en: "You didn't yield to the pedestrian.", ja: '歩行者に譲りませんでした', note: 'yield。横断歩道は無条件で歩行者が優先' },
    { en: "You went through on red.", ja: '赤で進みました', note: '赤信号での右折も、止まってからでないと失格' },
    { en: "Let's head back to the office.", ja: '事務所に戻ります', note: '途中で言われたら不合格が確定した合図' },
    { en: "We can stop here if you want.", ja: 'ここでやめてもいいですよ', note: '同じく良くない合図。優しい言い方だが意味は同じ' },

    // ---- 合否 ----
    { en: "You passed.", ja: '合格です', note: 'この2語だけで終わることが多い。拍子抜けする' },
    { en: "You did fine, a couple of small things.", ja: '問題なしです。細かいのが少しだけ', note: '減点はあるが合格、という言い方' },
    { en: "You scored an eighty-two.", ja: '82点でした', note: '点数を言われることもある。合格ラインは州で違う' },
    { en: "Take this slip to window six.", ja: 'この紙を6番窓口へ', note: 'slip。合格の紙。なくすと先へ進めない' },
    { en: "Unfortunately, you didn't pass today.", ja: '残念ですが今日は不合格です', note: "fail とは言わない。didn't pass のほうが普通" },
    { en: "You can retest in two weeks.", ja: '2週間後に再試験できます', note: 'retest。待機期間がある州が多い' },
    { en: "Here's your score sheet, go over it.", ja: '採点表です。目を通して', note: 'go over。何で落ちたかは全部ここに書いてある' },
    { en: "Same car, same examiner?", ja: '同じ車、同じ試験官ですか', note: '同じとは限らない。聞いてかまわない' },

    // ---- 写真 ----
    { en: "Step on the line and look at the camera.", ja: '線に立ってカメラを見て', note: '床にテープが貼ってある。そこに立つ' },
    { en: "No smiling with teeth.", ja: '歯を見せて笑わないで', note: '顔認証のため。真顔でいい' },
    { en: "Glasses off, please.", ja: '眼鏡は外してください', note: '視力の条件が付いていても写真では外す' },
    { en: "Hair behind your ears.", ja: '髪は耳の後ろに', note: '耳が見えるようにする決まり' },
    { en: "One more, you blinked.", ja: 'もう1枚。目を閉じてました', note: '撮り直しは頼めばだいたい応じてもらえる' },

    // ---- 仮免の紙 ----
    { en: "This is your temporary.", ja: 'これが仮の免許です', note: 'temporary。写真のない紙1枚。これで運転できる' },
    { en: "It's good for sixty days.", ja: '60日間有効です', note: 'good for。有効期間の言い方' },
    { en: "The real one comes in the mail.", ja: '本物は郵送で届きます', note: 'come in the mail。2週間前後が目安' },
    { en: "Keep this with your old license.", ja: '古い免許と一緒に持っておいて', note: '紙だけだと身分証として通らない場面がある' },
    { en: "What if it doesn't show up?", ja: '届かなかったらどうすれば', note: 'show up。届く。住所を打ち間違えられることがある' },
    { en: "Call us after three weeks.", ja: '3週間過ぎたら電話して', note: '再発行は無料のことが多い。放置しない' },

    // ---- 登録とナンバー ----
    { en: "You'll need to register the car too.", ja: '車の登録も必要になります', note: '免許と車は別の手続き。同じ日にまとめられる' },
    { en: "Do you have the title?", ja: '権利証は持ってますか', note: 'title。車の所有を示す書類。これがないと進まない' },
    { en: "The plates come with the registration.", ja: 'ナンバーは登録と一緒に出ます', note: 'plates。ナンバープレート。その場で渡される' },
    { en: "Front and rear, both have to go on.", ja: '前後2枚とも付けてください', note: '前を付けない人が多いが、それだけで切符が出る州がある' },
    { en: "Here's your sticker for the corner.", ja: '角に貼るシールです', note: '有効期限のシール。貼らないと止められる' },
    { en: "It expires on your birthday.", ja: '有効期限は誕生日です', note: '更新月は誕生月。覚えやすいが忘れやすい' },
    { en: "Cash, check, or card — card's a fee.", ja: '現金か小切手かカード。カードは手数料', note: 'カード払いに手数料を上乗せする窓口が多い' },
    { en: "You're all set.", ja: 'これで全部終わりです', note: 'all set。手続き完了の合図。立っていい' },
];
