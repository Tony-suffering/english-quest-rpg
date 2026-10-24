/**
 * CORE 5 -- ページ末尾に置く長文。何を作ったのか、なぜそう作ったのか、何を目指しているのか。
 *
 * 【二重の役割】
 *   1. 読み物。面白くなければ誰も読まないので、格調と自虐を半々で振る
 *   2. イディオムの狩場。段落ごとに idioms を宣言し、本文にそのまま入っている。
 *      DMM のレッスンで声に出して使える形で持つ
 *
 * idioms に書いた語句は必ずその段落の en に現れる(scripts/verify-write-core5.cjs が検査)。
 * 宣言だけして本文に無い = 覚えられない飾りなので落とす。
 */

export interface ManifestoParagraph {
    en: string;
    /** この段落に実際に入っているイディオム。本文に含まれること */
    idioms: string[];
}

export interface ManifestoSection {
    n: string;
    heading: string;
    headingJa: string;
    paras: ManifestoParagraph[];
}

export const MANIFESTO_TITLE = 'Why This Exists';
export const MANIFESTO_LEAD =
    'A long note on what these ten fingers are, where the number came from, and what the whole thing is supposed to be for. Read it out loud. That is what it is for.';
export const MANIFESTO_LEAD_JA =
    'この10本が何なのか、なぜ10なのか、何を目指しているのか。声に出して読むために書いてある。';

export const MANIFESTO: ManifestoSection[] = [
    {
        n: '1', heading: 'A Confession', headingJa: '白状すると',
        paras: [
            {
                en: "I did not build this out of any love for the language. I built it to cut corners.",
                idioms: ['cut corners'],
            },
            {
                en: "The plan was simple and, at the time, struck me as rather brilliant. Memorize five model answers. Walk into the exam. Whatever they ask, wheel out whichever of the five sits closest, trust the examiner to be in a forgiving mood, and put the whole business to bed in a single afternoon.",
                idioms: ['struck me as', 'put the whole business to bed'],
            },
            {
                en: "It did not hold water. A memorized essay is a suit cut for somebody else: fine on the hanger, and it splits the moment you raise an arm. Ask a question half a step off the one I had prepared for and I was back to square one, in a small room, holding a pen.",
                idioms: ['hold water', 'back to square one'],
            },
        ],
    },
    {
        n: '2', heading: 'What an Argument Is Actually Made Of', headingJa: '議論の材料',
        paras: [
            {
                en: "Somewhere in the wreckage I noticed something that should have dawned on me years earlier. A sentence in an argument is nouns joined by verbs, and the verbs are almost never the point.",
                idioms: ['dawned on me'],
            },
            {
                en: "Take a body paragraph from any decent essay and strip the nouns out. What is left is a handful of tired workhorses. Causes. Reduces. Widens. Outweighs. Falls on. Thirty of them will see you through a lifetime of arguing. Put them back, swap the nouns instead, and the same skeleton will argue for capital punishment on Monday and against it on Tuesday without breaking a sweat.",
                idioms: ['see you through', 'without breaking a sweat'],
            },
            {
                en: "So the verbs are stock. The nouns turn out to be stock as well, once you are willing to be honest about how few of them there really are.",
                idioms: ['turn out to be'],
            },
        ],
    },
    {
        n: '3', heading: 'Why Ten', headingJa: 'なぜ10なのか',
        paras: [
            {
                en: "People have counted before me. Martha Nussbaum, working alongside Amartya Sen, put the central human capabilities at ten. Shalom Schwartz, testing across eighty-odd countries, landed on ten basic values. Neither list was drawn up for an English exam, and neither had the other in view, which is exactly what makes the coincidence worth a second look.",
                idioms: ['drawn up', 'worth a second look'],
            },
            {
                en: "My ten are not their ten. Theirs are ends, the things a life is for. Mine had to make room for money and time, which are plainly means, and no philosopher worth their salt would put money on a list of what makes us human. But an exam is not a seminar. Nobody in the history of the world has argued anybody out of anything without mentioning what it costs.",
                idioms: ['make room for', 'worth their salt', 'argued anybody out of'],
            },
            {
                en: "So the axis is blunter than a philosopher would like. Not what makes a life good, but what can a person lose. Money, time, the body, happiness, the chance to get better at something. Fairness, freedom, trust, the people you came from, the world you stand on. Lose any one of them and something is genuinely gone. That is the entire list. I have been hunting for an eleventh for weeks and I keep drawing a blank.",
                idioms: ['drawing a blank'],
            },
        ],
    },
    {
        n: '4', heading: 'Why Hands', headingJa: 'なぜ手なのか',
        paras: [
            {
                en: "Ten is not a number I picked. It is the number I happen to have.",
                idioms: ['happen to have'],
            },
            {
                en: "A list on paper is a list you left at home. A list on your hands is one you will still have in the exam room, in the interview, and in the second minute of a conversation that has wandered somewhere you did not see coming. You can count them under the desk and the room is none the wiser.",
                idioms: ['did not see coming', 'none the wiser'],
            },
            {
                en: "Left hand: money, time, body, happiness, study. Every one of them can go missing in an empty room. Right hand: fairness, freedom, trust, roots, nature. Not one of them exists in a world with only you in it. Lay your palms flat and the two thumbs face each other, and the ring fingers, the ones that take a ring, carry your own happiness on the left and the people you share it with on the right. I did not plan that. I spotted it afterwards and decided to take the credit.",
                idioms: ['go missing', 'take the credit'],
            },
        ],
    },
    {
        n: '5', heading: 'The One Rule', headingJa: 'ルールは1つだけ',
        paras: [
            {
                en: "Raise three fingers and you have your three body paragraphs. There is exactly one rule about which three.",
                idioms: [],
            },
            {
                en: "Never take all three from one hand. Three from the left and the essay reads as a balance sheet: accurate, dull, and written by somebody who has evidently never given another human being a moment's thought. Three from the right and it turns into a sermon, high-minded and evidence-free, impossible to disagree with because there is nothing solid in it to push back against.",
                idioms: ["a moment's thought", 'push back against'],
            },
            {
                en: "Two and one, in either direction, and the argument stands up. The rule cuts both ways, which is usually a sign that a rule is doing real work rather than decorating the page.",
                idioms: ['stands up', 'cuts both ways'],
            },
        ],
    },
    {
        n: '6', heading: 'Fifty Blocks', headingJa: '50のブロック',
        paras: [
            {
                en: "Ten words is a slogan, not a method. The trouble showed up in the first week. Make the vocabulary universal and it goes limp. Make it specific and it only fits the topic it was cut for. I went round that loop more times than I care to admit.",
                idioms: ['showed up', 'more times than I care to admit'],
            },
            {
                en: "The fix was a floor, not a wall. Every finger was given five branches. Money splits into income, cost, debt, asset and value. Trust splits into transparency, truth, security, authority and accountability. The branch takes on the specificity so that the finger above it can stay general, and the whole quarrel between the two simply stops.",
                idioms: ['takes on'],
            },
            {
                en: "Ten fingers, five branches each, fifty blocks. Every block carries one noun, one verb, and one sentence welding the pair together, because a word on its own will not come when called and a sentence will. No noun appears twice across the fifty. If two blocks held the same phrase you would hesitate, and hesitation is the one thing a two-minute speech cannot afford.",
                idioms: ['come when called', 'cannot afford'],
            },
        ],
    },
    {
        n: '7', heading: 'What Memorizing Can and Cannot Do', headingJa: '丸暗記の効く範囲',
        paras: [
            {
                en: "Let me call a spade a spade. This is memorization, and I am not going to dress it up as anything nobler.",
                idioms: ['call a spade a spade', 'dress it up'],
            },
            {
                en: "But there is a line, and it pays to be precise about where it falls. The skeleton is memorized: the opening, the stance, the shape of a reason, the closing. Nobody catches it, because everybody's skeleton looks the same. The mechanism sentence is memorized too, and it is equally invisible. Explain why inequality corrodes trust and you will arrive at more or less the sentence that anybody arrives at after five minutes of honest thought.",
                idioms: ['it pays to be', 'arrive at'],
            },
            {
                en: "The example is built fresh, on the day, every time. That is the whole trick, and it is hardly a state secret. Memorization gets caught when the evidence has nothing to do with the question in front of you. Get the example right and the rest can be as prefabricated as a caravan, because nobody ever looks underneath.",
                idioms: ['hardly a state secret', 'has nothing to do with'],
            },
            {
                en: "So no, five memorized essays will not see you through, and I say that as the man who tried it. Fifty blocks and a rule about hands might.",
                idioms: ['see you through'],
            },
        ],
    },
    {
        n: '8', heading: 'The Machine That Says No', headingJa: '検査は俺の作文を落とす',
        paras: [
            {
                en: "Good intentions have a famously short shelf life. Left to its own devices, a system like this fills up with phrases that sound clever and mean nothing. A flexible learning environment. Highly motivated individuals. Raising awareness among stakeholders. I have written all three and felt briefly pleased with myself for each one.",
                idioms: ['short shelf life', 'left to its own devices'],
            },
            {
                en: "So the whole thing is policed by a script with no feelings whatsoever about my prose. It throws out abstract nouns, on the grounds that nobody can picture consent and anybody can picture a signature. It throws out any noun over five words, because a longer noun is a scene, and scenes do not travel. It throws out two blocks holding the same phrase. It throws out a sentence that fails to contain the noun and verb it claims to be teaching. And it throws out the word figures inside a question, because figures presume a topic with numbers in it, and school uniforms do not have any.",
                idioms: ['throws out', 'on the grounds that'],
            },
            {
                en: "It turns my work down roughly once a week. On reflection, this is the healthiest relationship in the entire project.",
                idioms: ['turns my work down', 'on reflection'],
            },
        ],
    },
    {
        n: '9', heading: 'Off the Exam Paper', headingJa: '試験の外でも',
        paras: [
            {
                en: "The part I did not see coming is that it refuses to stay in the exam room.",
                idioms: ['refuses to stay'],
            },
            {
                en: "A film wastes an evening: time, money, and the small betrayal of a trailer that had promised otherwise. Somebody at work is promoted over your head: study, happiness, fairness, and one very long night. You would rather not go home for the holidays: time, freedom, and roots, which is a tidier way of putting it than most families ever manage.",
                idioms: ['promoted over your head', 'would rather not', 'a tidier way of putting it'],
            },
            {
                en: "I have stopped thinking of that as a coincidence. If the ten really are the things a person stands to lose, then gossip and philosophy are the same activity carried out at different volumes.",
                idioms: ['stands to lose', 'carried out'],
            },
        ],
    },
    {
        n: '10', heading: 'What It Is For', headingJa: '何のために',
        paras: [
            {
                en: "The certificate was never the aim. The certificate is the excuse.",
                idioms: [],
            },
            {
                en: "What I am actually after is the ability to open my mouth in a language that is not mine and have something shaped come out of it. Not fluent. I have made my peace with never being fluent. Shaped. To be asked what I think about a thing I have never once considered, and not stall.",
                idioms: ['what I am actually after', 'made my peace with'],
            },
            {
                en: "Ten fingers. Fifty blocks. Raise three, cross the hands, answer the question sitting on each one, and build a single honest example. Do that often enough and it stops being a method and quietly becomes second nature, which is the point, and also the only honest measure of whether any of this was worth the trouble.",
                idioms: ['second nature', 'worth the trouble'],
            },
            {
                en: "At which stage you will know it like the back of your hand. I am fully aware of how that sounds. I built the entire thing in order to arrive at that sentence.",
                idioms: ['know it like the back of your hand', 'fully aware of'],
            },
        ],
    },
];

/** 本文から狩れるイディオム。DMM でそのまま使えるものだけ */
export const MANIFESTO_IDIOMS: { en: string; ja: string; note: string }[] = [
    { en: 'cut corners', ja: '手を抜く・近道する', note: '品質を犠牲にして楽をする。悪い意味が基本' },
    { en: 'struck me as', ja: '〜に思えた', note: 'It struck me as odd. 主語が印象を与える側になる' },
    { en: 'put the whole business to bed', ja: 'その件をカタづける', note: 'put something to bed で「決着させる」' },
    { en: 'hold water', ja: '筋が通る', note: '否定で使うことが多い。That argument does not hold water.' },
    { en: 'back to square one', ja: '振り出しに戻る', note: '進捗が全部消えたとき' },
    { en: 'dawned on me', ja: '気づいた', note: 'It dawned on me that ... ゆっくり分かってくる感じ' },
    { en: 'see you through', ja: '乗り切らせてくれる', note: 'This will see you through the winter.' },
    { en: 'without breaking a sweat', ja: '汗もかかずに・楽々と', note: '余裕を強調する' },
    { en: 'turn out to be', ja: '結局〜だと分かる', note: '予想と違った結末に使う' },
    { en: 'drawn up', ja: '(文書や計画が)作成された', note: 'draw up a list / a contract' },
    { en: 'worth a second look', ja: '見直す価値がある', note: '軽く見られがちなものを持ち上げる' },
    { en: 'make room for', ja: '〜の場所を空ける', note: '物理でも概念でも使える' },
    { en: 'worth their salt', ja: '一人前の・名に値する', note: 'No teacher worth their salt would say that.' },
    { en: 'drawing a blank', ja: '何も思い浮かばない', note: 'I drew a blank. 記憶や発想が出てこない' },
    { en: 'none the wiser', ja: '誰も気づかないまま', note: '何かをこっそりやったあとに' },
    { en: 'did not see coming', ja: '予想していなかった', note: 'I did not see that coming. 会話で頻出' },
    { en: 'go missing', ja: '失われる・行方不明になる', note: '人にもモノにも使える' },
    { en: 'take the credit', ja: '手柄にする', note: '自分の功績として受け取る。自虐にも使える' },
    { en: 'push back against', ja: '押し返す・反論する', note: '議論で相手の主張に抵抗する' },
    { en: 'cuts both ways', ja: '諸刃の剣・両方に効く', note: 'その理屈は自分にも跳ね返る、というとき' },
    { en: 'more times than I care to admit', ja: '認めたくないくらい何度も', note: '自虐の定型。会話で強い' },
    { en: 'come when called', ja: '呼べば出てくる', note: '記憶や単語が必要なときに出るかどうか' },
    { en: 'call a spade a spade', ja: 'はっきり言う', note: '婉曲を避けて事実を言う' },
    { en: 'dress it up', ja: '取り繕う・良く見せる', note: 'dress something up as ... で「〜のふりをさせる」' },
    { en: 'it pays to be', ja: '〜するのが得だ', note: 'It pays to be honest here.' },
    { en: 'hardly a state secret', ja: '別に秘密でもない', note: '当たり前のことを大げさに言う皮肉' },
    { en: 'short shelf life', ja: '長持ちしない', note: '善意・流行・熱意などに使う' },
    { en: 'left to its own devices', ja: '放っておくと', note: '管理しなければ勝手にそうなる、という文脈' },
    { en: 'on the grounds that', ja: '〜という理由で', note: '格式の高い理由づけ。エッセイ向き' },
    { en: 'on reflection', ja: '考えてみると', note: '前言を落ち着いて修正するときの一言' },
    { en: 'promoted over your head', ja: '自分を飛び越して昇進する', note: '職場の愚痴でそのまま使える' },
    { en: 'stands to lose', ja: '失う可能性がある', note: 'Who stands to lose the most here?' },
    { en: 'made my peace with', ja: '受け入れた・折り合いをつけた', note: '諦めを前向きに言う言い方' },
    { en: 'second nature', ja: '体に染みついている', note: 'It has become second nature.' },
    { en: 'worth the trouble', ja: '手間に見合う', note: '否定形でよく使う。not worth the trouble' },
    { en: 'know it like the back of your hand', ja: '知り尽くしている', note: '手のひらの話をしている間は最高の落ち' },
];
