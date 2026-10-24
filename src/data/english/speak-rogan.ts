/**
 * SPEAK — 10本の指 × ネイティブの口語の部品。/english/speak の本体データ。
 *
 * 【材料】Joe Rogan Experience 本編 #2423〜#2561 から、ゲスト1人・90分以上の回 130本(344時間 / 約391万語)。
 * YouTube の自動字幕(en-orig)を 2026-10-07 に取得して数えた。話者は分けていない —
 * Rogan は130本全部にいる唯一の人なので「多くの回に出る形」は彼の癖か、ネイティブ共通の骨組み。
 *
 * 【数字のルール】
 * - eps = その形が出た回の数(130本中)。手で盛らない。思いつきの部品は足さない
 * - ex = 字幕のまま(言いよどみの重複だけ1つに畳んだ)。15〜20語以内の短い引用だけ
 * - plug = 英検の二次の2分スピーチ・質疑で、その部品をそのまま使う1文(自作。中学英語)
 * - 「on purpose」「a degree(角度)」「He's an animal」のように別の意味が混ざる語は、絞った形で数え直した値を載せる
 *
 * 【作文(/english/write/core5)との違い】
 * 作文は凝った枠(The idea that ~ has attracted considerable attention)で点を取る。
 * 口では逆 — 凝った枠はほぼ使われない(the reality is 0.1回/時、that being said ほぼ0)。
 * 骨は And / So / I think と、同じ簡単な形の連打。
 */

import type { EngineId } from './write-core5';

export const SPEAK_CORPUS = {
    show: 'The Joe Rogan Experience',
    range: '#2423 - #2561',
    episodes: 130,
    hours: 344,
    words: 3912565,
    monologues: 1125,
    fetched: '2026-10-07',
};

/** リズムの実測 */
export const RHYTHM: { label: string; value: string; note: string }[] = [
    { label: 'SPEED', value: '190 wpm', note: '1分に190語。真似しなくていい。形だけ盗む' },
    { label: 'ONE BREATH', value: '8 words', note: '0.7秒の間で区切った「ひと息」の中央値。下位25%は3語、上位25%は17語' },
    { label: 'SHORT BREATHS', value: '27%', note: 'ひと息の27%は1〜3語(Yeah. / Right. / That\'s crazy.)。短く受けて、長く走る' },
    { label: 'AND', value: '1 in 26', note: '2分の独白では26語に1回 and。接続詞を選ばずに、And でつなぎ続ける' },
    { label: 'IN MY OPINION', value: '0', note: '2分の独白1,125本の1文目に In my opinion は上位に1回も無い。I think / Well, / You know, / So, かいきなり本題' },
];

/** 2分の独白で増えるもの・消えるもの(1000語あたり、会話全体との比) */
export const MONO_SHIFT: { form: string; mono: number; all: number }[] = [
    { form: 'for example / for instance', mono: 0.12, all: 0.07 },
    { form: 'the reason', mono: 0.15, all: 0.11 },
    { form: 'we', mono: 7.23, all: 5.55 },
    { form: 'and', mono: 38.91, all: 30.77 },
    { form: 'which is', mono: 0.77, all: 0.61 },
    { form: 'like', mono: 15.98, all: 19.96 },
    { form: 'right?', mono: 3.12, all: 4.4 },
    { form: 'I mean', mono: 1.31, all: 2.08 },
    { form: "that's crazy / nuts / wild", mono: 0.04, all: 0.26 },
];

export type MoveId = 'stack' | 'notbut' | 'voice' | 'imagine' | 'thing' | 'why' | 'restart';

/** 議論の型。会話全体で数えた値 */
export const MOVES: { id: MoveId; key: string; en: string; ja: string; stat: string; how: string; ex: string[] }[] = [
    {
        id: 'stack', key: 'B', en: 'STACK THREE', ja: '同じ出だしを3回積む',
        stat: '130本中100本(25語以内に同じ2語の出だしが3回)',
        how: '理由を First, Second で並べない。同じ形で3回言って、短い1文で締める。部品が少ないので冠詞と be の事故が起きにくい',
        ex: [
            'you get specialization, you get urbanization, you get history, you get religion',
            'they have steaks, they have fish, they have everything',
            'you can overcome very terrifying situations and you can triumph and you can do this',
        ],
    },
    {
        id: 'notbut', key: 'G', en: "IT'S NOT X. IT'S Y.", ja: 'Xじゃない、Yだ',
        stat: '130本中127本(ゆるい数え方)',
        how: '相手の見方を1語で置き換える。お題の言い直しに使うと、2分の芯が1行で立つ',
        ex: [
            "It's not a humanitarian project, it's a voting project.",
            "It's not what's in the sand, it's what's in the rock.",
            "It's not the full genome, it's a portion of it.",
        ],
    },
    {
        id: 'voice', key: 'A', en: 'DO THE VOICE', ja: '人のセリフにして言う',
        stat: '1時間に33回 / 130本中130本(they\'re like / he goes / I\'m like)',
        how: '立場を説明しないで、その人のセリフを演じる。反対意見を出すときに一番効く',
        ex: [
            'he\'s like, I just wasted my time.',
            'they\'re like, "Oh, look, we could turn this into a missile."',
            'a rational person would say, "Oh, this is great."',
        ],
    },
    {
        id: 'imagine', key: 'E', en: 'IMAGINE', ja: '想像させる',
        stat: '1時間に3.5回 / 130本中128本',
        how: '抽象的なお題を、聞き手の頭の中の1場面にする',
        ex: [
            "Imagine you don't know anything about them.",
            'Imagine if you were from another civilization and you saw these things.',
        ],
    },
    {
        id: 'thing', key: 'F', en: 'THE THING IS', ja: '芯を名指しする',
        stat: '1時間に1.4回 / 130本中121本(the thing is / that\'s the thing / the problem is)',
        how: '話がずれそうな時に、これを言ってから1文で芯を置く',
        ex: [
            'The problem is the aging.',
            "That's the thing that no one wants to address.",
        ],
    },
    {
        id: 'why', key: 'H', en: 'WHY? BECAUSE', ja: '自分で問って自分で答える',
        stat: '130本中57本(少ないが決め所で出る)',
        how: '2分の後半、締めの直前に1回だけ',
        ex: ['Why? Because it works.', 'Why? Because they never saw a whale.'],
    },
    {
        id: 'restart', key: 'C', en: 'X, X', ja: '頭を繰り返して時間を稼ぐ',
        stat: '1時間に1.8回 / 130本中126本',
        how: '誤りではない。言葉が出ない時は、文の頭を繰り返していい。日本語の「えーと」より自然に聞こえる',
        ex: ["it's a, it's a mind melt.", 'you have, you have far more protections.'],
    },
];

/** 2分の組み立て。1,125本の独白を通読して見えた順番 */
export const TALK_STEPS: { n: number; en: string; ja: string; ex: string }[] = [
    { n: 1, en: 'CLAIM IN ONE LINE', ja: '主張を1文。前置きを積まない', ex: "So, let's start from the fire. / I would unblock our resources." },
    { n: 2, en: 'STACK, THEN PUNCH', ja: '同じ形で証拠を連打して、3〜4語で締める', ex: 'You need germanium for night vision. You need gallium for semiconductors. ... We have it all.' },
    { n: 3, en: 'ONE THING YOU LIVED', ja: '自分の体験を数字つきで1つ', ex: 'I lived in LA for 29, 30 years. I was evacuated three different times.' },
    { n: 4, en: "NOT X. IT'S Y.", ja: 'Xじゃない、Yだ', ex: 'This is not climate change. This is not some new thing.' },
    { n: 5, en: 'DO THE VOICE', ja: '普通の人のセリフを入れる', ex: 'A rational person would say, "Oh, this is great."' },
    { n: 6, en: 'ASK AND ANSWER', ja: '自分で問いを出して自分で答える', ex: 'So which one is likely to lead to greater problems? The one that ...' },
    { n: 7, en: 'SO, ONE LINE', ja: '締めは So で1行', ex: 'So that\'s my answer.' },
];

export interface SpeakPart {
    en: string;     // 部品
    ja: string;     // 何をする部品か
    eps: number;    // 130本中、出た回の数
    ex: string;     // 字幕のまま
    plug: string;   // 英検の2分・質疑でそのまま使う1文
    plugJa: string;
}

export interface FingerSpeak {
    asks: { en: string; ja: string }[];   // その指を立てたら、自分に聞く3つの問い
    parts: SpeakPart[];
    talk: { topic: string; topicJa: string; lines: { en: string; step: number }[] };
}

export const FINGER_SPEAK: Record<EngineId, FingerSpeak> = {
    money: {
        asks: [
            { en: 'Who makes money off it?', ja: '誰が儲かる?' },
            { en: "Who's paying for it?", ja: '誰が払う?' },
            { en: "What's the incentive?", ja: '動機は?' },
        ],
        parts: [
            { en: "What's the incentive?", ja: '動機を問う。お金の指の芯', eps: 44, ex: "Well, there's not a lot of incentive to teach this stuff.", plug: "What's the incentive? Companies save money, so they'll do it anyway.", plugJa: '動機は? 会社は金が浮くから、どうせやる。' },
            { en: 'make a living', ja: '暮らしている人の側から言う', eps: 35, ex: "There's some people that for whatever reason, they never figure out how to make a living at it.", plug: 'Those people still have to make a living.', plugJa: 'その人たちだって食べていかなきゃならない。' },
            { en: "It's (not) worth it.", ja: '損得を一言で決める', eps: 34, ex: "It's not worth it.", plug: 'Is it expensive? Yes. Is it worth it? Absolutely.', plugJa: '高い? 高い。その価値は? ある。' },
            { en: "It's expensive.", ja: 'コストを置く', eps: 34, ex: "It's very expensive, so very few people do it.", plug: "It's expensive, so only big companies can do it.", plugJa: '高いから、大企業にしかできない。' },
            { en: 'make a lot of money', ja: '誰が儲かるか', eps: 34, ex: "It's because they wanted to make a lot of money and that's what they did.", plug: 'Somebody is making a lot of money on this.', plugJa: 'これで大儲けしている人がいる。' },
            { en: 'making money off (of) ~', ja: '儲けの出どころを名指しする', eps: 33, ex: "You know, they're making so much money off weed in California.", plug: "They're making money off our attention.", plugJa: '彼らは俺たちの注意で稼いでいる。' },
            { en: "can't afford to ~", ja: '小さい側・弱い側', eps: 30, ex: 'And then you can\'t afford to get tired.', plug: "Small shops can't afford to protect themselves.", plugJa: '小さい店には自分を守る余裕が無い。' },
            { en: 'pay for it', ja: '誰が払うか', eps: 24, ex: "Well, you have to show a likelihood that you're able to pay for it.", plug: "And who pays for it? We do. We're already paying for it.", plugJa: '誰が払う? 俺たち。もう払ってる。' },
            { en: "There's (no) money in it.", ja: 'なぜ起きる / 起きないか', eps: 11, ex: 'Whenever there\'s money in anything, they find a way to get a part of that money.', plug: "Nobody fixes it, because there's no money in it.", plugJa: '誰も直さない。儲からないから。' },
            { en: 'The bottom line is ~', ja: '締める', eps: 9, ex: "But the bottom line is you don't know what you don't know.", plug: "The bottom line is, it's cheaper to prevent it.", plugJa: '結局、防ぐほうが安い。' },
        ],
        talk: {
            topic: 'Should governments invest more in cybersecurity?',
            topicJa: '政府はサイバーセキュリティにもっと投資すべきか',
            lines: [
                { en: 'I think the government has to protect the small guys. Not Toyota. The small guys.', step: 1 },
                { en: 'In 2022, one small supplier got hacked. One company. And Toyota shut down fourteen factories for a day.', step: 2 },
                { en: "I run a small company. I don't have a security team. I don't have the money. I don't have the time. If somebody targets me, I'm done.", step: 3 },
                { en: "And the hackers know that. They don't go for the front door. They go for the back door.", step: 2 },
                { en: "This is not a company problem. This is a country problem.", step: 4 },
                { en: 'A lot of people would say, "Why should taxpayers pay for Toyota\'s suppliers?" And I get it.', step: 5 },
                { en: 'But who pays when fourteen factories stop? The workers pay. The customers pay. Everybody pays.', step: 6 },
                { en: "So that's my answer. Prevention is better than cure, and it's always cheaper.", step: 7 },
            ],
        },
    },
    time: {
        asks: [
            { en: 'Does it save time, or eat time?', ja: '時間が浮く? 食われる?' },
            { en: 'What did it look like years ago?', ja: '昔はどうだった?' },
            { en: 'Where does it end up over time?', ja: '時間が経つとどこへ行く?' },
        ],
        parts: [
            { en: '~ years ago', ja: '昔と今を並べる。130本全部に出る', eps: 130, ex: "So I mean geez that's like what 40 years ago now?", plug: 'Twenty years ago, nobody had a smartphone.', plugJa: '20年前、スマホを持っている人はいなかった。' },
            { en: 'right now', ja: '今の話に引き戻す', eps: 129, ex: "Right now you're just like caught in the crossfire.", plug: 'Right now, people are working longer than ever.', plugJa: '今、人はかつてないほど長く働いている。' },
            { en: 'over time', ja: '少しずつ変わる', eps: 65, ex: 'It became less safe over time.', plug: 'Over time, it adds up.', plugJa: '時間が経つと、積み重なる。' },
            { en: 'at some point', ja: 'いつかは必ず', eps: 64, ex: 'So, at some point that story will come out.', plug: 'At some point, robots will do this job.', plugJa: 'いつかは、ロボットがこの仕事をやる。' },
            { en: 'back in the day', ja: '昔は(口語)', eps: 63, ex: 'That was back in the day where everybody smoked in the house.', plug: 'Back in the day, you had to go to the office to work.', plugJa: '昔は、働くには会社に行くしかなかった。' },
            { en: 'spend (less / so much) time ~', ja: '時間の使い道', eps: 61, ex: 'Yeah, but you could also just spend less time on the internet.', plug: 'We spend so much time on the train.', plugJa: '電車の中でものすごい時間を使っている。' },
            { en: 'these days', ja: '今どき', eps: 55, ex: 'What is he doing these days?', plug: 'These days, you can work from anywhere.', plugJa: '今どき、どこでも働ける。' },
            { en: 'the whole time', ja: 'その間ずっと', eps: 48, ex: "They're talking the whole time.", plug: "And the whole time, you're not getting paid.", plugJa: 'しかもその間ずっと、給料は出ていない。' },
            { en: "I just don't have the time.", ja: '時間が無い(個人の側)', eps: 24, ex: "I just don't have the time.", plug: "Parents say, \"I just don't have the time.\" And they're right.", plugJa: '親は「時間が無い」と言う。それは本当だ。' },
            { en: 'start from scratch', ja: 'ゼロからやり直す', eps: 16, ex: 'So you start from scratch.', plug: "If you lose it, you start from scratch.", plugJa: '失ったら、ゼロからやり直し。' },
            { en: "It's only a matter of time.", ja: '時間の問題', eps: 15, ex: 'So, it was only a matter of time.', plug: "It's only a matter of time before it happens here.", plugJa: 'ここで起きるのも時間の問題だ。' },
            { en: 'a waste of time', ja: '時間の無駄', eps: 8, ex: 'No, my college days were a complete waste of time.', plug: 'Long meetings are a complete waste of time.', plugJa: '長い会議は完全に時間の無駄。' },
        ],
        talk: {
            topic: 'Should companies adopt a four-day workweek?',
            topicJa: '企業は週休3日制を導入すべきか',
            lines: [
                { en: 'I think yes. Not for everybody. But for most office jobs, yes.', step: 1 },
                { en: 'Long meetings are a waste of time. Long commutes are a waste of time. Waiting for an answer is a waste of time.', step: 2 },
                { en: 'I take a lesson every night. Twenty-five minutes. And over time, it adds up.', step: 3 },
                { en: "It's not about working less. It's about wasting less.", step: 4 },
                { en: 'My boss would be like, "Who\'s going to answer the phone on Friday?" Fair question.', step: 5 },
                { en: "So what happens if we don't change? People burn out, and you start from scratch with new people. That's the real cost.", step: 6 },
                { en: "So that's my answer. At some point, every company will do this. Right now, the smart ones go first.", step: 7 },
            ],
        },
    },
    body: {
        asks: [
            { en: 'Is it good for you or bad for you?', ja: '体にいい? 悪い?' },
            { en: 'What does it do to your body long-term?', ja: '長い目で、体に何をする?' },
            { en: 'Does it stress you out?', ja: 'ストレスになる?' },
        ],
        parts: [
            { en: 'your body', ja: '一般の you で体を語る', eps: 95, ex: 'It eats holes in your body.', plug: "Your body doesn't care how busy you are.", plugJa: '体は、お前がどれだけ忙しいかなんて気にしない。' },
            { en: "It's (not) good for you.", ja: '体への判定', eps: 66, ex: "It's not good for you.", plug: "Everybody knows it's not good for you.", plugJa: '体に良くないのはみんな知っている。' },
            { en: 'stressed out', ja: '心の負担', eps: 58, ex: 'It made me so stressed out.', plug: "People are stressed out, so they eat junk.", plugJa: 'みんなストレスで、ジャンクを食べる。' },
            { en: 'mental health', ja: '心の健康', eps: 38, ex: "They're bringing up like my mental health stuff, which we've talked about before.", plug: "And it's not just your body. It's your mental health.", plugJa: '体だけじゃない。心の健康の話でもある。' },
            { en: 'long-term', ja: '長い目で', eps: 36, ex: "Well, it's long-term storytelling.", plug: 'Long-term, it costs us more.', plugJa: '長い目で見ると、高くつく。' },
            { en: 'feel great / feel terrible', ja: '体感で言う', eps: 35, ex: 'And you go to Italy and you have a spaghetti and you feel great.', plug: 'You eat it, you feel great for ten minutes, then you feel terrible.', plugJa: '食べると10分は最高。そのあと最悪。' },
            { en: "It's bad for you.", ja: 'はっきり悪いと言う', eps: 31, ex: "It's like so bad for you.", plug: "Sugar is bad for you. That's not a secret.", plugJa: '砂糖は体に悪い。秘密でも何でもない。' },
            { en: 'side effects', ja: '副作用・思わぬ代償', eps: 31, ex: 'Are there side effects that have been observed?', plug: 'Every rule has side effects.', plugJa: 'どんな規則にも副作用がある。' },
            { en: 'get in shape', ja: '体を作る', eps: 21, ex: 'But running every day a little bit, couple miles, you get in shape.', plug: "Walk thirty minutes a day and you get in shape.", plugJa: '1日30分歩けば、体はできてくる。' },
            { en: 'take care of yourself', ja: '自分の体は自分で', eps: 14, ex: 'You got to take care of yourself.', plug: "In the end, you have to take care of yourself.", plugJa: '結局、自分の体は自分で守るしかない。' },
            { en: 'burnt out', ja: '燃え尽きる', eps: 13, ex: 'I was really burnt out and so I fixed that now.', plug: 'Nurses are burnt out.', plugJa: '看護師は燃え尽きている。' },
            { en: 'get enough sleep', ja: '睡眠', eps: 9, ex: "There's probably a thousand things that go wrong when you don't get enough sleep chronically.", plug: "Kids don't get enough sleep because of their phones.", plugJa: '子どもはスマホのせいで寝不足だ。' },
        ],
        talk: {
            topic: 'Should the government tax sugary drinks?',
            topicJa: '政府は砂糖入り飲料に課税すべきか',
            lines: [
                { en: "I think yes. Sugar is bad for you, and everybody knows it.", step: 1 },
                { en: "It's cheap. It's everywhere. It's in every vending machine on every corner.", step: 2 },
                { en: "You drink one when you're stressed out. You feel great for ten minutes. Then you feel terrible.", step: 3 },
                { en: "This is not about freedom. This is about cost. Long-term, we all pay for it.", step: 4 },
                { en: 'People would say, "Don\'t tell me what to drink." And I get it.', step: 5 },
                { en: "But who pays when people get sick? The hospitals pay. The taxpayers pay.", step: 6 },
                { en: "So tax it a little, and use the money to help people take care of themselves.", step: 7 },
            ],
        },
    },
    happiness: {
        asks: [
            { en: 'Does it make people happy, or just comfortable?', ja: '幸せにする? 楽にするだけ?' },
            { en: 'Does it give people a sense of purpose?', ja: '目的をくれる?' },
            { en: 'What matters at the end of the day?', ja: '結局、何が大事?' },
        ],
        parts: [
            { en: 'happy / not happy', ja: '一番素直な語。130本中114本', eps: 114, ex: "I'm so happy you're out there and this is so exciting.", plug: "Rich people aren't always happy.", plugJa: '金持ちがいつも幸せとは限らない。' },
            { en: 'I love it / I love doing it', ja: '好きだと言い切る', eps: 102, ex: 'I love that guy.', plug: 'I love what I do, so I never feel poor.', plugJa: '好きなことをしているから、貧しいと感じない。' },
            { en: 'enjoy it / enjoy life', ja: '楽しむ', eps: 78, ex: 'I enjoy it a lot.', plug: "If you can't enjoy it, what's the point?", plugJa: '楽しめないなら、何のため?' },
            { en: 'It feels good.', ja: '気分で言う', eps: 64, ex: "It's like it feels good.", plug: 'Helping people feels good. It just does.', plugJa: '人を助けるのは気分がいい。理屈じゃない。' },
            { en: 'at the end of the day', ja: '結局のところ', eps: 45, ex: 'Now, at the end of the day, history is the judge of everything.', plug: "At the end of the day, people want to feel useful.", plugJa: '結局、人は役に立っていると感じたい。' },
            { en: 'a sense of purpose', ja: '生きる目的', eps: 27, ex: 'And it gives you a sense of purpose, right?', plug: 'A job gives you a sense of purpose, not just money.', plugJa: '仕事は金だけじゃなく、目的をくれる。' },
            { en: 'grateful', ja: '感謝', eps: 26, ex: 'You got to be grateful.', plug: "Happy people aren't lucky. They're grateful.", plugJa: '幸せな人は運がいいんじゃない。感謝しているんだ。' },
            { en: 'miserable', ja: 'みじめ', eps: 24, ex: 'And they were all miserable.', plug: 'You can make a lot of money and still be miserable.', plugJa: '大金を稼いでも、みじめなままでいられる。' },
            { en: 'fulfilling', ja: '満たされる', eps: 23, ex: "If you're working in a factory and you're just putting the dial on the box, that's not fulfilling.", plug: "Easy work isn't fulfilling.", plugJa: '楽な仕事は満たされない。' },
            { en: 'the little things', ja: '小さなこと', eps: 21, ex: "And it's crazy, but it's like I need those little things.", plug: "It's the little things. A good coffee. A good walk.", plugJa: '小さなことだ。うまいコーヒー。いい散歩。' },
            { en: 'what matters', ja: '大事なのは', eps: 11, ex: "It's completely normal to go through rough patches, and what matters is how you deal with them.", plug: "What matters is who you spend your time with.", plugJa: '大事なのは、誰と時間を過ごすか。' },
        ],
        talk: {
            topic: 'Does money make people happy?',
            topicJa: 'お金は人を幸せにするか',
            lines: [
                { en: "I think money makes you comfortable. It doesn't make you happy.", step: 1 },
                { en: "You can buy a bigger house. You can buy a faster car. You can't buy a reason to get up in the morning.", step: 2 },
                { en: "I worked in finance for years. Good money. And I was miserable.", step: 3 },
                { en: "It's not about how much you make. It's about what you do all day.", step: 4 },
                { en: 'People say, "Easy for you to say." Fair enough. If you can\'t pay rent, money matters.', step: 5 },
                { en: "But after that? What makes people happy? A sense of purpose. Good people around you. The little things.", step: 6 },
                { en: 'So at the end of the day, money is the floor. It\'s not the ceiling.', step: 7 },
            ],
        },
    },
    education: {
        asks: [
            { en: 'Does it teach you to figure things out?', ja: '自分で解く力がつく?' },
            { en: 'Does it give you a skill you can use?', ja: '使える技術になる?' },
            { en: 'Who can get it, and who gets left out?', ja: '誰が受けられて、誰が取り残される?' },
        ],
        parts: [
            { en: 'figure it out', ja: '自分で解く。130本中128本', eps: 128, ex: 'I just could not figure it out.', plug: 'School should teach kids how to figure things out.', plugJa: '学校は、自分で答えを出す方法を教えるべきだ。' },
            { en: 'in school / high school', ja: '学校の話', eps: 98, ex: 'Made great money in high school.', plug: "Nobody taught me that in school.", plugJa: '学校では誰もそれを教えてくれなかった。' },
            { en: 'practice', ja: '練習', eps: 81, ex: "You just can't do day or three without practicing.", plug: "You don't learn English from a book. You learn it from practice.", plugJa: '英語は本で覚えない。練習で覚える。' },
            { en: 'I learned a lot.', ja: '学んだことを言う', eps: 58, ex: 'And I learned a lot.', plug: 'I failed, and I learned a lot.', plugJa: '失敗して、多くを学んだ。' },
            { en: 'a skill / skills', ja: '技術', eps: 55, ex: 'That would be a skill that would actually transfer over.', plug: "A degree is a piece of paper. A skill is something you can use.", plugJa: '学位は紙1枚。技術は使えるもの。' },
            { en: 'go to college', ja: '大学に行く', eps: 53, ex: 'Well, again, I should have went to college.', plug: "Not everybody needs to go to college.", plugJa: '全員が大学に行く必要はない。' },
            { en: 'get better at ~', ja: '上達する', eps: 31, ex: 'When you teach something, you get better at it.', plug: 'The only way to get better at speaking is to speak.', plugJa: '話すのがうまくなる方法は、話すことだけ。' },
            { en: 'get good at ~', ja: 'うまくなる', eps: 26, ex: "And that's how they get good at it.", plug: "You don't get good at anything in one year.", plugJa: '何事も1年じゃうまくならない。' },
            { en: 'put in the work', ja: '努力を積む', eps: 14, ex: 'And they have to put in the work.', plug: "Free school is great. You still have to put in the work.", plugJa: '学費無料はいい。でも努力はやっぱり要る。' },
            { en: 'learn the hard way', ja: '痛い目を見て学ぶ', eps: 8, ex: 'I actually had to learn the hard way.', plug: 'I learned the hard way. I never prepared for the test.', plugJa: '俺は痛い目を見て学んだ。試験の準備を一度もしなかった。' },
            { en: 'trial and error', ja: '試行錯誤', eps: 7, ex: 'Just trial and error.', plug: 'Real learning is trial and error.', plugJa: '本当の学びは試行錯誤だ。' },
        ],
        talk: {
            topic: 'Should university education be free for everyone?',
            topicJa: '大学教育は全員無料にすべきか',
            lines: [
                { en: "I think it should be cheaper. But free for everyone? No.", step: 1 },
                { en: "Free doesn't make you study. Free doesn't make you show up. Free doesn't make you put in the work.", step: 2 },
                { en: "I learned most of my English after school. Twenty-five minutes a night, by trial and error.", step: 3 },
                { en: "It's not about the degree. It's about the skill.", step: 4 },
                { en: 'Students would say, "But I can\'t afford it." And that\'s the real problem.', step: 5 },
                { en: "So who should get help? The kids who want to learn and can't pay. Not everybody.", step: 6 },
                { en: "So that's my answer. Make it cheaper for the people who need it, and make everyone else figure it out.", step: 7 },
            ],
        },
    },
    fairness: {
        asks: [
            { en: 'Does everybody get the same rules?', ja: '全員に同じ規則?' },
            { en: 'Who gets away with it?', ja: '誰が逃げ切っている?' },
            { en: 'What happens to regular people?', ja: '普通の人はどうなる?' },
        ],
        parts: [
            { en: 'regular people / normal people', ja: '普通の人の側に立つ', eps: 65, ex: 'A few thousand people like regular people like you and I that don\'t know about how these things work.', plug: 'Regular people pay for it. Rich people find a way out.', plugJa: '普通の人が払う。金持ちは抜け道を見つける。' },
            { en: 'deserve', ja: '受けて当然か', eps: 62, ex: 'Why do you deserve to be paid from taxpayer dollars?', plug: 'Everybody deserves a fair shot.', plugJa: '誰でも公平なチャンスを受けて当然だ。' },
            { en: 'the system', ja: '仕組みそのもの', eps: 50, ex: 'I think they look at the system and they go, "Well, this isn\'t fair to me."', plug: "It's not the people. It's the system.", plugJa: '人じゃない。仕組みだ。' },
            { en: 'the rules', ja: '規則', eps: 47, ex: "It's like they're playing a game, but they don't even know the rules.", plug: 'Same game, different rules. That\'s the problem.', plugJa: '同じ試合で、規則が違う。それが問題。' },
            { en: 'cheat', ja: 'ずる', eps: 47, ex: 'The only reason why you do that is because you want to cheat.', plug: "If cheating is cheaper than following the rules, people cheat.", plugJa: 'ずるのほうが安いなら、人はずるをする。' },
            { en: 'get away with it', ja: '逃げ切る', eps: 46, ex: 'Especially if they can get away with it.', plug: 'Big companies get away with it. Small shops get fined.', plugJa: '大企業は逃げ切る。小さい店は罰金を払う。' },
            { en: 'everybody gets ~', ja: '全員に同じだけ', eps: 26, ex: 'Everybody gets a chance.', plug: 'Everybody gets one vote. Everybody pays the same rate.', plugJa: '全員1票。全員同じ税率。' },
            { en: 'take advantage of ~', ja: 'つけこむ', eps: 25, ex: "Perhaps the real problem is like all things, someone's going to take advantage of it.", plug: 'Someone will always take advantage of it.', plugJa: 'いつだって誰かがつけこむ。' },
            { en: 'rigged', ja: '仕組まれている', eps: 19, ex: 'So, she\'s alleging that it was rigged the last time.', plug: 'If people think the game is rigged, they stop playing.', plugJa: '試合が八百長だと思ったら、人は参加をやめる。' },
            { en: "It's not fair.", ja: '不公平だと言い切る', eps: 18, ex: "The world isn't fair.", plug: "The world isn't fair. But the rules can be.", plugJa: '世界は公平じゃない。でも規則は公平にできる。' },
        ],
        talk: {
            topic: 'Should the rich pay higher taxes?',
            topicJa: '富裕層はもっと税金を払うべきか',
            lines: [
                { en: "I think yes. Not because rich people are bad. Because the system isn't fair.", step: 1 },
                { en: 'Regular people pay at the register. Regular people pay with every paycheck. Regular people pay first.', step: 2 },
                { en: "I run a small company. I pay everything on time. I don't have a team of accountants.", step: 3 },
                { en: "It's not about punishing success. It's about the same rules for everybody.", step: 4 },
                { en: 'A rich guy would say, "I earned it. Why should I pay more?" Fair question.', step: 5 },
                { en: "But who built the roads to his factory? Who trained his workers? We did. Everybody did.", step: 6 },
                { en: "So that's my answer. Everybody deserves a fair shot, and fair shots cost money.", step: 7 },
            ],
        },
    },
    freedom: {
        asks: [
            { en: 'Who gets to tell people what to do?', ja: '誰が人に指図できる?' },
            { en: 'Where does it stop — is it a slippery slope?', ja: 'どこで止まる? 坂道か?' },
            { en: "Can people still live their lives?", ja: '自分の人生を生きられる?' },
        ],
        parts: [
            { en: 'freedom', ja: 'そのまま言う', eps: 74, ex: 'It has an idea of freedom.', plug: "Freedom isn't free. Somebody pays for it.", plugJa: '自由はタダじゃない。誰かが払っている。' },
            { en: 'shut down', ja: '止める・黙らせる', eps: 60, ex: 'Well they shut down the internet during that period.', plug: "Once you shut down one voice, it's easy to shut down the next.", plugJa: '1人の声を止めたら、次も止めやすくなる。' },
            { en: 'You should be able to ~', ja: '本来できるべきこと', eps: 31, ex: "If that's what you want to do, you should be able to do it.", plug: 'You should be able to say what you think.', plugJa: '思ったことは言えるべきだ。' },
            { en: 'live your life', ja: '自分の人生', eps: 31, ex: 'Telling you how to live your life.', plug: "Let people live their lives.", plugJa: '人には人の人生を生きさせろ。' },
            { en: 'free speech', ja: '言論の自由', eps: 26, ex: "Comedy uniquely challenges the idea of free speech.", plug: "Free speech means speech you don't like, too.", plugJa: '言論の自由には、気に入らない言葉も含まれる。' },
            { en: 'censor / censorship', ja: '検閲', eps: 26, ex: "Like it's not good to censor people.", plug: 'Who decides what gets censored?', plugJa: '何を検閲するか、誰が決める?' },
            { en: 'tell people what to do', ja: '指図する', eps: 17, ex: "I mean, it's just infuriating. They love to tell you what to do.", plug: "Governments love to tell people what to do.", plugJa: '政府は人に指図するのが大好きだ。' },
            { en: 'leave people alone', ja: '放っておく', eps: 17, ex: 'But then leave people alone to live their lives.', plug: "If they're not hurting anybody, leave them alone.", plugJa: '誰も傷つけていないなら、放っておけ。' },
            { en: "It's a slippery slope.", ja: '歯止めが利かない', eps: 14, ex: "It's a dangerous slippery slope and you can't let that happen ever.", plug: "It starts with one rule. It's a slippery slope.", plugJa: '始まりは規則1本。そこから坂を転がる。' },
            { en: "You can't say that.", ja: '言えない空気', eps: 14, ex: "You can't say that on the air.", plug: "If people are scared to say anything, that's a problem.", plugJa: '何も言えないと人が怖がるなら、それは問題だ。' },
        ],
        talk: {
            topic: 'Should social media platforms remove harmful content?',
            topicJa: 'SNSは有害な投稿を削除すべきか',
            lines: [
                { en: "I think some of it, yes. Crimes, threats, yes. Opinions, no.", step: 1 },
                { en: "Remove the scams. Remove the threats. Remove the stuff that hurts kids. Leave the rest alone.", step: 2 },
                { en: "I say a lot of stupid things in English every night. I don't want somebody deleting them.", step: 3 },
                { en: "It's not about safety. It's about who gets to decide.", step: 4 },
                { en: 'The platforms would say, "We\'re just keeping people safe." Maybe.', step: 5 },
                { en: "But what happens when they start removing opinions they don't like? It's a slippery slope.", step: 6 },
                { en: "So my answer is, you should be able to say what you think, as long as you're not hurting anybody.", step: 7 },
            ],
        },
    },
    trust: {
        asks: [
            { en: 'Who is telling you this, and why?', ja: '誰が、なぜそれを言っている?' },
            { en: 'Is it transparent?', ja: '中身は見えている?' },
            { en: 'What happens when they lose credibility?', ja: '信用を失ったらどうなる?' },
        ],
        parts: [
            { en: "I don't believe ~", ja: '信じないと言い切る', eps: 84, ex: "That I don't believe.", plug: "I don't believe everything I read online.", plugJa: 'ネットで読んだことを全部は信じない。' },
            { en: 'Nobody knows.', ja: '誰も分からない', eps: 79, ex: 'Nobody knows how much time we have.', plug: "Nobody knows what's true anymore.", plugJa: 'もう誰も何が本当か分からない。' },
            { en: 'the narrative', ja: '筋書き', eps: 45, ex: 'I know it goes against the narrative, but apparently very healthy.', plug: "Everybody's selling a narrative.", plugJa: 'みんな筋書きを売っている。' },
            { en: 'skeptical', ja: '疑ってかかる', eps: 44, ex: "What's amazing to me is how many people in the general public are not skeptical.", plug: "Be skeptical. Not cynical. Skeptical.", plugJa: '疑え。ひねくれるんじゃない。疑え。' },
            { en: 'propaganda', ja: '宣伝工作', eps: 40, ex: 'That seems like propaganda from Iran or something.', plug: "Propaganda doesn't look like propaganda. It looks like news.", plugJa: '宣伝工作は宣伝工作に見えない。ニュースに見える。' },
            { en: 'cover up', ja: '隠す', eps: 38, ex: "I don't know how you maintain a cover up that long.", plug: "The cover-up is always worse than the mistake.", plugJa: '隠すほうが、間違いよりいつもたちが悪い。' },
            { en: 'transparency', ja: '透明性', eps: 34, ex: "It's adorable in its transparency.", plug: 'Show the data. Transparency builds trust.', plugJa: 'データを見せろ。透明性が信用を作る。' },
            { en: "I don't trust ~", ja: '信用しない', eps: 33, ex: "I've been in government most of my life and I just don't trust it.", plug: "People don't trust the news, so they trust YouTube.", plugJa: '人はニュースを信用しないから、YouTube を信用する。' },
            { en: 'lying to us', ja: '嘘をつく', eps: 32, ex: "I don't like it if they're lying to us.", plug: 'Once they get caught lying to us, it\'s over.', plugJa: '一度嘘がばれたら、それで終わり。' },
            { en: 'credibility', ja: '信用(のストック)', eps: 30, ex: 'During COVID, I think they kind of nuked all of their credibility.', plug: 'Credibility takes years to build and one day to lose.', plugJa: '信用は作るのに何年もかかり、失うのは1日。' },
            { en: "I don't buy it.", ja: '鵜呑みにしない', eps: 12, ex: "I don't buy that.", plug: 'They say it\'s for our safety. I don\'t buy it.', plugJa: '俺たちの安全のためだと言う。信じない。' },
            { en: 'take it with a grain of salt', ja: '割り引いて聞く', eps: 9, ex: 'So take what I\'m about to say with a grain of salt.', plug: 'Take everything with a grain of salt, including me.', plugJa: '全部割り引いて聞け。俺の話も含めて。' },
        ],
        talk: {
            topic: 'Can we still trust the news media?',
            topicJa: '私たちはまだニュースメディアを信用できるか',
            lines: [
                { en: "I think we can trust some of it. Not all of it. And that's fine.", step: 1 },
                { en: "TV has a narrative. Newspapers have a narrative. YouTube has a narrative too.", step: 2 },
                { en: "I use AI every day. It sounds sure of itself, and it's still wrong sometimes.", step: 3 },
                { en: "The problem isn't fake news. The problem is lazy readers.", step: 4 },
                { en: 'People say, "Nobody knows what\'s true anymore." I don\'t buy it.', step: 5 },
                { en: "So who do you trust? The people who show their sources. Transparency builds trust.", step: 6 },
                { en: "So my answer is, be skeptical, not cynical. Take everything with a grain of salt, including me.", step: 7 },
            ],
        },
    },
    roots: {
        asks: [
            { en: 'What was passed down to you?', ja: '何を受け継いだ?' },
            { en: 'What does it do to the community?', ja: '共同体に何をする?' },
            { en: 'What will our kids grow up with?', ja: '子どもは何と一緒に育つ?' },
        ],
        parts: [
            { en: 'community', ja: '地域・仲間', eps: 102, ex: 'So this community goes, "We will find you another place."', plug: "A town is not buildings. It's a community.", plugJa: '町は建物じゃない。共同体だ。' },
            { en: 'culture', ja: '文化', eps: 101, ex: "When they're wearing those traditional head garbs and body coverings, that's their culture.", plug: "Culture isn't in a museum. It's in the kitchen.", plugJa: '文化は博物館に無い。台所にある。' },
            { en: 'our kids / their kids', ja: '次の世代', eps: 92, ex: 'But what about their kids?', plug: 'What are our kids going to remember?', plugJa: '子どもたちは何を覚えている?' },
            { en: 'my family / your family', ja: '家族', eps: 90, ex: "It's your family's life.", plug: 'My family has done the same job for three generations.', plugJa: 'うちは3代同じ仕事をしている。' },
            { en: 'my dad / my grandfather', ja: '親・祖父母の話', eps: 88, ex: 'Well, Joe, my dad was Russian.', plug: 'My grandfather used to say, "Fix it before it breaks."', plugJa: '祖父はよく「壊れる前に直せ」と言っていた。' },
            { en: 'generation(s)', ja: '世代', eps: 81, ex: 'And most previous generations never experienced it.', plug: 'Every generation thinks the next one is soft.', plugJa: 'どの世代も、次の世代は甘いと思う。' },
            { en: 'tradition', ja: '伝統', eps: 72, ex: "There's context and there's tradition.", plug: "A tradition is just something that worked for a long time.", plugJa: '伝統とは、長いあいだうまくいったものにすぎない。' },
            { en: 'neighbors', ja: '隣人', eps: 51, ex: "It doesn't take much to be a good neighbor.", plug: "I don't even know my neighbors' names.", plugJa: '隣の人の名前すら知らない。' },
            { en: 'growing up', ja: '育った頃', eps: 48, ex: 'I went to see all those movies growing up.', plug: 'Growing up, everybody knew everybody.', plugJa: '子どもの頃は、みんな顔見知りだった。' },
            { en: 'old school', ja: '昔ながらの', eps: 45, ex: 'There are old school safes that you can do that too.', plug: "Call me old school, but I like face-to-face.", plugJa: '古いと言われてもいい、顔を合わせて話すのが好きだ。' },
            { en: 'passed down', ja: '受け継がれる', eps: 10, ex: 'Those people have stories that have been passed down generation after generation.', plug: "It was passed down for three hundred years. Don't end it in ten.", plugJa: '300年受け継がれた。10年で終わらせるな。' },
        ],
        talk: {
            topic: 'Is it important to preserve local traditions?',
            topicJa: '地域の伝統を守ることは大切か',
            lines: [
                { en: "I think yes. But not because they're old. Because they still work.", step: 1 },
                { en: 'A festival brings people out. A festival makes you meet your neighbors. A festival gives kids a story.', step: 2 },
                { en: "In a big city, you can live next to someone for ten years and never learn their name.", step: 3 },
                { en: "It's not about the past. It's about the community.", step: 4 },
                { en: 'Young people would say, "It\'s boring. It\'s old school." Fair enough.', step: 5 },
                { en: "So what happens when it's gone? You can't buy it back. You start from scratch.", step: 6 },
                { en: "So my answer is, keep it, but let the kids change it. That's how it was passed down to us.", step: 7 },
            ],
        },
    },
    nature: {
        asks: [
            { en: 'Is it sustainable?', ja: '続けられる?' },
            { en: 'What does it do to the planet long-term?', ja: '長い目で、地球に何をする?' },
            { en: 'Who lives closest to it?', ja: '一番近くで暮らしているのは誰?' },
        ],
        parts: [
            { en: 'hunting / hunters', ja: '自然と直接つきあう人', eps: 93, ex: 'Well, a lot of hunters up there for sure.', plug: 'Hunters and farmers care more about nature than most people.', plugJa: '猟師と農家は、たいていの人より自然を気にかけている。' },
            { en: 'farmers', ja: '農家', eps: 73, ex: "Farms aren't a scam.", plug: 'Ask the farmers. They see it every year.', plugJa: '農家に聞け。毎年見ている。' },
            { en: 'in the woods / in the mountains', ja: '自然の中', eps: 63, ex: "I'm going to go up, I got a house in the woods upstate.", plug: 'Kids should spend more time in the woods.', plugJa: '子どもはもっと森で過ごすべきだ。' },
            { en: 'the planet', ja: '地球全体', eps: 47, ex: "That's the real fear is that we're no longer going to be the apex predator of the planet.", plug: "The planet will be fine. We're the ones in trouble.", plugJa: '地球は平気だ。困るのは俺たちのほう。' },
            { en: 'in nature', ja: '自然の中で', eps: 38, ex: "But when you're alone in nature, you have to think about your surroundings.", plug: "When you're out in nature, your phone doesn't matter.", plugJa: '自然の中にいると、スマホはどうでもよくなる。' },
            { en: 'the animals', ja: '動物', eps: 35, ex: 'And what can the animals see that we can\'t?', plug: 'The animals were here first.', plugJa: '動物のほうが先にここにいた。' },
            { en: "It's not sustainable.", ja: '続かない', eps: 15, ex: "It's not sustainable.", plug: "Cheap stuff, thrown away every week. It's not sustainable.", plugJa: '安い物を毎週捨てる。続くわけがない。' },
            { en: 'microplastics', ja: '具体的な汚染の1語', eps: 12, ex: 'Microplastics are a real issue.', plug: "Microplastics are in the fish, and then they're in us.", plugJa: 'マイクロプラスチックは魚に入り、そして俺たちに入る。' },
            { en: 'outdoors', ja: '外で過ごす', eps: 12, ex: "I'm outdoors all the time.", plug: "I'm outdoors all day for work. I see the change.", plugJa: '仕事で一日中外にいる。変化が見える。' },
            { en: 'for the environment', ja: '環境のために', eps: 8, ex: 'Counterintuitively, nuclear power is like the best for the environment.', plug: "Is it good for the environment, or does it just look good?", plugJa: '環境に本当にいいのか、良く見えるだけか?' },
        ],
        talk: {
            topic: 'Should individuals do more to protect the environment?',
            topicJa: '個人は環境を守るためにもっと行動すべきか',
            lines: [
                { en: "I think yes. But don't stop at the individual.", step: 1 },
                { en: "I can bring my own bag. I can bring my own bottle. I can walk to the station. That's me.", step: 2 },
                { en: "I install interiors. I see how much gets thrown away on one job. A lot.", step: 3 },
                { en: "It's not a shopping problem. It's a system problem.", step: 4 },
                { en: 'People say, "One person can\'t change anything." I get it.', step: 5 },
                { en: "So what can one person do? Buy less. Fix more. And vote for people who change the rules.", step: 6 },
                { en: "So my answer is, do your part, and make the big players do theirs. Cheap stuff, thrown away every week, is not sustainable.", step: 7 },
            ],
        },
    },
};
