/**
 * BANK — The Airport Delay / 空港の欠航と遅延
 *
 * 掲示板を見る → ゲート変更 → 機内放送 → 並ぶか電話するか → 振替を頼む → 空席待ち →
 * 乗り継ぎ → 乗り継ぎを逃す → ホテルと食事券 → 天候か整備か → 預けた荷物 → 搭乗 → 礼を言う。
 *
 * この幕の勝負は2つだけ。放送を騒音の中で聞き取れるか、係員に1文で用件を渡せるか。
 * 用件は毎回おなじ型でいい。どこへ・いつまでに・何を捨てられるか。この3点を出せば話が動く。
 */

import type { LifePhrase } from '../../lifeline-types';

export const AIRPORT_BANK: LifePhrase[] = [

    // ---- 掲示板を見る ----
    { en: "Our flight just went from delayed to canceled.", ja: '遅延だったのが今欠航に変わった', note: 'went from A to B。表示が変わった瞬間の言い方' },
    { en: "The board says delayed but there's no new time.", ja: '遅延としか出ていなくて新しい時刻がない', note: '新しい時刻が出ていない状態が一番長引く。掲示板の見方の基本' },
    { en: "Check the app, it updates before the board does.", ja: 'アプリ見て。掲示板より先に変わる', note: '並ぶ前にまずこれ。掲示板は遅れて直る' },
    { en: "They pushed it back another hour.", ja: 'また1時間後ろにずれた', note: 'push back。遅延が伸びるときの動詞' },
    { en: "It's been pushed back three times now.", ja: 'もう3回もずれてる', note: '回数を言うと状況の深刻さが伝わる' },
    { en: "Are we still getting out tonight or not?", ja: '今夜出られるのか出られないのか', note: 'get out。飛び立つこと。or not を足すと本音の質問になる' },
    { en: "Gate B12 — wait, it moved.", ja: 'B12ゲート、いや変わってる', note: 'ゲートは本当に変わる。掲示板は二度見る' },

    // ---- ゲートの放送 ----
    { en: "Ladies and gentlemen, we have a gate change.", ja: 'ゲート変更のお知らせです', note: 'この出だしが聞こえたら番号まで必ず聞き取る' },
    { en: "Flight 442 to Denver will now be departing from gate C31.", ja: 'デンバー行き442便はC31ゲートからの出発になります', note: 'will now be departing。変更放送の決まり文句' },
    { en: "We apologize for the inconvenience.", ja: 'ご迷惑をおかけしております', note: '中身はない。この直後に本題が来る' },
    { en: "We're currently waiting on the inbound aircraft.", ja: 'こちらに来る機材の到着待ちです', note: 'inbound aircraft。乗る飛行機がまだ到着していない状態' },
    { en: "The aircraft is at the gate and we'll begin boarding shortly.", ja: '機材が到着しました。まもなく搭乗を開始します', note: 'shortly は15分のことも1時間のこともある' },
    { en: "We're just finishing up some paperwork.", ja: '書類の処理をしております', note: 'paperwork。理由をぼかすときの定番' },
    { en: "We're waiting on a crew member.", ja: '乗務員の到着待ちです', note: 'これが出ると長い。食事に行くならこの間' },
    { en: "Due to weather in the Chicago area, we're holding at the gate.", ja: 'シカゴ方面の天候のためゲートで待機します', note: '天候と言われた時点でホテル代はほぼ出ない' },
    { en: "This is a maintenance issue.", ja: '整備上の問題です', note: '整備と言われたら補償を頼む根拠になる。聞き逃さない' },
    { en: "We do have a mechanic on the way.", ja: '整備士が向かっております', note: 'on the way。まだ着いていないという意味' },
    { en: "At this time we do not have an estimated departure time.", ja: '現時点で出発予定時刻は未定です', note: 'この放送が出たら振替に動く合図' },
    { en: "We'll make another announcement in about thirty minutes.", ja: '30分後に改めてご案内します', note: '同じ放送が何度も繰り返されることがある' },
    { en: "Please stay close to the gate area.", ja: 'ゲート付近から離れないでください', note: 'これが出たら遠くの店に行かない' },
    { en: "This flight has been canceled.", ja: 'この便は欠航となりました', note: '聞こえた瞬間に電話をかける。並ぶより早いことが多い' },
    { en: "Please see an agent for rebooking options.", ja: '振替については係員にお尋ねください', note: 'see an agent。窓口へ行けという意味' },
    { en: "Passenger Tanaka, please come to the podium.", ja: '田中様、カウンターまでお越しください', note: 'podium。ゲート前の受付台のこと' },
    { en: "This is the final boarding call for flight 1180.", ja: '1180便、最終のご案内です', note: 'final call の後は5分で締まる' },
    { en: "The doors will close in five minutes.", ja: 'あと5分でドアを閉めます', note: '出発時刻ではなくドアが基準。ここを間違えると乗れない' },
    { en: "If you're not in the boarding area, you will be offloaded.", ja: '搭乗エリアにいない方は降ろされます', note: 'offload。座席を外されること' },

    // ---- 並ぶか、電話するか ----
    { en: "How long is this line?", ja: 'この列どれくらい', note: '目測でいいので聞く。判断材料になる' },
    { en: "Get in line and call at the same time.", ja: '並びながら同時に電話もかけろ', note: '空港で一番役に立つ知恵。片方が先に通る' },
    { en: "The phone wait is about two hours.", ja: '電話は2時間待ちだそうです', note: '折り返し予約ができることが多い' },
    { en: "Can I get a callback instead of holding?", ja: '保留せず折り返しにできますか', note: 'callback。席を離れて動ける' },
    { en: "Is there another counter that's less busy?", ja: 'もっと空いている窓口はありますか', note: '到着階のカウンターがすいていることがある' },
    { en: "I've been in this line for an hour.", ja: '1時間並んでいます', note: '事実だけ言う。責めない方が結果的に早い' },
    { en: "Are you being helped?", ja: 'ご案内は済んでいますか', note: '係員が列を整理するときの一文' },

    // ---- 振替を頼む ----
    { en: "What are my options?", ja: 'どういう選択肢がありますか', note: '最初にこれ。相手が持ち札を全部出してくれる' },
    { en: "I need to get to Boston tonight.", ja: '今夜中にボストンに着きたいです', note: '行き先と期限を1文で。ここが交渉の中心' },
    { en: "What's the earliest you can get me there?", ja: '一番早く着くのはいつになりますか', note: 'get me there。振替依頼の標準形' },
    { en: "I'm already booked on the six a.m. — is there anything sooner?", ja: '朝6時では取れています。もっと早いのはありますか', note: '押さえた上でさらに探させる。これが上級者の頼み方' },
    { en: "Can you put me on the seven-fifteen?", ja: '7時15分の便に入れてもらえますか', note: '便を指定すると話が一気に早い' },
    { en: "Is there anything through Dallas?", ja: 'ダラス経由なら何かありますか', note: 'through 〜。経由地をこちらから提案する' },
    { en: "I don't mind a connection if it gets me in sooner.", ja: '早く着くなら乗り継ぎでも構いません', note: '条件を緩めると選択肢が増える' },
    { en: "I'll take a middle seat, I just need to be on it.", ja: '真ん中の席でいいので乗せてください', note: '席を捨てると通ることがある。実際に効く' },
    { en: "Can you look at other airlines?", ja: '他社便も見てもらえますか', note: '言わないと見ない。提携先に振れることがある' },
    { en: "Do you have an interline agreement with them?", ja: 'そこと提携はありますか', note: 'interline。この一語を出すと話が通じる相手だと思われる' },
    { en: "Can you protect me on the later flight while we look?", ja: '探す間、後の便を押さえておけますか', note: 'protect。押さえておく業界語。安心して交渉できる' },
    { en: "I'd rather fly out in the morning than sleep here.", ja: 'ここで寝るより朝の便がいいです', note: 'rather A than B。希望の順位を伝える形' },
    { en: "Can I fly into a different airport?", ja: '別の空港着でもいいですか', note: '近隣空港に広げると一気に空きが出る' },
    { en: "Just get me as close as you can.", ja: 'できるだけ近くまでで構いません', note: '最後の手段。だいたい何か出てくる' },
    { en: "Is that confirmed or standby?", ja: 'それは確定ですか、空席待ちですか', note: '一番大事な確認。ここを聞かないと空港で泣く' },
    { en: "Can you email me the new itinerary?", ja: '新しい旅程をメールで送ってもらえますか', note: '画面が消える前にもらっておく' },
    { en: "Am I still on the same booking as my wife?", ja: '妻と同じ予約のままですか', note: '振替でばらばらになることがある' },

    // ---- 空席待ち ----
    { en: "Can you put me on the standby list?", ja: '空席待ちに入れてもらえますか', note: 'standby list。頼まないと載らない' },
    { en: "Where am I on the list?", ja: '私は何番目ですか', note: '番号がわかると待つか動くか決められる' },
    { en: "You're number four.", ja: '4番目です', note: '3番目までなら乗れることが多い' },
    { en: "We'll start clearing standbys once boarding is done.", ja: '搭乗が終わり次第、空席待ちを処理します', note: 'clear。空席待ちを乗せることをこう言う' },
    { en: "Please stay within earshot of the podium.", ja: 'カウンターの声が届く範囲にいてください', note: 'earshot。呼ばれて即応しないと飛ばされる' },
    { en: "We're looking pretty full today.", ja: '今日はほぼ満席です', note: '期待するなという遠回しの合図' },
    { en: "A few no-shows and you'll get on.", ja: '何人か来なければ乗れます', note: 'no-show。出発直前まで決まらない' },
    { en: "If I do standby, do I keep my confirmed seat later?", ja: '空席待ちをしても、後の確定席は残りますか', note: '確認しないと確定席を失うことがある。必ず聞く' },

    // ---- 乗り継ぎ ----
    { en: "I have a tight connection in Atlanta.", ja: 'アトランタでの乗り継ぎが際どいです', note: 'tight connection。この一言で優先扱いになることがある' },
    { en: "Am I going to make my connection?", ja: '乗り継げそうですか', note: '遅延中に一番よく使う質問' },
    { en: "You've got forty minutes on the ground.", ja: '地上での時間は40分です', note: 'on the ground。乗り継ぎ時間の言い方' },
    { en: "It's a different terminal, you'll need to take the train.", ja: '別ターミナルなので電車に乗ってください', note: '空港内の移動時間を必ず計算に入れる' },
    { en: "Can I move up front so I can get off faster?", ja: '早く降りたいので前の席に移れますか', note: '客室乗務員に頼む。空いていれば通る' },
    { en: "If you have a tight connection, please let a flight attendant know.", ja: '乗り継ぎが際どい方は乗務員にお申し出ください', note: '機内放送。自分から言わないと何も起きない' },
    { en: "Passengers with tight connections will deplane first — please remain seated.", ja: '乗り継ぎのある方から降ります。ご着席のままお待ちください', note: 'deplane。降機すること。この放送の意味を知らないと立ってしまう' },
    { en: "They're holding the flight for us.", ja: '私たちのために便を待たせています', note: 'hold the flight。稀に本当に起きる' },
    { en: "They won't hold it.", ja: '待ってはくれません', note: '期待するより走った方が早い' },

    // ---- 乗り継ぎを逃した ----
    { en: "I missed my connection.", ja: '乗り継ぎを逃しました', note: 'まずこの一文だけ。理由は聞かれてから' },
    { en: "It wasn't on me — the first leg came in late.", ja: 'こちらの落ち度ではありません。前の区間が遅れました', note: 'leg。区間。責任の所在で扱いが変わる' },
    { en: "They already rebooked me automatically.", ja: '自動で振替済みでした', note: '携帯に通知が来ている。並ぶ前に確認する' },
    { en: "The auto-rebook put me on tomorrow night — can we do better?", ja: '自動振替が明日の夜でした。もっといい便はありませんか', note: 'do better。交渉を始める合図' },
    { en: "My bag is already in Denver.", ja: '荷物は先にデンバーへ行っています', note: '荷物の行方は別で追う。人と一緒には動かない' },
    { en: "Do I need to go back through security?", ja: '保安検査を受け直す必要がありますか', note: '一度出ると戻るのに時間がかかる' },
    { en: "Where do I go now?", ja: '今どこへ行けばいいですか', note: '迷ったらこの一文で全部片づく' },

    // ---- ホテルと食事 ----
    { en: "Since it's a mechanical, can you cover a hotel?", ja: '整備の問題なのでホテルは出ますか', note: '理由を先に置くのが効く言い方' },
    { en: "Do you have any distressed passenger rates?", ja: '欠航時のホテル割引はありますか', note: 'distressed passenger rate。会社負担が出ないときの次善策' },
    { en: "Here's a hotel voucher and the shuttle picks up at door three.", ja: 'ホテルの引換券です。送迎は3番出口から出ます', note: '乗り場は番号で言われる。番号だけは聞き取る' },
    { en: "Can I get a meal voucher for the wait?", ja: '待ち時間の食事券をもらえますか', note: '頼めば出ることが多い。黙っていると出ない' },
    { en: "The voucher is twelve dollars.", ja: '食事券は12ドル分です', note: '金額は少ない。文句を言っても増えない' },
    { en: "Is this good anywhere in the terminal?", ja: 'ターミナル内ならどこでも使えますか', note: '使える店が限られていることがある' },
    { en: "We're not authorized to issue hotels for weather.", ja: '天候の場合ホテルはお出しできません', note: 'authorized。規則で決まっている。目の前の人を責めない' },
    { en: "Can you at least waive the change fee?", ja: 'せめて変更手数料は免除してもらえませんか', note: 'at least。妥協案をこちらから出すと通りやすい' },
    { en: "Can I get that in writing?", ja: 'それを書面でもらえますか', note: '後から払い戻しを請求するときに効く' },

    // ---- 天候か整備か ----
    { en: "Is this weather or mechanical?", ja: 'これは天候ですか、整備ですか', note: '補償が出るかどうかがこの一問で決まる' },
    { en: "It's technically weather.", ja: '一応、天候扱いになります', note: 'technically。会社の言い分だと本人も思っている言い方' },
    { en: "It's an air traffic control hold.", ja: '航空管制による待機です', note: '会社の責任にならない扱い。補償は出ない' },
    { en: "The crew timed out.", ja: '乗務員の勤務時間が切れました', note: 'time out。法定時間を超えると飛べない' },
    { en: "If it's a crew issue, that's on the airline, right?", ja: '乗務員の問題なら会社の責任ですよね', note: 'on the airline。補償を求めるときの根拠' },
    { en: "What's the official reason on my record?", ja: '記録上の正式な理由は何になっていますか', note: '後日の請求で使う。控えておく' },

    // ---- 預けた荷物 ----
    { en: "My bag is checked through — what happens to it?", ja: '荷物は最終地まで通しで預けています。どうなりますか', note: 'checked through。通し預け' },
    { en: "Can I get my bag back tonight?", ja: '今夜のうちに荷物を受け取れますか', note: '出てこないことが多い。ホテル泊が決まったら即頼む' },
    { en: "Your bag will meet you there.", ja: 'お荷物は現地で合流します', note: 'meet you there。会社側の決まり文句' },
    { en: "I have my medication in that bag.", ja: 'あの荷物に薬が入っています', note: '薬と言うと扱いが変わる。本当のときだけ使う' },
    { en: "Can you add a delivery to my hotel?", ja: 'ホテルまで配送を付けてもらえますか', note: '頼まないとやってくれない' },
    { en: "Do you have an overnight kit?", ja: '一泊分の日用品セットはありますか', note: 'overnight kit。歯ブラシなど。頼めば出る' },

    // ---- 席と搭乗 ----
    { en: "Any chance of an upgrade on the new flight?", ja: '振替便でアップグレードの可能性はありますか', note: 'any chance。断られても角が立たない聞き方' },
    { en: "I got bumped to the back.", ja: '後ろの席に回された', note: 'get bumped。席を下げられること' },
    { en: "We'll assign seats at the gate.", ja: '座席はゲートで割り当てます', note: '振替便でよくある。早めにゲートへ行く' },
    { en: "We're now boarding group four.", ja: 'グループ4の方、ご搭乗ください', note: '搭乗券の番号を先に確認しておく' },
    { en: "If your group has been called, please come forward.", ja: 'お呼びしたグループの方は前へお進みください', note: 'come forward。列に入れという意味' },
    { en: "This flight is completely full, so we're checking bags at the gate.", ja: '満席のためゲートで手荷物をお預かりします', note: 'gate check。無料だが中身は出しておく' },
    { en: "Anything you need for the flight, take it out now.", ja: '機内で必要なものは今出してください', note: '預ける直前の一言。財布と電源は必ず抜く' },

    // ---- どうにもならないと言われる、そして礼 ----
    { en: "There's nothing I can do.", ja: 'こちらではどうにもできません', note: 'これが出たら別の窓口へ。同じ人に粘っても出ない' },
    { en: "It's out of our hands.", ja: '私たちの手を離れています', note: '運航側の判断だという意味。担当者に権限がない' },
    { en: "I know it's not your fault.", ja: 'あなたのせいじゃないのはわかっています', note: 'これを先に置くと係員の動きが変わる' },
    { en: "I'm not mad at you, I just need to get home.", ja: '怒ってるんじゃなくて、帰りたいだけなんです', note: '一番効く一文。実際にこれで席が出てくることがある' },
    { en: "Is there anyone else who might have more options?", ja: 'もっと選択肢を出せる方はいますか', note: '上の人に回してもらう頼み方' },
    { en: "Let me see what I can do.", ja: 'できることを探してみます', note: 'これが出たら成功。あとは黙って待つ' },
    { en: "You're all set — you're on the six-ten.", ja: '手続き完了です。6時10分の便になります', note: 'all set。終わったという合図' },
    { en: "You just saved my whole trip. Thank you.", ja: '旅行が助かりました。ありがとう', note: '具体的に礼を言う。次に並ぶ人のためにもなる' },
];
