// 俺語録 2026年10月 その3 — Day 13-18
// 骨格: 関係詞の省略 / 「〜になる」の使い分け / too と enough / 比較の省略 / 使役 make・let・have / 「〜しておく」

import type { GorokuSeed } from './goroku-seed';

export const GOROKU_OCT_C: GorokuSeed[] = [
    // ── Day 13 ── 関係詞の省略。「昨日会った人」を the guy I met と、名詞の後ろに文を直付けする
    { daySlot: 13, japanese: '昨日会った人', english: [
        "the guy I met",
        "the guy I met yesterday",
        "the guy I met yesterday at the thing, he called",
        "the guy I met yesterday. the one with the jacket. he called. I gave him my number as a joke, the way you give people your number at things, and he took it seriously, and now I have to decide if I was joking."
    ], context: "「昨日会った人」は日本語では文が名詞の前に来る。英語は the guy I met と名詞の後ろに文を直付けする。whom も that も要らない。名詞、そのまま主語と動詞。この直付けが話し言葉の骨格で、関係詞を入れると途端に書き言葉になる。", category: 'filler', month: '2026-10' },
    { daySlot: 13, japanese: '頼んだやつ来た？', english: [
        "the thing I ordered",
        "did the thing I ordered come?",
        "did the thing I ordered come yet, it's been a week",
        "did the thing I ordered come? the thing. you know the thing. I ordered it last Tuesday, it said two days, it's been eight, and the tracking page just says in transit like that's a place. it's not a place."
    ], context: "「頼んだやつ」は the thing I ordered。thing の後ろに I ordered を付けるだけ。which I ordered とは言わない。日本語の「〜たやつ」の「やつ」を英語は thing で受け、その後ろに動作を置く。名詞が先、説明が後。", category: 'suggestion', month: '2026-10' },
    { daySlot: 13, japanese: '欲しかったやつ', english: [
        "the one I wanted",
        "that's the one I wanted",
        "that's exactly the one I wanted, how did you know?",
        "that's the one I wanted. the exact one. not the one that's close, not the one in the other color. this one. I mentioned it once, months ago, in passing, and you remembered. I don't know what to do with that. thank you."
    ], context: "「欲しかったやつ」は the one I wanted。one が「やつ」で、後ろに I wanted を直付け。日本語は動詞が名詞を前から飾るが、英語は名詞の後ろから飾る。前後が逆になるだけで、関係詞は要らない。", category: 'reaction', month: '2026-10' },
    { daySlot: 13, japanese: 'こないだ言ってた店', english: [
        "that place you mentioned",
        "that place you mentioned the other day",
        "that place you mentioned the other day, is it any good?",
        "that place you mentioned. the one with the noodles. you said it like it was nothing, like everyone knows, and then you moved on. I did not move on. I've been thinking about the noodles for a week. where is it."
    ], context: "「言ってた店」は the place you mentioned。place の後ろに you mentioned。that を頭に置いて「あの」を作る。日本語の「こないだ言ってた」を英語は名詞の後ろに畳む。文の情報量は同じで、順番だけが逆。", category: 'suggestion', month: '2026-10' },
    { daySlot: 13, japanese: '一緒に働いてた人', english: [
        "someone I used to work with",
        "someone I used to work with, years ago",
        "someone I used to work with reached out out of nowhere",
        "someone I used to work with. years ago. different company, different city, different version of me. she found me somehow and sent a message that just said hey. hey. after eight years. I've been staring at hey for an hour."
    ], context: "「一緒に働いてた人」は someone I used to work with。with が文末に残るのは Day 5 の骨格。関係詞の省略と前置詞の文末が組み合わさる。二つの骨格が重なると、一気に英語らしくなる。", category: 'filler', month: '2026-10' },
    { daySlot: 13, japanese: '住んでたとこ', english: [
        "where I used to live",
        "the place where I used to live",
        "we drove past the place I used to live, it's a parking lot now",
        "we drove past where I used to live. it's a parking lot. not a building that replaced it, not a new store. a parking lot. flat and grey and full of cars that don't know they're parked on my kitchen."
    ], context: "場所は where で受けることもできるが、話し言葉は the place I used to live と where を落とす。関係副詞も落とせる。日本語の「とこ」は場所の名詞で、英語では place。その後ろに文を直付けする。", category: 'reaction', month: '2026-10' },
    { daySlot: 13, japanese: '言ったこと覚えてる？', english: [
        "remember what you said?",
        "remember what you said last week?",
        "do you remember what you said last week about the budget?",
        "remember what you said? about the budget. you said, and I'm quoting, we'll figure it out. that was your whole plan. we'll figure it out. well. it's out. and we haven't figured it. so. what did you mean."
    ], context: "「言ったこと」は what you said。what が「こと」を含んでいるので、the thing that you said より短い。what 節は名詞と関係詞を一語で兼ねる。日本語の「こと」を英語は what に畳む。", category: 'suggestion', month: '2026-10' },
    { daySlot: 13, japanese: '書いたメール読んだ？', english: [
        "read the email I sent?",
        "did you read the email I sent?",
        "did you read the email I sent this morning, the long one?",
        "did you read the email? the one I sent this morning. the long one. I know it was long. it was long because the thing is complicated and I didn't want to have this conversation. but here we are. having it."
    ], context: "「書いたメール」は the email I sent。email の後ろに I sent。日本語の「書いた」を英語は sent(送った)と言うことが多い。関係詞の省略で、名詞と動作が隣り合う。名詞のすぐ後ろに主語が来たら、それは省略の合図。", category: 'suggestion', month: '2026-10' },
    { daySlot: 13, japanese: '前に話した件', english: [
        "the thing we talked about",
        "the thing we talked about before",
        "about the thing we talked about before, I've got an update",
        "the thing we talked about. before. in the car. you said don't bring it up until there's news, and there's news, so I'm bringing it up. it's good news, I think. it's news-shaped. you'll have to tell me which kind."
    ], context: "「話した件」は the thing we talked about。about が文末に残る。「件」は英語で thing で十分。matter や issue だと堅い。日本語の「件」を英語は thing で受け、後ろに動作と前置詞を置く。", category: 'filler', month: '2026-10' },
    { daySlot: 13, japanese: '今使ってるやつ', english: [
        "the one I'm using now",
        "the one I'm using right now",
        "the one I'm using right now is fine, I don't need a new one",
        "the one I'm using now is fine. it's old. it's slow. the button sticks. but it does the thing, and I know where everything is, and a new one would mean a week of not knowing where anything is. I'll keep the old one."
    ], context: "「使ってるやつ」は the one I'm using。進行形を名詞の後ろに直付け。日本語の「〜てるやつ」を英語は one + 進行形の文で言う。関係詞が無いので、名詞と主語の間に何も挟まらない。この密着が英語の話し言葉。", category: 'opinion', month: '2026-10' },

    // ── Day 14 ── 「〜になる」の使い分け。get / become / turn / go を、変化の種類で選ぶ
    { daySlot: 14, japanese: '医者になった', english: [
        "became a doctor",
        "she became a doctor, of all things",
        "she became a doctor, which none of us saw coming",
        "she became a doctor. the girl who fainted at a paper cut. the girl who couldn't watch the nature shows. a doctor. with a coat and a badge and hands that don't shake. people change. I keep forgetting that."
    ], context: "職業や身分に「なる」は become。get a doctor とは言えない。become は名詞を取る変化、get は形容詞を取る変化。日本語の「なる」一語を、英語は後ろに来る語の種類で動詞を変える。名詞なら become、形容詞なら get が基本線。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '赤くなった', english: [
        "turned red",
        "his face turned red",
        "his face turned bright red the second she walked in",
        "his face turned red. not a little red. the red of a person whose body has decided to announce something the person was trying to keep private. she walked in, he looked up, and his face filed a report."
    ], context: "色が変わるは turn。turn red、turn grey。get red とは言わない。turn は見た目や性質が別の物に変わるときの「なる」。日本語は色も気分も「なる」だが、英語は色は turn、気分は get と、変化の種類で動詞が分かれる。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '頭おかしくなりそう', english: [
        "going crazy",
        "I'm going crazy here",
        "I'm going crazy in this house, I need to get out",
        "I'm going crazy. slowly. the way milk goes bad. you don't notice the day it happens. you just open the fridge one morning and it's a different substance. I'm the milk. this house is the fridge."
    ], context: "悪い方向へ「なる」は go。go crazy、go bad、go wrong、go blind。get crazy とは言わない。go は悪化や崩れの変化に使う。日本語の「おかしくなる」の「なる」を英語は go で言うが、良くなるときは go を使わない。方向で動詞が決まる。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '有名になった', english: [
        "got famous",
        "he got famous, somehow",
        "he got famous overnight, and it changed him",
        "he got famous. one video. he didn't even make it, someone filmed him, and now strangers know his face. he says it's fine. he says it like someone who's been asked if it's fine too many times. it's not fine."
    ], context: "形容詞に「なる」は get。get famous、get rich、get old。become famous も言えるが硬い。話し言葉は get。日本語の「なる」を英語で言うとき、後ろが形容詞なら迷わず get。これが一番出番の多い「なる」。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '静かになった', english: [
        "went quiet",
        "the room went quiet",
        "the whole room went quiet when he said it",
        "the room went quiet. not polite quiet. the other kind. the kind where the air changes weight. he said it, and every conversation in the room stopped at the same time, like someone had pulled a plug. nobody looked at him. everybody was looking at him."
    ], context: "急に静まるは go quiet。get quiet でも通じるが、go quiet は「急に、ぱたっと」の感じ。go は急な変化、get は徐々の変化、という使い分けもある。日本語の「なる」には速度が無いが、英語は動詞で速度まで言える。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '友達になった', english: [
        "became friends",
        "we became friends, weirdly",
        "we became friends over the worst project either of us has ever worked on",
        "we became friends. over a project that should have ended us. eight months of everything going wrong, and somewhere around month four we stopped blaming each other and started blaming the project together. that's a friendship. that's how they're made."
    ], context: "関係に「なる」は become。become friends、become partners。get friends とは言わない。名詞が来るので become。日本語の「友達になる」の「なる」を英語は become で受ける。名詞か形容詞か、それだけで動詞が決まる。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '暗くなってきた', english: [
        "getting dark",
        "it's getting dark out",
        "it's getting dark out already, we should head back",
        "it's getting dark. it's four thirty. I'm not ready for this. summer spoiled me. summer let me believe that evenings were long and forgiving. October is here to correct that belief, one early sunset at a time."
    ], context: "徐々に「なってきた」は get の進行形。it's getting dark で「暗くなる途中」。become dark とは言わない。get は変化の動詞で、進行形にすると変化の途中を切り取れる。日本語の「〜てきた」を英語は be getting で言う。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '腐った', english: [
        "went bad",
        "it went bad, throw it out",
        "the milk went bad, I think the fridge is dying",
        "it went bad. I opened it and the smell told me before my eyes did. the date said three more days. the date was lying. or the fridge is lying. something in this kitchen is lying to me and I intend to find out what."
    ], context: "食べ物が悪くなるは go bad。get bad とは言わない。go は「悪い状態へ落ちる」変化。日本語の「腐る」は一語の動詞だが、英語は go+bad と、変化の動詞と状態の形容詞に割れる。悪化はだいたい go。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '30になった', english: [
        "turned thirty",
        "I turned thirty last week",
        "I turned thirty last week and nothing happened, which was the surprise",
        "I turned thirty. I was told something would happen. a feeling, a realization, a sudden urge to buy furniture. nothing happened. I woke up, I was thirty, I had coffee. the coffee tasted the same. I don't know what I expected. furniture, maybe."
    ], context: "年齢に「なる」は turn。turn thirty。become thirty、get thirty とは言わない。turn は節目を越える変化に使い、年齢や時刻(it turned midnight)に出る。日本語の「なる」が英語では四つの動詞に割れる、その四つ目。", category: 'reaction', month: '2026-10' },
    { daySlot: 14, japanese: '現実になった', english: [
        "came true",
        "it actually came true",
        "it actually came true, I still can't believe it",
        "it came true. I said it out loud years ago, half joking, at a table, and someone laughed. I laughed too. and then I went home and didn't laugh, and started. and now it's here, and it's real, and I still hear that laugh sometimes. it sounds different now."
    ], context: "夢や予想が「現実になる」は come true。become real とは言わない。come は「こちらに来る」変化で、望んだものが届く感じ。日本語の「なる」が、英語では come でも言える。become、get、turn、go、come。五つの「なる」を場面で使い分ける。", category: 'reaction', month: '2026-10' },

    // ── Day 15 ── too と enough。「〜すぎる」「十分」を、形容詞の前後で言う
    { daySlot: 15, japanese: '高すぎる', english: [
        "too expensive",
        "way too expensive",
        "that's way too expensive for what it is",
        "it's too expensive. not expensive. too expensive. there's a difference. expensive means I'll think about it. too expensive means the thinking is done and the answer is no, and the number did the thinking for me."
    ], context: "「すぎる」は too を形容詞の前に置く。very expensive は「とても高い」で買えるかもしれない。too expensive は「高すぎて無理」で、否定の結論を含む。日本語の「すぎる」も同じで、too は形容詞に限界を超えた印を付ける。", category: 'opinion', month: '2026-10' },
    { daySlot: 15, japanese: 'もう十分', english: [
        "that's enough",
        "okay, that's enough",
        "okay, that's enough, we've got what we need",
        "that's enough. I mean it as a compliment. we could keep going, add more, polish more, and it would get worse. it's done. the hard part is knowing when to stop, and this is when. put the pen down."
    ], context: "「十分」は enough。名詞の前か、形容詞の後ろに置く。enough money、good enough。日本語の「十分」は位置が自由だが、英語の enough は形容詞の後ろと決まっている。too は前、enough は後ろ。この位置の違いが骨格。", category: 'shutdown', month: '2026-10' },
    { daySlot: 15, japanese: '若すぎて分からなかった', english: [
        "too young to get it",
        "I was too young to get it",
        "I was too young to get it back then, I get it now",
        "I was too young to get it. my dad said it once, at the table, and I nodded and thought about something else. twenty years later, I said the same thing to my kid, and heard it come out of my mouth, and understood it for the first time."
    ], context: "too + 形容詞 + to で「〜すぎて〜できない」。too young to understand。否定語が無いのに否定の意味になる。日本語は「すぎて分からなかった」と否定を書くが、英語は too と to だけで否定を作る。この隠れた否定が too の骨格。", category: 'reaction', month: '2026-10' },
    { daySlot: 15, japanese: 'それで足りる', english: [
        "that's enough",
        "that'll do",
        "that'll do, we don't need more than that",
        "that'll do. it's not perfect. it's not even good, if I'm honest. but it covers the thing it needs to cover and nobody's going to look closer than that. good enough is a real category. this is in it."
    ], context: "「足りる」も enough。that's enough、that'll do。日本語の「足りる」は動詞だが、英語は enough という副詞・形容詞で言う。「十分」と「足りる」を英語は同じ語で持つ。量が満ちたことを一語で言う。", category: 'opinion', month: '2026-10' },
    { daySlot: 15, japanese: '時間が足りない', english: [
        "not enough time",
        "there's not enough time",
        "there's not enough time to do it properly, so we'll do it fast",
        "there's not enough time. there's never enough time. that's not new. what's new is I've stopped pretending there is. so here's the plan: we do the part that matters, we skip the part that looks good, and we ship. Friday."
    ], context: "「足りない」は not enough。enough に否定を足す。日本語は「足りない」で一語だが、英語は not + enough。足りるも足りないも enough の周りで言う。there's not enough は Day 12 の存在文との組み合わせ。", category: 'opinion', month: '2026-10' },
    { daySlot: 15, japanese: 'ちょっと甘すぎる', english: [
        "a bit too sweet",
        "it's a bit too sweet for me",
        "it's a bit too sweet for me, but I can see why people like it",
        "it's a bit too sweet. for me. I want to be clear that this is a me thing. other people will love it. other people have different mouths. my mouth wants it to stop halfway through and it doesn't stop. it keeps going. it's a lot."
    ], context: "too の前に a bit、a little を置くと「ちょっと〜すぎ」になる。too だけだと強いので、a bit で緩める。日本語の「ちょっと」と同じ役。too に程度を付けられる、が骨格の細部。", category: 'opinion', month: '2026-10' },
    { daySlot: 15, japanese: '大きさはこれで十分', english: [
        "big enough",
        "it's big enough",
        "it's big enough for the two of us, we don't need the bigger one",
        "it's big enough. I know the bigger one exists. I know it's only a little more. but a little more is how you end up with a house you can't heat. this fits us. we fit it. that's the whole test."
    ], context: "形容詞 + enough で「十分〜」。big enough、good enough、old enough。enough は形容詞の後ろ。enough big とは言えない。日本語は「十分大きい」と前に置くが、英語は逆。この語順が身体に入っていないと、毎回一瞬詰まる。", category: 'opinion', month: '2026-10' },
    { daySlot: 15, japanese: 'やりすぎ', english: [
        "too much",
        "that's too much",
        "that's too much, tone it down a little",
        "that's too much. I asked for a little and you brought the whole store. I appreciate the energy. I do. but the people we're presenting to are going to see this and think we're hiding something behind all the confetti."
    ], context: "「やりすぎ」は too much。much が量なので、too much で量の限界超え。動詞に付けて you did too much とも言うが、that's too much と状況を主語にするのが口語。日本語の「すぎ」を英語は too で言う、その名詞版。", category: 'opinion', month: '2026-10' },
    { daySlot: 15, japanese: '疲れすぎて何もできない', english: [
        "too tired",
        "I'm too tired for this",
        "I'm too tired to even think about it right now",
        "I'm too tired. too tired to cook, too tired to order, too tired to decide between cooking and ordering. I'm going to sit here and let hunger and tiredness fight it out, and whichever wins, I'll do that."
    ], context: "too tired to で「疲れすぎて〜できない」。Day 15 の三つ目と同じ骨格で、形容詞が変わっただけ。too + 形容詞 + to + 動詞、で否定の結論。この型が身体に入ると、あらゆる「〜すぎて」が言える。", category: 'reaction', month: '2026-10' },
    { daySlot: 15, japanese: 'もう歳だよ', english: [
        "too old for this",
        "I'm too old for this",
        "I'm getting too old for this, my knees said so",
        "I'm too old for this. my knees told me on the way up the stairs and my back confirmed it on the way down. I used to do this for fun. now I do it once and spend the week negotiating with my own body about whether I'll do it again."
    ], context: "「もう歳」を英語は too old for this と言う。for の後ろに名詞を置く形。too ... to は動詞、too ... for は名詞。日本語の「歳だ」は年齢を言うだけだが、英語は「これをするには歳を取りすぎ」と対象を言う。", category: 'reaction', month: '2026-10' },

    // ── Day 16 ── 比較の省略。「もう一個の方」「思ったより」を、than を落として言う
    { daySlot: 16, japanese: 'こっちのがいい', english: [
        "this one's better",
        "this one's way better",
        "this one's way better, I don't know why we were even looking at the other one",
        "this one's better. I don't need to see the other one again. I saw it. it's fine. but this one, the second I saw it, the other one became a memory. that's how you know. the other one turns into a memory."
    ], context: "「こっちのがいい」は this one's better で、than the other one を落とす。比べる相手が分かっているなら than は要らない。日本語も「〜より」を落とすので同じ。比較級だけで文が成立する、が話し言葉の骨格。", category: 'opinion', month: '2026-10' },
    { daySlot: 16, japanese: '思ったより安かった', english: [
        "cheaper than I thought",
        "it was cheaper than I thought",
        "it was cheaper than I thought, so I got two",
        "it was cheaper than I thought. by a lot. I'd budgeted for pain and got mild discomfort. so I bought two. that's what you do with money you didn't spend. you spend it. the logic holds if you don't look at it."
    ], context: "「思ったより」は than I thought。than の後ろに文が来る。than I expected も同じ。日本語の「より」は名詞にも文にも付くが、英語の than も同じで、後ろに I thought と文を置ける。この than + 文が、口語で一番出る比較。", category: 'reaction', month: '2026-10' },
    { daySlot: 16, japanese: 'もっと早く言ってよ', english: [
        "should have said sooner",
        "you should have said something sooner",
        "you should have told me sooner, I could have helped",
        "you should have said something sooner. I'm not mad. I'm the opposite of mad. I'm the thing where you find out someone was struggling next to you for a month and you were right there. right there. and they didn't say. say next time."
    ], context: "「もっと早く」は sooner。earlier も言えるが、sooner は「もっと早い時点で」。than now を落としている。比較級の副詞を単独で使う型。日本語の「もっと」は more だと思いがちだが、英語は形容詞・副詞そのものを比較級にする。", category: 'request', month: '2026-10' },
    { daySlot: 16, japanese: 'もう一個の方', english: [
        "the other one",
        "no, the other one",
        "no, the other one, the one on the left",
        "the other one. not that one. the other one. there are two. you're holding one. the one you're not holding is the one I mean. I know this sounds like a riddle. it isn't. put that down and pick up the other one."
    ], context: "「もう一個の方」は the other one。比較の相手を one で受け、the other で「もう片方」。二つあるうちのもう一つ、は the other。三つ以上なら another。日本語の「方」を英語は one で言い、比べる相手を暗に含む。", category: 'request', month: '2026-10' },
    { daySlot: 16, japanese: '前のほうがよかった', english: [
        "the old one was better",
        "honestly, the old one was better",
        "honestly, the old one was better, I don't know why they changed it",
        "the old one was better. I know you're not supposed to say that. you're supposed to give the new one time. I gave it time. I gave it a week. the week is over and the old one is still better and I want it back."
    ], context: "「前のほうが」は the old one was better。than this one を落とす。比較の相手が目の前にあるなら言わない。old one と new one で、比べる二つを one で受ける。日本語の「前の」を英語は the old one。", category: 'opinion', month: '2026-10' },
    { daySlot: 16, japanese: '思ったほどじゃなかった', english: [
        "not as good as I thought",
        "it wasn't as good as I thought",
        "it wasn't as good as I thought it'd be, but it was fine",
        "it wasn't as good as I thought. I'd built it up. I'd told people. I'd said you have to go. and then I went, and it was fine, and I had to walk that back with everyone. you don't have to go. it's fine. it's just fine."
    ], context: "「思ったほど」は as ... as I thought。not as good as で「思ったほど良くない」。比較級ではなく同等比較の否定。日本語の「ほど」は英語では as ... as。「より」が than、「ほど」が as。二つを混ぜないのが骨格。", category: 'reaction', month: '2026-10' },
    { daySlot: 16, japanese: 'こっちのほうが早い', english: [
        "this way's faster",
        "this way's faster, trust me",
        "this way's faster, trust me, I've done it both ways",
        "this way's faster. I know it looks longer. it looks longer because it is longer. but the short way has four lights and a school zone and a man who parks his truck in the middle of the road to talk to his cousin. this way has none of that."
    ], context: "「こっちのほうが」も this way's faster と than that way を落とす。道の話は way で受ける。比較級 + 主語だけで文になる。日本語の「ほうが」は英語では比較級そのものに含まれていて、別の語は要らない。", category: 'opinion', month: '2026-10' },
    { daySlot: 16, japanese: '一番安いのでいい', english: [
        "the cheapest is fine",
        "just the cheapest one",
        "just get the cheapest one, they're all the same",
        "the cheapest one. I don't need the features. I don't know what the features are. I looked at the list of features and recognized two words. one was the brand. get the cheapest one and I'll learn to love it. I always do."
    ], context: "最上級も名詞を落とせる。the cheapest で「一番安いの」。the cheapest one とも言う。日本語の「一番安いの」の「の」を英語は one か、何も置かない。最上級は the が付くので、それだけで名詞の代わりになる。", category: 'request', month: '2026-10' },
    { daySlot: 16, japanese: 'もっとゆっくり', english: [
        "slower",
        "a bit slower, please",
        "could you go a bit slower, I'm still writing",
        "slower. please. I'm writing this down and my hand can't keep up with your mouth. you're not talking fast. I'm writing slow. it's my problem. but it's a problem I'd like you to fix by talking slower."
    ], context: "「もっとゆっくり」は slower の一語。more slowly も正しいが、口語は slower。比較級の副詞を単独で言う。日本語は「もっと」が要るが、英語は語尾の -er が「もっと」を含む。more を足すと二重になる。", category: 'request', month: '2026-10' },
    { daySlot: 16, japanese: '前より良くなった', english: [
        "better than before",
        "it's better than before",
        "it's a lot better than before, whatever you changed worked",
        "it's better than before. I don't know what you did. I don't need to know. it was broken in a specific way, and now it's not broken in that way, and it's not broken in a new way either, which is the real miracle."
    ], context: "「前より」は than before。before は副詞だが than の後ろに置ける。than it was before の省略形。日本語の「前より」を英語は than before で、before の後ろは何も要らない。比較の相手を時間で言う型。", category: 'opinion', month: '2026-10' },

    // ── Day 17 ── 使役 make / let / have。「させる」「させてあげる」「してもらう」を動詞で選ぶ
    { daySlot: 17, japanese: 'やらせて', english: [
        "let me",
        "let me do it",
        "let me do it, I've done it a hundred times",
        "let me. I know you can. I'm not saying you can't. I'm saying I've done this one a hundred times and my hands know it and yours are about to learn it the hard way. let me. next time, you. this time, me."
    ], context: "「やらせて」の「させて」は let。let me で「私にさせて」。make me だと強制になる。let は許可の使役で、相手が望むことを許す。日本語の「させる」は許可も強制も同じ形だが、英語は let と make で分かれる。", category: 'request', month: '2026-10' },
    { daySlot: 17, japanese: '無理やり食べさせられた', english: [
        "made me eat it",
        "they made me eat it",
        "they made me eat the whole thing, I couldn't say no",
        "they made me eat it. all of it. my grandmother stood over me with a face that said love and also said eat, and there was no version of that evening where I didn't eat. I ate. I'm still full. it was Sunday."
    ], context: "強制の「させる」は make。make me eat で「食べさせる」。to が要らない。made me to eat とは言わない。日本語の「させられた」を英語は make の受け身か、they made me と主語を立てて言う。let と make、許可と強制。", category: 'reaction', month: '2026-10' },
    { daySlot: 17, japanese: '誰かに来てもらう', english: [
        "have someone come",
        "I'll have someone come by",
        "I'll have someone come by tomorrow to take a look",
        "I'll have someone come. not me. someone who knows. I looked at it for twenty minutes and learned that I don't know what I'm looking at. that's valuable. that's twenty minutes well spent. someone who knows comes tomorrow."
    ], context: "「してもらう」は have。have someone come で「誰かに来てもらう」。make だと強制、let だと許可、have だと依頼。三つ目の使役。日本語の「もらう」は恩の方向だが、英語の have は手配の意味。Day 3 の have + O + 過去分詞と同じ have。", category: 'request', month: '2026-10' },
    { daySlot: 17, japanese: '待たせてごめん', english: [
        "sorry to keep you waiting",
        "sorry I kept you waiting",
        "sorry I kept you waiting, the meeting ran long",
        "sorry I kept you waiting. I saw the time and I saw the door and the person talking didn't see either. I tried the face. the face where you look at your watch and then at the door. nothing. some people don't read faces. you waited. I'm sorry."
    ], context: "「待たせる」は keep waiting。make you wait とも言えるが、keep you waiting のほうが「待たせ続けた」の感じが出る。使役は make/let/have だけでなく、keep や get でも作れる。日本語の「させる」に対応する動詞が英語には複数ある。", category: 'reaction', month: '2026-10' },
    { daySlot: 17, japanese: '笑わせんな', english: [
        "don't make me laugh",
        "stop, don't make me laugh",
        "stop, don't make me laugh, I'm trying to be serious here",
        "don't make me laugh. I'm trying to be mad at you. I had a whole speech. and then you did the thing with your face and the speech fell apart. I'll be mad later. I'll write it down. right now I'm laughing and it's your fault."
    ], context: "「笑わせる」は make me laugh。感情を起こさせるのは make。let me laugh とは言わない。相手に何かを起こさせる、が make。日本語の「笑わせる」の「せる」を英語は make で受ける。使役の中で一番出番が多いのはこの make。", category: 'shutdown', month: '2026-10' },
    { daySlot: 17, japanese: '好きにさせとけ', english: [
        "let him",
        "just let him do it",
        "just let him do it his way, he'll figure it out",
        "let him. I know it's the wrong way. I know you can see exactly how it'll go. so can I. but he can't, and telling him won't put it in his eyes. only doing it will. so let him do it, and be there when it goes how we both know it'll go."
    ], context: "「好きにさせる」は let。let him do it で「彼にやらせておく」。make だと逆になる。日本語の「させとけ」の「とけ」は放置で、英語は let に含まれている。許可と放置は英語では同じ let。", category: 'suggestion', month: '2026-10' },
    { daySlot: 17, japanese: 'ちょっと考えさせて', english: [
        "let me think",
        "let me think about it",
        "let me think about it and I'll get back to you tomorrow",
        "let me think. not no. not yes. think. I need to walk around with it for a day, see how it feels in the morning, see if the morning version of me agrees with the evening version. they don't always. tomorrow."
    ], context: "「考えさせて」も let me。let me think で「考える時間をくれ」。使役の let は、自分に向けると「〜させてくれ」の依頼になる。日本語の「させて」を英語は let me で受ける、その最頻出の形。", category: 'request', month: '2026-10' },
    { daySlot: 17, japanese: '手伝わせた', english: [
        "got him to help",
        "I got him to help out",
        "I finally got him to help out, took some convincing",
        "I got him to help. it took a week. a week of hints and then a week of not hints and then finally just asking. he said sure like it was nothing. like he hadn't watched me carry everything alone for two weeks. sure. okay. sure."
    ], context: "「させた」を get ... to で言うと「説得してやらせた」になる。get him to help。make だと強制、get だと説得。to が要るのが make との違い。使役は make/let/have/get の四つで、get だけ to を取る。この一点が骨格の細部。", category: 'reaction', month: '2026-10' },
    { daySlot: 17, japanese: '確認させてください', english: [
        "let me confirm",
        "let me just confirm one thing",
        "let me just confirm one thing before we move on",
        "let me confirm. one thing. I know we're moving fast and I'm the one slowing it down. but if I'm wrong about this one thing, everything after it is wrong, and I'd rather be slow now than wrong later. one thing. then go."
    ], context: "「させてください」は let me。let me confirm で「確認させて」。please は要らない。let me 自体が丁寧な依頼になる。日本語の「させてください」の敬語部分を、英語は let me の形そのものが担う。", category: 'request', month: '2026-10' },
    { daySlot: 17, japanese: '泣かせるなよ', english: [
        "don't make me cry",
        "stop, don't make me cry",
        "stop it, you're going to make me cry, I did my makeup",
        "don't make me cry. not here. I did my face for this. I did it carefully. and you're saying things, nice things, true things, and my face is about to undo an hour of work. say them later. write them down. not now."
    ], context: "「泣かせる」も make。make me cry。感情の使役は make が独占する。let me cry だと「泣かせてくれ」で意味が反転する。日本語の「泣かせる」は一語だが、英語は make + cry に割れ、make が「させる」を担う。", category: 'shutdown', month: '2026-10' },

    // ── Day 18 ── 「〜しておく」。日本語の「とく」を、英語はどの動詞で言うか
    { daySlot: 18, japanese: '用意しとく', english: [
        "I'll have it ready",
        "I'll have it ready for you",
        "I'll have it ready for you by the time you get here",
        "I'll have it ready. you won't have to wait. you'll walk in and it'll be on the table, done, warm, the way it should be. I've been late with this before and I remember your face. not this time. this time the table's ahead of you."
    ], context: "「用意しとく」の「とく」は英語に無い。I'll have it ready と、have + O + 形容詞で「用意できた状態にしておく」。I'll prepare it だと準備の動作で、「しておく」の完了の感じが出ない。「とく」は英語では結果の状態で言う。", category: 'request', month: '2026-10' },
    { daySlot: 18, japanese: 'そのままにしといて', english: [
        "leave it",
        "just leave it there",
        "just leave it there, I'll deal with it later",
        "leave it. I know it looks like a mess. it is a mess. but it's my mess and I know where everything in it is, and if you clean it, I'll spend a week finding things. leave it. I'll do it Sunday. probably."
    ], context: "「そのままにしとく」は leave it。leave は「去る」だが、「手を付けずに置く」の意味もある。keep it there とも言うが、leave のほうが「放っておく」の感じ。日本語の「しといて」を英語は leave 一語で言う。", category: 'request', month: '2026-10' },
    { daySlot: 18, japanese: '言っとくけど', english: [
        "just so you know",
        "just so you know, in advance",
        "just so you know, I'm not going to be there Friday",
        "just so you know. I'm saying it now so it's not a surprise later. later, when it happens, and you say why didn't you tell me, I'll say I did, Tuesday, and you'll say oh. that oh is what this sentence is for."
    ], context: "「言っとく」は just so you know。「知っておいてもらうために」で、動詞の「言う」が消えている。I'll tell you in advance より短い。日本語の「とく」の予告の含みを、英語は so you know という目的の形で言う。", category: 'filler', month: '2026-10' },
    { daySlot: 18, japanese: '取っといて', english: [
        "save me one",
        "save me one, will you?",
        "save me one, I'll be late but I'm coming",
        "save me one. I'm late. I know. I'm always late and you always save me one, and I've never said thank you properly, so: thank you. properly. now save me one, because I'm coming and I'm hungry."
    ], context: "「取っとく」は save。save me one で「一つ取っておいて」。keep one for me でも言える。日本語の「とく」の「後で使うために置く」を、英語は save という動詞が持つ。動作ではなく目的の動詞を選ぶ。", category: 'request', month: '2026-10' },
    { daySlot: 18, japanese: '覚えとく', english: [
        "I'll remember that",
        "noted",
        "noted, I'll keep that in mind",
        "noted. I'm not writing it down, but I'm not forgetting it either. it's in the part of my head where things go when they might matter later. most of that part is nonsense. this one's not. this one I'll find again."
    ], context: "「覚えとく」は keep in mind か、短く noted。remember だと単に覚える。keep in mind は「頭に置いておく」で、「とく」の感じが keep に入る。日本語の「とく」を英語は keep で受けることが多い。", category: 'reaction', month: '2026-10' },
    { daySlot: 18, japanese: '開けといて', english: [
        "leave it open",
        "leave the door open",
        "leave the door open, I'll be right back",
        "leave it open. I'll be two minutes. if you close it I have to find the key and the key is in the jacket and the jacket is somewhere and the somewhere is the problem. two minutes. door open. thank you."
    ], context: "「開けとく」は leave it open。leave + O + 形容詞で「〜の状態にしておく」。keep it open だと「開け続ける」で、意識して保つ感じ。leave は放っておく。日本語の「とく」は両方に使えるが、英語は leave と keep で放置と維持を分ける。", category: 'request', month: '2026-10' },
    { daySlot: 18, japanese: '買っといた', english: [
        "I got some",
        "I picked some up",
        "I picked some up on the way, we were out",
        "I picked some up. we were out. we've been out for three days and nobody said anything and I kept thinking someone would. nobody did. so I did. it's in the cupboard. the cupboard where it always is. the empty one. it's not empty now."
    ], context: "「買っといた」は pick up。「ついでに買っておく」の感じが pick up にある。bought だと買った事実だけ。日本語の「とく」の「先回り」を、英語は pick up や get で言う。動詞に「ついで」の含みを持たせる。", category: 'reaction', month: '2026-10' },
    { daySlot: 18, japanese: '温めといて', english: [
        "keep it warm",
        "keep it warm for me",
        "can you keep it warm for me, I'm ten minutes out",
        "keep it warm. I'm close. I'm closer than I was when I said I was close. I know that's what I said last time. this time the train is actually moving and I can see the station. ten minutes. keep it warm. please."
    ], context: "「温めとく」は keep it warm。keep + O + 形容詞で「〜の状態を保っておく」。leave だと放置で冷める。維持は keep。日本語の「とく」が、英語では leave(放置)か keep(維持)かで動詞が分かれる。その分かれ目が骨格。", category: 'request', month: '2026-10' },
    { daySlot: 18, japanese: '席取っといて', english: [
        "grab me a seat",
        "grab me a seat, will you?",
        "grab me a seat near the front, I'll be there in five",
        "grab me a seat. near the front. not the very front. the front where you can see but nobody can see you looking at your phone. you know the row. you always find the row. find it again. I'm five minutes out."
    ], context: "「席を取っとく」は grab a seat か save a seat。grab は「さっと取る」、save は「取っておく」。日本語の「とく」を英語は動詞の選択で表す。「とく」という助動詞が無いぶん、英語は動詞そのものに「先回り」の意味を持たせる。", category: 'request', month: '2026-10' },
    { daySlot: 18, japanese: '知っといたほうがいい', english: [
        "you should know",
        "you should probably know this",
        "you should probably know this before you go in there",
        "you should know. before you go in. I'm not saying it'll change what you do. it might not. but if you go in without it and find out inside, you'll look at me after and ask why I didn't say. so I'm saying. now. before."
    ], context: "「知っといたほうがいい」は you should know。「とく」が消えて should だけで言う。知る、という動作に「しておく」は要らない、と英語は考える。日本語の「とく」が付く動詞でも、英語では何も足さない場合がある。", category: 'suggestion', month: '2026-10' },
];
