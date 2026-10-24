/**
 * BANK — Checking In / ホテルのチェックイン
 *
 * 名前を言う → 早く着いてしまった → 部屋の種類 → 階と場所を頼む → カードの保留と追加料金 →
 * 駐車場 → 朝食とWi-Fi → 部屋で足りないものを頼む → うるさい・壊れている → 部屋替え →
 * レイトチェックアウト → 荷物預け → 精算。
 *
 * ここは英語力より頼み方で結果が変わる幕。同じ料金でも、一言足せる人は上の階の静かな部屋に入る。
 * フロント側のセリフも一緒に持つ。返ってくる文がわからないと、こちらの一言も出せない。
 */

import type { LifePhrase } from '../../lifeline-types';

export const HOTEL_BANK: LifePhrase[] = [

    // ---- 名乗る ----
    { en: "Checking in?", ja: 'チェックインですか', note: 'フロントの第一声。Yes だけで通る' },
    { en: "I have a reservation under Sato.", ja: '佐藤で予約しています', note: 'under 〜。予約名を伝える形はこれ一択' },
    { en: "It might be under my wife's name.", ja: '妻の名前かもしれません', note: '名前で出てこないときに次に言う一文' },
    { en: "Do you have a confirmation number?", ja: '予約番号はお持ちですか', note: 'メールを先に開いておくと早い' },
    { en: "I booked through a travel site.", ja: '旅行サイトで取りました', note: 'これを言った時点で部屋の融通は利きにくくなる' },
    { en: "Can I see your ID and a credit card?", ja: '身分証とクレジットカードをお願いします', note: '必ず両方求められる。カードなしはほぼ通らない' },
    { en: "How many keys do you need?", ja: '鍵は何枚ご入用ですか', note: '人数分もらっておく。後から作るのは面倒' },
    { en: "Two, please.", ja: '2枚お願いします', note: '数だけで答えていい' },
    { en: "Is anyone else checking in with you?", ja: 'ご一緒の方はいらっしゃいますか', note: '同宿者の登録。後から追加できないことがある' },
    { en: "Have you stayed with us before?", ja: '当ホテルのご利用は初めてですか', note: '会員かどうかを探っている質問' },
    { en: "I'm a member — it should be on the reservation.", ja: '会員です。予約に入っているはずです', note: '言うと部屋が上がることがある。黙っていると何も起きない' },

    // ---- 早く着いた ----
    { en: "Is there any chance of an early check-in?", ja: '早めにチェックインできますか', note: 'any chance。断られても後味が悪くならない頼み方' },
    { en: "Check-in is at four.", ja: 'チェックインは4時からです', note: '4時が標準。3時のところもある' },
    { en: "We don't have anything ready yet.", ja: 'まだ準備の整った部屋がありません', note: 'ready。清掃が終わっているという意味' },
    { en: "I can text you when a room opens up.", ja: '部屋が空いたらお知らせします', note: '番号を渡しておくと外で待てる' },
    { en: "Can I leave my bags and come back?", ja: '荷物を預けて後で戻ってもいいですか', note: 'だいたい無料でやってくれる。断られることはまずない' },
    { en: "Absolutely, we can hold them for you.", ja: 'もちろんお預かりします', note: 'hold。預かること' },
    { en: "We got in early — our flight landed at seven.", ja: '早く着いてしまって。7時着の便でした', note: '事情を一言足すと通りやすくなる' },
    { en: "Let me see what I can do.", ja: 'できることを見てみます', note: 'これが返ってきたら期待していい' },

    // ---- 部屋の種類 ----
    { en: "I booked a king.", ja: 'キングベッドで予約しました', note: 'king / queen / double。ベッドの大きさで部屋を呼ぶ' },
    { en: "We only have two doubles left.", ja: 'ダブルベッド2台の部屋しか残っていません', note: 'two doubles。ベッドが2つという意味' },
    { en: "That's not what I reserved.", ja: '予約したものと違います', note: '静かに事実だけ言う。それでだいたい直る' },
    { en: "Let me see if I can move you.", ja: '別の部屋にできるか確認します', note: 'move you。部屋を替えること' },
    { en: "We're a non-smoking property.", ja: '当館は全館禁煙です', note: 'property。ホテル全体をこう呼ぶ' },
    { en: "Does the room have a tub or just a shower?", ja: '湯船はありますか、シャワーだけですか', note: 'tub。米国は浴槽なしの部屋が多い' },
    { en: "Is there a fridge and a microwave?", ja: '冷蔵庫と電子レンジはありますか', note: '部屋によってない。頼むと持ってきてくれることがある' },
    { en: "Can I get a room with a view?", ja: '眺めのいい部屋にできますか', note: '有料のことがある。金額を先に聞く' },
    { en: "Do you have connecting rooms?", ja: 'つながっている部屋はありますか', note: 'connecting。家族連れの必須語' },
    { en: "Are they adjoining or just next door?", ja: '中でつながっていますか、ただの隣同士ですか', note: 'この2つは別物。確認しないと失敗する' },

    // ---- 階と場所を頼む ----
    { en: "Could I get a higher floor?", ja: '上の階にしてもらえますか', note: '静かで眺めもいい。頼めばだいたい通る' },
    { en: "Anything away from the elevator?", ja: 'エレベーターから離れた部屋はありますか', note: '一晩中人が通る。この一言だけで睡眠が変わる' },
    { en: "Not next to the ice machine, if you can.", ja: 'できれば製氷機の隣は避けてください', note: '深夜に音がする。米国のホテルで一番の敵' },
    { en: "Away from the pool would be great.", ja: 'プールから離れているとありがたいです', note: '朝と夕方がうるさい' },
    { en: "Is the room facing the street or the courtyard?", ja: '部屋は通り側ですか、中庭側ですか', note: 'facing。通り側は交通音がそのまま入る' },
    { en: "You're on eleven, at the end of the hall.", ja: '11階の廊下の一番奥です', note: 'end of the hall。片側しか隣がない当たりの位置' },
    { en: "The elevators are around the corner to your left.", ja: 'エレベーターは左の角を曲がったところです', note: 'around the corner。館内の道案内の定番' },

    // ---- カードの保留と追加料金 ----
    { en: "We'll put a hold on your card for incidentals.", ja: '雑費のためカードに一時保留をかけます', note: 'hold。引き落としではないが利用枠は減る' },
    { en: "How much is the hold?", ja: '保留はいくらですか', note: '1泊50ドルから100ドルが相場' },
    { en: "It'll drop off a few days after checkout.", ja: 'チェックアウト後、数日で外れます', note: 'drop off。デビットカードだと戻りが遅い' },
    { en: "There's a resort fee of thirty-five a night.", ja: 'リゾート料金が1泊35ドルかかります', note: '予約サイトの表示に入っていない。ここで初めて出てくる' },
    { en: "That wasn't in the price I booked.", ja: '予約したときの金額には入っていませんでした', note: '揉めても取消は難しい。仕組みを知っておくのが防御' },
    { en: "What does the resort fee cover?", ja: 'そのリゾート料金には何が含まれますか', note: '使わない設備ばかりなら免除を頼む余地がある' },
    { en: "Can that be waived?", ja: '免除してもらえますか', note: 'waive。会員や連泊だと通ることがある' },
    { en: "Is tax included in that rate?", ja: 'その料金に税は含まれていますか', note: '米国は税別表示。1割以上変わる' },
    { en: "Can I put the room on this card and the rest on another?", ja: '部屋代はこのカード、残りは別のカードにできますか', note: '出張の精算でよく使う頼み方' },
    { en: "Do you need a deposit tonight?", ja: '今夜デポジットは必要ですか', note: '現金払いだと高額を求められることがある' },

    // ---- 駐車場 ----
    { en: "Is parking included?", ja: '駐車場は料金に含まれていますか', note: '都市部は別料金が普通' },
    { en: "Self-park is twenty-eight, valet is forty-five.", ja: '自分で停めると28ドル、係員に預けると45ドルです', note: 'self-park / valet。選択肢は基本この2つ' },
    { en: "Is it in and out?", ja: '出し入れ自由ですか', note: 'in and out。1回ごとに課金される所がある' },
    { en: "Where's the entrance to the garage?", ja: '駐車場の入口はどこですか', note: '建物の入口と別なことが多い' },
    { en: "Just show this ticket when you leave.", ja: '出るときにこの券を見せてください', note: '券をなくすと満額請求になる' },

    // ---- 朝食、Wi-Fi、館内 ----
    { en: "Is breakfast included?", ja: '朝食は込みですか', note: '込みでない所の方が多い。当てにしない' },
    { en: "Breakfast is six-thirty to ten, ten-thirty on weekends.", ja: '朝食は6時半から10時、週末は10時半までです', note: '週末だけ延びるのが定番' },
    { en: "Where is breakfast served?", ja: '朝食はどこでいただけますか', note: 'served。会場を聞くときの動詞' },
    { en: "Is there a coffee maker in the room?", ja: '部屋にコーヒーメーカーはありますか', note: 'だいたいある。豆の追加はもらえる' },
    { en: "What's the Wi-Fi password?", ja: 'Wi-Fiのパスワードは何ですか', note: '名字と部屋番号で入る方式が多い' },
    { en: "It's your last name and room number.", ja: '名字と部屋番号です', note: '大文字小文字で弾かれることがある' },
    { en: "The Wi-Fi keeps dropping.", ja: 'Wi-Fiがすぐ切れます', note: 'keep 〜ing。繰り返し起きているという言い方' },
    { en: "Is there a gym, and what are the hours?", ja: 'ジムはありますか、何時までですか', note: '鍵が要ることがある' },
    { en: "Is the pool open?", ja: 'プールは開いていますか', note: '季節で閉めている所がある' },
    { en: "Is there somewhere I can print a boarding pass?", ja: '搭乗券を印刷できる場所はありますか', note: 'フロントで刷ってくれることも多い' },
    { en: "Is there anything walkable for dinner?", ja: '歩いて行ける夕食の店はありますか', note: 'walkable。フロントの人が一番詳しい' },
    { en: "The shuttle runs every half hour until eleven.", ja: '送迎は11時まで30分おきに出ます', note: 'runs。定期運行はこの動詞' },

    // ---- 部屋から頼む ----
    { en: "Could we get a couple of extra towels?", ja: 'タオルを何枚か余分にもらえますか', note: 'a couple of。数を細かく言わない頼み方' },
    { en: "Can I get an extra pillow and a blanket?", ja: '枕と毛布を追加でもらえますか', note: '電話でこれだけ言えば届く' },
    { en: "I'll send someone up with those.", ja: '係の者にお持ちさせます', note: 'send up。部屋まで届けること' },
    { en: "Is there a rollaway bed available?", ja: '簡易ベッドはありますか', note: 'rollaway。追加料金のことがある' },
    { en: "Do you have a crib?", ja: 'ベビーベッドはありますか', note: 'crib。数に限りがあるので早めに頼む' },
    { en: "Can we get housekeeping later? We're sleeping in.", ja: '清掃を遅めにしてもらえますか。朝ゆっくり寝るので', note: 'sleep in。寝坊ではなく意図して遅くまで寝ること' },
    { en: "No housekeeping tomorrow, thanks.", ja: '明日の清掃は不要です', note: '断ると特典が付くホテルもある' },
    { en: "Can you send up an iron?", ja: 'アイロンを持ってきてもらえますか', note: '部屋にないことがある' },

    // ---- うるさい、壊れている ----
    { en: "The AC isn't working.", ja: 'エアコンが動きません', note: '一番よくある苦情。まずこの一文' },
    { en: "It's blowing but it's not cold.", ja: '風は出ますが冷えません', note: '症状を分けて言うと直りが早い' },
    { en: "The room is freezing and I can't find the thermostat.", ja: '部屋が寒くて、温度調節が見つかりません', note: 'thermostat。壁についている操作盤' },
    { en: "There's a smell in the room.", ja: '部屋が匂います', note: '匂いは直せないので部屋替えになる' },
    { en: "The room above us is really loud.", ja: '上の部屋がかなりうるさいです', note: 'above us。位置を言うと動いてくれる' },
    { en: "There's a party down the hall.", ja: '廊下の先で騒いでいます', note: 'フロントが実際に注意しに行く' },
    { en: "I can send security up.", ja: '警備の者を向かわせます', note: 'security。米国のホテルは本当に来る' },
    { en: "The shower has no hot water.", ja: 'シャワーのお湯が出ません', note: '即座に部屋替えの理由になる' },
    { en: "The toilet keeps running.", ja: 'トイレの水が止まりません', note: 'keep running。流れっぱなしの状態' },
    { en: "There's no hair dryer.", ja: 'ドライヤーがありません', note: '引き出しの中を先に見る。だいたい入っている' },
    { en: "My key stopped working.", ja: '鍵が反応しなくなりました', note: '携帯と一緒に入れると消える。よく起きる' },
    { en: "Bring your ID down and we'll re-key it.", ja: '身分証をお持ちください。作り直します', note: 're-key。鍵を作り直すこと' },

    // ---- 部屋を替える ----
    { en: "Is there any way we can move rooms?", ja: '部屋を替えてもらえませんか', note: 'any way。一番角の立たない頼み方' },
    { en: "I'm sorry about that — let me move you to another room.", ja: '申し訳ありません。別のお部屋にお移しします', note: '苦情がうまくいったときの返事' },
    { en: "Can someone help us with our bags for the move?", ja: '部屋移動の荷物を手伝ってもらえますか', note: '部屋替えなら頼んでいい' },
    { en: "We're sold out tonight, but I can move you tomorrow.", ja: '今夜は満室ですが、明日なら替えられます', note: '一晩耐えるか交渉するかの分かれ目' },
    { en: "Can you note the account in case there's a charge?", ja: '請求に響くといけないので記録に残してもらえますか', note: '苦情を記録させておくと最後の精算で効く' },

    // ---- チェックアウト ----
    { en: "What time is checkout?", ja: 'チェックアウトは何時ですか', note: '11時が標準' },
    { en: "Is late checkout possible?", ja: 'レイトチェックアウトはできますか', note: '前日の夜に頼むと通りやすい' },
    { en: "I can do one o'clock, no charge.", ja: '1時までなら無料でいけます', note: 'no charge。無料という合図' },
    { en: "After that it's a half-day rate.", ja: 'それ以降は半日料金になります', note: 'half-day rate。いくらか先に聞く' },
    { en: "Can you hold our bags until our flight?", ja: '飛行機の時間まで荷物を預かってもらえますか', note: 'チェックアウト後も預かってくれる' },
    { en: "Here's your tag — hang on to it.", ja: '引換札です。なくさないでください', note: 'hang on to。持っておけという意味' },
    { en: "Do you need a receipt?", ja: '領収書は必要ですか', note: '出張なら必ずもらう' },
    { en: "Can you email me the folio?", ja: '明細をメールで送ってもらえますか', note: 'folio。ホテルの利用明細のこと' },
    { en: "There's a charge here I don't recognize.", ja: '覚えのない請求があります', note: '冷蔵庫の飲み物と駐車場が多い' },
    { en: "That's the resort fee for three nights.", ja: '3泊分のリゾート料金です', note: '最後に効いてくる。初日に確認しておく' },
    { en: "Everything look good?", ja: '内容はこれでよろしいですか', note: 'フロントの最終確認。ここで明細を見る' },
    { en: "How was your stay?", ja: 'ご滞在はいかがでしたか', note: '不満があるなら伝える最後の機会' },
    { en: "It was great — that room on eleven was perfect.", ja: 'よかったです。11階のあの部屋は完璧でした', note: '具体的に言うと次回も同じ部屋にしてくれる' },
    { en: "Can you get us a cab to the airport?", ja: '空港までタクシーを呼んでもらえますか', note: 'フロントで呼べる。並ばなくていい' },
    { en: "Where's the nearest place to grab coffee?", ja: '一番近くでコーヒーを買えるのはどこですか', note: 'grab。買って持ち帰る感じ' },
];
