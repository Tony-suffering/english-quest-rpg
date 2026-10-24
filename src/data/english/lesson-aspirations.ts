// DMM レッスンの「言いたかったけど言えなかったこと」多層比較データ。
// 生徒が真に言語化したかった概念を、3層で並べて比較する:
//   1. attempt      = 生徒が実際に喋った崩れた英語
//   2. beyondNative = 外部AI(Gemini/GPT)の「ネイティブ以上」の学術的・哲学的英語
//   3. mine         = 俺(Claude)の「実際に口から出せる」話せる版(本人の声を残す, 2-3文)
// comment(EN) = 3つを比較した英語コメント。「どこを盗み、どこを置いていくか」。
//   学術版は鋭いが会話では言えない=本人の声じゃない、という [[feedback-external-ai-analysis]] の
//   思想を、批判でなく「層の使い分け」として言語化する。
// lessonId は DMM conversation の id と一致。/dmm/[id]/review の下部コーナーに表示・training登録可能。

export interface AspirationItem {
    concept: string;       // 言いたかったコア概念 (JP)
    attempt: string;       // 生徒が実際に喋った崩れた英語 (EN)
    beyondNative: string;  // 外部AIの「ネイティブ以上」学術英語 (EN)
    mine: string;          // 俺の話せる版 (EN, 本人の声, 2-3文)
    comment: string;       // 3層比較の英語コメント (EN)
}

export interface LessonAspiration {
    id: string;
    date: string;
    title: string;
    items: AspirationItem[];
    critique?: string;     // 全体評論 (JP): その回の傾向・処方・締めの問い。任意
}

export const LESSON_ASPIRATIONS: Record<string, LessonAspiration> = {
    'dmm-2026-06-26-typhoon-capitalism': {
        id: 'dmm-2026-06-26-typhoon-capitalism',
        date: '2026-06-26',
        title: '言いたかったこと — 多層比較（実発話 → 外部AI理想形 → 俺の話せる版）',
        items: [
            {
                concept: '台風とハリケーンに物理的な違いがあるのか、それとも住む場所で名前が変わるだけか。自然現象としては同一で、名前はただのラベルだという問い。',
                attempt: "I cannot -- is there a difference between typhoon or hurricane, or is it about where you are living, the name? The nature, how they behave in nature, is same, so it's just labels.",
                beyondNative: "Is there actually a physical difference between a typhoon and a hurricane, or does it just depend on where you live? The natural phenomenon is exactly the same, right? It's just a different label.",
                mine: "Is a typhoon actually different from a hurricane, or does it just depend on where you live? Same storm, different name. They're just labels.",
                comment: "Your instinct was already right -- 'it's just labels' is the whole thesis in three words. The fix is only clearing the runway to it: drop the 'is it about the where you are living' tangle and say 'depend on where you live'. Steal one phrase, 'natural phenomenon', for what you were reaching at with 'the nature'. Everything else was already you; it was just buried.",
            },
            {
                concept: '台本通りの英語は安全だが会話のノリを殺す。即興のコミュニケーションこそ練習したい、という価値観。',
                attempt: "I want to on the spot on the fly communication. Preparation is important for tests, but it kills the momentum. We are fully prepared scripted answers kind of dampening the mood.",
                beyondNative: "I just want to practice on-the-fly communication. Prepping is fine for exams, but having scripted answers totally kills the momentum and ruins the natural vibe of the conversation.",
                mine: "I just want on-the-fly conversation. Prep is fine for exams, but scripted answers kill the momentum -- and the vibe dies.",
                comment: "'On the fly' and 'kills the momentum' were both already native -- you didn't need help there, you needed to stop adding words after them. The two upgrades worth pocketing are 'prepping' (not 'preparation') and 'ruins the vibe'. The real lesson isn't vocabulary, it's the full stop: say the strong phrase, then close the sentence.",
            },
            {
                concept: '給料が出るのは当然で無駄ではなく適切な配分。本当の問題は透明性の欠如で、税金・寄付を扱う以上、完全な説明責任がある。',
                attempt: "Salaries, it's inevitable, we need human resources. I don't think it's waste, it's just properly allocation. But it's problem if you don't reveal, full disclosure is good. There's a responsibility for explanation, because it's taxpayers money.",
                beyondNative: "Paying salaries is inevitable -- you obviously need human resources. It's not a waste of money, just proper allocation. The real issue is the lack of transparency. They have a duty to be fully accountable, especially since they're handling taxpayer money or donations.",
                mine: "Salaries aren't waste -- that's just running the place. The real problem is the lack of transparency. If it's taxpayer or donor money, they owe you a clear account of where it went.",
                comment: "Your whole argument was correct and well-structured -- you only lost it on two set phrases. 'The real issue is the lack of transparency' is the line to memorize; it's exactly what 'reveal the full disclosure' was groping for. And swap 'responsibility for explanation' for 'accountable' or 'they owe you an account'. Two phrase-swaps and this reads like something a journalist would write.",
            },
            {
                concept: 'すべてはエゴに行き着く。人類の意識はまだ進化しておらず、家族第一・国家第一ではなく宇宙第一であるべき。「あの世に持っていけない」のに快楽をむさぼる発想は根本的に間違い、というスピリチュアルな見方。',
                attempt: "It's all about the ego, we are egotistical, still not evolved as consciousness. Family first or country first, it's universe first, universe is all encompassing. You can't take it with as you go. Enjoy as much as you can while alive -- that concept is totally wrong, in my book, spiritually.",
                beyondNative: "At the end of the day, it all boils down to human ego. Our consciousness hasn't evolved enough yet. We still prioritize 'family first' or 'country first' instead of realizing that the universe is everything and all-encompassing. People have this 'you can't take it with you, so just indulge while you're alive' mentality. From a spiritual standpoint, I think that mindset is fundamentally flawed.",
                mine: "At the end of the day it all boils down to ego -- our consciousness hasn't evolved yet. It's not family-first or country-first, it's universe-first. People think 'you can't take it with you, so grab all you can while you're alive' -- and spiritually, in my book, that's exactly backwards.",
                comment: "This is the rare one where the academic version earns most of its weight -- 'boils down to', 'prioritize', 'indulge', 'fundamentally flawed' are all clean and speakable, so steal all four. Keep your own 'in my book' and 'all-encompassing'; those are voice, and they're good. The only thing to cut is 'as you go' -- the idiom ends at 'take it with you'.",
            },
            {
                concept: '災害は運ではなく構造。貧者は最初から脆い土地に押しやられ、嵐がとどめを刺す。ニューヨークは天災を金で回避する。',
                attempt: "I never heard New York, some hurricane hit New York and millions of houses devastated. It's always about south poor black people struggling, houses got swept.",
                beyondNative: "It's not random -- the poor are pushed into the most vulnerable areas to begin with, and disasters simply finish the job. You never hear about a hurricane leveling Manhattan; wealth effectively buys insulation from nature.",
                mine: "It's not just bad luck. The poor get pushed onto the fragile land first, and the storm just finishes the job. You never hear about a hurricane flattening New York -- money buys its way out of the weather.",
                comment: "Your raw version carried real anger and a real observation -- 'it's always the poor' -- which is the hardest part to fake. What collapsed was the frame, not the idea. Steal the structure: 'pushed onto the fragile land first, the storm finishes the job', and the punchline 'money buys its way out of the weather'. Same outrage, now it lands like a thesis instead of a list.",
            },
            {
                concept: 'ビリオネアの「善行」は、純粋な慈善なのか、PR込みの評判ロンダリングなのか判別できないという疑い。',
                attempt: "Bill Gates accomplished his mission in business side, so he pivoted, and now flaws aside Bill Gates doing a really good to humanity. That's your opinion.",
                beyondNative: "What's hard to untangle is whether a billionaire 'doing good' is genuine philanthropy or reputation laundering with a bigger PR budget. Gates funds vaccines and rehabilitates his image in the very same gesture.",
                mine: "I can't tell if a billionaire 'doing good' is real generosity or just buying back his reputation with better PR. Gates funds vaccines and polishes his image in the same move.",
                comment: "You handed the idea to the teacher as his opinion -- but the sharper move is to own the doubt yourself. 'Reputation laundering' is the phrase that does all the work: cynical, precise, very native. Save your 'flaws aside' for when you want to concede a point gracefully -- it's a genuinely classy connector. Here, though, lead with the suspicion.",
            },
        ],
        critique: "高いリスニングと、米ニュース・ポッドキャスト由来の重い思考の蓄積は明らか。講師の文を先読みする認知は上位クラス。問題は「読める・聞ける」と「口から出す」の間の物理的なボトルネック。エゴの解脱・非二元・資本主義の限界みたいな高解像度の概念を、リアルタイムの構文に落とす段で文が崩れ、you know / like / yeah のフィラーに逃げる。これは無知じゃなく「知ってる概念を的確な型に流し込めない」構造的なもどかしさ。処方は単語力でもリスニングでもなく、生きたフレーズの塊(チャンク)を文脈ごと丸呑みして、声帯が自動で動くまで反復する物理的な回路構築。今日のデータで言えば、崩れるのは決まって「重い話題で1文が長くなった瞬間」。強いフレーズ(it's just labels / on the fly / boils down to)を言い切った直後に足し算をやめれば、崩壊の8割は消える。— 自分では、複雑な哲学的話題を語るとき、一番詰まる(言葉が出てこなくなる)のはどの瞬間だと感じる?",
    },
    'dmm-2026-06-23-malta-consciousness': {
        id: 'dmm-2026-06-23-malta-consciousness',
        date: '2026-06-23',
        title: '言いたかったこと — 多層比較 (Gemini学術版 / 俺の話せる版)',
        items: [
            {
                concept: '単なる「働き者」ではなく、会社を疑似家族とみなし、個を組織に委ねて成立する自発的隷属と帰属意識。',
                attempt: "You're a slave to the company and willingly slave. The company is kind of a family we belong to.",
                beyondNative: "Japanese corporate culture often operates on a pseudo-familial model. Employees don't just work hard; they systematically subordinate their individuality to the collective, finding their identity and security through an extreme, voluntary institutional loyalty.",
                mine: "It's not just that they work hard. The company becomes a family you belong to, so you hand your whole identity over to it — willingly. The loyalty is real, but it can quietly swallow you.",
                comment: "Gemini's version is razor-sharp, but it's an essay, not a sentence you'd ever say out loud — 'subordinate their individuality to the collective' is a lecture, not a chat. Mine keeps your exact insight ('willingly', 'a family you belong to') but stays speakable on a Tuesday. The one phrase worth stealing from Gemini is 'voluntary loyalty' — pocket that, leave the rest in the textbook.",
            },
            {
                concept: '脳の神経活動が意識を生むとする唯物論の限界と、「意識こそ万物の基盤、脳はそれを映すスクリーンにすぎない」という非二元の見方。',
                attempt: "Most scientists believe brain activity creates consciousness. But the spiritual view is opposite: consciousness first. The brain's activity is the expression of consciousness. Consciousness is the projector or the screen.",
                beyondNative: "Materialist science insists consciousness is merely an epiphenomenon — an emergent property of neural activity. From a non-dual perspective, however, consciousness is the fundamental substrate of reality. The brain doesn't generate awareness; it merely channels it. Consciousness is the screen upon which the universe itself is projected.",
                mine: "Science treats consciousness like a by-product of the brain — switch the neurons on and awareness pops out. The non-dual view flips it: consciousness comes first, and the brain doesn't make it, it just channels it. The brain's a radio, not the music.",
                comment: "Here your own 'projector / screen' line genuinely beats Gemini's — it's a clean image anyone gets in one second. Gemini buries the same idea under 'epiphenomenon' and 'fundamental substrate', which sounds clever but stops the conversation dead. Steal exactly two words — 'channels it' and 'non-dual' — and keep your screen metaphor. That's the layer that wins: their vocabulary, your image, your voice.",
            },
            {
                concept: 'AI翻訳は完璧だが無菌状態で、人間の脆弱性や温度を剥ぎ取る。あえて拙い英語で語る「摩擦」「不完全さ」こそが人間関係を立ち上げる引き金。',
                attempt: "AI translates with no lag, but there's still a wall between us. I'm in your world, speaking broken English, but you can feel that. This broken English actually works.",
                beyondNative: "Flawless AI translation creates a sterile, frictionless interaction that inadvertently strips away human vulnerability. True connection requires shared effort and imperfection. By deliberately struggling in your native tongue, I am dismantling that artificial barrier; the linguistic friction itself is what authenticates our human experience.",
                mine: "Perfect AI translation is too clean — it's frictionless, and that friction was the human part. Real connection needs some effort and some mess. Me struggling in your language on purpose isn't the wall; the struggle is the thing you actually feel.",
                comment: "This is the one concept where I'd let you steal a whole phrase: 'sterile, frictionless' and 'linguistic friction' are genuinely great and worth memorizing. But 'authenticates our human experience' is the kind of line that makes a real person quietly back away from the table. Mine lands the same point — 'the struggle is the thing you feel' — at a volume you could use over a beer. Layer them: their two adjectives, my delivery.",
            },
            {
                concept: '(語彙の穴) ワールドカップ出場権をかけたアジア予選を勝ち抜くこと。',
                attempt: "Trying to get the World Cup ticket. You have to punch out the tournament. I forgot the right name for such preparation.",
                beyondNative: "They are currently competing in the Asian qualifiers to secure a berth in the World Cup.",
                mine: "They're fighting through the Asian qualifiers to book their spot at the World Cup.",
                comment: "No philosophy here — this is just a vocabulary gap, and Gemini's fix is the right one. 'Qualifiers' and 'secure a berth' are the exact set phrases you were circling with 'ticket' and 'punch out'. Mine only swaps 'secure a berth' for the slightly more spoken 'book their spot' — same meaning, less press conference. Memorize 'qualifiers' first; that one word unlocks the whole sentence.",
            },
        ],
    },
};

export function getLessonAspiration(id: string): LessonAspiration | null {
    return LESSON_ASPIRATIONS[id] || null;
}
