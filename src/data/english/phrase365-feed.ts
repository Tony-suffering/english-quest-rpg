/**
 * フレーズ貯金 -- 「今日の3個」(おまかせ便) の供給データ。
 *
 * コンセプト: 1日3フレーズを「しっかり」覚える。量で圧倒しない。
 * ターゲットは「I have a pen が分からないところから始めた人」から
 * 大人のニュアンスが欲しい人まで。5段階のレベルで自分の位置を選ぶ。
 *
 *  Lv1 はじめの一歩   二言三言でそのまま使える
 *  Lv2 毎日の定番     遅刻・寝坊・体調。生活の報告ができる
 *  Lv3 直訳じゃ出ない 単語は簡単なのに、日本語から作れない一言
 *  Lv4 決まり文句     ネイティブが体で覚えている言い回し
 *  Lv5 大人の一言     関係がなめらかになる、ニュアンスの効いた返し
 *
 * 選定基準:
 *  - 知らない単語で詰まらせない (レベル内では語彙を増やさず、使い方だけ増やす)
 *  - 感情や場面がくっつく (体調、遅刻、おごり、寝坊、割り勘)
 *  - 直訳とズレがあるものは note で一言だけ種明かし
 * note は1-2文まで。講義にしない。
 */

export type FeedLevel = 1 | 2 | 3 | 4 | 5;

export interface Phrase365FeedItem {
    en: string;
    jp: string;
    note: string;
    level: FeedLevel;
}

export const PHRASE365_LEVELS: { level: FeedLevel; name: string; desc: string; sampleEn: string; sampleJp: string }[] = [
    { level: 1, name: 'はじめの一歩', desc: '二言三言で、そのまま使える', sampleEn: 'It happens.', sampleJp: 'そういうこともあるよ' },
    { level: 2, name: '毎日の定番', desc: '遅刻・寝坊・体調。生活の報告ができる', sampleEn: "I'm on my way.", sampleJp: 'いま向かってる' },
    { level: 3, name: '直訳じゃ出ない', desc: '単語は簡単なのに、日本語から作れない一言', sampleEn: "It's on me.", sampleJp: 'ここは私が出すよ' },
    { level: 4, name: '決まり文句', desc: 'ネイティブが体で覚えている言い回し', sampleEn: 'Speak of the devil.', sampleJp: '噂をすれば' },
    { level: 5, name: '大人の一言', desc: '関係がなめらかになる、ニュアンスの効いた返し', sampleEn: 'Fair enough.', sampleJp: 'まあ、一理ある' },
];

export const PHRASE365_FEED: Phrase365FeedItem[] = [
    /* ================= Lv1 はじめの一歩 ================= */
    { level: 1, en: 'It happens.', jp: 'そういうこともあるよ。', note: 'ミスして落ち込む人を二語で救う。主語は it。あなたのせいじゃなく「それが起きた」。' },
    { level: 1, en: 'Not yet.', jp: 'まだだよ。', note: '「もう食べた?」「終わった?」への二語。完璧な文で答えなくていい。' },
    { level: 1, en: 'Same here.', jp: '私も。', note: 'me too の言い換え。注文でも共感でも「こっちも同じ」。' },
    { level: 1, en: 'My bad.', jp: 'ごめん、私のせい。', note: '軽いミスの謝罪。文ですらない二語。深刻な場面では使わないこと。' },
    { level: 1, en: 'Guess what?', jp: 'ねえ、聞いて。', note: '話を始める合図。「何か当ててみて」=当てなくていい、聞いてほしいだけ。' },
    { level: 1, en: 'Who knows?', jp: 'さあね、誰にもわからないよ。', note: '「誰が知っている?」と聞き返す形で「誰も知らない」になる。肩をすくめながら。' },
    { level: 1, en: 'Why not?', jp: 'いいじゃん、やろうよ。', note: '「なぜダメ?」=ダメな理由がない=賛成。誘いに乗る時の二語。' },
    { level: 1, en: 'How come?', jp: 'え、なんで?', note: 'why より砕けた聞き方。How come のあとは普通の文の語順でいいのが楽。' },
    { level: 1, en: "I'm in.", jp: '乗った。参加する。', note: '誘いへの最短の返事。輪の中(in)に入る、それだけ。' },
    { level: 1, en: 'What a day.', jp: 'なんて日だ。', note: '最高の日にも最悪の日にも使える。言い方だけで意味が決まる。' },
    { level: 1, en: 'Sounds good.', jp: 'いいね、それで。', note: '提案への軽いOK。sound=〜に聞こえる。「良く聞こえる」で賛成になる。' },
    { level: 1, en: "I'm starving.", jp: 'お腹ぺこぺこ。', note: 'hungry の上位互換。starve=飢える。大げさに言うのが正しい使い方。' },
    { level: 1, en: 'Take your time.', jp: 'ゆっくりでいいよ。', note: '急かさない優しさ。直訳「あなたの時間を取れ」=時間はあなたのものだから好きに使え。' },
    { level: 1, en: 'I got this.', jp: 'これは任せて。', note: '自分に言えば気合い、人に言えば頼もしさ。got=もう手の中にある。' },
    { level: 1, en: 'I feel you.', jp: 'その気持ち、わかるよ。', note: '共感の一言。understand より体温がある。友達にだけ使う。' },
    { level: 1, en: 'No way.', jp: 'うそでしょ。', note: '驚きはこれ一つで足りる。良い驚きにも悪い驚きにも、目を見開いて。' },
    { level: 1, en: 'After you.', jp: 'お先にどうぞ。', note: 'ドアやエレベーターの前で。「あなたの後に(行きます)」=お先にどうぞ。' },
    { level: 1, en: 'Not bad.', jp: 'なかなかいいじゃん。', note: '英語の「悪くない」はけっこう強い褒め言葉。照れ隠しにも聞こえる。' },
    { level: 1, en: 'Here you go.', jp: 'はい、どうぞ。', note: '物を手渡す時の決まり文句。コンビニでもカフェでも、世界中で一日中言われている。' },
    { level: 1, en: 'Any time.', jp: 'いつでもどうぞ。', note: 'お礼を言われた時の返し。「これくらい、またいつでも」。' },
    { level: 1, en: 'Good call.', jp: 'いい判断。', note: 'call=判断。傘を持ってきて正解だった時の「持ってきてよかったね」。' },
    { level: 1, en: 'Deal.', jp: 'それで決まり。', note: '交渉成立の一語。Deal? (それでいい?) と聞かれたら Deal. で返す。' },
    { level: 1, en: 'My treat.', jp: '私のおごり。', note: "treat=ごちそう。It's on me より軽くてかわいい。言われたら素直におごられる。" },

    /* ================= Lv2 毎日の定番 ================= */
    { level: 2, en: "I wasn't feeling well yesterday.", jp: '昨日は体調がよくなくて。', note: '病み上がりの報告はこれひとつで足りる。sick と言い切るより大人のぼかし方。' },
    { level: 2, en: "I'm on my way.", jp: 'いま向かってる。', note: '遅刻しかけの定番。これを一言送るだけで、待つ側の機嫌がぜんぜん違う。' },
    { level: 2, en: 'I overslept.', jp: '寝坊した。', note: 'over=超過。sleep を超えてしまった。遅刻の理由の第1位。' },
    { level: 2, en: "I'm almost there.", jp: 'もうすぐ着く。', note: '場所にも進捗にも使える。仕事が「もうすぐ終わる」も almost there。' },
    { level: 2, en: "I couldn't sleep last night.", jp: '昨日眠れなくてさ。', note: '朝のあいさつ代わりの不調報告。couldn\'t=しようとしたけど無理だった。' },
    { level: 2, en: "I'm just looking.", jp: '見てるだけです。', note: '店員に声をかけられた時の防御の呪文。世界中の買い物客がこれで身を守っている。' },
    { level: 2, en: 'Let me check.', jp: 'ちょっと確認させて。', note: '即答できない時、黙る代わりに言う。沈黙が「確認中」に変わる。' },
    { level: 2, en: "I'm working on it.", jp: 'いまやってる途中。', note: '「まだ?」と聞かれた時の正解。working on で「取り組み中」の進行感が出る。' },
    { level: 2, en: "I'm off today.", jp: '今日は休み。', note: 'off=スイッチが切れている。仕事のスイッチがオフの日。' },
    { level: 2, en: 'I have no idea.', jp: 'さっぱりわからない。', note: "I don't know より強くて、「見当もつかない」。idea=見当。" },
    { level: 2, en: 'Could you say that again?', jp: 'もう一回言ってもらえますか。', note: '聞き返しは恥じゃなく、会話の続行ボタン。黙って笑うほうが会話が死ぬ。' },
    { level: 2, en: "Let's split the bill.", jp: '割り勘にしよう。', note: 'split=割る、bill=勘定。おごり(My treat)とセットで覚えると食事が怖くない。' },
    { level: 2, en: "It's been a long day.", jp: '今日は長い一日だった。疲れた。', note: '帰り際のため息をそのまま英語にした形。夜にしか使えないのがまた良い。' },
    { level: 2, en: "I'm not a morning person.", jp: '朝は弱いんです。', note: '「〜な人間」は person で作れる。night person、dog person、coffee person。' },
    { level: 2, en: "Let's call it a day.", jp: '今日はここまでにしよう。', note: '仕事の終わりの宣言。「これを一日と呼ぼう」=もう十分やった。' },
    { level: 2, en: 'Long time no see.', jp: '久しぶり。', note: '文法的には壊れているのに全員使う。久しぶりの再会はこれで始まる。' },
    { level: 2, en: "I'm running late.", jp: 'ちょっと遅れそう。', note: '「遅れつつある」の進行形。遅れが確定した瞬間に送る。着く前に言うのが礼儀。' },
    { level: 2, en: 'Let me know.', jp: '決まったら教えて。', note: '日本語の「よろしく」くらいの頻度で使われる。文末に付けるだけで丸く終わる。' },
    { level: 2, en: "I'll text you.", jp: 'あとで連絡するね。', note: 'text は「メッセージを送る」という動詞になる。電話じゃなくて文字で、の合図。' },
    { level: 2, en: "I'm heading home.", jp: 'もう帰るところ。', note: 'head が動詞で「向かう」。帰り際の一言はこれ。head to work なら出勤中。' },
    { level: 2, en: 'How was your day?', jp: '今日どうだった?', note: '夕方以降のあいさつ。聞かれたら Good. の一語でもいいから、何か返すのがルール。' },

    /* ================= Lv3 直訳じゃ出ない ================= */
    { level: 3, en: "It's on me.", jp: 'ここは私が出すよ。', note: 'おごる時の決まり文句。on は「負担が乗る」。勘定が me の上に乗る。' },
    { level: 3, en: 'That works for me.', jp: 'それで大丈夫。', note: '日程調整の返事はこれ。work は「働く」じゃなく「都合が合う」。' },
    { level: 3, en: "It's up to you.", jp: 'あなた次第だよ。', note: '決定権をまるごと渡す言い方。up to=〜の上に載っている=責任があなたの上に。' },
    { level: 3, en: 'It depends.', jp: '場合によるね。', note: '質問に答えつつ断定を避ける、大人の二語。depend=ぶら下がる。状況にぶら下がっている。' },
    { level: 3, en: "It's not a big deal.", jp: '大したことないよ。', note: 'deal=取引・案件。「大きな案件じゃない」=気にするな。謝られた時の返しにも。' },
    { level: 3, en: 'Something came up.', jp: '急に用事ができちゃって。', note: 'ドタキャンの万能フレーズ。何が来たか言わなくていいのが強い。' },
    { level: 3, en: 'It slipped my mind.', jp: 'うっかり忘れてた。', note: 'forgot より「するっと抜けた」感じが出て、責められにくい。slip=滑る。' },
    { level: 3, en: "I'll pass this time.", jp: '今回はやめておく。', note: '断りの角が立たない形。pass=見送る。「今回は」を付けると次がある感じも残る。' },
    { level: 3, en: "I'm getting there.", jp: 'だんだんできるようになってきた。', note: '上達の途中報告。there=目標地点。まだ着いてないけど向かっている。' },
    { level: 3, en: 'That makes sense.', jp: 'なるほど、筋が通ってる。', note: '相づちの最上位。sense を make する=意味が成立する。納得した時に。' },
    { level: 3, en: 'So far, so good.', jp: '今のところ順調。', note: 'so far=ここまでは。経過報告の定番で、少し不安が残っている響きもある。' },
    { level: 3, en: "It's worth a try.", jp: 'やってみる価値はあるよ。', note: 'worth=価値がある。迷っている人の背中を押す一言。' },
    { level: 3, en: "I can't help it.", jp: 'どうしようもないんだよ。', note: 'やめられない時の言い訳。help には「避ける」の意味がある。「避けられない」。' },
    { level: 3, en: 'You made my day.', jp: 'おかげで今日は最高の気分。', note: '小さな親切に大げさに返すのがコツ。made my day=私の一日を作った。' },
    { level: 3, en: 'It could be worse.', jp: 'まだマシなほうだよ。', note: '慰めの型。「もっと悪くなり得た」=これで済んでよかった。' },
    { level: 3, en: "I'll keep that in mind.", jp: '覚えておくね。', note: 'アドバイスへの返事の定番。mind の中に keep する。やるとは言っていないのも便利。' },
    { level: 3, en: "It's about time.", jp: 'やっとかよ。', note: '待ちくたびれた時の一言。「そろそろその時間」=遅すぎるくらいだ。' },
    { level: 3, en: 'You never know.', jp: 'やってみないとわからないよ。', note: '「あなたは決して知らない」=先のことは誰にも読めない。挑戦する側の口癖。' },
    { level: 3, en: 'It came out of nowhere.', jp: '突然だったんだよ。', note: 'nowhere(どこでもない場所)から出てきた=前触れゼロ。雨にも訃報にも。' },
    { level: 3, en: "I'll get back to you.", jp: 'あとで返事するね。', note: 'get back=戻る。「返事を持ってあなたのところに戻る」。即答を避ける正式な形。' },
    { level: 3, en: "It's a long story.", jp: '話せば長いんだけど。', note: '説明したくない時の丁寧な逃げ道。本当に聞きたい人だけが食い下がってくる。' },
    { level: 3, en: "It didn't work out.", jp: 'うまくいかなかったんだ。', note: 'work out=うまく転がる。恋愛にも仕事にも使える、「ダメだった」のやわらかい形。' },
    { level: 3, en: "I didn't mean it.", jp: 'そういうつもりじゃなかった。', note: 'mean=意図する。言いすぎた後の謝罪の相棒。mean it (本気で言う) の否定形。' },

    /* ================= Lv4 決まり文句 ================= */
    { level: 4, en: 'Speak of the devil.', jp: '噂をすれば。', note: '話題にしていた本人が現れた時に。悪魔の話をすると悪魔が来る、という古い迷信から。' },
    { level: 4, en: 'It runs in the family.', jp: '家系なんだよね。', note: '遺伝の話は run。才能も病気も、家系の中を「走って」受け継がれる。' },
    { level: 4, en: "That's what I thought.", jp: 'やっぱりね。', note: '予想が当たった時の一言。「それが私の思っていたこと」。' },
    { level: 4, en: "Now you're talking.", jp: 'そう来なくちゃ。', note: '相手がやっと乗り気になった時の合いの手。「今、君は(いいことを)話している」。' },
    { level: 4, en: "It's been one of those days.", jp: '今日はそういう日なんだよ。', note: '「例のああいう日」=何をやってもダメな日。この言い方だけで全人類に通じる。' },
    { level: 4, en: 'Better late than never.', jp: '遅れても、やらないよりマシ。', note: '遅刻の言い訳にも、遅い挑戦の応援にも。英語圏のことわざの中で一番使う。' },
    { level: 4, en: 'Easier said than done.', jp: '言うのは簡単だけどね。', note: '「言うのはやるより簡単」。正論を言われた時の、角の立たない返し。' },
    { level: 4, en: 'It is what it is.', jp: 'まあ、そういうもんだよ。', note: '「それはそれ」。変えられないことを受け入れる、ため息つきの決まり文句。' },
    { level: 4, en: 'No wonder.', jp: '道理でね。', note: 'wonder=不思議。「不思議じゃない」=納得。謎が解けた時の二語。' },
    { level: 4, en: 'Suit yourself.', jp: 'お好きにどうぞ。', note: '「自分に合わせろ」=勝手にして。ちょっと突き放した響きがあるので言い方に注意。' },
    { level: 4, en: 'Be my guest.', jp: 'どうぞご自由に。', note: '「私の客になって」=遠慮なくどうぞ。借りたいと言われた時の快諾。' },
    { level: 4, en: 'You name it.', jp: '何でもあるよ。', note: 'name=名前を挙げる。「言ってみて、全部あるから」。品揃え自慢の決まり文句。' },
    { level: 4, en: 'It rings a bell.', jp: '聞き覚えがあるなあ。', note: '頭の中で鈴が鳴る=記憶に引っかかる。思い出せそうで思い出せない時。' },
    { level: 4, en: "I'm all ears.", jp: 'じっくり聞くよ。', note: '「全身が耳」=聞く体勢はできている。相談を促す優しい一言。' },
    { level: 4, en: 'I lost track of time.', jp: '時間を忘れてた。', note: 'track=追跡。時間の行方を見失った=夢中だった。遅刻の理由で一番かわいい。' },
    { level: 4, en: 'I slept like a log.', jp: '爆睡した。', note: 'log=丸太。丸太のように転がったまま朝まで。よく眠れた自慢はこれで。' },
    { level: 4, en: 'Break a leg.', jp: '本番、がんばって。', note: '直訳「脚を折れ」がなぜか激励。幸運を直接祈ると逆になる、という舞台の迷信から。' },
    { level: 4, en: "I'm on the fence.", jp: 'どっちにするか迷ってる。', note: 'フェンスの上に座って、どちら側にも降りていない状態。買い物にも進路にも。' },
    { level: 4, en: 'That figures.', jp: 'だと思った。', note: 'figure=筋が通る。呆れ半分の納得。「あいつまた遅刻? だと思った」。' },

    /* ================= Lv5 大人の一言 ================= */
    { level: 5, en: "I'm flattered.", jp: '照れるなあ、うれしいよ。', note: '褒められた時の大人の受け方。否定して謙遜する代わりに、喜びを言葉にする。' },
    { level: 5, en: "Don't get me wrong.", jp: '誤解しないでね。', note: '言いにくいことの前置き。get me wrong=私を間違って受け取る。' },
    { level: 5, en: 'I mean it.', jp: '本気で言ってるんだよ。', note: 'お世辞だと思われた時に重ねる一言。mean=意図する。冗談の後の「今のは本気」にも。' },
    { level: 5, en: 'Fair enough.', jp: 'まあ、一理ある。', note: '「十分フェアだ」=完全同意ではないが筋は通っている。大人の相づちの代表。' },
    { level: 5, en: 'I owe you one.', jp: 'ひとつ借りができたね。', note: 'owe=借りがある。ありがとうを「次は私が返す」という関係の続く形で言う。' },
    { level: 5, en: 'My hands are tied.', jp: 'こっちも動けない事情があって。', note: '「両手が縛られている」=助けたいが立場上できない。断りの最も丁寧な形。' },
    { level: 5, en: "Let's play it by ear.", jp: '成り行きで決めよう。', note: '楽譜なしで耳で弾く=その場のノリで。予定を固めたくない時の魔法の言葉。' },
    { level: 5, en: 'Let me sleep on it.', jp: '一晩考えさせて。', note: '「それの上で寝かせて」=即答しない。真剣に検討している、が伝わる保留。' },
    { level: 5, en: 'I stand corrected.', jp: '私が間違ってた。訂正するよ。', note: '「訂正された状態で立つ」=誤りを認める。潔さがそのまま信用になる一言。' },
    { level: 5, en: 'You have a point.', jp: 'それは一理あるね。', note: 'point=論点。全面降伏はせずに、相手の言い分の一部を立てる。議論がやわらぐ。' },
    { level: 5, en: "I didn't see that coming.", jp: 'それは予想外だった。', note: '「それが来るのが見えなかった」=完全に不意打ち。展開への驚きの定番。' },
    { level: 5, en: "Let's agree to disagree.", jp: '意見は違うままにしておこう。', note: '「不一致に合意する」=平行線のまま仲良く終わる。口論の一番きれいな出口。' },
    { level: 5, en: 'No offense, but ...', jp: '悪気はないんだけど。', note: 'offense=悪意。この後に来るのは大体ちょっと失礼なこと。先に毒を抜くクッション。' },
    { level: 5, en: 'I hate to say it, but ...', jp: '言いにくいんだけどさ。', note: '悪い知らせの前置き。「言うのが嫌だ」と先に示すことで、刺さり方が浅くなる。' },
    { level: 5, en: "That's a stretch.", jp: 'それはさすがに無理があるよ。', note: 'stretch=引き伸ばし。「話を伸ばしすぎ」=論理が強引。やんわりした反論。' },
    { level: 5, en: "I'll give you that.", jp: 'そこは認めるよ。', note: '「その点はあなたにあげる」=部分的に譲る。議論で全部は渡さない技。' },
    { level: 5, en: 'That ship has sailed.', jp: 'その話はもう終わったことだよ。', note: '「その船はもう出港した」=手遅れ。過去を蒸し返されそうな時に。' },
    { level: 5, en: "It's not my place to say.", jp: '私が口を出すことじゃないから。', note: 'place=立場。「言う立場にない」。踏み込まない礼儀で、逆に信頼される。' },
];
