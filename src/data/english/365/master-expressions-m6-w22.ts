/**
 * 365 English Master -- Month 6 Week 22: 旅先で (At the Destination)
 * Days 158-164: 70 expressions
 * Month: September 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 6 (2026-09) -- WEEK 22
// ============================================================

export const MONTH6_W22_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 158: ホテルで (At the Hotel)
    // Scene: チェックインしてトラブルや要望を伝える
    // ────────────────────────────────────────────────────

    {
        daySlot: 158, japanese: 'チェックインお願いします',
        english: [
            'I would like to check in.',
            'Hi, checking in. Last name is Tanaka.',
            'Good afternoon. I have a reservation under Tanaka for two nights.',
            "Of course, let me pull that up. Tanaka, two nights, non-smoking on a higher floor. You're all set, here's your key card.",
        ],
        jaTranslations: [
            'チェックインしたいのですが。',
            'チェックインで。田中です。',
            'こんにちは。田中で2泊の予約をしてるんですけど。',
            'はい、確認しますね。田中様、2泊、禁煙の高層階ですね。準備できてます、こちらがカードキーです。',
        ],
        context: 'under the name は「〜の名前で」。reservation under は予約を伝える定番。I have the confirmation は準備の良さを見せる。higher floor は「上の階」。日本語の「お願いします」は英語では具体的に何をしてほしいか言う必要がある。take your time は余裕を見せる便利フレーズ。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: '部屋を変えてもらえますか？',
        english: [
            'Can I change rooms?',
            'Is it possible to switch to a different room?',
            'I hate to be a bother, but would it be possible to move to a quieter room?',
            "Absolutely, I'm sorry about that. We've got a room on the seventh floor, opposite side of the building. I'll have your bags moved right away.",
        ],
        jaTranslations: [
            '部屋を変えられますか？',
            '別の部屋に替えてもらうことってできますか？',
            'お手数なんですけど、もっと静かな部屋に移れたりしませんか？',
            'もちろんです、申し訳ありません。7階の建物の反対側にお部屋がございます。すぐにお荷物を移動させますね。',
        ],
        context: 'I hate to be a bother は「お手数ですが」に近い英語の定番クッション。switch は「交換する」。through the floor は「床越しに」。preferably は「できれば」。日本人はクレームを遠慮しがちだが、英語圏のホテルでは部屋の変更リクエストは普通。遠慮するほうがスタッフも困る。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: 'Wi-Fiのパスワード教えてください',
        english: [
            'What is the Wi-Fi password?',
            'Could you tell me the Wi-Fi password?',
            'Sorry, I cannot seem to connect to the Wi-Fi. Could you help me out with the password?',
            "Yeah, they actually changed the network name last week. Try 'GrandHotel5G' all one word, and the password is on this card. That should get you connected.",
        ],
        jaTranslations: [
            'Wi-Fiのパスワードは何ですか？',
            'Wi-Fiのパスワードを教えてもらえますか？',
            'すみません、Wi-Fiに繋がらないんですけど、パスワード教えてもらえます？',
            'あー、実は先週ネットワーク名が変わったんですよ。「GrandHotel5G」でスペースなし、パスワードはこのカードに書いてあります。それで繋がるはずです。',
        ],
        context: 'connect to は「接続する」。help me out は「助けてくれる」のカジュアル版。double check は「再確認する」。get online は「ネットにつなぐ」。used up は「使い切った」。海外ホテルのWi-Fiは繋がらないことが本当に多い。パスワードが間違っているのか、回線が弱いのか、まず確認が必要。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: 'エアコンの使い方がわからない',
        english: [
            'How do I use the AC?',
            'I cannot figure out how to work the air conditioning.',
            'This is embarrassing but I have been pressing every button on the AC remote and nothing happens.',
            "No worries, that remote confuses everyone. I'll send someone up in five minutes to walk you through it.",
        ],
        jaTranslations: [
            'エアコンはどう使うんですか？',
            'エアコンの操作方法がわからないんですけど。',
            '恥ずかしいんですけど、エアコンのリモコンのボタン全部押しても何も起きなくて。',
            '大丈夫ですよ、あのリモコンはみんな混乱するんです。5分以内にスタッフを送りますので、使い方を説明させますね。',
        ],
        context: 'AC は air conditioning の略で会話ではこちらが一般的。figure out は「理解する」。work は「操作する」の意味もある。I feel like a complete idiot は自虐ユーモア。come up は「上に来る」。海外のエアコンは操作方法が全然違うことが多い。華氏表示も混乱のもと。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: 'タオルをもう一枚もらえますか？',
        english: [
            'Can I get another towel?',
            'Could I get one more towel please?',
            'Hi, I was wondering if I could get an extra towel sent up to my room.',
            "Sure thing, I'll have housekeeping bring up two extra towels and a pillow right away. Anything else you need?",
        ],
        jaTranslations: [
            'タオルをもう一枚もらえますか？',
            'タオルをもう一枚いただけますか？',
            'あの、部屋にタオルを追加で届けてもらえたりしますか？',
            'もちろんです、すぐにハウスキーピングにタオル2枚と枕をお持ちさせますね。他に何かありますか？',
        ],
        context: 'sent up は「部屋まで届けてもらう」。on the thin side は「ちょっと薄い」の婉曲表現。soaking wet は「びしょ濡れ」。high maintenance は「注文が多い」。日本のホテルではタオルが充実しているが、海外では追加が必要なことが多い。extra は「追加の」で万能。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: 'お湯が出ないんですけど',
        english: [
            'There is no hot water.',
            'The hot water is not working in my room.',
            'I turned on the shower about ten minutes ago and it is still running cold.',
            "I'm really sorry about that. We've had a plumbing issue on that floor all afternoon. I can move you to a different room right now if you'd like.",
        ],
        jaTranslations: [
            'お湯が出ません。',
            '部屋のお湯が出ないんですけど。',
            '10分くらい前にシャワーつけたんですけど、まだ水しか出なくて。',
            '本当に申し訳ございません。実はそのフロアは午後からずっと配管の問題がありまして。よろしければ今すぐ別のお部屋にお移しできますが。',
        ],
        context: 'running cold は「冷たい水が出続けている」。warm up は「温まる」。building-wide は「建物全体の」。plumbing は「配管」。let it run は「出しっぱなしにする」。ice cold は「氷のように冷たい」。海外ホテルのシャワー問題は旅行あるある。handles は蛇口のハンドル。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: '景色がすごい！',
        english: [
            'What a view!',
            'The view from this room is incredible.',
            'Come look at this. You can see the whole city from up here.',
            "Right? I told you the higher floor was worth it. Grab your phone, we need a picture of this before the sun goes down.",
        ],
        jaTranslations: [
            'すごい景色！',
            'この部屋からの眺め、やばい。',
            'ちょっと来て見て。ここから街全体が見えるよ。',
            'でしょ？高い階にしてよかったって言ったじゃん。スマホ出して、日が沈む前に写真撮ろう。',
        ],
        context: 'What a view は感動の定番表現。skyline は「街のスカイライン」。unreal は「信じられない」の口語。worth the trip は「旅行の価値があった」。stare at は「じっと見る」。英語では感動を大げさに表現するのが普通。日本人の「きれい」より百倍オーバーリアクション。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: 'フロントに聞いてみよう',
        english: [
            'Let us ask the front desk.',
            'I will go check with the front desk real quick.',
            'I am not sure. Let me swing by the front desk and ask.',
            "Good idea. Ask them about restaurant recommendations too. I'm starving and I don't wanna end up at some tourist trap.",
        ],
        jaTranslations: [
            'フロントに聞こう。',
            'ちょっとフロントで確認してくるわ。',
            'わかんないな。フロントにちょっと寄って聞いてくるよ。',
            'いいね。レストランのおすすめも聞いてきて。腹ペコだし、観光客向けのぼったくり店だけは勘弁。',
        ],
        context: 'front desk は「フロント」。日本語と同じだが英語では reception desk とも言う。swing by は「ちょっと寄る」。real quick は「すぐに」。discount coupons は「割引券」。tourist attractions は「観光名所」。ホテルのフロントは情報の宝庫。遠慮せず何でも聞くのが得策。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: 'チェックアウト延長できますか？',
        english: [
            'Can I get a late checkout?',
            'Is it possible to extend the checkout time?',
            'We are having such a great time. Any chance we could push checkout to one PM?',
            "Let me check for you. Yeah, we can do one PM, no extra charge. Just leave the key at the front desk when you head out.",
        ],
        jaTranslations: [
            'レイトチェックアウトできますか？',
            'チェックアウトの時間を延長できますか？',
            'すごく楽しんでて。チェックアウトを午後1時にしてもらえたりしませんか？',
            '確認しますね。はい、午後1時で大丈夫です、追加料金なしで。出るときにフロントに鍵を置いていってください。',
        ],
        context: 'late checkout は「チェックアウト延長」。push to は「〜に延ばす」。extra charge は「追加料金」。hang out は「のんびり過ごす」。sit around は「何もせずにいる」。日本のホテルは10時チェックアウトが多いが海外は11時か12時が多い。late checkout は聞くだけタダ。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 158, japanese: '荷物を預かってもらえますか？',
        english: [
            'Can you hold my bags?',
            'Could I leave my luggage here for a few hours?',
            'We have already checked out but our flight is tonight. Could you store our bags until then?',
            "Of course, we have a luggage room right behind the front desk. Just come pick them up whenever you're ready and have a great last day out there.",
        ],
        jaTranslations: [
            '荷物を預かってもらえますか？',
            '荷物を数時間ここに置かせてもらえますか？',
            'もうチェックアウトしたんですけど、フライトが今夜なんです。それまで荷物を預かってもらえますか？',
            'もちろんです、フロントのすぐ裏に荷物室がございます。準備ができたらいつでも取りに来てください。最後の一日を楽しんでくださいね。',
        ],
        context: 'hold my bags は「荷物を預かる」の口語。store は「保管する」。dragging suitcases は「スーツケースを引きずる」。pick up は「受け取りに来る」。storage room は「荷物置き場」。チェックアウト後の荷物預かりはほとんどのホテルが無料でやってくれるが、聞かないとわからない。',
        character: 'mina', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 159: 道を聞く (Asking for Directions)
    // Scene: 初めての街を歩きながら現地の人に道を聞く
    // ────────────────────────────────────────────────────

    {
        daySlot: 159, japanese: 'すみません、道に迷いました',
        english: [
            'Excuse me, I am lost.',
            'Sorry, I think I am lost. Could you help me?',
            'This is embarrassing but I have been walking in circles for twenty minutes. Am I anywhere near the train station?',
            "Oh yeah, the station's kinda tricky to find from here. Go straight down this street and take the second left. You'll see it in about five minutes.",
        ],
        jaTranslations: [
            'すみません、道に迷いました。',
            'すみません、迷っちゃったみたいで。助けてもらえますか？',
            '恥ずかしいんですけど、20分くらい同じとこぐるぐる回ってて。駅ってこの辺ですか？',
            'ああ、駅はここからだとちょっとわかりにくいんだよね。この道をまっすぐ行って2つ目を左に曲がれば、5分くらいで着くよ。',
        ],
        context: 'I am lost は「迷った」のシンプルな表現。walking in circles は「同じところをぐるぐる回る」。phone died は「スマホの電池が切れた」。point me in the right direction は「正しい方向を教える」。英語で道を聞くのは意外とハードルが高いが、Excuse me と言えばほとんどの人が親切に教えてくれる。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: 'ここからどのくらいかかりますか？',
        english: [
            'How far is it from here?',
            'How long does it take to walk there from here?',
            'Is the museum within walking distance or should we grab a taxi?',
            "Honestly, it's about a twenty-minute walk but it's uphill most of the way. I'd grab a taxi if I were you, especially in this heat.",
        ],
        jaTranslations: [
            'ここからどのくらいですか？',
            'ここから歩いてどのくらいかかりますか？',
            '美術館って歩いて行ける距離？それともタクシー乗ったほうがいい？',
            '正直、歩いて20分くらいだけどほとんど上り坂だよ。この暑さだったらタクシーのほうがいいと思う。',
        ],
        context: 'How far は「どのくらい遠い」。within walking distance は「歩ける距離」。walkable は「歩いて行ける」。at a normal pace は「普通のペースで」。straightforward は「わかりやすい」。日本語の「どのくらい」は時間にも距離にも使えるが、英語では How far（距離）と How long（時間）を使い分ける。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: '右に曲がるんですか？左ですか？',
        english: [
            'Do I turn right or left?',
            'Wait, is it a right turn or a left at the intersection?',
            'Sorry, I got confused. After the traffic light, do I go right or left?',
            "Left. Definitely left at the traffic light. If you hit the park, you've gone too far.",
        ],
        jaTranslations: [
            '右に曲がるの？左？',
            'えっと、交差点で右折？左折？',
            'ごめん、わかんなくなっちゃった。信号の先は右？左？',
            '左。信号を絶対左ね。公園が見えたら行きすぎだよ。',
        ],
        context: 'intersection は「交差点」。traffic light は「信号」。mix up は「混同する」。point は「指差す」。物理的に指差してもらうのは英語力に関係なく確実。two blocks は「2ブロック」でアメリカでは距離の基本単位。日本の「信号を右」と同じ構造だが block の概念が日本にはない。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: 'この辺にコンビニありますか？',
        english: [
            'Is there a convenience store nearby?',
            'Do you know if there is a convenience store around here?',
            'I need to grab a few things. Is there a convenience store or a drugstore within a couple of blocks?',
            "There's a small grocery shop about two blocks that way, past the pharmacy. They're open till midnight so you've got plenty of time.",
        ],
        jaTranslations: [
            'この近くにコンビニはありますか？',
            'この辺にコンビニがあるか知ってますか？',
            'ちょっと買い物したくて。この近くにコンビニかドラッグストアってあります？',
            'あっちに2ブロックくらい行ったとこに小さい食料品店があるよ、薬局の先。夜中の12時までやってるから余裕あるよ。',
        ],
        context: 'nearby は「近くに」。around here は「この辺に」。grab a few things は「ちょっと買い物する」。pick up は「買う」のカジュアル版。anything will do は「何でもいい」。日本のコンビニ密度は世界一。海外では convenience store が少なく、drugstore や gas station で代用することが多い。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: 'このバスはどこ行きですか？',
        english: [
            'Where does this bus go?',
            'Excuse me, does this bus go to the city center?',
            'Sorry, I am not sure if I am at the right stop. Does this bus go to downtown?',
            "Yep, this one goes right through downtown. Get off at Central Square, that's about six stops from here. Fare's two fifty, and they take cards.",
        ],
        jaTranslations: [
            'このバスはどこ行きですか？',
            'すみません、このバスは市内中心部に行きますか？',
            'すみません、このバス停で合ってるかわからなくて。このバスはダウンタウンに行きます？',
            'うん、このバスはダウンタウンを通るよ。セントラル・スクエアで降りて、ここから6つ目くらい。運賃は2ドル50セント、カードも使えるよ。',
        ],
        context: 'city center / downtown は「中心部」。route は「路線」。get off at は「〜で降りる」。fare は「運賃」。exact change は「おつりなしの金額」。英語圏のバスは路線がわかりにくい。日本のバスは整理券方式だが、海外は乗車時に払うのが一般的。first time here は「初めて来た」の一言で許してもらえる魔法の言葉。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: 'Google Mapの通りに行けばいい？',
        english: [
            'Should I just follow Google Maps?',
            'I will just follow Google Maps. That should work, right?',
            'My phone says it is a ten-minute walk this way but honestly I do not fully trust the directions.',
            "The route looks right but skip that second left. Keep going straight till you see the fountain, then cut through the park. Way faster and it's a nicer walk too.",
        ],
        jaTranslations: [
            'Google Mapに従って行けばいい？',
            'Google Map通りに行くわ。大丈夫だよね？',
            'スマホだと徒歩10分でこっちって出てるんだけど、正直この案内あんまり信用できなくて。',
            'ルートは合ってるけど、2つ目の左折はスキップして。噴水が見えるまでまっすぐ行って、そこから公園を突っ切れ。そっちのほうが全然速いし、歩いてて気持ちいいよ。',
        ],
        context: 'pulled up は「表示している」。GPS は「ジーピーエス」で通じる。blindly は「盲目的に」。residential area は「住宅街」。sidewalk は「歩道」。shortcuts は「近道」。Google Maps は海外旅行の命綱だが完璧ではない。locals は「地元の人」。地元民の知識はアプリに勝ることが多い。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: 'ここはどこですか？',
        english: [
            'Where am I right now?',
            'Can you tell me where exactly I am on this map?',
            'I know this sounds dumb but I genuinely have no idea where I am right now.',
            "You're actually really close. See that tall church over there? The museum's right behind it, like a two-minute walk.",
        ],
        jaTranslations: [
            '今どこにいるんだろう？',
            'この地図で今自分がどこにいるか教えてもらえますか？',
            'バカみたいな質問なんだけど、今マジで自分がどこにいるかわからないんだよね。',
            '実はめっちゃ近いよ。あそこに背の高い教会見える？美術館はその裏、歩いて2分くらいだよ。',
        ],
        context: 'Where am I は究極のシンプル表現。lost my sense of direction は「方向感覚を失った」。took a wrong turn は「間違った方向に曲がった」。glitching は「不具合が出ている」。blue dot はスマホ地図の現在地マーク。starting point は「出発点」。迷子になったときは恥ずかしがらず聞くのが一番。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: '目印はありますか？',
        english: [
            'Are there any landmarks?',
            'Is there a landmark I should look for?',
            'What should I look out for? Like, is there a big sign or a building I cannot miss?',
            "There's a big red clock tower you literally can't miss. Once you see that, turn right and you're basically there.",
        ],
        jaTranslations: [
            '何か目印はありますか？',
            '探すべき目印ってありますか？',
            '何を目印にすればいい？大きい看板とか、見落としようがない建物とかある？',
            '赤いでっかい時計塔があるから絶対見逃さないよ。それが見えたら右に曲がれば、もうほぼ着いたようなもんだ。',
        ],
        context: 'landmark は「目印」。look out for は「探す・注意して見る」。cannot miss は「見逃すはずがない」。navigate by は「〜を頼りに移動する」。recognizable は「見分けがつく」。I got it は「わかった」。日本語の「目印」と landmark はほぼ同じ概念。英語圏では street name で道案内するのが主流。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: '歩きより電車のほうがいいかな',
        english: [
            'Maybe I should take the train.',
            'It might be faster to take the train instead of walking.',
            'I was going to walk but looking at the distance, I think the train makes more sense.',
            "Yeah, let's just take the train. There's a station right around the corner and it's only two stops. No point destroying our legs before we even get there.",
        ],
        jaTranslations: [
            '電車のほうがいいかも。',
            '歩くより電車のほうが速いかもね。',
            '歩くつもりだったんだけど、距離見たら電車のほうが合理的な気がしてきた。',
            'だな、電車にしよう。角にすぐ駅があるし、たった2駅だし。着く前に足を壊す意味ないだろ。',
        ],
        context: 'makes more sense は「そのほうが合理的」。killing me は「めちゃくちゃ痛い」。wiped out は「疲れ果てた」。on foot は「徒歩で」。subway は地下鉄。save my energy は「体力を温存する」。there is a limit は「限度がある」。英語では体の不調を大げさに表現するのが普通。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 159, japanese: 'ありがとう、助かりました',
        english: [
            'Thank you so much.',
            'Thanks, you have been really helpful.',
            'I really appreciate it. I would still be wandering around if it were not for you.',
            "No problem at all! Enjoy your stay. And if you get lost again, just ask anyone. People around here are pretty friendly.",
        ],
        jaTranslations: [
            '本当にありがとうございます。',
            'ありがとう、すごく助かりました。',
            'マジで感謝です。あなたがいなかったら今頃まだウロウロしてましたよ。',
            '全然大丈夫！旅を楽しんでね。また迷ったら誰にでも聞いて。この辺の人はみんな親切だから。',
        ],
        context: 'I appreciate it は「感謝します」の丁寧版。wandering around は「さまよっている」。if it were not for you は「あなたがいなかったら」の仮定法。made my day は「おかげでいい一日になった」。英語圏では感謝を具体的に、大げさに表現する。日本語の「助かりました」一言では足りないレベル。',
        character: 'mina', category: 'travel', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 160: タクシーに乗る (Taking a Taxi)
    // Scene: タクシーを捕まえて目的地まで行く
    // ────────────────────────────────────────────────────

    {
        daySlot: 160, japanese: 'タクシーを呼んでもらえますか？',
        english: [
            'Can you call me a taxi?',
            'Could you call a taxi for me please?',
            'Excuse me, is there any way you could call a taxi? I do not have the local app.',
            "Sure, I'll call one for you. There's usually one here within five minutes. Where are you headed?",
        ],
        jaTranslations: [
            'タクシーを呼んでもらえますか？',
            'タクシーを呼んでいただけますか？',
            'すみません、タクシーを呼んでもらえませんか？現地のアプリが入ってなくて。',
            'いいですよ、呼びますね。だいたい5分以内に来ますよ。どちらまで行かれます？',
        ],
        context: 'call me a taxi は「タクシーを呼んでくれ」の定番。ride-sharing app は「配車アプリ」。taxi stand は「タクシー乗り場」。how things work は「仕組み」。Uber が使えない地域は意外と多い。日本語ではタクシーを「拾う」だが英語では hail a cab。call は電話で呼ぶ場合。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: 'この住所までお願いします',
        english: [
            'To this address please.',
            'Can you take me to this address?',
            'I am going to this address. I have it right here on my phone. Can you see it OK?',
            "Oh yeah, I know the place. It's about fifteen minutes with traffic. Sit back and relax, I'll get you there.",
        ],
        jaTranslations: [
            'この住所までお願いします。',
            'この住所まで行ってもらえますか？',
            'この住所に行きたいんですけど、スマホにここに出てます。見えますか？',
            'ああ、知ってますよそこ。渋滞入れて15分くらいかな。ゆっくりしてて、ちゃんと着けますから。',
        ],
        context: 'to this address は「この住所まで」。show you my phone は住所が読めないときの最強の手段。pronounce は「発音する」。faster route は「早い道」。sit in traffic は「渋滞にはまる」。crazy rush は「大急ぎ」。海外タクシーではスマホの画面を見せるのが一番確実。住所を口頭で伝えるのは難易度が高い。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: 'だいたいいくらくらいですか？',
        english: [
            'How much will it cost?',
            'About how much is the fare to the airport?',
            'Before we go, can you give me a rough estimate of how much it will cost?',
            "To the airport? That'll be around thirty-five, maybe forty with traffic. And yeah, we take cards, no worries.",
        ],
        jaTranslations: [
            'いくらくらいかかりますか？',
            '空港までだいたいいくらですか？',
            '出発前に確認したいんですけど、だいたいいくらくらいかかりますか？',
            '空港まで？35ドルくらいかな、渋滞があれば40くらい。カードも使えますよ、大丈夫。',
        ],
        context: 'fare は「運賃」。rough estimate は「大まかな見積もり」。ballpark figure は「だいたいの金額」でアメリカ英語の定番。running low on は「〜が少なくなっている」。local currency は「現地通貨」。avoid any surprises は「想定外を避けたい」。海外タクシーは料金トラブルが多いので事前確認が必須。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: 'メーターを使ってください',
        english: [
            'Please use the meter.',
            'Can you turn the meter on please?',
            'I noticed the meter is not running. Could you turn it on?',
            "Oh sorry about that, it's been acting up all day. There you go, it's on now. We'll go by the meter, don't worry.",
        ],
        jaTranslations: [
            'メーターを使ってください。',
            'メーターをつけてもらえますか？',
            'メーターが動いてないみたいなんですけど、つけてもらえますか？',
            'あ、すみません、今日ずっと調子悪くて。はい、つけましたよ。メーター通りで行きますから、安心してください。',
        ],
        context: 'meter は「メーター」。turn on は「作動させる」。running は「動いている」。overcharged は「ぼったくられる」。I do not mean to be rude は「失礼なつもりはないが」。fair price は「適正価格」。海外タクシーではメーターを使わない運転手が多い。遠慮せずにはっきり言うことが大切。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: 'ここで降ろしてください',
        english: [
            'You can drop me off here.',
            'This is good. You can let me out right here.',
            'Actually, can you pull over right here? This is close enough. I will walk the rest.',
            "Yeah, this is fine. That'll be fourteen-fifty. Thanks for riding with us, enjoy your dinner!",
        ],
        jaTranslations: [
            'ここで降ろしてもらえますか。',
            'ここで大丈夫です。ここで降ろしてください。',
            'あ、ここで止めてもらえますか？ここで十分近いんで、あとは歩きます。',
            'はい、ここでいいですね。14ドル50セントです。ご乗車ありがとうございます、ディナー楽しんで！',
        ],
        context: 'drop me off は「降ろす」。pull over は「車を端に寄せて止める」。close enough は「十分近い」。round it up は「切り上げる」。tipping situation は「チップの慣習」。I never know は「いつもわからない」。海外のチップ文化は国によって違う。アメリカは15-20%が相場。日本にはない文化なので戸惑う。',
        character: 'mina', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: '渋滞がひどいですね',
        english: [
            'The traffic is terrible.',
            'Wow, the traffic is really bad today.',
            'I did not expect this much traffic. Is it always like this at this time?',
            "Yeah, there's construction on Fifth Street backing everything up. Let me take a side road, it'll save us about ten minutes.",
        ],
        jaTranslations: [
            '渋滞ひどいですね。',
            'うわ、今日ほんと渋滞ひどいね。',
            'こんなに混むと思わなかった。この時間いつもこうなの？',
            'うん、5番街で工事してて全部詰まってんだよね。裏道使わせて、10分くらい節約できるから。',
        ],
        context: 'traffic is terrible は「渋滞がひどい」の定番。at this rate は「このペースだと」。back road は「裏道」。shortcut は「近道」。keep moving は「動き続ける」。parade は「パレード」。construction は「工事」。海外の渋滞は日本の比ではない都市が多い。タクシー運転手との世間話のネタにもなる。',
        character: 'master', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: 'おつりはいりません',
        english: [
            'Keep the change.',
            'Keep the change. Thank you.',
            'Here you go. Keep the change. Thanks for getting us here safely.',
            "Hey thanks, appreciate it! If you end up going to that restaurant, tell them Marco sent you. They'll hook you up with a good table.",
        ],
        jaTranslations: [
            'おつりはいりません。',
            'おつりはとっておいてください。ありがとう。',
            'はい、どうぞ。おつりはいりません。安全に連れてきてくれてありがとう。',
            'おー、ありがとう！あのレストラン行くなら、マルコの紹介だって言ってみて。いい席に案内してもらえるから。',
        ],
        context: 'Keep the change は「おつりはとっておいて」でチップの渡し方の定番。getting us here safely は「安全に連れてきてくれて」。check it out は「行ってみる」。back roads は「裏道」。stuck は「動けない」。card は「名刺」。タクシー運転手と仲良くなると旅がぐっと楽になる。',
        character: 'takeshi', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: 'シートベルトしてね',
        english: [
            'Put your seatbelt on.',
            'Hey, buckle up everyone.',
            'Before we go, make sure everyone has their seatbelt on. Safety first.',
            "Good call. The roads here are pretty wild and I've heard they actually fine you for not wearing one in the back seat.",
        ],
        jaTranslations: [
            'シートベルトして。',
            'おーい、みんなシートベルト締めて。',
            '出発前にみんなシートベルト確認して。安全第一だから。',
            'いい判断だね。ここの道路かなり荒いし、後部座席でもシートベルトしてないと罰金取られるらしいよ。',
        ],
        context: 'buckle up は「シートベルトを締める」。seatbelt / seat belt どちらも可。enforce は「取り締まる」。fined は「罰金を取られる」。click it or ticket は「締めないと切符を切られるぞ」のアメリカのスローガン。strapped in は「ベルトを締めた」。海外タクシーは運転が荒いことが多い。命を守るのは自分。',
        character: 'kenji', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: '領収書をもらえますか？',
        english: [
            'Can I get a receipt?',
            'Could I get a receipt please?',
            'Before I go, could you print me a receipt? I need it for my expense report.',
            "Sure thing, here you go. It's got the date, amount, and both addresses on it. Should be everything you need.",
        ],
        jaTranslations: [
            '領収書をもらえますか？',
            '領収書をいただけますか？',
            '降りる前に領収書を印刷してもらえますか？経費精算で必要なんです。',
            'はい、どうぞ。日付と金額と乗降の住所が入ってます。必要なものは全部揃ってるはずです。',
        ],
        context: 'receipt は「レシート」で発音は「リシート」。expense report は「経費報告書」。pickup は「乗車」、drop-off は「降車」。accounting department は「経理部」。rejected は「却下された」。half business half pleasure は「半分仕事半分遊び」の定番フレーズ。海外出張ではレシートが命。',
        character: 'yuki', category: 'travel', month: '2026-09',
    },
    {
        daySlot: 160, japanese: '遠回りしてない？',
        english: [
            'Are we going the right way?',
            'Is this the fastest route? It feels like we are going in circles.',
            'Not to be rude, but I have Google Maps open and it looks like we are going the long way.',
            "There's a road closure two blocks ahead, that's why I'm going around. Don't worry, this way's only a couple minutes longer.",
        ],
        jaTranslations: [
            'ちゃんとした道を通ってますか？',
            'これ最短ルート？なんかぐるぐる回ってる気がするんだけど。',
            '失礼なこと言うつもりはないんだけど、Google Map開いてたら遠回りしてるように見えるんですが。',
            '2ブロック先が通行止めなんで迂回してるんです。大丈夫、この道でも数分しか変わりませんから。',
        ],
        context: 'going the long way は「遠回りしている」。I do not want to be that guy は「嫌な客になりたくないけど」。road closure は「通行止め」。stick to は「〜を守る」。no offense は「悪気はない」。海外タクシーの遠回りは旅行者あるある。GPSで確認するのが自衛手段。time is money は万国共通の表現。',
        character: 'lisa', category: 'travel', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 161: 観光する (Sightseeing)
    // Scene: 観光スポットを巡りながら感動や感想を語る
    // ────────────────────────────────────────────────────

    {
        daySlot: 161, japanese: '入場料はいくらですか？',
        english: [
            'How much is the admission?',
            'What is the entry fee?',
            'Two adults please. Is there a discount if we buy tickets together?',
            "Two adults is twenty-four total. No student discount, sorry, but the audio guide's included with your ticket. Enjoy!",
        ],
        jaTranslations: [
            '入場料はいくらですか？',
            '入場料はおいくらですか？',
            '大人2枚お願いします。まとめて買うと割引とかあります？',
            '大人2枚で合計24ドルです。学割はないんですけど、音声ガイドはチケットに含まれてます。楽しんで！',
        ],
        context: 'admission は「入場料」。entry fee も同じ意味。discount は「割引」。bummer は「残念」のカジュアル表現。cash only は「現金のみ」。audio guide は「音声ガイド」。full experience は「フルに楽しむ」。海外の美術館や博物館は学生証で割引になることが多い。国際学生証があると便利。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: 'これ何時に閉まりますか？',
        english: [
            'What time does it close?',
            'When does the museum close today?',
            'I want to make sure we have enough time. What time is the last entry?',
            "We close at six but last entry's at five. Most people spend about two hours, so you've got plenty of time.",
        ],
        jaTranslations: [
            '何時に閉まりますか？',
            '今日は博物館何時に閉まりますか？',
            '時間足りるか確認したいんですけど、最終入場は何時ですか？',
            '閉館は6時ですけど、最終入場は5時です。だいたい2時間くらいかかるので、まだ十分時間ありますよ。',
        ],
        context: 'last entry は「最終入場」。closing time は「閉館時間」。without rushing は「急がずに」。realistically は「現実的に」。stop letting people in は「入場を締め切る」。important stuff は「大事なもの」。last entry time と closing time が違うのは海外でも同じ。うっかり入れなくなるパターンが多い。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: 'すごい！本物だ！',
        english: [
            'Amazing! It is the real thing!',
            'I cannot believe I am looking at the actual thing. This is incredible.',
            'I have seen this in textbooks a million times but seeing it in person is completely different.',
            "I know, right? It's so much bigger than I expected. The colors are insane. Pictures really don't do it justice.",
        ],
        jaTranslations: [
            'すごい！本物だ！',
            '信じられない、本物を見てるんだよ。やばい。',
            '教科書で何百回も見てきたけど、実物を見ると全然違うわ。',
            'わかる！思ってたよりめっちゃでかいし、色がやばい。写真じゃこの良さ伝わらないよね。',
        ],
        context: 'the real thing は「本物」。in person は「実際に」。vivid は「鮮やか」。capture は「捉える」。goosebumps は「鳥肌」。three feet は約90cm。教科書で見たものを実物で見る感動は英語でも大げさに表現する。I have seen it a million times は「何度も見てきた」の誇張表現。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: 'ガイドツアーはありますか？',
        english: [
            'Do you have guided tours?',
            'Is there a guided tour available in English?',
            'We are interested in the guided tour. When does the next English one start?',
            "The next English tour starts at two. It's about an hour and a half, and honestly it's worth every penny. You learn so much more than walking around on your own.",
        ],
        jaTranslations: [
            'ガイドツアーはありますか？',
            '英語のガイドツアーはありますか？',
            'ガイドツアーに興味があるんですけど、次の英語のツアーはいつ始まりますか？',
            '次の英語ツアーは2時からです。1時間半くらいで、正直お金を払う価値は十分ありますよ。自分で回るより断然学べることが多いです。',
        ],
        context: 'guided tour は「ガイドツアー」。available in English は「英語で対応可能」。get more out of は「より深く理解する」。significance は「重要性」。worth the extra money は「追加料金を払う価値がある」。old stuff は「古いもの」の口語。ガイドツアーは英語のリスニング練習にもなる一石二鳥。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: 'ここ有名なスポットらしいよ',
        english: [
            'This place is supposed to be famous.',
            'Apparently this is one of the most popular spots in the city.',
            'I read online that this is a must-see. It was on like every top-ten list.',
            "Oh yeah, my friend came here last year and wouldn't shut up about it. Let's see if it lives up to all the hype.",
        ],
        jaTranslations: [
            'ここ有名なスポットらしいよ。',
            'どうやらここ、街で一番人気のスポットらしいよ。',
            'ネットで調べたら必見スポットだって。どのトップ10リストにも載ってた。',
            'あー、友達が去年ここ来て、ずーっとその話してたわ。評判通りかどうか確かめようぜ。',
        ],
        context: 'supposed to be は「〜らしい」。must-see は「必見」。top-ten list は「トップ10リスト」。life-changing は「人生を変える」。lives up to the hype は「評判通りか」。one-star review は「星1つのレビュー」。get my hopes up は「期待しすぎる」。英語圏のレビュー文化は日本以上に盛ん。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: 'ここでちょっと休憩しよう',
        english: [
            'Let us take a break here.',
            'Can we sit down for a minute? My feet are killing me.',
            'I need a break. Let us find a bench and just sit for ten minutes.',
            "Oh thank god, yes. I didn't wanna be the first one to say it but my feet have been killing me for the last hour.",
        ],
        jaTranslations: [
            'ここでちょっと休憩しよう。',
            'ちょっと座れる？足がもう限界なんだけど。',
            '休憩が必要。ベンチ探して10分だけ座らせて。',
            'あー助かった。最初に言い出したくなかったけど、この1時間ずっと足が死んでたんだよ。',
        ],
        context: 'take a break は「休憩する」。my feet are killing me は「足が死ぬほど痛い」。calling it は「もうやめる」と宣言する表現。nonstop は「ノンストップで」。destroyed は「ボロボロ」の誇張表現。not as young as I used to be は「昔ほど若くない」。観光は体力勝負。無理すると翌日に響く。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: 'お腹すいた、何か食べよう',
        english: [
            'I am hungry. Let us eat something.',
            'I am starving. Can we grab some food?',
            'Is anyone else hungry or is it just me? There was a cute little cafe around the corner.',
            "Same, I'm dying. That little cafe we passed smelled amazing. Let's go back and grab something before I pass out.",
        ],
        jaTranslations: [
            'お腹すいた。何か食べよう。',
            '腹減りすぎ。何か食べれるとこない？',
            'みんなお腹すいてない？私だけ？さっき角にかわいいカフェあったんだけど。',
            '同じく、もう死にそう。さっき通ったカフェめっちゃいい匂いしてたよね。倒れる前に何か食べに戻ろう。',
        ],
        context: 'starving は「すごくお腹が空いた」の口語。grab some food は「何か食べる」のカジュアル版。running on empty は「エネルギー切れ」。running on fumes は「ガス欠寸前」。bistro は「ビストロ」。literally は強調の口語表現。観光中の食事タイミングは大事。空腹だと楽しめない。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: 'パンフレットもらっておこう',
        english: [
            'Let us grab a brochure.',
            'I am going to pick up a brochure before we leave.',
            'Wait, let me grab a brochure from the entrance. I like keeping them as souvenirs.',
            "Good thinking. Grab one for me too. I've got a whole shoebox of those at home from every trip.",
        ],
        jaTranslations: [
            'パンフレットもらっておこう。',
            '出る前にパンフレットもらっておくわ。',
            'ちょっと待って、入口でパンフレットもらってくる。お土産代わりに集めてるんだよね。',
            'いい考え。俺の分ももらってきて。家に旅行ごとのパンフレットが靴箱いっぱいにあるんだよ。',
        ],
        context: 'brochure は「パンフレット」で発音は「ブロウシュア」。pick up は「もらう・手に取る」。souvenir は「お土産・記念品」。brings back memories は「思い出がよみがえる」。the little things は「小さなこと」。物理的なパンフレットを集める人は減ったが、旅の記念としては最高。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: '次はどこ行く？',
        english: [
            'Where to next?',
            'What should we check out next?',
            'OK that was awesome. Where are we heading next? I am open to anything.',
            "There's a viewpoint about fifteen minutes from here that's supposed to be amazing at sunset. Wanna check it out before dinner?",
        ],
        jaTranslations: [
            '次どこ行く？',
            '次は何見に行く？',
            'いやー最高だった。次どこ行く？何でもいいよ。',
            'ここから15分くらいのとこに展望台があって、夕焼けがすごいらしいよ。夕飯前に行ってみない？',
        ],
        context: 'Where to next は「次はどこ？」のネイティブ表現。heading は「向かう」。open to anything は「何でもいい」。on the itinerary は「予定にある」。viewpoint は「展望台」。up for は「〜する気力がある」。sunset は「日没」。旅行中の「次どこ行く？」は最も頻出する会話。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 161, japanese: '来てよかった',
        english: [
            'I am glad we came.',
            'Honestly, I am so glad we came here.',
            'This was worth every penny. I am so happy we decided to come.',
            "Me too. I can't believe I almost skipped this trip. Sitting at my desk on Monday is gonna feel so depressing after this.",
        ],
        jaTranslations: [
            '来てよかった。',
            'ほんとに来てよかった。',
            'お金かけた価値あったわ。来る決断して本当によかった。',
            '俺も。この旅行やめようか迷ったなんて信じられない。月曜にデスクに座ったら、この後だと鬱になりそう。',
        ],
        context: 'I am glad は「〜してよかった」。worth every penny は「一円の価値もあった」。going back and forth は「迷っていた」。no amount of money は「どんな金額でも」。made it all worth it は「すべてが報われた」。旅行の感動を英語で伝えるのは最高の練習。大げさに言うのがコツ。',
        character: 'kenji', category: 'social', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 162: 写真を撮る (Taking Photos)
    // Scene: 観光地で写真を撮ったり撮ってもらったりする
    // ────────────────────────────────────────────────────

    {
        daySlot: 162, japanese: '写真撮ってもらえますか？',
        english: [
            'Can you take our picture?',
            'Excuse me, would you mind taking a photo of us?',
            'Sorry to bother you. Could you take a quick photo of us with this building in the background?',
            "Sure, no problem! OK everybody squeeze in. One, two, three. Let me take a couple more just in case. There you go!",
        ],
        jaTranslations: [
            '写真撮ってもらえますか？',
            'すみません、写真撮っていただけますか？',
            'お忙しいところすみません、この建物を背景に写真撮ってもらえませんか？',
            'いいですよ！はい、みんな寄って寄って。はい、チーズ！念のためもう何枚か撮りますね。はい、どうぞ！',
        ],
        context: 'take a photo は「写真を撮る」。would you mind は「〜してもらえますか」の丁寧表現。in the background は「背景に」。just in case は「念のため」。horizontal は「横向き」、vertical は「縦向き」。blinks は「まばたきする」。particular は「こだわりがある」。写真を頼むのは旅行英語の必須スキル。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: 'もう一枚いいですか？',
        english: [
            'One more please?',
            'Could we do one more? I think I blinked.',
            'Sorry, could you take just one more? I want to try a different pose this time.',
            "Ha, no worries, happens to everyone. Ready? One more. There, that one's way better. You look great!",
        ],
        jaTranslations: [
            'もう一枚お願いできますか？',
            'もう一枚いいですか？まばたきしちゃった気がして。',
            'すみません、もう一枚だけお願いできますか？今度はポーズ変えてみたくて。',
            'あはは、大丈夫、よくあるよくある。いくよ？もう一枚。はい、こっちのほうが全然いい。いい顔してるよ！',
        ],
        context: 'one more は「もう一枚」。I blinked は「まばたきしてしまった」。pose は「ポーズ」。personal vendetta は「個人的な恨み」で大げさなユーモア。fix my hair は「髪を直す」。I promise は「約束する」。写真を何枚も撮り直す人はどの国にもいる。相手の忍耐力に感謝。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: 'ここで撮ろう！',
        english: [
            'Let us take a picture here!',
            'This spot is perfect for a photo. Come on, everyone get in.',
            'Oh this is gorgeous. We have to take a photo here. The lighting is perfect right now.',
            "Oh wow, you're right. The lighting here is perfect. Let me grab a few before someone walks into the shot.",
        ],
        jaTranslations: [
            'ここで写真撮ろう！',
            'ここ写真スポットにぴったり。みんな来て来て。',
            'ここめっちゃきれい。絶対ここで写真撮らなきゃ。今ちょうど光がいい感じ。',
            'うわ、ほんとだ。ここの光加減最高じゃん。誰か写り込む前にサッと何枚か撮るわ。',
        ],
        context: 'gorgeous は「最高にきれい」。lighting は「光の具合」。get in は「写真に入る」。for once は「珍しく」。forced smile は「作り笑い」。posting は「投稿する」。get likes は「いいねをもらう」。旅行写真は光が命。golden hour（日の出と日没前後）が最もきれいに撮れる時間帯。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: '自撮りしよう',
        english: [
            'Let us take a selfie.',
            'Come on, let us do a quick selfie.',
            'Selfie time. Everyone squeeze in. I have long arms so I will hold the phone.',
            "Alright, everyone get in close. Kenji, you're getting cut off, move to the left. OK, say cheese! Perfect.",
        ],
        jaTranslations: [
            '自撮りしよう。',
            'ほら、みんなでサッと自撮りしよう。',
            '自撮りタイム。みんな寄って。俺腕長いからスマホ持つわ。',
            'よし、みんなもっと寄って。ケンジ、切れてるから左に寄って。はい、チーズ！完璧。',
        ],
        context: 'selfie は「自撮り」。squeeze in は「ぎゅっと詰める」。fit in the frame は「フレームに収まる」。cut off は「切れている」。say cheese は写真を撮るときの掛け声で古典的。four chins は「二重あご」の自虐。angle は「角度」。自撮り棒は英語で selfie stick。上から撮るほうが小顔に写る。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: 'フラッシュ使わないでね',
        english: [
            'No flash please.',
            'Make sure the flash is off.',
            'Turn the flash off. I think they do not allow flash photography in here.',
            "Oh shoot, you're right. I didn't even notice it was on. Good catch, I don't wanna get yelled at by the guards.",
        ],
        jaTranslations: [
            'フラッシュ使わないでね。',
            'フラッシュ切ってあるか確認して。',
            'フラッシュ切って。ここフラッシュ撮影禁止だと思う。',
            'あ、やば、ほんとだ。ついてるの気づかなかった。ナイスキャッチ、警備員に怒られたくないし。',
        ],
        context: 'flash photography は「フラッシュ撮影」。damaging は「傷つける」。making a scene は「騒ぎを起こす」。washed out は「色が飛んでいる」。natural light は「自然光」。美術館や教会ではフラッシュ禁止が多い。セキュリティに注意されると恥ずかしい。the way to go は「それが正解」。',
        character: 'kenji', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: 'いい写真撮れた？',
        english: [
            'Did you get a good shot?',
            'How did the photos turn out?',
            'Let me see. Did any of them turn out? I have a feeling I look terrible.',
            "Oh, this one's actually really nice. The lighting's perfect and everyone looks happy. Send it to me, I'm making it my wallpaper.",
        ],
        jaTranslations: [
            'いい写真撮れた？',
            '写真どんな感じ？',
            'ちょっと見せて。ちゃんと撮れたやつある？たぶん自分ひどい顔してる。',
            'あ、これ実はめっちゃいいじゃん。光もいいしみんないい顔してる。送って、壁紙にするわ。',
        ],
        context: 'get a good shot は「いい写真が撮れた」。turn out は「仕上がる」。blurry は「ぼやけている」。delete は「削除する」。decent は「まともな」。wallpaper は「壁紙」。send me all of them は全部送ってという現代的な表現。写真の出来を確認するのは撮影後の定番会話。',
        character: 'yuki', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: '撮影禁止だって',
        english: [
            'No photography allowed.',
            'We cannot take photos here. There is a sign.',
            'Put your phone away. They said no photography in this section.',
            "Ugh, seriously? This is the most beautiful room in the whole place. Fine, I'll put it away. Guess we'll just have to remember it the old-fashioned way.",
        ],
        jaTranslations: [
            '撮影禁止だって。',
            'ここ写真撮っちゃダメらしいよ。看板出てる。',
            'スマホしまって。このエリアは撮影禁止だって言われたよ。',
            'えー、マジ？ここが一番きれいな部屋なのに。わかった、しまうよ。昔ながらのやり方で覚えるしかないか。',
        ],
        context: 'no photography allowed は「撮影禁止」。put your phone away は「スマホをしまえ」。guard は「警備員」。staring at は「じっと見ている」。kicked out は「追い出される」。rules are rules は「ルールはルール」。enjoy with our eyes は「目で楽しむ」。撮影禁止エリアでスマホを出すと怒られる。',
        character: 'master', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: 'この写真SNSに載せていい？',
        english: [
            'Can I post this?',
            'Do you mind if I post this photo online?',
            'This photo came out great. Is everyone OK with me putting it on Instagram?',
            "Go for it! Just tag me so I can repost it. That's honestly the best group photo we've taken all trip.",
        ],
        jaTranslations: [
            'これ投稿していい？',
            'この写真ネットに載せても大丈夫？',
            'この写真めっちゃよく撮れた。みんなインスタに載せても平気？',
            'いいよいいよ！タグ付けしてね、リポストするから。正直この旅で一番いい集合写真だよこれ。',
        ],
        context: 'post は「投稿する」。do you mind は「嫌じゃない？」。came out / turned out は「出来上がりが〜」。cool with は「〜でOK」のカジュアル版。cropped out は「切り取られる」。tag は「タグ付けする」。your call は「あなた次第」。SNS投稿前に確認するのは英語圏でもマナー。',
        character: 'mina', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: '逆光だ、こっち向いて',
        english: [
            'The light is behind you. Turn around.',
            'You are backlit. Face this way instead.',
            'The sun is right behind you so your face is completely dark. Come over to this side.',
            "Oh wow, you're right. I couldn't even see my face in that last one. This angle's so much better, thanks!",
        ],
        jaTranslations: [
            '逆光だよ。こっち向いて。',
            '逆光になってる。こっち側を向いて。',
            '太陽がちょうど後ろにあるから顔が真っ暗だよ。こっち側に来て。',
            'うわ、ほんとだ。さっきの写真顔全然見えなかった。この角度のほうが全然いいね、ありがとう！',
        ],
        context: 'backlit は「逆光の」。silhouette は「シルエット」で発音は「シルエット」とほぼ同じ。face the light は「光に向かって立つ」。in shadow は「影の中」。Photography 101 は「写真の基本」。light source は「光源」。逆光は写真の大敵。逆に利用するとかっこいい写真も撮れる。',
        character: 'lisa', category: 'request', month: '2026-09',
    },
    {
        daySlot: 162, japanese: '動画も撮っておこう',
        english: [
            'Let us take a video too.',
            'I am going to record a quick video as well.',
            'Photos are great but let me grab a quick video too. I want to remember the sounds and the atmosphere.',
            "Good idea. Get those street musicians in the background too. That kind of stuff never comes through in photos.",
        ],
        jaTranslations: [
            '動画も撮っておこう。',
            'ついでに短い動画も撮っとくわ。',
            '写真もいいけど動画も撮らせて。音とか雰囲気も残したいんだよね。',
            'いいね。あのストリートミュージシャンも背景に入れて。ああいうのは写真じゃ伝わらないからね。',
        ],
        context: 'record は「録画する」。clip は「短い動画」。relive は「追体験する」。act natural は「自然にして」。pretend は「ふりをする」。travel reel は「旅行用のリール動画」。vibe は「雰囲気」。SNS時代は動画が主流。Instagram Reels や TikTok 用に短い動画を撮る人が増えている。',
        character: 'takeshi', category: 'request', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 163: お土産を買う (Souvenir Shopping)
    // Scene: 現地の市場やお土産屋で買い物をする
    // ────────────────────────────────────────────────────

    {
        daySlot: 163, japanese: 'これいくらですか？',
        english: [
            'How much is this?',
            'Excuse me, how much is this one?',
            'Hi, I am interested in this. There is no price tag. How much is it?',
            "That one's forty-five. It's handmade by a local artisan, one of a kind. I can wrap it up for you if you'd like.",
        ],
        jaTranslations: [
            'これいくらですか？',
            'すみません、これいくらですか？',
            'これ気になるんですけど、値札がないんです。おいくらですか？',
            'それは45ドルです。地元の職人の手作りで一点ものです。よければ包装しますよ。',
        ],
        context: 'price tag は「値札」。handmade は「手作り」。get attached は「愛着がわく」。had a heart attack は「心臓が止まりそうになった」の比喩。flexibility は「融通」。fixed は「固定」。海外の市場では値札がないことが多く、値段交渉が当たり前の文化もある。asking price はあくまで出発点。',
        character: 'yuki', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: 'もうちょっと安くなりませんか？',
        english: [
            'Can you give me a discount?',
            'Is there any way you could come down a little on the price?',
            'I love it but it is a bit out of my budget. Could you do it for twenty?',
            "Tell you what, if you buy two I'll give you both for thirty-five. That's the best I can do.",
        ],
        jaTranslations: [
            '割引してもらえませんか？',
            'もうちょっと値段下げてもらえたりしません？',
            'すごく気に入ってるんだけど予算オーバーなんだよね。20ドルにならない？',
            'じゃあこうしよう、2個買ってくれたら合わせて35ドルにするよ。これが限界かな。',
        ],
        context: 'come down on the price は「値下げする」。out of my budget は「予算オーバー」。room for negotiation は「交渉の余地」。lowball は「不当に低い値段を提示する」。craftsmanship は「職人技」。best price は「最安値」。値段交渉は文化によって当たり前だったりタブーだったりする。アジアの市場では交渉がむしろ楽しみ。',
        character: 'kenji', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: '会社の人にお土産買わなきゃ',
        english: [
            'I need to buy souvenirs for work.',
            'I have to pick up something for the people at the office.',
            'I need to find something small and affordable that I can buy in bulk for my coworkers.',
            "The chocolate boxes by the register are like ten bucks each and they're really good. Perfect for handing out at the office.",
        ],
        jaTranslations: [
            '会社の人にお土産買わなきゃ。',
            '職場の人に何か買って帰らないと。',
            '小さくて手頃で、同僚にまとめ買いできるものを探してるんだけど。',
            'レジの横にあるチョコレートの箱、1個10ドルくらいですごく美味しいですよ。会社で配るのにちょうどいい。',
        ],
        context: 'pick up は「買う」のカジュアル版。in bulk は「まとめ買いで」。affordable は「手頃な」。unwritten rule は「暗黙のルール」。judge silently は「心の中で評価する」。日本のお土産文化は独特。英語圏ではここまで義務感はないが、bring something back from a trip は普通にやる。',
        character: 'takeshi', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: 'これって本物？偽物？',
        english: [
            'Is this real or fake?',
            'Is this genuine or a knockoff?',
            'I want to make sure this is authentic before I spend this kind of money.',
            "Hmm, at that price? I'd be careful. Check the stitching and the label. If either looks off, it's probably a knockoff.",
        ],
        jaTranslations: [
            'これ本物？偽物？',
            'これ本物ですか？それともコピー品？',
            'この値段出すなら本物かどうか確認したいんだけど。',
            'うーん、その値段で？気をつけたほうがいいよ。縫い目とラベルを確認して。どっちかおかしかったらたぶん偽物だよ。',
        ],
        context: 'genuine は「本物の」。knockoff は「偽物・コピー品」。authentic は「正規品の」。too good to be true は「うますぎる話」。counterfeit は「偽造品」。tell the difference は「違いを見分ける」。海外の市場やストリートショップではブランド品の偽物が多い。高すぎるものも安すぎるものも要注意。',
        character: 'lisa', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: '日本に送れますか？',
        english: [
            'Can you ship this to Japan?',
            'Do you offer international shipping to Japan?',
            'I love this but it is too big to carry home. Is there any way to ship it to Japan?',
            "We do ship internationally. Japan's about thirty dollars and it usually takes two to three weeks. We pack everything really carefully, so don't worry.",
        ],
        jaTranslations: [
            '日本に送れますか？',
            '日本への国際配送ってやってますか？',
            'これすごく気に入ったんだけど、大きすぎて持って帰れないんです。日本に送る方法ってありますか？',
            '国際配送やってますよ。日本だと30ドルくらいで、だいたい2〜3週間かかります。梱包はしっかりやるんで安心してください。',
        ],
        context: 'ship は「発送する」。international shipping は「国際配送」。fragile は「壊れやすい」。in one piece は「無事に」。devastated は「ショックを受ける」。courier は「宅配業者」。tracking information は「追跡情報」。大きなお土産は現地から送ったほうが楽。ただし関税がかかることも。',
        character: 'mina', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: 'ギフト用に包んでもらえますか？',
        english: [
            'Can you gift wrap this?',
            'Could you wrap this as a gift please?',
            'This is a gift for my mother. Could you wrap it nicely for me?',
            "Of course! We've got a few different wrapping options. How about the gold paper with the ribbon? Your mom's gonna love it.",
        ],
        jaTranslations: [
            'ギフト包装できますか？',
            'これプレゼント用に包んでもらえますか？',
            'これ母へのプレゼントなんです。きれいに包んでもらえますか？',
            'もちろん！包装紙いくつか種類がありますよ。金色の紙にリボンはどうですか？お母さん絶対喜びますよ。',
        ],
        context: 'gift wrap は「ギフト包装する」。wrap は「包む」。ribbon は「リボン」。presentation は「見た目・プレゼンテーション」。throw in は「おまけで付ける」。extra charge は「追加料金」。日本のギフト包装は世界一丁寧。海外では包装が雑なことが多いので期待しすぎないほうがいい。',
        character: 'yuki', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: 'クレジットカード使えますか？',
        english: [
            'Do you accept credit cards?',
            'Can I pay by card or is it cash only?',
            'I do not have much cash left. Do you take Visa or Mastercard?',
            "We take Visa and Mastercard, no problem. Apple Pay works too if that's easier for you.",
        ],
        jaTranslations: [
            'クレジットカード使えますか？',
            'カード払いできますか？それとも現金のみですか？',
            '現金あんまり残ってないんですけど、VISAかマスターカード使えますか？',
            'VISAとマスターカード使えますよ、大丈夫。Apple Payもいけますよ、そっちのほうが楽ならどうぞ。',
        ],
        context: 'accept は「受け付ける」。pay by card は「カードで払う」。cash only は「現金のみ」。running low on は「〜が少なくなっている」。ATM は「エーティーエム」で通じる。mobile payments は「モバイル決済」。海外では現金のみの店がまだ多い地域もある。事前に確認するのが賢明。',
        character: 'master', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: '定番のお土産って何ですか？',
        english: [
            'What is a popular souvenir from here?',
            'What do most tourists buy as souvenirs?',
            'We are looking for something that really represents this area. What would you recommend?',
            "Honestly, the hand-painted ceramics are what this town is known for. Skip the magnets and keychains. The ceramics are the real deal.",
        ],
        jaTranslations: [
            'ここの定番のお土産って何ですか？',
            '観光客に一番人気のお土産って何ですか？',
            'この地域らしいものを探してるんですけど、おすすめは何ですか？',
            '正直、手描きの陶器がこの街の名物ですよ。マグネットやキーホルダーはやめとけ。陶器が本物だよ。',
        ],
        context: 'popular souvenir は「定番のお土産」。represents は「代表する」。generic は「ありきたりの」。locally produced は「地元産の」。magnets は「マグネット」。keychains は「キーホルダー」。the real deal は「本物」。touristy は「観光客向けの」。地元の人に聞くのが最高のお土産の見つけ方。',
        character: 'kenji', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: '買いすぎた...',
        english: [
            'I bought too much.',
            'I went way overboard with the shopping.',
            'My suitcase is going to explode. I definitely bought too much stuff.',
            "You say that every time. Just throw the extra stuff in my suitcase, I've still got some room left.",
        ],
        jaTranslations: [
            '買いすぎた...。',
            '買い物しすぎた、やばい。',
            'スーツケース爆発するわ。明らかに買いすぎた。',
            '毎回同じこと言ってるじゃん。余った分は俺のスーツケースに入れなよ、まだ余裕あるから。',
        ],
        context: 'went overboard は「やりすぎた」。explode は「爆発する」の比喩。fitting in は「入る」。disciplined は「自制心のある」。extra bag は「追加の荷物」。counts as は「〜として認められる」。旅行先での買いすぎは万国共通の悩み。空港の超過料金は本当に高いので注意。',
        character: 'lisa', category: 'shopping', month: '2026-09',
    },
    {
        daySlot: 163, japanese: '免税になりますか？',
        english: [
            'Is this tax-free?',
            'Can I get a tax refund on this?',
            'I am a tourist from Japan. Do you have a tax-free shopping program?',
            "Yes, if you spend over fifty you qualify. I'll give you the tax-free form and you just show it at the airport counter on your way out.",
        ],
        jaTranslations: [
            '免税になりますか？',
            'これ、税金の払い戻しはできますか？',
            '日本からの観光客なんですけど、免税プログラムってありますか？',
            'はい、50ドル以上のお買い物で対象になります。免税用の書類をお渡ししますので、出国時に空港のカウンターで見せてください。',
        ],
        context: 'tax-free は「免税」。tax refund は「税金の払い戻し」。minimum amount は「最低金額」。paperwork は「書類」。miss out on は「逃す」。every little bit helps は「少しでも助かる」。海外のtax refund は空港でやるパターンが多い。手続きが面倒でも金額が大きければやる価値あり。',
        character: 'takeshi', category: 'shopping', month: '2026-09',
    },

    // ────────────────────────────────────────────────────
    // DAY 164: 現地の人と話す (Talking to Locals)
    // Scene: 旅先で出会った地元の人と交流する
    // ────────────────────────────────────────────────────

    {
        daySlot: 164, japanese: 'ここに住んでるんですか？',
        english: [
            'Do you live here?',
            'Are you from around here?',
            'Sorry for the random question but are you a local? We are looking for some recommendations.',
            "Yeah, born and raised! If you want good food, try the place on Elm Street called Rico's. Tourists don't know about it but the food's incredible.",
        ],
        jaTranslations: [
            'ここに住んでるんですか？',
            'この辺の方ですか？',
            '突然すみません、地元の方ですか？おすすめを探してて。',
            'そう、生まれも育ちもここ！美味しいもの食べたいならエルム通りのリコズって店に行ってみて。観光客は知らないけど飯が最高なんだよ。',
        ],
        context: 'from around here は「この辺の人」。local は「地元の人」。hidden gems は「穴場」。overpriced は「高すぎる」。tourist trap は「観光客向けのぼったくり店」。authentic は「本物の」。bug you は「邪魔する」のカジュアル版。地元民のおすすめは最高の旅行情報源。ガイドブックに載っていない店が最高。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: 'おすすめの場所はありますか？',
        english: [
            'Any recommendations?',
            'What would you recommend we check out?',
            'We have one more day here. If you could only do one thing in this city, what would it be?',
            "Honestly? The rooftop bar on Market Street. It's got the best sunset view in the city and most tourists have no idea it exists.",
        ],
        jaTranslations: [
            'おすすめの場所ありますか？',
            'どこか行くべきところってあります？',
            'あと1日あるんですけど、この街で一つだけやるとしたら何がおすすめですか？',
            '正直？マーケット通りのルーフトップバーかな。街で一番夕日がきれいに見えるのに、観光客はほとんど知らないんだよ。',
        ],
        context: 'recommendations は「おすすめ」。check out は「見てみる」。experience は「体験する」。proud to live here は「ここに住んでいて誇りに思う場所」。neighborhood は「地域」。cannot leave without は「〜なしでは帰れない」。地元の人に「一つだけ」と限定して聞くと本気のおすすめが出てくる。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: '日本から来ました',
        english: [
            'I am from Japan.',
            'We are visiting from Japan.',
            'We are tourists from Japan. This is our first time in this city and we are loving it.',
            "Oh nice, I've always wanted to visit Japan! How are you liking it here so far? Have you tried the street food yet?",
        ],
        jaTranslations: [
            '日本から来ました。',
            '日本から旅行で来てます。',
            '日本からの観光客です。この街は初めてで、すごく気に入ってます。',
            'いいね、日本ずっと行きたいと思ってたんだよね！ここはどう？屋台の食べ物はもう試した？',
        ],
        context: 'visiting from は「〜から旅行に来ている」。blown away は「圧倒される」。architecture は「建築」。opposite of our experience は「私たちの経験とは正反対」。season は「季節」。英語で自己紹介するとき、出身国を言うと相手が興味を持ってくれることが多い。Japan と言うだけで会話が広がる。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: 'この料理は何ですか？',
        english: [
            'What is this dish?',
            'Excuse me, what is this called? It looks amazing.',
            'I have never seen this before. What is it made of? Is it something traditional?',
            "That's our signature stew! It's beef and root vegetables, slow-cooked for hours. No shellfish, no nuts, and it's not spicy at all. You'll love it.",
        ],
        jaTranslations: [
            'この料理は何ですか？',
            'すみません、これ何ていう料理ですか？すごく美味しそう。',
            'これ初めて見るんですけど、何が入ってるんですか？伝統的なものですか？',
            'それはうちの看板メニューのシチューだよ！牛肉と根菜を何時間も煮込んだやつ。貝も木の実も入ってないし、全然辛くないよ。気に入ると思うよ。',
        ],
        context: 'dish は「料理」。made of は「何でできている」。traditional は「伝統的な」。food allergies は「食物アレルギー」。shellfish は「貝類」。handle は「耐えられる」。heat は「辛さ」。life is too short は「人生は短い」。海外で知らない料理に挑戦するのは旅の醍醐味。アレルギーだけは確認必須。',
        character: 'master', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: 'ここ何年くらい住んでるの？',
        english: [
            'How long have you lived here?',
            'Have you been living here your whole life?',
            'You seem to know this area really well. Have you lived here long?',
            "My whole life, actually. Thirty-two years and counting. It's funny, I barely notice the cathedral anymore but you guys remind me how special it is.",
        ],
        jaTranslations: [
            'ここに何年くらい住んでるんですか？',
            'ずっとここに住んでるんですか？',
            'この辺すごく詳しいですね。長く住んでるんですか？',
            '実は生まれてからずっとだよ。32年になるかな。面白いもんで、もう大聖堂も目に入らなくなってたけど、君たちを見てどれだけ特別な場所か思い出したよ。',
        ],
        context: 'How long have you lived は「どのくらい住んでいる」の現在完了。born and raised は「生まれ育った」。know your way around は「土地勘がある」。perspective は「視点」。familiarity は「慣れ」。with my mouth open は「口を開けて（驚いて）」。地元の人にとっては日常でも旅行者にとっては非日常。この感覚のギャップが面白い。',
        character: 'lisa', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: '写真一緒に撮ってもいいですか？',
        english: [
            'Can we take a photo together?',
            'Would you mind if we took a photo together?',
            'You have been so kind to us. Would it be OK if we got a photo together to remember this?',
            "Sure, I'd love that! Let me fix my hair real quick. OK, ready. Someone wanna hold the phone? Great, say cheese!",
        ],
        jaTranslations: [
            '一緒に写真撮ってもいいですか？',
            '一緒に写真撮っていただけますか？',
            'すごく親切にしてもらったので、記念に一緒に写真撮ってもらえませんか？',
            'いいよ、喜んで！ちょっと髪直させて。OK、準備できた。誰かスマホ持ってくれる？よし、はいチーズ！',
        ],
        context: 'would you mind は「嫌じゃないですか」の丁寧表現。remember this は「これを覚えておきたい」。flooding back は「一気に戻ってくる」。street vendor は「露店の人」。旅先で出会った人との写真は最高の思い出。無理に頼まず、相手が嫌がったら引くのがマナー。kind of random は「ちょっと突然だけど」。',
        character: 'yuki', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: '英語が上手ですね',
        english: [
            'Your English is great.',
            'Wow, you speak English really well.',
            'Your English is incredible. Where did you learn? Did you study abroad or something?',
            "Ha, thanks! Mostly Netflix and YouTube honestly. I just watch everything in English with subtitles. It works better than any textbook.",
        ],
        jaTranslations: [
            '英語お上手ですね。',
            'わー、英語すごく上手ですね。',
            '英語めちゃくちゃ上手じゃないですか。どこで勉強したんですか？留学とか？',
            'あはは、ありがとう！ほとんどNetflixとYouTubeだよ正直。全部英語で字幕つけて見てるだけ。教科書よりよっぽど効くよ。',
        ],
        context: 'Your English is great は褒め言葉の定番。study abroad は「留学する」。pick it up は「自然に覚える」。fluently は「流暢に」。like it is nothing は「簡単そうに」。hopeless は「絶望的な」の自虐。tips は「コツ」。英語を褒められると嬉しいのは万国共通。ただし上から目線にならないよう注意。',
        character: 'kenji', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: '連絡先交換しよう',
        english: [
            'Let us exchange contact info.',
            'Can I add you on Instagram?',
            'I would love to stay in touch. Do you have Instagram or Line?',
            "Yeah, totally! Here, I'll follow you right now. And seriously, if you ever come to Tokyo hit me up. I'll show you around.",
        ],
        jaTranslations: [
            '連絡先交換しようよ。',
            'インスタ追加してもいい？',
            'つながっていたいんだけど、インスタかLINEやってる？',
            'うん、もちろん！今フォローするわ。あとマジで東京来ることあったら連絡して。案内するから。',
        ],
        context: 'exchange contact info は「連絡先を交換する」。hit it off は「意気投合する」。stay connected は「つながり続ける」。return the favor は「お返しをする」。QR code は「QRコード」。scan は「読み取る」。旅先での出会いをSNSで繋ぎ止めるのは現代の旅のスタイル。Line は海外では通じないのでInstagramが無難。',
        character: 'mina', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: 'また来たいなあ',
        english: [
            'I want to come back.',
            'I am definitely coming back here someday.',
            'We are leaving tomorrow and I already want to plan the next trip.',
            "You should! Come back in the fall, it's even more beautiful. And next time stay for at least two weeks so you can actually relax.",
        ],
        jaTranslations: [
            'また来たいなあ。',
            '絶対またここに来るわ。',
            '明日帰るのに、もう次の旅行を計画したくなってる。',
            '来なよ！秋に来たらもっときれいだよ。次は最低2週間は滞在して、ちゃんとゆっくりしなって。',
        ],
        context: 'come back は「戻ってくる」。stolen my heart は「心を奪われた」。scratched the surface は「表面をなぞっただけ」。sounds crazy は「頭おかしいと思うけど」。at least は「少なくとも」。local language は「現地語」。旅行の最後に「また来たい」と思えるのが最高の旅。英語では感情を大げさに表現するのが自然。',
        character: 'takeshi', category: 'social', month: '2026-09',
    },
    {
        daySlot: 164, japanese: '本当にありがとうございました',
        english: [
            'Thank you for everything.',
            'I really cannot thank you enough. You made our trip.',
            'You have been so generous with your time. I honestly do not know how to thank you properly.',
            "Aw, don't mention it! I had a blast hanging out with you guys. And I'm definitely taking you up on that dinner in Tokyo.",
        ],
        jaTranslations: [
            '本当にありがとうございました。',
            '本当にお礼の言葉もないです。最高の旅になりました。',
            'こんなに時間を割いてもらって、どう感謝していいかわかりません。',
            'いやいや！君たちと遊んでめっちゃ楽しかったよ。あと東京でのディナーの話、絶対行くからね。',
        ],
        context: 'from the bottom of my heart は「心の底から」。made our trip は「旅を最高にしてくれた」。breathtaking は「息をのむほど美しい」。none of this would have happened は仮定法「あなたなしでは起こらなかった」。dinner is on me は「夕飯はおごる」。英語では感謝を具体的かつドラマチックに伝える。日本語の「ありがとうございました」の100倍のボリュームで。',
        character: 'master', category: 'social', month: '2026-09',
    },

];

// ============================================================
// WEEK 22 DAY THEMES
// ============================================================

export const MONTH6_W22_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    158: {
        title: 'ホテルで', titleEn: 'At the Hotel', category: 'request',
        scene: 'チェックインから部屋のトラブルまで、ホテル滞在で使える英語を学ぶ',
        keywords: [
            { en: 'front desk', ja: 'フロント', pron: 'フロントデスク', example: 'Let me check with the front desk.', note: '日本語の「フロント」は和製英語に近い。英語では front desk か reception と言う。' },
            { en: 'late checkout', ja: 'チェックアウト延長', pron: 'レイトチェックアウト', example: 'Is it possible to get a late checkout?', note: '聞くだけタダ。ダメ元で聞いてみると意外とOKがもらえることが多い。' },
            { en: 'complimentary', ja: '無料の', pron: 'コンプリメンタリー', example: 'Is the breakfast complimentary?', note: 'free よりホテルっぽい言い方。complimentary Wi-Fi, complimentary shuttle など。' },
            { en: 'amenities', ja: 'アメニティ', pron: 'アメニティーズ', example: 'What amenities does the room include?', note: '日本語のアメニティはシャンプーなどの消耗品だが、英語では施設・設備全般を指す。' },
            { en: 'housekeeping', ja: '客室清掃', pron: 'ハウスキーピング', example: 'Could you send housekeeping to my room?', note: '掃除やタオル交換をしてくれるサービス。Do Not Disturb の札を出すと来ない。' },
        ],
    },
    159: {
        title: '道を聞く', titleEn: 'Asking for Directions', category: 'travel',
        scene: '初めての街で迷いながら現地の人に道を尋ねる',
        keywords: [
            { en: 'intersection', ja: '交差点', pron: 'インターセクション', example: 'Turn right at the intersection.', note: '日本語の「交差点」と同じ概念。crossroads も同義だがやや文学的。' },
            { en: 'landmark', ja: '目印', pron: 'ランドマーク', example: 'Is there a landmark I should look for?', note: '道案内で頼りになる。「あの大きい赤い建物」のような具体的な目印。' },
            { en: 'block', ja: '区画', pron: 'ブロック', example: 'Walk two blocks and turn left.', note: 'アメリカ英語の距離の単位。日本にはない概念で「次の交差点まで」に近い。' },
            { en: 'shortcut', ja: '近道', pron: 'ショートカット', example: 'Locals always know the shortcuts.', note: '地元の人しか知らない近道。take a shortcut は「近道する」。' },
            { en: 'within walking distance', ja: '歩ける距離', pron: 'ウィズイン ウォーキング ディスタンス', example: 'Is the museum within walking distance?', note: '徒歩圏内かどうかを確認する定番表現。nearby より具体的で便利。' },
        ],
    },
    160: {
        title: 'タクシーに乗る', titleEn: 'Taking a Taxi', category: 'travel',
        scene: 'タクシーを捕まえて目的地まで移動する',
        keywords: [
            { en: 'meter', ja: 'メーター', pron: 'ミーター', example: 'Please turn the meter on.', note: '海外タクシーではメーターを使わない運転手がいる。毅然と要求するのが大事。' },
            { en: 'fare', ja: '運賃', pron: 'フェア', example: 'How much is the fare to the airport?', note: 'タクシーやバスの料金。price より交通機関に特化した言葉。fee とも違う。' },
            { en: 'drop off', ja: '降ろす', pron: 'ドロップオフ', example: 'You can drop me off right here.', note: '人を車から降ろすときの定番表現。pick up（乗せる）とセットで覚える。' },
            { en: 'keep the change', ja: 'おつりはいりません', pron: 'キープザチェンジ', example: 'Here is twenty. Keep the change.', note: 'チップを渡すときの定番フレーズ。アメリカでは15-20%が相場。' },
            { en: 'receipt', ja: '領収書', pron: 'リシート', example: 'Can I get a receipt please?', note: '発音注意。「レシート」ではなく「リシート」。pの音は発音しない。' },
        ],
    },
    161: {
        title: '観光する', titleEn: 'Sightseeing', category: 'social',
        scene: '観光スポットを巡りながら仲間と感動や感想を分かち合う',
        keywords: [
            { en: 'admission', ja: '入場料', pron: 'アドミッション', example: 'How much is the admission?', note: '入場料。entry fee も同じ意味。admission free は「入場無料」。' },
            { en: 'guided tour', ja: 'ガイドツアー', pron: 'ガイデッドツアー', example: 'Is there a guided tour in English?', note: 'ガイド付きツアー。self-guided tour は自分で回るタイプ。' },
            { en: 'must-see', ja: '必見', pron: 'マストシー', example: 'This museum is a must-see.', note: '絶対に見るべきもの。must-do, must-try, must-eat なども同じパターン。' },
            { en: 'brochure', ja: 'パンフレット', pron: 'ブロウシュア', example: 'Let me grab a brochure.', note: '発音が日本語と全然違う。「ブロシュア」に近い。pamphlet も使える。' },
            { en: 'itinerary', ja: '旅程', pron: 'アイティナラリー', example: 'What is next on the itinerary?', note: '旅行の予定表。schedule より旅行に特化。発音が難しい英単語の代表格。' },
        ],
    },
    162: {
        title: '写真を撮る', titleEn: 'Taking Photos', category: 'request',
        scene: '観光地で写真を撮ったり頼んだりする場面',
        keywords: [
            { en: 'selfie', ja: '自撮り', pron: 'セルフィー', example: 'Let us take a group selfie.', note: '自撮り。selfie stick は自撮り棒。2013年にオックスフォード辞書に登録。' },
            { en: 'backlit', ja: '逆光の', pron: 'バックリット', example: 'You are backlit. Move this way.', note: '逆光。back + lit（照らされた）。写真用語だが日常でも使う。' },
            { en: 'horizontal', ja: '横向きの', pron: 'ホリゾンタル', example: 'Take one horizontal and one vertical.', note: 'landscape（横）とportrait（縦）のほうが写真用語としては一般的。' },
            { en: 'turn out', ja: '仕上がる', pron: 'ターンアウト', example: 'How did the photos turn out?', note: '結果がどうなったかを聞く万能表現。写真に限らず料理や計画にも使える。' },
            { en: 'flash', ja: 'フラッシュ', pron: 'フラッシュ', example: 'Turn the flash off.', note: 'flash photography は「フラッシュ撮影」。美術館では禁止が多い。no flash は標識でよく見る。' },
        ],
    },
    163: {
        title: 'お土産を買う', titleEn: 'Souvenir Shopping', category: 'shopping',
        scene: '現地の市場やお土産屋で買い物を楽しむ',
        keywords: [
            { en: 'souvenir', ja: 'お土産', pron: 'スーヴェニア', example: 'What is a popular souvenir from here?', note: '発音注意。「スーベニア」ではなく「スーヴェニア」に近い。memento も同義。' },
            { en: 'haggle', ja: '値段交渉する', pron: 'ハグル', example: 'You can always haggle at the market.', note: 'bargain とも言う。アジアや中東の市場では当たり前。欧米の店では普通しない。' },
            { en: 'tax refund', ja: '免税', pron: 'タックスリファンド', example: 'Can I get a tax refund on this?', note: '観光客向けの税金払い戻し。空港で手続きするパターンが多い。duty-free とは別物。' },
            { en: 'gift wrap', ja: 'ギフト包装', pron: 'ギフトラップ', example: 'Could you gift wrap this for me?', note: '贈り物用に包む。日本の百貨店ほど丁寧な包装は海外ではまず期待できない。' },
            { en: 'knockoff', ja: '偽物', pron: 'ノックオフ', example: 'I think this might be a knockoff.', note: 'ブランド品のコピー。counterfeit はもっと正式。fake はカジュアル。' },
        ],
    },
    164: {
        title: '現地の人と話す', titleEn: 'Talking to Locals', category: 'social',
        scene: '旅先で出会った地元の人との交流を楽しむ',
        keywords: [
            { en: 'hidden gem', ja: '穴場', pron: 'ヒドゥンジェム', example: 'Do you know any hidden gems around here?', note: '地元の人しか知らない素敵な場所。ガイドブックに載っていない店やスポット。' },
            { en: 'tourist trap', ja: '観光客向けのぼったくり店', pron: 'ツーリストトラップ', example: 'I want to avoid the tourist traps.', note: '観光客を狙った高い店。trap は「罠」。英語圏でも避けるべき場所として認識されている。' },
            { en: 'hit it off', ja: '意気投合する', pron: 'ヒットイットオフ', example: 'We really hit it off right away.', note: '初対面で仲良くなること。旅先の出会いを表現するのにぴったりのフレーズ。' },
            { en: 'stay in touch', ja: '連絡を取り続ける', pron: 'ステイインタッチ', example: 'I would love to stay in touch.', note: 'keep in touch も同じ意味。別れ際の定番フレーズ。SNSが普及して実現しやすくなった。' },
            { en: 'from the bottom of my heart', ja: '心の底から', pron: 'フロムザボトムオブマイハート', example: 'Thank you from the bottom of my heart.', note: '最上級の感謝表現。長いが心がこもっている。旅の最後にぴったり。' },
        ],
    },
};
