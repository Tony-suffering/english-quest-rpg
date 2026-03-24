/**
 * Tokyo 52 Episode 2 Expressions -- spoken English from "The Regular"
 * Tracked separately from idiom list (no overlap with used-idioms.json)
 * 75 expressions across 5 days, all commonly used in spoken English
 */

import { Tokyo52Expression } from './tokyo52-ep01-expressions';

export const TOKYO52_EP02_EXPRESSIONS: Tokyo52Expression[] = [
    // ============================================================
    // DAY 1 -- THE RETURN (15 expressions)
    // Yuki orders in English, meets Takeshi, shared struggle
    // ============================================================
    { expression: "I'm back", meaning: "また来ました", meaningEn: "announcing your return to a place or person", day: 1, speaker: "Yuki", example: "Hi. I'm -- I'm back." },
    { expression: "took you a week", meaning: "一週間かかったな", meaningEn: "noting how long someone took to return or complete something", day: 1, speaker: "Master Gondo", example: "Mm. Took you a week." },
    { expression: "I needed some time", meaning: "ちょっと時間が必要だった", meaningEn: "explaining that you required a period to think or recover", day: 1, speaker: "Yuki", example: "Sorry, I was... I needed some time. To think." },
    { expression: "that's answer enough", meaning: "それで十分な答えだ", meaningEn: "accepting an action as a sufficient response without more words", day: 1, speaker: "Master Gondo", example: "You're here. That's answer enough for now." },
    { expression: "what'll you have?", meaning: "何にする？", meaningEn: "casual way to ask someone what they want to order", day: 1, speaker: "Master Gondo", example: "What'll you have?" },
    { expression: "I wanted to try", meaning: "やってみたかった", meaningEn: "expressing a desire to attempt something new or challenging", day: 1, speaker: "Yuki", example: "I just -- I wanted to try ordering in English." },
    { expression: "it's not weird, it's practice", meaning: "変じゃない、練習だ", meaningEn: "reframing an awkward action as legitimate effort", day: 1, speaker: "Master Gondo", example: "It's not weird. It's practice." },
    { expression: "that's kind of brave", meaning: "ちょっと勇気あるね", meaningEn: "complimenting someone's courage in an understated way", day: 1, speaker: "Takeshi", example: "Actually, I think that's kind of brave." },
    { expression: "I come here pretty often", meaning: "ここ結構来るよ", meaningEn: "describing yourself as a regular at a place", day: 1, speaker: "Takeshi", example: "I come here pretty often." },
    { expression: "I totally get it", meaning: "すごいわかる", meaningEn: "expressing complete understanding and empathy", day: 1, speaker: "Takeshi", example: "The English thing, I totally get it." },
    { expression: "they just disappear", meaning: "消えるんだよね", meaningEn: "describing how knowledge vanishes when you need it most", day: 1, speaker: "Takeshi", example: "They just disappear. Yeah." },
    { expression: "I can barely hold a conversation", meaning: "まともに会話できない", meaningEn: "admitting difficulty with even basic communication", day: 1, speaker: "Takeshi", example: "I passed Eiken Pre-1 but I can barely hold a conversation." },
    { expression: "not pathetic, honest", meaning: "情けなくない、正直だ", meaningEn: "reframing vulnerability as authenticity", day: 1, speaker: "Master Gondo", example: "Not pathetic. Honest. That's where it starts." },
    { expression: "can I try too?", meaning: "俺もやっていい？", meaningEn: "asking to participate in what someone else is doing", day: 1, speaker: "Takeshi", example: "Can I try ordering in English too?" },
    { expression: "my heart is pounding", meaning: "心臓バクバク", meaningEn: "describing the physical sensation of nervousness or excitement", day: 1, speaker: "Takeshi", example: "My heart is pounding." },

    // ============================================================
    // DAY 2 -- LUNCH WITH AYA (15 expressions)
    // Yuki tells Aya about the izakaya, textbook English fails
    // ============================================================
    { expression: "I've been going to", meaning: "最近通ってる", meaningEn: "describing a new habit or routine you've recently started", day: 2, speaker: "Yuki", example: "So I've been going to this izakaya." },
    { expression: "this is going to sound insane", meaning: "信じられないと思うけど", meaningEn: "prefacing something surprising to prepare the listener", day: 2, speaker: "Yuki", example: "OK, this is going to sound insane, but he got a perfect score on TOEIC twelve times." },
    { expression: "I'm intrigued", meaning: "気になるね", meaningEn: "expressing genuine interest and curiosity about something", day: 2, speaker: "Aya", example: "OK, I'm intrigued. What does he mean by that?" },
    { expression: "he's not wrong", meaning: "間違ってはないよね", meaningEn: "reluctantly agreeing while not fully committing to the statement", day: 2, speaker: "Aya", example: "Hmm. I mean, he's not wrong." },
    { expression: "what's his method?", meaning: "方法論は何？", meaningEn: "asking about someone's approach or strategy", day: 2, speaker: "Aya", example: "But here's my question -- can an izakaya actually help you speak better? Like, what's his method?" },
    { expression: "it feels OK to mess up", meaning: "失敗してもOKって思える", meaningEn: "describing an environment where mistakes are accepted", day: 2, speaker: "Yuki", example: "He creates this space where it feels OK to mess up." },
    { expression: "that's actually kind of genius", meaning: "実はすごく賢いやり方だね", meaningEn: "recognizing hidden brilliance in a simple approach", day: 2, speaker: "Aya", example: "That's actually kind of genius." },
    { expression: "we were both sitting there", meaning: "二人して座ってた", meaningEn: "describing a shared experience of being in the same situation", day: 2, speaker: "Yuki", example: "We were both sitting there with our hearts racing just from ordering food." },
    { expression: "it sounds depressing", meaning: "悲しく聞こえる", meaningEn: "pointing out that a description has a negative tone", day: 2, speaker: "Yuki", example: "Don't say it like that. It sounds depressing." },
    { expression: "English for tests, not for people", meaning: "テストのための英語、人のためじゃない", meaningEn: "criticizing education that prioritizes exams over real communication", day: 2, speaker: "Aya", example: "They teach you English for tests. Not English for people." },
    { expression: "do you have this in stock?", meaning: "これ在庫ある？", meaningEn: "natural casual way to ask about product availability", day: 2, speaker: "Aya", example: "Nobody in real life says 'I would like to inquire.' They say 'hey, do you have this in stock?'" },
    { expression: "he talked to you like one", meaning: "人間として話しかけてくれた", meaningEn: "noting that someone treated you as a real person, not a formality", day: 2, speaker: "Aya", example: "He's a human being, not a textbook. And he talked to you like one." },
    { expression: "don't feel stupid, feel motivated", meaning: "恥ずかしがらないで、やる気にして", meaningEn: "reframing embarrassment as a driver for improvement", day: 2, speaker: "Aya", example: "Don't feel stupid. Feel motivated." },
    { expression: "you've already figured out the gap", meaning: "ギャップに気づいたんだから", meaningEn: "recognizing that awareness of a problem is the first step to solving it", day: 2, speaker: "Aya", example: "You've already figured out the gap -- now you just need to close it." },
    { expression: "buy me a drink first", meaning: "まず一杯おごって", meaningEn: "playful condition-setting before agreeing to something", day: 2, speaker: "Aya", example: "Maybe. Buy me a drink first." },

    // ============================================================
    // DAY 3 -- THE NEW GUY (15 expressions)
    // Kenji arrives, Yuki helps him, growth moment
    // ============================================================
    { expression: "is this seat taken?", meaning: "ここ空いてますか？", meaningEn: "polite way to ask if you can sit somewhere in a shared space", day: 3, speaker: "Kenji", example: "Excuse me, is this seat taken?" },
    { expression: "whatever's strong", meaning: "何か強いやつ", meaningEn: "ordering alcohol without caring about the specifics, just wanting it potent", day: 3, speaker: "Kenji", example: "Can I get a -- whatever's strong. I don't care." },
    { expression: "I haven't done this since", meaning: "〜以来やってない", meaningEn: "marking a long gap since you last did something", day: 3, speaker: "Kenji", example: "I haven't spoken English since high school." },
    { expression: "welcome to the club", meaning: "ようこそ、同好会へ", meaningEn: "humorously welcoming someone who shares your unfortunate situation", day: 3, speaker: "Takeshi", example: "Welcome to the club." },
    { expression: "we're in the same boat", meaning: "同じ状況にいる", meaningEn: "pointing out that you share the same struggle with someone", day: 3, speaker: "Yuki", example: "We're both in the same boat." },
    { expression: "just drink and complain?", meaning: "飲んで愚痴言うだけ？", meaningEn: "skeptically asking if an activity has real substance", day: 3, speaker: "Kenji", example: "So what do you guys do here? Just... drink and complain about English?" },
    { expression: "it sounds so simple but", meaning: "すごく単純に聞こえるけど", meaningEn: "acknowledging that something appears easy but is actually very difficult", day: 3, speaker: "Yuki", example: "It sounds so simple but it's the hardest part, honestly." },
    { expression: "the worst that happens is", meaning: "最悪でも〜だけ", meaningEn: "minimizing risk to encourage someone to take action", day: 3, speaker: "Yuki", example: "Here, the worst that happens is your beer gets warm." },
    { expression: "don't think too hard about it", meaning: "考えすぎないで", meaningEn: "encouraging someone to act instinctively rather than overthinking", day: 3, speaker: "Yuki", example: "Just pick something from the menu and say it in English. Don't think too hard about it." },
    { expression: "is that right?", meaning: "これで合ってる？", meaningEn: "checking if what you just said was correct", day: 3, speaker: "Kenji", example: "The grilled fish? Is that right?" },
    { expression: "he understood you", meaning: "通じたよ", meaningEn: "confirming that communication was successful despite imperfection", day: 3, speaker: "Yuki", example: "See? He understood you." },
    { expression: "it just has to get through", meaning: "伝わればいい", meaningEn: "prioritizing communication over perfection in language use", day: 3, speaker: "Yuki", example: "It doesn't have to be perfect. It just has to get through." },
    { expression: "did you sound like this?", meaning: "こんな感じだった？", meaningEn: "asking someone about their past self for comparison", day: 3, speaker: "Kenji", example: "A week ago, did you sound like this? This confident?" },
    { expression: "I stopped waiting until I felt ready", meaning: "準備ができるまで待つのをやめた", meaningEn: "deciding to act despite not feeling prepared", day: 3, speaker: "Yuki", example: "I'm still not confident. I just decided to stop waiting until I felt ready." },
    { expression: "ready never comes", meaning: "「準備ができた」は永遠に来ない", meaningEn: "the realization that waiting to feel prepared is an endless trap", day: 3, speaker: "Takeshi", example: "That's the thing nobody tells you. Ready never comes." },

    // ============================================================
    // DAY 4 -- THE BRIDGE (15 expressions)
    // Lisa on Japanese vs English thinking, yoroshiku, sumimasen
    // ============================================================
    { expression: "small world", meaning: "世間って狭い", meaningEn: "exclaiming about an unexpected coincidence or connection", day: 4, speaker: "Lisa", example: "Yuki? Oh wow, small world." },
    { expression: "someone at work mentioned it", meaning: "会社の人に聞いて", meaningEn: "explaining how you heard about a place through a colleague", day: 4, speaker: "Lisa", example: "Is this Noren? Someone at work mentioned it." },
    { expression: "it's not as simple as people think", meaning: "みんなが思うほど単純じゃない", meaningEn: "correcting an oversimplified assumption about a topic", day: 4, speaker: "Lisa", example: "Being bilingual isn't as simple as people think." },
    { expression: "two different operating systems", meaning: "二つの違うOS", meaningEn: "metaphor for how bilingual brains process languages differently", day: 4, speaker: "Lisa", example: "It's more like two different operating systems running on the same hardware." },
    { expression: "it depends on the situation", meaning: "状況による", meaningEn: "explaining that there is no single correct answer", day: 4, speaker: "Yuki", example: "Nice to meet you? Or please take care of it? It depends on the situation." },
    { expression: "it's not a phrase, it's a feeling", meaning: "フレーズじゃなくて感情", meaningEn: "explaining that certain expressions carry emotional weight beyond their literal meaning", day: 4, speaker: "Lisa", example: "Yoroshiku isn't a phrase -- it's a feeling." },
    { expression: "you have to build it from context", meaning: "文脈から組み立てるしかない", meaningEn: "describing how meaning must be constructed from surrounding information", day: 4, speaker: "Lisa", example: "English doesn't have a single word for that. You have to build it from context every single time." },
    { expression: "that's a huge part of it", meaning: "それがすごく大きい", meaningEn: "confirming that someone has identified a major factor", day: 4, speaker: "Lisa", example: "Yes! That's a huge part of it." },
    { expression: "you leave a lot unsaid", meaning: "言わないことが多い", meaningEn: "describing communication where much is implied rather than stated", day: 4, speaker: "Lisa", example: "Japanese is high-context -- you leave a lot unsaid because everyone fills in the blanks." },
    { expression: "spell everything out", meaning: "全部言葉にする", meaningEn: "making every detail explicit instead of relying on implication", day: 4, speaker: "Lisa", example: "English is low-context -- you have to spell everything out." },
    { expression: "running Japanese software on English hardware", meaning: "英語のハードで日本語のソフトを動かそうとしてる", meaningEn: "metaphor for applying one language's logic to another language's structure", day: 4, speaker: "Yuki", example: "We're trying to run Japanese software on English hardware." },
    { expression: "learning to think differently", meaning: "考え方を変えること", meaningEn: "shifting mental approach rather than just adding vocabulary", day: 4, speaker: "Lisa", example: "The fix isn't learning more vocabulary -- it's learning to think differently when you're in English mode." },
    { expression: "what am I actually trying to communicate?", meaning: "本当に伝えたいことは何？", meaningEn: "the key question to ask yourself before speaking in another language", day: 4, speaker: "Lisa", example: "Don't ask 'how do I say this in English?' Ask 'what am I actually trying to communicate?'" },
    { expression: "that's not a vocabulary problem", meaning: "それはボキャブラリーの問題じゃない", meaningEn: "identifying that a communication issue goes deeper than word knowledge", day: 4, speaker: "Lisa", example: "That's not a vocabulary problem. That's a mindset problem." },
    { expression: "she'd say the same about you", meaning: "おばあちゃんもマスターのこと同じように言うと思う", meaningEn: "connecting two people by noting their shared quality through a third party", day: 4, speaker: "Lisa", example: "She'd say the same about you." },

    // ============================================================
    // DAY 5 -- ENGLISH HOUR (15 expressions)
    // Everyone at Noren, Gondo proposes English Hour
    // ============================================================
    { expression: "full house tonight", meaning: "今夜は満席だ", meaningEn: "noting that a place is completely full of people", day: 5, speaker: "Master Gondo", example: "Full house tonight." },
    { expression: "I'm holding you to that", meaning: "約束だからね", meaningEn: "insisting that someone follow through on what they said", day: 5, speaker: "Aya", example: "You said there'd be a free drink. I'm holding you to that." },
    { expression: "small enough to feel safe", meaning: "安心できるくらい狭い", meaningEn: "describing how a compact space creates comfort and security", day: 5, speaker: "Takeshi", example: "Big enough to talk, small enough to feel safe." },
    { expression: "I want to try something", meaning: "試したいことがある", meaningEn: "introducing a new idea or experiment to a group", day: 5, speaker: "Master Gondo", example: "I want to try something." },
    { expression: "English only", meaning: "英語だけ", meaningEn: "setting a rule that only one language may be used", day: 5, speaker: "Master Gondo", example: "One hour. English only." },
    { expression: "you can struggle, you can pause", meaning: "つっかえてもいい、止まってもいい", meaningEn: "giving permission to be imperfect during practice", day: 5, speaker: "Master Gondo", example: "You can struggle, you can pause, you can sound terrible. But you speak English." },
    { expression: "fluency doesn't mean confidence", meaning: "流暢と自信は別物", meaningEn: "pointing out that speaking well and feeling sure are different things", day: 5, speaker: "Aya", example: "Fluency doesn't mean confidence." },
    { expression: "barely string three words together", meaning: "3語つなげるのがやっと", meaningEn: "describing extreme difficulty with forming even basic sentences", day: 5, speaker: "Takeshi", example: "That's a long time when you can barely string three words together." },
    { expression: "that's not failure, that's your brain building", meaning: "あれは失敗じゃない、脳が作ってるんだ", meaningEn: "reframing struggle as a sign of learning and neural development", day: 5, speaker: "Lisa", example: "That pause when you're looking for the right word? That's not failure. That's your brain building a new pathway." },
    { expression: "if it were easy, you'd have done it already", meaning: "簡単だったら、もうやってるはずだ", meaningEn: "using difficulty as evidence that the challenge is worth taking on", day: 5, speaker: "Master Gondo", example: "If it were easy, you'd have done it already." },
    { expression: "can we at least get a lifeline?", meaning: "せめてライフラインくれない？", meaningEn: "asking for some form of help or safety net in a challenging situation", day: 5, speaker: "Takeshi", example: "Can we at least get a lifeline?" },
    { expression: "I'll give you a hint, not the answer", meaning: "ヒントは出すけど答えは教えない", meaningEn: "offering guidance while requiring the person to do the work themselves", day: 5, speaker: "Lisa", example: "I can help, but I won't give you the answer. I'll give you a hint." },
    { expression: "what's the worst that can happen?", meaning: "最悪何が起きる？", meaningEn: "putting fear in perspective by imagining the absolute worst outcome", day: 5, speaker: "Takeshi", example: "What's the worst that can happen? We embarrass ourselves in front of each other?" },
    { expression: "here's to sounding stupid together", meaning: "みんなで一緒にバカになることに乾杯", meaningEn: "a toast embracing shared vulnerability and imperfection", day: 5, speaker: "Kenji", example: "Here's to... sounding stupid together." },
    { expression: "cheers to that", meaning: "それに乾杯", meaningEn: "enthusiastically agreeing with someone's toast or statement", day: 5, speaker: "Yuki", example: "Cheers to that." },
];

export const TOKYO52_EP02_EXPRESSIONS_PER_DAY = 15;
export const TOTAL_TOKYO52_EP02_EXPRESSIONS = TOKYO52_EP02_EXPRESSIONS.length;

export const TOKYO52_EP02_DAY_IDS = ['tokyo52-ep02-day1', 'tokyo52-ep02-day2', 'tokyo52-ep02-day3', 'tokyo52-ep02-day4', 'tokyo52-ep02-day5'] as const;

/**
 * Find the conversation line index where an expression is spoken by its speaker.
 * Returns the array index or -1 if not found.
 */
export function findTokyo52Ep02ExpressionLineIndex(
    expression: string,
    speaker: string,
    conversationLines: Array<{ speaker: string; text: string }>
): number {
    const exprLower = expression.toLowerCase();
    return conversationLines.findIndex(line => {
        const textLower = line.text.toLowerCase();
        return textLower.includes(exprLower) && textLower.toLowerCase().includes(speaker.toLowerCase());
    });
}
