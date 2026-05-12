/**
 * 365 English Master -- Kaiwa Stories: Days 51-60
 *
 * Month 2 final stretch. Day 60 is the FINALE -- echoes Day 30 structure but
 * shows further growth. The crew is no longer learning English. They're living it.
 *
 * Day 51: ペットの話 (Pets)
 * Day 52: 料理する (Cooking)
 * Day 53: 掃除・洗濯 (Cleaning & Laundry)
 * Day 54: 買い物リスト (Shopping List)
 * Day 55: 子育ての話 (Parenting)
 * Day 56: 年齢の話 (Age)
 * Day 57: お金の話 (Money)
 * Day 58: SNS・ネット (Social Media)
 * Day 59: 季節の話 (Seasons)
 * Day 60: 1ヶ月の振り返り (Month 2 FINALE)
 */

import type { KaiwaStory } from './kaiwa-stories';

export const KAIWA_STORIES_6: KaiwaStory[] = [

    // ────────────────────────────────────────────────────
    // DAY 51: ペットの話 (Pets)
    // ミナの猫の写真大会。タケシの息子が金魚を殺した話
    // ────────────────────────────────────────────────────
    {
        daySlot: 51,
        title: '猫2匹と金魚1匹',
        titleEn: 'Two Cats and a Dead Goldfish',
        scene: '居酒屋。ミナが新しい猫の写真を見せる。タケシの息子の金魚事件で大爆笑。',
        story: [
            { speaker: 'mina', japanese: '見てください！子猫迎えました！', mood: 'excited', action: 'スマホの写真をカウンターに差し出す' },
            { speaker: 'lisa', japanese: 'かわい！Oh my god, she is adorable!', english: 'Oh my god, she is adorable!', mood: 'excited' },
            { speaker: 'yuki', japanese: '小さい！何ヶ月？How old is she?', english: 'How old is she?', mood: 'excited' },
            { speaker: 'mina', japanese: '3ヶ月です。先住猫がちょっと嫉妬してて。My older cat is jealous.', english: 'My older cat is jealous.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '猫って嫉妬するの！？', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、猫飼ったことない人みたい。猫めっちゃ嫉妬深いから。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は犬派だ。実家に柴犬がいた。死んだ時、号泣した。', mood: 'normal' },
            { speaker: 'mina', japanese: 'I am sorry for your loss. ペット失う痛みって本当に...', english: 'I am sorry for your loss.', mood: 'normal' },
            { speaker: 'kenji', japanese: 'もう10年前だ。でも忘れない。He was my best friend.', english: 'He was my best friend.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺んち、息子が金魚飼いたいって言うから3匹買った。1週間で全滅。', mood: 'defeated' },
            { speaker: 'yuki', japanese: '1週間!? 何があったんですか。', mood: 'excited' },
            { speaker: 'takeshi', japanese: '息子が「お腹空いてるかも」って思って、餌を1袋全部入れた...', mood: 'defeated' },
            { speaker: 'lisa', japanese: '...タケシ、それ虐待じゃん。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '違う！愛！息子は愛で殺した！He killed them with love!', english: 'He killed them with love!', mood: 'defeated' },
            { speaker: 'mina', japanese: 'タケシさんの息子さん、可愛い。でも金魚は可哀想。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'ペットの英語表現って結構あって。He is a rescue. 「保護犬・保護猫」って意味らしいですよ。', english: 'He is a rescue.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'rescue 使えるんだ、ユキ。アメリカだと保護動物迎えるの当たり前だから、よく聞く。', mood: 'normal' },
            { speaker: 'kenji', japanese: 'rescue か...次に犬飼うなら保護犬にしようかと思ってる。', mood: 'thinking' },
            { speaker: 'master', japanese: '...ペットってのは、言葉が通じない相手と暮らす練習だ。英語の前に、人間としての訓練だ。', english: 'Pets teach you to live without words.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'マスター、ペット飼ってる？', mood: 'thinking' },
            { speaker: 'master', japanese: '...この店のカウンターに止まる野良猫がいる。それでいい。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 52: 料理する (Cooking)
    // タケシが料理に挑戦した結果報告。全員引く
    // ────────────────────────────────────────────────────
    {
        daySlot: 52,
        title: 'タケシ、料理に挑戦',
        titleEn: 'Takeshi Tried to Cook',
        scene: '居酒屋。タケシが「妻のために料理した」と報告。結果を聞いて全員引く。',
        story: [
            { speaker: 'takeshi', japanese: '昨日、妻のために料理した！誕生日サプライズで！', mood: 'excited' },
            { speaker: 'yuki', japanese: 'タケシさん料理できたんですか!?', mood: 'excited' },
            { speaker: 'takeshi', japanese: 'いや...初挑戦！I tried my best!', english: 'I tried my best!', mood: 'excited' },
            { speaker: 'lisa', japanese: '...何作ったの。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'パスタ！YouTube見ながら作った！I followed the recipe! 多分。', english: 'I followed the recipe!', mood: 'excited' },
            { speaker: 'mina', japanese: '多分...？', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '塩を入れる場所がわからなくて...全部最後にぶっかけた。', mood: 'defeated' },
            { speaker: 'kenji', japanese: '...それ、塩辛すぎたな。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '妻が一口食べて泣いた。My wife cried after one bite.', english: 'My wife cried after one bite.', mood: 'defeated' },
            { speaker: 'lisa', japanese: '感動で？まずさで？', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...両方らしい。', mood: 'defeated' },
            { speaker: 'yuki', japanese: '料理英語って意外と知らないですよね。「炒める」って何て言うんだろ。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'stir-fry. 中華料理の炒めもイメージ。あと sauté は西洋風の炒め。', english: 'Stir-fry.', mood: 'normal' },
            { speaker: 'mina', japanese: '「煮る」は simmer ですよね？', english: 'Simmer.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'そう。boil より弱火でじっくり、が simmer。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は最近、米だけは炊けるようになった。I can cook rice now. ...炊飯器だが。', english: 'I can cook rice now.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ケンジさんそれ、cook じゃなくてpush a button じゃないですか！', mood: 'excited' },
            { speaker: 'kenji', japanese: '...黙れ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '私、自炊しません。I cannot cook to save my life. ...これ「料理できない」のイディオム合ってます？', english: 'I cannot cook to save my life.', mood: 'thinking' },
            { speaker: 'lisa', japanese: '完璧！「命がかかってても料理できない」って強調。', mood: 'smug' },
            { speaker: 'master', japanese: '...料理ってのは、誰かのために手を動かす時間だ。出来は二の次だ。', english: 'Cooking is about moving your hands for someone.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...マスター、今のいいこと言った。妻に伝える！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、それより塩の入れる場所を覚えろ。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 53: 掃除・洗濯 (Cleaning & Laundry)
    // 全員、掃除がだるい話。秩序維持の英語
    // ────────────────────────────────────────────────────
    {
        daySlot: 53,
        title: '部屋が爆発した',
        titleEn: 'My Place Is a Disaster',
        scene: '居酒屋。ミナが「部屋が散らかってヤバい」と告白。全員自分の部屋を反省する。',
        story: [
            { speaker: 'mina', japanese: '私の部屋、もう限界です。My place is a disaster.', english: 'My place is a disaster.', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'a disaster 出た！「災害レベル」って盛れる表現。', mood: 'smug' },
            { speaker: 'yuki', japanese: '私も。洗濯物が山。I have a mountain of laundry.', english: 'I have a mountain of laundry.', mood: 'defeated' },
            { speaker: 'takeshi', japanese: '俺の家、息子がレゴ全部床にぶちまけて、歩くたびに踏む。Stepping on Lego is a special kind of pain.', english: 'Stepping on Lego is a special kind of pain.', mood: 'defeated' },
            { speaker: 'kenji', japanese: '...嫁が片付け担当だ。俺は手を出すと逆に怒られる。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ケンジさん、それ役割分担というか、放置じゃない？', mood: 'normal' },
            { speaker: 'kenji', japanese: '...言うな。耳が痛い。', mood: 'defeated' },
            { speaker: 'mina', japanese: '今週末、徹底的に掃除します。I am going to do a deep clean.', english: 'I am going to do a deep clean.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'deep clean 完璧。「徹底掃除」のドンピシャ。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'ゴミ出しも英語で何て言うんだっけ...take out the trash?', english: 'Take out the trash.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'そう。あと take out the recycling. リサイクル分けて出すやつ。', english: 'Take out the recycling.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '日本のゴミ分別、外国人から見ると地獄って聞いた。Garbage separation is a nightmare.', english: 'Garbage separation is a nightmare.', mood: 'excited' },
            { speaker: 'mina', japanese: '私の地域、燃えるゴミ・燃えないゴミ・資源・粗大ゴミで4種類です。', mood: 'normal' },
            { speaker: 'kenji', japanese: '建設業から見ると、廃材の分別はもっと細かい。15種類くらいだ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '洗濯機も英語...do the laundry. やる、って意味でやる。', english: 'Do the laundry.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'あと throw it in the wash. 「洗濯機にぶち込む」みたいなカジュアル版。', english: 'Throw it in the wash.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'throw it in the wash! 俺、英語で生活感あふれる！', mood: 'excited' },
            { speaker: 'mina', japanese: 'タケシさんの服、いつもシワだらけですけど...', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'I throw them in the wash AND the dryer! でもアイロンしない！', english: 'I throw them in the wash and the dryer!', mood: 'defeated' },
            { speaker: 'master', japanese: '...部屋の状態は心の状態だ。両方どっちかから始めろ。', english: 'Your room reflects your mind.', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 54: 買い物リスト (Shopping List)
    // 必要なものを買いに行ったはずが、要らないものを買ってくる病
    // ────────────────────────────────────────────────────
    {
        daySlot: 54,
        title: '予定外の買い物の妙',
        titleEn: 'The Magic of Impulse Buying',
        scene: '居酒屋。リサが「スーパー行ったら3000円超えてた」と愚痴。全員あるある。',
        story: [
            { speaker: 'lisa', japanese: '今日スーパー行ったの。買うもの「卵と牛乳」だったのに、レジで3000円超えてた。', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'あるある！俺もアマゾン開いたら気づいたら買い物カゴ満タン！', mood: 'excited' },
            { speaker: 'mina', japanese: 'I always end up buying way more than I planned. Why is that？', english: 'I always end up buying way more than I planned.', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...物欲には勝てんよ。Impulse buying.', english: 'Impulse buying.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ケンジさん、impulse buying 知ってんの。', mood: 'excited' },
            { speaker: 'kenji', japanese: '...嫁に毎月怒られる単語だ。覚えるよ。', mood: 'defeated' },
            { speaker: 'yuki', japanese: '私はリスト作っても、リストにないもの買っちゃう。Shopping list never works for me.', english: 'Shopping list never works for me.', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'リストの罠ね。「ついで買い」って英語で grab something else on the way.', english: 'Grab something else on the way.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'コストコ行くと終わる。Everything is buy one get one free！', english: 'Everything is buy one get one free!', mood: 'excited' },
            { speaker: 'mina', japanese: 'タケシさん、ファミリーパックばっかり買ってそう。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '当たり！I buy in bulk! 家族3人なのにバルク！', english: 'I buy in bulk!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'buy in bulk「大量買い」も使えるね。アメリカは bulk が普通。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'Amazon の限定セールに弱くて。Limited time offer って書いてあると押しちゃう。', english: 'Limited time offer.', mood: 'defeated' },
            { speaker: 'kenji', japanese: '"It is on sale" の罠だな。安いから買うんじゃなくて、欲しいから買う。それが鉄則だ。', english: 'It is on sale.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ケンジさんなんで急に金融アドバイザーみたいになってんの。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...浪費で痛い目見てきたんだ。', mood: 'normal' },
            { speaker: 'mina', japanese: '私、最近 mindful shopping ってのを意識してます。本当に必要か考えてから買う。', english: 'Mindful shopping.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'mindful shopping いいね。意識的な買い物。流行りの概念。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺は mindless shopping だ！考えずに買う！', mood: 'excited' },
            { speaker: 'master', japanese: '...金は使い方に人柄が出る。お前らがここに来るのは、いい使い方だ。多分。', english: 'How you spend says who you are.', mood: 'normal' },
            { speaker: 'lisa', japanese: '「多分」ってマスター!?', mood: 'excited' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 55: 子育ての話 (Parenting)
    // タケシが息子の話。ケンジが娘の話。子供がいない側もそれぞれ
    // ────────────────────────────────────────────────────
    {
        daySlot: 55,
        title: '次の世代を語る夜',
        titleEn: 'Talking About the Next Generation',
        scene: '居酒屋。タケシが息子の英会話、ケンジが娘の将来の話。重い夜。',
        story: [
            { speaker: 'takeshi', japanese: '昨日、息子に「Daddy, why is sky blue?」って聞かれた。', english: 'Daddy, why is sky blue?', mood: 'thinking' },
            { speaker: 'yuki', japanese: '可愛い！何て答えたんですか？', mood: 'excited' },
            { speaker: 'takeshi', japanese: '...知らない。Because. って言った。 Because! 強引！', english: 'Because!', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'タケシ、それアメリカの親の十八番。Because I said so. 「お母さんがそう言うから」。', english: 'Because I said so.', mood: 'normal' },
            { speaker: 'mina', japanese: '英語圏の子育てって個性重視って聞きますよね。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...俺の娘、留学してから自分の意見をはっきり言うようになった。日本の学校ではそれが苦手だったのに。', mood: 'thinking' },
            { speaker: 'lisa', japanese: '海外の教育の影響大きいよね。Speak your mind. 「思ったことを言え」って文化。', english: 'Speak your mind.', mood: 'normal' },
            { speaker: 'yuki', japanese: '私、もし子供できたら、英語で育てるか日本語で育てるか迷う。', mood: 'thinking' },
            { speaker: 'mina', japanese: '友達がバイリンガル育児してて、子供3歳で混乱してます。日本語と英語混ぜて喋るそうです。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'It is called code-switching. それも才能の一種。混乱じゃない。', english: 'It is called code-switching.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'コード・スイッチング！俺も日本語と英語混ぜて喋ってる！俺バイリンガル！', mood: 'excited' },
            { speaker: 'mina', japanese: 'タケシさんのは違うと思います。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...俺は娘に「父さんは間に合わなかった」と言った。「父さんの代わりに、お前は世界を見ろ」と。', mood: 'thinking' },
            { speaker: 'narrator', japanese: 'カウンターが静まる。' },
            { speaker: 'mina', japanese: 'ケンジさん...', mood: 'thinking' },
            { speaker: 'kenji', japanese: 'でも今、ここで英語勉強してて思う。間に合わなかったんじゃない。遅かっただけだ。It is never too late.', english: 'It is never too late.', mood: 'normal' },
            { speaker: 'lisa', japanese: '...ケンジさん。子供たちはちゃんと見てる。今のあなたも。', mood: 'normal' },
            { speaker: 'yuki', japanese: '私、両親に何か恩返しできてるかな...って今ふと思いました。', mood: 'thinking' },
            { speaker: 'master', japanese: '...次の世代への責任ってのは、自分が成長してる姿を見せ続けることだ。それだけだ。', english: 'Responsibility to the next generation is to keep growing.', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...マスター、今日まじで重いことばっか言ってる。', mood: 'thinking' },
            { speaker: 'master', japanese: '...飲みすぎてる。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 56: 年齢の話 (Age)
    // 全員が「もう〇歳」「まだ〇歳」の話。世代論争
    // ────────────────────────────────────────────────────
    {
        daySlot: 56,
        title: '俺はもう、私はまだ',
        titleEn: 'Already vs Still',
        scene: '居酒屋。誕生日が近いユキが「もう29」と落ち込む。世代論が始まる。',
        story: [
            { speaker: 'yuki', japanese: '来月、29歳になります。I am turning 29.', english: 'I am turning 29.', mood: 'defeated' },
            { speaker: 'takeshi', japanese: 'え、ユキちゃんもう29!? 早くない!?', mood: 'excited' },
            { speaker: 'yuki', japanese: 'あと1年で30...信じられない。Where did the time go?', english: 'Where did the time go?', mood: 'defeated' },
            { speaker: 'lisa', japanese: '私32だよ。Time flies. 本当に。', english: 'Time flies.', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...お前ら全員若いぞ。俺は45だ。', mood: 'normal' },
            { speaker: 'mina', japanese: '私24です...ここの中で一番若い。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ミナちゃん24か...いいなぁ。アラフォーが見える35だぞ俺は。', mood: 'defeated' },
            { speaker: 'lisa', japanese: '日本だと年齢気にしすぎる傾向あるよね。Age is just a number は本当の話。', english: 'Age is just a number.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'でも周りが結婚して...家買って...私何もない。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'ユキ、それね、海外だと "I am where I am supposed to be." って言うんだ。「今いる場所が正しい場所」。', english: 'I am where I am supposed to be.', mood: 'normal' },
            { speaker: 'mina', japanese: 'いい表現ですね。', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...45で英語始めた俺が言うのもなんだが、年齢で諦めるな。20代の悩みは30代になれば笑える。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ケンジさん、いつも名言オジサンみたいになってる！', mood: 'excited' },
            { speaker: 'kenji', japanese: '...自然に出るんだ。年取ると。', mood: 'normal' },
            { speaker: 'yuki', japanese: '英語で年齢の話、何か他にあります？', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'I am not getting any younger. 「もう若くないし」。決意のときに使う。', english: 'I am not getting any younger.', mood: 'normal' },
            { speaker: 'mina', japanese: 'I am not getting any younger so I should... 何かを始める前のフレーズですね。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺もう感じる！I am not getting any younger so I should start running again!', english: 'I am not getting any younger so I should start running again!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、3ヶ月前から同じこと言ってる。', mood: 'normal' },
            { speaker: 'master', japanese: '...年齢ってのは、過ごした時間の証拠だ。若い時の自分に勝ってさえいれば、何歳でも勝ち組だ。', english: 'Age proves you spent the time.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...マスター、28歳の私に「29歳の私はもっと話せるよ」って言いに行きたい。', mood: 'normal' },
            { speaker: 'master', japanese: '言いに行けばいい。お前は今、確実にそうなってる。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 57: お金の話 (Money)
    // 給料日後の散財。値段の話の英語
    // ────────────────────────────────────────────────────
    {
        daySlot: 57,
        title: '給料日後の罠',
        titleEn: 'The Payday Trap',
        scene: '居酒屋。給料日翌日。タケシが新しいガジェットを自慢して全員から金額を聞かれる。',
        story: [
            { speaker: 'takeshi', japanese: '見て！新しいヘッドフォン買った！', mood: 'excited', action: 'カウンターに置く' },
            { speaker: 'yuki', japanese: 'おしゃれ！いくらしたんですか？How much did it run you?', english: 'How much did it run you?', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...聞かないで。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'How much did it run you 出た！「いくらしたの」のカジュアル版。', mood: 'smug' },
            { speaker: 'mina', japanese: 'タケシさん、5万くらいですか？', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '...8万。', mood: 'defeated' },
            { speaker: 'kenji', japanese: '...8万!? ヘッドフォンに!?', mood: 'angry' },
            { speaker: 'takeshi', japanese: 'I splurged! 散財！I deserved it!', english: 'I splurged! I deserved it!', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'splurge と I deserve it ペアで使うやつね。「自分にご褒美」って自己弁護。', english: 'I deserve it.', mood: 'normal' },
            { speaker: 'yuki', japanese: 'I have been working hard. ...って正当化したくなる気持ちわかります。', english: 'I have been working hard.', mood: 'normal' },
            { speaker: 'mina', japanese: '私は値段見ずに買い物しないタイプ。慎重派。I am pretty frugal.', english: 'I am pretty frugal.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'frugal「倹約家」。お金管理上手な人の英語。', mood: 'normal' },
            { speaker: 'kenji', japanese: '英語で「高い」って expensive 以外に何かあるか？', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'pricey. もっと感情入る。「うわ、高っ」って感じ。あと steep。「値段ぼったくり」のニュアンス。', english: 'Pricey. Steep.', mood: 'normal' },
            { speaker: 'mina', japanese: 'タケシさんのヘッドフォンの値段、Pricey じゃなくて steep ですね。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '...ミナちゃん辛辣!?', mood: 'excited' },
            { speaker: 'yuki', japanese: '安いの英語は cheap だけ？', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'cheap はネガティブな響き。「安っぽい」も含む。affordable がポジティブ「手ごろ」。a good deal「お得」。', mood: 'normal' },
            { speaker: 'kenji', japanese: 'It was a good deal. 使えるな。値切った時に。', english: 'It was a good deal.', mood: 'normal' },
            { speaker: 'mina', japanese: 'まあいっか、っていうのは英語で何ですか？タケシさん的な「8万でもまあいっか」を表現する。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'Whatever. か You only live once. か It is what it is. かな。タケシは多分YOLO。', english: 'You only live once.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'YOLO! That is me! I bought it because YOLO!', english: 'I bought it because YOLO!', mood: 'excited' },
            { speaker: 'master', japanese: '...YOLO は破産の前兆だ。気をつけろ。', english: 'YOLO is the beginning of bankruptcy.', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 58: SNS・ネット (Social Media)
    // インスタとXとの距離感。デジタル疲れの話
    // ────────────────────────────────────────────────────
    {
        daySlot: 58,
        title: 'SNS開いた瞬間に疲れる',
        titleEn: 'Tired the Moment I Open the App',
        scene: '居酒屋。ユキが「インスタ見るたびに気持ちが落ちる」と告白。デジタル疲れの夜。',
        story: [
            { speaker: 'yuki', japanese: '最近、インスタ開くたびに疲れる。Social media is exhausting.', english: 'Social media is exhausting.', mood: 'defeated' },
            { speaker: 'mina', japanese: 'わかります。みんな幸せそうで、自分だけ何もしてない気持ちになる。', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'It is called FOMO. Fear of missing out. みんなが見てるものを自分だけ見逃してる恐怖。', english: 'It is called FOMO.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'FOMOってミーム的なやつ？前から気になってた！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'ミームじゃなくて、ちゃんとした心理学用語だよ。SNS時代の精神病みたいなもん。', mood: 'normal' },
            { speaker: 'kenji', japanese: '...俺はXすら見ないが、ニュースだけで疲れる。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'Xはもうカオスですよね。Everyone is angry online.', english: 'Everyone is angry online.', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'これも英語の人がよく言う。Twitter is just people screaming. 「ツイッターは叫んでるだけ」って。', english: 'Twitter is just people screaming.', mood: 'normal' },
            { speaker: 'mina', japanese: '私、SNS休んでた時期があって。Social media detox.', english: 'Social media detox.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'detox 出たね。「デジタル断食」みたいなもん。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺、SNSやめると何の話していいかわからなくなる！ I rely on Twitter for jokes!', english: 'I rely on Twitter for jokes!', mood: 'excited' },
            { speaker: 'yuki', japanese: 'タケシさん、家族との会話どうしてるんですか。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: 'いや、家庭はsafeだから。But online I am a different person.', english: 'Online I am a different person.', mood: 'normal' },
            { speaker: 'lisa', japanese: '...タケシ、それ深い話してる気がする。', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...画面の向こうの人間は、画面の向こうにしかいない。隣にいる人間が一番大事だ。', mood: 'normal' },
            { speaker: 'mina', japanese: 'ケンジさん、最近どんどんかっこいいこと言うようになってる。', mood: 'excited' },
            { speaker: 'kenji', japanese: '...勘弁してくれ。', mood: 'defeated' },
            { speaker: 'master', japanese: '...画面はお前を見てない。でもお前は画面を見てる。その不均衡が疲れの正体だ。', english: 'The screen does not see you. But you see it.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...マスター、今のあまりにも刺さって、もう一回言ってほしい。', mood: 'thinking' },
            { speaker: 'master', japanese: '...聞き逃したお前が悪い。', mood: 'smug' },
            { speaker: 'lisa', japanese: 'マスター容赦ない!', mood: 'excited' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 59: 季節の話 (Seasons)
    // 5月末、季節の変わり目。風、光、匂いの話
    // ────────────────────────────────────────────────────
    {
        daySlot: 59,
        title: '初夏の匂い',
        titleEn: 'That Early Summer Smell',
        scene: '居酒屋。5月末。明日から6月。窓を開けたら風が心地よくて全員静かになる夜。',
        story: [
            { speaker: 'narrator', japanese: '5月最終日。居酒屋の引き戸が珍しく開いている。夜風が入る。' },
            { speaker: 'master', japanese: '...今夜は風がいい。閉めるのもったいない。', mood: 'normal', action: '入り口の引き戸を半分開ける' },
            { speaker: 'yuki', japanese: 'もう初夏ですね。Summer is just around the corner.', english: 'Summer is just around the corner.', mood: 'normal' },
            { speaker: 'mina', japanese: '夕方の光が、ちょっと前と違う。長くなった。Days are getting longer.', english: 'Days are getting longer.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'ミナのそれ詩的。Days are getting longer って英語でも好かれる言い方。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺は花粉から解放されて天国！I can finally breathe again!', english: 'I can finally breathe again!', mood: 'excited' },
            { speaker: 'kenji', japanese: '...現場はもう汗だくだ。It is sweltering outside.', english: 'It is sweltering outside.', mood: 'defeated' },
            { speaker: 'lisa', japanese: 'sweltering 出た！「うだるような暑さ」。ケンジさんの語彙が攻めてる。', mood: 'smug' },
            { speaker: 'yuki', japanese: 'sweltering...覚えとこ。', mood: 'thinking' },
            { speaker: 'mina', japanese: '夏が好きですか？私はちょっと苦手...', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '俺は夏最強！I am a summer person!', english: 'I am a summer person!', mood: 'excited' },
            { speaker: 'yuki', japanese: '私は秋派。I prefer fall.', english: 'I prefer fall.', mood: 'normal' },
            { speaker: 'lisa', japanese: 'fall? autumn?', mood: 'thinking' },
            { speaker: 'yuki', japanese: '...どっち使えばいい？', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'アメリカは fall、イギリスは autumn。気にしなくていい。両方通じる。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は冬が一番好きだ。空気が澄む。', mood: 'normal' },
            { speaker: 'lisa', japanese: 'The air is crisp in winter. これね。crisp は「パリッとした」って意味で空気にも使う。', english: 'The air is crisp in winter.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'crisp! ポテチみたい！', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、それイギリス英語の「ポテチ」だ。crisp = chip。混乱するな。', mood: 'normal' },
            { speaker: 'mina', japanese: '私、初夏のこの匂いが好きです。緑が濃くなる前の、まだちょっと青い感じ。', mood: 'thinking' },
            { speaker: 'lisa', japanese: 'ミナ、それ英語で言えたら詩人。I love the smell of early summer. Before the green gets too thick.', english: 'I love the smell of early summer.', mood: 'normal' },
            { speaker: 'master', japanese: '...季節は5感で覚えるもんだ。教科書じゃない。風が変わると、英語の出方も変わる。', english: 'Seasons are felt. Not studied.', mood: 'normal' },
            { speaker: 'yuki', japanese: '...明日から6月。早い。', mood: 'thinking' },
            { speaker: 'master', japanese: '...明日が、Month 2 の最終日だ。', mood: 'normal' },
        ],
    },

    // ────────────────────────────────────────────────────
    // DAY 60: 1ヶ月の振り返り (Month 2 FINALE)
    // Day 30と対をなす。さらに成長した6人
    // ────────────────────────────────────────────────────
    {
        daySlot: 60,
        title: 'Month 2、こうやって閉じる',
        titleEn: 'This Is How Month 2 Ends',
        scene: '6月1日前夜。居酒屋。Month 2最終日。30日前の自分と、60日前の自分と、今夜の自分。',
        story: [
            { speaker: 'narrator', japanese: '5月31日、火曜の夜。6人全員が権藤の居酒屋にいた。60日前は他人だった6人が、今夜は誰も時計を見ない。' },
            { speaker: 'takeshi', japanese: 'もう60日経ったのか...信じられない。Two months. Already.', english: 'Two months. Already.', mood: 'thinking' },
            { speaker: 'yuki', japanese: '...Day 1の時、Nice to meet youで止まったの、自分でも信じられない。', mood: 'thinking' },
            { speaker: 'mina', japanese: 'Day 30で「これからもっと喋れるようになる」って言ってましたよね、ユキさん。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...言った。今、本当に喋れるようになってる。少しだけど、確実に。', mood: 'normal' },
            { speaker: 'lisa', japanese: '見てて分かるよ。Month 1のユキと今のユキ、別人みたい。', mood: 'normal' },
            { speaker: 'kenji', japanese: '俺は娘と電話した。20分。全部英語。1ヶ月前は5分が限界だったのにな。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'ケンジさん20分!? 俺の妻と話すより長い!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシ、それは別の問題だね...', mood: 'normal' },
            { speaker: 'mina', japanese: '私は今日、会議で2回意見言いました。Can I add something? 2回も使えた。', english: 'Can I add something?', mood: 'excited' },
            { speaker: 'yuki', japanese: 'ミナちゃん!! Day 40で泣きそうになってたミナちゃんが!!', mood: 'excited' },
            { speaker: 'mina', japanese: '...マスターの「意見は筋肉と同じ」って言葉、毎朝思い出してる。', mood: 'normal' },
            { speaker: 'master', japanese: '...覚えてたか。', mood: 'normal' },
            { speaker: 'takeshi', japanese: '俺は!? 俺の成長は!?', mood: 'excited' },
            { speaker: 'lisa', japanese: 'タケシは...シカゴで食中毒に勝った。それが一番大きい。', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'I survived! Dull pain も throwing up も言えた！それマジで人生変わった！', english: 'I survived!', mood: 'excited' },
            { speaker: 'kenji', japanese: 'タケシ、お前あの夜のLINE、画面に貼っとけ。次の海外で読み返せ。', mood: 'normal' },
            { speaker: 'lisa', japanese: '私はね、教えることで自分も上達した。You guys really pushed me. Month 1の時より、もっと真剣に勉強するようになった。', english: 'You guys really pushed me.', mood: 'thinking' },
            { speaker: 'yuki', japanese: 'リサさんでも勉強してるんですか？', mood: 'excited' },
            { speaker: 'lisa', japanese: 'ネイティブだって毎日学ぶよ。みんなと話すたびに、自分の英語を見直してる。', mood: 'normal' },
            { speaker: 'narrator', japanese: '入り口の引き戸が、今夜は最初から開いている。夜風が入ってくる。' },
            { speaker: 'master', japanese: '...60日前のお前らを思い出してみろ。', mood: 'normal' },
            { speaker: 'yuki', japanese: '...怖がってた。英語が怖かった。', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...諦めかけてた。45歳で何ができるって。', mood: 'thinking' },
            { speaker: 'mina', japanese: '...声が出なかった。英語以前に、人前で。', mood: 'thinking' },
            { speaker: 'takeshi', japanese: '...勢いだけだった。今もだけど。でも、勢いの先に中身が少しできた。', mood: 'thinking' },
            { speaker: 'lisa', japanese: '...プライドが邪魔してた。教える立場って、何も知らないより怖い。', mood: 'thinking' },
            { speaker: 'master', japanese: '...全員、変わったな。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'マスター。Month 1の最後に「This is just the beginning」って言ってましたよね。', english: 'This is just the beginning.', mood: 'normal' },
            { speaker: 'master', japanese: '...覚えてたか。', mood: 'normal' },
            { speaker: 'yuki', japanese: '今度は、私から言わせてください。', mood: 'normal' },
            { speaker: 'yuki', japanese: 'This is just the middle.', english: 'This is just the middle.', mood: 'normal' },
            { speaker: 'narrator', japanese: '居酒屋が静まる。' },
            { speaker: 'lisa', japanese: '...ユキ、今のはやばい。鳥肌立った。', mood: 'thinking' },
            { speaker: 'kenji', japanese: '...真ん中だ。まだ真ん中だ。続けよう。', mood: 'normal' },
            { speaker: 'mina', japanese: 'I am in. ずっと続けます。', english: 'I am in.', mood: 'normal' },
            { speaker: 'takeshi', japanese: 'Me too! I am here for the long haul!', english: 'I am here for the long haul!', mood: 'excited' },
            { speaker: 'lisa', japanese: 'Same here. みんなと一緒に最後まで。', mood: 'normal' },
            { speaker: 'master', japanese: '...60日前、ここに6人の他人が座ってた。今夜、ここに6人の仲間が座ってる。', english: 'Two months ago, six strangers. Tonight, six teammates.', mood: 'normal' },
            { speaker: 'narrator', japanese: '誰も泣いてない。でも全員、目の奥が光っていた。' },
            { speaker: 'master', japanese: 'Month 3 starts tomorrow. ...来い。待ってる。', english: 'Month 3 starts tomorrow.', mood: 'normal' },
            { speaker: 'narrator', japanese: '下北沢の夜空に、雲が薄く流れている。6月の風はもう、5月の風じゃない。' },
            { speaker: 'narrator', japanese: '-- Month 2: Complete. Month 3 starts tomorrow. --' },
        ],
    },

];
