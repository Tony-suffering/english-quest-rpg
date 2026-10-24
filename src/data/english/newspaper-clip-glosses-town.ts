/**
 * CLIP EDITION 2026-09-25 の VOICES と FICTION、その注釈。
 * 住人は requiem-world.ts の canon から: Coach Vega / Kai / Devon / Mr Okafor (voices)、Walt / Paige / Sam (story)。
 */
import type { NewspaperEdition, SentenceGloss } from './newspaper';

export const CLIP_0925_VOICES: NewspaperEdition['voices'] = {
    kicker: 'VOICES · THE TOWN ANSWERS',
    headline: '“A Person Who Apologizes for Joy Is Not a Danger on the Road.”',
    standfirst: 'Two questions went round Tonio Town this week: whether a big moment should be shouted or simply said, and what to do when you’re told two laps and want three. The sideline, a garage and the DMV answered, along with one man who usually just watches.',
    turns: [
        {
            q: 'Coach Vega, you’re the one who tells Coach Daryl to turn it down. Was Lampley right to keep the big call plain?',
            a: 'Yes, and I say that as a man who works next to a very loud person. When the moment is big, the moment does the shouting for you. Your job is to say what happened and get out of the way. “Mike Tyson has been knocked out.” Six words, no window dressing. Anything you add is just you standing in front of the picture. Daryl would have quoted a movie. I love the guy. I’d still take the six words.',
        },
        {
            q: 'Kai, you record a show in your garage. Lampley played the tape and found he’d shouted more than he remembered. Does that happen to you?',
            a: 'Every single week. I finish an episode thinking I was calm and smart. Then I play it back and there’s a grown man yelling about a double play from 2001. So yeah, I give myself too much credit for the calm too. The best part of his story isn’t the advice. It’s that he actually listened to the tape. I re-record my endings about six times. I never re-record the yelling. That’s the part people stay for.',
        },
        {
            q: 'Devon, the colleague in the car had a bold prediction, pulled it back and regretted it. Would you have said it on air?',
            a: 'Honestly? Probably not. I’m the guy in the back seat with a strong opinion who says the safe one out loud. People like a lot of things that are wrong, and I’d put my own caution on that list. Lampley’s right. If you’re wrong, it goes into the wash and nobody remembers. If you’re right, you were the only one who said it. It’s simple advice. I’ve almost never taken it. Almost.',
        },
        {
            q: 'Mr Okafor, you give driving tests. A 20-year-old was told to do two laps in a famous old car and did three. Would you pass him?',
            a: 'I’d pass him, and I’d write a note in the margin. He asked himself, “Do I dare take my hand off the wheel?” That’s the right question. The confident ones never ask it, and they’re the ones I worry about. Then he came back shaking and said sorry for the extra lap. A person who apologizes for joy is not a danger on the road. I failed my test three times at eighteen. The day I passed, I went around the block once more than I was told.',
        },
    ],
};

export const CLIP_0925_STORY: NewspaperEdition['story'] = {
    kicker: 'FICTION · TONIO TOWN',
    headline: 'One More Lap',
    cast: 'Walt · Paige · Sam · a pickup with three pedals',
    byline: 'A Tonio Times Original',
    body: [
        'Walt’s pickup is older than Paige’s father, and it has three pedals.',
        'On Sunday morning he drove it to the empty lot behind Flo’s diner, got out, and handed Paige the keys.',
        '“Two laps,” he said. “Slow ones. Then we go home, and nobody tells your mother.”',
        'Sam, who is seven, sat in the middle of the bench seat with a juice box. He had come to watch.',
        'Paige is fifteen, and she talks about everything like a sports announcer. Usually she does it to tease the family. Today she did it to stay calm.',
        '“Paige is in the driver’s seat,” she said. “Paige has found the clutch. Paige is not sure it is the clutch.”',
        '“It’s the clutch,” said Walt.',
        '“She’s going to stall,” said Sam. “I’m calling it right now.”',
        'She stalled. The truck jumped once, like a dog hearing a noise, and went quiet. Sam looked very pleased with himself.',
        'The second time, the truck rolled forward. Then it needed second gear. Second gear was down by her knee, and both of her hands were on the wheel.',
        '“Do I dare take my hand off the wheel?” she said.',
        '“Everybody does,” said Walt. “One hand drives. The other one trusts it.”',
        'She let go with one hand and found second. The truck went around the lot at eleven miles an hour, which felt like a lot.',
        'She wanted to scream. She didn’t. She kept her voice flat, like a man on TV reading the news. “Paige has found second gear,” she said. That was all.',
        'That was one lap. Then two. Then, instead of stopping by the diner door, she went around again.',
        '“That’s three,” said Sam.',
        '“I can count,” said Walt. He was smiling.',
        'She stopped the truck. Her hands were shaking a little. “Sorry for the extra lap,” she said.',
        '“I don’t blame you,” said Walt. “I did four. Nobody told my mother either.”',
        'Paige cut the video that night. It ends on Walt, laughing at something off camera. The stall is not in it. Sam has asked for it back four times, as evidence.',
    ],
};

export const CLIP_0925_VS_GLOSSES: SentenceGloss[] = [
    // ================= VOICES =================
    {
        en: '“A Person Who Apologizes for Joy Is Not a Danger on the Road.”',
        chunks: [
            { en: '“A Person Who Apologizes for Joy', ja: '「うれしさのあまりに謝る人は ← ここが主語（who 以下が Person を修飾）' },
            { en: 'Is Not a Danger', ja: '危険な存在ではない ← 述語' },
            { en: 'on the Road.”', ja: '路上では」' },
        ],
        ja: '「うれしくて謝る人間は、道路の上で危険な人間ではない」',
        why: '主語が who 節ごと6語続き、動詞 Is が遅れて来る。apologize for 〜 の for は「〜のことで」で、joy を謝る理由に置く発想が日本語にない。a danger は可算で「危険な人・もの」。',
        picks: [
            { en: 'apologize for', ja: '〜のことで謝る', kind: 'phrase' },
            { en: 'a danger on the road', ja: '路上の危険（運転が危ない人）', kind: 'phrase' },
            { en: 'joy', ja: '喜び、うれしさ', kind: 'word' },
            { en: 'danger', ja: '危険な人・もの（可算）', kind: 'word' },
        ],
    },
    {
        en: 'Two questions went round Tonio Town this week: whether a big moment should be shouted or simply said, and what to do when you’re told two laps and want three.',
        chunks: [
            { en: 'Two questions went round Tonio Town', ja: '2つの問いがとにお町を回った ← 主語と動詞' },
            { en: 'this week:', ja: '今週、（コロンの後ろが問いの中身）' },
            { en: 'whether a big moment should be shouted', ja: '大きな瞬間は叫ぶべきか' },
            { en: 'or simply said,', ja: 'それとも淡々と言うべきか' },
            { en: 'and what to do', ja: 'そして、どうすればいいか' },
            { en: 'when you’re told two laps', ja: '2周と言われていて' },
            { en: 'and want three.', ja: '3周走りたいときに' },
        ],
        ja: '今週とにお町では2つの問いが回った。大きな瞬間は叫ぶべきか、それともただ言えばいいのか。そして「2周」と言われて3周走りたいとき、どうするか。',
        why: 'コロンの後ろに whether 節と what to do 節が名詞として並ぶ。should be shouted or simply said は受動態の過去分詞が or でつながり、said の前の should be が省略されている。you’re told two laps は tell の受動で「2周と言われる」。',
        picks: [
            { en: 'go round', ja: '（話・噂などが）広まる、出回る', kind: 'phrase' },
            { en: 'whether A or B', ja: 'AかBか', kind: 'phrase' },
            { en: 'what to do', ja: 'どうすべきか', kind: 'phrase' },
            { en: 'be told', ja: '言われる、指示される', kind: 'phrase' },
            { en: 'lap', ja: '（コースの）1周', kind: 'word' },
            { en: 'simply', ja: 'ただ、飾らずに', kind: 'word' },
        ],
    },
    {
        en: 'The sideline, a garage and the DMV answered, along with one man who usually just watches.',
        chunks: [
            { en: 'The sideline, a garage', ja: 'サイドライン（コーチ）、ガレージ' },
            { en: 'and the DMV answered,', ja: 'そして免許センターが答えた' },
            { en: 'along with one man', ja: 'ひとりの男と一緒に' },
            { en: 'who usually just watches.', ja: 'いつもはただ見ているだけの' },
        ],
        ja: 'サイドライン、ガレージ、免許センターが答えた。ふだんは見ているだけの男もひとり加わった。',
        why: '場所で人を指す換喩（The sideline＝コーチ、a garage＝ガレージで配信する人）。along with 〜 は主語に足す「〜も一緒に」で、動詞の数には影響しない。',
        picks: [
            { en: 'along with', ja: '〜と一緒に、〜も加えて', kind: 'phrase' },
            { en: 'sideline', ja: '（競技場の）サイドライン、ベンチ側', kind: 'word' },
            { en: 'DMV', ja: '車両管理局（米国の免許センター）', kind: 'word' },
            { en: 'just watch', ja: 'ただ見ているだけ', kind: 'phrase' },
        ],
    },
    {
        en: 'Coach Vega, you’re the one who tells Coach Daryl to turn it down.',
        chunks: [
            { en: 'Coach Vega,', ja: 'ベガコーチ、（呼びかけ）' },
            { en: 'you’re the one', ja: 'あなたがその人だ' },
            { en: 'who tells Coach Daryl', ja: 'ダリルコーチに言う（人）' },
            { en: 'to turn it down.', ja: '音量を下げろと' },
        ],
        ja: 'ベガコーチ、ダリルコーチに「声を落とせ」と言うのはあなたですよね。',
        why: 'you’re the one who 〜 は「〜するのはあなただ」という強調の型。tell A to do で指示を表す。turn it down は音量の比喩で「抑えろ」。it は具体物ではなく勢いそのもの。',
        picks: [
            { en: 'the one who', ja: '〜する（まさにその）人', kind: 'phrase' },
            { en: 'tell someone to do', ja: '人に〜するよう言う', kind: 'phrase' },
            { en: 'turn it down', ja: '（音量・熱量を）下げる、抑える', kind: 'phrase' },
        ],
    },
    {
        en: 'Was Lampley right to keep the big call plain?',
        chunks: [
            { en: 'Was Lampley right', ja: 'ランプリーは正しかったか' },
            { en: 'to keep the big call', ja: 'その大一番の実況を保ったのは' },
            { en: 'plain?', ja: '飾らないままに' },
        ],
        ja: 'ランプリーがあの大一番の実況を飾らずにやったのは正しかったのか。',
        why: 'be right to do は「〜したのは正しい」。keep O C で「OをCの状態に保つ」、C が形容詞 plain。call はここで「実況の一言、判定の声」という名詞。',
        picks: [
            { en: 'be right to do', ja: '〜したのは正しい', kind: 'phrase' },
            { en: 'keep A plain', ja: 'Aを飾らないままにする', kind: 'phrase' },
            { en: 'call', ja: '（実況・審判の）コール、一言', kind: 'word' },
            { en: 'plain', ja: '飾らない、あっさりした', kind: 'word' },
        ],
    },
    {
        en: 'Yes, and I say that as a man who works next to a very loud person.',
        chunks: [
            { en: 'Yes, and I say that', ja: 'そう、それを言うよ' },
            { en: 'as a man', ja: '〜な男として' },
            { en: 'who works next to', ja: '〜の隣で働いている' },
            { en: 'a very loud person.', ja: 'すごく声のでかい人の' },
        ],
        ja: 'そうだね。すごく声のでかい人の隣で働いている人間として言うけど。',
        why: 'I say that as 〜 は「〜の立場で言うけど」という前置き。as は「〜として」。自分の立場を明かしてから意見を言う英語の型で、日本語の「〜の身から言わせてもらうと」に近い。',
        picks: [
            { en: 'I say that as', ja: '〜の立場として言うけど', kind: 'phrase' },
            { en: 'next to', ja: '〜の隣で', kind: 'phrase' },
            { en: 'loud', ja: '声が大きい、うるさい', kind: 'word' },
        ],
    },
    {
        en: 'When the moment is big, the moment does the shouting for you.',
        chunks: [
            { en: 'When the moment is big,', ja: '瞬間が大きいときは' },
            { en: 'the moment does the shouting', ja: 'その瞬間が叫んでくれる' },
            { en: 'for you.', ja: 'あなたの代わりに' },
        ],
        ja: '大きな瞬間なら、叫ぶのは瞬間のほうがやってくれる。',
        why: 'do the shouting は「叫ぶという仕事をやる」。do the + 動名詞で役割を表す型（do the talking / do the cooking）。for you は「あなたの代わりに」。無生物の the moment が主語になる。',
        picks: [
            { en: 'do the shouting', ja: '叫ぶ役をやる', kind: 'phrase' },
            { en: 'do the + -ing', ja: '〜の役・仕事をする（do the talking など）', kind: 'phrase' },
            { en: 'for you', ja: 'あなたの代わりに', kind: 'phrase' },
        ],
    },
    {
        en: 'Your job is to say what happened and get out of the way.',
        chunks: [
            { en: 'Your job is', ja: 'あなたの仕事は' },
            { en: 'to say what happened', ja: '起きたことを言うこと' },
            { en: 'and get out of the way.', ja: 'そして邪魔にならないようどくこと' },
        ],
        ja: 'こっちの仕事は、何が起きたかを言って、あとは引っ込むことだ。',
        why: 'Your job is to do の to 不定詞が2つ（to say / (to) get）並び、2つ目の to が省略されている。get out of the way は物理的に「どく」から転じて「出しゃばらない」。',
        picks: [
            { en: 'your job is to', ja: 'あなたの役目は〜すること', kind: 'phrase' },
            { en: 'what happened', ja: '起きたこと', kind: 'phrase' },
            { en: 'get out of the way', ja: 'どく、邪魔をしない、出しゃばらない', kind: 'phrase' },
        ],
    },
    {
        en: '“Mike Tyson has been knocked out.”',
        chunks: [
            { en: '“Mike Tyson', ja: '「マイク・タイソンが' },
            { en: 'has been knocked out.”', ja: 'ノックアウトされました」' },
        ],
        ja: '「マイク・タイソンがノックアウトされました」',
        why: '現在完了の受動 has been + 過去分詞。「今まさにそうなった」を1文で言い切る実況の型。knock out は句動詞で、受動でも out が残る。',
        picks: [
            { en: 'knock out', ja: 'ノックアウトする、気絶させる', kind: 'phrase' },
            { en: 'has been knocked out', ja: 'ノックアウトされた（直後の報告）', kind: 'phrase' },
        ],
    },
    {
        en: 'Six words, no window dressing.',
        chunks: [
            { en: 'Six words,', ja: '6語' },
            { en: 'no window dressing.', ja: '飾りなし' },
        ],
        ja: '6語。飾りなし。',
        why: '動詞のない名詞句2つを並べた話し言葉。window dressing は店のショーウィンドウの飾り付けから「見せかけ、うわべの飾り」。',
        picks: [
            { en: 'window dressing', ja: 'うわべの飾り、見せかけ', kind: 'phrase' },
        ],
    },
    {
        en: 'Anything you add is just you standing in front of the picture.',
        chunks: [
            { en: 'Anything you add', ja: 'あなたが足すものは何でも ← ここが主語' },
            { en: 'is just you standing', ja: 'あなたが立っているだけだ' },
            { en: 'in front of the picture.', ja: '絵の前に' },
        ],
        ja: '何を足しても、それは絵の前に自分が立ちはだかっているだけだ。',
        why: 'Anything (that) you add で関係代名詞が省略。補語が you standing 〜 という「人＋-ing」の形で、「あなたが〜している状態」を名詞として置いている。日本語にしづらい構造。',
        picks: [
            { en: 'anything you add', ja: '足すものは何でも', kind: 'phrase' },
            { en: 'stand in front of', ja: '〜の前に立つ（視界をふさぐ）', kind: 'phrase' },
            { en: 'just', ja: 'ただ〜にすぎない', kind: 'word' },
        ],
    },
    {
        en: 'Daryl would have quoted a movie.',
        chunks: [
            { en: 'Daryl would have quoted', ja: 'ダリルなら引用しただろう' },
            { en: 'a movie.', ja: '映画を' },
        ],
        ja: 'ダリルだったら映画の台詞を引用してたね。',
        why: 'would have + 過去分詞は「（もしその場にいたら）〜しただろう」。if 節が省略された仮定法過去完了。',
        picks: [
            { en: 'would have done', ja: '（仮に）〜しただろう', kind: 'phrase' },
            { en: 'quote', ja: '引用する', kind: 'word' },
        ],
    },
    {
        en: 'I love the guy.',
        chunks: [
            { en: 'I love the guy.', ja: 'あいつのことは大好きだよ' },
        ],
        ja: 'あいつのことは好きだよ。',
        why: 'the guy は目の前にいない特定の人を親しみを込めて指す。批判のあとに好意を足して角を取る話し言葉の型。',
        picks: [
            { en: 'I love the guy', ja: 'あいつのことは好きなんだけどね（批判の緩和）', kind: 'phrase' },
            { en: 'guy', ja: 'やつ、男', kind: 'word' },
        ],
    },
    {
        en: 'I’d still take the six words.',
        chunks: [
            { en: 'I’d still take', ja: 'それでも俺は選ぶ' },
            { en: 'the six words.', ja: 'あの6語を' },
        ],
        ja: 'それでも俺はあの6語を取る。',
        why: 'I’d は I would。「選ぶなら」の仮定の would。take は「選ぶ、取る」。still は直前の I love the guy を受けて「それでもなお」。',
        picks: [
            { en: 'I’d take', ja: '（選ぶなら）〜にする', kind: 'phrase' },
            { en: 'still', ja: 'それでも', kind: 'word' },
        ],
    },
    {
        en: 'Kai, you record a show in your garage.',
        chunks: [
            { en: 'Kai,', ja: 'カイ、（呼びかけ）' },
            { en: 'you record a show', ja: 'あなたは番組を収録している' },
            { en: 'in your garage.', ja: '自宅のガレージで' },
        ],
        ja: 'カイ、あなたは自宅のガレージで番組を録っていますね。',
        why: '現在形で習慣を言う。record は動詞なので第2音節にアクセント（re-CORD）。',
        picks: [
            { en: 'record a show', ja: '番組を収録する', kind: 'phrase' },
            { en: 'garage', ja: 'ガレージ、車庫', kind: 'word' },
        ],
    },
    {
        en: 'Lampley played the tape and found he’d shouted more than he remembered.',
        chunks: [
            { en: 'Lampley played the tape', ja: 'ランプリーはテープを再生した' },
            { en: 'and found', ja: 'そして気づいた' },
            { en: 'he’d shouted more', ja: '自分がもっと叫んでいたと' },
            { en: 'than he remembered.', ja: '覚えていたよりも' },
        ],
        ja: 'ランプリーはテープを聞き返して、自分が記憶より大きな声で叫んでいたと知った。',
        why: 'found (that) he’d shouted で that が省略。he’d は he had で、過去完了は「テープを聞いた時点より前に叫んでいた」という時間差を示す。he’d を he would と読み違えやすい。',
        picks: [
            { en: 'play the tape', ja: 'テープを再生する', kind: 'phrase' },
            { en: 'find (that)', ja: '〜だと分かる、気づく', kind: 'phrase' },
            { en: 'more than he remembered', ja: '覚えていたより多く', kind: 'phrase' },
            { en: 'shout', ja: '叫ぶ', kind: 'word' },
        ],
    },
    {
        en: 'Does that happen to you?',
        chunks: [
            { en: 'Does that happen', ja: 'それは起きるか' },
            { en: 'to you?', ja: 'あなたにも' },
        ],
        ja: 'あなたにもそういうことはありますか。',
        why: 'happen to 〜 は「〜の身に起こる」。日本語の「〜ってことある？」はこの形で聞く。',
        picks: [
            { en: 'happen to', ja: '〜の身に起こる', kind: 'phrase' },
        ],
    },
    {
        en: 'Every single week.',
        chunks: [
            { en: 'Every single week.', ja: '毎週、一度残らず' },
        ],
        ja: '毎週だよ。',
        why: 'every の後に single を挟んで「一つ残らず」を強める。動詞なしの返事。',
        picks: [
            { en: 'every single', ja: 'ひとつ残らず全部の', kind: 'phrase' },
        ],
    },
    {
        en: 'I finish an episode thinking I was calm and smart.',
        chunks: [
            { en: 'I finish an episode', ja: '1話を録り終える' },
            { en: 'thinking', ja: '思いながら' },
            { en: 'I was calm and smart.', ja: '自分は落ち着いていて賢かったと' },
        ],
        ja: '1回録り終えるたびに、今日は落ち着いてて頭も良かったと思ってる。',
        why: '文末の thinking 〜 は分詞構文で「〜と思いながら」。thinking (that) I was の that が省略。was は finish した時点までの自己評価。',
        picks: [
            { en: 'finish an episode', ja: '1話を録り終える', kind: 'phrase' },
            { en: 'episode', ja: '（番組の）1回分', kind: 'word' },
            { en: 'calm', ja: '落ち着いた', kind: 'word' },
        ],
    },
    {
        en: 'Then I play it back and there’s a grown man yelling about a double play from 2001.',
        chunks: [
            { en: 'Then I play it back', ja: 'で、それを再生してみると' },
            { en: 'and there’s a grown man', ja: '大の大人がいる' },
            { en: 'yelling about a double play', ja: 'ダブルプレーのことでわめいている' },
            { en: 'from 2001.', ja: '2001年の' },
        ],
        ja: 'で、聞き返すと、2001年のダブルプレーのことでわめいてる大の大人がいるわけ。',
        why: 'play it back は「再生する」で、代名詞 it は play と back の間に入る。there’s a man yelling は「〜している人がいる」の there is + 名詞 + -ing。自分のことを a grown man と他人のように言う自虐。',
        picks: [
            { en: 'play back', ja: '（録音を）再生する', kind: 'phrase' },
            { en: 'a grown man', ja: 'いい大人、大の大人（自虐・皮肉）', kind: 'phrase' },
            { en: 'yell about', ja: '〜のことでわめく', kind: 'phrase' },
            { en: 'double play', ja: '（野球の）併殺、ダブルプレー', kind: 'word' },
            { en: 'there’s A doing', ja: '〜しているAがいる', kind: 'phrase' },
        ],
    },
    {
        en: 'So yeah, I give myself too much credit for the calm too.',
        chunks: [
            { en: 'So yeah,', ja: 'だからまあ' },
            { en: 'I give myself too much credit', ja: '自分を買いかぶっている' },
            { en: 'for the calm too.', ja: '落ち着きについても、俺も' },
        ],
        ja: 'だからまあ、俺も自分の冷静さを買いかぶってるんだよ。',
        why: 'give oneself credit for 〜 は「〜を自分の手柄と認める」。too much をつけて「買いかぶる」。the calm は形容詞 calm を名詞にした「落ち着き」。文末の too は「ランプリーと同じく俺も」。',
        picks: [
            { en: 'so yeah', ja: 'だからまあ（話し言葉のつなぎ）', kind: 'phrase' },
            { en: 'give oneself credit for', ja: '〜を自分の手柄と思う', kind: 'phrase' },
            { en: 'give oneself too much credit', ja: '自分を買いかぶる', kind: 'phrase' },
            { en: 'credit', ja: '評価、手柄', kind: 'word' },
        ],
    },
    {
        en: 'The best part of his story isn’t the advice.',
        chunks: [
            { en: 'The best part of his story', ja: 'あの人の話の一番いいところは' },
            { en: 'isn’t the advice.', ja: '助言ではない' },
        ],
        ja: 'あの話で一番いいのは、助言のところじゃない。',
        why: 'The best part of 〜 is 〜 で「一番いいところは」。否定で先に置き、次の文で本当の答えを出す二段構え。',
        picks: [
            { en: 'the best part of', ja: '〜の一番いいところ', kind: 'phrase' },
            { en: 'advice', ja: '助言（不可算）', kind: 'word' },
        ],
    },
    {
        en: 'It’s that he actually listened to the tape.',
        chunks: [
            { en: 'It’s that', ja: 'それは〜ということだ' },
            { en: 'he actually listened', ja: '本当に聞いたこと' },
            { en: 'to the tape.', ja: 'テープを' },
        ],
        ja: '実際にテープを聞き直したってところだ。',
        why: 'It’s that 〜 は「（答えは）〜ということだ」。It は前文の the best part を指す。actually は「口で言うだけでなく本当に」。',
        picks: [
            { en: 'it’s that', ja: '（要は）〜ということだ', kind: 'phrase' },
            { en: 'actually', ja: '実際に、本当に', kind: 'word' },
            { en: 'listen to', ja: '〜を（注意して）聞く', kind: 'phrase' },
        ],
    },
    {
        en: 'I re-record my endings about six times.',
        chunks: [
            { en: 'I re-record my endings', ja: '番組の締めを録り直す' },
            { en: 'about six times.', ja: '6回くらい' },
        ],
        ja: '番組の締めは6回くらい録り直す。',
        why: 're- は「やり直し」の接頭辞。ending は「番組の終わりの挨拶」。about は数の前で「約」。',
        picks: [
            { en: 're-record', ja: '録り直す', kind: 'word' },
            { en: 'ending', ja: '締め、終わりの部分', kind: 'word' },
            { en: 'about', ja: 'およそ', kind: 'word' },
        ],
    },
    {
        en: 'I never re-record the yelling.',
        chunks: [
            { en: 'I never re-record', ja: '絶対に録り直さない' },
            { en: 'the yelling.', ja: 'わめいたところは' },
        ],
        ja: 'わめいたところは一度も録り直さない。',
        why: 'the yelling は動名詞に the をつけて「わめいた部分」という名詞にした形。前文と同じ動詞で対比させる。',
        picks: [
            { en: 'yelling', ja: 'わめき声、叫んだ部分', kind: 'word' },
        ],
    },
    {
        en: 'That’s the part people stay for.',
        chunks: [
            { en: 'That’s the part', ja: 'そこが部分だ' },
            { en: 'people stay for.', ja: 'みんながそのために聞き続ける' },
        ],
        ja: 'みんなそこを聞きに来てるんだから。',
        why: 'the part (that) people stay for で関係代名詞が省略され、前置詞 for が文末に残る。stay for 〜 は「〜のために残る、最後まで付き合う」。',
        picks: [
            { en: 'stay for', ja: '〜のために残る、〜目当てで聞き続ける', kind: 'phrase' },
            { en: 'the part people stay for', ja: 'みんなのお目当ての部分', kind: 'phrase' },
        ],
    },
    {
        en: 'Devon, the colleague in the car had a bold prediction, pulled it back and regretted it.',
        chunks: [
            { en: 'Devon,', ja: 'デヴォン、（呼びかけ）' },
            { en: 'the colleague in the car', ja: '車の中の同僚は ← ここが主語' },
            { en: 'had a bold prediction,', ja: '大胆な予想を持っていて' },
            { en: 'pulled it back', ja: 'それを引っ込めて' },
            { en: 'and regretted it.', ja: 'そして後悔した' },
        ],
        ja: 'デヴォン、車の中の同僚は大胆な予想を持っていたのに引っ込めて、それを後悔しました。',
        why: '1つの主語に動詞が3つ（had / pulled / regretted）並ぶ。pull back は「引っ込める、撤回する」で、代名詞 it は間に入る。',
        picks: [
            { en: 'bold prediction', ja: '大胆な予想', kind: 'phrase' },
            { en: 'pull back', ja: '引っ込める、撤回する', kind: 'phrase' },
            { en: 'colleague', ja: '同僚', kind: 'word' },
            { en: 'regret', ja: '後悔する', kind: 'word' },
            { en: 'bold', ja: '大胆な', kind: 'word' },
        ],
    },
    {
        en: 'Would you have said it on air?',
        chunks: [
            { en: 'Would you have said it', ja: 'あなたなら言っていたか' },
            { en: 'on air?', ja: '放送で' },
        ],
        ja: 'あなたなら放送でそれを言いましたか。',
        why: 'Would you have + 過去分詞は「（あなたがその立場だったら）〜したか」。on air は冠詞なしで「放送中に」。',
        picks: [
            { en: 'would you have done', ja: '（あなたなら）〜したか', kind: 'phrase' },
            { en: 'on air', ja: '放送中に、生放送で', kind: 'phrase' },
        ],
    },
    {
        en: 'Honestly?',
        chunks: [
            { en: 'Honestly?', ja: '正直に言うと？' },
        ],
        ja: '正直に？',
        why: '1語を疑問の上げ調子で置き、「正直に答えていいなら」と前置きする話し言葉。',
        picks: [
            { en: 'Honestly?', ja: '正直に言っていい？（前置き）', kind: 'phrase' },
        ],
    },
    {
        en: 'Probably not.',
        chunks: [
            { en: 'Probably not.', ja: 'たぶん言わない' },
        ],
        ja: 'たぶん言わない。',
        why: 'Probably not. は前の質問の動詞を丸ごと省いた否定の返事。I probably would not have said it の短縮。',
        picks: [
            { en: 'probably not', ja: 'たぶん違う・しない', kind: 'phrase' },
        ],
    },
    {
        en: 'I’m the guy in the back seat with a strong opinion who says the safe one out loud.',
        chunks: [
            { en: 'I’m the guy', ja: '俺はそういう男だ' },
            { en: 'in the back seat', ja: '後部座席にいる' },
            { en: 'with a strong opinion', ja: '強い意見を持っていて' },
            { en: 'who says the safe one', ja: '無難なほうを言う' },
            { en: 'out loud.', ja: '声に出しては' },
        ],
        ja: '俺は後部座席で強い意見を持ちながら、口に出すのは無難なほうにする男だよ。',
        why: 'the guy に in the back seat / with a strong opinion / who 節の3つが後ろから掛かる。the safe one の one は opinion の言い換え。out loud は「声に出して」。',
        picks: [
            { en: 'the back seat', ja: '後部座席', kind: 'phrase' },
            { en: 'strong opinion', ja: '強い意見', kind: 'phrase' },
            { en: 'the safe one', ja: '無難なほう', kind: 'phrase' },
            { en: 'say out loud', ja: '声に出して言う', kind: 'phrase' },
        ],
    },
    {
        en: 'People like a lot of things that are wrong, and I’d put my own caution on that list.',
        chunks: [
            { en: 'People like a lot of things', ja: '人は多くのものを好む' },
            { en: 'that are wrong,', ja: '間違っている（ものを）' },
            { en: 'and I’d put my own caution', ja: 'そして自分の慎重さも入れる' },
            { en: 'on that list.', ja: 'そのリストに' },
        ],
        ja: 'みんなが好きなものはたいてい間違ってる。俺自身の慎重さもそのリストに入れておくよ。',
        why: 'things that are wrong の that は主格の関係代名詞。put A on the list は「Aをリストに載せる」。I’d は I would で「載せるとしたら」の控えめな言い方。',
        picks: [
            { en: 'a lot of', ja: 'たくさんの', kind: 'phrase' },
            { en: 'put A on the list', ja: 'Aをリストに入れる', kind: 'phrase' },
            { en: 'my own', ja: '自分自身の', kind: 'phrase' },
            { en: 'caution', ja: '慎重さ、用心', kind: 'word' },
        ],
    },
    {
        en: 'Lampley’s right.',
        chunks: [
            { en: 'Lampley’s right.', ja: 'ランプリーが正しい' },
        ],
        ja: 'ランプリーの言う通りだ。',
        why: 'Lampley’s は所有ではなく Lampley is の短縮。’s の後が形容詞なら is と読む。',
        picks: [
            { en: '(someone)’s right', ja: '〜の言う通りだ', kind: 'phrase' },
        ],
    },
    {
        en: 'If you’re wrong, it goes into the wash and nobody remembers.',
        chunks: [
            { en: 'If you’re wrong,', ja: '外れたら' },
            { en: 'it goes into the wash', ja: 'それは洗濯機行きだ' },
            { en: 'and nobody remembers.', ja: 'そして誰も覚えていない' },
        ],
        ja: '外れたら、洗濯機に放り込まれたみたいに消えて誰も覚えてない。',
        why: 'go into the wash は「洗濯物に紛れる」から「うやむやになって消える」。nobody は単数扱いで remembers。',
        picks: [
            { en: 'go into the wash', ja: 'うやむやになる、洗い流される', kind: 'phrase' },
            { en: 'nobody remembers', ja: '誰も覚えていない', kind: 'phrase' },
        ],
    },
    {
        en: 'If you’re right, you were the only one who said it.',
        chunks: [
            { en: 'If you’re right,', ja: '当たったら' },
            { en: 'you were the only one', ja: 'あなたが唯一の人だった' },
            { en: 'who said it.', ja: 'それを言った' },
        ],
        ja: '当たったら、言ったのは自分だけだったことになる。',
        why: '条件は現在形 you’re なのに帰結は過去形 were。「当たった時点から振り返ると、言ったのは自分だけだった」という視点の移動。the only one who 〜 は「〜したただ一人」。',
        picks: [
            { en: 'the only one who', ja: '〜した唯一の人', kind: 'phrase' },
            { en: 'be right', ja: '（予想が）当たる', kind: 'phrase' },
        ],
    },
    {
        en: 'It’s simple advice.',
        chunks: [
            { en: 'It’s simple advice.', ja: '単純な助言だ' },
        ],
        ja: '単純な助言だよ。',
        why: 'advice は不可算なので a をつけない。It’s a simple advice は誤り。',
        picks: [
            { en: 'simple advice', ja: '単純な助言', kind: 'phrase' },
        ],
    },
    {
        en: 'I’ve almost never taken it.',
        chunks: [
            { en: 'I’ve almost never', ja: 'ほとんど一度も〜ない' },
            { en: 'taken it.', ja: 'それに従ったことが' },
        ],
        ja: '俺はほとんど一度も従ったことがない。',
        why: 'take advice は「助言に従う」。almost never は「ほとんど一度も〜ない」で、never を almost で弱めている。現在完了で「これまでの人生で」。',
        picks: [
            { en: 'take advice', ja: '助言に従う', kind: 'phrase' },
            { en: 'almost never', ja: 'ほとんど〜ない', kind: 'phrase' },
        ],
    },
    {
        en: 'Almost.',
        chunks: [
            { en: 'Almost.', ja: 'ほとんど、ね' },
        ],
        ja: 'ほとんど、ね。',
        why: '前の文の almost だけを繰り返して、例外が1つあることをほのめかす。何が例外かは言わない。',
        picks: [
            { en: 'almost', ja: 'ほとんど（例外を匂わせる）', kind: 'word' },
        ],
    },
    {
        en: 'Mr Okafor, you give driving tests.',
        chunks: [
            { en: 'Mr Okafor,', ja: 'オカフォーさん、（呼びかけ）' },
            { en: 'you give driving tests.', ja: 'あなたは運転試験をする' },
        ],
        ja: 'オカフォーさん、あなたは運転の実技試験をする人ですよね。',
        why: '試験を「する側」は give a test、「受ける側」は take a test。日本語の「試験する」とは動詞の選び方が違う。',
        picks: [
            { en: 'give a test', ja: '試験を行う（試験官側）', kind: 'phrase' },
            { en: 'driving test', ja: '運転実技試験', kind: 'phrase' },
        ],
    },
    {
        en: 'A 20-year-old was told to do two laps in a famous old car and did three.',
        chunks: [
            { en: 'A 20-year-old', ja: '20歳の若者が ← ここが主語' },
            { en: 'was told to do two laps', ja: '2周走るよう言われた' },
            { en: 'in a famous old car', ja: '有名な古い車で' },
            { en: 'and did three.', ja: 'そして3周した' },
        ],
        ja: '20歳の若者が有名な古い車で2周と言われて、3周走りました。',
        why: 'a 20-year-old はハイフンでつないだ形容詞を名詞として使う形（year は単数）。was told to do は tell A to do の受動。did three は three laps の省略。',
        picks: [
            { en: 'a 20-year-old', ja: '20歳の人', kind: 'phrase' },
            { en: 'be told to do', ja: '〜するよう言われる', kind: 'phrase' },
            { en: 'do a lap', ja: '1周する', kind: 'phrase' },
        ],
    },
    {
        en: 'Would you pass him?',
        chunks: [
            { en: 'Would you pass him?', ja: 'あなたなら彼を合格にするか' },
        ],
        ja: 'あなたなら合格にしますか。',
        why: 'pass が他動詞で「（人を）合格させる」。pass a test（試験に受かる）と主語と目的語が逆になる用法。',
        picks: [
            { en: 'pass someone', ja: '人を合格させる', kind: 'phrase' },
        ],
    },
    {
        en: 'I’d pass him, and I’d write a note in the margin.',
        chunks: [
            { en: 'I’d pass him,', ja: '合格にするよ' },
            { en: 'and I’d write a note', ja: 'そしてメモを書く' },
            { en: 'in the margin.', ja: '余白に' },
        ],
        ja: '合格にするよ。で、余白にひとこと書いておく。',
        why: 'I’d は I would で、仮定の質問に仮定で答える。in the margin は「用紙の余白に」で、採点とは別の個人的なコメントを示す。',
        picks: [
            { en: 'write a note', ja: 'メモを書く、一言書く', kind: 'phrase' },
            { en: 'in the margin', ja: '余白に', kind: 'phrase' },
            { en: 'margin', ja: '余白', kind: 'word' },
        ],
    },
    {
        en: 'He asked himself, “Do I dare take my hand off the wheel?”',
        chunks: [
            { en: 'He asked himself,', ja: '彼は自分に問いかけた' },
            { en: '“Do I dare', ja: '「あえて〜する勇気があるか' },
            { en: 'take my hand off the wheel?”', ja: 'ハンドルから手を離す」' },
        ],
        ja: '彼は自分に「ハンドルから手を離す勇気があるか」と聞いた。',
        why: 'dare は助動詞のように動詞の原形を直接とれる（dare take）。ask oneself は「自問する」。take A off B は「AをBから離す」。',
        picks: [
            { en: 'ask oneself', ja: '自問する', kind: 'phrase' },
            { en: 'dare (to) do', ja: '思い切って〜する', kind: 'phrase' },
            { en: 'take one’s hand off', ja: '〜から手を離す', kind: 'phrase' },
            { en: 'wheel', ja: '（車の）ハンドル', kind: 'word' },
        ],
    },
    {
        en: 'That’s the right question.',
        chunks: [
            { en: 'That’s the right question.', ja: 'それが正しい問いだ' },
        ],
        ja: 'それこそが正しい問いだよ。',
        why: 'the right question は「聞くべき問い」。the が「まさにそれ」を示す。',
        picks: [
            { en: 'the right question', ja: '聞くべき問い', kind: 'phrase' },
        ],
    },
    {
        en: 'The confident ones never ask it, and they’re the ones I worry about.',
        chunks: [
            { en: 'The confident ones', ja: '自信満々のやつらは ← ここが主語' },
            { en: 'never ask it,', ja: 'それを決して聞かない' },
            { en: 'and they’re the ones', ja: 'そして彼らこそが人たちだ' },
            { en: 'I worry about.', ja: '俺が心配する' },
        ],
        ja: '自信満々の連中は絶対にそれを聞かない。俺が心配なのはそっちなんだ。',
        why: 'ones は受験者を指す代名詞。the ones (that) I worry about で関係代名詞が省略され、前置詞 about が文末に残る。',
        picks: [
            { en: 'the confident ones', ja: '自信のある人たち', kind: 'phrase' },
            { en: 'worry about', ja: '〜を心配する', kind: 'phrase' },
            { en: 'confident', ja: '自信のある', kind: 'word' },
        ],
    },
    {
        en: 'Then he came back shaking and said sorry for the extra lap.',
        chunks: [
            { en: 'Then he came back', ja: 'そのあと彼は戻ってきた' },
            { en: 'shaking', ja: '震えながら' },
            { en: 'and said sorry', ja: 'そして謝った' },
            { en: 'for the extra lap.', ja: '余分な1周のことで' },
        ],
        ja: 'で、震えながら戻ってきて、余計な1周を謝った。',
        why: 'came back shaking は「震えた状態で戻ってきた」で、-ing が様子を表す。say sorry for 〜 は「〜のことで謝る」。extra は「決められた分を超えた」。',
        picks: [
            { en: 'come back', ja: '戻ってくる', kind: 'phrase' },
            { en: 'say sorry for', ja: '〜のことで謝る', kind: 'phrase' },
            { en: 'extra lap', ja: '余分な1周', kind: 'phrase' },
            { en: 'shake', ja: '震える', kind: 'word' },
        ],
    },
    {
        en: 'A person who apologizes for joy is not a danger on the road.',
        chunks: [
            { en: 'A person who apologizes for joy', ja: 'うれしさのことで謝る人は ← ここが主語' },
            { en: 'is not a danger', ja: '危険ではない' },
            { en: 'on the road.', ja: '路上で' },
        ],
        ja: 'うれしくて謝る人間は、路上で危ない人間じゃない。',
        why: '主語 A person に who 節が付き、動詞 is が遠くにある。見出しと同じ文。apologize for の後ろに感情名詞 joy が来るのが意外な組み合わせ。',
        picks: [
            { en: 'apologize for', ja: '〜のことで謝る', kind: 'phrase' },
            { en: 'a danger on the road', ja: '路上の危険', kind: 'phrase' },
        ],
    },
    {
        en: 'I failed my test three times at eighteen.',
        chunks: [
            { en: 'I failed my test', ja: '俺は試験に落ちた' },
            { en: 'three times', ja: '3回' },
            { en: 'at eighteen.', ja: '18歳のとき' },
        ],
        ja: '俺は18のとき、試験に3回落ちた。',
        why: 'fail a test は他動詞で「試験に落ちる」（前置詞 in は不要）。at + 年齢で「〜歳のときに」。',
        picks: [
            { en: 'fail a test', ja: '試験に落ちる', kind: 'phrase' },
            { en: 'at eighteen', ja: '18歳で', kind: 'phrase' },
        ],
    },
    {
        en: 'The day I passed, I went around the block once more than I was told.',
        chunks: [
            { en: 'The day I passed,', ja: '受かったその日' },
            { en: 'I went around the block', ja: '俺はブロックを回った' },
            { en: 'once more', ja: 'もう1回' },
            { en: 'than I was told.', ja: '言われたより' },
        ],
        ja: '受かった日、俺は言われたより1回多く、ブロックを回ったんだ。',
        why: 'The day (that) I passed は前置詞なしで副詞になる時の名詞句（on the day の on が落ちる）。once more than 〜 は「〜より1回多く」。than I was told の後ろに to do が省略されている。',
        picks: [
            { en: 'the day I passed', ja: '受かった日に', kind: 'phrase' },
            { en: 'go around the block', ja: '（家の）ブロックを一周する', kind: 'phrase' },
            { en: 'once more than', ja: '〜より1回多く', kind: 'phrase' },
            { en: 'than I was told', ja: '言われたより', kind: 'phrase' },
            { en: 'block', ja: '街区、ブロック', kind: 'word' },
        ],
    },

    // ================= STORY =================
    {
        en: 'One More Lap',
        chunks: [
            { en: 'One More Lap', ja: 'もう1周' },
        ],
        ja: 'もう1周',
        why: 'one more + 名詞で「もう1つの」。another lap とほぼ同じだが、数を意識させる言い方。',
        picks: [
            { en: 'one more', ja: 'もう1つ', kind: 'phrase' },
            { en: 'lap', ja: '1周', kind: 'word' },
        ],
    },
    {
        en: 'Walt’s pickup is older than Paige’s father, and it has three pedals.',
        chunks: [
            { en: 'Walt’s pickup', ja: 'ウォルトのピックアップトラックは ← ここが主語' },
            { en: 'is older than Paige’s father,', ja: 'ペイジの父親より年上で' },
            { en: 'and it has three pedals.', ja: 'ペダルが3つある' },
        ],
        ja: 'ウォルトのピックアップは、ペイジの父親より年上で、ペダルが3つある。',
        why: '車の年式を人と比べる older than。three pedals はアクセル・ブレーキ・クラッチで、つまりマニュアル車だと言っている。説明せずに読ませる。',
        picks: [
            { en: 'pickup', ja: 'ピックアップトラック', kind: 'word' },
            { en: 'pedal', ja: 'ペダル', kind: 'word' },
            { en: 'older than', ja: '〜より古い・年上', kind: 'phrase' },
        ],
    },
    {
        en: 'On Sunday morning he drove it to the empty lot behind Flo’s diner, got out, and handed Paige the keys.',
        chunks: [
            { en: 'On Sunday morning', ja: '日曜の朝' },
            { en: 'he drove it', ja: '彼はそれを運転して行った' },
            { en: 'to the empty lot', ja: '空き地へ' },
            { en: 'behind Flo’s diner,', ja: 'フローの食堂の裏の' },
            { en: 'got out,', ja: '降りて' },
            { en: 'and handed Paige the keys.', ja: 'ペイジに鍵を渡した' },
        ],
        ja: '日曜の朝、彼はそれをフローの食堂の裏の空き地まで運転して行き、降りて、ペイジに鍵を渡した。',
        why: '動詞3つ（drove / got out / handed）が並ぶ。hand A B は「AにBを手渡す」の二重目的語。lot はここで「区画、空き地・駐車場」。',
        picks: [
            { en: 'empty lot', ja: '空き地', kind: 'phrase' },
            { en: 'get out', ja: '（車から）降りる', kind: 'phrase' },
            { en: 'hand A B', ja: 'AにBを手渡す', kind: 'phrase' },
            { en: 'diner', ja: '（アメリカの）食堂、ダイナー', kind: 'word' },
            { en: 'lot', ja: '区画、空き地', kind: 'word' },
        ],
    },
    {
        en: '“Two laps,” he said.',
        chunks: [
            { en: '“Two laps,”', ja: '「2周だ」' },
            { en: 'he said.', ja: 'と彼は言った' },
        ],
        ja: '「2周だぞ」と彼は言った。',
        why: '動詞なしの名詞だけで指示を出す話し言葉。',
        picks: [
            { en: 'two laps', ja: '2周', kind: 'phrase' },
        ],
    },
    {
        en: '“Slow ones.',
        chunks: [
            { en: '“Slow ones.', ja: '「ゆっくりのやつを' },
        ],
        ja: '「ゆっくりな」',
        why: 'ones は laps の言い換え。形容詞＋ones で「〜なやつ」。',
        picks: [
            { en: 'slow ones', ja: 'ゆっくりのやつ（ones＝前の名詞）', kind: 'phrase' },
        ],
    },
    {
        en: 'Then we go home, and nobody tells your mother.”',
        chunks: [
            { en: 'Then we go home,', ja: 'それから家に帰る' },
            { en: 'and nobody tells', ja: 'そして誰も言わない' },
            { en: 'your mother.”', ja: 'お前の母さんには」' },
        ],
        ja: 'そしたら帰る。で、お前の母さんには誰も言わない」',
        why: '現在形で段取りを決める言い方（Then we go home）。未来のことでも予定・取り決めなら現在形が使える。',
        picks: [
            { en: 'go home', ja: '家に帰る', kind: 'phrase' },
            { en: 'nobody tells', ja: '誰も言わない（口止め）', kind: 'phrase' },
        ],
    },
    {
        en: 'Sam, who is seven, sat in the middle of the bench seat with a juice box.',
        chunks: [
            { en: 'Sam, who is seven,', ja: '7歳のサムは' },
            { en: 'sat in the middle', ja: '真ん中に座った' },
            { en: 'of the bench seat', ja: 'ベンチシートの' },
            { en: 'with a juice box.', ja: '紙パックのジュースを持って' },
        ],
        ja: '7歳のサムは、紙パックのジュースを持ってベンチシートの真ん中に座っていた。',
        why: 'コンマで挟んだ who is seven は補足説明（非制限用法）。bench seat は前席が一続きになった古いトラックの座席。',
        picks: [
            { en: 'in the middle of', ja: '〜の真ん中に', kind: 'phrase' },
            { en: 'bench seat', ja: '（前席の）ベンチシート', kind: 'phrase' },
            { en: 'juice box', ja: '紙パックのジュース', kind: 'phrase' },
        ],
    },
    {
        en: 'He had come to watch.',
        chunks: [
            { en: 'He had come', ja: '彼は来ていた' },
            { en: 'to watch.', ja: '見るために' },
        ],
        ja: '見物に来たのだった。',
        why: '過去完了 had come は「座った時点より前に来ていた」。to watch は目的の不定詞で、目的語なしでも「見物する」。',
        picks: [
            { en: 'come to watch', ja: '見物に来る', kind: 'phrase' },
        ],
    },
    {
        en: 'Paige is fifteen, and she talks about everything like a sports announcer.',
        chunks: [
            { en: 'Paige is fifteen,', ja: 'ペイジは15歳で' },
            { en: 'and she talks about everything', ja: '何についても話す' },
            { en: 'like a sports announcer.', ja: 'スポーツ実況のアナウンサーみたいに' },
        ],
        ja: 'ペイジは15歳で、何でもスポーツ実況みたいにしゃべる。',
        why: 'like は前置詞で「〜のように」。現在形で性格・習慣を言う。',
        picks: [
            { en: 'talk about', ja: '〜について話す', kind: 'phrase' },
            { en: 'sports announcer', ja: 'スポーツ実況アナウンサー', kind: 'phrase' },
            { en: 'announcer', ja: 'アナウンサー、実況者', kind: 'word' },
        ],
    },
    {
        en: 'Usually she does it to tease the family.',
        chunks: [
            { en: 'Usually she does it', ja: 'ふだん彼女がそれをやるのは' },
            { en: 'to tease the family.', ja: '家族をからかうためだ' },
        ],
        ja: 'ふだんは家族をからかうためにやる。',
        why: 'does it は前文の「実況みたいに話す」を丸ごと受ける。to tease は目的の不定詞。',
        picks: [
            { en: 'tease', ja: 'からかう', kind: 'word' },
            { en: 'usually', ja: 'ふだんは', kind: 'word' },
        ],
    },
    {
        en: 'Today she did it to stay calm.',
        chunks: [
            { en: 'Today she did it', ja: '今日はそれをやった' },
            { en: 'to stay calm.', ja: '落ち着いているために' },
        ],
        ja: '今日は落ち着くためにやった。',
        why: '前文 Usually ... does と Today ... did の対比。stay + 形容詞で「〜のままでいる」。',
        picks: [
            { en: 'stay calm', ja: '落ち着いている', kind: 'phrase' },
        ],
    },
    {
        en: '“Paige is in the driver’s seat,” she said.',
        chunks: [
            { en: '“Paige is', ja: '「ペイジが' },
            { en: 'in the driver’s seat,”', ja: '運転席に着きました」' },
            { en: 'she said.', ja: 'と彼女は言った' },
        ],
        ja: '「ペイジ、運転席に着きました」と彼女は言った。',
        why: '自分を三人称で呼ぶのは実況の型。in the driver’s seat は比喩で「主導権を握る」の意味もある。',
        picks: [
            { en: 'in the driver’s seat', ja: '運転席に（比喩で主導権を握って）', kind: 'phrase' },
        ],
    },
    {
        en: '“Paige has found the clutch.',
        chunks: [
            { en: '“Paige has found', ja: '「ペイジが見つけました' },
            { en: 'the clutch.', ja: 'クラッチを' },
        ],
        ja: '「ペイジ、クラッチを発見しました」',
        why: '現在完了 has found は「たった今〜した」の実況の型。clutch はマニュアル車の左のペダル。',
        picks: [
            { en: 'clutch', ja: 'クラッチ', kind: 'word' },
            { en: 'has found', ja: '（いま）見つけた', kind: 'phrase' },
        ],
    },
    {
        en: 'Paige is not sure it is the clutch.”',
        chunks: [
            { en: 'Paige is not sure', ja: 'ペイジは確信がありません' },
            { en: 'it is the clutch.”', ja: 'それがクラッチなのか」' },
        ],
        ja: 'ペイジ、それがクラッチかどうか自信がありません」',
        why: 'be sure (that) 〜 の that が省略。否定の not sure で「〜か自信がない」。',
        picks: [
            { en: 'be not sure (that)', ja: '〜かどうか自信がない', kind: 'phrase' },
        ],
    },
    {
        en: '“It’s the clutch,” said Walt.',
        chunks: [
            { en: '“It’s the clutch,”', ja: '「それがクラッチだ」' },
            { en: 'said Walt.', ja: 'とウォルトが言った' },
        ],
        ja: '「それがクラッチだ」とウォルトが言った。',
        why: 'said Walt は主語と動詞の倒置。台詞の後では said + 名前 の語順がよく使われる。',
        picks: [
            { en: 'said Walt', ja: 'とウォルトが言った（倒置）', kind: 'phrase' },
        ],
    },
    {
        en: '“She’s going to stall,” said Sam.',
        chunks: [
            { en: '“She’s going to stall,”', ja: '「エンストするぞ」' },
            { en: 'said Sam.', ja: 'とサムが言った' },
        ],
        ja: '「エンストするよ」とサムが言った。',
        why: 'be going to は兆しから予想する未来。stall は自動詞で「（エンジンが）止まる、エンストする」。',
        picks: [
            { en: 'be going to', ja: '（兆しから見て）〜しそうだ', kind: 'phrase' },
            { en: 'stall', ja: 'エンストする、エンスト', kind: 'word' },
        ],
    },
    {
        en: '“I’m calling it right now.”',
        chunks: [
            { en: '“I’m calling it', ja: '「予言しとく' },
            { en: 'right now.”', ja: '今ここで」' },
        ],
        ja: '「今のうちに言っとくからね」',
        why: 'call it は「（結果を）予言する、言い当てる」。進行形 I’m calling it で「今ここで宣言する」。',
        picks: [
            { en: 'call it', ja: '（結果を）予言する、言い当てる', kind: 'phrase' },
            { en: 'I’m calling it', ja: '今言っとく（予言の宣言）', kind: 'phrase' },
            { en: 'right now', ja: '今すぐ、今ここで', kind: 'phrase' },
        ],
    },
    {
        en: 'She stalled.',
        chunks: [
            { en: 'She stalled.', ja: '彼女はエンストした' },
        ],
        ja: 'エンストした。',
        why: '人を主語にして stall を使える（車が止まる、を「その人が止めた」で言う）。',
        picks: [
            { en: 'stall', ja: 'エンストさせる・する', kind: 'word' },
        ],
    },
    {
        en: 'The truck jumped once, like a dog hearing a noise, and went quiet.',
        chunks: [
            { en: 'The truck jumped once,', ja: 'トラックは一度跳ねた' },
            { en: 'like a dog hearing a noise,', ja: '物音を聞いた犬みたいに' },
            { en: 'and went quiet.', ja: 'そして静かになった' },
        ],
        ja: 'トラックは物音に驚いた犬みたいに一度跳ねて、静かになった。',
        why: 'a dog hearing a noise は -ing が後ろから dog を修飾。go + 形容詞で「〜の状態になる」（go quiet）。',
        picks: [
            { en: 'go quiet', ja: '静かになる、黙る', kind: 'phrase' },
            { en: 'jump', ja: '跳ねる、びくっとする', kind: 'word' },
            { en: 'once', ja: '一度', kind: 'word' },
        ],
    },
    {
        en: 'Sam looked very pleased with himself.',
        chunks: [
            { en: 'Sam looked', ja: 'サムは〜に見えた' },
            { en: 'very pleased with himself.', ja: 'とても得意げに' },
        ],
        ja: 'サムはすごく得意げだった。',
        why: 'pleased with oneself は「自分に満足している、得意げな」。look + 形容詞で「〜に見える」。',
        picks: [
            { en: 'pleased with oneself', ja: '得意げな、してやったりの', kind: 'phrase' },
            { en: 'look pleased', ja: '満足そうに見える', kind: 'phrase' },
        ],
    },
    {
        en: 'The second time, the truck rolled forward.',
        chunks: [
            { en: 'The second time,', ja: '2回目は' },
            { en: 'the truck rolled forward.', ja: 'トラックは前に転がり出た' },
        ],
        ja: '2回目は、トラックが前に動き出した。',
        why: 'The second time は前置詞なしで副詞になる。roll forward は「ゆっくり前に進む」。',
        picks: [
            { en: 'the second time', ja: '2回目は', kind: 'phrase' },
            { en: 'roll forward', ja: '前へ転がり出る、ゆっくり進む', kind: 'phrase' },
        ],
    },
    {
        en: 'Then it needed second gear.',
        chunks: [
            { en: 'Then it needed', ja: 'すると必要になった' },
            { en: 'second gear.', ja: 'セカンドギアが' },
        ],
        ja: 'するとセカンドに入れる必要が出てきた。',
        why: '無生物主語 it（トラック）が need する。second gear は冠詞なしで使う。',
        picks: [
            { en: 'second gear', ja: '2速、セカンド', kind: 'phrase' },
        ],
    },
    {
        en: 'Second gear was down by her knee, and both of her hands were on the wheel.',
        chunks: [
            { en: 'Second gear was down', ja: 'セカンドは下にあった' },
            { en: 'by her knee,', ja: '彼女の膝のそばに' },
            { en: 'and both of her hands', ja: 'そして彼女の両手は' },
            { en: 'were on the wheel.', ja: 'ハンドルの上にあった' },
        ],
        ja: 'セカンドは膝のあたりの下のほうにあって、両手はハンドルを握っていた。',
        why: 'down by 〜 は「下の〜のあたりに」。both of her hands は複数なので were。ギアに手を伸ばすにはどちらかの手を離すしかない、という状況を説明なしで作っている。',
        picks: [
            { en: 'down by', ja: '下の〜のあたりに', kind: 'phrase' },
            { en: 'both of', ja: '〜の両方', kind: 'phrase' },
            { en: 'on the wheel', ja: 'ハンドルを握って', kind: 'phrase' },
            { en: 'knee', ja: '膝', kind: 'word' },
        ],
    },
    {
        en: '“Do I dare take my hand off the wheel?” she said.',
        chunks: [
            { en: '“Do I dare', ja: '「思い切って〜していいのか' },
            { en: 'take my hand off the wheel?”', ja: 'ハンドルから手を離して」' },
            { en: 'she said.', ja: 'と彼女は言った' },
        ],
        ja: '「ハンドルから手を離していいものか」と彼女は言った。',
        why: 'dare の後ろに原形 take が直接来る。疑問文 Do I dare 〜? は「〜する勇気が私にある？」という自問。',
        picks: [
            { en: 'Do I dare', ja: '思い切って〜していいのか（自問）', kind: 'phrase' },
            { en: 'take one’s hand off the wheel', ja: 'ハンドルから手を離す', kind: 'phrase' },
        ],
    },
    {
        en: '“Everybody does,” said Walt.',
        chunks: [
            { en: '“Everybody does,”', ja: '「みんなやるさ」' },
            { en: 'said Walt.', ja: 'とウォルトが言った' },
        ],
        ja: '「みんなそうするんだ」とウォルトが言った。',
        why: 'does は代動詞で take my hand off the wheel の繰り返しを避ける。Everybody は単数扱いなので does。',
        picks: [
            { en: 'everybody does', ja: 'みんなそうする（代動詞 does）', kind: 'phrase' },
        ],
    },
    {
        en: '“One hand drives.',
        chunks: [
            { en: '“One hand drives.', ja: '「片手が運転する' },
        ],
        ja: '「片手が運転する」',
        why: '手を主語にした短い文。次の文の The other one と対になる。',
        picks: [
            { en: 'one hand', ja: '片手', kind: 'phrase' },
        ],
    },
    {
        en: 'The other one trusts it.”',
        chunks: [
            { en: 'The other one', ja: 'もう片方は' },
            { en: 'trusts it.”', ja: 'それを信じる」' },
        ],
        ja: 'もう片方はそっちを信じるんだ」',
        why: 'one ... the other one は2つのうち「一方…もう一方」。it は運転しているほうの手。',
        picks: [
            { en: 'the other one', ja: '（2つのうち）もう一方', kind: 'phrase' },
            { en: 'trust', ja: '信じる、任せる', kind: 'word' },
        ],
    },
    {
        en: 'She let go with one hand and found second.',
        chunks: [
            { en: 'She let go', ja: '彼女は離した' },
            { en: 'with one hand', ja: '片手を' },
            { en: 'and found second.', ja: 'そしてセカンドを見つけた' },
        ],
        ja: '彼女は片手を離して、セカンドに入れた。',
        why: 'let go は「手を離す」で、目的語なし。with one hand で「片手を」。second だけで second gear を指す。',
        picks: [
            { en: 'let go', ja: '手を離す', kind: 'phrase' },
            { en: 'find second', ja: 'セカンドに入れる', kind: 'phrase' },
        ],
    },
    {
        en: 'The truck went around the lot at eleven miles an hour, which felt like a lot.',
        chunks: [
            { en: 'The truck went around the lot', ja: 'トラックは空き地を回った' },
            { en: 'at eleven miles an hour,', ja: '時速11マイルで' },
            { en: 'which felt like a lot.', ja: 'それがすごく速く感じた' },
        ],
        ja: 'トラックは時速11マイルで空き地を回った。それがすごい速さに感じた。',
        why: '〜, which は前の内容（時速11マイル）を受ける関係代名詞。the lot（空き地）と a lot（たくさん）の言葉遊び。miles an hour の an は「〜につき」。',
        picks: [
            { en: 'go around', ja: '〜を回る', kind: 'phrase' },
            { en: 'miles an hour', ja: '時速〜マイル', kind: 'phrase' },
            { en: 'feel like a lot', ja: 'すごく多く・速く感じる', kind: 'phrase' },
        ],
    },
    {
        en: 'She wanted to scream.',
        chunks: [
            { en: 'She wanted to scream.', ja: '彼女は叫びたかった' },
        ],
        ja: '叫びたかった。',
        why: 'want to do の基本形。scream は shout より高く鋭い叫び。',
        picks: [
            { en: 'scream', ja: '叫ぶ、悲鳴を上げる', kind: 'word' },
        ],
    },
    {
        en: 'She didn’t.',
        chunks: [
            { en: 'She didn’t.', ja: 'しなかった' },
        ],
        ja: 'でも叫ばなかった。',
        why: 'didn’t の後ろの scream が省略されている。前文の動詞を助動詞だけで受ける英語らしい省略。',
        picks: [
            { en: 'She didn’t.', ja: '（でも）しなかった（動詞の省略）', kind: 'phrase' },
        ],
    },
    {
        en: 'She kept her voice flat, like a man on TV reading the news.',
        chunks: [
            { en: 'She kept her voice flat,', ja: '声を平らに保った' },
            { en: 'like a man on TV', ja: 'テレビの男のように' },
            { en: 'reading the news.', ja: 'ニュースを読んでいる' },
        ],
        ja: '彼女は声を平らにした。テレビでニュースを読む男の人みたいに。',
        why: 'keep O C で「OをCに保つ」。a man on TV reading the news は on TV と reading 〜 が二重に man を修飾している。',
        picks: [
            { en: 'keep one’s voice flat', ja: '声を抑揚なく保つ', kind: 'phrase' },
            { en: 'on TV', ja: 'テレビで', kind: 'phrase' },
            { en: 'read the news', ja: 'ニュースを読む', kind: 'phrase' },
            { en: 'flat', ja: '抑揚のない、平板な', kind: 'word' },
        ],
    },
    {
        en: '“Paige has found second gear,” she said.',
        chunks: [
            { en: '“Paige has found', ja: '「ペイジが入れました' },
            { en: 'second gear,”', ja: 'セカンドギアに」' },
            { en: 'she said.', ja: 'と彼女は言った' },
        ],
        ja: '「ペイジ、セカンドに入りました」と彼女は言った。',
        why: 'has found は実況の現在完了。Mike Tyson has been knocked out と同じ形で、大事件を淡々と言う型。',
        picks: [
            { en: 'has found second gear', ja: 'セカンドに入れた（実況調）', kind: 'phrase' },
        ],
    },
    {
        en: 'That was all.',
        chunks: [
            { en: 'That was all.', ja: 'それで全部だった' },
        ],
        ja: 'それだけだった。',
        why: 'That was all. は「それ以上は何も言わなかった」。all が名詞として補語になる。',
        picks: [
            { en: 'that was all', ja: 'それだけだった', kind: 'phrase' },
        ],
    },
    {
        en: 'That was one lap.',
        chunks: [
            { en: 'That was one lap.', ja: 'それで1周だった' },
        ],
        ja: 'それで1周。',
        why: '短い文を重ねて周回を数えるリズム。',
        picks: [
            { en: 'one lap', ja: '1周', kind: 'phrase' },
        ],
    },
    {
        en: 'Then two.',
        chunks: [
            { en: 'Then two.', ja: 'それから2周' },
        ],
        ja: 'それから2周。',
        why: 'That was two laps の省略。主語も動詞も名詞も落として数だけ残す。',
        picks: [
            { en: 'then', ja: 'それから', kind: 'word' },
        ],
    },
    {
        en: 'Then, instead of stopping by the diner door, she went around again.',
        chunks: [
            { en: 'Then,', ja: 'それから' },
            { en: 'instead of stopping', ja: '止まる代わりに' },
            { en: 'by the diner door,', ja: '食堂のドアのそばで' },
            { en: 'she went around again.', ja: '彼女はもう一度回った' },
        ],
        ja: 'そして、食堂のドアの前で止まるかわりに、もう1周した。',
        why: 'instead of の後ろは動名詞 stopping。主語 she が文の後半まで出てこない。go around again は「もう一周する」。',
        picks: [
            { en: 'instead of doing', ja: '〜する代わりに', kind: 'phrase' },
            { en: 'go around again', ja: 'もう一周する', kind: 'phrase' },
            { en: 'by the door', ja: 'ドアのそばで', kind: 'phrase' },
        ],
    },
    {
        en: '“That’s three,” said Sam.',
        chunks: [
            { en: '“That’s three,”', ja: '「それで3周」' },
            { en: 'said Sam.', ja: 'とサムが言った' },
        ],
        ja: '「3周目だよ」とサムが言った。',
        why: 'That’s + 数 で「それで〜になる」。数え上げの決まった言い方。',
        picks: [
            { en: 'that’s three', ja: 'これで3つ目', kind: 'phrase' },
        ],
    },
    {
        en: '“I can count,” said Walt.',
        chunks: [
            { en: '“I can count,”', ja: '「数えられるよ」' },
            { en: 'said Walt.', ja: 'とウォルトが言った' },
        ],
        ja: '「数えられるさ」とウォルトが言った。',
        why: 'I can count は「言われなくても分かってる」という返し。能力の can を皮肉に使う。',
        picks: [
            { en: 'I can count', ja: '（言われなくても）分かってるよ', kind: 'phrase' },
        ],
    },
    {
        en: 'He was smiling.',
        chunks: [
            { en: 'He was smiling.', ja: '彼は笑っていた' },
        ],
        ja: '笑っていた。',
        why: '過去進行形で、言葉と表情が逆であることを示す。',
        picks: [
            { en: 'smile', ja: 'ほほえむ', kind: 'word' },
        ],
    },
    {
        en: 'She stopped the truck.',
        chunks: [
            { en: 'She stopped the truck.', ja: '彼女はトラックを止めた' },
        ],
        ja: '彼女はトラックを止めた。',
        why: 'stop は他動詞で「〜を止める」。',
        picks: [
            { en: 'stop the truck', ja: 'トラックを止める', kind: 'phrase' },
        ],
    },
    {
        en: 'Her hands were shaking a little.',
        chunks: [
            { en: 'Her hands were shaking', ja: '彼女の手は震えていた' },
            { en: 'a little.', ja: '少し' },
        ],
        ja: '手が少し震えていた。',
        why: 'a little は副詞で「少し」。little だけだと「ほとんど〜ない」になるので a が要る。',
        picks: [
            { en: 'a little', ja: '少し', kind: 'phrase' },
            { en: 'shake', ja: '震える', kind: 'word' },
        ],
    },
    {
        en: '“Sorry for the extra lap,” she said.',
        chunks: [
            { en: '“Sorry for the extra lap,”', ja: '「余分な1周、ごめんなさい」' },
            { en: 'she said.', ja: 'と彼女は言った' },
        ],
        ja: '「1周多く走ってごめんなさい」と彼女は言った。',
        why: 'I’m が落ちた Sorry for 〜。for の後ろに謝る対象を名詞で置く。',
        picks: [
            { en: 'sorry for', ja: '〜のことでごめん', kind: 'phrase' },
            { en: 'extra', ja: '余分の', kind: 'word' },
        ],
    },
    {
        en: '“I don’t blame you,” said Walt.',
        chunks: [
            { en: '“I don’t blame you,”', ja: '「お前を責めないよ」' },
            { en: 'said Walt.', ja: 'とウォルトが言った' },
        ],
        ja: '「無理もないさ」とウォルトが言った。',
        why: 'I don’t blame you は直訳の「責めない」より「そうしたくなるのも分かる」という共感の決まり文句。',
        picks: [
            { en: 'I don’t blame you', ja: '無理もない、気持ちは分かる', kind: 'phrase' },
            { en: 'blame', ja: '責める', kind: 'word' },
        ],
    },
    {
        en: '“I did four.',
        chunks: [
            { en: '“I did four.', ja: '「俺は4周した' },
        ],
        ja: '「わしは4周した」',
        why: 'four の後ろの laps が省略。do + 数で「〜回（周）やる」。',
        picks: [
            { en: 'do four', ja: '4周（4回）やる', kind: 'phrase' },
        ],
    },
    {
        en: 'Nobody told my mother either.”',
        chunks: [
            { en: 'Nobody told', ja: '誰も言わなかった' },
            { en: 'my mother either.”', ja: 'わしの母さんにも」' },
        ],
        ja: 'わしの母さんにも、誰も言わなかった」',
        why: '否定文での「〜も」は too ではなく either。Nobody が否定を担っているので either になる。',
        picks: [
            { en: 'either', ja: '（否定文で）〜も', kind: 'word' },
        ],
    },
    {
        en: 'Paige cut the video that night.',
        chunks: [
            { en: 'Paige cut the video', ja: 'ペイジは動画を編集した' },
            { en: 'that night.', ja: 'その夜' },
        ],
        ja: 'ペイジはその夜、動画を編集した。',
        why: 'cut は過去形も cut。映像の世界では cut で「編集する」。that night は前置詞なしの副詞句。',
        picks: [
            { en: 'cut a video', ja: '動画を編集する', kind: 'phrase' },
            { en: 'that night', ja: 'その夜', kind: 'phrase' },
        ],
    },
    {
        en: 'It ends on Walt, laughing at something off camera.',
        chunks: [
            { en: 'It ends on Walt,', ja: '動画はウォルトで終わる' },
            { en: 'laughing at something', ja: '何かに笑っている' },
            { en: 'off camera.', ja: 'カメラの外の' },
        ],
        ja: '動画は、画面の外の何かに笑っているウォルトで終わる。',
        why: 'end on 〜 は「〜の場面で終わる」。laughing 以下は Walt の様子。off camera は「カメラに映っていないところで」。',
        picks: [
            { en: 'end on', ja: '〜（の場面）で終わる', kind: 'phrase' },
            { en: 'laugh at', ja: '〜を見て笑う', kind: 'phrase' },
            { en: 'off camera', ja: 'カメラの外で、画面外で', kind: 'phrase' },
        ],
    },
    {
        en: 'The stall is not in it.',
        chunks: [
            { en: 'The stall', ja: 'エンストは' },
            { en: 'is not in it.', ja: 'その中に入っていない' },
        ],
        ja: 'エンストの場面は入っていない。',
        why: 'stall が名詞で「エンスト」。同じ語が動詞にも名詞にもなる。',
        picks: [
            { en: 'stall', ja: 'エンスト（名詞）', kind: 'word' },
        ],
    },
    {
        en: 'Sam has asked for it back four times, as evidence.',
        chunks: [
            { en: 'Sam has asked for it back', ja: 'サムはそれを戻してと頼んできた' },
            { en: 'four times,', ja: '4回' },
            { en: 'as evidence.', ja: '証拠として' },
        ],
        ja: 'サムは証拠として戻してくれと、もう4回頼んでいる。',
        why: 'ask for A back は「Aを返してと頼む」で、back が it の後ろに来る。現在完了で「これまでに4回」。as evidence は「証拠として」（予言が当たった証拠）。',
        picks: [
            { en: 'ask for A back', ja: 'Aを返してと頼む', kind: 'phrase' },
            { en: 'as evidence', ja: '証拠として', kind: 'phrase' },
            { en: 'evidence', ja: '証拠（不可算）', kind: 'word' },
        ],
    },
];
