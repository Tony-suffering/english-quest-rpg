/**
 * 365 English Master -- Month 4 Week 14: エンタメ英語 (Entertainment English)
 * Days 98-104: 70 expressions
 * Month: July 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 4 (2026-07) -- WEEK 14
// ============================================================

export const MONTH4_W14_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 98: 音楽の趣味 (Music Taste)
    // Scene: 居酒屋で「どんな音楽聴くの？」から始まる趣味トーク。世代間ギャップが面白い。
    // ────────────────────────────────────────────────────

    {
        daySlot: 98, japanese: 'どんな音楽聴くの？',
        english: [
            'What kind of music do you listen to?',
            'So what kind of music are you into?',
            'I am curious. What kind of music do you usually listen to? Like what is on your playlist right now?',
            "Oh man, where do I even start? I have been on a huge jazz kick lately, but honestly it changes every week.",
        ],
        jaTranslations: [
            'どんな音楽聴くの？',
            'で、どんな音楽にハマってんの？',
            '気になるんだけどさ、普段どんな音楽聴いてる？今プレイリストに何入ってんの？',
            'いやー、どっから話せばいいかな。最近ジャズにめっちゃハマってんだけど、正直毎週変わるんだよね。',
        ],
        context: 'be into は「ハマっている」。What are you into? は趣味全般に使える超便利フレーズ。on repeat は「リピートで」。日本語の「聴く」は一語だけど英語は listen to と前置詞セット。忘れがち。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '最近ハマってる曲がある',
        english: [
            'I have a song I am really into.',
            'There is this one song I cannot stop playing right now.',
            'OK so there is this song I discovered last week and I have literally played it like fifty times already.',
            "Wait, for real? You gotta send it to me. I'm always looking for something new to get hooked on.",
        ],
        jaTranslations: [
            'ハマってる曲があるんだ。',
            '今止められない曲が一曲あるんだよね。',
            'あのさ、先週見つけた曲があって、もう文字通り50回は聴いたわ。',
            'え、マジで？送ってよ。新しくハマれる曲いつも探してんだよね。',
        ],
        context: 'hits different は「刺さり方が違う」。Z世代が広めた表現。on loop は「ループで」。blasting は「爆音で流す」。英語では「ハマっている」をcannot stop ~ingで表現するのが自然。obsessed withも使える。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '俺は演歌だよ',
        english: [
            'I listen to enka.',
            'Me? I am an enka guy through and through.',
            'You guys can have your pop music. I will stick with enka. The classics never get old.',
            "Ha, that's so on-brand for you. I bet you've got a top five enka list ready to go, don't you?",
        ],
        jaTranslations: [
            '演歌聴くよ。',
            '俺？根っからの演歌派だよ。',
            'お前らはポップでも聴いてろ。俺は演歌一筋だ。名曲は色あせねえんだよ。',
            'あはは、マスターらしいわー。どうせトップ5リストとか用意してんでしょ？',
        ],
        context: 'through and through は「根っからの」。stick with は「こだわる・付き合い続ける」。pour their soul into は「魂を込める」。英語圏では enka を Japanese blues と説明することが多い。マスターらしい頑固さが出る表現。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '意外！そういうの聴くんだ',
        english: [
            'Really? I did not expect that.',
            'Wait, seriously? You listen to that? I would never have guessed.',
            'Hold on. You? Listening to that? That is the last thing I expected. I totally had you pegged as a different type.',
            "Right? I had you pegged as a totally different type. People are full of surprises.",
        ],
        jaTranslations: [
            'え、意外。',
            'え、マジで？それ聴くの？絶対そう思わなかった。',
            'ちょっと待って。あんたが？それ聴くの？一番予想してなかったわ。完全に違うタイプだと思ってた。',
            'だよね？完全に別のタイプだと思ってたわ。人って意外性あるよね。',
        ],
        context: 'had you pegged as は「あなたのことを~だと思っていた」。figured は「思っていた」。have someone figured out は「人のことを理解し尽くしている」。意外性を表すとき英語は I would never have guessed が定番。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: 'それ誰の曲？',
        english: [
            'Who is that by?',
            'Wait, who sings that? I think I have heard it before.',
            'That sounds familiar. Who is it by? Can you play it for me real quick?',
            "Oh, I think I know them! Pull it up on your phone real quick, I wanna make sure we're thinking of the same one.",
        ],
        jaTranslations: [
            'それ誰の曲？',
            'え、誰が歌ってんの？聴いたことある気がする。',
            'なんか聞き覚えあるな。誰の？ちょっとかけてみてよ。',
            'あ、それ知ってるかも！スマホで出してよ、同じの思い浮かべてるか確認したい。',
        ],
        context: 'Who is it by? は「誰の曲？」の自然な聞き方。place it は「思い出す・特定する」。pull it up は「(スマホで)表示する」。日本語は「誰の曲？」の一言だけど英語は by が必要。Who sings it? でもOK。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '聴いたことない名前だなあ',
        english: [
            'Never heard of them.',
            'That name does not ring a bell at all.',
            'I have never heard of them. Are they new? What kind of music do they make?',
            "Seriously? They're pretty big on TikTok right now. I'll add them to our group playlist so you can check 'em out.",
        ],
        jaTranslations: [
            '聞いたことないな。',
            'その名前、全然ピンとこないわ。',
            '聞いたことないなあ。新しい人？どんな音楽やってんの？',
            'マジで？今TikTokでかなり人気だよ。グループのプレイリストに追加しとくからチェックしてみて。',
        ],
        context: 'ring a bell は「聞き覚えがある」。does not ring a bell は「全然ピンとこない」。drawing a blank は「何も思い出せない」。underground は「地下=インディーズ」。keep up with は「ついていく」。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '好きなジャンルがコロコロ変わる',
        english: [
            'My taste keeps changing.',
            'I go through phases. My taste changes all the time.',
            'I cannot stick with one genre. I will be obsessed with jazz for a month and then switch to hip-hop the next.',
            "Same here, honestly. Last month I was all about reggae and now I can't stop listening to K-pop. No shame.",
        ],
        jaTranslations: [
            '好みがコロコロ変わるんだよね。',
            '時期によって変わるんだよ。趣味がしょっちゅう変わる。',
            '一つのジャンルに定まらないんだよね。1ヶ月ジャズにハマったと思ったら次はヒップホップに行っちゃう。',
            'わかる、俺もそう。先月レゲエ一色だったのに今K-popが止まらない。恥ずかしくないよ。',
        ],
        context: 'go through phases は「時期によって変わる」。all over the place は「バラバラ」。be all about は「~に夢中」。日本語の「コロコロ変わる」は英語だとkeeps changingだけど、go through phasesの方がネイティブっぽい。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '昔の曲のほうがいいよ',
        english: [
            'Old music is better.',
            'I swear, music was better back in the day.',
            'Call me old-fashioned but I think the classics are just on another level compared to what is out now.',
            "You always say that! But honestly, some of the new stuff is pretty solid too. You just gotta give it a chance.",
        ],
        jaTranslations: [
            '昔の曲のほうがいいよ。',
            'マジで昔の音楽のほうが良かったって。',
            '古いって言われてもいいけどさ、名曲は今の曲とレベルが違うと思うんだよ。',
            'いっつもそれ言うよね！でもさ、新しいのもいいのあるよ。ちょっと聴いてみなって。',
        ],
        context: 'back in the day は「昔は」。on another level は「レベルが違う」。peaked は「ピークを迎えた」。auto-tune はボーカル補正技術。it is not even close は「比較にならない」。英語圏でも「昔の音楽のほうが良かった」論争は永遠のテーマ。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: 'この曲めっちゃ耳に残る',
        english: [
            'This song is so catchy.',
            'I cannot get this song out of my head. It is insanely catchy.',
            'I have had this song stuck in my head for three days straight. The chorus is just too catchy.',
            "Oh no, don't hum it! Now it's gonna be stuck in my head too. That's how earworms spread.",
        ],
        jaTranslations: [
            'この曲めっちゃ耳に残る。',
            'この曲頭から離れない。やばいくらい耳に残る。',
            '3日間ずっとこの曲が頭の中で流れてる。サビがキャッチーすぎるんだよ。',
            'やめて、鼻歌歌わないで！こっちまで頭に残っちゃうじゃん。耳の虫ってそうやって広がるんだよ。',
        ],
        context: 'catchy は「耳に残る」。stuck in my head は「頭から離れない」。living rent-free は「家賃タダで住んでいる=勝手に居座っている」。infectious は「伝染する」で音楽にも使える。earworm(耳の虫)は「頭から離れない曲」の意味。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 98, japanese: '歌詞がいいんだよね',
        english: [
            'The lyrics are really good.',
            'What I love about this song is the lyrics. They really speak to me.',
            'The lyrics hit me on a personal level. It is like the songwriter knew exactly what I was going through.',
            "I totally get that. Which line got you? I wanna look it up and see if it hits me the same way.",
        ],
        jaTranslations: [
            '歌詞がすごくいいんだよね。',
            'この曲の好きなとこは歌詞なんだよ。めっちゃ心に響く。',
            '歌詞が個人的に刺さるんだよね。作詞した人が俺の気持ちわかってたみたいで。',
            'めっちゃわかる。どのフレーズにやられた？調べて俺にも同じように刺さるか見てみたい。',
        ],
        context: 'speak to me は「心に響く」。hit me on a personal level は「個人的に刺さる」。stop in my tracks は「立ち止まる」。put into words は「言葉にする」。英語では lyrics は常に複数形。a lyric とは言わない。',
        character: 'lisa', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 99: ライブに行く (Going to Concerts)
    // Scene: ケンジが初めて洋楽アーティストのライブに行く。チケット争奪戦からの話。
    // ────────────────────────────────────────────────────

    {
        daySlot: 99, japanese: 'チケット取れた！',
        english: [
            'I got tickets!',
            'I actually got the tickets! I cannot believe it!',
            'You are not going to believe this but I got through and scored tickets for the show next month!',
            "No way! How'd you manage that? I tried for like twenty minutes and the site kept crashing on me.",
        ],
        jaTranslations: [
            'チケット取れた！',
            'マジでチケット取れた！信じらんない！',
            '信じないと思うけど、繋がって来月のライブのチケットゲットしたんだよ！',
            'うそ！どうやったの？俺20分くらいやってたけどサイト落ちまくってさ。',
        ],
        context: 'scored tickets は「チケットをゲットした」。got through は「(アクセスが)通じた」。sold out は「完売」。refreshing the page は「ページを更新し続ける」。英語では concert tickets の争奪戦は huge deal で、got tickets! だけで大興奮が伝わる。',
        character: 'kenji', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '即完売だったらしいよ',
        english: [
            'They sold out instantly.',
            'Apparently they sold out in like two minutes flat.',
            'I heard tickets sold out within seconds. People are furious because scalpers bought them all.',
            "Yeah, and now scalpers are listing them for like triple the price. It's so messed up.",
        ],
        jaTranslations: [
            '即完売だったらしいよ。',
            'なんかきっかり2分で売り切れたらしいよ。',
            '数秒でチケット完売だって。転売ヤーが全部買い占めたからみんなキレてるよ。',
            'だよね、しかも転売ヤーが3倍の値段で出してるし。ほんとひどいよ。',
        ],
        context: 'in two minutes flat は「きっかり2分で」。face value は「定価」。scalper は「転売ヤー」。virtual queue は「オンライン待ち行列」。resale は「転売」。日本語の「即完」は英語だと sold out instantly か sold out in seconds。',
        character: 'mina', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '席どこ？',
        english: [
            'Where are your seats?',
            'Nice! So where are you sitting? Are they good seats?',
            'What section did you get? Please tell me they are not nosebleed seats.',
            "Lower bowl, row twelve! Not bad for how fast they sold out, right? I'm pumped.",
        ],
        jaTranslations: [
            '席どこ？',
            'いいね！で、どこの席？いい席？',
            'どのセクション取れたの？天井席じゃないよね？',
            '1階スタンドの12列目！あの速さで売り切れたにしては悪くないでしょ？テンション上がるわ。',
        ],
        context: 'nosebleed seats は「鼻血が出るほど高い場所の席=最上階の安い席」。defeats the purpose は「意味がない」。floor seats は「アリーナ席」。lower bowl は「1階スタンド」。英語の席種表現は日本と全然違う。',
        character: 'takeshi', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: 'スタンディングだよ',
        english: [
            'It is standing only.',
            'No seats. It is general admission, standing only.',
            'It is a standing show. First come first served. So we need to get there early to be near the front.',
            "Oof, my feet are already hurting just thinking about it. But the energy up front is totally worth it.",
        ],
        jaTranslations: [
            'スタンディングだよ。',
            '席なし。自由席でスタンディングオンリー。',
            'スタンディングのライブだよ。早い者勝ち。だから前の方行きたいなら早めに行かないと。',
            'うわ、考えただけで足痛くなる。でも前の方の熱気は間違いなく価値あるよね。',
        ],
        context: 'general admission は「自由席」。日本語の「スタンディング」は和製英語。英語では standing only か GA (general admission)。first come first served は「早い者勝ち」。camp out は「並んで待つ」。',
        character: 'kenji', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '物販の列やばそう',
        english: [
            'The merch line is going to be crazy.',
            'I bet the merch line is going to be insane.',
            'We should probably line up for merch early. Those limited edition items sell out fast.',
            "For real. Last time I waited an hour and they were out of everything in my size. Let's get there early this time.",
        ],
        jaTranslations: [
            '物販の列やばそう。',
            'グッズの列、絶対やばいよ。',
            'グッズは早めに並んだほうがいいよ。限定品すぐ売り切れるから。',
            'ほんとそれ。前回1時間並んだのに自分のサイズ全部なかったし。今回は早く行こうよ。',
        ],
        context: 'merch は merchandise(グッズ)の略。line up は「並ぶ」。limited edition は「限定品」。opening act は「前座」。日本語の「物販」は英語では merch booth か merch table。tour t-shirt は「ツアーTシャツ」。',
        character: 'yuki', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '前の人デカすぎて見えない',
        english: [
            'I cannot see past the person in front of me.',
            'The person in front of me is so tall I can barely see the stage.',
            'Are you kidding me? I waited in line for two hours and now some giant is standing right in front of me blocking my entire view.',
            "Just tap 'em on the shoulder and ask to scoot over. Or squeeze to the side a bit. You didn't pay all that money to stare at someone's back.",
        ],
        jaTranslations: [
            '前の人デカすぎて見えない。',
            '前の人背が高すぎてステージほぼ見えない。',
            'マジかよ。2時間並んだのに巨人が真ん前に立って視界完全にブロックしてんだけど。',
            '肩叩いてちょっとずれてもらいなよ。それか横にちょっと移動しな。高い金払って人の背中見るために来たんじゃないでしょ。',
        ],
        context: 'six-four は「6フィート4インチ=約193cm」。peek around は「覗き込む」。venue は「会場」。blocking my view は「視界を遮る」。gap は「隙間」。This is my life は自虐的な「これが俺の人生」。ライブあるある。',
        character: 'lisa', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: 'アンコールやるかな',
        english: [
            'Do you think there will be an encore?',
            'They have to do an encore, right? There is no way they just end it like that.',
            'Come on, everyone keep cheering. If we are loud enough they will come back out for an encore.',
            "They haven't played their biggest hit yet, so there's no way that's it. Keep clapping!",
        ],
        jaTranslations: [
            'アンコールやるかな？',
            'アンコールやるでしょ？こんな終わり方ないって。',
            'みんな声出し続けて！十分うるさければ戻ってきてアンコールやってくれるから。',
            'まだ一番のヒット曲やってないよ、これで終わりなわけない。拍手し続けて！',
        ],
        context: 'encore は英語でも同じだけど発音は「アンコー」(最後の r はアメリカ英語なら軽く)。walked offstage は「舞台裏に引っ込む」。unwritten rule は「暗黙のルール」。日本語の「アンコール」の掛け声は英語では One more song! が多い。',
        character: 'takeshi', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '生で聴くと全然違うね',
        english: [
            'It sounds totally different live.',
            'Hearing it live is a completely different experience.',
            'I have listened to this song a thousand times on Spotify but hearing it live just hits completely different.',
            "Told you! The bass alone is worth the ticket. You can feel it in your chest. Nothing beats the real thing.",
        ],
        jaTranslations: [
            '生で聴くと全然違うね。',
            '生で聴くと全く別の体験だわ。',
            'Spotifyで千回は聴いた曲だけど、生で聴くと刺さり方が全然違う。',
            'だから言ったじゃん！ベースだけでチケット代の価値あるよ。胸に響くんだよ。本物にはかなわない。',
        ],
        context: 'live は「ライブで・生で」。in person は「直接・現場で」。hits different は「刺さり方が違う」。no substitute は「代わりがない」。英語で「生演奏」は live performance。日本語の「ライブ」は和製英語で、英語では concert か show が普通。',
        character: 'kenji', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: 'セットリスト最高だった',
        english: [
            'The setlist was perfect.',
            'They played all my favorites. The setlist was absolutely perfect.',
            'I could not have asked for a better setlist. They played every single song I wanted to hear.',
            "And the way they closed with that last one? I got chills. Whoever planned that setlist knew exactly what they were doing.",
        ],
        jaTranslations: [
            'セットリスト最高だった。',
            '好きな曲全部やってくれた。セトリ完璧だったわ。',
            'これ以上ないセトリだった。聴きたい曲全部やってくれたもん。',
            'しかもラストのあの曲で締めたの？鳥肌立ったわ。セトリ組んだやつ天才だろ。',
        ],
        context: 'setlist は「セトリ」。日本語の略語がそのまま英語圏でも通じる珍しい例。opened with は「~で始めた」。hyped は「テンション上がった」。pacing は「ペース配分」。flawless は「完璧な」。',
        character: 'mina', category: 'travel', month: '2026-07',
    },
    {
        daySlot: 99, japanese: '終電に間に合うかな',
        english: [
            'Can we make the last train?',
            'What time is the last train? We need to keep an eye on the time.',
            'I want to stay until the very end but I also cannot miss the last train. That would be a disaster.',
            "Just stay till the end and we'll split a cab. It's not worth missing the encore over train schedules.",
        ],
        jaTranslations: [
            '終電間に合うかな？',
            '終電何時？時間気にしとかないと。',
            '最後まで観たいけど終電も逃せない。逃したら最悪だし。',
            '最後までいてタクシー割り勘しようよ。終電気にしてアンコール逃すとかもったいなさすぎ。',
        ],
        context: 'make the last train は「終電に間に合う」。keep an eye on は「気をつけておく」。it is going to be tight は「ギリギリ」。broke は「金欠」。日本語の「終電」は英語だと last train。midnight train ではない。',
        character: 'master', category: 'travel', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 100: カラオケ (Karaoke Night)
    // Scene: 二次会でカラオケへ。選曲バトルと歌唱力論争が始まる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 100, japanese: 'カラオケ行こうよ',
        english: [
            'Let us go to karaoke.',
            'Come on, let us hit up karaoke. It will be fun.',
            'The night is still young. Let us go to karaoke and sing our hearts out.',
            "I'm so down. I've already got like three songs picked out in my head. Let's do it!",
        ],
        jaTranslations: [
            'カラオケ行こうよ。',
            'ねえ、カラオケ行こうよ。楽しいって。',
            'まだ夜はこれからじゃん。カラオケ行って思いっきり歌おうよ。',
            'めっちゃ行きたい。もう頭の中で3曲決まってるし。行こ行こ！',
        ],
        context: 'hit up は「行く」のカジュアル表現。sing our hearts out は「思いっきり歌う」。the night is still young は「夜はまだこれから」。hear me out は「最後まで聞いて」。karaoke の英語発音は「キャリオーキ」。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: '何歌う？',
        english: [
            'What are you going to sing?',
            'So what is your go-to karaoke song?',
            'Come on, what are you going to sing first? Do not tell me you are just going to sit there.',
            "I'm going with my usual. Don't laugh, but I always start with Bohemian Rhapsody. It gets everyone going.",
        ],
        jaTranslations: [
            '何歌うの？',
            'で、カラオケの定番曲は？',
            'ほら、最初何歌うの？まさか座ってるだけとか言わないよね。',
            'いつものやつ行くわ。笑うなよ、毎回ボヘミアンラプソディから始めるんだ。みんな盛り上がるんだよ。',
        ],
        context: 'go-to は「定番の」。banger は「盛り上がる曲」。nail は「完璧にやる」。vibe with は「一緒にノる」。do it in my sleep は「寝ててもできる=完全にマスターしている」。英語の karaoke は友達同士でバーでやるのが主流。個室はアジア特有。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: '音痴だから恥ずかしい',
        english: [
            'I am tone-deaf. It is embarrassing.',
            'I really cannot sing. Like, I am genuinely tone-deaf.',
            'You guys go ahead. I will just sit here and cheer you on because trust me, nobody wants to hear me sing.',
            "Oh come on, nobody cares if you're good. That's the whole point of karaoke. Just grab the mic and have fun!",
        ],
        jaTranslations: [
            '音痴だから恥ずかしいんだよ。',
            'ほんとに歌えないんだって。ガチで音痴なの。',
            'お前ら先やってて。俺は応援してるから。マジで俺の歌は誰も聴きたくないって。',
            'いいじゃん別に、うまいかどうかなんて誰も気にしないよ。それがカラオケでしょ。マイク持って楽しめって！',
        ],
        context: 'tone-deaf は「音痴」。cannot carry a tune は「音程が取れない」。to save my life は「どう頑張っても無理」。match pitch は「音程を合わせる」。designated は「指名された・担当の」。英語圏のカラオケは下手でも盛り上がるのが正義。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'この曲知ってる？',
        english: [
            'Do you know this song?',
            'Wait, do you guys know this one? It is a classic.',
            'OK I am putting this one on. Tell me if you recognize it. The intro is legendary.',
            "Oh yeah, I know that one! Put it on, I'll sing the second part with you. It's way better as a duet.",
        ],
        jaTranslations: [
            'この曲知ってる？',
            'ちょっとこれ知ってる？名曲だよ。',
            'これ入れるわ。わかるか当ててみて。イントロが伝説なんだよ。',
            'あ、それ知ってる！かけてよ、後半一緒に歌うから。デュエットのほうが全然いいし。',
        ],
        context: 'put it on は「かける・流す」。came out は「リリースされた」。raise your hand は「手を挙げて」。scrolling through は「スクロールして探す」。duet は「デュエット」。英語では song list、日本語では「曲目リスト」。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'キー高すぎて出ない',
        english: [
            'The key is too high for me.',
            'I cannot hit those high notes. Can we lower the key?',
            'This song sounded way easier in my head. I cannot reach any of the high parts at all.',
            "Here, let me fix it. There's a button on the remote to lower the key. Try it two steps down.",
        ],
        jaTranslations: [
            'キー高すぎて出ないわ。',
            '高音出ないんだけど。キー下げられる？',
            'この曲頭の中では余裕だったのに。高いとこ全然届かない。',
            'ほら、貸して。リモコンにキー下げるボタンあるから。2つ下げてみ。',
        ],
        context: 'hit those high notes は「高音を出す」。lower the key は「キーを下げる」。cracked は「(声が)裏返った」。notches は「段階」。vocal cords は「声帯」。日本語の「キー」はそのまま英語でも key で通じる。pitch を上げ下げとも言う。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'めっちゃうまいじゃん！',
        english: [
            'You are really good!',
            'Wait, you can actually sing! That was amazing!',
            'Hold on. You said you could not sing and then you just killed it. What was that?',
            "See? I told you you'd be fine. You were holding out on us this whole time!",
        ],
        jaTranslations: [
            'めっちゃうまいじゃん！',
            'え、歌えるじゃん！すごかったよ！',
            'ちょっと待って。歌えないとか言っといてめちゃくちゃうまいじゃん。何あれ。',
            'ほらね？大丈夫って言ったじゃん。ずっと隠してたでしょ！',
        ],
        context: 'killed it は「最高だった」。delivered は「やってのけた」。flawless は「完璧な」。follow that は「その後に続く」。by comparison は「比べると」。英語で歌を褒めるとき You nailed it! も超よく使う。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'マイク回して',
        english: [
            'Pass me the mic.',
            'Hey, it is my turn. Pass the mic over here.',
            'You have been hogging the mic for three songs straight. Give someone else a chance.',
            "Fine, fine! One more song and then it's all yours. I just gotta finish this last one, I swear.",
        ],
        jaTranslations: [
            'マイク回して。',
            'おい、俺の番だって。マイクこっちよこせ。',
            '3曲連続でマイク独占してんじゃん。他の人にも歌わせろよ。',
            'わかったわかった！あと1曲だけ、そしたら全部お前のだから。これだけ歌わせて、マジで。',
        ],
        context: 'pass the mic は「マイクを回す」。hogging は「独り占めする」。queued up は「列に入れてある」。hand over は「渡す」。mic は microphone の略で「マイク」。英語ではマイクの独占者を mic hog と呼ぶ。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: 'ハモれる人いる？',
        english: [
            'Can anyone harmonize?',
            'Who can do harmonies? I need someone to sing the high part.',
            'This song needs two voices. Can anyone hold a harmony or is everyone just going to sing melody?',
            "I'll try! No promises though. I always end up drifting back to the melody halfway through.",
        ],
        jaTranslations: [
            'ハモれる人いる？',
            'ハモリできる人誰？高いパート歌ってほしいんだけど。',
            'この曲2声いるんだよね。ハモリ維持できる人いる？それとも全員メロディだけ？',
            'やってみる！保証はしないけど。いつも途中でメロディに戻っちゃうんだよね。',
        ],
        context: 'harmonize は「ハモる」。hold a harmony は「ハーモニーを維持する」。drifting は「ずれる」。up for it は「やる気ある？」。英語圏のカラオケでハモりを求めるのはちょっとレベル高い要求。casual に just sing along(一緒に歌って)が普通。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: '延長する？',
        english: [
            'Should we extend?',
            'Our time is almost up. Should we add another hour?',
            'We only have five minutes left. Should we extend or call it a night?',
            "Definitely extend. I haven't even gotten to my song yet and there's no way I'm leaving without singing at least one.",
        ],
        jaTranslations: [
            '延長する？',
            'もう時間だけど。もう1時間追加する？',
            'あと5分しかないよ。延長する？それとも終わりにする？',
            '絶対延長。まだ俺の曲歌ってないし、1曲も歌わずに帰るとかありえないから。',
        ],
        context: 'extend は「延長する」。call it a night は「今夜はおしまいにする」。split between は「割り勘で」。who is in は「誰が賛成？」。front desk は「受付」。英語のカラオケは by the hour(時間制)が多い。日本と同じ仕組みだけど文化が違う。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 100, japanese: '喉が枯れた',
        english: [
            'I lost my voice.',
            'My voice is completely gone. I sang way too much.',
            'I think I overdid it. My throat is killing me and I can barely talk.',
            "That's what you get for hogging the mic all night! Here, drink some warm water. You're gonna need it tomorrow.",
        ],
        jaTranslations: [
            '声出なくなった。',
            '声完全に枯れた。歌いすぎたわ。',
            'やりすぎたかも。喉やばいし、もうほとんど喋れない。',
            '一晩中マイク独占してたからだろ！ほら、お湯飲みな。明日必要になるよ。',
        ],
        context: 'lost my voice は「声が出なくなった」。shot は「ダメになった」。feels like sandpaper は「紙やすりみたい」。paced myself は「ペース配分した」。日本語の「喉が枯れた」はとても日本語的な表現。英語は lost my voice か my voice is gone が自然。',
        character: 'kenji', category: 'social', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 101: 楽器と練習 (Instruments and Practice)
    // Scene: タケシがギターを始めたいと言い出す。楽器経験者が集まってアドバイス大会。
    // ────────────────────────────────────────────────────

    {
        daySlot: 101, japanese: 'ギター始めたいんだけど',
        english: [
            'I want to start playing guitar.',
            'I have been thinking about picking up guitar. Any advice?',
            'I know this sounds random but I really want to learn guitar. Is it too late to start at my age?',
            "Go for it! It's never too late. My cousin started at forty and he's already playing at open mic nights.",
        ],
        jaTranslations: [
            'ギター始めたいんだけど。',
            'ギター始めようかなって思ってんだけど。なんかアドバイスある？',
            '急に何だけどさ、ギター本気で覚えたいんだよね。この歳からじゃもう遅い？',
            'やれよ！遅いなんてことないって。俺のいとこ40から始めて、もうオープンマイクナイト出てるし。',
        ],
        context: 'picking up は「始める」。is it too late は「もう遅い？」。starting from absolute zero は「完全なゼロから」。setting myself up for disappointment は「がっかりするだけの結果を作っている」。英語では楽器に play を使い、play the guitar と the が入る。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '独学でいける？',
        english: [
            'Can I teach myself?',
            'Do you think I can learn on my own? Without a teacher?',
            'I am thinking about learning from YouTube tutorials. Do you think that is enough or do I need actual lessons?',
            "Honestly, YouTube is fine for the basics. But maybe take a lesson or two early on so you don't pick up bad habits.",
        ],
        jaTranslations: [
            '独学でいける？',
            '一人で覚えられると思う？先生なしで。',
            'YouTubeの動画で覚えようと思ってんだけど。それで十分かな、それともちゃんとレッスン受けたほうがいい？',
            '正直、基礎はYouTubeで全然いけるよ。ただ最初にレッスン1、2回受けとくと変なクセつかなくていいかも。',
        ],
        context: 'on my own は「独学で」。adds up は「積み重なる」。step by step は「段階的に」。bad habits は「悪い癖」。on a budget は「予算が限られている」。self-taught(独学の)も使える。日本語の「独学」は英語だと self-taught か teaching yourself。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '最初はコードから覚えな',
        english: [
            'Start with chords.',
            'Learn the basic chords first. Everything else comes after.',
            'If you want my advice, just learn four or five basic chords and you can already play hundreds of songs.',
            "That's solid advice. Once I learned those four chords I could already play half my favorite songs. It's a huge confidence boost.",
        ],
        jaTranslations: [
            'まずコードから覚えろ。',
            '基本のコードを先に覚えな。あとは後からついてくる。',
            '俺のアドバイスとしては、基本コード4つ5つ覚えるだけで何百曲も弾けるようになるぞ。',
            'それいいアドバイスだわ。4つのコード覚えたら好きな曲の半分はもう弾けたもん。自信めっちゃつくよ。',
        ],
        context: 'chords は「コード」。shredding は「超高速ソロを弾く」。switch between は「切り替える」。further along は「先に進んでいる」。英語では chord は「コード」だけど cord(紐)と同音。guitar chord と言えば間違えない。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '指が痛くなるよ最初',
        english: [
            'Your fingers will hurt at first.',
            'Fair warning, your fingertips are going to be killing you for the first few weeks.',
            'The first month is brutal on your fingers. You will get calluses but until then every chord is going to hurt.',
            "Yeah, the first week is rough. But once you get calluses it's totally fine. Just push through the first month.",
        ],
        jaTranslations: [
            '最初は指が痛くなるよ。',
            '先に言っとくけど、最初の数週間は指先めっちゃ痛いからね。',
            '最初の1ヶ月は指にとって地獄だよ。タコできるまではコード押さえるたびに痛い。',
            'うん、最初の1週間はキツい。でもタコできたら全然平気。とにかく最初の1ヶ月乗り越えろ。',
        ],
        context: 'calluses は「タコ」。brutal は「残酷なほどキツい」。badge of honor は「勲章」。fair warning は「先に言っておくけど」。on fire は「燃えるように痛い」。英語の callus は手のタコにも足のタコにも使える。',
        character: 'lisa', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '毎日ちょっとずつやるのが大事',
        english: [
            'A little every day is key.',
            'The trick is practicing a little bit every day. Even just fifteen minutes.',
            'Consistency beats intensity. Fifteen minutes a day is better than three hours on the weekend.',
            "That's how I got decent at piano. Even ten minutes a day adds up crazy fast. The key is just not skipping days.",
        ],
        jaTranslations: [
            '毎日ちょっとずつやるのが大事。',
            'コツは毎日ちょっとずつやること。15分でもいい。',
            '継続は強度に勝る。1日15分のほうが週末に3時間やるより効く。',
            '俺もそれでピアノそこそこ弾けるようになったわ。1日10分でもめちゃくちゃ積み上がる。大事なのはサボらないこと。',
        ],
        context: 'consistency beats intensity は「継続は強度に勝る」。muscle memory は「筋肉の記憶」。momentum は「勢い」。show up は「現れる=やり続ける」。cramming は「詰め込む」。「ちょっとずつ」を英語で言うと a little at a time か little by little。',
        character: 'master', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '昔ピアノ習ってた',
        english: [
            'I used to take piano lessons.',
            'I actually took piano lessons when I was a kid. I quit in middle school though.',
            'My mom made me take piano lessons for six years. I hated it at the time but now I wish I had kept going.',
            "You should pick it back up! If you already know how to read sheet music, you've got a huge head start over the rest of us.",
        ],
        jaTranslations: [
            '昔ピアノ習ってた。',
            '実は子供の頃ピアノ習ってたんだよね。中学でやめちゃったけど。',
            '母親に6年間ピアノ習わされてた。当時は嫌だったけど、今は続けときゃよかったと思う。',
            'また始めなよ！楽譜読めるなら、俺らより全然有利じゃん。',
        ],
        context: 'used to は「以前は~していた」。fought her on it は「反対した」。gave in は「折れた」。stuck with it は「続けていた」。sheet music は「楽譜」。dexterity は「器用さ」。日本語の「習ってた」は英語だと took lessons が自然。learned でもいいけど lessons の方が具体的。',
        character: 'yuki', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: 'どのギター買えばいい？',
        english: [
            'Which guitar should I buy?',
            'What kind of guitar should I get as a beginner? Acoustic or electric?',
            'I have no idea what to look for in a guitar. Can someone come with me to the music store and help me pick one?',
            "Start with a Yamaha around two hundred bucks. It's the sweet spot for beginners. Anything cheaper and you'll hate the sound.",
        ],
        jaTranslations: [
            'どのギター買えばいい？',
            '初心者はどんなギターがいいの？アコギ？エレキ？',
            'ギターの何を見ればいいか全然わかんない。誰か楽器屋一緒に来て選ぶの手伝ってくれない？',
            'ヤマハの2万くらいのやつから始めな。初心者にはちょうどいいラインだよ。それ以下だと音が嫌になる。',
        ],
        context: 'sweet spot は「ちょうどいいところ」。specifications は「スペック」。fortune は「大金」。give up on は「諦める」。ranges from A to B は「AからBの範囲」。dreadnought は一般的なアコギの形。英語の楽器店は music store か guitar shop。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: 'チューニングの仕方わかる？',
        english: [
            'Do you know how to tune it?',
            'Before you start playing, you need to learn how to tune it properly.',
            'First things first. Download a tuner app. If your guitar is out of tune everything is going to sound wrong no matter how well you play.',
            "Just download a tuner app. It's free and super easy. You'll wanna tune it every time before you play.",
        ],
        jaTranslations: [
            'チューニングの仕方わかる？',
            '弾き始める前にちゃんとチューニングの仕方覚えなよ。',
            'まず最初にチューナーアプリ落とせ。チューニング狂ってたらどんなにうまく弾いても全部おかしく聴こえるから。',
            'チューナーアプリ落とすだけでいいよ。無料だし超簡単。弾く前に毎回チューニングしたほうがいい。',
        ],
        context: 'tune は「チューニングする」。out of tune は「音が狂っている」。clip-on tuner は「クリップ式チューナー」。standard tuning は「標準チューニング」。turns out は「結局~だった」。日本語の「チューニング」はそのまま英語の tuning。',
        character: 'kenji', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: 'バンド組もうよ',
        english: [
            'Let us start a band.',
            'We should totally start a band. I am serious.',
            'OK hear me out. Between all of us we have enough instruments to form a band. Who is in?',
            "I'm in if you're serious! But we need a drummer. Does anyone know somebody who plays?",
        ],
        jaTranslations: [
            'バンド組もうよ。',
            'バンド組もうぜ。マジで言ってるからな。',
            'いいから聞けって。俺ら全員合わせたら楽器揃うんだよ。バンド組めるじゃん。誰やる？',
            'マジなら俺やるよ！でもドラムいないんだよな。誰か叩ける人知らない？',
        ],
        context: 'start a band は「バンドを組む」。who is in は「誰が参加する？」。pick up は「覚える」。too much to ask は「高望みかな？」。日本語の「バンドを組む」は英語では start a band か form a band。「組む」に当たる英語は start/form で、build ではない。',
        character: 'takeshi', category: 'request', month: '2026-07',
    },
    {
        daySlot: 101, japanese: '練習する場所がない',
        english: [
            'I have nowhere to practice.',
            'The problem is I do not have a place to practice. My apartment walls are paper-thin.',
            'I would love to practice more but my neighbors already complained once and I barely played for ten minutes.',
            "What about one of those soundproof practice rooms you can rent by the hour? There's one near the station that's pretty cheap.",
        ],
        jaTranslations: [
            '練習する場所がないんだよね。',
            '問題は練習場所がないこと。アパートの壁が紙みたいに薄いんだよ。',
            'もっと練習したいけど、10分弾いただけで隣からクレーム来たんだよ。',
            '時間貸しの防音練習室あるじゃん？駅の近くに結構安いのあるよ。',
        ],
        context: 'paper-thin は「紙のように薄い」。whatsoever は「少しでも」。sustainable は「持続可能な」。amp は amplifier(アンプ)の略。obstacle は「障害」。英語では noise complaint(騒音苦情)が日本以上に深刻。eviction(退去)につながることも。',
        character: 'mina', category: 'request', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 102: 好きな曲 (Favorite Songs)
    // Scene: 居酒屋で「人生で一番好きな曲は？」という深い質問から始まる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 102, japanese: '人生で一番好きな曲って何？',
        english: [
            'What is your all-time favorite song?',
            'If you had to pick one song as your absolute favorite, what would it be?',
            'OK deep question. What is the one song that means the most to you in your entire life? No cop-outs. Pick one.',
            "Ooh, that's a tough one. Give me a sec. I know exactly which one but I'm scared you guys are gonna judge me.",
        ],
        jaTranslations: [
            '人生で一番好きな曲って何？',
            '1曲だけ選ぶとしたら、絶対的に一番好きな曲って何？',
            'いいか、深い質問するぞ。人生で一番大事な曲って何？逃げなしで。1曲選べ。',
            'うわ、それ難しいな。ちょっと待って。どれかわかってるけど、お前らに引かれそうで怖い。',
        ],
        context: 'all-time favorite は「人生で一番好き」。cop-out は「逃げ」。defined a period は「ある時期を象徴した」。lightly は「軽々しく」。英語で「一番好きな曲」を聞くときall-timeをつけると重みが出る。without all-time だと今のお気に入りと混同する。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '聴くと学生時代思い出す',
        english: [
            'It reminds me of my school days.',
            'Every time I hear this song it takes me right back to high school.',
            'This song is basically the soundtrack of my teenage years. I cannot hear it without getting nostalgic.',
            "I know exactly what you mean. There's this one song that instantly puts me right back in my dorm room freshman year. Music's wild like that.",
        ],
        jaTranslations: [
            '聴くと学生時代思い出す。',
            'この曲聴くたびに高校時代に一気に戻るんだよね。',
            'この曲は俺の青春のサウンドトラックみたいなもん。聴くと絶対懐かしくなる。',
            'めっちゃわかる。俺も一曲あって、聴くと大学1年の寮の部屋にいる気分になる。音楽ってすごいよな。',
        ],
        context: 'takes me right back は「一気にあの頃に戻す」。soundtrack は比喩で「あの時代のBGM」。nostalgic は「懐かしい気持ち」。crush on は「好きだった人」。英語では music が記憶と結びつく感覚を transport と表現することも。This song transports me to high school.',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '失恋したとき聴いてた',
        english: [
            'I listened to it after a breakup.',
            'This was my breakup song. I played it on repeat for weeks after we split up.',
            'I know it sounds dramatic but this song literally got me through the worst heartbreak of my life.',
            "We've all been there. Sad songs hit different when you're going through it. Sometimes you just need to sit with the feeling for a while.",
        ],
        jaTranslations: [
            '失恋したとき聴いてた。',
            'これ俺の失恋ソング。別れたあと何週間もリピートで聴いてた。',
            '大げさに聞こえるかもだけど、この曲がマジで人生最大の失恋から救ってくれた。',
            'みんな経験あるよな。つらい時期に悲しい曲聴くと刺さり方が違うんだよ。しばらくその気持ちに浸るのも必要な時ある。',
        ],
        context: 'breakup song は「失恋ソング」。got me through は「乗り越えさせてくれた」。wallow in は「浸る」。on repeat は「リピートで」。split up は「別れた」。日本語の「失恋」は英語では heartbreak か breakup。heartbreak の方が感情的に重い。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: 'この曲聴くと元気出る',
        english: [
            'This song cheers me up.',
            'Whenever I am feeling down, this song always lifts my spirits.',
            'This is my go-to song when I need a mood boost. Two minutes in and I am already feeling better.',
            "Send me that one! I need to add it to my workout playlist. I'm always looking for songs that give me that boost.",
        ],
        jaTranslations: [
            'この曲聴くと元気出る。',
            '落ち込んでるとき、この曲聴くといつも元気になるんだよね。',
            '気分上げたいときの定番曲。2分もすればもう気分良くなってる。',
            'それ送って！ワークアウトのプレイリストに入れたい。テンション上がる曲いつも探してんだよね。',
        ],
        context: 'lifts my spirits は「気持ちを上げてくれる」。mood boost は「気分を上げること」。within the first few bars は「最初の数小節で」。hit shuffle は「シャッフル再生する」。cheers me up と lifts my spirits はほぼ同義だけど spirits の方がちょっと詩的。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: 'あの曲の良さがわからない',
        english: [
            'I do not get the hype.',
            'I know everyone loves that song but honestly I do not get it.',
            'Please do not hate me but I cannot understand why that song is so popular. It does nothing for me.',
            "Honestly, I felt the same way at first. Then one day it just clicked. Sometimes a song needs the right moment to land.",
        ],
        jaTranslations: [
            '何がいいのかわかんない。',
            'みんなあの曲好きなのは知ってるけど、正直俺にはわかんないんだよね。',
            '嫌わないでほしいんだけど、あの曲がなんでそんな人気なのかわかんない。何も感じない。',
            '正直、最初は俺もそうだった。でもある日急にハマったんだよ。曲にもタイミングってあるんだよな。',
        ],
        context: 'I do not get the hype は「何がそんなにいいのかわからない」。does nothing for me は「何も感じない」。pushback は「反発」。appeal は「魅力」。land with は「響く」。subjective は「主観的な」。音楽の好みを否定するのは英語圏でもちょっと勇気がいる。',
        character: 'kenji', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '泣ける曲ってある？',
        english: [
            'Are there songs that make you cry?',
            'Is there a song that always makes you tear up no matter what?',
            'Do you guys have a song that you physically cannot listen to without getting emotional? Because I have at least three.',
            "Oh, a hundred percent. There's this one ballad that gets me every time. I can't even hear the intro without tearing up.",
        ],
        jaTranslations: [
            '泣ける曲ってある？',
            '何聴いても絶対泣いちゃう曲ってある？',
            '聴くと物理的に感情抑えられなくなる曲ってない？俺は最低3曲あるんだけど。',
            'あるある、間違いなく。1曲バラードがあって毎回やられる。イントロ聴くだけでもうダメ。',
        ],
        context: 'tear up は「涙ぐむ」。breaks me は「(感情的に)壊す」。cracks は「(声が)震える」。bypasses は「迂回する=すり抜ける」。日本語の「泣ける」は英語では makes you cry だけど、tear up(涙ぐむ)の方がリアル。号泣ではなくじわっとくる感じ。',
        character: 'lisa', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '歌詞の意味今更わかった',
        english: [
            'I finally understood the lyrics.',
            'I just realized what the lyrics actually mean after all these years.',
            'I have been singing this song for ten years and I only just now figured out what it is really about. I feel so dumb.',
            "That happened to me too! I used to think that song was a love song but it's actually about saying goodbye. Completely changes the vibe.",
        ],
        jaTranslations: [
            '歌詞の意味やっとわかった。',
            '何年も経って初めて歌詞の本当の意味に気づいたわ。',
            '10年歌ってきて、今やっと本当は何の曲かわかった。自分がアホに思える。',
            '俺もそれあった！ラブソングだと思ってたのに、実は別れの曲だったっていう。全然印象変わるよね。',
        ],
        context: 'figured out は「理解した」。turns out は「実は~だった」。metaphor for は「~の比喩」。singing along は「一緒に歌う」。processing は「(感情を)処理する」。英語の歌詞は比喩が多く、日本語より二重の意味を持つことが多い。',
        character: 'master', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: 'あのイントロ聴いただけでわかる',
        english: [
            'I can tell from the intro alone.',
            'The second the intro starts I know exactly what song it is.',
            'I only need like three notes of the intro and I have already got it. Some songs are just that iconic.',
            "We should play that game! Someone plays the first two seconds and everyone guesses. I bet I could beat you.",
        ],
        jaTranslations: [
            'イントロだけでわかる。',
            'イントロ始まった瞬間に何の曲かわかる。',
            'イントロ3音あればもうわかるんだよ。そのくらい象徴的な曲ってあるじゃん。',
            'そのゲームやろうよ！誰かが最初の2秒流して、みんなで当てるやつ。俺のほうが強いと思うけど。',
        ],
        context: 'iconic は「象徴的な」。gives you chills は「鳥肌が立つ」。the mark of は「~の証」。unbeatable は「無敵」。intro は introduction の略。日本語の「イントロ」はそのまま英語でも intro で通じる。intro quiz はパーティーゲームの定番。',
        character: 'yuki', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: 'この曲聴くと走りたくなる',
        english: [
            'This song makes me want to run.',
            'When this song comes on I just want to sprint. The energy is insane.',
            'I cannot listen to this song sitting still. My body just starts moving on its own. It is the ultimate workout song.',
            "Add it to the group playlist! I need new running songs. Mine are getting stale and I can't get motivated anymore.",
        ],
        jaTranslations: [
            'この曲聴くと走りたくなる。',
            'この曲かかると全力で走りたくなる。エネルギーやばい。',
            'この曲じっと座って聴けないんだよね。体が勝手に動き出す。究極のワークアウト曲。',
            'グループのプレイリストに入れてよ！ランニング曲マンネリで、もうやる気出ないんだよね。',
        ],
        context: 'sprint は「全力疾走する」。workout song は「運動用の曲」。beats per minute は「BPM」。caffeine in audio form は「音声版カフェイン」。英語では pump-up song(テンション上げる曲)や hype song とも言う。motivate は「やる気にさせる」。',
        character: 'takeshi', category: 'feeling', month: '2026-07',
    },
    {
        daySlot: 102, japanese: '一曲だけって選べないよ',
        english: [
            'I cannot pick just one.',
            'That is impossible. You cannot make me choose just one song.',
            'I have been sitting here for five minutes trying to narrow it down and I honestly cannot. It is too hard.',
            "That's such a cop-out! Fine, give me your top three then. But you gotta rank them, no ties allowed.",
        ],
        jaTranslations: [
            '一曲だけとか選べないよ。',
            '無理だって。一曲だけとか選ばせないでよ。',
            '5分考えてるけどマジで絞れない。難しすぎる。',
            'それ逃げじゃん！じゃあトップ3でいいから。ただし順位つけろよ、同率なしで。',
        ],
        context: 'narrow it down は「絞る」。incapable of は「~できない」。leaving something out は「何かを外している」。reduce to は「~に絞る」。live with that は「それで我慢して」。英語で「選べない」を表すときYou cannot make me choose が感情的で自然。',
        character: 'mina', category: 'feeling', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 103: 音楽配信 (Streaming Music)
    // Scene: SpotifyとApple Musicどっち派？から始まるストリーミング論争。
    // ────────────────────────────────────────────────────

    {
        daySlot: 103, japanese: 'サブスク何使ってる？',
        english: [
            'What streaming service do you use?',
            'Are you Spotify or Apple Music? Or something else?',
            'I am trying to decide which music subscription to get. What does everyone here use?',
            "Spotify all the way. The playlists are so much better and Discover Weekly actually finds stuff I like. You won't regret it.",
        ],
        jaTranslations: [
            'サブスク何使ってる？',
            'Spotify派？Apple Music派？それとも別の？',
            '音楽のサブスクどれにするか迷ってんだけど。ここの人たちは何使ってる？',
            '断然Spotify。プレイリストが全然違うし、Discover Weeklyがマジで好みの曲見つけてくれる。後悔しないよ。',
        ],
        context: 'subscription は「サブスクリプション」。driving me insane は「気が狂いそう」。going back and forth は「迷っている」。sound quality は「音質」。日本語の「サブスク」は英語だと subscription か streaming service。sub とは略さない。',
        character: 'takeshi', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'プレイリスト共有して',
        english: [
            'Share your playlist with me.',
            'Can you send me that playlist? I need new music.',
            'I love your taste in music. Can you share your playlist? I will follow it and steal all your songs.',
            "Just sent it! Fair warning though, it's a weird mix. There's some jazz, some indie, and a random K-pop song in there.",
        ],
        jaTranslations: [
            'プレイリスト共有して。',
            'そのプレイリスト送ってくれない？新しい曲欲しいんだよね。',
            '音楽の趣味いいよね。プレイリスト共有して。フォローして曲全部パクるから。',
            '送った！ただ先に言っとくけど、変な組み合わせだよ。ジャズとインディーと謎のK-pop入ってるから。',
        ],
        context: 'share は「共有する」。taste in music は「音楽の趣味」。curated は「厳選された」。Discover Weekly は Spotify の自動推薦プレイリスト。work from there は「そこから進める」。follow は SNS と同じで「フォローする」。playlist sharing は英語圏の友人関係で大事な文化。',
        character: 'yuki', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'CDってもう買わないよね',
        english: [
            'Nobody buys CDs anymore.',
            'When was the last time you actually bought a physical CD?',
            'CDs feel like ancient technology at this point. Everything is streaming now.',
            "I still have a box of CDs somewhere too. Can't bring myself to throw 'em out even though I haven't touched 'em in years.",
        ],
        jaTranslations: [
            'もうCD買わないよね。',
            '最後にCD買ったのいつ？',
            'CDってもう古代の技術って感じだよね。全部ストリーミングだし。',
            '俺もどっかにCD箱ごとあるわ。何年も触ってないのに捨てられないんだよな。',
        ],
        context: 'physical CD は「現物のCD」。ancient technology は「古代の技術」。time capsule は「タイムカプセル」。allowance は「お小遣い」。record store は「レコード店」。trust your gut は「直感を信じる」。paradox of choice(選択のパラドックス)を地で行く話。',
        character: 'master', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'レコードが流行ってるらしい',
        english: [
            'Vinyl is making a comeback.',
            'Did you know vinyl records are actually trending again?',
            'It is funny. My parents thought records were dead and now young people are buying turntables and collecting vinyl.',
            "I just got a turntable last month and I love the ritual of it. Dropping the needle, sitting down, listening to the whole album. It's a whole different experience.",
        ],
        jaTranslations: [
            'レコードが復活してるらしいよ。',
            'レコードが今また流行ってるの知ってた？',
            '面白いよな。うちの親はレコード終わったと思ってたのに、今の若い子がターンテーブル買ってレコード集めてんだから。',
            '先月ターンテーブル買ったんだけど、あの儀式がたまんないんだよ。針落として、座って、アルバム丸ごと聴く。全然違う体験だわ。',
        ],
        context: 'comeback は「復活」。revival は「復興」。turntable は「ターンテーブル」。drop the needle は「針を落とす」。front to back は「最初から最後まで」。sleeve は「レコードの紙ジャケット」。日本語の「アナログ」は英語では vinyl か analog record。',
        character: 'kenji', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'アルゴリズムがいい曲教えてくれる',
        english: [
            'The algorithm recommends good songs.',
            'I actually find most of my new music through the algorithm now.',
            'Say what you want about algorithms but Spotify knows my taste better than my own friends do.',
            "It's kinda creepy, right? Mine recommended a song last week that was exactly my taste from an artist I'd never heard of. Like, how does it know?",
        ],
        jaTranslations: [
            'アルゴリズムがいい曲教えてくれる。',
            '新しい曲はほとんどアルゴリズム経由で見つけてるわ。',
            'アルゴリズムに文句言うやついるけどさ、Spotifyは友達より俺の好み理解してるよ。',
            'ちょっと怖くない？先週、聴いたことないアーティストなのにドンピシャの曲おすすめされて。なんでわかるの？',
        ],
        context: 'algorithm は「アルゴリズム」。trapped in a bubble は「バブルに閉じ込められている=偏った情報だけ見ている」。missing out on は「見逃している」。trade-off は「トレードオフ」。filter bubble はSNSでも音楽でも問題になっている概念。',
        character: 'lisa', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'ダウンロードしとけば電波なくても聴ける',
        english: [
            'Download it for offline listening.',
            'If you download it you can listen even without a signal.',
            'I always download my playlists before a flight because there is nothing worse than being stuck with no music for five hours.',
            "Good call. I burned through my entire data plan last month because I forgot to download anything before my flight. Lesson learned.",
        ],
        jaTranslations: [
            'ダウンロードしとけばオフラインでも聴ける。',
            'ダウンロードしとけば電波なくても聴けるよ。',
            'フライト前にいつもプレイリストダウンロードしとくんだ。5時間音楽なしとか最悪だから。',
            'それ正解。先月フライト前にダウンロード忘れてデータ全部使い切ったわ。教訓になった。',
        ],
        context: 'offline listening は「オフライン再生」。burn through は「使い果たす」。data plan は「データプラン・通信量」。learned this the hard way は「痛い目にあって学んだ」。saves me a fortune は「大金を節約できる」。日本語の「ダウンロード」は英語でも download。',
        character: 'mina', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: '広告うざすぎる',
        english: [
            'The ads are so annoying.',
            'I cannot stand the ads. They play at the worst possible moments.',
            'Nothing kills the mood faster than an ad for car insurance right in the middle of a love song.',
            "Just get premium already. It's like ten bucks a month and you'll never have to deal with that again. Totally worth it.",
        ],
        jaTranslations: [
            '広告うざすぎる。',
            '広告マジ無理。一番最悪なタイミングで流れるし。',
            'ラブソングの真っ最中に自動車保険の広告ほど雰囲気ぶち壊すものないよな。',
            'もうプレミアム入れって。月1000円くらいだし、もう二度と広告出なくなるから。絶対価値あるよ。',
        ],
        context: 'cannot stand は「我慢できない」。kills the mood は「雰囲気を壊す」。goosebumps は「鳥肌」。at full volume は「フル音量で」。unbearable は「耐えられない」。they broke me は「もう降参」。free版の広告戦略は英語圏でも同じ不満のネタ。',
        character: 'takeshi', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'ポッドキャストも聴く？',
        english: [
            'Do you listen to podcasts too?',
            'Are you into podcasts? I feel like everyone has one now.',
            'I started listening to podcasts instead of music during my commute and now I am completely addicted.',
            "I got into podcasts last year and now I barely listen to music on my commute. Got any good recommendations?",
        ],
        jaTranslations: [
            'ポッドキャストも聴く？',
            'ポッドキャスト聴いてる？なんか今みんなやってるよね。',
            '通勤中に音楽の代わりにポッドキャスト聴き始めたら完全に中毒になった。',
            '去年ポッドキャストにハマって、通勤中ほとんど音楽聴かなくなったわ。なんかおすすめある？',
        ],
        context: 'down the rabbit hole は「沼にハマった」(不思議の国のアリスから)。subscriptions は「購読リスト」。keep up は「ついていく」。backstory は「裏話・歴史」。true crime は「実録犯罪もの」。podcast の発音は「パッドキャスト」で日本語の「ポッドキャスト」とは少し違う。',
        character: 'lisa', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: '音質こだわる？',
        english: [
            'Do you care about sound quality?',
            'Are you picky about audio quality? Like can you tell the difference?',
            'Be honest. Can you actually hear the difference between normal and high-res audio or is it just placebo?',
            "Honestly? I did a blind test and couldn't tell the difference between regular and lossless. Save your money unless you've got golden ears.",
        ],
        jaTranslations: [
            '音質こだわる？',
            'オーディオの音質こだわるほう？違いわかる？',
            '正直に言えよ。普通の音質とハイレゾの違いって本当に聴き分けられる？それともプラセボじゃない？',
            '正直？ブラインドテストやったけど普通とロスレスの違いわかんなかったわ。金の耳持ってない限り節約しとけ。',
        ],
        context: 'picky は「こだわりが強い」。placebo は「プラセボ(思い込み)」。audiophile は「オーディオマニア」。lossless は「ロスレス(非圧縮)」。blind test は「ブラインドテスト」。make it out to be は「実際以上に言う」。音質論争は英語圏のオーディオコミュニティの永遠のテーマ。',
        character: 'kenji', category: 'shopping', month: '2026-07',
    },
    {
        daySlot: 103, japanese: 'イヤホンどれがいい？',
        english: [
            'Which earbuds should I get?',
            'I need new earbuds. Any recommendations?',
            'My earbuds just died and I need a replacement. Is it worth spending more for noise-canceling?',
            "Get the Sony ones. Around eighty bucks, great noise-canceling, and the battery lasts all day. Best bang for your buck.",
        ],
        jaTranslations: [
            'イヤホンどれがいい？',
            '新しいイヤホン欲しいんだけど。おすすめある？',
            'イヤホン壊れて買い替えたいんだけど、ノイキャン付きに金かける価値ある？',
            'ソニーのやつ買いな。8千円くらいでノイキャン良いし、バッテリー1日持つよ。コスパ最強。',
        ],
        context: 'earbuds は「イヤホン(カナル型)」。gave out は「壊れた」。noise-canceling は「ノイズキャンセリング」。transparency mode は「外音取り込み」。battery life は「バッテリー持ち」。each way は「片道」。日本語の「イヤホン」は英語では earbuds か earphones。headphones は大型のもの。',
        character: 'mina', category: 'shopping', month: '2026-07',
    },

    // ────────────────────────────────────────────────────
    // DAY 104: フェスの思い出 (Festival Memories)
    // Scene: 夏フェスの思い出で盛り上がる。最高と最悪のエピソードが次々出てくる。
    // ────────────────────────────────────────────────────

    {
        daySlot: 104, japanese: '夏フェス行ったことある？',
        english: [
            'Have you been to a music festival?',
            'Have you ever been to a summer music festival? Like a big outdoor one?',
            'Tell me you have been to at least one music festival in your life. It is a rite of passage.',
            "I went to one last summer and it was the best weekend of my life. You guys seriously need to go at least once.",
        ],
        jaTranslations: [
            '夏フェス行ったことある？',
            '夏の音楽フェス行ったことある？大きい野外のやつ。',
            '人生で一回くらいフェス行ったことあるよな？通過儀礼みたいなもんだぞ。',
            '去年の夏行ったけど人生最高の週末だったわ。お前ら一回は行ったほうがいいって、マジで。',
        ],
        context: 'rite of passage は「通過儀礼=一度は経験すべきこと」。multiple stages は「複数ステージ」。food vendors は「屋台」。questionable は「怪しい」。pass out は「倒れるように寝る」。all over again は「もう一回最初から」。英語の festival は fes とは略さない。fest は使う。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '日焼けがやばかった',
        english: [
            'I got so sunburned.',
            'The sunburn was brutal. I could not sleep for two days.',
            'I forgot to put on sunscreen and I literally looked like a lobster by the end of the first day.',
            "Dude, sunscreen is non-negotiable at festivals. I learned that the hard way. Reapply every two hours or you're toast.",
        ],
        jaTranslations: [
            '日焼けやばかった。',
            '日焼けがえぐかった。2日間寝れなかったもん。',
            '日焼け止め塗り忘れて、初日の終わりにはマジでロブスターみたいになってた。',
            'おい、フェスで日焼け止めは絶対だぞ。俺は痛い目見て学んだ。2時間おきに塗り直さないと終わるぞ。',
        ],
        context: 'sunburned は「日焼け(やけどレベル)」。lobster は「ロブスター=真っ赤」。peeled は「皮がむけた」。reapply は「塗り直す」。industrial-strength は「工業用=超強力な」(誇張表現)。英語では tan(健康的な焼け)と sunburn(火傷レベル)を明確に区別する。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: 'テント設営が地獄だった',
        english: [
            'Setting up the tent was a nightmare.',
            'We spent two hours trying to set up the tent and it still looked wrong.',
            'I brought a tent I had never practiced setting up and it took four of us to figure it out. Never again.',
            "Next time, do a practice run in your living room first. Trust me, you don't wanna figure it out in the heat with a hundred people watching.",
        ],
        jaTranslations: [
            'テント設営が地獄だった。',
            'テント立てるのに2時間かかって、それでもなんか変だった。',
            '一回も練習してないテント持ってったら4人がかりでやっと立てられた。二度とやらない。',
            '次はリビングで予行練習してからにしろよ。炎天下で100人に見られながら試行錯誤とか最悪だから。',
        ],
        context: 'setting up は「設営する」。nightmare は「悪夢」。paint you a picture は「状況を説明する」。gear は「荷物・装備」。stakes は「杭・ペグ」。vaguely resembles は「なんとなく似ている」。英語で tent は camping とセット。festival camping は英語圏フェスの醍醐味。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '雨降ってきて最悪だった',
        english: [
            'It started raining and it was awful.',
            'The rain completely ruined the second day. Everything was mud.',
            'It went from sunny to pouring in about ten minutes and we were stuck in the middle of a field with nowhere to hide.',
            "At least the rain makes for a great story. Some of my best festival memories are from when everything went completely wrong.",
        ],
        jaTranslations: [
            '雨降ってきて最悪だった。',
            '雨で2日目完全に台無し。全部泥だらけ。',
            '10分で晴れから土砂降りになって、野原の真ん中で逃げ場なくて詰んだ。',
            '雨は最高のネタになるだろ。フェスの一番の思い出って全部うまくいかなかった時のやつだし。',
        ],
        context: 'pouring は「土砂降り」。mud pit は「泥の池」。the sky opens up は「空が割れる=大雨が降る」。slipping and sliding は「滑りまくる」。bonds everyone together は「みんなを結びつける」。英語圏のフェスでは rain = 泥 = 名物エピソード。Glastonbury が有名。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '知らないバンドが意外に良かった',
        english: [
            'A band I never heard of was surprisingly good.',
            'The best act I saw was one I had never even heard of before.',
            'I randomly walked into a small stage and discovered this band that absolutely blew me away.',
            "That's the best part of festivals. What's their name? I wanna look 'em up. Those small stage discoveries are always the best.",
        ],
        jaTranslations: [
            '知らないバンドが意外によかった。',
            '一番よかったアクトは聴いたこともなかったやつだった。',
            'たまたま小さいステージふらっと入ったら、そこで見つけたバンドにぶっ飛ばされた。',
            'それがフェスの醍醐味だよな。なんてバンド？調べたい。小さいステージの発見が一番いいんだよ。',
        ],
        context: 'act は「出演アーティスト」。headliner は「メインアクト」。blew me away は「衝撃を受けた」。killing time は「時間を潰す」。wandered over は「ふらっと行った」。captivated は「魅了された」。buried treasure は「埋蔵金=隠れた名品」。',
        character: 'mina', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: 'トイレの行列がえぐかった',
        english: [
            'The bathroom line was insane.',
            'I waited thirty minutes for the bathroom and I am never doing that again.',
            'The portable toilets at festivals are a war zone. I would rather hold it for twelve hours than go in there.',
            "I'm getting VIP next time just for the bathrooms alone. Regular porta-potties by day two are a nightmare I never wanna relive.",
        ],
        jaTranslations: [
            'トイレの行列がえぐかった。',
            'トイレに30分並んだ。もう二度とやらない。',
            'フェスの仮設トイレは戦場だよ。12時間我慢するほうがあそこに入るよりマシ。',
            '次はトイレだけのためにVIP取るわ。2日目の普通の仮設トイレとか二度と経験したくない悪夢。',
        ],
        context: 'portable toilets は「仮設トイレ」。war zone は「戦場」。hold it は「我慢する」。mystery liquid は「正体不明の液体」。survival mode は「サバイバルモード」。英語では porta-potty(ポータポティ)とも呼ぶ。フェスのトイレ話は万国共通の地獄エピソード。',
        character: 'takeshi', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: 'フェス飯って高いけどうまい',
        english: [
            'Festival food is pricey but good.',
            'The food at festivals costs a fortune but honestly it is worth it.',
            'I spent more money on food than on the actual ticket. But the tacos from that one truck were life-changing.',
            "So true. I spent like eighty bucks on food alone last year but those pulled pork tacos were genuinely worth every penny.",
        ],
        jaTranslations: [
            'フェス飯って高いけどうまい。',
            'フェスの飯ってめっちゃ高いけど正直それだけの価値ある。',
            'チケットより飯に金使ったわ。でもあのキッチンカーのタコスは人生変わるレベルだった。',
            'わかる。去年フードだけで8千円くらい使ったけど、あのプルドポークタコスはマジで1円の価値あった。',
        ],
        context: 'highway robbery は「ぼったくり」。costs a fortune は「めちゃくちゃ高い」。life-changing は「人生を変える」。burn through calories は「カロリーを消費する」。vendors は「出店者」。food truck は「キッチンカー」。日本語の「フェス飯」は festival food と言えばOK。',
        character: 'master', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '来年も絶対行こう',
        english: [
            'We are definitely going next year.',
            'I am already planning for next year. Who is coming with me?',
            'If you did not enjoy yourself this time, you were doing it wrong. We are going back next year and I am not taking no for an answer.',
            "I'm already in. Start a group chat and let's plan it. I wanna get VIP this time so we don't have to deal with those bathrooms again.",
        ],
        jaTranslations: [
            '来年も絶対行きます。',
            '来年もう計画立ててる。誰か一緒に行く？',
            '今回楽しめなかったやつは、やり方が間違ってたんだよ。来年も行くからな、断るのはナシで。',
            'もう参加確定。グループチャット作ってくれ。今度はVIP取ろうよ、あのトイレもう勘弁。',
        ],
        context: 'I am not taking no for an answer は「ノーは受け付けない」。lineup は「出演者リスト」。Stockholm syndrome は「ストックホルム症候群=辛いのに離れられない」。VIP は「ヴィアイピー」(英語では「ヴィップ」とは読まない)。upgrade は「アップグレード」。',
        character: 'yuki', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: '写真より目に焼き付けたい',
        english: [
            'I want to remember it with my eyes, not my phone.',
            'I stopped filming and just took it all in. Some moments are better without a screen.',
            'Everyone around me had their phones up recording but I put mine away. I wanted to actually be there, not watch it through a four-inch screen.',
            "Respect. I always tell myself I'll put my phone away and then end up recording anyway. But you're right, the videos always turn out terrible.",
        ],
        jaTranslations: [
            '写真じゃなくて目で覚えたい。',
            '撮るのやめて、ただ全部目に焼き付けた。画面越しより、そのまま見た方がいい瞬間ってある。',
            '周りみんなスマホ構えて撮ってたけど、俺はしまった。4インチの画面越しじゃなくて、本当にその場にいたかったんだよ。',
            'かっけえな。俺もいつもスマホしまおうと思うのに結局撮っちゃうんだよな。でもお前の言う通り、動画って大体ひどい出来なんだよな。',
        ],
        context: 'took it all in は「全部目に焼き付けた」。footage は「映像」。camera roll は「カメラロール」。be there は「その場にいる(精神的に)」。英語では live in the moment(今を生きる)という表現がこの感覚に近い。スマホ越しに体験する問題は英語圏でもよく議論される。',
        character: 'kenji', category: 'social', month: '2026-07',
    },
    {
        daySlot: 104, japanese: 'あの瞬間が忘れられない',
        english: [
            'I will never forget that moment.',
            'That one moment is burned into my memory forever.',
            'Years from now when I look back at my life, that moment at the festival is going to be one of the highlights.',
            "I know exactly the feeling you're talking about. That's why we keep going back, even when everything else about festivals is a mess.",
        ],
        jaTranslations: [
            'あの瞬間は一生忘れません。',
            'あの瞬間、一生記憶に焼き付いてる。',
            '何年後かに人生振り返ったとき、あのフェスの瞬間は絶対ハイライトの一つだと思う。',
            'その感覚、めっちゃわかる。だからフェスって他が全部グダグダでも、また行っちゃうんだよな。',
        ],
        context: 'burned into my memory は「記憶に焼き付いている」。highlights は「ハイライト」。aligns は「噛み合う」。replicate は「再現する」。英語では core memory(核心的な記憶)という表現が最近使われるようになった。Pixarのインサイドヘッドから広まった表現。',
        character: 'lisa', category: 'social', month: '2026-07',
    },
];

// ============================================================
// DAY THEMES & KEYWORDS -- MONTH 4 WEEK 14
// ============================================================

export const MONTH4_W14_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    98: {
        title: '音楽の趣味', titleEn: 'Music Taste', category: 'social',
        scene: '居酒屋で「どんな音楽聴くの？」から始まる趣味トーク。世代間ギャップが面白い。',
        keywords: [
            { en: 'playlist', ja: 'プレイリスト', pron: 'プレイリスト', example: 'My playlist is all over the place.', note: 'play + list。英語圏では playlist sharing が友人関係の証。Spotifyのプレイリストを共有するのは結構親密な行為。' },
            { en: 'catchy', ja: '耳に残る', pron: 'キャッチー', example: 'This song is so catchy.', note: 'catch(捕まえる)が語源。耳が捕まれる=耳に残る。catchy tune, catchy melody。褒め言葉。反対は forgettable。' },
            { en: 'lyrics', ja: '歌詞', pron: 'リリクス', example: 'The lyrics really speak to me.', note: '常に複数形。a lyric とは普通言わない。lyricist=作詞家。英語の歌詞はダブルミーニングが多い。' },
            { en: 'vibe', ja: '雰囲気・ノリ', pron: 'ヴァイブ', example: 'This song has a chill vibe.', note: '元は振動(vibration)。今は雰囲気・空気感全般に使う万能語。good vibes, bad vibes, vibes だけでも使う。' },
            { en: 'nostalgic', ja: '懐かしい', pron: 'ノスタルジック', example: 'That song makes me feel nostalgic.', note: '日本語の「懐かしい」より重い。甘くて少し切ない感情。名詞は nostalgia。nostalgic for my childhood のように for と使う。' },
        ],
    },
    99: {
        title: 'ライブに行く', titleEn: 'Going to Concerts', category: 'travel',
        scene: 'ケンジが初めて洋楽アーティストのライブに行く。チケット争奪戦からの話。',
        keywords: [
            { en: 'venue', ja: '会場', pron: 'ヴェニュー', example: 'The venue was packed.', note: '発音注意。「ベニュー」ではなく「ヴェニュー」。concert venue, wedding venue。場所全般に使える。' },
            { en: 'encore', ja: 'アンコール', pron: 'アンコー', example: 'They played three songs for the encore.', note: 'フランス語由来で「もう一度」。日本語の「アンコール」と同じ。掛け声は英語では One more song! が主流。' },
            { en: 'merch', ja: 'グッズ', pron: 'マーチ', example: 'Did you see the merch table?', note: 'merchandise の略。発音は「マーチ」。tour merch=ツアーグッズ。日本語の「グッズ」は goods だけど音楽ではmerch。' },
            { en: 'setlist', ja: 'セットリスト', pron: 'セットリスト', example: 'The setlist was perfect.', note: '日本語の「セトリ」は英語圏でも setlist で通じる珍しい例。set は「演目一式」の意味。' },
            { en: 'scalper', ja: '転売ヤー', pron: 'スキャルパー', example: 'Scalpers bought all the tickets.', note: 'scalp=頭皮を剥ぐ(語源が怖い)。ticket scalping=チケット転売。英語圏でも深刻な社会問題。reseller とも。' },
        ],
    },
    100: {
        title: 'カラオケ', titleEn: 'Karaoke Night', category: 'social',
        scene: '二次会でカラオケへ。選曲バトルと歌唱力論争が始まる。',
        keywords: [
            { en: 'tone-deaf', ja: '音痴', pron: 'トーンデフ', example: 'I am completely tone-deaf.', note: 'tone(音程)+deaf(聞こえない)=音程が聞こえない=音痴。cannot carry a tune も同義。自虐で使うのが多い。' },
            { en: 'duet', ja: 'デュエット', pron: 'デュエット', example: 'Let us sing a duet.', note: 'duo(2人組)と似ているけど別。duet=2人で歌う曲。trio=3人。solo=1人。英語の発音は「デュエット」でOK。' },
            { en: 'mic', ja: 'マイク', pron: 'マイク', example: 'Pass me the mic.', note: 'microphone の略。mic hog=マイク独占者。drop the mic=マイクを落とす(最高の一言で終わる)。比喩でも使う。' },
            { en: 'pitch', ja: '音程', pron: 'ピッチ', example: 'I cannot match the pitch.', note: '音の高さ。pitch-perfect=完璧な音程。off-pitch=音程がずれている。sales pitch(売り込み)とは別の意味。' },
            { en: 'chorus', ja: 'サビ', pron: 'コーラス', example: 'Everyone sings along to the chorus.', note: '日本語の「サビ」は英語では chorus。verse=Aメロ、bridge=Bメロ、chorus=サビ。英語圏では hook(フック)とも呼ぶ。' },
        ],
    },
    101: {
        title: '楽器と練習', titleEn: 'Instruments and Practice', category: 'request',
        scene: 'タケシがギターを始めたいと言い出す。楽器経験者が集まってアドバイス大会。',
        keywords: [
            { en: 'chord', ja: 'コード', pron: 'コード', example: 'Learn five basic chords first.', note: 'cord(紐)と同音だけど意味は全く違う。power chord, bar chord。日本語の「コード」はそのまま通じる。' },
            { en: 'callus', ja: 'タコ(指の)', pron: 'キャラス', example: 'You will develop calluses on your fingers.', note: '皮膚が硬くなったタコ。ギタリストの勲章。calluses(複数形)で使うことが多い。blister(マメ)とは違う。' },
            { en: 'self-taught', ja: '独学の', pron: 'セルフトート', example: 'He is a self-taught guitarist.', note: 'self(自分)+taught(teach の過去分詞)=自分で教えた=独学。形容詞として使う。I am self-taught. で「独学です」。' },
            { en: 'rehearsal', ja: 'リハーサル', pron: 'リハーサル', example: 'We have band rehearsal on Saturday.', note: 'rehearse=練習する。practice より正式。バンドの練習は rehearsal、個人練習は practice が自然。dress rehearsal=最終リハ。' },
            { en: 'tuning', ja: 'チューニング', pron: 'チューニング', example: 'Your guitar is out of tuning.', note: 'tune=調律する。in tune=音が合っている。out of tune=音が狂っている。fine-tuning=微調整。比喩でも使える。' },
        ],
    },
    102: {
        title: '好きな曲', titleEn: 'Favorite Songs', category: 'feeling',
        scene: '居酒屋で「人生で一番好きな曲は？」という深い質問から始まる。',
        keywords: [
            { en: 'all-time', ja: '史上最高の', pron: 'オールタイム', example: 'What is your all-time favorite?', note: 'all-time favorite=人生で一番好き。all-time great=史上最高。ハイフンで繋げて形容詞化。all-time low=史上最低。' },
            { en: 'goosebumps', ja: '鳥肌', pron: 'グースバンプス', example: 'This song gives me goosebumps.', note: 'goose(ガチョウ)+bumps(ぶつぶつ)=鳥肌。日本語は鳥、英語はガチョウ。chills でも同じ意味。常に複数形。' },
            { en: 'anthem', ja: '応援歌・アンセム', pron: 'アンセム', example: 'That is our generation is anthem.', note: '元は聖歌。今は世代や集団を代表する曲。national anthem=国歌。90s anthem=90年代のアンセム。' },
            { en: 'melody', ja: 'メロディー', pron: 'メロディー', example: 'The melody is stuck in my head.', note: '日本語と同じだけど、英語では tune(曲調)とよく使い分ける。melody はより音楽理論的。casual には tune が多い。' },
            { en: 'ballad', ja: 'バラード', pron: 'バラッド', example: 'I love a good ballad.', note: '発音注意。「バラード」ではなく「バラッド」。ゆっくりした感情的な曲。power ballad=盛り上がるバラード。' },
        ],
    },
    103: {
        title: '音楽配信', titleEn: 'Streaming Music', category: 'shopping',
        scene: 'SpotifyとApple Musicどっち派？から始まるストリーミング論争。',
        keywords: [
            { en: 'subscription', ja: 'サブスクリプション', pron: 'サブスクリプション', example: 'I just got a music subscription.', note: 'subscribe=購読する。日本語の「サブスク」は和製略語。英語では sub とは略さない。cancel my subscription=解約する。' },
            { en: 'algorithm', ja: 'アルゴリズム', pron: 'アルゴリズム', example: 'The algorithm knows my taste.', note: '発音は「アルゴリズム」。自動推薦の仕組み。the algorithm は擬人化して使われることが多い。filter bubble 問題と関連。' },
            { en: 'offline', ja: 'オフライン', pron: 'オフライン', example: 'Download it for offline listening.', note: 'offline mode=オフラインモード。go offline=オフラインにする。反対は online。飛行機内や地下鉄で必須。' },
            { en: 'vinyl', ja: 'レコード盤', pron: 'ヴァイナル', example: 'Vinyl is making a comeback.', note: '発音は「ヴァイナル」。素材名(ビニール)がそのままレコードの意味に。vinyl record, vinyl collection。復活中。' },
            { en: 'premium', ja: 'プレミアム(有料版)', pron: 'プリーミアム', example: 'I upgraded to premium.', note: '発音は「プリーミアム」で「プレミアム」ではない。premium plan=有料プラン。freemium=無料+有料のビジネスモデル。' },
        ],
    },
    104: {
        title: 'フェスの思い出', titleEn: 'Festival Memories', category: 'social',
        scene: '夏フェスの思い出で盛り上がる。最高と最悪のエピソードが次々出てくる。',
        keywords: [
            { en: 'headliner', ja: 'メインアクト', pron: 'ヘッドライナー', example: 'Who is the headliner this year?', note: 'headline=見出し。一番目立つ=メインアクト。headline a festival=フェスのメインを務める。closing act とも。' },
            { en: 'sunburn', ja: '日焼け(やけど)', pron: 'サンバーン', example: 'I got a terrible sunburn.', note: 'tan=健康的な焼け。sunburn=やけどレベル。日本語の「日焼け」は両方含むけど英語は明確に区別。sunscreen=日焼け止め。' },
            { en: 'mud', ja: '泥', pron: 'マッド', example: 'The whole field turned to mud.', note: 'muddy=泥だらけの。mud pit=泥の池。英語圏フェスでは雨=泥=名物。Glastonbury は mud festival と呼ばれるほど。' },
            { en: 'lineup', ja: '出演者リスト', pron: 'ラインナップ', example: 'The lineup this year is stacked.', note: 'stacked=豪華。star-studded lineup=スター揃い。日本語の「ラインナップ」はそのまま通じる珍しい和製英語。' },
            { en: 'camping', ja: 'キャンプ(テント泊)', pron: 'キャンピング', example: 'Are you camping at the festival?', note: 'glamping=豪華キャンプ(glamorous+camping)。camp out=キャンプする。英語圏フェスではキャンプが標準。日本とは違う文化。' },
        ],
    },
};
