/**
 * CORE 5 DEMO — 在庫を1つのお題で全部使い切る実演。DMMの教材として画面共有する用。
 *
 * 【一覧を並べても道具は動かない】
 * 前の版は50本の枝に1文ずつ当てた「被覆表」だった。全部使ってはいるが、
 * 50文が横一列に並んでいるだけで、**エッセイの形になっていない**。
 * 枝を5本の指に載せた意味も、動詞を2本ずつ持たせた意味も、そこでは死んでいた。
 *
 * 【段落の機械 — 指1本 = 段落1つ】
 * 1本の指には枝がちょうど5本、しかもその5本は親指から小指に1本ずつ載っている。
 * だから**指を1本立てれば、5文の段落が中身ごと決まる**。
 *   親指 THE BASE          主張。蝶番 + 枝 + その面の動詞
 *   人差し指 WHAT PRESSES  譲歩。**指が持つ2本の動詞を1文に同居させる場所**
 *   中指 WHAT HIDES        表から見えない仕組み。骨の動詞
 *   薬指 WHAT IS PASSED ON 後に残るもの
 *   小指 THE LAST LINE     締め。名詞を1個入れて閉じる
 * 指を3本(手をまたいで)立てれば15文。英検1級の本論はこれで埋まる。
 * **本番で決めるのは1から10の数字を3つだけ。**
 *
 * 【2本の動詞がやっと働く場所】
 * 逆側の動詞は「賛成側の語彙が無い」問題の答えとして足したが、
 * 前の版では賛成文と反対文に分かれて置かれ、2本が同じ文で会うことが一度も無かった。
 * 譲歩(Although 逆側, 本命.)は2本が同居して初めて成立する。
 * **人差し指のスロットをその席にする。**これで20本の動詞が全部、意味のある位置に着く。
 *
 * 【残りの4指は在庫棚】
 * 段落にするのは6指(賛成3・反対3)。残る4指20枝は1文ずつの棚として残す。
 * 段落と棚を足すと50枝ちょうどで、被覆は前の版と同じく100%のまま。
 *
 * 【ページは全部英語】
 * 本人が講師に見せながら喋る教材なので、日本語は1文字も置かない。
 *
 * 【被覆は機械が数える】
 * demoCoverage() が在庫と実演を突き合わせる。verify が100%でなければ落とす。
 */

import {
    ENGINE_BY_ID, HINGES, TEN_VERBS, CLOSE_VERB, SKELETON_VERBS, TAILS, REASON_ENGINES,
    ESSAY_FRAME, BODY_OPENERS, PARAGRAPH_BY_ENGINE, buildParagraph,
    type SupportId, type SupportStep, type TrunkKey,
    hingeHead, type EngineId, type Branch, type Hinge, type Finger,
} from './write-core5';

export const DEMO_TOPIC = 'Is freedom of the news media beneficial to society?';

/** 講師向けの説明。ページの頭に置く。英語のみ */
export const DEMO_BRIEF: { h: string; body: string }[] = [
    {
        h: 'What you are looking at',
        body: 'One complete essay, and then the machinery that produced it. Sixteen of its nineteen sentences were written before I read the question. The point of showing you this is not the opinion — it is that almost none of the essay is decided in the exam hall, and the part that is decided is decided by counting on my fingers.',
    },
    {
        h: 'Ten reasons, on ten fingers',
        body: 'There are only ten reasons a person ever agrees or disagrees with anything. Left hand is mine: money, time, body, happiness, education. Right hand is outside me: fairness, freedom, trust, roots, nature. Three fingers make three body paragraphs, and the rule is that they must cross the hands.',
    },
    {
        h: 'One finger is one paragraph',
        body: 'This is the part that took longest to see. A finger is not a word. A finger is five short sentences that already exist: one for each of its three sub-themes, plus one for each of its two verbs. None of them is over ten words and none of them needs the sentence before it, so the order can change and any one of them can stand alone. A paragraph is three sub-theme sentences, one example of my own with the topic in it, and then the verb sentence to close.',
    },
    {
        h: 'Two verbs, five sentences, no Although',
        body: 'Every finger has one verb that holds and one that breaks. Money yields or imposes. Trust is reinforced or undermined. Each of the two verbs has its own short sentence, written out in advance, and one of the two closes every paragraph: the holding one when I am arguing for something, the breaking one when I am arguing against it. That single line is the only thing that changes when I switch sides. And no paragraph opens its second sentence with Although — three of those in one essay is a pattern any examiner would spot, and the concession already lives in the fixed opening and ending.',
    },
    {
        h: 'What is left over',
        body: 'Six fingers are argued as full paragraphs below — three for, three against, and both sets cross the hands. The other four fingers are shown as a bank, one sentence per branch, so you can see the parts still work outside an essay. Between them, all thirty branches, all twenty finger verbs, all seventeen hinges and all ten endings are used exactly where they belong.',
    },
    {
        h: 'Twenty-one more verbs and endings',
        body: 'Ten skeleton verbs sit in fixed slots — raise and face open, require, depend on, produce, allow, reduce, expand and strengthen explain, demonstrate gives evidence. Ten tails end a sentence with one noun. And outweigh closes the argument. That is the whole verb inventory.',
    },
    {
        h: 'Seventeen hinges',
        body: 'Ten of them take a bare noun and nothing else, so no article decision is ever made. Three are already in daily use. Four take no noun and only change the colour of a sentence. Their real job is time: the shortest is one word, the longest is seven, and length is thinking time.',
    },
    {
        h: 'What to listen for',
        body: 'Every sentence below is tagged with the parts it used. If you want to test the system rather than the speaker, name a finger I have not argued tonight and make me say all five of its sentences on the spot. They should come out in about eight seconds, because there is nothing to compose. The frame should survive; only the nouns should move.',
    },
];

// ============================================================
// 1本の答案 — 固定の枠だけで、このお題を最後まで書き切る
// ============================================================
/**
 * 【講師に見せる本体はここ】
 * 道具の一覧は「たくさんある」としか伝わらない。段落の型も、口で言うと抽象的に聞こえる。
 * **1本の答案を出して、どの行が固定で、どの行が自分の言葉かを色で分ければ、説明は要らなくなる。**
 *
 * 【固定は7行】
 *   冒頭2行(ESSAY_FRAME) + 本論の頭3行(BODY_OPENERS) + 結び2行(ESSAY_FRAME)
 * **各段落は、指ごとに用意した5文のうち4文をそのまま出す(子テーマ3つ + 締めの動詞文)。本番で入れるのは1文目の X だけ。**
 * 具体例の1文だけ自分の言葉で足す。答案19文のうち、自分で考えるのは3文。
 */
export interface DemoEssayLine {
    kind: 'open' | 'stance' | 'body' | 'close';
    /** 固定の枠から来ている行か。false の行だけが、その場で書く行 */
    fixed: boolean;
    finger?: EngineId;
    branch?: string;
    en: string;
    /** 講師向けの一言。英語 */
    note: string;
}

/** 1本の答案の本論。1理由4文 = 本論の頭 + 幹の文 + 型3つ(自由に組む) + 自分の1文 */
const DEMO_X = 'a free press';
const DEMO_BODY: {
    finger: EngineId;
    steps: SupportStep[];
    own: string;
    notes: [string, string, string, string];
}[] = [
    {
        finger: 'trust',
        steps: [
            { pattern: 'by', slots: { A: 'public records', B: 'ordinary citizens' } },
            { pattern: 'example', slots: { A: 'one reporter', B: 'a newsroom' } },
            { pattern: 'without', slots: { A: 'voters', B: 'official statements' } },
        ],
        own: 'A leaked budget can change a vote within a week.',
        notes: [
            'The opener is fixed, the trunk sentence for trust takes the noun from the prompt, and an attached frame answers how.',
            'A stand-alone frame: show me. Only the two nouns were decided in the exam.',
            'What if not? The would frame paints the world without it. Three of the four sentences existed before the question did.',
            'The only sentence I write myself. This is where the topic actually shows up, and I keep it short on purpose.',
        ],
    },
    {
        finger: 'education',
        steps: [
            { pattern: 'lets', slots: { A: 'readers', B: 'both sides' } },
            { pattern: 'undo', slots: { A: 'one viral lie', B: "a reader's judgement" } },
            { pattern: 'gives', slots: { A: 'students', B: 'context' } },
        ],
        own: 'Readers who compare two accounts learn to doubt a single one.',
        notes: [
            'Second paragraph: the trunk sentence takes because it lets. Nothing decides the frames except what I want to say.',
            'A negative frame used as a concession. Its own lead, For instance, is dropped and Admittedly takes its place.',
            'The answer to the concession: a positive frame that starts with However. Twenty frames, and any of them can do either job.',
            'My own sentence again, and again the only one in the paragraph.',
        ],
    },
    {
        finger: 'freedom',
        steps: [
            { pattern: 'turning', slots: { A: 'rumour', B: 'reasoned opinion' } },
            { pattern: 'frees', slots: { A: 'citizens', B: 'blind obedience' } },
            { pattern: 'leads', slots: { A: 'open debate', B: 'better decisions' } },
        ],
        own: 'People who can read freely are harder to silence.',
        notes: [
            'Third paragraph: the trunk sentence joins turning. No frame in this essay appears twice.',
            'Who gains? If the subject were a threat, the mirror frame would say who pays: Above all, it burdens A with B.',
            'What follows? Nine different frames across the three paragraphs, chosen freely.',
            'My third and final sentence of my own. Three in the whole essay.',
        ],
    },
];

function demoBodyLines(i: number): DemoEssayLine[] {
    const b = DEMO_BODY[i];
    const e = ENGINE_BY_ID[b.finger];
    const head = `${BODY_OPENERS[i].frame.replace('W', e.slotNoun)} ${PARAGRAPH_BY_ENGINE[b.finger].one.replace(/\bX\b/, DEMO_X)}`;
    const s = buildParagraph(head, 'pos', b.steps, b.own);
    return s.map((en, k) => (k === 0
        ? { kind: 'body' as const, fixed: true, finger: b.finger, branch: e.branches[0].en, en, note: b.notes[0] }
        : { kind: 'body' as const, fixed: k < s.length - 1, finger: b.finger, en, note: b.notes[Math.min(k, 3)] }));
}

/** 本論の型(verify が9つ全部違うことを見る) */
export const DEMO_ESSAY_STEPS: SupportId[][] = DEMO_BODY.map((b) => b.steps.map((s) => s.pattern));

export const DEMO_ESSAY: {
    fingers: EngineId[];
    lines: DemoEssayLine[];
} = {
    fingers: ['trust', 'education', 'freedom'],
    lines: [
        {
            kind: 'open', fixed: true,
            en: "The idea that a free press genuinely benefits society has attracted considerable attention, prompting debate over whether the claim is truly justified.",
            note: "Fixed. Only three nouns move: the subject, the verb phrase, and a two-word restatement. This same sentence opens every essay I write.",
        },
        {
            kind: 'stance', fixed: true,
            en: "Although an unregulated press does real damage of its own, I am firmly convinced that it benefits society, for three compelling reasons.",
            note: "Fixed. Concede once, commit, and announce the number three. The number is what forces the rest of the essay to exist.",
        },
        ...demoBodyLines(0),
        ...demoBodyLines(1),
        ...demoBodyLines(2),
        {
            kind: 'close', fixed: true,
            en: "In conclusion, while the opposing view has some merit, the reasons above clearly outweigh it.",
            note: "Fixed, and it has no holes at all. I write this exact sentence under every essay, for or against, whatever the question. This is where outweigh is fired, and it is fired only here.",
        },
        {
            kind: 'close', fixed: true,
            en: "Given trust, education and freedom, I remain firmly convinced that it benefits society.",
            note: "Fixed, and nothing in it is new. The three nouns are copied from the body openers, and the clause after convinced that is copied from the second sentence. The examiner sees the whole structure again in one line.",
        },
    ],
};

export const DEMO_ESSAY_TOTAL = DEMO_ESSAY.lines
    .reduce((n, l) => n + l.en.trim().split(/\s+/).length, 0);
export const DEMO_ESSAY_FIXED = DEMO_ESSAY.lines.filter((l) => l.fixed).length;

/** 段落の型。10本のどの指でも同じ。3文で1段落が終わる */
export const PARAGRAPH_SHAPE: {
    finger: Finger; slot: string; job: string; parts: string;
}[] = [
    {
        finger: 'thumb', slot: 'THE BASE',
        job: 'First sub-theme, in under ten words. The noun from the prompt goes here and nowhere else in the paragraph.',
        parts: 'X + the first sub-theme',
    },
    {
        finger: 'index', slot: 'WHAT PRESSES',
        job: 'Second sub-theme, its own short sentence. It does not lean on the one before it, so there is nothing to connect and no Although to write.',
        parts: 'It + the second sub-theme',
    },
    {
        finger: 'middle', slot: 'WHAT LASTS',
        job: 'Third sub-theme, still short, and it reaches furthest. Then one example of my own, and then the verb sentence closes the paragraph.',
        parts: 'It + the third sub-theme',
    },
];

/**
 * 【本番の長さ】
 * 下の段落は1本100語前後ある。**答案には入らない。**
 * 240語のうち序論と結論を引くと、本論は1段落50語前後しか取れない。
 * 型は3文のままでよく、**変えるのは1文の長さだけである(30語 -> 17語)。**
 * どの文を削るかを本番で決めないで済むのが、5本を3本にした理由そのものなので、
 * ここでも文の数は動かさない。同じ指を、答案の長さまで詰めた実物を1本置く。
 */
export const DEMO_EXAM_LENGTH = {
    finger: 'trust' as EngineId,
    note: 'One body paragraph at exam length: four sentences, three of them built from fixed frames and one of my own. It comes to under sixty words, so three of these between the fixed opening and ending land inside two hundred and forty.',
    en: DEMO_ESSAY.lines.slice(2, 6).map((l) => l.en).join(' '),
};
export const DEMO_EXAM_WORDS = DEMO_EXAM_LENGTH.en.trim().split(/\s+/).length;

export interface DemoMove {
    /** どの指か */
    finger: EngineId;
    /** どの枝か(枝の en) */
    branch: string;
    /** 使った蝶番(HINGES の en。BRANCH つきの原形) */
    hinge?: string;
    /** 使った動詞。指の動詞・逆側の動詞・骨の動詞・結びのどれでも */
    verbs: string[];
    /** 使った締め(指で指定) */
    tail?: EngineId;
    /** 譲歩の文。指の2本の動詞が同居してよい唯一の席 */
    concession?: boolean;
    en: string;
}

export interface DemoParagraph {
    side: 'for' | 'against';
    finger: EngineId;
    /** 段落を1行で言うと何か。講師向けの見出し */
    claim: string;
    /** 親指・人差し指・中指の3本ちょうど */
    moves: DemoMove[];
}

// ============================================================
// 段落 — 賛成3指・反対3指。どちらも手をまたぐ。1段落3文
// ============================================================

export const DEMO_PARAGRAPHS: DemoParagraph[] = [
    // ---------------- FOR ----------------
    {
        side: 'for', finger: 'trust', claim: 'A press nobody can call off is the only working check on power.',
        moves: [
            { finger: 'trust', branch: 'Transparency', hinge: 'With regard to BRANCH,', verbs: ['reinforce'],
              en: "With regard to transparency, a press that answers to no minister reinforces every institution it embarrasses, because an office that expects to be written about behaves better than one that does not." },
            { finger: 'trust', branch: 'Truth', verbs: ['undermine', 'reinforce'], concession: true,
              en: "Although a free press undermines public confidence in the short run by printing what nobody wanted printed, that is precisely how truth reinforces a system, since confidence in something nobody has checked was never confidence in the first place." },
            { finger: 'trust', branch: 'Accountability', hinge: 'In the case of BRANCH,', verbs: ['depend on'], tail: 'trust',
              en: "In the case of accountability, everything depends on somebody being free to report, and an official account of an official failure is not the whole story." },
        ],
    },
    {
        side: 'for', finger: 'education', claim: 'A country reads better when more than one version of events is legal.',
        moves: [
            { finger: 'education', branch: 'Logical thinking', hinge: 'In the context of BRANCH,', verbs: ['foster'],
              en: "In the context of logical thinking, a free press fosters the one habit no school can install on its own, which is the habit of asking who benefits from the version you have just been handed." },
            { finger: 'education', branch: 'Vocational skills', verbs: ['discourage', 'foster'], concession: true,
              en: "Although a market that pays by the click discourages the slow and expensive kind of reporting, competition between free outlets is what fosters the vocational skills of a newsroom in the first place, and a licensed press would never have built them at all." },
            { finger: 'education', branch: 'Access', hinge: 'As far as BRANCH goes,', verbs: ['strengthen'], tail: 'education',
              en: "As far as access goes, a population that can reach three versions of the same week strengthens faster than one raised on a single version, and reading widely fosters personal growth that no syllabus has ever managed to schedule." },
        ],
    },
    {
        side: 'for', finger: 'freedom', claim: 'A choice made on one account of the facts is not a choice.',
        moves: [
            { finger: 'freedom', branch: 'Choice', hinge: 'When it comes to BRANCH,', verbs: ['grant'],
              en: "When it comes to choice, a free press grants the ordinary reader the only thing that makes a choice mean anything, which is more than one account of what is actually going on." },
            { finger: 'freedom', branch: 'Expression', hinge: 'More often than not,', verbs: ['curb', 'grant'], concession: true,
              en: "More often than not, the complaint is that expression has gone too far, and although something does have to curb a newsroom at its worst, the courts already grant that remedy after the fact rather than before it." },
            { finger: 'freedom', branch: 'Autonomy', hinge: 'Where BRANCH is concerned,', verbs: ['allow'], tail: 'freedom',
              en: "Where autonomy is concerned, being informed only by the people governing you allows nobody to act, and when a reader picks which account to believe, that decision belongs to the person living with it." },
        ],
    },

    // ---------------- AGAINST ----------------
    {
        side: 'against', finger: 'money', claim: 'A newsroom that lives on attention prints what sells, not what matters.',
        moves: [
            { finger: 'money', branch: 'Wealth gap', hinge: 'Regarding BRANCH,', verbs: ['impose'],
              en: "Regarding the wealth gap, an unregulated press imposes its own economics on everybody, since a newsroom that survives on attention chases the story that sells rather than the story that matters." },
            { finger: 'money', branch: 'Financial stability', verbs: ['yield', 'impose'], concession: true,
              en: "Although a free press does yield the occasional investigation that pays for itself many times over, the financial stability it imposes on nobody but itself means the daily product is whatever keeps the lights on." },
            { finger: 'money', branch: 'Funding', hinge: 'In terms of BRANCH,', verbs: ['produce'], tail: 'money',
              en: "In terms of funding, four owners produce the questions a whole country is allowed to ask, and a business model that rewards outrage over accuracy comes at a price somebody has to pay." },
        ],
    },
    {
        side: 'against', finger: 'body', claim: 'No other industry may distribute a product that measurably raises anxiety.',
        moves: [
            { finger: 'body', branch: 'Health', hinge: 'As for BRANCH,', verbs: ['jeopardize'],
              en: "As for health, an unbroken stream of crisis jeopardizes the people least able to switch it off, and no other industry is permitted to distribute a product that measurably raises anxiety." },
            { finger: 'body', branch: 'Disease prevention', verbs: ['protect', 'jeopardize'], concession: true,
              en: "Although the press protects the public in the rare week when it matters, in the other fifty it jeopardizes something quieter, since disease prevention runs on calm repeated advice and calm advice has never sold a single copy." },
            { finger: 'body', branch: 'Longevity', hinge: 'On the face of it,', verbs: ['face'], tail: 'body',
              en: "On the face of it, longevity is good news for the industry, since older readers are the last ones still paying, but everybody younger will face a version of events written for an audience they were never part of, and that takes its toll sooner or later." },
        ],
    },
    {
        side: 'against', finger: 'fairness', claim: 'The people it reports on can afford lawyers; the people it reports about cannot.',
        moves: [
            { finger: 'fairness', branch: 'Human rights', hinge: 'From the point of view of BRANCH,', verbs: ['widen'],
              en: "From the point of view of human rights, a free press widens the very gap it claims to expose, because the people it reports on can afford lawyers and the people it reports about cannot." },
            { finger: 'fairness', branch: 'Discrimination', verbs: ['narrow', 'widen'], concession: true,
              en: "Although good reporting narrows the gap that discrimination opens, a press accountable to nobody just as often widens it again, and one careless paragraph can define a neighbourhood for a generation." },
            { finger: 'fairness', branch: 'Rules', hinge: 'Regardless of BRANCH,', verbs: ['require'], tail: 'fairness',
              en: "Regardless of rules, a right of reply requires money most people do not have, and when a story turns out to be wrong the burden falls on the people least able to carry it." },
        ],
    },
];

// ============================================================
// 在庫棚 — 段落にしなかった4指12枝。1枝1文
// ============================================================

export const DEMO_BANK_FOR: DemoMove[] = [
    { finger: 'time', branch: 'Productivity', hinge: 'In terms of BRANCH,', verbs: ['invest', 'demonstrate'],
      en: "In terms of productivity, a free press invests the months nobody else will spend, and one warning printed before a vote demonstrates the whole case." },
    { finger: 'happiness', branch: 'Purpose', hinge: 'Speaking of BRANCH,', verbs: ['enrich'], tail: 'happiness',
      en: "Speaking of purpose, simply knowing what is going on enriches an ordinary day, and it is what makes the day worth having." },
    { finger: 'roots', branch: 'Tradition', hinge: 'If anything,', verbs: ['safeguard'], tail: 'roots',
      en: "If anything, tradition needs a paper that safeguards the stories a place tells about itself, and it leaves a mark that outlasts us." },
    { finger: 'nature', branch: 'Sustainability', verbs: ['sustain'],
      en: "Sustainability only turns into policy when reporting sustains the pressure long enough to make it impossible to look away." },
    { finger: 'nature', branch: 'Ecosystems', verbs: ['outweigh'],
      en: "Ecosystems have no vote, so a reporter with a camera is the only voice they get, and that alone would outweigh the mess a free press makes." },
];

export const DEMO_BANK_AGAINST: DemoMove[] = [
    { finger: 'time', branch: 'Convenience', verbs: ['consume'], tail: 'time',
      en: "Convenience consumes the checking, because a story that can be posted in a minute will be, and once it is wrong, there is no getting those hours back." },
    { finger: 'time', branch: 'Opportunity cost', verbs: ['reduce'],
      en: "The real opportunity cost is the story nobody followed up, since a newsroom that has reduced its staff covers only what happened today." },
    { finger: 'happiness', branch: 'Fulfillment', verbs: ['erode'],
      en: "Fulfillment erodes when every notification is worse than the one before it." },
    { finger: 'happiness', branch: 'Quality of life', verbs: ['expand'],
      en: "Quality of life expands for the people who read less of it, which is not what anybody defending the industry wants to hear." },
    { finger: 'roots', branch: 'Culture', verbs: ['weaken'],
      en: "Culture is what gets flattened into a headline, and every rewrite weakens the thing the headline claims to describe." },
    { finger: 'roots', branch: 'Identity', hinge: 'Time and again,', verbs: ['raise'],
      en: "Time and again, a whole identity is reduced to the worst week it ever had, which raises a question nobody in the industry answers." },
    { finger: 'nature', branch: 'Resources', hinge: 'BRANCH-wise,', verbs: ['endanger'], tail: 'nature',
      en: "Resources-wise, cutting the slow reporting endangers the only journalism that ever changed anything, and once it is gone, there is no going back." },
];

// ============================================================
// 束ね — 段落 + 棚。被覆はここで数える
// ============================================================

export const DEMO_ESSAY_FOR = DEMO_PARAGRAPHS.filter((p) => p.side === 'for');
export const DEMO_ESSAY_AGAINST = DEMO_PARAGRAPHS.filter((p) => p.side === 'against');

export const DEMO_FOR: DemoMove[] = [
    ...DEMO_ESSAY_FOR.flatMap((p) => p.moves),
    ...DEMO_BANK_FOR,
];
export const DEMO_AGAINST: DemoMove[] = [
    ...DEMO_ESSAY_AGAINST.flatMap((p) => p.moves),
    ...DEMO_BANK_AGAINST,
];

export const DEMO_MOVES: DemoMove[] = [...DEMO_FOR, ...DEMO_AGAINST];

/** 締めの本体。先頭の it / that を落とした形(文の途中に埋めるときの形) */
export function tailFragment(en: string): string {
    return en.replace(/^(it|that) /i, '');
}

export interface DemoCoverage {
    label: string;
    total: number;
    used: number;
    missing: string[];
}

export function demoCoverage(): DemoCoverage[] {
    const usedBranches = new Set(DEMO_MOVES.map((m) => m.branch));
    const usedVerbs = new Set(DEMO_MOVES.flatMap((m) => m.verbs));
    const usedHinges = new Set(DEMO_MOVES.map((m) => m.hinge).filter(Boolean) as string[]);
    const usedTails = new Set(DEMO_MOVES.map((m) => m.tail).filter(Boolean) as EngineId[]);
    const usedFingers = new Set(DEMO_MOVES.map((m) => m.finger));
    const usedSlots = new Set(DEMO_PARAGRAPHS.flatMap((p) => p.moves.map((m) => {
        const b = ENGINE_BY_ID[m.finger].branches.find((x) => x.en === m.branch);
        return b ? b.finger : '';
    })));

    const allBranches = REASON_ENGINES.flatMap((e) => e.branches.map((b) => b.en));
    const fingerVerbs = [
        ...TEN_VERBS.map((v) => v.verb),
        ...TEN_VERBS.map((v) => v.counter).filter(Boolean) as string[],
    ];
    const otherVerbs = [...SKELETON_VERBS.map((v) => v.verb), CLOSE_VERB.verb];
    const allSlots = PARAGRAPH_SHAPE.map((s) => s.finger as string);

    const miss = (all: string[], used: Set<string>) => all.filter((x) => !used.has(x));

    return [
        { label: 'Fingers', total: REASON_ENGINES.length, used: usedFingers.size,
          missing: miss(REASON_ENGINES.map((e) => e.id), usedFingers as Set<string>) },
        { label: 'Branches', total: allBranches.length, used: allBranches.filter((b) => usedBranches.has(b)).length,
          missing: miss(allBranches, usedBranches) },
        { label: 'Paragraph slots', total: allSlots.length, used: allSlots.filter((s) => usedSlots.has(s)).length,
          missing: miss(allSlots, usedSlots as Set<string>) },
        { label: 'Finger verbs', total: fingerVerbs.length, used: fingerVerbs.filter((v) => usedVerbs.has(v)).length,
          missing: miss(fingerVerbs, usedVerbs) },
        { label: 'Skeleton and close', total: otherVerbs.length, used: otherVerbs.filter((v) => usedVerbs.has(v)).length,
          missing: miss(otherVerbs, usedVerbs) },
        { label: 'Tails', total: TAILS.length, used: TAILS.filter((t) => usedTails.has(t.engine)).length,
          missing: miss(TAILS.map((t) => t.engine), usedTails as Set<string>) },
        { label: 'Hinges', total: HINGES.length, used: HINGES.filter((h) => usedHinges.has(h.en)).length,
          missing: miss(HINGES.map((h) => h.en), usedHinges) },
    ];
}

/** その move が使った蝶番の、枝を差し込んだ実際の形 */
export function moveHingeHead(m: DemoMove): string | null {
    if (!m.hinge) return null;
    const h = HINGES.find((x) => x.en === m.hinge);
    const b = ENGINE_BY_ID[m.finger].branches.find((x) => x.en === m.branch);
    if (!h || !b) return null;
    return hingeHead(h, b);
}

export function findBranch(m: DemoMove): Branch | undefined {
    return ENGINE_BY_ID[m.finger].branches.find((x) => x.en === m.branch);
}

export function findHinge(m: DemoMove): Hinge | undefined {
    return HINGES.find((x) => x.en === m.hinge);
}

export const DEMO_WORD_COUNT = DEMO_MOVES
    .reduce((n, m) => n + m.en.trim().split(/\s+/).length, 0);

/** 段落だけの語数。本論3段落で何語になるかを見せる */
export function paragraphWordCount(p: DemoParagraph): number {
    return p.moves.reduce((n, m) => n + m.en.trim().split(/\s+/).length, 0);
}

export const DEMO_ESSAY_WORDS = {
    for: DEMO_ESSAY_FOR.reduce((n, p) => n + paragraphWordCount(p), 0),
    against: DEMO_ESSAY_AGAINST.reduce((n, p) => n + paragraphWordCount(p), 0),
};


// ============================================================
// 話す形 — 同じ中身を、実際に口から出る長さで言い直した50本
// ============================================================
/**
 * 【なぜ2本立てにするか】
 * 上の英文は答案の水準に寄せてあるので1文30語ある。**あれは喋れない。**
 * 中身は同じまま、口から出る長さ(20語前後)に言い直した版をここに置く。
 * 型は同じなので、答案では上を、DMMでは下を読めばいい。
 * 置き換えではなく足す形にしてあるのは、水準を落とすと英検側で使えなくなるため。
 */
export const SPOKEN: Record<string, string> = {
    'trust/Transparency': "Look, transparency is simple. People behave better when they know someone is watching.",
    'trust/Truth': "Yeah, the truth stings at first. But trust in something nobody checked was never worth much.",
    'trust/Accountability': "Accountability lasts about a year without reporters. Their own version of a failure is not the whole story.",
    'education/Logical thinking': "Logical thinking is just asking who gains from the story you were handed. School does not teach that.",
    'education/Vocational skills': "Sure, clicks ruin proper reporting. But nothing builds vocational skills like papers fighting each other for a story.",
    'education/Access': "Access is the whole thing. Three versions of the same week are there, if you can reach them.",
    'freedom/Choice': "Choice means nothing if you only ever got one side of it.",
    'freedom/Expression': "People say expression has gone too far. Fine, but that is what courts are for, afterwards.",
    'freedom/Autonomy': "Autonomy is not being left alone. It is knowing enough to decide for yourself.",
    'money/Wealth gap': "Look at the wealth gap. A newsroom living on clicks prints what sells, not what matters.",
    'money/Financial stability': "Yeah, now and then they land a big one. But financial stability means printing whatever keeps the lights on.",
    'money/Funding': "Whoever controls the funding owns the questions. Four owners is not press freedom.",
    'body/Health': "It is a health thing, honestly. Nonstop crisis hits the people who cannot switch it off.",
    'body/Disease prevention': "Sure, one week a year it matters. Disease prevention is calm advice, and calm never sold a copy.",
    'body/Longevity': "Longevity is the problem. Older readers are the only ones still paying, so it gets written for them.",
    'fairness/Human rights': "Human rights get thinner. The ones being reported on can afford lawyers. The ones being reported about cannot.",
    'fairness/Discrimination': "Good reporting can close that gap, sure. But one careless line about discrimination sticks to a place for years.",
    'fairness/Rules': "Rules the industry wrote for itself are not rules. The press is judging the press.",
    'time/Productivity': "Productivity is not the point. A free press spends months on a story that pays nothing.",
    'happiness/Purpose': "It gives the day a purpose, honestly. Just knowing what is going on makes it easier.",
    'nature/Sustainability': "Sustainability moves only when reporting keeps the pressure on.",
    'nature/Ecosystems': "Ecosystems do not vote. A reporter with a camera is the only voice they get.",
    'time/Convenience': "Convenience eats the checking. Once it is out wrong, that is it.",
    'time/Opportunity cost': "The opportunity cost is the story nobody went back to. Nothing gets followed up.",
    'happiness/Fulfillment': "No fulfillment in it when every alert beats the last one.",
    'happiness/Quality of life': "Funny thing, quality of life goes up for the people who read less news.",
    'roots/Culture': "A whole culture gets flattened into a headline. Nobody asked for that version.",
    'roots/Tradition': "Tradition, local pride, whatever. Somebody has to keep the stories a place tells.",
    'roots/Identity': "A whole identity ends up being the worst week it ever had. Nothing else gets handed down.",
    'nature/Resources': "Resources are the problem. Cut the slow reporting and it does not come back.",
};

/** その文の話す形。指と枝で引く */
export function spokenOf(m: DemoMove): string {
    return SPOKEN[m.finger + "/" + m.branch] || "";
}

// ============================================================
// 宣言 + 補足 — 第109夜の「意味が無い」への答え。まず NATURE × AI
// ============================================================
/**
 * 【1つの宣言に、ポジの型10を全部当てる / 悪い宣言に、ネガの型10を全部当てる】
 * 宣言は動かさない。型も動かさない。**動くのは名詞だけ。**
 */
export const DEMO_ONE_CLAIM: { claim: string; lines: SupportStep[] } = {
    claim: 'AI conserves finite resources',
    lines: [
        { pattern: 'by', slots: { A: 'live data', B: 'every farmer' } },
        { pattern: 'means', slots: { A: 'waste', B: 'water in the ground' } },
        { pattern: 'lets', slots: { A: 'a city', B: 'every leak' } },
        { pattern: 'turning', slots: { A: 'rough estimates', B: 'a precise schedule' } },
        { pattern: 'example', slots: { A: 'one sensor', B: 'a crew of inspectors' } },
        { pattern: 'without', slots: { A: 'farmers', B: 'guesswork' } },
        { pattern: 'frees', slots: { A: 'farmers', B: 'wasteful habits' } },
        { pattern: 'focus', slots: { A: 'water boards', B: 'real shortages' } },
        { pattern: 'gives', slots: { A: 'small farms', B: 'data' } },
        { pattern: 'leads', slots: { A: 'smarter irrigation', B: 'healthier rivers' } },
    ],
};

export const DEMO_ONE_CLAIM_BAD: { claim: string; lines: SupportStep[] } = {
    claim: 'AI burns through finite resources',
    lines: [
        { pattern: 'concentrating', slots: { A: 'water rights', B: 'a few data centres' } },
        { pattern: 'meansMore', slots: { A: 'cooling', B: 'drinking water' } },
        { pattern: 'blind', slots: { A: 'local councils', B: 'its water use' } },
        { pattern: 'reducing', slots: { A: 'rivers', B: 'cooling systems' } },
        { pattern: 'undo', slots: { A: 'one new data centre', B: 'a decade of conservation' } },
        { pattern: 'unchecked', slots: { A: 'whole towns', B: 'clean water' } },
        { pattern: 'burdens', slots: { A: 'local residents', B: 'higher bills' } },
        { pattern: 'afford', slots: { A: 'small farms', B: 'irrigation' } },
        { pattern: 'strips', slots: { A: 'rural areas', B: 'water' } },
        { pattern: 'starts', slots: { A: 'one server farm', B: 'a dry valley' } },
    ],
};

/**
 * 【NATURE の幹の文8つを、全部補足つきで】
 * 良い主語の4文にはポジの型、悪い主語の4文にはネガの型。
 */
export const DEMO_NATURE_NOTES: Record<TrunkKey, string> = {
    one: 'How, then so what: two attached frames make one sentence. Four nouns, and everything else was fixed before the lesson.',
    two: 'Why, then into what. Sustainability is exactly the word that sounds empty on its own; the frames force a person, a thing they see, and a change.',
    three: 'Show me. One small thing against a crowd.',
    pro: 'What follows? One good result causing a bigger one.',
    oneBad: 'The same finger with the subject as a threat. Where does it end? Small start, large end.',
    twoBad: 'How, from the other side: by concentrating instead of by putting. One verb changes.',
    threeBad: 'So what, reversed: more of the bad thing, less of the good one.',
    con: 'Why, reversed: it leaves someone blind instead of letting them see.',
};
