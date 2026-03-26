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
            "So I just wanted to give you a quick update on where things stand. We finished the first phase last Friday and we are about halfway through phase two. There are a couple of things I want to flag though. The timeline is a bit tight so I might need an extra day or two. I will keep you posted on that.",
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
            "I need to be upfront with you about something. I do not think I can hit the Friday deadline. I ran into some issues with the data that I was not expecting and it set me back about two days. I know that is not ideal but I wanted to let you know now rather than wait until the last minute. Would it be possible to push it to next Tuesday?",
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
            "Hey, do you have a few minutes? There is something I have been thinking about and I wanted to get your input before I move forward. It is not urgent or anything but I would rather check with you now than go in the wrong direction and have to redo everything later. Would after lunch work for you?",
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
            "I apologize but I want to make sure I am on the same page. When you said you wanted me to revise the report, did you mean rewrite the whole thing or just update the numbers? I do not want to spend three hours on a full rewrite if you only needed a quick fix. Could you be a bit more specific about what you are looking for?",
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
            "Understood, I will get right on that. Just to confirm, you want the revised version by five o'clock today, right? I will prioritize this over the other things on my plate. If anything comes up that might delay it I will shoot you a message. Otherwise, expect it in your inbox before five.",
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
            "Wait, so in English you just call your boss by their first name? No honorifics or anything? That feels so weird to me. In Japanese we have buchou, kachou, all these titles. You are telling me you just walk up to the CEO and go hey Mike? That would get you fired in Japan. I could never do that. It would feel like calling my dad by his first name.",
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
            "I just finished the first draft and I would love to get your feedback before I finalize it. I know you are busy so it does not have to be super detailed or anything. Even just a quick skim and your overall impression would be really helpful. No rush, whenever you get a chance. I just do not want to submit it without a second pair of eyes on it.",
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
            "Oh man, let me tell you about my old boss. This guy would send emails at two in the morning and then get mad if you did not respond by seven. He micromanaged everything. Like, he would stand behind you and watch you type. One time he called me into his office to complain about the font I used in an internal memo. The font. I quit three months later and it was the best decision I ever made.",
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
            "My performance review is coming up and I am honestly dreading it. I never know what to say when they ask where do you see yourself in five years? I do not even know what I am having for dinner tonight. And the self-evaluation part is the worst. In Japan we are taught to be humble but in English you have to sell yourself. It feels so unnatural.",
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
            "They promoted me to manager last year but the thing is nobody teaches you how to manage. They just throw you in and say good luck. And the younger generation is totally different. You cannot just tell them what to do anymore. You have to explain why. And if you give them feedback the wrong way they shut down completely. I miss just doing the work myself. Being a boss is exhausting.",
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
            "Hey, good morning. So how was your weekend? I feel like you always have something interesting going on. Me? I literally did nothing. I woke up Saturday at noon, watched Netflix for eight hours, and then felt guilty about it on Sunday. But at least I am well-rested, I guess. So come on, tell me you did something more exciting than that.",
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
            "Hey, I am starving. I was going to check out that new ramen place around the corner. You want to come? I heard it is pretty good. The line might be kind of long though so we should probably head out now if we want to make it back by one. Or we could just do the cafeteria if you do not want to risk it. Up to you.",
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
            "Oh shoot, do we have that team meeting today? I completely blanked on it. I swear they keep changing the schedule every week. Last week it was Tuesday, now it is Thursday? I did not prep anything. Is it the kind of meeting where I can just sit there and nod or am I actually supposed to present something? Because if it is the latter I am in trouble.",
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
            "Dude, I saw your Teams status was green at like ten o'clock last night. Are you seriously still working that late? That is not healthy. I know the project is crazy right now but you need to set some boundaries. Your boss is not going to tell you to go home. You have to decide that for yourself. Trust me, I learned that the hard way.",
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
            "Can we talk about office politics for a second? There are two groups at my company that absolutely hate each other and I am stuck in the middle. One side wants to do things the old way, the other side wants to change everything. And both sides want me to pick a team. I just want to write code and go home. Why is that so hard? The actual work is easy. The people part is what kills me.",
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
            "There is this one person at work who I just cannot get along with. It is not like they are a bad person or anything. We just do not click. Every time we try to have a conversation it gets awkward. We have literally nothing in common. I try to be friendly but it just feels forced. You ever have that? Where someone is perfectly nice but you just cannot connect?",
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
            "You know what nobody tells you about working at an international company? The actual work is fine. You can learn the technical terms. But the small talk? That is where I die. Like, when everyone is standing around the coffee machine talking about some TV show I have never seen, I just stand there holding my mug with nothing to say. It is the loneliest feeling. I could explain database architecture in English but I cannot joke about the weather.",
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
            "I have not told anyone this but I have been kind of looking around. Do not get me wrong, I do not hate my current job. It is just that I have been doing the same thing for five years and I feel like I am not growing anymore. I updated my LinkedIn last week and I already got two messages from recruiters. I am not in a rush or anything but if the right opportunity comes along, I would definitely consider it.",
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
            "Have you talked to the new person in marketing yet? I had lunch with them yesterday and they are actually really cool. Super easy to talk to. They used to work in Singapore so they speak like four languages. And they are really funny too. I was worried it would be awkward but we ended up talking for like forty minutes. I think they are going to fit in really well.",
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
            "So a few of us are going to that izakaya near the station after work. You want to come? It is nothing fancy, just a couple of drinks and some food. Tanaka is coming and I think Suzuki might show up too. We should get there by like six thirty before it gets packed. It is Friday, we deserve it. Come on, you can catch the last train home.",
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
            "I just had the most frustrating meeting of my life. An hour and a half. Twelve people. All in English. And I said literally nothing. Zero. I had things I wanted to say but by the time I figured out how to say them in English, the conversation had already moved on. Everyone else was jumping in and I was just sitting there like a statue. I wanted to cry. I understood maybe sixty percent but understanding and speaking are completely different things.",
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
            "Sorry, can I jump in real quick? I know we are moving fast but I actually have a thought on this. So what if instead of doing it all at once, we break it into smaller phases? That way we can test each part individually and catch problems early. I am not saying the current plan is wrong, I just think there might be a more efficient way to approach it. Does that make sense?",
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
            "Yeah, I completely agree with what you just said. That has been my feeling too. I have been thinking about this since last week and I came to the same conclusion. The data backs it up too. If you look at the numbers from Q2, they clearly show that this approach would work better. So yeah, I am on board. Let us move forward with it.",
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
            "I hear what you are saying and I think you make a valid point. But I am not totally sure that is the best approach. If we go that route, we might run into some problems down the line. What if we considered doing it this way instead? I am not saying your idea is wrong. I just think we should look at it from a different angle before we commit to anything.",
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
            "Wait, I am getting a little lost here. Can we slow down for a second? I want to make sure I am following. So what we are saying is option A is faster but more expensive, and option B takes longer but fits the budget. Is that right? Because I feel like we keep going back and forth and I am not sure what we have actually decided. Can we just confirm where we are?",
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
            "Okay so before we end, I just want to make sure we are all clear on the action items. So Tanaka is going to finalize the report by Wednesday, marketing is going to review the copy by Thursday, and I will set up the follow-up meeting for next Monday. Did I miss anything? And just to be safe, can we get all of this in an email after the meeting so nobody forgets?",
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
            "I am really sorry but I missed what you just said. I think there was some connection issues on my end. Could you repeat that last point? I want to make sure I have it right. Was it about the budget or the timeline? I do not want to misunderstand and then go off and do the wrong thing. Sorry for holding things up.",
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
            "The thing about English meetings is that there is no pause. In Japanese meetings you wait your turn. Someone finishes, there is a little silence, and then the next person speaks. In English meetings? There is no silence. People talk over each other. They finish each other's sentences. If you wait for a pause that never comes, you end up saying nothing. You basically have to interrupt. And that goes against everything I was taught growing up.",
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
            "It is so weird. I can chat with my coworkers in English no problem. We joke around, we talk about the weekend, totally fine. But the second we sit down in a conference room and someone says let us get started, my brain shuts off. It is like a switch flips. Suddenly I cannot form sentences. I think it is the pressure. When it is just chatting, making mistakes is fine. In a meeting, you feel like everyone is judging you.",
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
            "So my boss asked me to take the minutes for today's meeting and I almost died. The meeting was an hour but writing the minutes took me three hours. Three hours. Because I had to listen to the recording five times to catch everything. And then I had to figure out how to write it in proper business English. In Japanese I could do this in twenty minutes. In English it is a full day project. I need a raise if they want me to keep doing this.",
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
            "Okay, someone explain this to me. What is the English version of otsukaresama desu? Because I have been working with foreigners for three years and I still have not figured it out. Hi? Hey? Good afternoon? None of those feel the same. Otsukaresama is like an acknowledgment that you are both working hard and you see each other. English does not have that concept. It just does not exist.",
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
            "I swear I spend thirty minutes just staring at the first line of every English email. In Japanese it is easy. Otsukaresama desu, iつもお世話になっております, done. In English? Do I say Hi, Hello, Dear? If it is Dear, do I use their first name or last name? And then what? I hope this email finds you well? Who actually talks like that? Nobody has ever hoped an email found me well. The whole thing feels fake.",
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
            "Hi Sarah, I just finished updating the report you asked for. I have attached it to this email. Could you take a look when you get a chance and let me know if anything needs to be changed? No rush at all, but if possible, it would be great to get your feedback by end of day Thursday so I can make any revisions before the Friday deadline. Thanks so much.",
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
            "Hi Tom, I am really sorry for the late reply. Things have been a little crazy on my end this week and your email unfortunately got buried in my inbox. I should have gotten back to you sooner. To answer your question, yes, I think we should go with option B. I have attached the revised proposal for your review. Again, sorry for the delay and please let me know if you have any questions.",
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
            "Hi everyone, I am sending over the files we discussed in yesterday's meeting. I have attached three documents: the project timeline, the budget breakdown, and the client presentation. Please take a look at your respective sections and let me know if anything needs to be updated. I would like to finalize everything by Wednesday so we have time for a final review on Thursday. Thanks.",
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
            "Oh wait, can you CC me on that? I want to make sure I am in the loop in case the client has any follow-up questions. Actually, could you CC Tanaka too? He is going to be handling the account starting next month so he should probably start getting familiar with the communication. And could you BCC me on the one to the vendor? I do not want them to know I am watching.",
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
            "You guys are not going to believe this but I just spent three hours writing one email. Three hours. It was ten lines. In Japanese I could have written it in five minutes. But in English I keep second-guessing every single word. Is this too casual? Is this too formal? Am I being rude? Am I being too polite? I literally googled is it okay to start an email with just Hi and read seven articles about it. I need help.",
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
            "Okay, so otsukaresama has no English version and neither does yoroshiku onegaishimasu. These are the two phrases I use literally every single day in Japanese and they do not exist in English. What am I supposed to say? Thank you in advance? That sounds like I am assuming they will do it. Looking forward to hearing from you? That is only for when you are waiting for a response. I swear Japanese and English were designed to torture each other.",
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
            "How do I follow up on an email without sounding annoying? I sent a request three days ago and they have not replied. In Japanese I would say something like sono go ikaga deshou ka. But in English, just checking in sounds passive-aggressive and per my last email sounds even worse. Someone told me to write gentle reminder but that feels condescending. Is there a way to say hey you forgot about me without actually saying it?",
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
            "What do you guys use to end your emails? I have been using Best regards for like three years because that is what they taught us in school. But I noticed my American coworker just writes Thanks and that is it. My British client uses Kind regards. And then there is Cheers which I thought was for drinking but apparently British people use it to end emails too. It is so confusing. I have been overthinking this for way too long.",
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
            "So I am at the office and the phone rings and I pick it up and this person starts speaking English at full speed. My brain completely froze. I could not even say hello. I just stood there holding the phone with my mouth open. After like five seconds of silence they said hello? And I panicked and said yes, yes, please hold and then I just stared at the phone trying to figure out what to do. It was the most embarrassing ten minutes of my life.",
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
            "Sure, let me look into that for you. Could you hold on for just a moment? I need to check with my colleague who handles that area. It should not take more than a minute or two. I really appreciate your patience. Or actually, would you prefer if I called you back once I have the information? That way you do not have to wait. Which would you prefer?",
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
            "I appreciate you calling. Unfortunately I am not the best person to answer that question but let me transfer you to someone who can definitely help. I am going to connect you with our sales department. Their name is Tanaka and they handle all of our international accounts. Just give me a second to put the call through. If we get disconnected for any reason, the direct number is zero three, four five six seven, eight nine zero one.",
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
            "I am really sorry but I am having a hard time catching everything you are saying. Would you mind slowing down just a little bit? My English is not perfect and on the phone it is even harder because I cannot see your face. If you could speak just a little more slowly and clearly, that would really help me out. I want to make sure I understand exactly what you need so I can help you properly.",
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
            "I want to make sure I give you the right information so would it be okay if I looked into this and called you back? I should have an answer within the hour. Is this the best number to reach you? And just in case, could I get your email too? That way if I cannot reach you by phone I can send you the details in writing. Thank you for your patience. I will get back to you as soon as possible.",
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
            "I am sorry, could you spell that for me? I want to make sure I have it right. Was that M as in Mike, C as in Charlie? Oh, M-C-D-O-N-A-L-D? Got it, thank you. And your first name? K-E-V-I-N? Okay, Kevin McDonald. And could I get your phone number as well? I will read it back to you to make sure I have it right. Three, one, zero... got it. Thank you so much.",
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
            "Is it okay if we switch to email for this? I want to make sure I do not miss any details and honestly the phone connection is not great right now. If you could send me a summary of what we just discussed, that would be really helpful. That way I can take my time to read through everything and respond properly. Plus it gives us both a paper trail in case we need to refer back to anything later.",
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
            "Can we talk about how much harder conference calls are than face-to-face meetings? In person I can read people's body language and facial expressions. On the phone I have got nothing. Just voices. And when multiple people are talking at the same time it becomes this wall of noise that I cannot process. And do not even get me started on the people who do not mute themselves. I can hear someone's dog barking and a microwave beeping while my boss is talking about quarterly targets.",
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
            "This is so embarrassing. Someone gave me their phone number over the phone and I thought I wrote it down correctly but when I called it back some random person answered. I think I mixed up a five and a nine. Those two sound so similar in English. Especially on the phone. I should have repeated it back to confirm but I was so nervous I just said got it and hung up. Now I have no way to reach the original person.",
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
            "If nobody answers, just leave a voicemail. Keep it short and simple. Say your name, your company, why you are calling, and your phone number. And here is a tip, say your phone number twice. Once at the beginning and once at the end. Because if they miss it the first time they do not have to replay the whole message. And speak slowly when you say the number. That is the part people mess up the most.",
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
            "Can I say something that might be controversial? I think Japanese people are terrible at giving compliments. And even worse at receiving them. Like, if I tell a Japanese person your English is really good, they immediately go no no no, I am terrible. Why can you not just say thank you? In America, compliments are like currency. You give them freely and people appreciate it. In Japan it feels like compliments make people uncomfortable.",
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
            "Oh my god, I love that jacket. Where did you get it? It looks so good on you. The color is perfect for your skin tone. Is it new? I have been looking for something like that but I can never find the right shade of blue. It is like a navy but not too dark? Whatever it is, it works. You should wear that color more often. Seriously, you look great.",
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
            "Hey, I just wanted to tell you that your presentation today was really impressive. The way you organized the data made everything so easy to follow. And your delivery was great too. You sounded confident and you kept everyone's attention the whole time. I know public speaking is not easy, especially in English, so seriously, nice work. You should be proud of that.",
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
            "Okay so Lisa says just say thank you. But it is so hard. My whole life I have been taught to deny compliments. If someone says you are smart, you say no I am not. If someone says your cooking is delicious, you say no it is nothing special. It is literally programmed into me. When someone compliments me in English, my brain goes into Japanese mode and I start denying it. And then they look at me like I am crazy.",
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
            "Wait, you already finished the report? I just asked you for it this morning. How did you do that so fast? It would have taken me at least two days. Are you some kind of robot? Seriously though, I am impressed. You are one of those people who just gets things done without making a big deal out of it. I need to learn your secret because my to-do list just keeps getting longer.",
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
            "Okay, hot take. When a native speaker tells me your English is so good, I do not know how to feel. On one hand, they are being nice. On the other hand, it kind of implies that they expected it to be bad. Like, you would never tell a French person your English is so good in the same surprised tone. It is always Asian people who get that. It feels like the bar was set so low that anything above zero is impressive. Am I overthinking this?",
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
            "Oh my god, this is incredible. You made this from scratch? I cannot believe it. The flavor is perfect. It is not too salty, not too bland, just right. And the presentation looks like something out of a restaurant. Honestly, if you ever quit your job you could open a restaurant. I am not even kidding. Can you teach me how to make this? Or better yet, can I just come over for dinner every week?",
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
            "You know what, I am not even surprised. That is so typical of you. When things get tough, you always step up. Remember last month when everyone was panicking about the deadline? You stayed calm and just handled it. That is what I admire about you. You do not make a fuss. You just quietly get it done. Not everyone has that quality. Seriously, I mean it.",
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
            "Honestly, you have impeccable taste. Everything you pick out just looks perfect. Your clothes, your apartment, even the way you arrange your desk. It is all so put together. I am the type of person who wears the same three shirts on rotation and you always look like you stepped out of a magazine. Where does that come from? Is it natural or did you have to work at it? Because I desperately need whatever you have.",
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
            "No, listen, I am not just being nice. I genuinely mean this. I know people throw around compliments all the time and you never know if they are real or not. But I am telling you, this is not one of those times. I am not the type of person who says things I do not mean. If I thought it was bad, I would just not say anything. So when I tell you it is good, I actually mean it is good. Trust me on this.",
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
            "Okay, I need someone to explain this to me once and for all. What is the actual difference between can you and could you? My English teacher in school said can you is casual and could you is polite. But then I hear native speakers use can you in formal situations all the time. And sometimes could you sounds MORE casual than can you depending on how you say it. Is there even a real rule or is everyone just making it up as they go?",
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
            "Would you mind is genuinely the most confusing phrase in the English language. Would you mind closing the door? If I do not mind, I say no, not at all. But in Japanese, if someone asks me something I say hai which is yes. So my brain goes would you mind? yes and then I accidentally told them I do mind. Which means I DO NOT want to close the door. The logic is completely backwards. I have been messing this up for years and I still catch myself doing it.",
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
            "Hey, so I hate to do this but I have a favor to ask. And feel free to say no, seriously. I am not going to be offended or anything. But would you be able to cover my shift on Saturday? My daughter has a thing at school and I completely forgot about it until today. I know it is last minute and I am sorry about that. I will totally make it up to you. I can cover for you whenever you need. Just name the day.",
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
            "Hey, I am really sorry to bother you but I am completely stuck on this spreadsheet and I have been staring at it for an hour. I know you are good with Excel. Would you mind taking a look at it for me? It should not take long. I think there is something wrong with one of the formulas but I cannot figure out which one. I would not ask if I could do it myself but this is honestly beyond me. I owe you one.",
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
            "My American coworker told me something the other day that kind of shocked me. She said I sound like a robot when I make requests. Because I always say I would be most grateful if you could kindly do me the favor of... and she was like, dude, just say hey can you do this? I was taught in school that more polite equals more words. But apparently in English, being too polite actually creates distance. It makes people uncomfortable. Less is more, I guess.",
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
            "Oh man, I really wish I could help but I am absolutely buried right now. I have three things due by five and I have not even started on two of them. I feel terrible saying no because I know you need help. Can I come find you after five? I should be free by then. Or if it is really urgent, ask Tanaka? I think he might have some time. I am sorry, I swear I am not trying to blow you off.",
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
            "I appreciate you thinking of me but I have to be honest, I do not think I can commit to that right now. It is not that I do not want to. The timing is just really bad. I am already stretched thin with three other projects and if I take on one more thing, the quality of everything is going to suffer. I would rather be upfront about it now than say yes and let you down later. Can we revisit this next month?",
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
            "Of course, I would be happy to help. Do not even worry about it. I have actually done something similar before so I know exactly what to do. Just send me the details and I will get it done by the end of the day. And if anything comes up that I am not sure about, I will check with you before I do anything. But honestly, I think it should be pretty straightforward. You can relax. I got this.",
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
            "You have no idea how much this means to me. Seriously, you just saved my life. I was panicking and you came in like a superhero. I owe you big time. Next time you need anything, and I mean anything, just ask. I do not care what it is. You need me to cover your shift? Done. You need me to help you move? I am there. You need a kidney? Well, let me think about that one. But seriously, thank you. I will not forget this.",
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
            "You know what I have learned after all these years? All those grammar rules about can and could and would you mind? They do not matter as much as how you say it. If you smile, make eye contact, and say hey, can you help me? that is more polite than any perfectly constructed formal sentence said with a stone face. Politeness in English is more about tone and attitude than about the words you choose. Japanese people overcomplicate this. Just be warm and direct. That is it.",
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
