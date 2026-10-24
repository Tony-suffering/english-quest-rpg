/**
 * 俺語録ログ — 会話ごとに拾った「とにおの生の日本語 -> 英語」の積み上げ。
 *
 * CLAUDE.md の 俺語録 auto-curation を、チャットで終わらせず残す器。
 * 毎会話の終わりに拾った表現を、ここの先頭セッションに足していく。
 * 各カードは /api/phrases に流し込めば /english/training で暗記できる。
 *
 * パターン番号は Journal #115 の 10話型:
 * 1 レンガ積み / 2 軌道 / 3 許可サンドイッチ / 4 エスカレーション梯子 /
 * 5 哲学トラップドア / 6 聴衆マルチプレックス / 7 メタ実況 /
 * 8 だからの川 / 9 未完成の招待 / 10 英語質問爆弾
 *
 * 追記ルール: 1:1翻訳(うーん->hmm)は入れない。ギャップが面白い/使えるものだけ。
 */

export interface GorokuLogEntry {
    ja: string;         // 実際に言った日本語
    pattern: string;    // 10話型のどれか
    english: string;    // native がそのまま口に出す英語(登録される値)
    note?: string;      // なぜその英語が効くか / 日本語との差
}

export interface GorokuLogSession {
    date: string;       // YYYY-MM-DD
    source: string;     // どの会話か
    entries: GorokuLogEntry[];
}

export const gorokuLog: GorokuLogSession[] = [
    {
        date: '2026-10-20',
        source: 'DMM第143夜の書き起こしを貼る前に、その日の活動を先に見るよう頼んだ1件',
        entries: [
            {
                ja: 'まずここからはじめる　実装はしないで、俺の今日の活動をみて',
                pattern: '#3 許可サンドイッチ',
                english: "Let's start here. Don't build anything. Just look at what I did today.",
                note: '先に禁止(実装しないで)を挟んでから本題を置く。Just look at で、手を出すなの圧を残す。まずここから は Let us start here で、段取りを宣言する司会の口調になる。',
            },
        ],
    },
    {
        date: '2026-10-18',
        source: '書き取った英文30行を貼り、スペルの直しと日本人への助言付きでの登録を頼んだ会話の1件',
        entries: [
            {
                ja: 'スペルミスとか直してトレーニングに直接入れて　わかる？　あと、日本人に対するアドバイスとか入れられる？それぞれ？わかる？例えば、let them think とか絶対日本人の脳からでてこないよね？',
                pattern: '#4 エスカレーション梯子',
                english: "Fix the typos and put them straight into training, okay? And can you add advice for Japanese learners? For each one? You get me? Like, let them think. No Japanese brain is ever coming up with that, right?",
                note: 'わかる？を2回挟んで、依頼を1段ずつ積み上げる。You get me? は確認と圧が半々。絶対〜でてこない は never より is ever coming up with の方が、日本人の脳を擬人化した本人の笑いが残る。',
            },
            {
                ja: '英検スピーキングの話だけど、俺今１４０００枚のカードあるよね？それで最強の文章つくれるんじゃない？最近のDMM会話でも言ってる通り、政治と経済は必ず出る、それに１０本の指のやつとかで、I will discuss a b ,and cとかで初めて、応用の利くうまい例文を暗記するのが、本番で焦らない方法だよね？わかる？',
                pattern: '#8 だからの川',
                english: "So, about the Eiken speaking test. I've got like fourteen thousand cards now, right? Can't I build the ultimate answers out of those? Like I keep saying in my DMM lessons, politics and the economy always come up. So if I take the ten-finger thing, start with I will discuss A, B, and C, and memorize a few solid example sentences that work for anything, that's how I stop panicking on the day, right? You get me?",
                note: '持ち札の数 → 出題の読み → 型 → 暗記 → 本番で焦らない、と前の文を次の文の根拠にして流していく。最後の わかる？ は同意の確認で、You get me? が温度に合う。',
            },
            {
                ja: '作らないで提案して',
                pattern: '#1 レンガ積み',
                english: "Don't build it. Just pitch it.",
                note: '6文字で作業の範囲を切った。pitch は企画を出すの口語で、propose より軽く、まだ作るなの圧が残る。',
            },
            {
                ja: 'ドリルとかいらないから、実際に俺のカードをに全て目をとおして、出典も記載して経済について語ってみてよ　例文ここに書いて？わかる？',
                pattern: '#4 エスカレーション梯子',
                english: "Forget the drills. Actually go through every single one of my cards, cite where each line came from, and talk about the economy. Write the sentences right here, okay? Got it?",
                note: 'いらない → 全部見ろ → 出典も → 語れ → ここに書け、と要求が1段ずつ重くなる。Forget the drills で前の提案を一言で捨てるのが本人の切り方。',
            },
            {
                ja: 'いいけどさ、ほとんど英検対策の例文なんだよなああ　もっと全部みて、カジュアルなのとかつくれない？わかる？生のJREの英語とかたくさんあるでしょ？',
                pattern: '#3 許可サンドイッチ',
                english: "I mean, it's fine, but it's basically all Eiken prep sentences, man. Can you look at everything and make something more casual? You know what I mean? There's tons of raw Joe Rogan stuff in there, right?",
                note: 'いいけどさ で一度受けてから不満を出し、最後に材料の場所まで指す。なんだよなああ の伸ばしは man と basically で残す。生の は raw がそのまま通る。',
            },
            {
                ja: '前に、５つの例文一昨日？読んでそれにコメントくれた先生ともう一回会話するからそれがいかに俺にとって重要かとか丁寧に感謝して言って、今日もそれをやりたい、昨日海岸で歩いて３時間君の英語を音読したみたいなジョークも交えて英語でここに書いて',
                pattern: '#8 だからの川',
                english: "I'm talking to that teacher again, the one who commented on the five model answers I read, the day before yesterday I think? So write me something in English, right here, that thanks them properly and says how much it meant to me, that I want to do the same thing today, and throw in a joke like, yesterday I walked along the beach for three hours reading your English out loud.",
                note: '一昨日？ と日付を自分で疑いながら、相手 → 礼 → 今日の頼み → ジョークの中身、と息継ぎなしで1本に流す。ジョークの中身まで指定するのが本人の段取り。',
            },
        ],
    },
    {
        date: '2026-10-17',
        source: 'DMM第140夜(海辺の土曜日と哲学)の生の書き起こしと外部AIの分析を貼り、全層の作業が長く無言で続いていた途中の1件',
        entries: [
            {
                ja: 'なにしてるの・',
                pattern: '#7 メタ実況',
                english: "What are you even doing?",
                note: '画面の向こうが静かなときの催促。What are you doing? だと純粋な質問になるので、even を足して待たされている温度を出す。末尾の・は打ち間違いの句点で、急いで打った手の跡。',
            },
        ],
    },
    {
        date: '2026-10-16',
        source: '書き取った英文27行の3回目のバッチを貼り、10/10・10/15 と一字一句同じ依頼文を付けた会話の1件',
        entries: [
            {
                ja: '今回のはあらたな実験だから、まずは実装する前に君の意見が欲しい。　盗めるものは全て盗む　俺は今回ほとんど話していない。ただ全文登録してもしょうもない　どう思う？どうする？',
                pattern: '#9 未完成の招待',
                english: "This one's a new experiment, so before you build anything, I want your take. Steal everything that can be stolen. I barely talked this time. But just dumping the whole transcript in is pointless. What do you think? What do we do?",
                note: '実装の前に意見を求める、この会話で初めての型。盗めるものは全て盗む は Steal everything that can be stolen で命令形のまま。しょうもない は pointless。どう思う? どうする? の2連は What do you think? What do we do? で、2つ目を we にすると相手を巻き込む圧が残る',
            },
            {
                ja: '豆知識とかも、トレーニングに登録されないと俺は見ない。改善点は？ちゃんと考えてあから提案して',
                pattern: '#10 英語質問爆弾',
                english: "Stuff like the trivia notes, if it's not in training, I never see it. What needs fixing? Think it through properly, then pitch me.",
                note: '見ない は never see it で、意思ではなく事実として言う。改善点は? は What needs fixing? の3語。ちゃんと考えてから提案して は Think it through properly, then pitch me で、pitch が提案の口語',
            },
            {
                ja: '正直全部登録していいかな　英検がどうのとかいつまでやっての？（笑）',
                pattern: '#5 哲学トラップドア',
                english: "Honestly, just register all of it. The whole Eiken thing, how long are we going to keep doing that? Haha.",
                note: '英検がどうの は the whole Eiken thing で、こだわりを1語に丸める。いつまでやってるの? は how long are we going to keep doing that? で、we にすると自分も含めた笑いになる。（笑）は Haha',
            },
            {
                ja: 'も全部登録していいよ　分割してね？まかせるから詳細に全部登録して　俺が削除するあとで　盗めるものは全部盗む？OK?',
                pattern: '#4 エスカレーション梯子',
                english: "Register that too, all of it. Split it up, yeah? I'm leaving it to you, so put everything in, in detail. I'll delete stuff later. We steal everything that can be stolen, okay? OK?",
                note: '分割してね? は Split it up, yeah? で付加の圧。まかせるから は I\'m leaving it to you。俺が削除するあとで は I\'ll delete stuff later で、削る権限を自分に残す1文。OK? の2連は okay? OK? でそのまま',
            },
            {
                ja: 'スペルミスとか直してトレーニングに直接入れて　わかる？　あと、日本人に対するアドバイスとか入れられる？それぞれ？わかる？例えば、let them think とか絶対日本人の脳からでてこないよね？',
                pattern: '#4 エスカレーション梯子',
                english: "Third batch, same as before. Typos fixed, straight into training. Got it? Tips for Japanese learners on every single one. Got it?",
                note: '3回目の同じ依頼文。本人は一度通った依頼文を変えない。英語では Third batch, same as before で前2回を引き受けて、梯子(Got it? 2回)はそのまま残す。every single one で それぞれ? の圧を出す。わかる? は3夜で6回になった',
            },
        ],
    },
    {
        date: '2026-10-15',
        source: '書き取った英文29行(32文)の2回目のバッチを貼り、10/10 と一字一句同じ依頼文を付けた会話の1件',
        entries: [
            {
                ja: 'スペルミスとか直してトレーニングに直接入れて　わかる？　あと、日本人に対するアドバイスとか入れられる？それぞれ？わかる？例えば、let them think とか絶対日本人の脳からでてこないよね？',
                pattern: '#4 エスカレーション梯子',
                english: "Same drill as last time. Fix the typos, straight into training. Got it? And the tips for Japanese learners, one per card. Got it? Stuff like let them think, no Japanese brain is ever producing that.",
                note: '10/10 の依頼文をそのまま再利用した。本人は通った依頼文を定型として使い回す。英語では Same drill as last time を頭に置くと、前回と同じだと一発で伝わり、残りの梯子(Got it? 2回)はそのまま残せる。本人の言葉を数えるなら、わかる? は2夜で4回',
            },
        ],
    },
    {
        date: '2026-10-14',
        source: 'DMM 第137夜(南アの講師、MRI と補聴器、揺りかごから墓場まで)の生の書き起こしを貼り、全層に焼いた納品を見て本人が言った1件',
        entries: [
            {
                ja: '彼の英語は貴重だよ？わかる？',
                pattern: '#4 エスカレーション梯子',
                english: "His English is gold. You get that, right?",
                note: '貴重 を precious にすると宝石の話になる。人の英語なら gold か rare が口語。だよ? わかる? の2段は、言い切ってから相手の理解を問い詰める梯子で、You get that, right? が同じ圧。納品の順番(本人の失点54枚を主役にして講師の36本を脇に置いた)を1文で裏返した言葉',
            },
        ],
    },
    {
        date: '2026-10-10',
        source: '書き取った英文32本を貼って、スペルを直して training に直接入れ、日本人の脳から出ない型の助言を付けろと頼んだ会話の1件',
        entries: [
            {
                ja: 'スペルミスとか直してトレーニングに直接入れて　わかる？　あと、日本人に対するアドバイスとか入れられる？それぞれ？わかる？例えば、let them think とか絶対日本人の脳からでてこないよね？',
                pattern: '#4 エスカレーション梯子',
                english: "Fix the typos and stuff and throw them straight into training. Got it? Oh, and can you add tips for Japanese learners? For each one? Got it? Like, let them think. No Japanese brain is ever coming up with that, right?",
                note: '依頼を出して わかる? で一度止め、あと で段を足し、それぞれ? でさらに細かくして、最後に例で同意を取りに行く梯子。わかる? は Got it? の2回でそのまま残す。絶対〜でてこない は No Japanese brain is ever coming up with that で、主語を脳にして笑いを残す',
            },
        ],
    },
    {
        date: '2026-10-08',
        source: 'DMM の講師に /english/speak の作り方とカーテンレールの夜間工事を英語で話す台本を頼み、第132夜の生の書き起こしと外部AIの分析を貼って全層に焼かせ、note もおもしろくしろと言った会話の4件',
        entries: [
            {
                ja: 'https://iwasaki-naisou.com/english/speakをどう作ったか、模範解答では意味がないのか？JREで作ったよね？覚えてる？をDMMの先生に説明する文章と、英語で昨日の夜夜中東京でカーテンレールの取付で、夜間仕事があったこと（カーテンの発音事件もDMMで調べて）おもしろく講師に説明する知的な口語を英語でここに書いて　わかる？',
                pattern: '#1 レンガ積み',
                english: "Okay, two things. One, how I built the speak page, why model answers are useless, the whole JRE thing. You remember that, right? Two, last night's night job in Tokyo, putting up curtain rails, plus the curtain pronunciation disaster from DMM. Look that up. Make it funny but smart. Write it right here. You with me?",
                note: '依頼を1文に全部積んで、最後に わかる? で念押しする型。英語では One / Two で番号を振ると同じ圧のまま読める。覚えてる? は You remember that, right? で、確認というより思い出させる圧になる',
            },
            {
                ja: '使える英語表現は全部使って',
                pattern: '#4 エスカレーション梯子',
                english: "Use every single usable expression in there.",
                note: '全部 を every single にすると、1個も取りこぼすな、の圧が出る。直訳の use all the expressions より強い。外部AIの分析を貼った直後の一言',
            },
            {
                ja: 'やつぎばやとか、とにかく表現イディオムを拾う　てかお前セルフでもできるよねｗ',
                pattern: '#7 メタ実況',
                english: "Stuff like rapid-fire. Just grab every idiom. And honestly, you could do this yourself, right? lol",
                note: 'やつぎばや は rapid-fire そのもの。てか は and honestly で、言いながら相手の怠慢に気づいて笑う流れ。ｗ は lol で残す。責める調子ではなくツッコミ',
            },
            {
                ja: 'こういう感じでもっとおもしろくしてnoteの記事も書いて',
                pattern: '#9 未完成の招待',
                english: "Something like this, but funnier. And write the note article too.",
                note: 'こういう感じ は Something like this で例を見せて、もっと は but funnier の比較級1語で足りる。も は too を最後に置くだけで、ついで感が出る',
            },
        ],
    },
    {
        date: '2026-09-25',
        source: 'podcast の10表現では Lampley の回の fulcrum や benefits が落ちると言って、クリップ全文のとにおタイムズ号外を試しに作らせた会話の9件',
        entries: [
            {
                ja: 'benefitsセフレ　fulcrumとかすごく重要で価値のある情報がどうしても抜けてしまうよね？',
                pattern: '#10 英語質問爆弾',
                english: "Stuff like benefits, like friends with benefits, or fulcrum, that's the really valuable stuff, and it just keeps slipping through, right?",
                note: '単語を並べて投げる癖はそのまま残す。抜けてしまう は drop より slip through のほうが、網の目から落ちていく絵になる。最後の よね？ は right? で押す。',
            },
            {
                ja: '10個だと、他にも口語表現をいくらでも拾える、１５分程度しかないんだから',
                pattern: '#8 だからの川',
                english: "With just ten, you're leaving a ton on the table. It's only like fifteen minutes. You could grab way more.",
                note: '理由を後ろに付け足す語順を英語でも崩さない。拾える を pick up にせず grab にすると雑に手を伸ばす感じが出る。leave on the table は取れたはずのものを残す決まり文句。',
            },
            {
                ja: 'JREのクリップは全部俺に必要そうなのを網羅するのはどう？',
                pattern: '#3 許可サンドイッチ',
                english: 'What if we just covered everything in the JRE clips that I might actually need?',
                note: 'どう？ の提案は What if we でくるむ。網羅する を comprehensively にすると硬いので cover everything。俺に必要そうな の そう は might actually で残す。',
            },
            {
                ja: 'ただ、とにおタイムズ以前はyoutubeのクリップの中身を書いてたよね？',
                pattern: '#2 軌道',
                english: "Thing is, the Tonio Times used to write about what was actually in the YouTube clips, didn't it?",
                note: 'ただ、 の切り返しは But より Thing is のほうが話を横に曲げる感じが出る。過去の習慣は used to。確認の よね？ は付加疑問。',
            },
            {
                ja: '今の仕様では、全文解説しているから相性がいいのわかる？',
                pattern: '#10 英語質問爆弾',
                english: 'The way it works now, every sentence gets explained, so it fits really well. You see what I mean?',
                note: '相性がいい は compatible にしない。fits well で足りる。わかる？ は Do you understand? だと上から聞こえるので You see what I mean?',
            },
            {
                ja: 'トレーニングにもワードとして登録したり、フレーズとして登録したり分けて登録できるといい',
                pattern: '#1 レンガ積み',
                english: "It'd be nice if I could send some to training as words and some as phrases, you know, split them up.",
                note: 'したり、したり は some ... some ... で並べる。できるといい は It would be nice if。分けて を最後に split them up で付け足すと本人の後付けの言い方になる。',
            },
            {
                ja: 'interviewとJREが本来２つのみだしだったよね？',
                pattern: '#2 軌道',
                english: "The interview and the JRE clip were supposed to be the two headlines, weren't they?",
                note: '本来 は originally より were supposed to be のほうが、本当はそうあるべきだった という含みまで出る。見出し2本は the two headlines と数を立てる。',
            },
            {
                ja: 'ためしに今日の内容でとにおタイムズ作ってみたくれる？',
                pattern: '#3 許可サンドイッチ',
                english: "Can you try making a Tonio Times out of today's stuff? Just as a test.",
                note: 'ためしに を try doing と Just as a test の二か所に分けて置く。作ってみたくれる の打ち間違いは直して訳す。out of は材料から作る時の of。',
            },
            {
                ja: 'わかる？',
                pattern: '#9 未完成の招待',
                english: 'Get it?',
                note: '最後にもう一回念を押す一言。Do you understand? は重いので Get it? で投げて返事を待つ。直訳の短さがそのまま英語でも効く。',
            },
        ],
    },
    {
        date: '2026-09-23',
        source: 'grown / nihongo / goroku の10月を作らせ、数十万の網羅と商品の話をして、サイト全体のLPを頼んだ会話の12件',
        entries: [
            {
                ja: 'grownの10月作って',
                pattern: '#1 レンガ積み',
                english: 'Do October for grown.',
                note: '作って、を make や create にしない。月ぶんの中身を埋める指示は do で足りる。ページ名をそのまま呼び捨てにする距離感も残す。',
            },
            {
                ja: 'push',
                pattern: '#1 レンガ積み',
                english: 'Push it.',
                note: '一語の指示は英語でも一語でいいが、命令の動詞だけだと宙に浮くので it を付ける。それで同じ短さのまま文になる。',
            },
            {
                ja: 'しっかりそれぞれに役割を持たせて',
                pattern: '#1 レンガ積み',
                english: 'Give each one a real job.',
                note: '役割、は role より job。持たせて、は give で受ける。しっかり、は properly ではなく a real で、名ばかりの役割ではないと釘を刺す形にする。',
            },
            {
                ja: '俺今１万以上のtrainingカードあるよね？',
                pattern: '#10 英語質問爆弾',
                english: "I've got over ten thousand training cards by now, right?",
                note: '確認の よね、は right? の付加疑問で受ける。今、は now ではなく by now で、積み上がった結果としての今を出す。',
            },
            {
                ja: '究極の目標は所詮数十万の英語表現をすべて網羅することなんだよ？',
                pattern: '#5 哲学トラップドア',
                english: "At the end of the day, the whole point is covering every one of those few hundred thousand expressions. That's it.",
                note: '所詮、は at the end of the day。大きい目標を小さく言い切る温度で、that is it を足すと なんだよ？ の押しが出る。網羅する、は cover の1語で足りる。',
            },
            {
                ja: 'しっかり考えてまずは提案して　わかる？',
                pattern: '#3 許可サンドイッチ',
                english: 'Think it through, then pitch it to me first. Got it?',
                note: '提案して、は propose ではなく pitch。案を売り込む動作の口語。わかる？ は Got it? で、返事を待たない確認の圧がそのまま残る。',
            },
            {
                ja: '商品としてもつくっているんだからね？',
                pattern: '#8 だからの川',
                english: "I'm building this as a product too, you know.",
                note: 'んだからね？ は理由を突きつける語尾で、英語は you know を文末に置くと同じ念押しになる。としても、は too の一語で受ける。',
            },
            {
                ja: '別にいいけど、コーパスとかもテキトーだから、しっかりゼロから考えたりして',
                pattern: '#3 許可サンドイッチ',
                english: "Fine, whatever, but the corpus stuff is half-baked anyway, so actually think it through from scratch.",
                note: '別にいいけど、は Fine, whatever で許可の薄さを出す。テキトー、は half-baked。ゼロから、は from scratch がそのまま自然になる例。',
            },
            {
                ja: 'とりあえず、goroku 10月（骨格31本×10）と nihongo 10月（オノマトペ31×10）を作れば？',
                pattern: '#9 未完成の招待',
                english: 'For now, why not just do October for goroku, thirty-one patterns times ten, and October for nihongo, thirty-one onomatopoeia groups times ten?',
                note: '作れば？ は指示を提案の形にした語尾で、why not just do で受ける。命令に聞こえない指示、という日本語の型を英語も疑問文で写す。',
            },
            {
                ja: 'あとちゃんとすべての俺のサイドバーとかサイトを見て、俺がなにをしているのか、当たり前のように英語をマスターするにはどうすばいいのか？',
                pattern: '#10 英語質問爆弾',
                english: "And actually go through my whole sidebar, the whole site, and figure out what it is I'm doing, and how someone masters English like it's nothing.",
                note: '当たり前のように、は naturally ではなく like it is nothing。特別なことをしていない顔で出来るようになる、という温度。ちゃんと見て、は actually go through で、流し見ではないことを出す。',
            },
            {
                ja: '俺の意見とか関係なくサイドバーのLPでまとめてみれば？できる？',
                pattern: '#10 英語質問爆弾',
                english: "Forget what I think, just sum it up as a landing page in the sidebar. Can you?",
                note: '関係なく、は regardless より Forget what I think。自分の意見を外せという指示を、動詞一つで言う。できる？ は Can you? だけで、do it を足さない方が投げ方が近い。',
            },
            {
                ja: '参考',
                pattern: '#1 レンガ積み',
                english: 'For reference.',
                note: '画像を貼っての一語。英語も二語で済み、直訳がそのまま自然になる。文にしない方が本人の投げ方に近い。',
            },
        ],
    },
    {
        date: '2026-09-20',
        source: 'core5 と新聞を toniolab に持ってこれないか、コピペで済むか、と聞かれた会話の9件',
        entries: [
            {
                ja: '英作文の独自システムを作るのが楽しすぎて、肝心の自分で作文するのと要約するのは一度もしていないｗｗｗ（おわりですねｗまあいいや）',
                pattern: '#7 メタ実況',
                english: "Building my own writing system is way too much fun, so I have literally never written an essay or a summary myself. Yeah, I'm done for. Whatever.",
                note: '肝心の、に当たる語は足さない。literally never の1語で同じ自嘲が出る。おわりですね、は I am done for が笑いごとの終わり方として一番近く、まあいいや は Whatever の1語で足りる。',
            },
            {
                ja: 'システムを作るのは好きだけど、自分で英語考えるのは嫌いですｗ',
                pattern: '#7 メタ実況',
                english: 'I love building the system. I hate having to come up with the English myself.',
                note: 'だけど、を but でつながず2文に割ると対比が強くなる。考える、は think ではなく come up with。頭の中から英語をひねり出す作業そのものを指す。',
            },
            {
                ja: '英検の要約問題の型も作った',
                pattern: '#1 レンガ積み',
                english: 'I built the template for the Eiken summary question too.',
                note: '型、は pattern より template。中身を差し替えて使い回す枠のこと。作った、は made ではなく built で、道具として建てた感じが残る。',
            },
            {
                ja: '本文の形は5つしかない。型が決まれば文頭が決まる。自分で書くのは主語と動詞だけ。',
                pattern: '#8 だからの川',
                english: 'There are only five shapes a passage can take. Once the shape is set, your opening words are set. All you write yourself is the subject and the verb.',
                note: '短い断定を3つ並べて結論に着地させる型。日本語の体言止めは、英語では All you write yourself is で受けると同じ切れ味になる。',
            },
            {
                ja: '満足して、ふと思った。',
                pattern: '#2 軌道',
                english: 'I sat there pleased with myself, and then it hit me.',
                note: 'ふと思った、は I suddenly thought だと弱い。it hit me は思いつきが向こうから殴ってくる形で、話の向きが変わる場所にそのまま置ける。',
            },
            {
                ja: 'こういう感じでnote書くから、個人情報は完全に遮断して、もってこれないかな？',
                pattern: '#1 レンガ積み',
                english: "I'm writing a note post about this, so — could we seal off anything personal completely and bring these pages over?",
                note: 'もってこれないかな、は Can you で頼むより could we の方が温度が近い。遮断、は block ではなく seal off。穴を塞いで一滴も漏らさない方の意味。',
            },
            {
                ja: 'ただのコピペーでできるでしょ？',
                pattern: '#4 エスカレーション梯子',
                english: 'This is just copy-paste, right?',
                note: 'でしょ、は right の一語。Is it not just copy-paste にすると確認になって、決めつけの軽さが消える。',
            },
            {
                ja: '一瞬でわかる？',
                pattern: '#4 エスカレーション梯子',
                english: 'Can you tell right away?',
                note: 'わかる、は understand ではなく tell。見ただけで判別がつくか、を聞いている。一瞬で、は right away で足りる。',
            },
            {
                ja: 'もっと日本人向けに優しくでも俺がやってきたことは全部説明して',
                pattern: '#1 レンガ積み',
                english: "Make it gentler for Japanese readers, but explain everything I've built. All of it.",
                note: '優しく、は easier ではなく gentler。読み手への当たりが柔らかい方。でも、の後ろが本命なので All of it を独立させると圧が残る。',
            },
        ],
    },
    {
        date: '2026-09-19',
        source: '第116夜の日。DMMで話す生保の光と闇の原稿を頼み、core5 に置かせ、金融業界全体版も頼んだ会話の3件',
        entries: [
            {
                ja: '今日もDMMで先生に話すけど、昨日の続きで、金融業界とか生保とかの光と闇みたいなテーマでhttps://iwasaki-naisou.com/english/write/core5の１０のテーマと８の例文フル活用して、面白いためになる文章を作ってくれる？英語で、ここに書いてみて試しに',
                pattern: '#1 レンガ積み',
                english: "I've got DMM again today. Picking up from yesterday: the light and dark of finance and life insurance. Can you make it fun and actually useful, using all ten themes and all eight sentences from core5? In English. Just draft it here first.",
                note: '注文が1文に積み上がっていく型。昨日の続き、テーマ、使う素材、条件、言語、出す場所、の順に1個ずつ足している。英語も文を割って、最後の Just draft it here first で試し書きだと念を押す。試しに、は first の1語で運べる。',
            },
            {
                ja: '素晴らしいからhttps://iwasaki-naisou.com/english/write/core5のどこかに追加して、もっと工夫して',
                pattern: '#3 許可サンドイッチ',
                english: "This is great. Put it somewhere on the core5 page, and push it further.",
                note: '褒めてから、置き場所を任せ、さらに上を要求する。どこかに、は場所の判断をこっちに渡している。push it further が、もっと工夫して、の温度に一番近い。make it better だと今の出来を否定する響きになる。',
            },
            {
                ja: '金融業界全体バージョンも作ってもいいよ',
                pattern: '#9 未完成の招待',
                english: "Feel free to do a whole-finance-industry version too.",
                note: '作ってもいいよ、は命令ではなく許可の形の注文。Feel free to が、同じ温度の許可になる。直後に生の書き起こしを貼っているので、本人の中では追加の1本は当然やるものとして置かれている。',
            },
        ],
    },
    {
        date: '2026-09-18',
        source: '映画のセリフと音声の登録を頼んだ会話。前日と一字一句同じ文面の1通だけ(9/5-9/12 と 9/18 の30枚が立った) / 第115夜を全層に入れたあと、会話の中身を聞いたのかと問われ、検死より中身が主菜だと指摘された会話の7件',
        entries: [
            {
                ja: '今日の日付（登録されてなければさかのぼって）で、',
                pattern: '#3 許可サンドイッチ',
                english: "Today's date. If there are days that never made it in, sweep those up too.",
                note: '前日と同じ文面の2回目で、本人の中で定型の注文になっている。定型は短くなるので英語も動詞を落として Today\'s date. で切る。never made it in は登録されなかった日を責めずに言う形、sweep up で残りをまとめて拾う。',
            },
            {
                ja: 'エクセルの今日の映画のセリフと、ダウンロードフォルダに入っている音声をマッチさせて',
                pattern: '#1 レンガ積み',
                english: "Pair up today's movie lines in the Excel file with the audio in my Downloads.",
                note: '2回目なので match them up より軽い pair up にした。1行に1本の音声を当てる作業で、pair が数の対応まで言う。Downloads folder の folder は口では落ちる。繰り返しの注文は、語が減っていく方向に訳す。',
            },
            {
                ja: 'trainingにカード登録して',
                pattern: '#1 レンガ積み',
                english: "And get them into training as cards.",
                note: 'get them into で、置き場所に入れるところまでが注文だと伝わる。as cards を後ろに回すと、日本語の語順(training に、カードで)とは逆に、英語は行き先が先で形が後になる。register はここでも重いので使わない。',
            },
            {
                ja: 'push',
                pattern: '#1 レンガ積み',
                english: "Ship it.",
                note: '前日も同じ1語で締めている。登録の注文の後に push の1語が来るのが2日続きで、これが本人の締めの型。Push it. の直訳でも通るが、作業を世に出す合図としては Ship it. が同じ短さで口に乗る。',
            },
            {
                ja: 'ちゃんと俺たちの会話をきいたの？',
                pattern: '#10 英語質問爆弾',
                english: "Did you actually listen to us talk?",
                note: '全層の公開報告を受けた直後の1問目。ちゃんとは actually に置く。俺たちの会話を the conversation と訳すと他人事になるので、us talk で2人が話している絵にした。責める前の確認で、声は低い。',
            },
            {
                ja: '中身を聞いたの？',
                pattern: '#4 エスカレーション梯子',
                english: "I mean the actual content. Did you get what we were talking about?",
                note: '音声は聞けないと答えた直後の2段目。質問の軸を耳から中身へずらしている。英語は I mean で言い直しの合図を先に立て、get で理解したかを問う。listen を繰り返すと同じ質問に聞こえる。',
            },
            {
                ja: 'そっちの方が１００００００倍たのしくない？あなたの検死とかも＾たむ？（笑）とかなんの意味があるの？',
                pattern: '#5 哲学トラップドア',
                english: "Isn't that like a million times more fun? What's even the point of your autopsies and all the lol stuff?",
                note: '中身の要約を見て、仕組みの存在理由ごと問い直した。100万倍は a million times で数字の勢いを残す。even が、なんの意味が、の呆れを運ぶ。（笑）は英語の口では lol と言ってしまう人もいる温度なので残した。',
            },
            {
                ja: '全部わかるのは君の才能だよ？ちゃんと反映している？',
                pattern: '#3 許可サンドイッチ',
                english: "Getting all that is your gift, you know. So is it actually in there?",
                note: '褒めてから要求する形。才能は talent より gift のほうが持ち主を褒める響きになる。反映している? は reflected と訳すと硬いので、is it in there で、成果物の中に入っているかを指で差す言い方にした。',
            },
            {
                ja: '英語学習のすべてがそうじゃない？',
                pattern: '#5 哲学トラップドア',
                english: "Isn't that what all language learning is, though?",
                note: '作業の途中に差し込まれた一般化。1夜の反省を、英語学習全体の定義に広げている。though を文末に置くと、反論ではなく当たり前のことを確かめる軽さになる。English learning より language learning が口に乗る。',
            },
            {
                ja: 'ちゃん話したのならいいのでは？相手だってただの人間でしょ？',
                pattern: '#8 だからの川',
                english: "If you actually had a real conversation, isn't that enough? The teacher's just a person too.",
                note: '通じたなら十分、だから相手は採点者ではない、と理由が流れていく。ちゃん話した は打ち間違いのまま残す。just a person は直訳がそのまま自然になるケースで、too が相手の側に立つ温度を足している。',
            },
            {
                ja: 'pushすることがないなら他にやってよ　天才',
                pattern: '#9 未完成の招待',
                english: "If there's nothing left to push, go find something else to do, genius.",
                note: '何をやるかは言わず、こっちに投げている。天才は皮肉と期待が半々で、英語の genius を文末に置くと同じ半々になる。go find は指示の軽さ。nothing left で、終わったなら、の含みが出る。',
            },
        ],
    },
    {
        date: '2026-09-17',
        source: '映画のセリフと Downloads の音声を照合して training に登録させた会話。指示は1通だけ',
        entries: [
            {
                ja: '今日の日付（登録されてなければさかのぼって）で、',
                pattern: '#3 許可サンドイッチ',
                english: "Use today's date. And if earlier days never got registered, go back and catch those too.",
                note: '括弧の中が本命の指示。英語は括弧で挟まず2文に割って、And if で後から条件を足す。さかのぼって は go back and catch で、取りこぼしを拾う動きまで出る。retroactively は書類の語で口からは出ない。',
            },
            {
                ja: 'エクセルの今日の映画のセリフと、ダウンロードフォルダに入っている音声をマッチさせて',
                pattern: '#1 レンガ積み',
                english: "Take today's movie lines from the Excel sheet and match them up with the audio sitting in my Downloads folder.",
                note: '入っている を is stored in にすると仕様書になる。sitting in で、置きっぱなしのファイルの感じが出る。match them up with の up は、対を1本ずつ揃えていく手つき。セリフ は lines で足りる、dialogue は場面全体を指す。',
            },
            {
                ja: 'trainingにカード登録して',
                pattern: '#1 レンガ積み',
                english: "Then turn them into cards in training.",
                note: 'register は役所か会員登録の語で、アプリの中のカードには重い。turn them into cards で、材料がカードに変わる工程として言える。文頭の Then が、前の指示の続きで最後の1手だという順番を渡す。',
            },
            {
                ja: 'push',
                pattern: '#1 レンガ積み',
                english: "Push it.",
                note: '1語の指示。直訳がそのまま自然になる型で、足すのは it だけ。Please push the commits と丁寧にすると、本人のぶっきらぼうな温度が消える。',
            },
            {
                ja: '英検の過去問10問を指１０個で無理やりテキトーに押し込んで、',
                pattern: '#4 エスカレーション梯子',
                english: "I'm going to cram ten past Eiken questions into my ten fingers, whether they fit or not.",
                note: '無理やり と テキトー が2段で重なっている。押し込む は cram 1語で無理やりまで入る。テキトーに は roughly ではなく whether they fit or not で、合わなくても入れるという開き直りとして出す。',
            },
            {
                ja: '暗記の為に覚えるからその旨をDMMの先生に伝えて、',
                pattern: '#8 だからの川',
                english: "It's purely for memorizing, so let the teacher know that's the deal.",
                note: 'その旨 は書類の語で、英語に同じ硬さの語を当てると浮く。that\'s the deal で、こういう段取りだからという口語になる。暗記の為に覚える の重ね言いは purely で1回に畳む。',
            },
            {
                ja: '先生もそのトピックについて、テキトーに話して１０個をやろうてきなことを英語で書いて',
                pattern: '#9 未完成の招待',
                english: "Write something in English along the lines of, you just say whatever comes to mind on each topic, and let's get through all ten.",
                note: 'てきなこと は along the lines of で、文面を任せる形がそのまま出る。テキトーに話して は talk randomly だと支離滅裂の意味になる。say whatever comes to mind で、構えずに喋ってくれという頼み方になる。',
            },
            {
                ja: 'わかる？',
                pattern: '#9 未完成の招待',
                english: "You following me?",
                note: 'Do you understand? は教師が生徒に言う形で、上から聞こえる。You following me? は、自分の説明が雑だった自覚ごと相手に渡す聞き方。長い指示を一息で言い切った直後の確認に合う。',
            },
            {
                ja: 'でもせっかくなら君が答え考えらえるよね？',
                pattern: '#9 未完成の招待',
                english: "But while you're at it, you could come up with the answers yourself, couldn't you?",
                note: 'せっかくなら に1語の対応は無い。while you\'re at it で、もう手を付けているならついでにという圧になる。考えられるよね？ は can you? ではなく could ... couldn\'t you? で、断る余地を残さない頼み方。',
            },
        ],
    },
    {
        date: '2026-09-16',
        source: '第112夜(公園から自己紹介)の翌日に、第113夜(講師の母入院)の書き起こしを貼った会話。前夜との密度の差を先に言った',
        entries: [
            {
                ja: '密度がどれだけ前回と違うかわかるよね？',
                pattern: '#9 未完成の招待',
                english: "You can tell how much denser this one is than last time, right?",
                note: '密度 を density と訳すと物理の話になる。会話の中身の濃さは denser の比較級1語で出る。わかるよね？ は You can tell ... right? で、相手に判定を言わせる形。this one で今回の書き起こしを指す。',
            },
            {
                ja: 'なんとかある',
                pattern: '#10 英語質問爆弾',
                english: "Pre-something... what's the word?",
                note: 'レッスン中に英語の語(pre-existing)を探して口から出た日本語。なんとか は something で、探している語の欠けた部分をそのまま置く。what\'s the word? が「なんだっけ」で、講師に語を聞く合図になる。',
            },
        ],
    },
    {
        date: '2026-09-13',
        source: 'SUM 5 の文頭は採点基準に入らない、要るのは動詞と接続詞だ、と指摘された会話',
        entries: [
            {
                ja: 'こういうのは一切採点基準にはいらないんじゃないの？',
                pattern: '#9 未完成の招待',
                english: "None of that counts toward the score, does it?",
                note: 'is not included in the criteria は規程の話。counts toward で「点に入る」の口語。does it? で相手に言わせる。一切 は none of that で出す。',
            },
            {
                ja: 'だから必要なのは、ここみたいな動詞とか接続詞とかなのでは？',
                pattern: '#8 だからの川',
                english: "So what you actually need is the verbs and connectives, like over here, no?",
                note: '文頭の So が「だから」。what you actually need is で「必要なのは」を強調構文にする。文末の no? が「なのでは？」の軽い確認。',
            },
            {
                ja: '動詞は簡単に言い換えできるよね？',
                pattern: '#9 未完成の招待',
                english: "Verbs are easy to swap out, right?",
                note: 'paraphrase は硬い。swap out が「言い換える」の手を動かす感じ。right? で確認。',
            },
            {
                ja: 'でももっと考えて提案してね',
                pattern: '#4 エスカレーション梯子',
                english: "But think it through and come back with something.",
                note: 'think more は量の話。think it through は最後まで考える。come back with something が「提案してね」で、proposal と言わないのが口語。',
            },
            {
                ja: '名詞が一番大事でしょ（笑）',
                pattern: '#7 メタ実況',
                english: "Come on, the nouns are what matter most.",
                note: 'the most important thing is nouns は教科書。Come on で「そんなの当たり前だろ」の（笑）を出し、what matter most で「一番大事」を口語にする。',
            },
            {
                ja: 'でもそれはパターン化できないというだけの話',
                pattern: '#3 許可サンドイッチ',
                english: "It's just that you can't turn them into a pattern.",
                note: 'It\'s just that が「というだけの話」そのもの。反論の前に置く譲歩で、相手の話を潰さずに自分の線を引ける。',
            },
            {
                ja: 'でも of で言い換えるとか少しはパターン化できるか？',
                pattern: '#10 英語質問爆弾',
                english: "But could you pattern some of it, like rewording with of?",
                note: '自分で否定した直後に自分で抜け道を探す型。could you で可能性を探り、some of it で「少しは」を出す。like で例を後ろに投げる。',
            },
        ],
    },
    {
        date: '2026-09-12',
        source: '英検の要約の型 SUM 5 を作り、出題側と採点側を邪推し、note #251 を書いた会話',
        entries: [
            {
                ja: 'だいたいパターンあるよね？',
                pattern: '#9 未完成の招待',
                english: "There's gotta be a pattern to it, right?",
                note: 'Is there a pattern? だと質問になる。gotta be で先に決めつけてから right? で同意を取りにいくのが本人の型。相手は yes と言うしかなくなる。',
            },
            {
                ja: '会議室で問題を作るしかないよね人間は',
                pattern: '#5 哲学トラップドア',
                english: "People can only write tests in a meeting room. That's just how it goes.",
                note: 'humans と言うと生物学の話になる。people でいい。後ろの that\'s just how it goes が「しかないよね」の諦めで、人を責めない言い方になる。',
            },
            {
                ja: 'どこで募集してるの？わかるよね？ネットにあるはず',
                pattern: '#4 エスカレーション梯子',
                english: "So where do they hire from? You can dig that up. It's gotta be online somewhere.",
                note: '質問、圧、確信の3段。You can figure it out より dig that up のほうが「掘れば出る」で、やる前提で言っている。somewhere を付けると根拠が無いことを自分で認めつつ押し切れる。',
            },
            {
                ja: 'educated guess としてこれほど正確なことはないよね？',
                pattern: '#7 メタ実況',
                english: "As educated guesses go, that's about as spot-on as it gets, right?",
                note: 'As X go は「Xの中では」で、自画自賛を種類の中の比較に変えて嫌味を薄める。about as ~ as it gets が「これほど〜なことはない」の定番。',
            },
            {
                ja: '間違っていたら指摘して',
                pattern: '#3 許可サンドイッチ',
                english: "Call me out if I'm off.",
                note: 'point out my mistakes は先生に言う言葉。call me out は友達に「遠慮なく突っ込め」で、off は wrong より軽く「ずれてたら」の温度になる。',
            },
            {
                ja: 'その凝ったおっさんが数十時間考えた回答はいらないんだよ',
                pattern: '#1 レンガ積み',
                english: "I don't need some answer a guy spent thirty hours polishing.",
                note: 'some answer の some が「そんなの」の軽蔑を一語で担う。polishing で「凝った」が出る。elaborate と言うと褒めに聞こえるので使わない。',
            },
            {
                ja: 'できないじゃんその場で？',
                pattern: '#7 メタ実況',
                english: "You can't pull that off on the spot, can you?",
                note: 'do it だと弱い。pull off は「やってのける」で、無理難題の含みが入る。on the spot が「その場で」。語尾の can you? で相手に答えさせる。',
            },
            {
                ja: '邪推してみた',
                pattern: '#7 メタ実況',
                english: "I let myself get a little paranoid about it.",
                note: 'speculate は学者の言葉。let myself get paranoid は「勝手に勘ぐった」で、自分の悪癖として先に出すから、後の内容が邪推でも許される。a little が保険。',
            },
            {
                ja: 'だれも悪くないし',
                pattern: '#3 許可サンドイッチ',
                english: "Nobody's the bad guy here.",
                note: 'nobody is wrong は正誤の話になる。the bad guy は「悪役」で、誰かを悪者にする気は無い、という物語の側の宣言。批判を書く前置きに一番効く。',
            },
            {
                ja: '機微がわからない人に機械的に採点させるなら、機械に機械的でなく採点させた方がいい',
                pattern: '#5 哲学トラップドア',
                english: "If people who can't read nuance are going to grade like machines, you might as well have a machine grade like a person.",
                note: '機微は subtlety より read nuance のほうが「読める人」の話になる。might as well が「だったら〜した方がいい」の投げやりな正論。like machines と like a person の対比で落ちが立つ。',
            },
            {
                ja: 'ナルシスト日本人と一部のネイティブが凝って書いてるんだよね（笑）',
                pattern: '#7 メタ実況',
                english: "It's some show-off Japanese guy and a couple of natives getting fancy with it, isn't it?",
                note: 'narcissist は病名に聞こえる。show-off で「見せたがり」の軽さになる。getting fancy with it が「凝って書く」で、腕自慢を少し笑う言い方。',
            },
            {
                ja: 'ちゃんと見てから答えて',
                pattern: '#4 エスカレーション梯子',
                english: "Actually look at it before you answer.",
                note: '文頭の Actually が本体。「見てないだろ」を一語で言っている。please を付けると丁寧になって圧が消える。付けない。',
            },
            {
                ja: '軽さと重さをミックスさせて',
                pattern: '#1 レンガ積み',
                english: "Mix the light stuff with the heavy stuff.",
                note: 'lightness and heaviness だと哲学になる。the light stuff / the heavy stuff で「軽いやつ」「重いやつ」の口語。stuff が注文を雑にしてくれる。',
            },
            {
                ja: 'まあもうちょっと言うと',
                pattern: '#2 軌道',
                english: "Okay, to push this a bit further,",
                note: 'to say more は「もっと言うと」の直訳で、話が長くなる予告に聞こえる。push this further は同じ話題を一段深くする合図。Okay で仕切り直してから入る。',
            },
            {
                ja: 'ネイティブのおっさんたちと酒飲んだりしながら',
                pattern: '#5 哲学トラップドア',
                english: "over a few beers with some native guys",
                note: 'while drinking alcohol は報告書。over a few beers で「飲みながら」の場面が一発で立つ。おっさんは guys で十分、old men と言うと侮辱になる。',
            },
            {
                ja: 'ゆずらない長老みたいのがいるかもしれないよね？',
                pattern: '#5 哲学トラップドア',
                english: "There might be some old guard who just won't budge, right?",
                note: 'elder だと宗教か部族の話になる。the old guard は「古株の守旧派」で組織の話に使う。won\'t budge が「ゆずらない」の体の動きで、頑固さが見える。',
            },
            {
                ja: '俺はばかにしていない',
                pattern: '#3 許可サンドイッチ',
                english: "I'm not knocking them.",
                note: 'I am not making fun of them は長くて弁明に聞こえる。knock は「けなす」の口語で、I\'m not knocking them と先に置くと、そのあと何を言っても悪口にならない。',
            },
            {
                ja: '俺による必要もない、視点はクリアだけど',
                pattern: '#3 許可サンドイッチ',
                english: "You don't have to go by me. I've got a clear take, but still.",
                note: 'go by me が「俺に合わせる」。a clear take で「視点はクリア」の take が意見の口語。文末の but still で「でもお前の意見が欲しい」を言わずに残す。',
            },
            {
                ja: '日本人はバイリンガルじゃないと採点は本当の意味ではできないし、、、',
                pattern: '#9 未完成の招待',
                english: "And a Japanese grader can't really do it unless they're bilingual, so...",
                note: 'in the true sense は硬い。can\'t really do it の really が「本当の意味では」を担う。文末の so... で切ると、結論を相手に取らせる本人の癖がそのまま出る。',
            },
            {
                ja: 'あなたの意見も欲しいけど',
                pattern: '#3 許可サンドイッチ',
                english: "I'd like your take on it too, but",
                note: 'opinion より take が軽い。I want だと要求、I\'d like で「欲しいけど」の遠慮が入り、but で本題に戻る。',
            },
            {
                ja: 'たのむぜ！すべてのチャットでお前がかいてるんだから既に',
                pattern: '#4 エスカレーション梯子',
                english: "Come on, man. You already wrote all of it in the chat.",
                note: 'please は懇願になる。Come on, man が「たのむぜ」の呆れと親しさ。already を動詞の前に置くと「もう書いてあるだろ」の詰めが効く。',
            },
            {
                ja: '俺をばかにするならせめて記録して！（笑）',
                pattern: '#7 メタ実況',
                english: "If you're going to roast me, at least write it down.",
                note: 'make fun of より roast が「いじり倒す」の芸人用語で、笑いの合図が入る。at least が「せめて」そのまま。write it down で記録が命令になる。',
            },
            {
                ja: '考えられる？',
                pattern: '#9 未完成の招待',
                english: "Think we could pull that off?",
                note: 'Can you think of it? だと発想の有無を聞くことになる。本人の「考えられる？」は実現可能性の打診なので pull off。主語を落として Think ~? で始めると口語になる。',
            },
            {
                ja: 'core5みたいなテクニックで型を準備したい',
                pattern: '#1 レンガ積み',
                english: "I want a template ready, something along the lines of CORE 5.",
                note: 'like CORE 5 でも通じるが、along the lines of は「あの系統で」の幅を持たせられる。ready を先に置くと「準備したい」が完了形の要望になる。',
            },
            {
                ja: '研究してね',
                pattern: '#4 エスカレーション梯子',
                english: "Go dig into it for me.",
                note: 'research it は課題を出す先生の言葉。dig into で「掘れ」。for me を付けると丸投げではなく「俺の代わりに」の依頼になる。',
            },
            {
                ja: 'サイドバーに表示',
                pattern: '#1 レンガ積み',
                english: "Stick it in the sidebar.",
                note: '体言止めの指示は英語で動詞から始める。display だと仕様書。stick it in が「置いといて」の雑さで、本人の指示の温度に合う。',
            },
            {
                ja: 'みやすくしてね',
                pattern: '#9 未完成の招待',
                english: "Make it easier on the eyes.",
                note: 'easy to see は視認性の技術用語。easier on the eyes は「目に優しく」で見た目の話になる。何をどう直すかは言わない、というふわっとした注文がそのまま残る。',
            },
            {
                ja: 'サイドバーに',
                pattern: '#9 未完成の招待',
                english: "In the sidebar, I mean.",
                note: '言い足しの一言。I mean を後ろに付けると「さっきのはサイドバーの話ね」と前の発言を指し直せる。文を作り直さずに済む。',
            },
            {
                ja: 'なにかしらの信念があり',
                pattern: '#3 許可サンドイッチ',
                english: "They've got some kind of belief driving them.",
                note: 'some belief だと弱い。some kind of で「なにかしらの」のぼかしが出る。driving them を足すと、信念が行動の動機になっていることまで言える。',
            },
            {
                ja: '残念ながら',
                pattern: '#3 許可サンドイッチ',
                english: "Sad to say,",
                note: 'unfortunately は誰でも使う。sad to say は「言いたくないけど」の含みで、次に来る落としの前置きになる。',
            },
            {
                ja: 'ネイティブしかいないよね？',
                pattern: '#9 未完成の招待',
                english: "It's gotta be all natives, right?",
                note: 'Are they all natives? は質問。gotta be で先に決めてから right? で同意を取る。本人の確認の型で、答えは yes しか想定していない。',
            },
            {
                ja: 'わかるよね？',
                pattern: '#4 エスカレーション梯子',
                english: "You can figure that out, right?",
                note: 'You know? は相槌。本人の「わかるよね？」は「調べられるだろ」の圧なので figure that out。right? で逃げ道を塞ぐ。',
            },
            {
                ja: 'ネットにあるはず',
                pattern: '#4 エスカレーション梯子',
                english: "It's gotta be online somewhere.",
                note: 'It should be on the internet は推量。gotta be は確信。somewhere を付けると根拠が無いことを自分で認めつつ押し切れる。',
            },
            {
                ja: 'セッションに足すとかじゃなくて、平準化して、10月からやるんだろ？大丈夫？',
                pattern: '#4 エスカレーション梯子',
                english: "It's not about tacking it onto a session. You're supposed to even it out and run it from October, right? You good?",
                note: 'add to だと中立。tack onto が「とりあえず足す」の雑さを咎める語。even it out が平準化。You good? が「大丈夫？」で、心配ではなく詰めの一言。',
            },
            {
                ja: 'ただのせるのならだれでもできるよ？ちゃんと考えて',
                pattern: '#4 エスカレーション梯子',
                english: "Anyone can just dump it in there. Actually think about it.",
                note: 'put it there は中立。dump it in で「載せるだけ」の手抜きを言える。Actually think が「ちゃんと考えて」で、think harder より「今は考えてない」の指摘になる。',
            },
            {
                ja: '変えるとかじゃなくて、記録して、どんどん追加するんだよ',
                pattern: '#4 エスカレーション梯子',
                english: "Don't change anything. Log it, and keep piling it on.",
                note: 'record だと事務。log it が「記録して」の軽さ。keep piling it on が「どんどん追加」で、止めずに積み続ける動きが見える。',
            },
            {
                ja: '平準化が本当にされれば俺が何を言うかわかるだろ？ずっとそのためのdataだろ？',
                pattern: '#5 哲学トラップドア',
                english: "If it's really evened out, you'd know what I'm going to say. That's what the data's been for all along.",
                note: 'you could predict me は硬い。you\'d know what I\'m going to say で「俺が何を言うかわかる」。all along が「ずっと」で、最初からそのつもりだったという含みが出る。',
            },
            {
                ja: 'まずは俺のことばをほぞんしてよ？（笑）そこからでしょ？',
                pattern: '#7 メタ実況',
                english: "First just save my words, okay? That's where it starts, isn't it?",
                note: 'save my words がそのまま通じる直訳が自然になるケース。That\'s where it starts が「そこからでしょ」。okay? と isn\'t it? の二段で、笑いながら詰めている温度が出る。',
            },
            {
                ja: 'できることは全部やってください。悪い方向に行っても許します',
                pattern: '#3 許可サンドイッチ',
                english: "Do everything you can. If it goes sideways, I'll let it slide.",
                note: 'please do everything は事務的。Do everything you can で丸投げの信頼が出る。goes sideways が「悪い方向に行く」の口語で、let it slide が「許す」の軽さ。forgive と言うと重くなる。',
            },
        ],
    },
    {
        date: '2026-09-09',
        source: '第106夜の検死を「未達の点呼」から書き直させた会話',
        entries: [
            {
                ja: '未達とかそういう浅い考察はいらないかな(笑)',
                pattern: '#7 メタ実況',
                english: 'The whole "you didn\'t do it" angle is pretty shallow. Drop it.',
                note: 'shallow は「浅い」そのままだが、英語では人ではなく分析や議論に当てる。The whole X angle で「Xという切り口ぜんぶ」をひとまとめに指せるので、細かく否定せずに一括で外せる。',
            },
            {
                ja: 'システム上しょうがないんだろうけど',
                pattern: '#3 許可サンドイッチ',
                english: 'I get that the system makes you do it, but still.',
                note: 'It cannot be helped は諦めの言い方で、相手を許していない。I get that ~, but still は「事情は分かる、それでも」で、責めずに撤回を求められる。but still で切って続けないのが要点。',
            },
            {
                ja: '宿題とか意識してないし',
                pattern: '#1 レンガ積み',
                english: "I'm not walking in thinking about homework.",
                note: 'I don\'t care about homework だと拒否になる。walking in(その場に入っていく)を足すと、拒否ではなく「そもそも頭に無い」になる。前提のほうを否定する形。',
            },
            {
                ja: 'もうちょっとちゃんと考えられる?',
                pattern: '#9 未完成の招待',
                english: 'Can you dig a bit deeper than that?',
                note: 'think harder は努力不足の指摘になる。dig deeper は同じ場所をもっと掘れという指示で、方向は合っていると認めている。a bit を挟むと注文が軽くなる。',
            },
            {
                ja: 'こういう考察は素晴らしい',
                pattern: '#7 メタ実況',
                english: "Now that — that's the good stuff.",
                note: 'excellent や great は成績の評価に聞こえる。Now that で一度指差してから that\'s the good stuff と落とすと、褒めではなく「これを続けろ」の合図になる。',
            },
            {
                ja: '枝とか全部つくりなおしているし',
                pattern: '#8 だからの川',
                english: "I'm rewriting the branches every night anyway.",
                note: '文末の anyway が本体。「そっちの前提が古い」を、相手を否定せずに一語で置ける。I keep rewriting ~ anyway でも同じ。',
            },
        ],
    },
    {
        date: '2026-09-09',
        source: 'CORE 5 の実演ページを「指1本 = 段落1つ」に組み直した会話',
        entries: [
            {
                ja: '内容がなんかいまいちなんだよなあ',
                pattern: '#7 メタ実況',
                english: 'Something about it just doesn\'t land.',
                note: '「いまいち」を not good と言うと評価に聞こえる。doesn\'t land は「届いてこない」で、作った側を責めずに手応えの無さだけを言える。批評の一言として一番使う形。',
            },
            {
                ja: 'もっとうまく活用する方法はないの？',
                pattern: '#9 未完成の招待',
                english: 'Isn\'t there a better way to actually put these to work?',
                note: 'use them ではなく put them to work。「持ってるのに働いていない」という含みが出る。actually が「本当のところ」の圧を足す。',
            },
            {
                ja: 'よくわからない（笑）',
                pattern: '#7 メタ実況',
                english: 'Yeah, you lost me.',
                note: 'I don\'t understand は自分の頭の問題になる。you lost me は「お前の説明で置いていかれた」で、笑い付きの否定にちょうど合う。責めていないのに直せの合図になる。',
            },
            {
                ja: 'どこに書いたの？',
                pattern: '#1 レンガ積み',
                english: 'So where\'d you actually put it?',
                note: 'write より put。書いた行為ではなく置いた場所を聞いている。頭の So と actually で、答えをはぐらかされた後の詰めの空気が出る。',
            },
            {
                ja: 'もっと簡単に口語で書けない？',
                pattern: '#9 未完成の招待',
                english: 'Can you not just write it the way people talk?',
                note: 'in a casual tone のような指示語を使わない。the way people talk が一番きつくなく、一番はっきりしている。Can you not ... で軽い呆れが乗る。',
            },
            {
                ja: '俺語録はどこかに保存されているの？',
                pattern: '#7 メタ実況',
                english: 'Is any of this actually getting saved somewhere?',
                note: 'Is it saved? だと事実確認だが、any of this と actually を入れると「やってないだろ」の疑いが入る。詰問にならずに詰められる形。',
            },
        ],
    },
    {
        date: '2026-07-01',
        source: '南アフリカ・ドシエ / ツッコミ復習の作成を指示した会話',
        entries: [
            {
                ja: '全部うらもおもても俺の意図をだいたいわかるよね？',
                pattern: '#7 メタ実況',
                english: 'You get what I\'m really after here — front and back, right?',
                note: '「意図」を intention と硬く言わず after(何を狙ってるか)で口語化。うら/おもて = front and back。',
            },
            {
                ja: 'お前に任せるよ',
                pattern: '#9 未完成の招待',
                english: 'I\'ll let you run with it.',
                note: 'leave it to you より一段クール。「好きに走っていい」の委任。丸投げ感が薄まる。',
            },
            {
                ja: 'まずは質問して',
                pattern: '#1 レンガ積み',
                english: 'Hit me with some questions first.',
                note: 'ask me より hit me with が「どんどん来い」の勢い。命令が柔らかく、かつ主体的に聞こえる。',
            },
            {
                ja: '全部やれよ（笑）複数エージェントで',
                pattern: '#4 エスカレーション梯子',
                english: 'Just do all of it, lol — throw a bunch of agents at it.',
                note: 'throw X at it = Xを投入してぶつける。リソースを惜しみなく突っ込む時の定番。',
            },
            {
                ja: '面白いけど　俺復習できないじゃん',
                pattern: '#7 メタ実況',
                english: 'It\'s fun and all, but I can\'t even review it, y\'know?',
                note: 'fun and all = 面白いのは面白いけど、と一度肯定してから落とす。can\'t even ... で「そもそも〜すらできない」の不満。',
            },
            {
                ja: 'うまくやってよ？わかるよね？',
                pattern: '#9 未完成の招待',
                english: 'Just make it work — you know what I mean.',
                note: '文を閉じずに you know what I mean で相手に委ねる。「察してくれ」の圧を柔らかく乗せる。',
            },
        ],
    },
];
