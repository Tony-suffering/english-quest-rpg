/**
 * 145 - クライアントのプロフィールページをAIで作った
 * クロス工事の現場でクライアントの経歴を調べて感動して、1日でプロフィールページを作った話
 */

import { JournalEntry } from '../types';

export const clientProfilePageEntry: JournalEntry = {
    id: '145',
    date: '2026-04-04',
    title: 'クロス職人がAIでクライアントのプロフィールページを作った話',
    summary: '壁紙を張り替えに行った先のクライアントが、30年日本で活躍してきた凄い人だった。感銘を受けて、Claude Codeで1日でプロフィールページを作った。',
    featured: false,
    readTime: 5,
    businessTags: ['AI活用', '顧客対応', 'ブランディング'],
    techTags: ['Claude Code', 'Next.js', 'framer-motion', 'UI/UX'],

    // ===== Piece 1: Japanese Journal =====
    conversation: `
## 壁紙の向こう側に何がある

クロスの張り替え工事に行った。

都内の住宅。工事自体は普通の案件。壁紙を剥がして、下地を整えて、新しいクロスを貼る。269平米。2週間。いつもの仕事。

で、現場で話しているうちに、このクライアントがただの人じゃないことに気づいた。

30年以上日本で活動してきた外国人のコンサルタント。国会議員の事務所で働いた経験がある。有名な経済誌に論文を書いている。世界的なメディアにコメンテーターとして出ている。巨大企業の日本進出を助けてきた。

壁紙を張り替えに来ただけなのに、目の前にいる人のスケールが全然違った。

## 調べ始めたら止まらなくなった

その夜、調べた。

論文を読んだ。1997年に書かれた記事で、日本の経済構造の崩壊を予測していた。当時はまだ「一時的な不況」と言われていた時代に。で、その予測は全部当たった。

海外メディアの引用を追った。大企業の幹部逮捕事件で、世界中のメディアが最初に電話するのがこの人だった。

経歴を辿っていくと、政治と経済と学術の3つの世界を橋渡ししてきた人物像が見えてきた。こういう人は、日本に片手で数えるほどしかいない。

で、思った。

この人のことを、この人自身よりも丁寧にまとめたページを作ったら面白いんじゃないか。

## Claude Codeで1日で作った

翌日、Claude Codeを起動した。

リサーチから始めた。論文の引用、メディア出演、講演歴、関わった業界。全部AIに調べさせて、裏を取って、構成を考えた。

で、Next.jsでページを作った。framer-motionでアニメーション。タイピングエフェクト。clipPathで斜めのカード。ゴールドとエメラルドのカラースキーム。

5章構成のナラティブにした。「予測」「内部者」「架け橋」「発言者」「次の章」。ただの経歴紹介じゃなくて、30年の物語として。

1日で完成した。

これ、普通に外注したら何十万円かかるレベルのページだと思う。それをAIと一緒に、コード書きながら、1日で。

## 建築業界の正直な話も書いた

面白いのは、このクライアントが「建築業界は一番ひどい業界だ」と言っていたこと。

銀行、製薬、テクノロジー、航空。色んな業界を見てきた人が、リフォーム業界が最悪だと。

正直、否定できない。

金額が大きいのに、それを判断する知識をクライアントが持っていないことが多い。その情報の非対称性を、改善じゃなく悪用する人が一定数いる。他の業界より多い。

でもこのクライアントは違う。30年間、情報の非対称性を読み解くのが仕事だった人。こっちが手を抜いたら一発でバレる。

それをページに正直に書いた。「あなたのような人が怖くもあり、清々しくもある」と。

## 技術的にはこれが面白い

今回の技術的なポイントは「リサーチ→ストーリーテリング→デザイン→実装」を全部AIとやったこと。

最初はLinkedInの情報をそのまま並べた。クライアントに見せたら「これじゃ価値がない」と言われた（自分で言った）。

リンクトインのコピペに意味はない。誰でもできる。

価値があるのは、散らばった情報を一つの物語にすること。1997年の論文と2020年のニュースコメントを繋げて、30年の軌跡として見せること。

UIも3回作り直した。最初は静的なテキスト。次にアニメーション追加。最後にタイピングエフェクトとcinematic演出を入れて、スクロールするたびに章が開いていく構造にした。

あと、進捗報告用のカレンダーUIも付けた。工事の何日目に何をしたか、フロアごとにフィルタリングできる。ステータス表示付き。これも1日。

## 全部つながっている

壁紙の直線が出せなくてクライアントに怒られた。

そこから「この人は誰なんだ」と調べた。

調べたら凄い人だった。

凄い人にふさわしいページを作った。

建築業界の問題点を正直に書いた。

AIのスキルを見せた。

全部つながっている。壁紙の施工ミスから始まって、リサーチ、ストーリーテリング、コーディング、デザイン、顧客対応、全部が1本の線になった。

内装屋がClaude Codeでクライアントのプロフィールページを作る。

普通はそんなことしない。でも、それが面白いんだと思う。
`,
};
        readTime: 5,
        sections: [
            {
                heading: "Look Someone Up -- 調べる、検索する",
                paragraphs: [
                    "'We came to renovate your walls. Then we looked you up.' That's the opening line of the whole page. 'Look someone up' means to search for information about a person. It's casual, a little nosy, and perfectly captures what happened -- a renovation crew Googled their client and fell down a rabbit hole.",
                    "The usage is super flexible. 'I looked up my old college roommate on LinkedIn.' 'She looked him up before the first date.' 'Don't look me up, you'll find embarrassing photos.' It always implies intentional searching -- you made a decision to go find out about someone. It's not accidental discovery.",
                    "Related: 'look into' is more formal and investigative -- 'The police are looking into the case.' 'Check out' is more casual -- 'Check out this article.' 'Dig up' implies finding something hidden -- 'They dug up some old photos.' And 'stalk' is the creepy version -- 'Are you stalking my Instagram?' The line between 'looking someone up' and 'stalking' is basically how many tabs you have open.",
                ],
                japaneseParagraphs: [
                    "'We looked you up' がページの導入。「あなたのことを調べました」。'Look someone up' = 人の情報を検索する。カジュアルで、ちょっとおせっかいなニュアンス。内装屋がクライアントをGoogleで調べて沼にハマった、という状況にぴったり。",
                    "使い方は幅広い。'I looked up my old roommate on LinkedIn'（昔のルームメイトをLinkedInで検索した）。デートの前に相手を調べる、友達の名前を検索する、全部これ。ポイントは「意図的に調べた」ということ。偶然見つけたのとは違う。",
                    "仲間: 'look into' = もっとフォーマルで調査的（「警察が調べている」）。'check out' = もっとカジュアル（「この記事見て」）。'dig up' = 隠れたものを掘り出す。'stalk' = ストーキング（怖い版）。'look someone up'と'stalk'の境界線は、ブラウザのタブの数で決まる。",
                ],
            },
            {
                heading: "Blown Away -- 度肝を抜かれる、圧倒される",
                paragraphs: [
                    "'We were honestly blown away by what we found.' Blown away means completely shocked or overwhelmed, usually in a positive way. The image is literally being knocked off your feet by a blast of wind. You didn't expect it, and it hit you hard. In the Memoria, the renovation guy finds out his client is basically a political power broker, and his brain short-circuits.",
                    "It's one of those expressions that works for everything impressive. 'The food at that restaurant blew me away.' 'Her presentation blew everyone away.' 'I was blown away by how fast he finished the project.' You can also 'blow someone's mind' which is slightly more intellectual, or 'knock someone's socks off' which is more playful.",
                    "The intensity scale: 'surprised' (mild) -> 'impressed' (moderate) -> 'blown away' (strong) -> 'mind-blown' (extreme). If you say you were 'blown away,' people understand you mean genuinely, deeply impressed -- not just politely nodding. It carries emotional weight. And the past tense 'blew me away' sounds even more natural in conversation than 'blown away.'",
                ],
                japaneseParagraphs: [
                    "'Blown away' = 度肝を抜かれる。文字通り「風で吹き飛ばされる」イメージ。予想してなかったことに圧倒される。Memoriaで内装屋がクライアントの経歴を知って脳がショートする場面 -- まさにこれ。基本的にポジティブな驚き。",
                    "印象的なこと全般に使える万能表現。料理、プレゼン、スピード、才能。'blow someone's mind' はもっと知的な驚き。'knock someone's socks off' はもっと遊び心がある。どれも「すごすぎて言葉を失う」系。",
                    "強度スケール: 'surprised'（軽い）→ 'impressed'（普通）→ 'blown away'（強い）→ 'mind-blown'（最強）。'Blown away' と言ったら、礼儀的に感心してるんじゃなく、心から圧倒されたという意味。感情の重みがある。会話では 'blew me away' の過去形がより自然。",
                ],
            },
            {
                heading: "Cut Corners -- 手を抜く、手抜きする",
                paragraphs: [
                    "'We do not cut corners, and we do not make excuses.' Cutting corners means doing something the cheap or easy way, skipping steps you should take. The origin is literal -- instead of walking around a corner properly, you cut across the grass to save time. In construction, cutting corners can mean using cheaper materials, skipping preparation steps, or not doing proper substrate work.",
                    "This one shows up everywhere in business. 'They cut corners on safety and people got hurt.' 'I know we're behind schedule but we can't cut corners on testing.' 'That contractor definitely cut some corners -- look at these walls.' It's always negative. Nobody brags about cutting corners. If someone accuses you of cutting corners, it's a serious insult to your work ethic.",
                    "Related: 'half-ass it' is the vulgar version -- doing a lazy, incomplete job. 'Phone it in' means going through the motions without real effort. 'Skimp on' is specifically about using less of something than you should -- 'They skimped on the materials.' And 'do it right' or 'do it by the book' are the positive opposites. In Japanese construction, 'cutting corners' might be the most accurate two-word summary of the industry's biggest problem.",
                ],
                japaneseParagraphs: [
                    "'Cut corners' = 手を抜く。語源は角を曲がらずに芝生を斜めに横切ること。時間や金を節約するために、やるべき手順を省く。建築業界では下地処理を省く、安い材料を使う、検査をスキップする -- 全部 'cutting corners'。",
                    "ビジネス全般で使う。'They cut corners on safety'（安全面で手を抜いた）。常にネガティブ。hand抜きを自慢する人はいない。「手を抜いてるだろ」と言われたら、仕事への真剣さを否定する深刻な侮辱。",
                    "仲間: 'half-ass it' = いい加減にやる（下品版）。'phone it in' = やる気なくこなす。'skimp on' = ケチる（'skimped on materials' = 材料をケチった）。反対語は 'do it right' 'do it by the book'。建築業界の最大の問題を2語で要約するなら 'cutting corners' が一番正確。",
                ],
            },
            {
                heading: "Information Asymmetry -- 情報の非対称性",
                paragraphs: [
                    "'Large sums of money change hands in an industry where clients rarely have the technical knowledge to evaluate what they are paying for.' That's information asymmetry in action. One side knows way more than the other, and that gap can be exploited. It's an economics term that jumped into everyday business language because it explains SO many problems.",
                    "You hear it in healthcare ('the doctor knows more than you'), finance ('your broker knows more than you'), car repair ('the mechanic knows more than you'), and obviously construction. 'There's a huge information asymmetry between the contractor and the homeowner.' The person with less information is at a disadvantage -- they can't tell if the price is fair, if the work is done right, or if they even need the service.",
                    "In casual conversation, you don't always need the full term. 'They know stuff we don't' gets the same idea across. 'The deck is stacked against us' implies the asymmetry is being exploited. 'Level the playing field' means fixing the asymmetry. And 'transparency' is the buzzword everyone uses for the solution. But the expression 'information asymmetry' itself makes you sound like you read The Economist, which, depending on your audience, is either impressive or annoying.",
                ],
                japaneseParagraphs: [
                    "情報の非対称性。経済学用語だけど今はビジネス一般で使う。片方が圧倒的に詳しくて、もう片方が何も分からない状態。建築業界: 大金が動くのに、クライアントに判断する技術知識がない。その隙間を悪用する人がいる。",
                    "医療（医者のほうが詳しい）、金融（ブローカーのほうが詳しい）、車の修理、全部これ。'There's a huge information asymmetry' と言えれば、構造的な問題を一言で説明できる。知識が少ない側は、価格が適正か、仕事が正しいか、そもそもそのサービスが必要かも判断できない。",
                    "カジュアルに言うなら 'They know stuff we don't'。'The deck is stacked against us' = 不利な立場（非対称が悪用されてる）。'Level the playing field' = 対等にする。'Transparency' = 解決策のバズワード。'Information asymmetry' 自体を使うとエコノミスト読んでる感じが出る。聴衆によって印象的か鬱陶しいか分かれる。",
                ],
            },
            {
                heading: "The Whole Nine Yards -- 全力で、徹底的に",
                paragraphs: [
                    "From the tangent about home renovation nightmares: 'They went the whole nine yards -- new floors, new paint, rewired the whole house.' The whole nine yards means doing absolutely everything, leaving nothing out. The origin is debated -- some say it's about cement truck capacity, others say ammunition belts in WWII. Nobody knows for sure, but everyone knows what it means.",
                    "'She went the whole nine yards for the wedding -- custom invitations, live band, fireworks.' 'If you're gonna renovate, go the whole nine yards.' It implies thoroughness AND ambition. You didn't just do the minimum -- you did everything possible. It's always said with a mix of admiration and slight exhaustion, like 'wow, they really did ALL of that.'",
                    "Cousins: 'go all out' is the closest synonym -- maximum effort in every direction. 'Pull out all the stops' comes from pipe organs (pulling out stops makes it louder) and means using every resource. 'Leave no stone unturned' is more about being thorough in searching. And 'do it half-assed' is the opposite -- doing the bare minimum and hoping nobody notices. In construction, the difference between 'the whole nine yards' and 'half-assed' is literally the difference between a happy client and a lawsuit.",
                ],
                japaneseParagraphs: [
                    "Tangentのリフォームホラー話から。'The whole nine yards' = 全力で、徹底的に。何も省かない。語源は議論中 -- セメントトラックの容量説、WW2の弾帯説。誰も確定できないけど意味は全員知ってる。",
                    "結婚式、リフォーム、プロジェクト、何でも使える。「最低限じゃなく全部やった」というニュアンス。称賛と軽い疲労が混ざった感じ -- 「マジで全部やったの？」。徹底さと野心の両方を含む。",
                    "仲間: 'go all out' = 最も近い同義語。'Pull out all the stops' = パイプオルガンの全ストップを引く = 全リソース投入。'Leave no stone unturned' = 石をひっくり返して隅々まで調べる。反対: 'half-assed' = 手抜き。建築業界では 'the whole nine yards' と 'half-assed' の差が、顧客満足と裁判沙汰の差。",
                ],
            },
        ],
    },

    // ===== Piece 3: Memoria Conversation (Same topic) =====
    conversationData: {
        english: [
            { speaker: 'male', text: "OK so -- this is, uh, this is kind of a weird one. You know I do interior renovation, right? Wallpaper, that kind of thing." },
            { speaker: 'female', text: "Yeah, of course." },
            { speaker: 'male', text: "So I go to this job. Standard wallpaper replacement, residential, nothing special. 269 square meters, two-week job. Fine. And I'm at the client's house, and we start talking, and I'm like... wait. Who IS this guy?" },
            { speaker: 'female', text: "What do you mean?" },
            { speaker: 'male', text: "I mean -- OK, so he's a foreign consultant who's been in Japan for over 30 years. He worked in a politician's office. Like, an actual member of parliament. He wrote papers for, um, major international journals predicting the collapse of the whole corporate system. And he was RIGHT." },
            { speaker: 'female', text: "Wait, a politician's office? As a foreigner? In Japan?" },
            { speaker: 'male', text: "One of the first foreigners in history to do it. That's -- I mean, that's insane. And then he built this consulting firm that helps global companies navigate Japanese politics and business and policy, all three at the same time. And when something big happens in Japan, like a major corporate scandal, the international media calls HIM for commentary." },
            { speaker: 'female', text: "And you're... doing his wallpaper." },
            { speaker: 'male', text: "I'm doing his wallpaper! That's the thing! I'm standing there with paste on my hands and this guy has been advising Fortune 500 companies for three decades." },
            { speaker: 'female', text: "Ha! That's -- that's quite a scene." },
            { speaker: 'male', text: "So that night I start researching. And I find this paper he wrote in 1997 -- and remember, in '97 everyone was still saying Japan's downturn was temporary -- and he basically predicted everything. The whole unwinding. Cross-shareholding breaking down, lifetime employment ending, the whole system." },
            { speaker: 'female', text: "And it all came true." },
            { speaker: 'male', text: "Every word. Twenty-something years later, yeah. Every single prediction." },
            { speaker: 'female', text: "So what did you do with all this research?" },
            { speaker: 'male', text: "OK, this is the weird part. I built him a web page. Like, a full profile page. His career as a narrative, five chapters, animated, the whole -- the whole nine yards." },
            { speaker: 'female', text: "You built your wallpaper client a website." },
            { speaker: 'male', text: "I built my wallpaper client a website! In one day! Using AI. And like -- it's not just a list of achievements. I turned it into a story. The 1997 prediction, the insider years, the bridge between worlds, the media voice, and where he's going next." },
            { speaker: 'female', text: "That's... honestly kind of amazing. But also -- why?" },
            { speaker: 'male', text: "Because -- OK, two reasons. One, I was genuinely blown away. This person's career is incredible and I wanted to show that I noticed. That I'm not just the wallpaper guy who shows up, does the job, and leaves. And two, it's a way to show what AI can do. The whole thing -- research, writing, design, code -- Claude Code, one day." },
            { speaker: 'female', text: "So it's also kind of a demo." },
            { speaker: 'male', text: "It's a demo wrapped in a love letter. Or -- no, that sounds weird. It's, um, it's respect. Packaged as a web page." },
            { speaker: 'female', text: "Did you address the wallpaper problem too?" },
            { speaker: 'male', text: "Oh yeah. There's this beam in the stairwell where we couldn't get the straight line right. Substrate unevenness issue. And the client was NOT happy about it. So on the page, I wrote this section called 'The Confession' where I basically say, look, you told us construction is the worst industry you've ever dealt with. And... we can't argue." },
            { speaker: 'female', text: "You wrote that on the page? For the client to read?" },
            { speaker: 'male', text: "For the client to read. And I explained WHY construction is like that. Big money, clients don't have technical knowledge, information asymmetry gets exploited. But then I said, you're not a normal client. You've spent 30 years reading information asymmetry. You know exactly when something doesn't add up." },
            { speaker: 'female', text: "That's terrifying. But also really honest." },
            { speaker: 'male', text: "That's literally what I wrote! 'That is both terrifying and refreshing for us.' And then I said, we don't cut corners and we don't make excuses. We'll fix the beam issue properly." },
            { speaker: 'female', text: "So wait -- the whole thing connected. The wallpaper problem led to the research, which led to the page, which addressed the problem." },
            { speaker: 'male', text: "Exactly! That's what I kept thinking. It's all one line. You mess up a wall, you learn who lives behind it, you build something beautiful for that person, and then you honestly address the thing you messed up. It's -- honestly it's better than just fixing the wall." },
            { speaker: 'female', text: "Because fixing the wall is expected. This is unexpected." },
            { speaker: 'male', text: "Right. Anyone can fix a wall. Not everyone builds you a five-chapter cinematic biography in a day." },
            { speaker: 'female', text: "Using AI." },
            { speaker: 'male', text: "Using AI. Which -- and this is the subtle part -- the client uses a different AI tool. So the page itself is kinda like, hey, if you're curious about what this other tool can do, I'm happy to show you." },
            { speaker: 'female', text: "A wallpaper guy evangelizing AI tools. What a world." },
            { speaker: 'male', text: "What a world. But you know what? If the page is good enough, the medium doesn't matter. And I think... I think it's good enough." },
        ],
        japanese: [
            { speaker: 'male', text: "ちょっとさ、変な話なんだけど。俺、内装の仕事してるじゃん？壁紙とか。" },
            { speaker: 'female', text: "うん、知ってる。" },
            { speaker: 'male', text: "で、この現場に行ったの。普通の壁紙張り替え、住宅、特別なことなし。269平米、2週間の工事。いいよね。で、クライアントの家にいて話してたら...ん？この人、誰？ってなった。" },
            { speaker: 'female', text: "どういうこと？" },
            { speaker: 'male', text: "あのさ、30年以上日本にいる外国人コンサルタントで、国会議員の事務所で働いてた人。外国人で。で、有名な国際誌に日本の企業システムの崩壊を予測する論文を書いてて、それが全部当たった。" },
            { speaker: 'female', text: "え、国会議員の事務所？外国人で？日本で？" },
            { speaker: 'male', text: "歴史上初めてに近い外国人。やばいでしょ。で、その後コンサルティング会社を作って、グローバル企業の日本での政治と経済と政策、3つ同時にナビゲートしてる。日本で大きなスキャンダルがあると、海外メディアがこの人に電話するんだよ。" },
            { speaker: 'female', text: "で、あなたはその人の...壁紙を。" },
            { speaker: 'male', text: "壁紙をやってる！そこなの！糊がついた手で立ってて、この人は30年間フォーチュン500の企業にアドバイスしてきた人。" },
            { speaker: 'female', text: "あはは！すごい絵面。" },
            { speaker: 'male', text: "で、その夜リサーチ始めた。1997年に書いた論文を見つけて -- 97年ってまだ「日本の不況は一時的」って言われてた頃だよ -- この人、全部予測してた。株式持ち合いの崩壊、終身雇用の終焉、システム全体。" },
            { speaker: 'female', text: "で、全部当たった。" },
            { speaker: 'male', text: "全部。20何年後に。一字一句。" },
            { speaker: 'female', text: "で、そのリサーチどうしたの？" },
            { speaker: 'male', text: "ここからが変なんだけど。ウェブページを作った。フルのプロフィールページ。キャリアを5章のナラティブにして、アニメーション付けて、全力で。" },
            { speaker: 'female', text: "壁紙のクライアントにウェブサイトを作ったの。" },
            { speaker: 'male', text: "作った！1日で！AIで！で、ただの経歴一覧じゃなくて、ストーリーにしたの。1997年の予測、インサイダー時代、架け橋、メディアの声、次の章。" },
            { speaker: 'female', text: "それ...正直すごい。でも -- なんで？" },
            { speaker: 'male', text: "理由は2つ。1つは純粋に感銘を受けたから。この人のキャリアは信じられないレベルで、それに気づいたことを見せたかった。ただ来て壁紙貼って帰る人じゃないって。2つ目は、AIで何ができるかのデモ。リサーチ、執筆、デザイン、コード、Claude Code、1日。" },
            { speaker: 'female', text: "じゃあデモでもあるんだ。" },
            { speaker: 'male', text: "リスペクトの手紙をウェブページにパッケージしたデモ。...変な言い方だな。敬意。ウェブページとして。" },
            { speaker: 'female', text: "壁紙の問題にも触れた？" },
            { speaker: 'male', text: "触れた。階段の梁で直線が出せなかった問題。下地の不陸が原因。クライアントめっちゃ怒ってた。で、ページに「告白」ってセクションを書いて、建築業界は今まで関わった中で最悪だとおっしゃってましたよね、と。...否定できません、と。" },
            { speaker: 'female', text: "それをページに書いたの？クライアントが読むページに？" },
            { speaker: 'male', text: "読むページに。で、なぜ建築がそうなのかを説明した。大金が動く、クライアントに技術知識がない、情報の非対称性が悪用される。でも、あなたは普通のクライアントじゃない。30年間情報の非対称性を読み解くのが仕事だった人ですと。" },
            { speaker: 'female', text: "怖い。でもすごく正直。" },
            { speaker: 'male', text: "そのまま書いた！「それは我々にとって怖くもあり、清々しくもある」って。で、手は抜かない、言い訳はしない、梁の問題は必ず解決しますと。" },
            { speaker: 'female', text: "全部つながってるじゃん。壁紙の問題がリサーチにつながって、ページにつながって、問題に向き合ってる。" },
            { speaker: 'male', text: "そう！全部1本の線。壁を失敗して、壁の向こうの人を知って、その人のために何かを作って、失敗を正直に認める。正直、壁を直すだけよりいい。" },
            { speaker: 'female', text: "壁を直すのは当たり前。これは予想外だから。" },
            { speaker: 'male', text: "そう。壁は誰でも直せる。5章のシネマティックな伝記を1日で作る人はいない。" },
            { speaker: 'female', text: "AIで。" },
            { speaker: 'male', text: "AIで。で、微妙なポイントなんだけど、このクライアント別のAIツール使ってるんだよね。だからページ自体が「このツールに興味あったらデモしますよ」っていう。" },
            { speaker: 'female', text: "壁紙屋がAIツールの布教してる。すごい時代。" },
            { speaker: 'male', text: "すごい時代。でもさ、ページが十分良ければ、媒体は関係ない。で、俺は...十分良いと思ってる。" },
        ],
        tone: 'introspective' as const,
        generatedAt: new Date('2026-04-04'),
    },

    // ===== Piece 4: Tangent (Completely different topic) =====
    tangentData: {
        english: [
            { speaker: 'female', text: "OK so completely different topic. My friend just finished renovating her apartment and it was a NIGHTMARE." },
            { speaker: 'male', text: "Oh god. What happened?" },
            { speaker: 'female', text: "OK so she hired this company, right? And they quoted her -- I think it was like two million yen for a kitchen and bathroom redo. Which seemed reasonable." },
            { speaker: 'male', text: "That's... yeah, depending on the scope, that could be reasonable." },
            { speaker: 'female', text: "Right. But then. THEN. Every week there's a new 'unexpected cost.' Oh, the pipes behind the wall are old, that's 300,000 extra. Oh, the electrical panel needs upgrading, another 200,000. Oh, the floor underneath has water damage, 400,000." },
            { speaker: 'male', text: "Ah. The drip, drip, drip of additional charges. That's -- yeah, that's a classic move." },
            { speaker: 'female', text: "Is it though? Is it actually a scam or is it just... things you can't predict?" },
            { speaker: 'male', text: "OK so -- and this is the honest answer -- it's both. Sometimes you genuinely don't know what's behind a wall until you open it. Old buildings, especially. You tear off the tiles and surprise, there's rot, there's outdated wiring, there's plumbing from the '70s that's about to give up." },
            { speaker: 'female', text: "So that part's legit." },
            { speaker: 'male', text: "That part CAN be legit. The sketchy part is when a contractor knows damn well they're gonna find problems and quotes low on purpose to get the job. Then once they're in, you're stuck. What are you gonna do, fire them when your kitchen's torn apart?" },
            { speaker: 'female', text: "That's exactly what happened! She couldn't stop the project halfway through!" },
            { speaker: 'male', text: "It's the information asymmetry thing. She doesn't know if 300,000 for pipe replacement is fair. She can't look behind the wall herself. She has to trust them. And some companies -- not all, but some -- exploit that trust deliberately." },
            { speaker: 'female', text: "So how do you protect yourself?" },
            { speaker: 'male', text: "Honestly? Get multiple quotes. That's the, uh, that's the boring answer but it's the right one. If three companies all say the pipes need replacing for around the same price, it's probably real. If one company finds problems nobody else mentioned, that's a red flag." },
            { speaker: 'female', text: "What about those renovation shows on TV? They always make it look so smooth." },
            { speaker: 'male', text: "Ha! Those shows are the worst thing to happen to renovation expectations. Everything goes wrong, but it's edited down to -- to a montage with happy music. And then the big reveal where everyone cries. Nobody shows the three weeks of delays and the arguments about tile color." },
            { speaker: 'female', text: "The arguments about tile color!" },
            { speaker: 'male', text: "Tile color, paint shade, cabinet handles. People lose their MINDS over cabinet handles. I've seen couples almost divorce over round versus square knobs." },
            { speaker: 'female', text: "Round versus square. That's... that's a hill to die on?" },
            { speaker: 'male', text: "Apparently! And here's the thing -- after all the fighting, they go with brushed nickel every time. Every. Single. Time. Nobody picks the bold choice. Two weeks of arguing and they end up with the same handles as everyone else." },
            { speaker: 'female', text: "That is the most depressing renovation fact I've ever heard." },
            { speaker: 'male', text: "Welcome to the industry." },
        ],
        japanese: [
            { speaker: 'female', text: "全然別の話なんだけど。友達がマンションのリフォーム終わったばっかりで、地獄だったらしい。" },
            { speaker: 'male', text: "うわ。何があったの？" },
            { speaker: 'female', text: "業者を雇ったんだけど、キッチンとバスルームで200万円って見積もり。妥当っぽいよね。" },
            { speaker: 'male', text: "まあ、範囲によっては妥当かも。" },
            { speaker: 'female', text: "でしょ。でもそこから。毎週「想定外の費用」が出てくる。壁の裏の配管が古い、30万追加。電気パネルの交換が必要、20万追加。床下に水害、40万追加。" },
            { speaker: 'male', text: "追加料金のポタポタ。あー、それは典型的なやつ。" },
            { speaker: 'female', text: "でもそれ実際詐欺なの？それとも予測できないだけ？" },
            { speaker: 'male', text: "正直に言うと、両方。壁を開けるまで分からないことは本当にある。古い建物は特に。タイル剥がしたら腐食があったり、70年代の配管があったり。" },
            { speaker: 'female', text: "じゃあその部分は本当なんだ。" },
            { speaker: 'male', text: "本当の場合もある。怪しいのは、業者が問題が出ること分かってるのにわざと安く見積もって仕事を取るパターン。で、始まったら止められない。キッチンバラバラの状態でクビにできないでしょ。" },
            { speaker: 'female', text: "まさにそれ！途中で止められなかった！" },
            { speaker: 'male', text: "情報の非対称性。配管交換30万が妥当かどうか分からない。自分で壁の裏見れない。信頼するしかない。で、その信頼を意図的に悪用する業者がいる。全部じゃないけど。" },
            { speaker: 'female', text: "どうやって身を守るの？" },
            { speaker: 'male', text: "正直？相見積もり。つまらない答えだけど正しい。3社とも同じくらいの価格で配管交換が必要って言うなら、多分本当。1社だけ他が言わない問題を見つけたら、怪しい。" },
            { speaker: 'female', text: "テレビのリフォーム番組は？いつもスムーズに見えるけど。" },
            { speaker: 'male', text: "あの番組がリフォームの期待値を壊した最大の元凶。全部うまくいかないのに、ハッピーな音楽のモンタージュに編集されて、最後にみんなが泣く。3週間の遅延とタイルの色の喧嘩は誰も見せない。" },
            { speaker: 'female', text: "タイルの色の喧嘩！" },
            { speaker: 'male', text: "タイルの色、ペンキの濃さ、キャビネットの取っ手。取っ手で人が壊れる。丸か四角かで離婚しかけたカップル見たことある。" },
            { speaker: 'female', text: "丸か四角。そこで死ぬの？" },
            { speaker: 'male', text: "らしい！で、全部の喧嘩の後、ブラッシュドニッケルを選ぶ。毎回。2週間喧嘩して、結局みんなと同じ取っ手。" },
            { speaker: 'female', text: "今まで聞いたリフォームの事実で一番悲しい。" },
            { speaker: 'male', text: "ようこそ業界へ。" },
        ],
        tone: 'humorous' as const,
        generatedAt: new Date('2026-04-04'),
    },
};
