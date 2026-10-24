// scripts/build-okikae.mjs が書く。手で直さない。元データは src/data/english/okikae/*.json

export interface OkikaeRow {
    /** 日本語の塊 */
    ja: string;
    /** その塊が出た箇所(40字以内) */
    line: string;
    /** しゃべるなら 1 */
    en1: string;
    /** しゃべるなら 2 */
    en2: string;
}

export interface OkikaeDay {
    date: string;
    source: { videoId: string; channel: string; title: string };
    rows: OkikaeRow[];
}

export const OKIKAE_DAYS: OkikaeDay[] = [
 {
  "date": "2026-10-01",
  "source": {
   "videoId": "VipBjaqEad8",
   "channel": "中尾明慶のきつねさーん",
   "title": "【対談】佐藤隆太さんとROOKIES裏話、家族、俳優業、お互いの今を本音で語る"
  },
  "rows": [
   {
    "ja": "なんて言うんだろう",
    "line": "僕に、なんて言うんだろうな、すごく大きな力をくれて",
    "en1": "How do I put this...",
    "en2": "What's the word..."
   },
   {
    "ja": "恐れ多くて言えない",
    "line": "僕にやらせてくださいみたいなことは、恐れ多くて言えなかった",
    "en1": "I didn't have the nerve to ask.",
    "en2": "Who was I to ask for that?"
   },
   {
    "ja": "後から聞いた話だと",
    "line": "これは後から聞いた話だと、",
    "en1": "I only found this out later, but...",
    "en2": "Turns out..."
   },
   {
    "ja": "変な話",
    "line": "それはもう、変な話、インする時というか",
    "en1": "Weird thing to say, but...",
    "en2": "Funny enough..."
   },
   {
    "ja": "〜ってずっと言ってた",
    "line": "やりたいんですって社長にもマネージャーにもずっと言ってた",
    "en1": "I'd been telling everybody I wanted it.",
    "en2": "I never shut up about it."
   },
   {
    "ja": "ちょっとええか",
    "line": "「ちょっとええか」つって言ったのが新幹線の中",
    "en1": "Got a sec?",
    "en2": "Hey, can I grab you for a minute?"
   },
   {
    "ja": "なんなら〜してもいいぐらい",
    "line": "なんならドキュメント番組で密着してもいいぐらい",
    "en1": "Honestly, they could've filmed it for a documentary.",
    "en2": "You could've made a whole doc out of it."
   },
   {
    "ja": "せめて〜したかった",
    "line": "せめて「マジか」って、自分の感情のまま声を出せる環境が良かった",
    "en1": "I just wanted to be somewhere I could yell.",
    "en2": "At least let me be somewhere I can freak out."
   },
   {
    "ja": "マジか",
    "line": "せめて「マジか」って",
    "en1": "No way.",
    "en2": "Are you kidding me?"
   },
   {
    "ja": "もう我慢できなかった",
    "line": "もう我慢できなかったんだろうね",
    "en1": "He just couldn't hold it in.",
    "en2": "He couldn't wait any longer."
   },
   {
    "ja": "〜を否定したいとかでもなくて",
    "line": "別に今を否定したいとか、過去を否定したいとかでもなくて",
    "en1": "I'm not trying to knock how things are now or anything.",
    "en2": "Not saying one's better than the other."
   },
   {
    "ja": "どうしても",
    "line": "いろんな制限がね、どうしてもかかってきちゃってる",
    "en1": "There's just no way around all the rules.",
    "en2": "The restrictions just keep piling up."
   },
   {
    "ja": "〜とは言いたくないけど",
    "line": "限界とは言いたくないけど",
    "en1": "I don't want to call it my limit, but...",
    "en2": "I'm not saying I've hit a wall, but..."
   },
   {
    "ja": "色々考えちゃう",
    "line": "やってくと、色々考えちゃうっていうかね",
    "en1": "You start overthinking stuff.",
    "en2": "Your head starts spinning."
   },
   {
    "ja": "右も左もわからない",
    "line": "もう本当になんかもう右も左もわかんないし",
    "en1": "I had no clue what I was doing.",
    "en2": "I didn't know up from down."
   },
   {
    "ja": "逆に言うと",
    "line": "逆に言うと、怖さもないというか",
    "en1": "Flip side is...",
    "en2": "On the other hand..."
   },
   {
    "ja": "どうしていいか",
    "line": "どうしていいかみたいなこと",
    "en1": "that whole \"now what?\" feeling",
    "en2": "not knowing what to do with yourself"
   },
   {
    "ja": "周りがどうとかじゃなくて",
    "line": "別に周りがどうとか、そういうことでもなくて",
    "en1": "It's not about anybody else.",
    "en2": "It's got nothing to do with other people."
   },
   {
    "ja": "出会いって大事",
    "line": "やっぱり出会いって大事だなと思うよね",
    "en1": "It really comes down to who you meet.",
    "en2": "The people you run into make all the difference."
   },
   {
    "ja": "一気に面白くなる",
    "line": "一気に急に面白くなったりするから",
    "en1": "All of a sudden it's fun again.",
    "en2": "It just clicks and gets exciting."
   },
   {
    "ja": "〜のはもちろん分かってるんだけど",
    "line": "安倍さんみたいになれないのはもちろん分かってるんだけど",
    "en1": "I know I'll never be him, obviously, but...",
    "en2": "I get that I'm not him, but still..."
   },
   {
    "ja": "こういうもんなんだと思っちゃう",
    "line": "へえ、こういうもんなんだと思っちゃうね",
    "en1": "You just figure that's how it is.",
    "en2": "You think, huh, guess this is normal."
   },
   {
    "ja": "一言に救われる",
    "line": "ちょっとした一言にすごく救われたりすることあるもんね",
    "en1": "One little comment can really save you.",
    "en2": "Sometimes one line is all it takes to pull you through."
   },
   {
    "ja": "申し訳ない気になる",
    "line": "すっごい申し訳ない気になっちゃって",
    "en1": "I felt so bad.",
    "en2": "I felt like such a jerk."
   },
   {
    "ja": "言い訳もできず",
    "line": "なんかこう、言い訳もできず",
    "en1": "I couldn't even explain myself.",
    "en2": "No chance to make an excuse."
   },
   {
    "ja": "何も飾らない",
    "line": "きさんは本当に何も飾らない",
    "en1": "He's totally down-to-earth.",
    "en2": "No airs at all."
   },
   {
    "ja": "本当に何にもわかんない",
    "line": "本当に何にもわかんねっす、ごめんなさいマジで",
    "en1": "Honestly, I have no idea. Sorry, seriously.",
    "en2": "I've got nothing, man. Sorry."
   },
   {
    "ja": "気を遣っちゃう",
    "line": "内心は、なんか気を遣っちゃって",
    "en1": "I end up tiptoeing around them.",
    "en2": "I get all self-conscious."
   },
   {
    "ja": "〜方が全然楽",
    "line": "生意気なこと言っておきよしって言われてる方が、全然楽",
    "en1": "That's way easier for me.",
    "en2": "I'd much rather have that."
   },
   {
    "ja": "すっごいわかる",
    "line": "全然楽。すっごいわかる",
    "en1": "I totally get that.",
    "en2": "Oh, a hundred percent."
   },
   {
    "ja": "そんなこと言ってらんない",
    "line": "今もそんなこと言ってらんないし",
    "en1": "I can't be like that anymore.",
    "en2": "That's not an option now."
   },
   {
    "ja": "むずい",
    "line": "最初の方、特にね、もうむずくて",
    "en1": "It was so hard at first.",
    "en2": "Man, the beginning was rough."
   }
  ]
 },
 {
  "date": "2026-10-02",
  "source": {
   "videoId": "fXn-h1jBV3g",
   "channel": "本の話チャンネル by文藝春秋",
   "title": "【作家対談】人生には「青春小説」が必要だ！伊与原新さん『宙わたる教室』×額賀澪さん『青春をクビになって』発売記念オンライントーク"
  },
  "rows": [
   {
    "ja": "〜すればするほど",
    "line": "取材をすればするほど、自由な手足が縛られていって",
    "en1": "The more I research, the more boxed in I get.",
    "en2": "The more I dig, the less room I have."
   },
   {
    "ja": "型にはめる",
    "line": "僕、割と型にはめてしまうタイプなんで",
    "en1": "I tend to box myself in.",
    "en2": "I end up sticking to a formula."
   },
   {
    "ja": "知っちゃうと",
    "line": "あのやっぱ知っちゃうと",
    "en1": "Once you know, you know.",
    "en2": "Once you know too much..."
   },
   {
    "ja": "ありえないでしょ",
    "line": "いや、ありえないでしょって思っちゃうんだろうな",
    "en1": "They'd be like, no way, that'd never happen.",
    "en2": "They'd go, come on, that's ridiculous."
   },
   {
    "ja": "現実がちらつく",
    "line": "やっぱ現実がちらっとちらついちゃう",
    "en1": "Reality keeps creeping in.",
    "en2": "The real world keeps sneaking back in."
   },
   {
    "ja": "せめぎ合い",
    "line": "そこのせめぎ合いは書くたびに悩むんですよね",
    "en1": "I go back and forth on that every time.",
    "en2": "It's a tug-of-war every single time."
   },
   {
    "ja": "意外と〜苦手",
    "line": "意外と私、作るの苦手だったりするので",
    "en1": "Believe it or not, I'm not great at that.",
    "en2": "Funny enough, that's not really my thing."
   },
   {
    "ja": "辛いものがある",
    "line": "やっぱ無理だなって思っちゃうの、辛いものがありますからね",
    "en1": "That's a tough pill to swallow.",
    "en2": "That kind of hurts."
   },
   {
    "ja": "意外と一番いい着地",
    "line": "意外と1番いい着地なんじゃないかな",
    "en1": "That might actually be the sweet spot.",
    "en2": "Turns out that's the best way to land it."
   },
   {
    "ja": "最初はそんなつもりじゃなかったのに",
    "line": "やっぱり最初はそんなつもりじゃなかったのに",
    "en1": "I didn't plan on it at first, but...",
    "en2": "That wasn't the idea going in."
   },
   {
    "ja": "すらすら出てくる",
    "line": "セリフがすらすら出てくるようになったら",
    "en1": "once the lines start flowing",
    "en2": "when the dialogue just comes out"
   },
   {
    "ja": "好き嫌いでジャッジしない",
    "line": "主人公ってなんかこう、好き嫌いであんまりジャッジしない",
    "en1": "I don't really judge them on whether I like them.",
    "en2": "It's not about liking them or not."
   },
   {
    "ja": "役割を背負わされてる",
    "line": "主人公ってなんか役割を背負わされてますから",
    "en1": "The main character's got a job to do.",
    "en2": "They're stuck carrying the whole story."
   },
   {
    "ja": "〜わけじゃないんだけど",
    "line": "特殊な名前を作りたいわけじゃないんだけれど",
    "en1": "It's not like I want some crazy name, but...",
    "en2": "I'm not going for anything weird, but..."
   },
   {
    "ja": "印象に残る",
    "line": "みんな読める字を使って、でもちょっと印象に残る名前",
    "en1": "something that sticks with you",
    "en2": "a name people actually remember"
   },
   {
    "ja": "〜まではいかないけど",
    "line": "キラキラまではいかないけれど、でもやっぱ今っぽい",
    "en1": "Not over-the-top, but...",
    "en2": "It's not quite flashy, but..."
   },
   {
    "ja": "〜を皮切りに",
    "line": "重松さんを皮切りに",
    "en1": "That's where it all started.",
    "en2": "After that, it just snowballed."
   },
   {
    "ja": "振り返ってみると",
    "line": "いつの間にか、振り返ってみると読んでたのが",
    "en1": "Looking back...",
    "en2": "When I think about it now..."
   },
   {
    "ja": "気がつけば",
    "line": "気がつけばなんかここに座ってるって感じですよね",
    "en1": "Next thing I know, here I am.",
    "en2": "Somehow I ended up here."
   },
   {
    "ja": "〜しかない",
    "line": "普遍的なものが今もあると信じて書くしかないな",
    "en1": "All I can do is trust that and write.",
    "en2": "I just have to believe it and go."
   },
   {
    "ja": "〜たいがために",
    "line": "どんな感じなんだろうっていうのを見たいがためにやってる",
    "en1": "Honestly, I do it just so I can see.",
    "en2": "Part of why I do it is just to see."
   },
   {
    "ja": "やきもきする",
    "line": "狭い人間関係の中で、こうやきもきしたりとか",
    "en1": "getting all worked up over small stuff",
    "en2": "stressing about who's mad at who"
   },
   {
    "ja": "〜たいのになれない",
    "line": "何かになりたいのになれないみたいなジレンマ",
    "en1": "wanting to be something and not getting there",
    "en2": "You want to be somebody, but you just can't."
   },
   {
    "ja": "置き換えて読んじゃう",
    "line": "何かこうあの置き換えて、やっぱり読んじゃうんですよね",
    "en1": "You end up reading yourself into it.",
    "en2": "You can't help putting yourself in there."
   },
   {
    "ja": "〜って語るのは恥ずかしい",
    "line": "青春小説とはって語るのはちょっと恥ずかしいな",
    "en1": "I'd feel kind of dumb lecturing about it.",
    "en2": "It's a little embarrassing to go on about it."
   },
   {
    "ja": "違うけど似たようなこと",
    "line": "違うけど似たようなことあったなみたいな",
    "en1": "Not the same, but I had something like that.",
    "en2": "Different, but been there."
   },
   {
    "ja": "結局",
    "line": "結局人間って、18歳ぐらいで悩むことって実は似てる",
    "en1": "At the end of the day, it's all the same stuff.",
    "en2": "When it comes down to it, everybody stresses about the same things."
   },
   {
    "ja": "ダラダラ",
    "line": "6時間ぐらいずっとなんかダラダラケラケラしてます",
    "en1": "just hanging out, goofing off for hours",
    "en2": "killing time and cracking up"
   },
   {
    "ja": "なんなら",
    "line": "なんならみんなで集まってプラモデルとか作ってましたもん",
    "en1": "If anything, they were all building model kits together.",
    "en2": "They were even sitting around building models."
   },
   {
    "ja": "意外と変わんない",
    "line": "なんか意外と変わんないものがあって",
    "en1": "Some things really don't change.",
    "en2": "Turns out it's not that different."
   },
   {
    "ja": "〜ざるを得ない",
    "line": "大人にならざるを得ないっていうか",
    "en1": "You had no choice but to grow up.",
    "en2": "You just had to grow up."
   },
   {
    "ja": "こじらせる",
    "line": "青春時代を長引かせているか、こじらせているか",
    "en1": "dragging it out or letting it get messy",
    "en2": "stuck in it, or it's gone sideways"
   },
   {
    "ja": "ネタバレにならないように",
    "line": "まあネタバレにならないようにお話をすると",
    "en1": "Without spoiling anything...",
    "en2": "No spoilers, but..."
   },
   {
    "ja": "間違っちゃない",
    "line": "言っても別に間違っちゃないんだなっていう",
    "en1": "It's not wrong, really.",
    "en2": "I guess that's fair to say."
   },
   {
    "ja": "結構頑張ってんのよ",
    "line": "結構頑張ってんのよ、年してから高校に通うんだよ",
    "en1": "We're trying pretty hard, you know.",
    "en2": "Hey, we're putting in the work."
   }
  ]
 },
 {
  "date": "2026-10-03",
  "source": {
   "videoId": "udXP_TdVR5w",
   "channel": "PLAYERS Official",
   "title": "成田悠輔 × 有働由美子 「家で甘えない？」「NHK辞めて後悔は？」さらにエスカレートする本音トーク合戦！『夜明け前のPLAYERS』"
  },
  "rows": [
   {
    "ja": "〜であればあるほど",
    "line": "うまくやってる人であればあるほど",
    "en1": "The better you're doing, the more careful you get.",
    "en2": "the more successful somebody is"
   },
   {
    "ja": "眉をひそめられる",
    "line": "周りからこう眉をひそめられるようなこと",
    "en1": "stuff that makes people raise an eyebrow",
    "en2": "stuff people would frown on"
   },
   {
    "ja": "あいつは終わった",
    "line": "あいつは終わったと思われるようなこと",
    "en1": "He's done.",
    "en2": "That guy's finished."
   },
   {
    "ja": "両方に足を突っ込む",
    "line": "一応両方に足を突っ込んでいて",
    "en1": "I've got a foot in both worlds.",
    "en2": "I kind of live in both."
   },
   {
    "ja": "極端すぎる",
    "line": "ちょっと極端すぎる二択だなと思っていて",
    "en1": "That's way too black and white.",
    "en2": "It's a pretty extreme either-or."
   },
   {
    "ja": "それはありか",
    "line": "毎年2人ぐらいずつ出てくれば、それはありかって",
    "en1": "Then sure, I could see that.",
    "en2": "Then yeah, why not."
   },
   {
    "ja": "ポキッと行く",
    "line": "ポキッと行くこと、人間あるじゃないですか",
    "en1": "People just snap sometimes.",
    "en2": "Anybody can crack."
   },
   {
    "ja": "いつ〜てもおかしくない",
    "line": "いつ壊れてもおかしくないのかなって",
    "en1": "I could break any day.",
    "en2": "It could happen anytime."
   },
   {
    "ja": "怖いこと言う",
    "line": "怖いこと言う",
    "en1": "Whoa, that's dark.",
    "en2": "Don't say scary stuff like that."
   },
   {
    "ja": "そうなったらなったで",
    "line": "そうなったらなったで、それも一つの経験かな",
    "en1": "If it happens, it happens.",
    "en2": "If it goes that way, fine, that's life."
   },
   {
    "ja": "人生3回目",
    "line": "人生3回目みたいなことで飽きてる",
    "en1": "like I've lived this life three times already",
    "en2": "like an old soul who's seen it all"
   },
   {
    "ja": "裏があってほしい",
    "line": "そういう裏があってほしいですよ",
    "en1": "I want there to be a secret side to you.",
    "en2": "Come on, tell me there's more to it."
   },
   {
    "ja": "驚くべきことに",
    "line": "驚くべきことに本当にないんですよ",
    "en1": "Believe it or not, nope.",
    "en2": "Crazy, but no, never."
   },
   {
    "ja": "軽くキレる",
    "line": "眠くて起こされて軽くキレるとか",
    "en1": "I'll get a little snappy if I get woken up.",
    "en2": "I get kind of cranky."
   },
   {
    "ja": "なんでわかってくれないの",
    "line": "なんでわかってくれないのってとか",
    "en1": "Why don't you get it?",
    "en2": "How do you not understand?"
   },
   {
    "ja": "好き勝手",
    "line": "お互いそれぞれ好き勝手やっていけるような状況",
    "en1": "We each just do our own thing.",
    "en2": "We kind of leave each other alone."
   },
   {
    "ja": "臆病で逃げてる",
    "line": "ちょっと多分臆病で逃げてるんだって思ってます",
    "en1": "I'm probably just scared and running away.",
    "en2": "Honestly, I'm kind of chickening out."
   },
   {
    "ja": "わかる気がする",
    "line": "逃げてるうちは、ちょっとわかる気がする",
    "en1": "I kind of get that.",
    "en2": "Yeah, I can see that."
   },
   {
    "ja": "普通に寂しい",
    "line": "普通に寂しいなと感じることもありますか",
    "en1": "Do you ever just get lonely?",
    "en2": "Don't you ever feel lonely, though?"
   },
   {
    "ja": "早く〜ばよかった",
    "line": "早く行けばよかったと思って",
    "en1": "I should've done it way sooner.",
    "en2": "Why didn't I do this years ago?"
   },
   {
    "ja": "やっとわかった",
    "line": "動物という生命体がいればOKだったってことがやっとわかりました",
    "en1": "It finally hit me.",
    "en2": "I finally figured it out."
   },
   {
    "ja": "100パー",
    "line": "100パー今満足です",
    "en1": "I'm a hundred percent happy.",
    "en2": "Honestly, I'm totally good."
   },
   {
    "ja": "〜ふりをしてもらって",
    "line": "職場で多少必要とされてるふりをしてもらって",
    "en1": "They at least pretend they need me at work.",
    "en2": "People act like they need me."
   },
   {
    "ja": "計算じゃない",
    "line": "これ計算じゃないんだけどな",
    "en1": "I'm not doing it on purpose, though.",
    "en2": "This isn't an act, I swear."
   },
   {
    "ja": "嫌で嫌でしょうがない",
    "line": "嫌で嫌でしょうがなくて泣いたけど",
    "en1": "I hated it so much I cried.",
    "en2": "I couldn't stand it."
   },
   {
    "ja": "〜ざるを得ない",
    "line": "あれは残酷で、受け入れざるを得ない",
    "en1": "It's brutal, but you just have to accept it.",
    "en2": "You've got no choice but to deal with it."
   },
   {
    "ja": "解像度がすごい",
    "line": "その自己分析の解像度すごいですよ",
    "en1": "You really know yourself inside and out.",
    "en2": "That's some sharp self-awareness."
   },
   {
    "ja": "申し分ない",
    "line": "だって学歴は申し分ないでしょ",
    "en1": "Your schooling's flawless.",
    "en2": "Education-wise, you're set."
   },
   {
    "ja": "気づくと全部忘れてる",
    "line": "気づくと全部忘れてるみたいな",
    "en1": "Next thing I know, I've forgotten all of it.",
    "en2": "Then it's just gone."
   },
   {
    "ja": "何を目指してたんだっけ",
    "line": "何を目指してたんだっけみたいな感じ",
    "en1": "Wait, what was I going for again?",
    "en2": "What was the point again?"
   },
   {
    "ja": "あとから気づく",
    "line": "メリットがあるって事にあとから気づいた",
    "en1": "I only realized that later.",
    "en2": "It hit me after the fact."
   },
   {
    "ja": "気分で語ってる",
    "line": "それみんな気分で語ってるなっていう感じ",
    "en1": "Everybody's just going off vibes.",
    "en2": "People are just going on gut feeling."
   },
   {
    "ja": "丸くなってる",
    "line": "テレビ全体として丸くなってるっていう話",
    "en1": "TV's gone soft across the board.",
    "en2": "TV's just gotten tamer overall."
   },
   {
    "ja": "〜しやがって",
    "line": "政権批判ばっかりしやがってって言われる",
    "en1": "All you do is trash the government.",
    "en2": "Always bashing the government."
   },
   {
    "ja": "気骨がある",
    "line": "一人本当気骨がある人がいたら",
    "en1": "if there's just one person with a backbone",
    "en2": "one guy with some guts"
   }
  ]
 },
 {
  "date": "2026-10-04",
  "source": {
   "videoId": "nERyAhzGGD4",
   "channel": "今田耕司 公式 「今ちゃんねる。」",
   "title": "今田耕司×千原せいじ ノーカット対談 〜芸人老後計画〜　後編"
  },
  "rows": [
   {
    "ja": "命をかけちゃダメ",
    "line": "命をかけちゃダメだから",
    "en1": "It's not worth dying over.",
    "en2": "Don't put your life on the line for it."
   },
   {
    "ja": "朝5時起き",
    "line": "子供が朝5時起きで",
    "en1": "The kid's up at five a.m.",
    "en2": "up at the crack of dawn"
   },
   {
    "ja": "我慢させてでも",
    "line": "子どもに我慢させてでも行かせようとするんだな",
    "en1": "They'll make the kid tough it out.",
    "en2": "They push the kid to suck it up and go."
   },
   {
    "ja": "ブチギレる",
    "line": "京都でブチギレたよ",
    "en1": "He totally lost it.",
    "en2": "He flipped out."
   },
   {
    "ja": "〜方が悪い",
    "line": "行く方が悪い",
    "en1": "That's on you for going.",
    "en2": "Your fault for going."
   },
   {
    "ja": "まあまあまあ",
    "line": "まあまあまあ、年齢的にも50代やからなあ",
    "en1": "Well, I mean, I'm in my fifties.",
    "en2": "Come on, I'm fifty-something."
   },
   {
    "ja": "しゃーない",
    "line": "まあまあ、しゃーないしゃーない",
    "en1": "Oh well, it is what it is.",
    "en2": "Can't be helped."
   },
   {
    "ja": "もういいや",
    "line": "もういいやと",
    "en1": "Forget it.",
    "en2": "Eh, whatever."
   },
   {
    "ja": "ついていけなくなる",
    "line": "十数年前からついていけなくなります",
    "en1": "I stopped being able to keep up years ago.",
    "en2": "I fell behind a while back."
   },
   {
    "ja": "早すぎて",
    "line": "こっちの早すぎて",
    "en1": "It's moving way too fast.",
    "en2": "It's all happening too fast."
   },
   {
    "ja": "これで十分",
    "line": "機能的にこれで十分なんです",
    "en1": "This does everything I need.",
    "en2": "This is plenty for me."
   },
   {
    "ja": "使いこなされへん",
    "line": "新しいのすごいよ、使いこなされへん",
    "en1": "It's amazing, but I can't figure it out.",
    "en2": "I can't even use half of it."
   },
   {
    "ja": "なんで〜したんすか",
    "line": "なんで買い替えたんすかと言われるような使い方",
    "en1": "Why'd you even upgrade?",
    "en2": "What'd you buy a new one for?"
   },
   {
    "ja": "最初だけやん",
    "line": "最初だけやん",
    "en1": "That's only at the start.",
    "en2": "That lasts like a week."
   },
   {
    "ja": "わかる世代",
    "line": "わかる世代じゃないですか",
    "en1": "We're the generation that gets that.",
    "en2": "You know, our generation gets it."
   },
   {
    "ja": "ブーブー言われる",
    "line": "ユーチューバーとか、ブーブー言われる",
    "en1": "People whine about it.",
    "en2": "Everybody gripes about it."
   },
   {
    "ja": "頑張れば頑張るほど",
    "line": "自分が頑張れば頑張るほど",
    "en1": "The harder you work, the more you make.",
    "en2": "You get out what you put in."
   },
   {
    "ja": "ちょろまかす",
    "line": "ちょろまかしてる奴が店長であったりする",
    "en1": "Turns out the manager's skimming off the top.",
    "en2": "The manager's the one pocketing cash."
   },
   {
    "ja": "けじめ",
    "line": "やっぱりそこでけじめってね",
    "en1": "You've got to draw the line there.",
    "en2": "Somebody has to answer for it."
   },
   {
    "ja": "すごいはすごい",
    "line": "すごいはすごい",
    "en1": "I mean, it's impressive, sure.",
    "en2": "Credit where it's due."
   },
   {
    "ja": "思ってる以上に",
    "line": "今みんな思ってる以上に賢い人が多いんで",
    "en1": "People are way smarter than you think.",
    "en2": "Folks are sharper than you'd expect."
   },
   {
    "ja": "すぐめくれる",
    "line": "すぐめくれますね",
    "en1": "You'll get called out fast.",
    "en2": "They'll see right through it."
   },
   {
    "ja": "怒る奴アホや",
    "line": "基本的に怒る奴アホや",
    "en1": "Anybody who gets mad is an idiot.",
    "en2": "People who blow up are just dumb."
   },
   {
    "ja": "アホばっかり",
    "line": "アホばっかりでしょ",
    "en1": "They're all idiots.",
    "en2": "It's a bunch of clowns."
   },
   {
    "ja": "嘘つかなければ",
    "line": "体験談はもう嘘つかなければ",
    "en1": "As long as you don't lie about what happened.",
    "en2": "Just tell it straight."
   },
   {
    "ja": "確かに確かに",
    "line": "確かに確かに",
    "en1": "True, true.",
    "en2": "Yeah, fair."
   },
   {
    "ja": "ほんまやなぁ",
    "line": "ほんまやなぁ",
    "en1": "That's so true.",
    "en2": "You're right about that."
   },
   {
    "ja": "それしかない",
    "line": "それしかないん",
    "en1": "That's all there is.",
    "en2": "There's no other way."
   },
   {
    "ja": "どっちが折れる",
    "line": "俺が入ってたら、どっちが折れる",
    "en1": "Who backs down first?",
    "en2": "Who's going to cave?"
   },
   {
    "ja": "もうあかん",
    "line": "そんなんでもうあかんで",
    "en1": "That's no good.",
    "en2": "That's not going to fly."
   },
   {
    "ja": "おかしな奴がちょっと多い",
    "line": "おかしな奴がちょっと多いと思って",
    "en1": "There's a lot of weirdos.",
    "en2": "Kind of a lot of oddballs."
   }
  ]
 },
 {
  "date": "2026-10-05",
  "source": {
   "videoId": "zucOllroRxo",
   "channel": "#シゴトズキ【フジテレビ公式】",
   "title": "【本音対談】社長には「辞める人」が最初から見えている？チーム強化のため本当に必要なこと＜ヤッホー社長×ブラックな社長＞"
  },
  "rows": [
   {
    "ja": "〜って何",
    "line": "そのための自分たちの判断基準って何っていうところ",
    "en1": "Like, what do we even judge by?",
    "en2": "What's our standard here?"
   },
   {
    "ja": "本当にその通り",
    "line": "これが結構本当にその通りなんですけど",
    "en1": "That's so true.",
    "en2": "You're absolutely right."
   },
   {
    "ja": "意外と〜できない",
    "line": "意外と日本の既存の会社ができない",
    "en1": "Surprisingly, most companies can't pull that off.",
    "en2": "You'd think it's easy, but most places can't do it."
   },
   {
    "ja": "物理的に",
    "line": "物理的にちょっと見れなくなってきて",
    "en1": "I just couldn't keep eyes on everything.",
    "en2": "There weren't enough hours in the day."
   },
   {
    "ja": "仕方ないか",
    "line": "仕方ないかと、もうこれ任せるしかないと",
    "en1": "Oh well.",
    "en2": "Guess there's no helping it."
   },
   {
    "ja": "任せるしかない",
    "line": "もうこれ任せるしかないと",
    "en1": "I just have to trust them.",
    "en2": "Nothing to do but let go."
   },
   {
    "ja": "耐え忍ぶ",
    "line": "1年間はちょっと耐え忍ぶと思って",
    "en1": "I figured I'd just grit my teeth for a year.",
    "en2": "I'd ride it out for a year."
   },
   {
    "ja": "よくよく考えたら",
    "line": "よくよく考えたらなるほどなって感じだった",
    "en1": "When I really thought about it, it made sense.",
    "en2": "Looking back, it clicked."
   },
   {
    "ja": "結局〜になる",
    "line": "何か提案しても結局社長の意見になるし",
    "en1": "It always ends up being my call.",
    "en2": "It always comes back to the boss."
   },
   {
    "ja": "今でこそ",
    "line": "今でこそね、結構いろんなところで",
    "en1": "These days, sure, but...",
    "en2": "Now, yeah, but back then..."
   },
   {
    "ja": "もう無理",
    "line": "もうこれ以上1人でやってももう無理だ",
    "en1": "I couldn't do it alone anymore.",
    "en2": "I'd hit my limit."
   },
   {
    "ja": "180度変わる",
    "line": "思考回路が180度変わって",
    "en1": "My whole way of thinking flipped.",
    "en2": "It turned my thinking completely around."
   },
   {
    "ja": "〜できるもんなんですか",
    "line": "これ我慢できるもんなんですか",
    "en1": "Can you really hold back like that?",
    "en2": "How do you even sit on your hands?"
   },
   {
    "ja": "見ず知らずの",
    "line": "見ず知らずの大人15人が3ヶ月後にはチームになって",
    "en1": "a bunch of total strangers",
    "en2": "people who'd never met"
   },
   {
    "ja": "腹落ち",
    "line": "これだと思った。もう腹落ち",
    "en1": "That's it. It totally clicked.",
    "en2": "It made total sense in my gut."
   },
   {
    "ja": "めちゃくちゃになる",
    "line": "会社がもうめちゃくちゃになりましたね",
    "en1": "The company was a total mess.",
    "en2": "Everything fell apart."
   },
   {
    "ja": "〜なんていらねえだろ",
    "line": "チームなんていらねえだろうみたいなね",
    "en1": "Who needs a team?",
    "en2": "We don't need that team stuff."
   },
   {
    "ja": "そんなことやるより仕事しろよ",
    "line": "そんなことやるより仕事しろよみたいな",
    "en1": "Quit wasting time and get to work.",
    "en2": "Just do your job."
   },
   {
    "ja": "何をやってんだ",
    "line": "この売上厳しい時に何をやってんだってなりますよね",
    "en1": "What are you even doing?",
    "en2": "Are you kidding me right now?"
   },
   {
    "ja": "ボロボロになりつつも",
    "line": "みんなが反抗して、もうボロボロになりつつも",
    "en1": "Even while everything was falling apart...",
    "en2": "Beat up as we were..."
   },
   {
    "ja": "〜ているうちに",
    "line": "取り組んでいるうちに1年経って2年経って",
    "en1": "Before I knew it, a year went by, then two.",
    "en2": "You keep at it, and a year or two goes by."
   },
   {
    "ja": "ひょっとして",
    "line": "ひょっとしていいことかもしれないみたいな",
    "en1": "Maybe this is actually a good thing?",
    "en2": "Wait, maybe this works."
   },
   {
    "ja": "輪が広がる",
    "line": "輪がだんだん広がってきて",
    "en1": "It slowly caught on.",
    "en2": "More and more people got on board."
   },
   {
    "ja": "そういえば",
    "line": "そういえばあの時に",
    "en1": "Oh yeah, back then...",
    "en2": "Come to think of it..."
   },
   {
    "ja": "ギリギリ",
    "line": "ここはちょっともうギリギリダメだ",
    "en1": "That's pushing it too far.",
    "en2": "That's right on the edge."
   },
   {
    "ja": "やめとこう",
    "line": "ここのチーム作りちょっとやめとこうみたいな",
    "en1": "Let's hold off on that.",
    "en2": "Let's not go there."
   },
   {
    "ja": "今では考えられない",
    "line": "今では考えられないんですけどね",
    "en1": "Hard to imagine now.",
    "en2": "You couldn't picture that now."
   },
   {
    "ja": "振り切る",
    "line": "採用だけに特化した制作物っていうのに振り切って",
    "en1": "We went all in on hiring stuff.",
    "en2": "We bet everything on it."
   },
   {
    "ja": "バチバチに攻めた",
    "line": "すごいバチバチに攻めたサイトとかを作ってた",
    "en1": "really bold, in-your-face sites",
    "en2": "We went hard."
   },
   {
    "ja": "見た目だけ取り繕う",
    "line": "見た目だけこう取り繕っていう状態だった",
    "en1": "It was all just for show.",
    "en2": "It looked good on the surface, that's it."
   },
   {
    "ja": "うまくいかんな",
    "line": "いい会社を作らないと結局うまくいかんな",
    "en1": "It's not going to work unless the company's good.",
    "en2": "If the company's not good, nothing works."
   },
   {
    "ja": "ほぼ皆無",
    "line": "経営理念を掲げてない会社ってほぼ皆無なんです",
    "en1": "There's basically none.",
    "en2": "Almost nobody."
   },
   {
    "ja": "全部ひっくるめて",
    "line": "誰のためにっていうのがない。全部ひっくるめて",
    "en1": "all of it lumped together",
    "en2": "the whole package"
   },
   {
    "ja": "やりきる",
    "line": "これ2025年までやりきる",
    "en1": "We're going to see it through.",
    "en2": "We'll get it done."
   },
   {
    "ja": "そんなの聞いてない",
    "line": "いや俺そんなの聞いてないとかね",
    "en1": "Nobody told me about this.",
    "en2": "That's not what I signed up for."
   }
  ]
 },
 {
  "date": "2026-10-06",
  "source": {
   "videoId": "nO1chHjHovo",
   "channel": "ひろゆき切り抜き部屋",
   "title": "【＃9 】ひろゆき長時間トーク【睡眠・作業】＃ひろゆき＃ひろゆき切り抜き＃睡眠用＃作業用"
  },
  "rows": [
   {
    "ja": "言い訳できない",
    "line": "だって言い訳できないんだもん",
    "en1": "I mean, there's no excuse.",
    "en2": "You can't talk your way out of that."
   },
   {
    "ja": "それは難しいよね",
    "line": "それは難しいよね",
    "en1": "Yeah, that's a tough one.",
    "en2": "That's hard to defend."
   },
   {
    "ja": "やっちゃったな",
    "line": "やっちゃったなと思ってます",
    "en1": "Yeah, he blew it.",
    "en2": "He really messed that one up."
   },
   {
    "ja": "やらかす",
    "line": "安倍さん自身がやらかした悪いことってほとんどない",
    "en1": "He didn't really screw anything up himself.",
    "en2": "He barely did anything shady himself."
   },
   {
    "ja": "〜かっていうと、してない",
    "line": "何か得したかっていうと、してないんですよ",
    "en1": "Did he get anything out of it? Nope.",
    "en2": "Did he profit? Not really."
   },
   {
    "ja": "いい顔をしたい",
    "line": "トランプにいい顔をしたかったとか",
    "en1": "He wanted to stay on his good side.",
    "en2": "He just wanted to look good."
   },
   {
    "ja": "〜かっていうとそうでもなくて",
    "line": "私腹を肥やすためにやったのかっていうとそうでもなくて",
    "en1": "Was it to line his own pockets? Not really.",
    "en2": "It wasn't really about that, though."
   },
   {
    "ja": "僕が知る限り",
    "line": "なので僕が知る限り",
    "en1": "As far as I know...",
    "en2": "From what I can tell..."
   },
   {
    "ja": "言葉は悪いんですけど",
    "line": "言葉は悪いんです、神輿は軽いほどいい",
    "en1": "Not to be harsh, but...",
    "en2": "Pardon my French, but..."
   },
   {
    "ja": "好き放題",
    "line": "勝手にみんなが好き放題やってて",
    "en1": "Everybody did whatever they wanted.",
    "en2": "They just ran wild."
   },
   {
    "ja": "人がいい",
    "line": "安倍さん自身としてはなんか人がいいから",
    "en1": "He's just too nice.",
    "en2": "He's kind of a pushover."
   },
   {
    "ja": "俺が責任持っとくわ",
    "line": "いいんじゃないの、俺が責任持っとくわ",
    "en1": "I'll take the heat.",
    "en2": "It's on me."
   },
   {
    "ja": "どうかなと思う",
    "line": "揶揄するっていうのはどうかなと思うんですけど",
    "en1": "I don't think that's cool.",
    "en2": "That's kind of messed up, if you ask me."
   },
   {
    "ja": "しょうがないかな",
    "line": "まあそこはね、しょうがないかなとは思う",
    "en1": "I guess that's just how it is.",
    "en2": "Can't really do much about it."
   },
   {
    "ja": "とりあえずぶち込んでおく",
    "line": "インデックスファンドにとりあえずぶち込んでおくと",
    "en1": "Just dump it in and forget about it.",
    "en2": "Throw it in there and leave it."
   },
   {
    "ja": "ほぼない",
    "line": "20年30年単位で損することはほぼないと思います",
    "en1": "You're almost never going to lose.",
    "en2": "It pretty much never goes wrong."
   },
   {
    "ja": "そういえば",
    "line": "そういえば以前は時々日本酒とか飲まれてましたけど",
    "en1": "By the way...",
    "en2": "Oh, that reminds me..."
   },
   {
    "ja": "たまたま",
    "line": "たまたまイベントでもらった日本酒",
    "en1": "I just happened to get it at an event.",
    "en2": "I got it by chance."
   },
   {
    "ja": "悪酔いする",
    "line": "ただあの悪酔いする率は高いですね",
    "en1": "It hits me way harder.",
    "en2": "I get messed up on it."
   },
   {
    "ja": "そうはならない",
    "line": "多分そうはならないと思うんですよね",
    "en1": "I don't see that happening.",
    "en2": "Probably not."
   },
   {
    "ja": "〜のあれじゃないですよ",
    "line": "EVってあのポケモンのあれじゃないですよ",
    "en1": "Not the Pokemon, by the way.",
    "en2": "I'm not talking about the Pokemon thing."
   },
   {
    "ja": "食えるようにする",
    "line": "プロスポーツプレイヤーが食えるようにする",
    "en1": "make it so they can actually make a living",
    "en2": "so they can pay the bills"
   },
   {
    "ja": "アウト",
    "line": "賞金をじゃあ1000万円っていうとアウトなんですよね",
    "en1": "That's a no-go.",
    "en2": "Nope, that's illegal."
   },
   {
    "ja": "勘違いしてるかもしれない",
    "line": "あれちょっと今あの勘違いしてるかもしれない",
    "en1": "I might be getting this wrong.",
    "en2": "Don't quote me on this."
   },
   {
    "ja": "総取り",
    "line": "優勝した人が総取りにしますみたいなやつ",
    "en1": "Winner takes all.",
    "en2": "Whoever wins gets everything."
   },
   {
    "ja": "なんでやねん",
    "line": "なんやねんそれ、なんでやねんて言われても",
    "en1": "I know, it makes no sense.",
    "en2": "You can say that's dumb all you want."
   },
   {
    "ja": "〜と一緒じゃね",
    "line": "それってギャンブルと一緒じゃねっていうことになっちゃう",
    "en1": "Isn't that just gambling?",
    "en2": "That's basically gambling, right?"
   },
   {
    "ja": "記憶が定かではない",
    "line": "昔調べたりして記憶が定かではないので",
    "en1": "I don't remember exactly.",
    "en2": "My memory's kind of fuzzy."
   },
   {
    "ja": "さっさと〜した方がいい",
    "line": "法律をさっさと変えた方がいいなと思う",
    "en1": "They should just change the law already.",
    "en2": "Just fix it already."
   },
   {
    "ja": "ズブズブ",
    "line": "ずっとこうお金もらい続けるっていうズブズブの構造",
    "en1": "It's all one big cozy setup.",
    "en2": "They're all in bed together."
   },
   {
    "ja": "美味しい思いができない",
    "line": "政府の人たちが美味しい思いができない",
    "en1": "They don't get their cut.",
    "en2": "There's nothing in it for them."
   },
   {
    "ja": "ガチで",
    "line": "ただやっぱね、ガチでもう襲われたらね",
    "en1": "If one really comes after you...",
    "en2": "If it's for real..."
   },
   {
    "ja": "笑い話じゃないですけど",
    "line": "笑い話じゃないですけど",
    "en1": "Not that it's funny, but...",
    "en2": "I'm not joking, but..."
   },
   {
    "ja": "どうせ〜なら",
    "line": "どうせ死ぬんだったら、やっぱサメに食われるはちょっといい",
    "en1": "If I'm going to die anyway...",
    "en2": "Hey, if I have to go..."
   },
   {
    "ja": "しゃあない",
    "line": "それはしゃあないよ",
    "en1": "Well, that's just bad luck.",
    "en2": "Nothing you can do about that."
   }
  ]
 },
 {
  "date": "2026-10-07",
  "source": {
   "videoId": "9XWjZG8G_aU",
   "channel": "田中大貴のアスリートチャンネル【アスチャン!】",
   "title": "【驚愕】福留孝介が語るメジャーと日本の違いとは？！そして理想の野球選手像とは！＜プロ野球ニュース・阪神・中日・シカゴカブス＞"
  },
  "rows": [
   {
    "ja": "こうしようかな、ああしようかな",
    "line": "試しながら、こうしようかな、ああしようかなとか。",
    "en1": "Maybe this, maybe that.",
    "en2": "I'm always going back and forth on it."
   },
   {
    "ja": "体に覚えさせる",
    "line": "それがずっと続けられるように、体に覚えさせる。",
    "en1": "Get it into muscle memory.",
    "en2": "Drill it till your body just knows it."
   },
   {
    "ja": "やっぱ違うなと思ったら",
    "line": "でも違ったな、やっぱ違うなと思ったら、",
    "en1": "If it's just not right,",
    "en2": "If it doesn't feel right,"
   },
   {
    "ja": "基本的に",
    "line": "ぼくは基本的に練習の時には、",
    "en1": "For the most part,",
    "en2": "Basically,"
   },
   {
    "ja": "どうしたら〜か",
    "line": "どうしたらスランプから早く抜けれるか。",
    "en1": "How do I get out of this fast?",
    "en2": "What's the quickest way out?"
   },
   {
    "ja": "ある程度",
    "line": "ある程度早く戻れるなっていう方法を探している。",
    "en1": "to a point",
    "en2": "more or less"
   },
   {
    "ja": "自分の持ち味",
    "line": "自分の何が持ち味なのかとか。",
    "en1": "what you bring to the table",
    "en2": "what your thing is"
   },
   {
    "ja": "〜も必要ですし",
    "line": "こういうのもやっぱり必要ですし。",
    "en1": "You need that too.",
    "en2": "That's part of it too."
   },
   {
    "ja": "それって別に〜だけじゃない",
    "line": "それって別にアスリートだけじゃないんでしょうね。",
    "en1": "That's not just athletes, though.",
    "en2": "It's not only an athlete thing."
   },
   {
    "ja": "たぶんね",
    "line": "そうだと思いますよね、たぶんね。",
    "en1": "I'd say so, probably.",
    "en2": "Yeah, I think so."
   },
   {
    "ja": "ちゃんと食べたい",
    "line": "試合終わってから、やっぱちゃんと食べたい。",
    "en1": "I want a real meal.",
    "en2": "I want to eat properly."
   },
   {
    "ja": "何だろうね",
    "line": "欲がないんですよね。何だろうねぇ。",
    "en1": "I don't know, man.",
    "en2": "What is it with that?"
   },
   {
    "ja": "まあそうですね",
    "line": "まあそうですね、野球を終えてから、",
    "en1": "Well, yeah.",
    "en2": "I mean, sure."
   },
   {
    "ja": "〜に協力してもらいながらやってます",
    "line": "人たちに協力してもらいながらやってます。",
    "en1": "I've got people helping me out.",
    "en2": "I'm doing it with a lot of help."
   },
   {
    "ja": "聞いたことなかった",
    "line": "いや、聞いたことなかったんですよ。",
    "en1": "I'd never heard of it.",
    "en2": "That was news to me."
   },
   {
    "ja": "立ち向かっていかなきゃいけない",
    "line": "次のステージにただ立ち向かっていかなきゃいけない。",
    "en1": "You just have to face it head-on.",
    "en2": "You've got no choice but to take it on."
   },
   {
    "ja": "〜できればいいなと思っている",
    "line": "次のステップに、できればいいなと思っている。",
    "en1": "I'm hoping I can pull that off.",
    "en2": "That's the plan, anyway."
   },
   {
    "ja": "選択肢を広げる",
    "line": "だから選択肢を広げてるじゃん。",
    "en1": "You're keeping your options open.",
    "en2": "You're giving yourself more options."
   },
   {
    "ja": "頑張って欲しいなと思う",
    "line": "いろんなことも頑張って欲しいなぁと思った。",
    "en1": "I'm rooting for you.",
    "en2": "I hope you go for it."
   },
   {
    "ja": "中途半端になる",
    "line": "中途半端になるんだよ。",
    "en1": "You end up doing it halfway.",
    "en2": "It turns into a half-baked thing."
   },
   {
    "ja": "いやいや",
    "line": "はっはっは、いやいや。",
    "en1": "No, no, come on.",
    "en2": "Nah, stop it."
   },
   {
    "ja": "言うこと聞かん",
    "line": "言うこと聞かんって言われました。",
    "en1": "I was told I don't listen.",
    "en2": "They said I never do what I'm told."
   },
   {
    "ja": "〜する意味がない",
    "line": "ウエイトする意味がない。",
    "en1": "There's no point lifting.",
    "en2": "What's the point of lifting, then?"
   },
   {
    "ja": "まあまあできます",
    "line": "35試合、まあまあできます。",
    "en1": "I can do all right.",
    "en2": "I can hold my own."
   },
   {
    "ja": "それはやめろ",
    "line": "食べてるやろこれ。それはやめろ。",
    "en1": "Cut it out.",
    "en2": "Don't do that."
   },
   {
    "ja": "いやーでも素晴らしいですよね",
    "line": "いやーでも素晴らしいですよね。",
    "en1": "Man, that's amazing, though.",
    "en2": "Honestly, that's incredible."
   },
   {
    "ja": "俺が一番うまいと思ってる",
    "line": "試合になったら俺が一番うまいと思ってる。",
    "en1": "I think I'm the best guy out there.",
    "en2": "In my head, I'm the best one on the field."
   },
   {
    "ja": "〜せなあかんと思って",
    "line": "一番下手だから練習せなあかんと思って。",
    "en1": "I figured I had to put in the work.",
    "en2": "I told myself I needed to practice."
   },
   {
    "ja": "なんとなく格好良かった",
    "line": "なーんとなく格好良かったんですよ。",
    "en1": "It just looked cool, I guess.",
    "en2": "I don't know, it seemed cool."
   },
   {
    "ja": "伸びしろがない",
    "line": "した時点で、もう伸びしろないなと。",
    "en1": "There's no room to grow.",
    "en2": "That's as good as it gets."
   },
   {
    "ja": "惚れるのわかる",
    "line": "みんなが惚れるのわかるねぇ。",
    "en1": "I get why everybody loves him.",
    "en2": "No wonder people fall for him."
   },
   {
    "ja": "色々あって",
    "line": "このシーズンは色々あって、ちょっとしか伸びなかった。",
    "en1": "A lot went on.",
    "en2": "It was kind of a mess."
   },
   {
    "ja": "まだやれるよ",
    "line": "でもまだやれるよ、全然やれるよ。",
    "en1": "You've still got it.",
    "en2": "You've got plenty left in the tank."
   },
   {
    "ja": "〜は〜だし",
    "line": "野球は野球だし、プライベートはプライベート。",
    "en1": "Baseball's baseball.",
    "en2": "Work's work, and life's life."
   },
   {
    "ja": "それがもうすごいこと",
    "line": "それがもうすごいことだと思います。",
    "en1": "That alone is huge.",
    "en2": "That in itself is crazy."
   }
  ]
 },
 {
  "date": "2026-10-08",
  "source": {
   "videoId": "oc1m8QcK-m0",
   "channel": "【トキハナ】式場探しチャンネル",
   "title": "恋愛と結婚の違いを語るナイト！〜結婚式を100倍楽しく進める方法〜"
  },
  "rows": [
   {
    "ja": "より伝わりやすくなる",
    "line": "感情を持ってるかを伝えると、より伝わりやすくなるよ。",
    "en1": "It gets across a lot better.",
    "en2": "People actually get it."
   },
   {
    "ja": "気持ちがだいぶ楽になった",
    "line": "話し合うときは、なんか気持ちがだいぶ楽になったなって。",
    "en1": "It took a lot of the pressure off.",
    "en2": "I feel way lighter about it."
   },
   {
    "ja": "やっぱ好きだなぁ",
    "line": "一緒に過ごす時間の中で、やっぱ好きだなぁとか。",
    "en1": "I'm still really into them.",
    "en2": "Yeah, I really do love this person."
   },
   {
    "ja": "きっかけをもらえた",
    "line": "そういう話のきっかけも貰えたかなって思います。",
    "en1": "It got us talking about it.",
    "en2": "It gave us an opening to bring it up."
   },
   {
    "ja": "どちらかと言うと",
    "line": "どちらかと言うと聞くみたいな関係性なのかなと。",
    "en1": "more like",
    "en2": "if anything"
   },
   {
    "ja": "入ってみたら",
    "line": "入ってみたら、何かメンバーとして参加してるような感じ。",
    "en1": "Once I got in,",
    "en2": "When I actually joined,"
   },
   {
    "ja": "すごい素敵な〜だなって思いました",
    "line": "すごい素敵なコミュニティだなって思いました。",
    "en1": "I thought it was a really cool group.",
    "en2": "Honestly, it's a great bunch of people."
   },
   {
    "ja": "最初躊躇してる",
    "line": "結構最初躊躇してる方がすごく多くて。",
    "en1": "A lot of people hold back at first.",
    "en2": "Most people are kind of hesitant at first."
   },
   {
    "ja": "何かできないかなと思いまして",
    "line": "ちょっと何かできないかなと思いまして。",
    "en1": "I figured I'd try to do something.",
    "en2": "I wanted to help out somehow."
   },
   {
    "ja": "良かったらぜひ",
    "line": "良かったらぜひお願いします。",
    "en1": "Check it out if you're up for it.",
    "en2": "Give it a shot if you want."
   },
   {
    "ja": "恐縮ながら",
    "line": "すごい恐縮ながら、プランナーとして常駐させていただき。",
    "en1": "I'm kind of humbled, honestly.",
    "en2": "Not that I deserve it, but"
   },
   {
    "ja": "人には言えないような",
    "line": "ちょっと人には言えないようなお悩みまで。",
    "en1": "stuff you can't tell anybody",
    "en2": "stuff you'd never say out loud"
   },
   {
    "ja": "〜するのもアレだし",
    "line": "そういう質問って、ツイッターでするのもアレだし。",
    "en1": "Posting it on Twitter feels weird.",
    "en2": "Twitter's not really the place for it."
   },
   {
    "ja": "いろんな意見聞きたい",
    "line": "もっとこういろんな意見聞きたいし、みたいな時。",
    "en1": "I want to hear what other people think.",
    "en2": "I want more takes on it."
   },
   {
    "ja": "なかなかしづらい",
    "line": "職場とかではなかなかしづらいというか。",
    "en1": "It's kind of hard to bring up.",
    "en2": "It's not something you just drop at work."
   },
   {
    "ja": "本人は深刻に悩んでるんだけど",
    "line": "ご本人は深刻に悩んでるんだけど、",
    "en1": "It's eating them up, though.",
    "en2": "They're really struggling with it, but"
   },
   {
    "ja": "ほっこりする",
    "line": "ほっこりするお話ですね。",
    "en1": "That's so sweet.",
    "en2": "That's a feel-good story."
   },
   {
    "ja": "意識しないとなかなか難しい",
    "line": "意識しないとなかなか難しいのかなと思うんで。",
    "en1": "It won't happen unless you make a point of it.",
    "en2": "You have to be intentional about it."
   },
   {
    "ja": "〜じゃなくてもいい",
    "line": "いいやつじゃなくてもいいんですけど、",
    "en1": "It doesn't have to be that.",
    "en2": "Doesn't need to be anything fancy."
   },
   {
    "ja": "ゼロではない",
    "line": "愛が冷める可能性もゼロではないよねって。",
    "en1": "You never know.",
    "en2": "It could happen."
   },
   {
    "ja": "約束できることを約束しよう",
    "line": "約束できることを約束しようっていう話になった。",
    "en1": "Let's only promise what we can actually keep.",
    "en2": "Let's not promise stuff we can't back up."
   },
   {
    "ja": "当たり前だと思わない",
    "line": "長年経っても、互いの存在を当たり前だと思わず。",
    "en1": "Don't take each other for granted.",
    "en2": "Never get used to having each other around."
   },
   {
    "ja": "〜って何だろうね",
    "line": "2人が大事にしてるものって何だろうね、みたいな話。",
    "en1": "What actually matters to us?",
    "en2": "What are we really about?"
   },
   {
    "ja": "絶好のチャンス",
    "line": "なるほど、絶好のチャンスだったんですね。",
    "en1": "That was the perfect time for it.",
    "en2": "Couldn't ask for a better shot."
   },
   {
    "ja": "いい発想だな",
    "line": "あの、いい発想だなって。",
    "en1": "That's a great idea.",
    "en2": "Smart way to look at it."
   },
   {
    "ja": "一から考える",
    "line": "言葉を一から考える楽しみがまだまだある。",
    "en1": "come up with it from scratch",
    "en2": "start from nothing"
   },
   {
    "ja": "めちゃくちゃ盛り上がりますよ",
    "line": "めちゃくちゃ盛り上がりますよ。",
    "en1": "It's going to be a blast.",
    "en2": "You'll have so much fun with it."
   },
   {
    "ja": "めちゃくちゃオススメです",
    "line": "行動規範をつくるってのめちゃくちゃオススメです。",
    "en1": "I highly recommend it.",
    "en2": "Totally worth doing."
   },
   {
    "ja": "全然良いと思います",
    "line": "ご飯を一緒に食べる、とかでも全然良いと思います。",
    "en1": "That's totally fine.",
    "en2": "That works just fine."
   },
   {
    "ja": "何があったんだろう",
    "line": "良い結婚式をされたのに、何があったんだろうなあと。",
    "en1": "What happened there?",
    "en2": "I wonder what went wrong."
   },
   {
    "ja": "ここからだな",
    "line": "後ろ姿を見てると、やっぱりここからだなって。",
    "en1": "This is where it really starts.",
    "en2": "Now the real thing begins."
   },
   {
    "ja": "それよりも大切なのって",
    "line": "それよりも大切なのって、これからの二人の人生。",
    "en1": "What matters more is",
    "en2": "The bigger thing is"
   },
   {
    "ja": "なんで〜してるんだろう",
    "line": "なんで私たちはこの仕事してるんだろうとか。",
    "en1": "Why are we even doing this?",
    "en2": "What's the point of all this?"
   },
   {
    "ja": "〜たらいいんじゃないかな",
    "line": "夫婦にもあったらいいんじゃないかなと思った。",
    "en1": "Why not have one too?",
    "en2": "It might be nice to have one."
   }
  ]
 },
 {
  "date": "2026-10-09",
  "source": {
   "videoId": "GQQh2tajjJU",
   "channel": "(公財)広島平和文化センター平和文化企画課",
   "title": "ヒロシマの被爆体験講話　新井　俊一郎（あらい　しゅんいちろう）証言者"
  },
  "rows": [
   {
    "ja": "〜恐れがあるから",
    "line": "ガソリンが足りなくなる恐れがあるから、",
    "en1": "There's a chance they'd run out.",
    "en2": "They might not have enough."
   },
   {
    "ja": "あれやめよう",
    "line": "新潟ちょっと遠い。あれやめよう。",
    "en1": "Scratch that one.",
    "en2": "Forget it, drop that one."
   },
   {
    "ja": "絶対反対",
    "line": "京都を爆撃することは絶対反対と言った。",
    "en1": "No way. Absolutely not.",
    "en2": "Over my dead body."
   },
   {
    "ja": "〜には手をつけるな",
    "line": "京都には手をつけるなって言った。",
    "en1": "Don't you touch Kyoto.",
    "en2": "Leave Kyoto alone."
   },
   {
    "ja": "おかしいな",
    "line": "我々はそんなこと知らないよ。おかしいなって。",
    "en1": "Something's off.",
    "en2": "This is weird."
   },
   {
    "ja": "1機や2機じゃない",
    "line": "それも1機や2機じゃないよ。",
    "en1": "We're not talking one or two.",
    "en2": "Not just a couple, either."
   },
   {
    "ja": "とんでもない",
    "line": "とんでもない、100機200機だよ。",
    "en1": "Are you kidding me? Hundreds.",
    "en2": "No, we're talking hundreds."
   },
   {
    "ja": "覚悟した",
    "line": "覚悟したよ。とうとう今日でおしまいだ。",
    "en1": "I braced myself.",
    "en2": "I figured this was it."
   },
   {
    "ja": "今日でおしまいだ",
    "line": "これまで無事だったけど、とうとう今日でおしまいだ。",
    "en1": "This is it. We're done.",
    "en2": "Today's the day it ends."
   },
   {
    "ja": "〜と思ったら",
    "line": "来るぞと思ったら、くるっと向きを変えて。",
    "en1": "Just when I thought they were coming,",
    "en2": "The second I thought, here we go,"
   },
   {
    "ja": "何やってんだ",
    "line": "九州か大阪行っちゃうのよ。何やってんだ。",
    "en1": "What are they doing?",
    "en2": "What the heck?"
   },
   {
    "ja": "じゃ仕方ない",
    "line": "行けないわけよ。じゃ仕方ない、大砲で撃て。",
    "en1": "Fine, whatever.",
    "en2": "Okay, then we'll do it this way."
   },
   {
    "ja": "当たるはずないわな",
    "line": "1万M近いとこまで届かなきゃ当たるはずないわな。",
    "en1": "No way you're hitting that.",
    "en2": "Of course they're not going to hit it."
   },
   {
    "ja": "答えはたった1つ",
    "line": "答えはたった1つ。これからやられるってことよ。",
    "en1": "There's only one answer.",
    "en2": "It can only mean one thing."
   },
   {
    "ja": "どうしようもない",
    "line": "結論はすぐ出た。結論はどうしようもないって。",
    "en1": "There's nothing we can do.",
    "en2": "We're out of options."
   },
   {
    "ja": "仕方がないじゃないか",
    "line": "燃えてくるんだから仕方がないじゃないか。",
    "en1": "What are you going to do?",
    "en2": "It is what it is."
   },
   {
    "ja": "これは困ったな",
    "line": "北に燃えていくし、これは困ったなと。",
    "en1": "Well, that's a problem.",
    "en2": "Now we're in trouble."
   },
   {
    "ja": "悪いことに",
    "line": "しかも悪いことに、司令部が北の方にあった。",
    "en1": "And to make it worse,",
    "en2": "On top of that,"
   },
   {
    "ja": "〜みたいなもんだ",
    "line": "中学生はもう大人だと言ったって、子供みたいなもんだよね。",
    "en1": "They're basically kids.",
    "en2": "They're pretty much just kids."
   },
   {
    "ja": "すごいな怖いな",
    "line": "髭でも生えてね、すごいな怖いなという感じだった。",
    "en1": "Man, those guys were scary.",
    "en2": "They looked huge and kind of terrifying."
   },
   {
    "ja": "そんな時代じゃない",
    "line": "ゆっくり勉強してる、そんな時代じゃないぞ。",
    "en1": "Those days are over.",
    "en2": "This isn't the time for that."
   },
   {
    "ja": "呑気に〜してる暇ない",
    "line": "呑気に勉強してる暇ないから、",
    "en1": "No time to sit around studying.",
    "en2": "We can't just kick back and study."
   },
   {
    "ja": "何でもいいから",
    "line": "芋でも麦でも何でもいいから作れ。",
    "en1": "Whatever, just grow something.",
    "en2": "Doesn't matter what."
   },
   {
    "ja": "硬いのなんのって",
    "line": "硬いのなんのって、かっちんこっちんだったわ。",
    "en1": "It was hard as a rock.",
    "en2": "Man, that ground was hard."
   },
   {
    "ja": "結論から言っとく",
    "line": "もう結論から言っとくぞ。",
    "en1": "Let me cut to the chase.",
    "en2": "Bottom line first."
   },
   {
    "ja": "片っ端から",
    "line": "家をね、片っ端からぶっ潰すわけよ。",
    "en1": "one after another",
    "en2": "every last one of them"
   },
   {
    "ja": "そうはいかない",
    "line": "女の子はそうはいかないからね。",
    "en1": "Girls couldn't do that.",
    "en2": "That wasn't an option for the girls."
   },
   {
    "ja": "ひとたまりもない",
    "line": "爆弾が落とされたら、もうひとたまりもない。",
    "en1": "We wouldn't stand a chance.",
    "en2": "We'd be toast."
   },
   {
    "ja": "飴と鞭",
    "line": "ご褒美。飴と鞭だな。",
    "en1": "carrot and stick",
    "en2": "a little reward to keep you going"
   },
   {
    "ja": "まさか〜と思わなかった",
    "line": "まさか1番最初に名前呼ばれると思わなかった。",
    "en1": "I never thought it'd be me.",
    "en2": "Didn't see that coming."
   },
   {
    "ja": "馬鹿野郎、何考えてんだ",
    "line": "馬鹿野郎、何考えてんだ。戦争やってんだぞ。",
    "en1": "Are you out of your mind?",
    "en2": "What were you thinking, you idiot?"
   },
   {
    "ja": "いいことも悪いこともみんな",
    "line": "大抵、いいこと悪いことみんな私やらされる。",
    "en1": "Good or bad, it always lands on me.",
    "en2": "Whatever it is, I always get stuck with it."
   },
   {
    "ja": "どんちゃん騒ぎ",
    "line": "あのどんちゃん騒ぎやったもんとかね。",
    "en1": "We partied pretty hard.",
    "en2": "It got pretty wild."
   },
   {
    "ja": "〜してよかった",
    "line": "2番列車に遅刻してよかったよと思って。",
    "en1": "Good thing we were late.",
    "en2": "Glad we missed it."
   },
   {
    "ja": "間違いない",
    "line": "光って音がしたことは間違いないけど、",
    "en1": "No doubt about it.",
    "en2": "That part's for sure."
   }
  ]
 },
 {
  "date": "2026-10-10",
  "source": {
   "videoId": "KeXYMDFEcx0",
   "channel": "あののオールナイトニッポン",
   "title": "【神回・深夜トーク】あののオールナイトニッポン0｜岡山天音ゲストで独特すぎる空気感の神回｜2026.03.25"
  },
  "rows": [
   {
    "ja": "嬉しくて嬉しくて",
    "line": "もう嬉しくて嬉しくて、ハフハフしちゃって。",
    "en1": "He was just so happy.",
    "en2": "He was over the moon."
   },
   {
    "ja": "何て言うんだろうな",
    "line": "もう本当、何て言うんだろうな。",
    "en1": "How do I put this?",
    "en2": "I don't know how to say it."
   },
   {
    "ja": "死ぬほど喋る",
    "line": "もう死ぬほど喋ってんのに、すっごいカットされてる。",
    "en1": "He talked my ear off.",
    "en2": "He would not stop talking."
   },
   {
    "ja": "〜にも収まんないぐらい",
    "line": "3時間ってすごい長いけど、そこにも収まんないぐらい。",
    "en1": "Even three hours wasn't enough.",
    "en2": "It wouldn't even fit in three hours."
   },
   {
    "ja": "偉いなって思った",
    "line": "そう、偉いなって思ったのが、",
    "en1": "I've got to give him credit.",
    "en2": "Respect to him, honestly."
   },
   {
    "ja": "あんな感じって言ってもあれだけど",
    "line": "あんな感じって言ってもあれだけど、",
    "en1": "Not to be rude, but",
    "en2": "No offense, but"
   },
   {
    "ja": "明らかにだるそう",
    "line": "明らかにだるそうな感じで突っ込んでいた。",
    "en1": "He was clearly over it.",
    "en2": "You could tell he couldn't be bothered."
   },
   {
    "ja": "〜が分かってれば",
    "line": "それが分かってれば、無理して寝ようとかしなかった。",
    "en1": "If I'd known that,",
    "en2": "Had I known,"
   },
   {
    "ja": "ま、行っとくか",
    "line": "今日は行けるか、ま、行っとくかみたいな感じで。",
    "en1": "Eh, why not.",
    "en2": "Sure, let's do it."
   },
   {
    "ja": "〜はまだしも",
    "line": "1人とか2人で喋ってんのはまだしも、",
    "en1": "One or two, fine, but",
    "en2": "I get a couple of people, but"
   },
   {
    "ja": "マジ早く帰れよ",
    "line": "マジ早く帰れよとか言って。",
    "en1": "Just go home already.",
    "en2": "Can you please just leave?"
   },
   {
    "ja": "なんとかしろ",
    "line": "マネージャー、なんとかしろとか僕も言って。",
    "en1": "Do something!",
    "en2": "Fix this!"
   },
   {
    "ja": "もう〜するしかない",
    "line": "もう通るしかないなってなって。",
    "en1": "I just had to go for it.",
    "en2": "There was no way around it."
   },
   {
    "ja": "まだまだ行けるよ",
    "line": "俺行こうか、まだまだ行けるよみたいな。",
    "en1": "I've still got plenty left.",
    "en2": "I'm just getting started."
   },
   {
    "ja": "失礼だけど",
    "line": "ベテランの方なんで失礼だけど、",
    "en1": "With all due respect,",
    "en2": "I don't mean this badly, but"
   },
   {
    "ja": "どこがだよ",
    "line": "絡みすごいいいねとか言ってて、どこがだよみたいな。",
    "en1": "Where? How?",
    "en2": "Are you serious?"
   },
   {
    "ja": "もう大丈夫です",
    "line": "いや、もう大丈夫ですとか言っても、",
    "en1": "I'm good, thanks.",
    "en2": "No, I'm fine, really."
   },
   {
    "ja": "取り憑かれてる",
    "line": "バスの悪魔ですから。あれは取り憑かれてる。",
    "en1": "He's obsessed.",
    "en2": "The guy's possessed."
   },
   {
    "ja": "喧嘩になりかける",
    "line": "もうね、本当に喧嘩になりかけるから。",
    "en1": "It almost turns into a fight.",
    "en2": "It nearly gets ugly."
   },
   {
    "ja": "タイミングが合わない",
    "line": "もうなんかそのタイミングが合わなくて出てない。",
    "en1": "The timing never works out.",
    "en2": "It just never lines up."
   },
   {
    "ja": "人の話聞かない",
    "line": "本当に人の話聞かず、ずっとバスに目がけてた。",
    "en1": "He doesn't listen to anybody.",
    "en2": "Nothing you say gets through."
   },
   {
    "ja": "頑固になってる",
    "line": "もう頑固になってんだと思うよ。",
    "en1": "He's dug his heels in.",
    "en2": "He's gotten stubborn about it."
   },
   {
    "ja": "ガチなんだよね",
    "line": "ロケこういうの、ガチなんだよね。",
    "en1": "It's the real deal.",
    "en2": "They're not messing around."
   },
   {
    "ja": "〜できないなって思った",
    "line": "僕はレギュラーとかでできないなって思った。",
    "en1": "I couldn't do it every week.",
    "en2": "There's no way I could do that full-time."
   },
   {
    "ja": "だったらもっとちゃんと〜させろよ",
    "line": "いや、だったらもっとちゃんと歌わせろよって。",
    "en1": "Then let me do it right!",
    "en2": "Then give me a real shot at it!"
   },
   {
    "ja": "いいのが出たんじゃない",
    "line": "いや、でもいいのが出たんじゃない？",
    "en1": "I think that came out pretty good.",
    "en2": "Not bad, actually."
   },
   {
    "ja": "ハードルを下げる",
    "line": "ハードルを下げてですね、出れるなら。",
    "en1": "Let's lower the bar a little.",
    "en2": "Let's not set expectations too high."
   },
   {
    "ja": "え、マジで？",
    "line": "え、マジで？そうだった。",
    "en1": "Wait, seriously?",
    "en2": "No way, really?"
   },
   {
    "ja": "〜見たことなくね",
    "line": "私服見たことなくね、スーツしか見たことない。",
    "en1": "Have we ever even seen him in normal clothes?",
    "en2": "I've never seen him out of a suit."
   },
   {
    "ja": "正直〜にぴったりだな",
    "line": "正直このラジオにぴったりだなって思ったよ。",
    "en1": "Honestly, he's perfect for this show.",
    "en2": "To be real, he fit right in."
   },
   {
    "ja": "逆に気持ちいい",
    "line": "もうなんかノリが逆に気持ちいいというところ。",
    "en1": "It's weirdly refreshing.",
    "en2": "Honestly, it's kind of satisfying."
   },
   {
    "ja": "鳥肌が立つ",
    "line": "引き出しの多さに鳥肌が立ってます。",
    "en1": "I got chills.",
    "en2": "That gave me goosebumps."
   },
   {
    "ja": "絶対並びたくない",
    "line": "もうさ、絶対並びたくないもんね。",
    "en1": "I don't want to be anywhere near that.",
    "en2": "No way I'm being compared to that."
   },
   {
    "ja": "〜説ある",
    "line": "今そんな機会ないんじゃね説あるわ。",
    "en1": "I've got a theory.",
    "en2": "I kind of think that might be true."
   },
   {
    "ja": "刻んどけ",
    "line": "今これはね、刻んどけ。",
    "en1": "Burn this into your memory.",
    "en2": "Don't you forget this."
   }
  ]
 },
 {
  "date": "2026-10-11",
  "source": {
   "videoId": "16RDhVHoQk8",
   "channel": "talk.ht954",
   "title": "ハライチ岩井　フリートーク集"
  },
  "rows": [
   {
    "ja": "性格悪い",
    "line": "汚さないでくださいね、ありがとう。性格悪い。",
    "en1": "That's so passive-aggressive.",
    "en2": "That's kind of nasty, honestly."
   },
   {
    "ja": "〜にしとくか",
    "line": "1回この命令じゃなくてお礼にしとくか。",
    "en1": "Let's go with a thank-you instead.",
    "en2": "Maybe we'll just say thanks."
   },
   {
    "ja": "すげえ効くらしい",
    "line": "あれでもすげえ効くらしいけどね。",
    "en1": "Apparently it works like a charm.",
    "en2": "I heard it actually works."
   },
   {
    "ja": "〜アピール",
    "line": "天使が周り飛んでて、綺麗ですアピールみたいなやつ。",
    "en1": "trying way too hard to look clean",
    "en2": "like, look how clean we are"
   },
   {
    "ja": "〜させてんじゃねえよ",
    "line": "天使に便座ほおずりさせてんじゃねえよって。",
    "en1": "Why would you make it do that?",
    "en2": "Don't make the angel do that!"
   },
   {
    "ja": "いくら〜とはいえ",
    "line": "いくらトイレきれいに使ってるとはいえ、",
    "en1": "I don't care how clean it is,",
    "en2": "Even if it's clean,"
   },
   {
    "ja": "〜だとしても",
    "line": "イメージだとしても、お前天使だよって。",
    "en1": "Even if it's just a picture,",
    "en2": "Still,"
   },
   {
    "ja": "そういうことじゃない",
    "line": "天使さんはもうそういうことじゃないんだ。",
    "en1": "That's not the point.",
    "en2": "That's not what it's about."
   },
   {
    "ja": "知らないけど",
    "line": "あとでゼウスに怒られる。知らないけど。",
    "en1": "I don't know, though.",
    "en2": "Don't quote me on that."
   },
   {
    "ja": "一発で",
    "line": "本来魔法を使えば一発で、キューンっていう。",
    "en1": "in one shot",
    "en2": "just like that"
   },
   {
    "ja": "バカじゃない？",
    "line": "バカじゃない？天使だよと思って。",
    "en1": "Are you stupid?",
    "en2": "Are you kidding me?"
   },
   {
    "ja": "プライドないのか",
    "line": "なんてプライドないのかお前は。",
    "en1": "Do you have no pride?",
    "en2": "Have some self-respect, man."
   },
   {
    "ja": "それはあるな、確かに",
    "line": "それはあるな、確かにね。",
    "en1": "Yeah, you've got a point.",
    "en2": "Okay, fair."
   },
   {
    "ja": "特殊すぎる",
    "line": "特殊すぎるわ、それは。",
    "en1": "That's way too specific.",
    "en2": "That's so niche."
   },
   {
    "ja": "何なんだよ",
    "line": "天に持ってくる。それとかもう何なんだよ。",
    "en1": "What even is that?",
    "en2": "What is wrong with people?"
   },
   {
    "ja": "扱いが雑",
    "line": "最近だから天使の扱い雑になっちゃってるわ。",
    "en1": "They're treating angels like garbage.",
    "en2": "Nobody respects angels anymore."
   },
   {
    "ja": "何の話",
    "line": "何の話で、どういう角度の話なのマジで。",
    "en1": "What are we even talking about?",
    "en2": "Where is this even going?"
   },
   {
    "ja": "納得いく",
    "line": "お前がゼウスなの？ゼウスならなんか納得いく。",
    "en1": "That'd make sense.",
    "en2": "Okay, then I get it."
   },
   {
    "ja": "ちょっとキモい",
    "line": "人に声かけられた話多いはちょっとキモいじゃない。",
    "en1": "That's a little creepy.",
    "en2": "That's kind of weird, dude."
   },
   {
    "ja": "ダメージない",
    "line": "電車の話多いって言われてダメージないから別に。",
    "en1": "That doesn't even hurt.",
    "en2": "That doesn't bother me at all."
   },
   {
    "ja": "もういいから、わかったから",
    "line": "もういいから、わかったから、ごめんよ。",
    "en1": "Okay, okay, I get it.",
    "en2": "All right, fine, my bad."
   },
   {
    "ja": "頼むから",
    "line": "もういいよ、頼むから。",
    "en1": "Please, I'm begging you.",
    "en2": "Come on, man."
   },
   {
    "ja": "お互い様",
    "line": "あのお互い様なんだけどね。",
    "en1": "We're all in the same boat.",
    "en2": "It goes both ways."
   },
   {
    "ja": "気がついたら",
    "line": "そこに立って、気がついたら目の前に。",
    "en1": "Next thing I know,",
    "en2": "Before I knew it,"
   },
   {
    "ja": "死ぬんかなと思った",
    "line": "どういうこと、死ぬんかなと思ったの。",
    "en1": "I thought I was going to die.",
    "en2": "I figured this was the end."
   },
   {
    "ja": "絶対〜したくない",
    "line": "でもそれ絶対当たりたくないわけ。",
    "en1": "I did not want to touch it.",
    "en2": "No way was I touching that."
   },
   {
    "ja": "よく見たら",
    "line": "しかもそのよく見たら、もう髪の毛が全体的に。",
    "en1": "When I looked closer,",
    "en2": "And then I noticed,"
   },
   {
    "ja": "嗅いだことない",
    "line": "なんか嗅いだことないみたいな海外の匂い。",
    "en1": "a smell I'd never smelled before",
    "en2": "some smell I couldn't place"
   },
   {
    "ja": "すぐわかった",
    "line": "俺すぐわかったんだけど、あこれ爆弾だなって。",
    "en1": "I knew right away.",
    "en2": "I clocked it instantly."
   },
   {
    "ja": "珍しい組み合わせ",
    "line": "珍しい組み合わせだなとは思うんだけど。",
    "en1": "That's an odd pair.",
    "en2": "Didn't expect those two together."
   },
   {
    "ja": "〜そうなのに",
    "line": "珍しいな2人で。お前嫌いそうなのになぁ。",
    "en1": "I'd have thought you hated him.",
    "en2": "He doesn't seem like your type."
   },
   {
    "ja": "いい女かよ",
    "line": "いやいい女かよと思ったけどね。",
    "en1": "What is he, a hot date?",
    "en2": "Playing hard to get, huh?"
   },
   {
    "ja": "会ったら会ったで",
    "line": "会ったら会ったでさ、ちょっとテンション低いんだよ。",
    "en1": "And then when we finally met up,",
    "en2": "And once we did meet,"
   },
   {
    "ja": "〜ないまでも",
    "line": "言わないまでもさ、テンションちょっと下げといてさ。",
    "en1": "Not saying it outright, but",
    "en2": "Without actually saying it,"
   },
   {
    "ja": "罠張ってんじゃねえよ",
    "line": "罠張ってんじゃねえよ、ふざけんなよ。",
    "en1": "Don't set me up like that.",
    "en2": "Quit fishing for it."
   }
  ]
 },
 {
  "date": "2026-10-12",
  "source": {
   "videoId": "4pr96-48G5E",
   "channel": "Samet Emre Demir",
   "title": "ダウンタウン フリートークまとめ集#29 【作業用・睡眠用・ドライブ・聞き流し】松本人志 すべらない話 （概要欄タイムスタンプ有り） 聞き流し"
  },
  "rows": [
   {
    "ja": "なんでそんな〜のやろ",
    "line": "なんで、なんでそんな夢見んのやろ。",
    "en1": "Why would I even dream that?",
    "en2": "Where does that even come from?"
   },
   {
    "ja": "あるある",
    "line": "たまにうわって落ちる時あるやん。あるある。",
    "en1": "Oh, totally.",
    "en2": "Yeah, that happens."
   },
   {
    "ja": "なんやこいつ",
    "line": "広い家住んでらっしゃるから。なんやこいつ。",
    "en1": "Who does this guy think he is?",
    "en2": "What's with this guy?"
   },
   {
    "ja": "わけわからん",
    "line": "何があんねん。わけわからへんわ。",
    "en1": "Makes no sense.",
    "en2": "I have no idea what you're talking about."
   },
   {
    "ja": "そんなことないですよ",
    "line": "そんなことないですよ。そらありますよ。",
    "en1": "Oh, no, not at all.",
    "en2": "No way, there's a ton."
   },
   {
    "ja": "〜んやったら言うなや",
    "line": "もうそんな詰まるんやったら言うなや。",
    "en1": "If you're going to choke, don't bring it up.",
    "en2": "Then why'd you even start?"
   },
   {
    "ja": "〜ってどこやねん",
    "line": "もっと奥ってどこやねん。",
    "en1": "Where the heck is that?",
    "en2": "What does that even mean?"
   },
   {
    "ja": "〜ぐらいやったら",
    "line": "こうするぐらいやったら立てろや。",
    "en1": "If you're going to do that, just",
    "en2": "At that point, just"
   },
   {
    "ja": "色々ありましたよ",
    "line": "まあ、色々ありましたよ。世界広いですから。",
    "en1": "Oh, I've seen it all.",
    "en2": "There's all kinds out there."
   },
   {
    "ja": "よっぽどやな",
    "line": "ずっと驚いてたもん。それよっぽどやな。",
    "en1": "Must've been something.",
    "en2": "Wow, that bad, huh?"
   },
   {
    "ja": "逆切れ",
    "line": "逆切れや、逆切れ。",
    "en1": "Now you're mad at me?",
    "en2": "Don't turn this around on me."
   },
   {
    "ja": "言わせてもらうけど",
    "line": "ほな言わしてもらうけど、",
    "en1": "Well, let me tell you something.",
    "en2": "Okay, since you asked,"
   },
   {
    "ja": "ちょっと待って",
    "line": "ちょっと待って、俺の大切な思い出を。",
    "en1": "Hold on a second.",
    "en2": "Wait, wait, wait."
   },
   {
    "ja": "言い方悪かった",
    "line": "あ、僕が言い方悪かった。お願いします。",
    "en1": "My bad, that came out wrong.",
    "en2": "Okay, I said that wrong."
   },
   {
    "ja": "知らんわ",
    "line": "これ何秒ですか。知らんわ。",
    "en1": "How should I know?",
    "en2": "Beats me."
   },
   {
    "ja": "簡単な話じゃないですか",
    "line": "10回やればいい。簡単な話じゃないですか。",
    "en1": "It's that simple.",
    "en2": "Easy, right?"
   },
   {
    "ja": "〜じゃなくてもいい",
    "line": "別にこれじゃなくてもいいですよ。何でも。",
    "en1": "It doesn't have to be this.",
    "en2": "Anything works, really."
   },
   {
    "ja": "〜の問題なんですよ",
    "line": "価値観の問題なんですよ。",
    "en1": "It's all about how you see it.",
    "en2": "It comes down to your mindset."
   },
   {
    "ja": "当たり前の顔して",
    "line": "もう当たり前の顔して、変にケツを閉めたりせずに。",
    "en1": "Act like it's no big deal.",
    "en2": "Just play it cool."
   },
   {
    "ja": "もうしょうがない",
    "line": "もう出るんですから、もうしょうがないです。",
    "en1": "There's nothing you can do.",
    "en2": "It's going to happen anyway."
   },
   {
    "ja": "潔く",
    "line": "潔くブってこきましょう。",
    "en1": "Just own it.",
    "en2": "Go for it, no shame."
   },
   {
    "ja": "平気な顔して",
    "line": "それでも平気な顔して。",
    "en1": "Keep a straight face.",
    "en2": "Act totally normal."
   },
   {
    "ja": "1つ言えることは",
    "line": "ただね、1つ言えることは、結局自信なんですよ。",
    "en1": "I'll tell you one thing.",
    "en2": "Here's the thing, though."
   },
   {
    "ja": "どうしたって",
    "line": "自信のない時はどうしたって声がちっちゃくなる。",
    "en1": "no matter what",
    "en2": "no matter how hard you try"
   },
   {
    "ja": "話終わってまう",
    "line": "そんなこと言われたら話終わってまうって。",
    "en1": "Well, that kills the conversation.",
    "en2": "Then there's nothing left to say."
   },
   {
    "ja": "僕みたいなもんが",
    "line": "僕みたいなもんがっていう気持ちがすごく強い。",
    "en1": "Who am I to do this?",
    "en2": "Someone like me?"
   },
   {
    "ja": "もう最悪や",
    "line": "ひよこ1人ね、うわもう最悪や。",
    "en1": "Oh man, this is the worst.",
    "en2": "Ugh, I'm done for."
   },
   {
    "ja": "どういうつもりや",
    "line": "後で楽屋来て、おい、どういうつもりやって。",
    "en1": "What's your deal?",
    "en2": "What was that about?"
   },
   {
    "ja": "どんな顔するかな",
    "line": "どんな顔するかな思って、まあ行ってんけど。",
    "en1": "I wanted to see the look on his face.",
    "en2": "I wanted to see how he'd react."
   },
   {
    "ja": "めっちゃ緊張した",
    "line": "みんな知らんから、だから俺もめっちゃ緊張したやん。",
    "en1": "I was so nervous.",
    "en2": "I was freaking out."
   },
   {
    "ja": "みんなが知らんだけ",
    "line": "今まででも、みんなが知らんだけでな。",
    "en1": "People just don't know it.",
    "en2": "Nobody's noticed, that's all."
   },
   {
    "ja": "しつこいようですけど",
    "line": "しつこいようですけど、これを最後にさせていただきます。",
    "en1": "Sorry to keep going on about it, but",
    "en2": "I know I keep bringing this up, but"
   },
   {
    "ja": "誰も言ってへん",
    "line": "来てくれなんか誰も言ってへん。",
    "en1": "Nobody asked you to.",
    "en2": "Nobody invited you."
   },
   {
    "ja": "それやったらもういらん",
    "line": "5万円でしょ。それやったらもういらんちゅうねん。",
    "en1": "Then keep it.",
    "en2": "Forget it, I don't want it."
   },
   {
    "ja": "気持ちのもん",
    "line": "気持ちのもんやからな。",
    "en1": "It's the thought that counts.",
    "en2": "It's about the gesture."
   }
  ]
 },
 {
  "date": "2026-10-13",
  "source": {
   "videoId": "eWAvbd4FTX8",
   "channel": "buchi kuroinu",
   "title": "伊集院光　深夜の馬鹿力 うどんトーク・イリュージョン人情旅"
  },
  "rows": [
   {
    "ja": "見栄張りたい",
    "line": "もう買いにくくない？ちょっと見栄張りたい、見栄張りたいけど。",
    "en1": "I kind of want to show off.",
    "en2": "You want to look like a big shot, right?"
   },
   {
    "ja": "冷静になった",
    "line": "カタログ見てすごい冷静になったんだけど。",
    "en1": "Looking at the catalog snapped me right out of it.",
    "en2": "The catalog brought me back down to earth."
   },
   {
    "ja": "下手すりゃ〜",
    "line": "自転車乗る前と乗った後なんて、下手すりゃ5kgぐらい体重差ある。",
    "en1": "It could easily be like five kilos.",
    "en2": "Worst case, we're talking five kilos."
   },
   {
    "ja": "そう考えると",
    "line": "朝晩の体重差が3kgぐらいあるわけだ。そう考えると……",
    "en1": "When you think about it that way...",
    "en2": "So if you look at it like that..."
   },
   {
    "ja": "誤差の範囲",
    "line": "俺の誤差の範囲の中に平気で何十万収まるんだったら。",
    "en1": "It's basically a rounding error.",
    "en2": "That's well within the margin of error."
   },
   {
    "ja": "〜ば〜ほどいい",
    "line": "ダイエットのために乗ってんだから、疲れりゃ疲れるほどいいじゃん。",
    "en1": "The more tired I get, the better.",
    "en2": "If it wears me out, even better."
   },
   {
    "ja": "ぶっ壊れるまで〜ればいい",
    "line": "結果、今のがぶっ壊れるまで乗ればいいみたいな感じになっちゃって。",
    "en1": "I'll just ride it till it falls apart.",
    "en2": "I'm going to run this one into the ground."
   },
   {
    "ja": "いや分かりますよ",
    "line": "いや分かりますよ、タイトルコール前だってこと。",
    "en1": "No, I know, I know.",
    "en2": "Yeah, I get it, trust me."
   },
   {
    "ja": "比べるもんじゃない",
    "line": "だからそことは、比べるもんじゃないっていうか。",
    "en1": "It's apples and oranges, really.",
    "en2": "You can't even compare them."
   },
   {
    "ja": "ハードルを上げすぎる",
    "line": "頭の中で変にそこと比べてたから、ハードルを異常に上げすぎてた。",
    "en1": "I set the bar way too high.",
    "en2": "My expectations were through the roof."
   },
   {
    "ja": "もうわかんなくなる",
    "line": "もうわかんなくなるわ。もうビッグの話になってきたから。",
    "en1": "I've totally lost the thread.",
    "en2": "Now I don't even know where I'm going with this."
   },
   {
    "ja": "もうどうでもいいんですよ",
    "line": "うどんの話はどうなったの、みたいな。もうどうでもいいんですよ。",
    "en1": "Who cares, honestly.",
    "en2": "It doesn't even matter at this point."
   },
   {
    "ja": "売り切れ次第終了",
    "line": "8時とかから始まって、売り切れ次第終了って書いてある。",
    "en1": "They're open till they sell out.",
    "en2": "Once it's gone, it's gone."
   },
   {
    "ja": "要は",
    "line": "要は元々製麺所のところが製麺して、他にも出すけど。",
    "en1": "Basically...",
    "en2": "Bottom line is..."
   },
   {
    "ja": "どうやら〜とされている",
    "line": "そのお店のここがどうやら美味しいとされていて。",
    "en1": "Apparently this is the place to go.",
    "en2": "Word is this place is the real deal."
   },
   {
    "ja": "〜だよ？",
    "line": "7時に行くんだけど、平日だよ？",
    "en1": "And this is on a weekday!",
    "en2": "On a weekday, mind you."
   },
   {
    "ja": "商売っ気がある",
    "line": "商売っ気ある人がすごいなと思うのは。",
    "en1": "Some people really know how to make a buck.",
    "en2": "Those guys have a real nose for business."
   },
   {
    "ja": "まさか〜はないだろう",
    "line": "まさかピンポイントで住所行っても分からないはないだろうと思って。",
    "en1": "There's no way I'm going to miss it with the exact address.",
    "en2": "I figured I couldn't possibly get lost with the address, right?"
   },
   {
    "ja": "話には聞いてたけど",
    "line": "うどん屋さん行って、やっぱり話には聞いてたけど。",
    "en1": "I'd heard about it, but still...",
    "en2": "I knew what to expect, but man..."
   },
   {
    "ja": "恥ずかしくてしょうがない",
    "line": "並んで食べるとこだと、恥ずかしくてしょうがない。",
    "en1": "It's so embarrassing.",
    "en2": "I can't stand how awkward it is."
   },
   {
    "ja": "食べ比べしたい",
    "line": "もう1軒食べ比べしたいなってちょっと思って。",
    "en1": "I wanted to try another place and compare.",
    "en2": "I kind of wanted to do a taste test."
   },
   {
    "ja": "それがもうおかしくて",
    "line": "卵ぐっていう感じ。それがもう俺おかしくて。",
    "en1": "That just cracked me up.",
    "en2": "I couldn't stop laughing at that."
   },
   {
    "ja": "またちょっと別だな",
    "line": "800円のうどんと比べてどうかっていうと、またちょっと別だな。",
    "en1": "That's a whole other story.",
    "en2": "That's a different thing altogether."
   },
   {
    "ja": "納得いかない",
    "line": "劣ってるうどんを5倍の値段で食うっていうのは納得いかなかったり。",
    "en1": "That just doesn't sit right with them.",
    "en2": "It doesn't add up for them."
   },
   {
    "ja": "〜のは分かるんだけど",
    "line": "納得いかなかったりするのは分かるんだけど。",
    "en1": "I totally get that, but...",
    "en2": "I see where they're coming from, but..."
   },
   {
    "ja": "いくらでも値上げできる",
    "line": "便乗すればいくらでも値上げできると思うの。",
    "en1": "They could jack up the prices all they want.",
    "en2": "They could charge whatever they feel like."
   },
   {
    "ja": "尊敬に値する",
    "line": "もうちょっと尊敬に値することだなと思ったりはまあするんだけど。",
    "en1": "You've got to respect that.",
    "en2": "Honestly, hats off to them."
   },
   {
    "ja": "〜すぎたせいで",
    "line": "うどん県推しすぎたせいでさ、骨付き鳥が全然クローズアップされてない。",
    "en1": "They pushed the udon thing so hard nobody talks about the chicken.",
    "en2": "The udon hype totally buried the chicken."
   },
   {
    "ja": "〜な気がしてる",
    "line": "カーネルサンダースに対抗できるの、骨付き鳥な気俺ちょっとしてる。",
    "en1": "I kind of feel like it could take on KFC.",
    "en2": "I've got a hunch it could go toe to toe with KFC."
   },
   {
    "ja": "定着しない",
    "line": "池袋に1回美味しい店ができたんだけど、定着しなくてなくなった。",
    "en1": "It just never caught on.",
    "en2": "It didn't stick."
   },
   {
    "ja": "なんで教えてくれないの",
    "line": "あそこうまかったんですよ、みたいな。なんで教えてくれないの的な。",
    "en1": "Why didn't you tell me?",
    "en2": "And you're only telling me now?"
   },
   {
    "ja": "酸いも甘いも噛み分ける",
    "line": "ラジオの酸いも甘いも噛み分けてるはずのスタッフが。",
    "en1": "guys who've seen it all",
    "en2": "people who've been around the block"
   },
   {
    "ja": "どうかしてる",
    "line": "ただ単に急に気がどうかしてるような大きい声がいいみたいです。",
    "en1": "like I've totally lost my mind",
    "en2": "like I've gone completely nuts"
   },
   {
    "ja": "足を伸ばす",
    "line": "愛媛県の四国中央ぐらいまでまたあるんだけど、そこまで足伸ばし……",
    "en1": "if I go a little further out",
    "en2": "if I head out that way too"
   }
  ]
 },
 {
  "date": "2026-10-14",
  "source": {
   "videoId": "YKTj06BWfYM",
   "channel": "ゆる言語学ラジオ",
   "title": "【寝落ち用】布団でダラダラ喋るラジオ#339"
  },
  "rows": [
   {
    "ja": "真似しないで欲しいんですけど",
    "line": "もう流れそう。じゃ、真似しないで欲しいんですけど。",
    "en1": "Don't try this at home, though.",
    "en2": "Please don't copy me on this one."
   },
   {
    "ja": "ちょっとこれググってほしい",
    "line": "ごめん、曖昧なんで、ちょっとこれ皆さんググってほしい。",
    "en1": "Don't quote me on that, look it up.",
    "en2": "I'm fuzzy on this, so Google it."
   },
   {
    "ja": "気づいたら〜してました",
    "line": "気づいたらここに踏み入れてました。",
    "en1": "Next thing I knew, I was in there.",
    "en2": "Before I knew it, I'd wandered in."
   },
   {
    "ja": "〜ない限り",
    "line": "境界線を超えない限り、あんま不法侵入にならない。",
    "en1": "as long as you don't cross the line",
    "en2": "unless you actually go over the fence"
   },
   {
    "ja": "気にしなくていいんだな",
    "line": "あんま気にしなくていいんだなって思えるようになった。",
    "en1": "I realized I don't really need to sweat it.",
    "en2": "Now I'm like, eh, it's no big deal."
   },
   {
    "ja": "〜って言った後で",
    "line": "って言った後で、これなんか不法侵入を推奨するやつみたいになるな。",
    "en1": "Wait, now that I've said it out loud...",
    "en2": "Hold on, hearing myself say that..."
   },
   {
    "ja": "てっきり〜と思ったら",
    "line": "僕もうてっきり、裏道があるんですとか言うと思ったら。",
    "en1": "I totally thought you were going to say...",
    "en2": "I was sure you were about to say..."
   },
   {
    "ja": "耳寄り情報",
    "line": "皆さんに耳寄り情報いくつもあるはずなんですよ。",
    "en1": "I've got some good tips for you guys.",
    "en2": "I should have a few hot tips somewhere."
   },
   {
    "ja": "事実上の〜",
    "line": "Amazonギフト券を事実上の銀行として見立てると。",
    "en1": "It's basically a bank.",
    "en2": "For all intents and purposes, it's a bank."
   },
   {
    "ja": "ちょっと面白そう",
    "line": "あ、ちょっと面白そう。どういうこと？",
    "en1": "Ooh, that sounds interesting. What do you mean?",
    "en2": "Okay, I'm listening. How so?"
   },
   {
    "ja": "面白い見方だな",
    "line": "これとかちょっと面白い見方だなって思いましたね。",
    "en1": "That's an interesting way to look at it.",
    "en2": "Never thought of it like that."
   },
   {
    "ja": "〜がち",
    "line": "でもAmazonギフト券使えなくて困りがちですけどね。",
    "en1": "You always end up stuck with them, though.",
    "en2": "Problem is, I can never use them up."
   },
   {
    "ja": "ありがたいことに",
    "line": "ありがたいことに、誕生日イベントとかやるとさ。",
    "en1": "Thankfully, whenever I do a birthday thing...",
    "en2": "I'm lucky, people always..."
   },
   {
    "ja": "そんなあるんだ",
    "line": "残高が18万とかになってさ。そんなあるんだ、すごいな。",
    "en1": "Wait, that much? Damn.",
    "en2": "Seriously? That's a lot."
   },
   {
    "ja": "〜目当て",
    "line": "どうせ私じゃなくて全自動卓目当てなんでしょ。",
    "en1": "You're only here for the table, aren't you?",
    "en2": "It's not me you want, it's the table."
   },
   {
    "ja": "ちやほやされる",
    "line": "全自動卓目当てでちやほやされて。",
    "en1": "everyone's all over me",
    "en2": "people are sucking up to me"
   },
   {
    "ja": "自己肯定感めっちゃ低いやつみたい",
    "line": "悲しい、自己肯定感めっちゃ低いやつみたいなこと言うじゃん。",
    "en1": "That's such a sad, low self-esteem thing to say.",
    "en2": "Man, you sound so insecure."
   },
   {
    "ja": "〜てもしょうがない",
    "line": "単体ではさ、僕の家に行ってもしょうがないけどさ。",
    "en1": "There's no point coming over just for me.",
    "en2": "Nobody's coming over just to see me."
   },
   {
    "ja": "そりゃそうでしょ",
    "line": "そりゃそうでしょ、もちろん。",
    "en1": "Well, obviously.",
    "en2": "Duh, of course."
   },
   {
    "ja": "聞いたことある",
    "line": "ピースをある程度まで指定できるとか。ああ、聞いたことある。",
    "en1": "Oh, I've heard of that.",
    "en2": "Yeah, that rings a bell."
   },
   {
    "ja": "頭に入ってくる",
    "line": "何回も聞くと頭に入ってくるじゃん、響きで。",
    "en1": "It just sticks in your head.",
    "en2": "It sinks in after a while."
   },
   {
    "ja": "どっかで話したかもしんないけど",
    "line": "なんかどっかで話したかもしんないけど。",
    "en1": "I might've told this one before, but...",
    "en2": "Stop me if you've heard this..."
   },
   {
    "ja": "〜てないだろお前",
    "line": "読んでないだろお前、多分だけど。",
    "en1": "You didn't actually read it, did you?",
    "en2": "Be honest, you never read it."
   },
   {
    "ja": "全部忘れました",
    "line": "えっと、だから……全部忘れましたね。",
    "en1": "Yeah, I forgot all of it.",
    "en2": "Nope, it's all gone."
   },
   {
    "ja": "ふざけんなよマジで",
    "line": "全部忘れましたね。ふざけんなよマジで。",
    "en1": "Are you kidding me?",
    "en2": "Come on, seriously?"
   },
   {
    "ja": "驚くほど〜ない",
    "line": "面白かったなってなるんだけどさ、驚くほど何も覚えてない。",
    "en1": "I remember literally nothing.",
    "en2": "It's amazing how little sticks."
   },
   {
    "ja": "一周回って",
    "line": "読み飛ばしていく箇所が30ページあるのってさ、一周回って得してる。",
    "en1": "It's actually a win, if you think about it.",
    "en2": "Weirdly, that works in your favor."
   },
   {
    "ja": "〜と思いがち",
    "line": "読む分減ってるんだから損してると思いがちなんだけど。",
    "en1": "You'd think you're getting ripped off, but...",
    "en2": "Most people would call that a rip-off, but..."
   },
   {
    "ja": "1番コスパいい",
    "line": "そこで読み終わったことにすると1番コスパですよ。",
    "en1": "That's the best bang for your buck.",
    "en2": "Best value, hands down."
   },
   {
    "ja": "それが怖いんだよね",
    "line": "尻上がりに面白くなるケースもあるから。ああ、それが怖いんだよね。",
    "en1": "Yeah, that's what scares me.",
    "en2": "That's the part I'm worried about."
   },
   {
    "ja": "真面目すぎる",
    "line": "読書に真面目すぎる人いっぱいいるからね。",
    "en1": "A lot of people take reading way too seriously.",
    "en2": "People are way too uptight about reading."
   },
   {
    "ja": "聞いていいならですけど",
    "line": "あとさ、あの、聞いていいならですけど。",
    "en1": "If you don't mind me asking...",
    "en2": "If it's okay to ask..."
   },
   {
    "ja": "あんま変わんない",
    "line": "新婚生活どうだろ。でもあんま変わんないんだよな。",
    "en1": "Honestly, not much has changed.",
    "en2": "It's pretty much the same."
   },
   {
    "ja": "〜のめんどくさいなみたいな",
    "line": "なんか引っ越すのめんどくさいなみたいな。",
    "en1": "Moving just feels like such a hassle.",
    "en2": "We can't really be bothered to move."
   }
  ]
 },
 {
  "date": "2026-10-15",
  "source": {
   "videoId": "pBqpJUM7XsA",
   "channel": "真空ジェシカ トーク集【切り抜き&まとめ】",
   "title": "『決め付けの刃』コーナーまとめ #1-20 【真空ジェシカのラジオ父ちゃん】作業用・BGM"
  },
  "rows": [
   {
    "ja": "考えたことなかった",
    "line": "あー、考えたことなかったけど。",
    "en1": "Huh, never thought about that.",
    "en2": "That never crossed my mind."
   },
   {
    "ja": "ごちゃごちゃ言ってる",
    "line": "なんかごちゃごちゃ言ってんな、確かに。",
    "en1": "That's a lot of words for nothing.",
    "en2": "It's saying a whole bunch of nothing."
   },
   {
    "ja": "よく考えると",
    "line": "確かによく考えると知らないし。",
    "en1": "Now that I think about it, I have no idea.",
    "en2": "When you really think about it, who knows?"
   },
   {
    "ja": "〜でいいでしょ別に",
    "line": "おじいちゃんおばあちゃんちでいいでしょ、別に。",
    "en1": "Just say both, it's fine.",
    "en2": "What's wrong with just saying both?"
   },
   {
    "ja": "厳しいな",
    "line": "語彙力だけにとどまらずセンスもない。厳しいな。",
    "en1": "Ouch, harsh.",
    "en2": "Brutal."
   },
   {
    "ja": "あるよね",
    "line": "自分で突っ込むパターン、あるよね。",
    "en1": "Yeah, that's totally a thing.",
    "en2": "Oh, for sure."
   },
   {
    "ja": "〜って睨んでる",
    "line": "ちょっと長いんじゃないかなって俺は睨んでんのよ。",
    "en1": "My bet is it's going to stick around.",
    "en2": "I've got a feeling it'll last."
   },
   {
    "ja": "安心感がある",
    "line": "学園ものになるんだよね。すごい安心感がある。",
    "en1": "It's so comforting.",
    "en2": "It just feels safe."
   },
   {
    "ja": "言った瞬間ミスったと思った",
    "line": "これは言った瞬間ミスったと思った。",
    "en1": "The second I said it, I knew I'd blown it.",
    "en2": "Soon as it came out, I was like, oh no."
   },
   {
    "ja": "悪意あるよね",
    "line": "アブはちょっとあれだけど、悪意あるよね。",
    "en1": "Someone had it out for them.",
    "en2": "That's just mean."
   },
   {
    "ja": "駆け足になってしまいますけれども",
    "line": "最後駆け足。そうね、駆け足になってしまいますけれども。",
    "en1": "Sorry, I'm going to have to rush this last part.",
    "en2": "We're running short, so real quick..."
   },
   {
    "ja": "そんな怒んない",
    "line": "先生もそんな怒んないし。",
    "en1": "The teacher didn't really mind.",
    "en2": "Teachers didn't get that mad."
   },
   {
    "ja": "あるある",
    "line": "仕方わかんないっていう。それもあるある。",
    "en1": "So relatable.",
    "en2": "Been there."
   },
   {
    "ja": "今のお前は俺か",
    "line": "今のお前は俺か、とかに救われてた。",
    "en1": "Are you me?",
    "en2": "That's literally me."
   },
   {
    "ja": "平気で手を出す",
    "line": "テンプレのユーモアに平気で手を出してしまう点を加味すれば。",
    "en1": "going for the cheap joke without a second thought",
    "en2": "reaching for the lazy joke without blinking"
   },
   {
    "ja": "一種の答え",
    "line": "これでもまあ一種の答えだよな。",
    "en1": "I mean, that's one way to answer it.",
    "en2": "That's kind of an answer, I guess."
   },
   {
    "ja": "なんて返したらいいのか",
    "line": "2つの意味で終わったみたいな。なんて返したらいいのかって。",
    "en1": "What am I supposed to say to that?",
    "en2": "How do you even respond to that?"
   },
   {
    "ja": "ふざけないでほしい",
    "line": "イルカの鼻の位置の呼吸。ふざけないでほしい。",
    "en1": "Quit messing around.",
    "en2": "Give me a break."
   },
   {
    "ja": "そんな怒ることじゃない",
    "line": "そんな怒ることじゃないよ。",
    "en1": "It's not worth getting mad about.",
    "en2": "Relax, it's not a big deal."
   },
   {
    "ja": "〜って言われたら終わる",
    "line": "もうちょっとゆっくりで大丈夫です。うんって言われたら終わるから言えない。",
    "en1": "If he just grunts at me, I'm done.",
    "en2": "One cold 'yeah' and it's over for me."
   },
   {
    "ja": "他でもない",
    "line": "皆様にお集まりいただいたのは、他でもない。",
    "en1": "The reason I've gathered you all here is...",
    "en2": "I'll get right to it."
   },
   {
    "ja": "〜の表れ",
    "line": "珍しい部位をたくさん置いている焼肉屋。自信のなさの表れ。",
    "en1": "That's just insecurity talking.",
    "en2": "It's a sign they're not confident."
   },
   {
    "ja": "いいよなお前は気楽で",
    "line": "いいよなお前は気楽で、と言われた犬。",
    "en1": "Must be nice.",
    "en2": "Lucky you, not a care in the world."
   },
   {
    "ja": "俺強えみたいになる",
    "line": "その時間はさ、すぐ返せる俺強えみたいになるよな。",
    "en1": "I feel like a total boss.",
    "en2": "I'm like, look at me go."
   },
   {
    "ja": "本当にあんのかね",
    "line": "いらっしゃ……何よ。本当にあんのかねこれって。",
    "en1": "Does that ever actually happen?",
    "en2": "Is that even real?"
   },
   {
    "ja": "本当にわかる",
    "line": "一瞬知ってる体育館に見える。わかるな、本当にわかる。",
    "en1": "Oh, I totally get that.",
    "en2": "So true, man."
   },
   {
    "ja": "その割には",
    "line": "その割には結構ごちゃごちゃ言ってた。",
    "en1": "For that, he sure said a lot.",
    "en2": "Kind of a lot of talking for that, though."
   },
   {
    "ja": "〜てんのそっちじゃん",
    "line": "考えさせてんのそっちじゃんっていうね。",
    "en1": "You're the one making it complicated.",
    "en2": "You're the one making me think about it."
   },
   {
    "ja": "気をつけた方がいいよマジで",
    "line": "言葉遣いとかはマジで気をつけた方がいいよ。マジで真似するから。",
    "en1": "You really have to watch your mouth.",
    "en2": "Seriously, be careful what you say."
   },
   {
    "ja": "もう分かった、伝わってる",
    "line": "いいよもう分かった、伝わってるよ。",
    "en1": "Okay, okay, I get it.",
    "en2": "Got it, message received."
   },
   {
    "ja": "ピンと来てない",
    "line": "もうピンと来てない。大丈夫、次行きましょう。",
    "en1": "It's not landing.",
    "en2": "They're not getting it."
   },
   {
    "ja": "舐めてんのか",
    "line": "ウインナーの袋を開封して中身を見た時。舐めてんのかって思う。",
    "en1": "Are you messing with me?",
    "en2": "Is this some kind of joke?"
   },
   {
    "ja": "箔がつく",
    "line": "泣かせることで箔がつくと思っている。",
    "en1": "They think it'll look good on the resume.",
    "en2": "It gives them some street cred."
   },
   {
    "ja": "〜はまあ置いといて",
    "line": "ジャングルはまあ置いといてさ。ジム、ジム。",
    "en1": "Forget the jungle part for a sec.",
    "en2": "Okay, set aside the jungle thing."
   },
   {
    "ja": "何を見せられているんだ",
    "line": "誰よりも楽しんでいる配信視聴者。何を見せられているんだ。",
    "en1": "What am I even watching?",
    "en2": "What is this I'm looking at?"
   }
  ]
 },
 {
  "date": "2026-10-16",
  "source": {
   "videoId": "UOsbixUh9m0",
   "channel": "archives",
   "title": "定時配信　ねぇ聞いて - 石川典行のノリユキラジオ"
  },
  "rows": [
   {
    "ja": "何があったんや",
    "line": "お姉ちゃんが炎上してると思って。何があったんや、みたいな。",
    "en1": "I was like, what the hell happened?",
    "en2": "Like, what's going on?"
   },
   {
    "ja": "平気で嘘つく",
    "line": "ああいうゲームやってるやつ、平気で嘘つくな。",
    "en1": "They'll lie straight to your face.",
    "en2": "They lie without even blinking."
   },
   {
    "ja": "上手にやっとんだな",
    "line": "フェイクがね、上手にやっとんだなっていうところで。",
    "en1": "They're pretty slick about it.",
    "en2": "They really pulled it off."
   },
   {
    "ja": "頑張っても",
    "line": "俺とかだと、Twitchだと頑張っても2000人ぐらいですから。",
    "en1": "Even on a good day, I get like two thousand.",
    "en2": "Best case, maybe two thousand."
   },
   {
    "ja": "なんか怪しいなと思って",
    "line": "超人多いなと思って、なんか怪しいなと思って。",
    "en1": "Something seemed off.",
    "en2": "I was like, that's fishy."
   },
   {
    "ja": "それはうち来るわ",
    "line": "かなりしょぼかったですもん。それはうち来るわと思って。",
    "en1": "No wonder they're coming to me.",
    "en2": "Well, that explains it."
   },
   {
    "ja": "上げ下げすごい",
    "line": "ツイキャスの夜中って、結構上げ下げすごいよな。",
    "en1": "It's so hit or miss.",
    "en2": "It's all over the place."
   },
   {
    "ja": "〜というか〜というか",
    "line": "だから何だろうな、癒しというか暇つぶしというか。",
    "en1": "Kind of comforting, kind of just killing time.",
    "en2": "Half chilling, half just passing the time."
   },
   {
    "ja": "つけっぱなしにする",
    "line": "タバコ吸いながら、つけっぱなしにしながらみたいな感じで。",
    "en1": "just leaving it running in the background",
    "en2": "keeping it on in the background"
   },
   {
    "ja": "寂しい人が多いんだろうね",
    "line": "やっぱ寂しい人が多いんだろうね、深夜で。",
    "en1": "I guess a lot of people are lonely.",
    "en2": "Lots of lonely people out there, I bet."
   },
   {
    "ja": "意味分からん",
    "line": "そんなこと言ったら刺されるからな。意味分からん。",
    "en1": "Makes no sense.",
    "en2": "What even is that?"
   },
   {
    "ja": "〜のにお前〜かい",
    "line": "俺起きてんのにお前寝るんかい、みたいな。",
    "en1": "I'm still up and you're going to sleep?",
    "en2": "You're bailing on me while I'm still going?"
   },
   {
    "ja": "恥ずかしいんだよね",
    "line": "恥ずかしいんだよね、俺Twitchで初見来られるの。",
    "en1": "It's kind of embarrassing, honestly.",
    "en2": "I get a little self-conscious about it."
   },
   {
    "ja": "こそっと見てみて",
    "line": "深夜2時ぐらい、暇だったらこそっと見てみて。",
    "en1": "Sneak in and check it out if you're bored.",
    "en2": "Just lurk if you've got nothing to do."
   },
   {
    "ja": "最悪だった",
    "line": "昨日とか最悪だったからね。",
    "en1": "Last night was a disaster.",
    "en2": "Yesterday was the worst."
   },
   {
    "ja": "急に〜たくなった",
    "line": "深夜の1時か2時ぐらいに急にゲームやりたくなった。",
    "en1": "I suddenly got the itch to play.",
    "en2": "Out of nowhere, I wanted to game."
   },
   {
    "ja": "どうしようかなみたいな",
    "line": "しゃべることもしゃべって、どうしようかなみたいな。",
    "en1": "I was like, okay, now what?",
    "en2": "I didn't know what to do next."
   },
   {
    "ja": "定期的に〜たくなる",
    "line": "1年に1回とか2年に1回とか、定期的にやりたくなって。",
    "en1": "Every so often I get the urge to play it again.",
    "en2": "It pulls me back in every year or two."
   },
   {
    "ja": "やめとけ",
    "line": "リスナーがクソゲーだからやめとけと。",
    "en1": "Don't do it, man.",
    "en2": "Trust me, skip it."
   },
   {
    "ja": "知ってるよ俺は",
    "line": "そういや知ってるよ俺はって。でも俺はこのゲームが好きなんだ。",
    "en1": "Yeah, I know, I know.",
    "en2": "I'm well aware."
   },
   {
    "ja": "いざ〜ようかなと思ったら",
    "line": "コンビニ行ってお金も払って、いざ始めようかなと思ったら。",
    "en1": "Just when I was about to start...",
    "en2": "The second I went to start it..."
   },
   {
    "ja": "えっと思うじゃん",
    "line": "6割しか出来上がってないんです。えっと思うじゃん。",
    "en1": "You'd be like, wait, what?",
    "en2": "Right? You're like, hold on."
   },
   {
    "ja": "〜だっただけに",
    "line": "15が15だっただけにね。今度こそと。",
    "en1": "After how bad 15 was...",
    "en2": "Considering what happened with 15..."
   },
   {
    "ja": "今度こそ",
    "line": "15が15だっただけにね。そう、今度こそと。",
    "en1": "This time for sure.",
    "en2": "They'd better nail it this time."
   },
   {
    "ja": "言い切ってます",
    "line": "楽しめるようなFF16を作ってますと。もう言い切ってますから。",
    "en1": "They're saying it flat out.",
    "en2": "They've gone all in on that."
   },
   {
    "ja": "怖いぐらい文句なし",
    "line": "今のところ文句なし。もう怖い怖いぐらい文句なしです。",
    "en1": "It's almost scary how good it is.",
    "en2": "Honestly, zero complaints. It's kind of scary."
   },
   {
    "ja": "間違いない",
    "line": "間違いない作品だと思います。",
    "en1": "It's a sure thing.",
    "en2": "You can't go wrong with it."
   },
   {
    "ja": "妥協しなかった",
    "line": "そんだけ強気だし、妥協しなかったってことよ。",
    "en1": "They didn't cut any corners.",
    "en2": "They didn't settle for less."
   },
   {
    "ja": "待ちに待った",
    "line": "ナンバリング最新作、待ちに待った作品ですよ。",
    "en1": "It's been a long time coming.",
    "en2": "We've been waiting forever for this."
   },
   {
    "ja": "どうなってんだ",
    "line": "おい、ドラクエ12どうなってんだ。",
    "en1": "Hey, what's the deal with Dragon Quest 12?",
    "en2": "Seriously, where is it?"
   },
   {
    "ja": "ワクワクしてしょうがない",
    "line": "もう俺ワクワクしてしょうがないもん。絶対やるもんね。",
    "en1": "I'm so hyped.",
    "en2": "I can't wait, man."
   },
   {
    "ja": "死ぬほど煽った",
    "line": "13時間ぐらいで、レインくん死ぬほど煽ったもん。",
    "en1": "I trash-talked him like crazy.",
    "en2": "I roasted him nonstop."
   },
   {
    "ja": "俺でよければ",
    "line": "まあまあまあまあ、俺でよければ開封しますけど。",
    "en1": "Sure, if you're okay with me doing it.",
    "en2": "I'll open it if you want me to."
   },
   {
    "ja": "贅沢だね",
    "line": "2つ相談がありますね。贅沢だね、1個じゃないの。",
    "en1": "Two? Look at you.",
    "en2": "Two whole questions? Greedy."
   }
  ]
 },
 {
  "date": "2026-10-17",
  "source": {
   "videoId": "kKepzXhJ9no",
   "channel": "あののオールナイトニッポン",
   "title": "【神回・深夜トーク】あののオールナイトニッポン0｜真空ジェシカ・ガクでカオス爆笑トーク全開SP｜2026.04.24"
  },
  "rows": [
   {
    "ja": "ちゃんと喋る",
    "line": "ちゃんと喋る場所で会うのは初めてです。",
    "en1": "This is the first time we've actually sat down and talked.",
    "en2": "We've never had a real conversation."
   },
   {
    "ja": "世界が期待していません",
    "line": "ちゃんと喋るとこをね、世界が期待していません。",
    "en1": "Nobody's expecting that.",
    "en2": "Literally no one's asking for that."
   },
   {
    "ja": "そもそも",
    "line": "そんな人をラジオにそもそも呼んじゃいけない。",
    "en1": "You shouldn't have him on in the first place.",
    "en2": "Why would you even book him?"
   },
   {
    "ja": "どういう状況",
    "line": "熱の中にいるってどういう状況なのでしょう？",
    "en1": "What does that even mean?",
    "en2": "What kind of situation is that?"
   },
   {
    "ja": "ばっくれた",
    "line": "もうばっくれた？何？逃げた？",
    "en1": "Did he just bail?",
    "en2": "He ditched us?"
   },
   {
    "ja": "意味が分からない",
    "line": "熱の中にあるね、北さんはもう意味が分からないんですけど。",
    "en1": "None of this makes sense.",
    "en2": "I have no idea what's going on."
   },
   {
    "ja": "〜可能性もある",
    "line": "ちゃんと喋るかどうかみたいなふりしたから、切れた可能性もある。",
    "en1": "He might've gotten mad about it.",
    "en2": "Maybe that ticked him off."
   },
   {
    "ja": "好きにすればいい",
    "line": "額は別に好きにすればいい。",
    "en1": "Do whatever you want.",
    "en2": "Suit yourself."
   },
   {
    "ja": "大した度胸だよ",
    "line": "大した度胸だよ。1時間もう持たないよ。",
    "en1": "That takes guts.",
    "en2": "You've got some nerve."
   },
   {
    "ja": "もたない",
    "line": "1時間もう持たないよ。",
    "en1": "I'm not going to last an hour.",
    "en2": "I'd crack within the hour."
   },
   {
    "ja": "めちゃくちゃ気まずい",
    "line": "むちゃくちゃ気まずい3年間を過ごして。",
    "en1": "three super awkward years",
    "en2": "three years of pure awkwardness"
   },
   {
    "ja": "〜でやめちゃった",
    "line": "高校デビュー3ヶ月でやめちゃったけど。",
    "en1": "I gave up after three months.",
    "en2": "Only lasted three months."
   },
   {
    "ja": "ようやく共通点",
    "line": "ようやく共通点が。1人でお笑いの動画とかずっと見て。",
    "en1": "Finally, something in common.",
    "en2": "Okay, now we've got something."
   },
   {
    "ja": "興味ねえだろ",
    "line": "最初興味ねえだろ。おい。",
    "en1": "You don't even care, do you?",
    "en2": "You're not interested at all."
   },
   {
    "ja": "めっちゃ真面目",
    "line": "無限大ホールに1人で行ったりとか。真面目、めっちゃ真面目。",
    "en1": "Wow, you're so dedicated.",
    "en2": "That's seriously diligent."
   },
   {
    "ja": "逆に",
    "line": "受けるんだったら、すげえかっこいいかも、逆に。",
    "en1": "Actually, that might be kind of cool.",
    "en2": "Weirdly, that'd be pretty cool."
   },
   {
    "ja": "もう怖いよ",
    "line": "3秒後ぐらいに……怖い、もう怖いよ。",
    "en1": "That's creepy.",
    "en2": "Okay, that's freaking me out."
   },
   {
    "ja": "素晴らしい回",
    "line": "手紙を元気で言ってくれて、もう素晴らしい回でした。",
    "en1": "That was a great episode.",
    "en2": "What a show."
   },
   {
    "ja": "なんだあの時間",
    "line": "後半チャットGPTの中、なんだあの時間。",
    "en1": "What even was that?",
    "en2": "What was that whole stretch?"
   },
   {
    "ja": "1番やだわ",
    "line": "僕無理だよ。1番やだわ。",
    "en1": "That's the worst.",
    "en2": "Anything but that."
   },
   {
    "ja": "できる自信がありません",
    "line": "北さんとなんてできる自信がありません、僕は。",
    "en1": "I don't think I can pull that off.",
    "en2": "No way I can handle that."
   },
   {
    "ja": "わからないけどとりあえず",
    "line": "なんでこの料金なのかわからないけど、とりあえず払ってる。",
    "en1": "No idea why, but I just pay it.",
    "en2": "I don't get it, but whatever, I pay it."
   },
   {
    "ja": "仕組みが分からない",
    "line": "全くわかんないよね。仕組みが分からないよね。",
    "en1": "I have no clue how it works.",
    "en2": "The whole thing's a mystery to me."
   },
   {
    "ja": "〜かなって迷って",
    "line": "僕は聞こうかなって迷って。",
    "en1": "I was going back and forth on asking.",
    "en2": "I wasn't sure whether to ask."
   },
   {
    "ja": "〜って言ってほしい",
    "line": "上向いてくださいとかって言ってほしい。",
    "en1": "Just say 'face up.'",
    "en2": "Just tell me to lie on my back."
   },
   {
    "ja": "マジでわかる",
    "line": "これさ、マジでわかる。",
    "en1": "Oh man, I totally get that.",
    "en2": "So relatable."
   },
   {
    "ja": "ちょうどいいのむずい",
    "line": "ヒントの案配むずくない？ちょうどいいのむずい。",
    "en1": "It's hard to get it just right.",
    "en2": "Finding the sweet spot is tough."
   },
   {
    "ja": "貯めて貯めて",
    "line": "貯めて貯めて悩んでもらって、最後大ヒントとして出すのか。",
    "en1": "hold off and let them sweat",
    "en2": "drag it out till the very end"
   },
   {
    "ja": "はってなっちゃう",
    "line": "直で言われたら、なんか、はってなっちゃうかも。",
    "en1": "I'd probably be like, excuse me?",
    "en2": "I'd get a little defensive, honestly."
   },
   {
    "ja": "もういいしみたいな",
    "line": "なんかもういいしみたいな。",
    "en1": "Like, fine, forget it.",
    "en2": "Whatever, I'm out."
   },
   {
    "ja": "普通に考えて",
    "line": "え、なんでエビの話した？普通に考えて。",
    "en1": "Think about it.",
    "en2": "Come on, use your head."
   },
   {
    "ja": "普通に振られた",
    "line": "付き合ってくださいって送って、普通に振られた。",
    "en1": "and just straight-up got rejected",
    "en2": "and got turned down, obviously"
   },
   {
    "ja": "出し切る",
    "line": "この2週間の練習を100%出し切って。",
    "en1": "leave it all out there",
    "en2": "give it everything I've got"
   },
   {
    "ja": "不安で不安で",
    "line": "僕もう不安で不安でしたけど、もうデビューだ。",
    "en1": "I was a nervous wreck.",
    "en2": "I was freaking out."
   }
  ]
 },
 {
  "date": "2026-10-18",
  "source": {
   "videoId": "8QxMST8isMs",
   "channel": "三人称　雑談まとめ",
   "title": "【3人が主役】三人称雑談　作業用　三人称切り抜き＃2"
  },
  "rows": [
   {
    "ja": "気持ち悪くなっちゃう",
    "line": "ちょっと目の前真っ暗になるし……気持ち悪くなっちゃう。",
    "en1": "It makes me feel sick.",
    "en2": "I'd get all queasy."
   },
   {
    "ja": "〜損",
    "line": "罰としてやったなぁ。蹴られ損だからさ。",
    "en1": "He just took that kick for nothing.",
    "en2": "That's a free shot, and he gets nothing for it."
   },
   {
    "ja": "すごい満足だった",
    "line": "KOも見れたしね。本当にすごい満足だったなぁ。",
    "en1": "I was totally satisfied.",
    "en2": "Honestly, it was so worth it."
   },
   {
    "ja": "結構興奮しちゃった",
    "line": "結構興奮しちゃったんだな。",
    "en1": "I got pretty fired up.",
    "en2": "I got way more into it than I expected."
   },
   {
    "ja": "できれば〜がいいな",
    "line": "ちょっとできれば日本語がいいなーっていう。",
    "en1": "I'd rather have it in Japanese if I could.",
    "en2": "Ideally, it'd be in Japanese."
   },
   {
    "ja": "悔しい思いした人",
    "line": "悔しい思いした人いっぱいいるんじゃないかなぁ。",
    "en1": "I bet a lot of people were bummed.",
    "en2": "Tons of people must've been gutted."
   },
   {
    "ja": "思った以上に",
    "line": "思った以上にさ、その客の人が声出してるね。",
    "en1": "The crowd was way louder than I expected.",
    "en2": "People were yelling a lot more than I thought."
   },
   {
    "ja": "〜しか言わない",
    "line": "もう左ハイキックしか言わない人がいて。",
    "en1": "All he'd yell was 'left high kick.'",
    "en2": "The guy just kept yelling the same thing."
   },
   {
    "ja": "良いのか悪いのか",
    "line": "初めてだからわからなかったけど、良いのか悪いのか。",
    "en1": "Not sure if that's a good thing or not.",
    "en2": "Good or bad, I couldn't tell you."
   },
   {
    "ja": "〜からこそ",
    "line": "やっぱその選手を知ってるからこそなのか。",
    "en1": "Maybe it's because he knows the guy.",
    "en2": "Probably because he's a fan."
   },
   {
    "ja": "絶対聞こえてる",
    "line": "ヤジで絶対聞こえてるね、あんなに。",
    "en1": "They can definitely hear that.",
    "en2": "No way they can't hear it."
   },
   {
    "ja": "テレビで見てるとわかんないけど",
    "line": "テレビで見てるとわかんないけど、観客の声ってわりと聞こえる。",
    "en1": "You don't get that watching on TV.",
    "en2": "TV doesn't really show you that."
   },
   {
    "ja": "絶対伝わらない",
    "line": "あれは多分テレビ見てたら絶対伝わらない。",
    "en1": "That totally doesn't come across on TV.",
    "en2": "You'd never get that from TV."
   },
   {
    "ja": "〜ときゃよかった",
    "line": "もう1回ぐらい行っときゃよかったなと思った。",
    "en1": "I should've gone at least once more.",
    "en2": "Wish I'd gone one more time."
   },
   {
    "ja": "もったいないことした",
    "line": "ほんと見ておきたかった。もったいないことした。",
    "en1": "I really missed out.",
    "en2": "What a waste."
   },
   {
    "ja": "惜しかった",
    "line": "惜しかったな。そうだね。",
    "en1": "That's a real shame.",
    "en2": "Man, so close."
   },
   {
    "ja": "もう忘れちゃった",
    "line": "何て名前だかもう忘れちゃった。",
    "en1": "I forgot what it was called.",
    "en2": "The name totally slipped my mind."
   },
   {
    "ja": "なかなかない機会",
    "line": "ほんといい、なかなかない機会というか。",
    "en1": "It's not something you get to do every day.",
    "en2": "It's a pretty rare chance."
   },
   {
    "ja": "機会があったら",
    "line": "また機会があったらね。",
    "en1": "If I ever get the chance again.",
    "en2": "Next time I get a shot."
   },
   {
    "ja": "〜ていただけたら幸いです",
    "line": "24歳の時夢などありましたか。答えていただけたら幸いです。",
    "en1": "I'd really appreciate it if you answered.",
    "en2": "It'd mean a lot if you could answer."
   },
   {
    "ja": "どうにかなんじゃねーの",
    "line": "もしかしたら俺どうにかなんじゃねーのっていう。",
    "en1": "Maybe it'll all work out somehow.",
    "en2": "I'll figure it out, probably."
   },
   {
    "ja": "淡い期待",
    "line": "どうにかなんじゃねーのっていう淡い期待を感じている時。",
    "en1": "a little glimmer of hope",
    "en2": "kind of hoping, you know"
   },
   {
    "ja": "クソみてえな生活",
    "line": "ちょっとクソみてえな生活してるけど。",
    "en1": "My life's kind of a mess, but...",
    "en2": "I'm living like crap right now, but..."
   },
   {
    "ja": "考える余裕もない",
    "line": "大学行って就職とかだと、まあまあ考える余裕もない。",
    "en1": "no time to even think about it",
    "en2": "too busy to even think"
   },
   {
    "ja": "〜じゃなくていいんじゃない",
    "line": "何かになりたいとかじゃなくていいんじゃないかと思う。",
    "en1": "It doesn't have to be some big thing.",
    "en2": "You don't need to become something."
   },
   {
    "ja": "〜でもいいじゃん",
    "line": "なんか海外行きたいとかでもいいじゃんと思う。",
    "en1": "Even just 'I want to travel' is fine.",
    "en2": "Why not just, like, going abroad?"
   },
   {
    "ja": "消去法",
    "line": "なるほど、消去法だよね。",
    "en1": "Just cross off what you don't want.",
    "en2": "Process of elimination, basically."
   },
   {
    "ja": "結構かかりそう",
    "line": "なるほどね。うん、結構かかりそうだけどね。",
    "en1": "That might take a while, though.",
    "en2": "Could take forever."
   },
   {
    "ja": "全然いいんじゃねえかな",
    "line": "職業としての夢じゃなくて全然いいんじゃねえかなと思う。",
    "en1": "That's totally fine.",
    "en2": "Nothing wrong with that."
   },
   {
    "ja": "でっかく聞こえちゃう",
    "line": "夢っていうとちょっとでっかく聞こえちゃうから。",
    "en1": "'Dream' just sounds so huge.",
    "en2": "It makes it sound like such a big deal."
   },
   {
    "ja": "焦りだす",
    "line": "周りが結構熱心に働き出して……焦りだすんだよね。",
    "en1": "You start to panic.",
    "en2": "You start freaking out a little."
   },
   {
    "ja": "気持ちはわかります",
    "line": "まあ気持ちはわかりますけども。",
    "en1": "I get how you feel.",
    "en2": "I know where you're coming from."
   },
   {
    "ja": "しょうがない",
    "line": "だからまあしょうがないって。",
    "en1": "Oh well, it is what it is.",
    "en2": "Can't be helped."
   },
   {
    "ja": "生かしておく",
    "line": "ちょっと蜘蛛は生かしておいている。",
    "en1": "I'm letting them live.",
    "en2": "I just leave them alone."
   }
  ]
 },
 {
  "date": "2026-10-19",
  "source": {
   "videoId": "6cqNj9V1NhI",
   "channel": "AKINAI",
   "title": "【アラフィフ女子トーク】過激すぎる女子会トーク‼️(笑)"
  },
  "rows": [
   {
    "ja": "こっちから誘っちゃう",
    "line": "ご飯食べに行きましょう、こっちから誘っちゃうよね。",
    "en1": "I'd just ask them out myself.",
    "en2": "I'd make the first move."
   },
   {
    "ja": "全然変わってるでしょ",
    "line": "10年目でも全然変わってるでしょ。",
    "en1": "Everything's totally different now, right?",
    "en2": "It's a whole different world now."
   },
   {
    "ja": "ないとやっぱり寂しい",
    "line": "ないとやっぱり寂しい。",
    "en1": "It's kind of lonely without it.",
    "en2": "I'd miss it, honestly."
   },
   {
    "ja": "〜っていう意味がよくわかった",
    "line": "掘り起こし作業っていう意味がよくわかった。",
    "en1": "Oh, now I get what you meant.",
    "en2": "Okay, that makes total sense now."
   },
   {
    "ja": "急に連絡してくる",
    "line": "10年ぶりぐらいの人が自粛中、急に連絡してくる。",
    "en1": "They just hit you up out of nowhere.",
    "en2": "People randomly reach out."
   },
   {
    "ja": "これこそあるある",
    "line": "急に連絡してくる。これこそあるある。",
    "en1": "That's so relatable.",
    "en2": "Classic. Happens every time."
   },
   {
    "ja": "付き合ってないでしょ",
    "line": "なるほど、付き合ってないでしょ。",
    "en1": "You guys never actually dated, right?",
    "en2": "You weren't even together."
   },
   {
    "ja": "それ俺じゃないよ",
    "line": "喋ってるだけだったら、それ俺じゃないよ。",
    "en1": "That wasn't me.",
    "en2": "You've got the wrong guy."
   },
   {
    "ja": "違ったっけみたいな",
    "line": "それ俺じゃないよ、違ったっけみたいな。",
    "en1": "Like, wait, was that not you?",
    "en2": "Like, did I get that wrong?"
   },
   {
    "ja": "帰るときには他人",
    "line": "もう帰るときには他人。",
    "en1": "By the time we left, we were strangers again.",
    "en2": "We were basically strangers by the end."
   },
   {
    "ja": "会う前まで盛り上がる",
    "line": "会う前まで盛り上がるよね。",
    "en1": "You get all hyped up before you meet.",
    "en2": "The buildup's always the best part."
   },
   {
    "ja": "がっかりじゃないけど",
    "line": "がっかりじゃないけど、あれこんな感じだっけな。",
    "en1": "I wasn't disappointed exactly, but...",
    "en2": "I wouldn't say let down, but..."
   },
   {
    "ja": "こんな感じだっけ",
    "line": "あれ、こんな感じだっけな。",
    "en1": "Huh, was it always like this?",
    "en2": "Was it like this before?"
   },
   {
    "ja": "話も弾まない",
    "line": "こんな感じだっけな、話も弾まない。",
    "en1": "The conversation just wasn't flowing.",
    "en2": "We had nothing to talk about."
   },
   {
    "ja": "変わってない気がする",
    "line": "変わってない気がすんだ。そんな変わってないと思う。",
    "en1": "Feels like nothing's changed.",
    "en2": "I don't think they've changed a bit."
   },
   {
    "ja": "いやいやびっくりする",
    "line": "いやいや、びっくりする。そんな真面目じゃなかったから。",
    "en1": "No way, that's wild.",
    "en2": "I was shocked, honestly."
   },
   {
    "ja": "どうしたのみたいな",
    "line": "ねぇ、どうしたのみたいな。",
    "en1": "Like, what happened to you?",
    "en2": "Like, who even are you now?"
   },
   {
    "ja": "どんどん言っちゃうよ",
    "line": "あー、どんどん言っちゃうよ。やばいよ。",
    "en1": "I'm just going to keep spilling everything.",
    "en2": "I'm on a roll here."
   },
   {
    "ja": "恨まれたりしたら嫌だよね",
    "line": "それ恨まれたり嫌だよね。",
    "en1": "I'd hate for anyone to hold a grudge.",
    "en2": "I don't want it coming back on me."
   },
   {
    "ja": "〜はわかるんだけど",
    "line": "婚活だか恋活はわかるんだけど。",
    "en1": "I get the dating thing, but...",
    "en2": "Okay, dating, sure, but..."
   },
   {
    "ja": "傷ついて帰ってくる",
    "line": "昔ごまかして参加してて、傷ついて帰ってくる。",
    "en1": "You come home all bruised.",
    "en2": "You walk away hurt."
   },
   {
    "ja": "気まずすぎてどうしようかと思った",
    "line": "超気まずすぎて、どうしようかと思った。",
    "en1": "It was so awkward, I didn't know what to do.",
    "en2": "I was like, what do I even do here?"
   },
   {
    "ja": "こんな時間に呼び出される",
    "line": "こんな時間に呼び出されちゃって。",
    "en1": "Who calls someone out at this hour?",
    "en2": "Dragged out this late at night."
   },
   {
    "ja": "まさかな",
    "line": "まさかな、そんな人だと思ってないんだろうなぁ。",
    "en1": "No way.",
    "en2": "Nah, couldn't be."
   },
   {
    "ja": "そんな人だと思ってない",
    "line": "まさかな、そんな人だと思ってないんだろうなぁ。",
    "en1": "Nobody thinks you're that kind of person.",
    "en2": "They'd never guess you're like that."
   },
   {
    "ja": "〜って言ってるだけでしょ",
    "line": "練習みたいに言ってるだけでしょ。",
    "en1": "You're just saying that.",
    "en2": "That's just talk."
   },
   {
    "ja": "おかしくないよね",
    "line": "そこまでするよねって言って、おかしくないよね。",
    "en1": "That's not weird, right?",
    "en2": "Nothing wrong with that."
   },
   {
    "ja": "負けないわよね",
    "line": "おばあさんたち集めるとみんなギラギラで負けないわよね。",
    "en1": "Nobody's backing down.",
    "en2": "They're not letting anyone win."
   },
   {
    "ja": "一昔前",
    "line": "全部一昔前なんですよね。",
    "en1": "It's all kind of old-school.",
    "en2": "That's all so ten years ago."
   },
   {
    "ja": "急に喋れない",
    "line": "イケメンとかだと急に喋れないんですよ。",
    "en1": "I just freeze up.",
    "en2": "Suddenly I can't talk."
   },
   {
    "ja": "名前が出てこない",
    "line": "記憶も曖昧だったり、名前が出てこない。",
    "en1": "The name's on the tip of my tongue.",
    "en2": "I can't think of the name."
   },
   {
    "ja": "あれあれなんだっけ",
    "line": "アレアレ、なんだっけなんだっけ、あれだよあれ。",
    "en1": "What's it called, that thing...",
    "en2": "Ugh, what's the word?"
   },
   {
    "ja": "あれで通じる",
    "line": "あれで通じるんだよね。",
    "en1": "You just say 'that thing' and they get it.",
    "en2": "We totally understand each other with 'that thing.'"
   },
   {
    "ja": "年をとるって素晴らしい",
    "line": "年をとるって素晴らしいね。",
    "en1": "Getting old is great, huh.",
    "en2": "Aging's a beautiful thing."
   },
   {
    "ja": "ときめきとか無理なんだろうね",
    "line": "もうね、ときめきとか無理なんだろうね。",
    "en1": "I'm probably past the butterflies stage.",
    "en2": "I don't think I can get butterflies anymore."
   }
  ]
 },
 {
  "date": "2026-10-20",
  "source": {
   "videoId": "9361Rg30E1U",
   "channel": "Tuuan",
   "title": "バカリズム すべらない話 フリートークまとめ【作業用・睡眠用・ドライブ・聞き流し】（概要欄タイムスタンプ有り）"
  },
  "rows": [
   {
    "ja": "バレるバレる",
    "line": "結果的に5分遅刻し、バレるバレる。",
    "en1": "We're so busted.",
    "en2": "They're totally going to find out."
   },
   {
    "ja": "〜されたらあかん",
    "line": "電話されたらあかんもん。",
    "en1": "Can't have them calling.",
    "en2": "If they call, I'm done."
   },
   {
    "ja": "今夜が峠です",
    "line": "もうお医者さんも今夜が峠ですみたいな。",
    "en1": "He might not make it through the night.",
    "en2": "Tonight's the big one."
   },
   {
    "ja": "いよいよです",
    "line": "もういよいよですっていうことになって。",
    "en1": "This is it.",
    "en2": "It's time."
   },
   {
    "ja": "心配しながらも",
    "line": "で、ま、心配しながらも寝たんですね。",
    "en1": "I was still worried, but I went to bed.",
    "en2": "Worried sick, but I crashed anyway."
   },
   {
    "ja": "これっきり",
    "line": "こんなことも、もうこれっきりなんですけど。",
    "en1": "That was the only time ever.",
    "en2": "Never happened again."
   },
   {
    "ja": "夢枕に立つ",
    "line": "要は夢枕におじいちゃんが立ったんですよ。",
    "en1": "Grandpa came to me in a dream.",
    "en2": "He showed up in my dream."
   },
   {
    "ja": "約束はできないですけど",
    "line": "ちょっともう約束はできないですけど。",
    "en1": "I can't promise anything.",
    "en2": "No guarantees, though."
   },
   {
    "ja": "やるだけやってみましょう",
    "line": "約束はできないですけど、やるだけやってみましょう。",
    "en1": "Let's give it our best shot.",
    "en2": "We'll see what we can do."
   },
   {
    "ja": "それやばいですね",
    "line": "8時なんですよ。あ、それやばいですね。",
    "en1": "Oof, that's cutting it close.",
    "en2": "Ooh, that's tight."
   },
   {
    "ja": "とにかく",
    "line": "とにかく1年はとにかく声を出せと。",
    "en1": "Whatever you do, just be loud.",
    "en2": "Just make noise. That's it."
   },
   {
    "ja": "〜って言っても",
    "line": "ただ声を出すって言っても、野球部の出し方があると。",
    "en1": "It's not just yelling, though.",
    "en2": "There's yelling, and then there's yelling."
   },
   {
    "ja": "全く同じだった",
    "line": "直した後が7秒42だったんですよ。全く同じだったんです。",
    "en1": "Exact same time.",
    "en2": "Not a hundredth faster."
   },
   {
    "ja": "普通に",
    "line": "普通にAmazonで送料が別で350円なんですよ。",
    "en1": "It's just casually sitting there on Amazon.",
    "en2": "Totally normal listing, like it's nothing."
   },
   {
    "ja": "〜じゃないですか",
    "line": "毎回ホームルームにいてくださるじゃないですか。",
    "en1": "You know how you're always at homeroom?",
    "en2": "You're always there for homeroom, right?"
   },
   {
    "ja": "ありがたいことなんですけども",
    "line": "いや、それはありがたいことなんですけども。",
    "en1": "I appreciate it, don't get me wrong, but...",
    "en2": "Which is great and all, but..."
   },
   {
    "ja": "ダメじゃないんですけども",
    "line": "いや、あの、ダメじゃないんですけども。",
    "en1": "Not that it's a problem, but...",
    "en2": "It's not bad or anything, but..."
   },
   {
    "ja": "ちょっと多いですね",
    "line": "ちょっと多いですね。頻度が。",
    "en1": "It's a little much.",
    "en2": "It's happening kind of a lot."
   },
   {
    "ja": "あれいらないんですよ",
    "line": "あれいらないんですよね。あれいらないんですよ。",
    "en1": "We don't need that.",
    "en2": "That part's not necessary."
   },
   {
    "ja": "〜だけだったらまだしも",
    "line": "入ってくるだけだったらまだしも、回そうとする。",
    "en1": "Jumping in is one thing, but...",
    "en2": "If that was all, fine, but..."
   },
   {
    "ja": "話を振る",
    "line": "話振ったりするじゃないですか。",
    "en1": "You keep tossing questions at people.",
    "en2": "You start throwing it to the kids."
   },
   {
    "ja": "僕が振るんで大丈夫です",
    "line": "あの話は僕が振るんで大丈夫ですよ。",
    "en1": "I've got it, thanks.",
    "en2": "I'll handle that part."
   },
   {
    "ja": "〜っていうか、もう〜みたいになってる",
    "line": "もう裏回しっていうか、もうダブル司会みたいになってる。",
    "en1": "It's basically turned into a double act.",
    "en2": "At this point it's like we're co-hosting."
   },
   {
    "ja": "よかれと思って",
    "line": "よかれと思ってだったのは分かるんですけども。",
    "en1": "I know you meant well.",
    "en2": "I know your heart's in the right place."
   },
   {
    "ja": "目に余る",
    "line": "ちょっと度が過ぎるというか、目に余りますね。",
    "en1": "It's getting out of hand.",
    "en2": "It's honestly a bit much."
   },
   {
    "ja": "〜のやることじゃない",
    "line": "それはね、副担任のやることじゃないですね。",
    "en1": "That's not your job.",
    "en2": "That's not what a co-teacher does."
   },
   {
    "ja": "〜だからやっていいとかじゃない",
    "line": "僕がやってないからやっていいとかじゃないんですよ。",
    "en1": "Just because I'm not doing it doesn't mean you can.",
    "en2": "It's not a free-for-all."
   },
   {
    "ja": "前に出すぎ",
    "line": "ちょっと前に出すぎなので。",
    "en1": "You're stepping on my toes.",
    "en2": "You're overstepping a bit."
   },
   {
    "ja": "あくまでも",
    "line": "先生、あくまでも副担任なんで。",
    "en1": "You're just the co-teacher, at the end of the day.",
    "en2": "Let's not forget you're the assistant here."
   },
   {
    "ja": "そういうことじゃなくて",
    "line": "いや、僕が言いたいのはそういうことじゃなくて。",
    "en1": "That's not what I'm saying.",
    "en2": "That's not my point."
   },
   {
    "ja": "出しゃばんなって言ってんだよ",
    "line": "出しゃばんなつってんだよ。",
    "en1": "I'm telling you to back off.",
    "en2": "Stay in your lane."
   },
   {
    "ja": "立場わきまえろ",
    "line": "おめえは副担なんだから立場わきまえろつってんだ。",
    "en1": "Know your place.",
    "en2": "Remember who you are here."
   },
   {
    "ja": "率直な気持ち",
    "line": "皆さんの率直な気持ちを聞かせてください。",
    "en1": "Tell me how you honestly feel.",
    "en2": "Just be straight with me."
   },
   {
    "ja": "最悪や",
    "line": "そしたらKBTBSだったんですね。最悪や。",
    "en1": "This is a disaster.",
    "en2": "Worst-case scenario."
   }
  ]
 },
 {
  "date": "2026-10-21",
  "source": {
   "videoId": "sb3rjWjwdVw",
   "channel": "ウチんちチャンネル",
   "title": "どん底と天国を見た夫婦が語るお金の裏話"
  },
  "rows": [
   {
    "ja": "どっちか諦めるしかない",
    "line": "どっちか諦めるしかないよね。",
    "en1": "You've got to give up one or the other.",
    "en2": "Something's got to give."
   },
   {
    "ja": "〜かっていうと",
    "line": "そこまで本当に全部振り切ってできるかっていうとね。",
    "en1": "But can you really go all in? That's the thing.",
    "en2": "Whether you'd actually commit all the way, though..."
   },
   {
    "ja": "失うものも何もない",
    "line": "僕みたいな失うものも何もないようなタイプ。",
    "en1": "I had nothing to lose.",
    "en2": "Nothing to lose, you know?"
   },
   {
    "ja": "〜じゃないけど",
    "line": "挑戦するのにちょっと恐怖心じゃないけど。",
    "en1": "Not fear exactly, but...",
    "en2": "I wouldn't call it fear, but..."
   },
   {
    "ja": "〜たらどうしようみたいな",
    "line": "収入入ってこなくなったらどうしようみたいな。",
    "en1": "Like, what if the money stops coming in?",
    "en2": "That 'what am I going to do if...' feeling."
   },
   {
    "ja": "言ってられない",
    "line": "不安っていうのはあんまり言ってられないのが現実。",
    "en1": "You can't afford to worry about that.",
    "en2": "No time to be scared."
   },
   {
    "ja": "〜暇があったら",
    "line": "どうしようみたいなことを考える暇があったら。",
    "en1": "If I've got time to stress about that, I'd rather...",
    "en2": "Instead of worrying about it, I'm thinking about..."
   },
   {
    "ja": "考えても意味がない",
    "line": "ネガティブなことを考えても意味がないというか。",
    "en1": "There's no point, really.",
    "en2": "It doesn't get you anywhere."
   },
   {
    "ja": "付き合い方よね",
    "line": "ネガティブが突き動かしてくれる時もあんやけど、付き合い方よね。",
    "en1": "It's all about how you handle it.",
    "en2": "It's how you deal with it."
   },
   {
    "ja": "起きてから考えろ",
    "line": "もうそんなもんは起きてから考えろよって。",
    "en1": "Cross that bridge when you get to it.",
    "en2": "Worry about it when it happens."
   },
   {
    "ja": "思い通りに行く",
    "line": "絶対思い通りに行くなんてことはなくって。",
    "en1": "Things never go exactly how you plan.",
    "en2": "Nothing ever goes to plan."
   },
   {
    "ja": "最初からそのつもりで",
    "line": "最初からそのつもりで取り組んでるし。",
    "en1": "I go in expecting that.",
    "en2": "That's the plan from day one."
   },
   {
    "ja": "風を読む",
    "line": "時代に、潮を読む、風を読む。",
    "en1": "See which way the wind's blowing.",
    "en2": "Read the room."
   },
   {
    "ja": "〜ば〜ほど",
    "line": "思ってれば思ってるほどきついと思う。",
    "en1": "The more you think that way, the harder it gets.",
    "en2": "The tighter you hold on, the worse it is."
   },
   {
    "ja": "先入観をとっぱらう",
    "line": "変な先入観みたいなのをとっぱらって考えられたら。",
    "en1": "Just drop all the assumptions.",
    "en2": "Clear your head of all that."
   },
   {
    "ja": "なんでかって言うと",
    "line": "僕はなんでかって言うと、具体的な目線で見てないから。",
    "en1": "And here's why.",
    "en2": "The reason is..."
   },
   {
    "ja": "丸見え",
    "line": "その人の価値観がもう浮き彫りになる。そう、丸見えや。",
    "en1": "It's written all over their face.",
    "en2": "You can see right through it."
   },
   {
    "ja": "よく言えるな",
    "line": "相手にそれを言うて、よく言えるなって感じやな。",
    "en1": "How can you even say that?",
    "en2": "The nerve on that guy."
   },
   {
    "ja": "別にそれいいんやけども",
    "line": "まぁ別にそれいいんやけども。",
    "en1": "Not that I care, but...",
    "en2": "Whatever, that's fine, but..."
   },
   {
    "ja": "〜ちゃあかん",
    "line": "本業以外でお金儲けちゃあかんなみたいな感じ。",
    "en1": "Like you're not allowed to make money on the side.",
    "en2": "Like it's wrong to earn outside your main gig."
   },
   {
    "ja": "どっちかというと",
    "line": "でもどっちかというと長い目で見るというか。",
    "en1": "If anything...",
    "en2": "I'd say it's more like..."
   },
   {
    "ja": "長い目で見る",
    "line": "どっちかというと長い目で見るというか。",
    "en1": "Think long-term.",
    "en2": "Look at the big picture."
   },
   {
    "ja": "深掘りしていく",
    "line": "こうやってこう深掘りしていくんや。",
    "en1": "You just keep digging.",
    "en2": "You dig deeper and deeper."
   },
   {
    "ja": "思わぬトラブル",
    "line": "その思わぬトラブルっていうものが起きた時。",
    "en1": "Stuff you don't see coming.",
    "en2": "Something out of left field."
   },
   {
    "ja": "ほんまやな",
    "line": "本来そっちの方が合理的やん。ほんまやな。",
    "en1": "True that.",
    "en2": "Yeah, you're right."
   },
   {
    "ja": "矛盾してんのに気づいた",
    "line": "めっちゃ自分も今矛盾してんのに気づいたわ。",
    "en1": "Wow, I just caught myself contradicting myself.",
    "en2": "I literally just contradicted myself."
   },
   {
    "ja": "自分の都合のいいように",
    "line": "自分の都合のいいように変えてるっていうのは。",
    "en1": "Twisting it to suit yourself.",
    "en2": "Spinning it however's convenient."
   },
   {
    "ja": "知らず知らず",
    "line": "自分を知らず知らずと刷り込まれてる。",
    "en1": "Without even realizing it.",
    "en2": "It just sneaks up on you."
   },
   {
    "ja": "〜っていうよりかは",
    "line": "節約っていうよりかは貯金とかそっちになってくる。",
    "en1": "Less saving money on stuff, more putting it away.",
    "en2": "It's not so much cutting back as stashing it."
   },
   {
    "ja": "本気出せば",
    "line": "どんな人でも自力で本気出せば稼げると思う。",
    "en1": "If you really put your mind to it.",
    "en2": "If you actually go for it."
   },
   {
    "ja": "頑張るしかない",
    "line": "そうね、頑張るしかないからな。",
    "en1": "You just have to push through.",
    "en2": "Nothing to do but keep going."
   },
   {
    "ja": "それしかない",
    "line": "そうもうそれしかないもんね。",
    "en1": "That's all you can do.",
    "en2": "There's no other option."
   },
   {
    "ja": "元を辿れば",
    "line": "意外とこれ全然違うとこに行っちゃうのよね、元を辿ればね。",
    "en1": "When you trace it all back...",
    "en2": "If you go back to the root of it..."
   },
   {
    "ja": "今ならなんと",
    "line": "個別セッションで30分無料相談、今ならなんと。",
    "en1": "And for a limited time only...",
    "en2": "But wait, there's more."
   }
  ]
 },
 {
  "date": "2026-10-22",
  "source": {
   "videoId": "UKhrureDE9w",
   "channel": "Planet of Food ",
   "title": "Planet of Food 1周年記念名場面SP/主婦の本音トーク"
  },
  "rows": [
   {
    "ja": "ピンと来る",
    "line": "今回は話し合ったんでピンと来て。",
    "en1": "It just clicked.",
    "en2": "Something clicked."
   },
   {
    "ja": "だめじゃん",
    "line": "もう全部抱っこ、私日本よ、だめじゃんとか言ってて。",
    "en1": "Well, that's not going to work.",
    "en2": "That's no good."
   },
   {
    "ja": "そっちに不安があったのね",
    "line": "ああ、そっちに不安があったのね。",
    "en1": "Oh, so that's what you were worried about.",
    "en2": "So that was the concern."
   },
   {
    "ja": "いい感じいい感じ",
    "line": "正拳突きみたいなやってもらえます?いい感じいい感じ。",
    "en1": "Nice, nice.",
    "en2": "Looking good."
   },
   {
    "ja": "区別がわからない",
    "line": "あまりなんか味の区別がわからないんですよね。",
    "en1": "I honestly can't tell the difference.",
    "en2": "They all taste the same to me."
   },
   {
    "ja": "美味しそうだなぁ",
    "line": "またオシャレですね、美味しそうだなぁ。",
    "en1": "That looks so good.",
    "en2": "Oh, that looks amazing."
   },
   {
    "ja": "地元では有名だけど",
    "line": "地元では有名だけど、ちょっと味薄いから。",
    "en1": "It's a big deal locally, but...",
    "en2": "Locals love it, but..."
   },
   {
    "ja": "せっかくなんで",
    "line": "せっかくなんでシドニーさん。",
    "en1": "Since we're here...",
    "en2": "While we're at it..."
   },
   {
    "ja": "好きではないですけど嫌いではない",
    "line": "好きではないですけど嫌いではないです。",
    "en1": "I don't love it, but I don't hate it.",
    "en2": "It's not bad, I guess."
   },
   {
    "ja": "何回見ても爆笑する",
    "line": "オシャレ論争がある、何回見ても爆笑する。",
    "en1": "Gets me every time.",
    "en2": "I lose it every single time."
   },
   {
    "ja": "悪い顔してた",
    "line": "悪い顔してたなあ。",
    "en1": "You had that evil grin.",
    "en2": "You looked so guilty."
   },
   {
    "ja": "ただでついてくる",
    "line": "オリジナルグレーズドがただでついてくる。",
    "en1": "You get one on the house.",
    "en2": "It comes with a free one."
   },
   {
    "ja": "〜を見ると冷めてしまう",
    "line": "男性のここを見ると冷めてしまうみたいなのありますか。",
    "en1": "What's a total turnoff for you?",
    "en2": "What kills it for you instantly?"
   },
   {
    "ja": "〜はダメなんだ",
    "line": "ビキニを履いてる男はダメなんだ。",
    "en1": "So guys in bikinis are a no-go.",
    "en2": "Okay, that's a dealbreaker."
   },
   {
    "ja": "長続きの秘訣",
    "line": "それが長続きのコツ、秘訣。",
    "en1": "That's the secret to making it last.",
    "en2": "That's how you make it work long-term."
   },
   {
    "ja": "俺は覚えてるよ",
    "line": "言ってたじゃん。パパ、俺は覚えてるよ。",
    "en1": "Oh, I remember.",
    "en2": "I haven't forgotten."
   },
   {
    "ja": "もう終わり",
    "line": "いい、もう終わり、ごめんなさい。",
    "en1": "Okay, I'm done.",
    "en2": "That's it, I'm out."
   },
   {
    "ja": "本気で食べ始めてない?",
    "line": "これ収録ください、本気で食べ始めてない?",
    "en1": "Are you seriously just eating now?",
    "en2": "Did you actually start eating for real?"
   },
   {
    "ja": "どこで買ったんですか",
    "line": "どこで買ったんですか。",
    "en1": "Where'd you get that?",
    "en2": "Where'd you pick that up?"
   },
   {
    "ja": "口の中パッサパサ",
    "line": "口の中パッサパサになってね。",
    "en1": "My mouth is so dry now.",
    "en2": "It's sucking all the moisture out of my mouth."
   },
   {
    "ja": "これじゃいつもプレッシャー",
    "line": "これじゃいつもプレッシャーだから。",
    "en1": "That's a lot of pressure.",
    "en2": "No pressure, right?"
   },
   {
    "ja": "全部本当の味に聞こえる",
    "line": "マダムアキコが言うと全部本当の味に聞こえる。",
    "en1": "When she says it, you just believe it.",
    "en2": "Everything sounds legit coming from her."
   },
   {
    "ja": "見せていただけますか",
    "line": "じゃあ見せていただけますか。",
    "en1": "Let's see it.",
    "en2": "Come on, show us."
   },
   {
    "ja": "まさかねぇ",
    "line": "まさかねぇ。",
    "en1": "No way.",
    "en2": "You're kidding."
   },
   {
    "ja": "よくないねぇ",
    "line": "いや、よくないねぇ。",
    "en1": "Not cool.",
    "en2": "That's not good."
   },
   {
    "ja": "すぐに決めました",
    "line": "すぐに決めました。",
    "en1": "I decided on the spot.",
    "en2": "It was a no-brainer."
   },
   {
    "ja": "いつも〜のこと考えてる",
    "line": "もういつもシドニーのこと考えてるから。",
    "en1": "I'm always thinking about you, Sydney.",
    "en2": "You're always on my mind."
   },
   {
    "ja": "下の世代からすると",
    "line": "ちょっとね、下の世代からすると。",
    "en1": "For the younger crowd...",
    "en2": "If you're a bit younger..."
   },
   {
    "ja": "全然〜しちゃう",
    "line": "でも全然応募しちゃうんですけど。",
    "en1": "I'd totally apply anyway.",
    "en2": "I'd go for it, no question."
   },
   {
    "ja": "今後ともよろしくお願いします",
    "line": "今後ともよろしくお願い致します。",
    "en1": "Thanks, and here's to more of this.",
    "en2": "Looking forward to doing this again."
   },
   {
    "ja": "フル回転で",
    "line": "これからも頑張る、フル回転で。",
    "en1": "Going full throttle.",
    "en2": "Firing on all cylinders."
   },
   {
    "ja": "景気付けに",
    "line": "景気付けにお願いします。",
    "en1": "Let's end on a high note.",
    "en2": "Let's hype it up."
   },
   {
    "ja": "今日はこの辺で",
    "line": "今日はこの辺でお別れです。",
    "en1": "That's all for today.",
    "en2": "We'll wrap it up there."
   }
  ]
 },
 {
  "date": "2026-10-23",
  "source": {
   "videoId": "z3MYFxiEwbA",
   "channel": "三人称チャンネル【切り抜き】",
   "title": "【総集編】笑いが止まらない3人の恋愛トーク三人称の恋バナ総集編【ドンピシャ/ぺちゃんこ/鉄塔/雑談/切り抜き】"
  },
  "rows": [
   {
    "ja": "俺は何してんだろう",
    "line": "そう、俺は何してんだろうと思った。",
    "en1": "What am I even doing?",
    "en2": "What am I doing with my life?"
   },
   {
    "ja": "向こうからしたら",
    "line": "いや、向こうからしたらすごいよね。",
    "en1": "Imagine being on their end.",
    "en2": "From their side, though..."
   },
   {
    "ja": "なかなか見ないよね",
    "line": "男2人で遊園地って、なかなか見ないよね。",
    "en1": "You don't see that every day.",
    "en2": "That's a rare sight."
   },
   {
    "ja": "〜と思いつつも",
    "line": "どうなのかなと思いつつも。",
    "en1": "I had my doubts, but...",
    "en2": "I wasn't sure, but..."
   },
   {
    "ja": "終わったわ",
    "line": "そしたらこの低たらだよ。終わったわ、もう。",
    "en1": "I'm done for.",
    "en2": "It's over."
   },
   {
    "ja": "地獄のような話",
    "line": "もう本当地獄のような話。",
    "en1": "That's a nightmare.",
    "en2": "Absolute nightmare."
   },
   {
    "ja": "〜わけじゃねえから",
    "line": "おめえの目の前で別れたわけじゃねえから。",
    "en1": "It's not like I broke up right in front of you.",
    "en2": "I didn't exactly do it in front of you."
   },
   {
    "ja": "それは〜ことじゃねえだろ",
    "line": "それは泣くことじゃねえだろ。それは怒ることだからな。",
    "en1": "You don't cry over that, you get mad.",
    "en2": "That's a get-mad thing, not a cry thing."
   },
   {
    "ja": "記憶に残っている",
    "line": "デートなんか記憶に残っているデートはありますか。",
    "en1": "Any dates that really stuck with you?",
    "en2": "Any date you still remember?"
   },
   {
    "ja": "かなり思い返したんですけど",
    "line": "いやいや、かなり思い返したんですけど。",
    "en1": "I racked my brain, but...",
    "en2": "I really thought about it, and..."
   },
   {
    "ja": "すげえ嬉しそうに",
    "line": "なんかすげえ嬉しそうに。",
    "en1": "He was beaming.",
    "en2": "He was so proud of it."
   },
   {
    "ja": "今思えば",
    "line": "今思えば別に高校生だったらマックでもいいな。",
    "en1": "Looking back...",
    "en2": "Now that I think about it..."
   },
   {
    "ja": "せめて〜にしときゃよかった",
    "line": "せめてファミレスぐらいにしときゃよかったかな。",
    "en1": "I should've at least gone somewhere a little nicer.",
    "en2": "Could've at least done a family restaurant."
   },
   {
    "ja": "いくらなんでも",
    "line": "いくらなんでもちょっと行きやすすぎるぞ。",
    "en1": "Come on, that's way too casual.",
    "en2": "That's pushing it, even for a teenager."
   },
   {
    "ja": "そんなもんでしょ",
    "line": "まぁそういう、そんなもんでしょっていうのはあるよね。",
    "en1": "That's just how it is.",
    "en2": "It is what it is."
   },
   {
    "ja": "背伸びしたい",
    "line": "やっぱ背伸びしたかったりするじゃん、高校生。",
    "en1": "You want to act older than you are.",
    "en2": "You try to look more grown-up."
   },
   {
    "ja": "踏み込めなかった",
    "line": "確信も得られず、なんかね踏み込めなかったんだよね。",
    "en1": "I never made my move.",
    "en2": "I just couldn't go for it."
   },
   {
    "ja": "勝算を感じたい",
    "line": "告白するんだったら少しは勝算感じたい。",
    "en1": "You want to know you've got a shot.",
    "en2": "You want at least decent odds."
   },
   {
    "ja": "分かるわ",
    "line": "勝算ある時に行きたいじゃない。分かるわ。",
    "en1": "I feel you.",
    "en2": "Totally get that."
   },
   {
    "ja": "やきもきする",
    "line": "だからもうやきもきするわけよ。",
    "en1": "It drives you nuts.",
    "en2": "You're going crazy waiting."
   },
   {
    "ja": "たまんないよね",
    "line": "あれ、たまんないよね。",
    "en1": "That's torture.",
    "en2": "That kills me."
   },
   {
    "ja": "真っ先に返す",
    "line": "好きな人だったら真っ先に返すんじゃねえの。",
    "en1": "If she liked me, she'd text back right away.",
    "en2": "You'd reply first thing if you liked someone."
   },
   {
    "ja": "やめとけ",
    "line": "その人はペさんに止められたのよ。やめとけと。",
    "en1": "Don't do it.",
    "en2": "Stay away from that one."
   },
   {
    "ja": "そんな風には見えない",
    "line": "そんな風には見えないけどねみたいな感じで。",
    "en1": "She doesn't seem like that.",
    "en2": "You'd never guess."
   },
   {
    "ja": "懐かしい",
    "line": "いや、懐かしい懐かしいわ。",
    "en1": "Man, that takes me back.",
    "en2": "Oh, the memories."
   },
   {
    "ja": "パッて思い浮かぶのが",
    "line": "デートつってパッて思い浮かぶのがね。",
    "en1": "The first thing that comes to mind is...",
    "en2": "What pops into my head is..."
   },
   {
    "ja": "〜に違いない",
    "line": "リーサルウェポンに出るんだつって、楽しいに違いないつって。",
    "en1": "This is going to be awesome.",
    "en2": "No way this isn't fun."
   },
   {
    "ja": "浮かれて",
    "line": "その時俺はもう浮かれて楽しいから。",
    "en1": "I was on cloud nine.",
    "en2": "I was way too hyped."
   },
   {
    "ja": "1人で盛り上がっちゃって",
    "line": "映画を見に行くけど、俺1人で盛り上がっちゃって。",
    "en1": "I got all excited by myself.",
    "en2": "I was the only one hyped."
   },
   {
    "ja": "そっちでなんとかしてもらわないと",
    "line": "それはそっちでなんとかしてもらわないと。",
    "en1": "That's on you.",
    "en2": "You've got to figure that out yourself."
   },
   {
    "ja": "デートじゃねえ",
    "line": "それはデートじゃねえもん。",
    "en1": "That's not even a date.",
    "en2": "You can't call that a date."
   },
   {
    "ja": "お勧めしない",
    "line": "リーサルウェポン4から見るのはお勧めしないかもしれない。",
    "en1": "I wouldn't recommend it.",
    "en2": "Don't do what I did."
   },
   {
    "ja": "選択肢はなかった",
    "line": "待つ選択肢はなかったかな。",
    "en1": "Waiting wasn't an option.",
    "en2": "It never even crossed my mind to wait."
   },
   {
    "ja": "なんなら",
    "line": "なんなら別に大丈夫だろうみたいな。",
    "en1": "If anything, I figured it'd be fine.",
    "en2": "Honestly, I thought it was no big deal."
   },
   {
    "ja": "事前に仕入れないと",
    "line": "そういうのやっぱ事前に仕入れないと。",
    "en1": "You've got to do your homework.",
    "en2": "You have to find that stuff out first."
   }
  ]
 },
 {
  "date": "2026-10-24",
  "source": {
   "videoId": "FB9qMmgt3Ss",
   "channel": "野澤輸出のハンターハンターチャンネル",
   "title": "【HUNTER×HUNTER】野澤輸出×マユリカ中谷がキメラアント編を語る！【ハンターハンター解説】"
  },
  "rows": [
   {
    "ja": "大穴狙いすぎ",
    "line": "200万ジェニーか、大穴狙いすぎ。",
    "en1": "That's a huge long shot.",
    "en2": "Talk about betting on the underdog."
   },
   {
    "ja": "テンション上がりました",
    "line": "これテンション上がりましたね。",
    "en1": "That got me so hyped.",
    "en2": "I was pumped."
   },
   {
    "ja": "うまいなと思う",
    "line": "出ました、やっぱこれやっぱうまいなと思う。",
    "en1": "Man, that's so well done.",
    "en2": "He's good, I'll give him that."
   },
   {
    "ja": "いつの間にか",
    "line": "あいつどこ行ったんかわかんない。いつの間にかいなくなってました。",
    "en1": "He just kind of disappeared.",
    "en2": "One day he was just gone."
   },
   {
    "ja": "よりによって",
    "line": "よりによって似たような場所に行きました。",
    "en1": "Of all places...",
    "en2": "Of all the places to go..."
   },
   {
    "ja": "えらいことになってる",
    "line": "ちょっとえらいことになってるから。",
    "en1": "Things are getting crazy.",
    "en2": "It's gotten really bad."
   },
   {
    "ja": "連れの連れの〜",
    "line": "連れの連れの地元に行ったみたいな感じ。",
    "en1": "Like going to your buddy's buddy's hometown.",
    "en2": "Kind of a friend-of-a-friend thing."
   },
   {
    "ja": "シンプルですけどいい",
    "line": "パワーが強くなるって、シンプルですけどいいですよ。",
    "en1": "Simple, but it works.",
    "en2": "Nothing fancy, but it's great."
   },
   {
    "ja": "格が違う",
    "line": "いや、えぐい、格違うやんけこいつら。",
    "en1": "These guys are on another level.",
    "en2": "They're in a different league."
   },
   {
    "ja": "打ちひしがれる",
    "line": "格違うやんけこいつらと打ちひしがれます。",
    "en1": "It totally crushes him.",
    "en2": "He's just gutted."
   },
   {
    "ja": "まだ回収されてない",
    "line": "これがね、結局まだ回収されてないんです。",
    "en1": "That thread's still hanging.",
    "en2": "They never paid that off."
   },
   {
    "ja": "解釈一致",
    "line": "でもびっくりして、あ、でもそうかって解釈一致しましたけどね。",
    "en1": "Yep, checks out.",
    "en2": "That's exactly how I pictured it."
   },
   {
    "ja": "そうかじゃないんだよ",
    "line": "そうかそうかそうかじゃないんだよ。",
    "en1": "What do you mean, 'I see'?",
    "en2": "Don't just 'I see' me."
   },
   {
    "ja": "やっと折り返し",
    "line": "やっと折り返し。うわぁ来ました。",
    "en1": "Finally, we're halfway there.",
    "en2": "We made it to the halfway point."
   },
   {
    "ja": "喋り出すときりない",
    "line": "これも喋り出すときりないんですけど。",
    "en1": "I could talk about this all day.",
    "en2": "Don't get me started."
   },
   {
    "ja": "必見",
    "line": "かなり変則的な戦いなんです。これは必見ですね。",
    "en1": "That's a must-see.",
    "en2": "You have to see that one."
   },
   {
    "ja": "喋りすぎた",
    "line": "ちょっと喋りすぎたんで、リップクリームも塗ります。",
    "en1": "I've been talking way too much.",
    "en2": "I've been running my mouth."
   },
   {
    "ja": "クソ野郎",
    "line": "マルコス、こいつが結構なんかクソ野郎というかね。",
    "en1": "He's kind of a scumbag.",
    "en2": "Total piece of garbage, that guy."
   },
   {
    "ja": "どこまで考えてんねん",
    "line": "すごい、どこまで考えてんねん、マジで。",
    "en1": "How far ahead was he thinking?",
    "en2": "How does he even plan all this?"
   },
   {
    "ja": "どっちにしろ",
    "line": "どっちにしろ犠牲を伴っちゃうから。",
    "en1": "Either way...",
    "en2": "Whichever way it goes..."
   },
   {
    "ja": "ばれたら終わり",
    "line": "まぁ、ばれたら終わりなんだけどね。",
    "en1": "If you get caught, it's game over.",
    "en2": "One slip and you're done."
   },
   {
    "ja": "タッグを組む",
    "line": "ゴンとここでタッグを組みます。",
    "en1": "They team up.",
    "en2": "They join forces."
   },
   {
    "ja": "〜しかいないのか",
    "line": "なるほど、6日間しか一緒にいないのか。",
    "en1": "Wait, only six days?",
    "en2": "Huh, that's all the time they had?"
   },
   {
    "ja": "〜より全然面白い",
    "line": "なんか将棋より全然面白いなと思っちゃって。",
    "en1": "It's way more fun than shogi.",
    "en2": "Shogi doesn't even compare."
   },
   {
    "ja": "何個発明すんねん",
    "line": "いや、何個発明すんねん、マジで。",
    "en1": "How much stuff is this guy going to invent?",
    "en2": "Seriously, how many things did he come up with?"
   },
   {
    "ja": "よくできてる",
    "line": "よくできてる、よくできてます。",
    "en1": "It's so well made.",
    "en2": "It's really well put together."
   },
   {
    "ja": "絶対〜の方が良かった",
    "line": "絶対女の子の方が良かったっすね。",
    "en1": "Girl was definitely the right call.",
    "en2": "It works way better as a girl."
   },
   {
    "ja": "俺もこれにしたい",
    "line": "これいいよな、俺もこれにしたいもん。",
    "en1": "I want that one.",
    "en2": "I'd pick that one too."
   },
   {
    "ja": "〜ならめっちゃ良くないすか",
    "line": "年能力持ってたらこの能力むっちゃ良くないすか。",
    "en1": "Wouldn't that be sick?",
    "en2": "How great would that be?"
   },
   {
    "ja": "〜りゃいいか",
    "line": "飛行機乗らなくて、15分前に家出りゃいいか。",
    "en1": "Then I could just leave fifteen minutes before.",
    "en2": "Just walk out the door fifteen minutes early."
   },
   {
    "ja": "恥をかく",
    "line": "なんかちょっと王が恥をかくんだよな。",
    "en1": "He ends up looking stupid.",
    "en2": "He kind of embarrasses himself."
   },
   {
    "ja": "〜が前提の覚悟",
    "line": "死ぬことが前提の覚悟でやってます。",
    "en1": "I went in ready to die.",
    "en2": "I knew going in it could cost me my life."
   },
   {
    "ja": "これで許せ",
    "line": "お前の欲しいものに余の命っていう選択肢なかった。これで許せ。",
    "en1": "Let's call it even.",
    "en2": "Take this and we're square."
   }
  ]
 },
 {
  "date": "2026-10-25",
  "source": {
   "videoId": "0l0k8Kp0aUM",
   "channel": "すだちゃんネル",
   "title": "菅田将暉のオールナイトニッポンH29 4 17第3回放送"
  },
  "rows": [
   {
    "ja": "素直に〜が言える",
    "line": "正解は素直にありがとうとごめんなさいが言える子かな。",
    "en1": "Someone who can just say thanks and sorry.",
    "en2": "Just owning it and saying sorry."
   },
   {
    "ja": "〜の余白が大事",
    "line": "「かな」というところまでの余白が大事ですね。",
    "en1": "It's all about that little pause.",
    "en2": "The space in between is what matters."
   },
   {
    "ja": "〜に引っ張られすぎ",
    "line": "現実世界の違うとこに引っ張られすぎたら",
    "en1": "You're getting way too hung up on that.",
    "en2": "Don't get dragged into that too much."
   },
   {
    "ja": "それを言っちゃおしまいだよ",
    "line": "それも言っちゃおしまいだよ。",
    "en1": "Come on, you can't say that.",
    "en2": "Well, that kills the whole thing."
   },
   {
    "ja": "真っ正面からぶつかる",
    "line": "やっぱり真っ正面からぶつかって。",
    "en1": "Just go at it head-on.",
    "en2": "Take it straight on."
   },
   {
    "ja": "迷いどころ",
    "line": "まあまあ、本当は迷いどころですね。",
    "en1": "That's a tough call.",
    "en2": "Honestly, I could go either way."
   },
   {
    "ja": "〜っちゃ〜",
    "line": "まあでも当然の結果っちゃ当然の結果なんで。",
    "en1": "I mean, it was bound to happen.",
    "en2": "Kind of saw that coming, honestly."
   },
   {
    "ja": "実績を残した",
    "line": "じゃあね、実績を残したからねぇ。",
    "en1": "Hey, he got it done.",
    "en2": "Well, he's got the results to show for it."
   },
   {
    "ja": "いいとこ出してきたな",
    "line": "なかなかいいとこ出してきたなぁと思ってるんだろ。",
    "en1": "You think you nailed that one, huh?",
    "en2": "Bet you think that was a good pull."
   },
   {
    "ja": "気合いが前に出すぎ",
    "line": "ごめんなさい、気合が前に出すぎて。",
    "en1": "Sorry, I got a little too fired up.",
    "en2": "My bad, got a little carried away."
   },
   {
    "ja": "もっと〜と思っちゃう",
    "line": "本当はもっと盛り上がると思っちゃうんですよね。",
    "en1": "You'd think it'd be way more fun.",
    "en2": "I figured it'd be crazier than this."
   },
   {
    "ja": "それを踏まえて",
    "line": "それを踏まえてどうですか？",
    "en1": "So with that in mind, what do you think?",
    "en2": "Knowing that, how do you feel?"
   },
   {
    "ja": "マジか",
    "line": "すっごい真面目に答えちゃってたんです。マジかー。",
    "en1": "No way.",
    "en2": "Are you serious?"
   },
   {
    "ja": "わかるわけない",
    "line": "わかるわけないよ。",
    "en1": "How would I know?",
    "en2": "There's no way anyone knows that."
   },
   {
    "ja": "一生ついていく",
    "line": "竹内先輩に一生ついていくと決めた次第であります。",
    "en1": "I'll follow you anywhere, man.",
    "en2": "I'm with you for life."
   },
   {
    "ja": "〜に感銘を受ける",
    "line": "正義感あふれる言葉に感銘を受け",
    "en1": "That really hit me.",
    "en2": "That stuck with me big time."
   },
   {
    "ja": "何を言ってるんですか",
    "line": "何を言ってるんですか。親が子供に見せてもいい番組",
    "en1": "What are you talking about?",
    "en2": "Come on, what are you saying?"
   },
   {
    "ja": "楽しみにしてました",
    "line": "楽しみにしてましたからね。",
    "en1": "I've been looking forward to this.",
    "en2": "I've been waiting for this one."
   },
   {
    "ja": "よーくお考えください",
    "line": "よーくお考え下さい。",
    "en1": "Think real hard.",
    "en2": "Take your time with this one."
   },
   {
    "ja": "いい加減にしてください",
    "line": "いい加減にしてください、本当に。",
    "en1": "Oh, give me a break.",
    "en2": "Come on, knock it off."
   },
   {
    "ja": "勘弁してください",
    "line": "これ勘弁してください、本当に。",
    "en1": "Please, spare me.",
    "en2": "Oh man, have mercy."
   },
   {
    "ja": "誰のおかげ",
    "line": "今生きてるの誰のおかげ？",
    "en1": "Who do you think got you here?",
    "en2": "Who do you owe all this to?"
   },
   {
    "ja": "目つぶってても",
    "line": "もう目つぶっててもなんか余裕で答えてほしかった",
    "en1": "You should be able to do that in your sleep.",
    "en2": "That should've been a no-brainer."
   },
   {
    "ja": "最悪だよもう",
    "line": "残念、最悪だよもう。",
    "en1": "Ugh, this is the worst.",
    "en2": "Man, that sucks."
   },
   {
    "ja": "〜みたいな顔した",
    "line": "すげーとこ来たみたいな顔したんですよ。",
    "en1": "He looked at me like I'd just nailed it.",
    "en2": "He gave me this 'oh, you got it' look."
   },
   {
    "ja": "バカにされた",
    "line": "あんぺーにバカにされたんですよ。",
    "en1": "He was making fun of me.",
    "en2": "He totally played me."
   },
   {
    "ja": "考えるだけ無駄",
    "line": "考えるだけもう無駄。",
    "en1": "No point even thinking about it.",
    "en2": "It's a waste of time even trying."
   },
   {
    "ja": "〜感じがするんですよね",
    "line": "なんだろ、抽象的すぎる感じがするんですよね。",
    "en1": "I don't know, it just feels too vague.",
    "en2": "It kind of feels too abstract, you know?"
   },
   {
    "ja": "はっきり言ってしまうと",
    "line": "ハッキリ言ってしまうと、量がちゃいますから。",
    "en1": "To be blunt,",
    "en2": "Let's be honest,"
   },
   {
    "ja": "想像通りって感じ",
    "line": "まあ想像通りって感じですかね。",
    "en1": "Pretty much what I expected.",
    "en2": "About how I pictured it."
   },
   {
    "ja": "気に食わない",
    "line": "いじられたのがその気に食わないですよ。",
    "en1": "I didn't love getting roasted like that.",
    "en2": "Getting picked on like that bugs me."
   },
   {
    "ja": "もうどうしたらいいですか",
    "line": "俺の物件探しはもうどうしたらいいですか？",
    "en1": "What am I supposed to do now?",
    "en2": "So now what?"
   },
   {
    "ja": "涙が止まりません",
    "line": "負けてしまったことに涙が止まりません。",
    "en1": "I can't stop crying.",
    "en2": "I'm literally in tears."
   },
   {
    "ja": "〜まくった結果",
    "line": "ママが甘やかしまくった結果、それが野村周平。",
    "en1": "That's what happens when mom spoils you rotten.",
    "en2": "That's what you get from being babied."
   },
   {
    "ja": "白熱した勝負",
    "line": "白熱した勝負でしたねー。",
    "en1": "That was a close one.",
    "en2": "That got heated."
   }
  ]
 },
 {
  "date": "2026-10-26",
  "source": {
   "videoId": "hNUxom64rss",
   "channel": "IGN Japan",
   "title": "どうしてこうなった……マーベルコミックス原作映画『モービウス』を語る：第232回 銀幕にポップコーン"
  },
  "rows": [
   {
    "ja": "〜ってそういうもの",
    "line": "まあヴァンパイアってそういうものだと思うんですけれども",
    "en1": "I mean, that's kind of what vampires do.",
    "en2": "That's just how it goes with vampires."
   },
   {
    "ja": "結構好きだったのは",
    "line": "一つ結構好きだったのは",
    "en1": "One thing I actually liked was",
    "en2": "One part I really dug was"
   },
   {
    "ja": "同じような気持ちになっちゃった",
    "line": "アクションシーンも同じような気持ちになっちゃったんですよ。",
    "en1": "I felt the same way about the action.",
    "en2": "Same deal with the action scenes."
   },
   {
    "ja": "結局〜に還元される",
    "line": "やっぱりストーリーに結局還元されるような気はしますね。",
    "en1": "It all comes back to the story.",
    "en2": "In the end, it's a story problem."
   },
   {
    "ja": "使い所がない",
    "line": "それを結局使い所が特にストーリーに用意されていない",
    "en1": "They never really give it a chance to shine.",
    "en2": "There's nowhere to actually use it."
   },
   {
    "ja": "そういう意味では",
    "line": "そうですね、あの結構そういう意味では",
    "en1": "In that sense,",
    "en2": "So yeah, in that way,"
   },
   {
    "ja": "〜ことばかりやってしまう",
    "line": "最後は後悔してしまうことばかりやってしまう",
    "en1": "He keeps doing stuff he regrets.",
    "en2": "He just keeps screwing up."
   },
   {
    "ja": "〜を背負ってしまった",
    "line": "制御不能の能力を背負ってしまったことで",
    "en1": "He's stuck with this power he can't control.",
    "en2": "He's got to live with it."
   },
   {
    "ja": "〜わけでもない",
    "line": "そこにフォーカス置かれるわけでもないっていう",
    "en1": "It's not like they really dig into that.",
    "en2": "They don't really focus on it."
   },
   {
    "ja": "どこにも触れてない",
    "line": "どこにも触れてないなっていう感じになりますね。",
    "en1": "It kind of doesn't go anywhere.",
    "en2": "It never really lands anywhere."
   },
   {
    "ja": "〜があればよかったかもしれない",
    "line": "ボディホラーみたいなのがあれば良かったかもしれないですね。",
    "en1": "Some body horror would've been nice.",
    "en2": "It could've used some body horror."
   },
   {
    "ja": "もう何回も見てる",
    "line": "すっごく好きな映画だったんで、もう何回も見てる",
    "en1": "I've seen it a million times.",
    "en2": "I've watched that one over and over."
   },
   {
    "ja": "なりきってない",
    "line": "バンパイアにまだなりきってないところ",
    "en1": "He's not fully there yet.",
    "en2": "He's only halfway there."
   },
   {
    "ja": "逆に言うと",
    "line": "逆に言うとちょっと真面目すぎるかもしれないけど",
    "en1": "Then again, maybe a little too serious.",
    "en2": "Flip side, it's kind of too serious."
   },
   {
    "ja": "もう少し〜ても良かった",
    "line": "もう少しとんがっても良かったかもしれないけど",
    "en1": "They could've pushed it a little more.",
    "en2": "It could've been a bit edgier."
   },
   {
    "ja": "私の中では",
    "line": "私の中ではこれまでのベストかもしれないですよ。",
    "en1": "For me, it might be his best yet.",
    "en2": "Personally, I'd say it's his best."
   },
   {
    "ja": "言い出したらキリがない",
    "line": "いろいろこう言い出したらキリがない",
    "en1": "I could go on forever.",
    "en2": "Don't get me started."
   },
   {
    "ja": "納得いくかいかないか",
    "line": "我々の納得いくかいかないかも含めて",
    "en1": "whether it works for you or not",
    "en2": "whether you buy it or not"
   },
   {
    "ja": "なかなか難しいところ",
    "line": "なかなか難しいところでありますね。",
    "en1": "That's a tough one.",
    "en2": "Yeah, that's tricky."
   },
   {
    "ja": "それだけなの",
    "line": "一応説明されるけど、それだけなのっていうのはある",
    "en1": "That's it? That's all you've got?",
    "en2": "Wait, that's all?"
   },
   {
    "ja": "定番の流れ",
    "line": "オリジンとしては定番の流れというか",
    "en1": "It's the usual formula.",
    "en2": "Pretty standard stuff."
   },
   {
    "ja": "小骨が引っかかったような",
    "line": "すごく小骨が引っかかったような感じ",
    "en1": "It's like something stuck in your throat.",
    "en2": "It kind of nagged at me."
   },
   {
    "ja": "〜と思わざるを得ない",
    "line": "そういうタイプの映画なのかなって思わざるを得ない",
    "en1": "You can't help but think that.",
    "en2": "You kind of have to assume that."
   },
   {
    "ja": "ちょっとアレ",
    "line": "まぁちょっとアレですよね。",
    "en1": "It's kind of, you know...",
    "en2": "It's a little iffy."
   },
   {
    "ja": "〜と思ってしまう",
    "line": "ただのクズじゃんと思ってしまうんですね。",
    "en1": "You can't help thinking he's a scumbag.",
    "en2": "He just comes off as a jerk."
   },
   {
    "ja": "それはそれでいい",
    "line": "それはそれでいいじゃないですか。",
    "en1": "And that's fine.",
    "en2": "Which is fine, honestly."
   },
   {
    "ja": "全然アリ",
    "line": "そういうキャラクターというのは別に全然アリなんで",
    "en1": "That's totally fine by me.",
    "en2": "I'm all for that."
   },
   {
    "ja": "自分のやりたいようにやる",
    "line": "自分のやりたいようにやるキャラクター",
    "en1": "A guy who just does his own thing.",
    "en2": "He does whatever he wants."
   },
   {
    "ja": "モヤモヤする",
    "line": "その辺はモヤモヤしましてね。",
    "en1": "I couldn't quite get past that.",
    "en2": "That part left me kind of unsatisfied."
   },
   {
    "ja": "どう受け取っていいかわからない",
    "line": "どう受け取っていいかわからないってところもありました",
    "en1": "I didn't know what to make of it.",
    "en2": "Not sure how I'm supposed to take that."
   },
   {
    "ja": "わざわざ〜する必要はない",
    "line": "全く同じものとわざわざ戦う必要はないわけで",
    "en1": "There's no need to go out of your way.",
    "en2": "Why even bother?"
   },
   {
    "ja": "〜っていうだけの話",
    "line": "用意することができてないっていうだけの話なのかな",
    "en1": "It's really just that simple.",
    "en2": "That's all it comes down to."
   },
   {
    "ja": "〜って結構思っちゃいますよね",
    "line": "描きたいことってないのかなって結構思っちゃいますよね。",
    "en1": "Makes you wonder, you know?",
    "en2": "You kind of start to wonder."
   },
   {
    "ja": "それを言うと",
    "line": "まあでもそれを言うと",
    "en1": "But if you go there,",
    "en2": "Well, by that logic,"
   },
   {
    "ja": "しょうがないか",
    "line": "観客も納得するな、しょうがないかみたいな",
    "en1": "Eh, fair enough.",
    "en2": "Okay, I'll let it slide."
   }
  ]
 },
 {
  "date": "2026-10-27",
  "source": {
   "videoId": "sHoW3mf4PMM",
   "channel": "ドコムスさぶちゃんねる【切り抜き】",
   "title": "スラムダンク映画「THE FIRST SLAM DUNK」の正直な感想を話す【ドコムス雑談切り抜き】"
  },
  "rows": [
   {
    "ja": "〜って感じはした",
    "line": "テレビアニメ版の演技だと浮くだろうなって感じはした",
    "en1": "Yeah, I could see it sticking out.",
    "en2": "I get that it would feel off."
   },
   {
    "ja": "あれってなった",
    "line": "言い回しが違うのはあれってなったよね。",
    "en1": "It was like, wait, what?",
    "en2": "That threw me off."
   },
   {
    "ja": "超わかる",
    "line": "いやそうなんだよ、それは超わかる。",
    "en1": "Oh, totally.",
    "en2": "I get that big time."
   },
   {
    "ja": "〜ぐらい好き",
    "line": "全部セリフ言えるぐらい好きなのよ。",
    "en1": "He's so into it he knows every line.",
    "en2": "He can quote the whole thing."
   },
   {
    "ja": "やっぱそういうことなんだろうな",
    "line": "あ、やっぱそういうことなんだろうなって思ったよね。",
    "en1": "Guess that's how it is.",
    "en2": "Yeah, that's what it comes down to."
   },
   {
    "ja": "俺らが悪い",
    "line": "あ、これ多分俺らが悪いよねってなった。",
    "en1": "It's probably on us.",
    "en2": "Okay, that's our fault."
   },
   {
    "ja": "言ってる意味わかるかな",
    "line": "言ってる意味わかるかな。",
    "en1": "You know what I mean?",
    "en2": "Does that make sense?"
   },
   {
    "ja": "下手したら",
    "line": "下手したら5回ぐらいは見に行くと思う。",
    "en1": "Maybe even like five times.",
    "en2": "Could be five times, honestly."
   },
   {
    "ja": "どうしても〜したいってなって",
    "line": "どうしても原作と見比べながら話したいってなって",
    "en1": "We just had to compare it to the manga.",
    "en2": "We were dying to go over it."
   },
   {
    "ja": "喋ってるうちに",
    "line": "喋ってるうちに文句も出てくるじゃん。",
    "en1": "The more we talked, the more we picked it apart.",
    "en2": "Once we got going, the complaints came out."
   },
   {
    "ja": "〜って気持ちもある",
    "line": "完全再現して欲しかったって気持ちもあるのよ。",
    "en1": "Part of me wanted a straight remake.",
    "en2": "I kind of wanted it redone exactly."
   },
   {
    "ja": "相当面白かったんだろうな",
    "line": "多分相当面白かったんだろうな俺って思って",
    "en1": "I must've really loved it.",
    "en2": "Guess it really got to me."
   },
   {
    "ja": "すっきりした",
    "line": "でも喋ったらすっきりした。",
    "en1": "Feels good to get that off my chest.",
    "en2": "Man, I feel better now."
   },
   {
    "ja": "〜わけじゃなくて",
    "line": "ギャグシーンをやってないわけじゃなくて",
    "en1": "It's not that they cut it.",
    "en2": "It's not like it's gone."
   },
   {
    "ja": "ちゃんとやってるやん",
    "line": "うわ、ちゃんとやってるやんみたいのが楽しめたり",
    "en1": "Oh nice, they actually kept it.",
    "en2": "Look at that, they did it."
   },
   {
    "ja": "わがままを言っていいんだったら",
    "line": "ただわがままを言っていいんだったら",
    "en1": "If I'm being greedy,",
    "en2": "If I could ask for one thing,"
   },
   {
    "ja": "マジ頼む",
    "line": "俺はそれだけ、マジ頼む。",
    "en1": "Please, I'm begging you.",
    "en2": "Come on, just do it."
   },
   {
    "ja": "ふざけんなよ",
    "line": "マジふざけんなよと。",
    "en1": "Are you kidding me?",
    "en2": "You've got to be kidding."
   },
   {
    "ja": "なんでやねん",
    "line": "ポスターが4個しか置いてない、なんでやねん。",
    "en1": "Why though?",
    "en2": "Seriously, why?"
   },
   {
    "ja": "俺頑張ったじゃん",
    "line": "俺頑張ったじゃん、なのにグッズないんだ。",
    "en1": "I did everything right!",
    "en2": "I went through all that!"
   },
   {
    "ja": "〜ればいいじゃん",
    "line": "集英社と共同とかで作ればいいじゃん。",
    "en1": "Why not just team up?",
    "en2": "Just make it together."
   },
   {
    "ja": "ってかビビったのが",
    "line": "ってかビビったのが",
    "en1": "What really got me was",
    "en2": "What blew my mind was"
   },
   {
    "ja": "〜久しぶりに見た",
    "line": "あんなに人いる映画館久しぶりに見た。",
    "en1": "I haven't seen a theater that packed in forever.",
    "en2": "Haven't seen it that full in ages."
   },
   {
    "ja": "〜しかねえ",
    "line": "いっぱいお金落とすしかねえと思うから",
    "en1": "The only way is to throw money at it.",
    "en2": "We just have to spend."
   },
   {
    "ja": "できる限り",
    "line": "できる限りこの映画にお金を落とすわ。",
    "en1": "I'm going to spend as much as I can.",
    "en2": "I'll throw everything I've got at it."
   },
   {
    "ja": "言うて",
    "line": "言うて商売でもあるから",
    "en1": "At the end of the day, it's a business.",
    "en2": "I mean, it's still a business."
   },
   {
    "ja": "鳥肌立つ",
    "line": "オープニングの入り、マジで鳥肌立つから。",
    "en1": "It gives you chills.",
    "en2": "I got goosebumps."
   },
   {
    "ja": "マジで神だった",
    "line": "マジで神だった。",
    "en1": "It was insane.",
    "en2": "It was unreal."
   },
   {
    "ja": "テンション上がる",
    "line": "友達と俺はそこがマックステンション上がってた。",
    "en1": "We were losing our minds.",
    "en2": "We got so hyped."
   },
   {
    "ja": "それはそれでありなんじゃね",
    "line": "それはそれでありなんじゃねっていう。",
    "en1": "That's cool too, right?",
    "en2": "That works too, honestly."
   },
   {
    "ja": "感情ぐちゃぐちゃになる",
    "line": "見てて感情ぐちゃぐちゃになりますか？",
    "en1": "Does it wreck you emotionally?",
    "en2": "Is it an emotional mess?"
   },
   {
    "ja": "〜てもしょうがねえ",
    "line": "ゴリだけ買ってもしょうがねえなと思って",
    "en1": "No point getting just the one.",
    "en2": "What's the point of just buying one?"
   },
   {
    "ja": "人間だもの",
    "line": "俺よく言うけどさ、人間だものって感じがあるじゃん",
    "en1": "Hey, we're all human.",
    "en2": "Nobody's perfect."
   },
   {
    "ja": "〜ないと〜と思う",
    "line": "自分で見たくて行かないと面白く感じないと思う",
    "en1": "You have to actually want to see it.",
    "en2": "It only works if you're into it."
   }
  ]
 },
 {
  "date": "2026-10-28",
  "source": {
   "videoId": "vE7wwQvP3q8",
   "channel": "ムカイワンダーランド",
   "title": "ドライブトーク【ワンダーな時間】【ムカワンの子供時代の話。ピアノを習っていた話。球技が苦手すぎる話。高校の時アメリカ横断、インドを旅した話。などなんかずっと喋ってます】"
  },
  "rows": [
   {
    "ja": "余韻をぶち壊す",
    "line": "途中で余韻をぶち壊した。",
    "en1": "Totally killed the vibe.",
    "en2": "Ruined the whole moment."
   },
   {
    "ja": "その話戻るけど",
    "line": "でまあその話戻るけど",
    "en1": "Anyway, back to what I was saying.",
    "en2": "So, going back to that,"
   },
   {
    "ja": "結局〜たかったんやろね",
    "line": "やっぱ結局やりたかったんやろね。",
    "en1": "Guess I wanted to do it after all.",
    "en2": "Deep down I wanted to."
   },
   {
    "ja": "下手したら",
    "line": "万引きするより下手したら怒られるかも",
    "en1": "You'd probably get chewed out worse.",
    "en2": "Could be even worse, honestly."
   },
   {
    "ja": "〜だけはしちゃダメ",
    "line": "絶対エラーだけはしちゃダメという",
    "en1": "Whatever you do, don't make an error.",
    "en2": "The one thing you can't do is screw up."
   },
   {
    "ja": "刷り込まれる",
    "line": "そういうの刷り込まれるよね。",
    "en1": "That stuff gets drilled into you.",
    "en2": "It sticks with you."
   },
   {
    "ja": "〜たら早く帰れる",
    "line": "ちょっと負けたら早く帰れるなとか思いながら",
    "en1": "Thinking, hey, if we lose, I get to go home early.",
    "en2": "Kind of hoping we'd lose so I could leave."
   },
   {
    "ja": "意味がねえじゃん",
    "line": "近所の家にソフトボールが落ちて、意味がねえじゃん。",
    "en1": "What's even the point?",
    "en2": "Then what's the net for?"
   },
   {
    "ja": "センスなかった",
    "line": "まぁセンスなかったね、ソフトボール。",
    "en1": "I just didn't have it.",
    "en2": "I was never any good."
   },
   {
    "ja": "見たらわかる",
    "line": "なんか見たらわかるもんね。",
    "en1": "You can just tell.",
    "en2": "It's obvious when you see it."
   },
   {
    "ja": "〜って言われたことある",
    "line": "運動神経ないなと言われたことあるし",
    "en1": "People have told me I'm not athletic.",
    "en2": "I've been called uncoordinated."
   },
   {
    "ja": "分かる人分かると思います",
    "line": "分かる人分かると思います。",
    "en1": "If you know, you know.",
    "en2": "Some of you will get this."
   },
   {
    "ja": "気づけよ",
    "line": "これ気づけよ、もう。",
    "en1": "Come on, notice it!",
    "en2": "How do you not see that?"
   },
   {
    "ja": "人のせいにする",
    "line": "ちょっと人のせいにしようとしてみたり",
    "en1": "I tried to blame someone else.",
    "en2": "I tried to pin it on somebody."
   },
   {
    "ja": "結局ダメで",
    "line": "いろいろ頑張ったけど結局ダメで",
    "en1": "I tried everything, but no luck.",
    "en2": "Didn't work out anyway."
   },
   {
    "ja": "できるイメージがない",
    "line": "確かにできるイメージがないです。",
    "en1": "I just can't picture it.",
    "en2": "I can't see you pulling that off."
   },
   {
    "ja": "意外と得意かも",
    "line": "俺ね、意外と得意かもしれない。",
    "en1": "I might actually be good at it.",
    "en2": "Turns out I might be decent."
   },
   {
    "ja": "〜って言ったら大げさやけど",
    "line": "世界を回ったって言ったら大げさやけど",
    "en1": "Calling it a world tour's a stretch, but",
    "en2": "I wouldn't go as far as saying I traveled the world, but"
   },
   {
    "ja": "〜とはいえ",
    "line": "時給750円とはいえ",
    "en1": "Even at 750 an hour,",
    "en2": "Sure, it was only 750 an hour, but"
   },
   {
    "ja": "社会を経験しとけよ",
    "line": "社会を経験しとけよみたいな。",
    "en1": "Go see how the real world works.",
    "en2": "Get a taste of the real world."
   },
   {
    "ja": "手癖が悪い",
    "line": "俺が手癖悪かったらどうするのだろうとか言って",
    "en1": "What if I had sticky fingers?",
    "en2": "What if I pocketed some?"
   },
   {
    "ja": "そういうことか",
    "line": "そういうことか、それで車詳しいのか。",
    "en1": "Oh, that explains it.",
    "en2": "Ah, so that's why."
   },
   {
    "ja": "〜みたいになってた",
    "line": "うちの高校の部活みたいになってたよね。",
    "en1": "It was basically like a club.",
    "en2": "It turned into a hangout."
   },
   {
    "ja": "相当ストイック",
    "line": "相当ストイックやったよ、俺も。",
    "en1": "I was pretty hardcore.",
    "en2": "I was really disciplined back then."
   },
   {
    "ja": "今信じられない",
    "line": "今信じられないし危ないよね。",
    "en1": "I can't believe it now.",
    "en2": "Crazy to think about now."
   },
   {
    "ja": "自信をつける",
    "line": "それで俺も自信つけて",
    "en1": "That gave me some confidence.",
    "en2": "I got a little cocky after that."
   },
   {
    "ja": "何でもいけるぜ",
    "line": "いやもう何でもいけるぜ、どこでも行けるぜみたいに",
    "en1": "I felt like I could do anything.",
    "en2": "I was like, bring it on."
   },
   {
    "ja": "〜で良くない？",
    "line": "次の便で良くないみたいな。",
    "en1": "Why not just take the next one?",
    "en2": "Can't we just grab the next one?"
   },
   {
    "ja": "人生であんなにきついの初めて",
    "line": "俺人生であんなにきついの初めてやもん。",
    "en1": "Worst I've ever felt in my life.",
    "en2": "Never been that wrecked in my life."
   },
   {
    "ja": "案の定",
    "line": "食いまくって、案の定。",
    "en1": "And sure enough,",
    "en2": "And of course, what do you know."
   },
   {
    "ja": "〜てもと思って",
    "line": "どっかで腹壊してもと思って食いまくって",
    "en1": "I figured, whatever, if I get sick, I get sick.",
    "en2": "I just said screw it."
   },
   {
    "ja": "〜さえあれば",
    "line": "薬さえあれば俺もあんな苦しむことなかった",
    "en1": "If I'd just had meds, I would've been fine.",
    "en2": "Should've brought medicine."
   },
   {
    "ja": "全然話にならん",
    "line": "正露丸じゃ全然話にならんレベル",
    "en1": "It wasn't even close.",
    "en2": "Didn't even make a dent."
   },
   {
    "ja": "〜いただけると嬉しい",
    "line": "コメントいただけると嬉しいです。",
    "en1": "Drop a comment, I'd love that.",
    "en2": "Let me know in the comments."
   }
  ]
 },
 {
  "date": "2026-10-29",
  "source": {
   "videoId": "DqpINlnFygM",
   "channel": "有吉弘行傑作選 (Ariyoshi Hiroyuki Kessakusen)",
   "title": "【爆笑まとめ】1秒も飽きない有吉弘行の最強パントーク集 🔥"
  },
  "rows": [
   {
    "ja": "どっちなんだよ",
    "line": "バカじゃない。どっちなんだよ。",
    "en1": "Which is it?",
    "en2": "Make up your mind."
   },
   {
    "ja": "なんだったんだよ",
    "line": "なんだったんだよ。",
    "en1": "What was that about?",
    "en2": "What the heck was that?"
   },
   {
    "ja": "〜しかねえのに",
    "line": "1万しかねえのに",
    "en1": "I only had ten grand.",
    "en2": "When I've only got ten grand."
   },
   {
    "ja": "一緒じゃねえわ",
    "line": "一緒じゃねえわ。",
    "en1": "That's not the same thing.",
    "en2": "That's totally different."
   },
   {
    "ja": "当然の措置",
    "line": "当然の措置だな。",
    "en1": "That's only fair.",
    "en2": "They had it coming."
   },
   {
    "ja": "間違ってない選択",
    "line": "当然の措置だな。間違ってない選択。",
    "en1": "Can't argue with that.",
    "en2": "Good call."
   },
   {
    "ja": "やっぱりこうなったか",
    "line": "やっぱりこうなったか、などの意見が集まった。",
    "en1": "Figured it'd end up like this.",
    "en2": "Called it."
   },
   {
    "ja": "もう二度と〜ない",
    "line": "もう2度と牛乳飲まない。",
    "en1": "I'm never drinking milk again.",
    "en2": "I'm done with milk."
   },
   {
    "ja": "おせえよ",
    "line": "おせえよ。おせえよ。",
    "en1": "Too late!",
    "en2": "Took you long enough."
   },
   {
    "ja": "〜を長所に変える",
    "line": "自分の欠点を長所に変えなよね",
    "en1": "Turn your weakness into a strength.",
    "en2": "Make it work for you."
   },
   {
    "ja": "どうしても勝ちたい",
    "line": "どうしても勝ちたい僕は",
    "en1": "I really wanted to win.",
    "en2": "I wanted it bad."
   },
   {
    "ja": "できるんかい",
    "line": "いや、できるんかい。",
    "en1": "Wait, you actually can?",
    "en2": "Oh, so you can?"
   },
   {
    "ja": "おふざけがすぎる",
    "line": "おふざけがすぎるぞ。",
    "en1": "You're taking the joke too far.",
    "en2": "That's going too far."
   },
   {
    "ja": "しょうもないことばっかり",
    "line": "しょうもないことばっかりやりやがって",
    "en1": "Always messing around with dumb stuff.",
    "en2": "Enough with the nonsense."
   },
   {
    "ja": "ちょっと待てよ",
    "line": "ちょっと待てよ。",
    "en1": "Hold on.",
    "en2": "Wait a second."
   },
   {
    "ja": "ある意味気まずい",
    "line": "ある意味気まずいと述べていました。",
    "en1": "It's kind of awkward, in a way.",
    "en2": "It's a little awkward, honestly."
   },
   {
    "ja": "ヘドが出る",
    "line": "きったね飲み方しやがって、ヘドが出るわ。",
    "en1": "It makes me sick.",
    "en2": "Gross."
   },
   {
    "ja": "〜ってもんよ",
    "line": "悪口言いながら飲むってもんよ。",
    "en1": "That's how it's done.",
    "en2": "That's the real way."
   },
   {
    "ja": "いつものように",
    "line": "いつものように職質をされたので",
    "en1": "Got stopped again, like always.",
    "en2": "As usual, they stopped me."
   },
   {
    "ja": "逆に〜してやった",
    "line": "逆にあなたの職業は何ですかと職質返しをしてやった",
    "en1": "So I turned it around on him.",
    "en2": "I flipped it on him."
   },
   {
    "ja": "やれやれ",
    "line": "やれやれ。",
    "en1": "Oh, brother.",
    "en2": "Good grief."
   },
   {
    "ja": "〜かと思いきや",
    "line": "感謝の気持ちを言ってもらえるのかと思いきや",
    "en1": "I thought he'd thank me, but nope.",
    "en2": "Just when I thought he'd say thanks."
   },
   {
    "ja": "いつまで〜続けてんだよ",
    "line": "おめえ、いつまで童貞続けてんだよ。",
    "en1": "How long are you going to keep this up?",
    "en2": "When are you going to get it together?"
   },
   {
    "ja": "失礼しました、間違えました",
    "line": "あ、失礼しました。間違えました。",
    "en1": "Oops, sorry, my bad.",
    "en2": "Sorry, wrong one."
   },
   {
    "ja": "〜は誰にも負けません",
    "line": "女子大生を好きな気持ちは誰にも負けません。",
    "en1": "Nobody loves it more than me.",
    "en2": "I'm number one when it comes to that."
   },
   {
    "ja": "知らぬ存ぜぬを決め込む",
    "line": "本人は知らぬ存ぜぬを決め込み",
    "en1": "He's playing dumb.",
    "en2": "He's acting like he knows nothing."
   },
   {
    "ja": "呑気なことを言う",
    "line": "呑気なことを言ってやがりました。",
    "en1": "Acting like nothing happened.",
    "en2": "Not a care in the world."
   },
   {
    "ja": "いい加減にしろ",
    "line": "お前の犬じゃねえのかよ。いい加減にしろ。",
    "en1": "Knock it off.",
    "en2": "Enough already."
   },
   {
    "ja": "一か八か",
    "line": "一か八かで中華まんのケースに手をかけた",
    "en1": "He just took a shot.",
    "en2": "He rolled the dice."
   },
   {
    "ja": "うるせえ",
    "line": "ああ、うるせえ、うるせえ。",
    "en1": "Oh, shut up.",
    "en2": "Yeah, yeah, whatever."
   },
   {
    "ja": "〜の分際で",
    "line": "童顔野郎の分際でな。",
    "en1": "Who do you think you are?",
    "en2": "Know your place."
   },
   {
    "ja": "膝から崩れ落ちる",
    "line": "私は膝から崩れ落ちました。",
    "en1": "I just collapsed.",
    "en2": "My legs gave out."
   },
   {
    "ja": "〜たい一心で",
    "line": "私と娘に会いたい一心で帰宅を試み",
    "en1": "All he wanted was to see us.",
    "en2": "He just wanted to get home to us."
   },
   {
    "ja": "悔しかっただろう",
    "line": "1%か、悔しかっただろう。",
    "en1": "That must've stung.",
    "en2": "Man, that has to hurt."
   }
  ]
 },
 {
  "date": "2026-10-30",
  "source": {
   "videoId": "g32ZGGqVF6M",
   "channel": "落語流し",
   "title": "落語名作セレクション　『まくら話』　柳家 小三治"
  },
  "rows": [
   {
    "ja": "とうとう〜てしまいました",
    "line": "とうとう今日が来てしまいました。",
    "en1": "Well, the day's finally here.",
    "en2": "Here we go, it's finally today."
   },
   {
    "ja": "へそ曲がり",
    "line": "本当にへそ曲がりっていうか",
    "en1": "She's kind of a contrarian.",
    "en2": "She's got a real stubborn streak."
   },
   {
    "ja": "〜んじゃないかしら",
    "line": "本ができるんじゃないかしらと思ったらしいんですね。",
    "en1": "She figured, hey, maybe there's a book in this.",
    "en2": "She thought it might make a book."
   },
   {
    "ja": "そういうつもりじゃない",
    "line": "私は意外でしたよ。そういうつもりじゃない。",
    "en1": "That's not what I meant to do.",
    "en2": "That was never the plan."
   },
   {
    "ja": "〜さえ思ってる",
    "line": "多少どっかで腹立たしくさえ思ってるんですから。",
    "en1": "Honestly, it kind of ticks me off.",
    "en2": "Part of me is even a little annoyed."
   },
   {
    "ja": "話に乗らない",
    "line": "本題で、なんか話乗らないんですよ。",
    "en1": "She just wasn't into it.",
    "en2": "She didn't bite."
   },
   {
    "ja": "おかげ様で",
    "line": "おかげ様で皆さんに読んでいただく機会も",
    "en1": "Thankfully,",
    "en2": "Thanks to you guys,"
   },
   {
    "ja": "まさか〜とは思わなかった",
    "line": "でもまさかそんなことになるとは思いませんでしたね。",
    "en1": "Never thought it'd turn out like that.",
    "en2": "I didn't see that coming."
   },
   {
    "ja": "違うんですよ",
    "line": "違うんですよ。それはま、怒ることないけど違う。",
    "en1": "Nope, that's not it.",
    "en2": "That's not how it is."
   },
   {
    "ja": "たまたま",
    "line": "たまたま面白い話ばかり並んで",
    "en1": "It just happened to work out.",
    "en2": "It was pure luck."
   },
   {
    "ja": "大概つまんないこと言ってる",
    "line": "普段はね、大概つまんないこと言ってんですよ。",
    "en1": "Most of the time I'm just talking nonsense.",
    "en2": "Usually I'm pretty boring."
   },
   {
    "ja": "〜たっきり",
    "line": "多分ここでやったっきりやってないですよ。",
    "en1": "I only did it that one time.",
    "en2": "Haven't done it since."
   },
   {
    "ja": "知らなきゃ知らなくてもいい",
    "line": "ま、知らなきゃ知らなくてもいいんだけど。",
    "en1": "If you don't know it, no big deal.",
    "en2": "Doesn't matter if you don't."
   },
   {
    "ja": "愛想がない",
    "line": "もう愛想がないんですよ。",
    "en1": "He was so cold.",
    "en2": "Not exactly friendly."
   },
   {
    "ja": "張り倒してやろうか",
    "line": "なんだこの野郎、張り倒してやろうかなと思った。",
    "en1": "I wanted to smack him.",
    "en2": "I almost decked the guy."
   },
   {
    "ja": "反省の色はない",
    "line": "その反省の色はないようですな。",
    "en1": "He doesn't look sorry at all.",
    "en2": "Not an ounce of remorse."
   },
   {
    "ja": "ダメな人はダメ",
    "line": "いくら言ってもダメな人はダメなの。",
    "en1": "Some people just never learn.",
    "en2": "You can't fix some people."
   },
   {
    "ja": "業を煮やす",
    "line": "とうとう業を煮やしてうちにはがきを出したんです。",
    "en1": "He finally got fed up.",
    "en2": "He'd had enough."
   },
   {
    "ja": "逆に言えば",
    "line": "逆に言えば同じ枕をいつまでやってんだ、この野郎",
    "en1": "In other words,",
    "en2": "Translation:"
   },
   {
    "ja": "ご容赦いただきたい",
    "line": "明日どっか行ってやることについてはご容赦いただきたい。",
    "en1": "Cut me some slack on that.",
    "en2": "Please forgive me for that."
   },
   {
    "ja": "引け目を感じる",
    "line": "でもだんだん引け目は感じます。",
    "en1": "I start to feel kind of guilty.",
    "en2": "It starts to get a little awkward."
   },
   {
    "ja": "得てして",
    "line": "ま、得てして覚えてるもんですよ。",
    "en1": "People tend to remember.",
    "en2": "Folks usually remember."
   },
   {
    "ja": "やぶさかではない",
    "line": "同じ話やるのはやぶさかではないとは言っても",
    "en1": "I'm not against it, but",
    "en2": "I don't mind, but"
   },
   {
    "ja": "恐る恐る",
    "line": "恐る恐る始めたのが去年の末頃だったでしょうかね。",
    "en1": "I kind of tiptoed into it.",
    "en2": "I started out pretty nervous."
   },
   {
    "ja": "平気で〜する",
    "line": "人の名前を平気で言うんですよ、あの人は。",
    "en1": "He just drops names like it's nothing.",
    "en2": "He'll say anybody's name, no problem."
   },
   {
    "ja": "〜ならやめろってんだ",
    "line": "とっても恥ずかしいならやめろってんだ。",
    "en1": "If it's so embarrassing, then don't!",
    "en2": "Then just stop!"
   },
   {
    "ja": "かいつまんで",
    "line": "全然わかんない方のためにかいつまんでお話を",
    "en1": "Long story short,",
    "en2": "I'll give you the quick version."
   },
   {
    "ja": "願ったり叶ったり",
    "line": "それはもう願ったり叶ったりですよ。",
    "en1": "That's a dream come true.",
    "en2": "That's exactly what I wanted."
   },
   {
    "ja": "いかがじゃない",
    "line": "いかがでしょうかって、いかがじゃない。",
    "en1": "What do you mean, how about it?",
    "en2": "Are you kidding? Of course!"
   },
   {
    "ja": "〜じゃしょうがない",
    "line": "お花の稽古じゃしょうがないんだな。",
    "en1": "Well, can't argue with that.",
    "en2": "Guess that's that."
   },
   {
    "ja": "いつまでも〜ていられない",
    "line": "私もいつまでも遊んでいられなくなりました。",
    "en1": "I can't just mess around forever.",
    "en2": "Time to grow up."
   },
   {
    "ja": "頭をガーンと殴られた",
    "line": "聞いた途端に頭をガーンって殴られた",
    "en1": "It hit me like a ton of bricks.",
    "en2": "It knocked the wind out of me."
   },
   {
    "ja": "たまらなくなって",
    "line": "私はたまらなくなって立ち上がって",
    "en1": "I couldn't take it anymore.",
    "en2": "It got to be too much."
   },
   {
    "ja": "〜てもらった方が良かった",
    "line": "はっきり書いてもらった方が良かったし",
    "en1": "I wish she'd just said it straight.",
    "en2": "She should've just told me."
   },
   {
    "ja": "まざまざと蘇る",
    "line": "今話してると本当にまざまざと蘇ってきます。",
    "en1": "It's all coming back to me.",
    "en2": "I can see it like it was yesterday."
   }
  ]
 }
];

export const OKIKAE_TOTAL_ROWS = 1028;
