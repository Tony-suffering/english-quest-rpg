/**
 * BANK — The Parent-Teacher Conference / 保護者面談
 *
 * 日程を取る → 最初のほめ言葉 → but が来る → 到達度の数字 → 行動と友達 →
 * 家庭の事情 → カウンセラー → 検査 → 宿題 → スクリーンタイム →
 * 家でできること → 次の一手 → 休み明け。
 *
 * この面談は15分しかない。先生の話は「ほめる → but → 本題」の順で必ず来るので、
 * but より前は儀礼、but より後がその日の全部だと思って聞く。
 * そして最後に必ず「家で何をすればいいか」と「いつ確認するか」を持ち帰る。
 */

import type { LifePhrase } from '../../lifeline-types';

export const PTC_BANK: LifePhrase[] = [

    // ---- 日程を取る ----
    { en: "We're scheduling conferences for the week of the 14th.", ja: '14日の週に面談を組んでいます', note: '学校から一斉に来る案内。返事が遅いと悪い時間帯しか残らない' },
    { en: "Here's the sign-up link — slots are fifteen minutes.", ja: '申し込みリンクです。1枠15分です', note: '15分は本当に15分。聞きたいことは先に絞る' },
    { en: "Do you have anything after four?", ja: '4時以降は空いていますか', note: '仕事帰りの枠は先に埋まる。案内が来たその日に取る' },
    { en: "Can we do it over Zoom instead?", ja: '代わりにオンラインでもいいですか', note: 'まず断られない。移動と早退の負担を丸ごと消せる' },
    { en: "I'd like to request an interpreter.", ja: '通訳をお願いしたいです', note: '学校側が無料で用意する義務がある。遠慮する場面ではない' },
    { en: "Will both parents be attending?", ja: 'ご両親とも来られますか', note: '別居している場合は別々の枠にもできる' },
    { en: "I'm running about ten minutes behind.", ja: '10分ほど押しています', note: '先生が言う一言。前の家庭が長引いている' },
    { en: "Thanks for coming in. Have a seat.", ja: 'お越しいただきありがとうございます。おかけください', note: '面談が始まる合図。ここから時計が動く' },

    // ---- 最初のほめ言葉 ----
    { en: "First off, I just want to say we love having him.", ja: 'まず、彼がクラスにいてくれて嬉しいです', note: '最初のほめは儀礼。ここでは何も判断しない' },
    { en: "She's such a joy in the classroom.", ja: '教室でとても良い存在です', note: '中身のないほめ言葉。次の文まで待つ' },
    { en: "He's a pleasure to have in class.", ja: 'クラスにいてくれて助かります', note: '成績の話が出てこない子に使われる定型。中身は薄い' },
    { en: "She's a hard worker.", ja: 'よく努力しています', note: '結果ではなく態度をほめている。点は伸びていないことが多い' },
    { en: "He gets along with everybody.", ja: '誰とでも仲良くやっています', note: '学力の話を避けたいときに出やすい' },
    { en: "She's really come out of her shell this year.", ja: '今年は自分から出てこられるようになりました', note: '内気だった子に対する本物のほめ言葉' },
    { en: "Academically, she's right where she should be.", ja: '学力は学年相応です', note: '一番安心していい一文。これが出たら学力の話は終わり' },
    { en: "Let me pull up his numbers.", ja: '数値を出しますね', note: '画面か紙を見せてもらう。口頭だけで終わらせない' },

    // ---- but が来る ----
    { en: "He's doing well, but I do want to talk about focus.", ja: 'よくやっていますが、集中の話をさせてください', note: 'but の後が本題。前半は聞き流していい' },
    { en: "That said, there's one area I'd like to work on.", ja: 'とはいえ、伸ばしたい点が1つあります', note: 'that said も同じ合図。ここからメモを取る' },
    { en: "I don't want to alarm you, but —", ja: '驚かせたくはないのですが', note: 'この前置きが出たら必ず書き留める。重い話が来る' },
    { en: "It's not a behavior issue, it's more of a skill gap.", ja: '態度の問題ではなく、力が追いついていません', note: 'この区別が大事。叱っても直らない話だという意味' },
    { en: "Where I'm seeing him struggle is reading comprehension.", ja: 'つまずいているのは読解です', note: '困っている場所を名指しさせる。ここが面談の核' },
    { en: "Can you be specific about what you're seeing?", ja: '具体的にどんな様子か教えてください', note: '抽象的な話で15分を終わらせないための一文' },
    { en: "Can you give me an example from this week?", ja: '今週の例を1つ挙げてもらえますか', note: '例を求めると話の解像度が一気に上がる' },
    { en: "Is this new, or has it been going on a while?", ja: '最近ですか、前からですか', note: 'いつからかで打つ手が変わる。必ず確認する' },

    // ---- 読みと算数の到達度 ----
    { en: "She's reading at a fourth-grade level.", ja: '読みは4年生相当です', note: '学年で示すのが普通。今の学年と引き算して聞く' },
    { en: "He's about a year below grade level in math.", ja: '算数は学年より1年ほど遅れています', note: 'この一文が支援を頼むときの根拠になる' },
    { en: "She's at or above benchmark.", ja: '基準に達しているか上回っています', note: 'これが出れば心配は要らない' },
    { en: "He's approaching grade level.", ja: '学年水準に近づいています', note: '遠回しに、まだ届いていないという意味' },
    { en: "These are her fall and winter scores side by side.", ja: '秋と冬の点数を並べたものです', note: '伸びを見る。1回の点だけで判断しない' },
    { en: "The number that matters is the growth, not the score.", ja: '大事なのは点そのものより伸びです', note: '低い点でも伸びていれば方向は合っている' },
    { en: "He's in the small group for reading.", ja: '読みは少人数のグループに入っています', note: '既に支援を受けているという意味。中身を確認する' },
    { en: "What percentile is that?", ja: 'それは何パーセンタイルですか', note: '全国と比べた位置が知りたいときの聞き方' },
    { en: "How does that compare to the rest of the class?", ja: 'クラスの中ではどのあたりですか', note: '数字を出させる。感想だけで帰らない' },
    { en: "Multiplication facts are still slow for him.", ja: 'かけ算がまだ遅いです', note: '九九のこと。家で解決できる部類の話' },
    { en: "She can decode, but she's not comprehending.", ja: '読めてはいますが、意味が入っていません', note: '音読が上手でも中身が抜ける子は多い' },
    { en: "Writing is where I'd focus if I were you.", ja: '私なら書く力に絞ります', note: '優先順位を先生に出させる。全部やろうとしない' },

    // ---- 行動と友達 ----
    { en: "He has a hard time staying in his seat.", ja: '席にいられないことが多いです', note: '落ち着きの無さの遠回しな指摘。次の面談でも必ず出る' },
    { en: "She talks a lot during independent work.", ja: '一人で進める時間によく喋ります', note: '静かにやる時間のこと。授業中の私語とは別の話' },
    { en: "He's very social.", ja: 'とても社交的です', note: '授業中に喋りすぎるという意味のことが多い' },
    { en: "He marches to his own drum.", ja: '彼は彼のやり方でやっています', note: '指示に従わないという意味の婉曲表現。真に受けない' },
    { en: "She's a bit of a perfectionist.", ja: '完璧主義なところがあります', note: '出せずに固まる、提出が遅いという意味' },
    { en: "He blurts out answers.", ja: '手を挙げずに答えを言ってしまいます', note: '順番を待てないという指摘' },
    { en: "Transitions are hard for him.", ja: '活動の切り替えが苦手です', note: '次の行動に移るところでつまずく。家でも同じことが起きている' },
    { en: "She's been having some friend drama.", ja: '友達関係でもめています', note: '深刻ではないが本人にはつらい、という温度の言い方' },
    { en: "He's been eating lunch alone.", ja: '最近ひとりで昼を食べています', note: '先生がこれを言ったら重い合図。詳しく聞く' },
    { en: "Has anyone been bothering him?", ja: '誰かに困らされていませんか', note: 'いじめの有無を柔らかく聞く言い方' },
    { en: "I haven't seen any bullying, but I'll keep an eye out.", ja: 'いじめは見ていませんが、気をつけて見ておきます', note: 'この約束は必ず取り付けて帰る' },
    { en: "He owns it when he messes up.", ja: '失敗したとき自分で認められます', note: '数少ない本物のほめ言葉。中身がある' },

    // ---- 家庭の事情 ----
    { en: "Is there anything going on at home I should know about?", ja: '家庭で何か知っておくべきことはありますか', note: '定型の質問。離婚や引っ越しは伝えたほうが子どもが守られる' },
    { en: "We're going through a divorce.", ja: '離婚の手続き中です', note: '言えば席替えや声かけの配慮につながる' },
    { en: "His grandmother passed away in October.", ja: '10月に祖母を亡くしました', note: '成績の落ち込みの説明として通る' },
    { en: "We just moved and he changed schools mid-year.", ja: '引っ越して年度途中で転校しました', note: '学力の穴の理由として学校側も納得する' },
    { en: "He's been having trouble sleeping.", ja: '眠れていません', note: '集中の話と直結する。必ず伝える' },
    { en: "That helps a lot. Thank you for telling me.", ja: 'とても参考になります。話してくださって助かります', note: '先生の受け答え。話して損になることはない' },
    { en: "Anything you tell me stays between us.", ja: '伺ったことは他には出しません', note: '不安なら先に確認していい' },
    { en: "We speak Japanese at home.", ja: '家では日本語です', note: '言語支援の判断材料になる。不利にはならない' },

    // ---- カウンセラーと支援 ----
    { en: "I'd like to loop in the counselor.", ja: 'カウンセラーにも入ってもらいたいです', note: '関係者を1人加えるという意味。断る理由はない' },
    { en: "The counselor runs a lunch group.", ja: 'カウンセラーが昼の小グループをやっています', note: '気軽な支援で、罰ではない。子どもにもそう伝える' },
    { en: "Do I need to sign something for that?", ja: '何か署名が要りますか', note: '保護者の同意が必要な支援は多い。その場で済ませる' },
    { en: "Is this something that goes on his record?", ja: 'これは記録に残りますか', note: '聞いていい。多くは残らない' },
    { en: "We can put some supports in place without a full evaluation.", ja: '正式な検査なしでも支援は入れられます', note: '待たずに始められる。この選択肢を知らない家庭が多い' },
    { en: "Let's start with a 504 plan.", ja: 'まず504プランから始めましょう', note: '授業中の配慮を決める仕組み。特別支援より手前の枠' },
    { en: "That would mean extra time on tests.", ja: '試験時間の延長などが付きます', note: 'どの配慮が具体的に付くのか必ず一覧で確認する' },
    { en: "Who else would be at that meeting?", ja: 'その会議には他に誰が来ますか', note: '人数を把握しておくと当日ひるまない' },

    // ---- 検査と評価 ----
    { en: "I'd recommend having him evaluated.", ja: '検査を受けることをお勧めします', note: '学習面の正式な評価のこと。怖い言葉ではない' },
    { en: "You can request an evaluation in writing at any time.", ja: '検査はいつでも書面で申請できます', note: '書面にすると学校側に期限が生じる。口頭では動かない' },
    { en: "The district has a timeline once you request it.", ja: '申請後は学区側の期限が決まっています', note: 'ここが効く。待たされ続けることを防げる' },
    { en: "Does this cost us anything?", ja: '費用はかかりますか', note: '学校の検査は無料。答えは基本的に No' },
    { en: "What exactly are they testing for?", ja: '具体的に何を調べるのですか', note: '中身を言わせる。曖昧なままにしない' },
    { en: "It could come back that he just needs more practice.", ja: '単に練習量の問題という結果もあり得ます', note: '何も出ないこともある。それも十分な情報' },
    { en: "We'd need a note from his doctor.", ja: '医師の書面が必要です', note: '医療の診断が絡む配慮のときに求められる' },
    { en: "I'll email you the paperwork tonight.", ja: '今夜書類をメールします', note: 'この一言を取り付けてから席を立つ' },

    // ---- 宿題 ----
    { en: "How long is homework taking at home?", ja: '家で宿題にどれくらいかかっていますか', note: '実際の時間を伝えると量を調整してもらえることがある' },
    { en: "It should be taking about twenty minutes.", ja: '20分程度のはずです', note: '学年ごとの目安がある。大幅に超えているなら異常' },
    { en: "It takes him two hours and there are tears.", ja: '2時間かかって泣いています', note: 'この報告だけで宿題は減らせる。我慢しないで言う' },
    { en: "If it's taking that long, just stop and write me a note.", ja: 'それだけかかるなら途中でやめて一筆ください', note: '途中でやめていいと言ってもらえる。毎晩の争いが消える' },
    { en: "He's not turning in the work he does.", ja: 'やったのに提出していません', note: 'やっていないのとは別問題。ここを混ぜない' },
    { en: "A lot of these zeros are missing assignments, not bad grades.", ja: 'この0点の多くは未提出で、出来が悪いわけではありません', note: '未提出は取り返しやすい。この区別で成績が戻る' },
    { en: "Can he make those up?", ja: 'それは後から出せますか', note: '頼めば通ることが多い。黙っていると0のまま残る' },
    { en: "Everything is on the portal — you can check it any time.", ja: 'すべてポータルで見られます。いつでも確認できます', note: '保護者用の成績サイト。面談を待たずに済む' },
    { en: "I don't have the login.", ja: 'ログインを持っていません', note: 'これを言えばその場で作ってもらえる' },

    // ---- スクリーンタイム ----
    { en: "How much screen time is he getting at night?", ja: '夜のスクリーンタイムはどれくらいですか', note: '集中と睡眠の話につながる定番の質問' },
    { en: "He's on the tablet until he falls asleep.", ja: '寝落ちするまでタブレットを見ています', note: '正直に言っていい。責められる場ではない' },
    { en: "I'd try charging it outside his room.", ja: '充電は部屋の外にするといいです', note: '一番よく出てくる具体策。実際に効く' },
    { en: "We've cut it to an hour on school nights.", ja: '翌日学校がある夜は1時間に減らしました', note: '平日と週末を分けて言うのが普通' },
    { en: "He says it's for homework.", ja: '宿題のためだと言っています', note: '半分は本当。学校側もそこは承知している' },
    { en: "The Chromebook has a filter, but it's not perfect.", ja: '学校の端末に制限はありますが完全ではありません', note: '家庭側の管理は結局必要になる' },

    // ---- 家でできること ----
    { en: "What can we do at home?", ja: '家で何ができますか', note: '面談で一番価値のある質問。時間が無くてもこれだけは聞く' },
    { en: "Twenty minutes of reading a night, that's it.", ja: '夜に20分読むだけでいいです', note: '一番多い答え。難しいことは求められていない' },
    { en: "Let him read anything he wants.", ja: '何を読んでもいいことにしてください', note: '漫画でも構わない。量が効く' },
    { en: "Have him read to you, not just silently.", ja: '黙読でなく声に出して読ませてください', note: '声に出すとどこでつまずくかが見える' },
    { en: "Flashcards in the car work fine.", ja: '車の中でカードをやるだけで十分です', note: 'まとまった学習時間は要らないという意味' },
    { en: "Don't correct every mistake — let him finish the sentence.", ja: 'いちいち直さず、文の最後まで言わせてください', note: '途中で止めると読む気が消える' },
    { en: "Should we get a tutor?", ja: '家庭教師をつけるべきですか', note: '先に聞くと無料の校内支援を教えてもらえる' },
    { en: "There's free tutoring after school on Tuesdays.", ja: '火曜の放課後に無料の補習があります', note: '存在を知らない家庭が多い。金をかけずに済む' },

    // ---- 次の一手 ----
    { en: "So what are we doing between now and spring?", ja: '春までに何をしますか', note: '面談を行動に変える一文。感想で終わらせない' },
    { en: "Let's check back in six weeks.", ja: '6週間後にもう一度確認しましょう', note: '期限を切ると実際に物事が動く' },
    { en: "Can you email me if the pattern continues?", ja: '同じことが続いたらメールをください', note: '次の面談まで待たないための仕組み' },
    { en: "I'll send home a weekly progress sheet.", ja: '週ごとの様子を紙にして持たせます', note: '頼めば作ってくれることが多い' },
    { en: "Let's put that in writing so we're on the same page.", ja: '認識をそろえるため書面にしましょう', note: '口約束は消える。担任が代わったときに効く' },
    { en: "Is there a good number to reach you?", ja: '連絡の付きやすい番号はありますか', note: '面談の最後に必ず出る質問' },
    { en: "Email is the fastest way to get me.", ja: 'メールが一番早く届きます', note: '先生への連絡手段を確認しておく' },

    // ---- 休み明け ----
    { en: "Let's touch base after the break.", ja: '休み明けにまた確認しましょう', note: '短く連絡を取り合うという意味。会議ではない' },
    { en: "He tends to lose ground over the summer.", ja: '夏の間に力が落ちがちです', note: '長期休みで積み上げた分が戻ってしまうこと' },
    { en: "Just keep him reading over break.", ja: '休み中も読むのだけ続けてください', note: '一番効く一言。これだけで落ち込みが止まる' },
    { en: "I'll be his teacher again next year.", ja: '来年も私が担任です', note: '続く場合は引き継ぎの心配が消える' },
    { en: "I'll pass all of this along to his next teacher.", ja: 'この内容は次の担任にも伝えます', note: '引き継ぎの確認。言われなければこちらから頼む' },
    { en: "Thanks for making the time — I know it's hard.", ja: '時間を作っていただき助かります', note: '面談の締め。こちらからも同じことを返す' },
];
