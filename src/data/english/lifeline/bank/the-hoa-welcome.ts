/**
 * BANK — The HOA Welcome / 自治会からの歓迎と近所づきあい
 *
 * 塀ごしの初対面 → 世間話 → 規約集 → ゴミ箱 → 芝 → 外壁の申請 → 路上駐車 →
 * 犬 → 騒音 → 子どものおもちゃ → 飾り付け → 会費 → 違反通知 → 理事会 →
 * 道具の貸し借り → 荷物の受け取り → 苦情を直接言う。
 *
 * ここの英語は難しくない。難しいのは、角を立てずに文句を言い、
 * 角を立てずに謝ることのほうで、その型は決まっている。
 * 通報する前に本人に言う。これが守れるかどうかで10年が変わる。
 */

import type { LifePhrase } from '../../lifeline-types';

export const HOA_BANK: LifePhrase[] = [

    // ---- 塀ごしの初対面 ----
    { en: "Hey there — you the new folks?", ja: '今度越してきた人？', note: 'are が落ちている。近所の第一声はこれくらいくだけている' },
    { en: "We just moved in last weekend.", ja: '先週末に越してきました', note: 'move in。in を落とすと引っ越したことが伝わらない' },
    { en: "Welcome to the neighborhood.", ja: 'ようこそご近所へ', note: '最初に必ず言われる。Thanks, glad to be here. で返す' },
    { en: "I'm Dale, I'm right next door.", ja: 'デイルです。すぐ隣です', note: 'right next door。真隣であることを強調している' },
    { en: "We're the blue house on the corner.", ja: '角の青い家です', note: '家の色と位置で名乗るのが普通。番地は言わない' },
    { en: "How are you liking it so far?", ja: 'ここはどうですか', note: 'so far。まだ日が浅い相手にはこれが定型' },
    { en: "Still living out of boxes, honestly.", ja: '正直まだ段ボールから出してません', note: 'living out of boxes。片付いていない状態の決まり文句' },
    { en: "Holler if you need anything.", ja: '何かあったら声かけて', note: 'holler は声をかける。社交辞令だが本気にしていい' },

    // ---- 世間話 ----
    { en: "Hot one today, huh?", ja: '今日は暑いね', note: '天気の話は挨拶そのもの。中身に意味はない' },
    { en: "Supposed to cool off this weekend.", ja: '週末は涼しくなるらしい', note: 'supposed to。天気予報の伝聞はこの形で言う' },
    { en: "We needed that rain.", ja: 'あの雨は助かった', note: '芝のある家では雨はいいこと扱いになる' },
    { en: "How's the street been treating you?", ja: 'この通りはどうですか', note: '環境のほうを主語にする言い方。答えは短くていい' },
    { en: "It's quiet. Little loud on trash day.", ja: '静かです。ゴミの日だけうるさいけど', note: '褒めてから一つだけ落とすと会話が続く' },
    { en: "Watch out for the folks at the end — they speed.", ja: '突き当たりの家は飛ばすから気をつけて', note: 'speed は動詞で飛ばす。近所の情報はこうやって渡される' },

    // ---- 規約集 ----
    { en: "Did they give you the bylaws?", ja: '規約集はもらいました？', note: 'bylaws。自治会の規則集。CC and Rs とも呼ばれる' },
    { en: "It's in your closing packet somewhere.", ja: '契約書類の束のどこかに入ってます', note: 'closing packet。家の決済でもらう分厚い一式' },
    { en: "Nobody reads it until they get a letter.", ja: '通知が来るまで誰も読まない', note: '実際そう。先に読んだ人だけが罰金を払わない' },
    { en: "There's a lot of rules, but they only enforce about five.", ja: '規則は多いけど実際に効くのは5個くらい', note: 'enforce。実際に取り締まる。書いてあることと運用は別' },
    { en: "It's on the portal. I'll text you the link.", ja: '住民サイトにあります。リンク送ります', note: 'portal。ログイン情報は管理会社から届く' },

    // ---- ゴミ箱 ----
    { en: "Cans can't be visible from the street.", ja: 'ゴミ箱は道から見えたらだめ', note: 'cans は trash cans。違反通知の理由で一番多い' },
    { en: "Where do you keep yours?", ja: 'そちらはどこに置いてます？', note: '規約を読むより隣を真似るほうが早い' },
    { en: "Side of the house, behind the gate.", ja: '家の横、門の裏です', note: '目隠しさえあればいい、という運用が多い' },
    { en: "Bring them back in by the end of the day.", ja: 'その日のうちに戻して', note: '出すのは自由。戻し忘れが違反になる' },
    { en: "Recycling's every other week.", ja: '資源ゴミは隔週です', note: 'every other week。every two weeks より口語で確実' },
    { en: "Yard waste has to be in the paper bags.", ja: '庭ゴミは紙袋に入れる', note: 'yard waste。芝や枝。ビニール袋だと置いていかれる' },

    // ---- 芝と雑草 ----
    { en: "You're gonna want to get on that lawn.", ja: 'その芝はそろそろ手を入れたほうがいい', note: '命令をやわらげた忠告の型。従わないと通知が来る' },
    { en: "Grass can't be over six inches.", ja: '芝は6インチを超えたらだめ', note: '数字は自治会ごとに違う。規約に必ず書いてある' },
    { en: "Who do you use?", ja: '業者はどこ使ってます？', note: 'use だけで業者を使うの意味になる' },
    { en: "I got a guy, I'll give you his number.", ja: '知り合いの業者がいる。番号渡すよ', note: 'I got a guy。便利屋を紹介するときの決まり文句' },
    { en: "Forty a cut, twice a month in the summer.", ja: '1回40ドル、夏は月2回', note: 'a cut。芝刈り1回あたりの値段' },
    { en: "Those weeds'll spread to my yard.", ja: 'その雑草うちに広がるんだけど', note: '相手ではなく雑草を主語にして角を丸くしている' },
    { en: "I'll knock it out this weekend.", ja: '週末にやっつけます', note: 'knock it out。片付ける。期限を切ると相手が引く' },

    // ---- 外壁の塗り替え申請 ----
    { en: "You have to submit for exterior paint.", ja: '外壁の塗装は申請が必要です', note: 'submit for。申請書を出す。事後だと塗り直しになる' },
    { en: "Even the same color?", ja: '同じ色でも？', note: '答えはたいてい yes。色は関係なく申請がいる' },
    { en: "Even the same color. It's an ARC form.", ja: '同じ色でもです。ARCの用紙になります', note: 'ARC は景観の審査委員会。用紙は名前で呼ばれる' },
    { en: "Pick from the approved palette.", ja: '承認済みの色見本から選んで', note: 'approved palette。好きな色は選べない' },
    { en: "They meet the second Tuesday, so plan around that.", ja: '委員会は第2火曜だから予定を合わせて', note: 'plan around。承認に30日かかることもある' },
    { en: "Don't start before you hear back.", ja: '返事が来る前に始めないで', note: 'hear back。返信。着工が早いと全部やり直し' },
    { en: "Fence, shed, satellite dish — all of it.", ja: '柵も物置もアンテナも全部です', note: '道から見えるものは全部申請対象と思っておく' },

    // ---- 路上駐車 ----
    { en: "You can't park on the street overnight.", ja: '路上に一晩置いてはいけない', note: 'overnight。夜間駐車の禁止は自治会の定番' },
    { en: "They tow after midnight.", ja: '0時を過ぎるとレッカーされる', note: 'tow。脅しではなく実際に持っていかれる' },
    { en: "My in-laws are in town for the weekend.", ja: '週末は義理の親が来てて', note: 'in town。滞在中であること。理由を先に言う' },
    { en: "Get a guest pass from the office.", ja: '事務所で来客用の許可証をもらって', note: 'guest pass。ダッシュボードに載せる紙' },
    { en: "Just don't block my mailbox.", ja: 'うちの郵便受けだけ塞がないで', note: '塞ぐと配達が止まる。これは本気の苦情' },
    { en: "Sorry, was that yours? I'll move it.", ja: 'すみません、そこお宅の前でした？動かします', note: 'すぐ動かすと言えばそれで終わる' },

    // ---- 犬 ----
    { en: "Is he friendly?", ja: 'この子、人懐っこい？', note: '触る前に必ず聞く。聞かずに手を出さない' },
    { en: "She's good with people, not so much with dogs.", ja: '人は平気だけど犬は苦手', note: 'not so much。やんわり否定するときの形' },
    { en: "Leash law's the whole neighborhood.", ja: 'リードは地区全体で義務です', note: 'leash law。放し飼いはどこでも禁止' },
    { en: "He got out yesterday, did you see him?", ja: '昨日脱走したんだけど見なかった？', note: 'get out。犬が外に出てしまうこと' },
    { en: "Please pick up after him.", ja: 'ふんは片付けてください', note: 'pick up after。近所の揉め事で一番多い原因' },
    { en: "He barks when we're gone, I know.", ja: '留守中に吠えてますよね、わかってます', note: '先に自分から認めると相手が引き下がる' },

    // ---- 騒音 ----
    { en: "Quiet hours are ten to seven.", ja: '静粛時間は10時から7時', note: 'quiet hours。規約に必ず書いてある時間帯' },
    { en: "We're having a few people over Saturday.", ja: '土曜に何人か呼ぶんです', note: 'have people over。家に招くこと' },
    { en: "Appreciate the heads up.", ja: '知らせてくれて助かる', note: 'heads up は事前の一報。先に言えば苦情にならない' },
    { en: "We'll wrap it up by eleven.", ja: '11時にはお開きにします', note: 'wrap it up。終わらせる。時刻を言うのが大事' },
    { en: "The music was pretty loud last night.", ja: '昨日の音楽けっこう大きかった', note: 'pretty loud。うるさかったと直接は言わない' },
    { en: "Somebody's been running a leaf blower at seven a.m.", ja: '朝7時にブロワーをかけてる人がいる', note: 'somebody。名指ししないで苦情を言うときの主語' },

    // ---- 子どものおもちゃ ----
    { en: "Toys can't stay in the front yard overnight.", ja: 'おもちゃを前庭に置きっぱなしにできない', note: 'front yard だけの規則。裏庭は自由なことが多い' },
    { en: "The basketball hoop has to come off the street.", ja: 'バスケのゴールは道から出して', note: 'come off。道路に置く形は許可が要る' },
    { en: "Kids are out there all day, I stopped fighting it.", ja: '子どもが一日中いるから、もう諦めた', note: 'stopped fighting it。あきらめを表す定型' },
    { en: "How old are yours?", ja: 'お子さんいくつ？', note: 'yours で your kids。近所づきあいの入口になる質問' },
    { en: "Six and three. The three's the loud one.", ja: '6歳と3歳。うるさいのは3歳のほう', note: '数字だけ答えて一言足すのが自然' },

    // ---- 飾り付け ----
    { en: "Lights can go up the day after Thanksgiving.", ja: '飾りは感謝祭の翌日から出していい', note: 'go up。飾りを設置する。開始日は決まっている' },
    { en: "And down by January fifteenth.", ja: '1月15日までに外す', note: '外す期限のほうが厳しく見られる' },
    { en: "Nothing inflatable over eight feet.", ja: '8フィート超の空気人形はだめ', note: 'inflatable。膨らませる大型の飾り' },
    { en: "This street goes all out.", ja: 'この通りは飾りが本気', note: 'go all out。全力でやる' },
    { en: "We're not really a decorating family.", ja: 'うちはあまり飾らない家です', note: '断り方。家全体のことにすると角が立たない' },

    // ---- 会費と特別徴収 ----
    { en: "Dues are three hundred a quarter.", ja: '会費は3か月ごとに300ドル', note: 'dues が自治会費。a quarter は3か月' },
    { en: "You can set it up on autopay.", ja: '自動引き落としにできます', note: 'autopay。払い忘れると延滞金が付く' },
    { en: "Late fee kicks in after the tenth.", ja: '10日を過ぎると延滞金がつく', note: 'kick in。効き始める、発生し始める' },
    { en: "They're doing a special assessment for the roads.", ja: '道路のために特別徴収をやります', note: 'special assessment。会費とは別の臨時徴収' },
    { en: "How much are we talking?", ja: 'いくらくらいの話ですか', note: '金額を聞く最短の一文。失礼にならない' },
    { en: "Twelve hundred a house, spread over a year.", ja: '1軒1200ドルを1年で分割', note: 'spread over。期間で割って払う' },

    // ---- 違反通知 ----
    { en: "I got a violation letter.", ja: '違反通知が来ました', note: 'violation letter。封書で届く警告' },
    { en: "First one's just a courtesy notice.", ja: '1通目はただの注意です', note: 'courtesy notice。罰金なし。ここで直せば終わる' },
    { en: "Second one has a fine attached.", ja: '2通目から罰金が付きます', note: 'have a fine attached。金額が書いてある' },
    { en: "You've got thirty days to cure it.", ja: '30日以内に是正してください', note: 'cure。直す。規約の文書ではこの語が使われる' },
    { en: "Who do I talk to about this?", ja: 'これは誰に言えばいいですか', note: '管理会社か理事会か。ここを最初に確認する' },
    { en: "You can appeal it at the next meeting.", ja: '次の集会で異議を出せます', note: 'appeal。実際に撤回されることはある' },
    { en: "Send a photo and they'll close it out.", ja: '写真を送れば処理してもらえます', note: 'close it out。案件を終わらせる。直したら必ず撮る' },

    // ---- 理事会 ----
    { en: "Board meeting's the first Thursday.", ja: '理事会は第1木曜です', note: 'board meeting。住民は傍聴できる' },
    { en: "Anybody can come, most people don't.", ja: '誰でも来ていいけど大体来ない', note: '実情。行くだけで発言力が上がる' },
    { en: "There's an open forum at the end.", ja: '最後に自由発言の時間があります', note: 'open forum。住民が話せるのはここだけ' },
    { en: "Keep it to three minutes.", ja: '3分以内でお願いします', note: '持ち時間。長いと止められる' },
    { en: "We're short a board member if you're interested.", ja: '理事が1人足りない。やる気があれば', note: 'short。人数が足りない' },

    // ---- 道具の貸し借り ----
    { en: "Any chance I could borrow your ladder?", ja: '脚立を借りられませんか', note: 'any chance。頼みごとの一番やわらかい入り方' },
    { en: "Yeah, it's in the garage, help yourself.", ja: 'ガレージにあるから勝手に取って', note: 'help yourself。断らずに使っていいという意味' },
    { en: "I'll get it back to you tonight.", ja: '今夜返します', note: 'get it back to you。返す約束は必ず口に出す' },
    { en: "No rush.", ja: '急がなくていいよ', note: '2語で足りる。返しの定番' },
    { en: "Do you have a socket set I could use?", ja: 'ソケットレンチのセットありますか', note: 'I could use。貸してと直接言わない形' },
    { en: "Sorry, I actually need it this weekend.", ja: 'ごめん、今週末は自分で使うんだ', note: '断るときは理由を1つだけ添えれば十分' },

    // ---- 荷物の受け取り ----
    { en: "They left a package for you at our door.", ja: 'お宅の荷物がうちに届いてました', note: 'leave a package。誤配はよくあるので言い方を持っておく' },
    { en: "I signed for it, hope that's okay.", ja: 'サインしておきました。よかったですか', note: 'sign for it。代理でサインして受け取ること' },
    { en: "Would you mind grabbing our mail this week?", ja: '今週うちの郵便を取っておいてもらえますか', note: 'would you mind ...ing。頼みの丁寧形' },
    { en: "I'd rather not sign for anything.", ja: 'サインが要るものは受け取りたくないです', note: "I'd rather not。責任を負わずに断る形" },
    { en: "Porch pirates got mine last month.", ja: '先月うちの置き配は盗まれた', note: 'porch pirate。玄関先の荷物を持っていく泥棒' },

    // ---- 苦情を直接言う ----
    { en: "I wanted to come to you first before saying anything.", ja: '通報する前にまず本人に言おうと思って', note: 'come to you first。関係を壊さない苦情の入口' },
    { en: "I'm not trying to make a thing out of it.", ja: '大ごとにしたいわけじゃない', note: 'make a thing out of it。騒ぎ立てる' },
    { en: "Would you rather I just talk to you than report it?", ja: '通報するより直接言うほうがいいですよね', note: '相手に選ばせる形にすると角が立たない' },
    { en: "Yeah, please. Always come to me.", ja: 'そうして。いつでも直接言って', note: '望ましい返し。これが言えると関係が続く' },
    { en: "Somebody reported us and never said a word.", ja: '誰かが黙って通報した', note: 'never said a word。近所づきあいで一番嫌われる行為' },
    { en: "We're good, right?", ja: 'これでもう大丈夫だよね？', note: "we're good。わだかまりが残っていないかの確認" },
];
