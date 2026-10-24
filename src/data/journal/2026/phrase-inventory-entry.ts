/**
 * 143 - 在庫理論
 * 英会話が怖い人に足りないのは度胸じゃなくて在庫。論文ベースで英会話マスター365の設計思想を語る。
 */

import { JournalEntry } from '../types';

export const phraseInventoryEntry: JournalEntry = {
    id: '143',
    date: '2026-03-24',
    title: '英会話が怖い人に足りないのは度胸じゃなくて在庫',
    summary: 'ネイティブの発話の58.6%は定型フレーズ。文法から文を組み立ててるんじゃない。在庫から引っ張ってる。初心者に必要なのは勇気じゃなくて、口から出せるフレーズの在庫。だから英会話マスター365を作った。',
    featured: true,
    readTime: 7,
    businessTags: ['英語学習', '科学的アプローチ', 'プロダクト設計'],
    techTags: ['SLA', 'formulaic sequences', 'Krashen', 'chunk learning'],

    // ===== Piece 1: Japanese Journal =====
    conversation: `
## カラオケ理論

英会話が怖い。

よく聞く。オンライン英会話を始めたいけど怖い。海外旅行で困りたくないけど何から始めればいいかわからない。

で、みんな同じ結論に行く。

度胸が足りない。

違う。

---

## 足りないのは在庫

カラオケで考えてみてほしい。

カラオケが怖い人。なぜ怖いか。歌が下手だから？違う。歌える曲がないから。

レパートリーが3曲しかない人は怖い。50曲ある人は怖くない。歌唱力の問題じゃない。在庫の問題。

英会話もまったく同じ。

How are you? と聞かれて怖いのは、発音が下手だからじゃない。返し方の在庫がないから。Good. しか出てこない。I'm doing great, thanks. も、Not bad, can't complain. も、Same old, same old. も、在庫にない。

選択肢が1個しかないから怖い。10個あれば怖くない。

---

## ネイティブは文法で喋ってない

これは俺の持論じゃない。論文がある。

Erman & Warren (2000) の研究。ネイティブスピーカーの発話を分析した結果、**58.6%が定型フレーズ**だった。

半分以上。

つまりネイティブは文法ルールから文を組み立ててるんじゃない。頭の中にある大量のフレーズの在庫から、状況に合うやつを引っ張り出してる。

Michael Lewis (1993) はこれを the Lexical Approach と呼んだ。言語は文法化された語彙であって、語彙化された文法ではない。順番が逆。フレーズが先、文法は後。

Pawley & Syder (1983) はもっと直接的に言った。ネイティブっぽい流暢さの正体は、記憶されたフレーズの量。文法力じゃない。

---

## じゃあ何個あればいいのか

ここが面白いところ。

旅行で困らないレベル。50-100フレーズ。

日常会話をなんとかこなせるレベル。300-500フレーズ。

自信を持って会話できるレベル。500-1,000フレーズ。

つまり**300フレーズあれば日常会話はなんとかなる**。

1日10フレーズ覚えれば、1ヶ月で300。

1ヶ月。

TOEICの勉強を3年やっても喋れなかった俺が言う。方向性が間違ってた。単語を1万個覚えるより、フレーズを300個覚えるほうが先。

---

## なぜストーリーなのか

ここからが設計の話。

フレーズを覚えるだけなら単語帳でいい。でも単語帳は続かない。なぜか。

Krashen (1982) の情意フィルター仮説。不安、退屈、義務感があると、脳がインプットを遮断する。フィルターが上がる。どれだけ良い教材でも、フィルターが上がってたら入らない。

逆に言うと、楽しければフィルターが下がる。

だからストーリーにした。

居酒屋を舞台にした連続ドラマ。キャラクターがいて、関係性があって、毎日ちょっとずつ話が進む。ユキがマスターに出会って、タケシと意気投合して、ケンジが加わって、リサが現れて。

学習者はストーリーを追ってるだけ。でもその中で、フレーズに自然に出会う。

---

## 気づきの瞬間

Schmidt (1990) の気づき仮説。言語インプットが実際に身につくためには、学習者がそのフレーズに意識的に気づく瞬間が必要。

ただ聞き流すだけじゃダメ。あ、この表現面白い、と気づく瞬間が必要。

だからUIに仕掛けがある。

ストーリーの中で使われたフレーズを、カードとして取り出す。日本語の解説をつける。4段階の英訳を見せる。直訳から、ネイティブが実際に使う形まで。

ストーリーで出会い、カードで気づき、解説で理解する。この3段階。

Nation (2001) の研究では、文脈の中で出会った語彙は、単語帳で覚えた語彙より記憶に残りやすい。理由は単純で、記憶にストーリーという紐がついてるから。

---

## 既存のアプリと共存する

これは重要なポイント。

英会話マスター365は、Duolingoの代わりじゃない。スタサプの代わりでもない。NativeCampの代わりでもない。

**併用するもの。**

Duolingoで文法の基礎をやる。いい。スタサプでTOEIC対策をやる。いい。でもそのどちらも、口から出せるフレーズの在庫を増やしてはくれない。

英会話マスター365がやるのは、その穴を埋めること。

毎日10フレーズ。ストーリーの中で出会う。解説で理解する。1ヶ月で300フレーズ。

Duolingoの5分のあとに、これの5分。合計10分。それだけで、オンライン英会話を始めるときの恐怖が消える。なぜなら在庫があるから。

---

## 在庫があれば怖くない

海外旅行のホテルで。

Could I get a late checkout? が在庫にあれば、フロントに行ける。

Is breakfast included? が在庫にあれば、聞ける。

I think there's something wrong with the AC. が在庫にあれば、困ったときに対処できる。

全部、文法から組み立ててたら3秒フリーズする。でもフレーズとして在庫にあれば、0.5秒で出る。

これがチャンク学習の力。Wray (2002) が言う、記憶から丸ごと取り出して使う。文法で生成するんじゃない。取り出す。

---

## 1日10個、まず30日

英会話マスター365。

365日分のフレーズを用意する。毎日10個。キャラクターのストーリーに乗せて届ける。

でもまずは30日。

30日で300フレーズ。これが最初のゴール。

300フレーズの在庫を持った状態で、オンライン英会話の無料体験を受けてみてほしい。びっくりするはず。あれ、意外と喋れる、って。

喋れる理由は簡単。在庫があるから。

度胸は最初から足りてた。足りなかったのは在庫。
`,

    // ===== Piece 2: English Summary (Pro - Expression Teaching) =====
    englishSummary: {
        title: "Five Expressions from the Phrase Inventory Episode",
        readTime: 5,
        sections: [
            {
                heading: "Can't complain -- 文句言えない（まあまあ良い）",
                paragraphs: [
                    "When someone asks how you're doing, most Japanese learners default to 'I'm fine.' And that works. But native speakers almost never say 'I'm fine' -- it actually sounds a little cold or dismissive. One of the most natural alternatives is 'Can't complain.' It literally means there's nothing worth complaining about, which is a very roundabout way of saying things are pretty good.",
                    "You'll hear this constantly in casual settings. 'How's work?' 'Can't complain.' 'How's the new apartment?' 'Can't complain, honestly.' It carries this easygoing, modest energy -- like, things aren't perfect, but they're solid. You can also stretch it: 'Can't complain, the weather's been nice,' or just leave it as a standalone response.",
                    "The beauty of this phrase is that it works in almost any 'how are you' situation. Stack it with 'Same old, same old' for variety, or upgrade to 'Not too shabby' when things are actually going well. Having three or four of these in your inventory means you never freeze on the most basic question in English."
                ],
                japaneseParagraphs: [
                    "How are you? に対して I'm fine. と答える日本人は多い。文法的には正しいけど、ネイティブはほぼ使わない。むしろちょっと冷たく聞こえる。代わりに使うのが Can't complain. 直訳すると文句は言えない。つまり、まあ悪くないよ、くらいのニュアンス。",
                    "日常会話でめちゃくちゃ出てくる。仕事どう？Can't complain. 新しい部屋は？Can't complain, honestly. 肩肘張らない、謙虚なトーン。完璧じゃないけど悪くない、という絶妙な温度感。",
                    "この1フレーズだけで How are you? への恐怖が消える。在庫が1個から2個に増えるだけで世界が変わる。Same old, same old.（いつも通り）や Not too shabby.（なかなかいいよ）も合わせて覚えれば、一番基本的な質問でフリーズすることは二度とない。"
                ],
            },
            {
                heading: "Could I get...? -- いただけますか（丁寧なお願いの万能形）",
                paragraphs: [
                    "If you learn one single phrase for travel, make it this one. 'Could I get a late checkout?' 'Could I get some extra towels?' 'Could I get the check?' This structure handles about eighty percent of all requests you'll ever need to make in English. Hotels, restaurants, airports, shops -- it works everywhere.",
                    "The reason 'Could I get' is so powerful is that it's polite without being stiff. 'May I have' sounds overly formal. 'Give me' sounds rude. 'I want' sounds like a toddler. 'Could I get' sits right in that sweet spot of casual and respectful. Native speakers use it dozens of times a day without thinking about it.",
                    "You can swap 'get' for other verbs too: 'Could I have a window seat?' 'Could I grab a coffee?' 'Could I borrow your charger for a sec?' But honestly, just 'Could I get' plus any noun will carry you through ninety percent of situations. That's the power of chunk learning -- one pattern, infinite applications."
                ],
                japaneseParagraphs: [
                    "旅行英語で1つだけ覚えるなら、これ。Could I get a late checkout? Could I get some extra towels? Could I get the check? この型だけで英語のお願いの8割をカバーできる。ホテル、レストラン、空港、全部いける。",
                    "なぜ Could I get が最強かというと、丁寧だけど堅くない。May I have は堅すぎる。Give me は失礼。I want は幼児。Could I get はカジュアルと丁寧のちょうど真ん中。ネイティブは1日に何十回も無意識に使ってる。",
                    "これがチャンク学習の力。文法ルールから Could + I + get + 名詞 と組み立てるんじゃなくて、Could I get... を1つの塊として丸ごと覚える。あとは後ろに欲しいものをくっつけるだけ。1パターンで無限に応用が効く。"
                ],
            },
            {
                heading: "I think there's something wrong with... -- 何か調子悪いみたいで（トラブル報告）",
                paragraphs: [
                    "This is your emergency phrase. Something breaks in your hotel room, your rental car makes a weird noise, the Wi-Fi is down -- this one sentence handles all of it. 'I think there's something wrong with the AC.' 'I think there's something wrong with the lock.' It's polite, it's clear, and it doesn't require you to know the technical vocabulary for what's actually broken.",
                    "The 'I think' at the beginning is genius because it softens everything. You're not accusing anyone. You're not demanding. You're just reporting an observation. Japanese learners often try to explain the problem in detail and get lost in complex sentences. This phrase skips all of that. Point at the thing, say the phrase, done.",
                    "Related phrases that pair well: 'It's not working' for electronics, 'It won't open' or 'It won't close' for mechanical things, 'It's making a weird noise' for anything that sounds off. Build a small toolkit of these problem-reporting phrases and suddenly traveling alone doesn't feel so terrifying."
                ],
                japaneseParagraphs: [
                    "緊急用フレーズ。ホテルの部屋で何か壊れた、レンタカーから変な音がする、Wi-Fiが繋がらない。全部これ1文で対処できる。I think there's something wrong with the AC. 故障の専門用語を知らなくても、これで伝わる。",
                    "冒頭の I think が天才的。断定してない。クレームしてない。観察を報告してるだけ。日本人は問題を詳しく説明しようとして複雑な文を作り、途中で詰まる。このフレーズはそれを全部スキップする。壊れたものを指差して、この一文、終了。",
                    "関連フレーズも合わせて在庫に入れると強い。電子機器なら It's not working. 開かない閉まらないなら It won't open / close. 変な音なら It's making a weird noise. この5つくらいのツールキットがあれば、1人旅の恐怖が激減する。"
                ],
            },
            {
                heading: "Same old, same old -- いつも通りだよ（定番の返し）",
                paragraphs: [
                    "Here's another 'How are you?' response, and this one's fun because it has personality. 'Same old, same old' means nothing's changed, everything's the usual routine. There's a slight hint of resignation in it -- like, yeah, nothing exciting, but I'm not complaining either. It's the verbal equivalent of a shrug.",
                    "What makes this phrase great for beginners is the rhythm. It's literally the same two words repeated. Easy to remember, easy to pronounce, and it sounds incredibly natural. You can extend it too: 'Same old, same old. Work, sleep, repeat.' Or answer a specific question with it: 'How's the project going?' 'Same old, same old -- still waitin' on approvals.'",
                    "Stack this with 'Can't complain' and 'Not bad, not bad' and you've got three completely different ways to answer the same question. That's what inventory does -- it gives you options. Options kill anxiety. Nobody's scared of a conversation when they've got three ready-made answers in their back pocket."
                ],
                japaneseParagraphs: [
                    "How are you? のもう1つの返し方。いつも通り、変わりなし、という意味。ちょっとした諦めのニュアンスが入ってる。特に何もないけど、別に悪くもない。言葉にした肩すくめ。",
                    "初心者に嬉しいのはリズム。同じ2語の繰り返し。覚えやすい、発音しやすい、そして驚くほど自然に聞こえる。後ろに足してもいい。Same old, same old. Work, sleep, repeat. プロジェクトどう？Same old, same old -- まだ承認待ち。",
                    "Can't complain. と Not bad, not bad. を合わせれば、同じ質問に3通りの返し方ができる。これが在庫の力。選択肢があると不安が消える。ポケットに答えが3つ入ってる人は、会話が怖くない。"
                ],
            },
            {
                heading: "Is ... included? -- ...は含まれてますか（確認の基本形）",
                paragraphs: [
                    "Travel situation number one: you're at a hotel, a tour desk, or a restaurant, and you need to know what's covered. 'Is breakfast included?' 'Is Wi-Fi included?' 'Is the tip included?' This one phrase prevents ninety percent of travel surprises. No hidden fees, no awkward moments at checkout.",
                    "The structure is dead simple. Is + thing + included. That's it. You don't need to say 'Excuse me, I was wondering whether the morning meal is part of the accommodation package.' Just -- 'Is breakfast included?' Four words. The person at the desk answers yes or no. Transaction complete.",
                    "Pair it with 'Does it come with...?' for a slight variation: 'Does it come with a charger?' 'Does the room come with a minibar?' Between 'Is X included?' and 'Does it come with X?', you can verify literally anything about any service or product. Two phrases. That's your entire confirmation toolkit."
                ],
                japaneseParagraphs: [
                    "旅行で一番使う確認フレーズ。Is breakfast included? Is Wi-Fi included? Is the tip included? これ1文で旅行中のサプライズの9割を防げる。隠れた料金なし、チェックアウトで気まずい思いなし。",
                    "構造が超シンプル。Is + モノ + included. 以上。Excuse me, I was wondering whether... みたいな長い前置きは要らない。Is breakfast included? 4語。相手は Yes か No で答える。やり取り完了。",
                    "Does it come with...? もセットで覚えると鬼に金棒。Does it come with a charger? Does the room come with a minibar? この2パターンで、あらゆるサービスや商品の中身を確認できる。確認の在庫、これだけで完成。"
                ],
            },
        ],
    },

    // ===== Piece 3: Memoria (SAME topic as journal) =====
    conversationData: {
        english: [
            { speaker: 'male', text: "So I've been reading these linguistics papers." },
            { speaker: 'female', text: "Oh no. What'd you find?" },
            { speaker: 'male', text: "OK so -- Erman and Warren, 2000. They analyzed native English speech. And fifty-eight point six percent of it is formulaic." },
            { speaker: 'female', text: "Formulaic meaning...?" },
            { speaker: 'male', text: "Pre-built chunks. Set phrases. Not sentences assembled from grammar rules, but whole phrases pulled from memory. Like, when someone says 'How's it going,' they're not constructing that from 'how' plus 'is' plus 'it' plus a gerund. It's one unit. Stored whole, retrieved whole." },
            { speaker: 'female', text: "So more than half of what we say is basically... copy-paste." },
            { speaker: 'male', text: "Copy-paste! That's -- yeah, that's exactly it. And that blew my mind because I've been trying to learn English the wrong way this whole time. Grammar rules. Sentence construction. Subject-verb-object. But native speakers aren't doing that. They're reaching into a drawer of pre-made phrases and grabbing the right one." },
            { speaker: 'female', text: "A drawer." },
            { speaker: 'male', text: "Inventory. Think of it like -- OK, karaoke. Why are some people scared of karaoke?" },
            { speaker: 'female', text: "Because they can't sing?" },
            { speaker: 'male', text: "No. Because they don't have songs. If you know fifty songs, karaoke's fun. If you know three, it's terrifying. It's not about vocal talent. It's about repertoire. Inventory." },
            { speaker: 'female', text: "And you're saying English conversation is the same thing." },
            { speaker: 'male', text: "Exactly the same thing. People think they're scared of speaking English because they lack courage. They don't lack courage. They lack inventory. They've got 'I'm fine' and 'Thank you' and that's it. Of course it's scary. You're going on stage with three songs." },
            { speaker: 'female', text: "So how many phrases do you actually need?" },
            { speaker: 'male', text: "This is the wild part. For basic travel survival? Fifty to a hundred. For daily conversation? Three hundred to five hundred. That's it. Three hundred phrases and you can handle most everyday situations." },
            { speaker: 'female', text: "Three hundred doesn't sound like a lot." },
            { speaker: 'male', text: "It's not! At ten a day, that's one month. One month of learning ten phrases a day, and your entire relationship with English changes. Not because you got smarter or braver. Because your drawer got fuller." },
            { speaker: 'female', text: "OK but memorizing three hundred phrases from a list sounds miserable." },
            { speaker: 'male', text: "That's why I'm not using a list. There's this other paper -- Nation, 2001. Vocabulary learned in context, through stories, sticks way better than vocabulary from flashcards. Because the phrase gets anchored to a character, a situation, an emotion. It's not floating in a void." },
            { speaker: 'female', text: "So that's why you built it around the izakaya story." },
            { speaker: 'male', text: "Yeah. You follow Yuki meeting Master Gondo, you see Takeshi struggling with the same stuff you are, and the phrases come up naturally in the conversation. You're not studying. You're following a story. And the phrases ride along for free." },
            { speaker: 'female', text: "But wait -- doesn't that only work for, like, izakaya vocabulary?" },
            { speaker: 'male', text: "No, because the conversations branch out. They talk about travel. Work. Family. Ordering food. Complaining about weather. The setting is an izakaya, but the phrases are universal. 'Could I get a late checkout' has nothing to do with an izakaya, but it shows up when Lisa talks about her trip to Hawaii." },
            { speaker: 'female', text: "That's actually clever. And this isn't competing with Duolingo or anything?" },
            { speaker: 'male', text: "No. That's the thing I keep telling people. Use Duolingo. Use whatever you want. This fills the gap that those apps don't touch. Duolingo teaches you grammar patterns. This gives you the actual phrases you'll need when you open your mouth." },
            { speaker: 'female', text: "The inventory that other apps don't build." },
            { speaker: 'male', text: "Right. Krashen -- another researcher -- talks about the affective filter. When you're anxious, your brain literally blocks language acquisition. Textbooks raise anxiety. Tests raise anxiety. A story about people hanging out at a bar? That lowers it. You're relaxed, you're curious about what happens next, and while your guard is down, the phrases sneak in." },
            { speaker: 'female', text: "Sneaky education." },
            { speaker: 'male', text: "The sneakiest. And then Schmidt, 1990, says you need a 'noticing' moment. You can't just passively absorb. There has to be a moment where you go, 'Oh, that's a useful phrase.' That's what the cards do. The story delivers the phrase, the card makes you notice it, the explanation makes you understand it." },
            { speaker: 'female', text: "Story, card, explanation. Three steps." },
            { speaker: 'male', text: "Three steps. And after thirty days, you've got three hundred phrases. You go try an online English lesson, and suddenly you're not frozen anymore. Because you've got inventory. Your drawer is full." },
            { speaker: 'female', text: "The courage was there all along." },
            { speaker: 'male', text: "The courage was always there. People just needed songs to sing." },
        ],
        japanese: [
            { speaker: 'male', text: "言語学の論文を読んでたんだけど。" },
            { speaker: 'female', text: "あらら。何が分かったの？" },
            { speaker: 'male', text: "Erman & Warren、2000年の研究。ネイティブの英語の発話を分析したら、58.6%が定型フレーズだった。" },
            { speaker: 'female', text: "定型フレーズって？" },
            { speaker: 'male', text: "組み立て済みのかたまり。文法ルールから文を組み立てるんじゃなくて、記憶からフレーズを丸ごと引っ張り出す。How's it going って言うとき、how + is + it + 動名詞って組み立ててない。1つのユニット。丸ごと保存、丸ごと取り出し。" },
            { speaker: 'female', text: "つまり半分以上がコピペ。" },
            { speaker: 'male', text: "コピペ！まさにそう。で、これに衝撃を受けたのが、俺ずっと英語の勉強の仕方を間違えてた。文法ルール。文の構造。主語-動詞-目的語。でもネイティブはそうやって喋ってない。引き出しから出来合いのフレーズを取り出してる。" },
            { speaker: 'female', text: "引き出し。" },
            { speaker: 'male', text: "在庫。カラオケで考えてみて。なんでカラオケが怖い人がいるか。" },
            { speaker: 'female', text: "歌が下手だから？" },
            { speaker: 'male', text: "違う。曲を知らないから。50曲知ってたらカラオケは楽しい。3曲しか知らなかったら恐怖。歌唱力の問題じゃない。レパートリーの問題。在庫。" },
            { speaker: 'female', text: "英会話も同じだと。" },
            { speaker: 'male', text: "まったく同じ。英語を話すのが怖いのは度胸がないからだと思ってる人が多い。度胸の問題じゃない。在庫の問題。I'm fine と Thank you しかない。そりゃ怖いよ。3曲でステージに立つようなもん。" },
            { speaker: 'female', text: "で、実際何フレーズあればいいの？" },
            { speaker: 'male', text: "ここがすごいところ。旅行サバイバルなら50-100。日常会話なら300-500。300フレーズあれば日常のほとんどの場面に対応できる。" },
            { speaker: 'female', text: "300って意外と少ない。" },
            { speaker: 'male', text: "少ない！1日10個で1ヶ月。1ヶ月で英語との関係が変わる。頭が良くなったからでも勇気が出たからでもない。引き出しが充実したから。" },
            { speaker: 'female', text: "でもリストから300フレーズ暗記するのはキツくない？" },
            { speaker: 'male', text: "だからリストは使わない。Nation、2001年の研究。文脈の中で、ストーリーを通じて出会った語彙は、フラッシュカードより定着する。フレーズがキャラクターや状況や感情に紐づくから。空中に浮いてない。" },
            { speaker: 'female', text: "だから居酒屋のストーリーにしたんだ。" },
            { speaker: 'male', text: "そう。ユキがマスターに出会って、タケシが同じ悩みを抱えてて、フレーズが会話の中で自然に出てくる。勉強してる感覚がない。ストーリーを追ってるだけ。フレーズはおまけでついてくる。" },
            { speaker: 'female', text: "でもそれだと居酒屋の語彙しか覚えなくない？" },
            { speaker: 'male', text: "いや、会話は枝分かれする。旅行の話、仕事の話、家族の話、注文、天気の愚痴。舞台は居酒屋だけど、フレーズは汎用。Could I get a late checkoutは居酒屋と関係ないけど、リサがハワイ旅行の話をするときに出てくる。" },
            { speaker: 'female', text: "なるほど。で、Duolingoとかとは競合しない？" },
            { speaker: 'male', text: "しない。そこが大事。Duolingoでもなんでも使えばいい。これが埋めるのは、他のアプリが触れない穴。Duolingoは文法パターンを教える。これは実際に口から出すフレーズを渡す。" },
            { speaker: 'female', text: "他のアプリが作らない在庫を作る。" },
            { speaker: 'male', text: "そう。Krashenっていう研究者が情意フィルターの話をしてる。不安があると脳が言語習得をブロックする。教科書は不安を上げる。テストも上げる。バーで人がダベってるストーリーは？下げる。リラックスして、次どうなるか気になって、ガードが下がったところにフレーズが忍び込む。" },
            { speaker: 'female', text: "こっそり教育。" },
            { speaker: 'male', text: "最高にこっそり。で、Schmidt、1990年。気づきの瞬間が必要だと。受動的に吸収するだけじゃダメ。あ、これ使えるフレーズだ、と気づく瞬間が要る。それがカードの役割。ストーリーがフレーズを届けて、カードが気づかせて、解説が理解させる。" },
            { speaker: 'female', text: "ストーリー、カード、解説。3ステップ。" },
            { speaker: 'male', text: "3ステップ。で、30日後に300フレーズ。オンライン英会話を試してみる。フリーズしない。なぜなら在庫があるから。引き出しが満杯。" },
            { speaker: 'female', text: "度胸は最初からあった。" },
            { speaker: 'male', text: "度胸はずっとあった。足りなかったのは歌える曲。" },
        ],
        tone: 'reflective' as const,
        generatedAt: new Date('2026-03-24'),
    },

    // ===== Piece 4: Tangent (COMPLETELY DIFFERENT topic) =====
    tangentData: {
        english: [
            { speaker: 'male', text: "I burned my tongue on miso soup this morning." },
            { speaker: 'female', text: "Happens to everyone." },
            { speaker: 'male', text: "No but like -- I REALLY burned it. And now everything tastes weird. Had coffee after, and it tasted like hot metal. Ate a rice ball and it was just... texture. No flavor." },
            { speaker: 'female', text: "Your tongue's on strike." },
            { speaker: 'male', text: "My tongue is absolutely on strike. And it got me thinking about how we just... take taste for granted? Like, I never once woke up and thought 'I'm grateful I can taste things today.' Not once. But the second it's gone, it's the only thing I can think about." },
            { speaker: 'female', text: "That's very human. Only noticing what you have when it's gone." },
            { speaker: 'male', text: "Right? And I started down this weird rabbit hole. I looked it up -- we have about ten thousand taste buds. Each one regenerates every ten to fourteen days. So the taste buds I burned this morning? They'll be back in two weeks. Brand new. Like nothing happened." },
            { speaker: 'female', text: "That's actually reassuring." },
            { speaker: 'male', text: "It is! But here's the thing that got me -- taste buds are one of the fastest-regenerating cells in the body. Your entire sense of taste completely replaces itself every two weeks. Which means the tongue I had at the beginning of the month is literally a different tongue than the one I have now." },
            { speaker: 'female', text: "Ship of Theseus, but for tongues." },
            { speaker: 'male', text: "Tongue of Theseus! And that means -- does food actually taste the same to me now as it did last month? Like, objectively? Because the hardware's different. Every two weeks I've got a fresh set of sensors." },
            { speaker: 'female', text: "Hmm. But your brain interprets the signals the same way, right?" },
            { speaker: 'male', text: "Maybe? But taste changes with age. Things you hated as a kid, you love now. Is that the brain changing or the buds changing? Or both? I hated coffee at fifteen. Now it's the reason I get out of bed." },
            { speaker: 'female', text: "The coffee thing might just be exhaustion." },
            { speaker: 'male', text: "Ha! Fair. But seriously -- cilantro. Some people taste soap. It's genetic. So two people eating the exact same bowl of pho are having completely different experiences. Same input, different output. That's wild to me." },
            { speaker: 'female', text: "We're literally living in different flavor universes." },
            { speaker: 'male', text: "Different flavor universes! And nobody talks about it! You go to a restaurant with someone and say 'this is delicious' and they agree, but you have NO idea if their 'delicious' and your 'delicious' are even remotely the same experience." },
            { speaker: 'female', text: "You burned your tongue on miso soup and ended up in an existential crisis." },
            { speaker: 'male', text: "I burned my tongue on miso soup and discovered that shared reality might be an illusion. Anyway, do you have any ice cream? My mouth still hurts." },
        ],
        japanese: [
            { speaker: 'male', text: "今朝、味噌汁で舌やけどした。" },
            { speaker: 'female', text: "あるある。" },
            { speaker: 'male', text: "いや、ガチでやけどした。で、全部の味がおかしい。コーヒー飲んだら熱い金属の味。おにぎり食べたら食感だけ。味ゼロ。" },
            { speaker: 'female', text: "舌がストライキ中。" },
            { speaker: 'male', text: "完全にストライキ。で、思ったんだけど、味覚って当たり前すぎない？今日も味がわかることに感謝、なんて1回も思ったことない。でも失った瞬間、それしか考えられなくなる。" },
            { speaker: 'female', text: "人間ってそういうもんだよね。なくなって初めて気づく。" },
            { speaker: 'male', text: "で、変なうさぎ穴に入っちゃって。調べたら、味蕾って約1万個あって、10-14日で全部再生する。今朝やけどした味蕾、2週間で復活。まっさら。何事もなかったかのように。" },
            { speaker: 'female', text: "それは安心する。" },
            { speaker: 'male', text: "でしょ。でもここからがすごくて。味蕾は体の中で最も再生が早い細胞の1つ。味覚全体が2週間で完全に入れ替わる。つまり月初の俺の舌と、今の俺の舌は、物理的に別物。" },
            { speaker: 'female', text: "テセウスの船。舌版。" },
            { speaker: 'male', text: "テセウスの舌！で、ということは -- 先月と今月で食べ物の味って本当に同じ？ハードウェアが違うんだから。2週間ごとにセンサーが全交換。" },
            { speaker: 'female', text: "うーん。でも脳の解釈は同じでしょ？" },
            { speaker: 'male', text: "かも？でも味覚って年齢で変わるじゃん。子供の頃嫌いだったものが今は好き。脳が変わったのか味蕾が変わったのか。両方？15歳のときコーヒー無理だった。今は起きる理由。" },
            { speaker: 'female', text: "コーヒーは単に疲労では。" },
            { speaker: 'male', text: "は！確かに。でもさ -- パクチー。石鹸の味がする人がいる。遺伝子。同じフォーを食べてる2人が、完全に違う味覚体験をしてる。同じ入力、違う出力。やばくない？" },
            { speaker: 'female', text: "文字通り別の味覚宇宙に住んでる。" },
            { speaker: 'male', text: "別の味覚宇宙！で、誰もそれ言わない。レストランで美味しいねって言って相手も頷く。でもその人の美味しいと自分の美味しいが同じ体験かどうか、まったくわからない。" },
            { speaker: 'female', text: "味噌汁で舌やけどして実存的危機に突入した。" },
            { speaker: 'male', text: "味噌汁で舌やけどして共有現実が幻想かもしれないことに気づいた。で、アイスある？まだ口痛い。" },
        ],
        tone: 'humorous' as const,
        generatedAt: new Date('2026-03-24'),
    },
};
