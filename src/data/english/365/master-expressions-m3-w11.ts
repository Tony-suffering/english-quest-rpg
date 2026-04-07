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
            "I am not exaggerating when I say you saved my life back there. I was completely stuck and had no idea what to do. If you had not stepped in, I would still be standing in that office looking like a lost puppy. I owe you big time. Next round is on me. Actually, next three rounds are on me.",
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
            "You really did not have to do that, you know. The fact that you went out of your way to help me when you were already busy, that means a lot. People say they will help all the time but most of them do not actually follow through. You are one of the few people who actually does. That is rare and I do not take it for granted.",
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
            "I know I do not say this enough but thank you for always looking out for me. You always notice when something is off. You always ask if I am doing okay. Most people just walk right past but you stop and actually listen. That kind of thing makes a bigger difference than you think. I just wanted you to know that I notice it and I am grateful.",
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
            "I have been trying to find the right words to say thank you but nothing feels big enough. What you did for me, it changed everything. I am not being dramatic. Before you helped me, I was ready to give up. Completely. And you just showed up and made it happen like it was no big deal. But it was a big deal. To me, it was everything.",
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
            "I just wanted to let you know that everything worked out in the end. And honestly, it is all because of you. If you had not given me that advice last week, I would have made a completely different decision and probably regretted it. Sometimes one conversation changes everything. This was one of those times. So yeah. Thank you. Seriously.",
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
            "Saying thank you feels too small for what you have done. I mean it. You went above and beyond and I just sat here saying thanks like that covers it. It does not. So I am going to find a way to pay you back properly. I do not know how yet but I will figure it out. You deserve more than just words.",
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
            "No, no, you do not have to get me anything. I mean it. Just the fact that you remembered and thought about me, that is already more than enough. People are busy. Everyone has their own stuff going on. So when someone takes the time to think about you, that is the real gift. Not some thing you buy at a store. The thought. That is what matters.",
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
            "Okay you have to let me do something for you. I am serious. You have helped me so many times and I just keep taking and taking. It is starting to feel one-sided and I hate that. So name it. Dinner, drinks, whatever you need help with. I am there. No arguments. You are not allowed to say no this time.",
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
            "You know what I have learned after all these years? The most important thing is gratitude. When you are young you think everything just happens by itself. But it does not. Someone is always behind the scenes making things work. Your parents, your coworkers, your friends. The ones who never ask for credit. Those are the people you need to thank. Every single day.",
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
            "It is funny how the smallest things can make the biggest difference. She just smiled and said good morning. That is it. Nothing fancy. But I had been having the worst morning and that one moment completely turned it around. I walked into work feeling like garbage and walked out feeling like everything was going to be okay. All because someone was kind for two seconds.",
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
            "I owe you an apology. What I said earlier was out of line and I have no excuse for it. I was stressed and I took it out on you and that was not fair. You did not deserve that. I should have handled it better. I am going to make sure it does not happen again because you matter to me and I do not want to be the person who treats people like that.",
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
            "Okay, can I be honest? You guys apologize way too much. I am not trying to be rude but in English, when you say sorry, it means you did something wrong. Like, you are accepting blame. But I hear you say sumimasen for everything. Someone bumps into you and you say sorry. Someone gives you a gift and you say sorry. It confuses us because we are thinking wait, what did you do wrong?",
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
            "Stop apologizing. I am serious. You literally just asked me a question and then said sorry for bothering me. That is not bothering. That is called having a conversation. Not everything needs a sorry attached to it. Save your sorrys for when you actually mess up. If you apologize for everything, the word loses its power and people stop taking it seriously.",
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
            "I am so sorry for making you wait. I know I said I would be here at seven and it is already seven thirty. The train got stuck and I just sat there watching the minutes go by. I tried texting you but my phone died. Everything that could go wrong went wrong. I feel terrible. Please do not think I do not value your time because I really do.",
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
            "Hey, about what I said in the meeting. I have been thinking about it and I think I was too blunt. I did not mean to hurt your feelings. What I was trying to say was that we could do better, not that your work was bad. I should have chosen my words more carefully. I sometimes forget that not everyone communicates the same way I do. That is something I need to work on.",
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
            "I know saying sorry is not always enough so I brought you something. It is not a bribe or anything, I just wanted to show you that I actually feel bad about what happened. I was not sure what to get so I went with chocolate because, I mean, who does not like chocolate. If this does not work, tell me what will. I am open to suggestions.",
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
            "Look, I know I screwed up and I know sorry does not erase what happened. I am not asking you to forget about it. I just want to know if there is a chance we can move past this. If you need time, I totally understand. I will wait as long as it takes. But I want you to know that I value this friendship more than my pride and I am willing to do whatever it takes to fix this.",
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
            "I can see you are still carrying this around and it is eating you up. But listen. You made a mistake. You apologized. The other person accepted your apology. It is done. You need to let yourself off the hook. Holding onto guilt forever does not make you a better person. It just makes you miserable. Learn from it and move on. That is all you can do.",
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
            "Here is a trick that changed my life. Instead of saying sorry for being late, say thank you for waiting. Instead of sorry for talking too much, say thank you for listening. It sounds like a small thing but it completely changes the energy. Sorry puts the focus on your mistake. Thank you puts the focus on the other person. It makes them feel valued instead of burdened. Try it.",
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
            "This is so interesting. In Japan, apologizing is about maintaining harmony. In English, apologizing is about taking responsibility for a specific action. Neither one is wrong but they come from completely different places. No wonder we confuse each other. I always thought sorry was sorry but now I see it is way more complicated than that. Language really is a window into how people think.",
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
            "Listen to me. You are going to walk in there and you are going to crush it. I have watched you practice this presentation at least ten times and every single time it gets better. You know this material inside and out. The only thing standing between you and a great presentation is your own nerves. And nerves go away the second you start talking. Trust me on this one.",
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
            "You know what nervousness actually is? It is your body preparing for something important. Your brain is saying hey, this matters, so pay attention. The best speakers in the world get nervous. Every single one. The difference is they do not run from it. They use it. Channel that energy into your voice, into your passion. Nervousness and excitement are basically the same thing.",
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
            "I am going to tell you something that took me years to learn. The preparation is done. You cannot cram any more information into your head at this point. So the only thing left to do is trust yourself. Trust that you know what you are talking about. Trust that you are good enough. Because you are. I would not say it if I did not mean it. Now go in there and show them what you have got.",
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
            "Let me put this in perspective. What is the absolute worst case scenario? You stumble over a few words. Maybe you forget a point. So what? Nobody dies. Nobody loses their job. Nobody even remembers a week later. I have bombed presentations before. Like, really bombed. And I am still here. Still employed. Still alive. The stakes are never as high as your brain tells you they are.",
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
            "Just so you know, we are all rooting for you. Every single person in this room wants you to succeed. We are not sitting there waiting for you to mess up. We are on your side. So when you look out at the audience, do not see judges. See friends. See people who want to hear what you have to say. Because we genuinely do.",
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
            "Do you even realize how much you have grown? I remember your first presentation. You were reading directly off the slides, your voice was shaking, and you finished in half the time because you were rushing. Now look at you. You make eye contact, you pause at the right moments, you even crack jokes. That is not luck. That is hard work paying off. Give yourself some credit.",
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
            "Stop trying to be perfect. Seriously. Nobody connects with a perfect presentation anyway. You know what people remember? The real moments. The time you laughed at your own mistake. The time you said something from the heart. Those are the moments that stick. Perfect is boring. Perfect is forgettable. Be real. Be yourself. That is what makes a presentation memorable.",
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
            "Here is what I do before anything big. I stand somewhere quiet, close my eyes, and take three slow deep breaths. In through the nose, out through the mouth. It sounds so simple and kind of ridiculous but it works. It slows your heart rate down and tells your brain to chill. Try it right now. In. Out. See? You already look calmer. Your body listens when you give it the right signals.",
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
            "Listen. If something goes wrong in there, I am right here. If the projector breaks, I will fix it. If you forget your lines, I will jump in. If the audience asks a tough question, look at me and I will help. You are not doing this alone. That is the whole point of being a team. We cover for each other. So stop worrying and go be amazing. I have got your back.",
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
            "You know what? Here is the deal. No matter what happens in that room, when you walk out we are going straight to the bar. If it goes great, we celebrate. If it goes badly, we drink to forget. Either way, there is beer at the end of this tunnel. That is your light at the end of the tunnel. Cold beer and good friends. Now go get it done so we can start drinking.",
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
            "I really wish I could but honestly my schedule is packed right now. I have got three deadlines this week and I am already behind on two of them. It is not that I do not want to. I genuinely do. But if I say yes to this, something else is going to suffer and I cannot afford that right now. Can I take a rain check? I promise I will make it up to you.",
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
            "That sounds fun and normally I would be all over it but I am going to have to sit this one out. I have been going out every weekend and my wallet is crying. Literally crying. I checked my bank account this morning and it gave me a notification that just said good luck. So yeah, I need a weekend at home doing absolutely nothing. Next time for sure though.",
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
            "That is really kind of you and I do not want you to think I am being ungrateful. I genuinely appreciate you thinking of me. It is just that right now is not a good time for me personally. I have got some things I need to sort out first before I can commit to anything new. I hope you understand. It is definitely a me thing, not a you thing.",
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
            "I think the biggest culture shock for me in English was learning to say no. In Japanese you can say something like chotto and the other person understands. But in English, if you say it is a little difficult, people think you mean it is difficult but possible. So they push harder. Then you panic and end up saying yes when you wanted to say no. I have accidentally agreed to so many things this way.",
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
            "In American culture, a clear no is way more respectful than a vague maybe. If someone invites you somewhere and you do not want to go, just say I appreciate the invite but I cannot make it. Done. Nobody is offended. Nobody thinks you are rude. In fact, the worst thing you can do is say yes and then cancel last minute. That is what people actually find disrespectful. A clean no saves everyone time.",
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
            "I would love to go. Honestly. But I already committed to something else that day and I cannot back out now. I made a promise and I have to keep it. But please do not stop inviting me. I want to be included even when I cannot make it because one of these days my schedule is going to line up and I am going to be there. Just not this time unfortunately.",
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
            "I am going to be straight with you. When a Japanese person says I will think about it, ninety percent of the time they mean no. Right? I have learned that the hard way. But in English, if you say let me think about it, people actually expect you to come back with an answer. So be careful. If you mean no, just say no. Otherwise they are going to follow up and then it gets awkward.",
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
            "If you do not want to come, just say so. Nobody is going to be upset. We would rather you stay home and rest than come out and be miserable the whole time. There is no obligation here. This is supposed to be fun. And if fun means staying home in your pajamas watching Netflix, then that is your kind of fun tonight. No judgment. We will catch you next time.",
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
            "I wish I could say yes but I am already spread so thin that I am about to snap. I took on too much this month and now everything is barely getting done. If I add one more thing I am going to drop all the balls I am juggling. I need to learn to say no before I reach this point. But for now, I just cannot take on anything else. I am sorry.",
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
            "I am bummed I cannot go this time. I really am. But please do not take me off the list. Keep inviting me because I promise one of these times I am going to say yes and it is going to be the best time ever. I just need to get through this week and then I will be free. So yeah, keep me posted on the next one. I am already looking forward to it.",
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
            "You are not going to believe the day I had. First, my alarm did not go off so I was already thirty minutes late. Then I spilled coffee on my shirt in the train. Then my boss called an emergency meeting that lasted three hours and solved nothing. Three hours. For nothing. And to top it all off, I left my umbrella somewhere and it started raining on the way here. The universe is personally targeting me today.",
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
            "My boss sent me an email at eleven at night asking me to redo a report that she approved yesterday. Yesterday. She literally signed off on it and now she wants changes. And not small changes. She wants me to basically start over. What was the point of approving it then? I do not understand how someone can change their mind that many times and still have a job. If I did that, I would be fired on the spot.",
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
            "I did the math the other day. If you divide my salary by the actual hours I work, including all the overtime I do not get paid for, I make less than the part-timers. Less. And I have been there eight years. Eight years and two raises. Two. Meanwhile my workload has tripled. I am basically doing three people's jobs for one person's salary. Something has to change or I am going to start doing one person's work.",
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
            "I know, I know. Complaining does not change anything. I am not stupid. But sometimes you just need someone to listen, you know? I am not looking for advice. I am not looking for solutions. I just need to say it out loud so it stops rattling around in my head. Let me have this. Five minutes of pure unfiltered complaining and then I will be fine. I promise. Just let me vent.",
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
            "Why does everything always land on my desk? There are twenty people in this office and somehow every single problem ends up being my responsibility. Oh, the printer is jammed? Go ask Kenji. The client is angry? Let Kenji handle it. Someone ate the last rice ball in the fridge? Kenji probably knows who did it. I am not a miracle worker. I am just a guy who cannot say no. And that is the real problem.",
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
            "Every single morning I get on that train and every single morning I think this cannot be legal. There are literally so many people crammed in there that my feet do not even touch the floor sometimes. I just float. I am held in place by the bodies around me. And the smell in summer? Do not even get me started. I have considered quitting my job just to avoid the commute. That is how bad it is.",
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
            "That is it. I am done. I have been putting up with this for months and I have reached my limit. I smile at work, I say yes to everything, I stay late, I come in early, and for what? Nobody notices. Nobody says thank you. Nobody even acknowledges that I exist. I am not asking for a trophy. Just a simple hey, good job. Is that too much to ask? Apparently yes. Apparently that is asking for the moon.",
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
            "Okay, I am done. Thank you for sitting through all of that. I know it was a lot but I genuinely feel better. Sometimes you just need someone who will sit there and nod and say that sucks and not try to fix it. You are really good at that. I should probably buy you a drink for putting up with me. Actually, I should probably buy you several drinks. You have earned them.",
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
            "Hold on, hold on. Let me get this straight. Your boss made you redo a sixty page report because she did not like the font? The font. Not the content. Not the data. The font. In what universe is that a reasonable request? If my boss did that to me I would print the whole thing in Comic Sans and hand it to her with a smile. That is absolutely unhinged.",
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
            "Listen, there is nothing wrong with complaining. It is healthy. The people who say they never complain are either lying or about to have a breakdown. This bar exists for a reason. People come here, they have a drink, they let it all out, and they go home feeling lighter. That is the whole point. So complain all you want. That is what friends are for. And that is what beer is for.",
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
            "That sounds incredibly stressful. I cannot even imagine being in that situation. Just hearing about it is making me anxious. You should not have had to deal with that alone. I wish I had known sooner because I would have come and helped. Or at least brought you food. Because that is all I can really offer. Food and moral support. But sometimes that is exactly what you need.",
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
            "I am not going to push you to talk about it if you are not ready. But I want you to know that whenever you are, I am here. Day or night. You can call me at three in the morning and I will pick up. I might sound like a zombie but I will pick up. And if you do not want to talk and you just want someone to sit with you in silence, I can do that too. Whatever you need.",
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
            "I know exactly what that feels like because I went through the same thing last year. You feel stuck. You feel like nothing is going to change. You question every decision you have made. And the worst part is everyone around you keeps saying it will get better but you do not believe them. I get it. I was there. And it did get better but telling you that right now probably does not help. So I will just say I get it.",
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
            "That is messed up. Seriously. No one should have to deal with that kind of treatment. If someone did that to me I honestly do not know how I would react. You handled it way better than I would have. I probably would have lost it right there on the spot. The fact that you kept your cool says a lot about you. But also, it is okay to be upset. You have every right to be angry.",
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
            "In Japanese I can just say un un and nod and the person feels heard. But in English? If I just sit there nodding, people think I am not listening or I do not care. They expect words. Actual sentences. And not just any sentences, the right sentences. The ones that show you actually understand. I freeze every time. By the time I think of what to say, the moment has passed and it just sounds weird.",
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
            "I am going to be honest with you. I do not have any wise words. I do not have advice. I do not have a solution. I just have me. And I know that is not much but I am here and I am not going anywhere. Sometimes the best thing you can say is I do not know what to say because at least it is honest. And honestly, most people do not want answers. They just want to know someone cares.",
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
            "You are always the one taking care of everyone else but who is taking care of you? It is okay to not be okay sometimes. You do not have to have it all together every single day. Take a day off. Stay in bed. Watch something mindless on TV. Eat something unhealthy. Do whatever you need to do to recharge. The world is not going to fall apart if you take one day for yourself.",
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
            "I can tell you have been carrying this by yourself for a while. I know you because you always try to handle everything on your own. But that is not strength. That is stubbornness. Real strength is asking for help when you need it. We are your friends. Let us in. Tell us what is going on. We cannot help if we do not know. And honestly, just saying it out loud makes it feel smaller. I promise.",
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
            "Oh, I have been there. Two years ago the same thing happened to me and I thought my life was over. I am not exaggerating. I could not eat, I could not sleep, I just sat on my couch staring at the ceiling wondering how things went so wrong. And then one day, I woke up and it hurt a little less. And the next day, a little less than that. It does not fix itself overnight but it does get better. Slowly. But definitely.",
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
            "Thank you for sharing that with me. I know that was not easy to say and I know you probably debated whether to tell me or not. But I am really glad you did. It takes courage to be vulnerable and most people do not have that kind of courage. So do not for a second think you are weak for opening up. If anything, it is the opposite. It is the strongest thing you can do.",
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
            "Are you kidding me right now? I specifically told them to use the materials I ordered. I wrote it down. I sent an email. I even called to confirm. And they still used the wrong ones. How? How does that happen? I gave clear instructions three times and they still managed to get it wrong. I am not angry. I am beyond angry. I am in a place where angry does not even begin to cover it.",
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
            "I have explained this five times. Five. Not twice, not three times. Five times. Each time I used different words because I thought maybe the problem was how I was explaining it. But no. The problem is not my explanation. The problem is nobody is listening. I am talking to walls. Actually, walls would be better because at least they do not nod and then do the exact opposite of what I said.",
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
            "I need to take a walk before I say something I am going to regret. I am that angry. My hands are shaking. I can feel my blood pressure going through the roof. The thing that makes it worse is I cannot even yell because I am at work and I have to be professional. So I am just sitting here with a smile on my face while inside I am screaming. Do you know how exhausting it is to be angry and polite at the same time?",
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
            "That is the thing about getting angry in English. In Japanese I can modulate my anger perfectly. I have like fifteen levels between annoyed and furious. But in English? I have two settings. Calm and nuclear. There is no middle ground because I do not have the vocabulary for it yet. So I either sound like I do not care or I sound like I am about to flip a table. There is literally no in-between for me right now.",
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
            "I hear you. I understand why you are angry and you have every right to be. But right now you are in fight mode and if you respond while you are in fight mode you are going to make things worse. Trust me, I have been there. I once sent an email while I was furious and I still cringe about it to this day. So let us take five minutes. Walk around the block. Get some air. Then we will figure this out together with a clear head.",
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
            "I have been patient. I have been understanding. I have given them chance after chance after chance. But there comes a point where enough is enough. And I have reached that point. I am not going to sit here and pretend everything is fine when it clearly is not. Something needs to change and it needs to change today. Not next week. Not after the next meeting. Today. Right now.",
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
            "You know what is worse than being angry? Being disappointed. Anger means you still care. Anger means you still have hope that things can change. But disappointment? That is when you have given up. And that is where I am right now. I am not yelling. I am not slamming doors. I am just tired. Tired of expecting better and getting the same result every single time.",
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
            "I do not think either of us is in the right state of mind to have this conversation right now. We are both heated and if we keep going we are going to say things we do not mean. And once you say something, you cannot unsay it. So here is what I suggest. We take the rest of the day. We sleep on it. And tomorrow morning, we sit down like adults and figure this out. Does that work for you?",
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
            "Here is the thing about getting angry in English. You cannot just say I am angry and expect people to figure out why. You have to spell it out. I am angry because you promised X and delivered Y. I am frustrated because I communicated clearly and was still ignored. The more specific you are, the harder it is for the other person to dismiss your feelings. Vague anger gets ignored. Specific anger gets results.",
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
            "People think anger is always bad but it is not. Anger is your brain telling you that a boundary has been crossed. It is a signal. The problem is not the anger. The problem is when you let it control you instead of the other way around. Feel the anger. Acknowledge it. Then decide how to respond. Not react. Respond. There is a difference. Reacting is a reflex. Responding is a choice. Always choose.",
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
