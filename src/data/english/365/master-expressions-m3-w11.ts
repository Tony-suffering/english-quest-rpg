/**
 * 365 English Master -- Month 3 Week 11: 人間関係の英語 (Talking About People)
 * Days 75-81: 70 expressions
 * Month: June 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 3 (2026-06) -- WEEK 11
// ============================================================

export const MONTH3_W11_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 75: 感謝の表現 (Saying Thank You)
    // Scene: 「ありがとう」のバリエーション。Thank youだけじゃない
    // ────────────────────────────────────────────────────

    {
        daySlot: 75, japanese: '本当に助かった',
        english: [
            'You saved me.',
            'You really saved me back there.',
            'Seriously, you saved me. I would have been lost without your help.',
            "Oh stop, you would've figured it out. But seriously, I'm glad I could help.",
        ],
        jaTranslations: [
            '助けてもらった。',
            'あの時マジで助かったよ。',
            '本当に助かった。あなたがいなかったら完全に詰んでた。',
            'いやいや、自分でもなんとかなったって。でもまあ、力になれてよかったよ。',
        ],
        context: 'save は「救う」だけど、日常では「助かった」くらいの軽さで使う。I owe you は「借りがある」。big time は「めちゃくちゃ」。on me は「おごり」。日本語の「助かりました」は英語だと you saved me のテンションになる。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: 'わざわざありがとう',
        english: [
            'Thanks for going out of your way.',
            'I really appreciate you going out of your way for me.',
            'You did not have to do that. Thank you so much for taking the trouble.',
            "Don't even worry about it. I was heading that way anyway, so it was no trouble at all.",
        ],
        jaTranslations: [
            'わざわざありがとう。',
            'わざわざやってくれて本当にありがたい。',
            'そこまでしなくてよかったのに。手間かけてくれて本当にありがとう。',
            '全然気にしないで。どうせそっち方面に行く用事あったし、全然大したことないよ。',
        ],
        context: 'go out of your way は「わざわざ」。日本語の「わざわざ」は感謝と申し訳なさが混ざるけど、英語は純粋な感謝。take it for granted は「当たり前だと思う」。follow through は「最後までやる」。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: 'いつも気にかけてくれてありがとう',
        english: [
            'Thanks for always checking on me.',
            'I appreciate you always looking out for me.',
            'It means a lot that you always check in on me. Thank you.',
            "Of course. That's what friends are for. You'd do the same for me.",
        ],
        jaTranslations: [
            'いつも気にかけてくれてありがとう。',
            'いつも見守ってくれて感謝してる。',
            'いつも様子見てくれるの、すごく嬉しい。ありがとう。',
            '当たり前じゃん。友達ってそういうもんでしょ。逆の立場でも同じことするくせに。',
        ],
        context: 'look out for は「気にかける」。check in on は「様子を見る」。something is off は「何かおかしい」。walk right past は「素通りする」。日本語の「気にかける」は英語だと look out for が一番近い。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: '言葉じゃ言い表せないくらい感謝してる',
        english: [
            'I cannot thank you enough.',
            'Words cannot express how grateful I am.',
            'I honestly do not know how to thank you enough for everything you have done.',
            "Come on, you're making me blush. I'm just happy it worked out for you.",
        ],
        jaTranslations: [
            '感謝してもしきれない。',
            '言葉じゃ言い表せないくらい感謝してる。',
            '正直、してもらったこと全部にどうお礼を言えばいいかわからない。',
            'やめてよ、照れるじゃん。うまくいってよかったよ、ほんと。',
        ],
        context: 'cannot thank you enough は直訳すると「十分に感謝できない」で、つまり「感謝しきれない」。no big deal は「大したことない」。showed up は「現れた」。日本語の「言葉にならない」感謝は英語でもちゃんとある。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: 'おかげさまで何とかなりました',
        english: [
            'Thanks to you, it worked out.',
            'It all worked out, thanks to you.',
            'Everything turned out fine thanks to your help. I could not have done it alone.',
            "That's great to hear! See, I told you it'd work out. You were stressing for nothing.",
        ],
        jaTranslations: [
            'おかげでうまくいった。',
            'あなたのおかげで全部うまくいったよ。',
            '助けてもらったおかげで全部うまくいった。一人じゃ絶対無理だった。',
            'それ聞けてよかった！ほら、うまくいくって言ったじゃん。心配しすぎだったんだよ。',
        ],
        context: 'worked out は「うまくいった」。turned out fine は「結果的に大丈夫だった」。おかげさまで は日本語特有の曖昧さがあるけど、英語では thanks to you とはっきり相手を指す。in the end は「最終的に」。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: 'ありがとうじゃ足りないよ',
        english: [
            'Thank you is not enough.',
            'A simple thank you does not feel like enough.',
            'Saying thank you just does not cut it. I want to do something to repay you.',
            "Hey, you don't owe me anything. Just seeing you pull through was reward enough.",
        ],
        jaTranslations: [
            'ありがとうじゃ足りない。',
            'ありがとうだけじゃ全然足りない気がする。',
            'ありがとうって言うだけじゃ足りない。何かお返しさせて。',
            'いやいや、借りなんてないよ。乗り越えたの見れただけで十分だから。',
        ],
        context: 'does not cut it は「十分じゃない」。went above and beyond は「期待以上のことをした」。pay you back は「お返しする」。deserve は「〜に値する」。日本語の「ありがとうじゃ足りない」は英語でもそのまま伝わる表現。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: '気持ちだけで嬉しい',
        english: [
            'It is the thought that counts.',
            'Just the thought alone makes me happy.',
            'You do not have to do anything. The fact that you thought of me is enough.',
            "Aw, that's really sweet of you to say. But honestly, if you wanna grab me a coffee sometime, I won't say no.",
        ],
        jaTranslations: [
            '気持ちが大事だよ。',
            '気持ちだけで十分嬉しい。',
            '何もしなくていいよ。考えてくれたってだけで十分。',
            'えー、そう言ってくれるの嬉しいな。でもまあ、今度コーヒーおごってくれるなら断らないけどね。',
        ],
        context: 'It is the thought that counts は「気持ちが大事」のことわざ。日本語の「気持ちだけで」と同じ感覚。counts は「重要である」。have their own stuff going on は「それぞれ忙しい」。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: 'お礼に何かさせて',
        english: [
            'Let me repay you.',
            'Let me do something for you in return.',
            'Please let me return the favor somehow. I feel bad just taking your help.',
            "Alright, alright, if you insist. You can buy me dinner next Friday. Deal?",
        ],
        jaTranslations: [
            'お返しさせて。',
            '何かお返しさせてよ。',
            '何かしらお返しさせて。助けてもらうばっかりで申し訳ない。',
            'はいはい、そこまで言うなら。来週の金曜、飯おごってよ。それでいい？',
        ],
        context: 'return the favor は「恩返しする」。one-sided は「一方的」。name it は「何でも言って」。No arguments は「言い訳なし」。日本語の「お返し」文化は英語でもちゃんとある。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: '感謝の気持ちを忘れちゃいけないよ',
        english: [
            'Never forget to be grateful.',
            'Always remember to appreciate what you have.',
            'No matter how busy life gets, never forget to say thank you to the people around you.',
            "You're right. I've been so caught up in work I forgot to thank the people around me. That hits hard.",
        ],
        jaTranslations: [
            '感謝の気持ちを忘れるな。',
            '自分が持ってるものに感謝するのを忘れるなよ。',
            'どんなに忙しくても、周りの人にありがとうって言うのだけは忘れちゃダメだ。',
            'そうだよな。仕事に追われて周りへの感謝忘れてた。刺さるわ、それ。',
        ],
        context: 'gratitude は「感謝」の名詞。behind the scenes は「裏方で」。ask for credit は「手柄を求める」。ゴンドーの人生訓。日本語の「おかげさま」の精神に近い。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 75, japanese: 'ちょっとしたことだけど嬉しかった',
        english: [
            'It was a small thing but it made my day.',
            'It was nothing big, but it totally made my day.',
            'It was just a small gesture but honestly it made my whole week.',
            "Right? It's always the little things. Someone held the door for me yesterday and it honestly turned my whole mood around.",
        ],
        jaTranslations: [
            'ちょっとしたことだけど嬉しかった。',
            '大したことじゃないんだけど、めっちゃ嬉しかった。',
            'ほんの小さいことなんだけど、正直一週間ずっと幸せだった。',
            'わかる！結局小さいことなんだよね。昨日ドア押さえてもらっただけで気分全然変わったもん。',
        ],
        context: 'made my day は「一日が幸せになった」。gesture は「行為」。turned it around は「好転させた」。feeling like garbage は「最悪の気分」。小さい親切の大きさを語る表現。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 76: 謝り方 (Apologizing)
    // Scene: Sorryの使いすぎ問題。リサが「日本人謝りすぎ」と指摘
    // ────────────────────────────────────────────────────

    {
        daySlot: 76, japanese: '本当にごめん、悪かった',
        english: [
            'I am really sorry.',
            'I am so sorry. That was my fault.',
            'I sincerely apologize. That was completely my fault and it will not happen again.',
            "Hey, it's okay. We all have bad days. I appreciate you saying that though, seriously.",
        ],
        jaTranslations: [
            '本当にごめん。',
            'マジでごめん。俺が悪かった。',
            '心からお詫びする。完全に俺のせいだし、二度とやらない。',
            'いいよいいよ。誰だってそういう日あるから。でもちゃんと言ってくれたの嬉しいよ、まじで。',
        ],
        context: 'out of line は「言い過ぎた」。took it out on は「八つ当たりした」。deserve は「〜に値する」。handled it better は「もっとうまく対処すべきだった」。英語の謝罪は「何が悪かったか」を明確にする。日本語みたいに「すみません」一言では済まない。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: '日本人ってすぐ謝るよね',
        english: [
            'Japanese people apologize a lot.',
            'Japanese people say sorry way too much.',
            'I have noticed that Japanese people apologize for everything, even things that are not their fault.',
            "Huh, I never thought about it that way. So what should I say instead of sorry when someone gives me a gift?",
        ],
        jaTranslations: [
            '日本人ってよく謝るよね。',
            '日本人ってすみません言いすぎじゃない？',
            '日本人って何でも謝るよね。自分のせいじゃないことにも。',
            'へえ、そう考えたことなかった。じゃあプレゼントもらった時、すみませんの代わりに何て言えばいいの？',
        ],
        context: 'accepting blame は「非を認める」。bumps into は「ぶつかる」。リサの鋭い指摘。日本語の「すみません」は謝罪・感謝・声かけの3つを兼ねるけど、英語の Sorry は謝罪だけ。ここが最大の文化ギャップ。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: '謝るほどのことじゃないよ',
        english: [
            'No need to apologize.',
            'You do not need to say sorry for that.',
            'Honestly, there is nothing to apologize for. You did not do anything wrong.',
            "You're right, I do that all the time. It's hard to break the habit though. I'll try to catch myself.",
        ],
        jaTranslations: [
            '謝る必要ないよ。',
            'それ、謝らなくていいから。',
            '正直、謝ることなんて何もないよ。何も悪くないんだから。',
            'そうだよね、いつもやっちゃう。でも癖ってなかなか直らないんだよな。気をつけるようにする。',
        ],
        context: 'bothering は「迷惑をかける」。loses its power は「力を失う」。taking it seriously は「真剣に受け取る」。リサの英語的な考え方。sorry のインフレ問題。使いすぎると価値が下がる。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: '遅れてすみません',
        english: [
            'Sorry I am late.',
            'I apologize for being late.',
            'I am so sorry for being late. The train was delayed and I could not do anything about it.',
            "No worries, I just got here myself. I grabbed us a table already, so we're good.",
        ],
        jaTranslations: [
            '遅れてごめん。',
            '遅刻してすみません。',
            '遅れて本当にごめん。電車が遅延してどうしようもなかった。',
            '全然大丈夫、俺もさっき着いたとこ。席もう取ってあるから問題なし。',
        ],
        context: 'making you wait は「待たせる」。got stuck は「止まった」。watching the minutes go by は「時間が過ぎるのを見ていた」。phone died は「スマホの電池切れ」。value your time は「あなたの時間を大切にする」。遅刻の謝り方は万国共通で必死。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: '言い方がきつかったかも',
        english: [
            'Maybe I was too harsh.',
            'I think I came across too strong.',
            'I think what I said earlier might have come across the wrong way. I did not mean it like that.',
            "Thanks for bringing that up. I was a little hurt at first, but I get what you were trying to say now.",
        ],
        jaTranslations: [
            '言い方きつかったかも。',
            'ちょっと強く言いすぎたかもしれない。',
            'さっき言ったこと、変な伝わり方しちゃったかも。そういうつもりじゃなかったんだ。',
            '言ってくれてありがとう。最初ちょっと傷ついたけど、今は言いたかったこと分かるよ。',
        ],
        context: 'came across は「伝わった」。too blunt は「ストレート過ぎた」。chosen my words は「言葉を選ぶ」。work on は「改善する」。英語では「意図と受け取り方のズレ」を説明して謝る。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: 'お詫びの印にこれどうぞ',
        english: [
            'Here, this is my apology.',
            'Please accept this as my apology.',
            'I got this for you as an apology. I hope it makes up for what I did.',
            "Oh wow, you didn't have to do that! We're totally fine, but I'm not gonna turn down chocolate.",
        ],
        jaTranslations: [
            'はい、これお詫び。',
            'お詫びのしるしに受け取って。',
            'お詫びにこれ買ってきた。少しでも埋め合わせになればいいんだけど。',
            'えー、そんなことしなくてよかったのに！もう全然大丈夫だよ。でもチョコは遠慮なくもらうけどね。',
        ],
        context: 'makes up for は「埋め合わせする」。bribe は「賄賂」。feel bad は「申し訳なく思う」。open to suggestions は「提案を受け入れる」。日本語の「お詫びの品」文化。英語でもモノで謝るのはアリ。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: '許してもらえるかな',
        english: [
            'Can you forgive me?',
            'Do you think you can forgive me?',
            'I know I messed up. Is there any chance you can forgive me?',
            "I'm not gonna lie, I'm still a little upset. But yeah, I think we can work it out. Just give me a bit.",
        ],
        jaTranslations: [
            '許してくれる？',
            '許してもらえるかな？',
            'やらかしたのは分かってる。許してもらえる可能性ある？',
            '正直まだちょっとモヤモヤしてる。でもまあ、なんとかなると思う。ちょっと時間ちょうだい。',
        ],
        context: 'forgive は「許す」。move past は「乗り越える」。I value this friendship more than my pride は「プライドよりこの友情が大事」。whatever it takes は「何でもする」。英語の謝罪は行動を約束するのがポイント。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: '自分を責めすぎないで',
        english: [
            'Do not be so hard on yourself.',
            'Stop beating yourself up about it.',
            'It happened. You apologized. Now let it go and stop beating yourself up.',
            "Yeah, you're right. I keep replaying it in my head but I need to let it go. Thanks for that.",
        ],
        jaTranslations: [
            '自分を責めすぎるな。',
            'もうそのことで自分を責めるのやめなよ。',
            '起きたことは起きた。謝った。もう手放せ。自分を責めるのはやめろ。',
            'うん、そうだよな。頭の中でずっとリプレイしてたけど、もう手放さないと。ありがとう。',
        ],
        context: 'beating yourself up は「自分を責める」。let it go は「手放す」。let yourself off the hook は「自分を許す」。eating you up は「蝕んでいる」。holding onto guilt は「罪悪感を抱え続ける」。ゴンドーの優しいアドバイス。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: 'すみませんって言う代わりにありがとうって言ってみ',
        english: [
            'Try saying thank you instead of sorry.',
            'Replace your sorry with a thank you.',
            'Instead of saying sorry for being late, try saying thank you for waiting.',
            "Oh, that's genius. So instead of 'sorry I talked your ear off,' I'd say 'thanks for listening.' I'm totally using that.",
        ],
        jaTranslations: [
            'すみませんの代わりにありがとうって言ってみな。',
            'すみませんをありがとうに置き換えてみ。',
            '遅れてすみませんじゃなくて、待っててくれてありがとうって言ってみ。',
            'それ天才じゃん。じゃあ「長話してごめん」じゃなくて「聞いてくれてありがとう」か。絶対使う。',
        ],
        context: 'replace A with B は「AをBに置き換える」。changes the energy は「空気が変わる」。feel valued は「大切にされていると感じる」。burdened は「負担に感じる」。Sorry を Thank you に変える技は英語圏でもバズった話。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 76, japanese: '謝り方にも文化の差があるんだね',
        english: [
            'Even apologizing is cultural.',
            'The way people apologize is so different across cultures.',
            'I never realized there was such a big cultural difference in how people apologize.',
            "Totally. I used to think sorry was universal but it really isn't. Every culture's got its own rules.",
        ],
        jaTranslations: [
            '謝り方にも文化があるんだね。',
            '謝り方って文化によってこんなに違うんだ。',
            '謝り方にこんな大きい文化の差があるなんて思わなかった。',
            'ほんとそれ。sorryって世界共通だと思ってたけど全然違うんだよね。文化ごとにルールがある。',
        ],
        context: 'maintaining harmony は「和を保つ」。taking responsibility は「責任を取る」。window into は「〜を知る窓」。neither one is wrong は「どちらも間違いではない」。謝罪の文化差を理解する名言。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 77: 励ます (Encouraging Others)
    // Scene: タケシがプレゼン前に緊張するユキを英語で励まそうとする
    // ────────────────────────────────────────────────────

    {
        daySlot: 77, japanese: '大丈夫、絶対うまくいくよ',
        english: [
            'You will be fine.',
            'You are going to do great. I know it.',
            'Trust me, you are going to nail it. I have seen you prepare and you are ready.',
            "Thanks, I needed to hear that. Okay, I'm going in. Wish me luck!",
        ],
        jaTranslations: [
            '大丈夫だよ。',
            '絶対うまくいくって。分かってるから。',
            '信じろって、絶対バッチリだから。準備してるの見てたし、もう準備万端だよ。',
            'ありがとう、その言葉が欲しかった。よし、行ってくる。応援してて！',
        ],
        context: 'nail it は「バッチリ決める」。crush it は「完璧にやる」。inside and out は「隅から隅まで」。nerves は「緊張」。日本語の「大丈夫」は曖昧だけど、英語では具体的に「なぜ大丈夫か」を言う。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '緊張するの当たり前だよ',
        english: [
            'Being nervous is normal.',
            'It is totally normal to be nervous.',
            'Everyone gets nervous before a big presentation. That is just your body getting ready.',
            "Wait, really? Even pros get nervous? That actually makes me feel way better about it.",
        ],
        jaTranslations: [
            '緊張するのは普通だよ。',
            '緊張するの当たり前だって。',
            '大事なプレゼンの前はみんな緊張する。体が準備してるだけだよ。',
            'え、マジ？プロでも緊張するの？それ聞いたらだいぶ楽になった。',
        ],
        context: 'channel that energy は「そのエネルギーを〜に向ける」。run from は「逃げる」。nervousness and excitement are the same thing は脳科学的にも本当。日本語の「緊張」はネガティブだけど、英語では excitement に変換できる。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '自分を信じて',
        english: [
            'Believe in yourself.',
            'You need to trust yourself more.',
            'You have done the work. Now all you have to do is believe in yourself.',
            "You're right. I've done everything I can. Time to just go for it. Thank you, Master.",
        ],
        jaTranslations: [
            '自分を信じろ。',
            'もっと自分を信じなよ。',
            'やることはやった。あとは自分を信じるだけだ。',
            'そうだよな。やれることは全部やった。あとはやるだけだ。ありがとう、マスター。',
        ],
        context: 'cram は「詰め込む」。show them what you have got は「実力を見せてやれ」。trust yourself は日本語の「自分を信じて」と同じだけど、英語では具体的に「何を信じるか」を言うとより力強くなる。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '失敗しても死なないから',
        english: [
            'It is not the end of the world.',
            'Even if it goes badly, it is not the end of the world.',
            'The worst that can happen is it does not go perfectly. And that is okay.',
            "Ha, okay that's a good point. Nobody's gonna die. I think I was blowing this way out of proportion.",
        ],
        jaTranslations: [
            '世界が終わるわけじゃない。',
            'うまくいかなくても、別に死ぬわけじゃないし。',
            '最悪でも完璧にいかないだけ。それでも全然いいじゃん。',
            'は、確かに。誰も死なないよな。大げさに考えすぎてたわ。',
        ],
        context: 'put this in perspective は「客観的に見てみよう」。worst case scenario は「最悪の場合」。bombed は「大失敗した」。stakes は「リスク・賭け金」。失敗のスケール感を縮小する励まし方。英語圏の人は perspective をよく使う。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '応援してるよ',
        english: [
            'I am rooting for you.',
            'I am behind you one hundred percent.',
            'We are all rooting for you. You have got the whole team behind you.',
            "Aw, you guys are the best. Okay, I'm not nervous anymore. Well, maybe a little. But I've got this.",
        ],
        jaTranslations: [
            '応援してるよ。',
            '100パーセント味方だから。',
            'みんな応援してるよ。チーム全員ついてるから。',
            'みんな最高だよ。よし、もう緊張してない。いや、ちょっとしてるけど。でもいける。',
        ],
        context: 'rooting for は「応援している」。behind you は「味方だよ」。on your side は「あなたの側にいる」。judges は「審査員」。日本語の「応援してる」は英語だと rooting for you が一番カジュアル。I support you は硬すぎる。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '前よりずっと上手くなってるよ',
        english: [
            'You have improved so much.',
            'You are way better than you used to be.',
            'Seriously, compared to last month, you have improved so much. The progress is real.',
            "You think so? I feel like I still mess up a lot, but hearing that from you means a lot. Thanks, Lisa.",
        ],
        jaTranslations: [
            'すごく上達したよ。',
            '前よりずっと上手くなってるって。',
            'まじで、先月と比べたらめちゃくちゃ上達してる。成長は本物だよ。',
            'そうかな？まだいっぱい間違える気がするけど、リサにそう言ってもらえると嬉しい。ありがとう。',
        ],
        context: 'give yourself some credit は「自分を褒めてあげて」。paying off は「報われる」。crack jokes は「冗談を言う」。eye contact は「アイコンタクト」。進歩を具体的に示す励まし方が英語的。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '完璧じゃなくていいんだよ',
        english: [
            'It does not have to be perfect.',
            'Nobody expects perfection. Just do your best.',
            'You do not need to be perfect. People connect with honesty, not perfection.',
            "That's such a relief. I keep obsessing over every little detail but maybe I should just relax and be myself.",
        ],
        jaTranslations: [
            '完璧じゃなくていいんだよ。',
            '誰も完璧なんて求めてないよ。ベストを尽くせばいい。',
            '完璧じゃなくていい。人は完璧さじゃなくて誠実さに共感するんだ。',
            'それ聞いて楽になった。細かいことばっかり気にしてたけど、リラックスして自分らしくやればいいのか。',
        ],
        context: 'connect with は「共感する」。from the heart は「心から」。stick は「記憶に残る」。memorable は「印象的な」。完璧主義の日本人に刺さる表現。英語圏では be real が褒め言葉。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '深呼吸して',
        english: [
            'Take a deep breath.',
            'Just take a deep breath and relax.',
            'Before you go in, take three deep breaths. It actually helps calm your nerves.',
            "Okay, let me try. In... out... Wow, that actually works. My heart's not pounding as much now.",
        ],
        jaTranslations: [
            '深呼吸して。',
            '深呼吸してリラックスしな。',
            '入る前に3回深呼吸して。マジで緊張ほぐれるから。',
            'やってみる。吸って...吐いて...うわ、ほんとに効く。心臓のドキドキだいぶ落ち着いた。',
        ],
        context: 'deep breath は「深呼吸」。calm your nerves は「緊張を和らげる」。heart rate は「心拍数」。tells your brain to chill は「脳にリラックスしろと伝える」。呼吸法は英語圏のビジネスでも常識。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '俺がついてるから',
        english: [
            'I have got your back.',
            'Do not worry. I have got your back.',
            'Whatever happens in there, remember that I have got your back. You are not alone.',
            "That means everything to me right now. Okay, I'm going in. Don't let me fall on my face out there.",
        ],
        jaTranslations: [
            '俺がついてるから。',
            '心配すんな。俺がついてる。',
            '中で何があっても、俺がついてるの忘れんな。一人じゃないから。',
            '今それが一番心強い。よし、行ってくる。コケそうになったら助けてくれよ。',
        ],
        context: 'I have got your back は「俺がついてる」。cover for each other は「互いにカバーする」。jump in は「助けに入る」。tough question は「難しい質問」。I have got your back は友情の最強表現。日本語の「任せろ」に近い。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 77, japanese: '終わったらお祝いしよう',
        english: [
            'Let us celebrate after.',
            'When this is over, drinks are on me.',
            'Once you are done, we are going out to celebrate. No matter how it goes.',
            "Now that's motivation! Okay, I'm definitely finishing this fast so we can go celebrate. See you on the other side!",
        ],
        jaTranslations: [
            '終わったらお祝いしよう。',
            '終わったら俺のおごりで飲みに行こう。',
            '終わったら祝いに行くぞ。結果がどうであろうとな。',
            'それモチベになる！よし、さっさと終わらせて祝いに行くぞ。向こう側で待っててくれ！',
        ],
        context: 'drinks are on me は「おごるよ」。light at the end of the tunnel は「トンネルの先の光」のことわざをビールに変えたユーモア。either way は「どっちにしても」。go get it done は「やってこい」。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 78: 断り方 (Saying No Politely)
    // Scene: 日本語の曖昧な断りを英語でどう表現するか
    // ────────────────────────────────────────────────────

    {
        daySlot: 78, japanese: 'ちょっと難しいかな',
        english: [
            'That might be tough.',
            'That is going to be a little difficult for me.',
            'I appreciate the offer but I do not think I can make it work this time.',
            "No problem at all. Just hit me up whenever you're free. No rush on my end.",
        ],
        jaTranslations: [
            'ちょっと難しいかも。',
            'それ、自分にはちょっと厳しいな。',
            '誘ってくれるのはありがたいけど、今回はちょっと無理そう。',
            '全然大丈夫。空いた時いつでも連絡して。こっちは急いでないから。',
        ],
        context: 'rain check は「また今度」。make it up to you は「埋め合わせする」。packed は「ぎっしり詰まっている」。日本語の「ちょっと難しい」は No の意味だけど、英語では理由を言わないと「じゃあどうすれば可能？」と聞き返される。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: '今回は遠慮しておくね',
        english: [
            'I will pass this time.',
            'I think I am going to sit this one out.',
            'Thank you for thinking of me but I am going to pass this time around.',
            "Totally get it. Take it easy this weekend. We'll grab you next time for sure.",
        ],
        jaTranslations: [
            '今回はやめとく。',
            '今回は遠慮しとこうかな。',
            '誘ってくれてありがとう、でも今回はパスさせて。',
            '全然わかる。週末ゆっくりしな。次は絶対連れてくから。',
        ],
        context: 'sit this one out は「今回は見送る」。I would be all over it は「普段なら飛びつく」。pass は「遠慮する」。my wallet is crying は「財布が泣いている」の擬人化ユーモア。日本語の「遠慮する」に近いカジュアルな断り方。',
        character: 'mina', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: '気持ちはありがたいけど',
        english: [
            'I appreciate the thought.',
            'I really appreciate the offer but I have to decline.',
            'That is so nice of you to offer but I am going to have to say no this time.',
            "Of course, I totally understand. Take care of yourself first. The offer's always open whenever you're ready.",
        ],
        jaTranslations: [
            '気持ちはありがたいけど。',
            '誘ってくれるのはほんとにありがたいけど、断らせて。',
            'そう言ってくれるのすごく嬉しいんだけど、今回は遠慮させてもらうね。',
            'もちろん、全然わかるよ。自分のこと優先して。いつでも声かけてくれればいいから。',
        ],
        context: 'decline は「お断りする」。sort out は「整理する」。commit to は「コミットする」。a me thing, not a you thing は「自分の問題であって、あなたのせいじゃない」。日本語の「気持ちはありがたい」を英語にすると、理由をきちんと添えるのがポイント。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: '日本人って断れないよね',
        english: [
            'Japanese people cannot say no.',
            'It is so hard for Japanese people to say no directly.',
            'We really struggle with saying no. We always try to soften it so much that the message gets lost.',
            "Ha, I've done that too! I once said 'maybe' and ended up running a whole event I never wanted to do.",
        ],
        jaTranslations: [
            '日本人って断れないよね。',
            '日本人ってはっきり断るの苦手だよね。',
            '断るのほんと苦手だよね。やんわりしすぎて伝わらないこと多い。',
            'あー、それやったことある！「多分」って言ったら、やりたくもないイベントの担当にされた。',
        ],
        context: 'culture shock は「カルチャーショック」。push harder は「さらに押してくる」。end up は「結局〜する」。accidentally agreed は「うっかり同意した」。日本語の「ちょっと...」は No のサインだけど、英語では通じない。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: '断るのは失礼じゃないよ',
        english: [
            'Saying no is not rude.',
            'It is not rude to say no. It is honest.',
            'In English, saying no politely is respected. People prefer honesty over vague answers.',
            "That makes so much sense. I always thought saying no was rude, but I guess being wishy-washy is worse.",
        ],
        jaTranslations: [
            '断るのは失礼じゃないよ。',
            '断ること自体は失礼じゃない。正直なだけ。',
            '英語では丁寧に断るのはむしろ尊重される。曖昧な返事の方が嫌がられるよ。',
            'めっちゃ納得。断るのが失礼だと思ってたけど、曖昧にする方がよっぽどダメなんだな。',
        ],
        context: 'vague は「曖昧な」。I cannot make it は「行けない」の万能表現。cancel last minute は「ドタキャン」。disrespectful は「失礼な」。英語圏では曖昧な Yes の方が失礼。日本と真逆。',
        character: 'lisa', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: 'その日は先約があって',
        english: [
            'I already have plans.',
            'I would love to but I already have something that day.',
            'I am so sorry but I already have plans that day. Can we do another time?',
            "No worries, things happen. We'll send you pics so you can see what you missed. Next time!",
        ],
        jaTranslations: [
            'もう先約があって。',
            '行きたいんだけど、その日もう予定あるんだ。',
            'ごめん、その日もう予定入ってて。別の日にできない？',
            '全然大丈夫、そういうこともあるよ。写真送るから何逃したか見てね。次こそ！',
        ],
        context: 'committed to は「約束している」。back out は「取り消す」。line up は「合う」。keep inviting me は「誘い続けて」。I already have plans は英語で一番使える断り文句。具体的に何の予定かは言わなくてOK。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: '考えておくね（やんわり断る時）',
        english: [
            'I will think about it.',
            'Let me think about it and get back to you.',
            'That is interesting. Let me think about it and I will let you know by Friday.',
            "Oh no, that explains why my coworker kept following up last week. She thought I was actually thinking about it!",
        ],
        jaTranslations: [
            '考えておくね。',
            'ちょっと考えさせて、また連絡する。',
            '面白いね。考えて金曜までに返事するよ。',
            'やばい、先週同僚がずっと確認してきた理由それだ。本当に考えてると思ってたんだ！',
        ],
        context: 'get back to you は「返事する」。learned the hard way は「痛い目にあって学んだ」。follow up は「フォローアップする」。awkward は「気まずい」。「考えておく」は日本語では断りだけど、英語では本当に検討するという意味になる。要注意。',
        character: 'lisa', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: '無理しなくていいよ',
        english: [
            'Do not push yourself.',
            'You do not have to force yourself.',
            'If you are not feeling up to it, do not force it. We totally understand.',
            "Thanks, I think I do need a night off. Pajamas and Netflix sounds pretty perfect right now honestly.",
        ],
        jaTranslations: [
            '無理しなくていいよ。',
            '無理して来なくていいから。',
            'そんな気分じゃなかったら無理しなくていいよ。みんなわかってるから。',
            'ありがとう、やっぱ今日は休もうかな。パジャマでNetflixが正直今一番理想的。',
        ],
        context: 'feeling up to it は「そういう気分である」。miserable は「惨めな」。no obligation は「義務はない」。no judgment は「責めない」。catch you next time は「次回ね」。日本語の「無理しないで」は英語では「本音を言って大丈夫だよ」のニュアンス。',
        character: 'master', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: '今は余裕がないんだ',
        english: [
            'I do not have the bandwidth.',
            'I just do not have the capacity right now.',
            'I am spread too thin right now. I need to focus on what is already on my plate.',
            "Say no more. You look exhausted. Focus on what's on your plate and don't feel bad about it.",
        ],
        jaTranslations: [
            '今は余裕がない。',
            '今マジでキャパオーバーなんだ。',
            '手一杯すぎて今は無理。今抱えてるやつに集中しないと。',
            'もう何も言わなくていい。疲れてる顔してるよ。目の前のことに集中して、罪悪感持つなよ。',
        ],
        context: 'bandwidth は元々IT用語で「処理能力」。spread thin は「手が回らない」。on my plate は「抱えている」。juggling は「お手玉のように複数こなす」。bandwidth は最近ビジネスでよく使われるカジュアルな「余裕がない」。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 78, japanese: 'また誘ってね',
        english: [
            'Ask me again next time.',
            'Please keep me in the loop for next time.',
            'I cannot make it this time but please invite me again. I really do want to come.',
            "For sure! I'll text you as soon as we start planning the next one. You better show up though!",
        ],
        jaTranslations: [
            'また誘ってね。',
            '次は絶対声かけてね。',
            '今回は行けないけど、また誘って。ほんとに行きたいから。',
            'もちろん！次の計画始まったらすぐ連絡するよ。でも今度はちゃんと来いよ！',
        ],
        context: 'keep me in the loop は「仲間外れにしないで」。bummed は「残念」。take me off the list は「リストから外す」。keep me posted は「知らせてね」。looking forward to は「楽しみにしている」。「また誘ってね」を本気で言う表現。',
        character: 'mina', category: 'request', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 79: 愚痴を言う (Complaining)
    // Scene: 居酒屋で仕事の愚痴大会。英語で愚痴る練習
    // ────────────────────────────────────────────────────

    {
        daySlot: 79, japanese: '今日マジで最悪だった',
        english: [
            'Today was the worst.',
            'Today was absolutely terrible.',
            'I had the worst day ever. Everything that could go wrong went wrong.',
            "Dude, that's brutal. Here, let me get you a drink. You definitely earned one today.",
        ],
        jaTranslations: [
            '今日マジ最悪だった。',
            '今日ほんっとにひどかった。',
            '人生で最悪の一日だった。ダメになれることは全部ダメになった。',
            'うわ、それはきっつい。ほら、一杯おごるよ。今日は飲む権利あるわ。',
        ],
        context: 'to top it all off は「さらに追い打ちで」。solved nothing は「何も解決しなかった」。the universe is targeting me は「宇宙が自分を狙ってる」の大げさユーモア。英語で愚痴る時は具体的にストーリーを積み上げるのがコツ。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: '上司がほんと無理',
        english: [
            'I cannot stand my boss.',
            'My boss is driving me absolutely insane.',
            'I swear my boss exists solely to make my life harder. I am losing my mind.',
            "Eleven at night?! That's insane. Have you thought about just talking to HR about it?",
        ],
        jaTranslations: [
            '上司がほんと無理。',
            '上司のせいでマジで頭おかしくなりそう。',
            '上司が俺の人生をハードモードにするためだけに存在してる。気が狂いそう。',
            '夜11時に？！やばすぎでしょ。人事に相談するとか考えたことない？',
        ],
        context: 'driving me insane は「頭がおかしくなりそう」。signed off on は「承認した」。start over は「やり直す」。fired on the spot は「即クビ」。上司の愚痴は万国共通。英語では具体的なエピソードで語るのが愚痴の流儀。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: '給料と仕事量が見合ってない',
        english: [
            'I am underpaid.',
            'I do not get paid enough for this.',
            'The amount of work they expect me to do for this salary is honestly insulting.',
            "Two raises in eight years? That's rough. Honestly, you should start looking around. You deserve way better.",
        ],
        jaTranslations: [
            '給料安すぎる。',
            'この仕事量でこの給料は割に合わない。',
            'この給料でこれだけ働かされるのは正直バカにされてる。',
            '8年で昇給2回？きっつ。正直、他探した方がいいよ。もっといい待遇受けるべきだって。',
        ],
        context: 'underpaid は「給料が安すぎる」。overtime は「残業」。workload は「仕事量」。tripled は「3倍になった」。raises は「昇給」。英語で給料の愚痴を言うのは日本ほどタブーじゃない。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: '愚痴ばっかり言ってもしょうがないけどさ',
        english: [
            'Complaining does not help but still.',
            'I know complaining does not solve anything but I need to vent.',
            'I know sitting here complaining is not going to fix things but sometimes you just need to get it off your chest.',
            "Go ahead, I'm all ears. Sometimes you just gotta let it out. I won't say a word.",
        ],
        jaTranslations: [
            '愚痴言ってもしょうがないけどさ。',
            '愚痴っても解決しないのは分かってるけど、吐き出したい。',
            'こうやって愚痴っても何も変わらないのは分かってる。でもたまには胸のつかえ取りたいんだよ。',
            'どうぞどうぞ、聞くよ。たまには吐き出さないとやってけないって。何も言わないから。',
        ],
        context: 'vent は「愚痴を吐き出す」。get it off your chest は「胸のつかえを取る」。rattling around は「頭の中でぐるぐるする」。unfiltered は「フィルターなしの」。英語の vent は「愚痴を吐く」の最もカジュアルな表現。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: '何で俺ばっかり',
        english: [
            'Why is it always me?',
            'Why does this always happen to me?',
            'I swear I am the only one this kind of thing happens to. It is like I have a curse.',
            "Because you're too nice, that's why. You gotta start saying no or they'll keep piling it on.",
        ],
        jaTranslations: [
            '何で俺ばっかり？',
            '何でいつも俺なの？',
            'こういうの俺にしか起こらないだろ。呪われてんのかってレベル。',
            'お前が優しすぎるからだよ。断ること覚えないと、どんどん押し付けられるぞ。',
        ],
        context: 'land on my desk は「自分のところに回ってくる」。ends up being は「結局〜になる」。miracle worker は「奇跡を起こす人」。日本語の「何で俺ばっかり」は why is it always me が完璧に対応する。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: '満員電車がほんとに無理',
        english: [
            'I hate crowded trains.',
            'Packed trains are the absolute worst.',
            'I cannot deal with the morning rush anymore. Being squeezed into a train like a sardine is inhumane.',
            "Ugh, same. I literally got my bag stuck in the doors this morning. Have you tried taking an earlier train?",
        ],
        jaTranslations: [
            '満員電車ほんと無理。',
            'ぎゅうぎゅうの電車マジで最悪。',
            '朝のラッシュもう耐えられない。イワシみたいに詰め込まれるの人間扱いじゃない。',
            'うわ、わかる。今朝カバンがドアに挟まったし。もっと早い電車にしてみたら？',
        ],
        context: 'packed は「ぎゅうぎゅう」。like a sardine は「イワシのように」。crammed は「詰め込まれた」。commute は「通勤」。do not even get me started は「その話始めたら止まらない」。満員電車の愚痴は日本特有だけど英語でも表現できる。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: 'まじでやってらんない',
        english: [
            'I am so done.',
            'I am so over this. I just cannot anymore.',
            'I have had it up to here. I am done pretending everything is fine.',
            "You've been holding that in for a while, huh? I think it's time you had a real talk with your manager.",
        ],
        jaTranslations: [
            'もう無理。',
            'もうほんとやってらんない。限界。',
            'もう我慢の限界。大丈夫なフリするのもう無理。',
            'だいぶ溜め込んでたんだな。そろそろ上司とちゃんと話した方がいいと思うよ。',
        ],
        context: 'I am so done は「もう無理」。had it up to here は「もう限界」。putting up with は「我慢する」。asking for the moon は「ありえないことを要求する」。日本語の「やってらんない」の温度感にぴったり。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: '愚痴聞いてくれてありがとう',
        english: [
            'Thanks for listening.',
            'Thanks for letting me vent. I feel better now.',
            'I appreciate you listening to all that. I really needed to get it out of my system.',
            "Anytime, man. That's what this place is for. You feeling a little better now?",
        ],
        jaTranslations: [
            '聞いてくれてありがとう。',
            '愚痴聞いてくれてありがとう。だいぶスッキリした。',
            '全部聞いてくれてありがとう。ほんと吐き出す必要あったんだ。',
            'いつでもどうぞ。この場所はそのためにあるんだから。ちょっとは楽になった？',
        ],
        context: 'get it out of my system は「吐き出してスッキリする」。sitting through は「最後まで聞いてくれる」。that sucks は「それは最悪だね」の共感。putting up with は「付き合ってくれる」。愚痴の後の感謝は英語でも大事。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: 'そんなのありえなくない？',
        english: [
            'Are you kidding me?',
            'How is that even possible? That is insane.',
            'Wait, are you serious right now? That is absolutely ridiculous. I would be furious.',
            "Right?! I couldn't believe it either. If that happened to me I'd lose it on the spot.",
        ],
        jaTranslations: [
            'マジで？ありえなくない？',
            'それマジ？ありえないんだけど。',
            'ちょっと待って、本気で言ってる？それ完全にありえないんだけど。俺だったらキレてるわ。',
            'だよね？！俺も信じらんなかった。自分に起きたらその場で爆発してるわ。',
        ],
        context: 'let me get this straight は「ちょっと整理させて」。unhinged は「まともじゃない」。Comic Sans は「ダサいフォント」の代名詞。reasonable は「合理的な」。英語で愚痴に共感する時は大げさにリアクションするのが礼儀。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 79, japanese: '愚痴も言えないとやってけないよ',
        english: [
            'You need to vent sometimes.',
            'Everybody needs to complain once in a while.',
            'If you keep everything bottled up inside, you are going to explode eventually.',
            "Cheers to that, Master. Another round then? I've still got some steam to blow off.",
        ],
        jaTranslations: [
            'たまには愚痴も必要だよ。',
            'たまには愚痴言わないとやってけない。',
            '全部溜め込んでたら、いつか爆発するぞ。',
            'その通りだよ、マスター。じゃあもう一杯？まだ吐き出し足りないんだ。',
        ],
        context: 'bottled up は「溜め込む」。breakdown は「崩壊」。let it all out は「全部吐き出す」。that is what friends are for は「友達ってそういうもん」。ゴンドーの居酒屋哲学。愚痴を肯定する名言。',
        character: 'master', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 80: 共感する (Showing Sympathy)
    // Scene: ミナが「英語で共感するフレーズが全然出てこない」と悩む
    // ────────────────────────────────────────────────────

    {
        daySlot: 80, japanese: 'それは大変だったね',
        english: [
            'That sounds rough.',
            'That must have been really tough for you.',
            'I am sorry you had to go through that. It sounds like it was really hard.',
            "Thanks. It really was. I'm just glad it's over now. Talking about it actually helps a lot.",
        ],
        jaTranslations: [
            'それは大変だったね。',
            'それはほんとにきつかったね。',
            'そんな目に遭ったのか。ほんとに大変だったね。',
            'ありがとう。ほんとに大変だった。もう終わったからよかったけど。話すだけでだいぶ楽になる。',
        ],
        context: 'sounds rough は「大変そう」。go through は「経験する」。moral support は「精神的サポート」。日本語の「大変だったね」は英語だと that sounds tough が一番近い。that is tough は「今大変」、that must have been tough は「あの時大変だったね」。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: 'つらかったら話してね',
        english: [
            'I am here if you need to talk.',
            'If you ever need to talk, I am right here.',
            'Whenever you are ready to talk about it, I am here. No pressure at all.',
            "I really appreciate that. I'm not ready to get into it yet, but knowing you're there means a lot.",
        ],
        jaTranslations: [
            'つらかったら話してね。',
            '話したくなったらいつでもここにいるよ。',
            '話す準備ができた時でいいから、いつでも聞くよ。無理しなくていいからね。',
            'ほんとにありがとう。まだ話す気にはなれないけど、いてくれるだけで全然違う。',
        ],
        context: 'no pressure は「無理しないで」。day or night は「いつでも」。sound like a zombie は「ゾンビみたいな声」。sit with you in silence は「黙って一緒にいる」。英語でも「聞くよ」と言ってあげることが最高の共感。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: '気持ちわかるよ',
        english: [
            'I know how you feel.',
            'I totally get how you feel.',
            'I have been in a similar situation and I know exactly how frustrating it is.',
            "Really? I had no idea you went through that too. It helps knowing I'm not the only one.",
        ],
        jaTranslations: [
            '気持ちわかるよ。',
            'その気持ち、めっちゃわかる。',
            '似た経験あるから、そのもどかしさよくわかるよ。',
            'マジ？同じ経験してたの知らなかった。自分だけじゃないって分かるだけで楽になる。',
        ],
        context: 'I get it は「わかる」。went through は「経験した」。feel stuck は「行き詰まった」。question every decision は「全ての判断を疑う」。英語で I know how you feel と言うと「経験がある」という意味になる。軽々しく使うと「本当にわかってるの？」と思われるので注意。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: 'それはひどいね',
        english: [
            'That is terrible.',
            'That is awful. I am so sorry.',
            'That is completely unacceptable. You should not have been treated like that.',
            "I tried to stay calm but honestly I was shaking inside. It's good to hear someone say it's not okay.",
        ],
        jaTranslations: [
            'それはひどいね。',
            'それはひどい。ほんと申し訳ない。',
            'それは完全にありえない。そんな扱い受けるべきじゃないよ。',
            '冷静でいようとしたけど、正直中では震えてた。ダメなことはダメって言ってもらえると救われる。',
        ],
        context: 'messed up は「ひどい」。handled it は「対処した」。kept your cool は「冷静でいた」。lost it は「キレた」。you have every right は「怒る権利がある」。英語の共感は「自分ならどうするか」を言うのがポイント。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: '英語で共感するのって難しい',
        english: [
            'Showing empathy in English is hard.',
            'I never know what to say in English when someone is upset.',
            'In Japanese, I can read the mood and respond naturally, but in English I freeze up.',
            "Honestly, just saying 'that sounds tough' or 'I'm sorry to hear that' goes a long way. You don't need a speech.",
        ],
        jaTranslations: [
            '英語で共感するの難しい。',
            '英語で誰か落ち込んでる時に何て言えばいいかわからない。',
            '日本語なら空気読んで自然に返せるけど、英語だとフリーズしちゃう。',
            '正直、「それ大変だね」とか「それは残念」って言うだけでめっちゃ伝わるよ。スピーチはいらない。',
        ],
        context: 'freeze up は「固まる」。feels heard は「聞いてもらえたと感じる」。the moment has passed は「タイミングを逃した」。日本語は「うんうん」で共感できるけど、英語は言葉にしないと伝わらない。この差がミナの悩みの核心。',
        character: 'mina', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: '何て言っていいかわからない',
        english: [
            'I do not know what to say.',
            'I honestly do not know what to say but I am here for you.',
            'I wish I had the right words but I do not. Just know that I care about you.',
            "Honestly? Just you being here is enough. I don't need answers. I just needed someone to listen.",
        ],
        jaTranslations: [
            '何て言えばいいかわからない。',
            '正直何て言えばいいかわからないけど、そばにいるよ。',
            '気の利いた言葉が出てこない。でも、大事に思ってることだけは知ってて。',
            '正直？いてくれるだけで十分。答えなんていらない。ただ聞いてくれる人が必要だっただけ。',
        ],
        context: 'I do not know what to say は実は最強の共感フレーズ。wise words は「気の利いた言葉」。I am not going anywhere は「どこにも行かない」。英語圏でも「何も言えないけどそばにいる」が最高の共感だと知っておくと楽になる。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: '無理しなくていいからね',
        english: [
            'Take it easy.',
            'Do not push yourself too hard.',
            'You do not have to be strong all the time. It is okay to take a break.',
            "You're right, I've been running on empty. Maybe I'll take tomorrow off and just do nothing for once.",
        ],
        jaTranslations: [
            '無理しないで。',
            'そんなに頑張りすぎなくていいよ。',
            'いつも強くなくていいんだよ。たまには休んでいいんだから。',
            'そうだよな、ずっとガス欠で走ってた。明日休んで何もしないのもアリかも。',
        ],
        context: 'have it all together は「全部ちゃんとやる」。recharge は「充電する」。fall apart は「崩壊する」。mindless は「何も考えなくていい」。It is okay to not be okay は最近の英語圏でよく聞く名フレーズ。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: '一人で抱え込まないで',
        english: [
            'Do not carry this alone.',
            'You do not have to go through this by yourself.',
            'Please do not keep everything bottled up. You have people who want to help.',
            "I know, I know. I just hate being a burden. But you're right, I can't keep doing this alone.",
        ],
        jaTranslations: [
            '一人で抱え込むな。',
            '一人で全部背負わなくていいんだよ。',
            '全部溜め込まないで。助けたい人間がいるんだから。',
            'わかってる、わかってる。でも迷惑かけたくないんだよ。でもそうだよな、一人じゃ限界だ。',
        ],
        context: 'carrying this は「抱え込む」。stubbornness は「頑固」。let us in は「心を開いて」。saying it out loud は「声に出す」。日本人は「迷惑かけたくない」で一人で抱えがちだけど、英語圏では help を求めるのが healthy とされる。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: 'それ、私も同じ経験ある',
        english: [
            'I have been there.',
            'I have been through the exact same thing.',
            'I know exactly what you are going through because I have been in that exact situation.',
            "You did? I had no idea. How long did it take before you started feeling normal again?",
        ],
        jaTranslations: [
            '私もその経験ある。',
            '全く同じ経験したことある。',
            'その気持ちよくわかるよ。全く同じ状況だったことあるから。',
            'そうだったの？知らなかった。普通に戻るまでどれくらいかかった？',
        ],
        context: 'I have been there は「その経験あるよ」の最も共感的な表現。overnight は「一晩で」。staring at the ceiling は「天井を見つめる」。definitely は「確実に」。I have been there は「同じ場所にいたことがある」で、痛みの共有。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 80, japanese: '話してくれてありがとう',
        english: [
            'Thanks for telling me.',
            'Thank you for opening up to me.',
            'I know it was not easy to talk about this. Thank you for trusting me.',
            "I almost didn't say anything. But I'm glad I did. It feels like a weight's been lifted off my chest.",
        ],
        jaTranslations: [
            '話してくれてありがとう。',
            '打ち明けてくれてありがとう。',
            '話すの簡単じゃなかっただろうに。信頼してくれてありがとう。',
            '正直何も言わないつもりだった。でも言ってよかった。胸のつかえが取れた感じ。',
        ],
        context: 'opening up は「心を開く」。vulnerable は「弱さを見せる」。debated は「迷った」。courage は「勇気」。英語で「話してくれてありがとう」は感謝と尊敬を込めた表現。日本語より重みがある。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 81: 怒りの表現 (Expressing Anger)
    // Scene: ケンジが現場でトラブル。怒りを英語で伝える難しさ
    // ────────────────────────────────────────────────────

    {
        daySlot: 81, japanese: 'ふざけんなよ',
        english: [
            'Are you kidding me?',
            'You have got to be kidding me right now.',
            'This is absolutely unacceptable. Who signed off on this? I want answers.',
            "Whoa, okay, take a breath. Do you want me to call them and sort this out with you?",
        ],
        jaTranslations: [
            'ふざけんなよ。',
            'マジでふざけんなよ、今。',
            'これは完全にありえない。誰がこれにOK出したんだ？説明しろ。',
            'おいおい、一回落ち着けって。一緒に電話して片付けようか？',
        ],
        context: 'signed off on は「承認した」。does not even begin to cover it は「それでは表現しきれない」。managed to get it wrong は「見事にミスった」の皮肉。英語で怒る時は specific（具体的）に怒るのがポイント。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: '何回言ったらわかるの',
        english: [
            'How many times do I have to say it?',
            'I have told you this a hundred times already.',
            'I should not have to repeat myself this many times. This is getting ridiculous.',
            "Maybe try putting it in writing next time? At least then there's a paper trail if they mess up again.",
        ],
        jaTranslations: [
            '何回言えばわかるの？',
            '100回は言ったんだけど。',
            'こんなに何回も繰り返す必要ないはずだろ。いい加減にしてくれ。',
            '次は書面にしてみたら？少なくともまたやらかした時の証拠にはなるし。',
        ],
        context: 'talking to walls は「壁に話している」。do the exact opposite は「正反対のことをする」。repeat myself は「同じことを繰り返す」。ridiculous は「ばかげている」。何度言っても通じないストレスは万国共通。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: '頭にきた',
        english: [
            'I am so mad.',
            'I am absolutely furious right now.',
            'I am trying really hard to stay calm but I am losing my patience.',
            "Yeah, go take a walk. Seriously. I'll cover for you. Just cool off before you do something you'll regret.",
        ],
        jaTranslations: [
            'マジで頭にきた。',
            '今ほんとにブチギレそう。',
            '冷静でいようとしてるけど、もう限界が近い。',
            'わかる、ちょっと散歩してこい。マジで。俺がカバーしとくから。後悔する前に頭冷やせ。',
        ],
        context: 'blood pressure going through the roof は「血圧が急上昇」。say something I am going to regret は「後悔するようなことを言う」。angry and polite at the same time は日本のビジネス文化そのもの。英語でも職場では怒りをコントロールする。',
        character: 'takeshi', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: '英語で怒ると伝わりすぎる',
        english: [
            'Anger hits different in English.',
            'When I get angry in English, it comes out way too strong.',
            'Japanese has so many levels of anger but English is either calm or furious. There is no in-between.',
            "Ha, I know what you mean. I once tried to say I was 'a little annoyed' and my coworker thought I was about to quit.",
        ],
        jaTranslations: [
            '英語で怒ると伝わりすぎる。',
            '英語で怒ると強く出すぎちゃう。',
            '日本語は怒りのレベルがいっぱいあるけど、英語は冷静かブチギレかの二択。中間がない。',
            'あー、わかるわ。「ちょっとイラッとした」って言ったら同僚に辞めるのかと思われたことある。',
        ],
        context: 'modulate は「調節する」。nuclear は「核爆発」レベルの怒り。flip a table は「テーブルをひっくり返す」。in-between は「中間」。日本語の怒りのグラデーション（ちょっとムカつく→まじでキレそう）は英語だと表現しにくい。語彙の問題。',
        character: 'yuki', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: '落ち着いて、まず深呼吸して',
        english: [
            'Calm down.',
            'Hey, take a breath. Let us think about this calmly.',
            'I know you are upset but getting angry is not going to solve this. Let us take a step back.',
            "Yeah, okay. You're right. If I send that email now I'll definitely regret it. Five minutes. I'll be back.",
        ],
        jaTranslations: [
            '落ち着いて。',
            'ちょっと深呼吸して。冷静に考えよう。',
            '怒ってるのはわかるけど、怒っても解決しない。一歩引いて考えよう。',
            'うん、そうだな。今あのメール送ったら絶対後悔する。5分だけ。すぐ戻る。',
        ],
        context: 'fight mode は「戦闘モード」。cringe は「思い出して恥ずかしくなる」。clear head は「冷静な頭」。walk around the block は「その辺を一周歩く」。calm down は実は相手をもっと怒らせる危険な言葉。let us take a step back の方がいい。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: 'もう我慢の限界だ',
        english: [
            'I have had enough.',
            'That is the last straw. I am done.',
            'I have been patient long enough. This is where I draw the line.',
            "I can tell you mean it this time. What are you thinking? Want me to back you up in the meeting?",
        ],
        jaTranslations: [
            'もう我慢の限界だ。',
            'もう堪忍袋の緒が切れた。もう終わりだ。',
            'ずっと我慢してきた。ここで線を引く。',
            '今回は本気なの伝わる。どうするつもり？ミーティングで援護しようか？',
        ],
        context: 'the last straw は「最後の藁」で限界突破のことわざ。draw the line は「一線を引く」。chance after chance は「何度もチャンスを与えた」。enough is enough は「もう十分だ」。我慢の限界の英語表現は力強い。',
        character: 'kenji', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: '怒ってるんじゃなくて呆れてるんだ',
        english: [
            'I am not angry. I am disappointed.',
            'I am past angry. I am just disappointed now.',
            'I am not even mad anymore. I am just exhausted from dealing with this over and over.',
            "Wow, that hit me hard. When you put it that way, disappointed really is scarier than angry.",
        ],
        jaTranslations: [
            '怒ってるんじゃない。呆れてるんだ。',
            '怒りを通り越して、もう呆れてる。',
            'もう怒ってすらいない。同じことの繰り返しに疲れただけ。',
            'うわ、それ刺さるわ。そう言われると、呆れの方が怒りより怖いな。',
        ],
        context: 'I am not angry, I am disappointed は親が子供に言う最恐フレーズとしても有名。past angry は「怒りを通り越した」。given up は「諦めた」。slamming doors は「ドアをバタンと閉める」。英語では disappointed > angry。',
        character: 'master', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: 'あとで冷静に話そう',
        english: [
            'Let us talk later when we have calmed down.',
            'We should probably table this until we have both cooled off.',
            'I think we should revisit this conversation when we are both in a better headspace.',
            "Yeah, that's probably smart. I don't trust myself to say anything useful right now. Let's talk tomorrow.",
        ],
        jaTranslations: [
            '落ち着いてから話そう。',
            'お互い冷静になったら話そう。',
            'お互いもうちょっと落ち着いた状態で話し直した方がいいと思う。',
            'うん、それが賢いわ。今の自分、まともなこと言える自信ない。明日話そう。',
        ],
        context: 'table this は「この話を保留する」。cooled off は「頭を冷やした」。headspace は「精神状態」。sleep on it は「一晩寝て考える」。unsay は「言ったことを取り消す」（実際にはできない）。冷静になるための大人の表現。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: '怒りの原因をちゃんと伝えないと',
        english: [
            'You need to explain why you are angry.',
            'Just being angry is not enough. You have to say what made you angry.',
            'If you do not explain the reason behind your anger, nothing will change.',
            "That's actually great advice. Instead of just being mad, I should say exactly what went wrong. Got it.",
        ],
        jaTranslations: [
            '怒りの原因をちゃんと伝えないと。',
            'ただ怒るだけじゃダメ。何に怒ってるか言わないと。',
            '怒りの理由を説明しないと、何も変わらないよ。',
            'それめっちゃいいアドバイスだな。ただキレるんじゃなくて、何がダメだったか具体的に言えばいいのか。了解。',
        ],
        context: 'spell it out は「はっきり言う」。dismiss は「受け流す」。specific は「具体的な」。vague は「曖昧な」。英語で怒る時は「なぜ怒っているか」を構造的に伝える。日本語みたいに空気で察してもらうのは無理。',
        character: 'lisa', category: 'feeling', month: '2026-06',
    },
    {
        daySlot: 81, japanese: '怒りも大事な感情だよ',
        english: [
            'Anger is a valid emotion.',
            'Being angry does not make you a bad person.',
            'Anger tells you something is wrong. It is what you do with it that matters.',
            "Respond, not react. I'm gonna write that down. That's the kind of thing I need to hear when I'm heated.",
        ],
        jaTranslations: [
            '怒りも大事な感情だよ。',
            '怒ること自体は悪いことじゃない。',
            '怒りは「何かがおかしい」って教えてくれてる。大事なのはその後どうするかだ。',
            '反応じゃなくて応答しろ、か。メモしとく。カッとなった時にこそ聞きたい言葉だ。',
        ],
        context: 'valid emotion は「正当な感情」。boundary は「境界線」。react vs respond は英語圏の重要な概念。react は「反射的に反応する」、respond は「考えてから返す」。ゴンドーの哲学。怒りを否定せず、コントロールする知恵。',
        character: 'master', category: 'feeling', month: '2026-06',
    },

];

// ============================================================
// WEEK 11 DAY THEMES
// ============================================================

export const MONTH3_W11_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    75: {
        title: '感謝の表現', titleEn: 'Saying Thank You', category: 'feeling',
        scene: '「ありがとう」のバリエーション。Thank youだけじゃない',
        keywords: [
            { en: 'grateful', ja: '感謝している', pron: 'グレイトフル', example: 'I am so grateful for your help.', note: 'thankful とほぼ同義だけど grateful の方がフォーマルで深い感謝。grateful は「恩を感じている」のニュアンス。' },
            { en: 'appreciate', ja: '感謝する・ありがたく思う', pron: 'アプリーシエイト', example: 'I really appreciate it.', note: 'thank you の大人版。ビジネスでは appreciate が圧倒的に多い。I appreciate you は「あなたの存在に感謝」で最上級。' },
            { en: 'go out of your way', ja: 'わざわざ〜する', pron: 'ゴーアウトオブユアウェイ', example: 'You went out of your way to help me.', note: '直訳は「自分の道から外れる」。つまり「本来やらなくてもいいことをわざわざやる」。日本語の「わざわざ」にぴったり。' },
            { en: 'make my day', ja: '一日を幸せにする', pron: 'メイクマイデイ', example: 'That comment really made my day.', note: '小さい親切で一日が明るくなる。made my week（一週間幸せ）、made my year（一年分の幸せ）とスケールアップもできる。' },
            { en: 'it means a lot', ja: 'とても嬉しい・重みがある', pron: 'イットミーンズアロット', example: 'Your support means a lot to me.', note: 'mean は「意味する」だけど、it means a lot は「大きな意味がある」で感謝と感動を伝える。thank you より感情が乗る。' },
        ],
    },
    76: {
        title: '謝り方', titleEn: 'Apologizing', category: 'feeling',
        scene: 'Sorry の使いすぎ問題。リサが「日本人謝りすぎ」と指摘',
        keywords: [
            { en: 'apologize', ja: '謝る・謝罪する', pron: 'アポロジャイズ', example: 'I want to sincerely apologize.', note: 'sorry より格上の謝罪。ビジネスメールでは I apologize が基本。sorry は口語、apologize は書き言葉寄り。' },
            { en: 'my fault', ja: '自分のせい', pron: 'マイフォールト', example: 'That was completely my fault.', note: 'fault は「過失」。my bad はカジュアル版。it was my fault は責任を明確にする表現で、英語の謝罪の核。' },
            { en: 'make it up to you', ja: '埋め合わせする', pron: 'メイキットアップトゥーユー', example: 'Let me make it up to you.', note: 'make up は「埋め合わせ」。言葉だけの謝罪じゃなく「行動で示す」宣言。日本語の「お詫びします」より具体的。' },
            { en: 'forgive', ja: '許す', pron: 'フォーギブ', example: 'Can you forgive me?', note: 'forgive は「許す」、forget は「忘れる」。forgive and forget は「水に流す」。でも実際は forgive はできても forget は難しい。' },
            { en: 'out of line', ja: '言い過ぎた・やりすぎた', pron: 'アウトオブライン', example: 'What I said was out of line.', note: '直訳は「線を越えた」。社会的な一線を踏み越えた時に使う。I was out of line は自分の非を認める強い表現。' },
        ],
    },
    77: {
        title: '励ます', titleEn: 'Encouraging Others', category: 'feeling',
        scene: 'タケシがプレゼン前に緊張するユキを英語で励まそうとする',
        keywords: [
            { en: 'nail it', ja: 'バッチリ決める', pron: 'ネイリット', example: 'You are going to nail it.', note: '釘を打つ→的を射る→完璧にやる。kill it、crush it、ace it も同義。スラングだけど仕事でも普通に使う。' },
            { en: 'believe in yourself', ja: '自分を信じて', pron: 'ビリーヴインユアセルフ', example: 'You just need to believe in yourself.', note: 'believe は「信じる」。believe in は「〜の可能性を信じる」。I believe you は「あなたの言葉を信じる」で意味が違う。' },
            { en: 'rooting for you', ja: '応援してる', pron: 'ルーティングフォーユー', example: 'We are all rooting for you.', note: 'root は「応援する」。スポーツの応援が語源。I support you は硬すぎるので、カジュアルなら rooting for you が最適。' },
            { en: 'I have got your back', ja: '俺がついてる', pron: 'アイブガッチュアバック', example: 'Do not worry. I have got your back.', note: '直訳は「あなたの背中をカバーしてる」。戦場の仲間意識が語源。友情・信頼の最強表現。' },
            { en: 'perspective', ja: '視点・物の見方', pron: 'パースペクティヴ', example: 'Let me put this in perspective.', note: 'put in perspective は「客観的に見る」。keep things in perspective は「冷静に考える」。英語圏の人がよく使う概念。' },
        ],
    },
    78: {
        title: '断り方', titleEn: 'Saying No Politely', category: 'request',
        scene: '日本語の曖昧な断りを英語でどう表現するか',
        keywords: [
            { en: 'rain check', ja: 'また今度', pron: 'レインチェック', example: 'Can I take a rain check?', note: '雨で中止になった野球の振替チケットが語源。「今回は無理だけど次回は行く」の意思表示。カジュアルで便利。' },
            { en: 'pass', ja: '遠慮する・パスする', pron: 'パス', example: 'I think I will pass this time.', note: '日本語の「パスする」と同じ感覚。I will pass は柔らかい断り。hard pass は「絶対無理」の強い断り。' },
            { en: 'decline', ja: '辞退する・断る', pron: 'ディクライン', example: 'I have to respectfully decline.', note: 'refuse より丁寧な断り。ビジネスでは decline を使う。politely decline、respectfully decline とセットで使うことが多い。' },
            { en: 'bandwidth', ja: '余裕・キャパシティ', pron: 'バンドウィズ', example: 'I do not have the bandwidth right now.', note: 'IT用語の「通信帯域」から転用。仕事の処理能力・余裕を指す。最近のビジネス英語で超頻出。capacity より今っぽい。' },
            { en: 'I cannot make it', ja: '行けない・都合がつかない', pron: 'アイキャントメイキット', example: 'Sorry, I cannot make it tomorrow.', note: '予定・イベントに行けない時の万能フレーズ。理由を言わなくても失礼じゃない。I will not be able to make it はより丁寧版。' },
        ],
    },
    79: {
        title: '愚痴を言う', titleEn: 'Complaining', category: 'feeling',
        scene: '居酒屋で仕事の愚痴大会。英語で愚痴る練習',
        keywords: [
            { en: 'vent', ja: '愚痴を吐き出す', pron: 'ヴェント', example: 'I just need to vent for a minute.', note: 'vent は「換気口」が語源。感情を外に出す。complain は「不満を言う」、vent は「溜まったものを吐き出す」のニュアンス。' },
            { en: 'fed up', ja: 'うんざり', pron: 'フェダップ', example: 'I am fed up with this situation.', note: 'feed の過去分詞+up。「もう食べさせられすぎて吐きそう」が語源。I am sick of も同義だけど fed up の方がフラストレーション感が強い。' },
            { en: 'to top it all off', ja: 'さらに追い打ちで', pron: 'トゥートッピットオールオフ', example: 'And to top it all off, it started raining.', note: '「全部の上にさらに乗せる」で、悪いことの連鎖の最後に使う。on top of that も似た意味。愚痴のクライマックスに使う表現。' },
            { en: 'driving me crazy', ja: '頭がおかしくなりそう', pron: 'ドライヴィングミークレイジー', example: 'This noise is driving me crazy.', note: 'drive は「追いやる」。drive me nuts、drive me insane も同義。受動態ではなく「何かが自分をcrazy に追いやる」構造。原因+is driving me crazy。' },
            { en: 'the worst', ja: '最悪', pron: 'ザワースト', example: 'Mondays are the worst.', note: '英語で「最悪」を言う時の定番。the absolute worst で強調。日本語の「最悪」ほど重くなく、カジュアルな愚痴で気軽に使える。' },
        ],
    },
    80: {
        title: '共感する', titleEn: 'Showing Sympathy', category: 'feeling',
        scene: 'ミナが「英語で共感するフレーズが全然出てこない」と悩む',
        keywords: [
            { en: 'I have been there', ja: 'その経験あるよ', pron: 'アイブビーンゼア', example: 'Trust me, I have been there.', note: '直訳は「そこにいたことがある」。同じ痛みを経験した人だけが言える最強の共感。been through that も同義。' },
            { en: 'that sounds rough', ja: '大変そうだね', pron: 'ザットサウンズラフ', example: 'That sounds really rough.', note: 'sounds tough、sounds hard も使える。sounds は「聞いた感じ」で、直接経験していないけど共感する時に使う。is tough だと断定になる。' },
            { en: 'open up', ja: '心を開く・打ち明ける', pron: 'オープンアップ', example: 'Thank you for opening up to me.', note: 'open up は物理的に「開ける」から心理的に「打ち明ける」に派生。hard to open up は「心を開くのが難しい」。' },
            { en: 'bottled up', ja: '溜め込んでいる', pron: 'ボトルドアップ', example: 'You have been keeping everything bottled up.', note: '瓶に詰め込む→感情を溜め込む。bottled up emotions は「抑圧された感情」。keep it bottled up は日本人がやりがちなこと。' },
            { en: 'it is okay to not be okay', ja: '大丈夫じゃなくても大丈夫', pron: 'イッツオーケートゥーノットビーオーケー', example: 'Remember, it is okay to not be okay.', note: 'メンタルヘルスの意識向上で広まったフレーズ。常に強くある必要はないというメッセージ。日本語にはなかった概念が英語から逆輸入されている。' },
        ],
    },
    81: {
        title: '怒りの表現', titleEn: 'Expressing Anger', category: 'feeling',
        scene: 'ケンジが現場でトラブル。怒りを英語で伝える難しさ',
        keywords: [
            { en: 'furious', ja: '激怒している', pron: 'フュリアス', example: 'I am absolutely furious right now.', note: 'angry < mad < furious < livid。furious は怒りレベル高め。livid は「顔が青白くなるほどの怒り」で最上級。' },
            { en: 'the last straw', ja: '限界・最後の一線', pron: 'ザラストストロー', example: 'That was the last straw for me.', note: '「ラクダの背を折る最後の藁」が語源。小さなことの積み重ねで限界に達する。the straw that broke the camel\'s back が完全版。' },
            { en: 'cross the line', ja: '一線を越える', pron: 'クロスザライン', example: 'You really crossed the line this time.', note: 'draw the line は「一線を引く」、cross the line は「その線を越える」。boundary（境界線）を侵す行為。怒りの正当性を主張する時に使う。' },
            { en: 'react vs respond', ja: '反射 vs 対応', pron: 'リアクトvsリスポンド', example: 'Do not react. Respond.', note: 'react は「反射的に反応」、respond は「考えて返答」。怒りの場面で react するとトラブルが大きくなる。respond する余裕が大人の対応。' },
            { en: 'sleep on it', ja: '一晩寝て考える', pron: 'スリープオンイット', example: 'Let us sleep on it before making a decision.', note: '直訳は「その上で寝る」。怒りや重要な決断を急がずに一晩置く。ビジネスでもプライベートでも使える冷静さの表現。' },
        ],
    },
};
