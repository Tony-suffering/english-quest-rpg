/**
 * The Wedding Weekend Expressions -- speakable expressions from the Wedding scenario
 * 150 expressions across 10 days (15 per day), all commonly used in spoken English.
 */

export interface WeddingExpression {
    expression: string;
    meaning: string;
    meaningEn: string;
    day: number;
    speaker: string;
    example: string;
}

export const WEDDING_EXPRESSIONS: WeddingExpression[] = [
    // ===== DAY 1 =====
    { expression: "put a face to the name", meaning: "名前だけ知っていた人と初めて実際に会う", meaningEn: "to finally meet in person someone you only knew by name", day: 1, speaker: "Yuki", example: "it's so nice to finally put a face to the name" },
    { expression: "thank you for having me", meaning: "招いてくれてありがとう（訪問先での定番の挨拶）", meaningEn: "polite thanks when you arrive as a guest", day: 1, speaker: "Yuki", example: "Thank you for having me." },
    { expression: "I'm a hugger", meaning: "私、すぐハグしちゃうタイプなの", meaningEn: "a warning that you greet people with hugs", day: 1, speaker: "Carol", example: "I'm a hugger, I hope that's okay." },
    { expression: "get in here", meaning: "さあ入って（親しみを込めた歓迎）", meaningEn: "a warm, informal way to welcome someone in", day: 1, speaker: "Carol", example: "Come here, get in here" },
    { expression: "I've heard so much about you", meaning: "あなたのお噂はかねがね", meaningEn: "you already know a lot about someone before meeting them", day: 1, speaker: "Emily", example: "I've heard so much about you." },
    { expression: "losing her mind", meaning: "気が狂いそうなくらいテンパっている", meaningEn: "extremely stressed or overwhelmed", day: 1, speaker: "Emily", example: "the one losing her mind on schedule" },
    { expression: "get in the way", meaning: "邪魔になる", meaningEn: "to be an obstacle or nuisance to others", day: 1, speaker: "Yuki", example: "Please don't let me get in the way this week." },
    { expression: "professional bad influence", meaning: "人を悪い方向に引っ張るのが得意な（冗談めかした自己紹介）", meaningEn: "jokey self-label for someone who leads others into trouble", day: 1, speaker: "Tyson", example: "best man, professional bad influence" },
    { expression: "off to a great start", meaning: "出だし好調、幸先がいい", meaningEn: "beginning something well", day: 1, speaker: "Yuki", example: "so you're off to a great start" },
    { expression: "I like her already", meaning: "もう気に入った", meaningEn: "expressing quick approval of someone", day: 1, speaker: "Uncle Rick", example: "I like her already." },
    { expression: "come find me", meaning: "困ったら私のところに来て", meaningEn: "an offer to help; seek me out if you need me", day: 1, speaker: "Priya", example: "come find me" },
    { expression: "room to breathe", meaning: "落ち着ける余裕、ひと息つける間", meaningEn: "space and time to relax without pressure", day: 1, speaker: "Carol", example: "Let's give her some room to breathe." },
    { expression: "whatever's on her mind", meaning: "思っていることを何でも（口に出す）", meaningEn: "saying anything she is thinking, without a filter", day: 1, speaker: "Chris", example: "She says whatever's on her mind" },
    { expression: "roll with it", meaning: "気にせず流れに合わせる", meaningEn: "go along with a situation instead of fighting it", day: 1, speaker: "Chris", example: "so just roll with it" },
    { expression: "feel right at home", meaning: "自分の家のようにくつろげる", meaningEn: "to feel comfortable and welcome somewhere new", day: 1, speaker: "Yuki", example: "I already feel right at home" },
    // ===== DAY 2 =====
    { expression: "walk you through", meaning: "順を追って説明する", meaningEn: "to explain something step by step", day: 2, speaker: "Denise", example: "let me walk you through the order of the ceremony real quick" },
    { expression: "supposed to", meaning: "～することになっている", meaningEn: "expected or required to do something", day: 2, speaker: "Yuki", example: "where am I supposed to stand" },
    { expression: "follow my lead", meaning: "私のやる通りにして", meaningEn: "do what I do and let me guide you", day: 2, speaker: "Chris", example: "Just follow my lead and you will be fine" },
    { expression: "take your place", meaning: "所定の位置につく", meaningEn: "move to your assigned spot", day: 2, speaker: "Denise", example: "then take your place on the left" },
    { expression: "space out", meaning: "間隔をあける", meaningEn: "leave gaps between people or things", day: 2, speaker: "Priya", example: "so we space out, count to three, and then start walking" },
    { expression: "there is no rush", meaning: "急がなくていい", meaningEn: "there is no need to hurry", day: 2, speaker: "Denise", example: "there is no rush, this is your moment" },
    { expression: "blanked on", meaning: "ど忘れした", meaningEn: "suddenly could not remember something", day: 2, speaker: "Tyson", example: "I completely blanked on my cue" },
    { expression: "your cue", meaning: "あなたの合図・出番", meaningEn: "the signal that it is your turn to act", day: 2, speaker: "Denise", example: "That is your cue" },
    { expression: "all over the place", meaning: "落ち着きがない・ばらばら", meaningEn: "disorganized or scattered", day: 2, speaker: "Nana Jo", example: "because he is all over the place" },
    { expression: "run through it", meaning: "一通り通しでやる", meaningEn: "practice something from start to finish", day: 2, speaker: "Tyson", example: "I just need to run through it one more time" },
    { expression: "running on fumes", meaning: "気力・体力が尽きかけている", meaningEn: "almost out of energy", day: 2, speaker: "Emily", example: "I am running on fumes here" },
    { expression: "come together", meaning: "うまくまとまる", meaningEn: "work out and fall into place", day: 2, speaker: "Dan", example: "It is going to come together, I promise" },
    { expression: "In my day", meaning: "私の若い頃は", meaningEn: "back when I was young", day: 2, speaker: "Nana Jo", example: "In my day we did not rehearse any of this" },
    { expression: "I hear you", meaning: "言いたいことは分かります", meaningEn: "I understand your point (gentle agreement before pushback)", day: 2, speaker: "Denise", example: "I hear you, but a quick run-through saves us a lot of headaches tomorrow" },
    { expression: "keep my head down", meaning: "目立たず大人しくしている", meaningEn: "stay low-key and avoid attention", day: 2, speaker: "Yuki", example: "or just keep my head down and follow along" },
    // ===== DAY 3 =====
    { expression: "short and sweet", meaning: "短く簡潔に、手短で気の利いた", meaningEn: "brief and to the point", day: 3, speaker: "Priya", example: "Keep it short and sweet." },
    { expression: "wing it", meaning: "ぶっつけ本番でやる、アドリブでこなす", meaningEn: "to do something without preparation", day: 3, speaker: "Chris", example: "Some people wing it." },
    { expression: "test the waters", meaning: "様子をうかがう、反応を探る", meaningEn: "to cautiously check how people will react", day: 3, speaker: "Tyson", example: "let me just test the waters here" },
    { expression: "go way back", meaning: "昔からの長い付き合いだ", meaningEn: "to have known each other for a long time", day: 3, speaker: "Tyson", example: "Dan and I go way back" },
    { expression: "take to the grave", meaning: "墓場まで持っていく、絶対に秘密にする", meaningEn: "to keep a secret forever", day: 3, speaker: "Tyson", example: "we swore we would take to the grave" },
    { expression: "read the room", meaning: "空気を読む、場の雰囲気を察する", meaningEn: "to sense the mood and act appropriately", day: 3, speaker: "Emily", example: "Read the room." },
    { expression: "keep it PG", meaning: "健全な内容にする、際どい話は避ける", meaningEn: "to keep it clean and family-friendly", day: 3, speaker: "Tyson", example: "I'll keep it PG, I promise." },
    { expression: "can't help it", meaning: "どうしても抑えられない、我慢できない", meaningEn: "unable to stop yourself", day: 3, speaker: "Carol", example: "I can't help it" },
    { expression: "tearing up", meaning: "涙ぐむ、うるっとくる", meaningEn: "starting to cry a little", day: 3, speaker: "Carol", example: "I'm already tearing up" },
    { expression: "save some tears for tomorrow", meaning: "涙は明日まで取っておいて", meaningEn: "a warm joke telling someone not to cry yet", day: 3, speaker: "Dan", example: "save some tears for tomorrow" },
    { expression: "overshares", meaning: "話しすぎる、余計なことまで言う", meaningEn: "to reveal too much private information", day: 3, speaker: "Nana Jo", example: "He overshares every single year." },
    { expression: "you get used to it", meaning: "そのうち慣れるよ", meaningEn: "you will adjust to it over time", day: 3, speaker: "Nana Jo", example: "You get used to it, dear." },
    { expression: "reel it back in", meaning: "脱線した話を元に戻す、抑える", meaningEn: "to bring something back under control", day: 3, speaker: "Priya", example: "let's reel it back in" },
    { expression: "lead with that", meaning: "最初にそれから始める、それを一番に持ってくる", meaningEn: "to open with your strongest point", day: 3, speaker: "Emily", example: "Why couldn't you just lead with that?" },
    { expression: "a piece of cake", meaning: "朝飯前、楽勝", meaningEn: "very easy to do", day: 3, speaker: "Yuki", example: "the wedding is going to be a piece of cake." },
    // ===== DAY 4 =====
    { expression: "how do you know the couple", meaning: "新郎新婦とはどういうご関係で？", meaningEn: "the standard question strangers ask each other at a wedding", day: 4, speaker: "Priya", example: "So, Yuki -- how do you know the couple?" },
    { expression: "such a haul", meaning: "すごく長い道のり・長旅", meaningEn: "a long, tiring journey", day: 4, speaker: "Priya", example: "That is such a haul." },
    { expression: "run on coffee", meaning: "コーヒーだけで動いている、コーヒーで持っている", meaningEn: "to keep going on nothing but coffee", day: 4, speaker: "Priya", example: "I basically run on coffee this weekend." },
    { expression: "how'd you two lovebirds meet", meaning: "君たち二人はどうやって出会ったの？", meaningEn: "a teasing way to ask a couple how they met", day: 4, speaker: "Uncle Rick", example: "So how'd you two lovebirds meet?" },
    { expression: "the short version is", meaning: "手短に言うと、要するに", meaningEn: "a way to give a quick summary instead of the full story", day: 4, speaker: "Yuki", example: "It's a long story, but the short version is he wouldn't stop talking to me." },
    { expression: "that's a Miller man for you", meaning: "まさにミラー家の男らしいよ（あるあるだね）", meaningEn: "that is so typical of that kind of person", day: 4, speaker: "Uncle Rick", example: "Ha, that's a Miller man for you." },
    { expression: "let me grab you a", meaning: "～を取ってきてあげるよ", meaningEn: "a friendly offer to fetch someone a drink or food", day: 4, speaker: "Uncle Rick", example: "Let me grab you a mimosa -- you can't do brunch dry." },
    { expression: "I'm okay for now", meaning: "今のところ大丈夫です（丁寧な断り）", meaningEn: "a polite way to decline for the moment", day: 4, speaker: "Yuki", example: "I'm okay for now, thank you -- maybe in a bit." },
    { expression: "maybe in a bit", meaning: "またあとで（かもしれない）", meaningEn: "a soft hedge meaning perhaps a little later", day: 4, speaker: "Yuki", example: "I'm okay for now, thank you -- maybe in a bit." },
    { expression: "be done with it", meaning: "それで終わりにしなさい、済ませてしまいなさい", meaningEn: "to finish something and stop worrying about it", day: 4, speaker: "Nana Jo", example: "Just say you're one of us and be done with it." },
    { expression: "I don't want to overstep", meaning: "出しゃばりたくない、でしゃばりたくない", meaningEn: "not wanting to do more than is welcome", day: 4, speaker: "Yuki", example: "I don't want to overstep." },
    { expression: "make small talk", meaning: "世間話をする、当たり障りのない雑談をする", meaningEn: "to have light, casual conversation", day: 4, speaker: "Nana Jo", example: "Now go make small talk before Rick corners you again." },
    { expression: "I'll be right back", meaning: "すぐ戻ります", meaningEn: "a polite way to briefly leave a conversation", day: 4, speaker: "Emily", example: "Two seconds, I'll be right back." },
    { expression: "graceful exit", meaning: "さりげない・角の立たない立ち去り方", meaningEn: "a smooth, polite way to end a conversation", day: 4, speaker: "Chris", example: "You just did the whole thing -- intro, small talk, graceful exit." },
    { expression: "do my rounds", meaning: "一通り挨拶して回る、挨拶回りをする", meaningEn: "to go around greeting everyone at an event", day: 4, speaker: "Priya", example: "Anyway, I should go do my rounds, but let's actually catch up later -- find me at the reception." },
    // ===== DAY 5 =====
    { expression: "lock down", meaning: "きっちり確定させる、詰める", meaningEn: "to finalize something firmly so it cannot change", day: 5, speaker: "Priya", example: "We need to lock down the seating chart tonight or I am going to lose my mind." },
    { expression: "lose my mind", meaning: "気が変になる、もう限界", meaningEn: "to become extremely stressed or frustrated", day: 5, speaker: "Priya", example: "We need to lock down the seating chart tonight or I am going to lose my mind." },
    { expression: "I hear you", meaning: "言いたいことは分かる（でも）", meaningEn: "acknowledging someone before you push back", day: 5, speaker: "Emily", example: "I hear you, but we cannot put Aunt Linda anywhere near Uncle Rick." },
    { expression: "have not spoken since", meaning: "〜以来ずっと口をきいていない", meaningEn: "describing a long-running rift between people", day: 5, speaker: "Emily", example: "They have not spoken since Christmas." },
    { expression: "For the record", meaning: "はっきり言っておくけど", meaningEn: "to state your side clearly for the future", day: 5, speaker: "Uncle Rick", example: "For the record, that was a total misunderstanding, and the gravy was not entirely my fault." },
    { expression: "as long as", meaning: "〜さえすれば、〜という条件なら", meaningEn: "stating the one condition you require", day: 5, speaker: "Nana Jo", example: "I do not care who I sit with, as long as you put me right next to the cake." },
    { expression: "a little awkward", meaning: "ちょっと気まずい", meaningEn: "softening bad or uncomfortable news", day: 5, speaker: "Dan", example: "Um, so, this is a little awkward, but my ex just RSVP'd yes." },
    { expression: "at this point", meaning: "今さら、この期に及んで", meaningEn: "given how late or far along things are", day: 5, speaker: "Emily", example: "Who even invited her at this point?" },
    { expression: "In my defense", meaning: "弁解させてもらうと", meaningEn: "prefacing an excuse for something you did", day: 5, speaker: "Tyson", example: "In my defense, I may have told her the more the merrier before I knew the whole backstory." },
    { expression: "the more the merrier", meaning: "人は多いほど楽しい", meaningEn: "the classic phrase welcoming extra guests", day: 5, speaker: "Tyson", example: "I may have told her the more the merrier before I knew the whole backstory." },
    { expression: "point fingers", meaning: "人のせいにする、犯人探しをする", meaningEn: "to blame people instead of solving the problem", day: 5, speaker: "Priya", example: "Okay, let us not point fingers." },
    { expression: "getting stuck with", meaning: "〜と一緒にされて困る、押し付けられる", meaningEn: "being forced into unwanted company", day: 5, speaker: "Chris", example: "You are not getting stuck with the randoms." },
    { expression: "step on anyone's toes", meaning: "人の気分を害する、領分を侵す", meaningEn: "to upset someone by overstepping", day: 5, speaker: "Yuki", example: "I do not want to step on anyone's toes, so honestly, wherever you need me, I am happy." },
    { expression: "straight to the point", meaning: "単刀直入、回りくどくない", meaningEn: "direct, without wasting words", day: 5, speaker: "Tyson", example: "Cake, no drama, straight to the point." },
    { expression: "You are a lifesaver", meaning: "本当に助かった、救世主だ", meaningEn: "warm thanks for someone who rescued you", day: 5, speaker: "Emily", example: "You are a lifesaver, Priya." },
    // ===== DAY 6 =====
    { expression: "keep it moving", meaning: "テンポよくどんどん進める", meaningEn: "keep making progress without slowing down", day: 6, speaker: "Priya", example: "hair and makeup, let's keep it moving" },
    { expression: "I can't feel my hands", meaning: "緊張しすぎて手の感覚がない", meaningEn: "said when you are extremely nervous", day: 6, speaker: "Emily", example: "I can't feel my hands. Is that normal?" },
    { expression: "You've got this", meaning: "あなたなら大丈夫、いける", meaningEn: "an encouraging you-can-do-it phrase", day: 6, speaker: "Priya", example: "and let it out. You've got this." },
    { expression: "promised myself I wouldn't cry", meaning: "泣かないと自分に誓ったのに", meaningEn: "said when you tear up despite trying not to", day: 6, speaker: "Carol", example: "I promised myself I wouldn't cry and here I go already." },
    { expression: "mess up your makeup", meaning: "メイクを崩す", meaningEn: "to ruin makeup that has been applied", day: 6, speaker: "Yuki", example: "look up so it doesn't mess up your makeup" },
    { expression: "How did that even happen", meaning: "なんでこんなことになったの？", meaningEn: "surprised reaction to an unexpected problem", day: 6, speaker: "Emily", example: "How did that even happen?" },
    { expression: "Don't panic", meaning: "慌てないで、落ち着いて", meaningEn: "calm-down reassurance in an emergency", day: 6, speaker: "Priya", example: "Don't panic. It's tiny." },
    { expression: "dab, don't rub", meaning: "擦らずに叩くように取る", meaningEn: "how to treat a stain without spreading it", day: 6, speaker: "Yuki", example: "dab, don't rub, or it spreads" },
    { expression: "you're a lifesaver", meaning: "本当に助かった、命の恩人", meaningEn: "big thanks to someone who just helped you", day: 6, speaker: "Priya", example: "Yuki, you're a lifesaver." },
    { expression: "we have a situation", meaning: "ちょっと問題が発生した", meaningEn: "a light way to announce a small crisis", day: 6, speaker: "Chris", example: "Guys, we have a situation." },
    { expression: "cold feet", meaning: "土壇場での弱気、マリッジブルー", meaningEn: "last-minute nervousness before a big commitment", day: 6, speaker: "Chris", example: "like, cold feet, big time" },
    { expression: "blank on the vows", meaning: "誓いの言葉が頭から飛ぶ", meaningEn: "to suddenly forget what you were going to say", day: 6, speaker: "Dan", example: "What if I blank on the vows?" },
    { expression: "just nerves talking", meaning: "それはただの緊張のせい", meaningEn: "reassurance that fear, not truth, is speaking", day: 6, speaker: "Chris", example: "look at me -- it's just nerves talking." },
    { expression: "one step at a time", meaning: "焦らず一歩ずつ", meaningEn: "advice to handle things gradually, not all at once", day: 6, speaker: "Chris", example: "Just breathe and take it one step at a time." },
    { expression: "couldn't ask for a better crew", meaning: "これ以上ないメンバーだ", meaningEn: "warm praise for the people helping you", day: 6, speaker: "Emily", example: "thank you -- I couldn't ask for a better crew." },
    // ===== DAY 7 =====
    { expression: "welling up", meaning: "目に涙が込み上げてくる", meaningEn: "tears starting to fill your eyes", day: 7, speaker: "Yuki", example: "Oh no, the music just started and I am already welling up." },
    { expression: "not what they used to be", meaning: "昔ほど良く（丈夫で）はない", meaningEn: "no longer as good or strong as before", day: 7, speaker: "Nana Jo", example: "My knees are not what they used to be." },
    { expression: "walking down the aisle", meaning: "バージンロードを歩く（結婚する）", meaningEn: "the bride's walk at a wedding; also means getting married", day: 7, speaker: "Chris", example: "Here she comes, walking down the aisle right now." },
    { expression: "cleans up nice", meaning: "身なりを整えると見違えるほど綺麗", meaningEn: "looks surprisingly good when dressed up", day: 7, speaker: "Nana Jo", example: "She cleans up nice, I always said she would." },
    { expression: "losing it", meaning: "感情を抑えきれなくなっている", meaningEn: "breaking down emotionally, unable to stay composed", day: 7, speaker: "Yuki", example: "Chris, your dad is losing it." },
    { expression: "hold it together", meaning: "気持ちを保って崩れずにいる", meaningEn: "stay composed and not break down", day: 7, speaker: "Yuki", example: "He is trying to hold it together but he is completely gone." },
    { expression: "went right out of my head", meaning: "すっかり頭から抜けてしまった", meaningEn: "completely forgot in the moment", day: 7, speaker: "Dan", example: "Sorry, I had a whole speech and it just went right out of my head." },
    { expression: "take your time", meaning: "焦らなくていいよ、ゆっくりで", meaningEn: "no rush, go at your own pace", day: 7, speaker: "Emily", example: "Take your time." },
    { expression: "for better or for worse", meaning: "良い時も悪い時も（誓いの言葉）", meaningEn: "traditional wedding vow phrase, in good and bad times", day: 7, speaker: "Emily", example: "I, Emily, take you, Dan, for better or for worse, and honestly you got the better end of this deal." },
    { expression: "got the better end of this deal", meaning: "この取引で得をした方だ", meaningEn: "came out ahead in an exchange or arrangement", day: 7, speaker: "Emily", example: "honestly you got the better end of this deal." },
    { expression: "a keeper", meaning: "手放しちゃいけない相手", meaningEn: "someone worth holding onto", day: 7, speaker: "Nana Jo", example: "Now that is what I call a keeper." },
    { expression: "False alarm", meaning: "なんでもなかった、誤報だった", meaningEn: "the worry turned out to be nothing", day: 7, speaker: "Tyson", example: "False alarm, everybody, we are good." },
    { expression: "By the power vested in him", meaning: "（司祭に）授けられた権限により", meaningEn: "formal phrase an officiant uses to marry a couple", day: 7, speaker: "Dan", example: "By the power vested in him, the officiant just said I can kiss the bride, so I am going to." },
    { expression: "It is about time", meaning: "やっとだ、ようやくだ", meaningEn: "finally, this should have happened sooner", day: 7, speaker: "Nana Jo", example: "It is about time." },
    { expression: "file out", meaning: "列になって退場する", meaningEn: "leave in an orderly line", day: 7, speaker: "Chris", example: "Come on, let us file out and throw some of this confetti." },
    // ===== DAY 8 =====
    { expression: "keep this short", meaning: "手短に済ませる", meaningEn: "a polite promise not to speak too long, used to open a toast", day: 8, speaker: "Priya", example: "I promise I'll keep this short." },
    { expression: "I first met", meaning: "私が初めて会ったのは", meaningEn: "the standard opening for a speech about how you know someone", day: 8, speaker: "Priya", example: "I first met Emily in our college dorm" },
    { expression: "on behalf of", meaning: "〜を代表して", meaningEn: "speaking for a whole group, formal toast phrasing", day: 8, speaker: "Priya", example: "So on behalf of everyone here" },
    { expression: "please raise your glasses", meaning: "グラスを掲げてください", meaningEn: "the classic cue to make a toast", day: 8, speaker: "Priya", example: "please raise your glasses to the most organized bride I know" },
    { expression: "went completely off the rails", meaning: "完全に脱線した / めちゃくちゃになった", meaningEn: "went badly out of control", day: 8, speaker: "Chris", example: "Tyson's rehearsal toast went completely off the rails" },
    { expression: "brace yourself", meaning: "心の準備をしとけ", meaningEn: "get ready for something unpleasant or shocking", day: 8, speaker: "Chris", example: "Brace yourself." },
    { expression: "I've known Dan since", meaning: "ダンとは〜からの付き合いで", meaningEn: "the go-to opener for a best-man toast", day: 8, speaker: "Tyson", example: "I've known Dan since we were eight" },
    { expression: "bailed me out", meaning: "窮地から助け出してくれた", meaningEn: "rescued me from trouble", day: 8, speaker: "Tyson", example: "he has bailed me out of more trouble than I can count" },
    { expression: "she was the one", meaning: "彼女が運命の人だ", meaningEn: "she was the right person to marry", day: 8, speaker: "Tyson", example: "that's how I knew she was the one" },
    { expression: "if you'd all raise your glasses", meaning: "みなさんグラスを掲げてくれたら", meaningEn: "polite lead-in to the final toast line", day: 8, speaker: "Tyson", example: "So if you'd all raise your glasses" },
    { expression: "here's to", meaning: "〜に乾杯", meaningEn: "the phrase that names who or what you toast", day: 8, speaker: "Tyson", example: "here's to Dan and Emily" },
    { expression: "pulled it off", meaning: "ちゃんとやり切った / 成功させた", meaningEn: "succeeded at something difficult", day: 8, speaker: "Yuki", example: "he actually pulled it off" },
    { expression: "see that coming", meaning: "予想する / 予期する", meaningEn: "to have expected something (usually negative here as 'did not see it coming')", day: 8, speaker: "Emily", example: "I did not see that coming from Tyson" },
    { expression: "bear with me", meaning: "大目に見て / 少し我慢して聞いて", meaningEn: "please be patient with me for a moment", day: 8, speaker: "Dan", example: "so bear with me" },
    { expression: "out of my league", meaning: "自分には釣り合わない / もったいない相手", meaningEn: "far better than I deserve, too good for me", day: 8, speaker: "Dan", example: "you are so far out of my league" },
    // ===== DAY 9 =====
    { expression: "grab my hand", meaning: "手を取って（一緒に来て）", meaningEn: "an inviting way to pull someone along with you", day: 9, speaker: "Chris", example: "grab my hand, we are getting out there" },
    { expression: "having the time of their lives", meaning: "人生で最高に楽しんでいる", meaningEn: "enjoying themselves more than ever", day: 9, speaker: "Chris", example: "Everyone is three drinks in and having the time of their lives" },
    { expression: "sitting this one out", meaning: "これは参加せずに見送る", meaningEn: "choosing not to join this particular activity", day: 9, speaker: "Emily", example: "you are not sitting this one out" },
    { expression: "a free-for-all", meaning: "何でもあり、無礼講の状態", meaningEn: "an open situation with no rules where anyone can join", day: 9, speaker: "Emily", example: "so now it is a free-for-all" },
    { expression: "pace yourself", meaning: "ペースを抑えて（飲みすぎ・やりすぎ注意）", meaningEn: "slow down so you do not burn out or overdo it", day: 9, speaker: "Tyson", example: "maybe pace yourself" },
    { expression: "keep them coming", meaning: "どんどん出して（お代わりを続けて）", meaningEn: "asking someone to keep serving more, one after another", day: 9, speaker: "Uncle Rick", example: "Bartender, keep them coming" },
    { expression: "cut that man off", meaning: "あの人にはもう酒を出すな", meaningEn: "stop serving someone more alcohol", day: 9, speaker: "Nana Jo", example: "Somebody cut that man off before he pulls a hamstring" },
    { expression: "heads up", meaning: "ちょっと注目、知らせておくね", meaningEn: "a warning that something is about to happen", day: 9, speaker: "Priya", example: "Okay, heads up everyone" },
    { expression: "throw the bouquet", meaning: "ブーケを投げる（ブーケトス）", meaningEn: "the wedding tradition of tossing the bouquet to single guests", day: 9, speaker: "Priya", example: "Emily is about to throw the bouquet" },
    { expression: "Just go with it", meaning: "流れに任せて、逆らわないで", meaningEn: "stop resisting and let the moment happen", day: 9, speaker: "Chris", example: "Just go with it, put your hands up" },
    { expression: "no take-backs", meaning: "もう取り消しなし、後戻りなし", meaningEn: "you cannot undo it, it is final", day: 9, speaker: "Uncle Rick", example: "Welcome to the family, no take-backs" },
    { expression: "one of us", meaning: "私たちの仲間、一員", meaningEn: "now part of our group or family", day: 9, speaker: "Emily", example: "You are one of us" },
    { expression: "killing it", meaning: "すごくうまくやっている", meaningEn: "doing something really well", day: 9, speaker: "Chris", example: "You are killing it out here" },
    { expression: "having a blast", meaning: "めちゃくちゃ楽しんでいる", meaningEn: "having a great, fun time", day: 9, speaker: "Yuki", example: "I am actually having a blast" },
    { expression: "Loosen up", meaning: "肩の力を抜いて、リラックスして", meaningEn: "relax and stop being so tense", day: 9, speaker: "Nana Jo", example: "Loosen up and dance, sweetheart" },
    // ===== DAY 10 =====
    { expression: "hair of the dog", meaning: "迎え酒（二日酔いに迎え酒をあおること）", meaningEn: "another drink to cure a hangover", day: 10, speaker: "Uncle Rick", example: "I would not turn down a little hair of the dog." },
    { expression: "swap numbers", meaning: "連絡先（電話番号）を交換する", meaningEn: "exchange phone numbers", day: 10, speaker: "Emily", example: "we have to swap numbers, because I refuse to lose track of you." },
    { expression: "lose track of you", meaning: "あなたと連絡が取れなくなる／見失う", meaningEn: "stop being in contact with someone over time", day: 10, speaker: "Emily", example: "because I refuse to lose track of you." },
    { expression: "come visit us", meaning: "うちに遊びに来て", meaningEn: "an open invitation to visit someone's home", day: 10, speaker: "Yuki", example: "you have to promise to come visit us in Tokyo." },
    { expression: "show up on your doorstep", meaning: "前触れもなく玄関先に押しかける", meaningEn: "arrive at someone's home, often unannounced", day: 10, speaker: "Dan", example: "we will actually show up on your doorstep with luggage." },
    { expression: "I am holding you to that", meaning: "その約束、ちゃんと守ってもらうからね", meaningEn: "I will make sure you keep that promise", day: 10, speaker: "Yuki", example: "I am holding you to that." },
    { expression: "My couch is yours", meaning: "うちのソファはいつでも使っていいよ（泊まっていって）", meaningEn: "an offer to let someone stay over anytime", day: 10, speaker: "Yuki", example: "My couch is yours whenever you want it." },
    { expression: "one of us now", meaning: "もう私たちの仲間だよ", meaningEn: "you belong to our group or family now", day: 10, speaker: "Carol", example: "you are one of us now, no take-backs." },
    { expression: "no take-backs", meaning: "取り消しナシ、後戻りナシ", meaningEn: "this cannot be undone or reversed", day: 10, speaker: "Carol", example: "you are one of us now, no take-backs." },
    { expression: "feel at home", meaning: "くつろぐ、居心地よく感じる", meaningEn: "feel comfortable and welcome somewhere", day: 10, speaker: "Yuki", example: "Thank you for making me feel at home." },
    { expression: "for the record", meaning: "念のため言っておくけど、はっきりさせておくと", meaningEn: "said before stating something you want noted", day: 10, speaker: "Tyson", example: "For the record, I nailed that toast last night" },
    { expression: "pulled it off", meaning: "見事にやり遂げた、うまくやってのけた", meaningEn: "succeeded at something difficult", day: 10, speaker: "Priya", example: "We are all just quietly relieved you pulled it off." },
    { expression: "I am all ears", meaning: "しっかり聞いてます、耳を傾けてます", meaningEn: "I am listening closely", day: 10, speaker: "Yuki", example: "I am all ears." },
    { expression: "taking in a total stranger", meaning: "見ず知らずの他人を迎え入れる", meaningEn: "welcoming someone you did not know", day: 10, speaker: "Yuki", example: "Thank you, all of you, for taking in a total stranger." },
    { expression: "do not you dare be a stranger", meaning: "音信不通になったりしないでよ（また連絡してね）", meaningEn: "stay in touch, do not disappear", day: 10, speaker: "Emily", example: "do not you dare be a stranger, okay?" },
];

export const WEDDING_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_WEDDING_EXPRESSIONS = WEDDING_EXPRESSIONS.length;

export const WEDDING_DAY_IDS: Record<number, string> = {
    1: 'wedding-day1',
    2: 'wedding-day2',
    3: 'wedding-day3',
    4: 'wedding-day4',
    5: 'wedding-day5',
    6: 'wedding-day6',
    7: 'wedding-day7',
    8: 'wedding-day8',
    9: 'wedding-day9',
    10: 'wedding-day10',
};

export function findWeddingExpressionLineIndex(
    expression: string,
    speaker: string,
    conversationLines: Array<{ speaker: string; text: string }>
): number {
    const exprLower = expression.toLowerCase();
    return conversationLines.findIndex(line => {
        const textLower = line.text.toLowerCase();
        return textLower.includes(exprLower) && textLower.startsWith(`${speaker.toLowerCase()}:`);
    });
}
