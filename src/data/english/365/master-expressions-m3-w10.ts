/**
 * 365 English Master -- Month 3 Week 10: 人間関係の英語 (Talking About People)
 * Days 68-74: 70 expressions
 * Month: June 2026
 *
 * Characters: Gondo(58M), Yuki(28F), Takeshi(35M), Lisa(32F), Kenji(45M), Mina(24F)
 */

import type { MasterExpression, KeyWord } from './master-expressions';

// ============================================================
// EXPRESSIONS -- MONTH 3 (2026-06) -- WEEK 10
// ============================================================

export const MONTH3_W10_EXPRESSIONS: MasterExpression[] = [

    // ────────────────────────────────────────────────────
    // DAY 68: 上司と部下 (Boss and Subordinate)
    // Scene: ユキの新しい外国人上司が厳しい。英語で報告する苦労
    // ────────────────────────────────────────────────────

    {
        daySlot: 68, japanese: '進捗を報告します',
        english: [
            'Here is my update.',
            'I wanted to give you a quick update on the project.',
            'I wanted to update you on where we are with the project right now.',
            'Say no more! Let\'s make it happen.',
        ],
        context: '英語の報告は結論ファースト。「先に結論、後から経緯」が鉄則。日本語の「経緯→結論」の順番で話すと英語圏の上司は途中でイライラする。flag は「旗を立てる」→「注意を引く」。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: '締め切りに間に合いません',
        english: [
            'I cannot make the deadline.',
            'I do not think I can meet the deadline.',
            'I am afraid I will not be able to meet the Friday deadline.',
            'When\'s the deadline? We can figure this out.',
        ],
        context: 'be upfront は「率直に言う」。日本語では「すみません、ちょっと厳しくて...」と濁すけど、英語では早めに具体的に言うのがプロ。set me back は「遅れさせた」。言い訳より代替案を出すのが英語圏の作法。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: '上司に相談したいことがあります',
        english: [
            'Can I talk to you?',
            'Do you have a minute? I need to run something by you.',
            'When you get a chance, I would love to run something by you.',
            'Yikes. That\'s tough. What did you say?',
        ],
        context: 'run something by you は「あなたに確認を取る」の定番。日本語の「ご相談」はconsultだと堅すぎる。get your input は「意見をもらう」。go in the wrong direction は「間違った方向に進む」で、日本人が陥りがちな「一人で抱え込む」を防ぐ表現。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: '指示が曖昧でわからない',
        english: [
            'I am not sure what you mean.',
            'Could you clarify what you are looking for?',
            'Sorry, I want to make sure I understand. Could you walk me through that again?',
            'No worries! Let me break it down for you.',
        ],
        context: 'on the same page は「認識が合っている」。日本語なら「えーと、つまり...」と自分で解釈しようとするけど、英語では聞き返すのが当たり前。むしろ聞き返さないと「わかったフリ」と思われる。walk me through は「順を追って説明して」。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: '承知しました、すぐ取りかかります',
        english: [
            'Got it. I am on it.',
            'Understood. I will get right on it.',
            'Got it. I will get started on that right away and have it to you by end of day.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'I am on it は「今すぐやります」の最強フレーズ。on my plate は「抱えている仕事」。shoot you a message は「メッセージを送る」のカジュアル版。日本語の「承知しました」はUnderstoodだけど、そのあとに具体的アクションを言うのが英語流。',
        character: 'mina', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: '上司って英語で何て言うの？',
        english: [
            'What is the word for boss?',
            'How do you say your boss in English? Like manager?',
            'In English, do you call your boss by their first name or their title?',
            'Your English is great! Keep it up.',
        ],
        context: 'これは文化の壁。日本語は役職名で呼ぶけど英語はファーストネームが基本。boss は使うけど面と向かって「Boss」とは呼ばない。supervisor, manager, director は役職。sir/ma\'am は超フォーマルか軍隊。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: 'フィードバックをもらえますか',
        english: [
            'Can I get feedback?',
            'Could I get your feedback on this?',
            'Would you mind taking a look at this and letting me know what you think?',
            'Hmm, good question. What do you think?',
        ],
        context: 'a second pair of eyes は「別の人にチェックしてもらう」の比喩。フィードバックを求めるとき No rush と添えるのがコツ。日本語の「お忙しいところ恐れ入りますが」に近い機能。skim は「ざっと目を通す」。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: '昔の上司は最悪だった',
        english: [
            'My old boss was terrible.',
            'My previous boss was a nightmare to work for.',
            'I had the worst boss at my last job. Absolute nightmare.',
            'Yikes. That\'s tough. What did you say?',
        ],
        context: 'micromanage は「細かく管理しすぎる」。英語圏では最も嫌われる上司の特徴。internal memo は「社内メモ」。nightmare は「悪夢」→「最悪な人・状況」。quit は「辞める」でresignより口語的。',
        character: 'lisa', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: '評価面談が緊張する',
        english: [
            'Performance reviews make me nervous.',
            'I always get nervous before my performance review.',
            'My annual review is next week and I am already stressed about it.',
            'Deep breaths! You\'ve got this.',
        ],
        context: 'performance review は「人事評価面談」。self-evaluation は「自己評価」。英語圏は自分の成果をアピールするのが当然。日本人の謙遜は「自信がない」と誤解される。sell yourself は「自分を売り込む」。dreading は「すごく嫌がっている」。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 68, japanese: '部下の育て方がわからん',
        english: [
            'I do not know how to manage people.',
            'Managing younger employees is harder than the actual work.',
            'I became a manager but nobody taught me how to actually manage people.',
            'Oh wow, good to know!',
        ],
        context: 'throw you in は「放り込む」。shut down は「心を閉ざす」。the younger generation の扱いに悩むのは万国共通。promoted to は「〜に昇進した」。give feedback the wrong way は「間違った伝え方でフィードバックする」。上司の愚痴は万国共通の居酒屋トーク。',
        character: 'master', category: 'request', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 69: 同僚との会話 (Coworker Small Talk)
    // Scene: タケシのIT会社でランチ中の英語雑談が地獄
    // ────────────────────────────────────────────────────

    {
        daySlot: 69, japanese: '週末どうだった？',
        english: [
            'How was your weekend?',
            'Hey, how was your weekend? Do anything fun?',
            'So how was your weekend? Did you get up to anything good?',
            'Sounds good! I\'m in.',
        ],
        context: 'How was your weekend? は月曜日の挨拶の鉄板。日本語の「お疲れ様です」みたいなもの。get up to は「何かをする」のカジュアル表現。答えは Not much が安全牌。detailed に答えすぎると引かれる。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: 'ランチ一緒にどう？',
        english: [
            'Want to grab lunch?',
            'Hey, want to grab lunch together?',
            'I am about to head out for lunch. Want to come with?',
            'I\'m so hungry. Let\'s order right away.',
        ],
        context: 'grab lunch は「ランチを食べる」の最も自然な言い方。grab は「つかむ」→「さっと食べる」。head out は「出かける」。up to you は「あなた次第」。want to come with? の最後の with で終わるのが口語的。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: '今日会議あったっけ？',
        english: [
            'Do we have a meeting today?',
            'Wait, do we have a meeting today? I forgot to check.',
            'Hey, is there a meeting this afternoon? I completely forgot to check my calendar.',
            'Ugh, those things always take forever.',
        ],
        context: 'blanked on it は「すっかり忘れた」。prep は prepare の略。sit there and nod は「座ってうなずくだけ」。the latter は「後者」。日本の会議は「座ってうなずく」でも生存できるけど、英語の会議は発言しないと存在しないのと同じ。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: '最近残業多くない？',
        english: [
            'You have been working late.',
            'Have you been working overtime a lot lately?',
            'I feel like you have been staying late every day this week. Are you okay?',
            'Again? You gotta take care of yourself too.',
        ],
        context: 'overtime は「残業」。stay late は「遅くまで残る」。set boundaries は「境界線を引く」で、英語圏では超重要な概念。learned the hard way は「痛い目にあって学んだ」。日本の「付き合い残業」は英語圏では理解されない。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: '職場の人間関係めんどくさい',
        english: [
            'Office politics is exhausting.',
            'I am so tired of office drama.',
            'The politics at my office are driving me crazy. I just want to do my job.',
            'Tell me about it! But you get used to it.',
        ],
        context: 'office politics は「社内政治」。stuck in the middle は「板挟み」。pick a team は「どちらかの側につく」。The people part is what kills me は名言級。仕事そのものより人間関係のほうが大変、は万国共通の真理。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: 'あの人ちょっと苦手',
        english: [
            'I do not really like that person.',
            'That person is kind of hard to deal with.',
            'I am not great with that person. We just do not click.',
            'Right? I was just thinking that.',
        ],
        context: 'click は「カチッとはまる」→「相性が合う」。do not click は「なんかしっくりこない」の完璧な訳。forced は「無理している感じ」。日本語の「苦手」は英語に直訳できない。hard to deal with, not my type, I am not great with くらいが近い。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: '英語の雑談が一番むずい',
        english: [
            'Small talk in English is the hardest part.',
            'Making small talk in English is way harder than actual work.',
            'Honestly, the hardest part of working with foreigners is not the work. It is the small talk.',
            'Your English is great! Keep it up.',
        ],
        context: 'small talk は「雑談」。英語学習者が最も苦しむスキル。TOEICで高得点取れても雑談ができない人は多い。技術用語は覚えられるけど、天気の冗談が言えない。これがリアルな英語の壁。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: '転職考えてるんだよね',
        english: [
            'I am thinking about changing jobs.',
            'I have been thinking about looking for a new job.',
            'Between you and me, I have been looking at other opportunities.',
            'Oh wow! What\'s the new job?',
        ],
        context: 'between you and me は「ここだけの話」。looking around は「他を探している」の柔らかい言い方。recruiter は「ヘッドハンター」。if the right opportunity comes along は「いい話が来たら」。英語圏では転職はポジティブ。日本ほどネガティブじゃない。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: '新しい人、感じいいよね',
        english: [
            'The new person seems nice.',
            'The new hire seems pretty cool.',
            'Have you met the new person yet? They seem really easy to get along with.',
            'Oh wow, you\'re right! Good eye.',
        ],
        context: 'new hire は「新入社員」。easy to get along with は「付き合いやすい」。fit in は「馴染む」。they を単数で使うのは性別不明のとき。him or her より they のほうが今の英語では自然で政治的にも正しい。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 69, japanese: '飲み会行く？',
        english: [
            'Are you going to the party?',
            'Hey, are you going to the after-work drinks?',
            'A bunch of us are going out for drinks after work. You coming?',
            'Count me in! What are we having?',
        ],
        context: 'after-work drinks は「仕事後の飲み」。nothing fancy は「大したことない、カジュアルに」。show up は「来る・現れる」。catch the last train は「終電に乗る」。英語圏の飲み会は日本ほど義務感がない。断っても全然OK。',
        character: 'kenji', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 70: 会議で発言 (Speaking Up in Meetings)
    // Scene: ユキが英語の会議で一言も言えなかった日の愚痴
    // ────────────────────────────────────────────────────

    {
        daySlot: 70, japanese: '会議で何も言えなかった',
        english: [
            'I could not say anything in the meeting.',
            'I sat through the whole meeting without saying a single word.',
            'I was in a meeting for an hour today and I did not say a single thing. Not one word.',
            'Ugh, those things always take forever.',
        ],
        context: 'moved on は「話題が先に進んだ」。jumping in は「割り込んで発言する」。英語の会議は待っていても誰も振ってくれない。自分から入らないと存在しないのと同じ。日本語の会議は「振られてから答える」文化だから、この差が致命的。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: '一言いいですか？',
        english: [
            'Can I say something?',
            'Sorry, can I jump in here real quick?',
            'If I could just jump in for a second, I have a thought on that.',
            'You know what, you\'re absolutely right.',
        ],
        context: 'jump in は英語会議の生命線。「ちょっといいですか」の最も自然な言い方。Can I add something? でもOK。Does that make sense? は「わかります？」の確認。英語は「まず割り込む→それから話す」の順番。割り込みを遠慮したら永遠に発言できない。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: '賛成です',
        english: [
            'I agree.',
            'I totally agree with that.',
            'I am with you on that. I think that is the right approach.',
            'I\'m with you on that. One hundred percent.',
        ],
        context: 'I am with you on that は「その件、同意です」。I am on board は「賛成、参加する」。英語の会議で I agree だけで終わると薄い。理由を付け加えるのが大事。The data backs it up は「データが裏付けている」。',
        character: 'lisa', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: 'ちょっと違うと思います',
        english: [
            'I see it differently.',
            'I am not sure I agree with that.',
            'I see your point, but I think there might be another way to look at it.',
            'Oh wait, my bad. What do you mean?',
        ],
        context: 'I hear what you are saying は「言いたいことはわかる」で反論の前置き。いきなり I disagree は攻撃的すぎる。英語でも反論にはクッションが必要。down the line は「将来的に」。commit to は「決定する」。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: '話を整理させてください',
        english: [
            'Let me summarize.',
            'Can I just make sure I am following this correctly?',
            'Hold on, can we take a step back and make sure we are all on the same page?',
            'Oh yeah, that makes a lot of sense.',
        ],
        context: 'take a step back は「一歩引いて整理する」。on the same page は「認識を合わせる」。going back and forth は「行ったり来たりする」。英語の会議が理解できなくなったら、恥ずかしがらずにこれを言うべき。整理する人は実は会議で一番役に立つ。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: '次のステップは何ですか？',
        english: [
            'What is the next step?',
            'So what are the next steps?',
            'Before we wrap up, can we go over the next steps and who is responsible for what?',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'action items は「やるべきこと」。wrap up は「締めくくる」。follow-up meeting は「フォローアップ会議」。英語の会議は最後に必ず next steps を確認する。日本語の会議みたいに「じゃあ、そういう方向で」で終わらない。',
        character: 'lisa', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: 'すみません、聞き取れませんでした',
        english: [
            'Sorry, I did not catch that.',
            'I am sorry, could you repeat that? I missed the last part.',
            'Sorry, I did not quite catch what you just said. Could you say that one more time?',
            'Don\'t worry about it! Seriously.',
        ],
        context: 'I did not catch that は「聞き取れなかった」の定番。could you repeat that は聞き返しの基本。connection issues は「回線の問題」でオンライン会議の言い訳に使える。holding things up は「進行を止めてしまう」。聞き返すのは恥ずかしいことではない。ネイティブ同士でもしょっちゅう聞き返す。',
        character: 'mina', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: '発言のタイミングがわからない',
        english: [
            'I never know when to speak up.',
            'I can never find the right moment to jump in.',
            'The conversation moves so fast that I cannot find an opening to say anything.',
            'No worries! Let me break it down for you.',
        ],
        context: 'talk over each other は「かぶって話す」。wait your turn は「順番を待つ」。goes against は「〜に反する」。これが日本人が英語会議で黙ってしまう最大の理由。英語の「割り込み」は失礼じゃなくて参加の証拠。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: '会議の英語と雑談の英語は全然違う',
        english: [
            'Meetings and casual English are totally different.',
            'Meeting English and everyday English feel like two different languages.',
            'I can handle casual English just fine but the second a meeting starts, my brain freezes.',
            'Your English is great! Keep it up.',
        ],
        context: 'a switch flips は「スイッチが切り替わる」。brain freezes / shuts off は「頭が真っ白になる」。judging は「ジャッジしている」。実はネイティブも会議は嫌い。日本人だけの問題じゃない。でも英語の壁が加わると地獄度が倍増する。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 70, japanese: '議事録を英語で書くのが苦痛',
        english: [
            'Writing meeting notes in English is painful.',
            'I hate writing minutes in English. It takes forever.',
            'They asked me to take the meeting minutes in English and it took me three hours.',
            'Your English is great! Keep it up.',
        ],
        context: 'take the minutes は「議事録を取る」。minutes は「分」ではなく「議事録」。この二重の意味を知らない日本人は多い。I need a raise は「給料上げてほしい」。catch everything は「全部聞き取る」。proper business English は「ちゃんとしたビジネス英語」。',
        character: 'yuki', category: 'request', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 71: メールの英語 (Email English)
    // Scene: 「お疲れ様です」が英語にならない問題でみんな盛り上がる
    // ────────────────────────────────────────────────────

    {
        daySlot: 71, japanese: 'お疲れ様ですって英語で何？',
        english: [
            'There is no English for otsukaresama.',
            'How do you translate otsukaresama?',
            'Seriously, what is the English equivalent of otsukaresama desu? There is none.',
            'Your English is great! Keep it up.',
        ],
        context: '「お疲れ様です」は英語に訳せない日本語の代表格。メールの書き出しは Hi + 名前 でOK。英語には「仕事仲間の労をねぎらう挨拶」という概念自体がない。Great job today! は褒めているので違う。日本語の独自概念であることを認めるのが第一歩。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: 'メールの書き出しがわからない',
        english: [
            'I do not know how to start the email.',
            'I always get stuck on the opening of English emails.',
            'I spend more time on the first line of an English email than the entire body.',
            'No worries! Let me break it down for you.',
        ],
        context: 'I hope this email finds you well は定番だけど確かに不自然。カジュアルなら Hi + 名前だけで十分。Dear は初めてのメールかフォーマルな相手。Hope you are doing well くらいならまだ自然。いつもお世話になっております = Thank you for your continued support（でもほぼ使わない）。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: 'ご確認お願いします',
        english: [
            'Please check this.',
            'Could you take a look at this when you get a chance?',
            'I have attached the updated report. Could you review it when you have a moment?',
            'Leave it to me! Consider it done.',
        ],
        context: 'please check は実は少しぶっきらぼう。could you take a look は柔らかい。when you get a chance は「お時間あるときに」。No rush は魔法のクッション。英語メールは please を入れればOKと思いがちだけど、Could you / Would you mind のほうが丁寧。',
        character: 'mina', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: '返信が遅れてすみません',
        english: [
            'Sorry for the late reply.',
            'Apologies for the delayed response.',
            'I am sorry for the late reply. Things have been a bit hectic on my end.',
            'All good! We just sat down anyway.',
        ],
        context: 'got buried in my inbox は「受信トレイに埋もれた」。hectic は「バタバタしている」。on my end は「こちらの事情で」。英語メールで返信が遅れた理由を長々書く必要はない。短く謝って本題に入るのがベスト。日本語みたいに「大変失礼いたしました」の連発は逆効果。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: '添付ファイルを送ります',
        english: [
            'See the attachment.',
            'I have attached the file you requested.',
            'Please find attached the updated document. Let me know if you have any questions.',
            'Oh really? Tell me more!',
        ],
        context: 'please find attached は定番だけどやや堅い。I have attached のほうが自然。「添付します」を attached herewith と書く人がいるけど、古すぎて誰も使わない。respective は「それぞれの」。sending over は「送ります」のカジュアル版。',
        character: 'lisa', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: 'CCに入れておいてください',
        english: [
            'Please CC me.',
            'Could you CC me on that email?',
            'When you send that out, could you loop me in so I can stay in the loop?',
            'Oh wow, good to know!',
        ],
        context: 'CC = Carbon Copy。loop me in は「情報共有してね」。stay in the loop は「状況を把握し続ける」。BCC = Blind Carbon Copy（相手にわからないように送る）。日本語の「CCに入れる」はそのまま英語でも CC somebody で通じる。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: '英語メールに3時間かかった',
        english: [
            'It took three hours to write one email.',
            'I spent three hours writing a single email in English.',
            'I just spent three hours on one English email. In Japanese it would have taken five minutes.',
            'Your English is great! Keep it up.',
        ],
        context: 'second-guessing は「自分の判断を疑い続ける」。too casual vs too formal の永遠のジレンマ。実は英語メールはそこまで気にしなくていい。日本語のメールマナーのほうがはるかに厳しい。Hi + 名前 + 用件 + Thanks で90%のビジネスメールは事足りる。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: 'よろしくお願いしますって英語にならない',
        english: [
            'There is no English for yoroshiku.',
            'How do you say yoroshiku onegaishimasu in English?',
            'I hate that yoroshiku onegaishimasu does not have an English translation.',
            'Your English is great! Keep it up.',
        ],
        context: 'よろしくお願いします は文脈で全部変わる。初対面なら Nice to meet you、仕事の依頼なら Thank you, I appreciate it、メール締めなら Thanks か Best regards。1つの訳がないから混乱するけど、場面ごとに覚えるしかない。英語は万能フレーズがない言語。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: 'やんわり催促したい',
        english: [
            'I want to follow up gently.',
            'How do I remind them without sounding pushy?',
            'I need to send a follow-up email but I do not want to come across as impatient.',
            'Say no more! Let\'s make it happen.',
        ],
        context: 'just checking in は実際よく使う。gentle reminder は上から目線に聞こえることがある。per my last email は「前のメールで書いた通り」で怒りが滲む定番。following up on は最も無難。wanted to circle back on も使える。催促メールは世界共通で気まずい。',
        character: 'mina', category: 'request', month: '2026-06',
    },
    {
        daySlot: 71, japanese: 'メールの最後の挨拶どうしてる？',
        english: [
            'How do you end an email?',
            'What do you put at the end of an email? Best regards?',
            'I never know how to sign off. Is it Best, Regards, Thanks, or something else?',
            'Got it! I\'ll get back to you ASAP.',
        ],
        context: 'Best regards は安全牌。Thanks はカジュアルだけど一番多い。Cheers はイギリス・オーストラリアで使う。Sincerely は堅すぎて現代のメールにはほぼ使わない。結論：社内なら Thanks、社外なら Best regards で統一すれば間違いない。',
        character: 'kenji', category: 'request', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 72: 電話対応 (Phone English)
    // Scene: ケンジの現場に英語の電話がかかってきてパニック
    // ────────────────────────────────────────────────────

    {
        daySlot: 72, japanese: '英語の電話が来てパニックった',
        english: [
            'I panicked when an English call came in.',
            'I got an English phone call and completely froze.',
            'Someone called in English today and my brain just shut down.',
            'Your English is great! Keep it up.',
        ],
        context: 'froze は「固まった」。please hold は「お待ちください」の定番。英語の電話が一番怖い理由は、顔が見えない、ジェスチャーが使えない、聞き返しにくい、の三重苦。at full speed は「全速力で」。電話英語は別スキル。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: '少々お待ちください',
        english: [
            'One moment please.',
            'Could you hold on for just a second?',
            'I am going to put you on hold for just a moment while I check on that.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'hold on は「待って」のカジュアル版。put you on hold は「保留にする」。英語の電話で最も役立つフレーズ。Could you hold? だけでも通じる。look into は「調べる」。called you back は「折り返し電話する」。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: '担当者に代わります',
        english: [
            'Let me transfer you.',
            'I will transfer you to the right person.',
            'Let me connect you with someone who can help you with that.',
            'Of course! What do you need?',
        ],
        context: 'transfer you は「電話を転送する」。put the call through は「電話をつなぐ」。get disconnected は「電話が切れる」。direct number は「直通番号」。日本語の「担当の者に代わります」は英語だと transfer か connect で表現する。',
        character: 'lisa', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: 'もう一度ゆっくり言ってもらえますか',
        english: [
            'Could you say that again slowly?',
            'Sorry, could you speak a little more slowly?',
            'I apologize, but could you repeat that a bit more slowly? I want to make sure I get it right.',
            'Honestly, don\'t even worry about it. We\'re good.',
        ],
        context: 'catch everything は「全部聞き取る」。slowing down は「ゆっくり話す」。help me out は「助けてくれる」。「ゆっくり話して」と頼むのは全然失礼じゃない。ネイティブも電話では聞き返す。国際電話なら尚更。properly は「きちんと」。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: '折り返しお電話します',
        english: [
            'I will call you back.',
            'Can I call you back in about ten minutes?',
            'Let me look into that and get back to you. Is this a good number to reach you?',
            'Got it! I\'ll get back to you ASAP.',
        ],
        context: 'call you back は「折り返し電話する」。get back to you は「後で連絡する」。reach you は「あなたに連絡がつく」。in writing は「書面で」。英語の電話で困ったらとにかく call you back で時間を稼ぐ。これが最強の生存戦略。',
        character: 'mina', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: 'お名前のスペルを教えてください',
        english: [
            'How do you spell your name?',
            'Could you spell your name for me?',
            'I want to make sure I have the spelling right. Could you spell your last name for me?',
            'Sure! Ask me anything.',
        ],
        context: 'spell は「スペルを言う」。M as in Mike はフォネティックコード。電話で文字を確認するときの世界共通ルール。B and D, M and N は特に聞き間違えやすい。read it back は「復唱する」。電話でメモを取るときの必須スキル。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: '電話より メールのほうがありがたい',
        english: [
            'I prefer email.',
            'Could you email me instead? It is easier for me.',
            'Would you mind sending me that in an email? I want to have it in writing.',
            'Got it! I\'ll get back to you ASAP.',
        ],
        context: 'paper trail は「記録が残る」。refer back to は「後で参照する」。respond properly は「きちんと返答する」。電話が苦手な日本人の救世主フレーズ。could you email me instead は「メールにしてもらえます？」。実はネイティブも電話よりメール派は多い。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: '電話会議って対面より難しくない？',
        english: [
            'Conference calls are harder than face to face.',
            'Phone meetings are so much harder than in-person meetings.',
            'I think conference calls are ten times harder than meeting in person.',
            'Ugh, those things always take forever.',
        ],
        context: 'conference call は「電話会議」。body language は「ボディランゲージ」。wall of noise は「騒音の壁」。mute themselves は「ミュートにする」。quarterly targets は「四半期目標」。リモートワーク時代の電話会議あるあるは世界共通。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: '電話番号を聞き間違えた',
        english: [
            'I got the phone number wrong.',
            'I wrote the phone number down wrong.',
            'I thought I wrote the number down right but I called it and it was the wrong person.',
            'Got it! I\'ll get back to you ASAP.',
        ],
        context: 'wrote it down は「書き留めた」。mixed up は「混同した」。five と nine は英語の電話で最も聞き間違いやすいペア。他にも thirteen と thirty, fifteen と fifty の混同は有名。repeated it back は「復唱した」。数字の確認は必ず復唱するべき。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 72, japanese: '留守番電話にメッセージ入れて',
        english: [
            'Leave a voicemail.',
            'Just leave a message on their voicemail.',
            'If they do not pick up, just leave a voicemail with your name and number.',
            'Got it! I\'ll get back to you ASAP.',
        ],
        context: 'voicemail は「留守番電話」。pick up は「電話に出る」。replay は「再生する」。留守電のメッセージは名前→用件→電話番号の順で。英語の留守電が苦手な人は多いけど、テンプレを暗記すればOK。say your number twice は実用的なプロのコツ。',
        character: 'master', category: 'request', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 73: 褒め方 (Giving Compliments)
    // Scene: リサが「日本人は褒め方が下手」と言い出して議論に
    // ────────────────────────────────────────────────────

    {
        daySlot: 73, japanese: '日本人って褒めるの下手だよね',
        english: [
            'Japanese people are bad at giving compliments.',
            'I feel like Japanese people do not really know how to give compliments.',
            'Has anyone else noticed that Japanese people are really uncomfortable giving and receiving compliments?',
            'Yeah, totally! I was just thinking that.',
        ],
        context: 'currency は「通貨」→「やりとりの道具」。controversial は「物議を醸す」。この文化差は深い。英語で褒められたら Thank you が正解。日本語の「いやいや、そんなことないです」は英語では否定的に聞こえる。謙遜が失礼になる逆転現象。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: 'その服いいね',
        english: [
            'Nice outfit.',
            'I love that shirt. Where did you get it?',
            'That color looks really good on you. Is that new?',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'looks good on you は「あなたに似合う」の鉄板。skin tone は「肌の色合い」。shade は「色の濃淡」。英語で服を褒めるときは Where did you get it? とセットにすると自然。日本語だと「それどこの？」。褒めるだけで終わらず質問を添えるのが英語式。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: 'プレゼン上手だったよ',
        english: [
            'Your presentation was great.',
            'That was a really solid presentation. Nice job.',
            'I just wanted to say your presentation today was really impressive.',
            'Say no more! Let\'s make it happen.',
        ],
        context: 'delivery は「話し方・プレゼンの伝え方」。solid は「しっかりした」の褒め言葉。kept everyone\'s attention は「みんなの注意を引きつけた」。英語圏ではプレゼン後に具体的に何が良かったか伝える文化がある。just great だけだと薄い。',
        character: 'lisa', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: '褒められると照れる',
        english: [
            'I get embarrassed when people compliment me.',
            'I never know what to say when someone gives me a compliment.',
            'Every time someone compliments me I just freeze and mumble something awkward.',
            'Ha, that\'s so true! Love it.',
        ],
        context: 'mumble は「もごもご言う」。programmed into me は「プログラムされている」。deny は「否定する」。日本語の謙遜システムが英語では誤作動を起こす典型例。Thank you, that means a lot と言えたら上級者。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: '仕事速いね',
        english: [
            'You work fast.',
            'Wow, that was quick. You are efficient.',
            'I cannot believe you finished that already. You are incredibly efficient.',
            'I feel you. Work never stops, does it?',
        ],
        context: 'efficient は「効率的」で仕事の褒め言葉として最強クラス。gets things done は「やるべきことをやる人」。making a big deal は「大げさにする」。to-do list は「やることリスト」。仕事を褒めるときは具体的な行動を指すのが英語流。',
        character: 'takeshi', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: '英語上手ですねって言われるのが複雑',
        english: [
            'It is complicated when people say my English is good.',
            'I have mixed feelings when someone says your English is so good.',
            'Whenever someone says your English is amazing I do not know if it is a real compliment or not.',
            'Your English is great! Keep it up.',
        ],
        context: 'hot take は「物議を醸しそうな意見」。mixed feelings は「複雑な気持ち」。the bar was set low は「期待値が低かった」。これは実際に議論になるトピック。「英語上手ですね」はマイクロアグレッションになりうる。意図は良くても受け手は複雑。',
        character: 'yuki', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: '料理上手だね',
        english: [
            'You are a great cook.',
            'This is delicious. You are such a good cook.',
            'Seriously, this is amazing. Where did you learn to cook like this?',
            'You cook?! Okay, I\'m coming over next time.',
        ],
        context: 'from scratch は「ゼロから手作り」。bland は「味が薄い」。out of a restaurant は「レストランみたい」。I am not even kidding は「冗談じゃなくてマジ」。料理を褒めるときは具体的に何がおいしいか言うと喜ばれる。just delicious だけだと物足りない。',
        character: 'kenji', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: 'さすがだね',
        english: [
            'That is impressive.',
            'I knew you could do it. That is so you.',
            'See, I told you. You always come through when it matters.',
            'Let\'s do it! I\'m right behind you.',
        ],
        context: 'come through は「やり遂げる・期待に応える」。step up は「一歩踏み出す・立ち上がる」。make a fuss は「騒ぎ立てる」。「さすが」は英語にしにくい。That is so you は「あなたらしい」で近い。I knew it は「やっぱりね」。文脈で使い分ける。',
        character: 'master', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: 'センスいいよね',
        english: [
            'You have good taste.',
            'You always have such good taste in everything.',
            'I love your sense of style. You always put things together so well.',
            'Aw, that\'s sweet. You\'re the best.',
        ],
        context: 'impeccable taste は「非の打ちどころのないセンス」。put together は「きちんとまとまっている」。on rotation は「ローテーションで」。stepped out of は「〜から出てきたよう」。sense は「感覚」で、日本語の「センス」とほぼ同じ意味で使える珍しいケース。',
        character: 'mina', category: 'social', month: '2026-06',
    },
    {
        daySlot: 73, japanese: 'お世辞じゃなくてマジで',
        english: [
            'I am serious.',
            'I am not just saying that. I really mean it.',
            'I am dead serious. This is not flattery. I genuinely mean every word.',
            'Wait, for real?! Tell me everything.',
        ],
        context: 'flattery は「お世辞」。genuinely は「心から」。throw around は「安易に使う」。I am dead serious は「超マジ」。日本語では「お世辞じゃなくて」と前置きする文化がある。英語でも I am not just saying that は同じ機能。ただし英語のほうが褒め頻度が高いから、本気の褒めには強調が必要。',
        character: 'lisa', category: 'social', month: '2026-06',
    },

    // ────────────────────────────────────────────────────
    // DAY 74: 頼み方のニュアンス (Asking for Favors)
    // Scene: Can you と Could you と Would you mind の違いで全員混乱
    // ────────────────────────────────────────────────────

    {
        daySlot: 74, japanese: 'Can you と Could you って何が違うの？',
        english: [
            'What is the difference between can you and could you?',
            'Can someone explain the difference between can you and could you?',
            'I have always wondered what the actual difference is between can you and could you.',
            'Oh wait, my bad. What do you mean?',
        ],
        context: 'can は「できる？」で能力を聞いているニュアンス。could は仮定法で「もし可能なら」のワンクッション入る。でも実際はトーンと文脈で決まる。Can you pass the salt? は全然丁寧。Could you は少し距離を置く感じ。日本語の「してくれる？」と「していただけますか？」の差に近い。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: 'Would you mind って面倒くさくない？',
        english: [
            'Would you mind is so confusing.',
            'I always mess up the answer to would you mind.',
            'Would you mind is the most confusing phrase in English because yes means no.',
            'Tell me about it! But you get used to it.',
        ],
        context: 'Would you mind の返答が逆になる問題。mind は「嫌がる」だから No, not at all が「嫌じゃないよ=OK」。日本語脳で「はい」と答えると「嫌です」になる悲劇。解決策：No, go ahead（いいよ、どうぞ）を丸暗記。理屈より反射で覚える。',
        character: 'yuki', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: 'ちょっとお願いがあるんだけど',
        english: [
            'I have a favor to ask.',
            'Hey, can I ask you a favor?',
            'I hate to ask, but could I ask you for a small favor?',
            'Leave it to me! Consider it done.',
        ],
        context: 'I have a favor to ask は「お願いがある」の定番前置き。feel free to say no は「断ってくれて全然いい」。cover my shift は「シフトを代わる」。make it up to you は「埋め合わせする」。last minute は「直前」。英語ではお願いの前に「断っていいよ」と逃げ道を作るのが礼儀。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: 'ちょっとこれ手伝ってくれない？',
        english: [
            'Can you help me with this?',
            'Hey, could you give me a hand with this real quick?',
            'I am kind of stuck on this. Would you mind helping me out for a sec?',
            'On it! What do you need?',
        ],
        context: 'give me a hand は「手伝って」。stuck は「行き詰まった」。beyond me は「自分の能力を超えている」。I owe you one は「借り一つ」。help me out は help me よりカジュアルで温かみがある。英語のお願いは「自分でやろうとしたけど無理だった」という前フリが効果的。',
        character: 'mina', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: '丁寧に頼みすぎて逆に変になる',
        english: [
            'I am too polite and it sounds weird.',
            'I keep being overly polite in English and people think it is strange.',
            'My coworker told me I sound too formal when I ask for things.',
            'Wow, I had no idea! That\'s cool.',
        ],
        context: 'overly polite は「丁寧すぎる」。creates distance は「距離を作る」。日本語は丁寧語を重ねるほど丁寧になるけど、英語は丁寧すぎると「壁を作っている」と感じる。Could you と笑顔があれば十分。less is more は「少ないほうが良い」。英語の丁寧さはシンプルさの中にある。',
        character: 'takeshi', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: 'ごめん、今ちょっと無理',
        english: [
            'Sorry, I cannot right now.',
            'I wish I could but I am swamped right now.',
            'I would love to help but I am completely slammed at the moment. Can I help you later?',
            'Don\'t worry about it! Seriously.',
        ],
        context: 'swamped は「忙殺されている」。slammed も同義。buried は「埋もれている」。blow you off は「適当にあしらう」。英語で断るときは理由+代替案を出すのがマナー。日本語の「ちょっと...」みたいに濁すと「じゃあいつならOK？」と詰められる。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: 'それはちょっと厳しいかな',
        english: [
            'That might be difficult.',
            'I am not sure that is going to work.',
            'I want to say yes but honestly I do not think I can make that work.',
            'Yeah, that\'s pretty intense. Not for the faint of heart.',
        ],
        context: 'stretched thin は「手一杯」。take on は「引き受ける」。let you down は「がっかりさせる」。revisit は「もう一度検討する」。日本語の「ちょっと厳しい」は完全な断り。英語でも I am not sure は柔らかい断り。でも英語では理由をはっきり言う方が信頼される。',
        character: 'lisa', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: 'いいよ、任せて',
        english: [
            'Sure, I got it.',
            'No problem. Leave it to me.',
            'Absolutely. Consider it done. I will take care of it.',
            'Oh, for sure. I\'ve noticed that too.',
        ],
        context: 'consider it done は「もう終わったも同然」。I got this は「任せて」の最もカジュアルな言い方。leave it to me は「私に任せて」。straightforward は「簡単・ 単純」。英語で引き受けるときは自信を見せるのが大事。「たぶんできると思います」より「任せて」のほうが信頼される。',
        character: 'master', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: '恩に着るよ',
        english: [
            'I owe you one.',
            'You are a lifesaver. I owe you big time.',
            'Thank you so much. I seriously owe you one. Let me buy you lunch.',
            'Wait, really?! That\'s fascinating.',
        ],
        context: 'I owe you one は「借り一つ」。lifesaver は「命の恩人」。owe you big time は「大きな借りがある」。you need a kidney はジョーク。英語圏では感謝を大げさに表現するのが自然。日本語の「すみません」で感謝を表すのとは真逆のアプローチ。',
        character: 'kenji', category: 'request', month: '2026-06',
    },
    {
        daySlot: 74, japanese: '結局、笑顔でシンプルに言えばいい',
        english: [
            'Just smile and keep it simple.',
            'Honestly, a smile and a simple request go a long way.',
            'At the end of the day, just smile, keep it simple, and people will help you.',
            'Of course! What do you need?',
        ],
        context: 'go a long way は「大きな効果がある」。stone face は「無表情」。overcomplicate は「複雑に考えすぎる」。ゴンドーの結論が真理。英語の丁寧さは言葉の形より態度と声のトーン。日本語は言葉の形（敬語）で丁寧さを出す。この根本的な違いを理解すると楽になる。',
        character: 'master', category: 'request', month: '2026-06',
    },
];

// ============================================================
// DAY THEMES -- MONTH 3 (2026-06) -- WEEK 10
// ============================================================

export const MONTH3_W10_DAY_THEMES: Record<number, {
    title: string;
    titleEn: string;
    category: string;
    scene: string;
    keywords: KeyWord[];
}> = {
    68: {
        title: '上司と部下', titleEn: 'Boss and Subordinate', category: 'request',
        scene: 'ユキの新しい外国人上司が厳しい。英語で報告する苦労。',
        keywords: [
            { en: 'update', ja: '報告・最新情報', pron: 'アップデイト', example: 'I wanted to give you a quick update.', note: '日本語の「報告」は report より update のほうが日常的。report はフォーマルな書面のイメージ。' },
            { en: 'deadline', ja: '締め切り', pron: 'デッドライン', example: 'I cannot make the deadline.', note: 'dead+line=死の線。超えたら死ぬライン。meet the deadline=締め切りを守る。miss the deadline=間に合わない。' },
            { en: 'feedback', ja: 'フィードバック・意見', pron: 'フィードバック', example: 'Could I get your feedback?', note: 'feed(与える)+back(戻す)。日本語にもなったけど英語のほうが日常的に使う。positive/negative/constructive feedback。' },
            { en: 'micromanage', ja: '細かく管理しすぎる', pron: 'マイクロマネジ', example: 'My boss micromanages everything.', note: '英語圏で最も嫌われる上司の行動。micro(小さい)+manage(管理)=逐一チェックする。信頼していない証拠。' },
            { en: 'promote', ja: '昇進させる', pron: 'プロモウト', example: 'I just got promoted.', note: 'get promoted=昇進する。promotion=昇進。日本語の「プロモーション」は販促の意味が強いけど、英語は昇進にも使う。' },
        ],
    },
    69: {
        title: '同僚との会話', titleEn: 'Coworker Small Talk', category: 'social',
        scene: 'タケシのIT会社でランチ中の英語雑談が地獄。',
        keywords: [
            { en: 'small talk', ja: '雑談', pron: 'スモールトーク', example: 'I am terrible at small talk.', note: 'small(小さい)+talk(話)=軽い雑談。日本語の「世間話」。英語圏のビジネスでは small talk が信頼構築の鍵。' },
            { en: 'click', ja: '相性が合う', pron: 'クリック', example: 'We just do not click.', note: 'カチッとはまる音→相性がピッタリ。hit it off も同義。PC の click と同じ語源。人間関係にも使える。' },
            { en: 'overtime', ja: '残業', pron: 'オーバータイム', example: 'I have been working overtime.', note: 'over(超える)+time(時間)=残業。アメリカでは残業代（overtime pay）は法的権利。サービス残業は違法。' },
            { en: 'boundary', ja: '境界線', pron: 'バウンダリー', example: 'You need to set boundaries.', note: 'set boundaries=境界線を引く。英語圏では仕事とプライベートの境界を明確にする文化。日本より個人の領域を重視。' },
            { en: 'recruiter', ja: 'ヘッドハンター', pron: 'リクルーター', example: 'A recruiter reached out to me.', note: 'recruit=採用する。recruiter=採用担当者。LinkedIn 経由で reach out(連絡してくる) のが一般的。' },
        ],
    },
    70: {
        title: '会議で発言', titleEn: 'Speaking Up in Meetings', category: 'request',
        scene: 'ユキが英語の会議で一言も言えなかった日の愚痴。',
        keywords: [
            { en: 'jump in', ja: '割り込む・参加する', pron: 'ジャンプイン', example: 'Can I jump in here?', note: '英語会議の生命線。jump(飛び込む)+in(中に)。会議中に「ちょっといいですか」の最も自然な言い方。' },
            { en: 'on the same page', ja: '認識が合っている', pron: 'オンザセイムペイジ', example: 'Are we on the same page?', note: '同じページ=同じ理解。会議で全員の認識を合わせるときの定番。Let me make sure は「確認させて」のセット。' },
            { en: 'action item', ja: 'やるべきこと', pron: 'アクションアイテム', example: 'What are the action items?', note: 'action(行動)+item(項目)=会議後にやること。to-do と似てるが、action item は会議で決まった公式タスク。' },
            { en: 'wrap up', ja: '締めくくる', pron: 'ラップアップ', example: 'Let us wrap up the meeting.', note: 'wrap(包む)+up=包み上げる→終わりにする。会議・プロジェクト・1日の仕事すべてに使える万能表現。' },
            { en: 'minutes', ja: '議事録', pron: 'ミニッツ', example: 'Who is taking the minutes?', note: '「分」ではなく「議事録」。この意味を知らない日本人は多い。take the minutes=議事録を取る。ラテン語 minuta(小さなメモ)が語源。' },
        ],
    },
    71: {
        title: 'メールの英語', titleEn: 'Email English', category: 'request',
        scene: '「お疲れ様です」が英語にならない問題でみんな盛り上がる。',
        keywords: [
            { en: 'follow up', ja: '追跡・催促', pron: 'フォローアップ', example: 'I just wanted to follow up on my email.', note: 'follow(追う)+up=追跡する。催促メールの柔らかい言い方。just wanted to は「ちょっと」のクッション。' },
            { en: 'attachment', ja: '添付ファイル', pron: 'アタッチメント', example: 'I have attached the file.', note: 'attach(くっつける)+ment=添付物。attached はメール英語の最頻出。Please see attached は「添付をご覧ください」。' },
            { en: 'CC', ja: '同報送信', pron: 'シーシー', example: 'Could you CC me on that?', note: 'Carbon Copy の略。複写。BCC=Blind CC(相手に見えない)。loop me in=CC に入れて=情報共有して。' },
            { en: 'regards', ja: '敬具・よろしく', pron: 'リガーズ', example: 'Best regards, Yuki', note: 'メール締めの定番。Best regards(丁寧), Kind regards(やや柔), Regards(事務的)。Thanks が一番カジュアルで一番多い。' },
            { en: 'inbox', ja: '受信トレイ', pron: 'インボックス', example: 'Your email got buried in my inbox.', note: 'in(中)+box(箱)=受信箱。inbox zero=受信ゼロ状態。got buried=埋もれた。overflowing inbox=パンク寸前の受信箱。' },
        ],
    },
    72: {
        title: '電話対応', titleEn: 'Phone English', category: 'request',
        scene: 'ケンジの現場に英語の電話がかかってきてパニック。',
        keywords: [
            { en: 'transfer', ja: '転送する', pron: 'トランスファー', example: 'Let me transfer you to the right person.', note: 'trans(向こうへ)+fer(運ぶ)=転送。電話を別の人につなぐ。put you through も同義。redirect は堅い。' },
            { en: 'voicemail', ja: '留守番電話', pron: 'ヴォイスメイル', example: 'Leave a voicemail with your name and number.', note: 'voice(声)+mail(郵便)=音声メール。日本語の「留守電」。go to voicemail=留守電になる。check your voicemail=留守電を確認する。' },
            { en: 'hold', ja: '保留する', pron: 'ホウルド', example: 'Could you hold for a moment?', note: 'hold(持つ・保つ)=電話を切らずに待つ。on hold=保留中。please hold は電話応対の最重要フレーズ。' },
            { en: 'disconnect', ja: '切れる', pron: 'ディスコネクト', example: 'Sorry, we got disconnected.', note: 'dis(否定)+connect(つなぐ)=接続が切れる。電話が切れた=we got disconnected。dropped call も同義。' },
            { en: 'spell', ja: 'スペルを言う', pron: 'スペル', example: 'Could you spell that for me?', note: '「つづりを言う」の意味。M as in Mike のフォネティックコードは電話の必須スキル。B/D, M/N, 5/9 の聞き間違いを防ぐ。' },
        ],
    },
    73: {
        title: '褒め方', titleEn: 'Giving Compliments', category: 'social',
        scene: 'リサが「日本人は褒め方が下手」と言い出して議論に。',
        keywords: [
            { en: 'compliment', ja: '褒め言葉', pron: 'コンプリメント', example: 'That is such a nice compliment.', note: 'complement(補完)とスペルが違うので注意。give a compliment=褒める。pay a compliment も同義でやや堅い。' },
            { en: 'flattery', ja: 'お世辞', pron: 'フラタリー', example: 'I am not just saying that. It is not flattery.', note: 'flatter=お世辞を言う。Flattery will get you nowhere=お世辞じゃ何も得られない。日本語の「お世辞」より否定的なニュアンス。' },
            { en: 'genuine', ja: '本心からの', pron: 'ジェニュイン', example: 'That was a genuine compliment.', note: 'genuine=偽物じゃない・本物の。人に使うと「誠実な」。a genuine person=裏表のない人。品質にも人柄にも使える。' },
            { en: 'impeccable', ja: '非の打ちどころのない', pron: 'インペカブル', example: 'You have impeccable taste.', note: 'im(否定)+peccable(罪を犯しうる)=罪がない→完璧な。最上級の褒め言葉。taste, timing, style と相性が良い。' },
            { en: 'humble', ja: '謙虚な', pron: 'ハンブル', example: 'She is talented but so humble.', note: 'humble brag=謙虚なフリをして自慢する。英語圏でも humility は美徳だけど、褒められたら Thank you が先。日本式の全否定は逆効果。' },
        ],
    },
    74: {
        title: '頼み方のニュアンス', titleEn: 'Asking for Favors', category: 'request',
        scene: 'Can you と Could you と Would you mind の違いで全員混乱。',
        keywords: [
            { en: 'favor', ja: 'お願い・頼み事', pron: 'フェイバー', example: 'Can I ask you a favor?', note: 'do someone a favor=お願いを聞く。return the favor=恩返しする。favorite と同じ語源（ラテン語 favor=好意）。' },
            { en: 'swamped', ja: '忙殺されている', pron: 'スウォンプト', example: 'I wish I could but I am swamped.', note: 'swamp=沼→swamped=沼に沈む=仕事に埋もれる。busy の3倍忙しいイメージ。slammed, buried も同義。' },
            { en: 'commit', ja: '引き受ける・約束する', pron: 'コミット', example: 'I cannot commit to that right now.', note: 'commit=深く関わる約束。commitment=責任ある約束。noncommittal=あいまいな態度。日本語の「コミット」より重い約束のニュアンス。' },
            { en: 'straightforward', ja: '簡単・ややこしくない', pron: 'ストレイトフォワード', example: 'It should be pretty straightforward.', note: 'straight(まっすぐ)+forward(前へ)=まっすぐ進める=複雑じゃない。simple より少しプロフェッショナルな響き。' },
            { en: 'lifesaver', ja: '命の恩人・救世主', pron: 'ライフセイバー', example: 'You are a lifesaver.', note: 'life(命)+saver(救う人)。実際に命を救ったわけではなく、大げさに感謝する表現。ビーチの監視員もlifeguard。' },
        ],
    },
};
